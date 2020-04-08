<template>
  <div id="two">
    <div class="pb-nav">
      <el-input size="small" style="width: 20rem;" disabled v-model="key_name"><label slot="prepend">单据编号</label></el-input>
      <el-select size="small" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-select size="small" v-model="people_name" clearable placeholder="领料员" @change="people_change">
        <el-option v-for="value in people_select" :key="value.eid" :label="value.name" :value="value.eid"></el-option>
      </el-select>
      <el-date-picker size="small"
        v-model="value_date"
        align="right"
        type="datetime"
        :picker-options="pickerOptions">
      </el-date-picker>
    </div>

    <popoverTable :dialogVisible="dialogVisible" @close="close" @cell_click="cell_click_Product" />
    <vxe-table style="margin-top: 10px; width: 100%; box-shadow: 5px 5px 20px #dcdfe6; min-height: 600px;"
    :data="tableData" :loading="loading" align="center" size="small" highlight-hover-row highlight-current-row border
    :edit-config="{trigger: 'click', mode: 'cell'}"  @edit-closed="edit_closed">
      <vxe-table-column type="index" title="序号" width="50"></vxe-table-column>
      <vxe-table-column field="product_name" title="商品名称" min-width="200"></vxe-table-column>
      <vxe-table-column  width="50">
       <i @click="openProductSelect" class="el-icon-arrow-right"></i>
      </vxe-table-column>
      <vxe-table-column field="product_type" title="规格" min-width="100"></vxe-table-column>
      <vxe-table-column field="product_code" title="商品编码" min-width="100"></vxe-table-column>
      <vxe-table-column field="repertory_name" title="仓库" min-width="200">
        <template slot-scope="scope">
          <el-select size="small" v-model="tableData[scope.rowIndex].repertory_name" clearable :disabled="scope.rowIndex === 0?true:false" @focus="a(scope)">
            <el-option :label="tableData[scope.rowIndex].repertory_name" :value="tableData[scope.rowIndex].repertory_name" class="tree-select">
              <el-tree :data="treeData" :props="{children: 'children', label: 'repertory_name'}" @node-click="node_click"></el-tree>
            </el-option>
          </el-select>
        </template>
      </vxe-table-column>
      <vxe-table-column field="inventory" title="库存" min-width="100"></vxe-table-column>
      <vxe-table-column field="unit_name" title="单位" min-width="100"></vxe-table-column>
      <vxe-table-column field="wholesale_price" title="成本" min-width="100"></vxe-table-column>
      <vxe-table-column field="quantity" title="领料数量" min-width="100" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="total_price" title="合计" min-width="100"></vxe-table-column>
      <vxe-table-column field="remark" title="备注" min-width="100" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column title="操作" width="150">
        <template slot-scope="scope">
          <el-button style="color: red;" size="small" type="text" @click="del(scope)">删除</el-button>
        </template>
      </vxe-table-column>
    </vxe-table>

    <div style="margin-top: 10px;">
      <el-input size="small" style="width: 20rem;" v-model="total_quantity"><label slot="prepend">总数量</label></el-input>
      <el-input size="small" style="width: 20rem;" v-model="total_price"><label slot="prepend">总金额</label></el-input>
      <el-input size="small" style="width: 20rem;" v-model="remark"><label slot="prepend">备注</label></el-input>
    </div>
    <el-divider></el-divider>
    <el-row><el-col :span="4" :offset="22">
      <el-button size="small" type="primary" @click="enter()">确定</el-button>
      <el-button size="small" type="info" @click="res()">刷新</el-button>
    </el-col></el-row>
  </div>
</template>

<script>
import popoverTable from "../popoverTable"
export default{
  name: "two",
  components:{
    popoverTable
  },
  data(){
    return{
      dialogVisible: false,
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
      treeData: [],
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
      people_name: "",
      people_id: "",
      vxe_store_index: "",
      vxe_store_id: "",
      total_quantity: 0,
      total_price: 0,
      remark: "无"
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
    openProductSelect() {
      this.dialogVisible = !this.dialogVisible
    },
    close(val) {
      this.dialogVisible = val
    },
    cell_click_Product(scope) {
      let id = scope.row.id;
      let data = scope.row
      data.total_price = parseInt(data.wholesale_price) * parseInt(data.quantity)
      this.tableData.findIndex(item => item.id == id) != -1
        ? this.$message.error("不能重复选择商品")
        : this.tableData.push(data);
      this.math()
    },
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
    people_change(s){
      this.people_id = s;
    },
    math(){
      this.total_quantity = 0;
      this.total_price = 0;
      for(let i in this.tableData){
        this.total_quantity += Number(this.tableData[i].quantity);
        this.total_price += Number(this.tableData[i].total_price);
      }
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
    cell_click(row, column){
      this.tableData.push(row.row);
      var tag = {};
      this.tableData = this.tableData.reduce(function(item, next){
        tag[next.product_name] ? "" : tag[next.product_name] = true && item.push(next);//&&运算符,若前面不为true则会跳过后面运算
        return item;
      }, []);
      this.math();
    },
    node_click(row){
      this.vxe_store_id = row.id;
      this.vxe_store_name = row.repertory_name;
      this.tableData[this.vxe_store_index].repertory_name = row.repertory_name;
    },
    modify(){
      this.$message("此功能已废弃，请点击下拉选择新增！")
    },
    del(scope){
      if(scope.row.product_name !== "默认列表"){
        this.tableData.splice(scope.rowIndex, 1);
      }
      else{
        this.$message("默认列表不可删除");
      }
    },
    enter(){
      this.tableData.splice(0, 1);
      this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Statistics/confirmPickingOrder",
      {order_number: this.key_name,
      e_id: this.people_id,
      sid: this.store_id,
      total_number: this.total_quantity,
      total_price: this.total_price,
      remark: this.remark,
      item_list: this.tableData}, {withCredentials: true})
      .then((data)=>{
        if(data.data.code === 200){
          this.$emit("reload_cgd");
          this.$message.success(data.data.msg);
        }
        else{
          this.tableData.splice(0, 0, {product_name: "默认列表", quantity: 0, wholesale_price:0, total_price: 0});
          this.$message.error(data.data.msg);
        }
      })
      .catch((data)=>{
        this.tableData.splice(0, 0, {product_name: "默认列表", quantity: 0, wholesale_price:0, total_price: 0});
        this.$message.error("抱歉网络错误,请检查网络后重试！");
      })
    },
    res(){
      this.$router.go(0);
    },
    //内层分页
    findList(){
      this.loading = true;
      this.$http.post(this.$store.state.domainName_http+"/StoreAdmin/Statistics/getProductSelect",
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
