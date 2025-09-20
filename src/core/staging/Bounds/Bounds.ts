import type { VectorFlexibleParams } from '@tresjs/core'
import { normalizeVectorFlexibleParam } from '@tresjs/core'
import type { Camera, OrthographicCamera, PerspectiveCamera } from 'three'
import { Box3, MathUtils, Matrix4, Object3D, Quaternion, Vector3 } from 'three'

interface SizeReturn {
  box: Box3
  size: Vector3
  center: Vector3
  distance: number
}

export interface BoundsControlsProto {
  update: () => void
  target: Vector3
  maxDistance: number
  addEventListener: (event: string, callback: (event: any) => void) => void
  removeEventListener: (event: string, callback: (event: any) => void) => void
}

interface StartT {
  position: Vector3
  quaternion: Quaternion
  zoom: number
}

interface GoalT {
  position: Vector3 | undefined
  quaternion: Quaternion | undefined
  zoom: number | undefined
  up: Vector3 | undefined
  lookAt: Vector3 | undefined
  box: Box3 | undefined
  object: Box3 | Object3D | undefined
}

export interface OnLookAtCallbackArg {
  position: Vector3
  quaternion: Quaternion
  zoom: number | undefined
  up: Vector3 | undefined
  lookAt: Vector3
  box: Box3
  object: Box3 | Object3D | undefined
}

type CachedFitArgs =
  [ Vector3 | null, Vector3, Vector3 ]
  | [ Vector3 | null, Vector3]
  | [ Vector3 | null]
  | [ Object3D ]
  | [ Object3D, Vector3 ]
  | [ Box3 ]
  | [ Box3, Vector3 ]

enum AnimationState {
  NONE = 0,
  ACTIVE = 2,
}

const isOrthographicCamera = (def: Camera): def is OrthographicCamera =>
  def && (def as OrthographicCamera).isOrthographicCamera
const isPerspectiveCamera = (def: Camera): def is PerspectiveCamera =>
  def && (def as PerspectiveCamera).isPerspectiveCamera
const isBox3 = (def: any): def is Box3 => def && (def as Box3).isBox3

const easingFnDefault = (t: number) => { return 1 - Math.exp(-5 * t) + 0.007 * t }

export class Bounds extends Object3D {
  camera: Camera
  offset = 0.2
  duration = 1
  clip = true

  private _start: StartT = {
    position: new Vector3(),
    quaternion: new Quaternion(),
    zoom: 1,
  }

  private _goal: GoalT = {
    position: undefined,
    quaternion: undefined,
    zoom: undefined,
    up: undefined,
    lookAt: undefined,
    box: undefined,
    object: undefined,
  }

  private _animationState = AnimationState.NONE
  private _t = 0.0
  private _controls: BoundsControlsProto | null = null
  private _controlsRemoveEventListener = () => {}

  // NOTE: Overloaded functions and TS `Parameters` does not work.
  // moz-extension://b37b5993-6262-452a-b49a-4f9e44f44989/confirm-page.html?url=https%3A%2F%2Fgithub.com%2Fmicrosoft%2FTypeScript%2Fissues%2F29732&cookieStoreId=firefox-container-21&currentCookieStoreId=firefox-container-8
  private _cachedFitArgs: CachedFitArgs = [this]

  constructor(camera: Camera) {
    super()
    this.camera = camera
  }

  dispose() {
    this.controls = null
  }

  onStart(_: OnLookAtCallbackArg) {}
  onCancel(_: OnLookAtCallbackArg) {}
  onEnd(_: OnLookAtCallbackArg) {}
  easing = easingFnDefault

  get controls() {
    return this._controls
  }

