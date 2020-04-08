<template>
  <div id="seven">
    <el-button size="mini" type="info" icon="el-icon-document" @click="save()">保存</el-button>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :number="number" :paging="paging" :operation="operation"></mytable>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
  name: "seven",
  components:{
    mytable
  },
  data(){
    return{
      tableTitle: [
        {key: "name", title: "名称", min_width: "400"},
        {key: "number", title: "值", min_width: "200", edit: {name: 'input', autoselect: true}},
      ],
      tableData: [
        {name: "质量保证期为车辆行驶多少公里", number: ""},
        {name: "或者多少天", number: ""}
      ],
      paging: false,
      number: false,
      operation: false
    }
  },
  methods:{
    save(){
      this.$api.HttpPost("/StoreAdmin/Repair/updateRepairQuality", {km: this.tableData[0].number, day: this.tableData[1].number})
      .then((data)=>{
        this.init();
        this.$message.success(data.data.msg);
      })
    },
    init(){
      this.$api.HttpPost("/StoreAdmin/Repair/getRepairQualityDetail", {})
      .then((data)=>{
        this.tableData[0].number = data.data.data.km;
        this.tableData[1].number = data.data.data.day;
      })
    }
  }
}
</script>

<style scoped>

</style>
