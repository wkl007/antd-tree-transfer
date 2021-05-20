<template>
  <div class="transfer-wrapper">
    <transfer
      ref="transferRef"
      :tree-data="treeData"
      :edit-key="editKey"
    />
  </div>
  <a-space>
    <a-button
      type="primary"
      @click="getValue"
    >
      获取值
    </a-button>
    <a-button
      @click="setValue"
    >
      设置值
    </a-button>
  </a-space>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Transfer from '@/components/composition-transfer.vue'
import data from '@/assets/data'
import type { TreeDataItem } from '@/types'

interface State {
  /** 组件实例 */
  transferRef: any;
  /** 树数据 */
  treeData: TreeDataItem[];
  /** 编辑 key */
  editKey: string[];
}

export default defineComponent({
  name: 'Composition',
  components: {
    Transfer
  },
  setup () {
    const state = reactive<State>({
      transferRef: undefined,
      treeData: data.treeData,
      editKey: []
    })

    /** 设置值 */
    function getValue () {
      console.log(state.transferRef.emitKeys)
    }

    /** 获取值 */
    function setValue () {
      state.editKey = data.editKey
    }

    return {
      ...toRefs(state),

      getValue,
      setValue
    }
  }
})
</script>

<style scoped lang="less">
.transfer-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 80px;
  margin-bottom: 24px;
  text-align: left;
}
</style>
