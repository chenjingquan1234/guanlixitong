<template>
  <div id="Member_shezhikazhong">
    <el-row class="row">
      <el-col :span="4"></el-col>
      <el-col :span="8" v-for="value in list" :key="value.key">
        <router-link class="column" :to="{name: value.url}" @mouseenter.native="mouseClass=value.key" @mouseleave.native="mouseClass=false" :class="{'mouse-class': mouseClass===value.key}">
        <img :src="value.img" alt="error">
        <el-divider><h4>{{value.name}}</h4></el-divider>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default{
  name: "Member_shezhikazhong",
  data(){
    return{
      list: [
        {key: 1, name: "会员卡类型设置", url: "Member_shezhikazhongOne", img: require("../../assets/img/member_type_set.png")},
        {key: 2, name: "会员卡折扣设置", url: "Member_shezhikazhongTwo", img: require("../../assets/img/member_discount_set.png")}
      ],
      mouseClass: false
    }
  }
}
</script>

<style scoped>
#Member_shezhikazhong{
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
