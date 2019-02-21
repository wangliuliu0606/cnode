<template>
  <div class="psgination">
    <button  @click="changeBtn">首页</button>
    <button @click="changeBtn">上一页</button>
    <button v-if="judge" class="pagebtn">....</button>
    <button v-for="btn in pagebtn"
      :class="[{currentPage: btn == currentPage},'pagebtn']"
      @click="changeBtn(btn)">
      {{btn}}
    </button>
    <button @click="changeBtn">下一页</button>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'psgination',
  data(){
    return {
      pagebtn: [1,2,3,4,5,'....'],
      currentPage: 1,
      judge: false
    }
  },
  methods: {
    changeBtn(page){
      if(typeof page != 'number'){
        switch(page.target.innerText){
          case '上一页':
          $('button.currentPage').prev().click()
          break;
          case '下一页':
          $('button.currentPage').next().click()
          break;
          case '首页':
          this.pagebtn = [1,2,3,4,5,'....']
          this.changeBtn(1)
          break;
          default:
          break;
        }
        return
      }

      this.currentPage = page
      if(page == this.pagebtn[4]){
        this.pagebtn.shift()
        this.pagebtn.splice(4,0,this.pagebtn[3] + 1)
        this.judge = true
      }
      if(page ==  this.pagebtn[0] && page != 1){
        this.pagebtn.splice(4,1)
        this.pagebtn.unshift(this.pagebtn[0]-1)
      }
      if(page <3) {
         this.judge = false
      }

      this.$emit('handleList',this.currentPage)
    }
  }
}
</script>

<style scoped>
  .psgination {
    border: 1px solid #ccc;
    padding: 6px 20px;
    margin: 10px;
    border-radius: 4px;
  }

  .psgination button {
    margin-right: 6px;
    border-style: none;
    background-color: #fff;
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
  }

  .pagebtn {
    width: 40px;
  }

  .psgination .currentPage {
    color: white;
    background-color: #1f1b1b;

  }




</style>
