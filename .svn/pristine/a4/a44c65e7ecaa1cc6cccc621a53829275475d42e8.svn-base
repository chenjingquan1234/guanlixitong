<template>
  <div id="taocanxiangmu">
      <div class="content" v-for="(value, key) in content" :key="key">
        <div style="padding: 10px;">{{value.service_item_name}}</div>
        <div class="row1">
          <!-- <label>已用{{value.time}}</label> -->
          <label>剩余{{value.times}}</label>
        </div>
        <div class="row2">
          <label>￥{{value.price}}</label>
          <label>有效期{{value.create_time}}</label>
        </div>
      </div>
      <center style="color: #999999;">---已经到底 没有更多项目---</center>
  </div>
</template>

<script>
export default{
  name: "taocanxiangmu",
  data(){
    return{
      content: []
    }
  },
  methods:{
    init: function(){
      this.$HTTP.HttpPost("/Member/Card/getItemList", {})
      .then((data)=>{
        this.content = data.data.data;
      })
    }
  },
  mounted(){
    this.init();
  }
}
</script>

<style lang="less" scoped>
#taocanxiangmu{
  min-height: 100vh;
  background: #35495e;
  padding: 1px;
}
.weui-loadmore_line{
  margin: 0 auto;
  padding: 10px;
}
.content{
  margin: 10px auto;
  width: 95%;
  height: 100px;
  background: #ffffff;
  border-radius: 10px;
}
.row1{
  padding: 3px 10px;
  display: flex;
  flex-direction: row;
  color: #c0c0c0;
}
.row2{
  padding: 3px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #c0c0c0;
}
</style>
