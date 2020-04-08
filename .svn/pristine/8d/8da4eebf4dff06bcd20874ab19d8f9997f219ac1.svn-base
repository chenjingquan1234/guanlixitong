<template>
  <div id="Finance_zhangdanbaobiao">
    <div class="pb-nav">
      <el-button size="mini" type="info" icon="el-icon-download" @click="download()">打印</el-button>
      <el-input size="mini" style="width: 20rem;" v-model="key_name"><label slot="prepend">关键字</label></el-input>
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
      <el-select size="mini" v-model="store_name" clearable placeholder="所属门店">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>

    <vxe-table size="mini" align="center" height="600" ref="mytable"
    highlight-hover-row
    highlight-current-row
    border
    show-footer
    class="mytable"
    :data="tableData"
    :loading="loading"
    :expand-config="{lazy: true, loadMethod: loadContentMethod, iconOpen: 'vxe-icon--caret-bottom', iconClose: 'vxe-icon--edit-outline'}">
      <vxe-table-column type="expand" title="详情" width="100">
        <template v-slot:content="{row}">
          <vxe-table size="mini" align="center" height="200" ref="qianzai" highlight-hover-row highlight-current-row border
          class="mytable"
          :data="tableData_xiangqing">
            <vxe-table-column v-for="value in tableTitle_xiangqing" :key="value.key" :field="value.key" :title="value.title" :width="value.width"></vxe-table-column>
          </vxe-table>
        </template>
      </vxe-table-column>
      <vxe-table-column v-for="value in tableTitle" :key="value.key" :field="value.key" :title="value.title" :min-width="value.min_width"></vxe-table-column>
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
export default{
  name: "Finance_zhangdanbaobiao",
  data(){
    return{
      begin_date: new Date(2019, 0, 1, 0, 0),
      over_date: new Date(),
      pickerOptions: {
        disabledDate(time){return time.getTime() > Date.now();},
        shortcuts: [{text: '今天',onClick(picker) {picker.$emit('pick', new Date());}},
        {text: '昨天',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24);picker.$emit('pick', date);}},
        {text: '一周前',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', date);}}]
      },
      tableTitle_xiangqing: [
        {key: "item_name", title: "名称", min_width: "100"},
        {key: "quantity", title: "数量", min_width: "100"},
        {key: "price", title: "单价", min_width: "100"},
        {key: "discount", title: "折扣", min_width: "100"},
        {key: "cost", title: "成本", min_width: "100"},
        {key: "amount", title: "金额", min_width: "100"},
        {key: "c_name", title: "施工人员", min_width: "100"},
        {key: "s_name", title: "销售人员", min_width: "100"},
        {key: "repair_type_name", title: "类型", min_width: "100"},
        {key: "account_type_name", title: "账类", min_width: "100"},
        {key: "type", title: "类别", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"},
      ],
      tableData_xiangqing: [],
      tableTitle: [
        {key: "order_sn", title: "工单号", min_width: "100"},
        {key: "category_name", title: "维修类别", min_width: "100"},
        {key: "name", title: "客户姓名", min_width: "100"},
        {key: "license_plate_number", title: "车牌号", min_width: "100"},
        {key: "vin", title: "车架号", min_width: "100"},
        {key: "p_pinpai", title: "品牌", min_width: "100"},
        {key: "p_chexi", title: "车系", min_width: "100"},
        {key: "p_chexingmingcheng", title: "车型", min_width: "100"},
        {key: "mileage", title: "公里数", min_width: "100"},
        {key: "sname", title: "服务顾问", min_width: "100"},
        {key: "card_no", title: "会员卡号", min_width: "100"},
        {key: "total_cost", title: "成本价", min_width: "100"},
        {key: "total_amount", title: "总金额", min_width: "100"},
        {key: "total_gross_profit", title: "总毛利", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"},
      ],
      tableData: [],
      tablePage: {
        currentPage: 1,//当前页
        pageSize: 20,//当前页数据
        totalResult: 0//总数据
      },
      loading: false,
      url: this.$store.state.domainName_http+"/StoreAdmin/Financial/getRepairOrders",
      //数据
      key_name: "",
      store_name: "",
      store_id: "",
      store_select: ""
    }
  },
  methods:{
    search: function(){
      this.findList(this.url, {search: this.key_name, sid: this.store_id});
    },
    download: function(){
      this.$refs.mytable.exportData({type: "csv"});
    },
    loadContentMethod: function({row}){
      return new Promise((resolve)=>{
        setTimeout(()=>{
          this.$api.HttpPost("/StoreAdmin/Financial/getRepairOrderDetails", {order_id: row.order_id})
          .then((data)=>{
            this.tableData_xiangqing = data.data.data;
          })
          resolve();
        }, 500)
      });
    },
    findList: function(url, ...search){
      this.loading = true;
      search[0].page = this.tablePage.currentPage;
      search[0].quantity = this.tablePage.pageSize;
      this.$axios.post(url, search[0], {withCredentials: true})
      .then((data)=>{
        this.tableData = data.data.data.data;
        this.loading = false;
      })
      .catch((data)=>{
        this.loading = false;
      })
    },
    handlePageChange: function({currentPage, pageSize}){
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.search();
    }
  },
  mounted(){
    this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {})
    .then((data)=>{
      this.store_select = data.data;
    })
    this.search();
  }
}
</script>

<style scoped>
#Finance_zhangdanbaobiao{
  margin: 1rem 5rem;
}
</style>
