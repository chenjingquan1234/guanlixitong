<template>
  <div id="xiangmuliebiao">
    <vxe-table class="mytable" size="mini" align="center" border highlight-hover-row ref="xiangmuliebiao"
    :data="tableData"
    :edit-config="{trigger: 'click', mode: 'cell', activeMethod: activeRowMethod}" @edit-closed="edit_closed">
      <vxe-table-column type="checkbox" width="50"></vxe-table-column>
      <vxe-table-column title="操作" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click.native.prevent="xmlb_add(scope)">添加</el-button>
          <el-button size="mini" type="text" style="color: red;" @click.native.prevent="xmlb_del(scope)">删除</el-button>
        </template>
      </vxe-table-column>
      <vxe-table-column field="item_name" :title="title" min-width="250">
        <template slot-scope="scope">
          <el-popover v-model="popover[scope.rowIndex]" placement="right">
            <el-input slot="reference" v-model="tableData[scope.rowIndex].item_name" :disabled="tableData[scope.rowIndex].status === 1"
            size="mini" clearable @focus="xmlb_focus(scope)" @input="remoteMethod"></el-input>
            <div class="row">
              <mytable :tableTitle="my_tableTitle" :tableData="my_tableData" :check_box="check_box" :operation="operation"
              @resData="resData" @handlePageChange="handlePageChange" @cell_click="cell_click" ref="mytable"></mytable>
              <vxe-table v-if="title === '维修项目' || title === '维修配件'" height="600" size="mini" align="center" border highlight-current-row highlight-hover-row ref="xm_xzlb"
              :data="xzlb_tableData" @cell-click="xmlb_cell_click" :tree-config="{children: 'children', label: 'classify_name', expandAll: true}">
                <vxe-table-column field="classify_name" title="分类" min-width="200" tree-node></vxe-table-column>
              </vxe-table>
            </div>
          </el-popover>
          <el-button v-if="title === '维修项目'" size="mini" type="warning" icon="el-icon-plus" plain circle @click="newDialog(scope)"></el-button>
        </template>
      </vxe-table-column>
      <vxe-table-column field="number" title="编码"></vxe-table-column>
      <vxe-table-column field="quantity" title="数量" :edit-render="{name: 'input', autoselect: true}"></vxe-table-column>
      <vxe-table-column field="price" title="单价" :edit-render="{name: 'input', autoselect: true}"></vxe-table-column>
      <vxe-table-column field="discount" title="折扣" :edit-render="{name: 'input', autoselect: true}"></vxe-table-column>
      <vxe-table-column field="amount" title="金额"></vxe-table-column>
      <vxe-table-column field="construction_staff" title="施工人员">
        <template slot-scope="scope">
          <el-select size="mini" v-model="tableData[scope.rowIndex].construction" :disabled="tableData[scope.rowIndex].status === 1" clearable multiple filterable @change="construction_change" @focus="xmlb_focus(scope)">
            <el-option v-for="value in construction_select" :key="value.eid" :label="value.name" :value="value.eid"></el-option>
          </el-select>
        </template>
      </vxe-table-column>
      <vxe-table-column field="sales_staff" title="销售人员">
        <template slot-scope="scope">
          <el-select size="mini" v-model="tableData[scope.rowIndex].sales" :disabled="tableData[scope.rowIndex].status === 1" clearable multiple filterable @change="sales_change" @focus="xmlb_focus(scope)">
            <el-option v-for="value in sales_select" :key="value.eid" :label="value.name" :value="value.eid"></el-option>
          </el-select>
        </template>
      </vxe-table-column>
      <vxe-table-column field="repair_type_id" title="类型">
        <template slot-scope="scope">
          <el-select v-model="tableData[scope.rowIndex].xmlbLeiXing" :disabled="tableData[scope.rowIndex].status === 1" size="mini" clearable @focus="xmlb_focus(scope)" @clear="xmlb_clear_type(scope)">
            <el-option :value="tableData[scope.rowIndex].xmlbLeiXing" :label="tableData[scope.rowIndex].xmlbLeiXing" class="tree-select">
              <el-tree :data="type_tree_select" :props="{children: 'children', label: 'repair_type_name'}" @node-click="type_tree_node"></el-tree>
            </el-option>
          </el-select>
        </template>
      </vxe-table-column>
      <vxe-table-column field="account_type_id" title="账类">
        <template slot-scope="scope">
          <el-select v-model="tableData[scope.rowIndex].xmlbZhangLei" :disabled="tableData[scope.rowIndex].status === 1" size="mini" clearable @focus="xmlb_focus(scope)" @clear="xmlb_clear_accounts(scope)">
            <el-option :value="tableData[scope.rowIndex].xmlbZhangLei" :label="tableData[scope.rowIndex].xmlbZhangLei" class="tree-select">
              <el-tree :data="accounts_tree_select" :props="{children: 'children', label: 'account_type_name'}" @node-click="accounts_tree_node"></el-tree>
            </el-option>
          </el-select>
        </template>
      </vxe-table-column>
      <vxe-table-column field="remark" title="备注" :edit-render="{name: 'input', autoselect: true}"></vxe-table-column>
      <vxe-table-column field="status_name" title="状态"></vxe-table-column>
    </vxe-table>

    <Dialog @enter="enter" ref="dialog">
      <template>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-input size="mini" v-model="add_num.service_item_name"><label slot="prepend" style="color: red;">名称</label></el-input>
            <el-input size="mini" v-model="add_num.cost"><label slot="prepend">成本</label></el-input>
            <el-input size="mini" v-model="add_num.specification"><label slot="prepend">规格</label></el-input>
            <el-input size="mini" v-model="add_num.price"><label slot="prepend" style="color: red;">售价</label></el-input>
            <el-input size="mini" v-model="add_num.work_hours" placeholder="分钟"><label slot="prepend">工时</label></el-input>
          </el-col>
          <el-col :span="12">
            <el-input size="mini" v-model="add_num.number" disabled><label slot="prepend">编码</label></el-input>
            <el-select v-model="add_num.unit" style="width: 100%;" size="mini" clearable placeholder="单位" @change="unit_change">
              <el-option v-for="value in unit_select" :key="value.id" :label="value.unit_name" :value="value.id"></el-option>
            </el-select>
            <el-select size="mini" class="effective" style="width: 100%;" v-model="add_num.classify_name" clearable placeholder="分类" @clear="type_clear">
              <el-option :label="add_num.classify_name" :value="add_num.classify_name" class="tree-select">
                <el-tree :data="treeData" :props="{children: 'children', label: 'classify_name'}" @node-click="type_node_click"></el-tree>
              </el-option>
            </el-select>
            <el-input v-model="add_num.remark" size="mini" type="textarea" placeholder="备注"></el-input>
          </el-col>
        </el-row>
      </template>
    </Dialog>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
