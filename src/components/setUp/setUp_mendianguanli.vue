<template>
  <div id="setUp_mendianguanli">
    <!-- 操作功能 -->
    <div v-if="modify_key">
      <el-button icon="el-icon-plus" primary @click="addRow()">添加门店</el-button>
      <vxe-table
        :data="tableData"
        style="margin-top: 10px; width: 100%; box-shadow: 5px 5px 20px #dcdfe6"
        size="mini"
        align="center"
        :loading="loading"
        highlight-hover-row
        border
        :checkbox-config="{reserve: true}"
      >
        <vxe-table-column type="checkbox"></vxe-table-column>
        <vxe-table-column field="store" title="门店" width="300"></vxe-table-column>
        <vxe-table-column field="phone" title="电话" width="200"></vxe-table-column>
        <vxe-table-column field="address" title="地址" width="500"></vxe-table-column>
        <vxe-table-column field="health_status" title="状态" width="100"></vxe-table-column>
        <vxe-table-column field="wxshow" title="微信上显示" width="150"></vxe-table-column>
        <vxe-table-column field="default" title="是否维修默认门店" width="150"></vxe-table-column>
        <vxe-table-column field="important" title="是否总门店" width="150"></vxe-table-column>
        <vxe-table-column title="操作" width="150">
          <template slot-scope="scope">
            <!-- <el-button size="mini" v-if="scope.row.health_status !=='已通过'" type="text" @click="registerBtn(scope)">注册</el-button> -->
            <!-- <el-button size="mini" type="text" @click="approveBtn(scope)">审核</el-button> -->
            <el-button size="mini" type="text" @click="modifyRow(scope)">修改</el-button>
            <el-button size="mini" type="text" @click="delRow(scope.$index, tableData)">
              <span style="color:red">删除</span>
            </el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <!-- 分页器 -->
      <vxe-pager
        :loading="loading"
        :current-page="tablePage.currentPage"
        :page-size="tablePage.pageSize"
        :total="tablePage.totalResult"
        :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
        @page-change="handlePageChange"
      ></vxe-pager>
      <!-- 注册弹框 -->
      <el-dialog
        title="注册"
        center
        @close="showRegisterDialog"
        :visible.sync="dialogVisible"
        width="40%"
      >
        <div style="width:100%;padding:0 10px;height:400px;overflow:auto">
          <el-form
            label-position="left"
            size="mini"
            :rules="rules"
            ref="form"
            :model="form"
            label-width="200px"
          >
            <el-form-item label="维修企业名称" prop="companyname">
              <el-input v-model="form.companyname"></el-input>
            </el-form-item>
            <el-form-item label="维修企业密码" prop="companypassword">
              <el-input v-model="form.companypassword "></el-input>
            </el-form-item>
            <el-form-item label="维修企业道路运输许可证号" prop="companyroadtransportationlicense">
              <el-input v-model="form.companyroadtransportationlicense "></el-input>
            </el-form-item>
            <el-form-item label="维修企业统一社会信用代码" prop="companyunifiedsocialcreditidentifier">
              <el-input v-model="form.companyunifiedsocialcreditidentifier"></el-input>
            </el-form-item>

            <el-form-item label="维修企业地址" prop="companypassword">
              <el-select
                style="width:30%"
                v-model="provinceOption"
                value-key="id"
                placeholder="请选择省"
                @change="changeProvince"
              >
                <el-option
                  :label="item.areaName"
                  :value="item"
                  v-for="(item) in provinceSelect"
                  :key="item.id"
                ></el-option>
              </el-select>
              <el-select style="width:30%" v-model="cityOption" value-key="id" placeholder="请选择市">
                <el-option
                  :label="item.areaName"
                  :value="item"
                  v-for="(item) in citySelect"
                  :key="item.id"
                ></el-option>
              </el-select>
              <el-select
                style="width:30%"
                v-model="areaOption"
                value-key="areaCode"
                placeholder="请选择区"
              >
                <el-option
                  :label="item.areaName"
                  :value="item"
                  v-for="(item) in areaSelect"
                  :key="item.areaCode"
                ></el-option>
              </el-select>
              <el-input
                type="textarea"
                style="margin-top:7px"
                placeholder="详细地址"
                v-model="form.companyaddress"
              ></el-input>
            </el-form-item>

            <el-form-item label="维修企业邮政编码" prop="companypostalcode">
              <el-input v-model="form.companypostalcode "></el-input>
            </el-form-item>
            <el-form-item label="维修企业经济类型" prop="companyeconomiccategory">
              <el-select
                style="width:100%"
                v-model="form.companyeconomiccategory"
                placeholder="请选择"
              >
                <el-option
                  :label="item.labal"
                  :value="item.value"
                  v-for="(item, index) in economicTypeSelect"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="维修企业经营业务类别" prop="companycategory">
              <el-select style="width:100%" v-model="form.companycategory" placeholder="请选择">
                <el-option
                  :label="item.labal"
                  :value="item.value"
                  v-for="(item, index) in economicBusinessSelect"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="维修企业联系人名字" prop="companylinkmanname">
              <el-input v-model="form.companylinkmanname"></el-input>
            </el-form-item>
            <el-form-item label="维修企业联系人联系方式" prop="companylinkmantel">
              <el-input v-model="form.companylinkmantel"></el-input>
            </el-form-item>
            <el-form-item label="维修企业负责人名字" prop="companysuperintendentname">
              <el-input v-model="form.companysuperintendentname "></el-input>
            </el-form-item>
            <el-form-item label="维修企业负责人联系方式" prop="companysuperintendenttel">
              <el-input v-model="form.companysuperintendenttel"></el-input>
            </el-form-item>
            <el-form-item label="维修企业经营范围" prop="companybusinessscope">
              <el-input v-model="form.companybusinessscope "></el-input>
            </el-form-item>
            <el-form-item label="道路经营许可证开始日期" prop="roadtransportationlicensestartdate">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.roadtransportationlicensestartdate"
                style="width: 100%;"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="道路经营许可证结束日期" prop="roadtransportationlicenseenddate">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.roadtransportationlicenseenddate "
                style="width: 100%;"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="维修企业状态" prop="companyoperationstate">
              <el-select style="width:100%" v-model="form.companyoperationstate " placeholder="请选择">
                <el-option
                  :label="item.labal"
                  :value="item.value"
                  v-for="(item, index) in economicStatusSelect"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="维修企业邮箱" :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]" prop="companyemail">
              <el-input v-model="form.companyemail"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="registe">注 册</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 门店修改 -->
    <div v-else class="store">
      <el-row>
        <el-col :span="7">
          <label>店铺名称</label>
        </el-col>
        <el-col :span="17">
          <el-input size="mini" v-model="store_name"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <label>英文名称</label>
        </el-col>
        <el-col :span="17">
          <el-input size="mini" v-model="eng_name"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <label>电话</label>
        </el-col>
        <el-col :span="17">
          <el-input size="mini" v-model="store_tel"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <label>地址</label>
        </el-col>
        <el-col :span="17">
          <el-input size="mini" v-model="store_address"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <label>店铺LOGO</label>
        </el-col>
        <el-col :span="7">
          <el-input size="mini" v-model="logo" disabled></el-input>
        </el-col>
        <el-col :span="3">
          <el-upload
            :action="this.$store.state.domainName_http+'/StoreAdmin/Common/uploadImg'"
            :show-file-list="false"
            :before-upload="mdlogo_before_upload"
            :http-request="http_img"
          >
            <el-button size="mini" icon="el-icon-upload">上传</el-button>
          </el-upload>
        </el-col>
        <el-col :span="3">
          <el-button size="mini" icon="el-icon-view" @click="look_logo()">浏览</el-button>
        </el-col>
        <el-col :span="4">
          <el-image
            style="height: 100%; width: 100%;"
            :src="logo_img"
            alt="点击预览查看完整图片"
            :preview-src-list="[logo_img]"
          ></el-image>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <label>设置为微信默认门店</label>
        </el-col>
        <el-col :span="17" class="label">
          <el-switch v-model="value1" active-text="是" inactive-text="否"></el-switch>
          <span style="color: #c0c0c0;">(预设管理员可修改)</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <label>是否微信上显示门店</label>
        </el-col>
        <el-col :span="17" class="label">
          <el-switch v-model="value2" active-text="是" inactive-text="否"></el-switch>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <label>接收总店共享产品和服务</label>
        </el-col>
        <el-col :span="17" class="label">
          <el-switch v-model="value3" active-text="是" inactive-text="否"></el-switch>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <label>设置为总店</label>
        </el-col>
        <el-col :span="17" class="label">
          <el-switch v-model="value4" active-text="是" inactive-text="否"></el-switch>
          <span style="color: red;">(注意:总店一旦设置将无法再进行修改,请慎重选择)</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <label>定位地址</label>
        </el-col>
        <el-col :span="17" class="label">
          <el-input size="mini" v-model="map_address"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <label>坐标</label>
        </el-col>
        <el-col :span="8" class="label">
          <el-input size="mini" placeholder="经度" v-model="center.lng"></el-input>
        </el-col>
        <el-col :span="9" class="label">
          <el-input size="mini" placeholder="纬度" v-model="center.lat"></el-input>
        </el-col>
      </el-row>
      <!-- 地图 -->
      <baidu-map
        style="width: 100%; height: 400px;"
        :ak="ak"
        :scroll-wheel-zoom="true"
        :center="center"
        :zoom="zoom"
        @moving="syncCenterAndZoom"
        @moveend="syncCenterAndZoom"
        @zoomend="syncCenterAndZoom"
      >
        <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-navigation>
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :showAddressBar="true"
          :autoLocation="true"
        ></bm-geolocation>
        <bm-local-search :keyword="map_address" :auto-viewport="true"></bm-local-search>
      </baidu-map>
      <!-- 操作按钮 -->
      <center style="margin: 1rem;">
        <el-button size="mini" type="primary" :loading="saveLoading" @click="save()">保存</el-button>
        <el-button size="mini" @click="res()">返回</el-button>
      </center>
    </div>
  </div>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmLocalSearch from "vue-baidu-map/components/search/LocalSearch.vue";
