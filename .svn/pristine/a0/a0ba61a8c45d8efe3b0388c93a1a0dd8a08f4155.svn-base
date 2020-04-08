<template>
  <div id="Member_tongji">
    <el-tabs type="card" v-model="activeName" @tab-click="tab_click()">
      <el-tab-pane label="会员卡统计" name="one"><one :store_select="store_select"></one></el-tab-pane>
      <el-tab-pane label="有效会员卡" name="two"><two :store_select="store_select" :people_select="people_select" @member="member" ref="tabstwo"></two></el-tab-pane>
      <el-tab-pane label="过期会员卡" name="three"><three :store_select="store_select" :people_select="people_select" @member="member" ref="tabsthree"></three></el-tab-pane>
      <el-tab-pane label="会员资料" name="four" disabled><huiyuanziliao :id="id" ref="tabsfour"></huiyuanziliao></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import one from "./Member_tongji/one.vue"
import two from "./Member_tongji/two.vue"
import three from "./Member_tongji/three.vue"
import huiyuanziliao from "./Member_tongji/huiyuanziliao.vue"
export default{
  name: "Member_tongji",
  components:{
    one,
    two,
    three,
    huiyuanziliao
  },
  data(){
    return{
      activeName: "one",
      store_select: [],
      people_select: [],
      id: "",
    }
  },
  methods:{
    tab_click: function(){
      if(this.activeName === "two"){
        this.$refs.tabstwo.handlePageChange();
      }
      else if(this.activeName === "three"){
        this.$refs.tabsthree.handlePageChange();
      }
    },
    member: function(s){
      this.activeName = "four";
      this.id = s;
      this.$refs.tabsfour.handlePageChange({id: s});
    },
  },
  created(){
    this.$axios.all([
      this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Common/getStoreSelect", {}, {withCredentials: true}),
      this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Common/getEmployeeSelect", {}, {withCredentials: true})
    ])
    .then((data)=>{
      this.store_select = data[0].data;
      this.people_select = data[1].data;
    })
    .catch((data)=>{
      this.$message.error("抱歉网络错误,请检查网络后重试！");
    })
  }
}
</script>

<style scoped>
</style>
