<script setup lang="ts">
import { computed, ref } from 'vue'
import { TresCanvas, TresErrorBoundary } from '@tresjs/core'
/**
 * Example component demonstrating TresErrorBoundary usage
 * This shows how to wrap TresCanvas with error boundary functionality
 */

// Example state for triggering errors for demonstration
const shouldCauseError = ref(false)
const cameraAspect = computed(() => typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 1)

/**
 * Handles errors caught by the error boundary
 */
const handleError = (error: Error, instance: any, info: string): void => {
  console.error('[Example] Error boundary caught error:', {
    error: error.message,
    instance,
    info,
  })
}

/**
 * Triggers an intentional error for demonstration
 */
const triggerError = (): void => {
  shouldCauseError.value = true
}

// Create an invalid material reference to trigger an error
const invalidMaterial = computed(() => {
  if (shouldCauseError.value) {
    // This will cause an error by trying to access a non-existent property
    return { color: 1 }
  }
  return { color: 'red' }
})
</script>

<template>
  <div class="example-container">
    <h1>TresErrorBoundary Example</h1>

    <div class="controls">
      <button
        type="button"
        class="trigger-error-btn"
        @click="triggerError"
      >
        Trigger Error (for demo)
      </button>
    </div>

    <div class="aspect-16/9 w-full">
      <!-- Error Boundary wrapping TresCanvas -->
      <TresErrorBoundary
        :show-stack-trace="true"
        :show-retry-button="true"
        :show-copy-button="true"
        @error="handleError"
      >
        <!-- TresCanvas with 3D scene -->
        <TresCanvas
          clear-color="#1e1e1e"
          :window-size="false"
        >
          <TresGroup>
            <!-- Lighting -->
            <TresAmbientLight :intensity="0.5" />
            <TresDirectionalLight
              :position="[3, 3, 3]"
              :intensity="1"
            />

            <!-- 3D Objects -->
            <TresMesh :position="[0, 0, 0]">
              <TresBoxGeometry :args="[1, 1, 1]" />
              <TresMeshStandardMaterial
                :color="shouldCauseError ? invalidMaterial.color : '#4a9eff'"
              />
            </TresMesh>

            <TresMesh :position="[2, 0, 0]">
              <TresSphereGeometry :args="[0.5, 32, 32]" />
              <TresMeshStandardMaterial color="#ff6b6b" />
            </TresMesh>

            <!-- Camera -->
            <TresPerspectiveCamera
              :position="[3, 3, 3]"
              :fov="45"
              :aspect="cameraAspect"
              :near="0.1"
              :far="1000"
            />
          </TresGroup>
        </TresCanvas>
      </TresErrorBoundary>
    </div>

    <div class="documentation">
      <h2>Usage</h2>
      <p>
        Wrap your <code>TresCanvas</code> with <code>TresErrorBoundary</code>
        to catch and display errors gracefully:
      </p>

      <pre><code>&lt;TresErrorBoundary
  :show-stack-trace="true"
  @error="handleError"
  @retry="handleRetry"
&gt;
  &lt;TresCanvas&gt;
    &lt;!-- Your 3D scene content --&gt;
  &lt;/TresCanvas&gt;
&lt;/TresErrorBoundary&gt;</code></pre>

      <h3>Features</h3>
      <ul>
        <li>✅ Catches Vue component errors</li>
        <li>✅ Detects WebGL and ThreeJS-specific errors</li>
        <li>✅ Provides user-friendly error messages</li>
        <li>✅ Shows stack trace in development</li>
        <li>✅ Copy error details to clipboard</li>
        <li>✅ Custom fallback slots</li>
        <li>✅ Responsive design</li>
        <li>✅ Dark mode friendly</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.example-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.controls {
  margin: 1rem 0;
}

.trigger-error-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
}

.trigger-error-btn:hover {
  background: #e55555;
}

.tres-canvas {
  width: 100%;
  height: 400px;
  border-radius: 8px;
  margin: 1rem 0;
}

.documentation {
  margin-top: 2rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.documentation h2,
.documentation h3 {
  color: #2c3e50;
}

.documentation pre {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}

.documentation code {
  background: #ecf0f1;
  color: #2c3e50;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
}

.documentation ul {
  list-style: none;
  padding: 0;
}

.documentation li {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

@media (max-width: 768px) {
  .example-container {
    padding: 1rem;
  }

  .tres-canvas {
    height: 300px;
  }
}
</style>
