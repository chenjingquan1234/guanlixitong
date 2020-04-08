<template>
  <div id="two">
    <div class="pb-nav">
      <el-input size="small" style="width: 20rem;" disabled v-model="key_name"><label slot="prepend">单据编号</label></el-input>
      <el-select size="small" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-select size="small" v-model="supplier_name" clearable placeholder="供应商" @change="supplier_change">
        <el-option v-for="value in supplier_select" :key="value.id" :label="value.supplier_name" :value="value.id"></el-option>
      </el-select>
      <el-select size="small" v-model="people_name" clearable placeholder="采购员" @change="people_change">
        <el-option v-for="value in people_select" :key="value.eid" :label="value.name" :value="value.eid"></el-option>
      </el-select>
      <el-date-picker size="small"
        v-model="value_date"
        align="right"
        type="datetime"
        :picker-options="pickerOptions">
      </el-date-picker>
    </div>
    <vxe-table style="margin-top: 10px; width: 100%; box-shadow: 5px 5px 20px #dcdfe6; min-height: 600px;"
    :data="tableData" :loading="loading" align="center" size="small" highlight-hover-row highlight-current-row border
    :edit-config="{trigger: 'click', mode: 'cell'}" @edit-closed="edit_closed">
      <vxe-table-column type="index" title="序号" width="50"></vxe-table-column>
      <vxe-table-column field="product_name" title="商品名称" min-width="200"></vxe-table-column>
      <vxe-table-column type="expand" width="50">
        <template slot-scope="scope">
          <vxe-table highlight-hover-row show-footer :data="select_tableData" @cell-click="cell_click">
            <vxe-table-column field="product_name" title="商品名称"></vxe-table-column>
            <vxe-table-column field="product_type" title="规格"></vxe-table-column>
            <vxe-table-column field="inventory" title="库存"></vxe-table-column>
            <vxe-table-column field="product_price" title="售价"></vxe-table-column>
            <vxe-table-column field="wholesale_price" title="批发价格"></vxe-table-column>
            <vxe-table-column field="barcode" title="条形码"></vxe-table-column>
            <vxe-table-column field="product_code" title="商品编码"></vxe-table-column>
          </vxe-table>
          <vxe-pager
            :loading="loading"
            :current-page="tablePage.currentPage"
            :page-size="tablePage.pageSize"
            :total="tablePage.totalResult"
            :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
            @page-change="handlePageChange">
          </vxe-pager>
        </template>
      </vxe-table-column>
      <vxe-table-column field="product_type" title="规格" min-width="200"></vxe-table-column>
      <vxe-table-column field="repertory_name" title="仓库" min-width="200">
        <template slot-scope="scope">
          <el-select size="small" v-model="tableData[scope.rowIndex].repertory_name" clearable :disabled="scope.rowIndex === 0?true:false" @focus="a(scope)">
            <el-option :label="tableData[scope.rowIndex].repertory_name" :value="tableData[scope.rowIndex].repertory_name" class="tree-select">
              <el-tree :data="treeData" :props="{children: 'children', label: 'repertory_name'}" @node-click="node_click"></el-tree>
            </el-option>
          </el-select>
        </template>
      </vxe-table-column>
      <vxe-table-column field="product_code" title="商品编码" min-width="100"></vxe-table-column>
      <vxe-table-column field="last_purchase_price" title="上次进价" min-width="100"></vxe-table-column>
      <vxe-table-column field="quantity" title="数量" min-width="100" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="unit_name" title="单位" min-width="100"></vxe-table-column>
      <vxe-table-column field="wholesale_price" title="采购单价" min-width="100" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="total_price" title="采购金额" min-width="100"></vxe-table-column>
      <vxe-table-column field="remark" title="备注" min-width="100" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column title="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="modify(scope)">添加</el-button>
          <el-button style="color: red;" size="small" type="text" @click="del(scope)">删除</el-button>
        </template>
      </vxe-table-column>
    </vxe-table>

    <div style="margin-top: 10px;">
      <el-input size="small" style="width: 20rem;" v-model="show_one" disabled><label slot="prepend">应付金额</label></el-input>
      <el-input size="small" style="width: 20rem;" v-model="show_two" @change="m()"><label slot="prepend">优惠金额</label></el-input>
      <el-input size="small" style="width: 20rem;" v-model="show_three" @change="mm()"><label slot="prepend">本次付款</label></el-input>
      <el-input size="small" style="width: 20rem;" v-model="show_four" disabled><label slot="prepend">本次欠款</label></el-input>
      <el-input size="small" style="width: 20rem;" v-model="show_five"><label slot="prepend">备注</label></el-input>
    </div>
    <el-divider></el-divider>
    <el-row><el-col :span="4" :offset="22">
      <el-button size="small" type="primary" @click="save('/StoreAdmin/Statistics/savePurchaseOrder')">保存</el-button>
      <el-button size="small" type="danger" @click="save('/StoreAdmin/Statistics/settlePurchaseOrder')">结算</el-button>
    </el-col></el-row>
  </div>
</template>

