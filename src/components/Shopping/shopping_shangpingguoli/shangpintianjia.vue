<!--  -->
<template>
  <div class="contation">
    <h3>新建商品</h3>
    <div class="part">
      <h4>1, 商品基本信息</h4>
      <div class="part-item">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px" label-position="right">
          <el-form-item label="商品分类" prop="name">
            <span>{{fenleitext}}</span>
            <span class="color-btn">选择分类</span>
          </el-form-item>
          <el-form-item label="商品标题">
            <el-input v-model="form.name" placeholder="商品标题组成：商品描述+规格">
              <template slot="append">{{form.name.length}} / 60</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品属性">
            <p class="color-text">请准确填写属性，有利于商品在搜索和推荐中露出，错误填写可能面临商品下架或流量损失!</p>
            <div class="pd">
               <el-card style="height: 650px;">
                <quill-editor v-model="content" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
                </quill-editor>
              </el-card>
            </div>
          </el-form-item>
          <el-form-item label="商品轮播图" prop="lunbotu">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :limit="3"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
            <span>上传数量：1/5</span>
          </el-form-item>
          <el-form-item label="商品属性">
            <el-input type="textarea" placeholder="建议300字内，未填写将根据商品标题自动生成"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="part">
      <h4>2, 商品规格与库存</h4>
      <div class="part-item">
        <el-form
          ref="form"
          :rules="rules"
          :model="form_2"
          label-width="100px"
          label-position="right"
        >
          <el-form-item label="商品规格">
            <div v-if="shoppingAble">
              <span>最多添加两个商品规格，第一个商品规格可添加规格图片</span>
              <div class="pd bg-gray" v-for="(items, indexs) in specificationArr" :key="indexs">
                <div class="f-b">
                  <div class="f-s">
                      <el-input
                        size="mini"
                        v-model="items.specificationOption"
                        @blur="blurSpecificationOption(items.specificationOption, indexs)"
                        placeholder="请输入规格名称"
                      ></el-input>
                    <!-- <el-select
                      size="mini"
                      clearable
                      v-model="items.specificationOption"
                      placeholder="请选择"
                      @change="changespecification(items.specificationOption, indexs)"
                    >
                      <el-option
                        v-for="item in specificationSelect"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select> -->
                    <el-checkbox class="ml-2" v-model="items.isAddImg">添加图片</el-checkbox>
                  </div>
                  <div>
                    <span class="color-btn" @click="delSpecification(indexs)">删除规格</span>
                  </div>
                </div>
                <div class="specification-wrapper">
                  <div class="item" v-for="(item, index) in items.children" :key="index">
                    <el-checkbox
                      class="ml-2"
                      @change="changeSpecificationCheckbox(item.checked, index, indexs)"
                      v-model="item.checked"
                      :disabled="index === items.children.length -1"
                    >
                      <el-input
                        size="mini"
                        @blur="blurSpecification(item.value, index, indexs)"
                        @input="inputSpecification(item.value, index, indexs)"
                        v-model="item.value"
                        placeholder="请输入规格名称"
                      ></el-input>
                    </el-checkbox>
                  </div>
                </div>
              </div>
            </div>
            <el-button icon="el-icon-plus" size="mini" @click="addShoppingBtn">添加规格</el-button>
            <el-button type="primary" @click="postData">确认</el-button>
          </el-form-item>
          <el-form-item label="价格及库存">
            <div class="price-stock">
              <div class="header f-b">
                <div class="f-s">
                  <p class="fs-1">批量设置</p>
                  <span class="color-text ml-2 fs-1">在下方栏中选择内容进行批量填充</span>
                </div>
                <el-button size="mini">确认</el-button>
              </div>
              <div class="batch-setup f-s">
                <el-select
                  size="mini"
                  style="width:15%"
                  v-model="specificationOption"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in specificationSelect"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  size="mini"
                  style="width:15%"
                  class="ml-2"
                  v-model="specificationOption"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in specificationSelect"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-input size="mini" style="width:15%" class="ml-2" placeholder="库存"></el-input>
                <el-input size="mini" style="width:15%" class="ml-2" placeholder="单价"></el-input>
                <el-input size="mini" style="width:15%" class="ml-2" placeholder="sku编码"></el-input>
              </div>
              <div class="mt-2">
                <el-table
                  :data="tableData"
                  :span-method="objectSpanMethod"
                  border
                  style="width: 100%; margin-top: 20px;border: 1px solid #e0e0e0"
                  :header-cell-style="{background:'#EDEDED'}"
                >
                  <el-table-column :prop="id" :label="item.name" v-for="(item, index) in tableTitle" :key="index" width="180"></el-table-column>
                  <el-table-column prop="id" label="ID" width="180"></el-table-column>
                  <el-table-column prop="name" label="姓名"></el-table-column>
                  <el-table-column prop="amount1" label="库存">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.store"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="amount2" label="单买价(元)">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.price"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="amount3" label="sku编码">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.sku"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="amount3" label="*预览图">
                    
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="part"></div>
  </div>
</template>

