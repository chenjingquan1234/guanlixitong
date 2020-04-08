<template>
  <div id="seven">
    <div class="pb-nav">
      <el-button size="small" type="info" icon="el-icon-download" @click="search()">打印</el-button>
      <el-input size="small" style="width: 20rem;"><label slot="prepend">关键字</label></el-input>
      <el-date-picker size="small"
        v-model="begin_date"
        align="right"
        type="date"
        placeholder="开始日期|时间"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-date-picker size="small"
        v-model="over_date"
        align="right"
        type="date"
        placeholder="结束日期|时间"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-select size="small" v-model="value_select" placeholder="产品类型">
        <el-option v-for="value in value_c_select" :key="value" :label="value" :value="value"></el-option>
      </el-select>
      <el-select size="small" v-model="value_select" placeholder="所属门店">
        <el-option v-for="value in value_c_select" :key="value" :label="value" :value="value"></el-option>
      </el-select>
      <el-button size="small" type="primary" @click="search()">查询</el-button>
    </div>

    <vxe-table size="small" align="center" ref="xTable" highlight-hover-row highlight-current-row border
    :class="{mytable: class_mytable}"
    :data="tableData"
    :loading="loading"
    :select-config="{reserve: true}"
    :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
    @cell-click="cell_click"
    @edit-actived="edit_actived"
    @edit-closed="edit_closed">
      <vxe-table-column title="序号" width="50"></vxe-table-column>
      <vxe-table-column field="index" title="商品名称"></vxe-table-column>
      <vxe-table-column field="index" title="条形码"></vxe-table-column>
      <vxe-table-column field="index" title="商品编码"></vxe-table-column>
      <vxe-table-column title="期初">
        <vxe-table-column field="index" title="数量"></vxe-table-column>
        <vxe-table-column field="index" title="单价"></vxe-table-column>
        <vxe-table-column field="index" title="金额"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column title="本期入库">
        <vxe-table-column field="index" title="数量"></vxe-table-column>
        <vxe-table-column field="index" title="金额"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column title="本期出库">
        <vxe-table-column field="index" title="数量"></vxe-table-column>
        <vxe-table-column field="index" title="金额"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column title="期末">
        <vxe-table-column field="index" title="数量"></vxe-table-column>
        <vxe-table-column field="index" title="单价"></vxe-table-column>
        <vxe-table-column field="index" title="金额"></vxe-table-column>
      </vxe-table-column>
    </vxe-table>
    <!-- 分页器 -->
    <vxe-pager
      :loading="loading"
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
  name: "seven",
  data(){
    return{
      begin_date: "",
      over_date: "",
      pickerOptions: {
        disabledDate(time){return time.getTime() > Date.now();},
        shortcuts: [{text: '今天',onClick(picker) {picker.$emit('pick', new Date());}},
        {text: '昨天',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24);picker.$emit('pick', date);}},
        {text: '一周前',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', date);}}]
      },
      tableData: [{index: 1}],
      tablePage: {
        currentPage: 1,//当前页
        pageSize: 10,//当前页数据
        totalResult: 0//总数据
      },
      loading: false,
    }
  }
}
</script>

<style scoped>
#seven{
  margin: 1rem 5rem;
}
.vxe-table{
  min-height: 600px;
  margin-top: 10px;
  width: 100%;
  box-shadow: 5px 5px 20px #dcdfe6;
}
</style>
