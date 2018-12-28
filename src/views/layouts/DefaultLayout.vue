<template>
    <!-- <el-container>
        <app-sidebar></app-sidebar>
        <el-container direction="vertical">
            <app-navbar></app-navbar>
            <app-main></app-main>
            <app-footer></app-footer>
        </el-container>
    </el-container> -->

    <div :class="classObj" class="app-wrapper">
        <app-sidebar class="sidebar-container"></app-sidebar>
        <div class="main-container">
            <app-navbar></app-navbar>
            <app-main></app-main>
            <app-footer></app-footer>
        </div>
    </div>
</template>

<script>
import AppNavbar from './components/Navbar'
import AppSidebar from './components/Sidebar'
import AppMain from './components/AppMain'
import AppFooter from './components/Footer'

export default {
    name: 'DefaultLayout',
    components: { AppNavbar, AppSidebar, AppFooter, AppMain },
    data () {
        return {}
    },
    computed: {
        sidebar () {
            return this.$store.state.app.sidebar
        },
        classObj () {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened
            }
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
}
</style>
