import {
  D,
  Ee,
  Rt,
  _,
  xt
} from "./chunk-4R2RUFTZ.js";
import {
  Fragment,
  computed,
  createBaseVNode,
  createCommentVNode,
  createElementBlock,
  customRef,
  defineComponent,
  getCurrentInstance,
  getCurrentScope,
  guardReactiveProps,
  inject,
  mergeProps,
  nextTick,
  normalizeProps,
  onMounted,
  onScopeDispose,
  onUnmounted,
  openBlock,
  readonly,
  ref,
  renderList,
  renderSlot,
  shallowReactive,
  shallowRef,
  toRef,
  unref,
  useSlots,
  watch,
  watchEffect,
  withAsyncContext
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
} from "./chunk-PDZK3SQX.js";
import "./chunk-JC4IRQUL.js";

// node_modules/.pnpm/@tresjs+cientos@2.0.0-beta.6_@tresjs+core@2.0.0-rc.2_three@0.152.2_vue@3.2.47/node_modules/@tresjs/cientos/dist/trescientos.js
var Qc = Object.defineProperty;
var Zc = (v, n, s) => n in v ? Qc(v, n, { enumerable: true, configurable: true, writable: true, value: s }) : v[n] = s;
var Jr = (v, n, s) => (Zc(v, typeof n != "symbol" ? n + "" : n, s), s);
function $u(v, n) {
  for (var s = 0; s < n.length; s++) {
    const r = n[s];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const o in r)
        if (o !== "default" && !(o in v)) {
          const c = Object.getOwnPropertyDescriptor(r, o);
          c && Object.defineProperty(v, o, c.get ? c : {
            enumerable: true,
            get: () => r[o]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(v, Symbol.toStringTag, { value: "Module" }));
}
function Ji(v) {
  return Ji = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
    return typeof n;
  } : function(n) {
    return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
  }, Ji(v);
}
function Xu(v, n) {
  if (Ji(v) !== "object" || v === null)
    return v;
  var s = v[Symbol.toPrimitive];
  if (s !== void 0) {
    var r = s.call(v, n || "default");
    if (Ji(r) !== "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (n === "string" ? String : Number)(v);
}
function Yu(v) {
  var n = Xu(v, "string");
  return Ji(n) === "symbol" ? n : String(n);
}
function C(v, n, s) {
  return n = Yu(n), n in v ? Object.defineProperty(v, n, {
    value: s,
    enumerable: true,
    configurable: true,
    writable: true
  }) : v[n] = s, v;
}
var mt = Uint8Array;
var an = Uint16Array;
var vo = Uint32Array;
var ja = new mt([
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
var Ua = new mt([
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
var qu = new mt([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var Ga = function(v, n) {
  for (var s = new an(31), r = 0; r < 31; ++r)
    s[r] = n += 1 << v[r - 1];
  for (var o = new vo(s[30]), r = 1; r < 30; ++r)
    for (var c = s[r]; c < s[r + 1]; ++c)
      o[c] = c - s[r] << 5 | r;
  return [s, o];
};
var Ha = Ga(ja, 2);
var Ka = Ha[0];
var Qu = Ha[1];
Ka[28] = 258, Qu[258] = 28;
var Zu = Ga(Ua, 0);
var Wu = Zu[0];
var bo = new an(32768);
for (Ce = 0; Ce < 32768; ++Ce) {
  sn = (Ce & 43690) >>> 1 | (Ce & 21845) << 1;
  sn = (sn & 52428) >>> 2 | (sn & 13107) << 2, sn = (sn & 61680) >>> 4 | (sn & 3855) << 4, bo[Ce] = ((sn & 65280) >>> 8 | (sn & 255) << 8) >>> 1;
}
var sn;
var Ce;
var Qi = function(v, n, s) {
  for (var r = v.length, o = 0, c = new an(n); o < r; ++o)
    ++c[v[o] - 1];
  var p = new an(n);
  for (o = 0; o < n; ++o)
    p[o] = p[o - 1] + c[o - 1] << 1;
  var h;
  if (s) {
    h = new an(1 << n);
    var d = 15 - n;
    for (o = 0; o < r; ++o)
      if (v[o])
        for (var g = o << 4 | v[o], w = n - v[o], _2 = p[v[o] - 1]++ << w, y = _2 | (1 << w) - 1; _2 <= y; ++_2)
          h[bo[_2] >>> d] = g;
  } else
    for (h = new an(r), o = 0; o < r; ++o)
      v[o] && (h[o] = bo[p[v[o] - 1]++] >>> 15 - v[o]);
  return h;
};
var ss = new mt(288);
for (Ce = 0; Ce < 144; ++Ce)
  ss[Ce] = 8;
var Ce;
for (Ce = 144; Ce < 256; ++Ce)
  ss[Ce] = 9;
var Ce;
for (Ce = 256; Ce < 280; ++Ce)
  ss[Ce] = 7;
var Ce;
for (Ce = 280; Ce < 288; ++Ce)
  ss[Ce] = 8;
var Ce;
var $a = new mt(32);
for (Ce = 0; Ce < 32; ++Ce)
  $a[Ce] = 5;
var Ce;
var Ju = Qi(ss, 9, 1);
var ep = Qi($a, 5, 1);
var io = function(v) {
  for (var n = v[0], s = 1; s < v.length; ++s)
    v[s] > n && (n = v[s]);
  return n;
};
var xt2 = function(v, n, s) {
  var r = n / 8 | 0;
  return (v[r] | v[r + 1] << 8) >> (n & 7) & s;
};
var so = function(v, n) {
  var s = n / 8 | 0;
  return (v[s] | v[s + 1] << 8 | v[s + 2] << 16) >> (n & 7);
};
var tp = function(v) {
  return (v / 8 | 0) + (v & 7 && 1);
};
var np = function(v, n, s) {
  (n == null || n < 0) && (n = 0), (s == null || s > v.length) && (s = v.length);
  var r = new (v instanceof an ? an : v instanceof vo ? vo : mt)(s - n);
  return r.set(v.subarray(n, s)), r;
};
var ip = function(v, n, s) {
  var r = v.length;
  if (!r || s && !s.l && r < 5)
    return n || new mt(0);
  var o = !n || s, c = !s || s.i;
  s || (s = {}), n || (n = new mt(r * 3));
  var p = function(Fe) {
    var Ue = n.length;
    if (Fe > Ue) {
      var ye = new mt(Math.max(Ue * 2, Fe));
      ye.set(n), n = ye;
    }
  }, h = s.f || 0, d = s.p || 0, g = s.b || 0, w = s.l, _2 = s.d, y = s.m, P = s.n, R = r * 8;
  do {
    if (!w) {
      s.f = h = xt2(v, d, 1);
      var k = xt2(v, d + 1, 3);
      if (d += 3, k)
        if (k == 1)
          w = Ju, _2 = ep, y = 9, P = 5;
        else if (k == 2) {
          var I = xt2(v, d, 31) + 257, D2 = xt2(v, d + 10, 15) + 4, Y = I + xt2(v, d + 5, 31) + 1;
          d += 14;
          for (var G = new mt(Y), N = new mt(19), O = 0; O < D2; ++O)
            N[qu[O]] = xt2(v, d + O * 3, 7);
          d += D2 * 3;
          for (var H = io(N), K = (1 << H) - 1, q = Qi(N, H, 1), O = 0; O < Y; ) {
            var pe = q[xt2(v, d, K)];
            d += pe & 15;
            var A = pe >>> 4;
            if (A < 16)
              G[O++] = A;
            else {
              var _e = 0, ce = 0;
              for (A == 16 ? (ce = 3 + xt2(v, d, 3), d += 2, _e = G[O - 1]) : A == 17 ? (ce = 3 + xt2(v, d, 7), d += 3) : A == 18 && (ce = 11 + xt2(v, d, 127), d += 7); ce--; )
                G[O++] = _e;
            }
          }
          var me = G.subarray(0, I), he = G.subarray(I);
          y = io(me), P = io(he), w = Qi(me, y, 1), _2 = Qi(he, P, 1);
        } else
          throw "invalid block type";
      else {
        var A = tp(d) + 4, z = v[A - 4] | v[A - 3] << 8, F = A + z;
        if (F > r) {
          if (c)
            throw "unexpected EOF";
          break;
        }
        o && p(g + z), n.set(v.subarray(A, F), g), s.b = g += z, s.p = d = F * 8;
        continue;
      }
      if (d > R) {
        if (c)
          throw "unexpected EOF";
        break;
      }
    }
    o && p(g + 131072);
    for (var ee = (1 << y) - 1, X = (1 << P) - 1, Te = d; ; Te = d) {
      var _e = w[so(v, d) & ee], fe = _e >>> 4;
      if (d += _e & 15, d > R) {
        if (c)
          throw "unexpected EOF";
        break;
      }
      if (!_e)
        throw "invalid length/literal";
      if (fe < 256)
        n[g++] = fe;
      else if (fe == 256) {
        Te = d, w = null;
        break;
      } else {
        var ae = fe - 254;
        if (fe > 264) {
          var O = fe - 257, ne = ja[O];
          ae = xt2(v, d, (1 << ne) - 1) + Ka[O], d += ne;
        }
        var ge = _2[so(v, d) & X], S = ge >>> 4;
        if (!ge)
          throw "invalid distance";
        d += ge & 15;
        var he = Wu[S];
        if (S > 3) {
          var ne = Ua[S];
          he += so(v, d) & (1 << ne) - 1, d += ne;
        }
        if (d > R) {
          if (c)
            throw "unexpected EOF";
          break;
        }
        o && p(g + 131072);
        for (var le = g + ae; g < le; g += 4)
          n[g] = n[g - he], n[g + 1] = n[g + 1 - he], n[g + 2] = n[g + 2 - he], n[g + 3] = n[g + 3 - he];
        g = le;
      }
    }
    s.l = w, s.p = Te, s.b = g, w && (h = 1, s.m = y, s.d = _2, s.n = P);
  } while (!h);
  return g == n.length ? n : np(n, 0, g);
};
var sp = new mt(0);
var rp = function(v) {
  if ((v[0] & 15) != 8 || v[0] >>> 4 > 7 || (v[0] << 8 | v[1]) % 31)
    throw "invalid zlib data";
  if (v[1] & 32)
    throw "invalid zlib data: preset dictionaries not supported";
};
function op(v, n) {
  return ip((rp(v), v.subarray(2, -4)), n);
}
var ap = typeof TextDecoder < "u" && new TextDecoder();
var lp = 0;
try {
  ap.decode(sp, { stream: true }), lp = 1;
} catch {
}
var cp = class extends Object3D {
  // events
  constructor(n, s) {
    super(), C(this, "isTransformControls", true), C(this, "visible", false), C(this, "domElement", void 0), C(this, "raycaster", new Raycaster()), C(this, "gizmo", void 0), C(this, "plane", void 0), C(this, "tempVector", new Vector3()), C(this, "tempVector2", new Vector3()), C(this, "tempQuaternion", new Quaternion()), C(this, "unit", {
      X: new Vector3(1, 0, 0),
      Y: new Vector3(0, 1, 0),
      Z: new Vector3(0, 0, 1)
    }), C(this, "pointStart", new Vector3()), C(this, "pointEnd", new Vector3()), C(this, "offset", new Vector3()), C(this, "rotationAxis", new Vector3()), C(this, "startNorm", new Vector3()), C(this, "endNorm", new Vector3()), C(this, "rotationAngle", 0), C(this, "cameraPosition", new Vector3()), C(this, "cameraQuaternion", new Quaternion()), C(this, "cameraScale", new Vector3()), C(this, "parentPosition", new Vector3()), C(this, "parentQuaternion", new Quaternion()), C(this, "parentQuaternionInv", new Quaternion()), C(this, "parentScale", new Vector3()), C(this, "worldPositionStart", new Vector3()), C(this, "worldQuaternionStart", new Quaternion()), C(this, "worldScaleStart", new Vector3()), C(this, "worldPosition", new Vector3()), C(this, "worldQuaternion", new Quaternion()), C(this, "worldQuaternionInv", new Quaternion()), C(this, "worldScale", new Vector3()), C(this, "eye", new Vector3()), C(this, "positionStart", new Vector3()), C(this, "quaternionStart", new Quaternion()), C(this, "scaleStart", new Vector3()), C(this, "camera", void 0), C(this, "object", void 0), C(this, "enabled", true), C(this, "axis", null), C(this, "mode", "translate"), C(this, "translationSnap", null), C(this, "rotationSnap", null), C(this, "scaleSnap", null), C(this, "space", "world"), C(this, "size", 1), C(this, "dragging", false), C(this, "showX", true), C(this, "showY", true), C(this, "showZ", true), C(this, "changeEvent", {
      type: "change"
    }), C(this, "mouseDownEvent", {
      type: "mouseDown",
      mode: this.mode
    }), C(this, "mouseUpEvent", {
      type: "mouseUp",
      mode: this.mode
    }), C(this, "objectChangeEvent", {
      type: "objectChange"
    }), C(this, "intersectObjectWithRay", (o, c, p) => {
      const h = c.intersectObject(o, true);
      for (let d = 0; d < h.length; d++)
        if (h[d].object.visible || p)
          return h[d];
      return false;
    }), C(this, "attach", (o) => (this.object = o, this.visible = true, this)), C(this, "detach", () => (this.object = void 0, this.visible = false, this.axis = null, this)), C(this, "reset", () => this.enabled ? (this.dragging && this.object !== void 0 && (this.object.position.copy(this.positionStart), this.object.quaternion.copy(this.quaternionStart), this.object.scale.copy(this.scaleStart), this.dispatchEvent(this.changeEvent), this.dispatchEvent(this.objectChangeEvent), this.pointStart.copy(this.pointEnd)), this) : this), C(this, "updateMatrixWorld", () => {
      this.object !== void 0 && (this.object.updateMatrixWorld(), this.object.parent === null ? console.error("TransformControls: The attached 3D object must be a part of the scene graph.") : this.object.parent.matrixWorld.decompose(this.parentPosition, this.parentQuaternion, this.parentScale), this.object.matrixWorld.decompose(this.worldPosition, this.worldQuaternion, this.worldScale), this.parentQuaternionInv.copy(this.parentQuaternion).invert(), this.worldQuaternionInv.copy(this.worldQuaternion).invert()), this.camera.updateMatrixWorld(), this.camera.matrixWorld.decompose(this.cameraPosition, this.cameraQuaternion, this.cameraScale), this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(), super.updateMatrixWorld();
    }), C(this, "pointerHover", (o) => {
      if (this.object === void 0 || this.dragging === true)
        return;
      this.raycaster.setFromCamera(o, this.camera);
      const c = this.intersectObjectWithRay(this.gizmo.picker[this.mode], this.raycaster);
      c ? this.axis = c.object.name : this.axis = null;
    }), C(this, "pointerDown", (o) => {
      if (!(this.object === void 0 || this.dragging === true || o.button !== 0) && this.axis !== null) {
        this.raycaster.setFromCamera(o, this.camera);
        const c = this.intersectObjectWithRay(this.plane, this.raycaster, true);
        if (c) {
          let p = this.space;
          if (this.mode === "scale" ? p = "local" : (this.axis === "E" || this.axis === "XYZE" || this.axis === "XYZ") && (p = "world"), p === "local" && this.mode === "rotate") {
            const h = this.rotationSnap;
            this.axis === "X" && h && (this.object.rotation.x = Math.round(this.object.rotation.x / h) * h), this.axis === "Y" && h && (this.object.rotation.y = Math.round(this.object.rotation.y / h) * h), this.axis === "Z" && h && (this.object.rotation.z = Math.round(this.object.rotation.z / h) * h);
          }
          this.object.updateMatrixWorld(), this.object.parent && this.object.parent.updateMatrixWorld(), this.positionStart.copy(this.object.position), this.quaternionStart.copy(this.object.quaternion), this.scaleStart.copy(this.object.scale), this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this.worldScaleStart), this.pointStart.copy(c.point).sub(this.worldPositionStart);
        }
        this.dragging = true, this.mouseDownEvent.mode = this.mode, this.dispatchEvent(this.mouseDownEvent);
      }
    }), C(this, "pointerMove", (o) => {
      const c = this.axis, p = this.mode, h = this.object;
      let d = this.space;
      if (p === "scale" ? d = "local" : (c === "E" || c === "XYZE" || c === "XYZ") && (d = "world"), h === void 0 || c === null || this.dragging === false || o.button !== -1)
        return;
      this.raycaster.setFromCamera(o, this.camera);
      const g = this.intersectObjectWithRay(this.plane, this.raycaster, true);
      if (g) {
        if (this.pointEnd.copy(g.point).sub(this.worldPositionStart), p === "translate")
          this.offset.copy(this.pointEnd).sub(this.pointStart), d === "local" && c !== "XYZ" && this.offset.applyQuaternion(this.worldQuaternionInv), c.indexOf("X") === -1 && (this.offset.x = 0), c.indexOf("Y") === -1 && (this.offset.y = 0), c.indexOf("Z") === -1 && (this.offset.z = 0), d === "local" && c !== "XYZ" ? this.offset.applyQuaternion(this.quaternionStart).divide(this.parentScale) : this.offset.applyQuaternion(this.parentQuaternionInv).divide(this.parentScale), h.position.copy(this.offset).add(this.positionStart), this.translationSnap && (d === "local" && (h.position.applyQuaternion(this.tempQuaternion.copy(this.quaternionStart).invert()), c.search("X") !== -1 && (h.position.x = Math.round(h.position.x / this.translationSnap) * this.translationSnap), c.search("Y") !== -1 && (h.position.y = Math.round(h.position.y / this.translationSnap) * this.translationSnap), c.search("Z") !== -1 && (h.position.z = Math.round(h.position.z / this.translationSnap) * this.translationSnap), h.position.applyQuaternion(this.quaternionStart)), d === "world" && (h.parent && h.position.add(this.tempVector.setFromMatrixPosition(h.parent.matrixWorld)), c.search("X") !== -1 && (h.position.x = Math.round(h.position.x / this.translationSnap) * this.translationSnap), c.search("Y") !== -1 && (h.position.y = Math.round(h.position.y / this.translationSnap) * this.translationSnap), c.search("Z") !== -1 && (h.position.z = Math.round(h.position.z / this.translationSnap) * this.translationSnap), h.parent && h.position.sub(this.tempVector.setFromMatrixPosition(h.parent.matrixWorld))));
        else if (p === "scale") {
          if (c.search("XYZ") !== -1) {
            let w = this.pointEnd.length() / this.pointStart.length();
            this.pointEnd.dot(this.pointStart) < 0 && (w *= -1), this.tempVector2.set(w, w, w);
          } else
            this.tempVector.copy(this.pointStart), this.tempVector2.copy(this.pointEnd), this.tempVector.applyQuaternion(this.worldQuaternionInv), this.tempVector2.applyQuaternion(this.worldQuaternionInv), this.tempVector2.divide(this.tempVector), c.search("X") === -1 && (this.tempVector2.x = 1), c.search("Y") === -1 && (this.tempVector2.y = 1), c.search("Z") === -1 && (this.tempVector2.z = 1);
          h.scale.copy(this.scaleStart).multiply(this.tempVector2), this.scaleSnap && this.object && (c.search("X") !== -1 && (this.object.scale.x = Math.round(h.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap), c.search("Y") !== -1 && (h.scale.y = Math.round(h.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap), c.search("Z") !== -1 && (h.scale.z = Math.round(h.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap));
        } else if (p === "rotate") {
          this.offset.copy(this.pointEnd).sub(this.pointStart);
          const w = 20 / this.worldPosition.distanceTo(this.tempVector.setFromMatrixPosition(this.camera.matrixWorld));
          c === "E" ? (this.rotationAxis.copy(this.eye), this.rotationAngle = this.pointEnd.angleTo(this.pointStart), this.startNorm.copy(this.pointStart).normalize(), this.endNorm.copy(this.pointEnd).normalize(), this.rotationAngle *= this.endNorm.cross(this.startNorm).dot(this.eye) < 0 ? 1 : -1) : c === "XYZE" ? (this.rotationAxis.copy(this.offset).cross(this.eye).normalize(), this.rotationAngle = this.offset.dot(this.tempVector.copy(this.rotationAxis).cross(this.eye)) * w) : (c === "X" || c === "Y" || c === "Z") && (this.rotationAxis.copy(this.unit[c]), this.tempVector.copy(this.unit[c]), d === "local" && this.tempVector.applyQuaternion(this.worldQuaternion), this.rotationAngle = this.offset.dot(this.tempVector.cross(this.eye).normalize()) * w), this.rotationSnap && (this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap), d === "local" && c !== "E" && c !== "XYZE" ? (h.quaternion.copy(this.quaternionStart), h.quaternion.multiply(this.tempQuaternion.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize()) : (this.rotationAxis.applyQuaternion(this.parentQuaternionInv), h.quaternion.copy(this.tempQuaternion.setFromAxisAngle(this.rotationAxis, this.rotationAngle)), h.quaternion.multiply(this.quaternionStart).normalize());
        }
        this.dispatchEvent(this.changeEvent), this.dispatchEvent(this.objectChangeEvent);
      }
    }), C(this, "pointerUp", (o) => {
      o.button === 0 && (this.dragging && this.axis !== null && (this.mouseUpEvent.mode = this.mode, this.dispatchEvent(this.mouseUpEvent)), this.dragging = false, this.axis = null);
    }), C(this, "getPointer", (o) => {
      var c;
      if (this.domElement && (c = this.domElement.ownerDocument) !== null && c !== void 0 && c.pointerLockElement)
        return {
          x: 0,
          y: 0,
          button: o.button
        };
      {
        var p;
        const h = o.changedTouches ? o.changedTouches[0] : o, d = (p = this.domElement) === null || p === void 0 ? void 0 : p.getBoundingClientRect();
        return {
          x: (h.clientX - d.left) / d.width * 2 - 1,
          y: -(h.clientY - d.top) / d.height * 2 + 1,
          button: o.button
        };
      }
    }), C(this, "onPointerHover", (o) => {
      if (this.enabled)
        switch (o.pointerType) {
          case "mouse":
          case "pen":
            this.pointerHover(this.getPointer(o));
            break;
        }
    }), C(this, "onPointerDown", (o) => {
      !this.enabled || !this.domElement || (this.domElement.style.touchAction = "none", this.domElement.ownerDocument.addEventListener("pointermove", this.onPointerMove), this.pointerHover(this.getPointer(o)), this.pointerDown(this.getPointer(o)));
    }), C(this, "onPointerMove", (o) => {
      this.enabled && this.pointerMove(this.getPointer(o));
    }), C(this, "onPointerUp", (o) => {
      !this.enabled || !this.domElement || (this.domElement.style.touchAction = "", this.domElement.ownerDocument.removeEventListener("pointermove", this.onPointerMove), this.pointerUp(this.getPointer(o)));
    }), C(this, "getMode", () => this.mode), C(this, "setMode", (o) => {
      this.mode = o;
    }), C(this, "setTranslationSnap", (o) => {
      this.translationSnap = o;
    }), C(this, "setRotationSnap", (o) => {
      this.rotationSnap = o;
    }), C(this, "setScaleSnap", (o) => {
      this.scaleSnap = o;
    }), C(this, "setSize", (o) => {
      this.size = o;
    }), C(this, "setSpace", (o) => {
      this.space = o;
    }), C(this, "update", () => {
      console.warn("THREE.TransformControls: update function has no more functionality and therefore has been deprecated.");
    }), C(this, "connect", (o) => {
      o === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'), this.domElement = o, this.domElement.addEventListener("pointerdown", this.onPointerDown), this.domElement.addEventListener("pointermove", this.onPointerHover), this.domElement.ownerDocument.addEventListener("pointerup", this.onPointerUp);
    }), C(this, "dispose", () => {
      var o, c, p, h, d, g;
      (o = this.domElement) === null || o === void 0 || o.removeEventListener("pointerdown", this.onPointerDown), (c = this.domElement) === null || c === void 0 || c.removeEventListener("pointermove", this.onPointerHover), (p = this.domElement) === null || p === void 0 || (h = p.ownerDocument) === null || h === void 0 || h.removeEventListener("pointermove", this.onPointerMove), (d = this.domElement) === null || d === void 0 || (g = d.ownerDocument) === null || g === void 0 || g.removeEventListener("pointerup", this.onPointerUp), this.traverse((w) => {
        const _2 = w;
        _2.geometry && _2.geometry.dispose(), _2.material && _2.material.dispose();
      });
    }), this.domElement = s, this.camera = n, this.gizmo = new up(), this.add(this.gizmo), this.plane = new pp(), this.add(this.plane);
    const r = (o, c) => {
      let p = c;
      Object.defineProperty(this, o, {
        get: function() {
          return p !== void 0 ? p : c;
        },
        set: function(h) {
          p !== h && (p = h, this.plane[o] = h, this.gizmo[o] = h, this.dispatchEvent({
            type: o + "-changed",
            value: h
          }), this.dispatchEvent(this.changeEvent));
        }
      }), this[o] = c, this.plane[o] = c, this.gizmo[o] = c;
    };
    r("camera", this.camera), r("object", this.object), r("enabled", this.enabled), r("axis", this.axis), r("mode", this.mode), r("translationSnap", this.translationSnap), r("rotationSnap", this.rotationSnap), r("scaleSnap", this.scaleSnap), r("space", this.space), r("size", this.size), r("dragging", this.dragging), r("showX", this.showX), r("showY", this.showY), r("showZ", this.showZ), r("worldPosition", this.worldPosition), r("worldPositionStart", this.worldPositionStart), r("worldQuaternion", this.worldQuaternion), r("worldQuaternionStart", this.worldQuaternionStart), r("cameraPosition", this.cameraPosition), r("cameraQuaternion", this.cameraQuaternion), r("pointStart", this.pointStart), r("pointEnd", this.pointEnd), r("rotationAxis", this.rotationAxis), r("rotationAngle", this.rotationAngle), r("eye", this.eye), s !== void 0 && this.connect(s);
  }
};
var up = class extends Object3D {
  // these are set from parent class TransformControls
  constructor() {
    super(), C(this, "isTransformControlsGizmo", true), C(this, "type", "TransformControlsGizmo"), C(this, "tempVector", new Vector3(0, 0, 0)), C(this, "tempEuler", new Euler()), C(this, "alignVector", new Vector3(0, 1, 0)), C(this, "zeroVector", new Vector3(0, 0, 0)), C(this, "lookAtMatrix", new Matrix4()), C(this, "tempQuaternion", new Quaternion()), C(this, "tempQuaternion2", new Quaternion()), C(this, "identityQuaternion", new Quaternion()), C(this, "unitX", new Vector3(1, 0, 0)), C(this, "unitY", new Vector3(0, 1, 0)), C(this, "unitZ", new Vector3(0, 0, 1)), C(this, "gizmo", void 0), C(this, "picker", void 0), C(this, "helper", void 0), C(this, "rotationAxis", new Vector3()), C(this, "cameraPosition", new Vector3()), C(this, "worldPositionStart", new Vector3()), C(this, "worldQuaternionStart", new Quaternion()), C(this, "worldPosition", new Vector3()), C(this, "worldQuaternion", new Quaternion()), C(this, "eye", new Vector3()), C(this, "camera", null), C(this, "enabled", true), C(this, "axis", null), C(this, "mode", "translate"), C(this, "space", "world"), C(this, "size", 1), C(this, "dragging", false), C(this, "showX", true), C(this, "showY", true), C(this, "showZ", true), C(this, "updateMatrixWorld", () => {
      let fe = this.space;
      this.mode === "scale" && (fe = "local");
      const ae = fe === "local" ? this.worldQuaternion : this.identityQuaternion;
      this.gizmo.translate.visible = this.mode === "translate", this.gizmo.rotate.visible = this.mode === "rotate", this.gizmo.scale.visible = this.mode === "scale", this.helper.translate.visible = this.mode === "translate", this.helper.rotate.visible = this.mode === "rotate", this.helper.scale.visible = this.mode === "scale";
      let ne = [];
      ne = ne.concat(this.picker[this.mode].children), ne = ne.concat(this.gizmo[this.mode].children), ne = ne.concat(this.helper[this.mode].children);
      for (let ge = 0; ge < ne.length; ge++) {
        const S = ne[ge];
        S.visible = true, S.rotation.set(0, 0, 0), S.position.copy(this.worldPosition);
        let le;
        if (this.camera.isOrthographicCamera ? le = (this.camera.top - this.camera.bottom) / this.camera.zoom : le = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7), S.scale.set(1, 1, 1).multiplyScalar(le * this.size / 7), S.tag === "helper") {
          S.visible = false, S.name === "AXIS" ? (S.position.copy(this.worldPositionStart), S.visible = !!this.axis, this.axis === "X" && (this.tempQuaternion.setFromEuler(this.tempEuler.set(0, 0, 0)), S.quaternion.copy(ae).multiply(this.tempQuaternion), Math.abs(this.alignVector.copy(this.unitX).applyQuaternion(ae).dot(this.eye)) > 0.9 && (S.visible = false)), this.axis === "Y" && (this.tempQuaternion.setFromEuler(this.tempEuler.set(0, 0, Math.PI / 2)), S.quaternion.copy(ae).multiply(this.tempQuaternion), Math.abs(this.alignVector.copy(this.unitY).applyQuaternion(ae).dot(this.eye)) > 0.9 && (S.visible = false)), this.axis === "Z" && (this.tempQuaternion.setFromEuler(this.tempEuler.set(0, Math.PI / 2, 0)), S.quaternion.copy(ae).multiply(this.tempQuaternion), Math.abs(this.alignVector.copy(this.unitZ).applyQuaternion(ae).dot(this.eye)) > 0.9 && (S.visible = false)), this.axis === "XYZE" && (this.tempQuaternion.setFromEuler(this.tempEuler.set(0, Math.PI / 2, 0)), this.alignVector.copy(this.rotationAxis), S.quaternion.setFromRotationMatrix(this.lookAtMatrix.lookAt(this.zeroVector, this.alignVector, this.unitY)), S.quaternion.multiply(this.tempQuaternion), S.visible = this.dragging), this.axis === "E" && (S.visible = false)) : S.name === "START" ? (S.position.copy(this.worldPositionStart), S.visible = this.dragging) : S.name === "END" ? (S.position.copy(this.worldPosition), S.visible = this.dragging) : S.name === "DELTA" ? (S.position.copy(this.worldPositionStart), S.quaternion.copy(this.worldQuaternionStart), this.tempVector.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1), this.tempVector.applyQuaternion(this.worldQuaternionStart.clone().invert()), S.scale.copy(this.tempVector), S.visible = this.dragging) : (S.quaternion.copy(ae), this.dragging ? S.position.copy(this.worldPositionStart) : S.position.copy(this.worldPosition), this.axis && (S.visible = this.axis.search(S.name) !== -1));
          continue;
        }
        S.quaternion.copy(ae), this.mode === "translate" || this.mode === "scale" ? ((S.name === "X" || S.name === "XYZX") && Math.abs(this.alignVector.copy(this.unitX).applyQuaternion(ae).dot(this.eye)) > 0.99 && (S.scale.set(1e-10, 1e-10, 1e-10), S.visible = false), (S.name === "Y" || S.name === "XYZY") && Math.abs(this.alignVector.copy(this.unitY).applyQuaternion(ae).dot(this.eye)) > 0.99 && (S.scale.set(1e-10, 1e-10, 1e-10), S.visible = false), (S.name === "Z" || S.name === "XYZZ") && Math.abs(this.alignVector.copy(this.unitZ).applyQuaternion(ae).dot(this.eye)) > 0.99 && (S.scale.set(1e-10, 1e-10, 1e-10), S.visible = false), S.name === "XY" && Math.abs(this.alignVector.copy(this.unitZ).applyQuaternion(ae).dot(this.eye)) < 0.2 && (S.scale.set(1e-10, 1e-10, 1e-10), S.visible = false), S.name === "YZ" && Math.abs(this.alignVector.copy(this.unitX).applyQuaternion(ae).dot(this.eye)) < 0.2 && (S.scale.set(1e-10, 1e-10, 1e-10), S.visible = false), S.name === "XZ" && Math.abs(this.alignVector.copy(this.unitY).applyQuaternion(ae).dot(this.eye)) < 0.2 && (S.scale.set(1e-10, 1e-10, 1e-10), S.visible = false), S.name.search("X") !== -1 && (this.alignVector.copy(this.unitX).applyQuaternion(ae).dot(this.eye) < 0 ? S.tag === "fwd" ? S.visible = false : S.scale.x *= -1 : S.tag === "bwd" && (S.visible = false)), S.name.search("Y") !== -1 && (this.alignVector.copy(this.unitY).applyQuaternion(ae).dot(this.eye) < 0 ? S.tag === "fwd" ? S.visible = false : S.scale.y *= -1 : S.tag === "bwd" && (S.visible = false)), S.name.search("Z") !== -1 && (this.alignVector.copy(this.unitZ).applyQuaternion(ae).dot(this.eye) < 0 ? S.tag === "fwd" ? S.visible = false : S.scale.z *= -1 : S.tag === "bwd" && (S.visible = false))) : this.mode === "rotate" && (this.tempQuaternion2.copy(ae), this.alignVector.copy(this.eye).applyQuaternion(this.tempQuaternion.copy(ae).invert()), S.name.search("E") !== -1 && S.quaternion.setFromRotationMatrix(this.lookAtMatrix.lookAt(this.eye, this.zeroVector, this.unitY)), S.name === "X" && (this.tempQuaternion.setFromAxisAngle(this.unitX, Math.atan2(-this.alignVector.y, this.alignVector.z)), this.tempQuaternion.multiplyQuaternions(this.tempQuaternion2, this.tempQuaternion), S.quaternion.copy(this.tempQuaternion)), S.name === "Y" && (this.tempQuaternion.setFromAxisAngle(this.unitY, Math.atan2(this.alignVector.x, this.alignVector.z)), this.tempQuaternion.multiplyQuaternions(this.tempQuaternion2, this.tempQuaternion), S.quaternion.copy(this.tempQuaternion)), S.name === "Z" && (this.tempQuaternion.setFromAxisAngle(this.unitZ, Math.atan2(this.alignVector.y, this.alignVector.x)), this.tempQuaternion.multiplyQuaternions(this.tempQuaternion2, this.tempQuaternion), S.quaternion.copy(this.tempQuaternion))), S.visible = S.visible && (S.name.indexOf("X") === -1 || this.showX), S.visible = S.visible && (S.name.indexOf("Y") === -1 || this.showY), S.visible = S.visible && (S.name.indexOf("Z") === -1 || this.showZ), S.visible = S.visible && (S.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ), S.material.tempOpacity = S.material.tempOpacity || S.material.opacity, S.material.tempColor = S.material.tempColor || S.material.color.clone(), S.material.color.copy(S.material.tempColor), S.material.opacity = S.material.tempOpacity, this.enabled ? this.axis && (S.name === this.axis ? (S.material.opacity = 1, S.material.color.lerp(new Color(1, 1, 1), 0.5)) : this.axis.split("").some(function(Fe) {
          return S.name === Fe;
        }) ? (S.material.opacity = 1, S.material.color.lerp(new Color(1, 1, 1), 0.5)) : (S.material.opacity *= 0.25, S.material.color.lerp(new Color(1, 1, 1), 0.5))) : (S.material.opacity *= 0.5, S.material.color.lerp(new Color(1, 1, 1), 0.5));
      }
      super.updateMatrixWorld();
    });
    const n = new MeshBasicMaterial({
      depthTest: false,
      depthWrite: false,
      transparent: true,
      side: DoubleSide,
      fog: false,
      toneMapped: false
    }), s = new LineBasicMaterial({
      depthTest: false,
      depthWrite: false,
      transparent: true,
      linewidth: 1,
      fog: false,
      toneMapped: false
    }), r = n.clone();
    r.opacity = 0.15;
    const o = n.clone();
    o.opacity = 0.33;
    const c = n.clone();
    c.color.set(16711680);
    const p = n.clone();
    p.color.set(65280);
    const h = n.clone();
    h.color.set(255);
    const d = n.clone();
    d.opacity = 0.25;
    const g = d.clone();
    g.color.set(16776960);
    const w = d.clone();
    w.color.set(65535);
    const _2 = d.clone();
    _2.color.set(16711935), n.clone().color.set(16776960);
    const P = s.clone();
    P.color.set(16711680);
    const R = s.clone();
    R.color.set(65280);
    const k = s.clone();
    k.color.set(255);
    const A = s.clone();
    A.color.set(65535);
    const z = s.clone();
    z.color.set(16711935);
    const F = s.clone();
    F.color.set(16776960);
    const I = s.clone();
    I.color.set(7895160);
    const D2 = F.clone();
    D2.opacity = 0.25;
    const Y = new CylinderGeometry(0, 0.05, 0.2, 12, 1, false), G = new BoxGeometry(0.125, 0.125, 0.125), N = new BufferGeometry();
    N.setAttribute("position", new Float32BufferAttribute([0, 0, 0, 1, 0, 0], 3));
    const O = (fe, ae) => {
      const ne = new BufferGeometry(), ge = [];
      for (let S = 0; S <= 64 * ae; ++S)
        ge.push(0, Math.cos(S / 32 * Math.PI) * fe, Math.sin(S / 32 * Math.PI) * fe);
      return ne.setAttribute("position", new Float32BufferAttribute(ge, 3)), ne;
    }, H = () => {
      const fe = new BufferGeometry();
      return fe.setAttribute("position", new Float32BufferAttribute([0, 0, 0, 1, 1, 1], 3)), fe;
    }, K = {
      X: [[new Mesh(Y, c), [1, 0, 0], [0, 0, -Math.PI / 2], null, "fwd"], [new Mesh(Y, c), [1, 0, 0], [0, 0, Math.PI / 2], null, "bwd"], [new Line(N, P)]],
      Y: [[new Mesh(Y, p), [0, 1, 0], null, null, "fwd"], [new Mesh(Y, p), [0, 1, 0], [Math.PI, 0, 0], null, "bwd"], [new Line(N, R), null, [0, 0, Math.PI / 2]]],
      Z: [[new Mesh(Y, h), [0, 0, 1], [Math.PI / 2, 0, 0], null, "fwd"], [new Mesh(Y, h), [0, 0, 1], [-Math.PI / 2, 0, 0], null, "bwd"], [new Line(N, k), null, [0, -Math.PI / 2, 0]]],
      XYZ: [[new Mesh(new OctahedronGeometry(0.1, 0), d.clone()), [0, 0, 0], [0, 0, 0]]],
      XY: [[new Mesh(new PlaneGeometry(0.295, 0.295), g.clone()), [0.15, 0.15, 0]], [new Line(N, F), [0.18, 0.3, 0], null, [0.125, 1, 1]], [new Line(N, F), [0.3, 0.18, 0], [0, 0, Math.PI / 2], [0.125, 1, 1]]],
      YZ: [[new Mesh(new PlaneGeometry(0.295, 0.295), w.clone()), [0, 0.15, 0.15], [0, Math.PI / 2, 0]], [new Line(N, A), [0, 0.18, 0.3], [0, 0, Math.PI / 2], [0.125, 1, 1]], [new Line(N, A), [0, 0.3, 0.18], [0, -Math.PI / 2, 0], [0.125, 1, 1]]],
      XZ: [[new Mesh(new PlaneGeometry(0.295, 0.295), _2.clone()), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]], [new Line(N, z), [0.18, 0, 0.3], null, [0.125, 1, 1]], [new Line(N, z), [0.3, 0, 0.18], [0, -Math.PI / 2, 0], [0.125, 1, 1]]]
    }, q = {
      X: [[new Mesh(new CylinderGeometry(0.2, 0, 1, 4, 1, false), r), [0.6, 0, 0], [0, 0, -Math.PI / 2]]],
      Y: [[new Mesh(new CylinderGeometry(0.2, 0, 1, 4, 1, false), r), [0, 0.6, 0]]],
      Z: [[new Mesh(new CylinderGeometry(0.2, 0, 1, 4, 1, false), r), [0, 0, 0.6], [Math.PI / 2, 0, 0]]],
      XYZ: [[new Mesh(new OctahedronGeometry(0.2, 0), r)]],
      XY: [[new Mesh(new PlaneGeometry(0.4, 0.4), r), [0.2, 0.2, 0]]],
      YZ: [[new Mesh(new PlaneGeometry(0.4, 0.4), r), [0, 0.2, 0.2], [0, Math.PI / 2, 0]]],
      XZ: [[new Mesh(new PlaneGeometry(0.4, 0.4), r), [0.2, 0, 0.2], [-Math.PI / 2, 0, 0]]]
    }, pe = {
      START: [[new Mesh(new OctahedronGeometry(0.01, 2), o), null, null, null, "helper"]],
      END: [[new Mesh(new OctahedronGeometry(0.01, 2), o), null, null, null, "helper"]],
      DELTA: [[new Line(H(), o), null, null, null, "helper"]],
      X: [[new Line(N, o.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]],
      Y: [[new Line(N, o.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]],
      Z: [[new Line(N, o.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]]
    }, _e = {
      X: [[new Line(O(1, 0.5), P)], [new Mesh(new OctahedronGeometry(0.04, 0), c), [0, 0, 0.99], null, [1, 3, 1]]],
      Y: [[new Line(O(1, 0.5), R), null, [0, 0, -Math.PI / 2]], [new Mesh(new OctahedronGeometry(0.04, 0), p), [0, 0, 0.99], null, [3, 1, 1]]],
      Z: [[new Line(O(1, 0.5), k), null, [0, Math.PI / 2, 0]], [new Mesh(new OctahedronGeometry(0.04, 0), h), [0.99, 0, 0], null, [1, 3, 1]]],
      E: [[new Line(O(1.25, 1), D2), null, [0, Math.PI / 2, 0]], [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), D2), [1.17, 0, 0], [0, 0, -Math.PI / 2], [1, 1, 1e-3]], [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), D2), [-1.17, 0, 0], [0, 0, Math.PI / 2], [1, 1, 1e-3]], [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), D2), [0, -1.17, 0], [Math.PI, 0, 0], [1, 1, 1e-3]], [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), D2), [0, 1.17, 0], [0, 0, 0], [1, 1, 1e-3]]],
      XYZE: [[new Line(O(1, 1), I), null, [0, Math.PI / 2, 0]]]
    }, ce = {
      AXIS: [[new Line(N, o.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]]
    }, me = {
      X: [[new Mesh(new TorusGeometry(1, 0.1, 4, 24), r), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]],
      Y: [[new Mesh(new TorusGeometry(1, 0.1, 4, 24), r), [0, 0, 0], [Math.PI / 2, 0, 0]]],
      Z: [[new Mesh(new TorusGeometry(1, 0.1, 4, 24), r), [0, 0, 0], [0, 0, -Math.PI / 2]]],
      E: [[new Mesh(new TorusGeometry(1.25, 0.1, 2, 24), r)]],
      XYZE: [[new Mesh(new SphereGeometry(0.7, 10, 8), r)]]
    }, he = {
      X: [[new Mesh(G, c), [0.8, 0, 0], [0, 0, -Math.PI / 2]], [new Line(N, P), null, null, [0.8, 1, 1]]],
      Y: [[new Mesh(G, p), [0, 0.8, 0]], [new Line(N, R), null, [0, 0, Math.PI / 2], [0.8, 1, 1]]],
      Z: [[new Mesh(G, h), [0, 0, 0.8], [Math.PI / 2, 0, 0]], [new Line(N, k), null, [0, -Math.PI / 2, 0], [0.8, 1, 1]]],
      XY: [[new Mesh(G, g), [0.85, 0.85, 0], null, [2, 2, 0.2]], [new Line(N, F), [0.855, 0.98, 0], null, [0.125, 1, 1]], [new Line(N, F), [0.98, 0.855, 0], [0, 0, Math.PI / 2], [0.125, 1, 1]]],
      YZ: [[new Mesh(G, w), [0, 0.85, 0.85], null, [0.2, 2, 2]], [new Line(N, A), [0, 0.855, 0.98], [0, 0, Math.PI / 2], [0.125, 1, 1]], [new Line(N, A), [0, 0.98, 0.855], [0, -Math.PI / 2, 0], [0.125, 1, 1]]],
      XZ: [[new Mesh(G, _2), [0.85, 0, 0.85], null, [2, 0.2, 2]], [new Line(N, z), [0.855, 0, 0.98], null, [0.125, 1, 1]], [new Line(N, z), [0.98, 0, 0.855], [0, -Math.PI / 2, 0], [0.125, 1, 1]]],
      XYZX: [[new Mesh(new BoxGeometry(0.125, 0.125, 0.125), d.clone()), [1.1, 0, 0]]],
      XYZY: [[new Mesh(new BoxGeometry(0.125, 0.125, 0.125), d.clone()), [0, 1.1, 0]]],
      XYZZ: [[new Mesh(new BoxGeometry(0.125, 0.125, 0.125), d.clone()), [0, 0, 1.1]]]
    }, ee = {
      X: [[new Mesh(new CylinderGeometry(0.2, 0, 0.8, 4, 1, false), r), [0.5, 0, 0], [0, 0, -Math.PI / 2]]],
      Y: [[new Mesh(new CylinderGeometry(0.2, 0, 0.8, 4, 1, false), r), [0, 0.5, 0]]],
      Z: [[new Mesh(new CylinderGeometry(0.2, 0, 0.8, 4, 1, false), r), [0, 0, 0.5], [Math.PI / 2, 0, 0]]],
      XY: [[new Mesh(G, r), [0.85, 0.85, 0], null, [3, 3, 0.2]]],
      YZ: [[new Mesh(G, r), [0, 0.85, 0.85], null, [0.2, 3, 3]]],
      XZ: [[new Mesh(G, r), [0.85, 0, 0.85], null, [3, 0.2, 3]]],
      XYZX: [[new Mesh(new BoxGeometry(0.2, 0.2, 0.2), r), [1.1, 0, 0]]],
      XYZY: [[new Mesh(new BoxGeometry(0.2, 0.2, 0.2), r), [0, 1.1, 0]]],
      XYZZ: [[new Mesh(new BoxGeometry(0.2, 0.2, 0.2), r), [0, 0, 1.1]]]
    }, X = {
      X: [[new Line(N, o.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]],
      Y: [[new Line(N, o.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]],
      Z: [[new Line(N, o.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]]
    }, Te = (fe) => {
      const ae = new Object3D();
      for (let ne in fe)
        for (let ge = fe[ne].length; ge--; ) {
          const S = fe[ne][ge][0].clone(), le = fe[ne][ge][1], Fe = fe[ne][ge][2], Ue = fe[ne][ge][3], ye = fe[ne][ge][4];
          S.name = ne, S.tag = ye, le && S.position.set(le[0], le[1], le[2]), Fe && S.rotation.set(Fe[0], Fe[1], Fe[2]), Ue && S.scale.set(Ue[0], Ue[1], Ue[2]), S.updateMatrix();
          const rt = S.geometry.clone();
          rt.applyMatrix4(S.matrix), S.geometry = rt, S.renderOrder = 1 / 0, S.position.set(0, 0, 0), S.rotation.set(0, 0, 0), S.scale.set(1, 1, 1), ae.add(S);
        }
      return ae;
    };
    this.gizmo = {}, this.picker = {}, this.helper = {}, this.add(this.gizmo.translate = Te(K)), this.add(this.gizmo.rotate = Te(_e)), this.add(this.gizmo.scale = Te(he)), this.add(this.picker.translate = Te(q)), this.add(this.picker.rotate = Te(me)), this.add(this.picker.scale = Te(ee)), this.add(this.helper.translate = Te(pe)), this.add(this.helper.rotate = Te(ce)), this.add(this.helper.scale = Te(X)), this.picker.translate.visible = false, this.picker.rotate.visible = false, this.picker.scale.visible = false;
  }
  // updateMatrixWorld will update transformations and appearance of individual handles
};
var pp = class extends Mesh {
  constructor() {
    super(new PlaneGeometry(1e5, 1e5, 2, 2), new MeshBasicMaterial({
      visible: false,
      wireframe: true,
      side: DoubleSide,
      transparent: true,
      opacity: 0.1,
      toneMapped: false
    })), C(this, "isTransformControlsPlane", true), C(this, "type", "TransformControlsPlane"), C(this, "unitX", new Vector3(1, 0, 0)), C(this, "unitY", new Vector3(0, 1, 0)), C(this, "unitZ", new Vector3(0, 0, 1)), C(this, "tempVector", new Vector3()), C(this, "dirVector", new Vector3()), C(this, "alignVector", new Vector3()), C(this, "tempMatrix", new Matrix4()), C(this, "identityQuaternion", new Quaternion()), C(this, "cameraQuaternion", new Quaternion()), C(this, "worldPosition", new Vector3()), C(this, "worldQuaternion", new Quaternion()), C(this, "eye", new Vector3()), C(this, "axis", null), C(this, "mode", "translate"), C(this, "space", "world"), C(this, "updateMatrixWorld", () => {
      let n = this.space;
      switch (this.position.copy(this.worldPosition), this.mode === "scale" && (n = "local"), this.unitX.set(1, 0, 0).applyQuaternion(n === "local" ? this.worldQuaternion : this.identityQuaternion), this.unitY.set(0, 1, 0).applyQuaternion(n === "local" ? this.worldQuaternion : this.identityQuaternion), this.unitZ.set(0, 0, 1).applyQuaternion(n === "local" ? this.worldQuaternion : this.identityQuaternion), this.alignVector.copy(this.unitY), this.mode) {
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
var pi = new Euler(0, 0, 0, "YXZ");
var hi = new Vector3();
var hp = {
  type: "change"
};
var dp = {
  type: "lock"
};
var mp = {
  type: "unlock"
};
var pa = Math.PI / 2;
var fp = class extends EventDispatcher {
  constructor(n, s) {
    super(), C(this, "camera", void 0), C(this, "domElement", void 0), C(this, "isLocked", void 0), C(this, "minPolarAngle", void 0), C(this, "maxPolarAngle", void 0), C(this, "pointerSpeed", void 0), C(this, "onMouseMove", (r) => {
      if (!this.domElement || this.isLocked === false)
        return;
      const o = r.movementX || r.mozMovementX || r.webkitMovementX || 0, c = r.movementY || r.mozMovementY || r.webkitMovementY || 0;
      pi.setFromQuaternion(this.camera.quaternion), pi.y -= o * 2e-3 * this.pointerSpeed, pi.x -= c * 2e-3 * this.pointerSpeed, pi.x = Math.max(pa - this.maxPolarAngle, Math.min(pa - this.minPolarAngle, pi.x)), this.camera.quaternion.setFromEuler(pi), this.dispatchEvent(hp);
    }), C(this, "onPointerlockChange", () => {
      this.domElement && (this.domElement.ownerDocument.pointerLockElement === this.domElement ? (this.dispatchEvent(dp), this.isLocked = true) : (this.dispatchEvent(mp), this.isLocked = false));
    }), C(this, "onPointerlockError", () => {
      console.error("THREE.PointerLockControls: Unable to use Pointer Lock API");
    }), C(this, "connect", (r) => {
      this.domElement = r || this.domElement, this.domElement && (this.domElement.ownerDocument.addEventListener("mousemove", this.onMouseMove), this.domElement.ownerDocument.addEventListener("pointerlockchange", this.onPointerlockChange), this.domElement.ownerDocument.addEventListener("pointerlockerror", this.onPointerlockError));
    }), C(this, "disconnect", () => {
      this.domElement && (this.domElement.ownerDocument.removeEventListener("mousemove", this.onMouseMove), this.domElement.ownerDocument.removeEventListener("pointerlockchange", this.onPointerlockChange), this.domElement.ownerDocument.removeEventListener("pointerlockerror", this.onPointerlockError));
    }), C(this, "dispose", () => {
      this.disconnect();
    }), C(this, "getObject", () => this.camera), C(this, "direction", new Vector3(0, 0, -1)), C(this, "getDirection", (r) => r.copy(this.direction).applyQuaternion(this.camera.quaternion)), C(this, "moveForward", (r) => {
      hi.setFromMatrixColumn(this.camera.matrix, 0), hi.crossVectors(this.camera.up, hi), this.camera.position.addScaledVector(hi, r);
    }), C(this, "moveRight", (r) => {
      hi.setFromMatrixColumn(this.camera.matrix, 0), this.camera.position.addScaledVector(hi, r);
    }), C(this, "lock", () => {
      this.domElement && this.domElement.requestPointerLock();
    }), C(this, "unlock", () => {
      this.domElement && this.domElement.ownerDocument.exitPointerLock();
    }), this.camera = n, this.domElement = s, this.isLocked = false, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.pointerSpeed = 1, s && this.connect(s);
  }
};
var ha = (v, n) => (v % n + n) % n;
var vp = class extends EventDispatcher {
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
  constructor(n, s) {
    super(), C(this, "object", void 0), C(this, "domElement", void 0), C(this, "enabled", true), C(this, "target", new Vector3()), C(this, "minDistance", 0), C(this, "maxDistance", 1 / 0), C(this, "minZoom", 0), C(this, "maxZoom", 1 / 0), C(this, "minPolarAngle", 0), C(this, "maxPolarAngle", Math.PI), C(this, "minAzimuthAngle", -1 / 0), C(this, "maxAzimuthAngle", 1 / 0), C(this, "enableDamping", false), C(this, "dampingFactor", 0.05), C(this, "enableZoom", true), C(this, "zoomSpeed", 1), C(this, "enableRotate", true), C(this, "rotateSpeed", 1), C(this, "enablePan", true), C(this, "panSpeed", 1), C(this, "screenSpacePanning", true), C(this, "keyPanSpeed", 7), C(this, "autoRotate", false), C(this, "autoRotateSpeed", 2), C(this, "reverseOrbit", false), C(this, "keys", {
      LEFT: "ArrowLeft",
      UP: "ArrowUp",
      RIGHT: "ArrowRight",
      BOTTOM: "ArrowDown"
    }), C(this, "mouseButtons", {
      LEFT: MOUSE.ROTATE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.PAN
    }), C(this, "touches", {
      ONE: TOUCH.ROTATE,
      TWO: TOUCH.DOLLY_PAN
    }), C(this, "target0", void 0), C(this, "position0", void 0), C(this, "zoom0", void 0), C(this, "_domElementKeyEvents", null), C(this, "getPolarAngle", void 0), C(this, "getAzimuthalAngle", void 0), C(this, "setPolarAngle", void 0), C(this, "setAzimuthalAngle", void 0), C(this, "getDistance", void 0), C(this, "listenToKeyEvents", void 0), C(this, "saveState", void 0), C(this, "reset", void 0), C(this, "update", void 0), C(this, "connect", void 0), C(this, "dispose", void 0), this.object = n, this.domElement = s, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object instanceof PerspectiveCamera ? this.object.zoom : 1, this.getPolarAngle = () => w.phi, this.getAzimuthalAngle = () => w.theta, this.setPolarAngle = (L) => {
      let U = ha(L, 2 * Math.PI), W = w.phi;
      W < 0 && (W += 2 * Math.PI), U < 0 && (U += 2 * Math.PI);
      let ie = Math.abs(U - W);
      2 * Math.PI - ie < ie && (U < W ? U += 2 * Math.PI : W += 2 * Math.PI), _2.phi = U - W, r.update();
    }, this.setAzimuthalAngle = (L) => {
      let U = ha(L, 2 * Math.PI), W = w.theta;
      W < 0 && (W += 2 * Math.PI), U < 0 && (U += 2 * Math.PI);
      let ie = Math.abs(U - W);
      2 * Math.PI - ie < ie && (U < W ? U += 2 * Math.PI : W += 2 * Math.PI), _2.theta = U - W, r.update();
    }, this.getDistance = () => r.object.position.distanceTo(r.target), this.listenToKeyEvents = (L) => {
      L.addEventListener("keydown", Et), this._domElementKeyEvents = L;
    }, this.saveState = () => {
      r.target0.copy(r.target), r.position0.copy(r.object.position), r.zoom0 = r.object instanceof PerspectiveCamera ? r.object.zoom : 1;
    }, this.reset = () => {
      r.target.copy(r.target0), r.object.position.copy(r.position0), r.object instanceof PerspectiveCamera && (r.object.zoom = r.zoom0, r.object.updateProjectionMatrix()), r.dispatchEvent(o), r.update(), d = h.NONE;
    }, this.update = (() => {
      const L = new Vector3(), U = new Quaternion().setFromUnitVectors(n.up, new Vector3(0, 1, 0)), W = U.clone().invert(), ie = new Vector3(), xe = new Quaternion(), Be = 2 * Math.PI;
      return function() {
        const hn = r.object.position;
        L.copy(hn).sub(r.target), L.applyQuaternion(U), w.setFromVector3(L), r.autoRotate && d === h.NONE && pe(K()), r.enableDamping ? (w.theta += _2.theta * r.dampingFactor, w.phi += _2.phi * r.dampingFactor) : (w.theta += _2.theta, w.phi += _2.phi);
        let $e = r.minAzimuthAngle, Xe = r.maxAzimuthAngle;
        return isFinite($e) && isFinite(Xe) && ($e < -Math.PI ? $e += Be : $e > Math.PI && ($e -= Be), Xe < -Math.PI ? Xe += Be : Xe > Math.PI && (Xe -= Be), $e <= Xe ? w.theta = Math.max($e, Math.min(Xe, w.theta)) : w.theta = w.theta > ($e + Xe) / 2 ? Math.max($e, w.theta) : Math.min(Xe, w.theta)), w.phi = Math.max(r.minPolarAngle, Math.min(r.maxPolarAngle, w.phi)), w.makeSafe(), w.radius *= y, w.radius = Math.max(r.minDistance, Math.min(r.maxDistance, w.radius)), r.enableDamping === true ? r.target.addScaledVector(P, r.dampingFactor) : r.target.add(P), L.setFromSpherical(w), L.applyQuaternion(W), hn.copy(r.target).add(L), r.object.lookAt(r.target), r.enableDamping === true ? (_2.theta *= 1 - r.dampingFactor, _2.phi *= 1 - r.dampingFactor, P.multiplyScalar(1 - r.dampingFactor)) : (_2.set(0, 0, 0), P.set(0, 0, 0)), y = 1, R || ie.distanceToSquared(r.object.position) > g || 8 * (1 - xe.dot(r.object.quaternion)) > g ? (r.dispatchEvent(o), ie.copy(r.object.position), xe.copy(r.object.quaternion), R = false, true) : false;
      };
    })(), this.connect = (L) => {
      L === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'), r.domElement = L, r.domElement.style.touchAction = "none", r.domElement.addEventListener("contextmenu", pn), r.domElement.addEventListener("pointerdown", ot), r.domElement.addEventListener("pointercancel", Gn), r.domElement.addEventListener("wheel", Kn);
    }, this.dispose = () => {
      var L, U, W, ie, xe, Be;
      (L = r.domElement) === null || L === void 0 || L.removeEventListener("contextmenu", pn), (U = r.domElement) === null || U === void 0 || U.removeEventListener("pointerdown", ot), (W = r.domElement) === null || W === void 0 || W.removeEventListener("pointercancel", Gn), (ie = r.domElement) === null || ie === void 0 || ie.removeEventListener("wheel", Kn), (xe = r.domElement) === null || xe === void 0 || xe.ownerDocument.removeEventListener("pointermove", un), (Be = r.domElement) === null || Be === void 0 || Be.ownerDocument.removeEventListener("pointerup", bt), r._domElementKeyEvents !== null && r._domElementKeyEvents.removeEventListener("keydown", Et);
    };
    const r = this, o = {
      type: "change"
    }, c = {
      type: "start"
    }, p = {
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
    let d = h.NONE;
    const g = 1e-6, w = new Spherical(), _2 = new Spherical();
    let y = 1;
    const P = new Vector3();
    let R = false;
    const k = new Vector2(), A = new Vector2(), z = new Vector2(), F = new Vector2(), I = new Vector2(), D2 = new Vector2(), Y = new Vector2(), G = new Vector2(), N = new Vector2(), O = [], H = {};
    function K() {
      return 2 * Math.PI / 60 / 60 * r.autoRotateSpeed;
    }
    function q() {
      return Math.pow(0.95, r.zoomSpeed);
    }
    function pe(L) {
      r.reverseOrbit ? _2.theta += L : _2.theta -= L;
    }
    function _e(L) {
      r.reverseOrbit ? _2.phi += L : _2.phi -= L;
    }
    const ce = (() => {
      const L = new Vector3();
      return function(W, ie) {
        L.setFromMatrixColumn(ie, 0), L.multiplyScalar(-W), P.add(L);
      };
    })(), me = (() => {
      const L = new Vector3();
      return function(W, ie) {
        r.screenSpacePanning === true ? L.setFromMatrixColumn(ie, 1) : (L.setFromMatrixColumn(ie, 0), L.crossVectors(r.object.up, L)), L.multiplyScalar(W), P.add(L);
      };
    })(), he = (() => {
      const L = new Vector3();
      return function(W, ie) {
        const xe = r.domElement;
        if (xe && r.object instanceof PerspectiveCamera && r.object.isPerspectiveCamera) {
          const Be = r.object.position;
          L.copy(Be).sub(r.target);
          let Ht = L.length();
          Ht *= Math.tan(r.object.fov / 2 * Math.PI / 180), ce(2 * W * Ht / xe.clientHeight, r.object.matrix), me(2 * ie * Ht / xe.clientHeight, r.object.matrix);
        } else
          xe && r.object instanceof OrthographicCamera && r.object.isOrthographicCamera ? (ce(W * (r.object.right - r.object.left) / r.object.zoom / xe.clientWidth, r.object.matrix), me(ie * (r.object.top - r.object.bottom) / r.object.zoom / xe.clientHeight, r.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), r.enablePan = false);
      };
    })();
    function ee(L) {
      r.object instanceof PerspectiveCamera && r.object.isPerspectiveCamera ? y /= L : r.object instanceof OrthographicCamera && r.object.isOrthographicCamera ? (r.object.zoom = Math.max(r.minZoom, Math.min(r.maxZoom, r.object.zoom * L)), r.object.updateProjectionMatrix(), R = true) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), r.enableZoom = false);
    }
    function X(L) {
      r.object instanceof PerspectiveCamera && r.object.isPerspectiveCamera ? y *= L : r.object instanceof OrthographicCamera && r.object.isOrthographicCamera ? (r.object.zoom = Math.max(r.minZoom, Math.min(r.maxZoom, r.object.zoom / L)), r.object.updateProjectionMatrix(), R = true) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), r.enableZoom = false);
    }
    function Te(L) {
      k.set(L.clientX, L.clientY);
    }
    function fe(L) {
      Y.set(L.clientX, L.clientY);
    }
    function ae(L) {
      F.set(L.clientX, L.clientY);
    }
    function ne(L) {
      A.set(L.clientX, L.clientY), z.subVectors(A, k).multiplyScalar(r.rotateSpeed);
      const U = r.domElement;
      U && (pe(2 * Math.PI * z.x / U.clientHeight), _e(2 * Math.PI * z.y / U.clientHeight)), k.copy(A), r.update();
    }
    function ge(L) {
      G.set(L.clientX, L.clientY), N.subVectors(G, Y), N.y > 0 ? ee(q()) : N.y < 0 && X(q()), Y.copy(G), r.update();
    }
    function S(L) {
      I.set(L.clientX, L.clientY), D2.subVectors(I, F).multiplyScalar(r.panSpeed), he(D2.x, D2.y), F.copy(I), r.update();
    }
    function le(L) {
      L.deltaY < 0 ? X(q()) : L.deltaY > 0 && ee(q()), r.update();
    }
    function Fe(L) {
      let U = false;
      switch (L.code) {
        case r.keys.UP:
          he(0, r.keyPanSpeed), U = true;
          break;
        case r.keys.BOTTOM:
          he(0, -r.keyPanSpeed), U = true;
          break;
        case r.keys.LEFT:
          he(r.keyPanSpeed, 0), U = true;
          break;
        case r.keys.RIGHT:
          he(-r.keyPanSpeed, 0), U = true;
          break;
      }
      U && (L.preventDefault(), r.update());
    }
    function Ue() {
      if (O.length == 1)
        k.set(O[0].pageX, O[0].pageY);
      else {
        const L = 0.5 * (O[0].pageX + O[1].pageX), U = 0.5 * (O[0].pageY + O[1].pageY);
        k.set(L, U);
      }
    }
    function ye() {
      if (O.length == 1)
        F.set(O[0].pageX, O[0].pageY);
      else {
        const L = 0.5 * (O[0].pageX + O[1].pageX), U = 0.5 * (O[0].pageY + O[1].pageY);
        F.set(L, U);
      }
    }
    function rt() {
      const L = O[0].pageX - O[1].pageX, U = O[0].pageY - O[1].pageY, W = Math.sqrt(L * L + U * U);
      Y.set(0, W);
    }
    function jn() {
      r.enableZoom && rt(), r.enablePan && ye();
    }
    function Qe() {
      r.enableZoom && rt(), r.enableRotate && Ue();
    }
    function Un(L) {
      if (O.length == 1)
        A.set(L.pageX, L.pageY);
      else {
        const W = Rt2(L), ie = 0.5 * (L.pageX + W.x), xe = 0.5 * (L.pageY + W.y);
        A.set(ie, xe);
      }
      z.subVectors(A, k).multiplyScalar(r.rotateSpeed);
      const U = r.domElement;
      U && (pe(2 * Math.PI * z.x / U.clientHeight), _e(2 * Math.PI * z.y / U.clientHeight)), k.copy(A);
    }
    function cn(L) {
      if (O.length == 1)
        I.set(L.pageX, L.pageY);
      else {
        const U = Rt2(L), W = 0.5 * (L.pageX + U.x), ie = 0.5 * (L.pageY + U.y);
        I.set(W, ie);
      }
      D2.subVectors(I, F).multiplyScalar(r.panSpeed), he(D2.x, D2.y), F.copy(I);
    }
    function vt(L) {
      const U = Rt2(L), W = L.pageX - U.x, ie = L.pageY - U.y, xe = Math.sqrt(W * W + ie * ie);
      G.set(0, xe), N.set(0, Math.pow(G.y / Y.y, r.zoomSpeed)), ee(N.y), Y.copy(G);
    }
    function Lt(L) {
      r.enableZoom && vt(L), r.enablePan && cn(L);
    }
    function Ke(L) {
      r.enableZoom && vt(L), r.enableRotate && Un(L);
    }
    function ot(L) {
      if (r.enabled !== false) {
        if (O.length === 0) {
          var U, W;
          (U = r.domElement) === null || U === void 0 || U.ownerDocument.addEventListener("pointermove", un), (W = r.domElement) === null || W === void 0 || W.ownerDocument.addEventListener("pointerup", bt);
        }
        Xn(L), L.pointerType === "touch" ? At(L) : fi(L);
      }
    }
    function un(L) {
      r.enabled !== false && (L.pointerType === "touch" ? $n(L) : Hn(L));
    }
    function bt(L) {
      if (Ct(L), O.length === 0) {
        var U, W, ie;
        (U = r.domElement) === null || U === void 0 || U.releasePointerCapture(L.pointerId), (W = r.domElement) === null || W === void 0 || W.ownerDocument.removeEventListener("pointermove", un), (ie = r.domElement) === null || ie === void 0 || ie.ownerDocument.removeEventListener("pointerup", bt);
      }
      r.dispatchEvent(p), d = h.NONE;
    }
    function Gn(L) {
      Ct(L);
    }
    function fi(L) {
      let U;
      switch (L.button) {
        case 0:
          U = r.mouseButtons.LEFT;
          break;
        case 1:
          U = r.mouseButtons.MIDDLE;
          break;
        case 2:
          U = r.mouseButtons.RIGHT;
          break;
        default:
          U = -1;
      }
      switch (U) {
        case MOUSE.DOLLY:
          if (r.enableZoom === false)
            return;
          fe(L), d = h.DOLLY;
          break;
        case MOUSE.ROTATE:
          if (L.ctrlKey || L.metaKey || L.shiftKey) {
            if (r.enablePan === false)
              return;
            ae(L), d = h.PAN;
          } else {
            if (r.enableRotate === false)
              return;
            Te(L), d = h.ROTATE;
          }
          break;
        case MOUSE.PAN:
          if (L.ctrlKey || L.metaKey || L.shiftKey) {
            if (r.enableRotate === false)
              return;
            Te(L), d = h.ROTATE;
          } else {
            if (r.enablePan === false)
              return;
            ae(L), d = h.PAN;
          }
          break;
        default:
          d = h.NONE;
      }
      d !== h.NONE && r.dispatchEvent(c);
    }
    function Hn(L) {
      if (r.enabled !== false)
        switch (d) {
          case h.ROTATE:
            if (r.enableRotate === false)
              return;
            ne(L);
            break;
          case h.DOLLY:
            if (r.enableZoom === false)
              return;
            ge(L);
            break;
          case h.PAN:
            if (r.enablePan === false)
              return;
            S(L);
            break;
        }
    }
    function Kn(L) {
      r.enabled === false || r.enableZoom === false || d !== h.NONE && d !== h.ROTATE || (L.preventDefault(), r.dispatchEvent(c), le(L), r.dispatchEvent(p));
    }
    function Et(L) {
      r.enabled === false || r.enablePan === false || Fe(L);
    }
    function At(L) {
      switch (gt(L), O.length) {
        case 1:
          switch (r.touches.ONE) {
            case TOUCH.ROTATE:
              if (r.enableRotate === false)
                return;
              Ue(), d = h.TOUCH_ROTATE;
              break;
            case TOUCH.PAN:
              if (r.enablePan === false)
                return;
              ye(), d = h.TOUCH_PAN;
              break;
            default:
              d = h.NONE;
          }
          break;
        case 2:
          switch (r.touches.TWO) {
            case TOUCH.DOLLY_PAN:
              if (r.enableZoom === false && r.enablePan === false)
                return;
              jn(), d = h.TOUCH_DOLLY_PAN;
              break;
            case TOUCH.DOLLY_ROTATE:
              if (r.enableZoom === false && r.enableRotate === false)
                return;
              Qe(), d = h.TOUCH_DOLLY_ROTATE;
              break;
            default:
              d = h.NONE;
          }
          break;
        default:
          d = h.NONE;
      }
      d !== h.NONE && r.dispatchEvent(c);
    }
    function $n(L) {
      switch (gt(L), d) {
        case h.TOUCH_ROTATE:
          if (r.enableRotate === false)
            return;
          Un(L), r.update();
          break;
        case h.TOUCH_PAN:
          if (r.enablePan === false)
            return;
          cn(L), r.update();
          break;
        case h.TOUCH_DOLLY_PAN:
          if (r.enableZoom === false && r.enablePan === false)
            return;
          Lt(L), r.update();
          break;
        case h.TOUCH_DOLLY_ROTATE:
          if (r.enableZoom === false && r.enableRotate === false)
            return;
          Ke(L), r.update();
          break;
        default:
          d = h.NONE;
      }
    }
    function pn(L) {
      r.enabled !== false && L.preventDefault();
    }
    function Xn(L) {
      O.push(L);
    }
    function Ct(L) {
      delete H[L.pointerId];
      for (let U = 0; U < O.length; U++)
        if (O[U].pointerId == L.pointerId) {
          O.splice(U, 1);
          return;
        }
    }
    function gt(L) {
      let U = H[L.pointerId];
      U === void 0 && (U = new Vector2(), H[L.pointerId] = U), U.set(L.pageX, L.pageY);
    }
    function Rt2(L) {
      const U = L.pointerId === O[0].pointerId ? O[1] : O[0];
      return H[U.pointerId];
    }
    s !== void 0 && this.connect(s), this.update();
  }
};
var bp = class extends Loader {
  constructor(n) {
    super(n), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(s) {
      return new xp(s);
    }), this.register(function(s) {
      return new Sp(s);
    }), this.register(function(s) {
      return new Lp(s);
    }), this.register(function(s) {
      return new Cp(s);
    }), this.register(function(s) {
      return new Pp(s);
    }), this.register(function(s) {
      return new Tp(s);
    }), this.register(function(s) {
      return new kp(s);
    }), this.register(function(s) {
      return new yp(s);
    }), this.register(function(s) {
      return new Mp(s);
    }), this.register(function(s) {
      return new Ep(s);
    }), this.register(function(s) {
      return new _p(s);
    }), this.register(function(s) {
      return new Ap(s);
    });
  }
  load(n, s, r, o) {
    const c = this;
    let p;
    this.resourcePath !== "" ? p = this.resourcePath : this.path !== "" ? p = this.path : p = LoaderUtils.extractUrlBase(n), this.manager.itemStart(n);
    const h = function(g) {
      o ? o(g) : console.error(g), c.manager.itemError(n), c.manager.itemEnd(n);
    }, d = new FileLoader(this.manager);
    d.setPath(this.path), d.setResponseType("arraybuffer"), d.setRequestHeader(this.requestHeader), d.setWithCredentials(this.withCredentials), d.load(n, function(g) {
      try {
        c.parse(g, p, function(w) {
          s(w), c.manager.itemEnd(n);
        }, h);
      } catch (w) {
        h(w);
      }
    }, r, h);
  }
  setDRACOLoader(n) {
    return this.dracoLoader = n, this;
  }
  setDDSLoader() {
    throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".');
  }
  setKTX2Loader(n) {
    return this.ktx2Loader = n, this;
  }
  setMeshoptDecoder(n) {
    return this.meshoptDecoder = n, this;
  }
  register(n) {
    return this.pluginCallbacks.indexOf(n) === -1 && this.pluginCallbacks.push(n), this;
  }
  unregister(n) {
    return this.pluginCallbacks.indexOf(n) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(n), 1), this;
  }
  parse(n, s, r, o) {
    let c;
    const p = {}, h = {};
    if (typeof n == "string")
      c = n;
    else if (LoaderUtils.decodeText(new Uint8Array(n, 0, 4)) === Xa) {
      try {
        p[re.KHR_BINARY_GLTF] = new Rp(n);
      } catch (_2) {
        o && o(_2);
        return;
      }
      c = p[re.KHR_BINARY_GLTF].content;
    } else
      c = LoaderUtils.decodeText(new Uint8Array(n));
    const d = JSON.parse(c);
    if (d.asset === void 0 || d.asset.version[0] < 2) {
      o && o(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const g = new Kp(d, {
      path: s || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    g.fileLoader.setRequestHeader(this.requestHeader);
    for (let w = 0; w < this.pluginCallbacks.length; w++) {
      const _2 = this.pluginCallbacks[w](g);
      h[_2.name] = _2, p[_2.name] = true;
    }
    if (d.extensionsUsed)
      for (let w = 0; w < d.extensionsUsed.length; ++w) {
        const _2 = d.extensionsUsed[w], y = d.extensionsRequired || [];
        switch (_2) {
          case re.KHR_MATERIALS_UNLIT:
            p[_2] = new wp();
            break;
          case re.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
            p[_2] = new Dp();
            break;
          case re.KHR_DRACO_MESH_COMPRESSION:
            p[_2] = new Vp(d, this.dracoLoader);
            break;
          case re.KHR_TEXTURE_TRANSFORM:
            p[_2] = new Ip();
            break;
          case re.KHR_MESH_QUANTIZATION:
            p[_2] = new Op();
            break;
          default:
            y.indexOf(_2) >= 0 && h[_2] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + _2 + '".');
        }
      }
    g.setExtensions(p), g.setPlugins(h), g.parse(r, o);
  }
  parseAsync(n, s) {
    const r = this;
    return new Promise(function(o, c) {
      r.parse(n, s, o, c);
    });
  }
};
function gp() {
  let v = {};
  return {
    get: function(n) {
      return v[n];
    },
    add: function(n, s) {
      v[n] = s;
    },
    remove: function(n) {
      delete v[n];
    },
    removeAll: function() {
      v = {};
    }
  };
}
var re = {
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
var _p = class {
  constructor(n) {
    this.parser = n, this.name = re.KHR_LIGHTS_PUNCTUAL, this.cache = {
      refs: {},
      uses: {}
    };
  }
  _markDefs() {
    const n = this.parser, s = this.parser.json.nodes || [];
    for (let r = 0, o = s.length; r < o; r++) {
      const c = s[r];
      c.extensions && c.extensions[this.name] && c.extensions[this.name].light !== void 0 && n._addNodeRef(this.cache, c.extensions[this.name].light);
    }
  }
  _loadLight(n) {
    const s = this.parser, r = "light:" + n;
    let o = s.cache.get(r);
    if (o)
      return o;
    const c = s.json, d = ((c.extensions && c.extensions[this.name] || {}).lights || [])[n];
    let g;
    const w = new Color(16777215);
    d.color !== void 0 && w.fromArray(d.color);
    const _2 = d.range !== void 0 ? d.range : 0;
    switch (d.type) {
      case "directional":
        g = new DirectionalLight(w), g.target.position.set(0, 0, -1), g.add(g.target);
        break;
      case "point":
        g = new PointLight(w), g.distance = _2;
        break;
      case "spot":
        g = new SpotLight(w), g.distance = _2, d.spot = d.spot || {}, d.spot.innerConeAngle = d.spot.innerConeAngle !== void 0 ? d.spot.innerConeAngle : 0, d.spot.outerConeAngle = d.spot.outerConeAngle !== void 0 ? d.spot.outerConeAngle : Math.PI / 4, g.angle = d.spot.outerConeAngle, g.penumbra = 1 - d.spot.innerConeAngle / d.spot.outerConeAngle, g.target.position.set(0, 0, -1), g.add(g.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + d.type);
    }
    return g.position.set(0, 0, 0), g.decay = 2, d.intensity !== void 0 && (g.intensity = d.intensity), g.name = s.createUniqueName(d.name || "light_" + n), o = Promise.resolve(g), s.cache.add(r, o), o;
  }
  createNodeAttachment(n) {
    const s = this, r = this.parser, c = r.json.nodes[n], h = (c.extensions && c.extensions[this.name] || {}).light;
    return h === void 0 ? null : this._loadLight(h).then(function(d) {
      return r._getNodeRef(s.cache, h, d);
    });
  }
};
var wp = class {
  constructor() {
    this.name = re.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return MeshBasicMaterial;
  }
  extendParams(n, s, r) {
    const o = [];
    n.color = new Color(1, 1, 1), n.opacity = 1;
    const c = s.pbrMetallicRoughness;
    if (c) {
      if (Array.isArray(c.baseColorFactor)) {
        const p = c.baseColorFactor;
        n.color.fromArray(p), n.opacity = p[3];
      }
      c.baseColorTexture !== void 0 && o.push(r.assignTexture(n, "map", c.baseColorTexture, sRGBEncoding));
    }
    return Promise.all(o);
  }
};
var yp = class {
  constructor(n) {
    this.parser = n, this.name = re.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(n, s) {
    const o = this.parser.json.materials[n];
    if (!o.extensions || !o.extensions[this.name])
      return Promise.resolve();
    const c = o.extensions[this.name].emissiveStrength;
    return c !== void 0 && (s.emissiveIntensity = c), Promise.resolve();
  }
};
var xp = class {
  constructor(n) {
    this.parser = n, this.name = re.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(n) {
    const r = this.parser.json.materials[n];
    return !r.extensions || !r.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(n, s) {
    const r = this.parser, o = r.json.materials[n];
    if (!o.extensions || !o.extensions[this.name])
      return Promise.resolve();
    const c = [], p = o.extensions[this.name];
    if (p.clearcoatFactor !== void 0 && (s.clearcoat = p.clearcoatFactor), p.clearcoatTexture !== void 0 && c.push(r.assignTexture(s, "clearcoatMap", p.clearcoatTexture)), p.clearcoatRoughnessFactor !== void 0 && (s.clearcoatRoughness = p.clearcoatRoughnessFactor), p.clearcoatRoughnessTexture !== void 0 && c.push(r.assignTexture(s, "clearcoatRoughnessMap", p.clearcoatRoughnessTexture)), p.clearcoatNormalTexture !== void 0 && (c.push(r.assignTexture(s, "clearcoatNormalMap", p.clearcoatNormalTexture)), p.clearcoatNormalTexture.scale !== void 0)) {
      const h = p.clearcoatNormalTexture.scale;
      s.clearcoatNormalScale = new Vector2(h, h);
    }
    return Promise.all(c);
  }
};
var Ep = class {
  constructor(n) {
    this.parser = n, this.name = re.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(n) {
    const r = this.parser.json.materials[n];
    return !r.extensions || !r.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(n, s) {
    const r = this.parser, o = r.json.materials[n];
    if (!o.extensions || !o.extensions[this.name])
      return Promise.resolve();
    const c = [], p = o.extensions[this.name];
    return p.iridescenceFactor !== void 0 && (s.iridescence = p.iridescenceFactor), p.iridescenceTexture !== void 0 && c.push(r.assignTexture(s, "iridescenceMap", p.iridescenceTexture)), p.iridescenceIor !== void 0 && (s.iridescenceIOR = p.iridescenceIor), s.iridescenceThicknessRange === void 0 && (s.iridescenceThicknessRange = [100, 400]), p.iridescenceThicknessMinimum !== void 0 && (s.iridescenceThicknessRange[0] = p.iridescenceThicknessMinimum), p.iridescenceThicknessMaximum !== void 0 && (s.iridescenceThicknessRange[1] = p.iridescenceThicknessMaximum), p.iridescenceThicknessTexture !== void 0 && c.push(r.assignTexture(s, "iridescenceThicknessMap", p.iridescenceThicknessTexture)), Promise.all(c);
  }
};
var Cp = class {
  constructor(n) {
    this.parser = n, this.name = re.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(n) {
    const r = this.parser.json.materials[n];
    return !r.extensions || !r.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(n, s) {
    const r = this.parser, o = r.json.materials[n];
    if (!o.extensions || !o.extensions[this.name])
      return Promise.resolve();
    const c = [];
    s.sheenColor = new Color(0, 0, 0), s.sheenRoughness = 0, s.sheen = 1;
    const p = o.extensions[this.name];
    return p.sheenColorFactor !== void 0 && s.sheenColor.fromArray(p.sheenColorFactor), p.sheenRoughnessFactor !== void 0 && (s.sheenRoughness = p.sheenRoughnessFactor), p.sheenColorTexture !== void 0 && c.push(r.assignTexture(s, "sheenColorMap", p.sheenColorTexture, sRGBEncoding)), p.sheenRoughnessTexture !== void 0 && c.push(r.assignTexture(s, "sheenRoughnessMap", p.sheenRoughnessTexture)), Promise.all(c);
  }
};
var Pp = class {
  constructor(n) {
    this.parser = n, this.name = re.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(n) {
    const r = this.parser.json.materials[n];
    return !r.extensions || !r.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(n, s) {
    const r = this.parser, o = r.json.materials[n];
    if (!o.extensions || !o.extensions[this.name])
      return Promise.resolve();
    const c = [], p = o.extensions[this.name];
    return p.transmissionFactor !== void 0 && (s.transmission = p.transmissionFactor), p.transmissionTexture !== void 0 && c.push(r.assignTexture(s, "transmissionMap", p.transmissionTexture)), Promise.all(c);
  }
};
var Tp = class {
  constructor(n) {
    this.parser = n, this.name = re.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(n) {
    const r = this.parser.json.materials[n];
    return !r.extensions || !r.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(n, s) {
    const r = this.parser, o = r.json.materials[n];
    if (!o.extensions || !o.extensions[this.name])
      return Promise.resolve();
    const c = [], p = o.extensions[this.name];
    s.thickness = p.thicknessFactor !== void 0 ? p.thicknessFactor : 0, p.thicknessTexture !== void 0 && c.push(r.assignTexture(s, "thicknessMap", p.thicknessTexture)), s.attenuationDistance = p.attenuationDistance || 1 / 0;
    const h = p.attenuationColor || [1, 1, 1];
    return s.attenuationColor = new Color(h[0], h[1], h[2]), Promise.all(c);
  }
};
var kp = class {
  constructor(n) {
    this.parser = n, this.name = re.KHR_MATERIALS_IOR;
  }
  getMaterialType(n) {
    const r = this.parser.json.materials[n];
    return !r.extensions || !r.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(n, s) {
    const o = this.parser.json.materials[n];
    if (!o.extensions || !o.extensions[this.name])
      return Promise.resolve();
    const c = o.extensions[this.name];
    return s.ior = c.ior !== void 0 ? c.ior : 1.5, Promise.resolve();
  }
};
var Mp = class {
  constructor(n) {
    this.parser = n, this.name = re.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(n) {
    const r = this.parser.json.materials[n];
    return !r.extensions || !r.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(n, s) {
    const r = this.parser, o = r.json.materials[n];
    if (!o.extensions || !o.extensions[this.name])
      return Promise.resolve();
    const c = [], p = o.extensions[this.name];
    s.specularIntensity = p.specularFactor !== void 0 ? p.specularFactor : 1, p.specularTexture !== void 0 && c.push(r.assignTexture(s, "specularIntensityMap", p.specularTexture));
    const h = p.specularColorFactor || [1, 1, 1];
    return s.specularColor = new Color(h[0], h[1], h[2]), p.specularColorTexture !== void 0 && c.push(r.assignTexture(s, "specularColorMap", p.specularColorTexture, sRGBEncoding)), Promise.all(c);
  }
};
var Sp = class {
  constructor(n) {
    this.parser = n, this.name = re.KHR_TEXTURE_BASISU;
  }
  loadTexture(n) {
    const s = this.parser, r = s.json, o = r.textures[n];
    if (!o.extensions || !o.extensions[this.name])
      return null;
    const c = o.extensions[this.name], p = s.options.ktx2Loader;
    if (!p) {
      if (r.extensionsRequired && r.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return s.loadTextureImage(n, c.source, p);
  }
};
var Lp = class {
  constructor(n) {
    this.parser = n, this.name = re.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(n) {
    const s = this.name, r = this.parser, o = r.json, c = o.textures[n];
    if (!c.extensions || !c.extensions[s])
      return null;
    const p = c.extensions[s], h = o.images[p.source];
    let d = r.textureLoader;
    if (h.uri) {
      const g = r.options.manager.getHandler(h.uri);
      g !== null && (d = g);
    }
    return this.detectSupport().then(function(g) {
      if (g)
        return r.loadTextureImage(n, p.source, d);
      if (o.extensionsRequired && o.extensionsRequired.indexOf(s) >= 0)
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return r.loadTexture(n);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(n) {
      const s = new Image();
      s.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", s.onload = s.onerror = function() {
        n(s.height === 1);
      };
    })), this.isSupported;
  }
};
var Ap = class {
  constructor(n) {
    this.name = re.EXT_MESHOPT_COMPRESSION, this.parser = n;
  }
  loadBufferView(n) {
    const s = this.parser.json, r = s.bufferViews[n];
    if (r.extensions && r.extensions[this.name]) {
      const o = r.extensions[this.name], c = this.parser.getDependency("buffer", o.buffer), p = this.parser.options.meshoptDecoder;
      if (!p || !p.supported) {
        if (s.extensionsRequired && s.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return c.then(function(h) {
        const d = o.byteOffset || 0, g = o.byteLength || 0, w = o.count, _2 = o.byteStride, y = new Uint8Array(h, d, g);
        return p.decodeGltfBufferAsync ? p.decodeGltfBufferAsync(w, _2, y, o.mode, o.filter).then(function(P) {
          return P.buffer;
        }) : p.ready.then(function() {
          const P = new ArrayBuffer(w * _2);
          return p.decodeGltfBuffer(new Uint8Array(P), w, _2, y, o.mode, o.filter), P;
        });
      });
    } else
      return null;
  }
};
var Xa = "glTF";
var $i = 12;
var da = {
  JSON: 1313821514,
  BIN: 5130562
};
var Rp = class {
  constructor(n) {
    this.name = re.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const s = new DataView(n, 0, $i);
    if (this.header = {
      magic: LoaderUtils.decodeText(new Uint8Array(n.slice(0, 4))),
      version: s.getUint32(4, true),
      length: s.getUint32(8, true)
    }, this.header.magic !== Xa)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const r = this.header.length - $i, o = new DataView(n, $i);
    let c = 0;
    for (; c < r; ) {
      const p = o.getUint32(c, true);
      c += 4;
      const h = o.getUint32(c, true);
      if (c += 4, h === da.JSON) {
        const d = new Uint8Array(n, $i + c, p);
        this.content = LoaderUtils.decodeText(d);
      } else if (h === da.BIN) {
        const d = $i + c;
        this.body = n.slice(d, d + p);
      }
      c += p;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
};
var Vp = class {
  constructor(n, s) {
    if (!s)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = re.KHR_DRACO_MESH_COMPRESSION, this.json = n, this.dracoLoader = s, this.dracoLoader.preload();
  }
  decodePrimitive(n, s) {
    const r = this.json, o = this.dracoLoader, c = n.extensions[this.name].bufferView, p = n.extensions[this.name].attributes, h = {}, d = {}, g = {};
    for (const w in p) {
      const _2 = _o[w] || w.toLowerCase();
      h[_2] = p[w];
    }
    for (const w in n.attributes) {
      const _2 = _o[w] || w.toLowerCase();
      if (p[w] !== void 0) {
        const y = r.accessors[n.attributes[w]], P = es[y.componentType];
        g[_2] = P.name, d[_2] = y.normalized === true;
      }
    }
    return s.getDependency("bufferView", c).then(function(w) {
      return new Promise(function(_2) {
        o.decodeDracoFile(w, function(y) {
          for (const P in y.attributes) {
            const R = y.attributes[P], k = d[P];
            k !== void 0 && (R.normalized = k);
          }
          _2(y);
        }, h, g);
      });
    });
  }
};
var Ip = class {
  constructor() {
    this.name = re.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(n, s) {
    return s.texCoord !== void 0 && console.warn('THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.'), s.offset === void 0 && s.rotation === void 0 && s.scale === void 0 || (n = n.clone(), s.offset !== void 0 && n.offset.fromArray(s.offset), s.rotation !== void 0 && (n.rotation = s.rotation), s.scale !== void 0 && n.repeat.fromArray(s.scale), n.needsUpdate = true), n;
  }
};
var go = class extends MeshStandardMaterial {
  constructor(n) {
    super(), this.isGLTFSpecularGlossinessMaterial = true;
    const s = ["#ifdef USE_SPECULARMAP", "	uniform sampler2D specularMap;", "#endif"].join(`
`), r = ["#ifdef USE_GLOSSINESSMAP", "	uniform sampler2D glossinessMap;", "#endif"].join(`
`), o = ["vec3 specularFactor = specular;", "#ifdef USE_SPECULARMAP", "	vec4 texelSpecular = texture2D( specularMap, vUv );", "	// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture", "	specularFactor *= texelSpecular.rgb;", "#endif"].join(`
`), c = ["float glossinessFactor = glossiness;", "#ifdef USE_GLOSSINESSMAP", "	vec4 texelGlossiness = texture2D( glossinessMap, vUv );", "	// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture", "	glossinessFactor *= texelGlossiness.a;", "#endif"].join(`
`), p = ["PhysicalMaterial material;", "material.diffuseColor = diffuseColor.rgb * ( 1. - max( specularFactor.r, max( specularFactor.g, specularFactor.b ) ) );", "vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );", "float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );", "material.roughness = max( 1.0 - glossinessFactor, 0.0525 ); // 0.0525 corresponds to the base mip of a 256 cubemap.", "material.roughness += geometryRoughness;", "material.roughness = min( material.roughness, 1.0 );", "material.specularColor = specularFactor;"].join(`
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
    this._extraUniforms = h, this.onBeforeCompile = function(d) {
      for (const g in h)
        d.uniforms[g] = h[g];
      d.fragmentShader = d.fragmentShader.replace("uniform float roughness;", "uniform vec3 specular;").replace("uniform float metalness;", "uniform float glossiness;").replace("#include <roughnessmap_pars_fragment>", s).replace("#include <metalnessmap_pars_fragment>", r).replace("#include <roughnessmap_fragment>", o).replace("#include <metalnessmap_fragment>", c).replace("#include <lights_physical_fragment>", p);
    }, Object.defineProperties(this, {
      specular: {
        get: function() {
          return h.specular.value;
        },
        set: function(d) {
          h.specular.value = d;
        }
      },
      specularMap: {
        get: function() {
          return h.specularMap.value;
        },
        set: function(d) {
          h.specularMap.value = d, d ? this.defines.USE_SPECULARMAP = "" : delete this.defines.USE_SPECULARMAP;
        }
      },
      glossiness: {
        get: function() {
          return h.glossiness.value;
        },
        set: function(d) {
          h.glossiness.value = d;
        }
      },
      glossinessMap: {
        get: function() {
          return h.glossinessMap.value;
        },
        set: function(d) {
          h.glossinessMap.value = d, d ? (this.defines.USE_GLOSSINESSMAP = "", this.defines.USE_UV = "") : (delete this.defines.USE_GLOSSINESSMAP, delete this.defines.USE_UV);
        }
      }
    }), delete this.metalness, delete this.roughness, delete this.metalnessMap, delete this.roughnessMap, this.setValues(n);
  }
  copy(n) {
    return super.copy(n), this.specularMap = n.specularMap, this.specular.copy(n.specular), this.glossinessMap = n.glossinessMap, this.glossiness = n.glossiness, delete this.metalness, delete this.roughness, delete this.metalnessMap, delete this.roughnessMap, this;
  }
};
var Dp = class {
  constructor() {
    this.name = re.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS, this.specularGlossinessParams = ["color", "map", "lightMap", "lightMapIntensity", "aoMap", "aoMapIntensity", "emissive", "emissiveIntensity", "emissiveMap", "bumpMap", "bumpScale", "normalMap", "normalMapType", "displacementMap", "displacementScale", "displacementBias", "specularMap", "specular", "glossinessMap", "glossiness", "alphaMap", "envMap", "envMapIntensity", "refractionRatio"];
  }
  getMaterialType() {
    return go;
  }
  extendParams(n, s, r) {
    const o = s.extensions[this.name];
    n.color = new Color(1, 1, 1), n.opacity = 1;
    const c = [];
    if (Array.isArray(o.diffuseFactor)) {
      const p = o.diffuseFactor;
      n.color.fromArray(p), n.opacity = p[3];
    }
    if (o.diffuseTexture !== void 0 && c.push(r.assignTexture(n, "map", o.diffuseTexture, sRGBEncoding)), n.emissive = new Color(0, 0, 0), n.glossiness = o.glossinessFactor !== void 0 ? o.glossinessFactor : 1, n.specular = new Color(1, 1, 1), Array.isArray(o.specularFactor) && n.specular.fromArray(o.specularFactor), o.specularGlossinessTexture !== void 0) {
      const p = o.specularGlossinessTexture;
      c.push(r.assignTexture(n, "glossinessMap", p)), c.push(r.assignTexture(n, "specularMap", p, sRGBEncoding));
    }
    return Promise.all(c);
  }
  createMaterial(n) {
    const s = new go(n);
    return s.fog = true, s.color = n.color, s.map = n.map === void 0 ? null : n.map, s.lightMap = null, s.lightMapIntensity = 1, s.aoMap = n.aoMap === void 0 ? null : n.aoMap, s.aoMapIntensity = 1, s.emissive = n.emissive, s.emissiveIntensity = n.emissiveIntensity === void 0 ? 1 : n.emissiveIntensity, s.emissiveMap = n.emissiveMap === void 0 ? null : n.emissiveMap, s.bumpMap = n.bumpMap === void 0 ? null : n.bumpMap, s.bumpScale = 1, s.normalMap = n.normalMap === void 0 ? null : n.normalMap, s.normalMapType = TangentSpaceNormalMap, n.normalScale && (s.normalScale = n.normalScale), s.displacementMap = null, s.displacementScale = 1, s.displacementBias = 0, s.specularMap = n.specularMap === void 0 ? null : n.specularMap, s.specular = n.specular, s.glossinessMap = n.glossinessMap === void 0 ? null : n.glossinessMap, s.glossiness = n.glossiness, s.alphaMap = null, s.envMap = n.envMap === void 0 ? null : n.envMap, s.envMapIntensity = 1, s.refractionRatio = 0.98, s;
  }
};
var Op = class {
  constructor() {
    this.name = re.KHR_MESH_QUANTIZATION;
  }
};
var Ya = class extends Interpolant {
  constructor(n, s, r, o) {
    super(n, s, r, o);
  }
  copySampleValue_(n) {
    const s = this.resultBuffer, r = this.sampleValues, o = this.valueSize, c = n * o * 3 + o;
    for (let p = 0; p !== o; p++)
      s[p] = r[c + p];
    return s;
  }
  interpolate_(n, s, r, o) {
    const c = this.resultBuffer, p = this.sampleValues, h = this.valueSize, d = h * 2, g = h * 3, w = o - s, _2 = (r - s) / w, y = _2 * _2, P = y * _2, R = n * g, k = R - g, A = -2 * P + 3 * y, z = P - y, F = 1 - A, I = z - y + _2;
    for (let D2 = 0; D2 !== h; D2++) {
      const Y = p[k + D2 + h], G = p[k + D2 + d] * w, N = p[R + D2 + h], O = p[R + D2] * w;
      c[D2] = F * Y + I * G + A * N + z * O;
    }
    return c;
  }
};
var Fp = new Quaternion();
var Np = class extends Ya {
  interpolate_(n, s, r, o) {
    const c = super.interpolate_(n, s, r, o);
    return Fp.fromArray(c).normalize().toArray(c), c;
  }
};
var jt = {
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
var es = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
var ma = {
  9728: NearestFilter,
  9729: LinearFilter,
  9984: NearestMipmapNearestFilter,
  9985: LinearMipmapNearestFilter,
  9986: NearestMipmapLinearFilter,
  9987: LinearMipmapLinearFilter
};
var fa = {
  33071: ClampToEdgeWrapping,
  33648: MirroredRepeatWrapping,
  10497: RepeatWrapping
};
var va = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
var _o = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv2",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
};
var rn = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
};
var Bp = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: InterpolateLinear,
  STEP: InterpolateDiscrete
};
var ro = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function zp(v) {
  return v.DefaultMaterial === void 0 && (v.DefaultMaterial = new MeshStandardMaterial({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: false,
    depthTest: true,
    side: FrontSide
  })), v.DefaultMaterial;
}
function Xi(v, n, s) {
  for (const r in s.extensions)
    v[r] === void 0 && (n.userData.gltfExtensions = n.userData.gltfExtensions || {}, n.userData.gltfExtensions[r] = s.extensions[r]);
}
function Dn(v, n) {
  n.extras !== void 0 && (typeof n.extras == "object" ? Object.assign(v.userData, n.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + n.extras));
}
function jp(v, n, s) {
  let r = false, o = false, c = false;
  for (let g = 0, w = n.length; g < w; g++) {
    const _2 = n[g];
    if (_2.POSITION !== void 0 && (r = true), _2.NORMAL !== void 0 && (o = true), _2.COLOR_0 !== void 0 && (c = true), r && o && c)
      break;
  }
  if (!r && !o && !c)
    return Promise.resolve(v);
  const p = [], h = [], d = [];
  for (let g = 0, w = n.length; g < w; g++) {
    const _2 = n[g];
    if (r) {
      const y = _2.POSITION !== void 0 ? s.getDependency("accessor", _2.POSITION) : v.attributes.position;
      p.push(y);
    }
    if (o) {
      const y = _2.NORMAL !== void 0 ? s.getDependency("accessor", _2.NORMAL) : v.attributes.normal;
      h.push(y);
    }
    if (c) {
      const y = _2.COLOR_0 !== void 0 ? s.getDependency("accessor", _2.COLOR_0) : v.attributes.color;
      d.push(y);
    }
  }
  return Promise.all([Promise.all(p), Promise.all(h), Promise.all(d)]).then(function(g) {
    const w = g[0], _2 = g[1], y = g[2];
    return r && (v.morphAttributes.position = w), o && (v.morphAttributes.normal = _2), c && (v.morphAttributes.color = y), v.morphTargetsRelative = true, v;
  });
}
function Up(v, n) {
  if (v.updateMorphTargets(), n.weights !== void 0)
    for (let s = 0, r = n.weights.length; s < r; s++)
      v.morphTargetInfluences[s] = n.weights[s];
  if (n.extras && Array.isArray(n.extras.targetNames)) {
    const s = n.extras.targetNames;
    if (v.morphTargetInfluences.length === s.length) {
      v.morphTargetDictionary = {};
      for (let r = 0, o = s.length; r < o; r++)
        v.morphTargetDictionary[s[r]] = r;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function Gp(v) {
  const n = v.extensions && v.extensions[re.KHR_DRACO_MESH_COMPRESSION];
  let s;
  return n ? s = "draco:" + n.bufferView + ":" + n.indices + ":" + ba(n.attributes) : s = v.indices + ":" + ba(v.attributes) + ":" + v.mode, s;
}
function ba(v) {
  let n = "";
  const s = Object.keys(v).sort();
  for (let r = 0, o = s.length; r < o; r++)
    n += s[r] + ":" + v[s[r]] + ";";
  return n;
}
function wo(v) {
  switch (v) {
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
function Hp(v) {
  return v.search(/\.jpe?g($|\?)/i) > 0 || v.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : v.search(/\.webp($|\?)/i) > 0 || v.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
var Kp = class {
  constructor(n = {}, s = {}) {
    var r, o;
    this.json = n, this.extensions = {}, this.plugins = {}, this.options = s, this.cache = new gp(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.meshCache = {
      refs: {},
      uses: {}
    }, this.cameraCache = {
      refs: {},
      uses: {}
    }, this.lightCache = {
      refs: {},
      uses: {}
    }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    const c = typeof navigator < "u" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === true, p = typeof navigator < "u" && ((r = navigator.userAgent) === null || r === void 0 ? void 0 : r.indexOf("Firefox")) > -1, h = typeof navigator < "u" && p ? (o = navigator.userAgent) === null || o === void 0 ? void 0 : o.match(/Firefox\/([0-9]+)\./)[1] : -1;
    typeof createImageBitmap > "u" || c || p && h < 98 ? this.textureLoader = new TextureLoader(this.options.manager) : this.textureLoader = new ImageBitmapLoader(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new FileLoader(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(true);
  }
  setExtensions(n) {
    this.extensions = n;
  }
  setPlugins(n) {
    this.plugins = n;
  }
  parse(n, s) {
    const r = this, o = this.json, c = this.extensions;
    this.cache.removeAll(), this._invokeAll(function(p) {
      return p._markDefs && p._markDefs();
    }), Promise.all(this._invokeAll(function(p) {
      return p.beforeRoot && p.beforeRoot();
    })).then(function() {
      return Promise.all([r.getDependencies("scene"), r.getDependencies("animation"), r.getDependencies("camera")]);
    }).then(function(p) {
      const h = {
        scene: p[0][o.scene || 0],
        scenes: p[0],
        animations: p[1],
        cameras: p[2],
        asset: o.asset,
        parser: r,
        userData: {}
      };
      Xi(c, h, o), Dn(h, o), Promise.all(r._invokeAll(function(d) {
        return d.afterRoot && d.afterRoot(h);
      })).then(function() {
        n(h);
      });
    }).catch(s);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   */
  _markDefs() {
    const n = this.json.nodes || [], s = this.json.skins || [], r = this.json.meshes || [];
    for (let o = 0, c = s.length; o < c; o++) {
      const p = s[o].joints;
      for (let h = 0, d = p.length; h < d; h++)
        n[p[h]].isBone = true;
    }
    for (let o = 0, c = n.length; o < c; o++) {
      const p = n[o];
      p.mesh !== void 0 && (this._addNodeRef(this.meshCache, p.mesh), p.skin !== void 0 && (r[p.mesh].isSkinnedMesh = true)), p.camera !== void 0 && this._addNodeRef(this.cameraCache, p.camera);
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
  _addNodeRef(n, s) {
    s !== void 0 && (n.refs[s] === void 0 && (n.refs[s] = n.uses[s] = 0), n.refs[s]++);
  }
  /** Returns a reference to a shared resource, cloning it if necessary. */
  _getNodeRef(n, s, r) {
    if (n.refs[s] <= 1)
      return r;
    const o = r.clone(), c = (p, h) => {
      const d = this.associations.get(p);
      d != null && this.associations.set(h, d);
      for (const [g, w] of p.children.entries())
        c(w, h.children[g]);
    };
    return c(r, o), o.name += "_instance_" + n.uses[s]++, o;
  }
  _invokeOne(n) {
    const s = Object.values(this.plugins);
    s.push(this);
    for (let r = 0; r < s.length; r++) {
      const o = n(s[r]);
      if (o)
        return o;
    }
    return null;
  }
  _invokeAll(n) {
    const s = Object.values(this.plugins);
    s.unshift(this);
    const r = [];
    for (let o = 0; o < s.length; o++) {
      const c = n(s[o]);
      c && r.push(c);
    }
    return r;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
   */
  getDependency(n, s) {
    const r = n + ":" + s;
    let o = this.cache.get(r);
    if (!o) {
      switch (n) {
        case "scene":
          o = this.loadScene(s);
          break;
        case "node":
          o = this.loadNode(s);
          break;
        case "mesh":
          o = this._invokeOne(function(c) {
            return c.loadMesh && c.loadMesh(s);
          });
          break;
        case "accessor":
          o = this.loadAccessor(s);
          break;
        case "bufferView":
          o = this._invokeOne(function(c) {
            return c.loadBufferView && c.loadBufferView(s);
          });
          break;
        case "buffer":
          o = this.loadBuffer(s);
          break;
        case "material":
          o = this._invokeOne(function(c) {
            return c.loadMaterial && c.loadMaterial(s);
          });
          break;
        case "texture":
          o = this._invokeOne(function(c) {
            return c.loadTexture && c.loadTexture(s);
          });
          break;
        case "skin":
          o = this.loadSkin(s);
          break;
        case "animation":
          o = this._invokeOne(function(c) {
            return c.loadAnimation && c.loadAnimation(s);
          });
          break;
        case "camera":
          o = this.loadCamera(s);
          break;
        default:
          throw new Error("Unknown type: " + n);
      }
      this.cache.add(r, o);
    }
    return o;
  }
  /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */
  getDependencies(n) {
    let s = this.cache.get(n);
    if (!s) {
      const r = this, o = this.json[n + (n === "mesh" ? "es" : "s")] || [];
      s = Promise.all(o.map(function(c, p) {
        return r.getDependency(n, p);
      })), this.cache.add(n, s);
    }
    return s;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(n) {
    const s = this.json.buffers[n], r = this.fileLoader;
    if (s.type && s.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + s.type + " buffer type is not supported.");
    if (s.uri === void 0 && n === 0)
      return Promise.resolve(this.extensions[re.KHR_BINARY_GLTF].body);
    const o = this.options;
    return new Promise(function(c, p) {
      r.load(LoaderUtils.resolveURL(s.uri, o.path), c, void 0, function() {
        p(new Error('THREE.GLTFLoader: Failed to load buffer "' + s.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(n) {
    const s = this.json.bufferViews[n];
    return this.getDependency("buffer", s.buffer).then(function(r) {
      const o = s.byteLength || 0, c = s.byteOffset || 0;
      return r.slice(c, c + o);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(n) {
    const s = this, r = this.json, o = this.json.accessors[n];
    if (o.bufferView === void 0 && o.sparse === void 0)
      return Promise.resolve(null);
    const c = [];
    return o.bufferView !== void 0 ? c.push(this.getDependency("bufferView", o.bufferView)) : c.push(null), o.sparse !== void 0 && (c.push(this.getDependency("bufferView", o.sparse.indices.bufferView)), c.push(this.getDependency("bufferView", o.sparse.values.bufferView))), Promise.all(c).then(function(p) {
      const h = p[0], d = va[o.type], g = es[o.componentType], w = g.BYTES_PER_ELEMENT, _2 = w * d, y = o.byteOffset || 0, P = o.bufferView !== void 0 ? r.bufferViews[o.bufferView].byteStride : void 0, R = o.normalized === true;
      let k, A;
      if (P && P !== _2) {
        const z = Math.floor(y / P), F = "InterleavedBuffer:" + o.bufferView + ":" + o.componentType + ":" + z + ":" + o.count;
        let I = s.cache.get(F);
        I || (k = new g(h, z * P, o.count * P / w), I = new InterleavedBuffer(k, P / w), s.cache.add(F, I)), A = new InterleavedBufferAttribute(I, d, y % P / w, R);
      } else
        h === null ? k = new g(o.count * d) : k = new g(h, y, o.count * d), A = new BufferAttribute(k, d, R);
      if (o.sparse !== void 0) {
        const z = va.SCALAR, F = es[o.sparse.indices.componentType], I = o.sparse.indices.byteOffset || 0, D2 = o.sparse.values.byteOffset || 0, Y = new F(p[1], I, o.sparse.count * z), G = new g(p[2], D2, o.sparse.count * d);
        h !== null && (A = new BufferAttribute(A.array.slice(), A.itemSize, A.normalized));
        for (let N = 0, O = Y.length; N < O; N++) {
          const H = Y[N];
          if (A.setX(H, G[N * d]), d >= 2 && A.setY(H, G[N * d + 1]), d >= 3 && A.setZ(H, G[N * d + 2]), d >= 4 && A.setW(H, G[N * d + 3]), d >= 5)
            throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
      }
      return A;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture>}
   */
  loadTexture(n) {
    const s = this.json, r = this.options, c = s.textures[n].source, p = s.images[c];
    let h = this.textureLoader;
    if (p.uri) {
      const d = r.manager.getHandler(p.uri);
      d !== null && (h = d);
    }
    return this.loadTextureImage(n, c, h);
  }
  loadTextureImage(n, s, r) {
    const o = this, c = this.json, p = c.textures[n], h = c.images[s], d = (h.uri || h.bufferView) + ":" + p.sampler;
    if (this.textureCache[d])
      return this.textureCache[d];
    const g = this.loadImageSource(s, r).then(function(w) {
      w.flipY = false, p.name && (w.name = p.name);
      const y = (c.samplers || {})[p.sampler] || {};
      return w.magFilter = ma[y.magFilter] || LinearFilter, w.minFilter = ma[y.minFilter] || LinearMipmapLinearFilter, w.wrapS = fa[y.wrapS] || RepeatWrapping, w.wrapT = fa[y.wrapT] || RepeatWrapping, o.associations.set(w, {
        textures: n
      }), w;
    }).catch(function() {
      return null;
    });
    return this.textureCache[d] = g, g;
  }
  loadImageSource(n, s) {
    const r = this, o = this.json, c = this.options;
    if (this.sourceCache[n] !== void 0)
      return this.sourceCache[n].then((_2) => _2.clone());
    const p = o.images[n], h = self.URL || self.webkitURL;
    let d = p.uri || "", g = false;
    if (p.bufferView !== void 0)
      d = r.getDependency("bufferView", p.bufferView).then(function(_2) {
        g = true;
        const y = new Blob([_2], {
          type: p.mimeType
        });
        return d = h.createObjectURL(y), d;
      });
    else if (p.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + n + " is missing URI and bufferView");
    const w = Promise.resolve(d).then(function(_2) {
      return new Promise(function(y, P) {
        let R = y;
        s.isImageBitmapLoader === true && (R = function(k) {
          const A = new Texture(k);
          A.needsUpdate = true, y(A);
        }), s.load(LoaderUtils.resolveURL(_2, c.path), R, void 0, P);
      });
    }).then(function(_2) {
      return g === true && h.revokeObjectURL(d), _2.userData.mimeType = p.mimeType || Hp(p.uri), _2;
    }).catch(function(_2) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", d), _2;
    });
    return this.sourceCache[n] = w, w;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @return {Promise<Texture>}
   */
  assignTexture(n, s, r, o) {
    const c = this;
    return this.getDependency("texture", r.index).then(function(p) {
      if (r.texCoord !== void 0 && r.texCoord != 0 && !(s === "aoMap" && r.texCoord == 1) && console.warn("THREE.GLTFLoader: Custom UV set " + r.texCoord + " for texture " + s + " not yet supported."), c.extensions[re.KHR_TEXTURE_TRANSFORM]) {
        const h = r.extensions !== void 0 ? r.extensions[re.KHR_TEXTURE_TRANSFORM] : void 0;
        if (h) {
          const d = c.associations.get(p);
          p = c.extensions[re.KHR_TEXTURE_TRANSFORM].extendTexture(p, h), c.associations.set(p, d);
        }
      }
      return o !== void 0 && (p.encoding = o), n[s] = p, p;
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
  assignFinalMaterial(n) {
    const s = n.geometry;
    let r = n.material;
    const o = s.attributes.tangent === void 0, c = s.attributes.color !== void 0, p = s.attributes.normal === void 0;
    if (n.isPoints) {
      const h = "PointsMaterial:" + r.uuid;
      let d = this.cache.get(h);
      d || (d = new PointsMaterial(), Material.prototype.copy.call(d, r), d.color.copy(r.color), d.map = r.map, d.sizeAttenuation = false, this.cache.add(h, d)), r = d;
    } else if (n.isLine) {
      const h = "LineBasicMaterial:" + r.uuid;
      let d = this.cache.get(h);
      d || (d = new LineBasicMaterial(), Material.prototype.copy.call(d, r), d.color.copy(r.color), this.cache.add(h, d)), r = d;
    }
    if (o || c || p) {
      let h = "ClonedMaterial:" + r.uuid + ":";
      r.isGLTFSpecularGlossinessMaterial && (h += "specular-glossiness:"), o && (h += "derivative-tangents:"), c && (h += "vertex-colors:"), p && (h += "flat-shading:");
      let d = this.cache.get(h);
      d || (d = r.clone(), c && (d.vertexColors = true), p && (d.flatShading = true), o && (d.normalScale && (d.normalScale.y *= -1), d.clearcoatNormalScale && (d.clearcoatNormalScale.y *= -1)), this.cache.add(h, d), this.associations.set(d, this.associations.get(r))), r = d;
    }
    r.aoMap && s.attributes.uv2 === void 0 && s.attributes.uv !== void 0 && s.setAttribute("uv2", s.attributes.uv), n.material = r;
  }
  getMaterialType() {
    return MeshStandardMaterial;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(n) {
    const s = this, r = this.json, o = this.extensions, c = r.materials[n];
    let p;
    const h = {}, d = c.extensions || {}, g = [];
    if (d[re.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]) {
      const _2 = o[re.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];
      p = _2.getMaterialType(), g.push(_2.extendParams(h, c, s));
    } else if (d[re.KHR_MATERIALS_UNLIT]) {
      const _2 = o[re.KHR_MATERIALS_UNLIT];
      p = _2.getMaterialType(), g.push(_2.extendParams(h, c, s));
    } else {
      const _2 = c.pbrMetallicRoughness || {};
      if (h.color = new Color(1, 1, 1), h.opacity = 1, Array.isArray(_2.baseColorFactor)) {
        const y = _2.baseColorFactor;
        h.color.fromArray(y), h.opacity = y[3];
      }
      _2.baseColorTexture !== void 0 && g.push(s.assignTexture(h, "map", _2.baseColorTexture, sRGBEncoding)), h.metalness = _2.metallicFactor !== void 0 ? _2.metallicFactor : 1, h.roughness = _2.roughnessFactor !== void 0 ? _2.roughnessFactor : 1, _2.metallicRoughnessTexture !== void 0 && (g.push(s.assignTexture(h, "metalnessMap", _2.metallicRoughnessTexture)), g.push(s.assignTexture(h, "roughnessMap", _2.metallicRoughnessTexture))), p = this._invokeOne(function(y) {
        return y.getMaterialType && y.getMaterialType(n);
      }), g.push(Promise.all(this._invokeAll(function(y) {
        return y.extendMaterialParams && y.extendMaterialParams(n, h);
      })));
    }
    c.doubleSided === true && (h.side = DoubleSide);
    const w = c.alphaMode || ro.OPAQUE;
    if (w === ro.BLEND ? (h.transparent = true, h.depthWrite = false) : (h.transparent = false, w === ro.MASK && (h.alphaTest = c.alphaCutoff !== void 0 ? c.alphaCutoff : 0.5)), c.normalTexture !== void 0 && p !== MeshBasicMaterial && (g.push(s.assignTexture(h, "normalMap", c.normalTexture)), h.normalScale = new Vector2(1, 1), c.normalTexture.scale !== void 0)) {
      const _2 = c.normalTexture.scale;
      h.normalScale.set(_2, _2);
    }
    return c.occlusionTexture !== void 0 && p !== MeshBasicMaterial && (g.push(s.assignTexture(h, "aoMap", c.occlusionTexture)), c.occlusionTexture.strength !== void 0 && (h.aoMapIntensity = c.occlusionTexture.strength)), c.emissiveFactor !== void 0 && p !== MeshBasicMaterial && (h.emissive = new Color().fromArray(c.emissiveFactor)), c.emissiveTexture !== void 0 && p !== MeshBasicMaterial && g.push(s.assignTexture(h, "emissiveMap", c.emissiveTexture, sRGBEncoding)), Promise.all(g).then(function() {
      let _2;
      return p === go ? _2 = o[re.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(h) : _2 = new p(h), c.name && (_2.name = c.name), Dn(_2, c), s.associations.set(_2, {
        materials: n
      }), c.extensions && Xi(o, _2, c), _2;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(n) {
    const s = PropertyBinding.sanitizeNodeName(n || "");
    let r = s;
    for (let o = 1; this.nodeNamesUsed[r]; ++o)
      r = s + "_" + o;
    return this.nodeNamesUsed[r] = true, r;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */
  loadGeometries(n) {
    const s = this, r = this.extensions, o = this.primitiveCache;
    function c(h) {
      return r[re.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(h, s).then(function(d) {
        return ga(d, h, s);
      });
    }
    const p = [];
    for (let h = 0, d = n.length; h < d; h++) {
      const g = n[h], w = Gp(g), _2 = o[w];
      if (_2)
        p.push(_2.promise);
      else {
        let y;
        g.extensions && g.extensions[re.KHR_DRACO_MESH_COMPRESSION] ? y = c(g) : y = ga(new BufferGeometry(), g, s), o[w] = {
          primitive: g,
          promise: y
        }, p.push(y);
      }
    }
    return Promise.all(p);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */
  loadMesh(n) {
    const s = this, r = this.json, o = this.extensions, c = r.meshes[n], p = c.primitives, h = [];
    for (let d = 0, g = p.length; d < g; d++) {
      const w = p[d].material === void 0 ? zp(this.cache) : this.getDependency("material", p[d].material);
      h.push(w);
    }
    return h.push(s.loadGeometries(p)), Promise.all(h).then(function(d) {
      const g = d.slice(0, d.length - 1), w = d[d.length - 1], _2 = [];
      for (let P = 0, R = w.length; P < R; P++) {
        const k = w[P], A = p[P];
        let z;
        const F = g[P];
        if (A.mode === jt.TRIANGLES || A.mode === jt.TRIANGLE_STRIP || A.mode === jt.TRIANGLE_FAN || A.mode === void 0)
          z = c.isSkinnedMesh === true ? new SkinnedMesh(k, F) : new Mesh(k, F), z.isSkinnedMesh === true && !z.geometry.attributes.skinWeight.normalized && z.normalizeSkinWeights(), A.mode === jt.TRIANGLE_STRIP ? z.geometry = _a(z.geometry, TriangleStripDrawMode) : A.mode === jt.TRIANGLE_FAN && (z.geometry = _a(z.geometry, TriangleFanDrawMode));
        else if (A.mode === jt.LINES)
          z = new LineSegments(k, F);
        else if (A.mode === jt.LINE_STRIP)
          z = new Line(k, F);
        else if (A.mode === jt.LINE_LOOP)
          z = new LineLoop(k, F);
        else if (A.mode === jt.POINTS)
          z = new Points(k, F);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + A.mode);
        Object.keys(z.geometry.morphAttributes).length > 0 && Up(z, c), z.name = s.createUniqueName(c.name || "mesh_" + n), Dn(z, c), A.extensions && Xi(o, z, A), s.assignFinalMaterial(z), _2.push(z);
      }
      for (let P = 0, R = _2.length; P < R; P++)
        s.associations.set(_2[P], {
          meshes: n,
          primitives: P
        });
      if (_2.length === 1)
        return _2[0];
      const y = new Group();
      s.associations.set(y, {
        meshes: n
      });
      for (let P = 0, R = _2.length; P < R; P++)
        y.add(_2[P]);
      return y;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */
  loadCamera(n) {
    let s;
    const r = this.json.cameras[n], o = r[r.type];
    if (!o) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return r.type === "perspective" ? s = new PerspectiveCamera(MathUtils.radToDeg(o.yfov), o.aspectRatio || 1, o.znear || 1, o.zfar || 2e6) : r.type === "orthographic" && (s = new OrthographicCamera(-o.xmag, o.xmag, o.ymag, -o.ymag, o.znear, o.zfar)), r.name && (s.name = this.createUniqueName(r.name)), Dn(s, r), Promise.resolve(s);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Object>}
   */
  loadSkin(n) {
    const s = this.json.skins[n], r = {
      joints: s.joints
    };
    return s.inverseBindMatrices === void 0 ? Promise.resolve(r) : this.getDependency("accessor", s.inverseBindMatrices).then(function(o) {
      return r.inverseBindMatrices = o, r;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(n) {
    const r = this.json.animations[n], o = [], c = [], p = [], h = [], d = [];
    for (let g = 0, w = r.channels.length; g < w; g++) {
      const _2 = r.channels[g], y = r.samplers[_2.sampler], P = _2.target, R = P.node, k = r.parameters !== void 0 ? r.parameters[y.input] : y.input, A = r.parameters !== void 0 ? r.parameters[y.output] : y.output;
      o.push(this.getDependency("node", R)), c.push(this.getDependency("accessor", k)), p.push(this.getDependency("accessor", A)), h.push(y), d.push(P);
    }
    return Promise.all([Promise.all(o), Promise.all(c), Promise.all(p), Promise.all(h), Promise.all(d)]).then(function(g) {
      const w = g[0], _2 = g[1], y = g[2], P = g[3], R = g[4], k = [];
      for (let z = 0, F = w.length; z < F; z++) {
        const I = w[z], D2 = _2[z], Y = y[z], G = P[z], N = R[z];
        if (I === void 0)
          continue;
        I.updateMatrix();
        let O;
        switch (rn[N.path]) {
          case rn.weights:
            O = NumberKeyframeTrack;
            break;
          case rn.rotation:
            O = QuaternionKeyframeTrack;
            break;
          case rn.position:
          case rn.scale:
          default:
            O = VectorKeyframeTrack;
            break;
        }
        const H = I.name ? I.name : I.uuid, K = G.interpolation !== void 0 ? Bp[G.interpolation] : InterpolateLinear, q = [];
        rn[N.path] === rn.weights ? I.traverse(function(_e) {
          _e.morphTargetInfluences && q.push(_e.name ? _e.name : _e.uuid);
        }) : q.push(H);
        let pe = Y.array;
        if (Y.normalized) {
          const _e = wo(pe.constructor), ce = new Float32Array(pe.length);
          for (let me = 0, he = pe.length; me < he; me++)
            ce[me] = pe[me] * _e;
          pe = ce;
        }
        for (let _e = 0, ce = q.length; _e < ce; _e++) {
          const me = new O(q[_e] + "." + rn[N.path], D2.array, pe, K);
          G.interpolation === "CUBICSPLINE" && (me.createInterpolant = function(ee) {
            const X = this instanceof QuaternionKeyframeTrack ? Np : Ya;
            return new X(this.times, this.values, this.getValueSize() / 3, ee);
          }, me.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true), k.push(me);
        }
      }
      const A = r.name ? r.name : "animation_" + n;
      return new AnimationClip(A, void 0, k);
    });
  }
  createNodeMesh(n) {
    const s = this.json, r = this, o = s.nodes[n];
    return o.mesh === void 0 ? null : r.getDependency("mesh", o.mesh).then(function(c) {
      const p = r._getNodeRef(r.meshCache, o.mesh, c);
      return o.weights !== void 0 && p.traverse(function(h) {
        if (h.isMesh)
          for (let d = 0, g = o.weights.length; d < g; d++)
            h.morphTargetInfluences[d] = o.weights[d];
      }), p;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(n) {
    const s = this.json, r = this.extensions, o = this, c = s.nodes[n], p = c.name ? o.createUniqueName(c.name) : "";
    return function() {
      const h = [], d = o._invokeOne(function(g) {
        return g.createNodeMesh && g.createNodeMesh(n);
      });
      return d && h.push(d), c.camera !== void 0 && h.push(o.getDependency("camera", c.camera).then(function(g) {
        return o._getNodeRef(o.cameraCache, c.camera, g);
      })), o._invokeAll(function(g) {
        return g.createNodeAttachment && g.createNodeAttachment(n);
      }).forEach(function(g) {
        h.push(g);
      }), Promise.all(h);
    }().then(function(h) {
      let d;
      if (c.isBone === true ? d = new Bone() : h.length > 1 ? d = new Group() : h.length === 1 ? d = h[0] : d = new Object3D(), d !== h[0])
        for (let g = 0, w = h.length; g < w; g++)
          d.add(h[g]);
      if (c.name && (d.userData.name = c.name, d.name = p), Dn(d, c), c.extensions && Xi(r, d, c), c.matrix !== void 0) {
        const g = new Matrix4();
        g.fromArray(c.matrix), d.applyMatrix4(g);
      } else
        c.translation !== void 0 && d.position.fromArray(c.translation), c.rotation !== void 0 && d.quaternion.fromArray(c.rotation), c.scale !== void 0 && d.scale.fromArray(c.scale);
      return o.associations.has(d) || o.associations.set(d, {}), o.associations.get(d).nodes = n, d;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(n) {
    const s = this.json, r = this.extensions, o = this.json.scenes[n], c = this, p = new Group();
    o.name && (p.name = c.createUniqueName(o.name)), Dn(p, o), o.extensions && Xi(r, p, o);
    const h = o.nodes || [], d = [];
    for (let g = 0, w = h.length; g < w; g++)
      d.push(qa(h[g], p, s, c));
    return Promise.all(d).then(function() {
      const g = (w) => {
        const _2 = /* @__PURE__ */ new Map();
        for (const [y, P] of c.associations)
          (y instanceof Material || y instanceof Texture) && _2.set(y, P);
        return w.traverse((y) => {
          const P = c.associations.get(y);
          P != null && _2.set(y, P);
        }), _2;
      };
      return c.associations = g(p), p;
    });
  }
};
function qa(v, n, s, r) {
  const o = s.nodes[v];
  return r.getDependency("node", v).then(function(c) {
    if (o.skin === void 0)
      return c;
    let p;
    return r.getDependency("skin", o.skin).then(function(h) {
      p = h;
      const d = [];
      for (let g = 0, w = p.joints.length; g < w; g++)
        d.push(r.getDependency("node", p.joints[g]));
      return Promise.all(d);
    }).then(function(h) {
      return c.traverse(function(d) {
        if (!d.isMesh)
          return;
        const g = [], w = [];
        for (let _2 = 0, y = h.length; _2 < y; _2++) {
          const P = h[_2];
          if (P) {
            g.push(P);
            const R = new Matrix4();
            p.inverseBindMatrices !== void 0 && R.fromArray(p.inverseBindMatrices.array, _2 * 16), w.push(R);
          } else
            console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', p.joints[_2]);
        }
        d.bind(new Skeleton(g, w), d.matrixWorld);
      }), c;
    });
  }).then(function(c) {
    n.add(c);
    const p = [];
    if (o.children) {
      const h = o.children;
      for (let d = 0, g = h.length; d < g; d++) {
        const w = h[d];
        p.push(qa(w, c, s, r));
      }
    }
    return Promise.all(p);
  });
}
function $p(v, n, s) {
  const r = n.attributes, o = new Box3();
  if (r.POSITION !== void 0) {
    const h = s.json.accessors[r.POSITION], d = h.min, g = h.max;
    if (d !== void 0 && g !== void 0) {
      if (o.set(new Vector3(d[0], d[1], d[2]), new Vector3(g[0], g[1], g[2])), h.normalized) {
        const w = wo(es[h.componentType]);
        o.min.multiplyScalar(w), o.max.multiplyScalar(w);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const c = n.targets;
  if (c !== void 0) {
    const h = new Vector3(), d = new Vector3();
    for (let g = 0, w = c.length; g < w; g++) {
      const _2 = c[g];
      if (_2.POSITION !== void 0) {
        const y = s.json.accessors[_2.POSITION], P = y.min, R = y.max;
        if (P !== void 0 && R !== void 0) {
          if (d.setX(Math.max(Math.abs(P[0]), Math.abs(R[0]))), d.setY(Math.max(Math.abs(P[1]), Math.abs(R[1]))), d.setZ(Math.max(Math.abs(P[2]), Math.abs(R[2]))), y.normalized) {
            const k = wo(es[y.componentType]);
            d.multiplyScalar(k);
          }
          h.max(d);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    o.expandByVector(h);
  }
  v.boundingBox = o;
  const p = new Sphere();
  o.getCenter(p.center), p.radius = o.min.distanceTo(o.max) / 2, v.boundingSphere = p;
}
function ga(v, n, s) {
  const r = n.attributes, o = [];
  function c(p, h) {
    return s.getDependency("accessor", p).then(function(d) {
      v.setAttribute(h, d);
    });
  }
  for (const p in r) {
    const h = _o[p] || p.toLowerCase();
    h in v.attributes || o.push(c(r[p], h));
  }
  if (n.indices !== void 0 && !v.index) {
    const p = s.getDependency("accessor", n.indices).then(function(h) {
      v.setIndex(h);
    });
    o.push(p);
  }
  return Dn(v, n), $p(v, n, s), Promise.all(o).then(function() {
    return n.targets !== void 0 ? jp(v, n.targets, s) : v;
  });
}
function _a(v, n) {
  let s = v.getIndex();
  if (s === null) {
    const p = [], h = v.getAttribute("position");
    if (h !== void 0) {
      for (let d = 0; d < h.count; d++)
        p.push(d);
      v.setIndex(p), s = v.getIndex();
    } else
      return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), v;
  }
  const r = s.count - 2, o = [];
  if (n === TriangleFanDrawMode)
    for (let p = 1; p <= r; p++)
      o.push(s.getX(0)), o.push(s.getX(p)), o.push(s.getX(p + 1));
  else
    for (let p = 0; p < r; p++)
      p % 2 === 0 ? (o.push(s.getX(p)), o.push(s.getX(p + 1)), o.push(s.getX(p + 2))) : (o.push(s.getX(p + 2)), o.push(s.getX(p + 1)), o.push(s.getX(p)));
  o.length / 3 !== r && console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
  const c = v.clone();
  return c.setIndex(o), c;
}
var Xp = class extends ExtrudeGeometry {
  constructor(n, s = {}) {
    const {
      bevelEnabled: r = false,
      bevelSize: o = 8,
      bevelThickness: c = 10,
      font: p,
      height: h = 50,
      size: d = 100,
      lineHeight: g = 1,
      letterSpacing: w = 0,
      ..._2
    } = s;
    if (p === void 0)
      super();
    else {
      const y = p.generateShapes(n, d, {
        lineHeight: g,
        letterSpacing: w
      });
      super(y, {
        ..._2,
        bevelEnabled: r,
        bevelSize: o,
        bevelThickness: c,
        depth: h
      });
    }
    this.type = "TextGeometry";
  }
};
function Qa(v, n, s) {
  const r = s.length - v - 1;
  if (n >= s[r])
    return r - 1;
  if (n <= s[v])
    return v;
  let o = v, c = r, p = Math.floor((o + c) / 2);
  for (; n < s[p] || n >= s[p + 1]; )
    n < s[p] ? c = p : o = p, p = Math.floor((o + c) / 2);
  return p;
}
function Yp(v, n, s, r) {
  const o = [], c = [], p = [];
  o[0] = 1;
  for (let h = 1; h <= s; ++h) {
    c[h] = n - r[v + 1 - h], p[h] = r[v + h] - n;
    let d = 0;
    for (let g = 0; g < h; ++g) {
      const w = p[g + 1], _2 = c[h - g], y = o[g] / (w + _2);
      o[g] = d + w * y, d = _2 * y;
    }
    o[h] = d;
  }
  return o;
}
function qp(v, n, s, r) {
  const o = Qa(v, r, n), c = Yp(o, r, v, n), p = new Vector4(0, 0, 0, 0);
  for (let h = 0; h <= v; ++h) {
    const d = s[o - v + h], g = c[h], w = d.w * g;
    p.x += d.x * w, p.y += d.y * w, p.z += d.z * w, p.w += d.w * g;
  }
  return p;
}
function Qp(v, n, s, r, o) {
  const c = [];
  for (let y = 0; y <= s; ++y)
    c[y] = 0;
  const p = [];
  for (let y = 0; y <= r; ++y)
    p[y] = c.slice(0);
  const h = [];
  for (let y = 0; y <= s; ++y)
    h[y] = c.slice(0);
  h[0][0] = 1;
  const d = c.slice(0), g = c.slice(0);
  for (let y = 1; y <= s; ++y) {
    d[y] = n - o[v + 1 - y], g[y] = o[v + y] - n;
    let P = 0;
    for (let R = 0; R < y; ++R) {
      const k = g[R + 1], A = d[y - R];
      h[y][R] = k + A;
      const z = h[R][y - 1] / h[y][R];
      h[R][y] = P + k * z, P = A * z;
    }
    h[y][y] = P;
  }
  for (let y = 0; y <= s; ++y)
    p[0][y] = h[y][s];
  for (let y = 0; y <= s; ++y) {
    let P = 0, R = 1;
    const k = [];
    for (let A = 0; A <= s; ++A)
      k[A] = c.slice(0);
    k[0][0] = 1;
    for (let A = 1; A <= r; ++A) {
      let z = 0;
      const F = y - A, I = s - A;
      y >= A && (k[R][0] = k[P][0] / h[I + 1][F], z = k[R][0] * h[F][I]);
      const D2 = F >= -1 ? 1 : -F, Y = y - 1 <= I ? A - 1 : s - y;
      for (let G = D2; G <= Y; ++G)
        k[R][G] = (k[P][G] - k[P][G - 1]) / h[I + 1][F + G], z += k[R][G] * h[F + G][I];
      y <= I && (k[R][A] = -k[P][A - 1] / h[I + 1][y], z += k[R][A] * h[y][I]), p[A][y] = z;
      var w = P;
      P = R, R = w;
    }
  }
  var _2 = s;
  for (let y = 1; y <= r; ++y) {
    for (let P = 0; P <= s; ++P)
      p[y][P] *= _2;
    _2 *= s - y;
  }
  return p;
}
function Zp(v, n, s, r, o) {
  const c = o < v ? o : v, p = [], h = Qa(v, r, n), d = Qp(h, r, v, c, n), g = [];
  for (let _2 = 0; _2 < s.length; ++_2) {
    var w = s[_2].clone();
    const y = w.w;
    w.x *= y, w.y *= y, w.z *= y, g[_2] = w;
  }
  for (let _2 = 0; _2 <= c; ++_2) {
    var w = g[h - v].clone().multiplyScalar(d[_2][0]);
    for (let P = 1; P <= v; ++P)
      w.add(g[h - v + P].clone().multiplyScalar(d[_2][P]));
    p[_2] = w;
  }
  for (let _2 = c + 1; _2 <= o + 1; ++_2)
    p[_2] = new Vector4(0, 0, 0);
  return p;
}
function Wp(v, n) {
  let s = 1;
  for (let o = 2; o <= v; ++o)
    s *= o;
  let r = 1;
  for (let o = 2; o <= n; ++o)
    r *= o;
  for (let o = 2; o <= v - n; ++o)
    r *= o;
  return s / r;
}
function Jp(v) {
  const n = v.length, s = [], r = [];
  for (let c = 0; c < n; ++c) {
    const p = v[c];
    s[c] = new Vector3(p.x, p.y, p.z), r[c] = p.w;
  }
  const o = [];
  for (let c = 0; c < n; ++c) {
    const p = s[c].clone();
    for (let h = 1; h <= c; ++h)
      p.sub(o[c - h].clone().multiplyScalar(Wp(c, h) * r[h]));
    o[c] = p.divideScalar(r[0]);
  }
  return o;
}
function eh(v, n, s, r, o) {
  const c = Zp(v, n, s, r, o);
  return Jp(c);
}
var wa = class extends Curve {
  constructor(n, s, r, o, c) {
    super(), this.degree = n, this.knots = s, this.controlPoints = [], this.startKnot = o || 0, this.endKnot = c || this.knots.length - 1;
    for (let p = 0; p < r.length; ++p) {
      const h = r[p];
      this.controlPoints[p] = new Vector4(h.x, h.y, h.z, h.w);
    }
  }
  getPoint(n, s) {
    const r = s || new Vector3(), o = this.knots[this.startKnot] + n * (this.knots[this.endKnot] - this.knots[this.startKnot]), c = qp(this.degree, this.knots, this.controlPoints, o);
    return c.w != 1 && c.divideScalar(c.w), r.set(c.x, c.y, c.z);
  }
  getTangent(n, s) {
    const r = s || new Vector3(), o = this.knots[0] + n * (this.knots[this.knots.length - 1] - this.knots[0]), c = eh(this.degree, this.knots, this.controlPoints, o, 1);
    return r.copy(c[1]).normalize(), r;
  }
};
var se;
var Ve;
var tt;
var th = class extends Loader {
  constructor(n) {
    super(n);
  }
  load(n, s, r, o) {
    const c = this, p = c.path === "" ? LoaderUtils.extractUrlBase(n) : c.path, h = new FileLoader(this.manager);
    h.setPath(c.path), h.setResponseType("arraybuffer"), h.setRequestHeader(c.requestHeader), h.setWithCredentials(c.withCredentials), h.load(n, function(d) {
      try {
        s(c.parse(d, p));
      } catch (g) {
        o ? o(g) : console.error(g), c.manager.itemError(n);
      }
    }, r, o);
  }
  parse(n, s) {
    if (ah(n))
      se = new oh().parse(n);
    else {
      const o = el(n);
      if (!lh(o))
        throw new Error("THREE.FBXLoader: Unknown format.");
      if (xa(o) < 7e3)
        throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + xa(o));
      se = new rh().parse(o);
    }
    const r = new TextureLoader(this.manager).setPath(this.resourcePath || s).setCrossOrigin(this.crossOrigin);
    return new nh(r, this.manager).parse(se);
  }
};
var nh = class {
  constructor(n, s) {
    this.textureLoader = n, this.manager = s;
  }
  parse() {
    Ve = this.parseConnections();
    const n = this.parseImages(), s = this.parseTextures(n), r = this.parseMaterials(s), o = this.parseDeformers(), c = new ih().parse(o);
    return this.parseScene(o, c, r), tt;
  }
  // Parses FBXTree.Connections which holds parent-child connections between objects (e.g. material -> texture, model->geometry )
  // and details the connection type
  parseConnections() {
    const n = /* @__PURE__ */ new Map();
    return "Connections" in se && se.Connections.connections.forEach(function(r) {
      const o = r[0], c = r[1], p = r[2];
      n.has(o) || n.set(o, {
        parents: [],
        children: []
      });
      const h = {
        ID: c,
        relationship: p
      };
      n.get(o).parents.push(h), n.has(c) || n.set(c, {
        parents: [],
        children: []
      });
      const d = {
        ID: o,
        relationship: p
      };
      n.get(c).children.push(d);
    }), n;
  }
  // Parse FBXTree.Objects.Video for embedded image data
  // These images are connected to textures in FBXTree.Objects.Textures
  // via FBXTree.Connections.
  parseImages() {
    const n = {}, s = {};
    if ("Video" in se.Objects) {
      const r = se.Objects.Video;
      for (const o in r) {
        const c = r[o], p = parseInt(o);
        if (n[p] = c.RelativeFilename || c.Filename, "Content" in c) {
          const h = c.Content instanceof ArrayBuffer && c.Content.byteLength > 0, d = typeof c.Content == "string" && c.Content !== "";
          if (h || d) {
            const g = this.parseImage(r[o]);
            s[c.RelativeFilename || c.Filename] = g;
          }
        }
      }
    }
    for (const r in n) {
      const o = n[r];
      s[o] !== void 0 ? n[r] = s[o] : n[r] = n[r].split("\\").pop();
    }
    return n;
  }
  // Parse embedded image data in FBXTree.Video.Content
  parseImage(n) {
    const s = n.Content, r = n.RelativeFilename || n.Filename, o = r.slice(r.lastIndexOf(".") + 1).toLowerCase();
    let c;
    switch (o) {
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
        this.manager.getHandler(".tga") === null && console.warn("FBXLoader: TGA loader not found, skipping ", r), c = "image/tga";
        break;
      default:
        console.warn('FBXLoader: Image type "' + o + '" is not supported.');
        return;
    }
    if (typeof s == "string")
      return "data:" + c + ";base64," + s;
    {
      const p = new Uint8Array(s);
      return window.URL.createObjectURL(new Blob([p], {
        type: c
      }));
    }
  }
  // Parse nodes in FBXTree.Objects.Texture
  // These contain details such as UV scaling, cropping, rotation etc and are connected
  // to images in FBXTree.Objects.Video
  parseTextures(n) {
    const s = /* @__PURE__ */ new Map();
    if ("Texture" in se.Objects) {
      const r = se.Objects.Texture;
      for (const o in r) {
        const c = this.parseTexture(r[o], n);
        s.set(parseInt(o), c);
      }
    }
    return s;
  }
  // Parse individual node in FBXTree.Objects.Texture
  parseTexture(n, s) {
    const r = this.loadTexture(n, s);
    r.ID = n.id, r.name = n.attrName;
    const o = n.WrapModeU, c = n.WrapModeV, p = o !== void 0 ? o.value : 0, h = c !== void 0 ? c.value : 0;
    if (r.wrapS = p === 0 ? RepeatWrapping : ClampToEdgeWrapping, r.wrapT = h === 0 ? RepeatWrapping : ClampToEdgeWrapping, "Scaling" in n) {
      const d = n.Scaling.value;
      r.repeat.x = d[0], r.repeat.y = d[1];
    }
    return r;
  }
  // load a texture specified as a blob or data URI, or via an external URL using TextureLoader
  loadTexture(n, s) {
    let r;
    const o = this.textureLoader.path, c = Ve.get(n.id).children;
    c !== void 0 && c.length > 0 && s[c[0].ID] !== void 0 && (r = s[c[0].ID], (r.indexOf("blob:") === 0 || r.indexOf("data:") === 0) && this.textureLoader.setPath(void 0));
    let p;
    const h = n.FileName.slice(-3).toLowerCase();
    if (h === "tga") {
      const d = this.manager.getHandler(".tga");
      d === null ? (console.warn("FBXLoader: TGA loader not found, creating placeholder texture for", n.RelativeFilename), p = new Texture()) : (d.setPath(this.textureLoader.path), p = d.load(r));
    } else
      h === "psd" ? (console.warn("FBXLoader: PSD textures are not supported, creating placeholder texture for", n.RelativeFilename), p = new Texture()) : p = this.textureLoader.load(r);
    return this.textureLoader.setPath(o), p;
  }
  // Parse nodes in FBXTree.Objects.Material
  parseMaterials(n) {
    const s = /* @__PURE__ */ new Map();
    if ("Material" in se.Objects) {
      const r = se.Objects.Material;
      for (const o in r) {
        const c = this.parseMaterial(r[o], n);
        c !== null && s.set(parseInt(o), c);
      }
    }
    return s;
  }
  // Parse single node in FBXTree.Objects.Material
  // Materials are connected to texture maps in FBXTree.Objects.Textures
  // FBX format currently only supports Lambert and Phong shading models
  parseMaterial(n, s) {
    const r = n.id, o = n.attrName;
    let c = n.ShadingModel;
    if (typeof c == "object" && (c = c.value), !Ve.has(r))
      return null;
    const p = this.parseParameters(n, s, r);
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
    return h.setValues(p), h.name = o, h;
  }
  // Parse FBX material and return parameters suitable for a three.js material
  // Also parse the texture map and return any textures associated with the material
  parseParameters(n, s, r) {
    const o = {};
    n.BumpFactor && (o.bumpScale = n.BumpFactor.value), n.Diffuse ? o.color = new Color().fromArray(n.Diffuse.value) : n.DiffuseColor && (n.DiffuseColor.type === "Color" || n.DiffuseColor.type === "ColorRGB") && (o.color = new Color().fromArray(n.DiffuseColor.value)), n.DisplacementFactor && (o.displacementScale = n.DisplacementFactor.value), n.Emissive ? o.emissive = new Color().fromArray(n.Emissive.value) : n.EmissiveColor && (n.EmissiveColor.type === "Color" || n.EmissiveColor.type === "ColorRGB") && (o.emissive = new Color().fromArray(n.EmissiveColor.value)), n.EmissiveFactor && (o.emissiveIntensity = parseFloat(n.EmissiveFactor.value)), n.Opacity && (o.opacity = parseFloat(n.Opacity.value)), o.opacity < 1 && (o.transparent = true), n.ReflectionFactor && (o.reflectivity = n.ReflectionFactor.value), n.Shininess && (o.shininess = n.Shininess.value), n.Specular ? o.specular = new Color().fromArray(n.Specular.value) : n.SpecularColor && n.SpecularColor.type === "Color" && (o.specular = new Color().fromArray(n.SpecularColor.value));
    const c = this;
    return Ve.get(r).children.forEach(function(p) {
      const h = p.relationship;
      switch (h) {
        case "Bump":
          o.bumpMap = c.getTexture(s, p.ID);
          break;
        case "Maya|TEX_ao_map":
          o.aoMap = c.getTexture(s, p.ID);
          break;
        case "DiffuseColor":
        case "Maya|TEX_color_map":
          o.map = c.getTexture(s, p.ID), o.map !== void 0 && (o.map.encoding = sRGBEncoding);
          break;
        case "DisplacementColor":
          o.displacementMap = c.getTexture(s, p.ID);
          break;
        case "EmissiveColor":
          o.emissiveMap = c.getTexture(s, p.ID), o.emissiveMap !== void 0 && (o.emissiveMap.encoding = sRGBEncoding);
          break;
        case "NormalMap":
        case "Maya|TEX_normal_map":
          o.normalMap = c.getTexture(s, p.ID);
          break;
        case "ReflectionColor":
          o.envMap = c.getTexture(s, p.ID), o.envMap !== void 0 && (o.envMap.mapping = EquirectangularReflectionMapping, o.envMap.encoding = sRGBEncoding);
          break;
        case "SpecularColor":
          o.specularMap = c.getTexture(s, p.ID), o.specularMap !== void 0 && (o.specularMap.encoding = sRGBEncoding);
          break;
        case "TransparentColor":
        case "TransparencyFactor":
          o.alphaMap = c.getTexture(s, p.ID), o.transparent = true;
          break;
        case "AmbientColor":
        case "ShininessExponent":
        case "SpecularFactor":
        case "VectorDisplacementColor":
        default:
          console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.", h);
          break;
      }
    }), o;
  }
  // get a texture from the textureMap for use by a material.
  getTexture(n, s) {
    return "LayeredTexture" in se.Objects && s in se.Objects.LayeredTexture && (console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."), s = Ve.get(s).children[0].ID), n.get(s);
  }
  // Parse nodes in FBXTree.Objects.Deformer
  // Deformer node can contain skinning or Vertex Cache animation data, however only skinning is supported here
  // Generates map of Skeleton-like objects for use later when generating and binding skeletons.
  parseDeformers() {
    const n = {}, s = {};
    if ("Deformer" in se.Objects) {
      const r = se.Objects.Deformer;
      for (const o in r) {
        const c = r[o], p = Ve.get(parseInt(o));
        if (c.attrType === "Skin") {
          const h = this.parseSkeleton(p, r);
          h.ID = o, p.parents.length > 1 && console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."), h.geometryID = p.parents[0].ID, n[o] = h;
        } else if (c.attrType === "BlendShape") {
          const h = {
            id: o
          };
          h.rawTargets = this.parseMorphTargets(p, r), h.id = o, p.parents.length > 1 && console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."), s[o] = h;
        }
      }
    }
    return {
      skeletons: n,
      morphTargets: s
    };
  }
  // Parse single nodes in FBXTree.Objects.Deformer
  // The top level skeleton node has type 'Skin' and sub nodes have type 'Cluster'
  // Each skin node represents a skeleton and each cluster node represents a bone
  parseSkeleton(n, s) {
    const r = [];
    return n.children.forEach(function(o) {
      const c = s[o.ID];
      if (c.attrType !== "Cluster")
        return;
      const p = {
        ID: o.ID,
        indices: [],
        weights: [],
        transformLink: new Matrix4().fromArray(c.TransformLink.a)
        // transform: new Matrix4().fromArray( boneNode.Transform.a ),
        // linkMode: boneNode.Mode,
      };
      "Indexes" in c && (p.indices = c.Indexes.a, p.weights = c.Weights.a), r.push(p);
    }), {
      rawBones: r,
      bones: []
    };
  }
  // The top level morph deformer node has type "BlendShape" and sub nodes have type "BlendShapeChannel"
  parseMorphTargets(n, s) {
    const r = [];
    for (let o = 0; o < n.children.length; o++) {
      const c = n.children[o], p = s[c.ID], h = {
        name: p.attrName,
        initialWeight: p.DeformPercent,
        id: p.id,
        fullWeights: p.FullWeights.a
      };
      if (p.attrType !== "BlendShapeChannel")
        return;
      h.geoID = Ve.get(parseInt(c.ID)).children.filter(function(d) {
        return d.relationship === void 0;
      })[0].ID, r.push(h);
    }
    return r;
  }
  // create the main Group() to be returned by the loader
  parseScene(n, s, r) {
    tt = new Group();
    const o = this.parseModels(n.skeletons, s, r), c = se.Objects.Model, p = this;
    o.forEach(function(d) {
      const g = c[d.ID];
      p.setLookAtProperties(d, g), Ve.get(d.ID).parents.forEach(function(_2) {
        const y = o.get(_2.ID);
        y !== void 0 && y.add(d);
      }), d.parent === null && tt.add(d);
    }), this.bindSkeleton(n.skeletons, s, o), this.createAmbientLight(), tt.traverse(function(d) {
      if (d.userData.transformData) {
        d.parent && (d.userData.transformData.parentMatrix = d.parent.matrix, d.userData.transformData.parentMatrixWorld = d.parent.matrixWorld);
        const g = Wa(d.userData.transformData);
        d.applyMatrix4(g), d.updateWorldMatrix();
      }
    });
    const h = new sh().parse();
    tt.children.length === 1 && tt.children[0].isGroup && (tt.children[0].animations = h, tt = tt.children[0]), tt.animations = h;
  }
  // parse nodes in FBXTree.Objects.Model
  parseModels(n, s, r) {
    const o = /* @__PURE__ */ new Map(), c = se.Objects.Model;
    for (const p in c) {
      const h = parseInt(p), d = c[p], g = Ve.get(h);
      let w = this.buildSkeleton(g, n, h, d.attrName);
      if (!w) {
        switch (d.attrType) {
          case "Camera":
            w = this.createCamera(g);
            break;
          case "Light":
            w = this.createLight(g);
            break;
          case "Mesh":
            w = this.createMesh(g, s, r);
            break;
          case "NurbsCurve":
            w = this.createCurve(g, s);
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
        w.name = d.attrName ? PropertyBinding.sanitizeNodeName(d.attrName) : "", w.ID = h;
      }
      this.getTransformData(w, d), o.set(h, w);
    }
    return o;
  }
  buildSkeleton(n, s, r, o) {
    let c = null;
    return n.parents.forEach(function(p) {
      for (const h in s) {
        const d = s[h];
        d.rawBones.forEach(function(g, w) {
          if (g.ID === p.ID) {
            const _2 = c;
            c = new Bone(), c.matrixWorld.copy(g.transformLink), c.name = o ? PropertyBinding.sanitizeNodeName(o) : "", c.ID = r, d.bones[w] = c, _2 !== null && c.add(_2);
          }
        });
      }
    }), c;
  }
  // create a PerspectiveCamera or OrthographicCamera
  createCamera(n) {
    let s, r;
    if (n.children.forEach(function(o) {
      const c = se.Objects.NodeAttribute[o.ID];
      c !== void 0 && (r = c);
    }), r === void 0)
      s = new Object3D();
    else {
      let o = 0;
      r.CameraProjectionType !== void 0 && r.CameraProjectionType.value === 1 && (o = 1);
      let c = 1;
      r.NearPlane !== void 0 && (c = r.NearPlane.value / 1e3);
      let p = 1e3;
      r.FarPlane !== void 0 && (p = r.FarPlane.value / 1e3);
      let h = window.innerWidth, d = window.innerHeight;
      r.AspectWidth !== void 0 && r.AspectHeight !== void 0 && (h = r.AspectWidth.value, d = r.AspectHeight.value);
      const g = h / d;
      let w = 45;
      r.FieldOfView !== void 0 && (w = r.FieldOfView.value);
      const _2 = r.FocalLength ? r.FocalLength.value : null;
      switch (o) {
        case 0:
          s = new PerspectiveCamera(w, g, c, p), _2 !== null && s.setFocalLength(_2);
          break;
        case 1:
          s = new OrthographicCamera(-h / 2, h / 2, d / 2, -d / 2, c, p);
          break;
        default:
          console.warn("THREE.FBXLoader: Unknown camera type " + o + "."), s = new Object3D();
          break;
      }
    }
    return s;
  }
  // Create a DirectionalLight, PointLight or SpotLight
  createLight(n) {
    let s, r;
    if (n.children.forEach(function(o) {
      const c = se.Objects.NodeAttribute[o.ID];
      c !== void 0 && (r = c);
    }), r === void 0)
      s = new Object3D();
    else {
      let o;
      r.LightType === void 0 ? o = 0 : o = r.LightType.value;
      let c = 16777215;
      r.Color !== void 0 && (c = new Color().fromArray(r.Color.value));
      let p = r.Intensity === void 0 ? 1 : r.Intensity.value / 100;
      r.CastLightOnObject !== void 0 && r.CastLightOnObject.value === 0 && (p = 0);
      let h = 0;
      r.FarAttenuationEnd !== void 0 && (r.EnableFarAttenuation !== void 0 && r.EnableFarAttenuation.value === 0 ? h = 0 : h = r.FarAttenuationEnd.value);
      const d = 1;
      switch (o) {
        case 0:
          s = new PointLight(c, p, h, d);
          break;
        case 1:
          s = new DirectionalLight(c, p);
          break;
        case 2:
          let g = Math.PI / 3;
          r.InnerAngle !== void 0 && (g = MathUtils.degToRad(r.InnerAngle.value));
          let w = 0;
          r.OuterAngle !== void 0 && (w = MathUtils.degToRad(r.OuterAngle.value), w = Math.max(w, 1)), s = new SpotLight(c, p, h, g, w, d);
          break;
        default:
          console.warn("THREE.FBXLoader: Unknown light type " + r.LightType.value + ", defaulting to a PointLight."), s = new PointLight(c, p);
          break;
      }
      r.CastShadows !== void 0 && r.CastShadows.value === 1 && (s.castShadow = true);
    }
    return s;
  }
  createMesh(n, s, r) {
    let o, c = null, p = null;
    const h = [];
    return n.children.forEach(function(d) {
      s.has(d.ID) && (c = s.get(d.ID)), r.has(d.ID) && h.push(r.get(d.ID));
    }), h.length > 1 ? p = h : h.length > 0 ? p = h[0] : (p = new MeshPhongMaterial({
      color: 13421772
    }), h.push(p)), "color" in c.attributes && h.forEach(function(d) {
      d.vertexColors = true;
    }), c.FBX_Deformer ? (o = new SkinnedMesh(c, p), o.normalizeSkinWeights()) : o = new Mesh(c, p), o;
  }
  createCurve(n, s) {
    const r = n.children.reduce(function(c, p) {
      return s.has(p.ID) && (c = s.get(p.ID)), c;
    }, null), o = new LineBasicMaterial({
      color: 3342591,
      linewidth: 1
    });
    return new Line(r, o);
  }
  // parse the model node for transform data
  getTransformData(n, s) {
    const r = {};
    "InheritType" in s && (r.inheritType = parseInt(s.InheritType.value)), "RotationOrder" in s ? r.eulerOrder = Ja(s.RotationOrder.value) : r.eulerOrder = "ZYX", "Lcl_Translation" in s && (r.translation = s.Lcl_Translation.value), "PreRotation" in s && (r.preRotation = s.PreRotation.value), "Lcl_Rotation" in s && (r.rotation = s.Lcl_Rotation.value), "PostRotation" in s && (r.postRotation = s.PostRotation.value), "Lcl_Scaling" in s && (r.scale = s.Lcl_Scaling.value), "ScalingOffset" in s && (r.scalingOffset = s.ScalingOffset.value), "ScalingPivot" in s && (r.scalingPivot = s.ScalingPivot.value), "RotationOffset" in s && (r.rotationOffset = s.RotationOffset.value), "RotationPivot" in s && (r.rotationPivot = s.RotationPivot.value), n.userData.transformData = r;
  }
  setLookAtProperties(n, s) {
    "LookAtProperty" in s && Ve.get(n.ID).children.forEach(function(o) {
      if (o.relationship === "LookAtProperty") {
        const c = se.Objects.Model[o.ID];
        if ("Lcl_Translation" in c) {
          const p = c.Lcl_Translation.value;
          n.target !== void 0 ? (n.target.position.fromArray(p), tt.add(n.target)) : n.lookAt(new Vector3().fromArray(p));
        }
      }
    });
  }
  bindSkeleton(n, s, r) {
    const o = this.parsePoseNodes();
    for (const c in n) {
      const p = n[c];
      Ve.get(parseInt(p.ID)).parents.forEach(function(d) {
        if (s.has(d.ID)) {
          const g = d.ID;
          Ve.get(g).parents.forEach(function(_2) {
            r.has(_2.ID) && r.get(_2.ID).bind(new Skeleton(p.bones), o[_2.ID]);
          });
        }
      });
    }
  }
  parsePoseNodes() {
    const n = {};
    if ("Pose" in se.Objects) {
      const s = se.Objects.Pose;
      for (const r in s)
        if (s[r].attrType === "BindPose" && s[r].NbPoseNodes > 0) {
          const o = s[r].PoseNode;
          Array.isArray(o) ? o.forEach(function(c) {
            n[c.Node] = new Matrix4().fromArray(c.Matrix.a);
          }) : n[o.Node] = new Matrix4().fromArray(o.Matrix.a);
        }
    }
    return n;
  }
  // Parse ambient color in FBXTree.GlobalSettings - if it's not set to black (default), create an ambient light
  createAmbientLight() {
    if ("GlobalSettings" in se && "AmbientColor" in se.GlobalSettings) {
      const n = se.GlobalSettings.AmbientColor.value, s = n[0], r = n[1], o = n[2];
      if (s !== 0 || r !== 0 || o !== 0) {
        const c = new Color(s, r, o);
        tt.add(new AmbientLight(c, 1));
      }
    }
  }
};
var ih = class {
  // Parse nodes in FBXTree.Objects.Geometry
  parse(n) {
    const s = /* @__PURE__ */ new Map();
    if ("Geometry" in se.Objects) {
      const r = se.Objects.Geometry;
      for (const o in r) {
        const c = Ve.get(parseInt(o)), p = this.parseGeometry(c, r[o], n);
        s.set(parseInt(o), p);
      }
    }
    return s;
  }
  // Parse single node in FBXTree.Objects.Geometry
  parseGeometry(n, s, r) {
    switch (s.attrType) {
      case "Mesh":
        return this.parseMeshGeometry(n, s, r);
      case "NurbsCurve":
        return this.parseNurbsGeometry(s);
    }
  }
  // Parse single node mesh geometry in FBXTree.Objects.Geometry
  parseMeshGeometry(n, s, r) {
    const o = r.skeletons, c = [], p = n.parents.map(function(_2) {
      return se.Objects.Model[_2.ID];
    });
    if (p.length === 0)
      return;
    const h = n.children.reduce(function(_2, y) {
      return o[y.ID] !== void 0 && (_2 = o[y.ID]), _2;
    }, null);
    n.children.forEach(function(_2) {
      r.morphTargets[_2.ID] !== void 0 && c.push(r.morphTargets[_2.ID]);
    });
    const d = p[0], g = {};
    "RotationOrder" in d && (g.eulerOrder = Ja(d.RotationOrder.value)), "InheritType" in d && (g.inheritType = parseInt(d.InheritType.value)), "GeometricTranslation" in d && (g.translation = d.GeometricTranslation.value), "GeometricRotation" in d && (g.rotation = d.GeometricRotation.value), "GeometricScaling" in d && (g.scale = d.GeometricScaling.value);
    const w = Wa(g);
    return this.genGeometry(s, h, c, w);
  }
  // Generate a BufferGeometry from a node in FBXTree.Objects.Geometry
  genGeometry(n, s, r, o) {
    const c = new BufferGeometry();
    n.attrName && (c.name = n.attrName);
    const p = this.parseGeoNode(n, s), h = this.genBuffers(p), d = new Float32BufferAttribute(h.vertex, 3);
    if (d.applyMatrix4(o), c.setAttribute("position", d), h.colors.length > 0 && c.setAttribute("color", new Float32BufferAttribute(h.colors, 3)), s && (c.setAttribute("skinIndex", new Uint16BufferAttribute(h.weightsIndices, 4)), c.setAttribute("skinWeight", new Float32BufferAttribute(h.vertexWeights, 4)), c.FBX_Deformer = s), h.normal.length > 0) {
      const g = new Matrix3().getNormalMatrix(o), w = new Float32BufferAttribute(h.normal, 3);
      w.applyNormalMatrix(g), c.setAttribute("normal", w);
    }
    if (h.uvs.forEach(function(g, w) {
      let _2 = "uv" + (w + 1).toString();
      w === 0 && (_2 = "uv"), c.setAttribute(_2, new Float32BufferAttribute(h.uvs[w], 2));
    }), p.material && p.material.mappingType !== "AllSame") {
      let g = h.materialIndex[0], w = 0;
      if (h.materialIndex.forEach(function(_2, y) {
        _2 !== g && (c.addGroup(w, y - w, g), g = _2, w = y);
      }), c.groups.length > 0) {
        const _2 = c.groups[c.groups.length - 1], y = _2.start + _2.count;
        y !== h.materialIndex.length && c.addGroup(y, h.materialIndex.length - y, g);
      }
      c.groups.length === 0 && c.addGroup(0, h.materialIndex.length, h.materialIndex[0]);
    }
    return this.addMorphTargets(c, n, r, o), c;
  }
  parseGeoNode(n, s) {
    const r = {};
    if (r.vertexPositions = n.Vertices !== void 0 ? n.Vertices.a : [], r.vertexIndices = n.PolygonVertexIndex !== void 0 ? n.PolygonVertexIndex.a : [], n.LayerElementColor && (r.color = this.parseVertexColors(n.LayerElementColor[0])), n.LayerElementMaterial && (r.material = this.parseMaterialIndices(n.LayerElementMaterial[0])), n.LayerElementNormal && (r.normal = this.parseNormals(n.LayerElementNormal[0])), n.LayerElementUV) {
      r.uv = [];
      let o = 0;
      for (; n.LayerElementUV[o]; )
        n.LayerElementUV[o].UV && r.uv.push(this.parseUVs(n.LayerElementUV[o])), o++;
    }
    return r.weightTable = {}, s !== null && (r.skeleton = s, s.rawBones.forEach(function(o, c) {
      o.indices.forEach(function(p, h) {
        r.weightTable[p] === void 0 && (r.weightTable[p] = []), r.weightTable[p].push({
          id: c,
          weight: o.weights[h]
        });
      });
    })), r;
  }
  genBuffers(n) {
    const s = {
      vertex: [],
      normal: [],
      colors: [],
      uvs: [],
      materialIndex: [],
      vertexWeights: [],
      weightsIndices: []
    };
    let r = 0, o = 0, c = false, p = [], h = [], d = [], g = [], w = [], _2 = [];
    const y = this;
    return n.vertexIndices.forEach(function(P, R) {
      let k, A = false;
      P < 0 && (P = P ^ -1, A = true);
      let z = [], F = [];
      if (p.push(P * 3, P * 3 + 1, P * 3 + 2), n.color) {
        const I = Ns(R, r, P, n.color);
        d.push(I[0], I[1], I[2]);
      }
      if (n.skeleton) {
        if (n.weightTable[P] !== void 0 && n.weightTable[P].forEach(function(I) {
          F.push(I.weight), z.push(I.id);
        }), F.length > 4) {
          c || (console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."), c = true);
          const I = [0, 0, 0, 0], D2 = [0, 0, 0, 0];
          F.forEach(function(Y, G) {
            let N = Y, O = z[G];
            D2.forEach(function(H, K, q) {
              if (N > H) {
                q[K] = N, N = H;
                const pe = I[K];
                I[K] = O, O = pe;
              }
            });
          }), z = I, F = D2;
        }
        for (; F.length < 4; )
          F.push(0), z.push(0);
        for (let I = 0; I < 4; ++I)
          w.push(F[I]), _2.push(z[I]);
      }
      if (n.normal) {
        const I = Ns(R, r, P, n.normal);
        h.push(I[0], I[1], I[2]);
      }
      n.material && n.material.mappingType !== "AllSame" && (k = Ns(R, r, P, n.material)[0]), n.uv && n.uv.forEach(function(I, D2) {
        const Y = Ns(R, r, P, I);
        g[D2] === void 0 && (g[D2] = []), g[D2].push(Y[0]), g[D2].push(Y[1]);
      }), o++, A && (y.genFace(s, n, p, k, h, d, g, w, _2, o), r++, o = 0, p = [], h = [], d = [], g = [], w = [], _2 = []);
    }), s;
  }
  // Generate data for a single face in a geometry. If the face is a quad then split it into 2 tris
  genFace(n, s, r, o, c, p, h, d, g, w) {
    for (let _2 = 2; _2 < w; _2++)
      n.vertex.push(s.vertexPositions[r[0]]), n.vertex.push(s.vertexPositions[r[1]]), n.vertex.push(s.vertexPositions[r[2]]), n.vertex.push(s.vertexPositions[r[(_2 - 1) * 3]]), n.vertex.push(s.vertexPositions[r[(_2 - 1) * 3 + 1]]), n.vertex.push(s.vertexPositions[r[(_2 - 1) * 3 + 2]]), n.vertex.push(s.vertexPositions[r[_2 * 3]]), n.vertex.push(s.vertexPositions[r[_2 * 3 + 1]]), n.vertex.push(s.vertexPositions[r[_2 * 3 + 2]]), s.skeleton && (n.vertexWeights.push(d[0]), n.vertexWeights.push(d[1]), n.vertexWeights.push(d[2]), n.vertexWeights.push(d[3]), n.vertexWeights.push(d[(_2 - 1) * 4]), n.vertexWeights.push(d[(_2 - 1) * 4 + 1]), n.vertexWeights.push(d[(_2 - 1) * 4 + 2]), n.vertexWeights.push(d[(_2 - 1) * 4 + 3]), n.vertexWeights.push(d[_2 * 4]), n.vertexWeights.push(d[_2 * 4 + 1]), n.vertexWeights.push(d[_2 * 4 + 2]), n.vertexWeights.push(d[_2 * 4 + 3]), n.weightsIndices.push(g[0]), n.weightsIndices.push(g[1]), n.weightsIndices.push(g[2]), n.weightsIndices.push(g[3]), n.weightsIndices.push(g[(_2 - 1) * 4]), n.weightsIndices.push(g[(_2 - 1) * 4 + 1]), n.weightsIndices.push(g[(_2 - 1) * 4 + 2]), n.weightsIndices.push(g[(_2 - 1) * 4 + 3]), n.weightsIndices.push(g[_2 * 4]), n.weightsIndices.push(g[_2 * 4 + 1]), n.weightsIndices.push(g[_2 * 4 + 2]), n.weightsIndices.push(g[_2 * 4 + 3])), s.color && (n.colors.push(p[0]), n.colors.push(p[1]), n.colors.push(p[2]), n.colors.push(p[(_2 - 1) * 3]), n.colors.push(p[(_2 - 1) * 3 + 1]), n.colors.push(p[(_2 - 1) * 3 + 2]), n.colors.push(p[_2 * 3]), n.colors.push(p[_2 * 3 + 1]), n.colors.push(p[_2 * 3 + 2])), s.material && s.material.mappingType !== "AllSame" && (n.materialIndex.push(o), n.materialIndex.push(o), n.materialIndex.push(o)), s.normal && (n.normal.push(c[0]), n.normal.push(c[1]), n.normal.push(c[2]), n.normal.push(c[(_2 - 1) * 3]), n.normal.push(c[(_2 - 1) * 3 + 1]), n.normal.push(c[(_2 - 1) * 3 + 2]), n.normal.push(c[_2 * 3]), n.normal.push(c[_2 * 3 + 1]), n.normal.push(c[_2 * 3 + 2])), s.uv && s.uv.forEach(function(y, P) {
        n.uvs[P] === void 0 && (n.uvs[P] = []), n.uvs[P].push(h[P][0]), n.uvs[P].push(h[P][1]), n.uvs[P].push(h[P][(_2 - 1) * 2]), n.uvs[P].push(h[P][(_2 - 1) * 2 + 1]), n.uvs[P].push(h[P][_2 * 2]), n.uvs[P].push(h[P][_2 * 2 + 1]);
      });
  }
  addMorphTargets(n, s, r, o) {
    if (r.length === 0)
      return;
    n.morphTargetsRelative = true, n.morphAttributes.position = [];
    const c = this;
    r.forEach(function(p) {
      p.rawTargets.forEach(function(h) {
        const d = se.Objects.Geometry[h.geoID];
        d !== void 0 && c.genMorphGeometry(n, s, d, o, h.name);
      });
    });
  }
  // a morph geometry node is similar to a standard  node, and the node is also contained
  // in FBXTree.Objects.Geometry, however it can only have attributes for position, normal
  // and a special attribute Index defining which vertices of the original geometry are affected
  // Normal and position attributes only have data for the vertices that are affected by the morph
  genMorphGeometry(n, s, r, o, c) {
    const p = s.PolygonVertexIndex !== void 0 ? s.PolygonVertexIndex.a : [], h = r.Vertices !== void 0 ? r.Vertices.a : [], d = r.Indexes !== void 0 ? r.Indexes.a : [], g = n.attributes.position.count * 3, w = new Float32Array(g);
    for (let R = 0; R < d.length; R++) {
      const k = d[R] * 3;
      w[k] = h[R * 3], w[k + 1] = h[R * 3 + 1], w[k + 2] = h[R * 3 + 2];
    }
    const _2 = {
      vertexIndices: p,
      vertexPositions: w
    }, y = this.genBuffers(_2), P = new Float32BufferAttribute(y.vertex, 3);
    P.name = c || r.attrName, P.applyMatrix4(o), n.morphAttributes.position.push(P);
  }
  // Parse normal from FBXTree.Objects.Geometry.LayerElementNormal if it exists
  parseNormals(n) {
    const s = n.MappingInformationType, r = n.ReferenceInformationType, o = n.Normals.a;
    let c = [];
    return r === "IndexToDirect" && ("NormalIndex" in n ? c = n.NormalIndex.a : "NormalsIndex" in n && (c = n.NormalsIndex.a)), {
      dataSize: 3,
      buffer: o,
      indices: c,
      mappingType: s,
      referenceType: r
    };
  }
  // Parse UVs from FBXTree.Objects.Geometry.LayerElementUV if it exists
  parseUVs(n) {
    const s = n.MappingInformationType, r = n.ReferenceInformationType, o = n.UV.a;
    let c = [];
    return r === "IndexToDirect" && (c = n.UVIndex.a), {
      dataSize: 2,
      buffer: o,
      indices: c,
      mappingType: s,
      referenceType: r
    };
  }
  // Parse Vertex Colors from FBXTree.Objects.Geometry.LayerElementColor if it exists
  parseVertexColors(n) {
    const s = n.MappingInformationType, r = n.ReferenceInformationType, o = n.Colors.a;
    let c = [];
    return r === "IndexToDirect" && (c = n.ColorIndex.a), {
      dataSize: 4,
      buffer: o,
      indices: c,
      mappingType: s,
      referenceType: r
    };
  }
  // Parse mapping and material data in FBXTree.Objects.Geometry.LayerElementMaterial if it exists
  parseMaterialIndices(n) {
    const s = n.MappingInformationType, r = n.ReferenceInformationType;
    if (s === "NoMappingInformation")
      return {
        dataSize: 1,
        buffer: [0],
        indices: [0],
        mappingType: "AllSame",
        referenceType: r
      };
    const o = n.Materials.a, c = [];
    for (let p = 0; p < o.length; ++p)
      c.push(p);
    return {
      dataSize: 1,
      buffer: o,
      indices: c,
      mappingType: s,
      referenceType: r
    };
  }
  // Generate a NurbGeometry from a node in FBXTree.Objects.Geometry
  parseNurbsGeometry(n) {
    if (wa === void 0)
      return console.error("THREE.FBXLoader: The loader relies on NURBSCurve for any nurbs present in the model. Nurbs will show up as empty geometry."), new BufferGeometry();
    const s = parseInt(n.Order);
    if (isNaN(s))
      return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s", n.Order, n.id), new BufferGeometry();
    const r = s - 1, o = n.KnotVector.a, c = [], p = n.Points.a;
    for (let _2 = 0, y = p.length; _2 < y; _2 += 4)
      c.push(new Vector4().fromArray(p, _2));
    let h, d;
    if (n.Form === "Closed")
      c.push(c[0]);
    else if (n.Form === "Periodic") {
      h = r, d = o.length - 1 - h;
      for (let _2 = 0; _2 < r; ++_2)
        c.push(c[_2]);
    }
    const w = new wa(r, o, c, h, d).getPoints(c.length * 12);
    return new BufferGeometry().setFromPoints(w);
  }
};
var sh = class {
  // take raw animation clips and turn them into three.js animation clips
  parse() {
    const n = [], s = this.parseClips();
    if (s !== void 0)
      for (const r in s) {
        const o = s[r], c = this.addClip(o);
        n.push(c);
      }
    return n;
  }
  parseClips() {
    if (se.Objects.AnimationCurve === void 0)
      return;
    const n = this.parseAnimationCurveNodes();
    this.parseAnimationCurves(n);
    const s = this.parseAnimationLayers(n);
    return this.parseAnimStacks(s);
  }
  // parse nodes in FBXTree.Objects.AnimationCurveNode
  // each AnimationCurveNode holds data for an animation transform for a model (e.g. left arm rotation )
  // and is referenced by an AnimationLayer
  parseAnimationCurveNodes() {
    const n = se.Objects.AnimationCurveNode, s = /* @__PURE__ */ new Map();
    for (const r in n) {
      const o = n[r];
      if (o.attrName.match(/S|R|T|DeformPercent/) !== null) {
        const c = {
          id: o.id,
          attr: o.attrName,
          curves: {}
        };
        s.set(c.id, c);
      }
    }
    return s;
  }
  // parse nodes in FBXTree.Objects.AnimationCurve and connect them up to
  // previously parsed AnimationCurveNodes. Each AnimationCurve holds data for a single animated
  // axis ( e.g. times and values of x rotation)
  parseAnimationCurves(n) {
    const s = se.Objects.AnimationCurve;
    for (const r in s) {
      const o = {
        id: s[r].id,
        times: s[r].KeyTime.a.map(ch),
        values: s[r].KeyValueFloat.a
      }, c = Ve.get(o.id);
      if (c !== void 0) {
        const p = c.parents[0].ID, h = c.parents[0].relationship;
        h.match(/X/) ? n.get(p).curves.x = o : h.match(/Y/) ? n.get(p).curves.y = o : h.match(/Z/) ? n.get(p).curves.z = o : h.match(/d|DeformPercent/) && n.has(p) && (n.get(p).curves.morph = o);
      }
    }
  }
  // parse nodes in FBXTree.Objects.AnimationLayer. Each layers holds references
  // to various AnimationCurveNodes and is referenced by an AnimationStack node
  // note: theoretically a stack can have multiple layers, however in practice there always seems to be one per stack
  parseAnimationLayers(n) {
    const s = se.Objects.AnimationLayer, r = /* @__PURE__ */ new Map();
    for (const o in s) {
      const c = [], p = Ve.get(parseInt(o));
      p !== void 0 && (p.children.forEach(function(d, g) {
        if (n.has(d.ID)) {
          const w = n.get(d.ID);
          if (w.curves.x !== void 0 || w.curves.y !== void 0 || w.curves.z !== void 0) {
            if (c[g] === void 0) {
              const _2 = Ve.get(d.ID).parents.filter(function(y) {
                return y.relationship !== void 0;
              })[0].ID;
              if (_2 !== void 0) {
                const y = se.Objects.Model[_2.toString()];
                if (y === void 0) {
                  console.warn("THREE.FBXLoader: Encountered a unused curve.", d);
                  return;
                }
                const P = {
                  modelName: y.attrName ? PropertyBinding.sanitizeNodeName(y.attrName) : "",
                  ID: y.id,
                  initialPosition: [0, 0, 0],
                  initialRotation: [0, 0, 0],
                  initialScale: [1, 1, 1]
                };
                tt.traverse(function(R) {
                  R.ID === y.id && (P.transform = R.matrix, R.userData.transformData && (P.eulerOrder = R.userData.transformData.eulerOrder));
                }), P.transform || (P.transform = new Matrix4()), "PreRotation" in y && (P.preRotation = y.PreRotation.value), "PostRotation" in y && (P.postRotation = y.PostRotation.value), c[g] = P;
              }
            }
            c[g] && (c[g][w.attr] = w);
          } else if (w.curves.morph !== void 0) {
            if (c[g] === void 0) {
              const _2 = Ve.get(d.ID).parents.filter(function(z) {
                return z.relationship !== void 0;
              })[0].ID, y = Ve.get(_2).parents[0].ID, P = Ve.get(y).parents[0].ID, R = Ve.get(P).parents[0].ID, k = se.Objects.Model[R], A = {
                modelName: k.attrName ? PropertyBinding.sanitizeNodeName(k.attrName) : "",
                morphName: se.Objects.Deformer[_2].attrName
              };
              c[g] = A;
            }
            c[g][w.attr] = w;
          }
        }
      }), r.set(parseInt(o), c));
    }
    return r;
  }
  // parse nodes in FBXTree.Objects.AnimationStack. These are the top level node in the animation
  // hierarchy. Each Stack node will be used to create a AnimationClip
  parseAnimStacks(n) {
    const s = se.Objects.AnimationStack, r = {};
    for (const o in s) {
      const c = Ve.get(parseInt(o)).children;
      c.length > 1 && console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");
      const p = n.get(c[0].ID);
      r[o] = {
        name: s[o].attrName,
        layer: p
      };
    }
    return r;
  }
  addClip(n) {
    let s = [];
    const r = this;
    return n.layer.forEach(function(o) {
      s = s.concat(r.generateTracks(o));
    }), new AnimationClip(n.name, -1, s);
  }
  generateTracks(n) {
    const s = [];
    let r = new Vector3(), o = new Quaternion(), c = new Vector3();
    if (n.transform && n.transform.decompose(r, o, c), r = r.toArray(), o = new Euler().setFromQuaternion(o, n.eulerOrder).toArray(), c = c.toArray(), n.T !== void 0 && Object.keys(n.T.curves).length > 0) {
      const p = this.generateVectorTrack(n.modelName, n.T.curves, r, "position");
      p !== void 0 && s.push(p);
    }
    if (n.R !== void 0 && Object.keys(n.R.curves).length > 0) {
      const p = this.generateRotationTrack(n.modelName, n.R.curves, o, n.preRotation, n.postRotation, n.eulerOrder);
      p !== void 0 && s.push(p);
    }
    if (n.S !== void 0 && Object.keys(n.S.curves).length > 0) {
      const p = this.generateVectorTrack(n.modelName, n.S.curves, c, "scale");
      p !== void 0 && s.push(p);
    }
    if (n.DeformPercent !== void 0) {
      const p = this.generateMorphTrack(n);
      p !== void 0 && s.push(p);
    }
    return s;
  }
  generateVectorTrack(n, s, r, o) {
    const c = this.getTimesForAllAxes(s), p = this.getKeyframeTrackValues(c, s, r);
    return new VectorKeyframeTrack(n + "." + o, c, p);
  }
  generateRotationTrack(n, s, r, o, c, p) {
    s.x !== void 0 && (this.interpolateRotations(s.x), s.x.values = s.x.values.map(MathUtils.degToRad)), s.y !== void 0 && (this.interpolateRotations(s.y), s.y.values = s.y.values.map(MathUtils.degToRad)), s.z !== void 0 && (this.interpolateRotations(s.z), s.z.values = s.z.values.map(MathUtils.degToRad));
    const h = this.getTimesForAllAxes(s), d = this.getKeyframeTrackValues(h, s, r);
    o !== void 0 && (o = o.map(MathUtils.degToRad), o.push(p), o = new Euler().fromArray(o), o = new Quaternion().setFromEuler(o)), c !== void 0 && (c = c.map(MathUtils.degToRad), c.push(p), c = new Euler().fromArray(c), c = new Quaternion().setFromEuler(c).invert());
    const g = new Quaternion(), w = new Euler(), _2 = [];
    for (let y = 0; y < d.length; y += 3)
      w.set(d[y], d[y + 1], d[y + 2], p), g.setFromEuler(w), o !== void 0 && g.premultiply(o), c !== void 0 && g.multiply(c), g.toArray(_2, y / 3 * 4);
    return new QuaternionKeyframeTrack(n + ".quaternion", h, _2);
  }
  generateMorphTrack(n) {
    const s = n.DeformPercent.curves.morph, r = s.values.map(function(c) {
      return c / 100;
    }), o = tt.getObjectByName(n.modelName).morphTargetDictionary[n.morphName];
    return new NumberKeyframeTrack(n.modelName + ".morphTargetInfluences[" + o + "]", s.times, r);
  }
  // For all animated objects, times are defined separately for each axis
  // Here we'll combine the times into one sorted array without duplicates
  getTimesForAllAxes(n) {
    let s = [];
    if (n.x !== void 0 && (s = s.concat(n.x.times)), n.y !== void 0 && (s = s.concat(n.y.times)), n.z !== void 0 && (s = s.concat(n.z.times)), s = s.sort(function(r, o) {
      return r - o;
    }), s.length > 1) {
      let r = 1, o = s[0];
      for (let c = 1; c < s.length; c++) {
        const p = s[c];
        p !== o && (s[r] = p, o = p, r++);
      }
      s = s.slice(0, r);
    }
    return s;
  }
  getKeyframeTrackValues(n, s, r) {
    const o = r, c = [];
    let p = -1, h = -1, d = -1;
    return n.forEach(function(g) {
      if (s.x && (p = s.x.times.indexOf(g)), s.y && (h = s.y.times.indexOf(g)), s.z && (d = s.z.times.indexOf(g)), p !== -1) {
        const w = s.x.values[p];
        c.push(w), o[0] = w;
      } else
        c.push(o[0]);
      if (h !== -1) {
        const w = s.y.values[h];
        c.push(w), o[1] = w;
      } else
        c.push(o[1]);
      if (d !== -1) {
        const w = s.z.values[d];
        c.push(w), o[2] = w;
      } else
        c.push(o[2]);
    }), c;
  }
  // Rotations are defined as Euler angles which can have values  of any size
  // These will be converted to quaternions which don't support values greater than
  // PI, so we'll interpolate large rotations
  interpolateRotations(n) {
    for (let s = 1; s < n.values.length; s++) {
      const r = n.values[s - 1], o = n.values[s] - r, c = Math.abs(o);
      if (c >= 180) {
        const p = c / 180, h = o / p;
        let d = r + h;
        const g = n.times[s - 1], _2 = (n.times[s] - g) / p;
        let y = g + _2;
        const P = [], R = [];
        for (; y < n.times[s]; )
          P.push(y), y += _2, R.push(d), d += h;
        n.times = Ea(n.times, s, P), n.values = Ea(n.values, s, R);
      }
    }
  }
};
var rh = class {
  getPrevNode() {
    return this.nodeStack[this.currentIndent - 2];
  }
  getCurrentNode() {
    return this.nodeStack[this.currentIndent - 1];
  }
  getCurrentProp() {
    return this.currentProp;
  }
  pushStack(n) {
    this.nodeStack.push(n), this.currentIndent += 1;
  }
  popStack() {
    this.nodeStack.pop(), this.currentIndent -= 1;
  }
  setCurrentProp(n, s) {
    this.currentProp = n, this.currentPropName = s;
  }
  parse(n) {
    this.currentIndent = 0, this.allNodes = new Za(), this.nodeStack = [], this.currentProp = [], this.currentPropName = "";
    const s = this, r = n.split(/[\r\n]+/);
    return r.forEach(function(o, c) {
      const p = o.match(/^[\s\t]*;/), h = o.match(/^[\s\t]*$/);
      if (p || h)
        return;
      const d = o.match("^\\t{" + s.currentIndent + "}(\\w+):(.*){", ""), g = o.match("^\\t{" + s.currentIndent + "}(\\w+):[\\s\\t\\r\\n](.*)"), w = o.match("^\\t{" + (s.currentIndent - 1) + "}}");
      d ? s.parseNodeBegin(o, d) : g ? s.parseNodeProperty(o, g, r[++c]) : w ? s.popStack() : o.match(/^[^\s\t}]/) && s.parseNodePropertyContinued(o);
    }), this.allNodes;
  }
  parseNodeBegin(n, s) {
    const r = s[1].trim().replace(/^"/, "").replace(/"$/, ""), o = s[2].split(",").map(function(d) {
      return d.trim().replace(/^"/, "").replace(/"$/, "");
    }), c = {
      name: r
    }, p = this.parseNodeAttr(o), h = this.getCurrentNode();
    this.currentIndent === 0 ? this.allNodes.add(r, c) : r in h ? (r === "PoseNode" ? h.PoseNode.push(c) : h[r].id !== void 0 && (h[r] = {}, h[r][h[r].id] = h[r]), p.id !== "" && (h[r][p.id] = c)) : typeof p.id == "number" ? (h[r] = {}, h[r][p.id] = c) : r !== "Properties70" && (r === "PoseNode" ? h[r] = [c] : h[r] = c), typeof p.id == "number" && (c.id = p.id), p.name !== "" && (c.attrName = p.name), p.type !== "" && (c.attrType = p.type), this.pushStack(c);
  }
  parseNodeAttr(n) {
    let s = n[0];
    n[0] !== "" && (s = parseInt(n[0]), isNaN(s) && (s = n[0]));
    let r = "", o = "";
    return n.length > 1 && (r = n[1].replace(/^(\w+)::/, ""), o = n[2]), {
      id: s,
      name: r,
      type: o
    };
  }
  parseNodeProperty(n, s, r) {
    let o = s[1].replace(/^"/, "").replace(/"$/, "").trim(), c = s[2].replace(/^"/, "").replace(/"$/, "").trim();
    o === "Content" && c === "," && (c = r.replace(/"/g, "").replace(/,$/, "").trim());
    const p = this.getCurrentNode();
    if (p.name === "Properties70") {
      this.parseNodeSpecialProperty(n, o, c);
      return;
    }
    if (o === "C") {
      const d = c.split(",").slice(1), g = parseInt(d[0]), w = parseInt(d[1]);
      let _2 = c.split(",").slice(3);
      _2 = _2.map(function(y) {
        return y.trim().replace(/^"/, "");
      }), o = "connections", c = [g, w], ph(c, _2), p[o] === void 0 && (p[o] = []);
    }
    o === "Node" && (p.id = c), o in p && Array.isArray(p[o]) ? p[o].push(c) : o !== "a" ? p[o] = c : p.a = c, this.setCurrentProp(p, o), o === "a" && c.slice(-1) !== "," && (p.a = ao(c));
  }
  parseNodePropertyContinued(n) {
    const s = this.getCurrentNode();
    s.a += n, n.slice(-1) !== "," && (s.a = ao(s.a));
  }
  // parse "Property70"
  parseNodeSpecialProperty(n, s, r) {
    const o = r.split('",').map(function(w) {
      return w.trim().replace(/^\"/, "").replace(/\s/, "_");
    }), c = o[0], p = o[1], h = o[2], d = o[3];
    let g = o[4];
    switch (p) {
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
        g = ao(g);
        break;
    }
    this.getPrevNode()[c] = {
      type: p,
      type2: h,
      flag: d,
      value: g
    }, this.setCurrentProp(this.getPrevNode(), c);
  }
};
var oh = class {
  parse(n) {
    const s = new ya(n);
    s.skip(23);
    const r = s.getUint32();
    if (r < 6400)
      throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + r);
    const o = new Za();
    for (; !this.endOfContent(s); ) {
      const c = this.parseNode(s, r);
      c !== null && o.add(c.name, c);
    }
    return o;
  }
  // Check if reader has reached the end of content.
  endOfContent(n) {
    return n.size() % 16 === 0 ? (n.getOffset() + 160 + 16 & -16) >= n.size() : n.getOffset() + 160 + 16 >= n.size();
  }
  // recursively parse nodes until the end of the file is reached
  parseNode(n, s) {
    const r = {}, o = s >= 7500 ? n.getUint64() : n.getUint32(), c = s >= 7500 ? n.getUint64() : n.getUint32();
    s >= 7500 ? n.getUint64() : n.getUint32();
    const p = n.getUint8(), h = n.getString(p);
    if (o === 0)
      return null;
    const d = [];
    for (let y = 0; y < c; y++)
      d.push(this.parseProperty(n));
    const g = d.length > 0 ? d[0] : "", w = d.length > 1 ? d[1] : "", _2 = d.length > 2 ? d[2] : "";
    for (r.singleProperty = c === 1 && n.getOffset() === o; o > n.getOffset(); ) {
      const y = this.parseNode(n, s);
      y !== null && this.parseSubNode(h, r, y);
    }
    return r.propertyList = d, typeof g == "number" && (r.id = g), w !== "" && (r.attrName = w), _2 !== "" && (r.attrType = _2), h !== "" && (r.name = h), r;
  }
  parseSubNode(n, s, r) {
    if (r.singleProperty === true) {
      const o = r.propertyList[0];
      Array.isArray(o) ? (s[r.name] = r, r.a = o) : s[r.name] = o;
    } else if (n === "Connections" && r.name === "C") {
      const o = [];
      r.propertyList.forEach(function(c, p) {
        p !== 0 && o.push(c);
      }), s.connections === void 0 && (s.connections = []), s.connections.push(o);
    } else if (r.name === "Properties70")
      Object.keys(r).forEach(function(c) {
        s[c] = r[c];
      });
    else if (n === "Properties70" && r.name === "P") {
      let o = r.propertyList[0], c = r.propertyList[1];
      const p = r.propertyList[2], h = r.propertyList[3];
      let d;
      o.indexOf("Lcl ") === 0 && (o = o.replace("Lcl ", "Lcl_")), c.indexOf("Lcl ") === 0 && (c = c.replace("Lcl ", "Lcl_")), c === "Color" || c === "ColorRGB" || c === "Vector" || c === "Vector3D" || c.indexOf("Lcl_") === 0 ? d = [r.propertyList[4], r.propertyList[5], r.propertyList[6]] : d = r.propertyList[4], s[o] = {
        type: c,
        type2: p,
        flag: h,
        value: d
      };
    } else
      s[r.name] === void 0 ? typeof r.id == "number" ? (s[r.name] = {}, s[r.name][r.id] = r) : s[r.name] = r : r.name === "PoseNode" ? (Array.isArray(s[r.name]) || (s[r.name] = [s[r.name]]), s[r.name].push(r)) : s[r.name][r.id] === void 0 && (s[r.name][r.id] = r);
  }
  parseProperty(n) {
    const s = n.getString(1);
    let r;
    switch (s) {
      case "C":
        return n.getBoolean();
      case "D":
        return n.getFloat64();
      case "F":
        return n.getFloat32();
      case "I":
        return n.getInt32();
      case "L":
        return n.getInt64();
      case "R":
        return r = n.getUint32(), n.getArrayBuffer(r);
      case "S":
        return r = n.getUint32(), n.getString(r);
      case "Y":
        return n.getInt16();
      case "b":
      case "c":
      case "d":
      case "f":
      case "i":
      case "l":
        const o = n.getUint32(), c = n.getUint32(), p = n.getUint32();
        if (c === 0)
          switch (s) {
            case "b":
            case "c":
              return n.getBooleanArray(o);
            case "d":
              return n.getFloat64Array(o);
            case "f":
              return n.getFloat32Array(o);
            case "i":
              return n.getInt32Array(o);
            case "l":
              return n.getInt64Array(o);
          }
        const h = op(new Uint8Array(n.getArrayBuffer(p))), d = new ya(h.buffer);
        switch (s) {
          case "b":
          case "c":
            return d.getBooleanArray(o);
          case "d":
            return d.getFloat64Array(o);
          case "f":
            return d.getFloat32Array(o);
          case "i":
            return d.getInt32Array(o);
          case "l":
            return d.getInt64Array(o);
        }
      default:
        throw new Error("THREE.FBXLoader: Unknown property type " + s);
    }
  }
};
var ya = class {
  constructor(n, s) {
    this.dv = new DataView(n), this.offset = 0, this.littleEndian = s !== void 0 ? s : true;
  }
  getOffset() {
    return this.offset;
  }
  size() {
    return this.dv.buffer.byteLength;
  }
  skip(n) {
    this.offset += n;
  }
  // seems like true/false representation depends on exporter.
  // true: 1 or 'Y'(=0x59), false: 0 or 'T'(=0x54)
  // then sees LSB.
  getBoolean() {
    return (this.getUint8() & 1) === 1;
  }
  getBooleanArray(n) {
    const s = [];
    for (let r = 0; r < n; r++)
      s.push(this.getBoolean());
    return s;
  }
  getUint8() {
    const n = this.dv.getUint8(this.offset);
    return this.offset += 1, n;
  }
  getInt16() {
    const n = this.dv.getInt16(this.offset, this.littleEndian);
    return this.offset += 2, n;
  }
  getInt32() {
    const n = this.dv.getInt32(this.offset, this.littleEndian);
    return this.offset += 4, n;
  }
  getInt32Array(n) {
    const s = [];
    for (let r = 0; r < n; r++)
      s.push(this.getInt32());
    return s;
  }
  getUint32() {
    const n = this.dv.getUint32(this.offset, this.littleEndian);
    return this.offset += 4, n;
  }
  // JavaScript doesn't support 64-bit integer so calculate this here
  // 1 << 32 will return 1 so using multiply operation instead here.
  // There's a possibility that this method returns wrong value if the value
  // is out of the range between Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER.
  // TODO: safely handle 64-bit integer
  getInt64() {
    let n, s;
    return this.littleEndian ? (n = this.getUint32(), s = this.getUint32()) : (s = this.getUint32(), n = this.getUint32()), s & 2147483648 ? (s = ~s & 4294967295, n = ~n & 4294967295, n === 4294967295 && (s = s + 1 & 4294967295), n = n + 1 & 4294967295, -(s * 4294967296 + n)) : s * 4294967296 + n;
  }
  getInt64Array(n) {
    const s = [];
    for (let r = 0; r < n; r++)
      s.push(this.getInt64());
    return s;
  }
  // Note: see getInt64() comment
  getUint64() {
    let n, s;
    return this.littleEndian ? (n = this.getUint32(), s = this.getUint32()) : (s = this.getUint32(), n = this.getUint32()), s * 4294967296 + n;
  }
  getFloat32() {
    const n = this.dv.getFloat32(this.offset, this.littleEndian);
    return this.offset += 4, n;
  }
  getFloat32Array(n) {
    const s = [];
    for (let r = 0; r < n; r++)
      s.push(this.getFloat32());
    return s;
  }
  getFloat64() {
    const n = this.dv.getFloat64(this.offset, this.littleEndian);
    return this.offset += 8, n;
  }
  getFloat64Array(n) {
    const s = [];
    for (let r = 0; r < n; r++)
      s.push(this.getFloat64());
    return s;
  }
  getArrayBuffer(n) {
    const s = this.dv.buffer.slice(this.offset, this.offset + n);
    return this.offset += n, s;
  }
  getString(n) {
    let s = [];
    for (let o = 0; o < n; o++)
      s[o] = this.getUint8();
    const r = s.indexOf(0);
    return r >= 0 && (s = s.slice(0, r)), LoaderUtils.decodeText(new Uint8Array(s));
  }
};
var Za = class {
  add(n, s) {
    this[n] = s;
  }
};
function ah(v) {
  const n = "Kaydara FBX Binary  \0";
  return v.byteLength >= n.length && n === el(v, 0, n.length);
}
function lh(v) {
  const n = ["K", "a", "y", "d", "a", "r", "a", "\\", "F", "B", "X", "\\", "B", "i", "n", "a", "r", "y", "\\", "\\"];
  let s = 0;
  function r(o) {
    const c = v[o - 1];
    return v = v.slice(s + o), s++, c;
  }
  for (let o = 0; o < n.length; ++o)
    if (r(1) === n[o])
      return false;
  return true;
}
function xa(v) {
  const n = /FBXVersion: (\d+)/, s = v.match(n);
  if (s)
    return parseInt(s[1]);
  throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.");
}
function ch(v) {
  return v / 46186158e3;
}
var uh = [];
function Ns(v, n, s, r) {
  let o;
  switch (r.mappingType) {
    case "ByPolygonVertex":
      o = v;
      break;
    case "ByPolygon":
      o = n;
      break;
    case "ByVertice":
      o = s;
      break;
    case "AllSame":
      o = r.indices[0];
      break;
    default:
      console.warn("THREE.FBXLoader: unknown attribute mapping type " + r.mappingType);
  }
  r.referenceType === "IndexToDirect" && (o = r.indices[o]);
  const c = o * r.dataSize, p = c + r.dataSize;
  return hh(uh, r.buffer, c, p);
}
var oo = new Euler();
var di = new Vector3();
function Wa(v) {
  const n = new Matrix4(), s = new Matrix4(), r = new Matrix4(), o = new Matrix4(), c = new Matrix4(), p = new Matrix4(), h = new Matrix4(), d = new Matrix4(), g = new Matrix4(), w = new Matrix4(), _2 = new Matrix4(), y = new Matrix4(), P = v.inheritType ? v.inheritType : 0;
  if (v.translation && n.setPosition(di.fromArray(v.translation)), v.preRotation) {
    const K = v.preRotation.map(MathUtils.degToRad);
    K.push(v.eulerOrder), s.makeRotationFromEuler(oo.fromArray(K));
  }
  if (v.rotation) {
    const K = v.rotation.map(MathUtils.degToRad);
    K.push(v.eulerOrder), r.makeRotationFromEuler(oo.fromArray(K));
  }
  if (v.postRotation) {
    const K = v.postRotation.map(MathUtils.degToRad);
    K.push(v.eulerOrder), o.makeRotationFromEuler(oo.fromArray(K)), o.invert();
  }
  v.scale && c.scale(di.fromArray(v.scale)), v.scalingOffset && h.setPosition(di.fromArray(v.scalingOffset)), v.scalingPivot && p.setPosition(di.fromArray(v.scalingPivot)), v.rotationOffset && d.setPosition(di.fromArray(v.rotationOffset)), v.rotationPivot && g.setPosition(di.fromArray(v.rotationPivot)), v.parentMatrixWorld && (_2.copy(v.parentMatrix), w.copy(v.parentMatrixWorld));
  const R = s.clone().multiply(r).multiply(o), k = new Matrix4();
  k.extractRotation(w);
  const A = new Matrix4();
  A.copyPosition(w);
  const z = A.clone().invert().multiply(w), F = k.clone().invert().multiply(z), I = c, D2 = new Matrix4();
  if (P === 0)
    D2.copy(k).multiply(R).multiply(F).multiply(I);
  else if (P === 1)
    D2.copy(k).multiply(F).multiply(R).multiply(I);
  else {
    const q = new Matrix4().scale(new Vector3().setFromMatrixScale(_2)).clone().invert(), pe = F.clone().multiply(q);
    D2.copy(k).multiply(R).multiply(pe).multiply(I);
  }
  const Y = g.clone().invert(), G = p.clone().invert();
  let N = n.clone().multiply(d).multiply(g).multiply(s).multiply(r).multiply(o).multiply(Y).multiply(h).multiply(p).multiply(c).multiply(G);
  const O = new Matrix4().copyPosition(N), H = w.clone().multiply(O);
  return y.copyPosition(H), N = y.clone().multiply(D2), N.premultiply(w.invert()), N;
}
function Ja(v) {
  v = v || 0;
  const n = [
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
  return v === 6 ? (console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."), n[0]) : n[v];
}
function ao(v) {
  return v.split(",").map(function(s) {
    return parseFloat(s);
  });
}
function el(v, n, s) {
  return n === void 0 && (n = 0), s === void 0 && (s = v.byteLength), LoaderUtils.decodeText(new Uint8Array(v, n, s));
}
function ph(v, n) {
  for (let s = 0, r = v.length, o = n.length; s < o; s++, r++)
    v[r] = n[s];
}
function hh(v, n, s, r) {
  for (let o = s, c = 0; o < r; o++, c++)
    v[c] = n[o];
  return v;
}
function Ea(v, n, s) {
  return v.slice(0, n).concat(s).concat(v.slice(n));
}
var dh = class extends Loader {
  constructor(n) {
    super(n);
  }
  load(n, s, r, o) {
    const c = new FileLoader(this.manager);
    c.setPath(this.path), c.setRequestHeader(this.requestHeader), c.setWithCredentials(this.withCredentials), c.load(n, (p) => {
      if (typeof p != "string")
        throw new Error("unsupported data type");
      const h = JSON.parse(p), d = this.parse(h);
      s && s(d);
    }, r, o);
  }
  parse(n) {
    return new Po(n);
  }
};
var Po = class {
  constructor(n) {
    C(this, "data", void 0), this.data = n;
  }
  generateShapes(n, s = 100, r) {
    const o = [], c = {
      letterSpacing: 0,
      lineHeight: 1,
      ...r
    }, p = mh(n, s, this.data, c);
    for (let h = 0, d = p.length; h < d; h++)
      Array.prototype.push.apply(o, p[h].toShapes(false));
    return o;
  }
};
C(Po, "isFont", void 0);
C(Po, "type", void 0);
function mh(v, n, s, r) {
  const o = Array.from(v), c = n / s.resolution, p = (s.boundingBox.yMax - s.boundingBox.yMin + s.underlineThickness) * c, h = [];
  let d = 0, g = 0;
  for (let w = 0; w < o.length; w++) {
    const _2 = o[w];
    if (_2 === `
`)
      d = 0, g -= p * r.lineHeight;
    else {
      const y = fh(_2, c, d, g, s);
      y && (d += y.offsetX + r.letterSpacing, h.push(y.path));
    }
  }
  return h;
}
function fh(v, n, s, r, o) {
  const c = o.glyphs[v] || o.glyphs["?"];
  if (!c) {
    console.error('THREE.Font: character "' + v + '" does not exists in font family ' + o.familyName + ".");
    return;
  }
  const p = new ShapePath();
  let h, d, g, w, _2, y, P, R;
  if (c.o) {
    const k = c._cachedOutline || (c._cachedOutline = c.o.split(" "));
    for (let A = 0, z = k.length; A < z; )
      switch (k[A++]) {
        case "m":
          h = parseInt(k[A++]) * n + s, d = parseInt(k[A++]) * n + r, p.moveTo(h, d);
          break;
        case "l":
          h = parseInt(k[A++]) * n + s, d = parseInt(k[A++]) * n + r, p.lineTo(h, d);
          break;
        case "q":
          g = parseInt(k[A++]) * n + s, w = parseInt(k[A++]) * n + r, _2 = parseInt(k[A++]) * n + s, y = parseInt(k[A++]) * n + r, p.quadraticCurveTo(_2, y, g, w);
          break;
        case "b":
          g = parseInt(k[A++]) * n + s, w = parseInt(k[A++]) * n + r, _2 = parseInt(k[A++]) * n + s, y = parseInt(k[A++]) * n + r, P = parseInt(k[A++]) * n + s, R = parseInt(k[A++]) * n + r, p.bezierCurveTo(_2, y, P, R, g, w);
          break;
      }
  }
  return {
    offsetX: c.ha * n,
    path: p
  };
}
var tl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function vh(v) {
  return v && v.__esModule && Object.prototype.hasOwnProperty.call(v, "default") ? v.default : v;
}
var bh = class extends DataTextureLoader {
  constructor(n) {
    super(n), this.type = HalfFloatType;
  }
  // adapted from http://www.graphics.cornell.edu/~bjw/rgbe.html
  parse(n) {
    const h = function(I, D2) {
      switch (I) {
        case 1:
          console.error("THREE.RGBELoader Read Error: " + (D2 || ""));
          break;
        case 2:
          console.error("THREE.RGBELoader Write Error: " + (D2 || ""));
          break;
        case 3:
          console.error("THREE.RGBELoader Bad File Format: " + (D2 || ""));
          break;
        default:
        case 4:
          console.error("THREE.RGBELoader: Error: " + (D2 || ""));
      }
      return -1;
    }, _2 = `
`, y = function(I, D2, Y) {
      D2 = D2 || 1024;
      let N = I.pos, O = -1, H = 0, K = "", q = String.fromCharCode.apply(null, new Uint16Array(I.subarray(N, N + 128)));
      for (; 0 > (O = q.indexOf(_2)) && H < D2 && N < I.byteLength; )
        K += q, H += q.length, N += 128, q += String.fromCharCode.apply(null, new Uint16Array(I.subarray(N, N + 128)));
      return -1 < O ? (Y !== false && (I.pos += H + O + 1), K + q.slice(0, O)) : false;
    }, P = function(I) {
      const D2 = /^#\?(\S+)/, Y = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, G = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, N = /^\s*FORMAT=(\S+)\s*$/, O = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, H = {
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
      if (I.pos >= I.byteLength || !(K = y(I)))
        return h(1, "no header found");
      if (!(q = K.match(D2)))
        return h(3, "bad initial token");
      for (H.valid |= 1, H.programtype = q[1], H.string += K + `
`; K = y(I), K !== false; ) {
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
    }, R = function(I, D2, Y) {
      const G = D2;
      if (
        // run length encoding is not allowed so read flat
        G < 8 || G > 32767 || // this file is not run length encoded
        I[0] !== 2 || I[1] !== 2 || I[2] & 128
      )
        return new Uint8Array(I);
      if (G !== (I[2] << 8 | I[3]))
        return h(3, "wrong scanline width");
      const N = new Uint8Array(4 * D2 * Y);
      if (!N.length)
        return h(4, "unable to allocate buffer space");
      let O = 0, H = 0;
      const K = 4 * G, q = new Uint8Array(4), pe = new Uint8Array(K);
      let _e = Y;
      for (; _e > 0 && H < I.byteLength; ) {
        if (H + 4 > I.byteLength)
          return h(1);
        if (q[0] = I[H++], q[1] = I[H++], q[2] = I[H++], q[3] = I[H++], q[0] != 2 || q[1] != 2 || (q[2] << 8 | q[3]) != G)
          return h(3, "bad rgbe scanline format");
        let ce = 0, me;
        for (; ce < K && H < I.byteLength; ) {
          me = I[H++];
          const ee = me > 128;
          if (ee && (me -= 128), me === 0 || ce + me > K)
            return h(3, "bad scanline data");
          if (ee) {
            const X = I[H++];
            for (let Te = 0; Te < me; Te++)
              pe[ce++] = X;
          } else
            pe.set(I.subarray(H, H + me), ce), ce += me, H += me;
        }
        const he = G;
        for (let ee = 0; ee < he; ee++) {
          let X = 0;
          N[O] = pe[ee + X], X += G, N[O + 1] = pe[ee + X], X += G, N[O + 2] = pe[ee + X], X += G, N[O + 3] = pe[ee + X], O += 4;
        }
        _e--;
      }
      return N;
    }, k = function(I, D2, Y, G) {
      const N = I[D2 + 3], O = Math.pow(2, N - 128) / 255;
      Y[G + 0] = I[D2 + 0] * O, Y[G + 1] = I[D2 + 1] * O, Y[G + 2] = I[D2 + 2] * O, Y[G + 3] = 1;
    }, A = function(I, D2, Y, G) {
      const N = I[D2 + 3], O = Math.pow(2, N - 128) / 255;
      Y[G + 0] = DataUtils.toHalfFloat(Math.min(I[D2 + 0] * O, 65504)), Y[G + 1] = DataUtils.toHalfFloat(Math.min(I[D2 + 1] * O, 65504)), Y[G + 2] = DataUtils.toHalfFloat(Math.min(I[D2 + 2] * O, 65504)), Y[G + 3] = DataUtils.toHalfFloat(1);
    }, z = new Uint8Array(n);
    z.pos = 0;
    const F = P(z);
    if (F !== -1) {
      const I = F.width, D2 = F.height, Y = R(z.subarray(z.pos), I, D2);
      if (Y !== -1) {
        let G, N, O;
        switch (this.type) {
          case FloatType:
            O = Y.length / 4;
            const H = new Float32Array(O * 4);
            for (let q = 0; q < O; q++)
              k(Y, q * 4, H, q * 4);
            G = H, N = FloatType;
            break;
          case HalfFloatType:
            O = Y.length / 4;
            const K = new Uint16Array(O * 4);
            for (let q = 0; q < O; q++)
              A(Y, q * 4, K, q * 4);
            G = K, N = HalfFloatType;
            break;
          default:
            console.error("THREE.RGBELoader: unsupported type: ", this.type);
            break;
        }
        return {
          width: I,
          height: D2,
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
  setDataType(n) {
    return this.type = n, this;
  }
  load(n, s, r, o) {
    function c(p, h) {
      switch (p.type) {
        case FloatType:
        case HalfFloatType:
          p.encoding = LinearEncoding, p.minFilter = LinearFilter, p.magFilter = LinearFilter, p.generateMipmaps = false, p.flipY = true;
          break;
      }
      s && s(p, h);
    }
    return super.load(n, c, r, o);
  }
};
var lo = /* @__PURE__ */ new WeakMap();
var gh = class extends Loader {
  constructor(n) {
    super(n), this.decoderPath = "", this.decoderConfig = {}, this.decoderBinary = null, this.decoderPending = null, this.workerLimit = 4, this.workerPool = [], this.workerNextTaskID = 1, this.workerSourceURL = "", this.defaultAttributeIDs = {
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
  setDecoderPath(n) {
    return this.decoderPath = n, this;
  }
  setDecoderConfig(n) {
    return this.decoderConfig = n, this;
  }
  setWorkerLimit(n) {
    return this.workerLimit = n, this;
  }
  load(n, s, r, o) {
    const c = new FileLoader(this.manager);
    c.setPath(this.path), c.setResponseType("arraybuffer"), c.setRequestHeader(this.requestHeader), c.setWithCredentials(this.withCredentials), c.load(n, (p) => {
      const h = {
        attributeIDs: this.defaultAttributeIDs,
        attributeTypes: this.defaultAttributeTypes,
        useUniqueIDs: false
      };
      this.decodeGeometry(p, h).then(s).catch(o);
    }, r, o);
  }
  /** @deprecated Kept for backward-compatibility with previous DRACOLoader versions. */
  decodeDracoFile(n, s, r, o) {
    const c = {
      attributeIDs: r || this.defaultAttributeIDs,
      attributeTypes: o || this.defaultAttributeTypes,
      useUniqueIDs: !!r
    };
    this.decodeGeometry(n, c).then(s);
  }
  decodeGeometry(n, s) {
    for (const d in s.attributeTypes) {
      const g = s.attributeTypes[d];
      g.BYTES_PER_ELEMENT !== void 0 && (s.attributeTypes[d] = g.name);
    }
    const r = JSON.stringify(s);
    if (lo.has(n)) {
      const d = lo.get(n);
      if (d.key === r)
        return d.promise;
      if (n.byteLength === 0)
        throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.");
    }
    let o;
    const c = this.workerNextTaskID++, p = n.byteLength, h = this._getWorker(c, p).then((d) => (o = d, new Promise((g, w) => {
      o._callbacks[c] = {
        resolve: g,
        reject: w
      }, o.postMessage({
        type: "decode",
        id: c,
        taskConfig: s,
        buffer: n
      }, [n]);
    }))).then((d) => this._createGeometry(d.geometry));
    return h.catch(() => true).then(() => {
      o && c && this._releaseTask(o, c);
    }), lo.set(n, {
      key: r,
      promise: h
    }), h;
  }
  _createGeometry(n) {
    const s = new BufferGeometry();
    n.index && s.setIndex(new BufferAttribute(n.index.array, 1));
    for (let r = 0; r < n.attributes.length; r++) {
      const o = n.attributes[r], c = o.name, p = o.array, h = o.itemSize;
      s.setAttribute(c, new BufferAttribute(p, h));
    }
    return s;
  }
  _loadLibrary(n, s) {
    const r = new FileLoader(this.manager);
    return r.setPath(this.decoderPath), r.setResponseType(s), r.setWithCredentials(this.withCredentials), new Promise((o, c) => {
      r.load(n, o, void 0, c);
    });
  }
  preload() {
    return this._initDecoder(), this;
  }
  _initDecoder() {
    if (this.decoderPending)
      return this.decoderPending;
    const n = typeof WebAssembly != "object" || this.decoderConfig.type === "js", s = [];
    return n ? s.push(this._loadLibrary("draco_decoder.js", "text")) : (s.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), s.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(s).then((r) => {
      const o = r[0];
      n || (this.decoderConfig.wasmBinary = r[1]);
      const c = _h.toString(), p = ["/* draco decoder */", o, "", "/* worker */", c.substring(c.indexOf("{") + 1, c.lastIndexOf("}"))].join(`
`);
      this.workerSourceURL = URL.createObjectURL(new Blob([p]));
    }), this.decoderPending;
  }
  _getWorker(n, s) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const o = new Worker(this.workerSourceURL);
        o._callbacks = {}, o._taskCosts = {}, o._taskLoad = 0, o.postMessage({
          type: "init",
          decoderConfig: this.decoderConfig
        }), o.onmessage = function(c) {
          const p = c.data;
          switch (p.type) {
            case "decode":
              o._callbacks[p.id].resolve(p);
              break;
            case "error":
              o._callbacks[p.id].reject(p);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + p.type + '"');
          }
        }, this.workerPool.push(o);
      } else
        this.workerPool.sort(function(o, c) {
          return o._taskLoad > c._taskLoad ? -1 : 1;
        });
      const r = this.workerPool[this.workerPool.length - 1];
      return r._taskCosts[n] = s, r._taskLoad += s, r;
    });
  }
  _releaseTask(n, s) {
    n._taskLoad -= n._taskCosts[s], delete n._callbacks[s], delete n._taskCosts[s];
  }
  debug() {
    console.log("Task load: ", this.workerPool.map((n) => n._taskLoad));
  }
  dispose() {
    for (let n = 0; n < this.workerPool.length; ++n)
      this.workerPool[n].terminate();
    return this.workerPool.length = 0, this;
  }
};
function _h() {
  let v, n;
  onmessage = function(p) {
    const h = p.data;
    switch (h.type) {
      case "init":
        v = h.decoderConfig, n = new Promise(function(w) {
          v.onModuleLoaded = function(_2) {
            w({
              draco: _2
            });
          }, DracoDecoderModule(v);
        });
        break;
      case "decode":
        const d = h.buffer, g = h.taskConfig;
        n.then((w) => {
          const _2 = w.draco, y = new _2.Decoder(), P = new _2.DecoderBuffer();
          P.Init(new Int8Array(d), d.byteLength);
          try {
            const R = s(_2, y, P, g), k = R.attributes.map((A) => A.array.buffer);
            R.index && k.push(R.index.array.buffer), self.postMessage({
              type: "decode",
              id: h.id,
              geometry: R
            }, k);
          } catch (R) {
            console.error(R), self.postMessage({
              type: "error",
              id: h.id,
              error: R.message
            });
          } finally {
            _2.destroy(P), _2.destroy(y);
          }
        });
        break;
    }
  };
  function s(p, h, d, g) {
    const w = g.attributeIDs, _2 = g.attributeTypes;
    let y, P;
    const R = h.GetEncodedGeometryType(d);
    if (R === p.TRIANGULAR_MESH)
      y = new p.Mesh(), P = h.DecodeBufferToMesh(d, y);
    else if (R === p.POINT_CLOUD)
      y = new p.PointCloud(), P = h.DecodeBufferToPointCloud(d, y);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!P.ok() || y.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + P.error_msg());
    const k = {
      index: null,
      attributes: []
    };
    for (const A in w) {
      const z = self[_2[A]];
      let F, I;
      if (g.useUniqueIDs)
        I = w[A], F = h.GetAttributeByUniqueId(y, I);
      else {
        if (I = h.GetAttributeId(y, p[w[A]]), I === -1)
          continue;
        F = h.GetAttribute(y, I);
      }
      k.attributes.push(o(p, h, y, A, z, F));
    }
    return R === p.TRIANGULAR_MESH && (k.index = r(p, h, y)), p.destroy(y), k;
  }
  function r(p, h, d) {
    const w = d.num_faces() * 3, _2 = w * 4, y = p._malloc(_2);
    h.GetTrianglesUInt32Array(d, _2, y);
    const P = new Uint32Array(p.HEAPF32.buffer, y, w).slice();
    return p._free(y), {
      array: P,
      itemSize: 1
    };
  }
  function o(p, h, d, g, w, _2) {
    const y = _2.num_components(), R = d.num_points() * y, k = R * w.BYTES_PER_ELEMENT, A = c(p, w), z = p._malloc(k);
    h.GetAttributeDataArrayForAllPoints(d, _2, A, k, z);
    const F = new w(p.HEAPF32.buffer, z, R).slice();
    return p._free(z), {
      name: g,
      array: F,
      itemSize: y
    };
  }
  function c(p, h) {
    switch (h) {
      case Float32Array:
        return p.DT_FLOAT32;
      case Int8Array:
        return p.DT_INT8;
      case Int16Array:
        return p.DT_INT16;
      case Int32Array:
        return p.DT_INT32;
      case Uint8Array:
        return p.DT_UINT8;
      case Uint16Array:
        return p.DT_UINT16;
      case Uint32Array:
        return p.DT_UINT32;
    }
  }
}
function St() {
  const { state: v, setState: n } = inject("useTres", _()), s = inject("extend") || (() => {
  });
  return {
    state: v,
    setState: n,
    extend: s
  };
}
var wh = ["args"];
var Md = defineComponent({
  __name: "OrbitControls",
  props: {
    makeDefault: { type: Boolean, default: false },
    camera: null,
    domElement: null,
    target: null,
    enableDamping: { type: Boolean }
  },
  setup(v) {
    const n = v, { state: s, setState: r, extend: o } = St(), c = ref(null);
    return o({ OrbitControls: vp }), watch(c, (p) => {
      p && n.makeDefault ? r("controls", p) : r("controls", null);
    }), (p, h) => {
      var d;
      return unref(s).camera && unref(s).renderer ? (openBlock(), createElementBlock("TresOrbitControls", {
        key: 0,
        ref_key: "controls",
        ref: c,
        args: [unref(s).camera || v.camera, ((d = unref(s).renderer) == null ? void 0 : d.domElement) || v.domElement]
      }, null, 8, wh)) : createCommentVNode("", true);
    };
  }
});
function nl(v) {
  return getCurrentScope() ? (onScopeDispose(v), true) : false;
}
function il(v) {
  return typeof v == "function" ? v() : unref(v);
}
var yh = typeof window < "u";
var sl = () => {
};
function xh(...v) {
  if (v.length !== 1)
    return toRef(...v);
  const n = v[0];
  return typeof n == "function" ? readonly(customRef(() => ({ get: n, set: sl }))) : ref(n);
}
function Eh(v, n = true) {
  getCurrentInstance() ? onMounted(v) : n ? v() : nextTick(v);
}
function Ch(v) {
  var n;
  const s = il(v);
  return (n = s == null ? void 0 : s.$el) != null ? n : s;
}
var Qs = yh ? window : void 0;
function On(...v) {
  let n, s, r, o;
  if (typeof v[0] == "string" || Array.isArray(v[0]) ? ([s, r, o] = v, n = Qs) : [n, s, r, o] = v, !n)
    return sl;
  Array.isArray(s) || (s = [s]), Array.isArray(r) || (r = [r]);
  const c = [], p = () => {
    c.forEach((w) => w()), c.length = 0;
  }, h = (w, _2, y, P) => (w.addEventListener(_2, y, P), () => w.removeEventListener(_2, y, P)), d = watch(
    () => [Ch(n), il(o)],
    ([w, _2]) => {
      p(), w && c.push(
        ...s.flatMap((y) => r.map((P) => h(w, y, P, _2)))
      );
    },
    { immediate: true, flush: "post" }
  ), g = () => {
    d(), p();
  };
  return nl(g), g;
}
function Ph() {
  const v = ref(false);
  return getCurrentInstance() && onMounted(() => {
    v.value = true;
  }), v;
}
function Th(v) {
  const n = Ph();
  return computed(() => (n.value, !!v()));
}
function kh(v, n = {}) {
  const { window: s = Qs } = n, r = Th(() => s && "matchMedia" in s && typeof s.matchMedia == "function");
  let o;
  const c = ref(false), p = () => {
    o && ("removeEventListener" in o ? o.removeEventListener("change", h) : o.removeListener(h));
  }, h = () => {
    r.value && (p(), o = s.matchMedia(xh(v).value), c.value = !!(o != null && o.matches), o && ("addEventListener" in o ? o.addEventListener("change", h) : o.addListener(h)));
  };
  return watchEffect(h), nl(() => p()), c;
}
function Mh(v = {}) {
  const {
    type: n = "page",
    touch: s = true,
    resetOnTouchEnds: r = false,
    initialValue: o = { x: 0, y: 0 },
    window: c = Qs,
    eventFilter: p
  } = v, h = ref(o.x), d = ref(o.y), g = ref(null), w = (k) => {
    n === "page" ? (h.value = k.pageX, d.value = k.pageY) : n === "client" ? (h.value = k.clientX, d.value = k.clientY) : n === "screen" ? (h.value = k.screenX, d.value = k.screenY) : n === "movement" && (h.value = k.movementX, d.value = k.movementY), g.value = "mouse";
  }, _2 = () => {
    h.value = o.x, d.value = o.y;
  }, y = (k) => {
    if (k.touches.length > 0) {
      const A = k.touches[0];
      n === "page" ? (h.value = A.pageX, d.value = A.pageY) : n === "client" ? (h.value = A.clientX, d.value = A.clientY) : n === "screen" && (h.value = A.screenX, d.value = A.screenY), g.value = "touch";
    }
  }, P = (k) => p === void 0 ? w(k) : p(() => w(k), {}), R = (k) => p === void 0 ? y(k) : p(() => y(k), {});
  return c && (On(c, "mousemove", P, { passive: true }), On(c, "dragover", P, { passive: true }), s && n !== "movement" && (On(c, "touchstart", R, { passive: true }), On(c, "touchmove", R, { passive: true }), r && On(c, "touchend", _2, { passive: true }))), {
    x: h,
    y: d,
    sourceType: g
  };
}
function Sh(v = {}) {
  const {
    window: n = Qs,
    initialWidth: s = 1 / 0,
    initialHeight: r = 1 / 0,
    listenOrientation: o = true,
    includeScrollbar: c = true
  } = v, p = ref(s), h = ref(r), d = () => {
    n && (c ? (p.value = n.innerWidth, h.value = n.innerHeight) : (p.value = n.document.documentElement.clientWidth, h.value = n.document.documentElement.clientHeight));
  };
  if (d(), Eh(d), On("resize", d, { passive: true }), o) {
    const g = kh("(orientation: portrait)");
    watch(g, () => d());
  }
  return { width: p, height: h };
}
var Lh = ["args"];
var Sd = defineComponent({
  __name: "PointerLockControls",
  props: {
    makeDefault: { type: Boolean, default: false },
    camera: null,
    domElement: null,
    selector: null
  },
  setup(v, { expose: n }) {
    const s = v, { state: r, setState: o, extend: c } = St(), p = ref(null);
    let h;
    return c({ PointerLockControls: fp }), watch(p, (d) => {
      var w;
      d && s.makeDefault ? o("controls", d) : o("controls", null);
      const g = document.getElementById(s.selector || "");
      h = g || ((w = r.renderer) == null ? void 0 : w.domElement), On(h, "click", () => {
        var _2;
        (_2 = p.value) == null || _2.lock();
      });
    }), n({
      value: p
    }), (d, g) => {
      var w;
      return unref(r).camera && unref(r).renderer ? (openBlock(), createElementBlock("TresPointerLockControls", {
        key: 0,
        ref_key: "controls",
        ref: p,
        args: [unref(r).camera || v.camera, ((w = unref(r).renderer) == null ? void 0 : w.domElement) || v.domElement]
      }, null, 8, Lh)) : createCommentVNode("", true);
    };
  }
});
function Ah(v, n) {
  const s = {};
  for (const r of n)
    Object.prototype.hasOwnProperty.call(v, r) && (s[r] = v[r]);
  return s;
}
function Rh(v, n) {
  const s = `set${n[0].toUpperCase()}${n.slice(1)}`;
  return v[s] !== void 0;
}
var Ld = defineComponent({
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
  setup(v, { emit: n }) {
    const s = v;
    let r = shallowRef();
    const { state: o } = St(), c = computed(
      () => Ah(s, [
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
    ), p = () => n("change", r.value), h = () => n("mouseDown", r.value), d = () => n("mouseUp", r.value), g = () => n("objectChange", r.value), w = (y) => {
      o.controls && (o.controls.enabled = !y.value), n("dragging", y.value);
    };
    function _2(y) {
      y.addEventListener("dragging-changed", w), y.addEventListener("change", p), y.addEventListener("mouseDown", h), y.addEventListener("mouseUp", d), y.addEventListener("objectChange", g);
    }
    return watchEffect(() => {
      o.camera && o.renderer && o.scene && s.object && (r.value = new cp(o.camera, o.renderer.domElement), r.value.attach(s.object), o.scene.add(r.value), _2(r.value));
    }), watch(
      [c, r],
      // TODO: properly type this
      ([y, P]) => {
        if (y && P)
          for (const R in y)
            if (!Rh(P, R))
              P[R] = y[R];
            else {
              const k = `set${R[0].toUpperCase()}${R.slice(1)}`;
              typeof P[k] == "function" && y[R] !== void 0 && P[k](y[R]);
            }
      },
      {
        immediate: true
      }
    ), onUnmounted(() => {
      r.value && (r.value.removeEventListener("dragging-changed", w), r.value.removeEventListener("change", p), r.value.removeEventListener("mouseDown", h), r.value.removeEventListener("mouseUp", d), r.value.removeEventListener("objectChange", g));
    }), (y, P) => renderSlot(y.$slots, "default");
  }
});
function Vh(v = false, n = 5, s) {
  const { x: r, y: o } = Mh(), { logWarning: c } = D(), { width: p, height: h } = Sh(), d = computed(() => (r.value / p.value - 0.5) * n), g = computed(() => -(o.value / h.value - 0.5) * n);
  if (s) {
    const { x: w, y: _2 } = s.position;
    watchEffect(() => {
      v || s && (s.position.x = w + d.value, s.position.y = _2 + g.value);
    });
  } else
    c("Scene must contain a Camera component to use this composable");
}
var Ad = defineComponent({
  name: "PamCameraMouse",
  props: ["disabled", "factor"],
  setup(v) {
    const { state: n } = St();
    return watchEffect(() => {
      if (n != null && n.camera) {
        const s = n == null ? void 0 : n.camera;
        Vh(v.disabled, v.factor, s);
      }
    }), () => {
    };
  }
});
var Ks = {};
var Ih = {
  get exports() {
    return Ks;
  },
  set exports(v) {
    Ks = v;
  }
};
(function(v, n) {
  (function(s, r) {
    r(n);
  })(tl, function(s) {
    class r {
      /**
       * @hidden
       */
      constructor(e) {
        const [t, l] = e.split("-"), b = t.split(".");
        this.major = parseInt(b[0], 10), this.minor = parseInt(b[1], 10), this.patch = parseInt(b[2], 10), this.prerelease = l ?? null;
      }
      toString() {
        const e = [this.major, this.minor, this.patch].join(".");
        return this.prerelease !== null ? [e, this.prerelease].join("-") : e;
      }
    }
    class o {
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
    class p extends c {
      constructor(e, t, l, b) {
        super(e), this.value = t, this.presetKey = l, this.last = b ?? true;
      }
    }
    class h extends c {
      constructor(e, t, l) {
        super(e), this.value = t, this.presetKey = l;
      }
    }
    class d extends c {
      constructor(e, t) {
        super(e), this.expanded = t;
      }
    }
    class g extends c {
      constructor(e, t) {
        super(e), this.index = t;
      }
    }
    function w(i) {
      return i;
    }
    function _2(i) {
      return i == null;
    }
    function y(i, e) {
      if (i.length !== e.length)
        return false;
      for (let t = 0; t < i.length; t++)
        if (i[t] !== e[t])
          return false;
      return true;
    }
    function P(i, e) {
      let t = i;
      do {
        const l = Object.getOwnPropertyDescriptor(t, e);
        if (l && (l.set !== void 0 || l.writable === true))
          return true;
        t = Object.getPrototypeOf(t);
      } while (t !== null);
      return false;
    }
    const R = {
      alreadydisposed: () => "View has been already disposed",
      invalidparams: (i) => `Invalid parameters for '${i.name}'`,
      nomatchingcontroller: (i) => `No matching controller for '${i.key}'`,
      nomatchingview: (i) => `No matching view for '${JSON.stringify(i.params)}'`,
      notbindable: () => "Value is not bindable",
      propertynotfound: (i) => `Property '${i.name}' not found`,
      shouldneverhappen: () => "This error should never happen"
    };
    class k {
      static alreadyDisposed() {
        return new k({ type: "alreadydisposed" });
      }
      static notBindable() {
        return new k({
          type: "notbindable"
        });
      }
      static propertyNotFound(e) {
        return new k({
          type: "propertynotfound",
          context: {
            name: e
          }
        });
      }
      static shouldNeverHappen() {
        return new k({ type: "shouldneverhappen" });
      }
      constructor(e) {
        var t;
        this.message = (t = R[e.type](e.context)) !== null && t !== void 0 ? t : "Unexpected error", this.name = this.constructor.name, this.stack = new Error(this.message).stack, this.type = e.type;
      }
    }
    class A {
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
        if (!A.isBindable(l))
          throw k.notBindable();
        if (!(e in l))
          throw k.propertyNotFound(e);
        l[e] = t;
      }
    }
    class z extends o {
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
        return l && (this.observers_[e] = l.filter((b) => b.handler !== t)), this;
      }
      emit(e, t) {
        const l = this.observers_[e];
        l && l.forEach((b) => {
          b.handler(t);
        });
      }
    }
    const I = "tp";
    function D2(i) {
      return (t, l) => [
        I,
        "-",
        i,
        "v",
        t ? `_${t}` : "",
        l ? `-${l}` : ""
      ].join("");
    }
    function Y(i, e) {
      return (t) => e(i(t));
    }
    function G(i) {
      return i.rawValue;
    }
    function N(i, e) {
      i.emitter.on("change", Y(G, e)), e(i.rawValue);
    }
    function O(i, e, t) {
      N(i.value(e), t);
    }
    function H(i, e, t) {
      t ? i.classList.add(e) : i.classList.remove(e);
    }
    function K(i, e) {
      return (t) => {
        H(i, e, t);
      };
    }
    function q(i, e) {
      N(i, (t) => {
        e.textContent = t ?? "";
      });
    }
    const pe = D2("btn");
    class _e {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(pe()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("button");
        l.classList.add(pe("b")), t.viewProps.bindDisabled(l), this.element.appendChild(l), this.buttonElement = l;
        const b = e.createElement("div");
        b.classList.add(pe("t")), q(t.props.value("title"), b), this.buttonElement.appendChild(b);
      }
    }
    class ce {
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
    class me {
      constructor(e, t) {
        var l;
        this.constraint_ = t == null ? void 0 : t.constraint, this.equals_ = (l = t == null ? void 0 : t.equals) !== null && l !== void 0 ? l : (b, E) => b === E, this.emitter = new F(), this.rawValue_ = e;
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
        }, b = this.constraint_ ? this.constraint_.constrain(e) : e, E = this.rawValue_;
        this.equals_(E, b) && !l.forceEmit || (this.emitter.emit("beforechange", {
          sender: this
        }), this.rawValue_ = b, this.emitter.emit("change", {
          options: l,
          previousRawValue: E,
          rawValue: b,
          sender: this
        }));
      }
    }
    class he {
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
        }, b = this.value_;
        b === e && !l.forceEmit || (this.emitter.emit("beforechange", {
          sender: this
        }), this.value_ = e, this.emitter.emit("change", {
          options: l,
          previousRawValue: b,
          rawValue: this.value_,
          sender: this
        }));
      }
    }
    function ee(i, e) {
      const t = e == null ? void 0 : e.constraint, l = e == null ? void 0 : e.equals;
      return !t && !l ? new he(i) : new me(i, e);
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
        return Object.keys(e).reduce((l, b) => Object.assign(l, {
          [b]: ee(e[b])
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
    function Te(i, e) {
      const l = Object.keys(e).reduce((b, E) => {
        if (b === void 0)
          return;
        const M = e[E], B = M(i[E]);
        return B.succeeded ? Object.assign(Object.assign({}, b), { [E]: B.value }) : void 0;
      }, {});
      return l;
    }
    function fe(i, e) {
      return i.reduce((t, l) => {
        if (t === void 0)
          return;
        const b = e(l);
        if (!(!b.succeeded || b.value === void 0))
          return [...t, b.value];
      }, []);
    }
    function ae(i) {
      return i === null ? false : typeof i == "object";
    }
    function ne(i) {
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
        const l = i(t);
        return l !== void 0 ? {
          succeeded: true,
          value: l
        } : {
          succeeded: false,
          value: void 0
        };
      };
    }
    function ge(i) {
      return {
        custom: (e) => ne(e)(i),
        boolean: ne((e) => typeof e == "boolean" ? e : void 0)(i),
        number: ne((e) => typeof e == "number" ? e : void 0)(i),
        string: ne((e) => typeof e == "string" ? e : void 0)(i),
        function: ne((e) => typeof e == "function" ? e : void 0)(i),
        constant: (e) => ne((t) => t === e ? e : void 0)(i),
        raw: ne((e) => e)(i),
        object: (e) => ne((t) => {
          if (ae(t))
            return Te(t, e);
        })(i),
        array: (e) => ne((t) => {
          if (Array.isArray(t))
            return fe(t, e);
        })(i)
      };
    }
    const S = {
      optional: ge(true),
      required: ge(false)
    };
    function le(i, e) {
      const t = S.required.object(e)(i);
      return t.succeeded ? t.value : void 0;
    }
    function Fe(i) {
      console.warn([
        `Missing '${i.key}' of ${i.target} in ${i.place}.`,
        "Please rebuild plugins with the latest core package."
      ].join(" "));
    }
    function Ue(i) {
      return i && i.parentElement && i.parentElement.removeChild(i), null;
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
    const rt = D2("");
    function jn(i, e) {
      return K(i, rt(void 0, e));
    }
    class Qe extends X {
      constructor(e) {
        var t;
        super(e), this.onDisabledChange_ = this.onDisabledChange_.bind(this), this.onParentChange_ = this.onParentChange_.bind(this), this.onParentGlobalDisabledChange_ = this.onParentGlobalDisabledChange_.bind(this), [this.globalDisabled_, this.setGlobalDisabled_] = ye.create(ee(this.getGlobalDisabled_())), this.value("disabled").emitter.on("change", this.onDisabledChange_), this.value("parent").emitter.on("change", this.onParentChange_), (t = this.get("parent")) === null || t === void 0 || t.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_);
      }
      static create(e) {
        var t, l, b;
        const E = e ?? {};
        return new Qe(X.createCore({
          disabled: (t = E.disabled) !== null && t !== void 0 ? t : false,
          disposed: false,
          hidden: (l = E.hidden) !== null && l !== void 0 ? l : false,
          parent: (b = E.parent) !== null && b !== void 0 ? b : null
        }));
      }
      get globalDisabled() {
        return this.globalDisabled_;
      }
      bindClassModifiers(e) {
        N(this.globalDisabled_, jn(e, "disabled")), O(this, "hidden", jn(e, "hidden"));
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
    function Un() {
      return ["veryfirst", "first", "last", "verylast"];
    }
    const cn = D2(""), vt = {
      veryfirst: "vfst",
      first: "fst",
      last: "lst",
      verylast: "vlst"
    };
    class Lt {
      constructor(e) {
        this.parent_ = null, this.blade = e.blade, this.view = e.view, this.viewProps = e.viewProps;
        const t = this.view.element;
        this.blade.value("positions").emitter.on("change", () => {
          Un().forEach((l) => {
            t.classList.remove(cn(void 0, vt[l]));
          }), this.blade.get("positions").forEach((l) => {
            t.classList.add(cn(void 0, vt[l]));
          });
        }), this.viewProps.handleDispose(() => {
          Ue(t);
        });
      }
      get parent() {
        return this.parent_;
      }
      set parent(e) {
        if (this.parent_ = e, !("parent" in this.viewProps.valMap_)) {
          Fe({
            key: "parent",
            target: Qe.name,
            place: "BladeController.parent"
          });
          return;
        }
        this.viewProps.set("parent", this.parent_ ? this.parent_.viewProps : null);
      }
    }
    const Ke = "http://www.w3.org/2000/svg";
    function ot(i) {
      i.offsetHeight;
    }
    function un(i, e) {
      const t = i.style.transition;
      i.style.transition = "none", e(), i.style.transition = t;
    }
    function bt(i) {
      return i.ontouchstart !== void 0;
    }
    function Gn() {
      return globalThis;
    }
    function fi() {
      return Gn().document;
    }
    function Hn(i) {
      const e = i.ownerDocument.defaultView;
      return e && "document" in e ? i.getContext("2d", {
        willReadFrequently: true
      }) : null;
    }
    const Kn = {
      check: '<path d="M2 8l4 4l8 -8"/>',
      dropdown: '<path d="M5 7h6l-3 3 z"/>',
      p2dpad: '<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'
    };
    function Et(i, e) {
      const t = i.createElementNS(Ke, "svg");
      return t.innerHTML = Kn[e], t;
    }
    function At(i, e, t) {
      i.insertBefore(e, i.children[t]);
    }
    function $n(i) {
      i.parentElement && i.parentElement.removeChild(i);
    }
    function pn(i) {
      for (; i.children.length > 0; )
        i.removeChild(i.children[0]);
    }
    function Xn(i) {
      for (; i.childNodes.length > 0; )
        i.removeChild(i.childNodes[0]);
    }
    function Ct(i) {
      return i.relatedTarget ? i.relatedTarget : "explicitOriginalTarget" in i ? i.explicitOriginalTarget : null;
    }
    const gt = D2("lbl");
    function Rt2(i, e) {
      const t = i.createDocumentFragment();
      return e.split(`
`).map((b) => i.createTextNode(b)).forEach((b, E) => {
        E > 0 && t.appendChild(i.createElement("br")), t.appendChild(b);
      }), t;
    }
    class L {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(gt()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(gt("l")), O(t.props, "label", (E) => {
          _2(E) ? this.element.classList.add(gt(void 0, "nol")) : (this.element.classList.remove(gt(void 0, "nol")), Xn(l), l.appendChild(Rt2(e, E)));
        }), this.element.appendChild(l), this.labelElement = l;
        const b = e.createElement("div");
        b.classList.add(gt("v")), this.element.appendChild(b), this.valueElement = b;
      }
    }
    class U extends Lt {
      constructor(e, t) {
        const l = t.valueController.viewProps;
        super(Object.assign(Object.assign({}, t), { view: new L(e, {
          props: t.props,
          viewProps: l
        }), viewProps: l })), this.props = t.props, this.valueController = t.valueController, this.view.valueElement.appendChild(this.valueController.view.element);
      }
    }
    const W = {
      id: "button",
      type: "blade",
      accept(i) {
        const e = S, t = le(i, {
          title: e.required.string,
          view: e.required.constant("button"),
          label: e.optional.string
        });
        return t ? { params: t } : null;
      },
      controller(i) {
        return new U(i.document, {
          blade: i.blade,
          props: X.fromObject({
            label: i.params.label
          }),
          valueController: new ce(i.document, {
            props: X.fromObject({
              title: i.params.title
            }),
            viewProps: i.viewProps
          })
        });
      },
      api(i) {
        return !(i.controller instanceof U) || !(i.controller.valueController instanceof ce) ? null : new z(i.controller);
      }
    };
    class ie extends Lt {
      constructor(e) {
        super(e), this.value = e.value;
      }
    }
    function xe() {
      return new X({
        positions: ee([], {
          equals: y
        })
      });
    }
    class Be extends X {
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
        return new Be(l);
      }
      get styleExpanded() {
        var e;
        return (e = this.get("temporaryExpanded")) !== null && e !== void 0 ? e : this.get("expanded");
      }
      get styleHeight() {
        if (!this.styleExpanded)
          return "0";
        const e = this.get("expandedHeight");
        return this.get("shouldFixHeight") && !_2(e) ? `${e}px` : "auto";
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
    function Ht(i, e) {
      let t = 0;
      return un(e, () => {
        i.set("expandedHeight", null), i.set("temporaryExpanded", true), ot(e), t = e.clientHeight, i.set("temporaryExpanded", null), ot(e);
      }), t;
    }
    function hn(i, e) {
      e.style.height = i.styleHeight;
    }
    function $e(i, e) {
      i.value("expanded").emitter.on("beforechange", () => {
        if (i.set("completed", false), _2(i.get("expandedHeight"))) {
          const t = Ht(i, e);
          t > 0 && i.set("expandedHeight", t);
        }
        i.set("shouldFixHeight", true), ot(e);
      }), i.emitter.on("change", () => {
        hn(i, e);
      }), hn(i, e), e.addEventListener("transitionend", (t) => {
        t.propertyName === "height" && i.cleanUpTransition();
      });
    }
    class Xe extends o {
      constructor(e, t) {
        super(e), this.rackApi_ = t;
      }
    }
    function Zs(i, e) {
      return i.addBlade(Object.assign(Object.assign({}, e), { view: "button" }));
    }
    function Ws(i, e) {
      return i.addBlade(Object.assign(Object.assign({}, e), { view: "folder" }));
    }
    function Js(i, e) {
      const t = e ?? {};
      return i.addBlade(Object.assign(Object.assign({}, t), { view: "separator" }));
    }
    function vi(i, e) {
      return i.addBlade(Object.assign(Object.assign({}, e), { view: "tab" }));
    }
    class Vt {
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
          throw k.shouldNeverHappen();
        const l = t !== void 0 ? t : this.items_.length;
        this.items_.splice(l, 0, e), this.cache_.add(e);
        const b = this.extract_(e);
        b && (b.emitter.on("add", this.onSubListAdd_), b.emitter.on("remove", this.onSubListRemove_), b.allItems().forEach((E) => {
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
    class bi extends o {
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
        return this.emitter_.on(e, (b) => {
          l(b.event);
        }), this;
      }
      refresh() {
        this.controller_.binding.read();
      }
      onBindingChange_(e) {
        const t = e.sender.target.read();
        this.emitter_.emit("change", {
          event: new p(this, t, this.controller_.binding.target.presetKey, e.options.last)
        });
      }
    }
    class Ge extends U {
      constructor(e, t) {
        super(e, t), this.binding = t.binding;
      }
    }
    class gi extends o {
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
        return this.emitter_.on(e, (b) => {
          l(b.event);
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
    class at extends U {
      constructor(e, t) {
        super(e, t), this.binding = t.binding, this.viewProps.bindDisabled(this.binding.ticker), this.viewProps.handleDispose(() => {
          this.binding.dispose();
        });
      }
    }
    function rs(i) {
      return i instanceof Yn ? i.apiSet_ : i instanceof Xe ? i.rackApi_.apiSet_ : null;
    }
    function dn(i, e) {
      const t = i.find((l) => l.controller_ === e);
      if (!t)
        throw k.shouldNeverHappen();
      return t;
    }
    function os(i, e, t) {
      if (!A.isBindable(i))
        throw k.notBindable();
      return new A(i, e, t);
    }
    class Yn extends o {
      constructor(e, t) {
        super(e), this.onRackAdd_ = this.onRackAdd_.bind(this), this.onRackRemove_ = this.onRackRemove_.bind(this), this.onRackInputChange_ = this.onRackInputChange_.bind(this), this.onRackMonitorUpdate_ = this.onRackMonitorUpdate_.bind(this), this.emitter_ = new F(), this.apiSet_ = new Vt(rs), this.pool_ = t;
        const l = this.controller_.rack;
        l.emitter.on("add", this.onRackAdd_), l.emitter.on("remove", this.onRackRemove_), l.emitter.on("inputchange", this.onRackInputChange_), l.emitter.on("monitorupdate", this.onRackMonitorUpdate_), l.children.forEach((b) => {
          this.setUpApi_(b);
        });
      }
      get children() {
        return this.controller_.rack.children.map((e) => dn(this.apiSet_, e));
      }
      addInput(e, t, l) {
        const b = l ?? {}, E = this.controller_.view.element.ownerDocument, M = this.pool_.createInput(E, os(e, t, b.presetKey), b), B = new bi(M);
        return this.add(B, b.index);
      }
      addMonitor(e, t, l) {
        const b = l ?? {}, E = this.controller_.view.element.ownerDocument, M = this.pool_.createMonitor(E, os(e, t), b), B = new gi(M);
        return this.add(B, b.index);
      }
      addFolder(e) {
        return Ws(this, e);
      }
      addButton(e) {
        return Zs(this, e);
      }
      addSeparator(e) {
        return Js(this, e);
      }
      addTab(e) {
        return vi(this, e);
      }
      add(e, t) {
        this.controller_.rack.add(e.controller_, t);
        const l = this.apiSet_.find((b) => b.controller_ === e.controller_);
        return l && this.apiSet_.remove(l), this.apiSet_.add(e), e;
      }
      remove(e) {
        this.controller_.rack.remove(e.controller_);
      }
      addBlade(e) {
        const t = this.controller_.view.element.ownerDocument, l = this.pool_.createBlade(t, e), b = this.pool_.createBladeApi(l);
        return this.add(b, e.index);
      }
      on(e, t) {
        const l = t.bind(this);
        return this.emitter_.on(e, (b) => {
          l(b.event);
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
          const t = dn(this.apiSet_, e.bladeController);
          this.apiSet_.remove(t);
        }
      }
      onRackInputChange_(e) {
        const t = e.bladeController;
        if (t instanceof Ge) {
          const l = dn(this.apiSet_, t), b = t.binding;
          this.emitter_.emit("change", {
            event: new p(l, b.target.read(), b.target.presetKey, e.options.last)
          });
        } else if (t instanceof ie) {
          const l = dn(this.apiSet_, t);
          this.emitter_.emit("change", {
            event: new p(l, t.value.rawValue, void 0, e.options.last)
          });
        }
      }
      onRackMonitorUpdate_(e) {
        if (!(e.bladeController instanceof at))
          throw k.shouldNeverHappen();
        const t = dn(this.apiSet_, e.bladeController), l = e.bladeController.binding;
        this.emitter_.emit("update", {
          event: new h(t, l.target.read(), l.target.presetKey)
        });
      }
    }
    class _i extends Xe {
      constructor(e, t) {
        super(e, new Yn(e.rackController, t)), this.emitter_ = new F(), this.controller_.foldable.value("expanded").emitter.on("change", (l) => {
          this.emitter_.emit("fold", {
            event: new d(this, l.sender.rawValue)
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
        return this.emitter_.on(e, (b) => {
          l(b.event);
        }), this;
      }
    }
    class wi extends Lt {
      constructor(e) {
        super({
          blade: e.blade,
          view: e.view,
          viewProps: e.rackController.viewProps
        }), this.rackController = e.rackController;
      }
    }
    class er {
      constructor(e, t) {
        const l = D2(t.viewName);
        this.element = e.createElement("div"), this.element.classList.add(l()), t.viewProps.bindClassModifiers(this.element);
      }
    }
    function tr(i, e) {
      for (let t = 0; t < i.length; t++) {
        const l = i[t];
        if (l instanceof Ge && l.binding === e)
          return l;
      }
      return null;
    }
    function nr(i, e) {
      for (let t = 0; t < i.length; t++) {
        const l = i[t];
        if (l instanceof at && l.binding === e)
          return l;
      }
      return null;
    }
    function ir(i, e) {
      for (let t = 0; t < i.length; t++) {
        const l = i[t];
        if (l instanceof ie && l.value === e)
          return l;
      }
      return null;
    }
    function yi(i) {
      return i instanceof mn ? i.rack : i instanceof wi ? i.rackController.rack : null;
    }
    function sr(i) {
      const e = yi(i);
      return e ? e.bcSet_ : null;
    }
    class rr {
      constructor(e) {
        var t, l;
        this.onBladePositionsChange_ = this.onBladePositionsChange_.bind(this), this.onSetAdd_ = this.onSetAdd_.bind(this), this.onSetRemove_ = this.onSetRemove_.bind(this), this.onChildDispose_ = this.onChildDispose_.bind(this), this.onChildPositionsChange_ = this.onChildPositionsChange_.bind(this), this.onChildInputChange_ = this.onChildInputChange_.bind(this), this.onChildMonitorUpdate_ = this.onChildMonitorUpdate_.bind(this), this.onChildValueChange_ = this.onChildValueChange_.bind(this), this.onChildViewPropsChange_ = this.onChildViewPropsChange_.bind(this), this.onDescendantLayout_ = this.onDescendantLayout_.bind(this), this.onDescendantInputChange_ = this.onDescendantInputChange_.bind(this), this.onDescendantMonitorUpdate_ = this.onDescendantMonitorUpdate_.bind(this), this.emitter = new F(), this.blade_ = (t = e.blade) !== null && t !== void 0 ? t : null, (l = this.blade_) === null || l === void 0 || l.value("positions").emitter.on("change", this.onBladePositionsChange_), this.viewProps = e.viewProps, this.bcSet_ = new Vt(sr), this.bcSet_.emitter.on("add", this.onSetAdd_), this.bcSet_.emitter.on("remove", this.onSetRemove_);
      }
      get children() {
        return this.bcSet_.items;
      }
      add(e, t) {
        var l;
        (l = e.parent) === null || l === void 0 || l.remove(e), P(e, "parent") ? e.parent = this : (e.parent_ = this, Fe({
          key: "parent",
          target: "BladeController",
          place: "BladeRack.add"
        })), this.bcSet_.add(e, t);
      }
      remove(e) {
        P(e, "parent") ? e.parent = null : (e.parent_ = null, Fe({
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
        if (l.viewProps.emitter.on("change", this.onChildViewPropsChange_), l.blade.value("positions").emitter.on("change", this.onChildPositionsChange_), l.viewProps.handleDispose(this.onChildDispose_), l instanceof Ge)
          l.binding.emitter.on("change", this.onChildInputChange_);
        else if (l instanceof at)
          l.binding.emitter.on("update", this.onChildMonitorUpdate_);
        else if (l instanceof ie)
          l.value.emitter.on("change", this.onChildValueChange_);
        else {
          const b = yi(l);
          if (b) {
            const E = b.emitter;
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
        if (l instanceof Ge)
          l.binding.emitter.off("change", this.onChildInputChange_);
        else if (l instanceof at)
          l.binding.emitter.off("update", this.onChildMonitorUpdate_);
        else if (l instanceof ie)
          l.value.emitter.off("change", this.onChildValueChange_);
        else {
          const b = yi(l);
          if (b) {
            const E = b.emitter;
            E.off("layout", this.onDescendantLayout_), E.off("inputchange", this.onDescendantInputChange_), E.off("monitorupdate", this.onDescendantMonitorUpdate_);
          }
        }
      }
      updatePositions_() {
        const e = this.bcSet_.items.filter((b) => !b.viewProps.get("hidden")), t = e[0], l = e[e.length - 1];
        this.bcSet_.items.forEach((b) => {
          const E = [];
          b === t && (E.push("first"), (!this.blade_ || this.blade_.get("positions").includes("veryfirst")) && E.push("veryfirst")), b === l && (E.push("last"), (!this.blade_ || this.blade_.get("positions").includes("verylast")) && E.push("verylast")), b.blade.set("positions", E);
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
        const t = tr(this.find(Ge), e.sender);
        if (!t)
          throw k.alreadyDisposed();
        this.emitter.emit("inputchange", {
          bladeController: t,
          options: e.options,
          sender: this
        });
      }
      onChildMonitorUpdate_(e) {
        const t = nr(this.find(at), e.sender);
        if (!t)
          throw k.alreadyDisposed();
        this.emitter.emit("monitorupdate", {
          bladeController: t,
          sender: this
        });
      }
      onChildValueChange_(e) {
        const t = ir(this.find(ie), e.sender);
        if (!t)
          throw k.alreadyDisposed();
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
    class mn extends Lt {
      constructor(e, t) {
        super(Object.assign(Object.assign({}, t), { view: new er(e, {
          viewName: "brk",
          viewProps: t.viewProps
        }) })), this.onRackAdd_ = this.onRackAdd_.bind(this), this.onRackRemove_ = this.onRackRemove_.bind(this);
        const l = new rr({
          blade: t.root ? void 0 : t.blade,
          viewProps: t.viewProps
        });
        l.emitter.on("add", this.onRackAdd_), l.emitter.on("remove", this.onRackRemove_), this.rack = l, this.viewProps.handleDispose(() => {
          for (let b = this.rack.children.length - 1; b >= 0; b--)
            this.rack.children[b].viewProps.set("disposed", true);
        });
      }
      onRackAdd_(e) {
        e.isRoot && At(this.view.element, e.bladeController.view.element, e.index);
      }
      onRackRemove_(e) {
        e.isRoot && $n(e.bladeController.view.element);
      }
    }
    const as = D2("cnt");
    class or {
      constructor(e, t) {
        var l;
        this.className_ = D2((l = t.viewName) !== null && l !== void 0 ? l : "fld"), this.element = e.createElement("div"), this.element.classList.add(this.className_(), as()), t.viewProps.bindClassModifiers(this.element), this.foldable_ = t.foldable, this.foldable_.bindExpandedClass(this.element, this.className_(void 0, "expanded")), O(this.foldable_, "completed", K(this.element, this.className_(void 0, "cpl")));
        const b = e.createElement("button");
        b.classList.add(this.className_("b")), O(t.props, "title", (J) => {
          _2(J) ? this.element.classList.add(this.className_(void 0, "not")) : this.element.classList.remove(this.className_(void 0, "not"));
        }), t.viewProps.bindDisabled(b), this.element.appendChild(b), this.buttonElement = b;
        const E = e.createElement("div");
        E.classList.add(this.className_("i")), this.element.appendChild(E);
        const M = e.createElement("div");
        M.classList.add(this.className_("t")), q(t.props.value("title"), M), this.buttonElement.appendChild(M), this.titleElement = M;
        const B = e.createElement("div");
        B.classList.add(this.className_("m")), this.buttonElement.appendChild(B);
        const Q = t.containerElement;
        Q.classList.add(this.className_("c")), this.element.appendChild(Q), this.containerElement = Q;
      }
    }
    class qn extends wi {
      constructor(e, t) {
        var l;
        const b = Be.create((l = t.expanded) !== null && l !== void 0 ? l : true), E = new mn(e, {
          blade: t.blade,
          root: t.root,
          viewProps: t.viewProps
        });
        super(Object.assign(Object.assign({}, t), { rackController: E, view: new or(e, {
          containerElement: E.view.element,
          foldable: b,
          props: t.props,
          viewName: t.root ? "rot" : void 0,
          viewProps: t.viewProps
        }) })), this.onTitleClick_ = this.onTitleClick_.bind(this), this.props = t.props, this.foldable = b, $e(this.foldable, this.view.containerElement), this.rackController.rack.emitter.on("add", () => {
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
    const ar = {
      id: "folder",
      type: "blade",
      accept(i) {
        const e = S, t = le(i, {
          title: e.required.string,
          view: e.required.constant("folder"),
          expanded: e.optional.boolean
        });
        return t ? { params: t } : null;
      },
      controller(i) {
        return new qn(i.document, {
          blade: i.blade,
          expanded: i.params.expanded,
          props: X.fromObject({
            title: i.params.title
          }),
          viewProps: i.viewProps
        });
      },
      api(i) {
        return i.controller instanceof qn ? new _i(i.controller, i.pool) : null;
      }
    };
    class Kt extends ie {
      constructor(e, t) {
        const l = t.valueController.viewProps;
        super(Object.assign(Object.assign({}, t), { value: t.valueController.value, view: new L(e, {
          props: t.props,
          viewProps: l
        }), viewProps: l })), this.props = t.props, this.valueController = t.valueController, this.view.valueElement.appendChild(this.valueController.view.element);
      }
    }
    class ls extends o {
    }
    const xi = D2("spr");
    class lr {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(xi()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("hr");
        l.classList.add(xi("r")), this.element.appendChild(l);
      }
    }
    class fn extends Lt {
      constructor(e, t) {
        super(Object.assign(Object.assign({}, t), { view: new lr(e, {
          viewProps: t.viewProps
        }) }));
      }
    }
    const cr = {
      id: "separator",
      type: "blade",
      accept(i) {
        const t = le(i, {
          view: S.required.constant("separator")
        });
        return t ? { params: t } : null;
      },
      controller(i) {
        return new fn(i.document, {
          blade: i.blade,
          viewProps: i.viewProps
        });
      },
      api(i) {
        return i.controller instanceof fn ? new ls(i.controller) : null;
      }
    }, Ie = D2("tbi");
    class ur {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(Ie()), t.viewProps.bindClassModifiers(this.element), O(t.props, "selected", (E) => {
          E ? this.element.classList.add(Ie(void 0, "sel")) : this.element.classList.remove(Ie(void 0, "sel"));
        });
        const l = e.createElement("button");
        l.classList.add(Ie("b")), t.viewProps.bindDisabled(l), this.element.appendChild(l), this.buttonElement = l;
        const b = e.createElement("div");
        b.classList.add(Ie("t")), q(t.props.value("title"), b), this.buttonElement.appendChild(b), this.titleElement = b;
      }
    }
    class Qn {
      constructor(e, t) {
        this.emitter = new F(), this.onClick_ = this.onClick_.bind(this), this.props = t.props, this.viewProps = t.viewProps, this.view = new ur(e, {
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
    class cs {
      constructor(e, t) {
        this.onItemClick_ = this.onItemClick_.bind(this), this.ic_ = new Qn(e, {
          props: t.itemProps,
          viewProps: Qe.create()
        }), this.ic_.emitter.on("click", this.onItemClick_), this.cc_ = new mn(e, {
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
    class Ei {
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
    class us extends Xe {
      constructor(e, t) {
        super(e, new Yn(e.rackController, t)), this.onPageAdd_ = this.onPageAdd_.bind(this), this.onPageRemove_ = this.onPageRemove_.bind(this), this.onSelect_ = this.onSelect_.bind(this), this.emitter_ = new F(), this.pageApiMap_ = /* @__PURE__ */ new Map(), this.rackApi_.on("change", (l) => {
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
            throw k.shouldNeverHappen();
          return t;
        });
      }
      addPage(e) {
        const t = this.controller_.view.element.ownerDocument, l = new cs(t, {
          itemProps: X.fromObject({
            selected: false,
            title: e.title
          }),
          props: X.fromObject({
            selected: false
          })
        });
        this.controller_.add(l, e.index);
        const b = this.pageApiMap_.get(l);
        if (!b)
          throw k.shouldNeverHappen();
        return b;
      }
      removePage(e) {
        this.controller_.remove(e);
      }
      on(e, t) {
        const l = t.bind(this);
        return this.emitter_.on(e, (b) => {
          l(b.event);
        }), this;
      }
      setUpPageApi_(e) {
        const t = this.rackApi_.apiSet_.find((b) => b.controller_ === e.contentController);
        if (!t)
          throw k.shouldNeverHappen();
        const l = new Ei(e, t);
        this.pageApiMap_.set(e, l);
      }
      onPageAdd_(e) {
        this.setUpPageApi_(e.item);
      }
      onPageRemove_(e) {
        if (!this.pageApiMap_.get(e.item))
          throw k.shouldNeverHappen();
        this.pageApiMap_.delete(e.item);
      }
      onSelect_(e) {
        this.emitter_.emit("select", {
          event: new g(this, e.rawValue)
        });
      }
    }
    const ps = -1;
    class pr {
      constructor() {
        this.onItemSelectedChange_ = this.onItemSelectedChange_.bind(this), this.empty = ee(true), this.selectedIndex = ee(ps), this.items_ = [];
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
          this.selectedIndex.rawValue = ps, this.empty.rawValue = true;
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
          this.items_.forEach((l, b) => {
            l.rawValue = b === t;
          }), this.selectedIndex.rawValue = t;
        } else
          this.keepSelection_();
      }
    }
    const $t = D2("tab");
    class Xt {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add($t(), as()), t.viewProps.bindClassModifiers(this.element), N(t.empty, K(this.element, $t(void 0, "nop")));
        const l = e.createElement("div");
        l.classList.add($t("t")), this.element.appendChild(l), this.itemsElement = l;
        const b = e.createElement("div");
        b.classList.add($t("i")), this.element.appendChild(b);
        const E = t.contentsElement;
        E.classList.add($t("c")), this.element.appendChild(E), this.contentsElement = E;
      }
    }
    class vn extends wi {
      constructor(e, t) {
        const l = new mn(e, {
          blade: t.blade,
          viewProps: t.viewProps
        }), b = new pr();
        super({
          blade: t.blade,
          rackController: l,
          view: new Xt(e, {
            contentsElement: l.view.element,
            empty: b.empty,
            viewProps: t.viewProps
          })
        }), this.onPageAdd_ = this.onPageAdd_.bind(this), this.onPageRemove_ = this.onPageRemove_.bind(this), this.pageSet_ = new Vt(() => null), this.pageSet_.emitter.on("add", this.onPageAdd_), this.pageSet_.emitter.on("remove", this.onPageRemove_), this.tab = b;
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
        At(this.view.itemsElement, t.itemController.view.element, e.index), t.itemController.viewProps.set("parent", this.viewProps), this.rackController.rack.add(t.contentController, e.index), this.tab.add(t.props.value("selected"));
      }
      onPageRemove_(e) {
        const t = e.item;
        $n(t.itemController.view.element), t.itemController.viewProps.set("parent", null), this.rackController.rack.remove(t.contentController), this.tab.remove(t.props.value("selected"));
      }
    }
    const Ci = {
      id: "tab",
      type: "blade",
      accept(i) {
        const e = S, t = le(i, {
          pages: e.required.array(e.required.object({ title: e.required.string })),
          view: e.required.constant("tab")
        });
        return !t || t.pages.length === 0 ? null : { params: t };
      },
      controller(i) {
        const e = new vn(i.document, {
          blade: i.blade,
          viewProps: i.viewProps
        });
        return i.params.pages.forEach((t) => {
          const l = new cs(i.document, {
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
      api(i) {
        return i.controller instanceof vn ? new us(i.controller, i.pool) : null;
      }
    };
    function hr(i, e) {
      const t = i.accept(e.params);
      if (!t)
        return null;
      const l = S.optional.boolean(e.params.disabled).value, b = S.optional.boolean(e.params.hidden).value;
      return i.controller({
        blade: xe(),
        document: e.document,
        params: Object.assign(Object.assign({}, t.params), { disabled: l, hidden: b }),
        viewProps: Qe.create({
          disabled: l,
          hidden: b
        })
      });
    }
    class hs {
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
    class Pi {
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
    class Zn {
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
    function Ae(i, e) {
      for (; i.length < e; )
        i.push(void 0);
    }
    function ds(i) {
      const e = [];
      return Ae(e, i), ee(e);
    }
    function Yt(i) {
      const e = i.indexOf(void 0);
      return e < 0 ? i : i.slice(0, e);
    }
    function Ze(i, e) {
      const t = [...Yt(i), e];
      return t.length > i.length ? t.splice(0, t.length - i.length) : Ae(t, i.length), t;
    }
    class dr {
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
        this.value.rawValue = Ze(t, l), this.emitter.emit("update", {
          rawValue: l,
          sender: this
        });
      }
      onTick_(e) {
        this.read();
      }
    }
    class bn {
      constructor(e) {
        this.constraints = e;
      }
      constrain(e) {
        return this.constraints.reduce((t, l) => l.constrain(t), e);
      }
    }
    function nt(i, e) {
      if (i instanceof e)
        return i;
      if (i instanceof bn) {
        const t = i.constraints.reduce((l, b) => l || (b instanceof e ? b : null), null);
        if (t)
          return t;
      }
      return null;
    }
    class qt {
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
    class gn {
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
        return t.length === 0 || t.filter((b) => b.value === e).length > 0 ? e : t[0].value;
      }
    }
    class Ti {
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
        let b = e;
        return _2(l) || (b = Math.max(b, l)), _2(t) || (b = Math.min(b, t)), b;
      }
    }
    class Wn {
      constructor(e, t = 0) {
        this.step = e, this.origin = t;
      }
      constrain(e) {
        const t = this.origin % this.step, l = Math.round((e - t) / this.step);
        return t + l * this.step;
      }
    }
    const Qt = D2("lst");
    class ms {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.props_ = t.props, this.element = e.createElement("div"), this.element.classList.add(Qt()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("select");
        l.classList.add(Qt("s")), O(this.props_, "options", (E) => {
          pn(l), E.forEach((M, B) => {
            const Q = e.createElement("option");
            Q.dataset.index = String(B), Q.textContent = M.text, Q.value = String(M.value), l.appendChild(Q);
          });
        }), t.viewProps.bindDisabled(l), this.element.appendChild(l), this.selectElement = l;
        const b = e.createElement("div");
        b.classList.add(Qt("m")), b.appendChild(Et(e, "dropdown")), this.element.appendChild(b), t.value.emitter.on("change", this.onValueChange_), this.value_ = t.value, this.update_();
      }
      update_() {
        this.selectElement.value = String(this.value_.rawValue);
      }
      onValueChange_() {
        this.update_();
      }
    }
    class _n {
      constructor(e, t) {
        this.onSelectChange_ = this.onSelectChange_.bind(this), this.props = t.props, this.value = t.value, this.viewProps = t.viewProps, this.view = new ms(e, {
          props: this.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.selectElement.addEventListener("change", this.onSelectChange_);
      }
      onSelectChange_(e) {
        const l = e.currentTarget.selectedOptions.item(0);
        if (!l)
          return;
        const b = Number(l.dataset.index);
        this.value.rawValue = this.props.get("options")[b].value;
      }
    }
    const fs = D2("pop");
    class mr {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(fs()), t.viewProps.bindClassModifiers(this.element), N(t.shows, K(this.element, fs(void 0, "v")));
      }
    }
    class vs {
      constructor(e, t) {
        this.shows = ee(false), this.viewProps = t.viewProps, this.view = new mr(e, {
          shows: this.shows,
          viewProps: this.viewProps
        });
      }
    }
    const bs = D2("txt");
    class fr {
      constructor(e, t) {
        this.onChange_ = this.onChange_.bind(this), this.element = e.createElement("div"), this.element.classList.add(bs()), t.viewProps.bindClassModifiers(this.element), this.props_ = t.props, this.props_.emitter.on("change", this.onChange_);
        const l = e.createElement("input");
        l.classList.add(bs("i")), l.type = "text", t.viewProps.bindDisabled(l), this.element.appendChild(l), this.inputElement = l, t.value.emitter.on("change", this.onChange_), this.value_ = t.value, this.refresh();
      }
      refresh() {
        const e = this.props_.get("formatter");
        this.inputElement.value = e(this.value_.rawValue);
      }
      onChange_() {
        this.refresh();
      }
    }
    class Jn {
      constructor(e, t) {
        this.onInputChange_ = this.onInputChange_.bind(this), this.parser_ = t.parser, this.props = t.props, this.value = t.value, this.viewProps = t.viewProps, this.view = new fr(e, {
          props: t.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_);
      }
      onInputChange_(e) {
        const l = e.currentTarget.value, b = this.parser_(l);
        _2(b) || (this.value.rawValue = b), this.view.refresh();
      }
    }
    function vr(i) {
      return String(i);
    }
    function gs(i) {
      return i === "false" ? false : !!i;
    }
    function _s(i) {
      return vr(i);
    }
    class br {
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
    const gr = {
      "**": (i, e) => Math.pow(i, e),
      "*": (i, e) => i * e,
      "/": (i, e) => i / e,
      "%": (i, e) => i % e,
      "+": (i, e) => i + e,
      "-": (i, e) => i - e,
      "<<": (i, e) => i << e,
      ">>": (i, e) => i >> e,
      ">>>": (i, e) => i >>> e,
      "&": (i, e) => i & e,
      "^": (i, e) => i ^ e,
      "|": (i, e) => i | e
    };
    class _r {
      constructor(e, t, l) {
        this.left = t, this.operator = e, this.right = l;
      }
      evaluate() {
        const e = gr[this.operator];
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
    const ws = {
      "+": (i) => i,
      "-": (i) => -i,
      "~": (i) => ~i
    };
    class wr {
      constructor(e, t) {
        this.operator = e, this.expression = t;
      }
      evaluate() {
        const e = ws[this.operator];
        if (!e)
          throw new Error(`unexpected unary operator: '${this.operator}`);
        return e(this.expression.evaluate());
      }
      toString() {
        return ["u(", this.operator, this.expression.toString(), ")"].join(" ");
      }
    }
    function ki(i) {
      return (e, t) => {
        for (let l = 0; l < i.length; l++) {
          const b = i[l](e, t);
          if (b !== "")
            return b;
        }
        return "";
      };
    }
    function It(i, e) {
      var t;
      const l = i.substr(e).match(/^\s+/);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function yr(i, e) {
      const t = i.substr(e, 1);
      return t.match(/^[1-9]$/) ? t : "";
    }
    function wn(i, e) {
      var t;
      const l = i.substr(e).match(/^[0-9]+/);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function xr(i, e) {
      const t = wn(i, e);
      if (t !== "")
        return t;
      const l = i.substr(e, 1);
      if (e += 1, l !== "-" && l !== "+")
        return "";
      const b = wn(i, e);
      return b === "" ? "" : l + b;
    }
    function lt(i, e) {
      const t = i.substr(e, 1);
      if (e += 1, t.toLowerCase() !== "e")
        return "";
      const l = xr(i, e);
      return l === "" ? "" : t + l;
    }
    function ys(i, e) {
      const t = i.substr(e, 1);
      if (t === "0")
        return t;
      const l = yr(i, e);
      return e += l.length, l === "" ? "" : l + wn(i, e);
    }
    function Er(i, e) {
      const t = ys(i, e);
      if (e += t.length, t === "")
        return "";
      const l = i.substr(e, 1);
      if (e += l.length, l !== ".")
        return "";
      const b = wn(i, e);
      return e += b.length, t + l + b + lt(i, e);
    }
    function xs(i, e) {
      const t = i.substr(e, 1);
      if (e += t.length, t !== ".")
        return "";
      const l = wn(i, e);
      return e += l.length, l === "" ? "" : t + l + lt(i, e);
    }
    function Cr(i, e) {
      const t = ys(i, e);
      return e += t.length, t === "" ? "" : t + lt(i, e);
    }
    const Es = ki([
      Er,
      xs,
      Cr
    ]);
    function Mi(i, e) {
      var t;
      const l = i.substr(e).match(/^[01]+/);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function Pr(i, e) {
      const t = i.substr(e, 2);
      if (e += t.length, t.toLowerCase() !== "0b")
        return "";
      const l = Mi(i, e);
      return l === "" ? "" : t + l;
    }
    function Cs(i, e) {
      var t;
      const l = i.substr(e).match(/^[0-7]+/);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function We(i, e) {
      const t = i.substr(e, 2);
      if (e += t.length, t.toLowerCase() !== "0o")
        return "";
      const l = Cs(i, e);
      return l === "" ? "" : t + l;
    }
    function Tr(i, e) {
      var t;
      const l = i.substr(e).match(/^[0-9a-f]+/i);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function kr(i, e) {
      const t = i.substr(e, 2);
      if (e += t.length, t.toLowerCase() !== "0x")
        return "";
      const l = Tr(i, e);
      return l === "" ? "" : t + l;
    }
    const Si = ki([
      Pr,
      We,
      kr
    ]), Mr = ki([
      Si,
      Es
    ]);
    function Pt(i, e) {
      const t = Mr(i, e);
      return e += t.length, t === "" ? null : {
        evaluable: new br(t),
        cursor: e
      };
    }
    function Li(i, e) {
      const t = i.substr(e, 1);
      if (e += t.length, t !== "(")
        return null;
      const l = ei(i, e);
      if (!l)
        return null;
      e = l.cursor, e += It(i, e).length;
      const b = i.substr(e, 1);
      return e += b.length, b !== ")" ? null : {
        evaluable: l.evaluable,
        cursor: e
      };
    }
    function Sr(i, e) {
      var t;
      return (t = Pt(i, e)) !== null && t !== void 0 ? t : Li(i, e);
    }
    function Ai(i, e) {
      const t = Sr(i, e);
      if (t)
        return t;
      const l = i.substr(e, 1);
      if (e += l.length, l !== "+" && l !== "-" && l !== "~")
        return null;
      const b = Ai(i, e);
      return b ? (e = b.cursor, {
        cursor: e,
        evaluable: new wr(l, b.evaluable)
      }) : null;
    }
    function Lr(i, e, t) {
      t += It(e, t).length;
      const l = i.filter((b) => e.startsWith(b, t))[0];
      return l ? (t += l.length, t += It(e, t).length, {
        cursor: t,
        operator: l
      }) : null;
    }
    function Dt(i, e) {
      return (t, l) => {
        const b = i(t, l);
        if (!b)
          return null;
        l = b.cursor;
        let E = b.evaluable;
        for (; ; ) {
          const M = Lr(e, t, l);
          if (!M)
            break;
          l = M.cursor;
          const B = i(t, l);
          if (!B)
            return null;
          l = B.cursor, E = new _r(M.operator, E, B.evaluable);
        }
        return E ? {
          cursor: l,
          evaluable: E
        } : null;
      };
    }
    const Ps = [
      ["**"],
      ["*", "/", "%"],
      ["+", "-"],
      ["<<", ">>>", ">>"],
      ["&"],
      ["^"],
      ["|"]
    ].reduce((i, e) => Dt(i, e), Ai);
    function ei(i, e) {
      return e += It(i, e).length, Ps(i, e);
    }
    function Ts(i) {
      const e = ei(i, 0);
      return !e || e.cursor + It(i, e.cursor).length !== i.length ? null : e.evaluable;
    }
    function ct(i) {
      var e;
      const t = Ts(i);
      return (e = t == null ? void 0 : t.evaluate()) !== null && e !== void 0 ? e : null;
    }
    function _t(i) {
      if (typeof i == "number")
        return i;
      if (typeof i == "string") {
        const e = ct(i);
        if (!_2(e))
          return e;
      }
      return 0;
    }
    function Ar(i) {
      return String(i);
    }
    function De(i) {
      return (e) => e.toFixed(Math.max(Math.min(i, 20), 0));
    }
    const ks = De(0);
    function yn(i) {
      return ks(i) + "%";
    }
    function Ri(i) {
      return String(i);
    }
    function Tt(i) {
      return i;
    }
    function Zt({ primary: i, secondary: e, forward: t, backward: l }) {
      let b = false;
      function E(M) {
        b || (b = true, M(), b = false);
      }
      i.emitter.on("change", (M) => {
        E(() => {
          e.setRawValue(t(i, e), M.options);
        });
      }), e.emitter.on("change", (M) => {
        E(() => {
          i.setRawValue(l(i, e), M.options);
        }), E(() => {
          e.setRawValue(t(i, e), M.options);
        });
      }), E(() => {
        e.setRawValue(t(i, e), {
          forceEmit: false,
          last: true
        });
      });
    }
    function ze(i, e) {
      const t = i * (e.altKey ? 0.1 : 1) * (e.shiftKey ? 10 : 1);
      return e.upKey ? +t : e.downKey ? -t : 0;
    }
    function xn(i) {
      return {
        altKey: i.altKey,
        downKey: i.key === "ArrowDown",
        shiftKey: i.shiftKey,
        upKey: i.key === "ArrowUp"
      };
    }
    function ut(i) {
      return {
        altKey: i.altKey,
        downKey: i.key === "ArrowLeft",
        shiftKey: i.shiftKey,
        upKey: i.key === "ArrowRight"
      };
    }
    function Ms(i) {
      return i === "ArrowUp" || i === "ArrowDown";
    }
    function ti(i) {
      return Ms(i) || i === "ArrowLeft" || i === "ArrowRight";
    }
    function Vi(i, e) {
      var t, l;
      const b = e.ownerDocument.defaultView, E = e.getBoundingClientRect();
      return {
        x: i.pageX - (((t = b && b.scrollX) !== null && t !== void 0 ? t : 0) + E.left),
        y: i.pageY - (((l = b && b.scrollY) !== null && l !== void 0 ? l : 0) + E.top)
      };
    }
    class Ot {
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
          data: this.computePosition_(Vi(e, this.elem_)),
          sender: this,
          shiftKey: e.shiftKey
        });
      }
      onDocumentMouseMove_(e) {
        this.emitter.emit("move", {
          altKey: e.altKey,
          data: this.computePosition_(Vi(e, this.elem_)),
          sender: this,
          shiftKey: e.shiftKey
        });
      }
      onDocumentMouseUp_(e) {
        const t = this.elem_.ownerDocument;
        t.removeEventListener("mousemove", this.onDocumentMouseMove_), t.removeEventListener("mouseup", this.onDocumentMouseUp_), this.emitter.emit("up", {
          altKey: e.altKey,
          data: this.computePosition_(Vi(e, this.elem_)),
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
        const l = (t = e.targetTouches.item(0)) !== null && t !== void 0 ? t : this.lastTouch_, b = this.elem_.getBoundingClientRect();
        this.emitter.emit("up", {
          altKey: e.altKey,
          data: this.computePosition_(l ? {
            x: l.clientX - b.left,
            y: l.clientY - b.top
          } : void 0),
          sender: this,
          shiftKey: e.shiftKey
        });
      }
    }
    function we(i, e, t, l, b) {
      const E = (i - e) / (t - e);
      return l + E * (b - l);
    }
    function Ii(i) {
      return String(i.toFixed(10)).split(".")[1].replace(/0+$/, "").length;
    }
    function Re(i, e, t) {
      return Math.min(Math.max(i, e), t);
    }
    function Wt(i, e) {
      return (i % e + e) % e;
    }
    const Ye = D2("txt");
    class Di {
      constructor(e, t) {
        this.onChange_ = this.onChange_.bind(this), this.props_ = t.props, this.props_.emitter.on("change", this.onChange_), this.element = e.createElement("div"), this.element.classList.add(Ye(), Ye(void 0, "num")), t.arrayPosition && this.element.classList.add(Ye(void 0, t.arrayPosition)), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("input");
        l.classList.add(Ye("i")), l.type = "text", t.viewProps.bindDisabled(l), this.element.appendChild(l), this.inputElement = l, this.onDraggingChange_ = this.onDraggingChange_.bind(this), this.dragging_ = t.dragging, this.dragging_.emitter.on("change", this.onDraggingChange_), this.element.classList.add(Ye()), this.inputElement.classList.add(Ye("i"));
        const b = e.createElement("div");
        b.classList.add(Ye("k")), this.element.appendChild(b), this.knobElement = b;
        const E = e.createElementNS(Ke, "svg");
        E.classList.add(Ye("g")), this.knobElement.appendChild(E);
        const M = e.createElementNS(Ke, "path");
        M.classList.add(Ye("gb")), E.appendChild(M), this.guideBodyElem_ = M;
        const B = e.createElementNS(Ke, "path");
        B.classList.add(Ye("gh")), E.appendChild(B), this.guideHeadElem_ = B;
        const Q = e.createElement("div");
        Q.classList.add(D2("tt")()), this.knobElement.appendChild(Q), this.tooltipElem_ = Q, t.value.emitter.on("change", this.onChange_), this.value = t.value, this.refresh();
      }
      onDraggingChange_(e) {
        if (e.rawValue === null) {
          this.element.classList.remove(Ye(void 0, "drg"));
          return;
        }
        this.element.classList.add(Ye(void 0, "drg"));
        const t = e.rawValue / this.props_.get("draggingScale"), l = t + (t > 0 ? -1 : t < 0 ? 1 : 0), b = Re(-l, -4, 4);
        this.guideHeadElem_.setAttributeNS(null, "d", [`M ${l + b},0 L${l},4 L${l + b},8`, `M ${t},-1 L${t},9`].join(" ")), this.guideBodyElem_.setAttributeNS(null, "d", `M 0,4 L${t},4`);
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
    class En {
      constructor(e, t) {
        var l;
        this.originRawValue_ = 0, this.onInputChange_ = this.onInputChange_.bind(this), this.onInputKeyDown_ = this.onInputKeyDown_.bind(this), this.onInputKeyUp_ = this.onInputKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.baseStep_ = t.baseStep, this.parser_ = t.parser, this.props = t.props, this.sliderProps_ = (l = t.sliderProps) !== null && l !== void 0 ? l : null, this.value = t.value, this.viewProps = t.viewProps, this.dragging_ = ee(null), this.view = new Di(e, {
          arrayPosition: t.arrayPosition,
          dragging: this.dragging_,
          props: this.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_), this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_), this.view.inputElement.addEventListener("keyup", this.onInputKeyUp_);
        const b = new Ot(this.view.knobElement);
        b.emitter.on("down", this.onPointerDown_), b.emitter.on("move", this.onPointerMove_), b.emitter.on("up", this.onPointerUp_);
      }
      constrainValue_(e) {
        var t, l;
        const b = (t = this.sliderProps_) === null || t === void 0 ? void 0 : t.get("minValue"), E = (l = this.sliderProps_) === null || l === void 0 ? void 0 : l.get("maxValue");
        let M = e;
        return b !== void 0 && (M = Math.max(M, b)), E !== void 0 && (M = Math.min(M, E)), M;
      }
      onInputChange_(e) {
        const l = e.currentTarget.value, b = this.parser_(l);
        _2(b) || (this.value.rawValue = this.constrainValue_(b)), this.view.refresh();
      }
      onInputKeyDown_(e) {
        const t = ze(this.baseStep_, xn(e));
        t !== 0 && this.value.setRawValue(this.constrainValue_(this.value.rawValue + t), {
          forceEmit: false,
          last: false
        });
      }
      onInputKeyUp_(e) {
        ze(this.baseStep_, xn(e)) !== 0 && this.value.setRawValue(this.value.rawValue, {
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
    const Oi = D2("sld");
    class qe {
      constructor(e, t) {
        this.onChange_ = this.onChange_.bind(this), this.props_ = t.props, this.props_.emitter.on("change", this.onChange_), this.element = e.createElement("div"), this.element.classList.add(Oi()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(Oi("t")), t.viewProps.bindTabIndex(l), this.element.appendChild(l), this.trackElement = l;
        const b = e.createElement("div");
        b.classList.add(Oi("k")), this.trackElement.appendChild(b), this.knobElement = b, t.value.emitter.on("change", this.onChange_), this.value = t.value, this.update_();
      }
      update_() {
        const e = Re(we(this.value.rawValue, this.props_.get("minValue"), this.props_.get("maxValue"), 0, 100), 0, 100);
        this.knobElement.style.width = `${e}%`;
      }
      onChange_() {
        this.update_();
      }
    }
    class Fi {
      constructor(e, t) {
        this.onKeyDown_ = this.onKeyDown_.bind(this), this.onKeyUp_ = this.onKeyUp_.bind(this), this.onPointerDownOrMove_ = this.onPointerDownOrMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.baseStep_ = t.baseStep, this.value = t.value, this.viewProps = t.viewProps, this.props = t.props, this.view = new qe(e, {
          props: this.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.ptHandler_ = new Ot(this.view.trackElement), this.ptHandler_.emitter.on("down", this.onPointerDownOrMove_), this.ptHandler_.emitter.on("move", this.onPointerDownOrMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.trackElement.addEventListener("keydown", this.onKeyDown_), this.view.trackElement.addEventListener("keyup", this.onKeyUp_);
      }
      handlePointerEvent_(e, t) {
        e.point && this.value.setRawValue(we(Re(e.point.x, 0, e.bounds.width), 0, e.bounds.width, this.props.get("minValue"), this.props.get("maxValue")), t);
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
        const t = ze(this.baseStep_, ut(e));
        t !== 0 && this.value.setRawValue(this.value.rawValue + t, {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(e) {
        ze(this.baseStep_, ut(e)) !== 0 && this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    const Cn = D2("sldtxt");
    class Ni {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(Cn());
        const l = e.createElement("div");
        l.classList.add(Cn("s")), this.sliderView_ = t.sliderView, l.appendChild(this.sliderView_.element), this.element.appendChild(l);
        const b = e.createElement("div");
        b.classList.add(Cn("t")), this.textView_ = t.textView, b.appendChild(this.textView_.element), this.element.appendChild(b);
      }
    }
    class ni {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.sliderC_ = new Fi(e, {
          baseStep: t.baseStep,
          props: t.sliderProps,
          value: t.value,
          viewProps: this.viewProps
        }), this.textC_ = new En(e, {
          baseStep: t.baseStep,
          parser: t.parser,
          props: t.textProps,
          sliderProps: t.sliderProps,
          value: t.value,
          viewProps: t.viewProps
        }), this.view = new Ni(e, {
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
    function it(i, e) {
      i.write(e);
    }
    function Pn(i) {
      const e = S;
      if (Array.isArray(i))
        return e.required.array(e.required.object({
          text: e.required.string,
          value: e.required.raw
        }))(i).value;
      if (typeof i == "object")
        return e.required.raw(i).value;
    }
    function Bi(i) {
      if (i === "inline" || i === "popup")
        return i;
    }
    function wt(i) {
      const e = S;
      return e.required.object({
        max: e.optional.number,
        min: e.optional.number,
        step: e.optional.number
      })(i).value;
    }
    function Ss(i) {
      if (Array.isArray(i))
        return i;
      const e = [];
      return Object.keys(i).forEach((t) => {
        e.push({ text: t, value: i[t] });
      }), e;
    }
    function zi(i) {
      return _2(i) ? null : new gn(Ss(i));
    }
    function Rr(i) {
      const e = i ? nt(i, Wn) : null;
      return e ? e.step : null;
    }
    function ii(i, e) {
      const t = i && nt(i, Wn);
      return t ? Ii(t.step) : Math.max(Ii(e), 2);
    }
    function Ft(i) {
      const e = Rr(i);
      return e ?? 1;
    }
    function Nt(i, e) {
      var t;
      const l = i && nt(i, Wn), b = Math.abs((t = l == null ? void 0 : l.step) !== null && t !== void 0 ? t : e);
      return b === 0 ? 0.1 : Math.pow(10, Math.floor(Math.log10(b)) - 1);
    }
    const Tn = D2("ckb");
    class kn {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.element = e.createElement("div"), this.element.classList.add(Tn()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("label");
        l.classList.add(Tn("l")), this.element.appendChild(l);
        const b = e.createElement("input");
        b.classList.add(Tn("i")), b.type = "checkbox", l.appendChild(b), this.inputElement = b, t.viewProps.bindDisabled(this.inputElement);
        const E = e.createElement("div");
        E.classList.add(Tn("w")), l.appendChild(E);
        const M = Et(e, "check");
        E.appendChild(M), t.value.emitter.on("change", this.onValueChange_), this.value = t.value, this.update_();
      }
      update_() {
        this.inputElement.checked = this.value.rawValue;
      }
      onValueChange_() {
        this.update_();
      }
    }
    class Ls {
      constructor(e, t) {
        this.onInputChange_ = this.onInputChange_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.view = new kn(e, {
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_);
      }
      onInputChange_(e) {
        const t = e.currentTarget;
        this.value.rawValue = t.checked;
      }
    }
    function As(i) {
      const e = [], t = zi(i.options);
      return t && e.push(t), new bn(e);
    }
    const si = {
      id: "input-bool",
      type: "input",
      accept: (i, e) => {
        if (typeof i != "boolean")
          return null;
        const l = le(e, {
          options: S.optional.custom(Pn)
        });
        return l ? {
          initialValue: i,
          params: l
        } : null;
      },
      binding: {
        reader: (i) => gs,
        constraint: (i) => As(i.params),
        writer: (i) => it
      },
      controller: (i) => {
        const e = i.document, t = i.value, l = i.constraint, b = l && nt(l, gn);
        return b ? new _n(e, {
          props: new X({
            options: b.values.value("options")
          }),
          value: t,
          viewProps: i.viewProps
        }) : new Ls(e, {
          value: t,
          viewProps: i.viewProps
        });
      }
    }, Bt = D2("col");
    class ji {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(Bt()), t.foldable.bindExpandedClass(this.element, Bt(void 0, "expanded")), O(t.foldable, "completed", K(this.element, Bt(void 0, "cpl")));
        const l = e.createElement("div");
        l.classList.add(Bt("h")), this.element.appendChild(l);
        const b = e.createElement("div");
        b.classList.add(Bt("s")), l.appendChild(b), this.swatchElement = b;
        const E = e.createElement("div");
        if (E.classList.add(Bt("t")), l.appendChild(E), this.textElement = E, t.pickerLayout === "inline") {
          const M = e.createElement("div");
          M.classList.add(Bt("p")), this.element.appendChild(M), this.pickerElement = M;
        } else
          this.pickerElement = null;
      }
    }
    function Vr(i, e, t) {
      const l = Re(i / 255, 0, 1), b = Re(e / 255, 0, 1), E = Re(t / 255, 0, 1), M = Math.max(l, b, E), B = Math.min(l, b, E), Q = M - B;
      let J = 0, de = 0;
      const ve = (B + M) / 2;
      return Q !== 0 && (de = Q / (1 - Math.abs(M + B - 1)), l === M ? J = (b - E) / Q : b === M ? J = 2 + (E - l) / Q : J = 4 + (l - b) / Q, J = J / 6 + (J < 0 ? 1 : 0)), [J * 360, de * 100, ve * 100];
    }
    function Ir(i, e, t) {
      const l = (i % 360 + 360) % 360, b = Re(e / 100, 0, 1), E = Re(t / 100, 0, 1), M = (1 - Math.abs(2 * E - 1)) * b, B = M * (1 - Math.abs(l / 60 % 2 - 1)), Q = E - M / 2;
      let J, de, ve;
      return l >= 0 && l < 60 ? [J, de, ve] = [M, B, 0] : l >= 60 && l < 120 ? [J, de, ve] = [B, M, 0] : l >= 120 && l < 180 ? [J, de, ve] = [0, M, B] : l >= 180 && l < 240 ? [J, de, ve] = [0, B, M] : l >= 240 && l < 300 ? [J, de, ve] = [B, 0, M] : [J, de, ve] = [M, 0, B], [(J + Q) * 255, (de + Q) * 255, (ve + Q) * 255];
    }
    function Dr(i, e, t) {
      const l = Re(i / 255, 0, 1), b = Re(e / 255, 0, 1), E = Re(t / 255, 0, 1), M = Math.max(l, b, E), B = Math.min(l, b, E), Q = M - B;
      let J;
      Q === 0 ? J = 0 : M === l ? J = 60 * (((b - E) / Q % 6 + 6) % 6) : M === b ? J = 60 * ((E - l) / Q + 2) : J = 60 * ((l - b) / Q + 4);
      const de = M === 0 ? 0 : Q / M, ve = M;
      return [J, de * 100, ve * 100];
    }
    function Rs(i, e, t) {
      const l = Wt(i, 360), b = Re(e / 100, 0, 1), E = Re(t / 100, 0, 1), M = E * b, B = M * (1 - Math.abs(l / 60 % 2 - 1)), Q = E - M;
      let J, de, ve;
      return l >= 0 && l < 60 ? [J, de, ve] = [M, B, 0] : l >= 60 && l < 120 ? [J, de, ve] = [B, M, 0] : l >= 120 && l < 180 ? [J, de, ve] = [0, M, B] : l >= 180 && l < 240 ? [J, de, ve] = [0, B, M] : l >= 240 && l < 300 ? [J, de, ve] = [B, 0, M] : [J, de, ve] = [M, 0, B], [(J + Q) * 255, (de + Q) * 255, (ve + Q) * 255];
    }
    function m(i, e, t) {
      const l = t + e * (100 - Math.abs(2 * t - 100)) / 200;
      return [
        i,
        l !== 0 ? e * (100 - Math.abs(2 * t - 100)) / l : 0,
        t + e * (100 - Math.abs(2 * t - 100)) / (2 * 100)
      ];
    }
    function a(i, e, t) {
      const l = 100 - Math.abs(t * (200 - e) / 100 - 100);
      return [i, l !== 0 ? e * t / l : 0, t * (200 - e) / (2 * 100)];
    }
    function u(i) {
      return [i[0], i[1], i[2]];
    }
    function f(i, e) {
      return [i[0], i[1], i[2], e];
    }
    const x = {
      hsl: {
        hsl: (i, e, t) => [i, e, t],
        hsv: m,
        rgb: Ir
      },
      hsv: {
        hsl: a,
        hsv: (i, e, t) => [i, e, t],
        rgb: Rs
      },
      rgb: {
        hsl: Vr,
        hsv: Dr,
        rgb: (i, e, t) => [i, e, t]
      }
    };
    function T(i, e) {
      return [
        e === "float" ? 1 : i === "rgb" ? 255 : 360,
        e === "float" ? 1 : i === "rgb" ? 255 : 100,
        e === "float" ? 1 : i === "rgb" ? 255 : 100
      ];
    }
    function V(i, e) {
      return i === e ? e : Wt(i, e);
    }
    function j(i, e, t) {
      var l;
      const b = T(e, t);
      return [
        e === "rgb" ? Re(i[0], 0, b[0]) : V(i[0], b[0]),
        Re(i[1], 0, b[1]),
        Re(i[2], 0, b[2]),
        Re((l = i[3]) !== null && l !== void 0 ? l : 1, 0, 1)
      ];
    }
    function oe(i, e, t, l) {
      const b = T(e, t), E = T(e, l);
      return i.map((M, B) => M / b[B] * E[B]);
    }
    function Je(i, e, t) {
      const l = oe(i, e.mode, e.type, "int"), b = x[e.mode][t.mode](...l);
      return oe(b, t.mode, "int", t.type);
    }
    function et(i, e) {
      return typeof i != "object" || _2(i) ? false : e in i && typeof i[e] == "number";
    }
    class te {
      static black(e = "int") {
        return new te([0, 0, 0], "rgb", e);
      }
      static fromObject(e, t = "int") {
        const l = "a" in e ? [e.r, e.g, e.b, e.a] : [e.r, e.g, e.b];
        return new te(l, "rgb", t);
      }
      static toRgbaObject(e, t = "int") {
        return e.toRgbaObject(t);
      }
      static isRgbColorObject(e) {
        return et(e, "r") && et(e, "g") && et(e, "b");
      }
      static isRgbaColorObject(e) {
        return this.isRgbColorObject(e) && et(e, "a");
      }
      static isColorObject(e) {
        return this.isRgbColorObject(e);
      }
      static equals(e, t) {
        if (e.mode !== t.mode)
          return false;
        const l = e.comps_, b = t.comps_;
        for (let E = 0; E < l.length; E++)
          if (l[E] !== b[E])
            return false;
        return true;
      }
      constructor(e, t, l = "int") {
        this.mode = t, this.type = l, this.comps_ = j(e, t, l);
      }
      getComponents(e, t = "int") {
        return f(Je(u(this.comps_), { mode: this.mode, type: this.type }, { mode: e ?? this.mode, type: t }), this.comps_[3]);
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
    const kt = D2("colp");
    class Or {
      constructor(e, t) {
        this.alphaViews_ = null, this.element = e.createElement("div"), this.element.classList.add(kt()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(kt("hsv"));
        const b = e.createElement("div");
        b.classList.add(kt("sv")), this.svPaletteView_ = t.svPaletteView, b.appendChild(this.svPaletteView_.element), l.appendChild(b);
        const E = e.createElement("div");
        E.classList.add(kt("h")), this.hPaletteView_ = t.hPaletteView, E.appendChild(this.hPaletteView_.element), l.appendChild(E), this.element.appendChild(l);
        const M = e.createElement("div");
        if (M.classList.add(kt("rgb")), this.textView_ = t.textView, M.appendChild(this.textView_.element), this.element.appendChild(M), t.alphaViews) {
          this.alphaViews_ = {
            palette: t.alphaViews.palette,
            text: t.alphaViews.text
          };
          const B = e.createElement("div");
          B.classList.add(kt("a"));
          const Q = e.createElement("div");
          Q.classList.add(kt("ap")), Q.appendChild(this.alphaViews_.palette.element), B.appendChild(Q);
          const J = e.createElement("div");
          J.classList.add(kt("at")), J.appendChild(this.alphaViews_.text.element), B.appendChild(J), this.element.appendChild(B);
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
    function rl(i) {
      return i === "int" ? "int" : i === "float" ? "float" : void 0;
    }
    function Fr(i) {
      const e = S;
      return le(i, {
        alpha: e.optional.boolean,
        color: e.optional.object({
          alpha: e.optional.boolean,
          type: e.optional.custom(rl)
        }),
        expanded: e.optional.boolean,
        picker: e.optional.custom(Bi)
      });
    }
    function Mn(i) {
      return i ? 0.1 : 1;
    }
    function Sn(i) {
      var e;
      return (e = i.color) === null || e === void 0 ? void 0 : e.type;
    }
    function ol(i, e) {
      return i.alpha === e.alpha && i.mode === e.mode && i.notation === e.notation && i.type === e.type;
    }
    function pt(i, e) {
      const t = i.match(/^(.+)%$/);
      return Math.min(t ? parseFloat(t[1]) * 0.01 * e : parseFloat(i), e);
    }
    const al = {
      deg: (i) => i,
      grad: (i) => i * 360 / 400,
      rad: (i) => i * 360 / (2 * Math.PI),
      turn: (i) => i * 360
    };
    function To(i) {
      const e = i.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);
      if (!e)
        return parseFloat(i);
      const t = parseFloat(e[1]), l = e[2];
      return al[l](t);
    }
    function ko(i) {
      const e = i.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
      if (!e)
        return null;
      const t = [
        pt(e[1], 255),
        pt(e[2], 255),
        pt(e[3], 255)
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) ? null : t;
    }
    function Mo(i) {
      return (e) => {
        const t = ko(e);
        return t ? new te(t, "rgb", i) : null;
      };
    }
    function So(i) {
      const e = i.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
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
    function Lo(i) {
      return (e) => {
        const t = So(e);
        return t ? new te(t, "rgb", i) : null;
      };
    }
    function Ao(i) {
      const e = i.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
      if (!e)
        return null;
      const t = [
        To(e[1]),
        pt(e[2], 100),
        pt(e[3], 100)
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) ? null : t;
    }
    function Ro(i) {
      return (e) => {
        const t = Ao(e);
        return t ? new te(t, "hsl", i) : null;
      };
    }
    function Vo(i) {
      const e = i.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
      if (!e)
        return null;
      const t = [
        To(e[1]),
        pt(e[2], 100),
        pt(e[3], 100),
        pt(e[4], 1)
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) || isNaN(t[3]) ? null : t;
    }
    function Io(i) {
      return (e) => {
        const t = Vo(e);
        return t ? new te(t, "hsl", i) : null;
      };
    }
    function Do(i) {
      const e = i.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
      if (e)
        return [
          parseInt(e[1] + e[1], 16),
          parseInt(e[2] + e[2], 16),
          parseInt(e[3] + e[3], 16)
        ];
      const t = i.match(/^(?:#|0x)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
      return t ? [
        parseInt(t[1], 16),
        parseInt(t[2], 16),
        parseInt(t[3], 16)
      ] : null;
    }
    function ll(i) {
      const e = Do(i);
      return e ? new te(e, "rgb", "int") : null;
    }
    function Oo(i) {
      const e = i.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
      if (e)
        return [
          parseInt(e[1] + e[1], 16),
          parseInt(e[2] + e[2], 16),
          parseInt(e[3] + e[3], 16),
          we(parseInt(e[4] + e[4], 16), 0, 255, 0, 1)
        ];
      const t = i.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
      return t ? [
        parseInt(t[1], 16),
        parseInt(t[2], 16),
        parseInt(t[3], 16),
        we(parseInt(t[4], 16), 0, 255, 0, 1)
      ] : null;
    }
    function cl(i) {
      const e = Oo(i);
      return e ? new te(e, "rgb", "int") : null;
    }
    function Fo(i) {
      const e = i.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);
      if (!e)
        return null;
      const t = [
        parseFloat(e[1]),
        parseFloat(e[2]),
        parseFloat(e[3])
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) ? null : t;
    }
    function No(i) {
      return (e) => {
        const t = Fo(e);
        return t ? new te(t, "rgb", i) : null;
      };
    }
    function Bo(i) {
      const e = i.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*a\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);
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
    function zo(i) {
      return (e) => {
        const t = Bo(e);
        return t ? new te(t, "rgb", i) : null;
      };
    }
    const ul = [
      {
        parser: Do,
        result: {
          alpha: false,
          mode: "rgb",
          notation: "hex"
        }
      },
      {
        parser: Oo,
        result: {
          alpha: true,
          mode: "rgb",
          notation: "hex"
        }
      },
      {
        parser: ko,
        result: {
          alpha: false,
          mode: "rgb",
          notation: "func"
        }
      },
      {
        parser: So,
        result: {
          alpha: true,
          mode: "rgb",
          notation: "func"
        }
      },
      {
        parser: Ao,
        result: {
          alpha: false,
          mode: "hsl",
          notation: "func"
        }
      },
      {
        parser: Vo,
        result: {
          alpha: true,
          mode: "hsl",
          notation: "func"
        }
      },
      {
        parser: Fo,
        result: {
          alpha: false,
          mode: "rgb",
          notation: "object"
        }
      },
      {
        parser: Bo,
        result: {
          alpha: true,
          mode: "rgb",
          notation: "object"
        }
      }
    ];
    function pl(i) {
      return ul.reduce((e, { parser: t, result: l }) => e || (t(i) ? l : null), null);
    }
    function Nr(i, e = "int") {
      const t = pl(i);
      return t ? t.notation === "hex" && e !== "float" ? Object.assign(Object.assign({}, t), { type: "int" }) : t.notation === "func" ? Object.assign(Object.assign({}, t), { type: e }) : null : null;
    }
    const jo = {
      int: [
        ll,
        cl,
        Mo("int"),
        Lo("int"),
        Ro("int"),
        Io("int"),
        No("int"),
        zo("int")
      ],
      float: [
        Mo("float"),
        Lo("float"),
        Ro("float"),
        Io("float"),
        No("float"),
        zo("float")
      ]
    };
    function hl(i) {
      const e = jo[i];
      return (t) => {
        if (typeof t != "string")
          return te.black(i);
        const l = e.reduce((b, E) => b || E(t), null);
        return l ?? te.black(i);
      };
    }
    function Br(i) {
      const e = jo[i];
      return (t) => e.reduce((l, b) => l || b(t), null);
    }
    function Uo(i) {
      const e = Re(Math.floor(i), 0, 255).toString(16);
      return e.length === 1 ? `0${e}` : e;
    }
    function Go(i, e = "#") {
      const t = u(i.getComponents("rgb")).map(Uo).join("");
      return `${e}${t}`;
    }
    function zr(i, e = "#") {
      const t = i.getComponents("rgb"), l = [t[0], t[1], t[2], t[3] * 255].map(Uo).join("");
      return `${e}${l}`;
    }
    function Ho(i, e) {
      const t = De(e === "float" ? 2 : 0);
      return `rgb(${u(i.getComponents("rgb", e)).map((b) => t(b)).join(", ")})`;
    }
    function dl(i) {
      return (e) => Ho(e, i);
    }
    function Vs(i, e) {
      const t = De(2), l = De(e === "float" ? 2 : 0);
      return `rgba(${i.getComponents("rgb", e).map((E, M) => (M === 3 ? t : l)(E)).join(", ")})`;
    }
    function ml(i) {
      return (e) => Vs(e, i);
    }
    function fl(i) {
      const e = [
        De(0),
        yn,
        yn
      ];
      return `hsl(${u(i.getComponents("hsl")).map((l, b) => e[b](l)).join(", ")})`;
    }
    function vl(i) {
      const e = [
        De(0),
        yn,
        yn,
        De(2)
      ];
      return `hsla(${i.getComponents("hsl").map((l, b) => e[b](l)).join(", ")})`;
    }
    function Ko(i, e) {
      const t = De(e === "float" ? 2 : 0), l = ["r", "g", "b"];
      return `{${u(i.getComponents("rgb", e)).map((E, M) => `${l[M]}: ${t(E)}`).join(", ")}}`;
    }
    function bl(i) {
      return (e) => Ko(e, i);
    }
    function $o(i, e) {
      const t = De(2), l = De(e === "float" ? 2 : 0), b = ["r", "g", "b", "a"];
      return `{${i.getComponents("rgb", e).map((M, B) => {
        const Q = B === 3 ? t : l;
        return `${b[B]}: ${Q(M)}`;
      }).join(", ")}}`;
    }
    function gl(i) {
      return (e) => $o(e, i);
    }
    const _l = [
      {
        format: {
          alpha: false,
          mode: "rgb",
          notation: "hex",
          type: "int"
        },
        stringifier: Go
      },
      {
        format: {
          alpha: true,
          mode: "rgb",
          notation: "hex",
          type: "int"
        },
        stringifier: zr
      },
      {
        format: {
          alpha: false,
          mode: "hsl",
          notation: "func",
          type: "int"
        },
        stringifier: fl
      },
      {
        format: {
          alpha: true,
          mode: "hsl",
          notation: "func",
          type: "int"
        },
        stringifier: vl
      },
      ...["int", "float"].reduce((i, e) => [
        ...i,
        {
          format: {
            alpha: false,
            mode: "rgb",
            notation: "func",
            type: e
          },
          stringifier: dl(e)
        },
        {
          format: {
            alpha: true,
            mode: "rgb",
            notation: "func",
            type: e
          },
          stringifier: ml(e)
        },
        {
          format: {
            alpha: false,
            mode: "rgb",
            notation: "object",
            type: e
          },
          stringifier: bl(e)
        },
        {
          format: {
            alpha: true,
            mode: "rgb",
            notation: "object",
            type: e
          },
          stringifier: gl(e)
        }
      ], [])
    ];
    function jr(i) {
      return _l.reduce((e, t) => e || (ol(t.format, i) ? t.stringifier : null), null);
    }
    const Ui = D2("apl");
    class wl {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.value = t.value, this.value.emitter.on("change", this.onValueChange_), this.element = e.createElement("div"), this.element.classList.add(Ui()), t.viewProps.bindClassModifiers(this.element), t.viewProps.bindTabIndex(this.element);
        const l = e.createElement("div");
        l.classList.add(Ui("b")), this.element.appendChild(l);
        const b = e.createElement("div");
        b.classList.add(Ui("c")), l.appendChild(b), this.colorElem_ = b;
        const E = e.createElement("div");
        E.classList.add(Ui("m")), this.element.appendChild(E), this.markerElem_ = E;
        const M = e.createElement("div");
        M.classList.add(Ui("p")), this.markerElem_.appendChild(M), this.previewElem_ = M, this.update_();
      }
      update_() {
        const e = this.value.rawValue, t = e.getComponents("rgb"), l = new te([t[0], t[1], t[2], 0], "rgb"), b = new te([t[0], t[1], t[2], 255], "rgb"), E = [
          "to right",
          Vs(l),
          Vs(b)
        ];
        this.colorElem_.style.background = `linear-gradient(${E.join(",")})`, this.previewElem_.style.backgroundColor = Vs(e);
        const M = we(t[3], 0, 1, 0, 100);
        this.markerElem_.style.left = `${M}%`;
      }
      onValueChange_() {
        this.update_();
      }
    }
    class yl {
      constructor(e, t) {
        this.onKeyDown_ = this.onKeyDown_.bind(this), this.onKeyUp_ = this.onKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.view = new wl(e, {
          value: this.value,
          viewProps: this.viewProps
        }), this.ptHandler_ = new Ot(this.view.element), this.ptHandler_.emitter.on("down", this.onPointerDown_), this.ptHandler_.emitter.on("move", this.onPointerMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.element.addEventListener("keydown", this.onKeyDown_), this.view.element.addEventListener("keyup", this.onKeyUp_);
      }
      handlePointerEvent_(e, t) {
        if (!e.point)
          return;
        const l = e.point.x / e.bounds.width, b = this.value.rawValue, [E, M, B] = b.getComponents("hsv");
        this.value.setRawValue(new te([E, M, B, l], "hsv"), t);
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
        const t = ze(Mn(true), ut(e));
        if (t === 0)
          return;
        const l = this.value.rawValue, [b, E, M, B] = l.getComponents("hsv");
        this.value.setRawValue(new te([b, E, M, B + t], "hsv"), {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(e) {
        ze(Mn(true), ut(e)) !== 0 && this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    const ri = D2("coltxt");
    function xl(i) {
      const e = i.createElement("select"), t = [
        { text: "RGB", value: "rgb" },
        { text: "HSL", value: "hsl" },
        { text: "HSV", value: "hsv" }
      ];
      return e.appendChild(t.reduce((l, b) => {
        const E = i.createElement("option");
        return E.textContent = b.text, E.value = b.value, l.appendChild(E), l;
      }, i.createDocumentFragment())), e;
    }
    class El {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(ri()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(ri("m")), this.modeElem_ = xl(e), this.modeElem_.classList.add(ri("ms")), l.appendChild(this.modeSelectElement), t.viewProps.bindDisabled(this.modeElem_);
        const b = e.createElement("div");
        b.classList.add(ri("mm")), b.appendChild(Et(e, "dropdown")), l.appendChild(b), this.element.appendChild(l);
        const E = e.createElement("div");
        E.classList.add(ri("w")), this.element.appendChild(E), this.textsElem_ = E, this.textViews_ = t.textViews, this.applyTextViews_(), N(t.colorMode, (M) => {
          this.modeElem_.value = M;
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
        pn(this.textsElem_);
        const e = this.element.ownerDocument;
        this.textViews_.forEach((t) => {
          const l = e.createElement("div");
          l.classList.add(ri("c")), l.appendChild(t.element), this.textsElem_.appendChild(l);
        });
      }
    }
    function Cl(i) {
      return De(i === "float" ? 2 : 0);
    }
    function Pl(i, e, t) {
      const l = T(i, e)[t];
      return new qt({
        min: 0,
        max: l
      });
    }
    function Ur(i, e, t) {
      return new En(i, {
        arrayPosition: t === 0 ? "fst" : t === 3 - 1 ? "lst" : "mid",
        baseStep: Mn(false),
        parser: e.parser,
        props: X.fromObject({
          draggingScale: e.colorType === "float" ? 0.01 : 1,
          formatter: Cl(e.colorType)
        }),
        value: ee(0, {
          constraint: Pl(e.colorMode, e.colorType, t)
        }),
        viewProps: e.viewProps
      });
    }
    class Tl {
      constructor(e, t) {
        this.onModeSelectChange_ = this.onModeSelectChange_.bind(this), this.colorType_ = t.colorType, this.parser_ = t.parser, this.value = t.value, this.viewProps = t.viewProps, this.colorMode = ee(this.value.rawValue.mode), this.ccs_ = this.createComponentControllers_(e), this.view = new El(e, {
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
          Ur(e, t, 0),
          Ur(e, t, 1),
          Ur(e, t, 2)
        ];
        return l.forEach((b, E) => {
          Zt({
            primary: this.value,
            secondary: b.value,
            forward: (M) => M.rawValue.getComponents(this.colorMode.rawValue, this.colorType_)[E],
            backward: (M, B) => {
              const Q = this.colorMode.rawValue, J = M.rawValue.getComponents(Q, this.colorType_);
              return J[E] = B.rawValue, new te(f(u(J), J[3]), Q, this.colorType_);
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
    const Gr = D2("hpl");
    class kl {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.value = t.value, this.value.emitter.on("change", this.onValueChange_), this.element = e.createElement("div"), this.element.classList.add(Gr()), t.viewProps.bindClassModifiers(this.element), t.viewProps.bindTabIndex(this.element);
        const l = e.createElement("div");
        l.classList.add(Gr("c")), this.element.appendChild(l);
        const b = e.createElement("div");
        b.classList.add(Gr("m")), this.element.appendChild(b), this.markerElem_ = b, this.update_();
      }
      update_() {
        const e = this.value.rawValue, [t] = e.getComponents("hsv");
        this.markerElem_.style.backgroundColor = Ho(new te([t, 100, 100], "hsv"));
        const l = we(t, 0, 360, 0, 100);
        this.markerElem_.style.left = `${l}%`;
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
        }), this.ptHandler_ = new Ot(this.view.element), this.ptHandler_.emitter.on("down", this.onPointerDown_), this.ptHandler_.emitter.on("move", this.onPointerMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.element.addEventListener("keydown", this.onKeyDown_), this.view.element.addEventListener("keyup", this.onKeyUp_);
      }
      handlePointerEvent_(e, t) {
        if (!e.point)
          return;
        const l = we(Re(e.point.x, 0, e.bounds.width), 0, e.bounds.width, 0, 360), b = this.value.rawValue, [, E, M, B] = b.getComponents("hsv");
        this.value.setRawValue(new te([l, E, M, B], "hsv"), t);
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
        const t = ze(Mn(false), ut(e));
        if (t === 0)
          return;
        const l = this.value.rawValue, [b, E, M, B] = l.getComponents("hsv");
        this.value.setRawValue(new te([b + t, E, M, B], "hsv"), {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(e) {
        ze(Mn(false), ut(e)) !== 0 && this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    const Hr = D2("svp"), Xo = 64;
    class Sl {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.value = t.value, this.value.emitter.on("change", this.onValueChange_), this.element = e.createElement("div"), this.element.classList.add(Hr()), t.viewProps.bindClassModifiers(this.element), t.viewProps.bindTabIndex(this.element);
        const l = e.createElement("canvas");
        l.height = Xo, l.width = Xo, l.classList.add(Hr("c")), this.element.appendChild(l), this.canvasElement = l;
        const b = e.createElement("div");
        b.classList.add(Hr("m")), this.element.appendChild(b), this.markerElem_ = b, this.update_();
      }
      update_() {
        const e = Hn(this.canvasElement);
        if (!e)
          return;
        const l = this.value.rawValue.getComponents("hsv"), b = this.canvasElement.width, E = this.canvasElement.height, M = e.getImageData(0, 0, b, E), B = M.data;
        for (let de = 0; de < E; de++)
          for (let ve = 0; ve < b; ve++) {
            const Ln = we(ve, 0, b, 0, 100), Hi = we(de, 0, E, 100, 0), Ki = Rs(l[0], Ln, Hi), Is = (de * b + ve) * 4;
            B[Is] = Ki[0], B[Is + 1] = Ki[1], B[Is + 2] = Ki[2], B[Is + 3] = 255;
          }
        e.putImageData(M, 0, 0);
        const Q = we(l[1], 0, 100, 0, 100);
        this.markerElem_.style.left = `${Q}%`;
        const J = we(l[2], 0, 100, 100, 0);
        this.markerElem_.style.top = `${J}%`;
      }
      onValueChange_() {
        this.update_();
      }
    }
    class Ll {
      constructor(e, t) {
        this.onKeyDown_ = this.onKeyDown_.bind(this), this.onKeyUp_ = this.onKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.view = new Sl(e, {
          value: this.value,
          viewProps: this.viewProps
        }), this.ptHandler_ = new Ot(this.view.element), this.ptHandler_.emitter.on("down", this.onPointerDown_), this.ptHandler_.emitter.on("move", this.onPointerMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.element.addEventListener("keydown", this.onKeyDown_), this.view.element.addEventListener("keyup", this.onKeyUp_);
      }
      handlePointerEvent_(e, t) {
        if (!e.point)
          return;
        const l = we(e.point.x, 0, e.bounds.width, 0, 100), b = we(e.point.y, 0, e.bounds.height, 100, 0), [E, , , M] = this.value.rawValue.getComponents("hsv");
        this.value.setRawValue(new te([E, l, b, M], "hsv"), t);
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
        ti(e.key) && e.preventDefault();
        const [t, l, b, E] = this.value.rawValue.getComponents("hsv"), M = Mn(false), B = ze(M, ut(e)), Q = ze(M, xn(e));
        B === 0 && Q === 0 || this.value.setRawValue(new te([t, l + B, b + Q, E], "hsv"), {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(e) {
        const t = Mn(false), l = ze(t, ut(e)), b = ze(t, xn(e));
        l === 0 && b === 0 || this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    class Al {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.hPaletteC_ = new Ml(e, {
          value: this.value,
          viewProps: this.viewProps
        }), this.svPaletteC_ = new Ll(e, {
          value: this.value,
          viewProps: this.viewProps
        }), this.alphaIcs_ = t.supportsAlpha ? {
          palette: new yl(e, {
            value: this.value,
            viewProps: this.viewProps
          }),
          text: new En(e, {
            parser: ct,
            baseStep: 0.1,
            props: X.fromObject({
              draggingScale: 0.01,
              formatter: De(2)
            }),
            value: ee(0, {
              constraint: new qt({ min: 0, max: 1 })
            }),
            viewProps: this.viewProps
          })
        } : null, this.alphaIcs_ && Zt({
          primary: this.value,
          secondary: this.alphaIcs_.text.value,
          forward: (l) => l.rawValue.getComponents()[3],
          backward: (l, b) => {
            const E = l.rawValue.getComponents();
            return E[3] = b.rawValue, new te(E, l.rawValue.mode);
          }
        }), this.textC_ = new Tl(e, {
          colorType: t.colorType,
          parser: ct,
          value: this.value,
          viewProps: this.viewProps
        }), this.view = new Or(e, {
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
    const Kr = D2("colsw");
    class Rl {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), t.value.emitter.on("change", this.onValueChange_), this.value = t.value, this.element = e.createElement("div"), this.element.classList.add(Kr()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(Kr("sw")), this.element.appendChild(l), this.swatchElem_ = l;
        const b = e.createElement("button");
        b.classList.add(Kr("b")), t.viewProps.bindDisabled(b), this.element.appendChild(b), this.buttonElement = b, this.update_();
      }
      update_() {
        const e = this.value.rawValue;
        this.swatchElem_.style.backgroundColor = zr(e);
      }
      onValueChange_() {
        this.update_();
      }
    }
    class Vl {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.view = new Rl(e, {
          value: this.value,
          viewProps: this.viewProps
        });
      }
    }
    class $r {
      constructor(e, t) {
        this.onButtonBlur_ = this.onButtonBlur_.bind(this), this.onButtonClick_ = this.onButtonClick_.bind(this), this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this), this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.foldable_ = Be.create(t.expanded), this.swatchC_ = new Vl(e, {
          value: this.value,
          viewProps: this.viewProps
        });
        const l = this.swatchC_.view.buttonElement;
        l.addEventListener("blur", this.onButtonBlur_), l.addEventListener("click", this.onButtonClick_), this.textC_ = new Jn(e, {
          parser: t.parser,
          props: X.fromObject({
            formatter: t.formatter
          }),
          value: this.value,
          viewProps: this.viewProps
        }), this.view = new ji(e, {
          foldable: this.foldable_,
          pickerLayout: t.pickerLayout
        }), this.view.swatchElement.appendChild(this.swatchC_.view.element), this.view.textElement.appendChild(this.textC_.view.element), this.popC_ = t.pickerLayout === "popup" ? new vs(e, {
          viewProps: this.viewProps
        }) : null;
        const b = new Al(e, {
          colorType: t.colorType,
          supportsAlpha: t.supportsAlpha,
          value: this.value,
          viewProps: this.viewProps
        });
        b.view.allFocusableElements.forEach((E) => {
          E.addEventListener("blur", this.onPopupChildBlur_), E.addEventListener("keydown", this.onPopupChildKeydown_);
        }), this.pickerC_ = b, this.popC_ ? (this.view.element.appendChild(this.popC_.view.element), this.popC_.view.element.appendChild(b.view.element), Zt({
          primary: this.foldable_.value("expanded"),
          secondary: this.popC_.shows,
          forward: (E) => E.rawValue,
          backward: (E, M) => M.rawValue
        })) : this.view.pickerElement && (this.view.pickerElement.appendChild(this.pickerC_.view.element), $e(this.foldable_, this.view.pickerElement));
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
        const t = this.popC_.view.element, l = Ct(e);
        l && t.contains(l) || l && l === this.swatchC_.view.buttonElement && !bt(t.ownerDocument) || (this.popC_.shows.rawValue = false);
      }
      onPopupChildKeydown_(e) {
        this.popC_ ? e.key === "Escape" && (this.popC_.shows.rawValue = false) : this.view.pickerElement && e.key === "Escape" && this.swatchC_.view.buttonElement.focus();
      }
    }
    function Il(i, e) {
      return te.isColorObject(i) ? te.fromObject(i, e) : te.black(e);
    }
    function Dl(i) {
      return u(i.getComponents("rgb")).reduce((e, t) => e << 8 | Math.floor(t) & 255, 0);
    }
    function Ol(i) {
      return i.getComponents("rgb").reduce((e, t, l) => {
        const b = Math.floor(l === 3 ? t * 255 : t) & 255;
        return e << 8 | b;
      }, 0) >>> 0;
    }
    function Fl(i) {
      return new te([i >> 16 & 255, i >> 8 & 255, i & 255], "rgb");
    }
    function Nl(i) {
      return new te([
        i >> 24 & 255,
        i >> 16 & 255,
        i >> 8 & 255,
        we(i & 255, 0, 255, 0, 1)
      ], "rgb");
    }
    function Bl(i) {
      return typeof i != "number" ? te.black() : Fl(i);
    }
    function zl(i) {
      return typeof i != "number" ? te.black() : Nl(i);
    }
    function jl(i) {
      const e = jr(i);
      return e ? (t, l) => {
        it(t, e(l));
      } : null;
    }
    function Ul(i) {
      const e = i ? Ol : Dl;
      return (t, l) => {
        it(t, e(l));
      };
    }
    function Gl(i, e, t) {
      const l = e.toRgbaObject(t);
      i.writeProperty("r", l.r), i.writeProperty("g", l.g), i.writeProperty("b", l.b), i.writeProperty("a", l.a);
    }
    function Hl(i, e, t) {
      const l = e.toRgbaObject(t);
      i.writeProperty("r", l.r), i.writeProperty("g", l.g), i.writeProperty("b", l.b);
    }
    function Kl(i, e) {
      return (t, l) => {
        i ? Gl(t, l, e) : Hl(t, l, e);
      };
    }
    function Xr(i) {
      var e;
      return !!(i != null && i.alpha || !((e = i == null ? void 0 : i.color) === null || e === void 0) && e.alpha);
    }
    function $l(i) {
      return i ? (e) => zr(e, "0x") : (e) => Go(e, "0x");
    }
    function Xl(i) {
      return "color" in i || "view" in i && i.view === "color";
    }
    const Yl = {
      id: "input-color-number",
      type: "input",
      accept: (i, e) => {
        if (typeof i != "number" || !Xl(e))
          return null;
        const t = Fr(e);
        return t ? {
          initialValue: i,
          params: t
        } : null;
      },
      binding: {
        reader: (i) => Xr(i.params) ? zl : Bl,
        equals: te.equals,
        writer: (i) => Ul(Xr(i.params))
      },
      controller: (i) => {
        const e = Xr(i.params), t = "expanded" in i.params ? i.params.expanded : void 0, l = "picker" in i.params ? i.params.picker : void 0;
        return new $r(i.document, {
          colorType: "int",
          expanded: t ?? false,
          formatter: $l(e),
          parser: Br("int"),
          pickerLayout: l ?? "popup",
          supportsAlpha: e,
          value: i.value,
          viewProps: i.viewProps
        });
      }
    };
    function ql(i) {
      return te.isRgbaColorObject(i);
    }
    function Ql(i) {
      return (e) => Il(e, i);
    }
    function Zl(i, e) {
      return (t) => i ? $o(t, e) : Ko(t, e);
    }
    const Wl = {
      id: "input-color-object",
      type: "input",
      accept: (i, e) => {
        if (!te.isColorObject(i))
          return null;
        const t = Fr(e);
        return t ? {
          initialValue: i,
          params: t
        } : null;
      },
      binding: {
        reader: (i) => Ql(Sn(i.params)),
        equals: te.equals,
        writer: (i) => Kl(ql(i.initialValue), Sn(i.params))
      },
      controller: (i) => {
        var e;
        const t = te.isRgbaColorObject(i.initialValue), l = "expanded" in i.params ? i.params.expanded : void 0, b = "picker" in i.params ? i.params.picker : void 0, E = (e = Sn(i.params)) !== null && e !== void 0 ? e : "int";
        return new $r(i.document, {
          colorType: E,
          expanded: l ?? false,
          formatter: Zl(t, E),
          parser: Br(E),
          pickerLayout: b ?? "popup",
          supportsAlpha: t,
          value: i.value,
          viewProps: i.viewProps
        });
      }
    }, Jl = {
      id: "input-color-string",
      type: "input",
      accept: (i, e) => {
        if (typeof i != "string" || "view" in e && e.view === "text")
          return null;
        const t = Nr(i, Sn(e));
        if (!t || !jr(t))
          return null;
        const b = Fr(e);
        return b ? {
          initialValue: i,
          params: b
        } : null;
      },
      binding: {
        reader: (i) => {
          var e;
          return hl((e = Sn(i.params)) !== null && e !== void 0 ? e : "int");
        },
        equals: te.equals,
        writer: (i) => {
          const e = Nr(i.initialValue, Sn(i.params));
          if (!e)
            throw k.shouldNeverHappen();
          const t = jl(e);
          if (!t)
            throw k.notBindable();
          return t;
        }
      },
      controller: (i) => {
        const e = Nr(i.initialValue, Sn(i.params));
        if (!e)
          throw k.shouldNeverHappen();
        const t = jr(e);
        if (!t)
          throw k.shouldNeverHappen();
        const l = "expanded" in i.params ? i.params.expanded : void 0, b = "picker" in i.params ? i.params.picker : void 0;
        return new $r(i.document, {
          colorType: e.type,
          expanded: l ?? false,
          formatter: t,
          parser: Br(e.type),
          pickerLayout: b ?? "popup",
          supportsAlpha: e.alpha,
          value: i.value,
          viewProps: i.viewProps
        });
      }
    };
    class Jt {
      constructor(e) {
        this.components = e.components, this.asm_ = e.assembly;
      }
      constrain(e) {
        const t = this.asm_.toComponents(e).map((l, b) => {
          var E, M;
          return (M = (E = this.components[b]) === null || E === void 0 ? void 0 : E.constrain(l)) !== null && M !== void 0 ? M : l;
        });
        return this.asm_.fromComponents(t);
      }
    }
    const Yo = D2("pndtxt");
    class ec {
      constructor(e, t) {
        this.textViews = t.textViews, this.element = e.createElement("div"), this.element.classList.add(Yo()), this.textViews.forEach((l) => {
          const b = e.createElement("div");
          b.classList.add(Yo("a")), b.appendChild(l.element), this.element.appendChild(b);
        });
      }
    }
    function tc(i, e, t) {
      return new En(i, {
        arrayPosition: t === 0 ? "fst" : t === e.axes.length - 1 ? "lst" : "mid",
        baseStep: e.axes[t].baseStep,
        parser: e.parser,
        props: e.axes[t].textProps,
        value: ee(0, {
          constraint: e.axes[t].constraint
        }),
        viewProps: e.viewProps
      });
    }
    class Yr {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.acs_ = t.axes.map((l, b) => tc(e, t, b)), this.acs_.forEach((l, b) => {
          Zt({
            primary: this.value,
            secondary: l.value,
            forward: (E) => t.assembly.toComponents(E.rawValue)[b],
            backward: (E, M) => {
              const B = t.assembly.toComponents(E.rawValue);
              return B[b] = M.rawValue, t.assembly.fromComponents(B);
            }
          });
        }), this.view = new ec(e, {
          textViews: this.acs_.map((l) => l.view)
        });
      }
    }
    function qo(i, e) {
      return "step" in i && !_2(i.step) ? new Wn(i.step, e) : null;
    }
    function Qo(i) {
      return !_2(i.max) && !_2(i.min) ? new qt({
        max: i.max,
        min: i.min
      }) : !_2(i.max) || !_2(i.min) ? new Ti({
        max: i.max,
        min: i.min
      }) : null;
    }
    function nc(i) {
      const e = nt(i, qt);
      if (e)
        return [e.values.get("min"), e.values.get("max")];
      const t = nt(i, Ti);
      return t ? [t.minValue, t.maxValue] : [void 0, void 0];
    }
    function ic(i, e) {
      const t = [], l = qo(i, e);
      l && t.push(l);
      const b = Qo(i);
      b && t.push(b);
      const E = zi(i.options);
      return E && t.push(E), new bn(t);
    }
    const sc = {
      id: "input-number",
      type: "input",
      accept: (i, e) => {
        if (typeof i != "number")
          return null;
        const t = S, l = le(e, {
          format: t.optional.function,
          max: t.optional.number,
          min: t.optional.number,
          options: t.optional.custom(Pn),
          step: t.optional.number
        });
        return l ? {
          initialValue: i,
          params: l
        } : null;
      },
      binding: {
        reader: (i) => _t,
        constraint: (i) => ic(i.params, i.initialValue),
        writer: (i) => it
      },
      controller: (i) => {
        var e;
        const t = i.value, l = i.constraint, b = l && nt(l, gn);
        if (b)
          return new _n(i.document, {
            props: new X({
              options: b.values.value("options")
            }),
            value: t,
            viewProps: i.viewProps
          });
        const E = (e = "format" in i.params ? i.params.format : void 0) !== null && e !== void 0 ? e : De(ii(l, t.rawValue)), M = l && nt(l, qt);
        return M ? new ni(i.document, {
          baseStep: Ft(l),
          parser: ct,
          sliderProps: new X({
            maxValue: M.values.value("max"),
            minValue: M.values.value("min")
          }),
          textProps: X.fromObject({
            draggingScale: Nt(l, t.rawValue),
            formatter: E
          }),
          value: t,
          viewProps: i.viewProps
        }) : new En(i.document, {
          baseStep: Ft(l),
          parser: ct,
          props: X.fromObject({
            draggingScale: Nt(l, t.rawValue),
            formatter: E
          }),
          value: t,
          viewProps: i.viewProps
        });
      }
    };
    class en {
      constructor(e = 0, t = 0) {
        this.x = e, this.y = t;
      }
      getComponents() {
        return [this.x, this.y];
      }
      static isObject(e) {
        if (_2(e))
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
    const Zo = {
      toComponents: (i) => i.getComponents(),
      fromComponents: (i) => new en(...i)
    }, oi = D2("p2d");
    class rc {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(oi()), t.viewProps.bindClassModifiers(this.element), N(t.expanded, K(this.element, oi(void 0, "expanded")));
        const l = e.createElement("div");
        l.classList.add(oi("h")), this.element.appendChild(l);
        const b = e.createElement("button");
        b.classList.add(oi("b")), b.appendChild(Et(e, "p2dpad")), t.viewProps.bindDisabled(b), l.appendChild(b), this.buttonElement = b;
        const E = e.createElement("div");
        if (E.classList.add(oi("t")), l.appendChild(E), this.textElement = E, t.pickerLayout === "inline") {
          const M = e.createElement("div");
          M.classList.add(oi("p")), this.element.appendChild(M), this.pickerElement = M;
        } else
          this.pickerElement = null;
      }
    }
    const tn = D2("p2dp");
    class oc {
      constructor(e, t) {
        this.onFoldableChange_ = this.onFoldableChange_.bind(this), this.onValueChange_ = this.onValueChange_.bind(this), this.invertsY_ = t.invertsY, this.maxValue_ = t.maxValue, this.element = e.createElement("div"), this.element.classList.add(tn()), t.layout === "popup" && this.element.classList.add(tn(void 0, "p")), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(tn("p")), t.viewProps.bindTabIndex(l), this.element.appendChild(l), this.padElement = l;
        const b = e.createElementNS(Ke, "svg");
        b.classList.add(tn("g")), this.padElement.appendChild(b), this.svgElem_ = b;
        const E = e.createElementNS(Ke, "line");
        E.classList.add(tn("ax")), E.setAttributeNS(null, "x1", "0"), E.setAttributeNS(null, "y1", "50%"), E.setAttributeNS(null, "x2", "100%"), E.setAttributeNS(null, "y2", "50%"), this.svgElem_.appendChild(E);
        const M = e.createElementNS(Ke, "line");
        M.classList.add(tn("ax")), M.setAttributeNS(null, "x1", "50%"), M.setAttributeNS(null, "y1", "0"), M.setAttributeNS(null, "x2", "50%"), M.setAttributeNS(null, "y2", "100%"), this.svgElem_.appendChild(M);
        const B = e.createElementNS(Ke, "line");
        B.classList.add(tn("l")), B.setAttributeNS(null, "x1", "50%"), B.setAttributeNS(null, "y1", "50%"), this.svgElem_.appendChild(B), this.lineElem_ = B;
        const Q = e.createElement("div");
        Q.classList.add(tn("m")), this.padElement.appendChild(Q), this.markerElem_ = Q, t.value.emitter.on("change", this.onValueChange_), this.value = t.value, this.update_();
      }
      get allFocusableElements() {
        return [this.padElement];
      }
      update_() {
        const [e, t] = this.value.rawValue.getComponents(), l = this.maxValue_, b = we(e, -l, +l, 0, 100), E = we(t, -l, +l, 0, 100), M = this.invertsY_ ? 100 - E : E;
        this.lineElem_.setAttributeNS(null, "x2", `${b}%`), this.lineElem_.setAttributeNS(null, "y2", `${M}%`), this.markerElem_.style.left = `${b}%`, this.markerElem_.style.top = `${M}%`;
      }
      onValueChange_() {
        this.update_();
      }
      onFoldableChange_() {
        this.update_();
      }
    }
    function Wo(i, e, t) {
      return [
        ze(e[0], ut(i)),
        ze(e[1], xn(i)) * (t ? 1 : -1)
      ];
    }
    class ac {
      constructor(e, t) {
        this.onPadKeyDown_ = this.onPadKeyDown_.bind(this), this.onPadKeyUp_ = this.onPadKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.baseSteps_ = t.baseSteps, this.maxValue_ = t.maxValue, this.invertsY_ = t.invertsY, this.view = new oc(e, {
          invertsY: this.invertsY_,
          layout: t.layout,
          maxValue: this.maxValue_,
          value: this.value,
          viewProps: this.viewProps
        }), this.ptHandler_ = new Ot(this.view.padElement), this.ptHandler_.emitter.on("down", this.onPointerDown_), this.ptHandler_.emitter.on("move", this.onPointerMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.padElement.addEventListener("keydown", this.onPadKeyDown_), this.view.padElement.addEventListener("keyup", this.onPadKeyUp_);
      }
      handlePointerEvent_(e, t) {
        if (!e.point)
          return;
        const l = this.maxValue_, b = we(e.point.x, 0, e.bounds.width, -l, +l), E = we(this.invertsY_ ? e.bounds.height - e.point.y : e.point.y, 0, e.bounds.height, -l, +l);
        this.value.setRawValue(new en(b, E), t);
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
        ti(e.key) && e.preventDefault();
        const [t, l] = Wo(e, this.baseSteps_, this.invertsY_);
        t === 0 && l === 0 || this.value.setRawValue(new en(this.value.rawValue.x + t, this.value.rawValue.y + l), {
          forceEmit: false,
          last: false
        });
      }
      onPadKeyUp_(e) {
        const [t, l] = Wo(e, this.baseSteps_, this.invertsY_);
        t === 0 && l === 0 || this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    class lc {
      constructor(e, t) {
        var l, b;
        this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this), this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this), this.onPadButtonBlur_ = this.onPadButtonBlur_.bind(this), this.onPadButtonClick_ = this.onPadButtonClick_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.foldable_ = Be.create(t.expanded), this.popC_ = t.pickerLayout === "popup" ? new vs(e, {
          viewProps: this.viewProps
        }) : null;
        const E = new ac(e, {
          baseSteps: [t.axes[0].baseStep, t.axes[1].baseStep],
          invertsY: t.invertsY,
          layout: t.pickerLayout,
          maxValue: t.maxValue,
          value: this.value,
          viewProps: this.viewProps
        });
        E.view.allFocusableElements.forEach((M) => {
          M.addEventListener("blur", this.onPopupChildBlur_), M.addEventListener("keydown", this.onPopupChildKeydown_);
        }), this.pickerC_ = E, this.textC_ = new Yr(e, {
          assembly: Zo,
          axes: t.axes,
          parser: t.parser,
          value: this.value,
          viewProps: this.viewProps
        }), this.view = new rc(e, {
          expanded: this.foldable_.value("expanded"),
          pickerLayout: t.pickerLayout,
          viewProps: this.viewProps
        }), this.view.textElement.appendChild(this.textC_.view.element), (l = this.view.buttonElement) === null || l === void 0 || l.addEventListener("blur", this.onPadButtonBlur_), (b = this.view.buttonElement) === null || b === void 0 || b.addEventListener("click", this.onPadButtonClick_), this.popC_ ? (this.view.element.appendChild(this.popC_.view.element), this.popC_.view.element.appendChild(this.pickerC_.view.element), Zt({
          primary: this.foldable_.value("expanded"),
          secondary: this.popC_.shows,
          forward: (M) => M.rawValue,
          backward: (M, B) => B.rawValue
        })) : this.view.pickerElement && (this.view.pickerElement.appendChild(this.pickerC_.view.element), $e(this.foldable_, this.view.pickerElement));
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
        const t = this.popC_.view.element, l = Ct(e);
        l && t.contains(l) || l && l === this.view.buttonElement && !bt(t.ownerDocument) || (this.popC_.shows.rawValue = false);
      }
      onPopupChildKeydown_(e) {
        this.popC_ ? e.key === "Escape" && (this.popC_.shows.rawValue = false) : this.view.pickerElement && e.key === "Escape" && this.view.buttonElement.focus();
      }
    }
    class ai {
      constructor(e = 0, t = 0, l = 0) {
        this.x = e, this.y = t, this.z = l;
      }
      getComponents() {
        return [this.x, this.y, this.z];
      }
      static isObject(e) {
        if (_2(e))
          return false;
        const t = e.x, l = e.y, b = e.z;
        return !(typeof t != "number" || typeof l != "number" || typeof b != "number");
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
    const Jo = {
      toComponents: (i) => i.getComponents(),
      fromComponents: (i) => new ai(...i)
    };
    function cc(i) {
      return ai.isObject(i) ? new ai(i.x, i.y, i.z) : new ai();
    }
    function uc(i, e) {
      i.writeProperty("x", e.x), i.writeProperty("y", e.y), i.writeProperty("z", e.z);
    }
    function pc(i, e) {
      return new Jt({
        assembly: Jo,
        components: [
          zt("x" in i ? i.x : void 0, e.x),
          zt("y" in i ? i.y : void 0, e.y),
          zt("z" in i ? i.z : void 0, e.z)
        ]
      });
    }
    function qr(i, e) {
      return {
        baseStep: Ft(e),
        constraint: e,
        textProps: X.fromObject({
          draggingScale: Nt(e, i),
          formatter: De(ii(e, i))
        })
      };
    }
    const hc = {
      id: "input-point3d",
      type: "input",
      accept: (i, e) => {
        if (!ai.isObject(i))
          return null;
        const t = S, l = le(e, {
          x: t.optional.custom(wt),
          y: t.optional.custom(wt),
          z: t.optional.custom(wt)
        });
        return l ? {
          initialValue: i,
          params: l
        } : null;
      },
      binding: {
        reader: (i) => cc,
        constraint: (i) => pc(i.params, i.initialValue),
        equals: ai.equals,
        writer: (i) => uc
      },
      controller: (i) => {
        const e = i.value, t = i.constraint;
        if (!(t instanceof Jt))
          throw k.shouldNeverHappen();
        return new Yr(i.document, {
          assembly: Jo,
          axes: [
            qr(e.rawValue.x, t.components[0]),
            qr(e.rawValue.y, t.components[1]),
            qr(e.rawValue.z, t.components[2])
          ],
          parser: ct,
          value: e,
          viewProps: i.viewProps
        });
      }
    };
    class li {
      constructor(e = 0, t = 0, l = 0, b = 0) {
        this.x = e, this.y = t, this.z = l, this.w = b;
      }
      getComponents() {
        return [this.x, this.y, this.z, this.w];
      }
      static isObject(e) {
        if (_2(e))
          return false;
        const t = e.x, l = e.y, b = e.z, E = e.w;
        return !(typeof t != "number" || typeof l != "number" || typeof b != "number" || typeof E != "number");
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
    const ea = {
      toComponents: (i) => i.getComponents(),
      fromComponents: (i) => new li(...i)
    };
    function dc(i) {
      return li.isObject(i) ? new li(i.x, i.y, i.z, i.w) : new li();
    }
    function mc(i, e) {
      i.writeProperty("x", e.x), i.writeProperty("y", e.y), i.writeProperty("z", e.z), i.writeProperty("w", e.w);
    }
    function fc(i, e) {
      return new Jt({
        assembly: ea,
        components: [
          zt("x" in i ? i.x : void 0, e.x),
          zt("y" in i ? i.y : void 0, e.y),
          zt("z" in i ? i.z : void 0, e.z),
          zt("w" in i ? i.w : void 0, e.w)
        ]
      });
    }
    function vc(i, e) {
      return {
        baseStep: Ft(e),
        constraint: e,
        textProps: X.fromObject({
          draggingScale: Nt(e, i),
          formatter: De(ii(e, i))
        })
      };
    }
    const bc = {
      id: "input-point4d",
      type: "input",
      accept: (i, e) => {
        if (!li.isObject(i))
          return null;
        const t = S, l = le(e, {
          x: t.optional.custom(wt),
          y: t.optional.custom(wt),
          z: t.optional.custom(wt),
          w: t.optional.custom(wt)
        });
        return l ? {
          initialValue: i,
          params: l
        } : null;
      },
      binding: {
        reader: (i) => dc,
        constraint: (i) => fc(i.params, i.initialValue),
        equals: li.equals,
        writer: (i) => mc
      },
      controller: (i) => {
        const e = i.value, t = i.constraint;
        if (!(t instanceof Jt))
          throw k.shouldNeverHappen();
        return new Yr(i.document, {
          assembly: ea,
          axes: e.rawValue.getComponents().map((l, b) => vc(l, t.components[b])),
          parser: ct,
          value: e,
          viewProps: i.viewProps
        });
      }
    };
    function gc(i) {
      const e = [], t = zi(i.options);
      return t && e.push(t), new bn(e);
    }
    const _c = {
      id: "input-string",
      type: "input",
      accept: (i, e) => {
        if (typeof i != "string")
          return null;
        const l = le(e, {
          options: S.optional.custom(Pn)
        });
        return l ? {
          initialValue: i,
          params: l
        } : null;
      },
      binding: {
        reader: (i) => Ri,
        constraint: (i) => gc(i.params),
        writer: (i) => it
      },
      controller: (i) => {
        const e = i.document, t = i.value, l = i.constraint, b = l && nt(l, gn);
        return b ? new _n(e, {
          props: new X({
            options: b.values.value("options")
          }),
          value: t,
          viewProps: i.viewProps
        }) : new Jn(e, {
          parser: (E) => E,
          props: X.fromObject({
            formatter: Tt
          }),
          value: t,
          viewProps: i.viewProps
        });
      }
    }, Gi = {
      monitor: {
        defaultInterval: 200,
        defaultLineCount: 3
      }
    }, ta = D2("mll");
    class wc {
      constructor(e, t) {
        this.onValueUpdate_ = this.onValueUpdate_.bind(this), this.formatter_ = t.formatter, this.element = e.createElement("div"), this.element.classList.add(ta()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("textarea");
        l.classList.add(ta("i")), l.style.height = `calc(var(--bld-us) * ${t.lineCount})`, l.readOnly = true, t.viewProps.bindDisabled(l), this.element.appendChild(l), this.textareaElem_ = l, t.value.emitter.on("change", this.onValueUpdate_), this.value = t.value, this.update_();
      }
      update_() {
        const e = this.textareaElem_, t = e.scrollTop === e.scrollHeight - e.clientHeight, l = [];
        this.value.rawValue.forEach((b) => {
          b !== void 0 && l.push(this.formatter_(b));
        }), e.textContent = l.join(`
`), t && (e.scrollTop = e.scrollHeight);
      }
      onValueUpdate_() {
        this.update_();
      }
    }
    class Qr {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.view = new wc(e, {
          formatter: t.formatter,
          lineCount: t.lineCount,
          value: this.value,
          viewProps: this.viewProps
        });
      }
    }
    const na = D2("sgl");
    class yc {
      constructor(e, t) {
        this.onValueUpdate_ = this.onValueUpdate_.bind(this), this.formatter_ = t.formatter, this.element = e.createElement("div"), this.element.classList.add(na()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("input");
        l.classList.add(na("i")), l.readOnly = true, l.type = "text", t.viewProps.bindDisabled(l), this.element.appendChild(l), this.inputElement = l, t.value.emitter.on("change", this.onValueUpdate_), this.value = t.value, this.update_();
      }
      update_() {
        const e = this.value.rawValue, t = e[e.length - 1];
        this.inputElement.value = t !== void 0 ? this.formatter_(t) : "";
      }
      onValueUpdate_() {
        this.update_();
      }
    }
    class Zr {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.view = new yc(e, {
          formatter: t.formatter,
          value: this.value,
          viewProps: this.viewProps
        });
      }
    }
    const xc = {
      id: "monitor-bool",
      type: "monitor",
      accept: (i, e) => {
        if (typeof i != "boolean")
          return null;
        const l = le(e, {
          lineCount: S.optional.number
        });
        return l ? {
          initialValue: i,
          params: l
        } : null;
      },
      binding: {
        reader: (i) => gs
      },
      controller: (i) => {
        var e;
        return i.value.rawValue.length === 1 ? new Zr(i.document, {
          formatter: _s,
          value: i.value,
          viewProps: i.viewProps
        }) : new Qr(i.document, {
          formatter: _s,
          lineCount: (e = i.params.lineCount) !== null && e !== void 0 ? e : Gi.monitor.defaultLineCount,
          value: i.value,
          viewProps: i.viewProps
        });
      }
    }, nn = D2("grl");
    class Ec {
      constructor(e, t) {
        this.onCursorChange_ = this.onCursorChange_.bind(this), this.onValueUpdate_ = this.onValueUpdate_.bind(this), this.element = e.createElement("div"), this.element.classList.add(nn()), t.viewProps.bindClassModifiers(this.element), this.formatter_ = t.formatter, this.props_ = t.props, this.cursor_ = t.cursor, this.cursor_.emitter.on("change", this.onCursorChange_);
        const l = e.createElementNS(Ke, "svg");
        l.classList.add(nn("g")), l.style.height = `calc(var(--bld-us) * ${t.lineCount})`, this.element.appendChild(l), this.svgElem_ = l;
        const b = e.createElementNS(Ke, "polyline");
        this.svgElem_.appendChild(b), this.lineElem_ = b;
        const E = e.createElement("div");
        E.classList.add(nn("t"), D2("tt")()), this.element.appendChild(E), this.tooltipElem_ = E, t.value.emitter.on("change", this.onValueUpdate_), this.value = t.value, this.update_();
      }
      get graphElement() {
        return this.svgElem_;
      }
      update_() {
        const e = this.svgElem_.getBoundingClientRect(), t = this.value.rawValue.length - 1, l = this.props_.get("minValue"), b = this.props_.get("maxValue"), E = [];
        this.value.rawValue.forEach((de, ve) => {
          if (de === void 0)
            return;
          const Ln = we(ve, 0, t, 0, e.width), Hi = we(de, l, b, e.height, 0);
          E.push([Ln, Hi].join(","));
        }), this.lineElem_.setAttributeNS(null, "points", E.join(" "));
        const M = this.tooltipElem_, B = this.value.rawValue[this.cursor_.rawValue];
        if (B === void 0) {
          M.classList.remove(nn("t", "a"));
          return;
        }
        const Q = we(this.cursor_.rawValue, 0, t, 0, e.width), J = we(B, l, b, e.height, 0);
        M.style.left = `${Q}px`, M.style.top = `${J}px`, M.textContent = `${this.formatter_(B)}`, M.classList.contains(nn("t", "a")) || (M.classList.add(nn("t", "a"), nn("t", "in")), ot(M), M.classList.remove(nn("t", "in")));
      }
      onValueUpdate_() {
        this.update_();
      }
      onCursorChange_() {
        this.update_();
      }
    }
    class Cc {
      constructor(e, t) {
        if (this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this), this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this), this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this), this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this), this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this), this.props_ = t.props, this.value = t.value, this.viewProps = t.viewProps, this.cursor_ = ee(-1), this.view = new Ec(e, {
          cursor: this.cursor_,
          formatter: t.formatter,
          lineCount: t.lineCount,
          props: this.props_,
          value: this.value,
          viewProps: this.viewProps
        }), !bt(e))
          this.view.element.addEventListener("mousemove", this.onGraphMouseMove_), this.view.element.addEventListener("mouseleave", this.onGraphMouseLeave_);
        else {
          const l = new Ot(this.view.element);
          l.emitter.on("down", this.onGraphPointerDown_), l.emitter.on("move", this.onGraphPointerMove_), l.emitter.on("up", this.onGraphPointerUp_);
        }
      }
      onGraphMouseLeave_() {
        this.cursor_.rawValue = -1;
      }
      onGraphMouseMove_(e) {
        const t = this.view.element.getBoundingClientRect();
        this.cursor_.rawValue = Math.floor(we(e.offsetX, 0, t.width, 0, this.value.rawValue.length));
      }
      onGraphPointerDown_(e) {
        this.onGraphPointerMove_(e);
      }
      onGraphPointerMove_(e) {
        if (!e.data.point) {
          this.cursor_.rawValue = -1;
          return;
        }
        this.cursor_.rawValue = Math.floor(we(e.data.point.x, 0, e.data.bounds.width, 0, this.value.rawValue.length));
      }
      onGraphPointerUp_() {
        this.cursor_.rawValue = -1;
      }
    }
    function Wr(i) {
      return "format" in i && !_2(i.format) ? i.format : De(2);
    }
    function Pc(i) {
      var e;
      return i.value.rawValue.length === 1 ? new Zr(i.document, {
        formatter: Wr(i.params),
        value: i.value,
        viewProps: i.viewProps
      }) : new Qr(i.document, {
        formatter: Wr(i.params),
        lineCount: (e = i.params.lineCount) !== null && e !== void 0 ? e : Gi.monitor.defaultLineCount,
        value: i.value,
        viewProps: i.viewProps
      });
    }
    function Tc(i) {
      var e, t, l;
      return new Cc(i.document, {
        formatter: Wr(i.params),
        lineCount: (e = i.params.lineCount) !== null && e !== void 0 ? e : Gi.monitor.defaultLineCount,
        props: X.fromObject({
          maxValue: (t = "max" in i.params ? i.params.max : null) !== null && t !== void 0 ? t : 100,
          minValue: (l = "min" in i.params ? i.params.min : null) !== null && l !== void 0 ? l : 0
        }),
        value: i.value,
        viewProps: i.viewProps
      });
    }
    function ia(i) {
      return "view" in i && i.view === "graph";
    }
    const kc = {
      id: "monitor-number",
      type: "monitor",
      accept: (i, e) => {
        if (typeof i != "number")
          return null;
        const t = S, l = le(e, {
          format: t.optional.function,
          lineCount: t.optional.number,
          max: t.optional.number,
          min: t.optional.number,
          view: t.optional.string
        });
        return l ? {
          initialValue: i,
          params: l
        } : null;
      },
      binding: {
        defaultBufferSize: (i) => ia(i) ? 64 : 1,
        reader: (i) => _t
      },
      controller: (i) => ia(i.params) ? Tc(i) : Pc(i)
    }, Mc = {
      id: "monitor-string",
      type: "monitor",
      accept: (i, e) => {
        if (typeof i != "string")
          return null;
        const t = S, l = le(e, {
          lineCount: t.optional.number,
          multiline: t.optional.boolean
        });
        return l ? {
          initialValue: i,
          params: l
        } : null;
      },
      binding: {
        reader: (i) => Ri
      },
      controller: (i) => {
        var e;
        const t = i.value;
        return t.rawValue.length > 1 || "multiline" in i.params && i.params.multiline ? new Qr(i.document, {
          formatter: Tt,
          lineCount: (e = i.params.lineCount) !== null && e !== void 0 ? e : Gi.monitor.defaultLineCount,
          value: t,
          viewProps: i.viewProps
        }) : new Zr(i.document, {
          formatter: Tt,
          value: t,
          viewProps: i.viewProps
        });
      }
    };
    function Sc(i, e) {
      var t;
      const l = i.accept(e.target.read(), e.params);
      if (_2(l))
        return null;
      const b = S, E = {
        target: e.target,
        initialValue: l.initialValue,
        params: l.params
      }, M = i.binding.reader(E), B = i.binding.constraint ? i.binding.constraint(E) : void 0, Q = ee(M(l.initialValue), {
        constraint: B,
        equals: i.binding.equals
      }), J = new Zn({
        reader: M,
        target: e.target,
        value: Q,
        writer: i.binding.writer(E)
      }), de = b.optional.boolean(e.params.disabled).value, ve = b.optional.boolean(e.params.hidden).value, Ln = i.controller({
        constraint: B,
        document: e.document,
        initialValue: l.initialValue,
        params: l.params,
        value: J.value,
        viewProps: Qe.create({
          disabled: de,
          hidden: ve
        })
      });
      return new Ge(e.document, {
        binding: J,
        blade: xe(),
        props: X.fromObject({
          label: "label" in e.params ? (t = b.optional.string(e.params.label).value) !== null && t !== void 0 ? t : null : e.target.key
        }),
        valueController: Ln
      });
    }
    function Lc(i, e) {
      return e === 0 ? new hs() : new Pi(i, e ?? Gi.monitor.defaultInterval);
    }
    function Ac(i, e) {
      var t, l, b;
      const E = S, M = i.accept(e.target.read(), e.params);
      if (_2(M))
        return null;
      const B = {
        target: e.target,
        initialValue: M.initialValue,
        params: M.params
      }, Q = i.binding.reader(B), J = (l = (t = E.optional.number(e.params.bufferSize).value) !== null && t !== void 0 ? t : i.binding.defaultBufferSize && i.binding.defaultBufferSize(M.params)) !== null && l !== void 0 ? l : 1, de = E.optional.number(e.params.interval).value, ve = new dr({
        reader: Q,
        target: e.target,
        ticker: Lc(e.document, de),
        value: ds(J)
      }), Ln = E.optional.boolean(e.params.disabled).value, Hi = E.optional.boolean(e.params.hidden).value, Ki = i.controller({
        document: e.document,
        params: M.params,
        value: ve.value,
        viewProps: Qe.create({
          disabled: Ln,
          hidden: Hi
        })
      });
      return new at(e.document, {
        binding: ve,
        blade: xe(),
        props: X.fromObject({
          label: "label" in e.params ? (b = E.optional.string(e.params.label).value) !== null && b !== void 0 ? b : null : e.target.key
        }),
        valueController: Ki
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
        const b = t.read();
        if (_2(b))
          throw new k({
            context: {
              key: t.key
            },
            type: "nomatchingcontroller"
          });
        const E = this.pluginsMap_.inputs.reduce((M, B) => M ?? Sc(B, {
          document: e,
          target: t,
          params: l
        }), null);
        if (E)
          return E;
        throw new k({
          context: {
            key: t.key
          },
          type: "nomatchingcontroller"
        });
      }
      createMonitor(e, t, l) {
        const b = this.pluginsMap_.monitors.reduce((E, M) => E ?? Ac(M, {
          document: e,
          params: l,
          target: t
        }), null);
        if (b)
          return b;
        throw new k({
          context: {
            key: t.key
          },
          type: "nomatchingcontroller"
        });
      }
      createBlade(e, t) {
        const l = this.pluginsMap_.blades.reduce((b, E) => b ?? hr(E, {
          document: e,
          params: t
        }), null);
        if (!l)
          throw new k({
            type: "nomatchingview",
            context: {
              params: t
            }
          });
        return l;
      }
      createBladeApi(e) {
        if (e instanceof Ge)
          return new bi(e);
        if (e instanceof at)
          return new gi(e);
        if (e instanceof mn)
          return new Yn(e, this);
        const t = this.pluginsMap_.blades.reduce((l, b) => l ?? b.api({
          controller: e,
          pool: this
        }), null);
        if (!t)
          throw k.shouldNeverHappen();
        return t;
      }
    }
    function Vc() {
      const i = new Rc();
      return [
        Bc,
        hc,
        bc,
        _c,
        sc,
        Jl,
        Wl,
        Yl,
        si,
        xc,
        Mc,
        kc,
        W,
        ar,
        cr,
        Ci
      ].forEach((e) => {
        i.register(e);
      }), i;
    }
    function Ic(i) {
      return en.isObject(i) ? new en(i.x, i.y) : new en();
    }
    function Dc(i, e) {
      i.writeProperty("x", e.x), i.writeProperty("y", e.y);
    }
    function zt(i, e) {
      if (!i)
        return;
      const t = [], l = qo(i, e);
      l && t.push(l);
      const b = Qo(i);
      return b && t.push(b), new bn(t);
    }
    function Oc(i, e) {
      return new Jt({
        assembly: Zo,
        components: [
          zt("x" in i ? i.x : void 0, e.x),
          zt("y" in i ? i.y : void 0, e.y)
        ]
      });
    }
    function sa(i, e) {
      const [t, l] = i ? nc(i) : [];
      if (!_2(t) || !_2(l))
        return Math.max(Math.abs(t ?? 0), Math.abs(l ?? 0));
      const b = Ft(i);
      return Math.max(Math.abs(b) * 10, Math.abs(e) * 10);
    }
    function Fc(i, e) {
      const t = e instanceof Jt ? e.components[0] : void 0, l = e instanceof Jt ? e.components[1] : void 0, b = sa(t, i.x), E = sa(l, i.y);
      return Math.max(b, E);
    }
    function ra(i, e) {
      return {
        baseStep: Ft(e),
        constraint: e,
        textProps: X.fromObject({
          draggingScale: Nt(e, i),
          formatter: De(ii(e, i))
        })
      };
    }
    function Nc(i) {
      if (!("y" in i))
        return false;
      const e = i.y;
      return e && "inverted" in e ? !!e.inverted : false;
    }
    const Bc = {
      id: "input-point2d",
      type: "input",
      accept: (i, e) => {
        if (!en.isObject(i))
          return null;
        const t = S, l = le(e, {
          expanded: t.optional.boolean,
          picker: t.optional.custom(Bi),
          x: t.optional.custom(wt),
          y: t.optional.object({
            inverted: t.optional.boolean,
            max: t.optional.number,
            min: t.optional.number,
            step: t.optional.number
          })
        });
        return l ? {
          initialValue: i,
          params: l
        } : null;
      },
      binding: {
        reader: (i) => Ic,
        constraint: (i) => Oc(i.params, i.initialValue),
        equals: en.equals,
        writer: (i) => Dc
      },
      controller: (i) => {
        const e = i.document, t = i.value, l = i.constraint;
        if (!(l instanceof Jt))
          throw k.shouldNeverHappen();
        const b = "expanded" in i.params ? i.params.expanded : void 0, E = "picker" in i.params ? i.params.picker : void 0;
        return new lc(e, {
          axes: [
            ra(t.rawValue.x, l.components[0]),
            ra(t.rawValue.y, l.components[1])
          ],
          expanded: b ?? false,
          invertsY: Nc(i.params),
          maxValue: Fc(t.rawValue, l),
          parser: ct,
          pickerLayout: E ?? "popup",
          value: t,
          viewProps: i.viewProps
        });
      }
    };
    class oa extends o {
      constructor(e) {
        super(e), this.emitter_ = new F(), this.controller_.valueController.value.emitter.on("change", (t) => {
          this.emitter_.emit("change", {
            event: new p(this, t.rawValue)
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
        return this.emitter_.on(e, (b) => {
          l(b.event);
        }), this;
      }
    }
    class aa extends o {
      constructor(e) {
        super(e), this.emitter_ = new F(), this.controller_.valueController.value.emitter.on("change", (t) => {
          this.emitter_.emit("change", {
            event: new p(this, t.rawValue)
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
        return this.emitter_.on(e, (b) => {
          l(b.event);
        }), this;
      }
    }
    class la extends o {
      constructor(e) {
        super(e), this.emitter_ = new F(), this.controller_.valueController.value.emitter.on("change", (t) => {
          this.emitter_.emit("change", {
            event: new p(this, t.rawValue)
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
        return this.emitter_.on(e, (b) => {
          l(b.event);
        }), this;
      }
    }
    const zc = function() {
      return {
        id: "list",
        type: "blade",
        accept(i) {
          const e = S, t = le(i, {
            options: e.required.custom(Pn),
            value: e.required.raw,
            view: e.required.constant("list"),
            label: e.optional.string
          });
          return t ? { params: t } : null;
        },
        controller(i) {
          const e = new gn(Ss(i.params.options)), t = ee(i.params.value, {
            constraint: e
          }), l = new _n(i.document, {
            props: new X({
              options: e.values.value("options")
            }),
            value: t,
            viewProps: i.viewProps
          });
          return new Kt(i.document, {
            blade: i.blade,
            props: X.fromObject({
              label: i.params.label
            }),
            valueController: l
          });
        },
        api(i) {
          return !(i.controller instanceof Kt) || !(i.controller.valueController instanceof _n) ? null : new oa(i.controller);
        }
      };
    }();
    function jc(i) {
      return i.reduce((e, t) => Object.assign(e, {
        [t.presetKey]: t.read()
      }), {});
    }
    function Uc(i, e) {
      i.forEach((t) => {
        const l = e[t.target.presetKey];
        l !== void 0 && t.writer(t.target, t.reader(l));
      });
    }
    class Gc extends _i {
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
        const t = this.controller_.rackController.rack.find(Ge).map((l) => l.binding);
        Uc(t, e), this.refresh();
      }
      /**
       * Exports a preset of all inputs.
       * @return An exported preset object.
       */
      exportPreset() {
        const e = this.controller_.rackController.rack.find(Ge).map((t) => t.binding.target);
        return jc(e);
      }
      /**
       * Refreshes all bindings of the pane.
       */
      refresh() {
        this.controller_.rackController.rack.find(Ge).forEach((e) => {
          e.binding.read();
        }), this.controller_.rackController.rack.find(at).forEach((e) => {
          e.binding.read();
        });
      }
    }
    class Hc extends qn {
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
      accept(i) {
        const e = S, t = le(i, {
          max: e.required.number,
          min: e.required.number,
          view: e.required.constant("slider"),
          format: e.optional.function,
          label: e.optional.string,
          value: e.optional.number
        });
        return t ? { params: t } : null;
      },
      controller(i) {
        var e, t;
        const l = (e = i.params.value) !== null && e !== void 0 ? e : 0, b = new qt({
          max: i.params.max,
          min: i.params.min
        }), E = new ni(i.document, {
          baseStep: 1,
          parser: ct,
          sliderProps: new X({
            maxValue: b.values.value("max"),
            minValue: b.values.value("min")
          }),
          textProps: X.fromObject({
            draggingScale: Nt(void 0, l),
            formatter: (t = i.params.format) !== null && t !== void 0 ? t : Ar
          }),
          value: ee(l, {
            constraint: b
          }),
          viewProps: i.viewProps
        });
        return new Kt(i.document, {
          blade: i.blade,
          props: X.fromObject({
            label: i.params.label
          }),
          valueController: E
        });
      },
      api(i) {
        return !(i.controller instanceof Kt) || !(i.controller.valueController instanceof ni) ? null : new aa(i.controller);
      }
    }, $c = function() {
      return {
        id: "text",
        type: "blade",
        accept(i) {
          const e = S, t = le(i, {
            parse: e.required.function,
            value: e.required.raw,
            view: e.required.constant("text"),
            format: e.optional.function,
            label: e.optional.string
          });
          return t ? { params: t } : null;
        },
        controller(i) {
          var e;
          const t = new Jn(i.document, {
            parser: i.params.parse,
            props: X.fromObject({
              formatter: (e = i.params.format) !== null && e !== void 0 ? e : (l) => String(l)
            }),
            value: ee(i.params.value),
            viewProps: i.viewProps
          });
          return new Kt(i.document, {
            blade: i.blade,
            props: X.fromObject({
              label: i.params.label
            }),
            valueController: t
          });
        },
        api(i) {
          return !(i.controller instanceof Kt) || !(i.controller.valueController instanceof Jn) ? null : new la(i.controller);
        }
      };
    }();
    function Xc(i) {
      const e = i.createElement("div");
      return e.classList.add(D2("dfw")()), i.body && i.body.appendChild(e), e;
    }
    function ca(i, e, t) {
      if (i.querySelector(`style[data-tp-style=${e}]`))
        return;
      const l = i.createElement("style");
      l.dataset.tpStyle = e, l.textContent = t, i.head.appendChild(l);
    }
    class Yc extends Gc {
      constructor(e) {
        var t, l;
        const b = e ?? {}, E = (t = b.document) !== null && t !== void 0 ? t : fi(), M = Vc(), B = new Hc(E, {
          expanded: b.expanded,
          blade: xe(),
          props: X.fromObject({
            title: b.title
          }),
          viewProps: Qe.create()
        });
        super(B, M), this.pool_ = M, this.containerElem_ = (l = b.container) !== null && l !== void 0 ? l : Xc(E), this.containerElem_.appendChild(this.element), this.doc_ = E, this.usesDefaultWrapper_ = !b.container, this.setUpDefaultPlugins_();
      }
      get document() {
        if (!this.doc_)
          throw k.alreadyDisposed();
        return this.doc_;
      }
      dispose() {
        const e = this.containerElem_;
        if (!e)
          throw k.alreadyDisposed();
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
        e.css && ca(this.document, `plugin-${e.id}`, e.css);
      }
      setUpDefaultPlugins_() {
        ca(this.document, "default", '.tp-tbiv_b,.tp-coltxtv_ms,.tp-ckbv_i,.tp-rotv_b,.tp-fldv_b,.tp-mllv_i,.tp-sglv_i,.tp-grlv_g,.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw,.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-p2dv_b:hover,.tp-btnv_b:hover,.tp-lstv_s:hover{background-color:var(--btn-bg-h)}.tp-p2dv_b:focus,.tp-btnv_b:focus,.tp-lstv_s:focus{background-color:var(--btn-bg-f)}.tp-p2dv_b:active,.tp-btnv_b:active,.tp-lstv_s:active{background-color:var(--btn-bg-a)}.tp-p2dv_b:disabled,.tp-btnv_b:disabled,.tp-lstv_s:disabled{opacity:.5}.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-txtv_i:hover,.tp-p2dpv_p:hover,.tp-colswv_sw:hover{background-color:var(--in-bg-h)}.tp-txtv_i:focus,.tp-p2dpv_p:focus,.tp-colswv_sw:focus{background-color:var(--in-bg-f)}.tp-txtv_i:active,.tp-p2dpv_p:active,.tp-colswv_sw:active{background-color:var(--in-bg-a)}.tp-txtv_i:disabled,.tp-p2dpv_p:disabled,.tp-colswv_sw:disabled{opacity:.5}.tp-mllv_i,.tp-sglv_i,.tp-grlv_g{background-color:var(--mo-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--mo-fg);height:var(--bld-us);scrollbar-color:currentColor rgba(0,0,0,0);scrollbar-width:thin;width:100%}.tp-mllv_i::-webkit-scrollbar,.tp-sglv_i::-webkit-scrollbar,.tp-grlv_g::-webkit-scrollbar{height:8px;width:8px}.tp-mllv_i::-webkit-scrollbar-corner,.tp-sglv_i::-webkit-scrollbar-corner,.tp-grlv_g::-webkit-scrollbar-corner{background-color:rgba(0,0,0,0)}.tp-mllv_i::-webkit-scrollbar-thumb,.tp-sglv_i::-webkit-scrollbar-thumb,.tp-grlv_g::-webkit-scrollbar-thumb{background-clip:padding-box;background-color:currentColor;border:rgba(0,0,0,0) solid 2px;border-radius:4px}.tp-rotv{--font-family: var(--tp-font-family, Roboto Mono, Source Code Pro, Menlo, Courier, monospace);--bs-br: var(--tp-base-border-radius, 6px);--cnt-h-p: var(--tp-container-horizontal-padding, 4px);--cnt-v-p: var(--tp-container-vertical-padding, 4px);--elm-br: var(--tp-element-border-radius, 2px);--bld-s: var(--tp-blade-spacing, 4px);--bld-us: var(--tp-blade-unit-size, 20px);--bs-bg: var(--tp-base-background-color, hsl(230, 7%, 17%));--bs-sh: var(--tp-base-shadow-color, rgba(0, 0, 0, 0.2));--btn-bg: var(--tp-button-background-color, hsl(230, 7%, 70%));--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, hsl(230, 7%, 17%));--cnt-bg: var(--tp-container-background-color, rgba(187, 188, 196, 0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187, 188, 196, 0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187, 188, 196, 0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187, 188, 196, 0.15));--cnt-fg: var(--tp-container-foreground-color, hsl(230, 7%, 75%));--in-bg: var(--tp-input-background-color, rgba(187, 188, 196, 0.1));--in-bg-a: var(--tp-input-background-color-active, rgba(187, 188, 196, 0.25));--in-bg-f: var(--tp-input-background-color-focus, rgba(187, 188, 196, 0.2));--in-bg-h: var(--tp-input-background-color-hover, rgba(187, 188, 196, 0.15));--in-fg: var(--tp-input-foreground-color, hsl(230, 7%, 75%));--lbl-fg: var(--tp-label-foreground-color, rgba(187, 188, 196, 0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0, 0, 0, 0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187, 188, 196, 0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(187, 188, 196, 0.1))}.tp-rotv_c>.tp-cntv.tp-v-lst,.tp-tabv_c .tp-brkv>.tp-cntv.tp-v-lst,.tp-fldv_c>.tp-cntv.tp-v-lst{margin-bottom:calc(-1*var(--cnt-v-p))}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-rotv_c>*:not(.tp-v-fst),.tp-tabv_c .tp-brkv>*:not(.tp-v-fst),.tp-fldv_c>*:not(.tp-v-fst){margin-top:var(--bld-s)}.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-v-p)}.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-cntv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-v-p)}.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-tabv_c .tp-brkv>.tp-cntv,.tp-fldv_c>.tp-cntv{margin-left:4px}.tp-tabv_c .tp-brkv>.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--elm-br);border-bottom-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-tabv_c .tp-brkv .tp-fldv>.tp-fldv_c,.tp-fldv_c .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv>.tp-cntv+.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-cntv+.tp-fldv>.tp-fldv_b{border-top-left-radius:0}.tp-tabv_c .tp-brkv>.tp-cntv+.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-cntv+.tp-tabv>.tp-tabv_t{border-top-left-radius:0}.tp-tabv_c .tp-brkv>.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-tabv>.tp-tabv_t{border-top-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv .tp-tabv>.tp-tabv_c,.tp-fldv_c .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--elm-br)}.tp-rotv_b,.tp-fldv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);overflow:hidden;padding-left:var(--cnt-h-p);padding-right:calc(4px + var(--bld-us) + var(--cnt-h-p));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-rotv_b:hover,.tp-fldv_b:hover{background-color:var(--cnt-bg-h)}.tp-rotv_b:focus,.tp-fldv_b:focus{background-color:var(--cnt-bg-f)}.tp-rotv_b:active,.tp-fldv_b:active{background-color:var(--cnt-bg-a)}.tp-rotv_b:disabled,.tp-fldv_b:disabled{opacity:.5}.tp-rotv_m,.tp-fldv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:"";display:block;height:6px;right:calc(var(--cnt-h-p) + (var(--bld-us) + 4px - 6px)/2 - 2px);margin:auto;opacity:.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-rotv.tp-rotv-expanded .tp-rotv_m,.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m{transform:none}.tp-rotv_c,.tp-fldv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c,.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c{display:none}.tp-rotv.tp-rotv-expanded .tp-rotv_c,.tp-fldv.tp-fldv-expanded>.tp-fldv_c{opacity:1;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-lstv,.tp-coltxtv_m{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m,.tp-coltxtv_mm{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-lstv_m svg,.tp-coltxtv_mm svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-lstv_m svg path,.tp-coltxtv_mm svg path{fill:currentColor}.tp-pndtxtv,.tp-coltxtv_w{display:flex}.tp-pndtxtv_a,.tp-coltxtv_c{width:100%}.tp-pndtxtv_a+.tp-pndtxtv_a,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-coltxtv_c{margin-left:2px}.tp-btnv_b{width:100%}.tp-btnv_t{text-align:center}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--elm-br);cursor:pointer;display:block;height:var(--bld-us);position:relative;width:var(--bld-us)}.tp-ckbv_w svg{bottom:0;display:block;height:16px;left:0;margin:auto;opacity:0;position:absolute;right:0;top:0;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--bld-us)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-cpl .tp-colv_p{overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--bld-s);opacity:1}.tp-colv .tp-popv{left:calc(-1*var(--cnt-h-p));right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--bld-s)}.tp-colpv_rgb{display:flex;margin-top:var(--bld-s);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-v-p);padding-top:calc(var(--cnt-v-p) + 2px);position:relative}.tp-colpv_a::before{background-color:var(--grv-fg);content:"";height:2px;left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:0}.tp-colpv.tp-v-disabled .tp-colpv_a::before{opacity:.5}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--elm-br);outline:none;overflow:hidden;position:relative}.tp-svpv.tp-v-disabled{opacity:.5}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--bld-us)*4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0, 0, 0, 0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative}.tp-hplv.tp-v-disabled{opacity:.5}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--elm-br);border:rgba(255,255,255,.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative;width:100%}.tp-aplv.tp-v-disabled{opacity:.5}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--elm-br);box-shadow:0 0 2px rgba(0,0,0,.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;pointer-events:none;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--elm-br);border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--elm-br);overflow:hidden}.tp-colswv.tp-v-disabled{opacity:.5}.tp-colswv_sw{border-radius:0}.tp-colswv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;cursor:pointer;display:block;height:var(--bld-us);left:0;margin:0;outline:none;padding:0;position:absolute;top:0;width:var(--bld-us)}.tp-colswv_b:focus::after{border:rgba(255,255,255,.75) solid 2px;border-radius:var(--elm-br);bottom:0;content:"";display:block;left:0;position:absolute;right:0;top:0}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--elm-br);color:var(--lbl-fg);cursor:pointer;height:var(--bld-us);line-height:var(--bld-us);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv.tp-v-disabled .tp-coltxtv_mm{opacity:.5}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv{position:relative}.tp-fldv.tp-fldv-not .tp-fldv_b{display:none}.tp-fldv_t{padding-left:4px}.tp-fldv_b:disabled .tp-fldv_m{display:none}.tp-fldv_c{padding-left:4px}.tp-fldv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--bld-us) + 4px);width:var(--bs-br)}.tp-fldv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-fldv_b:hover+.tp-fldv_i{color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_i{color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_i{color:var(--cnt-bg-a)}.tp-fldv.tp-v-disabled>.tp-fldv_i{opacity:.5}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--bld-us)*3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left .05s,top .05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-h-p);padding-right:var(--cnt-h-p)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:160px}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding:0 4px}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:.5}.tp-mllv_i{display:block;height:calc(var(--bld-us)*3);line-height:var(--bld-us);padding:0 4px;resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--bld-us);margin-right:4px;position:relative;width:var(--bld-us)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--bld-s);opacity:1}.tp-p2dv .tp-popv{left:calc(-1*var(--cnt-h-p));right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-p2dpv{padding-left:calc(var(--bld-us) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv.tp-v-disabled .tp-p2dpv_p{opacity:.5}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:6px;box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:168px;padding:var(--cnt-v-p) var(--cnt-h-p);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sprv.tp-v-disabled .tp-sprv_r{opacity:.5}.tp-sldv.tp-v-disabled{opacity:.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--bld-us);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;bottom:0;content:"";display:block;height:2px;left:0;margin:auto;position:absolute;right:0;top:0}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";display:block;height:2px;left:0;margin-bottom:auto;margin-top:auto;position:absolute;right:0;top:0}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--elm-br);bottom:0;content:"";display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv{position:relative}.tp-tabv_t{align-items:flex-end;color:var(--cnt-bg);display:flex;overflow:hidden;position:relative}.tp-tabv_t:hover{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus){color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active){color:var(--cnt-bg-a)}.tp-tabv_t::before{background-color:currentColor;bottom:0;content:"";height:2px;left:0;pointer-events:none;position:absolute;right:0}.tp-tabv.tp-v-disabled .tp-tabv_t::before{opacity:.5}.tp-tabv.tp-tabv-nop .tp-tabv_t{height:calc(var(--bld-us) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_t::before{background-color:var(--cnt-bg);bottom:0;content:"";height:2px;left:0;position:absolute;right:0}.tp-tabv_c{padding-bottom:var(--cnt-v-p);padding-left:4px;padding-top:var(--cnt-v-p)}.tp-tabv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--bld-us) + 4px);width:var(--bs-br)}.tp-tabv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-tabv_t:hover+.tp-tabv_i{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus)+.tp-tabv_i{color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active)+.tp-tabv_i{color:var(--cnt-bg-a)}.tp-tabv.tp-v-disabled>.tp-tabv_i{opacity:.5}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv.tp-v-disabled::before{opacity:.5}.tp-tbiv_b{display:block;padding-left:calc(var(--cnt-h-p) + 4px);padding-right:calc(var(--cnt-h-p) + 4px);position:relative;width:100%}.tp-tbiv_b:disabled{opacity:.5}.tp-tbiv_b::before{background-color:var(--cnt-bg);bottom:2px;content:"";left:0;pointer-events:none;position:absolute;right:0;top:0}.tp-tbiv_b:hover::before{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus::before{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active::before{background-color:var(--cnt-bg-a)}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);opacity:.5;overflow:hidden;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-txtv{position:relative}.tp-txtv_i{padding:0 4px}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:.3}.tp-txtv_k{cursor:pointer;height:100%;left:-3px;position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";height:calc(var(--bld-us) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:.1;position:absolute;top:0;transition:border-radius .1s,height .1s,transform .1s,width .1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--elm-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0);border-style:solid;border-width:2px;box-sizing:border-box;content:"";font-size:.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--font-family);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(4px + var(--bld-us) + var(--cnt-h-p));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0}.tp-rotv.tp-rotv-not .tp-rotv_b{display:none}.tp-rotv_b:disabled .tp-rotv_m{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1*var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1*var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_t{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}'), this.pool_.getAll().forEach((e) => {
          this.embedPluginStyle_(e);
        }), this.registerPlugin({
          plugins: [
            Kc,
            zc,
            Ci,
            $c
          ]
        });
      }
    }
    const qc = new r("3.1.7");
    s.BladeApi = o, s.ButtonApi = z, s.FolderApi = _i, s.InputBindingApi = bi, s.ListApi = oa, s.MonitorBindingApi = gi, s.Pane = Yc, s.SeparatorApi = ls, s.SliderApi = aa, s.TabApi = us, s.TabPageApi = Ei, s.TextApi = la, s.TpChangeEvent = p, s.VERSION = qc, Object.defineProperty(s, "__esModule", { value: true });
  });
})(Ih, Ks);
var ts = {};
var Dh = {
  get exports() {
    return ts;
  },
  set exports(v) {
    ts = v;
  }
};
(function(v, n) {
  (function(s, r) {
    r(n);
  })(tl, function(s) {
    class r {
      constructor(a) {
        this.controller_ = a;
      }
      get element() {
        return this.controller_.view.element;
      }
      get disabled() {
        return this.controller_.viewProps.get("disabled");
      }
      set disabled(a) {
        this.controller_.viewProps.set("disabled", a);
      }
      get hidden() {
        return this.controller_.viewProps.get("hidden");
      }
      set hidden(a) {
        this.controller_.viewProps.set("hidden", a);
      }
      dispose() {
        this.controller_.viewProps.set("disposed", true);
      }
    }
    class o {
      constructor(a) {
        this.target = a;
      }
    }
    class c extends o {
      constructor(a, u, f, x) {
        super(a), this.value = u, this.presetKey = f, this.last = x ?? true;
      }
    }
    function p(m) {
      return m;
    }
    function h(m) {
      return m == null;
    }
    const d = {
      alreadydisposed: () => "View has been already disposed",
      invalidparams: (m) => `Invalid parameters for '${m.name}'`,
      nomatchingcontroller: (m) => `No matching controller for '${m.key}'`,
      nomatchingview: (m) => `No matching view for '${JSON.stringify(m.params)}'`,
      notbindable: () => "Value is not bindable",
      propertynotfound: (m) => `Property '${m.name}' not found`,
      shouldneverhappen: () => "This error should never happen"
    };
    class g {
      constructor(a) {
        var u;
        this.message = (u = d[a.type](a.context)) !== null && u !== void 0 ? u : "Unexpected error", this.name = this.constructor.name, this.stack = new Error(this.message).stack, this.type = a.type;
      }
      static alreadyDisposed() {
        return new g({ type: "alreadydisposed" });
      }
      static notBindable() {
        return new g({
          type: "notbindable"
        });
      }
      static propertyNotFound(a) {
        return new g({
          type: "propertynotfound",
          context: {
            name: a
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
      on(a, u) {
        let f = this.observers_[a];
        return f || (f = this.observers_[a] = []), f.push({
          handler: u
        }), this;
      }
      off(a, u) {
        const f = this.observers_[a];
        return f && (this.observers_[a] = f.filter((x) => x.handler !== u)), this;
      }
      emit(a, u) {
        const f = this.observers_[a];
        f && f.forEach((x) => {
          x.handler(u);
        });
      }
    }
    const _2 = "tp";
    function y(m) {
      return (u, f) => [
        _2,
        "-",
        m,
        "v",
        u ? `_${u}` : "",
        f ? `-${f}` : ""
      ].join("");
    }
    function P(m, a) {
      return (u) => a(m(u));
    }
    function R(m) {
      return m.rawValue;
    }
    function k(m, a) {
      m.emitter.on("change", P(R, a)), a(m.rawValue);
    }
    function A(m, a, u) {
      k(m.value(a), u);
    }
    function z(m, a, u) {
      u ? m.classList.add(a) : m.classList.remove(a);
    }
    function F(m, a) {
      return (u) => {
        z(m, a, u);
      };
    }
    function I(m, a) {
      k(m, (u) => {
        a.textContent = u ?? "";
      });
    }
    const D2 = y("btn");
    class Y {
      constructor(a, u) {
        this.element = a.createElement("div"), this.element.classList.add(D2()), u.viewProps.bindClassModifiers(this.element);
        const f = a.createElement("button");
        f.classList.add(D2("b")), u.viewProps.bindDisabled(f), this.element.appendChild(f), this.buttonElement = f;
        const x = a.createElement("div");
        x.classList.add(D2("t")), I(u.props.value("title"), x), this.buttonElement.appendChild(x);
      }
    }
    class G {
      constructor(a, u) {
        this.emitter = new w(), this.onClick_ = this.onClick_.bind(this), this.props = u.props, this.viewProps = u.viewProps, this.view = new Y(a, {
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
      constructor(a, u) {
        var f;
        this.constraint_ = u == null ? void 0 : u.constraint, this.equals_ = (f = u == null ? void 0 : u.equals) !== null && f !== void 0 ? f : (x, T) => x === T, this.emitter = new w(), this.rawValue_ = a;
      }
      get constraint() {
        return this.constraint_;
      }
      get rawValue() {
        return this.rawValue_;
      }
      set rawValue(a) {
        this.setRawValue(a, {
          forceEmit: false,
          last: true
        });
      }
      setRawValue(a, u) {
        const f = u ?? {
          forceEmit: false,
          last: true
        }, x = this.constraint_ ? this.constraint_.constrain(a) : a, T = this.rawValue_;
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
      constructor(a) {
        this.emitter = new w(), this.value_ = a;
      }
      get rawValue() {
        return this.value_;
      }
      set rawValue(a) {
        this.setRawValue(a, {
          forceEmit: false,
          last: true
        });
      }
      setRawValue(a, u) {
        const f = u ?? {
          forceEmit: false,
          last: true
        }, x = this.value_;
        x === a && !f.forceEmit || (this.emitter.emit("beforechange", {
          sender: this
        }), this.value_ = a, this.emitter.emit("change", {
          options: f,
          previousRawValue: x,
          rawValue: this.value_,
          sender: this
        }));
      }
    }
    function H(m, a) {
      const u = a == null ? void 0 : a.constraint, f = a == null ? void 0 : a.equals;
      return !u && !f ? new O(m) : new N(m, a);
    }
    class K {
      constructor(a) {
        this.emitter = new w(), this.valMap_ = a;
        for (const u in this.valMap_)
          this.valMap_[u].emitter.on("change", () => {
            this.emitter.emit("change", {
              key: u,
              sender: this
            });
          });
      }
      static createCore(a) {
        return Object.keys(a).reduce((f, x) => Object.assign(f, {
          [x]: H(a[x])
        }), {});
      }
      static fromObject(a) {
        const u = this.createCore(a);
        return new K(u);
      }
      get(a) {
        return this.valMap_[a].rawValue;
      }
      set(a, u) {
        this.valMap_[a].rawValue = u;
      }
      value(a) {
        return this.valMap_[a];
      }
    }
    function q(m, a) {
      const f = Object.keys(a).reduce((x, T) => {
        if (x === void 0)
          return;
        const V = a[T], j = V(m[T]);
        return j.succeeded ? Object.assign(Object.assign({}, x), { [T]: j.value }) : void 0;
      }, {});
      return f;
    }
    function pe(m, a) {
      return m.reduce((u, f) => {
        if (u === void 0)
          return;
        const x = a(f);
        if (!(!x.succeeded || x.value === void 0))
          return [...u, x.value];
      }, []);
    }
    function _e(m) {
      return m === null ? false : typeof m == "object";
    }
    function ce(m) {
      return (a) => (u) => {
        if (!a && u === void 0)
          return {
            succeeded: false,
            value: void 0
          };
        if (a && u === void 0)
          return {
            succeeded: true,
            value: void 0
          };
        const f = m(u);
        return f !== void 0 ? {
          succeeded: true,
          value: f
        } : {
          succeeded: false,
          value: void 0
        };
      };
    }
    function me(m) {
      return {
        custom: (a) => ce(a)(m),
        boolean: ce((a) => typeof a == "boolean" ? a : void 0)(m),
        number: ce((a) => typeof a == "number" ? a : void 0)(m),
        string: ce((a) => typeof a == "string" ? a : void 0)(m),
        function: ce((a) => typeof a == "function" ? a : void 0)(m),
        constant: (a) => ce((u) => u === a ? a : void 0)(m),
        raw: ce((a) => a)(m),
        object: (a) => ce((u) => {
          if (_e(u))
            return q(u, a);
        })(m),
        array: (a) => ce((u) => {
          if (Array.isArray(u))
            return pe(u, a);
        })(m)
      };
    }
    const he = {
      optional: me(true),
      required: me(false)
    };
    function ee(m, a) {
      const u = he.required.object(a)(m);
      return u.succeeded ? u.value : void 0;
    }
    function X(m) {
      console.warn([
        `Missing '${m.key}' of ${m.target} in ${m.place}.`,
        "Please rebuild plugins with the latest core package."
      ].join(" "));
    }
    function Te(m) {
      return m && m.parentElement && m.parentElement.removeChild(m), null;
    }
    class fe {
      constructor(a) {
        this.value_ = a;
      }
      static create(a) {
        return [
          new fe(a),
          (u, f) => {
            a.setRawValue(u, f);
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
    const ae = y("");
    function ne(m, a) {
      return F(m, ae(void 0, a));
    }
    class ge extends K {
      constructor(a) {
        var u;
        super(a), this.onDisabledChange_ = this.onDisabledChange_.bind(this), this.onParentChange_ = this.onParentChange_.bind(this), this.onParentGlobalDisabledChange_ = this.onParentGlobalDisabledChange_.bind(this), [this.globalDisabled_, this.setGlobalDisabled_] = fe.create(H(this.getGlobalDisabled_())), this.value("disabled").emitter.on("change", this.onDisabledChange_), this.value("parent").emitter.on("change", this.onParentChange_), (u = this.get("parent")) === null || u === void 0 || u.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_);
      }
      static create(a) {
        var u, f, x;
        const T = a ?? {};
        return new ge(K.createCore({
          disabled: (u = T.disabled) !== null && u !== void 0 ? u : false,
          disposed: false,
          hidden: (f = T.hidden) !== null && f !== void 0 ? f : false,
          parent: (x = T.parent) !== null && x !== void 0 ? x : null
        }));
      }
      get globalDisabled() {
        return this.globalDisabled_;
      }
      bindClassModifiers(a) {
        k(this.globalDisabled_, ne(a, "disabled")), A(this, "hidden", ne(a, "hidden"));
      }
      bindDisabled(a) {
        k(this.globalDisabled_, (u) => {
          a.disabled = u;
        });
      }
      bindTabIndex(a) {
        k(this.globalDisabled_, (u) => {
          a.tabIndex = u ? -1 : 0;
        });
      }
      handleDispose(a) {
        this.value("disposed").emitter.on("change", (u) => {
          u && a();
        });
      }
      getGlobalDisabled_() {
        const a = this.get("parent");
        return (a ? a.globalDisabled.rawValue : false) || this.get("disabled");
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
      onParentChange_(a) {
        var u;
        const f = a.previousRawValue;
        f == null || f.globalDisabled.emitter.off("change", this.onParentGlobalDisabledChange_), (u = this.get("parent")) === null || u === void 0 || u.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_), this.updateGlobalDisabled_();
      }
    }
    function S() {
      return ["veryfirst", "first", "last", "verylast"];
    }
    const le = y(""), Fe = {
      veryfirst: "vfst",
      first: "fst",
      last: "lst",
      verylast: "vlst"
    };
    class Ue {
      constructor(a) {
        this.parent_ = null, this.blade = a.blade, this.view = a.view, this.viewProps = a.viewProps;
        const u = this.view.element;
        this.blade.value("positions").emitter.on("change", () => {
          S().forEach((f) => {
            u.classList.remove(le(void 0, Fe[f]));
          }), this.blade.get("positions").forEach((f) => {
            u.classList.add(le(void 0, Fe[f]));
          });
        }), this.viewProps.handleDispose(() => {
          Te(u);
        });
      }
      get parent() {
        return this.parent_;
      }
      set parent(a) {
        if (this.parent_ = a, !("parent" in this.viewProps.valMap_)) {
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
    function rt(m) {
      m.offsetHeight;
    }
    function jn(m, a) {
      const u = m.style.transition;
      m.style.transition = "none", a(), m.style.transition = u;
    }
    function Qe(m) {
      return m.ontouchstart !== void 0;
    }
    function Un(m) {
      for (; m.childNodes.length > 0; )
        m.removeChild(m.childNodes[0]);
    }
    function cn(m) {
      return m.relatedTarget ? m.relatedTarget : "explicitOriginalTarget" in m ? m.explicitOriginalTarget : null;
    }
    const vt = y("lbl");
    function Lt(m, a) {
      const u = m.createDocumentFragment();
      return a.split(`
`).map((x) => m.createTextNode(x)).forEach((x, T) => {
        T > 0 && u.appendChild(m.createElement("br")), u.appendChild(x);
      }), u;
    }
    class Ke {
      constructor(a, u) {
        this.element = a.createElement("div"), this.element.classList.add(vt()), u.viewProps.bindClassModifiers(this.element);
        const f = a.createElement("div");
        f.classList.add(vt("l")), A(u.props, "label", (T) => {
          h(T) ? this.element.classList.add(vt(void 0, "nol")) : (this.element.classList.remove(vt(void 0, "nol")), Un(f), f.appendChild(Lt(a, T)));
        }), this.element.appendChild(f), this.labelElement = f;
        const x = a.createElement("div");
        x.classList.add(vt("v")), this.element.appendChild(x), this.valueElement = x;
      }
    }
    class ot extends Ue {
      constructor(a, u) {
        const f = u.valueController.viewProps;
        super(Object.assign(Object.assign({}, u), { view: new Ke(a, {
          props: u.props,
          viewProps: f
        }), viewProps: f })), this.props = u.props, this.valueController = u.valueController, this.view.valueElement.appendChild(this.valueController.view.element);
      }
    }
    class un extends Ue {
      constructor(a) {
        super(a), this.value = a.value;
      }
    }
    class bt extends K {
      constructor(a) {
        super(a);
      }
      static create(a) {
        const u = {
          completed: true,
          expanded: a,
          expandedHeight: null,
          shouldFixHeight: false,
          temporaryExpanded: null
        }, f = K.createCore(u);
        return new bt(f);
      }
      get styleExpanded() {
        var a;
        return (a = this.get("temporaryExpanded")) !== null && a !== void 0 ? a : this.get("expanded");
      }
      get styleHeight() {
        if (!this.styleExpanded)
          return "0";
        const a = this.get("expandedHeight");
        return this.get("shouldFixHeight") && !h(a) ? `${a}px` : "auto";
      }
      bindExpandedClass(a, u) {
        const f = () => {
          this.styleExpanded ? a.classList.add(u) : a.classList.remove(u);
        };
        A(this, "expanded", f), A(this, "temporaryExpanded", f);
      }
      cleanUpTransition() {
        this.set("shouldFixHeight", false), this.set("expandedHeight", null), this.set("completed", true);
      }
    }
    function Gn(m) {
      return bt.create(m);
    }
    function fi(m, a) {
      let u = 0;
      return jn(a, () => {
        m.set("expandedHeight", null), m.set("temporaryExpanded", true), rt(a), u = a.clientHeight, m.set("temporaryExpanded", null), rt(a);
      }), u;
    }
    function Hn(m, a) {
      a.style.height = m.styleHeight;
    }
    function Kn(m, a) {
      m.value("expanded").emitter.on("beforechange", () => {
        m.set("completed", false), h(m.get("expandedHeight")) && m.set("expandedHeight", fi(m, a)), m.set("shouldFixHeight", true), rt(a);
      }), m.emitter.on("change", () => {
        Hn(m, a);
      }), Hn(m, a), a.addEventListener("transitionend", (u) => {
        u.propertyName === "height" && m.cleanUpTransition();
      });
    }
    class Et {
      constructor(a, u) {
        const f = y(u.viewName);
        this.element = a.createElement("div"), this.element.classList.add(f()), u.viewProps.bindClassModifiers(this.element);
      }
    }
    class At extends un {
      constructor(a, u) {
        const f = u.valueController.viewProps;
        super(Object.assign(Object.assign({}, u), { value: u.valueController.value, view: new Ke(a, {
          props: u.props,
          viewProps: f
        }), viewProps: f })), this.props = u.props, this.valueController = u.valueController, this.view.valueElement.appendChild(this.valueController.view.element);
      }
    }
    class $n {
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
    class pn {
      constructor(a, u) {
        this.disabled_ = false, this.timerId_ = null, this.onTick_ = this.onTick_.bind(this), this.doc_ = a, this.emitter = new w(), this.interval_ = u, this.setTimer_();
      }
      get disabled() {
        return this.disabled_;
      }
      set disabled(a) {
        this.disabled_ = a, this.disabled_ ? this.clearTimer_() : this.setTimer_();
      }
      dispose() {
        this.clearTimer_();
      }
      clearTimer_() {
        if (this.timerId_ === null)
          return;
        const a = this.doc_.defaultView;
        a && a.clearInterval(this.timerId_), this.timerId_ = null;
      }
      setTimer_() {
        if (this.clearTimer_(), this.interval_ <= 0)
          return;
        const a = this.doc_.defaultView;
        a && (this.timerId_ = a.setInterval(this.onTick_, this.interval_));
      }
      onTick_() {
        this.disabled_ || this.emitter.emit("tick", {
          sender: this
        });
      }
    }
    class Xn {
      constructor(a) {
        this.constraints = a;
      }
      constrain(a) {
        return this.constraints.reduce((u, f) => f.constrain(u), a);
      }
    }
    function Ct(m, a) {
      if (m instanceof a)
        return m;
      if (m instanceof Xn) {
        const u = m.constraints.reduce((f, x) => f || (x instanceof a ? x : null), null);
        if (u)
          return u;
      }
      return null;
    }
    class gt {
      constructor(a) {
        this.values = K.fromObject({
          max: a.max,
          min: a.min
        });
      }
      constrain(a) {
        const u = this.values.get("max"), f = this.values.get("min");
        return Math.min(Math.max(a, f), u);
      }
    }
    class Rt2 {
      constructor(a) {
        this.values = K.fromObject({
          max: a.max,
          min: a.min
        });
      }
      get maxValue() {
        return this.values.get("max");
      }
      get minValue() {
        return this.values.get("min");
      }
      constrain(a) {
        const u = this.values.get("max"), f = this.values.get("min");
        let x = a;
        return h(f) || (x = Math.max(x, f)), h(u) || (x = Math.min(x, u)), x;
      }
    }
    class L {
      constructor(a, u = 0) {
        this.step = a, this.origin = u;
      }
      constrain(a) {
        const u = this.origin % this.step, f = Math.round((a - u) / this.step);
        return u + f * this.step;
      }
    }
    const U = y("pop");
    class W {
      constructor(a, u) {
        this.element = a.createElement("div"), this.element.classList.add(U()), u.viewProps.bindClassModifiers(this.element), k(u.shows, F(this.element, U(void 0, "v")));
      }
    }
    class ie {
      constructor(a, u) {
        this.shows = H(false), this.viewProps = u.viewProps, this.view = new W(a, {
          shows: this.shows,
          viewProps: this.viewProps
        });
      }
    }
    const xe = y("txt");
    class Be {
      constructor(a, u) {
        this.onChange_ = this.onChange_.bind(this), this.element = a.createElement("div"), this.element.classList.add(xe()), u.viewProps.bindClassModifiers(this.element), this.props_ = u.props, this.props_.emitter.on("change", this.onChange_);
        const f = a.createElement("input");
        f.classList.add(xe("i")), f.type = "text", u.viewProps.bindDisabled(f), this.element.appendChild(f), this.inputElement = f, u.value.emitter.on("change", this.onChange_), this.value_ = u.value, this.refresh();
      }
      refresh() {
        const a = this.props_.get("formatter");
        this.inputElement.value = a(this.value_.rawValue);
      }
      onChange_() {
        this.refresh();
      }
    }
    class Ht {
      constructor(a, u) {
        this.onInputChange_ = this.onInputChange_.bind(this), this.parser_ = u.parser, this.props = u.props, this.value = u.value, this.viewProps = u.viewProps, this.view = new Be(a, {
          props: u.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_);
      }
      onInputChange_(a) {
        const f = a.currentTarget.value, x = this.parser_(f);
        h(x) || (this.value.rawValue = x), this.view.refresh();
      }
    }
    function hn(m) {
      return m === "false" ? false : !!m;
    }
    class $e {
      constructor(a) {
        this.text = a;
      }
      evaluate() {
        return Number(this.text);
      }
      toString() {
        return this.text;
      }
    }
    const Xe = {
      "**": (m, a) => Math.pow(m, a),
      "*": (m, a) => m * a,
      "/": (m, a) => m / a,
      "%": (m, a) => m % a,
      "+": (m, a) => m + a,
      "-": (m, a) => m - a,
      "<<": (m, a) => m << a,
      ">>": (m, a) => m >> a,
      ">>>": (m, a) => m >>> a,
      "&": (m, a) => m & a,
      "^": (m, a) => m ^ a,
      "|": (m, a) => m | a
    };
    class Zs {
      constructor(a, u, f) {
        this.left = u, this.operator = a, this.right = f;
      }
      evaluate() {
        const a = Xe[this.operator];
        if (!a)
          throw new Error(`unexpected binary operator: '${this.operator}`);
        return a(this.left.evaluate(), this.right.evaluate());
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
    const Ws = {
      "+": (m) => m,
      "-": (m) => -m,
      "~": (m) => ~m
    };
    class Js {
      constructor(a, u) {
        this.operator = a, this.expression = u;
      }
      evaluate() {
        const a = Ws[this.operator];
        if (!a)
          throw new Error(`unexpected unary operator: '${this.operator}`);
        return a(this.expression.evaluate());
      }
      toString() {
        return ["u(", this.operator, this.expression.toString(), ")"].join(" ");
      }
    }
    function vi(m) {
      return (a, u) => {
        for (let f = 0; f < m.length; f++) {
          const x = m[f](a, u);
          if (x !== "")
            return x;
        }
        return "";
      };
    }
    function Vt(m, a) {
      var u;
      const f = m.substr(a).match(/^\s+/);
      return (u = f && f[0]) !== null && u !== void 0 ? u : "";
    }
    function bi(m, a) {
      const u = m.substr(a, 1);
      return u.match(/^[1-9]$/) ? u : "";
    }
    function Ge(m, a) {
      var u;
      const f = m.substr(a).match(/^[0-9]+/);
      return (u = f && f[0]) !== null && u !== void 0 ? u : "";
    }
    function gi(m, a) {
      const u = Ge(m, a);
      if (u !== "")
        return u;
      const f = m.substr(a, 1);
      if (a += 1, f !== "-" && f !== "+")
        return "";
      const x = Ge(m, a);
      return x === "" ? "" : f + x;
    }
    function at(m, a) {
      const u = m.substr(a, 1);
      if (a += 1, u.toLowerCase() !== "e")
        return "";
      const f = gi(m, a);
      return f === "" ? "" : u + f;
    }
    function rs(m, a) {
      const u = m.substr(a, 1);
      if (u === "0")
        return u;
      const f = bi(m, a);
      return a += f.length, f === "" ? "" : f + Ge(m, a);
    }
    function dn(m, a) {
      const u = rs(m, a);
      if (a += u.length, u === "")
        return "";
      const f = m.substr(a, 1);
      if (a += f.length, f !== ".")
        return "";
      const x = Ge(m, a);
      return a += x.length, u + f + x + at(m, a);
    }
    function os(m, a) {
      const u = m.substr(a, 1);
      if (a += u.length, u !== ".")
        return "";
      const f = Ge(m, a);
      return a += f.length, f === "" ? "" : u + f + at(m, a);
    }
    function Yn(m, a) {
      const u = rs(m, a);
      return a += u.length, u === "" ? "" : u + at(m, a);
    }
    const _i = vi([
      dn,
      os,
      Yn
    ]);
    function wi(m, a) {
      var u;
      const f = m.substr(a).match(/^[01]+/);
      return (u = f && f[0]) !== null && u !== void 0 ? u : "";
    }
    function er(m, a) {
      const u = m.substr(a, 2);
      if (a += u.length, u.toLowerCase() !== "0b")
        return "";
      const f = wi(m, a);
      return f === "" ? "" : u + f;
    }
    function tr(m, a) {
      var u;
      const f = m.substr(a).match(/^[0-7]+/);
      return (u = f && f[0]) !== null && u !== void 0 ? u : "";
    }
    function nr(m, a) {
      const u = m.substr(a, 2);
      if (a += u.length, u.toLowerCase() !== "0o")
        return "";
      const f = tr(m, a);
      return f === "" ? "" : u + f;
    }
    function ir(m, a) {
      var u;
      const f = m.substr(a).match(/^[0-9a-f]+/i);
      return (u = f && f[0]) !== null && u !== void 0 ? u : "";
    }
    function yi(m, a) {
      const u = m.substr(a, 2);
      if (a += u.length, u.toLowerCase() !== "0x")
        return "";
      const f = ir(m, a);
      return f === "" ? "" : u + f;
    }
    const sr = vi([
      er,
      nr,
      yi
    ]), rr = vi([
      sr,
      _i
    ]);
    function mn(m, a) {
      const u = rr(m, a);
      return a += u.length, u === "" ? null : {
        evaluable: new $e(u),
        cursor: a
      };
    }
    function as(m, a) {
      const u = m.substr(a, 1);
      if (a += u.length, u !== "(")
        return null;
      const f = xi(m, a);
      if (!f)
        return null;
      a = f.cursor, a += Vt(m, a).length;
      const x = m.substr(a, 1);
      return a += x.length, x !== ")" ? null : {
        evaluable: f.evaluable,
        cursor: a
      };
    }
    function or(m, a) {
      var u;
      return (u = mn(m, a)) !== null && u !== void 0 ? u : as(m, a);
    }
    function qn(m, a) {
      const u = or(m, a);
      if (u)
        return u;
      const f = m.substr(a, 1);
      if (a += f.length, f !== "+" && f !== "-" && f !== "~")
        return null;
      const x = qn(m, a);
      return x ? (a = x.cursor, {
        cursor: a,
        evaluable: new Js(f, x.evaluable)
      }) : null;
    }
    function ar(m, a, u) {
      u += Vt(a, u).length;
      const f = m.filter((x) => a.startsWith(x, u))[0];
      return f ? (u += f.length, u += Vt(a, u).length, {
        cursor: u,
        operator: f
      }) : null;
    }
    function Kt(m, a) {
      return (u, f) => {
        const x = m(u, f);
        if (!x)
          return null;
        f = x.cursor;
        let T = x.evaluable;
        for (; ; ) {
          const V = ar(a, u, f);
          if (!V)
            break;
          f = V.cursor;
          const j = m(u, f);
          if (!j)
            return null;
          f = j.cursor, T = new Zs(V.operator, T, j.evaluable);
        }
        return T ? {
          cursor: f,
          evaluable: T
        } : null;
      };
    }
    const ls = [
      ["**"],
      ["*", "/", "%"],
      ["+", "-"],
      ["<<", ">>>", ">>"],
      ["&"],
      ["^"],
      ["|"]
    ].reduce((m, a) => Kt(m, a), qn);
    function xi(m, a) {
      return a += Vt(m, a).length, ls(m, a);
    }
    function lr(m) {
      const a = xi(m, 0);
      return !a || a.cursor + Vt(m, a.cursor).length !== m.length ? null : a.evaluable;
    }
    function fn(m) {
      var a;
      const u = lr(m);
      return (a = u == null ? void 0 : u.evaluate()) !== null && a !== void 0 ? a : null;
    }
    function cr(m) {
      if (typeof m == "number")
        return m;
      if (typeof m == "string") {
        const a = fn(m);
        if (!h(a))
          return a;
      }
      return 0;
    }
    function Ie(m) {
      return (a) => a.toFixed(Math.max(Math.min(m, 20), 0));
    }
    const ur = Ie(0);
    function Qn(m) {
      return ur(m) + "%";
    }
    function cs(m) {
      return String(m);
    }
    function Ei(m, a) {
      for (; m.length < a; )
        m.push(void 0);
    }
    function us(m) {
      const a = [];
      return Ei(a, m), H(a);
    }
    function ps(m) {
      const a = m.indexOf(void 0);
      return a < 0 ? m : m.slice(0, a);
    }
    function pr(m, a) {
      const u = [...ps(m), a];
      return u.length > m.length ? u.splice(0, u.length - m.length) : Ei(u, m.length), u;
    }
    function $t({ primary: m, secondary: a, forward: u, backward: f }) {
      let x = false;
      function T(V) {
        x || (x = true, V(), x = false);
      }
      m.emitter.on("change", (V) => {
        T(() => {
          a.setRawValue(u(m, a), V.options);
        });
      }), a.emitter.on("change", (V) => {
        T(() => {
          m.setRawValue(f(m, a), V.options);
        }), T(() => {
          a.setRawValue(u(m, a), V.options);
        });
      }), T(() => {
        a.setRawValue(u(m, a), {
          forceEmit: false,
          last: true
        });
      });
    }
    function Xt(m, a) {
      const u = m * (a.altKey ? 0.1 : 1) * (a.shiftKey ? 10 : 1);
      return a.upKey ? +u : a.downKey ? -u : 0;
    }
    function vn(m) {
      return {
        altKey: m.altKey,
        downKey: m.key === "ArrowDown",
        shiftKey: m.shiftKey,
        upKey: m.key === "ArrowUp"
      };
    }
    function Ci(m) {
      return {
        altKey: m.altKey,
        downKey: m.key === "ArrowLeft",
        shiftKey: m.shiftKey,
        upKey: m.key === "ArrowRight"
      };
    }
    function hr(m) {
      return m === "ArrowUp" || m === "ArrowDown";
    }
    function hs(m) {
      return hr(m) || m === "ArrowLeft" || m === "ArrowRight";
    }
    function Pi(m, a) {
      var u, f;
      const x = a.ownerDocument.defaultView, T = a.getBoundingClientRect();
      return {
        x: m.pageX - (((u = x && x.scrollX) !== null && u !== void 0 ? u : 0) + T.left),
        y: m.pageY - (((f = x && x.scrollY) !== null && f !== void 0 ? f : 0) + T.top)
      };
    }
    class Zn {
      constructor(a) {
        this.lastTouch_ = null, this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this), this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this), this.onMouseDown_ = this.onMouseDown_.bind(this), this.onTouchEnd_ = this.onTouchEnd_.bind(this), this.onTouchMove_ = this.onTouchMove_.bind(this), this.onTouchStart_ = this.onTouchStart_.bind(this), this.elem_ = a, this.emitter = new w(), a.addEventListener("touchstart", this.onTouchStart_, {
          passive: false
        }), a.addEventListener("touchmove", this.onTouchMove_, {
          passive: true
        }), a.addEventListener("touchend", this.onTouchEnd_), a.addEventListener("mousedown", this.onMouseDown_);
      }
      computePosition_(a) {
        const u = this.elem_.getBoundingClientRect();
        return {
          bounds: {
            width: u.width,
            height: u.height
          },
          point: a ? {
            x: a.x,
            y: a.y
          } : null
        };
      }
      onMouseDown_(a) {
        var u;
        a.preventDefault(), (u = a.currentTarget) === null || u === void 0 || u.focus();
        const f = this.elem_.ownerDocument;
        f.addEventListener("mousemove", this.onDocumentMouseMove_), f.addEventListener("mouseup", this.onDocumentMouseUp_), this.emitter.emit("down", {
          altKey: a.altKey,
          data: this.computePosition_(Pi(a, this.elem_)),
          sender: this,
          shiftKey: a.shiftKey
        });
      }
      onDocumentMouseMove_(a) {
        this.emitter.emit("move", {
          altKey: a.altKey,
          data: this.computePosition_(Pi(a, this.elem_)),
          sender: this,
          shiftKey: a.shiftKey
        });
      }
      onDocumentMouseUp_(a) {
        const u = this.elem_.ownerDocument;
        u.removeEventListener("mousemove", this.onDocumentMouseMove_), u.removeEventListener("mouseup", this.onDocumentMouseUp_), this.emitter.emit("up", {
          altKey: a.altKey,
          data: this.computePosition_(Pi(a, this.elem_)),
          sender: this,
          shiftKey: a.shiftKey
        });
      }
      onTouchStart_(a) {
        a.preventDefault();
        const u = a.targetTouches.item(0), f = this.elem_.getBoundingClientRect();
        this.emitter.emit("down", {
          altKey: a.altKey,
          data: this.computePosition_(u ? {
            x: u.clientX - f.left,
            y: u.clientY - f.top
          } : void 0),
          sender: this,
          shiftKey: a.shiftKey
        }), this.lastTouch_ = u;
      }
      onTouchMove_(a) {
        const u = a.targetTouches.item(0), f = this.elem_.getBoundingClientRect();
        this.emitter.emit("move", {
          altKey: a.altKey,
          data: this.computePosition_(u ? {
            x: u.clientX - f.left,
            y: u.clientY - f.top
          } : void 0),
          sender: this,
          shiftKey: a.shiftKey
        }), this.lastTouch_ = u;
      }
      onTouchEnd_(a) {
        var u;
        const f = (u = a.targetTouches.item(0)) !== null && u !== void 0 ? u : this.lastTouch_, x = this.elem_.getBoundingClientRect();
        this.emitter.emit("up", {
          altKey: a.altKey,
          data: this.computePosition_(f ? {
            x: f.clientX - x.left,
            y: f.clientY - x.top
          } : void 0),
          sender: this,
          shiftKey: a.shiftKey
        });
      }
    }
    function Ae(m, a, u, f, x) {
      const T = (m - a) / (u - a);
      return f + T * (x - f);
    }
    function ds(m) {
      return String(m.toFixed(10)).split(".")[1].replace(/0+$/, "").length;
    }
    function Yt(m, a, u) {
      return Math.min(Math.max(m, a), u);
    }
    const Ze = y("txt");
    class dr {
      constructor(a, u) {
        this.onChange_ = this.onChange_.bind(this), this.props_ = u.props, this.props_.emitter.on("change", this.onChange_), this.element = a.createElement("div"), this.element.classList.add(Ze(), Ze(void 0, "num")), u.arrayPosition && this.element.classList.add(Ze(void 0, u.arrayPosition)), u.viewProps.bindClassModifiers(this.element);
        const f = a.createElement("input");
        f.classList.add(Ze("i")), f.type = "text", u.viewProps.bindDisabled(f), this.element.appendChild(f), this.inputElement = f, this.onDraggingChange_ = this.onDraggingChange_.bind(this), this.dragging_ = u.dragging, this.dragging_.emitter.on("change", this.onDraggingChange_), this.element.classList.add(Ze()), this.inputElement.classList.add(Ze("i"));
        const x = a.createElement("div");
        x.classList.add(Ze("k")), this.element.appendChild(x), this.knobElement = x;
        const T = a.createElementNS(ye, "svg");
        T.classList.add(Ze("g")), this.knobElement.appendChild(T);
        const V = a.createElementNS(ye, "path");
        V.classList.add(Ze("gb")), T.appendChild(V), this.guideBodyElem_ = V;
        const j = a.createElementNS(ye, "path");
        j.classList.add(Ze("gh")), T.appendChild(j), this.guideHeadElem_ = j;
        const oe = a.createElement("div");
        oe.classList.add(y("tt")()), this.knobElement.appendChild(oe), this.tooltipElem_ = oe, u.value.emitter.on("change", this.onChange_), this.value = u.value, this.refresh();
      }
      onDraggingChange_(a) {
        if (a.rawValue === null) {
          this.element.classList.remove(Ze(void 0, "drg"));
          return;
        }
        this.element.classList.add(Ze(void 0, "drg"));
        const u = a.rawValue / this.props_.get("draggingScale"), f = u + (u > 0 ? -1 : u < 0 ? 1 : 0), x = Yt(-f, -4, 4);
        this.guideHeadElem_.setAttributeNS(null, "d", [`M ${f + x},0 L${f},4 L${f + x},8`, `M ${u},-1 L${u},9`].join(" ")), this.guideBodyElem_.setAttributeNS(null, "d", `M 0,4 L${u},4`);
        const T = this.props_.get("formatter");
        this.tooltipElem_.textContent = T(this.value.rawValue), this.tooltipElem_.style.left = `${u}px`;
      }
      refresh() {
        const a = this.props_.get("formatter");
        this.inputElement.value = a(this.value.rawValue);
      }
      onChange_() {
        this.refresh();
      }
    }
    class bn {
      constructor(a, u) {
        var f;
        this.originRawValue_ = 0, this.onInputChange_ = this.onInputChange_.bind(this), this.onInputKeyDown_ = this.onInputKeyDown_.bind(this), this.onInputKeyUp_ = this.onInputKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.baseStep_ = u.baseStep, this.parser_ = u.parser, this.props = u.props, this.sliderProps_ = (f = u.sliderProps) !== null && f !== void 0 ? f : null, this.value = u.value, this.viewProps = u.viewProps, this.dragging_ = H(null), this.view = new dr(a, {
          arrayPosition: u.arrayPosition,
          dragging: this.dragging_,
          props: this.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_), this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_), this.view.inputElement.addEventListener("keyup", this.onInputKeyUp_);
        const x = new Zn(this.view.knobElement);
        x.emitter.on("down", this.onPointerDown_), x.emitter.on("move", this.onPointerMove_), x.emitter.on("up", this.onPointerUp_);
      }
      constrainValue_(a) {
        var u, f;
        const x = (u = this.sliderProps_) === null || u === void 0 ? void 0 : u.get("minValue"), T = (f = this.sliderProps_) === null || f === void 0 ? void 0 : f.get("maxValue");
        let V = a;
        return x !== void 0 && (V = Math.max(V, x)), T !== void 0 && (V = Math.min(V, T)), V;
      }
      onInputChange_(a) {
        const f = a.currentTarget.value, x = this.parser_(f);
        h(x) || (this.value.rawValue = this.constrainValue_(x)), this.view.refresh();
      }
      onInputKeyDown_(a) {
        const u = Xt(this.baseStep_, vn(a));
        u !== 0 && this.value.setRawValue(this.constrainValue_(this.value.rawValue + u), {
          forceEmit: false,
          last: false
        });
      }
      onInputKeyUp_(a) {
        Xt(this.baseStep_, vn(a)) !== 0 && this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
      onPointerDown_() {
        this.originRawValue_ = this.value.rawValue, this.dragging_.rawValue = 0;
      }
      computeDraggingValue_(a) {
        if (!a.point)
          return null;
        const u = a.point.x - a.bounds.width / 2;
        return this.constrainValue_(this.originRawValue_ + u * this.props.get("draggingScale"));
      }
      onPointerMove_(a) {
        const u = this.computeDraggingValue_(a.data);
        u !== null && (this.value.setRawValue(u, {
          forceEmit: false,
          last: false
        }), this.dragging_.rawValue = this.value.rawValue - this.originRawValue_);
      }
      onPointerUp_(a) {
        const u = this.computeDraggingValue_(a.data);
        u !== null && (this.value.setRawValue(u, {
          forceEmit: true,
          last: true
        }), this.dragging_.rawValue = null);
      }
    }
    function nt(m, a) {
      m.write(a);
    }
    function qt(m) {
      const a = m ? Ct(m, L) : null;
      return a ? a.step : null;
    }
    function gn(m, a) {
      const u = m && Ct(m, L);
      return u ? ds(u.step) : Math.max(ds(a), 2);
    }
    function Ti(m) {
      const a = qt(m);
      return a ?? 1;
    }
    function Wn(m, a) {
      var u;
      const f = m && Ct(m, L), x = Math.abs((u = f == null ? void 0 : f.step) !== null && u !== void 0 ? u : a);
      return x === 0 ? 0.1 : Math.pow(10, Math.floor(Math.log10(x)) - 1);
    }
    function Qt(m) {
      return [m[0], m[1], m[2]];
    }
    function ms(m) {
      const a = Yt(Math.floor(m), 0, 255).toString(16);
      return a.length === 1 ? `0${a}` : a;
    }
    function _n(m, a = "#") {
      const u = Qt(m.getComponents("rgb")).map(ms).join("");
      return `${a}${u}`;
    }
    function fs(m, a = "#") {
      const u = m.getComponents("rgb"), f = [u[0], u[1], u[2], u[3] * 255].map(ms).join("");
      return `${a}${f}`;
    }
    function mr(m, a) {
      const u = Ie(a === "float" ? 2 : 0);
      return `rgb(${Qt(m.getComponents("rgb", a)).map((x) => u(x)).join(", ")})`;
    }
    function vs(m) {
      return (a) => mr(a, m);
    }
    function bs(m, a) {
      const u = Ie(2), f = Ie(a === "float" ? 2 : 0);
      return `rgba(${m.getComponents("rgb", a).map((T, V) => (V === 3 ? u : f)(T)).join(", ")})`;
    }
    function fr(m) {
      return (a) => bs(a, m);
    }
    function Jn(m) {
      const a = [
        Ie(0),
        Qn,
        Qn
      ];
      return `hsl(${Qt(m.getComponents("hsl")).map((f, x) => a[x](f)).join(", ")})`;
    }
    function vr(m) {
      const a = [
        Ie(0),
        Qn,
        Qn,
        Ie(2)
      ];
      return `hsla(${m.getComponents("hsl").map((f, x) => a[x](f)).join(", ")})`;
    }
    function gs(m, a) {
      const u = Ie(a === "float" ? 2 : 0), f = ["r", "g", "b"];
      return `{${Qt(m.getComponents("rgb", a)).map((T, V) => `${f[V]}: ${u(T)}`).join(", ")}}`;
    }
    function _s(m) {
      return (a) => gs(a, m);
    }
    function br(m, a) {
      const u = Ie(2), f = Ie(a === "float" ? 2 : 0), x = ["r", "g", "b", "a"];
      return `{${m.getComponents("rgb", a).map((V, j) => {
        const oe = j === 3 ? u : f;
        return `${x[j]}: ${oe(V)}`;
      }).join(", ")}}`;
    }
    function gr(m) {
      return (a) => br(a, m);
    }
    [
      ...["int", "float"].reduce((m, a) => [
        ...m,
        {
          format: {
            alpha: false,
            mode: "rgb",
            notation: "func",
            type: a
          },
          stringifier: vs(a)
        },
        {
          format: {
            alpha: true,
            mode: "rgb",
            notation: "func",
            type: a
          },
          stringifier: fr(a)
        },
        {
          format: {
            alpha: false,
            mode: "rgb",
            notation: "object",
            type: a
          },
          stringifier: _s(a)
        },
        {
          format: {
            alpha: true,
            mode: "rgb",
            notation: "object",
            type: a
          },
          stringifier: gr(a)
        }
      ], [])
    ];
    class _r {
      constructor(a) {
        this.components = a.components, this.asm_ = a.assembly;
      }
      constrain(a) {
        const u = this.asm_.toComponents(a).map((f, x) => {
          var T, V;
          return (V = (T = this.components[x]) === null || T === void 0 ? void 0 : T.constrain(f)) !== null && V !== void 0 ? V : f;
        });
        return this.asm_.fromComponents(u);
      }
    }
    const ws = y("pndtxt");
    class wr {
      constructor(a, u) {
        this.textViews = u.textViews, this.element = a.createElement("div"), this.element.classList.add(ws()), this.textViews.forEach((f) => {
          const x = a.createElement("div");
          x.classList.add(ws("a")), x.appendChild(f.element), this.element.appendChild(x);
        });
      }
    }
    function ki(m, a, u) {
      return new bn(m, {
        arrayPosition: u === 0 ? "fst" : u === a.axes.length - 1 ? "lst" : "mid",
        baseStep: a.axes[u].baseStep,
        parser: a.parser,
        props: a.axes[u].textProps,
        value: H(0, {
          constraint: a.axes[u].constraint
        }),
        viewProps: a.viewProps
      });
    }
    class It {
      constructor(a, u) {
        this.value = u.value, this.viewProps = u.viewProps, this.acs_ = u.axes.map((f, x) => ki(a, u, x)), this.acs_.forEach((f, x) => {
          $t({
            primary: this.value,
            secondary: f.value,
            forward: (T) => u.assembly.toComponents(T.rawValue)[x],
            backward: (T, V) => {
              const j = u.assembly.toComponents(T.rawValue);
              return j[x] = V.rawValue, u.assembly.fromComponents(j);
            }
          });
        }), this.view = new wr(a, {
          textViews: this.acs_.map((f) => f.view)
        });
      }
    }
    function yr(m, a) {
      return "step" in m && !h(m.step) ? new L(m.step, a) : null;
    }
    function wn(m) {
      return !h(m.max) && !h(m.min) ? new gt({
        max: m.max,
        min: m.min
      }) : !h(m.max) || !h(m.min) ? new Rt2({
        max: m.max,
        min: m.min
      }) : null;
    }
    const xr = {
      monitor: {
        defaultInterval: 200,
        defaultLineCount: 3
      }
    }, lt = y("grl");
    class ys {
      constructor(a, u) {
        this.onCursorChange_ = this.onCursorChange_.bind(this), this.onValueUpdate_ = this.onValueUpdate_.bind(this), this.element = a.createElement("div"), this.element.classList.add(lt()), u.viewProps.bindClassModifiers(this.element), this.formatter_ = u.formatter, this.props_ = u.props, this.cursor_ = u.cursor, this.cursor_.emitter.on("change", this.onCursorChange_);
        const f = a.createElementNS(ye, "svg");
        f.classList.add(lt("g")), f.style.height = `calc(var(--bld-us) * ${u.lineCount})`, this.element.appendChild(f), this.svgElem_ = f;
        const x = a.createElementNS(ye, "polyline");
        this.svgElem_.appendChild(x), this.lineElem_ = x;
        const T = a.createElement("div");
        T.classList.add(lt("t"), y("tt")()), this.element.appendChild(T), this.tooltipElem_ = T, u.value.emitter.on("change", this.onValueUpdate_), this.value = u.value, this.update_();
      }
      get graphElement() {
        return this.svgElem_;
      }
      update_() {
        const a = this.svgElem_.getBoundingClientRect(), u = this.value.rawValue.length - 1, f = this.props_.get("minValue"), x = this.props_.get("maxValue"), T = [];
        this.value.rawValue.forEach((et, te) => {
          if (et === void 0)
            return;
          const kt = Ae(te, 0, u, 0, a.width), Or = Ae(et, f, x, a.height, 0);
          T.push([kt, Or].join(","));
        }), this.lineElem_.setAttributeNS(null, "points", T.join(" "));
        const V = this.tooltipElem_, j = this.value.rawValue[this.cursor_.rawValue];
        if (j === void 0) {
          V.classList.remove(lt("t", "a"));
          return;
        }
        const oe = Ae(this.cursor_.rawValue, 0, u, 0, a.width), Je = Ae(j, f, x, a.height, 0);
        V.style.left = `${oe}px`, V.style.top = `${Je}px`, V.textContent = `${this.formatter_(j)}`, V.classList.contains(lt("t", "a")) || (V.classList.add(lt("t", "a"), lt("t", "in")), rt(V), V.classList.remove(lt("t", "in")));
      }
      onValueUpdate_() {
        this.update_();
      }
      onCursorChange_() {
        this.update_();
      }
    }
    class Er {
      constructor(a, u) {
        if (this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this), this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this), this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this), this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this), this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this), this.props_ = u.props, this.value = u.value, this.viewProps = u.viewProps, this.cursor_ = H(-1), this.view = new ys(a, {
          cursor: this.cursor_,
          formatter: u.formatter,
          lineCount: u.lineCount,
          props: this.props_,
          value: this.value,
          viewProps: this.viewProps
        }), !Qe(a))
          this.view.element.addEventListener("mousemove", this.onGraphMouseMove_), this.view.element.addEventListener("mouseleave", this.onGraphMouseLeave_);
        else {
          const f = new Zn(this.view.element);
          f.emitter.on("down", this.onGraphPointerDown_), f.emitter.on("move", this.onGraphPointerMove_), f.emitter.on("up", this.onGraphPointerUp_);
        }
      }
      onGraphMouseLeave_() {
        this.cursor_.rawValue = -1;
      }
      onGraphMouseMove_(a) {
        const u = this.view.element.getBoundingClientRect();
        this.cursor_.rawValue = Math.floor(Ae(a.offsetX, 0, u.width, 0, this.value.rawValue.length));
      }
      onGraphPointerDown_(a) {
        this.onGraphPointerMove_(a);
      }
      onGraphPointerMove_(a) {
        if (!a.data.point) {
          this.cursor_.rawValue = -1;
          return;
        }
        this.cursor_.rawValue = Math.floor(Ae(a.data.point.x, 0, a.data.bounds.width, 0, this.value.rawValue.length));
      }
      onGraphPointerUp_() {
        this.cursor_.rawValue = -1;
      }
    }
    class xs {
      constructor(a) {
        this.controller_ = a;
      }
      get disabled() {
        return this.controller_.viewProps.get("disabled");
      }
      set disabled(a) {
        this.controller_.viewProps.set("disabled", a);
      }
      get title() {
        var a;
        return (a = this.controller_.props.get("title")) !== null && a !== void 0 ? a : "";
      }
      set title(a) {
        this.controller_.props.set("title", a);
      }
      on(a, u) {
        const f = u.bind(this);
        return this.controller_.emitter.on(a, () => {
          f(new o(this));
        }), this;
      }
    }
    class Cr extends o {
      constructor(a, u, f) {
        super(a), this.cell = u, this.index = f;
      }
    }
    class Es extends r {
      constructor(a) {
        super(a), this.cellToApiMap_ = /* @__PURE__ */ new Map(), this.emitter_ = new w();
        const u = this.controller_.valueController;
        u.cellControllers.forEach((f, x) => {
          const T = new xs(f);
          this.cellToApiMap_.set(f, T), f.emitter.on("click", () => {
            const V = x % u.size[0], j = Math.floor(x / u.size[0]);
            this.emitter_.emit("click", {
              event: new Cr(this, T, [V, j])
            });
          });
        });
      }
      cell(a, u) {
        const f = this.controller_.valueController, x = f.cellControllers[u * f.size[0] + a];
        return this.cellToApiMap_.get(x);
      }
      on(a, u) {
        const f = u.bind(this);
        return this.emitter_.on(a, (x) => {
          f(x.event);
        }), this;
      }
    }
    class Mi {
      constructor(a, u) {
        this.size = u.size;
        const [f, x] = this.size, T = [];
        for (let V = 0; V < x; V++)
          for (let j = 0; j < f; j++) {
            const oe = new G(a, {
              props: K.fromObject(Object.assign({}, u.cellConfig(j, V))),
              viewProps: ge.create()
            });
            T.push(oe);
          }
        this.cellCs_ = T, this.viewProps = ge.create(), this.viewProps.handleDispose(() => {
          this.cellCs_.forEach((V) => {
            V.viewProps.set("disposed", true);
          });
        }), this.view = new Et(a, {
          viewProps: this.viewProps,
          viewName: "btngrid"
        }), this.view.element.style.gridTemplateColumns = `repeat(${f}, 1fr)`, this.cellCs_.forEach((V) => {
          this.view.element.appendChild(V.view.element);
        });
      }
      get cellControllers() {
        return this.cellCs_;
      }
    }
    const Pr = {
      id: "buttongrid",
      type: "blade",
      // TODO:
      css: '.tp-cbzgv,.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-radv_b:hover,.tp-rslv_k:hover,.tp-cbzv_b:hover{background-color:var(--btn-bg-h)}.tp-radv_b:focus,.tp-rslv_k:focus,.tp-cbzv_b:focus{background-color:var(--btn-bg-f)}.tp-radv_b:active,.tp-rslv_k:active,.tp-cbzv_b:active{background-color:var(--btn-bg-a)}.tp-radv_b:disabled,.tp-rslv_k:disabled,.tp-cbzv_b:disabled{opacity:.5}.tp-cbzgv{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-cbzgv:hover{background-color:var(--in-bg-h)}.tp-cbzgv:focus{background-color:var(--in-bg-f)}.tp-cbzgv:active{background-color:var(--in-bg-a)}.tp-cbzgv:disabled{opacity:.5}.tp-btngridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-btngridv.tp-v-disabled{opacity:.5}.tp-btngridv .tp-btnv_b:disabled{opacity:1}.tp-btngridv .tp-btnv_b:disabled .tp-btnv_t{opacity:.5}.tp-btngridv .tp-btnv_b{border-radius:0}.tp-cbzv{position:relative}.tp-cbzv_h{display:flex}.tp-cbzv_b{margin-right:4px;position:relative;width:var(--bld-us)}.tp-cbzv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-cbzv_b svg path{stroke:var(--bs-bg);stroke-width:2}.tp-cbzv_t{flex:1}.tp-cbzv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-cbzv.tp-cbzv-expanded .tp-cbzv_p{margin-top:var(--bld-s);opacity:1}.tp-cbzv.tp-cbzv-cpl .tp-cbzv_p{overflow:visible}.tp-cbzv .tp-popv{left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-cbzpv_t{margin-top:var(--bld-s)}.tp-cbzgv{height:auto;overflow:hidden;position:relative}.tp-cbzgv.tp-v-disabled{opacity:.5}.tp-cbzgv_p{left:16px;position:absolute;right:16px;top:0}.tp-cbzgv_g{cursor:pointer;display:block;height:calc(var(--bld-us)*5);width:100%}.tp-cbzgv_u{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_l{fill:rgba(0,0,0,0);stroke:var(--in-fg)}.tp-cbzgv_v{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_h{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;pointer-events:none;position:absolute;width:4px}.tp-cbzgv:focus .tp-cbzgv_h-sel{background-color:var(--in-fg);border-width:0}.tp-cbzprvv{cursor:pointer;height:4px;padding:4px 0;position:relative}.tp-cbzprvv_g{display:block;height:100%;overflow:visible;width:100%}.tp-cbzprvv_t{opacity:.5;stroke:var(--mo-fg)}.tp-cbzprvv_m{background-color:var(--mo-fg);border-radius:50%;height:4px;margin-left:-2px;margin-top:-2px;opacity:0;position:absolute;top:50%;transition:opacity .2s ease-out;width:4px}.tp-cbzprvv_m.tp-cbzprvv_m-a{opacity:1}.tp-fpsv{position:relative}.tp-fpsv_l{bottom:4px;color:var(--mo-fg);line-height:1;right:4px;pointer-events:none;position:absolute}.tp-fpsv_u{margin-left:.2em;opacity:.7}.tp-rslv{cursor:pointer;padding-left:8px;padding-right:8px}.tp-rslv.tp-v-disabled{opacity:.5}.tp-rslv_t{height:calc(var(--bld-us));position:relative}.tp-rslv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:-4px;right:-4px}.tp-rslv_b{bottom:0;top:0;position:absolute}.tp-rslv_b::before{background-color:var(--in-fg);content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:0;right:0}.tp-rslv_k{height:calc(var(--bld-us) - 8px);margin-top:calc((var(--bld-us) - 8px)/-2);position:absolute;top:50%;width:8px}.tp-rslv_k.tp-rslv_k-min{margin-left:-8px}.tp-rslv_k.tp-rslv_k-max{margin-left:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-min{border-bottom-right-radius:0;border-top-right-radius:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-max{border-bottom-left-radius:0;border-top-left-radius:0}.tp-rsltxtv{display:flex}.tp-rsltxtv_s{flex:1}.tp-rsltxtv_t{flex:1;margin-left:4px}.tp-radv_l{display:block;position:relative}.tp-radv_i{left:0;opacity:0;position:absolute;top:0}.tp-radv_b{opacity:.5}.tp-radv_i:hover+.tp-radv_b{background-color:var(--btn-bg-h)}.tp-radv_i:focus+.tp-radv_b{background-color:var(--btn-bg-f)}.tp-radv_i:active+.tp-radv_b{background-color:var(--btn-bg-a)}.tp-radv_i:checked+.tp-radv_b{opacity:1}.tp-radv_t{bottom:0;color:inherit;left:0;overflow:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0}.tp-radv_i:disabled+.tp-radv_b>.tp-radv_t{opacity:.5}.tp-radgridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-radgridv.tp-v-disabled{opacity:.5}.tp-radgridv .tp-radv_b{border-radius:0}',
      accept(m) {
        const a = he, u = ee(m, {
          cells: a.required.function,
          size: a.required.array(a.required.number),
          view: a.required.constant("buttongrid"),
          label: a.optional.string
        });
        return u ? { params: u } : null;
      },
      controller(m) {
        return new ot(m.document, {
          blade: m.blade,
          props: K.fromObject({
            label: m.params.label
          }),
          valueController: new Mi(m.document, {
            cellConfig: m.params.cells,
            size: m.params.size
          })
        });
      },
      api(m) {
        return !(m.controller instanceof ot) || !(m.controller.valueController instanceof Mi) ? null : new Es(m.controller);
      }
    };
    class Cs extends r {
      get label() {
        return this.controller_.props.get("label");
      }
      set label(a) {
        this.controller_.props.set("label", a);
      }
      get value() {
        return this.controller_.valueController.value.rawValue;
      }
      set value(a) {
        this.controller_.valueController.value.rawValue = a;
      }
      on(a, u) {
        const f = u.bind(this);
        return this.controller_.valueController.value.emitter.on(a, (x) => {
          f(new c(this, x.rawValue, void 0, x.options.last));
        }), this;
      }
    }
    function We(m, a, u) {
      return m * (1 - u) + a * u;
    }
    const Tr = 20, kr = 1e-3, Si = 100;
    function Mr(m, a) {
      let u = 0.25, f = 0.5, x = -1;
      for (let T = 0; T < Tr; T++) {
        const [V, j] = m.curve(f);
        if (f += u * (V < a ? 1 : -1), x = j, u *= 0.5, Math.abs(a - V) < kr)
          break;
      }
      return x;
    }
    class Pt {
      constructor(a = 0, u = 0, f = 1, x = 1) {
        this.cache_ = [], this.comps_ = [a, u, f, x];
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
      static isObject(a) {
        return h(a) || !Array.isArray(a) ? false : typeof a[0] == "number" && typeof a[1] == "number" && typeof a[2] == "number" && typeof a[3] == "number";
      }
      static equals(a, u) {
        return a.x1 === u.x1 && a.y1 === u.y1 && a.x2 === u.x2 && a.y2 === u.y2;
      }
      curve(a) {
        const u = We(0, this.x1, a), f = We(0, this.y1, a), x = We(this.x1, this.x2, a), T = We(this.y1, this.y2, a), V = We(this.x2, 1, a), j = We(this.y2, 1, a), oe = We(u, x, a), Je = We(f, T, a), et = We(x, V, a), te = We(T, j, a);
        return [We(oe, et, a), We(Je, te, a)];
      }
      y(a) {
        if (this.cache_.length === 0) {
          const u = [];
          for (let f = 0; f < Si; f++)
            u.push(Mr(this, Ae(f, 0, Si - 1, 0, 1)));
          this.cache_ = u;
        }
        return this.cache_[Math.round(Ae(Yt(a, 0, 1), 0, 1, 0, Si - 1))];
      }
      toObject() {
        return [this.comps_[0], this.comps_[1], this.comps_[2], this.comps_[3]];
      }
    }
    const Li = {
      toComponents: (m) => m.toObject(),
      fromComponents: (m) => new Pt(...m)
    };
    function Sr(m) {
      const a = Ie(2);
      return `cubic-bezier(${m.toObject().map((f) => a(f)).join(", ")})`;
    }
    const Ai = [0, 0.5, 0.5, 1];
    function Lr(m) {
      const a = m.match(/^cubic-bezier\s*\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*\)$/);
      if (!a)
        return new Pt(...Ai);
      const u = [a[1], a[2], a[3], a[4]].reduce((f, x) => {
        if (!f)
          return null;
        const T = Number(x);
        return isNaN(T) ? null : [...f, T];
      }, []);
      return new Pt(...u ?? Ai);
    }
    const Dt = y("cbz");
    class Ps {
      constructor(a, u) {
        this.element = a.createElement("div"), this.element.classList.add(Dt()), u.viewProps.bindClassModifiers(this.element), u.foldable.bindExpandedClass(this.element, Dt(void 0, "expanded")), A(u.foldable, "completed", F(this.element, Dt(void 0, "cpl")));
        const f = a.createElement("div");
        f.classList.add(Dt("h")), this.element.appendChild(f);
        const x = a.createElement("button");
        x.classList.add(Dt("b")), u.viewProps.bindDisabled(x);
        const T = a.createElementNS(ye, "svg");
        T.innerHTML = '<path d="M2 13C8 13 8 3 14 3"/>', x.appendChild(T), f.appendChild(x), this.buttonElement = x;
        const V = a.createElement("div");
        if (V.classList.add(Dt("t")), f.appendChild(V), this.textElement = V, u.pickerLayout === "inline") {
          const j = a.createElement("div");
          j.classList.add(Dt("p")), this.element.appendChild(j), this.pickerElement = j;
        } else
          this.pickerElement = null;
      }
    }
    const ei = y("cbzp");
    class Ts {
      constructor(a, u) {
        this.element = a.createElement("div"), this.element.classList.add(ei()), u.viewProps.bindClassModifiers(this.element);
        const f = a.createElement("div");
        f.classList.add(ei("g")), this.element.appendChild(f), this.graphElement = f;
        const x = a.createElement("div");
        x.classList.add(ei("t")), this.element.appendChild(x), this.textElement = x;
      }
    }
    function ct(m, a) {
      const u = new MutationObserver((x) => {
        for (const T of x)
          T.type === "childList" && T.addedNodes.forEach((V) => {
            V.contains(V) && (a(), u.disconnect());
          });
      }), f = m.ownerDocument;
      u.observe(f.body, {
        attributes: true,
        childList: true,
        subtree: true
      });
    }
    const _t = y("cbzg");
    function Ar(m, a) {
      return (u) => a(m(u));
    }
    class De {
      constructor(a, u) {
        this.element = a.createElement("div"), this.element.classList.add(_t()), u.viewProps.bindClassModifiers(this.element), u.viewProps.bindTabIndex(this.element);
        const f = a.createElement("div");
        f.classList.add(_t("p")), this.element.appendChild(f), this.previewElement = f;
        const x = a.createElementNS(ye, "svg");
        x.classList.add(_t("g")), this.element.appendChild(x), this.svgElem_ = x;
        const T = a.createElementNS(ye, "path");
        T.classList.add(_t("u")), this.svgElem_.appendChild(T), this.guideElem_ = T;
        const V = a.createElementNS(ye, "polyline");
        V.classList.add(_t("l")), this.svgElem_.appendChild(V), this.lineElem_ = V, this.handleElems_ = [a.createElement("div"), a.createElement("div")], this.handleElems_.forEach((j) => {
          j.classList.add(_t("h")), this.element.appendChild(j);
        }), this.vectorElems_ = [
          a.createElementNS(ye, "line"),
          a.createElementNS(ye, "line")
        ], this.vectorElems_.forEach((j) => {
          j.classList.add(_t("v")), this.svgElem_.appendChild(j);
        }), this.value_ = u.value, this.value_.emitter.on("change", this.onValueChange_.bind(this)), this.sel_ = u.selection, this.handleElems_.forEach((j, oe) => {
          k(this.sel_, Ar((Je) => Je === oe, F(j, _t("h", "sel"))));
        }), ct(this.element, () => {
          this.refresh();
        });
      }
      getVertMargin_(a) {
        return a * 0.25;
      }
      valueToPosition(a, u) {
        const f = this.element.getBoundingClientRect(), x = f.width, T = f.height, V = this.getVertMargin_(T);
        return {
          x: Ae(a, 0, 1, 0, x),
          y: Ae(u, 0, 1, T - V, V)
        };
      }
      positionToValue(a, u) {
        const f = this.element.getBoundingClientRect(), x = f.width, T = f.height, V = this.getVertMargin_(T);
        return {
          x: Yt(Ae(a, 0, x, 0, 1), 0, 1),
          y: Ae(u, T - V, V, 0, 1)
        };
      }
      refresh() {
        this.guideElem_.setAttributeNS(null, "d", [0, 1].map((T) => {
          const V = this.valueToPosition(0, T), j = this.valueToPosition(1, T);
          return [`M ${V.x},${V.y}`, `L ${j.x},${j.y}`].join(" ");
        }).join(" "));
        const a = this.value_.rawValue, u = [];
        let f = 0;
        for (; ; ) {
          const T = this.valueToPosition(...a.curve(f));
          if (u.push([T.x, T.y].join(",")), f >= 1)
            break;
          f = Math.min(f + 0.05, 1);
        }
        this.lineElem_.setAttributeNS(null, "points", u.join(" "));
        const x = a.toObject();
        [0, 1].forEach((T) => {
          const V = this.valueToPosition(T, T), j = this.valueToPosition(x[T * 2], x[T * 2 + 1]), oe = this.vectorElems_[T];
          oe.setAttributeNS(null, "x1", String(V.x)), oe.setAttributeNS(null, "y1", String(V.y)), oe.setAttributeNS(null, "x2", String(j.x)), oe.setAttributeNS(null, "y2", String(j.y));
          const Je = this.handleElems_[T];
          Je.style.left = `${j.x}px`, Je.style.top = `${j.y}px`;
        });
      }
      onValueChange_() {
        this.refresh();
      }
    }
    const ks = 24, yn = 400, Ri = 1e3, Tt = y("cbzprv");
    class Zt {
      constructor(a, u) {
        this.stopped_ = true, this.startTime_ = -1, this.onDispose_ = this.onDispose_.bind(this), this.onTimer_ = this.onTimer_.bind(this), this.onValueChange_ = this.onValueChange_.bind(this), this.element = a.createElement("div"), this.element.classList.add(Tt()), u.viewProps.bindClassModifiers(this.element);
        const f = a.createElementNS(ye, "svg");
        f.classList.add(Tt("g")), this.element.appendChild(f), this.svgElem_ = f;
        const x = a.createElementNS(ye, "path");
        x.classList.add(Tt("t")), this.svgElem_.appendChild(x), this.ticksElem_ = x;
        const T = a.createElement("div");
        T.classList.add(Tt("m")), this.element.appendChild(T), this.markerElem_ = T, this.value_ = u.value, this.value_.emitter.on("change", this.onValueChange_), u.viewProps.handleDispose(this.onDispose_), ct(this.element, () => {
          this.refresh();
        });
      }
      play() {
        this.stop(), this.updateMarker_(0), this.markerElem_.classList.add(Tt("m", "a")), this.startTime_ = (/* @__PURE__ */ new Date()).getTime() + yn, this.stopped_ = false, requestAnimationFrame(this.onTimer_);
      }
      stop() {
        this.stopped_ = true, this.markerElem_.classList.remove(Tt("m", "a"));
      }
      onDispose_() {
        this.stop();
      }
      updateMarker_(a) {
        const u = this.value_.rawValue.y(Yt(a, 0, 1));
        this.markerElem_.style.left = `${u * 100}%`;
      }
      refresh() {
        const a = this.svgElem_.getBoundingClientRect(), u = a.width, f = a.height, x = [], T = this.value_.rawValue;
        for (let V = 0; V < ks; V++) {
          const j = Ae(V, 0, ks - 1, 0, 1), oe = Ae(T.y(j), 0, 1, 0, u);
          x.push(`M ${oe},0 v${f}`);
        }
        this.ticksElem_.setAttributeNS(null, "d", x.join(" "));
      }
      onTimer_() {
        if (this.startTime_ === null)
          return;
        const a = (/* @__PURE__ */ new Date()).getTime() - this.startTime_, u = a / Ri;
        this.updateMarker_(u), a > Ri + yn && this.stop(), this.stopped_ || requestAnimationFrame(this.onTimer_);
      }
      onValueChange_() {
        this.refresh(), this.play();
      }
    }
    function ze(m, a, u, f) {
      const x = u - m, T = f - a;
      return Math.sqrt(x * x + T * T);
    }
    function xn(m, a, u, f) {
      const x = ze(m, a, u, f), T = Math.atan2(f - a, u - m), V = Math.round(T / (Math.PI / 4)) * Math.PI / 4;
      return {
        x: m + Math.cos(V) * x,
        y: a + Math.sin(V) * x
      };
    }
    class ut {
      constructor(a, u) {
        this.onKeyDown_ = this.onKeyDown_.bind(this), this.onKeyUp_ = this.onKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.baseStep_ = u.baseStep, this.value = u.value, this.sel_ = H(0), this.viewProps = u.viewProps, this.view = new De(a, {
          selection: this.sel_,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.element.addEventListener("keydown", this.onKeyDown_), this.view.element.addEventListener("keyup", this.onKeyUp_), this.prevView_ = new Zt(a, {
          value: this.value,
          viewProps: this.viewProps
        }), this.prevView_.element.addEventListener("mousedown", (x) => {
          x.stopImmediatePropagation(), x.preventDefault(), this.prevView_.play();
        }), this.view.previewElement.appendChild(this.prevView_.element);
        const f = new Zn(this.view.element);
        f.emitter.on("down", this.onPointerDown_), f.emitter.on("move", this.onPointerMove_), f.emitter.on("up", this.onPointerUp_);
      }
      refresh() {
        this.view.refresh(), this.prevView_.refresh(), this.prevView_.play();
      }
      updateValue_(a, u, f) {
        const x = this.sel_.rawValue, T = this.value.rawValue.toObject(), V = this.view.positionToValue(a.x, a.y), j = u ? xn(x, x, V.x, V.y) : V;
        T[x * 2] = j.x, T[x * 2 + 1] = j.y, this.value.setRawValue(new Pt(...T), f);
      }
      onPointerDown_(a) {
        const u = a.data;
        if (!u.point)
          return;
        const f = this.value.rawValue, x = this.view.valueToPosition(f.x1, f.y1), T = ze(u.point.x, u.point.y, x.x, x.y), V = this.view.valueToPosition(f.x2, f.y2), j = ze(u.point.x, u.point.y, V.x, V.y);
        this.sel_.rawValue = T <= j ? 0 : 1, this.updateValue_(u.point, a.shiftKey, {
          forceEmit: false,
          last: false
        });
      }
      onPointerMove_(a) {
        const u = a.data;
        u.point && this.updateValue_(u.point, a.shiftKey, {
          forceEmit: false,
          last: false
        });
      }
      onPointerUp_(a) {
        const u = a.data;
        u.point && this.updateValue_(u.point, a.shiftKey, {
          forceEmit: true,
          last: true
        });
      }
      onKeyDown_(a) {
        hs(a.key) && a.preventDefault();
        const u = this.sel_.rawValue, f = this.value.rawValue.toObject();
        f[u * 2] += Xt(this.baseStep_, Ci(a)), f[u * 2 + 1] += Xt(this.baseStep_, vn(a)), this.value.setRawValue(new Pt(...f), {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(a) {
        hs(a.key) && a.preventDefault();
        const u = Xt(this.baseStep_, Ci(a)), f = Xt(this.baseStep_, vn(a));
        u === 0 && f === 0 || this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    class Ms {
      constructor(a, u) {
        this.value = u.value, this.viewProps = u.viewProps, this.view = new Ts(a, {
          viewProps: this.viewProps
        }), this.gc_ = new ut(a, {
          baseStep: u.axis.baseStep,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.graphElement.appendChild(this.gc_.view.element);
        const f = Object.assign(Object.assign({}, u.axis), { constraint: new Rt2({ max: 1, min: 0 }) }), x = Object.assign(Object.assign({}, u.axis), { constraint: void 0 });
        this.tc_ = new It(a, {
          assembly: Li,
          axes: [f, x, f, x],
          parser: fn,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.textElement.appendChild(this.tc_.view.element);
      }
      get allFocusableElements() {
        return [
          this.gc_.view.element,
          ...this.tc_.view.textViews.map((a) => a.inputElement)
        ];
      }
      refresh() {
        this.gc_.refresh();
      }
    }
    class ti {
      constructor(a, u) {
        this.onButtonBlur_ = this.onButtonBlur_.bind(this), this.onButtonClick_ = this.onButtonClick_.bind(this), this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this), this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this), this.value = u.value, this.viewProps = u.viewProps, this.foldable_ = Gn(u.expanded), this.view = new Ps(a, {
          foldable: this.foldable_,
          pickerLayout: u.pickerLayout,
          viewProps: this.viewProps
        }), this.view.buttonElement.addEventListener("blur", this.onButtonBlur_), this.view.buttonElement.addEventListener("click", this.onButtonClick_), this.tc_ = new Ht(a, {
          parser: Lr,
          props: K.fromObject({
            formatter: Sr
          }),
          value: this.value,
          viewProps: this.viewProps
        }), this.view.textElement.appendChild(this.tc_.view.element), this.popC_ = u.pickerLayout === "popup" ? new ie(a, {
          viewProps: this.viewProps
        }) : null;
        const f = new Ms(a, {
          axis: u.axis,
          value: this.value,
          viewProps: this.viewProps
        });
        f.allFocusableElements.forEach((x) => {
          x.addEventListener("blur", this.onPopupChildBlur_), x.addEventListener("keydown", this.onPopupChildKeydown_);
        }), this.pickerC_ = f, this.popC_ ? (this.view.element.appendChild(this.popC_.view.element), this.popC_.view.element.appendChild(this.pickerC_.view.element), k(this.popC_.shows, (x) => {
          x && f.refresh();
        }), $t({
          primary: this.foldable_.value("expanded"),
          secondary: this.popC_.shows,
          forward: (x) => x.rawValue,
          backward: (x, T) => T.rawValue
        })) : this.view.pickerElement && (this.view.pickerElement.appendChild(this.pickerC_.view.element), Kn(this.foldable_, this.view.pickerElement));
      }
      onButtonBlur_(a) {
        if (!this.popC_)
          return;
        const u = a.relatedTarget;
        (!u || !this.popC_.view.element.contains(u)) && (this.popC_.shows.rawValue = false);
      }
      onButtonClick_() {
        this.foldable_.set("expanded", !this.foldable_.get("expanded")), this.foldable_.get("expanded") && this.pickerC_.allFocusableElements[0].focus();
      }
      onPopupChildBlur_(a) {
        if (!this.popC_)
          return;
        const u = this.popC_.view.element, f = cn(a);
        f && u.contains(f) || f && f === this.view.buttonElement && !Qe(u.ownerDocument) || (this.popC_.shows.rawValue = false);
      }
      onPopupChildKeydown_(a) {
        this.popC_ && a.key === "Escape" && (this.popC_.shows.rawValue = false);
      }
    }
    function Vi() {
      return new _r({
        assembly: Li,
        components: [0, 1, 2, 3].map((m) => m % 2 === 0 ? new Rt2({
          min: 0,
          max: 1
        }) : void 0)
      });
    }
    const Ot = {
      id: "cubic-bezier",
      type: "blade",
      css: '.tp-cbzgv,.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-radv_b:hover,.tp-rslv_k:hover,.tp-cbzv_b:hover{background-color:var(--btn-bg-h)}.tp-radv_b:focus,.tp-rslv_k:focus,.tp-cbzv_b:focus{background-color:var(--btn-bg-f)}.tp-radv_b:active,.tp-rslv_k:active,.tp-cbzv_b:active{background-color:var(--btn-bg-a)}.tp-radv_b:disabled,.tp-rslv_k:disabled,.tp-cbzv_b:disabled{opacity:.5}.tp-cbzgv{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-cbzgv:hover{background-color:var(--in-bg-h)}.tp-cbzgv:focus{background-color:var(--in-bg-f)}.tp-cbzgv:active{background-color:var(--in-bg-a)}.tp-cbzgv:disabled{opacity:.5}.tp-btngridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-btngridv.tp-v-disabled{opacity:.5}.tp-btngridv .tp-btnv_b:disabled{opacity:1}.tp-btngridv .tp-btnv_b:disabled .tp-btnv_t{opacity:.5}.tp-btngridv .tp-btnv_b{border-radius:0}.tp-cbzv{position:relative}.tp-cbzv_h{display:flex}.tp-cbzv_b{margin-right:4px;position:relative;width:var(--bld-us)}.tp-cbzv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-cbzv_b svg path{stroke:var(--bs-bg);stroke-width:2}.tp-cbzv_t{flex:1}.tp-cbzv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-cbzv.tp-cbzv-expanded .tp-cbzv_p{margin-top:var(--bld-s);opacity:1}.tp-cbzv.tp-cbzv-cpl .tp-cbzv_p{overflow:visible}.tp-cbzv .tp-popv{left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-cbzpv_t{margin-top:var(--bld-s)}.tp-cbzgv{height:auto;overflow:hidden;position:relative}.tp-cbzgv.tp-v-disabled{opacity:.5}.tp-cbzgv_p{left:16px;position:absolute;right:16px;top:0}.tp-cbzgv_g{cursor:pointer;display:block;height:calc(var(--bld-us)*5);width:100%}.tp-cbzgv_u{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_l{fill:rgba(0,0,0,0);stroke:var(--in-fg)}.tp-cbzgv_v{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_h{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;pointer-events:none;position:absolute;width:4px}.tp-cbzgv:focus .tp-cbzgv_h-sel{background-color:var(--in-fg);border-width:0}.tp-cbzprvv{cursor:pointer;height:4px;padding:4px 0;position:relative}.tp-cbzprvv_g{display:block;height:100%;overflow:visible;width:100%}.tp-cbzprvv_t{opacity:.5;stroke:var(--mo-fg)}.tp-cbzprvv_m{background-color:var(--mo-fg);border-radius:50%;height:4px;margin-left:-2px;margin-top:-2px;opacity:0;position:absolute;top:50%;transition:opacity .2s ease-out;width:4px}.tp-cbzprvv_m.tp-cbzprvv_m-a{opacity:1}.tp-fpsv{position:relative}.tp-fpsv_l{bottom:4px;color:var(--mo-fg);line-height:1;right:4px;pointer-events:none;position:absolute}.tp-fpsv_u{margin-left:.2em;opacity:.7}.tp-rslv{cursor:pointer;padding-left:8px;padding-right:8px}.tp-rslv.tp-v-disabled{opacity:.5}.tp-rslv_t{height:calc(var(--bld-us));position:relative}.tp-rslv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:-4px;right:-4px}.tp-rslv_b{bottom:0;top:0;position:absolute}.tp-rslv_b::before{background-color:var(--in-fg);content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:0;right:0}.tp-rslv_k{height:calc(var(--bld-us) - 8px);margin-top:calc((var(--bld-us) - 8px)/-2);position:absolute;top:50%;width:8px}.tp-rslv_k.tp-rslv_k-min{margin-left:-8px}.tp-rslv_k.tp-rslv_k-max{margin-left:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-min{border-bottom-right-radius:0;border-top-right-radius:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-max{border-bottom-left-radius:0;border-top-left-radius:0}.tp-rsltxtv{display:flex}.tp-rsltxtv_s{flex:1}.tp-rsltxtv_t{flex:1;margin-left:4px}.tp-radv_l{display:block;position:relative}.tp-radv_i{left:0;opacity:0;position:absolute;top:0}.tp-radv_b{opacity:.5}.tp-radv_i:hover+.tp-radv_b{background-color:var(--btn-bg-h)}.tp-radv_i:focus+.tp-radv_b{background-color:var(--btn-bg-f)}.tp-radv_i:active+.tp-radv_b{background-color:var(--btn-bg-a)}.tp-radv_i:checked+.tp-radv_b{opacity:1}.tp-radv_t{bottom:0;color:inherit;left:0;overflow:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0}.tp-radv_i:disabled+.tp-radv_b>.tp-radv_t{opacity:.5}.tp-radgridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-radgridv.tp-v-disabled{opacity:.5}.tp-radgridv .tp-radv_b{border-radius:0}',
      accept(m) {
        const a = he, u = ee(m, {
          value: a.required.array(a.required.number),
          view: a.required.constant("cubicbezier"),
          expanded: a.optional.boolean,
          label: a.optional.string,
          picker: a.optional.custom((f) => f === "inline" || f === "popup" ? f : void 0)
        });
        return u ? { params: u } : null;
      },
      controller(m) {
        var a, u;
        const f = new Pt(...m.params.value), x = H(f, {
          constraint: Vi(),
          equals: Pt.equals
        }), T = new ti(m.document, {
          axis: {
            baseStep: 0.1,
            textProps: K.fromObject({
              draggingScale: 0.01,
              formatter: Ie(2)
            })
          },
          expanded: (a = m.params.expanded) !== null && a !== void 0 ? a : false,
          pickerLayout: (u = m.params.picker) !== null && u !== void 0 ? u : "popup",
          value: x,
          viewProps: m.viewProps
        });
        return new At(m.document, {
          blade: m.blade,
          props: K.fromObject({
            label: m.params.label
          }),
          valueController: T
        });
      },
      api(m) {
        return !(m.controller instanceof At) || !(m.controller.valueController instanceof ti) ? null : new Cs(m.controller);
      }
    };
    class we extends r {
      begin() {
        this.controller_.valueController.begin();
      }
      end() {
        this.controller_.valueController.end();
      }
    }
    const Ii = 20;
    class Re {
      constructor() {
        this.start_ = null, this.duration_ = 0, this.fps_ = null, this.frameCount_ = 0, this.timestamps_ = [];
      }
      get duration() {
        return this.duration_;
      }
      get fps() {
        return this.fps_;
      }
      begin(a) {
        this.start_ = a.getTime();
      }
      calculateFps_(a) {
        if (this.timestamps_.length === 0)
          return null;
        const u = this.timestamps_[0];
        return 1e3 * (this.frameCount_ - u.frameCount) / (a - u.time);
      }
      compactTimestamps_() {
        if (this.timestamps_.length <= Ii)
          return;
        const a = this.timestamps_.length - Ii;
        this.timestamps_.splice(0, a);
        const u = this.timestamps_[0].frameCount;
        this.timestamps_.forEach((f) => {
          f.frameCount -= u;
        }), this.frameCount_ -= u;
      }
      end(a) {
        if (this.start_ === null)
          return;
        const u = a.getTime();
        this.duration_ = u - this.start_, this.start_ = null, this.fps_ = this.calculateFps_(u), this.timestamps_.push({
          frameCount: this.frameCount_,
          time: u
        }), ++this.frameCount_, this.compactTimestamps_();
      }
    }
    const Wt = y("fps");
    class Ye {
      constructor(a, u) {
        this.element = a.createElement("div"), this.element.classList.add(Wt()), u.viewProps.bindClassModifiers(this.element), this.graphElement = a.createElement("div"), this.graphElement.classList.add(Wt("g")), this.element.appendChild(this.graphElement);
        const f = a.createElement("div");
        f.classList.add(Wt("l")), this.element.appendChild(f);
        const x = a.createElement("span");
        x.classList.add(Wt("v")), x.textContent = "--", f.appendChild(x), this.valueElement = x;
        const T = a.createElement("span");
        T.classList.add(Wt("u")), T.textContent = "FPS", f.appendChild(T);
      }
    }
    class Di {
      constructor(a, u) {
        this.stopwatch_ = new Re(), this.onTick_ = this.onTick_.bind(this), this.ticker_ = u.ticker, this.ticker_.emitter.on("tick", this.onTick_), this.value_ = u.value, this.viewProps = u.viewProps, this.view = new Ye(a, {
          viewProps: this.viewProps
        }), this.graphC_ = new Er(a, {
          formatter: Ie(0),
          lineCount: u.lineCount,
          props: K.fromObject({
            maxValue: u.maxValue,
            minValue: u.minValue
          }),
          value: this.value_,
          viewProps: this.viewProps
        }), this.view.graphElement.appendChild(this.graphC_.view.element), this.viewProps.handleDispose(() => {
          this.graphC_.viewProps.set("disposed", true), this.ticker_.dispose();
        });
      }
      begin() {
        this.stopwatch_.begin(/* @__PURE__ */ new Date());
      }
      end() {
        this.stopwatch_.end(/* @__PURE__ */ new Date());
      }
      onTick_() {
        const a = this.stopwatch_.fps;
        if (a !== null) {
          const u = this.value_.rawValue;
          this.value_.rawValue = pr(u, a), this.view.valueElement.textContent = a.toFixed(0);
        }
      }
    }
    function En(m, a) {
      return a === 0 ? new $n() : new pn(m, a ?? xr.monitor.defaultInterval);
    }
    const Oi = {
      id: "fpsgraph",
      type: "blade",
      accept(m) {
        const a = he, u = ee(m, {
          view: a.required.constant("fpsgraph"),
          interval: a.optional.number,
          label: a.optional.string,
          lineCount: a.optional.number,
          max: a.optional.number,
          min: a.optional.number
        });
        return u ? { params: u } : null;
      },
      controller(m) {
        var a, u, f, x;
        const T = (a = m.params.interval) !== null && a !== void 0 ? a : 500;
        return new ot(m.document, {
          blade: m.blade,
          props: K.fromObject({
            label: m.params.label
          }),
          valueController: new Di(m.document, {
            lineCount: (u = m.params.lineCount) !== null && u !== void 0 ? u : 2,
            maxValue: (f = m.params.max) !== null && f !== void 0 ? f : 90,
            minValue: (x = m.params.min) !== null && x !== void 0 ? x : 0,
            ticker: En(m.document, T),
            value: us(80),
            viewProps: m.viewProps
          })
        });
      },
      api(m) {
        return !(m.controller instanceof ot) || !(m.controller.valueController instanceof Di) ? null : new we(m.controller);
      }
    };
    class qe {
      constructor(a, u) {
        this.min = a, this.max = u;
      }
      static isObject(a) {
        if (typeof a != "object" || a === null)
          return false;
        const u = a.min, f = a.max;
        return !(typeof u != "number" || typeof f != "number");
      }
      static equals(a, u) {
        return a.min === u.min && a.max === u.max;
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
    const Fi = {
      fromComponents: (m) => new qe(m[0], m[1]),
      toComponents: (m) => [m.min, m.max]
    };
    class Cn {
      constructor(a) {
        this.edge = a;
      }
      constrain(a) {
        var u, f, x, T, V, j, oe, Je;
        if (a.min <= a.max)
          return new qe((f = (u = this.edge) === null || u === void 0 ? void 0 : u.constrain(a.min)) !== null && f !== void 0 ? f : a.min, (T = (x = this.edge) === null || x === void 0 ? void 0 : x.constrain(a.max)) !== null && T !== void 0 ? T : a.max);
        const et = (a.min + a.max) / 2;
        return new qe((j = (V = this.edge) === null || V === void 0 ? void 0 : V.constrain(et)) !== null && j !== void 0 ? j : et, (Je = (oe = this.edge) === null || oe === void 0 ? void 0 : oe.constrain(et)) !== null && Je !== void 0 ? Je : et);
      }
    }
    const Ni = y("rsltxt");
    class ni {
      constructor(a, u) {
        this.sliderView_ = u.sliderView, this.textView_ = u.textView, this.element = a.createElement("div"), this.element.classList.add(Ni());
        const f = a.createElement("div");
        f.classList.add(Ni("s")), f.appendChild(this.sliderView_.element), this.element.appendChild(f);
        const x = a.createElement("div");
        x.classList.add(Ni("t")), x.appendChild(this.textView_.element), this.element.appendChild(x);
      }
    }
    const it = y("rsl");
    class Pn {
      constructor(a, u) {
        this.onSliderPropsChange_ = this.onSliderPropsChange_.bind(this), this.onValueChange_ = this.onValueChange_.bind(this), this.sliderProps_ = u.sliderProps, this.sliderProps_.emitter.on("change", this.onSliderPropsChange_), this.element = a.createElement("div"), this.element.classList.add(it()), u.viewProps.bindClassModifiers(this.element), this.value_ = u.value, this.value_.emitter.on("change", this.onValueChange_);
        const f = a.createElement("div");
        f.classList.add(it("t")), this.element.appendChild(f), this.trackElement = f;
        const x = a.createElement("div");
        x.classList.add(it("b")), f.appendChild(x), this.barElement = x;
        const T = ["min", "max"].map((V) => {
          const j = a.createElement("div");
          return j.classList.add(it("k"), it("k", V)), f.appendChild(j), j;
        });
        this.knobElements = [T[0], T[1]], this.update_();
      }
      valueToX_(a) {
        const u = this.sliderProps_.get("minValue"), f = this.sliderProps_.get("maxValue");
        return Yt(Ae(a, u, f, 0, 1), 0, 1) * 100;
      }
      update_() {
        const a = this.value_.rawValue;
        a.length === 0 ? this.element.classList.add(it(void 0, "zero")) : this.element.classList.remove(it(void 0, "zero"));
        const u = [this.valueToX_(a.min), this.valueToX_(a.max)];
        this.barElement.style.left = `${u[0]}%`, this.barElement.style.right = `${100 - u[1]}%`, this.knobElements.forEach((f, x) => {
          f.style.left = `${u[x]}%`;
        });
      }
      onSliderPropsChange_() {
        this.update_();
      }
      onValueChange_() {
        this.update_();
      }
    }
    class Bi {
      constructor(a, u) {
        this.grabbing_ = null, this.grabOffset_ = 0, this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.sliderProps = u.sliderProps, this.viewProps = u.viewProps, this.value = u.value, this.view = new Pn(a, {
          sliderProps: this.sliderProps,
          value: this.value,
          viewProps: u.viewProps
        });
        const f = new Zn(this.view.trackElement);
        f.emitter.on("down", this.onPointerDown_), f.emitter.on("move", this.onPointerMove_), f.emitter.on("up", this.onPointerUp_);
      }
      ofs_() {
        return this.grabbing_ === "min" ? this.view.knobElements[0].getBoundingClientRect().width / 2 : this.grabbing_ === "max" ? -this.view.knobElements[1].getBoundingClientRect().width / 2 : 0;
      }
      valueFromData_(a) {
        if (!a.point)
          return null;
        const u = (a.point.x + this.ofs_()) / a.bounds.width, f = this.sliderProps.get("minValue"), x = this.sliderProps.get("maxValue");
        return Ae(u, 0, 1, f, x);
      }
      onPointerDown_(a) {
        if (!a.data.point)
          return;
        const u = a.data.point.x / a.data.bounds.width, f = this.value.rawValue, x = this.sliderProps.get("minValue"), T = this.sliderProps.get("maxValue"), V = Ae(f.min, x, T, 0, 1), j = Ae(f.max, x, T, 0, 1);
        Math.abs(j - u) <= 0.025 ? this.grabbing_ = "max" : Math.abs(V - u) <= 0.025 ? this.grabbing_ = "min" : u >= V && u <= j ? (this.grabbing_ = "length", this.grabOffset_ = Ae(u - V, 0, 1, 0, T - x)) : u < V ? (this.grabbing_ = "min", this.onPointerMove_(a)) : u > j && (this.grabbing_ = "max", this.onPointerMove_(a));
      }
      applyPointToValue_(a, u) {
        const f = this.valueFromData_(a);
        if (f === null)
          return;
        const x = this.sliderProps.get("minValue"), T = this.sliderProps.get("maxValue");
        if (this.grabbing_ === "min")
          this.value.setRawValue(new qe(f, this.value.rawValue.max), u);
        else if (this.grabbing_ === "max")
          this.value.setRawValue(new qe(this.value.rawValue.min, f), u);
        else if (this.grabbing_ === "length") {
          const V = this.value.rawValue.length;
          let j = f - this.grabOffset_, oe = j + V;
          j < x ? (j = x, oe = x + V) : oe > T && (j = T - V, oe = T), this.value.setRawValue(new qe(j, oe), u);
        }
      }
      onPointerMove_(a) {
        this.applyPointToValue_(a.data, {
          forceEmit: false,
          last: false
        });
      }
      onPointerUp_(a) {
        this.applyPointToValue_(a.data, {
          forceEmit: true,
          last: true
        }), this.grabbing_ = null;
      }
    }
    class wt {
      constructor(a, u) {
        this.value = u.value, this.viewProps = u.viewProps, this.sc_ = new Bi(a, u);
        const f = {
          baseStep: u.baseStep,
          constraint: u.constraint,
          textProps: K.fromObject({
            draggingScale: u.draggingScale,
            formatter: u.formatter
          })
        };
        this.tc_ = new It(a, {
          assembly: Fi,
          axes: [f, f],
          parser: u.parser,
          value: this.value,
          viewProps: u.viewProps
        }), this.view = new ni(a, {
          sliderView: this.sc_.view,
          textView: this.tc_.view
        });
      }
      get textController() {
        return this.tc_;
      }
    }
    function Ss(m) {
      return qe.isObject(m) ? new qe(m.min, m.max) : new qe(0, 0);
    }
    function zi(m, a) {
      m.writeProperty("max", a.max), m.writeProperty("min", a.min);
    }
    function Rr(m) {
      const a = [], u = wn(m);
      u && a.push(u);
      const f = yr(m);
      return f && a.push(f), new Cn(new Xn(a));
    }
    const ii = {
      id: "input-interval",
      type: "input",
      css: '.tp-cbzgv,.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-radv_b:hover,.tp-rslv_k:hover,.tp-cbzv_b:hover{background-color:var(--btn-bg-h)}.tp-radv_b:focus,.tp-rslv_k:focus,.tp-cbzv_b:focus{background-color:var(--btn-bg-f)}.tp-radv_b:active,.tp-rslv_k:active,.tp-cbzv_b:active{background-color:var(--btn-bg-a)}.tp-radv_b:disabled,.tp-rslv_k:disabled,.tp-cbzv_b:disabled{opacity:.5}.tp-cbzgv{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-cbzgv:hover{background-color:var(--in-bg-h)}.tp-cbzgv:focus{background-color:var(--in-bg-f)}.tp-cbzgv:active{background-color:var(--in-bg-a)}.tp-cbzgv:disabled{opacity:.5}.tp-btngridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-btngridv.tp-v-disabled{opacity:.5}.tp-btngridv .tp-btnv_b:disabled{opacity:1}.tp-btngridv .tp-btnv_b:disabled .tp-btnv_t{opacity:.5}.tp-btngridv .tp-btnv_b{border-radius:0}.tp-cbzv{position:relative}.tp-cbzv_h{display:flex}.tp-cbzv_b{margin-right:4px;position:relative;width:var(--bld-us)}.tp-cbzv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-cbzv_b svg path{stroke:var(--bs-bg);stroke-width:2}.tp-cbzv_t{flex:1}.tp-cbzv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-cbzv.tp-cbzv-expanded .tp-cbzv_p{margin-top:var(--bld-s);opacity:1}.tp-cbzv.tp-cbzv-cpl .tp-cbzv_p{overflow:visible}.tp-cbzv .tp-popv{left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-cbzpv_t{margin-top:var(--bld-s)}.tp-cbzgv{height:auto;overflow:hidden;position:relative}.tp-cbzgv.tp-v-disabled{opacity:.5}.tp-cbzgv_p{left:16px;position:absolute;right:16px;top:0}.tp-cbzgv_g{cursor:pointer;display:block;height:calc(var(--bld-us)*5);width:100%}.tp-cbzgv_u{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_l{fill:rgba(0,0,0,0);stroke:var(--in-fg)}.tp-cbzgv_v{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_h{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;pointer-events:none;position:absolute;width:4px}.tp-cbzgv:focus .tp-cbzgv_h-sel{background-color:var(--in-fg);border-width:0}.tp-cbzprvv{cursor:pointer;height:4px;padding:4px 0;position:relative}.tp-cbzprvv_g{display:block;height:100%;overflow:visible;width:100%}.tp-cbzprvv_t{opacity:.5;stroke:var(--mo-fg)}.tp-cbzprvv_m{background-color:var(--mo-fg);border-radius:50%;height:4px;margin-left:-2px;margin-top:-2px;opacity:0;position:absolute;top:50%;transition:opacity .2s ease-out;width:4px}.tp-cbzprvv_m.tp-cbzprvv_m-a{opacity:1}.tp-fpsv{position:relative}.tp-fpsv_l{bottom:4px;color:var(--mo-fg);line-height:1;right:4px;pointer-events:none;position:absolute}.tp-fpsv_u{margin-left:.2em;opacity:.7}.tp-rslv{cursor:pointer;padding-left:8px;padding-right:8px}.tp-rslv.tp-v-disabled{opacity:.5}.tp-rslv_t{height:calc(var(--bld-us));position:relative}.tp-rslv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:-4px;right:-4px}.tp-rslv_b{bottom:0;top:0;position:absolute}.tp-rslv_b::before{background-color:var(--in-fg);content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:0;right:0}.tp-rslv_k{height:calc(var(--bld-us) - 8px);margin-top:calc((var(--bld-us) - 8px)/-2);position:absolute;top:50%;width:8px}.tp-rslv_k.tp-rslv_k-min{margin-left:-8px}.tp-rslv_k.tp-rslv_k-max{margin-left:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-min{border-bottom-right-radius:0;border-top-right-radius:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-max{border-bottom-left-radius:0;border-top-left-radius:0}.tp-rsltxtv{display:flex}.tp-rsltxtv_s{flex:1}.tp-rsltxtv_t{flex:1;margin-left:4px}.tp-radv_l{display:block;position:relative}.tp-radv_i{left:0;opacity:0;position:absolute;top:0}.tp-radv_b{opacity:.5}.tp-radv_i:hover+.tp-radv_b{background-color:var(--btn-bg-h)}.tp-radv_i:focus+.tp-radv_b{background-color:var(--btn-bg-f)}.tp-radv_i:active+.tp-radv_b{background-color:var(--btn-bg-a)}.tp-radv_i:checked+.tp-radv_b{opacity:1}.tp-radv_t{bottom:0;color:inherit;left:0;overflow:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0}.tp-radv_i:disabled+.tp-radv_b>.tp-radv_t{opacity:.5}.tp-radgridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-radgridv.tp-v-disabled{opacity:.5}.tp-radgridv .tp-radv_b{border-radius:0}',
      accept: (m, a) => {
        if (!qe.isObject(m))
          return null;
        const u = he, f = ee(a, {
          format: u.optional.function,
          max: u.optional.number,
          min: u.optional.number,
          step: u.optional.number
        });
        return f ? {
          initialValue: new qe(m.min, m.max),
          params: f
        } : null;
      },
      binding: {
        reader: (m) => Ss,
        constraint: (m) => Rr(m.params),
        equals: qe.equals,
        writer: (m) => zi
      },
      controller(m) {
        var a;
        const u = m.value, f = m.constraint;
        if (!(f instanceof Cn))
          throw g.shouldNeverHappen();
        const x = (u.rawValue.min + u.rawValue.max) / 2, T = (a = m.params.format) !== null && a !== void 0 ? a : Ie(gn(f.edge, x)), V = f.edge && Ct(f.edge, gt);
        if (V)
          return new wt(m.document, {
            baseStep: Ti(f.edge),
            constraint: f.edge,
            draggingScale: Wn(f.edge, x),
            formatter: T,
            parser: fn,
            sliderProps: new K({
              maxValue: V.values.value("max"),
              minValue: V.values.value("min")
            }),
            value: u,
            viewProps: m.viewProps
          });
        const j = {
          baseStep: Ti(f.edge),
          constraint: f.edge,
          textProps: K.fromObject({
            draggingScale: x,
            formatter: T
          })
        };
        return new It(m.document, {
          assembly: Fi,
          axes: [j, j],
          parser: fn,
          value: u,
          viewProps: m.viewProps
        });
      }
    };
    class Ft {
      constructor(a) {
        this.controller_ = a;
      }
      get disabled() {
        return this.controller_.viewProps.get("disabled");
      }
      set disabled(a) {
        this.controller_.viewProps.set("disabled", a);
      }
      get title() {
        var a;
        return (a = this.controller_.props.get("title")) !== null && a !== void 0 ? a : "";
      }
      set title(a) {
        this.controller_.props.set("title", a);
      }
    }
    class Nt extends c {
      constructor(a, u, f, x, T) {
        super(a, x, T), this.cell = u, this.index = f;
      }
    }
    class Tn extends r {
      constructor(a) {
        super(a), this.cellToApiMap_ = /* @__PURE__ */ new Map(), this.controller_.valueController.cellControllers.forEach((f) => {
          const x = new Ft(f);
          this.cellToApiMap_.set(f, x);
        });
      }
      get value() {
        return this.controller_.value;
      }
      cell(a, u) {
        const f = this.controller_.valueController, x = f.cellControllers[u * f.size[0] + a];
        return this.cellToApiMap_.get(x);
      }
      on(a, u) {
        const f = u.bind(this);
        this.controller_.value.emitter.on(a, (x) => {
          const T = this.controller_.valueController, V = T.findCellByValue(x.rawValue);
          if (!V)
            return;
          const j = this.cellToApiMap_.get(V);
          if (!j)
            return;
          const oe = T.cellControllers.indexOf(V);
          f(new Nt(this, j, [oe % T.size[0], Math.floor(oe / T.size[0])], x.rawValue, void 0));
        });
      }
    }
    const kn = y("rad");
    class Ls {
      constructor(a, u) {
        this.element = a.createElement("div"), this.element.classList.add(kn()), u.viewProps.bindClassModifiers(this.element);
        const f = a.createElement("label");
        f.classList.add(kn("l")), this.element.appendChild(f);
        const x = a.createElement("input");
        x.classList.add(kn("i")), x.name = u.name, x.type = "radio", u.viewProps.bindDisabled(x), f.appendChild(x), this.inputElement = x;
        const T = a.createElement("div");
        T.classList.add(kn("b")), f.appendChild(T);
        const V = a.createElement("div");
        V.classList.add(kn("t")), T.appendChild(V), A(u.props, "title", (j) => {
          V.textContent = j;
        });
      }
    }
    class As {
      constructor(a, u) {
        this.props = u.props, this.viewProps = u.viewProps, this.view = new Ls(a, {
          name: u.name,
          props: this.props,
          viewProps: this.viewProps
        });
      }
    }
    class si {
      constructor(a, u) {
        this.cellCs_ = [], this.cellValues_ = [], this.onCellInputChange_ = this.onCellInputChange_.bind(this), this.size = u.size;
        const [f, x] = this.size;
        for (let T = 0; T < x; T++)
          for (let V = 0; V < f; V++) {
            const j = new As(a, {
              name: u.groupName,
              props: K.fromObject(Object.assign({}, u.cellConfig(V, T))),
              viewProps: ge.create()
            });
            this.cellCs_.push(j), this.cellValues_.push(u.cellConfig(V, T).value);
          }
        this.value = u.value, k(this.value, (T) => {
          const V = this.findCellByValue(T);
          V && (V.view.inputElement.checked = true);
        }), this.viewProps = ge.create(), this.view = new Et(a, {
          viewProps: this.viewProps,
          viewName: "radgrid"
        }), this.view.element.style.gridTemplateColumns = `repeat(${f}, 1fr)`, this.cellCs_.forEach((T) => {
          T.view.inputElement.addEventListener("change", this.onCellInputChange_), this.view.element.appendChild(T.view.element);
        });
      }
      get cellControllers() {
        return this.cellCs_;
      }
      findCellByValue(a) {
        const u = this.cellValues_.findIndex((f) => f === a);
        return u < 0 ? null : this.cellCs_[u];
      }
      onCellInputChange_(a) {
        const u = a.currentTarget, f = this.cellCs_.findIndex((x) => x.view.inputElement === u);
        f < 0 || (this.value.rawValue = this.cellValues_[f]);
      }
    }
    const Bt = function() {
      return {
        id: "radiogrid",
        type: "blade",
        accept(m) {
          const a = he, u = ee(m, {
            cells: a.required.function,
            groupName: a.required.string,
            size: a.required.array(a.required.number),
            value: a.required.raw,
            view: a.required.constant("radiogrid"),
            label: a.optional.string
          });
          return u ? { params: u } : null;
        },
        controller(m) {
          return new At(m.document, {
            blade: m.blade,
            props: K.fromObject({
              label: m.params.label
            }),
            valueController: new si(m.document, {
              groupName: m.params.groupName,
              cellConfig: m.params.cells,
              size: m.params.size,
              value: H(m.params.value)
            })
          });
        },
        api(m) {
          return !(m.controller instanceof At) || !(m.controller.valueController instanceof si) ? null : new Tn(m.controller);
        }
      };
    }();
    function ji(m) {
      return {
        id: "input-radiogrid",
        type: "input",
        accept(a, u) {
          if (!m.isType(a))
            return null;
          const f = he, x = ee(u, {
            cells: f.required.function,
            groupName: f.required.string,
            size: f.required.array(f.required.number),
            view: f.required.constant("radiogrid")
          });
          return x ? {
            initialValue: a,
            params: x
          } : null;
        },
        binding: m.binding,
        controller: (a) => new si(a.document, {
          cellConfig: a.params.cells,
          groupName: a.params.groupName,
          size: a.params.size,
          value: a.value
        })
      };
    }
    const Vr = ji({
      isType: (m) => typeof m == "number",
      binding: {
        reader: (m) => cr,
        writer: (m) => nt
      }
    }), Ir = ji({
      isType: (m) => typeof m == "string",
      binding: {
        reader: (m) => cs,
        writer: (m) => nt
      }
    }), Dr = ji({
      isType: (m) => typeof m == "boolean",
      binding: {
        reader: (m) => hn,
        writer: (m) => nt
      }
    }), Rs = [
      Pr,
      Ot,
      Oi,
      ii,
      Bt,
      Dr,
      Vr,
      Ir
    ];
    s.ButtonCellApi = xs, s.ButtonGridApi = Es, s.ButtonGridController = Mi, s.CubicBezier = Pt, s.CubicBezierApi = Cs, s.CubicBezierAssembly = Li, s.CubicBezierController = ti, s.CubicBezierGraphController = ut, s.CubicBezierGraphView = De, s.CubicBezierPickerController = Ms, s.CubicBezierPickerView = Ts, s.CubicBezierPreviewView = Zt, s.CubicBezierView = Ps, s.FpsGraphBladeApi = we, s.FpsGraphController = Di, s.FpsView = Ye, s.Fpswatch = Re, s.Interval = qe, s.IntervalAssembly = Fi, s.IntervalConstraint = Cn, s.RadioCellApi = Ft, s.RadioController = As, s.RadioGridApi = Tn, s.RadioGridController = si, s.RadioView = Ls, s.RangeSliderController = Bi, s.RangeSliderTextController = wt, s.RangeSliderTextView = ni, s.RangeSliderView = Pn, s.TpRadioGridChangeEvent = Nt, s.plugins = Rs, Object.defineProperty(s, "__esModule", { value: true });
  });
})(Dh, ts);
var Oh = vh(ts);
var Fh = $u({
  __proto__: null,
  default: Oh
}, [ts]);
var Vn;
var Bs;
var Rd = (v = "tres-container") => {
  Vn || (Vn = new Ks.Pane({
    container: document.querySelector(v) || void 0
  }), Vn.registerPlugin(Fh), Bs = Vn.addBlade({
    view: "fpsgraph",
    label: "fpsgraph"
  }));
  function n() {
    Vn && Vn.dispose();
  }
  return onMounted(() => {
    const { onBeforeLoop: s, onAfterLoop: r, resume: o } = Ee();
    o(), s(() => Bs.begin()), r(() => Bs.end());
  }), onUnmounted(() => {
    n();
  }), { pane: Vn, fpsGraph: Bs, disposeTweakPane: n };
};
function Vd(v, n) {
  const s = ref(n), r = new AnimationMixer(s.value), o = shallowReactive({});
  v.forEach((p) => {
    const h = r.clipAction(p, s.value);
    o[p.name] = h;
  });
  const { onLoop: c } = Ee();
  return c(({ delta: p }) => {
    r.update(p);
  }), {
    actions: o,
    mixer: r
  };
}
var zs = null;
function Nh(v, n) {
  return (s) => {
    n && n(s), v.draco && (zs || (zs = new gh()), zs.setDecoderPath(v.decoderPath || "https://www.gstatic.com/draco/versioned/decoders/1.4.3/"), s.setDRACOLoader(zs));
  };
}
async function Bh(v, n = {
  draco: false
}, s) {
  return await xt(bp, v, Nh(n, s));
}
var Id = defineComponent({
  name: "GLTFModel",
  props: ["path", "draco", "decoderPath"],
  async setup(v, { expose: n }) {
    const { state: s } = St(), r = ref();
    n({ model: r });
    const { scene: o } = await Bh(v.path, { draco: v.draco, decoderPath: v.decoderPath });
    return r.value = o, s.scene && s.scene.add(o), () => {
    };
  }
});
async function zh(v) {
  return await xt(th, v);
}
var Dd = defineComponent({
  name: "FBXModel",
  props: ["path"],
  async setup(v, { expose: n }) {
    const { state: s } = St();
    let r = null;
    function o() {
      return r;
    }
    return n({ getModel: o }), r = await zh(v.path), s.scene && r.isObject3D && s.scene.add(r), () => {
    };
  }
});
var jh = ["position", "a-scale"];
var Od = defineComponent({
  __name: "Stars",
  props: {
    size: { default: 0.1 },
    sizeAttenuation: { type: Boolean, default: true },
    transparent: { type: Boolean, default: true },
    alphaTest: { default: 0.01 },
    count: { default: 5e3 },
    depth: { default: 50 },
    radius: { default: 100 },
    factor: { default: 4 },
    alphaMap: { default: null }
  },
  setup(v, { expose: n }) {
    const s = v;
    let r = s.radius + s.depth;
    const o = s.depth / s.count, c = [], p = Array.from({ length: s.count }, () => (0.5 + 0.5 * Math.random()) * s.factor), h = (y) => new Vector3().setFromSpherical(new Spherical(y, Math.acos(1 - Math.random() * 2), Math.random() * 2 * Math.PI));
    for (let y = 0; y < s.count; y++)
      r -= o * Math.random(), c.push(...h(r).toArray());
    const d = new Float32Array(c), g = new Float32Array(p), w = computed(() => ({
      size: s.size,
      sizeAttenuation: s.sizeAttenuation,
      transparent: s.transparent,
      alphaTest: s.alphaTest,
      alphaMap: s.alphaMap
    })), _2 = shallowRef();
    return n({
      value: _2
    }), (y, P) => (openBlock(), createElementBlock("TresPoints", {
      ref_key: "starsRef",
      ref: _2
    }, [
      createBaseVNode("TresBufferGeometry", {
        position: [unref(d), 3],
        "a-scale": [unref(g), 1]
      }, null, 8, jh),
      createBaseVNode("TresPointsMaterial", normalizeProps(guardReactiveProps(unref(w))), null, 16)
    ], 512));
  }
});
var Uh = ["args", "center"];
var Fd = defineComponent({
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
  async setup(v, { expose: n }) {
    let s, r;
    const o = v, { extend: c } = St();
    c({ TextGeometry: Xp });
    const p = new dh(), h = useSlots(), d = computed(() => {
      var y;
      return o.text ? o.text : h.default ? (y = h.default()[0].children) == null ? void 0 : y.trim() : "TresJS";
    }), g = shallowRef();
    n({
      value: g
    });
    const w = ([s, r] = withAsyncContext(() => new Promise((y, P) => {
      try {
        typeof o.font == "string" ? p.load(o.font, (R) => {
          y(R);
        }) : y(o.font);
      } catch (R) {
        P(console.error("cientos", R));
      }
    })), s = await s, r(), s), _2 = computed(() => ({
      font: w,
      size: o.size,
      height: o.height,
      curveSegments: o.curveSegments,
      bevelEnabled: o.bevelEnabled,
      bevelThickness: o.bevelThickness,
      bevelSize: o.bevelSize,
      bevelOffset: o.bevelOffset,
      bevelSegments: o.bevelSegments
    }));
    return (y, P) => unref(w) ? (openBlock(), createElementBlock("TresMesh", mergeProps({
      key: 0,
      ref_key: "textRef",
      ref: g
    }, y.$attrs), [
      unref(d) ? (openBlock(), createElementBlock("TresTextGeometry", {
        key: 0,
        args: [unref(d), unref(_2)],
        center: v.center
      }, null, 8, Uh)) : createCommentVNode("", true),
      renderSlot(y.$slots, "default")
    ], 16)) : createCommentVNode("", true);
  }
});
var Gh = ["rotation"];
var Hh = ["args"];
var Kh = ["color"];
var Nd = defineComponent({
  __name: "Plane",
  props: {
    args: { default: () => [1, 1] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const s = shallowRef();
    return n({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "planeRef",
      ref: s,
      rotation: [-Math.PI / 2, 0, 0]
    }, r.$attrs), [
      createBaseVNode("TresPlaneGeometry", { args: v.args }, null, 8, Hh),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, Kh)
      ])
    ], 16, Gh));
  }
});
var $h = ["args"];
var Xh = ["color"];
var Bd = defineComponent({
  __name: "Box",
  props: {
    args: { default: () => [1, 1, 1] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const s = shallowRef();
    return n({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "boxRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresBoxGeometry", { args: v.args }, null, 8, $h),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, Xh)
      ])
    ], 16));
  }
});
var Yh = ["args"];
var qh = ["color"];
var zd = defineComponent({
  __name: "Sphere",
  props: {
    args: { default: () => [2, 32, 16] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const s = shallowRef();
    return n({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "sphereRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresSphereGeometry", { args: v.args }, null, 8, Yh),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, qh)
      ])
    ], 16));
  }
});
var Qh = ["args"];
var Zh = ["color"];
var jd = defineComponent({
  __name: "Torus",
  props: {
    args: { default: () => [1, 1, 16, 80] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const s = shallowRef();
    return n({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "torusRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresTorusGeometry", { args: v.args }, null, 8, Qh),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, Zh)
      ])
    ], 16));
  }
});
var Wh = ["args"];
var Jh = ["color"];
var Ud = defineComponent({
  __name: "TorusKnot",
  props: {
    args: { default: () => [1, 0.4, 64, 8] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const s = shallowRef();
    return n({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "torusKnotRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresTorusKnotGeometry", { args: v.args }, null, 8, Wh),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, Jh)
      ])
    ], 16));
  }
});
var ed = ["args"];
var td = ["color"];
var Gd = defineComponent({
  __name: "Circle",
  props: {
    args: { default: () => [1, 32, 0, Math.PI * 2] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const s = shallowRef();
    return n({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "circleRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresCircleGeometry", { args: v.args }, null, 8, ed),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, td)
      ])
    ], 16));
  }
});
var nd = ["args"];
var id = ["color"];
var Hd = defineComponent({
  __name: "Cone",
  props: {
    args: { default: () => [1, 1, 12, false, 0, Math.PI * 2] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const s = shallowRef();
    return n({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "coneRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresConeGeometry", { args: v.args }, null, 8, nd),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, id)
      ])
    ], 16));
  }
});
var sd = ["args"];
var rd = ["color"];
var Kd = defineComponent({
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
  setup(v, { expose: n }) {
    const s = shallowRef();
    return n({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "tubeRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresTubeGeometry", { args: v.args }, null, 8, sd),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, rd)
      ])
    ], 16));
  }
});
var od = ["args"];
var ad = ["color"];
var $d = defineComponent({
  __name: "Ring",
  props: {
    args: { default: () => [0.5, 1, 32] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const s = shallowRef();
    return n({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "ringRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresRingGeometry", { args: v.args }, null, 8, od),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, ad)
      ])
    ], 16));
  }
});
var ld = ["rotation"];
var cd = ["args"];
var ud = ["color"];
var Xd = defineComponent({
  __name: "Tetrahedron",
  props: {
    args: { default: () => [1, 0] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const s = shallowRef();
    return n({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "tetrahedronRef",
      ref: s,
      rotation: [-Math.PI / 2, 0, 0]
    }, r.$attrs), [
      createBaseVNode("TresTetrahedronGeometry", { args: v.args }, null, 8, cd),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, ud)
      ])
    ], 16, ld));
  }
});
var pd = ["args"];
var hd = ["color"];
var Yd = defineComponent({
  __name: "Icosahedron",
  props: {
    args: { default: () => [1, 0] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const s = shallowRef();
    return n({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "icosahedronRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresIcosahedronGeometry", { args: v.args }, null, 8, pd),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, hd)
      ])
    ], 16));
  }
});
var dd = ["args"];
var md = ["color"];
var qd = defineComponent({
  __name: "Octahedron",
  props: {
    args: { default: () => [1, 0] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const s = shallowRef();
    return n({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "octahedronRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresOctahedronGeometry", { args: v.args }, null, 8, dd),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, md)
      ])
    ], 16));
  }
});
var fd = ["args"];
var vd = ["color"];
var Qd = defineComponent({
  __name: "Dodecahedron",
  props: {
    args: { default: () => [1, 0] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const s = shallowRef();
    return n({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "dodecahedronRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresDodecahedronGeometry", { args: v.args }, null, 8, fd),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, vd)
      ])
    ], 16));
  }
});
var co = {
  sunset: "venice/venice_sunset_4k.hdr"
};
async function bd({
  files: v = ["/px.png", "/nx.png", "/py.png", "/ny.png", "/pz.png", "/nz.png"],
  blur: n = 0,
  background: s = false,
  path: r = "/",
  preset: o = void 0,
  encoding: c = void 0
}) {
  const { state: p } = St();
  if (o) {
    if (!(o in co))
      throw new Error("Preset must be one of: " + Object.keys(co).join(", "));
    v = co[o], r = "https://raw.githubusercontent.com/Tresjs/assets/main/textures/hdr/";
  }
  const h = Array.isArray(v), g = await xt(
    h ? CubeTextureLoader : bh,
    h ? [v] : v,
    (_2) => {
      r && _2.setPath(r), c && (_2.encoding = c);
    }
  ), w = h ? g[0] : g;
  return w && (w.mapping = h ? CubeReflectionMapping : EquirectangularReflectionMapping, w.encoding = c ?? h ? sRGBEncoding : LinearEncoding), p.scene && (p.scene.environment = w, s !== void 0 && (p.scene.background = w), n && (p.scene.backgroundBlurriness = n | 0)), w;
}
var Zd = defineComponent({
  name: "Environment",
  props: ["background", "blur", "files", "encoding", "path", "preset"],
  async setup(v, { expose: n }) {
    let s = null;
    return n({ getTexture: () => s }), s = await bd(v), () => {
    };
  }
});
var gd = ["position"];
var _d = ["position"];
var wd = ["scale"];
var yd = ["map", "map-encoding", "depth-test", "color", "opacity"];
var Wd = defineComponent({
  __name: "Smoke",
  props: {
    color: { default: "#ffffff" },
    opacity: { default: 0.5 },
    speed: { default: 0.4 },
    width: { default: 10 },
    depth: { default: 1.5 },
    segments: { default: 20 },
    texture: { default: "https://raw.githubusercontent.com/Tresjs/assets/main/textures/clouds/defaultCloud.png" },
    depthTest: { type: Boolean, default: true }
  },
  async setup(v, { expose: n }) {
    let s, r;
    const o = v, c = shallowRef(), p = shallowRef();
    n({
      value: c
    });
    const h = [...new Array(o.segments)].map((P, R) => ({
      x: o.width / 2 - Math.random() * o.width,
      y: o.width / 2 - Math.random() * o.width,
      scale: 0.4 + Math.sin((R + 1) / o.segments * Math.PI) * ((0.2 + Math.random()) * 10),
      density: Math.max(0.2, Math.random()),
      rotation: Math.max(2e-3, 5e-3 * Math.random()) * o.speed
    })), d = (P, R) => P / 6 * R * o.opacity, { map: g } = ([s, r] = withAsyncContext(() => Rt({ map: o.texture })), s = await s, r(), s), { state: w } = St(), _2 = computed(() => {
      var P;
      return (P = w.renderer) == null ? void 0 : P.outputEncoding;
    }), { onLoop: y } = Ee();
    return y(() => {
      var P, R;
      c.value && w.camera && p.value && ((P = p.value) == null || P.children.forEach((k, A) => {
        k.rotation.z += h[A].rotation;
      }), c.value.lookAt((R = w.camera) == null ? void 0 : R.position));
    }), (P, R) => (openBlock(), createElementBlock("TresGroup", mergeProps({
      ref_key: "smokeRef",
      ref: c
    }, P.$attrs), [
      createBaseVNode("TresGroup", {
        ref_key: "groupRef",
        ref: p,
        position: [0, 0, v.segments / 2 * v.depth]
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(h), ({ scale: k, x: A, y: z, density: F }, I) => (openBlock(), createElementBlock("TresMesh", {
          key: I,
          position: [A, z, -I * v.depth]
        }, [
          createBaseVNode("TresPlaneGeometry", {
            scale: [k, k, k],
            rotation: [0, 0, 0]
          }, null, 8, wd),
          createBaseVNode("TresMeshStandardMaterial", {
            map: unref(g),
            "map-encoding": unref(_2),
            "depth-test": v.depthTest,
            color: v.color,
            "depth-write": false,
            transparent: "",
            opacity: d(k, F)
          }, null, 8, yd)
        ], 8, _d))), 128))
      ], 8, gd)
    ], 16));
  }
});
var Jd = defineComponent({
  __name: "Levioso",
  props: {
    speed: { default: 1 },
    rotationFactor: { default: 1 },
    floatFactor: { default: 1 },
    range: { default: () => [-0.1, 0.1] }
  },
  setup(v, { expose: n }) {
    const s = v, r = shallowRef();
    n({
      value: r
    });
    const { onLoop: o } = Ee(), c = ref(Math.random() * 1e4);
    return o(({ elapsed: p }) => {
      var g, w;
      if (!r.value)
        return;
      const h = c.value + p;
      r.value.rotation.x = Math.cos(h / 4 * s.speed) / 8 * s.rotationFactor, r.value.rotation.y = Math.sin(h / 4 * s.speed) / 8 * s.rotationFactor, r.value.rotation.z = Math.sin(h / 4 * s.speed) / 20 * s.rotationFactor;
      let d = Math.sin(h / 4 * s.speed) / 10;
      d = MathUtils.mapLinear(d, -0.1, 0.1, ((g = s.range) == null ? void 0 : g[0]) ?? -0.1, ((w = s.range) == null ? void 0 : w[1]) ?? 0.1), r.value.position.y = d * s.floatFactor;
    }), (p, h) => (openBlock(), createElementBlock("TresGroup", mergeProps(p.$attrs, {
      ref_key: "groupRef",
      ref: r
    }), [
      renderSlot(p.$slots, "default")
    ], 16));
  }
});
var xd = class extends MeshStandardMaterial {
  constructor(s = {}) {
    super(s);
    Jr(this, "_time");
    Jr(this, "_factor");
    this.setValues(s), this._time = { value: 0 }, this._factor = { value: 1 };
  }
  onBeforeCompile(s) {
    s.uniforms || (s.uniforms = {}), s.uniforms.time = this._time, s.uniforms.factor = this._factor, s.vertexShader = `
        uniform float time;
        uniform float factor;
        ${s.vertexShader}
      `, s.vertexShader = s.vertexShader.replace(
      "#include <begin_vertex>",
      `float theta = sin( time + position.y ) / 2.0 * factor;
          float c = cos( theta );
          float s = sin( theta );
          mat3 m = mat3( c, 0, s, 0, 1, 0, -s, 0, c );
          vec3 transformed = vec3( position ) * m;
          vNormal = vNormal * m;`
    );
  }
  get time() {
    return this._time.value;
  }
  set time(s) {
    this._time.value = s;
  }
  get factor() {
    return this._factor.value;
  }
  set factor(s) {
    this._factor.value = s;
  }
};
var Ed = ["factor"];
var em = defineComponent({
  __name: "index",
  props: {
    speed: { default: 1 },
    factor: { default: 1 }
  },
  setup(v) {
    const n = v, s = shallowRef(), { extend: r } = St();
    r({ MeshWobbleMaterial: xd });
    const { onLoop: o } = Ee();
    return o(({ elapsed: c }) => {
      s.value && (s.value.time = c * (n == null ? void 0 : n.speed));
    }), (c, p) => (openBlock(), createElementBlock("TresMeshWobbleMaterial", mergeProps({
      ref_key: "materialRef",
      ref: s,
      factor: v.factor
    }, c.$attrs), null, 16, Ed));
  }
});
export {
  Bd as Box,
  Gd as Circle,
  Hd as Cone,
  Qd as Dodecahedron,
  Zd as Environment,
  Dd as FBXModel,
  Id as GLTFModel,
  Yd as Icosahedron,
  Jd as Levioso,
  em as MeshWobbleMaterial,
  qd as Octahedron,
  Md as OrbitControls,
  Ad as PamCameraMouse,
  Nd as Plane,
  Sd as PointerLockControls,
  $d as Ring,
  Wd as Smoke,
  zd as Sphere,
  Od as Stars,
  Xd as Tetrahedron,
  Fd as Text3D,
  jd as Torus,
  Ud as TorusKnot,
  Ld as TransformControls,
  Kd as Tube,
  Vd as useAnimations,
  bd as useEnvironment,
  zh as useFBX,
  Bh as useGLTF,
  Vh as usePamCameraMouse,
  Rd as useTweakPane
};
/*! Bundled license information:

@tresjs/cientos/dist/trescientos.js:
  (*! Tweakpane 3.1.7 (c) 2016 cocopon, licensed under the MIT license. *)
*/
//# sourceMappingURL=@tresjs_cientos.js.map
