<template>
  <a-transfer
    :data-source="dataSource"
    :target-keys="targetKeys"
    :render="item => item.title"
    :show-select-all="false"
    @change="onChange"
  >
    <template #children="{ direction, selectedKeys, onItemSelect }">
      <template v-if="direction==='left'">
        <a-tree
          v-if="leftTreeData.length"
          blockNode
          checkable
          defaultExpandAll
          :tree-data="leftTreeData"
          :checked-keys="leftCheckedKey"
          @check="(_, props) => { handleLeftChecked(_, props, [...selectedKeys, ...targetKeys], onItemSelect) }"
        />
        <a-empty v-else>
          <template #description>暂无数据</template>
        </a-empty>
      </template>
      <template v-else-if="direction==='right'">
        <a-tree
          v-if="rightTreeData.length"
          blockNode
          checkable
          defaultExpandAll
          :tree-data="rightTreeData"
          v-model:checked-keys="rightCheckedKey"
          v-model:expanded-keys="rightExpandedKey"
          @check="(_, props) => { handleRightChecked(_, props, [...selectedKeys, ...targetKeys], onItemSelect) }"
        />
        <a-empty v-else>
          <template #description>暂无数据</template>
        </a-empty>
      </template>
    </template>
  </a-transfer>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue'
import { useTreeTransfer } from './use-tree-transfer'
import type { TreeDataItem } from '@/types'

export default defineComponent({
  name: 'CompositionTransfer',
  props: {
    /** 树数据 */
    treeData: {
      type: Array as PropType<TreeDataItem[]>,
      default: () => []
    },
    /** 编辑 key */
    editKey: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  setup (props) {
    const { state, onChange, handleLeftChecked, handleRightChecked } = useTreeTransfer(props)

    return {
      ...toRefs(state),

      onChange,
      handleLeftChecked,
      handleRightChecked
    }
  }
})
</script>

<style scoped lang="less">
.ant-transfer {
  ::v-deep(.ant-transfer-list) {
    width: 300px;
  }
}
</style>
