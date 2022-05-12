<template>
  <div class="pro-form-bar">
    <div ref="formBar" class="pro-form-bar-container">
      <div ref="leftCon" class="pro-form-bar-left-container'">
        <slot name="messagePop"></slot>
      </div>
      <div ref="rightCon" class="pro-form-bar-right-container">
        <template v-for="(item, index) in buttonAllGroup" :key="index">
          <el-button :type="item.buttonType" @click="handleClick(item.cb)">
            {{ item.label }}
          </el-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  ref,
  shallowRef,
  onMounted,
  nextTick,
} from "vue";

import { useResizeObserver } from "@vueuse/core";
import { cloneDeep } from "lodash";
import type { FormActionButtonGroupItem } from "./form-action-bar";

interface IGroup extends FormActionButtonGroupItem {
  [key: string]: any;
}

export default defineComponent({
  name: "ElFooterActionBar",
  props: {
    buttonGroup: {
      type: Array,
      default: [],
    },
  } as const,
  setup(props) {
    const buttonAllGroup = ref<IGroup[]>([]);
    buttonAllGroup.value = (cloneDeep(props.buttonGroup) as Array<IGroup>).map(
      (item) => {
        item.visibility = true;
        return item;
      }
    );

    let hideIndex = buttonAllGroup.value.length - 1;

    const showMore = ref<boolean>(false);
    // formBar容器及其width
    const formBar = shallowRef<HTMLElement | null>(null);
    const formBarWidth = ref<number>(0);
    // 左边标题及其width
    const leftConWidth = ref<number>(0);
    // 右边按钮容器及其width
    const rightCon = shallowRef<HTMLElement | null>(null);
    const rightConWidth = ref<number>(0);
    const rightConInitWidth = ref<number>(0);
    let rightButtonsWidthList = ref<any[]>([]);
    // 更多按钮容易及其width
    const moreCon = shallowRef<HTMLElement | null>(null);
    const moreConWidth = ref<number>(0);

    onMounted(() => {
      initWidth();
      // 获取按钮组的宽度List
      rightButtonsWidthList.value = getButtonsWidthList();
    });

    watch(
      () => props.buttonGroup,
      (val) => {
        nextTick(() => {
          buttonAllGroup.value = cloneDeep(val).map((item) => {
            item.visibility = true;
            return item;
          });
          // 初始化数据
          initialDate();
          // 按钮收缩操作
          computedRightConButtonLength();
        });
      },
      { deep: true }
    );

    const handleClick = (cb) => {
      cb && cb();
    };

    const initWidth = () => {
      leftConWidth.value = 120;
      rightConWidth.value = rightCon.value ? rightCon.value!.offsetWidth : 0;
      rightConInitWidth.value = rightConWidth.value;
      moreConWidth.value = moreCon.value ? moreCon.value!.offsetWidth : 0;
    };

    const getButtonsWidthList = () => {
      const rightButtonsAll = [...rightCon.value!.children].filter((item) => {
        return item.className.includes("button-margin");
      });
      return rightButtonsAll.map((item) => item.offsetWidth);
    };

    const computedRightConButtonLength = () => {
      if (leftConWidth.value + rightConWidth.value > formBarWidth.value) {
        if (hideIndex >= 0) {
          if (!showMore.value) {
            showMore.value = true;
            buttonAllGroup.value[hideIndex].visibility = false;
            // 更多按钮展示时，按钮组宽度需要包含更多按钮的宽度
            rightConWidth.value = rightConWidth.value + moreConWidth.value;
          } else {
            buttonAllGroup.value[hideIndex].visibility = false;
          }
          // 计算时需要减去按钮左边距12
          rightConWidth.value -= rightButtonsWidthList[hideIndex] + 12;
          // 带分割线的按钮，左边距为16，此处需要处理差值
          if (buttonAllGroup.value[hideIndex].dividerBorder) {
            rightConWidth.value -= 4;
          }
          hideIndex--;
          computedRightConButtonLength();
        }
      }
    };

    const initialDate = () => {
      buttonAllGroup.value.forEach((item) => {
        item.visibility = true;
      });
      showMore.value = false;

      hideIndex = buttonAllGroup.value.length - 1;
      rightConWidth.value = rightConInitWidth.value;
    };

    useResizeObserver(formBar, (entries) => {
      const entry = entries[0];
      const { width } = entry.contentRect;
      formBarWidth.value = width;
      // 初始化数据
      initialDate();
      // 按钮收缩操作
      computedRightConButtonLength();
    });

    return {
      // ns,
      handleClick,
      buttonAllGroup,
      showMore,
      formBar,
      rightCon,
      moreCon,
    };
  },
});
</script>

<style>
.pro-form-bar {
  padding: 0 24px;
  /* position: absolute; */
  /* bottom: 0;
  left: 0; */
  width: 100%;
  min-width: 330px;
  background: white;
  box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.16);
  height: 44px;
}
.pro-form-bar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.pro-form-bar-left-container {
  width: 120px;
  flex-shrink: 0;
}
.pro-form-bar-right-container {
  display: flex;
  align-items: center;
  /* .#{$namespace}-button-group {
    display: inline-flex;
  } */
}
</style>