<script>
import {
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'


export default {
  components: {
    quillEditor
  },
  data() {
    return {
      content: null,
      editorOption: {},
      tableTitle: [1],
      tableData: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10
        },
        {
          id: "12987122",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12
        },
        {
          id: "12987124",
          name: "王小虎",
          amount1: "324",
          amount2: "1.9",
          amount3: 9
        },
        {
          id: "12987124",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15
        }
      ],

      checked: "",
      specificationArr: [],
      // select变量
      specificationSelect: [
        { value: 1, label: "规格" },
        { value: 2, label: "尺寸" },
        { value: 3, label: "容量" }
      ],
      specificationOption: "",
      // 显示隐藏变量
      shoppingAble: false,
      // 图片
      dialogImageUrl: "",
      dialogVisible: false,
      // 表单
      form: {
        name: ""
      },
      form_2: {},
      fenleitext: "撒旦/fff/dd",
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        lunbotu: [{ required: true, message: "", trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    postData() {
      const {specificationArr} = this
      
      
    },
    // arraySpanMethod({ row, column, rowIndex, columnIndex }) {
    //   if (rowIndex % 2 === 0) {
    //     if (columnIndex === 0) {
    //       return [1, 2];
    //     } else if (columnIndex === 1) {
    //       return [0, 0];
    //     }
    //   }
    // },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(row)
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    // 通用行合并函数（将相同多列数据合并为一行）
    // rowspanMethod({ row, $rowIndex, column, data }) {
    //   const fields = ["key"];
    //   const cellValue = row.column.property;
    //   if (cellValue && fields.includes(column.property)) {
    //     const prevRow = data[$rowIndex - 1];
    //     let nextRow = data[$rowIndex + 1];
    //     if (prevRow && prevRow.column.property === cellValue) {
    //       return { rowspan: 0, colspan: 0 };
    //     } else {
    //       let countRowspan = 1;
    //       while (nextRow && nextRow.column.property === cellValue) {
    //         nextRow = data[++countRowspan + $rowIndex];
    //       }
    //       if (countRowspan > 1) {
    //         return { rowspan: countRowspan, colspan: 1 };
    //       }
    //     }
    //   }
    // },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    addShoppingBtn() {
      this.shoppingAble = true;
      const { specificationArr } = this;
      const obj = {
        isAddImg: false,
        specificationOption: "",
        children: []
      };
      specificationArr.push(obj);
      console.log(this.specificationArr);
    },
    // 商品选择回调
    blurSpecificationOption(val, indexs) {
      const specificationItem = this.specificationArr[indexs].children;
      if (val && specificationItem.length === 0) {
        specificationItem.push({ checked: false, value: "" });
      } else if (!val) {
        this.specificationArr[indexs].children = [];
      }
    },
    changeSpecificationCheckbox(val, index, indexs) {
      !val && this.specificationArr[indexs].children.splice(index, 1);
    },
    delSpecification(indexs) {
      this.specificationArr.splice(indexs, 1);
    },
    blurSpecification(val, index, indexs) {
      const specificationItem = this.specificationArr[indexs].children;
      const a = specificationItem.findIndex(
        (item, key, arr) => item.value === val && key !== arr.length - 2
      );
      if (a != -1 && specificationItem.length > 2) {
        this.$message.error("规格值不能重复");
        specificationItem.splice(index, 1);
      }
      if (val && specificationItem.length - 2 === index) {
        specificationItem[index].checked = true;
      } else if (!val) {
        specificationItem.splice(index, 1);
      }
    },
    // changespecification(val, indexs) {
    //   const specificationItem = this.specificationArr[indexs].children;
    //   if (val && specificationItem.length === 0) {
    //     specificationItem.push({ checked: false, value: "" });
    //   } else if (!val) {
    //     this.specificationArr[indexs].children = [];
    //   }
    // },
    inputSpecification(val, index, indexs) {
      const specificationItem = this.specificationArr[indexs].children;
      if (val && specificationItem.length - 1 === index) {
        const obj = { checked: false, value: "" };
        specificationItem.push(obj);
      } else if (!val && specificationItem.length - 2 === index) {
        specificationItem.splice(specificationItem.length - 1, 1);
      }
    }
  },
  computed: {},
  watch: {
    // specificationOption(val) {
    //   const { specificationArr } = this;
    //   if (val && specificationArr.length === 0) {
    //     specificationArr.push({ checked: false, value: "" });
    //   } else if (!val) {
    //     this.specificationArr = [];
    //   }
    // }
  }
};
</script>

<style scoped>
.batch-setup {
  width: 100%;
}
.price-stock {
  background: #fbfbfb;
  padding: 20px;
}
.specification-wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.specification-wrapper .item {
  width: 33%;
}

.contation {
  width: 1034px;
  margin: 0 auto;
}
.contation .part {
  border-top: 1px solid #e0e0e0;
  padding: 20px;
}
.contation .part .part-item {
  padding: 20px;
}
.contation .part .part-item .fenlei {
  color: #2266aa;
  margin-left: 20px;
  font-size: 13px;
}

/deep/ .el-upload-list__item {
  width: 94px;
  height: 94px;
}
/deep/ .el-upload--picture-card {
  width: 94px;
  height: 94px;
  line-height: 94px;
}
.f-b {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.f-s {
  display: flex;
  justify-content: start;
  align-items: center;
}
.color-text {
  color: rgba(0, 0, 0, 0.4);
}
.pd-2 {
  padding: 20px;
}
.fs-1 {
  font-size: 14px;
}
.fs-2 {
  font-size: 12px;
}
.ml-1 {
  margin-left: 10px;
}
.ml-2 {
  margin-left: 20px;
}
.ml-3 {
  margin-left: 30px;
}
.mt-1 {
  margin-top: 10px;
}
.mt-2 {
  margin-top: 20px;
}
.mt-3 {
  margin-top: 30px;
}
.color-btn {
  color: #2266aa;
  cursor: pointer;
}
.bg-gray {
  background-color: #fbfbfb;
}
</style>