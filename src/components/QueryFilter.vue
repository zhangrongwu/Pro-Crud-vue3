<template>
  <div class="query-filter-wrap">
    <el-pro-form
      :option="options"
      :config="formConfig"
      :data="formData"
      :miniShow="3"
      ref="defProform"
      form-type="filter"
    >
    </el-pro-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import ElProForm from "../pro-form/pro-form.vue";

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
}
</style>
