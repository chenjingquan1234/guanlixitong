<template>
  <div id="Stock_caigoutuihuo">
    <el-tabs type="card" v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="退货统计" name="one"><one :store_select="store_select" ref="one"></one></el-tab-pane>
      <el-tab-pane label="退货单" name="two"><two v-if="cgd" :store_select="store_select" :supplier_select="supplier_select" :people_select="people_select" @reload_cgd="reload_cgd" ref="two"></two></el-tab-pane>
      <el-tab-pane label="退货单据" name="three"><three :store_select="store_select" :supplier_select="supplier_select" ref="three"></three></el-tab-pane>
      <el-tab-pane label="退货明细" name="four"><four :store_select="store_select" :supplier_select="supplier_select" ref="four"></four></el-tab-pane>
      <el-tab-pane label="作废单据" name="five"><five :store_select="store_select" :supplier_select="supplier_select" ref="five"></five></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import one from "./Stock_caigoutuihuo/one.vue"
import two from "./Stock_caigoutuihuo/two.vue"
import three from "./Stock_caigoutuihuo/three.vue"
import four from "./Stock_caigoutuihuo/four.vue"
import five from "./Stock_caigoutuihuo/five.vue"
export default{
  name: "Stock_caigoutuihuo",
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
      people_select: [],
	  cgd: true
    }
  },
  methods:{
    tabClick: function(s){
      switch(s.name){
        case "one":{
          this.$refs.one.search();
          break;
        }
        case "two":{
          this.reload_cgd();
          break;
        }
        case "three":{
          this.$refs.three.handlePageChange();
          break;
        }
        case "four":{
          this.$refs.four.handlePageChange();
          break;
        }
        case "five":{
          this.$refs.five.handlePageChange();
          break;
        }
      }
    },
    reload_cgd: function(){
      this.cgd = false;
      this.$nextTick(()=>{
        this.cgd = true
      })
    },
  },
  created(){
    this.$axios.all([
      this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {}),
      this.$api.HttpPost("/StoreAdmin/Inventory/getSupplierSelect", {}),
      this.$api.HttpPost("/StoreAdmin/Common/getEmployeeSelect", {})
    ])
    .then((data)=>{
      this.store_select = data[0].data;
      this.supplier_select = data[1].data.data;
      this.people_select = data[2].data;
    })
  }
}
</script>

<style scoped>
</style>
