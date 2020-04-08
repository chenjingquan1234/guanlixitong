<template>
  <div>
    <div class="contation">
      <div class="query-box">
        <el-select
          style="margin-right:7px"
          v-model="type_value"
          clearable
          size="mini"
          placeholder="请选择类型"
        >
          <el-option
            v-for="(item,index) in typeArr"
            :key="index"
            :label="item.field"
            :value="item.type"
          ></el-option>
        </el-select>

        <el-select
          style="margin-right:7px"
          v-model="supplie_value"
          clearable
          size="mini"
          placeholder="请选择供应商"
          ref="gys"
        >
          <el-option
            v-for="(item,index) in supplie_select"
            :key="index"
            :label="item.supplier_name"
            :value="item.id"
          ></el-option>
        </el-select>

        <!-- <el-select style="margin-right:7px"  v-model="store_value" clearable size="mini" placeholder="请选择所属门店">
          <el-option
            v-for="(item,index) in store_select"
            :key="index"
            :label="item.store_name"
            :value="item.sid"
          ></el-option>
        </el-select>-->

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
        @handlePageChange="search"
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
      supplie_value: '',
      date_time: "",
      // store_value: "",
      type_value: 0,
      typeArr: [
        { field: "全部", type: 0 },
        { field: "采购", type: 1 },
        { field: "退货", type: 2 },
        { field: "付款", type: 3 }
      ],
      tableTitle: [
        { key: "supplie_name", title: "供应商", min_width: "150" },
        { key: "order_number", title: "单号", min_width: "100" },
        { key: "type", title: "业务类型", min_width: "100" },
        { key: "unpaid_money", title: "增加应付款", min_width: "100" },
        { key: "update_time", title: "时间", min_width: "100" },
        { key: "remark", title: "备注", min_width: "100" }
        // { key: "store_name", title: "门店", min_width: "100" },
      ],
      tableData: [],
      unit_select: "",
      unit_select_list: [],
      Custome_info: {}
    };
  },
  mounted() {
    setTimeout(()=>{
      this.supplie_value = this.supplie_select[0].id
    }, 0)
  },
  methods: {
    cell_click(scope) {
      this.Custome_info = scope.row;
    },
    search() {
      setTimeout(() => {
        let { store_value, type_value, date_time, supplie_value } = this;
        let start_time = date_time[0] ? (date_time[0] + "").substr(0, 10) : "";
        let end_time = date_time[1] ? (date_time[1] + "").substr(0, 10) : "";
        console.log(this.supplie_select[0].id, supplie_value);
        let supplier_id = !supplie_value
          ? this.supplie_select[0].id
          : supplie_value;
        let type = type_value ? type_value : 4;
        // let sid = store_value ? store_value : this.store_select[0].sid
        let obj = {
          type,
          start_time,
          end_time,
          // sid,
          supplier_id
        };
        this.handlePageChange(obj);
      }, 0);
    },
    resData(data) {
      let index = 0;
      if (this.supplie_value) {
        index = this.supplie_select.findIndex(
          item => item.id == this.supplie_value
        );
      } else {
        // this.supplie_value = this.supplie_select[0].supplier_name;
        // this.$refs.gys.label = 
      }
      data.forEach(item => {
        item.supplie_name = this.supplie_select[index].supplier_name;
        item.update_time = this.getTime(item.update_time);
        if (item.type == 1) {
          item.type = "采购";
        } else if (item.type == 2) {
          item.type = "退款";
        } else if (item.type == 3) {
          item.type = "付款";
        }
      });
      this.tableData = data;
    },
    handlePageChange(data = {}) {
      this.$refs.mytable.findList(
        this.$api.yuming + "/storeadmin/Caigouyingfu/getSupplierFinanceDetail",
        data
      );
    },
    getTime(time) {
      let time1 = time * 1000;
      let time2 = new Date(time1);
      var year = time2.getFullYear();
      var month = time2.getMonth() + 1;
      var date = time2.getDate();
      var hour =
        time2.getHours() < 10 ? "0" + time2.getHours() : time2.getHours();
      var minute =
        time2.getMinutes() < 10 ? "0" + time2.getMinutes() : time2.getMinutes();
      var second =
        time2.getSeconds() < 10 ? "0" + time2.getSeconds() : time2.getSeconds();
      return (
        year +
        "年" +
        month +
        "月" +
        date +
        "日   " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    }
  },
  watch: {}
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
