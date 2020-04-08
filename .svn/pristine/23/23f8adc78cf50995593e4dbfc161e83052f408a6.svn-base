<template>
  <div>
    <div class="contation">
           
          <mytable

          :height="700"
          operation_mod_name="反结"
          operation_del_name="作废"
          :check_box="false"
            :operation_mod="true"
            :tableTitle="tableTitle"
            :tableData="tableData"
            ref="mytable"
            @resData="resData"
            @handlePageChange="handlePageChange"
         />
    </div>
  </div>
</template>

<script>
import mytable from "../mytable";
export default {
  name: "yuangongtongzhi",
  components: {
    mytable
  },
  props: {
    store_select: {
      type: Array,
      default: ()=>{[]}
    }
  },
  data() {
    return {
        store_value: "",
        unit_select:"",
        unit_select_list: [],
        tableTitle: [
        { key: "name", title: "客户姓名", min_width: "100" },
        { key: "chepai", title: "车牌号", min_width: "100" },
        { key: "tel", title: "手机号", min_width: "100" },
        { key: "notice_type", title: "通知类型", min_width: "100" },
        { key: "notice_item", title: "通知项目", min_width: "50" },
        { key: "staff_name", title: "通知员工", min_width: "50" },
        { key: "is_get", title: "是否收到通知", min_width: "50" },
        { key: "create_time", title: "通知时间", min_width: "100" },
      ],
      tableData: []
    }
  },
  mounted() {
    this.handlePageChange()
  },
  methods: {
   resData(data) {
     let arr = data.forEach(item => item.is_get = item.is_get == 0 ? "未收到" : "已收到")
     this.tableData = arr;
   },
   handlePageChange(data = {}) {
      this.$refs.mytable.findList(
        this.$api.yuming + "/storeadmin/notice/getNoticeList",
        data
      );
    }
  }
};
</script>

<style scoped>

.contation {
  width: 90%;
  margin: 70px auto;
}
.query-box {
  width: 100%;
  /* padding: 0 5%; */
  box-shadow: 5px 5px 20px #dcdfe6;
  padding-bottom: 13px;
  display: flex;
  margin: 10px auto;
}
</style>
