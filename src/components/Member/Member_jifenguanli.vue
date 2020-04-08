<template>
  <div id="Member_jifenguanli">
    <el-row class="row">
      <el-col :span="2"></el-col>
      <el-col :span="4" v-for="value in list" :key="value.key">
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
  name: "Member_jifenguanli",
  data(){
    return{
      list: [
        {key: 1, name: "积分查询", url: "Member_jifenguanliOne", img: require("../../assets/img/member_search.png")},
        {key: 2, name: "积分规则设置", url: "Member_jifenguanliTwo", img: require("../../assets/img/operate_set.png")},
        {key: 3, name: "新增积分礼品", url: "Member_jifenguanliThree", img: require("../../assets/img/member_gift.png")},
        {key: 4, name: "新增积分记录", url: "Member_jifenguanliFour", img: require("../../assets/img/member_new_record.png")},
        {key: 5, name: "积分兑换记录", url: "Member_jifenguanliFive", img: require("../../assets/img/member_exchange_record.png")}
      ],
      mouseClass: false,
    }
  }
}
</script>

<style scoped>
#Member_jifenguanli{
  margin-top: 10%;
}
.mouse-class{
  border: 1px solid #99ffff;
  cursor: pointer;
}
.el-divider{
  width: 80%;
}
</style>
