<template>
	<div id="Finance_baoxiaoguanli">
    <el-button size="mini" type="primary" @click="modify(null, 1)">添加</el-button>
    <el-select size="mini" v-model="people_name" placeholder="报销人" clearable filterable @change="people_change">
      <el-option v-for="value in people_select" :key="value.eid" :label="value.name" :value="value.eid"></el-option>
    </el-select>
    <el-date-picker v-model="s_time" size="mini" type="datetimerange" clearable :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
    <el-select size="mini" v-model="store_name" placeholder="所属门店" clearable filterable @change="store_change">
      <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
    </el-select>
    <el-select size="mini" v-model="status_name" placeholder="状态" clearable filterable @change="status_change">
      <el-option v-for="value in status_select" :key="value.id" :label="value.name" :value="value.id"></el-option>
    </el-select>
    <el-button size="mini" type="primary" @click="search()">查询</el-button>

    <mytable :tableTitle="tableTitle" :tableData="tableData" :check_box="check_box" :operation_="operation_" :operation_mod_name="operation_mod_name" :operation_del_name="operation_del_name" :operation_name="operation_name"
    @modify="modify" @del="del" @operat="operat" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>
    <el-input size="mini" disabled v-model="total_amount"><label slot="prepend">合计金额</label></el-input>

    <Dialog ref="xq_dialog" @enter="xq_enter" :footer="footer">
      <h3>报销项目</h3>
      <vxe-table style="margin: 1rem auto;" size="mini" align="center" border highlight-hover-row
      :data="dialog_tableData"
      :edit-config="{trigger: 'click', mode: 'cell', activeMethod: activeRowMethod}" @edit-closed="edit_closed">
        <vxe-table-column field="item_name" title="事由或品名" min-width="100" :edit-render="{name: 'input', autoselect: true}"></vxe-table-column>
        <vxe-table-column field="number" title="数量" min-width="100" :edit-render="{name: 'input', autoselect: true}"></vxe-table-column>
        <vxe-table-column field="unit" title="单位" min-width="100" :edit-render="{name: 'input', autoselect: true}"></vxe-table-column>
        <vxe-table-column field="price" title="单价" min-width="100" :edit-render="{name: 'input', autoselect: true}"></vxe-table-column>
        <vxe-table-column field="amount" title="金额" min-width="100"></vxe-table-column>
        <vxe-table-column title="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click.native.prevent="xq_add(scope)">添加</el-button>
            <el-button size="mini" type="text" style="color: red;" @click.native.prevent="xq_del(scope)">删除</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <el-select style="width: 100%;" size="mini" v-model="dialog_people_name" placeholder="报销人" clearable filterable @change="dialog_people_change">
        <el-option v-for="value in people_select" :key="value.eid" :label="value.name" :value="value.eid"></el-option>
      </el-select>
      <el-input size="mini" disabled v-model="key_name"><label slot="prepend">单据编号</label></el-input>
      <el-input size="mini" v-model="dialog_remark" clearable><label slot="prepend">备注&#12288&#12288</label></el-input>
      <el-input v-if="show_dialog_reason" size="mini" v-model="dialog_reason" clearable><label slot="prepend">审核不通过原因</label></el-input>
      <el-upload :action="this.$api.yuming+'/StoreAdmin/Common/uploadImg'" :show-file-list="false"
      :before-upload="xq_before_upload" :http-request="http_img">
        <el-button style="margin: 1rem auto;" size="small" type="success" plain>图片上传</el-button>
      </el-upload>
      <el-image v-if="show_img" style="width: 50%; height: 200px" :src="dialog_img[0]" :preview-src-list="dialog_img"></el-image>
    </Dialog>
	</div>
</template>

