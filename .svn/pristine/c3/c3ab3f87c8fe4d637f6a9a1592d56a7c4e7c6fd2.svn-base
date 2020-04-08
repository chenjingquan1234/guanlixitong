<template>
  <div id="home">
    <x-header :left-options="{showBack: false}">{{title}}
      <label slot="right" @click="title_right">我的</label>
    </x-header>
    <x-popup v-model="popup" position="left" width="80%">
      <div class="member-card" v-for="value in card" :key="value.id" @click="replace_card(value.id)">
        <div>卡类型: {{value.card_name}}</div>
        <img src="./../../static/img/business.png" alt="暂无图片">
        <div>卡号: {{value.card_no}}</div>
      </div>
    </x-popup>

    <div class="business-card">
      <div class="header">
        <img :src="head_portrait" alt="暂无图片">
        <label>{{name}}</label>
        <label>卡号:{{card_no}}</label>
      </div>
      <div class="footer">
        <label>余额:{{card_balance}}</label>
        <label>积分:{{integral}}</label>
      </div>
    </div>

    <div class="fun1">
      <div class="content" v-for="value in f1" :key="value.name" @click="fun1(value.methods)">
        <img :src="value.img" alt="error">
        <label>{{value.name}}</label>
      </div>
    </div>

    <div class="fun2">
      <div class="content" v-for="value in f2" :key="value.name" @click="fun2(value.methods)">
        <img :src="value.img" alt="error">
        <label>{{value.name}}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: "home",
  data(){
    return{
      title: "首页",
      popup: false,
      card: [],
      head_portrait: "./../../static/img/user.jpg",
      name: "",
      card_no: "",
      card_balance: "",
      integral: "",
      card_id: "",
      f1: [
        {name: "优惠券", img: "./../../static/img/activity.png", methods: "give"},
        {name: "消费记录", img: "./../../static/img/record.png", methods: "record"},
        {name: "套餐项目", img: "./../../static/img/project.png", methods: "project"}
      ],
      f2: [
        {name: "道路救援", img: "./../../static/img/road.png", methods: "road"},
        {name: "在线预约", img: "./../../static/img/appointment.png", methods: "appointment"},
        {name: "积分商城", img: "./../../static/img/gift.png", methods: "gift"},
        {name: "适用门店", img: "./../../static/img/store.png", methods: "store"}
      ]
    }
  },
  methods:{
    title_right: function(){
      this.popup = true;
      this.$HTTP.HttpPost("/Member/Card/getMemberCardList", {})
      .then((data)=>{
        this.card = data.data.data;
      })
    },
    replace_card: function(id){
      this.$vux.confirm.show({
        title: "是否更换此会员卡",
        onConfirm: ()=>{
          this.$HTTP.HttpPost("/Member/Card/updateMembershipCard", {id: id})
          .then((data)=>{if(data.data.code === 200){this.init();this.popup=false;}})
        }
      })
    },
    fun1: function(key){
      if(key === "give"){
        this.give();
      }
      else if(key === "record"){
        this.record();
      }
      else if(key === "project"){
        this.project();
      }
    },
    fun2: function(key){
      if(key === "road"){
        this.road();
      }
      else if(key === "appointment"){
        this.appointment();
      }
      else if(key === "gift"){
        this.gift();
      }
      else if(key === "store"){
        this.store();
      }
    },
    give: function(){
      this.$router.push({path: "/youhuiquan", query: {token: sessionStorage.token}});
    },
    record: function(){
      if(this.card_id === ""){return}
      this.$router.push({path: "/xiaofeijilu", params: {id: this.card_id}});
    },
    project: function(){
      this.$router.push({path: "/taocanxiangmu"});
    },
    road: function(){
      this.$router.push({path: "/daolujiuyuan"});
    },
    appointment: function(){
      this.$router.push({path: "/zaixianyuyue"});
    },
    gift: function(){
      this.$router.push({path: "/jifenshangcheng"});
    },
    store: function(){
      return this.$vux.toast.show({
        text: '暂时无法查看门店',
        type: "text",
        width: "80%",
        isShowMask: true
      })
    },
    init: function(){
      this.$HTTP.HttpPost("/Member/Index/getCardInfo", {})
      .then((data)=>{
        this.card_id = data.data.data.id;
        this.card_no = data.data.data.card_no;
        this.card_balance = data.data.data.card_balance;
        this.integral = data.data.data.integral;
        this.name = data.data.data.name;
        this.head_portrait = data.data.data.head_portrait;
      })
    }
  },
  created(){
    sessionStorage.token = this.$router.currentRoute.query.token;
    if(this.$router.currentRoute.query.token === undefined){
      window.location.href = "http://api.hfbsoftware.com/member/login/login?hid="+sessionStorage.hid;
    }
  },
  mounted(){
    this.init();
  }
}
</script>

<style scoped>
#home{
  min-height: 100vh;
  background: #f0f0f0;
}
.member-card{
  margin: 10px auto;
  padding: 1px;
  width: 95%;
  height: 9rem;
  border-radius: 5px;
  border: 1px solid #99ccff;
  background: #ffffff;
  font-size: 1rem;
}
.member-card img{
  width: 100%;
  margin: 5px auto;
  height: 6rem;
}
.business-card{
  position: relative;
  margin: 10px auto;
  width: 95%;
  height: 200px;
  border-radius: 10px;
  background: url("./../../static/img/business.png") no-repeat;
  background-size: 100% 200px;
  color: #ffffff;
}
.business-card img{
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}
.business-card .header{
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  align-content: center;
}
.business-card .footer{
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
}
.fun1{
  padding: 5px;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.fun1 img{
  margin: 5px;
  width: 2rem;
  height: 2rem;
}
.fun1 .content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.fun2{
  margin-top: 10px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}
.fun2 img{
  margin: 10px;
  width: 2rem;
  height: 2rem;
}
.fun2 .content{
  border-top: 1px solid #f0f0f0;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
