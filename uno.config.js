import { defineConfig } from 'unocss'
import { uno } from './uno'
const { rules } = uno({
  sr: {
    cmain: '#FFFFFF', // 主题色
    csub: '#FFFFFF', // 主题次色，主要用来做渐变
    ctext: '#000000', // 主题文字色
    chigh: '#000000', // 高亮颜色
    primary: '#409EFF',
    success: '#67C23A',
    info: '#909399',
    warning: '#E6A23C',
    error: '#F56C6C',
  },
});
// https://unocss.dev/guide
export default defineConfig({ // 自定义原子css类
  rules,
})
