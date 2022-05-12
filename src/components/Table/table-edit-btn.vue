<template>
  <h3>EditBtnString</h3>
  <el-pro-table
    :params="params1"
    @editbtn-click="handleEditBtnClick"
  ></el-pro-table>

  <h3>EditBtnObject</h3>
  <el-pro-table
    :params="params2"
    @editbtn-click="handleEditBtnClick"
  ></el-pro-table>
</template>
<script setup lang="ts">
import ElProTable from "../../pro-table/pro-table.vue";

const handleEditBtnClick = (rowData, btnItem) => {
  console.log(333, rowData, btnItem);
};

const params1 = {
  table: {
    data: [
      {
        productId: "pid1",
        productName: "产品A",
        productManagerObj: {
          name: "李东",
          id: "1001",
        },
        operateList: ["查看"],
      },
      {
        productId: "pid2",
        productName: "产品B",
        productManagerObj: {
          name: "李斯",
          id: "1002",
        },
        operateList: ["编辑", "删除"],
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
      label: "操作",
      type: "editBtns",
      prop: "operateList",
    },
  ],
};

const params2 = {
  table: {
    data: [
      {
        productId: "pid1",
        productName: "产品A",
        productManagerObj: {
          name: "李东",
          id: "1001",
        },
        operateList: [
          {
            operateId: 1,
            operateName: "查看",
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
        operateList: [
          {
            operateId: 1,
            operateName: "编辑",
          },
          {
            operateId: 2,
            operateName: "删除",
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
      label: "操作",
      type: "editBtns",
      prop: "operateList",
      showValueKey: "operateName",
    },
  ],
};
</script>
