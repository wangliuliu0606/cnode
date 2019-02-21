<template>
  <div class="article">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading1.gif" alt="">
    </div>
    <div v-else>
      <div class="topic_header">
        <span class="topic_good">{{post | tobFormatter}}</span>
        <span class="topic_title">{{post.title}}</span>
        <ul class="list">
          <li>• 发布于：{{post.create_at | formatDate}}</li>
          <li>• 作者：{{post.author.loginname}}</li>
          <li>• {{post.visit_count}} 次浏览</li>
          <li>• 来自 {{post | tabFormatter}}</li>
        </ul>
      </div>
      <div v-html="post.content" id="content"></div>
      <div>
        <div class="topbar">{{post.visit_count}} 回复</div>
        <div v-for="(replie,index) in post.replies" class="top_conent">
          <router-link :to="{
              name: 'user_info',
              params: {
                username: replie.author.loginname
              }
            }">
              <img :src="replie.author.avatar_url">
          </router-link>
          <span class="author">{{replie.author.loginname}}</span>
          <span class="create_at">
            <span>{{index + 1}}楼</span>
            <span>{{replie.create_at|formatDate}}</span>
          </span>
          <div class="ups">
            <img src="../assets/zan.png" alt="">
            <span>{{replie.ups.length}}</span>
          </div>
          <p v-html="replie.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data(){
    return {
      isLoading: false,
      post: {}
    }
  },
  methods: {
    getArtData(){
      this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
      .then(res=>{
        console.log(res.data.data)
        if(res.data.success == true){
          this.post = res.data.data
        }
        this.isLoading = false
      })
      .catch(err=>{
        console.log(err)
      })
    }

  },
  beforeMount(){
    this.isLoading = true
    this.getArtData()
  },
  watch: {
    '$route'(to,form){
      this.getArtData()
    }
  }
}
</script>

<style>
  @import url('../assets/markdown-github.css');

  .router-link-active {
    text-decoration: none;
  }

  .loading {
    text-align: center;
  }

  .loading img {
    width: 200px;
  }

  .article {
    margin-top: 14px;
    margin-right: calc(25% + 10px);

  }

  .topic_header {
    padding: 20px;
    border-bottom: 1px solid rgb(229,229,229);
    background-color: #fff;
  }

  .topic_title {
    font-size: 22px;
    font-weight: 700;
    color: rgb(52,52,52);
  }

  .topic_good {
    display: inline-block;
    background-color: rgb(128,189,1);
    font-size: 12px;
    padding: 2px 4px;
    color: #fff;
    border-radius: 3px;
    text-align: center;
  }

  .list {
    margin-top: 10px;
  }

  .list li {
    display: inline-block;
    font-size: 12px;
    color: #838383;
  }

  #content {
    font-size: 16px;
    padding: 20px 20px 0 20px;
    background-color: #fff;
  }

  .topbar {
    height: 40px;
    background-color: rgb(246,246,246);
    border-bottom: 1px solid rgb(240,240,240);
    padding-left: 10px;
    line-height: 40px;
    margin-top: 10px;
  }

  .top_conent {
    background-color: #fff;
    border-bottom: 1px solid rgb(240,240,240);
  }

  .top_conent img {
    width: 30px;
    margin: 10px;
    border-radius: 4px;
    vertical-align: middle;
  }

  .top_conent .author {
    font-size: 12px;
    font-weight: 700;
    color: #666;
  }

  .top_conent .create_at {
    font-size: 11px;
    color: #08c;
  }

  .top_conent .ups img {
    width: 18px;
    margin: 0;
  }


  .top_conent .ups span {
    color: gray;
    font-size: 15px;
  }

  .top_conent .ups {
    float: right;
    margin-right: 14px;
    margin-top: 10px;
  }

  .top_conent p {
    color: #333;
    font-size: 16px;
    margin-left: 30px;
    margin-bottom: 30px;
  }

</style>
