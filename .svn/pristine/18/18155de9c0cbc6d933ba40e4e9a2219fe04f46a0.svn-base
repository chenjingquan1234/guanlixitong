<template>
  <div id="five">
    <div class="pb-nav">
      <el-button size="mini" type="info" icon="el-icon-download" @click="download()">打印</el-button>
      <el-input size="mini" style="width: 20rem;" v-model="key_name"><label slot="prepend">单据编号</label></el-input>
      <el-date-picker size="mini"
        v-model="begin_date"
        align="right"
        type="date"
        placeholder="开始日期|时间"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-date-picker size="mini"
        v-model="over_date"
        align="right"
        type="date"
        placeholder="结束日期|时间"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-select size="mini" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-select size="mini" v-model="people_name" clearable placeholder="领料员" @change="people_change">
        <el-option v-for="value in people_select" :key="value.eid" :label="value.name" :value="value.eid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>

    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation="operation" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
  name: "five",
  components:{
    mytable
  },
  data(){
    return{
      begin_date: new Date(),
      over_date: new Date(2019, 0, 1, 0, 0),
      pickerOptions: {
        disabledDate(time){return time.getTime() > Date.now();},
        shortcuts: [{text: '今天',onClick(picker) {picker.$emit('pick', new Date());}},
        {text: '昨天',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24);picker.$emit('pick', date);}},
        {text: '一周前',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', date);}}]
      },
      tableTitle: [
        {key: "order_number", title: "订单号", min_width: "100"},
        {key: "difference_number", title: "相差数量", min_width: "100"},
        {key: "difference_money", title: "相差金额", min_width: "100"},
        {key: "ename", title: "盘点人", min_width: "100"},
        {key: "create_time", title: "时间", min_width: "100"},
        {key: "store_name", title: "门店", min_width: "100"},
        {key: "remark", title: "作废备注", min_width: "100"},
      ],
      tableData: [],
      operation: false,
      //数据
      key_name: "",
      store_name: "",
      store_id: "",
      people_name: "",
      people_id: ""
    }
  },
  props:{
    "store_select": {
      type: Array,
      default: ()=>{}
    },
    "people_select": {
      type: Array,
      default: ()=>{}
    }
  },
  methods:{
    search: function(){
      this.handlePageChange({search: this.key_name, sid: this.store_id});
    },
    download: function(){
      this.$refs.mytable.$refs.xTable.exportData({type: "csv"});
    },
    store_change: function(s){
     this.store_id = s;
    },
    people_change: function(s){
     this.people_id = s;
    },
    resData: function(data){
      this.tableData = data;
      for(let i in this.tableData){
        this.tableData[i].total = this.tableData[i].quantity * this.tableData[i].wholesale_price;
      }
    },
    handlePageChange: function(data){
      if(data === undefined){data = {}}
      this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Statistics/getCancelledCountOrderList", data);
    }
  }
}
</script>

<style scoped>
#five{
  margin: 1rem 5rem;
}
</style>
