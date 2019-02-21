<template>
  <div class="userinfo">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading1.gif" alt="">
    </div>
    <div v-else class="userinfomation">
      <section>
        <div class="home">
          <router-link to="/">
            <span>主页</span>
          </router-link>
          /
        </div>
        <img :src="userinfo.avatar_url" alt="">
        <span class="githubUsername">{{userinfo.githubUsername}}</span>
        <p class="score">{{userinfo.score}} 积分</p>
        <p class="create_at">注册时间 {{userinfo.create_at | formatDate}}</p>
      </section>
      <div class="replies">
        <p>最近创建的话题</p>
        <ul>
          <li v-for="item in userinfo.recent_replies">
            <img :src="item.author.avatar_url" alt="">
            <router-link :to="{
              name: 'post_content',
              params: {
                id: item.id,
                name: item.author.loginname
              }
            }">
              <span class="title">{{item.title}}</span>
            </router-link>
            <span class="last_reply_at">{{item.last_reply_at | formatDate}}</span>
          </li>
        </ul>
      </div>
      <div class="topics">
        <p>最近参与的话题</p>
        <ul>
          <li v-for="item in userinfo.recent_topics">
            <img :src="item.author.avatar_url" alt="">
            <router-link :to="{
              name: 'post_content',
              params: {
                id: item.id
              }
            }">
              <span class="title">{{item.title}}</span>
            </router-link>
            <span class="last_reply_at">{{item.last_reply_at | formatDate}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userinfo',
  data(){
    return {
      isLoading: false,
      userinfo: {}
    }
  },
  methods: {
    getUserData(){
      this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.username}`)
      .then(res=>{
        console.log(res.data.data)
        this.isLoading = false
        if(res.data.success == true){
          this.userinfo = res.data.data
        }

      })
      .catch(err=>{
        console.log(err)
      })
    }
  },
  beforeMount(){
    this.isLoading = true
    this.getUserData()
  }

}
</script>

<style scoped>
  .loading {
    text-align: center;
  }

  .loading img {
    width: 200px;
  }

  .userinfomation section {
    background-color: #fff;
    border-radius: 4px;
    margin-top: 10px;
    padding-bottom: 10px;
  }

  .userinfomation section .home {
    height: 40px;
    border-bottom: 1px solid rgb(229,229,229);
    background-color: rgb(246,246,246);
    border-radius: 4px 4px 0 0 ;
  }

  .userinfomation section .home span {
    line-height: 40px;
    margin-left: 10px;
    color: rgb(128,189,1);
  }

  .userinfomation section img {
    width: 40px;
    border-radius: 4px;
    margin: 10px;
    vertical-align: middle;
  }

  .userinfomation section .githubUsername {
    color: #778087;
    font-size: 14px;
  }

  .userinfomation section p {
    margin: 0 0 10px 10px;
  }

  .userinfomation section .score {
    font-size: 14px;
  }

  .userinfomation section .create_at {
    font-size: 14px;
    color: #ababab;
  }

  .replies {
    background-color: #fff;
    border-radius: 4px;
    margin-top: 10px;
  }

  .replies p{
    height: 40px;
    border-bottom: 1px solid rgb(229,229,229);
    background-color: rgb(246,246,246);
    border-radius: 4px 4px 0 0 ;
    line-height: 40px;
    padding-left: 10px;
  }

  .replies ul {
    list-style: none;
  }

  .replies ul li {
    height: 52px;
    border-bottom: 1px solid rgb(229,229,229);
  }

  .replies ul li img {
    width: 30px;
    margin: 10px;
    vertical-align: middle;
  }

  .replies ul li .title {
    color: #08c;
  }

  .replies ul li .last_reply_at {
    float: right;
    margin-right: 10px;
    margin-top: 20px;
    font-size: 11px;
    color: #777;
  }

  .topics {
    background-color: #fff;
    border-radius: 4px;
    margin-top: 10px;
  }

  .topics p{
    height: 40px;
    border-bottom: 1px solid rgb(229,229,229);
    background-color: rgb(246,246,246);
    border-radius: 4px 4px 0 0 ;
    line-height: 40px;
    padding-left: 10px;
  }

  .topics ul {
    list-style: none;
  }

  .topics ul li {
    height: 52px;
    border-bottom: 1px solid rgb(229,229,229);
  }

  .topics ul li img {
    width: 30px;
    margin: 10px;
    vertical-align: middle;
  }

  .topics ul li .title {
    color: #08c;
  }

  .topics ul li .last_reply_at {
    float: right;
    margin-right: 10px;
    margin-top: 20px;
    font-size: 11px;
    color: #777;
  }



</style>
