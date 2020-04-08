<template>
  <div id="one">
    <div class="pb-nav">
      <el-button size="mini" @click="modify(null, 1)">新增优惠券</el-button>
      <el-button size="mini" @click="delList()">作废列表</el-button>
      <el-input style="width: 20rem;" size="mini" placeholder="关键字搜索" v-model="key_name"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" v-model="state_name" clearable placeholder="状态" @change="state_change">
        <el-option v-for="value in state_select" :key="value.id" :label="value.state_name" :value="value.id"></el-option>
      </el-select>
      <el-select size="mini" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :check_box="check_box" :operation_="operation_" :operation_mod_name="operation_mod_name" :operation_del_name="operation_del_name" :operation_name="operation_name"
    @modify="modify" @del="del" @operat="operat" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>

    <Dialog title="微信发送优惠券" fullscreen @enter="enter" ref="dialog">
      <template>
        <el-row :gutter="10">
          <el-col :xs="10" :sm="8" :md="6" :lg="4">
            <div class="dialog-bg">
              <el-image style="position: relative; top: 4rem; width: 100%; height: 10rem;" :src="require('./../../../assets/img/bg.jpg')"></el-image>
              <h3 style="margin-top: 6rem;">{{formLabelAlign.coupons_name}}</h3>
              <p>￥ {{formLabelAlign.amount}}</p>
              <p>有效期: {{radio === "1" ? formLabelAlign.validity_day + "天" : new Date(s_time[0]).toLocaleDateString() + "至" + new Date(s_time[1]).toLocaleDateString()}}</p>
              <el-button type="danger">立即使用</el-button>
              <el-divider content-position="left">使用说明</el-divider>
              <p>{{formLabelAlign.instructions}}</p>
              <el-divider content-position="left">门店</el-divider>
            </div>
          </el-col>

          <el-col :xs="10" :sm="10" :md="10" :lg="10">
            <el-form size="mini" label-position="right" label-width="10rem" :v-model="formLabelAlign">
              <el-form-item label="优惠券名称">
                <el-input v-model="formLabelAlign.coupons_name"></el-input>
              </el-form-item>
              <el-form-item label="优惠券面值">
                <el-input v-model="formLabelAlign.amount"></el-input>
              </el-form-item>
              <el-form-item label="有效期">
                <div style="display: flex; align-items: center; flex-direction: row;">
                  <el-radio v-model="radio" label="1">领取后几天有效</el-radio>
                  <el-input v-model="formLabelAlign.validity_day"></el-input>
                </div>
                <div style="display: flex; align-items: center; flex-direction: row;">
                  <el-radio v-model="radio" label="2">领取后有效期限</el-radio>
                  <el-date-picker style="width: 100%;" v-model="s_time" size="mini" type="datetimerange" clearable :picker-options="s_pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="使用说明">
                <el-input v-model="formLabelAlign.instructions"></el-input>
              </el-form-item>
              <el-form-item label="自己可用数量">
                <el-input v-model="formLabelAlign.quantity"></el-input>
              </el-form-item>
              <el-form-item label="不能重复领取">
                <el-checkbox v-model="formLabelAlign.is_repeat" @change="show_sysm">(已领取用户不能重复领取)</el-checkbox>
              </el-form-item>
              <el-form-item label="到期提醒">
                <div style="display: flex; align-items: center; flex-direction: row;">
                  <el-radio v-model="radio_" label="1">到期前几天微信提醒客户</el-radio>
                  <el-input v-model="formLabelAlign.remind_days"></el-input>
                </div>
              </el-form-item>
              <el-form-item label="折上折">
                <el-checkbox v-model="formLabelAlign.is_discount" @change="show_sysm">(允许在打折后使用)</el-checkbox>
              </el-form-item>
              <el-form-item label="跨店使用">
                <el-checkbox v-model="formLabelAlign.is_mutistore" @change="show_sysm">(允许跨门店消费该券)</el-checkbox>
              </el-form-item>
              <el-form-item label="领取当天使用">
                <el-checkbox v-model="formLabelAlign.is_day" @change="show_sysm">(允许领取当天消费该券)</el-checkbox>
              </el-form-item>
              <el-form-item label="可使用周期">
                <el-checkbox-group v-model="formLabelAlign.period_day" @change="show_sysm">
                  <el-checkbox label="1" name="type">星期一</el-checkbox>
                  <el-checkbox label="2" name="type">星期二</el-checkbox>
                  <el-checkbox label="3" name="type">星期三</el-checkbox>
                  <el-checkbox label="4" name="type">星期四</el-checkbox>
                  <el-checkbox label="5" name="type">星期五</el-checkbox>
                  <el-checkbox label="6" name="type">星期六</el-checkbox>
                  <el-checkbox label="7" name="type">星期日</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="满额使用">
                <el-input v-model="formLabelAlign.use_amount" @input="show_sysm"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </template>
    </Dialog>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
