<template>
  <div class="query-filter-wrap">
    <el-pro-form
      :option="options"
      :config="formConfig"
      :data="formData"
      :mini-show="3"
      ref="defProform"
      form-type="filter"
    >
    </el-pro-form>
    <el-pro-table
      style="margin: 20px"
      :params="params"
      @editbtn-click="handleEditBtnClick"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <template #productLogo="slotProps">
        <img
          :src="slotProps.row.productLogo"
          @click="handleImg(slotProps.row)"
        />
      </template>
    </el-pro-table>
  </div>
</template>
<script setup lang="ts" name="pro-crud">
import { reactive, ref } from "vue";
import ElProForm from "../pro-form/pro-form.vue";
import ElProTable from "../pro-table/pro-table.vue";

const rule = [
  {
    type: "input",
    label: "受理编号",
    name: "code", // 字段名称
    value: "",
    col: {
      span: 8,
      labelWidth: 100,
    },
    props: {
      type: "input",
    },
    validate: [{ required: true, message: "请输入受理编号", trigger: "blur" }],
    change: (val) => {},
  },
  {
    type: "input",
    label: "项目名称",
    name: "projectName", // 字段名称
    value: "",
    col: {
      span: 8,
      labelWidth: 100,
    },
    props: {
      type: "input", //textarea、text、input
    },
    validate: [{ required: false, message: "请输入项目名称", trigger: "blur" }],
    change: (val) => {},
  },
  {
    type: "select",
    label: "风险类别",
    name: "riskCategory", // 字段名称
    value: "",
    col: {
      span: 8,
      labelWidth: 100,
    },
    props: {
      options: [
        {
          value: "scyppfx",
          label: "市场与品牌风险",
        },
        {
          value: "gylfx",
          label: "供应链风险",
        },
        {
          value: "tdwhfx",
          label: "团队文化风险",
        },
        {
          value: "cwygszlfx",
          label: "财务与公司治理",
        },
      ],
      defaultProps: {
        value: "value",
        label: "label",
      },
    },
    validate: [{ required: false, message: "请选择风险类别", trigger: "blur" }],
    change: (val) => {},
  },
  {
    type: "cascader",
    label: "所在区域",
    name: "address",
    value: [],
    col: {
      span: 8,
      labelWidth: 100,
    },
    validate: [{ required: true, message: "所在区域", trigger: "blur" }],

    props: {
      options: [
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "gugong",
              label: "故宫",
            },
            {
              value: "tiantan",
              label: "天坛",
            },
            {
              value: "wangfujing",
              label: "王府井",
            },
          ],
        },
        {
          value: "jiangsu",
          label: "江苏",
          children: [
            {
              value: "nanjing",
              label: "南京",
              children: [
                {
                  value: "fuzimiao",
                  label: "夫子庙",
                },
              ],
            },
            {
              value: "suzhou",
              label: "苏州",
              children: [
                {
                  value: "zhuozhengyuan",
                  label: "拙政园",
                },
                {
                  value: "shizilin",
                  label: "狮子林",
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    type: "datePicker",
    name: "activeDay",
    label: "举报时间",
    value: null,
    col: {
      span: 8,
      labelWidth: 100,
    },
    props: {
      type: "datetimerange",
      format: "YYYY/MM/DD",
      valueFormat: "YYYY-MM-DD",
      placeholder: "请选择举报时间",
      rangeSeparator: "至",
    },
    validate: [{ required: false, message: "举报时间", trigger: "blur" }],
    change: (val) => {},
  },
];
const formData = reactive({});

const defProform = ref(null) as any;
const handleQuery = (val) => {
  alert(JSON.stringify(val));
};

const resetQuery = () => {
  if (defProform.value) {
    defProform.value.resetFields();
  }
};

const formConfig = reactive({
  item: rule,
  inline: true,
  labelSuffix: ":",
  labelPosition: "right", // left right top  right时需要设置labelWidth
  labelWidth: "100px",
  hideRequiredAsterisk: true,
  showMessage: true, // 是否显示校验文字
  inlineMessage: false,
  statusIcon: true,
  validateOnRuleChange: true,
  size: "default",
  disabled: false,
  validate: (val, val1, val2) => {
    console.log("====================================");
    console.log();
    console.log("====================================");
    console.log(val, val1, val2);
  },
  operate: [
    { text: "查询", show: true, click: handleQuery },
    { text: "重置", show: true, click: resetQuery },
  ],
});

const options = {
  //表单提交事件
  onSubmit: function (formData) {
    console.log(formData);
  },
};

//*******************************************************************************table */ //
const total = 4;

const handleEditBtnClick = (rowData, btnItem) => {
  console.log(333, rowData, btnItem);
};

const handleImg = (row) => {
  console.log(row);
};
const params = ref({
  table: {
    data: [
      {
        productId: "38478349123749237489273",
        productName: "产品A",
        productManagerObj: {
          name: "李东",
          id: "1001",
        },
        operateList: ["查看"],
        productLogo:
          "http://th5resicome.enn.cn/group1/M00/01/0C/wKgCGF8ZOkGATdLvAACqsi5idTg188.jpg",
        productStatus: "开发中",
      },
      {
        productId: "384783491223749237489273",
        productName: "产品B",
        productManagerObj: {
          name: "李斯",
          id: "1002",
        },
        operateList: ["编辑", "删除"],
        productLogo: "http://datakanban.icome.enn.cn:8080/image_demo/yyrb.png",
        productStatus: "测试中",
      },
      {
        productId: "38478223491237437489273",
        productName: "产品D",
        productManagerObj: {
          name: "赵才",
          id: "1004",
        },
        productLogo:
          "http://vcomeopenplatform.oss-cn-beijing.aliyuncs.com/files/20190929/znjc-rc-upload-1569739632881-2.png",
        productStatus: "运营中",
      },
    ],
  },
  // 是否显示分页
  paginationShow: true,
  // 每页显示条数切换列表
  pageSizes: [2, 4],
  // 每页显示条数
  pageSize: 2,
  columnList: [
    {
      label: "产品id",
      prop: "productId",
      textColor: "red",
      isClick: true,
    },
    {
      label: "产品名称",
      prop: "productName",
      textColor: "#4068d4",
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
    {
      label: "产品状态",
      prop: "productStatus",
      filters: [
        {
          text: "开发中",
          value: "开发中",
        },
        {
          text: "测试中",
          value: "测试中",
        },
        {
          text: "运营中",
          value: "运营中",
        },
      ],
    },
    {
      label: "操作",
      type: "editBtns",
      prop: "operateList",
    },
  ],
}) as any;

const handleSizeChange = (val) => {
  params.value.pageSize = val;
  if (val === 4) {
    params.value.table.data = [
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
    ];
  } else {
    params.value.table.data = [
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
    ];
  }
};

const handleCurrentChange = (val) => {
  if (val === 1) {
    params.value.table.data = [
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
    ];
  } else {
    params.value.table.data = [
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
    ];
  }
};
</script>

<style scoped lang="scss">
.query-filter-wrap {
  // width: 900px;
  margin: 30px;
  .title-filer {
    font-size: 16px;
    margin: 10px 0;
  }

  .el-form--inline .el-form-item {
    display: inline-flex;
    vertical-align: middle;
    // margin-right: 0px !important;
  }

  img {
    width: 60px;
    height: 60px;
  }
}
</style>
