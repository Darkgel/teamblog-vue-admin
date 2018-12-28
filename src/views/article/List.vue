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
                    <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="Author">
                <template slot-scope="scope">
                    <span>{{ scope.row.author }}</span>
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="Status">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
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

                    <el-button type="danger" size="small" icon="el-icon-delete" @click="handleDeletion()">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
    name: 'ArticleList',
    components: { Pagination },
    filters: {
        statusFilter(status) {
            const statusMap = {
                published: 'success',
                draft: 'info',
                deleted: 'danger'
            }
            return statusMap[status] || ''
        }
    },
    data() {
        return {
            list: null,
            total: 0,
            listQuery: {
                page: 1,
                limit: 20
            }
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            this.list = [
                {
                    id: 1,
                    timestamp: 1545982570,
                    author: 'Darkgel_1',
                    status: 'published',
                    title: 'article title one'
                }
            ]
            this.total = 200
        }
        // handleSizeChange(val) {
        //     this.listQuery.limit = val
        //     this.getList()
        // },
        // handleCurrentChange(val) {
        //     this.listQuery.page = val
        //     this.getList()
        // }
    }
}
</script>
