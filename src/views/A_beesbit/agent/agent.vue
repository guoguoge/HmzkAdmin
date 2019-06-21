<template>
  <iframe src="http://www.lingximan.com/admin.php" width="100%" :height="height" frameborder='0'></iframe>
</template>

<script>
export default {
  data() {
    return {
      height: ''
    }
  },
  mounted() {
    let navbarHeight = document.querySelector('.navbar').clientHeight
    let scrollbarHeight = document.querySelector('.tags-view-container').clientHeight
    this.height = window.innerHeight - navbarHeight - scrollbarHeight
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