<script>
export default{
  name: "two",
  data(){
    return{
      value_date: new Date(),
      pickerOptions: {
        disabledDate(time){return time.getTime() > Date.now();},
        shortcuts: [{text: '今天',onClick(picker) {picker.$emit('pick', new Date());}},
        {text: '昨天',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24);picker.$emit('pick', date);}},
        {text: '一周前',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', date);}}]
      },
      tableData: [
        {product_name: "默认列表", quantity: 0, wholesale_price:0, total_price: 0}
      ],
      select_tableData: [],
      tablePage: {
        currentPage: 1,//当前页
        pageSize: 20,//当前页数据
        totalResult: 0//总数据
      },
      loading: false,
      //数据
      key_name: this.key_name(),
      store_name: "",
      store_id: "",
      supplier_name: "",
      supplier_id: "",
      people_name: "",
      people_id: "",
      treeData: [],
      vxe_store_index: "",
      vxe_store_id: "",
      show_one: 0,
      show_two: 0,
      show_three: 0,
      show_four: 0,
      show_five: "无",
    }
  },
  props:{
    "store_select": {
      type: Array,
      default: ()=>{}
    },
    "supplier_select": {
      type: Array,
      default: ()=>{}
    },
    "people_select": {
      type: Array,
      default: ()=>{}
    }
  },
  methods:{
    key_name(){
      let date = new Date();
      let year = date.getFullYear();
      let mount = date.getMonth() + 1;
      let day = date.getDate();
      let num = Math.round(Math.random()*100000000);
      let ret = year.toString() + mount.toString() + day.toString() + num.toString();
      return ret;
    },
    a(row){
      this.vxe_store_index = row.rowIndex;
    },
    store_change(s){
      this.store_id = s;
    },
    supplier_change(s){
      this.supplier_id = s;
    },
    people_change(s){
      this.people_id = s;
    },
    math(){
      this.show_one = 0;
      this.show_two = 0;
      this.show_three = 0;
      this.show_four = 0;
      for(let i in this.tableData){
        this.show_one = this.show_one + this.tableData[i].total_price;
        this.show_three = this.show_three + this.tableData[i].total_price;
      }
    },
    m(){
      if(this.show_two > this.show_one){
        this.$message.warning("优惠金额大于支付金额");
        this.show_two = 0;
      }
      else{
        this.show_three = this.show_one - this.show_two;
        this.show_four = 0;
      }
    },
    mm(){
      if(this.show_three > this.show_one){
        this.$message.warning("优惠金额大于支付金额");
        this.show_three = this.show_one;
        this.show_two = 0;
      }
      else{
        this.show_four = this.show_one - this.show_two - this.show_three;
      }
    },
    cell_click(row, column){
      this.tableData.push(row.row);
      var tag = {};
      this.tableData = this.tableData.reduce(function(item, next){
        tag[next.product_name] ? "" : tag[next.product_name] = true && item.push(next);//&&运算符,若前面不为true则会跳过后面运算
        return item;
      }, []);
      this.math();
    },
    edit_closed(row){
      if(row.rowIndex === 0){
        this.tableData[row.rowIndex].quantity = 0;
        this.tableData[row.rowIndex].wholesale_price = 0;
        return this.$message.warning("请勿操作默认项目")
      }
      this.tableData[row.rowIndex].total_price = this.tableData[row.rowIndex].quantity * this.tableData[row.rowIndex].wholesale_price;
      this.math();
    },
    node_click(row){
      this.vxe_store_id = row.id;
      this.tableData[this.vxe_store_index].repertory_name = row.repertory_name;
    },
    modify(){
      this.$message("此功能已废弃，请点击下拉选择新增！")
    },
    del(scope){
      if(scope.row.product_name !== "默认列表"){
        this.tableData.splice(scope.rowIndex, 1);
        this.math();
      }
      else{
        this.$message("默认列表不可删除");
      }
    },
    save(s){
      var quantity = 0;
      for(let i in this.tableData){
        quantity += this.tableData[i].quantity;
      }
      this.tableData.splice(0, 1);
      this.$axios.post(this.$store.state.domainName_http+s,
      {order_number: this.key_name,
      e_id: this.people_id,
      supplier_id: this.supplier_id,
      sid: this.store_id,
      total_number: quantity,
      total_price: this.show_one,
      discount_money: this.show_two,
      paid_money: this.show_three,
      unpaid_money: this.shou_four,
      remark: this.remark,
      item_list: this.tableData}, {withCredentials: true})
      .then((data)=>{
        this.tableData.splice(0, 0, {product_name: "默认列表", quantity: 0, wholesale_price:0, total_price: 0});
      })
      .catch((data)=>{
        this.tableData.splice(0, 0, {product_name: "默认列表", quantity: 0, wholesale_price:0, total_price: 0});
        this.$message.error("抱歉网络错误,请检查网络后重试！");
      })
      
    },
    //内层分页
    findList(){
      this.loading = true;
      this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Statistics/getProductSelect",
      {page: this.tablePage.currentPage, quantity: this.tablePage.pageSize}, {withCredentials: true})
      .then((data)=>{
        this.select_tableData = data.data.data.data;
        this.tablePage.totalResult = data.data.data.total;
        for(let i in this.select_tableData){
          this.select_tableData[i].total_price = this.select_tableData[i].quantity * this.select_tableData[i].wholesale_price;
        }
        this.loading = false;
      })
      .catch((data)=>{
        this.loading = false;
      })
    },
    handlePageChange({currentPage, pageSize}){
      this.select_tableData = [];
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.findList();
    },
  },
  mounted(){
    this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Statistics/getRepertorySelect", {}, {withCredentials: true})
    .then((data)=>{
      if(data.data.code === 200){
        this.treeData = data.data.data;
      }
      else{
        this.$message.error(data.data.msg);
      }
    })
    .catch((data)=>{
      this.$message.error("抱歉网络错误,请检查网络后重试！");
    })
    this.handlePageChange(1, 20);
  }
}
</script>

<style scoped>
#two{
  margin: 1rem 5rem;
}
.el-divider{
  margin: 10px 0;
}
.tree-select{
  height:200px;
  overflow: auto;
  background-color: #ffffff;
}
</style>
