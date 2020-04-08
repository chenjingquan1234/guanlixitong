<template>
  <div id="Stock_tiaoboguanli">
    <el-tabs type="card" v-model="activeName">
      <el-tab-pane label="调拨统计" name="one"><one :store_select="store_select"></one></el-tab-pane>
      <el-tab-pane label="调拨单" name="two"><two :store_select="store_select" :supplier_select="supplier_select" :people_select="people_select"></two></el-tab-pane>
      <el-tab-pane label="调拨单据" name="three"><three :store_select="store_select" :supplier_select="supplier_select"></three></el-tab-pane>
      <el-tab-pane label="调拨明细" name="four"><four :store_select="store_select" :supplier_select="supplier_select"></four></el-tab-pane>
      <el-tab-pane label="作废单据" name="five"><five :store_select="store_select" :supplier_select="supplier_select"></five></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import one from "./Stock_tiaoboguanli/one.vue"
import two from "./Stock_tiaoboguanli/two.vue"
import three from "./Stock_tiaoboguanli/three.vue"
import four from "./Stock_tiaoboguanli/four.vue"
import five from "./Stock_tiaoboguanli/five.vue"
export default{
  name: "Stock_tiaoboguanli",
  components:{
    one,
    two,
    three,
    four,
    five
  },
  data(){
    return{
      activeName: "one",
      store_select: [],
      supplier_select: [],
      people_select: []
    }
  },
  created(){
    this.$axios.all([
      this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Common/getStoreSelect", {}, {withCredentials: true}),
      this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Inventory/getSupplierSelect", {}, {withCredentials: true}),
      this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Common/getEmployeeSelect", {}, {withCredentials: true})
    ])
    .then((data)=>{
      this.store_select = data[0].data;
      this.supplier_select = data[1].data.data;
      this.people_select = data[2].data;
    })
    .catch((data)=>{
      this.$message.error("抱歉网络错误,请检查网络后重试！");
    })
  }
}
</script>

<style scoped>
</style>
