import {
  D,
  Et,
  I,
  Me
} from "./chunk-DESKY23Y.js";
import {
  computed,
  createBaseVNode,
  createCommentVNode,
  createElementBlock,
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
  shallowReactive,
  shallowRef,
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
} from "./chunk-4QXXOI63.js";
import "./chunk-JC4IRQUL.js";

// node_modules/.pnpm/@tresjs+cientos@2.0.0-beta.1_@tresjs+core@2.0.0-beta.5_three@0.150.1_vue@3.2.47/node_modules/@tresjs/cientos/dist/trescientos.js
var Jc = Object.defineProperty;
var eu = (v, n, r) => n in v ? Jc(v, n, { enumerable: true, configurable: true, writable: true, value: r }) : v[n] = r;
var Zr = (v, n, r) => (eu(v, typeof n != "symbol" ? n + "" : n, r), r);
function Gu(v, n) {
  for (var r = 0; r < n.length; r++) {
    const s = n[r];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const a in s)
        if (a !== "default" && !(a in v)) {
          const c = Object.getOwnPropertyDescriptor(s, a);
          c && Object.defineProperty(v, a, c.get ? c : {
            enumerable: true,
            get: () => s[a]
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
function Hu(v, n) {
  if (Ji(v) !== "object" || v === null)
    return v;
  var r = v[Symbol.toPrimitive];
  if (r !== void 0) {
    var s = r.call(v, n || "default");
    if (Ji(s) !== "object")
      return s;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (n === "string" ? String : Number)(v);
}
function Ku(v) {
  var n = Hu(v, "string");
  return Ji(n) === "symbol" ? n : String(n);
}
function C(v, n, r) {
  return n = Ku(n), n in v ? Object.defineProperty(v, n, {
    value: r,
    enumerable: true,
    configurable: true,
    writable: true
  }) : v[n] = r, v;
}
var ht = Uint8Array;
var ln = Uint16Array;
var ho = Uint32Array;
var Ka = new ht([
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
var $a = new ht([
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
var $u = new ht([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var Xa = function(v, n) {
  for (var r = new ln(31), s = 0; s < 31; ++s)
    r[s] = n += 1 << v[s - 1];
  for (var a = new ho(r[30]), s = 1; s < 30; ++s)
    for (var c = r[s]; c < r[s + 1]; ++c)
      a[c] = c - r[s] << 5 | s;
  return [r, a];
};
var Ya = Xa(Ka, 2);
var qa = Ya[0];
var Xu = Ya[1];
qa[28] = 258, Xu[258] = 28;
var Yu = Xa($a, 0);
var qu = Yu[0];
var mo = new ln(32768);
for (Ce = 0; Ce < 32768; ++Ce) {
  sn = (Ce & 43690) >>> 1 | (Ce & 21845) << 1;
  sn = (sn & 52428) >>> 2 | (sn & 13107) << 2, sn = (sn & 61680) >>> 4 | (sn & 3855) << 4, mo[Ce] = ((sn & 65280) >>> 8 | (sn & 255) << 8) >>> 1;
}
var sn;
var Ce;
var qi = function(v, n, r) {
  for (var s = v.length, a = 0, c = new ln(n); a < s; ++a)
    ++c[v[a] - 1];
  var p = new ln(n);
  for (a = 0; a < n; ++a)
    p[a] = p[a - 1] + c[a - 1] << 1;
  var h;
  if (r) {
    h = new ln(1 << n);
    var d = 15 - n;
    for (a = 0; a < s; ++a)
      if (v[a])
        for (var g = a << 4 | v[a], w = n - v[a], _ = p[v[a] - 1]++ << w, y = _ | (1 << w) - 1; _ <= y; ++_)
          h[mo[_] >>> d] = g;
  } else
    for (h = new ln(s), a = 0; a < s; ++a)
      v[a] && (h[a] = mo[p[v[a] - 1]++] >>> 15 - v[a]);
  return h;
};
var ns = new ht(288);
for (Ce = 0; Ce < 144; ++Ce)
  ns[Ce] = 8;
var Ce;
for (Ce = 144; Ce < 256; ++Ce)
  ns[Ce] = 9;
var Ce;
for (Ce = 256; Ce < 280; ++Ce)
  ns[Ce] = 7;
var Ce;
for (Ce = 280; Ce < 288; ++Ce)
  ns[Ce] = 8;
var Ce;
var Qa = new ht(32);
for (Ce = 0; Ce < 32; ++Ce)
  Qa[Ce] = 5;
var Ce;
var Qu = qi(ns, 9, 1);
var Zu = qi(Qa, 5, 1);
var to = function(v) {
  for (var n = v[0], r = 1; r < v.length; ++r)
    v[r] > n && (n = v[r]);
  return n;
};
var wt = function(v, n, r) {
  var s = n / 8 | 0;
  return (v[s] | v[s + 1] << 8) >> (n & 7) & r;
};
var no = function(v, n) {
  var r = n / 8 | 0;
  return (v[r] | v[r + 1] << 8 | v[r + 2] << 16) >> (n & 7);
};
var Wu = function(v) {
  return (v / 8 | 0) + (v & 7 && 1);
};
var Ju = function(v, n, r) {
  (n == null || n < 0) && (n = 0), (r == null || r > v.length) && (r = v.length);
  var s = new (v instanceof ln ? ln : v instanceof ho ? ho : ht)(r - n);
  return s.set(v.subarray(n, r)), s;
};
var ep = function(v, n, r) {
  var s = v.length;
  if (!s || r && !r.l && s < 5)
    return n || new ht(0);
  var a = !n || r, c = !r || r.i;
  r || (r = {}), n || (n = new ht(s * 3));
  var p = function(Ve) {
    var Be = n.length;
    if (Ve > Be) {
      var we = new ht(Math.max(Be * 2, Ve));
      we.set(n), n = we;
    }
  }, h = r.f || 0, d = r.p || 0, g = r.b || 0, w = r.l, _ = r.d, y = r.m, P = r.n, I2 = s * 8;
  do {
    if (!w) {
      r.f = h = wt(v, d, 1);
      var S = wt(v, d + 1, 3);
      if (d += 3, S)
        if (S == 1)
          w = Qu, _ = Zu, y = 9, P = 5;
        else if (S == 2) {
          var V = wt(v, d, 31) + 257, D2 = wt(v, d + 10, 15) + 4, Y = V + wt(v, d + 5, 31) + 1;
          d += 14;
          for (var G = new ht(Y), N = new ht(19), O = 0; O < D2; ++O)
            N[$u[O]] = wt(v, d + O * 3, 7);
          d += D2 * 3;
          for (var H = to(N), K = (1 << H) - 1, q = qi(N, H, 1), O = 0; O < Y; ) {
            var pe = q[wt(v, d, K)];
            d += pe & 15;
            var R = pe >>> 4;
            if (R < 16)
              G[O++] = R;
            else {
              var ge = 0, ce = 0;
              for (R == 16 ? (ce = 3 + wt(v, d, 3), d += 2, ge = G[O - 1]) : R == 17 ? (ce = 3 + wt(v, d, 7), d += 3) : R == 18 && (ce = 11 + wt(v, d, 127), d += 7); ce--; )
                G[O++] = ge;
            }
          }
          var me = G.subarray(0, V), he = G.subarray(V);
          y = to(me), P = to(he), w = qi(me, y, 1), _ = qi(he, P, 1);
        } else
          throw "invalid block type";
      else {
        var R = Wu(d) + 4, j = v[R - 4] | v[R - 3] << 8, F = R + j;
        if (F > s) {
          if (c)
            throw "unexpected EOF";
          break;
        }
        a && p(g + j), n.set(v.subarray(R, F), g), r.b = g += j, r.p = d = F * 8;
        continue;
      }
      if (d > I2) {
        if (c)
          throw "unexpected EOF";
        break;
      }
    }
    a && p(g + 131072);
    for (var ee = (1 << y) - 1, X = (1 << P) - 1, Pe = d; ; Pe = d) {
      var ge = w[no(v, d) & ee], fe = ge >>> 4;
      if (d += ge & 15, d > I2) {
        if (c)
          throw "unexpected EOF";
        break;
      }
      if (!ge)
        throw "invalid length/literal";
      if (fe < 256)
        n[g++] = fe;
      else if (fe == 256) {
        Pe = d, w = null;
        break;
      } else {
        var ae = fe - 254;
        if (fe > 264) {
          var O = fe - 257, ne = Ka[O];
          ae = wt(v, d, (1 << ne) - 1) + qa[O], d += ne;
        }
        var be = _[no(v, d) & X], M = be >>> 4;
        if (!be)
          throw "invalid distance";
        d += be & 15;
        var he = qu[M];
        if (M > 3) {
          var ne = $a[M];
          he += no(v, d) & (1 << ne) - 1, d += ne;
        }
        if (d > I2) {
          if (c)
            throw "unexpected EOF";
          break;
        }
        a && p(g + 131072);
        for (var le = g + ae; g < le; g += 4)
          n[g] = n[g - he], n[g + 1] = n[g + 1 - he], n[g + 2] = n[g + 2 - he], n[g + 3] = n[g + 3 - he];
        g = le;
      }
    }
    r.l = w, r.p = Pe, r.b = g, w && (h = 1, r.m = y, r.d = _, r.n = P);
  } while (!h);
  return g == n.length ? n : Ju(n, 0, g);
};
var tp = new ht(0);
var np = function(v) {
  if ((v[0] & 15) != 8 || v[0] >>> 4 > 7 || (v[0] << 8 | v[1]) % 31)
    throw "invalid zlib data";
  if (v[1] & 32)
    throw "invalid zlib data: preset dictionaries not supported";
};
function ip(v, n) {
  return ep((np(v), v.subarray(2, -4)), n);
}
var sp = typeof TextDecoder < "u" && new TextDecoder();
var rp = 0;
try {
  sp.decode(tp, { stream: true }), rp = 1;
} catch {
}
var op = class extends Object3D {
  // events
  constructor(n, r) {
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
    }), C(this, "intersectObjectWithRay", (a, c, p) => {
      const h = c.intersectObject(a, true);
      for (let d = 0; d < h.length; d++)
        if (h[d].object.visible || p)
          return h[d];
      return false;
    }), C(this, "attach", (a) => (this.object = a, this.visible = true, this)), C(this, "detach", () => (this.object = void 0, this.visible = false, this.axis = null, this)), C(this, "reset", () => this.enabled ? (this.dragging && this.object !== void 0 && (this.object.position.copy(this.positionStart), this.object.quaternion.copy(this.quaternionStart), this.object.scale.copy(this.scaleStart), this.dispatchEvent(this.changeEvent), this.dispatchEvent(this.objectChangeEvent), this.pointStart.copy(this.pointEnd)), this) : this), C(this, "updateMatrixWorld", () => {
      this.object !== void 0 && (this.object.updateMatrixWorld(), this.object.parent === null ? console.error("TransformControls: The attached 3D object must be a part of the scene graph.") : this.object.parent.matrixWorld.decompose(this.parentPosition, this.parentQuaternion, this.parentScale), this.object.matrixWorld.decompose(this.worldPosition, this.worldQuaternion, this.worldScale), this.parentQuaternionInv.copy(this.parentQuaternion).invert(), this.worldQuaternionInv.copy(this.worldQuaternion).invert()), this.camera.updateMatrixWorld(), this.camera.matrixWorld.decompose(this.cameraPosition, this.cameraQuaternion, this.cameraScale), this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(), super.updateMatrixWorld();
    }), C(this, "pointerHover", (a) => {
      if (this.object === void 0 || this.dragging === true)
        return;
      this.raycaster.setFromCamera(a, this.camera);
      const c = this.intersectObjectWithRay(this.gizmo.picker[this.mode], this.raycaster);
      c ? this.axis = c.object.name : this.axis = null;
    }), C(this, "pointerDown", (a) => {
      if (!(this.object === void 0 || this.dragging === true || a.button !== 0) && this.axis !== null) {
        this.raycaster.setFromCamera(a, this.camera);
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
    }), C(this, "pointerMove", (a) => {
      const c = this.axis, p = this.mode, h = this.object;
      let d = this.space;
      if (p === "scale" ? d = "local" : (c === "E" || c === "XYZE" || c === "XYZ") && (d = "world"), h === void 0 || c === null || this.dragging === false || a.button !== -1)
        return;
      this.raycaster.setFromCamera(a, this.camera);
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
    }), C(this, "pointerUp", (a) => {
      a.button === 0 && (this.dragging && this.axis !== null && (this.mouseUpEvent.mode = this.mode, this.dispatchEvent(this.mouseUpEvent)), this.dragging = false, this.axis = null);
    }), C(this, "getPointer", (a) => {
      var c;
      if (this.domElement && (c = this.domElement.ownerDocument) !== null && c !== void 0 && c.pointerLockElement)
        return {
          x: 0,
          y: 0,
          button: a.button
        };
      {
        var p;
        const h = a.changedTouches ? a.changedTouches[0] : a, d = (p = this.domElement) === null || p === void 0 ? void 0 : p.getBoundingClientRect();
        return {
          x: (h.clientX - d.left) / d.width * 2 - 1,
          y: -(h.clientY - d.top) / d.height * 2 + 1,
          button: a.button
        };
      }
    }), C(this, "onPointerHover", (a) => {
      if (this.enabled)
        switch (a.pointerType) {
          case "mouse":
          case "pen":
            this.pointerHover(this.getPointer(a));
            break;
        }
    }), C(this, "onPointerDown", (a) => {
      !this.enabled || !this.domElement || (this.domElement.style.touchAction = "none", this.domElement.ownerDocument.addEventListener("pointermove", this.onPointerMove), this.pointerHover(this.getPointer(a)), this.pointerDown(this.getPointer(a)));
    }), C(this, "onPointerMove", (a) => {
      this.enabled && this.pointerMove(this.getPointer(a));
    }), C(this, "onPointerUp", (a) => {
      !this.enabled || !this.domElement || (this.domElement.style.touchAction = "", this.domElement.ownerDocument.removeEventListener("pointermove", this.onPointerMove), this.pointerUp(this.getPointer(a)));
    }), C(this, "getMode", () => this.mode), C(this, "setMode", (a) => {
      this.mode = a;
    }), C(this, "setTranslationSnap", (a) => {
      this.translationSnap = a;
    }), C(this, "setRotationSnap", (a) => {
      this.rotationSnap = a;
    }), C(this, "setScaleSnap", (a) => {
      this.scaleSnap = a;
    }), C(this, "setSize", (a) => {
      this.size = a;
    }), C(this, "setSpace", (a) => {
      this.space = a;
    }), C(this, "update", () => {
      console.warn("THREE.TransformControls: update function has no more functionality and therefore has been deprecated.");
    }), C(this, "connect", (a) => {
      a === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'), this.domElement = a, this.domElement.addEventListener("pointerdown", this.onPointerDown), this.domElement.addEventListener("pointermove", this.onPointerHover), this.domElement.ownerDocument.addEventListener("pointerup", this.onPointerUp);
    }), C(this, "dispose", () => {
      var a, c, p, h, d, g;
      (a = this.domElement) === null || a === void 0 || a.removeEventListener("pointerdown", this.onPointerDown), (c = this.domElement) === null || c === void 0 || c.removeEventListener("pointermove", this.onPointerHover), (p = this.domElement) === null || p === void 0 || (h = p.ownerDocument) === null || h === void 0 || h.removeEventListener("pointermove", this.onPointerMove), (d = this.domElement) === null || d === void 0 || (g = d.ownerDocument) === null || g === void 0 || g.removeEventListener("pointerup", this.onPointerUp), this.traverse((w) => {
        const _ = w;
        _.geometry && _.geometry.dispose(), _.material && _.material.dispose();
      });
    }), this.domElement = r, this.camera = n, this.gizmo = new ap(), this.add(this.gizmo), this.plane = new lp(), this.add(this.plane);
    const s = (a, c) => {
      let p = c;
      Object.defineProperty(this, a, {
        get: function() {
          return p !== void 0 ? p : c;
        },
        set: function(h) {
          p !== h && (p = h, this.plane[a] = h, this.gizmo[a] = h, this.dispatchEvent({
            type: a + "-changed",
            value: h
          }), this.dispatchEvent(this.changeEvent));
        }
      }), this[a] = c, this.plane[a] = c, this.gizmo[a] = c;
    };
    s("camera", this.camera), s("object", this.object), s("enabled", this.enabled), s("axis", this.axis), s("mode", this.mode), s("translationSnap", this.translationSnap), s("rotationSnap", this.rotationSnap), s("scaleSnap", this.scaleSnap), s("space", this.space), s("size", this.size), s("dragging", this.dragging), s("showX", this.showX), s("showY", this.showY), s("showZ", this.showZ), s("worldPosition", this.worldPosition), s("worldPositionStart", this.worldPositionStart), s("worldQuaternion", this.worldQuaternion), s("worldQuaternionStart", this.worldQuaternionStart), s("cameraPosition", this.cameraPosition), s("cameraQuaternion", this.cameraQuaternion), s("pointStart", this.pointStart), s("pointEnd", this.pointEnd), s("rotationAxis", this.rotationAxis), s("rotationAngle", this.rotationAngle), s("eye", this.eye), r !== void 0 && this.connect(r);
  }
};
var ap = class extends Object3D {
  // these are set from parent class TransformControls
  constructor() {
    super(), C(this, "isTransformControlsGizmo", true), C(this, "type", "TransformControlsGizmo"), C(this, "tempVector", new Vector3(0, 0, 0)), C(this, "tempEuler", new Euler()), C(this, "alignVector", new Vector3(0, 1, 0)), C(this, "zeroVector", new Vector3(0, 0, 0)), C(this, "lookAtMatrix", new Matrix4()), C(this, "tempQuaternion", new Quaternion()), C(this, "tempQuaternion2", new Quaternion()), C(this, "identityQuaternion", new Quaternion()), C(this, "unitX", new Vector3(1, 0, 0)), C(this, "unitY", new Vector3(0, 1, 0)), C(this, "unitZ", new Vector3(0, 0, 1)), C(this, "gizmo", void 0), C(this, "picker", void 0), C(this, "helper", void 0), C(this, "rotationAxis", new Vector3()), C(this, "cameraPosition", new Vector3()), C(this, "worldPositionStart", new Vector3()), C(this, "worldQuaternionStart", new Quaternion()), C(this, "worldPosition", new Vector3()), C(this, "worldQuaternion", new Quaternion()), C(this, "eye", new Vector3()), C(this, "camera", null), C(this, "enabled", true), C(this, "axis", null), C(this, "mode", "translate"), C(this, "space", "world"), C(this, "size", 1), C(this, "dragging", false), C(this, "showX", true), C(this, "showY", true), C(this, "showZ", true), C(this, "updateMatrixWorld", () => {
      let fe = this.space;
      this.mode === "scale" && (fe = "local");
      const ae = fe === "local" ? this.worldQuaternion : this.identityQuaternion;
      this.gizmo.translate.visible = this.mode === "translate", this.gizmo.rotate.visible = this.mode === "rotate", this.gizmo.scale.visible = this.mode === "scale", this.helper.translate.visible = this.mode === "translate", this.helper.rotate.visible = this.mode === "rotate", this.helper.scale.visible = this.mode === "scale";
      let ne = [];
      ne = ne.concat(this.picker[this.mode].children), ne = ne.concat(this.gizmo[this.mode].children), ne = ne.concat(this.helper[this.mode].children);
      for (let be = 0; be < ne.length; be++) {
        const M = ne[be];
        M.visible = true, M.rotation.set(0, 0, 0), M.position.copy(this.worldPosition);
        let le;
        if (this.camera.isOrthographicCamera ? le = (this.camera.top - this.camera.bottom) / this.camera.zoom : le = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7), M.scale.set(1, 1, 1).multiplyScalar(le * this.size / 7), M.tag === "helper") {
          M.visible = false, M.name === "AXIS" ? (M.position.copy(this.worldPositionStart), M.visible = !!this.axis, this.axis === "X" && (this.tempQuaternion.setFromEuler(this.tempEuler.set(0, 0, 0)), M.quaternion.copy(ae).multiply(this.tempQuaternion), Math.abs(this.alignVector.copy(this.unitX).applyQuaternion(ae).dot(this.eye)) > 0.9 && (M.visible = false)), this.axis === "Y" && (this.tempQuaternion.setFromEuler(this.tempEuler.set(0, 0, Math.PI / 2)), M.quaternion.copy(ae).multiply(this.tempQuaternion), Math.abs(this.alignVector.copy(this.unitY).applyQuaternion(ae).dot(this.eye)) > 0.9 && (M.visible = false)), this.axis === "Z" && (this.tempQuaternion.setFromEuler(this.tempEuler.set(0, Math.PI / 2, 0)), M.quaternion.copy(ae).multiply(this.tempQuaternion), Math.abs(this.alignVector.copy(this.unitZ).applyQuaternion(ae).dot(this.eye)) > 0.9 && (M.visible = false)), this.axis === "XYZE" && (this.tempQuaternion.setFromEuler(this.tempEuler.set(0, Math.PI / 2, 0)), this.alignVector.copy(this.rotationAxis), M.quaternion.setFromRotationMatrix(this.lookAtMatrix.lookAt(this.zeroVector, this.alignVector, this.unitY)), M.quaternion.multiply(this.tempQuaternion), M.visible = this.dragging), this.axis === "E" && (M.visible = false)) : M.name === "START" ? (M.position.copy(this.worldPositionStart), M.visible = this.dragging) : M.name === "END" ? (M.position.copy(this.worldPosition), M.visible = this.dragging) : M.name === "DELTA" ? (M.position.copy(this.worldPositionStart), M.quaternion.copy(this.worldQuaternionStart), this.tempVector.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1), this.tempVector.applyQuaternion(this.worldQuaternionStart.clone().invert()), M.scale.copy(this.tempVector), M.visible = this.dragging) : (M.quaternion.copy(ae), this.dragging ? M.position.copy(this.worldPositionStart) : M.position.copy(this.worldPosition), this.axis && (M.visible = this.axis.search(M.name) !== -1));
          continue;
        }
        M.quaternion.copy(ae), this.mode === "translate" || this.mode === "scale" ? ((M.name === "X" || M.name === "XYZX") && Math.abs(this.alignVector.copy(this.unitX).applyQuaternion(ae).dot(this.eye)) > 0.99 && (M.scale.set(1e-10, 1e-10, 1e-10), M.visible = false), (M.name === "Y" || M.name === "XYZY") && Math.abs(this.alignVector.copy(this.unitY).applyQuaternion(ae).dot(this.eye)) > 0.99 && (M.scale.set(1e-10, 1e-10, 1e-10), M.visible = false), (M.name === "Z" || M.name === "XYZZ") && Math.abs(this.alignVector.copy(this.unitZ).applyQuaternion(ae).dot(this.eye)) > 0.99 && (M.scale.set(1e-10, 1e-10, 1e-10), M.visible = false), M.name === "XY" && Math.abs(this.alignVector.copy(this.unitZ).applyQuaternion(ae).dot(this.eye)) < 0.2 && (M.scale.set(1e-10, 1e-10, 1e-10), M.visible = false), M.name === "YZ" && Math.abs(this.alignVector.copy(this.unitX).applyQuaternion(ae).dot(this.eye)) < 0.2 && (M.scale.set(1e-10, 1e-10, 1e-10), M.visible = false), M.name === "XZ" && Math.abs(this.alignVector.copy(this.unitY).applyQuaternion(ae).dot(this.eye)) < 0.2 && (M.scale.set(1e-10, 1e-10, 1e-10), M.visible = false), M.name.search("X") !== -1 && (this.alignVector.copy(this.unitX).applyQuaternion(ae).dot(this.eye) < 0 ? M.tag === "fwd" ? M.visible = false : M.scale.x *= -1 : M.tag === "bwd" && (M.visible = false)), M.name.search("Y") !== -1 && (this.alignVector.copy(this.unitY).applyQuaternion(ae).dot(this.eye) < 0 ? M.tag === "fwd" ? M.visible = false : M.scale.y *= -1 : M.tag === "bwd" && (M.visible = false)), M.name.search("Z") !== -1 && (this.alignVector.copy(this.unitZ).applyQuaternion(ae).dot(this.eye) < 0 ? M.tag === "fwd" ? M.visible = false : M.scale.z *= -1 : M.tag === "bwd" && (M.visible = false))) : this.mode === "rotate" && (this.tempQuaternion2.copy(ae), this.alignVector.copy(this.eye).applyQuaternion(this.tempQuaternion.copy(ae).invert()), M.name.search("E") !== -1 && M.quaternion.setFromRotationMatrix(this.lookAtMatrix.lookAt(this.eye, this.zeroVector, this.unitY)), M.name === "X" && (this.tempQuaternion.setFromAxisAngle(this.unitX, Math.atan2(-this.alignVector.y, this.alignVector.z)), this.tempQuaternion.multiplyQuaternions(this.tempQuaternion2, this.tempQuaternion), M.quaternion.copy(this.tempQuaternion)), M.name === "Y" && (this.tempQuaternion.setFromAxisAngle(this.unitY, Math.atan2(this.alignVector.x, this.alignVector.z)), this.tempQuaternion.multiplyQuaternions(this.tempQuaternion2, this.tempQuaternion), M.quaternion.copy(this.tempQuaternion)), M.name === "Z" && (this.tempQuaternion.setFromAxisAngle(this.unitZ, Math.atan2(this.alignVector.y, this.alignVector.x)), this.tempQuaternion.multiplyQuaternions(this.tempQuaternion2, this.tempQuaternion), M.quaternion.copy(this.tempQuaternion))), M.visible = M.visible && (M.name.indexOf("X") === -1 || this.showX), M.visible = M.visible && (M.name.indexOf("Y") === -1 || this.showY), M.visible = M.visible && (M.name.indexOf("Z") === -1 || this.showZ), M.visible = M.visible && (M.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ), M.material.tempOpacity = M.material.tempOpacity || M.material.opacity, M.material.tempColor = M.material.tempColor || M.material.color.clone(), M.material.color.copy(M.material.tempColor), M.material.opacity = M.material.tempOpacity, this.enabled ? this.axis && (M.name === this.axis ? (M.material.opacity = 1, M.material.color.lerp(new Color(1, 1, 1), 0.5)) : this.axis.split("").some(function(Ve) {
          return M.name === Ve;
        }) ? (M.material.opacity = 1, M.material.color.lerp(new Color(1, 1, 1), 0.5)) : (M.material.opacity *= 0.25, M.material.color.lerp(new Color(1, 1, 1), 0.5))) : (M.material.opacity *= 0.5, M.material.color.lerp(new Color(1, 1, 1), 0.5));
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
    }), r = new LineBasicMaterial({
      depthTest: false,
      depthWrite: false,
      transparent: true,
      linewidth: 1,
      fog: false,
      toneMapped: false
    }), s = n.clone();
    s.opacity = 0.15;
    const a = n.clone();
    a.opacity = 0.33;
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
    const _ = d.clone();
    _.color.set(16711935), n.clone().color.set(16776960);
    const P = r.clone();
    P.color.set(16711680);
    const I2 = r.clone();
    I2.color.set(65280);
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
    const D2 = F.clone();
    D2.opacity = 0.25;
    const Y = new CylinderGeometry(0, 0.05, 0.2, 12, 1, false), G = new BoxGeometry(0.125, 0.125, 0.125), N = new BufferGeometry();
    N.setAttribute("position", new Float32BufferAttribute([0, 0, 0, 1, 0, 0], 3));
    const O = (fe, ae) => {
      const ne = new BufferGeometry(), be = [];
      for (let M = 0; M <= 64 * ae; ++M)
        be.push(0, Math.cos(M / 32 * Math.PI) * fe, Math.sin(M / 32 * Math.PI) * fe);
      return ne.setAttribute("position", new Float32BufferAttribute(be, 3)), ne;
    }, H = () => {
      const fe = new BufferGeometry();
      return fe.setAttribute("position", new Float32BufferAttribute([0, 0, 0, 1, 1, 1], 3)), fe;
    }, K = {
      X: [[new Mesh(Y, c), [1, 0, 0], [0, 0, -Math.PI / 2], null, "fwd"], [new Mesh(Y, c), [1, 0, 0], [0, 0, Math.PI / 2], null, "bwd"], [new Line(N, P)]],
      Y: [[new Mesh(Y, p), [0, 1, 0], null, null, "fwd"], [new Mesh(Y, p), [0, 1, 0], [Math.PI, 0, 0], null, "bwd"], [new Line(N, I2), null, [0, 0, Math.PI / 2]]],
      Z: [[new Mesh(Y, h), [0, 0, 1], [Math.PI / 2, 0, 0], null, "fwd"], [new Mesh(Y, h), [0, 0, 1], [-Math.PI / 2, 0, 0], null, "bwd"], [new Line(N, S), null, [0, -Math.PI / 2, 0]]],
      XYZ: [[new Mesh(new OctahedronGeometry(0.1, 0), d.clone()), [0, 0, 0], [0, 0, 0]]],
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
    }, pe = {
      START: [[new Mesh(new OctahedronGeometry(0.01, 2), a), null, null, null, "helper"]],
      END: [[new Mesh(new OctahedronGeometry(0.01, 2), a), null, null, null, "helper"]],
      DELTA: [[new Line(H(), a), null, null, null, "helper"]],
      X: [[new Line(N, a.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]],
      Y: [[new Line(N, a.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]],
      Z: [[new Line(N, a.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]]
    }, ge = {
      X: [[new Line(O(1, 0.5), P)], [new Mesh(new OctahedronGeometry(0.04, 0), c), [0, 0, 0.99], null, [1, 3, 1]]],
      Y: [[new Line(O(1, 0.5), I2), null, [0, 0, -Math.PI / 2]], [new Mesh(new OctahedronGeometry(0.04, 0), p), [0, 0, 0.99], null, [3, 1, 1]]],
      Z: [[new Line(O(1, 0.5), S), null, [0, Math.PI / 2, 0]], [new Mesh(new OctahedronGeometry(0.04, 0), h), [0.99, 0, 0], null, [1, 3, 1]]],
      E: [[new Line(O(1.25, 1), D2), null, [0, Math.PI / 2, 0]], [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), D2), [1.17, 0, 0], [0, 0, -Math.PI / 2], [1, 1, 1e-3]], [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), D2), [-1.17, 0, 0], [0, 0, Math.PI / 2], [1, 1, 1e-3]], [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), D2), [0, -1.17, 0], [Math.PI, 0, 0], [1, 1, 1e-3]], [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), D2), [0, 1.17, 0], [0, 0, 0], [1, 1, 1e-3]]],
      XYZE: [[new Line(O(1, 1), V), null, [0, Math.PI / 2, 0]]]
    }, ce = {
      AXIS: [[new Line(N, a.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]]
    }, me = {
      X: [[new Mesh(new TorusGeometry(1, 0.1, 4, 24), s), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]],
      Y: [[new Mesh(new TorusGeometry(1, 0.1, 4, 24), s), [0, 0, 0], [Math.PI / 2, 0, 0]]],
      Z: [[new Mesh(new TorusGeometry(1, 0.1, 4, 24), s), [0, 0, 0], [0, 0, -Math.PI / 2]]],
      E: [[new Mesh(new TorusGeometry(1.25, 0.1, 2, 24), s)]],
      XYZE: [[new Mesh(new SphereGeometry(0.7, 10, 8), s)]]
    }, he = {
      X: [[new Mesh(G, c), [0.8, 0, 0], [0, 0, -Math.PI / 2]], [new Line(N, P), null, null, [0.8, 1, 1]]],
      Y: [[new Mesh(G, p), [0, 0.8, 0]], [new Line(N, I2), null, [0, 0, Math.PI / 2], [0.8, 1, 1]]],
      Z: [[new Mesh(G, h), [0, 0, 0.8], [Math.PI / 2, 0, 0]], [new Line(N, S), null, [0, -Math.PI / 2, 0], [0.8, 1, 1]]],
      XY: [[new Mesh(G, g), [0.85, 0.85, 0], null, [2, 2, 0.2]], [new Line(N, F), [0.855, 0.98, 0], null, [0.125, 1, 1]], [new Line(N, F), [0.98, 0.855, 0], [0, 0, Math.PI / 2], [0.125, 1, 1]]],
      YZ: [[new Mesh(G, w), [0, 0.85, 0.85], null, [0.2, 2, 2]], [new Line(N, R), [0, 0.855, 0.98], [0, 0, Math.PI / 2], [0.125, 1, 1]], [new Line(N, R), [0, 0.98, 0.855], [0, -Math.PI / 2, 0], [0.125, 1, 1]]],
      XZ: [[new Mesh(G, _), [0.85, 0, 0.85], null, [2, 0.2, 2]], [new Line(N, j), [0.855, 0, 0.98], null, [0.125, 1, 1]], [new Line(N, j), [0.98, 0, 0.855], [0, -Math.PI / 2, 0], [0.125, 1, 1]]],
      XYZX: [[new Mesh(new BoxGeometry(0.125, 0.125, 0.125), d.clone()), [1.1, 0, 0]]],
      XYZY: [[new Mesh(new BoxGeometry(0.125, 0.125, 0.125), d.clone()), [0, 1.1, 0]]],
      XYZZ: [[new Mesh(new BoxGeometry(0.125, 0.125, 0.125), d.clone()), [0, 0, 1.1]]]
    }, ee = {
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
    }, Pe = (fe) => {
      const ae = new Object3D();
      for (let ne in fe)
        for (let be = fe[ne].length; be--; ) {
          const M = fe[ne][be][0].clone(), le = fe[ne][be][1], Ve = fe[ne][be][2], Be = fe[ne][be][3], we = fe[ne][be][4];
          M.name = ne, M.tag = we, le && M.position.set(le[0], le[1], le[2]), Ve && M.rotation.set(Ve[0], Ve[1], Ve[2]), Be && M.scale.set(Be[0], Be[1], Be[2]), M.updateMatrix();
          const st = M.geometry.clone();
          st.applyMatrix4(M.matrix), M.geometry = st, M.renderOrder = 1 / 0, M.position.set(0, 0, 0), M.rotation.set(0, 0, 0), M.scale.set(1, 1, 1), ae.add(M);
        }
      return ae;
    };
    this.gizmo = {}, this.picker = {}, this.helper = {}, this.add(this.gizmo.translate = Pe(K)), this.add(this.gizmo.rotate = Pe(ge)), this.add(this.gizmo.scale = Pe(he)), this.add(this.picker.translate = Pe(q)), this.add(this.picker.rotate = Pe(me)), this.add(this.picker.scale = Pe(ee)), this.add(this.helper.translate = Pe(pe)), this.add(this.helper.rotate = Pe(ce)), this.add(this.helper.scale = Pe(X)), this.picker.translate.visible = false, this.picker.rotate.visible = false, this.picker.scale.visible = false;
  }
  // updateMatrixWorld will update transformations and appearance of individual handles
};
var lp = class extends Mesh {
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
var ui = new Euler(0, 0, 0, "YXZ");
var pi = new Vector3();
var cp = {
  type: "change"
};
var up = {
  type: "lock"
};
var pp = {
  type: "unlock"
};
var ua = Math.PI / 2;
var hp = class extends EventDispatcher {
  constructor(n, r) {
    super(), C(this, "camera", void 0), C(this, "domElement", void 0), C(this, "isLocked", void 0), C(this, "minPolarAngle", void 0), C(this, "maxPolarAngle", void 0), C(this, "pointerSpeed", void 0), C(this, "onMouseMove", (s) => {
      if (!this.domElement || this.isLocked === false)
        return;
      const a = s.movementX || s.mozMovementX || s.webkitMovementX || 0, c = s.movementY || s.mozMovementY || s.webkitMovementY || 0;
      ui.setFromQuaternion(this.camera.quaternion), ui.y -= a * 2e-3 * this.pointerSpeed, ui.x -= c * 2e-3 * this.pointerSpeed, ui.x = Math.max(ua - this.maxPolarAngle, Math.min(ua - this.minPolarAngle, ui.x)), this.camera.quaternion.setFromEuler(ui), this.dispatchEvent(cp);
    }), C(this, "onPointerlockChange", () => {
      this.domElement && (this.domElement.ownerDocument.pointerLockElement === this.domElement ? (this.dispatchEvent(up), this.isLocked = true) : (this.dispatchEvent(pp), this.isLocked = false));
    }), C(this, "onPointerlockError", () => {
      console.error("THREE.PointerLockControls: Unable to use Pointer Lock API");
    }), C(this, "connect", (s) => {
      this.domElement = s || this.domElement, this.domElement && (this.domElement.ownerDocument.addEventListener("mousemove", this.onMouseMove), this.domElement.ownerDocument.addEventListener("pointerlockchange", this.onPointerlockChange), this.domElement.ownerDocument.addEventListener("pointerlockerror", this.onPointerlockError));
    }), C(this, "disconnect", () => {
      this.domElement && (this.domElement.ownerDocument.removeEventListener("mousemove", this.onMouseMove), this.domElement.ownerDocument.removeEventListener("pointerlockchange", this.onPointerlockChange), this.domElement.ownerDocument.removeEventListener("pointerlockerror", this.onPointerlockError));
    }), C(this, "dispose", () => {
      this.disconnect();
    }), C(this, "getObject", () => this.camera), C(this, "direction", new Vector3(0, 0, -1)), C(this, "getDirection", (s) => s.copy(this.direction).applyQuaternion(this.camera.quaternion)), C(this, "moveForward", (s) => {
      pi.setFromMatrixColumn(this.camera.matrix, 0), pi.crossVectors(this.camera.up, pi), this.camera.position.addScaledVector(pi, s);
    }), C(this, "moveRight", (s) => {
      pi.setFromMatrixColumn(this.camera.matrix, 0), this.camera.position.addScaledVector(pi, s);
    }), C(this, "lock", () => {
      this.domElement && this.domElement.requestPointerLock();
    }), C(this, "unlock", () => {
      this.domElement && this.domElement.ownerDocument.exitPointerLock();
    }), this.camera = n, this.domElement = r, this.isLocked = false, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.pointerSpeed = 1, r && this.connect(r);
  }
};
var pa = (v, n) => (v % n + n) % n;
var dp = class extends EventDispatcher {
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
  constructor(n, r) {
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
    }), C(this, "target0", void 0), C(this, "position0", void 0), C(this, "zoom0", void 0), C(this, "_domElementKeyEvents", null), C(this, "getPolarAngle", void 0), C(this, "getAzimuthalAngle", void 0), C(this, "setPolarAngle", void 0), C(this, "setAzimuthalAngle", void 0), C(this, "getDistance", void 0), C(this, "listenToKeyEvents", void 0), C(this, "saveState", void 0), C(this, "reset", void 0), C(this, "update", void 0), C(this, "connect", void 0), C(this, "dispose", void 0), this.object = n, this.domElement = r, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object instanceof PerspectiveCamera ? this.object.zoom : 1, this.getPolarAngle = () => w.phi, this.getAzimuthalAngle = () => w.theta, this.setPolarAngle = (L) => {
      let U = pa(L, 2 * Math.PI), W = w.phi;
      W < 0 && (W += 2 * Math.PI), U < 0 && (U += 2 * Math.PI);
      let ie = Math.abs(U - W);
      2 * Math.PI - ie < ie && (U < W ? U += 2 * Math.PI : W += 2 * Math.PI), _.phi = U - W, s.update();
    }, this.setAzimuthalAngle = (L) => {
      let U = pa(L, 2 * Math.PI), W = w.theta;
      W < 0 && (W += 2 * Math.PI), U < 0 && (U += 2 * Math.PI);
      let ie = Math.abs(U - W);
      2 * Math.PI - ie < ie && (U < W ? U += 2 * Math.PI : W += 2 * Math.PI), _.theta = U - W, s.update();
    }, this.getDistance = () => s.object.position.distanceTo(s.target), this.listenToKeyEvents = (L) => {
      L.addEventListener("keydown", xt), this._domElementKeyEvents = L;
    }, this.saveState = () => {
      s.target0.copy(s.target), s.position0.copy(s.object.position), s.zoom0 = s.object instanceof PerspectiveCamera ? s.object.zoom : 1;
    }, this.reset = () => {
      s.target.copy(s.target0), s.object.position.copy(s.position0), s.object instanceof PerspectiveCamera && (s.object.zoom = s.zoom0, s.object.updateProjectionMatrix()), s.dispatchEvent(a), s.update(), d = h.NONE;
    }, this.update = (() => {
      const L = new Vector3(), U = new Quaternion().setFromUnitVectors(n.up, new Vector3(0, 1, 0)), W = U.clone().invert(), ie = new Vector3(), ye = new Quaternion(), De = 2 * Math.PI;
      return function() {
        const hn = s.object.position;
        L.copy(hn).sub(s.target), L.applyQuaternion(U), w.setFromVector3(L), s.autoRotate && d === h.NONE && pe(K()), s.enableDamping ? (w.theta += _.theta * s.dampingFactor, w.phi += _.phi * s.dampingFactor) : (w.theta += _.theta, w.phi += _.phi);
        let Ue = s.minAzimuthAngle, Ge = s.maxAzimuthAngle;
        return isFinite(Ue) && isFinite(Ge) && (Ue < -Math.PI ? Ue += De : Ue > Math.PI && (Ue -= De), Ge < -Math.PI ? Ge += De : Ge > Math.PI && (Ge -= De), Ue <= Ge ? w.theta = Math.max(Ue, Math.min(Ge, w.theta)) : w.theta = w.theta > (Ue + Ge) / 2 ? Math.max(Ue, w.theta) : Math.min(Ge, w.theta)), w.phi = Math.max(s.minPolarAngle, Math.min(s.maxPolarAngle, w.phi)), w.makeSafe(), w.radius *= y, w.radius = Math.max(s.minDistance, Math.min(s.maxDistance, w.radius)), s.enableDamping === true ? s.target.addScaledVector(P, s.dampingFactor) : s.target.add(P), L.setFromSpherical(w), L.applyQuaternion(W), hn.copy(s.target).add(L), s.object.lookAt(s.target), s.enableDamping === true ? (_.theta *= 1 - s.dampingFactor, _.phi *= 1 - s.dampingFactor, P.multiplyScalar(1 - s.dampingFactor)) : (_.set(0, 0, 0), P.set(0, 0, 0)), y = 1, I2 || ie.distanceToSquared(s.object.position) > g || 8 * (1 - ye.dot(s.object.quaternion)) > g ? (s.dispatchEvent(a), ie.copy(s.object.position), ye.copy(s.object.quaternion), I2 = false, true) : false;
      };
    })(), this.connect = (L) => {
      L === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'), s.domElement = L, s.domElement.style.touchAction = "none", s.domElement.addEventListener("contextmenu", pn), s.domElement.addEventListener("pointerdown", rt), s.domElement.addEventListener("pointercancel", Un), s.domElement.addEventListener("wheel", Hn);
    }, this.dispose = () => {
      var L, U, W, ie, ye, De;
      (L = s.domElement) === null || L === void 0 || L.removeEventListener("contextmenu", pn), (U = s.domElement) === null || U === void 0 || U.removeEventListener("pointerdown", rt), (W = s.domElement) === null || W === void 0 || W.removeEventListener("pointercancel", Un), (ie = s.domElement) === null || ie === void 0 || ie.removeEventListener("wheel", Hn), (ye = s.domElement) === null || ye === void 0 || ye.ownerDocument.removeEventListener("pointermove", un), (De = s.domElement) === null || De === void 0 || De.ownerDocument.removeEventListener("pointerup", ft), s._domElementKeyEvents !== null && s._domElementKeyEvents.removeEventListener("keydown", xt);
    };
    const s = this, a = {
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
    const g = 1e-6, w = new Spherical(), _ = new Spherical();
    let y = 1;
    const P = new Vector3();
    let I2 = false;
    const S = new Vector2(), R = new Vector2(), j = new Vector2(), F = new Vector2(), V = new Vector2(), D2 = new Vector2(), Y = new Vector2(), G = new Vector2(), N = new Vector2(), O = [], H = {};
    function K() {
      return 2 * Math.PI / 60 / 60 * s.autoRotateSpeed;
    }
    function q() {
      return Math.pow(0.95, s.zoomSpeed);
    }
    function pe(L) {
      s.reverseOrbit ? _.theta += L : _.theta -= L;
    }
    function ge(L) {
      s.reverseOrbit ? _.phi += L : _.phi -= L;
    }
    const ce = (() => {
      const L = new Vector3();
      return function(W, ie) {
        L.setFromMatrixColumn(ie, 0), L.multiplyScalar(-W), P.add(L);
      };
    })(), me = (() => {
      const L = new Vector3();
      return function(W, ie) {
        s.screenSpacePanning === true ? L.setFromMatrixColumn(ie, 1) : (L.setFromMatrixColumn(ie, 0), L.crossVectors(s.object.up, L)), L.multiplyScalar(W), P.add(L);
      };
    })(), he = (() => {
      const L = new Vector3();
      return function(W, ie) {
        const ye = s.domElement;
        if (ye && s.object instanceof PerspectiveCamera && s.object.isPerspectiveCamera) {
          const De = s.object.position;
          L.copy(De).sub(s.target);
          let Ht = L.length();
          Ht *= Math.tan(s.object.fov / 2 * Math.PI / 180), ce(2 * W * Ht / ye.clientHeight, s.object.matrix), me(2 * ie * Ht / ye.clientHeight, s.object.matrix);
        } else
          ye && s.object instanceof OrthographicCamera && s.object.isOrthographicCamera ? (ce(W * (s.object.right - s.object.left) / s.object.zoom / ye.clientWidth, s.object.matrix), me(ie * (s.object.top - s.object.bottom) / s.object.zoom / ye.clientHeight, s.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), s.enablePan = false);
      };
    })();
    function ee(L) {
      s.object instanceof PerspectiveCamera && s.object.isPerspectiveCamera ? y /= L : s.object instanceof OrthographicCamera && s.object.isOrthographicCamera ? (s.object.zoom = Math.max(s.minZoom, Math.min(s.maxZoom, s.object.zoom * L)), s.object.updateProjectionMatrix(), I2 = true) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), s.enableZoom = false);
    }
    function X(L) {
      s.object instanceof PerspectiveCamera && s.object.isPerspectiveCamera ? y *= L : s.object instanceof OrthographicCamera && s.object.isOrthographicCamera ? (s.object.zoom = Math.max(s.minZoom, Math.min(s.maxZoom, s.object.zoom / L)), s.object.updateProjectionMatrix(), I2 = true) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), s.enableZoom = false);
    }
    function Pe(L) {
      S.set(L.clientX, L.clientY);
    }
    function fe(L) {
      Y.set(L.clientX, L.clientY);
    }
    function ae(L) {
      F.set(L.clientX, L.clientY);
    }
    function ne(L) {
      R.set(L.clientX, L.clientY), j.subVectors(R, S).multiplyScalar(s.rotateSpeed);
      const U = s.domElement;
      U && (pe(2 * Math.PI * j.x / U.clientHeight), ge(2 * Math.PI * j.y / U.clientHeight)), S.copy(R), s.update();
    }
    function be(L) {
      G.set(L.clientX, L.clientY), N.subVectors(G, Y), N.y > 0 ? ee(q()) : N.y < 0 && X(q()), Y.copy(G), s.update();
    }
    function M(L) {
      V.set(L.clientX, L.clientY), D2.subVectors(V, F).multiplyScalar(s.panSpeed), he(D2.x, D2.y), F.copy(V), s.update();
    }
    function le(L) {
      L.deltaY < 0 ? X(q()) : L.deltaY > 0 && ee(q()), s.update();
    }
    function Ve(L) {
      let U = false;
      switch (L.code) {
        case s.keys.UP:
          he(0, s.keyPanSpeed), U = true;
          break;
        case s.keys.BOTTOM:
          he(0, -s.keyPanSpeed), U = true;
          break;
        case s.keys.LEFT:
          he(s.keyPanSpeed, 0), U = true;
          break;
        case s.keys.RIGHT:
          he(-s.keyPanSpeed, 0), U = true;
          break;
      }
      U && (L.preventDefault(), s.update());
    }
    function Be() {
      if (O.length == 1)
        S.set(O[0].pageX, O[0].pageY);
      else {
        const L = 0.5 * (O[0].pageX + O[1].pageX), U = 0.5 * (O[0].pageY + O[1].pageY);
        S.set(L, U);
      }
    }
    function we() {
      if (O.length == 1)
        F.set(O[0].pageX, O[0].pageY);
      else {
        const L = 0.5 * (O[0].pageX + O[1].pageX), U = 0.5 * (O[0].pageY + O[1].pageY);
        F.set(L, U);
      }
    }
    function st() {
      const L = O[0].pageX - O[1].pageX, U = O[0].pageY - O[1].pageY, W = Math.sqrt(L * L + U * U);
      Y.set(0, W);
    }
    function jn() {
      s.enableZoom && st(), s.enablePan && we();
    }
    function Ye() {
      s.enableZoom && st(), s.enableRotate && Be();
    }
    function zn(L) {
      if (O.length == 1)
        R.set(L.pageX, L.pageY);
      else {
        const W = Lt(L), ie = 0.5 * (L.pageX + W.x), ye = 0.5 * (L.pageY + W.y);
        R.set(ie, ye);
      }
      j.subVectors(R, S).multiplyScalar(s.rotateSpeed);
      const U = s.domElement;
      U && (pe(2 * Math.PI * j.x / U.clientHeight), ge(2 * Math.PI * j.y / U.clientHeight)), S.copy(R);
    }
    function cn(L) {
      if (O.length == 1)
        V.set(L.pageX, L.pageY);
      else {
        const U = Lt(L), W = 0.5 * (L.pageX + U.x), ie = 0.5 * (L.pageY + U.y);
        V.set(W, ie);
      }
      D2.subVectors(V, F).multiplyScalar(s.panSpeed), he(D2.x, D2.y), F.copy(V);
    }
    function mt(L) {
      const U = Lt(L), W = L.pageX - U.x, ie = L.pageY - U.y, ye = Math.sqrt(W * W + ie * ie);
      G.set(0, ye), N.set(0, Math.pow(G.y / Y.y, s.zoomSpeed)), ee(N.y), Y.copy(G);
    }
    function Mt(L) {
      s.enableZoom && mt(L), s.enablePan && cn(L);
    }
    function ze(L) {
      s.enableZoom && mt(L), s.enableRotate && zn(L);
    }
    function rt(L) {
      if (s.enabled !== false) {
        if (O.length === 0) {
          var U, W;
          (U = s.domElement) === null || U === void 0 || U.ownerDocument.addEventListener("pointermove", un), (W = s.domElement) === null || W === void 0 || W.ownerDocument.addEventListener("pointerup", ft);
        }
        $n(L), L.pointerType === "touch" ? St(L) : mi(L);
      }
    }
    function un(L) {
      s.enabled !== false && (L.pointerType === "touch" ? Kn(L) : Gn(L));
    }
    function ft(L) {
      if (Et2(L), O.length === 0) {
        var U, W, ie;
        (U = s.domElement) === null || U === void 0 || U.releasePointerCapture(L.pointerId), (W = s.domElement) === null || W === void 0 || W.ownerDocument.removeEventListener("pointermove", un), (ie = s.domElement) === null || ie === void 0 || ie.ownerDocument.removeEventListener("pointerup", ft);
      }
      s.dispatchEvent(p), d = h.NONE;
    }
    function Un(L) {
      Et2(L);
    }
    function mi(L) {
      let U;
      switch (L.button) {
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
          fe(L), d = h.DOLLY;
          break;
        case MOUSE.ROTATE:
          if (L.ctrlKey || L.metaKey || L.shiftKey) {
            if (s.enablePan === false)
              return;
            ae(L), d = h.PAN;
          } else {
            if (s.enableRotate === false)
              return;
            Pe(L), d = h.ROTATE;
          }
          break;
        case MOUSE.PAN:
          if (L.ctrlKey || L.metaKey || L.shiftKey) {
            if (s.enableRotate === false)
              return;
            Pe(L), d = h.ROTATE;
          } else {
            if (s.enablePan === false)
              return;
            ae(L), d = h.PAN;
          }
          break;
        default:
          d = h.NONE;
      }
      d !== h.NONE && s.dispatchEvent(c);
    }
    function Gn(L) {
      if (s.enabled !== false)
        switch (d) {
          case h.ROTATE:
            if (s.enableRotate === false)
              return;
            ne(L);
            break;
          case h.DOLLY:
            if (s.enableZoom === false)
              return;
            be(L);
            break;
          case h.PAN:
            if (s.enablePan === false)
              return;
            M(L);
            break;
        }
    }
    function Hn(L) {
      s.enabled === false || s.enableZoom === false || d !== h.NONE && d !== h.ROTATE || (L.preventDefault(), s.dispatchEvent(c), le(L), s.dispatchEvent(p));
    }
    function xt(L) {
      s.enabled === false || s.enablePan === false || Ve(L);
    }
    function St(L) {
      switch (vt(L), O.length) {
        case 1:
          switch (s.touches.ONE) {
            case TOUCH.ROTATE:
              if (s.enableRotate === false)
                return;
              Be(), d = h.TOUCH_ROTATE;
              break;
            case TOUCH.PAN:
              if (s.enablePan === false)
                return;
              we(), d = h.TOUCH_PAN;
              break;
            default:
              d = h.NONE;
          }
          break;
        case 2:
          switch (s.touches.TWO) {
            case TOUCH.DOLLY_PAN:
              if (s.enableZoom === false && s.enablePan === false)
                return;
              jn(), d = h.TOUCH_DOLLY_PAN;
              break;
            case TOUCH.DOLLY_ROTATE:
              if (s.enableZoom === false && s.enableRotate === false)
                return;
              Ye(), d = h.TOUCH_DOLLY_ROTATE;
              break;
            default:
              d = h.NONE;
          }
          break;
        default:
          d = h.NONE;
      }
      d !== h.NONE && s.dispatchEvent(c);
    }
    function Kn(L) {
      switch (vt(L), d) {
        case h.TOUCH_ROTATE:
          if (s.enableRotate === false)
            return;
          zn(L), s.update();
          break;
        case h.TOUCH_PAN:
          if (s.enablePan === false)
            return;
          cn(L), s.update();
          break;
        case h.TOUCH_DOLLY_PAN:
          if (s.enableZoom === false && s.enablePan === false)
            return;
          Mt(L), s.update();
          break;
        case h.TOUCH_DOLLY_ROTATE:
          if (s.enableZoom === false && s.enableRotate === false)
            return;
          ze(L), s.update();
          break;
        default:
          d = h.NONE;
      }
    }
    function pn(L) {
      s.enabled !== false && L.preventDefault();
    }
    function $n(L) {
      O.push(L);
    }
    function Et2(L) {
      delete H[L.pointerId];
      for (let U = 0; U < O.length; U++)
        if (O[U].pointerId == L.pointerId) {
          O.splice(U, 1);
          return;
        }
    }
    function vt(L) {
      let U = H[L.pointerId];
      U === void 0 && (U = new Vector2(), H[L.pointerId] = U), U.set(L.pageX, L.pageY);
    }
    function Lt(L) {
      const U = L.pointerId === O[0].pointerId ? O[1] : O[0];
      return H[U.pointerId];
    }
    r !== void 0 && this.connect(r), this.update();
  }
};
var mp = class extends Loader {
  constructor(n) {
    super(n), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(r) {
      return new _p(r);
    }), this.register(function(r) {
      return new Tp(r);
    }), this.register(function(r) {
      return new kp(r);
    }), this.register(function(r) {
      return new yp(r);
    }), this.register(function(r) {
      return new xp(r);
    }), this.register(function(r) {
      return new Ep(r);
    }), this.register(function(r) {
      return new Cp(r);
    }), this.register(function(r) {
      return new gp(r);
    }), this.register(function(r) {
      return new Pp(r);
    }), this.register(function(r) {
      return new wp(r);
    }), this.register(function(r) {
      return new vp(r);
    }), this.register(function(r) {
      return new Mp(r);
    });
  }
  load(n, r, s, a) {
    const c = this;
    let p;
    this.resourcePath !== "" ? p = this.resourcePath : this.path !== "" ? p = this.path : p = LoaderUtils.extractUrlBase(n), this.manager.itemStart(n);
    const h = function(g) {
      a ? a(g) : console.error(g), c.manager.itemError(n), c.manager.itemEnd(n);
    }, d = new FileLoader(this.manager);
    d.setPath(this.path), d.setResponseType("arraybuffer"), d.setRequestHeader(this.requestHeader), d.setWithCredentials(this.withCredentials), d.load(n, function(g) {
      try {
        c.parse(g, p, function(w) {
          r(w), c.manager.itemEnd(n);
        }, h);
      } catch (w) {
        h(w);
      }
    }, s, h);
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
  parse(n, r, s, a) {
    let c;
    const p = {}, h = {};
    if (typeof n == "string")
      c = n;
    else if (LoaderUtils.decodeText(new Uint8Array(n, 0, 4)) === Za) {
      try {
        p[re.KHR_BINARY_GLTF] = new Sp(n);
      } catch (_) {
        a && a(_);
        return;
      }
      c = p[re.KHR_BINARY_GLTF].content;
    } else
      c = LoaderUtils.decodeText(new Uint8Array(n));
    const d = JSON.parse(c);
    if (d.asset === void 0 || d.asset.version[0] < 2) {
      a && a(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const g = new Up(d, {
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
      h[_.name] = _, p[_.name] = true;
    }
    if (d.extensionsUsed)
      for (let w = 0; w < d.extensionsUsed.length; ++w) {
        const _ = d.extensionsUsed[w], y = d.extensionsRequired || [];
        switch (_) {
          case re.KHR_MATERIALS_UNLIT:
            p[_] = new bp();
            break;
          case re.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
            p[_] = new Rp();
            break;
          case re.KHR_DRACO_MESH_COMPRESSION:
            p[_] = new Lp(d, this.dracoLoader);
            break;
          case re.KHR_TEXTURE_TRANSFORM:
            p[_] = new Ap();
            break;
          case re.KHR_MESH_QUANTIZATION:
            p[_] = new Ip();
            break;
          default:
            y.indexOf(_) >= 0 && h[_] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + _ + '".');
        }
      }
    g.setExtensions(p), g.setPlugins(h), g.parse(s, a);
  }
  parseAsync(n, r) {
    const s = this;
    return new Promise(function(a, c) {
      s.parse(n, r, a, c);
    });
  }
};
function fp() {
  let v = {};
  return {
    get: function(n) {
      return v[n];
    },
    add: function(n, r) {
      v[n] = r;
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
var vp = class {
  constructor(n) {
    this.parser = n, this.name = re.KHR_LIGHTS_PUNCTUAL, this.cache = {
      refs: {},
      uses: {}
    };
  }
  _markDefs() {
    const n = this.parser, r = this.parser.json.nodes || [];
    for (let s = 0, a = r.length; s < a; s++) {
      const c = r[s];
      c.extensions && c.extensions[this.name] && c.extensions[this.name].light !== void 0 && n._addNodeRef(this.cache, c.extensions[this.name].light);
    }
  }
  _loadLight(n) {
    const r = this.parser, s = "light:" + n;
    let a = r.cache.get(s);
    if (a)
      return a;
    const c = r.json, d = ((c.extensions && c.extensions[this.name] || {}).lights || [])[n];
    let g;
    const w = new Color(16777215);
    d.color !== void 0 && w.fromArray(d.color);
    const _ = d.range !== void 0 ? d.range : 0;
    switch (d.type) {
      case "directional":
        g = new DirectionalLight(w), g.target.position.set(0, 0, -1), g.add(g.target);
        break;
      case "point":
        g = new PointLight(w), g.distance = _;
        break;
      case "spot":
        g = new SpotLight(w), g.distance = _, d.spot = d.spot || {}, d.spot.innerConeAngle = d.spot.innerConeAngle !== void 0 ? d.spot.innerConeAngle : 0, d.spot.outerConeAngle = d.spot.outerConeAngle !== void 0 ? d.spot.outerConeAngle : Math.PI / 4, g.angle = d.spot.outerConeAngle, g.penumbra = 1 - d.spot.innerConeAngle / d.spot.outerConeAngle, g.target.position.set(0, 0, -1), g.add(g.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + d.type);
    }
    return g.position.set(0, 0, 0), g.decay = 2, d.intensity !== void 0 && (g.intensity = d.intensity), g.name = r.createUniqueName(d.name || "light_" + n), a = Promise.resolve(g), r.cache.add(s, a), a;
  }
  createNodeAttachment(n) {
    const r = this, s = this.parser, c = s.json.nodes[n], h = (c.extensions && c.extensions[this.name] || {}).light;
    return h === void 0 ? null : this._loadLight(h).then(function(d) {
      return s._getNodeRef(r.cache, h, d);
    });
  }
};
var bp = class {
  constructor() {
    this.name = re.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return MeshBasicMaterial;
  }
  extendParams(n, r, s) {
    const a = [];
    n.color = new Color(1, 1, 1), n.opacity = 1;
    const c = r.pbrMetallicRoughness;
    if (c) {
      if (Array.isArray(c.baseColorFactor)) {
        const p = c.baseColorFactor;
        n.color.fromArray(p), n.opacity = p[3];
      }
      c.baseColorTexture !== void 0 && a.push(s.assignTexture(n, "map", c.baseColorTexture, sRGBEncoding));
    }
    return Promise.all(a);
  }
};
var gp = class {
  constructor(n) {
    this.parser = n, this.name = re.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(n, r) {
    const a = this.parser.json.materials[n];
    if (!a.extensions || !a.extensions[this.name])
      return Promise.resolve();
    const c = a.extensions[this.name].emissiveStrength;
    return c !== void 0 && (r.emissiveIntensity = c), Promise.resolve();
  }
};
var _p = class {
  constructor(n) {
    this.parser = n, this.name = re.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(n) {
    const s = this.parser.json.materials[n];
    return !s.extensions || !s.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(n, r) {
    const s = this.parser, a = s.json.materials[n];
    if (!a.extensions || !a.extensions[this.name])
      return Promise.resolve();
    const c = [], p = a.extensions[this.name];
    if (p.clearcoatFactor !== void 0 && (r.clearcoat = p.clearcoatFactor), p.clearcoatTexture !== void 0 && c.push(s.assignTexture(r, "clearcoatMap", p.clearcoatTexture)), p.clearcoatRoughnessFactor !== void 0 && (r.clearcoatRoughness = p.clearcoatRoughnessFactor), p.clearcoatRoughnessTexture !== void 0 && c.push(s.assignTexture(r, "clearcoatRoughnessMap", p.clearcoatRoughnessTexture)), p.clearcoatNormalTexture !== void 0 && (c.push(s.assignTexture(r, "clearcoatNormalMap", p.clearcoatNormalTexture)), p.clearcoatNormalTexture.scale !== void 0)) {
      const h = p.clearcoatNormalTexture.scale;
      r.clearcoatNormalScale = new Vector2(h, h);
    }
    return Promise.all(c);
  }
};
var wp = class {
  constructor(n) {
    this.parser = n, this.name = re.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(n) {
    const s = this.parser.json.materials[n];
    return !s.extensions || !s.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(n, r) {
    const s = this.parser, a = s.json.materials[n];
    if (!a.extensions || !a.extensions[this.name])
      return Promise.resolve();
    const c = [], p = a.extensions[this.name];
    return p.iridescenceFactor !== void 0 && (r.iridescence = p.iridescenceFactor), p.iridescenceTexture !== void 0 && c.push(s.assignTexture(r, "iridescenceMap", p.iridescenceTexture)), p.iridescenceIor !== void 0 && (r.iridescenceIOR = p.iridescenceIor), r.iridescenceThicknessRange === void 0 && (r.iridescenceThicknessRange = [100, 400]), p.iridescenceThicknessMinimum !== void 0 && (r.iridescenceThicknessRange[0] = p.iridescenceThicknessMinimum), p.iridescenceThicknessMaximum !== void 0 && (r.iridescenceThicknessRange[1] = p.iridescenceThicknessMaximum), p.iridescenceThicknessTexture !== void 0 && c.push(s.assignTexture(r, "iridescenceThicknessMap", p.iridescenceThicknessTexture)), Promise.all(c);
  }
};
var yp = class {
  constructor(n) {
    this.parser = n, this.name = re.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(n) {
    const s = this.parser.json.materials[n];
    return !s.extensions || !s.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(n, r) {
    const s = this.parser, a = s.json.materials[n];
    if (!a.extensions || !a.extensions[this.name])
      return Promise.resolve();
    const c = [];
    r.sheenColor = new Color(0, 0, 0), r.sheenRoughness = 0, r.sheen = 1;
    const p = a.extensions[this.name];
    return p.sheenColorFactor !== void 0 && r.sheenColor.fromArray(p.sheenColorFactor), p.sheenRoughnessFactor !== void 0 && (r.sheenRoughness = p.sheenRoughnessFactor), p.sheenColorTexture !== void 0 && c.push(s.assignTexture(r, "sheenColorMap", p.sheenColorTexture, sRGBEncoding)), p.sheenRoughnessTexture !== void 0 && c.push(s.assignTexture(r, "sheenRoughnessMap", p.sheenRoughnessTexture)), Promise.all(c);
  }
};
var xp = class {
  constructor(n) {
    this.parser = n, this.name = re.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(n) {
    const s = this.parser.json.materials[n];
    return !s.extensions || !s.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(n, r) {
    const s = this.parser, a = s.json.materials[n];
    if (!a.extensions || !a.extensions[this.name])
      return Promise.resolve();
    const c = [], p = a.extensions[this.name];
    return p.transmissionFactor !== void 0 && (r.transmission = p.transmissionFactor), p.transmissionTexture !== void 0 && c.push(s.assignTexture(r, "transmissionMap", p.transmissionTexture)), Promise.all(c);
  }
};
var Ep = class {
  constructor(n) {
    this.parser = n, this.name = re.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(n) {
    const s = this.parser.json.materials[n];
    return !s.extensions || !s.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(n, r) {
    const s = this.parser, a = s.json.materials[n];
    if (!a.extensions || !a.extensions[this.name])
      return Promise.resolve();
    const c = [], p = a.extensions[this.name];
    r.thickness = p.thicknessFactor !== void 0 ? p.thicknessFactor : 0, p.thicknessTexture !== void 0 && c.push(s.assignTexture(r, "thicknessMap", p.thicknessTexture)), r.attenuationDistance = p.attenuationDistance || 1 / 0;
    const h = p.attenuationColor || [1, 1, 1];
    return r.attenuationColor = new Color(h[0], h[1], h[2]), Promise.all(c);
  }
};
var Cp = class {
  constructor(n) {
    this.parser = n, this.name = re.KHR_MATERIALS_IOR;
  }
  getMaterialType(n) {
    const s = this.parser.json.materials[n];
    return !s.extensions || !s.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(n, r) {
    const a = this.parser.json.materials[n];
    if (!a.extensions || !a.extensions[this.name])
      return Promise.resolve();
    const c = a.extensions[this.name];
    return r.ior = c.ior !== void 0 ? c.ior : 1.5, Promise.resolve();
  }
};
var Pp = class {
  constructor(n) {
    this.parser = n, this.name = re.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(n) {
    const s = this.parser.json.materials[n];
    return !s.extensions || !s.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(n, r) {
    const s = this.parser, a = s.json.materials[n];
    if (!a.extensions || !a.extensions[this.name])
      return Promise.resolve();
    const c = [], p = a.extensions[this.name];
    r.specularIntensity = p.specularFactor !== void 0 ? p.specularFactor : 1, p.specularTexture !== void 0 && c.push(s.assignTexture(r, "specularIntensityMap", p.specularTexture));
    const h = p.specularColorFactor || [1, 1, 1];
    return r.specularColor = new Color(h[0], h[1], h[2]), p.specularColorTexture !== void 0 && c.push(s.assignTexture(r, "specularColorMap", p.specularColorTexture, sRGBEncoding)), Promise.all(c);
  }
};
var Tp = class {
  constructor(n) {
    this.parser = n, this.name = re.KHR_TEXTURE_BASISU;
  }
  loadTexture(n) {
    const r = this.parser, s = r.json, a = s.textures[n];
    if (!a.extensions || !a.extensions[this.name])
      return null;
    const c = a.extensions[this.name], p = r.options.ktx2Loader;
    if (!p) {
      if (s.extensionsRequired && s.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return r.loadTextureImage(n, c.source, p);
  }
};
var kp = class {
  constructor(n) {
    this.parser = n, this.name = re.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(n) {
    const r = this.name, s = this.parser, a = s.json, c = a.textures[n];
    if (!c.extensions || !c.extensions[r])
      return null;
    const p = c.extensions[r], h = a.images[p.source];
    let d = s.textureLoader;
    if (h.uri) {
      const g = s.options.manager.getHandler(h.uri);
      g !== null && (d = g);
    }
    return this.detectSupport().then(function(g) {
      if (g)
        return s.loadTextureImage(n, p.source, d);
      if (a.extensionsRequired && a.extensionsRequired.indexOf(r) >= 0)
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return s.loadTexture(n);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(n) {
      const r = new Image();
      r.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", r.onload = r.onerror = function() {
        n(r.height === 1);
      };
    })), this.isSupported;
  }
};
var Mp = class {
  constructor(n) {
    this.name = re.EXT_MESHOPT_COMPRESSION, this.parser = n;
  }
  loadBufferView(n) {
    const r = this.parser.json, s = r.bufferViews[n];
    if (s.extensions && s.extensions[this.name]) {
      const a = s.extensions[this.name], c = this.parser.getDependency("buffer", a.buffer), p = this.parser.options.meshoptDecoder;
      if (!p || !p.supported) {
        if (r.extensionsRequired && r.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return c.then(function(h) {
        const d = a.byteOffset || 0, g = a.byteLength || 0, w = a.count, _ = a.byteStride, y = new Uint8Array(h, d, g);
        return p.decodeGltfBufferAsync ? p.decodeGltfBufferAsync(w, _, y, a.mode, a.filter).then(function(P) {
          return P.buffer;
        }) : p.ready.then(function() {
          const P = new ArrayBuffer(w * _);
          return p.decodeGltfBuffer(new Uint8Array(P), w, _, y, a.mode, a.filter), P;
        });
      });
    } else
      return null;
  }
};
var Za = "glTF";
var Ki = 12;
var ha = {
  JSON: 1313821514,
  BIN: 5130562
};
var Sp = class {
  constructor(n) {
    this.name = re.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const r = new DataView(n, 0, Ki);
    if (this.header = {
      magic: LoaderUtils.decodeText(new Uint8Array(n.slice(0, 4))),
      version: r.getUint32(4, true),
      length: r.getUint32(8, true)
    }, this.header.magic !== Za)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const s = this.header.length - Ki, a = new DataView(n, Ki);
    let c = 0;
    for (; c < s; ) {
      const p = a.getUint32(c, true);
      c += 4;
      const h = a.getUint32(c, true);
      if (c += 4, h === ha.JSON) {
        const d = new Uint8Array(n, Ki + c, p);
        this.content = LoaderUtils.decodeText(d);
      } else if (h === ha.BIN) {
        const d = Ki + c;
        this.body = n.slice(d, d + p);
      }
      c += p;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
};
var Lp = class {
  constructor(n, r) {
    if (!r)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = re.KHR_DRACO_MESH_COMPRESSION, this.json = n, this.dracoLoader = r, this.dracoLoader.preload();
  }
  decodePrimitive(n, r) {
    const s = this.json, a = this.dracoLoader, c = n.extensions[this.name].bufferView, p = n.extensions[this.name].attributes, h = {}, d = {}, g = {};
    for (const w in p) {
      const _ = vo[w] || w.toLowerCase();
      h[_] = p[w];
    }
    for (const w in n.attributes) {
      const _ = vo[w] || w.toLowerCase();
      if (p[w] !== void 0) {
        const y = s.accessors[n.attributes[w]], P = es[y.componentType];
        g[_] = P.name, d[_] = y.normalized === true;
      }
    }
    return r.getDependency("bufferView", c).then(function(w) {
      return new Promise(function(_) {
        a.decodeDracoFile(w, function(y) {
          for (const P in y.attributes) {
            const I2 = y.attributes[P], S = d[P];
            S !== void 0 && (I2.normalized = S);
          }
          _(y);
        }, h, g);
      });
    });
  }
};
var Ap = class {
  constructor() {
    this.name = re.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(n, r) {
    return r.texCoord !== void 0 && console.warn('THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.'), r.offset === void 0 && r.rotation === void 0 && r.scale === void 0 || (n = n.clone(), r.offset !== void 0 && n.offset.fromArray(r.offset), r.rotation !== void 0 && (n.rotation = r.rotation), r.scale !== void 0 && n.repeat.fromArray(r.scale), n.needsUpdate = true), n;
  }
};
var fo = class extends MeshStandardMaterial {
  constructor(n) {
    super(), this.isGLTFSpecularGlossinessMaterial = true;
    const r = ["#ifdef USE_SPECULARMAP", "	uniform sampler2D specularMap;", "#endif"].join(`
`), s = ["#ifdef USE_GLOSSINESSMAP", "	uniform sampler2D glossinessMap;", "#endif"].join(`
`), a = ["vec3 specularFactor = specular;", "#ifdef USE_SPECULARMAP", "	vec4 texelSpecular = texture2D( specularMap, vUv );", "	// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture", "	specularFactor *= texelSpecular.rgb;", "#endif"].join(`
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
      d.fragmentShader = d.fragmentShader.replace("uniform float roughness;", "uniform vec3 specular;").replace("uniform float metalness;", "uniform float glossiness;").replace("#include <roughnessmap_pars_fragment>", r).replace("#include <metalnessmap_pars_fragment>", s).replace("#include <roughnessmap_fragment>", a).replace("#include <metalnessmap_fragment>", c).replace("#include <lights_physical_fragment>", p);
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
var Rp = class {
  constructor() {
    this.name = re.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS, this.specularGlossinessParams = ["color", "map", "lightMap", "lightMapIntensity", "aoMap", "aoMapIntensity", "emissive", "emissiveIntensity", "emissiveMap", "bumpMap", "bumpScale", "normalMap", "normalMapType", "displacementMap", "displacementScale", "displacementBias", "specularMap", "specular", "glossinessMap", "glossiness", "alphaMap", "envMap", "envMapIntensity", "refractionRatio"];
  }
  getMaterialType() {
    return fo;
  }
  extendParams(n, r, s) {
    const a = r.extensions[this.name];
    n.color = new Color(1, 1, 1), n.opacity = 1;
    const c = [];
    if (Array.isArray(a.diffuseFactor)) {
      const p = a.diffuseFactor;
      n.color.fromArray(p), n.opacity = p[3];
    }
    if (a.diffuseTexture !== void 0 && c.push(s.assignTexture(n, "map", a.diffuseTexture, sRGBEncoding)), n.emissive = new Color(0, 0, 0), n.glossiness = a.glossinessFactor !== void 0 ? a.glossinessFactor : 1, n.specular = new Color(1, 1, 1), Array.isArray(a.specularFactor) && n.specular.fromArray(a.specularFactor), a.specularGlossinessTexture !== void 0) {
      const p = a.specularGlossinessTexture;
      c.push(s.assignTexture(n, "glossinessMap", p)), c.push(s.assignTexture(n, "specularMap", p, sRGBEncoding));
    }
    return Promise.all(c);
  }
  createMaterial(n) {
    const r = new fo(n);
    return r.fog = true, r.color = n.color, r.map = n.map === void 0 ? null : n.map, r.lightMap = null, r.lightMapIntensity = 1, r.aoMap = n.aoMap === void 0 ? null : n.aoMap, r.aoMapIntensity = 1, r.emissive = n.emissive, r.emissiveIntensity = n.emissiveIntensity === void 0 ? 1 : n.emissiveIntensity, r.emissiveMap = n.emissiveMap === void 0 ? null : n.emissiveMap, r.bumpMap = n.bumpMap === void 0 ? null : n.bumpMap, r.bumpScale = 1, r.normalMap = n.normalMap === void 0 ? null : n.normalMap, r.normalMapType = TangentSpaceNormalMap, n.normalScale && (r.normalScale = n.normalScale), r.displacementMap = null, r.displacementScale = 1, r.displacementBias = 0, r.specularMap = n.specularMap === void 0 ? null : n.specularMap, r.specular = n.specular, r.glossinessMap = n.glossinessMap === void 0 ? null : n.glossinessMap, r.glossiness = n.glossiness, r.alphaMap = null, r.envMap = n.envMap === void 0 ? null : n.envMap, r.envMapIntensity = 1, r.refractionRatio = 0.98, r;
  }
};
var Ip = class {
  constructor() {
    this.name = re.KHR_MESH_QUANTIZATION;
  }
};
var Wa = class extends Interpolant {
  constructor(n, r, s, a) {
    super(n, r, s, a);
  }
  copySampleValue_(n) {
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, c = n * a * 3 + a;
    for (let p = 0; p !== a; p++)
      r[p] = s[c + p];
    return r;
  }
  interpolate_(n, r, s, a) {
    const c = this.resultBuffer, p = this.sampleValues, h = this.valueSize, d = h * 2, g = h * 3, w = a - r, _ = (s - r) / w, y = _ * _, P = y * _, I2 = n * g, S = I2 - g, R = -2 * P + 3 * y, j = P - y, F = 1 - R, V = j - y + _;
    for (let D2 = 0; D2 !== h; D2++) {
      const Y = p[S + D2 + h], G = p[S + D2 + d] * w, N = p[I2 + D2 + h], O = p[I2 + D2] * w;
      c[D2] = F * Y + V * G + R * N + j * O;
    }
    return c;
  }
};
var Vp = new Quaternion();
var Dp = class extends Wa {
  interpolate_(n, r, s, a) {
    const c = super.interpolate_(n, r, s, a);
    return Vp.fromArray(c).normalize().toArray(c), c;
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
var es = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
var da = {
  9728: NearestFilter,
  9729: LinearFilter,
  9984: NearestMipmapNearestFilter,
  9985: LinearMipmapNearestFilter,
  9986: NearestMipmapLinearFilter,
  9987: LinearMipmapLinearFilter
};
var ma = {
  33071: ClampToEdgeWrapping,
  33648: MirroredRepeatWrapping,
  10497: RepeatWrapping
};
var fa = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
var vo = {
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
var Op = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: InterpolateLinear,
  STEP: InterpolateDiscrete
};
var io = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function Np(v) {
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
function $i(v, n, r) {
  for (const s in r.extensions)
    v[s] === void 0 && (n.userData.gltfExtensions = n.userData.gltfExtensions || {}, n.userData.gltfExtensions[s] = r.extensions[s]);
}
function Dn(v, n) {
  n.extras !== void 0 && (typeof n.extras == "object" ? Object.assign(v.userData, n.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + n.extras));
}
function Fp(v, n, r) {
  let s = false, a = false, c = false;
  for (let g = 0, w = n.length; g < w; g++) {
    const _ = n[g];
    if (_.POSITION !== void 0 && (s = true), _.NORMAL !== void 0 && (a = true), _.COLOR_0 !== void 0 && (c = true), s && a && c)
      break;
  }
  if (!s && !a && !c)
    return Promise.resolve(v);
  const p = [], h = [], d = [];
  for (let g = 0, w = n.length; g < w; g++) {
    const _ = n[g];
    if (s) {
      const y = _.POSITION !== void 0 ? r.getDependency("accessor", _.POSITION) : v.attributes.position;
      p.push(y);
    }
    if (a) {
      const y = _.NORMAL !== void 0 ? r.getDependency("accessor", _.NORMAL) : v.attributes.normal;
      h.push(y);
    }
    if (c) {
      const y = _.COLOR_0 !== void 0 ? r.getDependency("accessor", _.COLOR_0) : v.attributes.color;
      d.push(y);
    }
  }
  return Promise.all([Promise.all(p), Promise.all(h), Promise.all(d)]).then(function(g) {
    const w = g[0], _ = g[1], y = g[2];
    return s && (v.morphAttributes.position = w), a && (v.morphAttributes.normal = _), c && (v.morphAttributes.color = y), v.morphTargetsRelative = true, v;
  });
}
function Bp(v, n) {
  if (v.updateMorphTargets(), n.weights !== void 0)
    for (let r = 0, s = n.weights.length; r < s; r++)
      v.morphTargetInfluences[r] = n.weights[r];
  if (n.extras && Array.isArray(n.extras.targetNames)) {
    const r = n.extras.targetNames;
    if (v.morphTargetInfluences.length === r.length) {
      v.morphTargetDictionary = {};
      for (let s = 0, a = r.length; s < a; s++)
        v.morphTargetDictionary[r[s]] = s;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function jp(v) {
  const n = v.extensions && v.extensions[re.KHR_DRACO_MESH_COMPRESSION];
  let r;
  return n ? r = "draco:" + n.bufferView + ":" + n.indices + ":" + va(n.attributes) : r = v.indices + ":" + va(v.attributes) + ":" + v.mode, r;
}
function va(v) {
  let n = "";
  const r = Object.keys(v).sort();
  for (let s = 0, a = r.length; s < a; s++)
    n += r[s] + ":" + v[r[s]] + ";";
  return n;
}
function bo(v) {
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
function zp(v) {
  return v.search(/\.jpe?g($|\?)/i) > 0 || v.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : v.search(/\.webp($|\?)/i) > 0 || v.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
var Up = class {
  constructor(n = {}, r = {}) {
    var s, a;
    this.json = n, this.extensions = {}, this.plugins = {}, this.options = r, this.cache = new fp(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.meshCache = {
      refs: {},
      uses: {}
    }, this.cameraCache = {
      refs: {},
      uses: {}
    }, this.lightCache = {
      refs: {},
      uses: {}
    }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    const c = typeof navigator < "u" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === true, p = typeof navigator < "u" && ((s = navigator.userAgent) === null || s === void 0 ? void 0 : s.indexOf("Firefox")) > -1, h = typeof navigator < "u" && p ? (a = navigator.userAgent) === null || a === void 0 ? void 0 : a.match(/Firefox\/([0-9]+)\./)[1] : -1;
    typeof createImageBitmap > "u" || c || p && h < 98 ? this.textureLoader = new TextureLoader(this.options.manager) : this.textureLoader = new ImageBitmapLoader(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new FileLoader(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(true);
  }
  setExtensions(n) {
    this.extensions = n;
  }
  setPlugins(n) {
    this.plugins = n;
  }
  parse(n, r) {
    const s = this, a = this.json, c = this.extensions;
    this.cache.removeAll(), this._invokeAll(function(p) {
      return p._markDefs && p._markDefs();
    }), Promise.all(this._invokeAll(function(p) {
      return p.beforeRoot && p.beforeRoot();
    })).then(function() {
      return Promise.all([s.getDependencies("scene"), s.getDependencies("animation"), s.getDependencies("camera")]);
    }).then(function(p) {
      const h = {
        scene: p[0][a.scene || 0],
        scenes: p[0],
        animations: p[1],
        cameras: p[2],
        asset: a.asset,
        parser: s,
        userData: {}
      };
      $i(c, h, a), Dn(h, a), Promise.all(s._invokeAll(function(d) {
        return d.afterRoot && d.afterRoot(h);
      })).then(function() {
        n(h);
      });
    }).catch(r);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   */
  _markDefs() {
    const n = this.json.nodes || [], r = this.json.skins || [], s = this.json.meshes || [];
    for (let a = 0, c = r.length; a < c; a++) {
      const p = r[a].joints;
      for (let h = 0, d = p.length; h < d; h++)
        n[p[h]].isBone = true;
    }
    for (let a = 0, c = n.length; a < c; a++) {
      const p = n[a];
      p.mesh !== void 0 && (this._addNodeRef(this.meshCache, p.mesh), p.skin !== void 0 && (s[p.mesh].isSkinnedMesh = true)), p.camera !== void 0 && this._addNodeRef(this.cameraCache, p.camera);
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
  _addNodeRef(n, r) {
    r !== void 0 && (n.refs[r] === void 0 && (n.refs[r] = n.uses[r] = 0), n.refs[r]++);
  }
  /** Returns a reference to a shared resource, cloning it if necessary. */
  _getNodeRef(n, r, s) {
    if (n.refs[r] <= 1)
      return s;
    const a = s.clone(), c = (p, h) => {
      const d = this.associations.get(p);
      d != null && this.associations.set(h, d);
      for (const [g, w] of p.children.entries())
        c(w, h.children[g]);
    };
    return c(s, a), a.name += "_instance_" + n.uses[r]++, a;
  }
  _invokeOne(n) {
    const r = Object.values(this.plugins);
    r.push(this);
    for (let s = 0; s < r.length; s++) {
      const a = n(r[s]);
      if (a)
        return a;
    }
    return null;
  }
  _invokeAll(n) {
    const r = Object.values(this.plugins);
    r.unshift(this);
    const s = [];
    for (let a = 0; a < r.length; a++) {
      const c = n(r[a]);
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
  getDependency(n, r) {
    const s = n + ":" + r;
    let a = this.cache.get(s);
    if (!a) {
      switch (n) {
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
          throw new Error("Unknown type: " + n);
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
  getDependencies(n) {
    let r = this.cache.get(n);
    if (!r) {
      const s = this, a = this.json[n + (n === "mesh" ? "es" : "s")] || [];
      r = Promise.all(a.map(function(c, p) {
        return s.getDependency(n, p);
      })), this.cache.add(n, r);
    }
    return r;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(n) {
    const r = this.json.buffers[n], s = this.fileLoader;
    if (r.type && r.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + r.type + " buffer type is not supported.");
    if (r.uri === void 0 && n === 0)
      return Promise.resolve(this.extensions[re.KHR_BINARY_GLTF].body);
    const a = this.options;
    return new Promise(function(c, p) {
      s.load(LoaderUtils.resolveURL(r.uri, a.path), c, void 0, function() {
        p(new Error('THREE.GLTFLoader: Failed to load buffer "' + r.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(n) {
    const r = this.json.bufferViews[n];
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
  loadAccessor(n) {
    const r = this, s = this.json, a = this.json.accessors[n];
    if (a.bufferView === void 0 && a.sparse === void 0)
      return Promise.resolve(null);
    const c = [];
    return a.bufferView !== void 0 ? c.push(this.getDependency("bufferView", a.bufferView)) : c.push(null), a.sparse !== void 0 && (c.push(this.getDependency("bufferView", a.sparse.indices.bufferView)), c.push(this.getDependency("bufferView", a.sparse.values.bufferView))), Promise.all(c).then(function(p) {
      const h = p[0], d = fa[a.type], g = es[a.componentType], w = g.BYTES_PER_ELEMENT, _ = w * d, y = a.byteOffset || 0, P = a.bufferView !== void 0 ? s.bufferViews[a.bufferView].byteStride : void 0, I2 = a.normalized === true;
      let S, R;
      if (P && P !== _) {
        const j = Math.floor(y / P), F = "InterleavedBuffer:" + a.bufferView + ":" + a.componentType + ":" + j + ":" + a.count;
        let V = r.cache.get(F);
        V || (S = new g(h, j * P, a.count * P / w), V = new InterleavedBuffer(S, P / w), r.cache.add(F, V)), R = new InterleavedBufferAttribute(V, d, y % P / w, I2);
      } else
        h === null ? S = new g(a.count * d) : S = new g(h, y, a.count * d), R = new BufferAttribute(S, d, I2);
      if (a.sparse !== void 0) {
        const j = fa.SCALAR, F = es[a.sparse.indices.componentType], V = a.sparse.indices.byteOffset || 0, D2 = a.sparse.values.byteOffset || 0, Y = new F(p[1], V, a.sparse.count * j), G = new g(p[2], D2, a.sparse.count * d);
        h !== null && (R = new BufferAttribute(R.array.slice(), R.itemSize, R.normalized));
        for (let N = 0, O = Y.length; N < O; N++) {
          const H = Y[N];
          if (R.setX(H, G[N * d]), d >= 2 && R.setY(H, G[N * d + 1]), d >= 3 && R.setZ(H, G[N * d + 2]), d >= 4 && R.setW(H, G[N * d + 3]), d >= 5)
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
  loadTexture(n) {
    const r = this.json, s = this.options, c = r.textures[n].source, p = r.images[c];
    let h = this.textureLoader;
    if (p.uri) {
      const d = s.manager.getHandler(p.uri);
      d !== null && (h = d);
    }
    return this.loadTextureImage(n, c, h);
  }
  loadTextureImage(n, r, s) {
    const a = this, c = this.json, p = c.textures[n], h = c.images[r], d = (h.uri || h.bufferView) + ":" + p.sampler;
    if (this.textureCache[d])
      return this.textureCache[d];
    const g = this.loadImageSource(r, s).then(function(w) {
      w.flipY = false, p.name && (w.name = p.name);
      const y = (c.samplers || {})[p.sampler] || {};
      return w.magFilter = da[y.magFilter] || LinearFilter, w.minFilter = da[y.minFilter] || LinearMipmapLinearFilter, w.wrapS = ma[y.wrapS] || RepeatWrapping, w.wrapT = ma[y.wrapT] || RepeatWrapping, a.associations.set(w, {
        textures: n
      }), w;
    }).catch(function() {
      return null;
    });
    return this.textureCache[d] = g, g;
  }
  loadImageSource(n, r) {
    const s = this, a = this.json, c = this.options;
    if (this.sourceCache[n] !== void 0)
      return this.sourceCache[n].then((_) => _.clone());
    const p = a.images[n], h = self.URL || self.webkitURL;
    let d = p.uri || "", g = false;
    if (p.bufferView !== void 0)
      d = s.getDependency("bufferView", p.bufferView).then(function(_) {
        g = true;
        const y = new Blob([_], {
          type: p.mimeType
        });
        return d = h.createObjectURL(y), d;
      });
    else if (p.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + n + " is missing URI and bufferView");
    const w = Promise.resolve(d).then(function(_) {
      return new Promise(function(y, P) {
        let I2 = y;
        r.isImageBitmapLoader === true && (I2 = function(S) {
          const R = new Texture(S);
          R.needsUpdate = true, y(R);
        }), r.load(LoaderUtils.resolveURL(_, c.path), I2, void 0, P);
      });
    }).then(function(_) {
      return g === true && h.revokeObjectURL(d), _.userData.mimeType = p.mimeType || zp(p.uri), _;
    }).catch(function(_) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", d), _;
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
  assignTexture(n, r, s, a) {
    const c = this;
    return this.getDependency("texture", s.index).then(function(p) {
      if (s.texCoord !== void 0 && s.texCoord != 0 && !(r === "aoMap" && s.texCoord == 1) && console.warn("THREE.GLTFLoader: Custom UV set " + s.texCoord + " for texture " + r + " not yet supported."), c.extensions[re.KHR_TEXTURE_TRANSFORM]) {
        const h = s.extensions !== void 0 ? s.extensions[re.KHR_TEXTURE_TRANSFORM] : void 0;
        if (h) {
          const d = c.associations.get(p);
          p = c.extensions[re.KHR_TEXTURE_TRANSFORM].extendTexture(p, h), c.associations.set(p, d);
        }
      }
      return a !== void 0 && (p.encoding = a), n[r] = p, p;
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
    const r = n.geometry;
    let s = n.material;
    const a = r.attributes.tangent === void 0, c = r.attributes.color !== void 0, p = r.attributes.normal === void 0;
    if (n.isPoints) {
      const h = "PointsMaterial:" + s.uuid;
      let d = this.cache.get(h);
      d || (d = new PointsMaterial(), Material.prototype.copy.call(d, s), d.color.copy(s.color), d.map = s.map, d.sizeAttenuation = false, this.cache.add(h, d)), s = d;
    } else if (n.isLine) {
      const h = "LineBasicMaterial:" + s.uuid;
      let d = this.cache.get(h);
      d || (d = new LineBasicMaterial(), Material.prototype.copy.call(d, s), d.color.copy(s.color), this.cache.add(h, d)), s = d;
    }
    if (a || c || p) {
      let h = "ClonedMaterial:" + s.uuid + ":";
      s.isGLTFSpecularGlossinessMaterial && (h += "specular-glossiness:"), a && (h += "derivative-tangents:"), c && (h += "vertex-colors:"), p && (h += "flat-shading:");
      let d = this.cache.get(h);
      d || (d = s.clone(), c && (d.vertexColors = true), p && (d.flatShading = true), a && (d.normalScale && (d.normalScale.y *= -1), d.clearcoatNormalScale && (d.clearcoatNormalScale.y *= -1)), this.cache.add(h, d), this.associations.set(d, this.associations.get(s))), s = d;
    }
    s.aoMap && r.attributes.uv2 === void 0 && r.attributes.uv !== void 0 && r.setAttribute("uv2", r.attributes.uv), n.material = s;
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
    const r = this, s = this.json, a = this.extensions, c = s.materials[n];
    let p;
    const h = {}, d = c.extensions || {}, g = [];
    if (d[re.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]) {
      const _ = a[re.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];
      p = _.getMaterialType(), g.push(_.extendParams(h, c, r));
    } else if (d[re.KHR_MATERIALS_UNLIT]) {
      const _ = a[re.KHR_MATERIALS_UNLIT];
      p = _.getMaterialType(), g.push(_.extendParams(h, c, r));
    } else {
      const _ = c.pbrMetallicRoughness || {};
      if (h.color = new Color(1, 1, 1), h.opacity = 1, Array.isArray(_.baseColorFactor)) {
        const y = _.baseColorFactor;
        h.color.fromArray(y), h.opacity = y[3];
      }
      _.baseColorTexture !== void 0 && g.push(r.assignTexture(h, "map", _.baseColorTexture, sRGBEncoding)), h.metalness = _.metallicFactor !== void 0 ? _.metallicFactor : 1, h.roughness = _.roughnessFactor !== void 0 ? _.roughnessFactor : 1, _.metallicRoughnessTexture !== void 0 && (g.push(r.assignTexture(h, "metalnessMap", _.metallicRoughnessTexture)), g.push(r.assignTexture(h, "roughnessMap", _.metallicRoughnessTexture))), p = this._invokeOne(function(y) {
        return y.getMaterialType && y.getMaterialType(n);
      }), g.push(Promise.all(this._invokeAll(function(y) {
        return y.extendMaterialParams && y.extendMaterialParams(n, h);
      })));
    }
    c.doubleSided === true && (h.side = DoubleSide);
    const w = c.alphaMode || io.OPAQUE;
    if (w === io.BLEND ? (h.transparent = true, h.depthWrite = false) : (h.transparent = false, w === io.MASK && (h.alphaTest = c.alphaCutoff !== void 0 ? c.alphaCutoff : 0.5)), c.normalTexture !== void 0 && p !== MeshBasicMaterial && (g.push(r.assignTexture(h, "normalMap", c.normalTexture)), h.normalScale = new Vector2(1, 1), c.normalTexture.scale !== void 0)) {
      const _ = c.normalTexture.scale;
      h.normalScale.set(_, _);
    }
    return c.occlusionTexture !== void 0 && p !== MeshBasicMaterial && (g.push(r.assignTexture(h, "aoMap", c.occlusionTexture)), c.occlusionTexture.strength !== void 0 && (h.aoMapIntensity = c.occlusionTexture.strength)), c.emissiveFactor !== void 0 && p !== MeshBasicMaterial && (h.emissive = new Color().fromArray(c.emissiveFactor)), c.emissiveTexture !== void 0 && p !== MeshBasicMaterial && g.push(r.assignTexture(h, "emissiveMap", c.emissiveTexture, sRGBEncoding)), Promise.all(g).then(function() {
      let _;
      return p === fo ? _ = a[re.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(h) : _ = new p(h), c.name && (_.name = c.name), Dn(_, c), r.associations.set(_, {
        materials: n
      }), c.extensions && $i(a, _, c), _;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(n) {
    const r = PropertyBinding.sanitizeNodeName(n || "");
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
  loadGeometries(n) {
    const r = this, s = this.extensions, a = this.primitiveCache;
    function c(h) {
      return s[re.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(h, r).then(function(d) {
        return ba(d, h, r);
      });
    }
    const p = [];
    for (let h = 0, d = n.length; h < d; h++) {
      const g = n[h], w = jp(g), _ = a[w];
      if (_)
        p.push(_.promise);
      else {
        let y;
        g.extensions && g.extensions[re.KHR_DRACO_MESH_COMPRESSION] ? y = c(g) : y = ba(new BufferGeometry(), g, r), a[w] = {
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
    const r = this, s = this.json, a = this.extensions, c = s.meshes[n], p = c.primitives, h = [];
    for (let d = 0, g = p.length; d < g; d++) {
      const w = p[d].material === void 0 ? Np(this.cache) : this.getDependency("material", p[d].material);
      h.push(w);
    }
    return h.push(r.loadGeometries(p)), Promise.all(h).then(function(d) {
      const g = d.slice(0, d.length - 1), w = d[d.length - 1], _ = [];
      for (let P = 0, I2 = w.length; P < I2; P++) {
        const S = w[P], R = p[P];
        let j;
        const F = g[P];
        if (R.mode === Bt.TRIANGLES || R.mode === Bt.TRIANGLE_STRIP || R.mode === Bt.TRIANGLE_FAN || R.mode === void 0)
          j = c.isSkinnedMesh === true ? new SkinnedMesh(S, F) : new Mesh(S, F), j.isSkinnedMesh === true && !j.geometry.attributes.skinWeight.normalized && j.normalizeSkinWeights(), R.mode === Bt.TRIANGLE_STRIP ? j.geometry = ga(j.geometry, TriangleStripDrawMode) : R.mode === Bt.TRIANGLE_FAN && (j.geometry = ga(j.geometry, TriangleFanDrawMode));
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
        Object.keys(j.geometry.morphAttributes).length > 0 && Bp(j, c), j.name = r.createUniqueName(c.name || "mesh_" + n), Dn(j, c), R.extensions && $i(a, j, R), r.assignFinalMaterial(j), _.push(j);
      }
      for (let P = 0, I2 = _.length; P < I2; P++)
        r.associations.set(_[P], {
          meshes: n,
          primitives: P
        });
      if (_.length === 1)
        return _[0];
      const y = new Group();
      r.associations.set(y, {
        meshes: n
      });
      for (let P = 0, I2 = _.length; P < I2; P++)
        y.add(_[P]);
      return y;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */
  loadCamera(n) {
    let r;
    const s = this.json.cameras[n], a = s[s.type];
    if (!a) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return s.type === "perspective" ? r = new PerspectiveCamera(MathUtils.radToDeg(a.yfov), a.aspectRatio || 1, a.znear || 1, a.zfar || 2e6) : s.type === "orthographic" && (r = new OrthographicCamera(-a.xmag, a.xmag, a.ymag, -a.ymag, a.znear, a.zfar)), s.name && (r.name = this.createUniqueName(s.name)), Dn(r, s), Promise.resolve(r);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Object>}
   */
  loadSkin(n) {
    const r = this.json.skins[n], s = {
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
  loadAnimation(n) {
    const s = this.json.animations[n], a = [], c = [], p = [], h = [], d = [];
    for (let g = 0, w = s.channels.length; g < w; g++) {
      const _ = s.channels[g], y = s.samplers[_.sampler], P = _.target, I2 = P.node, S = s.parameters !== void 0 ? s.parameters[y.input] : y.input, R = s.parameters !== void 0 ? s.parameters[y.output] : y.output;
      a.push(this.getDependency("node", I2)), c.push(this.getDependency("accessor", S)), p.push(this.getDependency("accessor", R)), h.push(y), d.push(P);
    }
    return Promise.all([Promise.all(a), Promise.all(c), Promise.all(p), Promise.all(h), Promise.all(d)]).then(function(g) {
      const w = g[0], _ = g[1], y = g[2], P = g[3], I2 = g[4], S = [];
      for (let j = 0, F = w.length; j < F; j++) {
        const V = w[j], D2 = _[j], Y = y[j], G = P[j], N = I2[j];
        if (V === void 0)
          continue;
        V.updateMatrix();
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
        const H = V.name ? V.name : V.uuid, K = G.interpolation !== void 0 ? Op[G.interpolation] : InterpolateLinear, q = [];
        rn[N.path] === rn.weights ? V.traverse(function(ge) {
          ge.morphTargetInfluences && q.push(ge.name ? ge.name : ge.uuid);
        }) : q.push(H);
        let pe = Y.array;
        if (Y.normalized) {
          const ge = bo(pe.constructor), ce = new Float32Array(pe.length);
          for (let me = 0, he = pe.length; me < he; me++)
            ce[me] = pe[me] * ge;
          pe = ce;
        }
        for (let ge = 0, ce = q.length; ge < ce; ge++) {
          const me = new O(q[ge] + "." + rn[N.path], D2.array, pe, K);
          G.interpolation === "CUBICSPLINE" && (me.createInterpolant = function(ee) {
            const X = this instanceof QuaternionKeyframeTrack ? Dp : Wa;
            return new X(this.times, this.values, this.getValueSize() / 3, ee);
          }, me.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true), S.push(me);
        }
      }
      const R = s.name ? s.name : "animation_" + n;
      return new AnimationClip(R, void 0, S);
    });
  }
  createNodeMesh(n) {
    const r = this.json, s = this, a = r.nodes[n];
    return a.mesh === void 0 ? null : s.getDependency("mesh", a.mesh).then(function(c) {
      const p = s._getNodeRef(s.meshCache, a.mesh, c);
      return a.weights !== void 0 && p.traverse(function(h) {
        if (h.isMesh)
          for (let d = 0, g = a.weights.length; d < g; d++)
            h.morphTargetInfluences[d] = a.weights[d];
      }), p;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(n) {
    const r = this.json, s = this.extensions, a = this, c = r.nodes[n], p = c.name ? a.createUniqueName(c.name) : "";
    return function() {
      const h = [], d = a._invokeOne(function(g) {
        return g.createNodeMesh && g.createNodeMesh(n);
      });
      return d && h.push(d), c.camera !== void 0 && h.push(a.getDependency("camera", c.camera).then(function(g) {
        return a._getNodeRef(a.cameraCache, c.camera, g);
      })), a._invokeAll(function(g) {
        return g.createNodeAttachment && g.createNodeAttachment(n);
      }).forEach(function(g) {
        h.push(g);
      }), Promise.all(h);
    }().then(function(h) {
      let d;
      if (c.isBone === true ? d = new Bone() : h.length > 1 ? d = new Group() : h.length === 1 ? d = h[0] : d = new Object3D(), d !== h[0])
        for (let g = 0, w = h.length; g < w; g++)
          d.add(h[g]);
      if (c.name && (d.userData.name = c.name, d.name = p), Dn(d, c), c.extensions && $i(s, d, c), c.matrix !== void 0) {
        const g = new Matrix4();
        g.fromArray(c.matrix), d.applyMatrix4(g);
      } else
        c.translation !== void 0 && d.position.fromArray(c.translation), c.rotation !== void 0 && d.quaternion.fromArray(c.rotation), c.scale !== void 0 && d.scale.fromArray(c.scale);
      return a.associations.has(d) || a.associations.set(d, {}), a.associations.get(d).nodes = n, d;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(n) {
    const r = this.json, s = this.extensions, a = this.json.scenes[n], c = this, p = new Group();
    a.name && (p.name = c.createUniqueName(a.name)), Dn(p, a), a.extensions && $i(s, p, a);
    const h = a.nodes || [], d = [];
    for (let g = 0, w = h.length; g < w; g++)
      d.push(Ja(h[g], p, r, c));
    return Promise.all(d).then(function() {
      const g = (w) => {
        const _ = /* @__PURE__ */ new Map();
        for (const [y, P] of c.associations)
          (y instanceof Material || y instanceof Texture) && _.set(y, P);
        return w.traverse((y) => {
          const P = c.associations.get(y);
          P != null && _.set(y, P);
        }), _;
      };
      return c.associations = g(p), p;
    });
  }
};
function Ja(v, n, r, s) {
  const a = r.nodes[v];
  return s.getDependency("node", v).then(function(c) {
    if (a.skin === void 0)
      return c;
    let p;
    return s.getDependency("skin", a.skin).then(function(h) {
      p = h;
      const d = [];
      for (let g = 0, w = p.joints.length; g < w; g++)
        d.push(s.getDependency("node", p.joints[g]));
      return Promise.all(d);
    }).then(function(h) {
      return c.traverse(function(d) {
        if (!d.isMesh)
          return;
        const g = [], w = [];
        for (let _ = 0, y = h.length; _ < y; _++) {
          const P = h[_];
          if (P) {
            g.push(P);
            const I2 = new Matrix4();
            p.inverseBindMatrices !== void 0 && I2.fromArray(p.inverseBindMatrices.array, _ * 16), w.push(I2);
          } else
            console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', p.joints[_]);
        }
        d.bind(new Skeleton(g, w), d.matrixWorld);
      }), c;
    });
  }).then(function(c) {
    n.add(c);
    const p = [];
    if (a.children) {
      const h = a.children;
      for (let d = 0, g = h.length; d < g; d++) {
        const w = h[d];
        p.push(Ja(w, c, r, s));
      }
    }
    return Promise.all(p);
  });
}
function Gp(v, n, r) {
  const s = n.attributes, a = new Box3();
  if (s.POSITION !== void 0) {
    const h = r.json.accessors[s.POSITION], d = h.min, g = h.max;
    if (d !== void 0 && g !== void 0) {
      if (a.set(new Vector3(d[0], d[1], d[2]), new Vector3(g[0], g[1], g[2])), h.normalized) {
        const w = bo(es[h.componentType]);
        a.min.multiplyScalar(w), a.max.multiplyScalar(w);
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
      const _ = c[g];
      if (_.POSITION !== void 0) {
        const y = r.json.accessors[_.POSITION], P = y.min, I2 = y.max;
        if (P !== void 0 && I2 !== void 0) {
          if (d.setX(Math.max(Math.abs(P[0]), Math.abs(I2[0]))), d.setY(Math.max(Math.abs(P[1]), Math.abs(I2[1]))), d.setZ(Math.max(Math.abs(P[2]), Math.abs(I2[2]))), y.normalized) {
            const S = bo(es[y.componentType]);
            d.multiplyScalar(S);
          }
          h.max(d);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    a.expandByVector(h);
  }
  v.boundingBox = a;
  const p = new Sphere();
  a.getCenter(p.center), p.radius = a.min.distanceTo(a.max) / 2, v.boundingSphere = p;
}
function ba(v, n, r) {
  const s = n.attributes, a = [];
  function c(p, h) {
    return r.getDependency("accessor", p).then(function(d) {
      v.setAttribute(h, d);
    });
  }
  for (const p in s) {
    const h = vo[p] || p.toLowerCase();
    h in v.attributes || a.push(c(s[p], h));
  }
  if (n.indices !== void 0 && !v.index) {
    const p = r.getDependency("accessor", n.indices).then(function(h) {
      v.setIndex(h);
    });
    a.push(p);
  }
  return Dn(v, n), Gp(v, n, r), Promise.all(a).then(function() {
    return n.targets !== void 0 ? Fp(v, n.targets, r) : v;
  });
}
function ga(v, n) {
  let r = v.getIndex();
  if (r === null) {
    const p = [], h = v.getAttribute("position");
    if (h !== void 0) {
      for (let d = 0; d < h.count; d++)
        p.push(d);
      v.setIndex(p), r = v.getIndex();
    } else
      return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), v;
  }
  const s = r.count - 2, a = [];
  if (n === TriangleFanDrawMode)
    for (let p = 1; p <= s; p++)
      a.push(r.getX(0)), a.push(r.getX(p)), a.push(r.getX(p + 1));
  else
    for (let p = 0; p < s; p++)
      p % 2 === 0 ? (a.push(r.getX(p)), a.push(r.getX(p + 1)), a.push(r.getX(p + 2))) : (a.push(r.getX(p + 2)), a.push(r.getX(p + 1)), a.push(r.getX(p)));
  a.length / 3 !== s && console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
  const c = v.clone();
  return c.setIndex(a), c;
}
var Hp = class extends ExtrudeGeometry {
  constructor(n, r = {}) {
    const {
      bevelEnabled: s = false,
      bevelSize: a = 8,
      bevelThickness: c = 10,
      font: p,
      height: h = 50,
      size: d = 100,
      lineHeight: g = 1,
      letterSpacing: w = 0,
      ..._
    } = r;
    if (p === void 0)
      super();
    else {
      const y = p.generateShapes(n, d, {
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
function el(v, n, r) {
  const s = r.length - v - 1;
  if (n >= r[s])
    return s - 1;
  if (n <= r[v])
    return v;
  let a = v, c = s, p = Math.floor((a + c) / 2);
  for (; n < r[p] || n >= r[p + 1]; )
    n < r[p] ? c = p : a = p, p = Math.floor((a + c) / 2);
  return p;
}
function Kp(v, n, r, s) {
  const a = [], c = [], p = [];
  a[0] = 1;
  for (let h = 1; h <= r; ++h) {
    c[h] = n - s[v + 1 - h], p[h] = s[v + h] - n;
    let d = 0;
    for (let g = 0; g < h; ++g) {
      const w = p[g + 1], _ = c[h - g], y = a[g] / (w + _);
      a[g] = d + w * y, d = _ * y;
    }
    a[h] = d;
  }
  return a;
}
function $p(v, n, r, s) {
  const a = el(v, s, n), c = Kp(a, s, v, n), p = new Vector4(0, 0, 0, 0);
  for (let h = 0; h <= v; ++h) {
    const d = r[a - v + h], g = c[h], w = d.w * g;
    p.x += d.x * w, p.y += d.y * w, p.z += d.z * w, p.w += d.w * g;
  }
  return p;
}
function Xp(v, n, r, s, a) {
  const c = [];
  for (let y = 0; y <= r; ++y)
    c[y] = 0;
  const p = [];
  for (let y = 0; y <= s; ++y)
    p[y] = c.slice(0);
  const h = [];
  for (let y = 0; y <= r; ++y)
    h[y] = c.slice(0);
  h[0][0] = 1;
  const d = c.slice(0), g = c.slice(0);
  for (let y = 1; y <= r; ++y) {
    d[y] = n - a[v + 1 - y], g[y] = a[v + y] - n;
    let P = 0;
    for (let I2 = 0; I2 < y; ++I2) {
      const S = g[I2 + 1], R = d[y - I2];
      h[y][I2] = S + R;
      const j = h[I2][y - 1] / h[y][I2];
      h[I2][y] = P + S * j, P = R * j;
    }
    h[y][y] = P;
  }
  for (let y = 0; y <= r; ++y)
    p[0][y] = h[y][r];
  for (let y = 0; y <= r; ++y) {
    let P = 0, I2 = 1;
    const S = [];
    for (let R = 0; R <= r; ++R)
      S[R] = c.slice(0);
    S[0][0] = 1;
    for (let R = 1; R <= s; ++R) {
      let j = 0;
      const F = y - R, V = r - R;
      y >= R && (S[I2][0] = S[P][0] / h[V + 1][F], j = S[I2][0] * h[F][V]);
      const D2 = F >= -1 ? 1 : -F, Y = y - 1 <= V ? R - 1 : r - y;
      for (let G = D2; G <= Y; ++G)
        S[I2][G] = (S[P][G] - S[P][G - 1]) / h[V + 1][F + G], j += S[I2][G] * h[F + G][V];
      y <= V && (S[I2][R] = -S[P][R - 1] / h[V + 1][y], j += S[I2][R] * h[y][V]), p[R][y] = j;
      var w = P;
      P = I2, I2 = w;
    }
  }
  var _ = r;
  for (let y = 1; y <= s; ++y) {
    for (let P = 0; P <= r; ++P)
      p[y][P] *= _;
    _ *= r - y;
  }
  return p;
}
function Yp(v, n, r, s, a) {
  const c = a < v ? a : v, p = [], h = el(v, s, n), d = Xp(h, s, v, c, n), g = [];
  for (let _ = 0; _ < r.length; ++_) {
    var w = r[_].clone();
    const y = w.w;
    w.x *= y, w.y *= y, w.z *= y, g[_] = w;
  }
  for (let _ = 0; _ <= c; ++_) {
    var w = g[h - v].clone().multiplyScalar(d[_][0]);
    for (let P = 1; P <= v; ++P)
      w.add(g[h - v + P].clone().multiplyScalar(d[_][P]));
    p[_] = w;
  }
  for (let _ = c + 1; _ <= a + 1; ++_)
    p[_] = new Vector4(0, 0, 0);
  return p;
}
function qp(v, n) {
  let r = 1;
  for (let a = 2; a <= v; ++a)
    r *= a;
  let s = 1;
  for (let a = 2; a <= n; ++a)
    s *= a;
  for (let a = 2; a <= v - n; ++a)
    s *= a;
  return r / s;
}
function Qp(v) {
  const n = v.length, r = [], s = [];
  for (let c = 0; c < n; ++c) {
    const p = v[c];
    r[c] = new Vector3(p.x, p.y, p.z), s[c] = p.w;
  }
  const a = [];
  for (let c = 0; c < n; ++c) {
    const p = r[c].clone();
    for (let h = 1; h <= c; ++h)
      p.sub(a[c - h].clone().multiplyScalar(qp(c, h) * s[h]));
    a[c] = p.divideScalar(s[0]);
  }
  return a;
}
function Zp(v, n, r, s, a) {
  const c = Yp(v, n, r, s, a);
  return Qp(c);
}
var _a = class extends Curve {
  constructor(n, r, s, a, c) {
    super(), this.degree = n, this.knots = r, this.controlPoints = [], this.startKnot = a || 0, this.endKnot = c || this.knots.length - 1;
    for (let p = 0; p < s.length; ++p) {
      const h = s[p];
      this.controlPoints[p] = new Vector4(h.x, h.y, h.z, h.w);
    }
  }
  getPoint(n, r) {
    const s = r || new Vector3(), a = this.knots[this.startKnot] + n * (this.knots[this.endKnot] - this.knots[this.startKnot]), c = $p(this.degree, this.knots, this.controlPoints, a);
    return c.w != 1 && c.divideScalar(c.w), s.set(c.x, c.y, c.z);
  }
  getTangent(n, r) {
    const s = r || new Vector3(), a = this.knots[0] + n * (this.knots[this.knots.length - 1] - this.knots[0]), c = Zp(this.degree, this.knots, this.controlPoints, a, 1);
    return s.copy(c[1]).normalize(), s;
  }
};
var se;
var Ae;
var Je;
var Wp = class extends Loader {
  constructor(n) {
    super(n);
  }
  load(n, r, s, a) {
    const c = this, p = c.path === "" ? LoaderUtils.extractUrlBase(n) : c.path, h = new FileLoader(this.manager);
    h.setPath(c.path), h.setResponseType("arraybuffer"), h.setRequestHeader(c.requestHeader), h.setWithCredentials(c.withCredentials), h.load(n, function(d) {
      try {
        r(c.parse(d, p));
      } catch (g) {
        a ? a(g) : console.error(g), c.manager.itemError(n);
      }
    }, s, a);
  }
  parse(n, r) {
    if (sh(n))
      se = new ih().parse(n);
    else {
      const a = sl(n);
      if (!rh(a))
        throw new Error("THREE.FBXLoader: Unknown format.");
      if (ya(a) < 7e3)
        throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + ya(a));
      se = new nh().parse(a);
    }
    const s = new TextureLoader(this.manager).setPath(this.resourcePath || r).setCrossOrigin(this.crossOrigin);
    return new Jp(s, this.manager).parse(se);
  }
};
var Jp = class {
  constructor(n, r) {
    this.textureLoader = n, this.manager = r;
  }
  parse() {
    Ae = this.parseConnections();
    const n = this.parseImages(), r = this.parseTextures(n), s = this.parseMaterials(r), a = this.parseDeformers(), c = new eh().parse(a);
    return this.parseScene(a, c, s), Je;
  }
  // Parses FBXTree.Connections which holds parent-child connections between objects (e.g. material -> texture, model->geometry )
  // and details the connection type
  parseConnections() {
    const n = /* @__PURE__ */ new Map();
    return "Connections" in se && se.Connections.connections.forEach(function(s) {
      const a = s[0], c = s[1], p = s[2];
      n.has(a) || n.set(a, {
        parents: [],
        children: []
      });
      const h = {
        ID: c,
        relationship: p
      };
      n.get(a).parents.push(h), n.has(c) || n.set(c, {
        parents: [],
        children: []
      });
      const d = {
        ID: a,
        relationship: p
      };
      n.get(c).children.push(d);
    }), n;
  }
  // Parse FBXTree.Objects.Video for embedded image data
  // These images are connected to textures in FBXTree.Objects.Textures
  // via FBXTree.Connections.
  parseImages() {
    const n = {}, r = {};
    if ("Video" in se.Objects) {
      const s = se.Objects.Video;
      for (const a in s) {
        const c = s[a], p = parseInt(a);
        if (n[p] = c.RelativeFilename || c.Filename, "Content" in c) {
          const h = c.Content instanceof ArrayBuffer && c.Content.byteLength > 0, d = typeof c.Content == "string" && c.Content !== "";
          if (h || d) {
            const g = this.parseImage(s[a]);
            r[c.RelativeFilename || c.Filename] = g;
          }
        }
      }
    }
    for (const s in n) {
      const a = n[s];
      r[a] !== void 0 ? n[s] = r[a] : n[s] = n[s].split("\\").pop();
    }
    return n;
  }
  // Parse embedded image data in FBXTree.Video.Content
  parseImage(n) {
    const r = n.Content, s = n.RelativeFilename || n.Filename, a = s.slice(s.lastIndexOf(".") + 1).toLowerCase();
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
      const p = new Uint8Array(r);
      return window.URL.createObjectURL(new Blob([p], {
        type: c
      }));
    }
  }
  // Parse nodes in FBXTree.Objects.Texture
  // These contain details such as UV scaling, cropping, rotation etc and are connected
  // to images in FBXTree.Objects.Video
  parseTextures(n) {
    const r = /* @__PURE__ */ new Map();
    if ("Texture" in se.Objects) {
      const s = se.Objects.Texture;
      for (const a in s) {
        const c = this.parseTexture(s[a], n);
        r.set(parseInt(a), c);
      }
    }
    return r;
  }
  // Parse individual node in FBXTree.Objects.Texture
  parseTexture(n, r) {
    const s = this.loadTexture(n, r);
    s.ID = n.id, s.name = n.attrName;
    const a = n.WrapModeU, c = n.WrapModeV, p = a !== void 0 ? a.value : 0, h = c !== void 0 ? c.value : 0;
    if (s.wrapS = p === 0 ? RepeatWrapping : ClampToEdgeWrapping, s.wrapT = h === 0 ? RepeatWrapping : ClampToEdgeWrapping, "Scaling" in n) {
      const d = n.Scaling.value;
      s.repeat.x = d[0], s.repeat.y = d[1];
    }
    return s;
  }
  // load a texture specified as a blob or data URI, or via an external URL using TextureLoader
  loadTexture(n, r) {
    let s;
    const a = this.textureLoader.path, c = Ae.get(n.id).children;
    c !== void 0 && c.length > 0 && r[c[0].ID] !== void 0 && (s = r[c[0].ID], (s.indexOf("blob:") === 0 || s.indexOf("data:") === 0) && this.textureLoader.setPath(void 0));
    let p;
    const h = n.FileName.slice(-3).toLowerCase();
    if (h === "tga") {
      const d = this.manager.getHandler(".tga");
      d === null ? (console.warn("FBXLoader: TGA loader not found, creating placeholder texture for", n.RelativeFilename), p = new Texture()) : (d.setPath(this.textureLoader.path), p = d.load(s));
    } else
      h === "psd" ? (console.warn("FBXLoader: PSD textures are not supported, creating placeholder texture for", n.RelativeFilename), p = new Texture()) : p = this.textureLoader.load(s);
    return this.textureLoader.setPath(a), p;
  }
  // Parse nodes in FBXTree.Objects.Material
  parseMaterials(n) {
    const r = /* @__PURE__ */ new Map();
    if ("Material" in se.Objects) {
      const s = se.Objects.Material;
      for (const a in s) {
        const c = this.parseMaterial(s[a], n);
        c !== null && r.set(parseInt(a), c);
      }
    }
    return r;
  }
  // Parse single node in FBXTree.Objects.Material
  // Materials are connected to texture maps in FBXTree.Objects.Textures
  // FBX format currently only supports Lambert and Phong shading models
  parseMaterial(n, r) {
    const s = n.id, a = n.attrName;
    let c = n.ShadingModel;
    if (typeof c == "object" && (c = c.value), !Ae.has(s))
      return null;
    const p = this.parseParameters(n, r, s);
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
    return h.setValues(p), h.name = a, h;
  }
  // Parse FBX material and return parameters suitable for a three.js material
  // Also parse the texture map and return any textures associated with the material
  parseParameters(n, r, s) {
    const a = {};
    n.BumpFactor && (a.bumpScale = n.BumpFactor.value), n.Diffuse ? a.color = new Color().fromArray(n.Diffuse.value) : n.DiffuseColor && (n.DiffuseColor.type === "Color" || n.DiffuseColor.type === "ColorRGB") && (a.color = new Color().fromArray(n.DiffuseColor.value)), n.DisplacementFactor && (a.displacementScale = n.DisplacementFactor.value), n.Emissive ? a.emissive = new Color().fromArray(n.Emissive.value) : n.EmissiveColor && (n.EmissiveColor.type === "Color" || n.EmissiveColor.type === "ColorRGB") && (a.emissive = new Color().fromArray(n.EmissiveColor.value)), n.EmissiveFactor && (a.emissiveIntensity = parseFloat(n.EmissiveFactor.value)), n.Opacity && (a.opacity = parseFloat(n.Opacity.value)), a.opacity < 1 && (a.transparent = true), n.ReflectionFactor && (a.reflectivity = n.ReflectionFactor.value), n.Shininess && (a.shininess = n.Shininess.value), n.Specular ? a.specular = new Color().fromArray(n.Specular.value) : n.SpecularColor && n.SpecularColor.type === "Color" && (a.specular = new Color().fromArray(n.SpecularColor.value));
    const c = this;
    return Ae.get(s).children.forEach(function(p) {
      const h = p.relationship;
      switch (h) {
        case "Bump":
          a.bumpMap = c.getTexture(r, p.ID);
          break;
        case "Maya|TEX_ao_map":
          a.aoMap = c.getTexture(r, p.ID);
          break;
        case "DiffuseColor":
        case "Maya|TEX_color_map":
          a.map = c.getTexture(r, p.ID), a.map !== void 0 && (a.map.encoding = sRGBEncoding);
          break;
        case "DisplacementColor":
          a.displacementMap = c.getTexture(r, p.ID);
          break;
        case "EmissiveColor":
          a.emissiveMap = c.getTexture(r, p.ID), a.emissiveMap !== void 0 && (a.emissiveMap.encoding = sRGBEncoding);
          break;
        case "NormalMap":
        case "Maya|TEX_normal_map":
          a.normalMap = c.getTexture(r, p.ID);
          break;
        case "ReflectionColor":
          a.envMap = c.getTexture(r, p.ID), a.envMap !== void 0 && (a.envMap.mapping = EquirectangularReflectionMapping, a.envMap.encoding = sRGBEncoding);
          break;
        case "SpecularColor":
          a.specularMap = c.getTexture(r, p.ID), a.specularMap !== void 0 && (a.specularMap.encoding = sRGBEncoding);
          break;
        case "TransparentColor":
        case "TransparencyFactor":
          a.alphaMap = c.getTexture(r, p.ID), a.transparent = true;
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
  getTexture(n, r) {
    return "LayeredTexture" in se.Objects && r in se.Objects.LayeredTexture && (console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."), r = Ae.get(r).children[0].ID), n.get(r);
  }
  // Parse nodes in FBXTree.Objects.Deformer
  // Deformer node can contain skinning or Vertex Cache animation data, however only skinning is supported here
  // Generates map of Skeleton-like objects for use later when generating and binding skeletons.
  parseDeformers() {
    const n = {}, r = {};
    if ("Deformer" in se.Objects) {
      const s = se.Objects.Deformer;
      for (const a in s) {
        const c = s[a], p = Ae.get(parseInt(a));
        if (c.attrType === "Skin") {
          const h = this.parseSkeleton(p, s);
          h.ID = a, p.parents.length > 1 && console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."), h.geometryID = p.parents[0].ID, n[a] = h;
        } else if (c.attrType === "BlendShape") {
          const h = {
            id: a
          };
          h.rawTargets = this.parseMorphTargets(p, s), h.id = a, p.parents.length > 1 && console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."), r[a] = h;
        }
      }
    }
    return {
      skeletons: n,
      morphTargets: r
    };
  }
  // Parse single nodes in FBXTree.Objects.Deformer
  // The top level skeleton node has type 'Skin' and sub nodes have type 'Cluster'
  // Each skin node represents a skeleton and each cluster node represents a bone
  parseSkeleton(n, r) {
    const s = [];
    return n.children.forEach(function(a) {
      const c = r[a.ID];
      if (c.attrType !== "Cluster")
        return;
      const p = {
        ID: a.ID,
        indices: [],
        weights: [],
        transformLink: new Matrix4().fromArray(c.TransformLink.a)
        // transform: new Matrix4().fromArray( boneNode.Transform.a ),
        // linkMode: boneNode.Mode,
      };
      "Indexes" in c && (p.indices = c.Indexes.a, p.weights = c.Weights.a), s.push(p);
    }), {
      rawBones: s,
      bones: []
    };
  }
  // The top level morph deformer node has type "BlendShape" and sub nodes have type "BlendShapeChannel"
  parseMorphTargets(n, r) {
    const s = [];
    for (let a = 0; a < n.children.length; a++) {
      const c = n.children[a], p = r[c.ID], h = {
        name: p.attrName,
        initialWeight: p.DeformPercent,
        id: p.id,
        fullWeights: p.FullWeights.a
      };
      if (p.attrType !== "BlendShapeChannel")
        return;
      h.geoID = Ae.get(parseInt(c.ID)).children.filter(function(d) {
        return d.relationship === void 0;
      })[0].ID, s.push(h);
    }
    return s;
  }
  // create the main Group() to be returned by the loader
  parseScene(n, r, s) {
    Je = new Group();
    const a = this.parseModels(n.skeletons, r, s), c = se.Objects.Model, p = this;
    a.forEach(function(d) {
      const g = c[d.ID];
      p.setLookAtProperties(d, g), Ae.get(d.ID).parents.forEach(function(_) {
        const y = a.get(_.ID);
        y !== void 0 && y.add(d);
      }), d.parent === null && Je.add(d);
    }), this.bindSkeleton(n.skeletons, r, a), this.createAmbientLight(), Je.traverse(function(d) {
      if (d.userData.transformData) {
        d.parent && (d.userData.transformData.parentMatrix = d.parent.matrix, d.userData.transformData.parentMatrixWorld = d.parent.matrixWorld);
        const g = nl(d.userData.transformData);
        d.applyMatrix4(g), d.updateWorldMatrix();
      }
    });
    const h = new th().parse();
    Je.children.length === 1 && Je.children[0].isGroup && (Je.children[0].animations = h, Je = Je.children[0]), Je.animations = h;
  }
  // parse nodes in FBXTree.Objects.Model
  parseModels(n, r, s) {
    const a = /* @__PURE__ */ new Map(), c = se.Objects.Model;
    for (const p in c) {
      const h = parseInt(p), d = c[p], g = Ae.get(h);
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
        w.name = d.attrName ? PropertyBinding.sanitizeNodeName(d.attrName) : "", w.ID = h;
      }
      this.getTransformData(w, d), a.set(h, w);
    }
    return a;
  }
  buildSkeleton(n, r, s, a) {
    let c = null;
    return n.parents.forEach(function(p) {
      for (const h in r) {
        const d = r[h];
        d.rawBones.forEach(function(g, w) {
          if (g.ID === p.ID) {
            const _ = c;
            c = new Bone(), c.matrixWorld.copy(g.transformLink), c.name = a ? PropertyBinding.sanitizeNodeName(a) : "", c.ID = s, d.bones[w] = c, _ !== null && c.add(_);
          }
        });
      }
    }), c;
  }
  // create a PerspectiveCamera or OrthographicCamera
  createCamera(n) {
    let r, s;
    if (n.children.forEach(function(a) {
      const c = se.Objects.NodeAttribute[a.ID];
      c !== void 0 && (s = c);
    }), s === void 0)
      r = new Object3D();
    else {
      let a = 0;
      s.CameraProjectionType !== void 0 && s.CameraProjectionType.value === 1 && (a = 1);
      let c = 1;
      s.NearPlane !== void 0 && (c = s.NearPlane.value / 1e3);
      let p = 1e3;
      s.FarPlane !== void 0 && (p = s.FarPlane.value / 1e3);
      let h = window.innerWidth, d = window.innerHeight;
      s.AspectWidth !== void 0 && s.AspectHeight !== void 0 && (h = s.AspectWidth.value, d = s.AspectHeight.value);
      const g = h / d;
      let w = 45;
      s.FieldOfView !== void 0 && (w = s.FieldOfView.value);
      const _ = s.FocalLength ? s.FocalLength.value : null;
      switch (a) {
        case 0:
          r = new PerspectiveCamera(w, g, c, p), _ !== null && r.setFocalLength(_);
          break;
        case 1:
          r = new OrthographicCamera(-h / 2, h / 2, d / 2, -d / 2, c, p);
          break;
        default:
          console.warn("THREE.FBXLoader: Unknown camera type " + a + "."), r = new Object3D();
          break;
      }
    }
    return r;
  }
  // Create a DirectionalLight, PointLight or SpotLight
  createLight(n) {
    let r, s;
    if (n.children.forEach(function(a) {
      const c = se.Objects.NodeAttribute[a.ID];
      c !== void 0 && (s = c);
    }), s === void 0)
      r = new Object3D();
    else {
      let a;
      s.LightType === void 0 ? a = 0 : a = s.LightType.value;
      let c = 16777215;
      s.Color !== void 0 && (c = new Color().fromArray(s.Color.value));
      let p = s.Intensity === void 0 ? 1 : s.Intensity.value / 100;
      s.CastLightOnObject !== void 0 && s.CastLightOnObject.value === 0 && (p = 0);
      let h = 0;
      s.FarAttenuationEnd !== void 0 && (s.EnableFarAttenuation !== void 0 && s.EnableFarAttenuation.value === 0 ? h = 0 : h = s.FarAttenuationEnd.value);
      const d = 1;
      switch (a) {
        case 0:
          r = new PointLight(c, p, h, d);
          break;
        case 1:
          r = new DirectionalLight(c, p);
          break;
        case 2:
          let g = Math.PI / 3;
          s.InnerAngle !== void 0 && (g = MathUtils.degToRad(s.InnerAngle.value));
          let w = 0;
          s.OuterAngle !== void 0 && (w = MathUtils.degToRad(s.OuterAngle.value), w = Math.max(w, 1)), r = new SpotLight(c, p, h, g, w, d);
          break;
        default:
          console.warn("THREE.FBXLoader: Unknown light type " + s.LightType.value + ", defaulting to a PointLight."), r = new PointLight(c, p);
          break;
      }
      s.CastShadows !== void 0 && s.CastShadows.value === 1 && (r.castShadow = true);
    }
    return r;
  }
  createMesh(n, r, s) {
    let a, c = null, p = null;
    const h = [];
    return n.children.forEach(function(d) {
      r.has(d.ID) && (c = r.get(d.ID)), s.has(d.ID) && h.push(s.get(d.ID));
    }), h.length > 1 ? p = h : h.length > 0 ? p = h[0] : (p = new MeshPhongMaterial({
      color: 13421772
    }), h.push(p)), "color" in c.attributes && h.forEach(function(d) {
      d.vertexColors = true;
    }), c.FBX_Deformer ? (a = new SkinnedMesh(c, p), a.normalizeSkinWeights()) : a = new Mesh(c, p), a;
  }
  createCurve(n, r) {
    const s = n.children.reduce(function(c, p) {
      return r.has(p.ID) && (c = r.get(p.ID)), c;
    }, null), a = new LineBasicMaterial({
      color: 3342591,
      linewidth: 1
    });
    return new Line(s, a);
  }
  // parse the model node for transform data
  getTransformData(n, r) {
    const s = {};
    "InheritType" in r && (s.inheritType = parseInt(r.InheritType.value)), "RotationOrder" in r ? s.eulerOrder = il(r.RotationOrder.value) : s.eulerOrder = "ZYX", "Lcl_Translation" in r && (s.translation = r.Lcl_Translation.value), "PreRotation" in r && (s.preRotation = r.PreRotation.value), "Lcl_Rotation" in r && (s.rotation = r.Lcl_Rotation.value), "PostRotation" in r && (s.postRotation = r.PostRotation.value), "Lcl_Scaling" in r && (s.scale = r.Lcl_Scaling.value), "ScalingOffset" in r && (s.scalingOffset = r.ScalingOffset.value), "ScalingPivot" in r && (s.scalingPivot = r.ScalingPivot.value), "RotationOffset" in r && (s.rotationOffset = r.RotationOffset.value), "RotationPivot" in r && (s.rotationPivot = r.RotationPivot.value), n.userData.transformData = s;
  }
  setLookAtProperties(n, r) {
    "LookAtProperty" in r && Ae.get(n.ID).children.forEach(function(a) {
      if (a.relationship === "LookAtProperty") {
        const c = se.Objects.Model[a.ID];
        if ("Lcl_Translation" in c) {
          const p = c.Lcl_Translation.value;
          n.target !== void 0 ? (n.target.position.fromArray(p), Je.add(n.target)) : n.lookAt(new Vector3().fromArray(p));
        }
      }
    });
  }
  bindSkeleton(n, r, s) {
    const a = this.parsePoseNodes();
    for (const c in n) {
      const p = n[c];
      Ae.get(parseInt(p.ID)).parents.forEach(function(d) {
        if (r.has(d.ID)) {
          const g = d.ID;
          Ae.get(g).parents.forEach(function(_) {
            s.has(_.ID) && s.get(_.ID).bind(new Skeleton(p.bones), a[_.ID]);
          });
        }
      });
    }
  }
  parsePoseNodes() {
    const n = {};
    if ("Pose" in se.Objects) {
      const r = se.Objects.Pose;
      for (const s in r)
        if (r[s].attrType === "BindPose" && r[s].NbPoseNodes > 0) {
          const a = r[s].PoseNode;
          Array.isArray(a) ? a.forEach(function(c) {
            n[c.Node] = new Matrix4().fromArray(c.Matrix.a);
          }) : n[a.Node] = new Matrix4().fromArray(a.Matrix.a);
        }
    }
    return n;
  }
  // Parse ambient color in FBXTree.GlobalSettings - if it's not set to black (default), create an ambient light
  createAmbientLight() {
    if ("GlobalSettings" in se && "AmbientColor" in se.GlobalSettings) {
      const n = se.GlobalSettings.AmbientColor.value, r = n[0], s = n[1], a = n[2];
      if (r !== 0 || s !== 0 || a !== 0) {
        const c = new Color(r, s, a);
        Je.add(new AmbientLight(c, 1));
      }
    }
  }
};
var eh = class {
  // Parse nodes in FBXTree.Objects.Geometry
  parse(n) {
    const r = /* @__PURE__ */ new Map();
    if ("Geometry" in se.Objects) {
      const s = se.Objects.Geometry;
      for (const a in s) {
        const c = Ae.get(parseInt(a)), p = this.parseGeometry(c, s[a], n);
        r.set(parseInt(a), p);
      }
    }
    return r;
  }
  // Parse single node in FBXTree.Objects.Geometry
  parseGeometry(n, r, s) {
    switch (r.attrType) {
      case "Mesh":
        return this.parseMeshGeometry(n, r, s);
      case "NurbsCurve":
        return this.parseNurbsGeometry(r);
    }
  }
  // Parse single node mesh geometry in FBXTree.Objects.Geometry
  parseMeshGeometry(n, r, s) {
    const a = s.skeletons, c = [], p = n.parents.map(function(_) {
      return se.Objects.Model[_.ID];
    });
    if (p.length === 0)
      return;
    const h = n.children.reduce(function(_, y) {
      return a[y.ID] !== void 0 && (_ = a[y.ID]), _;
    }, null);
    n.children.forEach(function(_) {
      s.morphTargets[_.ID] !== void 0 && c.push(s.morphTargets[_.ID]);
    });
    const d = p[0], g = {};
    "RotationOrder" in d && (g.eulerOrder = il(d.RotationOrder.value)), "InheritType" in d && (g.inheritType = parseInt(d.InheritType.value)), "GeometricTranslation" in d && (g.translation = d.GeometricTranslation.value), "GeometricRotation" in d && (g.rotation = d.GeometricRotation.value), "GeometricScaling" in d && (g.scale = d.GeometricScaling.value);
    const w = nl(g);
    return this.genGeometry(r, h, c, w);
  }
  // Generate a BufferGeometry from a node in FBXTree.Objects.Geometry
  genGeometry(n, r, s, a) {
    const c = new BufferGeometry();
    n.attrName && (c.name = n.attrName);
    const p = this.parseGeoNode(n, r), h = this.genBuffers(p), d = new Float32BufferAttribute(h.vertex, 3);
    if (d.applyMatrix4(a), c.setAttribute("position", d), h.colors.length > 0 && c.setAttribute("color", new Float32BufferAttribute(h.colors, 3)), r && (c.setAttribute("skinIndex", new Uint16BufferAttribute(h.weightsIndices, 4)), c.setAttribute("skinWeight", new Float32BufferAttribute(h.vertexWeights, 4)), c.FBX_Deformer = r), h.normal.length > 0) {
      const g = new Matrix3().getNormalMatrix(a), w = new Float32BufferAttribute(h.normal, 3);
      w.applyNormalMatrix(g), c.setAttribute("normal", w);
    }
    if (h.uvs.forEach(function(g, w) {
      let _ = "uv" + (w + 1).toString();
      w === 0 && (_ = "uv"), c.setAttribute(_, new Float32BufferAttribute(h.uvs[w], 2));
    }), p.material && p.material.mappingType !== "AllSame") {
      let g = h.materialIndex[0], w = 0;
      if (h.materialIndex.forEach(function(_, y) {
        _ !== g && (c.addGroup(w, y - w, g), g = _, w = y);
      }), c.groups.length > 0) {
        const _ = c.groups[c.groups.length - 1], y = _.start + _.count;
        y !== h.materialIndex.length && c.addGroup(y, h.materialIndex.length - y, g);
      }
      c.groups.length === 0 && c.addGroup(0, h.materialIndex.length, h.materialIndex[0]);
    }
    return this.addMorphTargets(c, n, s, a), c;
  }
  parseGeoNode(n, r) {
    const s = {};
    if (s.vertexPositions = n.Vertices !== void 0 ? n.Vertices.a : [], s.vertexIndices = n.PolygonVertexIndex !== void 0 ? n.PolygonVertexIndex.a : [], n.LayerElementColor && (s.color = this.parseVertexColors(n.LayerElementColor[0])), n.LayerElementMaterial && (s.material = this.parseMaterialIndices(n.LayerElementMaterial[0])), n.LayerElementNormal && (s.normal = this.parseNormals(n.LayerElementNormal[0])), n.LayerElementUV) {
      s.uv = [];
      let a = 0;
      for (; n.LayerElementUV[a]; )
        n.LayerElementUV[a].UV && s.uv.push(this.parseUVs(n.LayerElementUV[a])), a++;
    }
    return s.weightTable = {}, r !== null && (s.skeleton = r, r.rawBones.forEach(function(a, c) {
      a.indices.forEach(function(p, h) {
        s.weightTable[p] === void 0 && (s.weightTable[p] = []), s.weightTable[p].push({
          id: c,
          weight: a.weights[h]
        });
      });
    })), s;
  }
  genBuffers(n) {
    const r = {
      vertex: [],
      normal: [],
      colors: [],
      uvs: [],
      materialIndex: [],
      vertexWeights: [],
      weightsIndices: []
    };
    let s = 0, a = 0, c = false, p = [], h = [], d = [], g = [], w = [], _ = [];
    const y = this;
    return n.vertexIndices.forEach(function(P, I2) {
      let S, R = false;
      P < 0 && (P = P ^ -1, R = true);
      let j = [], F = [];
      if (p.push(P * 3, P * 3 + 1, P * 3 + 2), n.color) {
        const V = Os(I2, s, P, n.color);
        d.push(V[0], V[1], V[2]);
      }
      if (n.skeleton) {
        if (n.weightTable[P] !== void 0 && n.weightTable[P].forEach(function(V) {
          F.push(V.weight), j.push(V.id);
        }), F.length > 4) {
          c || (console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."), c = true);
          const V = [0, 0, 0, 0], D2 = [0, 0, 0, 0];
          F.forEach(function(Y, G) {
            let N = Y, O = j[G];
            D2.forEach(function(H, K, q) {
              if (N > H) {
                q[K] = N, N = H;
                const pe = V[K];
                V[K] = O, O = pe;
              }
            });
          }), j = V, F = D2;
        }
        for (; F.length < 4; )
          F.push(0), j.push(0);
        for (let V = 0; V < 4; ++V)
          w.push(F[V]), _.push(j[V]);
      }
      if (n.normal) {
        const V = Os(I2, s, P, n.normal);
        h.push(V[0], V[1], V[2]);
      }
      n.material && n.material.mappingType !== "AllSame" && (S = Os(I2, s, P, n.material)[0]), n.uv && n.uv.forEach(function(V, D2) {
        const Y = Os(I2, s, P, V);
        g[D2] === void 0 && (g[D2] = []), g[D2].push(Y[0]), g[D2].push(Y[1]);
      }), a++, R && (y.genFace(r, n, p, S, h, d, g, w, _, a), s++, a = 0, p = [], h = [], d = [], g = [], w = [], _ = []);
    }), r;
  }
  // Generate data for a single face in a geometry. If the face is a quad then split it into 2 tris
  genFace(n, r, s, a, c, p, h, d, g, w) {
    for (let _ = 2; _ < w; _++)
      n.vertex.push(r.vertexPositions[s[0]]), n.vertex.push(r.vertexPositions[s[1]]), n.vertex.push(r.vertexPositions[s[2]]), n.vertex.push(r.vertexPositions[s[(_ - 1) * 3]]), n.vertex.push(r.vertexPositions[s[(_ - 1) * 3 + 1]]), n.vertex.push(r.vertexPositions[s[(_ - 1) * 3 + 2]]), n.vertex.push(r.vertexPositions[s[_ * 3]]), n.vertex.push(r.vertexPositions[s[_ * 3 + 1]]), n.vertex.push(r.vertexPositions[s[_ * 3 + 2]]), r.skeleton && (n.vertexWeights.push(d[0]), n.vertexWeights.push(d[1]), n.vertexWeights.push(d[2]), n.vertexWeights.push(d[3]), n.vertexWeights.push(d[(_ - 1) * 4]), n.vertexWeights.push(d[(_ - 1) * 4 + 1]), n.vertexWeights.push(d[(_ - 1) * 4 + 2]), n.vertexWeights.push(d[(_ - 1) * 4 + 3]), n.vertexWeights.push(d[_ * 4]), n.vertexWeights.push(d[_ * 4 + 1]), n.vertexWeights.push(d[_ * 4 + 2]), n.vertexWeights.push(d[_ * 4 + 3]), n.weightsIndices.push(g[0]), n.weightsIndices.push(g[1]), n.weightsIndices.push(g[2]), n.weightsIndices.push(g[3]), n.weightsIndices.push(g[(_ - 1) * 4]), n.weightsIndices.push(g[(_ - 1) * 4 + 1]), n.weightsIndices.push(g[(_ - 1) * 4 + 2]), n.weightsIndices.push(g[(_ - 1) * 4 + 3]), n.weightsIndices.push(g[_ * 4]), n.weightsIndices.push(g[_ * 4 + 1]), n.weightsIndices.push(g[_ * 4 + 2]), n.weightsIndices.push(g[_ * 4 + 3])), r.color && (n.colors.push(p[0]), n.colors.push(p[1]), n.colors.push(p[2]), n.colors.push(p[(_ - 1) * 3]), n.colors.push(p[(_ - 1) * 3 + 1]), n.colors.push(p[(_ - 1) * 3 + 2]), n.colors.push(p[_ * 3]), n.colors.push(p[_ * 3 + 1]), n.colors.push(p[_ * 3 + 2])), r.material && r.material.mappingType !== "AllSame" && (n.materialIndex.push(a), n.materialIndex.push(a), n.materialIndex.push(a)), r.normal && (n.normal.push(c[0]), n.normal.push(c[1]), n.normal.push(c[2]), n.normal.push(c[(_ - 1) * 3]), n.normal.push(c[(_ - 1) * 3 + 1]), n.normal.push(c[(_ - 1) * 3 + 2]), n.normal.push(c[_ * 3]), n.normal.push(c[_ * 3 + 1]), n.normal.push(c[_ * 3 + 2])), r.uv && r.uv.forEach(function(y, P) {
        n.uvs[P] === void 0 && (n.uvs[P] = []), n.uvs[P].push(h[P][0]), n.uvs[P].push(h[P][1]), n.uvs[P].push(h[P][(_ - 1) * 2]), n.uvs[P].push(h[P][(_ - 1) * 2 + 1]), n.uvs[P].push(h[P][_ * 2]), n.uvs[P].push(h[P][_ * 2 + 1]);
      });
  }
  addMorphTargets(n, r, s, a) {
    if (s.length === 0)
      return;
    n.morphTargetsRelative = true, n.morphAttributes.position = [];
    const c = this;
    s.forEach(function(p) {
      p.rawTargets.forEach(function(h) {
        const d = se.Objects.Geometry[h.geoID];
        d !== void 0 && c.genMorphGeometry(n, r, d, a, h.name);
      });
    });
  }
  // a morph geometry node is similar to a standard  node, and the node is also contained
  // in FBXTree.Objects.Geometry, however it can only have attributes for position, normal
  // and a special attribute Index defining which vertices of the original geometry are affected
  // Normal and position attributes only have data for the vertices that are affected by the morph
  genMorphGeometry(n, r, s, a, c) {
    const p = r.PolygonVertexIndex !== void 0 ? r.PolygonVertexIndex.a : [], h = s.Vertices !== void 0 ? s.Vertices.a : [], d = s.Indexes !== void 0 ? s.Indexes.a : [], g = n.attributes.position.count * 3, w = new Float32Array(g);
    for (let I2 = 0; I2 < d.length; I2++) {
      const S = d[I2] * 3;
      w[S] = h[I2 * 3], w[S + 1] = h[I2 * 3 + 1], w[S + 2] = h[I2 * 3 + 2];
    }
    const _ = {
      vertexIndices: p,
      vertexPositions: w
    }, y = this.genBuffers(_), P = new Float32BufferAttribute(y.vertex, 3);
    P.name = c || s.attrName, P.applyMatrix4(a), n.morphAttributes.position.push(P);
  }
  // Parse normal from FBXTree.Objects.Geometry.LayerElementNormal if it exists
  parseNormals(n) {
    const r = n.MappingInformationType, s = n.ReferenceInformationType, a = n.Normals.a;
    let c = [];
    return s === "IndexToDirect" && ("NormalIndex" in n ? c = n.NormalIndex.a : "NormalsIndex" in n && (c = n.NormalsIndex.a)), {
      dataSize: 3,
      buffer: a,
      indices: c,
      mappingType: r,
      referenceType: s
    };
  }
  // Parse UVs from FBXTree.Objects.Geometry.LayerElementUV if it exists
  parseUVs(n) {
    const r = n.MappingInformationType, s = n.ReferenceInformationType, a = n.UV.a;
    let c = [];
    return s === "IndexToDirect" && (c = n.UVIndex.a), {
      dataSize: 2,
      buffer: a,
      indices: c,
      mappingType: r,
      referenceType: s
    };
  }
  // Parse Vertex Colors from FBXTree.Objects.Geometry.LayerElementColor if it exists
  parseVertexColors(n) {
    const r = n.MappingInformationType, s = n.ReferenceInformationType, a = n.Colors.a;
    let c = [];
    return s === "IndexToDirect" && (c = n.ColorIndex.a), {
      dataSize: 4,
      buffer: a,
      indices: c,
      mappingType: r,
      referenceType: s
    };
  }
  // Parse mapping and material data in FBXTree.Objects.Geometry.LayerElementMaterial if it exists
  parseMaterialIndices(n) {
    const r = n.MappingInformationType, s = n.ReferenceInformationType;
    if (r === "NoMappingInformation")
      return {
        dataSize: 1,
        buffer: [0],
        indices: [0],
        mappingType: "AllSame",
        referenceType: s
      };
    const a = n.Materials.a, c = [];
    for (let p = 0; p < a.length; ++p)
      c.push(p);
    return {
      dataSize: 1,
      buffer: a,
      indices: c,
      mappingType: r,
      referenceType: s
    };
  }
  // Generate a NurbGeometry from a node in FBXTree.Objects.Geometry
  parseNurbsGeometry(n) {
    if (_a === void 0)
      return console.error("THREE.FBXLoader: The loader relies on NURBSCurve for any nurbs present in the model. Nurbs will show up as empty geometry."), new BufferGeometry();
    const r = parseInt(n.Order);
    if (isNaN(r))
      return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s", n.Order, n.id), new BufferGeometry();
    const s = r - 1, a = n.KnotVector.a, c = [], p = n.Points.a;
    for (let _ = 0, y = p.length; _ < y; _ += 4)
      c.push(new Vector4().fromArray(p, _));
    let h, d;
    if (n.Form === "Closed")
      c.push(c[0]);
    else if (n.Form === "Periodic") {
      h = s, d = a.length - 1 - h;
      for (let _ = 0; _ < s; ++_)
        c.push(c[_]);
    }
    const w = new _a(s, a, c, h, d).getPoints(c.length * 12);
    return new BufferGeometry().setFromPoints(w);
  }
};
var th = class {
  // take raw animation clips and turn them into three.js animation clips
  parse() {
    const n = [], r = this.parseClips();
    if (r !== void 0)
      for (const s in r) {
        const a = r[s], c = this.addClip(a);
        n.push(c);
      }
    return n;
  }
  parseClips() {
    if (se.Objects.AnimationCurve === void 0)
      return;
    const n = this.parseAnimationCurveNodes();
    this.parseAnimationCurves(n);
    const r = this.parseAnimationLayers(n);
    return this.parseAnimStacks(r);
  }
  // parse nodes in FBXTree.Objects.AnimationCurveNode
  // each AnimationCurveNode holds data for an animation transform for a model (e.g. left arm rotation )
  // and is referenced by an AnimationLayer
  parseAnimationCurveNodes() {
    const n = se.Objects.AnimationCurveNode, r = /* @__PURE__ */ new Map();
    for (const s in n) {
      const a = n[s];
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
  parseAnimationCurves(n) {
    const r = se.Objects.AnimationCurve;
    for (const s in r) {
      const a = {
        id: r[s].id,
        times: r[s].KeyTime.a.map(oh),
        values: r[s].KeyValueFloat.a
      }, c = Ae.get(a.id);
      if (c !== void 0) {
        const p = c.parents[0].ID, h = c.parents[0].relationship;
        h.match(/X/) ? n.get(p).curves.x = a : h.match(/Y/) ? n.get(p).curves.y = a : h.match(/Z/) ? n.get(p).curves.z = a : h.match(/d|DeformPercent/) && n.has(p) && (n.get(p).curves.morph = a);
      }
    }
  }
  // parse nodes in FBXTree.Objects.AnimationLayer. Each layers holds references
  // to various AnimationCurveNodes and is referenced by an AnimationStack node
  // note: theoretically a stack can have multiple layers, however in practice there always seems to be one per stack
  parseAnimationLayers(n) {
    const r = se.Objects.AnimationLayer, s = /* @__PURE__ */ new Map();
    for (const a in r) {
      const c = [], p = Ae.get(parseInt(a));
      p !== void 0 && (p.children.forEach(function(d, g) {
        if (n.has(d.ID)) {
          const w = n.get(d.ID);
          if (w.curves.x !== void 0 || w.curves.y !== void 0 || w.curves.z !== void 0) {
            if (c[g] === void 0) {
              const _ = Ae.get(d.ID).parents.filter(function(y) {
                return y.relationship !== void 0;
              })[0].ID;
              if (_ !== void 0) {
                const y = se.Objects.Model[_.toString()];
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
                Je.traverse(function(I2) {
                  I2.ID === y.id && (P.transform = I2.matrix, I2.userData.transformData && (P.eulerOrder = I2.userData.transformData.eulerOrder));
                }), P.transform || (P.transform = new Matrix4()), "PreRotation" in y && (P.preRotation = y.PreRotation.value), "PostRotation" in y && (P.postRotation = y.PostRotation.value), c[g] = P;
              }
            }
            c[g] && (c[g][w.attr] = w);
          } else if (w.curves.morph !== void 0) {
            if (c[g] === void 0) {
              const _ = Ae.get(d.ID).parents.filter(function(j) {
                return j.relationship !== void 0;
              })[0].ID, y = Ae.get(_).parents[0].ID, P = Ae.get(y).parents[0].ID, I2 = Ae.get(P).parents[0].ID, S = se.Objects.Model[I2], R = {
                modelName: S.attrName ? PropertyBinding.sanitizeNodeName(S.attrName) : "",
                morphName: se.Objects.Deformer[_].attrName
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
  parseAnimStacks(n) {
    const r = se.Objects.AnimationStack, s = {};
    for (const a in r) {
      const c = Ae.get(parseInt(a)).children;
      c.length > 1 && console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");
      const p = n.get(c[0].ID);
      s[a] = {
        name: r[a].attrName,
        layer: p
      };
    }
    return s;
  }
  addClip(n) {
    let r = [];
    const s = this;
    return n.layer.forEach(function(a) {
      r = r.concat(s.generateTracks(a));
    }), new AnimationClip(n.name, -1, r);
  }
  generateTracks(n) {
    const r = [];
    let s = new Vector3(), a = new Quaternion(), c = new Vector3();
    if (n.transform && n.transform.decompose(s, a, c), s = s.toArray(), a = new Euler().setFromQuaternion(a, n.eulerOrder).toArray(), c = c.toArray(), n.T !== void 0 && Object.keys(n.T.curves).length > 0) {
      const p = this.generateVectorTrack(n.modelName, n.T.curves, s, "position");
      p !== void 0 && r.push(p);
    }
    if (n.R !== void 0 && Object.keys(n.R.curves).length > 0) {
      const p = this.generateRotationTrack(n.modelName, n.R.curves, a, n.preRotation, n.postRotation, n.eulerOrder);
      p !== void 0 && r.push(p);
    }
    if (n.S !== void 0 && Object.keys(n.S.curves).length > 0) {
      const p = this.generateVectorTrack(n.modelName, n.S.curves, c, "scale");
      p !== void 0 && r.push(p);
    }
    if (n.DeformPercent !== void 0) {
      const p = this.generateMorphTrack(n);
      p !== void 0 && r.push(p);
    }
    return r;
  }
  generateVectorTrack(n, r, s, a) {
    const c = this.getTimesForAllAxes(r), p = this.getKeyframeTrackValues(c, r, s);
    return new VectorKeyframeTrack(n + "." + a, c, p);
  }
  generateRotationTrack(n, r, s, a, c, p) {
    r.x !== void 0 && (this.interpolateRotations(r.x), r.x.values = r.x.values.map(MathUtils.degToRad)), r.y !== void 0 && (this.interpolateRotations(r.y), r.y.values = r.y.values.map(MathUtils.degToRad)), r.z !== void 0 && (this.interpolateRotations(r.z), r.z.values = r.z.values.map(MathUtils.degToRad));
    const h = this.getTimesForAllAxes(r), d = this.getKeyframeTrackValues(h, r, s);
    a !== void 0 && (a = a.map(MathUtils.degToRad), a.push(p), a = new Euler().fromArray(a), a = new Quaternion().setFromEuler(a)), c !== void 0 && (c = c.map(MathUtils.degToRad), c.push(p), c = new Euler().fromArray(c), c = new Quaternion().setFromEuler(c).invert());
    const g = new Quaternion(), w = new Euler(), _ = [];
    for (let y = 0; y < d.length; y += 3)
      w.set(d[y], d[y + 1], d[y + 2], p), g.setFromEuler(w), a !== void 0 && g.premultiply(a), c !== void 0 && g.multiply(c), g.toArray(_, y / 3 * 4);
    return new QuaternionKeyframeTrack(n + ".quaternion", h, _);
  }
  generateMorphTrack(n) {
    const r = n.DeformPercent.curves.morph, s = r.values.map(function(c) {
      return c / 100;
    }), a = Je.getObjectByName(n.modelName).morphTargetDictionary[n.morphName];
    return new NumberKeyframeTrack(n.modelName + ".morphTargetInfluences[" + a + "]", r.times, s);
  }
  // For all animated objects, times are defined separately for each axis
  // Here we'll combine the times into one sorted array without duplicates
  getTimesForAllAxes(n) {
    let r = [];
    if (n.x !== void 0 && (r = r.concat(n.x.times)), n.y !== void 0 && (r = r.concat(n.y.times)), n.z !== void 0 && (r = r.concat(n.z.times)), r = r.sort(function(s, a) {
      return s - a;
    }), r.length > 1) {
      let s = 1, a = r[0];
      for (let c = 1; c < r.length; c++) {
        const p = r[c];
        p !== a && (r[s] = p, a = p, s++);
      }
      r = r.slice(0, s);
    }
    return r;
  }
  getKeyframeTrackValues(n, r, s) {
    const a = s, c = [];
    let p = -1, h = -1, d = -1;
    return n.forEach(function(g) {
      if (r.x && (p = r.x.times.indexOf(g)), r.y && (h = r.y.times.indexOf(g)), r.z && (d = r.z.times.indexOf(g)), p !== -1) {
        const w = r.x.values[p];
        c.push(w), a[0] = w;
      } else
        c.push(a[0]);
      if (h !== -1) {
        const w = r.y.values[h];
        c.push(w), a[1] = w;
      } else
        c.push(a[1]);
      if (d !== -1) {
        const w = r.z.values[d];
        c.push(w), a[2] = w;
      } else
        c.push(a[2]);
    }), c;
  }
  // Rotations are defined as Euler angles which can have values  of any size
  // These will be converted to quaternions which don't support values greater than
  // PI, so we'll interpolate large rotations
  interpolateRotations(n) {
    for (let r = 1; r < n.values.length; r++) {
      const s = n.values[r - 1], a = n.values[r] - s, c = Math.abs(a);
      if (c >= 180) {
        const p = c / 180, h = a / p;
        let d = s + h;
        const g = n.times[r - 1], _ = (n.times[r] - g) / p;
        let y = g + _;
        const P = [], I2 = [];
        for (; y < n.times[r]; )
          P.push(y), y += _, I2.push(d), d += h;
        n.times = xa(n.times, r, P), n.values = xa(n.values, r, I2);
      }
    }
  }
};
var nh = class {
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
  setCurrentProp(n, r) {
    this.currentProp = n, this.currentPropName = r;
  }
  parse(n) {
    this.currentIndent = 0, this.allNodes = new tl(), this.nodeStack = [], this.currentProp = [], this.currentPropName = "";
    const r = this, s = n.split(/[\r\n]+/);
    return s.forEach(function(a, c) {
      const p = a.match(/^[\s\t]*;/), h = a.match(/^[\s\t]*$/);
      if (p || h)
        return;
      const d = a.match("^\\t{" + r.currentIndent + "}(\\w+):(.*){", ""), g = a.match("^\\t{" + r.currentIndent + "}(\\w+):[\\s\\t\\r\\n](.*)"), w = a.match("^\\t{" + (r.currentIndent - 1) + "}}");
      d ? r.parseNodeBegin(a, d) : g ? r.parseNodeProperty(a, g, s[++c]) : w ? r.popStack() : a.match(/^[^\s\t}]/) && r.parseNodePropertyContinued(a);
    }), this.allNodes;
  }
  parseNodeBegin(n, r) {
    const s = r[1].trim().replace(/^"/, "").replace(/"$/, ""), a = r[2].split(",").map(function(d) {
      return d.trim().replace(/^"/, "").replace(/"$/, "");
    }), c = {
      name: s
    }, p = this.parseNodeAttr(a), h = this.getCurrentNode();
    this.currentIndent === 0 ? this.allNodes.add(s, c) : s in h ? (s === "PoseNode" ? h.PoseNode.push(c) : h[s].id !== void 0 && (h[s] = {}, h[s][h[s].id] = h[s]), p.id !== "" && (h[s][p.id] = c)) : typeof p.id == "number" ? (h[s] = {}, h[s][p.id] = c) : s !== "Properties70" && (s === "PoseNode" ? h[s] = [c] : h[s] = c), typeof p.id == "number" && (c.id = p.id), p.name !== "" && (c.attrName = p.name), p.type !== "" && (c.attrType = p.type), this.pushStack(c);
  }
  parseNodeAttr(n) {
    let r = n[0];
    n[0] !== "" && (r = parseInt(n[0]), isNaN(r) && (r = n[0]));
    let s = "", a = "";
    return n.length > 1 && (s = n[1].replace(/^(\w+)::/, ""), a = n[2]), {
      id: r,
      name: s,
      type: a
    };
  }
  parseNodeProperty(n, r, s) {
    let a = r[1].replace(/^"/, "").replace(/"$/, "").trim(), c = r[2].replace(/^"/, "").replace(/"$/, "").trim();
    a === "Content" && c === "," && (c = s.replace(/"/g, "").replace(/,$/, "").trim());
    const p = this.getCurrentNode();
    if (p.name === "Properties70") {
      this.parseNodeSpecialProperty(n, a, c);
      return;
    }
    if (a === "C") {
      const d = c.split(",").slice(1), g = parseInt(d[0]), w = parseInt(d[1]);
      let _ = c.split(",").slice(3);
      _ = _.map(function(y) {
        return y.trim().replace(/^"/, "");
      }), a = "connections", c = [g, w], lh(c, _), p[a] === void 0 && (p[a] = []);
    }
    a === "Node" && (p.id = c), a in p && Array.isArray(p[a]) ? p[a].push(c) : a !== "a" ? p[a] = c : p.a = c, this.setCurrentProp(p, a), a === "a" && c.slice(-1) !== "," && (p.a = ro(c));
  }
  parseNodePropertyContinued(n) {
    const r = this.getCurrentNode();
    r.a += n, n.slice(-1) !== "," && (r.a = ro(r.a));
  }
  // parse "Property70"
  parseNodeSpecialProperty(n, r, s) {
    const a = s.split('",').map(function(w) {
      return w.trim().replace(/^\"/, "").replace(/\s/, "_");
    }), c = a[0], p = a[1], h = a[2], d = a[3];
    let g = a[4];
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
        g = ro(g);
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
var ih = class {
  parse(n) {
    const r = new wa(n);
    r.skip(23);
    const s = r.getUint32();
    if (s < 6400)
      throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + s);
    const a = new tl();
    for (; !this.endOfContent(r); ) {
      const c = this.parseNode(r, s);
      c !== null && a.add(c.name, c);
    }
    return a;
  }
  // Check if reader has reached the end of content.
  endOfContent(n) {
    return n.size() % 16 === 0 ? (n.getOffset() + 160 + 16 & -16) >= n.size() : n.getOffset() + 160 + 16 >= n.size();
  }
  // recursively parse nodes until the end of the file is reached
  parseNode(n, r) {
    const s = {}, a = r >= 7500 ? n.getUint64() : n.getUint32(), c = r >= 7500 ? n.getUint64() : n.getUint32();
    r >= 7500 ? n.getUint64() : n.getUint32();
    const p = n.getUint8(), h = n.getString(p);
    if (a === 0)
      return null;
    const d = [];
    for (let y = 0; y < c; y++)
      d.push(this.parseProperty(n));
    const g = d.length > 0 ? d[0] : "", w = d.length > 1 ? d[1] : "", _ = d.length > 2 ? d[2] : "";
    for (s.singleProperty = c === 1 && n.getOffset() === a; a > n.getOffset(); ) {
      const y = this.parseNode(n, r);
      y !== null && this.parseSubNode(h, s, y);
    }
    return s.propertyList = d, typeof g == "number" && (s.id = g), w !== "" && (s.attrName = w), _ !== "" && (s.attrType = _), h !== "" && (s.name = h), s;
  }
  parseSubNode(n, r, s) {
    if (s.singleProperty === true) {
      const a = s.propertyList[0];
      Array.isArray(a) ? (r[s.name] = s, s.a = a) : r[s.name] = a;
    } else if (n === "Connections" && s.name === "C") {
      const a = [];
      s.propertyList.forEach(function(c, p) {
        p !== 0 && a.push(c);
      }), r.connections === void 0 && (r.connections = []), r.connections.push(a);
    } else if (s.name === "Properties70")
      Object.keys(s).forEach(function(c) {
        r[c] = s[c];
      });
    else if (n === "Properties70" && s.name === "P") {
      let a = s.propertyList[0], c = s.propertyList[1];
      const p = s.propertyList[2], h = s.propertyList[3];
      let d;
      a.indexOf("Lcl ") === 0 && (a = a.replace("Lcl ", "Lcl_")), c.indexOf("Lcl ") === 0 && (c = c.replace("Lcl ", "Lcl_")), c === "Color" || c === "ColorRGB" || c === "Vector" || c === "Vector3D" || c.indexOf("Lcl_") === 0 ? d = [s.propertyList[4], s.propertyList[5], s.propertyList[6]] : d = s.propertyList[4], r[a] = {
        type: c,
        type2: p,
        flag: h,
        value: d
      };
    } else
      r[s.name] === void 0 ? typeof s.id == "number" ? (r[s.name] = {}, r[s.name][s.id] = s) : r[s.name] = s : s.name === "PoseNode" ? (Array.isArray(r[s.name]) || (r[s.name] = [r[s.name]]), r[s.name].push(s)) : r[s.name][s.id] === void 0 && (r[s.name][s.id] = s);
  }
  parseProperty(n) {
    const r = n.getString(1);
    let s;
    switch (r) {
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
        return s = n.getUint32(), n.getArrayBuffer(s);
      case "S":
        return s = n.getUint32(), n.getString(s);
      case "Y":
        return n.getInt16();
      case "b":
      case "c":
      case "d":
      case "f":
      case "i":
      case "l":
        const a = n.getUint32(), c = n.getUint32(), p = n.getUint32();
        if (c === 0)
          switch (r) {
            case "b":
            case "c":
              return n.getBooleanArray(a);
            case "d":
              return n.getFloat64Array(a);
            case "f":
              return n.getFloat32Array(a);
            case "i":
              return n.getInt32Array(a);
            case "l":
              return n.getInt64Array(a);
          }
        const h = ip(new Uint8Array(n.getArrayBuffer(p))), d = new wa(h.buffer);
        switch (r) {
          case "b":
          case "c":
            return d.getBooleanArray(a);
          case "d":
            return d.getFloat64Array(a);
          case "f":
            return d.getFloat32Array(a);
          case "i":
            return d.getInt32Array(a);
          case "l":
            return d.getInt64Array(a);
        }
      default:
        throw new Error("THREE.FBXLoader: Unknown property type " + r);
    }
  }
};
var wa = class {
  constructor(n, r) {
    this.dv = new DataView(n), this.offset = 0, this.littleEndian = r !== void 0 ? r : true;
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
    const r = [];
    for (let s = 0; s < n; s++)
      r.push(this.getBoolean());
    return r;
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
    const r = [];
    for (let s = 0; s < n; s++)
      r.push(this.getInt32());
    return r;
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
    let n, r;
    return this.littleEndian ? (n = this.getUint32(), r = this.getUint32()) : (r = this.getUint32(), n = this.getUint32()), r & 2147483648 ? (r = ~r & 4294967295, n = ~n & 4294967295, n === 4294967295 && (r = r + 1 & 4294967295), n = n + 1 & 4294967295, -(r * 4294967296 + n)) : r * 4294967296 + n;
  }
  getInt64Array(n) {
    const r = [];
    for (let s = 0; s < n; s++)
      r.push(this.getInt64());
    return r;
  }
  // Note: see getInt64() comment
  getUint64() {
    let n, r;
    return this.littleEndian ? (n = this.getUint32(), r = this.getUint32()) : (r = this.getUint32(), n = this.getUint32()), r * 4294967296 + n;
  }
  getFloat32() {
    const n = this.dv.getFloat32(this.offset, this.littleEndian);
    return this.offset += 4, n;
  }
  getFloat32Array(n) {
    const r = [];
    for (let s = 0; s < n; s++)
      r.push(this.getFloat32());
    return r;
  }
  getFloat64() {
    const n = this.dv.getFloat64(this.offset, this.littleEndian);
    return this.offset += 8, n;
  }
  getFloat64Array(n) {
    const r = [];
    for (let s = 0; s < n; s++)
      r.push(this.getFloat64());
    return r;
  }
  getArrayBuffer(n) {
    const r = this.dv.buffer.slice(this.offset, this.offset + n);
    return this.offset += n, r;
  }
  getString(n) {
    let r = [];
    for (let a = 0; a < n; a++)
      r[a] = this.getUint8();
    const s = r.indexOf(0);
    return s >= 0 && (r = r.slice(0, s)), LoaderUtils.decodeText(new Uint8Array(r));
  }
};
var tl = class {
  add(n, r) {
    this[n] = r;
  }
};
function sh(v) {
  const n = "Kaydara FBX Binary  \0";
  return v.byteLength >= n.length && n === sl(v, 0, n.length);
}
function rh(v) {
  const n = ["K", "a", "y", "d", "a", "r", "a", "\\", "F", "B", "X", "\\", "B", "i", "n", "a", "r", "y", "\\", "\\"];
  let r = 0;
  function s(a) {
    const c = v[a - 1];
    return v = v.slice(r + a), r++, c;
  }
  for (let a = 0; a < n.length; ++a)
    if (s(1) === n[a])
      return false;
  return true;
}
function ya(v) {
  const n = /FBXVersion: (\d+)/, r = v.match(n);
  if (r)
    return parseInt(r[1]);
  throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.");
}
function oh(v) {
  return v / 46186158e3;
}
var ah = [];
function Os(v, n, r, s) {
  let a;
  switch (s.mappingType) {
    case "ByPolygonVertex":
      a = v;
      break;
    case "ByPolygon":
      a = n;
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
  const c = a * s.dataSize, p = c + s.dataSize;
  return ch(ah, s.buffer, c, p);
}
var so = new Euler();
var hi = new Vector3();
function nl(v) {
  const n = new Matrix4(), r = new Matrix4(), s = new Matrix4(), a = new Matrix4(), c = new Matrix4(), p = new Matrix4(), h = new Matrix4(), d = new Matrix4(), g = new Matrix4(), w = new Matrix4(), _ = new Matrix4(), y = new Matrix4(), P = v.inheritType ? v.inheritType : 0;
  if (v.translation && n.setPosition(hi.fromArray(v.translation)), v.preRotation) {
    const K = v.preRotation.map(MathUtils.degToRad);
    K.push(v.eulerOrder), r.makeRotationFromEuler(so.fromArray(K));
  }
  if (v.rotation) {
    const K = v.rotation.map(MathUtils.degToRad);
    K.push(v.eulerOrder), s.makeRotationFromEuler(so.fromArray(K));
  }
  if (v.postRotation) {
    const K = v.postRotation.map(MathUtils.degToRad);
    K.push(v.eulerOrder), a.makeRotationFromEuler(so.fromArray(K)), a.invert();
  }
  v.scale && c.scale(hi.fromArray(v.scale)), v.scalingOffset && h.setPosition(hi.fromArray(v.scalingOffset)), v.scalingPivot && p.setPosition(hi.fromArray(v.scalingPivot)), v.rotationOffset && d.setPosition(hi.fromArray(v.rotationOffset)), v.rotationPivot && g.setPosition(hi.fromArray(v.rotationPivot)), v.parentMatrixWorld && (_.copy(v.parentMatrix), w.copy(v.parentMatrixWorld));
  const I2 = r.clone().multiply(s).multiply(a), S = new Matrix4();
  S.extractRotation(w);
  const R = new Matrix4();
  R.copyPosition(w);
  const j = R.clone().invert().multiply(w), F = S.clone().invert().multiply(j), V = c, D2 = new Matrix4();
  if (P === 0)
    D2.copy(S).multiply(I2).multiply(F).multiply(V);
  else if (P === 1)
    D2.copy(S).multiply(F).multiply(I2).multiply(V);
  else {
    const q = new Matrix4().scale(new Vector3().setFromMatrixScale(_)).clone().invert(), pe = F.clone().multiply(q);
    D2.copy(S).multiply(I2).multiply(pe).multiply(V);
  }
  const Y = g.clone().invert(), G = p.clone().invert();
  let N = n.clone().multiply(d).multiply(g).multiply(r).multiply(s).multiply(a).multiply(Y).multiply(h).multiply(p).multiply(c).multiply(G);
  const O = new Matrix4().copyPosition(N), H = w.clone().multiply(O);
  return y.copyPosition(H), N = y.clone().multiply(D2), N.premultiply(w.invert()), N;
}
function il(v) {
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
function ro(v) {
  return v.split(",").map(function(r) {
    return parseFloat(r);
  });
}
function sl(v, n, r) {
  return n === void 0 && (n = 0), r === void 0 && (r = v.byteLength), LoaderUtils.decodeText(new Uint8Array(v, n, r));
}
function lh(v, n) {
  for (let r = 0, s = v.length, a = n.length; r < a; r++, s++)
    v[s] = n[r];
}
function ch(v, n, r, s) {
  for (let a = r, c = 0; a < s; a++, c++)
    v[c] = n[a];
  return v;
}
function xa(v, n, r) {
  return v.slice(0, n).concat(r).concat(v.slice(n));
}
var uh = class extends Loader {
  constructor(n) {
    super(n);
  }
  load(n, r, s, a) {
    const c = new FileLoader(this.manager);
    c.setPath(this.path), c.setRequestHeader(this.requestHeader), c.setWithCredentials(this.withCredentials), c.load(n, (p) => {
      if (typeof p != "string")
        throw new Error("unsupported data type");
      const h = JSON.parse(p), d = this.parse(h);
      r && r(d);
    }, s, a);
  }
  parse(n) {
    return new xo(n);
  }
};
var xo = class {
  constructor(n) {
    C(this, "data", void 0), this.data = n;
  }
  generateShapes(n, r = 100, s) {
    const a = [], c = {
      letterSpacing: 0,
      lineHeight: 1,
      ...s
    }, p = ph(n, r, this.data, c);
    for (let h = 0, d = p.length; h < d; h++)
      Array.prototype.push.apply(a, p[h].toShapes(false));
    return a;
  }
};
C(xo, "isFont", void 0);
C(xo, "type", void 0);
function ph(v, n, r, s) {
  const a = Array.from(v), c = n / r.resolution, p = (r.boundingBox.yMax - r.boundingBox.yMin + r.underlineThickness) * c, h = [];
  let d = 0, g = 0;
  for (let w = 0; w < a.length; w++) {
    const _ = a[w];
    if (_ === `
`)
      d = 0, g -= p * s.lineHeight;
    else {
      const y = hh(_, c, d, g, r);
      y && (d += y.offsetX + s.letterSpacing, h.push(y.path));
    }
  }
  return h;
}
function hh(v, n, r, s, a) {
  const c = a.glyphs[v] || a.glyphs["?"];
  if (!c) {
    console.error('THREE.Font: character "' + v + '" does not exists in font family ' + a.familyName + ".");
    return;
  }
  const p = new ShapePath();
  let h, d, g, w, _, y, P, I2;
  if (c.o) {
    const S = c._cachedOutline || (c._cachedOutline = c.o.split(" "));
    for (let R = 0, j = S.length; R < j; )
      switch (S[R++]) {
        case "m":
          h = parseInt(S[R++]) * n + r, d = parseInt(S[R++]) * n + s, p.moveTo(h, d);
          break;
        case "l":
          h = parseInt(S[R++]) * n + r, d = parseInt(S[R++]) * n + s, p.lineTo(h, d);
          break;
        case "q":
          g = parseInt(S[R++]) * n + r, w = parseInt(S[R++]) * n + s, _ = parseInt(S[R++]) * n + r, y = parseInt(S[R++]) * n + s, p.quadraticCurveTo(_, y, g, w);
          break;
        case "b":
          g = parseInt(S[R++]) * n + r, w = parseInt(S[R++]) * n + s, _ = parseInt(S[R++]) * n + r, y = parseInt(S[R++]) * n + s, P = parseInt(S[R++]) * n + r, I2 = parseInt(S[R++]) * n + s, p.bezierCurveTo(_, y, P, I2, g, w);
          break;
      }
  }
  return {
    offsetX: c.ha * n,
    path: p
  };
}
var rl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function dh(v) {
  return v && v.__esModule && Object.prototype.hasOwnProperty.call(v, "default") ? v.default : v;
}
var mh = class extends DataTextureLoader {
  constructor(n) {
    super(n), this.type = HalfFloatType;
  }
  // adapted from http://www.graphics.cornell.edu/~bjw/rgbe.html
  parse(n) {
    const h = function(V, D2) {
      switch (V) {
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
    }, _ = `
`, y = function(V, D2, Y) {
      D2 = D2 || 1024;
      let N = V.pos, O = -1, H = 0, K = "", q = String.fromCharCode.apply(null, new Uint16Array(V.subarray(N, N + 128)));
      for (; 0 > (O = q.indexOf(_)) && H < D2 && N < V.byteLength; )
        K += q, H += q.length, N += 128, q += String.fromCharCode.apply(null, new Uint16Array(V.subarray(N, N + 128)));
      return -1 < O ? (Y !== false && (V.pos += H + O + 1), K + q.slice(0, O)) : false;
    }, P = function(V) {
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
      if (V.pos >= V.byteLength || !(K = y(V)))
        return h(1, "no header found");
      if (!(q = K.match(D2)))
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
    }, I2 = function(V, D2, Y) {
      const G = D2;
      if (
        // run length encoding is not allowed so read flat
        G < 8 || G > 32767 || // this file is not run length encoded
        V[0] !== 2 || V[1] !== 2 || V[2] & 128
      )
        return new Uint8Array(V);
      if (G !== (V[2] << 8 | V[3]))
        return h(3, "wrong scanline width");
      const N = new Uint8Array(4 * D2 * Y);
      if (!N.length)
        return h(4, "unable to allocate buffer space");
      let O = 0, H = 0;
      const K = 4 * G, q = new Uint8Array(4), pe = new Uint8Array(K);
      let ge = Y;
      for (; ge > 0 && H < V.byteLength; ) {
        if (H + 4 > V.byteLength)
          return h(1);
        if (q[0] = V[H++], q[1] = V[H++], q[2] = V[H++], q[3] = V[H++], q[0] != 2 || q[1] != 2 || (q[2] << 8 | q[3]) != G)
          return h(3, "bad rgbe scanline format");
        let ce = 0, me;
        for (; ce < K && H < V.byteLength; ) {
          me = V[H++];
          const ee = me > 128;
          if (ee && (me -= 128), me === 0 || ce + me > K)
            return h(3, "bad scanline data");
          if (ee) {
            const X = V[H++];
            for (let Pe = 0; Pe < me; Pe++)
              pe[ce++] = X;
          } else
            pe.set(V.subarray(H, H + me), ce), ce += me, H += me;
        }
        const he = G;
        for (let ee = 0; ee < he; ee++) {
          let X = 0;
          N[O] = pe[ee + X], X += G, N[O + 1] = pe[ee + X], X += G, N[O + 2] = pe[ee + X], X += G, N[O + 3] = pe[ee + X], O += 4;
        }
        ge--;
      }
      return N;
    }, S = function(V, D2, Y, G) {
      const N = V[D2 + 3], O = Math.pow(2, N - 128) / 255;
      Y[G + 0] = V[D2 + 0] * O, Y[G + 1] = V[D2 + 1] * O, Y[G + 2] = V[D2 + 2] * O, Y[G + 3] = 1;
    }, R = function(V, D2, Y, G) {
      const N = V[D2 + 3], O = Math.pow(2, N - 128) / 255;
      Y[G + 0] = DataUtils.toHalfFloat(Math.min(V[D2 + 0] * O, 65504)), Y[G + 1] = DataUtils.toHalfFloat(Math.min(V[D2 + 1] * O, 65504)), Y[G + 2] = DataUtils.toHalfFloat(Math.min(V[D2 + 2] * O, 65504)), Y[G + 3] = DataUtils.toHalfFloat(1);
    }, j = new Uint8Array(n);
    j.pos = 0;
    const F = P(j);
    if (F !== -1) {
      const V = F.width, D2 = F.height, Y = I2(j.subarray(j.pos), V, D2);
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
  load(n, r, s, a) {
    function c(p, h) {
      switch (p.type) {
        case FloatType:
        case HalfFloatType:
          p.encoding = LinearEncoding, p.minFilter = LinearFilter, p.magFilter = LinearFilter, p.generateMipmaps = false, p.flipY = true;
          break;
      }
      r && r(p, h);
    }
    return super.load(n, c, s, a);
  }
};
var oo = /* @__PURE__ */ new WeakMap();
var fh = class extends Loader {
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
  load(n, r, s, a) {
    const c = new FileLoader(this.manager);
    c.setPath(this.path), c.setResponseType("arraybuffer"), c.setRequestHeader(this.requestHeader), c.setWithCredentials(this.withCredentials), c.load(n, (p) => {
      const h = {
        attributeIDs: this.defaultAttributeIDs,
        attributeTypes: this.defaultAttributeTypes,
        useUniqueIDs: false
      };
      this.decodeGeometry(p, h).then(r).catch(a);
    }, s, a);
  }
  /** @deprecated Kept for backward-compatibility with previous DRACOLoader versions. */
  decodeDracoFile(n, r, s, a) {
    const c = {
      attributeIDs: s || this.defaultAttributeIDs,
      attributeTypes: a || this.defaultAttributeTypes,
      useUniqueIDs: !!s
    };
    this.decodeGeometry(n, c).then(r);
  }
  decodeGeometry(n, r) {
    for (const d in r.attributeTypes) {
      const g = r.attributeTypes[d];
      g.BYTES_PER_ELEMENT !== void 0 && (r.attributeTypes[d] = g.name);
    }
    const s = JSON.stringify(r);
    if (oo.has(n)) {
      const d = oo.get(n);
      if (d.key === s)
        return d.promise;
      if (n.byteLength === 0)
        throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.");
    }
    let a;
    const c = this.workerNextTaskID++, p = n.byteLength, h = this._getWorker(c, p).then((d) => (a = d, new Promise((g, w) => {
      a._callbacks[c] = {
        resolve: g,
        reject: w
      }, a.postMessage({
        type: "decode",
        id: c,
        taskConfig: r,
        buffer: n
      }, [n]);
    }))).then((d) => this._createGeometry(d.geometry));
    return h.catch(() => true).then(() => {
      a && c && this._releaseTask(a, c);
    }), oo.set(n, {
      key: s,
      promise: h
    }), h;
  }
  _createGeometry(n) {
    const r = new BufferGeometry();
    n.index && r.setIndex(new BufferAttribute(n.index.array, 1));
    for (let s = 0; s < n.attributes.length; s++) {
      const a = n.attributes[s], c = a.name, p = a.array, h = a.itemSize;
      r.setAttribute(c, new BufferAttribute(p, h));
    }
    return r;
  }
  _loadLibrary(n, r) {
    const s = new FileLoader(this.manager);
    return s.setPath(this.decoderPath), s.setResponseType(r), s.setWithCredentials(this.withCredentials), new Promise((a, c) => {
      s.load(n, a, void 0, c);
    });
  }
  preload() {
    return this._initDecoder(), this;
  }
  _initDecoder() {
    if (this.decoderPending)
      return this.decoderPending;
    const n = typeof WebAssembly != "object" || this.decoderConfig.type === "js", r = [];
    return n ? r.push(this._loadLibrary("draco_decoder.js", "text")) : (r.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), r.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(r).then((s) => {
      const a = s[0];
      n || (this.decoderConfig.wasmBinary = s[1]);
      const c = vh.toString(), p = ["/* draco decoder */", a, "", "/* worker */", c.substring(c.indexOf("{") + 1, c.lastIndexOf("}"))].join(`
`);
      this.workerSourceURL = URL.createObjectURL(new Blob([p]));
    }), this.decoderPending;
  }
  _getWorker(n, r) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const a = new Worker(this.workerSourceURL);
        a._callbacks = {}, a._taskCosts = {}, a._taskLoad = 0, a.postMessage({
          type: "init",
          decoderConfig: this.decoderConfig
        }), a.onmessage = function(c) {
          const p = c.data;
          switch (p.type) {
            case "decode":
              a._callbacks[p.id].resolve(p);
              break;
            case "error":
              a._callbacks[p.id].reject(p);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + p.type + '"');
          }
        }, this.workerPool.push(a);
      } else
        this.workerPool.sort(function(a, c) {
          return a._taskLoad > c._taskLoad ? -1 : 1;
        });
      const s = this.workerPool[this.workerPool.length - 1];
      return s._taskCosts[n] = r, s._taskLoad += r, s;
    });
  }
  _releaseTask(n, r) {
    n._taskLoad -= n._taskCosts[r], delete n._callbacks[r], delete n._taskCosts[r];
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
function vh() {
  let v, n;
  onmessage = function(p) {
    const h = p.data;
    switch (h.type) {
      case "init":
        v = h.decoderConfig, n = new Promise(function(w) {
          v.onModuleLoaded = function(_) {
            w({
              draco: _
            });
          }, DracoDecoderModule(v);
        });
        break;
      case "decode":
        const d = h.buffer, g = h.taskConfig;
        n.then((w) => {
          const _ = w.draco, y = new _.Decoder(), P = new _.DecoderBuffer();
          P.Init(new Int8Array(d), d.byteLength);
          try {
            const I2 = r(_, y, P, g), S = I2.attributes.map((R) => R.array.buffer);
            I2.index && S.push(I2.index.array.buffer), self.postMessage({
              type: "decode",
              id: h.id,
              geometry: I2
            }, S);
          } catch (I2) {
            console.error(I2), self.postMessage({
              type: "error",
              id: h.id,
              error: I2.message
            });
          } finally {
            _.destroy(P), _.destroy(y);
          }
        });
        break;
    }
  };
  function r(p, h, d, g) {
    const w = g.attributeIDs, _ = g.attributeTypes;
    let y, P;
    const I2 = h.GetEncodedGeometryType(d);
    if (I2 === p.TRIANGULAR_MESH)
      y = new p.Mesh(), P = h.DecodeBufferToMesh(d, y);
    else if (I2 === p.POINT_CLOUD)
      y = new p.PointCloud(), P = h.DecodeBufferToPointCloud(d, y);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!P.ok() || y.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + P.error_msg());
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
        if (V = h.GetAttributeId(y, p[w[R]]), V === -1)
          continue;
        F = h.GetAttribute(y, V);
      }
      S.attributes.push(a(p, h, y, R, j, F));
    }
    return I2 === p.TRIANGULAR_MESH && (S.index = s(p, h, y)), p.destroy(y), S;
  }
  function s(p, h, d) {
    const w = d.num_faces() * 3, _ = w * 4, y = p._malloc(_);
    h.GetTrianglesUInt32Array(d, _, y);
    const P = new Uint32Array(p.HEAPF32.buffer, y, w).slice();
    return p._free(y), {
      array: P,
      itemSize: 1
    };
  }
  function a(p, h, d, g, w, _) {
    const y = _.num_components(), I2 = d.num_points() * y, S = I2 * w.BYTES_PER_ELEMENT, R = c(p, w), j = p._malloc(S);
    h.GetAttributeDataArrayForAllPoints(d, _, R, S, j);
    const F = new w(p.HEAPF32.buffer, j, I2).slice();
    return p._free(j), {
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
function Gt() {
  const { state: v, setState: n } = inject("useTres", D()), r = inject("extend") || (() => {
  });
  return {
    state: v,
    setState: n,
    extend: r
  };
}
var bh = ["args"];
var Pd = defineComponent({
  __name: "OrbitControls",
  props: {
    makeDefault: { type: Boolean, default: false },
    camera: null,
    domElement: null,
    target: null,
    enableDamping: { type: Boolean }
  },
  setup(v) {
    const n = v, { state: r, setState: s, extend: a } = Gt(), c = ref(null);
    return a({ OrbitControls: dp }), watch(c, (p) => {
      p && n.makeDefault ? s("controls", p) : s("controls", null);
    }), (p, h) => {
      var d;
      return unref(r).camera && unref(r).renderer ? (openBlock(), createElementBlock("TresOrbitControls", {
        key: 0,
        ref_key: "controls",
        ref: c,
        args: [unref(r).camera || v.camera, ((d = unref(r).renderer) == null ? void 0 : d.domElement) || v.domElement]
      }, null, 8, bh)) : createCommentVNode("", true);
    };
  }
});
var Ea;
var ol = typeof window < "u";
var gh = (v) => typeof v == "string";
var _h = () => {
};
ol && ((Ea = window == null ? void 0 : window.navigator) != null && Ea.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function al(v) {
  return typeof v == "function" ? v() : unref(v);
}
function wh(v) {
  return v;
}
function yh(v) {
  return getCurrentScope() ? (onScopeDispose(v), true) : false;
}
function xh(v, n = true) {
  getCurrentInstance() ? onMounted(v) : n ? v() : nextTick(v);
}
function Eh(v) {
  var n;
  const r = al(v);
  return (n = r == null ? void 0 : r.$el) != null ? n : r;
}
var Eo = ol ? window : void 0;
function an(...v) {
  let n, r, s, a;
  if (gh(v[0]) || Array.isArray(v[0]) ? ([r, s, a] = v, n = Eo) : [n, r, s, a] = v, !n)
    return _h;
  Array.isArray(r) || (r = [r]), Array.isArray(s) || (s = [s]);
  const c = [], p = () => {
    c.forEach((w) => w()), c.length = 0;
  }, h = (w, _, y, P) => (w.addEventListener(_, y, P), () => w.removeEventListener(_, y, P)), d = watch(() => [Eh(n), al(a)], ([w, _]) => {
    p(), w && c.push(...r.flatMap((y) => s.map((P) => h(w, y, P, _))));
  }, { immediate: true, flush: "post" }), g = () => {
    d(), p();
  };
  return yh(g), g;
}
var Ca = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var Pa = "__vueuse_ssr_handlers__";
Ca[Pa] = Ca[Pa] || {};
function Ch(v = {}) {
  const {
    type: n = "page",
    touch: r = true,
    resetOnTouchEnds: s = false,
    initialValue: a = { x: 0, y: 0 },
    window: c = Eo,
    eventFilter: p
  } = v, h = ref(a.x), d = ref(a.y), g = ref(null), w = (S) => {
    n === "page" ? (h.value = S.pageX, d.value = S.pageY) : n === "client" ? (h.value = S.clientX, d.value = S.clientY) : n === "movement" && (h.value = S.movementX, d.value = S.movementY), g.value = "mouse";
  }, _ = () => {
    h.value = a.x, d.value = a.y;
  }, y = (S) => {
    if (S.touches.length > 0) {
      const R = S.touches[0];
      n === "page" ? (h.value = R.pageX, d.value = R.pageY) : n === "client" && (h.value = R.clientX, d.value = R.clientY), g.value = "touch";
    }
  }, P = (S) => p === void 0 ? w(S) : p(() => w(S), {}), I2 = (S) => p === void 0 ? y(S) : p(() => y(S), {});
  return c && (an(c, "mousemove", P, { passive: true }), an(c, "dragover", P, { passive: true }), r && n !== "movement" && (an(c, "touchstart", I2, { passive: true }), an(c, "touchmove", I2, { passive: true }), s && an(c, "touchend", _, { passive: true }))), {
    x: h,
    y: d,
    sourceType: g
  };
}
var Ta;
(function(v) {
  v.UP = "UP", v.RIGHT = "RIGHT", v.DOWN = "DOWN", v.LEFT = "LEFT", v.NONE = "NONE";
})(Ta || (Ta = {}));
var Ph = Object.defineProperty;
var ka = Object.getOwnPropertySymbols;
var Th = Object.prototype.hasOwnProperty;
var kh = Object.prototype.propertyIsEnumerable;
var Ma = (v, n, r) => n in v ? Ph(v, n, { enumerable: true, configurable: true, writable: true, value: r }) : v[n] = r;
var Mh = (v, n) => {
  for (var r in n || (n = {}))
    Th.call(n, r) && Ma(v, r, n[r]);
  if (ka)
    for (var r of ka(n))
      kh.call(n, r) && Ma(v, r, n[r]);
  return v;
};
var Sh = {
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
Mh({
  linear: wh
}, Sh);
function Lh(v = {}) {
  const {
    window: n = Eo,
    initialWidth: r = 1 / 0,
    initialHeight: s = 1 / 0,
    listenOrientation: a = true,
    includeScrollbar: c = true
  } = v, p = ref(r), h = ref(s), d = () => {
    n && (c ? (p.value = n.innerWidth, h.value = n.innerHeight) : (p.value = n.document.documentElement.clientWidth, h.value = n.document.documentElement.clientHeight));
  };
  return d(), xh(d), an("resize", d, { passive: true }), a && an("orientationchange", d, { passive: true }), { width: p, height: h };
}
var Ah = ["args"];
var Td = defineComponent({
  __name: "PointerLockControls",
  props: {
    makeDefault: { type: Boolean, default: false },
    camera: null,
    domElement: null,
    selector: null
  },
  setup(v, { expose: n }) {
    const r = v, { state: s, setState: a, extend: c } = Gt(), p = ref(null);
    let h;
    return c({ PointerLockControls: hp }), watch(p, (d) => {
      var w;
      d && r.makeDefault ? a("controls", d) : a("controls", null);
      const g = document.getElementById(r.selector || "");
      h = g || ((w = s.renderer) == null ? void 0 : w.domElement), an(h, "click", () => {
        var _;
        (_ = p.value) == null || _.lock();
      });
    }), n({
      value: p
    }), (d, g) => {
      var w;
      return unref(s).camera && unref(s).renderer ? (openBlock(), createElementBlock("TresPointerLockControls", {
        key: 0,
        ref_key: "controls",
        ref: p,
        args: [unref(s).camera || v.camera, ((w = unref(s).renderer) == null ? void 0 : w.domElement) || v.domElement]
      }, null, 8, Ah)) : createCommentVNode("", true);
    };
  }
});
function Rh(v, n) {
  const r = {};
  for (const s of n)
    Object.prototype.hasOwnProperty.call(v, s) && (r[s] = v[s]);
  return r;
}
function Ih(v, n) {
  const r = `set${n[0].toUpperCase()}${n.slice(1)}`;
  return v[r] !== void 0;
}
var kd = defineComponent({
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
    const r = v;
    let s = shallowRef();
    const { state: a } = Gt(), c = computed(
      () => Rh(r, [
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
    ), p = () => n("change", s.value), h = () => n("mouseDown", s.value), d = () => n("mouseUp", s.value), g = () => n("objectChange", s.value), w = (y) => {
      a.controls && (a.controls.enabled = !y.value), n("dragging", y.value);
    };
    function _(y) {
      y.addEventListener("dragging-changed", w), y.addEventListener("change", p), y.addEventListener("mouseDown", h), y.addEventListener("mouseUp", d), y.addEventListener("objectChange", g);
    }
    return watchEffect(() => {
      a.camera && a.renderer && a.scene && r.object && (s.value = new op(a.camera, a.renderer.domElement), s.value.attach(r.object), a.scene.add(s.value), _(s.value));
    }), watch(
      [c, s],
      // TODO: properly type this
      ([y, P]) => {
        if (y && P)
          for (const I2 in y)
            if (!Ih(P, I2))
              P[I2] = y[I2];
            else {
              const S = `set${I2[0].toUpperCase()}${I2.slice(1)}`;
              typeof P[S] == "function" && y[I2] !== void 0 && P[S](y[I2]);
            }
      },
      {
        immediate: true
      }
    ), onUnmounted(() => {
      s.value && (s.value.removeEventListener("dragging-changed", w), s.value.removeEventListener("change", p), s.value.removeEventListener("mouseDown", h), s.value.removeEventListener("mouseUp", d), s.value.removeEventListener("objectChange", g));
    }), (y, P) => renderSlot(y.$slots, "default");
  }
});
function Vh(v = false, n = 5, r) {
  const { x: s, y: a } = Ch(), { logWarning: c } = I(), { width: p, height: h } = Lh(), d = computed(() => (s.value / p.value - 0.5) * n), g = computed(() => -(a.value / h.value - 0.5) * n);
  if (r) {
    const { x: w, y: _ } = r.position;
    watchEffect(() => {
      v || r && (r.position.x = w + d.value, r.position.y = _ + g.value);
    });
  } else
    c("Scene must contain a Camera component to use this composable");
}
var Md = defineComponent({
  name: "PamCameraMouse",
  props: ["disabled", "factor"],
  setup(v) {
    const { state: n } = Gt();
    return watchEffect(() => {
      if (n != null && n.camera) {
        const r = n == null ? void 0 : n.camera;
        Vh(v.disabled, v.factor, r);
      }
    }), () => {
    };
  }
});
var Gs = {};
var Dh = {
  get exports() {
    return Gs;
  },
  set exports(v) {
    Gs = v;
  }
};
(function(v, n) {
  (function(r, s) {
    s(n);
  })(rl, function(r) {
    class s {
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
    function _(i) {
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
    const I2 = {
      alreadydisposed: () => "View has been already disposed",
      invalidparams: (i) => `Invalid parameters for '${i.name}'`,
      nomatchingcontroller: (i) => `No matching controller for '${i.key}'`,
      nomatchingview: (i) => `No matching view for '${JSON.stringify(i.params)}'`,
      notbindable: () => "Value is not bindable",
      propertynotfound: (i) => `Property '${i.name}' not found`,
      shouldneverhappen: () => "This error should never happen"
    };
    class S {
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
      constructor(e) {
        var t;
        this.message = (t = I2[e.type](e.context)) !== null && t !== void 0 ? t : "Unexpected error", this.name = this.constructor.name, this.stack = new Error(this.message).stack, this.type = e.type;
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
        return l && (this.observers_[e] = l.filter((b) => b.handler !== t)), this;
      }
      emit(e, t) {
        const l = this.observers_[e];
        l && l.forEach((b) => {
          b.handler(t);
        });
      }
    }
    const V = "tp";
    function D2(i) {
      return (t, l) => [
        V,
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
    class ge {
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
        this.emitter = new F(), this.onClick_ = this.onClick_.bind(this), this.props = t.props, this.viewProps = t.viewProps, this.view = new ge(e, {
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
    function Pe(i, e) {
      const l = Object.keys(e).reduce((b, E) => {
        if (b === void 0)
          return;
        const k = e[E], B = k(i[E]);
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
    function be(i) {
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
            return Pe(t, e);
        })(i),
        array: (e) => ne((t) => {
          if (Array.isArray(t))
            return fe(t, e);
        })(i)
      };
    }
    const M = {
      optional: be(true),
      required: be(false)
    };
    function le(i, e) {
      const t = M.required.object(e)(i);
      return t.succeeded ? t.value : void 0;
    }
    function Ve(i) {
      console.warn([
        `Missing '${i.key}' of ${i.target} in ${i.place}.`,
        "Please rebuild plugins with the latest core package."
      ].join(" "));
    }
    function Be(i) {
      return i && i.parentElement && i.parentElement.removeChild(i), null;
    }
    class we {
      constructor(e) {
        this.value_ = e;
      }
      static create(e) {
        return [
          new we(e),
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
    const st = D2("");
    function jn(i, e) {
      return K(i, st(void 0, e));
    }
    class Ye extends X {
      constructor(e) {
        var t;
        super(e), this.onDisabledChange_ = this.onDisabledChange_.bind(this), this.onParentChange_ = this.onParentChange_.bind(this), this.onParentGlobalDisabledChange_ = this.onParentGlobalDisabledChange_.bind(this), [this.globalDisabled_, this.setGlobalDisabled_] = we.create(ee(this.getGlobalDisabled_())), this.value("disabled").emitter.on("change", this.onDisabledChange_), this.value("parent").emitter.on("change", this.onParentChange_), (t = this.get("parent")) === null || t === void 0 || t.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_);
      }
      static create(e) {
        var t, l, b;
        const E = e ?? {};
        return new Ye(X.createCore({
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
    function zn() {
      return ["veryfirst", "first", "last", "verylast"];
    }
    const cn = D2(""), mt = {
      veryfirst: "vfst",
      first: "fst",
      last: "lst",
      verylast: "vlst"
    };
    class Mt {
      constructor(e) {
        this.parent_ = null, this.blade = e.blade, this.view = e.view, this.viewProps = e.viewProps;
        const t = this.view.element;
        this.blade.value("positions").emitter.on("change", () => {
          zn().forEach((l) => {
            t.classList.remove(cn(void 0, mt[l]));
          }), this.blade.get("positions").forEach((l) => {
            t.classList.add(cn(void 0, mt[l]));
          });
        }), this.viewProps.handleDispose(() => {
          Be(t);
        });
      }
      get parent() {
        return this.parent_;
      }
      set parent(e) {
        if (this.parent_ = e, !("parent" in this.viewProps.valMap_)) {
          Ve({
            key: "parent",
            target: Ye.name,
            place: "BladeController.parent"
          });
          return;
        }
        this.viewProps.set("parent", this.parent_ ? this.parent_.viewProps : null);
      }
    }
    const ze = "http://www.w3.org/2000/svg";
    function rt(i) {
      i.offsetHeight;
    }
    function un(i, e) {
      const t = i.style.transition;
      i.style.transition = "none", e(), i.style.transition = t;
    }
    function ft(i) {
      return i.ontouchstart !== void 0;
    }
    function Un() {
      return globalThis;
    }
    function mi() {
      return Un().document;
    }
    function Gn(i) {
      const e = i.ownerDocument.defaultView;
      return e && "document" in e ? i.getContext("2d", {
        willReadFrequently: true
      }) : null;
    }
    const Hn = {
      check: '<path d="M2 8l4 4l8 -8"/>',
      dropdown: '<path d="M5 7h6l-3 3 z"/>',
      p2dpad: '<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'
    };
    function xt(i, e) {
      const t = i.createElementNS(ze, "svg");
      return t.innerHTML = Hn[e], t;
    }
    function St(i, e, t) {
      i.insertBefore(e, i.children[t]);
    }
    function Kn(i) {
      i.parentElement && i.parentElement.removeChild(i);
    }
    function pn(i) {
      for (; i.children.length > 0; )
        i.removeChild(i.children[0]);
    }
    function $n(i) {
      for (; i.childNodes.length > 0; )
        i.removeChild(i.childNodes[0]);
    }
    function Et2(i) {
      return i.relatedTarget ? i.relatedTarget : "explicitOriginalTarget" in i ? i.explicitOriginalTarget : null;
    }
    const vt = D2("lbl");
    function Lt(i, e) {
      const t = i.createDocumentFragment();
      return e.split(`
`).map((b) => i.createTextNode(b)).forEach((b, E) => {
        E > 0 && t.appendChild(i.createElement("br")), t.appendChild(b);
      }), t;
    }
    class L {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(vt()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(vt("l")), O(t.props, "label", (E) => {
          _(E) ? this.element.classList.add(vt(void 0, "nol")) : (this.element.classList.remove(vt(void 0, "nol")), $n(l), l.appendChild(Lt(e, E)));
        }), this.element.appendChild(l), this.labelElement = l;
        const b = e.createElement("div");
        b.classList.add(vt("v")), this.element.appendChild(b), this.valueElement = b;
      }
    }
    class U extends Mt {
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
        const e = M, t = le(i, {
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
        return !(i.controller instanceof U) || !(i.controller.valueController instanceof ce) ? null : new j(i.controller);
      }
    };
    class ie extends Mt {
      constructor(e) {
        super(e), this.value = e.value;
      }
    }
    function ye() {
      return new X({
        positions: ee([], {
          equals: y
        })
      });
    }
    class De extends X {
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
        return new De(l);
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
    function Ht(i, e) {
      let t = 0;
      return un(e, () => {
        i.set("expandedHeight", null), i.set("temporaryExpanded", true), rt(e), t = e.clientHeight, i.set("temporaryExpanded", null), rt(e);
      }), t;
    }
    function hn(i, e) {
      e.style.height = i.styleHeight;
    }
    function Ue(i, e) {
      i.value("expanded").emitter.on("beforechange", () => {
        if (i.set("completed", false), _(i.get("expandedHeight"))) {
          const t = Ht(i, e);
          t > 0 && i.set("expandedHeight", t);
        }
        i.set("shouldFixHeight", true), rt(e);
      }), i.emitter.on("change", () => {
        hn(i, e);
      }), hn(i, e), e.addEventListener("transitionend", (t) => {
        t.propertyName === "height" && i.cleanUpTransition();
      });
    }
    class Ge extends a {
      constructor(e, t) {
        super(e), this.rackApi_ = t;
      }
    }
    function qs(i, e) {
      return i.addBlade(Object.assign(Object.assign({}, e), { view: "button" }));
    }
    function Qs(i, e) {
      return i.addBlade(Object.assign(Object.assign({}, e), { view: "folder" }));
    }
    function Zs(i, e) {
      const t = e ?? {};
      return i.addBlade(Object.assign(Object.assign({}, t), { view: "separator" }));
    }
    function fi(i, e) {
      return i.addBlade(Object.assign(Object.assign({}, e), { view: "tab" }));
    }
    class At {
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
    class vi extends a {
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
    class je extends U {
      constructor(e, t) {
        super(e, t), this.binding = t.binding;
      }
    }
    class bi extends a {
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
    class ot extends U {
      constructor(e, t) {
        super(e, t), this.binding = t.binding, this.viewProps.bindDisabled(this.binding.ticker), this.viewProps.handleDispose(() => {
          this.binding.dispose();
        });
      }
    }
    function is(i) {
      return i instanceof Xn ? i.apiSet_ : i instanceof Ge ? i.rackApi_.apiSet_ : null;
    }
    function dn(i, e) {
      const t = i.find((l) => l.controller_ === e);
      if (!t)
        throw S.shouldNeverHappen();
      return t;
    }
    function ss(i, e, t) {
      if (!R.isBindable(i))
        throw S.notBindable();
      return new R(i, e, t);
    }
    class Xn extends a {
      constructor(e, t) {
        super(e), this.onRackAdd_ = this.onRackAdd_.bind(this), this.onRackRemove_ = this.onRackRemove_.bind(this), this.onRackInputChange_ = this.onRackInputChange_.bind(this), this.onRackMonitorUpdate_ = this.onRackMonitorUpdate_.bind(this), this.emitter_ = new F(), this.apiSet_ = new At(is), this.pool_ = t;
        const l = this.controller_.rack;
        l.emitter.on("add", this.onRackAdd_), l.emitter.on("remove", this.onRackRemove_), l.emitter.on("inputchange", this.onRackInputChange_), l.emitter.on("monitorupdate", this.onRackMonitorUpdate_), l.children.forEach((b) => {
          this.setUpApi_(b);
        });
      }
      get children() {
        return this.controller_.rack.children.map((e) => dn(this.apiSet_, e));
      }
      addInput(e, t, l) {
        const b = l ?? {}, E = this.controller_.view.element.ownerDocument, k = this.pool_.createInput(E, ss(e, t, b.presetKey), b), B = new vi(k);
        return this.add(B, b.index);
      }
      addMonitor(e, t, l) {
        const b = l ?? {}, E = this.controller_.view.element.ownerDocument, k = this.pool_.createMonitor(E, ss(e, t), b), B = new bi(k);
        return this.add(B, b.index);
      }
      addFolder(e) {
        return Qs(this, e);
      }
      addButton(e) {
        return qs(this, e);
      }
      addSeparator(e) {
        return Zs(this, e);
      }
      addTab(e) {
        return fi(this, e);
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
        if (t instanceof je) {
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
        if (!(e.bladeController instanceof ot))
          throw S.shouldNeverHappen();
        const t = dn(this.apiSet_, e.bladeController), l = e.bladeController.binding;
        this.emitter_.emit("update", {
          event: new h(t, l.target.read(), l.target.presetKey)
        });
      }
    }
    class gi extends Ge {
      constructor(e, t) {
        super(e, new Xn(e.rackController, t)), this.emitter_ = new F(), this.controller_.foldable.value("expanded").emitter.on("change", (l) => {
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
    class _i extends Mt {
      constructor(e) {
        super({
          blade: e.blade,
          view: e.view,
          viewProps: e.rackController.viewProps
        }), this.rackController = e.rackController;
      }
    }
    class Ws {
      constructor(e, t) {
        const l = D2(t.viewName);
        this.element = e.createElement("div"), this.element.classList.add(l()), t.viewProps.bindClassModifiers(this.element);
      }
    }
    function Js(i, e) {
      for (let t = 0; t < i.length; t++) {
        const l = i[t];
        if (l instanceof je && l.binding === e)
          return l;
      }
      return null;
    }
    function er(i, e) {
      for (let t = 0; t < i.length; t++) {
        const l = i[t];
        if (l instanceof ot && l.binding === e)
          return l;
      }
      return null;
    }
    function tr(i, e) {
      for (let t = 0; t < i.length; t++) {
        const l = i[t];
        if (l instanceof ie && l.value === e)
          return l;
      }
      return null;
    }
    function wi(i) {
      return i instanceof mn ? i.rack : i instanceof _i ? i.rackController.rack : null;
    }
    function nr(i) {
      const e = wi(i);
      return e ? e.bcSet_ : null;
    }
    class ir {
      constructor(e) {
        var t, l;
        this.onBladePositionsChange_ = this.onBladePositionsChange_.bind(this), this.onSetAdd_ = this.onSetAdd_.bind(this), this.onSetRemove_ = this.onSetRemove_.bind(this), this.onChildDispose_ = this.onChildDispose_.bind(this), this.onChildPositionsChange_ = this.onChildPositionsChange_.bind(this), this.onChildInputChange_ = this.onChildInputChange_.bind(this), this.onChildMonitorUpdate_ = this.onChildMonitorUpdate_.bind(this), this.onChildValueChange_ = this.onChildValueChange_.bind(this), this.onChildViewPropsChange_ = this.onChildViewPropsChange_.bind(this), this.onDescendantLayout_ = this.onDescendantLayout_.bind(this), this.onDescendantInputChange_ = this.onDescendantInputChange_.bind(this), this.onDescendantMonitorUpdate_ = this.onDescendantMonitorUpdate_.bind(this), this.emitter = new F(), this.blade_ = (t = e.blade) !== null && t !== void 0 ? t : null, (l = this.blade_) === null || l === void 0 || l.value("positions").emitter.on("change", this.onBladePositionsChange_), this.viewProps = e.viewProps, this.bcSet_ = new At(nr), this.bcSet_.emitter.on("add", this.onSetAdd_), this.bcSet_.emitter.on("remove", this.onSetRemove_);
      }
      get children() {
        return this.bcSet_.items;
      }
      add(e, t) {
        var l;
        (l = e.parent) === null || l === void 0 || l.remove(e), P(e, "parent") ? e.parent = this : (e.parent_ = this, Ve({
          key: "parent",
          target: "BladeController",
          place: "BladeRack.add"
        })), this.bcSet_.add(e, t);
      }
      remove(e) {
        P(e, "parent") ? e.parent = null : (e.parent_ = null, Ve({
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
        if (l.viewProps.emitter.on("change", this.onChildViewPropsChange_), l.blade.value("positions").emitter.on("change", this.onChildPositionsChange_), l.viewProps.handleDispose(this.onChildDispose_), l instanceof je)
          l.binding.emitter.on("change", this.onChildInputChange_);
        else if (l instanceof ot)
          l.binding.emitter.on("update", this.onChildMonitorUpdate_);
        else if (l instanceof ie)
          l.value.emitter.on("change", this.onChildValueChange_);
        else {
          const b = wi(l);
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
        if (l instanceof je)
          l.binding.emitter.off("change", this.onChildInputChange_);
        else if (l instanceof ot)
          l.binding.emitter.off("update", this.onChildMonitorUpdate_);
        else if (l instanceof ie)
          l.value.emitter.off("change", this.onChildValueChange_);
        else {
          const b = wi(l);
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
        const t = Js(this.find(je), e.sender);
        if (!t)
          throw S.alreadyDisposed();
        this.emitter.emit("inputchange", {
          bladeController: t,
          options: e.options,
          sender: this
        });
      }
      onChildMonitorUpdate_(e) {
        const t = er(this.find(ot), e.sender);
        if (!t)
          throw S.alreadyDisposed();
        this.emitter.emit("monitorupdate", {
          bladeController: t,
          sender: this
        });
      }
      onChildValueChange_(e) {
        const t = tr(this.find(ie), e.sender);
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
    class mn extends Mt {
      constructor(e, t) {
        super(Object.assign(Object.assign({}, t), { view: new Ws(e, {
          viewName: "brk",
          viewProps: t.viewProps
        }) })), this.onRackAdd_ = this.onRackAdd_.bind(this), this.onRackRemove_ = this.onRackRemove_.bind(this);
        const l = new ir({
          blade: t.root ? void 0 : t.blade,
          viewProps: t.viewProps
        });
        l.emitter.on("add", this.onRackAdd_), l.emitter.on("remove", this.onRackRemove_), this.rack = l, this.viewProps.handleDispose(() => {
          for (let b = this.rack.children.length - 1; b >= 0; b--)
            this.rack.children[b].viewProps.set("disposed", true);
        });
      }
      onRackAdd_(e) {
        e.isRoot && St(this.view.element, e.bladeController.view.element, e.index);
      }
      onRackRemove_(e) {
        e.isRoot && Kn(e.bladeController.view.element);
      }
    }
    const rs = D2("cnt");
    class sr {
      constructor(e, t) {
        var l;
        this.className_ = D2((l = t.viewName) !== null && l !== void 0 ? l : "fld"), this.element = e.createElement("div"), this.element.classList.add(this.className_(), rs()), t.viewProps.bindClassModifiers(this.element), this.foldable_ = t.foldable, this.foldable_.bindExpandedClass(this.element, this.className_(void 0, "expanded")), O(this.foldable_, "completed", K(this.element, this.className_(void 0, "cpl")));
        const b = e.createElement("button");
        b.classList.add(this.className_("b")), O(t.props, "title", (J) => {
          _(J) ? this.element.classList.add(this.className_(void 0, "not")) : this.element.classList.remove(this.className_(void 0, "not"));
        }), t.viewProps.bindDisabled(b), this.element.appendChild(b), this.buttonElement = b;
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
    class Yn extends _i {
      constructor(e, t) {
        var l;
        const b = De.create((l = t.expanded) !== null && l !== void 0 ? l : true), E = new mn(e, {
          blade: t.blade,
          root: t.root,
          viewProps: t.viewProps
        });
        super(Object.assign(Object.assign({}, t), { rackController: E, view: new sr(e, {
          containerElement: E.view.element,
          foldable: b,
          props: t.props,
          viewName: t.root ? "rot" : void 0,
          viewProps: t.viewProps
        }) })), this.onTitleClick_ = this.onTitleClick_.bind(this), this.props = t.props, this.foldable = b, Ue(this.foldable, this.view.containerElement), this.rackController.rack.emitter.on("add", () => {
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
    const rr = {
      id: "folder",
      type: "blade",
      accept(i) {
        const e = M, t = le(i, {
          title: e.required.string,
          view: e.required.constant("folder"),
          expanded: e.optional.boolean
        });
        return t ? { params: t } : null;
      },
      controller(i) {
        return new Yn(i.document, {
          blade: i.blade,
          expanded: i.params.expanded,
          props: X.fromObject({
            title: i.params.title
          }),
          viewProps: i.viewProps
        });
      },
      api(i) {
        return i.controller instanceof Yn ? new gi(i.controller, i.pool) : null;
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
    class os extends a {
    }
    const yi = D2("spr");
    class or {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(yi()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("hr");
        l.classList.add(yi("r")), this.element.appendChild(l);
      }
    }
    class fn extends Mt {
      constructor(e, t) {
        super(Object.assign(Object.assign({}, t), { view: new or(e, {
          viewProps: t.viewProps
        }) }));
      }
    }
    const ar = {
      id: "separator",
      type: "blade",
      accept(i) {
        const t = le(i, {
          view: M.required.constant("separator")
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
        return i.controller instanceof fn ? new os(i.controller) : null;
      }
    }, Re = D2("tbi");
    class lr {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(Re()), t.viewProps.bindClassModifiers(this.element), O(t.props, "selected", (E) => {
          E ? this.element.classList.add(Re(void 0, "sel")) : this.element.classList.remove(Re(void 0, "sel"));
        });
        const l = e.createElement("button");
        l.classList.add(Re("b")), t.viewProps.bindDisabled(l), this.element.appendChild(l), this.buttonElement = l;
        const b = e.createElement("div");
        b.classList.add(Re("t")), q(t.props.value("title"), b), this.buttonElement.appendChild(b), this.titleElement = b;
      }
    }
    class qn {
      constructor(e, t) {
        this.emitter = new F(), this.onClick_ = this.onClick_.bind(this), this.props = t.props, this.viewProps = t.viewProps, this.view = new lr(e, {
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
    class as {
      constructor(e, t) {
        this.onItemClick_ = this.onItemClick_.bind(this), this.ic_ = new qn(e, {
          props: t.itemProps,
          viewProps: Ye.create()
        }), this.ic_.emitter.on("click", this.onItemClick_), this.cc_ = new mn(e, {
          blade: ye(),
          viewProps: Ye.create()
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
    class xi {
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
    class ls extends Ge {
      constructor(e, t) {
        super(e, new Xn(e.rackController, t)), this.onPageAdd_ = this.onPageAdd_.bind(this), this.onPageRemove_ = this.onPageRemove_.bind(this), this.onSelect_ = this.onSelect_.bind(this), this.emitter_ = new F(), this.pageApiMap_ = /* @__PURE__ */ new Map(), this.rackApi_.on("change", (l) => {
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
        const t = this.controller_.view.element.ownerDocument, l = new as(t, {
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
          throw S.shouldNeverHappen();
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
          throw S.shouldNeverHappen();
        const l = new xi(e, t);
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
    const cs = -1;
    class cr {
      constructor() {
        this.onItemSelectedChange_ = this.onItemSelectedChange_.bind(this), this.empty = ee(true), this.selectedIndex = ee(cs), this.items_ = [];
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
          this.selectedIndex.rawValue = cs, this.empty.rawValue = true;
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
        this.element = e.createElement("div"), this.element.classList.add($t(), rs()), t.viewProps.bindClassModifiers(this.element), N(t.empty, K(this.element, $t(void 0, "nop")));
        const l = e.createElement("div");
        l.classList.add($t("t")), this.element.appendChild(l), this.itemsElement = l;
        const b = e.createElement("div");
        b.classList.add($t("i")), this.element.appendChild(b);
        const E = t.contentsElement;
        E.classList.add($t("c")), this.element.appendChild(E), this.contentsElement = E;
      }
    }
    class vn extends _i {
      constructor(e, t) {
        const l = new mn(e, {
          blade: t.blade,
          viewProps: t.viewProps
        }), b = new cr();
        super({
          blade: t.blade,
          rackController: l,
          view: new Xt(e, {
            contentsElement: l.view.element,
            empty: b.empty,
            viewProps: t.viewProps
          })
        }), this.onPageAdd_ = this.onPageAdd_.bind(this), this.onPageRemove_ = this.onPageRemove_.bind(this), this.pageSet_ = new At(() => null), this.pageSet_.emitter.on("add", this.onPageAdd_), this.pageSet_.emitter.on("remove", this.onPageRemove_), this.tab = b;
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
        St(this.view.itemsElement, t.itemController.view.element, e.index), t.itemController.viewProps.set("parent", this.viewProps), this.rackController.rack.add(t.contentController, e.index), this.tab.add(t.props.value("selected"));
      }
      onPageRemove_(e) {
        const t = e.item;
        Kn(t.itemController.view.element), t.itemController.viewProps.set("parent", null), this.rackController.rack.remove(t.contentController), this.tab.remove(t.props.value("selected"));
      }
    }
    const Ei = {
      id: "tab",
      type: "blade",
      accept(i) {
        const e = M, t = le(i, {
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
          const l = new as(i.document, {
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
        return i.controller instanceof vn ? new ls(i.controller, i.pool) : null;
      }
    };
    function ur(i, e) {
      const t = i.accept(e.params);
      if (!t)
        return null;
      const l = M.optional.boolean(e.params.disabled).value, b = M.optional.boolean(e.params.hidden).value;
      return i.controller({
        blade: ye(),
        document: e.document,
        params: Object.assign(Object.assign({}, t.params), { disabled: l, hidden: b }),
        viewProps: Ye.create({
          disabled: l,
          hidden: b
        })
      });
    }
    class us {
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
    class Ci {
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
    class Qn {
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
    function Me2(i, e) {
      for (; i.length < e; )
        i.push(void 0);
    }
    function ps(i) {
      const e = [];
      return Me2(e, i), ee(e);
    }
    function Yt(i) {
      const e = i.indexOf(void 0);
      return e < 0 ? i : i.slice(0, e);
    }
    function qe(i, e) {
      const t = [...Yt(i), e];
      return t.length > i.length ? t.splice(0, t.length - i.length) : Me2(t, i.length), t;
    }
    class pr {
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
        this.value.rawValue = qe(t, l), this.emitter.emit("update", {
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
    function tt(i, e) {
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
    class Pi {
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
        return _(l) || (b = Math.max(b, l)), _(t) || (b = Math.min(b, t)), b;
      }
    }
    class Zn {
      constructor(e, t = 0) {
        this.step = e, this.origin = t;
      }
      constrain(e) {
        const t = this.origin % this.step, l = Math.round((e - t) / this.step);
        return t + l * this.step;
      }
    }
    const Qt = D2("lst");
    class hs {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.props_ = t.props, this.element = e.createElement("div"), this.element.classList.add(Qt()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("select");
        l.classList.add(Qt("s")), O(this.props_, "options", (E) => {
          pn(l), E.forEach((k, B) => {
            const Q = e.createElement("option");
            Q.dataset.index = String(B), Q.textContent = k.text, Q.value = String(k.value), l.appendChild(Q);
          });
        }), t.viewProps.bindDisabled(l), this.element.appendChild(l), this.selectElement = l;
        const b = e.createElement("div");
        b.classList.add(Qt("m")), b.appendChild(xt(e, "dropdown")), this.element.appendChild(b), t.value.emitter.on("change", this.onValueChange_), this.value_ = t.value, this.update_();
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
        this.onSelectChange_ = this.onSelectChange_.bind(this), this.props = t.props, this.value = t.value, this.viewProps = t.viewProps, this.view = new hs(e, {
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
    const ds = D2("pop");
    class hr {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(ds()), t.viewProps.bindClassModifiers(this.element), N(t.shows, K(this.element, ds(void 0, "v")));
      }
    }
    class ms {
      constructor(e, t) {
        this.shows = ee(false), this.viewProps = t.viewProps, this.view = new hr(e, {
          shows: this.shows,
          viewProps: this.viewProps
        });
      }
    }
    const fs = D2("txt");
    class dr {
      constructor(e, t) {
        this.onChange_ = this.onChange_.bind(this), this.element = e.createElement("div"), this.element.classList.add(fs()), t.viewProps.bindClassModifiers(this.element), this.props_ = t.props, this.props_.emitter.on("change", this.onChange_);
        const l = e.createElement("input");
        l.classList.add(fs("i")), l.type = "text", t.viewProps.bindDisabled(l), this.element.appendChild(l), this.inputElement = l, t.value.emitter.on("change", this.onChange_), this.value_ = t.value, this.refresh();
      }
      refresh() {
        const e = this.props_.get("formatter");
        this.inputElement.value = e(this.value_.rawValue);
      }
      onChange_() {
        this.refresh();
      }
    }
    class Wn {
      constructor(e, t) {
        this.onInputChange_ = this.onInputChange_.bind(this), this.parser_ = t.parser, this.props = t.props, this.value = t.value, this.viewProps = t.viewProps, this.view = new dr(e, {
          props: t.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_);
      }
      onInputChange_(e) {
        const l = e.currentTarget.value, b = this.parser_(l);
        _(b) || (this.value.rawValue = b), this.view.refresh();
      }
    }
    function mr(i) {
      return String(i);
    }
    function vs(i) {
      return i === "false" ? false : !!i;
    }
    function bs(i) {
      return mr(i);
    }
    class fr {
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
    const vr = {
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
    class br {
      constructor(e, t, l) {
        this.left = t, this.operator = e, this.right = l;
      }
      evaluate() {
        const e = vr[this.operator];
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
    const gs = {
      "+": (i) => i,
      "-": (i) => -i,
      "~": (i) => ~i
    };
    class gr {
      constructor(e, t) {
        this.operator = e, this.expression = t;
      }
      evaluate() {
        const e = gs[this.operator];
        if (!e)
          throw new Error(`unexpected unary operator: '${this.operator}`);
        return e(this.expression.evaluate());
      }
      toString() {
        return ["u(", this.operator, this.expression.toString(), ")"].join(" ");
      }
    }
    function Ti(i) {
      return (e, t) => {
        for (let l = 0; l < i.length; l++) {
          const b = i[l](e, t);
          if (b !== "")
            return b;
        }
        return "";
      };
    }
    function Rt(i, e) {
      var t;
      const l = i.substr(e).match(/^\s+/);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function _r(i, e) {
      const t = i.substr(e, 1);
      return t.match(/^[1-9]$/) ? t : "";
    }
    function wn(i, e) {
      var t;
      const l = i.substr(e).match(/^[0-9]+/);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function wr(i, e) {
      const t = wn(i, e);
      if (t !== "")
        return t;
      const l = i.substr(e, 1);
      if (e += 1, l !== "-" && l !== "+")
        return "";
      const b = wn(i, e);
      return b === "" ? "" : l + b;
    }
    function at(i, e) {
      const t = i.substr(e, 1);
      if (e += 1, t.toLowerCase() !== "e")
        return "";
      const l = wr(i, e);
      return l === "" ? "" : t + l;
    }
    function _s(i, e) {
      const t = i.substr(e, 1);
      if (t === "0")
        return t;
      const l = _r(i, e);
      return e += l.length, l === "" ? "" : l + wn(i, e);
    }
    function yr(i, e) {
      const t = _s(i, e);
      if (e += t.length, t === "")
        return "";
      const l = i.substr(e, 1);
      if (e += l.length, l !== ".")
        return "";
      const b = wn(i, e);
      return e += b.length, t + l + b + at(i, e);
    }
    function ws(i, e) {
      const t = i.substr(e, 1);
      if (e += t.length, t !== ".")
        return "";
      const l = wn(i, e);
      return e += l.length, l === "" ? "" : t + l + at(i, e);
    }
    function xr(i, e) {
      const t = _s(i, e);
      return e += t.length, t === "" ? "" : t + at(i, e);
    }
    const ys = Ti([
      yr,
      ws,
      xr
    ]);
    function ki(i, e) {
      var t;
      const l = i.substr(e).match(/^[01]+/);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function Er(i, e) {
      const t = i.substr(e, 2);
      if (e += t.length, t.toLowerCase() !== "0b")
        return "";
      const l = ki(i, e);
      return l === "" ? "" : t + l;
    }
    function xs(i, e) {
      var t;
      const l = i.substr(e).match(/^[0-7]+/);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function Qe(i, e) {
      const t = i.substr(e, 2);
      if (e += t.length, t.toLowerCase() !== "0o")
        return "";
      const l = xs(i, e);
      return l === "" ? "" : t + l;
    }
    function Cr(i, e) {
      var t;
      const l = i.substr(e).match(/^[0-9a-f]+/i);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function Pr(i, e) {
      const t = i.substr(e, 2);
      if (e += t.length, t.toLowerCase() !== "0x")
        return "";
      const l = Cr(i, e);
      return l === "" ? "" : t + l;
    }
    const Mi = Ti([
      Er,
      Qe,
      Pr
    ]), Tr = Ti([
      Mi,
      ys
    ]);
    function Ct(i, e) {
      const t = Tr(i, e);
      return e += t.length, t === "" ? null : {
        evaluable: new fr(t),
        cursor: e
      };
    }
    function Si(i, e) {
      const t = i.substr(e, 1);
      if (e += t.length, t !== "(")
        return null;
      const l = Jn(i, e);
      if (!l)
        return null;
      e = l.cursor, e += Rt(i, e).length;
      const b = i.substr(e, 1);
      return e += b.length, b !== ")" ? null : {
        evaluable: l.evaluable,
        cursor: e
      };
    }
    function kr(i, e) {
      var t;
      return (t = Ct(i, e)) !== null && t !== void 0 ? t : Si(i, e);
    }
    function Li(i, e) {
      const t = kr(i, e);
      if (t)
        return t;
      const l = i.substr(e, 1);
      if (e += l.length, l !== "+" && l !== "-" && l !== "~")
        return null;
      const b = Li(i, e);
      return b ? (e = b.cursor, {
        cursor: e,
        evaluable: new gr(l, b.evaluable)
      }) : null;
    }
    function Mr(i, e, t) {
      t += Rt(e, t).length;
      const l = i.filter((b) => e.startsWith(b, t))[0];
      return l ? (t += l.length, t += Rt(e, t).length, {
        cursor: t,
        operator: l
      }) : null;
    }
    function It(i, e) {
      return (t, l) => {
        const b = i(t, l);
        if (!b)
          return null;
        l = b.cursor;
        let E = b.evaluable;
        for (; ; ) {
          const k = Mr(e, t, l);
          if (!k)
            break;
          l = k.cursor;
          const B = i(t, l);
          if (!B)
            return null;
          l = B.cursor, E = new br(k.operator, E, B.evaluable);
        }
        return E ? {
          cursor: l,
          evaluable: E
        } : null;
      };
    }
    const Es = [
      ["**"],
      ["*", "/", "%"],
      ["+", "-"],
      ["<<", ">>>", ">>"],
      ["&"],
      ["^"],
      ["|"]
    ].reduce((i, e) => It(i, e), Li);
    function Jn(i, e) {
      return e += Rt(i, e).length, Es(i, e);
    }
    function Cs(i) {
      const e = Jn(i, 0);
      return !e || e.cursor + Rt(i, e.cursor).length !== i.length ? null : e.evaluable;
    }
    function lt(i) {
      var e;
      const t = Cs(i);
      return (e = t == null ? void 0 : t.evaluate()) !== null && e !== void 0 ? e : null;
    }
    function bt(i) {
      if (typeof i == "number")
        return i;
      if (typeof i == "string") {
        const e = lt(i);
        if (!_(e))
          return e;
      }
      return 0;
    }
    function Sr(i) {
      return String(i);
    }
    function Ie(i) {
      return (e) => e.toFixed(Math.max(Math.min(i, 20), 0));
    }
    const Ps = Ie(0);
    function yn(i) {
      return Ps(i) + "%";
    }
    function Ai(i) {
      return String(i);
    }
    function Pt(i) {
      return i;
    }
    function Zt({ primary: i, secondary: e, forward: t, backward: l }) {
      let b = false;
      function E(k) {
        b || (b = true, k(), b = false);
      }
      i.emitter.on("change", (k) => {
        E(() => {
          e.setRawValue(t(i, e), k.options);
        });
      }), e.emitter.on("change", (k) => {
        E(() => {
          i.setRawValue(l(i, e), k.options);
        }), E(() => {
          e.setRawValue(t(i, e), k.options);
        });
      }), E(() => {
        e.setRawValue(t(i, e), {
          forceEmit: false,
          last: true
        });
      });
    }
    function Oe(i, e) {
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
    function ct(i) {
      return {
        altKey: i.altKey,
        downKey: i.key === "ArrowLeft",
        shiftKey: i.shiftKey,
        upKey: i.key === "ArrowRight"
      };
    }
    function Ts(i) {
      return i === "ArrowUp" || i === "ArrowDown";
    }
    function ei(i) {
      return Ts(i) || i === "ArrowLeft" || i === "ArrowRight";
    }
    function Ri(i, e) {
      var t, l;
      const b = e.ownerDocument.defaultView, E = e.getBoundingClientRect();
      return {
        x: i.pageX - (((t = b && b.scrollX) !== null && t !== void 0 ? t : 0) + E.left),
        y: i.pageY - (((l = b && b.scrollY) !== null && l !== void 0 ? l : 0) + E.top)
      };
    }
    class Vt {
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
          data: this.computePosition_(Ri(e, this.elem_)),
          sender: this,
          shiftKey: e.shiftKey
        });
      }
      onDocumentMouseMove_(e) {
        this.emitter.emit("move", {
          altKey: e.altKey,
          data: this.computePosition_(Ri(e, this.elem_)),
          sender: this,
          shiftKey: e.shiftKey
        });
      }
      onDocumentMouseUp_(e) {
        const t = this.elem_.ownerDocument;
        t.removeEventListener("mousemove", this.onDocumentMouseMove_), t.removeEventListener("mouseup", this.onDocumentMouseUp_), this.emitter.emit("up", {
          altKey: e.altKey,
          data: this.computePosition_(Ri(e, this.elem_)),
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
    function _e(i, e, t, l, b) {
      const E = (i - e) / (t - e);
      return l + E * (b - l);
    }
    function Ii(i) {
      return String(i.toFixed(10)).split(".")[1].replace(/0+$/, "").length;
    }
    function Se(i, e, t) {
      return Math.min(Math.max(i, e), t);
    }
    function Wt(i, e) {
      return (i % e + e) % e;
    }
    const He = D2("txt");
    class Vi {
      constructor(e, t) {
        this.onChange_ = this.onChange_.bind(this), this.props_ = t.props, this.props_.emitter.on("change", this.onChange_), this.element = e.createElement("div"), this.element.classList.add(He(), He(void 0, "num")), t.arrayPosition && this.element.classList.add(He(void 0, t.arrayPosition)), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("input");
        l.classList.add(He("i")), l.type = "text", t.viewProps.bindDisabled(l), this.element.appendChild(l), this.inputElement = l, this.onDraggingChange_ = this.onDraggingChange_.bind(this), this.dragging_ = t.dragging, this.dragging_.emitter.on("change", this.onDraggingChange_), this.element.classList.add(He()), this.inputElement.classList.add(He("i"));
        const b = e.createElement("div");
        b.classList.add(He("k")), this.element.appendChild(b), this.knobElement = b;
        const E = e.createElementNS(ze, "svg");
        E.classList.add(He("g")), this.knobElement.appendChild(E);
        const k = e.createElementNS(ze, "path");
        k.classList.add(He("gb")), E.appendChild(k), this.guideBodyElem_ = k;
        const B = e.createElementNS(ze, "path");
        B.classList.add(He("gh")), E.appendChild(B), this.guideHeadElem_ = B;
        const Q = e.createElement("div");
        Q.classList.add(D2("tt")()), this.knobElement.appendChild(Q), this.tooltipElem_ = Q, t.value.emitter.on("change", this.onChange_), this.value = t.value, this.refresh();
      }
      onDraggingChange_(e) {
        if (e.rawValue === null) {
          this.element.classList.remove(He(void 0, "drg"));
          return;
        }
        this.element.classList.add(He(void 0, "drg"));
        const t = e.rawValue / this.props_.get("draggingScale"), l = t + (t > 0 ? -1 : t < 0 ? 1 : 0), b = Se(-l, -4, 4);
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
        this.originRawValue_ = 0, this.onInputChange_ = this.onInputChange_.bind(this), this.onInputKeyDown_ = this.onInputKeyDown_.bind(this), this.onInputKeyUp_ = this.onInputKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.baseStep_ = t.baseStep, this.parser_ = t.parser, this.props = t.props, this.sliderProps_ = (l = t.sliderProps) !== null && l !== void 0 ? l : null, this.value = t.value, this.viewProps = t.viewProps, this.dragging_ = ee(null), this.view = new Vi(e, {
          arrayPosition: t.arrayPosition,
          dragging: this.dragging_,
          props: this.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_), this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_), this.view.inputElement.addEventListener("keyup", this.onInputKeyUp_);
        const b = new Vt(this.view.knobElement);
        b.emitter.on("down", this.onPointerDown_), b.emitter.on("move", this.onPointerMove_), b.emitter.on("up", this.onPointerUp_);
      }
      constrainValue_(e) {
        var t, l;
        const b = (t = this.sliderProps_) === null || t === void 0 ? void 0 : t.get("minValue"), E = (l = this.sliderProps_) === null || l === void 0 ? void 0 : l.get("maxValue");
        let k = e;
        return b !== void 0 && (k = Math.max(k, b)), E !== void 0 && (k = Math.min(k, E)), k;
      }
      onInputChange_(e) {
        const l = e.currentTarget.value, b = this.parser_(l);
        _(b) || (this.value.rawValue = this.constrainValue_(b)), this.view.refresh();
      }
      onInputKeyDown_(e) {
        const t = Oe(this.baseStep_, xn(e));
        t !== 0 && this.value.setRawValue(this.constrainValue_(this.value.rawValue + t), {
          forceEmit: false,
          last: false
        });
      }
      onInputKeyUp_(e) {
        Oe(this.baseStep_, xn(e)) !== 0 && this.value.setRawValue(this.value.rawValue, {
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
    const Di = D2("sld");
    class Ke {
      constructor(e, t) {
        this.onChange_ = this.onChange_.bind(this), this.props_ = t.props, this.props_.emitter.on("change", this.onChange_), this.element = e.createElement("div"), this.element.classList.add(Di()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(Di("t")), t.viewProps.bindTabIndex(l), this.element.appendChild(l), this.trackElement = l;
        const b = e.createElement("div");
        b.classList.add(Di("k")), this.trackElement.appendChild(b), this.knobElement = b, t.value.emitter.on("change", this.onChange_), this.value = t.value, this.update_();
      }
      update_() {
        const e = Se(_e(this.value.rawValue, this.props_.get("minValue"), this.props_.get("maxValue"), 0, 100), 0, 100);
        this.knobElement.style.width = `${e}%`;
      }
      onChange_() {
        this.update_();
      }
    }
    class Oi {
      constructor(e, t) {
        this.onKeyDown_ = this.onKeyDown_.bind(this), this.onKeyUp_ = this.onKeyUp_.bind(this), this.onPointerDownOrMove_ = this.onPointerDownOrMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.baseStep_ = t.baseStep, this.value = t.value, this.viewProps = t.viewProps, this.props = t.props, this.view = new Ke(e, {
          props: this.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.ptHandler_ = new Vt(this.view.trackElement), this.ptHandler_.emitter.on("down", this.onPointerDownOrMove_), this.ptHandler_.emitter.on("move", this.onPointerDownOrMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.trackElement.addEventListener("keydown", this.onKeyDown_), this.view.trackElement.addEventListener("keyup", this.onKeyUp_);
      }
      handlePointerEvent_(e, t) {
        e.point && this.value.setRawValue(_e(Se(e.point.x, 0, e.bounds.width), 0, e.bounds.width, this.props.get("minValue"), this.props.get("maxValue")), t);
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
        const t = Oe(this.baseStep_, ct(e));
        t !== 0 && this.value.setRawValue(this.value.rawValue + t, {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(e) {
        Oe(this.baseStep_, ct(e)) !== 0 && this.value.setRawValue(this.value.rawValue, {
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
    class ti {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.sliderC_ = new Oi(e, {
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
    function nt(i, e) {
      i.write(e);
    }
    function Pn(i) {
      const e = M;
      if (Array.isArray(i))
        return e.required.array(e.required.object({
          text: e.required.string,
          value: e.required.raw
        }))(i).value;
      if (typeof i == "object")
        return e.required.raw(i).value;
    }
    function Fi(i) {
      if (i === "inline" || i === "popup")
        return i;
    }
    function gt(i) {
      const e = M;
      return e.required.object({
        max: e.optional.number,
        min: e.optional.number,
        step: e.optional.number
      })(i).value;
    }
    function ks(i) {
      if (Array.isArray(i))
        return i;
      const e = [];
      return Object.keys(i).forEach((t) => {
        e.push({ text: t, value: i[t] });
      }), e;
    }
    function Bi(i) {
      return _(i) ? null : new gn(ks(i));
    }
    function Lr(i) {
      const e = i ? tt(i, Zn) : null;
      return e ? e.step : null;
    }
    function ni(i, e) {
      const t = i && tt(i, Zn);
      return t ? Ii(t.step) : Math.max(Ii(e), 2);
    }
    function Dt(i) {
      const e = Lr(i);
      return e ?? 1;
    }
    function Ot(i, e) {
      var t;
      const l = i && tt(i, Zn), b = Math.abs((t = l == null ? void 0 : l.step) !== null && t !== void 0 ? t : e);
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
    class Ms {
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
    function Ss(i) {
      const e = [], t = Bi(i.options);
      return t && e.push(t), new bn(e);
    }
    const ii = {
      id: "input-bool",
      type: "input",
      accept: (i, e) => {
        if (typeof i != "boolean")
          return null;
        const l = le(e, {
          options: M.optional.custom(Pn)
        });
        return l ? {
          initialValue: i,
          params: l
        } : null;
      },
      binding: {
        reader: (i) => vs,
        constraint: (i) => Ss(i.params),
        writer: (i) => nt
      },
      controller: (i) => {
        const e = i.document, t = i.value, l = i.constraint, b = l && tt(l, gn);
        return b ? new _n(e, {
          props: new X({
            options: b.values.value("options")
          }),
          value: t,
          viewProps: i.viewProps
        }) : new Ms(e, {
          value: t,
          viewProps: i.viewProps
        });
      }
    }, Nt = D2("col");
    class ji {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(Nt()), t.foldable.bindExpandedClass(this.element, Nt(void 0, "expanded")), O(t.foldable, "completed", K(this.element, Nt(void 0, "cpl")));
        const l = e.createElement("div");
        l.classList.add(Nt("h")), this.element.appendChild(l);
        const b = e.createElement("div");
        b.classList.add(Nt("s")), l.appendChild(b), this.swatchElement = b;
        const E = e.createElement("div");
        if (E.classList.add(Nt("t")), l.appendChild(E), this.textElement = E, t.pickerLayout === "inline") {
          const k = e.createElement("div");
          k.classList.add(Nt("p")), this.element.appendChild(k), this.pickerElement = k;
        } else
          this.pickerElement = null;
      }
    }
    function Ar(i, e, t) {
      const l = Se(i / 255, 0, 1), b = Se(e / 255, 0, 1), E = Se(t / 255, 0, 1), k = Math.max(l, b, E), B = Math.min(l, b, E), Q = k - B;
      let J = 0, de = 0;
      const ve = (B + k) / 2;
      return Q !== 0 && (de = Q / (1 - Math.abs(k + B - 1)), l === k ? J = (b - E) / Q : b === k ? J = 2 + (E - l) / Q : J = 4 + (l - b) / Q, J = J / 6 + (J < 0 ? 1 : 0)), [J * 360, de * 100, ve * 100];
    }
    function Rr(i, e, t) {
      const l = (i % 360 + 360) % 360, b = Se(e / 100, 0, 1), E = Se(t / 100, 0, 1), k = (1 - Math.abs(2 * E - 1)) * b, B = k * (1 - Math.abs(l / 60 % 2 - 1)), Q = E - k / 2;
      let J, de, ve;
      return l >= 0 && l < 60 ? [J, de, ve] = [k, B, 0] : l >= 60 && l < 120 ? [J, de, ve] = [B, k, 0] : l >= 120 && l < 180 ? [J, de, ve] = [0, k, B] : l >= 180 && l < 240 ? [J, de, ve] = [0, B, k] : l >= 240 && l < 300 ? [J, de, ve] = [B, 0, k] : [J, de, ve] = [k, 0, B], [(J + Q) * 255, (de + Q) * 255, (ve + Q) * 255];
    }
    function Ir(i, e, t) {
      const l = Se(i / 255, 0, 1), b = Se(e / 255, 0, 1), E = Se(t / 255, 0, 1), k = Math.max(l, b, E), B = Math.min(l, b, E), Q = k - B;
      let J;
      Q === 0 ? J = 0 : k === l ? J = 60 * (((b - E) / Q % 6 + 6) % 6) : k === b ? J = 60 * ((E - l) / Q + 2) : J = 60 * ((l - b) / Q + 4);
      const de = k === 0 ? 0 : Q / k, ve = k;
      return [J, de * 100, ve * 100];
    }
    function Ls(i, e, t) {
      const l = Wt(i, 360), b = Se(e / 100, 0, 1), E = Se(t / 100, 0, 1), k = E * b, B = k * (1 - Math.abs(l / 60 % 2 - 1)), Q = E - k;
      let J, de, ve;
      return l >= 0 && l < 60 ? [J, de, ve] = [k, B, 0] : l >= 60 && l < 120 ? [J, de, ve] = [B, k, 0] : l >= 120 && l < 180 ? [J, de, ve] = [0, k, B] : l >= 180 && l < 240 ? [J, de, ve] = [0, B, k] : l >= 240 && l < 300 ? [J, de, ve] = [B, 0, k] : [J, de, ve] = [k, 0, B], [(J + Q) * 255, (de + Q) * 255, (ve + Q) * 255];
    }
    function m(i, e, t) {
      const l = t + e * (100 - Math.abs(2 * t - 100)) / 200;
      return [
        i,
        l !== 0 ? e * (100 - Math.abs(2 * t - 100)) / l : 0,
        t + e * (100 - Math.abs(2 * t - 100)) / (2 * 100)
      ];
    }
    function o(i, e, t) {
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
        rgb: Rr
      },
      hsv: {
        hsl: o,
        hsv: (i, e, t) => [i, e, t],
        rgb: Ls
      },
      rgb: {
        hsl: Ar,
        hsv: Ir,
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
    function A(i, e) {
      return i === e ? e : Wt(i, e);
    }
    function z(i, e, t) {
      var l;
      const b = T(e, t);
      return [
        e === "rgb" ? Se(i[0], 0, b[0]) : A(i[0], b[0]),
        Se(i[1], 0, b[1]),
        Se(i[2], 0, b[2]),
        Se((l = i[3]) !== null && l !== void 0 ? l : 1, 0, 1)
      ];
    }
    function oe(i, e, t, l) {
      const b = T(e, t), E = T(e, l);
      return i.map((k, B) => k / b[B] * E[B]);
    }
    function Ze(i, e, t) {
      const l = oe(i, e.mode, e.type, "int"), b = x[e.mode][t.mode](...l);
      return oe(b, t.mode, "int", t.type);
    }
    function We(i, e) {
      return typeof i != "object" || _(i) ? false : e in i && typeof i[e] == "number";
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
        return We(e, "r") && We(e, "g") && We(e, "b");
      }
      static isRgbaColorObject(e) {
        return this.isRgbColorObject(e) && We(e, "a");
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
        this.mode = t, this.type = l, this.comps_ = z(e, t, l);
      }
      getComponents(e, t = "int") {
        return f(Ze(u(this.comps_), { mode: this.mode, type: this.type }, { mode: e ?? this.mode, type: t }), this.comps_[3]);
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
    const Tt = D2("colp");
    class Vr {
      constructor(e, t) {
        this.alphaViews_ = null, this.element = e.createElement("div"), this.element.classList.add(Tt()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(Tt("hsv"));
        const b = e.createElement("div");
        b.classList.add(Tt("sv")), this.svPaletteView_ = t.svPaletteView, b.appendChild(this.svPaletteView_.element), l.appendChild(b);
        const E = e.createElement("div");
        E.classList.add(Tt("h")), this.hPaletteView_ = t.hPaletteView, E.appendChild(this.hPaletteView_.element), l.appendChild(E), this.element.appendChild(l);
        const k = e.createElement("div");
        if (k.classList.add(Tt("rgb")), this.textView_ = t.textView, k.appendChild(this.textView_.element), this.element.appendChild(k), t.alphaViews) {
          this.alphaViews_ = {
            palette: t.alphaViews.palette,
            text: t.alphaViews.text
          };
          const B = e.createElement("div");
          B.classList.add(Tt("a"));
          const Q = e.createElement("div");
          Q.classList.add(Tt("ap")), Q.appendChild(this.alphaViews_.palette.element), B.appendChild(Q);
          const J = e.createElement("div");
          J.classList.add(Tt("at")), J.appendChild(this.alphaViews_.text.element), B.appendChild(J), this.element.appendChild(B);
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
    function ll(i) {
      return i === "int" ? "int" : i === "float" ? "float" : void 0;
    }
    function Dr(i) {
      const e = M;
      return le(i, {
        alpha: e.optional.boolean,
        color: e.optional.object({
          alpha: e.optional.boolean,
          type: e.optional.custom(ll)
        }),
        expanded: e.optional.boolean,
        picker: e.optional.custom(Fi)
      });
    }
    function Mn(i) {
      return i ? 0.1 : 1;
    }
    function Sn(i) {
      var e;
      return (e = i.color) === null || e === void 0 ? void 0 : e.type;
    }
    function cl(i, e) {
      return i.alpha === e.alpha && i.mode === e.mode && i.notation === e.notation && i.type === e.type;
    }
    function ut(i, e) {
      const t = i.match(/^(.+)%$/);
      return Math.min(t ? parseFloat(t[1]) * 0.01 * e : parseFloat(i), e);
    }
    const ul = {
      deg: (i) => i,
      grad: (i) => i * 360 / 400,
      rad: (i) => i * 360 / (2 * Math.PI),
      turn: (i) => i * 360
    };
    function Co(i) {
      const e = i.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);
      if (!e)
        return parseFloat(i);
      const t = parseFloat(e[1]), l = e[2];
      return ul[l](t);
    }
    function Po(i) {
      const e = i.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
      if (!e)
        return null;
      const t = [
        ut(e[1], 255),
        ut(e[2], 255),
        ut(e[3], 255)
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) ? null : t;
    }
    function To(i) {
      return (e) => {
        const t = Po(e);
        return t ? new te(t, "rgb", i) : null;
      };
    }
    function ko(i) {
      const e = i.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
      if (!e)
        return null;
      const t = [
        ut(e[1], 255),
        ut(e[2], 255),
        ut(e[3], 255),
        ut(e[4], 1)
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) || isNaN(t[3]) ? null : t;
    }
    function Mo(i) {
      return (e) => {
        const t = ko(e);
        return t ? new te(t, "rgb", i) : null;
      };
    }
    function So(i) {
      const e = i.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
      if (!e)
        return null;
      const t = [
        Co(e[1]),
        ut(e[2], 100),
        ut(e[3], 100)
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) ? null : t;
    }
    function Lo(i) {
      return (e) => {
        const t = So(e);
        return t ? new te(t, "hsl", i) : null;
      };
    }
    function Ao(i) {
      const e = i.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
      if (!e)
        return null;
      const t = [
        Co(e[1]),
        ut(e[2], 100),
        ut(e[3], 100),
        ut(e[4], 1)
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) || isNaN(t[3]) ? null : t;
    }
    function Ro(i) {
      return (e) => {
        const t = Ao(e);
        return t ? new te(t, "hsl", i) : null;
      };
    }
    function Io(i) {
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
    function pl(i) {
      const e = Io(i);
      return e ? new te(e, "rgb", "int") : null;
    }
    function Vo(i) {
      const e = i.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
      if (e)
        return [
          parseInt(e[1] + e[1], 16),
          parseInt(e[2] + e[2], 16),
          parseInt(e[3] + e[3], 16),
          _e(parseInt(e[4] + e[4], 16), 0, 255, 0, 1)
        ];
      const t = i.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
      return t ? [
        parseInt(t[1], 16),
        parseInt(t[2], 16),
        parseInt(t[3], 16),
        _e(parseInt(t[4], 16), 0, 255, 0, 1)
      ] : null;
    }
    function hl(i) {
      const e = Vo(i);
      return e ? new te(e, "rgb", "int") : null;
    }
    function Do(i) {
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
    function Oo(i) {
      return (e) => {
        const t = Do(e);
        return t ? new te(t, "rgb", i) : null;
      };
    }
    function No(i) {
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
    function Fo(i) {
      return (e) => {
        const t = No(e);
        return t ? new te(t, "rgb", i) : null;
      };
    }
    const dl = [
      {
        parser: Io,
        result: {
          alpha: false,
          mode: "rgb",
          notation: "hex"
        }
      },
      {
        parser: Vo,
        result: {
          alpha: true,
          mode: "rgb",
          notation: "hex"
        }
      },
      {
        parser: Po,
        result: {
          alpha: false,
          mode: "rgb",
          notation: "func"
        }
      },
      {
        parser: ko,
        result: {
          alpha: true,
          mode: "rgb",
          notation: "func"
        }
      },
      {
        parser: So,
        result: {
          alpha: false,
          mode: "hsl",
          notation: "func"
        }
      },
      {
        parser: Ao,
        result: {
          alpha: true,
          mode: "hsl",
          notation: "func"
        }
      },
      {
        parser: Do,
        result: {
          alpha: false,
          mode: "rgb",
          notation: "object"
        }
      },
      {
        parser: No,
        result: {
          alpha: true,
          mode: "rgb",
          notation: "object"
        }
      }
    ];
    function ml(i) {
      return dl.reduce((e, { parser: t, result: l }) => e || (t(i) ? l : null), null);
    }
    function Or(i, e = "int") {
      const t = ml(i);
      return t ? t.notation === "hex" && e !== "float" ? Object.assign(Object.assign({}, t), { type: "int" }) : t.notation === "func" ? Object.assign(Object.assign({}, t), { type: e }) : null : null;
    }
    const Bo = {
      int: [
        pl,
        hl,
        To("int"),
        Mo("int"),
        Lo("int"),
        Ro("int"),
        Oo("int"),
        Fo("int")
      ],
      float: [
        To("float"),
        Mo("float"),
        Lo("float"),
        Ro("float"),
        Oo("float"),
        Fo("float")
      ]
    };
    function fl(i) {
      const e = Bo[i];
      return (t) => {
        if (typeof t != "string")
          return te.black(i);
        const l = e.reduce((b, E) => b || E(t), null);
        return l ?? te.black(i);
      };
    }
    function Nr(i) {
      const e = Bo[i];
      return (t) => e.reduce((l, b) => l || b(t), null);
    }
    function jo(i) {
      const e = Se(Math.floor(i), 0, 255).toString(16);
      return e.length === 1 ? `0${e}` : e;
    }
    function zo(i, e = "#") {
      const t = u(i.getComponents("rgb")).map(jo).join("");
      return `${e}${t}`;
    }
    function Fr(i, e = "#") {
      const t = i.getComponents("rgb"), l = [t[0], t[1], t[2], t[3] * 255].map(jo).join("");
      return `${e}${l}`;
    }
    function Uo(i, e) {
      const t = Ie(e === "float" ? 2 : 0);
      return `rgb(${u(i.getComponents("rgb", e)).map((b) => t(b)).join(", ")})`;
    }
    function vl(i) {
      return (e) => Uo(e, i);
    }
    function As(i, e) {
      const t = Ie(2), l = Ie(e === "float" ? 2 : 0);
      return `rgba(${i.getComponents("rgb", e).map((E, k) => (k === 3 ? t : l)(E)).join(", ")})`;
    }
    function bl(i) {
      return (e) => As(e, i);
    }
    function gl(i) {
      const e = [
        Ie(0),
        yn,
        yn
      ];
      return `hsl(${u(i.getComponents("hsl")).map((l, b) => e[b](l)).join(", ")})`;
    }
    function _l(i) {
      const e = [
        Ie(0),
        yn,
        yn,
        Ie(2)
      ];
      return `hsla(${i.getComponents("hsl").map((l, b) => e[b](l)).join(", ")})`;
    }
    function Go(i, e) {
      const t = Ie(e === "float" ? 2 : 0), l = ["r", "g", "b"];
      return `{${u(i.getComponents("rgb", e)).map((E, k) => `${l[k]}: ${t(E)}`).join(", ")}}`;
    }
    function wl(i) {
      return (e) => Go(e, i);
    }
    function Ho(i, e) {
      const t = Ie(2), l = Ie(e === "float" ? 2 : 0), b = ["r", "g", "b", "a"];
      return `{${i.getComponents("rgb", e).map((k, B) => {
        const Q = B === 3 ? t : l;
        return `${b[B]}: ${Q(k)}`;
      }).join(", ")}}`;
    }
    function yl(i) {
      return (e) => Ho(e, i);
    }
    const xl = [
      {
        format: {
          alpha: false,
          mode: "rgb",
          notation: "hex",
          type: "int"
        },
        stringifier: zo
      },
      {
        format: {
          alpha: true,
          mode: "rgb",
          notation: "hex",
          type: "int"
        },
        stringifier: Fr
      },
      {
        format: {
          alpha: false,
          mode: "hsl",
          notation: "func",
          type: "int"
        },
        stringifier: gl
      },
      {
        format: {
          alpha: true,
          mode: "hsl",
          notation: "func",
          type: "int"
        },
        stringifier: _l
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
          stringifier: vl(e)
        },
        {
          format: {
            alpha: true,
            mode: "rgb",
            notation: "func",
            type: e
          },
          stringifier: bl(e)
        },
        {
          format: {
            alpha: false,
            mode: "rgb",
            notation: "object",
            type: e
          },
          stringifier: wl(e)
        },
        {
          format: {
            alpha: true,
            mode: "rgb",
            notation: "object",
            type: e
          },
          stringifier: yl(e)
        }
      ], [])
    ];
    function Br(i) {
      return xl.reduce((e, t) => e || (cl(t.format, i) ? t.stringifier : null), null);
    }
    const zi = D2("apl");
    class El {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.value = t.value, this.value.emitter.on("change", this.onValueChange_), this.element = e.createElement("div"), this.element.classList.add(zi()), t.viewProps.bindClassModifiers(this.element), t.viewProps.bindTabIndex(this.element);
        const l = e.createElement("div");
        l.classList.add(zi("b")), this.element.appendChild(l);
        const b = e.createElement("div");
        b.classList.add(zi("c")), l.appendChild(b), this.colorElem_ = b;
        const E = e.createElement("div");
        E.classList.add(zi("m")), this.element.appendChild(E), this.markerElem_ = E;
        const k = e.createElement("div");
        k.classList.add(zi("p")), this.markerElem_.appendChild(k), this.previewElem_ = k, this.update_();
      }
      update_() {
        const e = this.value.rawValue, t = e.getComponents("rgb"), l = new te([t[0], t[1], t[2], 0], "rgb"), b = new te([t[0], t[1], t[2], 255], "rgb"), E = [
          "to right",
          As(l),
          As(b)
        ];
        this.colorElem_.style.background = `linear-gradient(${E.join(",")})`, this.previewElem_.style.backgroundColor = As(e);
        const k = _e(t[3], 0, 1, 0, 100);
        this.markerElem_.style.left = `${k}%`;
      }
      onValueChange_() {
        this.update_();
      }
    }
    class Cl {
      constructor(e, t) {
        this.onKeyDown_ = this.onKeyDown_.bind(this), this.onKeyUp_ = this.onKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.view = new El(e, {
          value: this.value,
          viewProps: this.viewProps
        }), this.ptHandler_ = new Vt(this.view.element), this.ptHandler_.emitter.on("down", this.onPointerDown_), this.ptHandler_.emitter.on("move", this.onPointerMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.element.addEventListener("keydown", this.onKeyDown_), this.view.element.addEventListener("keyup", this.onKeyUp_);
      }
      handlePointerEvent_(e, t) {
        if (!e.point)
          return;
        const l = e.point.x / e.bounds.width, b = this.value.rawValue, [E, k, B] = b.getComponents("hsv");
        this.value.setRawValue(new te([E, k, B, l], "hsv"), t);
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
        const t = Oe(Mn(true), ct(e));
        if (t === 0)
          return;
        const l = this.value.rawValue, [b, E, k, B] = l.getComponents("hsv");
        this.value.setRawValue(new te([b, E, k, B + t], "hsv"), {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(e) {
        Oe(Mn(true), ct(e)) !== 0 && this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    const si = D2("coltxt");
    function Pl(i) {
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
    class Tl {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(si()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(si("m")), this.modeElem_ = Pl(e), this.modeElem_.classList.add(si("ms")), l.appendChild(this.modeSelectElement), t.viewProps.bindDisabled(this.modeElem_);
        const b = e.createElement("div");
        b.classList.add(si("mm")), b.appendChild(xt(e, "dropdown")), l.appendChild(b), this.element.appendChild(l);
        const E = e.createElement("div");
        E.classList.add(si("w")), this.element.appendChild(E), this.textsElem_ = E, this.textViews_ = t.textViews, this.applyTextViews_(), N(t.colorMode, (k) => {
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
        pn(this.textsElem_);
        const e = this.element.ownerDocument;
        this.textViews_.forEach((t) => {
          const l = e.createElement("div");
          l.classList.add(si("c")), l.appendChild(t.element), this.textsElem_.appendChild(l);
        });
      }
    }
    function kl(i) {
      return Ie(i === "float" ? 2 : 0);
    }
    function Ml(i, e, t) {
      const l = T(i, e)[t];
      return new qt({
        min: 0,
        max: l
      });
    }
    function jr(i, e, t) {
      return new En(i, {
        arrayPosition: t === 0 ? "fst" : t === 3 - 1 ? "lst" : "mid",
        baseStep: Mn(false),
        parser: e.parser,
        props: X.fromObject({
          draggingScale: e.colorType === "float" ? 0.01 : 1,
          formatter: kl(e.colorType)
        }),
        value: ee(0, {
          constraint: Ml(e.colorMode, e.colorType, t)
        }),
        viewProps: e.viewProps
      });
    }
    class Sl {
      constructor(e, t) {
        this.onModeSelectChange_ = this.onModeSelectChange_.bind(this), this.colorType_ = t.colorType, this.parser_ = t.parser, this.value = t.value, this.viewProps = t.viewProps, this.colorMode = ee(this.value.rawValue.mode), this.ccs_ = this.createComponentControllers_(e), this.view = new Tl(e, {
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
          jr(e, t, 0),
          jr(e, t, 1),
          jr(e, t, 2)
        ];
        return l.forEach((b, E) => {
          Zt({
            primary: this.value,
            secondary: b.value,
            forward: (k) => k.rawValue.getComponents(this.colorMode.rawValue, this.colorType_)[E],
            backward: (k, B) => {
              const Q = this.colorMode.rawValue, J = k.rawValue.getComponents(Q, this.colorType_);
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
    const zr = D2("hpl");
    class Ll {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.value = t.value, this.value.emitter.on("change", this.onValueChange_), this.element = e.createElement("div"), this.element.classList.add(zr()), t.viewProps.bindClassModifiers(this.element), t.viewProps.bindTabIndex(this.element);
        const l = e.createElement("div");
        l.classList.add(zr("c")), this.element.appendChild(l);
        const b = e.createElement("div");
        b.classList.add(zr("m")), this.element.appendChild(b), this.markerElem_ = b, this.update_();
      }
      update_() {
        const e = this.value.rawValue, [t] = e.getComponents("hsv");
        this.markerElem_.style.backgroundColor = Uo(new te([t, 100, 100], "hsv"));
        const l = _e(t, 0, 360, 0, 100);
        this.markerElem_.style.left = `${l}%`;
      }
      onValueChange_() {
        this.update_();
      }
    }
    class Al {
      constructor(e, t) {
        this.onKeyDown_ = this.onKeyDown_.bind(this), this.onKeyUp_ = this.onKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.view = new Ll(e, {
          value: this.value,
          viewProps: this.viewProps
        }), this.ptHandler_ = new Vt(this.view.element), this.ptHandler_.emitter.on("down", this.onPointerDown_), this.ptHandler_.emitter.on("move", this.onPointerMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.element.addEventListener("keydown", this.onKeyDown_), this.view.element.addEventListener("keyup", this.onKeyUp_);
      }
      handlePointerEvent_(e, t) {
        if (!e.point)
          return;
        const l = _e(Se(e.point.x, 0, e.bounds.width), 0, e.bounds.width, 0, 360), b = this.value.rawValue, [, E, k, B] = b.getComponents("hsv");
        this.value.setRawValue(new te([l, E, k, B], "hsv"), t);
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
        const t = Oe(Mn(false), ct(e));
        if (t === 0)
          return;
        const l = this.value.rawValue, [b, E, k, B] = l.getComponents("hsv");
        this.value.setRawValue(new te([b + t, E, k, B], "hsv"), {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(e) {
        Oe(Mn(false), ct(e)) !== 0 && this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    const Ur = D2("svp"), Ko = 64;
    class Rl {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.value = t.value, this.value.emitter.on("change", this.onValueChange_), this.element = e.createElement("div"), this.element.classList.add(Ur()), t.viewProps.bindClassModifiers(this.element), t.viewProps.bindTabIndex(this.element);
        const l = e.createElement("canvas");
        l.height = Ko, l.width = Ko, l.classList.add(Ur("c")), this.element.appendChild(l), this.canvasElement = l;
        const b = e.createElement("div");
        b.classList.add(Ur("m")), this.element.appendChild(b), this.markerElem_ = b, this.update_();
      }
      update_() {
        const e = Gn(this.canvasElement);
        if (!e)
          return;
        const l = this.value.rawValue.getComponents("hsv"), b = this.canvasElement.width, E = this.canvasElement.height, k = e.getImageData(0, 0, b, E), B = k.data;
        for (let de = 0; de < E; de++)
          for (let ve = 0; ve < b; ve++) {
            const Ln = _e(ve, 0, b, 0, 100), Gi = _e(de, 0, E, 100, 0), Hi = Ls(l[0], Ln, Gi), Rs = (de * b + ve) * 4;
            B[Rs] = Hi[0], B[Rs + 1] = Hi[1], B[Rs + 2] = Hi[2], B[Rs + 3] = 255;
          }
        e.putImageData(k, 0, 0);
        const Q = _e(l[1], 0, 100, 0, 100);
        this.markerElem_.style.left = `${Q}%`;
        const J = _e(l[2], 0, 100, 100, 0);
        this.markerElem_.style.top = `${J}%`;
      }
      onValueChange_() {
        this.update_();
      }
    }
    class Il {
      constructor(e, t) {
        this.onKeyDown_ = this.onKeyDown_.bind(this), this.onKeyUp_ = this.onKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.view = new Rl(e, {
          value: this.value,
          viewProps: this.viewProps
        }), this.ptHandler_ = new Vt(this.view.element), this.ptHandler_.emitter.on("down", this.onPointerDown_), this.ptHandler_.emitter.on("move", this.onPointerMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.element.addEventListener("keydown", this.onKeyDown_), this.view.element.addEventListener("keyup", this.onKeyUp_);
      }
      handlePointerEvent_(e, t) {
        if (!e.point)
          return;
        const l = _e(e.point.x, 0, e.bounds.width, 0, 100), b = _e(e.point.y, 0, e.bounds.height, 100, 0), [E, , , k] = this.value.rawValue.getComponents("hsv");
        this.value.setRawValue(new te([E, l, b, k], "hsv"), t);
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
        ei(e.key) && e.preventDefault();
        const [t, l, b, E] = this.value.rawValue.getComponents("hsv"), k = Mn(false), B = Oe(k, ct(e)), Q = Oe(k, xn(e));
        B === 0 && Q === 0 || this.value.setRawValue(new te([t, l + B, b + Q, E], "hsv"), {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(e) {
        const t = Mn(false), l = Oe(t, ct(e)), b = Oe(t, xn(e));
        l === 0 && b === 0 || this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    class Vl {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.hPaletteC_ = new Al(e, {
          value: this.value,
          viewProps: this.viewProps
        }), this.svPaletteC_ = new Il(e, {
          value: this.value,
          viewProps: this.viewProps
        }), this.alphaIcs_ = t.supportsAlpha ? {
          palette: new Cl(e, {
            value: this.value,
            viewProps: this.viewProps
          }),
          text: new En(e, {
            parser: lt,
            baseStep: 0.1,
            props: X.fromObject({
              draggingScale: 0.01,
              formatter: Ie(2)
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
        }), this.textC_ = new Sl(e, {
          colorType: t.colorType,
          parser: lt,
          value: this.value,
          viewProps: this.viewProps
        }), this.view = new Vr(e, {
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
    const Gr = D2("colsw");
    class Dl {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), t.value.emitter.on("change", this.onValueChange_), this.value = t.value, this.element = e.createElement("div"), this.element.classList.add(Gr()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(Gr("sw")), this.element.appendChild(l), this.swatchElem_ = l;
        const b = e.createElement("button");
        b.classList.add(Gr("b")), t.viewProps.bindDisabled(b), this.element.appendChild(b), this.buttonElement = b, this.update_();
      }
      update_() {
        const e = this.value.rawValue;
        this.swatchElem_.style.backgroundColor = Fr(e);
      }
      onValueChange_() {
        this.update_();
      }
    }
    class Ol {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.view = new Dl(e, {
          value: this.value,
          viewProps: this.viewProps
        });
      }
    }
    class Hr {
      constructor(e, t) {
        this.onButtonBlur_ = this.onButtonBlur_.bind(this), this.onButtonClick_ = this.onButtonClick_.bind(this), this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this), this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.foldable_ = De.create(t.expanded), this.swatchC_ = new Ol(e, {
          value: this.value,
          viewProps: this.viewProps
        });
        const l = this.swatchC_.view.buttonElement;
        l.addEventListener("blur", this.onButtonBlur_), l.addEventListener("click", this.onButtonClick_), this.textC_ = new Wn(e, {
          parser: t.parser,
          props: X.fromObject({
            formatter: t.formatter
          }),
          value: this.value,
          viewProps: this.viewProps
        }), this.view = new ji(e, {
          foldable: this.foldable_,
          pickerLayout: t.pickerLayout
        }), this.view.swatchElement.appendChild(this.swatchC_.view.element), this.view.textElement.appendChild(this.textC_.view.element), this.popC_ = t.pickerLayout === "popup" ? new ms(e, {
          viewProps: this.viewProps
        }) : null;
        const b = new Vl(e, {
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
          backward: (E, k) => k.rawValue
        })) : this.view.pickerElement && (this.view.pickerElement.appendChild(this.pickerC_.view.element), Ue(this.foldable_, this.view.pickerElement));
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
        const t = this.popC_.view.element, l = Et2(e);
        l && t.contains(l) || l && l === this.swatchC_.view.buttonElement && !ft(t.ownerDocument) || (this.popC_.shows.rawValue = false);
      }
      onPopupChildKeydown_(e) {
        this.popC_ ? e.key === "Escape" && (this.popC_.shows.rawValue = false) : this.view.pickerElement && e.key === "Escape" && this.swatchC_.view.buttonElement.focus();
      }
    }
    function Nl(i, e) {
      return te.isColorObject(i) ? te.fromObject(i, e) : te.black(e);
    }
    function Fl(i) {
      return u(i.getComponents("rgb")).reduce((e, t) => e << 8 | Math.floor(t) & 255, 0);
    }
    function Bl(i) {
      return i.getComponents("rgb").reduce((e, t, l) => {
        const b = Math.floor(l === 3 ? t * 255 : t) & 255;
        return e << 8 | b;
      }, 0) >>> 0;
    }
    function jl(i) {
      return new te([i >> 16 & 255, i >> 8 & 255, i & 255], "rgb");
    }
    function zl(i) {
      return new te([
        i >> 24 & 255,
        i >> 16 & 255,
        i >> 8 & 255,
        _e(i & 255, 0, 255, 0, 1)
      ], "rgb");
    }
    function Ul(i) {
      return typeof i != "number" ? te.black() : jl(i);
    }
    function Gl(i) {
      return typeof i != "number" ? te.black() : zl(i);
    }
    function Hl(i) {
      const e = Br(i);
      return e ? (t, l) => {
        nt(t, e(l));
      } : null;
    }
    function Kl(i) {
      const e = i ? Bl : Fl;
      return (t, l) => {
        nt(t, e(l));
      };
    }
    function $l(i, e, t) {
      const l = e.toRgbaObject(t);
      i.writeProperty("r", l.r), i.writeProperty("g", l.g), i.writeProperty("b", l.b), i.writeProperty("a", l.a);
    }
    function Xl(i, e, t) {
      const l = e.toRgbaObject(t);
      i.writeProperty("r", l.r), i.writeProperty("g", l.g), i.writeProperty("b", l.b);
    }
    function Yl(i, e) {
      return (t, l) => {
        i ? $l(t, l, e) : Xl(t, l, e);
      };
    }
    function Kr(i) {
      var e;
      return !!(i != null && i.alpha || !((e = i == null ? void 0 : i.color) === null || e === void 0) && e.alpha);
    }
    function ql(i) {
      return i ? (e) => Fr(e, "0x") : (e) => zo(e, "0x");
    }
    function Ql(i) {
      return "color" in i || "view" in i && i.view === "color";
    }
    const Zl = {
      id: "input-color-number",
      type: "input",
      accept: (i, e) => {
        if (typeof i != "number" || !Ql(e))
          return null;
        const t = Dr(e);
        return t ? {
          initialValue: i,
          params: t
        } : null;
      },
      binding: {
        reader: (i) => Kr(i.params) ? Gl : Ul,
        equals: te.equals,
        writer: (i) => Kl(Kr(i.params))
      },
      controller: (i) => {
        const e = Kr(i.params), t = "expanded" in i.params ? i.params.expanded : void 0, l = "picker" in i.params ? i.params.picker : void 0;
        return new Hr(i.document, {
          colorType: "int",
          expanded: t ?? false,
          formatter: ql(e),
          parser: Nr("int"),
          pickerLayout: l ?? "popup",
          supportsAlpha: e,
          value: i.value,
          viewProps: i.viewProps
        });
      }
    };
    function Wl(i) {
      return te.isRgbaColorObject(i);
    }
    function Jl(i) {
      return (e) => Nl(e, i);
    }
    function ec(i, e) {
      return (t) => i ? Ho(t, e) : Go(t, e);
    }
    const tc = {
      id: "input-color-object",
      type: "input",
      accept: (i, e) => {
        if (!te.isColorObject(i))
          return null;
        const t = Dr(e);
        return t ? {
          initialValue: i,
          params: t
        } : null;
      },
      binding: {
        reader: (i) => Jl(Sn(i.params)),
        equals: te.equals,
        writer: (i) => Yl(Wl(i.initialValue), Sn(i.params))
      },
      controller: (i) => {
        var e;
        const t = te.isRgbaColorObject(i.initialValue), l = "expanded" in i.params ? i.params.expanded : void 0, b = "picker" in i.params ? i.params.picker : void 0, E = (e = Sn(i.params)) !== null && e !== void 0 ? e : "int";
        return new Hr(i.document, {
          colorType: E,
          expanded: l ?? false,
          formatter: ec(t, E),
          parser: Nr(E),
          pickerLayout: b ?? "popup",
          supportsAlpha: t,
          value: i.value,
          viewProps: i.viewProps
        });
      }
    }, nc = {
      id: "input-color-string",
      type: "input",
      accept: (i, e) => {
        if (typeof i != "string" || "view" in e && e.view === "text")
          return null;
        const t = Or(i, Sn(e));
        if (!t || !Br(t))
          return null;
        const b = Dr(e);
        return b ? {
          initialValue: i,
          params: b
        } : null;
      },
      binding: {
        reader: (i) => {
          var e;
          return fl((e = Sn(i.params)) !== null && e !== void 0 ? e : "int");
        },
        equals: te.equals,
        writer: (i) => {
          const e = Or(i.initialValue, Sn(i.params));
          if (!e)
            throw S.shouldNeverHappen();
          const t = Hl(e);
          if (!t)
            throw S.notBindable();
          return t;
        }
      },
      controller: (i) => {
        const e = Or(i.initialValue, Sn(i.params));
        if (!e)
          throw S.shouldNeverHappen();
        const t = Br(e);
        if (!t)
          throw S.shouldNeverHappen();
        const l = "expanded" in i.params ? i.params.expanded : void 0, b = "picker" in i.params ? i.params.picker : void 0;
        return new Hr(i.document, {
          colorType: e.type,
          expanded: l ?? false,
          formatter: t,
          parser: Nr(e.type),
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
          var E, k;
          return (k = (E = this.components[b]) === null || E === void 0 ? void 0 : E.constrain(l)) !== null && k !== void 0 ? k : l;
        });
        return this.asm_.fromComponents(t);
      }
    }
    const $o = D2("pndtxt");
    class ic {
      constructor(e, t) {
        this.textViews = t.textViews, this.element = e.createElement("div"), this.element.classList.add($o()), this.textViews.forEach((l) => {
          const b = e.createElement("div");
          b.classList.add($o("a")), b.appendChild(l.element), this.element.appendChild(b);
        });
      }
    }
    function sc(i, e, t) {
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
    class $r {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.acs_ = t.axes.map((l, b) => sc(e, t, b)), this.acs_.forEach((l, b) => {
          Zt({
            primary: this.value,
            secondary: l.value,
            forward: (E) => t.assembly.toComponents(E.rawValue)[b],
            backward: (E, k) => {
              const B = t.assembly.toComponents(E.rawValue);
              return B[b] = k.rawValue, t.assembly.fromComponents(B);
            }
          });
        }), this.view = new ic(e, {
          textViews: this.acs_.map((l) => l.view)
        });
      }
    }
    function Xo(i, e) {
      return "step" in i && !_(i.step) ? new Zn(i.step, e) : null;
    }
    function Yo(i) {
      return !_(i.max) && !_(i.min) ? new qt({
        max: i.max,
        min: i.min
      }) : !_(i.max) || !_(i.min) ? new Pi({
        max: i.max,
        min: i.min
      }) : null;
    }
    function rc(i) {
      const e = tt(i, qt);
      if (e)
        return [e.values.get("min"), e.values.get("max")];
      const t = tt(i, Pi);
      return t ? [t.minValue, t.maxValue] : [void 0, void 0];
    }
    function oc(i, e) {
      const t = [], l = Xo(i, e);
      l && t.push(l);
      const b = Yo(i);
      b && t.push(b);
      const E = Bi(i.options);
      return E && t.push(E), new bn(t);
    }
    const ac = {
      id: "input-number",
      type: "input",
      accept: (i, e) => {
        if (typeof i != "number")
          return null;
        const t = M, l = le(e, {
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
        reader: (i) => bt,
        constraint: (i) => oc(i.params, i.initialValue),
        writer: (i) => nt
      },
      controller: (i) => {
        var e;
        const t = i.value, l = i.constraint, b = l && tt(l, gn);
        if (b)
          return new _n(i.document, {
            props: new X({
              options: b.values.value("options")
            }),
            value: t,
            viewProps: i.viewProps
          });
        const E = (e = "format" in i.params ? i.params.format : void 0) !== null && e !== void 0 ? e : Ie(ni(l, t.rawValue)), k = l && tt(l, qt);
        return k ? new ti(i.document, {
          baseStep: Dt(l),
          parser: lt,
          sliderProps: new X({
            maxValue: k.values.value("max"),
            minValue: k.values.value("min")
          }),
          textProps: X.fromObject({
            draggingScale: Ot(l, t.rawValue),
            formatter: E
          }),
          value: t,
          viewProps: i.viewProps
        }) : new En(i.document, {
          baseStep: Dt(l),
          parser: lt,
          props: X.fromObject({
            draggingScale: Ot(l, t.rawValue),
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
    const qo = {
      toComponents: (i) => i.getComponents(),
      fromComponents: (i) => new en(...i)
    }, ri = D2("p2d");
    class lc {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(ri()), t.viewProps.bindClassModifiers(this.element), N(t.expanded, K(this.element, ri(void 0, "expanded")));
        const l = e.createElement("div");
        l.classList.add(ri("h")), this.element.appendChild(l);
        const b = e.createElement("button");
        b.classList.add(ri("b")), b.appendChild(xt(e, "p2dpad")), t.viewProps.bindDisabled(b), l.appendChild(b), this.buttonElement = b;
        const E = e.createElement("div");
        if (E.classList.add(ri("t")), l.appendChild(E), this.textElement = E, t.pickerLayout === "inline") {
          const k = e.createElement("div");
          k.classList.add(ri("p")), this.element.appendChild(k), this.pickerElement = k;
        } else
          this.pickerElement = null;
      }
    }
    const tn = D2("p2dp");
    class cc {
      constructor(e, t) {
        this.onFoldableChange_ = this.onFoldableChange_.bind(this), this.onValueChange_ = this.onValueChange_.bind(this), this.invertsY_ = t.invertsY, this.maxValue_ = t.maxValue, this.element = e.createElement("div"), this.element.classList.add(tn()), t.layout === "popup" && this.element.classList.add(tn(void 0, "p")), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(tn("p")), t.viewProps.bindTabIndex(l), this.element.appendChild(l), this.padElement = l;
        const b = e.createElementNS(ze, "svg");
        b.classList.add(tn("g")), this.padElement.appendChild(b), this.svgElem_ = b;
        const E = e.createElementNS(ze, "line");
        E.classList.add(tn("ax")), E.setAttributeNS(null, "x1", "0"), E.setAttributeNS(null, "y1", "50%"), E.setAttributeNS(null, "x2", "100%"), E.setAttributeNS(null, "y2", "50%"), this.svgElem_.appendChild(E);
        const k = e.createElementNS(ze, "line");
        k.classList.add(tn("ax")), k.setAttributeNS(null, "x1", "50%"), k.setAttributeNS(null, "y1", "0"), k.setAttributeNS(null, "x2", "50%"), k.setAttributeNS(null, "y2", "100%"), this.svgElem_.appendChild(k);
        const B = e.createElementNS(ze, "line");
        B.classList.add(tn("l")), B.setAttributeNS(null, "x1", "50%"), B.setAttributeNS(null, "y1", "50%"), this.svgElem_.appendChild(B), this.lineElem_ = B;
        const Q = e.createElement("div");
        Q.classList.add(tn("m")), this.padElement.appendChild(Q), this.markerElem_ = Q, t.value.emitter.on("change", this.onValueChange_), this.value = t.value, this.update_();
      }
      get allFocusableElements() {
        return [this.padElement];
      }
      update_() {
        const [e, t] = this.value.rawValue.getComponents(), l = this.maxValue_, b = _e(e, -l, +l, 0, 100), E = _e(t, -l, +l, 0, 100), k = this.invertsY_ ? 100 - E : E;
        this.lineElem_.setAttributeNS(null, "x2", `${b}%`), this.lineElem_.setAttributeNS(null, "y2", `${k}%`), this.markerElem_.style.left = `${b}%`, this.markerElem_.style.top = `${k}%`;
      }
      onValueChange_() {
        this.update_();
      }
      onFoldableChange_() {
        this.update_();
      }
    }
    function Qo(i, e, t) {
      return [
        Oe(e[0], ct(i)),
        Oe(e[1], xn(i)) * (t ? 1 : -1)
      ];
    }
    class uc {
      constructor(e, t) {
        this.onPadKeyDown_ = this.onPadKeyDown_.bind(this), this.onPadKeyUp_ = this.onPadKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.baseSteps_ = t.baseSteps, this.maxValue_ = t.maxValue, this.invertsY_ = t.invertsY, this.view = new cc(e, {
          invertsY: this.invertsY_,
          layout: t.layout,
          maxValue: this.maxValue_,
          value: this.value,
          viewProps: this.viewProps
        }), this.ptHandler_ = new Vt(this.view.padElement), this.ptHandler_.emitter.on("down", this.onPointerDown_), this.ptHandler_.emitter.on("move", this.onPointerMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.padElement.addEventListener("keydown", this.onPadKeyDown_), this.view.padElement.addEventListener("keyup", this.onPadKeyUp_);
      }
      handlePointerEvent_(e, t) {
        if (!e.point)
          return;
        const l = this.maxValue_, b = _e(e.point.x, 0, e.bounds.width, -l, +l), E = _e(this.invertsY_ ? e.bounds.height - e.point.y : e.point.y, 0, e.bounds.height, -l, +l);
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
        ei(e.key) && e.preventDefault();
        const [t, l] = Qo(e, this.baseSteps_, this.invertsY_);
        t === 0 && l === 0 || this.value.setRawValue(new en(this.value.rawValue.x + t, this.value.rawValue.y + l), {
          forceEmit: false,
          last: false
        });
      }
      onPadKeyUp_(e) {
        const [t, l] = Qo(e, this.baseSteps_, this.invertsY_);
        t === 0 && l === 0 || this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    class pc {
      constructor(e, t) {
        var l, b;
        this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this), this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this), this.onPadButtonBlur_ = this.onPadButtonBlur_.bind(this), this.onPadButtonClick_ = this.onPadButtonClick_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.foldable_ = De.create(t.expanded), this.popC_ = t.pickerLayout === "popup" ? new ms(e, {
          viewProps: this.viewProps
        }) : null;
        const E = new uc(e, {
          baseSteps: [t.axes[0].baseStep, t.axes[1].baseStep],
          invertsY: t.invertsY,
          layout: t.pickerLayout,
          maxValue: t.maxValue,
          value: this.value,
          viewProps: this.viewProps
        });
        E.view.allFocusableElements.forEach((k) => {
          k.addEventListener("blur", this.onPopupChildBlur_), k.addEventListener("keydown", this.onPopupChildKeydown_);
        }), this.pickerC_ = E, this.textC_ = new $r(e, {
          assembly: qo,
          axes: t.axes,
          parser: t.parser,
          value: this.value,
          viewProps: this.viewProps
        }), this.view = new lc(e, {
          expanded: this.foldable_.value("expanded"),
          pickerLayout: t.pickerLayout,
          viewProps: this.viewProps
        }), this.view.textElement.appendChild(this.textC_.view.element), (l = this.view.buttonElement) === null || l === void 0 || l.addEventListener("blur", this.onPadButtonBlur_), (b = this.view.buttonElement) === null || b === void 0 || b.addEventListener("click", this.onPadButtonClick_), this.popC_ ? (this.view.element.appendChild(this.popC_.view.element), this.popC_.view.element.appendChild(this.pickerC_.view.element), Zt({
          primary: this.foldable_.value("expanded"),
          secondary: this.popC_.shows,
          forward: (k) => k.rawValue,
          backward: (k, B) => B.rawValue
        })) : this.view.pickerElement && (this.view.pickerElement.appendChild(this.pickerC_.view.element), Ue(this.foldable_, this.view.pickerElement));
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
        const t = this.popC_.view.element, l = Et2(e);
        l && t.contains(l) || l && l === this.view.buttonElement && !ft(t.ownerDocument) || (this.popC_.shows.rawValue = false);
      }
      onPopupChildKeydown_(e) {
        this.popC_ ? e.key === "Escape" && (this.popC_.shows.rawValue = false) : this.view.pickerElement && e.key === "Escape" && this.view.buttonElement.focus();
      }
    }
    class oi {
      constructor(e = 0, t = 0, l = 0) {
        this.x = e, this.y = t, this.z = l;
      }
      getComponents() {
        return [this.x, this.y, this.z];
      }
      static isObject(e) {
        if (_(e))
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
    const Zo = {
      toComponents: (i) => i.getComponents(),
      fromComponents: (i) => new oi(...i)
    };
    function hc(i) {
      return oi.isObject(i) ? new oi(i.x, i.y, i.z) : new oi();
    }
    function dc(i, e) {
      i.writeProperty("x", e.x), i.writeProperty("y", e.y), i.writeProperty("z", e.z);
    }
    function mc(i, e) {
      return new Jt({
        assembly: Zo,
        components: [
          Ft("x" in i ? i.x : void 0, e.x),
          Ft("y" in i ? i.y : void 0, e.y),
          Ft("z" in i ? i.z : void 0, e.z)
        ]
      });
    }
    function Xr(i, e) {
      return {
        baseStep: Dt(e),
        constraint: e,
        textProps: X.fromObject({
          draggingScale: Ot(e, i),
          formatter: Ie(ni(e, i))
        })
      };
    }
    const fc = {
      id: "input-point3d",
      type: "input",
      accept: (i, e) => {
        if (!oi.isObject(i))
          return null;
        const t = M, l = le(e, {
          x: t.optional.custom(gt),
          y: t.optional.custom(gt),
          z: t.optional.custom(gt)
        });
        return l ? {
          initialValue: i,
          params: l
        } : null;
      },
      binding: {
        reader: (i) => hc,
        constraint: (i) => mc(i.params, i.initialValue),
        equals: oi.equals,
        writer: (i) => dc
      },
      controller: (i) => {
        const e = i.value, t = i.constraint;
        if (!(t instanceof Jt))
          throw S.shouldNeverHappen();
        return new $r(i.document, {
          assembly: Zo,
          axes: [
            Xr(e.rawValue.x, t.components[0]),
            Xr(e.rawValue.y, t.components[1]),
            Xr(e.rawValue.z, t.components[2])
          ],
          parser: lt,
          value: e,
          viewProps: i.viewProps
        });
      }
    };
    class ai {
      constructor(e = 0, t = 0, l = 0, b = 0) {
        this.x = e, this.y = t, this.z = l, this.w = b;
      }
      getComponents() {
        return [this.x, this.y, this.z, this.w];
      }
      static isObject(e) {
        if (_(e))
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
    const Wo = {
      toComponents: (i) => i.getComponents(),
      fromComponents: (i) => new ai(...i)
    };
    function vc(i) {
      return ai.isObject(i) ? new ai(i.x, i.y, i.z, i.w) : new ai();
    }
    function bc(i, e) {
      i.writeProperty("x", e.x), i.writeProperty("y", e.y), i.writeProperty("z", e.z), i.writeProperty("w", e.w);
    }
    function gc(i, e) {
      return new Jt({
        assembly: Wo,
        components: [
          Ft("x" in i ? i.x : void 0, e.x),
          Ft("y" in i ? i.y : void 0, e.y),
          Ft("z" in i ? i.z : void 0, e.z),
          Ft("w" in i ? i.w : void 0, e.w)
        ]
      });
    }
    function _c(i, e) {
      return {
        baseStep: Dt(e),
        constraint: e,
        textProps: X.fromObject({
          draggingScale: Ot(e, i),
          formatter: Ie(ni(e, i))
        })
      };
    }
    const wc = {
      id: "input-point4d",
      type: "input",
      accept: (i, e) => {
        if (!ai.isObject(i))
          return null;
        const t = M, l = le(e, {
          x: t.optional.custom(gt),
          y: t.optional.custom(gt),
          z: t.optional.custom(gt),
          w: t.optional.custom(gt)
        });
        return l ? {
          initialValue: i,
          params: l
        } : null;
      },
      binding: {
        reader: (i) => vc,
        constraint: (i) => gc(i.params, i.initialValue),
        equals: ai.equals,
        writer: (i) => bc
      },
      controller: (i) => {
        const e = i.value, t = i.constraint;
        if (!(t instanceof Jt))
          throw S.shouldNeverHappen();
        return new $r(i.document, {
          assembly: Wo,
          axes: e.rawValue.getComponents().map((l, b) => _c(l, t.components[b])),
          parser: lt,
          value: e,
          viewProps: i.viewProps
        });
      }
    };
    function yc(i) {
      const e = [], t = Bi(i.options);
      return t && e.push(t), new bn(e);
    }
    const xc = {
      id: "input-string",
      type: "input",
      accept: (i, e) => {
        if (typeof i != "string")
          return null;
        const l = le(e, {
          options: M.optional.custom(Pn)
        });
        return l ? {
          initialValue: i,
          params: l
        } : null;
      },
      binding: {
        reader: (i) => Ai,
        constraint: (i) => yc(i.params),
        writer: (i) => nt
      },
      controller: (i) => {
        const e = i.document, t = i.value, l = i.constraint, b = l && tt(l, gn);
        return b ? new _n(e, {
          props: new X({
            options: b.values.value("options")
          }),
          value: t,
          viewProps: i.viewProps
        }) : new Wn(e, {
          parser: (E) => E,
          props: X.fromObject({
            formatter: Pt
          }),
          value: t,
          viewProps: i.viewProps
        });
      }
    }, Ui = {
      monitor: {
        defaultInterval: 200,
        defaultLineCount: 3
      }
    }, Jo = D2("mll");
    class Ec {
      constructor(e, t) {
        this.onValueUpdate_ = this.onValueUpdate_.bind(this), this.formatter_ = t.formatter, this.element = e.createElement("div"), this.element.classList.add(Jo()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("textarea");
        l.classList.add(Jo("i")), l.style.height = `calc(var(--bld-us) * ${t.lineCount})`, l.readOnly = true, t.viewProps.bindDisabled(l), this.element.appendChild(l), this.textareaElem_ = l, t.value.emitter.on("change", this.onValueUpdate_), this.value = t.value, this.update_();
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
    class Yr {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.view = new Ec(e, {
          formatter: t.formatter,
          lineCount: t.lineCount,
          value: this.value,
          viewProps: this.viewProps
        });
      }
    }
    const ea = D2("sgl");
    class Cc {
      constructor(e, t) {
        this.onValueUpdate_ = this.onValueUpdate_.bind(this), this.formatter_ = t.formatter, this.element = e.createElement("div"), this.element.classList.add(ea()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("input");
        l.classList.add(ea("i")), l.readOnly = true, l.type = "text", t.viewProps.bindDisabled(l), this.element.appendChild(l), this.inputElement = l, t.value.emitter.on("change", this.onValueUpdate_), this.value = t.value, this.update_();
      }
      update_() {
        const e = this.value.rawValue, t = e[e.length - 1];
        this.inputElement.value = t !== void 0 ? this.formatter_(t) : "";
      }
      onValueUpdate_() {
        this.update_();
      }
    }
    class qr {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.view = new Cc(e, {
          formatter: t.formatter,
          value: this.value,
          viewProps: this.viewProps
        });
      }
    }
    const Pc = {
      id: "monitor-bool",
      type: "monitor",
      accept: (i, e) => {
        if (typeof i != "boolean")
          return null;
        const l = le(e, {
          lineCount: M.optional.number
        });
        return l ? {
          initialValue: i,
          params: l
        } : null;
      },
      binding: {
        reader: (i) => vs
      },
      controller: (i) => {
        var e;
        return i.value.rawValue.length === 1 ? new qr(i.document, {
          formatter: bs,
          value: i.value,
          viewProps: i.viewProps
        }) : new Yr(i.document, {
          formatter: bs,
          lineCount: (e = i.params.lineCount) !== null && e !== void 0 ? e : Ui.monitor.defaultLineCount,
          value: i.value,
          viewProps: i.viewProps
        });
      }
    }, nn = D2("grl");
    class Tc {
      constructor(e, t) {
        this.onCursorChange_ = this.onCursorChange_.bind(this), this.onValueUpdate_ = this.onValueUpdate_.bind(this), this.element = e.createElement("div"), this.element.classList.add(nn()), t.viewProps.bindClassModifiers(this.element), this.formatter_ = t.formatter, this.props_ = t.props, this.cursor_ = t.cursor, this.cursor_.emitter.on("change", this.onCursorChange_);
        const l = e.createElementNS(ze, "svg");
        l.classList.add(nn("g")), l.style.height = `calc(var(--bld-us) * ${t.lineCount})`, this.element.appendChild(l), this.svgElem_ = l;
        const b = e.createElementNS(ze, "polyline");
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
          const Ln = _e(ve, 0, t, 0, e.width), Gi = _e(de, l, b, e.height, 0);
          E.push([Ln, Gi].join(","));
        }), this.lineElem_.setAttributeNS(null, "points", E.join(" "));
        const k = this.tooltipElem_, B = this.value.rawValue[this.cursor_.rawValue];
        if (B === void 0) {
          k.classList.remove(nn("t", "a"));
          return;
        }
        const Q = _e(this.cursor_.rawValue, 0, t, 0, e.width), J = _e(B, l, b, e.height, 0);
        k.style.left = `${Q}px`, k.style.top = `${J}px`, k.textContent = `${this.formatter_(B)}`, k.classList.contains(nn("t", "a")) || (k.classList.add(nn("t", "a"), nn("t", "in")), rt(k), k.classList.remove(nn("t", "in")));
      }
      onValueUpdate_() {
        this.update_();
      }
      onCursorChange_() {
        this.update_();
      }
    }
    class kc {
      constructor(e, t) {
        if (this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this), this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this), this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this), this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this), this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this), this.props_ = t.props, this.value = t.value, this.viewProps = t.viewProps, this.cursor_ = ee(-1), this.view = new Tc(e, {
          cursor: this.cursor_,
          formatter: t.formatter,
          lineCount: t.lineCount,
          props: this.props_,
          value: this.value,
          viewProps: this.viewProps
        }), !ft(e))
          this.view.element.addEventListener("mousemove", this.onGraphMouseMove_), this.view.element.addEventListener("mouseleave", this.onGraphMouseLeave_);
        else {
          const l = new Vt(this.view.element);
          l.emitter.on("down", this.onGraphPointerDown_), l.emitter.on("move", this.onGraphPointerMove_), l.emitter.on("up", this.onGraphPointerUp_);
        }
      }
      onGraphMouseLeave_() {
        this.cursor_.rawValue = -1;
      }
      onGraphMouseMove_(e) {
        const t = this.view.element.getBoundingClientRect();
        this.cursor_.rawValue = Math.floor(_e(e.offsetX, 0, t.width, 0, this.value.rawValue.length));
      }
      onGraphPointerDown_(e) {
        this.onGraphPointerMove_(e);
      }
      onGraphPointerMove_(e) {
        if (!e.data.point) {
          this.cursor_.rawValue = -1;
          return;
        }
        this.cursor_.rawValue = Math.floor(_e(e.data.point.x, 0, e.data.bounds.width, 0, this.value.rawValue.length));
      }
      onGraphPointerUp_() {
        this.cursor_.rawValue = -1;
      }
    }
    function Qr(i) {
      return "format" in i && !_(i.format) ? i.format : Ie(2);
    }
    function Mc(i) {
      var e;
      return i.value.rawValue.length === 1 ? new qr(i.document, {
        formatter: Qr(i.params),
        value: i.value,
        viewProps: i.viewProps
      }) : new Yr(i.document, {
        formatter: Qr(i.params),
        lineCount: (e = i.params.lineCount) !== null && e !== void 0 ? e : Ui.monitor.defaultLineCount,
        value: i.value,
        viewProps: i.viewProps
      });
    }
    function Sc(i) {
      var e, t, l;
      return new kc(i.document, {
        formatter: Qr(i.params),
        lineCount: (e = i.params.lineCount) !== null && e !== void 0 ? e : Ui.monitor.defaultLineCount,
        props: X.fromObject({
          maxValue: (t = "max" in i.params ? i.params.max : null) !== null && t !== void 0 ? t : 100,
          minValue: (l = "min" in i.params ? i.params.min : null) !== null && l !== void 0 ? l : 0
        }),
        value: i.value,
        viewProps: i.viewProps
      });
    }
    function ta(i) {
      return "view" in i && i.view === "graph";
    }
    const Lc = {
      id: "monitor-number",
      type: "monitor",
      accept: (i, e) => {
        if (typeof i != "number")
          return null;
        const t = M, l = le(e, {
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
        defaultBufferSize: (i) => ta(i) ? 64 : 1,
        reader: (i) => bt
      },
      controller: (i) => ta(i.params) ? Sc(i) : Mc(i)
    }, Ac = {
      id: "monitor-string",
      type: "monitor",
      accept: (i, e) => {
        if (typeof i != "string")
          return null;
        const t = M, l = le(e, {
          lineCount: t.optional.number,
          multiline: t.optional.boolean
        });
        return l ? {
          initialValue: i,
          params: l
        } : null;
      },
      binding: {
        reader: (i) => Ai
      },
      controller: (i) => {
        var e;
        const t = i.value;
        return t.rawValue.length > 1 || "multiline" in i.params && i.params.multiline ? new Yr(i.document, {
          formatter: Pt,
          lineCount: (e = i.params.lineCount) !== null && e !== void 0 ? e : Ui.monitor.defaultLineCount,
          value: t,
          viewProps: i.viewProps
        }) : new qr(i.document, {
          formatter: Pt,
          value: t,
          viewProps: i.viewProps
        });
      }
    };
    function Rc(i, e) {
      var t;
      const l = i.accept(e.target.read(), e.params);
      if (_(l))
        return null;
      const b = M, E = {
        target: e.target,
        initialValue: l.initialValue,
        params: l.params
      }, k = i.binding.reader(E), B = i.binding.constraint ? i.binding.constraint(E) : void 0, Q = ee(k(l.initialValue), {
        constraint: B,
        equals: i.binding.equals
      }), J = new Qn({
        reader: k,
        target: e.target,
        value: Q,
        writer: i.binding.writer(E)
      }), de = b.optional.boolean(e.params.disabled).value, ve = b.optional.boolean(e.params.hidden).value, Ln = i.controller({
        constraint: B,
        document: e.document,
        initialValue: l.initialValue,
        params: l.params,
        value: J.value,
        viewProps: Ye.create({
          disabled: de,
          hidden: ve
        })
      });
      return new je(e.document, {
        binding: J,
        blade: ye(),
        props: X.fromObject({
          label: "label" in e.params ? (t = b.optional.string(e.params.label).value) !== null && t !== void 0 ? t : null : e.target.key
        }),
        valueController: Ln
      });
    }
    function Ic(i, e) {
      return e === 0 ? new us() : new Ci(i, e ?? Ui.monitor.defaultInterval);
    }
    function Vc(i, e) {
      var t, l, b;
      const E = M, k = i.accept(e.target.read(), e.params);
      if (_(k))
        return null;
      const B = {
        target: e.target,
        initialValue: k.initialValue,
        params: k.params
      }, Q = i.binding.reader(B), J = (l = (t = E.optional.number(e.params.bufferSize).value) !== null && t !== void 0 ? t : i.binding.defaultBufferSize && i.binding.defaultBufferSize(k.params)) !== null && l !== void 0 ? l : 1, de = E.optional.number(e.params.interval).value, ve = new pr({
        reader: Q,
        target: e.target,
        ticker: Ic(e.document, de),
        value: ps(J)
      }), Ln = E.optional.boolean(e.params.disabled).value, Gi = E.optional.boolean(e.params.hidden).value, Hi = i.controller({
        document: e.document,
        params: k.params,
        value: ve.value,
        viewProps: Ye.create({
          disabled: Ln,
          hidden: Gi
        })
      });
      return new ot(e.document, {
        binding: ve,
        blade: ye(),
        props: X.fromObject({
          label: "label" in e.params ? (b = E.optional.string(e.params.label).value) !== null && b !== void 0 ? b : null : e.target.key
        }),
        valueController: Hi
      });
    }
    class Dc {
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
        if (_(b))
          throw new S({
            context: {
              key: t.key
            },
            type: "nomatchingcontroller"
          });
        const E = this.pluginsMap_.inputs.reduce((k, B) => k ?? Rc(B, {
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
        const b = this.pluginsMap_.monitors.reduce((E, k) => E ?? Vc(k, {
          document: e,
          params: l,
          target: t
        }), null);
        if (b)
          return b;
        throw new S({
          context: {
            key: t.key
          },
          type: "nomatchingcontroller"
        });
      }
      createBlade(e, t) {
        const l = this.pluginsMap_.blades.reduce((b, E) => b ?? ur(E, {
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
        if (e instanceof je)
          return new vi(e);
        if (e instanceof ot)
          return new bi(e);
        if (e instanceof mn)
          return new Xn(e, this);
        const t = this.pluginsMap_.blades.reduce((l, b) => l ?? b.api({
          controller: e,
          pool: this
        }), null);
        if (!t)
          throw S.shouldNeverHappen();
        return t;
      }
    }
    function Oc() {
      const i = new Dc();
      return [
        Uc,
        fc,
        wc,
        xc,
        ac,
        nc,
        tc,
        Zl,
        ii,
        Pc,
        Ac,
        Lc,
        W,
        rr,
        ar,
        Ei
      ].forEach((e) => {
        i.register(e);
      }), i;
    }
    function Nc(i) {
      return en.isObject(i) ? new en(i.x, i.y) : new en();
    }
    function Fc(i, e) {
      i.writeProperty("x", e.x), i.writeProperty("y", e.y);
    }
    function Ft(i, e) {
      if (!i)
        return;
      const t = [], l = Xo(i, e);
      l && t.push(l);
      const b = Yo(i);
      return b && t.push(b), new bn(t);
    }
    function Bc(i, e) {
      return new Jt({
        assembly: qo,
        components: [
          Ft("x" in i ? i.x : void 0, e.x),
          Ft("y" in i ? i.y : void 0, e.y)
        ]
      });
    }
    function na(i, e) {
      const [t, l] = i ? rc(i) : [];
      if (!_(t) || !_(l))
        return Math.max(Math.abs(t ?? 0), Math.abs(l ?? 0));
      const b = Dt(i);
      return Math.max(Math.abs(b) * 10, Math.abs(e) * 10);
    }
    function jc(i, e) {
      const t = e instanceof Jt ? e.components[0] : void 0, l = e instanceof Jt ? e.components[1] : void 0, b = na(t, i.x), E = na(l, i.y);
      return Math.max(b, E);
    }
    function ia(i, e) {
      return {
        baseStep: Dt(e),
        constraint: e,
        textProps: X.fromObject({
          draggingScale: Ot(e, i),
          formatter: Ie(ni(e, i))
        })
      };
    }
    function zc(i) {
      if (!("y" in i))
        return false;
      const e = i.y;
      return e && "inverted" in e ? !!e.inverted : false;
    }
    const Uc = {
      id: "input-point2d",
      type: "input",
      accept: (i, e) => {
        if (!en.isObject(i))
          return null;
        const t = M, l = le(e, {
          expanded: t.optional.boolean,
          picker: t.optional.custom(Fi),
          x: t.optional.custom(gt),
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
        reader: (i) => Nc,
        constraint: (i) => Bc(i.params, i.initialValue),
        equals: en.equals,
        writer: (i) => Fc
      },
      controller: (i) => {
        const e = i.document, t = i.value, l = i.constraint;
        if (!(l instanceof Jt))
          throw S.shouldNeverHappen();
        const b = "expanded" in i.params ? i.params.expanded : void 0, E = "picker" in i.params ? i.params.picker : void 0;
        return new pc(e, {
          axes: [
            ia(t.rawValue.x, l.components[0]),
            ia(t.rawValue.y, l.components[1])
          ],
          expanded: b ?? false,
          invertsY: zc(i.params),
          maxValue: jc(t.rawValue, l),
          parser: lt,
          pickerLayout: E ?? "popup",
          value: t,
          viewProps: i.viewProps
        });
      }
    };
    class sa extends a {
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
    class ra extends a {
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
    class oa extends a {
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
    const Gc = function() {
      return {
        id: "list",
        type: "blade",
        accept(i) {
          const e = M, t = le(i, {
            options: e.required.custom(Pn),
            value: e.required.raw,
            view: e.required.constant("list"),
            label: e.optional.string
          });
          return t ? { params: t } : null;
        },
        controller(i) {
          const e = new gn(ks(i.params.options)), t = ee(i.params.value, {
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
          return !(i.controller instanceof Kt) || !(i.controller.valueController instanceof _n) ? null : new sa(i.controller);
        }
      };
    }();
    function Hc(i) {
      return i.reduce((e, t) => Object.assign(e, {
        [t.presetKey]: t.read()
      }), {});
    }
    function Kc(i, e) {
      i.forEach((t) => {
        const l = e[t.target.presetKey];
        l !== void 0 && t.writer(t.target, t.reader(l));
      });
    }
    class $c extends gi {
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
        const t = this.controller_.rackController.rack.find(je).map((l) => l.binding);
        Kc(t, e), this.refresh();
      }
      /**
       * Exports a preset of all inputs.
       * @return An exported preset object.
       */
      exportPreset() {
        const e = this.controller_.rackController.rack.find(je).map((t) => t.binding.target);
        return Hc(e);
      }
      /**
       * Refreshes all bindings of the pane.
       */
      refresh() {
        this.controller_.rackController.rack.find(je).forEach((e) => {
          e.binding.read();
        }), this.controller_.rackController.rack.find(ot).forEach((e) => {
          e.binding.read();
        });
      }
    }
    class Xc extends Yn {
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
    const Yc = {
      id: "slider",
      type: "blade",
      accept(i) {
        const e = M, t = le(i, {
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
        }), E = new ti(i.document, {
          baseStep: 1,
          parser: lt,
          sliderProps: new X({
            maxValue: b.values.value("max"),
            minValue: b.values.value("min")
          }),
          textProps: X.fromObject({
            draggingScale: Ot(void 0, l),
            formatter: (t = i.params.format) !== null && t !== void 0 ? t : Sr
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
        return !(i.controller instanceof Kt) || !(i.controller.valueController instanceof ti) ? null : new ra(i.controller);
      }
    }, qc = function() {
      return {
        id: "text",
        type: "blade",
        accept(i) {
          const e = M, t = le(i, {
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
          const t = new Wn(i.document, {
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
          return !(i.controller instanceof Kt) || !(i.controller.valueController instanceof Wn) ? null : new oa(i.controller);
        }
      };
    }();
    function Qc(i) {
      const e = i.createElement("div");
      return e.classList.add(D2("dfw")()), i.body && i.body.appendChild(e), e;
    }
    function aa(i, e, t) {
      if (i.querySelector(`style[data-tp-style=${e}]`))
        return;
      const l = i.createElement("style");
      l.dataset.tpStyle = e, l.textContent = t, i.head.appendChild(l);
    }
    class Zc extends $c {
      constructor(e) {
        var t, l;
        const b = e ?? {}, E = (t = b.document) !== null && t !== void 0 ? t : mi(), k = Oc(), B = new Xc(E, {
          expanded: b.expanded,
          blade: ye(),
          props: X.fromObject({
            title: b.title
          }),
          viewProps: Ye.create()
        });
        super(B, k), this.pool_ = k, this.containerElem_ = (l = b.container) !== null && l !== void 0 ? l : Qc(E), this.containerElem_.appendChild(this.element), this.doc_ = E, this.usesDefaultWrapper_ = !b.container, this.setUpDefaultPlugins_();
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
        e.css && aa(this.document, `plugin-${e.id}`, e.css);
      }
      setUpDefaultPlugins_() {
        aa(this.document, "default", '.tp-tbiv_b,.tp-coltxtv_ms,.tp-ckbv_i,.tp-rotv_b,.tp-fldv_b,.tp-mllv_i,.tp-sglv_i,.tp-grlv_g,.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw,.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-p2dv_b:hover,.tp-btnv_b:hover,.tp-lstv_s:hover{background-color:var(--btn-bg-h)}.tp-p2dv_b:focus,.tp-btnv_b:focus,.tp-lstv_s:focus{background-color:var(--btn-bg-f)}.tp-p2dv_b:active,.tp-btnv_b:active,.tp-lstv_s:active{background-color:var(--btn-bg-a)}.tp-p2dv_b:disabled,.tp-btnv_b:disabled,.tp-lstv_s:disabled{opacity:.5}.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-txtv_i:hover,.tp-p2dpv_p:hover,.tp-colswv_sw:hover{background-color:var(--in-bg-h)}.tp-txtv_i:focus,.tp-p2dpv_p:focus,.tp-colswv_sw:focus{background-color:var(--in-bg-f)}.tp-txtv_i:active,.tp-p2dpv_p:active,.tp-colswv_sw:active{background-color:var(--in-bg-a)}.tp-txtv_i:disabled,.tp-p2dpv_p:disabled,.tp-colswv_sw:disabled{opacity:.5}.tp-mllv_i,.tp-sglv_i,.tp-grlv_g{background-color:var(--mo-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--mo-fg);height:var(--bld-us);scrollbar-color:currentColor rgba(0,0,0,0);scrollbar-width:thin;width:100%}.tp-mllv_i::-webkit-scrollbar,.tp-sglv_i::-webkit-scrollbar,.tp-grlv_g::-webkit-scrollbar{height:8px;width:8px}.tp-mllv_i::-webkit-scrollbar-corner,.tp-sglv_i::-webkit-scrollbar-corner,.tp-grlv_g::-webkit-scrollbar-corner{background-color:rgba(0,0,0,0)}.tp-mllv_i::-webkit-scrollbar-thumb,.tp-sglv_i::-webkit-scrollbar-thumb,.tp-grlv_g::-webkit-scrollbar-thumb{background-clip:padding-box;background-color:currentColor;border:rgba(0,0,0,0) solid 2px;border-radius:4px}.tp-rotv{--font-family: var(--tp-font-family, Roboto Mono, Source Code Pro, Menlo, Courier, monospace);--bs-br: var(--tp-base-border-radius, 6px);--cnt-h-p: var(--tp-container-horizontal-padding, 4px);--cnt-v-p: var(--tp-container-vertical-padding, 4px);--elm-br: var(--tp-element-border-radius, 2px);--bld-s: var(--tp-blade-spacing, 4px);--bld-us: var(--tp-blade-unit-size, 20px);--bs-bg: var(--tp-base-background-color, hsl(230, 7%, 17%));--bs-sh: var(--tp-base-shadow-color, rgba(0, 0, 0, 0.2));--btn-bg: var(--tp-button-background-color, hsl(230, 7%, 70%));--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, hsl(230, 7%, 17%));--cnt-bg: var(--tp-container-background-color, rgba(187, 188, 196, 0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187, 188, 196, 0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187, 188, 196, 0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187, 188, 196, 0.15));--cnt-fg: var(--tp-container-foreground-color, hsl(230, 7%, 75%));--in-bg: var(--tp-input-background-color, rgba(187, 188, 196, 0.1));--in-bg-a: var(--tp-input-background-color-active, rgba(187, 188, 196, 0.25));--in-bg-f: var(--tp-input-background-color-focus, rgba(187, 188, 196, 0.2));--in-bg-h: var(--tp-input-background-color-hover, rgba(187, 188, 196, 0.15));--in-fg: var(--tp-input-foreground-color, hsl(230, 7%, 75%));--lbl-fg: var(--tp-label-foreground-color, rgba(187, 188, 196, 0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0, 0, 0, 0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187, 188, 196, 0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(187, 188, 196, 0.1))}.tp-rotv_c>.tp-cntv.tp-v-lst,.tp-tabv_c .tp-brkv>.tp-cntv.tp-v-lst,.tp-fldv_c>.tp-cntv.tp-v-lst{margin-bottom:calc(-1*var(--cnt-v-p))}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-rotv_c>*:not(.tp-v-fst),.tp-tabv_c .tp-brkv>*:not(.tp-v-fst),.tp-fldv_c>*:not(.tp-v-fst){margin-top:var(--bld-s)}.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-v-p)}.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-cntv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-v-p)}.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-tabv_c .tp-brkv>.tp-cntv,.tp-fldv_c>.tp-cntv{margin-left:4px}.tp-tabv_c .tp-brkv>.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--elm-br);border-bottom-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-tabv_c .tp-brkv .tp-fldv>.tp-fldv_c,.tp-fldv_c .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv>.tp-cntv+.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-cntv+.tp-fldv>.tp-fldv_b{border-top-left-radius:0}.tp-tabv_c .tp-brkv>.tp-cntv+.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-cntv+.tp-tabv>.tp-tabv_t{border-top-left-radius:0}.tp-tabv_c .tp-brkv>.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-tabv>.tp-tabv_t{border-top-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv .tp-tabv>.tp-tabv_c,.tp-fldv_c .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--elm-br)}.tp-rotv_b,.tp-fldv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);overflow:hidden;padding-left:var(--cnt-h-p);padding-right:calc(4px + var(--bld-us) + var(--cnt-h-p));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-rotv_b:hover,.tp-fldv_b:hover{background-color:var(--cnt-bg-h)}.tp-rotv_b:focus,.tp-fldv_b:focus{background-color:var(--cnt-bg-f)}.tp-rotv_b:active,.tp-fldv_b:active{background-color:var(--cnt-bg-a)}.tp-rotv_b:disabled,.tp-fldv_b:disabled{opacity:.5}.tp-rotv_m,.tp-fldv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:"";display:block;height:6px;right:calc(var(--cnt-h-p) + (var(--bld-us) + 4px - 6px)/2 - 2px);margin:auto;opacity:.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-rotv.tp-rotv-expanded .tp-rotv_m,.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m{transform:none}.tp-rotv_c,.tp-fldv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c,.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c{display:none}.tp-rotv.tp-rotv-expanded .tp-rotv_c,.tp-fldv.tp-fldv-expanded>.tp-fldv_c{opacity:1;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-lstv,.tp-coltxtv_m{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m,.tp-coltxtv_mm{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-lstv_m svg,.tp-coltxtv_mm svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-lstv_m svg path,.tp-coltxtv_mm svg path{fill:currentColor}.tp-pndtxtv,.tp-coltxtv_w{display:flex}.tp-pndtxtv_a,.tp-coltxtv_c{width:100%}.tp-pndtxtv_a+.tp-pndtxtv_a,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-coltxtv_c{margin-left:2px}.tp-btnv_b{width:100%}.tp-btnv_t{text-align:center}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--elm-br);cursor:pointer;display:block;height:var(--bld-us);position:relative;width:var(--bld-us)}.tp-ckbv_w svg{bottom:0;display:block;height:16px;left:0;margin:auto;opacity:0;position:absolute;right:0;top:0;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--bld-us)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-cpl .tp-colv_p{overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--bld-s);opacity:1}.tp-colv .tp-popv{left:calc(-1*var(--cnt-h-p));right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--bld-s)}.tp-colpv_rgb{display:flex;margin-top:var(--bld-s);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-v-p);padding-top:calc(var(--cnt-v-p) + 2px);position:relative}.tp-colpv_a::before{background-color:var(--grv-fg);content:"";height:2px;left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:0}.tp-colpv.tp-v-disabled .tp-colpv_a::before{opacity:.5}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--elm-br);outline:none;overflow:hidden;position:relative}.tp-svpv.tp-v-disabled{opacity:.5}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--bld-us)*4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0, 0, 0, 0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative}.tp-hplv.tp-v-disabled{opacity:.5}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--elm-br);border:rgba(255,255,255,.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative;width:100%}.tp-aplv.tp-v-disabled{opacity:.5}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--elm-br);box-shadow:0 0 2px rgba(0,0,0,.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;pointer-events:none;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--elm-br);border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--elm-br);overflow:hidden}.tp-colswv.tp-v-disabled{opacity:.5}.tp-colswv_sw{border-radius:0}.tp-colswv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;cursor:pointer;display:block;height:var(--bld-us);left:0;margin:0;outline:none;padding:0;position:absolute;top:0;width:var(--bld-us)}.tp-colswv_b:focus::after{border:rgba(255,255,255,.75) solid 2px;border-radius:var(--elm-br);bottom:0;content:"";display:block;left:0;position:absolute;right:0;top:0}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--elm-br);color:var(--lbl-fg);cursor:pointer;height:var(--bld-us);line-height:var(--bld-us);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv.tp-v-disabled .tp-coltxtv_mm{opacity:.5}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv{position:relative}.tp-fldv.tp-fldv-not .tp-fldv_b{display:none}.tp-fldv_t{padding-left:4px}.tp-fldv_b:disabled .tp-fldv_m{display:none}.tp-fldv_c{padding-left:4px}.tp-fldv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--bld-us) + 4px);width:var(--bs-br)}.tp-fldv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-fldv_b:hover+.tp-fldv_i{color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_i{color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_i{color:var(--cnt-bg-a)}.tp-fldv.tp-v-disabled>.tp-fldv_i{opacity:.5}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--bld-us)*3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left .05s,top .05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-h-p);padding-right:var(--cnt-h-p)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:160px}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding:0 4px}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:.5}.tp-mllv_i{display:block;height:calc(var(--bld-us)*3);line-height:var(--bld-us);padding:0 4px;resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--bld-us);margin-right:4px;position:relative;width:var(--bld-us)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--bld-s);opacity:1}.tp-p2dv .tp-popv{left:calc(-1*var(--cnt-h-p));right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-p2dpv{padding-left:calc(var(--bld-us) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv.tp-v-disabled .tp-p2dpv_p{opacity:.5}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:6px;box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:168px;padding:var(--cnt-v-p) var(--cnt-h-p);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sprv.tp-v-disabled .tp-sprv_r{opacity:.5}.tp-sldv.tp-v-disabled{opacity:.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--bld-us);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;bottom:0;content:"";display:block;height:2px;left:0;margin:auto;position:absolute;right:0;top:0}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";display:block;height:2px;left:0;margin-bottom:auto;margin-top:auto;position:absolute;right:0;top:0}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--elm-br);bottom:0;content:"";display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv{position:relative}.tp-tabv_t{align-items:flex-end;color:var(--cnt-bg);display:flex;overflow:hidden;position:relative}.tp-tabv_t:hover{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus){color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active){color:var(--cnt-bg-a)}.tp-tabv_t::before{background-color:currentColor;bottom:0;content:"";height:2px;left:0;pointer-events:none;position:absolute;right:0}.tp-tabv.tp-v-disabled .tp-tabv_t::before{opacity:.5}.tp-tabv.tp-tabv-nop .tp-tabv_t{height:calc(var(--bld-us) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_t::before{background-color:var(--cnt-bg);bottom:0;content:"";height:2px;left:0;position:absolute;right:0}.tp-tabv_c{padding-bottom:var(--cnt-v-p);padding-left:4px;padding-top:var(--cnt-v-p)}.tp-tabv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--bld-us) + 4px);width:var(--bs-br)}.tp-tabv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-tabv_t:hover+.tp-tabv_i{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus)+.tp-tabv_i{color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active)+.tp-tabv_i{color:var(--cnt-bg-a)}.tp-tabv.tp-v-disabled>.tp-tabv_i{opacity:.5}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv.tp-v-disabled::before{opacity:.5}.tp-tbiv_b{display:block;padding-left:calc(var(--cnt-h-p) + 4px);padding-right:calc(var(--cnt-h-p) + 4px);position:relative;width:100%}.tp-tbiv_b:disabled{opacity:.5}.tp-tbiv_b::before{background-color:var(--cnt-bg);bottom:2px;content:"";left:0;pointer-events:none;position:absolute;right:0;top:0}.tp-tbiv_b:hover::before{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus::before{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active::before{background-color:var(--cnt-bg-a)}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);opacity:.5;overflow:hidden;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-txtv{position:relative}.tp-txtv_i{padding:0 4px}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:.3}.tp-txtv_k{cursor:pointer;height:100%;left:-3px;position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";height:calc(var(--bld-us) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:.1;position:absolute;top:0;transition:border-radius .1s,height .1s,transform .1s,width .1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--elm-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0);border-style:solid;border-width:2px;box-sizing:border-box;content:"";font-size:.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--font-family);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(4px + var(--bld-us) + var(--cnt-h-p));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0}.tp-rotv.tp-rotv-not .tp-rotv_b{display:none}.tp-rotv_b:disabled .tp-rotv_m{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1*var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1*var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_t{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}'), this.pool_.getAll().forEach((e) => {
          this.embedPluginStyle_(e);
        }), this.registerPlugin({
          plugins: [
            Yc,
            Gc,
            Ei,
            qc
          ]
        });
      }
    }
    const Wc = new s("3.1.7");
    r.BladeApi = a, r.ButtonApi = j, r.FolderApi = gi, r.InputBindingApi = vi, r.ListApi = sa, r.MonitorBindingApi = bi, r.Pane = Zc, r.SeparatorApi = os, r.SliderApi = ra, r.TabApi = ls, r.TabPageApi = xi, r.TextApi = oa, r.TpChangeEvent = p, r.VERSION = Wc, Object.defineProperty(r, "__esModule", { value: true });
  });
})(Dh, Gs);
var ts = {};
var Oh = {
  get exports() {
    return ts;
  },
  set exports(v) {
    ts = v;
  }
};
(function(v, n) {
  (function(r, s) {
    s(n);
  })(rl, function(r) {
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
      constructor(o, u, f, x) {
        super(o), this.value = u, this.presetKey = f, this.last = x ?? true;
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
      constructor(o) {
        var u;
        this.message = (u = d[o.type](o.context)) !== null && u !== void 0 ? u : "Unexpected error", this.name = this.constructor.name, this.stack = new Error(this.message).stack, this.type = o.type;
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
      on(o, u) {
        let f = this.observers_[o];
        return f || (f = this.observers_[o] = []), f.push({
          handler: u
        }), this;
      }
      off(o, u) {
        const f = this.observers_[o];
        return f && (this.observers_[o] = f.filter((x) => x.handler !== u)), this;
      }
      emit(o, u) {
        const f = this.observers_[o];
        f && f.forEach((x) => {
          x.handler(u);
        });
      }
    }
    const _ = "tp";
    function y(m) {
      return (u, f) => [
        _,
        "-",
        m,
        "v",
        u ? `_${u}` : "",
        f ? `-${f}` : ""
      ].join("");
    }
    function P(m, o) {
      return (u) => o(m(u));
    }
    function I2(m) {
      return m.rawValue;
    }
    function S(m, o) {
      m.emitter.on("change", P(I2, o)), o(m.rawValue);
    }
    function R(m, o, u) {
      S(m.value(o), u);
    }
    function j(m, o, u) {
      u ? m.classList.add(o) : m.classList.remove(o);
    }
    function F(m, o) {
      return (u) => {
        j(m, o, u);
      };
    }
    function V(m, o) {
      S(m, (u) => {
        o.textContent = u ?? "";
      });
    }
    const D2 = y("btn");
    class Y {
      constructor(o, u) {
        this.element = o.createElement("div"), this.element.classList.add(D2()), u.viewProps.bindClassModifiers(this.element);
        const f = o.createElement("button");
        f.classList.add(D2("b")), u.viewProps.bindDisabled(f), this.element.appendChild(f), this.buttonElement = f;
        const x = o.createElement("div");
        x.classList.add(D2("t")), V(u.props.value("title"), x), this.buttonElement.appendChild(x);
      }
    }
    class G {
      constructor(o, u) {
        this.emitter = new w(), this.onClick_ = this.onClick_.bind(this), this.props = u.props, this.viewProps = u.viewProps, this.view = new Y(o, {
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
      constructor(o, u) {
        var f;
        this.constraint_ = u == null ? void 0 : u.constraint, this.equals_ = (f = u == null ? void 0 : u.equals) !== null && f !== void 0 ? f : (x, T) => x === T, this.emitter = new w(), this.rawValue_ = o;
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
      setRawValue(o, u) {
        const f = u ?? {
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
      setRawValue(o, u) {
        const f = u ?? {
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
    function H(m, o) {
      const u = o == null ? void 0 : o.constraint, f = o == null ? void 0 : o.equals;
      return !u && !f ? new O(m) : new N(m, o);
    }
    class K {
      constructor(o) {
        this.emitter = new w(), this.valMap_ = o;
        for (const u in this.valMap_)
          this.valMap_[u].emitter.on("change", () => {
            this.emitter.emit("change", {
              key: u,
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
        const u = this.createCore(o);
        return new K(u);
      }
      get(o) {
        return this.valMap_[o].rawValue;
      }
      set(o, u) {
        this.valMap_[o].rawValue = u;
      }
      value(o) {
        return this.valMap_[o];
      }
    }
    function q(m, o) {
      const f = Object.keys(o).reduce((x, T) => {
        if (x === void 0)
          return;
        const A = o[T], z = A(m[T]);
        return z.succeeded ? Object.assign(Object.assign({}, x), { [T]: z.value }) : void 0;
      }, {});
      return f;
    }
    function pe(m, o) {
      return m.reduce((u, f) => {
        if (u === void 0)
          return;
        const x = o(f);
        if (!(!x.succeeded || x.value === void 0))
          return [...u, x.value];
      }, []);
    }
    function ge(m) {
      return m === null ? false : typeof m == "object";
    }
    function ce(m) {
      return (o) => (u) => {
        if (!o && u === void 0)
          return {
            succeeded: false,
            value: void 0
          };
        if (o && u === void 0)
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
        custom: (o) => ce(o)(m),
        boolean: ce((o) => typeof o == "boolean" ? o : void 0)(m),
        number: ce((o) => typeof o == "number" ? o : void 0)(m),
        string: ce((o) => typeof o == "string" ? o : void 0)(m),
        function: ce((o) => typeof o == "function" ? o : void 0)(m),
        constant: (o) => ce((u) => u === o ? o : void 0)(m),
        raw: ce((o) => o)(m),
        object: (o) => ce((u) => {
          if (ge(u))
            return q(u, o);
        })(m),
        array: (o) => ce((u) => {
          if (Array.isArray(u))
            return pe(u, o);
        })(m)
      };
    }
    const he = {
      optional: me(true),
      required: me(false)
    };
    function ee(m, o) {
      const u = he.required.object(o)(m);
      return u.succeeded ? u.value : void 0;
    }
    function X(m) {
      console.warn([
        `Missing '${m.key}' of ${m.target} in ${m.place}.`,
        "Please rebuild plugins with the latest core package."
      ].join(" "));
    }
    function Pe(m) {
      return m && m.parentElement && m.parentElement.removeChild(m), null;
    }
    class fe {
      constructor(o) {
        this.value_ = o;
      }
      static create(o) {
        return [
          new fe(o),
          (u, f) => {
            o.setRawValue(u, f);
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
    function ne(m, o) {
      return F(m, ae(void 0, o));
    }
    class be extends K {
      constructor(o) {
        var u;
        super(o), this.onDisabledChange_ = this.onDisabledChange_.bind(this), this.onParentChange_ = this.onParentChange_.bind(this), this.onParentGlobalDisabledChange_ = this.onParentGlobalDisabledChange_.bind(this), [this.globalDisabled_, this.setGlobalDisabled_] = fe.create(H(this.getGlobalDisabled_())), this.value("disabled").emitter.on("change", this.onDisabledChange_), this.value("parent").emitter.on("change", this.onParentChange_), (u = this.get("parent")) === null || u === void 0 || u.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_);
      }
      static create(o) {
        var u, f, x;
        const T = o ?? {};
        return new be(K.createCore({
          disabled: (u = T.disabled) !== null && u !== void 0 ? u : false,
          disposed: false,
          hidden: (f = T.hidden) !== null && f !== void 0 ? f : false,
          parent: (x = T.parent) !== null && x !== void 0 ? x : null
        }));
      }
      get globalDisabled() {
        return this.globalDisabled_;
      }
      bindClassModifiers(o) {
        S(this.globalDisabled_, ne(o, "disabled")), R(this, "hidden", ne(o, "hidden"));
      }
      bindDisabled(o) {
        S(this.globalDisabled_, (u) => {
          o.disabled = u;
        });
      }
      bindTabIndex(o) {
        S(this.globalDisabled_, (u) => {
          o.tabIndex = u ? -1 : 0;
        });
      }
      handleDispose(o) {
        this.value("disposed").emitter.on("change", (u) => {
          u && o();
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
        var u;
        const f = o.previousRawValue;
        f == null || f.globalDisabled.emitter.off("change", this.onParentGlobalDisabledChange_), (u = this.get("parent")) === null || u === void 0 || u.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_), this.updateGlobalDisabled_();
      }
    }
    function M() {
      return ["veryfirst", "first", "last", "verylast"];
    }
    const le = y(""), Ve = {
      veryfirst: "vfst",
      first: "fst",
      last: "lst",
      verylast: "vlst"
    };
    class Be {
      constructor(o) {
        this.parent_ = null, this.blade = o.blade, this.view = o.view, this.viewProps = o.viewProps;
        const u = this.view.element;
        this.blade.value("positions").emitter.on("change", () => {
          M().forEach((f) => {
            u.classList.remove(le(void 0, Ve[f]));
          }), this.blade.get("positions").forEach((f) => {
            u.classList.add(le(void 0, Ve[f]));
          });
        }), this.viewProps.handleDispose(() => {
          Pe(u);
        });
      }
      get parent() {
        return this.parent_;
      }
      set parent(o) {
        if (this.parent_ = o, !("parent" in this.viewProps.valMap_)) {
          X({
            key: "parent",
            target: be.name,
            place: "BladeController.parent"
          });
          return;
        }
        this.viewProps.set("parent", this.parent_ ? this.parent_.viewProps : null);
      }
    }
    const we = "http://www.w3.org/2000/svg";
    function st(m) {
      m.offsetHeight;
    }
    function jn(m, o) {
      const u = m.style.transition;
      m.style.transition = "none", o(), m.style.transition = u;
    }
    function Ye(m) {
      return m.ontouchstart !== void 0;
    }
    function zn(m) {
      for (; m.childNodes.length > 0; )
        m.removeChild(m.childNodes[0]);
    }
    function cn(m) {
      return m.relatedTarget ? m.relatedTarget : "explicitOriginalTarget" in m ? m.explicitOriginalTarget : null;
    }
    const mt = y("lbl");
    function Mt(m, o) {
      const u = m.createDocumentFragment();
      return o.split(`
`).map((x) => m.createTextNode(x)).forEach((x, T) => {
        T > 0 && u.appendChild(m.createElement("br")), u.appendChild(x);
      }), u;
    }
    class ze {
      constructor(o, u) {
        this.element = o.createElement("div"), this.element.classList.add(mt()), u.viewProps.bindClassModifiers(this.element);
        const f = o.createElement("div");
        f.classList.add(mt("l")), R(u.props, "label", (T) => {
          h(T) ? this.element.classList.add(mt(void 0, "nol")) : (this.element.classList.remove(mt(void 0, "nol")), zn(f), f.appendChild(Mt(o, T)));
        }), this.element.appendChild(f), this.labelElement = f;
        const x = o.createElement("div");
        x.classList.add(mt("v")), this.element.appendChild(x), this.valueElement = x;
      }
    }
    class rt extends Be {
      constructor(o, u) {
        const f = u.valueController.viewProps;
        super(Object.assign(Object.assign({}, u), { view: new ze(o, {
          props: u.props,
          viewProps: f
        }), viewProps: f })), this.props = u.props, this.valueController = u.valueController, this.view.valueElement.appendChild(this.valueController.view.element);
      }
    }
    class un extends Be {
      constructor(o) {
        super(o), this.value = o.value;
      }
    }
    class ft extends K {
      constructor(o) {
        super(o);
      }
      static create(o) {
        const u = {
          completed: true,
          expanded: o,
          expandedHeight: null,
          shouldFixHeight: false,
          temporaryExpanded: null
        }, f = K.createCore(u);
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
      bindExpandedClass(o, u) {
        const f = () => {
          this.styleExpanded ? o.classList.add(u) : o.classList.remove(u);
        };
        R(this, "expanded", f), R(this, "temporaryExpanded", f);
      }
      cleanUpTransition() {
        this.set("shouldFixHeight", false), this.set("expandedHeight", null), this.set("completed", true);
      }
    }
    function Un(m) {
      return ft.create(m);
    }
    function mi(m, o) {
      let u = 0;
      return jn(o, () => {
        m.set("expandedHeight", null), m.set("temporaryExpanded", true), st(o), u = o.clientHeight, m.set("temporaryExpanded", null), st(o);
      }), u;
    }
    function Gn(m, o) {
      o.style.height = m.styleHeight;
    }
    function Hn(m, o) {
      m.value("expanded").emitter.on("beforechange", () => {
        m.set("completed", false), h(m.get("expandedHeight")) && m.set("expandedHeight", mi(m, o)), m.set("shouldFixHeight", true), st(o);
      }), m.emitter.on("change", () => {
        Gn(m, o);
      }), Gn(m, o), o.addEventListener("transitionend", (u) => {
        u.propertyName === "height" && m.cleanUpTransition();
      });
    }
    class xt {
      constructor(o, u) {
        const f = y(u.viewName);
        this.element = o.createElement("div"), this.element.classList.add(f()), u.viewProps.bindClassModifiers(this.element);
      }
    }
    class St extends un {
      constructor(o, u) {
        const f = u.valueController.viewProps;
        super(Object.assign(Object.assign({}, u), { value: u.valueController.value, view: new ze(o, {
          props: u.props,
          viewProps: f
        }), viewProps: f })), this.props = u.props, this.valueController = u.valueController, this.view.valueElement.appendChild(this.valueController.view.element);
      }
    }
    class Kn {
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
      constructor(o, u) {
        this.disabled_ = false, this.timerId_ = null, this.onTick_ = this.onTick_.bind(this), this.doc_ = o, this.emitter = new w(), this.interval_ = u, this.setTimer_();
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
    class $n {
      constructor(o) {
        this.constraints = o;
      }
      constrain(o) {
        return this.constraints.reduce((u, f) => f.constrain(u), o);
      }
    }
    function Et2(m, o) {
      if (m instanceof o)
        return m;
      if (m instanceof $n) {
        const u = m.constraints.reduce((f, x) => f || (x instanceof o ? x : null), null);
        if (u)
          return u;
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
        const u = this.values.get("max"), f = this.values.get("min");
        return Math.min(Math.max(o, f), u);
      }
    }
    class Lt {
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
        const u = this.values.get("max"), f = this.values.get("min");
        let x = o;
        return h(f) || (x = Math.max(x, f)), h(u) || (x = Math.min(x, u)), x;
      }
    }
    class L {
      constructor(o, u = 0) {
        this.step = o, this.origin = u;
      }
      constrain(o) {
        const u = this.origin % this.step, f = Math.round((o - u) / this.step);
        return u + f * this.step;
      }
    }
    const U = y("pop");
    class W {
      constructor(o, u) {
        this.element = o.createElement("div"), this.element.classList.add(U()), u.viewProps.bindClassModifiers(this.element), S(u.shows, F(this.element, U(void 0, "v")));
      }
    }
    class ie {
      constructor(o, u) {
        this.shows = H(false), this.viewProps = u.viewProps, this.view = new W(o, {
          shows: this.shows,
          viewProps: this.viewProps
        });
      }
    }
    const ye = y("txt");
    class De {
      constructor(o, u) {
        this.onChange_ = this.onChange_.bind(this), this.element = o.createElement("div"), this.element.classList.add(ye()), u.viewProps.bindClassModifiers(this.element), this.props_ = u.props, this.props_.emitter.on("change", this.onChange_);
        const f = o.createElement("input");
        f.classList.add(ye("i")), f.type = "text", u.viewProps.bindDisabled(f), this.element.appendChild(f), this.inputElement = f, u.value.emitter.on("change", this.onChange_), this.value_ = u.value, this.refresh();
      }
      refresh() {
        const o = this.props_.get("formatter");
        this.inputElement.value = o(this.value_.rawValue);
      }
      onChange_() {
        this.refresh();
      }
    }
    class Ht {
      constructor(o, u) {
        this.onInputChange_ = this.onInputChange_.bind(this), this.parser_ = u.parser, this.props = u.props, this.value = u.value, this.viewProps = u.viewProps, this.view = new De(o, {
          props: u.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_);
      }
      onInputChange_(o) {
        const f = o.currentTarget.value, x = this.parser_(f);
        h(x) || (this.value.rawValue = x), this.view.refresh();
      }
    }
    function hn(m) {
      return m === "false" ? false : !!m;
    }
    class Ue {
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
    const Ge = {
      "**": (m, o) => Math.pow(m, o),
      "*": (m, o) => m * o,
      "/": (m, o) => m / o,
      "%": (m, o) => m % o,
      "+": (m, o) => m + o,
      "-": (m, o) => m - o,
      "<<": (m, o) => m << o,
      ">>": (m, o) => m >> o,
      ">>>": (m, o) => m >>> o,
      "&": (m, o) => m & o,
      "^": (m, o) => m ^ o,
      "|": (m, o) => m | o
    };
    class qs {
      constructor(o, u, f) {
        this.left = u, this.operator = o, this.right = f;
      }
      evaluate() {
        const o = Ge[this.operator];
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
    const Qs = {
      "+": (m) => m,
      "-": (m) => -m,
      "~": (m) => ~m
    };
    class Zs {
      constructor(o, u) {
        this.operator = o, this.expression = u;
      }
      evaluate() {
        const o = Qs[this.operator];
        if (!o)
          throw new Error(`unexpected unary operator: '${this.operator}`);
        return o(this.expression.evaluate());
      }
      toString() {
        return ["u(", this.operator, this.expression.toString(), ")"].join(" ");
      }
    }
    function fi(m) {
      return (o, u) => {
        for (let f = 0; f < m.length; f++) {
          const x = m[f](o, u);
          if (x !== "")
            return x;
        }
        return "";
      };
    }
    function At(m, o) {
      var u;
      const f = m.substr(o).match(/^\s+/);
      return (u = f && f[0]) !== null && u !== void 0 ? u : "";
    }
    function vi(m, o) {
      const u = m.substr(o, 1);
      return u.match(/^[1-9]$/) ? u : "";
    }
    function je(m, o) {
      var u;
      const f = m.substr(o).match(/^[0-9]+/);
      return (u = f && f[0]) !== null && u !== void 0 ? u : "";
    }
    function bi(m, o) {
      const u = je(m, o);
      if (u !== "")
        return u;
      const f = m.substr(o, 1);
      if (o += 1, f !== "-" && f !== "+")
        return "";
      const x = je(m, o);
      return x === "" ? "" : f + x;
    }
    function ot(m, o) {
      const u = m.substr(o, 1);
      if (o += 1, u.toLowerCase() !== "e")
        return "";
      const f = bi(m, o);
      return f === "" ? "" : u + f;
    }
    function is(m, o) {
      const u = m.substr(o, 1);
      if (u === "0")
        return u;
      const f = vi(m, o);
      return o += f.length, f === "" ? "" : f + je(m, o);
    }
    function dn(m, o) {
      const u = is(m, o);
      if (o += u.length, u === "")
        return "";
      const f = m.substr(o, 1);
      if (o += f.length, f !== ".")
        return "";
      const x = je(m, o);
      return o += x.length, u + f + x + ot(m, o);
    }
    function ss(m, o) {
      const u = m.substr(o, 1);
      if (o += u.length, u !== ".")
        return "";
      const f = je(m, o);
      return o += f.length, f === "" ? "" : u + f + ot(m, o);
    }
    function Xn(m, o) {
      const u = is(m, o);
      return o += u.length, u === "" ? "" : u + ot(m, o);
    }
    const gi = fi([
      dn,
      ss,
      Xn
    ]);
    function _i(m, o) {
      var u;
      const f = m.substr(o).match(/^[01]+/);
      return (u = f && f[0]) !== null && u !== void 0 ? u : "";
    }
    function Ws(m, o) {
      const u = m.substr(o, 2);
      if (o += u.length, u.toLowerCase() !== "0b")
        return "";
      const f = _i(m, o);
      return f === "" ? "" : u + f;
    }
    function Js(m, o) {
      var u;
      const f = m.substr(o).match(/^[0-7]+/);
      return (u = f && f[0]) !== null && u !== void 0 ? u : "";
    }
    function er(m, o) {
      const u = m.substr(o, 2);
      if (o += u.length, u.toLowerCase() !== "0o")
        return "";
      const f = Js(m, o);
      return f === "" ? "" : u + f;
    }
    function tr(m, o) {
      var u;
      const f = m.substr(o).match(/^[0-9a-f]+/i);
      return (u = f && f[0]) !== null && u !== void 0 ? u : "";
    }
    function wi(m, o) {
      const u = m.substr(o, 2);
      if (o += u.length, u.toLowerCase() !== "0x")
        return "";
      const f = tr(m, o);
      return f === "" ? "" : u + f;
    }
    const nr = fi([
      Ws,
      er,
      wi
    ]), ir = fi([
      nr,
      gi
    ]);
    function mn(m, o) {
      const u = ir(m, o);
      return o += u.length, u === "" ? null : {
        evaluable: new Ue(u),
        cursor: o
      };
    }
    function rs(m, o) {
      const u = m.substr(o, 1);
      if (o += u.length, u !== "(")
        return null;
      const f = yi(m, o);
      if (!f)
        return null;
      o = f.cursor, o += At(m, o).length;
      const x = m.substr(o, 1);
      return o += x.length, x !== ")" ? null : {
        evaluable: f.evaluable,
        cursor: o
      };
    }
    function sr(m, o) {
      var u;
      return (u = mn(m, o)) !== null && u !== void 0 ? u : rs(m, o);
    }
    function Yn(m, o) {
      const u = sr(m, o);
      if (u)
        return u;
      const f = m.substr(o, 1);
      if (o += f.length, f !== "+" && f !== "-" && f !== "~")
        return null;
      const x = Yn(m, o);
      return x ? (o = x.cursor, {
        cursor: o,
        evaluable: new Zs(f, x.evaluable)
      }) : null;
    }
    function rr(m, o, u) {
      u += At(o, u).length;
      const f = m.filter((x) => o.startsWith(x, u))[0];
      return f ? (u += f.length, u += At(o, u).length, {
        cursor: u,
        operator: f
      }) : null;
    }
    function Kt(m, o) {
      return (u, f) => {
        const x = m(u, f);
        if (!x)
          return null;
        f = x.cursor;
        let T = x.evaluable;
        for (; ; ) {
          const A = rr(o, u, f);
          if (!A)
            break;
          f = A.cursor;
          const z = m(u, f);
          if (!z)
            return null;
          f = z.cursor, T = new qs(A.operator, T, z.evaluable);
        }
        return T ? {
          cursor: f,
          evaluable: T
        } : null;
      };
    }
    const os = [
      ["**"],
      ["*", "/", "%"],
      ["+", "-"],
      ["<<", ">>>", ">>"],
      ["&"],
      ["^"],
      ["|"]
    ].reduce((m, o) => Kt(m, o), Yn);
    function yi(m, o) {
      return o += At(m, o).length, os(m, o);
    }
    function or(m) {
      const o = yi(m, 0);
      return !o || o.cursor + At(m, o.cursor).length !== m.length ? null : o.evaluable;
    }
    function fn(m) {
      var o;
      const u = or(m);
      return (o = u == null ? void 0 : u.evaluate()) !== null && o !== void 0 ? o : null;
    }
    function ar(m) {
      if (typeof m == "number")
        return m;
      if (typeof m == "string") {
        const o = fn(m);
        if (!h(o))
          return o;
      }
      return 0;
    }
    function Re(m) {
      return (o) => o.toFixed(Math.max(Math.min(m, 20), 0));
    }
    const lr = Re(0);
    function qn(m) {
      return lr(m) + "%";
    }
    function as(m) {
      return String(m);
    }
    function xi(m, o) {
      for (; m.length < o; )
        m.push(void 0);
    }
    function ls(m) {
      const o = [];
      return xi(o, m), H(o);
    }
    function cs(m) {
      const o = m.indexOf(void 0);
      return o < 0 ? m : m.slice(0, o);
    }
    function cr(m, o) {
      const u = [...cs(m), o];
      return u.length > m.length ? u.splice(0, u.length - m.length) : xi(u, m.length), u;
    }
    function $t({ primary: m, secondary: o, forward: u, backward: f }) {
      let x = false;
      function T(A) {
        x || (x = true, A(), x = false);
      }
      m.emitter.on("change", (A) => {
        T(() => {
          o.setRawValue(u(m, o), A.options);
        });
      }), o.emitter.on("change", (A) => {
        T(() => {
          m.setRawValue(f(m, o), A.options);
        }), T(() => {
          o.setRawValue(u(m, o), A.options);
        });
      }), T(() => {
        o.setRawValue(u(m, o), {
          forceEmit: false,
          last: true
        });
      });
    }
    function Xt(m, o) {
      const u = m * (o.altKey ? 0.1 : 1) * (o.shiftKey ? 10 : 1);
      return o.upKey ? +u : o.downKey ? -u : 0;
    }
    function vn(m) {
      return {
        altKey: m.altKey,
        downKey: m.key === "ArrowDown",
        shiftKey: m.shiftKey,
        upKey: m.key === "ArrowUp"
      };
    }
    function Ei(m) {
      return {
        altKey: m.altKey,
        downKey: m.key === "ArrowLeft",
        shiftKey: m.shiftKey,
        upKey: m.key === "ArrowRight"
      };
    }
    function ur(m) {
      return m === "ArrowUp" || m === "ArrowDown";
    }
    function us(m) {
      return ur(m) || m === "ArrowLeft" || m === "ArrowRight";
    }
    function Ci(m, o) {
      var u, f;
      const x = o.ownerDocument.defaultView, T = o.getBoundingClientRect();
      return {
        x: m.pageX - (((u = x && x.scrollX) !== null && u !== void 0 ? u : 0) + T.left),
        y: m.pageY - (((f = x && x.scrollY) !== null && f !== void 0 ? f : 0) + T.top)
      };
    }
    class Qn {
      constructor(o) {
        this.lastTouch_ = null, this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this), this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this), this.onMouseDown_ = this.onMouseDown_.bind(this), this.onTouchEnd_ = this.onTouchEnd_.bind(this), this.onTouchMove_ = this.onTouchMove_.bind(this), this.onTouchStart_ = this.onTouchStart_.bind(this), this.elem_ = o, this.emitter = new w(), o.addEventListener("touchstart", this.onTouchStart_, {
          passive: false
        }), o.addEventListener("touchmove", this.onTouchMove_, {
          passive: true
        }), o.addEventListener("touchend", this.onTouchEnd_), o.addEventListener("mousedown", this.onMouseDown_);
      }
      computePosition_(o) {
        const u = this.elem_.getBoundingClientRect();
        return {
          bounds: {
            width: u.width,
            height: u.height
          },
          point: o ? {
            x: o.x,
            y: o.y
          } : null
        };
      }
      onMouseDown_(o) {
        var u;
        o.preventDefault(), (u = o.currentTarget) === null || u === void 0 || u.focus();
        const f = this.elem_.ownerDocument;
        f.addEventListener("mousemove", this.onDocumentMouseMove_), f.addEventListener("mouseup", this.onDocumentMouseUp_), this.emitter.emit("down", {
          altKey: o.altKey,
          data: this.computePosition_(Ci(o, this.elem_)),
          sender: this,
          shiftKey: o.shiftKey
        });
      }
      onDocumentMouseMove_(o) {
        this.emitter.emit("move", {
          altKey: o.altKey,
          data: this.computePosition_(Ci(o, this.elem_)),
          sender: this,
          shiftKey: o.shiftKey
        });
      }
      onDocumentMouseUp_(o) {
        const u = this.elem_.ownerDocument;
        u.removeEventListener("mousemove", this.onDocumentMouseMove_), u.removeEventListener("mouseup", this.onDocumentMouseUp_), this.emitter.emit("up", {
          altKey: o.altKey,
          data: this.computePosition_(Ci(o, this.elem_)),
          sender: this,
          shiftKey: o.shiftKey
        });
      }
      onTouchStart_(o) {
        o.preventDefault();
        const u = o.targetTouches.item(0), f = this.elem_.getBoundingClientRect();
        this.emitter.emit("down", {
          altKey: o.altKey,
          data: this.computePosition_(u ? {
            x: u.clientX - f.left,
            y: u.clientY - f.top
          } : void 0),
          sender: this,
          shiftKey: o.shiftKey
        }), this.lastTouch_ = u;
      }
      onTouchMove_(o) {
        const u = o.targetTouches.item(0), f = this.elem_.getBoundingClientRect();
        this.emitter.emit("move", {
          altKey: o.altKey,
          data: this.computePosition_(u ? {
            x: u.clientX - f.left,
            y: u.clientY - f.top
          } : void 0),
          sender: this,
          shiftKey: o.shiftKey
        }), this.lastTouch_ = u;
      }
      onTouchEnd_(o) {
        var u;
        const f = (u = o.targetTouches.item(0)) !== null && u !== void 0 ? u : this.lastTouch_, x = this.elem_.getBoundingClientRect();
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
    function Me2(m, o, u, f, x) {
      const T = (m - o) / (u - o);
      return f + T * (x - f);
    }
    function ps(m) {
      return String(m.toFixed(10)).split(".")[1].replace(/0+$/, "").length;
    }
    function Yt(m, o, u) {
      return Math.min(Math.max(m, o), u);
    }
    const qe = y("txt");
    class pr {
      constructor(o, u) {
        this.onChange_ = this.onChange_.bind(this), this.props_ = u.props, this.props_.emitter.on("change", this.onChange_), this.element = o.createElement("div"), this.element.classList.add(qe(), qe(void 0, "num")), u.arrayPosition && this.element.classList.add(qe(void 0, u.arrayPosition)), u.viewProps.bindClassModifiers(this.element);
        const f = o.createElement("input");
        f.classList.add(qe("i")), f.type = "text", u.viewProps.bindDisabled(f), this.element.appendChild(f), this.inputElement = f, this.onDraggingChange_ = this.onDraggingChange_.bind(this), this.dragging_ = u.dragging, this.dragging_.emitter.on("change", this.onDraggingChange_), this.element.classList.add(qe()), this.inputElement.classList.add(qe("i"));
        const x = o.createElement("div");
        x.classList.add(qe("k")), this.element.appendChild(x), this.knobElement = x;
        const T = o.createElementNS(we, "svg");
        T.classList.add(qe("g")), this.knobElement.appendChild(T);
        const A = o.createElementNS(we, "path");
        A.classList.add(qe("gb")), T.appendChild(A), this.guideBodyElem_ = A;
        const z = o.createElementNS(we, "path");
        z.classList.add(qe("gh")), T.appendChild(z), this.guideHeadElem_ = z;
        const oe = o.createElement("div");
        oe.classList.add(y("tt")()), this.knobElement.appendChild(oe), this.tooltipElem_ = oe, u.value.emitter.on("change", this.onChange_), this.value = u.value, this.refresh();
      }
      onDraggingChange_(o) {
        if (o.rawValue === null) {
          this.element.classList.remove(qe(void 0, "drg"));
          return;
        }
        this.element.classList.add(qe(void 0, "drg"));
        const u = o.rawValue / this.props_.get("draggingScale"), f = u + (u > 0 ? -1 : u < 0 ? 1 : 0), x = Yt(-f, -4, 4);
        this.guideHeadElem_.setAttributeNS(null, "d", [`M ${f + x},0 L${f},4 L${f + x},8`, `M ${u},-1 L${u},9`].join(" ")), this.guideBodyElem_.setAttributeNS(null, "d", `M 0,4 L${u},4`);
        const T = this.props_.get("formatter");
        this.tooltipElem_.textContent = T(this.value.rawValue), this.tooltipElem_.style.left = `${u}px`;
      }
      refresh() {
        const o = this.props_.get("formatter");
        this.inputElement.value = o(this.value.rawValue);
      }
      onChange_() {
        this.refresh();
      }
    }
    class bn {
      constructor(o, u) {
        var f;
        this.originRawValue_ = 0, this.onInputChange_ = this.onInputChange_.bind(this), this.onInputKeyDown_ = this.onInputKeyDown_.bind(this), this.onInputKeyUp_ = this.onInputKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.baseStep_ = u.baseStep, this.parser_ = u.parser, this.props = u.props, this.sliderProps_ = (f = u.sliderProps) !== null && f !== void 0 ? f : null, this.value = u.value, this.viewProps = u.viewProps, this.dragging_ = H(null), this.view = new pr(o, {
          arrayPosition: u.arrayPosition,
          dragging: this.dragging_,
          props: this.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_), this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_), this.view.inputElement.addEventListener("keyup", this.onInputKeyUp_);
        const x = new Qn(this.view.knobElement);
        x.emitter.on("down", this.onPointerDown_), x.emitter.on("move", this.onPointerMove_), x.emitter.on("up", this.onPointerUp_);
      }
      constrainValue_(o) {
        var u, f;
        const x = (u = this.sliderProps_) === null || u === void 0 ? void 0 : u.get("minValue"), T = (f = this.sliderProps_) === null || f === void 0 ? void 0 : f.get("maxValue");
        let A = o;
        return x !== void 0 && (A = Math.max(A, x)), T !== void 0 && (A = Math.min(A, T)), A;
      }
      onInputChange_(o) {
        const f = o.currentTarget.value, x = this.parser_(f);
        h(x) || (this.value.rawValue = this.constrainValue_(x)), this.view.refresh();
      }
      onInputKeyDown_(o) {
        const u = Xt(this.baseStep_, vn(o));
        u !== 0 && this.value.setRawValue(this.constrainValue_(this.value.rawValue + u), {
          forceEmit: false,
          last: false
        });
      }
      onInputKeyUp_(o) {
        Xt(this.baseStep_, vn(o)) !== 0 && this.value.setRawValue(this.value.rawValue, {
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
        const u = o.point.x - o.bounds.width / 2;
        return this.constrainValue_(this.originRawValue_ + u * this.props.get("draggingScale"));
      }
      onPointerMove_(o) {
        const u = this.computeDraggingValue_(o.data);
        u !== null && (this.value.setRawValue(u, {
          forceEmit: false,
          last: false
        }), this.dragging_.rawValue = this.value.rawValue - this.originRawValue_);
      }
      onPointerUp_(o) {
        const u = this.computeDraggingValue_(o.data);
        u !== null && (this.value.setRawValue(u, {
          forceEmit: true,
          last: true
        }), this.dragging_.rawValue = null);
      }
    }
    function tt(m, o) {
      m.write(o);
    }
    function qt(m) {
      const o = m ? Et2(m, L) : null;
      return o ? o.step : null;
    }
    function gn(m, o) {
      const u = m && Et2(m, L);
      return u ? ps(u.step) : Math.max(ps(o), 2);
    }
    function Pi(m) {
      const o = qt(m);
      return o ?? 1;
    }
    function Zn(m, o) {
      var u;
      const f = m && Et2(m, L), x = Math.abs((u = f == null ? void 0 : f.step) !== null && u !== void 0 ? u : o);
      return x === 0 ? 0.1 : Math.pow(10, Math.floor(Math.log10(x)) - 1);
    }
    function Qt(m) {
      return [m[0], m[1], m[2]];
    }
    function hs(m) {
      const o = Yt(Math.floor(m), 0, 255).toString(16);
      return o.length === 1 ? `0${o}` : o;
    }
    function _n(m, o = "#") {
      const u = Qt(m.getComponents("rgb")).map(hs).join("");
      return `${o}${u}`;
    }
    function ds(m, o = "#") {
      const u = m.getComponents("rgb"), f = [u[0], u[1], u[2], u[3] * 255].map(hs).join("");
      return `${o}${f}`;
    }
    function hr(m, o) {
      const u = Re(o === "float" ? 2 : 0);
      return `rgb(${Qt(m.getComponents("rgb", o)).map((x) => u(x)).join(", ")})`;
    }
    function ms(m) {
      return (o) => hr(o, m);
    }
    function fs(m, o) {
      const u = Re(2), f = Re(o === "float" ? 2 : 0);
      return `rgba(${m.getComponents("rgb", o).map((T, A) => (A === 3 ? u : f)(T)).join(", ")})`;
    }
    function dr(m) {
      return (o) => fs(o, m);
    }
    function Wn(m) {
      const o = [
        Re(0),
        qn,
        qn
      ];
      return `hsl(${Qt(m.getComponents("hsl")).map((f, x) => o[x](f)).join(", ")})`;
    }
    function mr(m) {
      const o = [
        Re(0),
        qn,
        qn,
        Re(2)
      ];
      return `hsla(${m.getComponents("hsl").map((f, x) => o[x](f)).join(", ")})`;
    }
    function vs(m, o) {
      const u = Re(o === "float" ? 2 : 0), f = ["r", "g", "b"];
      return `{${Qt(m.getComponents("rgb", o)).map((T, A) => `${f[A]}: ${u(T)}`).join(", ")}}`;
    }
    function bs(m) {
      return (o) => vs(o, m);
    }
    function fr(m, o) {
      const u = Re(2), f = Re(o === "float" ? 2 : 0), x = ["r", "g", "b", "a"];
      return `{${m.getComponents("rgb", o).map((A, z) => {
        const oe = z === 3 ? u : f;
        return `${x[z]}: ${oe(A)}`;
      }).join(", ")}}`;
    }
    function vr(m) {
      return (o) => fr(o, m);
    }
    [
      ...["int", "float"].reduce((m, o) => [
        ...m,
        {
          format: {
            alpha: false,
            mode: "rgb",
            notation: "func",
            type: o
          },
          stringifier: ms(o)
        },
        {
          format: {
            alpha: true,
            mode: "rgb",
            notation: "func",
            type: o
          },
          stringifier: dr(o)
        },
        {
          format: {
            alpha: false,
            mode: "rgb",
            notation: "object",
            type: o
          },
          stringifier: bs(o)
        },
        {
          format: {
            alpha: true,
            mode: "rgb",
            notation: "object",
            type: o
          },
          stringifier: vr(o)
        }
      ], [])
    ];
    class br {
      constructor(o) {
        this.components = o.components, this.asm_ = o.assembly;
      }
      constrain(o) {
        const u = this.asm_.toComponents(o).map((f, x) => {
          var T, A;
          return (A = (T = this.components[x]) === null || T === void 0 ? void 0 : T.constrain(f)) !== null && A !== void 0 ? A : f;
        });
        return this.asm_.fromComponents(u);
      }
    }
    const gs = y("pndtxt");
    class gr {
      constructor(o, u) {
        this.textViews = u.textViews, this.element = o.createElement("div"), this.element.classList.add(gs()), this.textViews.forEach((f) => {
          const x = o.createElement("div");
          x.classList.add(gs("a")), x.appendChild(f.element), this.element.appendChild(x);
        });
      }
    }
    function Ti(m, o, u) {
      return new bn(m, {
        arrayPosition: u === 0 ? "fst" : u === o.axes.length - 1 ? "lst" : "mid",
        baseStep: o.axes[u].baseStep,
        parser: o.parser,
        props: o.axes[u].textProps,
        value: H(0, {
          constraint: o.axes[u].constraint
        }),
        viewProps: o.viewProps
      });
    }
    class Rt {
      constructor(o, u) {
        this.value = u.value, this.viewProps = u.viewProps, this.acs_ = u.axes.map((f, x) => Ti(o, u, x)), this.acs_.forEach((f, x) => {
          $t({
            primary: this.value,
            secondary: f.value,
            forward: (T) => u.assembly.toComponents(T.rawValue)[x],
            backward: (T, A) => {
              const z = u.assembly.toComponents(T.rawValue);
              return z[x] = A.rawValue, u.assembly.fromComponents(z);
            }
          });
        }), this.view = new gr(o, {
          textViews: this.acs_.map((f) => f.view)
        });
      }
    }
    function _r(m, o) {
      return "step" in m && !h(m.step) ? new L(m.step, o) : null;
    }
    function wn(m) {
      return !h(m.max) && !h(m.min) ? new vt({
        max: m.max,
        min: m.min
      }) : !h(m.max) || !h(m.min) ? new Lt({
        max: m.max,
        min: m.min
      }) : null;
    }
    const wr = {
      monitor: {
        defaultInterval: 200,
        defaultLineCount: 3
      }
    }, at = y("grl");
    class _s {
      constructor(o, u) {
        this.onCursorChange_ = this.onCursorChange_.bind(this), this.onValueUpdate_ = this.onValueUpdate_.bind(this), this.element = o.createElement("div"), this.element.classList.add(at()), u.viewProps.bindClassModifiers(this.element), this.formatter_ = u.formatter, this.props_ = u.props, this.cursor_ = u.cursor, this.cursor_.emitter.on("change", this.onCursorChange_);
        const f = o.createElementNS(we, "svg");
        f.classList.add(at("g")), f.style.height = `calc(var(--bld-us) * ${u.lineCount})`, this.element.appendChild(f), this.svgElem_ = f;
        const x = o.createElementNS(we, "polyline");
        this.svgElem_.appendChild(x), this.lineElem_ = x;
        const T = o.createElement("div");
        T.classList.add(at("t"), y("tt")()), this.element.appendChild(T), this.tooltipElem_ = T, u.value.emitter.on("change", this.onValueUpdate_), this.value = u.value, this.update_();
      }
      get graphElement() {
        return this.svgElem_;
      }
      update_() {
        const o = this.svgElem_.getBoundingClientRect(), u = this.value.rawValue.length - 1, f = this.props_.get("minValue"), x = this.props_.get("maxValue"), T = [];
        this.value.rawValue.forEach((We, te) => {
          if (We === void 0)
            return;
          const Tt = Me2(te, 0, u, 0, o.width), Vr = Me2(We, f, x, o.height, 0);
          T.push([Tt, Vr].join(","));
        }), this.lineElem_.setAttributeNS(null, "points", T.join(" "));
        const A = this.tooltipElem_, z = this.value.rawValue[this.cursor_.rawValue];
        if (z === void 0) {
          A.classList.remove(at("t", "a"));
          return;
        }
        const oe = Me2(this.cursor_.rawValue, 0, u, 0, o.width), Ze = Me2(z, f, x, o.height, 0);
        A.style.left = `${oe}px`, A.style.top = `${Ze}px`, A.textContent = `${this.formatter_(z)}`, A.classList.contains(at("t", "a")) || (A.classList.add(at("t", "a"), at("t", "in")), st(A), A.classList.remove(at("t", "in")));
      }
      onValueUpdate_() {
        this.update_();
      }
      onCursorChange_() {
        this.update_();
      }
    }
    class yr {
      constructor(o, u) {
        if (this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this), this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this), this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this), this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this), this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this), this.props_ = u.props, this.value = u.value, this.viewProps = u.viewProps, this.cursor_ = H(-1), this.view = new _s(o, {
          cursor: this.cursor_,
          formatter: u.formatter,
          lineCount: u.lineCount,
          props: this.props_,
          value: this.value,
          viewProps: this.viewProps
        }), !Ye(o))
          this.view.element.addEventListener("mousemove", this.onGraphMouseMove_), this.view.element.addEventListener("mouseleave", this.onGraphMouseLeave_);
        else {
          const f = new Qn(this.view.element);
          f.emitter.on("down", this.onGraphPointerDown_), f.emitter.on("move", this.onGraphPointerMove_), f.emitter.on("up", this.onGraphPointerUp_);
        }
      }
      onGraphMouseLeave_() {
        this.cursor_.rawValue = -1;
      }
      onGraphMouseMove_(o) {
        const u = this.view.element.getBoundingClientRect();
        this.cursor_.rawValue = Math.floor(Me2(o.offsetX, 0, u.width, 0, this.value.rawValue.length));
      }
      onGraphPointerDown_(o) {
        this.onGraphPointerMove_(o);
      }
      onGraphPointerMove_(o) {
        if (!o.data.point) {
          this.cursor_.rawValue = -1;
          return;
        }
        this.cursor_.rawValue = Math.floor(Me2(o.data.point.x, 0, o.data.bounds.width, 0, this.value.rawValue.length));
      }
      onGraphPointerUp_() {
        this.cursor_.rawValue = -1;
      }
    }
    class ws {
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
      on(o, u) {
        const f = u.bind(this);
        return this.controller_.emitter.on(o, () => {
          f(new a(this));
        }), this;
      }
    }
    class xr extends a {
      constructor(o, u, f) {
        super(o), this.cell = u, this.index = f;
      }
    }
    class ys extends s {
      constructor(o) {
        super(o), this.cellToApiMap_ = /* @__PURE__ */ new Map(), this.emitter_ = new w();
        const u = this.controller_.valueController;
        u.cellControllers.forEach((f, x) => {
          const T = new ws(f);
          this.cellToApiMap_.set(f, T), f.emitter.on("click", () => {
            const A = x % u.size[0], z = Math.floor(x / u.size[0]);
            this.emitter_.emit("click", {
              event: new xr(this, T, [A, z])
            });
          });
        });
      }
      cell(o, u) {
        const f = this.controller_.valueController, x = f.cellControllers[u * f.size[0] + o];
        return this.cellToApiMap_.get(x);
      }
      on(o, u) {
        const f = u.bind(this);
        return this.emitter_.on(o, (x) => {
          f(x.event);
        }), this;
      }
    }
    class ki {
      constructor(o, u) {
        this.size = u.size;
        const [f, x] = this.size, T = [];
        for (let A = 0; A < x; A++)
          for (let z = 0; z < f; z++) {
            const oe = new G(o, {
              props: K.fromObject(Object.assign({}, u.cellConfig(z, A))),
              viewProps: be.create()
            });
            T.push(oe);
          }
        this.cellCs_ = T, this.viewProps = be.create(), this.viewProps.handleDispose(() => {
          this.cellCs_.forEach((A) => {
            A.viewProps.set("disposed", true);
          });
        }), this.view = new xt(o, {
          viewProps: this.viewProps,
          viewName: "btngrid"
        }), this.view.element.style.gridTemplateColumns = `repeat(${f}, 1fr)`, this.cellCs_.forEach((A) => {
          this.view.element.appendChild(A.view.element);
        });
      }
      get cellControllers() {
        return this.cellCs_;
      }
    }
    const Er = {
      id: "buttongrid",
      type: "blade",
      // TODO:
      css: '.tp-cbzgv,.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-radv_b:hover,.tp-rslv_k:hover,.tp-cbzv_b:hover{background-color:var(--btn-bg-h)}.tp-radv_b:focus,.tp-rslv_k:focus,.tp-cbzv_b:focus{background-color:var(--btn-bg-f)}.tp-radv_b:active,.tp-rslv_k:active,.tp-cbzv_b:active{background-color:var(--btn-bg-a)}.tp-radv_b:disabled,.tp-rslv_k:disabled,.tp-cbzv_b:disabled{opacity:.5}.tp-cbzgv{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-cbzgv:hover{background-color:var(--in-bg-h)}.tp-cbzgv:focus{background-color:var(--in-bg-f)}.tp-cbzgv:active{background-color:var(--in-bg-a)}.tp-cbzgv:disabled{opacity:.5}.tp-btngridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-btngridv.tp-v-disabled{opacity:.5}.tp-btngridv .tp-btnv_b:disabled{opacity:1}.tp-btngridv .tp-btnv_b:disabled .tp-btnv_t{opacity:.5}.tp-btngridv .tp-btnv_b{border-radius:0}.tp-cbzv{position:relative}.tp-cbzv_h{display:flex}.tp-cbzv_b{margin-right:4px;position:relative;width:var(--bld-us)}.tp-cbzv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-cbzv_b svg path{stroke:var(--bs-bg);stroke-width:2}.tp-cbzv_t{flex:1}.tp-cbzv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-cbzv.tp-cbzv-expanded .tp-cbzv_p{margin-top:var(--bld-s);opacity:1}.tp-cbzv.tp-cbzv-cpl .tp-cbzv_p{overflow:visible}.tp-cbzv .tp-popv{left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-cbzpv_t{margin-top:var(--bld-s)}.tp-cbzgv{height:auto;overflow:hidden;position:relative}.tp-cbzgv.tp-v-disabled{opacity:.5}.tp-cbzgv_p{left:16px;position:absolute;right:16px;top:0}.tp-cbzgv_g{cursor:pointer;display:block;height:calc(var(--bld-us)*5);width:100%}.tp-cbzgv_u{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_l{fill:rgba(0,0,0,0);stroke:var(--in-fg)}.tp-cbzgv_v{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_h{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;pointer-events:none;position:absolute;width:4px}.tp-cbzgv:focus .tp-cbzgv_h-sel{background-color:var(--in-fg);border-width:0}.tp-cbzprvv{cursor:pointer;height:4px;padding:4px 0;position:relative}.tp-cbzprvv_g{display:block;height:100%;overflow:visible;width:100%}.tp-cbzprvv_t{opacity:.5;stroke:var(--mo-fg)}.tp-cbzprvv_m{background-color:var(--mo-fg);border-radius:50%;height:4px;margin-left:-2px;margin-top:-2px;opacity:0;position:absolute;top:50%;transition:opacity .2s ease-out;width:4px}.tp-cbzprvv_m.tp-cbzprvv_m-a{opacity:1}.tp-fpsv{position:relative}.tp-fpsv_l{bottom:4px;color:var(--mo-fg);line-height:1;right:4px;pointer-events:none;position:absolute}.tp-fpsv_u{margin-left:.2em;opacity:.7}.tp-rslv{cursor:pointer;padding-left:8px;padding-right:8px}.tp-rslv.tp-v-disabled{opacity:.5}.tp-rslv_t{height:calc(var(--bld-us));position:relative}.tp-rslv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:-4px;right:-4px}.tp-rslv_b{bottom:0;top:0;position:absolute}.tp-rslv_b::before{background-color:var(--in-fg);content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:0;right:0}.tp-rslv_k{height:calc(var(--bld-us) - 8px);margin-top:calc((var(--bld-us) - 8px)/-2);position:absolute;top:50%;width:8px}.tp-rslv_k.tp-rslv_k-min{margin-left:-8px}.tp-rslv_k.tp-rslv_k-max{margin-left:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-min{border-bottom-right-radius:0;border-top-right-radius:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-max{border-bottom-left-radius:0;border-top-left-radius:0}.tp-rsltxtv{display:flex}.tp-rsltxtv_s{flex:1}.tp-rsltxtv_t{flex:1;margin-left:4px}.tp-radv_l{display:block;position:relative}.tp-radv_i{left:0;opacity:0;position:absolute;top:0}.tp-radv_b{opacity:.5}.tp-radv_i:hover+.tp-radv_b{background-color:var(--btn-bg-h)}.tp-radv_i:focus+.tp-radv_b{background-color:var(--btn-bg-f)}.tp-radv_i:active+.tp-radv_b{background-color:var(--btn-bg-a)}.tp-radv_i:checked+.tp-radv_b{opacity:1}.tp-radv_t{bottom:0;color:inherit;left:0;overflow:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0}.tp-radv_i:disabled+.tp-radv_b>.tp-radv_t{opacity:.5}.tp-radgridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-radgridv.tp-v-disabled{opacity:.5}.tp-radgridv .tp-radv_b{border-radius:0}',
      accept(m) {
        const o = he, u = ee(m, {
          cells: o.required.function,
          size: o.required.array(o.required.number),
          view: o.required.constant("buttongrid"),
          label: o.optional.string
        });
        return u ? { params: u } : null;
      },
      controller(m) {
        return new rt(m.document, {
          blade: m.blade,
          props: K.fromObject({
            label: m.params.label
          }),
          valueController: new ki(m.document, {
            cellConfig: m.params.cells,
            size: m.params.size
          })
        });
      },
      api(m) {
        return !(m.controller instanceof rt) || !(m.controller.valueController instanceof ki) ? null : new ys(m.controller);
      }
    };
    class xs extends s {
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
      on(o, u) {
        const f = u.bind(this);
        return this.controller_.valueController.value.emitter.on(o, (x) => {
          f(new c(this, x.rawValue, void 0, x.options.last));
        }), this;
      }
    }
    function Qe(m, o, u) {
      return m * (1 - u) + o * u;
    }
    const Cr = 20, Pr = 1e-3, Mi = 100;
    function Tr(m, o) {
      let u = 0.25, f = 0.5, x = -1;
      for (let T = 0; T < Cr; T++) {
        const [A, z] = m.curve(f);
        if (f += u * (A < o ? 1 : -1), x = z, u *= 0.5, Math.abs(o - A) < Pr)
          break;
      }
      return x;
    }
    class Ct {
      constructor(o = 0, u = 0, f = 1, x = 1) {
        this.cache_ = [], this.comps_ = [o, u, f, x];
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
      static equals(o, u) {
        return o.x1 === u.x1 && o.y1 === u.y1 && o.x2 === u.x2 && o.y2 === u.y2;
      }
      curve(o) {
        const u = Qe(0, this.x1, o), f = Qe(0, this.y1, o), x = Qe(this.x1, this.x2, o), T = Qe(this.y1, this.y2, o), A = Qe(this.x2, 1, o), z = Qe(this.y2, 1, o), oe = Qe(u, x, o), Ze = Qe(f, T, o), We = Qe(x, A, o), te = Qe(T, z, o);
        return [Qe(oe, We, o), Qe(Ze, te, o)];
      }
      y(o) {
        if (this.cache_.length === 0) {
          const u = [];
          for (let f = 0; f < Mi; f++)
            u.push(Tr(this, Me2(f, 0, Mi - 1, 0, 1)));
          this.cache_ = u;
        }
        return this.cache_[Math.round(Me2(Yt(o, 0, 1), 0, 1, 0, Mi - 1))];
      }
      toObject() {
        return [this.comps_[0], this.comps_[1], this.comps_[2], this.comps_[3]];
      }
    }
    const Si = {
      toComponents: (m) => m.toObject(),
      fromComponents: (m) => new Ct(...m)
    };
    function kr(m) {
      const o = Re(2);
      return `cubic-bezier(${m.toObject().map((f) => o(f)).join(", ")})`;
    }
    const Li = [0, 0.5, 0.5, 1];
    function Mr(m) {
      const o = m.match(/^cubic-bezier\s*\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*\)$/);
      if (!o)
        return new Ct(...Li);
      const u = [o[1], o[2], o[3], o[4]].reduce((f, x) => {
        if (!f)
          return null;
        const T = Number(x);
        return isNaN(T) ? null : [...f, T];
      }, []);
      return new Ct(...u ?? Li);
    }
    const It = y("cbz");
    class Es {
      constructor(o, u) {
        this.element = o.createElement("div"), this.element.classList.add(It()), u.viewProps.bindClassModifiers(this.element), u.foldable.bindExpandedClass(this.element, It(void 0, "expanded")), R(u.foldable, "completed", F(this.element, It(void 0, "cpl")));
        const f = o.createElement("div");
        f.classList.add(It("h")), this.element.appendChild(f);
        const x = o.createElement("button");
        x.classList.add(It("b")), u.viewProps.bindDisabled(x);
        const T = o.createElementNS(we, "svg");
        T.innerHTML = '<path d="M2 13C8 13 8 3 14 3"/>', x.appendChild(T), f.appendChild(x), this.buttonElement = x;
        const A = o.createElement("div");
        if (A.classList.add(It("t")), f.appendChild(A), this.textElement = A, u.pickerLayout === "inline") {
          const z = o.createElement("div");
          z.classList.add(It("p")), this.element.appendChild(z), this.pickerElement = z;
        } else
          this.pickerElement = null;
      }
    }
    const Jn = y("cbzp");
    class Cs {
      constructor(o, u) {
        this.element = o.createElement("div"), this.element.classList.add(Jn()), u.viewProps.bindClassModifiers(this.element);
        const f = o.createElement("div");
        f.classList.add(Jn("g")), this.element.appendChild(f), this.graphElement = f;
        const x = o.createElement("div");
        x.classList.add(Jn("t")), this.element.appendChild(x), this.textElement = x;
      }
    }
    function lt(m, o) {
      const u = new MutationObserver((x) => {
        for (const T of x)
          T.type === "childList" && T.addedNodes.forEach((A) => {
            A.contains(A) && (o(), u.disconnect());
          });
      }), f = m.ownerDocument;
      u.observe(f.body, {
        attributes: true,
        childList: true,
        subtree: true
      });
    }
    const bt = y("cbzg");
    function Sr(m, o) {
      return (u) => o(m(u));
    }
    class Ie {
      constructor(o, u) {
        this.element = o.createElement("div"), this.element.classList.add(bt()), u.viewProps.bindClassModifiers(this.element), u.viewProps.bindTabIndex(this.element);
        const f = o.createElement("div");
        f.classList.add(bt("p")), this.element.appendChild(f), this.previewElement = f;
        const x = o.createElementNS(we, "svg");
        x.classList.add(bt("g")), this.element.appendChild(x), this.svgElem_ = x;
        const T = o.createElementNS(we, "path");
        T.classList.add(bt("u")), this.svgElem_.appendChild(T), this.guideElem_ = T;
        const A = o.createElementNS(we, "polyline");
        A.classList.add(bt("l")), this.svgElem_.appendChild(A), this.lineElem_ = A, this.handleElems_ = [o.createElement("div"), o.createElement("div")], this.handleElems_.forEach((z) => {
          z.classList.add(bt("h")), this.element.appendChild(z);
        }), this.vectorElems_ = [
          o.createElementNS(we, "line"),
          o.createElementNS(we, "line")
        ], this.vectorElems_.forEach((z) => {
          z.classList.add(bt("v")), this.svgElem_.appendChild(z);
        }), this.value_ = u.value, this.value_.emitter.on("change", this.onValueChange_.bind(this)), this.sel_ = u.selection, this.handleElems_.forEach((z, oe) => {
          S(this.sel_, Sr((Ze) => Ze === oe, F(z, bt("h", "sel"))));
        }), lt(this.element, () => {
          this.refresh();
        });
      }
      getVertMargin_(o) {
        return o * 0.25;
      }
      valueToPosition(o, u) {
        const f = this.element.getBoundingClientRect(), x = f.width, T = f.height, A = this.getVertMargin_(T);
        return {
          x: Me2(o, 0, 1, 0, x),
          y: Me2(u, 0, 1, T - A, A)
        };
      }
      positionToValue(o, u) {
        const f = this.element.getBoundingClientRect(), x = f.width, T = f.height, A = this.getVertMargin_(T);
        return {
          x: Yt(Me2(o, 0, x, 0, 1), 0, 1),
          y: Me2(u, T - A, A, 0, 1)
        };
      }
      refresh() {
        this.guideElem_.setAttributeNS(null, "d", [0, 1].map((T) => {
          const A = this.valueToPosition(0, T), z = this.valueToPosition(1, T);
          return [`M ${A.x},${A.y}`, `L ${z.x},${z.y}`].join(" ");
        }).join(" "));
        const o = this.value_.rawValue, u = [];
        let f = 0;
        for (; ; ) {
          const T = this.valueToPosition(...o.curve(f));
          if (u.push([T.x, T.y].join(",")), f >= 1)
            break;
          f = Math.min(f + 0.05, 1);
        }
        this.lineElem_.setAttributeNS(null, "points", u.join(" "));
        const x = o.toObject();
        [0, 1].forEach((T) => {
          const A = this.valueToPosition(T, T), z = this.valueToPosition(x[T * 2], x[T * 2 + 1]), oe = this.vectorElems_[T];
          oe.setAttributeNS(null, "x1", String(A.x)), oe.setAttributeNS(null, "y1", String(A.y)), oe.setAttributeNS(null, "x2", String(z.x)), oe.setAttributeNS(null, "y2", String(z.y));
          const Ze = this.handleElems_[T];
          Ze.style.left = `${z.x}px`, Ze.style.top = `${z.y}px`;
        });
      }
      onValueChange_() {
        this.refresh();
      }
    }
    const Ps = 24, yn = 400, Ai = 1e3, Pt = y("cbzprv");
    class Zt {
      constructor(o, u) {
        this.stopped_ = true, this.startTime_ = -1, this.onDispose_ = this.onDispose_.bind(this), this.onTimer_ = this.onTimer_.bind(this), this.onValueChange_ = this.onValueChange_.bind(this), this.element = o.createElement("div"), this.element.classList.add(Pt()), u.viewProps.bindClassModifiers(this.element);
        const f = o.createElementNS(we, "svg");
        f.classList.add(Pt("g")), this.element.appendChild(f), this.svgElem_ = f;
        const x = o.createElementNS(we, "path");
        x.classList.add(Pt("t")), this.svgElem_.appendChild(x), this.ticksElem_ = x;
        const T = o.createElement("div");
        T.classList.add(Pt("m")), this.element.appendChild(T), this.markerElem_ = T, this.value_ = u.value, this.value_.emitter.on("change", this.onValueChange_), u.viewProps.handleDispose(this.onDispose_), lt(this.element, () => {
          this.refresh();
        });
      }
      play() {
        this.stop(), this.updateMarker_(0), this.markerElem_.classList.add(Pt("m", "a")), this.startTime_ = (/* @__PURE__ */ new Date()).getTime() + yn, this.stopped_ = false, requestAnimationFrame(this.onTimer_);
      }
      stop() {
        this.stopped_ = true, this.markerElem_.classList.remove(Pt("m", "a"));
      }
      onDispose_() {
        this.stop();
      }
      updateMarker_(o) {
        const u = this.value_.rawValue.y(Yt(o, 0, 1));
        this.markerElem_.style.left = `${u * 100}%`;
      }
      refresh() {
        const o = this.svgElem_.getBoundingClientRect(), u = o.width, f = o.height, x = [], T = this.value_.rawValue;
        for (let A = 0; A < Ps; A++) {
          const z = Me2(A, 0, Ps - 1, 0, 1), oe = Me2(T.y(z), 0, 1, 0, u);
          x.push(`M ${oe},0 v${f}`);
        }
        this.ticksElem_.setAttributeNS(null, "d", x.join(" "));
      }
      onTimer_() {
        if (this.startTime_ === null)
          return;
        const o = (/* @__PURE__ */ new Date()).getTime() - this.startTime_, u = o / Ai;
        this.updateMarker_(u), o > Ai + yn && this.stop(), this.stopped_ || requestAnimationFrame(this.onTimer_);
      }
      onValueChange_() {
        this.refresh(), this.play();
      }
    }
    function Oe(m, o, u, f) {
      const x = u - m, T = f - o;
      return Math.sqrt(x * x + T * T);
    }
    function xn(m, o, u, f) {
      const x = Oe(m, o, u, f), T = Math.atan2(f - o, u - m), A = Math.round(T / (Math.PI / 4)) * Math.PI / 4;
      return {
        x: m + Math.cos(A) * x,
        y: o + Math.sin(A) * x
      };
    }
    class ct {
      constructor(o, u) {
        this.onKeyDown_ = this.onKeyDown_.bind(this), this.onKeyUp_ = this.onKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.baseStep_ = u.baseStep, this.value = u.value, this.sel_ = H(0), this.viewProps = u.viewProps, this.view = new Ie(o, {
          selection: this.sel_,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.element.addEventListener("keydown", this.onKeyDown_), this.view.element.addEventListener("keyup", this.onKeyUp_), this.prevView_ = new Zt(o, {
          value: this.value,
          viewProps: this.viewProps
        }), this.prevView_.element.addEventListener("mousedown", (x) => {
          x.stopImmediatePropagation(), x.preventDefault(), this.prevView_.play();
        }), this.view.previewElement.appendChild(this.prevView_.element);
        const f = new Qn(this.view.element);
        f.emitter.on("down", this.onPointerDown_), f.emitter.on("move", this.onPointerMove_), f.emitter.on("up", this.onPointerUp_);
      }
      refresh() {
        this.view.refresh(), this.prevView_.refresh(), this.prevView_.play();
      }
      updateValue_(o, u, f) {
        const x = this.sel_.rawValue, T = this.value.rawValue.toObject(), A = this.view.positionToValue(o.x, o.y), z = u ? xn(x, x, A.x, A.y) : A;
        T[x * 2] = z.x, T[x * 2 + 1] = z.y, this.value.setRawValue(new Ct(...T), f);
      }
      onPointerDown_(o) {
        const u = o.data;
        if (!u.point)
          return;
        const f = this.value.rawValue, x = this.view.valueToPosition(f.x1, f.y1), T = Oe(u.point.x, u.point.y, x.x, x.y), A = this.view.valueToPosition(f.x2, f.y2), z = Oe(u.point.x, u.point.y, A.x, A.y);
        this.sel_.rawValue = T <= z ? 0 : 1, this.updateValue_(u.point, o.shiftKey, {
          forceEmit: false,
          last: false
        });
      }
      onPointerMove_(o) {
        const u = o.data;
        u.point && this.updateValue_(u.point, o.shiftKey, {
          forceEmit: false,
          last: false
        });
      }
      onPointerUp_(o) {
        const u = o.data;
        u.point && this.updateValue_(u.point, o.shiftKey, {
          forceEmit: true,
          last: true
        });
      }
      onKeyDown_(o) {
        us(o.key) && o.preventDefault();
        const u = this.sel_.rawValue, f = this.value.rawValue.toObject();
        f[u * 2] += Xt(this.baseStep_, Ei(o)), f[u * 2 + 1] += Xt(this.baseStep_, vn(o)), this.value.setRawValue(new Ct(...f), {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(o) {
        us(o.key) && o.preventDefault();
        const u = Xt(this.baseStep_, Ei(o)), f = Xt(this.baseStep_, vn(o));
        u === 0 && f === 0 || this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    class Ts {
      constructor(o, u) {
        this.value = u.value, this.viewProps = u.viewProps, this.view = new Cs(o, {
          viewProps: this.viewProps
        }), this.gc_ = new ct(o, {
          baseStep: u.axis.baseStep,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.graphElement.appendChild(this.gc_.view.element);
        const f = Object.assign(Object.assign({}, u.axis), { constraint: new Lt({ max: 1, min: 0 }) }), x = Object.assign(Object.assign({}, u.axis), { constraint: void 0 });
        this.tc_ = new Rt(o, {
          assembly: Si,
          axes: [f, x, f, x],
          parser: fn,
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
    class ei {
      constructor(o, u) {
        this.onButtonBlur_ = this.onButtonBlur_.bind(this), this.onButtonClick_ = this.onButtonClick_.bind(this), this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this), this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this), this.value = u.value, this.viewProps = u.viewProps, this.foldable_ = Un(u.expanded), this.view = new Es(o, {
          foldable: this.foldable_,
          pickerLayout: u.pickerLayout,
          viewProps: this.viewProps
        }), this.view.buttonElement.addEventListener("blur", this.onButtonBlur_), this.view.buttonElement.addEventListener("click", this.onButtonClick_), this.tc_ = new Ht(o, {
          parser: Mr,
          props: K.fromObject({
            formatter: kr
          }),
          value: this.value,
          viewProps: this.viewProps
        }), this.view.textElement.appendChild(this.tc_.view.element), this.popC_ = u.pickerLayout === "popup" ? new ie(o, {
          viewProps: this.viewProps
        }) : null;
        const f = new Ts(o, {
          axis: u.axis,
          value: this.value,
          viewProps: this.viewProps
        });
        f.allFocusableElements.forEach((x) => {
          x.addEventListener("blur", this.onPopupChildBlur_), x.addEventListener("keydown", this.onPopupChildKeydown_);
        }), this.pickerC_ = f, this.popC_ ? (this.view.element.appendChild(this.popC_.view.element), this.popC_.view.element.appendChild(this.pickerC_.view.element), S(this.popC_.shows, (x) => {
          x && f.refresh();
        }), $t({
          primary: this.foldable_.value("expanded"),
          secondary: this.popC_.shows,
          forward: (x) => x.rawValue,
          backward: (x, T) => T.rawValue
        })) : this.view.pickerElement && (this.view.pickerElement.appendChild(this.pickerC_.view.element), Hn(this.foldable_, this.view.pickerElement));
      }
      onButtonBlur_(o) {
        if (!this.popC_)
          return;
        const u = o.relatedTarget;
        (!u || !this.popC_.view.element.contains(u)) && (this.popC_.shows.rawValue = false);
      }
      onButtonClick_() {
        this.foldable_.set("expanded", !this.foldable_.get("expanded")), this.foldable_.get("expanded") && this.pickerC_.allFocusableElements[0].focus();
      }
      onPopupChildBlur_(o) {
        if (!this.popC_)
          return;
        const u = this.popC_.view.element, f = cn(o);
        f && u.contains(f) || f && f === this.view.buttonElement && !Ye(u.ownerDocument) || (this.popC_.shows.rawValue = false);
      }
      onPopupChildKeydown_(o) {
        this.popC_ && o.key === "Escape" && (this.popC_.shows.rawValue = false);
      }
    }
    function Ri() {
      return new br({
        assembly: Si,
        components: [0, 1, 2, 3].map((m) => m % 2 === 0 ? new Lt({
          min: 0,
          max: 1
        }) : void 0)
      });
    }
    const Vt = {
      id: "cubic-bezier",
      type: "blade",
      css: '.tp-cbzgv,.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-radv_b:hover,.tp-rslv_k:hover,.tp-cbzv_b:hover{background-color:var(--btn-bg-h)}.tp-radv_b:focus,.tp-rslv_k:focus,.tp-cbzv_b:focus{background-color:var(--btn-bg-f)}.tp-radv_b:active,.tp-rslv_k:active,.tp-cbzv_b:active{background-color:var(--btn-bg-a)}.tp-radv_b:disabled,.tp-rslv_k:disabled,.tp-cbzv_b:disabled{opacity:.5}.tp-cbzgv{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-cbzgv:hover{background-color:var(--in-bg-h)}.tp-cbzgv:focus{background-color:var(--in-bg-f)}.tp-cbzgv:active{background-color:var(--in-bg-a)}.tp-cbzgv:disabled{opacity:.5}.tp-btngridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-btngridv.tp-v-disabled{opacity:.5}.tp-btngridv .tp-btnv_b:disabled{opacity:1}.tp-btngridv .tp-btnv_b:disabled .tp-btnv_t{opacity:.5}.tp-btngridv .tp-btnv_b{border-radius:0}.tp-cbzv{position:relative}.tp-cbzv_h{display:flex}.tp-cbzv_b{margin-right:4px;position:relative;width:var(--bld-us)}.tp-cbzv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-cbzv_b svg path{stroke:var(--bs-bg);stroke-width:2}.tp-cbzv_t{flex:1}.tp-cbzv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-cbzv.tp-cbzv-expanded .tp-cbzv_p{margin-top:var(--bld-s);opacity:1}.tp-cbzv.tp-cbzv-cpl .tp-cbzv_p{overflow:visible}.tp-cbzv .tp-popv{left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-cbzpv_t{margin-top:var(--bld-s)}.tp-cbzgv{height:auto;overflow:hidden;position:relative}.tp-cbzgv.tp-v-disabled{opacity:.5}.tp-cbzgv_p{left:16px;position:absolute;right:16px;top:0}.tp-cbzgv_g{cursor:pointer;display:block;height:calc(var(--bld-us)*5);width:100%}.tp-cbzgv_u{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_l{fill:rgba(0,0,0,0);stroke:var(--in-fg)}.tp-cbzgv_v{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_h{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;pointer-events:none;position:absolute;width:4px}.tp-cbzgv:focus .tp-cbzgv_h-sel{background-color:var(--in-fg);border-width:0}.tp-cbzprvv{cursor:pointer;height:4px;padding:4px 0;position:relative}.tp-cbzprvv_g{display:block;height:100%;overflow:visible;width:100%}.tp-cbzprvv_t{opacity:.5;stroke:var(--mo-fg)}.tp-cbzprvv_m{background-color:var(--mo-fg);border-radius:50%;height:4px;margin-left:-2px;margin-top:-2px;opacity:0;position:absolute;top:50%;transition:opacity .2s ease-out;width:4px}.tp-cbzprvv_m.tp-cbzprvv_m-a{opacity:1}.tp-fpsv{position:relative}.tp-fpsv_l{bottom:4px;color:var(--mo-fg);line-height:1;right:4px;pointer-events:none;position:absolute}.tp-fpsv_u{margin-left:.2em;opacity:.7}.tp-rslv{cursor:pointer;padding-left:8px;padding-right:8px}.tp-rslv.tp-v-disabled{opacity:.5}.tp-rslv_t{height:calc(var(--bld-us));position:relative}.tp-rslv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:-4px;right:-4px}.tp-rslv_b{bottom:0;top:0;position:absolute}.tp-rslv_b::before{background-color:var(--in-fg);content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:0;right:0}.tp-rslv_k{height:calc(var(--bld-us) - 8px);margin-top:calc((var(--bld-us) - 8px)/-2);position:absolute;top:50%;width:8px}.tp-rslv_k.tp-rslv_k-min{margin-left:-8px}.tp-rslv_k.tp-rslv_k-max{margin-left:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-min{border-bottom-right-radius:0;border-top-right-radius:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-max{border-bottom-left-radius:0;border-top-left-radius:0}.tp-rsltxtv{display:flex}.tp-rsltxtv_s{flex:1}.tp-rsltxtv_t{flex:1;margin-left:4px}.tp-radv_l{display:block;position:relative}.tp-radv_i{left:0;opacity:0;position:absolute;top:0}.tp-radv_b{opacity:.5}.tp-radv_i:hover+.tp-radv_b{background-color:var(--btn-bg-h)}.tp-radv_i:focus+.tp-radv_b{background-color:var(--btn-bg-f)}.tp-radv_i:active+.tp-radv_b{background-color:var(--btn-bg-a)}.tp-radv_i:checked+.tp-radv_b{opacity:1}.tp-radv_t{bottom:0;color:inherit;left:0;overflow:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0}.tp-radv_i:disabled+.tp-radv_b>.tp-radv_t{opacity:.5}.tp-radgridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-radgridv.tp-v-disabled{opacity:.5}.tp-radgridv .tp-radv_b{border-radius:0}',
      accept(m) {
        const o = he, u = ee(m, {
          value: o.required.array(o.required.number),
          view: o.required.constant("cubicbezier"),
          expanded: o.optional.boolean,
          label: o.optional.string,
          picker: o.optional.custom((f) => f === "inline" || f === "popup" ? f : void 0)
        });
        return u ? { params: u } : null;
      },
      controller(m) {
        var o, u;
        const f = new Ct(...m.params.value), x = H(f, {
          constraint: Ri(),
          equals: Ct.equals
        }), T = new ei(m.document, {
          axis: {
            baseStep: 0.1,
            textProps: K.fromObject({
              draggingScale: 0.01,
              formatter: Re(2)
            })
          },
          expanded: (o = m.params.expanded) !== null && o !== void 0 ? o : false,
          pickerLayout: (u = m.params.picker) !== null && u !== void 0 ? u : "popup",
          value: x,
          viewProps: m.viewProps
        });
        return new St(m.document, {
          blade: m.blade,
          props: K.fromObject({
            label: m.params.label
          }),
          valueController: T
        });
      },
      api(m) {
        return !(m.controller instanceof St) || !(m.controller.valueController instanceof ei) ? null : new xs(m.controller);
      }
    };
    class _e extends s {
      begin() {
        this.controller_.valueController.begin();
      }
      end() {
        this.controller_.valueController.end();
      }
    }
    const Ii = 20;
    class Se {
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
        const u = this.timestamps_[0];
        return 1e3 * (this.frameCount_ - u.frameCount) / (o - u.time);
      }
      compactTimestamps_() {
        if (this.timestamps_.length <= Ii)
          return;
        const o = this.timestamps_.length - Ii;
        this.timestamps_.splice(0, o);
        const u = this.timestamps_[0].frameCount;
        this.timestamps_.forEach((f) => {
          f.frameCount -= u;
        }), this.frameCount_ -= u;
      }
      end(o) {
        if (this.start_ === null)
          return;
        const u = o.getTime();
        this.duration_ = u - this.start_, this.start_ = null, this.fps_ = this.calculateFps_(u), this.timestamps_.push({
          frameCount: this.frameCount_,
          time: u
        }), ++this.frameCount_, this.compactTimestamps_();
      }
    }
    const Wt = y("fps");
    class He {
      constructor(o, u) {
        this.element = o.createElement("div"), this.element.classList.add(Wt()), u.viewProps.bindClassModifiers(this.element), this.graphElement = o.createElement("div"), this.graphElement.classList.add(Wt("g")), this.element.appendChild(this.graphElement);
        const f = o.createElement("div");
        f.classList.add(Wt("l")), this.element.appendChild(f);
        const x = o.createElement("span");
        x.classList.add(Wt("v")), x.textContent = "--", f.appendChild(x), this.valueElement = x;
        const T = o.createElement("span");
        T.classList.add(Wt("u")), T.textContent = "FPS", f.appendChild(T);
      }
    }
    class Vi {
      constructor(o, u) {
        this.stopwatch_ = new Se(), this.onTick_ = this.onTick_.bind(this), this.ticker_ = u.ticker, this.ticker_.emitter.on("tick", this.onTick_), this.value_ = u.value, this.viewProps = u.viewProps, this.view = new He(o, {
          viewProps: this.viewProps
        }), this.graphC_ = new yr(o, {
          formatter: Re(0),
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
        const o = this.stopwatch_.fps;
        if (o !== null) {
          const u = this.value_.rawValue;
          this.value_.rawValue = cr(u, o), this.view.valueElement.textContent = o.toFixed(0);
        }
      }
    }
    function En(m, o) {
      return o === 0 ? new Kn() : new pn(m, o ?? wr.monitor.defaultInterval);
    }
    const Di = {
      id: "fpsgraph",
      type: "blade",
      accept(m) {
        const o = he, u = ee(m, {
          view: o.required.constant("fpsgraph"),
          interval: o.optional.number,
          label: o.optional.string,
          lineCount: o.optional.number,
          max: o.optional.number,
          min: o.optional.number
        });
        return u ? { params: u } : null;
      },
      controller(m) {
        var o, u, f, x;
        const T = (o = m.params.interval) !== null && o !== void 0 ? o : 500;
        return new rt(m.document, {
          blade: m.blade,
          props: K.fromObject({
            label: m.params.label
          }),
          valueController: new Vi(m.document, {
            lineCount: (u = m.params.lineCount) !== null && u !== void 0 ? u : 2,
            maxValue: (f = m.params.max) !== null && f !== void 0 ? f : 90,
            minValue: (x = m.params.min) !== null && x !== void 0 ? x : 0,
            ticker: En(m.document, T),
            value: ls(80),
            viewProps: m.viewProps
          })
        });
      },
      api(m) {
        return !(m.controller instanceof rt) || !(m.controller.valueController instanceof Vi) ? null : new _e(m.controller);
      }
    };
    class Ke {
      constructor(o, u) {
        this.min = o, this.max = u;
      }
      static isObject(o) {
        if (typeof o != "object" || o === null)
          return false;
        const u = o.min, f = o.max;
        return !(typeof u != "number" || typeof f != "number");
      }
      static equals(o, u) {
        return o.min === u.min && o.max === u.max;
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
    const Oi = {
      fromComponents: (m) => new Ke(m[0], m[1]),
      toComponents: (m) => [m.min, m.max]
    };
    class Cn {
      constructor(o) {
        this.edge = o;
      }
      constrain(o) {
        var u, f, x, T, A, z, oe, Ze;
        if (o.min <= o.max)
          return new Ke((f = (u = this.edge) === null || u === void 0 ? void 0 : u.constrain(o.min)) !== null && f !== void 0 ? f : o.min, (T = (x = this.edge) === null || x === void 0 ? void 0 : x.constrain(o.max)) !== null && T !== void 0 ? T : o.max);
        const We = (o.min + o.max) / 2;
        return new Ke((z = (A = this.edge) === null || A === void 0 ? void 0 : A.constrain(We)) !== null && z !== void 0 ? z : We, (Ze = (oe = this.edge) === null || oe === void 0 ? void 0 : oe.constrain(We)) !== null && Ze !== void 0 ? Ze : We);
      }
    }
    const Ni = y("rsltxt");
    class ti {
      constructor(o, u) {
        this.sliderView_ = u.sliderView, this.textView_ = u.textView, this.element = o.createElement("div"), this.element.classList.add(Ni());
        const f = o.createElement("div");
        f.classList.add(Ni("s")), f.appendChild(this.sliderView_.element), this.element.appendChild(f);
        const x = o.createElement("div");
        x.classList.add(Ni("t")), x.appendChild(this.textView_.element), this.element.appendChild(x);
      }
    }
    const nt = y("rsl");
    class Pn {
      constructor(o, u) {
        this.onSliderPropsChange_ = this.onSliderPropsChange_.bind(this), this.onValueChange_ = this.onValueChange_.bind(this), this.sliderProps_ = u.sliderProps, this.sliderProps_.emitter.on("change", this.onSliderPropsChange_), this.element = o.createElement("div"), this.element.classList.add(nt()), u.viewProps.bindClassModifiers(this.element), this.value_ = u.value, this.value_.emitter.on("change", this.onValueChange_);
        const f = o.createElement("div");
        f.classList.add(nt("t")), this.element.appendChild(f), this.trackElement = f;
        const x = o.createElement("div");
        x.classList.add(nt("b")), f.appendChild(x), this.barElement = x;
        const T = ["min", "max"].map((A) => {
          const z = o.createElement("div");
          return z.classList.add(nt("k"), nt("k", A)), f.appendChild(z), z;
        });
        this.knobElements = [T[0], T[1]], this.update_();
      }
      valueToX_(o) {
        const u = this.sliderProps_.get("minValue"), f = this.sliderProps_.get("maxValue");
        return Yt(Me2(o, u, f, 0, 1), 0, 1) * 100;
      }
      update_() {
        const o = this.value_.rawValue;
        o.length === 0 ? this.element.classList.add(nt(void 0, "zero")) : this.element.classList.remove(nt(void 0, "zero"));
        const u = [this.valueToX_(o.min), this.valueToX_(o.max)];
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
    class Fi {
      constructor(o, u) {
        this.grabbing_ = null, this.grabOffset_ = 0, this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.sliderProps = u.sliderProps, this.viewProps = u.viewProps, this.value = u.value, this.view = new Pn(o, {
          sliderProps: this.sliderProps,
          value: this.value,
          viewProps: u.viewProps
        });
        const f = new Qn(this.view.trackElement);
        f.emitter.on("down", this.onPointerDown_), f.emitter.on("move", this.onPointerMove_), f.emitter.on("up", this.onPointerUp_);
      }
      ofs_() {
        return this.grabbing_ === "min" ? this.view.knobElements[0].getBoundingClientRect().width / 2 : this.grabbing_ === "max" ? -this.view.knobElements[1].getBoundingClientRect().width / 2 : 0;
      }
      valueFromData_(o) {
        if (!o.point)
          return null;
        const u = (o.point.x + this.ofs_()) / o.bounds.width, f = this.sliderProps.get("minValue"), x = this.sliderProps.get("maxValue");
        return Me2(u, 0, 1, f, x);
      }
      onPointerDown_(o) {
        if (!o.data.point)
          return;
        const u = o.data.point.x / o.data.bounds.width, f = this.value.rawValue, x = this.sliderProps.get("minValue"), T = this.sliderProps.get("maxValue"), A = Me2(f.min, x, T, 0, 1), z = Me2(f.max, x, T, 0, 1);
        Math.abs(z - u) <= 0.025 ? this.grabbing_ = "max" : Math.abs(A - u) <= 0.025 ? this.grabbing_ = "min" : u >= A && u <= z ? (this.grabbing_ = "length", this.grabOffset_ = Me2(u - A, 0, 1, 0, T - x)) : u < A ? (this.grabbing_ = "min", this.onPointerMove_(o)) : u > z && (this.grabbing_ = "max", this.onPointerMove_(o));
      }
      applyPointToValue_(o, u) {
        const f = this.valueFromData_(o);
        if (f === null)
          return;
        const x = this.sliderProps.get("minValue"), T = this.sliderProps.get("maxValue");
        if (this.grabbing_ === "min")
          this.value.setRawValue(new Ke(f, this.value.rawValue.max), u);
        else if (this.grabbing_ === "max")
          this.value.setRawValue(new Ke(this.value.rawValue.min, f), u);
        else if (this.grabbing_ === "length") {
          const A = this.value.rawValue.length;
          let z = f - this.grabOffset_, oe = z + A;
          z < x ? (z = x, oe = x + A) : oe > T && (z = T - A, oe = T), this.value.setRawValue(new Ke(z, oe), u);
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
    class gt {
      constructor(o, u) {
        this.value = u.value, this.viewProps = u.viewProps, this.sc_ = new Fi(o, u);
        const f = {
          baseStep: u.baseStep,
          constraint: u.constraint,
          textProps: K.fromObject({
            draggingScale: u.draggingScale,
            formatter: u.formatter
          })
        };
        this.tc_ = new Rt(o, {
          assembly: Oi,
          axes: [f, f],
          parser: u.parser,
          value: this.value,
          viewProps: u.viewProps
        }), this.view = new ti(o, {
          sliderView: this.sc_.view,
          textView: this.tc_.view
        });
      }
      get textController() {
        return this.tc_;
      }
    }
    function ks(m) {
      return Ke.isObject(m) ? new Ke(m.min, m.max) : new Ke(0, 0);
    }
    function Bi(m, o) {
      m.writeProperty("max", o.max), m.writeProperty("min", o.min);
    }
    function Lr(m) {
      const o = [], u = wn(m);
      u && o.push(u);
      const f = _r(m);
      return f && o.push(f), new Cn(new $n(o));
    }
    const ni = {
      id: "input-interval",
      type: "input",
      css: '.tp-cbzgv,.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-radv_b:hover,.tp-rslv_k:hover,.tp-cbzv_b:hover{background-color:var(--btn-bg-h)}.tp-radv_b:focus,.tp-rslv_k:focus,.tp-cbzv_b:focus{background-color:var(--btn-bg-f)}.tp-radv_b:active,.tp-rslv_k:active,.tp-cbzv_b:active{background-color:var(--btn-bg-a)}.tp-radv_b:disabled,.tp-rslv_k:disabled,.tp-cbzv_b:disabled{opacity:.5}.tp-cbzgv{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-cbzgv:hover{background-color:var(--in-bg-h)}.tp-cbzgv:focus{background-color:var(--in-bg-f)}.tp-cbzgv:active{background-color:var(--in-bg-a)}.tp-cbzgv:disabled{opacity:.5}.tp-btngridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-btngridv.tp-v-disabled{opacity:.5}.tp-btngridv .tp-btnv_b:disabled{opacity:1}.tp-btngridv .tp-btnv_b:disabled .tp-btnv_t{opacity:.5}.tp-btngridv .tp-btnv_b{border-radius:0}.tp-cbzv{position:relative}.tp-cbzv_h{display:flex}.tp-cbzv_b{margin-right:4px;position:relative;width:var(--bld-us)}.tp-cbzv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-cbzv_b svg path{stroke:var(--bs-bg);stroke-width:2}.tp-cbzv_t{flex:1}.tp-cbzv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-cbzv.tp-cbzv-expanded .tp-cbzv_p{margin-top:var(--bld-s);opacity:1}.tp-cbzv.tp-cbzv-cpl .tp-cbzv_p{overflow:visible}.tp-cbzv .tp-popv{left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-cbzpv_t{margin-top:var(--bld-s)}.tp-cbzgv{height:auto;overflow:hidden;position:relative}.tp-cbzgv.tp-v-disabled{opacity:.5}.tp-cbzgv_p{left:16px;position:absolute;right:16px;top:0}.tp-cbzgv_g{cursor:pointer;display:block;height:calc(var(--bld-us)*5);width:100%}.tp-cbzgv_u{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_l{fill:rgba(0,0,0,0);stroke:var(--in-fg)}.tp-cbzgv_v{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_h{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;pointer-events:none;position:absolute;width:4px}.tp-cbzgv:focus .tp-cbzgv_h-sel{background-color:var(--in-fg);border-width:0}.tp-cbzprvv{cursor:pointer;height:4px;padding:4px 0;position:relative}.tp-cbzprvv_g{display:block;height:100%;overflow:visible;width:100%}.tp-cbzprvv_t{opacity:.5;stroke:var(--mo-fg)}.tp-cbzprvv_m{background-color:var(--mo-fg);border-radius:50%;height:4px;margin-left:-2px;margin-top:-2px;opacity:0;position:absolute;top:50%;transition:opacity .2s ease-out;width:4px}.tp-cbzprvv_m.tp-cbzprvv_m-a{opacity:1}.tp-fpsv{position:relative}.tp-fpsv_l{bottom:4px;color:var(--mo-fg);line-height:1;right:4px;pointer-events:none;position:absolute}.tp-fpsv_u{margin-left:.2em;opacity:.7}.tp-rslv{cursor:pointer;padding-left:8px;padding-right:8px}.tp-rslv.tp-v-disabled{opacity:.5}.tp-rslv_t{height:calc(var(--bld-us));position:relative}.tp-rslv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:-4px;right:-4px}.tp-rslv_b{bottom:0;top:0;position:absolute}.tp-rslv_b::before{background-color:var(--in-fg);content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:0;right:0}.tp-rslv_k{height:calc(var(--bld-us) - 8px);margin-top:calc((var(--bld-us) - 8px)/-2);position:absolute;top:50%;width:8px}.tp-rslv_k.tp-rslv_k-min{margin-left:-8px}.tp-rslv_k.tp-rslv_k-max{margin-left:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-min{border-bottom-right-radius:0;border-top-right-radius:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-max{border-bottom-left-radius:0;border-top-left-radius:0}.tp-rsltxtv{display:flex}.tp-rsltxtv_s{flex:1}.tp-rsltxtv_t{flex:1;margin-left:4px}.tp-radv_l{display:block;position:relative}.tp-radv_i{left:0;opacity:0;position:absolute;top:0}.tp-radv_b{opacity:.5}.tp-radv_i:hover+.tp-radv_b{background-color:var(--btn-bg-h)}.tp-radv_i:focus+.tp-radv_b{background-color:var(--btn-bg-f)}.tp-radv_i:active+.tp-radv_b{background-color:var(--btn-bg-a)}.tp-radv_i:checked+.tp-radv_b{opacity:1}.tp-radv_t{bottom:0;color:inherit;left:0;overflow:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0}.tp-radv_i:disabled+.tp-radv_b>.tp-radv_t{opacity:.5}.tp-radgridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-radgridv.tp-v-disabled{opacity:.5}.tp-radgridv .tp-radv_b{border-radius:0}',
      accept: (m, o) => {
        if (!Ke.isObject(m))
          return null;
        const u = he, f = ee(o, {
          format: u.optional.function,
          max: u.optional.number,
          min: u.optional.number,
          step: u.optional.number
        });
        return f ? {
          initialValue: new Ke(m.min, m.max),
          params: f
        } : null;
      },
      binding: {
        reader: (m) => ks,
        constraint: (m) => Lr(m.params),
        equals: Ke.equals,
        writer: (m) => Bi
      },
      controller(m) {
        var o;
        const u = m.value, f = m.constraint;
        if (!(f instanceof Cn))
          throw g.shouldNeverHappen();
        const x = (u.rawValue.min + u.rawValue.max) / 2, T = (o = m.params.format) !== null && o !== void 0 ? o : Re(gn(f.edge, x)), A = f.edge && Et2(f.edge, vt);
        if (A)
          return new gt(m.document, {
            baseStep: Pi(f.edge),
            constraint: f.edge,
            draggingScale: Zn(f.edge, x),
            formatter: T,
            parser: fn,
            sliderProps: new K({
              maxValue: A.values.value("max"),
              minValue: A.values.value("min")
            }),
            value: u,
            viewProps: m.viewProps
          });
        const z = {
          baseStep: Pi(f.edge),
          constraint: f.edge,
          textProps: K.fromObject({
            draggingScale: x,
            formatter: T
          })
        };
        return new Rt(m.document, {
          assembly: Oi,
          axes: [z, z],
          parser: fn,
          value: u,
          viewProps: m.viewProps
        });
      }
    };
    class Dt {
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
    class Ot extends c {
      constructor(o, u, f, x, T) {
        super(o, x, T), this.cell = u, this.index = f;
      }
    }
    class Tn extends s {
      constructor(o) {
        super(o), this.cellToApiMap_ = /* @__PURE__ */ new Map(), this.controller_.valueController.cellControllers.forEach((f) => {
          const x = new Dt(f);
          this.cellToApiMap_.set(f, x);
        });
      }
      get value() {
        return this.controller_.value;
      }
      cell(o, u) {
        const f = this.controller_.valueController, x = f.cellControllers[u * f.size[0] + o];
        return this.cellToApiMap_.get(x);
      }
      on(o, u) {
        const f = u.bind(this);
        this.controller_.value.emitter.on(o, (x) => {
          const T = this.controller_.valueController, A = T.findCellByValue(x.rawValue);
          if (!A)
            return;
          const z = this.cellToApiMap_.get(A);
          if (!z)
            return;
          const oe = T.cellControllers.indexOf(A);
          f(new Ot(this, z, [oe % T.size[0], Math.floor(oe / T.size[0])], x.rawValue, void 0));
        });
      }
    }
    const kn = y("rad");
    class Ms {
      constructor(o, u) {
        this.element = o.createElement("div"), this.element.classList.add(kn()), u.viewProps.bindClassModifiers(this.element);
        const f = o.createElement("label");
        f.classList.add(kn("l")), this.element.appendChild(f);
        const x = o.createElement("input");
        x.classList.add(kn("i")), x.name = u.name, x.type = "radio", u.viewProps.bindDisabled(x), f.appendChild(x), this.inputElement = x;
        const T = o.createElement("div");
        T.classList.add(kn("b")), f.appendChild(T);
        const A = o.createElement("div");
        A.classList.add(kn("t")), T.appendChild(A), R(u.props, "title", (z) => {
          A.textContent = z;
        });
      }
    }
    class Ss {
      constructor(o, u) {
        this.props = u.props, this.viewProps = u.viewProps, this.view = new Ms(o, {
          name: u.name,
          props: this.props,
          viewProps: this.viewProps
        });
      }
    }
    class ii {
      constructor(o, u) {
        this.cellCs_ = [], this.cellValues_ = [], this.onCellInputChange_ = this.onCellInputChange_.bind(this), this.size = u.size;
        const [f, x] = this.size;
        for (let T = 0; T < x; T++)
          for (let A = 0; A < f; A++) {
            const z = new Ss(o, {
              name: u.groupName,
              props: K.fromObject(Object.assign({}, u.cellConfig(A, T))),
              viewProps: be.create()
            });
            this.cellCs_.push(z), this.cellValues_.push(u.cellConfig(A, T).value);
          }
        this.value = u.value, S(this.value, (T) => {
          const A = this.findCellByValue(T);
          A && (A.view.inputElement.checked = true);
        }), this.viewProps = be.create(), this.view = new xt(o, {
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
        const u = this.cellValues_.findIndex((f) => f === o);
        return u < 0 ? null : this.cellCs_[u];
      }
      onCellInputChange_(o) {
        const u = o.currentTarget, f = this.cellCs_.findIndex((x) => x.view.inputElement === u);
        f < 0 || (this.value.rawValue = this.cellValues_[f]);
      }
    }
    const Nt = function() {
      return {
        id: "radiogrid",
        type: "blade",
        accept(m) {
          const o = he, u = ee(m, {
            cells: o.required.function,
            groupName: o.required.string,
            size: o.required.array(o.required.number),
            value: o.required.raw,
            view: o.required.constant("radiogrid"),
            label: o.optional.string
          });
          return u ? { params: u } : null;
        },
        controller(m) {
          return new St(m.document, {
            blade: m.blade,
            props: K.fromObject({
              label: m.params.label
            }),
            valueController: new ii(m.document, {
              groupName: m.params.groupName,
              cellConfig: m.params.cells,
              size: m.params.size,
              value: H(m.params.value)
            })
          });
        },
        api(m) {
          return !(m.controller instanceof St) || !(m.controller.valueController instanceof ii) ? null : new Tn(m.controller);
        }
      };
    }();
    function ji(m) {
      return {
        id: "input-radiogrid",
        type: "input",
        accept(o, u) {
          if (!m.isType(o))
            return null;
          const f = he, x = ee(u, {
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
        binding: m.binding,
        controller: (o) => new ii(o.document, {
          cellConfig: o.params.cells,
          groupName: o.params.groupName,
          size: o.params.size,
          value: o.value
        })
      };
    }
    const Ar = ji({
      isType: (m) => typeof m == "number",
      binding: {
        reader: (m) => ar,
        writer: (m) => tt
      }
    }), Rr = ji({
      isType: (m) => typeof m == "string",
      binding: {
        reader: (m) => as,
        writer: (m) => tt
      }
    }), Ir = ji({
      isType: (m) => typeof m == "boolean",
      binding: {
        reader: (m) => hn,
        writer: (m) => tt
      }
    }), Ls = [
      Er,
      Vt,
      Di,
      ni,
      Nt,
      Ir,
      Ar,
      Rr
    ];
    r.ButtonCellApi = ws, r.ButtonGridApi = ys, r.ButtonGridController = ki, r.CubicBezier = Ct, r.CubicBezierApi = xs, r.CubicBezierAssembly = Si, r.CubicBezierController = ei, r.CubicBezierGraphController = ct, r.CubicBezierGraphView = Ie, r.CubicBezierPickerController = Ts, r.CubicBezierPickerView = Cs, r.CubicBezierPreviewView = Zt, r.CubicBezierView = Es, r.FpsGraphBladeApi = _e, r.FpsGraphController = Vi, r.FpsView = He, r.Fpswatch = Se, r.Interval = Ke, r.IntervalAssembly = Oi, r.IntervalConstraint = Cn, r.RadioCellApi = Dt, r.RadioController = Ss, r.RadioGridApi = Tn, r.RadioGridController = ii, r.RadioView = Ms, r.RangeSliderController = Fi, r.RangeSliderTextController = gt, r.RangeSliderTextView = ti, r.RangeSliderView = Pn, r.TpRadioGridChangeEvent = Ot, r.plugins = Ls, Object.defineProperty(r, "__esModule", { value: true });
  });
})(Oh, ts);
var Nh = dh(ts);
var Fh = Gu({
  __proto__: null,
  default: Nh
}, [ts]);
var In;
var Ns;
var Sd = (v = "tres-container") => {
  In || (In = new Gs.Pane({
    container: document.querySelector(v) || void 0
  }), In.registerPlugin(Fh), Ns = In.addBlade({
    view: "fpsgraph",
    label: "fpsgraph"
  }));
  function n() {
    In && In.dispose();
  }
  return onMounted(() => {
    const { onBeforeLoop: r, onAfterLoop: s, resume: a } = Me();
    a(), r(() => Ns.begin()), s(() => Ns.end());
  }), onUnmounted(() => {
    n();
  }), { pane: In, fpsGraph: Ns, disposeTweakPane: n };
};
function Ld(v, n) {
  const r = ref(n), s = new AnimationMixer(r.value), a = shallowReactive({});
  v.forEach((p) => {
    const h = s.clipAction(p, r.value);
    a[p.name] = h;
  });
  const { onLoop: c } = Me();
  return c(({ delta: p }) => {
    s.update(p);
  }), {
    actions: a,
    mixer: s
  };
}
var Fs = null;
function Bh(v, n) {
  return (r) => {
    n && n(r), v.draco && (Fs || (Fs = new fh()), Fs.setDecoderPath(v.decoderPath || "https://www.gstatic.com/draco/versioned/decoders/1.4.3/"), r.setDRACOLoader(Fs));
  };
}
async function jh(v, n = {
  draco: false
}, r) {
  return await Et(mp, v, Bh(n, r));
}
var Ad = defineComponent({
  name: "GLTFModel",
  props: ["path", "draco", "decoderPath"],
  async setup(v, { expose: n }) {
    const { state: r } = Gt(), s = ref();
    n({ model: s });
    const { scene: a } = await jh(v.path, { draco: v.draco, decoderPath: v.decoderPath });
    return s.value = a, r.scene && r.scene.add(a), () => {
    };
  }
});
async function zh(v) {
  return await Et(Wp, v);
}
var Rd = defineComponent({
  name: "FBXModel",
  props: ["path"],
  async setup(v, { expose: n }) {
    const { state: r } = Gt();
    let s = null;
    function a() {
      return s;
    }
    return n({ getModel: a }), s = await zh(v.path), r.scene && s.isObject3D && r.scene.add(s), () => {
    };
  }
});
var Uh = { key: 0 };
var Gh = ["args", "center"];
var Id = defineComponent({
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
  async setup(v) {
    let n, r;
    const s = v, { extend: a } = Gt();
    a({ TextGeometry: Hp });
    const c = new uh(), p = useSlots(), h = computed(() => {
      var w;
      return s.text ? s.text : p.default ? (w = p.default()[0].children) == null ? void 0 : w.trim() : "TresJS";
    }), d = ([n, r] = withAsyncContext(() => new Promise((w, _) => {
      try {
        typeof s.font == "string" ? c.load(s.font, (y) => {
          w(y);
        }) : w(s.font);
      } catch (y) {
        _(console.error("cientos", y));
      }
    })), n = await n, r(), n), g = computed(() => ({
      font: d,
      size: s.size,
      height: s.height,
      curveSegments: s.curveSegments,
      bevelEnabled: s.bevelEnabled,
      bevelThickness: s.bevelThickness,
      bevelSize: s.bevelSize,
      bevelOffset: s.bevelOffset,
      bevelSegments: s.bevelSegments
    }));
    return (w, _) => unref(d) ? (openBlock(), createElementBlock("TresMesh", Uh, [
      unref(h) ? (openBlock(), createElementBlock("TresTextGeometry", {
        key: 0,
        args: [unref(h), unref(g)],
        center: v.center
      }, null, 8, Gh)) : createCommentVNode("", true),
      renderSlot(w.$slots, "default")
    ])) : createCommentVNode("", true);
  }
});
var Hh = ["rotation"];
var Kh = ["args"];
var $h = ["color"];
var Vd = defineComponent({
  __name: "Plane",
  props: {
    args: { default: () => [1, 1] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const r = shallowRef();
    return n({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "planeRef",
      ref: r,
      rotation: [-Math.PI / 2, 0, 0]
    }, s.$attrs), [
      createBaseVNode("TresPlaneGeometry", { args: v.args }, null, 8, Kh),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, $h)
      ])
    ], 16, Hh));
  }
});
var Xh = ["args"];
var Yh = ["color"];
var Dd = defineComponent({
  __name: "Box",
  props: {
    args: { default: () => [1, 1, 1] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const r = shallowRef();
    return n({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "boxRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresBoxGeometry", { args: v.args }, null, 8, Xh),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, Yh)
      ])
    ], 16));
  }
});
var qh = ["args"];
var Qh = ["color"];
var Od = defineComponent({
  __name: "Sphere",
  props: {
    args: { default: () => [2, 32, 16] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const r = shallowRef();
    return n({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "sphereRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresSphereGeometry", { args: v.args }, null, 8, qh),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, Qh)
      ])
    ], 16));
  }
});
var Zh = ["args"];
var Wh = ["color"];
var Nd = defineComponent({
  __name: "Torus",
  props: {
    args: { default: () => [1, 1, 16, 80] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const r = shallowRef();
    return n({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "torusRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresTorusGeometry", { args: v.args }, null, 8, Zh),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, Wh)
      ])
    ], 16));
  }
});
var Jh = ["args"];
var ed = ["color"];
var Fd = defineComponent({
  __name: "TorusKnot",
  props: {
    args: { default: () => [1, 0.4, 64, 8] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const r = shallowRef();
    return n({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "torusKnotRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresTorusKnotGeometry", { args: v.args }, null, 8, Jh),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, ed)
      ])
    ], 16));
  }
});
var td = ["args"];
var nd = ["color"];
var Bd = defineComponent({
  __name: "Circle",
  props: {
    args: { default: () => [1, 32, 0, Math.PI * 2] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const r = shallowRef();
    return n({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "circleRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresCircleGeometry", { args: v.args }, null, 8, td),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, nd)
      ])
    ], 16));
  }
});
var id = ["args"];
var sd = ["color"];
var jd = defineComponent({
  __name: "Cone",
  props: {
    args: { default: () => [1, 1, 12, false, 0, Math.PI * 2] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const r = shallowRef();
    return n({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "coneRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresConeGeometry", { args: v.args }, null, 8, id),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, sd)
      ])
    ], 16));
  }
});
var rd = ["args"];
var od = ["color"];
var zd = defineComponent({
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
    const r = shallowRef();
    return n({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "tubeRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresTubeGeometry", { args: v.args }, null, 8, rd),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, od)
      ])
    ], 16));
  }
});
var ad = ["args"];
var ld = ["color"];
var Ud = defineComponent({
  __name: "Ring",
  props: {
    args: { default: () => [0.5, 1, 32] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const r = shallowRef();
    return n({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "ringRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresRingGeometry", { args: v.args }, null, 8, ad),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, ld)
      ])
    ], 16));
  }
});
var cd = ["rotation"];
var ud = ["args"];
var pd = ["color"];
var Gd = defineComponent({
  __name: "Tetrahedron",
  props: {
    args: { default: () => [1, 0] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const r = shallowRef();
    return n({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "tetrahedronRef",
      ref: r,
      rotation: [-Math.PI / 2, 0, 0]
    }, s.$attrs), [
      createBaseVNode("TresTetrahedronGeometry", { args: v.args }, null, 8, ud),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, pd)
      ])
    ], 16, cd));
  }
});
var hd = ["args"];
var dd = ["color"];
var Hd = defineComponent({
  __name: "Icosahedron",
  props: {
    args: { default: () => [1, 0] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const r = shallowRef();
    return n({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "icosahedronRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresIcosahedronGeometry", { args: v.args }, null, 8, hd),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, dd)
      ])
    ], 16));
  }
});
var md = ["args"];
var fd = ["color"];
var Kd = defineComponent({
  __name: "Octahedron",
  props: {
    args: { default: () => [1, 0] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const r = shallowRef();
    return n({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "octahedronRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresOctahedronGeometry", { args: v.args }, null, 8, md),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, fd)
      ])
    ], 16));
  }
});
var vd = ["args"];
var bd = ["color"];
var $d = defineComponent({
  __name: "Dodecahedron",
  props: {
    args: { default: () => [1, 0] },
    color: { default: "0xffffff" }
  },
  setup(v, { expose: n }) {
    const r = shallowRef();
    return n({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "dodecahedronRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresDodecahedronGeometry", { args: v.args }, null, 8, vd),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: v.color }, null, 8, bd)
      ])
    ], 16));
  }
});
var ao = {
  sunset: "venice/venice_sunset_4k.hdr"
};
async function gd({
  files: v = ["/px.png", "/nx.png", "/py.png", "/ny.png", "/pz.png", "/nz.png"],
  blur: n = 0,
  background: r = false,
  path: s = "/",
  preset: a = void 0,
  encoding: c = void 0
}) {
  const { state: p } = Gt();
  if (a) {
    if (!(a in ao))
      throw new Error("Preset must be one of: " + Object.keys(ao).join(", "));
    v = ao[a], s = "https://raw.githubusercontent.com/Tresjs/assets/main/textures/hdr/";
  }
  const h = Array.isArray(v), g = await Et(
    h ? CubeTextureLoader : mh,
    h ? [v] : v,
    (_) => {
      s && _.setPath(s), c && (_.encoding = c);
    }
  ), w = h ? g[0] : g;
  return w && (w.mapping = h ? CubeReflectionMapping : EquirectangularReflectionMapping, w.encoding = c ?? h ? sRGBEncoding : LinearEncoding), p.scene && (p.scene.environment = w, r !== void 0 && (p.scene.background = w), n && (p.scene.backgroundBlurriness = n | 0)), w;
}
var Xd = defineComponent({
  name: "Environment",
  props: ["background", "blur", "files", "encoding", "path", "preset"],
  async setup(v, { expose: n }) {
    let r = null;
    return n({ getTexture: () => r }), r = await gd(v), () => {
    };
  }
});
var _d = class extends MeshStandardMaterial {
  constructor(r = {}) {
    super(r);
    Zr(this, "_time");
    Zr(this, "_factor");
    this.setValues(r), this._time = { value: 0 }, this._factor = { value: 1 };
  }
  onBeforeCompile(r) {
    r.uniforms.time = this._time, r.uniforms.factor = this._factor, r.vertexShader = `
        uniform float time;
        uniform float factor;
        ${r.vertexShader}
      `, r.vertexShader = r.vertexShader.replace(
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
  set time(r) {
    this._time.value = r;
  }
  get factor() {
    return this._factor.value;
  }
  set factor(r) {
    this._factor.value = r;
  }
};
var wd = ["factor"];
var Yd = defineComponent({
  __name: "index",
  props: {
    speed: { default: 1 },
    factor: { default: 1 }
  },
  setup(v) {
    const n = v, r = shallowRef(), { extend: s } = Gt();
    s({ MeshWobbleMaterial: _d });
    const { onLoop: a } = Me();
    return watchEffect(() => {
      console.log(r.value);
    }), a(({ elapsed: c }) => {
      r.value && (r.value.time = c * (n == null ? void 0 : n.speed));
    }), (c, p) => (openBlock(), createElementBlock("TresMeshWobbleMaterial", mergeProps({
      ref_key: "materialRef",
      ref: r,
      factor: v.factor
    }, c.$attrs), null, 16, wd));
  }
});
export {
  Dd as Box,
  Bd as Circle,
  jd as Cone,
  $d as Dodecahedron,
  Xd as Environment,
  Rd as FBXModel,
  Ad as GLTFModel,
  Hd as Icosahedron,
  Yd as MeshWobbleMaterial,
  Kd as Octahedron,
  Pd as OrbitControls,
  Md as PamCameraMouse,
  Vd as Plane,
  Td as PointerLockControls,
  Ud as Ring,
  Od as Sphere,
  Gd as Tetrahedron,
  Id as Text3D,
  Nd as Torus,
  Fd as TorusKnot,
  kd as TransformControls,
  zd as Tube,
  Ld as useAnimations,
  gd as useEnvironment,
  zh as useFBX,
  jh as useGLTF,
  Vh as usePamCameraMouse,
  Sd as useTweakPane
};
/*! Bundled license information:

@tresjs/cientos/dist/trescientos.js:
  (*! Tweakpane 3.1.7 (c) 2016 cocopon, licensed under the MIT license. *)
*/
//# sourceMappingURL=@tresjs_cientos.js.map
