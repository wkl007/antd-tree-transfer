import { Button, Empty, Radio, Transfer, Tree } from 'ant-design-vue'
import type { App } from 'vue'

/**
 * antd 按需加载配置
 * @param app
 */
export function setupAntd (app: App): void {
  app
    .use(Button)
    .use(Radio)
    .use(Transfer)
    .use(Tree)
    .use(Empty)
}
