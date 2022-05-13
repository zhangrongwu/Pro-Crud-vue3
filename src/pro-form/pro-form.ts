

interface tooltip {
  effect: string
  placement: string
  iconName: string
  iconStyle: string
}

interface proForm {
  item: Object
  inline: boolean
  labelSuffix: string
  labelPosition: string
  labelWidth: string
  hideRequiredAsterisk: boolean
  showMessage: boolean
  inlineMessage: boolean
  statusIcon: boolean
  validateOnRuleChange: boolean
  size: string
  disabled: boolean
  validate: Function
  itemStyle: string
  tooltip: tooltip
}
export const proformProps = {
  // ...buildProps({
  //   option: Object,
  //   config: Object,
  //   data: Object,
  //   formType: {
  //     type: String,
  //     default: 'form',
  //   },
  //   miniShow: {
  //     type: Number,
  //     default: 2,
  //   },
  // }),
}
