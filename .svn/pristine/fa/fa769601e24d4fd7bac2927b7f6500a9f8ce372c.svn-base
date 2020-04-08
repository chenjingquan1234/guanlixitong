<template>
  <div id="app">
    <div v-if="$route.meta.keepAlive" @click="isDo()">
      <headerN />
      <router-view v-if="alive" />
    </div>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
import headerN from "./components/headerN"

export default {
  name: 'App',
  provide(){
    return {
      reload: this.reload
    }
  },
  data(){
    return{
      alive: true,
      lastTime: null,         //最后一次点击的时间
      currentTime: null,      //当前点击的时间
      timeOut: 60 * 60 * 1000 //设置超时时间:
    }
  },
  components:{
    headerN,
  },
  methods: {
    isDo: function(){
      this.currentTime = new Date().getTime();
      if(this.currentTime - this.lastTime > this.timeOut){
        this.lastTime = new Date().getTime();
        this.$router.push({path: "/enter"});
        this.$message.warning("登录过期--请您重新登录");
      }
      else{
        this.lastTime = new Date().getTime();
      }
    },
    reload: function(){
      this.alive= false
      this.$nextTick(() => {this.alive = true})
    }
  },
  created(){
    this.lastTime = new Date().getTime();
  },
}
</script>

<style>
*{
  font-family: "微软雅黑";
  margin: 0;
  padding: 0;
}
body, html{
  width: 100%;
  height: 100%;
  min-width: 1280px;
  min-height: 100%;
}
#app{
  width: 100%;
  height: 100%;
}
::-webkit-scrollbar {
  width: 0.7rem !important;
  height: 0.7rem !important;
  background: #ffffff !important;
  cursor: pointer !important;
}
::-webkit-scrollbar-thumb {
  border-radius: 0.7rem !important;
  -webkit-box-shadow: inset 0 0 0.7rem rgba(240, 240, 240, 0.5) !important;
  background: rgba(63, 98, 131, 0.8) !important;
  cursor: pointer !important;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 0.7rem rgba(240, 240, 240, 0.5) !important;
  border-radius: 0 !important;
  background: rgba(240, 240, 240, 0.5) !important;
  cursor: pointer !important;
}
a{text-decoration: none;}
a:link {color: #303030} /* 未被访问的链接 color */
a:visited {color: #303030} /* 已被访问过的链接 color */
a:hover {color: #303030} /* 鼠标悬浮在上的链接 color */
a:active {color: #303030} /* 鼠标点中激活链接 color */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"]{
  -moz-appearance: textfield;
}
.effective input::-moz-placeholder {
  color: red;
  opacity: 1;
}
.effective input::-moz-placeholder {
  color: red;
  opacity: 1;
}
.effective input::-ms-input-placeholder{
  color: red;
}
.effective input::-webkit-input-placeholder {
  color: red;
}
.pb-nav{
  padding-bottom: 10px;
  width: 100%;
  box-shadow: 5px 5px 20px #dcdfe6;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.tree-select{
  height: 200px !important;
  overflow: auto !important;
  background-color: #ffffff !important;
}
.row{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
}
.column{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
}
</style>
