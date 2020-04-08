<template>
  <div id="two">
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="消费送积分设置" name="one">
      <div class="pb-nav">
        <el-button size="mini" icon="el-icon-setting" @click="set_all()">批量设置</el-button>
        <el-input size="mini" v-model="key_name" placeholder="可按卡类型,备注进行搜索" style="width: 25rem;"><label slot="prepend">关键字</label></el-input>
        <el-button size="mini" type="primary" @click="search()">查询</el-button>
      </div>
      <mytable :tableTitle="tableTitle" :tableData="tableData" :operation_del="operation_del" @resData="resData" @modify="set" @handlePageChange="handlePageChange" ref="mytable"></mytable>
    </el-tab-pane>
    <el-tab-pane label="积分兑换规则设置" name="two">
      <el-card shadow="hover">
        <center>每积分兑换价值</center>
        <el-input size="mini" v-model="setUp.exchange_worth"><label slot="prepend">兑换1元所需积分&#12288&#12288&#12288&#12288&#12288&#12288&#12288&#12288&#12288&#12288&#160</label></el-input>
        <center>每次消费最多抵扣积分</center>
        <el-input size="mini" v-model="setUp.deduction_percentage"><label slot="prepend">积分抵扣的金额不超过实收金额的比例%</label></el-input>
        <center>每次签到赠送积分</center>
        <el-input size="mini" v-model="setUp.sign_give"><label slot="prepend">微信签到一天赠送积分&#12288&#12288&#12288&#12288&#12288&#12288&#12288&#12288</label></el-input>
        <center >连续签到多天奖励</center>
        <el-input size="mini" v-model="setUp.sign_day"><label slot="prepend">连续签到(天)&#12288&#12288&#12288&#12288&#12288&#12288&#12288&#12288&#12288&#12288&#12288&#12288&#160</label></el-input>
        <el-input size="mini" v-model="setUp.sign_day_giving"><label slot="prepend">赠送数量&#12288&#12288&#12288&#12288&#12288&#12288&#12288&#12288&#12288&#12288&#12288&#12288&#12288&#12288</label></el-input>
        <el-button size="mini" type="primary" style="float: right;" @click="save()">保存</el-button>
      </el-card>
    </el-tab-pane>
  </el-tabs>

  <!-- 弹出框 -->
  <el-dialog title="积分兑换" :visible.sync="dialog" :close-on-click-modal="false">
    <el-input size="mini" v-model="dialog_a"><label slot="prepend">消费多少金额兑换1积分</label></el-input>
    <el-input size="mini" v-model="dialog_b"><label slot="prepend">备注</label></el-input>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog=false">取 消</el-button>
      <el-button type="primary" @click="enter()">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
  name: "two",
  components:{
	  mytable
  },
  data(){
    return{
      activeName: "one",
      key_name: "",
      //table 配置
      tableTitle: [
        {key: "card_name", title: "卡类型", min_width: "200"},
        {key: "integral_amount", title: "赠送1积分所需消费金额", min_width: "200"},
        {key: "update_time", title: "更新时间", min_width: "200"},
        {key: "remark", title: "备注", min_width: "200"}
      ],
      tableData: [],
      operation_del: false,
      dialog: false,
      //数据
      card_id: [],
      dialog_a: "",
      dialog_b: "",
      dialog1_a: "",
      dialog1_b: "积分",
      dialog1_c: "",
      setUp: {
        id: "",
        hid: "",
        sid: "",
        exchange_worth: "",
        deduction_percentage: "",
        sign_give: "",
        sign_day: "",
        sign_day_giving: "",
        create_time: "",
        update_time: ""
      }
    }
  },
  methods:{
    search: function(){
      this.handlePageChange({search: this.key_name});
    },
    set_all: function(){
      let data = this.$refs.mytable.$refs.xTable.getSelectRecords();
      if(data.length === 0){
        this.$message("请选择操作");
      }
      else{
        this.card_id = data.map((item)=>{return item["id"]});
        this.dialog = true;
      }
    },
    set: function(row){
      this.card_id[0] = row.row.id;
      this.dialog = true;
    },
    save: function(){
      this.$api.HttpPost("/StoreAdmin/Integral/integralRuleSetting",
      {exchange_worth: this.setUp.exchange_worth,
      deduction_percentage: this.setUp.deduction_percentage,
      sign_give: this.setUp.sign_give,
      sign_day: this.setUp.sign_day,
      sign_day_giving: this.setUp.sign_day_giving})
      .then((data)=>{
        if(data.data.code === 200){
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    enter: function(){
      this.$api.HttpPost("/StoreAdmin/Integral/settingIntegral",
      {id: this.card_id,
      integral_amount: this.dialog_a,
      remark: this.dialog_b})
      .then((data)=>{
        if(data.data.code === 200){
          this.dialog = false;
          this.handlePageChange({});
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    resData: function(data){
      this.tableData = data;
    },
    handlePageChange: function(data){
      if(data === undefined){data = {search: this.key_name}}
      this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Integral/cardIntegralSettingList", data);
    },
  },
  mounted(){
    this.handlePageChange({});
		this.$api.HttpPost("/StoreAdmin/Integral/getIntegralSettingDetail", {})
    .then((data)=>{
      if(data.data.code === 200){
        this.setUp = data.data.data;
      }
      else{
        this.$message.error(data.data.msg);
      }
    })
  }
}
</script>

<style scoped>
.el-tab-pane{
  margin: 1rem 5rem;
}
.el-card{
  margin: auto;
  width: 50%;
}
center{
  margin-top: 10px;
}
</style>
