<script setup lang="ts">
import { computed, nextTick, onErrorCaptured, ref } from 'vue'
import type { ComponentPublicInstance } from 'vue'

export interface TresErrorBoundaryProps {
  /**
   * Custom error fallback component to display when an error occurs
   * If not provided, the default error display will be used
   */
  errorFallback?: ComponentPublicInstance | (() => any)
  /**
   * Whether to show the error stack trace
   * @default true in development, false in production
   */
  showStackTrace?: boolean
  /**
   * Custom error handler function
   * Called when an error is captured
   */
  onError?: (error: Error, instance: ComponentPublicInstance | null, info: string) => void
}

const props = withDefaults(defineProps<TresErrorBoundaryProps>(), {
  showStackTrace: undefined,
})

const emit = defineEmits<{
  /**
   * Emitted when an error is captured
   */
  error: [error: Error, instance: ComponentPublicInstance | null, info: string]
}>()

const slots = defineSlots<{
  default: () => any
  fallback?: (props: { error: Error, copyError: () => void }) => any
}>()

// Error state management
const hasError = ref(false)
const errorDetails = ref<{
  error: Error
  instance: ComponentPublicInstance | null
  info: string
} | null>(null)

// Computed properties
const isDevelopment = computed(() => {
  return process.env.NODE_ENV === 'development' || import.meta.env.DEV
})

const shouldShowStackTrace = computed(() => {
  return props.showStackTrace !== undefined
    ? props.showStackTrace
    : isDevelopment.value
})

/**
 * Detects if an error is WebGL-related
 */
const isWebGLError = (error: Error): boolean => {
  const webglErrorPatterns = [
    /webgl/i,
    /context/i,
    /shader/i,
    /texture/i,
    /framebuffer/i,
    /renderbuffer/i,
    /gl\./i,
    /opengl/i,
    /webglcontextlost/i,
    /webglcontextrestored/i,
  ]

  const errorMessage = error.message.toLowerCase()
  const errorName = error.name.toLowerCase()

  return webglErrorPatterns.some(pattern =>
    pattern.test(errorMessage) || pattern.test(errorName),
  )
}

/**
 * Detects if an error is ThreeJS-related
 */
const isThreeJSError = (error: Error): boolean => {
  const threejsErrorPatterns = [
    /three\./i,
    /object3d/i,
    /geometry/i,
    /material/i,
    /mesh/i,
    /camera/i,
    /light/i,
    /scene/i,
    /renderer/i,
    /buffer/i,
    /attribute/i,
  ]

  const errorMessage = error.message.toLowerCase()
  const errorStack = error.stack?.toLowerCase() || ''

  return threejsErrorPatterns.some(pattern =>
    pattern.test(errorMessage) || pattern.test(errorStack),
  )
}

/**
 * Gets the error type for display (like Astro's error pages)
 */
const getErrorType = (error: Error): string => {
  if (error.name) {
    return error.name
  }

  if (isWebGLError(error)) {
    return 'WebGLError'
  }

  if (isThreeJSError(error)) {
    return 'ThreeJSError'
  }

  return 'Error'
}

/**
 * Gets a user-friendly error message based on error type
 */
const getFriendlyErrorMessage = (error: Error): string => {
  if (isWebGLError(error)) {
    return 'There was an issue with the graphics rendering. This might be due to browser limitations or hardware compatibility.'
  }

  if (isThreeJSError(error)) {
    return 'There was an issue with the 3D scene. This might be due to incorrect geometry, materials, or scene setup.'
  }

  return 'An unexpected error occurred in the 3D scene.'
}

/**
 * Formats stack trace for better readability
 */
const formatStackTrace = (stack: string): string => {
  return stack
    .split('\n')
    .filter(line => line.trim())
    .map(line => line.replace(/^\s+at\s+/, ''))
    .join('\n')
}

/**
 * Handles error capture from Vue's errorCaptured lifecycle hook
 */
onErrorCaptured((error: Error, instance: ComponentPublicInstance | null, info: string) => {
  console.error('[TresErrorBoundary] Error captured:', error)
  console.error('[TresErrorBoundary] Error info:', info)
  console.error('[TresErrorBoundary] Component instance:', instance)

  // Store error details for display
  errorDetails.value = { error, instance, info }
  hasError.value = true

  // Call custom error handler if provided
  if (props.onError) {
    props.onError(error, instance, info)
  }

  // Emit error event
  emit('error', error, instance, info)

  // Prevent the error from propagating further up the component tree
  return false
})

