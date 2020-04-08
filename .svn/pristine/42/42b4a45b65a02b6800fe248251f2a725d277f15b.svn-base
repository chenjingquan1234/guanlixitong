<template>
  <div id="enter">
    <x-tab v-model="title" active-color="#99ccff">
      <x-tab-item>注册</x-tab-item>
      <x-tab-item>绑定(老用户)</x-tab-item>
    </x-tab>

    <div v-if="title === 0" key="0">
      <div class="bg0"></div>
      <x-input title="姓名" type="text" :max="6" v-model="name" text-align="right" :show-clear="false"></x-input>
      <x-input title="密码" type="password" :max="24" v-model="password" text-align="right" :show-clear="false"></x-input>
      <x-input title="确认密码" type="password" :max="24" v-model="resolve_password" text-align="right" :show-clear="false"></x-input>
      <x-input title="车主电话" type="tel" mask="999 9999 9999" v-model="tel" :max="13" is-type="china-mobile" text-align="right" :show-clear="false"></x-input>
      <x-popup-picker title="性别" show-name :data="data_sex" v-model="sex"></x-popup-picker>
      <x-popup-picker title="所属门店" show-name :data="data_store" v-model="store"></x-popup-picker>
      <div class="row">
        <x-popup-picker title="车牌" :data="data_car" v-model="car_no" placeholder="请选择车牌"></x-popup-picker>
        <x-input :max="10" v-model="car_number" text-align="right" placeholder="车牌号" :show-clear="false"></x-input>
      </div>
      <center><button class="binding" @click="enter">确定</button></center>
    </div>
    <div v-if="title === 1" key="1">
      <div class="bg1"></div>
      <x-search auto-scroll-to-top placeholder="输入车牌号搜索" :results="results" v-model="value_search" @on-result-click="onResultClick">
        <div slot="right" style="background: #99ccff; color: #ffffff; line-height: 28px; margin-left: 5px; margin-right: 10px;" @click="search">搜索</div>
      </x-search>
      <x-input title="车主名称" :max="6" v-model="car_name" text-align="right" :show-clear="false"></x-input>
      <x-input title="车主电话" type="tel" mask="999 9999 9999" v-model="car_tel" :max="13" is-type="china-mobile" text-align="right" :show-clear="false"></x-input>
      <center><button class="binding" @click="binding">绑定</button></center>
    </div>
  </div>
</template>

<script>
export default{
  name: "enter",
  data(){
    return{
      title: 1,
      value_search: "",
      search_id: "",
      results: [],
      name: "",
      password: null,
      resolve_password: null,
      tel: null,
      sex: [],
      data_sex: [[{name: "男", value: "0"}, {name: "女", value: "1"}]],
      store: [],
      data_store: [[]],
      car_no: [],
      data_car: [["粤", "京", "津", "黑", "吉", "辽", "冀", "豫", "鲁", "晋", "陕", "蒙", "宁", "陇", "甘", "新", "青", "藏", "鄂", "皖", "苏",
      "沪", "浙", "闽", "湘", "赣", "川", "渝", "贵", "云", "桂", "琼", "港", "澳", "台"]],
      car_number: "",
      car_name: "",
      car_tel: null
    }
  },
  methods:{
    search: function(){
      this.results = [];
      this.$HTTP.HttpPost("/Member/Login/getCustomerSearchSelect",
      {search: this.value_search,
      hid: sessionStorage.hid})
      .then((data)=>{
        if(data.data.data.length === 0){
          return this.$vux.toast.show({
           text: '未搜索到车牌,请转到注册!',
           type: "text",
           width: "80%",
           isShowMask: true
          })
        }
        this.results = data.data.data.map((item, index)=>{
          return {title: item.plate_id + item.license_plate_number, id: item.id};
        })
      })
    },
    onResultClick: function(value){
      this.value_search = value.title;
      this.search_id = value.id;
    },
    enter: function(){
      this.tel = this.tel.replace(/\s+/g,"");
      this.$HTTP.HttpPost("/Member/Login/register",
      {name: this.name,
      password: this.password,
      repassword: this.resolve_password,
      tel: this.tel,
      sex: this.sex.join(""),
      sid: this.store.join(""),
      plate_id: this.car_no.join(""),
      license_plate_number: this.car_number,
      openid: sessionStorage.openid,
      hid: sessionStorage.hid})
      .then((data)=>{
        if(data.data.code === 200){
          window.location.href = "http://api.hfbsoftware.com/member/login/login?hid="+sessionStorage.hid;
        }
        else{
          return this.$vux.toast.show({
           text: data.data.msg,
           type: "text",
           width: "80%",
           isShowMask: true
          })
        }
      })
    },
    binding: function(){
      this.car_tel = this.car_tel.replace(/\s+/g,"");
      this.$HTTP.HttpPost("/Member/Login/accountBind",
      {member_id: this.search_id,
      name: this.car_name,
      tel: this.car_tel,
      openid: sessionStorage.openid,
      hid: sessionStorage.hid})
      .then((data)=>{
        if(data.data.code === 200){
          window.location.href = "http://api.hfbsoftware.com/member/login/login?hid="+sessionStorage.hid;
        }
        else{
          return this.$vux.toast.show({
            text: data.data.msg,
            type: "text",
            width: "80%",
            isShowMask: true
          })
        }
      })
    }
  },
  created(){
    sessionStorage.openid = this.$router.currentRoute.query.openid;
    if(this.$router.currentRoute.query.openid === undefined){
      window.location.href = "http://api.hfbsoftware.com/member/login/login?hid="+sessionStorage.hid+"&coupons_id="+this.$router.currentRoute.query.id;
    }
  },
  mounted(){
    this.$HTTP.HttpPost("/member/login/getStoreSelect", {hid: sessionStorage.hid})
    .then((data)=>{
      this.data_store[0] = data.data.data.map((item, index)=>{
        return {name: item.store_name, value: item.id.toString()};
      })
    })
  }
}
</script>

<style lang="less" scoped>
#enter{
  height: 100vh;
}
.bg0{
  width: 100%;
  height: 100px;
  background: #99ccff;
  background-image: repeating-linear-gradient(#99ccff, #ffffff, #99ccff);
}
.row{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.bg1{
  width: 100%;
  height: 100px;
  background: #99ccff;
  background-image: repeating-linear-gradient(#ffffff, #99ccff, #ffffff);
}
.binding{
  margin: 1rem 0;
  width: 8rem;
  height: 2rem;
  background: #99ccff;
  color: #ffffff;
  border: 1px solid #99ccff;
  border-radius: 5px;
}
/deep/.vux-cell-box{
  width: 100%;
}
/deep/.weui-search-bar{
  margin-top: 5px;
  margin-bottom: 1rem;
  padding: 1px;
  background: #99ccff;
}
/deep/.weui-search-bar__cancel-btn{
  margin-left: 10px;
  margin-right: 5px;
  color: #ffffff;
}
</style>
