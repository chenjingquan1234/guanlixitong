<template>
  <div>
    <div class="contation">
      <div class="query-box">
         <el-select style="margin-right:7px" v-model="supplie_value" clearable size="mini" placeholder="请选择供应商">
          <el-option
            v-for="(item,index) in supplie_select"
            :key="index"
            :label="item.supplier_name"
            :value="item.id"
          ></el-option>
        </el-select>

        <el-select style="margin-right:7px"  v-model="store_value" clearable size="mini" placeholder="请选择所属门店">
          <el-option
            v-for="(item,index) in store_select"
            :key="index"
            :label="item.store_name"
            :value="item.sid"
          ></el-option>
        </el-select>
        
        <el-date-picker
          style="margin-right:7px"
          size="mini"
          value-format="timestamp"
          v-model="date_time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button type="primary" size="mini" @click="search" st yle="margin-left:10px">查询</el-button>
      </div>
      <mytable
        :check_box="false"
        :operation="false"
        :operation_mod="false"
        :tableTitle="tableTitle"
        :tableData="tableData"
        @cell_click="cell_click"
        ref="mytable"
        @resData="resData"
        @handlePageChange="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import mytable from "../../mytable";
export default {
  name: "three",
  components: {
    mytable
  },
  props: {
    store_select: {
      type: Array,
      default: () => {
        [];
      }
    },
    supplie_select: {
    type: Array,
    default: () => {
       [];
      }
    }
  },
  data() {
    return {
      supplie_value: "",
      date_time: "",
      store_value: "",
      tableTitle: [
        { key: "order_sn", title: "付款单号", min_width: "150" },
        { key: "amount", title: "实际付款", min_width: "100" },
        { key: "preferential_amount", title: "优惠金额", min_width: "100" },
        { key: "total_money", title: "销账金额", min_width: "100" },
        { key: "create_time", title: "付款时间", min_width: "100" },
        { key: "name", title: "操作人员", min_width: "100" },
        { key: "store_name", title: "门店", min_width: "100" },
        { key: "supplier_name", title: "供应商", min_width: "100" },
      ],
      tableData: [],
      unit_select_list: [],
      Custome_info:{},
    };
  },
  mounted() {
    this.handlePageChange();
  },
  methods: {
      cell_click(scope) {
      this.Custome_info = scope.row;
    },
    search() {
      let { store_value, date_time, supplie_value } = this;
      console.log(date_time);
      let start_time = date_time[0] ? (date_time[0] + "").substr(0, 10) : "";
      let end_time = date_time[1] ? (date_time[1] + "").substr(0, 10) : "";
      let obj = {
        is_annullable: 1,
        start_time,
        end_time,
        sid: store_value,
        supplier_id: supplie_value
      }
     
      this.handlePageChange(obj);
    },
    resData(data) {
      this.tableData = data;
    },
    handlePageChange(data = {is_annullable: 1}) {
      this.$refs.mytable.findList(
        this.$api.yuming + "/StoreAdmin/Caigouyingfu/getCrossOffRecord",
        data
      );
    }
  }
};
</script>

<style scoped>
.contation {
  width: 90%;
  margin: 10px auto;
}
.query-box {
  width: 100%;
  /* padding: 0 5%; */
  box-shadow: 5px 5px 20px #dcdfe6;
  padding-bottom: 13px;
  display: flex;
  margin: 10px auto;
}
</style>