  set controls(controls: BoundsControlsProto | null) {
    this._controlsRemoveEventListener()
    this._controlsRemoveEventListener = () => {}

    if (controls) {
      this._controls = controls
      // NOTE: Try to prevent drag hijacking
      // Attach an event to listen to `controls` "start".
      // It is triggered when active controls are interacted with and
      // should cancel animations here.
      // https://threejs.org/docs/#examples/en/controls/OrbitControls
      const callback = () => {
        if (controls && this._goal.lookAt && this._animationState !== AnimationState.NONE) {
          const front = new Vector3().setFromMatrixColumn(this.camera.matrix, 2)
          const d0 = this._start.position.distanceTo(controls.target)
          const d1 = (this._goal.position || this._start.position).distanceTo(this._goal.lookAt)
          const d = (1 - this._t) * d0 + this._t * d1

          controls.target.copy(this.camera.position).addScaledVector(front, -d)
          controls.update()
          this._stop()
        }

        this._animationState = AnimationState.NONE
      }

      controls.addEventListener('start', callback)

      this._controlsRemoveEventListener = () => controls.removeEventListener('start', callback)
    }
  }

  private _stop() {
    if (this._goal.position) {
      this.onCancel(this._goal as OnLookAtCallbackArg)
    }
    _resetGoal(this._goal)
  }

