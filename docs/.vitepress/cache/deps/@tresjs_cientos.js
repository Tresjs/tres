import {
  createEventHook,
  toValue,
  unrefElement,
  useDevicePixelRatio,
  useElementSize,
  useEventListener,
  useRafFn,
  useWindowSize
} from "./chunk-YZCJI2S3.js";
import {
  Fragment,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createRenderer,
  customRef,
  defineComponent,
  getCurrentInstance,
  getCurrentScope,
  guardReactiveProps,
  h,
  inject,
  mergeProps,
  nextTick,
  normalizeProps,
  onMounted,
  onScopeDispose,
  onUnmounted,
  openBlock,
  provide,
  readonly,
  ref,
  renderList,
  renderSlot,
  resolveComponent,
  shallowReactive,
  shallowRef,
  toRef,
  toRefs,
  unref,
  useSlots,
  watch,
  watchEffect,
  withAsyncContext
} from "./chunk-LZPJ5JBW.js";
import {
  ACESFilmicToneMapping,
  AmbientLight,
  AnimationClip,
  AnimationMixer,
  Bone,
  Box3,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  ClampToEdgeWrapping,
  Clock,
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
  InstancedMesh,
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
  LinearSRGBColorSpace,
  Loader,
  LoaderUtils,
  LoadingManager,
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
  NoToneMapping,
  NumberKeyframeTrack,
  Object3D,
  OctahedronGeometry,
  OrthographicCamera,
  PCFShadowMap,
  PCFSoftShadowMap,
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
  SRGBColorSpace,
  Scene,
  ShapePath,
  Skeleton,
  SkinnedMesh,
  Sphere,
  SphereGeometry,
  Spherical,
  SpotLight,
  TOUCH,
  Texture,
  TextureLoader,
  TorusGeometry,
  TriangleFanDrawMode,
  TriangleStripDrawMode,
  TrianglesDrawMode,
  Uint16BufferAttribute,
  Vector2,
  Vector3,
  Vector4,
  VectorKeyframeTrack,
  WebGLRenderer,
  sRGBEncoding,
  three_module_exports
} from "./chunk-PDZK3SQX.js";
import "./chunk-JC4IRQUL.js";

// dist/tres.js
var Ce = ref({ uuid: MathUtils.generateUUID() });
var Me = (e) => void Object.assign(Ce.value, e);
var Ze = ((e) => (e.Perspective = "Perspective", e.Orthographic = "Orthographic", e))(Ze || {});
var et = 45;
var A;
function xe() {
  const { state: e, setState: t, aspectRatio: o } = _();
  function a(s = "Perspective", f) {
    var u, m, g;
    if (s === "Perspective") {
      const { near: w, far: C, fov: h2 } = f || {
        near: 0.1,
        far: 1e3,
        fov: et
      };
      A = new PerspectiveCamera(h2, ((u = e.aspectRatio) == null ? void 0 : u.value) || window.innerWidth / window.innerHeight, w, C), (m = e.cameras) == null || m.push(A);
    } else {
      const { left: w, right: C, top: h2, bottom: P2, near: M, far: O } = f || {
        left: -100,
        right: 100,
        top: 100,
        bottom: -100,
        near: 0.1,
        far: 1e3
      };
      A = new OrthographicCamera(w, C, h2, P2, M, O), (g = e.cameras) == null || g.push(A);
    }
    return e.camera = A, t("camera", e.camera), A;
  }
  function n() {
    var s;
    e.camera instanceof PerspectiveCamera && e.aspectRatio && (e.camera.aspect = e.aspectRatio.value), (s = e.camera) == null || s.updateProjectionMatrix();
  }
  function r(s) {
    var f;
    (f = e.cameras) == null || f.push(s), s instanceof PerspectiveCamera && e.aspectRatio && (s.aspect = e.aspectRatio.value), s.updateProjectionMatrix(), t("camera", s);
  }
  function c(s) {
    var f;
    ((f = e.cameras) == null ? void 0 : f.length) === 0 && r(s);
  }
  function i() {
    e.cameras = [];
  }
  return watchEffect(() => {
    o != null && o.value && n();
  }), {
    activeCamera: toRef(e, "camera"),
    createCamera: a,
    updateCamera: n,
    pushCamera: r,
    clearCameras: i,
    setFirstCamera: c
  };
}
var Re = createEventHook();
var Ee = createEventHook();
var X = createEventHook();
var D = new Clock();
var H = 0;
var U = 0;
var { pause: tt, resume: at, isActive: nt } = useRafFn(
  () => {
    Re.trigger({ delta: H, elapsed: U, clock: D }), Ee.trigger({ delta: H, elapsed: U, clock: D }), X.trigger({ delta: H, elapsed: U, clock: D });
  },
  { immediate: false }
);
X.on(() => {
  H = D.getDelta(), U = D.getElapsedTime();
});
function Pe() {
  return {
    onBeforeLoop: Re.on,
    onLoop: Ee.on,
    onAfterLoop: X.on,
    pause: tt,
    resume: at,
    isActive: nt
  };
}
function rt(e) {
  return e instanceof Color ? e : Array.isArray(e) ? new Color(...e) : new Color(e);
}
var K = {
  realistic: {
    outputColorSpace: SRGBColorSpace,
    toneMapping: ACESFilmicToneMapping,
    toneMappingExposure: 3,
    shadowMap: {
      enabled: true,
      type: PCFSoftShadowMap
    }
  }
};
var Se = (e, t) => {
  for (const o of Object.keys(t))
    t[o] instanceof Object && Object.assign(t[o], Se(e[o], t[o]));
  return Object.assign(e || {}, t), e;
};
var ot = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
var it = st(ot);
function V(e) {
  return e.replace(/-([a-z])/g, (t, o) => o.toUpperCase());
}
function st(e, t) {
  const o = /* @__PURE__ */ Object.create(null), a = e.split(",");
  for (let n = 0; n < a.length; n++)
    o[a[n]] = true;
  return t ? (n) => !!o[n.toLowerCase()] : (n) => !!o[n];
}
function ct(e) {
  var te, ae;
  const t = shallowRef(), o = ref(false), {
    alpha: a = true,
    antialias: n = true,
    depth: r,
    logarithmicDepthBuffer: c,
    failIfMajorPerformanceCaveat: i,
    precision: s,
    premultipliedAlpha: f,
    stencil: u,
    shadows: m = false,
    shadowMapType: g = PCFShadowMap,
    useLegacyLights: w = false,
    outputColorSpace: C = LinearSRGBColorSpace,
    toneMapping: h2 = NoToneMapping,
    toneMappingExposure: P2 = 1,
    context: M = void 0,
    powerPreference: O = "default",
    preserveDrawingBuffer: S = false,
    clearColor: d,
    windowSize: b = false,
    preset: y = void 0
  } = toRefs(e), { state: v, setState: T } = _(), { width: k, height: x } = toValue(b) == true || toValue(b) === "" || toValue(b) === "true" ? useWindowSize() : useElementSize(v.container), { logError: B, logWarning: F } = I(), { pixelRatio: R } = useDevicePixelRatio(), { pause: z, resume: G } = Pe(), Y = computed(() => k.value / x.value);
  !toValue(b) && ((ae = (te = v.container) == null ? void 0 : te.value) == null ? void 0 : ae.offsetHeight) === 0 && F(`Oops... Seems like your canvas height is currently 0px, by default it takes the height of it's parent, so make sure it has some height with CSS.
You could set windowSize=true to force the canvas to be the size of the window.`);
  const Z = () => {
    t.value && (t.value.setSize(k.value, x.value), t.value.setPixelRatio(Math.min(R.value, 2)));
  }, ee = () => {
    if (!t.value)
      return;
    const L = toValue(y);
    if (L) {
      L in K || B("Renderer Preset must be one of these: " + Object.keys(K).join(", ")), Se(t.value, K[L]);
      return;
    }
    t.value.shadowMap.enabled = toValue(m), t.value.shadowMap.type = toValue(g), t.value.toneMapping = toValue(h2) || NoToneMapping, t.value.toneMappingExposure = toValue(P2), t.value.outputColorSpace = toValue(C) || LinearSRGBColorSpace, d != null && d.value && t.value.setClearColor(rt(toValue(d))), t.value.useLegacyLights = toValue(w);
  }, Le = () => {
    const L = unrefElement(v.canvas);
    L && (t.value = new WebGLRenderer({
      canvas: L,
      alpha: toValue(a),
      antialias: toValue(n),
      context: toValue(M),
      depth: toValue(r),
      failIfMajorPerformanceCaveat: toValue(i),
      logarithmicDepthBuffer: toValue(c),
      powerPreference: toValue(O),
      precision: toValue(s),
      stencil: toValue(u),
      preserveDrawingBuffer: toValue(S),
      premultipliedAlpha: toValue(f)
    }), T("renderer", t.value), T("clock", new Clock()), T("aspectRatio", Y), ee(), Z(), G(), o.value = true);
  }, Ae = () => {
    t.value && (t.value.dispose(), t.value = void 0, o.value = false, z());
  };
  return watch([Y, R], Z), watch(
    [m, g, C, w, h2, P2, d],
    ee
  ), watch(
    () => [v.canvas, v.container],
    () => {
      unrefElement(v.canvas) && unrefElement(v.container) && Le();
    },
    { immediate: true, deep: true }
  ), {
    renderer: t,
    isReady: o,
    dispose: Ae,
    aspectRatio: Y
  };
}
var oe = (e) => typeof e == "function";
var ft = (e) => typeof e == "string";
var Te = (e) => !!e && e.constructor === Array;
function ut(e) {
  const t = { nodes: {}, materials: {} };
  return e && e.traverse((o) => {
    o.name && (t.nodes[o.name] = o), o.material && !t.materials[o.material.name] && (t.materials[o.material.name] = o.material);
  }), t;
}
async function Rt(e, t, o, a, n) {
  const { logError: r } = I(), c = new e();
  n && n(c), o && o(c);
  const s = (Array.isArray(t) ? t : [t]).map(
    (f) => new Promise((u, m) => {
      c.load(
        f,
        (g) => {
          g.scene && Object.assign(g, ut(g.scene)), u(g);
        },
        a,
        (g) => m(r("[useLoader] - Failed to load resource", g))
      );
    })
  );
  return Te(t) ? await Promise.all(s) : await s[0];
}
async function Et(e) {
  const t = new LoadingManager(), o = new TextureLoader(t), a = (n) => new Promise((r, c) => {
    o.load(
      n,
      (i) => r(i),
      () => null,
      () => {
        c(new Error("[useTextures] - Failed to load texture"));
      }
    );
  });
  if (Te(e)) {
    const n = await Promise.all(e.map((r) => a(r)));
    return e.length > 1 ? n : n[0];
  } else {
    const {
      map: n,
      displacementMap: r,
      normalMap: c,
      roughnessMap: i,
      metalnessMap: s,
      aoMap: f,
      alphaMap: u,
      matcap: m
    } = e;
    return {
      map: n ? await a(n) : null,
      displacementMap: r ? await a(r) : null,
      normalMap: c ? await a(c) : null,
      roughnessMap: i ? await a(i) : null,
      metalnessMap: s ? await a(s) : null,
      aoMap: f ? await a(f) : null,
      alphaMap: u ? await a(u) : null,
      matcap: m ? await a(m) : null
    };
  }
}
var p = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
function lt() {
  const e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, o = Math.random() * 4294967295 | 0, a = Math.random() * 4294967295 | 0;
  return (p[e & 255] + p[e >> 8 & 255] + p[e >> 16 & 255] + p[e >> 24 & 255] + "-" + p[t & 255] + p[t >> 8 & 255] + "-" + p[t >> 16 & 15 | 64] + p[t >> 24 & 255] + "-" + p[o & 63 | 128] + p[o >> 8 & 255] + "-" + p[o >> 16 & 255] + p[o >> 24 & 255] + p[a & 255] + p[a >> 8 & 255] + p[a >> 16 & 255] + p[a >> 24 & 255]).toLowerCase();
}
var Q = Symbol();
function dt() {
  const e = shallowReactive({
    uuid: lt(),
    camera: void 0,
    cameras: [],
    scene: void 0,
    renderer: void 0,
    aspectRatio: computed(() => window.innerWidth / window.innerHeight)
  });
  function t(n) {
    return e[n];
  }
  function o(n, r) {
    e[n] = r;
  }
  const a = {
    state: e,
    ...toRefs(e),
    getState: t,
    setState: o
  };
  return provide(Q, a), a;
}
var _ = () => inject(Q, {
  state: shallowReactive({
    camera: void 0,
    cameras: [],
    scene: void 0,
    renderer: void 0
  })
});
function mt() {
  var c;
  const e = shallowRef(new Raycaster()), t = ref(new Vector2()), o = ref(null), { setState: a, state: n } = _();
  a("raycaster", e.value), a("pointer", t), a("currentInstance", o);
  function r(i) {
    t.value.x = i.clientX / window.innerWidth * 2 - 1, t.value.y = -(i.clientY / window.innerHeight) * 2 + 1;
  }
  return (c = n == null ? void 0 : n.renderer) == null || c.domElement.addEventListener("pointermove", r), onUnmounted(() => {
    var i;
    (i = n == null ? void 0 : n.renderer) == null || i.domElement.removeEventListener("pointermove", r);
  }), {
    raycaster: e,
    pointer: t
  };
}
var ie = "[TresJS ▲ ■ ●] ";
function I() {
  function e(a, n) {
    console.error(`${ie} ${a}`, n || "");
  }
  function t(a) {
    console.warn(`${ie} ${a}`);
  }
  function o(a, n) {
  }
  return {
    logError: e,
    logWarning: t,
    logMessage: o
  };
}
var pt = /^on[^a-z]/;
var vt = (e) => pt.test(e);
var se = null;
var ce = {
  GEOMETRY_VIA_PROP: "tres__geometryViaProp",
  MATERIAL_VIA_PROP: "tres__materialViaProp"
};
var { logError: fe } = I();
var ue = true;
var gt = {
  createElement(e, t, o, a) {
    var s, f;
    if (a || (a = {}), a.args || (a.args = []), e === "template" || it(e))
      return null;
    let n = e.replace("Tres", ""), r;
    if (e === "primitive") {
      (a == null ? void 0 : a.object) === void 0 && fe("Tres primitives need a prop 'object'");
      const u = a.object;
      n = u.type, r = Object.assign(u, { type: n, attach: a.attach, primitive: true });
    } else {
      const u = Ce.value[n];
      u || fe(`${n} is not defined on the THREE namespace. Use extend to add it to the catalog.`), r = new u(...a.args);
    }
    if (r.isCamera && ue) {
      a != null && a.position || r.position.set(3, 3, 3), a != null && a.lookAt || r.lookAt(0, 0, 0);
      const { setFirstCamera: u } = xe();
      u(r), ue = false;
    }
    (a == null ? void 0 : a.attach) === void 0 && (r.isMaterial ? r.attach = "material" : r.isBufferGeometry && (r.attach = "geometry"));
    const { GEOMETRY_VIA_PROP: c, MATERIAL_VIA_PROP: i } = ce;
    return r.isObject3D && ((s = a == null ? void 0 : a.material) != null && s.isMaterial && (r.userData[i] = true), (f = a == null ? void 0 : a.geometry) != null && f.isBufferGeometry && (r.userData[c] = true)), r.events = {}, r;
  },
  insert(e, t) {
    var o, a, n, r;
    if ((((o = e == null ? void 0 : e.__vnode) == null ? void 0 : o.type) === "TresGroup" || ((a = e == null ? void 0 : e.__vnode) == null ? void 0 : a.type) === "TresObject3D") && t === null && !((r = (n = e == null ? void 0 : e.__vnode) == null ? void 0 : n.ctx) != null && r.asyncResolved)) {
      se = e;
      return;
    }
    t || (t = se), e != null && e.isObject3D && (t != null && t.isObject3D) ? (t.add(e), e.dispatchEvent({ type: "added" })) : e != null && e.isFog ? t.fog = e : typeof (e == null ? void 0 : e.attach) == "string" && (e.__previousAttach = e[t == null ? void 0 : t.attach], t && (t[e.attach] = e));
  },
  remove(e) {
    var t, o;
    if (e) {
      if (e.isObject3D) {
        const a = e, n = (r) => {
          var s, f;
          const { GEOMETRY_VIA_PROP: c, MATERIAL_VIA_PROP: i } = ce;
          r.userData[i] || (s = r.material) == null || s.dispose(), r.userData[c] || (f = r.geometry) == null || f.dispose();
        };
        a.traverse((r) => n(r)), n(a);
      }
      (t = e.removeFromParent) == null || t.call(e), (o = e.dispose) == null || o.call(e);
    }
  },
  patchProp(e, t, o, a) {
    if (e) {
      let n = e, r = t, c = V(r), i = n == null ? void 0 : n[c];
      if (n.type === "BufferGeometry") {
        if (r === "args")
          return;
        n.setAttribute(
          V(r),
          new BufferAttribute(...a)
        );
        return;
      }
      if (r.includes("-") && i === void 0) {
        const f = r.split("-");
        i = f.reduce((u, m) => u[V(m)], n), r = f.pop(), c = r.toLowerCase(), i != null && i.set || (n = f.reduce((u, m) => u[V(m)], n));
      }
      vt(r) && (e.events[r] = a);
      let s = a;
      if (s === "" && (s = true), oe(i)) {
        Array.isArray(s) ? e[c](...s) : e[c](s);
        return;
      }
      !(i != null && i.set) && !oe(i) ? n[c] = s : i.constructor === s.constructor && (i != null && i.copy) ? i == null || i.copy(s) : Array.isArray(s) ? i.set(...s) : !i.isColor && i.setScalar ? i.setScalar(s) : i.set(s);
    }
  },
  parentNode(e) {
    return (e == null ? void 0 : e.parent) || null;
  },
  createText: () => void 0,
  createComment: () => void 0,
  setText: () => void 0,
  setElementText: () => void 0,
  nextSibling: () => void 0,
  querySelector: () => void 0,
  setScopeId: () => void 0,
  cloneNode: () => void 0,
  insertStaticContent: () => void 0
};
var { createApp: ht } = createRenderer(gt);
var wt = (e) => {
  const t = ht(o);
  function o() {
    return e && e.default ? e.default() : [];
  }
  return t;
};
Me(three_module_exports);
var { logWarning: le } = I();
var bt = defineComponent({
  name: "TresScene",
  props: [
    "shadows",
    "shadowMapType",
    "physicallyCorrectLights",
    "useLegacyLights",
    "outputColorSpace",
    "toneMapping",
    "toneMappingExposure",
    "context",
    "powerPreference",
    "preserveDrawingBuffer",
    "clearColor",
    "windowSize",
    "preset",
    "disableRender",
    "camera"
  ],
  setup(e, { slots: t, expose: o }) {
    e.physicallyCorrectLights === true && le("physicallyCorrectLights is deprecated, useLegacyLights is now false by default");
    const a = ref(), n = ref(), r = new Scene(), { setState: c } = _();
    c("scene", r), c("canvas", n), c("container", a);
    const i = ref(), s = t && t.default && t.default();
    s && (s == null ? void 0 : s.length) > 0 && (i.value = s.some((h2) => ft(h2.type) && h2.type.includes("Camera")) || e.camera, i.value || le("No camera found in the scene, please add one!")), onMounted(() => {
      g();
    }), onUnmounted(() => {
      c("renderer", null);
    });
    const { activeCamera: f, pushCamera: u, clearCameras: m } = xe();
    function g() {
      const { renderer: h2 } = ct(e);
      e.camera && u(e.camera);
      const { onLoop: P2 } = Pe(), { raycaster: M, pointer: O } = mt();
      let S = null, d = null;
      watchEffect(() => {
        f.value && M.value.setFromCamera(O.value, f.value);
      }), P2(() => {
        var b, y, v, T, k, x, B, F, R, z;
        if (f.value && e.disableRender !== true && ((b = h2.value) == null || b.render(r, f.value)), M.value) {
          const G = M.value.intersectObjects(r.children);
          G.length > 0 ? (d = G[0], S === null && ((T = (v = (y = d.object) == null ? void 0 : y.events) == null ? void 0 : v.onPointerEnter) == null || T.call(v, d)), (B = (x = (k = d.object) == null ? void 0 : k.events) == null ? void 0 : x.onPointerMove) == null || B.call(x, d)) : S !== null && ((z = (R = (F = d == null ? void 0 : d.object) == null ? void 0 : F.events) == null ? void 0 : R.onPointerLeave) == null || z.call(R, S), d = null), S = d;
        }
      }), useEventListener(n.value, "click", () => {
        var b, y, v;
        d !== null && ((v = (y = (b = d.object) == null ? void 0 : b.events) == null ? void 0 : y.onClick) == null || v.call(y, d));
      });
    }
    let w;
    function C() {
      w = wt(t), w.provide("useTres", _()), w.provide(Q, _()), w.provide("extend", Me), w.mount(r);
    }
    return C(), o({
      scene: r
    }), watch(
      () => e.camera,
      (h2) => {
        h2 && (m(), u(h2));
      }
    ), () => h(
      h(
        "div",
        {
          ref: a,
          "data-scene": r.uuid,
          key: r.uuid,
          style: {
            position: "relative",
            width: "100%",
            height: "100%",
            pointerEvents: "auto",
            touchAction: "none"
          }
        },
        [
          h(
            "div",
            {
              style: {
                width: "100%",
                height: "100%"
              }
            },
            [
              h("canvas", {
                ref: n,
                "data-scene": r.uuid,
                style: {
                  display: "block",
                  width: "100%",
                  height: "100%",
                  position: e.windowSize ? "fixed" : "absolute",
                  top: 0,
                  left: 0
                }
              })
            ]
          )
        ]
      )
    );
  }
});
var yt = defineComponent({
  name: "TresCanvas",
  props: [
    "shadows",
    "shadowMapType",
    "physicallyCorrectLights",
    "useLegacyLights",
    "outputColorSpace",
    "toneMapping",
    "toneMappingExposure",
    "context",
    "powerPreference",
    "preserveDrawingBuffer",
    "clearColor",
    "windowSize",
    "preset",
    "disableRender",
    "camera"
  ],
  setup(e, { slots: t, expose: o }) {
    const a = dt();
    return o(a), () => h(bt, e, t);
  }
});

// node_modules/.pnpm/@tresjs+cientos@2.0.0_@tresjs+core@_three@0.152.2_vue@3.2.47/node_modules/@tresjs/cientos/dist/trescientos.js
var Jc = Object.defineProperty;
var eu = (f, i, s) => i in f ? Jc(f, i, { enumerable: true, configurable: true, writable: true, value: s }) : f[i] = s;
var Zr = (f, i, s) => (eu(f, typeof i != "symbol" ? i + "" : i, s), s);
function Zu(f, i) {
  for (var s = 0; s < i.length; s++) {
    const r = i[s];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const o in r)
        if (o !== "default" && !(o in f)) {
          const c = Object.getOwnPropertyDescriptor(r, o);
          c && Object.defineProperty(f, o, c.get ? c : {
            enumerable: true,
            get: () => r[o]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(f, Symbol.toStringTag, { value: "Module" }));
}
function is(f) {
  return is = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(i) {
    return typeof i;
  } : function(i) {
    return i && typeof Symbol == "function" && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i;
  }, is(f);
}
function Wu(f, i) {
  if (is(f) !== "object" || f === null)
    return f;
  var s = f[Symbol.toPrimitive];
  if (s !== void 0) {
    var r = s.call(f, i || "default");
    if (is(r) !== "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (i === "string" ? String : Number)(f);
}
function Ju(f) {
  var i = Wu(f, "string");
  return is(i) === "symbol" ? i : String(i);
}
function P(f, i, s) {
  return i = Ju(i), i in f ? Object.defineProperty(f, i, {
    value: s,
    enumerable: true,
    configurable: true,
    writable: true
  }) : f[i] = s, f;
}
function da(f, i) {
  if (i === TrianglesDrawMode)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), f;
  if (i === TriangleFanDrawMode || i === TriangleStripDrawMode) {
    let s = f.getIndex();
    if (s === null) {
      const p2 = [], h2 = f.getAttribute("position");
      if (h2 !== void 0) {
        for (let m = 0; m < h2.count; m++)
          p2.push(m);
        f.setIndex(p2), s = f.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), f;
    }
    const r = s.count - 2, o = [];
    if (s)
      if (i === TriangleFanDrawMode)
        for (let p2 = 1; p2 <= r; p2++)
          o.push(s.getX(0)), o.push(s.getX(p2)), o.push(s.getX(p2 + 1));
      else
        for (let p2 = 0; p2 < r; p2++)
          p2 % 2 === 0 ? (o.push(s.getX(p2)), o.push(s.getX(p2 + 1)), o.push(s.getX(p2 + 2))) : (o.push(s.getX(p2 + 2)), o.push(s.getX(p2 + 1)), o.push(s.getX(p2)));
    o.length / 3 !== r && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const c = f.clone();
    return c.setIndex(o), c.clearGroups(), c;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", i), f;
}
var ft2 = Uint8Array;
var cn = Uint16Array;
var vo = Uint32Array;
var Ga = new ft2([
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
var Ha = new ft2([
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
var ep = new ft2([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var Ka = function(f, i) {
  for (var s = new cn(31), r = 0; r < 31; ++r)
    s[r] = i += 1 << f[r - 1];
  for (var o = new vo(s[30]), r = 1; r < 30; ++r)
    for (var c = s[r]; c < s[r + 1]; ++c)
      o[c] = c - s[r] << 5 | r;
  return [s, o];
};
var $a = Ka(Ga, 2);
var Xa = $a[0];
var tp = $a[1];
Xa[28] = 258, tp[258] = 28;
var np = Ka(Ha, 0);
var ip = np[0];
var bo = new cn(32768);
for (Te2 = 0; Te2 < 32768; ++Te2) {
  nn = (Te2 & 43690) >>> 1 | (Te2 & 21845) << 1;
  nn = (nn & 52428) >>> 2 | (nn & 13107) << 2, nn = (nn & 61680) >>> 4 | (nn & 3855) << 4, bo[Te2] = ((nn & 65280) >>> 8 | (nn & 255) << 8) >>> 1;
}
var nn;
var Te2;
var Ji = function(f, i, s) {
  for (var r = f.length, o = 0, c = new cn(i); o < r; ++o)
    ++c[f[o] - 1];
  var p2 = new cn(i);
  for (o = 0; o < i; ++o)
    p2[o] = p2[o - 1] + c[o - 1] << 1;
  var h2;
  if (s) {
    h2 = new cn(1 << i);
    var m = 15 - i;
    for (o = 0; o < r; ++o)
      if (f[o])
        for (var g = o << 4 | f[o], w = i - f[o], _2 = p2[f[o] - 1]++ << w, y = _2 | (1 << w) - 1; _2 <= y; ++_2)
          h2[bo[_2] >>> m] = g;
  } else
    for (h2 = new cn(r), o = 0; o < r; ++o)
      f[o] && (h2[o] = bo[p2[f[o] - 1]++] >>> 15 - f[o]);
  return h2;
};
var os = new ft2(288);
for (Te2 = 0; Te2 < 144; ++Te2)
  os[Te2] = 8;
var Te2;
for (Te2 = 144; Te2 < 256; ++Te2)
  os[Te2] = 9;
var Te2;
for (Te2 = 256; Te2 < 280; ++Te2)
  os[Te2] = 7;
var Te2;
for (Te2 = 280; Te2 < 288; ++Te2)
  os[Te2] = 8;
var Te2;
var Ya = new ft2(32);
for (Te2 = 0; Te2 < 32; ++Te2)
  Ya[Te2] = 5;
var Te2;
var sp = Ji(os, 9, 1);
var rp = Ji(Ya, 5, 1);
var to = function(f) {
  for (var i = f[0], s = 1; s < f.length; ++s)
    f[s] > i && (i = f[s]);
  return i;
};
var xt = function(f, i, s) {
  var r = i / 8 | 0;
  return (f[r] | f[r + 1] << 8) >> (i & 7) & s;
};
var no = function(f, i) {
  var s = i / 8 | 0;
  return (f[s] | f[s + 1] << 8 | f[s + 2] << 16) >> (i & 7);
};
var op = function(f) {
  return (f / 8 | 0) + (f & 7 && 1);
};
var ap = function(f, i, s) {
  (i == null || i < 0) && (i = 0), (s == null || s > f.length) && (s = f.length);
  var r = new (f instanceof cn ? cn : f instanceof vo ? vo : ft2)(s - i);
  return r.set(f.subarray(i, s)), r;
};
var lp = function(f, i, s) {
  var r = f.length;
  if (!r || s && !s.l && r < 5)
    return i || new ft2(0);
  var o = !i || s, c = !s || s.i;
  s || (s = {}), i || (i = new ft2(r * 3));
  var p2 = function(Ne) {
    var Ue = i.length;
    if (Ne > Ue) {
      var xe2 = new ft2(Math.max(Ue * 2, Ne));
      xe2.set(i), i = xe2;
    }
  }, h2 = s.f || 0, m = s.p || 0, g = s.b || 0, w = s.l, _2 = s.d, y = s.m, C = s.n, L = r * 8;
  do {
    if (!w) {
      s.f = h2 = xt(f, m, 1);
      var S = xt(f, m + 1, 3);
      if (m += 3, S)
        if (S == 1)
          w = sp, _2 = rp, y = 9, C = 5;
        else if (S == 2) {
          var I2 = xt(f, m, 31) + 257, D2 = xt(f, m + 10, 15) + 4, Y = I2 + xt(f, m + 5, 31) + 1;
          m += 14;
          for (var G = new ft2(Y), F = new ft2(19), B = 0; B < D2; ++B)
            F[ep[B]] = xt(f, m + B * 3, 7);
          m += D2 * 3;
          for (var H2 = to(F), K2 = (1 << H2) - 1, q = Ji(F, H2, 1), B = 0; B < Y; ) {
            var pe = q[xt(f, m, K2)];
            m += pe & 15;
            var R = pe >>> 4;
            if (R < 16)
              G[B++] = R;
            else {
              var _e = 0, ce2 = 0;
              for (R == 16 ? (ce2 = 3 + xt(f, m, 3), m += 2, _e = G[B - 1]) : R == 17 ? (ce2 = 3 + xt(f, m, 7), m += 3) : R == 18 && (ce2 = 11 + xt(f, m, 127), m += 7); ce2--; )
                G[B++] = _e;
            }
          }
          var me = G.subarray(0, I2), he = G.subarray(I2);
          y = to(me), C = to(he), w = Ji(me, y, 1), _2 = Ji(he, C, 1);
        } else
          throw "invalid block type";
      else {
        var R = op(m) + 4, O = f[R - 4] | f[R - 3] << 8, N = R + O;
        if (N > r) {
          if (c)
            throw "unexpected EOF";
          break;
        }
        o && p2(g + O), i.set(f.subarray(R, N), g), s.b = g += O, s.p = m = N * 8;
        continue;
      }
      if (m > L) {
        if (c)
          throw "unexpected EOF";
        break;
      }
    }
    o && p2(g + 131072);
    for (var ee = (1 << y) - 1, X2 = (1 << C) - 1, Se2 = m; ; Se2 = m) {
      var _e = w[no(f, m) & ee], fe2 = _e >>> 4;
      if (m += _e & 15, m > L) {
        if (c)
          throw "unexpected EOF";
        break;
      }
      if (!_e)
        throw "invalid length/literal";
      if (fe2 < 256)
        i[g++] = fe2;
      else if (fe2 == 256) {
        Se2 = m, w = null;
        break;
      } else {
        var oe2 = fe2 - 254;
        if (fe2 > 264) {
          var B = fe2 - 257, ne = Ga[B];
          oe2 = xt(f, m, (1 << ne) - 1) + Xa[B], m += ne;
        }
        var ge = _2[no(f, m) & X2], A2 = ge >>> 4;
        if (!ge)
          throw "invalid distance";
        m += ge & 15;
        var he = ip[A2];
        if (A2 > 3) {
          var ne = Ha[A2];
          he += no(f, m) & (1 << ne) - 1, m += ne;
        }
        if (m > L) {
          if (c)
            throw "unexpected EOF";
          break;
        }
        o && p2(g + 131072);
        for (var ae = g + oe2; g < ae; g += 4)
          i[g] = i[g - he], i[g + 1] = i[g + 1 - he], i[g + 2] = i[g + 2 - he], i[g + 3] = i[g + 3 - he];
        g = ae;
      }
    }
    s.l = w, s.p = Se2, s.b = g, w && (h2 = 1, s.m = y, s.d = _2, s.n = C);
  } while (!h2);
  return g == i.length ? i : ap(i, 0, g);
};
var cp = new ft2(0);
var up = function(f) {
  if ((f[0] & 15) != 8 || f[0] >>> 4 > 7 || (f[0] << 8 | f[1]) % 31)
    throw "invalid zlib data";
  if (f[1] & 32)
    throw "invalid zlib data: preset dictionaries not supported";
};
function pp(f, i) {
  return lp((up(f), f.subarray(2, -4)), i);
}
var hp = typeof TextDecoder < "u" && new TextDecoder();
var dp = 0;
try {
  hp.decode(cp, { stream: true }), dp = 1;
} catch {
}
var mp = class extends Object3D {
  // events
  constructor(i, s) {
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
    }), P(this, "intersectObjectWithRay", (o, c, p2) => {
      const h2 = c.intersectObject(o, true);
      for (let m = 0; m < h2.length; m++)
        if (h2[m].object.visible || p2)
          return h2[m];
      return false;
    }), P(this, "attach", (o) => (this.object = o, this.visible = true, this)), P(this, "detach", () => (this.object = void 0, this.visible = false, this.axis = null, this)), P(this, "reset", () => this.enabled ? (this.dragging && this.object !== void 0 && (this.object.position.copy(this.positionStart), this.object.quaternion.copy(this.quaternionStart), this.object.scale.copy(this.scaleStart), this.dispatchEvent(this.changeEvent), this.dispatchEvent(this.objectChangeEvent), this.pointStart.copy(this.pointEnd)), this) : this), P(this, "updateMatrixWorld", () => {
      this.object !== void 0 && (this.object.updateMatrixWorld(), this.object.parent === null ? console.error("TransformControls: The attached 3D object must be a part of the scene graph.") : this.object.parent.matrixWorld.decompose(this.parentPosition, this.parentQuaternion, this.parentScale), this.object.matrixWorld.decompose(this.worldPosition, this.worldQuaternion, this.worldScale), this.parentQuaternionInv.copy(this.parentQuaternion).invert(), this.worldQuaternionInv.copy(this.worldQuaternion).invert()), this.camera.updateMatrixWorld(), this.camera.matrixWorld.decompose(this.cameraPosition, this.cameraQuaternion, this.cameraScale), this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(), super.updateMatrixWorld();
    }), P(this, "pointerHover", (o) => {
      if (this.object === void 0 || this.dragging === true)
        return;
      this.raycaster.setFromCamera(o, this.camera);
      const c = this.intersectObjectWithRay(this.gizmo.picker[this.mode], this.raycaster);
      c ? this.axis = c.object.name : this.axis = null;
    }), P(this, "pointerDown", (o) => {
      if (!(this.object === void 0 || this.dragging === true || o.button !== 0) && this.axis !== null) {
        this.raycaster.setFromCamera(o, this.camera);
        const c = this.intersectObjectWithRay(this.plane, this.raycaster, true);
        if (c) {
          let p2 = this.space;
          if (this.mode === "scale" ? p2 = "local" : (this.axis === "E" || this.axis === "XYZE" || this.axis === "XYZ") && (p2 = "world"), p2 === "local" && this.mode === "rotate") {
            const h2 = this.rotationSnap;
            this.axis === "X" && h2 && (this.object.rotation.x = Math.round(this.object.rotation.x / h2) * h2), this.axis === "Y" && h2 && (this.object.rotation.y = Math.round(this.object.rotation.y / h2) * h2), this.axis === "Z" && h2 && (this.object.rotation.z = Math.round(this.object.rotation.z / h2) * h2);
          }
          this.object.updateMatrixWorld(), this.object.parent && this.object.parent.updateMatrixWorld(), this.positionStart.copy(this.object.position), this.quaternionStart.copy(this.object.quaternion), this.scaleStart.copy(this.object.scale), this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this.worldScaleStart), this.pointStart.copy(c.point).sub(this.worldPositionStart);
        }
        this.dragging = true, this.mouseDownEvent.mode = this.mode, this.dispatchEvent(this.mouseDownEvent);
      }
    }), P(this, "pointerMove", (o) => {
      const c = this.axis, p2 = this.mode, h2 = this.object;
      let m = this.space;
      if (p2 === "scale" ? m = "local" : (c === "E" || c === "XYZE" || c === "XYZ") && (m = "world"), h2 === void 0 || c === null || this.dragging === false || o.button !== -1)
        return;
      this.raycaster.setFromCamera(o, this.camera);
      const g = this.intersectObjectWithRay(this.plane, this.raycaster, true);
      if (g) {
        if (this.pointEnd.copy(g.point).sub(this.worldPositionStart), p2 === "translate")
          this.offset.copy(this.pointEnd).sub(this.pointStart), m === "local" && c !== "XYZ" && this.offset.applyQuaternion(this.worldQuaternionInv), c.indexOf("X") === -1 && (this.offset.x = 0), c.indexOf("Y") === -1 && (this.offset.y = 0), c.indexOf("Z") === -1 && (this.offset.z = 0), m === "local" && c !== "XYZ" ? this.offset.applyQuaternion(this.quaternionStart).divide(this.parentScale) : this.offset.applyQuaternion(this.parentQuaternionInv).divide(this.parentScale), h2.position.copy(this.offset).add(this.positionStart), this.translationSnap && (m === "local" && (h2.position.applyQuaternion(this.tempQuaternion.copy(this.quaternionStart).invert()), c.search("X") !== -1 && (h2.position.x = Math.round(h2.position.x / this.translationSnap) * this.translationSnap), c.search("Y") !== -1 && (h2.position.y = Math.round(h2.position.y / this.translationSnap) * this.translationSnap), c.search("Z") !== -1 && (h2.position.z = Math.round(h2.position.z / this.translationSnap) * this.translationSnap), h2.position.applyQuaternion(this.quaternionStart)), m === "world" && (h2.parent && h2.position.add(this.tempVector.setFromMatrixPosition(h2.parent.matrixWorld)), c.search("X") !== -1 && (h2.position.x = Math.round(h2.position.x / this.translationSnap) * this.translationSnap), c.search("Y") !== -1 && (h2.position.y = Math.round(h2.position.y / this.translationSnap) * this.translationSnap), c.search("Z") !== -1 && (h2.position.z = Math.round(h2.position.z / this.translationSnap) * this.translationSnap), h2.parent && h2.position.sub(this.tempVector.setFromMatrixPosition(h2.parent.matrixWorld))));
        else if (p2 === "scale") {
          if (c.search("XYZ") !== -1) {
            let w = this.pointEnd.length() / this.pointStart.length();
            this.pointEnd.dot(this.pointStart) < 0 && (w *= -1), this.tempVector2.set(w, w, w);
          } else
            this.tempVector.copy(this.pointStart), this.tempVector2.copy(this.pointEnd), this.tempVector.applyQuaternion(this.worldQuaternionInv), this.tempVector2.applyQuaternion(this.worldQuaternionInv), this.tempVector2.divide(this.tempVector), c.search("X") === -1 && (this.tempVector2.x = 1), c.search("Y") === -1 && (this.tempVector2.y = 1), c.search("Z") === -1 && (this.tempVector2.z = 1);
          h2.scale.copy(this.scaleStart).multiply(this.tempVector2), this.scaleSnap && this.object && (c.search("X") !== -1 && (this.object.scale.x = Math.round(h2.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap), c.search("Y") !== -1 && (h2.scale.y = Math.round(h2.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap), c.search("Z") !== -1 && (h2.scale.z = Math.round(h2.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap));
        } else if (p2 === "rotate") {
          this.offset.copy(this.pointEnd).sub(this.pointStart);
          const w = 20 / this.worldPosition.distanceTo(this.tempVector.setFromMatrixPosition(this.camera.matrixWorld));
          c === "E" ? (this.rotationAxis.copy(this.eye), this.rotationAngle = this.pointEnd.angleTo(this.pointStart), this.startNorm.copy(this.pointStart).normalize(), this.endNorm.copy(this.pointEnd).normalize(), this.rotationAngle *= this.endNorm.cross(this.startNorm).dot(this.eye) < 0 ? 1 : -1) : c === "XYZE" ? (this.rotationAxis.copy(this.offset).cross(this.eye).normalize(), this.rotationAngle = this.offset.dot(this.tempVector.copy(this.rotationAxis).cross(this.eye)) * w) : (c === "X" || c === "Y" || c === "Z") && (this.rotationAxis.copy(this.unit[c]), this.tempVector.copy(this.unit[c]), m === "local" && this.tempVector.applyQuaternion(this.worldQuaternion), this.rotationAngle = this.offset.dot(this.tempVector.cross(this.eye).normalize()) * w), this.rotationSnap && (this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap), m === "local" && c !== "E" && c !== "XYZE" ? (h2.quaternion.copy(this.quaternionStart), h2.quaternion.multiply(this.tempQuaternion.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize()) : (this.rotationAxis.applyQuaternion(this.parentQuaternionInv), h2.quaternion.copy(this.tempQuaternion.setFromAxisAngle(this.rotationAxis, this.rotationAngle)), h2.quaternion.multiply(this.quaternionStart).normalize());
        }
        this.dispatchEvent(this.changeEvent), this.dispatchEvent(this.objectChangeEvent);
      }
    }), P(this, "pointerUp", (o) => {
      o.button === 0 && (this.dragging && this.axis !== null && (this.mouseUpEvent.mode = this.mode, this.dispatchEvent(this.mouseUpEvent)), this.dragging = false, this.axis = null);
    }), P(this, "getPointer", (o) => {
      var c;
      if (this.domElement && (c = this.domElement.ownerDocument) !== null && c !== void 0 && c.pointerLockElement)
        return {
          x: 0,
          y: 0,
          button: o.button
        };
      {
        var p2;
        const h2 = o.changedTouches ? o.changedTouches[0] : o, m = (p2 = this.domElement) === null || p2 === void 0 ? void 0 : p2.getBoundingClientRect();
        return {
          x: (h2.clientX - m.left) / m.width * 2 - 1,
          y: -(h2.clientY - m.top) / m.height * 2 + 1,
          button: o.button
        };
      }
    }), P(this, "onPointerHover", (o) => {
      if (this.enabled)
        switch (o.pointerType) {
          case "mouse":
          case "pen":
            this.pointerHover(this.getPointer(o));
            break;
        }
    }), P(this, "onPointerDown", (o) => {
      !this.enabled || !this.domElement || (this.domElement.style.touchAction = "none", this.domElement.ownerDocument.addEventListener("pointermove", this.onPointerMove), this.pointerHover(this.getPointer(o)), this.pointerDown(this.getPointer(o)));
    }), P(this, "onPointerMove", (o) => {
      this.enabled && this.pointerMove(this.getPointer(o));
    }), P(this, "onPointerUp", (o) => {
      !this.enabled || !this.domElement || (this.domElement.style.touchAction = "", this.domElement.ownerDocument.removeEventListener("pointermove", this.onPointerMove), this.pointerUp(this.getPointer(o)));
    }), P(this, "getMode", () => this.mode), P(this, "setMode", (o) => {
      this.mode = o;
    }), P(this, "setTranslationSnap", (o) => {
      this.translationSnap = o;
    }), P(this, "setRotationSnap", (o) => {
      this.rotationSnap = o;
    }), P(this, "setScaleSnap", (o) => {
      this.scaleSnap = o;
    }), P(this, "setSize", (o) => {
      this.size = o;
    }), P(this, "setSpace", (o) => {
      this.space = o;
    }), P(this, "update", () => {
      console.warn("THREE.TransformControls: update function has no more functionality and therefore has been deprecated.");
    }), P(this, "connect", (o) => {
      o === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'), this.domElement = o, this.domElement.addEventListener("pointerdown", this.onPointerDown), this.domElement.addEventListener("pointermove", this.onPointerHover), this.domElement.ownerDocument.addEventListener("pointerup", this.onPointerUp);
    }), P(this, "dispose", () => {
      var o, c, p2, h2, m, g;
      (o = this.domElement) === null || o === void 0 || o.removeEventListener("pointerdown", this.onPointerDown), (c = this.domElement) === null || c === void 0 || c.removeEventListener("pointermove", this.onPointerHover), (p2 = this.domElement) === null || p2 === void 0 || (h2 = p2.ownerDocument) === null || h2 === void 0 || h2.removeEventListener("pointermove", this.onPointerMove), (m = this.domElement) === null || m === void 0 || (g = m.ownerDocument) === null || g === void 0 || g.removeEventListener("pointerup", this.onPointerUp), this.traverse((w) => {
        const _2 = w;
        _2.geometry && _2.geometry.dispose(), _2.material && _2.material.dispose();
      });
    }), this.domElement = s, this.camera = i, this.gizmo = new fp(), this.add(this.gizmo), this.plane = new vp(), this.add(this.plane);
    const r = (o, c) => {
      let p2 = c;
      Object.defineProperty(this, o, {
        get: function() {
          return p2 !== void 0 ? p2 : c;
        },
        set: function(h2) {
          p2 !== h2 && (p2 = h2, this.plane[o] = h2, this.gizmo[o] = h2, this.dispatchEvent({
            type: o + "-changed",
            value: h2
          }), this.dispatchEvent(this.changeEvent));
        }
      }), this[o] = c, this.plane[o] = c, this.gizmo[o] = c;
    };
    r("camera", this.camera), r("object", this.object), r("enabled", this.enabled), r("axis", this.axis), r("mode", this.mode), r("translationSnap", this.translationSnap), r("rotationSnap", this.rotationSnap), r("scaleSnap", this.scaleSnap), r("space", this.space), r("size", this.size), r("dragging", this.dragging), r("showX", this.showX), r("showY", this.showY), r("showZ", this.showZ), r("worldPosition", this.worldPosition), r("worldPositionStart", this.worldPositionStart), r("worldQuaternion", this.worldQuaternion), r("worldQuaternionStart", this.worldQuaternionStart), r("cameraPosition", this.cameraPosition), r("cameraQuaternion", this.cameraQuaternion), r("pointStart", this.pointStart), r("pointEnd", this.pointEnd), r("rotationAxis", this.rotationAxis), r("rotationAngle", this.rotationAngle), r("eye", this.eye), s !== void 0 && this.connect(s);
  }
};
var fp = class extends Object3D {
  // these are set from parent class TransformControls
  constructor() {
    super(), P(this, "isTransformControlsGizmo", true), P(this, "type", "TransformControlsGizmo"), P(this, "tempVector", new Vector3(0, 0, 0)), P(this, "tempEuler", new Euler()), P(this, "alignVector", new Vector3(0, 1, 0)), P(this, "zeroVector", new Vector3(0, 0, 0)), P(this, "lookAtMatrix", new Matrix4()), P(this, "tempQuaternion", new Quaternion()), P(this, "tempQuaternion2", new Quaternion()), P(this, "identityQuaternion", new Quaternion()), P(this, "unitX", new Vector3(1, 0, 0)), P(this, "unitY", new Vector3(0, 1, 0)), P(this, "unitZ", new Vector3(0, 0, 1)), P(this, "gizmo", void 0), P(this, "picker", void 0), P(this, "helper", void 0), P(this, "rotationAxis", new Vector3()), P(this, "cameraPosition", new Vector3()), P(this, "worldPositionStart", new Vector3()), P(this, "worldQuaternionStart", new Quaternion()), P(this, "worldPosition", new Vector3()), P(this, "worldQuaternion", new Quaternion()), P(this, "eye", new Vector3()), P(this, "camera", null), P(this, "enabled", true), P(this, "axis", null), P(this, "mode", "translate"), P(this, "space", "world"), P(this, "size", 1), P(this, "dragging", false), P(this, "showX", true), P(this, "showY", true), P(this, "showZ", true), P(this, "updateMatrixWorld", () => {
      let fe2 = this.space;
      this.mode === "scale" && (fe2 = "local");
      const oe2 = fe2 === "local" ? this.worldQuaternion : this.identityQuaternion;
      this.gizmo.translate.visible = this.mode === "translate", this.gizmo.rotate.visible = this.mode === "rotate", this.gizmo.scale.visible = this.mode === "scale", this.helper.translate.visible = this.mode === "translate", this.helper.rotate.visible = this.mode === "rotate", this.helper.scale.visible = this.mode === "scale";
      let ne = [];
      ne = ne.concat(this.picker[this.mode].children), ne = ne.concat(this.gizmo[this.mode].children), ne = ne.concat(this.helper[this.mode].children);
      for (let ge = 0; ge < ne.length; ge++) {
        const A2 = ne[ge];
        A2.visible = true, A2.rotation.set(0, 0, 0), A2.position.copy(this.worldPosition);
        let ae;
        if (this.camera.isOrthographicCamera ? ae = (this.camera.top - this.camera.bottom) / this.camera.zoom : ae = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7), A2.scale.set(1, 1, 1).multiplyScalar(ae * this.size / 7), A2.tag === "helper") {
          A2.visible = false, A2.name === "AXIS" ? (A2.position.copy(this.worldPositionStart), A2.visible = !!this.axis, this.axis === "X" && (this.tempQuaternion.setFromEuler(this.tempEuler.set(0, 0, 0)), A2.quaternion.copy(oe2).multiply(this.tempQuaternion), Math.abs(this.alignVector.copy(this.unitX).applyQuaternion(oe2).dot(this.eye)) > 0.9 && (A2.visible = false)), this.axis === "Y" && (this.tempQuaternion.setFromEuler(this.tempEuler.set(0, 0, Math.PI / 2)), A2.quaternion.copy(oe2).multiply(this.tempQuaternion), Math.abs(this.alignVector.copy(this.unitY).applyQuaternion(oe2).dot(this.eye)) > 0.9 && (A2.visible = false)), this.axis === "Z" && (this.tempQuaternion.setFromEuler(this.tempEuler.set(0, Math.PI / 2, 0)), A2.quaternion.copy(oe2).multiply(this.tempQuaternion), Math.abs(this.alignVector.copy(this.unitZ).applyQuaternion(oe2).dot(this.eye)) > 0.9 && (A2.visible = false)), this.axis === "XYZE" && (this.tempQuaternion.setFromEuler(this.tempEuler.set(0, Math.PI / 2, 0)), this.alignVector.copy(this.rotationAxis), A2.quaternion.setFromRotationMatrix(this.lookAtMatrix.lookAt(this.zeroVector, this.alignVector, this.unitY)), A2.quaternion.multiply(this.tempQuaternion), A2.visible = this.dragging), this.axis === "E" && (A2.visible = false)) : A2.name === "START" ? (A2.position.copy(this.worldPositionStart), A2.visible = this.dragging) : A2.name === "END" ? (A2.position.copy(this.worldPosition), A2.visible = this.dragging) : A2.name === "DELTA" ? (A2.position.copy(this.worldPositionStart), A2.quaternion.copy(this.worldQuaternionStart), this.tempVector.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1), this.tempVector.applyQuaternion(this.worldQuaternionStart.clone().invert()), A2.scale.copy(this.tempVector), A2.visible = this.dragging) : (A2.quaternion.copy(oe2), this.dragging ? A2.position.copy(this.worldPositionStart) : A2.position.copy(this.worldPosition), this.axis && (A2.visible = this.axis.search(A2.name) !== -1));
          continue;
        }
        A2.quaternion.copy(oe2), this.mode === "translate" || this.mode === "scale" ? ((A2.name === "X" || A2.name === "XYZX") && Math.abs(this.alignVector.copy(this.unitX).applyQuaternion(oe2).dot(this.eye)) > 0.99 && (A2.scale.set(1e-10, 1e-10, 1e-10), A2.visible = false), (A2.name === "Y" || A2.name === "XYZY") && Math.abs(this.alignVector.copy(this.unitY).applyQuaternion(oe2).dot(this.eye)) > 0.99 && (A2.scale.set(1e-10, 1e-10, 1e-10), A2.visible = false), (A2.name === "Z" || A2.name === "XYZZ") && Math.abs(this.alignVector.copy(this.unitZ).applyQuaternion(oe2).dot(this.eye)) > 0.99 && (A2.scale.set(1e-10, 1e-10, 1e-10), A2.visible = false), A2.name === "XY" && Math.abs(this.alignVector.copy(this.unitZ).applyQuaternion(oe2).dot(this.eye)) < 0.2 && (A2.scale.set(1e-10, 1e-10, 1e-10), A2.visible = false), A2.name === "YZ" && Math.abs(this.alignVector.copy(this.unitX).applyQuaternion(oe2).dot(this.eye)) < 0.2 && (A2.scale.set(1e-10, 1e-10, 1e-10), A2.visible = false), A2.name === "XZ" && Math.abs(this.alignVector.copy(this.unitY).applyQuaternion(oe2).dot(this.eye)) < 0.2 && (A2.scale.set(1e-10, 1e-10, 1e-10), A2.visible = false), A2.name.search("X") !== -1 && (this.alignVector.copy(this.unitX).applyQuaternion(oe2).dot(this.eye) < 0 ? A2.tag === "fwd" ? A2.visible = false : A2.scale.x *= -1 : A2.tag === "bwd" && (A2.visible = false)), A2.name.search("Y") !== -1 && (this.alignVector.copy(this.unitY).applyQuaternion(oe2).dot(this.eye) < 0 ? A2.tag === "fwd" ? A2.visible = false : A2.scale.y *= -1 : A2.tag === "bwd" && (A2.visible = false)), A2.name.search("Z") !== -1 && (this.alignVector.copy(this.unitZ).applyQuaternion(oe2).dot(this.eye) < 0 ? A2.tag === "fwd" ? A2.visible = false : A2.scale.z *= -1 : A2.tag === "bwd" && (A2.visible = false))) : this.mode === "rotate" && (this.tempQuaternion2.copy(oe2), this.alignVector.copy(this.eye).applyQuaternion(this.tempQuaternion.copy(oe2).invert()), A2.name.search("E") !== -1 && A2.quaternion.setFromRotationMatrix(this.lookAtMatrix.lookAt(this.eye, this.zeroVector, this.unitY)), A2.name === "X" && (this.tempQuaternion.setFromAxisAngle(this.unitX, Math.atan2(-this.alignVector.y, this.alignVector.z)), this.tempQuaternion.multiplyQuaternions(this.tempQuaternion2, this.tempQuaternion), A2.quaternion.copy(this.tempQuaternion)), A2.name === "Y" && (this.tempQuaternion.setFromAxisAngle(this.unitY, Math.atan2(this.alignVector.x, this.alignVector.z)), this.tempQuaternion.multiplyQuaternions(this.tempQuaternion2, this.tempQuaternion), A2.quaternion.copy(this.tempQuaternion)), A2.name === "Z" && (this.tempQuaternion.setFromAxisAngle(this.unitZ, Math.atan2(this.alignVector.y, this.alignVector.x)), this.tempQuaternion.multiplyQuaternions(this.tempQuaternion2, this.tempQuaternion), A2.quaternion.copy(this.tempQuaternion))), A2.visible = A2.visible && (A2.name.indexOf("X") === -1 || this.showX), A2.visible = A2.visible && (A2.name.indexOf("Y") === -1 || this.showY), A2.visible = A2.visible && (A2.name.indexOf("Z") === -1 || this.showZ), A2.visible = A2.visible && (A2.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ), A2.material.tempOpacity = A2.material.tempOpacity || A2.material.opacity, A2.material.tempColor = A2.material.tempColor || A2.material.color.clone(), A2.material.color.copy(A2.material.tempColor), A2.material.opacity = A2.material.tempOpacity, this.enabled ? this.axis && (A2.name === this.axis ? (A2.material.opacity = 1, A2.material.color.lerp(new Color(1, 1, 1), 0.5)) : this.axis.split("").some(function(Ne) {
          return A2.name === Ne;
        }) ? (A2.material.opacity = 1, A2.material.color.lerp(new Color(1, 1, 1), 0.5)) : (A2.material.opacity *= 0.25, A2.material.color.lerp(new Color(1, 1, 1), 0.5))) : (A2.material.opacity *= 0.5, A2.material.color.lerp(new Color(1, 1, 1), 0.5));
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
    }), s = new LineBasicMaterial({
      depthTest: false,
      depthWrite: false,
      transparent: true,
      linewidth: 1,
      fog: false,
      toneMapped: false
    }), r = i.clone();
    r.opacity = 0.15;
    const o = i.clone();
    o.opacity = 0.33;
    const c = i.clone();
    c.color.set(16711680);
    const p2 = i.clone();
    p2.color.set(65280);
    const h2 = i.clone();
    h2.color.set(255);
    const m = i.clone();
    m.opacity = 0.25;
    const g = m.clone();
    g.color.set(16776960);
    const w = m.clone();
    w.color.set(65535);
    const _2 = m.clone();
    _2.color.set(16711935), i.clone().color.set(16776960);
    const C = s.clone();
    C.color.set(16711680);
    const L = s.clone();
    L.color.set(65280);
    const S = s.clone();
    S.color.set(255);
    const R = s.clone();
    R.color.set(65535);
    const O = s.clone();
    O.color.set(16711935);
    const N = s.clone();
    N.color.set(16776960);
    const I2 = s.clone();
    I2.color.set(7895160);
    const D2 = N.clone();
    D2.opacity = 0.25;
    const Y = new CylinderGeometry(0, 0.05, 0.2, 12, 1, false), G = new BoxGeometry(0.125, 0.125, 0.125), F = new BufferGeometry();
    F.setAttribute("position", new Float32BufferAttribute([0, 0, 0, 1, 0, 0], 3));
    const B = (fe2, oe2) => {
      const ne = new BufferGeometry(), ge = [];
      for (let A2 = 0; A2 <= 64 * oe2; ++A2)
        ge.push(0, Math.cos(A2 / 32 * Math.PI) * fe2, Math.sin(A2 / 32 * Math.PI) * fe2);
      return ne.setAttribute("position", new Float32BufferAttribute(ge, 3)), ne;
    }, H2 = () => {
      const fe2 = new BufferGeometry();
      return fe2.setAttribute("position", new Float32BufferAttribute([0, 0, 0, 1, 1, 1], 3)), fe2;
    }, K2 = {
      X: [[new Mesh(Y, c), [1, 0, 0], [0, 0, -Math.PI / 2], null, "fwd"], [new Mesh(Y, c), [1, 0, 0], [0, 0, Math.PI / 2], null, "bwd"], [new Line(F, C)]],
      Y: [[new Mesh(Y, p2), [0, 1, 0], null, null, "fwd"], [new Mesh(Y, p2), [0, 1, 0], [Math.PI, 0, 0], null, "bwd"], [new Line(F, L), null, [0, 0, Math.PI / 2]]],
      Z: [[new Mesh(Y, h2), [0, 0, 1], [Math.PI / 2, 0, 0], null, "fwd"], [new Mesh(Y, h2), [0, 0, 1], [-Math.PI / 2, 0, 0], null, "bwd"], [new Line(F, S), null, [0, -Math.PI / 2, 0]]],
      XYZ: [[new Mesh(new OctahedronGeometry(0.1, 0), m.clone()), [0, 0, 0], [0, 0, 0]]],
      XY: [[new Mesh(new PlaneGeometry(0.295, 0.295), g.clone()), [0.15, 0.15, 0]], [new Line(F, N), [0.18, 0.3, 0], null, [0.125, 1, 1]], [new Line(F, N), [0.3, 0.18, 0], [0, 0, Math.PI / 2], [0.125, 1, 1]]],
      YZ: [[new Mesh(new PlaneGeometry(0.295, 0.295), w.clone()), [0, 0.15, 0.15], [0, Math.PI / 2, 0]], [new Line(F, R), [0, 0.18, 0.3], [0, 0, Math.PI / 2], [0.125, 1, 1]], [new Line(F, R), [0, 0.3, 0.18], [0, -Math.PI / 2, 0], [0.125, 1, 1]]],
      XZ: [[new Mesh(new PlaneGeometry(0.295, 0.295), _2.clone()), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]], [new Line(F, O), [0.18, 0, 0.3], null, [0.125, 1, 1]], [new Line(F, O), [0.3, 0, 0.18], [0, -Math.PI / 2, 0], [0.125, 1, 1]]]
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
      DELTA: [[new Line(H2(), o), null, null, null, "helper"]],
      X: [[new Line(F, o.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]],
      Y: [[new Line(F, o.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]],
      Z: [[new Line(F, o.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]]
    }, _e = {
      X: [[new Line(B(1, 0.5), C)], [new Mesh(new OctahedronGeometry(0.04, 0), c), [0, 0, 0.99], null, [1, 3, 1]]],
      Y: [[new Line(B(1, 0.5), L), null, [0, 0, -Math.PI / 2]], [new Mesh(new OctahedronGeometry(0.04, 0), p2), [0, 0, 0.99], null, [3, 1, 1]]],
      Z: [[new Line(B(1, 0.5), S), null, [0, Math.PI / 2, 0]], [new Mesh(new OctahedronGeometry(0.04, 0), h2), [0.99, 0, 0], null, [1, 3, 1]]],
      E: [[new Line(B(1.25, 1), D2), null, [0, Math.PI / 2, 0]], [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), D2), [1.17, 0, 0], [0, 0, -Math.PI / 2], [1, 1, 1e-3]], [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), D2), [-1.17, 0, 0], [0, 0, Math.PI / 2], [1, 1, 1e-3]], [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), D2), [0, -1.17, 0], [Math.PI, 0, 0], [1, 1, 1e-3]], [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), D2), [0, 1.17, 0], [0, 0, 0], [1, 1, 1e-3]]],
      XYZE: [[new Line(B(1, 1), I2), null, [0, Math.PI / 2, 0]]]
    }, ce2 = {
      AXIS: [[new Line(F, o.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]]
    }, me = {
      X: [[new Mesh(new TorusGeometry(1, 0.1, 4, 24), r), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]],
      Y: [[new Mesh(new TorusGeometry(1, 0.1, 4, 24), r), [0, 0, 0], [Math.PI / 2, 0, 0]]],
      Z: [[new Mesh(new TorusGeometry(1, 0.1, 4, 24), r), [0, 0, 0], [0, 0, -Math.PI / 2]]],
      E: [[new Mesh(new TorusGeometry(1.25, 0.1, 2, 24), r)]],
      XYZE: [[new Mesh(new SphereGeometry(0.7, 10, 8), r)]]
    }, he = {
      X: [[new Mesh(G, c), [0.8, 0, 0], [0, 0, -Math.PI / 2]], [new Line(F, C), null, null, [0.8, 1, 1]]],
      Y: [[new Mesh(G, p2), [0, 0.8, 0]], [new Line(F, L), null, [0, 0, Math.PI / 2], [0.8, 1, 1]]],
      Z: [[new Mesh(G, h2), [0, 0, 0.8], [Math.PI / 2, 0, 0]], [new Line(F, S), null, [0, -Math.PI / 2, 0], [0.8, 1, 1]]],
      XY: [[new Mesh(G, g), [0.85, 0.85, 0], null, [2, 2, 0.2]], [new Line(F, N), [0.855, 0.98, 0], null, [0.125, 1, 1]], [new Line(F, N), [0.98, 0.855, 0], [0, 0, Math.PI / 2], [0.125, 1, 1]]],
      YZ: [[new Mesh(G, w), [0, 0.85, 0.85], null, [0.2, 2, 2]], [new Line(F, R), [0, 0.855, 0.98], [0, 0, Math.PI / 2], [0.125, 1, 1]], [new Line(F, R), [0, 0.98, 0.855], [0, -Math.PI / 2, 0], [0.125, 1, 1]]],
      XZ: [[new Mesh(G, _2), [0.85, 0, 0.85], null, [2, 0.2, 2]], [new Line(F, O), [0.855, 0, 0.98], null, [0.125, 1, 1]], [new Line(F, O), [0.98, 0, 0.855], [0, -Math.PI / 2, 0], [0.125, 1, 1]]],
      XYZX: [[new Mesh(new BoxGeometry(0.125, 0.125, 0.125), m.clone()), [1.1, 0, 0]]],
      XYZY: [[new Mesh(new BoxGeometry(0.125, 0.125, 0.125), m.clone()), [0, 1.1, 0]]],
      XYZZ: [[new Mesh(new BoxGeometry(0.125, 0.125, 0.125), m.clone()), [0, 0, 1.1]]]
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
    }, X2 = {
      X: [[new Line(F, o.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]],
      Y: [[new Line(F, o.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]],
      Z: [[new Line(F, o.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]]
    }, Se2 = (fe2) => {
      const oe2 = new Object3D();
      for (let ne in fe2)
        for (let ge = fe2[ne].length; ge--; ) {
          const A2 = fe2[ne][ge][0].clone(), ae = fe2[ne][ge][1], Ne = fe2[ne][ge][2], Ue = fe2[ne][ge][3], xe2 = fe2[ne][ge][4];
          A2.name = ne, A2.tag = xe2, ae && A2.position.set(ae[0], ae[1], ae[2]), Ne && A2.rotation.set(Ne[0], Ne[1], Ne[2]), Ue && A2.scale.set(Ue[0], Ue[1], Ue[2]), A2.updateMatrix();
          const rt2 = A2.geometry.clone();
          rt2.applyMatrix4(A2.matrix), A2.geometry = rt2, A2.renderOrder = 1 / 0, A2.position.set(0, 0, 0), A2.rotation.set(0, 0, 0), A2.scale.set(1, 1, 1), oe2.add(A2);
        }
      return oe2;
    };
    this.gizmo = {}, this.picker = {}, this.helper = {}, this.add(this.gizmo.translate = Se2(K2)), this.add(this.gizmo.rotate = Se2(_e)), this.add(this.gizmo.scale = Se2(he)), this.add(this.picker.translate = Se2(q)), this.add(this.picker.rotate = Se2(me)), this.add(this.picker.scale = Se2(ee)), this.add(this.helper.translate = Se2(pe)), this.add(this.helper.rotate = Se2(ce2)), this.add(this.helper.scale = Se2(X2)), this.picker.translate.visible = false, this.picker.rotate.visible = false, this.picker.scale.visible = false;
  }
  // updateMatrixWorld will update transformations and appearance of individual handles
};
var vp = class extends Mesh {
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
var ui = new Euler(0, 0, 0, "YXZ");
var pi = new Vector3();
var bp = {
  type: "change"
};
var gp = {
  type: "lock"
};
var _p = {
  type: "unlock"
};
var ma = Math.PI / 2;
var wp = class extends EventDispatcher {
  constructor(i, s) {
    super(), P(this, "camera", void 0), P(this, "domElement", void 0), P(this, "isLocked", void 0), P(this, "minPolarAngle", void 0), P(this, "maxPolarAngle", void 0), P(this, "pointerSpeed", void 0), P(this, "onMouseMove", (r) => {
      if (!this.domElement || this.isLocked === false)
        return;
      const o = r.movementX || r.mozMovementX || r.webkitMovementX || 0, c = r.movementY || r.mozMovementY || r.webkitMovementY || 0;
      ui.setFromQuaternion(this.camera.quaternion), ui.y -= o * 2e-3 * this.pointerSpeed, ui.x -= c * 2e-3 * this.pointerSpeed, ui.x = Math.max(ma - this.maxPolarAngle, Math.min(ma - this.minPolarAngle, ui.x)), this.camera.quaternion.setFromEuler(ui), this.dispatchEvent(bp);
    }), P(this, "onPointerlockChange", () => {
      this.domElement && (this.domElement.ownerDocument.pointerLockElement === this.domElement ? (this.dispatchEvent(gp), this.isLocked = true) : (this.dispatchEvent(_p), this.isLocked = false));
    }), P(this, "onPointerlockError", () => {
      console.error("THREE.PointerLockControls: Unable to use Pointer Lock API");
    }), P(this, "connect", (r) => {
      this.domElement = r || this.domElement, this.domElement && (this.domElement.ownerDocument.addEventListener("mousemove", this.onMouseMove), this.domElement.ownerDocument.addEventListener("pointerlockchange", this.onPointerlockChange), this.domElement.ownerDocument.addEventListener("pointerlockerror", this.onPointerlockError));
    }), P(this, "disconnect", () => {
      this.domElement && (this.domElement.ownerDocument.removeEventListener("mousemove", this.onMouseMove), this.domElement.ownerDocument.removeEventListener("pointerlockchange", this.onPointerlockChange), this.domElement.ownerDocument.removeEventListener("pointerlockerror", this.onPointerlockError));
    }), P(this, "dispose", () => {
      this.disconnect();
    }), P(this, "getObject", () => this.camera), P(this, "direction", new Vector3(0, 0, -1)), P(this, "getDirection", (r) => r.copy(this.direction).applyQuaternion(this.camera.quaternion)), P(this, "moveForward", (r) => {
      pi.setFromMatrixColumn(this.camera.matrix, 0), pi.crossVectors(this.camera.up, pi), this.camera.position.addScaledVector(pi, r);
    }), P(this, "moveRight", (r) => {
      pi.setFromMatrixColumn(this.camera.matrix, 0), this.camera.position.addScaledVector(pi, r);
    }), P(this, "lock", () => {
      this.domElement && this.domElement.requestPointerLock();
    }), P(this, "unlock", () => {
      this.domElement && this.domElement.ownerDocument.exitPointerLock();
    }), this.camera = i, this.domElement = s, this.isLocked = false, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.pointerSpeed = 1, s && this.connect(s);
  }
};
var fa = (f, i) => (f % i + i) % i;
var qa = class extends EventDispatcher {
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
  constructor(i, s) {
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
    }), P(this, "target0", void 0), P(this, "position0", void 0), P(this, "zoom0", void 0), P(this, "_domElementKeyEvents", null), P(this, "getPolarAngle", void 0), P(this, "getAzimuthalAngle", void 0), P(this, "setPolarAngle", void 0), P(this, "setAzimuthalAngle", void 0), P(this, "getDistance", void 0), P(this, "listenToKeyEvents", void 0), P(this, "saveState", void 0), P(this, "reset", void 0), P(this, "update", void 0), P(this, "connect", void 0), P(this, "dispose", void 0), this.object = i, this.domElement = s, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object instanceof PerspectiveCamera ? this.object.zoom : 1, this.getPolarAngle = () => w.phi, this.getAzimuthalAngle = () => w.theta, this.setPolarAngle = (M) => {
      let U2 = fa(M, 2 * Math.PI), W = w.phi;
      W < 0 && (W += 2 * Math.PI), U2 < 0 && (U2 += 2 * Math.PI);
      let ie2 = Math.abs(U2 - W);
      2 * Math.PI - ie2 < ie2 && (U2 < W ? U2 += 2 * Math.PI : W += 2 * Math.PI), _2.phi = U2 - W, r.update();
    }, this.setAzimuthalAngle = (M) => {
      let U2 = fa(M, 2 * Math.PI), W = w.theta;
      W < 0 && (W += 2 * Math.PI), U2 < 0 && (U2 += 2 * Math.PI);
      let ie2 = Math.abs(U2 - W);
      2 * Math.PI - ie2 < ie2 && (U2 < W ? U2 += 2 * Math.PI : W += 2 * Math.PI), _2.theta = U2 - W, r.update();
    }, this.getDistance = () => r.object.position.distanceTo(r.target), this.listenToKeyEvents = (M) => {
      M.addEventListener("keydown", Et2), this._domElementKeyEvents = M;
    }, this.saveState = () => {
      r.target0.copy(r.target), r.position0.copy(r.object.position), r.zoom0 = r.object instanceof PerspectiveCamera ? r.object.zoom : 1;
    }, this.reset = () => {
      r.target.copy(r.target0), r.object.position.copy(r.position0), r.object instanceof PerspectiveCamera && (r.object.zoom = r.zoom0, r.object.updateProjectionMatrix()), r.dispatchEvent(o), r.update(), m = h2.NONE;
    }, this.update = (() => {
      const M = new Vector3(), U2 = new Quaternion().setFromUnitVectors(i.up, new Vector3(0, 1, 0)), W = U2.clone().invert(), ie2 = new Vector3(), Ee2 = new Quaternion(), Fe = 2 * Math.PI;
      return function() {
        const fn = r.object.position;
        M.copy(fn).sub(r.target), M.applyQuaternion(U2), w.setFromVector3(M), r.autoRotate && m === h2.NONE && pe(K2()), r.enableDamping ? (w.theta += _2.theta * r.dampingFactor, w.phi += _2.phi * r.dampingFactor) : (w.theta += _2.theta, w.phi += _2.phi);
        let $e = r.minAzimuthAngle, Xe = r.maxAzimuthAngle;
        return isFinite($e) && isFinite(Xe) && ($e < -Math.PI ? $e += Fe : $e > Math.PI && ($e -= Fe), Xe < -Math.PI ? Xe += Fe : Xe > Math.PI && (Xe -= Fe), $e <= Xe ? w.theta = Math.max($e, Math.min(Xe, w.theta)) : w.theta = w.theta > ($e + Xe) / 2 ? Math.max($e, w.theta) : Math.min(Xe, w.theta)), w.phi = Math.max(r.minPolarAngle, Math.min(r.maxPolarAngle, w.phi)), w.makeSafe(), w.radius *= y, w.radius = Math.max(r.minDistance, Math.min(r.maxDistance, w.radius)), r.enableDamping === true ? r.target.addScaledVector(C, r.dampingFactor) : r.target.add(C), M.setFromSpherical(w), M.applyQuaternion(W), fn.copy(r.target).add(M), r.object.lookAt(r.target), r.enableDamping === true ? (_2.theta *= 1 - r.dampingFactor, _2.phi *= 1 - r.dampingFactor, C.multiplyScalar(1 - r.dampingFactor)) : (_2.set(0, 0, 0), C.set(0, 0, 0)), y = 1, L || ie2.distanceToSquared(r.object.position) > g || 8 * (1 - Ee2.dot(r.object.quaternion)) > g ? (r.dispatchEvent(o), ie2.copy(r.object.position), Ee2.copy(r.object.quaternion), L = false, true) : false;
      };
    })(), this.connect = (M) => {
      M === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'), r.domElement = M, r.domElement.style.touchAction = "none", r.domElement.addEventListener("contextmenu", mn), r.domElement.addEventListener("pointerdown", ot2), r.domElement.addEventListener("pointercancel", Hn), r.domElement.addEventListener("wheel", $n);
    }, this.dispose = () => {
      var M, U2, W, ie2, Ee2, Fe;
      (M = r.domElement) === null || M === void 0 || M.removeEventListener("contextmenu", mn), (U2 = r.domElement) === null || U2 === void 0 || U2.removeEventListener("pointerdown", ot2), (W = r.domElement) === null || W === void 0 || W.removeEventListener("pointercancel", Hn), (ie2 = r.domElement) === null || ie2 === void 0 || ie2.removeEventListener("wheel", $n), (Ee2 = r.domElement) === null || Ee2 === void 0 || Ee2.ownerDocument.removeEventListener("pointermove", dn), (Fe = r.domElement) === null || Fe === void 0 || Fe.ownerDocument.removeEventListener("pointerup", bt2), r._domElementKeyEvents !== null && r._domElementKeyEvents.removeEventListener("keydown", Et2);
    };
    const r = this, o = {
      type: "change"
    }, c = {
      type: "start"
    }, p2 = {
      type: "end"
    }, h2 = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let m = h2.NONE;
    const g = 1e-6, w = new Spherical(), _2 = new Spherical();
    let y = 1;
    const C = new Vector3();
    let L = false;
    const S = new Vector2(), R = new Vector2(), O = new Vector2(), N = new Vector2(), I2 = new Vector2(), D2 = new Vector2(), Y = new Vector2(), G = new Vector2(), F = new Vector2(), B = [], H2 = {};
    function K2() {
      return 2 * Math.PI / 60 / 60 * r.autoRotateSpeed;
    }
    function q() {
      return Math.pow(0.95, r.zoomSpeed);
    }
    function pe(M) {
      r.reverseOrbit ? _2.theta += M : _2.theta -= M;
    }
    function _e(M) {
      r.reverseOrbit ? _2.phi += M : _2.phi -= M;
    }
    const ce2 = (() => {
      const M = new Vector3();
      return function(W, ie2) {
        M.setFromMatrixColumn(ie2, 0), M.multiplyScalar(-W), C.add(M);
      };
    })(), me = (() => {
      const M = new Vector3();
      return function(W, ie2) {
        r.screenSpacePanning === true ? M.setFromMatrixColumn(ie2, 1) : (M.setFromMatrixColumn(ie2, 0), M.crossVectors(r.object.up, M)), M.multiplyScalar(W), C.add(M);
      };
    })(), he = (() => {
      const M = new Vector3();
      return function(W, ie2) {
        const Ee2 = r.domElement;
        if (Ee2 && r.object instanceof PerspectiveCamera && r.object.isPerspectiveCamera) {
          const Fe = r.object.position;
          M.copy(Fe).sub(r.target);
          let Gt = M.length();
          Gt *= Math.tan(r.object.fov / 2 * Math.PI / 180), ce2(2 * W * Gt / Ee2.clientHeight, r.object.matrix), me(2 * ie2 * Gt / Ee2.clientHeight, r.object.matrix);
        } else
          Ee2 && r.object instanceof OrthographicCamera && r.object.isOrthographicCamera ? (ce2(W * (r.object.right - r.object.left) / r.object.zoom / Ee2.clientWidth, r.object.matrix), me(ie2 * (r.object.top - r.object.bottom) / r.object.zoom / Ee2.clientHeight, r.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), r.enablePan = false);
      };
    })();
    function ee(M) {
      r.object instanceof PerspectiveCamera && r.object.isPerspectiveCamera ? y /= M : r.object instanceof OrthographicCamera && r.object.isOrthographicCamera ? (r.object.zoom = Math.max(r.minZoom, Math.min(r.maxZoom, r.object.zoom * M)), r.object.updateProjectionMatrix(), L = true) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), r.enableZoom = false);
    }
    function X2(M) {
      r.object instanceof PerspectiveCamera && r.object.isPerspectiveCamera ? y *= M : r.object instanceof OrthographicCamera && r.object.isOrthographicCamera ? (r.object.zoom = Math.max(r.minZoom, Math.min(r.maxZoom, r.object.zoom / M)), r.object.updateProjectionMatrix(), L = true) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), r.enableZoom = false);
    }
    function Se2(M) {
      S.set(M.clientX, M.clientY);
    }
    function fe2(M) {
      Y.set(M.clientX, M.clientY);
    }
    function oe2(M) {
      N.set(M.clientX, M.clientY);
    }
    function ne(M) {
      R.set(M.clientX, M.clientY), O.subVectors(R, S).multiplyScalar(r.rotateSpeed);
      const U2 = r.domElement;
      U2 && (pe(2 * Math.PI * O.x / U2.clientHeight), _e(2 * Math.PI * O.y / U2.clientHeight)), S.copy(R), r.update();
    }
    function ge(M) {
      G.set(M.clientX, M.clientY), F.subVectors(G, Y), F.y > 0 ? ee(q()) : F.y < 0 && X2(q()), Y.copy(G), r.update();
    }
    function A2(M) {
      I2.set(M.clientX, M.clientY), D2.subVectors(I2, N).multiplyScalar(r.panSpeed), he(D2.x, D2.y), N.copy(I2), r.update();
    }
    function ae(M) {
      M.deltaY < 0 ? X2(q()) : M.deltaY > 0 && ee(q()), r.update();
    }
    function Ne(M) {
      let U2 = false;
      switch (M.code) {
        case r.keys.UP:
          he(0, r.keyPanSpeed), U2 = true;
          break;
        case r.keys.BOTTOM:
          he(0, -r.keyPanSpeed), U2 = true;
          break;
        case r.keys.LEFT:
          he(r.keyPanSpeed, 0), U2 = true;
          break;
        case r.keys.RIGHT:
          he(-r.keyPanSpeed, 0), U2 = true;
          break;
      }
      U2 && (M.preventDefault(), r.update());
    }
    function Ue() {
      if (B.length == 1)
        S.set(B[0].pageX, B[0].pageY);
      else {
        const M = 0.5 * (B[0].pageX + B[1].pageX), U2 = 0.5 * (B[0].pageY + B[1].pageY);
        S.set(M, U2);
      }
    }
    function xe2() {
      if (B.length == 1)
        N.set(B[0].pageX, B[0].pageY);
      else {
        const M = 0.5 * (B[0].pageX + B[1].pageX), U2 = 0.5 * (B[0].pageY + B[1].pageY);
        N.set(M, U2);
      }
    }
    function rt2() {
      const M = B[0].pageX - B[1].pageX, U2 = B[0].pageY - B[1].pageY, W = Math.sqrt(M * M + U2 * U2);
      Y.set(0, W);
    }
    function Un() {
      r.enableZoom && rt2(), r.enablePan && xe2();
    }
    function Ze2() {
      r.enableZoom && rt2(), r.enableRotate && Ue();
    }
    function Gn(M) {
      if (B.length == 1)
        R.set(M.pageX, M.pageY);
      else {
        const W = St(M), ie2 = 0.5 * (M.pageX + W.x), Ee2 = 0.5 * (M.pageY + W.y);
        R.set(ie2, Ee2);
      }
      O.subVectors(R, S).multiplyScalar(r.rotateSpeed);
      const U2 = r.domElement;
      U2 && (pe(2 * Math.PI * O.x / U2.clientHeight), _e(2 * Math.PI * O.y / U2.clientHeight)), S.copy(R);
    }
    function hn(M) {
      if (B.length == 1)
        I2.set(M.pageX, M.pageY);
      else {
        const U2 = St(M), W = 0.5 * (M.pageX + U2.x), ie2 = 0.5 * (M.pageY + U2.y);
        I2.set(W, ie2);
      }
      D2.subVectors(I2, N).multiplyScalar(r.panSpeed), he(D2.x, D2.y), N.copy(I2);
    }
    function vt2(M) {
      const U2 = St(M), W = M.pageX - U2.x, ie2 = M.pageY - U2.y, Ee2 = Math.sqrt(W * W + ie2 * ie2);
      G.set(0, Ee2), F.set(0, Math.pow(G.y / Y.y, r.zoomSpeed)), ee(F.y), Y.copy(G);
    }
    function At(M) {
      r.enableZoom && vt2(M), r.enablePan && hn(M);
    }
    function Ke(M) {
      r.enableZoom && vt2(M), r.enableRotate && Gn(M);
    }
    function ot2(M) {
      if (r.enabled !== false) {
        if (B.length === 0) {
          var U2, W;
          (U2 = r.domElement) === null || U2 === void 0 || U2.ownerDocument.addEventListener("pointermove", dn), (W = r.domElement) === null || W === void 0 || W.ownerDocument.addEventListener("pointerup", bt2);
        }
        Yn(M), M.pointerType === "touch" ? Mt(M) : bi(M);
      }
    }
    function dn(M) {
      r.enabled !== false && (M.pointerType === "touch" ? Xn(M) : Kn(M));
    }
    function bt2(M) {
      if (Ct(M), B.length === 0) {
        var U2, W, ie2;
        (U2 = r.domElement) === null || U2 === void 0 || U2.releasePointerCapture(M.pointerId), (W = r.domElement) === null || W === void 0 || W.ownerDocument.removeEventListener("pointermove", dn), (ie2 = r.domElement) === null || ie2 === void 0 || ie2.ownerDocument.removeEventListener("pointerup", bt2);
      }
      r.dispatchEvent(p2), m = h2.NONE;
    }
    function Hn(M) {
      Ct(M);
    }
    function bi(M) {
      let U2;
      switch (M.button) {
        case 0:
          U2 = r.mouseButtons.LEFT;
          break;
        case 1:
          U2 = r.mouseButtons.MIDDLE;
          break;
        case 2:
          U2 = r.mouseButtons.RIGHT;
          break;
        default:
          U2 = -1;
      }
      switch (U2) {
        case MOUSE.DOLLY:
          if (r.enableZoom === false)
            return;
          fe2(M), m = h2.DOLLY;
          break;
        case MOUSE.ROTATE:
          if (M.ctrlKey || M.metaKey || M.shiftKey) {
            if (r.enablePan === false)
              return;
            oe2(M), m = h2.PAN;
          } else {
            if (r.enableRotate === false)
              return;
            Se2(M), m = h2.ROTATE;
          }
          break;
        case MOUSE.PAN:
          if (M.ctrlKey || M.metaKey || M.shiftKey) {
            if (r.enableRotate === false)
              return;
            Se2(M), m = h2.ROTATE;
          } else {
            if (r.enablePan === false)
              return;
            oe2(M), m = h2.PAN;
          }
          break;
        default:
          m = h2.NONE;
      }
      m !== h2.NONE && r.dispatchEvent(c);
    }
    function Kn(M) {
      if (r.enabled !== false)
        switch (m) {
          case h2.ROTATE:
            if (r.enableRotate === false)
              return;
            ne(M);
            break;
          case h2.DOLLY:
            if (r.enableZoom === false)
              return;
            ge(M);
            break;
          case h2.PAN:
            if (r.enablePan === false)
              return;
            A2(M);
            break;
        }
    }
    function $n(M) {
      r.enabled === false || r.enableZoom === false || m !== h2.NONE && m !== h2.ROTATE || (M.preventDefault(), r.dispatchEvent(c), ae(M), r.dispatchEvent(p2));
    }
    function Et2(M) {
      r.enabled === false || r.enablePan === false || Ne(M);
    }
    function Mt(M) {
      switch (gt2(M), B.length) {
        case 1:
          switch (r.touches.ONE) {
            case TOUCH.ROTATE:
              if (r.enableRotate === false)
                return;
              Ue(), m = h2.TOUCH_ROTATE;
              break;
            case TOUCH.PAN:
              if (r.enablePan === false)
                return;
              xe2(), m = h2.TOUCH_PAN;
              break;
            default:
              m = h2.NONE;
          }
          break;
        case 2:
          switch (r.touches.TWO) {
            case TOUCH.DOLLY_PAN:
              if (r.enableZoom === false && r.enablePan === false)
                return;
              Un(), m = h2.TOUCH_DOLLY_PAN;
              break;
            case TOUCH.DOLLY_ROTATE:
              if (r.enableZoom === false && r.enableRotate === false)
                return;
              Ze2(), m = h2.TOUCH_DOLLY_ROTATE;
              break;
            default:
              m = h2.NONE;
          }
          break;
        default:
          m = h2.NONE;
      }
      m !== h2.NONE && r.dispatchEvent(c);
    }
    function Xn(M) {
      switch (gt2(M), m) {
        case h2.TOUCH_ROTATE:
          if (r.enableRotate === false)
            return;
          Gn(M), r.update();
          break;
        case h2.TOUCH_PAN:
          if (r.enablePan === false)
            return;
          hn(M), r.update();
          break;
        case h2.TOUCH_DOLLY_PAN:
          if (r.enableZoom === false && r.enablePan === false)
            return;
          At(M), r.update();
          break;
        case h2.TOUCH_DOLLY_ROTATE:
          if (r.enableZoom === false && r.enableRotate === false)
            return;
          Ke(M), r.update();
          break;
        default:
          m = h2.NONE;
      }
    }
    function mn(M) {
      r.enabled !== false && M.preventDefault();
    }
    function Yn(M) {
      B.push(M);
    }
    function Ct(M) {
      delete H2[M.pointerId];
      for (let U2 = 0; U2 < B.length; U2++)
        if (B[U2].pointerId == M.pointerId) {
          B.splice(U2, 1);
          return;
        }
    }
    function gt2(M) {
      let U2 = H2[M.pointerId];
      U2 === void 0 && (U2 = new Vector2(), H2[M.pointerId] = U2), U2.set(M.pageX, M.pageY);
    }
    function St(M) {
      const U2 = M.pointerId === B[0].pointerId ? B[1] : B[0];
      return H2[U2.pointerId];
    }
    s !== void 0 && this.connect(s), this.update();
  }
};
var yp = class extends qa {
  constructor(i, s) {
    super(i, s), this.screenSpacePanning = false, this.mouseButtons.LEFT = MOUSE.PAN, this.mouseButtons.RIGHT = MOUSE.ROTATE, this.touches.ONE = TOUCH.PAN, this.touches.TWO = TOUCH.DOLLY_ROTATE;
  }
};
var xp = class extends Loader {
  constructor(i) {
    super(i), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(s) {
      return new kp(s);
    }), this.register(function(s) {
      return new Ip(s);
    }), this.register(function(s) {
      return new Dp(s);
    }), this.register(function(s) {
      return new Op(s);
    }), this.register(function(s) {
      return new Mp(s);
    }), this.register(function(s) {
      return new Sp(s);
    }), this.register(function(s) {
      return new Lp(s);
    }), this.register(function(s) {
      return new Rp(s);
    }), this.register(function(s) {
      return new Tp(s);
    }), this.register(function(s) {
      return new Vp(s);
    }), this.register(function(s) {
      return new Ap(s);
    }), this.register(function(s) {
      return new Cp(s);
    }), this.register(function(s) {
      return new Np(s);
    }), this.register(function(s) {
      return new Bp(s);
    });
  }
  load(i, s, r, o) {
    const c = this;
    let p2;
    this.resourcePath !== "" ? p2 = this.resourcePath : this.path !== "" ? p2 = this.path : p2 = LoaderUtils.extractUrlBase(i), this.manager.itemStart(i);
    const h2 = function(g) {
      o ? o(g) : console.error(g), c.manager.itemError(i), c.manager.itemEnd(i);
    }, m = new FileLoader(this.manager);
    m.setPath(this.path), m.setResponseType("arraybuffer"), m.setRequestHeader(this.requestHeader), m.setWithCredentials(this.withCredentials), m.load(i, function(g) {
      try {
        c.parse(g, p2, function(w) {
          s(w), c.manager.itemEnd(i);
        }, h2);
      } catch (w) {
        h2(w);
      }
    }, r, h2);
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
  parse(i, s, r, o) {
    let c;
    const p2 = {}, h2 = {}, m = new TextDecoder();
    if (typeof i == "string")
      c = JSON.parse(i);
    else if (i instanceof ArrayBuffer)
      if (m.decode(new Uint8Array(i, 0, 4)) === Qa) {
        try {
          p2[le2.KHR_BINARY_GLTF] = new Fp(i);
        } catch (_2) {
          o && o(_2);
          return;
        }
        c = JSON.parse(p2[le2.KHR_BINARY_GLTF].content);
      } else
        c = JSON.parse(m.decode(i));
    else
      c = i;
    if (c.asset === void 0 || c.asset.version[0] < 2) {
      o && o(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const g = new Wp(c, {
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
      h2[_2.name] = _2, p2[_2.name] = true;
    }
    if (c.extensionsUsed)
      for (let w = 0; w < c.extensionsUsed.length; ++w) {
        const _2 = c.extensionsUsed[w], y = c.extensionsRequired || [];
        switch (_2) {
          case le2.KHR_MATERIALS_UNLIT:
            p2[_2] = new Pp();
            break;
          case le2.KHR_DRACO_MESH_COMPRESSION:
            p2[_2] = new jp(c, this.dracoLoader);
            break;
          case le2.KHR_TEXTURE_TRANSFORM:
            p2[_2] = new zp();
            break;
          case le2.KHR_MESH_QUANTIZATION:
            p2[_2] = new Up();
            break;
          default:
            y.indexOf(_2) >= 0 && h2[_2] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + _2 + '".');
        }
      }
    g.setExtensions(p2), g.setPlugins(h2), g.parse(r, o);
  }
  parseAsync(i, s) {
    const r = this;
    return new Promise(function(o, c) {
      r.parse(i, s, o, c);
    });
  }
};
function Ep() {
  let f = {};
  return {
    get: function(i) {
      return f[i];
    },
    add: function(i, s) {
      f[i] = s;
    },
    remove: function(i) {
      delete f[i];
    },
    removeAll: function() {
      f = {};
    }
  };
}
var le2 = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
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
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
var Cp = class {
  constructor(i) {
    this.parser = i, this.name = le2.KHR_LIGHTS_PUNCTUAL, this.cache = {
      refs: {},
      uses: {}
    };
  }
  _markDefs() {
    const i = this.parser, s = this.parser.json.nodes || [];
    for (let r = 0, o = s.length; r < o; r++) {
      const c = s[r];
      c.extensions && c.extensions[this.name] && c.extensions[this.name].light !== void 0 && i._addNodeRef(this.cache, c.extensions[this.name].light);
    }
  }
  _loadLight(i) {
    const s = this.parser, r = "light:" + i;
    let o = s.cache.get(r);
    if (o)
      return o;
    const c = s.json, m = ((c.extensions && c.extensions[this.name] || {}).lights || [])[i];
    let g;
    const w = new Color(16777215);
    m.color !== void 0 && w.fromArray(m.color);
    const _2 = m.range !== void 0 ? m.range : 0;
    switch (m.type) {
      case "directional":
        g = new DirectionalLight(w), g.target.position.set(0, 0, -1), g.add(g.target);
        break;
      case "point":
        g = new PointLight(w), g.distance = _2;
        break;
      case "spot":
        g = new SpotLight(w), g.distance = _2, m.spot = m.spot || {}, m.spot.innerConeAngle = m.spot.innerConeAngle !== void 0 ? m.spot.innerConeAngle : 0, m.spot.outerConeAngle = m.spot.outerConeAngle !== void 0 ? m.spot.outerConeAngle : Math.PI / 4, g.angle = m.spot.outerConeAngle, g.penumbra = 1 - m.spot.innerConeAngle / m.spot.outerConeAngle, g.target.position.set(0, 0, -1), g.add(g.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + m.type);
    }
    return g.position.set(0, 0, 0), g.decay = 2, ln(g, m), m.intensity !== void 0 && (g.intensity = m.intensity), g.name = s.createUniqueName(m.name || "light_" + i), o = Promise.resolve(g), s.cache.add(r, o), o;
  }
  getDependency(i, s) {
    if (i === "light")
      return this._loadLight(s);
  }
  createNodeAttachment(i) {
    const s = this, r = this.parser, c = r.json.nodes[i], h2 = (c.extensions && c.extensions[this.name] || {}).light;
    return h2 === void 0 ? null : this._loadLight(h2).then(function(m) {
      return r._getNodeRef(s.cache, h2, m);
    });
  }
};
var Pp = class {
  constructor() {
    this.name = le2.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return MeshBasicMaterial;
  }
  extendParams(i, s, r) {
    const o = [];
    i.color = new Color(1, 1, 1), i.opacity = 1;
    const c = s.pbrMetallicRoughness;
    if (c) {
      if (Array.isArray(c.baseColorFactor)) {
        const p2 = c.baseColorFactor;
        i.color.fromArray(p2), i.opacity = p2[3];
      }
      c.baseColorTexture !== void 0 && o.push(r.assignTexture(i, "map", c.baseColorTexture, sRGBEncoding));
    }
    return Promise.all(o);
  }
};
var Tp = class {
  constructor(i) {
    this.parser = i, this.name = le2.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(i, s) {
    const o = this.parser.json.materials[i];
    if (!o.extensions || !o.extensions[this.name])
      return Promise.resolve();
    const c = o.extensions[this.name].emissiveStrength;
    return c !== void 0 && (s.emissiveIntensity = c), Promise.resolve();
  }
};
var kp = class {
  constructor(i) {
    this.parser = i, this.name = le2.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(i) {
    const r = this.parser.json.materials[i];
    return !r.extensions || !r.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(i, s) {
    const r = this.parser, o = r.json.materials[i];
    if (!o.extensions || !o.extensions[this.name])
      return Promise.resolve();
    const c = [], p2 = o.extensions[this.name];
    if (p2.clearcoatFactor !== void 0 && (s.clearcoat = p2.clearcoatFactor), p2.clearcoatTexture !== void 0 && c.push(r.assignTexture(s, "clearcoatMap", p2.clearcoatTexture)), p2.clearcoatRoughnessFactor !== void 0 && (s.clearcoatRoughness = p2.clearcoatRoughnessFactor), p2.clearcoatRoughnessTexture !== void 0 && c.push(r.assignTexture(s, "clearcoatRoughnessMap", p2.clearcoatRoughnessTexture)), p2.clearcoatNormalTexture !== void 0 && (c.push(r.assignTexture(s, "clearcoatNormalMap", p2.clearcoatNormalTexture)), p2.clearcoatNormalTexture.scale !== void 0)) {
      const h2 = p2.clearcoatNormalTexture.scale;
      s.clearcoatNormalScale = new Vector2(h2, h2);
    }
    return Promise.all(c);
  }
};
var Ap = class {
  constructor(i) {
    this.parser = i, this.name = le2.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(i) {
    const r = this.parser.json.materials[i];
    return !r.extensions || !r.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(i, s) {
    const r = this.parser, o = r.json.materials[i];
    if (!o.extensions || !o.extensions[this.name])
      return Promise.resolve();
    const c = [], p2 = o.extensions[this.name];
    return p2.iridescenceFactor !== void 0 && (s.iridescence = p2.iridescenceFactor), p2.iridescenceTexture !== void 0 && c.push(r.assignTexture(s, "iridescenceMap", p2.iridescenceTexture)), p2.iridescenceIor !== void 0 && (s.iridescenceIOR = p2.iridescenceIor), s.iridescenceThicknessRange === void 0 && (s.iridescenceThicknessRange = [100, 400]), p2.iridescenceThicknessMinimum !== void 0 && (s.iridescenceThicknessRange[0] = p2.iridescenceThicknessMinimum), p2.iridescenceThicknessMaximum !== void 0 && (s.iridescenceThicknessRange[1] = p2.iridescenceThicknessMaximum), p2.iridescenceThicknessTexture !== void 0 && c.push(r.assignTexture(s, "iridescenceThicknessMap", p2.iridescenceThicknessTexture)), Promise.all(c);
  }
};
var Mp = class {
  constructor(i) {
    this.parser = i, this.name = le2.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(i) {
    const r = this.parser.json.materials[i];
    return !r.extensions || !r.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(i, s) {
    const r = this.parser, o = r.json.materials[i];
    if (!o.extensions || !o.extensions[this.name])
      return Promise.resolve();
    const c = [];
    s.sheenColor = new Color(0, 0, 0), s.sheenRoughness = 0, s.sheen = 1;
    const p2 = o.extensions[this.name];
    return p2.sheenColorFactor !== void 0 && s.sheenColor.fromArray(p2.sheenColorFactor), p2.sheenRoughnessFactor !== void 0 && (s.sheenRoughness = p2.sheenRoughnessFactor), p2.sheenColorTexture !== void 0 && c.push(r.assignTexture(s, "sheenColorMap", p2.sheenColorTexture, sRGBEncoding)), p2.sheenRoughnessTexture !== void 0 && c.push(r.assignTexture(s, "sheenRoughnessMap", p2.sheenRoughnessTexture)), Promise.all(c);
  }
};
var Sp = class {
  constructor(i) {
    this.parser = i, this.name = le2.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(i) {
    const r = this.parser.json.materials[i];
    return !r.extensions || !r.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(i, s) {
    const r = this.parser, o = r.json.materials[i];
    if (!o.extensions || !o.extensions[this.name])
      return Promise.resolve();
    const c = [], p2 = o.extensions[this.name];
    return p2.transmissionFactor !== void 0 && (s.transmission = p2.transmissionFactor), p2.transmissionTexture !== void 0 && c.push(r.assignTexture(s, "transmissionMap", p2.transmissionTexture)), Promise.all(c);
  }
};
var Lp = class {
  constructor(i) {
    this.parser = i, this.name = le2.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(i) {
    const r = this.parser.json.materials[i];
    return !r.extensions || !r.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(i, s) {
    const r = this.parser, o = r.json.materials[i];
    if (!o.extensions || !o.extensions[this.name])
      return Promise.resolve();
    const c = [], p2 = o.extensions[this.name];
    s.thickness = p2.thicknessFactor !== void 0 ? p2.thicknessFactor : 0, p2.thicknessTexture !== void 0 && c.push(r.assignTexture(s, "thicknessMap", p2.thicknessTexture)), s.attenuationDistance = p2.attenuationDistance || 1 / 0;
    const h2 = p2.attenuationColor || [1, 1, 1];
    return s.attenuationColor = new Color(h2[0], h2[1], h2[2]), Promise.all(c);
  }
};
var Rp = class {
  constructor(i) {
    this.parser = i, this.name = le2.KHR_MATERIALS_IOR;
  }
  getMaterialType(i) {
    const r = this.parser.json.materials[i];
    return !r.extensions || !r.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(i, s) {
    const o = this.parser.json.materials[i];
    if (!o.extensions || !o.extensions[this.name])
      return Promise.resolve();
    const c = o.extensions[this.name];
    return s.ior = c.ior !== void 0 ? c.ior : 1.5, Promise.resolve();
  }
};
var Vp = class {
  constructor(i) {
    this.parser = i, this.name = le2.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(i) {
    const r = this.parser.json.materials[i];
    return !r.extensions || !r.extensions[this.name] ? null : MeshPhysicalMaterial;
  }
  extendMaterialParams(i, s) {
    const r = this.parser, o = r.json.materials[i];
    if (!o.extensions || !o.extensions[this.name])
      return Promise.resolve();
    const c = [], p2 = o.extensions[this.name];
    s.specularIntensity = p2.specularFactor !== void 0 ? p2.specularFactor : 1, p2.specularTexture !== void 0 && c.push(r.assignTexture(s, "specularIntensityMap", p2.specularTexture));
    const h2 = p2.specularColorFactor || [1, 1, 1];
    return s.specularColor = new Color(h2[0], h2[1], h2[2]), p2.specularColorTexture !== void 0 && c.push(r.assignTexture(s, "specularColorMap", p2.specularColorTexture, sRGBEncoding)), Promise.all(c);
  }
};
var Ip = class {
  constructor(i) {
    this.parser = i, this.name = le2.KHR_TEXTURE_BASISU;
  }
  loadTexture(i) {
    const s = this.parser, r = s.json, o = r.textures[i];
    if (!o.extensions || !o.extensions[this.name])
      return null;
    const c = o.extensions[this.name], p2 = s.options.ktx2Loader;
    if (!p2) {
      if (r.extensionsRequired && r.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return s.loadTextureImage(i, c.source, p2);
  }
};
var Dp = class {
  constructor(i) {
    this.parser = i, this.name = le2.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(i) {
    const s = this.name, r = this.parser, o = r.json, c = o.textures[i];
    if (!c.extensions || !c.extensions[s])
      return null;
    const p2 = c.extensions[s], h2 = o.images[p2.source];
    let m = r.textureLoader;
    if (h2.uri) {
      const g = r.options.manager.getHandler(h2.uri);
      g !== null && (m = g);
    }
    return this.detectSupport().then(function(g) {
      if (g)
        return r.loadTextureImage(i, p2.source, m);
      if (o.extensionsRequired && o.extensionsRequired.indexOf(s) >= 0)
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return r.loadTexture(i);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(i) {
      const s = new Image();
      s.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", s.onload = s.onerror = function() {
        i(s.height === 1);
      };
    })), this.isSupported;
  }
};
var Op = class {
  constructor(i) {
    this.parser = i, this.name = le2.EXT_TEXTURE_AVIF, this.isSupported = null;
  }
  loadTexture(i) {
    const s = this.name, r = this.parser, o = r.json, c = o.textures[i];
    if (!c.extensions || !c.extensions[s])
      return null;
    const p2 = c.extensions[s], h2 = o.images[p2.source];
    let m = r.textureLoader;
    if (h2.uri) {
      const g = r.options.manager.getHandler(h2.uri);
      g !== null && (m = g);
    }
    return this.detectSupport().then(function(g) {
      if (g)
        return r.loadTextureImage(i, p2.source, m);
      if (o.extensionsRequired && o.extensionsRequired.indexOf(s) >= 0)
        throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
      return r.loadTexture(i);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(i) {
      const s = new Image();
      s.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=", s.onload = s.onerror = function() {
        i(s.height === 1);
      };
    })), this.isSupported;
  }
};
var Np = class {
  constructor(i) {
    this.name = le2.EXT_MESHOPT_COMPRESSION, this.parser = i;
  }
  loadBufferView(i) {
    const s = this.parser.json, r = s.bufferViews[i];
    if (r.extensions && r.extensions[this.name]) {
      const o = r.extensions[this.name], c = this.parser.getDependency("buffer", o.buffer), p2 = this.parser.options.meshoptDecoder;
      if (!p2 || !p2.supported) {
        if (s.extensionsRequired && s.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return c.then(function(h2) {
        const m = o.byteOffset || 0, g = o.byteLength || 0, w = o.count, _2 = o.byteStride, y = new Uint8Array(h2, m, g);
        return p2.decodeGltfBufferAsync ? p2.decodeGltfBufferAsync(w, _2, y, o.mode, o.filter).then(function(C) {
          return C.buffer;
        }) : p2.ready.then(function() {
          const C = new ArrayBuffer(w * _2);
          return p2.decodeGltfBuffer(new Uint8Array(C), w, _2, y, o.mode, o.filter), C;
        });
      });
    } else
      return null;
  }
};
var Bp = class {
  constructor(i) {
    this.name = le2.EXT_MESH_GPU_INSTANCING, this.parser = i;
  }
  createNodeMesh(i) {
    const s = this.parser.json, r = s.nodes[i];
    if (!r.extensions || !r.extensions[this.name] || r.mesh === void 0)
      return null;
    const o = s.meshes[r.mesh];
    for (const g of o.primitives)
      if (g.mode !== dt2.TRIANGLES && g.mode !== dt2.TRIANGLE_STRIP && g.mode !== dt2.TRIANGLE_FAN && g.mode !== void 0)
        return null;
    const p2 = r.extensions[this.name].attributes, h2 = [], m = {};
    for (const g in p2)
      h2.push(this.parser.getDependency("accessor", p2[g]).then((w) => (m[g] = w, m[g])));
    return h2.length < 1 ? null : (h2.push(this.parser.createNodeMesh(i)), Promise.all(h2).then((g) => {
      const w = g.pop(), _2 = w.isGroup ? w.children : [w], y = g[0].count, C = [];
      for (const L of _2) {
        const S = new Matrix4(), R = new Vector3(), O = new Quaternion(), N = new Vector3(1, 1, 1), I2 = new InstancedMesh(L.geometry, L.material, y);
        for (let D2 = 0; D2 < y; D2++)
          m.TRANSLATION && R.fromBufferAttribute(m.TRANSLATION, D2), m.ROTATION && O.fromBufferAttribute(m.ROTATION, D2), m.SCALE && N.fromBufferAttribute(m.SCALE, D2), I2.setMatrixAt(D2, S.compose(R, O, N));
        for (const D2 in m)
          D2 !== "TRANSLATION" && D2 !== "ROTATION" && D2 !== "SCALE" && L.geometry.setAttribute(D2, m[D2]);
        Object3D.prototype.copy.call(I2, L), this.parser.assignFinalMaterial(I2), C.push(I2);
      }
      return w.isGroup ? (w.clear(), w.add(...C), w) : C[0];
    }));
  }
};
var Qa = "glTF";
var Yi = 12;
var va = {
  JSON: 1313821514,
  BIN: 5130562
};
var Fp = class {
  constructor(i) {
    this.name = le2.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const s = new DataView(i, 0, Yi), r = new TextDecoder();
    if (this.header = {
      magic: r.decode(new Uint8Array(i.slice(0, 4))),
      version: s.getUint32(4, true),
      length: s.getUint32(8, true)
    }, this.header.magic !== Qa)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const o = this.header.length - Yi, c = new DataView(i, Yi);
    let p2 = 0;
    for (; p2 < o; ) {
      const h2 = c.getUint32(p2, true);
      p2 += 4;
      const m = c.getUint32(p2, true);
      if (p2 += 4, m === va.JSON) {
        const g = new Uint8Array(i, Yi + p2, h2);
        this.content = r.decode(g);
      } else if (m === va.BIN) {
        const g = Yi + p2;
        this.body = i.slice(g, g + h2);
      }
      p2 += h2;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
};
var jp = class {
  constructor(i, s) {
    if (!s)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = le2.KHR_DRACO_MESH_COMPRESSION, this.json = i, this.dracoLoader = s, this.dracoLoader.preload();
  }
  decodePrimitive(i, s) {
    const r = this.json, o = this.dracoLoader, c = i.extensions[this.name].bufferView, p2 = i.extensions[this.name].attributes, h2 = {}, m = {}, g = {};
    for (const w in p2) {
      const _2 = go[w] || w.toLowerCase();
      h2[_2] = p2[w];
    }
    for (const w in i.attributes) {
      const _2 = go[w] || w.toLowerCase();
      if (p2[w] !== void 0) {
        const y = r.accessors[i.attributes[w]], C = di[y.componentType];
        g[_2] = C.name, m[_2] = y.normalized === true;
      }
    }
    return s.getDependency("bufferView", c).then(function(w) {
      return new Promise(function(_2) {
        o.decodeDracoFile(w, function(y) {
          for (const C in y.attributes) {
            const L = y.attributes[C], S = m[C];
            S !== void 0 && (L.normalized = S);
          }
          _2(y);
        }, h2, g);
      });
    });
  }
};
var zp = class {
  constructor() {
    this.name = le2.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(i, s) {
    return (s.texCoord === void 0 || s.texCoord === i.channel) && s.offset === void 0 && s.rotation === void 0 && s.scale === void 0 || (i = i.clone(), s.texCoord !== void 0 && (i.channel = s.texCoord), s.offset !== void 0 && i.offset.fromArray(s.offset), s.rotation !== void 0 && (i.rotation = s.rotation), s.scale !== void 0 && i.repeat.fromArray(s.scale), i.needsUpdate = true), i;
  }
};
var Up = class {
  constructor() {
    this.name = le2.KHR_MESH_QUANTIZATION;
  }
};
var Za = class extends Interpolant {
  constructor(i, s, r, o) {
    super(i, s, r, o);
  }
  copySampleValue_(i) {
    const s = this.resultBuffer, r = this.sampleValues, o = this.valueSize, c = i * o * 3 + o;
    for (let p2 = 0; p2 !== o; p2++)
      s[p2] = r[c + p2];
    return s;
  }
  interpolate_(i, s, r, o) {
    const c = this.resultBuffer, p2 = this.sampleValues, h2 = this.valueSize, m = h2 * 2, g = h2 * 3, w = o - s, _2 = (r - s) / w, y = _2 * _2, C = y * _2, L = i * g, S = L - g, R = -2 * C + 3 * y, O = C - y, N = 1 - R, I2 = O - y + _2;
    for (let D2 = 0; D2 !== h2; D2++) {
      const Y = p2[S + D2 + h2], G = p2[S + D2 + m] * w, F = p2[L + D2 + h2], B = p2[L + D2] * w;
      c[D2] = N * Y + I2 * G + R * F + O * B;
    }
    return c;
  }
};
var Gp = new Quaternion();
var Hp = class extends Za {
  interpolate_(i, s, r, o) {
    const c = super.interpolate_(i, s, r, o);
    return Gp.fromArray(c).normalize().toArray(c), c;
  }
};
var dt2 = {
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
var di = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
var ba = {
  9728: NearestFilter,
  9729: LinearFilter,
  9984: NearestMipmapNearestFilter,
  9985: LinearMipmapNearestFilter,
  9986: NearestMipmapLinearFilter,
  9987: LinearMipmapLinearFilter
};
var ga = {
  33071: ClampToEdgeWrapping,
  33648: MirroredRepeatWrapping,
  10497: RepeatWrapping
};
var io = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
var go = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv2",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
};
var sn = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
};
var Kp = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: InterpolateLinear,
  STEP: InterpolateDiscrete
};
var so = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function $p(f) {
  return f.DefaultMaterial === void 0 && (f.DefaultMaterial = new MeshStandardMaterial({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: false,
    depthTest: true,
    side: FrontSide
  })), f.DefaultMaterial;
}
function qi(f, i, s) {
  for (const r in s.extensions)
    f[r] === void 0 && (i.userData.gltfExtensions = i.userData.gltfExtensions || {}, i.userData.gltfExtensions[r] = s.extensions[r]);
}
function ln(f, i) {
  i.extras !== void 0 && (typeof i.extras == "object" ? Object.assign(f.userData, i.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + i.extras));
}
function Xp(f, i, s) {
  let r = false, o = false, c = false;
  for (let g = 0, w = i.length; g < w; g++) {
    const _2 = i[g];
    if (_2.POSITION !== void 0 && (r = true), _2.NORMAL !== void 0 && (o = true), _2.COLOR_0 !== void 0 && (c = true), r && o && c)
      break;
  }
  if (!r && !o && !c)
    return Promise.resolve(f);
  const p2 = [], h2 = [], m = [];
  for (let g = 0, w = i.length; g < w; g++) {
    const _2 = i[g];
    if (r) {
      const y = _2.POSITION !== void 0 ? s.getDependency("accessor", _2.POSITION) : f.attributes.position;
      p2.push(y);
    }
    if (o) {
      const y = _2.NORMAL !== void 0 ? s.getDependency("accessor", _2.NORMAL) : f.attributes.normal;
      h2.push(y);
    }
    if (c) {
      const y = _2.COLOR_0 !== void 0 ? s.getDependency("accessor", _2.COLOR_0) : f.attributes.color;
      m.push(y);
    }
  }
  return Promise.all([Promise.all(p2), Promise.all(h2), Promise.all(m)]).then(function(g) {
    const w = g[0], _2 = g[1], y = g[2];
    return r && (f.morphAttributes.position = w), o && (f.morphAttributes.normal = _2), c && (f.morphAttributes.color = y), f.morphTargetsRelative = true, f;
  });
}
function Yp(f, i) {
  if (f.updateMorphTargets(), i.weights !== void 0)
    for (let s = 0, r = i.weights.length; s < r; s++)
      f.morphTargetInfluences[s] = i.weights[s];
  if (i.extras && Array.isArray(i.extras.targetNames)) {
    const s = i.extras.targetNames;
    if (f.morphTargetInfluences.length === s.length) {
      f.morphTargetDictionary = {};
      for (let r = 0, o = s.length; r < o; r++)
        f.morphTargetDictionary[s[r]] = r;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function qp(f) {
  const i = f.extensions && f.extensions[le2.KHR_DRACO_MESH_COMPRESSION];
  let s;
  return i ? s = "draco:" + i.bufferView + ":" + i.indices + ":" + _a(i.attributes) : s = f.indices + ":" + _a(f.attributes) + ":" + f.mode, s;
}
function _a(f) {
  let i = "";
  const s = Object.keys(f).sort();
  for (let r = 0, o = s.length; r < o; r++)
    i += s[r] + ":" + f[s[r]] + ";";
  return i;
}
function _o(f) {
  switch (f) {
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
function Qp(f) {
  return f.search(/\.jpe?g($|\?)/i) > 0 || f.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : f.search(/\.webp($|\?)/i) > 0 || f.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
var Zp = new Matrix4();
var Wp = class {
  constructor(i = {}, s = {}) {
    this.json = i, this.extensions = {}, this.plugins = {}, this.options = s, this.cache = new Ep(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = {
      refs: {},
      uses: {}
    }, this.cameraCache = {
      refs: {},
      uses: {}
    }, this.lightCache = {
      refs: {},
      uses: {}
    }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let r = false, o = false, c = -1;
    typeof navigator < "u" && (r = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === true, o = navigator.userAgent.indexOf("Firefox") > -1, c = o ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1), typeof createImageBitmap > "u" || r || o && c < 98 ? this.textureLoader = new TextureLoader(this.options.manager) : this.textureLoader = new ImageBitmapLoader(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new FileLoader(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(true);
  }
  setExtensions(i) {
    this.extensions = i;
  }
  setPlugins(i) {
    this.plugins = i;
  }
  parse(i, s) {
    const r = this, o = this.json, c = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(p2) {
      return p2._markDefs && p2._markDefs();
    }), Promise.all(this._invokeAll(function(p2) {
      return p2.beforeRoot && p2.beforeRoot();
    })).then(function() {
      return Promise.all([r.getDependencies("scene"), r.getDependencies("animation"), r.getDependencies("camera")]);
    }).then(function(p2) {
      const h2 = {
        scene: p2[0][o.scene || 0],
        scenes: p2[0],
        animations: p2[1],
        cameras: p2[2],
        asset: o.asset,
        parser: r,
        userData: {}
      };
      qi(c, h2, o), ln(h2, o), Promise.all(r._invokeAll(function(m) {
        return m.afterRoot && m.afterRoot(h2);
      })).then(function() {
        i(h2);
      });
    }).catch(s);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   */
  _markDefs() {
    const i = this.json.nodes || [], s = this.json.skins || [], r = this.json.meshes || [];
    for (let o = 0, c = s.length; o < c; o++) {
      const p2 = s[o].joints;
      for (let h2 = 0, m = p2.length; h2 < m; h2++)
        i[p2[h2]].isBone = true;
    }
    for (let o = 0, c = i.length; o < c; o++) {
      const p2 = i[o];
      p2.mesh !== void 0 && (this._addNodeRef(this.meshCache, p2.mesh), p2.skin !== void 0 && (r[p2.mesh].isSkinnedMesh = true)), p2.camera !== void 0 && this._addNodeRef(this.cameraCache, p2.camera);
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
  _addNodeRef(i, s) {
    s !== void 0 && (i.refs[s] === void 0 && (i.refs[s] = i.uses[s] = 0), i.refs[s]++);
  }
  /** Returns a reference to a shared resource, cloning it if necessary. */
  _getNodeRef(i, s, r) {
    if (i.refs[s] <= 1)
      return r;
    const o = r.clone(), c = (p2, h2) => {
      const m = this.associations.get(p2);
      m != null && this.associations.set(h2, m);
      for (const [g, w] of p2.children.entries())
        c(w, h2.children[g]);
    };
    return c(r, o), o.name += "_instance_" + i.uses[s]++, o;
  }
  _invokeOne(i) {
    const s = Object.values(this.plugins);
    s.push(this);
    for (let r = 0; r < s.length; r++) {
      const o = i(s[r]);
      if (o)
        return o;
    }
    return null;
  }
  _invokeAll(i) {
    const s = Object.values(this.plugins);
    s.unshift(this);
    const r = [];
    for (let o = 0; o < s.length; o++) {
      const c = i(s[o]);
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
  getDependency(i, s) {
    const r = i + ":" + s;
    let o = this.cache.get(r);
    if (!o) {
      switch (i) {
        case "scene":
          o = this.loadScene(s);
          break;
        case "node":
          o = this._invokeOne(function(c) {
            return c.loadNode && c.loadNode(s);
          });
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
          if (o = this._invokeOne(function(c) {
            return c != this && c.getDependency && c.getDependency(i, s);
          }), !o)
            throw new Error("Unknown type: " + i);
          break;
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
  getDependencies(i) {
    let s = this.cache.get(i);
    if (!s) {
      const r = this, o = this.json[i + (i === "mesh" ? "es" : "s")] || [];
      s = Promise.all(o.map(function(c, p2) {
        return r.getDependency(i, p2);
      })), this.cache.add(i, s);
    }
    return s;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(i) {
    const s = this.json.buffers[i], r = this.fileLoader;
    if (s.type && s.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + s.type + " buffer type is not supported.");
    if (s.uri === void 0 && i === 0)
      return Promise.resolve(this.extensions[le2.KHR_BINARY_GLTF].body);
    const o = this.options;
    return new Promise(function(c, p2) {
      r.load(LoaderUtils.resolveURL(s.uri, o.path), c, void 0, function() {
        p2(new Error('THREE.GLTFLoader: Failed to load buffer "' + s.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(i) {
    const s = this.json.bufferViews[i];
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
  loadAccessor(i) {
    const s = this, r = this.json, o = this.json.accessors[i];
    if (o.bufferView === void 0 && o.sparse === void 0) {
      const p2 = io[o.type], h2 = di[o.componentType], m = o.normalized === true, g = new h2(o.count * p2);
      return Promise.resolve(new BufferAttribute(g, p2, m));
    }
    const c = [];
    return o.bufferView !== void 0 ? c.push(this.getDependency("bufferView", o.bufferView)) : c.push(null), o.sparse !== void 0 && (c.push(this.getDependency("bufferView", o.sparse.indices.bufferView)), c.push(this.getDependency("bufferView", o.sparse.values.bufferView))), Promise.all(c).then(function(p2) {
      const h2 = p2[0], m = io[o.type], g = di[o.componentType], w = g.BYTES_PER_ELEMENT, _2 = w * m, y = o.byteOffset || 0, C = o.bufferView !== void 0 ? r.bufferViews[o.bufferView].byteStride : void 0, L = o.normalized === true;
      let S, R;
      if (C && C !== _2) {
        const O = Math.floor(y / C), N = "InterleavedBuffer:" + o.bufferView + ":" + o.componentType + ":" + O + ":" + o.count;
        let I2 = s.cache.get(N);
        I2 || (S = new g(h2, O * C, o.count * C / w), I2 = new InterleavedBuffer(S, C / w), s.cache.add(N, I2)), R = new InterleavedBufferAttribute(I2, m, y % C / w, L);
      } else
        h2 === null ? S = new g(o.count * m) : S = new g(h2, y, o.count * m), R = new BufferAttribute(S, m, L);
      if (o.sparse !== void 0) {
        const O = io.SCALAR, N = di[o.sparse.indices.componentType], I2 = o.sparse.indices.byteOffset || 0, D2 = o.sparse.values.byteOffset || 0, Y = new N(p2[1], I2, o.sparse.count * O), G = new g(p2[2], D2, o.sparse.count * m);
        h2 !== null && (R = new BufferAttribute(R.array.slice(), R.itemSize, R.normalized));
        for (let F = 0, B = Y.length; F < B; F++) {
          const H2 = Y[F];
          if (R.setX(H2, G[F * m]), m >= 2 && R.setY(H2, G[F * m + 1]), m >= 3 && R.setZ(H2, G[F * m + 2]), m >= 4 && R.setW(H2, G[F * m + 3]), m >= 5)
            throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
      }
      return R;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture|null>}
   */
  loadTexture(i) {
    const s = this.json, r = this.options, c = s.textures[i].source, p2 = s.images[c];
    let h2 = this.textureLoader;
    if (p2.uri) {
      const m = r.manager.getHandler(p2.uri);
      m !== null && (h2 = m);
    }
    return this.loadTextureImage(i, c, h2);
  }
  loadTextureImage(i, s, r) {
    const o = this, c = this.json, p2 = c.textures[i], h2 = c.images[s], m = (h2.uri || h2.bufferView) + ":" + p2.sampler;
    if (this.textureCache[m])
      return this.textureCache[m];
    const g = this.loadImageSource(s, r).then(function(w) {
      w.flipY = false, w.name = p2.name || h2.name || "", w.name === "" && typeof h2.uri == "string" && h2.uri.startsWith("data:image/") === false && (w.name = h2.uri);
      const y = (c.samplers || {})[p2.sampler] || {};
      return w.magFilter = ba[y.magFilter] || LinearFilter, w.minFilter = ba[y.minFilter] || LinearMipmapLinearFilter, w.wrapS = ga[y.wrapS] || RepeatWrapping, w.wrapT = ga[y.wrapT] || RepeatWrapping, o.associations.set(w, {
        textures: i
      }), w;
    }).catch(function() {
      return null;
    });
    return this.textureCache[m] = g, g;
  }
  loadImageSource(i, s) {
    const r = this, o = this.json, c = this.options;
    if (this.sourceCache[i] !== void 0)
      return this.sourceCache[i].then((_2) => _2.clone());
    const p2 = o.images[i], h2 = self.URL || self.webkitURL;
    let m = p2.uri || "", g = false;
    if (p2.bufferView !== void 0)
      m = r.getDependency("bufferView", p2.bufferView).then(function(_2) {
        g = true;
        const y = new Blob([_2], {
          type: p2.mimeType
        });
        return m = h2.createObjectURL(y), m;
      });
    else if (p2.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + i + " is missing URI and bufferView");
    const w = Promise.resolve(m).then(function(_2) {
      return new Promise(function(y, C) {
        let L = y;
        s.isImageBitmapLoader === true && (L = function(S) {
          const R = new Texture(S);
          R.needsUpdate = true, y(R);
        }), s.load(LoaderUtils.resolveURL(_2, c.path), L, void 0, C);
      });
    }).then(function(_2) {
      return g === true && h2.revokeObjectURL(m), _2.userData.mimeType = p2.mimeType || Qp(p2.uri), _2;
    }).catch(function(_2) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", m), _2;
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
  assignTexture(i, s, r, o) {
    const c = this;
    return this.getDependency("texture", r.index).then(function(p2) {
      if (!p2)
        return null;
      if (r.texCoord !== void 0 && r.texCoord > 0 && (p2 = p2.clone(), p2.channel = r.texCoord), c.extensions[le2.KHR_TEXTURE_TRANSFORM]) {
        const h2 = r.extensions !== void 0 ? r.extensions[le2.KHR_TEXTURE_TRANSFORM] : void 0;
        if (h2) {
          const m = c.associations.get(p2);
          p2 = c.extensions[le2.KHR_TEXTURE_TRANSFORM].extendTexture(p2, h2), c.associations.set(p2, m);
        }
      }
      return o !== void 0 && (p2.encoding = o), i[s] = p2, p2;
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
    const s = i.geometry;
    let r = i.material;
    const o = s.attributes.tangent === void 0, c = s.attributes.color !== void 0, p2 = s.attributes.normal === void 0;
    if (i.isPoints) {
      const h2 = "PointsMaterial:" + r.uuid;
      let m = this.cache.get(h2);
      m || (m = new PointsMaterial(), Material.prototype.copy.call(m, r), m.color.copy(r.color), m.map = r.map, m.sizeAttenuation = false, this.cache.add(h2, m)), r = m;
    } else if (i.isLine) {
      const h2 = "LineBasicMaterial:" + r.uuid;
      let m = this.cache.get(h2);
      m || (m = new LineBasicMaterial(), Material.prototype.copy.call(m, r), m.color.copy(r.color), m.map = r.map, this.cache.add(h2, m)), r = m;
    }
    if (o || c || p2) {
      let h2 = "ClonedMaterial:" + r.uuid + ":";
      o && (h2 += "derivative-tangents:"), c && (h2 += "vertex-colors:"), p2 && (h2 += "flat-shading:");
      let m = this.cache.get(h2);
      m || (m = r.clone(), c && (m.vertexColors = true), p2 && (m.flatShading = true), o && (m.normalScale && (m.normalScale.y *= -1), m.clearcoatNormalScale && (m.clearcoatNormalScale.y *= -1)), this.cache.add(h2, m), this.associations.set(m, this.associations.get(r))), r = m;
    }
    i.material = r;
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
    const s = this, r = this.json, o = this.extensions, c = r.materials[i];
    let p2;
    const h2 = {}, m = c.extensions || {}, g = [];
    if (m[le2.KHR_MATERIALS_UNLIT]) {
      const _2 = o[le2.KHR_MATERIALS_UNLIT];
      p2 = _2.getMaterialType(), g.push(_2.extendParams(h2, c, s));
    } else {
      const _2 = c.pbrMetallicRoughness || {};
      if (h2.color = new Color(1, 1, 1), h2.opacity = 1, Array.isArray(_2.baseColorFactor)) {
        const y = _2.baseColorFactor;
        h2.color.fromArray(y), h2.opacity = y[3];
      }
      _2.baseColorTexture !== void 0 && g.push(s.assignTexture(h2, "map", _2.baseColorTexture, sRGBEncoding)), h2.metalness = _2.metallicFactor !== void 0 ? _2.metallicFactor : 1, h2.roughness = _2.roughnessFactor !== void 0 ? _2.roughnessFactor : 1, _2.metallicRoughnessTexture !== void 0 && (g.push(s.assignTexture(h2, "metalnessMap", _2.metallicRoughnessTexture)), g.push(s.assignTexture(h2, "roughnessMap", _2.metallicRoughnessTexture))), p2 = this._invokeOne(function(y) {
        return y.getMaterialType && y.getMaterialType(i);
      }), g.push(Promise.all(this._invokeAll(function(y) {
        return y.extendMaterialParams && y.extendMaterialParams(i, h2);
      })));
    }
    c.doubleSided === true && (h2.side = DoubleSide);
    const w = c.alphaMode || so.OPAQUE;
    if (w === so.BLEND ? (h2.transparent = true, h2.depthWrite = false) : (h2.transparent = false, w === so.MASK && (h2.alphaTest = c.alphaCutoff !== void 0 ? c.alphaCutoff : 0.5)), c.normalTexture !== void 0 && p2 !== MeshBasicMaterial && (g.push(s.assignTexture(h2, "normalMap", c.normalTexture)), h2.normalScale = new Vector2(1, 1), c.normalTexture.scale !== void 0)) {
      const _2 = c.normalTexture.scale;
      h2.normalScale.set(_2, _2);
    }
    return c.occlusionTexture !== void 0 && p2 !== MeshBasicMaterial && (g.push(s.assignTexture(h2, "aoMap", c.occlusionTexture)), c.occlusionTexture.strength !== void 0 && (h2.aoMapIntensity = c.occlusionTexture.strength)), c.emissiveFactor !== void 0 && p2 !== MeshBasicMaterial && (h2.emissive = new Color().fromArray(c.emissiveFactor)), c.emissiveTexture !== void 0 && p2 !== MeshBasicMaterial && g.push(s.assignTexture(h2, "emissiveMap", c.emissiveTexture, sRGBEncoding)), Promise.all(g).then(function() {
      const _2 = new p2(h2);
      return c.name && (_2.name = c.name), ln(_2, c), s.associations.set(_2, {
        materials: i
      }), c.extensions && qi(o, _2, c), _2;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(i) {
    const s = PropertyBinding.sanitizeNodeName(i || "");
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
  loadGeometries(i) {
    const s = this, r = this.extensions, o = this.primitiveCache;
    function c(h2) {
      return r[le2.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(h2, s).then(function(m) {
        return wa(m, h2, s);
      });
    }
    const p2 = [];
    for (let h2 = 0, m = i.length; h2 < m; h2++) {
      const g = i[h2], w = qp(g), _2 = o[w];
      if (_2)
        p2.push(_2.promise);
      else {
        let y;
        g.extensions && g.extensions[le2.KHR_DRACO_MESH_COMPRESSION] ? y = c(g) : y = wa(new BufferGeometry(), g, s), o[w] = {
          primitive: g,
          promise: y
        }, p2.push(y);
      }
    }
    return Promise.all(p2);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */
  loadMesh(i) {
    const s = this, r = this.json, o = this.extensions, c = r.meshes[i], p2 = c.primitives, h2 = [];
    for (let m = 0, g = p2.length; m < g; m++) {
      const w = p2[m].material === void 0 ? $p(this.cache) : this.getDependency("material", p2[m].material);
      h2.push(w);
    }
    return h2.push(s.loadGeometries(p2)), Promise.all(h2).then(function(m) {
      const g = m.slice(0, m.length - 1), w = m[m.length - 1], _2 = [];
      for (let C = 0, L = w.length; C < L; C++) {
        const S = w[C], R = p2[C];
        let O;
        const N = g[C];
        if (R.mode === dt2.TRIANGLES || R.mode === dt2.TRIANGLE_STRIP || R.mode === dt2.TRIANGLE_FAN || R.mode === void 0)
          O = c.isSkinnedMesh === true ? new SkinnedMesh(S, N) : new Mesh(S, N), O.isSkinnedMesh === true && O.normalizeSkinWeights(), R.mode === dt2.TRIANGLE_STRIP ? O.geometry = da(O.geometry, TriangleStripDrawMode) : R.mode === dt2.TRIANGLE_FAN && (O.geometry = da(O.geometry, TriangleFanDrawMode));
        else if (R.mode === dt2.LINES)
          O = new LineSegments(S, N);
        else if (R.mode === dt2.LINE_STRIP)
          O = new Line(S, N);
        else if (R.mode === dt2.LINE_LOOP)
          O = new LineLoop(S, N);
        else if (R.mode === dt2.POINTS)
          O = new Points(S, N);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + R.mode);
        Object.keys(O.geometry.morphAttributes).length > 0 && Yp(O, c), O.name = s.createUniqueName(c.name || "mesh_" + i), ln(O, c), R.extensions && qi(o, O, R), s.assignFinalMaterial(O), _2.push(O);
      }
      for (let C = 0, L = _2.length; C < L; C++)
        s.associations.set(_2[C], {
          meshes: i,
          primitives: C
        });
      if (_2.length === 1)
        return _2[0];
      const y = new Group();
      s.associations.set(y, {
        meshes: i
      });
      for (let C = 0, L = _2.length; C < L; C++)
        y.add(_2[C]);
      return y;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */
  loadCamera(i) {
    let s;
    const r = this.json.cameras[i], o = r[r.type];
    if (!o) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return r.type === "perspective" ? s = new PerspectiveCamera(MathUtils.radToDeg(o.yfov), o.aspectRatio || 1, o.znear || 1, o.zfar || 2e6) : r.type === "orthographic" && (s = new OrthographicCamera(-o.xmag, o.xmag, o.ymag, -o.ymag, o.znear, o.zfar)), r.name && (s.name = this.createUniqueName(r.name)), ln(s, r), Promise.resolve(s);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(i) {
    const s = this.json.skins[i], r = [];
    for (let o = 0, c = s.joints.length; o < c; o++)
      r.push(this._loadNodeShallow(s.joints[o]));
    return s.inverseBindMatrices !== void 0 ? r.push(this.getDependency("accessor", s.inverseBindMatrices)) : r.push(null), Promise.all(r).then(function(o) {
      const c = o.pop(), p2 = o, h2 = [], m = [];
      for (let g = 0, w = p2.length; g < w; g++) {
        const _2 = p2[g];
        if (_2) {
          h2.push(_2);
          const y = new Matrix4();
          c !== null && y.fromArray(c.array, g * 16), m.push(y);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', s.joints[g]);
      }
      return new Skeleton(h2, m);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(i) {
    const r = this.json.animations[i], o = r.name ? r.name : "animation_" + i, c = [], p2 = [], h2 = [], m = [], g = [];
    for (let w = 0, _2 = r.channels.length; w < _2; w++) {
      const y = r.channels[w], C = r.samplers[y.sampler], L = y.target, S = L.node, R = r.parameters !== void 0 ? r.parameters[C.input] : C.input, O = r.parameters !== void 0 ? r.parameters[C.output] : C.output;
      L.node !== void 0 && (c.push(this.getDependency("node", S)), p2.push(this.getDependency("accessor", R)), h2.push(this.getDependency("accessor", O)), m.push(C), g.push(L));
    }
    return Promise.all([Promise.all(c), Promise.all(p2), Promise.all(h2), Promise.all(m), Promise.all(g)]).then(function(w) {
      const _2 = w[0], y = w[1], C = w[2], L = w[3], S = w[4], R = [];
      for (let O = 0, N = _2.length; O < N; O++) {
        const I2 = _2[O], D2 = y[O], Y = C[O], G = L[O], F = S[O];
        if (I2 === void 0)
          continue;
        I2.updateMatrix();
        let B;
        switch (sn[F.path]) {
          case sn.weights:
            B = NumberKeyframeTrack;
            break;
          case sn.rotation:
            B = QuaternionKeyframeTrack;
            break;
          case sn.position:
          case sn.scale:
          default:
            B = VectorKeyframeTrack;
            break;
        }
        const H2 = I2.name ? I2.name : I2.uuid, K2 = G.interpolation !== void 0 ? Kp[G.interpolation] : InterpolateLinear, q = [];
        sn[F.path] === sn.weights ? I2.traverse(function(_e) {
          _e.morphTargetInfluences && q.push(_e.name ? _e.name : _e.uuid);
        }) : q.push(H2);
        let pe = Y.array;
        if (Y.normalized) {
          const _e = _o(pe.constructor), ce2 = new Float32Array(pe.length);
          for (let me = 0, he = pe.length; me < he; me++)
            ce2[me] = pe[me] * _e;
          pe = ce2;
        }
        for (let _e = 0, ce2 = q.length; _e < ce2; _e++) {
          const me = new B(q[_e] + "." + sn[F.path], D2.array, pe, K2);
          G.interpolation === "CUBICSPLINE" && (me.createInterpolant = function(ee) {
            const X2 = this instanceof QuaternionKeyframeTrack ? Hp : Za;
            return new X2(this.times, this.values, this.getValueSize() / 3, ee);
          }, me.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true), R.push(me);
        }
      }
      return new AnimationClip(o, void 0, R);
    });
  }
  createNodeMesh(i) {
    const s = this.json, r = this, o = s.nodes[i];
    return o.mesh === void 0 ? null : r.getDependency("mesh", o.mesh).then(function(c) {
      const p2 = r._getNodeRef(r.meshCache, o.mesh, c);
      return o.weights !== void 0 && p2.traverse(function(h2) {
        if (h2.isMesh)
          for (let m = 0, g = o.weights.length; m < g; m++)
            h2.morphTargetInfluences[m] = o.weights[m];
      }), p2;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(i) {
    const s = this.json, r = this, o = s.nodes[i], c = r._loadNodeShallow(i), p2 = [], h2 = o.children || [];
    for (let g = 0, w = h2.length; g < w; g++)
      p2.push(r.getDependency("node", h2[g]));
    const m = o.skin === void 0 ? Promise.resolve(null) : r.getDependency("skin", o.skin);
    return Promise.all([c, Promise.all(p2), m]).then(function(g) {
      const w = g[0], _2 = g[1], y = g[2];
      y !== null && w.traverse(function(C) {
        C.isSkinnedMesh && C.bind(y, Zp);
      });
      for (let C = 0, L = _2.length; C < L; C++)
        w.add(_2[C]);
      return w;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(i) {
    const s = this.json, r = this.extensions, o = this;
    if (this.nodeCache[i] !== void 0)
      return this.nodeCache[i];
    const c = s.nodes[i], p2 = c.name ? o.createUniqueName(c.name) : "", h2 = [], m = o._invokeOne(function(g) {
      return g.createNodeMesh && g.createNodeMesh(i);
    });
    return m && h2.push(m), c.camera !== void 0 && h2.push(o.getDependency("camera", c.camera).then(function(g) {
      return o._getNodeRef(o.cameraCache, c.camera, g);
    })), o._invokeAll(function(g) {
      return g.createNodeAttachment && g.createNodeAttachment(i);
    }).forEach(function(g) {
      h2.push(g);
    }), this.nodeCache[i] = Promise.all(h2).then(function(g) {
      let w;
      if (c.isBone === true ? w = new Bone() : g.length > 1 ? w = new Group() : g.length === 1 ? w = g[0] : w = new Object3D(), w !== g[0])
        for (let _2 = 0, y = g.length; _2 < y; _2++)
          w.add(g[_2]);
      if (c.name && (w.userData.name = c.name, w.name = p2), ln(w, c), c.extensions && qi(r, w, c), c.matrix !== void 0) {
        const _2 = new Matrix4();
        _2.fromArray(c.matrix), w.applyMatrix4(_2);
      } else
        c.translation !== void 0 && w.position.fromArray(c.translation), c.rotation !== void 0 && w.quaternion.fromArray(c.rotation), c.scale !== void 0 && w.scale.fromArray(c.scale);
      return o.associations.has(w) || o.associations.set(w, {}), o.associations.get(w).nodes = i, w;
    }), this.nodeCache[i];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(i) {
    const s = this.extensions, r = this.json.scenes[i], o = this, c = new Group();
    r.name && (c.name = o.createUniqueName(r.name)), ln(c, r), r.extensions && qi(s, c, r);
    const p2 = r.nodes || [], h2 = [];
    for (let m = 0, g = p2.length; m < g; m++)
      h2.push(o.getDependency("node", p2[m]));
    return Promise.all(h2).then(function(m) {
      for (let w = 0, _2 = m.length; w < _2; w++)
        c.add(m[w]);
      const g = (w) => {
        const _2 = /* @__PURE__ */ new Map();
        for (const [y, C] of o.associations)
          (y instanceof Material || y instanceof Texture) && _2.set(y, C);
        return w.traverse((y) => {
          const C = o.associations.get(y);
          C != null && _2.set(y, C);
        }), _2;
      };
      return o.associations = g(c), c;
    });
  }
};
function Jp(f, i, s) {
  const r = i.attributes, o = new Box3();
  if (r.POSITION !== void 0) {
    const h2 = s.json.accessors[r.POSITION], m = h2.min, g = h2.max;
    if (m !== void 0 && g !== void 0) {
      if (o.set(new Vector3(m[0], m[1], m[2]), new Vector3(g[0], g[1], g[2])), h2.normalized) {
        const w = _o(di[h2.componentType]);
        o.min.multiplyScalar(w), o.max.multiplyScalar(w);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const c = i.targets;
  if (c !== void 0) {
    const h2 = new Vector3(), m = new Vector3();
    for (let g = 0, w = c.length; g < w; g++) {
      const _2 = c[g];
      if (_2.POSITION !== void 0) {
        const y = s.json.accessors[_2.POSITION], C = y.min, L = y.max;
        if (C !== void 0 && L !== void 0) {
          if (m.setX(Math.max(Math.abs(C[0]), Math.abs(L[0]))), m.setY(Math.max(Math.abs(C[1]), Math.abs(L[1]))), m.setZ(Math.max(Math.abs(C[2]), Math.abs(L[2]))), y.normalized) {
            const S = _o(di[y.componentType]);
            m.multiplyScalar(S);
          }
          h2.max(m);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    o.expandByVector(h2);
  }
  f.boundingBox = o;
  const p2 = new Sphere();
  o.getCenter(p2.center), p2.radius = o.min.distanceTo(o.max) / 2, f.boundingSphere = p2;
}
function wa(f, i, s) {
  const r = i.attributes, o = [];
  function c(p2, h2) {
    return s.getDependency("accessor", p2).then(function(m) {
      f.setAttribute(h2, m);
    });
  }
  for (const p2 in r) {
    const h2 = go[p2] || p2.toLowerCase();
    h2 in f.attributes || o.push(c(r[p2], h2));
  }
  if (i.indices !== void 0 && !f.index) {
    const p2 = s.getDependency("accessor", i.indices).then(function(h2) {
      f.setIndex(h2);
    });
    o.push(p2);
  }
  return ln(f, i), Jp(f, i, s), Promise.all(o).then(function() {
    return i.targets !== void 0 ? Xp(f, i.targets, s) : f;
  });
}
var ya = class extends ExtrudeGeometry {
  constructor(i, s = {}) {
    const {
      bevelEnabled: r = false,
      bevelSize: o = 8,
      bevelThickness: c = 10,
      font: p2,
      height: h2 = 50,
      size: m = 100,
      lineHeight: g = 1,
      letterSpacing: w = 0,
      ..._2
    } = s;
    if (p2 === void 0)
      super();
    else {
      const y = p2.generateShapes(i, m, {
        lineHeight: g,
        letterSpacing: w
      });
      super(y, {
        ..._2,
        bevelEnabled: r,
        bevelSize: o,
        bevelThickness: c,
        depth: h2
      });
    }
    this.type = "TextGeometry";
  }
};
function Wa(f, i, s) {
  const r = s.length - f - 1;
  if (i >= s[r])
    return r - 1;
  if (i <= s[f])
    return f;
  let o = f, c = r, p2 = Math.floor((o + c) / 2);
  for (; i < s[p2] || i >= s[p2 + 1]; )
    i < s[p2] ? c = p2 : o = p2, p2 = Math.floor((o + c) / 2);
  return p2;
}
function eh(f, i, s, r) {
  const o = [], c = [], p2 = [];
  o[0] = 1;
  for (let h2 = 1; h2 <= s; ++h2) {
    c[h2] = i - r[f + 1 - h2], p2[h2] = r[f + h2] - i;
    let m = 0;
    for (let g = 0; g < h2; ++g) {
      const w = p2[g + 1], _2 = c[h2 - g], y = o[g] / (w + _2);
      o[g] = m + w * y, m = _2 * y;
    }
    o[h2] = m;
  }
  return o;
}
function th(f, i, s, r) {
  const o = Wa(f, r, i), c = eh(o, r, f, i), p2 = new Vector4(0, 0, 0, 0);
  for (let h2 = 0; h2 <= f; ++h2) {
    const m = s[o - f + h2], g = c[h2], w = m.w * g;
    p2.x += m.x * w, p2.y += m.y * w, p2.z += m.z * w, p2.w += m.w * g;
  }
  return p2;
}
function nh(f, i, s, r, o) {
  const c = [];
  for (let y = 0; y <= s; ++y)
    c[y] = 0;
  const p2 = [];
  for (let y = 0; y <= r; ++y)
    p2[y] = c.slice(0);
  const h2 = [];
  for (let y = 0; y <= s; ++y)
    h2[y] = c.slice(0);
  h2[0][0] = 1;
  const m = c.slice(0), g = c.slice(0);
  for (let y = 1; y <= s; ++y) {
    m[y] = i - o[f + 1 - y], g[y] = o[f + y] - i;
    let C = 0;
    for (let L = 0; L < y; ++L) {
      const S = g[L + 1], R = m[y - L];
      h2[y][L] = S + R;
      const O = h2[L][y - 1] / h2[y][L];
      h2[L][y] = C + S * O, C = R * O;
    }
    h2[y][y] = C;
  }
  for (let y = 0; y <= s; ++y)
    p2[0][y] = h2[y][s];
  for (let y = 0; y <= s; ++y) {
    let C = 0, L = 1;
    const S = [];
    for (let R = 0; R <= s; ++R)
      S[R] = c.slice(0);
    S[0][0] = 1;
    for (let R = 1; R <= r; ++R) {
      let O = 0;
      const N = y - R, I2 = s - R;
      y >= R && (S[L][0] = S[C][0] / h2[I2 + 1][N], O = S[L][0] * h2[N][I2]);
      const D2 = N >= -1 ? 1 : -N, Y = y - 1 <= I2 ? R - 1 : s - y;
      for (let G = D2; G <= Y; ++G)
        S[L][G] = (S[C][G] - S[C][G - 1]) / h2[I2 + 1][N + G], O += S[L][G] * h2[N + G][I2];
      y <= I2 && (S[L][R] = -S[C][R - 1] / h2[I2 + 1][y], O += S[L][R] * h2[y][I2]), p2[R][y] = O;
      var w = C;
      C = L, L = w;
    }
  }
  var _2 = s;
  for (let y = 1; y <= r; ++y) {
    for (let C = 0; C <= s; ++C)
      p2[y][C] *= _2;
    _2 *= s - y;
  }
  return p2;
}
function ih(f, i, s, r, o) {
  const c = o < f ? o : f, p2 = [], h2 = Wa(f, r, i), m = nh(h2, r, f, c, i), g = [];
  for (let _2 = 0; _2 < s.length; ++_2) {
    var w = s[_2].clone();
    const y = w.w;
    w.x *= y, w.y *= y, w.z *= y, g[_2] = w;
  }
  for (let _2 = 0; _2 <= c; ++_2) {
    var w = g[h2 - f].clone().multiplyScalar(m[_2][0]);
    for (let C = 1; C <= f; ++C)
      w.add(g[h2 - f + C].clone().multiplyScalar(m[_2][C]));
    p2[_2] = w;
  }
  for (let _2 = c + 1; _2 <= o + 1; ++_2)
    p2[_2] = new Vector4(0, 0, 0);
  return p2;
}
function sh(f, i) {
  let s = 1;
  for (let o = 2; o <= f; ++o)
    s *= o;
  let r = 1;
  for (let o = 2; o <= i; ++o)
    r *= o;
  for (let o = 2; o <= f - i; ++o)
    r *= o;
  return s / r;
}
function rh(f) {
  const i = f.length, s = [], r = [];
  for (let c = 0; c < i; ++c) {
    const p2 = f[c];
    s[c] = new Vector3(p2.x, p2.y, p2.z), r[c] = p2.w;
  }
  const o = [];
  for (let c = 0; c < i; ++c) {
    const p2 = s[c].clone();
    for (let h2 = 1; h2 <= c; ++h2)
      p2.sub(o[c - h2].clone().multiplyScalar(sh(c, h2) * r[h2]));
    o[c] = p2.divideScalar(r[0]);
  }
  return o;
}
function oh(f, i, s, r, o) {
  const c = ih(f, i, s, r, o);
  return rh(c);
}
var xa = class extends Curve {
  constructor(i, s, r, o, c) {
    super(), this.degree = i, this.knots = s, this.controlPoints = [], this.startKnot = o || 0, this.endKnot = c || this.knots.length - 1;
    for (let p2 = 0; p2 < r.length; ++p2) {
      const h2 = r[p2];
      this.controlPoints[p2] = new Vector4(h2.x, h2.y, h2.z, h2.w);
    }
  }
  getPoint(i, s) {
    const r = s || new Vector3(), o = this.knots[this.startKnot] + i * (this.knots[this.endKnot] - this.knots[this.startKnot]), c = th(this.degree, this.knots, this.controlPoints, o);
    return c.w != 1 && c.divideScalar(c.w), r.set(c.x, c.y, c.z);
  }
  getTangent(i, s) {
    const r = s || new Vector3(), o = this.knots[0] + i * (this.knots[this.knots.length - 1] - this.knots[0]), c = oh(this.degree, this.knots, this.controlPoints, o, 1);
    return r.copy(c[1]).normalize(), r;
  }
};
var se2;
var Ve;
var nt2;
var ah = class extends Loader {
  constructor(i) {
    super(i);
  }
  load(i, s, r, o) {
    const c = this, p2 = c.path === "" ? LoaderUtils.extractUrlBase(i) : c.path, h2 = new FileLoader(this.manager);
    h2.setPath(c.path), h2.setResponseType("arraybuffer"), h2.setRequestHeader(c.requestHeader), h2.setWithCredentials(c.withCredentials), h2.load(i, function(m) {
      try {
        s(c.parse(m, p2));
      } catch (g) {
        o ? o(g) : console.error(g), c.manager.itemError(i);
      }
    }, r, o);
  }
  parse(i, s) {
    if (dh(i))
      se2 = new hh().parse(i);
    else {
      const o = nl(i);
      if (!mh(o))
        throw new Error("THREE.FBXLoader: Unknown format.");
      if (Ca(o) < 7e3)
        throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + Ca(o));
      se2 = new ph().parse(o);
    }
    const r = new TextureLoader(this.manager).setPath(this.resourcePath || s).setCrossOrigin(this.crossOrigin);
    return new lh(r, this.manager).parse(se2);
  }
};
var lh = class {
  constructor(i, s) {
    this.textureLoader = i, this.manager = s;
  }
  parse() {
    Ve = this.parseConnections();
    const i = this.parseImages(), s = this.parseTextures(i), r = this.parseMaterials(s), o = this.parseDeformers(), c = new ch().parse(o);
    return this.parseScene(o, c, r), nt2;
  }
  // Parses FBXTree.Connections which holds parent-child connections between objects (e.g. material -> texture, model->geometry )
  // and details the connection type
  parseConnections() {
    const i = /* @__PURE__ */ new Map();
    return "Connections" in se2 && se2.Connections.connections.forEach(function(r) {
      const o = r[0], c = r[1], p2 = r[2];
      i.has(o) || i.set(o, {
        parents: [],
        children: []
      });
      const h2 = {
        ID: c,
        relationship: p2
      };
      i.get(o).parents.push(h2), i.has(c) || i.set(c, {
        parents: [],
        children: []
      });
      const m = {
        ID: o,
        relationship: p2
      };
      i.get(c).children.push(m);
    }), i;
  }
  // Parse FBXTree.Objects.Video for embedded image data
  // These images are connected to textures in FBXTree.Objects.Textures
  // via FBXTree.Connections.
  parseImages() {
    const i = {}, s = {};
    if ("Video" in se2.Objects) {
      const r = se2.Objects.Video;
      for (const o in r) {
        const c = r[o], p2 = parseInt(o);
        if (i[p2] = c.RelativeFilename || c.Filename, "Content" in c) {
          const h2 = c.Content instanceof ArrayBuffer && c.Content.byteLength > 0, m = typeof c.Content == "string" && c.Content !== "";
          if (h2 || m) {
            const g = this.parseImage(r[o]);
            s[c.RelativeFilename || c.Filename] = g;
          }
        }
      }
    }
    for (const r in i) {
      const o = i[r];
      s[o] !== void 0 ? i[r] = s[o] : i[r] = i[r].split("\\").pop();
    }
    return i;
  }
  // Parse embedded image data in FBXTree.Video.Content
  parseImage(i) {
    const s = i.Content, r = i.RelativeFilename || i.Filename, o = r.slice(r.lastIndexOf(".") + 1).toLowerCase();
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
      const p2 = new Uint8Array(s);
      return window.URL.createObjectURL(new Blob([p2], {
        type: c
      }));
    }
  }
  // Parse nodes in FBXTree.Objects.Texture
  // These contain details such as UV scaling, cropping, rotation etc and are connected
  // to images in FBXTree.Objects.Video
  parseTextures(i) {
    const s = /* @__PURE__ */ new Map();
    if ("Texture" in se2.Objects) {
      const r = se2.Objects.Texture;
      for (const o in r) {
        const c = this.parseTexture(r[o], i);
        s.set(parseInt(o), c);
      }
    }
    return s;
  }
  // Parse individual node in FBXTree.Objects.Texture
  parseTexture(i, s) {
    const r = this.loadTexture(i, s);
    r.ID = i.id, r.name = i.attrName;
    const o = i.WrapModeU, c = i.WrapModeV, p2 = o !== void 0 ? o.value : 0, h2 = c !== void 0 ? c.value : 0;
    if (r.wrapS = p2 === 0 ? RepeatWrapping : ClampToEdgeWrapping, r.wrapT = h2 === 0 ? RepeatWrapping : ClampToEdgeWrapping, "Scaling" in i) {
      const m = i.Scaling.value;
      r.repeat.x = m[0], r.repeat.y = m[1];
    }
    return r;
  }
  // load a texture specified as a blob or data URI, or via an external URL using TextureLoader
  loadTexture(i, s) {
    let r;
    const o = this.textureLoader.path, c = Ve.get(i.id).children;
    c !== void 0 && c.length > 0 && s[c[0].ID] !== void 0 && (r = s[c[0].ID], (r.indexOf("blob:") === 0 || r.indexOf("data:") === 0) && this.textureLoader.setPath(void 0));
    let p2;
    const h2 = i.FileName.slice(-3).toLowerCase();
    if (h2 === "tga") {
      const m = this.manager.getHandler(".tga");
      m === null ? (console.warn("FBXLoader: TGA loader not found, creating placeholder texture for", i.RelativeFilename), p2 = new Texture()) : (m.setPath(this.textureLoader.path), p2 = m.load(r));
    } else
      h2 === "psd" ? (console.warn("FBXLoader: PSD textures are not supported, creating placeholder texture for", i.RelativeFilename), p2 = new Texture()) : p2 = this.textureLoader.load(r);
    return this.textureLoader.setPath(o), p2;
  }
  // Parse nodes in FBXTree.Objects.Material
  parseMaterials(i) {
    const s = /* @__PURE__ */ new Map();
    if ("Material" in se2.Objects) {
      const r = se2.Objects.Material;
      for (const o in r) {
        const c = this.parseMaterial(r[o], i);
        c !== null && s.set(parseInt(o), c);
      }
    }
    return s;
  }
  // Parse single node in FBXTree.Objects.Material
  // Materials are connected to texture maps in FBXTree.Objects.Textures
  // FBX format currently only supports Lambert and Phong shading models
  parseMaterial(i, s) {
    const r = i.id, o = i.attrName;
    let c = i.ShadingModel;
    if (typeof c == "object" && (c = c.value), !Ve.has(r))
      return null;
    const p2 = this.parseParameters(i, s, r);
    let h2;
    switch (c.toLowerCase()) {
      case "phong":
        h2 = new MeshPhongMaterial();
        break;
      case "lambert":
        h2 = new MeshLambertMaterial();
        break;
      default:
        console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.', c), h2 = new MeshPhongMaterial();
        break;
    }
    return h2.setValues(p2), h2.name = o, h2;
  }
  // Parse FBX material and return parameters suitable for a three.js material
  // Also parse the texture map and return any textures associated with the material
  parseParameters(i, s, r) {
    const o = {};
    i.BumpFactor && (o.bumpScale = i.BumpFactor.value), i.Diffuse ? o.color = new Color().fromArray(i.Diffuse.value) : i.DiffuseColor && (i.DiffuseColor.type === "Color" || i.DiffuseColor.type === "ColorRGB") && (o.color = new Color().fromArray(i.DiffuseColor.value)), i.DisplacementFactor && (o.displacementScale = i.DisplacementFactor.value), i.Emissive ? o.emissive = new Color().fromArray(i.Emissive.value) : i.EmissiveColor && (i.EmissiveColor.type === "Color" || i.EmissiveColor.type === "ColorRGB") && (o.emissive = new Color().fromArray(i.EmissiveColor.value)), i.EmissiveFactor && (o.emissiveIntensity = parseFloat(i.EmissiveFactor.value)), i.Opacity && (o.opacity = parseFloat(i.Opacity.value)), o.opacity < 1 && (o.transparent = true), i.ReflectionFactor && (o.reflectivity = i.ReflectionFactor.value), i.Shininess && (o.shininess = i.Shininess.value), i.Specular ? o.specular = new Color().fromArray(i.Specular.value) : i.SpecularColor && i.SpecularColor.type === "Color" && (o.specular = new Color().fromArray(i.SpecularColor.value));
    const c = this;
    return Ve.get(r).children.forEach(function(p2) {
      const h2 = p2.relationship;
      switch (h2) {
        case "Bump":
          o.bumpMap = c.getTexture(s, p2.ID);
          break;
        case "Maya|TEX_ao_map":
          o.aoMap = c.getTexture(s, p2.ID);
          break;
        case "DiffuseColor":
        case "Maya|TEX_color_map":
          o.map = c.getTexture(s, p2.ID), o.map !== void 0 && (o.map.encoding = sRGBEncoding);
          break;
        case "DisplacementColor":
          o.displacementMap = c.getTexture(s, p2.ID);
          break;
        case "EmissiveColor":
          o.emissiveMap = c.getTexture(s, p2.ID), o.emissiveMap !== void 0 && (o.emissiveMap.encoding = sRGBEncoding);
          break;
        case "NormalMap":
        case "Maya|TEX_normal_map":
          o.normalMap = c.getTexture(s, p2.ID);
          break;
        case "ReflectionColor":
          o.envMap = c.getTexture(s, p2.ID), o.envMap !== void 0 && (o.envMap.mapping = EquirectangularReflectionMapping, o.envMap.encoding = sRGBEncoding);
          break;
        case "SpecularColor":
          o.specularMap = c.getTexture(s, p2.ID), o.specularMap !== void 0 && (o.specularMap.encoding = sRGBEncoding);
          break;
        case "TransparentColor":
        case "TransparencyFactor":
          o.alphaMap = c.getTexture(s, p2.ID), o.transparent = true;
          break;
        case "AmbientColor":
        case "ShininessExponent":
        case "SpecularFactor":
        case "VectorDisplacementColor":
        default:
          console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.", h2);
          break;
      }
    }), o;
  }
  // get a texture from the textureMap for use by a material.
  getTexture(i, s) {
    return "LayeredTexture" in se2.Objects && s in se2.Objects.LayeredTexture && (console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."), s = Ve.get(s).children[0].ID), i.get(s);
  }
  // Parse nodes in FBXTree.Objects.Deformer
  // Deformer node can contain skinning or Vertex Cache animation data, however only skinning is supported here
  // Generates map of Skeleton-like objects for use later when generating and binding skeletons.
  parseDeformers() {
    const i = {}, s = {};
    if ("Deformer" in se2.Objects) {
      const r = se2.Objects.Deformer;
      for (const o in r) {
        const c = r[o], p2 = Ve.get(parseInt(o));
        if (c.attrType === "Skin") {
          const h2 = this.parseSkeleton(p2, r);
          h2.ID = o, p2.parents.length > 1 && console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."), h2.geometryID = p2.parents[0].ID, i[o] = h2;
        } else if (c.attrType === "BlendShape") {
          const h2 = {
            id: o
          };
          h2.rawTargets = this.parseMorphTargets(p2, r), h2.id = o, p2.parents.length > 1 && console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."), s[o] = h2;
        }
      }
    }
    return {
      skeletons: i,
      morphTargets: s
    };
  }
  // Parse single nodes in FBXTree.Objects.Deformer
  // The top level skeleton node has type 'Skin' and sub nodes have type 'Cluster'
  // Each skin node represents a skeleton and each cluster node represents a bone
  parseSkeleton(i, s) {
    const r = [];
    return i.children.forEach(function(o) {
      const c = s[o.ID];
      if (c.attrType !== "Cluster")
        return;
      const p2 = {
        ID: o.ID,
        indices: [],
        weights: [],
        transformLink: new Matrix4().fromArray(c.TransformLink.a)
        // transform: new Matrix4().fromArray( boneNode.Transform.a ),
        // linkMode: boneNode.Mode,
      };
      "Indexes" in c && (p2.indices = c.Indexes.a, p2.weights = c.Weights.a), r.push(p2);
    }), {
      rawBones: r,
      bones: []
    };
  }
  // The top level morph deformer node has type "BlendShape" and sub nodes have type "BlendShapeChannel"
  parseMorphTargets(i, s) {
    const r = [];
    for (let o = 0; o < i.children.length; o++) {
      const c = i.children[o], p2 = s[c.ID], h2 = {
        name: p2.attrName,
        initialWeight: p2.DeformPercent,
        id: p2.id,
        fullWeights: p2.FullWeights.a
      };
      if (p2.attrType !== "BlendShapeChannel")
        return;
      h2.geoID = Ve.get(parseInt(c.ID)).children.filter(function(m) {
        return m.relationship === void 0;
      })[0].ID, r.push(h2);
    }
    return r;
  }
  // create the main Group() to be returned by the loader
  parseScene(i, s, r) {
    nt2 = new Group();
    const o = this.parseModels(i.skeletons, s, r), c = se2.Objects.Model, p2 = this;
    o.forEach(function(m) {
      const g = c[m.ID];
      p2.setLookAtProperties(m, g), Ve.get(m.ID).parents.forEach(function(_2) {
        const y = o.get(_2.ID);
        y !== void 0 && y.add(m);
      }), m.parent === null && nt2.add(m);
    }), this.bindSkeleton(i.skeletons, s, o), this.createAmbientLight(), nt2.traverse(function(m) {
      if (m.userData.transformData) {
        m.parent && (m.userData.transformData.parentMatrix = m.parent.matrix, m.userData.transformData.parentMatrixWorld = m.parent.matrixWorld);
        const g = el(m.userData.transformData);
        m.applyMatrix4(g), m.updateWorldMatrix();
      }
    });
    const h2 = new uh().parse();
    nt2.children.length === 1 && nt2.children[0].isGroup && (nt2.children[0].animations = h2, nt2 = nt2.children[0]), nt2.animations = h2;
  }
  // parse nodes in FBXTree.Objects.Model
  parseModels(i, s, r) {
    const o = /* @__PURE__ */ new Map(), c = se2.Objects.Model;
    for (const p2 in c) {
      const h2 = parseInt(p2), m = c[p2], g = Ve.get(h2);
      let w = this.buildSkeleton(g, i, h2, m.attrName);
      if (!w) {
        switch (m.attrType) {
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
        w.name = m.attrName ? PropertyBinding.sanitizeNodeName(m.attrName) : "", w.ID = h2;
      }
      this.getTransformData(w, m), o.set(h2, w);
    }
    return o;
  }
  buildSkeleton(i, s, r, o) {
    let c = null;
    return i.parents.forEach(function(p2) {
      for (const h2 in s) {
        const m = s[h2];
        m.rawBones.forEach(function(g, w) {
          if (g.ID === p2.ID) {
            const _2 = c;
            c = new Bone(), c.matrixWorld.copy(g.transformLink), c.name = o ? PropertyBinding.sanitizeNodeName(o) : "", c.ID = r, m.bones[w] = c, _2 !== null && c.add(_2);
          }
        });
      }
    }), c;
  }
  // create a PerspectiveCamera or OrthographicCamera
  createCamera(i) {
    let s, r;
    if (i.children.forEach(function(o) {
      const c = se2.Objects.NodeAttribute[o.ID];
      c !== void 0 && (r = c);
    }), r === void 0)
      s = new Object3D();
    else {
      let o = 0;
      r.CameraProjectionType !== void 0 && r.CameraProjectionType.value === 1 && (o = 1);
      let c = 1;
      r.NearPlane !== void 0 && (c = r.NearPlane.value / 1e3);
      let p2 = 1e3;
      r.FarPlane !== void 0 && (p2 = r.FarPlane.value / 1e3);
      let h2 = window.innerWidth, m = window.innerHeight;
      r.AspectWidth !== void 0 && r.AspectHeight !== void 0 && (h2 = r.AspectWidth.value, m = r.AspectHeight.value);
      const g = h2 / m;
      let w = 45;
      r.FieldOfView !== void 0 && (w = r.FieldOfView.value);
      const _2 = r.FocalLength ? r.FocalLength.value : null;
      switch (o) {
        case 0:
          s = new PerspectiveCamera(w, g, c, p2), _2 !== null && s.setFocalLength(_2);
          break;
        case 1:
          s = new OrthographicCamera(-h2 / 2, h2 / 2, m / 2, -m / 2, c, p2);
          break;
        default:
          console.warn("THREE.FBXLoader: Unknown camera type " + o + "."), s = new Object3D();
          break;
      }
    }
    return s;
  }
  // Create a DirectionalLight, PointLight or SpotLight
  createLight(i) {
    let s, r;
    if (i.children.forEach(function(o) {
      const c = se2.Objects.NodeAttribute[o.ID];
      c !== void 0 && (r = c);
    }), r === void 0)
      s = new Object3D();
    else {
      let o;
      r.LightType === void 0 ? o = 0 : o = r.LightType.value;
      let c = 16777215;
      r.Color !== void 0 && (c = new Color().fromArray(r.Color.value));
      let p2 = r.Intensity === void 0 ? 1 : r.Intensity.value / 100;
      r.CastLightOnObject !== void 0 && r.CastLightOnObject.value === 0 && (p2 = 0);
      let h2 = 0;
      r.FarAttenuationEnd !== void 0 && (r.EnableFarAttenuation !== void 0 && r.EnableFarAttenuation.value === 0 ? h2 = 0 : h2 = r.FarAttenuationEnd.value);
      const m = 1;
      switch (o) {
        case 0:
          s = new PointLight(c, p2, h2, m);
          break;
        case 1:
          s = new DirectionalLight(c, p2);
          break;
        case 2:
          let g = Math.PI / 3;
          r.InnerAngle !== void 0 && (g = MathUtils.degToRad(r.InnerAngle.value));
          let w = 0;
          r.OuterAngle !== void 0 && (w = MathUtils.degToRad(r.OuterAngle.value), w = Math.max(w, 1)), s = new SpotLight(c, p2, h2, g, w, m);
          break;
        default:
          console.warn("THREE.FBXLoader: Unknown light type " + r.LightType.value + ", defaulting to a PointLight."), s = new PointLight(c, p2);
          break;
      }
      r.CastShadows !== void 0 && r.CastShadows.value === 1 && (s.castShadow = true);
    }
    return s;
  }
  createMesh(i, s, r) {
    let o, c = null, p2 = null;
    const h2 = [];
    return i.children.forEach(function(m) {
      s.has(m.ID) && (c = s.get(m.ID)), r.has(m.ID) && h2.push(r.get(m.ID));
    }), h2.length > 1 ? p2 = h2 : h2.length > 0 ? p2 = h2[0] : (p2 = new MeshPhongMaterial({
      color: 13421772
    }), h2.push(p2)), "color" in c.attributes && h2.forEach(function(m) {
      m.vertexColors = true;
    }), c.FBX_Deformer ? (o = new SkinnedMesh(c, p2), o.normalizeSkinWeights()) : o = new Mesh(c, p2), o;
  }
  createCurve(i, s) {
    const r = i.children.reduce(function(c, p2) {
      return s.has(p2.ID) && (c = s.get(p2.ID)), c;
    }, null), o = new LineBasicMaterial({
      color: 3342591,
      linewidth: 1
    });
    return new Line(r, o);
  }
  // parse the model node for transform data
  getTransformData(i, s) {
    const r = {};
    "InheritType" in s && (r.inheritType = parseInt(s.InheritType.value)), "RotationOrder" in s ? r.eulerOrder = tl(s.RotationOrder.value) : r.eulerOrder = "ZYX", "Lcl_Translation" in s && (r.translation = s.Lcl_Translation.value), "PreRotation" in s && (r.preRotation = s.PreRotation.value), "Lcl_Rotation" in s && (r.rotation = s.Lcl_Rotation.value), "PostRotation" in s && (r.postRotation = s.PostRotation.value), "Lcl_Scaling" in s && (r.scale = s.Lcl_Scaling.value), "ScalingOffset" in s && (r.scalingOffset = s.ScalingOffset.value), "ScalingPivot" in s && (r.scalingPivot = s.ScalingPivot.value), "RotationOffset" in s && (r.rotationOffset = s.RotationOffset.value), "RotationPivot" in s && (r.rotationPivot = s.RotationPivot.value), i.userData.transformData = r;
  }
  setLookAtProperties(i, s) {
    "LookAtProperty" in s && Ve.get(i.ID).children.forEach(function(o) {
      if (o.relationship === "LookAtProperty") {
        const c = se2.Objects.Model[o.ID];
        if ("Lcl_Translation" in c) {
          const p2 = c.Lcl_Translation.value;
          i.target !== void 0 ? (i.target.position.fromArray(p2), nt2.add(i.target)) : i.lookAt(new Vector3().fromArray(p2));
        }
      }
    });
  }
  bindSkeleton(i, s, r) {
    const o = this.parsePoseNodes();
    for (const c in i) {
      const p2 = i[c];
      Ve.get(parseInt(p2.ID)).parents.forEach(function(m) {
        if (s.has(m.ID)) {
          const g = m.ID;
          Ve.get(g).parents.forEach(function(_2) {
            r.has(_2.ID) && r.get(_2.ID).bind(new Skeleton(p2.bones), o[_2.ID]);
          });
        }
      });
    }
  }
  parsePoseNodes() {
    const i = {};
    if ("Pose" in se2.Objects) {
      const s = se2.Objects.Pose;
      for (const r in s)
        if (s[r].attrType === "BindPose" && s[r].NbPoseNodes > 0) {
          const o = s[r].PoseNode;
          Array.isArray(o) ? o.forEach(function(c) {
            i[c.Node] = new Matrix4().fromArray(c.Matrix.a);
          }) : i[o.Node] = new Matrix4().fromArray(o.Matrix.a);
        }
    }
    return i;
  }
  // Parse ambient color in FBXTree.GlobalSettings - if it's not set to black (default), create an ambient light
  createAmbientLight() {
    if ("GlobalSettings" in se2 && "AmbientColor" in se2.GlobalSettings) {
      const i = se2.GlobalSettings.AmbientColor.value, s = i[0], r = i[1], o = i[2];
      if (s !== 0 || r !== 0 || o !== 0) {
        const c = new Color(s, r, o);
        nt2.add(new AmbientLight(c, 1));
      }
    }
  }
};
var ch = class {
  // Parse nodes in FBXTree.Objects.Geometry
  parse(i) {
    const s = /* @__PURE__ */ new Map();
    if ("Geometry" in se2.Objects) {
      const r = se2.Objects.Geometry;
      for (const o in r) {
        const c = Ve.get(parseInt(o)), p2 = this.parseGeometry(c, r[o], i);
        s.set(parseInt(o), p2);
      }
    }
    return s;
  }
  // Parse single node in FBXTree.Objects.Geometry
  parseGeometry(i, s, r) {
    switch (s.attrType) {
      case "Mesh":
        return this.parseMeshGeometry(i, s, r);
      case "NurbsCurve":
        return this.parseNurbsGeometry(s);
    }
  }
  // Parse single node mesh geometry in FBXTree.Objects.Geometry
  parseMeshGeometry(i, s, r) {
    const o = r.skeletons, c = [], p2 = i.parents.map(function(_2) {
      return se2.Objects.Model[_2.ID];
    });
    if (p2.length === 0)
      return;
    const h2 = i.children.reduce(function(_2, y) {
      return o[y.ID] !== void 0 && (_2 = o[y.ID]), _2;
    }, null);
    i.children.forEach(function(_2) {
      r.morphTargets[_2.ID] !== void 0 && c.push(r.morphTargets[_2.ID]);
    });
    const m = p2[0], g = {};
    "RotationOrder" in m && (g.eulerOrder = tl(m.RotationOrder.value)), "InheritType" in m && (g.inheritType = parseInt(m.InheritType.value)), "GeometricTranslation" in m && (g.translation = m.GeometricTranslation.value), "GeometricRotation" in m && (g.rotation = m.GeometricRotation.value), "GeometricScaling" in m && (g.scale = m.GeometricScaling.value);
    const w = el(g);
    return this.genGeometry(s, h2, c, w);
  }
  // Generate a BufferGeometry from a node in FBXTree.Objects.Geometry
  genGeometry(i, s, r, o) {
    const c = new BufferGeometry();
    i.attrName && (c.name = i.attrName);
    const p2 = this.parseGeoNode(i, s), h2 = this.genBuffers(p2), m = new Float32BufferAttribute(h2.vertex, 3);
    if (m.applyMatrix4(o), c.setAttribute("position", m), h2.colors.length > 0 && c.setAttribute("color", new Float32BufferAttribute(h2.colors, 3)), s && (c.setAttribute("skinIndex", new Uint16BufferAttribute(h2.weightsIndices, 4)), c.setAttribute("skinWeight", new Float32BufferAttribute(h2.vertexWeights, 4)), c.FBX_Deformer = s), h2.normal.length > 0) {
      const g = new Matrix3().getNormalMatrix(o), w = new Float32BufferAttribute(h2.normal, 3);
      w.applyNormalMatrix(g), c.setAttribute("normal", w);
    }
    if (h2.uvs.forEach(function(g, w) {
      let _2 = "uv" + (w + 1).toString();
      w === 0 && (_2 = "uv"), c.setAttribute(_2, new Float32BufferAttribute(h2.uvs[w], 2));
    }), p2.material && p2.material.mappingType !== "AllSame") {
      let g = h2.materialIndex[0], w = 0;
      if (h2.materialIndex.forEach(function(_2, y) {
        _2 !== g && (c.addGroup(w, y - w, g), g = _2, w = y);
      }), c.groups.length > 0) {
        const _2 = c.groups[c.groups.length - 1], y = _2.start + _2.count;
        y !== h2.materialIndex.length && c.addGroup(y, h2.materialIndex.length - y, g);
      }
      c.groups.length === 0 && c.addGroup(0, h2.materialIndex.length, h2.materialIndex[0]);
    }
    return this.addMorphTargets(c, i, r, o), c;
  }
  parseGeoNode(i, s) {
    const r = {};
    if (r.vertexPositions = i.Vertices !== void 0 ? i.Vertices.a : [], r.vertexIndices = i.PolygonVertexIndex !== void 0 ? i.PolygonVertexIndex.a : [], i.LayerElementColor && (r.color = this.parseVertexColors(i.LayerElementColor[0])), i.LayerElementMaterial && (r.material = this.parseMaterialIndices(i.LayerElementMaterial[0])), i.LayerElementNormal && (r.normal = this.parseNormals(i.LayerElementNormal[0])), i.LayerElementUV) {
      r.uv = [];
      let o = 0;
      for (; i.LayerElementUV[o]; )
        i.LayerElementUV[o].UV && r.uv.push(this.parseUVs(i.LayerElementUV[o])), o++;
    }
    return r.weightTable = {}, s !== null && (r.skeleton = s, s.rawBones.forEach(function(o, c) {
      o.indices.forEach(function(p2, h2) {
        r.weightTable[p2] === void 0 && (r.weightTable[p2] = []), r.weightTable[p2].push({
          id: c,
          weight: o.weights[h2]
        });
      });
    })), r;
  }
  genBuffers(i) {
    const s = {
      vertex: [],
      normal: [],
      colors: [],
      uvs: [],
      materialIndex: [],
      vertexWeights: [],
      weightsIndices: []
    };
    let r = 0, o = 0, c = false, p2 = [], h2 = [], m = [], g = [], w = [], _2 = [];
    const y = this;
    return i.vertexIndices.forEach(function(C, L) {
      let S, R = false;
      C < 0 && (C = C ^ -1, R = true);
      let O = [], N = [];
      if (p2.push(C * 3, C * 3 + 1, C * 3 + 2), i.color) {
        const I2 = js(L, r, C, i.color);
        m.push(I2[0], I2[1], I2[2]);
      }
      if (i.skeleton) {
        if (i.weightTable[C] !== void 0 && i.weightTable[C].forEach(function(I2) {
          N.push(I2.weight), O.push(I2.id);
        }), N.length > 4) {
          c || (console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."), c = true);
          const I2 = [0, 0, 0, 0], D2 = [0, 0, 0, 0];
          N.forEach(function(Y, G) {
            let F = Y, B = O[G];
            D2.forEach(function(H2, K2, q) {
              if (F > H2) {
                q[K2] = F, F = H2;
                const pe = I2[K2];
                I2[K2] = B, B = pe;
              }
            });
          }), O = I2, N = D2;
        }
        for (; N.length < 4; )
          N.push(0), O.push(0);
        for (let I2 = 0; I2 < 4; ++I2)
          w.push(N[I2]), _2.push(O[I2]);
      }
      if (i.normal) {
        const I2 = js(L, r, C, i.normal);
        h2.push(I2[0], I2[1], I2[2]);
      }
      i.material && i.material.mappingType !== "AllSame" && (S = js(L, r, C, i.material)[0]), i.uv && i.uv.forEach(function(I2, D2) {
        const Y = js(L, r, C, I2);
        g[D2] === void 0 && (g[D2] = []), g[D2].push(Y[0]), g[D2].push(Y[1]);
      }), o++, R && (y.genFace(s, i, p2, S, h2, m, g, w, _2, o), r++, o = 0, p2 = [], h2 = [], m = [], g = [], w = [], _2 = []);
    }), s;
  }
  // Generate data for a single face in a geometry. If the face is a quad then split it into 2 tris
  genFace(i, s, r, o, c, p2, h2, m, g, w) {
    for (let _2 = 2; _2 < w; _2++)
      i.vertex.push(s.vertexPositions[r[0]]), i.vertex.push(s.vertexPositions[r[1]]), i.vertex.push(s.vertexPositions[r[2]]), i.vertex.push(s.vertexPositions[r[(_2 - 1) * 3]]), i.vertex.push(s.vertexPositions[r[(_2 - 1) * 3 + 1]]), i.vertex.push(s.vertexPositions[r[(_2 - 1) * 3 + 2]]), i.vertex.push(s.vertexPositions[r[_2 * 3]]), i.vertex.push(s.vertexPositions[r[_2 * 3 + 1]]), i.vertex.push(s.vertexPositions[r[_2 * 3 + 2]]), s.skeleton && (i.vertexWeights.push(m[0]), i.vertexWeights.push(m[1]), i.vertexWeights.push(m[2]), i.vertexWeights.push(m[3]), i.vertexWeights.push(m[(_2 - 1) * 4]), i.vertexWeights.push(m[(_2 - 1) * 4 + 1]), i.vertexWeights.push(m[(_2 - 1) * 4 + 2]), i.vertexWeights.push(m[(_2 - 1) * 4 + 3]), i.vertexWeights.push(m[_2 * 4]), i.vertexWeights.push(m[_2 * 4 + 1]), i.vertexWeights.push(m[_2 * 4 + 2]), i.vertexWeights.push(m[_2 * 4 + 3]), i.weightsIndices.push(g[0]), i.weightsIndices.push(g[1]), i.weightsIndices.push(g[2]), i.weightsIndices.push(g[3]), i.weightsIndices.push(g[(_2 - 1) * 4]), i.weightsIndices.push(g[(_2 - 1) * 4 + 1]), i.weightsIndices.push(g[(_2 - 1) * 4 + 2]), i.weightsIndices.push(g[(_2 - 1) * 4 + 3]), i.weightsIndices.push(g[_2 * 4]), i.weightsIndices.push(g[_2 * 4 + 1]), i.weightsIndices.push(g[_2 * 4 + 2]), i.weightsIndices.push(g[_2 * 4 + 3])), s.color && (i.colors.push(p2[0]), i.colors.push(p2[1]), i.colors.push(p2[2]), i.colors.push(p2[(_2 - 1) * 3]), i.colors.push(p2[(_2 - 1) * 3 + 1]), i.colors.push(p2[(_2 - 1) * 3 + 2]), i.colors.push(p2[_2 * 3]), i.colors.push(p2[_2 * 3 + 1]), i.colors.push(p2[_2 * 3 + 2])), s.material && s.material.mappingType !== "AllSame" && (i.materialIndex.push(o), i.materialIndex.push(o), i.materialIndex.push(o)), s.normal && (i.normal.push(c[0]), i.normal.push(c[1]), i.normal.push(c[2]), i.normal.push(c[(_2 - 1) * 3]), i.normal.push(c[(_2 - 1) * 3 + 1]), i.normal.push(c[(_2 - 1) * 3 + 2]), i.normal.push(c[_2 * 3]), i.normal.push(c[_2 * 3 + 1]), i.normal.push(c[_2 * 3 + 2])), s.uv && s.uv.forEach(function(y, C) {
        i.uvs[C] === void 0 && (i.uvs[C] = []), i.uvs[C].push(h2[C][0]), i.uvs[C].push(h2[C][1]), i.uvs[C].push(h2[C][(_2 - 1) * 2]), i.uvs[C].push(h2[C][(_2 - 1) * 2 + 1]), i.uvs[C].push(h2[C][_2 * 2]), i.uvs[C].push(h2[C][_2 * 2 + 1]);
      });
  }
  addMorphTargets(i, s, r, o) {
    if (r.length === 0)
      return;
    i.morphTargetsRelative = true, i.morphAttributes.position = [];
    const c = this;
    r.forEach(function(p2) {
      p2.rawTargets.forEach(function(h2) {
        const m = se2.Objects.Geometry[h2.geoID];
        m !== void 0 && c.genMorphGeometry(i, s, m, o, h2.name);
      });
    });
  }
  // a morph geometry node is similar to a standard  node, and the node is also contained
  // in FBXTree.Objects.Geometry, however it can only have attributes for position, normal
  // and a special attribute Index defining which vertices of the original geometry are affected
  // Normal and position attributes only have data for the vertices that are affected by the morph
  genMorphGeometry(i, s, r, o, c) {
    const p2 = s.PolygonVertexIndex !== void 0 ? s.PolygonVertexIndex.a : [], h2 = r.Vertices !== void 0 ? r.Vertices.a : [], m = r.Indexes !== void 0 ? r.Indexes.a : [], g = i.attributes.position.count * 3, w = new Float32Array(g);
    for (let L = 0; L < m.length; L++) {
      const S = m[L] * 3;
      w[S] = h2[L * 3], w[S + 1] = h2[L * 3 + 1], w[S + 2] = h2[L * 3 + 2];
    }
    const _2 = {
      vertexIndices: p2,
      vertexPositions: w
    }, y = this.genBuffers(_2), C = new Float32BufferAttribute(y.vertex, 3);
    C.name = c || r.attrName, C.applyMatrix4(o), i.morphAttributes.position.push(C);
  }
  // Parse normal from FBXTree.Objects.Geometry.LayerElementNormal if it exists
  parseNormals(i) {
    const s = i.MappingInformationType, r = i.ReferenceInformationType, o = i.Normals.a;
    let c = [];
    return r === "IndexToDirect" && ("NormalIndex" in i ? c = i.NormalIndex.a : "NormalsIndex" in i && (c = i.NormalsIndex.a)), {
      dataSize: 3,
      buffer: o,
      indices: c,
      mappingType: s,
      referenceType: r
    };
  }
  // Parse UVs from FBXTree.Objects.Geometry.LayerElementUV if it exists
  parseUVs(i) {
    const s = i.MappingInformationType, r = i.ReferenceInformationType, o = i.UV.a;
    let c = [];
    return r === "IndexToDirect" && (c = i.UVIndex.a), {
      dataSize: 2,
      buffer: o,
      indices: c,
      mappingType: s,
      referenceType: r
    };
  }
  // Parse Vertex Colors from FBXTree.Objects.Geometry.LayerElementColor if it exists
  parseVertexColors(i) {
    const s = i.MappingInformationType, r = i.ReferenceInformationType, o = i.Colors.a;
    let c = [];
    return r === "IndexToDirect" && (c = i.ColorIndex.a), {
      dataSize: 4,
      buffer: o,
      indices: c,
      mappingType: s,
      referenceType: r
    };
  }
  // Parse mapping and material data in FBXTree.Objects.Geometry.LayerElementMaterial if it exists
  parseMaterialIndices(i) {
    const s = i.MappingInformationType, r = i.ReferenceInformationType;
    if (s === "NoMappingInformation")
      return {
        dataSize: 1,
        buffer: [0],
        indices: [0],
        mappingType: "AllSame",
        referenceType: r
      };
    const o = i.Materials.a, c = [];
    for (let p2 = 0; p2 < o.length; ++p2)
      c.push(p2);
    return {
      dataSize: 1,
      buffer: o,
      indices: c,
      mappingType: s,
      referenceType: r
    };
  }
  // Generate a NurbGeometry from a node in FBXTree.Objects.Geometry
  parseNurbsGeometry(i) {
    if (xa === void 0)
      return console.error("THREE.FBXLoader: The loader relies on NURBSCurve for any nurbs present in the model. Nurbs will show up as empty geometry."), new BufferGeometry();
    const s = parseInt(i.Order);
    if (isNaN(s))
      return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s", i.Order, i.id), new BufferGeometry();
    const r = s - 1, o = i.KnotVector.a, c = [], p2 = i.Points.a;
    for (let _2 = 0, y = p2.length; _2 < y; _2 += 4)
      c.push(new Vector4().fromArray(p2, _2));
    let h2, m;
    if (i.Form === "Closed")
      c.push(c[0]);
    else if (i.Form === "Periodic") {
      h2 = r, m = o.length - 1 - h2;
      for (let _2 = 0; _2 < r; ++_2)
        c.push(c[_2]);
    }
    const w = new xa(r, o, c, h2, m).getPoints(c.length * 12);
    return new BufferGeometry().setFromPoints(w);
  }
};
var uh = class {
  // take raw animation clips and turn them into three.js animation clips
  parse() {
    const i = [], s = this.parseClips();
    if (s !== void 0)
      for (const r in s) {
        const o = s[r], c = this.addClip(o);
        i.push(c);
      }
    return i;
  }
  parseClips() {
    if (se2.Objects.AnimationCurve === void 0)
      return;
    const i = this.parseAnimationCurveNodes();
    this.parseAnimationCurves(i);
    const s = this.parseAnimationLayers(i);
    return this.parseAnimStacks(s);
  }
  // parse nodes in FBXTree.Objects.AnimationCurveNode
  // each AnimationCurveNode holds data for an animation transform for a model (e.g. left arm rotation )
  // and is referenced by an AnimationLayer
  parseAnimationCurveNodes() {
    const i = se2.Objects.AnimationCurveNode, s = /* @__PURE__ */ new Map();
    for (const r in i) {
      const o = i[r];
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
  parseAnimationCurves(i) {
    const s = se2.Objects.AnimationCurve;
    for (const r in s) {
      const o = {
        id: s[r].id,
        times: s[r].KeyTime.a.map(fh),
        values: s[r].KeyValueFloat.a
      }, c = Ve.get(o.id);
      if (c !== void 0) {
        const p2 = c.parents[0].ID, h2 = c.parents[0].relationship;
        h2.match(/X/) ? i.get(p2).curves.x = o : h2.match(/Y/) ? i.get(p2).curves.y = o : h2.match(/Z/) ? i.get(p2).curves.z = o : h2.match(/d|DeformPercent/) && i.has(p2) && (i.get(p2).curves.morph = o);
      }
    }
  }
  // parse nodes in FBXTree.Objects.AnimationLayer. Each layers holds references
  // to various AnimationCurveNodes and is referenced by an AnimationStack node
  // note: theoretically a stack can have multiple layers, however in practice there always seems to be one per stack
  parseAnimationLayers(i) {
    const s = se2.Objects.AnimationLayer, r = /* @__PURE__ */ new Map();
    for (const o in s) {
      const c = [], p2 = Ve.get(parseInt(o));
      p2 !== void 0 && (p2.children.forEach(function(m, g) {
        if (i.has(m.ID)) {
          const w = i.get(m.ID);
          if (w.curves.x !== void 0 || w.curves.y !== void 0 || w.curves.z !== void 0) {
            if (c[g] === void 0) {
              const _2 = Ve.get(m.ID).parents.filter(function(y) {
                return y.relationship !== void 0;
              })[0].ID;
              if (_2 !== void 0) {
                const y = se2.Objects.Model[_2.toString()];
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
                nt2.traverse(function(L) {
                  L.ID === y.id && (C.transform = L.matrix, L.userData.transformData && (C.eulerOrder = L.userData.transformData.eulerOrder));
                }), C.transform || (C.transform = new Matrix4()), "PreRotation" in y && (C.preRotation = y.PreRotation.value), "PostRotation" in y && (C.postRotation = y.PostRotation.value), c[g] = C;
              }
            }
            c[g] && (c[g][w.attr] = w);
          } else if (w.curves.morph !== void 0) {
            if (c[g] === void 0) {
              const _2 = Ve.get(m.ID).parents.filter(function(O) {
                return O.relationship !== void 0;
              })[0].ID, y = Ve.get(_2).parents[0].ID, C = Ve.get(y).parents[0].ID, L = Ve.get(C).parents[0].ID, S = se2.Objects.Model[L], R = {
                modelName: S.attrName ? PropertyBinding.sanitizeNodeName(S.attrName) : "",
                morphName: se2.Objects.Deformer[_2].attrName
              };
              c[g] = R;
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
  parseAnimStacks(i) {
    const s = se2.Objects.AnimationStack, r = {};
    for (const o in s) {
      const c = Ve.get(parseInt(o)).children;
      c.length > 1 && console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");
      const p2 = i.get(c[0].ID);
      r[o] = {
        name: s[o].attrName,
        layer: p2
      };
    }
    return r;
  }
  addClip(i) {
    let s = [];
    const r = this;
    return i.layer.forEach(function(o) {
      s = s.concat(r.generateTracks(o));
    }), new AnimationClip(i.name, -1, s);
  }
  generateTracks(i) {
    const s = [];
    let r = new Vector3(), o = new Quaternion(), c = new Vector3();
    if (i.transform && i.transform.decompose(r, o, c), r = r.toArray(), o = new Euler().setFromQuaternion(o, i.eulerOrder).toArray(), c = c.toArray(), i.T !== void 0 && Object.keys(i.T.curves).length > 0) {
      const p2 = this.generateVectorTrack(i.modelName, i.T.curves, r, "position");
      p2 !== void 0 && s.push(p2);
    }
    if (i.R !== void 0 && Object.keys(i.R.curves).length > 0) {
      const p2 = this.generateRotationTrack(i.modelName, i.R.curves, o, i.preRotation, i.postRotation, i.eulerOrder);
      p2 !== void 0 && s.push(p2);
    }
    if (i.S !== void 0 && Object.keys(i.S.curves).length > 0) {
      const p2 = this.generateVectorTrack(i.modelName, i.S.curves, c, "scale");
      p2 !== void 0 && s.push(p2);
    }
    if (i.DeformPercent !== void 0) {
      const p2 = this.generateMorphTrack(i);
      p2 !== void 0 && s.push(p2);
    }
    return s;
  }
  generateVectorTrack(i, s, r, o) {
    const c = this.getTimesForAllAxes(s), p2 = this.getKeyframeTrackValues(c, s, r);
    return new VectorKeyframeTrack(i + "." + o, c, p2);
  }
  generateRotationTrack(i, s, r, o, c, p2) {
    s.x !== void 0 && (this.interpolateRotations(s.x), s.x.values = s.x.values.map(MathUtils.degToRad)), s.y !== void 0 && (this.interpolateRotations(s.y), s.y.values = s.y.values.map(MathUtils.degToRad)), s.z !== void 0 && (this.interpolateRotations(s.z), s.z.values = s.z.values.map(MathUtils.degToRad));
    const h2 = this.getTimesForAllAxes(s), m = this.getKeyframeTrackValues(h2, s, r);
    o !== void 0 && (o = o.map(MathUtils.degToRad), o.push(p2), o = new Euler().fromArray(o), o = new Quaternion().setFromEuler(o)), c !== void 0 && (c = c.map(MathUtils.degToRad), c.push(p2), c = new Euler().fromArray(c), c = new Quaternion().setFromEuler(c).invert());
    const g = new Quaternion(), w = new Euler(), _2 = [];
    for (let y = 0; y < m.length; y += 3)
      w.set(m[y], m[y + 1], m[y + 2], p2), g.setFromEuler(w), o !== void 0 && g.premultiply(o), c !== void 0 && g.multiply(c), g.toArray(_2, y / 3 * 4);
    return new QuaternionKeyframeTrack(i + ".quaternion", h2, _2);
  }
  generateMorphTrack(i) {
    const s = i.DeformPercent.curves.morph, r = s.values.map(function(c) {
      return c / 100;
    }), o = nt2.getObjectByName(i.modelName).morphTargetDictionary[i.morphName];
    return new NumberKeyframeTrack(i.modelName + ".morphTargetInfluences[" + o + "]", s.times, r);
  }
  // For all animated objects, times are defined separately for each axis
  // Here we'll combine the times into one sorted array without duplicates
  getTimesForAllAxes(i) {
    let s = [];
    if (i.x !== void 0 && (s = s.concat(i.x.times)), i.y !== void 0 && (s = s.concat(i.y.times)), i.z !== void 0 && (s = s.concat(i.z.times)), s = s.sort(function(r, o) {
      return r - o;
    }), s.length > 1) {
      let r = 1, o = s[0];
      for (let c = 1; c < s.length; c++) {
        const p2 = s[c];
        p2 !== o && (s[r] = p2, o = p2, r++);
      }
      s = s.slice(0, r);
    }
    return s;
  }
  getKeyframeTrackValues(i, s, r) {
    const o = r, c = [];
    let p2 = -1, h2 = -1, m = -1;
    return i.forEach(function(g) {
      if (s.x && (p2 = s.x.times.indexOf(g)), s.y && (h2 = s.y.times.indexOf(g)), s.z && (m = s.z.times.indexOf(g)), p2 !== -1) {
        const w = s.x.values[p2];
        c.push(w), o[0] = w;
      } else
        c.push(o[0]);
      if (h2 !== -1) {
        const w = s.y.values[h2];
        c.push(w), o[1] = w;
      } else
        c.push(o[1]);
      if (m !== -1) {
        const w = s.z.values[m];
        c.push(w), o[2] = w;
      } else
        c.push(o[2]);
    }), c;
  }
  // Rotations are defined as Euler angles which can have values  of any size
  // These will be converted to quaternions which don't support values greater than
  // PI, so we'll interpolate large rotations
  interpolateRotations(i) {
    for (let s = 1; s < i.values.length; s++) {
      const r = i.values[s - 1], o = i.values[s] - r, c = Math.abs(o);
      if (c >= 180) {
        const p2 = c / 180, h2 = o / p2;
        let m = r + h2;
        const g = i.times[s - 1], _2 = (i.times[s] - g) / p2;
        let y = g + _2;
        const C = [], L = [];
        for (; y < i.times[s]; )
          C.push(y), y += _2, L.push(m), m += h2;
        i.times = Pa(i.times, s, C), i.values = Pa(i.values, s, L);
      }
    }
  }
};
var ph = class {
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
  setCurrentProp(i, s) {
    this.currentProp = i, this.currentPropName = s;
  }
  parse(i) {
    this.currentIndent = 0, this.allNodes = new Ja(), this.nodeStack = [], this.currentProp = [], this.currentPropName = "";
    const s = this, r = i.split(/[\r\n]+/);
    return r.forEach(function(o, c) {
      const p2 = o.match(/^[\s\t]*;/), h2 = o.match(/^[\s\t]*$/);
      if (p2 || h2)
        return;
      const m = o.match("^\\t{" + s.currentIndent + "}(\\w+):(.*){", ""), g = o.match("^\\t{" + s.currentIndent + "}(\\w+):[\\s\\t\\r\\n](.*)"), w = o.match("^\\t{" + (s.currentIndent - 1) + "}}");
      m ? s.parseNodeBegin(o, m) : g ? s.parseNodeProperty(o, g, r[++c]) : w ? s.popStack() : o.match(/^[^\s\t}]/) && s.parseNodePropertyContinued(o);
    }), this.allNodes;
  }
  parseNodeBegin(i, s) {
    const r = s[1].trim().replace(/^"/, "").replace(/"$/, ""), o = s[2].split(",").map(function(m) {
      return m.trim().replace(/^"/, "").replace(/"$/, "");
    }), c = {
      name: r
    }, p2 = this.parseNodeAttr(o), h2 = this.getCurrentNode();
    this.currentIndent === 0 ? this.allNodes.add(r, c) : r in h2 ? (r === "PoseNode" ? h2.PoseNode.push(c) : h2[r].id !== void 0 && (h2[r] = {}, h2[r][h2[r].id] = h2[r]), p2.id !== "" && (h2[r][p2.id] = c)) : typeof p2.id == "number" ? (h2[r] = {}, h2[r][p2.id] = c) : r !== "Properties70" && (r === "PoseNode" ? h2[r] = [c] : h2[r] = c), typeof p2.id == "number" && (c.id = p2.id), p2.name !== "" && (c.attrName = p2.name), p2.type !== "" && (c.attrType = p2.type), this.pushStack(c);
  }
  parseNodeAttr(i) {
    let s = i[0];
    i[0] !== "" && (s = parseInt(i[0]), isNaN(s) && (s = i[0]));
    let r = "", o = "";
    return i.length > 1 && (r = i[1].replace(/^(\w+)::/, ""), o = i[2]), {
      id: s,
      name: r,
      type: o
    };
  }
  parseNodeProperty(i, s, r) {
    let o = s[1].replace(/^"/, "").replace(/"$/, "").trim(), c = s[2].replace(/^"/, "").replace(/"$/, "").trim();
    o === "Content" && c === "," && (c = r.replace(/"/g, "").replace(/,$/, "").trim());
    const p2 = this.getCurrentNode();
    if (p2.name === "Properties70") {
      this.parseNodeSpecialProperty(i, o, c);
      return;
    }
    if (o === "C") {
      const m = c.split(",").slice(1), g = parseInt(m[0]), w = parseInt(m[1]);
      let _2 = c.split(",").slice(3);
      _2 = _2.map(function(y) {
        return y.trim().replace(/^"/, "");
      }), o = "connections", c = [g, w], bh(c, _2), p2[o] === void 0 && (p2[o] = []);
    }
    o === "Node" && (p2.id = c), o in p2 && Array.isArray(p2[o]) ? p2[o].push(c) : o !== "a" ? p2[o] = c : p2.a = c, this.setCurrentProp(p2, o), o === "a" && c.slice(-1) !== "," && (p2.a = oo(c));
  }
  parseNodePropertyContinued(i) {
    const s = this.getCurrentNode();
    s.a += i, i.slice(-1) !== "," && (s.a = oo(s.a));
  }
  // parse "Property70"
  parseNodeSpecialProperty(i, s, r) {
    const o = r.split('",').map(function(w) {
      return w.trim().replace(/^\"/, "").replace(/\s/, "_");
    }), c = o[0], p2 = o[1], h2 = o[2], m = o[3];
    let g = o[4];
    switch (p2) {
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
        g = oo(g);
        break;
    }
    this.getPrevNode()[c] = {
      type: p2,
      type2: h2,
      flag: m,
      value: g
    }, this.setCurrentProp(this.getPrevNode(), c);
  }
};
var hh = class {
  parse(i) {
    const s = new Ea(i);
    s.skip(23);
    const r = s.getUint32();
    if (r < 6400)
      throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + r);
    const o = new Ja();
    for (; !this.endOfContent(s); ) {
      const c = this.parseNode(s, r);
      c !== null && o.add(c.name, c);
    }
    return o;
  }
  // Check if reader has reached the end of content.
  endOfContent(i) {
    return i.size() % 16 === 0 ? (i.getOffset() + 160 + 16 & -16) >= i.size() : i.getOffset() + 160 + 16 >= i.size();
  }
  // recursively parse nodes until the end of the file is reached
  parseNode(i, s) {
    const r = {}, o = s >= 7500 ? i.getUint64() : i.getUint32(), c = s >= 7500 ? i.getUint64() : i.getUint32();
    s >= 7500 ? i.getUint64() : i.getUint32();
    const p2 = i.getUint8(), h2 = i.getString(p2);
    if (o === 0)
      return null;
    const m = [];
    for (let y = 0; y < c; y++)
      m.push(this.parseProperty(i));
    const g = m.length > 0 ? m[0] : "", w = m.length > 1 ? m[1] : "", _2 = m.length > 2 ? m[2] : "";
    for (r.singleProperty = c === 1 && i.getOffset() === o; o > i.getOffset(); ) {
      const y = this.parseNode(i, s);
      y !== null && this.parseSubNode(h2, r, y);
    }
    return r.propertyList = m, typeof g == "number" && (r.id = g), w !== "" && (r.attrName = w), _2 !== "" && (r.attrType = _2), h2 !== "" && (r.name = h2), r;
  }
  parseSubNode(i, s, r) {
    if (r.singleProperty === true) {
      const o = r.propertyList[0];
      Array.isArray(o) ? (s[r.name] = r, r.a = o) : s[r.name] = o;
    } else if (i === "Connections" && r.name === "C") {
      const o = [];
      r.propertyList.forEach(function(c, p2) {
        p2 !== 0 && o.push(c);
      }), s.connections === void 0 && (s.connections = []), s.connections.push(o);
    } else if (r.name === "Properties70")
      Object.keys(r).forEach(function(c) {
        s[c] = r[c];
      });
    else if (i === "Properties70" && r.name === "P") {
      let o = r.propertyList[0], c = r.propertyList[1];
      const p2 = r.propertyList[2], h2 = r.propertyList[3];
      let m;
      o.indexOf("Lcl ") === 0 && (o = o.replace("Lcl ", "Lcl_")), c.indexOf("Lcl ") === 0 && (c = c.replace("Lcl ", "Lcl_")), c === "Color" || c === "ColorRGB" || c === "Vector" || c === "Vector3D" || c.indexOf("Lcl_") === 0 ? m = [r.propertyList[4], r.propertyList[5], r.propertyList[6]] : m = r.propertyList[4], s[o] = {
        type: c,
        type2: p2,
        flag: h2,
        value: m
      };
    } else
      s[r.name] === void 0 ? typeof r.id == "number" ? (s[r.name] = {}, s[r.name][r.id] = r) : s[r.name] = r : r.name === "PoseNode" ? (Array.isArray(s[r.name]) || (s[r.name] = [s[r.name]]), s[r.name].push(r)) : s[r.name][r.id] === void 0 && (s[r.name][r.id] = r);
  }
  parseProperty(i) {
    const s = i.getString(1);
    let r;
    switch (s) {
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
        return r = i.getUint32(), i.getArrayBuffer(r);
      case "S":
        return r = i.getUint32(), i.getString(r);
      case "Y":
        return i.getInt16();
      case "b":
      case "c":
      case "d":
      case "f":
      case "i":
      case "l":
        const o = i.getUint32(), c = i.getUint32(), p2 = i.getUint32();
        if (c === 0)
          switch (s) {
            case "b":
            case "c":
              return i.getBooleanArray(o);
            case "d":
              return i.getFloat64Array(o);
            case "f":
              return i.getFloat32Array(o);
            case "i":
              return i.getInt32Array(o);
            case "l":
              return i.getInt64Array(o);
          }
        const h2 = pp(new Uint8Array(i.getArrayBuffer(p2))), m = new Ea(h2.buffer);
        switch (s) {
          case "b":
          case "c":
            return m.getBooleanArray(o);
          case "d":
            return m.getFloat64Array(o);
          case "f":
            return m.getFloat32Array(o);
          case "i":
            return m.getInt32Array(o);
          case "l":
            return m.getInt64Array(o);
        }
      default:
        throw new Error("THREE.FBXLoader: Unknown property type " + s);
    }
  }
};
var Ea = class {
  constructor(i, s) {
    this.dv = new DataView(i), this.offset = 0, this.littleEndian = s !== void 0 ? s : true;
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
    const s = [];
    for (let r = 0; r < i; r++)
      s.push(this.getBoolean());
    return s;
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
    const s = [];
    for (let r = 0; r < i; r++)
      s.push(this.getInt32());
    return s;
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
    let i, s;
    return this.littleEndian ? (i = this.getUint32(), s = this.getUint32()) : (s = this.getUint32(), i = this.getUint32()), s & 2147483648 ? (s = ~s & 4294967295, i = ~i & 4294967295, i === 4294967295 && (s = s + 1 & 4294967295), i = i + 1 & 4294967295, -(s * 4294967296 + i)) : s * 4294967296 + i;
  }
  getInt64Array(i) {
    const s = [];
    for (let r = 0; r < i; r++)
      s.push(this.getInt64());
    return s;
  }
  // Note: see getInt64() comment
  getUint64() {
    let i, s;
    return this.littleEndian ? (i = this.getUint32(), s = this.getUint32()) : (s = this.getUint32(), i = this.getUint32()), s * 4294967296 + i;
  }
  getFloat32() {
    const i = this.dv.getFloat32(this.offset, this.littleEndian);
    return this.offset += 4, i;
  }
  getFloat32Array(i) {
    const s = [];
    for (let r = 0; r < i; r++)
      s.push(this.getFloat32());
    return s;
  }
  getFloat64() {
    const i = this.dv.getFloat64(this.offset, this.littleEndian);
    return this.offset += 8, i;
  }
  getFloat64Array(i) {
    const s = [];
    for (let r = 0; r < i; r++)
      s.push(this.getFloat64());
    return s;
  }
  getArrayBuffer(i) {
    const s = this.dv.buffer.slice(this.offset, this.offset + i);
    return this.offset += i, s;
  }
  getString(i) {
    let s = [];
    for (let o = 0; o < i; o++)
      s[o] = this.getUint8();
    const r = s.indexOf(0);
    return r >= 0 && (s = s.slice(0, r)), LoaderUtils.decodeText(new Uint8Array(s));
  }
};
var Ja = class {
  add(i, s) {
    this[i] = s;
  }
};
function dh(f) {
  const i = "Kaydara FBX Binary  \0";
  return f.byteLength >= i.length && i === nl(f, 0, i.length);
}
function mh(f) {
  const i = ["K", "a", "y", "d", "a", "r", "a", "\\", "F", "B", "X", "\\", "B", "i", "n", "a", "r", "y", "\\", "\\"];
  let s = 0;
  function r(o) {
    const c = f[o - 1];
    return f = f.slice(s + o), s++, c;
  }
  for (let o = 0; o < i.length; ++o)
    if (r(1) === i[o])
      return false;
  return true;
}
function Ca(f) {
  const i = /FBXVersion: (\d+)/, s = f.match(i);
  if (s)
    return parseInt(s[1]);
  throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.");
}
function fh(f) {
  return f / 46186158e3;
}
var vh = [];
function js(f, i, s, r) {
  let o;
  switch (r.mappingType) {
    case "ByPolygonVertex":
      o = f;
      break;
    case "ByPolygon":
      o = i;
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
  const c = o * r.dataSize, p2 = c + r.dataSize;
  return gh(vh, r.buffer, c, p2);
}
var ro = new Euler();
var hi = new Vector3();
function el(f) {
  const i = new Matrix4(), s = new Matrix4(), r = new Matrix4(), o = new Matrix4(), c = new Matrix4(), p2 = new Matrix4(), h2 = new Matrix4(), m = new Matrix4(), g = new Matrix4(), w = new Matrix4(), _2 = new Matrix4(), y = new Matrix4(), C = f.inheritType ? f.inheritType : 0;
  if (f.translation && i.setPosition(hi.fromArray(f.translation)), f.preRotation) {
    const K2 = f.preRotation.map(MathUtils.degToRad);
    K2.push(f.eulerOrder), s.makeRotationFromEuler(ro.fromArray(K2));
  }
  if (f.rotation) {
    const K2 = f.rotation.map(MathUtils.degToRad);
    K2.push(f.eulerOrder), r.makeRotationFromEuler(ro.fromArray(K2));
  }
  if (f.postRotation) {
    const K2 = f.postRotation.map(MathUtils.degToRad);
    K2.push(f.eulerOrder), o.makeRotationFromEuler(ro.fromArray(K2)), o.invert();
  }
  f.scale && c.scale(hi.fromArray(f.scale)), f.scalingOffset && h2.setPosition(hi.fromArray(f.scalingOffset)), f.scalingPivot && p2.setPosition(hi.fromArray(f.scalingPivot)), f.rotationOffset && m.setPosition(hi.fromArray(f.rotationOffset)), f.rotationPivot && g.setPosition(hi.fromArray(f.rotationPivot)), f.parentMatrixWorld && (_2.copy(f.parentMatrix), w.copy(f.parentMatrixWorld));
  const L = s.clone().multiply(r).multiply(o), S = new Matrix4();
  S.extractRotation(w);
  const R = new Matrix4();
  R.copyPosition(w);
  const O = R.clone().invert().multiply(w), N = S.clone().invert().multiply(O), I2 = c, D2 = new Matrix4();
  if (C === 0)
    D2.copy(S).multiply(L).multiply(N).multiply(I2);
  else if (C === 1)
    D2.copy(S).multiply(N).multiply(L).multiply(I2);
  else {
    const q = new Matrix4().scale(new Vector3().setFromMatrixScale(_2)).clone().invert(), pe = N.clone().multiply(q);
    D2.copy(S).multiply(L).multiply(pe).multiply(I2);
  }
  const Y = g.clone().invert(), G = p2.clone().invert();
  let F = i.clone().multiply(m).multiply(g).multiply(s).multiply(r).multiply(o).multiply(Y).multiply(h2).multiply(p2).multiply(c).multiply(G);
  const B = new Matrix4().copyPosition(F), H2 = w.clone().multiply(B);
  return y.copyPosition(H2), F = y.clone().multiply(D2), F.premultiply(w.invert()), F;
}
function tl(f) {
  f = f || 0;
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
  return f === 6 ? (console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."), i[0]) : i[f];
}
function oo(f) {
  return f.split(",").map(function(s) {
    return parseFloat(s);
  });
}
function nl(f, i, s) {
  return i === void 0 && (i = 0), s === void 0 && (s = f.byteLength), LoaderUtils.decodeText(new Uint8Array(f, i, s));
}
function bh(f, i) {
  for (let s = 0, r = f.length, o = i.length; s < o; s++, r++)
    f[r] = i[s];
}
function gh(f, i, s, r) {
  for (let o = s, c = 0; o < r; o++, c++)
    f[c] = i[o];
  return f;
}
function Pa(f, i, s) {
  return f.slice(0, i).concat(s).concat(f.slice(i));
}
var _h = class extends Loader {
  constructor(i) {
    super(i);
  }
  load(i, s, r, o) {
    const c = new FileLoader(this.manager);
    c.setPath(this.path), c.setRequestHeader(this.requestHeader), c.setWithCredentials(this.withCredentials), c.load(i, (p2) => {
      if (typeof p2 != "string")
        throw new Error("unsupported data type");
      const h2 = JSON.parse(p2), m = this.parse(h2);
      s && s(m);
    }, r, o);
  }
  parse(i) {
    return new ko(i);
  }
};
var ko = class {
  constructor(i) {
    P(this, "data", void 0), this.data = i;
  }
  generateShapes(i, s = 100, r) {
    const o = [], c = {
      letterSpacing: 0,
      lineHeight: 1,
      ...r
    }, p2 = wh(i, s, this.data, c);
    for (let h2 = 0, m = p2.length; h2 < m; h2++)
      Array.prototype.push.apply(o, p2[h2].toShapes(false));
    return o;
  }
};
P(ko, "isFont", void 0);
P(ko, "type", void 0);
function wh(f, i, s, r) {
  const o = Array.from(f), c = i / s.resolution, p2 = (s.boundingBox.yMax - s.boundingBox.yMin + s.underlineThickness) * c, h2 = [];
  let m = 0, g = 0;
  for (let w = 0; w < o.length; w++) {
    const _2 = o[w];
    if (_2 === `
`)
      m = 0, g -= p2 * r.lineHeight;
    else {
      const y = yh(_2, c, m, g, s);
      y && (m += y.offsetX + r.letterSpacing, h2.push(y.path));
    }
  }
  return h2;
}
function yh(f, i, s, r, o) {
  const c = o.glyphs[f] || o.glyphs["?"];
  if (!c) {
    console.error('THREE.Font: character "' + f + '" does not exists in font family ' + o.familyName + ".");
    return;
  }
  const p2 = new ShapePath();
  let h2, m, g, w, _2, y, C, L;
  if (c.o) {
    const S = c._cachedOutline || (c._cachedOutline = c.o.split(" "));
    for (let R = 0, O = S.length; R < O; )
      switch (S[R++]) {
        case "m":
          h2 = parseInt(S[R++]) * i + s, m = parseInt(S[R++]) * i + r, p2.moveTo(h2, m);
          break;
        case "l":
          h2 = parseInt(S[R++]) * i + s, m = parseInt(S[R++]) * i + r, p2.lineTo(h2, m);
          break;
        case "q":
          g = parseInt(S[R++]) * i + s, w = parseInt(S[R++]) * i + r, _2 = parseInt(S[R++]) * i + s, y = parseInt(S[R++]) * i + r, p2.quadraticCurveTo(_2, y, g, w);
          break;
        case "b":
          g = parseInt(S[R++]) * i + s, w = parseInt(S[R++]) * i + r, _2 = parseInt(S[R++]) * i + s, y = parseInt(S[R++]) * i + r, C = parseInt(S[R++]) * i + s, L = parseInt(S[R++]) * i + r, p2.bezierCurveTo(_2, y, C, L, g, w);
          break;
      }
  }
  return {
    offsetX: c.ha * i,
    path: p2
  };
}
var il = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function xh(f) {
  return f && f.__esModule && Object.prototype.hasOwnProperty.call(f, "default") ? f.default : f;
}
var Eh = class extends DataTextureLoader {
  constructor(i) {
    super(i), this.type = HalfFloatType;
  }
  // adapted from http://www.graphics.cornell.edu/~bjw/rgbe.html
  parse(i) {
    const h2 = function(I2, D2) {
      switch (I2) {
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
`, y = function(I2, D2, Y) {
      D2 = D2 || 1024;
      let F = I2.pos, B = -1, H2 = 0, K2 = "", q = String.fromCharCode.apply(null, new Uint16Array(I2.subarray(F, F + 128)));
      for (; 0 > (B = q.indexOf(_2)) && H2 < D2 && F < I2.byteLength; )
        K2 += q, H2 += q.length, F += 128, q += String.fromCharCode.apply(null, new Uint16Array(I2.subarray(F, F + 128)));
      return -1 < B ? (Y !== false && (I2.pos += H2 + B + 1), K2 + q.slice(0, B)) : false;
    }, C = function(I2) {
      const D2 = /^#\?(\S+)/, Y = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, G = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, F = /^\s*FORMAT=(\S+)\s*$/, B = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, H2 = {
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
      let K2, q;
      if (I2.pos >= I2.byteLength || !(K2 = y(I2)))
        return h2(1, "no header found");
      if (!(q = K2.match(D2)))
        return h2(3, "bad initial token");
      for (H2.valid |= 1, H2.programtype = q[1], H2.string += K2 + `
`; K2 = y(I2), K2 !== false; ) {
        if (H2.string += K2 + `
`, K2.charAt(0) === "#") {
          H2.comments += K2 + `
`;
          continue;
        }
        if ((q = K2.match(Y)) && (H2.gamma = parseFloat(q[1])), (q = K2.match(G)) && (H2.exposure = parseFloat(q[1])), (q = K2.match(F)) && (H2.valid |= 2, H2.format = q[1]), (q = K2.match(B)) && (H2.valid |= 4, H2.height = parseInt(q[1], 10), H2.width = parseInt(q[2], 10)), H2.valid & 2 && H2.valid & 4)
          break;
      }
      return H2.valid & 2 ? H2.valid & 4 ? H2 : h2(3, "missing image size specifier") : h2(3, "missing format specifier");
    }, L = function(I2, D2, Y) {
      const G = D2;
      if (
        // run length encoding is not allowed so read flat
        G < 8 || G > 32767 || // this file is not run length encoded
        I2[0] !== 2 || I2[1] !== 2 || I2[2] & 128
      )
        return new Uint8Array(I2);
      if (G !== (I2[2] << 8 | I2[3]))
        return h2(3, "wrong scanline width");
      const F = new Uint8Array(4 * D2 * Y);
      if (!F.length)
        return h2(4, "unable to allocate buffer space");
      let B = 0, H2 = 0;
      const K2 = 4 * G, q = new Uint8Array(4), pe = new Uint8Array(K2);
      let _e = Y;
      for (; _e > 0 && H2 < I2.byteLength; ) {
        if (H2 + 4 > I2.byteLength)
          return h2(1);
        if (q[0] = I2[H2++], q[1] = I2[H2++], q[2] = I2[H2++], q[3] = I2[H2++], q[0] != 2 || q[1] != 2 || (q[2] << 8 | q[3]) != G)
          return h2(3, "bad rgbe scanline format");
        let ce2 = 0, me;
        for (; ce2 < K2 && H2 < I2.byteLength; ) {
          me = I2[H2++];
          const ee = me > 128;
          if (ee && (me -= 128), me === 0 || ce2 + me > K2)
            return h2(3, "bad scanline data");
          if (ee) {
            const X2 = I2[H2++];
            for (let Se2 = 0; Se2 < me; Se2++)
              pe[ce2++] = X2;
          } else
            pe.set(I2.subarray(H2, H2 + me), ce2), ce2 += me, H2 += me;
        }
        const he = G;
        for (let ee = 0; ee < he; ee++) {
          let X2 = 0;
          F[B] = pe[ee + X2], X2 += G, F[B + 1] = pe[ee + X2], X2 += G, F[B + 2] = pe[ee + X2], X2 += G, F[B + 3] = pe[ee + X2], B += 4;
        }
        _e--;
      }
      return F;
    }, S = function(I2, D2, Y, G) {
      const F = I2[D2 + 3], B = Math.pow(2, F - 128) / 255;
      Y[G + 0] = I2[D2 + 0] * B, Y[G + 1] = I2[D2 + 1] * B, Y[G + 2] = I2[D2 + 2] * B, Y[G + 3] = 1;
    }, R = function(I2, D2, Y, G) {
      const F = I2[D2 + 3], B = Math.pow(2, F - 128) / 255;
      Y[G + 0] = DataUtils.toHalfFloat(Math.min(I2[D2 + 0] * B, 65504)), Y[G + 1] = DataUtils.toHalfFloat(Math.min(I2[D2 + 1] * B, 65504)), Y[G + 2] = DataUtils.toHalfFloat(Math.min(I2[D2 + 2] * B, 65504)), Y[G + 3] = DataUtils.toHalfFloat(1);
    }, O = new Uint8Array(i);
    O.pos = 0;
    const N = C(O);
    if (N !== -1) {
      const I2 = N.width, D2 = N.height, Y = L(O.subarray(O.pos), I2, D2);
      if (Y !== -1) {
        let G, F, B;
        switch (this.type) {
          case FloatType:
            B = Y.length / 4;
            const H2 = new Float32Array(B * 4);
            for (let q = 0; q < B; q++)
              S(Y, q * 4, H2, q * 4);
            G = H2, F = FloatType;
            break;
          case HalfFloatType:
            B = Y.length / 4;
            const K2 = new Uint16Array(B * 4);
            for (let q = 0; q < B; q++)
              R(Y, q * 4, K2, q * 4);
            G = K2, F = HalfFloatType;
            break;
          default:
            console.error("THREE.RGBELoader: unsupported type: ", this.type);
            break;
        }
        return {
          width: I2,
          height: D2,
          data: G,
          header: N.string,
          gamma: N.gamma,
          exposure: N.exposure,
          type: F
        };
      }
    }
    return null;
  }
  setDataType(i) {
    return this.type = i, this;
  }
  load(i, s, r, o) {
    function c(p2, h2) {
      switch (p2.type) {
        case FloatType:
        case HalfFloatType:
          p2.encoding = LinearEncoding, p2.minFilter = LinearFilter, p2.magFilter = LinearFilter, p2.generateMipmaps = false, p2.flipY = true;
          break;
      }
      s && s(p2, h2);
    }
    return super.load(i, c, r, o);
  }
};
var ao = /* @__PURE__ */ new WeakMap();
var Ch = class extends Loader {
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
  load(i, s, r, o) {
    const c = new FileLoader(this.manager);
    c.setPath(this.path), c.setResponseType("arraybuffer"), c.setRequestHeader(this.requestHeader), c.setWithCredentials(this.withCredentials), c.load(i, (p2) => {
      const h2 = {
        attributeIDs: this.defaultAttributeIDs,
        attributeTypes: this.defaultAttributeTypes,
        useUniqueIDs: false
      };
      this.decodeGeometry(p2, h2).then(s).catch(o);
    }, r, o);
  }
  /** @deprecated Kept for backward-compatibility with previous DRACOLoader versions. */
  decodeDracoFile(i, s, r, o) {
    const c = {
      attributeIDs: r || this.defaultAttributeIDs,
      attributeTypes: o || this.defaultAttributeTypes,
      useUniqueIDs: !!r
    };
    this.decodeGeometry(i, c).then(s);
  }
  decodeGeometry(i, s) {
    for (const m in s.attributeTypes) {
      const g = s.attributeTypes[m];
      g.BYTES_PER_ELEMENT !== void 0 && (s.attributeTypes[m] = g.name);
    }
    const r = JSON.stringify(s);
    if (ao.has(i)) {
      const m = ao.get(i);
      if (m.key === r)
        return m.promise;
      if (i.byteLength === 0)
        throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.");
    }
    let o;
    const c = this.workerNextTaskID++, p2 = i.byteLength, h2 = this._getWorker(c, p2).then((m) => (o = m, new Promise((g, w) => {
      o._callbacks[c] = {
        resolve: g,
        reject: w
      }, o.postMessage({
        type: "decode",
        id: c,
        taskConfig: s,
        buffer: i
      }, [i]);
    }))).then((m) => this._createGeometry(m.geometry));
    return h2.catch(() => true).then(() => {
      o && c && this._releaseTask(o, c);
    }), ao.set(i, {
      key: r,
      promise: h2
    }), h2;
  }
  _createGeometry(i) {
    const s = new BufferGeometry();
    i.index && s.setIndex(new BufferAttribute(i.index.array, 1));
    for (let r = 0; r < i.attributes.length; r++) {
      const o = i.attributes[r], c = o.name, p2 = o.array, h2 = o.itemSize;
      s.setAttribute(c, new BufferAttribute(p2, h2));
    }
    return s;
  }
  _loadLibrary(i, s) {
    const r = new FileLoader(this.manager);
    return r.setPath(this.decoderPath), r.setResponseType(s), r.setWithCredentials(this.withCredentials), new Promise((o, c) => {
      r.load(i, o, void 0, c);
    });
  }
  preload() {
    return this._initDecoder(), this;
  }
  _initDecoder() {
    if (this.decoderPending)
      return this.decoderPending;
    const i = typeof WebAssembly != "object" || this.decoderConfig.type === "js", s = [];
    return i ? s.push(this._loadLibrary("draco_decoder.js", "text")) : (s.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), s.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(s).then((r) => {
      const o = r[0];
      i || (this.decoderConfig.wasmBinary = r[1]);
      const c = Ph.toString(), p2 = ["/* draco decoder */", o, "", "/* worker */", c.substring(c.indexOf("{") + 1, c.lastIndexOf("}"))].join(`
`);
      this.workerSourceURL = URL.createObjectURL(new Blob([p2]));
    }), this.decoderPending;
  }
  _getWorker(i, s) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const o = new Worker(this.workerSourceURL);
        o._callbacks = {}, o._taskCosts = {}, o._taskLoad = 0, o.postMessage({
          type: "init",
          decoderConfig: this.decoderConfig
        }), o.onmessage = function(c) {
          const p2 = c.data;
          switch (p2.type) {
            case "decode":
              o._callbacks[p2.id].resolve(p2);
              break;
            case "error":
              o._callbacks[p2.id].reject(p2);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + p2.type + '"');
          }
        }, this.workerPool.push(o);
      } else
        this.workerPool.sort(function(o, c) {
          return o._taskLoad > c._taskLoad ? -1 : 1;
        });
      const r = this.workerPool[this.workerPool.length - 1];
      return r._taskCosts[i] = s, r._taskLoad += s, r;
    });
  }
  _releaseTask(i, s) {
    i._taskLoad -= i._taskCosts[s], delete i._callbacks[s], delete i._taskCosts[s];
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
function Ph() {
  let f, i;
  onmessage = function(p2) {
    const h2 = p2.data;
    switch (h2.type) {
      case "init":
        f = h2.decoderConfig, i = new Promise(function(w) {
          f.onModuleLoaded = function(_2) {
            w({
              draco: _2
            });
          }, DracoDecoderModule(f);
        });
        break;
      case "decode":
        const m = h2.buffer, g = h2.taskConfig;
        i.then((w) => {
          const _2 = w.draco, y = new _2.Decoder(), C = new _2.DecoderBuffer();
          C.Init(new Int8Array(m), m.byteLength);
          try {
            const L = s(_2, y, C, g), S = L.attributes.map((R) => R.array.buffer);
            L.index && S.push(L.index.array.buffer), self.postMessage({
              type: "decode",
              id: h2.id,
              geometry: L
            }, S);
          } catch (L) {
            console.error(L), self.postMessage({
              type: "error",
              id: h2.id,
              error: L.message
            });
          } finally {
            _2.destroy(C), _2.destroy(y);
          }
        });
        break;
    }
  };
  function s(p2, h2, m, g) {
    const w = g.attributeIDs, _2 = g.attributeTypes;
    let y, C;
    const L = h2.GetEncodedGeometryType(m);
    if (L === p2.TRIANGULAR_MESH)
      y = new p2.Mesh(), C = h2.DecodeBufferToMesh(m, y);
    else if (L === p2.POINT_CLOUD)
      y = new p2.PointCloud(), C = h2.DecodeBufferToPointCloud(m, y);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!C.ok() || y.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + C.error_msg());
    const S = {
      index: null,
      attributes: []
    };
    for (const R in w) {
      const O = self[_2[R]];
      let N, I2;
      if (g.useUniqueIDs)
        I2 = w[R], N = h2.GetAttributeByUniqueId(y, I2);
      else {
        if (I2 = h2.GetAttributeId(y, p2[w[R]]), I2 === -1)
          continue;
        N = h2.GetAttribute(y, I2);
      }
      S.attributes.push(o(p2, h2, y, R, O, N));
    }
    return L === p2.TRIANGULAR_MESH && (S.index = r(p2, h2, y)), p2.destroy(y), S;
  }
  function r(p2, h2, m) {
    const w = m.num_faces() * 3, _2 = w * 4, y = p2._malloc(_2);
    h2.GetTrianglesUInt32Array(m, _2, y);
    const C = new Uint32Array(p2.HEAPF32.buffer, y, w).slice();
    return p2._free(y), {
      array: C,
      itemSize: 1
    };
  }
  function o(p2, h2, m, g, w, _2) {
    const y = _2.num_components(), L = m.num_points() * y, S = L * w.BYTES_PER_ELEMENT, R = c(p2, w), O = p2._malloc(S);
    h2.GetAttributeDataArrayForAllPoints(m, _2, R, S, O);
    const N = new w(p2.HEAPF32.buffer, O, L).slice();
    return p2._free(O), {
      name: g,
      array: N,
      itemSize: y
    };
  }
  function c(p2, h2) {
    switch (h2) {
      case Float32Array:
        return p2.DT_FLOAT32;
      case Int8Array:
        return p2.DT_INT8;
      case Int16Array:
        return p2.DT_INT16;
      case Int32Array:
        return p2.DT_INT32;
      case Uint8Array:
        return p2.DT_UINT8;
      case Uint16Array:
        return p2.DT_UINT16;
      case Uint32Array:
        return p2.DT_UINT32;
    }
  }
}
function Ut() {
  const { state: f, setState: i } = inject("useTres", _()), s = inject("extend") || (() => {
  });
  return {
    state: f,
    setState: i,
    extend: s
  };
}
var Th = ["args", "center"];
var Dd = defineComponent({
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
    center: { type: Boolean, default: false },
    needUpdates: { type: Boolean, default: false }
  },
  async setup(f, { expose: i }) {
    let s, r;
    const o = f, { extend: c } = Ut();
    c({ TextGeometry: ya });
    const p2 = new _h(), h2 = useSlots(), m = computed(() => {
      var y;
      return o.text ? o.text : h2.default ? (y = h2.default()[0].children) == null ? void 0 : y.trim() : o.needUpdates ? "" : "TresJS";
    }), g = shallowRef();
    i({
      value: g
    });
    const w = ([s, r] = withAsyncContext(() => new Promise((y, C) => {
      try {
        typeof o.font == "string" ? p2.load(o.font, (L) => {
          y(L);
        }) : y(o.font);
      } catch (L) {
        C(console.error("cientos", L));
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
    return watchEffect(() => {
      g.value && o.needUpdates && (g.value.geometry.dispose(), g.value.geometry = new ya(m.value, _2.value), o.center && g.value.geometry.center());
    }), (y, C) => unref(w) ? (openBlock(), createElementBlock("TresMesh", {
      key: 0,
      ref_key: "text3DRef",
      ref: g
    }, [
      unref(m) ? (openBlock(), createElementBlock("TresTextGeometry", {
        key: 0,
        args: [unref(m), unref(_2)],
        center: f.center
      }, null, 8, Th)) : createCommentVNode("", true),
      renderSlot(y.$slots, "default")
    ], 512)) : createCommentVNode("", true);
  }
});
function Od(f, i) {
  const s = ref(i), r = new AnimationMixer(s.value), o = shallowReactive({});
  f.forEach((p2) => {
    const h2 = r.clipAction(p2, s.value);
    o[p2.name] = h2;
  });
  const { onLoop: c } = Pe();
  return c(({ delta: p2 }) => {
    r.update(p2);
  }), {
    actions: o,
    mixer: r
  };
}
var lo = {
  sunset: "venice/venice_sunset_4k.hdr"
};
async function kh({
  files: f = ["/px.png", "/nx.png", "/py.png", "/ny.png", "/pz.png", "/nz.png"],
  blur: i = 0,
  background: s = false,
  path: r = "/",
  preset: o = void 0
}) {
  const { state: c } = Ut();
  if (o) {
    if (!(o in lo))
      throw new Error("Preset must be one of: " + Object.keys(lo).join(", "));
    f = lo[o], r = "https://raw.githubusercontent.com/Tresjs/assets/main/textures/hdr/";
  }
  const p2 = Array.isArray(f), m = await Rt(
    p2 ? CubeTextureLoader : Eh,
    p2 ? [f] : f,
    (w) => {
      r && w.setPath(r);
    }
  ), g = p2 ? m[0] : m;
  return g && (g.mapping = p2 ? CubeReflectionMapping : EquirectangularReflectionMapping, g.colorSpace = SRGBColorSpace), c.scene && (c.scene.environment = g, s !== void 0 && (c.scene.background = g), i && (c.scene.backgroundBlurriness = i | 0)), g;
}
var Nd = defineComponent({
  name: "Environment",
  props: ["background", "blur", "files", "encoding", "path", "preset"],
  async setup(f, { expose: i }) {
    let s = null;
    return i({ getTexture: () => s }), s = await kh(f), () => {
    };
  }
});
function sl(f) {
  return getCurrentScope() ? (onScopeDispose(f), true) : false;
}
function rl(f) {
  return typeof f == "function" ? f() : unref(f);
}
var Ah = typeof window < "u";
var ol = () => {
};
function Mh(...f) {
  if (f.length !== 1)
    return toRef(...f);
  const i = f[0];
  return typeof i == "function" ? readonly(customRef(() => ({ get: i, set: ol }))) : ref(i);
}
function Sh(f, i = true) {
  getCurrentInstance() ? onMounted(f) : i ? f() : nextTick(f);
}
function Lh(f) {
  var i;
  const s = rl(f);
  return (i = s == null ? void 0 : s.$el) != null ? i : s;
}
var Ys = Ah ? window : void 0;
function Bn(...f) {
  let i, s, r, o;
  if (typeof f[0] == "string" || Array.isArray(f[0]) ? ([s, r, o] = f, i = Ys) : [i, s, r, o] = f, !i)
    return ol;
  Array.isArray(s) || (s = [s]), Array.isArray(r) || (r = [r]);
  const c = [], p2 = () => {
    c.forEach((w) => w()), c.length = 0;
  }, h2 = (w, _2, y, C) => (w.addEventListener(_2, y, C), () => w.removeEventListener(_2, y, C)), m = watch(
    () => [Lh(i), rl(o)],
    ([w, _2]) => {
      p2(), w && c.push(
        ...s.flatMap((y) => r.map((C) => h2(w, y, C, _2)))
      );
    },
    { immediate: true, flush: "post" }
  ), g = () => {
    m(), p2();
  };
  return sl(g), g;
}
function Rh() {
  const f = ref(false);
  return getCurrentInstance() && onMounted(() => {
    f.value = true;
  }), f;
}
function Vh(f) {
  const i = Rh();
  return computed(() => (i.value, !!f()));
}
function Ih(f, i = {}) {
  const { window: s = Ys } = i, r = Vh(() => s && "matchMedia" in s && typeof s.matchMedia == "function");
  let o;
  const c = ref(false), p2 = () => {
    o && ("removeEventListener" in o ? o.removeEventListener("change", h2) : o.removeListener(h2));
  }, h2 = () => {
    r.value && (p2(), o = s.matchMedia(Mh(f).value), c.value = !!(o != null && o.matches), o && ("addEventListener" in o ? o.addEventListener("change", h2) : o.addListener(h2)));
  };
  return watchEffect(h2), sl(() => p2()), c;
}
var Dh = {
  page: (f) => [f.pageX, f.pageY],
  client: (f) => [f.clientX, f.clientY],
  screen: (f) => [f.screenX, f.screenY],
  movement: (f) => f instanceof Touch ? null : [f.movementX, f.movementY]
};
function Oh(f = {}) {
  const {
    type: i = "page",
    touch: s = true,
    resetOnTouchEnds: r = false,
    initialValue: o = { x: 0, y: 0 },
    window: c = Ys,
    target: p2 = c,
    eventFilter: h2
  } = f, m = ref(o.x), g = ref(o.y), w = ref(null), _2 = typeof i == "function" ? i : Dh[i], y = (O) => {
    const N = _2(O);
    N && ([m.value, g.value] = N, w.value = "mouse");
  }, C = (O) => {
    if (O.touches.length > 0) {
      const N = _2(O.touches[0]);
      N && ([m.value, g.value] = N, w.value = "touch");
    }
  }, L = () => {
    m.value = o.x, g.value = o.y;
  }, S = h2 ? (O) => h2(() => y(O), {}) : (O) => y(O), R = h2 ? (O) => h2(() => C(O), {}) : (O) => C(O);
  return p2 && (Bn(p2, "mousemove", S, { passive: true }), Bn(p2, "dragover", S, { passive: true }), s && i !== "movement" && (Bn(p2, "touchstart", R, { passive: true }), Bn(p2, "touchmove", R, { passive: true }), r && Bn(p2, "touchend", L, { passive: true }))), {
    x: m,
    y: g,
    sourceType: w
  };
}
function Nh(f = {}) {
  const {
    window: i = Ys,
    initialWidth: s = 1 / 0,
    initialHeight: r = 1 / 0,
    listenOrientation: o = true,
    includeScrollbar: c = true
  } = f, p2 = ref(s), h2 = ref(r), m = () => {
    i && (c ? (p2.value = i.innerWidth, h2.value = i.innerHeight) : (p2.value = i.document.documentElement.clientWidth, h2.value = i.document.documentElement.clientHeight));
  };
  if (m(), Sh(m), Bn("resize", m, { passive: true }), o) {
    const g = Ih("(orientation: portrait)");
    watch(g, () => m());
  }
  return { width: p2, height: h2 };
}
function Bh(f = false, i = 5, s) {
  const { x: r, y: o } = Oh(), { logWarning: c } = I(), { width: p2, height: h2 } = Nh(), m = computed(() => (r.value / p2.value - 0.5) * i), g = computed(() => -(o.value / h2.value - 0.5) * i);
  if (s) {
    const { x: w, y: _2 } = s.position;
    watchEffect(() => {
      f || s && (s.position.x = w + m.value, s.position.y = _2 + g.value);
    });
  } else
    c("Scene must contain a Camera component to use this composable");
}
var Bd = defineComponent({
  name: "PamCameraMouse",
  props: ["disabled", "factor"],
  setup(f) {
    const { state: i } = Ut();
    return watchEffect(() => {
      if (i != null && i.camera) {
        const s = i == null ? void 0 : i.camera;
        Bh(f.disabled, f.factor, s);
      }
    }), () => {
    };
  }
});
var Fh = ["position", "a-scale"];
var Fd = defineComponent({
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
  setup(f, { expose: i }) {
    const s = f;
    let r = s.radius + s.depth;
    const o = s.depth / s.count, c = [], p2 = Array.from({ length: s.count }, () => (0.5 + 0.5 * Math.random()) * s.factor), h2 = (y) => new Vector3().setFromSpherical(new Spherical(y, Math.acos(1 - Math.random() * 2), Math.random() * 2 * Math.PI));
    for (let y = 0; y < s.count; y++)
      r -= o * Math.random(), c.push(...h2(r).toArray());
    const m = new Float32Array(c), g = new Float32Array(p2), w = computed(() => ({
      size: s.size,
      sizeAttenuation: s.sizeAttenuation,
      transparent: s.transparent,
      alphaTest: s.alphaTest,
      alphaMap: s.alphaMap
    })), _2 = shallowRef();
    return i({
      value: _2
    }), (y, C) => (openBlock(), createElementBlock("TresPoints", {
      ref_key: "starsRef",
      ref: _2
    }, [
      createBaseVNode("TresBufferGeometry", {
        position: [unref(m), 3],
        "a-scale": [unref(g), 1]
      }, null, 8, Fh),
      createBaseVNode("TresPointsMaterial", normalizeProps(guardReactiveProps(unref(w))), null, 16)
    ], 512));
  }
});
var jh = ["position"];
var zh = ["position"];
var Uh = ["scale"];
var Gh = ["map", "map-encoding", "depth-test", "color", "opacity"];
var jd = defineComponent({
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
  async setup(f, { expose: i }) {
    let s, r;
    const o = f, c = shallowRef(), p2 = shallowRef();
    i({
      value: c
    });
    const h2 = [...new Array(o.segments)].map((C, L) => ({
      x: o.width / 2 - Math.random() * o.width,
      y: o.width / 2 - Math.random() * o.width,
      scale: 0.4 + Math.sin((L + 1) / o.segments * Math.PI) * ((0.2 + Math.random()) * 10),
      density: Math.max(0.2, Math.random()),
      rotation: Math.max(2e-3, 5e-3 * Math.random()) * o.speed
    })), m = (C, L) => C / 6 * L * o.opacity, { map: g } = ([s, r] = withAsyncContext(() => Et({ map: o.texture })), s = await s, r(), s), { state: w } = Ut(), _2 = computed(() => {
      var C;
      return (C = w.renderer) == null ? void 0 : C.outputColorSpace;
    }), { onLoop: y } = Pe();
    return y(() => {
      var C, L;
      c.value && w.camera && p2.value && ((C = p2.value) == null || C.children.forEach((S, R) => {
        S.rotation.z += h2[R].rotation;
      }), c.value.lookAt((L = w.camera) == null ? void 0 : L.position));
    }), (C, L) => (openBlock(), createElementBlock("TresGroup", mergeProps({
      ref_key: "smokeRef",
      ref: c
    }, C.$attrs), [
      createBaseVNode("TresGroup", {
        ref_key: "groupRef",
        ref: p2,
        position: [0, 0, f.segments / 2 * f.depth]
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(h2), ({ scale: S, x: R, y: O, density: N }, I2) => (openBlock(), createElementBlock("TresMesh", {
          key: I2,
          position: [R, O, -I2 * f.depth]
        }, [
          createBaseVNode("TresPlaneGeometry", {
            scale: [S, S, S],
            rotation: [0, 0, 0]
          }, null, 8, Uh),
          createBaseVNode("TresMeshStandardMaterial", {
            map: unref(g),
            "map-encoding": unref(_2),
            "depth-test": f.depthTest,
            color: f.color,
            "depth-write": false,
            transparent: "",
            opacity: m(S, N)
          }, null, 8, Gh)
        ], 8, zh))), 128))
      ], 8, jh)
    ], 16));
  }
});
var zd = defineComponent({
  __name: "Levioso",
  props: {
    speed: { default: 1 },
    rotationFactor: { default: 1 },
    floatFactor: { default: 1 },
    range: { default: () => [-0.1, 0.1] }
  },
  setup(f, { expose: i }) {
    const s = f, r = shallowRef();
    i({
      value: r
    });
    const { onLoop: o } = Pe(), c = ref(Math.random() * 1e4);
    return o(({ elapsed: p2 }) => {
      var g, w;
      if (!r.value)
        return;
      const h2 = c.value + p2;
      r.value.rotation.x = Math.cos(h2 / 4 * s.speed) / 8 * s.rotationFactor, r.value.rotation.y = Math.sin(h2 / 4 * s.speed) / 8 * s.rotationFactor, r.value.rotation.z = Math.sin(h2 / 4 * s.speed) / 20 * s.rotationFactor;
      let m = Math.sin(h2 / 4 * s.speed) / 10;
      m = MathUtils.mapLinear(m, -0.1, 0.1, ((g = s.range) == null ? void 0 : g[0]) ?? -0.1, ((w = s.range) == null ? void 0 : w[1]) ?? 0.1), r.value.position.y = m * s.floatFactor;
    }), (p2, h2) => (openBlock(), createElementBlock("TresGroup", mergeProps(p2.$attrs, {
      ref_key: "groupRef",
      ref: r
    }), [
      renderSlot(p2.$slots, "default")
    ], 16));
  }
});
var zs = null;
function Hh(f, i) {
  return (s) => {
    i && i(s), f.draco && (zs || (zs = new Ch()), zs.setDecoderPath(f.decoderPath || "https://www.gstatic.com/draco/versioned/decoders/1.4.3/"), s.setDRACOLoader(zs));
  };
}
async function Kh(f, i = {
  draco: false
}, s) {
  return await Rt(xp, f, Hh(i, s));
}
var Ud = defineComponent({
  __name: "component",
  props: {
    path: null,
    draco: { type: Boolean, default: false },
    decoderPath: { default: "https://www.gstatic.com/draco/versioned/decoders/1.4.1/" }
  },
  async setup(f, { expose: i }) {
    let s, r;
    const o = f, c = ref();
    i({
      value: c
    });
    const { scene: p2 } = ([s, r] = withAsyncContext(() => Kh(o.path, { draco: o.draco, decoderPath: o.decoderPath })), s = await s, r(), s);
    return (h2, m) => {
      const g = resolveComponent("primitive");
      return openBlock(), createBlock(g, mergeProps({
        ref_key: "modelRef",
        ref: c,
        object: unref(p2)
      }, h2.$attrs), null, 16, ["object"]);
    };
  }
});
async function $h(f) {
  return await Rt(ah, f);
}
var Gd = defineComponent({
  __name: "component",
  props: {
    path: null
  },
  async setup(f, { expose: i }) {
    let s, r;
    const o = f, c = ref();
    i({
      value: c
    });
    const p2 = ([s, r] = withAsyncContext(() => $h(o.path)), s = await s, r(), s);
    return (h2, m) => {
      const g = resolveComponent("primitive");
      return openBlock(), createBlock(g, mergeProps({
        ref_key: "modelRef",
        ref: c,
        object: unref(p2)
      }, h2.$attrs), null, 16, ["object"]);
    };
  }
});
var Xh = ["args"];
var Hd = defineComponent({
  __name: "OrbitControls",
  props: {
    makeDefault: { type: Boolean, default: false },
    camera: null,
    domElement: null,
    target: null,
    enableDamping: { type: Boolean }
  },
  setup(f) {
    const i = f, { state: s, setState: r, extend: o } = Ut(), c = ref(null);
    return o({ OrbitControls: qa }), watch(c, (p2) => {
      p2 && i.makeDefault ? r("controls", p2) : r("controls", null);
    }), (p2, h2) => {
      var m;
      return unref(s).camera && unref(s).renderer ? (openBlock(), createElementBlock("TresOrbitControls", {
        key: 0,
        ref_key: "controls",
        ref: c,
        args: [unref(s).camera || f.camera, ((m = unref(s).renderer) == null ? void 0 : m.domElement) || f.domElement]
      }, null, 8, Xh)) : createCommentVNode("", true);
    };
  }
});
function Yh(f, i) {
  const s = {};
  for (const r of i)
    Object.prototype.hasOwnProperty.call(f, r) && (s[r] = f[r]);
  return s;
}
function qh(f, i) {
  const s = `set${i[0].toUpperCase()}${i.slice(1)}`;
  return f[s] !== void 0;
}
var Kd = defineComponent({
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
  setup(f, { emit: i }) {
    const s = f;
    let r = shallowRef();
    const { state: o } = Ut(), c = computed(
      () => Yh(s, [
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
    ), p2 = () => i("change", r.value), h2 = () => i("mouseDown", r.value), m = () => i("mouseUp", r.value), g = () => i("objectChange", r.value), w = (y) => {
      o.controls && (o.controls.enabled = !y.value), i("dragging", y.value);
    };
    function _2(y) {
      y.addEventListener("dragging-changed", w), y.addEventListener("change", p2), y.addEventListener("mouseDown", h2), y.addEventListener("mouseUp", m), y.addEventListener("objectChange", g);
    }
    return watchEffect(() => {
      o.camera && o.renderer && o.scene && s.object && (r.value = new mp(o.camera, o.renderer.domElement), r.value.attach(s.object), o.scene.add(r.value), _2(r.value));
    }), watch(
      [c, r],
      // TODO: properly type this
      ([y, C]) => {
        if (y && C)
          for (const L in y)
            if (!qh(C, L))
              C[L] = y[L];
            else {
              const S = `set${L[0].toUpperCase()}${L.slice(1)}`;
              typeof C[S] == "function" && y[L] !== void 0 && C[S](y[L]);
            }
      },
      {
        immediate: true
      }
    ), onUnmounted(() => {
      r.value && (r.value.removeEventListener("dragging-changed", w), r.value.removeEventListener("change", p2), r.value.removeEventListener("mouseDown", h2), r.value.removeEventListener("mouseUp", m), r.value.removeEventListener("objectChange", g));
    }), (y, C) => renderSlot(y.$slots, "default");
  }
});
var Qh = ["args"];
var $d = defineComponent({
  __name: "PointerLockControls",
  props: {
    makeDefault: { type: Boolean, default: false },
    camera: null,
    domElement: null,
    selector: null
  },
  setup(f, { expose: i }) {
    const s = f, { state: r, setState: o, extend: c } = Ut(), p2 = ref(null);
    let h2;
    return c({ PointerLockControls: wp }), watch(p2, (m) => {
      var w;
      m && s.makeDefault ? o("controls", m) : o("controls", null);
      const g = document.getElementById(s.selector || "");
      h2 = g || ((w = r.renderer) == null ? void 0 : w.domElement), Bn(h2, "click", () => {
        var _2;
        (_2 = p2.value) == null || _2.lock();
      });
    }), i({
      value: p2
    }), (m, g) => {
      var w;
      return unref(r).camera && unref(r).renderer ? (openBlock(), createElementBlock("TresPointerLockControls", {
        key: 0,
        ref_key: "controls",
        ref: p2,
        args: [unref(r).camera || f.camera, ((w = unref(r).renderer) == null ? void 0 : w.domElement) || f.domElement]
      }, null, 8, Qh)) : createCommentVNode("", true);
    };
  }
});
var Zh = ["args"];
var Xd = defineComponent({
  __name: "MapControls",
  props: {
    makeDefault: { type: Boolean, default: false },
    camera: null,
    domElement: null
  },
  setup(f) {
    const i = f, { state: s, setState: r, extend: o } = Ut(), c = ref(null);
    return o({ MapControls: yp }), watch(c, (p2) => {
      p2 && i.makeDefault ? r("controls", p2) : r("controls", null);
    }), (p2, h2) => {
      var m;
      return unref(s).camera && unref(s).renderer ? (openBlock(), createElementBlock("TresMapControls", {
        key: 0,
        ref_key: "controls",
        ref: c,
        args: [unref(s).camera || f.camera, ((m = unref(s).renderer) == null ? void 0 : m.domElement) || f.domElement]
      }, null, 8, Zh)) : createCommentVNode("", true);
    };
  }
});
var Wh = class extends MeshStandardMaterial {
  constructor(s = {}) {
    super(s);
    Zr(this, "_time");
    Zr(this, "_factor");
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
var Jh = ["factor"];
var Yd = defineComponent({
  __name: "index",
  props: {
    speed: { default: 1 },
    factor: { default: 1 }
  },
  setup(f) {
    const i = f, s = shallowRef(), { extend: r } = Ut();
    r({ MeshWobbleMaterial: Wh });
    const { onLoop: o } = Pe();
    return o(({ elapsed: c }) => {
      s.value && (s.value.time = c * (i == null ? void 0 : i.speed));
    }), (c, p2) => (openBlock(), createElementBlock("TresMeshWobbleMaterial", mergeProps({
      ref_key: "materialRef",
      ref: s,
      factor: f.factor
    }, c.$attrs), null, 16, Jh));
  }
});
var ed = ["args"];
var td = ["color"];
var qd = defineComponent({
  __name: "Box",
  props: {
    args: { default: () => [1, 1, 1] },
    color: { default: "0xffffff" }
  },
  setup(f, { expose: i }) {
    const s = shallowRef();
    return i({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "boxRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresBoxGeometry", { args: f.args }, null, 8, ed),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: f.color }, null, 8, td)
      ])
    ], 16));
  }
});
var nd = ["args"];
var id = ["color"];
var Qd = defineComponent({
  __name: "Circle",
  props: {
    args: { default: () => [1, 32, 0, Math.PI * 2] },
    color: { default: "0xffffff" }
  },
  setup(f, { expose: i }) {
    const s = shallowRef();
    return i({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "circleRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresCircleGeometry", { args: f.args }, null, 8, nd),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: f.color }, null, 8, id)
      ])
    ], 16));
  }
});
var sd = ["args"];
var rd = ["color"];
var Zd = defineComponent({
  __name: "Cone",
  props: {
    args: { default: () => [1, 1, 12, false, 0, Math.PI * 2] },
    color: { default: "0xffffff" }
  },
  setup(f, { expose: i }) {
    const s = shallowRef();
    return i({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "coneRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresConeGeometry", { args: f.args }, null, 8, sd),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: f.color }, null, 8, rd)
      ])
    ], 16));
  }
});
var od = ["args"];
var ad = ["color"];
var Wd = defineComponent({
  __name: "Dodecahedron",
  props: {
    args: { default: () => [1, 0] },
    color: { default: "0xffffff" }
  },
  setup(f, { expose: i }) {
    const s = shallowRef();
    return i({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "dodecahedronRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresDodecahedronGeometry", { args: f.args }, null, 8, od),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: f.color }, null, 8, ad)
      ])
    ], 16));
  }
});
var ld = ["args"];
var cd = ["color"];
var Jd = defineComponent({
  __name: "Icosahedron",
  props: {
    args: { default: () => [1, 0] },
    color: { default: "0xffffff" }
  },
  setup(f, { expose: i }) {
    const s = shallowRef();
    return i({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "icosahedronRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresIcosahedronGeometry", { args: f.args }, null, 8, ld),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: f.color }, null, 8, cd)
      ])
    ], 16));
  }
});
var ud = ["args"];
var pd = ["color"];
var em = defineComponent({
  __name: "Octahedron",
  props: {
    args: { default: () => [1, 0] },
    color: { default: "0xffffff" }
  },
  setup(f, { expose: i }) {
    const s = shallowRef();
    return i({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "octahedronRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresOctahedronGeometry", { args: f.args }, null, 8, ud),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: f.color }, null, 8, pd)
      ])
    ], 16));
  }
});
var hd = ["rotation"];
var dd = ["args"];
var md = ["color"];
var tm = defineComponent({
  __name: "Plane",
  props: {
    args: { default: () => [1, 1] },
    color: { default: "0xffffff" }
  },
  setup(f, { expose: i }) {
    const s = shallowRef();
    return i({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "planeRef",
      ref: s,
      rotation: [-Math.PI / 2, 0, 0]
    }, r.$attrs), [
      createBaseVNode("TresPlaneGeometry", { args: f.args }, null, 8, dd),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: f.color }, null, 8, md)
      ])
    ], 16, hd));
  }
});
var fd = ["args"];
var vd = ["color"];
var nm = defineComponent({
  __name: "Ring",
  props: {
    args: { default: () => [0.5, 1, 32] },
    color: { default: "0xffffff" }
  },
  setup(f, { expose: i }) {
    const s = shallowRef();
    return i({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "ringRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresRingGeometry", { args: f.args }, null, 8, fd),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: f.color }, null, 8, vd)
      ])
    ], 16));
  }
});
var bd = ["args"];
var gd = ["color"];
var im = defineComponent({
  __name: "Sphere",
  props: {
    args: { default: () => [2, 32, 16] },
    color: { default: "0xffffff" }
  },
  setup(f, { expose: i }) {
    const s = shallowRef();
    return i({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "sphereRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresSphereGeometry", { args: f.args }, null, 8, bd),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: f.color }, null, 8, gd)
      ])
    ], 16));
  }
});
var _d = ["rotation"];
var wd = ["args"];
var yd = ["color"];
var sm = defineComponent({
  __name: "Tetrahedron",
  props: {
    args: { default: () => [1, 0] },
    color: { default: "0xffffff" }
  },
  setup(f, { expose: i }) {
    const s = shallowRef();
    return i({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "tetrahedronRef",
      ref: s,
      rotation: [-Math.PI / 2, 0, 0]
    }, r.$attrs), [
      createBaseVNode("TresTetrahedronGeometry", { args: f.args }, null, 8, wd),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: f.color }, null, 8, yd)
      ])
    ], 16, _d));
  }
});
var xd = ["args"];
var Ed = ["color"];
var rm = defineComponent({
  __name: "Torus",
  props: {
    args: { default: () => [1, 1, 16, 80] },
    color: { default: "0xffffff" }
  },
  setup(f, { expose: i }) {
    const s = shallowRef();
    return i({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "torusRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresTorusGeometry", { args: f.args }, null, 8, xd),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: f.color }, null, 8, Ed)
      ])
    ], 16));
  }
});
var Cd = ["args"];
var Pd = ["color"];
var om = defineComponent({
  __name: "TorusKnot",
  props: {
    args: { default: () => [1, 0.4, 64, 8] },
    color: { default: "0xffffff" }
  },
  setup(f, { expose: i }) {
    const s = shallowRef();
    return i({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "torusKnotRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresTorusKnotGeometry", { args: f.args }, null, 8, Cd),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: f.color }, null, 8, Pd)
      ])
    ], 16));
  }
});
var Td = ["args"];
var kd = ["color"];
var am = defineComponent({
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
  setup(f, { expose: i }) {
    const s = shallowRef();
    return i({
      value: s
    }), (r, o) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "tubeRef",
      ref: s
    }, r.$attrs), [
      createBaseVNode("TresTubeGeometry", { args: f.args }, null, 8, Td),
      renderSlot(r.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: f.color }, null, 8, kd)
      ])
    ], 16));
  }
});
var wo = { exports: {} };
(function(f, i) {
  (function(s, r) {
    r(i);
  })(il, function(s) {
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
    class p2 extends c {
      constructor(e, t, l, b) {
        super(e), this.value = t, this.presetKey = l, this.last = b ?? true;
      }
    }
    class h2 extends c {
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
    function _2(n) {
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
    const L = {
      alreadydisposed: () => "View has been already disposed",
      invalidparams: (n) => `Invalid parameters for '${n.name}'`,
      nomatchingcontroller: (n) => `No matching controller for '${n.key}'`,
      nomatchingview: (n) => `No matching view for '${JSON.stringify(n.params)}'`,
      notbindable: () => "Value is not bindable",
      propertynotfound: (n) => `Property '${n.name}' not found`,
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
        this.message = (t = L[e.type](e.context)) !== null && t !== void 0 ? t : "Unexpected error", this.name = this.constructor.name, this.stack = new Error(this.message).stack, this.type = e.type;
      }
    }
    class R {
      constructor(e, t, l) {
        this.obj_ = e, this.key_ = t, this.presetKey_ = l ?? t;
      }
      static isBindable(e) {
        return !(e === null || typeof e != "object" && typeof e != "function");
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
    class O extends o {
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
    class N {
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
    const I2 = "tp";
    function D2(n) {
      return (t, l) => [
        I2,
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
    function F(n, e) {
      n.emitter.on("change", Y(G, e)), e(n.rawValue);
    }
    function B(n, e, t) {
      F(n.value(e), t);
    }
    function H2(n, e, t) {
      t ? n.classList.add(e) : n.classList.remove(e);
    }
    function K2(n, e) {
      return (t) => {
        H2(n, e, t);
      };
    }
    function q(n, e) {
      F(n, (t) => {
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
    class ce2 {
      constructor(e, t) {
        this.emitter = new N(), this.onClick_ = this.onClick_.bind(this), this.props = t.props, this.viewProps = t.viewProps, this.view = new _e(e, {
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
        this.constraint_ = t == null ? void 0 : t.constraint, this.equals_ = (l = t == null ? void 0 : t.equals) !== null && l !== void 0 ? l : (b, E) => b === E, this.emitter = new N(), this.rawValue_ = e;
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
        this.emitter = new N(), this.value_ = e;
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
    function ee(n, e) {
      const t = e == null ? void 0 : e.constraint, l = e == null ? void 0 : e.equals;
      return !t && !l ? new he(n) : new me(n, e);
    }
    class X2 {
      constructor(e) {
        this.emitter = new N(), this.valMap_ = e;
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
        return new X2(t);
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
    function Se2(n, e) {
      const l = Object.keys(e).reduce((b, E) => {
        if (b === void 0)
          return;
        const k = e[E], j = k(n[E]);
        return j.succeeded ? Object.assign(Object.assign({}, b), { [E]: j.value }) : void 0;
      }, {});
      return l;
    }
    function fe2(n, e) {
      return n.reduce((t, l) => {
        if (t === void 0)
          return;
        const b = e(l);
        if (!(!b.succeeded || b.value === void 0))
          return [...t, b.value];
      }, []);
    }
    function oe2(n) {
      return n === null ? false : typeof n == "object";
    }
    function ne(n) {
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
        custom: (e) => ne(e)(n),
        boolean: ne((e) => typeof e == "boolean" ? e : void 0)(n),
        number: ne((e) => typeof e == "number" ? e : void 0)(n),
        string: ne((e) => typeof e == "string" ? e : void 0)(n),
        function: ne((e) => typeof e == "function" ? e : void 0)(n),
        constant: (e) => ne((t) => t === e ? e : void 0)(n),
        raw: ne((e) => e)(n),
        object: (e) => ne((t) => {
          if (oe2(t))
            return Se2(t, e);
        })(n),
        array: (e) => ne((t) => {
          if (Array.isArray(t))
            return fe2(t, e);
        })(n)
      };
    }
    const A2 = {
      optional: ge(true),
      required: ge(false)
    };
    function ae(n, e) {
      const t = A2.required.object(e)(n);
      return t.succeeded ? t.value : void 0;
    }
    function Ne(n) {
      console.warn([
        `Missing '${n.key}' of ${n.target} in ${n.place}.`,
        "Please rebuild plugins with the latest core package."
      ].join(" "));
    }
    function Ue(n) {
      return n && n.parentElement && n.parentElement.removeChild(n), null;
    }
    class xe2 {
      constructor(e) {
        this.value_ = e;
      }
      static create(e) {
        return [
          new xe2(e),
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
    const rt2 = D2("");
    function Un(n, e) {
      return K2(n, rt2(void 0, e));
    }
    class Ze2 extends X2 {
      constructor(e) {
        var t;
        super(e), this.onDisabledChange_ = this.onDisabledChange_.bind(this), this.onParentChange_ = this.onParentChange_.bind(this), this.onParentGlobalDisabledChange_ = this.onParentGlobalDisabledChange_.bind(this), [this.globalDisabled_, this.setGlobalDisabled_] = xe2.create(ee(this.getGlobalDisabled_())), this.value("disabled").emitter.on("change", this.onDisabledChange_), this.value("parent").emitter.on("change", this.onParentChange_), (t = this.get("parent")) === null || t === void 0 || t.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_);
      }
      static create(e) {
        var t, l, b;
        const E = e ?? {};
        return new Ze2(X2.createCore({
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
        F(this.globalDisabled_, Un(e, "disabled")), B(this, "hidden", Un(e, "hidden"));
      }
      bindDisabled(e) {
        F(this.globalDisabled_, (t) => {
          e.disabled = t;
        });
      }
      bindTabIndex(e) {
        F(this.globalDisabled_, (t) => {
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
    function Gn() {
      return ["veryfirst", "first", "last", "verylast"];
    }
    const hn = D2(""), vt2 = {
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
          Gn().forEach((l) => {
            t.classList.remove(hn(void 0, vt2[l]));
          }), this.blade.get("positions").forEach((l) => {
            t.classList.add(hn(void 0, vt2[l]));
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
          Ne({
            key: "parent",
            target: Ze2.name,
            place: "BladeController.parent"
          });
          return;
        }
        this.viewProps.set("parent", this.parent_ ? this.parent_.viewProps : null);
      }
    }
    const Ke = "http://www.w3.org/2000/svg";
    function ot2(n) {
      n.offsetHeight;
    }
    function dn(n, e) {
      const t = n.style.transition;
      n.style.transition = "none", e(), n.style.transition = t;
    }
    function bt2(n) {
      return n.ontouchstart !== void 0;
    }
    function Hn() {
      return globalThis;
    }
    function bi() {
      return Hn().document;
    }
    function Kn(n) {
      const e = n.ownerDocument.defaultView;
      return e && "document" in e ? n.getContext("2d", {
        willReadFrequently: true
      }) : null;
    }
    const $n = {
      check: '<path d="M2 8l4 4l8 -8"/>',
      dropdown: '<path d="M5 7h6l-3 3 z"/>',
      p2dpad: '<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'
    };
    function Et2(n, e) {
      const t = n.createElementNS(Ke, "svg");
      return t.innerHTML = $n[e], t;
    }
    function Mt(n, e, t) {
      n.insertBefore(e, n.children[t]);
    }
    function Xn(n) {
      n.parentElement && n.parentElement.removeChild(n);
    }
    function mn(n) {
      for (; n.children.length > 0; )
        n.removeChild(n.children[0]);
    }
    function Yn(n) {
      for (; n.childNodes.length > 0; )
        n.removeChild(n.childNodes[0]);
    }
    function Ct(n) {
      return n.relatedTarget ? n.relatedTarget : "explicitOriginalTarget" in n ? n.explicitOriginalTarget : null;
    }
    const gt2 = D2("lbl");
    function St(n, e) {
      const t = n.createDocumentFragment();
      return e.split(`
`).map((b) => n.createTextNode(b)).forEach((b, E) => {
        E > 0 && t.appendChild(n.createElement("br")), t.appendChild(b);
      }), t;
    }
    class M {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(gt2()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(gt2("l")), B(t.props, "label", (E) => {
          _2(E) ? this.element.classList.add(gt2(void 0, "nol")) : (this.element.classList.remove(gt2(void 0, "nol")), Yn(l), l.appendChild(St(e, E)));
        }), this.element.appendChild(l), this.labelElement = l;
        const b = e.createElement("div");
        b.classList.add(gt2("v")), this.element.appendChild(b), this.valueElement = b;
      }
    }
    class U2 extends At {
      constructor(e, t) {
        const l = t.valueController.viewProps;
        super(Object.assign(Object.assign({}, t), { view: new M(e, {
          props: t.props,
          viewProps: l
        }), viewProps: l })), this.props = t.props, this.valueController = t.valueController, this.view.valueElement.appendChild(this.valueController.view.element);
      }
    }
    const W = {
      id: "button",
      type: "blade",
      accept(n) {
        const e = A2, t = ae(n, {
          title: e.required.string,
          view: e.required.constant("button"),
          label: e.optional.string
        });
        return t ? { params: t } : null;
      },
      controller(n) {
        return new U2(n.document, {
          blade: n.blade,
          props: X2.fromObject({
            label: n.params.label
          }),
          valueController: new ce2(n.document, {
            props: X2.fromObject({
              title: n.params.title
            }),
            viewProps: n.viewProps
          })
        });
      },
      api(n) {
        return !(n.controller instanceof U2) || !(n.controller.valueController instanceof ce2) ? null : new O(n.controller);
      }
    };
    class ie2 extends At {
      constructor(e) {
        super(e), this.value = e.value;
      }
    }
    function Ee2() {
      return new X2({
        positions: ee([], {
          equals: y
        })
      });
    }
    class Fe extends X2 {
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
        }, l = X2.createCore(t);
        return new Fe(l);
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
        B(this, "expanded", l), B(this, "temporaryExpanded", l);
      }
      cleanUpTransition() {
        this.set("shouldFixHeight", false), this.set("expandedHeight", null), this.set("completed", true);
      }
    }
    function Gt(n, e) {
      let t = 0;
      return dn(e, () => {
        n.set("expandedHeight", null), n.set("temporaryExpanded", true), ot2(e), t = e.clientHeight, n.set("temporaryExpanded", null), ot2(e);
      }), t;
    }
    function fn(n, e) {
      e.style.height = n.styleHeight;
    }
    function $e(n, e) {
      n.value("expanded").emitter.on("beforechange", () => {
        if (n.set("completed", false), _2(n.get("expandedHeight"))) {
          const t = Gt(n, e);
          t > 0 && n.set("expandedHeight", t);
        }
        n.set("shouldFixHeight", true), ot2(e);
      }), n.emitter.on("change", () => {
        fn(n, e);
      }), fn(n, e), e.addEventListener("transitionend", (t) => {
        t.propertyName === "height" && n.cleanUpTransition();
      });
    }
    class Xe extends o {
      constructor(e, t) {
        super(e), this.rackApi_ = t;
      }
    }
    function qs(n, e) {
      return n.addBlade(Object.assign(Object.assign({}, e), { view: "button" }));
    }
    function Qs(n, e) {
      return n.addBlade(Object.assign(Object.assign({}, e), { view: "folder" }));
    }
    function Zs(n, e) {
      const t = e ?? {};
      return n.addBlade(Object.assign(Object.assign({}, t), { view: "separator" }));
    }
    function gi(n, e) {
      return n.addBlade(Object.assign(Object.assign({}, e), { view: "tab" }));
    }
    class Lt {
      constructor(e) {
        this.emitter = new N(), this.items_ = [], this.cache_ = /* @__PURE__ */ new Set(), this.onSubListAdd_ = this.onSubListAdd_.bind(this), this.onSubListRemove_ = this.onSubListRemove_.bind(this), this.extract_ = e;
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
    class _i extends o {
      constructor(e) {
        super(e), this.onBindingChange_ = this.onBindingChange_.bind(this), this.emitter_ = new N(), this.controller_.binding.emitter.on("change", this.onBindingChange_);
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
          event: new p2(this, t, this.controller_.binding.target.presetKey, e.options.last)
        });
      }
    }
    class Ge extends U2 {
      constructor(e, t) {
        super(e, t), this.binding = t.binding;
      }
    }
    class wi extends o {
      constructor(e) {
        super(e), this.onBindingUpdate_ = this.onBindingUpdate_.bind(this), this.emitter_ = new N(), this.controller_.binding.emitter.on("update", this.onBindingUpdate_);
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
          event: new h2(this, t, this.controller_.binding.target.presetKey)
        });
      }
    }
    class at2 extends U2 {
      constructor(e, t) {
        super(e, t), this.binding = t.binding, this.viewProps.bindDisabled(this.binding.ticker), this.viewProps.handleDispose(() => {
          this.binding.dispose();
        });
      }
    }
    function as(n) {
      return n instanceof qn ? n.apiSet_ : n instanceof Xe ? n.rackApi_.apiSet_ : null;
    }
    function vn(n, e) {
      const t = n.find((l) => l.controller_ === e);
      if (!t)
        throw S.shouldNeverHappen();
      return t;
    }
    function ls(n, e, t) {
      if (!R.isBindable(n))
        throw S.notBindable();
      return new R(n, e, t);
    }
    class qn extends o {
      constructor(e, t) {
        super(e), this.onRackAdd_ = this.onRackAdd_.bind(this), this.onRackRemove_ = this.onRackRemove_.bind(this), this.onRackInputChange_ = this.onRackInputChange_.bind(this), this.onRackMonitorUpdate_ = this.onRackMonitorUpdate_.bind(this), this.emitter_ = new N(), this.apiSet_ = new Lt(as), this.pool_ = t;
        const l = this.controller_.rack;
        l.emitter.on("add", this.onRackAdd_), l.emitter.on("remove", this.onRackRemove_), l.emitter.on("inputchange", this.onRackInputChange_), l.emitter.on("monitorupdate", this.onRackMonitorUpdate_), l.children.forEach((b) => {
          this.setUpApi_(b);
        });
      }
      get children() {
        return this.controller_.rack.children.map((e) => vn(this.apiSet_, e));
      }
      addInput(e, t, l) {
        const b = l ?? {}, E = this.controller_.view.element.ownerDocument, k = this.pool_.createInput(E, ls(e, t, b.presetKey), b), j = new _i(k);
        return this.add(j, b.index);
      }
      addMonitor(e, t, l) {
        const b = l ?? {}, E = this.controller_.view.element.ownerDocument, k = this.pool_.createMonitor(E, ls(e, t), b), j = new wi(k);
        return this.add(j, b.index);
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
        return gi(this, e);
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
          const t = vn(this.apiSet_, e.bladeController);
          this.apiSet_.remove(t);
        }
      }
      onRackInputChange_(e) {
        const t = e.bladeController;
        if (t instanceof Ge) {
          const l = vn(this.apiSet_, t), b = t.binding;
          this.emitter_.emit("change", {
            event: new p2(l, b.target.read(), b.target.presetKey, e.options.last)
          });
        } else if (t instanceof ie2) {
          const l = vn(this.apiSet_, t);
          this.emitter_.emit("change", {
            event: new p2(l, t.value.rawValue, void 0, e.options.last)
          });
        }
      }
      onRackMonitorUpdate_(e) {
        if (!(e.bladeController instanceof at2))
          throw S.shouldNeverHappen();
        const t = vn(this.apiSet_, e.bladeController), l = e.bladeController.binding;
        this.emitter_.emit("update", {
          event: new h2(t, l.target.read(), l.target.presetKey)
        });
      }
    }
    class yi extends Xe {
      constructor(e, t) {
        super(e, new qn(e.rackController, t)), this.emitter_ = new N(), this.controller_.foldable.value("expanded").emitter.on("change", (l) => {
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
        return this.emitter_.on(e, (b) => {
          l(b.event);
        }), this;
      }
    }
    class xi extends At {
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
    function Js(n, e) {
      for (let t = 0; t < n.length; t++) {
        const l = n[t];
        if (l instanceof Ge && l.binding === e)
          return l;
      }
      return null;
    }
    function er(n, e) {
      for (let t = 0; t < n.length; t++) {
        const l = n[t];
        if (l instanceof at2 && l.binding === e)
          return l;
      }
      return null;
    }
    function tr(n, e) {
      for (let t = 0; t < n.length; t++) {
        const l = n[t];
        if (l instanceof ie2 && l.value === e)
          return l;
      }
      return null;
    }
    function Ei(n) {
      return n instanceof bn ? n.rack : n instanceof xi ? n.rackController.rack : null;
    }
    function nr(n) {
      const e = Ei(n);
      return e ? e.bcSet_ : null;
    }
    class ir {
      constructor(e) {
        var t, l;
        this.onBladePositionsChange_ = this.onBladePositionsChange_.bind(this), this.onSetAdd_ = this.onSetAdd_.bind(this), this.onSetRemove_ = this.onSetRemove_.bind(this), this.onChildDispose_ = this.onChildDispose_.bind(this), this.onChildPositionsChange_ = this.onChildPositionsChange_.bind(this), this.onChildInputChange_ = this.onChildInputChange_.bind(this), this.onChildMonitorUpdate_ = this.onChildMonitorUpdate_.bind(this), this.onChildValueChange_ = this.onChildValueChange_.bind(this), this.onChildViewPropsChange_ = this.onChildViewPropsChange_.bind(this), this.onDescendantLayout_ = this.onDescendantLayout_.bind(this), this.onDescendantInputChange_ = this.onDescendantInputChange_.bind(this), this.onDescendantMonitorUpdate_ = this.onDescendantMonitorUpdate_.bind(this), this.emitter = new N(), this.blade_ = (t = e.blade) !== null && t !== void 0 ? t : null, (l = this.blade_) === null || l === void 0 || l.value("positions").emitter.on("change", this.onBladePositionsChange_), this.viewProps = e.viewProps, this.bcSet_ = new Lt(nr), this.bcSet_.emitter.on("add", this.onSetAdd_), this.bcSet_.emitter.on("remove", this.onSetRemove_);
      }
      get children() {
        return this.bcSet_.items;
      }
      add(e, t) {
        var l;
        (l = e.parent) === null || l === void 0 || l.remove(e), C(e, "parent") ? e.parent = this : (e.parent_ = this, Ne({
          key: "parent",
          target: "BladeController",
          place: "BladeRack.add"
        })), this.bcSet_.add(e, t);
      }
      remove(e) {
        C(e, "parent") ? e.parent = null : (e.parent_ = null, Ne({
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
        else if (l instanceof at2)
          l.binding.emitter.on("update", this.onChildMonitorUpdate_);
        else if (l instanceof ie2)
          l.value.emitter.on("change", this.onChildValueChange_);
        else {
          const b = Ei(l);
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
        else if (l instanceof at2)
          l.binding.emitter.off("update", this.onChildMonitorUpdate_);
        else if (l instanceof ie2)
          l.value.emitter.off("change", this.onChildValueChange_);
        else {
          const b = Ei(l);
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
        const t = Js(this.find(Ge), e.sender);
        if (!t)
          throw S.alreadyDisposed();
        this.emitter.emit("inputchange", {
          bladeController: t,
          options: e.options,
          sender: this
        });
      }
      onChildMonitorUpdate_(e) {
        const t = er(this.find(at2), e.sender);
        if (!t)
          throw S.alreadyDisposed();
        this.emitter.emit("monitorupdate", {
          bladeController: t,
          sender: this
        });
      }
      onChildValueChange_(e) {
        const t = tr(this.find(ie2), e.sender);
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
    class bn extends At {
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
        e.isRoot && Mt(this.view.element, e.bladeController.view.element, e.index);
      }
      onRackRemove_(e) {
        e.isRoot && Xn(e.bladeController.view.element);
      }
    }
    const cs = D2("cnt");
    class sr {
      constructor(e, t) {
        var l;
        this.className_ = D2((l = t.viewName) !== null && l !== void 0 ? l : "fld"), this.element = e.createElement("div"), this.element.classList.add(this.className_(), cs()), t.viewProps.bindClassModifiers(this.element), this.foldable_ = t.foldable, this.foldable_.bindExpandedClass(this.element, this.className_(void 0, "expanded")), B(this.foldable_, "completed", K2(this.element, this.className_(void 0, "cpl")));
        const b = e.createElement("button");
        b.classList.add(this.className_("b")), B(t.props, "title", (J) => {
          _2(J) ? this.element.classList.add(this.className_(void 0, "not")) : this.element.classList.remove(this.className_(void 0, "not"));
        }), t.viewProps.bindDisabled(b), this.element.appendChild(b), this.buttonElement = b;
        const E = e.createElement("div");
        E.classList.add(this.className_("i")), this.element.appendChild(E);
        const k = e.createElement("div");
        k.classList.add(this.className_("t")), q(t.props.value("title"), k), this.buttonElement.appendChild(k), this.titleElement = k;
        const j = e.createElement("div");
        j.classList.add(this.className_("m")), this.buttonElement.appendChild(j);
        const Q2 = t.containerElement;
        Q2.classList.add(this.className_("c")), this.element.appendChild(Q2), this.containerElement = Q2;
      }
    }
    class Qn extends xi {
      constructor(e, t) {
        var l;
        const b = Fe.create((l = t.expanded) !== null && l !== void 0 ? l : true), E = new bn(e, {
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
    const rr = {
      id: "folder",
      type: "blade",
      accept(n) {
        const e = A2, t = ae(n, {
          title: e.required.string,
          view: e.required.constant("folder"),
          expanded: e.optional.boolean
        });
        return t ? { params: t } : null;
      },
      controller(n) {
        return new Qn(n.document, {
          blade: n.blade,
          expanded: n.params.expanded,
          props: X2.fromObject({
            title: n.params.title
          }),
          viewProps: n.viewProps
        });
      },
      api(n) {
        return n.controller instanceof Qn ? new yi(n.controller, n.pool) : null;
      }
    };
    class Ht extends ie2 {
      constructor(e, t) {
        const l = t.valueController.viewProps;
        super(Object.assign(Object.assign({}, t), { value: t.valueController.value, view: new M(e, {
          props: t.props,
          viewProps: l
        }), viewProps: l })), this.props = t.props, this.valueController = t.valueController, this.view.valueElement.appendChild(this.valueController.view.element);
      }
    }
    class us extends o {
    }
    const Ci = D2("spr");
    class or {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(Ci()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("hr");
        l.classList.add(Ci("r")), this.element.appendChild(l);
      }
    }
    class gn extends At {
      constructor(e, t) {
        super(Object.assign(Object.assign({}, t), { view: new or(e, {
          viewProps: t.viewProps
        }) }));
      }
    }
    const ar = {
      id: "separator",
      type: "blade",
      accept(n) {
        const t = ae(n, {
          view: A2.required.constant("separator")
        });
        return t ? { params: t } : null;
      },
      controller(n) {
        return new gn(n.document, {
          blade: n.blade,
          viewProps: n.viewProps
        });
      },
      api(n) {
        return n.controller instanceof gn ? new us(n.controller) : null;
      }
    }, Ie = D2("tbi");
    class lr {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(Ie()), t.viewProps.bindClassModifiers(this.element), B(t.props, "selected", (E) => {
          E ? this.element.classList.add(Ie(void 0, "sel")) : this.element.classList.remove(Ie(void 0, "sel"));
        });
        const l = e.createElement("button");
        l.classList.add(Ie("b")), t.viewProps.bindDisabled(l), this.element.appendChild(l), this.buttonElement = l;
        const b = e.createElement("div");
        b.classList.add(Ie("t")), q(t.props.value("title"), b), this.buttonElement.appendChild(b), this.titleElement = b;
      }
    }
    class Zn {
      constructor(e, t) {
        this.emitter = new N(), this.onClick_ = this.onClick_.bind(this), this.props = t.props, this.viewProps = t.viewProps, this.view = new lr(e, {
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
    class ps {
      constructor(e, t) {
        this.onItemClick_ = this.onItemClick_.bind(this), this.ic_ = new Zn(e, {
          props: t.itemProps,
          viewProps: Ze2.create()
        }), this.ic_.emitter.on("click", this.onItemClick_), this.cc_ = new bn(e, {
          blade: Ee2(),
          viewProps: Ze2.create()
        }), this.props = t.props, B(this.props, "selected", (l) => {
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
    class Pi {
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
    class hs extends Xe {
      constructor(e, t) {
        super(e, new qn(e.rackController, t)), this.onPageAdd_ = this.onPageAdd_.bind(this), this.onPageRemove_ = this.onPageRemove_.bind(this), this.onSelect_ = this.onSelect_.bind(this), this.emitter_ = new N(), this.pageApiMap_ = /* @__PURE__ */ new Map(), this.rackApi_.on("change", (l) => {
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
        const t = this.controller_.view.element.ownerDocument, l = new ps(t, {
          itemProps: X2.fromObject({
            selected: false,
            title: e.title
          }),
          props: X2.fromObject({
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
        const l = new Pi(e, t);
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
    const ds = -1;
    class cr {
      constructor() {
        this.onItemSelectedChange_ = this.onItemSelectedChange_.bind(this), this.empty = ee(true), this.selectedIndex = ee(ds), this.items_ = [];
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
          this.selectedIndex.rawValue = ds, this.empty.rawValue = true;
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
    const Kt = D2("tab");
    class $t {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(Kt(), cs()), t.viewProps.bindClassModifiers(this.element), F(t.empty, K2(this.element, Kt(void 0, "nop")));
        const l = e.createElement("div");
        l.classList.add(Kt("t")), this.element.appendChild(l), this.itemsElement = l;
        const b = e.createElement("div");
        b.classList.add(Kt("i")), this.element.appendChild(b);
        const E = t.contentsElement;
        E.classList.add(Kt("c")), this.element.appendChild(E), this.contentsElement = E;
      }
    }
    class _n extends xi {
      constructor(e, t) {
        const l = new bn(e, {
          blade: t.blade,
          viewProps: t.viewProps
        }), b = new cr();
        super({
          blade: t.blade,
          rackController: l,
          view: new $t(e, {
            contentsElement: l.view.element,
            empty: b.empty,
            viewProps: t.viewProps
          })
        }), this.onPageAdd_ = this.onPageAdd_.bind(this), this.onPageRemove_ = this.onPageRemove_.bind(this), this.pageSet_ = new Lt(() => null), this.pageSet_.emitter.on("add", this.onPageAdd_), this.pageSet_.emitter.on("remove", this.onPageRemove_), this.tab = b;
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
        Mt(this.view.itemsElement, t.itemController.view.element, e.index), t.itemController.viewProps.set("parent", this.viewProps), this.rackController.rack.add(t.contentController, e.index), this.tab.add(t.props.value("selected"));
      }
      onPageRemove_(e) {
        const t = e.item;
        Xn(t.itemController.view.element), t.itemController.viewProps.set("parent", null), this.rackController.rack.remove(t.contentController), this.tab.remove(t.props.value("selected"));
      }
    }
    const Ti = {
      id: "tab",
      type: "blade",
      accept(n) {
        const e = A2, t = ae(n, {
          pages: e.required.array(e.required.object({ title: e.required.string })),
          view: e.required.constant("tab")
        });
        return !t || t.pages.length === 0 ? null : { params: t };
      },
      controller(n) {
        const e = new _n(n.document, {
          blade: n.blade,
          viewProps: n.viewProps
        });
        return n.params.pages.forEach((t) => {
          const l = new ps(n.document, {
            itemProps: X2.fromObject({
              selected: false,
              title: t.title
            }),
            props: X2.fromObject({
              selected: false
            })
          });
          e.add(l);
        }), e;
      },
      api(n) {
        return n.controller instanceof _n ? new hs(n.controller, n.pool) : null;
      }
    };
    function ur(n, e) {
      const t = n.accept(e.params);
      if (!t)
        return null;
      const l = A2.optional.boolean(e.params.disabled).value, b = A2.optional.boolean(e.params.hidden).value;
      return n.controller({
        blade: Ee2(),
        document: e.document,
        params: Object.assign(Object.assign({}, t.params), { disabled: l, hidden: b }),
        viewProps: Ze2.create({
          disabled: l,
          hidden: b
        })
      });
    }
    class ms {
      constructor() {
        this.disabled = false, this.emitter = new N();
      }
      dispose() {
      }
      tick() {
        this.disabled || this.emitter.emit("tick", {
          sender: this
        });
      }
    }
    class ki {
      constructor(e, t) {
        this.disabled_ = false, this.timerId_ = null, this.onTick_ = this.onTick_.bind(this), this.doc_ = e, this.emitter = new N(), this.interval_ = t, this.setTimer_();
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
    class Wn {
      constructor(e) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.reader = e.reader, this.writer = e.writer, this.emitter = new N(), this.value = e.value, this.value.emitter.on("change", this.onValueChange_), this.target = e.target, this.read();
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
    function Le(n, e) {
      for (; n.length < e; )
        n.push(void 0);
    }
    function fs(n) {
      const e = [];
      return Le(e, n), ee(e);
    }
    function Xt(n) {
      const e = n.indexOf(void 0);
      return e < 0 ? n : n.slice(0, e);
    }
    function We(n, e) {
      const t = [...Xt(n), e];
      return t.length > n.length ? t.splice(0, t.length - n.length) : Le(t, n.length), t;
    }
    class pr {
      constructor(e) {
        this.onTick_ = this.onTick_.bind(this), this.reader_ = e.reader, this.target = e.target, this.emitter = new N(), this.value = e.value, this.ticker = e.ticker, this.ticker.emitter.on("tick", this.onTick_), this.read();
      }
      dispose() {
        this.ticker.dispose();
      }
      read() {
        const e = this.target.read();
        if (e === void 0)
          return;
        const t = this.value.rawValue, l = this.reader_(e);
        this.value.rawValue = We(t, l), this.emitter.emit("update", {
          rawValue: l,
          sender: this
        });
      }
      onTick_(e) {
        this.read();
      }
    }
    class wn {
      constructor(e) {
        this.constraints = e;
      }
      constrain(e) {
        return this.constraints.reduce((t, l) => l.constrain(t), e);
      }
    }
    function it2(n, e) {
      if (n instanceof e)
        return n;
      if (n instanceof wn) {
        const t = n.constraints.reduce((l, b) => l || (b instanceof e ? b : null), null);
        if (t)
          return t;
      }
      return null;
    }
    class Yt {
      constructor(e) {
        this.values = X2.fromObject({
          max: e.max,
          min: e.min
        });
      }
      constrain(e) {
        const t = this.values.get("max"), l = this.values.get("min");
        return Math.min(Math.max(e, l), t);
      }
    }
    class yn {
      constructor(e) {
        this.values = X2.fromObject({
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
    class Ai {
      constructor(e) {
        this.values = X2.fromObject({
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
    class Jn {
      constructor(e, t = 0) {
        this.step = e, this.origin = t;
      }
      constrain(e) {
        const t = this.origin % this.step, l = Math.round((e - t) / this.step);
        return t + l * this.step;
      }
    }
    const qt = D2("lst");
    class vs {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.props_ = t.props, this.element = e.createElement("div"), this.element.classList.add(qt()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("select");
        l.classList.add(qt("s")), B(this.props_, "options", (E) => {
          mn(l), E.forEach((k, j) => {
            const Q2 = e.createElement("option");
            Q2.dataset.index = String(j), Q2.textContent = k.text, Q2.value = String(k.value), l.appendChild(Q2);
          });
        }), t.viewProps.bindDisabled(l), this.element.appendChild(l), this.selectElement = l;
        const b = e.createElement("div");
        b.classList.add(qt("m")), b.appendChild(Et2(e, "dropdown")), this.element.appendChild(b), t.value.emitter.on("change", this.onValueChange_), this.value_ = t.value, this.update_();
      }
      update_() {
        this.selectElement.value = String(this.value_.rawValue);
      }
      onValueChange_() {
        this.update_();
      }
    }
    class xn {
      constructor(e, t) {
        this.onSelectChange_ = this.onSelectChange_.bind(this), this.props = t.props, this.value = t.value, this.viewProps = t.viewProps, this.view = new vs(e, {
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
    const bs = D2("pop");
    class hr {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(bs()), t.viewProps.bindClassModifiers(this.element), F(t.shows, K2(this.element, bs(void 0, "v")));
      }
    }
    class gs {
      constructor(e, t) {
        this.shows = ee(false), this.viewProps = t.viewProps, this.view = new hr(e, {
          shows: this.shows,
          viewProps: this.viewProps
        });
      }
    }
    const _s = D2("txt");
    class dr {
      constructor(e, t) {
        this.onChange_ = this.onChange_.bind(this), this.element = e.createElement("div"), this.element.classList.add(_s()), t.viewProps.bindClassModifiers(this.element), this.props_ = t.props, this.props_.emitter.on("change", this.onChange_);
        const l = e.createElement("input");
        l.classList.add(_s("i")), l.type = "text", t.viewProps.bindDisabled(l), this.element.appendChild(l), this.inputElement = l, t.value.emitter.on("change", this.onChange_), this.value_ = t.value, this.refresh();
      }
      refresh() {
        const e = this.props_.get("formatter");
        this.inputElement.value = e(this.value_.rawValue);
      }
      onChange_() {
        this.refresh();
      }
    }
    class ei {
      constructor(e, t) {
        this.onInputChange_ = this.onInputChange_.bind(this), this.parser_ = t.parser, this.props = t.props, this.value = t.value, this.viewProps = t.viewProps, this.view = new dr(e, {
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
    function mr(n) {
      return String(n);
    }
    function ws(n) {
      return n === "false" ? false : !!n;
    }
    function ys(n) {
      return mr(n);
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
    const xs = {
      "+": (n) => n,
      "-": (n) => -n,
      "~": (n) => ~n
    };
    class gr {
      constructor(e, t) {
        this.operator = e, this.expression = t;
      }
      evaluate() {
        const e = xs[this.operator];
        if (!e)
          throw new Error(`unexpected unary operator: '${this.operator}`);
        return e(this.expression.evaluate());
      }
      toString() {
        return ["u(", this.operator, this.expression.toString(), ")"].join(" ");
      }
    }
    function Mi(n) {
      return (e, t) => {
        for (let l = 0; l < n.length; l++) {
          const b = n[l](e, t);
          if (b !== "")
            return b;
        }
        return "";
      };
    }
    function Rt2(n, e) {
      var t;
      const l = n.substr(e).match(/^\s+/);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function _r(n, e) {
      const t = n.substr(e, 1);
      return t.match(/^[1-9]$/) ? t : "";
    }
    function En(n, e) {
      var t;
      const l = n.substr(e).match(/^[0-9]+/);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function wr(n, e) {
      const t = En(n, e);
      if (t !== "")
        return t;
      const l = n.substr(e, 1);
      if (e += 1, l !== "-" && l !== "+")
        return "";
      const b = En(n, e);
      return b === "" ? "" : l + b;
    }
    function lt2(n, e) {
      const t = n.substr(e, 1);
      if (e += 1, t.toLowerCase() !== "e")
        return "";
      const l = wr(n, e);
      return l === "" ? "" : t + l;
    }
    function Es(n, e) {
      const t = n.substr(e, 1);
      if (t === "0")
        return t;
      const l = _r(n, e);
      return e += l.length, l === "" ? "" : l + En(n, e);
    }
    function yr(n, e) {
      const t = Es(n, e);
      if (e += t.length, t === "")
        return "";
      const l = n.substr(e, 1);
      if (e += l.length, l !== ".")
        return "";
      const b = En(n, e);
      return e += b.length, t + l + b + lt2(n, e);
    }
    function Cs(n, e) {
      const t = n.substr(e, 1);
      if (e += t.length, t !== ".")
        return "";
      const l = En(n, e);
      return e += l.length, l === "" ? "" : t + l + lt2(n, e);
    }
    function xr(n, e) {
      const t = Es(n, e);
      return e += t.length, t === "" ? "" : t + lt2(n, e);
    }
    const Ps = Mi([
      yr,
      Cs,
      xr
    ]);
    function Si(n, e) {
      var t;
      const l = n.substr(e).match(/^[01]+/);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function Er(n, e) {
      const t = n.substr(e, 2);
      if (e += t.length, t.toLowerCase() !== "0b")
        return "";
      const l = Si(n, e);
      return l === "" ? "" : t + l;
    }
    function Ts(n, e) {
      var t;
      const l = n.substr(e).match(/^[0-7]+/);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function Je(n, e) {
      const t = n.substr(e, 2);
      if (e += t.length, t.toLowerCase() !== "0o")
        return "";
      const l = Ts(n, e);
      return l === "" ? "" : t + l;
    }
    function Cr(n, e) {
      var t;
      const l = n.substr(e).match(/^[0-9a-f]+/i);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function Pr(n, e) {
      const t = n.substr(e, 2);
      if (e += t.length, t.toLowerCase() !== "0x")
        return "";
      const l = Cr(n, e);
      return l === "" ? "" : t + l;
    }
    const Li = Mi([
      Er,
      Je,
      Pr
    ]), Tr = Mi([
      Li,
      Ps
    ]);
    function Pt(n, e) {
      const t = Tr(n, e);
      return e += t.length, t === "" ? null : {
        evaluable: new fr(t),
        cursor: e
      };
    }
    function Ri(n, e) {
      const t = n.substr(e, 1);
      if (e += t.length, t !== "(")
        return null;
      const l = ti(n, e);
      if (!l)
        return null;
      e = l.cursor, e += Rt2(n, e).length;
      const b = n.substr(e, 1);
      return e += b.length, b !== ")" ? null : {
        evaluable: l.evaluable,
        cursor: e
      };
    }
    function kr(n, e) {
      var t;
      return (t = Pt(n, e)) !== null && t !== void 0 ? t : Ri(n, e);
    }
    function Vi(n, e) {
      const t = kr(n, e);
      if (t)
        return t;
      const l = n.substr(e, 1);
      if (e += l.length, l !== "+" && l !== "-" && l !== "~")
        return null;
      const b = Vi(n, e);
      return b ? (e = b.cursor, {
        cursor: e,
        evaluable: new gr(l, b.evaluable)
      }) : null;
    }
    function Ar(n, e, t) {
      t += Rt2(e, t).length;
      const l = n.filter((b) => e.startsWith(b, t))[0];
      return l ? (t += l.length, t += Rt2(e, t).length, {
        cursor: t,
        operator: l
      }) : null;
    }
    function Vt(n, e) {
      return (t, l) => {
        const b = n(t, l);
        if (!b)
          return null;
        l = b.cursor;
        let E = b.evaluable;
        for (; ; ) {
          const k = Ar(e, t, l);
          if (!k)
            break;
          l = k.cursor;
          const j = n(t, l);
          if (!j)
            return null;
          l = j.cursor, E = new br(k.operator, E, j.evaluable);
        }
        return E ? {
          cursor: l,
          evaluable: E
        } : null;
      };
    }
    const ks = [
      ["**"],
      ["*", "/", "%"],
      ["+", "-"],
      ["<<", ">>>", ">>"],
      ["&"],
      ["^"],
      ["|"]
    ].reduce((n, e) => Vt(n, e), Vi);
    function ti(n, e) {
      return e += Rt2(n, e).length, ks(n, e);
    }
    function As(n) {
      const e = ti(n, 0);
      return !e || e.cursor + Rt2(n, e.cursor).length !== n.length ? null : e.evaluable;
    }
    function ct2(n) {
      var e;
      const t = As(n);
      return (e = t == null ? void 0 : t.evaluate()) !== null && e !== void 0 ? e : null;
    }
    function _t(n) {
      if (typeof n == "number")
        return n;
      if (typeof n == "string") {
        const e = ct2(n);
        if (!_2(e))
          return e;
      }
      return 0;
    }
    function Mr(n) {
      return String(n);
    }
    function De(n) {
      return (e) => e.toFixed(Math.max(Math.min(n, 20), 0));
    }
    const Ms = De(0);
    function Cn(n) {
      return Ms(n) + "%";
    }
    function Ii(n) {
      return String(n);
    }
    function Tt(n) {
      return n;
    }
    function Qt({ primary: n, secondary: e, forward: t, backward: l }) {
      let b = false;
      function E(k) {
        b || (b = true, k(), b = false);
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
    function je(n, e) {
      const t = n * (e.altKey ? 0.1 : 1) * (e.shiftKey ? 10 : 1);
      return e.upKey ? +t : e.downKey ? -t : 0;
    }
    function Pn(n) {
      return {
        altKey: n.altKey,
        downKey: n.key === "ArrowDown",
        shiftKey: n.shiftKey,
        upKey: n.key === "ArrowUp"
      };
    }
    function ut2(n) {
      return {
        altKey: n.altKey,
        downKey: n.key === "ArrowLeft",
        shiftKey: n.shiftKey,
        upKey: n.key === "ArrowRight"
      };
    }
    function Ss(n) {
      return n === "ArrowUp" || n === "ArrowDown";
    }
    function ni(n) {
      return Ss(n) || n === "ArrowLeft" || n === "ArrowRight";
    }
    function Di(n, e) {
      var t, l;
      const b = e.ownerDocument.defaultView, E = e.getBoundingClientRect();
      return {
        x: n.pageX - (((t = b && b.scrollX) !== null && t !== void 0 ? t : 0) + E.left),
        y: n.pageY - (((l = b && b.scrollY) !== null && l !== void 0 ? l : 0) + E.top)
      };
    }
    class It {
      constructor(e) {
        this.lastTouch_ = null, this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this), this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this), this.onMouseDown_ = this.onMouseDown_.bind(this), this.onTouchEnd_ = this.onTouchEnd_.bind(this), this.onTouchMove_ = this.onTouchMove_.bind(this), this.onTouchStart_ = this.onTouchStart_.bind(this), this.elem_ = e, this.emitter = new N(), e.addEventListener("touchstart", this.onTouchStart_, {
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
          data: this.computePosition_(Di(e, this.elem_)),
          sender: this,
          shiftKey: e.shiftKey
        });
      }
      onDocumentMouseMove_(e) {
        this.emitter.emit("move", {
          altKey: e.altKey,
          data: this.computePosition_(Di(e, this.elem_)),
          sender: this,
          shiftKey: e.shiftKey
        });
      }
      onDocumentMouseUp_(e) {
        const t = this.elem_.ownerDocument;
        t.removeEventListener("mousemove", this.onDocumentMouseMove_), t.removeEventListener("mouseup", this.onDocumentMouseUp_), this.emitter.emit("up", {
          altKey: e.altKey,
          data: this.computePosition_(Di(e, this.elem_)),
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
    function we(n, e, t, l, b) {
      const E = (n - e) / (t - e);
      return l + E * (b - l);
    }
    function Oi(n) {
      return String(n.toFixed(10)).split(".")[1].replace(/0+$/, "").length;
    }
    function Re2(n, e, t) {
      return Math.min(Math.max(n, e), t);
    }
    function Zt(n, e) {
      return (n % e + e) % e;
    }
    const Ye = D2("txt");
    class Ni {
      constructor(e, t) {
        this.onChange_ = this.onChange_.bind(this), this.props_ = t.props, this.props_.emitter.on("change", this.onChange_), this.element = e.createElement("div"), this.element.classList.add(Ye(), Ye(void 0, "num")), t.arrayPosition && this.element.classList.add(Ye(void 0, t.arrayPosition)), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("input");
        l.classList.add(Ye("i")), l.type = "text", t.viewProps.bindDisabled(l), this.element.appendChild(l), this.inputElement = l, this.onDraggingChange_ = this.onDraggingChange_.bind(this), this.dragging_ = t.dragging, this.dragging_.emitter.on("change", this.onDraggingChange_), this.element.classList.add(Ye()), this.inputElement.classList.add(Ye("i"));
        const b = e.createElement("div");
        b.classList.add(Ye("k")), this.element.appendChild(b), this.knobElement = b;
        const E = e.createElementNS(Ke, "svg");
        E.classList.add(Ye("g")), this.knobElement.appendChild(E);
        const k = e.createElementNS(Ke, "path");
        k.classList.add(Ye("gb")), E.appendChild(k), this.guideBodyElem_ = k;
        const j = e.createElementNS(Ke, "path");
        j.classList.add(Ye("gh")), E.appendChild(j), this.guideHeadElem_ = j;
        const Q2 = e.createElement("div");
        Q2.classList.add(D2("tt")()), this.knobElement.appendChild(Q2), this.tooltipElem_ = Q2, t.value.emitter.on("change", this.onChange_), this.value = t.value, this.refresh();
      }
      onDraggingChange_(e) {
        if (e.rawValue === null) {
          this.element.classList.remove(Ye(void 0, "drg"));
          return;
        }
        this.element.classList.add(Ye(void 0, "drg"));
        const t = e.rawValue / this.props_.get("draggingScale"), l = t + (t > 0 ? -1 : t < 0 ? 1 : 0), b = Re2(-l, -4, 4);
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
    class Tn {
      constructor(e, t) {
        var l;
        this.originRawValue_ = 0, this.onInputChange_ = this.onInputChange_.bind(this), this.onInputKeyDown_ = this.onInputKeyDown_.bind(this), this.onInputKeyUp_ = this.onInputKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.baseStep_ = t.baseStep, this.parser_ = t.parser, this.props = t.props, this.sliderProps_ = (l = t.sliderProps) !== null && l !== void 0 ? l : null, this.value = t.value, this.viewProps = t.viewProps, this.dragging_ = ee(null), this.view = new Ni(e, {
          arrayPosition: t.arrayPosition,
          dragging: this.dragging_,
          props: this.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_), this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_), this.view.inputElement.addEventListener("keyup", this.onInputKeyUp_);
        const b = new It(this.view.knobElement);
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
        _2(b) || (this.value.rawValue = this.constrainValue_(b)), this.view.refresh();
      }
      onInputKeyDown_(e) {
        const t = je(this.baseStep_, Pn(e));
        t !== 0 && this.value.setRawValue(this.constrainValue_(this.value.rawValue + t), {
          forceEmit: false,
          last: false
        });
      }
      onInputKeyUp_(e) {
        je(this.baseStep_, Pn(e)) !== 0 && this.value.setRawValue(this.value.rawValue, {
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
    const Bi = D2("sld");
    class qe {
      constructor(e, t) {
        this.onChange_ = this.onChange_.bind(this), this.props_ = t.props, this.props_.emitter.on("change", this.onChange_), this.element = e.createElement("div"), this.element.classList.add(Bi()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(Bi("t")), t.viewProps.bindTabIndex(l), this.element.appendChild(l), this.trackElement = l;
        const b = e.createElement("div");
        b.classList.add(Bi("k")), this.trackElement.appendChild(b), this.knobElement = b, t.value.emitter.on("change", this.onChange_), this.value = t.value, this.update_();
      }
      update_() {
        const e = Re2(we(this.value.rawValue, this.props_.get("minValue"), this.props_.get("maxValue"), 0, 100), 0, 100);
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
        }), this.ptHandler_ = new It(this.view.trackElement), this.ptHandler_.emitter.on("down", this.onPointerDownOrMove_), this.ptHandler_.emitter.on("move", this.onPointerDownOrMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.trackElement.addEventListener("keydown", this.onKeyDown_), this.view.trackElement.addEventListener("keyup", this.onKeyUp_);
      }
      handlePointerEvent_(e, t) {
        e.point && this.value.setRawValue(we(Re2(e.point.x, 0, e.bounds.width), 0, e.bounds.width, this.props.get("minValue"), this.props.get("maxValue")), t);
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
        const t = je(this.baseStep_, ut2(e));
        t !== 0 && this.value.setRawValue(this.value.rawValue + t, {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(e) {
        je(this.baseStep_, ut2(e)) !== 0 && this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    const kn = D2("sldtxt");
    class ji {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(kn());
        const l = e.createElement("div");
        l.classList.add(kn("s")), this.sliderView_ = t.sliderView, l.appendChild(this.sliderView_.element), this.element.appendChild(l);
        const b = e.createElement("div");
        b.classList.add(kn("t")), this.textView_ = t.textView, b.appendChild(this.textView_.element), this.element.appendChild(b);
      }
    }
    class ii {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.sliderC_ = new Fi(e, {
          baseStep: t.baseStep,
          props: t.sliderProps,
          value: t.value,
          viewProps: this.viewProps
        }), this.textC_ = new Tn(e, {
          baseStep: t.baseStep,
          parser: t.parser,
          props: t.textProps,
          sliderProps: t.sliderProps,
          value: t.value,
          viewProps: t.viewProps
        }), this.view = new ji(e, {
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
    function st2(n, e) {
      n.write(e);
    }
    function An(n) {
      const e = A2;
      if (Array.isArray(n))
        return e.required.array(e.required.object({
          text: e.required.string,
          value: e.required.raw
        }))(n).value;
      if (typeof n == "object")
        return e.required.raw(n).value;
    }
    function zi(n) {
      if (n === "inline" || n === "popup")
        return n;
    }
    function wt2(n) {
      const e = A2;
      return e.required.object({
        max: e.optional.number,
        min: e.optional.number,
        step: e.optional.number
      })(n).value;
    }
    function Ls(n) {
      if (Array.isArray(n))
        return n;
      const e = [];
      return Object.keys(n).forEach((t) => {
        e.push({ text: t, value: n[t] });
      }), e;
    }
    function Ui(n) {
      return _2(n) ? null : new yn(Ls(n));
    }
    function Sr(n) {
      const e = n ? it2(n, Jn) : null;
      return e ? e.step : null;
    }
    function si(n, e) {
      const t = n && it2(n, Jn);
      return t ? Oi(t.step) : Math.max(Oi(e), 2);
    }
    function Dt(n) {
      const e = Sr(n);
      return e ?? 1;
    }
    function Ot(n, e) {
      var t;
      const l = n && it2(n, Jn), b = Math.abs((t = l == null ? void 0 : l.step) !== null && t !== void 0 ? t : e);
      return b === 0 ? 0.1 : Math.pow(10, Math.floor(Math.log10(b)) - 1);
    }
    const Mn = D2("ckb");
    class Sn {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.element = e.createElement("div"), this.element.classList.add(Mn()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("label");
        l.classList.add(Mn("l")), this.element.appendChild(l);
        const b = e.createElement("input");
        b.classList.add(Mn("i")), b.type = "checkbox", l.appendChild(b), this.inputElement = b, t.viewProps.bindDisabled(this.inputElement);
        const E = e.createElement("div");
        E.classList.add(Mn("w")), l.appendChild(E);
        const k = Et2(e, "check");
        E.appendChild(k), t.value.emitter.on("change", this.onValueChange_), this.value = t.value, this.update_();
      }
      update_() {
        this.inputElement.checked = this.value.rawValue;
      }
      onValueChange_() {
        this.update_();
      }
    }
    class Rs {
      constructor(e, t) {
        this.onInputChange_ = this.onInputChange_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.view = new Sn(e, {
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_);
      }
      onInputChange_(e) {
        const t = e.currentTarget;
        this.value.rawValue = t.checked;
      }
    }
    function Vs(n) {
      const e = [], t = Ui(n.options);
      return t && e.push(t), new wn(e);
    }
    const ri = {
      id: "input-bool",
      type: "input",
      accept: (n, e) => {
        if (typeof n != "boolean")
          return null;
        const l = ae(e, {
          options: A2.optional.custom(An)
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => ws,
        constraint: (n) => Vs(n.params),
        writer: (n) => st2
      },
      controller: (n) => {
        const e = n.document, t = n.value, l = n.constraint, b = l && it2(l, yn);
        return b ? new xn(e, {
          props: new X2({
            options: b.values.value("options")
          }),
          value: t,
          viewProps: n.viewProps
        }) : new Rs(e, {
          value: t,
          viewProps: n.viewProps
        });
      }
    }, Nt = D2("col");
    class Gi {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(Nt()), t.foldable.bindExpandedClass(this.element, Nt(void 0, "expanded")), B(t.foldable, "completed", K2(this.element, Nt(void 0, "cpl")));
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
    function Lr(n, e, t) {
      const l = Re2(n / 255, 0, 1), b = Re2(e / 255, 0, 1), E = Re2(t / 255, 0, 1), k = Math.max(l, b, E), j = Math.min(l, b, E), Q2 = k - j;
      let J = 0, de = 0;
      const ve = (j + k) / 2;
      return Q2 !== 0 && (de = Q2 / (1 - Math.abs(k + j - 1)), l === k ? J = (b - E) / Q2 : b === k ? J = 2 + (E - l) / Q2 : J = 4 + (l - b) / Q2, J = J / 6 + (J < 0 ? 1 : 0)), [J * 360, de * 100, ve * 100];
    }
    function Rr(n, e, t) {
      const l = (n % 360 + 360) % 360, b = Re2(e / 100, 0, 1), E = Re2(t / 100, 0, 1), k = (1 - Math.abs(2 * E - 1)) * b, j = k * (1 - Math.abs(l / 60 % 2 - 1)), Q2 = E - k / 2;
      let J, de, ve;
      return l >= 0 && l < 60 ? [J, de, ve] = [k, j, 0] : l >= 60 && l < 120 ? [J, de, ve] = [j, k, 0] : l >= 120 && l < 180 ? [J, de, ve] = [0, k, j] : l >= 180 && l < 240 ? [J, de, ve] = [0, j, k] : l >= 240 && l < 300 ? [J, de, ve] = [j, 0, k] : [J, de, ve] = [k, 0, j], [(J + Q2) * 255, (de + Q2) * 255, (ve + Q2) * 255];
    }
    function Vr(n, e, t) {
      const l = Re2(n / 255, 0, 1), b = Re2(e / 255, 0, 1), E = Re2(t / 255, 0, 1), k = Math.max(l, b, E), j = Math.min(l, b, E), Q2 = k - j;
      let J;
      Q2 === 0 ? J = 0 : k === l ? J = 60 * (((b - E) / Q2 % 6 + 6) % 6) : k === b ? J = 60 * ((E - l) / Q2 + 2) : J = 60 * ((l - b) / Q2 + 4);
      const de = k === 0 ? 0 : Q2 / k, ve = k;
      return [J, de * 100, ve * 100];
    }
    function Is(n, e, t) {
      const l = Zt(n, 360), b = Re2(e / 100, 0, 1), E = Re2(t / 100, 0, 1), k = E * b, j = k * (1 - Math.abs(l / 60 % 2 - 1)), Q2 = E - k;
      let J, de, ve;
      return l >= 0 && l < 60 ? [J, de, ve] = [k, j, 0] : l >= 60 && l < 120 ? [J, de, ve] = [j, k, 0] : l >= 120 && l < 180 ? [J, de, ve] = [0, k, j] : l >= 180 && l < 240 ? [J, de, ve] = [0, j, k] : l >= 240 && l < 300 ? [J, de, ve] = [j, 0, k] : [J, de, ve] = [k, 0, j], [(J + Q2) * 255, (de + Q2) * 255, (ve + Q2) * 255];
    }
    function d(n, e, t) {
      const l = t + e * (100 - Math.abs(2 * t - 100)) / 200;
      return [
        n,
        l !== 0 ? e * (100 - Math.abs(2 * t - 100)) / l : 0,
        t + e * (100 - Math.abs(2 * t - 100)) / (2 * 100)
      ];
    }
    function a(n, e, t) {
      const l = 100 - Math.abs(t * (200 - e) / 100 - 100);
      return [n, l !== 0 ? e * t / l : 0, t * (200 - e) / (2 * 100)];
    }
    function u(n) {
      return [n[0], n[1], n[2]];
    }
    function v(n, e) {
      return [n[0], n[1], n[2], e];
    }
    const x = {
      hsl: {
        hsl: (n, e, t) => [n, e, t],
        hsv: d,
        rgb: Rr
      },
      hsv: {
        hsl: a,
        hsv: (n, e, t) => [n, e, t],
        rgb: Is
      },
      rgb: {
        hsl: Lr,
        hsv: Vr,
        rgb: (n, e, t) => [n, e, t]
      }
    };
    function T(n, e) {
      return [
        e === "float" ? 1 : n === "rgb" ? 255 : 360,
        e === "float" ? 1 : n === "rgb" ? 255 : 100,
        e === "float" ? 1 : n === "rgb" ? 255 : 100
      ];
    }
    function V2(n, e) {
      return n === e ? e : Zt(n, e);
    }
    function z(n, e, t) {
      var l;
      const b = T(e, t);
      return [
        e === "rgb" ? Re2(n[0], 0, b[0]) : V2(n[0], b[0]),
        Re2(n[1], 0, b[1]),
        Re2(n[2], 0, b[2]),
        Re2((l = n[3]) !== null && l !== void 0 ? l : 1, 0, 1)
      ];
    }
    function re(n, e, t, l) {
      const b = T(e, t), E = T(e, l);
      return n.map((k, j) => k / b[j] * E[j]);
    }
    function et2(n, e, t) {
      const l = re(n, e.mode, e.type, "int"), b = x[e.mode][t.mode](...l);
      return re(b, t.mode, "int", t.type);
    }
    function tt2(n, e) {
      return typeof n != "object" || _2(n) ? false : e in n && typeof n[e] == "number";
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
        return tt2(e, "r") && tt2(e, "g") && tt2(e, "b");
      }
      static isRgbaColorObject(e) {
        return this.isRgbColorObject(e) && tt2(e, "a");
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
        return v(et2(u(this.comps_), { mode: this.mode, type: this.type }, { mode: e ?? this.mode, type: t }), this.comps_[3]);
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
    class Ir {
      constructor(e, t) {
        this.alphaViews_ = null, this.element = e.createElement("div"), this.element.classList.add(kt()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(kt("hsv"));
        const b = e.createElement("div");
        b.classList.add(kt("sv")), this.svPaletteView_ = t.svPaletteView, b.appendChild(this.svPaletteView_.element), l.appendChild(b);
        const E = e.createElement("div");
        E.classList.add(kt("h")), this.hPaletteView_ = t.hPaletteView, E.appendChild(this.hPaletteView_.element), l.appendChild(E), this.element.appendChild(l);
        const k = e.createElement("div");
        if (k.classList.add(kt("rgb")), this.textView_ = t.textView, k.appendChild(this.textView_.element), this.element.appendChild(k), t.alphaViews) {
          this.alphaViews_ = {
            palette: t.alphaViews.palette,
            text: t.alphaViews.text
          };
          const j = e.createElement("div");
          j.classList.add(kt("a"));
          const Q2 = e.createElement("div");
          Q2.classList.add(kt("ap")), Q2.appendChild(this.alphaViews_.palette.element), j.appendChild(Q2);
          const J = e.createElement("div");
          J.classList.add(kt("at")), J.appendChild(this.alphaViews_.text.element), j.appendChild(J), this.element.appendChild(j);
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
    function ll(n) {
      return n === "int" ? "int" : n === "float" ? "float" : void 0;
    }
    function Dr(n) {
      const e = A2;
      return ae(n, {
        alpha: e.optional.boolean,
        color: e.optional.object({
          alpha: e.optional.boolean,
          type: e.optional.custom(ll)
        }),
        expanded: e.optional.boolean,
        picker: e.optional.custom(zi)
      });
    }
    function Ln(n) {
      return n ? 0.1 : 1;
    }
    function Rn(n) {
      var e;
      return (e = n.color) === null || e === void 0 ? void 0 : e.type;
    }
    function cl(n, e) {
      return n.alpha === e.alpha && n.mode === e.mode && n.notation === e.notation && n.type === e.type;
    }
    function pt2(n, e) {
      const t = n.match(/^(.+)%$/);
      return Math.min(t ? parseFloat(t[1]) * 0.01 * e : parseFloat(n), e);
    }
    const ul = {
      deg: (n) => n,
      grad: (n) => n * 360 / 400,
      rad: (n) => n * 360 / (2 * Math.PI),
      turn: (n) => n * 360
    };
    function Ao(n) {
      const e = n.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);
      if (!e)
        return parseFloat(n);
      const t = parseFloat(e[1]), l = e[2];
      return ul[l](t);
    }
    function Mo(n) {
      const e = n.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
      if (!e)
        return null;
      const t = [
        pt2(e[1], 255),
        pt2(e[2], 255),
        pt2(e[3], 255)
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) ? null : t;
    }
    function So(n) {
      return (e) => {
        const t = Mo(e);
        return t ? new te(t, "rgb", n) : null;
      };
    }
    function Lo(n) {
      const e = n.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
      if (!e)
        return null;
      const t = [
        pt2(e[1], 255),
        pt2(e[2], 255),
        pt2(e[3], 255),
        pt2(e[4], 1)
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) || isNaN(t[3]) ? null : t;
    }
    function Ro(n) {
      return (e) => {
        const t = Lo(e);
        return t ? new te(t, "rgb", n) : null;
      };
    }
    function Vo(n) {
      const e = n.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
      if (!e)
        return null;
      const t = [
        Ao(e[1]),
        pt2(e[2], 100),
        pt2(e[3], 100)
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) ? null : t;
    }
    function Io(n) {
      return (e) => {
        const t = Vo(e);
        return t ? new te(t, "hsl", n) : null;
      };
    }
    function Do(n) {
      const e = n.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
      if (!e)
        return null;
      const t = [
        Ao(e[1]),
        pt2(e[2], 100),
        pt2(e[3], 100),
        pt2(e[4], 1)
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) || isNaN(t[3]) ? null : t;
    }
    function Oo(n) {
      return (e) => {
        const t = Do(e);
        return t ? new te(t, "hsl", n) : null;
      };
    }
    function No(n) {
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
    function pl(n) {
      const e = No(n);
      return e ? new te(e, "rgb", "int") : null;
    }
    function Bo(n) {
      const e = n.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
      if (e)
        return [
          parseInt(e[1] + e[1], 16),
          parseInt(e[2] + e[2], 16),
          parseInt(e[3] + e[3], 16),
          we(parseInt(e[4] + e[4], 16), 0, 255, 0, 1)
        ];
      const t = n.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
      return t ? [
        parseInt(t[1], 16),
        parseInt(t[2], 16),
        parseInt(t[3], 16),
        we(parseInt(t[4], 16), 0, 255, 0, 1)
      ] : null;
    }
    function hl(n) {
      const e = Bo(n);
      return e ? new te(e, "rgb", "int") : null;
    }
    function Fo(n) {
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
    function jo(n) {
      return (e) => {
        const t = Fo(e);
        return t ? new te(t, "rgb", n) : null;
      };
    }
    function zo(n) {
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
    function Uo(n) {
      return (e) => {
        const t = zo(e);
        return t ? new te(t, "rgb", n) : null;
      };
    }
    const dl = [
      {
        parser: No,
        result: {
          alpha: false,
          mode: "rgb",
          notation: "hex"
        }
      },
      {
        parser: Bo,
        result: {
          alpha: true,
          mode: "rgb",
          notation: "hex"
        }
      },
      {
        parser: Mo,
        result: {
          alpha: false,
          mode: "rgb",
          notation: "func"
        }
      },
      {
        parser: Lo,
        result: {
          alpha: true,
          mode: "rgb",
          notation: "func"
        }
      },
      {
        parser: Vo,
        result: {
          alpha: false,
          mode: "hsl",
          notation: "func"
        }
      },
      {
        parser: Do,
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
        parser: zo,
        result: {
          alpha: true,
          mode: "rgb",
          notation: "object"
        }
      }
    ];
    function ml(n) {
      return dl.reduce((e, { parser: t, result: l }) => e || (t(n) ? l : null), null);
    }
    function Or(n, e = "int") {
      const t = ml(n);
      return t ? t.notation === "hex" && e !== "float" ? Object.assign(Object.assign({}, t), { type: "int" }) : t.notation === "func" ? Object.assign(Object.assign({}, t), { type: e }) : null : null;
    }
    const Go = {
      int: [
        pl,
        hl,
        So("int"),
        Ro("int"),
        Io("int"),
        Oo("int"),
        jo("int"),
        Uo("int")
      ],
      float: [
        So("float"),
        Ro("float"),
        Io("float"),
        Oo("float"),
        jo("float"),
        Uo("float")
      ]
    };
    function fl(n) {
      const e = Go[n];
      return (t) => {
        if (typeof t != "string")
          return te.black(n);
        const l = e.reduce((b, E) => b || E(t), null);
        return l ?? te.black(n);
      };
    }
    function Nr(n) {
      const e = Go[n];
      return (t) => e.reduce((l, b) => l || b(t), null);
    }
    function Ho(n) {
      const e = Re2(Math.floor(n), 0, 255).toString(16);
      return e.length === 1 ? `0${e}` : e;
    }
    function Ko(n, e = "#") {
      const t = u(n.getComponents("rgb")).map(Ho).join("");
      return `${e}${t}`;
    }
    function Br(n, e = "#") {
      const t = n.getComponents("rgb"), l = [t[0], t[1], t[2], t[3] * 255].map(Ho).join("");
      return `${e}${l}`;
    }
    function $o(n, e) {
      const t = De(e === "float" ? 2 : 0);
      return `rgb(${u(n.getComponents("rgb", e)).map((b) => t(b)).join(", ")})`;
    }
    function vl(n) {
      return (e) => $o(e, n);
    }
    function Ds(n, e) {
      const t = De(2), l = De(e === "float" ? 2 : 0);
      return `rgba(${n.getComponents("rgb", e).map((E, k) => (k === 3 ? t : l)(E)).join(", ")})`;
    }
    function bl(n) {
      return (e) => Ds(e, n);
    }
    function gl(n) {
      const e = [
        De(0),
        Cn,
        Cn
      ];
      return `hsl(${u(n.getComponents("hsl")).map((l, b) => e[b](l)).join(", ")})`;
    }
    function _l(n) {
      const e = [
        De(0),
        Cn,
        Cn,
        De(2)
      ];
      return `hsla(${n.getComponents("hsl").map((l, b) => e[b](l)).join(", ")})`;
    }
    function Xo(n, e) {
      const t = De(e === "float" ? 2 : 0), l = ["r", "g", "b"];
      return `{${u(n.getComponents("rgb", e)).map((E, k) => `${l[k]}: ${t(E)}`).join(", ")}}`;
    }
    function wl(n) {
      return (e) => Xo(e, n);
    }
    function Yo(n, e) {
      const t = De(2), l = De(e === "float" ? 2 : 0), b = ["r", "g", "b", "a"];
      return `{${n.getComponents("rgb", e).map((k, j) => {
        const Q2 = j === 3 ? t : l;
        return `${b[j]}: ${Q2(k)}`;
      }).join(", ")}}`;
    }
    function yl(n) {
      return (e) => Yo(e, n);
    }
    const xl = [
      {
        format: {
          alpha: false,
          mode: "rgb",
          notation: "hex",
          type: "int"
        },
        stringifier: Ko
      },
      {
        format: {
          alpha: true,
          mode: "rgb",
          notation: "hex",
          type: "int"
        },
        stringifier: Br
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
      ...["int", "float"].reduce((n, e) => [
        ...n,
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
    function Fr(n) {
      return xl.reduce((e, t) => e || (cl(t.format, n) ? t.stringifier : null), null);
    }
    const Hi = D2("apl");
    class El {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.value = t.value, this.value.emitter.on("change", this.onValueChange_), this.element = e.createElement("div"), this.element.classList.add(Hi()), t.viewProps.bindClassModifiers(this.element), t.viewProps.bindTabIndex(this.element);
        const l = e.createElement("div");
        l.classList.add(Hi("b")), this.element.appendChild(l);
        const b = e.createElement("div");
        b.classList.add(Hi("c")), l.appendChild(b), this.colorElem_ = b;
        const E = e.createElement("div");
        E.classList.add(Hi("m")), this.element.appendChild(E), this.markerElem_ = E;
        const k = e.createElement("div");
        k.classList.add(Hi("p")), this.markerElem_.appendChild(k), this.previewElem_ = k, this.update_();
      }
      update_() {
        const e = this.value.rawValue, t = e.getComponents("rgb"), l = new te([t[0], t[1], t[2], 0], "rgb"), b = new te([t[0], t[1], t[2], 255], "rgb"), E = [
          "to right",
          Ds(l),
          Ds(b)
        ];
        this.colorElem_.style.background = `linear-gradient(${E.join(",")})`, this.previewElem_.style.backgroundColor = Ds(e);
        const k = we(t[3], 0, 1, 0, 100);
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
        }), this.ptHandler_ = new It(this.view.element), this.ptHandler_.emitter.on("down", this.onPointerDown_), this.ptHandler_.emitter.on("move", this.onPointerMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.element.addEventListener("keydown", this.onKeyDown_), this.view.element.addEventListener("keyup", this.onKeyUp_);
      }
      handlePointerEvent_(e, t) {
        if (!e.point)
          return;
        const l = e.point.x / e.bounds.width, b = this.value.rawValue, [E, k, j] = b.getComponents("hsv");
        this.value.setRawValue(new te([E, k, j, l], "hsv"), t);
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
        const t = je(Ln(true), ut2(e));
        if (t === 0)
          return;
        const l = this.value.rawValue, [b, E, k, j] = l.getComponents("hsv");
        this.value.setRawValue(new te([b, E, k, j + t], "hsv"), {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(e) {
        je(Ln(true), ut2(e)) !== 0 && this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    const oi = D2("coltxt");
    function Pl(n) {
      const e = n.createElement("select"), t = [
        { text: "RGB", value: "rgb" },
        { text: "HSL", value: "hsl" },
        { text: "HSV", value: "hsv" }
      ];
      return e.appendChild(t.reduce((l, b) => {
        const E = n.createElement("option");
        return E.textContent = b.text, E.value = b.value, l.appendChild(E), l;
      }, n.createDocumentFragment())), e;
    }
    class Tl {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(oi()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(oi("m")), this.modeElem_ = Pl(e), this.modeElem_.classList.add(oi("ms")), l.appendChild(this.modeSelectElement), t.viewProps.bindDisabled(this.modeElem_);
        const b = e.createElement("div");
        b.classList.add(oi("mm")), b.appendChild(Et2(e, "dropdown")), l.appendChild(b), this.element.appendChild(l);
        const E = e.createElement("div");
        E.classList.add(oi("w")), this.element.appendChild(E), this.textsElem_ = E, this.textViews_ = t.textViews, this.applyTextViews_(), F(t.colorMode, (k) => {
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
        mn(this.textsElem_);
        const e = this.element.ownerDocument;
        this.textViews_.forEach((t) => {
          const l = e.createElement("div");
          l.classList.add(oi("c")), l.appendChild(t.element), this.textsElem_.appendChild(l);
        });
      }
    }
    function kl(n) {
      return De(n === "float" ? 2 : 0);
    }
    function Al(n, e, t) {
      const l = T(n, e)[t];
      return new Yt({
        min: 0,
        max: l
      });
    }
    function jr(n, e, t) {
      return new Tn(n, {
        arrayPosition: t === 0 ? "fst" : t === 3 - 1 ? "lst" : "mid",
        baseStep: Ln(false),
        parser: e.parser,
        props: X2.fromObject({
          draggingScale: e.colorType === "float" ? 0.01 : 1,
          formatter: kl(e.colorType)
        }),
        value: ee(0, {
          constraint: Al(e.colorMode, e.colorType, t)
        }),
        viewProps: e.viewProps
      });
    }
    class Ml {
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
          Qt({
            primary: this.value,
            secondary: b.value,
            forward: (k) => k.rawValue.getComponents(this.colorMode.rawValue, this.colorType_)[E],
            backward: (k, j) => {
              const Q2 = this.colorMode.rawValue, J = k.rawValue.getComponents(Q2, this.colorType_);
              return J[E] = j.rawValue, new te(v(u(J), J[3]), Q2, this.colorType_);
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
    class Sl {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.value = t.value, this.value.emitter.on("change", this.onValueChange_), this.element = e.createElement("div"), this.element.classList.add(zr()), t.viewProps.bindClassModifiers(this.element), t.viewProps.bindTabIndex(this.element);
        const l = e.createElement("div");
        l.classList.add(zr("c")), this.element.appendChild(l);
        const b = e.createElement("div");
        b.classList.add(zr("m")), this.element.appendChild(b), this.markerElem_ = b, this.update_();
      }
      update_() {
        const e = this.value.rawValue, [t] = e.getComponents("hsv");
        this.markerElem_.style.backgroundColor = $o(new te([t, 100, 100], "hsv"));
        const l = we(t, 0, 360, 0, 100);
        this.markerElem_.style.left = `${l}%`;
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
        }), this.ptHandler_ = new It(this.view.element), this.ptHandler_.emitter.on("down", this.onPointerDown_), this.ptHandler_.emitter.on("move", this.onPointerMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.element.addEventListener("keydown", this.onKeyDown_), this.view.element.addEventListener("keyup", this.onKeyUp_);
      }
      handlePointerEvent_(e, t) {
        if (!e.point)
          return;
        const l = we(Re2(e.point.x, 0, e.bounds.width), 0, e.bounds.width, 0, 360), b = this.value.rawValue, [, E, k, j] = b.getComponents("hsv");
        this.value.setRawValue(new te([l, E, k, j], "hsv"), t);
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
        const t = je(Ln(false), ut2(e));
        if (t === 0)
          return;
        const l = this.value.rawValue, [b, E, k, j] = l.getComponents("hsv");
        this.value.setRawValue(new te([b + t, E, k, j], "hsv"), {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(e) {
        je(Ln(false), ut2(e)) !== 0 && this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    const Ur = D2("svp"), qo = 64;
    class Rl {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.value = t.value, this.value.emitter.on("change", this.onValueChange_), this.element = e.createElement("div"), this.element.classList.add(Ur()), t.viewProps.bindClassModifiers(this.element), t.viewProps.bindTabIndex(this.element);
        const l = e.createElement("canvas");
        l.height = qo, l.width = qo, l.classList.add(Ur("c")), this.element.appendChild(l), this.canvasElement = l;
        const b = e.createElement("div");
        b.classList.add(Ur("m")), this.element.appendChild(b), this.markerElem_ = b, this.update_();
      }
      update_() {
        const e = Kn(this.canvasElement);
        if (!e)
          return;
        const l = this.value.rawValue.getComponents("hsv"), b = this.canvasElement.width, E = this.canvasElement.height, k = e.getImageData(0, 0, b, E), j = k.data;
        for (let de = 0; de < E; de++)
          for (let ve = 0; ve < b; ve++) {
            const Vn = we(ve, 0, b, 0, 100), $i = we(de, 0, E, 100, 0), Xi = Is(l[0], Vn, $i), Os = (de * b + ve) * 4;
            j[Os] = Xi[0], j[Os + 1] = Xi[1], j[Os + 2] = Xi[2], j[Os + 3] = 255;
          }
        e.putImageData(k, 0, 0);
        const Q2 = we(l[1], 0, 100, 0, 100);
        this.markerElem_.style.left = `${Q2}%`;
        const J = we(l[2], 0, 100, 100, 0);
        this.markerElem_.style.top = `${J}%`;
      }
      onValueChange_() {
        this.update_();
      }
    }
    class Vl {
      constructor(e, t) {
        this.onKeyDown_ = this.onKeyDown_.bind(this), this.onKeyUp_ = this.onKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.view = new Rl(e, {
          value: this.value,
          viewProps: this.viewProps
        }), this.ptHandler_ = new It(this.view.element), this.ptHandler_.emitter.on("down", this.onPointerDown_), this.ptHandler_.emitter.on("move", this.onPointerMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.element.addEventListener("keydown", this.onKeyDown_), this.view.element.addEventListener("keyup", this.onKeyUp_);
      }
      handlePointerEvent_(e, t) {
        if (!e.point)
          return;
        const l = we(e.point.x, 0, e.bounds.width, 0, 100), b = we(e.point.y, 0, e.bounds.height, 100, 0), [E, , , k] = this.value.rawValue.getComponents("hsv");
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
        ni(e.key) && e.preventDefault();
        const [t, l, b, E] = this.value.rawValue.getComponents("hsv"), k = Ln(false), j = je(k, ut2(e)), Q2 = je(k, Pn(e));
        j === 0 && Q2 === 0 || this.value.setRawValue(new te([t, l + j, b + Q2, E], "hsv"), {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(e) {
        const t = Ln(false), l = je(t, ut2(e)), b = je(t, Pn(e));
        l === 0 && b === 0 || this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    class Il {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.hPaletteC_ = new Ll(e, {
          value: this.value,
          viewProps: this.viewProps
        }), this.svPaletteC_ = new Vl(e, {
          value: this.value,
          viewProps: this.viewProps
        }), this.alphaIcs_ = t.supportsAlpha ? {
          palette: new Cl(e, {
            value: this.value,
            viewProps: this.viewProps
          }),
          text: new Tn(e, {
            parser: ct2,
            baseStep: 0.1,
            props: X2.fromObject({
              draggingScale: 0.01,
              formatter: De(2)
            }),
            value: ee(0, {
              constraint: new Yt({ min: 0, max: 1 })
            }),
            viewProps: this.viewProps
          })
        } : null, this.alphaIcs_ && Qt({
          primary: this.value,
          secondary: this.alphaIcs_.text.value,
          forward: (l) => l.rawValue.getComponents()[3],
          backward: (l, b) => {
            const E = l.rawValue.getComponents();
            return E[3] = b.rawValue, new te(E, l.rawValue.mode);
          }
        }), this.textC_ = new Ml(e, {
          colorType: t.colorType,
          parser: ct2,
          value: this.value,
          viewProps: this.viewProps
        }), this.view = new Ir(e, {
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
        this.swatchElem_.style.backgroundColor = Br(e);
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
        this.onButtonBlur_ = this.onButtonBlur_.bind(this), this.onButtonClick_ = this.onButtonClick_.bind(this), this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this), this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.foldable_ = Fe.create(t.expanded), this.swatchC_ = new Ol(e, {
          value: this.value,
          viewProps: this.viewProps
        });
        const l = this.swatchC_.view.buttonElement;
        l.addEventListener("blur", this.onButtonBlur_), l.addEventListener("click", this.onButtonClick_), this.textC_ = new ei(e, {
          parser: t.parser,
          props: X2.fromObject({
            formatter: t.formatter
          }),
          value: this.value,
          viewProps: this.viewProps
        }), this.view = new Gi(e, {
          foldable: this.foldable_,
          pickerLayout: t.pickerLayout
        }), this.view.swatchElement.appendChild(this.swatchC_.view.element), this.view.textElement.appendChild(this.textC_.view.element), this.popC_ = t.pickerLayout === "popup" ? new gs(e, {
          viewProps: this.viewProps
        }) : null;
        const b = new Il(e, {
          colorType: t.colorType,
          supportsAlpha: t.supportsAlpha,
          value: this.value,
          viewProps: this.viewProps
        });
        b.view.allFocusableElements.forEach((E) => {
          E.addEventListener("blur", this.onPopupChildBlur_), E.addEventListener("keydown", this.onPopupChildKeydown_);
        }), this.pickerC_ = b, this.popC_ ? (this.view.element.appendChild(this.popC_.view.element), this.popC_.view.element.appendChild(b.view.element), Qt({
          primary: this.foldable_.value("expanded"),
          secondary: this.popC_.shows,
          forward: (E) => E.rawValue,
          backward: (E, k) => k.rawValue
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
        l && t.contains(l) || l && l === this.swatchC_.view.buttonElement && !bt2(t.ownerDocument) || (this.popC_.shows.rawValue = false);
      }
      onPopupChildKeydown_(e) {
        this.popC_ ? e.key === "Escape" && (this.popC_.shows.rawValue = false) : this.view.pickerElement && e.key === "Escape" && this.swatchC_.view.buttonElement.focus();
      }
    }
    function Nl(n, e) {
      return te.isColorObject(n) ? te.fromObject(n, e) : te.black(e);
    }
    function Bl(n) {
      return u(n.getComponents("rgb")).reduce((e, t) => e << 8 | Math.floor(t) & 255, 0);
    }
    function Fl(n) {
      return n.getComponents("rgb").reduce((e, t, l) => {
        const b = Math.floor(l === 3 ? t * 255 : t) & 255;
        return e << 8 | b;
      }, 0) >>> 0;
    }
    function jl(n) {
      return new te([n >> 16 & 255, n >> 8 & 255, n & 255], "rgb");
    }
    function zl(n) {
      return new te([
        n >> 24 & 255,
        n >> 16 & 255,
        n >> 8 & 255,
        we(n & 255, 0, 255, 0, 1)
      ], "rgb");
    }
    function Ul(n) {
      return typeof n != "number" ? te.black() : jl(n);
    }
    function Gl(n) {
      return typeof n != "number" ? te.black() : zl(n);
    }
    function Hl(n) {
      const e = Fr(n);
      return e ? (t, l) => {
        st2(t, e(l));
      } : null;
    }
    function Kl(n) {
      const e = n ? Fl : Bl;
      return (t, l) => {
        st2(t, e(l));
      };
    }
    function $l(n, e, t) {
      const l = e.toRgbaObject(t);
      n.writeProperty("r", l.r), n.writeProperty("g", l.g), n.writeProperty("b", l.b), n.writeProperty("a", l.a);
    }
    function Xl(n, e, t) {
      const l = e.toRgbaObject(t);
      n.writeProperty("r", l.r), n.writeProperty("g", l.g), n.writeProperty("b", l.b);
    }
    function Yl(n, e) {
      return (t, l) => {
        n ? $l(t, l, e) : Xl(t, l, e);
      };
    }
    function Kr(n) {
      var e;
      return !!(n != null && n.alpha || !((e = n == null ? void 0 : n.color) === null || e === void 0) && e.alpha);
    }
    function ql(n) {
      return n ? (e) => Br(e, "0x") : (e) => Ko(e, "0x");
    }
    function Ql(n) {
      return "color" in n || "view" in n && n.view === "color";
    }
    const Zl = {
      id: "input-color-number",
      type: "input",
      accept: (n, e) => {
        if (typeof n != "number" || !Ql(e))
          return null;
        const t = Dr(e);
        return t ? {
          initialValue: n,
          params: t
        } : null;
      },
      binding: {
        reader: (n) => Kr(n.params) ? Gl : Ul,
        equals: te.equals,
        writer: (n) => Kl(Kr(n.params))
      },
      controller: (n) => {
        const e = Kr(n.params), t = "expanded" in n.params ? n.params.expanded : void 0, l = "picker" in n.params ? n.params.picker : void 0;
        return new Hr(n.document, {
          colorType: "int",
          expanded: t ?? false,
          formatter: ql(e),
          parser: Nr("int"),
          pickerLayout: l ?? "popup",
          supportsAlpha: e,
          value: n.value,
          viewProps: n.viewProps
        });
      }
    };
    function Wl(n) {
      return te.isRgbaColorObject(n);
    }
    function Jl(n) {
      return (e) => Nl(e, n);
    }
    function ec(n, e) {
      return (t) => n ? Yo(t, e) : Xo(t, e);
    }
    const tc = {
      id: "input-color-object",
      type: "input",
      accept: (n, e) => {
        if (!te.isColorObject(n))
          return null;
        const t = Dr(e);
        return t ? {
          initialValue: n,
          params: t
        } : null;
      },
      binding: {
        reader: (n) => Jl(Rn(n.params)),
        equals: te.equals,
        writer: (n) => Yl(Wl(n.initialValue), Rn(n.params))
      },
      controller: (n) => {
        var e;
        const t = te.isRgbaColorObject(n.initialValue), l = "expanded" in n.params ? n.params.expanded : void 0, b = "picker" in n.params ? n.params.picker : void 0, E = (e = Rn(n.params)) !== null && e !== void 0 ? e : "int";
        return new Hr(n.document, {
          colorType: E,
          expanded: l ?? false,
          formatter: ec(t, E),
          parser: Nr(E),
          pickerLayout: b ?? "popup",
          supportsAlpha: t,
          value: n.value,
          viewProps: n.viewProps
        });
      }
    }, nc = {
      id: "input-color-string",
      type: "input",
      accept: (n, e) => {
        if (typeof n != "string" || "view" in e && e.view === "text")
          return null;
        const t = Or(n, Rn(e));
        if (!t || !Fr(t))
          return null;
        const b = Dr(e);
        return b ? {
          initialValue: n,
          params: b
        } : null;
      },
      binding: {
        reader: (n) => {
          var e;
          return fl((e = Rn(n.params)) !== null && e !== void 0 ? e : "int");
        },
        equals: te.equals,
        writer: (n) => {
          const e = Or(n.initialValue, Rn(n.params));
          if (!e)
            throw S.shouldNeverHappen();
          const t = Hl(e);
          if (!t)
            throw S.notBindable();
          return t;
        }
      },
      controller: (n) => {
        const e = Or(n.initialValue, Rn(n.params));
        if (!e)
          throw S.shouldNeverHappen();
        const t = Fr(e);
        if (!t)
          throw S.shouldNeverHappen();
        const l = "expanded" in n.params ? n.params.expanded : void 0, b = "picker" in n.params ? n.params.picker : void 0;
        return new Hr(n.document, {
          colorType: e.type,
          expanded: l ?? false,
          formatter: t,
          parser: Nr(e.type),
          pickerLayout: b ?? "popup",
          supportsAlpha: e.alpha,
          value: n.value,
          viewProps: n.viewProps
        });
      }
    };
    class Wt {
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
    const Qo = D2("pndtxt");
    class ic {
      constructor(e, t) {
        this.textViews = t.textViews, this.element = e.createElement("div"), this.element.classList.add(Qo()), this.textViews.forEach((l) => {
          const b = e.createElement("div");
          b.classList.add(Qo("a")), b.appendChild(l.element), this.element.appendChild(b);
        });
      }
    }
    function sc(n, e, t) {
      return new Tn(n, {
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
          Qt({
            primary: this.value,
            secondary: l.value,
            forward: (E) => t.assembly.toComponents(E.rawValue)[b],
            backward: (E, k) => {
              const j = t.assembly.toComponents(E.rawValue);
              return j[b] = k.rawValue, t.assembly.fromComponents(j);
            }
          });
        }), this.view = new ic(e, {
          textViews: this.acs_.map((l) => l.view)
        });
      }
    }
    function Zo(n, e) {
      return "step" in n && !_2(n.step) ? new Jn(n.step, e) : null;
    }
    function Wo(n) {
      return !_2(n.max) && !_2(n.min) ? new Yt({
        max: n.max,
        min: n.min
      }) : !_2(n.max) || !_2(n.min) ? new Ai({
        max: n.max,
        min: n.min
      }) : null;
    }
    function rc(n) {
      const e = it2(n, Yt);
      if (e)
        return [e.values.get("min"), e.values.get("max")];
      const t = it2(n, Ai);
      return t ? [t.minValue, t.maxValue] : [void 0, void 0];
    }
    function oc(n, e) {
      const t = [], l = Zo(n, e);
      l && t.push(l);
      const b = Wo(n);
      b && t.push(b);
      const E = Ui(n.options);
      return E && t.push(E), new wn(t);
    }
    const ac = {
      id: "input-number",
      type: "input",
      accept: (n, e) => {
        if (typeof n != "number")
          return null;
        const t = A2, l = ae(e, {
          format: t.optional.function,
          max: t.optional.number,
          min: t.optional.number,
          options: t.optional.custom(An),
          step: t.optional.number
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => _t,
        constraint: (n) => oc(n.params, n.initialValue),
        writer: (n) => st2
      },
      controller: (n) => {
        var e;
        const t = n.value, l = n.constraint, b = l && it2(l, yn);
        if (b)
          return new xn(n.document, {
            props: new X2({
              options: b.values.value("options")
            }),
            value: t,
            viewProps: n.viewProps
          });
        const E = (e = "format" in n.params ? n.params.format : void 0) !== null && e !== void 0 ? e : De(si(l, t.rawValue)), k = l && it2(l, Yt);
        return k ? new ii(n.document, {
          baseStep: Dt(l),
          parser: ct2,
          sliderProps: new X2({
            maxValue: k.values.value("max"),
            minValue: k.values.value("min")
          }),
          textProps: X2.fromObject({
            draggingScale: Ot(l, t.rawValue),
            formatter: E
          }),
          value: t,
          viewProps: n.viewProps
        }) : new Tn(n.document, {
          baseStep: Dt(l),
          parser: ct2,
          props: X2.fromObject({
            draggingScale: Ot(l, t.rawValue),
            formatter: E
          }),
          value: t,
          viewProps: n.viewProps
        });
      }
    };
    class Jt {
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
    const Jo = {
      toComponents: (n) => n.getComponents(),
      fromComponents: (n) => new Jt(...n)
    }, ai = D2("p2d");
    class lc {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(ai()), t.viewProps.bindClassModifiers(this.element), F(t.expanded, K2(this.element, ai(void 0, "expanded")));
        const l = e.createElement("div");
        l.classList.add(ai("h")), this.element.appendChild(l);
        const b = e.createElement("button");
        b.classList.add(ai("b")), b.appendChild(Et2(e, "p2dpad")), t.viewProps.bindDisabled(b), l.appendChild(b), this.buttonElement = b;
        const E = e.createElement("div");
        if (E.classList.add(ai("t")), l.appendChild(E), this.textElement = E, t.pickerLayout === "inline") {
          const k = e.createElement("div");
          k.classList.add(ai("p")), this.element.appendChild(k), this.pickerElement = k;
        } else
          this.pickerElement = null;
      }
    }
    const en = D2("p2dp");
    class cc {
      constructor(e, t) {
        this.onFoldableChange_ = this.onFoldableChange_.bind(this), this.onValueChange_ = this.onValueChange_.bind(this), this.invertsY_ = t.invertsY, this.maxValue_ = t.maxValue, this.element = e.createElement("div"), this.element.classList.add(en()), t.layout === "popup" && this.element.classList.add(en(void 0, "p")), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(en("p")), t.viewProps.bindTabIndex(l), this.element.appendChild(l), this.padElement = l;
        const b = e.createElementNS(Ke, "svg");
        b.classList.add(en("g")), this.padElement.appendChild(b), this.svgElem_ = b;
        const E = e.createElementNS(Ke, "line");
        E.classList.add(en("ax")), E.setAttributeNS(null, "x1", "0"), E.setAttributeNS(null, "y1", "50%"), E.setAttributeNS(null, "x2", "100%"), E.setAttributeNS(null, "y2", "50%"), this.svgElem_.appendChild(E);
        const k = e.createElementNS(Ke, "line");
        k.classList.add(en("ax")), k.setAttributeNS(null, "x1", "50%"), k.setAttributeNS(null, "y1", "0"), k.setAttributeNS(null, "x2", "50%"), k.setAttributeNS(null, "y2", "100%"), this.svgElem_.appendChild(k);
        const j = e.createElementNS(Ke, "line");
        j.classList.add(en("l")), j.setAttributeNS(null, "x1", "50%"), j.setAttributeNS(null, "y1", "50%"), this.svgElem_.appendChild(j), this.lineElem_ = j;
        const Q2 = e.createElement("div");
        Q2.classList.add(en("m")), this.padElement.appendChild(Q2), this.markerElem_ = Q2, t.value.emitter.on("change", this.onValueChange_), this.value = t.value, this.update_();
      }
      get allFocusableElements() {
        return [this.padElement];
      }
      update_() {
        const [e, t] = this.value.rawValue.getComponents(), l = this.maxValue_, b = we(e, -l, +l, 0, 100), E = we(t, -l, +l, 0, 100), k = this.invertsY_ ? 100 - E : E;
        this.lineElem_.setAttributeNS(null, "x2", `${b}%`), this.lineElem_.setAttributeNS(null, "y2", `${k}%`), this.markerElem_.style.left = `${b}%`, this.markerElem_.style.top = `${k}%`;
      }
      onValueChange_() {
        this.update_();
      }
      onFoldableChange_() {
        this.update_();
      }
    }
    function ea(n, e, t) {
      return [
        je(e[0], ut2(n)),
        je(e[1], Pn(n)) * (t ? 1 : -1)
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
        }), this.ptHandler_ = new It(this.view.padElement), this.ptHandler_.emitter.on("down", this.onPointerDown_), this.ptHandler_.emitter.on("move", this.onPointerMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.padElement.addEventListener("keydown", this.onPadKeyDown_), this.view.padElement.addEventListener("keyup", this.onPadKeyUp_);
      }
      handlePointerEvent_(e, t) {
        if (!e.point)
          return;
        const l = this.maxValue_, b = we(e.point.x, 0, e.bounds.width, -l, +l), E = we(this.invertsY_ ? e.bounds.height - e.point.y : e.point.y, 0, e.bounds.height, -l, +l);
        this.value.setRawValue(new Jt(b, E), t);
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
        ni(e.key) && e.preventDefault();
        const [t, l] = ea(e, this.baseSteps_, this.invertsY_);
        t === 0 && l === 0 || this.value.setRawValue(new Jt(this.value.rawValue.x + t, this.value.rawValue.y + l), {
          forceEmit: false,
          last: false
        });
      }
      onPadKeyUp_(e) {
        const [t, l] = ea(e, this.baseSteps_, this.invertsY_);
        t === 0 && l === 0 || this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    class pc {
      constructor(e, t) {
        var l, b;
        this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this), this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this), this.onPadButtonBlur_ = this.onPadButtonBlur_.bind(this), this.onPadButtonClick_ = this.onPadButtonClick_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.foldable_ = Fe.create(t.expanded), this.popC_ = t.pickerLayout === "popup" ? new gs(e, {
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
          assembly: Jo,
          axes: t.axes,
          parser: t.parser,
          value: this.value,
          viewProps: this.viewProps
        }), this.view = new lc(e, {
          expanded: this.foldable_.value("expanded"),
          pickerLayout: t.pickerLayout,
          viewProps: this.viewProps
        }), this.view.textElement.appendChild(this.textC_.view.element), (l = this.view.buttonElement) === null || l === void 0 || l.addEventListener("blur", this.onPadButtonBlur_), (b = this.view.buttonElement) === null || b === void 0 || b.addEventListener("click", this.onPadButtonClick_), this.popC_ ? (this.view.element.appendChild(this.popC_.view.element), this.popC_.view.element.appendChild(this.pickerC_.view.element), Qt({
          primary: this.foldable_.value("expanded"),
          secondary: this.popC_.shows,
          forward: (k) => k.rawValue,
          backward: (k, j) => j.rawValue
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
        l && t.contains(l) || l && l === this.view.buttonElement && !bt2(t.ownerDocument) || (this.popC_.shows.rawValue = false);
      }
      onPopupChildKeydown_(e) {
        this.popC_ ? e.key === "Escape" && (this.popC_.shows.rawValue = false) : this.view.pickerElement && e.key === "Escape" && this.view.buttonElement.focus();
      }
    }
    class li {
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
    const ta = {
      toComponents: (n) => n.getComponents(),
      fromComponents: (n) => new li(...n)
    };
    function hc(n) {
      return li.isObject(n) ? new li(n.x, n.y, n.z) : new li();
    }
    function dc(n, e) {
      n.writeProperty("x", e.x), n.writeProperty("y", e.y), n.writeProperty("z", e.z);
    }
    function mc(n, e) {
      return new Wt({
        assembly: ta,
        components: [
          Bt("x" in n ? n.x : void 0, e.x),
          Bt("y" in n ? n.y : void 0, e.y),
          Bt("z" in n ? n.z : void 0, e.z)
        ]
      });
    }
    function Xr(n, e) {
      return {
        baseStep: Dt(e),
        constraint: e,
        textProps: X2.fromObject({
          draggingScale: Ot(e, n),
          formatter: De(si(e, n))
        })
      };
    }
    const fc = {
      id: "input-point3d",
      type: "input",
      accept: (n, e) => {
        if (!li.isObject(n))
          return null;
        const t = A2, l = ae(e, {
          x: t.optional.custom(wt2),
          y: t.optional.custom(wt2),
          z: t.optional.custom(wt2)
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => hc,
        constraint: (n) => mc(n.params, n.initialValue),
        equals: li.equals,
        writer: (n) => dc
      },
      controller: (n) => {
        const e = n.value, t = n.constraint;
        if (!(t instanceof Wt))
          throw S.shouldNeverHappen();
        return new $r(n.document, {
          assembly: ta,
          axes: [
            Xr(e.rawValue.x, t.components[0]),
            Xr(e.rawValue.y, t.components[1]),
            Xr(e.rawValue.z, t.components[2])
          ],
          parser: ct2,
          value: e,
          viewProps: n.viewProps
        });
      }
    };
    class ci {
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
    const na = {
      toComponents: (n) => n.getComponents(),
      fromComponents: (n) => new ci(...n)
    };
    function vc(n) {
      return ci.isObject(n) ? new ci(n.x, n.y, n.z, n.w) : new ci();
    }
    function bc(n, e) {
      n.writeProperty("x", e.x), n.writeProperty("y", e.y), n.writeProperty("z", e.z), n.writeProperty("w", e.w);
    }
    function gc(n, e) {
      return new Wt({
        assembly: na,
        components: [
          Bt("x" in n ? n.x : void 0, e.x),
          Bt("y" in n ? n.y : void 0, e.y),
          Bt("z" in n ? n.z : void 0, e.z),
          Bt("w" in n ? n.w : void 0, e.w)
        ]
      });
    }
    function _c(n, e) {
      return {
        baseStep: Dt(e),
        constraint: e,
        textProps: X2.fromObject({
          draggingScale: Ot(e, n),
          formatter: De(si(e, n))
        })
      };
    }
    const wc = {
      id: "input-point4d",
      type: "input",
      accept: (n, e) => {
        if (!ci.isObject(n))
          return null;
        const t = A2, l = ae(e, {
          x: t.optional.custom(wt2),
          y: t.optional.custom(wt2),
          z: t.optional.custom(wt2),
          w: t.optional.custom(wt2)
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => vc,
        constraint: (n) => gc(n.params, n.initialValue),
        equals: ci.equals,
        writer: (n) => bc
      },
      controller: (n) => {
        const e = n.value, t = n.constraint;
        if (!(t instanceof Wt))
          throw S.shouldNeverHappen();
        return new $r(n.document, {
          assembly: na,
          axes: e.rawValue.getComponents().map((l, b) => _c(l, t.components[b])),
          parser: ct2,
          value: e,
          viewProps: n.viewProps
        });
      }
    };
    function yc(n) {
      const e = [], t = Ui(n.options);
      return t && e.push(t), new wn(e);
    }
    const xc = {
      id: "input-string",
      type: "input",
      accept: (n, e) => {
        if (typeof n != "string")
          return null;
        const l = ae(e, {
          options: A2.optional.custom(An)
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => Ii,
        constraint: (n) => yc(n.params),
        writer: (n) => st2
      },
      controller: (n) => {
        const e = n.document, t = n.value, l = n.constraint, b = l && it2(l, yn);
        return b ? new xn(e, {
          props: new X2({
            options: b.values.value("options")
          }),
          value: t,
          viewProps: n.viewProps
        }) : new ei(e, {
          parser: (E) => E,
          props: X2.fromObject({
            formatter: Tt
          }),
          value: t,
          viewProps: n.viewProps
        });
      }
    }, Ki = {
      monitor: {
        defaultInterval: 200,
        defaultLineCount: 3
      }
    }, ia = D2("mll");
    class Ec {
      constructor(e, t) {
        this.onValueUpdate_ = this.onValueUpdate_.bind(this), this.formatter_ = t.formatter, this.element = e.createElement("div"), this.element.classList.add(ia()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("textarea");
        l.classList.add(ia("i")), l.style.height = `calc(var(--bld-us) * ${t.lineCount})`, l.readOnly = true, t.viewProps.bindDisabled(l), this.element.appendChild(l), this.textareaElem_ = l, t.value.emitter.on("change", this.onValueUpdate_), this.value = t.value, this.update_();
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
    const sa = D2("sgl");
    class Cc {
      constructor(e, t) {
        this.onValueUpdate_ = this.onValueUpdate_.bind(this), this.formatter_ = t.formatter, this.element = e.createElement("div"), this.element.classList.add(sa()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("input");
        l.classList.add(sa("i")), l.readOnly = true, l.type = "text", t.viewProps.bindDisabled(l), this.element.appendChild(l), this.inputElement = l, t.value.emitter.on("change", this.onValueUpdate_), this.value = t.value, this.update_();
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
      accept: (n, e) => {
        if (typeof n != "boolean")
          return null;
        const l = ae(e, {
          lineCount: A2.optional.number
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => ws
      },
      controller: (n) => {
        var e;
        return n.value.rawValue.length === 1 ? new qr(n.document, {
          formatter: ys,
          value: n.value,
          viewProps: n.viewProps
        }) : new Yr(n.document, {
          formatter: ys,
          lineCount: (e = n.params.lineCount) !== null && e !== void 0 ? e : Ki.monitor.defaultLineCount,
          value: n.value,
          viewProps: n.viewProps
        });
      }
    }, tn = D2("grl");
    class Tc {
      constructor(e, t) {
        this.onCursorChange_ = this.onCursorChange_.bind(this), this.onValueUpdate_ = this.onValueUpdate_.bind(this), this.element = e.createElement("div"), this.element.classList.add(tn()), t.viewProps.bindClassModifiers(this.element), this.formatter_ = t.formatter, this.props_ = t.props, this.cursor_ = t.cursor, this.cursor_.emitter.on("change", this.onCursorChange_);
        const l = e.createElementNS(Ke, "svg");
        l.classList.add(tn("g")), l.style.height = `calc(var(--bld-us) * ${t.lineCount})`, this.element.appendChild(l), this.svgElem_ = l;
        const b = e.createElementNS(Ke, "polyline");
        this.svgElem_.appendChild(b), this.lineElem_ = b;
        const E = e.createElement("div");
        E.classList.add(tn("t"), D2("tt")()), this.element.appendChild(E), this.tooltipElem_ = E, t.value.emitter.on("change", this.onValueUpdate_), this.value = t.value, this.update_();
      }
      get graphElement() {
        return this.svgElem_;
      }
      update_() {
        const e = this.svgElem_.getBoundingClientRect(), t = this.value.rawValue.length - 1, l = this.props_.get("minValue"), b = this.props_.get("maxValue"), E = [];
        this.value.rawValue.forEach((de, ve) => {
          if (de === void 0)
            return;
          const Vn = we(ve, 0, t, 0, e.width), $i = we(de, l, b, e.height, 0);
          E.push([Vn, $i].join(","));
        }), this.lineElem_.setAttributeNS(null, "points", E.join(" "));
        const k = this.tooltipElem_, j = this.value.rawValue[this.cursor_.rawValue];
        if (j === void 0) {
          k.classList.remove(tn("t", "a"));
          return;
        }
        const Q2 = we(this.cursor_.rawValue, 0, t, 0, e.width), J = we(j, l, b, e.height, 0);
        k.style.left = `${Q2}px`, k.style.top = `${J}px`, k.textContent = `${this.formatter_(j)}`, k.classList.contains(tn("t", "a")) || (k.classList.add(tn("t", "a"), tn("t", "in")), ot2(k), k.classList.remove(tn("t", "in")));
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
        }), !bt2(e))
          this.view.element.addEventListener("mousemove", this.onGraphMouseMove_), this.view.element.addEventListener("mouseleave", this.onGraphMouseLeave_);
        else {
          const l = new It(this.view.element);
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
    function Qr(n) {
      return "format" in n && !_2(n.format) ? n.format : De(2);
    }
    function Ac(n) {
      var e;
      return n.value.rawValue.length === 1 ? new qr(n.document, {
        formatter: Qr(n.params),
        value: n.value,
        viewProps: n.viewProps
      }) : new Yr(n.document, {
        formatter: Qr(n.params),
        lineCount: (e = n.params.lineCount) !== null && e !== void 0 ? e : Ki.monitor.defaultLineCount,
        value: n.value,
        viewProps: n.viewProps
      });
    }
    function Mc(n) {
      var e, t, l;
      return new kc(n.document, {
        formatter: Qr(n.params),
        lineCount: (e = n.params.lineCount) !== null && e !== void 0 ? e : Ki.monitor.defaultLineCount,
        props: X2.fromObject({
          maxValue: (t = "max" in n.params ? n.params.max : null) !== null && t !== void 0 ? t : 100,
          minValue: (l = "min" in n.params ? n.params.min : null) !== null && l !== void 0 ? l : 0
        }),
        value: n.value,
        viewProps: n.viewProps
      });
    }
    function ra(n) {
      return "view" in n && n.view === "graph";
    }
    const Sc = {
      id: "monitor-number",
      type: "monitor",
      accept: (n, e) => {
        if (typeof n != "number")
          return null;
        const t = A2, l = ae(e, {
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
        defaultBufferSize: (n) => ra(n) ? 64 : 1,
        reader: (n) => _t
      },
      controller: (n) => ra(n.params) ? Mc(n) : Ac(n)
    }, Lc = {
      id: "monitor-string",
      type: "monitor",
      accept: (n, e) => {
        if (typeof n != "string")
          return null;
        const t = A2, l = ae(e, {
          lineCount: t.optional.number,
          multiline: t.optional.boolean
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => Ii
      },
      controller: (n) => {
        var e;
        const t = n.value;
        return t.rawValue.length > 1 || "multiline" in n.params && n.params.multiline ? new Yr(n.document, {
          formatter: Tt,
          lineCount: (e = n.params.lineCount) !== null && e !== void 0 ? e : Ki.monitor.defaultLineCount,
          value: t,
          viewProps: n.viewProps
        }) : new qr(n.document, {
          formatter: Tt,
          value: t,
          viewProps: n.viewProps
        });
      }
    };
    function Rc(n, e) {
      var t;
      const l = n.accept(e.target.read(), e.params);
      if (_2(l))
        return null;
      const b = A2, E = {
        target: e.target,
        initialValue: l.initialValue,
        params: l.params
      }, k = n.binding.reader(E), j = n.binding.constraint ? n.binding.constraint(E) : void 0, Q2 = ee(k(l.initialValue), {
        constraint: j,
        equals: n.binding.equals
      }), J = new Wn({
        reader: k,
        target: e.target,
        value: Q2,
        writer: n.binding.writer(E)
      }), de = b.optional.boolean(e.params.disabled).value, ve = b.optional.boolean(e.params.hidden).value, Vn = n.controller({
        constraint: j,
        document: e.document,
        initialValue: l.initialValue,
        params: l.params,
        value: J.value,
        viewProps: Ze2.create({
          disabled: de,
          hidden: ve
        })
      });
      return new Ge(e.document, {
        binding: J,
        blade: Ee2(),
        props: X2.fromObject({
          label: "label" in e.params ? (t = b.optional.string(e.params.label).value) !== null && t !== void 0 ? t : null : e.target.key
        }),
        valueController: Vn
      });
    }
    function Vc(n, e) {
      return e === 0 ? new ms() : new ki(n, e ?? Ki.monitor.defaultInterval);
    }
    function Ic(n, e) {
      var t, l, b;
      const E = A2, k = n.accept(e.target.read(), e.params);
      if (_2(k))
        return null;
      const j = {
        target: e.target,
        initialValue: k.initialValue,
        params: k.params
      }, Q2 = n.binding.reader(j), J = (l = (t = E.optional.number(e.params.bufferSize).value) !== null && t !== void 0 ? t : n.binding.defaultBufferSize && n.binding.defaultBufferSize(k.params)) !== null && l !== void 0 ? l : 1, de = E.optional.number(e.params.interval).value, ve = new pr({
        reader: Q2,
        target: e.target,
        ticker: Vc(e.document, de),
        value: fs(J)
      }), Vn = E.optional.boolean(e.params.disabled).value, $i = E.optional.boolean(e.params.hidden).value, Xi = n.controller({
        document: e.document,
        params: k.params,
        value: ve.value,
        viewProps: Ze2.create({
          disabled: Vn,
          hidden: $i
        })
      });
      return new at2(e.document, {
        binding: ve,
        blade: Ee2(),
        props: X2.fromObject({
          label: "label" in e.params ? (b = E.optional.string(e.params.label).value) !== null && b !== void 0 ? b : null : e.target.key
        }),
        valueController: Xi
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
        if (_2(b))
          throw new S({
            context: {
              key: t.key
            },
            type: "nomatchingcontroller"
          });
        const E = this.pluginsMap_.inputs.reduce((k, j) => k ?? Rc(j, {
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
        const b = this.pluginsMap_.monitors.reduce((E, k) => E ?? Ic(k, {
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
        if (e instanceof Ge)
          return new _i(e);
        if (e instanceof at2)
          return new wi(e);
        if (e instanceof bn)
          return new qn(e, this);
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
      const n = new Dc();
      return [
        Uc,
        fc,
        wc,
        xc,
        ac,
        nc,
        tc,
        Zl,
        ri,
        Pc,
        Lc,
        Sc,
        W,
        rr,
        ar,
        Ti
      ].forEach((e) => {
        n.register(e);
      }), n;
    }
    function Nc(n) {
      return Jt.isObject(n) ? new Jt(n.x, n.y) : new Jt();
    }
    function Bc(n, e) {
      n.writeProperty("x", e.x), n.writeProperty("y", e.y);
    }
    function Bt(n, e) {
      if (!n)
        return;
      const t = [], l = Zo(n, e);
      l && t.push(l);
      const b = Wo(n);
      return b && t.push(b), new wn(t);
    }
    function Fc(n, e) {
      return new Wt({
        assembly: Jo,
        components: [
          Bt("x" in n ? n.x : void 0, e.x),
          Bt("y" in n ? n.y : void 0, e.y)
        ]
      });
    }
    function oa(n, e) {
      const [t, l] = n ? rc(n) : [];
      if (!_2(t) || !_2(l))
        return Math.max(Math.abs(t ?? 0), Math.abs(l ?? 0));
      const b = Dt(n);
      return Math.max(Math.abs(b) * 10, Math.abs(e) * 10);
    }
    function jc(n, e) {
      const t = e instanceof Wt ? e.components[0] : void 0, l = e instanceof Wt ? e.components[1] : void 0, b = oa(t, n.x), E = oa(l, n.y);
      return Math.max(b, E);
    }
    function aa(n, e) {
      return {
        baseStep: Dt(e),
        constraint: e,
        textProps: X2.fromObject({
          draggingScale: Ot(e, n),
          formatter: De(si(e, n))
        })
      };
    }
    function zc(n) {
      if (!("y" in n))
        return false;
      const e = n.y;
      return e && "inverted" in e ? !!e.inverted : false;
    }
    const Uc = {
      id: "input-point2d",
      type: "input",
      accept: (n, e) => {
        if (!Jt.isObject(n))
          return null;
        const t = A2, l = ae(e, {
          expanded: t.optional.boolean,
          picker: t.optional.custom(zi),
          x: t.optional.custom(wt2),
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
        reader: (n) => Nc,
        constraint: (n) => Fc(n.params, n.initialValue),
        equals: Jt.equals,
        writer: (n) => Bc
      },
      controller: (n) => {
        const e = n.document, t = n.value, l = n.constraint;
        if (!(l instanceof Wt))
          throw S.shouldNeverHappen();
        const b = "expanded" in n.params ? n.params.expanded : void 0, E = "picker" in n.params ? n.params.picker : void 0;
        return new pc(e, {
          axes: [
            aa(t.rawValue.x, l.components[0]),
            aa(t.rawValue.y, l.components[1])
          ],
          expanded: b ?? false,
          invertsY: zc(n.params),
          maxValue: jc(t.rawValue, l),
          parser: ct2,
          pickerLayout: E ?? "popup",
          value: t,
          viewProps: n.viewProps
        });
      }
    };
    class la extends o {
      constructor(e) {
        super(e), this.emitter_ = new N(), this.controller_.valueController.value.emitter.on("change", (t) => {
          this.emitter_.emit("change", {
            event: new p2(this, t.rawValue)
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
    class ca extends o {
      constructor(e) {
        super(e), this.emitter_ = new N(), this.controller_.valueController.value.emitter.on("change", (t) => {
          this.emitter_.emit("change", {
            event: new p2(this, t.rawValue)
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
    class ua extends o {
      constructor(e) {
        super(e), this.emitter_ = new N(), this.controller_.valueController.value.emitter.on("change", (t) => {
          this.emitter_.emit("change", {
            event: new p2(this, t.rawValue)
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
        accept(n) {
          const e = A2, t = ae(n, {
            options: e.required.custom(An),
            value: e.required.raw,
            view: e.required.constant("list"),
            label: e.optional.string
          });
          return t ? { params: t } : null;
        },
        controller(n) {
          const e = new yn(Ls(n.params.options)), t = ee(n.params.value, {
            constraint: e
          }), l = new xn(n.document, {
            props: new X2({
              options: e.values.value("options")
            }),
            value: t,
            viewProps: n.viewProps
          });
          return new Ht(n.document, {
            blade: n.blade,
            props: X2.fromObject({
              label: n.params.label
            }),
            valueController: l
          });
        },
        api(n) {
          return !(n.controller instanceof Ht) || !(n.controller.valueController instanceof xn) ? null : new la(n.controller);
        }
      };
    }();
    function Hc(n) {
      return n.reduce((e, t) => Object.assign(e, {
        [t.presetKey]: t.read()
      }), {});
    }
    function Kc(n, e) {
      n.forEach((t) => {
        const l = e[t.target.presetKey];
        l !== void 0 && t.writer(t.target, t.reader(l));
      });
    }
    class $c extends yi {
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
        Kc(t, e), this.refresh();
      }
      /**
       * Exports a preset of all inputs.
       * @return An exported preset object.
       */
      exportPreset() {
        const e = this.controller_.rackController.rack.find(Ge).map((t) => t.binding.target);
        return Hc(e);
      }
      /**
       * Refreshes all bindings of the pane.
       */
      refresh() {
        this.controller_.rackController.rack.find(Ge).forEach((e) => {
          e.binding.read();
        }), this.controller_.rackController.rack.find(at2).forEach((e) => {
          e.binding.read();
        });
      }
    }
    class Xc extends Qn {
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
      accept(n) {
        const e = A2, t = ae(n, {
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
        const l = (e = n.params.value) !== null && e !== void 0 ? e : 0, b = new Yt({
          max: n.params.max,
          min: n.params.min
        }), E = new ii(n.document, {
          baseStep: 1,
          parser: ct2,
          sliderProps: new X2({
            maxValue: b.values.value("max"),
            minValue: b.values.value("min")
          }),
          textProps: X2.fromObject({
            draggingScale: Ot(void 0, l),
            formatter: (t = n.params.format) !== null && t !== void 0 ? t : Mr
          }),
          value: ee(l, {
            constraint: b
          }),
          viewProps: n.viewProps
        });
        return new Ht(n.document, {
          blade: n.blade,
          props: X2.fromObject({
            label: n.params.label
          }),
          valueController: E
        });
      },
      api(n) {
        return !(n.controller instanceof Ht) || !(n.controller.valueController instanceof ii) ? null : new ca(n.controller);
      }
    }, qc = function() {
      return {
        id: "text",
        type: "blade",
        accept(n) {
          const e = A2, t = ae(n, {
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
          const t = new ei(n.document, {
            parser: n.params.parse,
            props: X2.fromObject({
              formatter: (e = n.params.format) !== null && e !== void 0 ? e : (l) => String(l)
            }),
            value: ee(n.params.value),
            viewProps: n.viewProps
          });
          return new Ht(n.document, {
            blade: n.blade,
            props: X2.fromObject({
              label: n.params.label
            }),
            valueController: t
          });
        },
        api(n) {
          return !(n.controller instanceof Ht) || !(n.controller.valueController instanceof ei) ? null : new ua(n.controller);
        }
      };
    }();
    function Qc(n) {
      const e = n.createElement("div");
      return e.classList.add(D2("dfw")()), n.body && n.body.appendChild(e), e;
    }
    function pa(n, e, t) {
      if (n.querySelector(`style[data-tp-style=${e}]`))
        return;
      const l = n.createElement("style");
      l.dataset.tpStyle = e, l.textContent = t, n.head.appendChild(l);
    }
    class Zc extends $c {
      constructor(e) {
        var t, l;
        const b = e ?? {}, E = (t = b.document) !== null && t !== void 0 ? t : bi(), k = Oc(), j = new Xc(E, {
          expanded: b.expanded,
          blade: Ee2(),
          props: X2.fromObject({
            title: b.title
          }),
          viewProps: Ze2.create()
        });
        super(j, k), this.pool_ = k, this.containerElem_ = (l = b.container) !== null && l !== void 0 ? l : Qc(E), this.containerElem_.appendChild(this.element), this.doc_ = E, this.usesDefaultWrapper_ = !b.container, this.setUpDefaultPlugins_();
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
        e.css && pa(this.document, `plugin-${e.id}`, e.css);
      }
      setUpDefaultPlugins_() {
        pa(this.document, "default", '.tp-tbiv_b,.tp-coltxtv_ms,.tp-ckbv_i,.tp-rotv_b,.tp-fldv_b,.tp-mllv_i,.tp-sglv_i,.tp-grlv_g,.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw,.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-p2dv_b:hover,.tp-btnv_b:hover,.tp-lstv_s:hover{background-color:var(--btn-bg-h)}.tp-p2dv_b:focus,.tp-btnv_b:focus,.tp-lstv_s:focus{background-color:var(--btn-bg-f)}.tp-p2dv_b:active,.tp-btnv_b:active,.tp-lstv_s:active{background-color:var(--btn-bg-a)}.tp-p2dv_b:disabled,.tp-btnv_b:disabled,.tp-lstv_s:disabled{opacity:.5}.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-txtv_i:hover,.tp-p2dpv_p:hover,.tp-colswv_sw:hover{background-color:var(--in-bg-h)}.tp-txtv_i:focus,.tp-p2dpv_p:focus,.tp-colswv_sw:focus{background-color:var(--in-bg-f)}.tp-txtv_i:active,.tp-p2dpv_p:active,.tp-colswv_sw:active{background-color:var(--in-bg-a)}.tp-txtv_i:disabled,.tp-p2dpv_p:disabled,.tp-colswv_sw:disabled{opacity:.5}.tp-mllv_i,.tp-sglv_i,.tp-grlv_g{background-color:var(--mo-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--mo-fg);height:var(--bld-us);scrollbar-color:currentColor rgba(0,0,0,0);scrollbar-width:thin;width:100%}.tp-mllv_i::-webkit-scrollbar,.tp-sglv_i::-webkit-scrollbar,.tp-grlv_g::-webkit-scrollbar{height:8px;width:8px}.tp-mllv_i::-webkit-scrollbar-corner,.tp-sglv_i::-webkit-scrollbar-corner,.tp-grlv_g::-webkit-scrollbar-corner{background-color:rgba(0,0,0,0)}.tp-mllv_i::-webkit-scrollbar-thumb,.tp-sglv_i::-webkit-scrollbar-thumb,.tp-grlv_g::-webkit-scrollbar-thumb{background-clip:padding-box;background-color:currentColor;border:rgba(0,0,0,0) solid 2px;border-radius:4px}.tp-rotv{--font-family: var(--tp-font-family, Roboto Mono, Source Code Pro, Menlo, Courier, monospace);--bs-br: var(--tp-base-border-radius, 6px);--cnt-h-p: var(--tp-container-horizontal-padding, 4px);--cnt-v-p: var(--tp-container-vertical-padding, 4px);--elm-br: var(--tp-element-border-radius, 2px);--bld-s: var(--tp-blade-spacing, 4px);--bld-us: var(--tp-blade-unit-size, 20px);--bs-bg: var(--tp-base-background-color, hsl(230, 7%, 17%));--bs-sh: var(--tp-base-shadow-color, rgba(0, 0, 0, 0.2));--btn-bg: var(--tp-button-background-color, hsl(230, 7%, 70%));--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, hsl(230, 7%, 17%));--cnt-bg: var(--tp-container-background-color, rgba(187, 188, 196, 0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187, 188, 196, 0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187, 188, 196, 0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187, 188, 196, 0.15));--cnt-fg: var(--tp-container-foreground-color, hsl(230, 7%, 75%));--in-bg: var(--tp-input-background-color, rgba(187, 188, 196, 0.1));--in-bg-a: var(--tp-input-background-color-active, rgba(187, 188, 196, 0.25));--in-bg-f: var(--tp-input-background-color-focus, rgba(187, 188, 196, 0.2));--in-bg-h: var(--tp-input-background-color-hover, rgba(187, 188, 196, 0.15));--in-fg: var(--tp-input-foreground-color, hsl(230, 7%, 75%));--lbl-fg: var(--tp-label-foreground-color, rgba(187, 188, 196, 0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0, 0, 0, 0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187, 188, 196, 0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(187, 188, 196, 0.1))}.tp-rotv_c>.tp-cntv.tp-v-lst,.tp-tabv_c .tp-brkv>.tp-cntv.tp-v-lst,.tp-fldv_c>.tp-cntv.tp-v-lst{margin-bottom:calc(-1*var(--cnt-v-p))}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-rotv_c>*:not(.tp-v-fst),.tp-tabv_c .tp-brkv>*:not(.tp-v-fst),.tp-fldv_c>*:not(.tp-v-fst){margin-top:var(--bld-s)}.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-v-p)}.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-cntv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-v-p)}.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-tabv_c .tp-brkv>.tp-cntv,.tp-fldv_c>.tp-cntv{margin-left:4px}.tp-tabv_c .tp-brkv>.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--elm-br);border-bottom-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-tabv_c .tp-brkv .tp-fldv>.tp-fldv_c,.tp-fldv_c .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv>.tp-cntv+.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-cntv+.tp-fldv>.tp-fldv_b{border-top-left-radius:0}.tp-tabv_c .tp-brkv>.tp-cntv+.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-cntv+.tp-tabv>.tp-tabv_t{border-top-left-radius:0}.tp-tabv_c .tp-brkv>.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-tabv>.tp-tabv_t{border-top-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv .tp-tabv>.tp-tabv_c,.tp-fldv_c .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--elm-br)}.tp-rotv_b,.tp-fldv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);overflow:hidden;padding-left:var(--cnt-h-p);padding-right:calc(4px + var(--bld-us) + var(--cnt-h-p));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-rotv_b:hover,.tp-fldv_b:hover{background-color:var(--cnt-bg-h)}.tp-rotv_b:focus,.tp-fldv_b:focus{background-color:var(--cnt-bg-f)}.tp-rotv_b:active,.tp-fldv_b:active{background-color:var(--cnt-bg-a)}.tp-rotv_b:disabled,.tp-fldv_b:disabled{opacity:.5}.tp-rotv_m,.tp-fldv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:"";display:block;height:6px;right:calc(var(--cnt-h-p) + (var(--bld-us) + 4px - 6px)/2 - 2px);margin:auto;opacity:.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-rotv.tp-rotv-expanded .tp-rotv_m,.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m{transform:none}.tp-rotv_c,.tp-fldv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c,.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c{display:none}.tp-rotv.tp-rotv-expanded .tp-rotv_c,.tp-fldv.tp-fldv-expanded>.tp-fldv_c{opacity:1;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-lstv,.tp-coltxtv_m{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m,.tp-coltxtv_mm{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-lstv_m svg,.tp-coltxtv_mm svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-lstv_m svg path,.tp-coltxtv_mm svg path{fill:currentColor}.tp-pndtxtv,.tp-coltxtv_w{display:flex}.tp-pndtxtv_a,.tp-coltxtv_c{width:100%}.tp-pndtxtv_a+.tp-pndtxtv_a,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-coltxtv_c{margin-left:2px}.tp-btnv_b{width:100%}.tp-btnv_t{text-align:center}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--elm-br);cursor:pointer;display:block;height:var(--bld-us);position:relative;width:var(--bld-us)}.tp-ckbv_w svg{bottom:0;display:block;height:16px;left:0;margin:auto;opacity:0;position:absolute;right:0;top:0;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--bld-us)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-expanded.tp-colv-cpl .tp-colv_p{overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--bld-s);opacity:1}.tp-colv .tp-popv{left:calc(-1*var(--cnt-h-p));right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--bld-s)}.tp-colpv_rgb{display:flex;margin-top:var(--bld-s);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-v-p);padding-top:calc(var(--cnt-v-p) + 2px);position:relative}.tp-colpv_a::before{background-color:var(--grv-fg);content:"";height:2px;left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:0}.tp-colpv.tp-v-disabled .tp-colpv_a::before{opacity:.5}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--elm-br);outline:none;overflow:hidden;position:relative}.tp-svpv.tp-v-disabled{opacity:.5}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--bld-us)*4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0, 0, 0, 0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative}.tp-hplv.tp-v-disabled{opacity:.5}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--elm-br);border:rgba(255,255,255,.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative;width:100%}.tp-aplv.tp-v-disabled{opacity:.5}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--elm-br);box-shadow:0 0 2px rgba(0,0,0,.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;pointer-events:none;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--elm-br);border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--elm-br);overflow:hidden}.tp-colswv.tp-v-disabled{opacity:.5}.tp-colswv_sw{border-radius:0}.tp-colswv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;cursor:pointer;display:block;height:var(--bld-us);left:0;margin:0;outline:none;padding:0;position:absolute;top:0;width:var(--bld-us)}.tp-colswv_b:focus::after{border:rgba(255,255,255,.75) solid 2px;border-radius:var(--elm-br);bottom:0;content:"";display:block;left:0;position:absolute;right:0;top:0}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--elm-br);color:var(--lbl-fg);cursor:pointer;height:var(--bld-us);line-height:var(--bld-us);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv.tp-v-disabled .tp-coltxtv_mm{opacity:.5}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv{position:relative}.tp-fldv.tp-fldv-not .tp-fldv_b{display:none}.tp-fldv_t{padding-left:4px}.tp-fldv_b:disabled .tp-fldv_m{display:none}.tp-fldv_c{padding-left:4px}.tp-fldv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--bld-us) + 4px);width:var(--bs-br)}.tp-fldv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-fldv_b:hover+.tp-fldv_i{color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_i{color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_i{color:var(--cnt-bg-a)}.tp-fldv.tp-v-disabled>.tp-fldv_i{opacity:.5}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--bld-us)*3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left .05s,top .05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-h-p);padding-right:var(--cnt-h-p)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:160px}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding:0 4px}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:.5}.tp-mllv_i{display:block;height:calc(var(--bld-us)*3);line-height:var(--bld-us);padding:0 4px;resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--bld-us);margin-right:4px;position:relative;width:var(--bld-us)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--bld-s);opacity:1}.tp-p2dv .tp-popv{left:calc(-1*var(--cnt-h-p));right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-p2dpv{padding-left:calc(var(--bld-us) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv.tp-v-disabled .tp-p2dpv_p{opacity:.5}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:6px;box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:168px;padding:var(--cnt-v-p) var(--cnt-h-p);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sprv.tp-v-disabled .tp-sprv_r{opacity:.5}.tp-sldv.tp-v-disabled{opacity:.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--bld-us);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;bottom:0;content:"";display:block;height:2px;left:0;margin:auto;position:absolute;right:0;top:0}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";display:block;height:2px;left:0;margin-bottom:auto;margin-top:auto;position:absolute;right:0;top:0}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--elm-br);bottom:0;content:"";display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv{position:relative}.tp-tabv_t{align-items:flex-end;color:var(--cnt-bg);display:flex;overflow:hidden;position:relative}.tp-tabv_t:hover{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus){color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active){color:var(--cnt-bg-a)}.tp-tabv_t::before{background-color:currentColor;bottom:0;content:"";height:2px;left:0;pointer-events:none;position:absolute;right:0}.tp-tabv.tp-v-disabled .tp-tabv_t::before{opacity:.5}.tp-tabv.tp-tabv-nop .tp-tabv_t{height:calc(var(--bld-us) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_t::before{background-color:var(--cnt-bg);bottom:0;content:"";height:2px;left:0;position:absolute;right:0}.tp-tabv_c{padding-bottom:var(--cnt-v-p);padding-left:4px;padding-top:var(--cnt-v-p)}.tp-tabv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--bld-us) + 4px);width:var(--bs-br)}.tp-tabv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-tabv_t:hover+.tp-tabv_i{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus)+.tp-tabv_i{color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active)+.tp-tabv_i{color:var(--cnt-bg-a)}.tp-tabv.tp-v-disabled>.tp-tabv_i{opacity:.5}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv.tp-v-disabled::before{opacity:.5}.tp-tbiv_b{display:block;padding-left:calc(var(--cnt-h-p) + 4px);padding-right:calc(var(--cnt-h-p) + 4px);position:relative;width:100%}.tp-tbiv_b:disabled{opacity:.5}.tp-tbiv_b::before{background-color:var(--cnt-bg);bottom:2px;content:"";left:0;pointer-events:none;position:absolute;right:0;top:0}.tp-tbiv_b:hover::before{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus::before{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active::before{background-color:var(--cnt-bg-a)}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);opacity:.5;overflow:hidden;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-txtv{position:relative}.tp-txtv_i{padding:0 4px}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:.3}.tp-txtv_k{cursor:pointer;height:100%;left:-3px;position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";height:calc(var(--bld-us) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:.1;position:absolute;top:0;transition:border-radius .1s,height .1s,transform .1s,width .1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--elm-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0);border-style:solid;border-width:2px;box-sizing:border-box;content:"";font-size:.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--font-family);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(4px + var(--bld-us) + var(--cnt-h-p));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0}.tp-rotv.tp-rotv-not .tp-rotv_b{display:none}.tp-rotv_b:disabled .tp-rotv_m{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1*var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1*var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_t{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}'), this.pool_.getAll().forEach((e) => {
          this.embedPluginStyle_(e);
        }), this.registerPlugin({
          plugins: [
            Yc,
            Gc,
            Ti,
            qc
          ]
        });
      }
    }
    const Wc = new r("3.1.9");
    s.BladeApi = o, s.ButtonApi = O, s.FolderApi = yi, s.InputBindingApi = _i, s.ListApi = la, s.MonitorBindingApi = wi, s.Pane = Zc, s.SeparatorApi = us, s.SliderApi = ca, s.TabApi = hs, s.TabPageApi = Pi, s.TextApi = ua, s.TpChangeEvent = p2, s.VERSION = Wc, Object.defineProperty(s, "__esModule", { value: true });
  });
})(wo, wo.exports);
var Ad = wo.exports;
var yo = { exports: {} };
(function(f, i) {
  (function(s, r) {
    r(i);
  })(il, function(s) {
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
      constructor(a, u, v, x) {
        super(a), this.value = u, this.presetKey = v, this.last = x ?? true;
      }
    }
    function p2(d) {
      return d;
    }
    function h2(d) {
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
      constructor(a) {
        var u;
        this.message = (u = m[a.type](a.context)) !== null && u !== void 0 ? u : "Unexpected error", this.name = this.constructor.name, this.stack = new Error(this.message).stack, this.type = a.type;
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
        let v = this.observers_[a];
        return v || (v = this.observers_[a] = []), v.push({
          handler: u
        }), this;
      }
      off(a, u) {
        const v = this.observers_[a];
        return v && (this.observers_[a] = v.filter((x) => x.handler !== u)), this;
      }
      emit(a, u) {
        const v = this.observers_[a];
        v && v.forEach((x) => {
          x.handler(u);
        });
      }
    }
    const _2 = "tp";
    function y(d) {
      return (u, v) => [
        _2,
        "-",
        d,
        "v",
        u ? `_${u}` : "",
        v ? `-${v}` : ""
      ].join("");
    }
    function C(d, a) {
      return (u) => a(d(u));
    }
    function L(d) {
      return d.rawValue;
    }
    function S(d, a) {
      d.emitter.on("change", C(L, a)), a(d.rawValue);
    }
    function R(d, a, u) {
      S(d.value(a), u);
    }
    function O(d, a, u) {
      u ? d.classList.add(a) : d.classList.remove(a);
    }
    function N(d, a) {
      return (u) => {
        O(d, a, u);
      };
    }
    function I2(d, a) {
      S(d, (u) => {
        a.textContent = u ?? "";
      });
    }
    const D2 = y("btn");
    class Y {
      constructor(a, u) {
        this.element = a.createElement("div"), this.element.classList.add(D2()), u.viewProps.bindClassModifiers(this.element);
        const v = a.createElement("button");
        v.classList.add(D2("b")), u.viewProps.bindDisabled(v), this.element.appendChild(v), this.buttonElement = v;
        const x = a.createElement("div");
        x.classList.add(D2("t")), I2(u.props.value("title"), x), this.buttonElement.appendChild(x);
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
    class F {
      constructor(a, u) {
        var v;
        this.constraint_ = u == null ? void 0 : u.constraint, this.equals_ = (v = u == null ? void 0 : u.equals) !== null && v !== void 0 ? v : (x, T) => x === T, this.emitter = new w(), this.rawValue_ = a;
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
        const v = u ?? {
          forceEmit: false,
          last: true
        }, x = this.constraint_ ? this.constraint_.constrain(a) : a, T = this.rawValue_;
        this.equals_(T, x) && !v.forceEmit || (this.emitter.emit("beforechange", {
          sender: this
        }), this.rawValue_ = x, this.emitter.emit("change", {
          options: v,
          previousRawValue: T,
          rawValue: x,
          sender: this
        }));
      }
    }
    class B {
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
        const v = u ?? {
          forceEmit: false,
          last: true
        }, x = this.value_;
        x === a && !v.forceEmit || (this.emitter.emit("beforechange", {
          sender: this
        }), this.value_ = a, this.emitter.emit("change", {
          options: v,
          previousRawValue: x,
          rawValue: this.value_,
          sender: this
        }));
      }
    }
    function H2(d, a) {
      const u = a == null ? void 0 : a.constraint, v = a == null ? void 0 : a.equals;
      return !u && !v ? new B(d) : new F(d, a);
    }
    class K2 {
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
        return Object.keys(a).reduce((v, x) => Object.assign(v, {
          [x]: H2(a[x])
        }), {});
      }
      static fromObject(a) {
        const u = this.createCore(a);
        return new K2(u);
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
    function q(d, a) {
      const v = Object.keys(a).reduce((x, T) => {
        if (x === void 0)
          return;
        const V2 = a[T], z = V2(d[T]);
        return z.succeeded ? Object.assign(Object.assign({}, x), { [T]: z.value }) : void 0;
      }, {});
      return v;
    }
    function pe(d, a) {
      return d.reduce((u, v) => {
        if (u === void 0)
          return;
        const x = a(v);
        if (!(!x.succeeded || x.value === void 0))
          return [...u, x.value];
      }, []);
    }
    function _e(d) {
      return d === null ? false : typeof d == "object";
    }
    function ce2(d) {
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
        const v = d(u);
        return v !== void 0 ? {
          succeeded: true,
          value: v
        } : {
          succeeded: false,
          value: void 0
        };
      };
    }
    function me(d) {
      return {
        custom: (a) => ce2(a)(d),
        boolean: ce2((a) => typeof a == "boolean" ? a : void 0)(d),
        number: ce2((a) => typeof a == "number" ? a : void 0)(d),
        string: ce2((a) => typeof a == "string" ? a : void 0)(d),
        function: ce2((a) => typeof a == "function" ? a : void 0)(d),
        constant: (a) => ce2((u) => u === a ? a : void 0)(d),
        raw: ce2((a) => a)(d),
        object: (a) => ce2((u) => {
          if (_e(u))
            return q(u, a);
        })(d),
        array: (a) => ce2((u) => {
          if (Array.isArray(u))
            return pe(u, a);
        })(d)
      };
    }
    const he = {
      optional: me(true),
      required: me(false)
    };
    function ee(d, a) {
      const u = he.required.object(a)(d);
      return u.succeeded ? u.value : void 0;
    }
    function X2(d) {
      console.warn([
        `Missing '${d.key}' of ${d.target} in ${d.place}.`,
        "Please rebuild plugins with the latest core package."
      ].join(" "));
    }
    function Se2(d) {
      return d && d.parentElement && d.parentElement.removeChild(d), null;
    }
    class fe2 {
      constructor(a) {
        this.value_ = a;
      }
      static create(a) {
        return [
          new fe2(a),
          (u, v) => {
            a.setRawValue(u, v);
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
    const oe2 = y("");
    function ne(d, a) {
      return N(d, oe2(void 0, a));
    }
    class ge extends K2 {
      constructor(a) {
        var u;
        super(a), this.onDisabledChange_ = this.onDisabledChange_.bind(this), this.onParentChange_ = this.onParentChange_.bind(this), this.onParentGlobalDisabledChange_ = this.onParentGlobalDisabledChange_.bind(this), [this.globalDisabled_, this.setGlobalDisabled_] = fe2.create(H2(this.getGlobalDisabled_())), this.value("disabled").emitter.on("change", this.onDisabledChange_), this.value("parent").emitter.on("change", this.onParentChange_), (u = this.get("parent")) === null || u === void 0 || u.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_);
      }
      static create(a) {
        var u, v, x;
        const T = a ?? {};
        return new ge(K2.createCore({
          disabled: (u = T.disabled) !== null && u !== void 0 ? u : false,
          disposed: false,
          hidden: (v = T.hidden) !== null && v !== void 0 ? v : false,
          parent: (x = T.parent) !== null && x !== void 0 ? x : null
        }));
      }
      get globalDisabled() {
        return this.globalDisabled_;
      }
      bindClassModifiers(a) {
        S(this.globalDisabled_, ne(a, "disabled")), R(this, "hidden", ne(a, "hidden"));
      }
      bindDisabled(a) {
        S(this.globalDisabled_, (u) => {
          a.disabled = u;
        });
      }
      bindTabIndex(a) {
        S(this.globalDisabled_, (u) => {
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
        const v = a.previousRawValue;
        v == null || v.globalDisabled.emitter.off("change", this.onParentGlobalDisabledChange_), (u = this.get("parent")) === null || u === void 0 || u.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_), this.updateGlobalDisabled_();
      }
    }
    function A2() {
      return ["veryfirst", "first", "last", "verylast"];
    }
    const ae = y(""), Ne = {
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
          A2().forEach((v) => {
            u.classList.remove(ae(void 0, Ne[v]));
          }), this.blade.get("positions").forEach((v) => {
            u.classList.add(ae(void 0, Ne[v]));
          });
        }), this.viewProps.handleDispose(() => {
          Se2(u);
        });
      }
      get parent() {
        return this.parent_;
      }
      set parent(a) {
        if (this.parent_ = a, !("parent" in this.viewProps.valMap_)) {
          X2({
            key: "parent",
            target: ge.name,
            place: "BladeController.parent"
          });
          return;
        }
        this.viewProps.set("parent", this.parent_ ? this.parent_.viewProps : null);
      }
    }
    const xe2 = "http://www.w3.org/2000/svg";
    function rt2(d) {
      d.offsetHeight;
    }
    function Un(d, a) {
      const u = d.style.transition;
      d.style.transition = "none", a(), d.style.transition = u;
    }
    function Ze2(d) {
      return d.ontouchstart !== void 0;
    }
    function Gn(d) {
      for (; d.childNodes.length > 0; )
        d.removeChild(d.childNodes[0]);
    }
    function hn(d) {
      return d.relatedTarget ? d.relatedTarget : "explicitOriginalTarget" in d ? d.explicitOriginalTarget : null;
    }
    const vt2 = y("lbl");
    function At(d, a) {
      const u = d.createDocumentFragment();
      return a.split(`
`).map((x) => d.createTextNode(x)).forEach((x, T) => {
        T > 0 && u.appendChild(d.createElement("br")), u.appendChild(x);
      }), u;
    }
    class Ke {
      constructor(a, u) {
        this.element = a.createElement("div"), this.element.classList.add(vt2()), u.viewProps.bindClassModifiers(this.element);
        const v = a.createElement("div");
        v.classList.add(vt2("l")), R(u.props, "label", (T) => {
          h2(T) ? this.element.classList.add(vt2(void 0, "nol")) : (this.element.classList.remove(vt2(void 0, "nol")), Gn(v), v.appendChild(At(a, T)));
        }), this.element.appendChild(v), this.labelElement = v;
        const x = a.createElement("div");
        x.classList.add(vt2("v")), this.element.appendChild(x), this.valueElement = x;
      }
    }
    class ot2 extends Ue {
      constructor(a, u) {
        const v = u.valueController.viewProps;
        super(Object.assign(Object.assign({}, u), { view: new Ke(a, {
          props: u.props,
          viewProps: v
        }), viewProps: v })), this.props = u.props, this.valueController = u.valueController, this.view.valueElement.appendChild(this.valueController.view.element);
      }
    }
    class dn extends Ue {
      constructor(a) {
        super(a), this.value = a.value;
      }
    }
    class bt2 extends K2 {
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
        }, v = K2.createCore(u);
        return new bt2(v);
      }
      get styleExpanded() {
        var a;
        return (a = this.get("temporaryExpanded")) !== null && a !== void 0 ? a : this.get("expanded");
      }
      get styleHeight() {
        if (!this.styleExpanded)
          return "0";
        const a = this.get("expandedHeight");
        return this.get("shouldFixHeight") && !h2(a) ? `${a}px` : "auto";
      }
      bindExpandedClass(a, u) {
        const v = () => {
          this.styleExpanded ? a.classList.add(u) : a.classList.remove(u);
        };
        R(this, "expanded", v), R(this, "temporaryExpanded", v);
      }
      cleanUpTransition() {
        this.set("shouldFixHeight", false), this.set("expandedHeight", null), this.set("completed", true);
      }
    }
    function Hn(d) {
      return bt2.create(d);
    }
    function bi(d, a) {
      let u = 0;
      return Un(a, () => {
        d.set("expandedHeight", null), d.set("temporaryExpanded", true), rt2(a), u = a.clientHeight, d.set("temporaryExpanded", null), rt2(a);
      }), u;
    }
    function Kn(d, a) {
      a.style.height = d.styleHeight;
    }
    function $n(d, a) {
      d.value("expanded").emitter.on("beforechange", () => {
        d.set("completed", false), h2(d.get("expandedHeight")) && d.set("expandedHeight", bi(d, a)), d.set("shouldFixHeight", true), rt2(a);
      }), d.emitter.on("change", () => {
        Kn(d, a);
      }), Kn(d, a), a.addEventListener("transitionend", (u) => {
        u.propertyName === "height" && d.cleanUpTransition();
      });
    }
    class Et2 {
      constructor(a, u) {
        const v = y(u.viewName);
        this.element = a.createElement("div"), this.element.classList.add(v()), u.viewProps.bindClassModifiers(this.element);
      }
    }
    class Mt extends dn {
      constructor(a, u) {
        const v = u.valueController.viewProps;
        super(Object.assign(Object.assign({}, u), { value: u.valueController.value, view: new Ke(a, {
          props: u.props,
          viewProps: v
        }), viewProps: v })), this.props = u.props, this.valueController = u.valueController, this.view.valueElement.appendChild(this.valueController.view.element);
      }
    }
    class Xn {
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
    class mn {
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
    class Yn {
      constructor(a) {
        this.constraints = a;
      }
      constrain(a) {
        return this.constraints.reduce((u, v) => v.constrain(u), a);
      }
    }
    function Ct(d, a) {
      if (d instanceof a)
        return d;
      if (d instanceof Yn) {
        const u = d.constraints.reduce((v, x) => v || (x instanceof a ? x : null), null);
        if (u)
          return u;
      }
      return null;
    }
    class gt2 {
      constructor(a) {
        this.values = K2.fromObject({
          max: a.max,
          min: a.min
        });
      }
      constrain(a) {
        const u = this.values.get("max"), v = this.values.get("min");
        return Math.min(Math.max(a, v), u);
      }
    }
    class St {
      constructor(a) {
        this.values = K2.fromObject({
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
        const u = this.values.get("max"), v = this.values.get("min");
        let x = a;
        return h2(v) || (x = Math.max(x, v)), h2(u) || (x = Math.min(x, u)), x;
      }
    }
    class M {
      constructor(a, u = 0) {
        this.step = a, this.origin = u;
      }
      constrain(a) {
        const u = this.origin % this.step, v = Math.round((a - u) / this.step);
        return u + v * this.step;
      }
    }
    const U2 = y("pop");
    class W {
      constructor(a, u) {
        this.element = a.createElement("div"), this.element.classList.add(U2()), u.viewProps.bindClassModifiers(this.element), S(u.shows, N(this.element, U2(void 0, "v")));
      }
    }
    class ie2 {
      constructor(a, u) {
        this.shows = H2(false), this.viewProps = u.viewProps, this.view = new W(a, {
          shows: this.shows,
          viewProps: this.viewProps
        });
      }
    }
    const Ee2 = y("txt");
    class Fe {
      constructor(a, u) {
        this.onChange_ = this.onChange_.bind(this), this.element = a.createElement("div"), this.element.classList.add(Ee2()), u.viewProps.bindClassModifiers(this.element), this.props_ = u.props, this.props_.emitter.on("change", this.onChange_);
        const v = a.createElement("input");
        v.classList.add(Ee2("i")), v.type = "text", u.viewProps.bindDisabled(v), this.element.appendChild(v), this.inputElement = v, u.value.emitter.on("change", this.onChange_), this.value_ = u.value, this.refresh();
      }
      refresh() {
        const a = this.props_.get("formatter");
        this.inputElement.value = a(this.value_.rawValue);
      }
      onChange_() {
        this.refresh();
      }
    }
    class Gt {
      constructor(a, u) {
        this.onInputChange_ = this.onInputChange_.bind(this), this.parser_ = u.parser, this.props = u.props, this.value = u.value, this.viewProps = u.viewProps, this.view = new Fe(a, {
          props: u.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_);
      }
      onInputChange_(a) {
        const v = a.currentTarget.value, x = this.parser_(v);
        h2(x) || (this.value.rawValue = x), this.view.refresh();
      }
    }
    function fn(d) {
      return d === "false" ? false : !!d;
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
      "**": (d, a) => Math.pow(d, a),
      "*": (d, a) => d * a,
      "/": (d, a) => d / a,
      "%": (d, a) => d % a,
      "+": (d, a) => d + a,
      "-": (d, a) => d - a,
      "<<": (d, a) => d << a,
      ">>": (d, a) => d >> a,
      ">>>": (d, a) => d >>> a,
      "&": (d, a) => d & a,
      "^": (d, a) => d ^ a,
      "|": (d, a) => d | a
    };
    class qs {
      constructor(a, u, v) {
        this.left = u, this.operator = a, this.right = v;
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
    const Qs = {
      "+": (d) => d,
      "-": (d) => -d,
      "~": (d) => ~d
    };
    class Zs {
      constructor(a, u) {
        this.operator = a, this.expression = u;
      }
      evaluate() {
        const a = Qs[this.operator];
        if (!a)
          throw new Error(`unexpected unary operator: '${this.operator}`);
        return a(this.expression.evaluate());
      }
      toString() {
        return ["u(", this.operator, this.expression.toString(), ")"].join(" ");
      }
    }
    function gi(d) {
      return (a, u) => {
        for (let v = 0; v < d.length; v++) {
          const x = d[v](a, u);
          if (x !== "")
            return x;
        }
        return "";
      };
    }
    function Lt(d, a) {
      var u;
      const v = d.substr(a).match(/^\s+/);
      return (u = v && v[0]) !== null && u !== void 0 ? u : "";
    }
    function _i(d, a) {
      const u = d.substr(a, 1);
      return u.match(/^[1-9]$/) ? u : "";
    }
    function Ge(d, a) {
      var u;
      const v = d.substr(a).match(/^[0-9]+/);
      return (u = v && v[0]) !== null && u !== void 0 ? u : "";
    }
    function wi(d, a) {
      const u = Ge(d, a);
      if (u !== "")
        return u;
      const v = d.substr(a, 1);
      if (a += 1, v !== "-" && v !== "+")
        return "";
      const x = Ge(d, a);
      return x === "" ? "" : v + x;
    }
    function at2(d, a) {
      const u = d.substr(a, 1);
      if (a += 1, u.toLowerCase() !== "e")
        return "";
      const v = wi(d, a);
      return v === "" ? "" : u + v;
    }
    function as(d, a) {
      const u = d.substr(a, 1);
      if (u === "0")
        return u;
      const v = _i(d, a);
      return a += v.length, v === "" ? "" : v + Ge(d, a);
    }
    function vn(d, a) {
      const u = as(d, a);
      if (a += u.length, u === "")
        return "";
      const v = d.substr(a, 1);
      if (a += v.length, v !== ".")
        return "";
      const x = Ge(d, a);
      return a += x.length, u + v + x + at2(d, a);
    }
    function ls(d, a) {
      const u = d.substr(a, 1);
      if (a += u.length, u !== ".")
        return "";
      const v = Ge(d, a);
      return a += v.length, v === "" ? "" : u + v + at2(d, a);
    }
    function qn(d, a) {
      const u = as(d, a);
      return a += u.length, u === "" ? "" : u + at2(d, a);
    }
    const yi = gi([
      vn,
      ls,
      qn
    ]);
    function xi(d, a) {
      var u;
      const v = d.substr(a).match(/^[01]+/);
      return (u = v && v[0]) !== null && u !== void 0 ? u : "";
    }
    function Ws(d, a) {
      const u = d.substr(a, 2);
      if (a += u.length, u.toLowerCase() !== "0b")
        return "";
      const v = xi(d, a);
      return v === "" ? "" : u + v;
    }
    function Js(d, a) {
      var u;
      const v = d.substr(a).match(/^[0-7]+/);
      return (u = v && v[0]) !== null && u !== void 0 ? u : "";
    }
    function er(d, a) {
      const u = d.substr(a, 2);
      if (a += u.length, u.toLowerCase() !== "0o")
        return "";
      const v = Js(d, a);
      return v === "" ? "" : u + v;
    }
    function tr(d, a) {
      var u;
      const v = d.substr(a).match(/^[0-9a-f]+/i);
      return (u = v && v[0]) !== null && u !== void 0 ? u : "";
    }
    function Ei(d, a) {
      const u = d.substr(a, 2);
      if (a += u.length, u.toLowerCase() !== "0x")
        return "";
      const v = tr(d, a);
      return v === "" ? "" : u + v;
    }
    const nr = gi([
      Ws,
      er,
      Ei
    ]), ir = gi([
      nr,
      yi
    ]);
    function bn(d, a) {
      const u = ir(d, a);
      return a += u.length, u === "" ? null : {
        evaluable: new $e(u),
        cursor: a
      };
    }
    function cs(d, a) {
      const u = d.substr(a, 1);
      if (a += u.length, u !== "(")
        return null;
      const v = Ci(d, a);
      if (!v)
        return null;
      a = v.cursor, a += Lt(d, a).length;
      const x = d.substr(a, 1);
      return a += x.length, x !== ")" ? null : {
        evaluable: v.evaluable,
        cursor: a
      };
    }
    function sr(d, a) {
      var u;
      return (u = bn(d, a)) !== null && u !== void 0 ? u : cs(d, a);
    }
    function Qn(d, a) {
      const u = sr(d, a);
      if (u)
        return u;
      const v = d.substr(a, 1);
      if (a += v.length, v !== "+" && v !== "-" && v !== "~")
        return null;
      const x = Qn(d, a);
      return x ? (a = x.cursor, {
        cursor: a,
        evaluable: new Zs(v, x.evaluable)
      }) : null;
    }
    function rr(d, a, u) {
      u += Lt(a, u).length;
      const v = d.filter((x) => a.startsWith(x, u))[0];
      return v ? (u += v.length, u += Lt(a, u).length, {
        cursor: u,
        operator: v
      }) : null;
    }
    function Ht(d, a) {
      return (u, v) => {
        const x = d(u, v);
        if (!x)
          return null;
        v = x.cursor;
        let T = x.evaluable;
        for (; ; ) {
          const V2 = rr(a, u, v);
          if (!V2)
            break;
          v = V2.cursor;
          const z = d(u, v);
          if (!z)
            return null;
          v = z.cursor, T = new qs(V2.operator, T, z.evaluable);
        }
        return T ? {
          cursor: v,
          evaluable: T
        } : null;
      };
    }
    const us = [
      ["**"],
      ["*", "/", "%"],
      ["+", "-"],
      ["<<", ">>>", ">>"],
      ["&"],
      ["^"],
      ["|"]
    ].reduce((d, a) => Ht(d, a), Qn);
    function Ci(d, a) {
      return a += Lt(d, a).length, us(d, a);
    }
    function or(d) {
      const a = Ci(d, 0);
      return !a || a.cursor + Lt(d, a.cursor).length !== d.length ? null : a.evaluable;
    }
    function gn(d) {
      var a;
      const u = or(d);
      return (a = u == null ? void 0 : u.evaluate()) !== null && a !== void 0 ? a : null;
    }
    function ar(d) {
      if (typeof d == "number")
        return d;
      if (typeof d == "string") {
        const a = gn(d);
        if (!h2(a))
          return a;
      }
      return 0;
    }
    function Ie(d) {
      return (a) => a.toFixed(Math.max(Math.min(d, 20), 0));
    }
    const lr = Ie(0);
    function Zn(d) {
      return lr(d) + "%";
    }
    function ps(d) {
      return String(d);
    }
    function Pi(d, a) {
      for (; d.length < a; )
        d.push(void 0);
    }
    function hs(d) {
      const a = [];
      return Pi(a, d), H2(a);
    }
    function ds(d) {
      const a = d.indexOf(void 0);
      return a < 0 ? d : d.slice(0, a);
    }
    function cr(d, a) {
      const u = [...ds(d), a];
      return u.length > d.length ? u.splice(0, u.length - d.length) : Pi(u, d.length), u;
    }
    function Kt({ primary: d, secondary: a, forward: u, backward: v }) {
      let x = false;
      function T(V2) {
        x || (x = true, V2(), x = false);
      }
      d.emitter.on("change", (V2) => {
        T(() => {
          a.setRawValue(u(d, a), V2.options);
        });
      }), a.emitter.on("change", (V2) => {
        T(() => {
          d.setRawValue(v(d, a), V2.options);
        }), T(() => {
          a.setRawValue(u(d, a), V2.options);
        });
      }), T(() => {
        a.setRawValue(u(d, a), {
          forceEmit: false,
          last: true
        });
      });
    }
    function $t(d, a) {
      const u = d * (a.altKey ? 0.1 : 1) * (a.shiftKey ? 10 : 1);
      return a.upKey ? +u : a.downKey ? -u : 0;
    }
    function _n(d) {
      return {
        altKey: d.altKey,
        downKey: d.key === "ArrowDown",
        shiftKey: d.shiftKey,
        upKey: d.key === "ArrowUp"
      };
    }
    function Ti(d) {
      return {
        altKey: d.altKey,
        downKey: d.key === "ArrowLeft",
        shiftKey: d.shiftKey,
        upKey: d.key === "ArrowRight"
      };
    }
    function ur(d) {
      return d === "ArrowUp" || d === "ArrowDown";
    }
    function ms(d) {
      return ur(d) || d === "ArrowLeft" || d === "ArrowRight";
    }
    function ki(d, a) {
      var u, v;
      const x = a.ownerDocument.defaultView, T = a.getBoundingClientRect();
      return {
        x: d.pageX - (((u = x && x.scrollX) !== null && u !== void 0 ? u : 0) + T.left),
        y: d.pageY - (((v = x && x.scrollY) !== null && v !== void 0 ? v : 0) + T.top)
      };
    }
    class Wn {
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
        const v = this.elem_.ownerDocument;
        v.addEventListener("mousemove", this.onDocumentMouseMove_), v.addEventListener("mouseup", this.onDocumentMouseUp_), this.emitter.emit("down", {
          altKey: a.altKey,
          data: this.computePosition_(ki(a, this.elem_)),
          sender: this,
          shiftKey: a.shiftKey
        });
      }
      onDocumentMouseMove_(a) {
        this.emitter.emit("move", {
          altKey: a.altKey,
          data: this.computePosition_(ki(a, this.elem_)),
          sender: this,
          shiftKey: a.shiftKey
        });
      }
      onDocumentMouseUp_(a) {
        const u = this.elem_.ownerDocument;
        u.removeEventListener("mousemove", this.onDocumentMouseMove_), u.removeEventListener("mouseup", this.onDocumentMouseUp_), this.emitter.emit("up", {
          altKey: a.altKey,
          data: this.computePosition_(ki(a, this.elem_)),
          sender: this,
          shiftKey: a.shiftKey
        });
      }
      onTouchStart_(a) {
        a.preventDefault();
        const u = a.targetTouches.item(0), v = this.elem_.getBoundingClientRect();
        this.emitter.emit("down", {
          altKey: a.altKey,
          data: this.computePosition_(u ? {
            x: u.clientX - v.left,
            y: u.clientY - v.top
          } : void 0),
          sender: this,
          shiftKey: a.shiftKey
        }), this.lastTouch_ = u;
      }
      onTouchMove_(a) {
        const u = a.targetTouches.item(0), v = this.elem_.getBoundingClientRect();
        this.emitter.emit("move", {
          altKey: a.altKey,
          data: this.computePosition_(u ? {
            x: u.clientX - v.left,
            y: u.clientY - v.top
          } : void 0),
          sender: this,
          shiftKey: a.shiftKey
        }), this.lastTouch_ = u;
      }
      onTouchEnd_(a) {
        var u;
        const v = (u = a.targetTouches.item(0)) !== null && u !== void 0 ? u : this.lastTouch_, x = this.elem_.getBoundingClientRect();
        this.emitter.emit("up", {
          altKey: a.altKey,
          data: this.computePosition_(v ? {
            x: v.clientX - x.left,
            y: v.clientY - x.top
          } : void 0),
          sender: this,
          shiftKey: a.shiftKey
        });
      }
    }
    function Le(d, a, u, v, x) {
      const T = (d - a) / (u - a);
      return v + T * (x - v);
    }
    function fs(d) {
      return String(d.toFixed(10)).split(".")[1].replace(/0+$/, "").length;
    }
    function Xt(d, a, u) {
      return Math.min(Math.max(d, a), u);
    }
    const We = y("txt");
    class pr {
      constructor(a, u) {
        this.onChange_ = this.onChange_.bind(this), this.props_ = u.props, this.props_.emitter.on("change", this.onChange_), this.element = a.createElement("div"), this.element.classList.add(We(), We(void 0, "num")), u.arrayPosition && this.element.classList.add(We(void 0, u.arrayPosition)), u.viewProps.bindClassModifiers(this.element);
        const v = a.createElement("input");
        v.classList.add(We("i")), v.type = "text", u.viewProps.bindDisabled(v), this.element.appendChild(v), this.inputElement = v, this.onDraggingChange_ = this.onDraggingChange_.bind(this), this.dragging_ = u.dragging, this.dragging_.emitter.on("change", this.onDraggingChange_), this.element.classList.add(We()), this.inputElement.classList.add(We("i"));
        const x = a.createElement("div");
        x.classList.add(We("k")), this.element.appendChild(x), this.knobElement = x;
        const T = a.createElementNS(xe2, "svg");
        T.classList.add(We("g")), this.knobElement.appendChild(T);
        const V2 = a.createElementNS(xe2, "path");
        V2.classList.add(We("gb")), T.appendChild(V2), this.guideBodyElem_ = V2;
        const z = a.createElementNS(xe2, "path");
        z.classList.add(We("gh")), T.appendChild(z), this.guideHeadElem_ = z;
        const re = a.createElement("div");
        re.classList.add(y("tt")()), this.knobElement.appendChild(re), this.tooltipElem_ = re, u.value.emitter.on("change", this.onChange_), this.value = u.value, this.refresh();
      }
      onDraggingChange_(a) {
        if (a.rawValue === null) {
          this.element.classList.remove(We(void 0, "drg"));
          return;
        }
        this.element.classList.add(We(void 0, "drg"));
        const u = a.rawValue / this.props_.get("draggingScale"), v = u + (u > 0 ? -1 : u < 0 ? 1 : 0), x = Xt(-v, -4, 4);
        this.guideHeadElem_.setAttributeNS(null, "d", [`M ${v + x},0 L${v},4 L${v + x},8`, `M ${u},-1 L${u},9`].join(" ")), this.guideBodyElem_.setAttributeNS(null, "d", `M 0,4 L${u},4`);
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
    class wn {
      constructor(a, u) {
        var v;
        this.originRawValue_ = 0, this.onInputChange_ = this.onInputChange_.bind(this), this.onInputKeyDown_ = this.onInputKeyDown_.bind(this), this.onInputKeyUp_ = this.onInputKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.baseStep_ = u.baseStep, this.parser_ = u.parser, this.props = u.props, this.sliderProps_ = (v = u.sliderProps) !== null && v !== void 0 ? v : null, this.value = u.value, this.viewProps = u.viewProps, this.dragging_ = H2(null), this.view = new pr(a, {
          arrayPosition: u.arrayPosition,
          dragging: this.dragging_,
          props: this.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_), this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_), this.view.inputElement.addEventListener("keyup", this.onInputKeyUp_);
        const x = new Wn(this.view.knobElement);
        x.emitter.on("down", this.onPointerDown_), x.emitter.on("move", this.onPointerMove_), x.emitter.on("up", this.onPointerUp_);
      }
      constrainValue_(a) {
        var u, v;
        const x = (u = this.sliderProps_) === null || u === void 0 ? void 0 : u.get("minValue"), T = (v = this.sliderProps_) === null || v === void 0 ? void 0 : v.get("maxValue");
        let V2 = a;
        return x !== void 0 && (V2 = Math.max(V2, x)), T !== void 0 && (V2 = Math.min(V2, T)), V2;
      }
      onInputChange_(a) {
        const v = a.currentTarget.value, x = this.parser_(v);
        h2(x) || (this.value.rawValue = this.constrainValue_(x)), this.view.refresh();
      }
      onInputKeyDown_(a) {
        const u = $t(this.baseStep_, _n(a));
        u !== 0 && this.value.setRawValue(this.constrainValue_(this.value.rawValue + u), {
          forceEmit: false,
          last: false
        });
      }
      onInputKeyUp_(a) {
        $t(this.baseStep_, _n(a)) !== 0 && this.value.setRawValue(this.value.rawValue, {
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
    function it2(d, a) {
      d.write(a);
    }
    function Yt(d) {
      const a = d ? Ct(d, M) : null;
      return a ? a.step : null;
    }
    function yn(d, a) {
      const u = d && Ct(d, M);
      return u ? fs(u.step) : Math.max(fs(a), 2);
    }
    function Ai(d) {
      const a = Yt(d);
      return a ?? 1;
    }
    function Jn(d, a) {
      var u;
      const v = d && Ct(d, M), x = Math.abs((u = v == null ? void 0 : v.step) !== null && u !== void 0 ? u : a);
      return x === 0 ? 0.1 : Math.pow(10, Math.floor(Math.log10(x)) - 1);
    }
    function qt(d) {
      return [d[0], d[1], d[2]];
    }
    function vs(d) {
      const a = Xt(Math.floor(d), 0, 255).toString(16);
      return a.length === 1 ? `0${a}` : a;
    }
    function xn(d, a = "#") {
      const u = qt(d.getComponents("rgb")).map(vs).join("");
      return `${a}${u}`;
    }
    function bs(d, a = "#") {
      const u = d.getComponents("rgb"), v = [u[0], u[1], u[2], u[3] * 255].map(vs).join("");
      return `${a}${v}`;
    }
    function hr(d, a) {
      const u = Ie(a === "float" ? 2 : 0);
      return `rgb(${qt(d.getComponents("rgb", a)).map((x) => u(x)).join(", ")})`;
    }
    function gs(d) {
      return (a) => hr(a, d);
    }
    function _s(d, a) {
      const u = Ie(2), v = Ie(a === "float" ? 2 : 0);
      return `rgba(${d.getComponents("rgb", a).map((T, V2) => (V2 === 3 ? u : v)(T)).join(", ")})`;
    }
    function dr(d) {
      return (a) => _s(a, d);
    }
    function ei(d) {
      const a = [
        Ie(0),
        Zn,
        Zn
      ];
      return `hsl(${qt(d.getComponents("hsl")).map((v, x) => a[x](v)).join(", ")})`;
    }
    function mr(d) {
      const a = [
        Ie(0),
        Zn,
        Zn,
        Ie(2)
      ];
      return `hsla(${d.getComponents("hsl").map((v, x) => a[x](v)).join(", ")})`;
    }
    function ws(d, a) {
      const u = Ie(a === "float" ? 2 : 0), v = ["r", "g", "b"];
      return `{${qt(d.getComponents("rgb", a)).map((T, V2) => `${v[V2]}: ${u(T)}`).join(", ")}}`;
    }
    function ys(d) {
      return (a) => ws(a, d);
    }
    function fr(d, a) {
      const u = Ie(2), v = Ie(a === "float" ? 2 : 0), x = ["r", "g", "b", "a"];
      return `{${d.getComponents("rgb", a).map((V2, z) => {
        const re = z === 3 ? u : v;
        return `${x[z]}: ${re(V2)}`;
      }).join(", ")}}`;
    }
    function vr(d) {
      return (a) => fr(a, d);
    }
    [
      ...["int", "float"].reduce((d, a) => [
        ...d,
        {
          format: {
            alpha: false,
            mode: "rgb",
            notation: "func",
            type: a
          },
          stringifier: gs(a)
        },
        {
          format: {
            alpha: true,
            mode: "rgb",
            notation: "func",
            type: a
          },
          stringifier: dr(a)
        },
        {
          format: {
            alpha: false,
            mode: "rgb",
            notation: "object",
            type: a
          },
          stringifier: ys(a)
        },
        {
          format: {
            alpha: true,
            mode: "rgb",
            notation: "object",
            type: a
          },
          stringifier: vr(a)
        }
      ], [])
    ];
    class br {
      constructor(a) {
        this.components = a.components, this.asm_ = a.assembly;
      }
      constrain(a) {
        const u = this.asm_.toComponents(a).map((v, x) => {
          var T, V2;
          return (V2 = (T = this.components[x]) === null || T === void 0 ? void 0 : T.constrain(v)) !== null && V2 !== void 0 ? V2 : v;
        });
        return this.asm_.fromComponents(u);
      }
    }
    const xs = y("pndtxt");
    class gr {
      constructor(a, u) {
        this.textViews = u.textViews, this.element = a.createElement("div"), this.element.classList.add(xs()), this.textViews.forEach((v) => {
          const x = a.createElement("div");
          x.classList.add(xs("a")), x.appendChild(v.element), this.element.appendChild(x);
        });
      }
    }
    function Mi(d, a, u) {
      return new wn(d, {
        arrayPosition: u === 0 ? "fst" : u === a.axes.length - 1 ? "lst" : "mid",
        baseStep: a.axes[u].baseStep,
        parser: a.parser,
        props: a.axes[u].textProps,
        value: H2(0, {
          constraint: a.axes[u].constraint
        }),
        viewProps: a.viewProps
      });
    }
    class Rt2 {
      constructor(a, u) {
        this.value = u.value, this.viewProps = u.viewProps, this.acs_ = u.axes.map((v, x) => Mi(a, u, x)), this.acs_.forEach((v, x) => {
          Kt({
            primary: this.value,
            secondary: v.value,
            forward: (T) => u.assembly.toComponents(T.rawValue)[x],
            backward: (T, V2) => {
              const z = u.assembly.toComponents(T.rawValue);
              return z[x] = V2.rawValue, u.assembly.fromComponents(z);
            }
          });
        }), this.view = new gr(a, {
          textViews: this.acs_.map((v) => v.view)
        });
      }
    }
    function _r(d, a) {
      return "step" in d && !h2(d.step) ? new M(d.step, a) : null;
    }
    function En(d) {
      return !h2(d.max) && !h2(d.min) ? new gt2({
        max: d.max,
        min: d.min
      }) : !h2(d.max) || !h2(d.min) ? new St({
        max: d.max,
        min: d.min
      }) : null;
    }
    const wr = {
      monitor: {
        defaultInterval: 200,
        defaultLineCount: 3
      }
    }, lt2 = y("grl");
    class Es {
      constructor(a, u) {
        this.onCursorChange_ = this.onCursorChange_.bind(this), this.onValueUpdate_ = this.onValueUpdate_.bind(this), this.element = a.createElement("div"), this.element.classList.add(lt2()), u.viewProps.bindClassModifiers(this.element), this.formatter_ = u.formatter, this.props_ = u.props, this.cursor_ = u.cursor, this.cursor_.emitter.on("change", this.onCursorChange_);
        const v = a.createElementNS(xe2, "svg");
        v.classList.add(lt2("g")), v.style.height = `calc(var(--bld-us) * ${u.lineCount})`, this.element.appendChild(v), this.svgElem_ = v;
        const x = a.createElementNS(xe2, "polyline");
        this.svgElem_.appendChild(x), this.lineElem_ = x;
        const T = a.createElement("div");
        T.classList.add(lt2("t"), y("tt")()), this.element.appendChild(T), this.tooltipElem_ = T, u.value.emitter.on("change", this.onValueUpdate_), this.value = u.value, this.update_();
      }
      get graphElement() {
        return this.svgElem_;
      }
      update_() {
        const a = this.svgElem_.getBoundingClientRect(), u = this.value.rawValue.length - 1, v = this.props_.get("minValue"), x = this.props_.get("maxValue"), T = [];
        this.value.rawValue.forEach((tt2, te) => {
          if (tt2 === void 0)
            return;
          const kt = Le(te, 0, u, 0, a.width), Ir = Le(tt2, v, x, a.height, 0);
          T.push([kt, Ir].join(","));
        }), this.lineElem_.setAttributeNS(null, "points", T.join(" "));
        const V2 = this.tooltipElem_, z = this.value.rawValue[this.cursor_.rawValue];
        if (z === void 0) {
          V2.classList.remove(lt2("t", "a"));
          return;
        }
        const re = Le(this.cursor_.rawValue, 0, u, 0, a.width), et2 = Le(z, v, x, a.height, 0);
        V2.style.left = `${re}px`, V2.style.top = `${et2}px`, V2.textContent = `${this.formatter_(z)}`, V2.classList.contains(lt2("t", "a")) || (V2.classList.add(lt2("t", "a"), lt2("t", "in")), rt2(V2), V2.classList.remove(lt2("t", "in")));
      }
      onValueUpdate_() {
        this.update_();
      }
      onCursorChange_() {
        this.update_();
      }
    }
    class yr {
      constructor(a, u) {
        if (this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this), this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this), this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this), this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this), this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this), this.props_ = u.props, this.value = u.value, this.viewProps = u.viewProps, this.cursor_ = H2(-1), this.view = new Es(a, {
          cursor: this.cursor_,
          formatter: u.formatter,
          lineCount: u.lineCount,
          props: this.props_,
          value: this.value,
          viewProps: this.viewProps
        }), !Ze2(a))
          this.view.element.addEventListener("mousemove", this.onGraphMouseMove_), this.view.element.addEventListener("mouseleave", this.onGraphMouseLeave_);
        else {
          const v = new Wn(this.view.element);
          v.emitter.on("down", this.onGraphPointerDown_), v.emitter.on("move", this.onGraphPointerMove_), v.emitter.on("up", this.onGraphPointerUp_);
        }
      }
      onGraphMouseLeave_() {
        this.cursor_.rawValue = -1;
      }
      onGraphMouseMove_(a) {
        const u = this.view.element.getBoundingClientRect();
        this.cursor_.rawValue = Math.floor(Le(a.offsetX, 0, u.width, 0, this.value.rawValue.length));
      }
      onGraphPointerDown_(a) {
        this.onGraphPointerMove_(a);
      }
      onGraphPointerMove_(a) {
        if (!a.data.point) {
          this.cursor_.rawValue = -1;
          return;
        }
        this.cursor_.rawValue = Math.floor(Le(a.data.point.x, 0, a.data.bounds.width, 0, this.value.rawValue.length));
      }
      onGraphPointerUp_() {
        this.cursor_.rawValue = -1;
      }
    }
    class Cs {
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
        const v = u.bind(this);
        return this.controller_.emitter.on(a, () => {
          v(new o(this));
        }), this;
      }
    }
    class xr extends o {
      constructor(a, u, v) {
        super(a), this.cell = u, this.index = v;
      }
    }
    class Ps extends r {
      constructor(a) {
        super(a), this.cellToApiMap_ = /* @__PURE__ */ new Map(), this.emitter_ = new w();
        const u = this.controller_.valueController;
        u.cellControllers.forEach((v, x) => {
          const T = new Cs(v);
          this.cellToApiMap_.set(v, T), v.emitter.on("click", () => {
            const V2 = x % u.size[0], z = Math.floor(x / u.size[0]);
            this.emitter_.emit("click", {
              event: new xr(this, T, [V2, z])
            });
          });
        });
      }
      cell(a, u) {
        const v = this.controller_.valueController, x = v.cellControllers[u * v.size[0] + a];
        return this.cellToApiMap_.get(x);
      }
      on(a, u) {
        const v = u.bind(this);
        return this.emitter_.on(a, (x) => {
          v(x.event);
        }), this;
      }
    }
    class Si {
      constructor(a, u) {
        this.size = u.size;
        const [v, x] = this.size, T = [];
        for (let V2 = 0; V2 < x; V2++)
          for (let z = 0; z < v; z++) {
            const re = new G(a, {
              props: K2.fromObject(Object.assign({}, u.cellConfig(z, V2))),
              viewProps: ge.create()
            });
            T.push(re);
          }
        this.cellCs_ = T, this.viewProps = ge.create(), this.viewProps.handleDispose(() => {
          this.cellCs_.forEach((V2) => {
            V2.viewProps.set("disposed", true);
          });
        }), this.view = new Et2(a, {
          viewProps: this.viewProps,
          viewName: "btngrid"
        }), this.view.element.style.gridTemplateColumns = `repeat(${v}, 1fr)`, this.cellCs_.forEach((V2) => {
          this.view.element.appendChild(V2.view.element);
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
      accept(d) {
        const a = he, u = ee(d, {
          cells: a.required.function,
          size: a.required.array(a.required.number),
          view: a.required.constant("buttongrid"),
          label: a.optional.string
        });
        return u ? { params: u } : null;
      },
      controller(d) {
        return new ot2(d.document, {
          blade: d.blade,
          props: K2.fromObject({
            label: d.params.label
          }),
          valueController: new Si(d.document, {
            cellConfig: d.params.cells,
            size: d.params.size
          })
        });
      },
      api(d) {
        return !(d.controller instanceof ot2) || !(d.controller.valueController instanceof Si) ? null : new Ps(d.controller);
      }
    };
    class Ts extends r {
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
        const v = u.bind(this);
        return this.controller_.valueController.value.emitter.on(a, (x) => {
          v(new c(this, x.rawValue, void 0, x.options.last));
        }), this;
      }
    }
    function Je(d, a, u) {
      return d * (1 - u) + a * u;
    }
    const Cr = 20, Pr = 1e-3, Li = 100;
    function Tr(d, a) {
      let u = 0.25, v = 0.5, x = -1;
      for (let T = 0; T < Cr; T++) {
        const [V2, z] = d.curve(v);
        if (v += u * (V2 < a ? 1 : -1), x = z, u *= 0.5, Math.abs(a - V2) < Pr)
          break;
      }
      return x;
    }
    class Pt {
      constructor(a = 0, u = 0, v = 1, x = 1) {
        this.cache_ = [], this.comps_ = [a, u, v, x];
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
        return h2(a) || !Array.isArray(a) ? false : typeof a[0] == "number" && typeof a[1] == "number" && typeof a[2] == "number" && typeof a[3] == "number";
      }
      static equals(a, u) {
        return a.x1 === u.x1 && a.y1 === u.y1 && a.x2 === u.x2 && a.y2 === u.y2;
      }
      curve(a) {
        const u = Je(0, this.x1, a), v = Je(0, this.y1, a), x = Je(this.x1, this.x2, a), T = Je(this.y1, this.y2, a), V2 = Je(this.x2, 1, a), z = Je(this.y2, 1, a), re = Je(u, x, a), et2 = Je(v, T, a), tt2 = Je(x, V2, a), te = Je(T, z, a);
        return [Je(re, tt2, a), Je(et2, te, a)];
      }
      y(a) {
        if (this.cache_.length === 0) {
          const u = [];
          for (let v = 0; v < Li; v++)
            u.push(Tr(this, Le(v, 0, Li - 1, 0, 1)));
          this.cache_ = u;
        }
        return this.cache_[Math.round(Le(Xt(a, 0, 1), 0, 1, 0, Li - 1))];
      }
      toObject() {
        return [this.comps_[0], this.comps_[1], this.comps_[2], this.comps_[3]];
      }
    }
    const Ri = {
      toComponents: (d) => d.toObject(),
      fromComponents: (d) => new Pt(...d)
    };
    function kr(d) {
      const a = Ie(2);
      return `cubic-bezier(${d.toObject().map((v) => a(v)).join(", ")})`;
    }
    const Vi = [0, 0.5, 0.5, 1];
    function Ar(d) {
      const a = d.match(/^cubic-bezier\s*\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*\)$/);
      if (!a)
        return new Pt(...Vi);
      const u = [a[1], a[2], a[3], a[4]].reduce((v, x) => {
        if (!v)
          return null;
        const T = Number(x);
        return isNaN(T) ? null : [...v, T];
      }, []);
      return new Pt(...u ?? Vi);
    }
    const Vt = y("cbz");
    class ks {
      constructor(a, u) {
        this.element = a.createElement("div"), this.element.classList.add(Vt()), u.viewProps.bindClassModifiers(this.element), u.foldable.bindExpandedClass(this.element, Vt(void 0, "expanded")), R(u.foldable, "completed", N(this.element, Vt(void 0, "cpl")));
        const v = a.createElement("div");
        v.classList.add(Vt("h")), this.element.appendChild(v);
        const x = a.createElement("button");
        x.classList.add(Vt("b")), u.viewProps.bindDisabled(x);
        const T = a.createElementNS(xe2, "svg");
        T.innerHTML = '<path d="M2 13C8 13 8 3 14 3"/>', x.appendChild(T), v.appendChild(x), this.buttonElement = x;
        const V2 = a.createElement("div");
        if (V2.classList.add(Vt("t")), v.appendChild(V2), this.textElement = V2, u.pickerLayout === "inline") {
          const z = a.createElement("div");
          z.classList.add(Vt("p")), this.element.appendChild(z), this.pickerElement = z;
        } else
          this.pickerElement = null;
      }
    }
    const ti = y("cbzp");
    class As {
      constructor(a, u) {
        this.element = a.createElement("div"), this.element.classList.add(ti()), u.viewProps.bindClassModifiers(this.element);
        const v = a.createElement("div");
        v.classList.add(ti("g")), this.element.appendChild(v), this.graphElement = v;
        const x = a.createElement("div");
        x.classList.add(ti("t")), this.element.appendChild(x), this.textElement = x;
      }
    }
    function ct2(d, a) {
      const u = new MutationObserver((x) => {
        for (const T of x)
          T.type === "childList" && T.addedNodes.forEach((V2) => {
            V2.contains(V2) && (a(), u.disconnect());
          });
      }), v = d.ownerDocument;
      u.observe(v.body, {
        attributes: true,
        childList: true,
        subtree: true
      });
    }
    const _t = y("cbzg");
    function Mr(d, a) {
      return (u) => a(d(u));
    }
    class De {
      constructor(a, u) {
        this.element = a.createElement("div"), this.element.classList.add(_t()), u.viewProps.bindClassModifiers(this.element), u.viewProps.bindTabIndex(this.element);
        const v = a.createElement("div");
        v.classList.add(_t("p")), this.element.appendChild(v), this.previewElement = v;
        const x = a.createElementNS(xe2, "svg");
        x.classList.add(_t("g")), this.element.appendChild(x), this.svgElem_ = x;
        const T = a.createElementNS(xe2, "path");
        T.classList.add(_t("u")), this.svgElem_.appendChild(T), this.guideElem_ = T;
        const V2 = a.createElementNS(xe2, "polyline");
        V2.classList.add(_t("l")), this.svgElem_.appendChild(V2), this.lineElem_ = V2, this.handleElems_ = [a.createElement("div"), a.createElement("div")], this.handleElems_.forEach((z) => {
          z.classList.add(_t("h")), this.element.appendChild(z);
        }), this.vectorElems_ = [
          a.createElementNS(xe2, "line"),
          a.createElementNS(xe2, "line")
        ], this.vectorElems_.forEach((z) => {
          z.classList.add(_t("v")), this.svgElem_.appendChild(z);
        }), this.value_ = u.value, this.value_.emitter.on("change", this.onValueChange_.bind(this)), this.sel_ = u.selection, this.handleElems_.forEach((z, re) => {
          S(this.sel_, Mr((et2) => et2 === re, N(z, _t("h", "sel"))));
        }), ct2(this.element, () => {
          this.refresh();
        });
      }
      getVertMargin_(a) {
        return a * 0.25;
      }
      valueToPosition(a, u) {
        const v = this.element.getBoundingClientRect(), x = v.width, T = v.height, V2 = this.getVertMargin_(T);
        return {
          x: Le(a, 0, 1, 0, x),
          y: Le(u, 0, 1, T - V2, V2)
        };
      }
      positionToValue(a, u) {
        const v = this.element.getBoundingClientRect(), x = v.width, T = v.height, V2 = this.getVertMargin_(T);
        return {
          x: Xt(Le(a, 0, x, 0, 1), 0, 1),
          y: Le(u, T - V2, V2, 0, 1)
        };
      }
      refresh() {
        this.guideElem_.setAttributeNS(null, "d", [0, 1].map((T) => {
          const V2 = this.valueToPosition(0, T), z = this.valueToPosition(1, T);
          return [`M ${V2.x},${V2.y}`, `L ${z.x},${z.y}`].join(" ");
        }).join(" "));
        const a = this.value_.rawValue, u = [];
        let v = 0;
        for (; ; ) {
          const T = this.valueToPosition(...a.curve(v));
          if (u.push([T.x, T.y].join(",")), v >= 1)
            break;
          v = Math.min(v + 0.05, 1);
        }
        this.lineElem_.setAttributeNS(null, "points", u.join(" "));
        const x = a.toObject();
        [0, 1].forEach((T) => {
          const V2 = this.valueToPosition(T, T), z = this.valueToPosition(x[T * 2], x[T * 2 + 1]), re = this.vectorElems_[T];
          re.setAttributeNS(null, "x1", String(V2.x)), re.setAttributeNS(null, "y1", String(V2.y)), re.setAttributeNS(null, "x2", String(z.x)), re.setAttributeNS(null, "y2", String(z.y));
          const et2 = this.handleElems_[T];
          et2.style.left = `${z.x}px`, et2.style.top = `${z.y}px`;
        });
      }
      onValueChange_() {
        this.refresh();
      }
    }
    const Ms = 24, Cn = 400, Ii = 1e3, Tt = y("cbzprv");
    class Qt {
      constructor(a, u) {
        this.stopped_ = true, this.startTime_ = -1, this.onDispose_ = this.onDispose_.bind(this), this.onTimer_ = this.onTimer_.bind(this), this.onValueChange_ = this.onValueChange_.bind(this), this.element = a.createElement("div"), this.element.classList.add(Tt()), u.viewProps.bindClassModifiers(this.element);
        const v = a.createElementNS(xe2, "svg");
        v.classList.add(Tt("g")), this.element.appendChild(v), this.svgElem_ = v;
        const x = a.createElementNS(xe2, "path");
        x.classList.add(Tt("t")), this.svgElem_.appendChild(x), this.ticksElem_ = x;
        const T = a.createElement("div");
        T.classList.add(Tt("m")), this.element.appendChild(T), this.markerElem_ = T, this.value_ = u.value, this.value_.emitter.on("change", this.onValueChange_), u.viewProps.handleDispose(this.onDispose_), ct2(this.element, () => {
          this.refresh();
        });
      }
      play() {
        this.stop(), this.updateMarker_(0), this.markerElem_.classList.add(Tt("m", "a")), this.startTime_ = (/* @__PURE__ */ new Date()).getTime() + Cn, this.stopped_ = false, requestAnimationFrame(this.onTimer_);
      }
      stop() {
        this.stopped_ = true, this.markerElem_.classList.remove(Tt("m", "a"));
      }
      onDispose_() {
        this.stop();
      }
      updateMarker_(a) {
        const u = this.value_.rawValue.y(Xt(a, 0, 1));
        this.markerElem_.style.left = `${u * 100}%`;
      }
      refresh() {
        const a = this.svgElem_.getBoundingClientRect(), u = a.width, v = a.height, x = [], T = this.value_.rawValue;
        for (let V2 = 0; V2 < Ms; V2++) {
          const z = Le(V2, 0, Ms - 1, 0, 1), re = Le(T.y(z), 0, 1, 0, u);
          x.push(`M ${re},0 v${v}`);
        }
        this.ticksElem_.setAttributeNS(null, "d", x.join(" "));
      }
      onTimer_() {
        if (this.startTime_ === null)
          return;
        const a = (/* @__PURE__ */ new Date()).getTime() - this.startTime_, u = a / Ii;
        this.updateMarker_(u), a > Ii + Cn && this.stop(), this.stopped_ || requestAnimationFrame(this.onTimer_);
      }
      onValueChange_() {
        this.refresh(), this.play();
      }
    }
    function je(d, a, u, v) {
      const x = u - d, T = v - a;
      return Math.sqrt(x * x + T * T);
    }
    function Pn(d, a, u, v) {
      const x = je(d, a, u, v), T = Math.atan2(v - a, u - d), V2 = Math.round(T / (Math.PI / 4)) * Math.PI / 4;
      return {
        x: d + Math.cos(V2) * x,
        y: a + Math.sin(V2) * x
      };
    }
    class ut2 {
      constructor(a, u) {
        this.onKeyDown_ = this.onKeyDown_.bind(this), this.onKeyUp_ = this.onKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.baseStep_ = u.baseStep, this.value = u.value, this.sel_ = H2(0), this.viewProps = u.viewProps, this.view = new De(a, {
          selection: this.sel_,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.element.addEventListener("keydown", this.onKeyDown_), this.view.element.addEventListener("keyup", this.onKeyUp_), this.prevView_ = new Qt(a, {
          value: this.value,
          viewProps: this.viewProps
        }), this.prevView_.element.addEventListener("mousedown", (x) => {
          x.stopImmediatePropagation(), x.preventDefault(), this.prevView_.play();
        }), this.view.previewElement.appendChild(this.prevView_.element);
        const v = new Wn(this.view.element);
        v.emitter.on("down", this.onPointerDown_), v.emitter.on("move", this.onPointerMove_), v.emitter.on("up", this.onPointerUp_);
      }
      refresh() {
        this.view.refresh(), this.prevView_.refresh(), this.prevView_.play();
      }
      updateValue_(a, u, v) {
        const x = this.sel_.rawValue, T = this.value.rawValue.toObject(), V2 = this.view.positionToValue(a.x, a.y), z = u ? Pn(x, x, V2.x, V2.y) : V2;
        T[x * 2] = z.x, T[x * 2 + 1] = z.y, this.value.setRawValue(new Pt(...T), v);
      }
      onPointerDown_(a) {
        const u = a.data;
        if (!u.point)
          return;
        const v = this.value.rawValue, x = this.view.valueToPosition(v.x1, v.y1), T = je(u.point.x, u.point.y, x.x, x.y), V2 = this.view.valueToPosition(v.x2, v.y2), z = je(u.point.x, u.point.y, V2.x, V2.y);
        this.sel_.rawValue = T <= z ? 0 : 1, this.updateValue_(u.point, a.shiftKey, {
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
        ms(a.key) && a.preventDefault();
        const u = this.sel_.rawValue, v = this.value.rawValue.toObject();
        v[u * 2] += $t(this.baseStep_, Ti(a)), v[u * 2 + 1] += $t(this.baseStep_, _n(a)), this.value.setRawValue(new Pt(...v), {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(a) {
        ms(a.key) && a.preventDefault();
        const u = $t(this.baseStep_, Ti(a)), v = $t(this.baseStep_, _n(a));
        u === 0 && v === 0 || this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    class Ss {
      constructor(a, u) {
        this.value = u.value, this.viewProps = u.viewProps, this.view = new As(a, {
          viewProps: this.viewProps
        }), this.gc_ = new ut2(a, {
          baseStep: u.axis.baseStep,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.graphElement.appendChild(this.gc_.view.element);
        const v = Object.assign(Object.assign({}, u.axis), { constraint: new St({ max: 1, min: 0 }) }), x = Object.assign(Object.assign({}, u.axis), { constraint: void 0 });
        this.tc_ = new Rt2(a, {
          assembly: Ri,
          axes: [v, x, v, x],
          parser: gn,
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
    class ni {
      constructor(a, u) {
        this.onButtonBlur_ = this.onButtonBlur_.bind(this), this.onButtonClick_ = this.onButtonClick_.bind(this), this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this), this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this), this.value = u.value, this.viewProps = u.viewProps, this.foldable_ = Hn(u.expanded), this.view = new ks(a, {
          foldable: this.foldable_,
          pickerLayout: u.pickerLayout,
          viewProps: this.viewProps
        }), this.view.buttonElement.addEventListener("blur", this.onButtonBlur_), this.view.buttonElement.addEventListener("click", this.onButtonClick_), this.tc_ = new Gt(a, {
          parser: Ar,
          props: K2.fromObject({
            formatter: kr
          }),
          value: this.value,
          viewProps: this.viewProps
        }), this.view.textElement.appendChild(this.tc_.view.element), this.popC_ = u.pickerLayout === "popup" ? new ie2(a, {
          viewProps: this.viewProps
        }) : null;
        const v = new Ss(a, {
          axis: u.axis,
          value: this.value,
          viewProps: this.viewProps
        });
        v.allFocusableElements.forEach((x) => {
          x.addEventListener("blur", this.onPopupChildBlur_), x.addEventListener("keydown", this.onPopupChildKeydown_);
        }), this.pickerC_ = v, this.popC_ ? (this.view.element.appendChild(this.popC_.view.element), this.popC_.view.element.appendChild(this.pickerC_.view.element), S(this.popC_.shows, (x) => {
          x && v.refresh();
        }), Kt({
          primary: this.foldable_.value("expanded"),
          secondary: this.popC_.shows,
          forward: (x) => x.rawValue,
          backward: (x, T) => T.rawValue
        })) : this.view.pickerElement && (this.view.pickerElement.appendChild(this.pickerC_.view.element), $n(this.foldable_, this.view.pickerElement));
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
        const u = this.popC_.view.element, v = hn(a);
        v && u.contains(v) || v && v === this.view.buttonElement && !Ze2(u.ownerDocument) || (this.popC_.shows.rawValue = false);
      }
      onPopupChildKeydown_(a) {
        this.popC_ && a.key === "Escape" && (this.popC_.shows.rawValue = false);
      }
    }
    function Di() {
      return new br({
        assembly: Ri,
        components: [0, 1, 2, 3].map((d) => d % 2 === 0 ? new St({
          min: 0,
          max: 1
        }) : void 0)
      });
    }
    const It = {
      id: "cubic-bezier",
      type: "blade",
      css: '.tp-cbzgv,.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-radv_b:hover,.tp-rslv_k:hover,.tp-cbzv_b:hover{background-color:var(--btn-bg-h)}.tp-radv_b:focus,.tp-rslv_k:focus,.tp-cbzv_b:focus{background-color:var(--btn-bg-f)}.tp-radv_b:active,.tp-rslv_k:active,.tp-cbzv_b:active{background-color:var(--btn-bg-a)}.tp-radv_b:disabled,.tp-rslv_k:disabled,.tp-cbzv_b:disabled{opacity:.5}.tp-cbzgv{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-cbzgv:hover{background-color:var(--in-bg-h)}.tp-cbzgv:focus{background-color:var(--in-bg-f)}.tp-cbzgv:active{background-color:var(--in-bg-a)}.tp-cbzgv:disabled{opacity:.5}.tp-btngridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-btngridv.tp-v-disabled{opacity:.5}.tp-btngridv .tp-btnv_b:disabled{opacity:1}.tp-btngridv .tp-btnv_b:disabled .tp-btnv_t{opacity:.5}.tp-btngridv .tp-btnv_b{border-radius:0}.tp-cbzv{position:relative}.tp-cbzv_h{display:flex}.tp-cbzv_b{margin-right:4px;position:relative;width:var(--bld-us)}.tp-cbzv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-cbzv_b svg path{stroke:var(--bs-bg);stroke-width:2}.tp-cbzv_t{flex:1}.tp-cbzv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-cbzv.tp-cbzv-expanded .tp-cbzv_p{margin-top:var(--bld-s);opacity:1}.tp-cbzv.tp-cbzv-cpl .tp-cbzv_p{overflow:visible}.tp-cbzv .tp-popv{left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-cbzpv_t{margin-top:var(--bld-s)}.tp-cbzgv{height:auto;overflow:hidden;position:relative}.tp-cbzgv.tp-v-disabled{opacity:.5}.tp-cbzgv_p{left:16px;position:absolute;right:16px;top:0}.tp-cbzgv_g{cursor:pointer;display:block;height:calc(var(--bld-us)*5);width:100%}.tp-cbzgv_u{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_l{fill:rgba(0,0,0,0);stroke:var(--in-fg)}.tp-cbzgv_v{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_h{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;pointer-events:none;position:absolute;width:4px}.tp-cbzgv:focus .tp-cbzgv_h-sel{background-color:var(--in-fg);border-width:0}.tp-cbzprvv{cursor:pointer;height:4px;padding:4px 0;position:relative}.tp-cbzprvv_g{display:block;height:100%;overflow:visible;width:100%}.tp-cbzprvv_t{opacity:.5;stroke:var(--mo-fg)}.tp-cbzprvv_m{background-color:var(--mo-fg);border-radius:50%;height:4px;margin-left:-2px;margin-top:-2px;opacity:0;position:absolute;top:50%;transition:opacity .2s ease-out;width:4px}.tp-cbzprvv_m.tp-cbzprvv_m-a{opacity:1}.tp-fpsv{position:relative}.tp-fpsv_l{bottom:4px;color:var(--mo-fg);line-height:1;right:4px;pointer-events:none;position:absolute}.tp-fpsv_u{margin-left:.2em;opacity:.7}.tp-rslv{cursor:pointer;padding-left:8px;padding-right:8px}.tp-rslv.tp-v-disabled{opacity:.5}.tp-rslv_t{height:calc(var(--bld-us));position:relative}.tp-rslv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:-4px;right:-4px}.tp-rslv_b{bottom:0;top:0;position:absolute}.tp-rslv_b::before{background-color:var(--in-fg);content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:0;right:0}.tp-rslv_k{height:calc(var(--bld-us) - 8px);margin-top:calc((var(--bld-us) - 8px)/-2);position:absolute;top:50%;width:8px}.tp-rslv_k.tp-rslv_k-min{margin-left:-8px}.tp-rslv_k.tp-rslv_k-max{margin-left:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-min{border-bottom-right-radius:0;border-top-right-radius:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-max{border-bottom-left-radius:0;border-top-left-radius:0}.tp-rsltxtv{display:flex}.tp-rsltxtv_s{flex:1}.tp-rsltxtv_t{flex:1;margin-left:4px}.tp-radv_l{display:block;position:relative}.tp-radv_i{left:0;opacity:0;position:absolute;top:0}.tp-radv_b{opacity:.5}.tp-radv_i:hover+.tp-radv_b{background-color:var(--btn-bg-h)}.tp-radv_i:focus+.tp-radv_b{background-color:var(--btn-bg-f)}.tp-radv_i:active+.tp-radv_b{background-color:var(--btn-bg-a)}.tp-radv_i:checked+.tp-radv_b{opacity:1}.tp-radv_t{bottom:0;color:inherit;left:0;overflow:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0}.tp-radv_i:disabled+.tp-radv_b>.tp-radv_t{opacity:.5}.tp-radgridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-radgridv.tp-v-disabled{opacity:.5}.tp-radgridv .tp-radv_b{border-radius:0}',
      accept(d) {
        const a = he, u = ee(d, {
          value: a.required.array(a.required.number),
          view: a.required.constant("cubicbezier"),
          expanded: a.optional.boolean,
          label: a.optional.string,
          picker: a.optional.custom((v) => v === "inline" || v === "popup" ? v : void 0)
        });
        return u ? { params: u } : null;
      },
      controller(d) {
        var a, u;
        const v = new Pt(...d.params.value), x = H2(v, {
          constraint: Di(),
          equals: Pt.equals
        }), T = new ni(d.document, {
          axis: {
            baseStep: 0.1,
            textProps: K2.fromObject({
              draggingScale: 0.01,
              formatter: Ie(2)
            })
          },
          expanded: (a = d.params.expanded) !== null && a !== void 0 ? a : false,
          pickerLayout: (u = d.params.picker) !== null && u !== void 0 ? u : "popup",
          value: x,
          viewProps: d.viewProps
        });
        return new Mt(d.document, {
          blade: d.blade,
          props: K2.fromObject({
            label: d.params.label
          }),
          valueController: T
        });
      },
      api(d) {
        return !(d.controller instanceof Mt) || !(d.controller.valueController instanceof ni) ? null : new Ts(d.controller);
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
    const Oi = 20;
    class Re2 {
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
        if (this.timestamps_.length <= Oi)
          return;
        const a = this.timestamps_.length - Oi;
        this.timestamps_.splice(0, a);
        const u = this.timestamps_[0].frameCount;
        this.timestamps_.forEach((v) => {
          v.frameCount -= u;
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
    const Zt = y("fps");
    class Ye {
      constructor(a, u) {
        this.element = a.createElement("div"), this.element.classList.add(Zt()), u.viewProps.bindClassModifiers(this.element), this.graphElement = a.createElement("div"), this.graphElement.classList.add(Zt("g")), this.element.appendChild(this.graphElement);
        const v = a.createElement("div");
        v.classList.add(Zt("l")), this.element.appendChild(v);
        const x = a.createElement("span");
        x.classList.add(Zt("v")), x.textContent = "--", v.appendChild(x), this.valueElement = x;
        const T = a.createElement("span");
        T.classList.add(Zt("u")), T.textContent = "FPS", v.appendChild(T);
      }
    }
    class Ni {
      constructor(a, u) {
        this.stopwatch_ = new Re2(), this.onTick_ = this.onTick_.bind(this), this.ticker_ = u.ticker, this.ticker_.emitter.on("tick", this.onTick_), this.value_ = u.value, this.viewProps = u.viewProps, this.view = new Ye(a, {
          viewProps: this.viewProps
        }), this.graphC_ = new yr(a, {
          formatter: Ie(0),
          lineCount: u.lineCount,
          props: K2.fromObject({
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
          this.value_.rawValue = cr(u, a), this.view.valueElement.textContent = a.toFixed(0);
        }
      }
    }
    function Tn(d, a) {
      return a === 0 ? new Xn() : new mn(d, a ?? wr.monitor.defaultInterval);
    }
    const Bi = {
      id: "fpsgraph",
      type: "blade",
      accept(d) {
        const a = he, u = ee(d, {
          view: a.required.constant("fpsgraph"),
          interval: a.optional.number,
          label: a.optional.string,
          lineCount: a.optional.number,
          max: a.optional.number,
          min: a.optional.number
        });
        return u ? { params: u } : null;
      },
      controller(d) {
        var a, u, v, x;
        const T = (a = d.params.interval) !== null && a !== void 0 ? a : 500;
        return new ot2(d.document, {
          blade: d.blade,
          props: K2.fromObject({
            label: d.params.label
          }),
          valueController: new Ni(d.document, {
            lineCount: (u = d.params.lineCount) !== null && u !== void 0 ? u : 2,
            maxValue: (v = d.params.max) !== null && v !== void 0 ? v : 90,
            minValue: (x = d.params.min) !== null && x !== void 0 ? x : 0,
            ticker: Tn(d.document, T),
            value: hs(80),
            viewProps: d.viewProps
          })
        });
      },
      api(d) {
        return !(d.controller instanceof ot2) || !(d.controller.valueController instanceof Ni) ? null : new we(d.controller);
      }
    };
    class qe {
      constructor(a, u) {
        this.min = a, this.max = u;
      }
      static isObject(a) {
        if (typeof a != "object" || a === null)
          return false;
        const u = a.min, v = a.max;
        return !(typeof u != "number" || typeof v != "number");
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
      fromComponents: (d) => new qe(d[0], d[1]),
      toComponents: (d) => [d.min, d.max]
    };
    class kn {
      constructor(a) {
        this.edge = a;
      }
      constrain(a) {
        var u, v, x, T, V2, z, re, et2;
        if (a.min <= a.max)
          return new qe((v = (u = this.edge) === null || u === void 0 ? void 0 : u.constrain(a.min)) !== null && v !== void 0 ? v : a.min, (T = (x = this.edge) === null || x === void 0 ? void 0 : x.constrain(a.max)) !== null && T !== void 0 ? T : a.max);
        const tt2 = (a.min + a.max) / 2;
        return new qe((z = (V2 = this.edge) === null || V2 === void 0 ? void 0 : V2.constrain(tt2)) !== null && z !== void 0 ? z : tt2, (et2 = (re = this.edge) === null || re === void 0 ? void 0 : re.constrain(tt2)) !== null && et2 !== void 0 ? et2 : tt2);
      }
    }
    const ji = y("rsltxt");
    class ii {
      constructor(a, u) {
        this.sliderView_ = u.sliderView, this.textView_ = u.textView, this.element = a.createElement("div"), this.element.classList.add(ji());
        const v = a.createElement("div");
        v.classList.add(ji("s")), v.appendChild(this.sliderView_.element), this.element.appendChild(v);
        const x = a.createElement("div");
        x.classList.add(ji("t")), x.appendChild(this.textView_.element), this.element.appendChild(x);
      }
    }
    const st2 = y("rsl");
    class An {
      constructor(a, u) {
        this.onSliderPropsChange_ = this.onSliderPropsChange_.bind(this), this.onValueChange_ = this.onValueChange_.bind(this), this.sliderProps_ = u.sliderProps, this.sliderProps_.emitter.on("change", this.onSliderPropsChange_), this.element = a.createElement("div"), this.element.classList.add(st2()), u.viewProps.bindClassModifiers(this.element), this.value_ = u.value, this.value_.emitter.on("change", this.onValueChange_);
        const v = a.createElement("div");
        v.classList.add(st2("t")), this.element.appendChild(v), this.trackElement = v;
        const x = a.createElement("div");
        x.classList.add(st2("b")), v.appendChild(x), this.barElement = x;
        const T = ["min", "max"].map((V2) => {
          const z = a.createElement("div");
          return z.classList.add(st2("k"), st2("k", V2)), v.appendChild(z), z;
        });
        this.knobElements = [T[0], T[1]], this.update_();
      }
      valueToX_(a) {
        const u = this.sliderProps_.get("minValue"), v = this.sliderProps_.get("maxValue");
        return Xt(Le(a, u, v, 0, 1), 0, 1) * 100;
      }
      update_() {
        const a = this.value_.rawValue;
        a.length === 0 ? this.element.classList.add(st2(void 0, "zero")) : this.element.classList.remove(st2(void 0, "zero"));
        const u = [this.valueToX_(a.min), this.valueToX_(a.max)];
        this.barElement.style.left = `${u[0]}%`, this.barElement.style.right = `${100 - u[1]}%`, this.knobElements.forEach((v, x) => {
          v.style.left = `${u[x]}%`;
        });
      }
      onSliderPropsChange_() {
        this.update_();
      }
      onValueChange_() {
        this.update_();
      }
    }
    class zi {
      constructor(a, u) {
        this.grabbing_ = null, this.grabOffset_ = 0, this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.sliderProps = u.sliderProps, this.viewProps = u.viewProps, this.value = u.value, this.view = new An(a, {
          sliderProps: this.sliderProps,
          value: this.value,
          viewProps: u.viewProps
        });
        const v = new Wn(this.view.trackElement);
        v.emitter.on("down", this.onPointerDown_), v.emitter.on("move", this.onPointerMove_), v.emitter.on("up", this.onPointerUp_);
      }
      ofs_() {
        return this.grabbing_ === "min" ? this.view.knobElements[0].getBoundingClientRect().width / 2 : this.grabbing_ === "max" ? -this.view.knobElements[1].getBoundingClientRect().width / 2 : 0;
      }
      valueFromData_(a) {
        if (!a.point)
          return null;
        const u = (a.point.x + this.ofs_()) / a.bounds.width, v = this.sliderProps.get("minValue"), x = this.sliderProps.get("maxValue");
        return Le(u, 0, 1, v, x);
      }
      onPointerDown_(a) {
        if (!a.data.point)
          return;
        const u = a.data.point.x / a.data.bounds.width, v = this.value.rawValue, x = this.sliderProps.get("minValue"), T = this.sliderProps.get("maxValue"), V2 = Le(v.min, x, T, 0, 1), z = Le(v.max, x, T, 0, 1);
        Math.abs(z - u) <= 0.025 ? this.grabbing_ = "max" : Math.abs(V2 - u) <= 0.025 ? this.grabbing_ = "min" : u >= V2 && u <= z ? (this.grabbing_ = "length", this.grabOffset_ = Le(u - V2, 0, 1, 0, T - x)) : u < V2 ? (this.grabbing_ = "min", this.onPointerMove_(a)) : u > z && (this.grabbing_ = "max", this.onPointerMove_(a));
      }
      applyPointToValue_(a, u) {
        const v = this.valueFromData_(a);
        if (v === null)
          return;
        const x = this.sliderProps.get("minValue"), T = this.sliderProps.get("maxValue");
        if (this.grabbing_ === "min")
          this.value.setRawValue(new qe(v, this.value.rawValue.max), u);
        else if (this.grabbing_ === "max")
          this.value.setRawValue(new qe(this.value.rawValue.min, v), u);
        else if (this.grabbing_ === "length") {
          const V2 = this.value.rawValue.length;
          let z = v - this.grabOffset_, re = z + V2;
          z < x ? (z = x, re = x + V2) : re > T && (z = T - V2, re = T), this.value.setRawValue(new qe(z, re), u);
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
    class wt2 {
      constructor(a, u) {
        this.value = u.value, this.viewProps = u.viewProps, this.sc_ = new zi(a, u);
        const v = {
          baseStep: u.baseStep,
          constraint: u.constraint,
          textProps: K2.fromObject({
            draggingScale: u.draggingScale,
            formatter: u.formatter
          })
        };
        this.tc_ = new Rt2(a, {
          assembly: Fi,
          axes: [v, v],
          parser: u.parser,
          value: this.value,
          viewProps: u.viewProps
        }), this.view = new ii(a, {
          sliderView: this.sc_.view,
          textView: this.tc_.view
        });
      }
      get textController() {
        return this.tc_;
      }
    }
    function Ls(d) {
      return qe.isObject(d) ? new qe(d.min, d.max) : new qe(0, 0);
    }
    function Ui(d, a) {
      d.writeProperty("max", a.max), d.writeProperty("min", a.min);
    }
    function Sr(d) {
      const a = [], u = En(d);
      u && a.push(u);
      const v = _r(d);
      return v && a.push(v), new kn(new Yn(a));
    }
    const si = {
      id: "input-interval",
      type: "input",
      css: '.tp-cbzgv,.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-radv_b:hover,.tp-rslv_k:hover,.tp-cbzv_b:hover{background-color:var(--btn-bg-h)}.tp-radv_b:focus,.tp-rslv_k:focus,.tp-cbzv_b:focus{background-color:var(--btn-bg-f)}.tp-radv_b:active,.tp-rslv_k:active,.tp-cbzv_b:active{background-color:var(--btn-bg-a)}.tp-radv_b:disabled,.tp-rslv_k:disabled,.tp-cbzv_b:disabled{opacity:.5}.tp-cbzgv{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-cbzgv:hover{background-color:var(--in-bg-h)}.tp-cbzgv:focus{background-color:var(--in-bg-f)}.tp-cbzgv:active{background-color:var(--in-bg-a)}.tp-cbzgv:disabled{opacity:.5}.tp-btngridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-btngridv.tp-v-disabled{opacity:.5}.tp-btngridv .tp-btnv_b:disabled{opacity:1}.tp-btngridv .tp-btnv_b:disabled .tp-btnv_t{opacity:.5}.tp-btngridv .tp-btnv_b{border-radius:0}.tp-cbzv{position:relative}.tp-cbzv_h{display:flex}.tp-cbzv_b{margin-right:4px;position:relative;width:var(--bld-us)}.tp-cbzv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-cbzv_b svg path{stroke:var(--bs-bg);stroke-width:2}.tp-cbzv_t{flex:1}.tp-cbzv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-cbzv.tp-cbzv-expanded .tp-cbzv_p{margin-top:var(--bld-s);opacity:1}.tp-cbzv.tp-cbzv-cpl .tp-cbzv_p{overflow:visible}.tp-cbzv .tp-popv{left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-cbzpv_t{margin-top:var(--bld-s)}.tp-cbzgv{height:auto;overflow:hidden;position:relative}.tp-cbzgv.tp-v-disabled{opacity:.5}.tp-cbzgv_p{left:16px;position:absolute;right:16px;top:0}.tp-cbzgv_g{cursor:pointer;display:block;height:calc(var(--bld-us)*5);width:100%}.tp-cbzgv_u{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_l{fill:rgba(0,0,0,0);stroke:var(--in-fg)}.tp-cbzgv_v{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_h{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;pointer-events:none;position:absolute;width:4px}.tp-cbzgv:focus .tp-cbzgv_h-sel{background-color:var(--in-fg);border-width:0}.tp-cbzprvv{cursor:pointer;height:4px;padding:4px 0;position:relative}.tp-cbzprvv_g{display:block;height:100%;overflow:visible;width:100%}.tp-cbzprvv_t{opacity:.5;stroke:var(--mo-fg)}.tp-cbzprvv_m{background-color:var(--mo-fg);border-radius:50%;height:4px;margin-left:-2px;margin-top:-2px;opacity:0;position:absolute;top:50%;transition:opacity .2s ease-out;width:4px}.tp-cbzprvv_m.tp-cbzprvv_m-a{opacity:1}.tp-fpsv{position:relative}.tp-fpsv_l{bottom:4px;color:var(--mo-fg);line-height:1;right:4px;pointer-events:none;position:absolute}.tp-fpsv_u{margin-left:.2em;opacity:.7}.tp-rslv{cursor:pointer;padding-left:8px;padding-right:8px}.tp-rslv.tp-v-disabled{opacity:.5}.tp-rslv_t{height:calc(var(--bld-us));position:relative}.tp-rslv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:-4px;right:-4px}.tp-rslv_b{bottom:0;top:0;position:absolute}.tp-rslv_b::before{background-color:var(--in-fg);content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:0;right:0}.tp-rslv_k{height:calc(var(--bld-us) - 8px);margin-top:calc((var(--bld-us) - 8px)/-2);position:absolute;top:50%;width:8px}.tp-rslv_k.tp-rslv_k-min{margin-left:-8px}.tp-rslv_k.tp-rslv_k-max{margin-left:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-min{border-bottom-right-radius:0;border-top-right-radius:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-max{border-bottom-left-radius:0;border-top-left-radius:0}.tp-rsltxtv{display:flex}.tp-rsltxtv_s{flex:1}.tp-rsltxtv_t{flex:1;margin-left:4px}.tp-radv_l{display:block;position:relative}.tp-radv_i{left:0;opacity:0;position:absolute;top:0}.tp-radv_b{opacity:.5}.tp-radv_i:hover+.tp-radv_b{background-color:var(--btn-bg-h)}.tp-radv_i:focus+.tp-radv_b{background-color:var(--btn-bg-f)}.tp-radv_i:active+.tp-radv_b{background-color:var(--btn-bg-a)}.tp-radv_i:checked+.tp-radv_b{opacity:1}.tp-radv_t{bottom:0;color:inherit;left:0;overflow:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0}.tp-radv_i:disabled+.tp-radv_b>.tp-radv_t{opacity:.5}.tp-radgridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-radgridv.tp-v-disabled{opacity:.5}.tp-radgridv .tp-radv_b{border-radius:0}',
      accept: (d, a) => {
        if (!qe.isObject(d))
          return null;
        const u = he, v = ee(a, {
          format: u.optional.function,
          max: u.optional.number,
          min: u.optional.number,
          step: u.optional.number
        });
        return v ? {
          initialValue: new qe(d.min, d.max),
          params: v
        } : null;
      },
      binding: {
        reader: (d) => Ls,
        constraint: (d) => Sr(d.params),
        equals: qe.equals,
        writer: (d) => Ui
      },
      controller(d) {
        var a;
        const u = d.value, v = d.constraint;
        if (!(v instanceof kn))
          throw g.shouldNeverHappen();
        const x = (u.rawValue.min + u.rawValue.max) / 2, T = (a = d.params.format) !== null && a !== void 0 ? a : Ie(yn(v.edge, x)), V2 = v.edge && Ct(v.edge, gt2);
        if (V2)
          return new wt2(d.document, {
            baseStep: Ai(v.edge),
            constraint: v.edge,
            draggingScale: Jn(v.edge, x),
            formatter: T,
            parser: gn,
            sliderProps: new K2({
              maxValue: V2.values.value("max"),
              minValue: V2.values.value("min")
            }),
            value: u,
            viewProps: d.viewProps
          });
        const z = {
          baseStep: Ai(v.edge),
          constraint: v.edge,
          textProps: K2.fromObject({
            draggingScale: x,
            formatter: T
          })
        };
        return new Rt2(d.document, {
          assembly: Fi,
          axes: [z, z],
          parser: gn,
          value: u,
          viewProps: d.viewProps
        });
      }
    };
    class Dt {
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
    class Ot extends c {
      constructor(a, u, v, x, T) {
        super(a, x, T), this.cell = u, this.index = v;
      }
    }
    class Mn extends r {
      constructor(a) {
        super(a), this.cellToApiMap_ = /* @__PURE__ */ new Map(), this.controller_.valueController.cellControllers.forEach((v) => {
          const x = new Dt(v);
          this.cellToApiMap_.set(v, x);
        });
      }
      get value() {
        return this.controller_.value;
      }
      cell(a, u) {
        const v = this.controller_.valueController, x = v.cellControllers[u * v.size[0] + a];
        return this.cellToApiMap_.get(x);
      }
      on(a, u) {
        const v = u.bind(this);
        this.controller_.value.emitter.on(a, (x) => {
          const T = this.controller_.valueController, V2 = T.findCellByValue(x.rawValue);
          if (!V2)
            return;
          const z = this.cellToApiMap_.get(V2);
          if (!z)
            return;
          const re = T.cellControllers.indexOf(V2);
          v(new Ot(this, z, [re % T.size[0], Math.floor(re / T.size[0])], x.rawValue, void 0));
        });
      }
    }
    const Sn = y("rad");
    class Rs {
      constructor(a, u) {
        this.element = a.createElement("div"), this.element.classList.add(Sn()), u.viewProps.bindClassModifiers(this.element);
        const v = a.createElement("label");
        v.classList.add(Sn("l")), this.element.appendChild(v);
        const x = a.createElement("input");
        x.classList.add(Sn("i")), x.name = u.name, x.type = "radio", u.viewProps.bindDisabled(x), v.appendChild(x), this.inputElement = x;
        const T = a.createElement("div");
        T.classList.add(Sn("b")), v.appendChild(T);
        const V2 = a.createElement("div");
        V2.classList.add(Sn("t")), T.appendChild(V2), R(u.props, "title", (z) => {
          V2.textContent = z;
        });
      }
    }
    class Vs {
      constructor(a, u) {
        this.props = u.props, this.viewProps = u.viewProps, this.view = new Rs(a, {
          name: u.name,
          props: this.props,
          viewProps: this.viewProps
        });
      }
    }
    class ri {
      constructor(a, u) {
        this.cellCs_ = [], this.cellValues_ = [], this.onCellInputChange_ = this.onCellInputChange_.bind(this), this.size = u.size;
        const [v, x] = this.size;
        for (let T = 0; T < x; T++)
          for (let V2 = 0; V2 < v; V2++) {
            const z = new Vs(a, {
              name: u.groupName,
              props: K2.fromObject(Object.assign({}, u.cellConfig(V2, T))),
              viewProps: ge.create()
            });
            this.cellCs_.push(z), this.cellValues_.push(u.cellConfig(V2, T).value);
          }
        this.value = u.value, S(this.value, (T) => {
          const V2 = this.findCellByValue(T);
          V2 && (V2.view.inputElement.checked = true);
        }), this.viewProps = ge.create(), this.view = new Et2(a, {
          viewProps: this.viewProps,
          viewName: "radgrid"
        }), this.view.element.style.gridTemplateColumns = `repeat(${v}, 1fr)`, this.cellCs_.forEach((T) => {
          T.view.inputElement.addEventListener("change", this.onCellInputChange_), this.view.element.appendChild(T.view.element);
        });
      }
      get cellControllers() {
        return this.cellCs_;
      }
      findCellByValue(a) {
        const u = this.cellValues_.findIndex((v) => v === a);
        return u < 0 ? null : this.cellCs_[u];
      }
      onCellInputChange_(a) {
        const u = a.currentTarget, v = this.cellCs_.findIndex((x) => x.view.inputElement === u);
        v < 0 || (this.value.rawValue = this.cellValues_[v]);
      }
    }
    const Nt = function() {
      return {
        id: "radiogrid",
        type: "blade",
        accept(d) {
          const a = he, u = ee(d, {
            cells: a.required.function,
            groupName: a.required.string,
            size: a.required.array(a.required.number),
            value: a.required.raw,
            view: a.required.constant("radiogrid"),
            label: a.optional.string
          });
          return u ? { params: u } : null;
        },
        controller(d) {
          return new Mt(d.document, {
            blade: d.blade,
            props: K2.fromObject({
              label: d.params.label
            }),
            valueController: new ri(d.document, {
              groupName: d.params.groupName,
              cellConfig: d.params.cells,
              size: d.params.size,
              value: H2(d.params.value)
            })
          });
        },
        api(d) {
          return !(d.controller instanceof Mt) || !(d.controller.valueController instanceof ri) ? null : new Mn(d.controller);
        }
      };
    }();
    function Gi(d) {
      return {
        id: "input-radiogrid",
        type: "input",
        accept(a, u) {
          if (!d.isType(a))
            return null;
          const v = he, x = ee(u, {
            cells: v.required.function,
            groupName: v.required.string,
            size: v.required.array(v.required.number),
            view: v.required.constant("radiogrid")
          });
          return x ? {
            initialValue: a,
            params: x
          } : null;
        },
        binding: d.binding,
        controller: (a) => new ri(a.document, {
          cellConfig: a.params.cells,
          groupName: a.params.groupName,
          size: a.params.size,
          value: a.value
        })
      };
    }
    const Lr = Gi({
      isType: (d) => typeof d == "number",
      binding: {
        reader: (d) => ar,
        writer: (d) => it2
      }
    }), Rr = Gi({
      isType: (d) => typeof d == "string",
      binding: {
        reader: (d) => ps,
        writer: (d) => it2
      }
    }), Vr = Gi({
      isType: (d) => typeof d == "boolean",
      binding: {
        reader: (d) => fn,
        writer: (d) => it2
      }
    }), Is = [
      Er,
      It,
      Bi,
      si,
      Nt,
      Vr,
      Lr,
      Rr
    ];
    s.ButtonCellApi = Cs, s.ButtonGridApi = Ps, s.ButtonGridController = Si, s.CubicBezier = Pt, s.CubicBezierApi = Ts, s.CubicBezierAssembly = Ri, s.CubicBezierController = ni, s.CubicBezierGraphController = ut2, s.CubicBezierGraphView = De, s.CubicBezierPickerController = Ss, s.CubicBezierPickerView = As, s.CubicBezierPreviewView = Qt, s.CubicBezierView = ks, s.FpsGraphBladeApi = we, s.FpsGraphController = Ni, s.FpsView = Ye, s.Fpswatch = Re2, s.Interval = qe, s.IntervalAssembly = Fi, s.IntervalConstraint = kn, s.RadioCellApi = Dt, s.RadioController = Vs, s.RadioGridApi = Mn, s.RadioGridController = ri, s.RadioView = Rs, s.RangeSliderController = zi, s.RangeSliderTextController = wt2, s.RangeSliderTextView = ii, s.RangeSliderView = An, s.TpRadioGridChangeEvent = Ot, s.plugins = Is, Object.defineProperty(s, "__esModule", { value: true });
  });
})(yo, yo.exports);
var al = yo.exports;
var Md = xh(al);
var Sd = Zu({
  __proto__: null,
  default: Md
}, [al]);
var On;
var Us;
var lm = (f = "tres-container") => {
  On || (On = new Ad.Pane({
    container: document.querySelector(f) || void 0
  }), On.registerPlugin(Sd), Us = On.addBlade({
    view: "fpsgraph",
    label: "fpsgraph"
  }));
  function i() {
    On && On.dispose();
  }
  return onMounted(() => {
    const { onBeforeLoop: s, onAfterLoop: r, resume: o } = Pe();
    o(), s(() => Us.begin()), r(() => Us.end());
  }), onUnmounted(() => {
    i();
  }), { pane: On, fpsGraph: Us, disposeTweakPane: i };
};
export {
  qd as Box,
  Qd as Circle,
  Zd as Cone,
  Wd as Dodecahedron,
  Nd as Environment,
  Gd as FBXModel,
  Ud as GLTFModel,
  Jd as Icosahedron,
  zd as Levioso,
  Xd as MapControls,
  Yd as MeshWobbleMaterial,
  em as Octahedron,
  Hd as OrbitControls,
  Bd as PamCameraMouse,
  tm as Plane,
  $d as PointerLockControls,
  nm as Ring,
  jd as Smoke,
  im as Sphere,
  Fd as Stars,
  sm as Tetrahedron,
  Dd as Text3D,
  rm as Torus,
  om as TorusKnot,
  Kd as TransformControls,
  am as Tube,
  Od as useAnimations,
  kh as useEnvironment,
  $h as useFBX,
  Kh as useGLTF,
  Bh as usePamCameraMouse,
  lm as useTweakPane
};
/*! Bundled license information:

@tresjs/cientos/dist/trescientos.js:
  (*! Tweakpane 3.1.9 (c) 2016 cocopon, licensed under the MIT license. *)
*/
//# sourceMappingURL=@tresjs_cientos.js.map
