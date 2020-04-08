<template>
  <div>
    <div class="contation">
      <div class="query-box">
        <el-button
          type="primary"
          size="mini"
          @click="showArrearsDialong"
          style="margin-left:10px"
        >期初</el-button>
        <el-button type="primary" size="mini" @click="showPaymentDialog" style="margin-left:10px">销账</el-button>
        <el-button type="primary" size="mini" style="margin-left:10px">导出</el-button>

        <el-select
          v-model="store_value"
          style="margin-left:5px"
          clearable
          size="small"
          placeholder="请选择门店"
        >
          <el-option
            v-for="(item, index) in store_select"
            :key="index"
            :label="item.store_name"
            :value="item.sid"
          ></el-option>
        </el-select>

        <el-select
          v-model="supplie_value"
          style="margin-left:5px"
          clearable
          size="small"
          placeholder="请选择供应商"
        >
          <el-option
            v-for="(item, index) in supplie_select"
            :key="index"
            :label="item.supplier_name"
            :value="item.id"
          ></el-option>
        </el-select>

        <el-button type="primary" size="mini" @click="search" style="margin-left:10px">查询</el-button>
      </div>

      <!-- 销账按钮弹框 -->
      <el-dialog
        width="40%"
        :title="title"
        @close="closedialog"
        :visible.sync="dialogPaymentVisible"
      >
        <div style="width:100%">
          <el-row :gutter="30">
            <el-col :span="12">
              <el-input size="small" disabled v-model="danhao_number">
                <template slot="prepend">还款单号</template>
              </el-input>
            </el-col>
            <el-col :span="12">
              <el-input size="small " disabled v-model="currentRow.supplier_name">
                <template slot="prepend">供应商</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-input size="small" disabled v-model="currentRow.rest_money">
                <template slot="prepend">当前挂账</template>
              </el-input>
            </el-col>
            <el-col :span="12">
              <el-input size="small " type="number" v-model="paymentObj.cash">
                <template slot="prepend">
                  <span class="red">*</span>现金
                </template>
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-input size="small" type="number" v-model="paymentObj.unionpay">
                <template slot="prepend">银联</template>
              </el-input>
            </el-col>
            <el-col :span="12">
              <el-input size="small " type="number" v-model="paymentObj.wechat_pay">
                <template slot="prepend">微信</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-input size="small" type="number" v-model="paymentObj.alipay">
                <template slot="prepend">支付宝</template>
              </el-input>
            </el-col>
            <el-col :span="12">
              <el-input size="small " v-model="paymentObj.preferential_amount">
                <template slot="prepend">优惠金额</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <div class="row-wrap">
                <span class="row-head" style="padding:0 15px">
                  <span class="red">*</span>还款日期
                </span>
                <el-date-picker
                  v-model="paymentObj.payment_time"
                  type="date"
                  size="mini"
                  value-format="timestamp"
                  placeholder="选择日期"
                ></el-date-picker>
              </div>
            </el-col>
            <el-col :span="12">
              <el-input size="small " style="margin-top:7px" disabled v-model="amount">
                <template slot="prepend">优惠金额</template>
              </el-input>
            </el-col>
          </el-row>
          <el-input
            size="small "
            type="textarea"
            placeholder="备注"
            style="margin-top:7px"
            v-model="paymentObj.remark"
          ></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="mini" @click="confirm_payment">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 期初欠款弹出框 -->
      <el-dialog
        width="30%"
        :title="title"
        @close="closedialog"
        :visible.sync="dialogqiankuangVisible"
      >
        <el-input
          style="margin-bottom:10px"
          size="mini"
          disabled
          v-model="currentRow.supplier_name"
        >
          <template slot="prepend">
            <span>供应商</span>
          </template>
        </el-input>
        <el-input style="margin-bottom:10px" size="mini" placeholder="请输入内容" v-model="arrearValue">
          <template slot="prepend">
            <span class="red">*</span>
            <span>期初欠款</span>
          </template>
        </el-input>
        <div slot="footer" class="dialog-footer">
          <el-button type="mini" @click="confirmArrear">确 定</el-button>
        </div>
      </el-dialog>

      <vxe-table
        border
        show-footer
        :loading="loading"
        :footer-method="footerMethod"
        :footer-row-style="{ fontWeight: 700 }"
        highlight-current-row
        stripe
        resizable
        @cell-click="cell_click"
        :radio-config="{ labelField: '', trigger: 'row' }"
        height="700"
        :data="tableData"
      >
        >
        <vxe-table-column type="radio" width="50"></vxe-table-column>
        <vxe-table-column
          :type="item.type"
          :formatter="formatter"
          :title="item.title"
          v-for="(item, index) in tableColumn"
          :key="index"
          :min-width="item.min_width"
          :field="item.field"
          header-align="center"
        >
          <vxe-table-column
            v-for="(val, indexs) in item.children"
            :key="indexs"
            :formatter="formatter"
            :min-width="val.min_width"
            :field="val.field"
            :title="val.title"
          ></vxe-table-column>
        </vxe-table-column>
      </vxe-table>
    </div>
  </div>
