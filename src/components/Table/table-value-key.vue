<template>
  <el-pro-table :params="params"></el-pro-table>
</template>
<script setup lang="ts">
import ElProTable from "../../pro-table/pro-table.vue";
const params = {
  table: {
    data: [
      {
        productId: "pid1",
        productName: "产品A",
        productManagerObj: {
          name: "李东",
          id: "1001",
        },
        productCollaborators: [
          {
            name: "李东",
            id: "1001",
          },
          {
            name: "李斯",
            id: "1001",
          },
        ],
      },
      {
        productId: "pid2",
        productName: "产品B",
        productManagerObj: {
          name: "李斯",
          id: "1002",
        },
        productCollaborators: [
          {
            name: "李东",
            id: "1001",
          },
          {
            name: "李斯",
            id: "1001",
          },
        ],
      },
      {
        productId: "pid3",
        productName: "产品C",
        productManagerObj: {
          name: "张腾",
          id: "1003",
        },
        productCollaborators: [
          {
            name: "李东",
            id: "1001",
          },
          {
            name: "李斯",
            id: "1001",
          },
        ],
      },
      {
        productId: "pid4",
        productName: "产品D",
        productManagerObj: {
          name: "赵才",
          id: "1004",
        },
        productCollaborators: [
          {
            name: "李东",
            id: "1001",
          },
          {
            name: "李斯",
            id: "1001",
          },
        ],
      },
    ],
  },
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
      prop: "productManagerObj",
      showValueKey: "name",
    },
    {
      label: "参与人",
      prop: "productCollaborators",
      showValueKey: "name",
    },
  ],
};
</script>
