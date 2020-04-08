<template>
  <div id="Stock_jichushezhi">
	  <el-row class="row">
      <el-col :span="3"></el-col>
      <el-col :span="6" v-for="value in list" :key="value.key">
        <router-link class="column" :to="{name: value.url}" :class="{'mouse-class': mouseClass===value.key}"
        @mouseenter.native="mouseClass=value.key" @mouseleave.native="mouseClass=false">
        <img :src="value.img" alt="error">
        <el-divider><h4>{{value.name}}</h4></el-divider>
        </router-link>
      </el-col>
	  </el-row>
  </div>
</template>

<script>
export default{
  name: "Stock_jichushezhi",
  data(){
    return{
      list: [
        {key: 1, name: "供应商设置", url: "Stock_jichushezhiOne", img: require("../../assets/img/member_type_set.png")},
        {key: 2, name: "产品信息设置", url: "Stock_jichushezhiTwo", img: require("../../assets/img/member_type_set.png")},
        {key: 3, name: "仓库设置", url: "Stock_jichushezhiThree", img: require("../../assets/img/member_type_set.png")}
      ],
      mouseClass: false
    }
  }
}
</script>

<style scoped>
#Stock_jichushezhi{
  margin-top: 10%;
}
.mouse-class{
  border: 1px solid #99ffff;
  cursor: pointer;
}
.el-divider{
  width: 60%;
}
</style>
