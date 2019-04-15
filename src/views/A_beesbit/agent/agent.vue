<template>
  <iframe src="http://129.28.67.91/admin.php" width="100%" :height="height"></iframe>
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
    console.log(navbarHeight);
    console.log(scrollbarHeight);
    this.height = window.innerHeight - navbarHeight - scrollbarHeight
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
