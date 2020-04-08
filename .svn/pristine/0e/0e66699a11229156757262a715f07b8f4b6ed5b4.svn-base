<template>
  <div>
    <div class="contation">
          <div class="query-box">
            <el-select style="margin-right:10px" v-model="unit_select" clearable size="mini" placeholder="请选择挂账单位">
              <el-option
                v-for="(item,index) in unit_select_list"
                :key="index"
                :label="item.unit_name"
                :value="item.unit_name"
              ></el-option>
            </el-select>

            <el-select v-model="store_value" clearable size="mini" placeholder="请选择所属门店">
              <el-option
                v-for="(item,index) in store_select"
                :key="index"
                :label="item.store_name"
                :value="item.sid"
              ></el-option>
            </el-select>
            <el-button type="primary" size="mini" @click="search" st
            yle="margin-left:10px">查询</el-button>
          </div>
          <mytable
          operation_mod_name="反结"
          operation_del_name="作废"
        :check_box="false"
        :operation_mod="true"
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
  name: "Fifth",
  components: {
    mytable
  },
  props: {
    store_select: {
      type: Array,
      default: ()=>{[]}
    }
  },
  data() {
    return {
        store_value: "",
        unit_select:"",
        unit_select_list: [],
        tableTitle: [
        { key: "order_sn", title: "还款单号", min_width: "100" },
        { key: "unit_name", title: "还款单位", min_width: "100" },
        { key: "pay_money", title: "实际还款", min_width: "100" },
        { key: "preferential_amount", title: "优惠金额", min_width: "50" },
        { key: "total_cancel", title: "此次销帐金额", min_width: "100" },
        { key: "create_time", title: "还款时间", min_width: "50" },
        { key: "ename", title: "操作人员", min_width: "50" },
        { key: "store_name", title: "门店", min_width: "50" },
        { key: "remark", title: "备注", min_width: "100" },
      ],
      tableData: []
    }
  },
  mounted() {
    this.getCreditUnitSelect()
    this.handlePageChange()
  },
  methods: {
    getCreditUnitSelect() {
      this.$api
        .HttpPost("/StoreAdmin/Credit/getCreditUnitSelect")
        .then(v => {
          let res = v.data;
          if (res.code == 200) {
            let data = res.data;
            this.unit_select_list = data;
          }
        })
    },
      cell_click(scope) {
      this.Custome_info = scope.row;
    },
   search() {
     let {store_value, unit_select} = this
     this.handlePageChange({sid:store_value, search:unit_select})
   },
   resData(data) {
     this.tableData = data;
   },
   handlePageChange(data = {}) {
      this.$refs.mytable.findList(
        this.$api.yuming + "/StoreAdmin/Credit/getRepaidList",
        data
      );
    },
   del(scoped) {
     let id = scoped.row.id
      this.$api.HttpPost("/StoreAdmin/Credit/invalidRepaid",{id})
      .then(v => {
        if(v.data.code == 200) {
          this.$message({
            type:"success",
            message:"操作成功"
          })
          this.handlePageChange()
        } else {
          this.$message.error(v.data.msg)
        }
      })
   },
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
