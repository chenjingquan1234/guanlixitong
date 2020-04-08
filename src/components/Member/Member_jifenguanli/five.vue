<template>
  <div id="five">
    <div class="pb-nav">
      <el-input size="mini" v-model="key_name" style="width: 25rem;"><label slot="prepend">会员卡号</label></el-input>
      <el-select size="mini" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_name_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
   </div>
   <!-- <mytable 
    :tableTitle="tableTitle" 
    :operation_mod="true"
    :operation_del="true"
    operation_mod_name="通过"
    operation_del_name="不通过"
    :tableData="tableData"  
    :operation="true" 
    @modify="modify(1)"
    @del="modify(2)"
    @resData="resData" 
    @handlePageChange="handlePageChange" 
    ref="mytable"
   ></mytable> -->

   <!-- 表格 -->
    <vxe-table size="mini" align="center" :height="600" ref="xTable" highlight-hover-row highlight-current-row border
    :class="{'mytable': true}"
    :data="tableData"
    :loading="loading"
    :tree-config="{children: 'children', label: 'classify_name'}"
    :checkbox-config="{reserve: true, trigger: 'row'}"
    :radio-config="{labelField: '', trigger: 'row'}"
    :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
    @cell-click="cell_click"
    >
      <vxe-table-column  type="radio" width="50"></vxe-table-column>
      <vxe-table-column  type="seq" title="序号" width="50"></vxe-table-column>

      <vxe-table-column v-for="value in tableTitle" :key="value.key"
      :field="value.key" :title="value.title" :width="value.width" style="color:red" :min-width="value.min_width" :edit-render="value.edit" :tree-node="value.tree">
      </vxe-table-column>

      <vxe-table-column  title="操作" min-width="150">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === '已申请'"  size="mini" type="text" @click="examine(scope, 1)">通过</el-button>
          <el-button v-if="scope.row.status === '已申请'" style="color: red;" size="mini" type="text" @click="examine(scope, 2)">不通过</el-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <!-- 分页器 -->
    <vxe-pager 
      size="mini"
      perfect
      :loading="loading"
      :pager-count="5"
      :current-page="tablePage.currentPage"
      :page-size="tablePage.pageSize"
      :total="tablePage.totalResult"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange">
    </vxe-pager>
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
       tablePage: {
        currentPage: 1,//当前页
        pageSize: 20,//当前页数据
        totalResult: 0//总数据
      },
      loading: false,
      //table 配置
      tableTitle: [
        {key: "card_no", title: "会员卡号", min_width: "100"},
        {key: "name", title: "客户姓名 ", min_width: "100"},
        {key: "gift_name", title: "兑换礼品", min_width: "100"},
        {key: "gift_integral", title: "兑换积分 ", min_width: "100"},
        {key: "updata_time", title: "兑换时间", min_width: "100"},
        {key: "status", title: "兑换状态 ", min_width: "100"},
        {key: "shipping_address", title: "收货地址", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"}
      ],
      tableData: [],
      operation: false,
      //数据
      key_name: "",
      store_name: "",
      store_id: "",
      store_name_select: []
    }
  },
  methods:{
    examine(scope,status) {
      const id = scope.row.id
      this.$api.HttpPost("/StoreAdmin/Integral/updateIntegralExchange", {
        id,
        status
      }).then(res => {
        if(res.data.code == 200) {
          this.$message({
            message: '操作成功',
            type: 'success'
           });
          this.search()
        } else{
          this.$message.error("操作失败")
        }
      })
      .catch(err => {
        this.$message.error("操作失败")
      })
    },
    cell_click(){},
    //分页
    findList(url, ...search){
      this.loading = true;
      search[0].page = this.tablePage.currentPage;
      search[0].quantity = this.tablePage.pageSize;
      this.$axios.post(url, search[0], {withCredentials: true})
      .then((data)=>{
        if(data.data.code === 200){
          if(search[0].is_tree === true){
            this.resData(data.data.data)
          }
          else{
            this.resData(data.data.data.data)
          }
          this.tablePage.totalResult = data.data.data.total;
        }
        else{
          this.$message.error(data.data.msg)
        }
        this.loading = false;
      })
      .catch((data)=>{
        this.loading = false;
      })
    },
    handlePageChange({currentPage, pageSize}){
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.findList(this.$store.state.domainName_http+"/StoreAdmin/Integral/getIntegralExchangeList",{})
    },
    search: function(){
      this.findList(this.$store.state.domainName_http+"/StoreAdmin/Integral/getIntegralExchangeList",{search: this.key_name, sid: this.store_id})
    },
    store_change: function(s){
      this.store_id = s;
    },
    resData(data){
      data.forEach(item => {
        switch(item.status) {
          case 0:
            item.status = "已申请"
            break;
          case 1:
            item.status = "已通过"
            break;
          case 2:
            item.status = "不通过"
            break;
        }
      })
      this.tableData = data;
    },
    // handlePageChange: function(data){
    //   if(data === undefined){data = {search: this.key_name, sid: this.store_id}}
    //   this.$refs.mytable.findList(this.$store.state.domainName_http+"/StoreAdmin/Integral/getIntegralExchangeList", data);
    // }
  },
  mounted(){
    this.handlePageChange({});
    this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {})
    .then((data)=>{
        this.store_name_select = data.data;
    })
  }
}
</script>

<style scoped>
#five{
  margin: 1rem 5rem;
}
.mytable{
  margin-top: 10px;
  width: 100%;
  box-shadow: 5px 5px 20px #dcdfe6;
}
.operation{
  background: linear-gradient(to right, red, blue);
  -webkit-background-clip: text;
  color: transparent;
}
</style>
