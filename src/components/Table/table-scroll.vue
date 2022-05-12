<template>
  <el-pro-table :params="params" :total="total"></el-pro-table>
</template>
<script setup lang="ts">
import ElProTable from "../../pro-table/pro-table.vue";
const total = 10;
const params = {
  table: {
    height: 200,
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
        productManager: "李东",
      },
      {
        productId: "pid4",
        productName: "产品D",
        productManager: "李斯",
      },
      {
        productId: "pid5",
        productName: "产品E",
        productManager: "李东",
      },
      {
        productId: "pid6",
        productName: "产品F",
        productManager: "李斯",
      },
      {
        productId: "pid7",
        productName: "产品G",
        productManager: "李东",
      },
      {
        productId: "pid8",
        productName: "产品H",
        productManager: "李斯",
      },
      {
        productId: "pid9",
        productName: "产品I",
        productManager: "李东",
      },
      {
        productId: "pid10",
        productName: "产品G",
        productManager: "李斯",
      },
    ],
  },
  // 是否显示分页
  paginationShow: true,
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
};
</script>