import BmNavigation from "vue-baidu-map/components/controls/Navigation.vue";
import BmGeolocation from "vue-baidu-map/components/controls/Geolocation.vue";

export default {
  name: "setUp_mendianguanli",
  components: {
    BaiduMap,
    BmLocalSearch,
    BmNavigation,
    BmGeolocation
  },
  data() {
    return {
      id:"",
      form: {},
      rules: {
        companyname: [
          { required: true, message: "请输入维修企业名称", trigger: "blur" }
        ],
        companypassword: [
          { required: true, message: "请输入维修企业密码", trigger: "blur" }
        ],
        companyroadtransportationlicense: [
          {
            required: true,
            message: "请输入维修企业道路运输许可证号",
            trigger: "blur"
          }
        ],
        companyunifiedsocialcreditidentifier: [
          {
            required: true,
            message: "请输入维修企业统一社会信用代码",
            trigger: "blur"
          }
        ],
        companypostalcode: [
          { required: true, message: "请输入维修企业邮政编码", trigger: "blur" }
        ],
        companylinkmanname: [
          {
            required: true,
            message: "请输入维修企业联系人名字",
            trigger: "blur"
          }
        ],
        companylinkmantel: [
          {
            required: true,
            message: "请输入维修企业联系人联系方式",
            trigger: "blur"
          }
        ],
        companysuperintendentname: [
          {
            required: true,
            message: "请输入维修企业负责人名字",
            trigger: "blur"
          }
        ],
        companysuperintendenttel: [
          {
            required: true,
            message: "请输入维修企业负责人联系方式",
            trigger: "blur"
          }
        ],
        companybusinessscope: [
          { required: true, message: "请输入维修企业经营范围", trigger: "blur" }
        ],
        companyemail: [
          { required: true, message: "请输入维修企业邮箱", trigger: "blur" },
           { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        companyeconomiccategory: [
          { required: true, message: "请输入维修企业经济类型", trigger: "blur" }
        ],
        companycategory: [
          {
            required: true,
            message: "请输入维修企业经营业务类别",
            trigger: "blur"
          }
        ],
        roadtransportationlicensestartdate: [
          {
            required: true,
            message: "请输入道路经营许可证开始日期",
            trigger: "blur"
          }
        ],
        roadtransportationlicenseenddate: [
          {
            required: true,
            message: "请输入道路经营许可证结束日期",
            trigger: "blur"
          }
        ],
        companyoperationstate: [
          { required: true, message: "请输入维修企业状态", trigger: "blur" }
        ],
        companypassword: [
          { required: true, message: "请输入维修企业密码", trigger: "blur" }
        ],
        companyroadtransportationlicense: [
          {
            required: true,
            message: "请输入维修企业道路运输许可证号",
            trigger: "blur"
          }
        ],
        companyunifiedsocialcreditidentifier: [
          {
            required: true,
            message: "请输入维修企业统一社会信用代码",
            trigger: "blur"
          }
        ],
        companypostalcode: [
          { required: true, message: "请输入维修企业邮政编码", trigger: "blur" }
        ],
        companylinkmanname: [
          {
            required: true,
            message: "请输入维修企业联系人名字",
            trigger: "blur"
          }
        ],
        companylinkmantel: [
          {
            required: true,
            message: "请输入维修企业联系人联系方式",
            trigger: "blur"
          }
        ],
        companysuperintendentname: [
          {
            required: true,
            message: "请输入维修企业负责人名字",
            trigger: "blur"
          }
        ],
        companysuperintendenttel: [
          {
            required: true,
            message: "请输入维修企业负责人联系方式",
            trigger: "blur"
          }
        ],
        companybusinessscope: [
          { required: true, message: "请输入维修企业经营范围", trigger: "blur" }
        ],
        companyemail: [
          { required: true, message: "请输入维修企业邮箱", trigger: "blur" }
        ]
      },
      provinceOption: "",
      cityOption: "",
      areaOption: "",
      province: "",
      city: "",
      area: "",
      areaSelect: [],
      citySelect: [],
      provinceSelect: [],
      dialogVisible: false,
      economicTypeSelect: [
        { labal: "内资", value: 100 },
        { labal: "国有全资", value: 110 },
        { labal: "集体全资", value: 120 },
        { labal: "股份合作", value: 130 },
        { labal: "联营", value: 140 },
        { labal: "国有联营", value: 141 },
        { labal: "集体联营", value: 142 },
        { labal: "国有与集体联营", value: 143 },
        { labal: "其他联营", value: 149 },
        { labal: "有限责任(公司)", value: 150 },
        { labal: "其他有限责任(公司)", value: 159 },
        { labal: "股份有限(公司)", value: 160 },
        { labal: "私有", value: 170 },
        { labal: "私有独资", value: 171 },
        { labal: "私有合伙", value: 172 },
        { labal: "私营有限责任(公司)", value: 173 },
        { labal: "私营股份有限(公司)", value: 174 },
        { labal: "个体经营", value: 175 },
        { labal: "其他私有", value: 179 },
        { labal: "其他内资", value: 190 },
        { labal: "港、澳、台投资", value: 200 },
        { labal: "内地和港、澳或台合资", value: 210 },
        { labal: "内地和港、澳或台合作", value: 220 },
        { labal: "港、澳或台独资", value: 230 },
        { labal: "港、澳或台投资股份有限(公司)", value: 240 },
        { labal: "其他港澳台投资", value: 290 },
        { labal: "国外投资", value: 300 },
        { labal: "中外合资", value: 310 },
        { labal: "中外合作", value: 320 },
        { labal: "外资", value: 330 },
        { labal: "国外投资股份有限(公司)", value: 340 },
        { labal: "其他国外投资", value: 390 },
        { labal: "其他", value: 900 }
      ],
      economicBusinessSelect: [
        { labal: "一类维修经营业务", value: 1 },
        { labal: "二类维修经营业务", value: 2 },
        { labal: "三类维修经营业务", value: 3 }
      ],
      economicStatusSelect: [
        { labal: "营业", value: 1 },
        { labal: "停业", value: 2 },
        { labal: "整改", value: 3 },
        { labal: "停业整顿", value: 4 },
        { labal: "歇业", value: 5 },
        { labal: "注销", value: 6 },
        { labal: "其他", value: 7 }
      ],

      tableData: [],
      tablePage: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      store_name: "",
      store_id: "",
      eng_name: "",
      store_tel: "",
      store_address: "",
      logo: "",
      logo_img: "",
      //加载动画
      loading: false,
      saveLoading: false,
      //是否开关
      modify_key: true,
      value1: false,
      value2: false,
      value3: false,
      value4: false,
      img_key: false, //图片锁
      //地图
      ak: "VckhyKavBV8UB2jzyExnrLPHmzdQewVk",
      map_address: "",
      center: { lng: 113.32, lat: 23.02 },
      zoom: 15
    };
  },
  methods: {
    approveBtn(scope) {
       this.$api
        .HttpPost("/storeadmin/financial/maolifenxi", {id:this.id})
        .then(v => {
          if(v.data.code == 200) {
            this.$message("操作成功");
            // this.dialogVisible = false
            this.findList();
          }
        })
        .catch(e => {
           this.$message.error("失败");
        })
        ;
    },
    changeProvince(v) {
      console.log(v);
    },
    showRegisterDialog() {
      this.form = {};

      this.$refs.form.resetFields();
      (this.provinceOption = ""),
        (this.cityOption = ""),
        (this.areaOption = "");
    },
    registerBtn(scope) {
      this.id = scope.row.id
      this.dialogVisible = !this.dialogVisible;
      this.$api.HttpGet("/StoreAdmin/Group/getProvinceSelect").then(v => {
        let data = v.data.data;
        this.provinceSelect = data;
      });
    },
    registe() {
      const { form } = this;
      form.provinceOption = this.provinceOption;
      form.city = this.cityOption;
      form.area = this.areaOption;
      form.id = this.id
      console.log(form);
      const keys = [
        "companyname",
        "companypassword",
        "companyroadtransportationlicense",
        "companyunifiedsocialcreditidentifier",
        "province",
        "city",
        "area",
        "companyaddress",
        "companypostalcode",
        "companyeconomiccategory",
        "companycategory",
        "companylinkmanname",
        "companylinkmantel",
        "companysuperintendentname",
        "companysuperintendenttel",
        "companybusinessscope",
        "roadtransportationlicensestartdate",
        "roadtransportationlicenseenddate",
        "companyoperationstate",
        "companyadministrativedivisioncode",
        "companyemail"
      ];
      for(let key in form) {
        if(!form[key]) {
          this.$message.error("信息未填写完")
          return
        }
      }
      this.$api
        .HttpPost("/StoreAdmin/Group/registerElectronicHealth", form)
        .then(v => {
          if(v.data.code == 200) {
            this.$message("操作成功");
            this.dialogVisible = false
            this.findList();
          } else {
            this.$message.error("注册失败");
          }
        })
        .catch(e => {
           this.$message.error("注册失败");
        })
        ;
    },
    addRow: function() {
      this.$message("功能暂不对外开放，若想开设门店请联系电话：18816899799");
    },
    modifyRow: function(row) {
      this.modify_key = false;
      this.store_id = row.row.id;
      this.$axios
        .post(
          this.$store.state.domainName_http +
            "/StoreAdmin/Group/getGroupDetail",
          { id: row.row.id },
          { withCredentials: true }
        )
        .then(data => {
          let isdefault = this.TrueFalse(data.data.data.isdefault);
          let is_on_wechat = this.TrueFalse(data.data.data.is_on_wechat);
          let is_shared_services = this.TrueFalse(
            data.data.data.is_shared_services
          );
          let ishead = this.TrueFalse(data.data.data.ishead);
          this.store_name = data.data.data.store_name;
          this.eng_name = data.data.data.eng_name;
          this.store_tel = data.data.data.store_tel;
          this.store_address = data.data.data.store_address;
          this.logo = data.data.data.logo;
          this.value1 = isdefault;
          this.value2 = is_on_wechat;
          this.value3 = is_shared_services;
          this.value4 = ishead;
          this.map_address = data.data.data.map_address;
          this.center.lng = data.data.data.longitude;
          this.center.lat = data.data.data.latitude;
        })
        .catch(data => {
          this.$message("网络错误 请再次尝试!");
        });
    },
    delRow: function(index, del) {
      this.$message("功能暂不对外开放");
    },
    mdlogo_before_upload: function(file) {
      this.$api.img_before_upload(file);
    },
    http_img: function(file) {
      this.$api.img_upload(file).then(data => {
        this.logo = data.data;
        this.img_key = true;
      });
    },
    look_logo: function() {
      if (!this.img_key) {
        return;
      }
      this.$axios
        .post(
          this.$store.state.domainName_http + "/StoreAdmin/Common/getOssPath",
          { file: this.logo },
          { withCredentials: true }
        )
        .then(data => {
          this.logo_img = data.data + this.logo;
          this.img_key = false;
        });
    },
    save: function() {
      this.saveLoading = true;
      this.$axios
        .post(
          this.$store.state.domainName_http + "/StoreAdmin/Group/groupEdit",
          {
            add_type: 2,
            id: this.store_id,
            store_name: this.store_name,
            eng_name: this.eng_name,
            store_tel: this.store_tel,
            store_address: this.store_address,
            logo: this.logo,
            isdefault: this.value1,
            is_on_wechat: this.value2,
            is_shared_services: this.value3,
            ishead: this.value4,
            map_address: this.map_address,
            longitude: this.center.lng,
            latitude: this.center.lat
          },
          { withCredentials: true }
        )
        .then(data => {
          if (data.data.code === 200) {
            this.$message.success(data.data.msg);
          } else {
            this.$message.warning(data.data.msg);
          }
          this.saveLoading = false;
        })
        .catch(data => {
          this.saveLoading = false;
        });
    },
    res: function() {
      this.modify_key = true;
    },
    //地图经纬度选址
    syncCenterAndZoom: function(e) {
      const { lng, lat } = e.target.getCenter();
      this.center.lng = lng;
      this.center.lat = lat;
      this.zoom = e.target.getZoom();
    },
    //分页器
    findList: function() {
      this.loading = true;
      this.$axios
        .get(
          this.$store.state.domainName_http +
            "/StoreAdmin/Group/getGroupList?page=" +
            this.tablePage.currentPage +
            "&quantity=" +
            this.tablePage.pageSize,
          { withCredentials: true }
        )
        .then(data => {
          var res = data.data.data;
          this.tablePage.totalResult = res.total;
          for (var i = 0; i < res.data.length; i++) {
            let is_on_wechat = this.OneZero(res.data[i].is_on_wechat);
            let isdefault = this.OneZero(res.data[i].isdefault);
            let ishead = this.OneZero(res.data[i].ishead);
            let health_status = res.data[i].health_status 
            switch(health_status) {
              case 0: 
                health_status = "未注册"
                break;
              case 1: 
                health_status = "已申请"
                break;
              case 2: 
                health_status = "已通过"
                break;
            }
            this.tableData.unshift({
              id: res.data[i].id,
              store: res.data[i].store_name,
              phone: res.data[i].store_tel,
              address: res.data[i].store_address,
              wxshow: is_on_wechat,
              default: isdefault,
              important: ishead,
              health_status,
            });
          }
          this.loading = false;
        })
        .catch(data => {
          this.$message("网络加载数据失败 请尝试重新加载!");
          this.loading = false;
        });
    },
    handlePageChange: function({ currentPage, pageSize }) {
      this.tableData = [];
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.findList();
    },
    //10转换是否
    OneZero: function(key) {
      if (key == 1) {
        key = "是";
      } else {
        key = "否";
      }
      return key;
    },
    //10转换truefalse
    TrueFalse: function(key) {
      if (key == 1) {
        key = true;
      } else {
        key = false;
      }
      return key;
    }
  },
  created() {
    this.findList();
  },
  watch: {
    cityOption(val) {
      console.log(val);
      this.$api
        .HttpPost("/StoreAdmin/Group/getAreaSelect", { id: this.cityOption.id })
        .then(v => {
          let data = v.data.data;
          this.areaSelect = data;
          this.areaOption = "";
        });
    },
    provinceOption(val) {
      this.$api
        .HttpPost(`/StoreAdmin/Group/getCitySelect`, {
          id: this.provinceOption.id
        })
        .then(v => {
          let data = v.data.data;
          this.citySelect = data;
          this.cityOption = "";
          this.areaOption = "";
        });
    }
  }
};
</script>

<style scoped>
#setUp_mendianguanli {
  margin: 1rem 5rem;
}
label {
  display: inline-block;
  width: 250px;
  height: 30px;
  background: #f5f7fa;
  border: 1px solid #dcdef6;
  border-radius: 4px;
  text-align: center;
  line-height: 30px;
}
span {
  font-size: 0.5rem;
}
.label {
  height: 32px;
  background: #f5f7fa;
  border: 1px solid #dcdef6;
  border-radius: 4px;
}
.store {
  margin: auto;
  padding: 1rem;
  width: 850px;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  border: 1px solid #dcdef6;
}
.el-input {
  margin-bottom: 7px;
}
</style>