</template>

<script>
import mytable from "../../mytable";
export default {
  name: "two",
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
      tableColumn: [
        { type: "seq", width: 50 },
        { field: "supplier_name", title: "供应商", showOverflow: true },
        { field: "credit", title: "期初欠款", showOverflow: true },
        {
          title: "采购总汇",
          children: [
            { field: "leijicaigou", title: "累计采购" },
            { field: "leijiyouhui", title: "采购优惠" },
            { field: "caigoufukuan", title: "采购付款" },
            { field: "caigouqiankuan", title: "采购欠款" }
          ]
        },
        {
          title: "退货汇总",
          children: [
            { field: "leijituihuo", title: "累计退货" },
            { field: "tuihuoyouhui", title: "退货优惠" },
            { field: "tuihuofukuan", title: "退货付款" },
            { field: "tuihuoqiankuan", title: "退货欠款" }
          ]
        },
        {
          title: "销账汇总",
          children: [
            { field: "leijixiaozhang", title: "累计销账" },
            { field: "leijiyouhui", title: "累计优惠" },
            { field: "leijifukuan", title: "累计付款" }
          ]
        },
        { field: "rest_money", title: "应付款余额", showOverflow: true }
      ],
      tableData: [],
      title: "",
      loading: false,
      currentRow: {},
      // 期初欠款
      arrearValue: 0,
      // 还款
      paymentObj: {},
      value1: "",
      search_value: "",
      store_value: "",
      supplie_value: "",
      danhao_number: 0,
      ArrearsObj: {},
      dialogqiankuangVisible: false,
      dialogPaymentVisible: false,
      Custome_info: {},
      tableTitle: [
        { key: "unit_name", title: "挂账单位", min_width: "100" },
        { key: "qichu_credit", title: "期初欠款", min_width: "100" },
        { key: "credit_amount", title: "允许挂账金额", min_width: "100" },
        { key: "leiji_credit", title: "累计挂账金额", min_width: "100" },
        { key: "leiji_preferential", title: "累计优惠金额", min_width: "100" },
        { key: "leiji_cancel", title: "累计还款金额", min_width: "100" },
        { key: "rest_credit", title: "剩余欠款金额", min_width: "100" }
      ],
      GetMemberSelectTitle: [
        { key: "name", title: "姓名", min_width: "100" },
        { key: "tel", title: "电话", min_width: "100" },
        { key: "chepai", title: "车牌", min_width: "100" }
      ],
      operation: false,
      number: false,
      paging: false,
      //数据
      tp: 2,
      store_name: "",
      creditUnitsCustomer: [],
      visible: false,
      outerVisible: false,
      input1: "",
      dialogFormVisible: false,
      isAdd: true,
      tableData: [],
      GetMemberSelectArr: {},
      value: "",
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    // 合计
    footerMethod({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return "";
          } else if (columnIndex === 2) {
            return "合计";
          }
          if (
            [
              "credit",
              "leijicaigou",
              "leijiyouhui",
              "caigoufukuan",
              "caigouqiankuan",
              "leijituihuo",
              "tuihuoyouhui",
              "tuihuofukuan",
              "tuihuoqiankuan",
              "leijixiaozhang",
              "leijiyouhui",
              "leijifukuan"
            ].includes(column.property)
          ) {
            return this.handleSum(data, column.property);
          }
          return "0";
        })
      ];
    },
    handleSum(list, field) {
      var total = 0;
      for (var index = 0; index < list.length; index++) {
        total += Number(list[index][field] || 0);
      }
      return total;
    },
    formatter({ cellValue }) {
      return cellValue ? cellValue : 0;
    },
    // 期初欠款
    showArrearsDialong() {
      if (Object.keys(this.currentRow).length == 0) {
        this.$message.error("请选择一项");
        return;
      }
      this.title = "期初欠款";
      this.dialogqiankuangVisible = true;
    },
    confirmArrear() {
      const { arrearValue } = this;
      if (!arrearValue) {
        return this.$message.error("请填写金额");
      }
      this.$api
        .HttpPost("/StoreAdmin/Caigouyingfu/updateSupplierCredit", {
          credit: arrearValue,
          id: this.currentRow.id
        })
        .then(v => {
          this.$message({
            message: v.data.msg,
            type: "success"
          });
          this.dialogqiankuangVisible = false;
          this.getTableList();
        });
    },
    // 销账
    showPaymentDialog() {
      this.title = "销账";
      this.danhao_number = this.danhao();
      if (Object.keys(this.currentRow).length == 0) {
        this.$message.error("请选择一项");
        return;
      }
      this.dialogPaymentVisible = true;
    },
    confirm_payment() {
      let { paymentObj } = this;
      if (!paymentObj.payment_time || !paymentObj.cash) {
        return this.$message.error("信息未填写完整");
      }
      paymentObj.id = this.currentRow.id;
      paymentObj.order_sn = this.danhao_number;
      paymentObj.amount = this.amount;
      paymentObj.payment_time = (this.paymentObj.payment_time + "").substr(
        0,
        10
      );
      paymentObj.unionpay = this.paymentObj.unionpay
        ? this.paymentObj.unionpay
        : 0;
      paymentObj.wechat_pay = this.paymentObj.wechat_pay
        ? this.paymentObj.wechat_pay
        : 0;
      paymentObj.alipay = this.paymentObj.alipay ? this.paymentObj.alipay : 0;
      paymentObj.preferential_amount = this.paymentObj.preferential_amount
        ? this.paymentObj.preferential_amount
        : 0;
      this.$api
        .HttpPost("/StoreAdmin/Caigouyingfu/crossOffAnAccount", paymentObj)
        .then(v => {
          if (v.data.code == 200) {
            this.$message({
              message: "还款成功",
              type: "success"
            });
            this.paymentObj = {};
            this.dialogPaymentVisible = false;
            this.getTableList();
          } else {
            this.$message.error(v.data.msg);
            this.paymentObj = {};
            this.dialogPaymentVisible = false;
          }
        });
    },
    // 获取table数据
    getTableList(json = {}) {
      this.loading = true;
      this.$api
        .HttpPost("/StoreAdmin/Caigouyingfu/getFinancialSummary", json)
        .then(v => {
          let res = v.data;
          if (res.code == 200) {
            let data = res.data;
            let tableData = data.map(item => {
              let obj = {
                id: item.id,
                supplier_name: item.supplier_name,
                credit: item.credit,
                ...item.caigouhuizong,
                ...item.tuihuohuizong,
                ...item.xiaozhanghuizhong,
                rest_money: item.rest_money
              };
              return obj;
            });
            this.tableData = tableData;
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    // 查询按钮
    search() {
      let sid = this.store_value;
      let supplier_id = this.supplie_value;
      this.getTableList({ sid, supplier_id });
    },
    cell_click(scope) {
      this.currentRow = scope.row;
      this.visible = false;
    },
    closedialog() {
      this.visible = false;
      this.currentRow = {};
      this.danhao_number = 0;
      this.paymentObj = {};
    },
    // 生成单号
    danhao() {
      let currDate = new Date();
      let year = currDate.getFullYear();
      let month =
        currDate.getMonth() + 1 < 10
          ? "0" + (currDate.getMonth() + 1)
          : currDate.getMonth() + 1;
      let day =
        currDate.getDate() < 10 ? "0" + currDate.getDate() : currDate.getDate();
      let hours =
        currDate.getHours() < 10
          ? "0" + currDate.getHours()
          : currDate.getHours();
      let stemp = currDate.getTime() + "";
      stemp = stemp.substr(stemp.length - 5, 4);
      return year + month + day + hours + stemp;
    }
  },
  computed: {
    amount() {
      if (Object.keys(this.paymentObj).length == 0) {
        return 0;
      }
      let {
        cash = 0,
        unionpay = 0,
        wechat_pay = 0,
        alipay = 0,
        preferential_amount = 0
      } = this.paymentObj;
      return (
        cash * 1 +
        unionpay * 1 +
        wechat_pay * 1 +
        alipay * 1 +
        preferential_amount * 1
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
.Arrear {
  width: 100px;
  height: 500px;
}
.addBtn:first-child {
  margin: 10px;
}
.query-box {
  /* width: 90%; */
  /* margin: 0 auto; */
  box-shadow: 5px 5px 20px #dcdfe6;
  padding-bottom: 13px;
  display: flex;
  /* margin-left: 20px; */
  /* height: 40px; */
}
.red {
  color: red;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  background: #f6f6f8;
}
.custome-info-input {
  width: 30%;
  height: 100%;
  line-height: 40px;
  text-align: center;
  border-right: 1px solid #e0e0e0;
  text-align: center;
}
.bill-table {
  height: 300px;
}
.row-head {
  /* background: #D3DCE6; */
  text-align: center;
  border-right: 1px solid #d3dce6;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  line-height: 34px;
  color: #909399;
}
.row-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  border: 1px solid #d3dce6;
  border-radius: 5px;
  margin-top: 7px;
}
</style>
