<template>
  <div id="youhuiquan">
    <x-flexbox v-if="is_show === 0" class="mulu" orient="vertical" :gutter="16">
      <x-flexbox-item>
        <div @click="ziji" class="row">
          <img class="mulu-img" src="./../../static/img/zjyhq.png" alt="">
          <h3>自己可使用</h3>
          <label style="color: #FF3333;">({{ziji_num}})</label>
        </div>
      </x-flexbox-item>
      <x-flexbox-item>
        <div @click="zengsong" class="row">
          <img class="mulu-img" src="./../../static/img/zsyhq.png" alt="">
          <h3>可赠送朋友</h3>
          <label style="color: #FF3333;">({{zengsong_num}})</label>
        </div>
      </x-flexbox-item>
    </x-flexbox>

    <div v-else-if="is_show === 1">
      <x-header :left-options="{showBack: false}">优惠券
      <label slot="left" @click="is_show = 0">返回</label></x-header>
      <x-flexbox class="yhq" orient="vertical" :gutter="16">
        <x-flexbox-item v-for="(value, key) in yhqList" :key="key">
          <div class="column">
            <img class="yhq-img" src="./../../static/img/business.png" alt="">
            <label>{{value.coupons_name}}</label>
            <label style="color: #c0c0c0; margin-bottom: 0.5rem;">有效期: {{value.youxiaoqi}}</label>
            <x-button style="margin-bottom: 0.5rem;" text="立即使用" mini type="primary" @click.native="shiyong(value.id)"></x-button>
            <div class="money">¥ {{value.amount}}</div>
          </div>
        </x-flexbox-item>
      </x-flexbox>
    </div>

    <div v-else-if="is_show === 2">
      <x-header :left-options="{showBack: false}">优惠券详情
      <label slot="left" @click="is_show = 1">返回</label></x-header>
      <div class="yhqxq">
        <img class="yhq-img" style="border-radius: 0;" src="./../../static/img/business.png" alt="">
        <div class="money">¥ {{yhqxqList.amount}}</div>
        <h3 style="margin: 0.5rem; text-align: center;">{{yhqxqList.coupons_name}}</h3>
        <p style="margin-bottom: 1rem; text-align: center;">有效期: {{yhqxqList.validity_type == 1 ? (yhqxqList.validity_day + "天") : (yhqxqList.start_time + "至" + yhqxqList.end_time)}}</p>
        <x-button style="margin: 0.5rem auto; width: 50%;"
        :disabled="yhqxqList.get_status == 0 ? false : true"
        :type="yhqxqList.get_status == 0 ? 'primary' : 'warn'"
        @click.native="bt_ljsy(yhqxqList.id)">{{yhqxqList.get_status == 0 ? '立即领取' : '已领取'}}</x-button>
        <div style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <img style="width: 1.5rem; height: 1.5rem;" src="./../../static/img/activity.png" alt="">
          <label>使用说明</label>
        </div>
        <p>{{yhqxqList.instructions}}</p>
        <div style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
          <img style="width: 1.5rem; height: 1.5rem;" src="./../../static/img/activity.png" alt="">
          <label>门店信息</label>
        </div>
        <x-cell v-for="(value, key) in yhqxqList.storeList" :key="key"
        :title="'门店名称:' + value.store_name"
        :inline-desc="`地址: ${value.store_address}`"
        :link="'https://apis.map.qq.com/uri/v1/marker?marker=coord:'+ value.latitude + ',' + value.longitude +
        ';title:' + value.store_name + ';addr:' + value.store_address + ';tel:' + value.store_tel + '&referer=HFB-hui-yuan-duan'">
          <template>
            <x-button type="primary" @click.native.stop="call(value.store_tel)">呼叫</x-button>
          </template>
        </x-cell>
      </div>
    </div>
  </div>
</template>

