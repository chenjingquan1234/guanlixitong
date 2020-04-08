<template>
  <div>
    <div class="contation">
      <div class="query-box">
        <el-input style="width:200px;margin-right:7px" placeholder="请输入内容" size="mini" v-model="search_value">
          <template style="width:50px" slot="prepend">关键字搜索</template>
        </el-input>

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

        <el-select style="margin-right:7px" v-model="unit_select" clearable size="mini" placeholder="请选择挂账单位">
          <el-option
            v-for="(item,index) in unit_select_list"
            :key="index"
            :label="item.unit_name"
            :value="item.unit_name"
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
        <el-button type="primary" size="mini" @click="search" st yle="margin-left:10px">查询</el-button>
      </div>
      <mytable
        :check_box="false"
        :operation="false"
        :operation_mod="false"
        :tableTitle="tableTitle"
        :tableData="tableData"
        @cell_click="cell_click"
        @del="del"
        ref="mytable"
        @resData="resData"
        @handlePageChange="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue";
export default {
  name: "Fourth",
  components: {
    mytable
  },
  props: {
    store_select: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    return {
      search_value: "",
      date_time: "",
      store_value: "",
      tableTitle: [
        { key: "order_sn", title: "挂账单号", min_width: "150" },
        { key: "ename", title: "服务顾问", min_width: "100" },
        { key: "name", title: "姓名", min_width: "100" },
        { key: "tel", title: "手机", min_width: "100" },
        { key: "chepai", title: "车牌", min_width: "100" },
        { key: "amount", title: "消费金额", min_width: "100" },
        { key: "credit", title: "挂账金额", min_width: "100" },
        { key: "unit_name", title: "挂账单位", min_width: "100" },
        { key: "create_time", title: "挂账时间", min_width: "100" },
        { key: "store_name", title: "门店", min_width: "100" }
      ],
      tableData: [],
      unit_select: "",
      unit_select_list: [],
      Custome_info:{},
    };
  },
  mounted() {
    this.handlePageChange();
    this.getCreditUnitSelect();
  },
  methods: {
    getCreditUnitSelect() {
      this.$api.HttpPost("/StoreAdmin/Credit/getCreditUnitSelect").then(v => {
        let res = v.data;
        if (res.code == 200) {
          let data = res.data;
          this.unit_select_list = data;
        }
      });
    },
      cell_click(scope) {
      this.Custome_info = scope.row;
    },
    search() {
      let { store_value, unit_select, date_time, search_value } = this;
      console.log(date_time);
      let start_time = (date_time[0] + "").substr(0, 10);
      let end_time = (date_time[1] + "").substr(0, 10);
      let obj = {
        search: search_value ,
        start_time,
        end_time,
        sid: store_value,
        unit_name: unit_select
      }
      let json = {}
      for(let key in obj) {
        if(obj.key) {
          json.key = obj.key
        }
      }
      this.handlePageChange(json);
    },
    resData(data) {
      this.tableData = data;
    },
    handlePageChange(data = {}) {
      this.$refs.mytable.findList(
        this.$api.yuming + "/StoreAdmin/Credit/getCreditList",
        data
      );
    },
    del(scoped) {
      let id = scoped.row.id;
      this.$api
        .HttpPost("/StoreAdmin/Credit/invalidBeginningCredit", { id })
        .then(v => {
          if (v.data.code == 200) {
            this.$message({
              type: "success",
              message: "操作成功"
            });
            this.handlePageChange();
          } else {
            this.$message.error(v.data.msg);
          }
        });
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
