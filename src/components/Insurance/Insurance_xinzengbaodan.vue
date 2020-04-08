<template>
  <div id="Insurance_xinzengbaodan">
    <el-row :gutter="10">
      <el-col :span="12"><label>客户信息</label>
        <el-input size="mini" v-model="customer_chepai"  @input="search">
          <label slot="prepend" style="color: red;">* </label>
          <label slot="prepend">车牌&#12288&#12288&#160</label>
          <el-dropdown slot="append" trigger="click" ref="dropdown">
            <label class="el-icon-arrow-down el-icon--right"></label>
            <el-dropdown-menu slot="dropdown"><mytable :tableTitle="tableTitle" :tableData="tableData" :check_box="check_box" :operation="operation" @resData="resData" @handlePageChange="handlePageChange" @cell_click="cell_click" ref="mytable"></mytable></el-dropdown-menu>
          </el-dropdown>
        </el-input>
       <el-select v-model="car_m" size="mini" clearable filterable style="width: 100%;" placeholder="品牌车型">
          <el-option :label="car_m" :value="car_m" class="tree-select">
            <el-tree node-key="id" :props="{children: 'children', label: 'name', isLeaf: 'leaf'}" :load="loadNode" lazy @node-click="node_click" ref="tree"></el-tree>
          </el-option>
        </el-select>
        <el-input v-model="customer_lxr" size="mini" clearable><label slot="prepend">联系人&#12288&#12288</label></el-input>
        <el-input v-model="customer_lxdh" size="mini" clearable><label slot="prepend">联系电话&#12288</label></el-input>
        <el-input v-model="customer_cj" size="mini" clearable><label slot="prepend">车价(万)&#12288&#160</label></el-input>
        <el-input v-model="customer_cjh" size="mini" clearable><label slot="prepend">车架号&#12288&#12288</label></el-input>
        <el-input v-model="customer_cpxh" size="mini" clearable><label slot="prepend">厂牌型号&#12288</label></el-input>
        <el-input v-model="customer_lxdz" size="mini" clearable><label slot="prepend">联系地址&#12288</label></el-input>
        <el-input v-model="customer_fdjxh" size="mini" clearable><label slot="prepend">发动机型号</label></el-input>
      </el-col>
      <el-col :span="12"><label>保单信息</label>
        <el-select v-model="insurance_name" size="mini" clearable filterable style="width: 100%;" placeholder="保险公司" @change="insurance_change">
          <template slot="prefix"><label style="color: red; line-height: 32px;">* </label></template>
          <el-option v-for="value in insurance_select" :key="value.insurance_id" :label="value.insurance_name" :value="value.insurance_id"></el-option>
        </el-select>
        <el-date-picker v-model="insurance_begin" size="mini" style="width: 100%;" type="date" placeholder="投保日期" align="right" :picker-options="pickerOptions"></el-date-picker>
        <el-date-picker v-model="insurance_end" size="mini" style="width: 100%;" type="date" placeholder="到期日期" align="right" :picker-options="pickerOptions"></el-date-picker>
        <el-input v-model="insurance_bdh" size="mini" clearable><label slot="prepend">保单号&#12288</label></el-input>
        <el-input v-model="insurance_ywly" size="mini" clearable><label slot="prepend">业务来源</label></el-input>
        <el-input v-model="insurance_ywy" size="mini" clearable><label slot="prepend">业务员&#12288</label></el-input>
        <el-input v-model="insurance_ywtc" size="mini" clearable><label slot="prepend">业务提成</label></el-input>
        <el-input v-model="insurance_tjr" size="mini" clearable><label slot="prepend">推荐人&#12288</label></el-input>
      </el-col>
    </el-row>
    <label>保险种类</label>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-input v-model="insurance_type_jqx" type="number" size="mini" clearable @input="insurance_math()"><label slot="prepend">交强险&#12288&#12288</label></el-input>
        <el-input v-model="insurance_type_jqxzk" type="number" size="mini" clearable @input="insurance_math()"><label slot="prepend">交强险折扣</label></el-input>
        <el-input v-model="insurance_type_ysjqx" type="number" size="mini" disabled><label slot="prepend">应收交强险</label></el-input>
        <el-input v-model="insurance_type_ccs" type="number" size="mini" clearable @input="insurance_math()"><label slot="prepend">车船税&#12288&#12288</label></el-input>
        <el-input v-model="insurance_type_ccszk" type="number" size="mini" clearable @input="insurance_math()"><label slot="prepend">车船税折扣</label></el-input>
        <el-input v-model="insurance_type_ysccs" type="number" size="mini" disabled><label slot="prepend">应收车船税</label></el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="insurance_type_syxhj" type="number" size="mini" disabled><label slot="prepend">商业险合计</label></el-input>
        <el-input v-model="insurance_type_syxzk" type="number" size="mini" clearable @input="insurance_math()"><label slot="prepend">商业险折扣</label></el-input>
        <el-input v-model="insurance_type_yssyx" type="number" size="mini" disabled><label slot="prepend">应收商业险</label></el-input>
        <el-input v-model="insurance_type_ysbxf" type="number" size="mini" disabled><label slot="prepend">应收保险费</label></el-input>
        <div style="margin-top: 3px;"><el-button style="width: 100%;" size="mini" type="primary" @click="save()">保存</el-button></div>
        <div style="margin-top: 3px;"><el-button style="width: 100%;" size="mini" type="danger" @click="settlement()">结算</el-button></div>
      </el-col>
      <el-col :span="6">
        <el-input v-model="insurance_type_csbxf" type="number" size="mini" clearable @input="insurance_type_math()"><label slot="prepend">车损保险费&#12288</label></el-input>
        <el-input v-model="insurance_type_tsssx" type="number" size="mini" clearable @input="insurance_type_math()"><label slot="prepend">停驶损失险&#12288</label></el-input>
        <el-input v-model="insurance_type_zrssx" type="number" size="mini" clearable @input="insurance_type_math()"><label slot="prepend">自燃损失险&#12288</label></el-input>
        <el-input v-model="insurance_type_zdwxcx" type="number" size="mini" clearable @input="insurance_type_math()"><label slot="prepend">指定修理厂险</label></el-input>
        <el-input v-model="insurance_type_bjmfbx" type="number" size="mini" clearable @input="insurance_type_math()"><label slot="prepend">不计免赔保费</label></el-input>
        <el-input v-model="insurance_type_dqxbx" type="number" size="mini" clearable @input="insurance_type_math()"><label slot="prepend">盗抢险保费&#12288</label></el-input>
        <el-input v-model="insurance_type_cshhx" type="number" size="mini" clearable @input="insurance_type_math()"><label slot="prepend">车身划痕险&#12288</label></el-input>
        <el-input v-model="insurance_type_blpsbx" type="number" size="mini" clearable @input="insurance_type_math()"><label slot="prepend">玻璃破碎保费</label></el-input>
        <el-input v-model="insurance_type_dsftyx" type="number" size="mini" clearable @input="insurance_type_math()"><label slot="prepend">第三方特约险</label></el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="insurance_type_sjzwzrx" type="number" size="mini" clearable @input="insurance_type_math()"><label slot="prepend">司机座位责任险&#12288</label></el-input>
        <el-input v-model="insurance_type_xzsbssx" type="number" size="mini" clearable @input="insurance_type_math()"><label slot="prepend">新增设备损失险&#12288</label></el-input>
        <el-input v-model="insurance_type_wgszrxbx" type="number" size="mini" clearable @input="insurance_type_math()"><label slot="prepend">无过失责任险保费</label></el-input>
        <el-input v-model="insurance_type_csryzrx" type="number" size="mini" clearable @input="insurance_type_math()"><label slot="prepend">车上人员责任险&#12288</label></el-input>
        <el-input v-model="insurance_type_dszzrbxf" type="number" size="mini" clearable @input="insurance_type_math()"><label slot="prepend">第三者责任保险费</label></el-input>
        <el-input v-model="insurance_type_cshwzrx" type="number" size="mini" clearable @input="insurance_type_math()"><label slot="prepend">车上货物责任险&#12288</label></el-input>
        <el-input v-model="insurance_type_fdjtbssx" type="number" size="mini" clearable @input="insurance_type_math()"><label slot="prepend">发动机特别损失险</label></el-input>
        <el-input v-model="insurance_type_ssxsssx" type="number" size="mini" clearable @input="insurance_type_math()"><label slot="prepend">涉水行驶损失险&#12288</label></el-input>
        <el-input v-model="insurance_type_bz" size="mini" clearable><label slot="prepend">备注&#12288&#12288&#12288&#12288&#12288&#12288</label></el-input>
      </el-col>
    </el-row>

    <el-dialog title="保单结算" :visible.sync="dialog">
      <el-row :gutter="10">
        <el-col :span="12">
          <center>应结:{{insurance_type_ysbxf}}</center>
          <el-input v-model="dialog_yhje" type="number" size="mini" clearable @input="dialog_math()"><label slot="prepend">优惠金额</label></el-input>
          <el-input v-model="dialog_khjf" type="number" size="mini" clearable @input="dialog_math()"><label slot="prepend">客户交费</label></el-input>
          <el-input v-model="dialog_yjsyje" type="number" size="mini" disabled><label slot="prepend">剩余金额</label></el-input>
        </el-col>
        <el-col :span="12">
          <center>付保险公司:{{insurance_type_ysbxf}}</center>
          <el-input v-model="dialog_yf" type="number" size="mini" clearable @input="dialog_math()"><label slot="prepend">已付&#12288&#12288</label></el-input>
          <el-input v-model="dialog_bxgz" type="number" size="mini" clearable @input="dialog_math()"><label slot="prepend">保险挂账</label></el-input>
          <el-input v-model="dialog_bxsyje" type="number" size="mini" disabled><label slot="prepend">剩余金额</label></el-input>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog=false">取 消</el-button>
        <el-button type="primary" @click="dialog_enter">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mytable from './../mytable.vue'
