<template>
  <div class="transfer-wrapper">
    <transfer
      :tree-data="treeData"
      :edit-key="editKey"
    />
  </div>
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
      editKey: data.editKey
    }
  }
})
</script>

<style scoped lang="less">
.transfer-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 80px;
  text-align: left;
}
</style>
