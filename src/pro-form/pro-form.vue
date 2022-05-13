<template>
  <el-form
    v-if="computedConfig.item"
    ref="refForm"
    :rules="rules"
    :model="formData"
    :inline="computedConfig.inline"
    :label-position="computedConfig.labelPosition"
    :label-width="computedConfig.labelWidth"
    :label-suffix="computedConfig.labelSuffix"
    :hide-required-asterisk="computedConfig.hideRequiredAsterisk"
    :show-message="computedConfig.showMessage"
    :inline-message="computedConfig.inlineMessage"
    :status-icon="computedConfig.statusIcon"
    :validate-on-rule-change="computedConfig.validateOnRuleChange"
    :size="computedConfig.size"
    :disabled="computedConfig.disabled"
    @validate="(a, b, c) => computeFunction(computedConfig.validate, a, b, c)"
  >
    <el-row>
      <template v-for="(configItem, index) in formItems">
        <el-col
          :span="
            configItem.col && configItem.col.span
              ? configItem.col.span
              : computedConfig.col.span
          "
        >
          <el-form-item
            v-if="configItem['type'] != 'hidden'"
            :key="index"
            :prop="configItem['name']"
            :label="configItem['label']"
            :style="
              configItem.props && configItem.props.itemStyle
                ? configItem.props.itemStyle
                : computedConfig.itemStyle
            "
          >
            <slot
              v-if="getComponentType(configItem) === 'slot'"
              :name="configItem['name']"
            />

            <component
              v-else
              :is="getComponentType(configItem)"
              v-model="formData[configItem['name']]"
              :style="
                configItem.props && configItem.props.style
                  ? configItem.props.style
                  : computedConfig.componentStyle
              "
              :config="configItem"
            />
          </el-form-item>
        </el-col>
      </template>
    </el-row>

    <el-row v-if="formType == 'form'">
      <el-col :span="24">
        <form-action-bar :button-group="buttonGroup"></form-action-bar>
      </el-col>
    </el-row>
    <el-row v-if="formType == 'filter'">
      <el-col :span="12"> </el-col>
      <el-col :span="12" class="event-bus-wrap">
        <div v-if="computedConfig.operate">
          <template
            v-for="(operateItem, operateItemIndex) in computedConfig.operate"
          >
            <el-button
              v-if="operateItem['show']"
              :key="operateItemIndex"
              :size="operateItem['size']"
              :type="operateItem['type']"
              :plain="operateItem['plain']"
              :round="operateItem['round']"
              :circle="operateItem['circle']"
              :loading="operateItem['loading']"
              :disabled="operateItem['disabled']"
              :icon="operateItem['icon']"
              :autofocus="operateItem['autofocus']"
              :native-type="operateItem['nativeType']"
              @click="() => computeFunction(operateItem.click, formData)"
            >
              {{ operateItem["text"] }}
            </el-button>
          </template>
          <el-button text @click="showMoreFilterEvent">
            {{ isAllFilter ? "展开" : "收起" }}
            <el-icon class="el-icon--right">
              <ArrowDownBold v-if="isAllFilter" /> <ArrowUpBold v-else />
            </el-icon>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import ProInputNumber from "./components/pro-inputNumber.vue";
import ProColorPicker from "./components/pro-colorPicker.vue";
import ProDatePicker from "./components/pro-datePicker.vue";
import ProCheckbox from "./components/pro-checkbox.vue";
import ProCascader from "./components/pro-cascader.vue";
import ProSwitch from "./components/pro-switch.vue";
import ProRadio from "./components/pro-radio.vue";
import ProInput from "./components/pro-input.vue";
import ProRate from "./components/pro-rate.vue";
import ProSlider from "./components/pro-slider.vue";
import ProSelect from "./components/pro-select.vue";
import ProTree from "./components/pro-tree.vue";

import { globalConfig } from "./config";
import FormActionBar from "./form-action-bar.vue";

import { ArrowDownBold, ArrowUpBold } from "@element-plus/icons-vue";

