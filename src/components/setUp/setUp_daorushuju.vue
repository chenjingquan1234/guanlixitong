<template>
  <div id="setUp_daorushuju">
    <el-tabs type="border-card" tab-position="left" v-model="activeName">
      <el-tab-pane label="导入/导出客户资料" name="one">
        <el-upload :action="this.$api.yuming+'/storeadmin/Import/memberImport'" :show-file-list="false"
        :before-upload="before_upload" :http-request="http_csv">
          <el-button size="mini" type="primary" plain>数据导入</el-button>
        </el-upload>
        <div>
          <label style="color: green;">成功导入条数: {{success_data}} </label>
          <label style="color: red;">失败条数: {{error_data}}</label>
        </div>
        <el-button size="mini" type="success" plain  @click="downloads">数据导出</el-button>
        <div>
          <label style="color: green;">成功导出条数: {{success_data}} </label>
          <label style="color: red;">失败条数: {{error_data}}</label>
        </div>
        <el-button size="mini" type="info" plain  @click="download">模板下载</el-button>
        <h4>导入客户资料步骤以及注意事项：</h4>
        <p>1、先下载模版，按模版来填写</p>
        <p>2、手机号、车牌号、所属分店是必填项(名称需和系统里门店管理名称一致)，其他的资料可根据自己的需求填写</p>
        <p>3、在导入表格前，我们需要核对数据是否有重复数据，以免导入进去发现会员数量不匹配</p>
        <p>4、导入的会员数据过程可能会比较慢，请注意不要点击两次</p>
      </el-tab-pane>

      <el-tab-pane label="导入/导出库存商品" name="three" >
        <el-upload :action="this.$api.yuming+'storeadmin/import/importProductInventory'" :show-file-list="false"
        :before-upload="before_upload" :http-request="http_csv">
          <el-button size="mini" type="primary" plain>数据导入</el-button>
        </el-upload>
        <div>
          <label style="color: green;">成功导入条数: {{success_data}} </label>
          <label style="color: red;">失败条数: {{error_data}}</label>
        </div>
        <el-button size="mini" type="success" plain  @click="downloads">数据导出</el-button>
        <div>
          <label style="color: green;">成功导出条数: {{success_data}} </label>
          <label style="color: red;">失败条数: {{error_data}}</label>
        </div>
        <el-button size="mini" type="info" plain  @click="download">模板下载</el-button>
        <h4>导入库存商品步骤以及注意事项：</h4>
        <p>1、条形码、商品名称、单位、一级分类、门店都是必填项。二级分类可写可不写。条形码可以自己定义</p>
        <p>2、因汽车维修配件商品名称大多相同，所以可以填写规格来区分商品</p>
        <p>3、填写对应商品的数量、成本、仓库及其售价。售价可以写0、到时候可以通过系统修改</p>
        <p>4、每一次导入请到库存设置查看是否导入成功，避免重复导入</p>
      </el-tab-pane>

      <el-tab-pane label="导入/导出服务项目信息" name="four" >
        <el-upload :action="this.$api.yuming+'/storeadmin/Customer/import'" :show-file-list="false"
        :before-upload="before_upload" :http-request="http_csv">
          <el-button size="mini" type="primary" plain>数据导入</el-button>
        </el-upload>
        <div>
          <label style="color: green;">成功导入条数: {{success_data}} </label>
          <label style="color: red;">失败条数: {{error_data}}</label>
        </div>
        <el-button size="mini" type="success" plain  @click="downloads">数据导出</el-button>
        <div>
          <label style="color: green;">成功导出条数: {{success_data}} </label>
          <label style="color: red;">失败条数: {{error_data}}</label>
        </div>
        <el-button size="mini" type="info" plain  @click="download">模板下载</el-button>
        <h4>导入服务项目步骤以及注意事项：</h4>
        <p>1、先下载模版，按模版来填写</p>
        <p>2、商品名称、单位、一级分类、门店都是必填项。编码、二级分类可写可不写</p>
        <p>3、同样不能点击两次确定，会导致项目重复</p>
      </el-tab-pane>

   
    </el-tabs>
  </div>
</template>

<script>
export default{
	name: "setUp_daorushuju",
	data(){
		return{
      activeName: "one",
      success_data: 0,
      error_data: 0,
		}
	},
  methods:{
    before_upload(file){
      this.$api.file_before_upload(file);
    },
    http_csv(file){
      switch(this.activeName){
        case "one":{
          let url = "/storeadmin/Import/memberImport";
          this.$api.file_upload(file, url)
          .then((data)=>{
            if(data.data.code === 200){
              this.success_data = data.data.data.success;
              this.error_data = data.data.data.error;
            }
            else{
              this.$message.warning("未知错误,请重新导入");
            }
          })
          break;
        }
        case "two":{
          let url = "";
          this.$api.file_upload(file, url);
          break;
        }
        case "three":{
         let url = "/storeadmin/import/importProductInventory";
          this.$api.file_upload(file, url)
          .then((data)=>{
            if(data.data.code === 200){
              this.success_data = data.data.data.success;
              this.error_data = data.data.data.error;
            }
            else{
              this.$message.warning("未知错误,请重新导入");
            }
          })
          break;
        }
        case "four":{
          let url = "/storeadmin/import/importService";
          this.$api.file_upload(file, url)
          .then((data)=>{
            if(data.data.code === 200){
              this.success_data = data.data.data.success;
              this.error_data = data.data.data.error;
            }
            else{
              this.$message.warning("未知错误,请重新导入");
            }
          })
          break;
        }
        case "five":{
          let url = "";
          this.$api.file_upload(file, url);
          break;
        }
      }
    },
    downloads(){
      switch(this.activeName){
        case "one":{
          window.location.href = this.$api.yuming + "/storeadmin/Client/getCustomerData";
          break;
        }
        case "two":{
          window.location.href = this.$api.yuming + "/static/template/kehu.xls";
          break;
        }
        case "three":{
          window.location.href = this.$api.yuming + "/storeadmin/inventory/getProductData";
          break;
        }
        case "four":{
          window.location.href = this.$api.yuming + "/storeadmin/Service/getServiceData";
          break;
        }
        case "five":{
          window.location.href = this.$api.yuming + "/static/template/kehu.xls";
          break;
        }
      }
    },
    download(){
      switch(this.activeName){
        case "one":{
          window.location.href = this.$api.yuming + "/static/template/kehu.xls";
          break;
        }
        case "two":{
          window.location.href = this.$api.yuming + "/static/template/kehu.xls";
          break;
        }
        case "three":{
          window.location.href = this.$api.yuming + "/storeadmin/import/getProductTemplate";
          break;
        }
        case "four":{
          window.location.href = this.$api.yuming + "/storeadmin/import/getServiceTemplate";
          break;
        }
        case "five":{
          window.location.href = this.$api.yuming + "/static/template/kehu.xls";
          break;
        }
      }
    }
  }
}
</script>

<style scoped>
#setUp_daorushuju{
  margin: 1rem 5rem;
}
</style>
