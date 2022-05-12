<template>
  <el-switch
    v-model="pvalue"
    :disabled="computedConfig.disabled"
    :width="computedConfig.width"
    :active-icon-class="computedConfig.activeIconClass"
    :inactive-icon-class="computedConfig.inactiveIconClass"
    :active-text="computedConfig.activeText"
    :inactive-text="computedConfig.inactiveText"
    :active-value="computedConfig.activeValue"
    :inactive-value="computedConfig.inactiveValue"
    :active-color="computedConfig.activeColor"
    :inactive-color="computedConfig.inactiveColor"
    :name="computedConfig.name"
    :validate-event="computedConfig.validateEvent"
    @change="(e) => computeFunction(config.change, e)"
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
  name: 'ELProSwitch',
  props: ['config', 'modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    const config = props.config
    let pvalue = ref(props.config.value)
    const computedConfig = computed(() => {
      return { ...globalConfig.switch, ...config }
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
