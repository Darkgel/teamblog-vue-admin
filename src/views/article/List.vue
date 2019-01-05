<template>
    <div class="app-container">
        <el-table :data="list" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="ID" width="80px">
                <template slot-scope="scope">
                    <span>{{ scope.row.id }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="Date">
                <template slot-scope="scope">
                    <span>{{ scope.row.updatedAt | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="Author">
                <template slot-scope="scope">
                    <span>{{ scope.row.author }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" class-name="status-col" label="Status">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusTypeMapping(scope.row.deletedAt)">{{ scope.row.status | statusStringMapping(scope.row.deletedAt) }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column min-width="300px" label="Title">
                <template slot-scope="scope">
                    <router-link :to="'/example/edit/'+scope.row.id" class="link-type">
                        <span>{{ scope.row.title }}</span>
                    </router-link>
                </template>
            </el-table-column>

            <el-table-column align="center" label="Actions">
                <template slot-scope="scope">
                    <router-link :to="'/article/edit/'+scope.row.id">
                        <el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>
                    </router-link>

                    <el-button type="danger" size="small" icon="el-icon-delete" @click="handleDeletion(scope.row.id)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
</template>

<script>
import { fetchList, deleteArticle } from '@/api/blog/articles'
import Pagination from '@/components/Pagination'
const articleStatus = {
    draft: 0,
    published: 1
}

export default {
    components: { Pagination },
    filters: {
        statusTypeMapping: function(status, deletedAt) {
            let type = 'info'
            if (deletedAt !== null) {
                type = 'danger'
            } else {
                switch (status) {
                case articleStatus.draft :
                    type = 'info'; break
                case articleStatus.published :
                    type = 'success'; break
                }
            }
            return type
        },
        statusStringMapping: function(status, deletedAt) {
            let string = 'draft'
            if (deletedAt !== null) {
                string = 'deleted'
            } else {
                switch (status) {
                case articleStatus.draft :
                    string = 'draft'; break
                case articleStatus.published :
                    string = 'published'; break
                }
            }
            return string
        }
    },
    data() {
        return {
            list: null,
            total: 0,
            listQuery: {
                pageNum: 1,
                pageSize: 10,
                withDeleted: 1
            },
            constant: {
                articleStatus: {
                    draft: 0,
                    published: 1
                }
            }
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            fetchList(this.listQuery).then(content => {
                this.list = content.data
                this.total = content.meta.pagination.total
            })
        },
        handleSizeChange(val) {
            this.listQuery.pageSize = val
            this.getList()
        },
        handleCurrentChange(val) {
            this.listQuery.pageNum = val
            this.getList()
        },
        handleDeletion(articleId) {
            if (confirm('删除id为' + articleId + '的文章?')) {
                deleteArticle(articleId).then(content => {
                    alert('删除成功')
                    this.getList()
                })
            }
        }
    }
}
</script>
