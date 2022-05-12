<template>
  <el-pro-table :params="params">
    <template #productLogo="slotProps">
      <img :src="slotProps.row.productLogo" @click="handleImg(slotProps.row)" />
    </template>
  </el-pro-table>
</template>
<script setup lang="ts">
import ElProTable from "../../pro-table/pro-table.vue";

const handleImg = (row) => {
  console.log(row);
};

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
        productLogo:
          "http://th5resicome.enn.cn/group1/M00/01/0C/wKgCGF8ZOkGATdLvAACqsi5idTg188.jpg",
      },
      {
        productId: "pid2",
        productName: "产品B",
        productManagerObj: {
          name: "李斯",
          id: "1002",
        },
        productLogo: "http://datakanban.icome.enn.cn:8080/image_demo/yyrb.png",
      },
      {
        productId: "pid3",
        productName: "产品C",
        productManagerObj: {
          name: "张腾",
          id: "1003",
        },
        productLogo:
          "http://vcomeopenplatform.oss-cn-beijing.aliyuncs.com/files/20190724/syhxyypf-rc-upload-1563953591853-2.png",
      },
      {
        productId: "pid4",
        productName: "产品D",
        productManagerObj: {
          name: "赵才",
          id: "1004",
        },
        productLogo:
          "http://vcomeopenplatform.oss-cn-beijing.aliyuncs.com/files/20190929/znjc-rc-upload-1569739632881-2.png",
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
      label: "产品logo",
      type: "diyRowData",
      slotName: "productLogo",
    },
  ],
};
</script>
<style scoped>
img {
  width: 60px;
  height: 60px;
}
</style>
