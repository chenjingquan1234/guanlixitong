<template>
  <div id="newCustomer">
    <el-dialog
      :title="add_type===1?'新增客户资料':'修改客户资料'"
      :visible.sync="new_dialog"
      :close-on-click-modal="false"
      @close="cancel()"
    >
      <el-row>
        <label style="line-height: 32px;">客户信息</label>
        <!-- <el-button size="mini" type="success" plain style="float: right;">新增字段</el-button> -->
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-input v-model="customer_a" size="mini" clearable>
            <label style="color: red;" slot="prepend">*</label>
            <label slot="prepend">姓名</label>
          </el-input>
          <el-input v-model="customer_b" size="mini" clearable>
            <label style="color: red;" slot="prepend">*</label>
            <label slot="prepend">手机</label>
          </el-input>
          <el-input v-model="customer_c" size="mini" clearable>
            <label slot="prepend">地址&#8201&#8201&#160</label>
          </el-input>
          <el-input v-model="customer_d" size="mini" clearable>
            <label slot="prepend">单位&#8201&#8201&#160</label>
          </el-input>
          <el-input v-model="customer_e" size="mini" clearable>
            <label slot="prepend">备注&#8201&#8201&#160</label>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-row type="flex">
            <el-select
              v-model="customer_f"
              size="mini"
              clearable
              filterable
              style="width: 100%;"
              placeholder="客户来源"
              @change="customer_f_change"
            >
              <el-option
                v-for="value in tableData_customer"
                :key="value.id"
                :label="value.source_name"
                :value="value.id"
              ></el-option>
            </el-select>
            <el-button size="mini" type="success" plain @click="f_add_source()">添加来源</el-button>
          </el-row>
          <el-row type="flex">
            <el-select
              v-model="customer_g"
              size="mini"
              clearable
              filterable
              style="width: 100%;"
              placeholder="客户类型"
              @change="customer_g_change"
            >
              <el-option
                v-for="value in tableData_car"
                :key="value.id"
                :label="value.type_name"
                :value="value.id"
              ></el-option>
            </el-select>
            <el-button size="mini" type="success" plain @click="g_add_source()">添加来源</el-button>
          </el-row>
          <el-row type="flex">
            <el-date-picker
              v-model="customer_h"
              size="mini"
              type="date"
              placeholder="生日(默认为新历)"
              align="right"
              :picker-options="birthdayPickerOptions"
            ></el-date-picker>
            <el-tooltip :content="customer_birthday_type" placement="top">
              <el-switch
                v-model="customer_birthday_type"
                active-value="新历"
                inactive-value="农历"
                style="margin: auto;"
              ></el-switch>
            </el-tooltip>
          </el-row>
          <el-input v-model="customer_i" size="mini" clearable>
            <label slot="prepend">身份证&#12288&#12288&#12288</label>
          </el-input>
          <el-input v-model="customer_j" size="mini" clearable>
            <label slot="prepend">允许挂账金额</label>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input size="mini" disabled>
            <label slot="prepend">
              性别&#12288&#12288
              <el-radio v-model="customer_k" :label="1">男&#12288&#12288&#12288</el-radio>
              <el-radio v-model="customer_k" :label="2">女&#12288&#12288&#12288</el-radio>
            </label>
          </el-input>
          <el-input size="mini" disabled>
            <label slot="prepend">
              车牌识别
              <el-radio v-model="customer_l" :label="1">特殊会员</el-radio>
              <el-radio v-model="customer_l" :label="2">普通会员</el-radio>
            </label>
          </el-input>
          <el-input v-model="customer_card_img" size="mini" disabled>
            <label slot="prepend">上传驾驶证&#12288</label>
            <el-upload
              slot="append"
              :action="this.$api.yuming+'/StoreAdmin/Common/uploadImg'"
              :show-file-list="false"
              :before-upload="before_upload"
              :http-request="jsz_http_img"
            >
              <el-button size="mini" type="success" plain>上传</el-button>
            </el-upload>
            <el-popover slot="suffix" placement="bottom" trigger="click">
              <el-image
                style="width: 150px; height: 100px"
                fit="cover"
                :src="jsz_list[0]"
                :preview-src-list="jsz_list"
              ></el-image>
              <el-button slot="reference" size="mini" type="success" plain @click="show_jsz()">预览</el-button>
            </el-popover>
          </el-input>
          <el-input v-model="customer_other_img" size="mini" disabled>
            <label slot="prepend">上传其他图片</label>
            <el-button size="mini" slot="append" type="success" plain @click="load_other_jsz()">上传</el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <div style="line-height: 32px;">车辆信息</div>
        <el-col :span="8">
          <el-input v-model="car_a" size="mini" clearable>
            <label slot="prepend">车架号&#12288&#12288</label>
          </el-input>
          <el-input v-model="car_b" size="mini" clearable>
            <label slot="prepend">排量&#12288&#12288&#12288</label>
          </el-input>
          <el-input v-model="car_c" size="mini" clearable>
            <label slot="prepend">车价(万)&#12288&#160</label>
          </el-input>
          <el-input v-model="car_d" size="mini" clearable>
            <label slot="prepend">厂牌型号&#12288</label>
          </el-input>
          <el-input v-model="car_e" size="mini" clearable>
            <label slot="prepend">发动机型号</label>
          </el-input>
          <el-input v-model="car_f" size="mini" clearable>
            <label slot="prepend">发动机号码</label>
          </el-input>
          <el-input v-model="car_g" size="mini" clearable>
            <label slot="prepend">车辆颜色&#12288</label>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="car_h" size="mini" clearable>
            <label slot="prepend">所有人&#12288&#12288&#12288&#12288&#160</label>
          </el-input>
          <el-input v-model="car_ii" size="mini" clearable>
            <label style="color: red;" slot="prepend">*</label>
            <el-select
              v-model="car_i"
              size="mini"
              clearable
              filterable
              slot="prepend"
              style="margin: 0; height: 27px; width: 80px;"
              placeholder="车牌"
            >
              <el-option
                v-for="value in car_i_select"
                :key="value.plate_id"
                :label="value.plate_id"
                :value="value.plate_id"
              ></el-option>
            </el-select>
          </el-input>
          <el-date-picker
            v-model="car_j"
            size="mini"
            style="width: 100%;"
            type="date"
            placeholder="购车时间"
            align="right"
            :picker-options="pickerOptions"
          ></el-date-picker>
          <el-date-picker
            v-model="car_k"
            size="mini"
            style="width: 100%;"
            type="date"
            placeholder="年检到期"
            align="right"
            :picker-options="pickerOptions"
          ></el-date-picker>
          <el-date-picker
            v-model="car_l"
            size="mini"
            style="width: 100%;"
            type="date"
            placeholder="保险到期"
            align="right"
            :picker-options="pickerOptions"
          ></el-date-picker>
          <el-select
            v-model="car_m"
            size="mini"
            clearable
            filterable
            remote
            reserve-keyword
            :remote-method="remoteMethod"
            style="width: 100%;"
            placeholder="品牌车型"
          >
            <el-button
              v-for="value in A_M"
              :key="value"
              size="mini"
              type="primary"
              circle
              round
              plain
              @click="a_z(value)"
            >{{value}}</el-button>
            <br />
            <el-button
              v-for="value in N_Z"
              :key="value"
              size="mini"
              type="primary"
              circle
              round
              plain
              @click="a_z(value)"
            >{{value}}</el-button>
            <el-option id="tree" :label="car_m" :value="car_m" class="tree-select">
              <el-tree
                v-if="tree"
                :node-key="car_m_select.id"
                :props="{children: 'children', label: 'name', isLeaf: 'leaf'}"
                :load="loadNode"
                lazy
                @node-click="node_click"
                @node-expand="node_click"
                ref="tree"
              ></el-tree>
            </el-option>
          </el-select>
          <el-select
            v-model="car_n"
            size="mini"
            clearable
            filterable
            style="width: 100%;"
            placeholder="车价区间"
            @change="car_n_change"
          >
            <el-option
              v-for="value in car_n_select"
              :key="value.id"
              :label="value.name"
              :value="value.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-input v-model="car_o" size="mini" clearable>
            <label slot="prepend">所有人地址&#12288</label>
          </el-input>
          <el-input v-model="car_p" size="mini" clearable>
            <label slot="prepend">送修人&#12288&#12288&#12288</label>
          </el-input>
          <el-input v-model="car_q" size="mini" clearable>
            <label slot="prepend">保险公司&#12288&#12288</label>
          </el-input>
          <el-input v-model="car_r" size="mini" clearable>
            <label slot="prepend">下次保养里程</label>
            <label slot="append">km</label>
          </el-input>
          <el-input v-model="car_s" size="mini" clearable>
            <label slot="prepend">上次保养里程</label>
            <label slot="append">km</label>
          </el-input>
          <el-input v-model="car_card_img" size="mini" disabled>
            <label slot="prepend">上传行驶证&#12288</label>
            <el-upload
              slot="append"
              :action="this.$api.yuming+'/StoreAdmin/Common/uploadImg'"
              :show-file-list="false"
              :before-upload="before_upload"
              :http-request="ssz_http_img"
            >
              <el-button size="mini" type="success" plain>上传</el-button>
            </el-upload>
            <el-popover slot="suffix" placement="bottom" trigger="click">
              <el-image
                style="width: 150px; height: 100px"
                fit="cover"
                :src="ssz_list[0]"
                :preview-src-list="ssz_list"
              ></el-image>
              <el-button slot="reference" size="mini" type="success" plain @click="show_ssz()">预览</el-button>
            </el-popover>
          </el-input>
          <el-input v-model="car_other_img" size="mini" disabled>
            <label slot="prepend">上传其他图片</label>
            <el-button size="mini" slot="append" type="success" plain @click="load_other_ssz()">上传</el-button>
          </el-input>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel()">取 消</el-button>
        <el-button size="mini" type="primary" @click="enter()">确 定</el-button>
      </div>
    </el-dialog>

    <Dialog append-to-body ref="dialog_customer" :footer="false">
      <template>
        <el-input v-model="new_customer" style="width: 80%;" size="mini" clearable>
          <label slot="prepend">客户来源</label>
        </el-input>
        <el-button size="mini" type="primary" @click="modify_customer(new_customer, 1)">添加</el-button>
        <mytable
          :height="400"
          :tableTitle="tableTitle_customer"
          :tableData="tableData_customer"
          :operation_mod_name="'保存'"
          @modify="modify_customer"
          @del="del_customer"
          @resData="resData_customer"
          @handlePageChange="handlePageChange_customer"
          ref="mytable_customer"
        ></mytable>
      </template>
    </Dialog>

    <Dialog append-to-body ref="dialog_car" :footer="false">
      <template>
        <el-input v-model="new_car" style="width: 80%;" size="mini" clearable>
          <label slot="prepend">客户类型</label>
        </el-input>
        <el-button size="mini" type="primary" @click="modify_car(new_car, 1)">添加</el-button>
        <mytable
          :height="400"
          :tableTitle="tableTitle_car"
          :tableData="tableData_car"
          :operation_mod_name="'保存'"
          @modify="modify_car"
          @del="del_car"
          @resData="resData_car"
          @handlePageChange="handlePageChange_car"
          ref="mytable_car"
        ></mytable>
      </template>
    </Dialog>

    <Dialog append-to-body ref="dialog_jsz" @enter="enter_jsz()">
      <template>
        <el-upload
          :action="this.$api.yuming+'/StoreAdmin/Common/uploadImg'"
          list-type="picture-card"
          multiple
          :on-preview="on_preview"
          :file-list="jsz_img"
          :before-remove="onRemove"
          :before-upload="before_upload"
          :http-request="jsz_other_http_img"
          ref="upload_jsz"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </template>
    </Dialog>

    <Dialog append-to-body ref="dialog_ssz" @enter="enter_ssz()">
      <template>
        <el-upload
          :action="this.$api.yuming+'/StoreAdmin/Common/uploadImg'"
          list-type="picture-card"
          multiple
          :before-remove="onRemove"
          :on-preview="on_preview"
          :file-list="ssz_img"
          :before-upload="before_upload"
          :http-request="ssz_other_http_img"
          ref="upload_ssz"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </template>
    </Dialog>

    <Dialog append-to-body ref="dialog_img" :footer="false">
      <img width="100%" height="100%" :src="show_img" alt="error" />
    </Dialog>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue";
