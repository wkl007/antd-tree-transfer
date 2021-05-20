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
          v-model="leftCheckedKey"
          :tree-data="leftTreeData"
          v-model:checked-keys="leftCheckedKey"
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
import { defineComponent, PropType } from 'vue'
import {
  cloneDeep,
  flatten,
  getDeepList,
  getTreeKeys,
  handleLeftTreeData,
  handleRightTreeData,
  isChecked,
  uniqueTree
} from '@/utils'
import { TreeDataItem } from '@/types'

export default defineComponent({
  name: 'OptionsTransfer',
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
  data () {
    return {
      targetKeys: [] as string[], // 显示在右侧框数据的 key 集合
      dataSource: [] as TreeDataItem[], // 数据源，其中的数据将会被渲染到左边一栏

      leftCheckedKey: [] as string[], // 左侧树选中 key 集合
      leftHalfCheckedKeys: [] as string[], // 左侧半选集合
      leftCheckedAllKey: [] as string[], // 左侧树选中的 key 集合，包括半选与全选
      leftTreeData: [] as TreeDataItem[], // 左侧树

      rightCheckedKey: [] as string[], // 右侧树选中集合
      rightCheckedAllKey: [] as string[], // 右侧树选中集合，包括半选与全选
      rightExpandedKey: [] as string[], // 右侧展开数集合
      rightTreeData: [] as TreeDataItem[], // 右侧树

      emitKeys: [] as string[], // 往父级组件传递的数据

      deepList: [] as string[] // 深层列表
    }
  },
  watch: {
    treeData: {
      deep: true,
      handler (val) {
        this.processTreeData()
      }
    },
    editKey: {
      deep: true,
      handler (val) {
        this.processTreeData()
      }
    }
  },
  created () {
    this.processTreeData()
  },
  methods: {
    // 处理树数据
    processTreeData () {
      flatten(cloneDeep(this.treeData), this.dataSource)
      if (this.editKey.length) {
        this.processEditData()
      } else {
        this.leftTreeData = handleLeftTreeData(cloneDeep(this.treeData), this.leftCheckedKey)
      }
    },
    // 处理编辑数据
    processEditData () {
      this.leftCheckedAllKey = this.editKey
      this.rightExpandedKey = this.editKey
      this.targetKeys = this.editKey
      this.rightTreeData = handleRightTreeData(cloneDeep(this.treeData), this.editKey)

      getDeepList(this.deepList, this.treeData)

      this.leftCheckedKey = uniqueTree(this.editKey, this.deepList)
      this.leftHalfCheckedKeys = this.leftCheckedAllKey.filter(item => this.leftCheckedKey.indexOf(item) === -1)
      this.leftTreeData = handleLeftTreeData(cloneDeep(this.treeData), this.leftCheckedKey)

      this.emitKeys = this.rightExpandedKey
    },
    // 穿梭更改
    onChange (targetKeys: string[], direction: string) {
      if (direction === 'right') {
        this.targetKeys = this.leftCheckedAllKey
        this.rightCheckedKey = []
        this.rightTreeData = handleRightTreeData(cloneDeep(this.treeData), this.leftCheckedAllKey, 'right')
        this.leftTreeData = handleLeftTreeData(cloneDeep(this.treeData), this.leftCheckedKey, 'right')
      } else if (direction === 'left') {
        this.rightTreeData = handleRightTreeData(this.rightTreeData, this.rightCheckedKey, 'left')
        this.leftTreeData = handleLeftTreeData(this.leftTreeData, this.rightCheckedKey, 'left')
        this.leftCheckedKey = this.leftCheckedKey.filter(item => this.rightCheckedKey.indexOf(item) === -1)
        this.targetKeys = this.targetKeys.filter(item => this.rightCheckedKey.indexOf(item) === -1)
        this.leftHalfCheckedKeys = this.leftHalfCheckedKeys.filter(item => this.rightCheckedKey.indexOf(item) === -1)
        this.rightCheckedKey = []
      }
      this.rightExpandedKey = getTreeKeys(this.rightTreeData)
      this.emitKeys = this.rightExpandedKey
    },
    // 左侧选择
    handleLeftChecked (_: string[], { node, halfCheckedKeys }: any, checkedKeys: any, itemSelect: (arg0: any, arg1: boolean) => void) {
      this.leftCheckedKey = _
      this.leftHalfCheckedKeys = [...new Set([...this.leftHalfCheckedKeys, ...halfCheckedKeys])]
      this.leftCheckedAllKey = [...new Set([...this.leftHalfCheckedKeys, ...halfCheckedKeys, ..._])]
      const { eventKey } = node
      itemSelect(eventKey, true)
    },
    // 右侧选择
    handleRightChecked (_: string[], { node, halfCheckedKeys }: any, checkedKeys: any, itemSelect: (arg0: any, arg1: boolean) => void) {
      this.rightCheckedKey = _
      this.rightCheckedAllKey = [...halfCheckedKeys, ..._]
      const { eventKey } = node
      itemSelect(eventKey, isChecked(_, eventKey))
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
