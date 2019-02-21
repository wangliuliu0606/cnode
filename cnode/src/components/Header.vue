<template>
  <div class="header">
    <router-link :to="{
      name: 'root'
    }">
      <img src="../assets/cnodejs_light.svg" alt="">
    </router-link>

    <ul>
      <router-link :to="{
      name: 'root'
    }">
      <li><a href="#">首页</a></li>
    </router-link>

      <li><a href="#">新手入门</a></li>
      <li><a href="#">API</a></li>
      <li><a href="#">关于</a></li>
      <li><a href="#">注册</a></li>
      <li><a href="#">登录</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  ul,ol {
    list-style: none;
  }

  .header {
    height: 50px;
    background-color: rgb(68,68,68);
  }

  .header::after{
    content:'';
    display: block;
    clear: both;
  }

  img {
    max-width: 120px;
    margin-left: 60px;
    margin-top: 10px;
  }

  li>a {
    display: inline-block;
    height: 50px;
    padding: 0 15px;
    text-decoration: none;
    color: rgb(204,204,204);
    font-size: 14px;
    line-height: 50px;
  }

  li>a:hover {
    color: #fff;
  }

  ul {
    float: right;
    margin-right: 60px;

  }

  li {
    display: inline-block;
  }
</style>