<script>
import mytable from "./../mytable.vue"
import Dialog from "./../other/Dialog.vue"
export default{
	name: "Finance_baoxiaoguanli",
  components:{
    mytable,
    Dialog
  },
	data(){
		return{
      pickerOptions: {
        shortcuts: [{text: '最近一周',onClick(picker){const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', [start, end]);}},
        {text: '最近一个月',onClick(picker) {const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);picker.$emit('pick', [start, end]);}},
        {text: '最近三个月',onClick(picker) {const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);picker.$emit('pick', [start, end]);}}]
      },
      tableTitle: [
        {key: "order_number", title: "单据号", min_width: "100"},
        {key: "total_number", title: "数量", min_width: "100"},
        {key: "total_price", title: "金额", min_width: "100"},
        {key: "name", title: "报销人", min_width: "100"},
        {key: "create_time", title: "时间", min_width: "100"},
        {key: "store_name", title: "门店", min_width: "100"},
        {key: "status", title: "状态", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"}
      ],
      tableData: [],
      check_box: false,
      operation_: true,
      operation: false,
      paging: false,
      operation_mod_name: "详情",
      operation_del_name: "报销",
      operation_name: "审核",
      //
      s_time: [],
      people_name: "",
      people_select: [],
      store_name: "",
      store_select: [],
      status_name: "",
      status_select: [
        {id: 0, name: "未审核"},
        {id: 1, name: "已审核"},
        {id: 2, name: "未通过"},
        {id: 3, name: "已报销"}
      ],
      //
      dialog_tableData: [
        {item_name: "", number: "", unit: "", price: "", amount: ""}
      ],
      total_amount: 0,
      key_name: this.key_(),
      dialog_people_name: "",
      dialog_remark: "",
      dialog_reason: "",
      dialog_img: [],
      url_img: "",
      show_img: true,
      show_dialog_reason: false,
      footer: true
		}
	},
  methods:{
    key_(){
      let date = new Date();
      let year = date.getFullYear();
      let mount = date.getMonth() + 1;
      let day = date.getDate();
      let num = Math.round(Math.random()*100000000);
      let ret = year.toString() + mount.toString() + day.toString() + num.toString();
      return ret;
    },
    search(){
      if(this.s_time === null){
        this.s_time = [];
        this.s_time[0] = "";
        this.s_time[1] = "";
      }
      this.handlePageChange({eid: this.people_name, sid: this.store_name, status: this.status_name, start_time: this.s_time[0], end_time: this.s_time[1]})
    },
    people_change(s){
      this.people_name = s;
    },
    store_change(s){
      this.store_name = s;
    },
    status_change(s){
      this.status_name = s;
    },
    dialog_people_change(s){
      this.dialog_people_name = s;
    },
    edit_closed(row){
      this.dialog_tableData[row.rowIndex].amount = this.dialog_tableData[row.rowIndex].number * this.dialog_tableData[row.rowIndex].price;
    },
    activeRowMethod(row){
      return true;
    },
    xq_add(row){
      this.dialog_tableData.push({item_name: "", number: "", unit: "", price: "", amount: ""});
    },
    xq_del(row){
      if(this.dialog_tableData.length === 1){return this.$message.warning("已经剩下一个")}
      this.dialog_tableData.splice(row.rowIndex, 1);
    },
    xq_before_upload(file){
      this.$api.img_before_upload(file);
    },
    http_img(file){
      this.show_img = false;
      this.$api.img_upload(file)
      .then((data)=>{
        this.url_img = data.data;
        this.$api.HttpPost("/storeadmin/common/getOssPath", {})
        .then((img)=>{
          this.dialog_img[0] = img.data + data.data;
          this.show_img = true;
        })
      })
    },
    xq_enter(){
      let total_number = 0;
      let total_price = 0;
      for(let i in this.dialog_tableData){
        total_number = total_number + Number(this.dialog_tableData[i].number);
        total_price = total_price + Number(this.dialog_tableData[i].price);
      }
      this.$api.HttpPost("/StoreAdmin/Financial/addExpenseOrder",
      {order_number: this.key_name,
      total_number: total_number,
      total_price: total_price,
      remark: this.dialog_remark,
      eid: this.dialog_people_name,
      pic_url: this.url_img,
      item_list: this.dialog_tableData})
      .then((data)=>{
        if(data.data.code === 200){
          this.$refs.xq_dialog.cancel();
          this.search();
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    modify(row, key){
      this.$refs.xq_dialog.init();
      this.dialog_tableData = [{item_name: "", number: "", unit: "", price: "", amount: ""}];
      this.key_name = this.key_();
      this.dialog_people_name = "";
      this.dialog_remark = "";
      this.dialog_reason = "";
      this.dialog_img = [];
      this.show_dialog_reason = false;
      if(key === 2){
        this.footer = false;
        if(row.row.status === "未通过"){
          this.show_dialog_reason = true;
          this.footer = true;
        }
        if(row.row.status === "未审核"){
          this.footer = true;
        }
        this.$api.HttpPost("/StoreAdmin/Financial/getExpenseOrderDetails",
        {order_id: row.row.order_id})
        .then((data)=>{
          let s = data.data.data;
          this.dialog_tableData = s.itemList;
          this.key_name = s.order_number;
          this.dialog_people_name = s.eid;
          this.dialog_remark = s.remark;
          this.dialog_reason = s.reason;
          this.url_img = s.pic_url;
          this.show_img = false;
          this.$api.HttpPost("/storeadmin/common/getOssPath", {})
          .then((img)=>{
            this.dialog_img[0] = img.data + s.pic_url;
            this.show_img = true;
          })
        })
      }
    },
    del(row){
      this.$api.HttpPost("/StoreAdmin/Financial/changeExpenseOrderStatus",
      {order_id: row.row.order_id,
      status: 3})
      .then((data)=>{
        if(data.data.code === 200){
          this.search();
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    operat(row){
      this.$prompt('原因备注填写', '请选择审核是否通过', {
      confirmButtonText: '是',
      cancelButtonText: '否',
      inputValue: "",
      distinguishCancelAndClose: true,
      beforeClose: (key, val, done)=>{
        switch(key){
          case "confirm":{
            this.$api.HttpPost("/StoreAdmin/Financial/examineExpenseOrder",
            {order_id: row.row.order_id,
            status: 1,
            reason: val.inputValue})
            .then((data)=>{
              if(data.data.code === 200){
                this.search();
                this.$message.success(data.data.msg);
              }
              else{
                this.$message.error(data.data.msg);
              }
            })
            break;
          }
          case "cancel":{
            this.$api.HttpPost("/StoreAdmin/Financial/examineExpenseOrder",
            {order_id: row.row.order_id,
            status: 2,
            reason: val.inputValue})
            .then((data)=>{
              if(data.data.code === 200){
                this.search();
                this.$message.success(data.data.msg);
              }
              else{
                this.$message.error(data.data.msg);
              }
            })
            break;
          }
        }
        done();
      }})
      .then((val)=>{})
      .catch((val)=>{})
    },
    resData(data){
      this.tableData = data;
      for(let i in this.tableData){
        this.total_amount = Number(this.total_amount) + Number(this.tableData[i].total_price);
        switch(this.tableData[i].status){
          case 0:{
            this.tableData[i].status = "未审核";
            break;
          }
          case 1:{
            this.tableData[i].status = "已审核";
            break;
          }
          case 2:{
            this.tableData[i].status = "未通过";
            break;
          }
          case 3:{
            this.tableData[i].status = "已报销";
            break;
          }
        }
      }
    },
    handlePageChange(data){
      if(data === undefined){data = {}}
      this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Financial/getExpenseOrderList", data)
    }
  },
  mounted(){
    this.$axios.all([
      this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {}),
      this.$api.HttpPost("/StoreAdmin/Common/getEmployeeSelect", {})
    ])
    .then((data)=>{
      this.store_select = data[0].data;
      this.people_select = data[1].data;
    })
    this.search();
  }
}
</script>

<style scoped>
#Finance_baoxiaoguanli{
  margin: 1rem 5rem;
}
</style>
