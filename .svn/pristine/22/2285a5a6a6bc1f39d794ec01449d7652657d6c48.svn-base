<template>
  <div id="yuyue">
    <x-group>
      <x-datetime title="预约时间" format="YYYY-MM-DD HH:mm" v-model="time"
      :start-date="start_date" :min-hour="min_hour" :max-hour="max_hour"></x-datetime>
      <x-input title="备注" type="text" v-model="remark" text-align="right" :show-clear="false"></x-input>
    </x-group>

    <center @click="yuyue">预约</center>
  </div>
</template>

<script>
export default{
  name: "yuyue",
  data(){
    return{
      time: "",
      remark: "",
      start_date: new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+(new Date().getDate()),
      min_hour: 0,
      max_hour: 23
    }
  },
  methods:{
    yuyue: function(){
      let item_name = [];
      for(let i in this.$route.params.yuyue){
        item_name.splice(0, 0, this.$route.params.yuyue[i].service_item_name);
      }
      this.$HTTP.HttpPost("/Member/Appointment/appointment",
      {item_name: item_name,
      appoint_time: this.time,
      sid: this.$route.params.sid,
      remark: this.remark})
      .then((data)=>{
        this.$vux.toast.show({
          text: data.data.msg,
          type: "text",
          width: "80%",
          isShowMask: true
        })
        if(data.data.code === 200){
          this.$router.push({name: "/zaixianyuyue", params: {popup_right: true}});
        }
      })
    }
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
center{
  margin: 1rem auto;
  width: 8rem;
  height: 2rem;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  background: #99ccff;
  line-height: 2rem;
}
/deep/p{
  margin: 0;
  padding: 0;
}
</style>
