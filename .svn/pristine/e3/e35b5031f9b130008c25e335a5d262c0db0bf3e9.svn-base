<template>
  <div id="cashRegister_kehudinghuo">
    <el-tabs v-model="activeName" type="card" @tab-click="tab_click()">
      <el-tab-pane label="客户订货" name="one"><one :store_select="store_select" :people_select="people_select" ref="one"></one></el-tab-pane>
      <el-tab-pane label="已处理订货" name="two"><two :store_select="store_select" ref="two"></two></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import one from "./cashRegister_kehudinghuo/one.vue"
import two from "./cashRegister_kehudinghuo/two.vue"
export default{
  name: "cashRegister_kehudinghuo",
  components: {
    one,
    two
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
