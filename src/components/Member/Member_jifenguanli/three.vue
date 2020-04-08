<template>
  <div id="three">
    <div class="pb-nav">
      <el-button size="mini" icon="el-icon-setting" @click="modify(null, 1)">添加</el-button>
      <el-button size="mini" icon="el-icon-delete" @click="del()">批量删除</el-button>
      <el-input size="mini" v-model="key_name" style="width: 25rem;"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_name_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :number="number" :operation_del="operation_del" @resData="resData" @modify="modify" @handlePageChange="handlePageChange" ref="mytable"></mytable>
    <!-- 弹出框 -->
    <el-dialog :visible.sync="dialog" :close-on-click-modal="false">
      <el-input size="mini" v-model="d.gift_name"><label slot="prepend">积分礼品名称</label></el-input>
      <el-input size="mini" disabled v-model="d.image">
        <label slot="prepend">微信显示图片</label>
        <el-upload slot="append" :action="this.$api.yuming+'/StoreAdmin/Common/uploadImg'" :show-file-list="false"
        :before-upload="before_upload" :http-request="wx_http_img">
          <el-button size="mini" type="success" plain>上传</el-button>
        </el-upload>
      </el-input>
      <el-input size="mini" v-model="d.gift_integral"><label slot="prepend">所需积分&#12288&#12288</label></el-input>
      <el-input type="textarea" v-model="d.content" placeholder="备注"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog=false">取 消</el-button>
        <el-button type="primary" @click="enter()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
  name: "three",
  components:{
    mytable
  },
  data(){
    return{
      key_name: "",
      store_name: "",
      store_id: "",
      store_name_select: [],
      //table 配置
      tableTitle: [
        {key: "gift_name", title: "名称", min_width: "200"},
        {key: "gift_integral", title: "所需积分", min_width: "200"},
        {key: "create_time", title: "发布时间", min_width: "200"}
      ],
      tableData: [],
      number: false,
      operation_del: false,
      dialog: false,
      //数据
      d: {
        gift_name: "",
        image: "",
        gift_integral: "",
        content: ""
      },
      add_type: "",
      id: "",
      del_id: []
    }
  },
  methods:{
    search: function(){
      this.handlePageChange({search: this.key_name, sid: this.store_id});
    },
    store_change: function(s){
      this.store_id = s;
    },
    before_upload(file){
      this.$api.img_before_upload(file);
    },
    wx_http_img(file){
      this.$api.img_upload(file)
      .then((data)=>{
        this.d.image = data.data;console.log(this.d.image)
      })
    },
    modify: function(scope, key){
      if(key == 1){
        this.d = {
          gift_name: "",
          image: "",
          gift_integral: "",
          content: ""
        };
        this.add_type = key;
        this.dialog = true;
      }
      else if(key == 2){
        this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Integral/getIntegralGiftDetail", {id: scope.row.id}, {withCredentials: true})
        .then((data)=>{
          if(data.data.code === 200){
            this.add_type = key;
            this.id = scope.row.id;
            this.d = data.data.data;
          }
          else{
            this.$message.error(data.data.msg);
          }
        })
        .catch((data)=>{
          this.$message.error("抱歉网络错误,请检查网络后重试！");
        })
        this.dialog = true;
      }
    },
    enter: function(){
      this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Integral/integralGiftEdit",
      {add_type: this.add_type,
      id: this.id,
      gift_name: this.d.gift_name,
      gift_integral: this.d.gift_integral,
      image: this.d.image,
      content: this.d.content}, {withCredentials: true})
      .then((data)=>{
        if(data.data.code === 200){
          this.dialog = false;
          this.handlePageChange({});
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
      .catch((data)=>{
        this.$message.error("抱歉网络错误,请检查网络后重试！");
      })
    },
    del: function(){
      let data = this.$refs.mytable.$refs.xTable.getSelectRecords();
      this.del_id = data.map((item)=>{return item["id"]});
      this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Integral/delIntegralGift", {id: this.del_id,}, {withCredentials: true})
      .then((data)=>{
        if(data.data.code === 200){
          this.handlePageChange({});
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
      .catch((data)=>{
        this.$message.error("抱歉网络错误,请检查网络后重试！");
      })
    },
    resData: function(data){
      this.tableData = data;
    },
    handlePageChange: function(data){
      if(data === undefined){data = {search: this.key_name, sid: this.store_id}}
      this.$refs.mytable.findList(this.$store.state.domainName_http+"/StoreAdmin/Integral/getIntegralGiftList", data);
    }
  },
  mounted(){
    this.handlePageChange({});
    this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Common/getStoreSelect", {}, {withCredentials: true})
    .then((data)=>{
        this.store_name_select = data.data;
    })
    .catch((data)=>{
      this.$message.error("抱歉网络错误,请检查网络后重试！");
    })
  }
}
</script>

<style scoped>
#three{
  margin: 1rem 5rem;
}
</style>
