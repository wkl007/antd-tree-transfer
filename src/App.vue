<template>
  <div class="container">
    <h1>Ant Design Vue 树穿梭框示例</h1>
    <a-radio-group v-model:value="current" button-style="solid">
      <a-radio-button value="/options">Options API 示例</a-radio-button>
      <a-radio-button value="/composition">Composition API 示例</a-radio-button>
    </a-radio-group>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const current = ref('')

    watch(current, val => {
      router.replace(val)
    })

    watch(
      () => route.path,
      val => {
        current.value = val
      }
    )

    return {
      current
    }
  }
})
</script>

<style lang="less">
.container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;

  h1 {
    line-height: 80px;
  }
}
</style>
