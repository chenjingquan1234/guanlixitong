<template>
  <div id="daolujiuyuan">
   <x-cell v-for="(value, key) in daolujiuyuanList" :key="key" :title="value.store_name"
    :link="'https://apis.map.qq.com/uri/v1/marker?marker=coord:'+ value.latitude + ',' + value.longitude +
    ';title:' + value.store_name + ';addr:' + value.store_address + ';tel:' + value.tel + '&referer=HFB-hui-yuan-duan'">
      <template slot="icon">
        <img style="width: 5rem; height: 5rem;" :src="value.logo" alt="暂无图片">
      </template>
      <template>
        <x-button text="呼叫" mini plain type="warn" @click.native.stop="call(value.store_tel)"></x-button>
        <x-button text="发送" mini plain type="primary" @click.native.stop="send(value.sid)"></x-button>
      </template>
      <template slot="inline-desc">
        <p>地址: {{value.store_address}}</p>
        <p>距离: {{value.distance}} km</p>
      </template>
    </x-cell>

    <x-popup v-model="popup" position="bottom" height="40%">
      <x-input style="background: #ffffff;" v-model="name" placeholder="姓名"></x-input>
      <x-input style="background: #ffffff;" v-model="tel" placeholder="电话"></x-input>
      <x-textarea style="background: #ffffff;" v-model="remark" :max="200" autosize placeholder="其他备注"></x-textarea>
      <x-button style="float: right; margin: 1rem;" text="确认发送" mini type="primary" @click.native="enterSend()"></x-button>
    </x-popup>

    <div style="height: 400px;" id="demo"></div>
  </div>
</template>

<script>
var geolocation = new qq.maps.Geolocation("T7SBZ-OJTL3-2PU3S-YHABH-GYHJK-FVFXQ", "HFB-hui-yuan-duan");
export default{
	name: "daolujiuyuan",
	data(){
		return{
      daolujiuyuanList: [
        {}
      ],
      sid: "",
      popup: false,
      name: "",
      tel: "",
      remark: "",
      catchLat: "",
      catchLng: "",
      addr: ""
		}
	},
  methods:{
    onScrollBottom(){

    },
    call(tel){
      window.location.href = "tel://" + tel;
    },
    send(sid){
      this.sid = sid;
      this.name = "",
      this.tel = "",
      this.remark = "";
      this.popup = true;
    },
    enterSend(){
      this.$HTTP.HttpPost("/member/rescue/sendRescue",
      {longitude: this.catchLng,
      latitude: this.catchLat,
      address: this.addr,
      contact_name: this.name,
      member_remark: this.remark,
      tel: this.tel})
      .then((data)=>{
        this.$vux.toast.show({
          text: data.data.msg,
          type: "text",
          width: "80%",
          isShowMask: true
        })
        this.popup = false;
      })
    }
  },
  mounted(){
    this.$HTTP.HttpPost("/member/rescue/getStoreList", {})
    .then((data)=>{
      this.daolujiuyuanList = data.data.data;
      geolocation.getLocation(
      (msg)=>{
        this.remark = msg.province + msg.city + msg.district + msg.addr;
        this.catchLat = msg.lat;
        this.catchLng = msg.lng;
        this.addr = msg.addr;
        let start = 0;
        let end = 0;
        let distance = 0;
        for(let i in this.daolujiuyuanList){
          start = new qq.maps.LatLng(this.catchLat, this.catchLng);
          end = new qq.maps.LatLng(this.daolujiuyuanList[i].latitude, this.daolujiuyuanList[i].longitude);
          distance = Math.round(qq.maps.geometry.spherical.computeDistanceBetween(start, end)*1)/1000;
          this.daolujiuyuanList[i].distance = distance;
        }
      },
      (msg)=>{
        this.$vux.toast.show({
          text: "定位失败 请打开定位刷新重试",
          type: "text",
          width: "80%",
          isShowMask: true
        })
      });
    })
  }
}
</script>

<style scoped>
#daolujiuyuan{
  min-height: 100%;
}
.selected-item-class{
  background: #f0f0f0!important;
}
.vux-button-group > a{
  height: 1.5rem;
  line-height: 1.5rem;
  color: #000000;
  background-color: #ffffff;
}
/deep/ p{
  margin: 0.5rem;
}
</style>