import Dialog from "./../../other/Dialog.vue";
export default {
  name: "newCustomer",
  components: {
    mytable,
    Dialog
  },
  data() {
    return {
      birthdayPickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerOptions: {
        // disabledDate(time){return time.getTime() > Date.now();},
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      customer_a: "",
      customer_b: "",
      customer_c: "",
      customer_d: "",
      customer_e: "",
      customer_f: "",
      tableTitle_customer: [
        {
          key: "source_name",
          title: "客户来源",
          min_width: "100",
          edit: { name: "input", autoselect: true }
        }
      ],
      tableData_customer: [],
      new_customer: " ",
      tableTitle_car: [
        {
          key: "type_name",
          title: "客户类型",
          min_width: "100",
          edit: { name: "input", autoselect: true }
        }
      ],
      tableData_car: [],
      new_car: " ",
      customer_g: "",
      customer_h: "",
      customer_birthday_type: "新历",
      customer_i: "",
      customer_j: "",
      customer_k: 1,
      customer_l: 2,
      customer_card_img: "",
      customer_other_img: "",
      jsz_list: [],
      jsz_other_list: [],
      jsz_img: [],

      tree: true,
      car_a: "",
      car_b: "",
      car_c: "",
      car_d: "",
      car_e: "",
      car_f: "",
      car_g: "",
      car_h: "",
      car_i: "",
      car_ii: "",
      car_i_select: [
        "粤",
        "京",
        "津",
        "黑",
        "吉",
        "辽",
        "冀",
        "豫",
        "鲁",
        "晋",
        "陕",
        "蒙",
        "宁",
        "陇",
        "甘",
        "新",
        "青",
        "藏",
        "鄂",
        "皖",
        "苏",
        "沪",
        "浙",
        "闽",
        "湘",
        "赣",
        "川",
        "渝",
        "贵",
        "云",
        "桂",
        "琼",
        "港",
        "澳",
        "台"
      ],
      car_j: "",
      car_k: "",
      car_l: "",
      car_m: "",
      car_m_id: "",
      A_M: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"],
      N_Z: ["N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
      car_m_select: [],
      car_m_select_: [],
      car_m_select__: [],
      car_n: "",
      car_n_select: [
        { name: "8万以下", id: 0 },
        { name: "8-15万", id: 1 },
        { name: "15-30万", id: 2 },
        { name: "30-50万", id: 3 },
        { name: "50-70万", id: 4 },
        { name: "70-100万", id: 5 },
        { name: "100-150万", id: 6 },
        { name: "150万以上", id: 7 }
      ],
      car_o: "",
      car_p: "",
      car_q: "",
      car_r: "",
      car_s: "",
      car_card_img: "",
      car_other_img: "",
      ssz_list: [],
      ssz_other_list: [],
      ssz_img: [],
      show_img: ""
    };
  },
  props: {
    new_dialog: {
      type: Boolean,
      default: false
    },
    add_type: {
      type: [String, Number],
      default: 1
    },
    new_id: {
      type: [String, Number],
      default: ""
    },
    modify_data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onRemove(file) {
      
      let {url} = file
      url = url.substring(url.lastIndexOf('.com')+5)
      const index = this.jsz_other_list.findIndex(item => item === url)
      this.jsz_other_list.splice(index, 1)
    },
    cancel() {
      this.$emit("cancel");
    },
    customer_f_change(s) {
      this.customer_f = s;
    },
    customer_g_change(s) {
      this.customer_g = s;
    },
    car_n_change(s) {
      this.car_n = s;
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve(this.car_m_select);
      }
      if (node.level === 1) {
        setTimeout(() => {
          resolve(this.car_m_select_);
        }, 500);
      }
      if (node.level === 2) {
        setTimeout(() => {
          resolve(this.car_m_select__);
        }, 500);
      }
      if (node.level > 2) {
        return resolve([]);
      }
    },
    f_add_source() {
      this.$refs.dialog_customer.init();
      this.$nextTick(() => {
        this.handlePageChange_customer();
      });
    },
    g_add_source() {
      this.$refs.dialog_car.init();
      this.$nextTick(() => {
        this.handlePageChange_car();
      });
    },
    modify_customer(row, key) {
      let id = "";
      let name = "";
      if (key === 1) {
        id = "";
        name = row;
      } else if (key === 2) {
        id = row.row.id;
        name = row.row.source_name;
      }
      this.$api
        .HttpPost("/storeadmin/Customer/addOrUpdateMemberSource", {
          add_type: key,
          id: id,
          source_name: name
        })
        .then(data => {
          if (data.data.code === 200) {
            this.handlePageChange_customer();
            this.$message.success(data.data.msg);
          } else {
            this.$message.error(data.data.msg);
          }
        });
    },
    del_customer(row) {
      this.$api
        .HttpPost("/storeadmin/Customer/delMemberSource", { id: row.row.id })
        .then(data => {
          if (data.data.code === 200) {
            this.handlePageChange_customer();
            this.$message.success(data.data.msg);
          } else {
            this.$message.error(data.data.msg);
          }
        });
    },
    resData_customer(data) {
      this.tableData_customer = data;
    },
    handlePageChange_customer(data) {
      if (data === undefined) {
        data = {};
      }
      this.$refs.mytable_customer.findList(
        this.$api.yuming + "/storeadmin/Customer/getMemberSourceList",
        data
      );
    },
    modify_car(row, key) {
      let id = "";
      let name = "";
      if (key === 1) {
        id = "";
        name = row;
      } else if (key === 2) {
        id = row.row.id;
        name = row.row.type_name;
      }
      this.$api
        .HttpPost("/storeadmin/Customer/addOrUpdateMemberType", {
          add_type: key,
          id: id,
          type_name: name
        })
        .then(data => {
          if (data.data.code === 200) {
            this.handlePageChange_car();
            this.$message.success(data.data.msg);
          } else {
            this.$message.error(data.data.msg);
          }
        });
    },
    del_car(row) {
      this.$api
        .HttpPost("/storeadmin/Customer/delMemberType", { id: row.row.id })
        .then(data => {
          if (data.data.code === 200) {
            this.handlePageChange_car();
            this.$message.success(data.data.msg);
          } else {
            this.$message.error(data.data.msg);
          }
        });
    },
    resData_car(data) {
      this.tableData_car = data;
    },
    handlePageChange_car(data) {
      if (data === undefined) {
        data = {};
      }
      this.$refs.mytable_car.findList(
        this.$api.yuming + "/storeadmin/Customer/getMemberTypeList",
        data
      );
    },
    before_upload(file) {
      this.$api.img_before_upload(file);
    },
    jsz_http_img(file) {
      this.$api.img_upload(file).then(data => {
        this.customer_card_img = data.data;
      });
    },
    show_jsz() {
      this.$api.HttpPost("/StoreAdmin/Common/getOssPath", {}).then(data => {
        this.jsz_list.splice(0, 0, data.data + this.customer_card_img);
      });
    },
    jsz_other_http_img(file) {
      this.$api.img_upload(file).then(data => {
        this.jsz_other_list.splice(0, 0, data.data);
      });
    },
    load_other_jsz() {
      if (
        Object.keys(this.modify_data || {}).length === 0 &&
        this.jsz_other_list.length === 0
      ) {
        this.$nextTick(() => {
          this.$refs.upload_jsz.clearFiles();
        });
      }
      this.$refs.dialog_jsz.init();
    },
    enter_jsz() {
      this.$refs.dialog_jsz.cancel();
    },
    ssz_http_img(file) {
      this.$api.img_upload(file).then(data => {
        this.car_card_img = data.data;
      });
    },
    show_ssz() {
      this.$api.HttpPost("/StoreAdmin/Common/getOssPath", {}).then(data => {
        this.ssz_list.splice(0, 0, data.data + this.car_card_img);
      });
    },
    ssz_other_http_img(file) {
      this.$api.img_upload(file).then(data => {
        this.ssz_other_list.splice(0, 0, data.data);
      });
    },
    load_other_ssz() {
      if (
        Object.keys(this.modify_data || {}).length === 0 &&
        this.ssz_other_list.length !== 0
      ) {
        this.$nextTick(() => {
          this.$refs.upload_ssz.clearFiles();
        });
      }
      this.$refs.dialog_ssz.init();
    },
    enter_ssz() {
      this.$refs.dialog_ssz.cancel();
    },
    on_preview(file) {
      this.show_img = file.url;
      this.$refs.dialog_img.init();
    },
    remoteMethod(row) {
      this.tree = false;
      let loading = this.$loading({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(200, 200, 200, 0.7)",
        target: document.getElementById("tree")
      });
      if (row === "") {
        this.$api
          .HttpPost("/StoreAdmin/Customer/getCarBrandList", { car_name: row })
          .then(data => {
            this.car_m_select = data.data.data;
            loading.close();
            this.tree = true;
          });
      } else {
        this.$api
          .HttpPost("/storeadmin/Customer/searchCarList", { car_name: row })
          .then(data => {
            this.car_m_select = data.data.data;
            loading.close();
            this.tree = true;
          });
      }
    },
    a_z(val) {
      this.tree = false;
      let loading = this.$loading({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(200, 200, 200, 0.7)",
        target: document.getElementById("tree")
      });
      this.$api
        .HttpPost("/StoreAdmin/Customer/getCarBrandList", { letter: val })
        .then(data => {
          this.car_m_select = data.data.data;
          loading.close();
          this.tree = true;
        });
    },
    node_click(row) {
      if (row.children !== undefined) {
        if (row.level === 1) {
          this.car_m_select_ = row.children;
        } else {
          this.car_m_select__ = row.children;
        }
        return;
      }
      this.car_m = row.name;
      this.car_m_id = row.p_chexing_id;
      if (row.p_chexing_id === undefined) {
        this.car_m_id = "";
      }
      if (row.level == 1) {
        this.$api
          .HttpPost("/StoreAdmin/Customer/getCarSeriesList", {
            p_pinpai_id: row.p_pinpai_id
          })
          .then(data => {
            if (data.data.code == 200) {
              this.car_m_select_ = data.data.data;
            } else {
              this.$message.error(data.data.msg);
            }
          });
      } else if (row.level == 2) {
        this.$api
          .HttpPost("/StoreAdmin/Customer/getCarList", {
            p_chexi_id: row.p_chexi_id
          })
          .then(data => {
            if (data.data.code == 200) {
              this.car_m_select__ = data.data.data;
            } else {
              this.$message.error(data.data.msg);
            }
          });
      }
    },
    enter() {
      if (this.customer_h != "") {
        var time1 = Math.round(new Date(this.customer_h).getTime() / 1000);
      }
      if (this.car_j != "") {
        var time2 = Math.round(new Date(this.car_j).getTime() / 1000);
      }
      if (this.car_k != "") {
        var time3 = Math.round(new Date(this.car_k).getTime() / 1000);
      }
      if (this.car_l != "") {
        var time4 = Math.round(new Date(this.car_l).getTime() / 1000);
      }
      console.log(this.jsz_other_list);
      let data = {
        add_type: this.add_type,
        id: this.new_id,
        name: this.customer_a,
        tel: this.customer_b,
        address: this.customer_c,
        company: this.customer_d,
        remark: this.customer_e,
        source_id: this.customer_f,
        member_type: this.customer_g,
        birthday: time1,
        idcard: this.customer_i,
        credit: this.customer_j,
        sex: this.customer_k,
        car_type: this.customer_l,
        driving_licence_pic: this.customer_card_img,
        customer_other_img: this.jsz_other_list,

        vin: this.car_a,
        displacement: this.car_b,
        car_price: this.car_c,
        announcement: this.car_d,
        engine_type: this.car_e,
        engine_number: this.car_f,
        // car_g: this.car_g,
        possessor: this.car_h,
        plate_id: this.car_i,
        license_plate_number: this.car_ii,
        shopping_time: time2,
        as_endtime: time3,
        insurance_endtime: time4,
        car_id: this.car_m_id,
        car_name: this.car_m,
        price_range: this.car_n,
        possessor_address: this.car_o,
        send_people: this.car_p,
        insurance_company: this.car_q,
        next_service: this.car_r,
        last_service: this.car_s,
        vehicle_license_pic: this.car_card_img,
        car_other_img: this.ssz_other_list
      };
      this.$emit("determine", data);
    },
    init() {
      this.mounte();
      if (Object.keys(this.modify_data || {}).length === 0) {
        Object.assign(this.$data, this.$options.data());
        return;
      }
      this.customer_a = this.modify_data.name;
      this.customer_b = this.modify_data.tel;
      this.customer_c = this.modify_data.address;
      this.customer_d = this.modify_data.company;
      this.customer_e = this.modify_data.remark;
      this.customer_f = this.modify_data.source_id;
      this.customer_g = this.modify_data.member_type;
      this.customer_h = this.modify_data.birthday;
      this.customer_i = this.modify_data.idcard;
      this.customer_j = this.modify_data.credit;
      this.customer_k = this.modify_data.sex;
      this.customer_l = this.modify_data.car_type;
      this.customer_card_img = this.modify_data.driving_licence_pic;
      this.jsz_other_list = this.modify_data.customer_other_img1;
      this.jsz_img = this.modify_data.customer_other_img2;

      this.car_a = this.modify_data.vin;
      this.car_b = this.modify_data.displacement;
      this.car_c = this.modify_data.car_price;
      this.car_d = this.modify_data.announcement;
      this.car_e = this.modify_data.engine_type;
      this.car_f = this.modify_data.engine_number;
      // this.car_g = this.modify_data.
      this.car_h = this.modify_data.possessor;
      this.car_i = this.modify_data.plate_id;
      this.car_ii = this.modify_data.license_plate_number;
      this.car_j = this.modify_data.shopping_time;
      this.car_k = this.modify_data.as_endtime;
      this.car_l = this.modify_data.insurance_endtime;
      this.car_m_id = this.modify_data.car_id;
      this.car_m = this.modify_data.car_name;
      this.car_n = this.modify_data.price_range;
      this.car_o = this.modify_data.possessor_address;
      this.car_p = this.modify_data.send_people;
      this.car_q = this.modify_data.insurance_company;
      this.car_r = this.modify_data.next_service_cycle;
      this.car_s = this.modify_data.last_service_cycle;
      this.car_card_img = this.modify_data.vehicle_license_pic;
      this.ssz_other_list = this.modify_data.car_other_img1;
      this.ssz_img = this.modify_data.car_other_img2;
    },
    mounte() {
      this.$axios
        .all([
          this.$api.HttpPost("/StoreAdmin/Customer/getCarBrandList", {
            car_name: this.car_m
          }),
          this.$api.HttpPost("/storeadmin/Customer/getMemberSourceSelect", {}),
          this.$api.HttpPost("/storeadmin/Customer/getMemberTypeSelect", {}),
          this.$api.HttpPost("/storeadmin/Customer/getMemberPlateSelect", {}),
          this.$api.HttpPost("/storeadmin/Customer/getDefaultMemberPlate", {})
        ])
        .then(data => {
          this.car_m_select = data[0].data.data;
          this.tableData_customer = data[1].data.data;
          this.tableData_car = data[2].data.data;
          this.car_i_select = data[3].data.data;
          this.car_i = data[4].data.data.plate_id;
        });
    }
  }
};
</script>

<style scoped>
.el-radio {
  margin-right: 0;
}
.tree-select {
  height: 200px;
  overflow: auto;
  background-color: #ffffff;
}
.el-input {
  margin: 1px 0;
}
.el-select {
  margin: 1px 0;
}
.el-date-picker {
  margin: 1px 0;
}
</style>
