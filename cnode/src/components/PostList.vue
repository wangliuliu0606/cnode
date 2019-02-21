<template>
  <div class="PostList">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading1.gif" alt="">
    </div>
    <div class="posts" v-else>
      <ul>
        <li>
          <span class="active"><a href="#">全部</a></span>
          <span><a href="#">精华</a></span>
          <span><a href="#">分享</a></span>
          <span><a href="#">回答</a></span>
          <span><a href="#">招聘</a></span>
        </li>
        <li v-for=" post in posts">
          <img :src="post.author.avatar_url" alt="">
          <span class="count">
            <span class="rep-count">{{post.reply_count}}</span>
            /{{post.visit_count}}
          </span>
          <span :class="[{put_good: (post.good == true),put_top:(post.top==true),'topiclist-tab': (post.good !=true && post.top != true)}]">
            {{post | tabFormatter}}
          </span>

          <router-link :to="{
            name: 'post_content',
            params: {
              id: post.id,
              name: post.author.loginname,
            }
          }">
            <span class="title">{{post.title}}</span>
          </router-link>

          <span class="last-reply">{{post.last_reply_at | formatDate}}</span>
        </li>

        <li>
          <Psgination @handleList="randeList"></Psgination>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import Psgination from './Psgination'
export default {
  name: 'PostList',
  data(){
    return {
      isLoading: false,
      posts: [],
      pagedata: 1
    }
  },
  components: {
    Psgination
  },
  methods: {
    getData(){
      this.$http.get('https://cnodejs.org/api/v1/topics',{
        params: {
          page: this.pagedata,
          limit: 20,
        }
      })
        .then(res=>{
          this.isLoading = false
          this.posts = res.data.data
          console.log(res.data.data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    randeList(value){
      this.pagedata = value
      this.getData()
    }
  },
  beforeMount(){
    this.isLoading = true
    this.getData()
  }
}
</script>

<style scoped>
  .router-link-active {
    text-decoration: none;
  }

  .loading {
    text-align: center;
  }

  .loading img {
    width: 200px;
  }

  .PostList {
    margin-top: 14px;
    background-color: #fff;
  }

  .posts img {
    width: 30px;
    margin: 10px 0px 10px 10px;
    vertical-align: middle;
  }

  ul{
    list-style:none;
    padding: 0;
    margin: 0;
  }

  li {
    height: 50px;
    border-bottom: rgb(240,240,240) solid 1px;

  }

  li:hover {
    background-color: rgb(246,246,246);
  }

  li:first-child {
    height: 40px;
    background-color: rgb(246,246,246);
  }

  .count {
    display: inline-block;
    min-width: 70px;
    text-align: center;
    font-size: 10px;
    color: #b4b4b4;
  }

  .rep-count {
    color: #9e78c0;
  }

  .put_good,
  .put_top {
    display: inline-block;
    background-color: rgb(128,189,1);
    font-size: 12px;
    padding: 2px 4px;
    color: #fff;
    border-radius: 3px;
    text-align: center;
  }

  .topiclist-tab {
    display: inline-block;
    background-color: #e5e5e5;
    font-size: 12px;
    padding: 2px 4px;
    color: #999;
    border-radius: 3px;
    text-align: center;
  }

  .title {
    color: #333;
  }


  .last-reply {
    float: right;
    margin-top: 16px;
    margin-right: 10px;
    color: #778087;
    font-size: 11px;
  }

  li:first-child span {
    line-height: 40px;
    margin: 0 10px;
  }

  li:first-child a {
    font-size: 14px;
    color: rgb(128,189,1);
    text-decoration: none;
  }

  li:first-child a:hover {
    color: #08c;
  }

  .active {
    background-color: rgb(128,189,1);
    padding: 2px 6px;
    border-radius: 4px;

  }

  li:first-child .active a {
    color: #fff;
  }

</style>

