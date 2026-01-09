import DefaultTheme from 'vitepress/theme'
import CodexPrompt from './components/CodexPrompt.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx)
    ctx.app.component('CodexPrompt', CodexPrompt)
  },
}
