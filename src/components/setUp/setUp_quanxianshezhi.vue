<template>
  <div id="setUp_quanxianshezhi">
    <el-tabs type="card" v-model="activeName">
      <el-tab-pane label="用户权限" name="one"><one :store_select="store_select"></one></el-tab-pane>
      <el-tab-pane label="部门权限" name="two"><two :store_select="store_select"></two></el-tab-pane>
      <el-tab-pane label="角色权限" name="three" disabled><three :store_select="store_select"></three></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import one from "./setUp_quanxianshezhi/one.vue"
import two from "./setUp_quanxianshezhi/two.vue"
import three from "./setUp_quanxianshezhi/three.vue"
export default{
  name: "setUp_quanxianshezhi",
  components:{
    one,
    two,
    three
  },
  data(){
    return{
      activeName: "one",
      store_select: []
    }
  },
  created(){
    this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Common/getStoreSelect", {}, {withCredentials: true})
    .then((data)=>{
      this.store_select = data.data;
    })
    .catch((data)=>{
      this.$message.error("抱歉网络错误,请检查网络后重试！");
    })
  }
}
</script>

<style scoped>
</style>
