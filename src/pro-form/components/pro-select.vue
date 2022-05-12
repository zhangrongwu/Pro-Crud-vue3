<template>
  <el-select
    v-model="pvalue"
    :multiple="computedConfig.multiple"
    :disabled="computedConfig.disabled"
    :value-key="computedConfig.valueKey"
    :size="computedConfig.size"
    :clearable="computedConfig.clearable"
    :collapse-tags="computedConfig.collapseTags"
    :multiple-limit="computedConfig.multipleLimit"
    :name="computedConfig.name"
    :autocomplete="computedConfig.autocomplete"
    :placeholder="computedConfig.placeholder"
    :filterable="computedConfig.filterable"
    :allow-create="computedConfig.allowCreate"
    :filter-method="computedConfig.filterMethod"
    :remote="computedConfig.remote"
    :remote-method="computedConfig.remoteMethod"
    :loading="computedConfig.loading"
    :loading-text="computedConfig.loadingText"
    :no-match-text="computedConfig.noMatchText"
    :no-data-text="computedConfig.noDataText"
    :popper-class="computedConfig.popperClass"
    :reserve-keyword="computedConfig.reserveKeyword"
    :default-first-option="computedConfig.defaultFirstOption"
    :popper-append-to-body="computedConfig.popperAppendToBody"
    :automatic-dropdown="computedConfig.automaticDropdown"
    @change="(data) => computeFunction(config.change, data)"
    @visible-change="(data) => computeFunction(config.visibleChange, data)"
    @remove-tag="(data) => computeFunction(config.removeTag, data)"
    @clear="(data) => computeFunction(config.clear, data)"
    @blur="(data) => computeFunction(config.blur, data)"
    @focus="(data) => computeFunction(config.focus, data)"
  >
    <el-option
      v-for="(item, itemIndex) in computedConfig.props.options"
      :key="itemIndex"
      :disabled="item.disabled"
      :label="item[labelName]"
      :value="item[valueName]"
    />
  </el-select>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { globalConfig } from '../config'

export default defineComponent({
  name: 'ELProSelect',
  props: ['config', 'modelValue'],
  emits: ['update:modelValue'],

  setup(props, { emit, slots }) {
    const config = props.config
    let pvalue = ref(props.config.value)
    const computedConfig = computed(() => {
      return { ...globalConfig.cascader, ...config }
    })
    const labelName = ref('label')
    const valueName = ref('value')

    if (computedConfig.value.props.defaultProps) {
      labelName.value = computedConfig.value.props.defaultProps.label
        ? computedConfig.value.props.defaultProps.label
        : 'label'

      valueName.value = computedConfig.value.props.defaultProps.value
        ? computedConfig.value.props.defaultProps.value
        : 'value'
    }
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
      labelName,
      valueName,
      computedConfig,
      computeFunction,
    }
  },
})
</script>
