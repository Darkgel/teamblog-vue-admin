<template>
    <span class="tags-box">
        <div class="form-control">
            <el-row>
                <el-button round type="primary" size="mini" v-for="(tag,index) in value" :key="index">
                    {{tag.name}}&nbsp;
                    <i aria-hidden="true" @click="remove(index)">&times;</i>
                </el-button>
                <span v-if="value.length === 0">暂无标签</span>
            </el-row>
            <div id="tag-input-div">
                <input class="add-tag-input"
                    type="text"
                    :placeholder="placeholder"
                    v-model.trim="currentValue"
                    @focus="focusAddTagInputHandler($event)"
                    ref="addTagInput" />
                <!-- <el-input v-model.trim="currentValue" :placeholder="placeholder" @keyup="keyAction" ref="tagsinput"/> -->
                <div
                    v-show="isShowSelect"
                    style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 102;"
                    @click="cancelNewTagHandler">
                </div>
                <div v-show="isShowSelect" ref="selectNewTagDiv" class="select-new-tag-div">
                    <ul id="select-new-tag-ul">
                        <li v-for="(tag, index) in candidateTags" :key="index" @click="selectNewTagHandler(tag)" class="select-new-tag-li">{{tag.name}}</li>
                    </ul>
                </div>
            </div>
        </div>

        <el-dialog title="创建新的标签" :visible.sync="createNewTagDialogVisible">
            <el-form :model="createNewTagForm">
                <el-form-item label="标签名">
                    <el-input v-model="createNewTagForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="标签描述">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入标签描述"
                        v-model="createNewTagForm.description">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="createNewTagDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="createNewTagHandler()">确 定</el-button>
            </div>
        </el-dialog>
    </span>
</template>

<script>
import { getSimilarTagsByTagName, createTag } from '@/api/blog/tags'

export default {
    name: 'tagsInput',
    props: {
        /**
         * 绑定数据
         * @type {Array}
         * @required true
         */
        value: {
            type: Array,
            required: true
        },
        /**
         * 占位描述
         * @type {String}
         * @required false
         */
        placeholder: {
            type: String,
            required: false,
            default: '输入标签名以添加'
        }
    },
    data() {
        return {
            candidateTags: [],
            currentValue: '',
            isShowSelect: false,
            createNewTagForm: {
                name: '',
                description: ''
            },
            createNewTagDialogVisible: false
        }
    },
    watch: {
        currentValue: function(newCurrentValue, oldCurrentValue) {
            this.renewCandidateTags(newCurrentValue, 10)
        }
    },
    computed: {},
    methods: {
        remove(index) {
            this.value.splice(index, 1)
        },
        renewCandidateTags(tagName, limit) {
            let candidateTags = []
            // 根据currentValue获取候选tag
            getSimilarTagsByTagName(tagName, 10).then(response => {
                candidateTags = response.content.data
                // 添加“创建新标签”
                let createNewTag = {
                    id: -1,
                    name: '创建新标签:' + tagName
                }

                candidateTags.push(createNewTag)
                this.candidateTags = candidateTags
            })
        },
        focusAddTagInputHandler(e) {
            this.isShowSelect = true
            this.renewCandidateTags(this.currentValue, 10)
        },
        cancelNewTagHandler() {
            this.isShowSelect = false
        },
        selectNewTagHandler(tag) {
            if (tag.id === -1) {
                // 创建新的tag
                this.createNewTagForm.name = tag.name.substring(6)
                this.createNewTagDialogVisible = true
            } else {
                this.value.push(tag)
                this.isShowSelect = false
                this.currentValue = ''
            }
        },
        createNewTagHandler() {
            createTag(this.createNewTagForm).then(response => {
                this.value.push(response.content.data)
                this.createNewTagDialogVisible = false
                this.currentValue = ''
                this.isShowSelect = false
            })
        }
    }
}
</script>

<style scoped>
.add-tag-input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);

}

#tag-input-div {
    position: relative;
}

.select-new-tag-div {
    position: absolute;
    overflow: auto;
    z-index: 100;
    width: 110%;
    height: 200px;
    border: 1px solid #ddd;
    line-height: normal;
    z-index: 204;
    background: white;
    scroll-behavior: smooth;
}

.select-new-tag-li {
    padding: 3% 0;
    margin: 1% 1%;
    list-style: none;
}

.select-new-tag-li:hover {
    cursor: pointer;
    background: #D3D3D3;
}

#select-new-tag-ul {
    margin: 0 0;
    padding: 0 0;
}
</style>
