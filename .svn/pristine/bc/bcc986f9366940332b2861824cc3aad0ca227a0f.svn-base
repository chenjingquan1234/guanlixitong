<!--  -->
<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleTabChange" style="margin-left:10px">
    <el-tab-pane label="毛利统计" name="first"><first :store_select="store_select" ref="first" /></el-tab-pane>
    <el-tab-pane label="毛利报表" name="second"><second :store_select="store_select" ref="second" /></el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import first from "./Finance_maolitongji/First"
import second from "./Finance_maolitongji/Second"

export default {
  components: {
    first,
    second
  },
  data() {
    return {
      store_select:[],
      activeName:"first"
    };
  },
  mounted() {
      // 获取门店列表
    this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", ).then(v => {
      this.store_select = v.data
    });
  },
  methods: {
     handleTabChange(val) {
      switch(val.name) {
        case "first":
          this.$refs.first.search(0)
          break;
        case "second":
          this.$refs.second.search(0)
          break;
      }
    },
  }
};
</script>

<style scoped></style>
