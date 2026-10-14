import { logWarning, useLoop } from '@tresjs/core'
import type { BufferGeometry, Material, Texture } from 'three'
import { IcosahedronGeometry, Object3D, Quaternion, TextureLoader, Vector3 } from 'three'
import { onMounted, onUnmounted, toRefs, watch, watchEffect } from 'vue'
import ShaderDataBuilder from './ShaderDataBuilder'
import type { SparklesInfoRows, SparklesMaterialUniforms, SparklesResolvedProps } from './props'
import { toCooldownRatio, toNoiseScale } from './props'

export interface SparklesParts {
  object: Object3D & { geometry: BufferGeometry }
  material: Material & SparklesMaterialUniforms
  setGeometry: (geometry: BufferGeometry) => void
}

function isObject3D(o: any): o is Object3D {
  return o && 'isObject3D' in o
}

function isBufferGeometry(o: any): o is BufferGeometry {
  return o && 'isBufferGeometry' in o
}

export function useSparkles(props: SparklesResolvedProps, create: (yFor: SparklesInfoRows) => SparklesParts) {
  const refs = toRefs(props)
  const { texture: infoTexture, yFor } = new ShaderDataBuilder(256)
    .add
    .GradientTresColor(refs.sequenceColor)
    .id('sequenceColor')
    .add
    .Gradient01(refs.sequenceAlpha)
    .id('sequenceAlpha')
    .add
    .Gradient01(refs.sequenceSurfaceDistance)
    .id('sequenceSurfaceDistance')
    .add
    .Gradient01(refs.sequenceSize)
    .id('sequenceSize')
    .add
    .GradientXyz(refs.sequenceOffset, -1, 1)
    .id('sequenceOffset')
    .add
    .GradientXyz(refs.sequenceNoise, 0, 1)
    .id('sequenceNoise')
    .build()
    .useTexture()

  const { object, material, setGeometry } = create(yFor as SparklesInfoRows)

  watch(() => [props.blending, props.transparent, props.depthWrite] as const, ([blending, transparent, depthWrite]) => {
    material.blending = blending
    material.transparent = transparent
    material.depthWrite = depthWrite
    material.needsUpdate = true
  }, { immediate: true })

  watchEffect(() => {
    material.uInfoTexture = infoTexture.value
    material.uSize = props.size
    material.uNormalThreshold = props.normalThreshold
    material.uAlpha = props.alpha
    material.uOffset = props.offset
    material.uSurfaceDistance = props.surfaceDistance
    material.uScaleNoise = props.scaleNoise
    material.uOffsetNoise = props.offsetNoise
    material.uLifetimeNoise = props.lifetimeNoise
    material.uMixColor = props.mixColor
    material.uMixAlpha = props.mixAlpha
    material.uMixOffset = props.mixOffset
    material.uMixSize = props.mixSize
    material.uMixSurfaceDistance = props.mixSurfaceDistance
    material.uMixNoise = props.mixNoise
    material.uNoiseScale = toNoiseScale(props.noiseScale, props.lifetimeSec)
    material.uCooldownRatio = toCooldownRatio(props.cooldownSec, props.lifetimeSec)
  })

  // Only a texture that this component loads is disposed here. A `map` texture belongs to the user.
  const loader = new TextureLoader()
  let loadedMap: Texture | null = null
  const setMap = (next: Texture, loaded: Texture | null) => {
    const previous = loadedMap
    loadedMap = loaded
    material.uMap = next
    previous?.dispose()
  }

  watch(() => props.map, (map, _, onCleanup) => {
    if (typeof map !== 'string') {
      setMap(map, null)
      return
    }
    let stale = false
    onCleanup(() => { stale = true })
    loader.load(map, (texture) => {
      if (stale) {
        texture.dispose()
        return
      }
      setMap(texture, texture)
    }, undefined, (error) => {
      if (!stale) {
        logWarning(`Sparkles could not load the map "${map}".`, error)
      }
    })
  }, { immediate: true })

  const rotation = new Quaternion()
  const normal = new Vector3()
  useLoop().onBeforeRender(({ elapsed, renderer }) => {
    material.uPixelRatio = renderer.getPixelRatio()
    object.getWorldQuaternion(rotation)
    normal.copy(props.directionalLight ? props.directionalLight.position : Object3D.DEFAULT_UP).normalize()
    material.uNormal.copy(normal.applyQuaternion(rotation.invert()))
    material.uTime = elapsed / (props.cooldownSec + props.lifetimeSec)
  })

  onMounted(() => {
    if (isBufferGeometry(props.geometry)) {
      setGeometry(props.geometry)
    }
    else if (isObject3D(props.geometry) && 'geometry' in props.geometry && isBufferGeometry(props.geometry.geometry)) {
      setGeometry(props.geometry.geometry)
    }
    else if (isObject3D(object.parent) && 'geometry' in object.parent && isBufferGeometry(object.parent.geometry)) {
      setGeometry(object.parent.geometry)
    }
    else {
      const icosahedron = new IcosahedronGeometry(1, 16)
      setGeometry(icosahedron)
      icosahedron.dispose()
    }
  })

  onUnmounted(() => {
    loadedMap?.dispose()
    infoTexture.value.dispose()
    object.geometry.dispose()
    material.dispose()
  })

  return { object }
}
