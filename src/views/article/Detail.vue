<template>
    <div class="createPost-container">
        <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
            <sticky>
                <div style="background-color: lightgrey;text-align: right;padding: 10px 50px">
                    <el-button type="success" @click="submitForm">发布</el-button>
                    <el-button type="warning" @click="draftForm">草稿</el-button>
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
                                <el-col :span="10">
                                    <el-form-item label-width="80px" label="发布时间:" class="postInfo-container-item">
                                        <el-date-picker v-model="postForm.updateTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>
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
                    <markdown-editor v-model="postForm.contentMd" height="300px"/>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import MDinput from '@/components/MDinput'
import MarkdownEditor from '@/components/MarkdownEditor'

const defaultForm = {
    id: undefined,
    title: '',
    author: '',
    updatedTime: undefined,
    createdTime: undefined,
    summary: '',
    contentMd: '',
    contentHtml: '',
    status: ''
}

export default {
    components: { Sticky, MDinput, MarkdownEditor },
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
            }
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
            let articles = this.$store.getters.articles
            let index = articles.findIndex(function(element) {
                return element.id === id
            })
            let article = articles.slice(index, index + 1)[0]
            this.postForm = article
        },
        submitForm() {
            console.log(this.postForm)
            this.$refs.postForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.$notify({
                        title: '成功',
                        message: '发布文章成功',
                        type: 'success',
                        duration: 2000
                    })
                    this.postForm.status = 'published'
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        draftForm() {
            if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
                this.$message({
                    message: '请填写必要的标题和内容',
                    type: 'warning'
                })
                return
            }
            this.$message({
                message: '保存成功',
                type: 'success',
                showClose: true,
                duration: 1000
            })
            this.postForm.status = 'draft'
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
        right: -10px;
        top: 0px;
    }
}
</style>
