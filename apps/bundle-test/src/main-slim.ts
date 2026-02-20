import {
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
} from 'three'
import { createTresApp } from '@tresjs/core/slim'
import SceneCreateTres from './SceneCreateTres.vue'

const canvas = document.getElementById('canvas') as HTMLCanvasElement

const root = createTresApp(canvas, { windowSize: true })

root
  .extend({ AmbientLight, BoxGeometry, DirectionalLight, Mesh, MeshStandardMaterial, PerspectiveCamera })
  .render(SceneCreateTres)
