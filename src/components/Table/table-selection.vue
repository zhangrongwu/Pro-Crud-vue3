<template>
  <el-pro-table
    :params="params"
    @selection-change="handleSelectionChange"
  ></el-pro-table>
</template>
<script setup lang="ts">
import { ref } from "vue";
import ElProTable from "../../pro-table/pro-table.vue";

const handleSelectionChange = (selection) => {
  console.log(selection);
};

const params = ref({
  table: {
    data: [
      {
        productId: "pid1",
        productName: "产品A",
        productManager: "李东",
      },
      {
        productId: "pid2",
        productName: "产品B",
        productManager: "李斯",
      },
      {
        productId: "pid3",
        productName: "产品C",
        productManager: "张腾",
      },
      {
        productId: "pid4",
        productName: "产品D",
        productManager: "赵才",
      },
    ],
  },
  selectionShow: true,
  columnList: [
    {
      label: "产品id",
      prop: "productId",
    },
    {
      label: "产品名称",
      prop: "productName",
    },
    {
      label: "产品负责人",
      prop: "productManager",
    },
  ],
});
</script>
