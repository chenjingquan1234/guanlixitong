<template>
  <div id="xiaofeijilu">
    <x-scroller lock-x @on-scroll-bottom="onScrollBottom" :scroll-bottom-offst="100"><div>
    <x-flexbox class="x-flexbox">
      <x-flexbox-item :span="1/2"><label style="margin-left: 10px;">总消费额￥{{all_total_amount}}</label></x-flexbox-item>
      <x-flexbox-item>
        <x-button-tab v-model="title" :height="16">
          <x-button-tab-item @on-item-click="title_click(null)">本次消费</x-button-tab-item>
          <x-button-tab-item @on-item-click="title_click($route.params.id)">会员卡消费</x-button-tab-item>
        </x-button-tab>
      </x-flexbox-item>
    </x-flexbox>

    <x-group class="x-group" v-for="(value, key) in scroller" :key="key">
      <x-cell :title="value.store_name" :value="value.create_time" :is-link="true" :arrow-direction="value.key?'up':'down'" :inline-desc="'消费金额￥'+value.total_amount"
      @click.native="value.key = !value.key">
      </x-cell>
      <template v-if="value.key">
        <x-cell><label slot="title" style="color: #99ccff;">工单信息</label></x-cell>
        <x-cell-form-preview :list="value.list"></x-cell-form-preview>
        <x-cell><label slot="title" style="color: #99ccff;">消费项目 合计￥{{value.total_amount}}</label></x-cell>
        <x-cell-form-preview :list="value.list1"></x-cell-form-preview>
      </template>
    </x-group>
    <x-load-more v-if="loading"></x-load-more>
    <x-load-more v-if="!loading" :show-loading="false" tip="已到底线 没有更多项目!" background-color="#606060"></x-load-more>
    </div></x-scroller>
  </div>
</template>

<script>
export default{
  name: "xiaofeijilu",
  data(){
    return{
      loading: false,
      title: 0,
      page: 1,
      quantity: 10,
      last_page: 0,
      content: [],
      scroller: [],
      membership_card_id: "",
      all_total_amount: 0
    }
  },
  methods:{
    title_click: function(s){
      this.scroller = [];
      this.page = 1;
      this.last_page = 0;
      this.membership_card_id = "";
      if(s !== null){
        this.membership_card_id = s;
      }
      this.init();
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
    init: function(){
      if(this.last_page === this.page){return}
      this.$HTTP.HttpPost("/Member/Order/getCarOrderList",
      {membership_card_id: this.membership_card_id,
      page: this.page,
      quantity: this.quantity})
      .then((data)=>{
        this.last_page = data.data.data.last_page;
        this.all_total_amount = data.data.data.all_total_amount;
        if(data.data.code === 200){
          this.content = data.data.data.data;
          for(let i in this.content){
            this.content[i].list = [{label: "工单号", value: this.content[i].list.order_sn},
            {label: "车牌", value: this.content[i].list.plate_id + this.content[i].list.license_plate_number},
            {label: "卡号", value: this.content[i].list.card_no},
            {label: "公里数", value: this.content[i].list.mileage}]
            this.content[i].list1 = [];
            let s = [];
            if(this.content[i].service_item_list.length !== 0){
              this.content[i].list1 = [...this.content[i].list1, ...this.content[i].service_item_list]
            }
            if(this.content[i].product_item_list.length !== 0){
              this.content[i].list1 = [...this.content[i].list1, ...this.content[i].product_item_list]
            }
            if(this.content[i].additional_item_list.length !== 0){
              this.content[i].list1 = [...this.content[i].list1, ...this.content[i].additional_item_list]
            }
            for(let j in this.content[i].list1){
              this.content[i].list1[j] = {label: this.content[i].list1[j].item_name, value: "￥"+this.content[i].list1[j].price+"*"+this.content[i].list1[j].quantity+"="+this.content[i].list1[j].amount};
            }
          }
          this.scroller = [...this.scroller, ...this.content];
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
#xiaofeijilu{
  min-height: 100vh;
  background: #35495e;
}
.x-flexbox{
  color: #ffffff;
  padding: 10px 0;
}
.x-group{
  margin: 0 1rem;
}
/deep/.weui-form-preview__label{
  width: 70%;
  word-break: break-all;
  word-wrap: break-word;
  text-align-last: left;
}
/deep/.weui-cells{
  border-radius: 10px;
}
/deep/p{
  margin: 0;
}
</style>
