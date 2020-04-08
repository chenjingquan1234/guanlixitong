<template>
  <div id="shiyongmendian">
    <x-tab v-model="title">
      <x-tab-item active-class="tab" @on-item-click="onItemClick">积分商城</x-tab-item>
      <x-tab-item @on-item-click="onItemClick">兑换记录</x-tab-item>
    </x-tab>

    <div v-if="title === 0">
      <div class="row" v-for="(value, key) in content" :key="key">
        <img :src="value.img" alt="暂无图片">
        <div class="column">
          <div>{{value.title}}</div>
          <div class="remark">{{value.remark}}</div>
            <x-group class="x-group">
              <x-cell :title="value.score">
                <img style="width: 1rem; height: 1rem; margin: 0; padding-top: 4px;" slot="icon" src="./../../static/img/score.png" alt="暂无图片">
                <x-inline-x-number v-model="value.gift" button-style="round" :min="0" @on-change="math"></x-inline-x-number>
              </x-cell>
            </x-group>
        </div>
      </div>
      <x-group class="x-group-bottom">
        <x-cell :title="total">
          <img style="width: 1rem; height: 1rem; margin: 1rem; padding-top: 4px;" slot="icon" src="./../../static/img/score.png" alt="暂无图片">
          <label style="margin: 1rem;" @click="determine">立即兑换</label>
        </x-cell>
      </x-group>
    </div>

    <div v-if="title === 1">
      <div class="row" v-for="(value, key) in content1" :key="key">
        <img :src="value.img" alt="暂无图片">
        <div class="column">
          <div>{{value.title}}</div>
          <div class="remark">{{value.remark}}</div>
            <x-group class="x-group">
              <x-cell :title="value.score" :value="value.examine">
                <img style="width: 1rem; height: 1rem; margin: 0; padding-top: 4px;" slot="icon" src="./../../static/img/score.png" alt="暂无图片">
              </x-cell>
            </x-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: "shiyongmendian",
  data(){
    return{
      title: 0,
      total: 0,
      content: [
        {img: "./../../static/img/gift.png", title: "四轮定位", score: 1000, gift: 0, remark: "我是详情四轮定位"},
        {img: "./../../static/img/signOut.png", title: "机油滤清", score: 200, gift: 0, remark: "我是详情机油滤清"},
        {img: "./../../static/img/user.jpg", title: "头像", score: 1, gift: 0, remark: "我是详情头像"},
        {img: "./../../static/img/store.png", title: "车身金属", score: 10000, gift: 0, remark: "我是详情车身金属"},
        {img: "./../../static/img/gift.png", title: "四轮定位", score: 1000, gift: 0, remark: "我是详情四轮定位"},
        {img: "./../../static/img/signOut.png", title: "机油滤清", score: 200, gift: 0, remark: "我是详情机油滤清"},
        {img: "./../../static/img/user.jpg", title: "头像", score: 1, gift: 0, remark: "我是详情头像"},
        {img: "./../../static/img/store.png", title: "车身金属", score: 10000, gift: 0, remark: "我是详情车身金属"}
      ],
      content1: [
        {img: "./../../static/img/user.jpg", title: "头像", score: 1, examine: "审核不通过", remark: "我是详情头像"},
      ]
    }
  },
  methods:{
    onItemClick: function(s){

    },
    math: function(){
      let num = [];
      num = this.content.map((item, index)=>{
        return item.score * item.gift;
      })
      this.total = num.reduce((item, index)=>{return item + index});
    },
    determine: function(){

    }
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
#shiyongmendian{
  margin-bottom: 80px;
}
.tab{
  color: #ff6633 !important;
  border-color: #ff6633 !important;
}
.row{
  margin: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.column{
  width: 80%;
  display: flex;
  flex-direction: column;
}
.row img{
  margin: 10px;
  width: 5rem;
  height: 5rem;
  border-radius: 5px;
}
.remark{
  margin-top: 10px;
  color: #c0c0c0;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.x-group{
  color: #ff6633;
}
.x-group-bottom{
  color: #ff6633;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
/deep/p{
  padding: 0;
  margin: 0;
}
/deep/.weui-cell{
  padding: 1px;
}
/deep/.vux-inline-x-number{
  padding-top: 6px;
}
</style>
