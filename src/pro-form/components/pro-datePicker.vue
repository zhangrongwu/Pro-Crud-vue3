<template>
  <el-date-picker
    v-model="pvalue"
    :readonly="computedConfig.readonly"
    :disabled="computedConfig.disabled"
    :editable="computedConfig.editable"
    :clearable="computedConfig.clearable"
    :size="computedConfig.size"
    :placeholder="computedConfig.placeholder"
    :start-placeholder="computedConfig.startPlaceholder"
    :end-placeholder="computedConfig.endPlaceholder"
    :type="computedConfig.type"
    :format="computedConfig.format"
    :align="computedConfig.align"
    :popper-class="computedConfig.popperClass"
    :picker-options="computedConfig.pickerOptions"
    :range-separator="computedConfig.rangeSeparator"
    :default-value="computedConfig.defaultValue"
    :default-time="computedConfig.defaultTime"
    :value-format="computedConfig.valueFormat"
    :name="computedConfig.name"
    :unlink-panels="computedConfig.unlinkPanels"
    :prefix-icon="computedConfig.prefixIcon"
    :clear-icon="computedConfig.clearIcon"
    :validate-event="computedConfig.validateEvent"
    @change="(e) => computeFunction(config.change, e)"
    @blur="(e) => computeFunction(config.blur, e)"
    @focus="(e) => computeFunction(config.focus, e)"
  />
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { globalConfig } from '../config'

export default defineComponent({
  name: 'ELProDatePicker',
  props: ['config', 'modelValue'],
  emits: ['update:modelValue'],

  setup(props, { emit, slots }) {
    const config = props.config
    let pvalue = ref(props.config.value)
    const computedConfig = computed(() => {
      if (config.props) {
        return { ...globalConfig.datePicker, ...config.props }
      } else {
        return { ...globalConfig.datePicker, ...config }
      }
    })

    const computeFunction = (fun, ...data) => {
      if (fun) {
        fun(...data)
      } else {
        return false
      }
    }
    watch(
      () => pvalue.value,
      (val) => {
        emit('update:modelValue', val)
      }
    )
    return {
      props,
      config,
      pvalue,
      computedConfig,
      computeFunction,
    }
  },
})
</script>
