<template>
  <div>
    <div class="contation">
      <div class="query-box">
        <el-button type="primary" size="mini" @click="addBillbtn" icon="el-icon-circle-plus">新增单位</el-button>
        <el-button type="primary" size="mini" @click="handlebind" style="margin-left:10px">绑定</el-button>
        <el-button type="primary" size="mini" @click="handlePayment" style="margin-left:10px">还款</el-button>
        <el-button type="primary" size="mini" @click="handleArrears" style="margin-left:10px">期初欠款</el-button>
        <el-button type="primary" size="mini" style="margin-left:10px">导出</el-button>
        <el-input
          style="width:200px;margin-left:30px"
          placeholder="请输入内容"
          size="mini"
          v-model="search_value"
        >
          <template style="width:50px" slot="prepend">挂帐单位</template>
        </el-input>
        <div>
          <el-select
            v-model="store_value"
            style="margin-left:5px"
            @change="handleStore"
            clearable
            size="mini"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in store_select"
              :key="index"
              :label="item.store_name"
              :value="item.sid"
            ></el-option>
          </el-select>
          <el-button type="primary" size="mini" @click="search_outer" style="margin-left:10px">查询</el-button>
        </div>
      </div>
      <!-- 新增按钮弹出框 -->
      <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-input
          style="margin-bottom:10px"
          size="mini"
          placeholder="请输入内容"
          v-model="formBillObj.unit_name"
        >
          <template slot="prepend">
            <span class="red">*</span>
            <span>姓名</span>
          </template>
        </el-input>
        <el-input
          style="margin-bottom:10px"
          size="mini"
          placeholder="请输入内容"
          v-model="formBillObj.credit_amount"
        >
          <template slot="prepend">
            <span class="red">*</span>
            <span>允许挂账金额</span>
          </template>
        </el-input>
        <el-input
          style="margin-bottom:10px"
          size="mini"
          placeholder="请输入内容"
          v-model="formBillObj.contacts"
        >
          <template slot="prepend">
            <span class="red">*</span>
            <span>联系人</span>
          </template>
        </el-input>
        <el-input
          style="margin-bottom:10px"
          size="mini"
          placeholder="请输入内容"
          v-model="formBillObj.phone"
        >
          <template slot="prepend">
            <span class="red">*</span>
            <span>手机号码</span>
          </template>
        </el-input>
        <el-input
          style="margin-bottom:10px"
          size="mini"
          placeholder="请输入内容"
          v-model="formBillObj.tel"
        >
          <template slot="prepend">
            <span>联系电话</span>
          </template>
        </el-input>
        <el-input
          style="margin-bottom:10px"
          size="mini"
          placeholder="请输入内容"
          v-model="formBillObj.fax"
        >
          <template slot="prepend">传真</template>
        </el-input>
        <el-input
          style="margin-bottom:10px"
          size="mini"
          placeholder="请输入内容"
          v-model="formBillObj.address"
        >
          <template slot="prepend">地址</template>
        </el-input>
        <el-input
          style="margin-bottom:10px"
          type="textarea"
          show-word-limit
          autosize
          placeholder="备注"
          v-model="formBillObj.remark"
        ></el-input>

        <div slot="footer" class="dialog-footer">
          <el-button type="mini" @click="dialogFormVisible = false">取 消</el-button>
          <el-button size="mini"  type="primary" @click="addBill(1)">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 绑定按钮弹出框 -->
      <el-dialog :visible.sync="outerVisible" @close="closedialog">
        <el-input disabled v-model="current_unit.unit_name" style="margin-bottom:5px;">
          <template slot="prepend">挂帐信息</template>
        </el-input>
        <el-input @input="inner_search" v-model="input1" style="margin-bottom:5px;">
          <template slot="prepend">客户查询</template>
          <template slot="append">
            <el-popover placement="left-start" width="500" trigger="manual" v-model="visible">
              <mytable
                :check_box="false"
                :height="300"
                :operation="false"
                :tableTitle="GetMemberSelectTitle"
                :tableData="GetMemberSelectArr"
                @resData="resDataMemberSelect"
                @handlePageChange="handlePageChangeMemberSelect"
                @cell_click="cell_click"
                ref="mytable_2"
              />
              <i slot="reference" class="el-icon-arrow-down" @click="handleGetMemberSelect"></i>
            </el-popover>
          </template>
        </el-input>

        <div
          style="margin-bottom:5px;width:100%;height:40px;background:#F5F7FA;border:1px solid #E4E7ED;border-radius:4px;display:flex;"
        >
          <div class="custome-info-input" style="width:97px">客户信息</div>
          <div style="flex:1;display:flex;">
            <div class="custome-info-input">{{Custome_info.name}}</div>
            <div class="custome-info-input">{{Custome_info.tel}}</div>
            <div class="custome-info-input">{{Custome_info.chepai}}</div>
            <div
              class="custome-info-input"
              style="width:10%;background:#409EFF;color:#fff"
              @click="confirmBind"
            >确定绑定</div>
          </div>
        </div>
        <el-table size="mini" :data="creditUnitsCustomer" style="width: 100%">
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="tel" label="电话" width="180"></el-table-column>
          <el-table-column prop="chepai" label="车牌"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除绑定</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div slot="footer" class="dialog-footer">
          <el-button @click="closedialog">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 还款按钮弹框 -->
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
              <el-input size="small " disabled v-model="current_unit.unit_name">
                <template slot="prepend">挂帐单位</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-input size="small" disabled v-model="current_unit.rest_credit">
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
        <el-input style="margin-bottom:10px" size="mini" v-model="current_unit.unit_name">
          <template slot="prepend">
            <span>姓名</span>
          </template>
        </el-input>
        <el-input
          style="margin-bottom:10px"
          size="mini"
          placeholder="请输入内容"
          v-model="ArrearsObj.amount"
        >
          <template slot="prepend">
            <span class="red">*</span>
            <span>允许挂账金额</span>
          </template>
        </el-input>

        <el-input
          style="margin-bottom:10px;height:200px"
          type="textarea"
          :rows="4"
          show-word-limit
          autosize
          placeholder="备注"
          v-model="ArrearsObj.remark"
        ></el-input>

        <div slot="footer" class="dialog-footer">
          <el-button type="mini" @click="confirm_arrear">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 挂帐单位table -->
      <mytable
        :check_box="false"
        :tableTitle="tableTitle"
        :tableData="tableData"
        @modify="modify"
        @cell_click="cell_click_outer"
        @del="del"
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
  name: "Second",
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
      title: "",
      value1: "",
      search_value: "",
      store_value: "",
      danhao_number: 0,
      ArrearsObj: {},
      paymentObj: {},
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
      current_unit: {}, //表单客户信息
      creditUnitsCustomer: [],
      visible: false,
      outerVisible: false,
      input1: "",
      dialogFormVisible: false,
      isAdd: true,
      // 新增挂帐数据
      formBillObj: {
        unit_name: "",
        credit_amount: "",
        contacts: "",
        phone: "",
        tel: "",
        fax: "",
        address: "",
        remark: ""
      },
      tableData: [],
      GetMemberSelectArr: {},
      value: ""
    };
  },
  mounted() {
    this.getCreditUnitList();
    this.handlePageChange();
  },
  methods: {
    // 获取table数据
    getCreditUnitList(json = {}) {
      this.$refs.mytable.loading = true;
      this.$api
        .HttpPost("/StoreAdmin/Credit/getCreditUnitList", json)
        .then(v => {
          let res = v.data;
          if (res.code == 200) {
            let data = res.data.data;
            this.tableData = data;
          }
          this.$refs.mytable.loading = false;
        })
        .catch(err => {
          this.$refs.mytable.loading = false;
        });
    },
    handleStore() {
      const { store_value } = this;
      this.getBarData(store_value);
    },
    // 打开新增按钮
    addBillbtn() {
      this.title = "新增单位";
      this.isAdd = true;
      this.formBillObj = {};
      this.dialogFormVisible = true;
    },
    // 修改挂帐按钮
    modify(row, key) {
      this.title = "修改单位";
      const { id } = row.row;
      this.isAdd = false;
      this.$api
        .HttpPost("/StoreAdmin/Credit/getCreditUnitDetails", {
          id: parseInt(id)
        })
        .then(v => {
          const res = v.data;
          if (res.code == 200) {
            delete res.data.id;
            this.formBillObj = res.data;
          }
        });

      this.dialogFormVisible = true;
    },
    // 新增修改挂帐确认按钮
    addBill() {
      const id = this.current_unit.id ? this.current_unit.id : "";
      const { formBillObj, isAdd } = this;
      // 必填项检测
      const arr = ["挂帐单位", "允许挂帐金额", "联系人", "手机号码"];
      const arr2 = Object.keys(formBillObj);
      for (let i = 0; i < 4; i++) {
        const key = arr2[i];
        if (!formBillObj[key]) {
          this.$message.error(`${arr[i]}未填写`);
          return;
        }
      }
      // 发送数据
      if (isAdd) {
        formBillObj.add_type = 1;
      } else {
        formBillObj.add_type = 2;
        formBillObj.id = id;
      }
      this.$api
        .HttpPost("/storeadmin/Credit/addOrUpdateCreditUnit", formBillObj)
        .then(data => {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.getCreditUnitList();
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
      this.formBillObj = {};
      this.dialogFormVisible = false;
    },

    confirm_payment() {
      let { paymentObj } = this;
      if (!paymentObj.payment_time || !paymentObj.cash) {
        return this.$message.error("信息未填写完整");
      }
      paymentObj.id = this.current_unit.id;
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
        .HttpPost("/StoreAdmin/Credit/repayCredit", paymentObj)
        .then(v => {
          if (v.data.code == 200) {
            this.$message({
              message: "还款成功",
              type: "success"
            });
            this.paymentObj = {};
            this.dialogPaymentVisible = false;
            this.handlePageChange();
          } else {
            this.$message.error(v.data.msg);
            this.paymentObj = {};
            this.dialogPaymentVisible = false;
          }
        });
    },
    // 还款确认按钮
    confirm_arrear() {
      let { ArrearsObj } = this;
      ArrearsObj.id = this.current_unit.id;
      this.$api
        .HttpPost("/StoreAdmin/Credit/addBeginningCredit", ArrearsObj)
        .then(v => {
          if (v.data.code == 200) {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.ArrearsObj = {};
            this.dialogqiankuangVisible = false;
            this.getCreditUnitList();
          } else {
            this.$message.error(v.data.msg);
            this.ArrearsObj = {};
            this.dialogqiankuangVisible = false;
          }
        });
    },
    // 删除单位按钮
    del(scope) {
      const { id } = scope.row;
      this.$api
        .HttpPost("/StoreAdmin/Credit/delCreditUnit", { id: parseInt(id) })
        .then(v => {
          if(v.data.code === 200) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getCreditUnitList();
          } else {
            this.$message.error(v.data.msg)
          }
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    // 绑定按钮
    handlebind() {
      let val = this.$refs.mytable.$refs.xTable.getCurrentRow();
      this.current_unit = val;
      if (!val) {
        this.$alert("请选择一项", "提示", {
          confirmButtonText: "确定"
        });
        return;
      }
      // this.bindPost(val);
      this.outerVisible = true;
      this.$api
        .HttpPost("/storeadmin/Credit/creditUnitsCustomer", {
          id: val.id
        })
        .then(v => {
          let res = v.data;
          if (res.code == 200) {
            const data = res.data;
            this.creditUnitsCustomer = data;
          }
        });
    },
    bindPost() {
      let val = this.$refs.mytable.$refs.xTable.getCurrentRow();
      this.current_unit = val;
      this.$api
        .HttpPost("/storeadmin/Credit/creditUnitsCustomer", {
          id: val.id
        })
        .then(v => {
          let res = v.data;
          if (res.code == 200) {
            const data = res.data;
            this.creditUnitsCustomer = data;
          }
        });
    },
    //确认绑定
    confirmBind() {
      const { member_id } = this.Custome_info;
      const { id } = this.current_unit;
      this.$api
        .HttpPost("/StoreAdmin/Credit/confirmBind", {
          member_id,
          id
        })
        .then(v => {
          if (v.data.code == 200) {
            this.$message({
              message: "绑定成功",
              type: "success"
            });
            this.bindPost();
          } else {
            this.$message.error(v.data.msg);
          }
        });
      this.Custome_info = {};
    },
    // 解除绑定
    handleDelete(index, row) {
      const { bind_id } = row;
      this.$api.HttpPost("/StoreAdmin/Credit/delBind", { bind_id }).then(v => {
        if (v.data.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.bindPost();
        }
      });
    },
    // 还款按钮
    handlePayment() {
      this.title = "还款";
      this.danhao_number = this.danhao();
      let val = this.$refs.mytable.$refs.xTable.getCurrentRow();
      this.current_unit = val;
      if (!val) {
        this.$alert("请选择一项", "提示", {
          confirmButtonText: "确定"
        });
        return;
      }

      this.dialogPaymentVisible = true;
    },
    handleArrears() {
      this.title = "期初欠款";
      this.dialogqiankuangVisible = true;
    },
    cell_click_outer(row) {
      this.current_unit = row.row;
    },
    inner_search(val) {
      this.visible = val ? true : false;
      this.handlePageChangeMemberSelect({ search: val });
    },
    search_outer() {
      let { search_value, store_value } = this;
      this.handlePageChange({
        search: search_value,
        sid: parseInt(store_value)
      });
    },
    cell_click(scope) {
      this.Custome_info = scope.row;
      this.visible = false;
    },
    // 分页处理表数据
    resData(data) {
      this.tableData = data;
    },
    // 页面改变回调
    handlePageChange(data = {}) {
      this.$refs.mytable.findList(
        this.$api.yuming + "/StoreAdmin/Credit/getCreditUnitList",
        data
      );
    },
    resDataMemberSelect(data) {
      this.GetMemberSelectArr = data;
    },
    handlePageChangeMemberSelect(data = {}) {
      this.$refs.mytable_2.findList(
        this.$api.yuming + "/StoreAdmin/Credit/getMemberSelect",
        data
      );
    },
    closedialog() {
      this.visible = false;
      this.Custome_info = {};
      this.outerVisible = false;
      this.danhao_number = 0;
      this.paymentObj = {};
    },
    // 获取客户信息
    handleGetMemberSelect(val) {
      const { search, page, quantity } = val;
      const data = { search, page, quantity };
      this.$api.HttpPost("/StoreAdmin/Credit/getMemberSelect", data).then(v => {
        let res = v.data;
        if (res.code == 200) {
          let data = res.data;
          this.GetMemberSelectArr = data.data;
        }
      });
      this.visible = !this.visible;
    },
    getCurrentRow(row) {
      this.templateSelection = row;
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
