<template>
  <div id="one">
    <el-divider content-position="left">施工单自定义备注设置</el-divider>
    <el-input v-model="remark" size="mini" type="textarea" rows="5"></el-input>
    <el-divider content-position="left">二维码上传</el-divider>
    <el-upload :action="this.$api.yuming+''" :limit="1" list-type="picture" :file-list="imgList"
    :on-preview="handlePictureCardPreview" :before-upload="before_upload" :http-request="http_img">
      <el-button size="mini" type="success" plain round>上传</el-button>
    </el-upload>
    <el-button style="margin-top: 1rem;" size="mini" type="primary" @click="enter()">确定</el-button>

    <el-dialog :visible.sync="dialog">
      <img width="100%" :src="img_url" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default{
	name: "one",
	data(){
		return{
      remark: "",
      dialog: false,
      img: "",
      imgList: [],
      img_url: "",
		}
	},
  methods:{
    before_upload(file){
      this.$api.img_before_upload(file);
    },
    http_img(file){
      this.img = [];
      this.$api.img_upload(file)
      .then((data)=>{
        this.img = data.data;
      })
    },
    handlePictureCardPreview(file){
      this.$api.HttpPost("/StoreAdmin/Common/getOssPath", {file: this.img})
      .then((data)=>{
        this.img_url = data.data + this.img;
        this.dialog = true;
      })
    },
    enter(){
      this.$api.HttpPost("/storeadmin/repair/setPrint ", {construction_remark: this.remark, qrcode: this.img})
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
    this.$api.HttpPost("/storeadmin/repair/getPrintSettingDetail", {})
    .then((data)=>{
      this.remark = data.data.data.construction_remark;
      this.img = data.data.data.qrcode;
      this.imgList.splice(0, 0, {name: "img", url: data.data.data.qr_code});
    })
  }
}
</script>

<style scoped>
</style>
