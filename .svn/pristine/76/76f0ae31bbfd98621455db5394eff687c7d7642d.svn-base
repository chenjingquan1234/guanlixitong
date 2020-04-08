<template>
  <div id="Insurance_baoxianyewu">
    <div class="pb-nav">
      <el-button size="mini" type="info" icon="el-icon-download" @click="download()">打印</el-button>
      <el-input size="mini" style="width: 20rem;" v-model="key_name" placeholder="可按姓名/车牌/手机/保险公司搜索"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-select size="mini" v-model="status_name" clearable placeholder="状态" @change="status_change">
        <el-option v-for="value in status_select" :key="value.id" :label="value.status_name" :value="value.id"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>

    <mytable :tableTitle="tableTitle" :tableData="tableData" :check_box="check_box" :operation_del="operation_del" :operation_name="operation_name" :operation_="operation_"
    @resData="resData" @handlePageChange="handlePageChange" @modify="modify" @operat="operat" ref="mytable"></mytable>

    <el-dialog title="保单修改" :visible.sync="dialog" v-if="dialog" width="80%" destroy-on-close close-on-click-modal>
      <xinzengbaodan :modify_data="modify_data" @res_dialog="res_dialog"></xinzengbaodan>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mytable from './../mytable.vue'
import xinzengbaodan from './Insurance_xinzengbaodan.vue'
export default{
  name: "Insurance_baoxianyewu",
  components:{
    mytable,
    xinzengbaodan
  },
  data(){
    return{
      tableTitle: [
        {key: "name", title: "客户姓名", min_width: "100"},
        {key: "tel", title: "手机号", min_width: "100"},
        {key: "car", title: "车牌", min_width: "100"},
        {key: "car_price", title: "购车价格", min_width: "100"},
        {key: "insurance_name", title: "保险公司", min_width: "100"},
        {key: "compulsory_due", title: "交强险", min_width: "100"},
        {key: "vvtax_due", title: "车船税", min_width: "100"},
        {key: "commercial_due", title: "商业险", min_width: "100"},
        {key: "total", title: "合计", min_width: "100"},
        {key: "create_time", title: "创建时间", min_width: "100"},
        {key: "commission", title: "业务提成", min_width: "100"},
        {key: "insured_date", title: "投保日期", min_width: "100"},
        {key: "end_date", title: "保险到期日", min_width: "100"},
        {key: "referrer", title: "推荐人", min_width: "100"},
        {key: "salesman", title: "业务员", min_width: "100"},
        {key: "store_name", title: "门店", min_width: "100"},
        {key: "state", title: "状态", min_width: "100"},
      ],
      tableData: [],
      operation_del: false,
      operation_: true,
      operation_name: "作废",
      check_box: false,
      dialog: false,
      //数据
      key_name: "",
      store_name: "",
      store_id: "",
      store_select: [],
      status_name: "",
      status_id: "",
      status_select: [{id: 0, status_name: "保存"}, {id: 1, status_name: "结算"}, {id: 2, status_name: "作废"}],
      modify_data: {}
    }
  },
  methods:{
    store_change: function(s){
      this.store_id = s;
    },
    status_change: function(s){
      this.status_id = s;
    },
    search: function(){
      this.handlePageChange();
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
    modify: function(row){
      this.$api.HttpPost("/StoreAdmin/Insurance/getInsuranceOrderDetail", {id: row.row.id})
      .then((data)=>{
        if(data.data.code === 200){
          this.dialog = true;
          this.modify_data = data.data.data;
        }
      })
    },
    operat: function(row){
      this.$api.HttpPost("/StoreAdmin/Insurance/cancelInsuranceOrder", {id: row.row.id})
      .then((data)=>{
        if(data.data.code === 200){
          this.$message.success(data.data.msg);
          this.handlePageChange();
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    res_dialog: function(s){
      this.dialog = s;
      this.handlePageChange();
    },
    resData: function(data){
      this.tableData = data;
      for(let i in this.tableData){
        this.tableData[i].total = this.tableData[i].compulsory_due*1 + this.tableData[i].vvtax_due*1 + this.tableData[i].commercial_due*1;
        this.tableData[i].car = this.tableData[i].plate_id + this.tableData[i].license_plate_number;
        if(this.tableData[i].status == 0){
          this.tableData[i].state = "保存"
        }
        else if(this.tableData[i].status == 1){
          this.tableData[i].state = "结算"
        }
        else if(this.tableData[i].status == 2){
          this.tableData[i].state = "作废"
        }
      }
    },
    handlePageChange: function(data){
      if(data === undefined){data = {search: this.key_name, sid: this.store_id, status: this.status_id}}
      this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Insurance/getInsuranceOrderList", data);
    }
  },
  mounted(){
    this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {})
    .then((data)=>{
      this.store_select = data.data;
    })
    this.handlePageChange();
  }
}
</script>

<style scoped>
#Insurance_baoxianyewu{
  margin: 1rem 5rem;
}
</style>
