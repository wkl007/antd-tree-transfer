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
import { defineComponent } from 'vue'
import Transfer from '@/components/options-transfer.vue'
import data from '@/assets/data'

export default defineComponent({
  name: 'Options',
  components: {
    Transfer
  },
  data () {
    return {
      treeData: data.treeData,
      editKey: [] as string[]
    }
  },
  methods: {
    // 获取值
    getValue () {
      const transferRef: any = this.$refs.transferRef
      if (transferRef) console.log(transferRef.emitKeys)
    },
    // 设置值
    setValue () {
      this.editKey = data.editKey
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
