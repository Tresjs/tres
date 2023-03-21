import {
  $,
  Ct,
  ne
} from "./chunk-W6CIMB7R.js";
import {
  computed,
  createBlock,
  createCommentVNode,
  createVNode,
  defineComponent,
  getCurrentInstance,
  getCurrentScope,
  inject,
  mergeProps,
  nextTick,
  onMounted,
  onScopeDispose,
  onUnmounted,
  openBlock,
  ref,
  renderSlot,
  resolveComponent,
  shallowReactive,
  shallowRef,
  unref,
  useSlots,
  watch,
  watchEffect,
  withAsyncContext,
  withCtx
} from "./chunk-LZPJ5JBW.js";
import {
  AmbientLight,
  AnimationClip,
  AnimationMixer,
  Bone,
  Box3,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  ClampToEdgeWrapping,
  Color,
  CubeReflectionMapping,
  CubeTextureLoader,
  Curve,
  CylinderGeometry,
  DataTextureLoader,
  DataUtils,
  DirectionalLight,
  DoubleSide,
  EquirectangularReflectionMapping,
  Euler,
  EventDispatcher,
  ExtrudeGeometry,
  FileLoader,
  Float32BufferAttribute,
  FloatType,
  FrontSide,
  Group,
  HalfFloatType,
  ImageBitmapLoader,
  InterleavedBuffer,
  InterleavedBufferAttribute,
  Interpolant,
  InterpolateDiscrete,
  InterpolateLinear,
  Line,
  LineBasicMaterial,
  LineLoop,
  LineSegments,
  LinearEncoding,
  LinearFilter,
  LinearMipmapLinearFilter,
  LinearMipmapNearestFilter,
  Loader,
  LoaderUtils,
  MOUSE,
  Material,
  MathUtils,
  Matrix3,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  MirroredRepeatWrapping,
  NearestFilter,
  NearestMipmapLinearFilter,
  NearestMipmapNearestFilter,
  NumberKeyframeTrack,
  Object3D,
  OctahedronGeometry,
  OrthographicCamera,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Points,
  PointsMaterial,
  PropertyBinding,
  QuadraticBezierCurve3,
  Quaternion,
  QuaternionKeyframeTrack,
  Raycaster,
  RepeatWrapping,
  ShapePath,
  Skeleton,
  SkinnedMesh,
  Sphere,
  SphereGeometry,
  Spherical,
  SpotLight,
  TOUCH,
  TangentSpaceNormalMap,
  Texture,
  TextureLoader,
  TorusGeometry,
  TriangleFanDrawMode,
  TriangleStripDrawMode,
  Uint16BufferAttribute,
  Vector2,
  Vector3,
  Vector4,
  VectorKeyframeTrack,
  sRGBEncoding
} from "./chunk-4QXXOI63.js";
import "./chunk-JC4IRQUL.js";

// node_modules/.pnpm/@tresjs+cientos@1.8.0_three@0.150.1/node_modules/@tresjs/cientos/dist/trescientos.js
function Bp(b, i) {
  for (var r = 0; r < i.length; r++) {
    const s = i[r];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const a in s)
        if (a !== "default" && !(a in b)) {
          const c = Object.getOwnPropertyDescriptor(s, a);
          c && Object.defineProperty(b, a, c.get ? c : {
            enumerable: true,
            get: () => s[a]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(b, Symbol.toStringTag, { value: "Module" }));
}
function Qi(b) {
  return Qi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(i) {
    return typeof i;
  } : function(i) {
    return i && typeof Symbol == "function" && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i;
  }, Qi(b);
}
function jp(b, i) {
  if (Qi(b) !== "object" || b === null)
    return b;
  var r = b[Symbol.toPrimitive];
  if (r !== void 0) {
    var s = r.call(b, i || "default");
    if (Qi(s) !== "object")
      return s;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (i === "string" ? String : Number)(b);
}
function zp(b) {
  var i = jp(b, "string");
  return Qi(i) === "symbol" ? i : String(i);
}
function P(b, i, r) {
  return i = zp(i), i in b ? Object.defineProperty(b, i, {
    value: r,
    enumerable: true,
    configurable: true,
    writable: true
  }) : b[i] = r, b;
}
var ht = Uint8Array;
var rn = Uint16Array;
var lo = Uint32Array;
var za = new ht([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var Ua = new ht([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var Up = new ht([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var Ga = function(b, i) {
  for (var r = new rn(31), s = 0; s < 31; ++s)
    r[s] = i += 1 << b[s - 1];
  for (var a = new lo(r[30]), s = 1; s < 30; ++s)
    for (var c = r[s]; c < r[s + 1]; ++c)
      a[c] = c - r[s] << 5 | s;
  return [r, a];
};
var Ha = Ga(za, 2);
var Ka = Ha[0];
var Gp = Ha[1];
Ka[28] = 258, Gp[258] = 28;
var Hp = Ga(Ua, 0);
var Kp = Hp[0];
var co = new rn(32768);
for (Te = 0; Te < 32768; ++Te) {
  tn = (Te & 43690) >>> 1 | (Te & 21845) << 1;
  tn = (tn & 52428) >>> 2 | (tn & 13107) << 2, tn = (tn & 61680) >>> 4 | (tn & 3855) << 4, co[Te] = ((tn & 65280) >>> 8 | (tn & 255) << 8) >>> 1;
}
var tn;
var Te;
var $i = function(b, i, r) {
  for (var s = b.length, a = 0, c = new rn(i); a < s; ++a)
    ++c[b[a] - 1];
  var u = new rn(i);
  for (a = 0; a < i; ++a)
    u[a] = u[a - 1] + c[a - 1] << 1;
  var h;
  if (r) {
    h = new rn(1 << i);
    var m = 15 - i;
    for (a = 0; a < s; ++a)
      if (b[a])
        for (var g = a << 4 | b[a], w = i - b[a], _ = u[b[a] - 1]++ << w, y = _ | (1 << w) - 1; _ <= y; ++_)
          h[co[_] >>> m] = g;
  } else
    for (h = new rn(s), a = 0; a < s; ++a)
      b[a] && (h[a] = co[u[b[a] - 1]++] >>> 15 - b[a]);
  return h;
};
var Ji = new ht(288);
for (Te = 0; Te < 144; ++Te)
  Ji[Te] = 8;
var Te;
for (Te = 144; Te < 256; ++Te)
  Ji[Te] = 9;
var Te;
for (Te = 256; Te < 280; ++Te)
  Ji[Te] = 7;
var Te;
for (Te = 280; Te < 288; ++Te)
  Ji[Te] = 8;
var Te;
var $a = new ht(32);
for (Te = 0; Te < 32; ++Te)
  $a[Te] = 5;
var Te;
var $p = $i(Ji, 9, 1);
var Xp = $i($a, 5, 1);
var Qr = function(b) {
  for (var i = b[0], r = 1; r < b.length; ++r)
    b[r] > i && (i = b[r]);
  return i;
};
var wt = function(b, i, r) {
  var s = i / 8 | 0;
  return (b[s] | b[s + 1] << 8) >> (i & 7) & r;
};
var Zr = function(b, i) {
  var r = i / 8 | 0;
  return (b[r] | b[r + 1] << 8 | b[r + 2] << 16) >> (i & 7);
};
var Yp = function(b) {
  return (b / 8 | 0) + (b & 7 && 1);
};
var qp = function(b, i, r) {
  (i == null || i < 0) && (i = 0), (r == null || r > b.length) && (r = b.length);
  var s = new (b instanceof rn ? rn : b instanceof lo ? lo : ht)(r - i);
  return s.set(b.subarray(i, r)), s;
};
var Qp = function(b, i, r) {
  var s = b.length;
  if (!s || r && !r.l && s < 5)
    return i || new ht(0);
  var a = !i || r, c = !r || r.i;
  r || (r = {}), i || (i = new ht(s * 3));
  var u = function(Oe) {
    var je = i.length;
    if (Oe > je) {
      var ye = new ht(Math.max(je * 2, Oe));
      ye.set(i), i = ye;
    }
  }, h = r.f || 0, m = r.p || 0, g = r.b || 0, w = r.l, _ = r.d, y = r.m, C = r.n, I = s * 8;
  do {
    if (!w) {
      r.f = h = wt(b, m, 1);
      var S = wt(b, m + 1, 3);
      if (m += 3, S)
        if (S == 1)
          w = $p, _ = Xp, y = 9, C = 5;
        else if (S == 2) {
          var V = wt(b, m, 31) + 257, D = wt(b, m + 10, 15) + 4, Y = V + wt(b, m + 5, 31) + 1;
          m += 14;
          for (var G = new ht(Y), N = new ht(19), O = 0; O < D; ++O)
            N[Up[O]] = wt(b, m + O * 3, 7);
          m += D * 3;
          for (var H = Qr(N), K = (1 << H) - 1, q = $i(N, H, 1), O = 0; O < Y; ) {
            var he = q[wt(b, m, K)];
            m += he & 15;
            var R = he >>> 4;
            if (R < 16)
              G[O++] = R;
            else {
              var _e = 0, pe = 0;
              for (R == 16 ? (pe = 3 + wt(b, m, 3), m += 2, _e = G[O - 1]) : R == 17 ? (pe = 3 + wt(b, m, 7), m += 3) : R == 18 && (pe = 11 + wt(b, m, 127), m += 7); pe--; )
                G[O++] = _e;
            }
          }
          var fe = G.subarray(0, V), de = G.subarray(V);
          y = Qr(fe), C = Qr(de), w = $i(fe, y, 1), _ = $i(de, C, 1);
        } else
          throw "invalid block type";
      else {
        var R = Yp(m) + 4, j = b[R - 4] | b[R - 3] << 8, F = R + j;
        if (F > s) {
          if (c)
            throw "unexpected EOF";
          break;
        }
        a && u(g + j), i.set(b.subarray(R, F), g), r.b = g += j, r.p = m = F * 8;
        continue;
      }
      if (m > I) {
        if (c)
          throw "unexpected EOF";
        break;
      }
    }
    a && u(g + 131072);
    for (var te = (1 << y) - 1, X = (1 << C) - 1, ke = m; ; ke = m) {
      var _e = w[Zr(b, m) & te], ve = _e >>> 4;
      if (m += _e & 15, m > I) {
        if (c)
          throw "unexpected EOF";
        break;
      }
      if (!_e)
        throw "invalid length/literal";
      if (ve < 256)
        i[g++] = ve;
      else if (ve == 256) {
        ke = m, w = null;
        break;
      } else {
        var le = ve - 254;
        if (ve > 264) {
          var O = ve - 257, ie = za[O];
          le = wt(b, m, (1 << ie) - 1) + Ka[O], m += ie;
        }
        var ge = _[Zr(b, m) & X], M = ge >>> 4;
        if (!ge)
          throw "invalid distance";
        m += ge & 15;
        var de = Kp[M];
        if (M > 3) {
          var ie = Ua[M];
          de += Zr(b, m) & (1 << ie) - 1, m += ie;
        }
        if (m > I) {
          if (c)
            throw "unexpected EOF";
          break;
        }
        a && u(g + 131072);
        for (var ce = g + le; g < ce; g += 4)
          i[g] = i[g - de], i[g + 1] = i[g + 1 - de], i[g + 2] = i[g + 2 - de], i[g + 3] = i[g + 3 - de];
        g = ce;
      }
    }
    r.l = w, r.p = ke, r.b = g, w && (h = 1, r.m = y, r.d = _, r.n = C);
  } while (!h);
  return g == i.length ? i : qp(i, 0, g);
};
var Zp = new ht(0);
var Wp = function(b) {
  if ((b[0] & 15) != 8 || b[0] >>> 4 > 7 || (b[0] << 8 | b[1]) % 31)
    throw "invalid zlib data";
  if (b[1] & 32)
    throw "invalid zlib data: preset dictionaries not supported";
};
function Jp(b, i) {
  return Qp((Wp(b), b.subarray(2, -4)), i);
}
var eu = typeof TextDecoder < "u" && new TextDecoder();
var tu = 0;
try {
  eu.decode(Zp, { stream: true }), tu = 1;
} catch {
}
var nu = class extends Object3D {
  // events
  constructor(i, r) {
    super(), P(this, "isTransformControls", true), P(this, "visible", false), P(this, "domElement", void 0), P(this, "raycaster", new Raycaster()), P(this, "gizmo", void 0), P(this, "plane", void 0), P(this, "tempVector", new Vector3()), P(this, "tempVector2", new Vector3()), P(this, "tempQuaternion", new Quaternion()), P(this, "unit", {
      X: new Vector3(1, 0, 0),
      Y: new Vector3(0, 1, 0),
      Z: new Vector3(0, 0, 1)
    }), P(this, "pointStart", new Vector3()), P(this, "pointEnd", new Vector3()), P(this, "offset", new Vector3()), P(this, "rotationAxis", new Vector3()), P(this, "startNorm", new Vector3()), P(this, "endNorm", new Vector3()), P(this, "rotationAngle", 0), P(this, "cameraPosition", new Vector3()), P(this, "cameraQuaternion", new Quaternion()), P(this, "cameraScale", new Vector3()), P(this, "parentPosition", new Vector3()), P(this, "parentQuaternion", new Quaternion()), P(this, "parentQuaternionInv", new Quaternion()), P(this, "parentScale", new Vector3()), P(this, "worldPositionStart", new Vector3()), P(this, "worldQuaternionStart", new Quaternion()), P(this, "worldScaleStart", new Vector3()), P(this, "worldPosition", new Vector3()), P(this, "worldQuaternion", new Quaternion()), P(this, "worldQuaternionInv", new Quaternion()), P(this, "worldScale", new Vector3()), P(this, "eye", new Vector3()), P(this, "positionStart", new Vector3()), P(this, "quaternionStart", new Quaternion()), P(this, "scaleStart", new Vector3()), P(this, "camera", void 0), P(this, "object", void 0), P(this, "enabled", true), P(this, "axis", null), P(this, "mode", "translate"), P(this, "translationSnap", null), P(this, "rotationSnap", null), P(this, "scaleSnap", null), P(this, "space", "world"), P(this, "size", 1), P(this, "dragging", false), P(this, "showX", true), P(this, "showY", true), P(this, "showZ", true), P(this, "changeEvent", {
      type: "change"
    }), P(this, "mouseDownEvent", {
      type: "mouseDown",
      mode: this.mode
    }), P(this, "mouseUpEvent", {
      type: "mouseUp",
      mode: this.mode
    }), P(this, "objectChangeEvent", {
      type: "objectChange"
    }), P(this, "intersectObjectWithRay", (a, c, u) => {
      const h = c.intersectObject(a, true);
      for (let m = 0; m < h.length; m++)
        if (h[m].object.visible || u)
          return h[m];
      return false;
    }), P(this, "attach", (a) => (this.object = a, this.visible = true, this)), P(this, "detach", () => (this.object = void 0, this.visible = false, this.axis = null, this)), P(this, "reset", () => this.enabled ? (this.dragging && this.object !== void 0 && (this.object.position.copy(this.positionStart), this.object.quaternion.copy(this.quaternionStart), this.object.scale.copy(this.scaleStart), this.dispatchEvent(this.changeEvent), this.dispatchEvent(this.objectChangeEvent), this.pointStart.copy(this.pointEnd)), this) : this), P(this, "updateMatrixWorld", () => {
      this.object !== void 0 && (this.object.updateMatrixWorld(), this.object.parent === null ? console.error("TransformControls: The attached 3D object must be a part of the scene graph.") : this.object.parent.matrixWorld.decompose(this.parentPosition, this.parentQuaternion, this.parentScale), this.object.matrixWorld.decompose(this.worldPosition, this.worldQuaternion, this.worldScale), this.parentQuaternionInv.copy(this.parentQuaternion).invert(), this.worldQuaternionInv.copy(this.worldQuaternion).invert()), this.camera.updateMatrixWorld(), this.camera.matrixWorld.decompose(this.cameraPosition, this.cameraQuaternion, this.cameraScale), this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(), super.updateMatrixWorld();
    }), P(this, "pointerHover", (a) => {
      if (this.object === void 0 || this.dragging === true)
        return;
      this.raycaster.setFromCamera(a, this.camera);
      const c = this.intersectObjectWithRay(this.gizmo.picker[this.mode], this.raycaster);
      c ? this.axis = c.object.name : this.axis = null;
    }), P(this, "pointerDown", (a) => {
      if (!(this.object === void 0 || this.dragging === true || a.button !== 0) && this.axis !== null) {
        this.raycaster.setFromCamera(a, this.camera);
        const c = this.intersectObjectWithRay(this.plane, this.raycaster, true);
        if (c) {
          let u = this.space;
          if (this.mode === "scale" ? u = "local" : (this.axis === "E" || this.axis === "XYZE" || this.axis === "XYZ") && (u = "world"), u === "local" && this.mode === "rotate") {
            const h = this.rotationSnap;
            this.axis === "X" && h && (this.object.rotation.x = Math.round(this.object.rotation.x / h) * h), this.axis === "Y" && h && (this.object.rotation.y = Math.round(this.object.rotation.y / h) * h), this.axis === "Z" && h && (this.object.rotation.z = Math.round(this.object.rotation.z / h) * h);
          }
          this.object.updateMatrixWorld(), this.object.parent && this.object.parent.updateMatrixWorld(), this.positionStart.copy(this.object.position), this.quaternionStart.copy(this.object.quaternion), this.scaleStart.copy(this.object.scale), this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this.worldScaleStart), this.pointStart.copy(c.point).sub(this.worldPositionStart);
        }
        this.dragging = true, this.mouseDownEvent.mode = this.mode, this.dispatchEvent(this.mouseDownEvent);
      }
    }), P(this, "pointerMove", (a) => {
      const c = this.axis, u = this.mode, h = this.object;
      let m = this.space;
      if (u === "scale" ? m = "local" : (c === "E" || c === "XYZE" || c === "XYZ") && (m = "world"), h === void 0 || c === null || this.dragging === false || a.button !== -1)
        return;
      this.raycaster.setFromCamera(a, this.camera);
      const g = this.intersectObjectWithRay(this.plane, this.raycaster, true);
      if (g) {
        if (this.pointEnd.copy(g.point).sub(this.worldPositionStart), u === "translate")
          this.offset.copy(this.pointEnd).sub(this.pointStart), m === "local" && c !== "XYZ" && this.offset.applyQuaternion(this.worldQuaternionInv), c.indexOf("X") === -1 && (this.offset.x = 0), c.indexOf("Y") === -1 && (this.offset.y = 0), c.indexOf("Z") === -1 && (this.offset.z = 0), m === "local" && c !== "XYZ" ? this.offset.applyQuaternion(this.quaternionStart).divide(this.parentScale) : this.offset.applyQuaternion(this.parentQuaternionInv).divide(this.parentScale), h.position.copy(this.offset).add(this.positionStart), this.translationSnap && (m === "local" && (h.position.applyQuaternion(this.tempQuaternion.copy(this.quaternionStart).invert()), c.search("X") !== -1 && (h.position.x = Math.round(h.position.x / this.translationSnap) * this.translationSnap), c.search("Y") !== -1 && (h.position.y = Math.round(h.position.y / this.translationSnap) * this.translationSnap), c.search("Z") !== -1 && (h.position.z = Math.round(h.position.z / this.translationSnap) * this.translationSnap), h.position.applyQuaternion(this.quaternionStart)), m === "world" && (h.parent && h.position.add(this.tempVector.setFromMatrixPosition(h.parent.matrixWorld)), c.search("X") !== -1 && (h.position.x = Math.round(h.position.x / this.translationSnap) * this.translationSnap), c.search("Y") !== -1 && (h.position.y = Math.round(h.position.y / this.translationSnap) * this.translationSnap), c.search("Z") !== -1 && (h.position.z = Math.round(h.position.z / this.translationSnap) * this.translationSnap), h.parent && h.position.sub(this.tempVector.setFromMatrixPosition(h.parent.matrixWorld))));
        else if (u === "scale") {
          if (c.search("XYZ") !== -1) {
            let w = this.pointEnd.length() / this.pointStart.length();
            this.pointEnd.dot(this.pointStart) < 0 && (w *= -1), this.tempVector2.set(w, w, w);
          } else
            this.tempVector.copy(this.pointStart), this.tempVector2.copy(this.pointEnd), this.tempVector.applyQuaternion(this.worldQuaternionInv), this.tempVector2.applyQuaternion(this.worldQuaternionInv), this.tempVector2.divide(this.tempVector), c.search("X") === -1 && (this.tempVector2.x = 1), c.search("Y") === -1 && (this.tempVector2.y = 1), c.search("Z") === -1 && (this.tempVector2.z = 1);
          h.scale.copy(this.scaleStart).multiply(this.tempVector2), this.scaleSnap && this.object && (c.search("X") !== -1 && (this.object.scale.x = Math.round(h.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap), c.search("Y") !== -1 && (h.scale.y = Math.round(h.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap), c.search("Z") !== -1 && (h.scale.z = Math.round(h.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap));
        } else if (u === "rotate") {
          this.offset.copy(this.pointEnd).sub(this.pointStart);
          const w = 20 / this.worldPosition.distanceTo(this.tempVector.setFromMatrixPosition(this.camera.matrixWorld));
          c === "E" ? (this.rotationAxis.copy(this.eye), this.rotationAngle = this.pointEnd.angleTo(this.pointStart), this.startNorm.copy(this.pointStart).normalize(), this.endNorm.copy(this.pointEnd).normalize(), this.rotationAngle *= this.endNorm.cross(this.startNorm).dot(this.eye) < 0 ? 1 : -1) : c === "XYZE" ? (this.rotationAxis.copy(this.offset).cross(this.eye).normalize(), this.rotationAngle = this.offset.dot(this.tempVector.copy(this.rotationAxis).cross(this.eye)) * w) : (c === "X" || c === "Y" || c === "Z") && (this.rotationAxis.copy(this.unit[c]), this.tempVector.copy(this.unit[c]), m === "local" && this.tempVector.applyQuaternion(this.worldQuaternion), this.rotationAngle = this.offset.dot(this.tempVector.cross(this.eye).normalize()) * w), this.rotationSnap && (this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap), m === "local" && c !== "E" && c !== "XYZE" ? (h.quaternion.copy(this.quaternionStart), h.quaternion.multiply(this.tempQuaternion.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize()) : (this.rotationAxis.applyQuaternion(this.parentQuaternionInv), h.quaternion.copy(this.tempQuaternion.setFromAxisAngle(this.rotationAxis, this.rotationAngle)), h.quaternion.multiply(this.quaternionStart).normalize());
        }
        this.dispatchEvent(this.changeEvent), this.dispatchEvent(this.objectChangeEvent);
      }
    }), P(this, "pointerUp", (a) => {
      a.button === 0 && (this.dragging && this.axis !== null && (this.mouseUpEvent.mode = this.mode, this.dispatchEvent(this.mouseUpEvent)), this.dragging = false, this.axis = null);
    }), P(this, "getPointer", (a) => {
      var c;
      if (this.domElement && (c = this.domElement.ownerDocument) !== null && c !== void 0 && c.pointerLockElement)
        return {
          x: 0,
          y: 0,
          button: a.button
        };
      {
        var u;
        const h = a.changedTouches ? a.changedTouches[0] : a, m = (u = this.domElement) === null || u === void 0 ? void 0 : u.getBoundingClientRect();
        return {
          x: (h.clientX - m.left) / m.width * 2 - 1,
          y: -(h.clientY - m.top) / m.height * 2 + 1,
          button: a.button
        };
      }
    }), P(this, "onPointerHover", (a) => {
      if (this.enabled)
        switch (a.pointerType) {
          case "mouse":
          case "pen":
            this.pointerHover(this.getPointer(a));
            break;
        }
    }), P(this, "onPointerDown", (a) => {
      !this.enabled || !this.domElement || (this.domElement.style.touchAction = "none", this.domElement.ownerDocument.addEventListener("pointermove", this.onPointerMove), this.pointerHover(this.getPointer(a)), this.pointerDown(this.getPointer(a)));
    }), P(this, "onPointerMove", (a) => {
      this.enabled && this.pointerMove(this.getPointer(a));
    }), P(this, "onPointerUp", (a) => {
      !this.enabled || !this.domElement || (this.domElement.style.touchAction = "", this.domElement.ownerDocument.removeEventListener("pointermove", this.onPointerMove), this.pointerUp(this.getPointer(a)));
    }), P(this, "getMode", () => this.mode), P(this, "setMode", (a) => {
      this.mode = a;
    }), P(this, "setTranslationSnap", (a) => {
      this.translationSnap = a;
    }), P(this, "setRotationSnap", (a) => {
      this.rotationSnap = a;
    }), P(this, "setScaleSnap", (a) => {
      this.scaleSnap = a;
    }), P(this, "setSize", (a) => {
      this.size = a;
    }), P(this, "setSpace", (a) => {
      this.space = a;
    }), P(this, "update", () => {
      console.warn("THREE.TransformControls: update function has no more functionality and therefore has been deprecated.");
    }), P(this, "connect", (a) => {
      a === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'), this.domElement = a, this.domElement.addEventListener("pointerdown", this.onPointerDown), this.domElement.addEventListener("pointermove", this.onPointerHover), this.domElement.ownerDocument.addEventListener("pointerup", this.onPointerUp);
    }), P(this, "dispose", () => {
      var a, c, u, h, m, g;
      (a = this.domElement) === null || a === void 0 || a.removeEventListener("pointerdown", this.onPointerDown), (c = this.domElement) === null || c === void 0 || c.removeEventListener("pointermove", this.onPointerHover), (u = this.domElement) === null || u === void 0 || (h = u.ownerDocument) === null || h === void 0 || h.removeEventListener("pointermove", this.onPointerMove), (m = this.domElement) === null || m === void 0 || (g = m.ownerDocument) === null || g === void 0 || g.removeEventListener("pointerup", this.onPointerUp), this.traverse((w) => {
        const _ = w;
        _.geometry && _.geometry.dispose(), _.material && _.material.dispose();
      });
    }), this.domElement = r, this.camera = i, this.gizmo = new iu(), this.add(this.gizmo), this.plane = new su(), this.add(this.plane);
    const s = (a, c) => {
      let u = c;
      Object.defineProperty(this, a, {
        get: function() {
          return u !== void 0 ? u : c;
        },
        set: function(h) {
          u !== h && (u = h, this.plane[a] = h, this.gizmo[a] = h, this.dispatchEvent({
            type: a + "-changed",
            value: h
          }), this.dispatchEvent(this.changeEvent));
        }
      }), this[a] = c, this.plane[a] = c, this.gizmo[a] = c;
    };
    s("camera", this.camera), s("object", this.object), s("enabled", this.enabled), s("axis", this.axis), s("mode", this.mode), s("translationSnap", this.translationSnap), s("rotationSnap", this.rotationSnap), s("scaleSnap", this.scaleSnap), s("space", this.space), s("size", this.size), s("dragging", this.dragging), s("showX", this.showX), s("showY", this.showY), s("showZ", this.showZ), s("worldPosition", this.worldPosition), s("worldPositionStart", this.worldPositionStart), s("worldQuaternion", this.worldQuaternion), s("worldQuaternionStart", this.worldQuaternionStart), s("cameraPosition", this.cameraPosition), s("cameraQuaternion", this.cameraQuaternion), s("pointStart", this.pointStart), s("pointEnd", this.pointEnd), s("rotationAxis", this.rotationAxis), s("rotationAngle", this.rotationAngle), s("eye", this.eye), r !== void 0 && this.connect(r);
  }
};
var iu = class extends Object3D {
  // these are set from parent class TransformControls
  constructor() {
    super(), P(this, "isTransformControlsGizmo", true), P(this, "type", "TransformControlsGizmo"), P(this, "tempVector", new Vector3(0, 0, 0)), P(this, "tempEuler", new Euler()), P(this, "alignVector", new Vector3(0, 1, 0)), P(this, "zeroVector", new Vector3(0, 0, 0)), P(this, "lookAtMatrix", new Matrix4()), P(this, "tempQuaternion", new Quaternion()), P(this, "tempQuaternion2", new Quaternion()), P(this, "identityQuaternion", new Quaternion()), P(this, "unitX", new Vector3(1, 0, 0)), P(this, "unitY", new Vector3(0, 1, 0)), P(this, "unitZ", new Vector3(0, 0, 1)), P(this, "gizmo", void 0), P(this, "picker", void 0), P(this, "helper", void 0), P(this, "rotationAxis", new Vector3()), P(this, "cameraPosition", new Vector3()), P(this, "worldPositionStart", new Vector3()), P(this, "worldQuaternionStart", new Quaternion()), P(this, "worldPosition", new Vector3()), P(this, "worldQuaternion", new Quaternion()), P(this, "eye", new Vector3()), P(this, "camera", null), P(this, "enabled", true), P(this, "axis", null), P(this, "mode", "translate"), P(this, "space", "world"), P(this, "size", 1), P(this, "dragging", false), P(this, "showX", true), P(this, "showY", true), P(this, "showZ", true), P(this, "updateMatrixWorld", () => {
      let ve = this.space;
      this.mode === "scale" && (ve = "local");
      const le = ve === "local" ? this.worldQuaternion : this.identityQuaternion;
      this.gizmo.translate.visible = this.mode === "translate", this.gizmo.rotate.visible = this.mode === "rotate", this.gizmo.scale.visible = this.mode === "scale", this.helper.translate.visible = this.mode === "translate", this.helper.rotate.visible = this.mode === "rotate", this.helper.scale.visible = this.mode === "scale";
      let ie = [];
      ie = ie.concat(this.picker[this.mode].children), ie = ie.concat(this.gizmo[this.mode].children), ie = ie.concat(this.helper[this.mode].children);
      for (let ge = 0; ge < ie.length; ge++) {
        const M = ie[ge];
        M.visible = true, M.rotation.set(0, 0, 0), M.position.copy(this.worldPosition);
        let ce;
        if (this.camera.isOrthographicCamera ? ce = (this.camera.top - this.camera.bottom) / this.camera.zoom : ce = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7), M.scale.set(1, 1, 1).multiplyScalar(ce * this.size / 7), M.tag === "helper") {
          M.visible = false, M.name === "AXIS" ? (M.position.copy(this.worldPositionStart), M.visible = !!this.axis, this.axis === "X" && (this.tempQuaternion.setFromEuler(this.tempEuler.set(0, 0, 0)), M.quaternion.copy(le).multiply(this.tempQuaternion), Math.abs(this.alignVector.copy(this.unitX).applyQuaternion(le).dot(this.eye)) > 0.9 && (M.visible = false)), this.axis === "Y" && (this.tempQuaternion.setFromEuler(this.tempEuler.set(0, 0, Math.PI / 2)), M.quaternion.copy(le).multiply(this.tempQuaternion), Math.abs(this.alignVector.copy(this.unitY).applyQuaternion(le).dot(this.eye)) > 0.9 && (M.visible = false)), this.axis === "Z" && (this.tempQuaternion.setFromEuler(this.tempEuler.set(0, Math.PI / 2, 0)), M.quaternion.copy(le).multiply(this.tempQuaternion), Math.abs(this.alignVector.copy(this.unitZ).applyQuaternion(le).dot(this.eye)) > 0.9 && (M.visible = false)), this.axis === "XYZE" && (this.tempQuaternion.setFromEuler(this.tempEuler.set(0, Math.PI / 2, 0)), this.alignVector.copy(this.rotationAxis), M.quaternion.setFromRotationMatrix(this.lookAtMatrix.lookAt(this.zeroVector, this.alignVector, this.unitY)), M.quaternion.multiply(this.tempQuaternion), M.visible = this.dragging), this.axis === "E" && (M.visible = false)) : M.name === "START" ? (M.position.copy(this.worldPositionStart), M.visible = this.dragging) : M.name === "END" ? (M.position.copy(this.worldPosition), M.visible = this.dragging) : M.name === "DELTA" ? (M.position.copy(this.worldPositionStart), M.quaternion.copy(this.worldQuaternionStart), this.tempVector.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1), this.tempVector.applyQuaternion(this.worldQuaternionStart.clone().invert()), M.scale.copy(this.tempVector), M.visible = this.dragging) : (M.quaternion.copy(le), this.dragging ? M.position.copy(this.worldPositionStart) : M.position.copy(this.worldPosition), this.axis && (M.visible = this.axis.search(M.name) !== -1));
          continue;
        }
        M.quaternion.copy(le), this.mode === "translate" || this.mode === "scale" ? ((M.name === "X" || M.name === "XYZX") && Math.abs(this.alignVector.copy(this.unitX).applyQuaternion(le).dot(this.eye)) > 0.99 && (M.scale.set(1e-10, 1e-10, 1e-10), M.visible = false), (M.name === "Y" || M.name === "XYZY") && Math.abs(this.alignVector.copy(this.unitY).applyQuaternion(le).dot(this.eye)) > 0.99 && (M.scale.set(1e-10, 1e-10, 1e-10), M.visible = false), (M.name === "Z" || M.name === "XYZZ") && Math.abs(this.alignVector.copy(this.unitZ).applyQuaternion(le).dot(this.eye)) > 0.99 && (M.scale.set(1e-10, 1e-10, 1e-10), M.visible = false), M.name === "XY" && Math.abs(this.alignVector.copy(this.unitZ).applyQuaternion(le).dot(this.eye)) < 0.2 && (M.scale.set(1e-10, 1e-10, 1e-10), M.visible = false), M.name === "YZ" && Math.abs(this.alignVector.copy(this.unitX).applyQuaternion(le).dot(this.eye)) < 0.2 && (M.scale.set(1e-10, 1e-10, 1e-10), M.visible = false), M.name === "XZ" && Math.abs(this.alignVector.copy(this.unitY).applyQuaternion(le).dot(this.eye)) < 0.2 && (M.scale.set(1e-10, 1e-10, 1e-10), M.visible = false), M.name.search("X") !== -1 && (this.alignVector.copy(this.unitX).applyQuaternion(le).dot(this.eye) < 0 ? M.tag === "fwd" ? M.visible = false : M.scale.x *= -1 : M.tag === "bwd" && (M.visible = false)), M.name.search("Y") !== -1 && (this.alignVector.copy(this.unitY).applyQuaternion(le).dot(this.eye) < 0 ? M.tag === "fwd" ? M.visible = false : M.scale.y *= -1 : M.tag === "bwd" && (M.visible = false)), M.name.search("Z") !== -1 && (this.alignVector.copy(this.unitZ).applyQuaternion(le).dot(this.eye) < 0 ? M.tag === "fwd" ? M.visible = false : M.scale.z *= -1 : M.tag === "bwd" && (M.visible = false))) : this.mode === "rotate" && (this.tempQuaternion2.copy(le), this.alignVector.copy(this.eye).applyQuaternion(this.tempQuaternion.copy(le).invert()), M.name.search("E") !== -1 && M.quaternion.setFromRotationMatrix(this.lookAtMatrix.lookAt(this.eye, this.zeroVector, this.unitY)), M.name === "X" && (this.tempQuaternion.setFromAxisAngle(this.unitX, Math.atan2(-this.alignVector.y, this.alignVector.z)), this.tempQuaternion.multiplyQuaternions(this.tempQuaternion2, this.tempQuaternion), M.quaternion.copy(this.tempQuaternion)), M.name === "Y" && (this.tempQuaternion.setFromAxisAngle(this.unitY, Math.atan2(this.alignVector.x, this.alignVector.z)), this.tempQuaternion.multiplyQuaternions(this.tempQuaternion2, this.tempQuaternion), M.quaternion.copy(this.tempQuaternion)), M.name === "Z" && (this.tempQuaternion.setFromAxisAngle(this.unitZ, Math.atan2(this.alignVector.y, this.alignVector.x)), this.tempQuaternion.multiplyQuaternions(this.tempQuaternion2, this.tempQuaternion), M.quaternion.copy(this.tempQuaternion))), M.visible = M.visible && (M.name.indexOf("X") === -1 || this.showX), M.visible = M.visible && (M.name.indexOf("Y") === -1 || this.showY), M.visible = M.visible && (M.name.indexOf("Z") === -1 || this.showZ), M.visible = M.visible && (M.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ), M.material.tempOpacity = M.material.tempOpacity || M.material.opacity, M.material.tempColor = M.material.tempColor || M.material.color.clone(), M.material.color.copy(M.material.tempColor), M.material.opacity = M.material.tempOpacity, this.enabled ? this.axis && (M.name === this.axis ? (M.material.opacity = 1, M.material.color.lerp(new Color(1, 1, 1), 0.5)) : this.axis.split("").some(function(Oe) {
          return M.name === Oe;
        }) ? (M.material.opacity = 1, M.material.color.lerp(new Color(1, 1, 1), 0.5)) : (M.material.opacity *= 0.25, M.material.color.lerp(new Color(1, 1, 1), 0.5))) : (M.material.opacity *= 0.5, M.material.color.lerp(new Color(1, 1, 1), 0.5));
      }
      super.updateMatrixWorld();
    });
    const i = new MeshBasicMaterial({
      depthTest: false,
      depthWrite: false,
      transparent: true,
      side: DoubleSide,
      fog: false,
      toneMapped: false
    }), r = new LineBasicMaterial({
      depthTest: false,
      depthWrite: false,
      transparent: true,
      linewidth: 1,
      fog: false,
      toneMapped: false
    }), s = i.clone();
    s.opacity = 0.15;
    const a = i.clone();
    a.opacity = 0.33;
    const c = i.clone();
    c.color.set(16711680);
    const u = i.clone();
    u.color.set(65280);
    const h = i.clone();
    h.color.set(255);
    const m = i.clone();
    m.opacity = 0.25;
    const g = m.clone();
    g.color.set(16776960);
    const w = m.clone();
    w.color.set(65535);
    const _ = m.clone();
    _.color.set(16711935), i.clone().color.set(16776960);
    const C = r.clone();
    C.color.set(16711680);
    const I = r.clone();
    I.color.set(65280);
    const S = r.clone();
    S.color.set(255);
    const R = r.clone();
    R.color.set(65535);
    const j = r.clone();
    j.color.set(16711935);
    const F = r.clone();
    F.color.set(16776960);
    const V = r.clone();
    V.color.set(7895160);
    const D = F.clone();
    D.opacity = 0.25;
    const Y = new CylinderGeometry(0, 0.05, 0.2, 12, 1, false), G = new BoxGeometry(0.125, 0.125, 0.125), N = new BufferGeometry();
    N.setAttribute("position", new Float32BufferAttribute([0, 0, 0, 1, 0, 0], 3));
    const O = (ve, le) => {
      const ie = new BufferGeometry(), ge = [];
      for (let M = 0; M <= 64 * le; ++M)
        ge.push(0, Math.cos(M / 32 * Math.PI) * ve, Math.sin(M / 32 * Math.PI) * ve);
      return ie.setAttribute("position", new Float32BufferAttribute(ge, 3)), ie;
    }, H = () => {
      const ve = new BufferGeometry();
      return ve.setAttribute("position", new Float32BufferAttribute([0, 0, 0, 1, 1, 1], 3)), ve;
    }, K = {
      X: [[new Mesh(Y, c), [1, 0, 0], [0, 0, -Math.PI / 2], null, "fwd"], [new Mesh(Y, c), [1, 0, 0], [0, 0, Math.PI / 2], null, "bwd"], [new Line(N, C)]],
      Y: [[new Mesh(Y, u), [0, 1, 0], null, null, "fwd"], [new Mesh(Y, u), [0, 1, 0], [Math.PI, 0, 0], null, "bwd"], [new Line(N, I), null, [0, 0, Math.PI / 2]]],
      Z: [[new Mesh(Y, h), [0, 0, 1], [Math.PI / 2, 0, 0], null, "fwd"], [new Mesh(Y, h), [0, 0, 1], [-Math.PI / 2, 0, 0], null, "bwd"], [new Line(N, S), null, [0, -Math.PI / 2, 0]]],
      XYZ: [[new Mesh(new OctahedronGeometry(0.1, 0), m.clone()), [0, 0, 0], [0, 0, 0]]],
      XY: [[new Mesh(new PlaneGeometry(0.295, 0.295), g.clone()), [0.15, 0.15, 0]], [new Line(N, F), [0.18, 0.3, 0], null, [0.125, 1, 1]], [new Line(N, F), [0.3, 0.18, 0], [0, 0, Math.PI / 2], [0.125, 1, 1]]],
      YZ: [[new Mesh(new PlaneGeometry(0.295, 0.295), w.clone()), [0, 0.15, 0.15], [0, Math.PI / 2, 0]], [new Line(N, R), [0, 0.18, 0.3], [0, 0, Math.PI / 2], [0.125, 1, 1]], [new Line(N, R), [0, 0.3, 0.18], [0, -Math.PI / 2, 0], [0.125, 1, 1]]],
      XZ: [[new Mesh(new PlaneGeometry(0.295, 0.295), _.clone()), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]], [new Line(N, j), [0.18, 0, 0.3], null, [0.125, 1, 1]], [new Line(N, j), [0.3, 0, 0.18], [0, -Math.PI / 2, 0], [0.125, 1, 1]]]
    }, q = {
      X: [[new Mesh(new CylinderGeometry(0.2, 0, 1, 4, 1, false), s), [0.6, 0, 0], [0, 0, -Math.PI / 2]]],
      Y: [[new Mesh(new CylinderGeometry(0.2, 0, 1, 4, 1, false), s), [0, 0.6, 0]]],
      Z: [[new Mesh(new CylinderGeometry(0.2, 0, 1, 4, 1, false), s), [0, 0, 0.6], [Math.PI / 2, 0, 0]]],
      XYZ: [[new Mesh(new OctahedronGeometry(0.2, 0), s)]],
      XY: [[new Mesh(new PlaneGeometry(0.4, 0.4), s), [0.2, 0.2, 0]]],
      YZ: [[new Mesh(new PlaneGeometry(0.4, 0.4), s), [0, 0.2, 0.2], [0, Math.PI / 2, 0]]],
      XZ: [[new Mesh(new PlaneGeometry(0.4, 0.4), s), [0.2, 0, 0.2], [-Math.PI / 2, 0, 0]]]
    }, he = {
      START: [[new Mesh(new OctahedronGeometry(0.01, 2), a), null, null, null, "helper"]],
      END: [[new Mesh(new OctahedronGeometry(0.01, 2), a), null, null, null, "helper"]],
      DELTA: [[new Line(H(), a), null, null, null, "helper"]],
      X: [[new Line(N, a.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]],
      Y: [[new Line(N, a.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]],
      Z: [[new Line(N, a.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]]
    }, _e = {
      X: [[new Line(O(1, 0.5), C)], [new Mesh(new OctahedronGeometry(0.04, 0), c), [0, 0, 0.99], null, [1, 3, 1]]],
      Y: [[new Line(O(1, 0.5), I), null, [0, 0, -Math.PI / 2]], [new Mesh(new OctahedronGeometry(0.04, 0), u), [0, 0, 0.99], null, [3, 1, 1]]],
      Z: [[new Line(O(1, 0.5), S), null, [0, Math.PI / 2, 0]], [new Mesh(new OctahedronGeometry(0.04, 0), h), [0.99, 0, 0], null, [1, 3, 1]]],
      E: [[new Line(O(1.25, 1), D), null, [0, Math.PI / 2, 0]], [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), D), [1.17, 0, 0], [0, 0, -Math.PI / 2], [1, 1, 1e-3]], [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), D), [-1.17, 0, 0], [0, 0, Math.PI / 2], [1, 1, 1e-3]], [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), D), [0, -1.17, 0], [Math.PI, 0, 0], [1, 1, 1e-3]], [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), D), [0, 1.17, 0], [0, 0, 0], [1, 1, 1e-3]]],
      XYZE: [[new Line(O(1, 1), V), null, [0, Math.PI / 2, 0]]]
    }, pe = {
      AXIS: [[new Line(N, a.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]]
    }, fe = {
      X: [[new Mesh(new TorusGeometry(1, 0.1, 4, 24), s), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]],
      Y: [[new Mesh(new TorusGeometry(1, 0.1, 4, 24), s), [0, 0, 0], [Math.PI / 2, 0, 0]]],
      Z: [[new Mesh(new TorusGeometry(1, 0.1, 4, 24), s), [0, 0, 0], [0, 0, -Math.PI / 2]]],
      E: [[new Mesh(new TorusGeometry(1.25, 0.1, 2, 24), s)]],
      XYZE: [[new Mesh(new SphereGeometry(0.7, 10, 8), s)]]
    }, de = {
      X: [[new Mesh(G, c), [0.8, 0, 0], [0, 0, -Math.PI / 2]], [new Line(N, C), null, null, [0.8, 1, 1]]],
      Y: [[new Mesh(G, u), [0, 0.8, 0]], [new Line(N, I), null, [0, 0, Math.PI / 2], [0.8, 1, 1]]],
      Z: [[new Mesh(G, h), [0, 0, 0.8], [Math.PI / 2, 0, 0]], [new Line(N, S), null, [0, -Math.PI / 2, 0], [0.8, 1, 1]]],
      XY: [[new Mesh(G, g), [0.85, 0.85, 0], null, [2, 2, 0.2]], [new Line(N, F), [0.855, 0.98, 0], null, [0.125, 1, 1]], [new Line(N, F), [0.98, 0.855, 0], [0, 0, Math.PI / 2], [0.125, 1, 1]]],
      YZ: [[new Mesh(G, w), [0, 0.85, 0.85], null, [0.2, 2, 2]], [new Line(N, R), [0, 0.855, 0.98], [0, 0, Math.PI / 2], [0.125, 1, 1]], [new Line(N, R), [0, 0.98, 0.855], [0, -Math.PI / 2, 0], [0.125, 1, 1]]],
      XZ: [[new Mesh(G, _), [0.85, 0, 0.85], null, [2, 0.2, 2]], [new Line(N, j), [0.855, 0, 0.98], null, [0.125, 1, 1]], [new Line(N, j), [0.98, 0, 0.855], [0, -Math.PI / 2, 0], [0.125, 1, 1]]],
      XYZX: [[new Mesh(new BoxGeometry(0.125, 0.125, 0.125), m.clone()), [1.1, 0, 0]]],
      XYZY: [[new Mesh(new BoxGeometry(0.125, 0.125, 0.125), m.clone()), [0, 1.1, 0]]],
      XYZZ: [[new Mesh(new BoxGeometry(0.125, 0.125, 0.125), m.clone()), [0, 0, 1.1]]]
    }, te = {
      X: [[new Mesh(new CylinderGeometry(0.2, 0, 0.8, 4, 1, false), s), [0.5, 0, 0], [0, 0, -Math.PI / 2]]],
      Y: [[new Mesh(new CylinderGeometry(0.2, 0, 0.8, 4, 1, false), s), [0, 0.5, 0]]],
      Z: [[new Mesh(new CylinderGeometry(0.2, 0, 0.8, 4, 1, false), s), [0, 0, 0.5], [Math.PI / 2, 0, 0]]],
      XY: [[new Mesh(G, s), [0.85, 0.85, 0], null, [3, 3, 0.2]]],
      YZ: [[new Mesh(G, s), [0, 0.85, 0.85], null, [0.2, 3, 3]]],
      XZ: [[new Mesh(G, s), [0.85, 0, 0.85], null, [3, 0.2, 3]]],
      XYZX: [[new Mesh(new BoxGeometry(0.2, 0.2, 0.2), s), [1.1, 0, 0]]],
      XYZY: [[new Mesh(new BoxGeometry(0.2, 0.2, 0.2), s), [0, 1.1, 0]]],
      XYZZ: [[new Mesh(new BoxGeometry(0.2, 0.2, 0.2), s), [0, 0, 1.1]]]
    }, X = {
      X: [[new Line(N, a.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]],
      Y: [[new Line(N, a.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]],
      Z: [[new Line(N, a.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]]
    }, ke = (ve) => {
      const le = new Object3D();
      for (let ie in ve)
        for (let ge = ve[ie].length; ge--; ) {
          const M = ve[ie][ge][0].clone(), ce = ve[ie][ge][1], Oe = ve[ie][ge][2], je = ve[ie][ge][3], ye = ve[ie][ge][4];
          M.name = ie, M.tag = ye, ce && M.position.set(ce[0], ce[1], ce[2]), Oe && M.rotation.set(Oe[0], Oe[1], Oe[2]), je && M.scale.set(je[0], je[1], je[2]), M.updateMatrix();
          const st = M.geometry.clone();
          st.applyMatrix4(M.matrix), M.geometry = st, M.renderOrder = 1 / 0, M.position.set(0, 0, 0), M.rotation.set(0, 0, 0), M.scale.set(1, 1, 1), le.add(M);
        }
      return le;
    };
    this.gizmo = {}, this.picker = {}, this.helper = {}, this.add(this.gizmo.translate = ke(K)), this.add(this.gizmo.rotate = ke(_e)), this.add(this.gizmo.scale = ke(de)), this.add(this.picker.translate = ke(q)), this.add(this.picker.rotate = ke(fe)), this.add(this.picker.scale = ke(te)), this.add(this.helper.translate = ke(he)), this.add(this.helper.rotate = ke(pe)), this.add(this.helper.scale = ke(X)), this.picker.translate.visible = false, this.picker.rotate.visible = false, this.picker.scale.visible = false;
  }
  // updateMatrixWorld will update transformations and appearance of individual handles
};
var su = class extends Mesh {
  constructor() {
    super(new PlaneGeometry(1e5, 1e5, 2, 2), new MeshBasicMaterial({
      visible: false,
      wireframe: true,
      side: DoubleSide,
      transparent: true,
      opacity: 0.1,
      toneMapped: false
    })), P(this, "isTransformControlsPlane", true), P(this, "type", "TransformControlsPlane"), P(this, "unitX", new Vector3(1, 0, 0)), P(this, "unitY", new Vector3(0, 1, 0)), P(this, "unitZ", new Vector3(0, 0, 1)), P(this, "tempVector", new Vector3()), P(this, "dirVector", new Vector3()), P(this, "alignVector", new Vector3()), P(this, "tempMatrix", new Matrix4()), P(this, "identityQuaternion", new Quaternion()), P(this, "cameraQuaternion", new Quaternion()), P(this, "worldPosition", new Vector3()), P(this, "worldQuaternion", new Quaternion()), P(this, "eye", new Vector3()), P(this, "axis", null), P(this, "mode", "translate"), P(this, "space", "world"), P(this, "updateMatrixWorld", () => {
      let i = this.space;
      switch (this.position.copy(this.worldPosition), this.mode === "scale" && (i = "local"), this.unitX.set(1, 0, 0).applyQuaternion(i === "local" ? this.worldQuaternion : this.identityQuaternion), this.unitY.set(0, 1, 0).applyQuaternion(i === "local" ? this.worldQuaternion : this.identityQuaternion), this.unitZ.set(0, 0, 1).applyQuaternion(i === "local" ? this.worldQuaternion : this.identityQuaternion), this.alignVector.copy(this.unitY), this.mode) {
        case "translate":
        case "scale":
          switch (this.axis) {
            case "X":
              this.alignVector.copy(this.eye).cross(this.unitX), this.dirVector.copy(this.unitX).cross(this.alignVector);
              break;
            case "Y":
              this.alignVector.copy(this.eye).cross(this.unitY), this.dirVector.copy(this.unitY).cross(this.alignVector);
              break;
            case "Z":
              this.alignVector.copy(this.eye).cross(this.unitZ), this.dirVector.copy(this.unitZ).cross(this.alignVector);
              break;
            case "XY":
              this.dirVector.copy(this.unitZ);
              break;
            case "YZ":
              this.dirVector.copy(this.unitX);
              break;
            case "XZ":
              this.alignVector.copy(this.unitZ), this.dirVector.copy(this.unitY);
              break;
            case "XYZ":
            case "E":
              this.dirVector.set(0, 0, 0);
              break;
          }
          break;
        case "rotate":
        default:
          this.dirVector.set(0, 0, 0);
      }
      this.dirVector.length() === 0 ? this.quaternion.copy(this.cameraQuaternion) : (this.tempMatrix.lookAt(this.tempVector.set(0, 0, 0), this.dirVector, this.alignVector), this.quaternion.setFromRotationMatrix(this.tempMatrix)), super.updateMatrixWorld();
    });
  }
};
var la = (b, i) => (b % i + i) % i;
var ru = class extends EventDispatcher {
  // Set to false to disable this control
  // "target" sets the location of focus, where the object orbits around
  // How far you can dolly in and out ( PerspectiveCamera only )
  // How far you can zoom in and out ( OrthographicCamera only )
  // How far you can orbit vertically, upper and lower limits.
  // Range is 0 to Math.PI radians.
  // radians
  // radians
  // How far you can orbit horizontally, upper and lower limits.
  // If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI )
  // radians
  // radians
  // Set to true to enable damping (inertia)
  // If damping is enabled, you must call controls.update() in your animation loop
  // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
  // Set to false to disable zooming
  // Set to false to disable rotating
  // Set to false to disable panning
  // if false, pan orthogonal to world-space direction camera.up
  // pixels moved per arrow key push
  // Set to true to automatically rotate around the target
  // If auto-rotate is enabled, you must call controls.update() in your animation loop
  // 30 seconds per orbit when fps is 60
  // true if you want to reverse the orbit to mouse drag from left to right = orbits left
  // The four arrow keys
  // Mouse buttons
  // Touch fingers
  // the target DOM element for key events
  constructor(i, r) {
    super(), P(this, "object", void 0), P(this, "domElement", void 0), P(this, "enabled", true), P(this, "target", new Vector3()), P(this, "minDistance", 0), P(this, "maxDistance", 1 / 0), P(this, "minZoom", 0), P(this, "maxZoom", 1 / 0), P(this, "minPolarAngle", 0), P(this, "maxPolarAngle", Math.PI), P(this, "minAzimuthAngle", -1 / 0), P(this, "maxAzimuthAngle", 1 / 0), P(this, "enableDamping", false), P(this, "dampingFactor", 0.05), P(this, "enableZoom", true), P(this, "zoomSpeed", 1), P(this, "enableRotate", true), P(this, "rotateSpeed", 1), P(this, "enablePan", true), P(this, "panSpeed", 1), P(this, "screenSpacePanning", true), P(this, "keyPanSpeed", 7), P(this, "autoRotate", false), P(this, "autoRotateSpeed", 2), P(this, "reverseOrbit", false), P(this, "keys", {
      LEFT: "ArrowLeft",
      UP: "ArrowUp",
      RIGHT: "ArrowRight",
      BOTTOM: "ArrowDown"
    }), P(this, "mouseButtons", {
      LEFT: MOUSE.ROTATE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.PAN
    }), P(this, "touches", {
      ONE: TOUCH.ROTATE,
      TWO: TOUCH.DOLLY_PAN
    }), P(this, "target0", void 0), P(this, "position0", void 0), P(this, "zoom0", void 0), P(this, "_domElementKeyEvents", null), P(this, "getPolarAngle", void 0), P(this, "getAzimuthalAngle", void 0), P(this, "setPolarAngle", void 0), P(this, "setAzimuthalAngle", void 0), P(this, "getDistance", void 0), P(this, "listenToKeyEvents", void 0), P(this, "saveState", void 0), P(this, "reset", void 0), P(this, "update", void 0), P(this, "connect", void 0), P(this, "dispose", void 0), this.object = i, this.domElement = r, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object instanceof PerspectiveCamera ? this.object.zoom : 1, this.getPolarAngle = () => w.phi, this.getAzimuthalAngle = () => w.theta, this.setPolarAngle = (A) => {
      let U = la(A, 2 * Math.PI), J = w.phi;
      J < 0 && (J += 2 * Math.PI), U < 0 && (U += 2 * Math.PI);
      let se = Math.abs(U - J);
      2 * Math.PI - se < se && (U < J ? U += 2 * Math.PI : J += 2 * Math.PI), _.phi = U - J, s.update();
    }, this.setAzimuthalAngle = (A) => {
      let U = la(A, 2 * Math.PI), J = w.theta;
      J < 0 && (J += 2 * Math.PI), U < 0 && (U += 2 * Math.PI);
      let se = Math.abs(U - J);
      2 * Math.PI - se < se && (U < J ? U += 2 * Math.PI : J += 2 * Math.PI), _.theta = U - J, s.update();
    }, this.getDistance = () => s.object.position.distanceTo(s.target), this.listenToKeyEvents = (A) => {
      A.addEventListener("keydown", xt), this._domElementKeyEvents = A;
    }, this.saveState = () => {
      s.target0.copy(s.target), s.position0.copy(s.object.position), s.zoom0 = s.object instanceof PerspectiveCamera ? s.object.zoom : 1;
    }, this.reset = () => {
      s.target.copy(s.target0), s.object.position.copy(s.position0), s.object instanceof PerspectiveCamera && (s.object.zoom = s.zoom0, s.object.updateProjectionMatrix()), s.dispatchEvent(a), s.update(), m = h.NONE;
    }, this.update = (() => {
      const A = new Vector3(), U = new Quaternion().setFromUnitVectors(i.up, new Vector3(0, 1, 0)), J = U.clone().invert(), se = new Vector3(), xe = new Quaternion(), Ne = 2 * Math.PI;
      return function() {
        const cn = s.object.position;
        A.copy(cn).sub(s.target), A.applyQuaternion(U), w.setFromVector3(A), s.autoRotate && m === h.NONE && he(K()), s.enableDamping ? (w.theta += _.theta * s.dampingFactor, w.phi += _.phi * s.dampingFactor) : (w.theta += _.theta, w.phi += _.phi);
        let Ke = s.minAzimuthAngle, $e = s.maxAzimuthAngle;
        return isFinite(Ke) && isFinite($e) && (Ke < -Math.PI ? Ke += Ne : Ke > Math.PI && (Ke -= Ne), $e < -Math.PI ? $e += Ne : $e > Math.PI && ($e -= Ne), Ke <= $e ? w.theta = Math.max(Ke, Math.min($e, w.theta)) : w.theta = w.theta > (Ke + $e) / 2 ? Math.max(Ke, w.theta) : Math.min($e, w.theta)), w.phi = Math.max(s.minPolarAngle, Math.min(s.maxPolarAngle, w.phi)), w.makeSafe(), w.radius *= y, w.radius = Math.max(s.minDistance, Math.min(s.maxDistance, w.radius)), s.enableDamping === true ? s.target.addScaledVector(C, s.dampingFactor) : s.target.add(C), A.setFromSpherical(w), A.applyQuaternion(J), cn.copy(s.target).add(A), s.object.lookAt(s.target), s.enableDamping === true ? (_.theta *= 1 - s.dampingFactor, _.phi *= 1 - s.dampingFactor, C.multiplyScalar(1 - s.dampingFactor)) : (_.set(0, 0, 0), C.set(0, 0, 0)), y = 1, I || se.distanceToSquared(s.object.position) > g || 8 * (1 - xe.dot(s.object.quaternion)) > g ? (s.dispatchEvent(a), se.copy(s.object.position), xe.copy(s.object.quaternion), I = false, true) : false;
      };
    })(), this.connect = (A) => {
      A === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'), s.domElement = A, s.domElement.style.touchAction = "none", s.domElement.addEventListener("contextmenu", ln), s.domElement.addEventListener("pointerdown", rt), s.domElement.addEventListener("pointercancel", jn), s.domElement.addEventListener("wheel", Un);
    }, this.dispose = () => {
      var A, U, J, se, xe, Ne;
      (A = s.domElement) === null || A === void 0 || A.removeEventListener("contextmenu", ln), (U = s.domElement) === null || U === void 0 || U.removeEventListener("pointerdown", rt), (J = s.domElement) === null || J === void 0 || J.removeEventListener("pointercancel", jn), (se = s.domElement) === null || se === void 0 || se.removeEventListener("wheel", Un), (xe = s.domElement) === null || xe === void 0 || xe.ownerDocument.removeEventListener("pointermove", an), (Ne = s.domElement) === null || Ne === void 0 || Ne.ownerDocument.removeEventListener("pointerup", ft), s._domElementKeyEvents !== null && s._domElementKeyEvents.removeEventListener("keydown", xt);
    };
    const s = this, a = {
      type: "change"
    }, c = {
      type: "start"
    }, u = {
      type: "end"
    }, h = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let m = h.NONE;
    const g = 1e-6, w = new Spherical(), _ = new Spherical();
    let y = 1;
    const C = new Vector3();
    let I = false;
    const S = new Vector2(), R = new Vector2(), j = new Vector2(), F = new Vector2(), V = new Vector2(), D = new Vector2(), Y = new Vector2(), G = new Vector2(), N = new Vector2(), O = [], H = {};
    function K() {
      return 2 * Math.PI / 60 / 60 * s.autoRotateSpeed;
    }
    function q() {
      return Math.pow(0.95, s.zoomSpeed);
    }
    function he(A) {
      s.reverseOrbit ? _.theta += A : _.theta -= A;
    }
    function _e(A) {
      s.reverseOrbit ? _.phi += A : _.phi -= A;
    }
    const pe = (() => {
      const A = new Vector3();
      return function(J, se) {
        A.setFromMatrixColumn(se, 0), A.multiplyScalar(-J), C.add(A);
      };
    })(), fe = (() => {
      const A = new Vector3();
      return function(J, se) {
        s.screenSpacePanning === true ? A.setFromMatrixColumn(se, 1) : (A.setFromMatrixColumn(se, 0), A.crossVectors(s.object.up, A)), A.multiplyScalar(J), C.add(A);
      };
    })(), de = (() => {
      const A = new Vector3();
      return function(J, se) {
        const xe = s.domElement;
        if (xe && s.object instanceof PerspectiveCamera && s.object.isPerspectiveCamera) {
          const Ne = s.object.position;
          A.copy(Ne).sub(s.target);
          let Ut = A.length();
          Ut *= Math.tan(s.object.fov / 2 * Math.PI / 180), pe(2 * J * Ut / xe.clientHeight, s.object.matrix), fe(2 * se * Ut / xe.clientHeight, s.object.matrix);
        } else
          xe && s.object instanceof OrthographicCamera && s.object.isOrthographicCamera ? (pe(J * (s.object.right - s.object.left) / s.object.zoom / xe.clientWidth, s.object.matrix), fe(se * (s.object.top - s.object.bottom) / s.object.zoom / xe.clientHeight, s.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), s.enablePan = false);
      };
    })();
    function te(A) {
      s.object instanceof PerspectiveCamera && s.object.isPerspectiveCamera ? y /= A : s.object instanceof OrthographicCamera && s.object.isOrthographicCamera ? (s.object.zoom = Math.max(s.minZoom, Math.min(s.maxZoom, s.object.zoom * A)), s.object.updateProjectionMatrix(), I = true) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), s.enableZoom = false);
    }
    function X(A) {
      s.object instanceof PerspectiveCamera && s.object.isPerspectiveCamera ? y *= A : s.object instanceof OrthographicCamera && s.object.isOrthographicCamera ? (s.object.zoom = Math.max(s.minZoom, Math.min(s.maxZoom, s.object.zoom / A)), s.object.updateProjectionMatrix(), I = true) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), s.enableZoom = false);
    }
    function ke(A) {
      S.set(A.clientX, A.clientY);
    }
    function ve(A) {
      Y.set(A.clientX, A.clientY);
    }
    function le(A) {
      F.set(A.clientX, A.clientY);
    }
    function ie(A) {
      R.set(A.clientX, A.clientY), j.subVectors(R, S).multiplyScalar(s.rotateSpeed);
      const U = s.domElement;
      U && (he(2 * Math.PI * j.x / U.clientHeight), _e(2 * Math.PI * j.y / U.clientHeight)), S.copy(R), s.update();
    }
    function ge(A) {
      G.set(A.clientX, A.clientY), N.subVectors(G, Y), N.y > 0 ? te(q()) : N.y < 0 && X(q()), Y.copy(G), s.update();
    }
    function M(A) {
      V.set(A.clientX, A.clientY), D.subVectors(V, F).multiplyScalar(s.panSpeed), de(D.x, D.y), F.copy(V), s.update();
    }
    function ce(A) {
      A.deltaY < 0 ? X(q()) : A.deltaY > 0 && te(q()), s.update();
    }
    function Oe(A) {
      let U = false;
      switch (A.code) {
        case s.keys.UP:
          de(0, s.keyPanSpeed), U = true;
          break;
        case s.keys.BOTTOM:
          de(0, -s.keyPanSpeed), U = true;
          break;
        case s.keys.LEFT:
          de(s.keyPanSpeed, 0), U = true;
          break;
        case s.keys.RIGHT:
          de(-s.keyPanSpeed, 0), U = true;
          break;
      }
      U && (A.preventDefault(), s.update());
    }
    function je() {
      if (O.length == 1)
        S.set(O[0].pageX, O[0].pageY);
      else {
        const A = 0.5 * (O[0].pageX + O[1].pageX), U = 0.5 * (O[0].pageY + O[1].pageY);
        S.set(A, U);
      }
    }
    function ye() {
      if (O.length == 1)
        F.set(O[0].pageX, O[0].pageY);
      else {
        const A = 0.5 * (O[0].pageX + O[1].pageX), U = 0.5 * (O[0].pageY + O[1].pageY);
        F.set(A, U);
      }
    }
    function st() {
      const A = O[0].pageX - O[1].pageX, U = O[0].pageY - O[1].pageY, J = Math.sqrt(A * A + U * U);
      Y.set(0, J);
    }
    function Fn() {
      s.enableZoom && st(), s.enablePan && ye();
    }
    function Qe() {
      s.enableZoom && st(), s.enableRotate && je();
    }
    function Bn(A) {
      if (O.length == 1)
        R.set(A.pageX, A.pageY);
      else {
        const J = Rt(A), se = 0.5 * (A.pageX + J.x), xe = 0.5 * (A.pageY + J.y);
        R.set(se, xe);
      }
      j.subVectors(R, S).multiplyScalar(s.rotateSpeed);
      const U = s.domElement;
      U && (he(2 * Math.PI * j.x / U.clientHeight), _e(2 * Math.PI * j.y / U.clientHeight)), S.copy(R);
    }
    function on(A) {
      if (O.length == 1)
        V.set(A.pageX, A.pageY);
      else {
        const U = Rt(A), J = 0.5 * (A.pageX + U.x), se = 0.5 * (A.pageY + U.y);
        V.set(J, se);
      }
      D.subVectors(V, F).multiplyScalar(s.panSpeed), de(D.x, D.y), F.copy(V);
    }
    function mt(A) {
      const U = Rt(A), J = A.pageX - U.x, se = A.pageY - U.y, xe = Math.sqrt(J * J + se * se);
      G.set(0, xe), N.set(0, Math.pow(G.y / Y.y, s.zoomSpeed)), te(N.y), Y.copy(G);
    }
    function At(A) {
      s.enableZoom && mt(A), s.enablePan && on(A);
    }
    function He(A) {
      s.enableZoom && mt(A), s.enableRotate && Bn(A);
    }
    function rt(A) {
      if (s.enabled !== false) {
        if (O.length === 0) {
          var U, J;
          (U = s.domElement) === null || U === void 0 || U.ownerDocument.addEventListener("pointermove", an), (J = s.domElement) === null || J === void 0 || J.ownerDocument.addEventListener("pointerup", ft);
        }
        Hn(A), A.pointerType === "touch" ? Lt(A) : ui(A);
      }
    }
    function an(A) {
      s.enabled !== false && (A.pointerType === "touch" ? Gn(A) : zn(A));
    }
    function ft(A) {
      if (Et(A), O.length === 0) {
        var U, J, se;
        (U = s.domElement) === null || U === void 0 || U.releasePointerCapture(A.pointerId), (J = s.domElement) === null || J === void 0 || J.ownerDocument.removeEventListener("pointermove", an), (se = s.domElement) === null || se === void 0 || se.ownerDocument.removeEventListener("pointerup", ft);
      }
      s.dispatchEvent(u), m = h.NONE;
    }
    function jn(A) {
      Et(A);
    }
    function ui(A) {
      let U;
      switch (A.button) {
        case 0:
          U = s.mouseButtons.LEFT;
          break;
        case 1:
          U = s.mouseButtons.MIDDLE;
          break;
        case 2:
          U = s.mouseButtons.RIGHT;
          break;
        default:
          U = -1;
      }
      switch (U) {
        case MOUSE.DOLLY:
          if (s.enableZoom === false)
            return;
          ve(A), m = h.DOLLY;
          break;
        case MOUSE.ROTATE:
          if (A.ctrlKey || A.metaKey || A.shiftKey) {
            if (s.enablePan === false)
              return;
            le(A), m = h.PAN;
          } else {
            if (s.enableRotate === false)
              return;
            ke(A), m = h.ROTATE;
          }
          break;
        case MOUSE.PAN:
          if (A.ctrlKey || A.metaKey || A.shiftKey) {
            if (s.enableRotate === false)
              return;
            ke(A), m = h.ROTATE;
          } else {
            if (s.enablePan === false)
              return;
            le(A), m = h.PAN;
          }
          break;
        default:
          m = h.NONE;
      }
      m !== h.NONE && s.dispatchEvent(c);
    }
    function zn(A) {
      if (s.enabled !== false)
        switch (m) {
          case h.ROTATE:
            if (s.enableRotate === false)
              return;
            ie(A);
            break;
          case h.DOLLY:
            if (s.enableZoom === false)
              return;
            ge(A);
            break;
          case h.PAN:
            if (s.enablePan === false)
              return;
            M(A);
            break;
        }
    }
    function Un(A) {
      s.enabled === false || s.enableZoom === false || m !== h.NONE && m !== h.ROTATE || (A.preventDefault(), s.dispatchEvent(c), ce(A), s.dispatchEvent(u));
    }
    function xt(A) {
      s.enabled === false || s.enablePan === false || Oe(A);
    }
    function Lt(A) {
      switch (vt(A), O.length) {
        case 1:
          switch (s.touches.ONE) {
            case TOUCH.ROTATE:
              if (s.enableRotate === false)
                return;
              je(), m = h.TOUCH_ROTATE;
              break;
            case TOUCH.PAN:
              if (s.enablePan === false)
                return;
              ye(), m = h.TOUCH_PAN;
              break;
            default:
              m = h.NONE;
          }
          break;
        case 2:
          switch (s.touches.TWO) {
            case TOUCH.DOLLY_PAN:
              if (s.enableZoom === false && s.enablePan === false)
                return;
              Fn(), m = h.TOUCH_DOLLY_PAN;
              break;
            case TOUCH.DOLLY_ROTATE:
              if (s.enableZoom === false && s.enableRotate === false)
                return;
              Qe(), m = h.TOUCH_DOLLY_ROTATE;
              break;
            default:
              m = h.NONE;
          }
          break;
        default:
          m = h.NONE;
      }
      m !== h.NONE && s.dispatchEvent(c);
    }
    function Gn(A) {
      switch (vt(A), m) {
        case h.TOUCH_ROTATE:
          if (s.enableRotate === false)
            return;
          Bn(A), s.update();
          break;
        case h.TOUCH_PAN:
          if (s.enablePan === false)
            return;
          on(A), s.update();
          break;
        case h.TOUCH_DOLLY_PAN:
          if (s.enableZoom === false && s.enablePan === false)
            return;
          At(A), s.update();
          break;
        case h.TOUCH_DOLLY_ROTATE:
          if (s.enableZoom === false && s.enableRotate === false)
            return;
          He(A), s.update();
          break;
        default:
          m = h.NONE;
      }
    }
    function ln(A) {
      s.enabled !== false && A.preventDefault();
    }
    function Hn(A) {
      O.push(A);
    }
    function Et(A) {
      delete H[A.pointerId];
      for (let U = 0; U < O.length; U++)
        if (O[U].pointerId == A.pointerId) {
          O.splice(U, 1);
          return;
        }
    }
    function vt(A) {
      let U = H[A.pointerId];
      U === void 0 && (U = new Vector2(), H[A.pointerId] = U), U.set(A.pageX, A.pageY);
    }
    function Rt(A) {
      const U = A.pointerId === O[0].pointerId ? O[1] : O[0];
      return H[U.pointerId];
    }
    r !== void 0 && this.connect(r), this.update();
  }
};
var ou = class extends Loader {
  constructor(i) {
    super(i), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(r) {
      return new uu(r);
    }), this.register(function(r) {
      return new gu(r);
    }), this.register(function(r) {
      return new _u(r);
    }), this.register(function(r) {
      return new du(r);
    }), this.register(function(r) {
      return new mu(r);
    }), this.register(function(r) {
      return new fu(r);
    }), this.register(function(r) {
      return new vu(r);
    }), this.register(function(r) {
      return new pu(r);
    }), this.register(function(r) {
      return new bu(r);
    }), this.register(function(r) {
      return new hu(r);
    }), this.register(function(r) {
      return new lu(r);
    }), this.register(function(r) {
      return new wu(r);
    });
  }
  load(i, r, s, a) {
    const c = this;
    let u;
    this.resourcePath !== "" ? u = this.resourcePath : this.path !== "" ? u = this.path : u = LoaderUtils.extractUrlBase(i), this.manager.itemStart(i);
    const h = function(g) {
      a ? a(g) : console.error(g), c.manager.itemError(i), c.manager.itemEnd(i);
    }, m = new FileLoader(this.manager);
    m.setPath(this.path), m.setResponseType("arraybuffer"), m.setRequestHeader(this.requestHeader), m.setWithCredentials(this.withCredentials), m.load(i, function(g) {
      try {
        c.parse(g, u, function(w) {
          r(w), c.manager.itemEnd(i);
        }, h);
      } catch (w) {
        h(w);
      }
    }, s, h);
  }
  setDRACOLoader(i) {
    return this.dracoLoader = i, this;
  }
  setDDSLoader() {
    throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".');
  }
  setKTX2Loader(i) {
    return this.ktx2Loader = i, this;
  }
  setMeshoptDecoder(i) {
    return this.meshoptDecoder = i, this;
  }
  register(i) {
    return this.pluginCallbacks.indexOf(i) === -1 && this.pluginCallbacks.push(i), this;
  }
  unregister(i) {
    return this.pluginCallbacks.indexOf(i) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(i), 1), this;
  }
  parse(i, r, s, a) {
    let c;
    const u = {}, h = {};
    if (typeof i == "string")
      c = i;
    else if (LoaderUtils.decodeText(new Uint8Array(i, 0, 4)) === Xa) {
      try {
        u[ae.KHR_BINARY_GLTF] = new yu(i);
      } catch (_) {
        a && a(_);
        return;
      }
      c = u[ae.KHR_BINARY_GLTF].content;
    } else
      c = LoaderUtils.decodeText(new Uint8Array(i));
    const m = JSON.parse(c);
    if (m.asset === void 0 || m.asset.version[0] < 2) {
      a && a(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const g = new Vu(m, {
      path: r || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    g.fileLoader.setRequestHeader(this.requestHeader);
    for (let w = 0; w < this.pluginCallbacks.length; w++) {
      const _ = this.pluginCallbacks[w](g);
      h[_.name] = _, u[_.name] = true;
    }
    if (m.extensionsUsed)
      for (let w = 0; w < m.extensionsUsed.length; ++w) {
        const _ = m.extensionsUsed[w], y = m.extensionsRequired || [];
        switch (_) {
          case ae.KHR_MATERIALS_UNLIT:
            u[_] = new cu();
            break;
          case ae.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
            u[_] = new Cu();
            break;
          case ae.KHR_DRACO_MESH_COMPRESSION:
            u[_] = new xu(m, this.dracoLoader);
            break;
          case ae.KHR_TEXTURE_TRANSFORM:
            u[_] = new Eu();
            break;
          case ae.KHR_MESH_QUANTIZATION:
            u[_] = new Pu();
            break;
          default:
            y.indexOf(_) >= 0 && h[_] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + _ + '".');
        }
      }
    g.setExtensions(u), g.setPlugins(h), g.parse(s, a);
  }
  parseAsync(i, r) {
    const s = this;
    return new Promise(function(a, c) {
      s.parse(i, r, a, c);
    });
  }
};
function au() {
  let b = {};
  return {
    get: function(i) {
      return b[i];
    },
    add: function(i, r) {
      b[i] = r;
    },
    remove: function(i) {
      delete b[i];
    },
    removeAll: function() {
      b = {};
    }
  };
}
var ae = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: "KHR_materials_pbrSpecularGlossiness",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression"
};
var lu = class {
  constructor(i) {
    this.parser = i, this.name = ae.KHR_LIGHTS_PUNCTUAL, this.cache = {
      refs: {},
      uses: {}
    };
  }
  _markDefs() {
    const i = this.parser, r = this.parser.json.nodes || [];
    for (let s = 0, a = r.length; s < a; s++) {
      const c = r[s];
      c.extensions && c.extensions[this.name] && c.extensions[this.name].light !== void 0 && i._addNodeRef(this.cache, c.extensions[this.name].light);
    }
  }
  _loadLight(i) {
    const r = this.parser, s = "light:" + i;
    let a = r.cache.get(s);
    if (a)
      return a;
    const c = r.json, m = ((c.extensions && c.extensions[this.name] || {}).lights || [])[i];
    let g;
    const w = new Color(16777215);
    m.color !== void 0 && w.fromArray(m.color);
    const _ = m.range !== void 0 ? m.range : 0;
    switch (m.type) {
      case "directional":
        g = new DirectionalLight(w), g.target.position.set(0, 0, -1), g.add(g.target);
        break;
      case "point":
        g = new PointLight(w), g.distance = _;
        break;
      case "spot":
        g = new SpotLight(w), g.distance = _, m.spot = m.spot || {}, m.spot.innerConeAngle = m.spot.innerConeAngle !== void 0 ? m.spot.innerConeAngle : 0, m.spot.outerConeAngle = m.spot.outerConeAngle !== void 0 ? m.spot.outerConeAngle : Math.PI / 4, g.angle = m.spot.outerConeAngle, g.penumbra = 1 - m.spot.innerConeAngle / m.spot.outerConeAngle, g.target.position.set(0, 0, -1), g.add(g.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + m.type);
    }
    return g.position.set(0, 0, 0), g.decay = 2, m.intensity !== void 0 && (g.intensity = m.intensity), g.name = r.createUniqueName(m.name || "light_" + i), a = Promise.resolve(g), r.cache.add(s, a), a;
  }
  createNodeAttachment(i) {
    const r = this, s = this.parser, c = s.json.nodes[i], h = (c.extensions && c.extensions[this.name] || {}).light;
    return h === void 0 ? null : this._loadLight(h).then(function(m) {
      return s._getNodeRef(r.cache, h, m);
    });
  }
};
var cu = class {
  constructor() {
    this.name = ae.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return MeshBasicMaterial;
  }
  extendParams(i, r, s) {
    const a = [];
    i.color = new Color(1, 1, 1), i.opacity = 1;
    const c = r.pbrMetallicRoughness;
    if (c) {
      if (Array.isArray(c.baseColorFactor)) {
        const u = c.baseColorFactor;
        i.color.fromArray(u), i.opacity = u[3];
      }
      c.baseColorTexture !== void 0 && a.push(s.assignTexture(i, "map", c.baseColorTexture, sRGBEncoding));
    }
    return Promise.all(a);
  }
};
var pu = class {
  constructor(i) {
    this.parser = i, this.name = ae.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(i, r) {
    const a = this.parser.json.materials[i];
    if (!a.extensions || !a.extensions[this.name])
      return Promise.resolve();
    const c = a.extensions[this.name].emissiveStrength;
    return c !== void 0 && (r.emissiveIntensity = c), Promise.resolve();
  }
};
var uu = class {
  constructor(i) {
    this.parser = i, this.name = ae.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(i) {
    const s = this.parser.json.materials[i];
    return !s.extensions || !s.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(i, r) {
    const s = this.parser, a = s.json.materials[i];
    if (!a.extensions || !a.extensions[this.name])
      return Promise.resolve();
    const c = [], u = a.extensions[this.name];
    if (u.clearcoatFactor !== void 0 && (r.clearcoat = u.clearcoatFactor), u.clearcoatTexture !== void 0 && c.push(s.assignTexture(r, "clearcoatMap", u.clearcoatTexture)), u.clearcoatRoughnessFactor !== void 0 && (r.clearcoatRoughness = u.clearcoatRoughnessFactor), u.clearcoatRoughnessTexture !== void 0 && c.push(s.assignTexture(r, "clearcoatRoughnessMap", u.clearcoatRoughnessTexture)), u.clearcoatNormalTexture !== void 0 && (c.push(s.assignTexture(r, "clearcoatNormalMap", u.clearcoatNormalTexture)), u.clearcoatNormalTexture.scale !== void 0)) {
      const h = u.clearcoatNormalTexture.scale;
      r.clearcoatNormalScale = new Vector2(h, h);
    }
    return Promise.all(c);
  }
};
var hu = class {
  constructor(i) {
    this.parser = i, this.name = ae.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(i) {
    const s = this.parser.json.materials[i];
    return !s.extensions || !s.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(i, r) {
    const s = this.parser, a = s.json.materials[i];
    if (!a.extensions || !a.extensions[this.name])
      return Promise.resolve();
    const c = [], u = a.extensions[this.name];
    return u.iridescenceFactor !== void 0 && (r.iridescence = u.iridescenceFactor), u.iridescenceTexture !== void 0 && c.push(s.assignTexture(r, "iridescenceMap", u.iridescenceTexture)), u.iridescenceIor !== void 0 && (r.iridescenceIOR = u.iridescenceIor), r.iridescenceThicknessRange === void 0 && (r.iridescenceThicknessRange = [100, 400]), u.iridescenceThicknessMinimum !== void 0 && (r.iridescenceThicknessRange[0] = u.iridescenceThicknessMinimum), u.iridescenceThicknessMaximum !== void 0 && (r.iridescenceThicknessRange[1] = u.iridescenceThicknessMaximum), u.iridescenceThicknessTexture !== void 0 && c.push(s.assignTexture(r, "iridescenceThicknessMap", u.iridescenceThicknessTexture)), Promise.all(c);
  }
};
var du = class {
  constructor(i) {
    this.parser = i, this.name = ae.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(i) {
    const s = this.parser.json.materials[i];
    return !s.extensions || !s.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(i, r) {
    const s = this.parser, a = s.json.materials[i];
    if (!a.extensions || !a.extensions[this.name])
      return Promise.resolve();
    const c = [];
    r.sheenColor = new Color(0, 0, 0), r.sheenRoughness = 0, r.sheen = 1;
    const u = a.extensions[this.name];
    return u.sheenColorFactor !== void 0 && r.sheenColor.fromArray(u.sheenColorFactor), u.sheenRoughnessFactor !== void 0 && (r.sheenRoughness = u.sheenRoughnessFactor), u.sheenColorTexture !== void 0 && c.push(s.assignTexture(r, "sheenColorMap", u.sheenColorTexture, sRGBEncoding)), u.sheenRoughnessTexture !== void 0 && c.push(s.assignTexture(r, "sheenRoughnessMap", u.sheenRoughnessTexture)), Promise.all(c);
  }
};
var mu = class {
  constructor(i) {
    this.parser = i, this.name = ae.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(i) {
    const s = this.parser.json.materials[i];
    return !s.extensions || !s.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(i, r) {
    const s = this.parser, a = s.json.materials[i];
    if (!a.extensions || !a.extensions[this.name])
      return Promise.resolve();
    const c = [], u = a.extensions[this.name];
    return u.transmissionFactor !== void 0 && (r.transmission = u.transmissionFactor), u.transmissionTexture !== void 0 && c.push(s.assignTexture(r, "transmissionMap", u.transmissionTexture)), Promise.all(c);
  }
};
var fu = class {
  constructor(i) {
    this.parser = i, this.name = ae.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(i) {
    const s = this.parser.json.materials[i];
    return !s.extensions || !s.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(i, r) {
    const s = this.parser, a = s.json.materials[i];
    if (!a.extensions || !a.extensions[this.name])
      return Promise.resolve();
    const c = [], u = a.extensions[this.name];
    r.thickness = u.thicknessFactor !== void 0 ? u.thicknessFactor : 0, u.thicknessTexture !== void 0 && c.push(s.assignTexture(r, "thicknessMap", u.thicknessTexture)), r.attenuationDistance = u.attenuationDistance || 1 / 0;
    const h = u.attenuationColor || [1, 1, 1];
    return r.attenuationColor = new Color(h[0], h[1], h[2]), Promise.all(c);
  }
};
var vu = class {
  constructor(i) {
    this.parser = i, this.name = ae.KHR_MATERIALS_IOR;
  }
  getMaterialType(i) {
    const s = this.parser.json.materials[i];
    return !s.extensions || !s.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(i, r) {
    const a = this.parser.json.materials[i];
    if (!a.extensions || !a.extensions[this.name])
      return Promise.resolve();
    const c = a.extensions[this.name];
    return r.ior = c.ior !== void 0 ? c.ior : 1.5, Promise.resolve();
  }
};
var bu = class {
  constructor(i) {
    this.parser = i, this.name = ae.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(i) {
    const s = this.parser.json.materials[i];
    return !s.extensions || !s.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(i, r) {
    const s = this.parser, a = s.json.materials[i];
    if (!a.extensions || !a.extensions[this.name])
      return Promise.resolve();
    const c = [], u = a.extensions[this.name];
    r.specularIntensity = u.specularFactor !== void 0 ? u.specularFactor : 1, u.specularTexture !== void 0 && c.push(s.assignTexture(r, "specularIntensityMap", u.specularTexture));
    const h = u.specularColorFactor || [1, 1, 1];
    return r.specularColor = new Color(h[0], h[1], h[2]), u.specularColorTexture !== void 0 && c.push(s.assignTexture(r, "specularColorMap", u.specularColorTexture, sRGBEncoding)), Promise.all(c);
  }
};
var gu = class {
  constructor(i) {
    this.parser = i, this.name = ae.KHR_TEXTURE_BASISU;
  }
  loadTexture(i) {
    const r = this.parser, s = r.json, a = s.textures[i];
    if (!a.extensions || !a.extensions[this.name])
      return null;
    const c = a.extensions[this.name], u = r.options.ktx2Loader;
    if (!u) {
      if (s.extensionsRequired && s.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return r.loadTextureImage(i, c.source, u);
  }
};
var _u = class {
  constructor(i) {
    this.parser = i, this.name = ae.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(i) {
    const r = this.name, s = this.parser, a = s.json, c = a.textures[i];
    if (!c.extensions || !c.extensions[r])
      return null;
    const u = c.extensions[r], h = a.images[u.source];
    let m = s.textureLoader;
    if (h.uri) {
      const g = s.options.manager.getHandler(h.uri);
      g !== null && (m = g);
    }
    return this.detectSupport().then(function(g) {
      if (g)
        return s.loadTextureImage(i, u.source, m);
      if (a.extensionsRequired && a.extensionsRequired.indexOf(r) >= 0)
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return s.loadTexture(i);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(i) {
      const r = new Image();
      r.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", r.onload = r.onerror = function() {
        i(r.height === 1);
      };
    })), this.isSupported;
  }
};
var wu = class {
  constructor(i) {
    this.name = ae.EXT_MESHOPT_COMPRESSION, this.parser = i;
  }
  loadBufferView(i) {
    const r = this.parser.json, s = r.bufferViews[i];
    if (s.extensions && s.extensions[this.name]) {
      const a = s.extensions[this.name], c = this.parser.getDependency("buffer", a.buffer), u = this.parser.options.meshoptDecoder;
      if (!u || !u.supported) {
        if (r.extensionsRequired && r.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return c.then(function(h) {
        const m = a.byteOffset || 0, g = a.byteLength || 0, w = a.count, _ = a.byteStride, y = new Uint8Array(h, m, g);
        return u.decodeGltfBufferAsync ? u.decodeGltfBufferAsync(w, _, y, a.mode, a.filter).then(function(C) {
          return C.buffer;
        }) : u.ready.then(function() {
          const C = new ArrayBuffer(w * _);
          return u.decodeGltfBuffer(new Uint8Array(C), w, _, y, a.mode, a.filter), C;
        });
      });
    } else
      return null;
  }
};
var Xa = "glTF";
var Ui = 12;
var ca = {
  JSON: 1313821514,
  BIN: 5130562
};
var yu = class {
  constructor(i) {
    this.name = ae.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const r = new DataView(i, 0, Ui);
    if (this.header = {
      magic: LoaderUtils.decodeText(new Uint8Array(i.slice(0, 4))),
      version: r.getUint32(4, true),
      length: r.getUint32(8, true)
    }, this.header.magic !== Xa)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const s = this.header.length - Ui, a = new DataView(i, Ui);
    let c = 0;
    for (; c < s; ) {
      const u = a.getUint32(c, true);
      c += 4;
      const h = a.getUint32(c, true);
      if (c += 4, h === ca.JSON) {
        const m = new Uint8Array(i, Ui + c, u);
        this.content = LoaderUtils.decodeText(m);
      } else if (h === ca.BIN) {
        const m = Ui + c;
        this.body = i.slice(m, m + u);
      }
      c += u;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
};
var xu = class {
  constructor(i, r) {
    if (!r)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = ae.KHR_DRACO_MESH_COMPRESSION, this.json = i, this.dracoLoader = r, this.dracoLoader.preload();
  }
  decodePrimitive(i, r) {
    const s = this.json, a = this.dracoLoader, c = i.extensions[this.name].bufferView, u = i.extensions[this.name].attributes, h = {}, m = {}, g = {};
    for (const w in u) {
      const _ = uo[w] || w.toLowerCase();
      h[_] = u[w];
    }
    for (const w in i.attributes) {
      const _ = uo[w] || w.toLowerCase();
      if (u[w] !== void 0) {
        const y = s.accessors[i.attributes[w]], C = Zi[y.componentType];
        g[_] = C.name, m[_] = y.normalized === true;
      }
    }
    return r.getDependency("bufferView", c).then(function(w) {
      return new Promise(function(_) {
        a.decodeDracoFile(w, function(y) {
          for (const C in y.attributes) {
            const I = y.attributes[C], S = m[C];
            S !== void 0 && (I.normalized = S);
          }
          _(y);
        }, h, g);
      });
    });
  }
};
var Eu = class {
  constructor() {
    this.name = ae.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(i, r) {
    return r.texCoord !== void 0 && console.warn('THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.'), r.offset === void 0 && r.rotation === void 0 && r.scale === void 0 || (i = i.clone(), r.offset !== void 0 && i.offset.fromArray(r.offset), r.rotation !== void 0 && (i.rotation = r.rotation), r.scale !== void 0 && i.repeat.fromArray(r.scale), i.needsUpdate = true), i;
  }
};
var po = class extends MeshStandardMaterial {
  constructor(i) {
    super(), this.isGLTFSpecularGlossinessMaterial = true;
    const r = ["#ifdef USE_SPECULARMAP", "	uniform sampler2D specularMap;", "#endif"].join(`
`), s = ["#ifdef USE_GLOSSINESSMAP", "	uniform sampler2D glossinessMap;", "#endif"].join(`
`), a = ["vec3 specularFactor = specular;", "#ifdef USE_SPECULARMAP", "	vec4 texelSpecular = texture2D( specularMap, vUv );", "	// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture", "	specularFactor *= texelSpecular.rgb;", "#endif"].join(`
`), c = ["float glossinessFactor = glossiness;", "#ifdef USE_GLOSSINESSMAP", "	vec4 texelGlossiness = texture2D( glossinessMap, vUv );", "	// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture", "	glossinessFactor *= texelGlossiness.a;", "#endif"].join(`
`), u = ["PhysicalMaterial material;", "material.diffuseColor = diffuseColor.rgb * ( 1. - max( specularFactor.r, max( specularFactor.g, specularFactor.b ) ) );", "vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );", "float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );", "material.roughness = max( 1.0 - glossinessFactor, 0.0525 ); // 0.0525 corresponds to the base mip of a 256 cubemap.", "material.roughness += geometryRoughness;", "material.roughness = min( material.roughness, 1.0 );", "material.specularColor = specularFactor;"].join(`
`), h = {
      specular: {
        value: new Color().setHex(16777215)
      },
      glossiness: {
        value: 1
      },
      specularMap: {
        value: null
      },
      glossinessMap: {
        value: null
      }
    };
    this._extraUniforms = h, this.onBeforeCompile = function(m) {
      for (const g in h)
        m.uniforms[g] = h[g];
      m.fragmentShader = m.fragmentShader.replace("uniform float roughness;", "uniform vec3 specular;").replace("uniform float metalness;", "uniform float glossiness;").replace("#include <roughnessmap_pars_fragment>", r).replace("#include <metalnessmap_pars_fragment>", s).replace("#include <roughnessmap_fragment>", a).replace("#include <metalnessmap_fragment>", c).replace("#include <lights_physical_fragment>", u);
    }, Object.defineProperties(this, {
      specular: {
        get: function() {
          return h.specular.value;
        },
        set: function(m) {
          h.specular.value = m;
        }
      },
      specularMap: {
        get: function() {
          return h.specularMap.value;
        },
        set: function(m) {
          h.specularMap.value = m, m ? this.defines.USE_SPECULARMAP = "" : delete this.defines.USE_SPECULARMAP;
        }
      },
      glossiness: {
        get: function() {
          return h.glossiness.value;
        },
        set: function(m) {
          h.glossiness.value = m;
        }
      },
      glossinessMap: {
        get: function() {
          return h.glossinessMap.value;
        },
        set: function(m) {
          h.glossinessMap.value = m, m ? (this.defines.USE_GLOSSINESSMAP = "", this.defines.USE_UV = "") : (delete this.defines.USE_GLOSSINESSMAP, delete this.defines.USE_UV);
        }
      }
    }), delete this.metalness, delete this.roughness, delete this.metalnessMap, delete this.roughnessMap, this.setValues(i);
  }
  copy(i) {
    return super.copy(i), this.specularMap = i.specularMap, this.specular.copy(i.specular), this.glossinessMap = i.glossinessMap, this.glossiness = i.glossiness, delete this.metalness, delete this.roughness, delete this.metalnessMap, delete this.roughnessMap, this;
  }
};
var Cu = class {
  constructor() {
    this.name = ae.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS, this.specularGlossinessParams = ["color", "map", "lightMap", "lightMapIntensity", "aoMap", "aoMapIntensity", "emissive", "emissiveIntensity", "emissiveMap", "bumpMap", "bumpScale", "normalMap", "normalMapType", "displacementMap", "displacementScale", "displacementBias", "specularMap", "specular", "glossinessMap", "glossiness", "alphaMap", "envMap", "envMapIntensity", "refractionRatio"];
  }
  getMaterialType() {
    return po;
  }
  extendParams(i, r, s) {
    const a = r.extensions[this.name];
    i.color = new Color(1, 1, 1), i.opacity = 1;
    const c = [];
    if (Array.isArray(a.diffuseFactor)) {
      const u = a.diffuseFactor;
      i.color.fromArray(u), i.opacity = u[3];
    }
    if (a.diffuseTexture !== void 0 && c.push(s.assignTexture(i, "map", a.diffuseTexture, sRGBEncoding)), i.emissive = new Color(0, 0, 0), i.glossiness = a.glossinessFactor !== void 0 ? a.glossinessFactor : 1, i.specular = new Color(1, 1, 1), Array.isArray(a.specularFactor) && i.specular.fromArray(a.specularFactor), a.specularGlossinessTexture !== void 0) {
      const u = a.specularGlossinessTexture;
      c.push(s.assignTexture(i, "glossinessMap", u)), c.push(s.assignTexture(i, "specularMap", u, sRGBEncoding));
    }
    return Promise.all(c);
  }
  createMaterial(i) {
    const r = new po(i);
    return r.fog = true, r.color = i.color, r.map = i.map === void 0 ? null : i.map, r.lightMap = null, r.lightMapIntensity = 1, r.aoMap = i.aoMap === void 0 ? null : i.aoMap, r.aoMapIntensity = 1, r.emissive = i.emissive, r.emissiveIntensity = i.emissiveIntensity === void 0 ? 1 : i.emissiveIntensity, r.emissiveMap = i.emissiveMap === void 0 ? null : i.emissiveMap, r.bumpMap = i.bumpMap === void 0 ? null : i.bumpMap, r.bumpScale = 1, r.normalMap = i.normalMap === void 0 ? null : i.normalMap, r.normalMapType = TangentSpaceNormalMap, i.normalScale && (r.normalScale = i.normalScale), r.displacementMap = null, r.displacementScale = 1, r.displacementBias = 0, r.specularMap = i.specularMap === void 0 ? null : i.specularMap, r.specular = i.specular, r.glossinessMap = i.glossinessMap === void 0 ? null : i.glossinessMap, r.glossiness = i.glossiness, r.alphaMap = null, r.envMap = i.envMap === void 0 ? null : i.envMap, r.envMapIntensity = 1, r.refractionRatio = 0.98, r;
  }
};
var Pu = class {
  constructor() {
    this.name = ae.KHR_MESH_QUANTIZATION;
  }
};
var Ya = class extends Interpolant {
  constructor(i, r, s, a) {
    super(i, r, s, a);
  }
  copySampleValue_(i) {
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, c = i * a * 3 + a;
    for (let u = 0; u !== a; u++)
      r[u] = s[c + u];
    return r;
  }
  interpolate_(i, r, s, a) {
    const c = this.resultBuffer, u = this.sampleValues, h = this.valueSize, m = h * 2, g = h * 3, w = a - r, _ = (s - r) / w, y = _ * _, C = y * _, I = i * g, S = I - g, R = -2 * C + 3 * y, j = C - y, F = 1 - R, V = j - y + _;
    for (let D = 0; D !== h; D++) {
      const Y = u[S + D + h], G = u[S + D + m] * w, N = u[I + D + h], O = u[I + D] * w;
      c[D] = F * Y + V * G + R * N + j * O;
    }
    return c;
  }
};
var Tu = new Quaternion();
var ku = class extends Ya {
  interpolate_(i, r, s, a) {
    const c = super.interpolate_(i, r, s, a);
    return Tu.fromArray(c).normalize().toArray(c), c;
  }
};
var Bt = {
  FLOAT: 5126,
  //FLOAT_MAT2: 35674,
  FLOAT_MAT3: 35675,
  FLOAT_MAT4: 35676,
  FLOAT_VEC2: 35664,
  FLOAT_VEC3: 35665,
  FLOAT_VEC4: 35666,
  LINEAR: 9729,
  REPEAT: 10497,
  SAMPLER_2D: 35678,
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
  UNSIGNED_BYTE: 5121,
  UNSIGNED_SHORT: 5123
};
var Zi = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
var pa = {
  9728: NearestFilter,
  9729: LinearFilter,
  9984: NearestMipmapNearestFilter,
  9985: LinearMipmapNearestFilter,
  9986: NearestMipmapLinearFilter,
  9987: LinearMipmapLinearFilter
};
var ua = {
  33071: ClampToEdgeWrapping,
  33648: MirroredRepeatWrapping,
  10497: RepeatWrapping
};
var ha = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
var uo = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv2",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
};
var nn = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
};
var Mu = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: InterpolateLinear,
  STEP: InterpolateDiscrete
};
var Wr = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function Su(b) {
  return b.DefaultMaterial === void 0 && (b.DefaultMaterial = new MeshStandardMaterial({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: false,
    depthTest: true,
    side: FrontSide
  })), b.DefaultMaterial;
}
function Gi(b, i, r) {
  for (const s in r.extensions)
    b[s] === void 0 && (i.userData.gltfExtensions = i.userData.gltfExtensions || {}, i.userData.gltfExtensions[s] = r.extensions[s]);
}
function Ln(b, i) {
  i.extras !== void 0 && (typeof i.extras == "object" ? Object.assign(b.userData, i.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + i.extras));
}
function Au(b, i, r) {
  let s = false, a = false, c = false;
  for (let g = 0, w = i.length; g < w; g++) {
    const _ = i[g];
    if (_.POSITION !== void 0 && (s = true), _.NORMAL !== void 0 && (a = true), _.COLOR_0 !== void 0 && (c = true), s && a && c)
      break;
  }
  if (!s && !a && !c)
    return Promise.resolve(b);
  const u = [], h = [], m = [];
  for (let g = 0, w = i.length; g < w; g++) {
    const _ = i[g];
    if (s) {
      const y = _.POSITION !== void 0 ? r.getDependency("accessor", _.POSITION) : b.attributes.position;
      u.push(y);
    }
    if (a) {
      const y = _.NORMAL !== void 0 ? r.getDependency("accessor", _.NORMAL) : b.attributes.normal;
      h.push(y);
    }
    if (c) {
      const y = _.COLOR_0 !== void 0 ? r.getDependency("accessor", _.COLOR_0) : b.attributes.color;
      m.push(y);
    }
  }
  return Promise.all([Promise.all(u), Promise.all(h), Promise.all(m)]).then(function(g) {
    const w = g[0], _ = g[1], y = g[2];
    return s && (b.morphAttributes.position = w), a && (b.morphAttributes.normal = _), c && (b.morphAttributes.color = y), b.morphTargetsRelative = true, b;
  });
}
function Lu(b, i) {
  if (b.updateMorphTargets(), i.weights !== void 0)
    for (let r = 0, s = i.weights.length; r < s; r++)
      b.morphTargetInfluences[r] = i.weights[r];
  if (i.extras && Array.isArray(i.extras.targetNames)) {
    const r = i.extras.targetNames;
    if (b.morphTargetInfluences.length === r.length) {
      b.morphTargetDictionary = {};
      for (let s = 0, a = r.length; s < a; s++)
        b.morphTargetDictionary[r[s]] = s;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function Ru(b) {
  const i = b.extensions && b.extensions[ae.KHR_DRACO_MESH_COMPRESSION];
  let r;
  return i ? r = "draco:" + i.bufferView + ":" + i.indices + ":" + da(i.attributes) : r = b.indices + ":" + da(b.attributes) + ":" + b.mode, r;
}
function da(b) {
  let i = "";
  const r = Object.keys(b).sort();
  for (let s = 0, a = r.length; s < a; s++)
    i += r[s] + ":" + b[r[s]] + ";";
  return i;
}
function ho(b) {
  switch (b) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function Iu(b) {
  return b.search(/\.jpe?g($|\?)/i) > 0 || b.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : b.search(/\.webp($|\?)/i) > 0 || b.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
var Vu = class {
  constructor(i = {}, r = {}) {
    var s, a;
    this.json = i, this.extensions = {}, this.plugins = {}, this.options = r, this.cache = new au(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.meshCache = {
      refs: {},
      uses: {}
    }, this.cameraCache = {
      refs: {},
      uses: {}
    }, this.lightCache = {
      refs: {},
      uses: {}
    }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    const c = typeof navigator < "u" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === true, u = typeof navigator < "u" && ((s = navigator.userAgent) === null || s === void 0 ? void 0 : s.indexOf("Firefox")) > -1, h = typeof navigator < "u" && u ? (a = navigator.userAgent) === null || a === void 0 ? void 0 : a.match(/Firefox\/([0-9]+)\./)[1] : -1;
    typeof createImageBitmap > "u" || c || u && h < 98 ? this.textureLoader = new TextureLoader(this.options.manager) : this.textureLoader = new ImageBitmapLoader(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new FileLoader(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(true);
  }
  setExtensions(i) {
    this.extensions = i;
  }
  setPlugins(i) {
    this.plugins = i;
  }
  parse(i, r) {
    const s = this, a = this.json, c = this.extensions;
    this.cache.removeAll(), this._invokeAll(function(u) {
      return u._markDefs && u._markDefs();
    }), Promise.all(this._invokeAll(function(u) {
      return u.beforeRoot && u.beforeRoot();
    })).then(function() {
      return Promise.all([s.getDependencies("scene"), s.getDependencies("animation"), s.getDependencies("camera")]);
    }).then(function(u) {
      const h = {
        scene: u[0][a.scene || 0],
        scenes: u[0],
        animations: u[1],
        cameras: u[2],
        asset: a.asset,
        parser: s,
        userData: {}
      };
      Gi(c, h, a), Ln(h, a), Promise.all(s._invokeAll(function(m) {
        return m.afterRoot && m.afterRoot(h);
      })).then(function() {
        i(h);
      });
    }).catch(r);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   */
  _markDefs() {
    const i = this.json.nodes || [], r = this.json.skins || [], s = this.json.meshes || [];
    for (let a = 0, c = r.length; a < c; a++) {
      const u = r[a].joints;
      for (let h = 0, m = u.length; h < m; h++)
        i[u[h]].isBone = true;
    }
    for (let a = 0, c = i.length; a < c; a++) {
      const u = i[a];
      u.mesh !== void 0 && (this._addNodeRef(this.meshCache, u.mesh), u.skin !== void 0 && (s[u.mesh].isSkinnedMesh = true)), u.camera !== void 0 && this._addNodeRef(this.cameraCache, u.camera);
    }
  }
  /**
   * Counts references to shared node / Object3D resources. These resources
   * can be reused, or "instantiated", at multiple nodes in the scene
   * hierarchy. Mesh, Camera, and Light instances are instantiated and must
   * be marked. Non-scenegraph resources (like Materials, Geometries, and
   * Textures) can be reused directly and are not marked here.
   *
   * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
   */
  _addNodeRef(i, r) {
    r !== void 0 && (i.refs[r] === void 0 && (i.refs[r] = i.uses[r] = 0), i.refs[r]++);
  }
  /** Returns a reference to a shared resource, cloning it if necessary. */
  _getNodeRef(i, r, s) {
    if (i.refs[r] <= 1)
      return s;
    const a = s.clone(), c = (u, h) => {
      const m = this.associations.get(u);
      m != null && this.associations.set(h, m);
      for (const [g, w] of u.children.entries())
        c(w, h.children[g]);
    };
    return c(s, a), a.name += "_instance_" + i.uses[r]++, a;
  }
  _invokeOne(i) {
    const r = Object.values(this.plugins);
    r.push(this);
    for (let s = 0; s < r.length; s++) {
      const a = i(r[s]);
      if (a)
        return a;
    }
    return null;
  }
  _invokeAll(i) {
    const r = Object.values(this.plugins);
    r.unshift(this);
    const s = [];
    for (let a = 0; a < r.length; a++) {
      const c = i(r[a]);
      c && s.push(c);
    }
    return s;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
   */
  getDependency(i, r) {
    const s = i + ":" + r;
    let a = this.cache.get(s);
    if (!a) {
      switch (i) {
        case "scene":
          a = this.loadScene(r);
          break;
        case "node":
          a = this.loadNode(r);
          break;
        case "mesh":
          a = this._invokeOne(function(c) {
            return c.loadMesh && c.loadMesh(r);
          });
          break;
        case "accessor":
          a = this.loadAccessor(r);
          break;
        case "bufferView":
          a = this._invokeOne(function(c) {
            return c.loadBufferView && c.loadBufferView(r);
          });
          break;
        case "buffer":
          a = this.loadBuffer(r);
          break;
        case "material":
          a = this._invokeOne(function(c) {
            return c.loadMaterial && c.loadMaterial(r);
          });
          break;
        case "texture":
          a = this._invokeOne(function(c) {
            return c.loadTexture && c.loadTexture(r);
          });
          break;
        case "skin":
          a = this.loadSkin(r);
          break;
        case "animation":
          a = this._invokeOne(function(c) {
            return c.loadAnimation && c.loadAnimation(r);
          });
          break;
        case "camera":
          a = this.loadCamera(r);
          break;
        default:
          throw new Error("Unknown type: " + i);
      }
      this.cache.add(s, a);
    }
    return a;
  }
  /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */
  getDependencies(i) {
    let r = this.cache.get(i);
    if (!r) {
      const s = this, a = this.json[i + (i === "mesh" ? "es" : "s")] || [];
      r = Promise.all(a.map(function(c, u) {
        return s.getDependency(i, u);
      })), this.cache.add(i, r);
    }
    return r;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(i) {
    const r = this.json.buffers[i], s = this.fileLoader;
    if (r.type && r.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + r.type + " buffer type is not supported.");
    if (r.uri === void 0 && i === 0)
      return Promise.resolve(this.extensions[ae.KHR_BINARY_GLTF].body);
    const a = this.options;
    return new Promise(function(c, u) {
      s.load(LoaderUtils.resolveURL(r.uri, a.path), c, void 0, function() {
        u(new Error('THREE.GLTFLoader: Failed to load buffer "' + r.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(i) {
    const r = this.json.bufferViews[i];
    return this.getDependency("buffer", r.buffer).then(function(s) {
      const a = r.byteLength || 0, c = r.byteOffset || 0;
      return s.slice(c, c + a);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(i) {
    const r = this, s = this.json, a = this.json.accessors[i];
    if (a.bufferView === void 0 && a.sparse === void 0)
      return Promise.resolve(null);
    const c = [];
    return a.bufferView !== void 0 ? c.push(this.getDependency("bufferView", a.bufferView)) : c.push(null), a.sparse !== void 0 && (c.push(this.getDependency("bufferView", a.sparse.indices.bufferView)), c.push(this.getDependency("bufferView", a.sparse.values.bufferView))), Promise.all(c).then(function(u) {
      const h = u[0], m = ha[a.type], g = Zi[a.componentType], w = g.BYTES_PER_ELEMENT, _ = w * m, y = a.byteOffset || 0, C = a.bufferView !== void 0 ? s.bufferViews[a.bufferView].byteStride : void 0, I = a.normalized === true;
      let S, R;
      if (C && C !== _) {
        const j = Math.floor(y / C), F = "InterleavedBuffer:" + a.bufferView + ":" + a.componentType + ":" + j + ":" + a.count;
        let V = r.cache.get(F);
        V || (S = new g(h, j * C, a.count * C / w), V = new InterleavedBuffer(S, C / w), r.cache.add(F, V)), R = new InterleavedBufferAttribute(V, m, y % C / w, I);
      } else
        h === null ? S = new g(a.count * m) : S = new g(h, y, a.count * m), R = new BufferAttribute(S, m, I);
      if (a.sparse !== void 0) {
        const j = ha.SCALAR, F = Zi[a.sparse.indices.componentType], V = a.sparse.indices.byteOffset || 0, D = a.sparse.values.byteOffset || 0, Y = new F(u[1], V, a.sparse.count * j), G = new g(u[2], D, a.sparse.count * m);
        h !== null && (R = new BufferAttribute(R.array.slice(), R.itemSize, R.normalized));
        for (let N = 0, O = Y.length; N < O; N++) {
          const H = Y[N];
          if (R.setX(H, G[N * m]), m >= 2 && R.setY(H, G[N * m + 1]), m >= 3 && R.setZ(H, G[N * m + 2]), m >= 4 && R.setW(H, G[N * m + 3]), m >= 5)
            throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
      }
      return R;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture>}
   */
  loadTexture(i) {
    const r = this.json, s = this.options, c = r.textures[i].source, u = r.images[c];
    let h = this.textureLoader;
    if (u.uri) {
      const m = s.manager.getHandler(u.uri);
      m !== null && (h = m);
    }
    return this.loadTextureImage(i, c, h);
  }
  loadTextureImage(i, r, s) {
    const a = this, c = this.json, u = c.textures[i], h = c.images[r], m = (h.uri || h.bufferView) + ":" + u.sampler;
    if (this.textureCache[m])
      return this.textureCache[m];
    const g = this.loadImageSource(r, s).then(function(w) {
      w.flipY = false, u.name && (w.name = u.name);
      const y = (c.samplers || {})[u.sampler] || {};
      return w.magFilter = pa[y.magFilter] || LinearFilter, w.minFilter = pa[y.minFilter] || LinearMipmapLinearFilter, w.wrapS = ua[y.wrapS] || RepeatWrapping, w.wrapT = ua[y.wrapT] || RepeatWrapping, a.associations.set(w, {
        textures: i
      }), w;
    }).catch(function() {
      return null;
    });
    return this.textureCache[m] = g, g;
  }
  loadImageSource(i, r) {
    const s = this, a = this.json, c = this.options;
    if (this.sourceCache[i] !== void 0)
      return this.sourceCache[i].then((_) => _.clone());
    const u = a.images[i], h = self.URL || self.webkitURL;
    let m = u.uri || "", g = false;
    if (u.bufferView !== void 0)
      m = s.getDependency("bufferView", u.bufferView).then(function(_) {
        g = true;
        const y = new Blob([_], {
          type: u.mimeType
        });
        return m = h.createObjectURL(y), m;
      });
    else if (u.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + i + " is missing URI and bufferView");
    const w = Promise.resolve(m).then(function(_) {
      return new Promise(function(y, C) {
        let I = y;
        r.isImageBitmapLoader === true && (I = function(S) {
          const R = new Texture(S);
          R.needsUpdate = true, y(R);
        }), r.load(LoaderUtils.resolveURL(_, c.path), I, void 0, C);
      });
    }).then(function(_) {
      return g === true && h.revokeObjectURL(m), _.userData.mimeType = u.mimeType || Iu(u.uri), _;
    }).catch(function(_) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", m), _;
    });
    return this.sourceCache[i] = w, w;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @return {Promise<Texture>}
   */
  assignTexture(i, r, s, a) {
    const c = this;
    return this.getDependency("texture", s.index).then(function(u) {
      if (s.texCoord !== void 0 && s.texCoord != 0 && !(r === "aoMap" && s.texCoord == 1) && console.warn("THREE.GLTFLoader: Custom UV set " + s.texCoord + " for texture " + r + " not yet supported."), c.extensions[ae.KHR_TEXTURE_TRANSFORM]) {
        const h = s.extensions !== void 0 ? s.extensions[ae.KHR_TEXTURE_TRANSFORM] : void 0;
        if (h) {
          const m = c.associations.get(u);
          u = c.extensions[ae.KHR_TEXTURE_TRANSFORM].extendTexture(u, h), c.associations.set(u, m);
        }
      }
      return a !== void 0 && (u.encoding = a), i[r] = u, u;
    });
  }
  /**
   * Assigns final material to a Mesh, Line, or Points instance. The instance
   * already has a material (generated from the glTF material options alone)
   * but reuse of the same glTF material may require multiple threejs materials
   * to accommodate different primitive types, defines, etc. New materials will
   * be created if necessary, and reused from a cache.
   * @param  {Object3D} mesh Mesh, Line, or Points instance.
   */
  assignFinalMaterial(i) {
    const r = i.geometry;
    let s = i.material;
    const a = r.attributes.tangent === void 0, c = r.attributes.color !== void 0, u = r.attributes.normal === void 0;
    if (i.isPoints) {
      const h = "PointsMaterial:" + s.uuid;
      let m = this.cache.get(h);
      m || (m = new PointsMaterial(), Material.prototype.copy.call(m, s), m.color.copy(s.color), m.map = s.map, m.sizeAttenuation = false, this.cache.add(h, m)), s = m;
    } else if (i.isLine) {
      const h = "LineBasicMaterial:" + s.uuid;
      let m = this.cache.get(h);
      m || (m = new LineBasicMaterial(), Material.prototype.copy.call(m, s), m.color.copy(s.color), this.cache.add(h, m)), s = m;
    }
    if (a || c || u) {
      let h = "ClonedMaterial:" + s.uuid + ":";
      s.isGLTFSpecularGlossinessMaterial && (h += "specular-glossiness:"), a && (h += "derivative-tangents:"), c && (h += "vertex-colors:"), u && (h += "flat-shading:");
      let m = this.cache.get(h);
      m || (m = s.clone(), c && (m.vertexColors = true), u && (m.flatShading = true), a && (m.normalScale && (m.normalScale.y *= -1), m.clearcoatNormalScale && (m.clearcoatNormalScale.y *= -1)), this.cache.add(h, m), this.associations.set(m, this.associations.get(s))), s = m;
    }
    s.aoMap && r.attributes.uv2 === void 0 && r.attributes.uv !== void 0 && r.setAttribute("uv2", r.attributes.uv), i.material = s;
  }
  getMaterialType() {
    return MeshStandardMaterial;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(i) {
    const r = this, s = this.json, a = this.extensions, c = s.materials[i];
    let u;
    const h = {}, m = c.extensions || {}, g = [];
    if (m[ae.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]) {
      const _ = a[ae.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];
      u = _.getMaterialType(), g.push(_.extendParams(h, c, r));
    } else if (m[ae.KHR_MATERIALS_UNLIT]) {
      const _ = a[ae.KHR_MATERIALS_UNLIT];
      u = _.getMaterialType(), g.push(_.extendParams(h, c, r));
    } else {
      const _ = c.pbrMetallicRoughness || {};
      if (h.color = new Color(1, 1, 1), h.opacity = 1, Array.isArray(_.baseColorFactor)) {
        const y = _.baseColorFactor;
        h.color.fromArray(y), h.opacity = y[3];
      }
      _.baseColorTexture !== void 0 && g.push(r.assignTexture(h, "map", _.baseColorTexture, sRGBEncoding)), h.metalness = _.metallicFactor !== void 0 ? _.metallicFactor : 1, h.roughness = _.roughnessFactor !== void 0 ? _.roughnessFactor : 1, _.metallicRoughnessTexture !== void 0 && (g.push(r.assignTexture(h, "metalnessMap", _.metallicRoughnessTexture)), g.push(r.assignTexture(h, "roughnessMap", _.metallicRoughnessTexture))), u = this._invokeOne(function(y) {
        return y.getMaterialType && y.getMaterialType(i);
      }), g.push(Promise.all(this._invokeAll(function(y) {
        return y.extendMaterialParams && y.extendMaterialParams(i, h);
      })));
    }
    c.doubleSided === true && (h.side = DoubleSide);
    const w = c.alphaMode || Wr.OPAQUE;
    if (w === Wr.BLEND ? (h.transparent = true, h.depthWrite = false) : (h.transparent = false, w === Wr.MASK && (h.alphaTest = c.alphaCutoff !== void 0 ? c.alphaCutoff : 0.5)), c.normalTexture !== void 0 && u !== MeshBasicMaterial && (g.push(r.assignTexture(h, "normalMap", c.normalTexture)), h.normalScale = new Vector2(1, 1), c.normalTexture.scale !== void 0)) {
      const _ = c.normalTexture.scale;
      h.normalScale.set(_, _);
    }
    return c.occlusionTexture !== void 0 && u !== MeshBasicMaterial && (g.push(r.assignTexture(h, "aoMap", c.occlusionTexture)), c.occlusionTexture.strength !== void 0 && (h.aoMapIntensity = c.occlusionTexture.strength)), c.emissiveFactor !== void 0 && u !== MeshBasicMaterial && (h.emissive = new Color().fromArray(c.emissiveFactor)), c.emissiveTexture !== void 0 && u !== MeshBasicMaterial && g.push(r.assignTexture(h, "emissiveMap", c.emissiveTexture, sRGBEncoding)), Promise.all(g).then(function() {
      let _;
      return u === po ? _ = a[ae.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(h) : _ = new u(h), c.name && (_.name = c.name), Ln(_, c), r.associations.set(_, {
        materials: i
      }), c.extensions && Gi(a, _, c), _;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(i) {
    const r = PropertyBinding.sanitizeNodeName(i || "");
    let s = r;
    for (let a = 1; this.nodeNamesUsed[s]; ++a)
      s = r + "_" + a;
    return this.nodeNamesUsed[s] = true, s;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */
  loadGeometries(i) {
    const r = this, s = this.extensions, a = this.primitiveCache;
    function c(h) {
      return s[ae.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(h, r).then(function(m) {
        return ma(m, h, r);
      });
    }
    const u = [];
    for (let h = 0, m = i.length; h < m; h++) {
      const g = i[h], w = Ru(g), _ = a[w];
      if (_)
        u.push(_.promise);
      else {
        let y;
        g.extensions && g.extensions[ae.KHR_DRACO_MESH_COMPRESSION] ? y = c(g) : y = ma(new BufferGeometry(), g, r), a[w] = {
          primitive: g,
          promise: y
        }, u.push(y);
      }
    }
    return Promise.all(u);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */
  loadMesh(i) {
    const r = this, s = this.json, a = this.extensions, c = s.meshes[i], u = c.primitives, h = [];
    for (let m = 0, g = u.length; m < g; m++) {
      const w = u[m].material === void 0 ? Su(this.cache) : this.getDependency("material", u[m].material);
      h.push(w);
    }
    return h.push(r.loadGeometries(u)), Promise.all(h).then(function(m) {
      const g = m.slice(0, m.length - 1), w = m[m.length - 1], _ = [];
      for (let C = 0, I = w.length; C < I; C++) {
        const S = w[C], R = u[C];
        let j;
        const F = g[C];
        if (R.mode === Bt.TRIANGLES || R.mode === Bt.TRIANGLE_STRIP || R.mode === Bt.TRIANGLE_FAN || R.mode === void 0)
          j = c.isSkinnedMesh === true ? new SkinnedMesh(S, F) : new Mesh(S, F), j.isSkinnedMesh === true && !j.geometry.attributes.skinWeight.normalized && j.normalizeSkinWeights(), R.mode === Bt.TRIANGLE_STRIP ? j.geometry = fa(j.geometry, TriangleStripDrawMode) : R.mode === Bt.TRIANGLE_FAN && (j.geometry = fa(j.geometry, TriangleFanDrawMode));
        else if (R.mode === Bt.LINES)
          j = new LineSegments(S, F);
        else if (R.mode === Bt.LINE_STRIP)
          j = new Line(S, F);
        else if (R.mode === Bt.LINE_LOOP)
          j = new LineLoop(S, F);
        else if (R.mode === Bt.POINTS)
          j = new Points(S, F);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + R.mode);
        Object.keys(j.geometry.morphAttributes).length > 0 && Lu(j, c), j.name = r.createUniqueName(c.name || "mesh_" + i), Ln(j, c), R.extensions && Gi(a, j, R), r.assignFinalMaterial(j), _.push(j);
      }
      for (let C = 0, I = _.length; C < I; C++)
        r.associations.set(_[C], {
          meshes: i,
          primitives: C
        });
      if (_.length === 1)
        return _[0];
      const y = new Group();
      r.associations.set(y, {
        meshes: i
      });
      for (let C = 0, I = _.length; C < I; C++)
        y.add(_[C]);
      return y;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */
  loadCamera(i) {
    let r;
    const s = this.json.cameras[i], a = s[s.type];
    if (!a) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return s.type === "perspective" ? r = new PerspectiveCamera(MathUtils.radToDeg(a.yfov), a.aspectRatio || 1, a.znear || 1, a.zfar || 2e6) : s.type === "orthographic" && (r = new OrthographicCamera(-a.xmag, a.xmag, a.ymag, -a.ymag, a.znear, a.zfar)), s.name && (r.name = this.createUniqueName(s.name)), Ln(r, s), Promise.resolve(r);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Object>}
   */
  loadSkin(i) {
    const r = this.json.skins[i], s = {
      joints: r.joints
    };
    return r.inverseBindMatrices === void 0 ? Promise.resolve(s) : this.getDependency("accessor", r.inverseBindMatrices).then(function(a) {
      return s.inverseBindMatrices = a, s;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(i) {
    const s = this.json.animations[i], a = [], c = [], u = [], h = [], m = [];
    for (let g = 0, w = s.channels.length; g < w; g++) {
      const _ = s.channels[g], y = s.samplers[_.sampler], C = _.target, I = C.node, S = s.parameters !== void 0 ? s.parameters[y.input] : y.input, R = s.parameters !== void 0 ? s.parameters[y.output] : y.output;
      a.push(this.getDependency("node", I)), c.push(this.getDependency("accessor", S)), u.push(this.getDependency("accessor", R)), h.push(y), m.push(C);
    }
    return Promise.all([Promise.all(a), Promise.all(c), Promise.all(u), Promise.all(h), Promise.all(m)]).then(function(g) {
      const w = g[0], _ = g[1], y = g[2], C = g[3], I = g[4], S = [];
      for (let j = 0, F = w.length; j < F; j++) {
        const V = w[j], D = _[j], Y = y[j], G = C[j], N = I[j];
        if (V === void 0)
          continue;
        V.updateMatrix();
        let O;
        switch (nn[N.path]) {
          case nn.weights:
            O = NumberKeyframeTrack;
            break;
          case nn.rotation:
            O = QuaternionKeyframeTrack;
            break;
          case nn.position:
          case nn.scale:
          default:
            O = VectorKeyframeTrack;
            break;
        }
        const H = V.name ? V.name : V.uuid, K = G.interpolation !== void 0 ? Mu[G.interpolation] : InterpolateLinear, q = [];
        nn[N.path] === nn.weights ? V.traverse(function(_e) {
          _e.morphTargetInfluences && q.push(_e.name ? _e.name : _e.uuid);
        }) : q.push(H);
        let he = Y.array;
        if (Y.normalized) {
          const _e = ho(he.constructor), pe = new Float32Array(he.length);
          for (let fe = 0, de = he.length; fe < de; fe++)
            pe[fe] = he[fe] * _e;
          he = pe;
        }
        for (let _e = 0, pe = q.length; _e < pe; _e++) {
          const fe = new O(q[_e] + "." + nn[N.path], D.array, he, K);
          G.interpolation === "CUBICSPLINE" && (fe.createInterpolant = function(te) {
            const X = this instanceof QuaternionKeyframeTrack ? ku : Ya;
            return new X(this.times, this.values, this.getValueSize() / 3, te);
          }, fe.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true), S.push(fe);
        }
      }
      const R = s.name ? s.name : "animation_" + i;
      return new AnimationClip(R, void 0, S);
    });
  }
  createNodeMesh(i) {
    const r = this.json, s = this, a = r.nodes[i];
    return a.mesh === void 0 ? null : s.getDependency("mesh", a.mesh).then(function(c) {
      const u = s._getNodeRef(s.meshCache, a.mesh, c);
      return a.weights !== void 0 && u.traverse(function(h) {
        if (h.isMesh)
          for (let m = 0, g = a.weights.length; m < g; m++)
            h.morphTargetInfluences[m] = a.weights[m];
      }), u;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(i) {
    const r = this.json, s = this.extensions, a = this, c = r.nodes[i], u = c.name ? a.createUniqueName(c.name) : "";
    return function() {
      const h = [], m = a._invokeOne(function(g) {
        return g.createNodeMesh && g.createNodeMesh(i);
      });
      return m && h.push(m), c.camera !== void 0 && h.push(a.getDependency("camera", c.camera).then(function(g) {
        return a._getNodeRef(a.cameraCache, c.camera, g);
      })), a._invokeAll(function(g) {
        return g.createNodeAttachment && g.createNodeAttachment(i);
      }).forEach(function(g) {
        h.push(g);
      }), Promise.all(h);
    }().then(function(h) {
      let m;
      if (c.isBone === true ? m = new Bone() : h.length > 1 ? m = new Group() : h.length === 1 ? m = h[0] : m = new Object3D(), m !== h[0])
        for (let g = 0, w = h.length; g < w; g++)
          m.add(h[g]);
      if (c.name && (m.userData.name = c.name, m.name = u), Ln(m, c), c.extensions && Gi(s, m, c), c.matrix !== void 0) {
        const g = new Matrix4();
        g.fromArray(c.matrix), m.applyMatrix4(g);
      } else
        c.translation !== void 0 && m.position.fromArray(c.translation), c.rotation !== void 0 && m.quaternion.fromArray(c.rotation), c.scale !== void 0 && m.scale.fromArray(c.scale);
      return a.associations.has(m) || a.associations.set(m, {}), a.associations.get(m).nodes = i, m;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(i) {
    const r = this.json, s = this.extensions, a = this.json.scenes[i], c = this, u = new Group();
    a.name && (u.name = c.createUniqueName(a.name)), Ln(u, a), a.extensions && Gi(s, u, a);
    const h = a.nodes || [], m = [];
    for (let g = 0, w = h.length; g < w; g++)
      m.push(qa(h[g], u, r, c));
    return Promise.all(m).then(function() {
      const g = (w) => {
        const _ = /* @__PURE__ */ new Map();
        for (const [y, C] of c.associations)
          (y instanceof Material || y instanceof Texture) && _.set(y, C);
        return w.traverse((y) => {
          const C = c.associations.get(y);
          C != null && _.set(y, C);
        }), _;
      };
      return c.associations = g(u), u;
    });
  }
};
function qa(b, i, r, s) {
  const a = r.nodes[b];
  return s.getDependency("node", b).then(function(c) {
    if (a.skin === void 0)
      return c;
    let u;
    return s.getDependency("skin", a.skin).then(function(h) {
      u = h;
      const m = [];
      for (let g = 0, w = u.joints.length; g < w; g++)
        m.push(s.getDependency("node", u.joints[g]));
      return Promise.all(m);
    }).then(function(h) {
      return c.traverse(function(m) {
        if (!m.isMesh)
          return;
        const g = [], w = [];
        for (let _ = 0, y = h.length; _ < y; _++) {
          const C = h[_];
          if (C) {
            g.push(C);
            const I = new Matrix4();
            u.inverseBindMatrices !== void 0 && I.fromArray(u.inverseBindMatrices.array, _ * 16), w.push(I);
          } else
            console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', u.joints[_]);
        }
        m.bind(new Skeleton(g, w), m.matrixWorld);
      }), c;
    });
  }).then(function(c) {
    i.add(c);
    const u = [];
    if (a.children) {
      const h = a.children;
      for (let m = 0, g = h.length; m < g; m++) {
        const w = h[m];
        u.push(qa(w, c, r, s));
      }
    }
    return Promise.all(u);
  });
}
function Du(b, i, r) {
  const s = i.attributes, a = new Box3();
  if (s.POSITION !== void 0) {
    const h = r.json.accessors[s.POSITION], m = h.min, g = h.max;
    if (m !== void 0 && g !== void 0) {
      if (a.set(new Vector3(m[0], m[1], m[2]), new Vector3(g[0], g[1], g[2])), h.normalized) {
        const w = ho(Zi[h.componentType]);
        a.min.multiplyScalar(w), a.max.multiplyScalar(w);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const c = i.targets;
  if (c !== void 0) {
    const h = new Vector3(), m = new Vector3();
    for (let g = 0, w = c.length; g < w; g++) {
      const _ = c[g];
      if (_.POSITION !== void 0) {
        const y = r.json.accessors[_.POSITION], C = y.min, I = y.max;
        if (C !== void 0 && I !== void 0) {
          if (m.setX(Math.max(Math.abs(C[0]), Math.abs(I[0]))), m.setY(Math.max(Math.abs(C[1]), Math.abs(I[1]))), m.setZ(Math.max(Math.abs(C[2]), Math.abs(I[2]))), y.normalized) {
            const S = ho(Zi[y.componentType]);
            m.multiplyScalar(S);
          }
          h.max(m);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    a.expandByVector(h);
  }
  b.boundingBox = a;
  const u = new Sphere();
  a.getCenter(u.center), u.radius = a.min.distanceTo(a.max) / 2, b.boundingSphere = u;
}
function ma(b, i, r) {
  const s = i.attributes, a = [];
  function c(u, h) {
    return r.getDependency("accessor", u).then(function(m) {
      b.setAttribute(h, m);
    });
  }
  for (const u in s) {
    const h = uo[u] || u.toLowerCase();
    h in b.attributes || a.push(c(s[u], h));
  }
  if (i.indices !== void 0 && !b.index) {
    const u = r.getDependency("accessor", i.indices).then(function(h) {
      b.setIndex(h);
    });
    a.push(u);
  }
  return Ln(b, i), Du(b, i, r), Promise.all(a).then(function() {
    return i.targets !== void 0 ? Au(b, i.targets, r) : b;
  });
}
function fa(b, i) {
  let r = b.getIndex();
  if (r === null) {
    const u = [], h = b.getAttribute("position");
    if (h !== void 0) {
      for (let m = 0; m < h.count; m++)
        u.push(m);
      b.setIndex(u), r = b.getIndex();
    } else
      return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), b;
  }
  const s = r.count - 2, a = [];
  if (i === TriangleFanDrawMode)
    for (let u = 1; u <= s; u++)
      a.push(r.getX(0)), a.push(r.getX(u)), a.push(r.getX(u + 1));
  else
    for (let u = 0; u < s; u++)
      u % 2 === 0 ? (a.push(r.getX(u)), a.push(r.getX(u + 1)), a.push(r.getX(u + 2))) : (a.push(r.getX(u + 2)), a.push(r.getX(u + 1)), a.push(r.getX(u)));
  a.length / 3 !== s && console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
  const c = b.clone();
  return c.setIndex(a), c;
}
var Ou = class extends ExtrudeGeometry {
  constructor(i, r = {}) {
    const {
      bevelEnabled: s = false,
      bevelSize: a = 8,
      bevelThickness: c = 10,
      font: u,
      height: h = 50,
      size: m = 100,
      lineHeight: g = 1,
      letterSpacing: w = 0,
      ..._
    } = r;
    if (u === void 0)
      super();
    else {
      const y = u.generateShapes(i, m, {
        lineHeight: g,
        letterSpacing: w
      });
      super(y, {
        ..._,
        bevelEnabled: s,
        bevelSize: a,
        bevelThickness: c,
        depth: h
      });
    }
    this.type = "TextGeometry";
  }
};
function Qa(b, i, r) {
  const s = r.length - b - 1;
  if (i >= r[s])
    return s - 1;
  if (i <= r[b])
    return b;
  let a = b, c = s, u = Math.floor((a + c) / 2);
  for (; i < r[u] || i >= r[u + 1]; )
    i < r[u] ? c = u : a = u, u = Math.floor((a + c) / 2);
  return u;
}
function Nu(b, i, r, s) {
  const a = [], c = [], u = [];
  a[0] = 1;
  for (let h = 1; h <= r; ++h) {
    c[h] = i - s[b + 1 - h], u[h] = s[b + h] - i;
    let m = 0;
    for (let g = 0; g < h; ++g) {
      const w = u[g + 1], _ = c[h - g], y = a[g] / (w + _);
      a[g] = m + w * y, m = _ * y;
    }
    a[h] = m;
  }
  return a;
}
function Fu(b, i, r, s) {
  const a = Qa(b, s, i), c = Nu(a, s, b, i), u = new Vector4(0, 0, 0, 0);
  for (let h = 0; h <= b; ++h) {
    const m = r[a - b + h], g = c[h], w = m.w * g;
    u.x += m.x * w, u.y += m.y * w, u.z += m.z * w, u.w += m.w * g;
  }
  return u;
}
function Bu(b, i, r, s, a) {
  const c = [];
  for (let y = 0; y <= r; ++y)
    c[y] = 0;
  const u = [];
  for (let y = 0; y <= s; ++y)
    u[y] = c.slice(0);
  const h = [];
  for (let y = 0; y <= r; ++y)
    h[y] = c.slice(0);
  h[0][0] = 1;
  const m = c.slice(0), g = c.slice(0);
  for (let y = 1; y <= r; ++y) {
    m[y] = i - a[b + 1 - y], g[y] = a[b + y] - i;
    let C = 0;
    for (let I = 0; I < y; ++I) {
      const S = g[I + 1], R = m[y - I];
      h[y][I] = S + R;
      const j = h[I][y - 1] / h[y][I];
      h[I][y] = C + S * j, C = R * j;
    }
    h[y][y] = C;
  }
  for (let y = 0; y <= r; ++y)
    u[0][y] = h[y][r];
  for (let y = 0; y <= r; ++y) {
    let C = 0, I = 1;
    const S = [];
    for (let R = 0; R <= r; ++R)
      S[R] = c.slice(0);
    S[0][0] = 1;
    for (let R = 1; R <= s; ++R) {
      let j = 0;
      const F = y - R, V = r - R;
      y >= R && (S[I][0] = S[C][0] / h[V + 1][F], j = S[I][0] * h[F][V]);
      const D = F >= -1 ? 1 : -F, Y = y - 1 <= V ? R - 1 : r - y;
      for (let G = D; G <= Y; ++G)
        S[I][G] = (S[C][G] - S[C][G - 1]) / h[V + 1][F + G], j += S[I][G] * h[F + G][V];
      y <= V && (S[I][R] = -S[C][R - 1] / h[V + 1][y], j += S[I][R] * h[y][V]), u[R][y] = j;
      var w = C;
      C = I, I = w;
    }
  }
  var _ = r;
  for (let y = 1; y <= s; ++y) {
    for (let C = 0; C <= r; ++C)
      u[y][C] *= _;
    _ *= r - y;
  }
  return u;
}
function ju(b, i, r, s, a) {
  const c = a < b ? a : b, u = [], h = Qa(b, s, i), m = Bu(h, s, b, c, i), g = [];
  for (let _ = 0; _ < r.length; ++_) {
    var w = r[_].clone();
    const y = w.w;
    w.x *= y, w.y *= y, w.z *= y, g[_] = w;
  }
  for (let _ = 0; _ <= c; ++_) {
    var w = g[h - b].clone().multiplyScalar(m[_][0]);
    for (let C = 1; C <= b; ++C)
      w.add(g[h - b + C].clone().multiplyScalar(m[_][C]));
    u[_] = w;
  }
  for (let _ = c + 1; _ <= a + 1; ++_)
    u[_] = new Vector4(0, 0, 0);
  return u;
}
function zu(b, i) {
  let r = 1;
  for (let a = 2; a <= b; ++a)
    r *= a;
  let s = 1;
  for (let a = 2; a <= i; ++a)
    s *= a;
  for (let a = 2; a <= b - i; ++a)
    s *= a;
  return r / s;
}
function Uu(b) {
  const i = b.length, r = [], s = [];
  for (let c = 0; c < i; ++c) {
    const u = b[c];
    r[c] = new Vector3(u.x, u.y, u.z), s[c] = u.w;
  }
  const a = [];
  for (let c = 0; c < i; ++c) {
    const u = r[c].clone();
    for (let h = 1; h <= c; ++h)
      u.sub(a[c - h].clone().multiplyScalar(zu(c, h) * s[h]));
    a[c] = u.divideScalar(s[0]);
  }
  return a;
}
function Gu(b, i, r, s, a) {
  const c = ju(b, i, r, s, a);
  return Uu(c);
}
var va = class extends Curve {
  constructor(i, r, s, a, c) {
    super(), this.degree = i, this.knots = r, this.controlPoints = [], this.startKnot = a || 0, this.endKnot = c || this.knots.length - 1;
    for (let u = 0; u < s.length; ++u) {
      const h = s[u];
      this.controlPoints[u] = new Vector4(h.x, h.y, h.z, h.w);
    }
  }
  getPoint(i, r) {
    const s = r || new Vector3(), a = this.knots[this.startKnot] + i * (this.knots[this.endKnot] - this.knots[this.startKnot]), c = Fu(this.degree, this.knots, this.controlPoints, a);
    return c.w != 1 && c.divideScalar(c.w), s.set(c.x, c.y, c.z);
  }
  getTangent(i, r) {
    const s = r || new Vector3(), a = this.knots[0] + i * (this.knots[this.knots.length - 1] - this.knots[0]), c = Gu(this.degree, this.knots, this.controlPoints, a, 1);
    return s.copy(c[1]).normalize(), s;
  }
};
var oe;
var Re;
var We;
var Hu = class extends Loader {
  constructor(i) {
    super(i);
  }
  load(i, r, s, a) {
    const c = this, u = c.path === "" ? LoaderUtils.extractUrlBase(i) : c.path, h = new FileLoader(this.manager);
    h.setPath(c.path), h.setResponseType("arraybuffer"), h.setRequestHeader(c.requestHeader), h.setWithCredentials(c.withCredentials), h.load(i, function(m) {
      try {
        r(c.parse(m, u));
      } catch (g) {
        a ? a(g) : console.error(g), c.manager.itemError(i);
      }
    }, s, a);
  }
  parse(i, r) {
    if (Qu(i))
      oe = new qu().parse(i);
    else {
      const a = el(i);
      if (!Zu(a))
        throw new Error("THREE.FBXLoader: Unknown format.");
      if (ga(a) < 7e3)
        throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + ga(a));
      oe = new Yu().parse(a);
    }
    const s = new TextureLoader(this.manager).setPath(this.resourcePath || r).setCrossOrigin(this.crossOrigin);
    return new Ku(s, this.manager).parse(oe);
  }
};
var Ku = class {
  constructor(i, r) {
    this.textureLoader = i, this.manager = r;
  }
  parse() {
    Re = this.parseConnections();
    const i = this.parseImages(), r = this.parseTextures(i), s = this.parseMaterials(r), a = this.parseDeformers(), c = new $u().parse(a);
    return this.parseScene(a, c, s), We;
  }
  // Parses FBXTree.Connections which holds parent-child connections between objects (e.g. material -> texture, model->geometry )
  // and details the connection type
  parseConnections() {
    const i = /* @__PURE__ */ new Map();
    return "Connections" in oe && oe.Connections.connections.forEach(function(s) {
      const a = s[0], c = s[1], u = s[2];
      i.has(a) || i.set(a, {
        parents: [],
        children: []
      });
      const h = {
        ID: c,
        relationship: u
      };
      i.get(a).parents.push(h), i.has(c) || i.set(c, {
        parents: [],
        children: []
      });
      const m = {
        ID: a,
        relationship: u
      };
      i.get(c).children.push(m);
    }), i;
  }
  // Parse FBXTree.Objects.Video for embedded image data
  // These images are connected to textures in FBXTree.Objects.Textures
  // via FBXTree.Connections.
  parseImages() {
    const i = {}, r = {};
    if ("Video" in oe.Objects) {
      const s = oe.Objects.Video;
      for (const a in s) {
        const c = s[a], u = parseInt(a);
        if (i[u] = c.RelativeFilename || c.Filename, "Content" in c) {
          const h = c.Content instanceof ArrayBuffer && c.Content.byteLength > 0, m = typeof c.Content == "string" && c.Content !== "";
          if (h || m) {
            const g = this.parseImage(s[a]);
            r[c.RelativeFilename || c.Filename] = g;
          }
        }
      }
    }
    for (const s in i) {
      const a = i[s];
      r[a] !== void 0 ? i[s] = r[a] : i[s] = i[s].split("\\").pop();
    }
    return i;
  }
  // Parse embedded image data in FBXTree.Video.Content
  parseImage(i) {
    const r = i.Content, s = i.RelativeFilename || i.Filename, a = s.slice(s.lastIndexOf(".") + 1).toLowerCase();
    let c;
    switch (a) {
      case "bmp":
        c = "image/bmp";
        break;
      case "jpg":
      case "jpeg":
        c = "image/jpeg";
        break;
      case "png":
        c = "image/png";
        break;
      case "tif":
        c = "image/tiff";
        break;
      case "tga":
        this.manager.getHandler(".tga") === null && console.warn("FBXLoader: TGA loader not found, skipping ", s), c = "image/tga";
        break;
      default:
        console.warn('FBXLoader: Image type "' + a + '" is not supported.');
        return;
    }
    if (typeof r == "string")
      return "data:" + c + ";base64," + r;
    {
      const u = new Uint8Array(r);
      return window.URL.createObjectURL(new Blob([u], {
        type: c
      }));
    }
  }
  // Parse nodes in FBXTree.Objects.Texture
  // These contain details such as UV scaling, cropping, rotation etc and are connected
  // to images in FBXTree.Objects.Video
  parseTextures(i) {
    const r = /* @__PURE__ */ new Map();
    if ("Texture" in oe.Objects) {
      const s = oe.Objects.Texture;
      for (const a in s) {
        const c = this.parseTexture(s[a], i);
        r.set(parseInt(a), c);
      }
    }
    return r;
  }
  // Parse individual node in FBXTree.Objects.Texture
  parseTexture(i, r) {
    const s = this.loadTexture(i, r);
    s.ID = i.id, s.name = i.attrName;
    const a = i.WrapModeU, c = i.WrapModeV, u = a !== void 0 ? a.value : 0, h = c !== void 0 ? c.value : 0;
    if (s.wrapS = u === 0 ? RepeatWrapping : ClampToEdgeWrapping, s.wrapT = h === 0 ? RepeatWrapping : ClampToEdgeWrapping, "Scaling" in i) {
      const m = i.Scaling.value;
      s.repeat.x = m[0], s.repeat.y = m[1];
    }
    return s;
  }
  // load a texture specified as a blob or data URI, or via an external URL using TextureLoader
  loadTexture(i, r) {
    let s;
    const a = this.textureLoader.path, c = Re.get(i.id).children;
    c !== void 0 && c.length > 0 && r[c[0].ID] !== void 0 && (s = r[c[0].ID], (s.indexOf("blob:") === 0 || s.indexOf("data:") === 0) && this.textureLoader.setPath(void 0));
    let u;
    const h = i.FileName.slice(-3).toLowerCase();
    if (h === "tga") {
      const m = this.manager.getHandler(".tga");
      m === null ? (console.warn("FBXLoader: TGA loader not found, creating placeholder texture for", i.RelativeFilename), u = new Texture()) : (m.setPath(this.textureLoader.path), u = m.load(s));
    } else
      h === "psd" ? (console.warn("FBXLoader: PSD textures are not supported, creating placeholder texture for", i.RelativeFilename), u = new Texture()) : u = this.textureLoader.load(s);
    return this.textureLoader.setPath(a), u;
  }
  // Parse nodes in FBXTree.Objects.Material
  parseMaterials(i) {
    const r = /* @__PURE__ */ new Map();
    if ("Material" in oe.Objects) {
      const s = oe.Objects.Material;
      for (const a in s) {
        const c = this.parseMaterial(s[a], i);
        c !== null && r.set(parseInt(a), c);
      }
    }
    return r;
  }
  // Parse single node in FBXTree.Objects.Material
  // Materials are connected to texture maps in FBXTree.Objects.Textures
  // FBX format currently only supports Lambert and Phong shading models
  parseMaterial(i, r) {
    const s = i.id, a = i.attrName;
    let c = i.ShadingModel;
    if (typeof c == "object" && (c = c.value), !Re.has(s))
      return null;
    const u = this.parseParameters(i, r, s);
    let h;
    switch (c.toLowerCase()) {
      case "phong":
        h = new MeshPhongMaterial();
        break;
      case "lambert":
        h = new MeshLambertMaterial();
        break;
      default:
        console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.', c), h = new MeshPhongMaterial();
        break;
    }
    return h.setValues(u), h.name = a, h;
  }
  // Parse FBX material and return parameters suitable for a three.js material
  // Also parse the texture map and return any textures associated with the material
  parseParameters(i, r, s) {
    const a = {};
    i.BumpFactor && (a.bumpScale = i.BumpFactor.value), i.Diffuse ? a.color = new Color().fromArray(i.Diffuse.value) : i.DiffuseColor && (i.DiffuseColor.type === "Color" || i.DiffuseColor.type === "ColorRGB") && (a.color = new Color().fromArray(i.DiffuseColor.value)), i.DisplacementFactor && (a.displacementScale = i.DisplacementFactor.value), i.Emissive ? a.emissive = new Color().fromArray(i.Emissive.value) : i.EmissiveColor && (i.EmissiveColor.type === "Color" || i.EmissiveColor.type === "ColorRGB") && (a.emissive = new Color().fromArray(i.EmissiveColor.value)), i.EmissiveFactor && (a.emissiveIntensity = parseFloat(i.EmissiveFactor.value)), i.Opacity && (a.opacity = parseFloat(i.Opacity.value)), a.opacity < 1 && (a.transparent = true), i.ReflectionFactor && (a.reflectivity = i.ReflectionFactor.value), i.Shininess && (a.shininess = i.Shininess.value), i.Specular ? a.specular = new Color().fromArray(i.Specular.value) : i.SpecularColor && i.SpecularColor.type === "Color" && (a.specular = new Color().fromArray(i.SpecularColor.value));
    const c = this;
    return Re.get(s).children.forEach(function(u) {
      const h = u.relationship;
      switch (h) {
        case "Bump":
          a.bumpMap = c.getTexture(r, u.ID);
          break;
        case "Maya|TEX_ao_map":
          a.aoMap = c.getTexture(r, u.ID);
          break;
        case "DiffuseColor":
        case "Maya|TEX_color_map":
          a.map = c.getTexture(r, u.ID), a.map !== void 0 && (a.map.encoding = sRGBEncoding);
          break;
        case "DisplacementColor":
          a.displacementMap = c.getTexture(r, u.ID);
          break;
        case "EmissiveColor":
          a.emissiveMap = c.getTexture(r, u.ID), a.emissiveMap !== void 0 && (a.emissiveMap.encoding = sRGBEncoding);
          break;
        case "NormalMap":
        case "Maya|TEX_normal_map":
          a.normalMap = c.getTexture(r, u.ID);
          break;
        case "ReflectionColor":
          a.envMap = c.getTexture(r, u.ID), a.envMap !== void 0 && (a.envMap.mapping = EquirectangularReflectionMapping, a.envMap.encoding = sRGBEncoding);
          break;
        case "SpecularColor":
          a.specularMap = c.getTexture(r, u.ID), a.specularMap !== void 0 && (a.specularMap.encoding = sRGBEncoding);
          break;
        case "TransparentColor":
        case "TransparencyFactor":
          a.alphaMap = c.getTexture(r, u.ID), a.transparent = true;
          break;
        case "AmbientColor":
        case "ShininessExponent":
        case "SpecularFactor":
        case "VectorDisplacementColor":
        default:
          console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.", h);
          break;
      }
    }), a;
  }
  // get a texture from the textureMap for use by a material.
  getTexture(i, r) {
    return "LayeredTexture" in oe.Objects && r in oe.Objects.LayeredTexture && (console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."), r = Re.get(r).children[0].ID), i.get(r);
  }
  // Parse nodes in FBXTree.Objects.Deformer
  // Deformer node can contain skinning or Vertex Cache animation data, however only skinning is supported here
  // Generates map of Skeleton-like objects for use later when generating and binding skeletons.
  parseDeformers() {
    const i = {}, r = {};
    if ("Deformer" in oe.Objects) {
      const s = oe.Objects.Deformer;
      for (const a in s) {
        const c = s[a], u = Re.get(parseInt(a));
        if (c.attrType === "Skin") {
          const h = this.parseSkeleton(u, s);
          h.ID = a, u.parents.length > 1 && console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."), h.geometryID = u.parents[0].ID, i[a] = h;
        } else if (c.attrType === "BlendShape") {
          const h = {
            id: a
          };
          h.rawTargets = this.parseMorphTargets(u, s), h.id = a, u.parents.length > 1 && console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."), r[a] = h;
        }
      }
    }
    return {
      skeletons: i,
      morphTargets: r
    };
  }
  // Parse single nodes in FBXTree.Objects.Deformer
  // The top level skeleton node has type 'Skin' and sub nodes have type 'Cluster'
  // Each skin node represents a skeleton and each cluster node represents a bone
  parseSkeleton(i, r) {
    const s = [];
    return i.children.forEach(function(a) {
      const c = r[a.ID];
      if (c.attrType !== "Cluster")
        return;
      const u = {
        ID: a.ID,
        indices: [],
        weights: [],
        transformLink: new Matrix4().fromArray(c.TransformLink.a)
        // transform: new Matrix4().fromArray( boneNode.Transform.a ),
        // linkMode: boneNode.Mode,
      };
      "Indexes" in c && (u.indices = c.Indexes.a, u.weights = c.Weights.a), s.push(u);
    }), {
      rawBones: s,
      bones: []
    };
  }
  // The top level morph deformer node has type "BlendShape" and sub nodes have type "BlendShapeChannel"
  parseMorphTargets(i, r) {
    const s = [];
    for (let a = 0; a < i.children.length; a++) {
      const c = i.children[a], u = r[c.ID], h = {
        name: u.attrName,
        initialWeight: u.DeformPercent,
        id: u.id,
        fullWeights: u.FullWeights.a
      };
      if (u.attrType !== "BlendShapeChannel")
        return;
      h.geoID = Re.get(parseInt(c.ID)).children.filter(function(m) {
        return m.relationship === void 0;
      })[0].ID, s.push(h);
    }
    return s;
  }
  // create the main Group() to be returned by the loader
  parseScene(i, r, s) {
    We = new Group();
    const a = this.parseModels(i.skeletons, r, s), c = oe.Objects.Model, u = this;
    a.forEach(function(m) {
      const g = c[m.ID];
      u.setLookAtProperties(m, g), Re.get(m.ID).parents.forEach(function(_) {
        const y = a.get(_.ID);
        y !== void 0 && y.add(m);
      }), m.parent === null && We.add(m);
    }), this.bindSkeleton(i.skeletons, r, a), this.createAmbientLight(), We.traverse(function(m) {
      if (m.userData.transformData) {
        m.parent && (m.userData.transformData.parentMatrix = m.parent.matrix, m.userData.transformData.parentMatrixWorld = m.parent.matrixWorld);
        const g = Wa(m.userData.transformData);
        m.applyMatrix4(g), m.updateWorldMatrix();
      }
    });
    const h = new Xu().parse();
    We.children.length === 1 && We.children[0].isGroup && (We.children[0].animations = h, We = We.children[0]), We.animations = h;
  }
  // parse nodes in FBXTree.Objects.Model
  parseModels(i, r, s) {
    const a = /* @__PURE__ */ new Map(), c = oe.Objects.Model;
    for (const u in c) {
      const h = parseInt(u), m = c[u], g = Re.get(h);
      let w = this.buildSkeleton(g, i, h, m.attrName);
      if (!w) {
        switch (m.attrType) {
          case "Camera":
            w = this.createCamera(g);
            break;
          case "Light":
            w = this.createLight(g);
            break;
          case "Mesh":
            w = this.createMesh(g, r, s);
            break;
          case "NurbsCurve":
            w = this.createCurve(g, r);
            break;
          case "LimbNode":
          case "Root":
            w = new Bone();
            break;
          case "Null":
          default:
            w = new Group();
            break;
        }
        w.name = m.attrName ? PropertyBinding.sanitizeNodeName(m.attrName) : "", w.ID = h;
      }
      this.getTransformData(w, m), a.set(h, w);
    }
    return a;
  }
  buildSkeleton(i, r, s, a) {
    let c = null;
    return i.parents.forEach(function(u) {
      for (const h in r) {
        const m = r[h];
        m.rawBones.forEach(function(g, w) {
          if (g.ID === u.ID) {
            const _ = c;
            c = new Bone(), c.matrixWorld.copy(g.transformLink), c.name = a ? PropertyBinding.sanitizeNodeName(a) : "", c.ID = s, m.bones[w] = c, _ !== null && c.add(_);
          }
        });
      }
    }), c;
  }
  // create a PerspectiveCamera or OrthographicCamera
  createCamera(i) {
    let r, s;
    if (i.children.forEach(function(a) {
      const c = oe.Objects.NodeAttribute[a.ID];
      c !== void 0 && (s = c);
    }), s === void 0)
      r = new Object3D();
    else {
      let a = 0;
      s.CameraProjectionType !== void 0 && s.CameraProjectionType.value === 1 && (a = 1);
      let c = 1;
      s.NearPlane !== void 0 && (c = s.NearPlane.value / 1e3);
      let u = 1e3;
      s.FarPlane !== void 0 && (u = s.FarPlane.value / 1e3);
      let h = window.innerWidth, m = window.innerHeight;
      s.AspectWidth !== void 0 && s.AspectHeight !== void 0 && (h = s.AspectWidth.value, m = s.AspectHeight.value);
      const g = h / m;
      let w = 45;
      s.FieldOfView !== void 0 && (w = s.FieldOfView.value);
      const _ = s.FocalLength ? s.FocalLength.value : null;
      switch (a) {
        case 0:
          r = new PerspectiveCamera(w, g, c, u), _ !== null && r.setFocalLength(_);
          break;
        case 1:
          r = new OrthographicCamera(-h / 2, h / 2, m / 2, -m / 2, c, u);
          break;
        default:
          console.warn("THREE.FBXLoader: Unknown camera type " + a + "."), r = new Object3D();
          break;
      }
    }
    return r;
  }
  // Create a DirectionalLight, PointLight or SpotLight
  createLight(i) {
    let r, s;
    if (i.children.forEach(function(a) {
      const c = oe.Objects.NodeAttribute[a.ID];
      c !== void 0 && (s = c);
    }), s === void 0)
      r = new Object3D();
    else {
      let a;
      s.LightType === void 0 ? a = 0 : a = s.LightType.value;
      let c = 16777215;
      s.Color !== void 0 && (c = new Color().fromArray(s.Color.value));
      let u = s.Intensity === void 0 ? 1 : s.Intensity.value / 100;
      s.CastLightOnObject !== void 0 && s.CastLightOnObject.value === 0 && (u = 0);
      let h = 0;
      s.FarAttenuationEnd !== void 0 && (s.EnableFarAttenuation !== void 0 && s.EnableFarAttenuation.value === 0 ? h = 0 : h = s.FarAttenuationEnd.value);
      const m = 1;
      switch (a) {
        case 0:
          r = new PointLight(c, u, h, m);
          break;
        case 1:
          r = new DirectionalLight(c, u);
          break;
        case 2:
          let g = Math.PI / 3;
          s.InnerAngle !== void 0 && (g = MathUtils.degToRad(s.InnerAngle.value));
          let w = 0;
          s.OuterAngle !== void 0 && (w = MathUtils.degToRad(s.OuterAngle.value), w = Math.max(w, 1)), r = new SpotLight(c, u, h, g, w, m);
          break;
        default:
          console.warn("THREE.FBXLoader: Unknown light type " + s.LightType.value + ", defaulting to a PointLight."), r = new PointLight(c, u);
          break;
      }
      s.CastShadows !== void 0 && s.CastShadows.value === 1 && (r.castShadow = true);
    }
    return r;
  }
  createMesh(i, r, s) {
    let a, c = null, u = null;
    const h = [];
    return i.children.forEach(function(m) {
      r.has(m.ID) && (c = r.get(m.ID)), s.has(m.ID) && h.push(s.get(m.ID));
    }), h.length > 1 ? u = h : h.length > 0 ? u = h[0] : (u = new MeshPhongMaterial({
      color: 13421772
    }), h.push(u)), "color" in c.attributes && h.forEach(function(m) {
      m.vertexColors = true;
    }), c.FBX_Deformer ? (a = new SkinnedMesh(c, u), a.normalizeSkinWeights()) : a = new Mesh(c, u), a;
  }
  createCurve(i, r) {
    const s = i.children.reduce(function(c, u) {
      return r.has(u.ID) && (c = r.get(u.ID)), c;
    }, null), a = new LineBasicMaterial({
      color: 3342591,
      linewidth: 1
    });
    return new Line(s, a);
  }
  // parse the model node for transform data
  getTransformData(i, r) {
    const s = {};
    "InheritType" in r && (s.inheritType = parseInt(r.InheritType.value)), "RotationOrder" in r ? s.eulerOrder = Ja(r.RotationOrder.value) : s.eulerOrder = "ZYX", "Lcl_Translation" in r && (s.translation = r.Lcl_Translation.value), "PreRotation" in r && (s.preRotation = r.PreRotation.value), "Lcl_Rotation" in r && (s.rotation = r.Lcl_Rotation.value), "PostRotation" in r && (s.postRotation = r.PostRotation.value), "Lcl_Scaling" in r && (s.scale = r.Lcl_Scaling.value), "ScalingOffset" in r && (s.scalingOffset = r.ScalingOffset.value), "ScalingPivot" in r && (s.scalingPivot = r.ScalingPivot.value), "RotationOffset" in r && (s.rotationOffset = r.RotationOffset.value), "RotationPivot" in r && (s.rotationPivot = r.RotationPivot.value), i.userData.transformData = s;
  }
  setLookAtProperties(i, r) {
    "LookAtProperty" in r && Re.get(i.ID).children.forEach(function(a) {
      if (a.relationship === "LookAtProperty") {
        const c = oe.Objects.Model[a.ID];
        if ("Lcl_Translation" in c) {
          const u = c.Lcl_Translation.value;
          i.target !== void 0 ? (i.target.position.fromArray(u), We.add(i.target)) : i.lookAt(new Vector3().fromArray(u));
        }
      }
    });
  }
  bindSkeleton(i, r, s) {
    const a = this.parsePoseNodes();
    for (const c in i) {
      const u = i[c];
      Re.get(parseInt(u.ID)).parents.forEach(function(m) {
        if (r.has(m.ID)) {
          const g = m.ID;
          Re.get(g).parents.forEach(function(_) {
            s.has(_.ID) && s.get(_.ID).bind(new Skeleton(u.bones), a[_.ID]);
          });
        }
      });
    }
  }
  parsePoseNodes() {
    const i = {};
    if ("Pose" in oe.Objects) {
      const r = oe.Objects.Pose;
      for (const s in r)
        if (r[s].attrType === "BindPose" && r[s].NbPoseNodes > 0) {
          const a = r[s].PoseNode;
          Array.isArray(a) ? a.forEach(function(c) {
            i[c.Node] = new Matrix4().fromArray(c.Matrix.a);
          }) : i[a.Node] = new Matrix4().fromArray(a.Matrix.a);
        }
    }
    return i;
  }
  // Parse ambient color in FBXTree.GlobalSettings - if it's not set to black (default), create an ambient light
  createAmbientLight() {
    if ("GlobalSettings" in oe && "AmbientColor" in oe.GlobalSettings) {
      const i = oe.GlobalSettings.AmbientColor.value, r = i[0], s = i[1], a = i[2];
      if (r !== 0 || s !== 0 || a !== 0) {
        const c = new Color(r, s, a);
        We.add(new AmbientLight(c, 1));
      }
    }
  }
};
var $u = class {
  // Parse nodes in FBXTree.Objects.Geometry
  parse(i) {
    const r = /* @__PURE__ */ new Map();
    if ("Geometry" in oe.Objects) {
      const s = oe.Objects.Geometry;
      for (const a in s) {
        const c = Re.get(parseInt(a)), u = this.parseGeometry(c, s[a], i);
        r.set(parseInt(a), u);
      }
    }
    return r;
  }
  // Parse single node in FBXTree.Objects.Geometry
  parseGeometry(i, r, s) {
    switch (r.attrType) {
      case "Mesh":
        return this.parseMeshGeometry(i, r, s);
      case "NurbsCurve":
        return this.parseNurbsGeometry(r);
    }
  }
  // Parse single node mesh geometry in FBXTree.Objects.Geometry
  parseMeshGeometry(i, r, s) {
    const a = s.skeletons, c = [], u = i.parents.map(function(_) {
      return oe.Objects.Model[_.ID];
    });
    if (u.length === 0)
      return;
    const h = i.children.reduce(function(_, y) {
      return a[y.ID] !== void 0 && (_ = a[y.ID]), _;
    }, null);
    i.children.forEach(function(_) {
      s.morphTargets[_.ID] !== void 0 && c.push(s.morphTargets[_.ID]);
    });
    const m = u[0], g = {};
    "RotationOrder" in m && (g.eulerOrder = Ja(m.RotationOrder.value)), "InheritType" in m && (g.inheritType = parseInt(m.InheritType.value)), "GeometricTranslation" in m && (g.translation = m.GeometricTranslation.value), "GeometricRotation" in m && (g.rotation = m.GeometricRotation.value), "GeometricScaling" in m && (g.scale = m.GeometricScaling.value);
    const w = Wa(g);
    return this.genGeometry(r, h, c, w);
  }
  // Generate a BufferGeometry from a node in FBXTree.Objects.Geometry
  genGeometry(i, r, s, a) {
    const c = new BufferGeometry();
    i.attrName && (c.name = i.attrName);
    const u = this.parseGeoNode(i, r), h = this.genBuffers(u), m = new Float32BufferAttribute(h.vertex, 3);
    if (m.applyMatrix4(a), c.setAttribute("position", m), h.colors.length > 0 && c.setAttribute("color", new Float32BufferAttribute(h.colors, 3)), r && (c.setAttribute("skinIndex", new Uint16BufferAttribute(h.weightsIndices, 4)), c.setAttribute("skinWeight", new Float32BufferAttribute(h.vertexWeights, 4)), c.FBX_Deformer = r), h.normal.length > 0) {
      const g = new Matrix3().getNormalMatrix(a), w = new Float32BufferAttribute(h.normal, 3);
      w.applyNormalMatrix(g), c.setAttribute("normal", w);
    }
    if (h.uvs.forEach(function(g, w) {
      let _ = "uv" + (w + 1).toString();
      w === 0 && (_ = "uv"), c.setAttribute(_, new Float32BufferAttribute(h.uvs[w], 2));
    }), u.material && u.material.mappingType !== "AllSame") {
      let g = h.materialIndex[0], w = 0;
      if (h.materialIndex.forEach(function(_, y) {
        _ !== g && (c.addGroup(w, y - w, g), g = _, w = y);
      }), c.groups.length > 0) {
        const _ = c.groups[c.groups.length - 1], y = _.start + _.count;
        y !== h.materialIndex.length && c.addGroup(y, h.materialIndex.length - y, g);
      }
      c.groups.length === 0 && c.addGroup(0, h.materialIndex.length, h.materialIndex[0]);
    }
    return this.addMorphTargets(c, i, s, a), c;
  }
  parseGeoNode(i, r) {
    const s = {};
    if (s.vertexPositions = i.Vertices !== void 0 ? i.Vertices.a : [], s.vertexIndices = i.PolygonVertexIndex !== void 0 ? i.PolygonVertexIndex.a : [], i.LayerElementColor && (s.color = this.parseVertexColors(i.LayerElementColor[0])), i.LayerElementMaterial && (s.material = this.parseMaterialIndices(i.LayerElementMaterial[0])), i.LayerElementNormal && (s.normal = this.parseNormals(i.LayerElementNormal[0])), i.LayerElementUV) {
      s.uv = [];
      let a = 0;
      for (; i.LayerElementUV[a]; )
        i.LayerElementUV[a].UV && s.uv.push(this.parseUVs(i.LayerElementUV[a])), a++;
    }
    return s.weightTable = {}, r !== null && (s.skeleton = r, r.rawBones.forEach(function(a, c) {
      a.indices.forEach(function(u, h) {
        s.weightTable[u] === void 0 && (s.weightTable[u] = []), s.weightTable[u].push({
          id: c,
          weight: a.weights[h]
        });
      });
    })), s;
  }
  genBuffers(i) {
    const r = {
      vertex: [],
      normal: [],
      colors: [],
      uvs: [],
      materialIndex: [],
      vertexWeights: [],
      weightsIndices: []
    };
    let s = 0, a = 0, c = false, u = [], h = [], m = [], g = [], w = [], _ = [];
    const y = this;
    return i.vertexIndices.forEach(function(C, I) {
      let S, R = false;
      C < 0 && (C = C ^ -1, R = true);
      let j = [], F = [];
      if (u.push(C * 3, C * 3 + 1, C * 3 + 2), i.color) {
        const V = Vs(I, s, C, i.color);
        m.push(V[0], V[1], V[2]);
      }
      if (i.skeleton) {
        if (i.weightTable[C] !== void 0 && i.weightTable[C].forEach(function(V) {
          F.push(V.weight), j.push(V.id);
        }), F.length > 4) {
          c || (console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."), c = true);
          const V = [0, 0, 0, 0], D = [0, 0, 0, 0];
          F.forEach(function(Y, G) {
            let N = Y, O = j[G];
            D.forEach(function(H, K, q) {
              if (N > H) {
                q[K] = N, N = H;
                const he = V[K];
                V[K] = O, O = he;
              }
            });
          }), j = V, F = D;
        }
        for (; F.length < 4; )
          F.push(0), j.push(0);
        for (let V = 0; V < 4; ++V)
          w.push(F[V]), _.push(j[V]);
      }
      if (i.normal) {
        const V = Vs(I, s, C, i.normal);
        h.push(V[0], V[1], V[2]);
      }
      i.material && i.material.mappingType !== "AllSame" && (S = Vs(I, s, C, i.material)[0]), i.uv && i.uv.forEach(function(V, D) {
        const Y = Vs(I, s, C, V);
        g[D] === void 0 && (g[D] = []), g[D].push(Y[0]), g[D].push(Y[1]);
      }), a++, R && (y.genFace(r, i, u, S, h, m, g, w, _, a), s++, a = 0, u = [], h = [], m = [], g = [], w = [], _ = []);
    }), r;
  }
  // Generate data for a single face in a geometry. If the face is a quad then split it into 2 tris
  genFace(i, r, s, a, c, u, h, m, g, w) {
    for (let _ = 2; _ < w; _++)
      i.vertex.push(r.vertexPositions[s[0]]), i.vertex.push(r.vertexPositions[s[1]]), i.vertex.push(r.vertexPositions[s[2]]), i.vertex.push(r.vertexPositions[s[(_ - 1) * 3]]), i.vertex.push(r.vertexPositions[s[(_ - 1) * 3 + 1]]), i.vertex.push(r.vertexPositions[s[(_ - 1) * 3 + 2]]), i.vertex.push(r.vertexPositions[s[_ * 3]]), i.vertex.push(r.vertexPositions[s[_ * 3 + 1]]), i.vertex.push(r.vertexPositions[s[_ * 3 + 2]]), r.skeleton && (i.vertexWeights.push(m[0]), i.vertexWeights.push(m[1]), i.vertexWeights.push(m[2]), i.vertexWeights.push(m[3]), i.vertexWeights.push(m[(_ - 1) * 4]), i.vertexWeights.push(m[(_ - 1) * 4 + 1]), i.vertexWeights.push(m[(_ - 1) * 4 + 2]), i.vertexWeights.push(m[(_ - 1) * 4 + 3]), i.vertexWeights.push(m[_ * 4]), i.vertexWeights.push(m[_ * 4 + 1]), i.vertexWeights.push(m[_ * 4 + 2]), i.vertexWeights.push(m[_ * 4 + 3]), i.weightsIndices.push(g[0]), i.weightsIndices.push(g[1]), i.weightsIndices.push(g[2]), i.weightsIndices.push(g[3]), i.weightsIndices.push(g[(_ - 1) * 4]), i.weightsIndices.push(g[(_ - 1) * 4 + 1]), i.weightsIndices.push(g[(_ - 1) * 4 + 2]), i.weightsIndices.push(g[(_ - 1) * 4 + 3]), i.weightsIndices.push(g[_ * 4]), i.weightsIndices.push(g[_ * 4 + 1]), i.weightsIndices.push(g[_ * 4 + 2]), i.weightsIndices.push(g[_ * 4 + 3])), r.color && (i.colors.push(u[0]), i.colors.push(u[1]), i.colors.push(u[2]), i.colors.push(u[(_ - 1) * 3]), i.colors.push(u[(_ - 1) * 3 + 1]), i.colors.push(u[(_ - 1) * 3 + 2]), i.colors.push(u[_ * 3]), i.colors.push(u[_ * 3 + 1]), i.colors.push(u[_ * 3 + 2])), r.material && r.material.mappingType !== "AllSame" && (i.materialIndex.push(a), i.materialIndex.push(a), i.materialIndex.push(a)), r.normal && (i.normal.push(c[0]), i.normal.push(c[1]), i.normal.push(c[2]), i.normal.push(c[(_ - 1) * 3]), i.normal.push(c[(_ - 1) * 3 + 1]), i.normal.push(c[(_ - 1) * 3 + 2]), i.normal.push(c[_ * 3]), i.normal.push(c[_ * 3 + 1]), i.normal.push(c[_ * 3 + 2])), r.uv && r.uv.forEach(function(y, C) {
        i.uvs[C] === void 0 && (i.uvs[C] = []), i.uvs[C].push(h[C][0]), i.uvs[C].push(h[C][1]), i.uvs[C].push(h[C][(_ - 1) * 2]), i.uvs[C].push(h[C][(_ - 1) * 2 + 1]), i.uvs[C].push(h[C][_ * 2]), i.uvs[C].push(h[C][_ * 2 + 1]);
      });
  }
  addMorphTargets(i, r, s, a) {
    if (s.length === 0)
      return;
    i.morphTargetsRelative = true, i.morphAttributes.position = [];
    const c = this;
    s.forEach(function(u) {
      u.rawTargets.forEach(function(h) {
        const m = oe.Objects.Geometry[h.geoID];
        m !== void 0 && c.genMorphGeometry(i, r, m, a, h.name);
      });
    });
  }
  // a morph geometry node is similar to a standard  node, and the node is also contained
  // in FBXTree.Objects.Geometry, however it can only have attributes for position, normal
  // and a special attribute Index defining which vertices of the original geometry are affected
  // Normal and position attributes only have data for the vertices that are affected by the morph
  genMorphGeometry(i, r, s, a, c) {
    const u = r.PolygonVertexIndex !== void 0 ? r.PolygonVertexIndex.a : [], h = s.Vertices !== void 0 ? s.Vertices.a : [], m = s.Indexes !== void 0 ? s.Indexes.a : [], g = i.attributes.position.count * 3, w = new Float32Array(g);
    for (let I = 0; I < m.length; I++) {
      const S = m[I] * 3;
      w[S] = h[I * 3], w[S + 1] = h[I * 3 + 1], w[S + 2] = h[I * 3 + 2];
    }
    const _ = {
      vertexIndices: u,
      vertexPositions: w
    }, y = this.genBuffers(_), C = new Float32BufferAttribute(y.vertex, 3);
    C.name = c || s.attrName, C.applyMatrix4(a), i.morphAttributes.position.push(C);
  }
  // Parse normal from FBXTree.Objects.Geometry.LayerElementNormal if it exists
  parseNormals(i) {
    const r = i.MappingInformationType, s = i.ReferenceInformationType, a = i.Normals.a;
    let c = [];
    return s === "IndexToDirect" && ("NormalIndex" in i ? c = i.NormalIndex.a : "NormalsIndex" in i && (c = i.NormalsIndex.a)), {
      dataSize: 3,
      buffer: a,
      indices: c,
      mappingType: r,
      referenceType: s
    };
  }
  // Parse UVs from FBXTree.Objects.Geometry.LayerElementUV if it exists
  parseUVs(i) {
    const r = i.MappingInformationType, s = i.ReferenceInformationType, a = i.UV.a;
    let c = [];
    return s === "IndexToDirect" && (c = i.UVIndex.a), {
      dataSize: 2,
      buffer: a,
      indices: c,
      mappingType: r,
      referenceType: s
    };
  }
  // Parse Vertex Colors from FBXTree.Objects.Geometry.LayerElementColor if it exists
  parseVertexColors(i) {
    const r = i.MappingInformationType, s = i.ReferenceInformationType, a = i.Colors.a;
    let c = [];
    return s === "IndexToDirect" && (c = i.ColorIndex.a), {
      dataSize: 4,
      buffer: a,
      indices: c,
      mappingType: r,
      referenceType: s
    };
  }
  // Parse mapping and material data in FBXTree.Objects.Geometry.LayerElementMaterial if it exists
  parseMaterialIndices(i) {
    const r = i.MappingInformationType, s = i.ReferenceInformationType;
    if (r === "NoMappingInformation")
      return {
        dataSize: 1,
        buffer: [0],
        indices: [0],
        mappingType: "AllSame",
        referenceType: s
      };
    const a = i.Materials.a, c = [];
    for (let u = 0; u < a.length; ++u)
      c.push(u);
    return {
      dataSize: 1,
      buffer: a,
      indices: c,
      mappingType: r,
      referenceType: s
    };
  }
  // Generate a NurbGeometry from a node in FBXTree.Objects.Geometry
  parseNurbsGeometry(i) {
    if (va === void 0)
      return console.error("THREE.FBXLoader: The loader relies on NURBSCurve for any nurbs present in the model. Nurbs will show up as empty geometry."), new BufferGeometry();
    const r = parseInt(i.Order);
    if (isNaN(r))
      return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s", i.Order, i.id), new BufferGeometry();
    const s = r - 1, a = i.KnotVector.a, c = [], u = i.Points.a;
    for (let _ = 0, y = u.length; _ < y; _ += 4)
      c.push(new Vector4().fromArray(u, _));
    let h, m;
    if (i.Form === "Closed")
      c.push(c[0]);
    else if (i.Form === "Periodic") {
      h = s, m = a.length - 1 - h;
      for (let _ = 0; _ < s; ++_)
        c.push(c[_]);
    }
    const w = new va(s, a, c, h, m).getPoints(c.length * 12);
    return new BufferGeometry().setFromPoints(w);
  }
};
var Xu = class {
  // take raw animation clips and turn them into three.js animation clips
  parse() {
    const i = [], r = this.parseClips();
    if (r !== void 0)
      for (const s in r) {
        const a = r[s], c = this.addClip(a);
        i.push(c);
      }
    return i;
  }
  parseClips() {
    if (oe.Objects.AnimationCurve === void 0)
      return;
    const i = this.parseAnimationCurveNodes();
    this.parseAnimationCurves(i);
    const r = this.parseAnimationLayers(i);
    return this.parseAnimStacks(r);
  }
  // parse nodes in FBXTree.Objects.AnimationCurveNode
  // each AnimationCurveNode holds data for an animation transform for a model (e.g. left arm rotation )
  // and is referenced by an AnimationLayer
  parseAnimationCurveNodes() {
    const i = oe.Objects.AnimationCurveNode, r = /* @__PURE__ */ new Map();
    for (const s in i) {
      const a = i[s];
      if (a.attrName.match(/S|R|T|DeformPercent/) !== null) {
        const c = {
          id: a.id,
          attr: a.attrName,
          curves: {}
        };
        r.set(c.id, c);
      }
    }
    return r;
  }
  // parse nodes in FBXTree.Objects.AnimationCurve and connect them up to
  // previously parsed AnimationCurveNodes. Each AnimationCurve holds data for a single animated
  // axis ( e.g. times and values of x rotation)
  parseAnimationCurves(i) {
    const r = oe.Objects.AnimationCurve;
    for (const s in r) {
      const a = {
        id: r[s].id,
        times: r[s].KeyTime.a.map(Wu),
        values: r[s].KeyValueFloat.a
      }, c = Re.get(a.id);
      if (c !== void 0) {
        const u = c.parents[0].ID, h = c.parents[0].relationship;
        h.match(/X/) ? i.get(u).curves.x = a : h.match(/Y/) ? i.get(u).curves.y = a : h.match(/Z/) ? i.get(u).curves.z = a : h.match(/d|DeformPercent/) && i.has(u) && (i.get(u).curves.morph = a);
      }
    }
  }
  // parse nodes in FBXTree.Objects.AnimationLayer. Each layers holds references
  // to various AnimationCurveNodes and is referenced by an AnimationStack node
  // note: theoretically a stack can have multiple layers, however in practice there always seems to be one per stack
  parseAnimationLayers(i) {
    const r = oe.Objects.AnimationLayer, s = /* @__PURE__ */ new Map();
    for (const a in r) {
      const c = [], u = Re.get(parseInt(a));
      u !== void 0 && (u.children.forEach(function(m, g) {
        if (i.has(m.ID)) {
          const w = i.get(m.ID);
          if (w.curves.x !== void 0 || w.curves.y !== void 0 || w.curves.z !== void 0) {
            if (c[g] === void 0) {
              const _ = Re.get(m.ID).parents.filter(function(y) {
                return y.relationship !== void 0;
              })[0].ID;
              if (_ !== void 0) {
                const y = oe.Objects.Model[_.toString()];
                if (y === void 0) {
                  console.warn("THREE.FBXLoader: Encountered a unused curve.", m);
                  return;
                }
                const C = {
                  modelName: y.attrName ? PropertyBinding.sanitizeNodeName(y.attrName) : "",
                  ID: y.id,
                  initialPosition: [0, 0, 0],
                  initialRotation: [0, 0, 0],
                  initialScale: [1, 1, 1]
                };
                We.traverse(function(I) {
                  I.ID === y.id && (C.transform = I.matrix, I.userData.transformData && (C.eulerOrder = I.userData.transformData.eulerOrder));
                }), C.transform || (C.transform = new Matrix4()), "PreRotation" in y && (C.preRotation = y.PreRotation.value), "PostRotation" in y && (C.postRotation = y.PostRotation.value), c[g] = C;
              }
            }
            c[g] && (c[g][w.attr] = w);
          } else if (w.curves.morph !== void 0) {
            if (c[g] === void 0) {
              const _ = Re.get(m.ID).parents.filter(function(j) {
                return j.relationship !== void 0;
              })[0].ID, y = Re.get(_).parents[0].ID, C = Re.get(y).parents[0].ID, I = Re.get(C).parents[0].ID, S = oe.Objects.Model[I], R = {
                modelName: S.attrName ? PropertyBinding.sanitizeNodeName(S.attrName) : "",
                morphName: oe.Objects.Deformer[_].attrName
              };
              c[g] = R;
            }
            c[g][w.attr] = w;
          }
        }
      }), s.set(parseInt(a), c));
    }
    return s;
  }
  // parse nodes in FBXTree.Objects.AnimationStack. These are the top level node in the animation
  // hierarchy. Each Stack node will be used to create a AnimationClip
  parseAnimStacks(i) {
    const r = oe.Objects.AnimationStack, s = {};
    for (const a in r) {
      const c = Re.get(parseInt(a)).children;
      c.length > 1 && console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");
      const u = i.get(c[0].ID);
      s[a] = {
        name: r[a].attrName,
        layer: u
      };
    }
    return s;
  }
  addClip(i) {
    let r = [];
    const s = this;
    return i.layer.forEach(function(a) {
      r = r.concat(s.generateTracks(a));
    }), new AnimationClip(i.name, -1, r);
  }
  generateTracks(i) {
    const r = [];
    let s = new Vector3(), a = new Quaternion(), c = new Vector3();
    if (i.transform && i.transform.decompose(s, a, c), s = s.toArray(), a = new Euler().setFromQuaternion(a, i.eulerOrder).toArray(), c = c.toArray(), i.T !== void 0 && Object.keys(i.T.curves).length > 0) {
      const u = this.generateVectorTrack(i.modelName, i.T.curves, s, "position");
      u !== void 0 && r.push(u);
    }
    if (i.R !== void 0 && Object.keys(i.R.curves).length > 0) {
      const u = this.generateRotationTrack(i.modelName, i.R.curves, a, i.preRotation, i.postRotation, i.eulerOrder);
      u !== void 0 && r.push(u);
    }
    if (i.S !== void 0 && Object.keys(i.S.curves).length > 0) {
      const u = this.generateVectorTrack(i.modelName, i.S.curves, c, "scale");
      u !== void 0 && r.push(u);
    }
    if (i.DeformPercent !== void 0) {
      const u = this.generateMorphTrack(i);
      u !== void 0 && r.push(u);
    }
    return r;
  }
  generateVectorTrack(i, r, s, a) {
    const c = this.getTimesForAllAxes(r), u = this.getKeyframeTrackValues(c, r, s);
    return new VectorKeyframeTrack(i + "." + a, c, u);
  }
  generateRotationTrack(i, r, s, a, c, u) {
    r.x !== void 0 && (this.interpolateRotations(r.x), r.x.values = r.x.values.map(MathUtils.degToRad)), r.y !== void 0 && (this.interpolateRotations(r.y), r.y.values = r.y.values.map(MathUtils.degToRad)), r.z !== void 0 && (this.interpolateRotations(r.z), r.z.values = r.z.values.map(MathUtils.degToRad));
    const h = this.getTimesForAllAxes(r), m = this.getKeyframeTrackValues(h, r, s);
    a !== void 0 && (a = a.map(MathUtils.degToRad), a.push(u), a = new Euler().fromArray(a), a = new Quaternion().setFromEuler(a)), c !== void 0 && (c = c.map(MathUtils.degToRad), c.push(u), c = new Euler().fromArray(c), c = new Quaternion().setFromEuler(c).invert());
    const g = new Quaternion(), w = new Euler(), _ = [];
    for (let y = 0; y < m.length; y += 3)
      w.set(m[y], m[y + 1], m[y + 2], u), g.setFromEuler(w), a !== void 0 && g.premultiply(a), c !== void 0 && g.multiply(c), g.toArray(_, y / 3 * 4);
    return new QuaternionKeyframeTrack(i + ".quaternion", h, _);
  }
  generateMorphTrack(i) {
    const r = i.DeformPercent.curves.morph, s = r.values.map(function(c) {
      return c / 100;
    }), a = We.getObjectByName(i.modelName).morphTargetDictionary[i.morphName];
    return new NumberKeyframeTrack(i.modelName + ".morphTargetInfluences[" + a + "]", r.times, s);
  }
  // For all animated objects, times are defined separately for each axis
  // Here we'll combine the times into one sorted array without duplicates
  getTimesForAllAxes(i) {
    let r = [];
    if (i.x !== void 0 && (r = r.concat(i.x.times)), i.y !== void 0 && (r = r.concat(i.y.times)), i.z !== void 0 && (r = r.concat(i.z.times)), r = r.sort(function(s, a) {
      return s - a;
    }), r.length > 1) {
      let s = 1, a = r[0];
      for (let c = 1; c < r.length; c++) {
        const u = r[c];
        u !== a && (r[s] = u, a = u, s++);
      }
      r = r.slice(0, s);
    }
    return r;
  }
  getKeyframeTrackValues(i, r, s) {
    const a = s, c = [];
    let u = -1, h = -1, m = -1;
    return i.forEach(function(g) {
      if (r.x && (u = r.x.times.indexOf(g)), r.y && (h = r.y.times.indexOf(g)), r.z && (m = r.z.times.indexOf(g)), u !== -1) {
        const w = r.x.values[u];
        c.push(w), a[0] = w;
      } else
        c.push(a[0]);
      if (h !== -1) {
        const w = r.y.values[h];
        c.push(w), a[1] = w;
      } else
        c.push(a[1]);
      if (m !== -1) {
        const w = r.z.values[m];
        c.push(w), a[2] = w;
      } else
        c.push(a[2]);
    }), c;
  }
  // Rotations are defined as Euler angles which can have values  of any size
  // These will be converted to quaternions which don't support values greater than
  // PI, so we'll interpolate large rotations
  interpolateRotations(i) {
    for (let r = 1; r < i.values.length; r++) {
      const s = i.values[r - 1], a = i.values[r] - s, c = Math.abs(a);
      if (c >= 180) {
        const u = c / 180, h = a / u;
        let m = s + h;
        const g = i.times[r - 1], _ = (i.times[r] - g) / u;
        let y = g + _;
        const C = [], I = [];
        for (; y < i.times[r]; )
          C.push(y), y += _, I.push(m), m += h;
        i.times = _a(i.times, r, C), i.values = _a(i.values, r, I);
      }
    }
  }
};
var Yu = class {
  getPrevNode() {
    return this.nodeStack[this.currentIndent - 2];
  }
  getCurrentNode() {
    return this.nodeStack[this.currentIndent - 1];
  }
  getCurrentProp() {
    return this.currentProp;
  }
  pushStack(i) {
    this.nodeStack.push(i), this.currentIndent += 1;
  }
  popStack() {
    this.nodeStack.pop(), this.currentIndent -= 1;
  }
  setCurrentProp(i, r) {
    this.currentProp = i, this.currentPropName = r;
  }
  parse(i) {
    this.currentIndent = 0, this.allNodes = new Za(), this.nodeStack = [], this.currentProp = [], this.currentPropName = "";
    const r = this, s = i.split(/[\r\n]+/);
    return s.forEach(function(a, c) {
      const u = a.match(/^[\s\t]*;/), h = a.match(/^[\s\t]*$/);
      if (u || h)
        return;
      const m = a.match("^\\t{" + r.currentIndent + "}(\\w+):(.*){", ""), g = a.match("^\\t{" + r.currentIndent + "}(\\w+):[\\s\\t\\r\\n](.*)"), w = a.match("^\\t{" + (r.currentIndent - 1) + "}}");
      m ? r.parseNodeBegin(a, m) : g ? r.parseNodeProperty(a, g, s[++c]) : w ? r.popStack() : a.match(/^[^\s\t}]/) && r.parseNodePropertyContinued(a);
    }), this.allNodes;
  }
  parseNodeBegin(i, r) {
    const s = r[1].trim().replace(/^"/, "").replace(/"$/, ""), a = r[2].split(",").map(function(m) {
      return m.trim().replace(/^"/, "").replace(/"$/, "");
    }), c = {
      name: s
    }, u = this.parseNodeAttr(a), h = this.getCurrentNode();
    this.currentIndent === 0 ? this.allNodes.add(s, c) : s in h ? (s === "PoseNode" ? h.PoseNode.push(c) : h[s].id !== void 0 && (h[s] = {}, h[s][h[s].id] = h[s]), u.id !== "" && (h[s][u.id] = c)) : typeof u.id == "number" ? (h[s] = {}, h[s][u.id] = c) : s !== "Properties70" && (s === "PoseNode" ? h[s] = [c] : h[s] = c), typeof u.id == "number" && (c.id = u.id), u.name !== "" && (c.attrName = u.name), u.type !== "" && (c.attrType = u.type), this.pushStack(c);
  }
  parseNodeAttr(i) {
    let r = i[0];
    i[0] !== "" && (r = parseInt(i[0]), isNaN(r) && (r = i[0]));
    let s = "", a = "";
    return i.length > 1 && (s = i[1].replace(/^(\w+)::/, ""), a = i[2]), {
      id: r,
      name: s,
      type: a
    };
  }
  parseNodeProperty(i, r, s) {
    let a = r[1].replace(/^"/, "").replace(/"$/, "").trim(), c = r[2].replace(/^"/, "").replace(/"$/, "").trim();
    a === "Content" && c === "," && (c = s.replace(/"/g, "").replace(/,$/, "").trim());
    const u = this.getCurrentNode();
    if (u.name === "Properties70") {
      this.parseNodeSpecialProperty(i, a, c);
      return;
    }
    if (a === "C") {
      const m = c.split(",").slice(1), g = parseInt(m[0]), w = parseInt(m[1]);
      let _ = c.split(",").slice(3);
      _ = _.map(function(y) {
        return y.trim().replace(/^"/, "");
      }), a = "connections", c = [g, w], eh(c, _), u[a] === void 0 && (u[a] = []);
    }
    a === "Node" && (u.id = c), a in u && Array.isArray(u[a]) ? u[a].push(c) : a !== "a" ? u[a] = c : u.a = c, this.setCurrentProp(u, a), a === "a" && c.slice(-1) !== "," && (u.a = eo(c));
  }
  parseNodePropertyContinued(i) {
    const r = this.getCurrentNode();
    r.a += i, i.slice(-1) !== "," && (r.a = eo(r.a));
  }
  // parse "Property70"
  parseNodeSpecialProperty(i, r, s) {
    const a = s.split('",').map(function(w) {
      return w.trim().replace(/^\"/, "").replace(/\s/, "_");
    }), c = a[0], u = a[1], h = a[2], m = a[3];
    let g = a[4];
    switch (u) {
      case "int":
      case "enum":
      case "bool":
      case "ULongLong":
      case "double":
      case "Number":
      case "FieldOfView":
        g = parseFloat(g);
        break;
      case "Color":
      case "ColorRGB":
      case "Vector3D":
      case "Lcl_Translation":
      case "Lcl_Rotation":
      case "Lcl_Scaling":
        g = eo(g);
        break;
    }
    this.getPrevNode()[c] = {
      type: u,
      type2: h,
      flag: m,
      value: g
    }, this.setCurrentProp(this.getPrevNode(), c);
  }
};
var qu = class {
  parse(i) {
    const r = new ba(i);
    r.skip(23);
    const s = r.getUint32();
    if (s < 6400)
      throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + s);
    const a = new Za();
    for (; !this.endOfContent(r); ) {
      const c = this.parseNode(r, s);
      c !== null && a.add(c.name, c);
    }
    return a;
  }
  // Check if reader has reached the end of content.
  endOfContent(i) {
    return i.size() % 16 === 0 ? (i.getOffset() + 160 + 16 & -16) >= i.size() : i.getOffset() + 160 + 16 >= i.size();
  }
  // recursively parse nodes until the end of the file is reached
  parseNode(i, r) {
    const s = {}, a = r >= 7500 ? i.getUint64() : i.getUint32(), c = r >= 7500 ? i.getUint64() : i.getUint32();
    r >= 7500 ? i.getUint64() : i.getUint32();
    const u = i.getUint8(), h = i.getString(u);
    if (a === 0)
      return null;
    const m = [];
    for (let y = 0; y < c; y++)
      m.push(this.parseProperty(i));
    const g = m.length > 0 ? m[0] : "", w = m.length > 1 ? m[1] : "", _ = m.length > 2 ? m[2] : "";
    for (s.singleProperty = c === 1 && i.getOffset() === a; a > i.getOffset(); ) {
      const y = this.parseNode(i, r);
      y !== null && this.parseSubNode(h, s, y);
    }
    return s.propertyList = m, typeof g == "number" && (s.id = g), w !== "" && (s.attrName = w), _ !== "" && (s.attrType = _), h !== "" && (s.name = h), s;
  }
  parseSubNode(i, r, s) {
    if (s.singleProperty === true) {
      const a = s.propertyList[0];
      Array.isArray(a) ? (r[s.name] = s, s.a = a) : r[s.name] = a;
    } else if (i === "Connections" && s.name === "C") {
      const a = [];
      s.propertyList.forEach(function(c, u) {
        u !== 0 && a.push(c);
      }), r.connections === void 0 && (r.connections = []), r.connections.push(a);
    } else if (s.name === "Properties70")
      Object.keys(s).forEach(function(c) {
        r[c] = s[c];
      });
    else if (i === "Properties70" && s.name === "P") {
      let a = s.propertyList[0], c = s.propertyList[1];
      const u = s.propertyList[2], h = s.propertyList[3];
      let m;
      a.indexOf("Lcl ") === 0 && (a = a.replace("Lcl ", "Lcl_")), c.indexOf("Lcl ") === 0 && (c = c.replace("Lcl ", "Lcl_")), c === "Color" || c === "ColorRGB" || c === "Vector" || c === "Vector3D" || c.indexOf("Lcl_") === 0 ? m = [s.propertyList[4], s.propertyList[5], s.propertyList[6]] : m = s.propertyList[4], r[a] = {
        type: c,
        type2: u,
        flag: h,
        value: m
      };
    } else
      r[s.name] === void 0 ? typeof s.id == "number" ? (r[s.name] = {}, r[s.name][s.id] = s) : r[s.name] = s : s.name === "PoseNode" ? (Array.isArray(r[s.name]) || (r[s.name] = [r[s.name]]), r[s.name].push(s)) : r[s.name][s.id] === void 0 && (r[s.name][s.id] = s);
  }
  parseProperty(i) {
    const r = i.getString(1);
    let s;
    switch (r) {
      case "C":
        return i.getBoolean();
      case "D":
        return i.getFloat64();
      case "F":
        return i.getFloat32();
      case "I":
        return i.getInt32();
      case "L":
        return i.getInt64();
      case "R":
        return s = i.getUint32(), i.getArrayBuffer(s);
      case "S":
        return s = i.getUint32(), i.getString(s);
      case "Y":
        return i.getInt16();
      case "b":
      case "c":
      case "d":
      case "f":
      case "i":
      case "l":
        const a = i.getUint32(), c = i.getUint32(), u = i.getUint32();
        if (c === 0)
          switch (r) {
            case "b":
            case "c":
              return i.getBooleanArray(a);
            case "d":
              return i.getFloat64Array(a);
            case "f":
              return i.getFloat32Array(a);
            case "i":
              return i.getInt32Array(a);
            case "l":
              return i.getInt64Array(a);
          }
        const h = Jp(new Uint8Array(i.getArrayBuffer(u))), m = new ba(h.buffer);
        switch (r) {
          case "b":
          case "c":
            return m.getBooleanArray(a);
          case "d":
            return m.getFloat64Array(a);
          case "f":
            return m.getFloat32Array(a);
          case "i":
            return m.getInt32Array(a);
          case "l":
            return m.getInt64Array(a);
        }
      default:
        throw new Error("THREE.FBXLoader: Unknown property type " + r);
    }
  }
};
var ba = class {
  constructor(i, r) {
    this.dv = new DataView(i), this.offset = 0, this.littleEndian = r !== void 0 ? r : true;
  }
  getOffset() {
    return this.offset;
  }
  size() {
    return this.dv.buffer.byteLength;
  }
  skip(i) {
    this.offset += i;
  }
  // seems like true/false representation depends on exporter.
  // true: 1 or 'Y'(=0x59), false: 0 or 'T'(=0x54)
  // then sees LSB.
  getBoolean() {
    return (this.getUint8() & 1) === 1;
  }
  getBooleanArray(i) {
    const r = [];
    for (let s = 0; s < i; s++)
      r.push(this.getBoolean());
    return r;
  }
  getUint8() {
    const i = this.dv.getUint8(this.offset);
    return this.offset += 1, i;
  }
  getInt16() {
    const i = this.dv.getInt16(this.offset, this.littleEndian);
    return this.offset += 2, i;
  }
  getInt32() {
    const i = this.dv.getInt32(this.offset, this.littleEndian);
    return this.offset += 4, i;
  }
  getInt32Array(i) {
    const r = [];
    for (let s = 0; s < i; s++)
      r.push(this.getInt32());
    return r;
  }
  getUint32() {
    const i = this.dv.getUint32(this.offset, this.littleEndian);
    return this.offset += 4, i;
  }
  // JavaScript doesn't support 64-bit integer so calculate this here
  // 1 << 32 will return 1 so using multiply operation instead here.
  // There's a possibility that this method returns wrong value if the value
  // is out of the range between Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER.
  // TODO: safely handle 64-bit integer
  getInt64() {
    let i, r;
    return this.littleEndian ? (i = this.getUint32(), r = this.getUint32()) : (r = this.getUint32(), i = this.getUint32()), r & 2147483648 ? (r = ~r & 4294967295, i = ~i & 4294967295, i === 4294967295 && (r = r + 1 & 4294967295), i = i + 1 & 4294967295, -(r * 4294967296 + i)) : r * 4294967296 + i;
  }
  getInt64Array(i) {
    const r = [];
    for (let s = 0; s < i; s++)
      r.push(this.getInt64());
    return r;
  }
  // Note: see getInt64() comment
  getUint64() {
    let i, r;
    return this.littleEndian ? (i = this.getUint32(), r = this.getUint32()) : (r = this.getUint32(), i = this.getUint32()), r * 4294967296 + i;
  }
  getFloat32() {
    const i = this.dv.getFloat32(this.offset, this.littleEndian);
    return this.offset += 4, i;
  }
  getFloat32Array(i) {
    const r = [];
    for (let s = 0; s < i; s++)
      r.push(this.getFloat32());
    return r;
  }
  getFloat64() {
    const i = this.dv.getFloat64(this.offset, this.littleEndian);
    return this.offset += 8, i;
  }
  getFloat64Array(i) {
    const r = [];
    for (let s = 0; s < i; s++)
      r.push(this.getFloat64());
    return r;
  }
  getArrayBuffer(i) {
    const r = this.dv.buffer.slice(this.offset, this.offset + i);
    return this.offset += i, r;
  }
  getString(i) {
    let r = [];
    for (let a = 0; a < i; a++)
      r[a] = this.getUint8();
    const s = r.indexOf(0);
    return s >= 0 && (r = r.slice(0, s)), LoaderUtils.decodeText(new Uint8Array(r));
  }
};
var Za = class {
  add(i, r) {
    this[i] = r;
  }
};
function Qu(b) {
  const i = "Kaydara FBX Binary  \0";
  return b.byteLength >= i.length && i === el(b, 0, i.length);
}
function Zu(b) {
  const i = ["K", "a", "y", "d", "a", "r", "a", "\\", "F", "B", "X", "\\", "B", "i", "n", "a", "r", "y", "\\", "\\"];
  let r = 0;
  function s(a) {
    const c = b[a - 1];
    return b = b.slice(r + a), r++, c;
  }
  for (let a = 0; a < i.length; ++a)
    if (s(1) === i[a])
      return false;
  return true;
}
function ga(b) {
  const i = /FBXVersion: (\d+)/, r = b.match(i);
  if (r)
    return parseInt(r[1]);
  throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.");
}
function Wu(b) {
  return b / 46186158e3;
}
var Ju = [];
function Vs(b, i, r, s) {
  let a;
  switch (s.mappingType) {
    case "ByPolygonVertex":
      a = b;
      break;
    case "ByPolygon":
      a = i;
      break;
    case "ByVertice":
      a = r;
      break;
    case "AllSame":
      a = s.indices[0];
      break;
    default:
      console.warn("THREE.FBXLoader: unknown attribute mapping type " + s.mappingType);
  }
  s.referenceType === "IndexToDirect" && (a = s.indices[a]);
  const c = a * s.dataSize, u = c + s.dataSize;
  return th(Ju, s.buffer, c, u);
}
var Jr = new Euler();
var li = new Vector3();
function Wa(b) {
  const i = new Matrix4(), r = new Matrix4(), s = new Matrix4(), a = new Matrix4(), c = new Matrix4(), u = new Matrix4(), h = new Matrix4(), m = new Matrix4(), g = new Matrix4(), w = new Matrix4(), _ = new Matrix4(), y = new Matrix4(), C = b.inheritType ? b.inheritType : 0;
  if (b.translation && i.setPosition(li.fromArray(b.translation)), b.preRotation) {
    const K = b.preRotation.map(MathUtils.degToRad);
    K.push(b.eulerOrder), r.makeRotationFromEuler(Jr.fromArray(K));
  }
  if (b.rotation) {
    const K = b.rotation.map(MathUtils.degToRad);
    K.push(b.eulerOrder), s.makeRotationFromEuler(Jr.fromArray(K));
  }
  if (b.postRotation) {
    const K = b.postRotation.map(MathUtils.degToRad);
    K.push(b.eulerOrder), a.makeRotationFromEuler(Jr.fromArray(K)), a.invert();
  }
  b.scale && c.scale(li.fromArray(b.scale)), b.scalingOffset && h.setPosition(li.fromArray(b.scalingOffset)), b.scalingPivot && u.setPosition(li.fromArray(b.scalingPivot)), b.rotationOffset && m.setPosition(li.fromArray(b.rotationOffset)), b.rotationPivot && g.setPosition(li.fromArray(b.rotationPivot)), b.parentMatrixWorld && (_.copy(b.parentMatrix), w.copy(b.parentMatrixWorld));
  const I = r.clone().multiply(s).multiply(a), S = new Matrix4();
  S.extractRotation(w);
  const R = new Matrix4();
  R.copyPosition(w);
  const j = R.clone().invert().multiply(w), F = S.clone().invert().multiply(j), V = c, D = new Matrix4();
  if (C === 0)
    D.copy(S).multiply(I).multiply(F).multiply(V);
  else if (C === 1)
    D.copy(S).multiply(F).multiply(I).multiply(V);
  else {
    const q = new Matrix4().scale(new Vector3().setFromMatrixScale(_)).clone().invert(), he = F.clone().multiply(q);
    D.copy(S).multiply(I).multiply(he).multiply(V);
  }
  const Y = g.clone().invert(), G = u.clone().invert();
  let N = i.clone().multiply(m).multiply(g).multiply(r).multiply(s).multiply(a).multiply(Y).multiply(h).multiply(u).multiply(c).multiply(G);
  const O = new Matrix4().copyPosition(N), H = w.clone().multiply(O);
  return y.copyPosition(H), N = y.clone().multiply(D), N.premultiply(w.invert()), N;
}
function Ja(b) {
  b = b || 0;
  const i = [
    "ZYX",
    // -> XYZ extrinsic
    "YZX",
    // -> XZY extrinsic
    "XZY",
    // -> YZX extrinsic
    "ZXY",
    // -> YXZ extrinsic
    "YXZ",
    // -> ZXY extrinsic
    "XYZ"
    // -> ZYX extrinsic
    //'SphericXYZ', // not possible to support
  ];
  return b === 6 ? (console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."), i[0]) : i[b];
}
function eo(b) {
  return b.split(",").map(function(r) {
    return parseFloat(r);
  });
}
function el(b, i, r) {
  return i === void 0 && (i = 0), r === void 0 && (r = b.byteLength), LoaderUtils.decodeText(new Uint8Array(b, i, r));
}
function eh(b, i) {
  for (let r = 0, s = b.length, a = i.length; r < a; r++, s++)
    b[s] = i[r];
}
function th(b, i, r, s) {
  for (let a = r, c = 0; a < s; a++, c++)
    b[c] = i[a];
  return b;
}
function _a(b, i, r) {
  return b.slice(0, i).concat(r).concat(b.slice(i));
}
var nh = class extends Loader {
  constructor(i) {
    super(i);
  }
  load(i, r, s, a) {
    const c = new FileLoader(this.manager);
    c.setPath(this.path), c.setRequestHeader(this.requestHeader), c.setWithCredentials(this.withCredentials), c.load(i, (u) => {
      if (typeof u != "string")
        throw new Error("unsupported data type");
      const h = JSON.parse(u), m = this.parse(h);
      r && r(m);
    }, s, a);
  }
  parse(i) {
    return new wo(i);
  }
};
var wo = class {
  constructor(i) {
    P(this, "data", void 0), this.data = i;
  }
  generateShapes(i, r = 100, s) {
    const a = [], c = {
      letterSpacing: 0,
      lineHeight: 1,
      ...s
    }, u = ih(i, r, this.data, c);
    for (let h = 0, m = u.length; h < m; h++)
      Array.prototype.push.apply(a, u[h].toShapes(false));
    return a;
  }
};
P(wo, "isFont", void 0);
P(wo, "type", void 0);
function ih(b, i, r, s) {
  const a = Array.from(b), c = i / r.resolution, u = (r.boundingBox.yMax - r.boundingBox.yMin + r.underlineThickness) * c, h = [];
  let m = 0, g = 0;
  for (let w = 0; w < a.length; w++) {
    const _ = a[w];
    if (_ === `
`)
      m = 0, g -= u * s.lineHeight;
    else {
      const y = sh(_, c, m, g, r);
      y && (m += y.offsetX + s.letterSpacing, h.push(y.path));
    }
  }
  return h;
}
function sh(b, i, r, s, a) {
  const c = a.glyphs[b] || a.glyphs["?"];
  if (!c) {
    console.error('THREE.Font: character "' + b + '" does not exists in font family ' + a.familyName + ".");
    return;
  }
  const u = new ShapePath();
  let h, m, g, w, _, y, C, I;
  if (c.o) {
    const S = c._cachedOutline || (c._cachedOutline = c.o.split(" "));
    for (let R = 0, j = S.length; R < j; )
      switch (S[R++]) {
        case "m":
          h = parseInt(S[R++]) * i + r, m = parseInt(S[R++]) * i + s, u.moveTo(h, m);
          break;
        case "l":
          h = parseInt(S[R++]) * i + r, m = parseInt(S[R++]) * i + s, u.lineTo(h, m);
          break;
        case "q":
          g = parseInt(S[R++]) * i + r, w = parseInt(S[R++]) * i + s, _ = parseInt(S[R++]) * i + r, y = parseInt(S[R++]) * i + s, u.quadraticCurveTo(_, y, g, w);
          break;
        case "b":
          g = parseInt(S[R++]) * i + r, w = parseInt(S[R++]) * i + s, _ = parseInt(S[R++]) * i + r, y = parseInt(S[R++]) * i + s, C = parseInt(S[R++]) * i + r, I = parseInt(S[R++]) * i + s, u.bezierCurveTo(_, y, C, I, g, w);
          break;
      }
  }
  return {
    offsetX: c.ha * i,
    path: u
  };
}
var tl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function rh(b) {
  return b && b.__esModule && Object.prototype.hasOwnProperty.call(b, "default") ? b.default : b;
}
var oh = class extends DataTextureLoader {
  constructor(i) {
    super(i), this.type = HalfFloatType;
  }
  // adapted from http://www.graphics.cornell.edu/~bjw/rgbe.html
  parse(i) {
    const h = function(V, D) {
      switch (V) {
        case 1:
          console.error("THREE.RGBELoader Read Error: " + (D || ""));
          break;
        case 2:
          console.error("THREE.RGBELoader Write Error: " + (D || ""));
          break;
        case 3:
          console.error("THREE.RGBELoader Bad File Format: " + (D || ""));
          break;
        default:
        case 4:
          console.error("THREE.RGBELoader: Error: " + (D || ""));
      }
      return -1;
    }, _ = `
`, y = function(V, D, Y) {
      D = D || 1024;
      let N = V.pos, O = -1, H = 0, K = "", q = String.fromCharCode.apply(null, new Uint16Array(V.subarray(N, N + 128)));
      for (; 0 > (O = q.indexOf(_)) && H < D && N < V.byteLength; )
        K += q, H += q.length, N += 128, q += String.fromCharCode.apply(null, new Uint16Array(V.subarray(N, N + 128)));
      return -1 < O ? (Y !== false && (V.pos += H + O + 1), K + q.slice(0, O)) : false;
    }, C = function(V) {
      const D = /^#\?(\S+)/, Y = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, G = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, N = /^\s*FORMAT=(\S+)\s*$/, O = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, H = {
        valid: 0,
        string: "",
        comments: "",
        programtype: "RGBE",
        format: "",
        gamma: 1,
        exposure: 1,
        width: 0,
        height: 0
        /* image dimensions, width/height */
      };
      let K, q;
      if (V.pos >= V.byteLength || !(K = y(V)))
        return h(1, "no header found");
      if (!(q = K.match(D)))
        return h(3, "bad initial token");
      for (H.valid |= 1, H.programtype = q[1], H.string += K + `
`; K = y(V), K !== false; ) {
        if (H.string += K + `
`, K.charAt(0) === "#") {
          H.comments += K + `
`;
          continue;
        }
        if ((q = K.match(Y)) && (H.gamma = parseFloat(q[1])), (q = K.match(G)) && (H.exposure = parseFloat(q[1])), (q = K.match(N)) && (H.valid |= 2, H.format = q[1]), (q = K.match(O)) && (H.valid |= 4, H.height = parseInt(q[1], 10), H.width = parseInt(q[2], 10)), H.valid & 2 && H.valid & 4)
          break;
      }
      return H.valid & 2 ? H.valid & 4 ? H : h(3, "missing image size specifier") : h(3, "missing format specifier");
    }, I = function(V, D, Y) {
      const G = D;
      if (
        // run length encoding is not allowed so read flat
        G < 8 || G > 32767 || // this file is not run length encoded
        V[0] !== 2 || V[1] !== 2 || V[2] & 128
      )
        return new Uint8Array(V);
      if (G !== (V[2] << 8 | V[3]))
        return h(3, "wrong scanline width");
      const N = new Uint8Array(4 * D * Y);
      if (!N.length)
        return h(4, "unable to allocate buffer space");
      let O = 0, H = 0;
      const K = 4 * G, q = new Uint8Array(4), he = new Uint8Array(K);
      let _e = Y;
      for (; _e > 0 && H < V.byteLength; ) {
        if (H + 4 > V.byteLength)
          return h(1);
        if (q[0] = V[H++], q[1] = V[H++], q[2] = V[H++], q[3] = V[H++], q[0] != 2 || q[1] != 2 || (q[2] << 8 | q[3]) != G)
          return h(3, "bad rgbe scanline format");
        let pe = 0, fe;
        for (; pe < K && H < V.byteLength; ) {
          fe = V[H++];
          const te = fe > 128;
          if (te && (fe -= 128), fe === 0 || pe + fe > K)
            return h(3, "bad scanline data");
          if (te) {
            const X = V[H++];
            for (let ke = 0; ke < fe; ke++)
              he[pe++] = X;
          } else
            he.set(V.subarray(H, H + fe), pe), pe += fe, H += fe;
        }
        const de = G;
        for (let te = 0; te < de; te++) {
          let X = 0;
          N[O] = he[te + X], X += G, N[O + 1] = he[te + X], X += G, N[O + 2] = he[te + X], X += G, N[O + 3] = he[te + X], O += 4;
        }
        _e--;
      }
      return N;
    }, S = function(V, D, Y, G) {
      const N = V[D + 3], O = Math.pow(2, N - 128) / 255;
      Y[G + 0] = V[D + 0] * O, Y[G + 1] = V[D + 1] * O, Y[G + 2] = V[D + 2] * O, Y[G + 3] = 1;
    }, R = function(V, D, Y, G) {
      const N = V[D + 3], O = Math.pow(2, N - 128) / 255;
      Y[G + 0] = DataUtils.toHalfFloat(Math.min(V[D + 0] * O, 65504)), Y[G + 1] = DataUtils.toHalfFloat(Math.min(V[D + 1] * O, 65504)), Y[G + 2] = DataUtils.toHalfFloat(Math.min(V[D + 2] * O, 65504)), Y[G + 3] = DataUtils.toHalfFloat(1);
    }, j = new Uint8Array(i);
    j.pos = 0;
    const F = C(j);
    if (F !== -1) {
      const V = F.width, D = F.height, Y = I(j.subarray(j.pos), V, D);
      if (Y !== -1) {
        let G, N, O;
        switch (this.type) {
          case FloatType:
            O = Y.length / 4;
            const H = new Float32Array(O * 4);
            for (let q = 0; q < O; q++)
              S(Y, q * 4, H, q * 4);
            G = H, N = FloatType;
            break;
          case HalfFloatType:
            O = Y.length / 4;
            const K = new Uint16Array(O * 4);
            for (let q = 0; q < O; q++)
              R(Y, q * 4, K, q * 4);
            G = K, N = HalfFloatType;
            break;
          default:
            console.error("THREE.RGBELoader: unsupported type: ", this.type);
            break;
        }
        return {
          width: V,
          height: D,
          data: G,
          header: F.string,
          gamma: F.gamma,
          exposure: F.exposure,
          type: N
        };
      }
    }
    return null;
  }
  setDataType(i) {
    return this.type = i, this;
  }
  load(i, r, s, a) {
    function c(u, h) {
      switch (u.type) {
        case FloatType:
        case HalfFloatType:
          u.encoding = LinearEncoding, u.minFilter = LinearFilter, u.magFilter = LinearFilter, u.generateMipmaps = false, u.flipY = true;
          break;
      }
      r && r(u, h);
    }
    return super.load(i, c, s, a);
  }
};
var to = /* @__PURE__ */ new WeakMap();
var ah = class extends Loader {
  constructor(i) {
    super(i), this.decoderPath = "", this.decoderConfig = {}, this.decoderBinary = null, this.decoderPending = null, this.workerLimit = 4, this.workerPool = [], this.workerNextTaskID = 1, this.workerSourceURL = "", this.defaultAttributeIDs = {
      position: "POSITION",
      normal: "NORMAL",
      color: "COLOR",
      uv: "TEX_COORD"
    }, this.defaultAttributeTypes = {
      position: "Float32Array",
      normal: "Float32Array",
      color: "Float32Array",
      uv: "Float32Array"
    };
  }
  setDecoderPath(i) {
    return this.decoderPath = i, this;
  }
  setDecoderConfig(i) {
    return this.decoderConfig = i, this;
  }
  setWorkerLimit(i) {
    return this.workerLimit = i, this;
  }
  load(i, r, s, a) {
    const c = new FileLoader(this.manager);
    c.setPath(this.path), c.setResponseType("arraybuffer"), c.setRequestHeader(this.requestHeader), c.setWithCredentials(this.withCredentials), c.load(i, (u) => {
      const h = {
        attributeIDs: this.defaultAttributeIDs,
        attributeTypes: this.defaultAttributeTypes,
        useUniqueIDs: false
      };
      this.decodeGeometry(u, h).then(r).catch(a);
    }, s, a);
  }
  /** @deprecated Kept for backward-compatibility with previous DRACOLoader versions. */
  decodeDracoFile(i, r, s, a) {
    const c = {
      attributeIDs: s || this.defaultAttributeIDs,
      attributeTypes: a || this.defaultAttributeTypes,
      useUniqueIDs: !!s
    };
    this.decodeGeometry(i, c).then(r);
  }
  decodeGeometry(i, r) {
    for (const m in r.attributeTypes) {
      const g = r.attributeTypes[m];
      g.BYTES_PER_ELEMENT !== void 0 && (r.attributeTypes[m] = g.name);
    }
    const s = JSON.stringify(r);
    if (to.has(i)) {
      const m = to.get(i);
      if (m.key === s)
        return m.promise;
      if (i.byteLength === 0)
        throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.");
    }
    let a;
    const c = this.workerNextTaskID++, u = i.byteLength, h = this._getWorker(c, u).then((m) => (a = m, new Promise((g, w) => {
      a._callbacks[c] = {
        resolve: g,
        reject: w
      }, a.postMessage({
        type: "decode",
        id: c,
        taskConfig: r,
        buffer: i
      }, [i]);
    }))).then((m) => this._createGeometry(m.geometry));
    return h.catch(() => true).then(() => {
      a && c && this._releaseTask(a, c);
    }), to.set(i, {
      key: s,
      promise: h
    }), h;
  }
  _createGeometry(i) {
    const r = new BufferGeometry();
    i.index && r.setIndex(new BufferAttribute(i.index.array, 1));
    for (let s = 0; s < i.attributes.length; s++) {
      const a = i.attributes[s], c = a.name, u = a.array, h = a.itemSize;
      r.setAttribute(c, new BufferAttribute(u, h));
    }
    return r;
  }
  _loadLibrary(i, r) {
    const s = new FileLoader(this.manager);
    return s.setPath(this.decoderPath), s.setResponseType(r), s.setWithCredentials(this.withCredentials), new Promise((a, c) => {
      s.load(i, a, void 0, c);
    });
  }
  preload() {
    return this._initDecoder(), this;
  }
  _initDecoder() {
    if (this.decoderPending)
      return this.decoderPending;
    const i = typeof WebAssembly != "object" || this.decoderConfig.type === "js", r = [];
    return i ? r.push(this._loadLibrary("draco_decoder.js", "text")) : (r.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), r.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(r).then((s) => {
      const a = s[0];
      i || (this.decoderConfig.wasmBinary = s[1]);
      const c = lh.toString(), u = ["/* draco decoder */", a, "", "/* worker */", c.substring(c.indexOf("{") + 1, c.lastIndexOf("}"))].join(`
`);
      this.workerSourceURL = URL.createObjectURL(new Blob([u]));
    }), this.decoderPending;
  }
  _getWorker(i, r) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const a = new Worker(this.workerSourceURL);
        a._callbacks = {}, a._taskCosts = {}, a._taskLoad = 0, a.postMessage({
          type: "init",
          decoderConfig: this.decoderConfig
        }), a.onmessage = function(c) {
          const u = c.data;
          switch (u.type) {
            case "decode":
              a._callbacks[u.id].resolve(u);
              break;
            case "error":
              a._callbacks[u.id].reject(u);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + u.type + '"');
          }
        }, this.workerPool.push(a);
      } else
        this.workerPool.sort(function(a, c) {
          return a._taskLoad > c._taskLoad ? -1 : 1;
        });
      const s = this.workerPool[this.workerPool.length - 1];
      return s._taskCosts[i] = r, s._taskLoad += r, s;
    });
  }
  _releaseTask(i, r) {
    i._taskLoad -= i._taskCosts[r], delete i._callbacks[r], delete i._taskCosts[r];
  }
  debug() {
    console.log("Task load: ", this.workerPool.map((i) => i._taskLoad));
  }
  dispose() {
    for (let i = 0; i < this.workerPool.length; ++i)
      this.workerPool[i].terminate();
    return this.workerPool.length = 0, this;
  }
};
function lh() {
  let b, i;
  onmessage = function(u) {
    const h = u.data;
    switch (h.type) {
      case "init":
        b = h.decoderConfig, i = new Promise(function(w) {
          b.onModuleLoaded = function(_) {
            w({
              draco: _
            });
          }, DracoDecoderModule(b);
        });
        break;
      case "decode":
        const m = h.buffer, g = h.taskConfig;
        i.then((w) => {
          const _ = w.draco, y = new _.Decoder(), C = new _.DecoderBuffer();
          C.Init(new Int8Array(m), m.byteLength);
          try {
            const I = r(_, y, C, g), S = I.attributes.map((R) => R.array.buffer);
            I.index && S.push(I.index.array.buffer), self.postMessage({
              type: "decode",
              id: h.id,
              geometry: I
            }, S);
          } catch (I) {
            console.error(I), self.postMessage({
              type: "error",
              id: h.id,
              error: I.message
            });
          } finally {
            _.destroy(C), _.destroy(y);
          }
        });
        break;
    }
  };
  function r(u, h, m, g) {
    const w = g.attributeIDs, _ = g.attributeTypes;
    let y, C;
    const I = h.GetEncodedGeometryType(m);
    if (I === u.TRIANGULAR_MESH)
      y = new u.Mesh(), C = h.DecodeBufferToMesh(m, y);
    else if (I === u.POINT_CLOUD)
      y = new u.PointCloud(), C = h.DecodeBufferToPointCloud(m, y);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!C.ok() || y.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + C.error_msg());
    const S = {
      index: null,
      attributes: []
    };
    for (const R in w) {
      const j = self[_[R]];
      let F, V;
      if (g.useUniqueIDs)
        V = w[R], F = h.GetAttributeByUniqueId(y, V);
      else {
        if (V = h.GetAttributeId(y, u[w[R]]), V === -1)
          continue;
        F = h.GetAttribute(y, V);
      }
      S.attributes.push(a(u, h, y, R, j, F));
    }
    return I === u.TRIANGULAR_MESH && (S.index = s(u, h, y)), u.destroy(y), S;
  }
  function s(u, h, m) {
    const w = m.num_faces() * 3, _ = w * 4, y = u._malloc(_);
    h.GetTrianglesUInt32Array(m, _, y);
    const C = new Uint32Array(u.HEAPF32.buffer, y, w).slice();
    return u._free(y), {
      array: C,
      itemSize: 1
    };
  }
  function a(u, h, m, g, w, _) {
    const y = _.num_components(), I = m.num_points() * y, S = I * w.BYTES_PER_ELEMENT, R = c(u, w), j = u._malloc(S);
    h.GetAttributeDataArrayForAllPoints(m, _, R, S, j);
    const F = new w(u.HEAPF32.buffer, j, I).slice();
    return u._free(j), {
      name: g,
      array: F,
      itemSize: y
    };
  }
  function c(u, h) {
    switch (h) {
      case Float32Array:
        return u.DT_FLOAT32;
      case Int8Array:
        return u.DT_INT8;
      case Int16Array:
        return u.DT_INT16;
      case Int32Array:
        return u.DT_INT32;
      case Uint8Array:
        return u.DT_UINT8;
      case Uint16Array:
        return u.DT_UINT16;
      case Uint32Array:
        return u.DT_UINT32;
    }
  }
}
function Nn() {
  const b = inject("extend") || (() => {
    console.warn("No extend function provided");
  }), { state: i, setState: r } = inject("useTres", $());
  return {
    state: i,
    setState: r,
    extend: b
  };
}
var Nh = defineComponent({
  __name: "OrbitControls",
  props: {
    makeDefault: { type: Boolean, default: false },
    camera: null,
    domElement: null,
    target: null,
    enableDamping: { type: Boolean }
  },
  setup(b) {
    const i = b, { state: r, setState: s, extend: a } = Nn(), c = ref(null);
    return a({ OrbitControls: ru }), watch(c, (u) => {
      u && i.makeDefault ? s("controls", u) : s("controls", null);
    }), (u, h) => {
      var g;
      const m = resolveComponent("TresOrbitControls");
      return unref(r).camera && unref(r).renderer ? (openBlock(), createBlock(m, {
        key: 0,
        ref_key: "controls",
        ref: c,
        args: [unref(unref(r).camera), (g = unref(r).renderer) == null ? void 0 : g.domElement],
        "enabling-dampling": b.enableDamping
      }, null, 8, ["args", "enabling-dampling"])) : createCommentVNode("", true);
    };
  }
});
function ch(b, i) {
  const r = {};
  for (const s of i)
    Object.prototype.hasOwnProperty.call(b, s) && (r[s] = b[s]);
  return r;
}
function ph(b, i) {
  const r = `set${i[0].toUpperCase()}${i.slice(1)}`;
  return b[r] !== void 0;
}
var Fh = defineComponent({
  __name: "TransformControls",
  props: {
    object: null,
    mode: null,
    enabled: { type: Boolean, default: true },
    axis: null,
    translationSnap: null,
    rotationSnap: null,
    scaleSnap: null,
    space: null,
    size: null,
    showX: { type: Boolean },
    showY: { type: Boolean },
    showZ: { type: Boolean }
  },
  emits: ["dragging", "change", "mouseDown", "mouseUp", "objectChange"],
  setup(b, { emit: i }) {
    const r = b;
    let s = shallowRef();
    const { state: a } = Nn(), c = computed(
      () => ch(r, [
        "enabled",
        "axis",
        "mode",
        "translationSnap",
        "rotationSnap",
        "scaleSnap",
        "space",
        "size",
        "showX",
        "showY",
        "showZ"
      ])
    ), u = () => i("change", s.value), h = () => i("mouseDown", s.value), m = () => i("mouseUp", s.value), g = () => i("objectChange", s.value), w = (y) => {
      a.controls && (a.controls.enabled = !y.value), i("dragging", y.value);
    };
    function _(y) {
      y.addEventListener("dragging-changed", w), y.addEventListener("change", u), y.addEventListener("mouseDown", h), y.addEventListener("mouseUp", m), y.addEventListener("objectChange", g);
    }
    return watch(
      () => r.object,
      () => {
        a.camera && a.renderer && a.scene && r.object && (s.value = new nu(a.camera, unref(a.renderer).domElement), s.value.attach(unref(r.object)), a.scene.add(unref(s)), _(unref(s)));
      },
      {
        deep: true
      }
    ), watch(
      [c, s],
      // TODO: properly type this
      ([y, C]) => {
        if (y && C)
          for (const I in y)
            if (!ph(C, I))
              C[I] = y[I];
            else {
              const S = `set${I[0].toUpperCase()}${I.slice(1)}`;
              typeof C[S] == "function" && y[I] !== void 0 && C[S](y[I]);
            }
      },
      {
        immediate: true
      }
    ), onUnmounted(() => {
      s.value && (s.value.removeEventListener("dragging-changed", w), s.value.removeEventListener("change", u), s.value.removeEventListener("mouseDown", h), s.value.removeEventListener("mouseUp", m), s.value.removeEventListener("objectChange", g));
    }), (y, C) => renderSlot(y.$slots, "default");
  }
});
var wa;
var nl = typeof window < "u";
var uh = (b) => typeof b == "string";
var hh = () => {
};
nl && ((wa = window == null ? void 0 : window.navigator) != null && wa.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function il(b) {
  return typeof b == "function" ? b() : unref(b);
}
function dh(b) {
  return b;
}
function mh(b) {
  return getCurrentScope() ? (onScopeDispose(b), true) : false;
}
function fh(b, i = true) {
  getCurrentInstance() ? onMounted(b) : i ? b() : nextTick(b);
}
function vh(b) {
  var i;
  const r = il(b);
  return (i = r == null ? void 0 : r.$el) != null ? i : r;
}
var yo = nl ? window : void 0;
function Rn(...b) {
  let i, r, s, a;
  if (uh(b[0]) || Array.isArray(b[0]) ? ([r, s, a] = b, i = yo) : [i, r, s, a] = b, !i)
    return hh;
  Array.isArray(r) || (r = [r]), Array.isArray(s) || (s = [s]);
  const c = [], u = () => {
    c.forEach((w) => w()), c.length = 0;
  }, h = (w, _, y, C) => (w.addEventListener(_, y, C), () => w.removeEventListener(_, y, C)), m = watch(() => [vh(i), il(a)], ([w, _]) => {
    u(), w && c.push(...r.flatMap((y) => s.map((C) => h(w, y, C, _))));
  }, { immediate: true, flush: "post" }), g = () => {
    m(), u();
  };
  return mh(g), g;
}
var mo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var fo = "__vueuse_ssr_handlers__";
mo[fo] = mo[fo] || {};
mo[fo];
function bh(b = {}) {
  const {
    type: i = "page",
    touch: r = true,
    resetOnTouchEnds: s = false,
    initialValue: a = { x: 0, y: 0 },
    window: c = yo,
    eventFilter: u
  } = b, h = ref(a.x), m = ref(a.y), g = ref(null), w = (S) => {
    i === "page" ? (h.value = S.pageX, m.value = S.pageY) : i === "client" ? (h.value = S.clientX, m.value = S.clientY) : i === "movement" && (h.value = S.movementX, m.value = S.movementY), g.value = "mouse";
  }, _ = () => {
    h.value = a.x, m.value = a.y;
  }, y = (S) => {
    if (S.touches.length > 0) {
      const R = S.touches[0];
      i === "page" ? (h.value = R.pageX, m.value = R.pageY) : i === "client" && (h.value = R.clientX, m.value = R.clientY), g.value = "touch";
    }
  }, C = (S) => u === void 0 ? w(S) : u(() => w(S), {}), I = (S) => u === void 0 ? y(S) : u(() => y(S), {});
  return c && (Rn(c, "mousemove", C, { passive: true }), Rn(c, "dragover", C, { passive: true }), r && i !== "movement" && (Rn(c, "touchstart", I, { passive: true }), Rn(c, "touchmove", I, { passive: true }), s && Rn(c, "touchend", _, { passive: true }))), {
    x: h,
    y: m,
    sourceType: g
  };
}
var ya;
(function(b) {
  b.UP = "UP", b.RIGHT = "RIGHT", b.DOWN = "DOWN", b.LEFT = "LEFT", b.NONE = "NONE";
})(ya || (ya = {}));
var gh = Object.defineProperty;
var xa = Object.getOwnPropertySymbols;
var _h = Object.prototype.hasOwnProperty;
var wh = Object.prototype.propertyIsEnumerable;
var Ea = (b, i, r) => i in b ? gh(b, i, { enumerable: true, configurable: true, writable: true, value: r }) : b[i] = r;
var yh = (b, i) => {
  for (var r in i || (i = {}))
    _h.call(i, r) && Ea(b, r, i[r]);
  if (xa)
    for (var r of xa(i))
      wh.call(i, r) && Ea(b, r, i[r]);
  return b;
};
var xh = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
yh({
  linear: dh
}, xh);
function Eh(b = {}) {
  const {
    window: i = yo,
    initialWidth: r = 1 / 0,
    initialHeight: s = 1 / 0,
    listenOrientation: a = true,
    includeScrollbar: c = true
  } = b, u = ref(r), h = ref(s), m = () => {
    i && (c ? (u.value = i.innerWidth, h.value = i.innerHeight) : (u.value = i.document.documentElement.clientWidth, h.value = i.document.documentElement.clientHeight));
  };
  return m(), fh(m), Rn("resize", m, { passive: true }), a && Rn("orientationchange", m, { passive: true }), { width: u, height: h };
}
var Ca = "[TresJS - Cientos ▲ ■ ♥] ";
function Ch() {
  function b(s, a) {
    console.error(`${Ca} ${s}`, a || "");
  }
  function i(s) {
    console.warn(`${Ca} ${s}`);
  }
  function r(s, a) {
  }
  return {
    logError: b,
    logWarning: i,
    logMessage: r
  };
}
function Ph(b = false, i = 5, r) {
  const { x: s, y: a } = bh(), { logWarning: c } = Ch(), { width: u, height: h } = Eh(), m = computed(() => (s.value / u.value - 0.5) * i), g = computed(() => -(a.value / h.value - 0.5) * i);
  if (r) {
    const { x: w, y: _ } = r.position;
    watchEffect(() => {
      b || r && (r.position.x = w + m.value, r.position.y = _ + g.value);
    });
  } else
    c("Scene must contain a Camera component to use this composable");
}
var Bh = defineComponent({
  name: "PamCameraMouse",
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    factor: {
      type: Number,
      required: false,
      default: 5
    }
  },
  setup(b) {
    const { state: i } = Nn(), r = i == null ? void 0 : i.camera;
    return Ph(b.disabled, b.factor, r), () => {
    };
  }
});
var zs = {};
var Th = {
  get exports() {
    return zs;
  },
  set exports(b) {
    zs = b;
  }
};
(function(b, i) {
  (function(r, s) {
    s(i);
  })(tl, function(r) {
    class s {
      /**
       * @hidden
       */
      constructor(e) {
        const [t, l] = e.split("-"), v = t.split(".");
        this.major = parseInt(v[0], 10), this.minor = parseInt(v[1], 10), this.patch = parseInt(v[2], 10), this.prerelease = l ?? null;
      }
      toString() {
        const e = [this.major, this.minor, this.patch].join(".");
        return this.prerelease !== null ? [e, this.prerelease].join("-") : e;
      }
    }
    class a {
      constructor(e) {
        this.controller_ = e;
      }
      get element() {
        return this.controller_.view.element;
      }
      get disabled() {
        return this.controller_.viewProps.get("disabled");
      }
      set disabled(e) {
        this.controller_.viewProps.set("disabled", e);
      }
      get hidden() {
        return this.controller_.viewProps.get("hidden");
      }
      set hidden(e) {
        this.controller_.viewProps.set("hidden", e);
      }
      dispose() {
        this.controller_.viewProps.set("disposed", true);
      }
    }
    class c {
      constructor(e) {
        this.target = e;
      }
    }
    class u extends c {
      constructor(e, t, l, v) {
        super(e), this.value = t, this.presetKey = l, this.last = v ?? true;
      }
    }
    class h extends c {
      constructor(e, t, l) {
        super(e), this.value = t, this.presetKey = l;
      }
    }
    class m extends c {
      constructor(e, t) {
        super(e), this.expanded = t;
      }
    }
    class g extends c {
      constructor(e, t) {
        super(e), this.index = t;
      }
    }
    function w(n) {
      return n;
    }
    function _(n) {
      return n == null;
    }
    function y(n, e) {
      if (n.length !== e.length)
        return false;
      for (let t = 0; t < n.length; t++)
        if (n[t] !== e[t])
          return false;
      return true;
    }
    function C(n, e) {
      let t = n;
      do {
        const l = Object.getOwnPropertyDescriptor(t, e);
        if (l && (l.set !== void 0 || l.writable === true))
          return true;
        t = Object.getPrototypeOf(t);
      } while (t !== null);
      return false;
    }
    const I = {
      alreadydisposed: () => "View has been already disposed",
      invalidparams: (n) => `Invalid parameters for '${n.name}'`,
      nomatchingcontroller: (n) => `No matching controller for '${n.key}'`,
      nomatchingview: (n) => `No matching view for '${JSON.stringify(n.params)}'`,
      notbindable: () => "Value is not bindable",
      propertynotfound: (n) => `Property '${n.name}' not found`,
      shouldneverhappen: () => "This error should never happen"
    };
    class S {
      constructor(e) {
        var t;
        this.message = (t = I[e.type](e.context)) !== null && t !== void 0 ? t : "Unexpected error", this.name = this.constructor.name, this.stack = new Error(this.message).stack, this.type = e.type;
      }
      static alreadyDisposed() {
        return new S({ type: "alreadydisposed" });
      }
      static notBindable() {
        return new S({
          type: "notbindable"
        });
      }
      static propertyNotFound(e) {
        return new S({
          type: "propertynotfound",
          context: {
            name: e
          }
        });
      }
      static shouldNeverHappen() {
        return new S({ type: "shouldneverhappen" });
      }
    }
    class R {
      constructor(e, t, l) {
        this.obj_ = e, this.key_ = t, this.presetKey_ = l ?? t;
      }
      static isBindable(e) {
        return !(e === null || typeof e != "object");
      }
      get key() {
        return this.key_;
      }
      get presetKey() {
        return this.presetKey_;
      }
      read() {
        return this.obj_[this.key_];
      }
      write(e) {
        this.obj_[this.key_] = e;
      }
      writeProperty(e, t) {
        const l = this.read();
        if (!R.isBindable(l))
          throw S.notBindable();
        if (!(e in l))
          throw S.propertyNotFound(e);
        l[e] = t;
      }
    }
    class j extends a {
      get label() {
        return this.controller_.props.get("label");
      }
      set label(e) {
        this.controller_.props.set("label", e);
      }
      get title() {
        var e;
        return (e = this.controller_.valueController.props.get("title")) !== null && e !== void 0 ? e : "";
      }
      set title(e) {
        this.controller_.valueController.props.set("title", e);
      }
      on(e, t) {
        const l = t.bind(this);
        return this.controller_.valueController.emitter.on(e, () => {
          l(new c(this));
        }), this;
      }
    }
    class F {
      constructor() {
        this.observers_ = {};
      }
      on(e, t) {
        let l = this.observers_[e];
        return l || (l = this.observers_[e] = []), l.push({
          handler: t
        }), this;
      }
      off(e, t) {
        const l = this.observers_[e];
        return l && (this.observers_[e] = l.filter((v) => v.handler !== t)), this;
      }
      emit(e, t) {
        const l = this.observers_[e];
        l && l.forEach((v) => {
          v.handler(t);
        });
      }
    }
    const V = "tp";
    function D(n) {
      return (t, l) => [
        V,
        "-",
        n,
        "v",
        t ? `_${t}` : "",
        l ? `-${l}` : ""
      ].join("");
    }
    function Y(n, e) {
      return (t) => e(n(t));
    }
    function G(n) {
      return n.rawValue;
    }
    function N(n, e) {
      n.emitter.on("change", Y(G, e)), e(n.rawValue);
    }
    function O(n, e, t) {
      N(n.value(e), t);
    }
    function H(n, e, t) {
      t ? n.classList.add(e) : n.classList.remove(e);
    }
    function K(n, e) {
      return (t) => {
        H(n, e, t);
      };
    }
    function q(n, e) {
      N(n, (t) => {
        e.textContent = t ?? "";
      });
    }
    const he = D("btn");
    class _e {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(he()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("button");
        l.classList.add(he("b")), t.viewProps.bindDisabled(l), this.element.appendChild(l), this.buttonElement = l;
        const v = e.createElement("div");
        v.classList.add(he("t")), q(t.props.value("title"), v), this.buttonElement.appendChild(v);
      }
    }
    class pe {
      constructor(e, t) {
        this.emitter = new F(), this.onClick_ = this.onClick_.bind(this), this.props = t.props, this.viewProps = t.viewProps, this.view = new _e(e, {
          props: this.props,
          viewProps: this.viewProps
        }), this.view.buttonElement.addEventListener("click", this.onClick_);
      }
      onClick_() {
        this.emitter.emit("click", {
          sender: this
        });
      }
    }
    class fe {
      constructor(e, t) {
        var l;
        this.constraint_ = t == null ? void 0 : t.constraint, this.equals_ = (l = t == null ? void 0 : t.equals) !== null && l !== void 0 ? l : (v, E) => v === E, this.emitter = new F(), this.rawValue_ = e;
      }
      get constraint() {
        return this.constraint_;
      }
      get rawValue() {
        return this.rawValue_;
      }
      set rawValue(e) {
        this.setRawValue(e, {
          forceEmit: false,
          last: true
        });
      }
      setRawValue(e, t) {
        const l = t ?? {
          forceEmit: false,
          last: true
        }, v = this.constraint_ ? this.constraint_.constrain(e) : e, E = this.rawValue_;
        this.equals_(E, v) && !l.forceEmit || (this.emitter.emit("beforechange", {
          sender: this
        }), this.rawValue_ = v, this.emitter.emit("change", {
          options: l,
          previousRawValue: E,
          rawValue: v,
          sender: this
        }));
      }
    }
    class de {
      constructor(e) {
        this.emitter = new F(), this.value_ = e;
      }
      get rawValue() {
        return this.value_;
      }
      set rawValue(e) {
        this.setRawValue(e, {
          forceEmit: false,
          last: true
        });
      }
      setRawValue(e, t) {
        const l = t ?? {
          forceEmit: false,
          last: true
        }, v = this.value_;
        v === e && !l.forceEmit || (this.emitter.emit("beforechange", {
          sender: this
        }), this.value_ = e, this.emitter.emit("change", {
          options: l,
          previousRawValue: v,
          rawValue: this.value_,
          sender: this
        }));
      }
    }
    function te(n, e) {
      const t = e == null ? void 0 : e.constraint, l = e == null ? void 0 : e.equals;
      return !t && !l ? new de(n) : new fe(n, e);
    }
    class X {
      constructor(e) {
        this.emitter = new F(), this.valMap_ = e;
        for (const t in this.valMap_)
          this.valMap_[t].emitter.on("change", () => {
            this.emitter.emit("change", {
              key: t,
              sender: this
            });
          });
      }
      static createCore(e) {
        return Object.keys(e).reduce((l, v) => Object.assign(l, {
          [v]: te(e[v])
        }), {});
      }
      static fromObject(e) {
        const t = this.createCore(e);
        return new X(t);
      }
      get(e) {
        return this.valMap_[e].rawValue;
      }
      set(e, t) {
        this.valMap_[e].rawValue = t;
      }
      value(e) {
        return this.valMap_[e];
      }
    }
    function ke(n, e) {
      const l = Object.keys(e).reduce((v, E) => {
        if (v === void 0)
          return;
        const k = e[E], B = k(n[E]);
        return B.succeeded ? Object.assign(Object.assign({}, v), { [E]: B.value }) : void 0;
      }, {});
      return l;
    }
    function ve(n, e) {
      return n.reduce((t, l) => {
        if (t === void 0)
          return;
        const v = e(l);
        if (!(!v.succeeded || v.value === void 0))
          return [...t, v.value];
      }, []);
    }
    function le(n) {
      return n === null ? false : typeof n == "object";
    }
    function ie(n) {
      return (e) => (t) => {
        if (!e && t === void 0)
          return {
            succeeded: false,
            value: void 0
          };
        if (e && t === void 0)
          return {
            succeeded: true,
            value: void 0
          };
        const l = n(t);
        return l !== void 0 ? {
          succeeded: true,
          value: l
        } : {
          succeeded: false,
          value: void 0
        };
      };
    }
    function ge(n) {
      return {
        custom: (e) => ie(e)(n),
        boolean: ie((e) => typeof e == "boolean" ? e : void 0)(n),
        number: ie((e) => typeof e == "number" ? e : void 0)(n),
        string: ie((e) => typeof e == "string" ? e : void 0)(n),
        function: ie((e) => typeof e == "function" ? e : void 0)(n),
        constant: (e) => ie((t) => t === e ? e : void 0)(n),
        raw: ie((e) => e)(n),
        object: (e) => ie((t) => {
          if (le(t))
            return ke(t, e);
        })(n),
        array: (e) => ie((t) => {
          if (Array.isArray(t))
            return ve(t, e);
        })(n)
      };
    }
    const M = {
      optional: ge(true),
      required: ge(false)
    };
    function ce(n, e) {
      const t = M.required.object(e)(n);
      return t.succeeded ? t.value : void 0;
    }
    function Oe(n) {
      console.warn([
        `Missing '${n.key}' of ${n.target} in ${n.place}.`,
        "Please rebuild plugins with the latest core package."
      ].join(" "));
    }
    function je(n) {
      return n && n.parentElement && n.parentElement.removeChild(n), null;
    }
    class ye {
      constructor(e) {
        this.value_ = e;
      }
      static create(e) {
        return [
          new ye(e),
          (t, l) => {
            e.setRawValue(t, l);
          }
        ];
      }
      get emitter() {
        return this.value_.emitter;
      }
      get rawValue() {
        return this.value_.rawValue;
      }
    }
    const st = D("");
    function Fn(n, e) {
      return K(n, st(void 0, e));
    }
    class Qe extends X {
      constructor(e) {
        var t;
        super(e), this.onDisabledChange_ = this.onDisabledChange_.bind(this), this.onParentChange_ = this.onParentChange_.bind(this), this.onParentGlobalDisabledChange_ = this.onParentGlobalDisabledChange_.bind(this), [this.globalDisabled_, this.setGlobalDisabled_] = ye.create(te(this.getGlobalDisabled_())), this.value("disabled").emitter.on("change", this.onDisabledChange_), this.value("parent").emitter.on("change", this.onParentChange_), (t = this.get("parent")) === null || t === void 0 || t.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_);
      }
      static create(e) {
        var t, l, v;
        const E = e ?? {};
        return new Qe(X.createCore({
          disabled: (t = E.disabled) !== null && t !== void 0 ? t : false,
          disposed: false,
          hidden: (l = E.hidden) !== null && l !== void 0 ? l : false,
          parent: (v = E.parent) !== null && v !== void 0 ? v : null
        }));
      }
      get globalDisabled() {
        return this.globalDisabled_;
      }
      bindClassModifiers(e) {
        N(this.globalDisabled_, Fn(e, "disabled")), O(this, "hidden", Fn(e, "hidden"));
      }
      bindDisabled(e) {
        N(this.globalDisabled_, (t) => {
          e.disabled = t;
        });
      }
      bindTabIndex(e) {
        N(this.globalDisabled_, (t) => {
          e.tabIndex = t ? -1 : 0;
        });
      }
      handleDispose(e) {
        this.value("disposed").emitter.on("change", (t) => {
          t && e();
        });
      }
      getGlobalDisabled_() {
        const e = this.get("parent");
        return (e ? e.globalDisabled.rawValue : false) || this.get("disabled");
      }
      updateGlobalDisabled_() {
        this.setGlobalDisabled_(this.getGlobalDisabled_());
      }
      onDisabledChange_() {
        this.updateGlobalDisabled_();
      }
      onParentGlobalDisabledChange_() {
        this.updateGlobalDisabled_();
      }
      onParentChange_(e) {
        var t;
        const l = e.previousRawValue;
        l == null || l.globalDisabled.emitter.off("change", this.onParentGlobalDisabledChange_), (t = this.get("parent")) === null || t === void 0 || t.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_), this.updateGlobalDisabled_();
      }
    }
    function Bn() {
      return ["veryfirst", "first", "last", "verylast"];
    }
    const on = D(""), mt = {
      veryfirst: "vfst",
      first: "fst",
      last: "lst",
      verylast: "vlst"
    };
    class At {
      constructor(e) {
        this.parent_ = null, this.blade = e.blade, this.view = e.view, this.viewProps = e.viewProps;
        const t = this.view.element;
        this.blade.value("positions").emitter.on("change", () => {
          Bn().forEach((l) => {
            t.classList.remove(on(void 0, mt[l]));
          }), this.blade.get("positions").forEach((l) => {
            t.classList.add(on(void 0, mt[l]));
          });
        }), this.viewProps.handleDispose(() => {
          je(t);
        });
      }
      get parent() {
        return this.parent_;
      }
      set parent(e) {
        if (this.parent_ = e, !("parent" in this.viewProps.valMap_)) {
          Oe({
            key: "parent",
            target: Qe.name,
            place: "BladeController.parent"
          });
          return;
        }
        this.viewProps.set("parent", this.parent_ ? this.parent_.viewProps : null);
      }
    }
    const He = "http://www.w3.org/2000/svg";
    function rt(n) {
      n.offsetHeight;
    }
    function an(n, e) {
      const t = n.style.transition;
      n.style.transition = "none", e(), n.style.transition = t;
    }
    function ft(n) {
      return n.ontouchstart !== void 0;
    }
    function jn() {
      return globalThis;
    }
    function ui() {
      return jn().document;
    }
    function zn(n) {
      const e = n.ownerDocument.defaultView;
      return e && "document" in e ? n.getContext("2d", {
        willReadFrequently: true
      }) : null;
    }
    const Un = {
      check: '<path d="M2 8l4 4l8 -8"/>',
      dropdown: '<path d="M5 7h6l-3 3 z"/>',
      p2dpad: '<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'
    };
    function xt(n, e) {
      const t = n.createElementNS(He, "svg");
      return t.innerHTML = Un[e], t;
    }
    function Lt(n, e, t) {
      n.insertBefore(e, n.children[t]);
    }
    function Gn(n) {
      n.parentElement && n.parentElement.removeChild(n);
    }
    function ln(n) {
      for (; n.children.length > 0; )
        n.removeChild(n.children[0]);
    }
    function Hn(n) {
      for (; n.childNodes.length > 0; )
        n.removeChild(n.childNodes[0]);
    }
    function Et(n) {
      return n.relatedTarget ? n.relatedTarget : "explicitOriginalTarget" in n ? n.explicitOriginalTarget : null;
    }
    const vt = D("lbl");
    function Rt(n, e) {
      const t = n.createDocumentFragment();
      return e.split(`
`).map((v) => n.createTextNode(v)).forEach((v, E) => {
        E > 0 && t.appendChild(n.createElement("br")), t.appendChild(v);
      }), t;
    }
    class A {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(vt()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(vt("l")), O(t.props, "label", (E) => {
          _(E) ? this.element.classList.add(vt(void 0, "nol")) : (this.element.classList.remove(vt(void 0, "nol")), Hn(l), l.appendChild(Rt(e, E)));
        }), this.element.appendChild(l), this.labelElement = l;
        const v = e.createElement("div");
        v.classList.add(vt("v")), this.element.appendChild(v), this.valueElement = v;
      }
    }
    class U extends At {
      constructor(e, t) {
        const l = t.valueController.viewProps;
        super(Object.assign(Object.assign({}, t), { view: new A(e, {
          props: t.props,
          viewProps: l
        }), viewProps: l })), this.props = t.props, this.valueController = t.valueController, this.view.valueElement.appendChild(this.valueController.view.element);
      }
    }
    const J = {
      id: "button",
      type: "blade",
      accept(n) {
        const e = M, t = ce(n, {
          title: e.required.string,
          view: e.required.constant("button"),
          label: e.optional.string
        });
        return t ? { params: t } : null;
      },
      controller(n) {
        return new U(n.document, {
          blade: n.blade,
          props: X.fromObject({
            label: n.params.label
          }),
          valueController: new pe(n.document, {
            props: X.fromObject({
              title: n.params.title
            }),
            viewProps: n.viewProps
          })
        });
      },
      api(n) {
        return !(n.controller instanceof U) || !(n.controller.valueController instanceof pe) ? null : new j(n.controller);
      }
    };
    class se extends At {
      constructor(e) {
        super(e), this.value = e.value;
      }
    }
    function xe() {
      return new X({
        positions: te([], {
          equals: y
        })
      });
    }
    class Ne extends X {
      constructor(e) {
        super(e);
      }
      static create(e) {
        const t = {
          completed: true,
          expanded: e,
          expandedHeight: null,
          shouldFixHeight: false,
          temporaryExpanded: null
        }, l = X.createCore(t);
        return new Ne(l);
      }
      get styleExpanded() {
        var e;
        return (e = this.get("temporaryExpanded")) !== null && e !== void 0 ? e : this.get("expanded");
      }
      get styleHeight() {
        if (!this.styleExpanded)
          return "0";
        const e = this.get("expandedHeight");
        return this.get("shouldFixHeight") && !_(e) ? `${e}px` : "auto";
      }
      bindExpandedClass(e, t) {
        const l = () => {
          this.styleExpanded ? e.classList.add(t) : e.classList.remove(t);
        };
        O(this, "expanded", l), O(this, "temporaryExpanded", l);
      }
      cleanUpTransition() {
        this.set("shouldFixHeight", false), this.set("expandedHeight", null), this.set("completed", true);
      }
    }
    function Ut(n, e) {
      let t = 0;
      return an(e, () => {
        n.set("expandedHeight", null), n.set("temporaryExpanded", true), rt(e), t = e.clientHeight, n.set("temporaryExpanded", null), rt(e);
      }), t;
    }
    function cn(n, e) {
      e.style.height = n.styleHeight;
    }
    function Ke(n, e) {
      n.value("expanded").emitter.on("beforechange", () => {
        n.set("completed", false), _(n.get("expandedHeight")) && n.set("expandedHeight", Ut(n, e)), n.set("shouldFixHeight", true), rt(e);
      }), n.emitter.on("change", () => {
        cn(n, e);
      }), cn(n, e), e.addEventListener("transitionend", (t) => {
        t.propertyName === "height" && n.cleanUpTransition();
      });
    }
    class $e extends a {
      constructor(e, t) {
        super(e), this.rackApi_ = t;
      }
    }
    function Hs(n, e) {
      return n.addBlade(Object.assign(Object.assign({}, e), { view: "button" }));
    }
    function Ks(n, e) {
      return n.addBlade(Object.assign(Object.assign({}, e), { view: "folder" }));
    }
    function $s(n, e) {
      const t = e ?? {};
      return n.addBlade(Object.assign(Object.assign({}, t), { view: "separator" }));
    }
    function hi(n, e) {
      return n.addBlade(Object.assign(Object.assign({}, e), { view: "tab" }));
    }
    class It {
      constructor(e) {
        this.emitter = new F(), this.items_ = [], this.cache_ = /* @__PURE__ */ new Set(), this.onSubListAdd_ = this.onSubListAdd_.bind(this), this.onSubListRemove_ = this.onSubListRemove_.bind(this), this.extract_ = e;
      }
      get items() {
        return this.items_;
      }
      allItems() {
        return Array.from(this.cache_);
      }
      find(e) {
        for (const t of this.allItems())
          if (e(t))
            return t;
        return null;
      }
      includes(e) {
        return this.cache_.has(e);
      }
      add(e, t) {
        if (this.includes(e))
          throw S.shouldNeverHappen();
        const l = t !== void 0 ? t : this.items_.length;
        this.items_.splice(l, 0, e), this.cache_.add(e);
        const v = this.extract_(e);
        v && (v.emitter.on("add", this.onSubListAdd_), v.emitter.on("remove", this.onSubListRemove_), v.allItems().forEach((E) => {
          this.cache_.add(E);
        })), this.emitter.emit("add", {
          index: l,
          item: e,
          root: this,
          target: this
        });
      }
      remove(e) {
        const t = this.items_.indexOf(e);
        if (t < 0)
          return;
        this.items_.splice(t, 1), this.cache_.delete(e);
        const l = this.extract_(e);
        l && (l.emitter.off("add", this.onSubListAdd_), l.emitter.off("remove", this.onSubListRemove_)), this.emitter.emit("remove", {
          index: t,
          item: e,
          root: this,
          target: this
        });
      }
      onSubListAdd_(e) {
        this.cache_.add(e.item), this.emitter.emit("add", {
          index: e.index,
          item: e.item,
          root: this,
          target: e.target
        });
      }
      onSubListRemove_(e) {
        this.cache_.delete(e.item), this.emitter.emit("remove", {
          index: e.index,
          item: e.item,
          root: this,
          target: e.target
        });
      }
    }
    class di extends a {
      constructor(e) {
        super(e), this.onBindingChange_ = this.onBindingChange_.bind(this), this.emitter_ = new F(), this.controller_.binding.emitter.on("change", this.onBindingChange_);
      }
      get label() {
        return this.controller_.props.get("label");
      }
      set label(e) {
        this.controller_.props.set("label", e);
      }
      on(e, t) {
        const l = t.bind(this);
        return this.emitter_.on(e, (v) => {
          l(v.event);
        }), this;
      }
      refresh() {
        this.controller_.binding.read();
      }
      onBindingChange_(e) {
        const t = e.sender.target.read();
        this.emitter_.emit("change", {
          event: new u(this, t, this.controller_.binding.target.presetKey, e.options.last)
        });
      }
    }
    class ze extends U {
      constructor(e, t) {
        super(e, t), this.binding = t.binding;
      }
    }
    class mi extends a {
      constructor(e) {
        super(e), this.onBindingUpdate_ = this.onBindingUpdate_.bind(this), this.emitter_ = new F(), this.controller_.binding.emitter.on("update", this.onBindingUpdate_);
      }
      get label() {
        return this.controller_.props.get("label");
      }
      set label(e) {
        this.controller_.props.set("label", e);
      }
      on(e, t) {
        const l = t.bind(this);
        return this.emitter_.on(e, (v) => {
          l(v.event);
        }), this;
      }
      refresh() {
        this.controller_.binding.read();
      }
      onBindingUpdate_(e) {
        const t = e.sender.target.read();
        this.emitter_.emit("update", {
          event: new h(this, t, this.controller_.binding.target.presetKey)
        });
      }
    }
    class ot extends U {
      constructor(e, t) {
        super(e, t), this.binding = t.binding, this.viewProps.bindDisabled(this.binding.ticker), this.viewProps.handleDispose(() => {
          this.binding.dispose();
        });
      }
    }
    function es(n) {
      return n instanceof Kn ? n.apiSet_ : n instanceof $e ? n.rackApi_.apiSet_ : null;
    }
    function pn(n, e) {
      const t = n.find((l) => l.controller_ === e);
      if (!t)
        throw S.shouldNeverHappen();
      return t;
    }
    function ts(n, e, t) {
      if (!R.isBindable(n))
        throw S.notBindable();
      return new R(n, e, t);
    }
    class Kn extends a {
      constructor(e, t) {
        super(e), this.onRackAdd_ = this.onRackAdd_.bind(this), this.onRackRemove_ = this.onRackRemove_.bind(this), this.onRackInputChange_ = this.onRackInputChange_.bind(this), this.onRackMonitorUpdate_ = this.onRackMonitorUpdate_.bind(this), this.emitter_ = new F(), this.apiSet_ = new It(es), this.pool_ = t;
        const l = this.controller_.rack;
        l.emitter.on("add", this.onRackAdd_), l.emitter.on("remove", this.onRackRemove_), l.emitter.on("inputchange", this.onRackInputChange_), l.emitter.on("monitorupdate", this.onRackMonitorUpdate_), l.children.forEach((v) => {
          this.setUpApi_(v);
        });
      }
      get children() {
        return this.controller_.rack.children.map((e) => pn(this.apiSet_, e));
      }
      addInput(e, t, l) {
        const v = l ?? {}, E = this.controller_.view.element.ownerDocument, k = this.pool_.createInput(E, ts(e, t, v.presetKey), v), B = new di(k);
        return this.add(B, v.index);
      }
      addMonitor(e, t, l) {
        const v = l ?? {}, E = this.controller_.view.element.ownerDocument, k = this.pool_.createMonitor(E, ts(e, t), v), B = new mi(k);
        return this.add(B, v.index);
      }
      addFolder(e) {
        return Ks(this, e);
      }
      addButton(e) {
        return Hs(this, e);
      }
      addSeparator(e) {
        return $s(this, e);
      }
      addTab(e) {
        return hi(this, e);
      }
      add(e, t) {
        this.controller_.rack.add(e.controller_, t);
        const l = this.apiSet_.find((v) => v.controller_ === e.controller_);
        return l && this.apiSet_.remove(l), this.apiSet_.add(e), e;
      }
      remove(e) {
        this.controller_.rack.remove(e.controller_);
      }
      addBlade(e) {
        const t = this.controller_.view.element.ownerDocument, l = this.pool_.createBlade(t, e), v = this.pool_.createBladeApi(l);
        return this.add(v, e.index);
      }
      on(e, t) {
        const l = t.bind(this);
        return this.emitter_.on(e, (v) => {
          l(v.event);
        }), this;
      }
      setUpApi_(e) {
        this.apiSet_.find((l) => l.controller_ === e) || this.apiSet_.add(this.pool_.createBladeApi(e));
      }
      onRackAdd_(e) {
        this.setUpApi_(e.bladeController);
      }
      onRackRemove_(e) {
        if (e.isRoot) {
          const t = pn(this.apiSet_, e.bladeController);
          this.apiSet_.remove(t);
        }
      }
      onRackInputChange_(e) {
        const t = e.bladeController;
        if (t instanceof ze) {
          const l = pn(this.apiSet_, t), v = t.binding;
          this.emitter_.emit("change", {
            event: new u(l, v.target.read(), v.target.presetKey, e.options.last)
          });
        } else if (t instanceof se) {
          const l = pn(this.apiSet_, t);
          this.emitter_.emit("change", {
            event: new u(l, t.value.rawValue, void 0, e.options.last)
          });
        }
      }
      onRackMonitorUpdate_(e) {
        if (!(e.bladeController instanceof ot))
          throw S.shouldNeverHappen();
        const t = pn(this.apiSet_, e.bladeController), l = e.bladeController.binding;
        this.emitter_.emit("update", {
          event: new h(t, l.target.read(), l.target.presetKey)
        });
      }
    }
    class fi extends $e {
      constructor(e, t) {
        super(e, new Kn(e.rackController, t)), this.emitter_ = new F(), this.controller_.foldable.value("expanded").emitter.on("change", (l) => {
          this.emitter_.emit("fold", {
            event: new m(this, l.sender.rawValue)
          });
        }), this.rackApi_.on("change", (l) => {
          this.emitter_.emit("change", {
            event: l
          });
        }), this.rackApi_.on("update", (l) => {
          this.emitter_.emit("update", {
            event: l
          });
        });
      }
      get expanded() {
        return this.controller_.foldable.get("expanded");
      }
      set expanded(e) {
        this.controller_.foldable.set("expanded", e);
      }
      get title() {
        return this.controller_.props.get("title");
      }
      set title(e) {
        this.controller_.props.set("title", e);
      }
      get children() {
        return this.rackApi_.children;
      }
      addInput(e, t, l) {
        return this.rackApi_.addInput(e, t, l);
      }
      addMonitor(e, t, l) {
        return this.rackApi_.addMonitor(e, t, l);
      }
      addFolder(e) {
        return this.rackApi_.addFolder(e);
      }
      addButton(e) {
        return this.rackApi_.addButton(e);
      }
      addSeparator(e) {
        return this.rackApi_.addSeparator(e);
      }
      addTab(e) {
        return this.rackApi_.addTab(e);
      }
      add(e, t) {
        return this.rackApi_.add(e, t);
      }
      remove(e) {
        this.rackApi_.remove(e);
      }
      addBlade(e) {
        return this.rackApi_.addBlade(e);
      }
      on(e, t) {
        const l = t.bind(this);
        return this.emitter_.on(e, (v) => {
          l(v.event);
        }), this;
      }
    }
    class vi extends At {
      constructor(e) {
        super({
          blade: e.blade,
          view: e.view,
          viewProps: e.rackController.viewProps
        }), this.rackController = e.rackController;
      }
    }
    class Xs {
      constructor(e, t) {
        const l = D(t.viewName);
        this.element = e.createElement("div"), this.element.classList.add(l()), t.viewProps.bindClassModifiers(this.element);
      }
    }
    function Ys(n, e) {
      for (let t = 0; t < n.length; t++) {
        const l = n[t];
        if (l instanceof ze && l.binding === e)
          return l;
      }
      return null;
    }
    function qs(n, e) {
      for (let t = 0; t < n.length; t++) {
        const l = n[t];
        if (l instanceof ot && l.binding === e)
          return l;
      }
      return null;
    }
    function Qs(n, e) {
      for (let t = 0; t < n.length; t++) {
        const l = n[t];
        if (l instanceof se && l.value === e)
          return l;
      }
      return null;
    }
    function bi(n) {
      return n instanceof un ? n.rack : n instanceof vi ? n.rackController.rack : null;
    }
    function Zs(n) {
      const e = bi(n);
      return e ? e.bcSet_ : null;
    }
    class Ws {
      constructor(e) {
        var t, l;
        this.onBladePositionsChange_ = this.onBladePositionsChange_.bind(this), this.onSetAdd_ = this.onSetAdd_.bind(this), this.onSetRemove_ = this.onSetRemove_.bind(this), this.onChildDispose_ = this.onChildDispose_.bind(this), this.onChildPositionsChange_ = this.onChildPositionsChange_.bind(this), this.onChildInputChange_ = this.onChildInputChange_.bind(this), this.onChildMonitorUpdate_ = this.onChildMonitorUpdate_.bind(this), this.onChildValueChange_ = this.onChildValueChange_.bind(this), this.onChildViewPropsChange_ = this.onChildViewPropsChange_.bind(this), this.onDescendantLayout_ = this.onDescendantLayout_.bind(this), this.onDescendantInputChange_ = this.onDescendantInputChange_.bind(this), this.onDescendantMonitorUpdate_ = this.onDescendantMonitorUpdate_.bind(this), this.emitter = new F(), this.blade_ = (t = e.blade) !== null && t !== void 0 ? t : null, (l = this.blade_) === null || l === void 0 || l.value("positions").emitter.on("change", this.onBladePositionsChange_), this.viewProps = e.viewProps, this.bcSet_ = new It(Zs), this.bcSet_.emitter.on("add", this.onSetAdd_), this.bcSet_.emitter.on("remove", this.onSetRemove_);
      }
      get children() {
        return this.bcSet_.items;
      }
      add(e, t) {
        var l;
        (l = e.parent) === null || l === void 0 || l.remove(e), C(e, "parent") ? e.parent = this : (e.parent_ = this, Oe({
          key: "parent",
          target: "BladeController",
          place: "BladeRack.add"
        })), this.bcSet_.add(e, t);
      }
      remove(e) {
        C(e, "parent") ? e.parent = null : (e.parent_ = null, Oe({
          key: "parent",
          target: "BladeController",
          place: "BladeRack.remove"
        })), this.bcSet_.remove(e);
      }
      find(e) {
        return this.bcSet_.allItems().filter((t) => t instanceof e);
      }
      onSetAdd_(e) {
        this.updatePositions_();
        const t = e.target === e.root;
        if (this.emitter.emit("add", {
          bladeController: e.item,
          index: e.index,
          isRoot: t,
          sender: this
        }), !t)
          return;
        const l = e.item;
        if (l.viewProps.emitter.on("change", this.onChildViewPropsChange_), l.blade.value("positions").emitter.on("change", this.onChildPositionsChange_), l.viewProps.handleDispose(this.onChildDispose_), l instanceof ze)
          l.binding.emitter.on("change", this.onChildInputChange_);
        else if (l instanceof ot)
          l.binding.emitter.on("update", this.onChildMonitorUpdate_);
        else if (l instanceof se)
          l.value.emitter.on("change", this.onChildValueChange_);
        else {
          const v = bi(l);
          if (v) {
            const E = v.emitter;
            E.on("layout", this.onDescendantLayout_), E.on("inputchange", this.onDescendantInputChange_), E.on("monitorupdate", this.onDescendantMonitorUpdate_);
          }
        }
      }
      onSetRemove_(e) {
        this.updatePositions_();
        const t = e.target === e.root;
        if (this.emitter.emit("remove", {
          bladeController: e.item,
          isRoot: t,
          sender: this
        }), !t)
          return;
        const l = e.item;
        if (l instanceof ze)
          l.binding.emitter.off("change", this.onChildInputChange_);
        else if (l instanceof ot)
          l.binding.emitter.off("update", this.onChildMonitorUpdate_);
        else if (l instanceof se)
          l.value.emitter.off("change", this.onChildValueChange_);
        else {
          const v = bi(l);
          if (v) {
            const E = v.emitter;
            E.off("layout", this.onDescendantLayout_), E.off("inputchange", this.onDescendantInputChange_), E.off("monitorupdate", this.onDescendantMonitorUpdate_);
          }
        }
      }
      updatePositions_() {
        const e = this.bcSet_.items.filter((v) => !v.viewProps.get("hidden")), t = e[0], l = e[e.length - 1];
        this.bcSet_.items.forEach((v) => {
          const E = [];
          v === t && (E.push("first"), (!this.blade_ || this.blade_.get("positions").includes("veryfirst")) && E.push("veryfirst")), v === l && (E.push("last"), (!this.blade_ || this.blade_.get("positions").includes("verylast")) && E.push("verylast")), v.blade.set("positions", E);
        });
      }
      onChildPositionsChange_() {
        this.updatePositions_(), this.emitter.emit("layout", {
          sender: this
        });
      }
      onChildViewPropsChange_(e) {
        this.updatePositions_(), this.emitter.emit("layout", {
          sender: this
        });
      }
      onChildDispose_() {
        this.bcSet_.items.filter((t) => t.viewProps.get("disposed")).forEach((t) => {
          this.bcSet_.remove(t);
        });
      }
      onChildInputChange_(e) {
        const t = Ys(this.find(ze), e.sender);
        if (!t)
          throw S.alreadyDisposed();
        this.emitter.emit("inputchange", {
          bladeController: t,
          options: e.options,
          sender: this
        });
      }
      onChildMonitorUpdate_(e) {
        const t = qs(this.find(ot), e.sender);
        if (!t)
          throw S.alreadyDisposed();
        this.emitter.emit("monitorupdate", {
          bladeController: t,
          sender: this
        });
      }
      onChildValueChange_(e) {
        const t = Qs(this.find(se), e.sender);
        if (!t)
          throw S.alreadyDisposed();
        this.emitter.emit("inputchange", {
          bladeController: t,
          options: e.options,
          sender: this
        });
      }
      onDescendantLayout_(e) {
        this.updatePositions_(), this.emitter.emit("layout", {
          sender: this
        });
      }
      onDescendantInputChange_(e) {
        this.emitter.emit("inputchange", {
          bladeController: e.bladeController,
          options: e.options,
          sender: this
        });
      }
      onDescendantMonitorUpdate_(e) {
        this.emitter.emit("monitorupdate", {
          bladeController: e.bladeController,
          sender: this
        });
      }
      onBladePositionsChange_() {
        this.updatePositions_();
      }
    }
    class un extends At {
      constructor(e, t) {
        super(Object.assign(Object.assign({}, t), { view: new Xs(e, {
          viewName: "brk",
          viewProps: t.viewProps
        }) })), this.onRackAdd_ = this.onRackAdd_.bind(this), this.onRackRemove_ = this.onRackRemove_.bind(this);
        const l = new Ws({
          blade: t.root ? void 0 : t.blade,
          viewProps: t.viewProps
        });
        l.emitter.on("add", this.onRackAdd_), l.emitter.on("remove", this.onRackRemove_), this.rack = l, this.viewProps.handleDispose(() => {
          for (let v = this.rack.children.length - 1; v >= 0; v--)
            this.rack.children[v].viewProps.set("disposed", true);
        });
      }
      onRackAdd_(e) {
        e.isRoot && Lt(this.view.element, e.bladeController.view.element, e.index);
      }
      onRackRemove_(e) {
        e.isRoot && Gn(e.bladeController.view.element);
      }
    }
    const ns = D("cnt");
    class Js {
      constructor(e, t) {
        var l;
        this.className_ = D((l = t.viewName) !== null && l !== void 0 ? l : "fld"), this.element = e.createElement("div"), this.element.classList.add(this.className_(), ns()), t.viewProps.bindClassModifiers(this.element), this.foldable_ = t.foldable, this.foldable_.bindExpandedClass(this.element, this.className_(void 0, "expanded")), O(this.foldable_, "completed", K(this.element, this.className_(void 0, "cpl")));
        const v = e.createElement("button");
        v.classList.add(this.className_("b")), O(t.props, "title", (ee) => {
          _(ee) ? this.element.classList.add(this.className_(void 0, "not")) : this.element.classList.remove(this.className_(void 0, "not"));
        }), t.viewProps.bindDisabled(v), this.element.appendChild(v), this.buttonElement = v;
        const E = e.createElement("div");
        E.classList.add(this.className_("i")), this.element.appendChild(E);
        const k = e.createElement("div");
        k.classList.add(this.className_("t")), q(t.props.value("title"), k), this.buttonElement.appendChild(k), this.titleElement = k;
        const B = e.createElement("div");
        B.classList.add(this.className_("m")), this.buttonElement.appendChild(B);
        const Q = t.containerElement;
        Q.classList.add(this.className_("c")), this.element.appendChild(Q), this.containerElement = Q;
      }
    }
    class $n extends vi {
      constructor(e, t) {
        var l;
        const v = Ne.create((l = t.expanded) !== null && l !== void 0 ? l : true), E = new un(e, {
          blade: t.blade,
          root: t.root,
          viewProps: t.viewProps
        });
        super(Object.assign(Object.assign({}, t), { rackController: E, view: new Js(e, {
          containerElement: E.view.element,
          foldable: v,
          props: t.props,
          viewName: t.root ? "rot" : void 0,
          viewProps: t.viewProps
        }) })), this.onTitleClick_ = this.onTitleClick_.bind(this), this.props = t.props, this.foldable = v, Ke(this.foldable, this.view.containerElement), this.rackController.rack.emitter.on("add", () => {
          this.foldable.cleanUpTransition();
        }), this.rackController.rack.emitter.on("remove", () => {
          this.foldable.cleanUpTransition();
        }), this.view.buttonElement.addEventListener("click", this.onTitleClick_);
      }
      get document() {
        return this.view.element.ownerDocument;
      }
      onTitleClick_() {
        this.foldable.set("expanded", !this.foldable.get("expanded"));
      }
    }
    const er = {
      id: "folder",
      type: "blade",
      accept(n) {
        const e = M, t = ce(n, {
          title: e.required.string,
          view: e.required.constant("folder"),
          expanded: e.optional.boolean
        });
        return t ? { params: t } : null;
      },
      controller(n) {
        return new $n(n.document, {
          blade: n.blade,
          expanded: n.params.expanded,
          props: X.fromObject({
            title: n.params.title
          }),
          viewProps: n.viewProps
        });
      },
      api(n) {
        return n.controller instanceof $n ? new fi(n.controller, n.pool) : null;
      }
    };
    class Gt extends se {
      constructor(e, t) {
        const l = t.valueController.viewProps;
        super(Object.assign(Object.assign({}, t), { value: t.valueController.value, view: new A(e, {
          props: t.props,
          viewProps: l
        }), viewProps: l })), this.props = t.props, this.valueController = t.valueController, this.view.valueElement.appendChild(this.valueController.view.element);
      }
    }
    class is extends a {
    }
    const gi = D("spr");
    class tr {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(gi()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("hr");
        l.classList.add(gi("r")), this.element.appendChild(l);
      }
    }
    class hn extends At {
      constructor(e, t) {
        super(Object.assign(Object.assign({}, t), { view: new tr(e, {
          viewProps: t.viewProps
        }) }));
      }
    }
    const nr = {
      id: "separator",
      type: "blade",
      accept(n) {
        const t = ce(n, {
          view: M.required.constant("separator")
        });
        return t ? { params: t } : null;
      },
      controller(n) {
        return new hn(n.document, {
          blade: n.blade,
          viewProps: n.viewProps
        });
      },
      api(n) {
        return n.controller instanceof hn ? new is(n.controller) : null;
      }
    }, Ie = D("tbi");
    class ir {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(Ie()), t.viewProps.bindClassModifiers(this.element), O(t.props, "selected", (E) => {
          E ? this.element.classList.add(Ie(void 0, "sel")) : this.element.classList.remove(Ie(void 0, "sel"));
        });
        const l = e.createElement("button");
        l.classList.add(Ie("b")), t.viewProps.bindDisabled(l), this.element.appendChild(l), this.buttonElement = l;
        const v = e.createElement("div");
        v.classList.add(Ie("t")), q(t.props.value("title"), v), this.buttonElement.appendChild(v), this.titleElement = v;
      }
    }
    class Xn {
      constructor(e, t) {
        this.emitter = new F(), this.onClick_ = this.onClick_.bind(this), this.props = t.props, this.viewProps = t.viewProps, this.view = new ir(e, {
          props: t.props,
          viewProps: t.viewProps
        }), this.view.buttonElement.addEventListener("click", this.onClick_);
      }
      onClick_() {
        this.emitter.emit("click", {
          sender: this
        });
      }
    }
    class ss {
      constructor(e, t) {
        this.onItemClick_ = this.onItemClick_.bind(this), this.ic_ = new Xn(e, {
          props: t.itemProps,
          viewProps: Qe.create()
        }), this.ic_.emitter.on("click", this.onItemClick_), this.cc_ = new un(e, {
          blade: xe(),
          viewProps: Qe.create()
        }), this.props = t.props, O(this.props, "selected", (l) => {
          this.itemController.props.set("selected", l), this.contentController.viewProps.set("hidden", !l);
        });
      }
      get itemController() {
        return this.ic_;
      }
      get contentController() {
        return this.cc_;
      }
      onItemClick_() {
        this.props.set("selected", true);
      }
    }
    class _i {
      constructor(e, t) {
        this.controller_ = e, this.rackApi_ = t;
      }
      get title() {
        var e;
        return (e = this.controller_.itemController.props.get("title")) !== null && e !== void 0 ? e : "";
      }
      set title(e) {
        this.controller_.itemController.props.set("title", e);
      }
      get selected() {
        return this.controller_.props.get("selected");
      }
      set selected(e) {
        this.controller_.props.set("selected", e);
      }
      get children() {
        return this.rackApi_.children;
      }
      addButton(e) {
        return this.rackApi_.addButton(e);
      }
      addFolder(e) {
        return this.rackApi_.addFolder(e);
      }
      addSeparator(e) {
        return this.rackApi_.addSeparator(e);
      }
      addTab(e) {
        return this.rackApi_.addTab(e);
      }
      add(e, t) {
        this.rackApi_.add(e, t);
      }
      remove(e) {
        this.rackApi_.remove(e);
      }
      addInput(e, t, l) {
        return this.rackApi_.addInput(e, t, l);
      }
      addMonitor(e, t, l) {
        return this.rackApi_.addMonitor(e, t, l);
      }
      addBlade(e) {
        return this.rackApi_.addBlade(e);
      }
    }
    class rs extends $e {
      constructor(e, t) {
        super(e, new Kn(e.rackController, t)), this.onPageAdd_ = this.onPageAdd_.bind(this), this.onPageRemove_ = this.onPageRemove_.bind(this), this.onSelect_ = this.onSelect_.bind(this), this.emitter_ = new F(), this.pageApiMap_ = /* @__PURE__ */ new Map(), this.rackApi_.on("change", (l) => {
          this.emitter_.emit("change", {
            event: l
          });
        }), this.rackApi_.on("update", (l) => {
          this.emitter_.emit("update", {
            event: l
          });
        }), this.controller_.tab.selectedIndex.emitter.on("change", this.onSelect_), this.controller_.pageSet.emitter.on("add", this.onPageAdd_), this.controller_.pageSet.emitter.on("remove", this.onPageRemove_), this.controller_.pageSet.items.forEach((l) => {
          this.setUpPageApi_(l);
        });
      }
      get pages() {
        return this.controller_.pageSet.items.map((e) => {
          const t = this.pageApiMap_.get(e);
          if (!t)
            throw S.shouldNeverHappen();
          return t;
        });
      }
      addPage(e) {
        const t = this.controller_.view.element.ownerDocument, l = new ss(t, {
          itemProps: X.fromObject({
            selected: false,
            title: e.title
          }),
          props: X.fromObject({
            selected: false
          })
        });
        this.controller_.add(l, e.index);
        const v = this.pageApiMap_.get(l);
        if (!v)
          throw S.shouldNeverHappen();
        return v;
      }
      removePage(e) {
        this.controller_.remove(e);
      }
      on(e, t) {
        const l = t.bind(this);
        return this.emitter_.on(e, (v) => {
          l(v.event);
        }), this;
      }
      setUpPageApi_(e) {
        const t = this.rackApi_.apiSet_.find((v) => v.controller_ === e.contentController);
        if (!t)
          throw S.shouldNeverHappen();
        const l = new _i(e, t);
        this.pageApiMap_.set(e, l);
      }
      onPageAdd_(e) {
        this.setUpPageApi_(e.item);
      }
      onPageRemove_(e) {
        if (!this.pageApiMap_.get(e.item))
          throw S.shouldNeverHappen();
        this.pageApiMap_.delete(e.item);
      }
      onSelect_(e) {
        this.emitter_.emit("select", {
          event: new g(this, e.rawValue)
        });
      }
    }
    const os = -1;
    class sr {
      constructor() {
        this.onItemSelectedChange_ = this.onItemSelectedChange_.bind(this), this.empty = te(true), this.selectedIndex = te(os), this.items_ = [];
      }
      add(e, t) {
        const l = t ?? this.items_.length;
        this.items_.splice(l, 0, e), e.emitter.on("change", this.onItemSelectedChange_), this.keepSelection_();
      }
      remove(e) {
        const t = this.items_.indexOf(e);
        t < 0 || (this.items_.splice(t, 1), e.emitter.off("change", this.onItemSelectedChange_), this.keepSelection_());
      }
      keepSelection_() {
        if (this.items_.length === 0) {
          this.selectedIndex.rawValue = os, this.empty.rawValue = true;
          return;
        }
        const e = this.items_.findIndex((t) => t.rawValue);
        e < 0 ? (this.items_.forEach((t, l) => {
          t.rawValue = l === 0;
        }), this.selectedIndex.rawValue = 0) : (this.items_.forEach((t, l) => {
          t.rawValue = l === e;
        }), this.selectedIndex.rawValue = e), this.empty.rawValue = false;
      }
      onItemSelectedChange_(e) {
        if (e.rawValue) {
          const t = this.items_.findIndex((l) => l === e.sender);
          this.items_.forEach((l, v) => {
            l.rawValue = v === t;
          }), this.selectedIndex.rawValue = t;
        } else
          this.keepSelection_();
      }
    }
    const Ht = D("tab");
    class Kt {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(Ht(), ns()), t.viewProps.bindClassModifiers(this.element), N(t.empty, K(this.element, Ht(void 0, "nop")));
        const l = e.createElement("div");
        l.classList.add(Ht("t")), this.element.appendChild(l), this.itemsElement = l;
        const v = e.createElement("div");
        v.classList.add(Ht("i")), this.element.appendChild(v);
        const E = t.contentsElement;
        E.classList.add(Ht("c")), this.element.appendChild(E), this.contentsElement = E;
      }
    }
    class dn extends vi {
      constructor(e, t) {
        const l = new un(e, {
          blade: t.blade,
          viewProps: t.viewProps
        }), v = new sr();
        super({
          blade: t.blade,
          rackController: l,
          view: new Kt(e, {
            contentsElement: l.view.element,
            empty: v.empty,
            viewProps: t.viewProps
          })
        }), this.onPageAdd_ = this.onPageAdd_.bind(this), this.onPageRemove_ = this.onPageRemove_.bind(this), this.pageSet_ = new It(() => null), this.pageSet_.emitter.on("add", this.onPageAdd_), this.pageSet_.emitter.on("remove", this.onPageRemove_), this.tab = v;
      }
      get pageSet() {
        return this.pageSet_;
      }
      add(e, t) {
        this.pageSet_.add(e, t);
      }
      remove(e) {
        this.pageSet_.remove(this.pageSet_.items[e]);
      }
      onPageAdd_(e) {
        const t = e.item;
        Lt(this.view.itemsElement, t.itemController.view.element, e.index), t.itemController.viewProps.set("parent", this.viewProps), this.rackController.rack.add(t.contentController, e.index), this.tab.add(t.props.value("selected"));
      }
      onPageRemove_(e) {
        const t = e.item;
        Gn(t.itemController.view.element), t.itemController.viewProps.set("parent", null), this.rackController.rack.remove(t.contentController), this.tab.remove(t.props.value("selected"));
      }
    }
    const wi = {
      id: "tab",
      type: "blade",
      accept(n) {
        const e = M, t = ce(n, {
          pages: e.required.array(e.required.object({ title: e.required.string })),
          view: e.required.constant("tab")
        });
        return !t || t.pages.length === 0 ? null : { params: t };
      },
      controller(n) {
        const e = new dn(n.document, {
          blade: n.blade,
          viewProps: n.viewProps
        });
        return n.params.pages.forEach((t) => {
          const l = new ss(n.document, {
            itemProps: X.fromObject({
              selected: false,
              title: t.title
            }),
            props: X.fromObject({
              selected: false
            })
          });
          e.add(l);
        }), e;
      },
      api(n) {
        return n.controller instanceof dn ? new rs(n.controller, n.pool) : null;
      }
    };
    function rr(n, e) {
      const t = n.accept(e.params);
      if (!t)
        return null;
      const l = M.optional.boolean(e.params.disabled).value, v = M.optional.boolean(e.params.hidden).value;
      return n.controller({
        blade: xe(),
        document: e.document,
        params: Object.assign(Object.assign({}, t.params), { disabled: l, hidden: v }),
        viewProps: Qe.create({
          disabled: l,
          hidden: v
        })
      });
    }
    class as {
      constructor() {
        this.disabled = false, this.emitter = new F();
      }
      dispose() {
      }
      tick() {
        this.disabled || this.emitter.emit("tick", {
          sender: this
        });
      }
    }
    class yi {
      constructor(e, t) {
        this.disabled_ = false, this.timerId_ = null, this.onTick_ = this.onTick_.bind(this), this.doc_ = e, this.emitter = new F(), this.interval_ = t, this.setTimer_();
      }
      get disabled() {
        return this.disabled_;
      }
      set disabled(e) {
        this.disabled_ = e, this.disabled_ ? this.clearTimer_() : this.setTimer_();
      }
      dispose() {
        this.clearTimer_();
      }
      clearTimer_() {
        if (this.timerId_ === null)
          return;
        const e = this.doc_.defaultView;
        e && e.clearInterval(this.timerId_), this.timerId_ = null;
      }
      setTimer_() {
        if (this.clearTimer_(), this.interval_ <= 0)
          return;
        const e = this.doc_.defaultView;
        e && (this.timerId_ = e.setInterval(this.onTick_, this.interval_));
      }
      onTick_() {
        this.disabled_ || this.emitter.emit("tick", {
          sender: this
        });
      }
    }
    class Ct2 {
      constructor(e) {
        this.constraints = e;
      }
      constrain(e) {
        return this.constraints.reduce((t, l) => l.constrain(t), e);
      }
    }
    function we(n, e) {
      if (n instanceof e)
        return n;
      if (n instanceof Ct2) {
        const t = n.constraints.reduce((l, v) => l || (v instanceof e ? v : null), null);
        if (t)
          return t;
      }
      return null;
    }
    class Vt {
      constructor(e) {
        this.values = X.fromObject({
          max: e.max,
          min: e.min
        });
      }
      constrain(e) {
        const t = this.values.get("max"), l = this.values.get("min");
        return Math.min(Math.max(e, l), t);
      }
    }
    class at {
      constructor(e) {
        this.values = X.fromObject({
          options: e
        });
      }
      get options() {
        return this.values.get("options");
      }
      constrain(e) {
        const t = this.values.get("options");
        return t.length === 0 || t.filter((v) => v.value === e).length > 0 ? e : t[0].value;
      }
    }
    class Xe {
      constructor(e) {
        this.values = X.fromObject({
          max: e.max,
          min: e.min
        });
      }
      get maxValue() {
        return this.values.get("max");
      }
      get minValue() {
        return this.values.get("min");
      }
      constrain(e) {
        const t = this.values.get("max"), l = this.values.get("min");
        let v = e;
        return _(l) || (v = Math.max(v, l)), _(t) || (v = Math.min(v, t)), v;
      }
    }
    class Yn {
      constructor(e, t = 0) {
        this.step = e, this.origin = t;
      }
      constrain(e) {
        const t = this.origin % this.step, l = Math.round((e - t) / this.step);
        return t + l * this.step;
      }
    }
    const xi = D("lst");
    class Ei {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.props_ = t.props, this.element = e.createElement("div"), this.element.classList.add(xi()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("select");
        l.classList.add(xi("s")), O(this.props_, "options", (E) => {
          ln(l), E.forEach((k, B) => {
            const Q = e.createElement("option");
            Q.dataset.index = String(B), Q.textContent = k.text, Q.value = String(k.value), l.appendChild(Q);
          });
        }), t.viewProps.bindDisabled(l), this.element.appendChild(l), this.selectElement = l;
        const v = e.createElement("div");
        v.classList.add(xi("m")), v.appendChild(xt(e, "dropdown")), this.element.appendChild(v), t.value.emitter.on("change", this.onValueChange_), this.value_ = t.value, this.update_();
      }
      update_() {
        this.selectElement.value = String(this.value_.rawValue);
      }
      onValueChange_() {
        this.update_();
      }
    }
    class mn {
      constructor(e, t) {
        this.onSelectChange_ = this.onSelectChange_.bind(this), this.props = t.props, this.value = t.value, this.viewProps = t.viewProps, this.view = new Ei(e, {
          props: this.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.selectElement.addEventListener("change", this.onSelectChange_);
      }
      onSelectChange_(e) {
        const l = e.currentTarget.selectedOptions.item(0);
        if (!l)
          return;
        const v = Number(l.dataset.index);
        this.value.rawValue = this.props.get("options")[v].value;
      }
    }
    const ls = D("pop");
    class cs {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(ls()), t.viewProps.bindClassModifiers(this.element), N(t.shows, K(this.element, ls(void 0, "v")));
      }
    }
    class ps {
      constructor(e, t) {
        this.shows = te(false), this.viewProps = t.viewProps, this.view = new cs(e, {
          shows: this.shows,
          viewProps: this.viewProps
        });
      }
    }
    const fn = D("txt");
    class us {
      constructor(e, t) {
        this.onChange_ = this.onChange_.bind(this), this.element = e.createElement("div"), this.element.classList.add(fn()), t.viewProps.bindClassModifiers(this.element), this.props_ = t.props, this.props_.emitter.on("change", this.onChange_);
        const l = e.createElement("input");
        l.classList.add(fn("i")), l.type = "text", t.viewProps.bindDisabled(l), this.element.appendChild(l), this.inputElement = l, t.value.emitter.on("change", this.onChange_), this.value_ = t.value, this.refresh();
      }
      refresh() {
        const e = this.props_.get("formatter");
        this.inputElement.value = e(this.value_.rawValue);
      }
      onChange_() {
        this.refresh();
      }
    }
    class qn {
      constructor(e, t) {
        this.onInputChange_ = this.onInputChange_.bind(this), this.parser_ = t.parser, this.props = t.props, this.value = t.value, this.viewProps = t.viewProps, this.view = new us(e, {
          props: t.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_);
      }
      onInputChange_(e) {
        const l = e.currentTarget.value, v = this.parser_(l);
        _(v) || (this.value.rawValue = v), this.view.refresh();
      }
    }
    function or(n) {
      return String(n);
    }
    function hs(n) {
      return n === "false" ? false : !!n;
    }
    function ds(n) {
      return or(n);
    }
    class ar {
      constructor(e) {
        this.text = e;
      }
      evaluate() {
        return Number(this.text);
      }
      toString() {
        return this.text;
      }
    }
    const lr = {
      "**": (n, e) => Math.pow(n, e),
      "*": (n, e) => n * e,
      "/": (n, e) => n / e,
      "%": (n, e) => n % e,
      "+": (n, e) => n + e,
      "-": (n, e) => n - e,
      "<<": (n, e) => n << e,
      ">>": (n, e) => n >> e,
      ">>>": (n, e) => n >>> e,
      "&": (n, e) => n & e,
      "^": (n, e) => n ^ e,
      "|": (n, e) => n | e
    };
    class cr {
      constructor(e, t, l) {
        this.left = t, this.operator = e, this.right = l;
      }
      evaluate() {
        const e = lr[this.operator];
        if (!e)
          throw new Error(`unexpected binary operator: '${this.operator}`);
        return e(this.left.evaluate(), this.right.evaluate());
      }
      toString() {
        return [
          "b(",
          this.left.toString(),
          this.operator,
          this.right.toString(),
          ")"
        ].join(" ");
      }
    }
    const pr = {
      "+": (n) => n,
      "-": (n) => -n,
      "~": (n) => ~n
    };
    class ur {
      constructor(e, t) {
        this.operator = e, this.expression = t;
      }
      evaluate() {
        const e = pr[this.operator];
        if (!e)
          throw new Error(`unexpected unary operator: '${this.operator}`);
        return e(this.expression.evaluate());
      }
      toString() {
        return ["u(", this.operator, this.expression.toString(), ")"].join(" ");
      }
    }
    function Ci(n) {
      return (e, t) => {
        for (let l = 0; l < n.length; l++) {
          const v = n[l](e, t);
          if (v !== "")
            return v;
        }
        return "";
      };
    }
    function vn(n, e) {
      var t;
      const l = n.substr(e).match(/^\s+/);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function hr(n, e) {
      const t = n.substr(e, 1);
      return t.match(/^[1-9]$/) ? t : "";
    }
    function bn(n, e) {
      var t;
      const l = n.substr(e).match(/^[0-9]+/);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function ms(n, e) {
      const t = bn(n, e);
      if (t !== "")
        return t;
      const l = n.substr(e, 1);
      if (e += 1, l !== "-" && l !== "+")
        return "";
      const v = bn(n, e);
      return v === "" ? "" : l + v;
    }
    function Pi(n, e) {
      const t = n.substr(e, 1);
      if (e += 1, t.toLowerCase() !== "e")
        return "";
      const l = ms(n, e);
      return l === "" ? "" : t + l;
    }
    function fs(n, e) {
      const t = n.substr(e, 1);
      if (t === "0")
        return t;
      const l = hr(n, e);
      return e += l.length, l === "" ? "" : l + bn(n, e);
    }
    function Ti(n, e) {
      const t = fs(n, e);
      if (e += t.length, t === "")
        return "";
      const l = n.substr(e, 1);
      if (e += l.length, l !== ".")
        return "";
      const v = bn(n, e);
      return e += v.length, t + l + v + Pi(n, e);
    }
    function dr(n, e) {
      const t = n.substr(e, 1);
      if (e += t.length, t !== ".")
        return "";
      const l = bn(n, e);
      return e += l.length, l === "" ? "" : t + l + Pi(n, e);
    }
    function mr(n, e) {
      const t = fs(n, e);
      return e += t.length, t === "" ? "" : t + Pi(n, e);
    }
    const fr = Ci([
      Ti,
      dr,
      mr
    ]);
    function Pt(n, e) {
      var t;
      const l = n.substr(e).match(/^[01]+/);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function vr(n, e) {
      const t = n.substr(e, 2);
      if (e += t.length, t.toLowerCase() !== "0b")
        return "";
      const l = Pt(n, e);
      return l === "" ? "" : t + l;
    }
    function br(n, e) {
      var t;
      const l = n.substr(e).match(/^[0-7]+/);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function vs(n, e) {
      const t = n.substr(e, 2);
      if (e += t.length, t.toLowerCase() !== "0o")
        return "";
      const l = br(n, e);
      return l === "" ? "" : t + l;
    }
    function gr(n, e) {
      var t;
      const l = n.substr(e).match(/^[0-9a-f]+/i);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function bs(n, e) {
      const t = n.substr(e, 2);
      if (e += t.length, t.toLowerCase() !== "0x")
        return "";
      const l = gr(n, e);
      return l === "" ? "" : t + l;
    }
    const ki = Ci([
      vr,
      vs,
      bs
    ]), _r = Ci([
      ki,
      fr
    ]);
    function gs(n, e) {
      const t = _r(n, e);
      return e += t.length, t === "" ? null : {
        evaluable: new ar(t),
        cursor: e
      };
    }
    function Ze(n, e) {
      const t = n.substr(e, 1);
      if (e += t.length, t !== "(")
        return null;
      const l = Qn(n, e);
      if (!l)
        return null;
      e = l.cursor, e += vn(n, e).length;
      const v = n.substr(e, 1);
      return e += v.length, v !== ")" ? null : {
        evaluable: l.evaluable,
        cursor: e
      };
    }
    function wr(n, e) {
      var t;
      return (t = gs(n, e)) !== null && t !== void 0 ? t : Ze(n, e);
    }
    function _s(n, e) {
      const t = wr(n, e);
      if (t)
        return t;
      const l = n.substr(e, 1);
      if (e += l.length, l !== "+" && l !== "-" && l !== "~")
        return null;
      const v = _s(n, e);
      return v ? (e = v.cursor, {
        cursor: e,
        evaluable: new ur(l, v.evaluable)
      }) : null;
    }
    function Mi(n, e, t) {
      t += vn(e, t).length;
      const l = n.filter((v) => e.startsWith(v, t))[0];
      return l ? (t += l.length, t += vn(e, t).length, {
        cursor: t,
        operator: l
      }) : null;
    }
    function yr(n, e) {
      return (t, l) => {
        const v = n(t, l);
        if (!v)
          return null;
        l = v.cursor;
        let E = v.evaluable;
        for (; ; ) {
          const k = Mi(e, t, l);
          if (!k)
            break;
          l = k.cursor;
          const B = n(t, l);
          if (!B)
            return null;
          l = B.cursor, E = new cr(k.operator, E, B.evaluable);
        }
        return E ? {
          cursor: l,
          evaluable: E
        } : null;
      };
    }
    const Tt = [
      ["**"],
      ["*", "/", "%"],
      ["+", "-"],
      ["<<", ">>>", ">>"],
      ["&"],
      ["^"],
      ["|"]
    ].reduce((n, e) => yr(n, e), _s);
    function Qn(n, e) {
      return e += vn(n, e).length, Tt(n, e);
    }
    function xr(n) {
      const e = Qn(n, 0);
      return !e || e.cursor + vn(n, e.cursor).length !== n.length ? null : e.evaluable;
    }
    function lt(n) {
      var e;
      const t = xr(n);
      return (e = t == null ? void 0 : t.evaluate()) !== null && e !== void 0 ? e : null;
    }
    function ws(n) {
      if (typeof n == "number")
        return n;
      if (typeof n == "string") {
        const e = lt(n);
        if (!_(e))
          return e;
      }
      return 0;
    }
    function Dt(n) {
      return String(n);
    }
    function Ve(n) {
      return (e) => e.toFixed(Math.max(Math.min(n, 20), 0));
    }
    const Si = Ve(0);
    function gn(n) {
      return Si(n) + "%";
    }
    function Ai(n) {
      return String(n);
    }
    function ct(n) {
      return n;
    }
    function ys(n, e) {
      for (; n.length < e; )
        n.push(void 0);
    }
    function xs(n) {
      const e = [];
      return ys(e, n), te(e);
    }
    function Es(n) {
      const e = n.indexOf(void 0);
      return e < 0 ? n : n.slice(0, e);
    }
    function Cs(n, e) {
      const t = [...Es(n), e];
      return t.length > n.length ? t.splice(0, t.length - n.length) : ys(t, n.length), t;
    }
    function $t({ primary: n, secondary: e, forward: t, backward: l }) {
      let v = false;
      function E(k) {
        v || (v = true, k(), v = false);
      }
      n.emitter.on("change", (k) => {
        E(() => {
          e.setRawValue(t(n, e), k.options);
        });
      }), e.emitter.on("change", (k) => {
        E(() => {
          n.setRawValue(l(n, e), k.options);
        }), E(() => {
          e.setRawValue(t(n, e), k.options);
        });
      }), E(() => {
        e.setRawValue(t(n, e), {
          forceEmit: false,
          last: true
        });
      });
    }
    function Le(n, e) {
      const t = n * (e.altKey ? 0.1 : 1) * (e.shiftKey ? 10 : 1);
      return e.upKey ? +t : e.downKey ? -t : 0;
    }
    function Xt(n) {
      return {
        altKey: n.altKey,
        downKey: n.key === "ArrowDown",
        shiftKey: n.shiftKey,
        upKey: n.key === "ArrowUp"
      };
    }
    function nt(n) {
      return {
        altKey: n.altKey,
        downKey: n.key === "ArrowLeft",
        shiftKey: n.shiftKey,
        upKey: n.key === "ArrowRight"
      };
    }
    function Er(n) {
      return n === "ArrowUp" || n === "ArrowDown";
    }
    function Li(n) {
      return Er(n) || n === "ArrowLeft" || n === "ArrowRight";
    }
    function Zn(n, e) {
      var t, l;
      const v = e.ownerDocument.defaultView, E = e.getBoundingClientRect();
      return {
        x: n.pageX - (((t = v && v.scrollX) !== null && t !== void 0 ? t : 0) + E.left),
        y: n.pageY - (((l = v && v.scrollY) !== null && l !== void 0 ? l : 0) + E.top)
      };
    }
    class bt {
      constructor(e) {
        this.lastTouch_ = null, this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this), this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this), this.onMouseDown_ = this.onMouseDown_.bind(this), this.onTouchEnd_ = this.onTouchEnd_.bind(this), this.onTouchMove_ = this.onTouchMove_.bind(this), this.onTouchStart_ = this.onTouchStart_.bind(this), this.elem_ = e, this.emitter = new F(), e.addEventListener("touchstart", this.onTouchStart_, {
          passive: false
        }), e.addEventListener("touchmove", this.onTouchMove_, {
          passive: true
        }), e.addEventListener("touchend", this.onTouchEnd_), e.addEventListener("mousedown", this.onMouseDown_);
      }
      computePosition_(e) {
        const t = this.elem_.getBoundingClientRect();
        return {
          bounds: {
            width: t.width,
            height: t.height
          },
          point: e ? {
            x: e.x,
            y: e.y
          } : null
        };
      }
      onMouseDown_(e) {
        var t;
        e.preventDefault(), (t = e.currentTarget) === null || t === void 0 || t.focus();
        const l = this.elem_.ownerDocument;
        l.addEventListener("mousemove", this.onDocumentMouseMove_), l.addEventListener("mouseup", this.onDocumentMouseUp_), this.emitter.emit("down", {
          altKey: e.altKey,
          data: this.computePosition_(Zn(e, this.elem_)),
          sender: this,
          shiftKey: e.shiftKey
        });
      }
      onDocumentMouseMove_(e) {
        this.emitter.emit("move", {
          altKey: e.altKey,
          data: this.computePosition_(Zn(e, this.elem_)),
          sender: this,
          shiftKey: e.shiftKey
        });
      }
      onDocumentMouseUp_(e) {
        const t = this.elem_.ownerDocument;
        t.removeEventListener("mousemove", this.onDocumentMouseMove_), t.removeEventListener("mouseup", this.onDocumentMouseUp_), this.emitter.emit("up", {
          altKey: e.altKey,
          data: this.computePosition_(Zn(e, this.elem_)),
          sender: this,
          shiftKey: e.shiftKey
        });
      }
      onTouchStart_(e) {
        e.preventDefault();
        const t = e.targetTouches.item(0), l = this.elem_.getBoundingClientRect();
        this.emitter.emit("down", {
          altKey: e.altKey,
          data: this.computePosition_(t ? {
            x: t.clientX - l.left,
            y: t.clientY - l.top
          } : void 0),
          sender: this,
          shiftKey: e.shiftKey
        }), this.lastTouch_ = t;
      }
      onTouchMove_(e) {
        const t = e.targetTouches.item(0), l = this.elem_.getBoundingClientRect();
        this.emitter.emit("move", {
          altKey: e.altKey,
          data: this.computePosition_(t ? {
            x: t.clientX - l.left,
            y: t.clientY - l.top
          } : void 0),
          sender: this,
          shiftKey: e.shiftKey
        }), this.lastTouch_ = t;
      }
      onTouchEnd_(e) {
        var t;
        const l = (t = e.targetTouches.item(0)) !== null && t !== void 0 ? t : this.lastTouch_, v = this.elem_.getBoundingClientRect();
        this.emitter.emit("up", {
          altKey: e.altKey,
          data: this.computePosition_(l ? {
            x: l.clientX - v.left,
            y: l.clientY - v.top
          } : void 0),
          sender: this,
          shiftKey: e.shiftKey
        });
      }
    }
    function Ee(n, e, t, l, v) {
      const E = (n - e) / (t - e);
      return l + E * (v - l);
    }
    function Ps(n) {
      return String(n.toFixed(10)).split(".")[1].replace(/0+$/, "").length;
    }
    function Ae(n, e, t) {
      return Math.min(Math.max(n, e), t);
    }
    function Ri(n, e) {
      return (n % e + e) % e;
    }
    const Ye = D("txt");
    class _n {
      constructor(e, t) {
        this.onChange_ = this.onChange_.bind(this), this.props_ = t.props, this.props_.emitter.on("change", this.onChange_), this.element = e.createElement("div"), this.element.classList.add(Ye(), Ye(void 0, "num")), t.arrayPosition && this.element.classList.add(Ye(void 0, t.arrayPosition)), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("input");
        l.classList.add(Ye("i")), l.type = "text", t.viewProps.bindDisabled(l), this.element.appendChild(l), this.inputElement = l, this.onDraggingChange_ = this.onDraggingChange_.bind(this), this.dragging_ = t.dragging, this.dragging_.emitter.on("change", this.onDraggingChange_), this.element.classList.add(Ye()), this.inputElement.classList.add(Ye("i"));
        const v = e.createElement("div");
        v.classList.add(Ye("k")), this.element.appendChild(v), this.knobElement = v;
        const E = e.createElementNS(He, "svg");
        E.classList.add(Ye("g")), this.knobElement.appendChild(E);
        const k = e.createElementNS(He, "path");
        k.classList.add(Ye("gb")), E.appendChild(k), this.guideBodyElem_ = k;
        const B = e.createElementNS(He, "path");
        B.classList.add(Ye("gh")), E.appendChild(B), this.guideHeadElem_ = B;
        const Q = e.createElement("div");
        Q.classList.add(D("tt")()), this.knobElement.appendChild(Q), this.tooltipElem_ = Q, t.value.emitter.on("change", this.onChange_), this.value = t.value, this.refresh();
      }
      onDraggingChange_(e) {
        if (e.rawValue === null) {
          this.element.classList.remove(Ye(void 0, "drg"));
          return;
        }
        this.element.classList.add(Ye(void 0, "drg"));
        const t = e.rawValue / this.props_.get("draggingScale"), l = t + (t > 0 ? -1 : t < 0 ? 1 : 0), v = Ae(-l, -4, 4);
        this.guideHeadElem_.setAttributeNS(null, "d", [`M ${l + v},0 L${l},4 L${l + v},8`, `M ${t},-1 L${t},9`].join(" ")), this.guideBodyElem_.setAttributeNS(null, "d", `M 0,4 L${t},4`);
        const E = this.props_.get("formatter");
        this.tooltipElem_.textContent = E(this.value.rawValue), this.tooltipElem_.style.left = `${t}px`;
      }
      refresh() {
        const e = this.props_.get("formatter");
        this.inputElement.value = e(this.value.rawValue);
      }
      onChange_() {
        this.refresh();
      }
    }
    class Yt {
      constructor(e, t) {
        var l;
        this.originRawValue_ = 0, this.onInputChange_ = this.onInputChange_.bind(this), this.onInputKeyDown_ = this.onInputKeyDown_.bind(this), this.onInputKeyUp_ = this.onInputKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.baseStep_ = t.baseStep, this.parser_ = t.parser, this.props = t.props, this.sliderProps_ = (l = t.sliderProps) !== null && l !== void 0 ? l : null, this.value = t.value, this.viewProps = t.viewProps, this.dragging_ = te(null), this.view = new _n(e, {
          arrayPosition: t.arrayPosition,
          dragging: this.dragging_,
          props: this.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_), this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_), this.view.inputElement.addEventListener("keyup", this.onInputKeyUp_);
        const v = new bt(this.view.knobElement);
        v.emitter.on("down", this.onPointerDown_), v.emitter.on("move", this.onPointerMove_), v.emitter.on("up", this.onPointerUp_);
      }
      constrainValue_(e) {
        var t, l;
        const v = (t = this.sliderProps_) === null || t === void 0 ? void 0 : t.get("minValue"), E = (l = this.sliderProps_) === null || l === void 0 ? void 0 : l.get("maxValue");
        let k = e;
        return v !== void 0 && (k = Math.max(k, v)), E !== void 0 && (k = Math.min(k, E)), k;
      }
      onInputChange_(e) {
        const l = e.currentTarget.value, v = this.parser_(l);
        _(v) || (this.value.rawValue = this.constrainValue_(v)), this.view.refresh();
      }
      onInputKeyDown_(e) {
        const t = Le(this.baseStep_, Xt(e));
        t !== 0 && this.value.setRawValue(this.constrainValue_(this.value.rawValue + t), {
          forceEmit: false,
          last: false
        });
      }
      onInputKeyUp_(e) {
        Le(this.baseStep_, Xt(e)) !== 0 && this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
      onPointerDown_() {
        this.originRawValue_ = this.value.rawValue, this.dragging_.rawValue = 0;
      }
      computeDraggingValue_(e) {
        if (!e.point)
          return null;
        const t = e.point.x - e.bounds.width / 2;
        return this.constrainValue_(this.originRawValue_ + t * this.props.get("draggingScale"));
      }
      onPointerMove_(e) {
        const t = this.computeDraggingValue_(e.data);
        t !== null && (this.value.setRawValue(t, {
          forceEmit: false,
          last: false
        }), this.dragging_.rawValue = this.value.rawValue - this.originRawValue_);
      }
      onPointerUp_(e) {
        const t = this.computeDraggingValue_(e.data);
        t !== null && (this.value.setRawValue(t, {
          forceEmit: true,
          last: true
        }), this.dragging_.rawValue = null);
      }
    }
    const wn = D("sld");
    class Cr {
      constructor(e, t) {
        this.onChange_ = this.onChange_.bind(this), this.props_ = t.props, this.props_.emitter.on("change", this.onChange_), this.element = e.createElement("div"), this.element.classList.add(wn()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(wn("t")), t.viewProps.bindTabIndex(l), this.element.appendChild(l), this.trackElement = l;
        const v = e.createElement("div");
        v.classList.add(wn("k")), this.trackElement.appendChild(v), this.knobElement = v, t.value.emitter.on("change", this.onChange_), this.value = t.value, this.update_();
      }
      update_() {
        const e = Ae(Ee(this.value.rawValue, this.props_.get("minValue"), this.props_.get("maxValue"), 0, 100), 0, 100);
        this.knobElement.style.width = `${e}%`;
      }
      onChange_() {
        this.update_();
      }
    }
    class Pr {
      constructor(e, t) {
        this.onKeyDown_ = this.onKeyDown_.bind(this), this.onKeyUp_ = this.onKeyUp_.bind(this), this.onPointerDownOrMove_ = this.onPointerDownOrMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.baseStep_ = t.baseStep, this.value = t.value, this.viewProps = t.viewProps, this.props = t.props, this.view = new Cr(e, {
          props: this.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.ptHandler_ = new bt(this.view.trackElement), this.ptHandler_.emitter.on("down", this.onPointerDownOrMove_), this.ptHandler_.emitter.on("move", this.onPointerDownOrMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.trackElement.addEventListener("keydown", this.onKeyDown_), this.view.trackElement.addEventListener("keyup", this.onKeyUp_);
      }
      handlePointerEvent_(e, t) {
        e.point && this.value.setRawValue(Ee(Ae(e.point.x, 0, e.bounds.width), 0, e.bounds.width, this.props.get("minValue"), this.props.get("maxValue")), t);
      }
      onPointerDownOrMove_(e) {
        this.handlePointerEvent_(e.data, {
          forceEmit: false,
          last: false
        });
      }
      onPointerUp_(e) {
        this.handlePointerEvent_(e.data, {
          forceEmit: true,
          last: true
        });
      }
      onKeyDown_(e) {
        const t = Le(this.baseStep_, nt(e));
        t !== 0 && this.value.setRawValue(this.value.rawValue + t, {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(e) {
        Le(this.baseStep_, nt(e)) !== 0 && this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    const Be = D("sldtxt");
    class Ii {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(Be());
        const l = e.createElement("div");
        l.classList.add(Be("s")), this.sliderView_ = t.sliderView, l.appendChild(this.sliderView_.element), this.element.appendChild(l);
        const v = e.createElement("div");
        v.classList.add(Be("t")), this.textView_ = t.textView, v.appendChild(this.textView_.element), this.element.appendChild(v);
      }
    }
    class yn {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.sliderC_ = new Pr(e, {
          baseStep: t.baseStep,
          props: t.sliderProps,
          value: t.value,
          viewProps: this.viewProps
        }), this.textC_ = new Yt(e, {
          baseStep: t.baseStep,
          parser: t.parser,
          props: t.textProps,
          sliderProps: t.sliderProps,
          value: t.value,
          viewProps: t.viewProps
        }), this.view = new Ii(e, {
          sliderView: this.sliderC_.view,
          textView: this.textC_.view
        });
      }
      get sliderController() {
        return this.sliderC_;
      }
      get textController() {
        return this.textC_;
      }
    }
    function Ot(n, e) {
      n.write(e);
    }
    function xn(n) {
      const e = M;
      if (Array.isArray(n))
        return e.required.array(e.required.object({
          text: e.required.string,
          value: e.required.raw
        }))(n).value;
      if (typeof n == "object")
        return e.required.raw(n).value;
    }
    function kt(n) {
      if (n === "inline" || n === "popup")
        return n;
    }
    function gt(n) {
      const e = M;
      return e.required.object({
        max: e.optional.number,
        min: e.optional.number,
        step: e.optional.number
      })(n).value;
    }
    function Vi(n) {
      if (Array.isArray(n))
        return n;
      const e = [];
      return Object.keys(n).forEach((t) => {
        e.push({ text: t, value: n[t] });
      }), e;
    }
    function Wn(n) {
      return _(n) ? null : new at(Vi(n));
    }
    function Tr(n) {
      const e = n ? we(n, Yn) : null;
      return e ? e.step : null;
    }
    function Jn(n, e) {
      const t = n && we(n, Yn);
      return t ? Ps(t.step) : Math.max(Ps(e), 2);
    }
    function qt(n) {
      const e = Tr(n);
      return e ?? 1;
    }
    function Qt(n, e) {
      var t;
      const l = n && we(n, Yn), v = Math.abs((t = l == null ? void 0 : l.step) !== null && t !== void 0 ? t : e);
      return v === 0 ? 0.1 : Math.pow(10, Math.floor(Math.log10(v)) - 1);
    }
    const En = D("ckb");
    class Ts {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.element = e.createElement("div"), this.element.classList.add(En()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("label");
        l.classList.add(En("l")), this.element.appendChild(l);
        const v = e.createElement("input");
        v.classList.add(En("i")), v.type = "checkbox", l.appendChild(v), this.inputElement = v, t.viewProps.bindDisabled(this.inputElement);
        const E = e.createElement("div");
        E.classList.add(En("w")), l.appendChild(E);
        const k = xt(e, "check");
        E.appendChild(k), t.value.emitter.on("change", this.onValueChange_), this.value = t.value, this.update_();
      }
      update_() {
        this.inputElement.checked = this.value.rawValue;
      }
      onValueChange_() {
        this.update_();
      }
    }
    class ks {
      constructor(e, t) {
        this.onInputChange_ = this.onInputChange_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.view = new Ts(e, {
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_);
      }
      onInputChange_(e) {
        const t = e.currentTarget;
        this.value.rawValue = t.checked;
      }
    }
    function Cn(n) {
      const e = [], t = Wn(n.options);
      return t && e.push(t), new Ct2(e);
    }
    const Ms = {
      id: "input-bool",
      type: "input",
      accept: (n, e) => {
        if (typeof n != "boolean")
          return null;
        const l = ce(e, {
          options: M.optional.custom(xn)
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => hs,
        constraint: (n) => Cn(n.params),
        writer: (n) => Ot
      },
      controller: (n) => {
        const e = n.document, t = n.value, l = n.constraint, v = l && we(l, at);
        return v ? new mn(e, {
          props: new X({
            options: v.values.value("options")
          }),
          value: t,
          viewProps: n.viewProps
        }) : new ks(e, {
          value: t,
          viewProps: n.viewProps
        });
      }
    }, Mt = D("col");
    class ei {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(Mt()), t.foldable.bindExpandedClass(this.element, Mt(void 0, "expanded")), O(t.foldable, "completed", K(this.element, Mt(void 0, "cpl")));
        const l = e.createElement("div");
        l.classList.add(Mt("h")), this.element.appendChild(l);
        const v = e.createElement("div");
        v.classList.add(Mt("s")), l.appendChild(v), this.swatchElement = v;
        const E = e.createElement("div");
        if (E.classList.add(Mt("t")), l.appendChild(E), this.textElement = E, t.pickerLayout === "inline") {
          const k = e.createElement("div");
          k.classList.add(Mt("p")), this.element.appendChild(k), this.pickerElement = k;
        } else
          this.pickerElement = null;
      }
    }
    function kr(n, e, t) {
      const l = Ae(n / 255, 0, 1), v = Ae(e / 255, 0, 1), E = Ae(t / 255, 0, 1), k = Math.max(l, v, E), B = Math.min(l, v, E), Q = k - B;
      let ee = 0, me = 0;
      const be = (B + k) / 2;
      return Q !== 0 && (me = Q / (1 - Math.abs(k + B - 1)), l === k ? ee = (v - E) / Q : v === k ? ee = 2 + (E - l) / Q : ee = 4 + (l - v) / Q, ee = ee / 6 + (ee < 0 ? 1 : 0)), [ee * 360, me * 100, be * 100];
    }
    function Di(n, e, t) {
      const l = (n % 360 + 360) % 360, v = Ae(e / 100, 0, 1), E = Ae(t / 100, 0, 1), k = (1 - Math.abs(2 * E - 1)) * v, B = k * (1 - Math.abs(l / 60 % 2 - 1)), Q = E - k / 2;
      let ee, me, be;
      return l >= 0 && l < 60 ? [ee, me, be] = [k, B, 0] : l >= 60 && l < 120 ? [ee, me, be] = [B, k, 0] : l >= 120 && l < 180 ? [ee, me, be] = [0, k, B] : l >= 180 && l < 240 ? [ee, me, be] = [0, B, k] : l >= 240 && l < 300 ? [ee, me, be] = [B, 0, k] : [ee, me, be] = [k, 0, B], [(ee + Q) * 255, (me + Q) * 255, (be + Q) * 255];
    }
    function Mr(n, e, t) {
      const l = Ae(n / 255, 0, 1), v = Ae(e / 255, 0, 1), E = Ae(t / 255, 0, 1), k = Math.max(l, v, E), B = Math.min(l, v, E), Q = k - B;
      let ee;
      Q === 0 ? ee = 0 : k === l ? ee = 60 * (((v - E) / Q % 6 + 6) % 6) : k === v ? ee = 60 * ((E - l) / Q + 2) : ee = 60 * ((l - v) / Q + 4);
      const me = k === 0 ? 0 : Q / k, be = k;
      return [ee, me * 100, be * 100];
    }
    function Ss(n, e, t) {
      const l = Ri(n, 360), v = Ae(e / 100, 0, 1), E = Ae(t / 100, 0, 1), k = E * v, B = k * (1 - Math.abs(l / 60 % 2 - 1)), Q = E - k;
      let ee, me, be;
      return l >= 0 && l < 60 ? [ee, me, be] = [k, B, 0] : l >= 60 && l < 120 ? [ee, me, be] = [B, k, 0] : l >= 120 && l < 180 ? [ee, me, be] = [0, k, B] : l >= 180 && l < 240 ? [ee, me, be] = [0, B, k] : l >= 240 && l < 300 ? [ee, me, be] = [B, 0, k] : [ee, me, be] = [k, 0, B], [(ee + Q) * 255, (me + Q) * 255, (be + Q) * 255];
    }
    function Sr(n, e, t) {
      const l = t + e * (100 - Math.abs(2 * t - 100)) / 200;
      return [
        n,
        l !== 0 ? e * (100 - Math.abs(2 * t - 100)) / l : 0,
        t + e * (100 - Math.abs(2 * t - 100)) / (2 * 100)
      ];
    }
    function Ar(n, e, t) {
      const l = 100 - Math.abs(t * (200 - e) / 100 - 100);
      return [n, l !== 0 ? e * t / l : 0, t * (200 - e) / (2 * 100)];
    }
    function d(n) {
      return [n[0], n[1], n[2]];
    }
    function o(n, e) {
      return [n[0], n[1], n[2], e];
    }
    const p = {
      hsl: {
        hsl: (n, e, t) => [n, e, t],
        hsv: Sr,
        rgb: Di
      },
      hsv: {
        hsl: Ar,
        hsv: (n, e, t) => [n, e, t],
        rgb: Ss
      },
      rgb: {
        hsl: kr,
        hsv: Mr,
        rgb: (n, e, t) => [n, e, t]
      }
    };
    function f(n, e) {
      return [
        e === "float" ? 1 : n === "rgb" ? 255 : 360,
        e === "float" ? 1 : n === "rgb" ? 255 : 100,
        e === "float" ? 1 : n === "rgb" ? 255 : 100
      ];
    }
    function x(n, e) {
      return n === e ? e : Ri(n, e);
    }
    function T(n, e, t) {
      var l;
      const v = f(e, t);
      return [
        e === "rgb" ? Ae(n[0], 0, v[0]) : x(n[0], v[0]),
        Ae(n[1], 0, v[1]),
        Ae(n[2], 0, v[2]),
        Ae((l = n[3]) !== null && l !== void 0 ? l : 1, 0, 1)
      ];
    }
    function L(n, e, t, l) {
      const v = f(e, t), E = f(e, l);
      return n.map((k, B) => k / v[B] * E[B]);
    }
    function z(n, e, t) {
      const l = L(n, e.mode, e.type, "int"), v = p[e.mode][t.mode](...l);
      return L(v, t.mode, "int", t.type);
    }
    function re(n, e) {
      return typeof n != "object" || _(n) ? false : e in n && typeof n[e] == "number";
    }
    class W {
      constructor(e, t, l = "int") {
        this.mode = t, this.type = l, this.comps_ = T(e, t, l);
      }
      static black(e = "int") {
        return new W([0, 0, 0], "rgb", e);
      }
      static fromObject(e, t = "int") {
        const l = "a" in e ? [e.r, e.g, e.b, e.a] : [e.r, e.g, e.b];
        return new W(l, "rgb", t);
      }
      static toRgbaObject(e, t = "int") {
        return e.toRgbaObject(t);
      }
      static isRgbColorObject(e) {
        return re(e, "r") && re(e, "g") && re(e, "b");
      }
      static isRgbaColorObject(e) {
        return this.isRgbColorObject(e) && re(e, "a");
      }
      static isColorObject(e) {
        return this.isRgbColorObject(e);
      }
      static equals(e, t) {
        if (e.mode !== t.mode)
          return false;
        const l = e.comps_, v = t.comps_;
        for (let E = 0; E < l.length; E++)
          if (l[E] !== v[E])
            return false;
        return true;
      }
      getComponents(e, t = "int") {
        return o(z(d(this.comps_), { mode: this.mode, type: this.type }, { mode: e ?? this.mode, type: t }), this.comps_[3]);
      }
      toRgbaObject(e = "int") {
        const t = this.getComponents("rgb", e);
        return {
          r: t[0],
          g: t[1],
          b: t[2],
          a: t[3]
        };
      }
    }
    const Fe = D("colp");
    class Oi {
      constructor(e, t) {
        this.alphaViews_ = null, this.element = e.createElement("div"), this.element.classList.add(Fe()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(Fe("hsv"));
        const v = e.createElement("div");
        v.classList.add(Fe("sv")), this.svPaletteView_ = t.svPaletteView, v.appendChild(this.svPaletteView_.element), l.appendChild(v);
        const E = e.createElement("div");
        E.classList.add(Fe("h")), this.hPaletteView_ = t.hPaletteView, E.appendChild(this.hPaletteView_.element), l.appendChild(E), this.element.appendChild(l);
        const k = e.createElement("div");
        if (k.classList.add(Fe("rgb")), this.textView_ = t.textView, k.appendChild(this.textView_.element), this.element.appendChild(k), t.alphaViews) {
          this.alphaViews_ = {
            palette: t.alphaViews.palette,
            text: t.alphaViews.text
          };
          const B = e.createElement("div");
          B.classList.add(Fe("a"));
          const Q = e.createElement("div");
          Q.classList.add(Fe("ap")), Q.appendChild(this.alphaViews_.palette.element), B.appendChild(Q);
          const ee = e.createElement("div");
          ee.classList.add(Fe("at")), ee.appendChild(this.alphaViews_.text.element), B.appendChild(ee), this.element.appendChild(B);
        }
      }
      get allFocusableElements() {
        const e = [
          this.svPaletteView_.element,
          this.hPaletteView_.element,
          this.textView_.modeSelectElement,
          ...this.textView_.textViews.map((t) => t.inputElement)
        ];
        return this.alphaViews_ && e.push(this.alphaViews_.palette.element, this.alphaViews_.text.inputElement), e;
      }
    }
    function Lr(n) {
      return n === "int" ? "int" : n === "float" ? "float" : void 0;
    }
    function Ni(n) {
      const e = M;
      return ce(n, {
        alpha: e.optional.boolean,
        color: e.optional.object({
          alpha: e.optional.boolean,
          type: e.optional.custom(Lr)
        }),
        expanded: e.optional.boolean,
        picker: e.optional.custom(kt)
      });
    }
    function Pn(n) {
      return n ? 0.1 : 1;
    }
    function Tn(n) {
      var e;
      return (e = n.color) === null || e === void 0 ? void 0 : e.type;
    }
    function sl(n, e) {
      return n.alpha === e.alpha && n.mode === e.mode && n.notation === e.notation && n.type === e.type;
    }
    function pt(n, e) {
      const t = n.match(/^(.+)%$/);
      return Math.min(t ? parseFloat(t[1]) * 0.01 * e : parseFloat(n), e);
    }
    const rl = {
      deg: (n) => n,
      grad: (n) => n * 360 / 400,
      rad: (n) => n * 360 / (2 * Math.PI),
      turn: (n) => n * 360
    };
    function xo(n) {
      const e = n.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);
      if (!e)
        return parseFloat(n);
      const t = parseFloat(e[1]), l = e[2];
      return rl[l](t);
    }
    function Eo(n) {
      const e = n.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
      if (!e)
        return null;
      const t = [
        pt(e[1], 255),
        pt(e[2], 255),
        pt(e[3], 255)
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) ? null : t;
    }
    function Co(n) {
      return (e) => {
        const t = Eo(e);
        return t ? new W(t, "rgb", n) : null;
      };
    }
    function Po(n) {
      const e = n.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
      if (!e)
        return null;
      const t = [
        pt(e[1], 255),
        pt(e[2], 255),
        pt(e[3], 255),
        pt(e[4], 1)
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) || isNaN(t[3]) ? null : t;
    }
    function To(n) {
      return (e) => {
        const t = Po(e);
        return t ? new W(t, "rgb", n) : null;
      };
    }
    function ko(n) {
      const e = n.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
      if (!e)
        return null;
      const t = [
        xo(e[1]),
        pt(e[2], 100),
        pt(e[3], 100)
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) ? null : t;
    }
    function Mo(n) {
      return (e) => {
        const t = ko(e);
        return t ? new W(t, "hsl", n) : null;
      };
    }
    function So(n) {
      const e = n.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
      if (!e)
        return null;
      const t = [
        xo(e[1]),
        pt(e[2], 100),
        pt(e[3], 100),
        pt(e[4], 1)
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) || isNaN(t[3]) ? null : t;
    }
    function Ao(n) {
      return (e) => {
        const t = So(e);
        return t ? new W(t, "hsl", n) : null;
      };
    }
    function Lo(n) {
      const e = n.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
      if (e)
        return [
          parseInt(e[1] + e[1], 16),
          parseInt(e[2] + e[2], 16),
          parseInt(e[3] + e[3], 16)
        ];
      const t = n.match(/^(?:#|0x)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
      return t ? [
        parseInt(t[1], 16),
        parseInt(t[2], 16),
        parseInt(t[3], 16)
      ] : null;
    }
    function ol(n) {
      const e = Lo(n);
      return e ? new W(e, "rgb", "int") : null;
    }
    function Ro(n) {
      const e = n.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
      if (e)
        return [
          parseInt(e[1] + e[1], 16),
          parseInt(e[2] + e[2], 16),
          parseInt(e[3] + e[3], 16),
          Ee(parseInt(e[4] + e[4], 16), 0, 255, 0, 1)
        ];
      const t = n.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
      return t ? [
        parseInt(t[1], 16),
        parseInt(t[2], 16),
        parseInt(t[3], 16),
        Ee(parseInt(t[4], 16), 0, 255, 0, 1)
      ] : null;
    }
    function al(n) {
      const e = Ro(n);
      return e ? new W(e, "rgb", "int") : null;
    }
    function Io(n) {
      const e = n.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);
      if (!e)
        return null;
      const t = [
        parseFloat(e[1]),
        parseFloat(e[2]),
        parseFloat(e[3])
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) ? null : t;
    }
    function Vo(n) {
      return (e) => {
        const t = Io(e);
        return t ? new W(t, "rgb", n) : null;
      };
    }
    function Do(n) {
      const e = n.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*a\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);
      if (!e)
        return null;
      const t = [
        parseFloat(e[1]),
        parseFloat(e[2]),
        parseFloat(e[3]),
        parseFloat(e[4])
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) || isNaN(t[3]) ? null : t;
    }
    function Oo(n) {
      return (e) => {
        const t = Do(e);
        return t ? new W(t, "rgb", n) : null;
      };
    }
    const ll = [
      {
        parser: Lo,
        result: {
          alpha: false,
          mode: "rgb",
          notation: "hex"
        }
      },
      {
        parser: Ro,
        result: {
          alpha: true,
          mode: "rgb",
          notation: "hex"
        }
      },
      {
        parser: Eo,
        result: {
          alpha: false,
          mode: "rgb",
          notation: "func"
        }
      },
      {
        parser: Po,
        result: {
          alpha: true,
          mode: "rgb",
          notation: "func"
        }
      },
      {
        parser: ko,
        result: {
          alpha: false,
          mode: "hsl",
          notation: "func"
        }
      },
      {
        parser: So,
        result: {
          alpha: true,
          mode: "hsl",
          notation: "func"
        }
      },
      {
        parser: Io,
        result: {
          alpha: false,
          mode: "rgb",
          notation: "object"
        }
      },
      {
        parser: Do,
        result: {
          alpha: true,
          mode: "rgb",
          notation: "object"
        }
      }
    ];
    function cl(n) {
      return ll.reduce((e, { parser: t, result: l }) => e || (t(n) ? l : null), null);
    }
    function Rr(n, e = "int") {
      const t = cl(n);
      return t ? t.notation === "hex" && e !== "float" ? Object.assign(Object.assign({}, t), { type: "int" }) : t.notation === "func" ? Object.assign(Object.assign({}, t), { type: e }) : null : null;
    }
    const No = {
      int: [
        ol,
        al,
        Co("int"),
        To("int"),
        Mo("int"),
        Ao("int"),
        Vo("int"),
        Oo("int")
      ],
      float: [
        Co("float"),
        To("float"),
        Mo("float"),
        Ao("float"),
        Vo("float"),
        Oo("float")
      ]
    };
    function pl(n) {
      const e = No[n];
      return (t) => {
        if (typeof t != "string")
          return W.black(n);
        const l = e.reduce((v, E) => v || E(t), null);
        return l ?? W.black(n);
      };
    }
    function Ir(n) {
      const e = No[n];
      return (t) => e.reduce((l, v) => l || v(t), null);
    }
    function Fo(n) {
      const e = Ae(Math.floor(n), 0, 255).toString(16);
      return e.length === 1 ? `0${e}` : e;
    }
    function Bo(n, e = "#") {
      const t = d(n.getComponents("rgb")).map(Fo).join("");
      return `${e}${t}`;
    }
    function Vr(n, e = "#") {
      const t = n.getComponents("rgb"), l = [t[0], t[1], t[2], t[3] * 255].map(Fo).join("");
      return `${e}${l}`;
    }
    function jo(n, e) {
      const t = Ve(e === "float" ? 2 : 0);
      return `rgb(${d(n.getComponents("rgb", e)).map((v) => t(v)).join(", ")})`;
    }
    function ul(n) {
      return (e) => jo(e, n);
    }
    function As(n, e) {
      const t = Ve(2), l = Ve(e === "float" ? 2 : 0);
      return `rgba(${n.getComponents("rgb", e).map((E, k) => (k === 3 ? t : l)(E)).join(", ")})`;
    }
    function hl(n) {
      return (e) => As(e, n);
    }
    function dl(n) {
      const e = [
        Ve(0),
        gn,
        gn
      ];
      return `hsl(${d(n.getComponents("hsl")).map((l, v) => e[v](l)).join(", ")})`;
    }
    function ml(n) {
      const e = [
        Ve(0),
        gn,
        gn,
        Ve(2)
      ];
      return `hsla(${n.getComponents("hsl").map((l, v) => e[v](l)).join(", ")})`;
    }
    function zo(n, e) {
      const t = Ve(e === "float" ? 2 : 0), l = ["r", "g", "b"];
      return `{${d(n.getComponents("rgb", e)).map((E, k) => `${l[k]}: ${t(E)}`).join(", ")}}`;
    }
    function fl(n) {
      return (e) => zo(e, n);
    }
    function Uo(n, e) {
      const t = Ve(2), l = Ve(e === "float" ? 2 : 0), v = ["r", "g", "b", "a"];
      return `{${n.getComponents("rgb", e).map((k, B) => {
        const Q = B === 3 ? t : l;
        return `${v[B]}: ${Q(k)}`;
      }).join(", ")}}`;
    }
    function vl(n) {
      return (e) => Uo(e, n);
    }
    const bl = [
      {
        format: {
          alpha: false,
          mode: "rgb",
          notation: "hex",
          type: "int"
        },
        stringifier: Bo
      },
      {
        format: {
          alpha: true,
          mode: "rgb",
          notation: "hex",
          type: "int"
        },
        stringifier: Vr
      },
      {
        format: {
          alpha: false,
          mode: "hsl",
          notation: "func",
          type: "int"
        },
        stringifier: dl
      },
      {
        format: {
          alpha: true,
          mode: "hsl",
          notation: "func",
          type: "int"
        },
        stringifier: ml
      },
      ...["int", "float"].reduce((n, e) => [
        ...n,
        {
          format: {
            alpha: false,
            mode: "rgb",
            notation: "func",
            type: e
          },
          stringifier: ul(e)
        },
        {
          format: {
            alpha: true,
            mode: "rgb",
            notation: "func",
            type: e
          },
          stringifier: hl(e)
        },
        {
          format: {
            alpha: false,
            mode: "rgb",
            notation: "object",
            type: e
          },
          stringifier: fl(e)
        },
        {
          format: {
            alpha: true,
            mode: "rgb",
            notation: "object",
            type: e
          },
          stringifier: vl(e)
        }
      ], [])
    ];
    function Dr(n) {
      return bl.reduce((e, t) => e || (sl(t.format, n) ? t.stringifier : null), null);
    }
    const Fi = D("apl");
    class gl {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.value = t.value, this.value.emitter.on("change", this.onValueChange_), this.element = e.createElement("div"), this.element.classList.add(Fi()), t.viewProps.bindClassModifiers(this.element), t.viewProps.bindTabIndex(this.element);
        const l = e.createElement("div");
        l.classList.add(Fi("b")), this.element.appendChild(l);
        const v = e.createElement("div");
        v.classList.add(Fi("c")), l.appendChild(v), this.colorElem_ = v;
        const E = e.createElement("div");
        E.classList.add(Fi("m")), this.element.appendChild(E), this.markerElem_ = E;
        const k = e.createElement("div");
        k.classList.add(Fi("p")), this.markerElem_.appendChild(k), this.previewElem_ = k, this.update_();
      }
      update_() {
        const e = this.value.rawValue, t = e.getComponents("rgb"), l = new W([t[0], t[1], t[2], 0], "rgb"), v = new W([t[0], t[1], t[2], 255], "rgb"), E = [
          "to right",
          As(l),
          As(v)
        ];
        this.colorElem_.style.background = `linear-gradient(${E.join(",")})`, this.previewElem_.style.backgroundColor = As(e);
        const k = Ee(t[3], 0, 1, 0, 100);
        this.markerElem_.style.left = `${k}%`;
      }
      onValueChange_() {
        this.update_();
      }
    }
    class _l {
      constructor(e, t) {
        this.onKeyDown_ = this.onKeyDown_.bind(this), this.onKeyUp_ = this.onKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.view = new gl(e, {
          value: this.value,
          viewProps: this.viewProps
        }), this.ptHandler_ = new bt(this.view.element), this.ptHandler_.emitter.on("down", this.onPointerDown_), this.ptHandler_.emitter.on("move", this.onPointerMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.element.addEventListener("keydown", this.onKeyDown_), this.view.element.addEventListener("keyup", this.onKeyUp_);
      }
      handlePointerEvent_(e, t) {
        if (!e.point)
          return;
        const l = e.point.x / e.bounds.width, v = this.value.rawValue, [E, k, B] = v.getComponents("hsv");
        this.value.setRawValue(new W([E, k, B, l], "hsv"), t);
      }
      onPointerDown_(e) {
        this.handlePointerEvent_(e.data, {
          forceEmit: false,
          last: false
        });
      }
      onPointerMove_(e) {
        this.handlePointerEvent_(e.data, {
          forceEmit: false,
          last: false
        });
      }
      onPointerUp_(e) {
        this.handlePointerEvent_(e.data, {
          forceEmit: true,
          last: true
        });
      }
      onKeyDown_(e) {
        const t = Le(Pn(true), nt(e));
        if (t === 0)
          return;
        const l = this.value.rawValue, [v, E, k, B] = l.getComponents("hsv");
        this.value.setRawValue(new W([v, E, k, B + t], "hsv"), {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(e) {
        Le(Pn(true), nt(e)) !== 0 && this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    const ti = D("coltxt");
    function wl(n) {
      const e = n.createElement("select"), t = [
        { text: "RGB", value: "rgb" },
        { text: "HSL", value: "hsl" },
        { text: "HSV", value: "hsv" }
      ];
      return e.appendChild(t.reduce((l, v) => {
        const E = n.createElement("option");
        return E.textContent = v.text, E.value = v.value, l.appendChild(E), l;
      }, n.createDocumentFragment())), e;
    }
    class yl {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(ti()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(ti("m")), this.modeElem_ = wl(e), this.modeElem_.classList.add(ti("ms")), l.appendChild(this.modeSelectElement), t.viewProps.bindDisabled(this.modeElem_);
        const v = e.createElement("div");
        v.classList.add(ti("mm")), v.appendChild(xt(e, "dropdown")), l.appendChild(v), this.element.appendChild(l);
        const E = e.createElement("div");
        E.classList.add(ti("w")), this.element.appendChild(E), this.textsElem_ = E, this.textViews_ = t.textViews, this.applyTextViews_(), N(t.colorMode, (k) => {
          this.modeElem_.value = k;
        });
      }
      get modeSelectElement() {
        return this.modeElem_;
      }
      get textViews() {
        return this.textViews_;
      }
      set textViews(e) {
        this.textViews_ = e, this.applyTextViews_();
      }
      applyTextViews_() {
        ln(this.textsElem_);
        const e = this.element.ownerDocument;
        this.textViews_.forEach((t) => {
          const l = e.createElement("div");
          l.classList.add(ti("c")), l.appendChild(t.element), this.textsElem_.appendChild(l);
        });
      }
    }
    function xl(n) {
      return Ve(n === "float" ? 2 : 0);
    }
    function El(n, e, t) {
      const l = f(n, e)[t];
      return new Vt({
        min: 0,
        max: l
      });
    }
    function Or(n, e, t) {
      return new Yt(n, {
        arrayPosition: t === 0 ? "fst" : t === 3 - 1 ? "lst" : "mid",
        baseStep: Pn(false),
        parser: e.parser,
        props: X.fromObject({
          draggingScale: e.colorType === "float" ? 0.01 : 1,
          formatter: xl(e.colorType)
        }),
        value: te(0, {
          constraint: El(e.colorMode, e.colorType, t)
        }),
        viewProps: e.viewProps
      });
    }
    class Cl {
      constructor(e, t) {
        this.onModeSelectChange_ = this.onModeSelectChange_.bind(this), this.colorType_ = t.colorType, this.parser_ = t.parser, this.value = t.value, this.viewProps = t.viewProps, this.colorMode = te(this.value.rawValue.mode), this.ccs_ = this.createComponentControllers_(e), this.view = new yl(e, {
          colorMode: this.colorMode,
          textViews: [this.ccs_[0].view, this.ccs_[1].view, this.ccs_[2].view],
          viewProps: this.viewProps
        }), this.view.modeSelectElement.addEventListener("change", this.onModeSelectChange_);
      }
      createComponentControllers_(e) {
        const t = {
          colorMode: this.colorMode.rawValue,
          colorType: this.colorType_,
          parser: this.parser_,
          viewProps: this.viewProps
        }, l = [
          Or(e, t, 0),
          Or(e, t, 1),
          Or(e, t, 2)
        ];
        return l.forEach((v, E) => {
          $t({
            primary: this.value,
            secondary: v.value,
            forward: (k) => k.rawValue.getComponents(this.colorMode.rawValue, this.colorType_)[E],
            backward: (k, B) => {
              const Q = this.colorMode.rawValue, ee = k.rawValue.getComponents(Q, this.colorType_);
              return ee[E] = B.rawValue, new W(o(d(ee), ee[3]), Q, this.colorType_);
            }
          });
        }), l;
      }
      onModeSelectChange_(e) {
        const t = e.currentTarget;
        this.colorMode.rawValue = t.value, this.ccs_ = this.createComponentControllers_(this.view.element.ownerDocument), this.view.textViews = [
          this.ccs_[0].view,
          this.ccs_[1].view,
          this.ccs_[2].view
        ];
      }
    }
    const Nr = D("hpl");
    class Pl {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.value = t.value, this.value.emitter.on("change", this.onValueChange_), this.element = e.createElement("div"), this.element.classList.add(Nr()), t.viewProps.bindClassModifiers(this.element), t.viewProps.bindTabIndex(this.element);
        const l = e.createElement("div");
        l.classList.add(Nr("c")), this.element.appendChild(l);
        const v = e.createElement("div");
        v.classList.add(Nr("m")), this.element.appendChild(v), this.markerElem_ = v, this.update_();
      }
      update_() {
        const e = this.value.rawValue, [t] = e.getComponents("hsv");
        this.markerElem_.style.backgroundColor = jo(new W([t, 100, 100], "hsv"));
        const l = Ee(t, 0, 360, 0, 100);
        this.markerElem_.style.left = `${l}%`;
      }
      onValueChange_() {
        this.update_();
      }
    }
    class Tl {
      constructor(e, t) {
        this.onKeyDown_ = this.onKeyDown_.bind(this), this.onKeyUp_ = this.onKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.view = new Pl(e, {
          value: this.value,
          viewProps: this.viewProps
        }), this.ptHandler_ = new bt(this.view.element), this.ptHandler_.emitter.on("down", this.onPointerDown_), this.ptHandler_.emitter.on("move", this.onPointerMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.element.addEventListener("keydown", this.onKeyDown_), this.view.element.addEventListener("keyup", this.onKeyUp_);
      }
      handlePointerEvent_(e, t) {
        if (!e.point)
          return;
        const l = Ee(Ae(e.point.x, 0, e.bounds.width), 0, e.bounds.width, 0, 360), v = this.value.rawValue, [, E, k, B] = v.getComponents("hsv");
        this.value.setRawValue(new W([l, E, k, B], "hsv"), t);
      }
      onPointerDown_(e) {
        this.handlePointerEvent_(e.data, {
          forceEmit: false,
          last: false
        });
      }
      onPointerMove_(e) {
        this.handlePointerEvent_(e.data, {
          forceEmit: false,
          last: false
        });
      }
      onPointerUp_(e) {
        this.handlePointerEvent_(e.data, {
          forceEmit: true,
          last: true
        });
      }
      onKeyDown_(e) {
        const t = Le(Pn(false), nt(e));
        if (t === 0)
          return;
        const l = this.value.rawValue, [v, E, k, B] = l.getComponents("hsv");
        this.value.setRawValue(new W([v + t, E, k, B], "hsv"), {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(e) {
        Le(Pn(false), nt(e)) !== 0 && this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    const Fr = D("svp"), Go = 64;
    class kl {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.value = t.value, this.value.emitter.on("change", this.onValueChange_), this.element = e.createElement("div"), this.element.classList.add(Fr()), t.viewProps.bindClassModifiers(this.element), t.viewProps.bindTabIndex(this.element);
        const l = e.createElement("canvas");
        l.height = Go, l.width = Go, l.classList.add(Fr("c")), this.element.appendChild(l), this.canvasElement = l;
        const v = e.createElement("div");
        v.classList.add(Fr("m")), this.element.appendChild(v), this.markerElem_ = v, this.update_();
      }
      update_() {
        const e = zn(this.canvasElement);
        if (!e)
          return;
        const l = this.value.rawValue.getComponents("hsv"), v = this.canvasElement.width, E = this.canvasElement.height, k = e.getImageData(0, 0, v, E), B = k.data;
        for (let me = 0; me < E; me++)
          for (let be = 0; be < v; be++) {
            const Ft = Ee(be, 0, v, 0, 100), ji = Ee(me, 0, E, 100, 0), zi = Ss(l[0], Ft, ji), ri = (me * v + be) * 4;
            B[ri] = zi[0], B[ri + 1] = zi[1], B[ri + 2] = zi[2], B[ri + 3] = 255;
          }
        e.putImageData(k, 0, 0);
        const Q = Ee(l[1], 0, 100, 0, 100);
        this.markerElem_.style.left = `${Q}%`;
        const ee = Ee(l[2], 0, 100, 100, 0);
        this.markerElem_.style.top = `${ee}%`;
      }
      onValueChange_() {
        this.update_();
      }
    }
    class Ml {
      constructor(e, t) {
        this.onKeyDown_ = this.onKeyDown_.bind(this), this.onKeyUp_ = this.onKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.view = new kl(e, {
          value: this.value,
          viewProps: this.viewProps
        }), this.ptHandler_ = new bt(this.view.element), this.ptHandler_.emitter.on("down", this.onPointerDown_), this.ptHandler_.emitter.on("move", this.onPointerMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.element.addEventListener("keydown", this.onKeyDown_), this.view.element.addEventListener("keyup", this.onKeyUp_);
      }
      handlePointerEvent_(e, t) {
        if (!e.point)
          return;
        const l = Ee(e.point.x, 0, e.bounds.width, 0, 100), v = Ee(e.point.y, 0, e.bounds.height, 100, 0), [E, , , k] = this.value.rawValue.getComponents("hsv");
        this.value.setRawValue(new W([E, l, v, k], "hsv"), t);
      }
      onPointerDown_(e) {
        this.handlePointerEvent_(e.data, {
          forceEmit: false,
          last: false
        });
      }
      onPointerMove_(e) {
        this.handlePointerEvent_(e.data, {
          forceEmit: false,
          last: false
        });
      }
      onPointerUp_(e) {
        this.handlePointerEvent_(e.data, {
          forceEmit: true,
          last: true
        });
      }
      onKeyDown_(e) {
        Li(e.key) && e.preventDefault();
        const [t, l, v, E] = this.value.rawValue.getComponents("hsv"), k = Pn(false), B = Le(k, nt(e)), Q = Le(k, Xt(e));
        B === 0 && Q === 0 || this.value.setRawValue(new W([t, l + B, v + Q, E], "hsv"), {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(e) {
        const t = Pn(false), l = Le(t, nt(e)), v = Le(t, Xt(e));
        l === 0 && v === 0 || this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    class Sl {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.hPaletteC_ = new Tl(e, {
          value: this.value,
          viewProps: this.viewProps
        }), this.svPaletteC_ = new Ml(e, {
          value: this.value,
          viewProps: this.viewProps
        }), this.alphaIcs_ = t.supportsAlpha ? {
          palette: new _l(e, {
            value: this.value,
            viewProps: this.viewProps
          }),
          text: new Yt(e, {
            parser: lt,
            baseStep: 0.1,
            props: X.fromObject({
              draggingScale: 0.01,
              formatter: Ve(2)
            }),
            value: te(0, {
              constraint: new Vt({ min: 0, max: 1 })
            }),
            viewProps: this.viewProps
          })
        } : null, this.alphaIcs_ && $t({
          primary: this.value,
          secondary: this.alphaIcs_.text.value,
          forward: (l) => l.rawValue.getComponents()[3],
          backward: (l, v) => {
            const E = l.rawValue.getComponents();
            return E[3] = v.rawValue, new W(E, l.rawValue.mode);
          }
        }), this.textC_ = new Cl(e, {
          colorType: t.colorType,
          parser: lt,
          value: this.value,
          viewProps: this.viewProps
        }), this.view = new Oi(e, {
          alphaViews: this.alphaIcs_ ? {
            palette: this.alphaIcs_.palette.view,
            text: this.alphaIcs_.text.view
          } : null,
          hPaletteView: this.hPaletteC_.view,
          supportsAlpha: t.supportsAlpha,
          svPaletteView: this.svPaletteC_.view,
          textView: this.textC_.view,
          viewProps: this.viewProps
        });
      }
      get textController() {
        return this.textC_;
      }
    }
    const Br = D("colsw");
    class Al {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), t.value.emitter.on("change", this.onValueChange_), this.value = t.value, this.element = e.createElement("div"), this.element.classList.add(Br()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(Br("sw")), this.element.appendChild(l), this.swatchElem_ = l;
        const v = e.createElement("button");
        v.classList.add(Br("b")), t.viewProps.bindDisabled(v), this.element.appendChild(v), this.buttonElement = v, this.update_();
      }
      update_() {
        const e = this.value.rawValue;
        this.swatchElem_.style.backgroundColor = Vr(e);
      }
      onValueChange_() {
        this.update_();
      }
    }
    class Ll {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.view = new Al(e, {
          value: this.value,
          viewProps: this.viewProps
        });
      }
    }
    class jr {
      constructor(e, t) {
        this.onButtonBlur_ = this.onButtonBlur_.bind(this), this.onButtonClick_ = this.onButtonClick_.bind(this), this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this), this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.foldable_ = Ne.create(t.expanded), this.swatchC_ = new Ll(e, {
          value: this.value,
          viewProps: this.viewProps
        });
        const l = this.swatchC_.view.buttonElement;
        l.addEventListener("blur", this.onButtonBlur_), l.addEventListener("click", this.onButtonClick_), this.textC_ = new qn(e, {
          parser: t.parser,
          props: X.fromObject({
            formatter: t.formatter
          }),
          value: this.value,
          viewProps: this.viewProps
        }), this.view = new ei(e, {
          foldable: this.foldable_,
          pickerLayout: t.pickerLayout
        }), this.view.swatchElement.appendChild(this.swatchC_.view.element), this.view.textElement.appendChild(this.textC_.view.element), this.popC_ = t.pickerLayout === "popup" ? new ps(e, {
          viewProps: this.viewProps
        }) : null;
        const v = new Sl(e, {
          colorType: t.colorType,
          supportsAlpha: t.supportsAlpha,
          value: this.value,
          viewProps: this.viewProps
        });
        v.view.allFocusableElements.forEach((E) => {
          E.addEventListener("blur", this.onPopupChildBlur_), E.addEventListener("keydown", this.onPopupChildKeydown_);
        }), this.pickerC_ = v, this.popC_ ? (this.view.element.appendChild(this.popC_.view.element), this.popC_.view.element.appendChild(v.view.element), $t({
          primary: this.foldable_.value("expanded"),
          secondary: this.popC_.shows,
          forward: (E) => E.rawValue,
          backward: (E, k) => k.rawValue
        })) : this.view.pickerElement && (this.view.pickerElement.appendChild(this.pickerC_.view.element), Ke(this.foldable_, this.view.pickerElement));
      }
      get textController() {
        return this.textC_;
      }
      onButtonBlur_(e) {
        if (!this.popC_)
          return;
        const t = this.view.element, l = e.relatedTarget;
        (!l || !t.contains(l)) && (this.popC_.shows.rawValue = false);
      }
      onButtonClick_() {
        this.foldable_.set("expanded", !this.foldable_.get("expanded")), this.foldable_.get("expanded") && this.pickerC_.view.allFocusableElements[0].focus();
      }
      onPopupChildBlur_(e) {
        if (!this.popC_)
          return;
        const t = this.popC_.view.element, l = Et(e);
        l && t.contains(l) || l && l === this.swatchC_.view.buttonElement && !ft(t.ownerDocument) || (this.popC_.shows.rawValue = false);
      }
      onPopupChildKeydown_(e) {
        this.popC_ ? e.key === "Escape" && (this.popC_.shows.rawValue = false) : this.view.pickerElement && e.key === "Escape" && this.swatchC_.view.buttonElement.focus();
      }
    }
    function Rl(n, e) {
      return W.isColorObject(n) ? W.fromObject(n, e) : W.black(e);
    }
    function Il(n) {
      return d(n.getComponents("rgb")).reduce((e, t) => e << 8 | Math.floor(t) & 255, 0);
    }
    function Vl(n) {
      return n.getComponents("rgb").reduce((e, t, l) => {
        const v = Math.floor(l === 3 ? t * 255 : t) & 255;
        return e << 8 | v;
      }, 0) >>> 0;
    }
    function Dl(n) {
      return new W([n >> 16 & 255, n >> 8 & 255, n & 255], "rgb");
    }
    function Ol(n) {
      return new W([
        n >> 24 & 255,
        n >> 16 & 255,
        n >> 8 & 255,
        Ee(n & 255, 0, 255, 0, 1)
      ], "rgb");
    }
    function Nl(n) {
      return typeof n != "number" ? W.black() : Dl(n);
    }
    function Fl(n) {
      return typeof n != "number" ? W.black() : Ol(n);
    }
    function Bl(n) {
      const e = Dr(n);
      return e ? (t, l) => {
        Ot(t, e(l));
      } : null;
    }
    function jl(n) {
      const e = n ? Vl : Il;
      return (t, l) => {
        Ot(t, e(l));
      };
    }
    function zl(n, e, t) {
      const l = e.toRgbaObject(t);
      n.writeProperty("r", l.r), n.writeProperty("g", l.g), n.writeProperty("b", l.b), n.writeProperty("a", l.a);
    }
    function Ul(n, e, t) {
      const l = e.toRgbaObject(t);
      n.writeProperty("r", l.r), n.writeProperty("g", l.g), n.writeProperty("b", l.b);
    }
    function Gl(n, e) {
      return (t, l) => {
        n ? zl(t, l, e) : Ul(t, l, e);
      };
    }
    function zr(n) {
      var e;
      return !!(n != null && n.alpha || !((e = n == null ? void 0 : n.color) === null || e === void 0) && e.alpha);
    }
    function Hl(n) {
      return n ? (e) => Vr(e, "0x") : (e) => Bo(e, "0x");
    }
    function Kl(n) {
      return "color" in n || "view" in n && n.view === "color";
    }
    const $l = {
      id: "input-color-number",
      type: "input",
      accept: (n, e) => {
        if (typeof n != "number" || !Kl(e))
          return null;
        const t = Ni(e);
        return t ? {
          initialValue: n,
          params: t
        } : null;
      },
      binding: {
        reader: (n) => zr(n.params) ? Fl : Nl,
        equals: W.equals,
        writer: (n) => jl(zr(n.params))
      },
      controller: (n) => {
        const e = zr(n.params), t = "expanded" in n.params ? n.params.expanded : void 0, l = "picker" in n.params ? n.params.picker : void 0;
        return new jr(n.document, {
          colorType: "int",
          expanded: t ?? false,
          formatter: Hl(e),
          parser: Ir("int"),
          pickerLayout: l ?? "popup",
          supportsAlpha: e,
          value: n.value,
          viewProps: n.viewProps
        });
      }
    };
    function Xl(n) {
      return W.isRgbaColorObject(n);
    }
    function Yl(n) {
      return (e) => Rl(e, n);
    }
    function ql(n, e) {
      return (t) => n ? Uo(t, e) : zo(t, e);
    }
    const Ql = {
      id: "input-color-object",
      type: "input",
      accept: (n, e) => {
        if (!W.isColorObject(n))
          return null;
        const t = Ni(e);
        return t ? {
          initialValue: n,
          params: t
        } : null;
      },
      binding: {
        reader: (n) => Yl(Tn(n.params)),
        equals: W.equals,
        writer: (n) => Gl(Xl(n.initialValue), Tn(n.params))
      },
      controller: (n) => {
        var e;
        const t = W.isRgbaColorObject(n.initialValue), l = "expanded" in n.params ? n.params.expanded : void 0, v = "picker" in n.params ? n.params.picker : void 0, E = (e = Tn(n.params)) !== null && e !== void 0 ? e : "int";
        return new jr(n.document, {
          colorType: E,
          expanded: l ?? false,
          formatter: ql(t, E),
          parser: Ir(E),
          pickerLayout: v ?? "popup",
          supportsAlpha: t,
          value: n.value,
          viewProps: n.viewProps
        });
      }
    }, Zl = {
      id: "input-color-string",
      type: "input",
      accept: (n, e) => {
        if (typeof n != "string" || "view" in e && e.view === "text")
          return null;
        const t = Rr(n, Tn(e));
        if (!t || !Dr(t))
          return null;
        const v = Ni(e);
        return v ? {
          initialValue: n,
          params: v
        } : null;
      },
      binding: {
        reader: (n) => {
          var e;
          return pl((e = Tn(n.params)) !== null && e !== void 0 ? e : "int");
        },
        equals: W.equals,
        writer: (n) => {
          const e = Rr(n.initialValue, Tn(n.params));
          if (!e)
            throw S.shouldNeverHappen();
          const t = Bl(e);
          if (!t)
            throw S.notBindable();
          return t;
        }
      },
      controller: (n) => {
        const e = Rr(n.initialValue, Tn(n.params));
        if (!e)
          throw S.shouldNeverHappen();
        const t = Dr(e);
        if (!t)
          throw S.shouldNeverHappen();
        const l = "expanded" in n.params ? n.params.expanded : void 0, v = "picker" in n.params ? n.params.picker : void 0;
        return new jr(n.document, {
          colorType: e.type,
          expanded: l ?? false,
          formatter: t,
          parser: Ir(e.type),
          pickerLayout: v ?? "popup",
          supportsAlpha: e.alpha,
          value: n.value,
          viewProps: n.viewProps
        });
      }
    };
    class Zt {
      constructor(e) {
        this.components = e.components, this.asm_ = e.assembly;
      }
      constrain(e) {
        const t = this.asm_.toComponents(e).map((l, v) => {
          var E, k;
          return (k = (E = this.components[v]) === null || E === void 0 ? void 0 : E.constrain(l)) !== null && k !== void 0 ? k : l;
        });
        return this.asm_.fromComponents(t);
      }
    }
    const Ho = D("pndtxt");
    class Wl {
      constructor(e, t) {
        this.textViews = t.textViews, this.element = e.createElement("div"), this.element.classList.add(Ho()), this.textViews.forEach((l) => {
          const v = e.createElement("div");
          v.classList.add(Ho("a")), v.appendChild(l.element), this.element.appendChild(v);
        });
      }
    }
    function Jl(n, e, t) {
      return new Yt(n, {
        arrayPosition: t === 0 ? "fst" : t === e.axes.length - 1 ? "lst" : "mid",
        baseStep: e.axes[t].baseStep,
        parser: e.parser,
        props: e.axes[t].textProps,
        value: te(0, {
          constraint: e.axes[t].constraint
        }),
        viewProps: e.viewProps
      });
    }
    class Ur {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.acs_ = t.axes.map((l, v) => Jl(e, t, v)), this.acs_.forEach((l, v) => {
          $t({
            primary: this.value,
            secondary: l.value,
            forward: (E) => t.assembly.toComponents(E.rawValue)[v],
            backward: (E, k) => {
              const B = t.assembly.toComponents(E.rawValue);
              return B[v] = k.rawValue, t.assembly.fromComponents(B);
            }
          });
        }), this.view = new Wl(e, {
          textViews: this.acs_.map((l) => l.view)
        });
      }
    }
    function Ko(n, e) {
      return "step" in n && !_(n.step) ? new Yn(n.step, e) : null;
    }
    function $o(n) {
      return !_(n.max) && !_(n.min) ? new Vt({
        max: n.max,
        min: n.min
      }) : !_(n.max) || !_(n.min) ? new Xe({
        max: n.max,
        min: n.min
      }) : null;
    }
    function ec(n) {
      const e = we(n, Vt);
      if (e)
        return [e.values.get("min"), e.values.get("max")];
      const t = we(n, Xe);
      return t ? [t.minValue, t.maxValue] : [void 0, void 0];
    }
    function tc(n, e) {
      const t = [], l = Ko(n, e);
      l && t.push(l);
      const v = $o(n);
      v && t.push(v);
      const E = Wn(n.options);
      return E && t.push(E), new Ct2(t);
    }
    const nc = {
      id: "input-number",
      type: "input",
      accept: (n, e) => {
        if (typeof n != "number")
          return null;
        const t = M, l = ce(e, {
          format: t.optional.function,
          max: t.optional.number,
          min: t.optional.number,
          options: t.optional.custom(xn),
          step: t.optional.number
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => ws,
        constraint: (n) => tc(n.params, n.initialValue),
        writer: (n) => Ot
      },
      controller: (n) => {
        var e;
        const t = n.value, l = n.constraint, v = l && we(l, at);
        if (v)
          return new mn(n.document, {
            props: new X({
              options: v.values.value("options")
            }),
            value: t,
            viewProps: n.viewProps
          });
        const E = (e = "format" in n.params ? n.params.format : void 0) !== null && e !== void 0 ? e : Ve(Jn(l, t.rawValue)), k = l && we(l, Vt);
        return k ? new yn(n.document, {
          baseStep: qt(l),
          parser: lt,
          sliderProps: new X({
            maxValue: k.values.value("max"),
            minValue: k.values.value("min")
          }),
          textProps: X.fromObject({
            draggingScale: Qt(l, t.rawValue),
            formatter: E
          }),
          value: t,
          viewProps: n.viewProps
        }) : new Yt(n.document, {
          baseStep: qt(l),
          parser: lt,
          props: X.fromObject({
            draggingScale: Qt(l, t.rawValue),
            formatter: E
          }),
          value: t,
          viewProps: n.viewProps
        });
      }
    };
    class Wt {
      constructor(e = 0, t = 0) {
        this.x = e, this.y = t;
      }
      getComponents() {
        return [this.x, this.y];
      }
      static isObject(e) {
        if (_(e))
          return false;
        const t = e.x, l = e.y;
        return !(typeof t != "number" || typeof l != "number");
      }
      static equals(e, t) {
        return e.x === t.x && e.y === t.y;
      }
      toObject() {
        return {
          x: this.x,
          y: this.y
        };
      }
    }
    const Xo = {
      toComponents: (n) => n.getComponents(),
      fromComponents: (n) => new Wt(...n)
    }, ni = D("p2d");
    class ic {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(ni()), t.viewProps.bindClassModifiers(this.element), N(t.expanded, K(this.element, ni(void 0, "expanded")));
        const l = e.createElement("div");
        l.classList.add(ni("h")), this.element.appendChild(l);
        const v = e.createElement("button");
        v.classList.add(ni("b")), v.appendChild(xt(e, "p2dpad")), t.viewProps.bindDisabled(v), l.appendChild(v), this.buttonElement = v;
        const E = e.createElement("div");
        if (E.classList.add(ni("t")), l.appendChild(E), this.textElement = E, t.pickerLayout === "inline") {
          const k = e.createElement("div");
          k.classList.add(ni("p")), this.element.appendChild(k), this.pickerElement = k;
        } else
          this.pickerElement = null;
      }
    }
    const Jt = D("p2dp");
    class sc {
      constructor(e, t) {
        this.onFoldableChange_ = this.onFoldableChange_.bind(this), this.onValueChange_ = this.onValueChange_.bind(this), this.invertsY_ = t.invertsY, this.maxValue_ = t.maxValue, this.element = e.createElement("div"), this.element.classList.add(Jt()), t.layout === "popup" && this.element.classList.add(Jt(void 0, "p")), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(Jt("p")), t.viewProps.bindTabIndex(l), this.element.appendChild(l), this.padElement = l;
        const v = e.createElementNS(He, "svg");
        v.classList.add(Jt("g")), this.padElement.appendChild(v), this.svgElem_ = v;
        const E = e.createElementNS(He, "line");
        E.classList.add(Jt("ax")), E.setAttributeNS(null, "x1", "0"), E.setAttributeNS(null, "y1", "50%"), E.setAttributeNS(null, "x2", "100%"), E.setAttributeNS(null, "y2", "50%"), this.svgElem_.appendChild(E);
        const k = e.createElementNS(He, "line");
        k.classList.add(Jt("ax")), k.setAttributeNS(null, "x1", "50%"), k.setAttributeNS(null, "y1", "0"), k.setAttributeNS(null, "x2", "50%"), k.setAttributeNS(null, "y2", "100%"), this.svgElem_.appendChild(k);
        const B = e.createElementNS(He, "line");
        B.classList.add(Jt("l")), B.setAttributeNS(null, "x1", "50%"), B.setAttributeNS(null, "y1", "50%"), this.svgElem_.appendChild(B), this.lineElem_ = B;
        const Q = e.createElement("div");
        Q.classList.add(Jt("m")), this.padElement.appendChild(Q), this.markerElem_ = Q, t.value.emitter.on("change", this.onValueChange_), this.value = t.value, this.update_();
      }
      get allFocusableElements() {
        return [this.padElement];
      }
      update_() {
        const [e, t] = this.value.rawValue.getComponents(), l = this.maxValue_, v = Ee(e, -l, +l, 0, 100), E = Ee(t, -l, +l, 0, 100), k = this.invertsY_ ? 100 - E : E;
        this.lineElem_.setAttributeNS(null, "x2", `${v}%`), this.lineElem_.setAttributeNS(null, "y2", `${k}%`), this.markerElem_.style.left = `${v}%`, this.markerElem_.style.top = `${k}%`;
      }
      onValueChange_() {
        this.update_();
      }
      onFoldableChange_() {
        this.update_();
      }
    }
    function Yo(n, e, t) {
      return [
        Le(e[0], nt(n)),
        Le(e[1], Xt(n)) * (t ? 1 : -1)
      ];
    }
    class rc {
      constructor(e, t) {
        this.onPadKeyDown_ = this.onPadKeyDown_.bind(this), this.onPadKeyUp_ = this.onPadKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.baseSteps_ = t.baseSteps, this.maxValue_ = t.maxValue, this.invertsY_ = t.invertsY, this.view = new sc(e, {
          invertsY: this.invertsY_,
          layout: t.layout,
          maxValue: this.maxValue_,
          value: this.value,
          viewProps: this.viewProps
        }), this.ptHandler_ = new bt(this.view.padElement), this.ptHandler_.emitter.on("down", this.onPointerDown_), this.ptHandler_.emitter.on("move", this.onPointerMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.padElement.addEventListener("keydown", this.onPadKeyDown_), this.view.padElement.addEventListener("keyup", this.onPadKeyUp_);
      }
      handlePointerEvent_(e, t) {
        if (!e.point)
          return;
        const l = this.maxValue_, v = Ee(e.point.x, 0, e.bounds.width, -l, +l), E = Ee(this.invertsY_ ? e.bounds.height - e.point.y : e.point.y, 0, e.bounds.height, -l, +l);
        this.value.setRawValue(new Wt(v, E), t);
      }
      onPointerDown_(e) {
        this.handlePointerEvent_(e.data, {
          forceEmit: false,
          last: false
        });
      }
      onPointerMove_(e) {
        this.handlePointerEvent_(e.data, {
          forceEmit: false,
          last: false
        });
      }
      onPointerUp_(e) {
        this.handlePointerEvent_(e.data, {
          forceEmit: true,
          last: true
        });
      }
      onPadKeyDown_(e) {
        Li(e.key) && e.preventDefault();
        const [t, l] = Yo(e, this.baseSteps_, this.invertsY_);
        t === 0 && l === 0 || this.value.setRawValue(new Wt(this.value.rawValue.x + t, this.value.rawValue.y + l), {
          forceEmit: false,
          last: false
        });
      }
      onPadKeyUp_(e) {
        const [t, l] = Yo(e, this.baseSteps_, this.invertsY_);
        t === 0 && l === 0 || this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    class oc {
      constructor(e, t) {
        var l, v;
        this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this), this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this), this.onPadButtonBlur_ = this.onPadButtonBlur_.bind(this), this.onPadButtonClick_ = this.onPadButtonClick_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.foldable_ = Ne.create(t.expanded), this.popC_ = t.pickerLayout === "popup" ? new ps(e, {
          viewProps: this.viewProps
        }) : null;
        const E = new rc(e, {
          baseSteps: [t.axes[0].baseStep, t.axes[1].baseStep],
          invertsY: t.invertsY,
          layout: t.pickerLayout,
          maxValue: t.maxValue,
          value: this.value,
          viewProps: this.viewProps
        });
        E.view.allFocusableElements.forEach((k) => {
          k.addEventListener("blur", this.onPopupChildBlur_), k.addEventListener("keydown", this.onPopupChildKeydown_);
        }), this.pickerC_ = E, this.textC_ = new Ur(e, {
          assembly: Xo,
          axes: t.axes,
          parser: t.parser,
          value: this.value,
          viewProps: this.viewProps
        }), this.view = new ic(e, {
          expanded: this.foldable_.value("expanded"),
          pickerLayout: t.pickerLayout,
          viewProps: this.viewProps
        }), this.view.textElement.appendChild(this.textC_.view.element), (l = this.view.buttonElement) === null || l === void 0 || l.addEventListener("blur", this.onPadButtonBlur_), (v = this.view.buttonElement) === null || v === void 0 || v.addEventListener("click", this.onPadButtonClick_), this.popC_ ? (this.view.element.appendChild(this.popC_.view.element), this.popC_.view.element.appendChild(this.pickerC_.view.element), $t({
          primary: this.foldable_.value("expanded"),
          secondary: this.popC_.shows,
          forward: (k) => k.rawValue,
          backward: (k, B) => B.rawValue
        })) : this.view.pickerElement && (this.view.pickerElement.appendChild(this.pickerC_.view.element), Ke(this.foldable_, this.view.pickerElement));
      }
      onPadButtonBlur_(e) {
        if (!this.popC_)
          return;
        const t = this.view.element, l = e.relatedTarget;
        (!l || !t.contains(l)) && (this.popC_.shows.rawValue = false);
      }
      onPadButtonClick_() {
        this.foldable_.set("expanded", !this.foldable_.get("expanded")), this.foldable_.get("expanded") && this.pickerC_.view.allFocusableElements[0].focus();
      }
      onPopupChildBlur_(e) {
        if (!this.popC_)
          return;
        const t = this.popC_.view.element, l = Et(e);
        l && t.contains(l) || l && l === this.view.buttonElement && !ft(t.ownerDocument) || (this.popC_.shows.rawValue = false);
      }
      onPopupChildKeydown_(e) {
        this.popC_ ? e.key === "Escape" && (this.popC_.shows.rawValue = false) : this.view.pickerElement && e.key === "Escape" && this.view.buttonElement.focus();
      }
    }
    class ii {
      constructor(e = 0, t = 0, l = 0) {
        this.x = e, this.y = t, this.z = l;
      }
      getComponents() {
        return [this.x, this.y, this.z];
      }
      static isObject(e) {
        if (_(e))
          return false;
        const t = e.x, l = e.y, v = e.z;
        return !(typeof t != "number" || typeof l != "number" || typeof v != "number");
      }
      static equals(e, t) {
        return e.x === t.x && e.y === t.y && e.z === t.z;
      }
      toObject() {
        return {
          x: this.x,
          y: this.y,
          z: this.z
        };
      }
    }
    const qo = {
      toComponents: (n) => n.getComponents(),
      fromComponents: (n) => new ii(...n)
    };
    function ac(n) {
      return ii.isObject(n) ? new ii(n.x, n.y, n.z) : new ii();
    }
    function lc(n, e) {
      n.writeProperty("x", e.x), n.writeProperty("y", e.y), n.writeProperty("z", e.z);
    }
    function cc(n, e) {
      return new Zt({
        assembly: qo,
        components: [
          Nt("x" in n ? n.x : void 0, e.x),
          Nt("y" in n ? n.y : void 0, e.y),
          Nt("z" in n ? n.z : void 0, e.z)
        ]
      });
    }
    function Gr(n, e) {
      return {
        baseStep: qt(e),
        constraint: e,
        textProps: X.fromObject({
          draggingScale: Qt(e, n),
          formatter: Ve(Jn(e, n))
        })
      };
    }
    const pc = {
      id: "input-point3d",
      type: "input",
      accept: (n, e) => {
        if (!ii.isObject(n))
          return null;
        const t = M, l = ce(e, {
          x: t.optional.custom(gt),
          y: t.optional.custom(gt),
          z: t.optional.custom(gt)
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => ac,
        constraint: (n) => cc(n.params, n.initialValue),
        equals: ii.equals,
        writer: (n) => lc
      },
      controller: (n) => {
        const e = n.value, t = n.constraint;
        if (!(t instanceof Zt))
          throw S.shouldNeverHappen();
        return new Ur(n.document, {
          assembly: qo,
          axes: [
            Gr(e.rawValue.x, t.components[0]),
            Gr(e.rawValue.y, t.components[1]),
            Gr(e.rawValue.z, t.components[2])
          ],
          parser: lt,
          value: e,
          viewProps: n.viewProps
        });
      }
    };
    class si {
      constructor(e = 0, t = 0, l = 0, v = 0) {
        this.x = e, this.y = t, this.z = l, this.w = v;
      }
      getComponents() {
        return [this.x, this.y, this.z, this.w];
      }
      static isObject(e) {
        if (_(e))
          return false;
        const t = e.x, l = e.y, v = e.z, E = e.w;
        return !(typeof t != "number" || typeof l != "number" || typeof v != "number" || typeof E != "number");
      }
      static equals(e, t) {
        return e.x === t.x && e.y === t.y && e.z === t.z && e.w === t.w;
      }
      toObject() {
        return {
          x: this.x,
          y: this.y,
          z: this.z,
          w: this.w
        };
      }
    }
    const Qo = {
      toComponents: (n) => n.getComponents(),
      fromComponents: (n) => new si(...n)
    };
    function uc(n) {
      return si.isObject(n) ? new si(n.x, n.y, n.z, n.w) : new si();
    }
    function hc(n, e) {
      n.writeProperty("x", e.x), n.writeProperty("y", e.y), n.writeProperty("z", e.z), n.writeProperty("w", e.w);
    }
    function dc(n, e) {
      return new Zt({
        assembly: Qo,
        components: [
          Nt("x" in n ? n.x : void 0, e.x),
          Nt("y" in n ? n.y : void 0, e.y),
          Nt("z" in n ? n.z : void 0, e.z),
          Nt("w" in n ? n.w : void 0, e.w)
        ]
      });
    }
    function mc(n, e) {
      return {
        baseStep: qt(e),
        constraint: e,
        textProps: X.fromObject({
          draggingScale: Qt(e, n),
          formatter: Ve(Jn(e, n))
        })
      };
    }
    const fc = {
      id: "input-point4d",
      type: "input",
      accept: (n, e) => {
        if (!si.isObject(n))
          return null;
        const t = M, l = ce(e, {
          x: t.optional.custom(gt),
          y: t.optional.custom(gt),
          z: t.optional.custom(gt),
          w: t.optional.custom(gt)
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => uc,
        constraint: (n) => dc(n.params, n.initialValue),
        equals: si.equals,
        writer: (n) => hc
      },
      controller: (n) => {
        const e = n.value, t = n.constraint;
        if (!(t instanceof Zt))
          throw S.shouldNeverHappen();
        return new Ur(n.document, {
          assembly: Qo,
          axes: e.rawValue.getComponents().map((l, v) => mc(l, t.components[v])),
          parser: lt,
          value: e,
          viewProps: n.viewProps
        });
      }
    };
    function vc(n) {
      const e = [], t = Wn(n.options);
      return t && e.push(t), new Ct2(e);
    }
    const bc = {
      id: "input-string",
      type: "input",
      accept: (n, e) => {
        if (typeof n != "string")
          return null;
        const l = ce(e, {
          options: M.optional.custom(xn)
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => Ai,
        constraint: (n) => vc(n.params),
        writer: (n) => Ot
      },
      controller: (n) => {
        const e = n.document, t = n.value, l = n.constraint, v = l && we(l, at);
        return v ? new mn(e, {
          props: new X({
            options: v.values.value("options")
          }),
          value: t,
          viewProps: n.viewProps
        }) : new qn(e, {
          parser: (E) => E,
          props: X.fromObject({
            formatter: ct
          }),
          value: t,
          viewProps: n.viewProps
        });
      }
    }, Bi = {
      monitor: {
        defaultInterval: 200,
        defaultLineCount: 3
      }
    }, Zo = D("mll");
    class gc {
      constructor(e, t) {
        this.onValueUpdate_ = this.onValueUpdate_.bind(this), this.formatter_ = t.formatter, this.element = e.createElement("div"), this.element.classList.add(Zo()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("textarea");
        l.classList.add(Zo("i")), l.style.height = `calc(var(--bld-us) * ${t.lineCount})`, l.readOnly = true, t.viewProps.bindDisabled(l), this.element.appendChild(l), this.textareaElem_ = l, t.value.emitter.on("change", this.onValueUpdate_), this.value = t.value, this.update_();
      }
      update_() {
        const e = this.textareaElem_, t = e.scrollTop === e.scrollHeight - e.clientHeight, l = [];
        this.value.rawValue.forEach((v) => {
          v !== void 0 && l.push(this.formatter_(v));
        }), e.textContent = l.join(`
`), t && (e.scrollTop = e.scrollHeight);
      }
      onValueUpdate_() {
        this.update_();
      }
    }
    class Hr {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.view = new gc(e, {
          formatter: t.formatter,
          lineCount: t.lineCount,
          value: this.value,
          viewProps: this.viewProps
        });
      }
    }
    const Wo = D("sgl");
    class _c {
      constructor(e, t) {
        this.onValueUpdate_ = this.onValueUpdate_.bind(this), this.formatter_ = t.formatter, this.element = e.createElement("div"), this.element.classList.add(Wo()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("input");
        l.classList.add(Wo("i")), l.readOnly = true, l.type = "text", t.viewProps.bindDisabled(l), this.element.appendChild(l), this.inputElement = l, t.value.emitter.on("change", this.onValueUpdate_), this.value = t.value, this.update_();
      }
      update_() {
        const e = this.value.rawValue, t = e[e.length - 1];
        this.inputElement.value = t !== void 0 ? this.formatter_(t) : "";
      }
      onValueUpdate_() {
        this.update_();
      }
    }
    class Kr {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.view = new _c(e, {
          formatter: t.formatter,
          value: this.value,
          viewProps: this.viewProps
        });
      }
    }
    const wc = {
      id: "monitor-bool",
      type: "monitor",
      accept: (n, e) => {
        if (typeof n != "boolean")
          return null;
        const l = ce(e, {
          lineCount: M.optional.number
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => hs
      },
      controller: (n) => {
        var e;
        return n.value.rawValue.length === 1 ? new Kr(n.document, {
          formatter: ds,
          value: n.value,
          viewProps: n.viewProps
        }) : new Hr(n.document, {
          formatter: ds,
          lineCount: (e = n.params.lineCount) !== null && e !== void 0 ? e : Bi.monitor.defaultLineCount,
          value: n.value,
          viewProps: n.viewProps
        });
      }
    }, en = D("grl");
    class yc {
      constructor(e, t) {
        this.onCursorChange_ = this.onCursorChange_.bind(this), this.onValueUpdate_ = this.onValueUpdate_.bind(this), this.element = e.createElement("div"), this.element.classList.add(en()), t.viewProps.bindClassModifiers(this.element), this.formatter_ = t.formatter, this.props_ = t.props, this.cursor_ = t.cursor, this.cursor_.emitter.on("change", this.onCursorChange_);
        const l = e.createElementNS(He, "svg");
        l.classList.add(en("g")), l.style.height = `calc(var(--bld-us) * ${t.lineCount})`, this.element.appendChild(l), this.svgElem_ = l;
        const v = e.createElementNS(He, "polyline");
        this.svgElem_.appendChild(v), this.lineElem_ = v;
        const E = e.createElement("div");
        E.classList.add(en("t"), D("tt")()), this.element.appendChild(E), this.tooltipElem_ = E, t.value.emitter.on("change", this.onValueUpdate_), this.value = t.value, this.update_();
      }
      get graphElement() {
        return this.svgElem_;
      }
      update_() {
        const e = this.svgElem_.getBoundingClientRect(), t = this.value.rawValue.length - 1, l = this.props_.get("minValue"), v = this.props_.get("maxValue"), E = [];
        this.value.rawValue.forEach((me, be) => {
          if (me === void 0)
            return;
          const Ft = Ee(be, 0, t, 0, e.width), ji = Ee(me, l, v, e.height, 0);
          E.push([Ft, ji].join(","));
        }), this.lineElem_.setAttributeNS(null, "points", E.join(" "));
        const k = this.tooltipElem_, B = this.value.rawValue[this.cursor_.rawValue];
        if (B === void 0) {
          k.classList.remove(en("t", "a"));
          return;
        }
        const Q = Ee(this.cursor_.rawValue, 0, t, 0, e.width), ee = Ee(B, l, v, e.height, 0);
        k.style.left = `${Q}px`, k.style.top = `${ee}px`, k.textContent = `${this.formatter_(B)}`, k.classList.contains(en("t", "a")) || (k.classList.add(en("t", "a"), en("t", "in")), rt(k), k.classList.remove(en("t", "in")));
      }
      onValueUpdate_() {
        this.update_();
      }
      onCursorChange_() {
        this.update_();
      }
    }
    class xc {
      constructor(e, t) {
        if (this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this), this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this), this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this), this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this), this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this), this.props_ = t.props, this.value = t.value, this.viewProps = t.viewProps, this.cursor_ = te(-1), this.view = new yc(e, {
          cursor: this.cursor_,
          formatter: t.formatter,
          lineCount: t.lineCount,
          props: this.props_,
          value: this.value,
          viewProps: this.viewProps
        }), !ft(e))
          this.view.element.addEventListener("mousemove", this.onGraphMouseMove_), this.view.element.addEventListener("mouseleave", this.onGraphMouseLeave_);
        else {
          const l = new bt(this.view.element);
          l.emitter.on("down", this.onGraphPointerDown_), l.emitter.on("move", this.onGraphPointerMove_), l.emitter.on("up", this.onGraphPointerUp_);
        }
      }
      onGraphMouseLeave_() {
        this.cursor_.rawValue = -1;
      }
      onGraphMouseMove_(e) {
        const t = this.view.element.getBoundingClientRect();
        this.cursor_.rawValue = Math.floor(Ee(e.offsetX, 0, t.width, 0, this.value.rawValue.length));
      }
      onGraphPointerDown_(e) {
        this.onGraphPointerMove_(e);
      }
      onGraphPointerMove_(e) {
        if (!e.data.point) {
          this.cursor_.rawValue = -1;
          return;
        }
        this.cursor_.rawValue = Math.floor(Ee(e.data.point.x, 0, e.data.bounds.width, 0, this.value.rawValue.length));
      }
      onGraphPointerUp_() {
        this.cursor_.rawValue = -1;
      }
    }
    function $r(n) {
      return "format" in n && !_(n.format) ? n.format : Ve(2);
    }
    function Ec(n) {
      var e;
      return n.value.rawValue.length === 1 ? new Kr(n.document, {
        formatter: $r(n.params),
        value: n.value,
        viewProps: n.viewProps
      }) : new Hr(n.document, {
        formatter: $r(n.params),
        lineCount: (e = n.params.lineCount) !== null && e !== void 0 ? e : Bi.monitor.defaultLineCount,
        value: n.value,
        viewProps: n.viewProps
      });
    }
    function Cc(n) {
      var e, t, l;
      return new xc(n.document, {
        formatter: $r(n.params),
        lineCount: (e = n.params.lineCount) !== null && e !== void 0 ? e : Bi.monitor.defaultLineCount,
        props: X.fromObject({
          maxValue: (t = "max" in n.params ? n.params.max : null) !== null && t !== void 0 ? t : 100,
          minValue: (l = "min" in n.params ? n.params.min : null) !== null && l !== void 0 ? l : 0
        }),
        value: n.value,
        viewProps: n.viewProps
      });
    }
    function Jo(n) {
      return "view" in n && n.view === "graph";
    }
    const Pc = {
      id: "monitor-number",
      type: "monitor",
      accept: (n, e) => {
        if (typeof n != "number")
          return null;
        const t = M, l = ce(e, {
          format: t.optional.function,
          lineCount: t.optional.number,
          max: t.optional.number,
          min: t.optional.number,
          view: t.optional.string
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        defaultBufferSize: (n) => Jo(n) ? 64 : 1,
        reader: (n) => ws
      },
      controller: (n) => Jo(n.params) ? Cc(n) : Ec(n)
    }, Tc = {
      id: "monitor-string",
      type: "monitor",
      accept: (n, e) => {
        if (typeof n != "string")
          return null;
        const t = M, l = ce(e, {
          lineCount: t.optional.number,
          multiline: t.optional.boolean
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => Ai
      },
      controller: (n) => {
        var e;
        const t = n.value;
        return t.rawValue.length > 1 || "multiline" in n.params && n.params.multiline ? new Hr(n.document, {
          formatter: ct,
          lineCount: (e = n.params.lineCount) !== null && e !== void 0 ? e : Bi.monitor.defaultLineCount,
          value: t,
          viewProps: n.viewProps
        }) : new Kr(n.document, {
          formatter: ct,
          value: t,
          viewProps: n.viewProps
        });
      }
    };
    class kc {
      constructor(e) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.reader = e.reader, this.writer = e.writer, this.emitter = new F(), this.value = e.value, this.value.emitter.on("change", this.onValueChange_), this.target = e.target, this.read();
      }
      read() {
        const e = this.target.read();
        e !== void 0 && (this.value.rawValue = this.reader(e));
      }
      write_(e) {
        this.writer(this.target, e);
      }
      onValueChange_(e) {
        this.write_(e.rawValue), this.emitter.emit("change", {
          options: e.options,
          rawValue: e.rawValue,
          sender: this
        });
      }
    }
    function Mc(n, e) {
      const t = n.accept(e.target.read(), e.params);
      if (_(t))
        return null;
      const l = M, v = {
        target: e.target,
        initialValue: t.initialValue,
        params: t.params
      }, E = n.binding.reader(v), k = n.binding.constraint ? n.binding.constraint(v) : void 0, B = te(E(t.initialValue), {
        constraint: k,
        equals: n.binding.equals
      }), Q = new kc({
        reader: E,
        target: e.target,
        value: B,
        writer: n.binding.writer(v)
      }), ee = l.optional.boolean(e.params.disabled).value, me = l.optional.boolean(e.params.hidden).value, be = n.controller({
        constraint: k,
        document: e.document,
        initialValue: t.initialValue,
        params: t.params,
        value: Q.value,
        viewProps: Qe.create({
          disabled: ee,
          hidden: me
        })
      }), Ft = l.optional.string(e.params.label).value;
      return new ze(e.document, {
        binding: Q,
        blade: xe(),
        props: X.fromObject({
          label: Ft ?? e.target.key
        }),
        valueController: be
      });
    }
    class Sc {
      constructor(e) {
        this.onTick_ = this.onTick_.bind(this), this.reader_ = e.reader, this.target = e.target, this.emitter = new F(), this.value = e.value, this.ticker = e.ticker, this.ticker.emitter.on("tick", this.onTick_), this.read();
      }
      dispose() {
        this.ticker.dispose();
      }
      read() {
        const e = this.target.read();
        if (e === void 0)
          return;
        const t = this.value.rawValue, l = this.reader_(e);
        this.value.rawValue = Cs(t, l), this.emitter.emit("update", {
          rawValue: l,
          sender: this
        });
      }
      onTick_(e) {
        this.read();
      }
    }
    function Ac(n, e) {
      return e === 0 ? new as() : new yi(n, e ?? Bi.monitor.defaultInterval);
    }
    function Lc(n, e) {
      var t, l, v;
      const E = M, k = n.accept(e.target.read(), e.params);
      if (_(k))
        return null;
      const B = {
        target: e.target,
        initialValue: k.initialValue,
        params: k.params
      }, Q = n.binding.reader(B), ee = (l = (t = E.optional.number(e.params.bufferSize).value) !== null && t !== void 0 ? t : n.binding.defaultBufferSize && n.binding.defaultBufferSize(k.params)) !== null && l !== void 0 ? l : 1, me = E.optional.number(e.params.interval).value, be = new Sc({
        reader: Q,
        target: e.target,
        ticker: Ac(e.document, me),
        value: xs(ee)
      }), Ft = E.optional.boolean(e.params.disabled).value, ji = E.optional.boolean(e.params.hidden).value, zi = n.controller({
        document: e.document,
        params: k.params,
        value: be.value,
        viewProps: Qe.create({
          disabled: Ft,
          hidden: ji
        })
      }), ri = (v = E.optional.string(e.params.label).value) !== null && v !== void 0 ? v : e.target.key;
      return new ot(e.document, {
        binding: be,
        blade: xe(),
        props: X.fromObject({
          label: ri
        }),
        valueController: zi
      });
    }
    class Rc {
      constructor() {
        this.pluginsMap_ = {
          blades: [],
          inputs: [],
          monitors: []
        };
      }
      getAll() {
        return [
          ...this.pluginsMap_.blades,
          ...this.pluginsMap_.inputs,
          ...this.pluginsMap_.monitors
        ];
      }
      register(e) {
        e.type === "blade" ? this.pluginsMap_.blades.unshift(e) : e.type === "input" ? this.pluginsMap_.inputs.unshift(e) : e.type === "monitor" && this.pluginsMap_.monitors.unshift(e);
      }
      createInput(e, t, l) {
        const v = t.read();
        if (_(v))
          throw new S({
            context: {
              key: t.key
            },
            type: "nomatchingcontroller"
          });
        const E = this.pluginsMap_.inputs.reduce((k, B) => k ?? Mc(B, {
          document: e,
          target: t,
          params: l
        }), null);
        if (E)
          return E;
        throw new S({
          context: {
            key: t.key
          },
          type: "nomatchingcontroller"
        });
      }
      createMonitor(e, t, l) {
        const v = this.pluginsMap_.monitors.reduce((E, k) => E ?? Lc(k, {
          document: e,
          params: l,
          target: t
        }), null);
        if (v)
          return v;
        throw new S({
          context: {
            key: t.key
          },
          type: "nomatchingcontroller"
        });
      }
      createBlade(e, t) {
        const l = this.pluginsMap_.blades.reduce((v, E) => v ?? rr(E, {
          document: e,
          params: t
        }), null);
        if (!l)
          throw new S({
            type: "nomatchingview",
            context: {
              params: t
            }
          });
        return l;
      }
      createBladeApi(e) {
        if (e instanceof ze)
          return new di(e);
        if (e instanceof ot)
          return new mi(e);
        if (e instanceof un)
          return new Kn(e, this);
        const t = this.pluginsMap_.blades.reduce((l, v) => l ?? v.api({
          controller: e,
          pool: this
        }), null);
        if (!t)
          throw S.shouldNeverHappen();
        return t;
      }
    }
    function Ic() {
      const n = new Rc();
      return [
        Bc,
        pc,
        fc,
        bc,
        nc,
        Zl,
        Ql,
        $l,
        Ms,
        wc,
        Tc,
        Pc,
        J,
        er,
        nr,
        wi
      ].forEach((e) => {
        n.register(e);
      }), n;
    }
    function Vc(n) {
      return Wt.isObject(n) ? new Wt(n.x, n.y) : new Wt();
    }
    function Dc(n, e) {
      n.writeProperty("x", e.x), n.writeProperty("y", e.y);
    }
    function Nt(n, e) {
      if (!n)
        return;
      const t = [], l = Ko(n, e);
      l && t.push(l);
      const v = $o(n);
      return v && t.push(v), new Ct2(t);
    }
    function Oc(n, e) {
      return new Zt({
        assembly: Xo,
        components: [
          Nt("x" in n ? n.x : void 0, e.x),
          Nt("y" in n ? n.y : void 0, e.y)
        ]
      });
    }
    function ea(n, e) {
      const [t, l] = n ? ec(n) : [];
      if (!_(t) || !_(l))
        return Math.max(Math.abs(t ?? 0), Math.abs(l ?? 0));
      const v = qt(n);
      return Math.max(Math.abs(v) * 10, Math.abs(e) * 10);
    }
    function Nc(n, e) {
      const t = e instanceof Zt ? e.components[0] : void 0, l = e instanceof Zt ? e.components[1] : void 0, v = ea(t, n.x), E = ea(l, n.y);
      return Math.max(v, E);
    }
    function ta(n, e) {
      return {
        baseStep: qt(e),
        constraint: e,
        textProps: X.fromObject({
          draggingScale: Qt(e, n),
          formatter: Ve(Jn(e, n))
        })
      };
    }
    function Fc(n) {
      if (!("y" in n))
        return false;
      const e = n.y;
      return e && "inverted" in e ? !!e.inverted : false;
    }
    const Bc = {
      id: "input-point2d",
      type: "input",
      accept: (n, e) => {
        if (!Wt.isObject(n))
          return null;
        const t = M, l = ce(e, {
          expanded: t.optional.boolean,
          picker: t.optional.custom(kt),
          x: t.optional.custom(gt),
          y: t.optional.object({
            inverted: t.optional.boolean,
            max: t.optional.number,
            min: t.optional.number,
            step: t.optional.number
          })
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => Vc,
        constraint: (n) => Oc(n.params, n.initialValue),
        equals: Wt.equals,
        writer: (n) => Dc
      },
      controller: (n) => {
        const e = n.document, t = n.value, l = n.constraint;
        if (!(l instanceof Zt))
          throw S.shouldNeverHappen();
        const v = "expanded" in n.params ? n.params.expanded : void 0, E = "picker" in n.params ? n.params.picker : void 0;
        return new oc(e, {
          axes: [
            ta(t.rawValue.x, l.components[0]),
            ta(t.rawValue.y, l.components[1])
          ],
          expanded: v ?? false,
          invertsY: Fc(n.params),
          maxValue: Nc(t.rawValue, l),
          parser: lt,
          pickerLayout: E ?? "popup",
          value: t,
          viewProps: n.viewProps
        });
      }
    };
    class na extends a {
      constructor(e) {
        super(e), this.emitter_ = new F(), this.controller_.valueController.value.emitter.on("change", (t) => {
          this.emitter_.emit("change", {
            event: new u(this, t.rawValue)
          });
        });
      }
      get label() {
        return this.controller_.props.get("label");
      }
      set label(e) {
        this.controller_.props.set("label", e);
      }
      get options() {
        return this.controller_.valueController.props.get("options");
      }
      set options(e) {
        this.controller_.valueController.props.set("options", e);
      }
      get value() {
        return this.controller_.valueController.value.rawValue;
      }
      set value(e) {
        this.controller_.valueController.value.rawValue = e;
      }
      on(e, t) {
        const l = t.bind(this);
        return this.emitter_.on(e, (v) => {
          l(v.event);
        }), this;
      }
    }
    class ia extends a {
      constructor(e) {
        super(e), this.emitter_ = new F(), this.controller_.valueController.value.emitter.on("change", (t) => {
          this.emitter_.emit("change", {
            event: new u(this, t.rawValue)
          });
        });
      }
      get label() {
        return this.controller_.props.get("label");
      }
      set label(e) {
        this.controller_.props.set("label", e);
      }
      get maxValue() {
        return this.controller_.valueController.sliderController.props.get("maxValue");
      }
      set maxValue(e) {
        this.controller_.valueController.sliderController.props.set("maxValue", e);
      }
      get minValue() {
        return this.controller_.valueController.sliderController.props.get("minValue");
      }
      set minValue(e) {
        this.controller_.valueController.sliderController.props.set("minValue", e);
      }
      get value() {
        return this.controller_.valueController.value.rawValue;
      }
      set value(e) {
        this.controller_.valueController.value.rawValue = e;
      }
      on(e, t) {
        const l = t.bind(this);
        return this.emitter_.on(e, (v) => {
          l(v.event);
        }), this;
      }
    }
    class sa extends a {
      constructor(e) {
        super(e), this.emitter_ = new F(), this.controller_.valueController.value.emitter.on("change", (t) => {
          this.emitter_.emit("change", {
            event: new u(this, t.rawValue)
          });
        });
      }
      get label() {
        return this.controller_.props.get("label");
      }
      set label(e) {
        this.controller_.props.set("label", e);
      }
      get formatter() {
        return this.controller_.valueController.props.get("formatter");
      }
      set formatter(e) {
        this.controller_.valueController.props.set("formatter", e);
      }
      get value() {
        return this.controller_.valueController.value.rawValue;
      }
      set value(e) {
        this.controller_.valueController.value.rawValue = e;
      }
      on(e, t) {
        const l = t.bind(this);
        return this.emitter_.on(e, (v) => {
          l(v.event);
        }), this;
      }
    }
    const jc = function() {
      return {
        id: "list",
        type: "blade",
        accept(n) {
          const e = M, t = ce(n, {
            options: e.required.custom(xn),
            value: e.required.raw,
            view: e.required.constant("list"),
            label: e.optional.string
          });
          return t ? { params: t } : null;
        },
        controller(n) {
          const e = new at(Vi(n.params.options)), t = te(n.params.value, {
            constraint: e
          }), l = new mn(n.document, {
            props: new X({
              options: e.values.value("options")
            }),
            value: t,
            viewProps: n.viewProps
          });
          return new Gt(n.document, {
            blade: n.blade,
            props: X.fromObject({
              label: n.params.label
            }),
            valueController: l
          });
        },
        api(n) {
          return !(n.controller instanceof Gt) || !(n.controller.valueController instanceof mn) ? null : new na(n.controller);
        }
      };
    }();
    function zc(n) {
      return n.reduce((e, t) => Object.assign(e, {
        [t.presetKey]: t.read()
      }), {});
    }
    function Uc(n, e) {
      n.forEach((t) => {
        const l = e[t.presetKey];
        l !== void 0 && t.write(l);
      });
    }
    class Gc extends fi {
      /**
       * @hidden
       */
      constructor(e, t) {
        super(e, t);
      }
      get element() {
        return this.controller_.view.element;
      }
      /**
       * Imports a preset of all inputs.
       * @param preset The preset object to import.
       */
      importPreset(e) {
        const t = this.controller_.rackController.rack.find(ze).map((l) => l.binding.target);
        Uc(t, e), this.refresh();
      }
      /**
       * Exports a preset of all inputs.
       * @return An exported preset object.
       */
      exportPreset() {
        const e = this.controller_.rackController.rack.find(ze).map((t) => t.binding.target);
        return zc(e);
      }
      /**
       * Refreshes all bindings of the pane.
       */
      refresh() {
        this.controller_.rackController.rack.find(ze).forEach((e) => {
          e.binding.read();
        }), this.controller_.rackController.rack.find(ot).forEach((e) => {
          e.binding.read();
        });
      }
    }
    class Hc extends $n {
      constructor(e, t) {
        super(e, {
          expanded: t.expanded,
          blade: t.blade,
          props: t.props,
          root: true,
          viewProps: t.viewProps
        });
      }
    }
    const Kc = {
      id: "slider",
      type: "blade",
      accept(n) {
        const e = M, t = ce(n, {
          max: e.required.number,
          min: e.required.number,
          view: e.required.constant("slider"),
          format: e.optional.function,
          label: e.optional.string,
          value: e.optional.number
        });
        return t ? { params: t } : null;
      },
      controller(n) {
        var e, t;
        const l = (e = n.params.value) !== null && e !== void 0 ? e : 0, v = new Vt({
          max: n.params.max,
          min: n.params.min
        }), E = new yn(n.document, {
          baseStep: 1,
          parser: lt,
          sliderProps: new X({
            maxValue: v.values.value("max"),
            minValue: v.values.value("min")
          }),
          textProps: X.fromObject({
            draggingScale: Qt(void 0, l),
            formatter: (t = n.params.format) !== null && t !== void 0 ? t : Dt
          }),
          value: te(l, {
            constraint: v
          }),
          viewProps: n.viewProps
        });
        return new Gt(n.document, {
          blade: n.blade,
          props: X.fromObject({
            label: n.params.label
          }),
          valueController: E
        });
      },
      api(n) {
        return !(n.controller instanceof Gt) || !(n.controller.valueController instanceof yn) ? null : new ia(n.controller);
      }
    }, $c = function() {
      return {
        id: "text",
        type: "blade",
        accept(n) {
          const e = M, t = ce(n, {
            parse: e.required.function,
            value: e.required.raw,
            view: e.required.constant("text"),
            format: e.optional.function,
            label: e.optional.string
          });
          return t ? { params: t } : null;
        },
        controller(n) {
          var e;
          const t = new qn(n.document, {
            parser: n.params.parse,
            props: X.fromObject({
              formatter: (e = n.params.format) !== null && e !== void 0 ? e : (l) => String(l)
            }),
            value: te(n.params.value),
            viewProps: n.viewProps
          });
          return new Gt(n.document, {
            blade: n.blade,
            props: X.fromObject({
              label: n.params.label
            }),
            valueController: t
          });
        },
        api(n) {
          return !(n.controller instanceof Gt) || !(n.controller.valueController instanceof qn) ? null : new sa(n.controller);
        }
      };
    }();
    function Xc(n) {
      const e = n.createElement("div");
      return e.classList.add(D("dfw")()), n.body && n.body.appendChild(e), e;
    }
    function ra(n, e, t) {
      if (n.querySelector(`style[data-tp-style=${e}]`))
        return;
      const l = n.createElement("style");
      l.dataset.tpStyle = e, l.textContent = t, n.head.appendChild(l);
    }
    class Yc extends Gc {
      constructor(e) {
        var t, l;
        const v = e ?? {}, E = (t = v.document) !== null && t !== void 0 ? t : ui(), k = Ic(), B = new Hc(E, {
          expanded: v.expanded,
          blade: xe(),
          props: X.fromObject({
            title: v.title
          }),
          viewProps: Qe.create()
        });
        super(B, k), this.pool_ = k, this.containerElem_ = (l = v.container) !== null && l !== void 0 ? l : Xc(E), this.containerElem_.appendChild(this.element), this.doc_ = E, this.usesDefaultWrapper_ = !v.container, this.setUpDefaultPlugins_();
      }
      get document() {
        if (!this.doc_)
          throw S.alreadyDisposed();
        return this.doc_;
      }
      dispose() {
        const e = this.containerElem_;
        if (!e)
          throw S.alreadyDisposed();
        if (this.usesDefaultWrapper_) {
          const t = e.parentElement;
          t && t.removeChild(e);
        }
        this.containerElem_ = null, this.doc_ = null, super.dispose();
      }
      registerPlugin(e) {
        ("plugin" in e ? [e.plugin] : "plugins" in e ? e.plugins : []).forEach((l) => {
          this.pool_.register(l), this.embedPluginStyle_(l);
        });
      }
      embedPluginStyle_(e) {
        e.css && ra(this.document, `plugin-${e.id}`, e.css);
      }
      setUpDefaultPlugins_() {
        ra(this.document, "default", '.tp-tbiv_b,.tp-coltxtv_ms,.tp-ckbv_i,.tp-rotv_b,.tp-fldv_b,.tp-mllv_i,.tp-sglv_i,.tp-grlv_g,.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw,.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-p2dv_b:hover,.tp-btnv_b:hover,.tp-lstv_s:hover{background-color:var(--btn-bg-h)}.tp-p2dv_b:focus,.tp-btnv_b:focus,.tp-lstv_s:focus{background-color:var(--btn-bg-f)}.tp-p2dv_b:active,.tp-btnv_b:active,.tp-lstv_s:active{background-color:var(--btn-bg-a)}.tp-p2dv_b:disabled,.tp-btnv_b:disabled,.tp-lstv_s:disabled{opacity:.5}.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-txtv_i:hover,.tp-p2dpv_p:hover,.tp-colswv_sw:hover{background-color:var(--in-bg-h)}.tp-txtv_i:focus,.tp-p2dpv_p:focus,.tp-colswv_sw:focus{background-color:var(--in-bg-f)}.tp-txtv_i:active,.tp-p2dpv_p:active,.tp-colswv_sw:active{background-color:var(--in-bg-a)}.tp-txtv_i:disabled,.tp-p2dpv_p:disabled,.tp-colswv_sw:disabled{opacity:.5}.tp-mllv_i,.tp-sglv_i,.tp-grlv_g{background-color:var(--mo-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--mo-fg);height:var(--bld-us);scrollbar-color:currentColor rgba(0,0,0,0);scrollbar-width:thin;width:100%}.tp-mllv_i::-webkit-scrollbar,.tp-sglv_i::-webkit-scrollbar,.tp-grlv_g::-webkit-scrollbar{height:8px;width:8px}.tp-mllv_i::-webkit-scrollbar-corner,.tp-sglv_i::-webkit-scrollbar-corner,.tp-grlv_g::-webkit-scrollbar-corner{background-color:rgba(0,0,0,0)}.tp-mllv_i::-webkit-scrollbar-thumb,.tp-sglv_i::-webkit-scrollbar-thumb,.tp-grlv_g::-webkit-scrollbar-thumb{background-clip:padding-box;background-color:currentColor;border:rgba(0,0,0,0) solid 2px;border-radius:4px}.tp-rotv{--font-family: var(--tp-font-family, Roboto Mono, Source Code Pro, Menlo, Courier, monospace);--bs-br: var(--tp-base-border-radius, 6px);--cnt-h-p: var(--tp-container-horizontal-padding, 4px);--cnt-v-p: var(--tp-container-vertical-padding, 4px);--elm-br: var(--tp-element-border-radius, 2px);--bld-s: var(--tp-blade-spacing, 4px);--bld-us: var(--tp-blade-unit-size, 20px);--bs-bg: var(--tp-base-background-color, hsl(230deg, 7%, 17%));--bs-sh: var(--tp-base-shadow-color, rgba(0, 0, 0, 0.2));--btn-bg: var(--tp-button-background-color, hsl(230deg, 7%, 70%));--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, hsl(230deg, 7%, 17%));--cnt-bg: var(--tp-container-background-color, rgba(187, 188, 196, 0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187, 188, 196, 0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187, 188, 196, 0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187, 188, 196, 0.15));--cnt-fg: var(--tp-container-foreground-color, hsl(230deg, 7%, 75%));--in-bg: var(--tp-input-background-color, rgba(187, 188, 196, 0.1));--in-bg-a: var(--tp-input-background-color-active, rgba(187, 188, 196, 0.25));--in-bg-f: var(--tp-input-background-color-focus, rgba(187, 188, 196, 0.2));--in-bg-h: var(--tp-input-background-color-hover, rgba(187, 188, 196, 0.15));--in-fg: var(--tp-input-foreground-color, hsl(230deg, 7%, 75%));--lbl-fg: var(--tp-label-foreground-color, rgba(187, 188, 196, 0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0, 0, 0, 0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187, 188, 196, 0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(187, 188, 196, 0.1))}.tp-rotv_c>.tp-cntv.tp-v-lst,.tp-tabv_c .tp-brkv>.tp-cntv.tp-v-lst,.tp-fldv_c>.tp-cntv.tp-v-lst{margin-bottom:calc(-1*var(--cnt-v-p))}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-rotv_c>*:not(.tp-v-fst),.tp-tabv_c .tp-brkv>*:not(.tp-v-fst),.tp-fldv_c>*:not(.tp-v-fst){margin-top:var(--bld-s)}.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-v-p)}.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-cntv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-v-p)}.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-tabv_c .tp-brkv>.tp-cntv,.tp-fldv_c>.tp-cntv{margin-left:4px}.tp-tabv_c .tp-brkv>.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--elm-br);border-bottom-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-tabv_c .tp-brkv .tp-fldv>.tp-fldv_c,.tp-fldv_c .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv>.tp-cntv+.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-cntv+.tp-fldv>.tp-fldv_b{border-top-left-radius:0}.tp-tabv_c .tp-brkv>.tp-cntv+.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-cntv+.tp-tabv>.tp-tabv_t{border-top-left-radius:0}.tp-tabv_c .tp-brkv>.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-tabv>.tp-tabv_t{border-top-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv .tp-tabv>.tp-tabv_c,.tp-fldv_c .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--elm-br)}.tp-rotv_b,.tp-fldv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);overflow:hidden;padding-left:var(--cnt-h-p);padding-right:calc(4px + var(--bld-us) + var(--cnt-h-p));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-rotv_b:hover,.tp-fldv_b:hover{background-color:var(--cnt-bg-h)}.tp-rotv_b:focus,.tp-fldv_b:focus{background-color:var(--cnt-bg-f)}.tp-rotv_b:active,.tp-fldv_b:active{background-color:var(--cnt-bg-a)}.tp-rotv_b:disabled,.tp-fldv_b:disabled{opacity:.5}.tp-rotv_m,.tp-fldv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:"";display:block;height:6px;right:calc(var(--cnt-h-p) + (var(--bld-us) + 4px - 6px)/2 - 2px);margin:auto;opacity:.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-rotv.tp-rotv-expanded .tp-rotv_m,.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m{transform:none}.tp-rotv_c,.tp-fldv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c,.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c{display:none}.tp-rotv.tp-rotv-expanded .tp-rotv_c,.tp-fldv.tp-fldv-expanded>.tp-fldv_c{opacity:1;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-lstv,.tp-coltxtv_m{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m,.tp-coltxtv_mm{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-lstv_m svg,.tp-coltxtv_mm svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-lstv_m svg path,.tp-coltxtv_mm svg path{fill:currentColor}.tp-pndtxtv,.tp-coltxtv_w{display:flex}.tp-pndtxtv_a,.tp-coltxtv_c{width:100%}.tp-pndtxtv_a+.tp-pndtxtv_a,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-coltxtv_c{margin-left:2px}.tp-btnv_b{width:100%}.tp-btnv_t{text-align:center}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--elm-br);cursor:pointer;display:block;height:var(--bld-us);position:relative;width:var(--bld-us)}.tp-ckbv_w svg{bottom:0;display:block;height:16px;left:0;margin:auto;opacity:0;position:absolute;right:0;top:0;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--bld-us)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-cpl .tp-colv_p{overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--bld-s);opacity:1}.tp-colv .tp-popv{left:calc(-1*var(--cnt-h-p));right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--bld-s)}.tp-colpv_rgb{display:flex;margin-top:var(--bld-s);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-v-p);padding-top:calc(var(--cnt-v-p) + 2px);position:relative}.tp-colpv_a::before{background-color:var(--grv-fg);content:"";height:2px;left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:0}.tp-colpv.tp-v-disabled .tp-colpv_a::before{opacity:.5}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--elm-br);outline:none;overflow:hidden;position:relative}.tp-svpv.tp-v-disabled{opacity:.5}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--bld-us)*4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0, 0, 0, 0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative}.tp-hplv.tp-v-disabled{opacity:.5}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--elm-br);border:rgba(255,255,255,.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative;width:100%}.tp-aplv.tp-v-disabled{opacity:.5}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--elm-br);box-shadow:0 0 2px rgba(0,0,0,.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;pointer-events:none;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--elm-br);border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--elm-br);overflow:hidden}.tp-colswv.tp-v-disabled{opacity:.5}.tp-colswv_sw{border-radius:0}.tp-colswv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;cursor:pointer;display:block;height:var(--bld-us);left:0;margin:0;outline:none;padding:0;position:absolute;top:0;width:var(--bld-us)}.tp-colswv_b:focus::after{border:rgba(255,255,255,.75) solid 2px;border-radius:var(--elm-br);bottom:0;content:"";display:block;left:0;position:absolute;right:0;top:0}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--elm-br);color:var(--lbl-fg);cursor:pointer;height:var(--bld-us);line-height:var(--bld-us);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv.tp-v-disabled .tp-coltxtv_mm{opacity:.5}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv{position:relative}.tp-fldv.tp-fldv-not .tp-fldv_b{display:none}.tp-fldv_t{padding-left:4px}.tp-fldv_b:disabled .tp-fldv_m{display:none}.tp-fldv_c{padding-left:4px}.tp-fldv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--bld-us) + 4px);width:var(--bs-br)}.tp-fldv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-fldv_b:hover+.tp-fldv_i{color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_i{color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_i{color:var(--cnt-bg-a)}.tp-fldv.tp-v-disabled>.tp-fldv_i{opacity:.5}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--bld-us)*3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left .05s,top .05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-h-p);padding-right:var(--cnt-h-p)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:160px}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding:0 4px}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:.5}.tp-mllv_i{display:block;height:calc(var(--bld-us)*3);line-height:var(--bld-us);padding:0 4px;resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--bld-us);margin-right:4px;position:relative;width:var(--bld-us)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--bld-s);opacity:1}.tp-p2dv .tp-popv{left:calc(-1*var(--cnt-h-p));right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-p2dpv{padding-left:calc(var(--bld-us) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv.tp-v-disabled .tp-p2dpv_p{opacity:.5}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:6px;box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:168px;padding:var(--cnt-v-p) var(--cnt-h-p);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sprv.tp-v-disabled .tp-sprv_r{opacity:.5}.tp-sldv.tp-v-disabled{opacity:.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--bld-us);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;bottom:0;content:"";display:block;height:2px;left:0;margin:auto;position:absolute;right:0;top:0}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";display:block;height:2px;left:0;margin-bottom:auto;margin-top:auto;position:absolute;right:0;top:0}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--elm-br);bottom:0;content:"";display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv{position:relative}.tp-tabv_t{align-items:flex-end;color:var(--cnt-bg);display:flex;overflow:hidden;position:relative}.tp-tabv_t:hover{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus){color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active){color:var(--cnt-bg-a)}.tp-tabv_t::before{background-color:currentColor;bottom:0;content:"";height:2px;left:0;pointer-events:none;position:absolute;right:0}.tp-tabv.tp-v-disabled .tp-tabv_t::before{opacity:.5}.tp-tabv.tp-tabv-nop .tp-tabv_t{height:calc(var(--bld-us) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_t::before{background-color:var(--cnt-bg);bottom:0;content:"";height:2px;left:0;position:absolute;right:0}.tp-tabv_c{padding-bottom:var(--cnt-v-p);padding-left:4px;padding-top:var(--cnt-v-p)}.tp-tabv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--bld-us) + 4px);width:var(--bs-br)}.tp-tabv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-tabv_t:hover+.tp-tabv_i{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus)+.tp-tabv_i{color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active)+.tp-tabv_i{color:var(--cnt-bg-a)}.tp-tabv.tp-v-disabled>.tp-tabv_i{opacity:.5}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv.tp-v-disabled::before{opacity:.5}.tp-tbiv_b{display:block;padding-left:calc(var(--cnt-h-p) + 4px);padding-right:calc(var(--cnt-h-p) + 4px);position:relative;width:100%}.tp-tbiv_b:disabled{opacity:.5}.tp-tbiv_b::before{background-color:var(--cnt-bg);bottom:2px;content:"";left:0;pointer-events:none;position:absolute;right:0;top:0}.tp-tbiv_b:hover::before{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus::before{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active::before{background-color:var(--cnt-bg-a)}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);opacity:.5;overflow:hidden;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-txtv{position:relative}.tp-txtv_i{padding:0 4px}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:.3}.tp-txtv_k{cursor:pointer;height:100%;left:-3px;position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";height:calc(var(--bld-us) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:.1;position:absolute;top:0;transition:border-radius .1s,height .1s,transform .1s,width .1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--elm-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0);border-style:solid;border-width:2px;box-sizing:border-box;content:"";font-size:.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--font-family);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(4px + var(--bld-us) + var(--cnt-h-p));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0}.tp-rotv.tp-rotv-not .tp-rotv_b{display:none}.tp-rotv_b:disabled .tp-rotv_m{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1*var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1*var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_t{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}'), this.pool_.getAll().forEach((e) => {
          this.embedPluginStyle_(e);
        }), this.registerPlugin({
          plugins: [
            Kc,
            jc,
            wi,
            $c
          ]
        });
      }
    }
    const qc = new s("3.1.4");
    r.BladeApi = a, r.ButtonApi = j, r.FolderApi = fi, r.InputBindingApi = di, r.ListApi = na, r.MonitorBindingApi = mi, r.Pane = Yc, r.SeparatorApi = is, r.SliderApi = ia, r.TabApi = rs, r.TabPageApi = _i, r.TextApi = sa, r.TpChangeEvent = u, r.VERSION = qc, Object.defineProperty(r, "__esModule", { value: true });
  });
})(Th, zs);
var Wi = {};
var kh = {
  get exports() {
    return Wi;
  },
  set exports(b) {
    Wi = b;
  }
};
(function(b, i) {
  (function(r, s) {
    s(i);
  })(tl, function(r) {
    class s {
      constructor(o) {
        this.controller_ = o;
      }
      get element() {
        return this.controller_.view.element;
      }
      get disabled() {
        return this.controller_.viewProps.get("disabled");
      }
      set disabled(o) {
        this.controller_.viewProps.set("disabled", o);
      }
      get hidden() {
        return this.controller_.viewProps.get("hidden");
      }
      set hidden(o) {
        this.controller_.viewProps.set("hidden", o);
      }
      dispose() {
        this.controller_.viewProps.set("disposed", true);
      }
    }
    class a {
      constructor(o) {
        this.target = o;
      }
    }
    class c extends a {
      constructor(o, p, f, x) {
        super(o), this.value = p, this.presetKey = f, this.last = x ?? true;
      }
    }
    function u(d) {
      return d;
    }
    function h(d) {
      return d == null;
    }
    const m = {
      alreadydisposed: () => "View has been already disposed",
      invalidparams: (d) => `Invalid parameters for '${d.name}'`,
      nomatchingcontroller: (d) => `No matching controller for '${d.key}'`,
      nomatchingview: (d) => `No matching view for '${JSON.stringify(d.params)}'`,
      notbindable: () => "Value is not bindable",
      propertynotfound: (d) => `Property '${d.name}' not found`,
      shouldneverhappen: () => "This error should never happen"
    };
    class g {
      constructor(o) {
        var p;
        this.message = (p = m[o.type](o.context)) !== null && p !== void 0 ? p : "Unexpected error", this.name = this.constructor.name, this.stack = new Error(this.message).stack, this.type = o.type;
      }
      static alreadyDisposed() {
        return new g({ type: "alreadydisposed" });
      }
      static notBindable() {
        return new g({
          type: "notbindable"
        });
      }
      static propertyNotFound(o) {
        return new g({
          type: "propertynotfound",
          context: {
            name: o
          }
        });
      }
      static shouldNeverHappen() {
        return new g({ type: "shouldneverhappen" });
      }
    }
    class w {
      constructor() {
        this.observers_ = {};
      }
      on(o, p) {
        let f = this.observers_[o];
        return f || (f = this.observers_[o] = []), f.push({
          handler: p
        }), this;
      }
      off(o, p) {
        const f = this.observers_[o];
        return f && (this.observers_[o] = f.filter((x) => x.handler !== p)), this;
      }
      emit(o, p) {
        const f = this.observers_[o];
        f && f.forEach((x) => {
          x.handler(p);
        });
      }
    }
    const _ = "tp";
    function y(d) {
      return (p, f) => [
        _,
        "-",
        d,
        "v",
        p ? `_${p}` : "",
        f ? `-${f}` : ""
      ].join("");
    }
    function C(d, o) {
      return (p) => o(d(p));
    }
    function I(d) {
      return d.rawValue;
    }
    function S(d, o) {
      d.emitter.on("change", C(I, o)), o(d.rawValue);
    }
    function R(d, o, p) {
      S(d.value(o), p);
    }
    function j(d, o, p) {
      p ? d.classList.add(o) : d.classList.remove(o);
    }
    function F(d, o) {
      return (p) => {
        j(d, o, p);
      };
    }
    function V(d, o) {
      S(d, (p) => {
        o.textContent = p ?? "";
      });
    }
    const D = y("btn");
    class Y {
      constructor(o, p) {
        this.element = o.createElement("div"), this.element.classList.add(D()), p.viewProps.bindClassModifiers(this.element);
        const f = o.createElement("button");
        f.classList.add(D("b")), p.viewProps.bindDisabled(f), this.element.appendChild(f), this.buttonElement = f;
        const x = o.createElement("div");
        x.classList.add(D("t")), V(p.props.value("title"), x), this.buttonElement.appendChild(x);
      }
    }
    class G {
      constructor(o, p) {
        this.emitter = new w(), this.onClick_ = this.onClick_.bind(this), this.props = p.props, this.viewProps = p.viewProps, this.view = new Y(o, {
          props: this.props,
          viewProps: this.viewProps
        }), this.view.buttonElement.addEventListener("click", this.onClick_);
      }
      onClick_() {
        this.emitter.emit("click", {
          sender: this
        });
      }
    }
    class N {
      constructor(o, p) {
        var f;
        this.constraint_ = p == null ? void 0 : p.constraint, this.equals_ = (f = p == null ? void 0 : p.equals) !== null && f !== void 0 ? f : (x, T) => x === T, this.emitter = new w(), this.rawValue_ = o;
      }
      get constraint() {
        return this.constraint_;
      }
      get rawValue() {
        return this.rawValue_;
      }
      set rawValue(o) {
        this.setRawValue(o, {
          forceEmit: false,
          last: true
        });
      }
      setRawValue(o, p) {
        const f = p ?? {
          forceEmit: false,
          last: true
        }, x = this.constraint_ ? this.constraint_.constrain(o) : o, T = this.rawValue_;
        this.equals_(T, x) && !f.forceEmit || (this.emitter.emit("beforechange", {
          sender: this
        }), this.rawValue_ = x, this.emitter.emit("change", {
          options: f,
          previousRawValue: T,
          rawValue: x,
          sender: this
        }));
      }
    }
    class O {
      constructor(o) {
        this.emitter = new w(), this.value_ = o;
      }
      get rawValue() {
        return this.value_;
      }
      set rawValue(o) {
        this.setRawValue(o, {
          forceEmit: false,
          last: true
        });
      }
      setRawValue(o, p) {
        const f = p ?? {
          forceEmit: false,
          last: true
        }, x = this.value_;
        x === o && !f.forceEmit || (this.emitter.emit("beforechange", {
          sender: this
        }), this.value_ = o, this.emitter.emit("change", {
          options: f,
          previousRawValue: x,
          rawValue: this.value_,
          sender: this
        }));
      }
    }
    function H(d, o) {
      const p = o == null ? void 0 : o.constraint, f = o == null ? void 0 : o.equals;
      return !p && !f ? new O(d) : new N(d, o);
    }
    class K {
      constructor(o) {
        this.emitter = new w(), this.valMap_ = o;
        for (const p in this.valMap_)
          this.valMap_[p].emitter.on("change", () => {
            this.emitter.emit("change", {
              key: p,
              sender: this
            });
          });
      }
      static createCore(o) {
        return Object.keys(o).reduce((f, x) => Object.assign(f, {
          [x]: H(o[x])
        }), {});
      }
      static fromObject(o) {
        const p = this.createCore(o);
        return new K(p);
      }
      get(o) {
        return this.valMap_[o].rawValue;
      }
      set(o, p) {
        this.valMap_[o].rawValue = p;
      }
      value(o) {
        return this.valMap_[o];
      }
    }
    function q(d, o) {
      const f = Object.keys(o).reduce((x, T) => {
        if (x === void 0)
          return;
        const L = o[T], z = L(d[T]);
        return z.succeeded ? Object.assign(Object.assign({}, x), { [T]: z.value }) : void 0;
      }, {});
      return f;
    }
    function he(d, o) {
      return d.reduce((p, f) => {
        if (p === void 0)
          return;
        const x = o(f);
        if (!(!x.succeeded || x.value === void 0))
          return [...p, x.value];
      }, []);
    }
    function _e(d) {
      return d === null ? false : typeof d == "object";
    }
    function pe(d) {
      return (o) => (p) => {
        if (!o && p === void 0)
          return {
            succeeded: false,
            value: void 0
          };
        if (o && p === void 0)
          return {
            succeeded: true,
            value: void 0
          };
        const f = d(p);
        return f !== void 0 ? {
          succeeded: true,
          value: f
        } : {
          succeeded: false,
          value: void 0
        };
      };
    }
    function fe(d) {
      return {
        custom: (o) => pe(o)(d),
        boolean: pe((o) => typeof o == "boolean" ? o : void 0)(d),
        number: pe((o) => typeof o == "number" ? o : void 0)(d),
        string: pe((o) => typeof o == "string" ? o : void 0)(d),
        function: pe((o) => typeof o == "function" ? o : void 0)(d),
        constant: (o) => pe((p) => p === o ? o : void 0)(d),
        raw: pe((o) => o)(d),
        object: (o) => pe((p) => {
          if (_e(p))
            return q(p, o);
        })(d),
        array: (o) => pe((p) => {
          if (Array.isArray(p))
            return he(p, o);
        })(d)
      };
    }
    const de = {
      optional: fe(true),
      required: fe(false)
    };
    function te(d, o) {
      const p = de.required.object(o)(d);
      return p.succeeded ? p.value : void 0;
    }
    function X(d) {
      console.warn([
        `Missing '${d.key}' of ${d.target} in ${d.place}.`,
        "Please rebuild plugins with the latest core package."
      ].join(" "));
    }
    function ke(d) {
      return d && d.parentElement && d.parentElement.removeChild(d), null;
    }
    class ve {
      constructor(o) {
        this.value_ = o;
      }
      static create(o) {
        return [
          new ve(o),
          (p, f) => {
            o.setRawValue(p, f);
          }
        ];
      }
      get emitter() {
        return this.value_.emitter;
      }
      get rawValue() {
        return this.value_.rawValue;
      }
    }
    const le = y("");
    function ie(d, o) {
      return F(d, le(void 0, o));
    }
    class ge extends K {
      constructor(o) {
        var p;
        super(o), this.onDisabledChange_ = this.onDisabledChange_.bind(this), this.onParentChange_ = this.onParentChange_.bind(this), this.onParentGlobalDisabledChange_ = this.onParentGlobalDisabledChange_.bind(this), [this.globalDisabled_, this.setGlobalDisabled_] = ve.create(H(this.getGlobalDisabled_())), this.value("disabled").emitter.on("change", this.onDisabledChange_), this.value("parent").emitter.on("change", this.onParentChange_), (p = this.get("parent")) === null || p === void 0 || p.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_);
      }
      static create(o) {
        var p, f, x;
        const T = o ?? {};
        return new ge(K.createCore({
          disabled: (p = T.disabled) !== null && p !== void 0 ? p : false,
          disposed: false,
          hidden: (f = T.hidden) !== null && f !== void 0 ? f : false,
          parent: (x = T.parent) !== null && x !== void 0 ? x : null
        }));
      }
      get globalDisabled() {
        return this.globalDisabled_;
      }
      bindClassModifiers(o) {
        S(this.globalDisabled_, ie(o, "disabled")), R(this, "hidden", ie(o, "hidden"));
      }
      bindDisabled(o) {
        S(this.globalDisabled_, (p) => {
          o.disabled = p;
        });
      }
      bindTabIndex(o) {
        S(this.globalDisabled_, (p) => {
          o.tabIndex = p ? -1 : 0;
        });
      }
      handleDispose(o) {
        this.value("disposed").emitter.on("change", (p) => {
          p && o();
        });
      }
      getGlobalDisabled_() {
        const o = this.get("parent");
        return (o ? o.globalDisabled.rawValue : false) || this.get("disabled");
      }
      updateGlobalDisabled_() {
        this.setGlobalDisabled_(this.getGlobalDisabled_());
      }
      onDisabledChange_() {
        this.updateGlobalDisabled_();
      }
      onParentGlobalDisabledChange_() {
        this.updateGlobalDisabled_();
      }
      onParentChange_(o) {
        var p;
        const f = o.previousRawValue;
        f == null || f.globalDisabled.emitter.off("change", this.onParentGlobalDisabledChange_), (p = this.get("parent")) === null || p === void 0 || p.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_), this.updateGlobalDisabled_();
      }
    }
    function M() {
      return ["veryfirst", "first", "last", "verylast"];
    }
    const ce = y(""), Oe = {
      veryfirst: "vfst",
      first: "fst",
      last: "lst",
      verylast: "vlst"
    };
    class je {
      constructor(o) {
        this.parent_ = null, this.blade = o.blade, this.view = o.view, this.viewProps = o.viewProps;
        const p = this.view.element;
        this.blade.value("positions").emitter.on("change", () => {
          M().forEach((f) => {
            p.classList.remove(ce(void 0, Oe[f]));
          }), this.blade.get("positions").forEach((f) => {
            p.classList.add(ce(void 0, Oe[f]));
          });
        }), this.viewProps.handleDispose(() => {
          ke(p);
        });
      }
      get parent() {
        return this.parent_;
      }
      set parent(o) {
        if (this.parent_ = o, !("parent" in this.viewProps.valMap_)) {
          X({
            key: "parent",
            target: ge.name,
            place: "BladeController.parent"
          });
          return;
        }
        this.viewProps.set("parent", this.parent_ ? this.parent_.viewProps : null);
      }
    }
    const ye = "http://www.w3.org/2000/svg";
    function st(d) {
      d.offsetHeight;
    }
    function Fn(d, o) {
      const p = d.style.transition;
      d.style.transition = "none", o(), d.style.transition = p;
    }
    function Qe(d) {
      return d.ontouchstart !== void 0;
    }
    function Bn(d) {
      for (; d.childNodes.length > 0; )
        d.removeChild(d.childNodes[0]);
    }
    function on(d) {
      return d.relatedTarget ? d.relatedTarget : "explicitOriginalTarget" in d ? d.explicitOriginalTarget : null;
    }
    const mt = y("lbl");
    function At(d, o) {
      const p = d.createDocumentFragment();
      return o.split(`
`).map((x) => d.createTextNode(x)).forEach((x, T) => {
        T > 0 && p.appendChild(d.createElement("br")), p.appendChild(x);
      }), p;
    }
    class He {
      constructor(o, p) {
        this.element = o.createElement("div"), this.element.classList.add(mt()), p.viewProps.bindClassModifiers(this.element);
        const f = o.createElement("div");
        f.classList.add(mt("l")), R(p.props, "label", (T) => {
          h(T) ? this.element.classList.add(mt(void 0, "nol")) : (this.element.classList.remove(mt(void 0, "nol")), Bn(f), f.appendChild(At(o, T)));
        }), this.element.appendChild(f), this.labelElement = f;
        const x = o.createElement("div");
        x.classList.add(mt("v")), this.element.appendChild(x), this.valueElement = x;
      }
    }
    class rt extends je {
      constructor(o, p) {
        const f = p.valueController.viewProps;
        super(Object.assign(Object.assign({}, p), { view: new He(o, {
          props: p.props,
          viewProps: f
        }), viewProps: f })), this.props = p.props, this.valueController = p.valueController, this.view.valueElement.appendChild(this.valueController.view.element);
      }
    }
    class an extends je {
      constructor(o) {
        super(o), this.value = o.value;
      }
    }
    class ft extends K {
      constructor(o) {
        super(o);
      }
      static create(o) {
        const p = {
          completed: true,
          expanded: o,
          expandedHeight: null,
          shouldFixHeight: false,
          temporaryExpanded: null
        }, f = K.createCore(p);
        return new ft(f);
      }
      get styleExpanded() {
        var o;
        return (o = this.get("temporaryExpanded")) !== null && o !== void 0 ? o : this.get("expanded");
      }
      get styleHeight() {
        if (!this.styleExpanded)
          return "0";
        const o = this.get("expandedHeight");
        return this.get("shouldFixHeight") && !h(o) ? `${o}px` : "auto";
      }
      bindExpandedClass(o, p) {
        const f = () => {
          this.styleExpanded ? o.classList.add(p) : o.classList.remove(p);
        };
        R(this, "expanded", f), R(this, "temporaryExpanded", f);
      }
      cleanUpTransition() {
        this.set("shouldFixHeight", false), this.set("expandedHeight", null), this.set("completed", true);
      }
    }
    function jn(d) {
      return ft.create(d);
    }
    function ui(d, o) {
      let p = 0;
      return Fn(o, () => {
        d.set("expandedHeight", null), d.set("temporaryExpanded", true), st(o), p = o.clientHeight, d.set("temporaryExpanded", null), st(o);
      }), p;
    }
    function zn(d, o) {
      o.style.height = d.styleHeight;
    }
    function Un(d, o) {
      d.value("expanded").emitter.on("beforechange", () => {
        d.set("completed", false), h(d.get("expandedHeight")) && d.set("expandedHeight", ui(d, o)), d.set("shouldFixHeight", true), st(o);
      }), d.emitter.on("change", () => {
        zn(d, o);
      }), zn(d, o), o.addEventListener("transitionend", (p) => {
        p.propertyName === "height" && d.cleanUpTransition();
      });
    }
    class xt {
      constructor(o, p) {
        const f = y(p.viewName);
        this.element = o.createElement("div"), this.element.classList.add(f()), p.viewProps.bindClassModifiers(this.element);
      }
    }
    class Lt extends an {
      constructor(o, p) {
        const f = p.valueController.viewProps;
        super(Object.assign(Object.assign({}, p), { value: p.valueController.value, view: new He(o, {
          props: p.props,
          viewProps: f
        }), viewProps: f })), this.props = p.props, this.valueController = p.valueController, this.view.valueElement.appendChild(this.valueController.view.element);
      }
    }
    class Gn {
      constructor() {
        this.disabled = false, this.emitter = new w();
      }
      dispose() {
      }
      tick() {
        this.disabled || this.emitter.emit("tick", {
          sender: this
        });
      }
    }
    class ln {
      constructor(o, p) {
        this.disabled_ = false, this.timerId_ = null, this.onTick_ = this.onTick_.bind(this), this.doc_ = o, this.emitter = new w(), this.interval_ = p, this.setTimer_();
      }
      get disabled() {
        return this.disabled_;
      }
      set disabled(o) {
        this.disabled_ = o, this.disabled_ ? this.clearTimer_() : this.setTimer_();
      }
      dispose() {
        this.clearTimer_();
      }
      clearTimer_() {
        if (this.timerId_ === null)
          return;
        const o = this.doc_.defaultView;
        o && o.clearInterval(this.timerId_), this.timerId_ = null;
      }
      setTimer_() {
        if (this.clearTimer_(), this.interval_ <= 0)
          return;
        const o = this.doc_.defaultView;
        o && (this.timerId_ = o.setInterval(this.onTick_, this.interval_));
      }
      onTick_() {
        this.disabled_ || this.emitter.emit("tick", {
          sender: this
        });
      }
    }
    class Hn {
      constructor(o) {
        this.constraints = o;
      }
      constrain(o) {
        return this.constraints.reduce((p, f) => f.constrain(p), o);
      }
    }
    function Et(d, o) {
      if (d instanceof o)
        return d;
      if (d instanceof Hn) {
        const p = d.constraints.reduce((f, x) => f || (x instanceof o ? x : null), null);
        if (p)
          return p;
      }
      return null;
    }
    class vt {
      constructor(o) {
        this.values = K.fromObject({
          max: o.max,
          min: o.min
        });
      }
      constrain(o) {
        const p = this.values.get("max"), f = this.values.get("min");
        return Math.min(Math.max(o, f), p);
      }
    }
    class Rt {
      constructor(o) {
        this.values = K.fromObject({
          max: o.max,
          min: o.min
        });
      }
      get maxValue() {
        return this.values.get("max");
      }
      get minValue() {
        return this.values.get("min");
      }
      constrain(o) {
        const p = this.values.get("max"), f = this.values.get("min");
        let x = o;
        return h(f) || (x = Math.max(x, f)), h(p) || (x = Math.min(x, p)), x;
      }
    }
    class A {
      constructor(o, p = 0) {
        this.step = o, this.origin = p;
      }
      constrain(o) {
        const p = this.origin % this.step, f = Math.round((o - p) / this.step);
        return p + f * this.step;
      }
    }
    const U = y("pop");
    class J {
      constructor(o, p) {
        this.element = o.createElement("div"), this.element.classList.add(U()), p.viewProps.bindClassModifiers(this.element), S(p.shows, F(this.element, U(void 0, "v")));
      }
    }
    class se {
      constructor(o, p) {
        this.shows = H(false), this.viewProps = p.viewProps, this.view = new J(o, {
          shows: this.shows,
          viewProps: this.viewProps
        });
      }
    }
    const xe = y("txt");
    class Ne {
      constructor(o, p) {
        this.onChange_ = this.onChange_.bind(this), this.element = o.createElement("div"), this.element.classList.add(xe()), p.viewProps.bindClassModifiers(this.element), this.props_ = p.props, this.props_.emitter.on("change", this.onChange_);
        const f = o.createElement("input");
        f.classList.add(xe("i")), f.type = "text", p.viewProps.bindDisabled(f), this.element.appendChild(f), this.inputElement = f, p.value.emitter.on("change", this.onChange_), this.value_ = p.value, this.refresh();
      }
      refresh() {
        const o = this.props_.get("formatter");
        this.inputElement.value = o(this.value_.rawValue);
      }
      onChange_() {
        this.refresh();
      }
    }
    class Ut {
      constructor(o, p) {
        this.onInputChange_ = this.onInputChange_.bind(this), this.parser_ = p.parser, this.props = p.props, this.value = p.value, this.viewProps = p.viewProps, this.view = new Ne(o, {
          props: p.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_);
      }
      onInputChange_(o) {
        const f = o.currentTarget.value, x = this.parser_(f);
        h(x) || (this.value.rawValue = x), this.view.refresh();
      }
    }
    function cn(d) {
      return d === "false" ? false : !!d;
    }
    class Ke {
      constructor(o) {
        this.text = o;
      }
      evaluate() {
        return Number(this.text);
      }
      toString() {
        return this.text;
      }
    }
    const $e = {
      "**": (d, o) => Math.pow(d, o),
      "*": (d, o) => d * o,
      "/": (d, o) => d / o,
      "%": (d, o) => d % o,
      "+": (d, o) => d + o,
      "-": (d, o) => d - o,
      "<<": (d, o) => d << o,
      ">>": (d, o) => d >> o,
      ">>>": (d, o) => d >>> o,
      "&": (d, o) => d & o,
      "^": (d, o) => d ^ o,
      "|": (d, o) => d | o
    };
    class Hs {
      constructor(o, p, f) {
        this.left = p, this.operator = o, this.right = f;
      }
      evaluate() {
        const o = $e[this.operator];
        if (!o)
          throw new Error(`unexpected binary operator: '${this.operator}`);
        return o(this.left.evaluate(), this.right.evaluate());
      }
      toString() {
        return [
          "b(",
          this.left.toString(),
          this.operator,
          this.right.toString(),
          ")"
        ].join(" ");
      }
    }
    const Ks = {
      "+": (d) => d,
      "-": (d) => -d,
      "~": (d) => ~d
    };
    class $s {
      constructor(o, p) {
        this.operator = o, this.expression = p;
      }
      evaluate() {
        const o = Ks[this.operator];
        if (!o)
          throw new Error(`unexpected unary operator: '${this.operator}`);
        return o(this.expression.evaluate());
      }
      toString() {
        return ["u(", this.operator, this.expression.toString(), ")"].join(" ");
      }
    }
    function hi(d) {
      return (o, p) => {
        for (let f = 0; f < d.length; f++) {
          const x = d[f](o, p);
          if (x !== "")
            return x;
        }
        return "";
      };
    }
    function It(d, o) {
      var p;
      const f = d.substr(o).match(/^\s+/);
      return (p = f && f[0]) !== null && p !== void 0 ? p : "";
    }
    function di(d, o) {
      const p = d.substr(o, 1);
      return p.match(/^[1-9]$/) ? p : "";
    }
    function ze(d, o) {
      var p;
      const f = d.substr(o).match(/^[0-9]+/);
      return (p = f && f[0]) !== null && p !== void 0 ? p : "";
    }
    function mi(d, o) {
      const p = ze(d, o);
      if (p !== "")
        return p;
      const f = d.substr(o, 1);
      if (o += 1, f !== "-" && f !== "+")
        return "";
      const x = ze(d, o);
      return x === "" ? "" : f + x;
    }
    function ot(d, o) {
      const p = d.substr(o, 1);
      if (o += 1, p.toLowerCase() !== "e")
        return "";
      const f = mi(d, o);
      return f === "" ? "" : p + f;
    }
    function es(d, o) {
      const p = d.substr(o, 1);
      if (p === "0")
        return p;
      const f = di(d, o);
      return o += f.length, f === "" ? "" : f + ze(d, o);
    }
    function pn(d, o) {
      const p = es(d, o);
      if (o += p.length, p === "")
        return "";
      const f = d.substr(o, 1);
      if (o += f.length, f !== ".")
        return "";
      const x = ze(d, o);
      return o += x.length, p + f + x + ot(d, o);
    }
    function ts(d, o) {
      const p = d.substr(o, 1);
      if (o += p.length, p !== ".")
        return "";
      const f = ze(d, o);
      return o += f.length, f === "" ? "" : p + f + ot(d, o);
    }
    function Kn(d, o) {
      const p = es(d, o);
      return o += p.length, p === "" ? "" : p + ot(d, o);
    }
    const fi = hi([
      pn,
      ts,
      Kn
    ]);
    function vi(d, o) {
      var p;
      const f = d.substr(o).match(/^[01]+/);
      return (p = f && f[0]) !== null && p !== void 0 ? p : "";
    }
    function Xs(d, o) {
      const p = d.substr(o, 2);
      if (o += p.length, p.toLowerCase() !== "0b")
        return "";
      const f = vi(d, o);
      return f === "" ? "" : p + f;
    }
    function Ys(d, o) {
      var p;
      const f = d.substr(o).match(/^[0-7]+/);
      return (p = f && f[0]) !== null && p !== void 0 ? p : "";
    }
    function qs(d, o) {
      const p = d.substr(o, 2);
      if (o += p.length, p.toLowerCase() !== "0o")
        return "";
      const f = Ys(d, o);
      return f === "" ? "" : p + f;
    }
    function Qs(d, o) {
      var p;
      const f = d.substr(o).match(/^[0-9a-f]+/i);
      return (p = f && f[0]) !== null && p !== void 0 ? p : "";
    }
    function bi(d, o) {
      const p = d.substr(o, 2);
      if (o += p.length, p.toLowerCase() !== "0x")
        return "";
      const f = Qs(d, o);
      return f === "" ? "" : p + f;
    }
    const Zs = hi([
      Xs,
      qs,
      bi
    ]), Ws = hi([
      Zs,
      fi
    ]);
    function un(d, o) {
      const p = Ws(d, o);
      return o += p.length, p === "" ? null : {
        evaluable: new Ke(p),
        cursor: o
      };
    }
    function ns(d, o) {
      const p = d.substr(o, 1);
      if (o += p.length, p !== "(")
        return null;
      const f = gi(d, o);
      if (!f)
        return null;
      o = f.cursor, o += It(d, o).length;
      const x = d.substr(o, 1);
      return o += x.length, x !== ")" ? null : {
        evaluable: f.evaluable,
        cursor: o
      };
    }
    function Js(d, o) {
      var p;
      return (p = un(d, o)) !== null && p !== void 0 ? p : ns(d, o);
    }
    function $n(d, o) {
      const p = Js(d, o);
      if (p)
        return p;
      const f = d.substr(o, 1);
      if (o += f.length, f !== "+" && f !== "-" && f !== "~")
        return null;
      const x = $n(d, o);
      return x ? (o = x.cursor, {
        cursor: o,
        evaluable: new $s(f, x.evaluable)
      }) : null;
    }
    function er(d, o, p) {
      p += It(o, p).length;
      const f = d.filter((x) => o.startsWith(x, p))[0];
      return f ? (p += f.length, p += It(o, p).length, {
        cursor: p,
        operator: f
      }) : null;
    }
    function Gt(d, o) {
      return (p, f) => {
        const x = d(p, f);
        if (!x)
          return null;
        f = x.cursor;
        let T = x.evaluable;
        for (; ; ) {
          const L = er(o, p, f);
          if (!L)
            break;
          f = L.cursor;
          const z = d(p, f);
          if (!z)
            return null;
          f = z.cursor, T = new Hs(L.operator, T, z.evaluable);
        }
        return T ? {
          cursor: f,
          evaluable: T
        } : null;
      };
    }
    const is = [
      ["**"],
      ["*", "/", "%"],
      ["+", "-"],
      ["<<", ">>>", ">>"],
      ["&"],
      ["^"],
      ["|"]
    ].reduce((d, o) => Gt(d, o), $n);
    function gi(d, o) {
      return o += It(d, o).length, is(d, o);
    }
    function tr(d) {
      const o = gi(d, 0);
      return !o || o.cursor + It(d, o.cursor).length !== d.length ? null : o.evaluable;
    }
    function hn(d) {
      var o;
      const p = tr(d);
      return (o = p == null ? void 0 : p.evaluate()) !== null && o !== void 0 ? o : null;
    }
    function nr(d) {
      if (typeof d == "number")
        return d;
      if (typeof d == "string") {
        const o = hn(d);
        if (!h(o))
          return o;
      }
      return 0;
    }
    function Ie(d) {
      return (o) => o.toFixed(Math.max(Math.min(d, 20), 0));
    }
    const ir = Ie(0);
    function Xn(d) {
      return ir(d) + "%";
    }
    function ss(d) {
      return String(d);
    }
    function _i(d, o) {
      for (; d.length < o; )
        d.push(void 0);
    }
    function rs(d) {
      const o = [];
      return _i(o, d), H(o);
    }
    function os(d) {
      const o = d.indexOf(void 0);
      return o < 0 ? d : d.slice(0, o);
    }
    function sr(d, o) {
      const p = [...os(d), o];
      return p.length > d.length ? p.splice(0, p.length - d.length) : _i(p, d.length), p;
    }
    function Ht({ primary: d, secondary: o, forward: p, backward: f }) {
      let x = false;
      function T(L) {
        x || (x = true, L(), x = false);
      }
      d.emitter.on("change", (L) => {
        T(() => {
          o.setRawValue(p(d, o), L.options);
        });
      }), o.emitter.on("change", (L) => {
        T(() => {
          d.setRawValue(f(d, o), L.options);
        }), T(() => {
          o.setRawValue(p(d, o), L.options);
        });
      }), T(() => {
        o.setRawValue(p(d, o), {
          forceEmit: false,
          last: true
        });
      });
    }
    function Kt(d, o) {
      const p = d * (o.altKey ? 0.1 : 1) * (o.shiftKey ? 10 : 1);
      return o.upKey ? +p : o.downKey ? -p : 0;
    }
    function dn(d) {
      return {
        altKey: d.altKey,
        downKey: d.key === "ArrowDown",
        shiftKey: d.shiftKey,
        upKey: d.key === "ArrowUp"
      };
    }
    function wi(d) {
      return {
        altKey: d.altKey,
        downKey: d.key === "ArrowLeft",
        shiftKey: d.shiftKey,
        upKey: d.key === "ArrowRight"
      };
    }
    function rr(d) {
      return d === "ArrowUp" || d === "ArrowDown";
    }
    function as(d) {
      return rr(d) || d === "ArrowLeft" || d === "ArrowRight";
    }
    function yi(d, o) {
      var p, f;
      const x = o.ownerDocument.defaultView, T = o.getBoundingClientRect();
      return {
        x: d.pageX - (((p = x && x.scrollX) !== null && p !== void 0 ? p : 0) + T.left),
        y: d.pageY - (((f = x && x.scrollY) !== null && f !== void 0 ? f : 0) + T.top)
      };
    }
    class Ct2 {
      constructor(o) {
        this.lastTouch_ = null, this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this), this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this), this.onMouseDown_ = this.onMouseDown_.bind(this), this.onTouchEnd_ = this.onTouchEnd_.bind(this), this.onTouchMove_ = this.onTouchMove_.bind(this), this.onTouchStart_ = this.onTouchStart_.bind(this), this.elem_ = o, this.emitter = new w(), o.addEventListener("touchstart", this.onTouchStart_, {
          passive: false
        }), o.addEventListener("touchmove", this.onTouchMove_, {
          passive: true
        }), o.addEventListener("touchend", this.onTouchEnd_), o.addEventListener("mousedown", this.onMouseDown_);
      }
      computePosition_(o) {
        const p = this.elem_.getBoundingClientRect();
        return {
          bounds: {
            width: p.width,
            height: p.height
          },
          point: o ? {
            x: o.x,
            y: o.y
          } : null
        };
      }
      onMouseDown_(o) {
        var p;
        o.preventDefault(), (p = o.currentTarget) === null || p === void 0 || p.focus();
        const f = this.elem_.ownerDocument;
        f.addEventListener("mousemove", this.onDocumentMouseMove_), f.addEventListener("mouseup", this.onDocumentMouseUp_), this.emitter.emit("down", {
          altKey: o.altKey,
          data: this.computePosition_(yi(o, this.elem_)),
          sender: this,
          shiftKey: o.shiftKey
        });
      }
      onDocumentMouseMove_(o) {
        this.emitter.emit("move", {
          altKey: o.altKey,
          data: this.computePosition_(yi(o, this.elem_)),
          sender: this,
          shiftKey: o.shiftKey
        });
      }
      onDocumentMouseUp_(o) {
        const p = this.elem_.ownerDocument;
        p.removeEventListener("mousemove", this.onDocumentMouseMove_), p.removeEventListener("mouseup", this.onDocumentMouseUp_), this.emitter.emit("up", {
          altKey: o.altKey,
          data: this.computePosition_(yi(o, this.elem_)),
          sender: this,
          shiftKey: o.shiftKey
        });
      }
      onTouchStart_(o) {
        o.preventDefault();
        const p = o.targetTouches.item(0), f = this.elem_.getBoundingClientRect();
        this.emitter.emit("down", {
          altKey: o.altKey,
          data: this.computePosition_(p ? {
            x: p.clientX - f.left,
            y: p.clientY - f.top
          } : void 0),
          sender: this,
          shiftKey: o.shiftKey
        }), this.lastTouch_ = p;
      }
      onTouchMove_(o) {
        const p = o.targetTouches.item(0), f = this.elem_.getBoundingClientRect();
        this.emitter.emit("move", {
          altKey: o.altKey,
          data: this.computePosition_(p ? {
            x: p.clientX - f.left,
            y: p.clientY - f.top
          } : void 0),
          sender: this,
          shiftKey: o.shiftKey
        }), this.lastTouch_ = p;
      }
      onTouchEnd_(o) {
        var p;
        const f = (p = o.targetTouches.item(0)) !== null && p !== void 0 ? p : this.lastTouch_, x = this.elem_.getBoundingClientRect();
        this.emitter.emit("up", {
          altKey: o.altKey,
          data: this.computePosition_(f ? {
            x: f.clientX - x.left,
            y: f.clientY - x.top
          } : void 0),
          sender: this,
          shiftKey: o.shiftKey
        });
      }
    }
    function we(d, o, p, f, x) {
      const T = (d - o) / (p - o);
      return f + T * (x - f);
    }
    function Vt(d) {
      return String(d.toFixed(10)).split(".")[1].replace(/0+$/, "").length;
    }
    function at(d, o, p) {
      return Math.min(Math.max(d, o), p);
    }
    const Xe = y("txt");
    class Yn {
      constructor(o, p) {
        this.onChange_ = this.onChange_.bind(this), this.props_ = p.props, this.props_.emitter.on("change", this.onChange_), this.element = o.createElement("div"), this.element.classList.add(Xe(), Xe(void 0, "num")), p.arrayPosition && this.element.classList.add(Xe(void 0, p.arrayPosition)), p.viewProps.bindClassModifiers(this.element);
        const f = o.createElement("input");
        f.classList.add(Xe("i")), f.type = "text", p.viewProps.bindDisabled(f), this.element.appendChild(f), this.inputElement = f, this.onDraggingChange_ = this.onDraggingChange_.bind(this), this.dragging_ = p.dragging, this.dragging_.emitter.on("change", this.onDraggingChange_), this.element.classList.add(Xe()), this.inputElement.classList.add(Xe("i"));
        const x = o.createElement("div");
        x.classList.add(Xe("k")), this.element.appendChild(x), this.knobElement = x;
        const T = o.createElementNS(ye, "svg");
        T.classList.add(Xe("g")), this.knobElement.appendChild(T);
        const L = o.createElementNS(ye, "path");
        L.classList.add(Xe("gb")), T.appendChild(L), this.guideBodyElem_ = L;
        const z = o.createElementNS(ye, "path");
        z.classList.add(Xe("gh")), T.appendChild(z), this.guideHeadElem_ = z;
        const re = o.createElement("div");
        re.classList.add(y("tt")()), this.knobElement.appendChild(re), this.tooltipElem_ = re, p.value.emitter.on("change", this.onChange_), this.value = p.value, this.refresh();
      }
      onDraggingChange_(o) {
        if (o.rawValue === null) {
          this.element.classList.remove(Xe(void 0, "drg"));
          return;
        }
        this.element.classList.add(Xe(void 0, "drg"));
        const p = o.rawValue / this.props_.get("draggingScale"), f = p + (p > 0 ? -1 : p < 0 ? 1 : 0), x = at(-f, -4, 4);
        this.guideHeadElem_.setAttributeNS(null, "d", [`M ${f + x},0 L${f},4 L${f + x},8`, `M ${p},-1 L${p},9`].join(" ")), this.guideBodyElem_.setAttributeNS(null, "d", `M 0,4 L${p},4`);
        const T = this.props_.get("formatter");
        this.tooltipElem_.textContent = T(this.value.rawValue), this.tooltipElem_.style.left = `${p}px`;
      }
      refresh() {
        const o = this.props_.get("formatter");
        this.inputElement.value = o(this.value.rawValue);
      }
      onChange_() {
        this.refresh();
      }
    }
    class xi {
      constructor(o, p) {
        var f;
        this.originRawValue_ = 0, this.onInputChange_ = this.onInputChange_.bind(this), this.onInputKeyDown_ = this.onInputKeyDown_.bind(this), this.onInputKeyUp_ = this.onInputKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.baseStep_ = p.baseStep, this.parser_ = p.parser, this.props = p.props, this.sliderProps_ = (f = p.sliderProps) !== null && f !== void 0 ? f : null, this.value = p.value, this.viewProps = p.viewProps, this.dragging_ = H(null), this.view = new Yn(o, {
          arrayPosition: p.arrayPosition,
          dragging: this.dragging_,
          props: this.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_), this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_), this.view.inputElement.addEventListener("keyup", this.onInputKeyUp_);
        const x = new Ct2(this.view.knobElement);
        x.emitter.on("down", this.onPointerDown_), x.emitter.on("move", this.onPointerMove_), x.emitter.on("up", this.onPointerUp_);
      }
      constrainValue_(o) {
        var p, f;
        const x = (p = this.sliderProps_) === null || p === void 0 ? void 0 : p.get("minValue"), T = (f = this.sliderProps_) === null || f === void 0 ? void 0 : f.get("maxValue");
        let L = o;
        return x !== void 0 && (L = Math.max(L, x)), T !== void 0 && (L = Math.min(L, T)), L;
      }
      onInputChange_(o) {
        const f = o.currentTarget.value, x = this.parser_(f);
        h(x) || (this.value.rawValue = this.constrainValue_(x)), this.view.refresh();
      }
      onInputKeyDown_(o) {
        const p = Kt(this.baseStep_, dn(o));
        p !== 0 && this.value.setRawValue(this.constrainValue_(this.value.rawValue + p), {
          forceEmit: false,
          last: false
        });
      }
      onInputKeyUp_(o) {
        Kt(this.baseStep_, dn(o)) !== 0 && this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
      onPointerDown_() {
        this.originRawValue_ = this.value.rawValue, this.dragging_.rawValue = 0;
      }
      computeDraggingValue_(o) {
        if (!o.point)
          return null;
        const p = o.point.x - o.bounds.width / 2;
        return this.constrainValue_(this.originRawValue_ + p * this.props.get("draggingScale"));
      }
      onPointerMove_(o) {
        const p = this.computeDraggingValue_(o.data);
        p !== null && (this.value.setRawValue(p, {
          forceEmit: false,
          last: false
        }), this.dragging_.rawValue = this.value.rawValue - this.originRawValue_);
      }
      onPointerUp_(o) {
        const p = this.computeDraggingValue_(o.data);
        p !== null && (this.value.setRawValue(p, {
          forceEmit: true,
          last: true
        }), this.dragging_.rawValue = null);
      }
    }
    function Ei(d, o) {
      d.write(o);
    }
    function mn(d) {
      const o = d ? Et(d, A) : null;
      return o ? o.step : null;
    }
    function ls(d, o) {
      const p = d && Et(d, A);
      return p ? Vt(p.step) : Math.max(Vt(o), 2);
    }
    function cs(d) {
      const o = mn(d);
      return o ?? 1;
    }
    function ps(d, o) {
      var p;
      const f = d && Et(d, A), x = Math.abs((p = f == null ? void 0 : f.step) !== null && p !== void 0 ? p : o);
      return x === 0 ? 0.1 : Math.pow(10, Math.floor(Math.log10(x)) - 1);
    }
    function fn(d) {
      return [d[0], d[1], d[2]];
    }
    function us(d) {
      const o = at(Math.floor(d), 0, 255).toString(16);
      return o.length === 1 ? `0${o}` : o;
    }
    function qn(d, o = "#") {
      const p = fn(d.getComponents("rgb")).map(us).join("");
      return `${o}${p}`;
    }
    function or(d, o = "#") {
      const p = d.getComponents("rgb"), f = [p[0], p[1], p[2], p[3] * 255].map(us).join("");
      return `${o}${f}`;
    }
    function hs(d, o) {
      const p = Ie(o === "float" ? 2 : 0);
      return `rgb(${fn(d.getComponents("rgb", o)).map((x) => p(x)).join(", ")})`;
    }
    function ds(d) {
      return (o) => hs(o, d);
    }
    function ar(d, o) {
      const p = Ie(2), f = Ie(o === "float" ? 2 : 0);
      return `rgba(${d.getComponents("rgb", o).map((T, L) => (L === 3 ? p : f)(T)).join(", ")})`;
    }
    function lr(d) {
      return (o) => ar(o, d);
    }
    function cr(d) {
      const o = [
        Ie(0),
        Xn,
        Xn
      ];
      return `hsl(${fn(d.getComponents("hsl")).map((f, x) => o[x](f)).join(", ")})`;
    }
    function pr(d) {
      const o = [
        Ie(0),
        Xn,
        Xn,
        Ie(2)
      ];
      return `hsla(${d.getComponents("hsl").map((f, x) => o[x](f)).join(", ")})`;
    }
    function ur(d, o) {
      const p = Ie(o === "float" ? 2 : 0), f = ["r", "g", "b"];
      return `{${fn(d.getComponents("rgb", o)).map((T, L) => `${f[L]}: ${p(T)}`).join(", ")}}`;
    }
    function Ci(d) {
      return (o) => ur(o, d);
    }
    function vn(d, o) {
      const p = Ie(2), f = Ie(o === "float" ? 2 : 0), x = ["r", "g", "b", "a"];
      return `{${d.getComponents("rgb", o).map((L, z) => {
        const re = z === 3 ? p : f;
        return `${x[z]}: ${re(L)}`;
      }).join(", ")}}`;
    }
    function hr(d) {
      return (o) => vn(o, d);
    }
    [
      ...["int", "float"].reduce((d, o) => [
        ...d,
        {
          format: {
            alpha: false,
            mode: "rgb",
            notation: "func",
            type: o
          },
          stringifier: ds(o)
        },
        {
          format: {
            alpha: true,
            mode: "rgb",
            notation: "func",
            type: o
          },
          stringifier: lr(o)
        },
        {
          format: {
            alpha: false,
            mode: "rgb",
            notation: "object",
            type: o
          },
          stringifier: Ci(o)
        },
        {
          format: {
            alpha: true,
            mode: "rgb",
            notation: "object",
            type: o
          },
          stringifier: hr(o)
        }
      ], [])
    ];
    class bn {
      constructor(o) {
        this.components = o.components, this.asm_ = o.assembly;
      }
      constrain(o) {
        const p = this.asm_.toComponents(o).map((f, x) => {
          var T, L;
          return (L = (T = this.components[x]) === null || T === void 0 ? void 0 : T.constrain(f)) !== null && L !== void 0 ? L : f;
        });
        return this.asm_.fromComponents(p);
      }
    }
    const ms = y("pndtxt");
    class Pi {
      constructor(o, p) {
        this.textViews = p.textViews, this.element = o.createElement("div"), this.element.classList.add(ms()), this.textViews.forEach((f) => {
          const x = o.createElement("div");
          x.classList.add(ms("a")), x.appendChild(f.element), this.element.appendChild(x);
        });
      }
    }
    function fs(d, o, p) {
      return new xi(d, {
        arrayPosition: p === 0 ? "fst" : p === o.axes.length - 1 ? "lst" : "mid",
        baseStep: o.axes[p].baseStep,
        parser: o.parser,
        props: o.axes[p].textProps,
        value: H(0, {
          constraint: o.axes[p].constraint
        }),
        viewProps: o.viewProps
      });
    }
    class Ti {
      constructor(o, p) {
        this.value = p.value, this.viewProps = p.viewProps, this.acs_ = p.axes.map((f, x) => fs(o, p, x)), this.acs_.forEach((f, x) => {
          Ht({
            primary: this.value,
            secondary: f.value,
            forward: (T) => p.assembly.toComponents(T.rawValue)[x],
            backward: (T, L) => {
              const z = p.assembly.toComponents(T.rawValue);
              return z[x] = L.rawValue, p.assembly.fromComponents(z);
            }
          });
        }), this.view = new Pi(o, {
          textViews: this.acs_.map((f) => f.view)
        });
      }
    }
    function dr(d, o) {
      return "step" in d && !h(d.step) ? new A(d.step, o) : null;
    }
    function mr(d) {
      return !h(d.max) && !h(d.min) ? new vt({
        max: d.max,
        min: d.min
      }) : !h(d.max) || !h(d.min) ? new Rt({
        max: d.max,
        min: d.min
      }) : null;
    }
    const fr = {
      monitor: {
        defaultInterval: 200,
        defaultLineCount: 3
      }
    }, Pt = y("grl");
    class vr {
      constructor(o, p) {
        this.onCursorChange_ = this.onCursorChange_.bind(this), this.onValueUpdate_ = this.onValueUpdate_.bind(this), this.element = o.createElement("div"), this.element.classList.add(Pt()), p.viewProps.bindClassModifiers(this.element), this.formatter_ = p.formatter, this.props_ = p.props, this.cursor_ = p.cursor, this.cursor_.emitter.on("change", this.onCursorChange_);
        const f = o.createElementNS(ye, "svg");
        f.classList.add(Pt("g")), f.style.height = `calc(var(--bld-us) * ${p.lineCount})`, this.element.appendChild(f), this.svgElem_ = f;
        const x = o.createElementNS(ye, "polyline");
        this.svgElem_.appendChild(x), this.lineElem_ = x;
        const T = o.createElement("div");
        T.classList.add(Pt("t"), y("tt")()), this.element.appendChild(T), this.tooltipElem_ = T, p.value.emitter.on("change", this.onValueUpdate_), this.value = p.value, this.update_();
      }
      get graphElement() {
        return this.svgElem_;
      }
      update_() {
        const o = this.svgElem_.getBoundingClientRect(), p = this.value.rawValue.length - 1, f = this.props_.get("minValue"), x = this.props_.get("maxValue"), T = [];
        this.value.rawValue.forEach((Fe, Oi) => {
          if (Fe === void 0)
            return;
          const Lr = we(Oi, 0, p, 0, o.width), Ni = we(Fe, f, x, o.height, 0);
          T.push([Lr, Ni].join(","));
        }), this.lineElem_.setAttributeNS(null, "points", T.join(" "));
        const L = this.tooltipElem_, z = this.value.rawValue[this.cursor_.rawValue];
        if (z === void 0) {
          L.classList.remove(Pt("t", "a"));
          return;
        }
        const re = we(this.cursor_.rawValue, 0, p, 0, o.width), W = we(z, f, x, o.height, 0);
        L.style.left = `${re}px`, L.style.top = `${W}px`, L.textContent = `${this.formatter_(z)}`, L.classList.contains(Pt("t", "a")) || (L.classList.add(Pt("t", "a"), Pt("t", "in")), st(L), L.classList.remove(Pt("t", "in")));
      }
      onValueUpdate_() {
        this.update_();
      }
      onCursorChange_() {
        this.update_();
      }
    }
    class br {
      constructor(o, p) {
        if (this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this), this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this), this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this), this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this), this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this), this.props_ = p.props, this.value = p.value, this.viewProps = p.viewProps, this.cursor_ = H(-1), this.view = new vr(o, {
          cursor: this.cursor_,
          formatter: p.formatter,
          lineCount: p.lineCount,
          props: this.props_,
          value: this.value,
          viewProps: this.viewProps
        }), !Qe(o))
          this.view.element.addEventListener("mousemove", this.onGraphMouseMove_), this.view.element.addEventListener("mouseleave", this.onGraphMouseLeave_);
        else {
          const f = new Ct2(this.view.element);
          f.emitter.on("down", this.onGraphPointerDown_), f.emitter.on("move", this.onGraphPointerMove_), f.emitter.on("up", this.onGraphPointerUp_);
        }
      }
      onGraphMouseLeave_() {
        this.cursor_.rawValue = -1;
      }
      onGraphMouseMove_(o) {
        const p = this.view.element.getBoundingClientRect();
        this.cursor_.rawValue = Math.floor(we(o.offsetX, 0, p.width, 0, this.value.rawValue.length));
      }
      onGraphPointerDown_(o) {
        this.onGraphPointerMove_(o);
      }
      onGraphPointerMove_(o) {
        if (!o.data.point) {
          this.cursor_.rawValue = -1;
          return;
        }
        this.cursor_.rawValue = Math.floor(we(o.data.point.x, 0, o.data.bounds.width, 0, this.value.rawValue.length));
      }
      onGraphPointerUp_() {
        this.cursor_.rawValue = -1;
      }
    }
    class vs {
      constructor(o) {
        this.controller_ = o;
      }
      get disabled() {
        return this.controller_.viewProps.get("disabled");
      }
      set disabled(o) {
        this.controller_.viewProps.set("disabled", o);
      }
      get title() {
        var o;
        return (o = this.controller_.props.get("title")) !== null && o !== void 0 ? o : "";
      }
      set title(o) {
        this.controller_.props.set("title", o);
      }
      on(o, p) {
        const f = p.bind(this);
        return this.controller_.emitter.on(o, () => {
          f(new a(this));
        }), this;
      }
    }
    class gr extends a {
      constructor(o, p, f) {
        super(o), this.cell = p, this.index = f;
      }
    }
    class bs extends s {
      constructor(o) {
        super(o), this.cellToApiMap_ = /* @__PURE__ */ new Map(), this.emitter_ = new w();
        const p = this.controller_.valueController;
        p.cellControllers.forEach((f, x) => {
          const T = new vs(f);
          this.cellToApiMap_.set(f, T), f.emitter.on("click", () => {
            const L = x % p.size[0], z = Math.floor(x / p.size[0]);
            this.emitter_.emit("click", {
              event: new gr(this, T, [L, z])
            });
          });
        });
      }
      cell(o, p) {
        const f = this.controller_.valueController, x = f.cellControllers[p * f.size[0] + o];
        return this.cellToApiMap_.get(x);
      }
      on(o, p) {
        const f = p.bind(this);
        return this.emitter_.on(o, (x) => {
          f(x.event);
        }), this;
      }
    }
    class ki {
      constructor(o, p) {
        this.size = p.size;
        const [f, x] = this.size, T = [];
        for (let L = 0; L < x; L++)
          for (let z = 0; z < f; z++) {
            const re = new G(o, {
              props: K.fromObject(Object.assign({}, p.cellConfig(z, L))),
              viewProps: ge.create()
            });
            T.push(re);
          }
        this.cellCs_ = T, this.viewProps = ge.create(), this.viewProps.handleDispose(() => {
          this.cellCs_.forEach((L) => {
            L.viewProps.set("disposed", true);
          });
        }), this.view = new xt(o, {
          viewProps: this.viewProps,
          viewName: "btngrid"
        }), this.view.element.style.gridTemplateColumns = `repeat(${f}, 1fr)`, this.cellCs_.forEach((L) => {
          this.view.element.appendChild(L.view.element);
        });
      }
      get cellControllers() {
        return this.cellCs_;
      }
    }
    const _r = {
      id: "buttongrid",
      type: "blade",
      // TODO:
      css: '.tp-cbzgv,.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-radv_b:hover,.tp-rslv_k:hover,.tp-cbzv_b:hover{background-color:var(--btn-bg-h)}.tp-radv_b:focus,.tp-rslv_k:focus,.tp-cbzv_b:focus{background-color:var(--btn-bg-f)}.tp-radv_b:active,.tp-rslv_k:active,.tp-cbzv_b:active{background-color:var(--btn-bg-a)}.tp-radv_b:disabled,.tp-rslv_k:disabled,.tp-cbzv_b:disabled{opacity:.5}.tp-cbzgv{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-cbzgv:hover{background-color:var(--in-bg-h)}.tp-cbzgv:focus{background-color:var(--in-bg-f)}.tp-cbzgv:active{background-color:var(--in-bg-a)}.tp-cbzgv:disabled{opacity:.5}.tp-btngridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-btngridv.tp-v-disabled{opacity:.5}.tp-btngridv .tp-btnv_b:disabled{opacity:1}.tp-btngridv .tp-btnv_b:disabled .tp-btnv_t{opacity:.5}.tp-btngridv .tp-btnv_b{border-radius:0}.tp-cbzv{position:relative}.tp-cbzv_h{display:flex}.tp-cbzv_b{margin-right:4px;position:relative;width:var(--bld-us)}.tp-cbzv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-cbzv_b svg path{stroke:var(--bs-bg);stroke-width:2}.tp-cbzv_t{flex:1}.tp-cbzv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-cbzv.tp-cbzv-expanded .tp-cbzv_p{margin-top:var(--bld-s);opacity:1}.tp-cbzv.tp-cbzv-cpl .tp-cbzv_p{overflow:visible}.tp-cbzv .tp-popv{left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-cbzpv_t{margin-top:var(--bld-s)}.tp-cbzgv{height:auto;overflow:hidden;position:relative}.tp-cbzgv.tp-v-disabled{opacity:.5}.tp-cbzgv_p{left:16px;position:absolute;right:16px;top:0}.tp-cbzgv_g{cursor:pointer;display:block;height:calc(var(--bld-us)*5);width:100%}.tp-cbzgv_u{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_l{fill:rgba(0,0,0,0);stroke:var(--in-fg)}.tp-cbzgv_v{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_h{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;pointer-events:none;position:absolute;width:4px}.tp-cbzgv:focus .tp-cbzgv_h-sel{background-color:var(--in-fg);border-width:0}.tp-cbzprvv{cursor:pointer;height:4px;padding:4px 0;position:relative}.tp-cbzprvv_g{display:block;height:100%;overflow:visible;width:100%}.tp-cbzprvv_t{opacity:.5;stroke:var(--mo-fg)}.tp-cbzprvv_m{background-color:var(--mo-fg);border-radius:50%;height:4px;margin-left:-2px;margin-top:-2px;opacity:0;position:absolute;top:50%;transition:opacity .2s ease-out;width:4px}.tp-cbzprvv_m.tp-cbzprvv_m-a{opacity:1}.tp-fpsv{position:relative}.tp-fpsv_l{bottom:4px;color:var(--mo-fg);line-height:1;right:4px;pointer-events:none;position:absolute}.tp-fpsv_u{margin-left:.2em;opacity:.7}.tp-rslv{cursor:pointer;padding-left:8px;padding-right:8px}.tp-rslv.tp-v-disabled{opacity:.5}.tp-rslv_t{height:calc(var(--bld-us));position:relative}.tp-rslv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:-4px;right:-4px}.tp-rslv_b{bottom:0;top:0;position:absolute}.tp-rslv_b::before{background-color:var(--in-fg);content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:0;right:0}.tp-rslv_k{height:calc(var(--bld-us) - 8px);margin-top:calc((var(--bld-us) - 8px)/-2);position:absolute;top:50%;width:8px}.tp-rslv_k.tp-rslv_k-min{margin-left:-8px}.tp-rslv_k.tp-rslv_k-max{margin-left:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-min{border-bottom-right-radius:0;border-top-right-radius:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-max{border-bottom-left-radius:0;border-top-left-radius:0}.tp-rsltxtv{display:flex}.tp-rsltxtv_s{flex:1}.tp-rsltxtv_t{flex:1;margin-left:4px}.tp-radv_l{display:block;position:relative}.tp-radv_i{left:0;opacity:0;position:absolute;top:0}.tp-radv_b{opacity:.5}.tp-radv_i:hover+.tp-radv_b{background-color:var(--btn-bg-h)}.tp-radv_i:focus+.tp-radv_b{background-color:var(--btn-bg-f)}.tp-radv_i:active+.tp-radv_b{background-color:var(--btn-bg-a)}.tp-radv_i:checked+.tp-radv_b{opacity:1}.tp-radv_t{bottom:0;color:inherit;left:0;overflow:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0}.tp-radv_i:disabled+.tp-radv_b>.tp-radv_t{opacity:.5}.tp-radgridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-radgridv.tp-v-disabled{opacity:.5}.tp-radgridv .tp-radv_b{border-radius:0}',
      accept(d) {
        const o = de, p = te(d, {
          cells: o.required.function,
          size: o.required.array(o.required.number),
          view: o.required.constant("buttongrid"),
          label: o.optional.string
        });
        return p ? { params: p } : null;
      },
      controller(d) {
        return new rt(d.document, {
          blade: d.blade,
          props: K.fromObject({
            label: d.params.label
          }),
          valueController: new ki(d.document, {
            cellConfig: d.params.cells,
            size: d.params.size
          })
        });
      },
      api(d) {
        return !(d.controller instanceof rt) || !(d.controller.valueController instanceof ki) ? null : new bs(d.controller);
      }
    };
    class gs extends s {
      get label() {
        return this.controller_.props.get("label");
      }
      set label(o) {
        this.controller_.props.set("label", o);
      }
      get value() {
        return this.controller_.valueController.value.rawValue;
      }
      set value(o) {
        this.controller_.valueController.value.rawValue = o;
      }
      on(o, p) {
        const f = p.bind(this);
        return this.controller_.valueController.value.emitter.on(o, (x) => {
          f(new c(this, x.rawValue, void 0, x.options.last));
        }), this;
      }
    }
    function Ze(d, o, p) {
      return d * (1 - p) + o * p;
    }
    const wr = 20, _s = 1e-3, Mi = 100;
    function yr(d, o) {
      let p = 0.25, f = 0.5, x = -1;
      for (let T = 0; T < wr; T++) {
        const [L, z] = d.curve(f);
        if (f += p * (L < o ? 1 : -1), x = z, p *= 0.5, Math.abs(o - L) < _s)
          break;
      }
      return x;
    }
    class Tt {
      constructor(o = 0, p = 0, f = 1, x = 1) {
        this.cache_ = [], this.comps_ = [o, p, f, x];
      }
      get x1() {
        return this.comps_[0];
      }
      get y1() {
        return this.comps_[1];
      }
      get x2() {
        return this.comps_[2];
      }
      get y2() {
        return this.comps_[3];
      }
      static isObject(o) {
        return h(o) || !Array.isArray(o) ? false : typeof o[0] == "number" && typeof o[1] == "number" && typeof o[2] == "number" && typeof o[3] == "number";
      }
      static equals(o, p) {
        return o.x1 === p.x1 && o.y1 === p.y1 && o.x2 === p.x2 && o.y2 === p.y2;
      }
      curve(o) {
        const p = Ze(0, this.x1, o), f = Ze(0, this.y1, o), x = Ze(this.x1, this.x2, o), T = Ze(this.y1, this.y2, o), L = Ze(this.x2, 1, o), z = Ze(this.y2, 1, o), re = Ze(p, x, o), W = Ze(f, T, o), Fe = Ze(x, L, o), Oi = Ze(T, z, o);
        return [Ze(re, Fe, o), Ze(W, Oi, o)];
      }
      y(o) {
        if (this.cache_.length === 0) {
          const p = [];
          for (let f = 0; f < Mi; f++)
            p.push(yr(this, we(f, 0, Mi - 1, 0, 1)));
          this.cache_ = p;
        }
        return this.cache_[Math.round(we(at(o, 0, 1), 0, 1, 0, Mi - 1))];
      }
      toObject() {
        return [this.comps_[0], this.comps_[1], this.comps_[2], this.comps_[3]];
      }
    }
    const Qn = {
      toComponents: (d) => d.toObject(),
      fromComponents: (d) => new Tt(...d)
    };
    function xr(d) {
      const o = Ie(2);
      return `cubic-bezier(${d.toObject().map((f) => o(f)).join(", ")})`;
    }
    const lt = [0, 0.5, 0.5, 1];
    function ws(d) {
      const o = d.match(/^cubic-bezier\s*\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*\)$/);
      if (!o)
        return new Tt(...lt);
      const p = [o[1], o[2], o[3], o[4]].reduce((f, x) => {
        if (!f)
          return null;
        const T = Number(x);
        return isNaN(T) ? null : [...f, T];
      }, []);
      return new Tt(...p ?? lt);
    }
    const Dt = y("cbz");
    class Ve {
      constructor(o, p) {
        this.element = o.createElement("div"), this.element.classList.add(Dt()), p.viewProps.bindClassModifiers(this.element), p.foldable.bindExpandedClass(this.element, Dt(void 0, "expanded")), R(p.foldable, "completed", F(this.element, Dt(void 0, "cpl")));
        const f = o.createElement("div");
        f.classList.add(Dt("h")), this.element.appendChild(f);
        const x = o.createElement("button");
        x.classList.add(Dt("b")), p.viewProps.bindDisabled(x);
        const T = o.createElementNS(ye, "svg");
        T.innerHTML = '<path d="M2 13C8 13 8 3 14 3"/>', x.appendChild(T), f.appendChild(x), this.buttonElement = x;
        const L = o.createElement("div");
        if (L.classList.add(Dt("t")), f.appendChild(L), this.textElement = L, p.pickerLayout === "inline") {
          const z = o.createElement("div");
          z.classList.add(Dt("p")), this.element.appendChild(z), this.pickerElement = z;
        } else
          this.pickerElement = null;
      }
    }
    const Si = y("cbzp");
    class gn {
      constructor(o, p) {
        this.element = o.createElement("div"), this.element.classList.add(Si()), p.viewProps.bindClassModifiers(this.element);
        const f = o.createElement("div");
        f.classList.add(Si("g")), this.element.appendChild(f), this.graphElement = f;
        const x = o.createElement("div");
        x.classList.add(Si("t")), this.element.appendChild(x), this.textElement = x;
      }
    }
    function Ai(d, o) {
      const p = new MutationObserver((x) => {
        for (const T of x)
          T.type === "childList" && T.addedNodes.forEach((L) => {
            L.contains(L) && (o(), p.disconnect());
          });
      }), f = d.ownerDocument;
      p.observe(f.body, {
        attributes: true,
        childList: true,
        subtree: true
      });
    }
    const ct = y("cbzg");
    function ys(d, o) {
      return (p) => o(d(p));
    }
    class xs {
      constructor(o, p) {
        this.element = o.createElement("div"), this.element.classList.add(ct()), p.viewProps.bindClassModifiers(this.element), p.viewProps.bindTabIndex(this.element);
        const f = o.createElement("div");
        f.classList.add(ct("p")), this.element.appendChild(f), this.previewElement = f;
        const x = o.createElementNS(ye, "svg");
        x.classList.add(ct("g")), this.element.appendChild(x), this.svgElem_ = x;
        const T = o.createElementNS(ye, "path");
        T.classList.add(ct("u")), this.svgElem_.appendChild(T), this.guideElem_ = T;
        const L = o.createElementNS(ye, "polyline");
        L.classList.add(ct("l")), this.svgElem_.appendChild(L), this.lineElem_ = L, this.handleElems_ = [o.createElement("div"), o.createElement("div")], this.handleElems_.forEach((z) => {
          z.classList.add(ct("h")), this.element.appendChild(z);
        }), this.vectorElems_ = [
          o.createElementNS(ye, "line"),
          o.createElementNS(ye, "line")
        ], this.vectorElems_.forEach((z) => {
          z.classList.add(ct("v")), this.svgElem_.appendChild(z);
        }), this.value_ = p.value, this.value_.emitter.on("change", this.onValueChange_.bind(this)), this.sel_ = p.selection, this.handleElems_.forEach((z, re) => {
          S(this.sel_, ys((W) => W === re, F(z, ct("h", "sel"))));
        }), Ai(this.element, () => {
          this.refresh();
        });
      }
      getVertMargin_(o) {
        return o * 0.25;
      }
      valueToPosition(o, p) {
        const f = this.element.getBoundingClientRect(), x = f.width, T = f.height, L = this.getVertMargin_(T);
        return {
          x: we(o, 0, 1, 0, x),
          y: we(p, 0, 1, T - L, L)
        };
      }
      positionToValue(o, p) {
        const f = this.element.getBoundingClientRect(), x = f.width, T = f.height, L = this.getVertMargin_(T);
        return {
          x: at(we(o, 0, x, 0, 1), 0, 1),
          y: we(p, T - L, L, 0, 1)
        };
      }
      refresh() {
        this.guideElem_.setAttributeNS(null, "d", [0, 1].map((T) => {
          const L = this.valueToPosition(0, T), z = this.valueToPosition(1, T);
          return [`M ${L.x},${L.y}`, `L ${z.x},${z.y}`].join(" ");
        }).join(" "));
        const o = this.value_.rawValue, p = [];
        let f = 0;
        for (; ; ) {
          const T = this.valueToPosition(...o.curve(f));
          if (p.push([T.x, T.y].join(",")), f >= 1)
            break;
          f = Math.min(f + 0.05, 1);
        }
        this.lineElem_.setAttributeNS(null, "points", p.join(" "));
        const x = o.toObject();
        [0, 1].forEach((T) => {
          const L = this.valueToPosition(T, T), z = this.valueToPosition(x[T * 2], x[T * 2 + 1]), re = this.vectorElems_[T];
          re.setAttributeNS(null, "x1", String(L.x)), re.setAttributeNS(null, "y1", String(L.y)), re.setAttributeNS(null, "x2", String(z.x)), re.setAttributeNS(null, "y2", String(z.y));
          const W = this.handleElems_[T];
          W.style.left = `${z.x}px`, W.style.top = `${z.y}px`;
        });
      }
      onValueChange_() {
        this.refresh();
      }
    }
    const Es = 24, Cs = 400, $t = 1e3, Le = y("cbzprv");
    class Xt {
      constructor(o, p) {
        this.stopped_ = true, this.startTime_ = -1, this.onDispose_ = this.onDispose_.bind(this), this.onTimer_ = this.onTimer_.bind(this), this.onValueChange_ = this.onValueChange_.bind(this), this.element = o.createElement("div"), this.element.classList.add(Le()), p.viewProps.bindClassModifiers(this.element);
        const f = o.createElementNS(ye, "svg");
        f.classList.add(Le("g")), this.element.appendChild(f), this.svgElem_ = f;
        const x = o.createElementNS(ye, "path");
        x.classList.add(Le("t")), this.svgElem_.appendChild(x), this.ticksElem_ = x;
        const T = o.createElement("div");
        T.classList.add(Le("m")), this.element.appendChild(T), this.markerElem_ = T, this.value_ = p.value, this.value_.emitter.on("change", this.onValueChange_), p.viewProps.handleDispose(this.onDispose_), Ai(this.element, () => {
          this.refresh();
        });
      }
      play() {
        this.stop(), this.updateMarker_(0), this.markerElem_.classList.add(Le("m", "a")), this.startTime_ = new Date().getTime() + Cs, this.stopped_ = false, requestAnimationFrame(this.onTimer_);
      }
      stop() {
        this.stopped_ = true, this.markerElem_.classList.remove(Le("m", "a"));
      }
      onDispose_() {
        this.stop();
      }
      updateMarker_(o) {
        const p = this.value_.rawValue.y(at(o, 0, 1));
        this.markerElem_.style.left = `${p * 100}%`;
      }
      refresh() {
        const o = this.svgElem_.getBoundingClientRect(), p = o.width, f = o.height, x = [], T = this.value_.rawValue;
        for (let L = 0; L < Es; L++) {
          const z = we(L, 0, Es - 1, 0, 1), re = we(T.y(z), 0, 1, 0, p);
          x.push(`M ${re},0 v${f}`);
        }
        this.ticksElem_.setAttributeNS(null, "d", x.join(" "));
      }
      onTimer_() {
        if (this.startTime_ === null)
          return;
        const o = new Date().getTime() - this.startTime_, p = o / $t;
        this.updateMarker_(p), o > $t + Cs && this.stop(), this.stopped_ || requestAnimationFrame(this.onTimer_);
      }
      onValueChange_() {
        this.refresh(), this.play();
      }
    }
    function nt(d, o, p, f) {
      const x = p - d, T = f - o;
      return Math.sqrt(x * x + T * T);
    }
    function Er(d, o, p, f) {
      const x = nt(d, o, p, f), T = Math.atan2(f - o, p - d), L = Math.round(T / (Math.PI / 4)) * Math.PI / 4;
      return {
        x: d + Math.cos(L) * x,
        y: o + Math.sin(L) * x
      };
    }
    class Li {
      constructor(o, p) {
        this.onKeyDown_ = this.onKeyDown_.bind(this), this.onKeyUp_ = this.onKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.baseStep_ = p.baseStep, this.value = p.value, this.sel_ = H(0), this.viewProps = p.viewProps, this.view = new xs(o, {
          selection: this.sel_,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.element.addEventListener("keydown", this.onKeyDown_), this.view.element.addEventListener("keyup", this.onKeyUp_), this.prevView_ = new Xt(o, {
          value: this.value,
          viewProps: this.viewProps
        }), this.prevView_.element.addEventListener("mousedown", (x) => {
          x.stopImmediatePropagation(), x.preventDefault(), this.prevView_.play();
        }), this.view.previewElement.appendChild(this.prevView_.element);
        const f = new Ct2(this.view.element);
        f.emitter.on("down", this.onPointerDown_), f.emitter.on("move", this.onPointerMove_), f.emitter.on("up", this.onPointerUp_);
      }
      refresh() {
        this.view.refresh(), this.prevView_.refresh(), this.prevView_.play();
      }
      updateValue_(o, p, f) {
        const x = this.sel_.rawValue, T = this.value.rawValue.toObject(), L = this.view.positionToValue(o.x, o.y), z = p ? Er(x, x, L.x, L.y) : L;
        T[x * 2] = z.x, T[x * 2 + 1] = z.y, this.value.setRawValue(new Tt(...T), f);
      }
      onPointerDown_(o) {
        const p = o.data;
        if (!p.point)
          return;
        const f = this.value.rawValue, x = this.view.valueToPosition(f.x1, f.y1), T = nt(p.point.x, p.point.y, x.x, x.y), L = this.view.valueToPosition(f.x2, f.y2), z = nt(p.point.x, p.point.y, L.x, L.y);
        this.sel_.rawValue = T <= z ? 0 : 1, this.updateValue_(p.point, o.shiftKey, {
          forceEmit: false,
          last: false
        });
      }
      onPointerMove_(o) {
        const p = o.data;
        p.point && this.updateValue_(p.point, o.shiftKey, {
          forceEmit: false,
          last: false
        });
      }
      onPointerUp_(o) {
        const p = o.data;
        p.point && this.updateValue_(p.point, o.shiftKey, {
          forceEmit: true,
          last: true
        });
      }
      onKeyDown_(o) {
        as(o.key) && o.preventDefault();
        const p = this.sel_.rawValue, f = this.value.rawValue.toObject();
        f[p * 2] += Kt(this.baseStep_, wi(o)), f[p * 2 + 1] += Kt(this.baseStep_, dn(o)), this.value.setRawValue(new Tt(...f), {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(o) {
        as(o.key) && o.preventDefault();
        const p = Kt(this.baseStep_, wi(o)), f = Kt(this.baseStep_, dn(o));
        p === 0 && f === 0 || this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    class Zn {
      constructor(o, p) {
        this.value = p.value, this.viewProps = p.viewProps, this.view = new gn(o, {
          viewProps: this.viewProps
        }), this.gc_ = new Li(o, {
          baseStep: p.axis.baseStep,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.graphElement.appendChild(this.gc_.view.element);
        const f = Object.assign(Object.assign({}, p.axis), { constraint: new Rt({ max: 1, min: 0 }) }), x = Object.assign(Object.assign({}, p.axis), { constraint: void 0 });
        this.tc_ = new Ti(o, {
          assembly: Qn,
          axes: [f, x, f, x],
          parser: hn,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.textElement.appendChild(this.tc_.view.element);
      }
      get allFocusableElements() {
        return [
          this.gc_.view.element,
          ...this.tc_.view.textViews.map((o) => o.inputElement)
        ];
      }
      refresh() {
        this.gc_.refresh();
      }
    }
    class bt {
      constructor(o, p) {
        this.onButtonBlur_ = this.onButtonBlur_.bind(this), this.onButtonClick_ = this.onButtonClick_.bind(this), this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this), this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this), this.value = p.value, this.viewProps = p.viewProps, this.foldable_ = jn(p.expanded), this.view = new Ve(o, {
          foldable: this.foldable_,
          pickerLayout: p.pickerLayout,
          viewProps: this.viewProps
        }), this.view.buttonElement.addEventListener("blur", this.onButtonBlur_), this.view.buttonElement.addEventListener("click", this.onButtonClick_), this.tc_ = new Ut(o, {
          parser: ws,
          props: K.fromObject({
            formatter: xr
          }),
          value: this.value,
          viewProps: this.viewProps
        }), this.view.textElement.appendChild(this.tc_.view.element), this.popC_ = p.pickerLayout === "popup" ? new se(o, {
          viewProps: this.viewProps
        }) : null;
        const f = new Zn(o, {
          axis: p.axis,
          value: this.value,
          viewProps: this.viewProps
        });
        f.allFocusableElements.forEach((x) => {
          x.addEventListener("blur", this.onPopupChildBlur_), x.addEventListener("keydown", this.onPopupChildKeydown_);
        }), this.pickerC_ = f, this.popC_ ? (this.view.element.appendChild(this.popC_.view.element), this.popC_.view.element.appendChild(this.pickerC_.view.element), S(this.popC_.shows, (x) => {
          x && f.refresh();
        }), Ht({
          primary: this.foldable_.value("expanded"),
          secondary: this.popC_.shows,
          forward: (x) => x.rawValue,
          backward: (x, T) => T.rawValue
        })) : this.view.pickerElement && (this.view.pickerElement.appendChild(this.pickerC_.view.element), Un(this.foldable_, this.view.pickerElement));
      }
      onButtonBlur_(o) {
        if (!this.popC_)
          return;
        const p = o.relatedTarget;
        (!p || !this.popC_.view.element.contains(p)) && (this.popC_.shows.rawValue = false);
      }
      onButtonClick_() {
        this.foldable_.set("expanded", !this.foldable_.get("expanded")), this.foldable_.get("expanded") && this.pickerC_.allFocusableElements[0].focus();
      }
      onPopupChildBlur_(o) {
        if (!this.popC_)
          return;
        const p = this.popC_.view.element, f = on(o);
        f && p.contains(f) || f && f === this.view.buttonElement && !Qe(p.ownerDocument) || (this.popC_.shows.rawValue = false);
      }
      onPopupChildKeydown_(o) {
        this.popC_ && o.key === "Escape" && (this.popC_.shows.rawValue = false);
      }
    }
    function Ee() {
      return new bn({
        assembly: Qn,
        components: [0, 1, 2, 3].map((d) => d % 2 === 0 ? new Rt({
          min: 0,
          max: 1
        }) : void 0)
      });
    }
    const Ps = {
      id: "cubic-bezier",
      type: "blade",
      css: '.tp-cbzgv,.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-radv_b:hover,.tp-rslv_k:hover,.tp-cbzv_b:hover{background-color:var(--btn-bg-h)}.tp-radv_b:focus,.tp-rslv_k:focus,.tp-cbzv_b:focus{background-color:var(--btn-bg-f)}.tp-radv_b:active,.tp-rslv_k:active,.tp-cbzv_b:active{background-color:var(--btn-bg-a)}.tp-radv_b:disabled,.tp-rslv_k:disabled,.tp-cbzv_b:disabled{opacity:.5}.tp-cbzgv{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-cbzgv:hover{background-color:var(--in-bg-h)}.tp-cbzgv:focus{background-color:var(--in-bg-f)}.tp-cbzgv:active{background-color:var(--in-bg-a)}.tp-cbzgv:disabled{opacity:.5}.tp-btngridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-btngridv.tp-v-disabled{opacity:.5}.tp-btngridv .tp-btnv_b:disabled{opacity:1}.tp-btngridv .tp-btnv_b:disabled .tp-btnv_t{opacity:.5}.tp-btngridv .tp-btnv_b{border-radius:0}.tp-cbzv{position:relative}.tp-cbzv_h{display:flex}.tp-cbzv_b{margin-right:4px;position:relative;width:var(--bld-us)}.tp-cbzv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-cbzv_b svg path{stroke:var(--bs-bg);stroke-width:2}.tp-cbzv_t{flex:1}.tp-cbzv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-cbzv.tp-cbzv-expanded .tp-cbzv_p{margin-top:var(--bld-s);opacity:1}.tp-cbzv.tp-cbzv-cpl .tp-cbzv_p{overflow:visible}.tp-cbzv .tp-popv{left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-cbzpv_t{margin-top:var(--bld-s)}.tp-cbzgv{height:auto;overflow:hidden;position:relative}.tp-cbzgv.tp-v-disabled{opacity:.5}.tp-cbzgv_p{left:16px;position:absolute;right:16px;top:0}.tp-cbzgv_g{cursor:pointer;display:block;height:calc(var(--bld-us)*5);width:100%}.tp-cbzgv_u{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_l{fill:rgba(0,0,0,0);stroke:var(--in-fg)}.tp-cbzgv_v{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_h{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;pointer-events:none;position:absolute;width:4px}.tp-cbzgv:focus .tp-cbzgv_h-sel{background-color:var(--in-fg);border-width:0}.tp-cbzprvv{cursor:pointer;height:4px;padding:4px 0;position:relative}.tp-cbzprvv_g{display:block;height:100%;overflow:visible;width:100%}.tp-cbzprvv_t{opacity:.5;stroke:var(--mo-fg)}.tp-cbzprvv_m{background-color:var(--mo-fg);border-radius:50%;height:4px;margin-left:-2px;margin-top:-2px;opacity:0;position:absolute;top:50%;transition:opacity .2s ease-out;width:4px}.tp-cbzprvv_m.tp-cbzprvv_m-a{opacity:1}.tp-fpsv{position:relative}.tp-fpsv_l{bottom:4px;color:var(--mo-fg);line-height:1;right:4px;pointer-events:none;position:absolute}.tp-fpsv_u{margin-left:.2em;opacity:.7}.tp-rslv{cursor:pointer;padding-left:8px;padding-right:8px}.tp-rslv.tp-v-disabled{opacity:.5}.tp-rslv_t{height:calc(var(--bld-us));position:relative}.tp-rslv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:-4px;right:-4px}.tp-rslv_b{bottom:0;top:0;position:absolute}.tp-rslv_b::before{background-color:var(--in-fg);content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:0;right:0}.tp-rslv_k{height:calc(var(--bld-us) - 8px);margin-top:calc((var(--bld-us) - 8px)/-2);position:absolute;top:50%;width:8px}.tp-rslv_k.tp-rslv_k-min{margin-left:-8px}.tp-rslv_k.tp-rslv_k-max{margin-left:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-min{border-bottom-right-radius:0;border-top-right-radius:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-max{border-bottom-left-radius:0;border-top-left-radius:0}.tp-rsltxtv{display:flex}.tp-rsltxtv_s{flex:1}.tp-rsltxtv_t{flex:1;margin-left:4px}.tp-radv_l{display:block;position:relative}.tp-radv_i{left:0;opacity:0;position:absolute;top:0}.tp-radv_b{opacity:.5}.tp-radv_i:hover+.tp-radv_b{background-color:var(--btn-bg-h)}.tp-radv_i:focus+.tp-radv_b{background-color:var(--btn-bg-f)}.tp-radv_i:active+.tp-radv_b{background-color:var(--btn-bg-a)}.tp-radv_i:checked+.tp-radv_b{opacity:1}.tp-radv_t{bottom:0;color:inherit;left:0;overflow:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0}.tp-radv_i:disabled+.tp-radv_b>.tp-radv_t{opacity:.5}.tp-radgridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-radgridv.tp-v-disabled{opacity:.5}.tp-radgridv .tp-radv_b{border-radius:0}',
      accept(d) {
        const o = de, p = te(d, {
          value: o.required.array(o.required.number),
          view: o.required.constant("cubicbezier"),
          expanded: o.optional.boolean,
          label: o.optional.string,
          picker: o.optional.custom((f) => f === "inline" || f === "popup" ? f : void 0)
        });
        return p ? { params: p } : null;
      },
      controller(d) {
        var o, p;
        const f = new Tt(...d.params.value), x = H(f, {
          constraint: Ee(),
          equals: Tt.equals
        }), T = new bt(d.document, {
          axis: {
            baseStep: 0.1,
            textProps: K.fromObject({
              draggingScale: 0.01,
              formatter: Ie(2)
            })
          },
          expanded: (o = d.params.expanded) !== null && o !== void 0 ? o : false,
          pickerLayout: (p = d.params.picker) !== null && p !== void 0 ? p : "popup",
          value: x,
          viewProps: d.viewProps
        });
        return new Lt(d.document, {
          blade: d.blade,
          props: K.fromObject({
            label: d.params.label
          }),
          valueController: T
        });
      },
      api(d) {
        return !(d.controller instanceof Lt) || !(d.controller.valueController instanceof bt) ? null : new gs(d.controller);
      }
    };
    class Ae extends s {
      begin() {
        this.controller_.valueController.begin();
      }
      end() {
        this.controller_.valueController.end();
      }
    }
    const Ri = 20;
    class Ye {
      constructor() {
        this.start_ = null, this.duration_ = 0, this.fps_ = null, this.frameCount_ = 0, this.timestamps_ = [];
      }
      get duration() {
        return this.duration_;
      }
      get fps() {
        return this.fps_;
      }
      begin(o) {
        this.start_ = o.getTime();
      }
      calculateFps_(o) {
        if (this.timestamps_.length === 0)
          return null;
        const p = this.timestamps_[0];
        return 1e3 * (this.frameCount_ - p.frameCount) / (o - p.time);
      }
      compactTimestamps_() {
        if (this.timestamps_.length <= Ri)
          return;
        const o = this.timestamps_.length - Ri;
        this.timestamps_.splice(0, o);
        const p = this.timestamps_[0].frameCount;
        this.timestamps_.forEach((f) => {
          f.frameCount -= p;
        }), this.frameCount_ -= p;
      }
      end(o) {
        if (this.start_ === null)
          return;
        const p = o.getTime();
        this.duration_ = p - this.start_, this.start_ = null, this.fps_ = this.calculateFps_(p), this.timestamps_.push({
          frameCount: this.frameCount_,
          time: p
        }), ++this.frameCount_, this.compactTimestamps_();
      }
    }
    const _n = y("fps");
    class Yt {
      constructor(o, p) {
        this.element = o.createElement("div"), this.element.classList.add(_n()), p.viewProps.bindClassModifiers(this.element), this.graphElement = o.createElement("div"), this.graphElement.classList.add(_n("g")), this.element.appendChild(this.graphElement);
        const f = o.createElement("div");
        f.classList.add(_n("l")), this.element.appendChild(f);
        const x = o.createElement("span");
        x.classList.add(_n("v")), x.textContent = "--", f.appendChild(x), this.valueElement = x;
        const T = o.createElement("span");
        T.classList.add(_n("u")), T.textContent = "FPS", f.appendChild(T);
      }
    }
    class wn {
      constructor(o, p) {
        this.stopwatch_ = new Ye(), this.onTick_ = this.onTick_.bind(this), this.ticker_ = p.ticker, this.ticker_.emitter.on("tick", this.onTick_), this.value_ = p.value, this.viewProps = p.viewProps, this.view = new Yt(o, {
          viewProps: this.viewProps
        }), this.graphC_ = new br(o, {
          formatter: Ie(0),
          lineCount: p.lineCount,
          props: K.fromObject({
            maxValue: p.maxValue,
            minValue: p.minValue
          }),
          value: this.value_,
          viewProps: this.viewProps
        }), this.view.graphElement.appendChild(this.graphC_.view.element), this.viewProps.handleDispose(() => {
          this.graphC_.viewProps.set("disposed", true), this.ticker_.dispose();
        });
      }
      begin() {
        this.stopwatch_.begin(new Date());
      }
      end() {
        this.stopwatch_.end(new Date());
      }
      onTick_() {
        const o = this.stopwatch_.fps;
        if (o !== null) {
          const p = this.value_.rawValue;
          this.value_.rawValue = sr(p, o), this.view.valueElement.textContent = o.toFixed(0);
        }
      }
    }
    function Cr(d, o) {
      return o === 0 ? new Gn() : new ln(d, o ?? fr.monitor.defaultInterval);
    }
    const Pr = {
      id: "fpsgraph",
      type: "blade",
      accept(d) {
        const o = de, p = te(d, {
          view: o.required.constant("fpsgraph"),
          interval: o.optional.number,
          label: o.optional.string,
          lineCount: o.optional.number,
          max: o.optional.number,
          min: o.optional.number
        });
        return p ? { params: p } : null;
      },
      controller(d) {
        var o, p, f, x;
        const T = (o = d.params.interval) !== null && o !== void 0 ? o : 500;
        return new rt(d.document, {
          blade: d.blade,
          props: K.fromObject({
            label: d.params.label
          }),
          valueController: new wn(d.document, {
            lineCount: (p = d.params.lineCount) !== null && p !== void 0 ? p : 2,
            maxValue: (f = d.params.max) !== null && f !== void 0 ? f : 90,
            minValue: (x = d.params.min) !== null && x !== void 0 ? x : 0,
            ticker: Cr(d.document, T),
            value: rs(80),
            viewProps: d.viewProps
          })
        });
      },
      api(d) {
        return !(d.controller instanceof rt) || !(d.controller.valueController instanceof wn) ? null : new Ae(d.controller);
      }
    };
    class Be {
      constructor(o, p) {
        this.min = o, this.max = p;
      }
      static isObject(o) {
        if (typeof o != "object" || o === null)
          return false;
        const p = o.min, f = o.max;
        return !(typeof p != "number" || typeof f != "number");
      }
      static equals(o, p) {
        return o.min === p.min && o.max === p.max;
      }
      get length() {
        return this.max - this.min;
      }
      toObject() {
        return {
          min: this.min,
          max: this.max
        };
      }
    }
    const Ii = {
      fromComponents: (d) => new Be(d[0], d[1]),
      toComponents: (d) => [d.min, d.max]
    };
    class yn {
      constructor(o) {
        this.edge = o;
      }
      constrain(o) {
        var p, f, x, T, L, z, re, W;
        if (o.min <= o.max)
          return new Be((f = (p = this.edge) === null || p === void 0 ? void 0 : p.constrain(o.min)) !== null && f !== void 0 ? f : o.min, (T = (x = this.edge) === null || x === void 0 ? void 0 : x.constrain(o.max)) !== null && T !== void 0 ? T : o.max);
        const Fe = (o.min + o.max) / 2;
        return new Be((z = (L = this.edge) === null || L === void 0 ? void 0 : L.constrain(Fe)) !== null && z !== void 0 ? z : Fe, (W = (re = this.edge) === null || re === void 0 ? void 0 : re.constrain(Fe)) !== null && W !== void 0 ? W : Fe);
      }
    }
    const Ot = y("rsltxt");
    class xn {
      constructor(o, p) {
        this.sliderView_ = p.sliderView, this.textView_ = p.textView, this.element = o.createElement("div"), this.element.classList.add(Ot());
        const f = o.createElement("div");
        f.classList.add(Ot("s")), f.appendChild(this.sliderView_.element), this.element.appendChild(f);
        const x = o.createElement("div");
        x.classList.add(Ot("t")), x.appendChild(this.textView_.element), this.element.appendChild(x);
      }
    }
    const kt = y("rsl");
    class gt {
      constructor(o, p) {
        this.onSliderPropsChange_ = this.onSliderPropsChange_.bind(this), this.onValueChange_ = this.onValueChange_.bind(this), this.sliderProps_ = p.sliderProps, this.sliderProps_.emitter.on("change", this.onSliderPropsChange_), this.element = o.createElement("div"), this.element.classList.add(kt()), p.viewProps.bindClassModifiers(this.element), this.value_ = p.value, this.value_.emitter.on("change", this.onValueChange_);
        const f = o.createElement("div");
        f.classList.add(kt("t")), this.element.appendChild(f), this.trackElement = f;
        const x = o.createElement("div");
        x.classList.add(kt("b")), f.appendChild(x), this.barElement = x;
        const T = ["min", "max"].map((L) => {
          const z = o.createElement("div");
          return z.classList.add(kt("k"), kt("k", L)), f.appendChild(z), z;
        });
        this.knobElements = [T[0], T[1]], this.update_();
      }
      valueToX_(o) {
        const p = this.sliderProps_.get("minValue"), f = this.sliderProps_.get("maxValue");
        return at(we(o, p, f, 0, 1), 0, 1) * 100;
      }
      update_() {
        const o = this.value_.rawValue;
        o.length === 0 ? this.element.classList.add(kt(void 0, "zero")) : this.element.classList.remove(kt(void 0, "zero"));
        const p = [this.valueToX_(o.min), this.valueToX_(o.max)];
        this.barElement.style.left = `${p[0]}%`, this.barElement.style.right = `${100 - p[1]}%`, this.knobElements.forEach((f, x) => {
          f.style.left = `${p[x]}%`;
        });
      }
      onSliderPropsChange_() {
        this.update_();
      }
      onValueChange_() {
        this.update_();
      }
    }
    class Vi {
      constructor(o, p) {
        this.grabbing_ = null, this.grabOffset_ = 0, this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.sliderProps = p.sliderProps, this.viewProps = p.viewProps, this.value = p.value, this.view = new gt(o, {
          sliderProps: this.sliderProps,
          value: this.value,
          viewProps: p.viewProps
        });
        const f = new Ct2(this.view.trackElement);
        f.emitter.on("down", this.onPointerDown_), f.emitter.on("move", this.onPointerMove_), f.emitter.on("up", this.onPointerUp_);
      }
      ofs_() {
        return this.grabbing_ === "min" ? this.view.knobElements[0].getBoundingClientRect().width / 2 : this.grabbing_ === "max" ? -this.view.knobElements[1].getBoundingClientRect().width / 2 : 0;
      }
      valueFromData_(o) {
        if (!o.point)
          return null;
        const p = (o.point.x + this.ofs_()) / o.bounds.width, f = this.sliderProps.get("minValue"), x = this.sliderProps.get("maxValue");
        return we(p, 0, 1, f, x);
      }
      onPointerDown_(o) {
        if (!o.data.point)
          return;
        const p = o.data.point.x / o.data.bounds.width, f = this.value.rawValue, x = this.sliderProps.get("minValue"), T = this.sliderProps.get("maxValue"), L = we(f.min, x, T, 0, 1), z = we(f.max, x, T, 0, 1);
        Math.abs(z - p) <= 0.025 ? this.grabbing_ = "max" : Math.abs(L - p) <= 0.025 ? this.grabbing_ = "min" : p >= L && p <= z ? (this.grabbing_ = "length", this.grabOffset_ = we(p - L, 0, 1, 0, T - x)) : p < L ? (this.grabbing_ = "min", this.onPointerMove_(o)) : p > z && (this.grabbing_ = "max", this.onPointerMove_(o));
      }
      applyPointToValue_(o, p) {
        const f = this.valueFromData_(o);
        if (f === null)
          return;
        const x = this.sliderProps.get("minValue"), T = this.sliderProps.get("maxValue");
        if (this.grabbing_ === "min")
          this.value.setRawValue(new Be(f, this.value.rawValue.max), p);
        else if (this.grabbing_ === "max")
          this.value.setRawValue(new Be(this.value.rawValue.min, f), p);
        else if (this.grabbing_ === "length") {
          const L = this.value.rawValue.length;
          let z = f - this.grabOffset_, re = z + L;
          z < x ? (z = x, re = x + L) : re > T && (z = T - L, re = T), this.value.setRawValue(new Be(z, re), p);
        }
      }
      onPointerMove_(o) {
        this.applyPointToValue_(o.data, {
          forceEmit: false,
          last: false
        });
      }
      onPointerUp_(o) {
        this.applyPointToValue_(o.data, {
          forceEmit: true,
          last: true
        }), this.grabbing_ = null;
      }
    }
    class Wn {
      constructor(o, p) {
        this.value = p.value, this.viewProps = p.viewProps, this.sc_ = new Vi(o, p);
        const f = {
          baseStep: p.baseStep,
          constraint: p.constraint,
          textProps: K.fromObject({
            draggingScale: p.draggingScale,
            formatter: p.formatter
          })
        };
        this.tc_ = new Ti(o, {
          assembly: Ii,
          axes: [f, f],
          parser: p.parser,
          value: this.value,
          viewProps: p.viewProps
        }), this.view = new xn(o, {
          sliderView: this.sc_.view,
          textView: this.tc_.view
        });
      }
      get textController() {
        return this.tc_;
      }
    }
    function Tr(d) {
      return Be.isObject(d) ? new Be(d.min, d.max) : new Be(0, 0);
    }
    function Jn(d, o) {
      d.writeProperty("max", o.max), d.writeProperty("min", o.min);
    }
    function qt(d) {
      const o = [], p = mr(d);
      p && o.push(p);
      const f = dr(d);
      return f && o.push(f), new yn(new Hn(o));
    }
    const Qt = {
      id: "input-interval",
      type: "input",
      css: '.tp-cbzgv,.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-radv_b:hover,.tp-rslv_k:hover,.tp-cbzv_b:hover{background-color:var(--btn-bg-h)}.tp-radv_b:focus,.tp-rslv_k:focus,.tp-cbzv_b:focus{background-color:var(--btn-bg-f)}.tp-radv_b:active,.tp-rslv_k:active,.tp-cbzv_b:active{background-color:var(--btn-bg-a)}.tp-radv_b:disabled,.tp-rslv_k:disabled,.tp-cbzv_b:disabled{opacity:.5}.tp-cbzgv{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-cbzgv:hover{background-color:var(--in-bg-h)}.tp-cbzgv:focus{background-color:var(--in-bg-f)}.tp-cbzgv:active{background-color:var(--in-bg-a)}.tp-cbzgv:disabled{opacity:.5}.tp-btngridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-btngridv.tp-v-disabled{opacity:.5}.tp-btngridv .tp-btnv_b:disabled{opacity:1}.tp-btngridv .tp-btnv_b:disabled .tp-btnv_t{opacity:.5}.tp-btngridv .tp-btnv_b{border-radius:0}.tp-cbzv{position:relative}.tp-cbzv_h{display:flex}.tp-cbzv_b{margin-right:4px;position:relative;width:var(--bld-us)}.tp-cbzv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-cbzv_b svg path{stroke:var(--bs-bg);stroke-width:2}.tp-cbzv_t{flex:1}.tp-cbzv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-cbzv.tp-cbzv-expanded .tp-cbzv_p{margin-top:var(--bld-s);opacity:1}.tp-cbzv.tp-cbzv-cpl .tp-cbzv_p{overflow:visible}.tp-cbzv .tp-popv{left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-cbzpv_t{margin-top:var(--bld-s)}.tp-cbzgv{height:auto;overflow:hidden;position:relative}.tp-cbzgv.tp-v-disabled{opacity:.5}.tp-cbzgv_p{left:16px;position:absolute;right:16px;top:0}.tp-cbzgv_g{cursor:pointer;display:block;height:calc(var(--bld-us)*5);width:100%}.tp-cbzgv_u{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_l{fill:rgba(0,0,0,0);stroke:var(--in-fg)}.tp-cbzgv_v{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_h{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;pointer-events:none;position:absolute;width:4px}.tp-cbzgv:focus .tp-cbzgv_h-sel{background-color:var(--in-fg);border-width:0}.tp-cbzprvv{cursor:pointer;height:4px;padding:4px 0;position:relative}.tp-cbzprvv_g{display:block;height:100%;overflow:visible;width:100%}.tp-cbzprvv_t{opacity:.5;stroke:var(--mo-fg)}.tp-cbzprvv_m{background-color:var(--mo-fg);border-radius:50%;height:4px;margin-left:-2px;margin-top:-2px;opacity:0;position:absolute;top:50%;transition:opacity .2s ease-out;width:4px}.tp-cbzprvv_m.tp-cbzprvv_m-a{opacity:1}.tp-fpsv{position:relative}.tp-fpsv_l{bottom:4px;color:var(--mo-fg);line-height:1;right:4px;pointer-events:none;position:absolute}.tp-fpsv_u{margin-left:.2em;opacity:.7}.tp-rslv{cursor:pointer;padding-left:8px;padding-right:8px}.tp-rslv.tp-v-disabled{opacity:.5}.tp-rslv_t{height:calc(var(--bld-us));position:relative}.tp-rslv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:-4px;right:-4px}.tp-rslv_b{bottom:0;top:0;position:absolute}.tp-rslv_b::before{background-color:var(--in-fg);content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:0;right:0}.tp-rslv_k{height:calc(var(--bld-us) - 8px);margin-top:calc((var(--bld-us) - 8px)/-2);position:absolute;top:50%;width:8px}.tp-rslv_k.tp-rslv_k-min{margin-left:-8px}.tp-rslv_k.tp-rslv_k-max{margin-left:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-min{border-bottom-right-radius:0;border-top-right-radius:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-max{border-bottom-left-radius:0;border-top-left-radius:0}.tp-rsltxtv{display:flex}.tp-rsltxtv_s{flex:1}.tp-rsltxtv_t{flex:1;margin-left:4px}.tp-radv_l{display:block;position:relative}.tp-radv_i{left:0;opacity:0;position:absolute;top:0}.tp-radv_b{opacity:.5}.tp-radv_i:hover+.tp-radv_b{background-color:var(--btn-bg-h)}.tp-radv_i:focus+.tp-radv_b{background-color:var(--btn-bg-f)}.tp-radv_i:active+.tp-radv_b{background-color:var(--btn-bg-a)}.tp-radv_i:checked+.tp-radv_b{opacity:1}.tp-radv_t{bottom:0;color:inherit;left:0;overflow:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0}.tp-radv_i:disabled+.tp-radv_b>.tp-radv_t{opacity:.5}.tp-radgridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-radgridv.tp-v-disabled{opacity:.5}.tp-radgridv .tp-radv_b{border-radius:0}',
      accept: (d, o) => {
        if (!Be.isObject(d))
          return null;
        const p = de, f = te(o, {
          format: p.optional.function,
          max: p.optional.number,
          min: p.optional.number,
          step: p.optional.number
        });
        return f ? {
          initialValue: new Be(d.min, d.max),
          params: f
        } : null;
      },
      binding: {
        reader: (d) => Tr,
        constraint: (d) => qt(d.params),
        equals: Be.equals,
        writer: (d) => Jn
      },
      controller(d) {
        var o;
        const p = d.value, f = d.constraint;
        if (!(f instanceof yn))
          throw g.shouldNeverHappen();
        const x = (p.rawValue.min + p.rawValue.max) / 2, T = (o = d.params.format) !== null && o !== void 0 ? o : Ie(ls(f.edge, x)), L = f.edge && Et(f.edge, vt);
        if (L)
          return new Wn(d.document, {
            baseStep: cs(f.edge),
            constraint: f.edge,
            draggingScale: ps(f.edge, x),
            formatter: T,
            parser: hn,
            sliderProps: new K({
              maxValue: L.values.value("max"),
              minValue: L.values.value("min")
            }),
            value: p,
            viewProps: d.viewProps
          });
        const z = {
          baseStep: cs(f.edge),
          constraint: f.edge,
          textProps: K.fromObject({
            draggingScale: x,
            formatter: T
          })
        };
        return new Ti(d.document, {
          assembly: Ii,
          axes: [z, z],
          parser: hn,
          value: p,
          viewProps: d.viewProps
        });
      }
    };
    class En {
      constructor(o) {
        this.controller_ = o;
      }
      get disabled() {
        return this.controller_.viewProps.get("disabled");
      }
      set disabled(o) {
        this.controller_.viewProps.set("disabled", o);
      }
      get title() {
        var o;
        return (o = this.controller_.props.get("title")) !== null && o !== void 0 ? o : "";
      }
      set title(o) {
        this.controller_.props.set("title", o);
      }
    }
    class Ts extends c {
      constructor(o, p, f, x, T) {
        super(o, x, T), this.cell = p, this.index = f;
      }
    }
    class ks extends s {
      constructor(o) {
        super(o), this.cellToApiMap_ = /* @__PURE__ */ new Map(), this.controller_.valueController.cellControllers.forEach((f) => {
          const x = new En(f);
          this.cellToApiMap_.set(f, x);
        });
      }
      get value() {
        return this.controller_.value;
      }
      cell(o, p) {
        const f = this.controller_.valueController, x = f.cellControllers[p * f.size[0] + o];
        return this.cellToApiMap_.get(x);
      }
      on(o, p) {
        const f = p.bind(this);
        this.controller_.value.emitter.on(o, (x) => {
          const T = this.controller_.valueController, L = T.findCellByValue(x.rawValue);
          if (!L)
            return;
          const z = this.cellToApiMap_.get(L);
          if (!z)
            return;
          const re = T.cellControllers.indexOf(L);
          f(new Ts(this, z, [re % T.size[0], Math.floor(re / T.size[0])], x.rawValue, void 0));
        });
      }
    }
    const Cn = y("rad");
    class Ms {
      constructor(o, p) {
        this.element = o.createElement("div"), this.element.classList.add(Cn()), p.viewProps.bindClassModifiers(this.element);
        const f = o.createElement("label");
        f.classList.add(Cn("l")), this.element.appendChild(f);
        const x = o.createElement("input");
        x.classList.add(Cn("i")), x.name = p.name, x.type = "radio", p.viewProps.bindDisabled(x), f.appendChild(x), this.inputElement = x;
        const T = o.createElement("div");
        T.classList.add(Cn("b")), f.appendChild(T);
        const L = o.createElement("div");
        L.classList.add(Cn("t")), T.appendChild(L), R(p.props, "title", (z) => {
          L.textContent = z;
        });
      }
    }
    class Mt {
      constructor(o, p) {
        this.props = p.props, this.viewProps = p.viewProps, this.view = new Ms(o, {
          name: p.name,
          props: this.props,
          viewProps: this.viewProps
        });
      }
    }
    class ei {
      constructor(o, p) {
        this.cellCs_ = [], this.cellValues_ = [], this.onCellInputChange_ = this.onCellInputChange_.bind(this), this.size = p.size;
        const [f, x] = this.size;
        for (let T = 0; T < x; T++)
          for (let L = 0; L < f; L++) {
            const z = new Mt(o, {
              name: p.groupName,
              props: K.fromObject(Object.assign({}, p.cellConfig(L, T))),
              viewProps: ge.create()
            });
            this.cellCs_.push(z), this.cellValues_.push(p.cellConfig(L, T).value);
          }
        this.value = p.value, S(this.value, (T) => {
          const L = this.findCellByValue(T);
          L && (L.view.inputElement.checked = true);
        }), this.viewProps = ge.create(), this.view = new xt(o, {
          viewProps: this.viewProps,
          viewName: "radgrid"
        }), this.view.element.style.gridTemplateColumns = `repeat(${f}, 1fr)`, this.cellCs_.forEach((T) => {
          T.view.inputElement.addEventListener("change", this.onCellInputChange_), this.view.element.appendChild(T.view.element);
        });
      }
      get cellControllers() {
        return this.cellCs_;
      }
      findCellByValue(o) {
        const p = this.cellValues_.findIndex((f) => f === o);
        return p < 0 ? null : this.cellCs_[p];
      }
      onCellInputChange_(o) {
        const p = o.currentTarget, f = this.cellCs_.findIndex((x) => x.view.inputElement === p);
        f < 0 || (this.value.rawValue = this.cellValues_[f]);
      }
    }
    const kr = function() {
      return {
        id: "radiogrid",
        type: "blade",
        accept(d) {
          const o = de, p = te(d, {
            cells: o.required.function,
            groupName: o.required.string,
            size: o.required.array(o.required.number),
            value: o.required.raw,
            view: o.required.constant("radiogrid"),
            label: o.optional.string
          });
          return p ? { params: p } : null;
        },
        controller(d) {
          return new Lt(d.document, {
            blade: d.blade,
            props: K.fromObject({
              label: d.params.label
            }),
            valueController: new ei(d.document, {
              groupName: d.params.groupName,
              cellConfig: d.params.cells,
              size: d.params.size,
              value: H(d.params.value)
            })
          });
        },
        api(d) {
          return !(d.controller instanceof Lt) || !(d.controller.valueController instanceof ei) ? null : new ks(d.controller);
        }
      };
    }();
    function Di(d) {
      return {
        id: "input-radiogrid",
        type: "input",
        accept(o, p) {
          if (!d.isType(o))
            return null;
          const f = de, x = te(p, {
            cells: f.required.function,
            groupName: f.required.string,
            size: f.required.array(f.required.number),
            view: f.required.constant("radiogrid")
          });
          return x ? {
            initialValue: o,
            params: x
          } : null;
        },
        binding: d.binding,
        controller: (o) => new ei(o.document, {
          cellConfig: o.params.cells,
          groupName: o.params.groupName,
          size: o.params.size,
          value: o.value
        })
      };
    }
    const Mr = Di({
      isType: (d) => typeof d == "number",
      binding: {
        reader: (d) => nr,
        writer: (d) => Ei
      }
    }), Ss = Di({
      isType: (d) => typeof d == "string",
      binding: {
        reader: (d) => ss,
        writer: (d) => Ei
      }
    }), Sr = Di({
      isType: (d) => typeof d == "boolean",
      binding: {
        reader: (d) => cn,
        writer: (d) => Ei
      }
    }), Ar = [
      _r,
      Ps,
      Pr,
      Qt,
      kr,
      Sr,
      Mr,
      Ss
    ];
    r.ButtonCellApi = vs, r.ButtonGridApi = bs, r.ButtonGridController = ki, r.CubicBezier = Tt, r.CubicBezierApi = gs, r.CubicBezierAssembly = Qn, r.CubicBezierController = bt, r.CubicBezierGraphController = Li, r.CubicBezierGraphView = xs, r.CubicBezierPickerController = Zn, r.CubicBezierPickerView = gn, r.CubicBezierPreviewView = Xt, r.CubicBezierView = Ve, r.FpsGraphBladeApi = Ae, r.FpsGraphController = wn, r.FpsView = Yt, r.Fpswatch = Ye, r.Interval = Be, r.IntervalAssembly = Ii, r.IntervalConstraint = yn, r.RadioCellApi = En, r.RadioController = Mt, r.RadioGridApi = ks, r.RadioGridController = ei, r.RadioView = Ms, r.RangeSliderController = Vi, r.RangeSliderTextController = Wn, r.RangeSliderTextView = xn, r.RangeSliderView = gt, r.TpRadioGridChangeEvent = Ts, r.plugins = Ar, Object.defineProperty(r, "__esModule", { value: true });
  });
})(kh, Wi);
var Mh = rh(Wi);
var Sh = Bp({
  __proto__: null,
  default: Mh
}, [Wi]);
var Sn;
var Ds;
var jh = (b = "tres-container") => {
  Sn || (Sn = new zs.Pane({
    container: document.querySelector(b) || void 0
  }), Sn.registerPlugin(Sh), Ds = Sn.addBlade({
    view: "fpsgraph",
    label: "fpsgraph"
  }));
  function i() {
    Sn && Sn.dispose();
  }
  return onMounted(() => {
    const { onBeforeLoop: r, onAfterLoop: s, resume: a } = ne();
    a(), r(() => Ds.begin()), s(() => Ds.end());
  }), onUnmounted(() => {
    i();
  }), { pane: Sn, fpsGraph: Ds, disposeTweakPane: i };
};
function zh(b, i) {
  const r = ref(i), s = new AnimationMixer(r.value), a = shallowReactive({});
  b.forEach((u) => {
    const h = s.clipAction(u, r.value);
    a[u.name] = h;
  });
  const { onLoop: c } = ne();
  return c(({ delta: u }) => {
    s.update(u);
  }), {
    actions: a,
    mixer: s
  };
}
var Os = null;
function Ah(b, i) {
  return (r) => {
    i && i(r), b.draco && (Os || (Os = new ah()), Os.setDecoderPath(b.decoderPath || "https://www.gstatic.com/draco/versioned/decoders/1.4.3/"), r.setDRACOLoader(Os));
  };
}
async function Lh(b, i = {
  draco: false
}, r) {
  return await Ct(ou, b, Ah(i, r));
}
var Uh = defineComponent({
  name: "GLTFModel",
  props: {
    /**
     * The path to the GLTF file.
     *
     */
    path: String,
    /**
     * Whether to use Draco compression.
     *
     */
    draco: Boolean,
    /**
     * The path to the Draco decoder.
     *
     */
    decoderPath: String
  },
  async setup(b, { expose: i }) {
    const { state: r } = Nn();
    function s() {
      return a;
    }
    i({ getModel: s });
    const { scene: a } = await Lh(b.path, { draco: b.draco, decoderPath: b.decoderPath });
    return r.scene && r.scene.add(a), () => {
    };
  }
});
async function Rh(b) {
  return await Ct(Hu, b);
}
var Gh = defineComponent({
  name: "FBXModel",
  props: {
    /*
     * The path to the FBX file.
     */
    path: {
      type: String,
      required: true
    }
  },
  async setup(b, { expose: i }) {
    const { state: r } = Nn();
    let s = null;
    function a() {
      return s;
    }
    return i({ getModel: a }), s = await Rh(b.path), r.scene && s.isObject3D && r.scene.add(s), () => {
    };
  }
});
var Hh = defineComponent({
  __name: "Text3D",
  props: {
    font: null,
    text: null,
    size: { default: 0.5 },
    height: { default: 0.2 },
    curveSegments: { default: 5 },
    bevelEnabled: { type: Boolean, default: true },
    bevelThickness: { default: 0.05 },
    bevelSize: { default: 0.02 },
    bevelOffset: { default: 0 },
    bevelSegments: { default: 4 },
    center: { type: Boolean, default: false }
  },
  async setup(b) {
    let i, r;
    const s = b, { extend: a } = Nn();
    a({ TextGeometry: Ou });
    const c = new nh(), u = useSlots(), h = computed(() => {
      var w;
      return s.text ? s.text : u.default ? (w = u.default()[0].children) == null ? void 0 : w.trim() : "TresJS";
    }), m = ([i, r] = withAsyncContext(() => new Promise((w, _) => {
      try {
        typeof s.font == "string" ? c.load(s.font, (y) => {
          w(y);
        }) : w(s.font);
      } catch (y) {
        _(console.error("cientos", y));
      }
    })), i = await i, r(), i), g = computed(() => ({
      font: m,
      size: s.size,
      height: s.height,
      curveSegments: s.curveSegments,
      bevelEnabled: s.bevelEnabled,
      bevelThickness: s.bevelThickness,
      bevelSize: s.bevelSize,
      bevelOffset: s.bevelOffset,
      bevelSegments: s.bevelSegments
    }));
    return (w, _) => {
      const y = resolveComponent("TresTextGeometry"), C = resolveComponent("TresMesh");
      return unref(m) ? (openBlock(), createBlock(C, { key: 0 }, {
        default: withCtx(() => [
          unref(h) ? (openBlock(), createBlock(y, {
            key: 0,
            args: [unref(h), unref(g)],
            center: b.center
          }, null, 8, ["args", "center"])) : createCommentVNode("", true),
          renderSlot(w.$slots, "default")
        ]),
        _: 3
      })) : createCommentVNode("", true);
    };
  }
});
var Kh = defineComponent({
  __name: "Plane",
  props: {
    args: { default: () => [1, 1] },
    color: { default: "0xffffff" }
  },
  setup(b, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => {
      const c = resolveComponent("TresPlaneGeometry"), u = resolveComponent("TresMeshBasicMaterial"), h = resolveComponent("TresMesh");
      return openBlock(), createBlock(h, mergeProps({
        ref_key: "planeRef",
        ref: r,
        rotation: [-Math.PI / 2, 0, 0]
      }, s.$attrs), {
        default: withCtx(() => [
          createVNode(c, { args: b.args }, null, 8, ["args"]),
          renderSlot(s.$slots, "default", {}, () => [
            createVNode(u, { color: b.color }, null, 8, ["color"])
          ])
        ]),
        _: 3
      }, 16, ["rotation"]);
    };
  }
});
var $h = defineComponent({
  __name: "Box",
  props: {
    args: { default: () => [1, 1, 1] },
    color: { default: "0xffffff" }
  },
  setup(b, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => {
      const c = resolveComponent("TresBoxGeometry"), u = resolveComponent("TresMeshBasicMaterial"), h = resolveComponent("TresMesh");
      return openBlock(), createBlock(h, mergeProps({
        ref_key: "boxRef",
        ref: r
      }, s.$attrs), {
        default: withCtx(() => [
          createVNode(c, { args: b.args }, null, 8, ["args"]),
          renderSlot(s.$slots, "default", {}, () => [
            createVNode(u, { color: b.color }, null, 8, ["color"])
          ])
        ]),
        _: 3
      }, 16);
    };
  }
});
var Xh = defineComponent({
  __name: "Sphere",
  props: {
    args: { default: () => [2, 32, 16] },
    color: { default: "0xffffff" }
  },
  setup(b, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => {
      const c = resolveComponent("TresSphereGeometry"), u = resolveComponent("TresMeshBasicMaterial"), h = resolveComponent("TresMesh");
      return openBlock(), createBlock(h, mergeProps({
        ref_key: "sphereRef",
        ref: r
      }, s.$attrs), {
        default: withCtx(() => [
          createVNode(c, { args: b.args }, null, 8, ["args"]),
          renderSlot(s.$slots, "default", {}, () => [
            createVNode(u, { color: b.color }, null, 8, ["color"])
          ])
        ]),
        _: 3
      }, 16);
    };
  }
});
var Yh = defineComponent({
  __name: "Torus",
  props: {
    args: { default: () => [1, 1, 16, 80] },
    color: { default: "0xffffff" }
  },
  setup(b, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => {
      const c = resolveComponent("TresTorusGeometry"), u = resolveComponent("TresMeshBasicMaterial"), h = resolveComponent("TresMesh");
      return openBlock(), createBlock(h, mergeProps({
        ref_key: "torusRef",
        ref: r
      }, s.$attrs), {
        default: withCtx(() => [
          createVNode(c, { args: b.args }, null, 8, ["args"]),
          renderSlot(s.$slots, "default", {}, () => [
            createVNode(u, { color: b.color }, null, 8, ["color"])
          ])
        ]),
        _: 3
      }, 16);
    };
  }
});
var qh = defineComponent({
  __name: "TorusKnot",
  props: {
    args: { default: () => [1, 0.4, 64, 8] },
    color: { default: "0xffffff" }
  },
  setup(b, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => {
      const c = resolveComponent("TresTorusKnotGeometry"), u = resolveComponent("TresMeshBasicMaterial"), h = resolveComponent("TresMesh");
      return openBlock(), createBlock(h, mergeProps({
        ref_key: "torusKnotRef",
        ref: r
      }, s.$attrs), {
        default: withCtx(() => [
          createVNode(c, { args: b.args }, null, 8, ["args"]),
          renderSlot(s.$slots, "default", {}, () => [
            createVNode(u, { color: b.color }, null, 8, ["color"])
          ])
        ]),
        _: 3
      }, 16);
    };
  }
});
var Qh = defineComponent({
  __name: "Circle",
  props: {
    args: { default: () => [1, 32] },
    color: { default: "0xffffff" }
  },
  setup(b, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => {
      const c = resolveComponent("TresCircleGeometry"), u = resolveComponent("TresMeshBasicMaterial"), h = resolveComponent("TresMesh");
      return openBlock(), createBlock(h, mergeProps({
        ref_key: "circleRef",
        ref: r
      }, s.$attrs), {
        default: withCtx(() => [
          createVNode(c, { args: b.args }, null, 8, ["args"]),
          renderSlot(s.$slots, "default", {}, () => [
            createVNode(u, { color: b.color }, null, 8, ["color"])
          ])
        ]),
        _: 3
      }, 16);
    };
  }
});
var Zh = defineComponent({
  __name: "Cone",
  props: {
    args: { default: () => [1, 1, 12] },
    color: { default: "0xffffff" }
  },
  setup(b, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => {
      const c = resolveComponent("TresConeGeometry"), u = resolveComponent("TresMeshBasicMaterial"), h = resolveComponent("TresMesh");
      return openBlock(), createBlock(h, mergeProps({
        ref_key: "coneRef",
        ref: r
      }, s.$attrs), {
        default: withCtx(() => [
          createVNode(c, { args: b.args }, null, 8, ["args"]),
          renderSlot(s.$slots, "default", {}, () => [
            createVNode(u, { color: b.color }, null, 8, ["color"])
          ])
        ]),
        _: 3
      }, 16);
    };
  }
});
var Wh = defineComponent({
  __name: "Tube",
  props: {
    args: { default: () => [
      new QuadraticBezierCurve3(new Vector3(-1, 0, 0), new Vector3(0, 1, 0), new Vector3(1, 0, 0)),
      20,
      0.2,
      8,
      false
    ] },
    color: { default: "0xffffff" }
  },
  setup(b, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => {
      const c = resolveComponent("TresTubeGeometry"), u = resolveComponent("TresMeshBasicMaterial"), h = resolveComponent("TresMesh");
      return openBlock(), createBlock(h, mergeProps({
        ref_key: "tubeRef",
        ref: r
      }, s.$attrs), {
        default: withCtx(() => [
          createVNode(c, { args: b.args }, null, 8, ["args"]),
          renderSlot(s.$slots, "default", {}, () => [
            createVNode(u, { color: b.color }, null, 8, ["color"])
          ])
        ]),
        _: 3
      }, 16);
    };
  }
});
var Jh = defineComponent({
  __name: "Ring",
  props: {
    args: { default: () => [0.5, 1, 32] },
    color: { default: "0xffffff" }
  },
  setup(b, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => {
      const c = resolveComponent("TresRingGeometry"), u = resolveComponent("TresMeshBasicMaterial"), h = resolveComponent("TresMesh");
      return openBlock(), createBlock(h, mergeProps({
        ref_key: "ringRef",
        ref: r
      }, s.$attrs), {
        default: withCtx(() => [
          createVNode(c, { args: b.args }, null, 8, ["args"]),
          renderSlot(s.$slots, "default", {}, () => [
            createVNode(u, { color: b.color }, null, 8, ["color"])
          ])
        ]),
        _: 3
      }, 16);
    };
  }
});
var ed = defineComponent({
  __name: "Tetrahedron",
  props: {
    args: { default: () => [1, 0] },
    color: { default: "0xffffff" }
  },
  setup(b, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => {
      const c = resolveComponent("TresTetrahedronGeometry"), u = resolveComponent("TresMeshBasicMaterial"), h = resolveComponent("TresMesh");
      return openBlock(), createBlock(h, mergeProps({
        ref_key: "tetrahedronRef",
        ref: r,
        rotation: [-Math.PI / 2, 0, 0]
      }, s.$attrs), {
        default: withCtx(() => [
          createVNode(c, { args: b.args }, null, 8, ["args"]),
          renderSlot(s.$slots, "default", {}, () => [
            createVNode(u, { color: b.color }, null, 8, ["color"])
          ])
        ]),
        _: 3
      }, 16, ["rotation"]);
    };
  }
});
var td = defineComponent({
  __name: "Icosahedron",
  props: {
    args: { default: () => [1, 0] },
    color: { default: "0xffffff" }
  },
  setup(b, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => {
      const c = resolveComponent("TresIcosahedronGeometry"), u = resolveComponent("TresMeshBasicMaterial"), h = resolveComponent("TresMesh");
      return openBlock(), createBlock(h, mergeProps({
        ref_key: "icosahedronRef",
        ref: r
      }, s.$attrs), {
        default: withCtx(() => [
          createVNode(c, { args: b.args }, null, 8, ["args"]),
          renderSlot(s.$slots, "default", {}, () => [
            createVNode(u, { color: b.color }, null, 8, ["color"])
          ])
        ]),
        _: 3
      }, 16);
    };
  }
});
var nd = defineComponent({
  __name: "Octahedron",
  props: {
    args: { default: () => [1, 0] },
    color: { default: "0xffffff" }
  },
  setup(b, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => {
      const c = resolveComponent("TresOctahedronGeometry"), u = resolveComponent("TresMeshBasicMaterial"), h = resolveComponent("TresMesh");
      return openBlock(), createBlock(h, mergeProps({
        ref_key: "octahedronRef",
        ref: r
      }, s.$attrs), {
        default: withCtx(() => [
          createVNode(c, { args: b.args }, null, 8, ["args"]),
          renderSlot(s.$slots, "default", {}, () => [
            createVNode(u, { color: b.color }, null, 8, ["color"])
          ])
        ]),
        _: 3
      }, 16);
    };
  }
});
var id = defineComponent({
  __name: "Dodecahedron",
  props: {
    args: { default: () => [1, 0] },
    color: { default: "0xffffff" }
  },
  setup(b, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => {
      const c = resolveComponent("TresDodecahedronGeometry"), u = resolveComponent("TresMeshBasicMaterial"), h = resolveComponent("TresMesh");
      return openBlock(), createBlock(h, mergeProps({
        ref_key: "dodecahedronRef",
        ref: r
      }, s.$attrs), {
        default: withCtx(() => [
          createVNode(c, { args: b.args }, null, 8, ["args"]),
          renderSlot(s.$slots, "default", {}, () => [
            createVNode(u, { color: b.color }, null, 8, ["color"])
          ])
        ]),
        _: 3
      }, 16);
    };
  }
});
var no = {
  sunset: "venice/venice_sunset_4k.hdr"
};
async function Ih({
  files: b = ["/px.png", "/nx.png", "/py.png", "/ny.png", "/pz.png", "/nz.png"],
  blur: i = 0,
  background: r = false,
  path: s = void 0,
  preset: a = void 0,
  encoding: c = void 0
}) {
  const { state: u } = Nn();
  if (a) {
    if (!(a in no))
      throw new Error("Preset must be one of: " + Object.keys(no).join(", "));
    b = no[a], s = "https://raw.githubusercontent.com/Tresjs/assets/main/textures/hdr/";
  }
  const h = Array.isArray(b), g = await Ct(
    h ? CubeTextureLoader : oh,
    h ? [b] : b,
    (_) => {
      s && _.setPath(s), c && (_.encoding = c);
    }
  ), w = h ? g[0] : g;
  return w && (w.mapping = h ? CubeReflectionMapping : EquirectangularReflectionMapping, w.encoding = c ?? h ? sRGBEncoding : LinearEncoding), r && u.scene && (u.scene.environment = w, u.scene.background = w, i && (u.scene.backgroundBlurriness = i | 0)), w;
}
var sd = defineComponent({
  name: "Environment",
  props: {
    background: {
      type: Boolean,
      default: false
    },
    blur: {
      type: Number,
      default: 0
    },
    files: {
      type: [String, Array]
    },
    encoding: Object,
    path: String,
    preset: Object
  },
  async setup(b, { expose: i }) {
    let r = null;
    return i({ getTexture: () => r }), r = await Ih(b), () => {
    };
  }
});
export {
  $h as Box,
  Qh as Circle,
  Zh as Cone,
  id as Dodecahedron,
  sd as Environment,
  Gh as FBXModel,
  Uh as GLTFModel,
  td as Icosahedron,
  nd as Octahedron,
  Nh as OrbitControls,
  Bh as PamCameraMouse,
  Kh as Plane,
  Jh as Ring,
  Xh as Sphere,
  ed as Tetrahedron,
  Hh as Text3D,
  Yh as Torus,
  qh as TorusKnot,
  Fh as TransformControls,
  Wh as Tube,
  zh as useAnimations,
  Ih as useEnvironment,
  Rh as useFBX,
  Lh as useGLTF,
  Ph as usePamCameraMouse,
  jh as useTweakPane
};
/*! Bundled license information:

@tresjs/cientos/dist/trescientos.js:
  (*! Tweakpane 3.1.4 (c) 2016 cocopon, licensed under the MIT license. *)
*/
//# sourceMappingURL=@tresjs_cientos.js.map
