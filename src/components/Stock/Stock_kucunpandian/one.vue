<template>
  <div id="one">
    <div class="pb-nav">
      <el-select size="mini" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <div style="margin: 5rem; display: flex; flex-direction: row; justify-content: space-between;">
      <div style="display: flex; flex-direction: column; align-items: center;">
        <canvas class="canvas1"></canvas>
        <label class="label1">本日盘点金额</label>
        <label class="label2">{{list.today}}</label>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center;">
        <canvas class="canvas2"></canvas>
        <label class="label3">本月盘点金额</label>
        <label class="label4">{{list.month}}</label>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center;">
        <canvas class="canvas3"></canvas>
        <label class="label5">累计盘点金额</label>
        <label class="label6">{{list.history}}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: "one",
  data(){
    return{
      store_name: "",
      list: []
    }
  },
  props:{
    "store_select": {
      type: Array,
      default: ()=>{}
    },
  },
  methods:{
    search: function(){
      this.$api.HttpPost("/StoreAdmin/Statistics/allMoney", {sid: this.store_name, type: 1})
      .then((data)=>{
        this.list = data.data.data;
      })
    },
    store_change: function(s){
      this.store_name = s;
    }
  },
  created(){
    this.search();
  }
}
</script>

<style scoped>
#one{
  margin: 1rem 5rem;
}
.canvas1{
  width: 100px;
  height: 100px;
  border-width: 50px;
  border-style: solid;
  border-top-color: #ffcc00;
  border-right-color: #ffcc00;
  border-bottom-color: #f0f0f0;
  border-left-color: #f0f0f0;
  border-radius: 50%;
  transform: rotate(-45deg);
  font-size: #000;
}
.canvas2{
  width: 100px;
  height: 100px;
  border-width: 50px;
  border-style: solid;
  border-top-color: #6699ff;
  border-right-color: #6699ff;
  border-bottom-color: #f0f0f0;
  border-left-color: #f0f0f0;
  border-radius: 50%;
  transform: rotate(-45deg);
  font-size: #000;
}
.canvas3{
  width: 100px;
  height: 100px;
  border-width: 50px;
  border-style: solid;
  border-top-color: #9900ff;
  border-right-color: #9900ff;
  border-bottom-color: #f0f0f0;
  border-left-color: #f0f0f0;
  border-radius: 50%;
  transform: rotate(-45deg);
  font-size: #000;
}
.label1{
  position: relative;
  top: -180px;
  color: #ffffff;
}
.label2{
  position: relative;
  top: -130px;
  color: #ffcc00;
}
.label3{
  position: relative;
  top: -180px;
  color: #ffffff;
}
.label4{
  position: relative;
  top: -130px;
  color: #6699ff;
}
.label5{
  position: relative;
  top: -180px;
  color: #ffffff;
}
.label6{
  position: relative;
  top: -130px;
  color: #9900ff;
}
</style>
