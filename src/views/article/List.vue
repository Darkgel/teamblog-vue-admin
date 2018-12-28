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
                    <span>{{ scope.row.updatedTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="Author">
                <template slot-scope="scope">
                    <span>{{ scope.row.author }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" class-name="status-col" label="Status">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusStringMapping }}</el-tag>
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
    components: { Pagination },
    filters: {
        statusFilter(status) {
            const statusMap = {
                2: 'success',
                1: 'info',
                0: 'danger'
            }
            return statusMap[status] || ''
        },
        statusStringMapping(status) {
            const statusMap = {
                2: 'published',
                1: 'draft',
                0: 'deleted'
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
                limit: 10
            }
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            let response = this.$store.getters.getArticleWithPagination(this.listQuery)
            this.total = response.total
            this.list = response.list
            this.listQuery.page = response.page
            this.listQuery.limit = response.pageSize
        }
    }
}
</script>