  /**
   * Calculates a boundary box around an `Object3D` and centers the camera accordingly.
   */
  lookAt(object: Object3D): void
  /**
   * Calculates a boundary box around an `Object3D` and centers the camera accordingly and animates the camera's `up` vector.
   */
  lookAt(object: Object3D, up: VectorFlexibleParams): void
  /**
   * Centers the camera's viewport on a `Box3`.
   */
  lookAt(box3: Box3): void
  /**
   * Centers the camera's viewport on a `Box3` and animates the camera's `up` vector.
   */
  lookAt(box3: Box3, up: VectorFlexibleParams): void
  /**
   * Look at a `Vector3`.
   */
  lookAt(target: VectorFlexibleParams): void
  /**
   * Look at a `Vector3`, if provided. Move the camera to `position`.
   */
  lookAt(target: VectorFlexibleParams | undefined | null, position: VectorFlexibleParams): void
  /**
   * Look at a `Vector3`, if provided. Move the camera to `position` and animate the camera's `up` vector.
   */
  lookAt(target: VectorFlexibleParams | undefined | null, position: VectorFlexibleParams, up: VectorFlexibleParams): void
  /**
   * Rerun `lookAt` using the prior arguments. If `lookAt` has never been called, uses the `Bounds` object.
   */
  lookAt(): void
  lookAt(
    arg0?: Object3D | Box3 | VectorFlexibleParams | undefined | null,
    arg1?: VectorFlexibleParams,
    arg2?: VectorFlexibleParams,
  ) {
    // NOTE: Normalize args
    const size = arguments.length

    let args: CachedFitArgs = this._cachedFitArgs
    const v1 = arg1 ? new Vector3().fromArray(normalizeVectorFlexibleParam(arg1)) : new Vector3()
    const v2 = arg2 ? new Vector3().fromArray(normalizeVectorFlexibleParam(arg2)) : new Vector3()

    if (size === 0) {
      // NOTE: We didn't get any args, use prior args.
      args = this._cachedFitArgs
    }
    else if (!arg0 && arg0 !== 0) {
      // NOTE: `fit(lookAt=undefined | null)`
      if (size === 1) { args = [null] }
      // NOTE: `fit(lookAt=undefined | null, lookAt: VectorFlexibleParams)`
      else if (size === 2) { args = [null, v1] }
      // NOTE: `fit(lookAt=undefined | null, lookAt: VectorFlexibleParams, up: VectorFlexibleParams)`
      else if (size === 3) { args = [null, v1, v2] }
    }
    else if (typeof arg0 === 'number' || (arg0 as Vector3).isVector3 || Array.isArray(arg0)) {
      const v0 = new Vector3().fromArray(normalizeVectorFlexibleParam(arg0 as VectorFlexibleParams))
      // NOTE: `fit(position: VectorFlexibleParams)`
      if (size === 1) { args = [v0] }
      // NOTE: `fit(position: VectorFlexibleParams, lookAt: VectorFlexibleParams)`
      else if (size === 2) { args = [v0, v1] }
      // NOTE: `fit(position: VectorFlexibleParams, lookAt: VectorFlexibleParams, up: VectorFlexibleParams)`
      else if (size === 3) { args = [v0, v1, v2] }
    }
    else if ((arg0 as Box3).isBox3) {
      // NOTE: `fit(box3: Box3)`
      if (size === 1) { args = [arg0 as Box3] }
      // NOTE: `fit(box3: Box3, up)`
      else { args = [arg0 as Box3, arg1 as Vector3] }
    }
    else if ((arg0 as Object3D).isObject3D) {
      // NOTE: `fit(object: Object3D)`
      if (size === 1) { args = [arg0 as Object3D] }
      // NOTE: `fit(object: Object3D, up)`
      else { args = [arg0 as Object3D, arg1 as Vector3] }
    }

    // NOTE: End normalization.

    this._cachedFitArgs = args

    this._stop()
    _resetGoal(this._goal)

    if (args.length > 0 && (args[0] === null || args[0] === undefined || (args[0] as Vector3).isVector3)) {
      // NOTE: The user sent specific numeric values, not an object.
      const [lookAt, position, up] = args
      this._start.position.copy(this.camera.position)
      this._start.quaternion.copy(this.camera.quaternion)
      isOrthographicCamera(this.camera) && (this._start.zoom = (this.camera as OrthographicCamera).zoom)

      if (position) {
        this._goal.position = Array.isArray(position) ? new Vector3(...position) : (position as Vector3).clone()
      }
      else {
        this._goal.position = this.camera.position
      }

      if (lookAt) {
        this._goal.lookAt = Array.isArray(lookAt) ? new Vector3(...lookAt) : (lookAt as Vector3).clone()
      }
      else {
        this._goal.lookAt = new Vector3(0, 0, 1).applyQuaternion(this.camera.quaternion)
      }

      if (up) {
        this._goal.up = Array.isArray(up) ? new Vector3(...up) : up.clone()
      }

      const mCamRot = new Matrix4().lookAt(
        this._goal.position || this.camera.position,
        this._goal.lookAt,
        this._goal.up ?? this.camera.up,
      )
      this._goal.quaternion = new Quaternion().setFromRotationMatrix(mCamRot)
    }
    else {
      const box3OrObject = args[0] as Box3 | Object3D
      const { center, distance, box } = _getSize(box3OrObject, this.camera, this.offset)

      this._start.position.copy(this.camera.position)
      this._start.quaternion.copy(this.camera.quaternion)
      isOrthographicCamera(this.camera) && (this._start.zoom = (this.camera as OrthographicCamera).zoom)

      const direction = this.camera.position.clone().sub(center).normalize()
      this._goal.object = box3OrObject
      this._goal.box = box
      this._goal.position = center.clone().addScaledVector(direction, distance)
      this._goal.lookAt = center.clone()
      const mCamRot = new Matrix4().lookAt(this._goal.position, this._goal.lookAt, this.camera.up)
      this._goal.quaternion = new Quaternion().setFromRotationMatrix(mCamRot)

      if (isOrthographicCamera(this.camera)) {
        let maxHeight = 0
        let maxWidth = 0
        const vertices = [
          new Vector3(box.min.x, box.min.y, box.min.z),
          new Vector3(box.min.x, box.max.y, box.min.z),
          new Vector3(box.min.x, box.min.y, box.max.z),
          new Vector3(box.min.x, box.max.y, box.max.z),
          new Vector3(box.max.x, box.max.y, box.max.z),
          new Vector3(box.max.x, box.max.y, box.min.z),
          new Vector3(box.max.x, box.min.y, box.max.z),
          new Vector3(box.max.x, box.min.y, box.min.z),
        ]

        // NOTE: Transform the center and each corner to camera space
        const goal = this._goal
        const pos = goal.position || this.camera.position
        const target = goal.lookAt || this._controls?.target
        const up = goal.up || this.camera.up
        const mCamWInv = target
          ? new Matrix4().lookAt(pos, target, up).setPosition(pos).invert()
          : this.camera.matrixWorldInverse
        for (const v of vertices) {
          v.applyMatrix4(mCamWInv)
          maxHeight = Math.max(maxHeight, Math.abs(v.y))
          maxWidth = Math.max(maxWidth, Math.abs(v.x))
        }
        maxHeight *= 2
        maxWidth *= 2
        const zoomForHeight = (this.camera.top - this.camera.bottom) / maxHeight
        const zoomForWidth = (this.camera.right - this.camera.left) / maxWidth

        goal.zoom = Math.min(zoomForHeight, zoomForWidth) / (1 + this.offset)
        // NOTE: Fix possible division by 0.
        if (Number.isNaN(goal.zoom)) { goal.zoom = 0 }
      }

      if (this.clip) {
        if (isPerspectiveCamera(this.camera)) {
          this.camera.near = Math.abs(distance) / 100
          this.camera.far = Math.abs(distance) * 100
          this.camera.updateProjectionMatrix()
        }

        if (this._controls) {
          this._controls.maxDistance = Math.abs(distance) * 100
          this._controls.update()
        }
      }
    }

    this._t = 0
    this._animationState = AnimationState.ACTIVE

    this.onStart && this.onStart(this._goal as OnLookAtCallbackArg)
  }

