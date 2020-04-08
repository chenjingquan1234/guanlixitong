<template>
  <div id="one">
    <div class="box">
      <!-- title功能列表 -->
      <el-row type="flex">
        <el-input size="mini" style="width: 20rem;" v-model="customer_name" @input="kh_input">
          <label slot="prepend">客户搜索</label>
          <el-dropdown slot="append" trigger="click" @visible-change="kh_Search" ref="kh_ref">
            <label class="el-icon-arrow-down el-icon--right"></label>
            <el-dropdown-menu slot="dropdown"><mytable :tableTitle="kh_tableTitle" :tableData="kh_tableData" :check_box="check_box" :operation="operation"
            @resData="kh_resData" @handlePageChange="kh_handlePageChange" @cell_click="kh_cell_click" ref="kh_mytable"></mytable></el-dropdown-menu>
          </el-dropdown>
        </el-input>
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="kh_modify(1)">添加</el-button>
        <el-button size="mini" type="danger" @click="jiancabaogao()">检查报告</el-button>
        <el-button size="mini" @click="is_check()">{{is_checks}}</el-button>
        <el-button size="mini" @click="jianchehuatu()">检车画图</el-button>
        <el-button size="mini" @click="shigongdan()">施工单</el-button>
        <el-button size="mini" type="text" @click="kh_modify(2)">完善更多客户资料</el-button>
      </el-row>
      <!-- 基础信息 -->
      <el-divider content-position="left">详情内容</el-divider>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input size="mini" v-model="content.name" disabled><label slot="prepend">姓名&#12288&#12288</label></el-input>
          <el-input size="mini" v-model="content.card_no" disabled><label slot="prepend">卡号&#12288&#12288</label></el-input>
          <el-input size="mini" v-model="content.tel" disabled><label slot="prepend">手机&#12288&#12288</label></el-input>
          <el-input size="mini" v-model="content.card_balance" disabled><label slot="prepend">余额&#12288&#12288</label></el-input>
          <div style="color: orangered; line-height: 28px;">总共到店 {{content.come_times}} 次 , 最后一次: {{content.last_time_comes}}</div>
        </el-col>
        <el-col :span="6">
          <el-input size="mini" v-model="content.car" disabled><label slot="prepend">车牌&#12288&#12288</label></el-input>
          <el-input size="mini" v-model="content.vin" disabled><label slot="prepend">车架号&#12288</label></el-input>
          <el-input size="mini" v-model="content.car_name" disabled><label slot="prepend">品牌车系</label></el-input>
          <el-input size="mini" v-model="content.insurance_endtime" disabled><label slot="prepend">保险到期</label></el-input>
          <el-input size="mini" v-model="content.as_endtime" disabled><label slot="prepend">年检到期</label></el-input>
        </el-col>
        <el-col :span="6">
          <el-input size="mini" v-model="text_oil" placeholder="请填0-100"><label slot="prepend">油表&#12288&#12288&#12288&#160&#160&#160</label></el-input>
          <el-input size="mini" v-model="text_old_km"><label slot="prepend">上次里程/km</label></el-input>
          <el-input size="mini" v-model="text_new_km"><label slot="prepend">本次里程/km</label></el-input>
          <el-input size="mini" v-model="text_remark"><label slot="prepend">备注&#12288&#12288&#12288&#160&#160&#160</label></el-input>
        </el-col>
        <el-col :span="6">
          <el-date-picker size="mini" style="width: 100%;" v-model="text_old_time" type="datetime" placeholder="进厂时间" :picker-options="pickerOptions"></el-date-picker>
          <el-date-picker size="mini" style="width: 100%;" v-model="text_new_time" type="datetime" placeholder="预计完工" :picker-options="pickerOptions"></el-date-picker>
          <el-select size="mini" style="width: 100%;" v-model="service_name" clearable filterable placeholder="服务顾问" @change="service_change">
            <el-option v-for="value in service_select" :key="value.eid" :label="value.name" :value="value.eid"></el-option>
          </el-select>
          <el-select size="mini" style="width: 100%;" v-model="parts_name" clearable filterable placeholder="配件处理" @change="parts_change">
            <el-option v-for="value in parts_select" :key="value.parts_name" :label="value.parts_name" :value="value.parts_name"></el-option>
          </el-select>
          <el-select size="mini" style="width: 100%;" v-model="type_name" clearable filterable placeholder="维修类别" @change="type_change">
            <el-option v-for="value in type_select" :key="value.id" :label="value.category_name" :value="value.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <!-- 新增客户 -->
    <newCustomer :new_dialog.sync="new_dialog" :add_type="add_type" :new_id="new_id" :modify_data="modify_data"
    @cancel="kh_cancel" @determine="determine" ref="newCustomer"></newCustomer>
    <!-- 检查报告 -->
    <jiancabaogao :jcbg_dialog="jcbg_dialog" :jcbg_member_id="jcbg_member_id" :jcbg_type_select="jcbg_type_select" :jcbg_service_select="jcbg_service_select"
    :pickerOptions="pickerOptions" @jcbg_ancel="jcbg_ancel"></jiancabaogao>
    <!-- 项目列表 -->
    <vxe-table :data="ms_tableData" size="mini" align="center" border highlight-hover-row :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="checkbox" width="50"></vxe-table-column>
      <vxe-table-column title="操作" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click.native.prevent="ms_add(scope)">添加</el-button>
          <el-button size="mini" type="text" style="color: red;" @click.native.prevent="ms_del(scope)">删除</el-button>
        </template>
      </vxe-table-column>
      <vxe-table-column field="describe" title="描述" min-width="100" :edit-render="{name: 'input', autoselect: true}"></vxe-table-column>
      <vxe-table-column field="repair_type_id" title="类型" min-width="100" v-if="res_tree">
        <template slot-scope="scope">
          <el-select v-model="ms_tableData[scope.rowIndex].msLeiXing" size="mini" clearable @focus="ms_focus(scope)" @clear="ms_clear_type(scope)">
            <el-option :value="ms_tableData[scope.rowIndex].msLeiXing" :label="ms_tableData[scope.rowIndex].msLeiXing" class="tree-select">
              <el-tree :data="ms_leixing_select" :props="{children: 'children', label: 'repair_type_name'}" @node-click="ms_leixing_node"></el-tree>
            </el-option>
          </el-select>
        </template>
      </vxe-table-column>
      <vxe-table-column field="account_type_id" title="账类" min-width="100" v-if="res_tree">
        <template slot-scope="scope">
          <el-select v-model="ms_tableData[scope.rowIndex].msZhangLei" size="mini" clearable @focus="ms_focus(scope)" @clear="ms_clear_accounts(scope)">
            <el-option :value="ms_tableData[scope.rowIndex].msZhangLei" :label="ms_tableData[scope.rowIndex].msZhangLei" class="tree-select">
              <el-tree :data="ms_zhanglei_select" :props="{children: 'children', label: 'account_type_name'}" @node-click="ms_zhanglei_node"></el-tree>
            </el-option>
          </el-select>
        </template>
      </vxe-table-column>
      <vxe-table-column field="status_name" title="状态" min-width="100"></vxe-table-column>
    </vxe-table>
    <xiangmuliebiao :title="wxxm_title" :content="content" :tableData="wxxm_tableData" :my_tableTitle="wxxm_my_tableTitle"
    :construction_select="construction_select" :sales_select="sales_select" :type_tree_select="type_tree_select" :accounts_tree_select="accounts_tree_select"
    :url="wxxm_url" :cell_url="wxxm_cell_url" :xmlb_cell_url="wxxm_xmlb_cell_url" ref="wxxm" :math="math" @wxxm_zhanglei="wxxm_zhanglei"></xiangmuliebiao>

    <xiangmuliebiao :title="wxpj_title" :content="content" :tableData="wxpj_tableData" :my_tableTitle="wxpj_my_tableTitle"
    :construction_select="construction_select" :sales_select="sales_select" :type_tree_select="type_tree_select" :accounts_tree_select="accounts_tree_select"
    :url="wxpj_url" :cell_url="wxpj_cell_url" :xmlb_cell_url="wxpj_xmlb_cell_url" ref="wxpj" :math="math" @wxpj_zhanglei="wxpj_zhanglei"></xiangmuliebiao>

    <xiangmuliebiao :title="fjfy_title" :content="content" :tableData="fjfy_tableData" :my_tableTitle="fjfy_my_tableTitle"
    :construction_select="construction_select" :sales_select="sales_select" :type_tree_select="type_tree_select" :accounts_tree_select="accounts_tree_select"
    :url="fjfy_url" :cell_url="fjfy_cell_url" ref="fjfy" :math="math"></xiangmuliebiao>

    <xiangmuliebiao :title="ckxm_title" :content="content" :tableData="ckxm_tableData" :my_tableTitle="ckxm_my_tableTitle"
    :construction_select="construction_select" :sales_select="sales_select" :type_tree_select="type_tree_select" :accounts_tree_select="accounts_tree_select"
    :url="ckxm_url" :cell_url="ckxm_cell_url" :ckxm_membership_card_id="ckxm_membership_card_id" ref="ckxm" :math="math"></xiangmuliebiao>
    <!-- 底部功能 -->
    <el-row type="flex" style="margin-top: 10px;">
      <el-input size="mini" style="width: 20rem;" v-model="word_name" @input="gdh_input">
        <label slot="prepend">工单号</label>
        <el-dropdown slot="append" trigger="click" @visible-change="gdh_Search" ref="gdh_ref">
          <label class="el-icon-arrow-down el-icon--right"></label>
          <el-dropdown-menu slot="dropdown"><mytable :tableTitle="gdh_tableTitle" :tableData="gdh_tableData" :check_box="check_box" :operation="operation"
          @resData="gdh_resData" @handlePageChange="gdh_handlePageChange" @cell_click="gdh_cell_click" ref="gdh_mytable"></mytable></el-dropdown-menu>
        </el-dropdown>
      </el-input>
      <label style="line-height: 32px; color: blue; margin: 0 10px;">项目:{{allxm}}</label>
      <label style="line-height: 32px; color: blue; margin: 0 10px;">配件:{{allpj}}</label>
      <label style="line-height: 32px; color: blue; margin: 0 10px;">附加:{{allfj}}</label>
      <label style="line-height: 32px; color: blue; margin: 0 10px;">合计:{{all}}</label>
      <el-button v-if="!is_show_bottom" size="mini" type="success" @click="register_save()">登记保存</el-button>
      <section v-if="is_show_bottom" style="margin-left: 10px;">
        <el-button size="mini" type="success" @click="save()">保存</el-button>
        <el-button size="mini" type="danger" @click="settlement()">结算</el-button>
        <el-button size="mini" type="primary" @click="complete()">完成</el-button>
        <el-button size="mini" type="primary" @click="notification()">通知施工</el-button>
        <el-button size="mini" type="primary" @click="reenter()">重新进场</el-button>
        <el-button size="mini" type="primary" @click="pr(1)">领料</el-button>
        <el-button size="mini" type="primary" @click="pr(0)">退料</el-button>
      </section>
    </el-row>
    <!-- 结算弹出框 -->
    <el-dialog title="结算" :visible.sync="settlement_dialog">
      <el-row :gutter="10">
        <center style="color: blue;">数量: {{allid}} 应结: {{all}}</center>
        <el-col :span="12">
          <el-input size="mini" v-model="settlement_a" @change="settlement_change"><label slot="prepend">卡扣金额</label><label slot="append">余额{{settlement_aa}}</label></el-input>
          <el-input size="mini" type="password" v-model="settlement_b"><label slot="prepend">卡密码&#12288</label></el-input>
          <el-input size="mini" v-model="settlement_c" @change="settlement_change"><label slot="prepend">优惠金额</label></el-input>
          <el-input size="mini" v-model="settlement_yhq" disabled>
            <label slot="prepend">优惠券&#12288</label>
            <el-button size="mini" slot="append" type="success" plain @click="set_yhq()">选择优惠券</el-button>
          </el-input>
          <!-- <el-input size="mini" v-model="settlement_d" @change="settlement_change"><label slot="prepend">积分抵用</label></el-input> -->
          <el-input size="mini" v-model="settlement_e" disabled style="margin-top: 10px"><label slot="prepend">应收现金</label></el-input>
          <el-input size="mini" v-model="settlement_f" disabled><label slot="prepend">支付金额</label></el-input>
          <el-input size="mini" v-model="settlement_g" disabled><label slot="prepend">找零&#12288&#12288</label></el-input>
        </el-col>
        <el-col :span="12">
          <el-input size="mini" v-model="settlement_h" @change="settlement_change"><label slot="prepend">现金</label></el-input>
          <el-input size="mini" v-model="settlement_i" @change="settlement_change"><label slot="prepend">银联</label></el-input>
          <el-input size="mini" v-model="settlement_j" @change="settlement_change"><label slot="prepend">挂账</label></el-input>
          <el-input size="mini" v-model="settlement_k" @change="settlement_change" style="margin-top: 10px"><label slot="prepend">微信支付&#12288</label></el-input>
          <el-input size="mini" v-model="settlement_l" @change="settlement_change"><label slot="prepend">支付宝支付</label></el-input>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="settlement_dialog=false">取 消</el-button>
        <el-button type="primary" @click="settlement_enter()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 领料退料弹出框 -->
    <el-dialog :title="pr_key == 0?'退料':'领料'" :visible.sync="pr_dialog" width="30%">
      <el-row type="flex" justify="space-around">
        <el-select size="mini" v-model="pr_store_name" filterable placeholder="仓管人员" @change="pr_store_change">
          <el-option v-for="value in service_select" :key="value.eid" :label="value.name" :value="value.eid"></el-option>
        </el-select>
        <el-select size="mini" v-model="pr_order_name" filterable :placeholder="pr_key == 0?'退料人员':'领料人员'" @change="pr_order_change">
          <el-option v-for="value in service_select" :key="value.eid" :label="value.name" :value="value.eid"></el-option>
        </el-select>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pr_dialog=false">取 消</el-button>
        <el-button type="primary" @click="pr_enter()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 画图弹出框 -->
    <el-dialog :visible.sync="jcht_dialog"><img :src="jcht_img" alt="暂无图片" width="100%"></el-dialog>
    <!-- 未结算单弹出框 -->
    <el-dialog :visible.sync="wjs_dialog">
      <mytable :tableTitle="wjs_tableTitle" :tableData="wjs_tableData" @cell_click="gdh_cell_click"
      :height="400" :number="false" :check_box="false" :operation="false" :paging="false"></mytable>
    </el-dialog>
    <!-- 优惠券选择 -->
    <el-dialog :visible.sync="yhq_dialog" append-to-body>
      <el-input style="width: 25rem;" size="mini" v-model="yhq_key_name"></el-input>
      <el-button size="mini" type="primary" @clikc="yhq_search()">查询</el-button>
      <mytable :tableTitle="yhq_tableTitle" :tableData="yhq_tableData" @edit_closed="edit_closed" @resData="yhq_resData" @handlePageChange="yhq_handlePageChange"
      :height="400" :number="false" :operation="false" ref="yhq_mytable"></mytable>
      <div slot="footer" class="dialog-footer">
        <el-button @click="yhq_dialog=false">取 消</el-button>
        <el-button type="primary" @click="yhq_enter()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
