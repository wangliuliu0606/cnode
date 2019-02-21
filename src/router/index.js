import Vue from 'vue'
import Router from 'vue-router'
import PostList from '../components/PostList.vue'
import Article from '../components/Article.vue'
import UserInfo from '../components/UserInfo.vue'
import SlideBar from '../components/SlideBar.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'root',
      path: '/',
      components: {
        main: PostList,
      }
    },{
      name: 'post_content',
      path: '/topic/:id&author=:name',
      components: {
        main: Article,
        slidebar: SlideBar
      }
    },{
      name: 'user_info',
      path: '/user/:username',
      components: {
        main: UserInfo
      }
    }

  ]
})
