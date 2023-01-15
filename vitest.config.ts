import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    "watchExclude": ["src", "node_modules"]
  },
})
