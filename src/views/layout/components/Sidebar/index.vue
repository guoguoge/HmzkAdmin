<template>
<el-scrollbar wrap-class="scrollbar-wrapper">
  <div class="top">
    1231312
  </div>
  <el-menu  :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" :background-color="variables.menuBg" :text-color="variables.menuText" :active-text-color="variables.menuActiveText" mode="vertical">
    <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path" />
  </el-menu>
</el-scrollbar>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: {
    SidebarItem
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    click(){
      this.$store.dispatch('toggleSideBar')
    }
  }
}
</script>