  animate(delta: number) {
    if (this._animationState === AnimationState.NONE) {
      return false
    }

    if (this._animationState === AnimationState.ACTIVE) {
      this._t += delta / this.duration
      this._t = MathUtils.clamp(this._t, 0, 1)

      if (this._t >= 1) {
        this._goal.position && this.camera.position.copy(this._goal.position)
        this._goal.quaternion && this.camera.quaternion.copy(this._goal.quaternion)
        this._goal.up && this.camera.up.copy(this._goal.up)
        this._goal.zoom && isOrthographicCamera(this.camera) && (this.camera.zoom = this._goal.zoom)

        this.camera.updateMatrixWorld()
        if (isPerspectiveCamera(this.camera)) {
          this.camera.updateProjectionMatrix()
        }

        if (this._controls && this._goal.lookAt) {
          this._controls.target.copy(this._goal.lookAt)
          this._controls.update()
        }

        this._animationState = AnimationState.NONE
        this.onEnd && this.onEnd(this._goal as OnLookAtCallbackArg)
        _resetGoal(this._goal)
      }
      else {
        const k = this.easing && this.easing(this._t)

        this._goal.position && this.camera.position.lerpVectors(this._start.position, this._goal.position, k)
        this._goal.quaternion && this.camera.quaternion.slerpQuaternions(this._start.quaternion, this._goal.quaternion, k)
        this._goal.up && this.camera.up.set(0, 1, 0).applyQuaternion(this.camera.quaternion)
        this._goal.zoom
        && isOrthographicCamera(this.camera)
        && (this.camera.zoom = (1 - k) * this._start.zoom + k * this._goal.zoom)

        this.camera.updateMatrixWorld()
        if (isPerspectiveCamera(this.camera)) {
          this.camera.updateProjectionMatrix()
        }
      }
    }

    return true
  }
}

function _getSize(box3OrObject: Box3 | Object3D, camera: Camera, offset = 0): SizeReturn {
  const box = new Box3()
  if (isBox3(box3OrObject)) {
    box.copy(box3OrObject)
  }
  else {
    box3OrObject.updateWorldMatrix(true, true)
    box.setFromObject(box3OrObject)
  }

  if (box.isEmpty()) {
    const max = camera.position.length() || 10
    box.setFromCenterAndSize(new Vector3(), new Vector3(max, max, max))
  }

  const boxSize = box.getSize(new Vector3())
  const center = box.getCenter(new Vector3())
  const maxSize = Math.max(boxSize.x, boxSize.y, boxSize.z)
  const fitHeightDistance = isOrthographicCamera(camera)
    ? maxSize * 4
    : maxSize / (2 * Math.atan((Math.PI * (camera as PerspectiveCamera).fov) / 360))
  const fitWidthDistance = isOrthographicCamera(camera) ? maxSize * 4 : fitHeightDistance / (camera as PerspectiveCamera).aspect
  const distance = (1 + offset) * Math.max(fitHeightDistance, fitWidthDistance)

  return { box, size: boxSize, center, distance }
}

function _resetGoal(goal: GoalT) {
  goal.position = undefined
  goal.quaternion = undefined
  goal.zoom = undefined
  goal.up = undefined
  goal.lookAt = undefined
  goal.box = undefined
  goal.object = undefined
}
