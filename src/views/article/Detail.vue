<template>
    <div class="createPost-container">
        <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
            <sticky>
                <div style="background-color: lightgrey;text-align: right;padding: 10px 50px">
                    <el-button type="success" @click="publish">发布</el-button>
                    <el-button type="warning" @click="saveAsDraft">草稿</el-button>
                </div>
            </sticky>

            <div class="createPost-main-container">
                <el-row>
                    <el-col :span="24">
                        <el-form-item style="margin-bottom: 40px;" prop="title">
                            <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                                标题
                            </MDinput>
                        </el-form-item>

                        <div class="postInfo-container">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label-width="45px" label="作者:" class="postInfo-container-item">
                                        <el-input v-model="postForm.author" placeholder="作者称呼"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="20">
                                    <el-form-item label-width="45px" label="标签:" class="postInfo-container-item">
                                        <tagsInput
                                            v-model="tags"
                                            ref='tags'></tagsInput>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>

                <el-form-item style="margin-bottom: 40px;" label-width="45px" label="摘要:">
                    <el-input :rows="1" v-model="postForm.summary" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>
                    <span v-show="summaryLength" class="word-counter">{{ summaryLength }}字</span>
                </el-form-item>

                <el-form-item prop="content" style="margin-bottom: 30px;">
                    <markdown-editor ref="markdownEditor" v-model="postForm.contentMd" height="800px"/>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import MDinput from '@/components/MDinput'
import MarkdownEditor from '@/components/MarkdownEditor'
import { getArticle, saveArticle } from '@/api/blog/articles'
import TagsInput from './TagsInput'

const articleStatus = {
    draft: 0,
    published: 1
}

const defaultForm = {
    id: undefined,
    title: '',
    author: '',
    summary: '',
    contentMd: '',
    contentHtml: '',
    tags: '',
    status: articleStatus.draft
}

export default {
    components: { Sticky, MDinput, MarkdownEditor, TagsInput },
    props: {
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        const validateRequire = (rule, value, callback) => {
            if (value === '') {
                this.$message({
                    message: rule.field + '为必传项',
                    type: 'error'
                })
                callback(new Error(rule.field + '为必传项'))
            } else {
                callback()
            }
        }

        return {
            postForm: Object.assign({}, defaultForm),
            rules: {
                title: [{ validator: validateRequire }]
            },
            tags: []
        }
    },
    computed: {
        summaryLength() {
            return this.postForm.summary.length
        }
    },
    created() {
        if (this.isEdit) {
            const id = this.$route.params && this.$route.params.id
            this.fetchData(parseInt(id))
        } else {
            this.postForm = Object.assign({}, defaultForm)
        }
    },
    methods: {
        fetchData(id) {
            let query = {
                include: 'tags'
            }
            getArticle(id, query).then(content => {
                let article = content.data
                for (let key in this.postForm) {
                    this.postForm[key] = article[key]
                }

                this.tags = article.tags.data
            })
        },
        publish() {
            this.$refs.postForm.validate(valid => {
                if (valid) {
                    this.postForm.contentHtml = this.$refs.markdownEditor.getHtml()
                    this.postForm.status = articleStatus.published

                    // 处理标签
                    this.postForm.tags = this.getTagIdsAsString()

                    saveArticle(this.postForm).then(content => {
                        console.log(content)

                        this.$notify({
                            title: '成功',
                            message: '发布文章成功',
                            type: 'success',
                            duration: 2000
                        })

                        if (!this.isEdit) {
                            this.$router.push({ name: 'Article.Edit', params: { id: content.data.id } })
                        }
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        saveAsDraft() {
            if (this.postForm.contentMd.length === 0 || this.postForm.title.length === 0) {
                this.$message({
                    message: '请填写必要的标题和内容',
                    type: 'warning'
                })
                return
            }
            this.postForm.contentHtml = this.$refs.markdownEditor.getHtml()
            this.postForm.status = articleStatus.draft
            // 处理标签
            this.postForm.tags = this.getTagIdsAsString()
            saveArticle(this.postForm).then(content => {
                this.$notify({
                    title: '成功',
                    message: '保存草稿成功',
                    type: 'success',
                    duration: 2000
                })

                if (!this.isEdit) {
                    this.$router.push({ name: 'Article.Edit', params: { id: content.data.id } })
                }
            })
        },
        getTagIdsAsString() {
            let tagIdArray = []
            let len = this.tags.length
            for (let i = 0; i < len; i++) {
                tagIdArray.push(this.tags[i].id)
            }
            return tagIdArray.join(',')
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
.createPost-container {
    position: relative;
    .createPost-main-container {
        padding: 40px 45px 20px 50px;
        .postInfo-container {
            position: relative;
            @include clearfix;
            margin-bottom: 10px;
            .postInfo-container-item {
                float: left;
            }
        }
    }
    .word-counter {
        width: 40px;
        position: absolute;
        right: -3px;
        top: 0px;
    }
}
</style>
