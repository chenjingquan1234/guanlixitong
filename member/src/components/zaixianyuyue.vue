<template>
  <div id="zaixianyuyue">
    <x-header :left-options="{showBack: false}" @on-click-title="onClickTitle">{{title_name}}
      <label slot="left" @click="onClickBack">预约订单</label>
      <label slot="right" @click="onClickMore">预约项目</label>
    </x-header>
    <x-popup v-model="popup" height="40%">
      <center v-for="(value, key) in popup_content" :key="key" @click="title_popup(key)">{{value.store_name}}</center>
      <center style="margin-top: 10px;" @click="title_popup('signOut')">取消</center>
    </x-popup>

    <x-popup v-model="popup_left" position="left" width="80%">
      <tree :tree_data="tree_data" @tree_http="tree_http"></tree>
    </x-popup>

    <x-popup v-model="popup_right" position="right" width="80%">
      <div class="popup-right" v-for="(value, key) in yuyuedingdan" :key="key">
        <div>预约项目:{{value.item_name}}</div>
        <div>预约时间:{{value.appoint_time}}</div>
        <center style="color: red;" @click="delyuyue(value.id)">删除</center>
      </div>
    </x-popup>

    <x-scroller lock-x @on-scroll-bottom="onScrollBottom" :scroll-bottom-offst="100"><div style="height: 100%;">
      <x-checker type="checkbox" v-model="checkbox" default-item-class="default-item-class" selected-item-class="selected-item-class" @on-change="onChange">
        <x-checker-item class="row" v-for="(value, key) in scroller" :key="key" :value="key">
          <img :src="value.image" alt="暂无图片">
          <div class="column">
            <div>{{value.service_item_name}}</div>
            <div class="remark">{{value.remark}}</div>
            <x-rater v-model="value.love" disabled :font-size="16" active-color="#99ccff"></x-rater>
          </div>
          <label style="color: red;">￥{{value.price}}</label>
        </x-checker-item>
      </x-checker>
      <div style="height: 100px; width: 100%;"></div>
    </div></x-scroller>

    <x-group class="x-group-bottom">
      <x-cell :title="total">
        <label class="enter" @click="determine">立即预约</label>
      </x-cell>
    </x-group>
  </div>
</template>

<script>
import tree from "./public/tree.vue"
export default{
  name: "zaixianyuyue",
  components:{
    tree
  },
  data(){
    return{
      loading: false,
      popup: false,
      popup_left: false,
      popup_right: false,
      page: 1,
      last_page: 0,
      quantity: 10,
      total: "",
      checkbox: [],
      title_name: "请选择门店",
      popup_content: [],
      popup_id: "",
      tree_data: [],
      content: [],
      scroller: [],
      yuyue: [],
      yuyuedingdan: []
    }
  },
  methods:{
    onClickTitle: function(){
      this.popup = true;
    },
    onClickBack: function(){
      this.popup_right = true;
      this.$HTTP.HttpPost("/Member/Appointment/getOrderList",
      {sid: this.popup_id,
      page: 1,
      quantity: 999})
      .then((data)=>{
        this.yuyuedingdan = data.data.data.data;
      })
    },
    onClickMore: function(){
      this.popup_left = true;
    },
    delyuyue: function(id){
      this.$vux.confirm.show({
        title: "是否删除预约",
        onConfirm: ()=>{
          this.$HTTP.HttpPost("/Member/Appointment/delOrder", {id: id})
          .then((data)=>{if(data.data.code === 200){this.onClickBack();}})
        }
      })
    },
    tree_http: function(value){
      if(value !== null){
        this.page = 1;
        this.last_page = 0;
        this.quantity = 10;
        this.scroller = [];
      }
      if(this.last_page === this.page){return}
      this.$HTTP.HttpPost("/Member/Appointment/getItemList",
      {sid: this.popup_id,
      classify_id: value,
      page: this.page,
      quantity: this.quantity})
      .then((data)=>{
        this.last_page = data.data.data.last_page;
        this.content = data.data.data.data;
        this.scroller = [...this.scroller, ...this.content];
      })
    },
    onScrollBottom: function(){
      if(this.loading === true){
        return
      }
      else{
        this.loading = true;
        setTimeout(()=>{
          this.tree_http(null);
          if(this.page !== this.last_page){++this.page}
          this.loading = false;
        }, 1000)
      }
    },
    onChange: function(s){
      let total = 0;
      this.yuyue = [];
      for(let i in s){
        total += Number(this.content[s[i]].price);
        this.yuyue = [...this.yuyue, this.content[s[i]]]
      }
      this.total = "已选"+this.checkbox.length+"个项目,预计金额￥"+total;
    },
    title_popup: function(key){
      if(key === "signOut"){
        this.popup = false;
        return
      }
      this.popup_id = this.popup_content[key].id;
      this.title_name = this.popup_content[key].store_name;
      this.$HTTP.HttpPost("/Member/Appointment/getClassifySelect", {sid: this.popup_id})
      .then((data)=>{
        this.tree_data = data.data.data;
      })
      this.popup = false;
    },
    determine: function(){
      if(this.yuyue.length === 0){
        return this.$vux.toast.show({
          text: '请选择预约项目',
          type: "text",
          width: "80%",
          isShowMask: true
        })
      }
      this.$router.push({name: "/yuyue", params: {yuyue: this.yuyue, sid: this.popup_id}});
    }
  },
  created(){
    if(this.$route.params.popup_right !== undefined){this.onClickBack();}
  },
  mounted(){
    this.$HTTP.HttpPost("/Member/Appointment/getStoreSelect", {})
    .then((data)=>{
      this.popup_content = data.data.data;
    })
  }
}
</script>

<style lang="less" scoped>
#zaixianyuyue{
  min-height: 100%;
}
center{
  margin-top: 1px;
  width: 100%;
  height: 50px;
  background: #ffffff;
  line-height: 50px;
}
.selected-item-class{
  background: #f0f0f0!important;
}
.popup-right{
  margin: 10px;
  padding: 10px;
  background: #ffffff;
  color: #303030;
  border-radius: 5px;
}
.row{
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #ffffff;
  border: 1px solid #f0f0f0;
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
.x-group-bottom{
  color: #ff6633;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
.enter{
  display: block;
  height: 48px;
  width: 100px;
  background: #35495e;
  color: #ffffff;
  text-align: center;
  line-height: 48px;
}
/deep/.weui-cell{
  padding: 1px;
}
/deep/p{
  margin: 0;
}
</style>
