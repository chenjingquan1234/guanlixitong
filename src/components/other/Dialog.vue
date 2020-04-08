<template>
  <div id="Dialog">
    <el-dialog :title="title" :width="width" :fullscreen="fullscreen" :visible.sync="dialog" :close-on-click-modal="false" append-to-body>
      <slot></slot>
      <div v-if="footer" slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel">取 消</el-button>
        <el-button size="mini" type="primary" @click="enter">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default{
	name: "Dialog",
	data(){
		return{
      dialog: false
		}
	},
  props:{
    "title": {
      type: String,
      default: ""
    },
    "width": {
      type: String,
      default: ""
    },
    "fullscreen": {
      type: Boolean,
      default: false
    },
    "footer": {
      type: Boolean,
      default: true
    }
  },
  methods:{
    init(){
     this.dialog = true;
    },
    cancel(){
      this.dialog = false;
    },
    enter(){
      this.$emit("enter");
    }
  }
}
</script>

<style scoped>
</style>
