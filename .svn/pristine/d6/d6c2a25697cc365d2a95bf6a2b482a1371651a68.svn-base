<template>
  <div id="one">
    <el-row style="margin: 1rem 0;">
      <el-col :span="6">
        <div style="background: #00bd0b; border-radius: 1rem; width: 300px; height: 500px;">
          <el-upload :action="this.$api.yuming+'/StoreAdmin/Common/uploadImg'" :show-file-list="false"
          :before-upload="zf_before_upload" :http-request="http_wx_img">
            <el-button size="mini" type="success" plain icon="el-icon-upload">上传微信二维码</el-button>
          </el-upload>
          <el-image :src="show_wx_img"></el-image>
        </div>
      </el-col>
      <el-col :span="6">
        <div style="background: #00adef; border-radius: 1rem; width: 300px; height: 500px;">
          <el-upload :action="this.$api.yuming+'/StoreAdmin/Common/uploadImg'" :show-file-list="false"
          :before-upload="zf_before_upload" :http-request="http_zfb_img">
            <el-button size="mini" type="primary" plain icon="el-icon-upload">上传支付宝二维码</el-button>
          </el-upload>
          <el-image :src="show_zfb_img"></el-image>
        </div>
      </el-col>
    </el-row>
    <el-button size="mini" type="danger" plain @click="loading()">确认</el-button>
    <label style="color: red;">(请务必点击确认,不然无法保存成功!)</label>
  </div>
</template>

<script>
export default{
	name: "one",
	data(){
		return{
      wx_img: "",
      show_wx_img: "",
      zfb_img: "",
      show_zfb_img: "",
		}
	},
  methods:{
    zf_before_upload(file){
      this.$api.img_before_upload(file);
    },
    http_wx_img(file){
      this.wx_img = "";
      this.$api.img_upload(file)
      .then((data)=>{
        this.wx_img = data.data;
        this.http_wx();
      })
    },
    http_zfb_img(file){
      this.zfb_img = "";
      this.$api.img_upload(file)
      .then((data)=>{
        this.zfb_img = data.data;
        this.http_zfb();
      })
    },
    http_wx(){
      this.$api.HttpPost("/StoreAdmin/Common/getOssPath", {file: this.wx_img})
      .then((data)=>{
        this.show_wx_img = data.data + this.wx_img;
      })
    },
    http_zfb(){
      this.$api.HttpPost("/StoreAdmin/Common/getOssPath", {file: this.zfb_img})
      .then((data)=>{
        this.show_zfb_img = data.data + this.zfb_img;
      })
    },
    loading(){
      this.$api.HttpPost("/Storeadmin/Group/updateQrcode", {wechat_qrcode: this.wx_img, alipay_qrcode: this.zfb_img})
      .then((data)=>{
        if(data.data.code === 200){
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    }
  },
  mounted(){
    this.$api.HttpPost("/Storeadmin/Group/qrcode", {})
    .then((data)=>{
      this.wx_img = data.data.data.wechat_qrcode;
      this.zfb_img = data.data.data.alipay_qrcode;
      this.http_wx();
      this.http_zfb();
    })
  }
}
</script>

<style scoped>
.el-image{
  background:#ffffff;
  width: 150px;
  height: 150px;
  border-radius: 10px;
  margin: 125px 75px;
}
</style>