export default defineComponent({
  name: "ELProForm",
  components: {
    ProInputNumber,
    ProColorPicker,
    ProDatePicker,
    FormActionBar,
    ProCheckbox,
    ProCascader,
    ProSwitch,
    ProSlider,
    ProSelect,
    ProInput,
    ProRadio,
    ProRate,
    ProTree,

    ArrowDownBold,
    ArrowUpBold,
  },
  props: {
    option: Object,
    config: Object,
    data: Object,
    formType: {
      type: String,
      default: "form",
    },
    miniShow: {
      type: Number,
      default: 2,
    },
  },
  setup(props) {
    let rules = ref({});
    const refForm = ref(null) as any;
    const config = props.config;
    const formData = ref(props.data);
    const formType = ref(props.formType);
    const value1 = "";
    const isAllFilter = ref(true);
    const formItems = ref([]);
    const showMoreFilterEvent = () => {
      isAllFilter.value = !isAllFilter.value;
      if (isAllFilter.value) {
        formItems.value = computedConfig.value!.item.slice(0, props.miniShow);
      } else {
        formItems.value = computedConfig.value!.item;
      }
    };

    const computeFunction = (fun, ...data) => {
      if (fun) {
        fun(...data);
      } else {
        return false;
      }
    };

    let buttonGroup = ref([]);
    const computedConfig = computed(() => {
      if (config) {
        if (config.operate) {
          let operateConfig = reactive(config);
          for (let i = 0; i < config.operate.length; i++) {
            const operate = config.operate[i];
            operateConfig.operate[i] = {
              ...globalConfig.operate.btn,
              ...operate,
            };
          }
          return { ...{ ...globalConfig.form, ...config }, ...operateConfig };
        }
        return { ...globalConfig.form, ...config };
      } else {
        return globalConfig.form;
      }
    });
    initFormData();

    function initFormData() {
      const typeArr = ["datetimerange", "daterange", "monthrange", "checkbox"];
      if (config) {
        config.item.forEach((item) => {
          if (item.multiple || typeArr.includes(item.type.toLowerCase())) {
            if (!formData.value![item.name]) {
              formData.value![item.name] = item.value;
            }
          } else {
            if (item.name && formData.value![item.name] === undefined) {
              formData.value![item.name] = item.value;
            }
          }
        });
      }

      if (config!.item) {
        var dicts = {};
        config!.item.forEach((item) => {
          dicts[item.name] = item.validate;
        });
        rules.value = dicts;
      }
      if (computedConfig.value.operate) {
        computedConfig.value.operate.forEach((operateItem) => {
          var dict = {
            label: operateItem["text"],
            buttonType: operateItem["type"],
            cb: () => {
              computeFunction(operateItem.click, formData.value);
            },
          };
          buttonGroup.value.push(dict);
        });
      }
      if (formType.value == "filter") {
        formItems.value = computedConfig.value!.item.slice(0, props.miniShow);
      } else {
        formItems.value = computedConfig.value!.item;
      }
    }

    function validate(fun: any) {
      const validPromise = new Promise((resolve, reject) => {
        if (refForm.value) {
          refForm.value.validate((valid, object) => {
            if (valid) {
              resolve({});
            } else {
              reject();
            }
          });
        }
      });
      return validPromise;
    }
    const resetFields = () => {
      const validPromise = new Promise((resolve, reject) => {
        if (refForm.value) {
          refForm.value.resetFields();
          // console.log("====================================");
          // console.log(formData);
          // console.log("====================================");
          // formData.value = props.data;
        }
      });
      return validPromise;
    };

    const getComponentType = (configItem) => {
      const type = configItem.type.toLowerCase();
      if (type === "slot") {
        return "slot";
      } else if (type === "cascader") {
        return "ProCascader";
      } else if (type === "checkbox") {
        return "ProCheckbox";
      } else if (type === "colorpicker") {
        return "ProColorPicker";
      } else if (type === "datepicker") {
        return "ProDatePicker";
      } else if (type === "input") {
        return "ProInput";
      } else if (type === "autocomplete") {
        return "ProAutocomplete";
      } else if (type === "inputnumber") {
        return "ProInputNumber";
      } else if (type === "radio") {
        return "ProRadio";
      } else if (type === "rate") {
        return "ProRate";
      } else if (type === "select") {
        return "ProSelect";
      } else if (type === "tree") {
        return "ProTree";
      } else if (type === "slider") {
        return "ProSlider";
      } else if (type === "switch") {
        return "ProSwitch";
      } else if (type === "timepicker") {
        return "ProTimePicker";
      } else if (type === "timeselect") {
        return "xTimeSelect";
      } else if (type === "transfer") {
        return "ProTransfer";
      }
    };
    return {
      rules,
      value1,
      formType,
      refForm,
      formItems,
      isAllFilter,
      formData,
      buttonGroup,
      computedConfig,
      resetFields,
      validate,

      computeFunction,
      getComponentType,
      showMoreFilterEvent,
    };
  },
});
</script>

<style lang="scss" scoped>
.event-bus-wrap {
  display: flex;
  flex-direction: row-reverse;
  text-align: right;
}

.el-form-item {
  margin-right: 0px;
}
</style>
