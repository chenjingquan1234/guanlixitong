<template>
	<div id="daolujiuyuan">
    <el-select size="mini" v-model="store_name" placeholder="所属门店" clearable @change="store_change">
      <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
    </el-select>
    <el-select size="mini" v-model="status_name" placeholder="状态" clearable @change="status_change">
      <el-option v-for="value in status_select" :key="value.id" :label="value.status_name" :value="value.id"></el-option>
    </el-select>
    <el-button size="mini" type="primary" @click="search()">查询</el-button>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation_del="operation_del" :operation_="operation_" :operation_mod_name="operation_mod_name" :operation_name="operation_name"
    @modify="modify" @operat="operat" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>

    <Dialog ref="cl_dialog" width="30%" @enter="enter">
      <template>
        <el-select style="width: 100%;" size="mini" v-model="people_name" placeholder="请选择处理员工" clearable @change="people_change">
          <el-option v-for="value in people_select" :key="value.eid" :label="value.name" :value="value.eid"></el-option>
        </el-select>
        <el-input style="width: 100%;" v-model="remark" size="mini" type="text" placeholder="备注"></el-input>
      </template>
    </Dialog>
    <Dialog ref="xq_dialog" :footer="footer">
      <template>
      <baidu-map style="width: 100%; height: 400px;"
        :ak="ak"
        :scroll-wheel-zoom="true"
        :center="center"
        :zoom="zoom"
        @moving="syncCenterAndZoom"
        @moveend="syncCenterAndZoom"
        @zoomend="syncCenterAndZoom">
        <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-navigation>
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
        <bm-local-search :keyword="map_address" :auto-viewport="true"></bm-local-search>
      </baidu-map>
      </template>
    </Dialog>
	</div>
</template>

<script>
import mytable from "./../mytable.vue"
import Dialog from "./Dialog.vue"
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch.vue'
import BmNavigation from 'vue-baidu-map/components/controls/Navigation.vue'
import BmGeolocation from 'vue-baidu-map/components/controls/Geolocation.vue'
export default{
	name: "daolujiuyuan",
  components:{
    mytable,
    Dialog,
    BaiduMap,
    BmLocalSearch,
    BmNavigation,
    BmGeolocation
  },
	data(){
		return{
      store_name: "",
      store_select: [],
      status_name: "",
      status_select: [
        {id: 0, status_name: "未处理"},
        {id: 1, status_name: "已处理"}
      ],
      people_name: "",
      people_select: [],
      tableTitle: [
        {key: "name", title: "客户姓名", min_width: "100"},
        {key: "tel", title: "联系电话", min_width: "100"},
        {key: "chepai", title: "车牌号", min_width: "100"},
        {key: "contact_name", title: "联系人姓名", min_width: "100"},
        {key: "member_remark", title: "客户备注", min_width: "100"},
        {key: "address", title: "地址", min_width: "100"},
        {key: "create_time", title: "时间", min_width: "100"},
        {key: "store_name", title: "所属门店", min_width: "100"},
        {key: "staff_name", title: "处理员工", min_width: "100"},
        {key: "staff_remark", title: "员工备注", min_width: "100"},
        {key: "status", title: "状态", min_width: "100"},
      ],
      tableData: [],
      operation_del: false,
      operation_: true,
      operation_mod_name: "处理",
      operation_name: "地址详情",
      //
      footer: false,
      dialog_id: "",
      remark: "",
      ak: "VckhyKavBV8UB2jzyExnrLPHmzdQewVk",
      map_address: "",
      center: {lng: 113.32, lat: 23.02},
      zoom: 15
		}
	},
  methods:{
    store_change(s){
      this.store_name = s;
    },
    status_change(s){
      this.status_name = s;
    },
    people_change(s){
      this.people_name = s;
    },
    search(){
      this.handlePageChange();
    },
    enter(){
      this.$api.HttpPost("/storeadmin/rescue/dispose", {id: this.dialog_id, staff_id: this.people_name, staff_remark: this.remark})
      .then((data)=>{
        if(data.data.code === 200){
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    modify(row){
      this.people_name = "";
      this.remark = "";
      this.$refs.cl_dialog.init();
    },
    operat(row){
      this.$refs.xq_dialog.init();
      this.center = {lng: row.row.longitude, lat: row.row.latitude};
    },
    resData(data){
      this.tableData = data;
    },
    handlePageChange(data){
      if(data === undefined){data = {sid: this.store_name}}
      this.$refs.mytable.findList(this.$api.yuming + "/storeadmin/rescue/getRescueList", data);
    },
    syncCenterAndZoom(e){
      const {lng, lat} = e.target.getCenter();
      this.center.lng = lng;
      this.center.lat = lat;
      this.zoom = e.target.getZoom();
    },
  },
  mounted(){
    this.$axios.all([
      this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {}),
      this.$api.HttpPost("/StoreAdmin/Common/getEmployeeSelect", {})
    ])
    .then((data)=>{
      this.store_select = data[0].data;
      this.people_select = data[1].data;
    })
    this.handlePageChange();
  }
}
</script>

<style scoped>
#daolujiuyuan{
  margin: 1rem 5rem;
}
</style>
