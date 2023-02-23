import { mount } from '@vue/test-utils'
import { WebGLRenderer } from 'three'
var glContext = require('gl')(1, 1) //headless-gl
var Canvas = require('canvas')
var canvasGL = new Canvas.Canvas(window.innerWidth, window.innerHeight)
canvasGL.addEventListener = function (event, func, bind_) {} // mock function to avoid errors inside THREE.WebGlRenderer()

import { Scene } from './component'

var width = 64
var height = 64
var gl = require('gl')(width, height, { preserveDrawingBuffer: true })
const canvas = document.createElement('canvas')

test('mount component', async () => {
  expect(Scene).toBeTruthy()

  const wrapper = mount(Scene, {
    global: {
      provide: {
        renderer: new WebGLRenderer({ canvas, context: gl }),
      },
    },
  })
  console.log(wrapper.vm)
  expect(wrapper.vm).toBeTruthy()
})
