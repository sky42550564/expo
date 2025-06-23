import { defineConfig } from 'unocss'
import uno from './utils/libs/uno.js'

// https://unocss.dev/guide
export default defineConfig({ // 自定义原子css类
  rules: uno().rules,
})
