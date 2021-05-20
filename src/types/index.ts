export interface TreeDataItem {
  key: string;
  title: string;
  disabled?: boolean;
  children?: TreeDataItem[];

  [key: string]: any;
}
