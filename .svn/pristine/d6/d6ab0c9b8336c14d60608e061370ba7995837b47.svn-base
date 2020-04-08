<template>
  <div id="one">
    <div class="pb-nav">
      <el-input size="mini" style="width: 25rem;" v-model="key_name"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" clearable v-model="store_name" @change="store_change">
        <el-option v-for="value in store_name_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <mytable :tableTitle="table[key].tableTitle" :tableData="tableData" :operation="operation" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>
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
      key: "",
      key_name:"",
      store_name: "",
      store_id: "",
      store_name_select: [],
      table: [
        {tableTitle: [
          {key: "card_no", title: "卡号", min_width: "100"},
          {key: "name", title: "姓名", min_width: "100"},
          {key: "tel", title: "手机", min_width: "100"},
          {key: "create_time", title: "操作时间", min_width: "100"},
          {key: "operation_staff_name", title: "操作员", min_width: "100"}
        ]},
        {tableTitle: [
          {key: "old_card_name", title: "原卡类型", min_width: "100"},
          {key: "new_card_name", title: "更改卡类型", min_width: "100"},
          {key: "card_no", title: "卡号", min_width: "100"},
          {key: "license_plate_number", title: "车牌号", min_width: "100"},
          {key: "name", title: "姓名", min_width: "100"},
          {key: "operation_staff_name", title: "更换人", min_width: "100"},
          {key: "create_time", title: "时间", min_width: "100"},
          {key: "remark", title: "备注", min_width: "100"},
        ]},
        {tableTitle: [
          {key: "card_no", title: "卡号", min_width: "100"},
          {key: "name", title: "姓名", min_width: "100"},
          {key: "tel", title: "手机", min_width: "100"},
          {key: "card_create_time", title: "办理日期", min_width: "100"},
          {key: "old_validity_date", title: "截止日期", min_width: "100"},
          {key: "new_validity_date", title: "更改后截止日期", min_width: "100"},
          {key: "create_time", title: "修改日期", min_width: "100"}
        ]},
        {tableTitle: [
          {key: "", title: "姓名", min_width: "100"},
          {key: "", title: "车牌", min_width: "100"},
          {key: "", title: "手机", min_width: "100"},
          {key: "", title: "卡号", min_width: "100"},
          {key: "", title: "卡类型", min_width: "100"},
          {key: "", title: "余额", min_width: "100"},
          {key: "", title: "冻结备注", min_width: "100"},
          {key: "", title: "冻结日期", min_width: "100"},
        ]},
        {tableTitle: [
          {key: "", title: "姓名", min_width: "100"},
          {key: "", title: "手机", min_width: "100"},
          {key: "", title: "原卡号", min_width: "100"},
          {key: "", title: "新卡号", min_width: "100"},
          {key: "", title: "日期", min_width: "100"}
        ]},
        {tableTitle: [
          {key: "", title: "卡号", min_width: "100"},
          {key: "", title: "姓名", min_width: "100"},
          {key: "", title: "手机", min_width: "100"},
          {key: "", title: "余额", min_width: "100"},
          {key: "", title: "取现金额", min_width: "100"},
          {key: "", title: "剩余余额", min_width: "100"},
          {key: "", title: "日期", min_width: "100"}
        ]},
      ],
      tableData: [],
      operation: false,
      url: [
        this.$store.state.domainName_http+"/StoreAdmin/Common/getEmployeeSelect",
        this.$store.state.domainName_http+"/StoreAdmin/Customer/getUpdateCardTypeList",
        this.$store.state.domainName_http+"/StoreAdmin/Customer/getUpdateCardValidityDateList"
      ]
    }
  },
  methods:{
    init: function(){
      this.handlePageChange(this.url[this.key], {});
    },
    search: function(){
      this.handlePageChange(this.url[this.key], {search: this.key_name, sid: this.store_id});
    },
    store_change:function(s){
      this.store_id = s;
    },
    resData: function(data){
      this.tableData = data;
      for(let i in this.tableData){
        this.tableData[i].license_plate_number = this.tableData[i].plate_id + this.tableData[i].license_plate_number;
      }
    },
    handlePageChange: function(url, data){
      if(url === undefined || data === undefined){url = this.url[this.key]; data = {};};
      this.$refs.mytable.findList(url, data);
    }
  },
  created(){
    this.key = this.$route.query.key;
    this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {})
    .then((data)=>{
      this.store_name_select = data.data;
    })
    this.$nextTick(()=>{
      this.init();
    })
  }
}
</script>

<style scoped>
#one{
  margin: 1rem 5rem;
}
</style>