/**
 * Copy error details to clipboard
 */
const copyError = async (): Promise<void> => {
  if (!errorDetails.value) { return }

  const { error, info } = errorDetails.value
  const errorText = `Error: ${error.message}\nInfo: ${info}\nStack: ${error.stack || 'No stack trace available'}`

  try {
    await navigator.clipboard.writeText(errorText)
    // Error details copied to clipboard successfully
  }
  catch (clipboardError) {
    console.error('[TresErrorBoundary] Failed to copy to clipboard:', clipboardError)
    // Fallback: create a temporary textarea
    const textarea = document.createElement('textarea')
    textarea.value = errorText
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
}

// Expose methods for external access
defineExpose({
  copyError,
  hasError: computed(() => hasError.value),
  errorDetails: computed(() => errorDetails.value),
})

// Inject error boundary styles with grayscale design system and teal accents
const errorBoundaryStyles = `
  .tres-error-boundary {
    /* 🎨 Design System Variables */
    --font-display: 'Manrope', sans-serif;
    --font-sans: 'Inter', sans-serif;
    --ui-radius: 0.5rem;
    
    /* Grayscale Palette */
    --color-gray-50: #f9fafb;
    --color-gray-100: #f3f4f6;
    --color-gray-200: #e5e7eb;
    --color-gray-300: #d1d5db;
    --color-gray-400: #9ca3af;
    --color-gray-500: #6b7280;
    --color-gray-600: #4b5563;
    --color-gray-700: #374151;
    --color-gray-800: #1f2937;
    --color-gray-900: #111827;
    --color-gray-950: #030712;
    
    /* Teal Palette (for accents) */
    --color-teal-50: #f2fbf8;
    --color-teal-100: #d3f4ea;
    --color-teal-200: #a6e9d6;
    --color-teal-300: #82dbc5;
    --color-teal-400: #44bda2;
    --color-teal-500: #2ba189;
    --color-teal-600: #20816f;
    --color-teal-700: #1d685b;
    --color-teal-800: #1c534b;
    --color-teal-900: #1b463f;
    --color-teal-950: #0a2925;
    
    /* 🎨 Error Boundary Theme Variables - Gray Primary, Teal Accents */
    --tres-error-bg: var(--color-gray-50);
    --tres-error-color: var(--color-gray-700);
    --tres-error-border: var(--color-gray-200);
    --tres-error-type-color: var(--color-teal-600);
    --tres-error-title-color: var(--color-gray-900);
    --tres-error-section-color: var(--color-gray-600);
    --tres-error-section-border: var(--color-gray-200);
    --tres-error-code-bg: white;
    --tres-error-code-border: var(--color-gray-200);
    --tres-error-code-header-bg: var(--color-gray-100);
    --tres-error-code-header-color: var(--color-gray-700);
    --tres-error-code-header-border: var(--color-gray-200);
    --tres-error-line-number-color: var(--color-gray-400);
    --tres-error-line-error-bg: color-mix(in oklab, var(--color-teal-500) 10%, transparent);
    --tres-error-line-error-color: var(--color-teal-700);
    --tres-error-stack-bg: white;
    --tres-error-stack-border: var(--color-gray-200);
    --tres-error-stack-color: var(--color-gray-600);
    --tres-error-button-bg: white;
    --tres-error-button-border: var(--color-gray-300);
    --tres-error-button-color: var(--color-gray-700);
    --tres-error-button-hover-bg: var(--color-gray-50);
    --tres-error-button-hover-border: var(--color-gray-400);
    --tres-error-button-primary-bg: var(--color-teal-500);
    --tres-error-button-primary-border: var(--color-teal-500);
    --tres-error-button-primary-color: white;
    --tres-error-button-primary-hover-bg: var(--color-teal-600);
    --tres-error-button-primary-hover-border: var(--color-teal-600);
    
    /* Component Styles */
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 400px;
    background: var(--tres-error-bg);
    color: var(--tres-error-color);
    font-family: var(--font-sans);
    padding: 2rem;
    overflow: hidden;
    border-radius: var(--ui-radius);
  }
  
  /* 🎭 Static Cube Mascot - Top Left */
  .tres-error-boundary::before {
    content: '';
    position: absolute;
    top: -50px;
    left: -50px;
    width: 300px;
    height: 300px;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg width='423' height='423' viewBox='0 0 423 423' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.49316 0.820312C2.28402 0.820312 0.493164 2.61116 0.493164 4.8203V418.503C0.493164 420.712 2.28402 422.503 4.49315 422.503H418.176C420.385 422.503 422.176 420.712 422.176 418.503V4.82031C422.176 2.61117 420.385 0.820312 418.176 0.820312H4.49316ZM70.3811 353.886C68.172 353.886 66.3811 355.677 66.3811 357.886C66.3811 360.095 68.172 361.886 70.3811 361.886H354.924C357.133 361.886 358.924 360.095 358.924 357.886C358.924 355.677 357.133 353.886 354.924 353.886H70.3811ZM155.989 211.662C155.989 236.406 135.929 256.466 111.185 256.466C86.4404 256.466 66.3811 236.406 66.3811 211.662C66.3811 186.917 86.4404 166.858 111.185 166.858C135.929 166.858 155.989 186.917 155.989 211.662ZM314.12 256.466C338.864 256.466 358.924 236.406 358.924 211.662C358.924 186.917 338.864 166.858 314.12 166.858C289.375 166.858 269.316 186.917 269.316 211.662C269.316 236.406 289.375 256.466 314.12 256.466Z' fill='%23000000'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    transform: rotate(-15deg);
    z-index: 0;
    pointer-events: none;
  }
  
  /* 🌙 Dark Mode - Gray Primary, Teal Accents */
  @media (prefers-color-scheme: dark) {
    .tres-error-boundary {
      --tres-error-bg: var(--color-gray-900);
      --tres-error-color: var(--color-gray-300);
      --tres-error-border: var(--color-gray-700);
      --tres-error-type-color: var(--color-teal-400);
      --tres-error-title-color: var(--color-gray-100);
      --tres-error-section-color: var(--color-gray-400);
      --tres-error-section-border: var(--color-gray-700);
      --tres-error-code-bg: var(--color-gray-800);
      --tres-error-code-border: var(--color-gray-700);
      --tres-error-code-header-bg: var(--color-gray-700);
      --tres-error-code-header-color: var(--color-gray-300);
      --tres-error-code-header-border: var(--color-gray-600);
      --tres-error-line-number-color: var(--color-gray-500);
      --tres-error-line-error-bg: color-mix(in oklab, var(--color-teal-400) 15%, transparent);
      --tres-error-line-error-color: var(--color-teal-300);
      --tres-error-stack-bg: var(--color-gray-800);
      --tres-error-stack-border: var(--color-gray-700);
      --tres-error-stack-color: var(--color-gray-400);
      --tres-error-button-bg: var(--color-gray-700);
      --tres-error-button-border: var(--color-gray-600);
      --tres-error-button-color: var(--color-gray-200);
      --tres-error-button-hover-bg: var(--color-gray-600);
      --tres-error-button-hover-border: var(--color-gray-500);
      --tres-error-button-primary-bg: var(--color-teal-500);
      --tres-error-button-primary-border: var(--color-teal-500);
      --tres-error-button-primary-hover-bg: var(--color-teal-400);
      --tres-error-button-primary-hover-border: var(--color-teal-400);
    }
    
    /* Cube mascot with slightly higher opacity in dark mode */
    .tres-error-boundary::before {
      opacity: 0.08;
    }
  }
  
  .tres-error-boundary-content {
    position: relative;
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    z-index: 1; /* Above the mascot */
  }
  
  .tres-error-header {
    margin-bottom: 2rem;
  }
  
  .tres-error-type {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.125rem;
    font-weight: 500;
    color: var(--tres-error-type-color);
    margin-bottom: 0.5rem;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  }
  
  .tres-error-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--tres-error-title-color);
    margin-bottom: 1.5rem;
    line-height: 1.2;
    font-family: var(--font-display);
  }
  
  .tres-error-section {
    margin-bottom: 2rem;
  }
  
  .tres-error-section h3 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--tres-error-section-color);
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--tres-error-section-border);
    padding-bottom: 0.5rem;
    font-family: var(--font-display);
  }
  
  .tres-error-code-block {
    background: var(--tres-error-code-bg);
    border: 1px solid var(--tres-error-code-border);
    border-radius: var(--ui-radius);
    overflow: hidden;
    margin: 1rem 0;
  }
  
  .tres-error-code-header {
    background: var(--tres-error-code-header-bg);
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    color: var(--tres-error-code-header-color);
    border-bottom: 1px solid var(--tres-error-code-header-border);
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    font-weight: 500;
  }
  
  .tres-error-code-content {
    padding: 1rem;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    font-size: 0.875rem;
    line-height: 1.6;
    overflow-x: auto;
  }
  
  .tres-error-line {
    display: flex;
    align-items: flex-start;
    margin: 0.25rem 0;
  }
  
  .tres-error-line-number {
    display: inline-block;
    width: 3rem;
    text-align: right;
    color: var(--tres-error-line-number-color);
    user-select: none;
    margin-right: 1rem;
    flex-shrink: 0;
    font-weight: 500;
  }
  
  .tres-error-line-content {
    flex: 1;
    white-space: pre-wrap;
    word-break: break-word;
  }
  
  .tres-error-line-error {
    background: var(--tres-error-line-error-bg);
    color: var(--tres-error-line-error-color);
    margin: 0 -1rem;
    padding: 0 1rem;
    border-radius: 0.25rem;
  }
  
  .tres-error-stack {
    background: var(--tres-error-stack-bg);
    border: 1px solid var(--tres-error-stack-border);
    border-radius: var(--ui-radius);
    padding: 1rem;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--tres-error-stack-color);
    max-height: 300px;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-word;
  }
  
  .tres-error-actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 2rem;
    flex-wrap: wrap;
  }
  
  .tres-error-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--tres-error-button-bg);
    border: 1px solid var(--tres-error-button-border);
    color: var(--tres-error-button-color);
    padding: 0.625rem 1rem;
    border-radius: var(--ui-radius);
    cursor: pointer;
    font-family: var(--font-sans);
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.15s ease;
    text-decoration: none;
  }
  
  .tres-error-button:hover {
    background: var(--tres-error-button-hover-bg);
    border-color: var(--tres-error-button-hover-border);
    transform: translateY(-1px);
  }
  
  .tres-error-button-primary {
    background: var(--tres-error-button-primary-bg);
    border-color: var(--tres-error-button-primary-border);
    color: var(--tres-error-button-primary-color);
  }
  
  .tres-error-button-primary:hover {
    background: var(--tres-error-button-primary-hover-bg);
    border-color: var(--tres-error-button-primary-hover-border);
  }
  
  @media (max-width: 640px) {
    .tres-error-boundary {
      padding: 1rem;
      overflow: auto;
    }
    
    .tres-error-boundary::before {
      width: 120px;
      height: 120px;
      top: -30px;
      left: -30px;
    }
    
    .tres-error-title {
      font-size: 1.5rem;
    }
    
    .tres-error-actions {
      flex-direction: column;
    }
    
    .tres-error-button {
      justify-content: center;
    }
  }
`

// Inject styles into document head
if (typeof document !== 'undefined') {
  const styleId = 'tres-error-boundary-styles'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = errorBoundaryStyles
    document.head.appendChild(style)
  }
}
</script>

