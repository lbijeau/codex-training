<template>
  <div class="codex-prompt">
    <div class="codex-prompt__tabs" role="tablist" aria-label="Prompt tabs">
      <button
        class="codex-prompt__tab"
        type="button"
        role="tab"
        :aria-selected="active === 'rendered'"
        @click="active = 'rendered'"
      >
        {{ renderedLabel }}
      </button>
      <button
        class="codex-prompt__tab"
        type="button"
        role="tab"
        :aria-selected="active === 'raw'"
        @click="active = 'raw'"
      >
        {{ rawLabel }}
      </button>
    </div>

    <div v-show="active === 'rendered'" class="codex-prompt__panel" role="tabpanel">
      <slot />
    </div>

    <pre v-show="active === 'raw'" class="codex-prompt__raw" role="tabpanel">
<code :class="codeClass" v-text="raw" />
    </pre>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  raw: {
    type: String,
    required: true,
  },
  rawLabel: {
    type: String,
    default: 'Raw Markdown',
  },
  renderedLabel: {
    type: String,
    default: 'Rendered',
  },
  language: {
    type: String,
    default: 'markdown',
  },
})

const active = ref<'rendered' | 'raw'>('rendered')
const codeClass = computed(() => `language-${props.language}`)
</script>
