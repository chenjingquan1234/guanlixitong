<template>
  <div id="one">
    <div class="pb-nav">
      <el-button size="mini" :type="is_time === 1?'primary':''" @click="bt_time(1)">今年</el-button>
      <el-button size="mini" :type="is_time === 2?'primary':''" @click="bt_time(2)">今月</el-button>
      <el-date-picker v-model="s_time" size="mini" type="datetimerange" clearable :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right">
      </el-date-picker>
      <el-select size="mini" v-model="store_name" placeholder="所属门店" clearable @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>

    <el-row class="date">
      <el-col :span="8">
        <div style="color: #ffffff; display: flex; flex-direction: column; align-items: center;">
          <label style="line-height: 100px;">入库金额</label>
          <h1 style="line-height: 1px">{{rk_money}}</h1>
          <label style="line-height: 80px;">入库数量: {{rk_number}}</label>
        </div>
      </el-col>
      <el-col :span="8">
        <el-divider direction="vertical"></el-divider>
        <div style="color: #ffffff; display: flex; flex-direction: column; align-items: center;">
          <label style="line-height: 100px;">出库金额</label>
          <h1 style="line-height: 1px">{{ck_money}}</h1>
          <label style="line-height: 80px;">出库数量: {{ck_number}}</label>
        </div>
      </el-col>
      <el-col :span="8">
        <el-divider direction="vertical"></el-divider>
        <div style="color: #ffffff; display: flex; flex-direction: column; align-items: center;">
          <label style="line-height: 100px;">库存金额</label>
          <h1 style="line-height: 1px">{{kc_money}}</h1>
          <label style="line-height: 80px;">库存数量: {{kc_number}}</label>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12"><mytable height="400px" :tableTitle="tableTitle_rk" :tableData="tableData_rk" :paging="paging" :number="number" :operation="operation"></mytable></el-col>
      <el-col :span="12"><mytable height="400px" :tableTitle="tableTitle_ck" :tableData="tableData_ck" :paging="paging" :number="number" :operation="operation"></mytable></el-col>
    </el-row>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
  name: "one",
  components:{
    mytable
  },
  data(){
    return{
      is_time: 1,
		  pickerOptions: {
        shortcuts: [{text: '最近一周',onClick(picker){const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', [start, end]);}},
        {text: '最近一个月',onClick(picker) {const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);picker.$emit('pick', [start, end]);}},
        {text: '最近三个月',onClick(picker) {const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);picker.$emit('pick', [start, end]);}}]
		  },
      tableTitle_rk: [
        {key: "name", title: "入库项目", min_width: "100"},
        {key: "number", title: "数量", min_width: "100"},
        {key: "money", title: "金额", min_width: "100"}
      ],
      tableData_rk: [],
      tableTitle_ck: [
        {key: "name", title: "出库项目", min_width: "100"},
        {key: "number", title: "数量", min_width: "100"},
        {key: "money", title: "金额", min_width: "100"}
      ],
      tableData_ck: [],
      operation: false,
      number: false,
      paging: false,
      rk_money: 0,
      rk_number: 0,
      ck_money: 0,
      ck_number: 0,
      kc_money: 0,
      kc_number: 0,
      s_time: [],
      store_name: ""
    }
  },
  props:{
    "store_select": {
      type: Array,
      default: ()=>{}
    }
  },
  methods:{
    bt_time(s){
      this.is_time = s;
      if(this.is_time === 1){
        this.s_time = [
          new Date(new Date().getFullYear(), 0, 1),
          new Date(new Date().getFullYear(), 11, 31)
        ]
      }
      else if(this.is_time === 2){
        this.s_time = [
          new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          new Date(new Date().getFullYear(), new Date().getMonth()+1, 1)
        ]
      }
    },
    search(){
      if(this.s_time === null){
        this.s_time = [];
        this.s_time[0] = "";
        this.s_time[1] = "";
      }
      this.$api.HttpPost("/StoreAdmin/Statistics/getInventoryStatistics", {start_time: this.s_time[0], end_time: this.s_time[1], sid: this.store_name})
      .then((data)=>{
        let json = data.data.data;
        this.rk_money = json.rukuMoney;
        this.rk_number = json.rukuNumber;
        this.ck_money = json.chukuMoney;
        this.ck_number = json.chukuNumber;
        this.kc_money = json.kucunMoney;
        this.kc_number = json.kucunNumber;
        this.tableData_rk = [];
        this.tableData_ck = [];
        this.tableData_rk.splice(0, 0, json.caigouList);
        this.tableData_ck.splice(0, 0, json.lingliaoList, json.baoshunList, json.tuihuoList);
      })
    },
    store_change(s){
      this.store_name = s;
    }
  },
  mounted(){
    this.bt_time(1);
    this.search();
  }
}
</script>

<style scoped>
#one{
  margin: 1rem 5rem;
}
.date{
  margin: 10px;
  height: 200px;
  background-color: #6699ff;
}
.el-divider{
  float: left;
  margin: 20px auto;
  height: 160px;
}
</style>
