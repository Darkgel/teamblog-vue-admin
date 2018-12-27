<template>
    <el-container>
        <app-sidebar></app-sidebar>
        <el-container direction="vertical">
            <app-navbar></app-navbar>
            <app-main></app-main>
            <app-footer></app-footer>
        </el-container>
    </el-container>
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
    }
}
</script>

<style>

</style>
