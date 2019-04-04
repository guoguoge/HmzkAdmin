<template>
<div class="navbar">
  <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />

  <breadcrumb class="breadcrumb-container" />

  <div class="right-menu">
    <template v-if="device!=='mobile'">
      <search class="right-menu-item" />

      <el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom">
        <screenfull class="right-menu-item" />
      </el-tooltip>

      <el-dropdown class="avatar-container right-menu-item" trigger="hover">
        <div class="wrapper">
          <el-badge :value="msgList.length" class="item">
            <svg-icon icon-class="msg" class="msg" />
          </el-badge>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled>
            <div v-if="msgList">
              共 {{msgList.length}} 条通知
            </div>
            <div v-else>
              近期无通知
            </div>
          </el-dropdown-item>
          <div v-if="msgList" style="height:30rem;overflowY:scroll">
            <el-dropdown-item divided v-for="(item,index) in msgList" :key="index">
              {{item}}
            </el-dropdown-item>
          </div>
          <el-dropdown-item style="text-align:right" divided v-if="msgList">
            <el-button size="mini" type="primary" @click="clickoutside">确认已读</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <span class="right-menu-item">{{role}}</span>

      <!-- <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select class="right-menu-item"/>
        </el-tooltip> -->

      <!-- <lang-select class="right-menu-item"/> -->

      <!-- <el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">
          <theme-picker class="theme-picker right-menu-item"/>
        </el-tooltip> -->
    </template>

    <el-dropdown class="avatar-container right-menu-item" trigger="click">
      <div class="avatar-wrapper">
        <img src="@/assets/avatar.png" class="user-avatar">
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <router-link to="/">
          <el-dropdown-item>
            {{ $t('navbar.dashboard') }}
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import Search from '@/components/HeaderSearch'

import {
  getRole,
  jsonpReturn,
  checkRequest
} from '@/utils'


import {
  Message,
  DeleteMessage
} from '@/api/beesbit'

export default {
  data() {
    return {
      role: getRole(),
      msgList: []
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker,
    Search
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'device',
      'roles'
    ])
  },
  methods: {
    init() {
      Message(0).then(res => {
        this.msgList = checkRequest(res, false)
        console.log(this.msgList);
        console.log(checkRequest(res, false));
      })
    },
    clickoutside() {
      DeleteMessage(0).then(res => {
        this.init()
      })
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  },
  created() {
    this.init()
  },
  beforeMount() {},
  mounted() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
            background: rgba(0, 0, 0, .025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .errLog-container {
        display: inline-block;
        vertical-align: top;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            cursor: pointer;
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 20px;
            color: #5a5e66;
            vertical-align: text-bottom;
            transition: background 0.3s;
            &:hover {
                background: rgba(0, 0, 0, .025);
            }
        }

        .avatar-container {
            margin-right: 30px;
            .wrapper {
                position: relative;
                .msg {
                    cursor: pointer;
                    width: 25px;
                    height: 25px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
                /deep/.el-badge__content.is-fixed {
                    top: 8px;
                }
            }
            .avatar-wrapper {
                margin-top: 5px;
                position: relative;
                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
