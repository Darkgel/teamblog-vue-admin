<template>
    <div class="createPost-container">
        <!-- <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
            <sticky :class-name="'sub-navbar '+postForm.status">
                <el-button style="margin-left: 10px;" type="success" @click="submitForm">发布</el-button>
                <el-button type="warning" @click="draftForm">草稿</el-button>
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
                                        <el-select v-model="postForm.author" :remote-method="getRemoteUserList" filterable remote placeholder="搜索用户">
                                            <el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item"/>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="10">
                                    <el-form-item label-width="80px" label="发布时间:" class="postInfo-container-item">
                                        <el-date-picker v-model="postForm.display_time" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="6">
                                    <el-form-item label-width="60px" label="重要性:" class="postInfo-container-item">
                                        <el-rate
                                        v-model="postForm.importance"
                                        :max="3"
                                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                                        :low-threshold="1"
                                        :high-threshold="3"
                                        style="margin-top:8px;"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>

                <el-form-item style="margin-bottom: 40px;" label-width="45px" label="摘要:">
                    <el-input :rows="1" v-model="postForm.content_short" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>
                    <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}字</span>
                </el-form-item>

                <el-form-item prop="content" style="margin-bottom: 30px;">
                    <Tinymce ref="editor" :height="400" v-model="postForm.content" />
                </el-form-item>
            </div>
        </el-form> -->
    </div>
</template>

<script>/* eslint-disable */
// import Sticky from '@/components/Sticky' // 粘性header组件

// const defaultForm = {
//     id: undefined,
//     title: '',
//     author: '',
//     updatedTime: undefined,
//     createdTime: undefined,
//     summary : '',
//     content_md: '',
//     content_html: '',
//     status: '',
// }

// export default {
//     components: { Sticky },
//     props: {
//         isEdit: {
//             type: Boolean,
//             default: false
//         }
//     },
//     data() {
//         const validateRequire = (rule, value, callback) => {
//             if (value === '') {
//                 this.$message({
//                     message: rule.field + '为必传项',
//                     type: 'error'
//                 })
//                 callback(new Error(rule.field + '为必传项'))
//             } else {
//                 callback()
//             }
//         }

//         return {
//             postForm: Object.assign({}, defaultForm),
//             rules: {
//                 title: [{ validator: validateRequire }],
//                 content: [{ validator: validateRequire }],
//             }
//         }
//     },
//     computed: {
//         summaryLength() {
//             return this.postForm.summary.length
//         }
//     },
//     created() {
//         if (this.isEdit) {
//             const id = this.$route.params && this.$route.params.id
//             this.fetchData(id)
//         } else {
//             this.postForm = Object.assign({}, defaultForm)
//         }
//     },
//     methods: {
//         fetchData(id) {
//             data = {
//                 1 : {
//                     id: 1,
//                     title: 'article 1',
//                     author: 'darkgel_1',
//                     updatedTime: 1545982570,
//                     createdTime: 1545982533,
//                     summary : 'this is the summary of article 1',
//                     content_md: '',
//                     content_html: '',
//                     status: ,
//                 }
//             }
//             fetchArticle(id).then(response => {
//                 this.postForm = response.data
//                 // Just for test
//                 this.postForm.title += `   Article Id:${this.postForm.id}`
//                 this.postForm.content_short += `   Article Id:${this.postForm.id}`

//                 // Set tagsview title
//                 this.setTagsViewTitle()
//             }).catch(err => {
//                 console.log(err)
//             })
//         },
//         setTagsViewTitle() {
//         const title = this.lang === 'zh' ? '编辑文章' : 'Edit Article'
//         const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
//         this.$store.dispatch('updateVisitedView', route)
//         },
//         submitForm() {
//         this.postForm.display_time = parseInt(this.display_time / 1000)
//         console.log(this.postForm)
//         this.$refs.postForm.validate(valid => {
//             if (valid) {
//             this.loading = true
//             this.$notify({
//                 title: '成功',
//                 message: '发布文章成功',
//                 type: 'success',
//                 duration: 2000
//             })
//             this.postForm.status = 'published'
//             this.loading = false
//             } else {
//             console.log('error submit!!')
//             return false
//             }
//         })
//         },
//         draftForm() {
//         if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
//             this.$message({
//             message: '请填写必要的标题和内容',
//             type: 'warning'
//             })
//             return
//         }
//         this.$message({
//             message: '保存成功',
//             type: 'success',
//             showClose: true,
//             duration: 1000
//         })
//         this.postForm.status = 'draft'
//         },
//         getRemoteUserList(query) {
//         userSearch(query).then(response => {
//             if (!response.data.items) return
//             this.userListOptions = response.data.items.map(v => v.name)
//         })
//         }
//     }
// }
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
