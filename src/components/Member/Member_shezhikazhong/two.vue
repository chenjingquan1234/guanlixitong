<template>
  <div id="two">
    <div class="pb-nav">
      <el-button size="mini" type="info" icon="el-icon-setting" @click="setAll()">批量设置</el-button>
      <el-button size="mini" type="info" icon="el-icon-document-checked" @click="save()">保存</el-button>
    </div>

    <div class="left"><mytable :tableData="tableData" :tableTitle="tableTitle" :operation="operation" :paging="paging" :check_box="check_box"
    @cell_click="cell_click"></mytable></div>
    <div class="left"><vxe-table :data="tableData1" size="mini" align="center" highlight-hover-row highlight-current-row border class="mytable"
    :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}" :radio-config="{labelField: '', trigger: 'row'}"
    @cell-click="cell_click1" @edit-closed="edit_closed1">
      <vxe-table-column type="radio" width="50"></vxe-table-column>
      <vxe-table-column type="index" title="序号" width="50"></vxe-table-column>
      <vxe-table-column field="classify_name" title="类型名称"></vxe-table-column>
      <vxe-table-column field="discount" title="折扣" :edit-render="{name: 'input', autoselect: true}"></vxe-table-column>
    </vxe-table></div>
    <div class="right"><mytable :tableData="tableData2" :tableTitle="tableTitle2" :operation_del="operation_del" :paging="paging"
    @resData="resData2" @handlePageChange="handlePageChange2" @modify="modify2" ref="mytable"></mytable></div>

    <el-dialog title="折扣修改" :visible.sync="dialog" width="30%">
      <el-input size="mini" v-model="dialog_a"><label slot="prepend">折扣&#12288</label></el-input>
      <el-input size="mini" v-model="dialog_b"><label slot="prepend">会员价</label></el-input>
      <el-input size="mini" v-model="dialog_c" type="text" placeholder="备注"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="enter()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mytable from './../../mytable.vue'
export default{
  name: "two",
  components:{
    mytable
  },
  data(){
    return{
      tableData: [],
      tableData1_front: [],
      tableData1_after: [],
      tableData1: [],
      tableData2: [],
      tableTitle: [
        {key: "card_name", title: "会员卡名称"},
      ],
      tableTitle2: [
        {key: "item_name", title: "项目/名称", min_width: "100"},
        {key: "classify_name", title: "分类", min_width: "100"},
        {key: "price", title: "售价", min_width: "100"},
        {key: "discount", title: "折扣", min_width: "100"},
        {key: "member_price", title: "会员价", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"},
      ],
      paging: false,
      check_box: false,
      operation: false,
      operation_del: false,
      dialog: false,
      //数据
      card_id: "",
      classify_id: "",
      dialog_id: "",
      dialog_a: "",
      dialog_b: "",
      dialog_c: "",
      dialog_type: ""
    }
  },
  methods:{
    //初始化
    init: function(data){
      if(data === undefined){data = {}}
      this.$api.HttpPost("/StoreAdmin/Customer/getMemberCardSelect", data)
      .then((data)=>{
        if(data.data.code === 200){
          this.tableData = data.data.data;
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    setAll: function(){
      this.$message("改功能已废弃,请从服务分类||产品分类批量设置");
    },
    save: function(){
      this.tableData1_front.splice(0, 1);
      this.tableData1_after.splice(0, 1);
      let t1 = [];
      let t2 = [];
      t1 = this.tableData1_front.map((item, index)=>{
        return {discount: item.discount, classify_id: item.id}
      })
      t2 = this.tableData1_after.map((item, index)=>{
        return {discount: item.discount, classify_id: item.id}
      })
      this.$api.HttpPost("/StoreAdmin/Customer/saveDiscount",
      {service_classify_list: t1,
      product_classify_list: t2,
      card_id: this.card_id})
      .then((data)=>{
        if(data.data.code === 200){
          this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Customer/getServiceItemDiscountSelect", {classify_id: this.classify_id, card_id: this.card_id});
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    cell_click: function(row, column){
      this.tableData1 = [];
      this.tableData2 = [];
      this.card_id = row.row.id;
      this.$axios.all([
        this.$api.HttpPost("/StoreAdmin/Customer/getServiceClassifyDiscountSelect", {card_id: row.row.id}),
        this.$api.HttpPost("/StoreAdmin/Customer/getProductClassifyDiscountSelect", {card_id: row.row.id})
      ])
      .then((data)=>{
        if(data[0].data.code === 200 && data[1].data.code === 200){
          var header = [{classify_name: "服务分类", discount: "", id: ""}];
          var footer = [{classify_name: "产品分类", discount: "", id: ""}];
          this.tableData1_front = header.concat(data[0].data.data);
          this.tableData1_after = footer.concat(data[1].data.data);
          this.tableData1 = this.tableData1_front.concat(this.tableData1_after);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
      .catch((data)=>{
        this.$message.error("抱歉网络错误,请检查网络后重试！");
      })
    },
    cell_click1: function(row, column){
      this.tableData2 = [];
      this.classify_id = row.row.id;
      if(row.rowIndex == 0){
        this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Customer/getServiceItemDiscountSelect", {classify_id: "", card_id: this.card_id});
      }
      else if(row.rowIndex == this.tableData1_front.length){
        this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Customer/getProductItemDiscountSelect", {classify_id: "", card_id: this.card_id});
      }
      else if(row.rowIndex < this.tableData1_front.length){
        this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Customer/getServiceItemDiscountSelect", {classify_id: this.classify_id, card_id: this.card_id});
      }
      else{
        this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Customer/getProductItemDiscountSelect", {classify_id: this.classify_id, card_id: this.card_id});
      }
    },
    edit_closed1: function(row, column){
      if(row.row.classify_name === "服务分类"){
        this.tableData1_front.map((item, index)=>{
          this.tableData1[index].discount = row.row.discount;
        })
        this.tableData1 = t1.concat(this.tableData1_after);
      }
      else if(row.row.classify_name === "产品分类"){
        this.tableData1_after.map((item, index)=>{
          this.tableData1[row.rowIndex+index].discount = row.row.discount;
        })
      }
    },
    modify2: function(row){
      this.dialog_id = row.row.id;
      this.dialog_a = row.row.discount;
      this.dialog_b = row.row.member_price;
      this.dialog_c = row.row.remark;
      this.dialog_type = row.row.type;
      this.dialog = true;
    },
    enter: function(){
      this.$api.HttpPost("/storeadmin/Customer/setItemdiscount",
      {item_id: this.dialog_id,
      discount: this.dialog_a,
      member_price: this.dialog_b,
      remark: this.dialog_c,
      type: this.dialog_type})
      .then((data)=>{
        if(data.data.code === 200){
          this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Customer/getServiceItemDiscountSelect", {classify_id: this.classify_id, card_id: this.card_id});
          this.$message.success(data.data.msg);
          this.dialog = false;
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    resData2: function(data){
      this.tableData2 = data;
    },
    handlePageChange2: function(data){

    }
  },
  created(){
    this.init();
  }
}
</script>

<style scoped>
#two{
  margin: 1rem 5rem;
}
.mytable{
  margin-top: 10px;
  width: 100%;
  box-shadow: 5px 5px 20px #dcdfe6;
}
.left{
  float: left;
  width: 25%;
}
.right{
  float: right;
  width: 50%;
}
/deep/ .vxe-table{
  min-height: 600px;
}
</style>
