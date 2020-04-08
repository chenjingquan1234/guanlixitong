<template>
  <div id="three">
    <div class="pb-nav">
      <el-button size="mini" type="info" icon="el-icon-download" @click="download()">导出</el-button>
      <el-input size="mini" v-model="key_name" style="width: 25rem;" placeholder="可按单号,手机号,车牌号,客户姓名,进行搜索"><label slot="prepend">关键字</label></el-input>
      <el-date-picker size="mini" v-model="start_time" type="datetime" placeholder="Start_Time" :picker-options="pickerOptions"></el-date-picker>
      <el-date-picker size="mini" v-model="end_time" type="datetime" placeholder="End_Time" :picker-options="pickerOptions"></el-date-picker>
      <el-select size="mini" v-model="store_name" filterable placeholder="门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search">查询</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation_="operation_" :operation_mod_name="operation_mod_name" :operation_del_name="operation_del_name" :operation_name="operation_name"
    @modify="modify" @del="del" @operat="operat" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>

    <Dialog :title="'工单详情'" :footer="false" ref="dialog">
      <template>
        <mytable :height="'100px'" :tableTitle="dialog_ms_tableTitle" :tableData="dialog_ms_tableData" :operation="operation" :paging="paging"></mytable>
        <mytable :height="'200px'" :tableTitle="dialog_wxxm_tableTitle" :tableData="dialog_wxxm_tableData" :operation="operation" :paging="paging"></mytable>
        <mytable :height="'200px'" :tableTitle="dialog_wxpj_tableTitle" :tableData="dialog_wxpj_tableData" :operation="operation" :paging="paging"></mytable>
        <mytable :height="'100px'" :tableTitle="dialog_fjfy_tableTitle" :tableData="dialog_fjfy_tableData" :operation="operation" :paging="paging"></mytable>
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
      pickerOptions: {
        // disabledDate(time){return time.getTime() > Date.now();},
        shortcuts: [{text: '今天',onClick(picker) {picker.$emit('pick', new Date());}},
        {text: '昨天',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24);picker.$emit('pick', date);}},
        {text: '一周前',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', date);}}]
      },
      //配置
      tableTitle: [
        {key: "order_sn", title: "单号", min_width: "200"},
        {key: "car", title: "车牌号", min_width: "100"},
        {key: "name", title: "姓名", min_width: "100"},
        {key: "p_chexingmingcheng", title: "车型", min_width: "100"},
        {key: "tel", title: "手机号", min_width: "100"},
        {key: "mileage", title: "本次里程数", min_width: "100"},
        {key: "total_cost", title: "总成本", min_width: "100"},
        {key: "amount", title: "实收金额", min_width: "100"},
        {key: "credit", title: "挂账金额", min_width: "100"},
        {key: "preferential_amount", title: "优惠金额", min_width: "100"},
        {key: "total_amount", title: "总金额", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"},
        {key: "create_time", title: "创建时间", min_width: "100"},
      ],
      tableData: [],
      dialog_wxxm_tableTitle: [
        {key: "item_name", title: "维修项目", min_width: "200"},
        {key: "quantity", title: "数量", min_width: "100"},
        {key: "price", title: "单价", min_width: "100"},
        {key: "amount", title: "总金额", min_width: "100"},
        {key: "cp_name", title: "施工人", min_width: "100"},
        {key: "sp_name", title: "销售人", min_width: "100"},
        {key: "discount", title: "折扣", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"},
      ],
      dialog_wxpj_tableTitle: [
        {key: "item_name", title: "维修配件", min_width: "200"},
        {key: "quantity", title: "数量", min_width: "100"},
        {key: "price", title: "单价", min_width: "100"},
        {key: "amount", title: "总金额", min_width: "100"},
        {key: "cp_name", title: "施工人", min_width: "100"},
        {key: "sp_name", title: "销售人", min_width: "100"},
        {key: "discount", title: "折扣", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"},
      ],
      dialog_fjfy_tableTitle: [
        {key: "item_name", title: "附加费用", min_width: "200"},
        {key: "quantity", title: "数量", min_width: "100"},
        {key: "price", title: "单价", min_width: "100"},
        {key: "amount", title: "总金额", min_width: "100"},
        {key: "cp_name", title: "施工人", min_width: "100"},
        {key: "sp_name", title: "销售人", min_width: "100"},
        {key: "discount", title: "折扣", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"},
      ],
      dialog_ms_tableTitle: [
        {key: "item_name", title: "描述项目", min_width: "200"},
        {key: "quantity", title: "数量", min_width: "100"},
        {key: "price", title: "单价", min_width: "100"},
        {key: "amount", title: "总金额", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"},
      ],
      dialog_wxxm_tableData: [],
      dialog_wxpj_tableData: [],
      dialog_fjfy_tableData: [],
      dialog_ms_tableData: [],
      operation: false,
      paging: false,
      operation_: true,
      operation_mod_name: "打印",
      operation_del_name: "作废",
      operation_name: "详情",
      //数据
      key_name: "",
      start_time: "",
      end_time: "",
      store_name: "",
      store_id: "",
    }
  },
  props:{
    "store_select": {
      type: Array,
      default: ()=>{}
    }
  },
  methods:{
    search(){
      this.handlePageChange();
    },
    download(){
      this.$refs.mytable.$refs.xTable.exportData({type: "csv"});
    },
    store_change(s){
      this.store_id = s;
    },
    modify(row){
      this.$confirm('是否打印结算单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
      .then(() => {
        this.$router.push({
          path: "/jsd",
          query: {id: row.row.id}//路由传参数
        })
      })
      .catch(() => {

      });
    },
    del(row){
      this.$api.HttpPost("/storeadmin/order/invalid", {id: row.row.id})
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
    operat(row){
      this.$refs.dialog.init();
      this.$api.HttpPost("/storeadmin/Order/getSettleOrderDetails", {id: row.row.id})
      .then((data)=>{
        let s = data.data.data;
        this.dialog_wxxm_tableData = [];
        this.dialog_wxpj_tableData = [];
        this.dialog_fjfy_tableData = [];
        this.dialog_ms_tableData = [];
        this.dialog_wxxm_tableData = s.serviceList;
        this.dialog_wxpj_tableData = s.productList;
        this.dialog_fjfy_tableData = s.additionalList;
        this.dialog_ms_tableData = s.describeList;
      })
    },
    resData(data){
      this.tableData = data;
      for(let i in this.tableData){
        this.tableData[i].car = this.tableData[i].plate_id + this.tableData[i].license_plate_number;
      }
    },
    handlePageChange(data){
      if(data === undefined){data = {search: this.key_name, start_time: this.start_time, end_time: this.end_time, sid: this.store_id}}
      this.$refs.mytable.findList(this.$store.state.domainName_http+"/storeadmin/Order/getSettledOrderList", data);
    }
  },
  mounted(){

  }
}
</script>

<style scoped>
#three{
  margin: 1rem 5rem;
}
</style>