<script>
var geolocation = new qq.maps.Geolocation("T7SBZ-OJTL3-2PU3S-YHABH-GYHJK-FVFXQ", "HFB-hui-yuan-duan");
export default{
	name: "youhuiquan",
	data(){
		return{
      is_show: 0,
      ziji_num: 0,
      zengsong_num: 0,
      yhqList: [],
      coupons_id: "",
      yhqxqList: {},
      token: ""
		}
	},
  methods:{
    ziji(){
      this.is_show = 1;
       this.$axios.post(this.$HTTP.yuming + "/member/coupon/getCouponsList", {token: this.token}, {withCredentials: true})
       .then((data)=>{
         this.yhqList = data.data.data;
         for(let i in this.yhqList){
           this.yhqList[i].youxiaoqi = new Date(this.yhqList[i].begin_time * 1000).toLocaleDateString() + "至" + new Date(this.yhqList[i].end_time * 1000).toLocaleDateString();
         }
       })
    },
    zengsong(){
      this.$vux.toast.show({
        text: "优惠券暂时不能赠送",
        type: "text",
        width: "80%",
        isShowMask: true
      })
    },
    shiyong(id){
      this.is_show = 2;
      this.$axios.post(this.$HTTP.yuming + "/member/coupon/getCouponDetail", {id: id, token: this.token}, {withCredentials: true})
      .then((data)=>{
        this.yhqxqList = data.data.data;
        this.coupons_id = data.data.data.coupons_id;
        this.yhqxqList.start_time = new Date(this.yhqxqList.start_time * 1000).toLocaleDateString();
        this.yhqxqList.end_time = new Date(this.yhqxqList.end_time * 1000).toLocaleDateString();
        if(this.yhqxqList.get_status == 0){
          this.dingshi();
        }
      })
    },
    bt_ljsy(id){
      this.$axios.post(this.$HTTP.yuming + "/member/coupon/getCoupon", {id: id, token: this.token}, {withCredentials: true})
      .then((data)=>{
        this.$vux.toast.show({
          text: data.data.msg,
          type: "text",
          width: "80%",
          isShowMask: true
        })
      })
    },
    call(tel){
      window.location.href = "tel://" + tel;
    },
    dingshi(){
      setTimeout(()=>{
        if(this.is_show === 2){
          this.dingshi();
          this.$axios.post(this.$HTTP.yuming + "/member/coupon/clickTime", {coupons_id: this.coupons_id, token: this.token}, {withCredentials: true})
        }
        else{
          return;
        }
      }, 7000)
    }
  },
  created(){
    let id = this.$router.currentRoute.query.id;
    this.token = this.$router.currentRoute.query.token;
    if(this.token == undefined){
      this.$router.push({path: "/enter", query: {id: id}});
    }
    if(id != undefined){
      this.shiyong(id);
    }
  },
  mounted(){
    this.$axios.post(this.$HTTP.yuming + "/member/coupon/getMyActivity", {token: this.token}, {withCredentials: true})
    .then((data)=>{
      this.ziji_num = data.data.data.myself;
      this.zengsong_num = data.data.data.share;
    })
  }
}
</script>

<style scoped>
.mulu{
  height: 100vh;
  width: 100%;
  background-color: #ffcc00;
}
.yhq{
  height: 100%;
  width: 100%;
  background-color: #e0e0e0;
}
.yhqxq{
  height: 100%;
  width: 100%;
  background-color: #e0e0e0 !important;
}
.row{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: auto;
  border-radius: 0.5rem;
  background-color: #ffffff;
}
.column{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: auto;
  border-radius: 0.5rem;
  background-color: #ffffff;
}
.mulu-img{
  width: 4rem;
  height: 4rem;
  margin: 2rem 1rem;
  border-radius: 50%;
}
.yhq-img{
  position: relative;
  width: 100%;
  height: 8rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
}
.money{
  position: absolute;
  right: 5%;
  color: #ffffff;
  background-color: #505050;
  border-radius: 4px;
  padding: 0.25rem;
}
.vux-flex-col > .vux-flexbox-item{
  width: 90%;
  flex: 0;
}
.vux-flexbox .vux-flexbox-item:first-child{
  margin-top: 1rem !important;
}
/deep/ p{
  margin: 0.5rem;
}
.x-group-bottom{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
.weui-btn + .weui-btn{
  margin: 0;
}
</style>
