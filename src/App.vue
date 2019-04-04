<template>
<div id="app">
  <router-view />
</div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/.el-dialog {
    border-radius: 10px;
    .el-dialog__header {
        border-bottom: 1px solid #BCBCCB;
        font-weight: 600;
        padding: 15px;
        position: relative;
    }

    .el-dialog__header::after {
        content: '';
        position: absolute;
        width: 7rem;
        height: 0.25rem;
        background: linear-gradient(90deg,rgba(255,124,42,1) 0%,rgba(255,144,51,1) 20%,rgba(255,170,62,1) 50%,rgba(255,185,69,1) 78%,rgba(255,191,72,1) 100%);
        bottom: -1px;
        margin: 0 auto;
        left: 0;
        right: 0;
    }

    .el-dialog__footer {
        padding: 0 20px 35px;
    }

}
</style>
