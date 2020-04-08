<template>
  <div>
    <div class="left-content" style="padding:20px 50px">
        <el-tabs v-model="activeName"  tab-position="left" >
          <el-tab-pane label="新增商品" name="one"><shangpintianjia/></el-tab-pane>
          <el-tab-pane label="商品管理" name="two"><shangpinguanli/></el-tab-pane>
          <el-tab-pane label="商品分类" name="three"><shangpinfenlei/></el-tab-pane>
          <el-tab-pane label="商品评论" name="four">商品评论</el-tab-pane>
        </el-tabs>
    </div>
  </div>
</template>

<script>
import shangpintianjia from "./shopping_shangpingguoli/shangpintianjia"
import shangpinguanli from "./shopping_shangpingguoli/shangpinguanli"
import shangpinfenlei from "./shopping_shangpingguoli/shangpinfenlei"
export default {
  name: "shopping_shangpingguoli",
  data() {
    return {
      activeName: ""
    };
  },
  components: {
    shangpintianjia,
    shangpinguanli,
    shangpinfenlei
  },
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
/deep/ .el-tabs__content  {
  height: 85vh ; 
  overflow:auto
}
.left-content {

}
</style>