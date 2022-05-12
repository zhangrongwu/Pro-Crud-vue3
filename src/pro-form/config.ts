export const globalConfig = {
  form: {
    item: [],
    inline: false,
    labelPosition: "right",
    labelWidth: "120px",
    labelSuffix: "",
    hideRequiredAsterisk: false,
    showMessage: true,
    inlineMessage: false,
    statusIcon: false,
    validateOnRuleChange: true,
    size: "default",
    disabled: false,
    itemStyle: "max-width: 380px; width: 100%;",
    componentStyle: "max-width: 300px; width: 100%;",
    tooltip: {
      effect: "dark",
      placement: "top-start",
      iconName: "el-icon-info",
      iconStyle: "color: #409EFF",
    },
    validate: null,
    operate: null,
    col: {
      span: 12,
      labelWidth: 100,
    },
  },
  input: {
    disabled: false,
    type: "text",
    valueKey: "value",
    debounce: 300,
    placement: "bottom-start",
    triggerOnFocus: true,
    selectWhenUnmatched: false,
    maxlength: null,
    minlength: null,
    showWordLimit: false,
    placeholder: null,
    clearable: false,
    size: "default",
    rows: 3,
    autosize: false,
    autocomplete: "off",
    resize: "none",
    validateEvent: true,
    hideLoading: false,
    popperAppendToBody: true,
    highlightFirstItem: false,
  },
  inputNumber: {
    disabled: false,
    min: -Infinity,
    max: Infinity,
    step: 1,
    stepStrictly: false,
    precision: null,
    size: "default",
    controls: true,
    controlsPosition: null,
    placeholder: null,
  },
  autocomplete: {
    disabled: false,
    placeholder: null,
    valueKey: "value",
    debounce: 300,
    placement: "bottom-start",
    fetchSuggestions: null,
    popperClass: null,
    triggerOnFocus: true,
    name: null,
    selectWhenUnmatched: false,
    label: null,
    prefixIcon: null,
    suffixIcon: null,
    hideLoading: false,
    popperAppendToBody: true,
    highlightFirstItem: false,
    maxlength: null,
    minlength: null,
    clearable: false,
    size: "default",
    rows: 3,
    autosize: false,
    autocomplete: "off",
    resize: "none",
    validateEvent: true,
  },
  select: {
    disabled: false,
    multiple: false,
    valueKey: "value",
    size: "default",
    clearable: false,
    collapseTags: false,
    multipleLimit: 0,
    autocomplete: "off",
    placeholder: "请选择",
    filterable: false,
    allowCreate: false,
    remote: false,
    loading: false,
    loadingText: "加载中",
    noMatchText: "无匹配数据",
    noDataText: "无数据",
    reserveKeyword: false,
    defaultFirstOption: false,
    popperAppendToBody: true,
    automaticDropdown: false,
  },
  datePicker: {
    disabled: false,
    readonly: false,
    editable: true,
    clearable: false,
    size: "",
    placeholder: "请选择日期",
    startPlaceholder: "开始时间",
    endPlaceholder: "结束时间",
    type: "date",
    format: "",
    align: "left",
    pickerOptions: {},
    rangeSeparator: ":",
    valueFormat: "",
    unlinkPanels: false,
    prefixIcon: "el-icon-date",
    clearIcon: "el-icon-circle-close",
    validateEvent: true,
  },
  checkbox: {
    disabled: false,
    size: "default",
    min: undefined,
    max: undefined,
    textColor: "#ffffff",
    fill: "#409EFF",
    border: false,
  },
  radio: {
    disabled: false,
    border: false,
    size: "default",
    textColor: "#ffffff",
    fill: "#409EFF",
  },
  cascader: {
    disabled: false,
    size: "default",
    placeholder: "请选择",
    clearable: false,
    showAllLevels: true,
    collapseTags: false,
    separator: " / ",
    debounce: 300,
  },
  switch: {
    disabled: false,
    width: 40,
    activeValue: true,
    inactiveValue: false,
    activeColor: "#409EFF",
    inactiveColor: "#C0CCDA",
    validateEvent: true,
  },

  slider: {
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
    showInput: false,
    showInputControls: true,
    inputSize: "small",
    showStops: false,
    showTooltip: true,
    range: false,
    vertical: false,
    height: null,
    label: null,
    debounce: 300,
    marks: null,
  },
  timePicker: {
    disabled: false,
    editable: true,
    clearable: false,
    size: "default",
    placeholder: "",
    align: "left",
    startPlaceholder: "",
    endPlaceholder: "",
    isRange: false,
    arrowControl: false,
    pickerOptions: {},
    rangeSeparator: ":",
    valueFormat: "",
    prefixIcon: "el-icon-time",
    clearIcon: "el-icon-circle-close",

    selectableRange: null,
    format: "HH:mm:ss",
  },
  timeSelect: {
    disabled: false,
    editable: true,
    clearable: false,
    size: "default",
    placeholder: "",
    align: "left",
    startPlaceholder: "",
    endPlaceholder: "",
    isRange: false,
    arrowControl: false,
    pickerOptions: {},
    rangeSeparator: ":",
    valueFormat: "",
    prefixIcon: "el-icon-time",
    clearIcon: "el-icon-circle-close",

    start: "09:00",
    end: "18:00",
    step: "00:30",
    minTime: "00:00",
    maxTime: null,
  },
  rate: {
    disabled: false,
    max: 5,
    texts: ["极差", "失望", "一般", "满意", "惊喜"],
    colors: ["#F7BA2A", "#F7BA2A", "#F7BA2A"],
    allowHalf: false,
    lowThreshold: 2,
    highThreshold: 4,
    voidColor: "#C6D1DE",
    iconClasses: ["el-icon-star-on", "el-icon-star-on", "el-icon-star-on"],
    showText: false,
    showScore: false,
    textColor: "#1F2D3D",
    scoreTemplate: "{value}",
    disabledVoidColor: "#EFF2F7",
    voidIconClass: "el-icon-star-off",
    disabledVoidIconClass: "el-icon-star-on",
  },
  colorPicker: {
    disabled: false,
    size: "default",
    predefine: null,
    showAlpha: false,
    colorFormat: "hex",
  },
  transfer: {
    disabled: false,
    filterable: false,
    filterPlaceholder: "请输入搜索内容",
    targetOrder: "original",
    titles: ["列表 1", "列表 2"],
    buttonTexts: [],
    format: {
      noChecked: "${checked}/${total}",
      hasChecked: "${checked}/${total}",
    },
    props: null,
  },
  operate: {
    btn: {
      size: "default",
      type: "primary",
      plain: false,
      round: false,
      circle: false,
      loading: false,
      disabled: false,
      icon: null,
      autofocus: false,
      nativeType: "button",
      click: null,
    },
  },
};
