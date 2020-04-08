<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleTabChange">
      <el-tab-pane label="欠账图表" name="first"> <First :store_select="store_select" ref="first" /></el-tab-pane>
      <el-tab-pane label="挂账单位" name="second"><Second :store_select="store_select" ref="second" /></el-tab-pane>
      <el-tab-pane label="期初欠款" name="third"><Third :store_select="store_select" ref="third" /></el-tab-pane>
      <el-tab-pane label="挂账明细" name="fourth"><Fourth :store_select="store_select" ref="fourth" /></el-tab-pane>
      <el-tab-pane label="还款记录" name="fifth"><Fifth :store_select="store_select" ref="fifth" /></el-tab-pane>
      <!-- <el-tab-pane label="视频帮助" name="vvv"><First/></el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import First from "./Finance_baozhangyinshou/First"
import Second from "./Finance_baozhangyinshou/Second"
import Third from "./Finance_baozhangyinshou/Third"
import Fourth from "./Finance_baozhangyinshou/Fourth"
import Fifth from "./Finance_baozhangyinshou/Fifth"

export default {
  name: "Finance_baozhangyinshou",
  components: {
      First,
      Second,
      Third,
      Fourth,
      Fifth
  },
  data() {
    return {
        activeName: "first",
        store_select: []
    }
  },
  mounted() {
     // 获取门店列表
    this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect").then(v => {
      this.store_select = v.data
    });
  },
  methods: {
    handleTabChange(val) {
      console.log(val)
      switch(val.name) {
        case "first":
          this.$refs.first.handleStore()
          break;
        case "second":
          this.$refs.second.search_outer()
          break;
        case "third":
          this.$refs.third.search()
          break;
        case "fourth":
          this.$refs.fourth.search()
          break;
        case "fifth":
          this.$refs.fifth.search()
          break;
      }
    },
    // 获取客户信息
    // handleGetMemberSelect(val) {
    //   const {search, page, quantity} = val
    //   const data = {search, page, quantity}
    //   this.$axios.post("StoreAdmin/Credit/getMemberSelect", data)
    //   .then((v) => {
    //     console.log(v)
    //     let res = v.data
    //     if(res.code == 200) {
    //       let data = res.data
    //       this.GetMemberSelectArr = data.data
    //     }
    //   })
    //   this.visible = !this.visible
    // },
  }
};
</script>

<style scoped>

</style>
