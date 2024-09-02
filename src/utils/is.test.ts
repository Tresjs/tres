import { BufferGeometry, Fog, MeshBasicMaterial, MeshNormalMaterial, Object3D, PerspectiveCamera } from 'three'
import * as is from './is'

describe('is', () => {
  describe('is.num(a: any)', () => {
    describe('true', () => {
      it('number', () => {
        assert(is.num(0))
        assert(is.num(-1))
        assert(is.num(Math.PI))
        assert(is.num(Number.POSITIVE_INFINITY))
        assert(is.num(Number.NEGATIVE_INFINITY))
        assert(is.num(42))
        assert(is.num(0b1111))
        assert(is.num(0o17))
        assert(is.num(0xF))
      })
    })
    describe('false', () => {
      it('null', () => {
        assert(!is.num(null))
      })
      it('undefined', () => {
        assert(!is.num(undefined))
      })
      it('string', () => {
        assert(!is.num(''))
        assert(!is.num('1'))
      })
      it('function', () => {
        assert(!is.num(() => {}))
        assert(!is.num(() => 1))
      })
      it('array', () => {
        assert(!is.num([]))
        assert(!is.num([1]))
      })
    })
  })
  describe('is.und(a: any)', () => {
    describe('true', () => {
      it('undefined', () => {
        assert(is.und(undefined))
      })
    })
    describe('false', () => {
      it('null', () => {
        assert(!is.und(null))
      })
      it('number', () => {
        assert(!is.und(0))
        assert(!is.und(-1))
        assert(!is.und(Math.PI))
        assert(!is.und(Number.POSITIVE_INFINITY))
        assert(!is.und(Number.NEGATIVE_INFINITY))
        assert(!is.und(42))
      })
      it('string', () => {
        assert(!is.und(''))
        assert(!is.und('tresObject'))
      })
      it('function', () => {
        assert(!is.und(() => {}))
      })
      it('array', () => {
        assert(!is.und([]))
      })
    })
  })
  describe('is.tresObject(a: any)', () => {
    describe('true', () => {
      it('object3D', () => {
        assert(is.tresObject(new Object3D()))
      })
      it('bufferGeometry', () => {
        assert(is.tresObject(new BufferGeometry()))
      })
      it('material', () => {
        assert(is.tresObject(new MeshNormalMaterial()))
      })
      it('fog', () => {
        assert(is.tresObject(new Fog('red')))
      })
      it('camera', () => {
        assert(is.tresObject(new PerspectiveCamera()))
      })
    })
    describe('false', () => {
      it('undefined', () => {
        assert(!is.tresObject(undefined))
      })
      it('null', () => {
        assert(!is.tresObject(null))
      })
      it('number', () => {
        assert(!is.tresObject(0))
        assert(!is.tresObject(Math.PI))
        assert(!is.tresObject(Number.POSITIVE_INFINITY))
        assert(!is.tresObject(Number.NEGATIVE_INFINITY))
        assert(!is.tresObject(42))
      })
      it('string', () => {
        assert(!is.tresObject(''))
        assert(!is.tresObject('tresObject'))
      })
      it('function', () => {
        assert(!is.tresObject(() => {}))
        assert(!is.tresObject(() => {}))
      })
    })
  })

  describe('is.bufferGeometry(a: any)', () => {
    describe('true', () => {
      it('bufferGeometry', () => {
        assert(is.bufferGeometry(new BufferGeometry()))
      })
    })
    describe('false', () => {
      it('object3D', () => {
        assert(!is.bufferGeometry(new Object3D()))
      })
      it('material', () => {
        assert(!is.bufferGeometry(new MeshNormalMaterial()))
      })
      it('fog', () => {
        assert(!is.bufferGeometry(new Fog('red')))
      })
      it('camera', () => {
        assert(!is.bufferGeometry(new PerspectiveCamera()))
      })
      it('undefined', () => {
        assert(!is.bufferGeometry(undefined))
      })
      it('null', () => {
        assert(!is.bufferGeometry(null))
      })
      it('number', () => {
        assert(!is.bufferGeometry(0))
        assert(!is.bufferGeometry(Math.PI))
        assert(!is.bufferGeometry(Number.POSITIVE_INFINITY))
        assert(!is.bufferGeometry(Number.NEGATIVE_INFINITY))
        assert(!is.bufferGeometry(42))
      })
      it('string', () => {
        assert(!is.bufferGeometry(''))
        assert(!is.bufferGeometry('bufferGeometry'))
      })
      it('function', () => {
        assert(!is.bufferGeometry(() => {}))
        assert(!is.bufferGeometry(() => {}))
      })
    })
  })

  describe('is.material(a: any)', () => {
    describe('true', () => {
      it('material', () => {
        assert(is.material(new MeshNormalMaterial()))
        assert(is.material(new MeshBasicMaterial()))
      })
    })
    describe('false', () => {
      it('object3D', () => {
        assert(!is.bufferGeometry(new Object3D()))
      })
      it('bufferGeometry', () => {
        assert(!is.bufferGeometry(new MeshNormalMaterial()))
      })
      it('fog', () => {
        assert(!is.bufferGeometry(new Fog('red')))
      })
      it('camera', () => {
        assert(!is.bufferGeometry(new PerspectiveCamera()))
      })
      it('undefined', () => {
        assert(!is.bufferGeometry(undefined))
      })
      it('null', () => {
        assert(!is.bufferGeometry(null))
      })
      it('number', () => {
        assert(!is.bufferGeometry(0))
        assert(!is.bufferGeometry(Math.PI))
        assert(!is.bufferGeometry(Number.POSITIVE_INFINITY))
        assert(!is.bufferGeometry(Number.NEGATIVE_INFINITY))
        assert(!is.bufferGeometry(42))
      })
      it('string', () => {
        assert(!is.bufferGeometry(''))
        assert(!is.bufferGeometry('bufferGeometry'))
      })
      it('function', () => {
        assert(!is.bufferGeometry(() => {}))
        assert(!is.bufferGeometry(() => {}))
      })
    })
  })

  describe('is.camera(a: any)', () => {
    describe('true', () => {
      it('camera', () => {
        assert(is.camera(new PerspectiveCamera()))
      })
    })
    describe('false', () => {
      it('object3D', () => {
        assert(!is.camera(new Object3D()))
      })
      it('bufferGeometry', () => {
        assert(!is.camera(new BufferGeometry()))
      })
      it('material', () => {
        assert(!is.camera(new MeshNormalMaterial()))
      })
      it('fog', () => {
        assert(!is.camera(new Fog('red')))
      })
      it('undefined', () => {
        assert(!is.camera(undefined))
      })
      it('null', () => {
        assert(!is.camera(null))
      })
      it('number', () => {
        assert(!is.camera(0))
        assert(!is.camera(Math.PI))
        assert(!is.camera(Number.POSITIVE_INFINITY))
        assert(!is.camera(Number.NEGATIVE_INFINITY))
        assert(!is.camera(42))
      })
      it('string', () => {
        assert(!is.camera(''))
        assert(!is.camera('camera'))
      })
      it('function', () => {
        assert(!is.camera(() => {}))
        assert(!is.camera(() => {}))
      })
    })
  })

  describe('is.fog(a: any)', () => {
    describe('true', () => {
      it('fog', () => {
        assert(is.fog(new Fog('red')))
      })
    })
    describe('false', () => {
      it('object3D', () => {
        assert(!is.fog(new Object3D()))
      })
      it('camera', () => {
        assert(!is.fog(new PerspectiveCamera()))
      })
      it('bufferGeometry', () => {
        assert(!is.fog(new BufferGeometry()))
      })
      it('material', () => {
        assert(!is.fog(new MeshNormalMaterial()))
      })
      it('undefined', () => {
        assert(!is.fog(undefined))
      })
      it('null', () => {
        assert(!is.fog(null))
      })
      it('number', () => {
        assert(!is.fog(0))
        assert(!is.fog(Math.PI))
        assert(!is.fog(Number.POSITIVE_INFINITY))
        assert(!is.fog(Number.NEGATIVE_INFINITY))
        assert(!is.fog(42))
      })
      it('string', () => {
        assert(!is.fog(''))
        assert(!is.fog('camera'))
      })
      it('function', () => {
        assert(!is.fog(() => {}))
        assert(!is.fog(() => {}))
      })
    })
  })
})
