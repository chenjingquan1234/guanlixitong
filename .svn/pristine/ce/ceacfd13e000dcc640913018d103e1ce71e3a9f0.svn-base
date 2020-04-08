<template>
  <div id="one">
    <div v-if="show" key="tabOne">
      <el-button size="mini" type="primary" @click="modify(null, 1)">添加</el-button>
      <el-button size="mini" type="danger" @click="choice_del()">员工离职</el-button>
      <el-button size="mini" type="info" @click="set_type()">工种设置</el-button>
      <el-input style="width: 25rem;" size="mini" placeholder="可输入员工姓名或者手机号码进行搜索" v-model="key_word"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" clearable v-model="store_name" filterable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>

      <!-- 表格 -->
      <mytable :tableTitle="tableTitle" :tableData="tableData" :operation_del_name="'员工离职'"
      @modify="modify" @del="del" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>

      <!-- 增加修改框 -->
      <el-dialog title="员工资料" :visible.sync="dialog" :close-on-click-modal="false">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-select size="mini" :disabled="disabled" style="width: 100%;" v-model="all_num.sid" placeholder="门店" @change="d_store_change">
              <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12"><el-input size="mini" clearable v-model="all_num.check_employees_name" @focus="yuangongyeji"><label slot="prepend">可查看员工(业绩)</label></el-input></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12"><el-input size="mini" clearable v-model="all_num.name"><label slot="prepend"><label style="color: red;">* </label>姓名</label></el-input></el-col>
          <el-col :span="12"><el-input size="mini" disabled><label slot="prepend">微信下单通知&#12288&#160&#160</label><el-switch slot="append" v-model="all_num.wechat_order_inform"></el-switch></el-input></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12"><el-input size="mini" clearable v-model="all_num.number"><label slot="prepend"><label style="color: red;">* </label>工号</label></el-input></el-col>
          <el-col :span="12"><el-input size="mini" disabled><label slot="prepend">微信预约通知&#12288&#160&#160</label><el-switch slot="append" v-model="all_num.wechat_appointment_inform"></el-switch></el-input></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-select size="mini" style="width: 100%;" v-model="all_num.wid" placeholder="工种" @change="type_change">
              <el-option v-for="value in type_select" :key="value.id" :label="value.work_type_name" :value="value.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12"><el-input size="mini" clearable v-model="all_num.qq"><template slot="prepend">QQ&#12288&#12288&#12288&#12288&#12288&#160&#160&#160</template></el-input></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12"><el-input size="mini" clearable v-model="all_num.tel"><template slot="prepend"><label style="color: red;">* </label>手机</template></el-input></el-col>
          <el-col :span="12"><el-input size="mini" clearable v-model="all_num.idnumber"><template slot="prepend">身份证&#12288&#12288&#12288&#12288&#160&#160</template></el-input></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12"><el-input size="mini" clearable v-model="all_num.basic_salary"><template slot="prepend">底薪&#12288</template></el-input></el-col>
          <el-col :span="12"><el-input size="mini" clearable v-model="all_num.clock_in_pwd"><template slot="prepend">打卡密码&#12288&#12288&#12288&#160&#160</template></el-input></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12"><el-input size="mini" clearable v-model="all_num.wechat_name"><label slot="prepend">微信&#12288</label><el-button slot="append" size="mini" type="success" plain @click="wx_bind">绑定</el-button></el-input></el-col>
          <el-col :span="12"><el-input size="mini" clearable v-model="all_num.capacity" placeholder="填写0-100数值"><template slot="prepend">技术能力(%)&#12288&#12288</template></el-input></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12"><el-input size="mini" disabled v-model="all_num.idphoto"><template slot="prepend">身份证照片</template></el-input></el-col>
          <el-col :span="6"><el-upload :action="this.$api.yuming+'/StoreAdmin/Common/uploadImg'" :show-file-list="false"
          :before-upload="before_upload" :http-request="http_img"><el-button size="mini">上传</el-button></el-upload></el-col>
          <el-col :span="6"><el-button size="mini" @click="show_img">预览</el-button></el-col>
        </el-row>
        <el-input size="mini" type="textarea" v-model="all_num.remark" placeholder="备注"></el-input>

        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialog=false;">取消</el-button>
          <el-button size="mini" type="primary" @click="confirm()">确定</el-button>
        </div>
      </el-dialog>
      <!-- 员工弹出框 -->
      <el-dialog append-to-body :visible.sync="dialog_yg" :close-on-click-modal="false">
        <el-checkbox-group v-model="List" @change="list_change">
          <el-checkbox v-for="value in people_select" :key="value.eid" :label="value.eid">{{value.name}}</el-checkbox>
        </el-checkbox-group>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialog_yg=false;">取消</el-button>
          <el-button size="mini" type="primary" @click="yuangong_confirm()">确定</el-button>
        </div>
      </el-dialog>
      <!-- 图片预览 -->
      <el-dialog title="图片预览" :visible.sync="dialogimg"><img :src="sfz_img" alt="暂无图片" width="100%"></el-dialog>
      <el-dialog title="微信绑定" :visible.sync="dialogwximg"><center><img :src="wx_img" alt="暂无图片" width="100%"></center></el-dialog>
    </div>

    <div v-else key="tabTwo">
      <!-- 表格1 -->
      <div class="pb-nav">
        <el-tooltip content="返回在职员工"><el-button size="mini" icon="el-icon-d-arrow-left" @click="res()"></el-button></el-tooltip>
        <el-tooltip content="添加"><el-button size="mini" type="primary" icon="el-icon-plus" @click="type_modify(null, 1)"></el-button></el-tooltip>
        <el-tooltip content="批量删除"><el-button size="mini" type="danger" icon="el-icon-delete" @click="type_choice_del()"></el-button></el-tooltip>
      </div>
      <mytable :tableTitle="tableTitle1" :tableData="tableData1"
      @modify="type_modify" @del="type_del" @resData="resData1" @handlePageChange="handlePageChange1" ref="mytable1"></mytable>
      <!-- 增加修改框1 -->
      <el-dialog title="员工资料" :visible.sync="dialog1" :close-on-click-modal="false">
        <el-input v-model="type_name"><template slot="prepend">工种名称</template></el-input>
        <el-input v-model="type_sort" type="number"><template slot="prepend">&#12288排序&#12288</template></el-input>
        <el-input type="textarea" placeholder="备注" v-model="type_remark"><template slot="prepend">备注</template></el-input>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog1 = false">取 消</el-button>
          <el-button type="primary" @click="type_confirm()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
  name: "one",
  components:{
    mytable
  },
  data(){
    return{
      show: true,
      store_name: "",
      store_select: [],
      type_select: [],
      key_word: "",
      upload_preview: "",
      tableTitle: [
        {key: "number", title: "员工编号", min_width: "100"},
        {key: "name", title: "员工姓名", min_width: "100"},
        {key: "tel", title: "手机号码", min_width: "100"},
        {key: "work_type_name", title: "工种", min_width: "100"},
        {key: "basic_salary", title: "底薪", min_width: "100"},
        {key: "idnumber", title: "身份证", min_width: "100"},
        {key: "store_name", title: "所属门店", min_width: "100"},
        {key: "create_time", title: "添加时间", min_width: "100"}
      ],
      tableData: [],
      tableTitle1: [
        {key: "work_type_name", title: "工种名称", min_width: "100"},
        {key: "sort", title: "排序", min_width: "100"},
        {key: "create_time", title: "创建时间", min_width: "100"}
      ],
      tableData1: [],
      loading: false,
      disabled: false,
      dialog: false,
      dialog_yg: false,
      dialog1: false,
      dialogimg: false,
      dialogwximg: false,

      add_type: "",
      all_num: {
        id: "",
        sid: "",
        name: "",
        number: "",
        wid: "",
        tel: "",
        qq: "",
        basic_salary: "",
        wechat_name: "",
        check_employees: "",
        check_employees_name: "",
        wechat_order_inform: 0,
        wechat_appointment_inform: 0,
        idnumber: "",
        idphoto: "",
        clock_in_pwd: "",
        capacity: "",
        remark: ""
      },
      List: [],
      people_select: [],
      sfz_img: "",
      wx_img: "",

      type_name: "",
      type_sort: "",
      type_remark: ""
    }
  },
  methods:{
    res(){
      this.show = true;
    },
    store_change(s){
      this.store_name = s;
    },
    d_store_change(s){
      this.all_num.sid = s;
    },
    type_change(s){
      this.all_num.wid = s;
    },
    search(){
      this.handlePageChange();
    },
    set_type(){
      this.show = false;
      this.$nextTick(()=>{
        this.handlePageChange1();
      })
    },
    before_upload(file){
      this.$api.img_before_upload(file);
    },
    http_img(file){
      this.$api.img_upload(file)
      .then((data)=>{
        this.all_num.idphoto = data.data;
      })
    },
    show_img(){
      this.dialogimg = true;
      this.$api.HttpPost("/StoreAdmin/Common/getOssPath", {})
      .then((data)=>{
        this.sfz_img = data.data + this.all_num.idphoto;
      })
    },
    yuangongyeji(){
      this.dialog_yg = true;
      this.all_num.check_employees = "";
      this.List = [];
      this.$api.HttpPost("/StoreAdmin/Common/getEmployeeSelect")
      .then((data)=>{
        this.people_select = data.data;
        if(this.add_type == 2){
          this.$api.HttpPost("/storeadmin/staff/getStaffDetail", {id: this.all_num.id})
          .then((list)=>{
            this.$nextTick(()=>{
              for(let i in list.data){
                this.List.splice(0, 0, list.data[i].eid);
              }
            })
            this.all_num.check_employees = this.List.toString();
          })
        }
      })
    },
    list_change(s){
      this.all_num.check_employees = s.toString();
    },
    yuangong_confirm(){
      this.$api.HttpPost("/storeadmin/Staff/getStaffName ", {eid: this.all_num.check_employees})
      .then((data)=>{
        this.all_num.check_employees_name = data.data.data;
      })
      this.dialog_yg = false;
    },
    modify(row, key){
      this.dialog = true;
      this.add_type = key;
      if(key === 1){
        this.disabled = false;
        this.all_num = [];
      }
      else if(key === 2){
        this.disabled = true;
        this.all_num = row.row;
      }
    },
    del(row){
      this.$api.HttpPost("/StoreAdmin/Staff/departureStaff", {id: row.row.id, isdeparture: 1})
      .then((data)=>{
        if(data.data.code === 200){
          this.handlePageChange();
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    choice_del(){
      var value = this.$refs.mytable.$refs.xTable.getSelectRecords();
      var lengths = this.$refs.mytable.$refs.xTable.getSelectRecords().length;
      if(lengths === 0){
        this.$message.warning("请至少选择一项操作");
      }
      else{
        var del = [];
        for(var key in value){
          del.push(value[key].id);
        }
        var id = del.join();
        this.$api.HttpPost("/StoreAdmin/Staff/departureStaff", {id: id, isdeparture: 1})
        .then((data)=>{
          if(data.data.code === 200){
            this.handlePageChange();
            this.$message.success(data.data.msg);
          }
          else{
            this.$message.error(data.data.msg);
          }
        })
      }
    },
    confirm(){
      this.$api.HttpPost("/StoreAdmin/Staff/staffEdit",
      {add_type: this.add_type,
      id: this.all_num.id,
      sid: this.all_num.sid,
      name: this.all_num.name,
      number: this.all_num.number,
      wid: this.all_num.wid,
      tel: this.all_num.tel,
      qq: this.all_num.qq,
      basic_salary: this.all_num.basic_salary,
      wechat_name: this.all_num.wechat_name,
      check_employees: this.all_num.check_employees,
      wechat_order_inform: this.all_num.wechat_order_inform,
      wechat_appointment_inform: this.all_num.wechat_appointment_inform,
      idphoto: this.all_num.idphoto,
      idnumber: this.all_num.idnumber,
      clock_in_pwd: this.all_num.clock_in_pwd,
      capacity: this.all_num.capacity,
      remark: this.all_num.remark})
      .then((data)=>{
        if(data.data.code === 200){
          this.dialog = false;
          this.handlePageChange();
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    wx_bind(){
      if( this.add_type === 1){
        this.$message.warning("请保存后, 点击修改绑定");
        return;
      }
      this.wx_img = "";
      this.dialogwximg = true;
      this.$api.HttpPost("/storeadmin/staff/getQrcode", {id: this.all_num.id})
      .then((data)=>{
         this.wx_img = data.data.data.qrcode;
      })
    },
    type_modify(scope, key){
      this.dialog1 = true;
      if(key === 1){
        this.add_type = key;
        sessionStorage.type_id = "";
        this.type_name = "";
        this.type_sort = "";
        this.type_remark = "";
      }
      else if(key === 2){
        this.add_type = key;
        sessionStorage.type_id = scope.row.id;
        this.$api.HttpPost("/StoreAdmin/Staff/getWorkTypeDetail", {id: scope.row.id})
        .then((data)=>{
          this.type_name = data.data.data.work_type_name;
          this.type_sort = data.data.data.sort;
          this.type_remark = data.data.data.remark;
        })
      }
    },
    type_confirm(){
      this.$api.HttpPost("/StoreAdmin/Staff/workTypeEdit",
      {add_type: this.add_type,
      id: sessionStorage.type_id,
      work_type_name: this.type_name,
      sort: this.type_sort,
      remark: this.type_remark})
      .then((data)=>{
        if(data.data.code === 200){
          this.dialog1 = false;
          this.handlePageChange1();
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    type_del(row){
      this.$api.HttpPost("/StoreAdmin/Staff/delWorkType", {id: row.row.id})
      .then((data)=>{
        if(data.data.code === 200){
          this.handlePageChange1();
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    type_choice_del(){
      var value = this.$refs.mytable1.$refs.xTable.getSelectRecords();
      var lengths = this.$refs.mytable1.$refs.xTable.getSelectRecords().length;
      if(lengths === 0){
        this.$message.warning("请至少选择一项操作");
      }
      else{
        var del = [];
        for(var key in value){
          del.push(value[key].id);
        }
        var id = del.join();
        this.$api.HttpPost("/StoreAdmin/Staff/delWorkType", {id: id})
        .then((data)=>{
          this.handlePageChange1();
          this.$message.success("删除成功");
        })
      }
    },
    resData(data){
      this.tableData = data;
    },
    handlePageChange(data){
      if(data === undefined){data = {search: this.key_word, sid: this.store_name}}
      this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Staff/getStaffList", data);
    },
    resData1(data){
      this.tableData1 = data;
    },
    handlePageChange1(data){
      if(data === undefined){data = {search: this.key_word, sid: this.store_name}}
      this.$refs.mytable1.findList(this.$api.yuming + "/StoreAdmin/Staff/getWorkTypeList", data);
    }
  },
  created(){
    this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect")
    .then((data)=>{
      this.store_select = data.data;
    })
    this.$api.HttpPost("/StoreAdmin/Staff/workTypeSelect")
    .then((data)=>{
      this.type_select = data.data;
    })
  }
}
</script>

<style scoped>
#one{
  margin: 1rem 5rem;
}
</style>
