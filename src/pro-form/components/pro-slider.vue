<template>
  <el-slider
    v-model="pvalue"
    :min="computedConfig.min"
    :max="computedConfig.max"
    :disabled="computedConfig.disabled"
    :step="computedConfig.step"
    :range="computedConfig.range"
    :vertical="computedConfig.vertical"
    :height="computedConfig.height"
    :label="computedConfig.label"
    :debounce="computedConfig.debounce"
    :marks="computedConfig.marks"
    :tooltip-class="computedConfig.tooltipClass"
    :show-input="computedConfig.showInput"
    :show-input-controls="computedConfig.showInputControls"
    :input-size="computedConfig.inputSize"
    :show-stops="computedConfig.showStops"
    :show-tooltip="computedConfig.showTooltip"
    :format-tooltip="computedConfig.formatTooltip"
    @change="(e) => computeFunction(config.change, e)"
    @input="(e) => computeFunction(config.input, e)"
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
  name: 'ELProSlider',
  props: ['config', 'modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    const config = props.config
    let pvalue = ref(props.config.value)
    const computedConfig = computed(() => {
      return { ...{ ...globalConfig.slider, ...config }, ...config.props }
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