import Dialog from "./../../other/Dialog.vue"
export default{
	name: "xiangmuliebiao",
  components:{
    mytable,
    Dialog
  },
	data(){
		return{
      operation: false,
      check_box: false,
      my_tableData: [],
      xzlb_tableData: [],
      xmlb_rowIndex: "",
      popover: [false],
      //dialog
      type_id: "",
      unit_select: [],
      treeData: [],
      add_num: {
        add_type: 1,
        id: "",
        service_item_name: "",
        cost: "",
        specification: "",
        price: "",
        work_hours: "",
        number: new Date().getTime() + Math.round(Math.random()*1000),
        unit_name: "",
        unit: "",
        classify_name: "",
        classify_id: "",
        work_hours: "",
      }
		}
	},
  props:{
    "tableData": {
      type: Array,
      default: ()=>{}
    },
    "my_tableTitle": {
      type: Array,
      default: ()=>{}
    },
    "content": {
      type: Object,
      default: ()=>{}
    },
    "construction_select": {
      type: Array,
      default: ()=>{}
    },
    "sales_select": {
      type: Array,
      default: ()=>{}
    },
    "type_tree_select": {
      type: Array,
      default: ()=>{}
    },
    "accounts_tree_select": {
      type: Array,
      default: ()=>{}
    },
    "cell_url": {
      type: String,
      default: ""
    },
    "xmlb_cell_url": {
      type: String,
      default: ""
    },
    "title": {
      type: String,
      default: ""
    },
    "url": {
      type: String,
      default: ""
    },
    "math": {
      type: Function,
      default: null
    },
    "ckxm_membership_card_id": {
      type: [String, Number],
      default: ""
    }
  },
  methods:{
    construction_change(s){
      this.tableData[this.xmlb_rowIndex].construction = s;
    },
    sales_change(s){
      this.tableData[this.xmlb_rowIndex].sales = s;
    },
    type_tree_node(s){
      this.tableData[this.xmlb_rowIndex].repair_type_id = s.id;
      this.tableData[this.xmlb_rowIndex].xmlbLeiXing = s.repair_type_name;
    },
    accounts_tree_node(s){
      this.tableData[this.xmlb_rowIndex].account_type_id = s.id;
      this.tableData[this.xmlb_rowIndex].xmlbZhangLei = s.account_type_name;
      if(this.title === "维修项目"){
        this.$emit("wxxm_zhanglei", this.xmlb_rowIndex, s.event_discount);
      }
      else if(this.title === "维修配件"){
        this.$emit("wxpj_zhanglei", this.xmlb_rowIndex, s.accessory_discount);
      }
    },
    xmlb_focus(s){
      this.xmlb_rowIndex = s.rowIndex;
      this.$nextTick(()=>{
        this.handlePageChange();
      })
    },
    newDialog(s){
      this.xmlb_rowIndex = s.rowIndex;
      this.add_num = {
        add_type: 1,
        id: "",
        service_item_name: "",
        cost: "",
        specification: "",
        price: "",
        work_hours: "",
        number: new Date().getTime() + Math.round(Math.random()*1000),
        unit_name: "",
        unit: "",
        classify_name: "",
        classify_id: "",
        work_hours: "",
      }
      this.$refs.dialog.init();
      this.$axios.all([
        this.$api.HttpPost("/StoreAdmin/Service/getUnitSelect", {}),
        this.$api.HttpPost("/StoreAdmin/Service/getServiceItemClassifySelect", {}),
      ])
      .then((data)=>{
        this.unit_select = data[0].data.data;
        this.treeData = data[1].data.data;
      })
    },
    remoteMethod(row){
      this.handlePageChange({search: row});
    },
    xmlb_clear_type(s){
      this.tableData[this.xmlb_rowIndex].repair_type_id = "";
    },
    xmlb_clear_accounts(s){
      this.tableData[this.xmlb_rowIndex].account_type_id = "";
    },
    xmlb_add(row){
      if(this.title === "维修项目"){
        this.tableData.push({
        item_name: "",
        item_id: "",
        cost: "",
        number: "",
        quantity: "",
        price: "",
        discount: "",
        amount: "",
        construction: [],
        sales: [],
        construction_staff: [],
        sales_staff: [],
        repair_type_id: "",
        account_type_id: "",
        xmlbLeiXing: "",
        xmlbZhangLei: "",
        remark: "",
        status: 0,
        status_name: "未派工",
      });
      }
      else if(this.title === "维修配件"){
        this.tableData.push({
        item_name: "",
        item_id: "",
        cost: "",
        number: "",
        quantity: "",
        price: "",
        discount: "",
        amount: "",
        construction: [],
        sales: [],
        construction_staff: [],
        sales_staff: [],
        repair_type_id: "",
        account_type_id: "",
        xmlbLeiXing: "",
        xmlbZhangLei: "",
        remark: "",
        status: 0,
        status_name: "未领料",
      });
      }
      else if(this.title === "附加费用"){
        this.tableData.push({
        item_name: "",
        item_id: "",
        cost: "",
        number: "",
        quantity: "",
        price: "",
        discount: "",
        amount: "",
        construction: [],
        sales: [],
        construction_staff: [],
        sales_staff: [],
        repair_type_id: "",
        account_type_id: "",
        xmlbLeiXing: "",
        xmlbZhangLei: "",
        remark: "",
        status: 0,
        status_name: "未结算",
      });
      }
      else if(this.title === "次卡项目"){
        this.tableData.push({
        item_name: "",
        item_id: "",
        cost: "",
        number: "",
        quantity: "",
        price: "",
        discount: "",
        amount: "",
        construction: [],
        sales: [],
        construction_staff: [],
        sales_staff: [],
        repair_type_id: "",
        account_type_id: "",
        xmlbLeiXing: "",
        xmlbZhangLei: "",
        remark: "",
        status: 0,
        status_name: "未派工",
      });
      }
    },
    xmlb_del(row){
      if(this.tableData.length === 1){return this.$message.warning("已经剩下一个")}
      this.tableData.splice(row.rowIndex, 1);
    },
    activeRowMethod(row){
      return row.row.status != 1;
    },
    xmlb_cell_click(row){
      this.$api.HttpPost(this.url, {classify_id: row.row.id})
      .then((data)=>{
        this.my_tableData = data.data.data.data;
      })
    },
    edit_closed(row){
      let json = this.tableData[row.rowIndex];
      json.discount = this.$api.mt_discount(json.discount);
      json.amount = this.$api.mt_total(json.quantity, json.price, json.discount, json.amount);
      this.math();
    },
    cell_click(row){
      let json = this.tableData[this.xmlb_rowIndex];
      if(this.cell_url === ""){
        json.discount = 10;
        json.amount = this.$api.mt_total(json.quantity, json.price, json.discount, json.amount);
      }
      else{
        this.$api.HttpPost(this.cell_url, {item_id: row.row.item_id, card_id: this.content.card_id})
        .then((success)=>{
          json.discount = success.data.data.discount;
          if(success.data.data.member_price > 0){
            json.price = data.data.data.member_price;
            json.discount = 10;
          }
          json.amount = this.$api.mt_total(json.quantity, json.price, json.discount, json.amount);
        })
      }
      json.item_name = row.row.item_name;
      json.item_id = row.row.item_id;
      json.cost = row.row.cost;
      if(row.row.number === undefined){json.number = ""}
      else{json.number = row.row.number;}
      json.quantity = 1;
      json.price = row.row.price;
      json.amount = this.$api.mt_total(json.quantity, json.price, json.discount, json.amount);
      this.math();
      this.popover[row.rowIndex] = false;//插眼 隐藏table
    },
    resData(data){
      this.my_tableData = data;
    },
    handlePageChange(data){
      if(data === undefined){data = {}}
      if(this.ckxm_membership_card_id !== undefined){
        data.membership_card_id = this.ckxm_membership_card_id;
      }
      this.$refs.mytable.findList(this.$api.yuming + this.url, data);
    },
    unit_change(s){
      this.add_num.unit = s;
    },
    type_clear(){
      this.type_id = "";
      this.add_num.classify_id = "";
    },
    type_node_click(s){
      this.add_num.classify_id = s.id;
      this.add_num.classify_name = s.classify_name;
    },
    enter(){
      this.$api.HttpPost("/StoreAdmin/Service/serviceItemEdit", this.add_num)
      .then((data)=>{
        if(data.data.code === 200){
          this.cell_click({row: data.data.data});
          this.$refs.dialog.cancel();
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    }
  },
  mounted(){
    if(this.xmlb_cell_url !== ""){
      this.$api.HttpPost(this.xmlb_cell_url, {})
      .then((data)=>{
        this.xzlb_tableData = data.data.data;
      })
    }
  }
}
</script>

<style scoped>
.mytable{
  margin-top: 10px;
  width: 100%;
  box-shadow: 5px 5px 20px #dcdfe6;
}
.title-tree-select{
  width: 700px;
  height: 250px;
  overflow: auto;
  background-color: #ffffff;
}
.tree-select{
  height: 250px;
  overflow: auto;
  background-color: #ffffff;
}
</style>
