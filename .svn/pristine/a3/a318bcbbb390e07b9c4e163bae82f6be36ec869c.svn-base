<template>
  <div id="cashRegister_kehujicun">
    <el-tabs v-model="activeName" type="card" @tab-click="tab_click()">
      <el-tab-pane label="客户寄存管理" name="one"><one :store_select="store_select" :people_select="people_select" ref="one"></one></el-tab-pane>
      <el-tab-pane label="商品领取管理" name="two"><two :store_select="store_select" ref="two"></two></el-tab-pane>
      <el-tab-pane label="作废列表" name="three"><three :store_select="store_select" ref="three"></three></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import one from "./cashRegister_kehujicun/one.vue"
import two from "./cashRegister_kehujicun/two.vue"
import three from "./cashRegister_kehujicun/three.vue"
export default{
  name: "cashRegister_kehujicun",
  components: {
    one,
    two,
    three
  },
  data(){
    return{
      activeName: "one",
      store_select: [],
      people_select: []
    }
  },
  methods:{
    tab_click: function(){
      switch(this.activeName){
        case "one":{
          this.$refs.one.handlePageChange();
          break;
        }
        case "two":{
          this.$refs.two.handlePageChange();
          break;
        }
        case "three":{
          this.$refs.three.handlePageChange();
          break;
        }
      }
    }
  },
  mounted(){
    this.$axios.all([
      this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {}),
      this.$api.HttpPost("/StoreAdmin/Common/getEmployeeSelect", {}),
    ])
    .then((data)=>{
      this.store_select = data[0].data;
      this.people_select = data[1].data;
    })
    this.tab_click();
  }
}
</script>

<style scoped>

</style>