import newCustomer from "./newCustomer.vue"
import jiancabaogao from "./jiancabaogao.vue"
import xiangmuliebiao from "./xiangmuliebiao.vue"
export default{
	name: "one",
  components:{
    mytable,
    newCustomer,
    jiancabaogao,
    xiangmuliebiao
  },
	data(){
		return{
      res_tree: false,
      is_show_bottom: false,
      is_checks: "不终检",
      is_checks_id: 0,
      url: [
        "/StoreAdmin/Order/getMemberSelect",//获取客户列表
        "/StoreAdmin/Order/getMemberInfo",//获取客户信息
        "/StoreAdmin/Customer/getCustomerUpdatePage",//修改客户信息
        "/StoreAdmin/Customer/customerEdit",//修改客户信息---确定按钮
        "/StoreAdmin/Common/getEmployeeSelect",//获取员工列表
        "/StoreAdmin/Order/getRepairCategorySelect",//获取维修列表
        "/StoreAdmin/Order/getRepairTypeSelect",//获取维修类型列表
        "/StoreAdmin/Order/getRepairAccountTypeSelect",//获取账类列表
        "/StoreAdmin/Repair/getRepairCheckTypeSelect",//检测报告---初始化类型
        "/StoreAdmin/Order/getOrderSelect",//获取工单号列表
        "/StoreAdmin/Order/getInfoByOrderId",//根据开单id获取用户信息
        "/StoreAdmin/Order/getDescribeByOrderId",//根据id获取描述
        "/StoreAdmin/Order/getServiceItemByOrderId",//根据id获取维修项目列表
        "/StoreAdmin/Order/getProductItemByOrderId",//根据id获取维修配件列表
        "/StoreAdmin/Order/getAdditionalItemByOrderId",//根据id获取附加项目列表
        "/StoreAdmin/Order/getCardServiceItemByOrderId",//根据id获取次卡项目列表
        "/StoreAdmin/Order/registerSaveOrder",//登记保存
        "/StoreAdmin/Order/saveOrder",//保存
        "/StoreAdmin/Order/complete",//完成
        "/StoreAdmin/Order/backInto",//重新进场
        "/StoreAdmin/Order/settlement",//结算
        "/StoreAdmin/Order/picking",//领料
        "/StoreAdmin/Order/rejectedMaterial",//退料
        "/storeadmin/order/getDefaultRepairType",//初始化类型
        "/storeadmin/order/getDefaultAccountType",//初始化账类
      ],
      //title功能列表
      customer_name: "",
      kh_tableTitle: [
        {key: "name", title: "客户姓名", min_width: "100"},
        {key: "car", title: "车牌号", min_width: "100"},
        {key: "tel", title: "手机号码", min_width: "100"},
        {key: "card_no", title: "会员号码", min_width: "100"},
        {key: "card_name", title: "卡类型", min_width: "100"},
        {key: "wechat_name", title: "微信昵称", min_width: "100"},
        {key: "is_focus_on", title: "是否关注", min_width: "100"},
        {key: "store_name", title: "门店", min_width: "100"}
      ],
      kh_tableData: [],
      check_box: false,
      operation: false,
      //基础信息
      content: {},
      text_oil: "",
      text_old_km: "",
      text_new_km: "",
      text_remark: "",
      text_old_time: "",
      text_new_time: "",
      pickerOptions: {
        // disabledDate(time){return time.getTime() > Date.now();},
        shortcuts: [{text: '今天',onClick(picker) {picker.$emit('pick', new Date());}},
        {text: '昨天',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24);picker.$emit('pick', date);}},
        {text: '一周前',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', date);}}]
      },
      service_name: "",
      service_select: [],
      parts_name: "",
      parts_select: [
        {parts_name: "回收"},
        {parts_name: "废弃"},
        {parts_name: "展示"},
        {parts_name: "客户带走"},
        {parts_name: "返回厂家"}
      ],
      type_name: "",
      type_select: [],
      //新增客户
      new_dialog: false,
      add_type: 1,
      new_id: "",
      modify_data: {},
      //检查报告
      jcbg_dialog: false,
      jcbg_member_id: "",
      jcbg_type_select: [],
      jcbg_service_select: [],
      //检车画图
      jcht_dialog: false,
      jcht_img: "",
      //项目列表
      construction_select: [],
      sales_select: [],
      type_tree_select: [],
      accounts_tree_select: [],
      //描述
      ms_tableData: [
        {describe: "",
        status: "",
        status_name: "",
        repair_type_id: "",
        account_type_id: "",
        xmlbLeiXing: "",
        xmlbZhangLei: "",
      }],
      ms_rowIndex: "",
      ms_leixing_select: [],
      ms_zhanglei_select: [],
      //维修项目
      wxxm_title: "维修项目",
      wxxm_tableData: [
        {item_name: "",
        item_id: "",
        number: "",
        quantity: "",
        price: "",
        init_price: 0,
        discount: "",
        amount: "",
        construction: [],
        sales: [],
        construction_staff: [],
        xmlbsales: [],
        repair_type_id: "",
        account_type_id: "",
        xmlbLeiXing: "",
        xmlbZhangLei: "",
        remark: "",
        status: 0,
        status_name: "未派工"}
      ],
      wxxm_my_tableTitle: [
        {key: "item_name", title: "维修项目", min_width: "100"},
        {key: "specification", title: "规格", min_width: "100"},
        {key: "work_hours", title: "工时数", min_width: "100"},
        {key: "price", title: "售价", min_width: "100"},
        {key: "number", title: "编码", min_width: "100"},
      ],
      wxxm_url: "/StoreAdmin/Order/getServiceItemSelect",
      wxxm_cell_url: "/StoreAdmin/Order/getServiceItemDiscount",
      wxxm_xmlb_cell_url: "/storeadmin/Order/getServiceItemClassifySelect",
      //维修配件
      wxpj_title: "维修配件",
      wxpj_tableData: [
        {item_name: "",
        item_id: "",
        number: "",
        quantity: "",
        price: "",
        init_price: 0,
        discount: "",
        amount: "",
        construction: [],
        sales: [],
        construction_staff: [],
        xmlbsales: [],
        repair_type_id: "",
        account_type_id: "",
        xmlbLeiXing: "",
        xmlbZhangLei: "",
        remark: "",
        status: 0,
        status_name: "未领料"},
      ],
      wxpj_my_tableTitle: [
        {key: "item_name", title: "商品名称", min_width: "100"},
        {key: "specification", title: "规格", min_width: "100"},
        {key: "inventory", title: "库存", min_width: "100"},
        {key: "price", title: "售价", min_width: "100"},
        {key: "store", title: "仓库", min_width: "100"},
        {key: "number", title: "编码", min_width: "100"},
      ],
      wxpj_url: "/StoreAdmin/Order/getProductItemSelect",
      wxpj_cell_url: "/StoreAdmin/Order/getProductItemDiscount",
      wxpj_xmlb_cell_url: "/storeadmin/Order/getProductClassifySelect",
      //附加费用
      fjfy_title: "附加费用",
      fjfy_tableData: [
        {item_name: "",
        item_id: "",
        number: "",
        quantity: "",
        price: "",
        init_price: 0,
        discount: "",
        amount: "",
        construction: [],
        sales: [],
        construction_staff: [],
        xmlbsales: [],
        repair_type_id: "",
        account_type_id: "",
        xmlbLeiXing: "",
        xmlbZhangLei: "",
        remark: "",
        status: 0,
        status_name: "未结算"},
      ],
      fjfy_my_tableTitle: [
        {key: "item_name", title: "商品名称", min_width: "100"},
        {key: "price", title: "售价", min_width: "100"},
      ],
      fjfy_url: "/StoreAdmin/Order/getAdditionalItemSelect",
      fjfy_cell_url: "",
      //次卡项目
      ckxm_title: "次卡项目",
      ckxm_tableData: [
        {item_name: "",
        item_id: "",
        number: "",
        quantity: "",
        price: "",
        init_price: 0,
        discount: "",
        amount: "",
        construction: [],
        sales: [],
        construction_staff: [],
        xmlbsales: [],
        repair_type_id: "",
        account_type_id: "",
        xmlbLeiXing: "",
        xmlbZhangLei: "",
        remark: "",
        status: 0,
        status_name: "未派工"}
      ],
      ckxm_my_tableTitle: [
        {key: "item_name", title: "次卡项目", min_width: "100"},
        {key: "times", title: "剩余次数", min_width: "100"},
      ],
      ckxm_url: "/StoreAdmin/Order/getCardServiceItemSelect",
      ckxm_cell_url: "",
      ckxm_membership_card_id: "",
      //底部功能
      word_name: "",
      gd_id: "",
      gdh_tableTitle: [
        {key: "order_sn", title: "单号", min_width: "200"},
        {key: "name", title: "姓名", min_width: "100"},
        {key: "car", title: "车牌", min_width: "100"},
        {key: "p_chexingmingcheng", title: "车系", min_width: "200"},
      ],
      gdh_tableData: [],
      //button
      allid: 0,
      all: 0,
      allxm: 0,
      allxm_id: 0,
      allpj: 0,
      allpj_id: 0,
      allfj: 0,
      allfj_id: 0,
      settlement_dialog: false,
      settlement_a: 0,
      settlement_aa: "",
      settlement_b: "",
      settlement_c: 0,
      settlement_yhq: 0,
      settlement_d: 0,
      settlement_e: 0,
      settlement_f: 0,
      settlement_g: 0,
      settlement_h: 0,
      settlement_i: 0,
      settlement_j: 0,
      settlement_k: 0,
      settlement_l: 0,
      coupons_id: [],
      //未结算单
      wjs_dialog: false,
      wjs_tableTitle: [
        {key: "order_sn", title: "单号", min_width: "100"},
        {key: "create_time", title: "创建时间", min_width: "100"},
      ],
      wjs_tableData: [],
      //优惠券
      yhq_dialog: false,
      yhq_tableTitle: [
        {key: "coupons_name", title: "优惠券名称", min_width: "100"},
        {key: "amount", title: "优惠券金额", min_width: "100"},
        {key: "quantity", title: "剩余数量", min_width: "100"},
        {key: "is_mutistore", title: "跨店使用", min_width: "100"},
        {key: "is_day", title: "领取当天使用", min_width: "100"},
        {key: "use_amount", title: "满减金额", min_width: "100"},
        {key: "use_quantity", title: "使用数量", min_width: "100", edit: {name: 'input', attrs: {type: 'number'}}}
      ],
      yhq_tableData: [],
      //领料退料
      pr_dialog: false,
      pr_key: 1,
      pr_store_name: "",
      pr_order_name: "",

      yhq_key_name: ""
		}
	},
  methods:{
    kh_Search(s){
      if(s){
        this.$nextTick(()=>{
          this.kh_handlePageChange();
        })
      }
    },
    kh_input(s){
      this.$refs.kh_ref.show();
      this.kh_Search(true);
    },
    gdh_Search(s){
      if(s){
        this.$nextTick(()=>{
          this.gdh_handlePageChange();
        })
      }
    },
    gdh_input(s){
      this.$refs.gdh_ref.show();
      this.gdh_Search(true);
    },
    wxxm_zhanglei(index , dis){
      let json = this.wxxm_tableData[index];
      json.discount = dis;
      json.amount = this.$api.mt_total(json.quantity, json.price, json.discount, json.amount);
    },
    wxpj_zhanglei(index , dis){
      let json = this.wxpj_tableData[index];
      json.discount = dis;
      json.amount = this.$api.mt_total(json.quantity, json.price, json.discount, json.amount);
    },
    kh_cell_click(row){
      this.$api.HttpPost(this.url[1], {id: row.row.member_id, membership_card_id: row.row.membership_card_id})
      .then((data)=>{
        this.content = data.data.data;
        this.content.car = this.content.plate_id + this.content.license_plate_number;
        this.customer_name = this.content.name;
        this.ckxm_membership_card_id = row.row.membership_card_id;
        this.history();
        this.$refs.kh_ref.hide();
      })
    },
    kh_resData(data){
      this.kh_tableData = data;
      for(let i in this.kh_tableData){
        this.kh_tableData[i].car = this.kh_tableData[i].plate_id + this.kh_tableData[i].license_plate_number;
      }
    },
    kh_handlePageChange(data){
      if(data === undefined){data = {search: this.customer_name}}
      this.$refs.kh_mytable.findList(this.$api.yuming + this.url[0], data);
    },
    service_change(s){
      this.service_name = s;
    },
    parts_change(s){
      this.parts_name = s;
    },
    type_change(s){
      this.type_name = s;
    },
    //新增客户
    kh_modify(s){
      this.add_type = s;
      if(this.add_type === 1){
        this.new_id = "";
        this.modify_data = {};
        this.$nextTick(()=>{this.$refs.newCustomer.init();})
      }
      else if(this.add_type === 2){
        if(this.content.member_id === undefined){return this.$message.warning("请选择客户")}
        this.new_id = this.content.member_id;
        this.$api.HttpPost(this.url[2], {id: this.content.member_id})
        .then((data)=>{
          if(data.data.code === 200){
            this.modify_data = data.data.data.detail;
            this.$nextTick(()=>{this.$refs.newCustomer.init();})
          }
          else{
            this.$message.error(data.data.msg);
          }
        })
      }
      this.new_dialog = true;
    },
    kh_cancel(){
      this.new_dialog = false;
    },
    determine(data){
      let customer_data = data;
      this.$api.HttpPost(this.url[3], customer_data)
      .then((data)=>{
        if(data.data.code === 200){
          this.new_dialog = false;
          this.$api.HttpPost(this.url[1], {id: data.data.data, membership_card_id: this.content.membership_card_id})
          .then((res)=>{
            if(res.data.code === 200){
              this.kh_handlePageChange();
              this.content = res.data.data;
              this.content.car = res.data.data.plate_id + res.data.data.license_plate_number;
              this.content.insurance_endtime = this.$api.date_conversion(this.content.insurance_endtime);
              this.content.as_endtime = this.$api.date_conversion(this.content.as_endtime);
              this.kh_tableData = res.data.data.item;
            }
            else{
              this.$message.error(data.data.msg);
            }
          })
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    //检查报告
    jiancabaogao(){
      if(this.content.member_id === undefined){return this.$message.warning("请选择客户")}
      this.jcbg_dialog = true;
      this.jcbg_member_id = this.content.member_id;
      this.$api.HttpPost(this.url[8], {})
      .then((data)=>{
        this.jcbg_service_select = this.service_select;
        this.jcbg_type_select = data.data.data;
      })
    },
    jcbg_ancel(){
      this.jcbg_dialog = false;
    },
    is_check(){
      if(this.is_checks === "终检"){
        this.is_checks = "不终检";
        this.is_checks_id = 0;
      }
      else{
        this.is_checks = "终检";
        this.is_checks_id = 1;
      }
    },
    jianchehuatu(){
      this.jcht_dialog = true;
      this.$api.HttpPost("/storeadmin/order/getCheckCarImg", {repair_order_id: this.gd_id})
      .then((data)=>{
        this.jcht_img = data.data.data.img;
      })
    },
    shigongdan(){
      this.$router.push({
        path: "/sgd1",
        query: {id: this.gd_id}//路由传参数
      })
    },
    //项目列表
    //描述
    ms_focus(s){
      this.ms_rowIndex = s.rowIndex;
    },
    ms_clear_type(s){
      this.ms_tableData[this.ms_rowIndex].repair_type_id = "";
    },
    ms_clear_accounts(s){
      this.ms_tableData[this.ms_rowIndex].account_type_id = "";
    },
    ms_leixing_node(s){
      this.ms_tableData[this.ms_rowIndex].msLeiXing = s.repair_type_name;
      this.ms_tableData[this.ms_rowIndex].repair_type_id = s.id;
    },
    ms_zhanglei_node(s){
      this.ms_tableData[this.ms_rowIndex].msZhangLei = s.account_type_name;
      this.ms_tableData[this.ms_rowIndex].account_type_id = s.id;
    },
    ms_add(row){
      this.ms_tableData.push({describe: "", status: "", status_name: "", repair_type_id: "", account_type_id: "", msLeiXing: "", msZhangLei: ""});
    },
    ms_del(row){
      if(this.ms_tableData.length === 1){this.$message.warning("已经剩下一个"); return}
      this.ms_tableData.splice(row.rowIndex, 1)
    },
    //底部功能
    gdh_cell_click(row){
      this.gd_id = row.row.id;
      this.$axios.all([
        this.$api.HttpPost(this.url[10], {repair_order_id: row.row.id}),
        this.$api.HttpPost(this.url[11], {repair_order_id: row.row.id}),
        this.$api.HttpPost(this.url[12], {repair_order_id: row.row.id}),
        this.$api.HttpPost(this.url[13], {repair_order_id: row.row.id}),
        this.$api.HttpPost(this.url[14], {repair_order_id: row.row.id}),
        this.$api.HttpPost(this.url[15], {repair_order_id: row.row.id})
      ])
      .then((data)=>{
        if(data[0].data.code === 200){
          this.word_name = row.row.order_sn;
          this.content = data[0].data.data;
          this.content.car = data[0].data.data.plate_id + data[0].data.data.license_plate_number;
          this.text_oil = data[0].data.data.oil_meter;
          this.text_old_km = data[0].data.data.last_mileage;
          this.text_new_km = data[0].data.data.mileage;
          this.text_remark = data[0].data.data.remark;
          this.text_old_time = data[0].data.data.in_factory_time;
          this.text_new_time = data[0].data.data.leave_factory_time;
          this.service_name = data[0].data.data.service_consultant;
          this.parts_name = data[0].data.data.accessories_processing;
          this.type_name = data[0].data.data.category_id;
          this.type_id = data[0].data.data.category_id;
          if(data[1].data.data.length === 0){
            this.ms_tableData = [{describe: "", status: "", status_name: "", repair_type_id: "", account_type_id: "", msLeiXing: "", msZhangLei: ""}];
          }
          else{
            this.ms_tableData = data[1].data.data;
          }
          if(data[2].data.data.length === 0){
            this.wxxm_tableData = [{item_name: "",item_id: "",number: "",quantity: "",price: "",init_price: 0,discount: "",amount: "",construction: [],sales: [],construction_staff: [],xmlbsales: [],repair_type_id: "",account_type_id: "",xmlbLeiXing: "",xmlbZhangLei: "",remark: "",status: 0,status_name: "未派工"}];
          }
          else{
            this.wxxm_tableData = data[2].data.data;
          }
          if(data[3].data.data.length === 0){
            this.wxpj_tableData = [{item_name: "",item_id: "",number: "",quantity: "",price: "",init_price: 0,discount: "",amount: "",construction: [],sales: [],construction_staff: [],xmlbsales: [],repair_type_id: "",account_type_id: "",xmlbLeiXing: "",xmlbZhangLei: "",remark: "",status: 0,status_name: "未领料"}];
          }
          else{
            this.wxpj_tableData = data[3].data.data;
          }
          if(data[4].data.data.length === 0){
            this.fjfy_tableData = [{item_name: "",item_id: "",number: "",quantity: "",price: "",init_price: 0,discount: "",amount: "",construction: [],sales: [],construction_staff: [],xmlbsales: [],repair_type_id: "",account_type_id: "",xmlbLeiXing: "",xmlbZhangLei: "",remark: "",status: 0,status_name: "未结算"}];
          }
          else{
            this.fjfy_tableData = data[4].data.data;
          }
          if(data[5].data.data.length === 0){
            this.ckxm_tableData = [{item_name: "",item_id: "",number: "",quantity: "",price: "",init_price: 0,discount: "",amount: "",construction: [],sales: [],construction_staff: [],xmlbsales: [],repair_type_id: "",account_type_id: "",xmlbLeiXing: "",xmlbZhangLei: "",remark: "",status: 0,status_name: "未派工"}];
          }
          else{
            this.ckxm_tableData = data[5].data.data;
          }
          this.math();
        }
        else{
          this.$message.error(data[0].data.msg);
        }
        this.wjs_dialog = false;
        this.is_show_bottom = true;
      })
    },
    gdh_resData(data){
      this.gdh_tableData = data;
      for(let i in this.gdh_tableData){
        this.gdh_tableData[i].car = this.gdh_tableData[i].plate_id + this.gdh_tableData[i].license_plate_number;
      }
    },
    gdh_handlePageChange(data){
      if(data === undefined){data = {}}
      this.$refs.gdh_mytable.findList(this.$api.yuming + this.url[9], data);
    },
    //button
    math(){
      this.allxm = 0;
      this.allpj = 0;
      this.allfj = 0;
      this.allxm_id = 0;
      this.allpj_id = 0;
      this.allfj_id = 0;
      for(let i in this.wxxm_tableData){
        this.allxm = this.allxm + Number(this.wxxm_tableData[i].amount);
        this.allxm_id = this.allxm_id + Number(this.wxxm_tableData[i].quantity);
      }
      for(let i in this.wxpj_tableData){
        this.allpj = this.allpj + Number(this.wxpj_tableData[i].amount);
        this.allpj_id = this.allpj_id + Number(this.wxpj_tableData[i].quantity);
      }
      for(let i in this.fjfy_tableData){
        this.allfj = this.allfj + Number(this.fjfy_tableData[i].amount);
        this.allfj_id = this.allfj_id + Number(this.fjfy_tableData[i].quantity);
      }
      this.all = this.allxm + this.allpj + this.allfj;
      this.allid = this.allxm_id + this.allpj_id + this.allfj_id;
    },
    register_save(){
      this.$api.HttpPost(this.url[16],
      {member_id: this.content.member_id,
      membership_card_id: this.content.membership_card_id,
      oil_meter: this.text_oil,
      in_factory_time: this.text_old_time,
      leave_factory_time: this.text_new_time,
      service_consultant: this.service_name,
      mileage: this.text_new_km,
      last_mileage: this.text_old_km,
      remark: this.text_remark,
      final_inspection: this.is_checks_id,
      accessories_processing: this.parts_name,
      category_id: this.type_name,
      describe_list: this.ms_tableData,
      service_item_list: this.wxxm_tableData,
      product_item_list: this.wxpj_tableData,
      additional_item_list: this.fjfy_tableData,
      card_service_item_list: this.ckxm_tableData})
      .then((data)=>{
        if(data.data.code === 200){
          this.is_show_bottom = true;
          this.gd_id = data.data.data;
          this.gdh_handlePageChange();
          this.gdh_cell_click({row: {id: this.gd_id}});//再次请求工单号接口--插眼记号
          this.$message.success(data.data.msg);
        }
        else{
          this.is_show_bottom = false;
          this.$message.error(data.data.msg);
        }
      })
      .catch((data)=>{})
    },
    save(is){
      return new Promise((resolve, reject)=>{
        this.$api.HttpPost(this.url[17],
        {id: this.gd_id,
        member_id: this.content.member_id,
        membership_card_id: this.content.membership_card_id,
        oil_meter: this.text_oil,
        in_factory_time: this.text_old_time,
        leave_factory_time: this.text_new_time,
        service_consultant: this.service_name,
        mileage: this.text_new_km,
        last_mileage: this.text_old_km,
        remark: this.text_remark,
        final_inspection: this.is_checks_id,
        accessories_processing: this.parts_name,
        category_id: this.type_name,
        describe_list: this.ms_tableData,
        service_item_list: this.wxxm_tableData,
        product_item_list: this.wxpj_tableData,
        additional_item_list: this.fjfy_tableData,
        card_service_item_list: this.ckxm_tableData})
        .then((data)=>{
          if(data.data.code === 200){
            this.is_show_bottom = true;
            if(is === undefined){
              this.gdh_cell_click({row: {id: this.gd_id}});//再次请求工单号接口--插眼记号
            }
            this.$message.success(data.data.msg);
            resolve(data)
          }
          else{
            this.is_show_bottom = false;
            this.$message.error(data.data.msg);
            reject(data)
          }
        })
        .catch((data)=>{})
      })
    },
    //结算
    settlement(){
      this.save();
      this.settlement_e = this.all;
      this.settlement_aa = this.content.card_balance;
      this.settlement_dialog = true;
    },
    settlement_change(){
      this.settlement_aa = this.content.card_balance;
      this.settlement_aa = Number(this.content.card_balance) - Number(this.settlement_a);
      this.settlement_f = Number(this.settlement_a) + Number(this.settlement_h) + Number(this.settlement_i) + Number(this.settlement_j) + Number(this.settlement_k) + Number(this.settlement_l) + Number(this.settlement_c) + Number(this.settlement_d);
      this.settlement_g = Number(this.settlement_e) - Number(this.settlement_f);
    },
    settlement_enter(){
      this.$api.HttpPost(this.url[20],
      {member_id: this.content.member_id,
      repair_order_id: this.gd_id,
      amount: this.all,
      cash: this.settlement_h,
      unionpay: this.settlement_i,
      credit: this.settlement_j,
      pay_card_id: this.content.membership_card_id,
      pay_card_no: this.content.card_no,
      pay_card: this.settlement_a,
      wechat_pay: this.settlement_k,
      integral_pay: this.settlement_d,
      alipay: this.settlement_l,
      change: this.settlement_g,
      preferential_amount: this.settlement_c,
      coupons_amount: this.settlement_yhq,
      coupons_id: this.coupons_id,})
      .then((data)=>{
        if(data.data.code === 200){
          this.settlement_dialog = false;
          this.$message.success(data.data.msg);
          this.$confirm('是否打印结算单', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          })
          .then(() => {
            this.$router.push({
              path: "/jsd",
              query: {id: this.gd_id}//路由传参数
            })
          })
          .catch(() => {

          });
          this.gdh_handlePageChange();
          this.$emit("res", "three");
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
      .catch((data)=>{})
    },
    complete(){
      this.save()
      .then((success)=>{
        this.$api.HttpPost(this.url[18], {id: this.gd_id})
        .then((data)=>{
          if(data.data.code === 200){
            this.gdh_cell_click({row: {id: this.gd_id}});//再次请求工单号接口--插眼记号
            this.$message.success(data.data.msg);
          }
          else{
            this.$message.error(data.data.msg);
          }
        })
        .catch((data)=>{})
      })
    },
    notification(){
      this.$confirm('是否发送施工通知', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
      .then(() => {
        this.$api.HttpPost("/storeadmin/order/shigong", {id: this.gd_id})
        .then((data)=>{
          if(data.data.code === 200){
            this.$message.success(data.data.msg);
          }
          else{
            this.$message.error(data.data.msg);
          }
        })
      })
      .catch(() => {

      });
    },
    reenter(){
      this.$api.HttpPost(this.url[19], {id: this.gd_id})
      .then((data)=>{
        if(data.data.code === 200){
          this.gdh_cell_clic({row: {id: this.gd_id}});//再次请求工单号接口--插眼记号
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
      .catch((data)=>{})
    },
    pr(s){
      this.pr_store_name = "";
      this.pr_order_name = "";
      if(this.$refs.wxpj.$refs.xiangmuliebiao.getSelectRecords().length === 0){
        if(s === 1){
          return this.$message.warning("请选择领料项目");
        }
        else if(s === 2){
          return this.$message.warning("请选择退料项目");
        }
      }
      this.save(s);
      this.pr_key = s;
      this.pr_dialog = true;
    },
    //领料-出料
    pr_store_change(s){
      this.pr_store_name = s;
    },
    pr_order_change(s){
      this.pr_order_name = s;
    },
    pr_enter(){
      var url = "";
      var id = [];
      var num = this.$refs.wxpj.$refs.xiangmuliebiao.getSelectRecords();
      for(let i in num){
        id.splice(0, 0, num[i].id);
      }
      if(this.pr_key === 0){url = this.url[22];}
      else if(this.pr_key === 1){url = this.url[21];}
      this.$api.HttpPost(url, {repair_order_id: this.gd_id, id: id, warehouse: this.pr_store_name, picking_people: this.pr_order_name})
      .then((data)=>{
        if(data.data.code === 200){
          this.gdh_cell_click({row: {id: this.gd_id}});//再次请求工单号接口--插眼记号
          this.$message.success(data.data.msg);
          this.pr_dialog = false;
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
      .catch((data)=>{})
    },
    history(){
      this.$api.HttpPost("/storeadmin/order/getMemberOrder", {id: this.content.member_id})
      .then((data)=>{
        if(data.data.code === 200){
          this.$confirm('该客户有未结算的单据,是否查看', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(()=>{
            this.wjs_dialog = true;
            this.wjs_tableData = data.data.data;
          })
          .catch(()=>{

          });
        }
      })
    },
    set_yhq(){
      this.yhq_dialog = true;
      this.$nextTick(()=>{
        this.yhq_handlePageChange();
      })
    },
    yhq_search(){
      this.yhq_handlePageChange();
    },
    yhq_enter(){
      let num = this.$refs.yhq_mytable.$refs.xTable.getSelectRecords();
      if(num.length == 0){
        return this.$message.warning("请选择优惠券");
      }
      this.settlement_yhq = 0;
      this.coupons_id = [];
      let is_discount = false;
      for(let i in num){
        this.coupons_id.splice(0, 0, num[i].id);
        this.settlement_yhq = Number(this.settlement_yhq) + Number(num[i].amount);
        if(num[i].is_discount == 0){
          is_discount = true;
        }
        else{
          is_discount = false;
        }
      }
      this.settlement_e = this.settlement_e - this.settlement_yhq;
      if(is_discount){
        this.$confirm('存在不可与会员卡折扣同时使用的抵用券,确认使用将不享受会员卡折扣?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(()=>{
          for(let i in this.wxxm_tableData){
            this.wxxm_tableData[i].discount = 10;
            this.wxxm_tableData[i].amount = this.wxxm_tableData[i].price;
          }
          for(let i in this.wxpj_tableData){
            this.wxpj_tableData[i].discount = 10;
            this.wxpj_tableData[i].amount = this.wxpj_tableData[i].price;
          }
          for(let i in this.fjfy_tableData){
            this.fjfy_tableData[i].discount = 10;
            this.fjfy_tableData[i].amount = this.fjfy_tableData[i].price;
          }
          for(let i in this.ckxm_tableData){
            this.ckxm_tableData[i].discount = 10;
            this.ckxm_tableData[i].amount = this.ckxm_tableData[i].price;
          }
          this.save();
        })
        .catch(()=>{

        })
      }
      this.yhq_dialog = false;
    },
    edit_closed(row){
       if(row.row.use_quantity > row.row.quantity){
         row.row.use_quantity = row.row.quantity;
       }
       if(row.row.use_quantity < 0 || row.row.use_quantity%1 != 0){
         row.row.use_quantity = 1;
       }
    },
    yhq_resData(data){
      this.yhq_tableData = data;
      for(let i in this.yhq_tableData){
        if(this.yhq_tableData[i].is_mutistore == 1){
          this.yhq_tableData[i].is_mutistore = "是";
        }
        else if(this.yhq_tableData[i].is_mutistore == 0){
          this.yhq_tableData[i].is_mutistore = "否";
        }
        if(this.yhq_tableData[i].is_day == 1){
          this.yhq_tableData[i].is_day = "是";
        }
        else if(this.yhq_tableData[i].is_day == 0){
          this.yhq_tableData[i].is_day = "否";
        }
      }
    },
    yhq_handlePageChange(){
      let data = {search: this.yhq_key_name, member_id: this.content.member_id};
      this.$refs.yhq_mytable.findList(this.$api.yuming + "/storeadmin/coupons/getCouponsByMemebrId", data);
    }
  },
  mounted(){
    this.$axios.all([
      this.$api.HttpPost(this.url[4], {}),
      this.$api.HttpPost(this.url[5], {}),
      this.$api.HttpPost(this.url[6], {}),
      this.$api.HttpPost(this.url[7], {}),
    ])
    .then((data)=>{
      this.service_select = data[0].data;
      this.type_select = data[1].data.data;
      this.ms_leixing_select = data[2].data.data;
      this.ms_zhanglei_select = data[3].data.data;
      this.construction_select= data[0].data;
      this.sales_select= data[0].data;
      this.type_tree_select = data[2].data.data;
      this.accounts_tree_select = data[3].data.data;
    })
    this.res_tree = true;
    // this.kh_handlePageChange();
    this.gdh_handlePageChange();
  }
}
</script>

<style scoped>
#one{
  /* margin: 1rem 5rem; */
  font-size: 12px;
}
.box{
  padding: 10px;
  margin: 10px;
  border: 1px solid #c0c0c0;
  border-radius: 4px;
}
.title-tree-select{
  width: 600px;
  height:200px;
  overflow: auto;
  background-color: #ffffff;
}
.el-select, .el-date-editor{
  margin-bottom: 4px;
}
</style>
