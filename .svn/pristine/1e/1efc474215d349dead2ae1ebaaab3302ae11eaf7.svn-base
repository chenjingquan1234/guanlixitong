<template>
  <div id="help">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-collapse accordion>
          <el-collapse-item v-for="value in help_list" :key="value.key" :title="value.title">
            <div class="help" v-for="(values, key) in value.content" :key="key" @click="help_click(value.key, key)">{{values}}</div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col :span="20">
        <div v-if="help_p === 2 && help_q === 0">
          <el-steps :active="6" align-center>
            <el-step v-for="value in step_list" :key="value.method" :title="value.title" :description="value.description" @click.native="step(value.method)"></el-step>
          </el-steps>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default{
	name: "help",
	data(){
		return{
      help_list: [
        {key: 1, title: "智能门店", content: ["智能系统介绍"]},
        {key: 2, title: "新手上路", content: ["快速入手"]},
        {key: 3, title: "模块介绍", content: ["开单模块介绍", "会员模块介绍", "库存模块介绍", "员工模块介绍", "财务模块介绍", "运营模块介绍", "设置模块介绍"]},
        {key: 4, title: "APP使用教程", content: ["移动端APP全面教程"]},
        {key: 5, title: "常见问题", content: ["接车开单", "会员办卡", "设置"]}
      ],
      step_list: [
        {title: "登录", description: "", method: 1},
        {title: "添加店员", description: "店面管理=>店员管理", method: 2},
        {title: "添加客户", description: "客户管理=>客户资料", method: 3},
        {title: "添加服务项目", description: "系统设置=>服务项目", method: 4},
        {title: "添加商品", description: "库存管理=>库存设置", method: 5},
        {title: "接车开单", description: "开单管理=>接车开单", method: 6}
      ],
      help_p: "",
      help_q: "",

		}
	},
  watch:{

  },
  methods:{
    help_click(p, q){
      this.help_p = p;
      this.help_q = q;
    },
    step(key){
      switch(key){
        case 1:{
          this.$message.warning("提示 所有操作必须保持登录下执行");
          break;
        }
        case 2:{
          this.$router.push({path: "Achievements_yuangongguanli"});
          break;
        }
        case 3:{
          this.$router.push({path: "cashRegister_kehuziliao"});
          break;
        }
        case 4:{
          this.$router.push({path: "setUp_fuwuxiangmu"});
          break;
        }
        case 5:{
          this.$router.push({path: "Stock_jichushezhi"});
          break;
        }
        case 6:{
          this.$router.push({path: "cashRegister_weixiukaidan"});
          break;
        }
      }
    }
  }
}
</script>

<style scoped>
/deep/ .el-collapse-item__header{
  padding: 0 10px;
  border-radius: 5px;
  background: #315a6e;
  color: #ffffff;
}
.help{
  margin: 10px;
  border-bottom: 1px solid #315a6e;
  cursor: pointer;
}
.el-step{
  cursor: pointer;
}
</style>