import Dialog from "./../Dialog.vue"
export default{
	name: "one",
  components:{
    mytable,
    Dialog
  },
	data(){
		return{
      tableTitle: [
        {key: "coupons_name", title: "优惠券名称", min_width: "100"},
        {key: "validity", title: "有效期", min_width: "100"},
        {key: "quantity", title: "可使用数量", min_width: "100"},
        {key: "click_count", title: "查看次数", min_width: "100"},
        {key: "click_time", title: "查看时间", min_width: "100"},
        {key: "amount", title: "金额", min_width: "100"},
        {key: "create_time", title: "创建时间", min_width: "100"},
        {key: "name", title: "创建人", min_width: "100"},
        {key: "status", title: "状态", min_width: "100"},
        {key: "store_name", title: "创建门店", min_width: "100"}
      ],
      tableData: [],
      operation_: true,
      check_box: false,
      operation_mod_name: "编辑",
      operation_del_name: "作废",
      operation_name: "停用",
      //
      key_name: "",
      state_name: "",
      state_select: [
        {id: 0, state_name: "停用"},
        {id: 1, state_name: "启用"}
      ],
      store_name: "",
      add_type: 1,
      coupons_id: "",
      formLabelAlign: {
        coupons_name: "",
        amount: "",
        validity_day: "",
        instructions: "",
        quantity: "",
        is_repeat: "",
        remind_days: "",
        is_discount: "",
        is_mutistore: "",
        is_day: "",
        period_day: [],
        use_amount: ""
      },
      radio: "1",
      radio_: "1",
      s_time: ["", ""],
      s_pickerOptions: {
        shortcuts: [{text: '最近一周',onClick(picker){const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', [start, end]);}},
        {text: '最近一个月',onClick(picker) {const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);picker.$emit('pick', [start, end]);}},
        {text: '最近三个月',onClick(picker) {const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);picker.$emit('pick', [start, end]);}}]
      },
		}
	},
  props:{
    "store_select": {
      type: Array,
      default: ()=>{}
    }
  },
  methods:{
    delList(){

    },
    show_sysm(){
      this.formLabelAlign.instructions = "";
      let num = [];
      for(let i in this.formLabelAlign.period_day){
        switch(this.formLabelAlign.period_day[i]){
          case "1":{
            num[i] = "星期一,";
            break;
          }
          case "2":{
            num[i] = "星期二,";
            break;
          }
          case "3":{
            num[i] = "星期三,";
            break;
          }
          case "4":{
            num[i] = "星期四,";
            break;
          }
          case "5":{
            num[i] = "星期五,";
            break;
          }
          case "6":{
            num[i] = "星期六,";
            break;
          }
          case "7":{
            num[i] = "星期日,";
            break;
          }
        }
        this.formLabelAlign.instructions += num[i];
      }
      if(this.formLabelAlign.is_repeat){this.formLabelAlign.instructions += "不能重复领取, "}
      if(this.formLabelAlign.is_discount){this.formLabelAlign.instructions += "允许打折后使用, "}
      if(this.formLabelAlign.is_mutistore){this.formLabelAlign.instructions += "允许跨店使用, "}
      if(this.formLabelAlign.is_day){this.formLabelAlign.instructions += "允许当天使用, "}
      if(this.formLabelAlign.use_amount){this.formLabelAlign.instructions += "满" + this.formLabelAlign.use_amount + "可使用"}
    },
    search(){
      this.handlePageChange();
    },
    state_change(s){
      this.state_name = s;
    },
    store_change(s){
      this.store_name = s;
    },
    modify(row, add_type){
      this.add_type = add_type;
      this.coupons_id = "";
      this.formLabelAlign = {
        coupons_name: "",
        amount: "",
        validity_day: "",
        instructions: "",
        quantity: "",
        is_repeat: "",
        remind_days: "",
        is_discount: "",
        is_mutistore: "",
        is_day: "",
        period_day: [],
        use_amount: ""
      }
      if(this.add_type == 2){
        this.formLabelAlign = row.row;
        this.coupons_id = this.$refs.mytable.$refs.xTable.getRadioRow().coupons_id;
      }
      this.$refs.dialog.init();
    },
    del(row){
      console.log(row)
    },
    operat(row){
      console.log(row)
    },
    resData(data){
      this.tableData = data;
      for(let i in this.tableData){
        if(this.tableData[i].status == 0){
          this.tableData[i].status = "启用";
        }
        else if(this.tableData[i].status == 1){
          this.tableData[i].status = "停用";
        }
      }
    },
    handlePageChange(){
      let data = {search: this.key_name, sid: this.store_name, status: this.state_name};
      this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Coupons/getCouponsList", data);
    },
    enter(){
      let {formLabelAlign} = this;
      this.$api.HttpPost("/StoreAdmin/Coupons/addOrUpdateCoupons",
      {
       add_type: this.add_type,
       coupons_id: this.coupons_id,
       coupons_name: formLabelAlign.coupons_name,
       amount: formLabelAlign.amount,
       validity_type: this.radio,
       validity_day: formLabelAlign.validity_day,
       start_time: this.s_time[0],
       end_time: this.s_time[1],
       instructions: formLabelAlign.instructions,
       quantity: formLabelAlign.quantity,
       is_repeat: formLabelAlign.is_repeat,
       remind_days: formLabelAlign.remind_days,
       is_discount: formLabelAlign.is_discount,
       is_mutistore: formLabelAlign.is_mutistore,
       is_day: formLabelAlign.is_day,
       period_day: formLabelAlign.period_day,
       use_amount: formLabelAlign.use_amount
      })
      .then((data)=>{
        if(data.data.code === 200){
          this.$refs.dialog.cancel();
          this.handlePageChange();
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    }
  }
}
</script>

<style scoped>
.dialog-bg{
  position: relative;
  background: url("../../../assets/img/telbg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 700px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
