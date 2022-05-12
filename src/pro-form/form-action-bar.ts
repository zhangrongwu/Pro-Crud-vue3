import type { ExtractPropTypes } from "vue";

export interface FormActionButtonGroupItem {
  label: string;
  icon: any;
  buttonType: string;
  child?: Array<FormActionButtonGroupItem>;
  cb?: () => void;
}

export interface FormActionBarButtonGroup {
  [index: number]: FormActionButtonGroupItem;
}
