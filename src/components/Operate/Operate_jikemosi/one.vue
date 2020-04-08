<template>
  <div id="Operate_jikemosiOne">
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
      <el-tab-pane label="批量设置返利" name="one">
        <el-card style="width: 20rem;" shadow="hover">
          <div slot="header">
            <label>人脉等级</label>
            <label style="float: right;">返利比例</label>
          </div>
          <el-input v-for="value in list" :key="value.key" v-model="value.model">
            <label slot="prepend">{{value.name}}</label>
          </el-input>
        </el-card>
        <el-divider></el-divider>
        <el-card style="width: 20rem;" shadow="hover">
          <center slot="header">分享二维码 新用户首次关注</center>
          <el-input v-model="share_money">
            <label slot="prepend">分享者可获得</label>
            <label slot="append">元</label>
          </el-input>
          <el-input disabled>
            <label slot="prepend">
              <label>是否自动充值到会员卡</label>
              <el-radio v-model="is_member" label="1">是</el-radio>
              <el-radio v-model="is_member" label="0">否</el-radio>
            </label>
          </el-input>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="系统返利设置" name="two">
        <el-select size="small" v-model="store_name" clearable placeholder="所属门店">
          <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
        </el-select>
        <el-divider></el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <label style="color: #315a6e; font-weight: 550;">设置类型返利比例</label>
            <mytable :tableTitle="tableTitle1" :tableData="tableData1" :operation_mod="operation_mod" :operation_del="operation_del" :operation_="operation_" :operation_name="operation_name" :paging="paging"
            @operat="operat" ref="mytable1"></mytable>
          </el-col>
          <el-col :span="12">
            <label style="color: #315a6e; font-weight: 550;">设置特殊商品返利比例</label>
            <vxe-table size="mini" align="center" height="500" ref="mytable2" class="mytable"
            highlight-hover-row
            highlight-current-row
            border
            :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
            :data="tableData2">
              <vxe-table-column field="name" title="商品/项目" min-width="100">
                <template v-slot="{row, column}">
                  <el-select size="small" clearable><el-option style="height: 400px; overflow: auto;"><template v-slot="{row, column}">
                    <mytable :tableTitle="tableTitle1" :tableData="tableData1" :operation="operation" :height="300"
                    @cell_click="cell_click" @resData="resData" @handlePageChange="handlePageChange" @operat="operat" ref="mytable1"></mytable>
                  </template></el-option></el-select>
                </template>
              </vxe-table-column>
              <vxe-table-column v-for="value in tableTitle2" :key="value.key" :field="value.key" :title="value.title" :min-width="value.min_width" :edit-render="value.edit"></vxe-table-column>
              <vxe-table-column title="操作" min-width="150">
                <template slot-scope="scope">
                  <el-button size="small" type="text" @click="modify(scope)">添加</el-button>
                  <el-button style="color: red;" size="small" type="text" @click="del(scope)">删除</el-button>
                </template>
              </vxe-table-column>
            </vxe-table>
            <div style="text-align: center;"><el-button style="margin: 2rem auto;" size="mini" type="primary" round>确定</el-button></div>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="微信返利设置" name="three">
        <el-row :gutter="20">
          <el-col :span="12">
            <label style="color: #315a6e; font-weight: 550;">设置类型返利比例</label>
            <mytable :tableTitle="tableTitle1" :tableData="tableData1" :operation_mod="operation_mod" :operation_del="operation_del" :operation_="operation_" :operation_name="operation_name" :paging="paging"
            @operat="operat" ref="mytable1"></mytable>
          </el-col>
          <el-col :span="12">
            <label style="color: #315a6e; font-weight: 550;">设置特殊商品返利比例</label>
            <vxe-table size="mini" align="center" height="500" ref="mytable2" class="mytable"
            highlight-hover-row
            highlight-current-row
            border
            :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
            :data="tableData2">
              <vxe-table-column field="name" title="商品/项目" min-width="100">
                <template v-slot="{row, column}">
                  <el-select size="small" clearable><el-option style="height: 400px; overflow: auto;"><template v-slot="{row, column}">
                    <mytable :tableTitle="tableTitle1" :tableData="tableData1" :operation="operation" :height="300"
                    @cell_click="cell_click" @resData="resData" @handlePageChange="handlePageChange" @operat="operat" ref="mytable1"></mytable>
                  </template></el-option></el-select>
                </template>
              </vxe-table-column>
              <vxe-table-column v-for="value in tableTitle2" :key="value.key" :field="value.key" :title="value.title" :min-width="value.min_width" :edit-render="value.edit"></vxe-table-column>
              <vxe-table-column title="操作" min-width="150">
                <template slot-scope="scope">
                  <el-button size="small" type="text" @click="modify(scope)">添加</el-button>
                  <el-button style="color: red;" size="small" type="text" @click="del(scope)">删除</el-button>
                </template>
              </vxe-table-column>
            </vxe-table>
            <div style="text-align: center;"><el-button style="margin: 2rem auto;" size="mini" type="primary" round>确定</el-button></div>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="分销模式" name="four" disabled>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
	name: "Operate_jikemosiOne",
  components: {
    mytable
  },
	data(){
		return{
      activeName: "one",
      list: [
        {key: 1, name: "第一等级", model: ""},
        {key: 2, name: "第二等级", model: ""},
        {key: 3, name: "第三等级", model: ""}
      ],
      is_member: "0",
      share_money: "",
      store_name: "",
      store_id: "",
      store_select: [],
      tableTitle1: [
        {key: "", title: "类型名称", min_width: "100"},
        {key: "", title: "一级返利", min_width: "100"},
        {key: "", title: "二级返利", min_width: "100"},
        {key: "", title: "三级返利", min_width: "100"},
      ],
      tableTitle2: [
        {key: "", title: "一级返利", min_width: "100", edit: {name: 'input', autoselect: true}},
        {key: "", title: "二级返利", min_width: "100", edit: {name: 'input', autoselect: true}},
        {key: "", title: "三级返利", min_width: "100", edit: {name: 'input', autoselect: true}},
      ],
      tableData1: [
        {},{},{},{},{}
      ],
      tableData2: [
        {}
      ],
      paging: false,
      operation: false,
      operation_mod: false,
      operation_del: false,
      operation_: true,
      operation_name: "设置"
		}
	},
  methods: {
    tabClick: function(s){
      console.log(s)
    },
    operat: function(row){

    },
    modify: function(row){

    },
    del: function(row){

    },
    cell_click: function(row){

    },
    resData: function(data){

    },
    handlePageChange: function(data){

    }
  },
  mounted(){
    this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Common/getStoreSelect", {}, {withCredentials: true})
    .then((data)=>{
      this.store_select = data.data;
    })
  }
}
</script>

<style scoped>
.el-tab-pane{
  margin: 1rem 5rem;
}
.mytable{
  margin-top: 10px;
  width: 100%;
  box-shadow: 5px 5px 20px #dcdfe6;
}
/deep/ .el-card__body{
  padding: 0;
}
</style>
