<template>
  <div style="padding: 30px">
    <el-pro-form
      :option="options"
      :config="formConfig"
      :data="formData"
      ref="defProform"
    >
      <template #zidingyidechacao>
        <el-input type="text" placeholder="我是自定义内容！！！！" />
      </template>
    </el-pro-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import ElProForm from "../pro-form/pro-form.vue";
const rule = [
  {
    type: "inputNumber",
    name: "age",
    label: "年龄",
    value: "",
    props: {
      precision: 2,
    },
    col: {
      span: 12,
      labelWidth: 100,
    },
    validate: [{ required: true, message: "请输入age", trigger: "change" }],
    change: (val) => {
      console.log("==========第2个回调参数==========================");
      console.log(val);
      console.log("====================================");
    },
  },

  {
    type: "input",
    label: "标题名称",
    name: "titleName", // 字段名称
    value: "我是标题",
    col: {
      span: 12,
      labelWidth: 100,
    },
    props: {
      type: "input", //textarea、text、input
    },
    validate: [{ required: true, message: "请输入titleName", trigger: "blur" }],
    change: (val) => {
      console.log("==========第一个回调参数==========================");
      console.log(val);
      console.log("====================================");
    },
  },

  {
    type: "radio",
    label: "是否完成",
    name: "isFinish",
    value: "0",
    col: {
      span: 12,
      labelWidth: 100,
    },
    props: {
      options: [
        { value: "0", label: "完成", disabled: false },
        { value: "1", label: "未完成", disabled: false },
      ],
    },
    validate: [{ required: true, message: "请选是否完成", trigger: "blur" }],
  },
  {
    type: "checkbox",
    label: "商品评价",
    name: "label",
    value: ["1", "2", "3"],
    col: {
      span: 12,
      labelWidth: 100,
    },
    props: {
      options: [
        { value: "1", label: "极差", disabled: false },
        { value: "2", label: "差", disabled: false },
        { value: "3", label: "一般", disabled: false },
        { value: "4", label: "好", disabled: true },
      ],
    },
    validate: [{ required: true, message: "请选商品评价", trigger: "blur" }],
  },
  {
    type: "switch",
    label: "是否成功",
    name: "isSuccess",
    value: "1",
    col: {
      span: 12,
      labelWidth: 100,
    },
    props: {
      activeValue: "1",
      inactiveValue: "0",
    },
    validate: [{ required: true, message: "是否成功", trigger: "blur" }],

    change: () => {
      // 输出change事件
    },
  },
  {
    type: "cascader",
    label: "所在区域",
    name: "address",
    value: ["故宫", "苏州", "南京"],
    validate: [{ required: true, message: "所在区域", trigger: "blur" }],
    col: {
      span: 12,
      labelWidth: 100,
    },
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
    label: "活动日期",
    value: new Date(),
    col: {
      span: 12,
      labelWidth: 100,
    },
    props: {
      type: "date",
      format: "YYYY-MM-DD",
      valueFormat: "YYYY-MM-DD",
      placeholder: "请选择活动日期",
    },
    validate: [{ required: true, message: "活动日期", trigger: "blur" }],
  },
  // {
  //   type: 'upload',
  //   name: 'file',
  //   label: '图片',
  //   value: [
  //     'http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg',
  //     'http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg',
  //   ],
  //   props: {
  //     type: 'select',
  //     uploadType: 'image',
  //     action: 'http://10.39.60.100:6002/ident/uploads',
  //     name: 'files',
  //     multiple: true,
  //     accept: 'image\/*',
  //     limit: 8,
  //     onSuccess: function (res, file) {
  //       file.url = res.data.filePath
  //     },
  //   },
  // },
  {
    type: "rate",
    name: "rate",
    label: "评分",
    value: 2,
    col: {
      span: 12,
      labelWidth: 100,
    },
    props: {
      max: 5,
    },
    validate: [
      {
        required: true,
        type: "number",
        min: 5,
        message: "请大于5颗星",
        trigger: "change",
      },
    ],
  },
  {
    type: "slider",
    name: "slider",
    label: "范围",
    value: [0, 52],
    col: {
      span: 12,
      labelWidth: 100,
    },
    props: {
      min: 0,
      max: 100,
      range: true,
    },
    validate: [{ required: true, message: "请选择范围", trigger: "blur" }],
  },
  {
    type: "slot",
    name: "zidingyidechacao",
    label: "自定义",
    col: {
      span: 12,
      labelWidth: 100,
    },
  },
  {
    type: "tree",
    name: "deptId",
    label: "部门",
    value: "",
    col: {
      span: 12,
      labelWidth: 100,
    },
    multiple: true,
    props: {
      defaultProps: {
        children: "children",
        label: "name",
        value: "id",
      },
      data: [
        {
          id: "1",
          name: "xx公司",
          children: [
            {
              id: "2",
              name: "技术部",
              children: [
                { id: "4", name: "Java 组" },
                { id: "5", name: "Web 组" },
                { id: "6", name: "PHP 组" },
                { id: "7", name: "Python 组" },
              ],
            },
            { id: "3", name: "售后部" },
          ],
        },
      ],
    },
    validate: [
      {
        required: true,
        message: "请输入",
        trigger: "change",
      },
    ],
  },
  {
    type: "colorPicker",
    name: "color",
    label: "颜色",
    value: "#ff7271",
    col: {
      span: 12,
      labelWidth: 100,
    },
    validate: [{ required: true, message: "请选择颜色", trigger: "blur" }],
  },
  {
    type: "input",
    label: "详细内容",
    name: "detailName", // 字段名称
    value: "我是详细",
    col: {
      span: 23,
      labelWidth: 100,
    },
    props: {
      type: "textarea", //textarea、text、input
      itemStyle: " width: 100%;",
      style: "width:100%",
    },
    validate: [
      { required: true, message: "请输入detailName", trigger: "blur" },
      { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
    ],
    change: (val) => {
      console.log("==========第2个回调参数==========================");
      console.log(val);
      console.log("====================================");
    },
  },
];
const formData = reactive({});

const defProform = ref(null) as any;
const save = (val) => {
  console.log("保存", val);
  if (defProform.value) {
    defProform.value
      .validate()
      .then(() => {
        console.log("校验成功：promess = then, == ", formData);
      })
      .catch((e) => {
        console.log("校验失败：promess = catch, == ", formData);
      })
      .finally(() => {});
  }
};
const cancel = (val) => {
  console.log("取消", val);
};
const reset = () => {
  console.log("chongzhi");

  if (defProform.value) {
    defProform.value
      .resetFields()
      .then(() => {
        console.log("校验成功：promess = then, == ", formData);
      })
      .catch((e) => {
        console.log("校验失败：promess = catch, == ", formData);
      })
      .finally(() => {});
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
    { text: "保存", show: true, click: save },
    { text: "重置", show: true, click: reset },
    { text: "取消", show: true, click: cancel },
  ],
});

const options = {
  //表单提交事件
  onSubmit: function (formData) {
    console.log(formData);
  },
};
</script>
