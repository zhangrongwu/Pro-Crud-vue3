<template>
  <el-input
    v-model="pvalue"
    :type="computedConfig.type"
    :maxlength="computedConfig.maxlength"
    :minlength="computedConfig.minlength"
    :show-word-limit="computedConfig.showWordLimit"
    :placeholder="computedConfig.placeholder"
    :clearable="computedConfig.clearable"
    :show-password="computedConfig.showPassword"
    :disabled="computedConfig.disabled"
    :size="computedConfig.size"
    :prefix-icon="computedConfig.prefixIcon"
    :suffix-icon="computedConfig.suffixIcon"
    :rows="computedConfig.rows"
    :autosize="computedConfig.autosize"
    :autocomplete="computedConfig.autocomplete"
    :auto-complete="computedConfig.autoComplete"
    :name="computedConfig.name"
    :readonly="computedConfig.readonly"
    :max="computedConfig.max"
    :min="computedConfig.min"
    :step="computedConfig.step"
    :resize="computedConfig.resize"
    :autofocus="computedConfig.autofocus"
    :form="computedConfig.form"
    :label="computedConfig.label"
    :tabindex="computedConfig.tabindex"
    @blur="(e) => computeFunction(config.blur, e)"
    @focus="(e) => computeFunction(config.focus, e)"
    @change="(e) => computeFunction(config.change, e)"
    @input="(e) => computeFunction(config.input, e)"
    @clear="(e) => computeFunction(config.clear, e)"
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
  name: 'ELProInput',
  props: ['config', 'modelValue'],
  emits: ['update:modelValue'],

  setup(props, { emit, slots }) {
    const config = props.config
    let pvalue = ref(props.modelValue)
    const computedConfig = computed(() => {
      console.log(globalConfig.input)
      if (config.props) {
        return { ...globalConfig.input, ...config.props }
      } else {
        return globalConfig.input
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
