<template>
  <div id="setUp_mendianguanli">
    <!-- 操作功能 -->
    <div >
      <el-button  primary @click="isShowArchivesBtn = !isShowArchivesBtn">是否上传电子监控档案</el-button>
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
            <el-button
              size="mini"
              v-if="scope.row.health_status !=='已通过'"
              type="text"
              @click="registerBtn(scope)"
            >注册</el-button>
            <el-button size="mini" type="text" @click="approveBtn(scope)">审核</el-button>
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

      <!-- 是否上传档案弹框 -->
      <el-dialog
        title="是否上传电子监控档案"
        center
        :visible.sync="isShowArchivesBtn"
        width="30%"
        >
        <div >
            <el-radio-group v-model="isSetUp" style="display: flex;justify-content: center;">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
            </el-radio-group>
        </div>

        </el-dialog>
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

            <el-form-item label="维修企业地址" >
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
            <el-form-item
              label="维修企业邮箱"
              :rules="[
                     { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      {              type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]"
              prop="companyemail"
            >
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
  </div>
</template>

<script>
export default {
  name: "setUp_mendianguanli",
  components: {},
  data() {
    return {
        isSetUp: false,
      isShowArchivesBtn:false,
      id: "",
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
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
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
    };
  },
  methods: {
    approveBtn(scope) {
      this.$api
        .HttpPost("/storeadmin/financial/maolifenxi", { id: this.id })
        .then(v => {
          if (v.data.code == 200) {
            this.$message("操作成功");
            // this.dialogVisible = false
            this.findList();
          }
        })
        .catch(e => {
          this.$message.error("失败");
        });
    },
    changeProvince(v) {
      console.log(v);
    },
    showRegisterDialog() {
    //   this.form = {};

    //   this.$refs.form.resetFields();
    //   (this.provinceOption = ""),
    //     (this.cityOption = ""),
    //     (this.areaOption = "");
    },
    registerBtn(scope) {
      this.id = scope.row.id;
      this.dialogVisible = !this.dialogVisible;
      this.$api.HttpPost("/StoreAdmin/Group/getProvinceSelect").then(v => {
        let data = v.data.data;
        this.provinceSelect = data;
      });
    },
    registe() {
      const { form } = this;
      form.provinceOption = this.provinceOption;
      form.city = this.cityOption;
      form.area = this.areaOption;
      form.id = this.id;
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
      for (let key in form) {
        if (!form[key]) {
          this.$message.error("信息未填写完");
          return;
        }
      }
      this.$api
        .HttpPost("/StoreAdmin/Group/registerElectronicHealth", form)
        .then(v => {
          if (v.data.code == 200) {
            this.$message("操作成功");
            this.dialogVisible = false;
            this.findList();
          } else {
            this.$message.error("注册失败");
          }
        })
        .catch(e => {
          this.$message.error("注册失败");
        });
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
            let health_status = res.data[i].health_status;
            switch (health_status) {
              case 0:
                health_status = "未注册";
                break;
              case 1:
                health_status = "已申请";
                break;
              case 2:
                health_status = "已通过";
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
              health_status
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
