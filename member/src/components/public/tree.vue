<template>
  <div id="tree">
    <div v-for="(value, key) in tree_data" :key="key" @click.stop="tree_http(value.id)">
      <center :class="{'tree': true, 'tree-children': value.level==0}" @click="clickTree(key)">{{value.classify_name}}
      <template v-if="value.children.length !== 0">
        <img v-if="thiskey===key" src="./../../../static/img/sgit.png" alt="error">
        <img v-if="thiskey!==key" src="./../../../static/img/git.png" alt="error">
      </template></center>
      <div v-if="thiskey===key">
        <tree :tree_data="value.children"></tree>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: "tree",
  data(){
    return{
      thiskey: null
    }
  },
  props:{
    "tree_data":{
      type: Array,
      default: ()=>{}
    }
  },
  methods:{
    clickTree: function(key){
      if(this.thiskey === key){
        this.thiskey = null;
        return
      }
      this.thiskey = key;
    },
    tree_http: function(value){
      this.$emit("tree_http", value)
    }
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.tree{
  width: 100%;
  height: 50px;
  background: #ffffff;
  line-height: 50px;
  border-bottom: 1px solid #f0f0f0;
}
.tree-children{
  background: #99ccff;
  color: #ffffff;
}
img{
  width: 1rem;
  height: 1rem;
}
</style>
