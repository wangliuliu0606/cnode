<template>
  <div class="slidebar">
    <div class="authers">
      <div class="top_bar">作者</div>
      <router-link :to="{
        name: 'user_info',
        params: {
          username: userinfo.loginname
        }
      }">
        <img :src="userinfo.avatar_url" alt="">
        <span>{{userinfo.loginname}}</span>
      </router-link>
      <p>积分：{{userinfo.score}}</p>
    </div>
    <div class="recent_topics">
      <div class="top_bar">作者最近主题</div>
      <ul>
        <li v-for="item in topicArr">
          <router-link :to="{
            name: 'post_content',
            params: {
              id: item.id,
              name: item.author.loginname,
            }
          }">
            <p>{{item.title}}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="recent_replies">
      <div class="top_bar">作者最近回复</div>
      <ul>
        <li v-for="item in repliearr">
          <router-link :to="{
            name: 'post_content',
            params: {
              id: item.id,
              name: item.author.loginname,
            }
          }">
            <p>{{item.title}}</p>
          </router-link>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideBar',
  data(){
    return {
      userinfo:{}
    }
  },
  methods: {
    getUserData(){
      this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
      .then(res=>{
        console.log(res.data.data)
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
    this.getUserData()
  },
  computed: {
    topicArr(){
      if(this.userinfo.recent_topics){
        return this.userinfo.recent_topics.slice(0,5)
      }
    },
    repliearr(){
      if(this.userinfo.recent_replies){
        return this.userinfo.recent_replies.slice(0,5)
      }
    }
  },
  watch: {
    '$route'(to,form){
      this.getUserData()
    }
  }
}
</script>

<style scoped>
  .router-link-active {
    text-decoration: none;
  }

  .slidebar {
    float: right;
    width: 25%;
  }

  .authers {
    border-radius: 4px;
    background-color: #fff;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }

  .authers img {
    width: 50px;
    margin: 10px;
    border-radius: 4px;
    vertical-align: middle;
  }

  .authers span {
    color: #778087;
  }

  .authers p {
    font-size: 14px;
    margin-left: 10px;
  }

  .top_bar {
    height: 40px;
    background-color: rgb(246,246,246);
    border-bottom: 1px solid rgb(240,240,240);
    padding-left: 10px;
    line-height: 40px;
    border-radius: 4px 4px 0 0;
    font-size: 13px;
  }

  .recent_topics {
    margin-bottom: 10px;
    border-radius: 4px;
    background-color: #fff;
  }

  .recent_topics ul {
    list-style: none;
    margin: 10px 0;
    padding-bottom: 20px;
  }

  .recent_topics li {
    padding: 0 10px;

  }

  .recent_topics li p {
    color: #778087;
    font-size: 14px;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }

   .recent_replies {
    margin-bottom: 10px;
    border-radius: 4px;
    background-color: #fff;
  }

  .recent_replies ul {
    list-style: none;
    margin: 10px 0;
    padding-bottom: 20px;
  }

  .recent_replies li {
    padding: 0 10px;
  }

  .recent_replies li p {
    color: #778087;
    font-size: 14px;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }



</style>