export default{
  name: "Insurance_xinzengbaodan",
  components:{
    mytable,
  },
  data(){
    return{
      pickerOptions: {
        // disabledDate(time){return time.getTime() > Date.now();},
        shortcuts: [{text: '今天',onClick(picker) {picker.$emit('pick', new Date());}},
        {text: '昨天',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24);picker.$emit('pick', date);}},
        {text: '一周前',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', date);}}]
      },
      tableTitle: [
        {key: "name", title: "客户姓名", min_width: "100"},
        {key: "car", title: "车牌号", min_width: "100"},
        {key: "tel", title: "手机号码", min_width: "100"},
        {key: "card_no", title: "会员卡号", min_width: "100"},
        {key: "card_name", title: "卡类型", min_width: "100"},
      ],
      tableData: [],
      check_box: false,
      operation: false,
      dialog: false,

      //数据
      member_id: "",
      customer_chepai: "",
      car_m: "",
      car_m_id: "",
      // car_m_select: [],
      car_m_select_: [],
      car_m_select__: [],
      customer_lxr: "",
      customer_lxdh: "",
      customer_cj: "",
      customer_cjh: "",
      customer_cpxh: "",
      customer_lxdz: "",
      customer_fdjxh: "",

      insurance_name: "",
      insurance_id: "",
      insurance_select: [],
      insurance_begin: new Date(),
      insurance_end: new Date(new Date().getTime() + 31536000000),
      insurance_bdh: "",
      insurance_ywly: "",
      insurance_ywy: "",
      insurance_ywtc: "",
      insurance_tjr: "",

      insurance_type_jqx: 0,
      insurance_type_jqxzk: 10,
      insurance_type_ysjqx: 0,
      insurance_type_ccs: 0,
      insurance_type_ccszk: 10,
      insurance_type_ysccs: 0,
      insurance_type_syxhj: 0,
      insurance_type_syxzk: 10,
      insurance_type_yssyx: 0,
      insurance_type_ysbxf: 0,
      insurance_type_csbxf: 0,
      insurance_type_tsssx: 0,
      insurance_type_zrssx: 0,
      insurance_type_zdwxcx: 0,
      insurance_type_bjmfbx: 0,
      insurance_type_dqxbx: 0,
      insurance_type_cshhx: 0,
      insurance_type_blpsbx: 0,
      insurance_type_dsftyx: 0,
      insurance_type_sjzwzrx: 0,
      insurance_type_xzsbssx: 0,
      insurance_type_wgszrxbx: 0,
      insurance_type_csryzrx: 0,
      insurance_type_dszzrbxf: 0,
      insurance_type_cshwzrx: 0,
      insurance_type_fdjtbssx: 0,
      insurance_type_ssxsssx: 0,
      insurance_type_bz: "",

      dialog_yhje: 0,
      dialog_khjf: 0,
      dialog_yjsyje: 0,
      dialog_yf: 0,
      dialog_bxgz: 0,
      dialog_bxsyje: 0,
    }
  },
  props:{
    "modify_data": {
      type: Object,
      default: ()=>{}
    }
  },
  methods:{
    insurance_change: function(s){
      this.insurance_id = s;
    },
    loadNode: function(node, resolve){
      node.childNodes = [];
      node.doCreateChildren(this.car_m_select);
      if(node.level === 0){
        return resolve(this.car_m_select);
      }
      if(node.level === 1){
        setTimeout(()=>{resolve(this.car_m_select_);}, 500);
      }
      if(node.level === 2){
        setTimeout(()=>{resolve(this.car_m_select__);}, 500);
      }
      if(node.level > 2){
        return resolve([]);
      }
    },
    node_click: function(row, column){
      this.car_m = row.name;
      if(row.level == 1){
        this.$api.HttpPost("/StoreAdmin/Customer/getCarSeriesList", {p_pinpai_id: row.p_pinpai_id})
        .then((data)=>{
          if(data.data.code == 200){
            this.car_m_select_ = data.data.data;
          }
          else{
            this.$message.error(data.data.msg);
          }
        })
      }
      else if(row.level == 2){
        this.$api.HttpPost("/StoreAdmin/Customer/getCarList", {p_chexi_id: row.p_chexi_id})
        .then((data)=>{
          if(data.data.code == 200){
            this.car_m_select__ = data.data.data;
            this.car_m_id = data.data.data.p_chexing_id;
          }
          else{
            this.$message.error(data.data.msg);
          }
        })
      }
    },
    insurance_math: function(){
      if(0>this.insurance_type_jqxzk || this.insurance_type_jqxzk>10){this.$message.warning("折扣请填写1-10"); this.insurance_type_jqxzk = 10}
      if(0>this.insurance_type_ccszk || this.insurance_type_ccszk>10){this.$message.warning("折扣请填写1-10"); this.insurance_type_ccszk = 10}
      if(0>this.insurance_type_syxzk || this.insurance_type_syxzk>10){this.$message.warning("折扣请填写1-10"); this.insurance_type_syxzk = 10}
      this.insurance_type_ysjqx = this.insurance_type_jqx * this.insurance_type_jqxzk * 0.1;
      this.insurance_type_ysccs = this.insurance_type_ccs * this.insurance_type_ccszk * 0.1;
      this.insurance_type_yssyx = this.insurance_type_syxhj * this.insurance_type_syxzk * 0.1;
      this.insurance_type_ysbxf = this.insurance_type_ysjqx + this.insurance_type_ysccs + this.insurance_type_yssyx;
    },
    insurance_type_math: function(){
      this.insurance_type_syxhj = this.insurance_type_csbxf*1 + this.insurance_type_tsssx*1 + this.insurance_type_zrssx*1 + this.insurance_type_zdwxcx*1 + this.insurance_type_bjmfbx*1
      + this.insurance_type_dqxbx*1 + this.insurance_type_cshhx*1 + this.insurance_type_blpsbx*1 + this.insurance_type_dsftyx*1 + this.insurance_type_sjzwzrx*1 + this.insurance_type_xzsbssx*1
      + this.insurance_type_wgszrxbx*1 + this.insurance_type_csryzrx*1 + this.insurance_type_dszzrbxf*1 + this.insurance_type_cshwzrx*1 + this.insurance_type_fdjtbssx*1 + this.insurance_type_ssxsssx*1;
    },
    dialog_math: function(){
      this.dialog_yjsyje = this.dialog_khjf - this.dialog_yhje;
      this.dialog_bxsyje = this.insurance_type_ysbxf - this.dialog_yf - this.dialog_bxgz;
    },
    dialog_enter: function(){
      this.$api.HttpPost("/StoreAdmin/Insurance/settleInsuranceOrder",
      {member_id: this.member_id,
      insurance_id: this.insurance_id,
      insured_date: this.insurance_begin,
      end_date: this.insurance_end,
      order_number: this.insurance_bdh,
      resource: this.insurance_ywly,
      referrer: this.insurance_tjr,
      salesman: this.insurance_ywy,
      commission: this.insurance_ywtc,
      compulsory: this.insurance_type_jqx,
      compulsory_discount: this.insurance_type_jqxzk,
      compulsory_due: this.insurance_type_ysjqx,
      vvtax: this.insurance_type_ccs,
      vvtax_discount: this.insurance_type_ccszk,
      vvtax_due: this.insurance_type_ysccs,
      csbxf: this.insurance_type_csbxf,
      tsssf: this.insurance_type_tsssx,
      zrssx: this.insurance_type_zrssx,
      csryzrx: this.insurance_type_csryzrx,
      dszzrbxf: this.insurance_type_dszzrbxf,
      dqxbf: this.insurance_type_dqxbx,
      cshhx: this.insurance_type_cshhx,
      blpsbf: this.insurance_type_blpsbx,
      szsbssx: this.insurance_type_wgszrxbx,
      sgszrxbf: this.insurance_type_bjmfbx,
      bjmpbf: this.insurance_type_cshwzrx,
      cshwzrx: this.insurance_type_xzsbssx,
      fdjtbssx: this.insurance_type_fdjtbssx,
      ssxsssx: this.insurance_type_ssxsssx,
      sjzwzrx: this.insurance_type_sjzwzrx,
      zdxlcx: this.insurance_type_zdwxcx,
      dsftyx: this.insurance_type_dsftyx,
      commercial: this.insurance_type_syxhj,
      commercial_discount: this.insurance_type_syxzk,
      commercial_due: this.insurance_type_yssyx,
      total_price: this.insurance_type_ysbxf,
      remark: this.insurance_type_bz,
      discount_amount: this.dialog_yhje,
      paid_amount: this.dialog_khjf,
      remaining_amount: this.dialog_yjsyje,
      paid_insurance: this.dialog_yf,
      unpaid_insurance: this.dialog_bxgz,
      remaining_insurance: this.dialog_bxsyje})
      .then((data)=>{
        if(data.data.code == 200){
          this.$message.success(data.data.msg);
          this.$emit("res_dialog", false);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    save: function(){
      this.$api.HttpPost("/StoreAdmin/Insurance/saveInsuranceOrder",
      {member_id: this.member_id,
      insurance_id: this.insurance_id,
      insured_date: this.insurance_begin,
      end_date: this.insurance_end,
      order_number: this.insurance_bdh,
      resource: this.insurance_ywly,
      referrer: this.insurance_tjr,
      salesman: this.insurance_ywy,
      commission: this.insurance_ywtc,
      compulsory: this.insurance_type_jqx,
      compulsory_discount: this.insurance_type_jqxzk,
      compulsory_due: this.insurance_type_ysjqx,
      vvtax: this.insurance_type_ccs,
      vvtax_discount: this.insurance_type_ccszk,
      vvtax_due: this.insurance_type_ysccs,
      csbxf: this.insurance_type_csbxf,
      tsssf: this.insurance_type_tsssx,
      zrssx: this.insurance_type_zrssx,
      csryzrx: this.insurance_type_csryzrx,
      dszzrbxf: this.insurance_type_dszzrbxf,
      dqxbf: this.insurance_type_dqxbx,
      cshhx: this.insurance_type_cshhx,
      blpsbf: this.insurance_type_blpsbx,
      szsbssx: this.insurance_type_wgszrxbx,
      sgszrxbf: this.insurance_type_bjmfbx,
      bjmpbf: this.insurance_type_cshwzrx,
      cshwzrx: this.insurance_type_xzsbssx,
      fdjtbssx: this.insurance_type_fdjtbssx,
      ssxsssx: this.insurance_type_ssxsssx,
      sjzwzrx: this.insurance_type_sjzwzrx,
      zdxlcx: this.insurance_type_zdwxcx,
      dsftyx: this.insurance_type_dsftyx,
      commercial: this.insurance_type_syxhj,
      commercial_discount: this.insurance_type_syxzk,
      commercial_due: this.insurance_type_yssyx,
      total_price: this.insurance_type_ysbxf,
      remark: this.insurance_type_bz})
      .then((data)=>{
        if(data.data.code == 200){
          this.$message.success(data.data.msg);
          this.$emit("res_dialog", false);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    settlement: function(){
      this.dialog = true;
      this.dialog_khjf = this.insurance_type_ysbxf;
      this.dialog_yf = this.insurance_type_ysbxf;
    },
    cell_click: function(row, column){
      this.member_id = row.row.member_id;
      this.customer_chepai = row.row.car;
      this.customer_lxr = row.row.name;
      this.customer_lxdh = row.row.tel;
      this.car_m = row.row.p_chexingmingcheng;
      this.customer_fdjxh = row.row.engine_type;
      this.customer_cj = row.row.car_price;
      this.customer_cjh = row.row.vin;
      this.customer_cpxh = row.row.announcement;
      this.customer_lxdz = row.row.address;
    },
    resData: function(data){
      this.tableData = data;
      for(let i in this.tableData){
        this.tableData[i].car = this.tableData[i].plate_id + this.tableData[i].license_plate_number;
      }
    },
    search() {
      this.$refs.dropdown.show()
      this.handlePageChange({search: this.customer_chepai})
    },
    handlePageChange: function(data){
      if(data === undefined){data = {}}
      this.$refs.mytable.findList(this.$store.state.domainName_http+"/StoreAdmin/Insurance/getCustomerSearchSelect", data);
    }
  },
  created(){
    if(this.modify_data !== undefined){
      this.member_id = this.modify_data.member_id
      this.insurance_id = this.modify_data.insurance_id
      this.customer_chepai = this.modify_data.plate_id + this.modify_data.license_plate_number
      this.car_m = this.modify_data.p_chexingmingcheng
      this.customer_lxr = this.modify_data.name
      this.customer_lxdh = this.modify_data.tel
      this.customer_cj = this.modify_data.car_price
      this.customer_cjh = this.modify_data.vin
      this.customer_cpxh = this.modify_data.announcement
      this.customer_lxdz = this.modify_data.address
      this.customer_fdjxh = this.modify_data.engine_type
      this.insurance_name = this.modify_data.insurance_name
      this.insurance_begin = this.modify_data.insured_date
      this.insurance_end = this.modify_data.end_date
      this.insurance_bdh = this.modify_data.order_number
      this.insurance_ywly = this.modify_data.resource
      this.insurance_tjr = this.modify_data.referrer
      this.insurance_ywy = this.modify_data.salesman
      this.insurance_ywtc = this.modify_data.commission
      this.insurance_type_jqx = this.modify_data.compulsory
      this.insurance_type_jqxzk = this.modify_data.compulsory_discount
      this.insurance_type_ysjqx = this.modify_data.compulsory_due
      this.insurance_type_ccs = this.modify_data.vvtax
      this.insurance_type_ccszk = this.modify_data.vvtax_discount
      this.insurance_type_ysccs = this.modify_data.vvtax_due
      this.insurance_type_csbxf = this.modify_data.csbxf
      this.insurance_type_tsssx = this.modify_data.tsssf
      this.insurance_type_zrssx = this.modify_data.zrssx
      this.insurance_type_csryzrx = this.modify_data.csryzrx
      this.insurance_type_dszzrbxf = this.modify_data.dszzrbxf
      this.insurance_type_dqxbx = this.modify_data.dqxbf
      this.insurance_type_cshhx = this.modify_data.cshhx
      this.insurance_type_blpsbx = this.modify_data.blpsbf
      this.insurance_type_wgszrxbx = this.modify_data.szsbssx
      this.insurance_type_bjmfbx = this.modify_data.sgszrxbf
      this.insurance_type_cshwzrx = this.modify_data.bjmpbf
      this.insurance_type_xzsbssx = this.modify_data.cshwzrx
      this.insurance_type_fdjtbssx = this.modify_data.fdjtbssx
      this.insurance_type_ssxsssx = this.modify_data.ssxsssx
      this.insurance_type_sjzwzrx = this.modify_data.sjzwzrx
      this.insurance_type_zdwxcx = this.modify_data.zdxlcx
      this.insurance_type_dsftyx = this.modify_data.dsftyx
      this.insurance_type_syxhj = this.modify_data.commercial
      this.insurance_type_syxzk = this.modify_data.commercial_discount
      this.insurance_type_yssyx = this.modify_data.commercial_due
      this.insurance_type_ysbxf = this.modify_data.total_price
      this.insurance_type_bz = this.modify_data.remark
    }
  },
  mounted(){
    this.$axios.all([
      this.$api.HttpPost("/StoreAdmin/Insurance/getCompanySelect", {}),
      this.$api.HttpPost("/StoreAdmin/Customer/getCarBrandList", {car_name: this.car_m})
    ])
    .then((data)=>{
      if(data[0].data.code === 200){
        this.insurance_select = data[0].data.data;
        this.car_m_select = data[1].data.data;
      }
      else{
        this.$message.error(data.data.msg);
      }
    })
    this.handlePageChange();
  }
}
</script>

<style scoped>
#Insurance_xinzengbaodan{
  margin: 1rem 5rem;
}
.tree-select{
  height:200px;
  overflow: auto;
  background-color: #ffffff;
}
/deep/.el-select, .el-date-editor{
  margin-top: 3px;
}
</style>
