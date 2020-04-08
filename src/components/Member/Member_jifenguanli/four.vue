<template>
  <div id="four">
    <div class="pb-nav">
      <el-input size="mini" style="width: 25rem;" v-model="key_name"><label slot="prepend">会员卡号</label></el-input>
      <el-date-picker size="mini"
       v-model="value1"
       align="right"
       type="date"
       placeholder="开始时间"
       :picker-options="pickerOptions">
      </el-date-picker>
      <el-date-picker size="mini"
       v-model="value2"
       align="right"
       type="date"
       placeholder="结束时间"
       :picker-options="pickerOptions">
      </el-date-picker>
      <el-select size="mini" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_name_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
   </div>
   <mytable :tableTitle="tableTitle" :tableData="tableData" :operation="operation" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
  name: "four",
  components:{
    mytable
  },
  data(){
    return{
      //时间
      pickerOptions: {
        disabledDate(time){return time.getTime() > Date.now();},
        shortcuts: [{text: '今天',onClick(picker) {picker.$emit('pick', new Date());}},
        {text: '昨天',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24);picker.$emit('pick', date);}},
        {text: '一周前',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', date);}}]
      },
      value1: new Date(2019, 0, 1, 0, 0),
      value2: new Date(),
      //
      key_name: "",
      store_name: "",
      store_id: "",
      store_name_select: [],
      //table 配置
      tableTitle: [
        {key: "card_no", title: "卡号", min_width: "100"},
        {key: "tel", title: "手机", min_width: "100"},
        {key: "name", title: "姓名", min_width: "100"},
        {key: "product_name", title: "消费商品", min_width: "100"},
        {key: "integral", title: "积分", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"},
        {key: "create_time", title: "操作时间", min_width: "100"}
      ],
      tableData: [],
      operation: false
    }
  },
  methods:{
    search: function(){
      this.handlePageChange({search: this.key_name, start_time: this.value1, end_time: this.value2, sid: this.store_id});
    },
    store_change: function(s){
      this.store_id = s;
    },
    resData: function(data){
      this.tableData = data;
    },
    handlePageChange: function(data){
      if(data === undefined){data = {search: this.key_name, start_time: this.value1, end_time: this.value2, sid: this.store_id}}
      this.$refs.mytable.findList(this.$store.state.domainName_http+"/StoreAdmin/Integral/getIntegralRecordList", data);
    }
  },
  mounted(){
    this.handlePageChange({start_time: this.value1, end_time: this.value2});
    this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {})
    .then((data)=>{
        this.store_name_select = data.data;
    })
  }
}
</script>

<style scoped>
#four{
  margin: 1rem 5rem;
}
</style>
