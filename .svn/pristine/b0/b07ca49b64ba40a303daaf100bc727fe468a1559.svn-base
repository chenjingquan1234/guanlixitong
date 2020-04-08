<template>
  <div id="jifenshangcheng">
    <x-tab v-model="title">
      <x-tab-item active-class="tab" @on-item-click="onItemClick">积分商城</x-tab-item>
      <x-tab-item @on-item-click="onItemClick">兑换记录</x-tab-item>
    </x-tab>

    <div v-if="title === 0">
      <x-scroller lock-x @on-scroll-bottom="onScrollBottom" :scroll-bottom-offst="100"><div style="height: 100%;">
        <div class="row" v-for="(value, key) in scroller" :key="key">
          <img :src="value.image" alt="暂无图片">
          <div class="column">
            <div>{{value.gift_name}}</div>
            <div class="remark">{{value.content}}</div>
              <x-group class="x-group">
                <x-cell :title="value.gift_integral">
                  <img style="width: 1rem; height: 1rem; margin: 0; padding-top: 4px;" slot="icon" src="./../../static/img/score.png" alt="暂无图片">
                  <x-inline-x-number v-model="value.gift" button-style="round" :min="0" @on-change="math"></x-inline-x-number>
                </x-cell>
              </x-group>
          </div>
        </div>
        <div style="width: 100%; height: 100px;"></div>
      </div></x-scroller>
      <x-group class="x-group-bottom">
        <x-cell :title="total">
          <img style="width: 1rem; height: 1rem; margin: 10px; padding-top: 4px;" slot="icon" src="./../../static/img/score.png" alt="暂无图片">
          <label class="enter" @click="determine">立即兑换</label>
        </x-cell>
      </x-group>
    </div>
    <div v-if="title === 1">
      <x-scroller lock-x @on-scroll-bottom="onScrollBottom1" :scroll-bottom-offst="100"><div style="height: 100%;">
        <div class="row" v-for="(value, key) in content1" :key="key">
          <img :src="value.image" alt="暂无图片">
          <div class="column">
            <div>{{value.gift_name}}</div>
            <div class="remark">{{value.remark}}</div>
              <x-group class="x-group">
                <x-cell :title="value.gift_integral" :value="value.status">
                  <img style="width: 1rem; height: 1rem; margin: 0; padding-top: 4px;" slot="icon" src="./../../static/img/score.png" alt="暂无图片">
                </x-cell>
              </x-group>
          </div>
        </div>
        <x-load-more v-if="loading"></x-load-more>
        <x-load-more v-if="!loading" :show-loading="false" tip="已到底线 没有更多记录!" background-color="#606060"></x-load-more>
      </div></x-scroller>
    </div>
  </div>
</template>

<script>
export default{
  name: "jifenshangcheng",
  data(){
    return{
      loading: false,
      title: 0,
      total: 0,
      page: 1,
      last_page: 0,
      quantity: 10,
      content: [],
      scroller: [],
      content1: [],
      scroller1: [],
    }
  },
  methods:{
    onItemClick: function(){
      this.page = 1;
      this.last_page = 0;
      this.quantity = 10;
      this.content = [];
      this.scroller = [];
      this.content1 = [];
      this.scroller1 = [];
      if(this.title === 0){this.init()}
      else if(this.title === 1){this.init1()}
    },
    onScrollBottom: function(){
      if(this.loading === true){
        return
      }
      else{
        this.loading = true;
        setTimeout(()=>{
          this.init();
          if(this.page !== this.last_page){++this.page}
          this.loading = false;
        }, 1000)
      }
    },
    onScrollBottom1: function(){
      if(this.loading === true){
        return
      }
      else{
        this.loading = true;
        setTimeout(()=>{
          this.init1();
          if(this.page !== this.last_page){++this.page}
          this.loading = false;
        }, 1000)
      }
    },
    math: function(){
      let num = [];
      num = this.content.map((item, index)=>{
        return item.gift_integral * item.gift;
      })
      this.total = num.reduce((item, index)=>{return item + index});
    },
    determine: function(){
      let gift = [];
      for(let i in this.scroller){
        if(this.scroller[i].gift !== 0){
          gift = [...gift, ...[{id: this.scroller[i].id, quantity: this.scroller[i].gift}]];
        }
      }
      this.$vux.confirm.show({
        title: "收件地址",
        showInput: true,
        onConfirm: (data)=>{
          this.$HTTP.HttpPost("/Member/integral/giftExchange",
          {gift: gift,
          shipping_address: data})
          .then((data)=>{
            this.$vux.toast.show({
              text: data.data.msg,
              type: "text",
              width: "80%",
              isShowMask: true
            })
          })
        }
      })
    },
    init: function(){
      if(this.last_page === this.page){return}
      this.$HTTP.HttpPost("/Member/integral/getGiftList",
      {page: this.page,
      quantity: this.quantity})
      .then((data)=>{
        this.last_page = data.data.data.last_page;
        this.content = data.data.data.data;
        this.scroller = [...this.scroller, ...this.content];
      })
    },
    init1: function(){
      if(this.last_page === this.page){return}
      this.$HTTP.HttpPost("/Member/integral/getExchangeList",
      {page: this.page,
      quantity: this.quantity})
      .then((data)=>{
        this.last_page = data.data.data.last_page;
        this.content1 = data.data.data.data;
        this.scroller1 = [...this.scroller1, ...this.content1];
        for(let i in this.scroller1){
          if(this.scroller1[i].status == 0){
            this.scroller1[i].status = "已申请";
          }
          else if(this.scroller1[i].status == 1){
            this.scroller1[i].status = "通过";
          }
          else if(this.scroller1[i].status == 2){
            this.scroller1[i].status = "不通过";
          }
        }
      })
    }
  },
  mounted(){
    this.init();
  }
}
</script>

<style lang="less" scoped>
#jifenshangcheng{
  min-height: 100%;
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
.enter{
  display: block;
  height: 48px;
  width: 100px;
  background: #ff6633;
  color: #ffffff;
  text-align: center;
  line-height: 48px;
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
