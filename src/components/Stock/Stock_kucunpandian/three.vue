<template>
  <div id="three">
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
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>

    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation_mod="operation_mod" :operation_del_name="operation_del_name" :operation_="operation_" :operation_name="operation_name"
    @resData="resData" @handlePageChange="handlePageChange" @del="del" @operat="operat" ref="mytable"></mytable>

    <Dialog :title="'详情'" :footer="false" ref="Dialog">
      <template>
        <mytable :tableTitle="d_tableTitle" :tableData="d_tableData" :operation="operation" :paging="paging"></mytable>
      </template>
    </Dialog>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
import Dialog from "./../../other/Dialog.vue"
export default{
  name: "three",
  components:{
    mytable,
    Dialog
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
        {key: "order_number", title: "单号", min_width: "100"},
        {key: "ename", title: "盘点人", min_width: "100"},
        {key: "difference_number", title: "相差数量", min_width: "100"},
        {key: "difference_money", title: "相差金额", min_width: "100"},
        {key: "store_name", title: "门店", min_width: "100"},
        {key: "create_time", title: "时间", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"}
      ],
      tableData: [],
      d_tableTitle: [
        {key: "product_name", title: "商品名称", min_width: "100"},
        {key: "wholesale_price", title: "价格", min_width: "100"},
        {key: "quantity", title: "数量", min_width: "100"},
        {key: "total", title: "合计", min_width: "100"}
      ],
      d_tableData: [],
      operation: false,
      paging: false,
      operation_mod: false,
      operation_: true,
      operation_del_name: "作废",
      operation_name: "详情",
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
    download: function(){
      this.$refs.mytable.$refs.xTable.exportData({type: "csv"});
    },
    store_change: function(s){
      this.store_id = s;
    },
    people_change: function(s){
      this.people_id = s;
    },
    operat: function(row){
      this.$refs.Dialog.init();
      this.$api.HttpPost("/StoreAdmin/Statistics/getOrderItems", {id: row.row.id})
      .then((data)=>{
        this.$nextTick(()=>{
          this.d_tableData = data.data.data;
          for(let i in this.d_tableData){
            this.d_tableData[i].total = this.d_tableData[i].wholesale_price * this.d_tableData[i].quantity;
          }
        })
      })
    },
    del: function(row){
      this.$api.HttpPost("/StoreAdmin/Statistics/cancelPickingOrder", {id: row.row.id})
      .then((data)=>{
        if(data.data.code === 200){
          this.handlePageChange();
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    resData: function(data){
      this.tableData = data;
    },
    handlePageChange: function(data){
      if(data === undefined){data = {}}
      this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Statistics/getCountOrderLis", data);
    }
  }
}
</script>

<style scoped>
#three{
  margin: 1rem 5rem;
}
</style>
