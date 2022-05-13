<template>
  <el-time-picker
    v-model="pvalue"
    :readonly="computedConfig.readonly"
    :disabled="computedConfig.disabled"
    :editable="computedConfig.editable"
    :clearable="computedConfig.clearable"
    :size="computedConfig.size"
    :placeholder="computedConfig.placeholder"
    :align="computedConfig.align"
    :name="computedConfig.name"
    :start-placeholder="computedConfig.startPlaceholder"
    :end-placeholder="computedConfig.endPlaceholder"
    :is-range="computedConfig.isRange"
    :arrow-control="computedConfig.arrowControl"
    :popper-class="computedConfig.popperClass"
    :picker-options="computedConfig.pickerOptions"
    :range-separator="computedConfig.rangeSeparator"
    :value-format="computedConfig.valueFormat"
    :default-value="computedConfig.defaultValue"
    :prefix-icon="computedConfig.prefixIcon"
    :clear-icon="computedConfig.clearIcon"
    :selectable-range="computedConfig.selectableRange"
    :format="computedConfig.format"
    @change="(e) => computeFunction(config.change, e)"
    @blur="(e) => computeFunction(config.blur, e)"
    @focus="(e) => computeFunction(config.focus, e)"
  />
</template>
<script lang="ts">
import {
  computed,
  inject,
  defineComponent,
  Text,
  ref,
  reactive,
  watch,
} from 'vue'
import { globalConfig } from '../config'

export default defineComponent({
  name: 'ELProTimePicker',
  props: ['config', 'modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    const config = props.config
    let pvalue = ref(props.config.value)
    const computedConfig = computed(() => {
      return { ...globalConfig.timePicker, ...config }
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
    watch(
      () => props.modelValue,
      (val) => {
        pvalue.value = val;
      }
    );
    return {
      props,
      pvalue,
      config,
      computedConfig,
      computeFunction,
    }
  },
})
</script>
