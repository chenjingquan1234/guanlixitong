<template>
  <div id="one">
    <!-- 操作功能 -->
    <div class="pb-nav">
      <el-button size="mini" type="primary" icon="el-icon-plus" @click="modify(null, 1)">添加</el-button>
      <el-button size="mini" type="danger" icon="el-icon-delete" @click="del()">删除</el-button>
      <el-button size="mini" type="info" icon="el-icon-download" @click="download()">导出</el-button>
      <el-input size="mini" v-model="key_name" style="width: 30rem;" placeholder="可按供应商名称,联系人,手机号码,联系电话,备注进行搜索"><label slot="prepend">关键字</label></el-input>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <!-- 表格 -->
    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation_del="operation_del"
    @resData="resData" @handlePageChange="handlePageChange" @modify="modify" ref="mytable"></mytable>
    <!-- 增加修改框 -->
    <el-dialog title="供应商资料" :visible.sync="dialog" :close-on-click-modal="false" @close="close">
      <el-input size="mini" v-model="dialog_a"><label slot="prepend" style="color: red;">供应商名称</label></el-input>
      <el-input size="mini" v-model="dialog_b"><label slot="prepend" style="color: red;">姓名&#12288&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="dialog_c"><label slot="prepend" style="color: red;">手机号码&#12288</label></el-input>
      <el-input size="mini" v-model="dialog_d"><label slot="prepend">联系电话&#12288</label></el-input>
      <el-input size="mini" v-model="dialog_e"><label slot="prepend">传真&#12288&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="dialog_f"><label slot="prepend">结算方式&#12288</label></el-input>
      <el-input size="mini" v-model="dialog_g"><label slot="prepend">银行(户名)&#160</label></el-input>
      <el-input size="mini" v-model="dialog_h"><label slot="prepend">银行(开户)&#160</label></el-input>
      <el-input size="mini" v-model="dialog_i"><label slot="prepend">银行(卡号)&#160</label></el-input>
      <el-input size="mini" v-model="dialog_j"><label slot="prepend">排序&#12288&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="dialog_k"><label slot="prepend">地址&#12288&#12288&#12288</label></el-input>
      <el-input size="mini" v-model="dialog_l" type="textarea" placeholder="备注"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialog=false">取 消</el-button>
        <el-button size="mini" type="primary" @click="enter()">确 定</el-button>
      </div>
    </el-dialog>
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
      //配置
      tableTitle: [
        {key: "supplier_name", title: "供应商名称"},
        {key: "name", title: "联系人"},
        {key: "phone_number", title: "手机号码"},
        {key: "contact_number", title: "联系电话"},
        {key: "fax_number", title: "传真"},
        {key: "address", title: "地址"},
        {key: "remark", title: "备注"}
      ],
      tableData: [],
      operation_del: false,
      dialog: false,
      //数据
      key_name: "",
      add_type: "",
      dialog_id: "",
      dialog_a: "",
      dialog_b: "",
      dialog_c: "",
      dialog_d: "",
      dialog_e: "",
      dialog_f: "",
      dialog_g: "",
      dialog_h: "",
      dialog_i: "",
      dialog_j: "",
      dialog_k: "",
      dialog_l: ""
    }
  },
  methods: {
    close() {
      this.dialog_a = "";
        this.dialog_b = "";
        this.dialog_c = "";
        this.dialog_d = "";
        this.dialog_e = "";
        this.dialog_f = "";
        this.dialog_g = "";
        this.dialog_h = "";
        this.dialog_i = "";
        this.dialog_j = "";
        this.dialog_k= "";
        this.dialog_l = "";
    },
    search(){
      this.handlePageChange({search: this.key_name});
    },
    download(){
      this.$refs.mytable.$refs.xTable.exportData({type: "csv"});
    },
    modify(row, key){
      this.dialog = true;
      this.add_type = key;
      this.dialog_id = row.row.id;
      if(row === null){
        this.dialog_a = "";
        this.dialog_b = "";
        this.dialog_c = "";
        this.dialog_d = "";
        this.dialog_e = "";
        this.dialog_f = "";
        this.dialog_g = "";
        this.dialog_h = "";
        this.dialog_i = "";
        this.dialog_j = "";
        this.dialog_k= "";
        this.dialog_l = "";
      }
      else{
        this.dialog_a = row.row.supplier_name;
        this.dialog_b = row.row.name;
        this.dialog_c = row.row.phone_number;
        this.dialog_d = row.row.contact_number;
        this.dialog_e = row.row.fax_number;
        this.dialog_f = row.row.payment;
        this.dialog_g = row.row.bank_account;
        this.dialog_h = row.row.bank_name;
        this.dialog_i = row.row.bank_card;
        this.dialog_j = row.row.sorts;
        this.dialog_k= row.row.address;
        this.dialog_l = row.row.remark;
      }
    },
    del(){
      let data = this.$refs.mytable.$refs.xTable.getSelectRecords();
      if(data.length === 0){
        return this.$message.warning("请选择操作");;
      }
      else{
        this.dialog_id = data.map((item)=>{return item["id"]});
        this.$api.HttpPost("/StoreAdmin/Inventory/deleteSupplier", {id: this.dialog_id})
        .then((data)=>{
          if(data.data.code === 200){
            this.handlePageChange();
            this.$message.success(data.data.msg);
          }
          else{
            this.$message.error(data.data.msg);
          }
        })
      }
    },
    enter(){
      if(this.add_type == 1){
        this.$api.HttpPost("/StoreAdmin/Inventory/addOrUpdateSupplier",
        {add_type: this.add_type,
        supplier_name: this.dialog_a,
        name: this.dialog_b,
        phone_number: this.dialog_c,
        contact_number: this.dialog_d,
        fax_number: this.dialog_e,
        payment: this.dialog_f,
        bank_account: this.dialog_g,
        bank_name: this.dialog_h,
        bank_card: this.dialog_i,
        sorts: this.dialog_j,
        address: this.dialog_k,
        remark: this.dialog_l})
        .then((data)=>{
          if(data.data.code === 200){
            this.dialog = false;
            this.handlePageChange();
            this.$message.success(data.data.msg);
          }
          else{
            this.$message.error(data.data.msg);
          }
        })
      }
      else if(this.add_type == 2){
        this.$api.HttpPost("/StoreAdmin/Inventory/addOrUpdateSupplier",
        {add_type: this.add_type,
        id: this.dialog_id,
        supplier_name: this.dialog_a,
        name: this.dialog_b,
        phone_number: this.dialog_c,
        contact_number: this.dialog_d,
        fax_number: this.dialog_e,
        payment: this.dialog_f,
        bank_account: this.dialog_g,
        bank_name: this.dialog_h,
        bank_card: this.dialog_i,
        sorts: this.dialog_j,
        address: this.dialog_k,
        remark: this.dialog_l})
        .then((data)=>{
          if(data.data.code === 200){
            this.dialog = false;
            this.handlePageChange();
            this.$message.success(data.data.msg);
          }
          else{
            this.$message.error(data.data.msg);
          }
        })
      }
    },
    resData(data){
      this.tableData = data;
    },
    handlePageChange(data){
      if(data === undefined){data = {}};
      this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Inventory/getSupplierList", data)
    }
  },
  mounted(){
    this.handlePageChange();
  }
}
</script>

<style scoped>
#one{
  margin: 1rem 5rem;
}
</style>