<template>
  <div class="tres-error-boundary-wrapper">
    <!-- Error display -->
    <div v-if="hasError" class="tres-error-boundary">
      <!-- Custom fallback slot -->
      <slot
        v-if="slots.fallback && errorDetails"
        name="fallback"
        :error="errorDetails.error"
        :copy-error="copyError"
      ></slot>

      <!-- Default error display -->
      <div v-else-if="errorDetails" class="tres-error-boundary-content">
        <!-- Error header -->
        <div class="tres-error-header">
          <div class="tres-error-type">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" /></g></svg>
            {{ getErrorType(errorDetails.error) }}
          </div>
          <h1 class="tres-error-title">
            Oops! An error occurred.
          </h1>
        </div>

        <!-- Error message section -->
        <div class="tres-error-section">
          <div class="tres-error-code-block">
            <div class="tres-error-code-header">
              {{ errorDetails.info || 'Error Message' }}
            </div>
            <div class="tres-error-code-content">
              <div class="tres-error-line tres-error-line-error">
                <span class="tres-error-line-number">!</span>
                <span class="tres-error-line-content">{{ errorDetails.error.message }}</span>
              </div>
            </div>
          </div>

          <p style="margin-top: 1rem; color: var(--color-gray-500); font-size: 0.875rem;">
            {{ getFriendlyErrorMessage(errorDetails.error) }}
          </p>
        </div>

        <!-- Stack trace section (development only or when explicitly enabled) -->
        <div v-if="shouldShowStackTrace && errorDetails.error.stack" class="tres-error-section">
          <h3>Stack Trace</h3>
          <div class="tres-error-stack">{{ formatStackTrace(errorDetails.error.stack) }}</div>
        </div>
      </div>
    </div>

    <!-- Normal content when no error -->
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>
