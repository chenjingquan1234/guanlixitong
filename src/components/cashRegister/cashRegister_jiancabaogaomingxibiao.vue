<template>
  <div id="cashRegister_jiancabaogaomingxibiao">
    <el-row type="flex">
      <el-col :span="3">
        <el-menu :default-active="activeIndex.toString()" class="el-menu-vertical-demo"
        background-color="#e6e6e6" text-color="#303030" active-text-color="#409eff">
          <el-menu-item v-for="value in menu" :key="value.check_type_id" :index="value.check_type_id.toString()" @click="menu_change(value.check_type_id)">
            <span>{{value.check_type_name}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <div class="pb-nav">
          <el-button size="mini" type="info" icon="el-icon-download" @click="download()">打印</el-button>
          <el-input size="mini" style="width: 20rem;" v-model="key_name" placeholder="可按姓名/车牌/单号/搜索"><label slot="prepend">关键字</label></el-input>
          <el-select size="mini" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
            <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
          </el-select>
          <el-button size="mini" type="primary" @click="search()">查询</el-button>
        </div>
        <el-row class="date">
          <el-col :span="8">
            <el-divider direction="vertical"></el-divider>
            <div style="color: #ffffff; display: flex; flex-direction: column; align-items: center;">
              <h1 style="line-height: 140px">{{show_title.fine_num}}</h1>
              <label>良好</label>
            </div>
          </el-col>
          <el-col :span="8">
            <el-divider direction="vertical"></el-divider>
            <div style="color: #ffffff; display: flex; flex-direction: column; align-items: center;">
              <h1 style="line-height: 140px">{{show_title.potential_num}}</h1>
              <label>未检查/不合格</label>
            </div>
          </el-col>
          <el-col :span="8">
            <el-divider direction="vertical"></el-divider>
            <div style="color: #ffffff; display: flex; flex-direction: column; align-items: center;">
              <h1 style="line-height: 140px">{{show_title.unfine_num}}</h1>
              <label>潜在</label>
            </div>
          </el-col>
        </el-row>

        <vxe-table size="mini" align="center" height="500" ref="mytable" highlight-hover-row highlight-current-row border
        class="mytable"
        :data="tableData"
        :loading="loading"
        :cell-style="cellStyle"
        :expand-config="{lazy: true, loadMethod: loadContentMethod, iconOpen: 'vxe-icon--caret-bottom', iconClose: 'vxe-icon--edit-outline'}">
          <vxe-table-column type="expand" title="潜在详情" width="100">
            <template v-slot:content="{row}">
              <vxe-table size="mini" align="center" height="200" ref="qianzai" highlight-hover-row highlight-current-row border
              class="mytable"
              :data="tableData_qianzai">
                <vxe-table-column v-for="value in tableTitle_qianzai" :key="value.key" :field="value.key" :title="value.title" :width="value.width"></vxe-table-column>
              </vxe-table>
            </template>
          </vxe-table-column>
          <vxe-table-column v-for="value in tableTitle1" :key="value.key" :field="value.key" :title="value.title" :min-width="value.min_width">
            <template v-if="value.key === 'remark'" v-slot="{row}">
              <label>{{row.remark}}</label>
              <el-button v-for="(value, key) in row.imgList" :key="key" size="mini" type="text" @click="show_img(value)">图片{{key}}</el-button>
            </template>
          </vxe-table-column>
          <vxe-table-column v-for="value in tableTitle2" :key="value.id" :title="value.check_even_name" min-width="100">
            <vxe-table-column v-for="values in value.children" :key="values.id" :field="'order_detail['+values.key+'].status'" :title="values.check_even_name" min-width="100"></vxe-table-column>
          </vxe-table-column>
        </vxe-table>
        <!-- 分页器 -->
        <vxe-pager
          size="mini"
          perfect
          :loading="loading"
          :pager-count="5"
          :current-page="tablePage.currentPage"
          :page-size="tablePage.pageSize"
          :total="tablePage.totalResult"
          :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
          @page-change="handlePageChange">
        </vxe-pager>
      </el-col>
    </el-row>
    
    <el-dialog :visible.sync="dialog">
      <img width="100%" :src="img" alt="图片错误">
    </el-dialog>
  </div>
</template>

<script>
export default{
  name: "cashRegister_jiancabaogaomingxibiao",
  data(){
    return{
      activeIndex: "",
      menu: [],
      url: this.$store.state.domainName_http+"/StoreAdmin/Report/getReport",
      tableTitle1: [
        {key: "order_num", title: "单号", min_width: "100"},
        {key: "create_time", title: "检查时间", min_width: "100"},
        {key: "ename", title: "检查人", min_width: "100"},
        {key: "type", title: "检查来源", min_width: "100"},
        {key: "name", title: "客户名称", min_width: "100"},
        {key: "tel", title: "手机", min_width: "100"},
        {key: "car", title: "车牌", min_width: "100"},
        {key: "p_chexingmingcheng", title: "品牌车型", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"}
      ],
      tableTitle2: [],
      tableData: [],
      tableData_qianzai: [],
      tableTitle_qianzai: [
        {key: "name", title: "项目名称", width: "400"},
        {key: "price", title: "报价", width: "400"},
        {key: "intention", title: "意向度", width: "400"},
        {key: "expect_time", title: "预计消费", width: "400"},
      ],
      num: 0,
      dialog: false,
      img: "",
      tablePage: {
        currentPage: 1,//当前页
        pageSize: 20,//当前页数据
        totalResult: 0//总数据
      },
      loading: false,
      //数据
      key_name: "",
      store_name: "",
      store_select: [],
      show_title: []
    }
  },
  methods:{
    store_change: function(s){
      this.store_name = s;
    },
    download: function(){
      this.$refs.mytable.exportData({type: "csv"});
    },
    search: function(){
      console.log(this.activeIndex)
      this.findList(this.url, {check_type_id: this.activeIndex, search: this.key_name, sid: this.store_name});
    },
    menu_change: function(s){
      
      this.activeIndex = s;
      this.num = 0;
      this.$axios.all([
        this.$api.HttpPost("/StoreAdmin/Repair/getRepairCheckEventList", {check_type_id: s}),
        this.$api.HttpPost("/StoreAdmin/Report/getDetails", {check_type_id: s})
      ])
      .then((data)=>{
        this.tableTitle2 = data[0].data.data;
        this.show_title = data[1].data.data;
        for(let i in this.tableTitle2){
          for(let j in this.tableTitle2[i].children){
            this.tableTitle2[i].children[j].status = "";
            this.tableTitle2[i].children[j].key = this.num;
            this.num = this.num + 1;
          }
        }
        this.search();
      })
    },
    loadContentMethod: function({row}){
      return new Promise((resolve)=>{
        setTimeout(()=>{
          this.$api.HttpPost("/StoreAdmin/Report/getPotentialDetail", {order_id: row.order_id})
          .then((data)=>{
            this.tableData_qianzai = data.data.data;
          })
          resolve();
        }, 500)
      });
    },
    show_img(row){
      this.$api.HttpPost("/StoreAdmin/Common/getOssPath", {})
      .then((data)=>{
        this.dialog = true;
        this.img = data.data + row;
      })
    },
    cellStyle: function({row, rowIndex, column, columnIndex}){
      if(columnIndex > this.tableTitle1.length && (this.tableTitle1.length + row.order_detail.length > columnIndex)){
        if(row.order_detail.length != 0 &&  row.order_detail[columnIndex - this.tableTitle1.length - 1].is_check == 1){
          return {color: "red"}
        }
      }
    },
    findList: function(url, ...search){
      this.loading = true;
      search[0].page = this.tablePage.currentPage;
      search[0].quantity = this.tablePage.pageSize;
      this.$axios.post(url, search[0], {withCredentials: true})
      .then((data)=>{
        this.tableData = data.data.data.data;
        for(let i in this.tableData){
          this.tableData[i].car = this.tableData[i].plate_id + this.tableData[i].license_plate_number;
          for(let j in this.tableData[i].order_detail){
            if(this.tableData[i].order_detail[j].status == 1){
              this.tableData[i].order_detail[j].status = "良好";
            }
            else if(this.tableData[i].order_detail[j].status == 2){
              this.tableData[i].order_detail[j].status = "待检查/不合格";
            }
            else{
              this.tableData[i].order_detail[j].status = "未检查";
            }
            if(this.tableData[i].order_detail.length !== 0 && this.tableData[i].order_detail[j].is_check == 1){
              this.tableData[i].order_detail[j].status = this.tableData[i].order_detail[j].status + "(潜在)";
            }
          }
        }
        this.loading = false;
        // console.log(this.tableData)
      })
      .catch((data)=>{
        this.loading = false;
      })
    },
    handlePageChange: function({currentPage, pageSize}){
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.search();
    }
  },
  created(){
    this.$axios.all([
      this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {}),
      this.$api.HttpPost("/StoreAdmin/Repair/getRepairCheckTypeSelect", {})
    ])
    .then((data)=>{
      this.store_select = data[0].data;
      this.menu = data[1].data.data;
      this.activeIndex = this.menu[0].check_type_id;
      this.menu_change(this.activeIndex);
    })
  }
}
</script>

<style scoped>
.el-menu{
  position: fixed;
  height: 100%;
}
.el-menu-vertical-demo{
  width: 100%;
  max-width: 200px;
}
.pb-nav{
  margin: 1rem auto;
}
.date{
  margin: 10px;
  height: 200px;
  background-color: #6699ff;
}
.el-divider{
  float: left;
  margin: 20px auto;
  height: 160px;
}
.mytable{
  margin-top: 10px;
  width: 100%;
  box-shadow: 5px 5px 20px #dcdfe6;
}
</style>
