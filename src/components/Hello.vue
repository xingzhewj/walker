<template>
  <div class="home-container">
    <h1>{{ msg }}</h1>
    <h2>一个好用的家庭点菜系统</h2>
    <ul class="links-wrap">
      <li><a href="/#/menu" target="_blank">菜单页</a></li>
      <li><a href="/#/upload" target="_blank">上传页</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: '我爱菜谱'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.links-wrap {
    margin-top: 100px;
}
</style>
