<template>
  <div id="Operate_jikemosi">
    <el-row class="row">
      <el-col :span="4"></el-col>
      <el-col :span="4" v-for="value in list" :key="value.key">
        <router-link class="column" :to="{name: value.url}" :class="{'mouse-class': mouseClass===value.key}"
        @mouseenter.native="mouseClass=value.key" @mouseleave.native="mouseClass=false">
        <img :src="value.img" alt="error">
        <label>{{value.ename}}</label>
        <el-divider></el-divider>
        <h4>{{value.name}}</h4>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default{
	name: "Operate_jikemosi",
	data(){
		return{
      list: [
        {key: 1, img: require("./../../assets/img/operate_set.png"), ename: "SETUP", name: "返利设置", url: "Operate_jikemosiOne"},
        {key: 2, img: require("./../../assets/img/operate_connections.png"), ename: "CONNECTIONS", name: "顾客人脉层级", url: "Operate_jikemosiTwo"},
        {key: 3, img: require("./../../assets/img/operate_rebate.png"), ename: "REBATE", name: "顾客返利记录", url: "Operate_jikemosiThree"},
        {key: 4, img: require("./../../assets/img/operate_cash.png"), ename: "CASH", name: "顾客提现记录", url: "Operate_jikemosiFour"}
      ],
      mouseClass: false
		}
	},
  mounted(){

  }
}
</script>

<style scoped>
#Operate_jikemosi{
  margin-top: 10%;
}
.mouse-class{
  border: 1px solid #99ffff;
  cursor: pointer;
}
.el-divider{
  margin: 1rem 0;
  width: 50%;
}
</style>
