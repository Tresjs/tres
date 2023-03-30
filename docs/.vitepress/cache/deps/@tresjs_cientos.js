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
  Scene,
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
  WebGLRenderer,
  sRGBEncoding,
  three_module_exports
} from "./chunk-4QXXOI63.js";
import {
  computed,
  createBaseVNode,
  createCommentVNode,
  createElementBlock,
  createRenderer,
  defineComponent,
  getCurrentInstance,
  getCurrentScope,
  h,
  inject,
  mergeProps,
  nextTick,
  onMounted,
  onScopeDispose,
  onUnmounted,
  openBlock,
  readonly,
  ref,
  renderSlot,
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
import "./chunk-JC4IRQUL.js";

// node_modules/.pnpm/@vueuse+shared@9.13.0_vue@3.2.47/node_modules/@vueuse/shared/index.mjs
var _a;
var isClient = typeof window !== "undefined";
var isFunction = (val) => typeof val === "function";
var isString = (val) => typeof val === "string";
var noop = () => {
};
var isIOS = isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function identity(arg) {
  return arg;
}
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function createEventHook() {
  const fns = [];
  const off = (fn) => {
    const index = fns.indexOf(fn);
    if (index !== -1)
      fns.splice(index, 1);
  };
  const on = (fn) => {
    fns.push(fn);
    const offFn = () => off(fn);
    tryOnScopeDispose(offFn);
    return {
      off: offFn
    };
  };
  const trigger = (param) => {
    fns.forEach((fn) => fn(param));
  };
  return {
    on,
    off,
    trigger
  };
}
function tryOnMounted(fn, sync = true) {
  if (getCurrentInstance())
    onMounted(fn);
  else if (sync)
    fn();
  else
    nextTick(fn);
}

// node_modules/.pnpm/@vueuse+core@9.13.0_vue@3.2.47/node_modules/@vueuse/core/index.mjs
function unrefElement(elRef) {
  var _a3;
  const plain = resolveUnref(elRef);
  return (_a3 = plain == null ? void 0 : plain.$el) != null ? _a3 : plain;
}
var defaultWindow = isClient ? window : void 0;
var defaultDocument = isClient ? window.document : void 0;
var defaultNavigator = isClient ? window.navigator : void 0;
var defaultLocation = isClient ? window.location : void 0;
function useEventListener(...args) {
  let target;
  let events;
  let listeners;
  let options;
  if (isString(args[0]) || Array.isArray(args[0])) {
    [events, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events))
    events = [events];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el2, event, listener, options2) => {
    el2.addEventListener(event, listener, options2);
    return () => el2.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(() => [unrefElement(target), resolveUnref(options)], ([el2, options2]) => {
    cleanup();
    if (!el2)
      return;
    cleanups.push(...events.flatMap((event) => {
      return listeners.map((listener) => register(el2, event, listener, options2));
    }));
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function useSupported(callback, sync = false) {
  const isSupported = ref();
  const update = () => isSupported.value = Boolean(callback());
  update();
  tryOnMounted(update, sync);
  return isSupported;
}
var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
var handlers = _global[globalKey];
function useDevicePixelRatio({
  window: window2 = defaultWindow
} = {}) {
  const pixelRatio = ref(1);
  if (window2) {
    let observe = function() {
      pixelRatio.value = window2.devicePixelRatio;
      cleanup();
      media = window2.matchMedia(`(resolution: ${pixelRatio.value}dppx)`);
      media.addEventListener("change", observe, { once: true });
    }, cleanup = function() {
      media == null ? void 0 : media.removeEventListener("change", observe);
    };
    let media;
    observe();
    tryOnScopeDispose(cleanup);
  }
  return { pixelRatio };
}
var __getOwnPropSymbols$g = Object.getOwnPropertySymbols;
var __hasOwnProp$g = Object.prototype.hasOwnProperty;
var __propIsEnum$g = Object.prototype.propertyIsEnumerable;
var __objRest$2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$g.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$g)
    for (var prop of __getOwnPropSymbols$g(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$g.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function useResizeObserver(target, callback, options = {}) {
  const _a3 = options, { window: window2 = defaultWindow } = _a3, observerOptions = __objRest$2(_a3, ["window"]);
  let observer;
  const isSupported = useSupported(() => window2 && "ResizeObserver" in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const stopWatch = watch(() => unrefElement(target), (el2) => {
    cleanup();
    if (isSupported.value && window2 && el2) {
      observer = new ResizeObserver(callback);
      observer.observe(el2, observerOptions);
    }
  }, { immediate: true, flush: "post" });
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop
  };
}
function useRafFn(fn, options = {}) {
  const {
    immediate = true,
    window: window2 = defaultWindow
  } = options;
  const isActive = ref(false);
  let previousFrameTimestamp = 0;
  let rafId = null;
  function loop(timestamp2) {
    if (!isActive.value || !window2)
      return;
    const delta = timestamp2 - previousFrameTimestamp;
    fn({ delta, timestamp: timestamp2 });
    previousFrameTimestamp = timestamp2;
    rafId = window2.requestAnimationFrame(loop);
  }
  function resume() {
    if (!isActive.value && window2) {
      isActive.value = true;
      rafId = window2.requestAnimationFrame(loop);
    }
  }
  function pause() {
    isActive.value = false;
    if (rafId != null && window2) {
      window2.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
  if (immediate)
    resume();
  tryOnScopeDispose(pause);
  return {
    isActive: readonly(isActive),
    pause,
    resume
  };
}
function useElementSize(target, initialSize = { width: 0, height: 0 }, options = {}) {
  const { window: window2 = defaultWindow, box = "content-box" } = options;
  const isSVG = computed(() => {
    var _a3, _b;
    return (_b = (_a3 = unrefElement(target)) == null ? void 0 : _a3.namespaceURI) == null ? void 0 : _b.includes("svg");
  });
  const width = ref(initialSize.width);
  const height = ref(initialSize.height);
  useResizeObserver(target, ([entry]) => {
    const boxSize = box === "border-box" ? entry.borderBoxSize : box === "content-box" ? entry.contentBoxSize : entry.devicePixelContentBoxSize;
    if (window2 && isSVG.value) {
      const $elem = unrefElement(target);
      if ($elem) {
        const styles = window2.getComputedStyle($elem);
        width.value = parseFloat(styles.width);
        height.value = parseFloat(styles.height);
      }
    } else {
      if (boxSize) {
        const formatBoxSize = Array.isArray(boxSize) ? boxSize : [boxSize];
        width.value = formatBoxSize.reduce((acc, { inlineSize }) => acc + inlineSize, 0);
        height.value = formatBoxSize.reduce((acc, { blockSize }) => acc + blockSize, 0);
      } else {
        width.value = entry.contentRect.width;
        height.value = entry.contentRect.height;
      }
    }
  }, options);
  watch(() => unrefElement(target), (ele) => {
    width.value = ele ? initialSize.width : 0;
    height.value = ele ? initialSize.height : 0;
  });
  return {
    width,
    height
  };
}
var defaultState = {
  x: 0,
  y: 0,
  pointerId: 0,
  pressure: 0,
  tiltX: 0,
  tiltY: 0,
  width: 0,
  height: 0,
  twist: 0,
  pointerType: null
};
var keys = Object.keys(defaultState);
var SwipeDirection;
(function(SwipeDirection2) {
  SwipeDirection2["UP"] = "UP";
  SwipeDirection2["RIGHT"] = "RIGHT";
  SwipeDirection2["DOWN"] = "DOWN";
  SwipeDirection2["LEFT"] = "LEFT";
  SwipeDirection2["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a, prop, b2[prop]);
    }
  return a;
};
var _TransitionPresets = {
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
var TransitionPresets = __spreadValues({
  linear: identity
}, _TransitionPresets);
function useWindowSize(options = {}) {
  const {
    window: window2 = defaultWindow,
    initialWidth = Infinity,
    initialHeight = Infinity,
    listenOrientation = true,
    includeScrollbar = true
  } = options;
  const width = ref(initialWidth);
  const height = ref(initialHeight);
  const update = () => {
    if (window2) {
      if (includeScrollbar) {
        width.value = window2.innerWidth;
        height.value = window2.innerHeight;
      } else {
        width.value = window2.document.documentElement.clientWidth;
        height.value = window2.document.documentElement.clientHeight;
      }
    }
  };
  update();
  tryOnMounted(update);
  useEventListener("resize", update, { passive: true });
  if (listenOrientation)
    useEventListener("orientationchange", update, { passive: true });
  return { width, height };
}

// node_modules/.pnpm/@tresjs+core@2.0.0-alpha.1_three@0.150.1+vue@3.2.47/node_modules/@tresjs/core/dist/tres.js
var G = ref({ uuid: MathUtils.generateUUID() });
var se = (e) => void Object.assign(G.value, e);
var Ne = ((e) => (e.Perspective = "Perspective", e.Orthographic = "Orthographic", e))(Ne || {});
var qe = 45;
var y;
function ce() {
  const { state: e, setState: t, aspectRatio: r } = L();
  function o(a = "Perspective", s) {
    var l, p, m;
    if (a === "Perspective") {
      const { near: d, far: w, fov: v } = s || {
        near: 0.1,
        far: 1e3,
        fov: qe
      };
      y = new PerspectiveCamera(v, ((l = e.aspectRatio) == null ? void 0 : l.value) || window.innerWidth / window.innerHeight, d, w), (p = e.cameras) == null || p.push(y);
    } else {
      const { left: d, right: w, top: v, bottom: g, near: E, far: x } = s || {
        left: -100,
        right: 100,
        top: 100,
        bottom: -100,
        near: 0.1,
        far: 1e3
      };
      y = new OrthographicCamera(d, w, v, g, E, x), (m = e.cameras) == null || m.push(y);
    }
    return e.camera = y, t("camera", e.camera), y;
  }
  function n() {
    var a;
    e.camera instanceof PerspectiveCamera && e.aspectRatio && (e.camera.aspect = e.aspectRatio.value), (a = e.camera) == null || a.updateProjectionMatrix();
  }
  function i(a) {
    var s;
    (s = e.cameras) == null || s.push(a), a instanceof PerspectiveCamera && e.aspectRatio && (a.aspect = e.aspectRatio.value), a.updateProjectionMatrix(), t("camera", a);
  }
  function c() {
    e.cameras = [];
  }
  return watchEffect(() => {
    r != null && r.value && n();
  }), {
    activeCamera: toRef(e, "camera"),
    createCamera: o,
    updateCamera: n,
    pushCamera: i,
    clearCameras: c
  };
}
var ue = createEventHook();
var le = createEventHook();
var V = createEventHook();
var b = new Clock();
var A = 0;
var k = 0;
var { pause: Je, resume: Ke, isActive: Xe } = useRafFn(
  () => {
    ue.trigger({ delta: A, elapsed: k, clock: b }), le.trigger({ delta: A, elapsed: k, clock: b }), V.trigger({ delta: A, elapsed: k, clock: b });
  },
  { immediate: false }
);
V.on(() => {
  A = b.getDelta(), k = b.getElapsedTime();
});
function $() {
  return {
    onBeforeLoop: ue.on,
    onLoop: le.on,
    onAfterLoop: V.on,
    pause: Je,
    resume: Ke,
    isActive: Xe
  };
}
function Ye(e) {
  return e instanceof Color ? e : Array.isArray(e) ? new Color(...e) : new Color(e);
}
var B = {
  realistic: {
    outputEncoding: sRGBEncoding,
    toneMapping: ACESFilmicToneMapping,
    toneMappingExposure: 3,
    shadowMap: {
      enabled: true,
      type: PCFSoftShadowMap
    }
  }
};
var fe = (e, t) => {
  for (const r of Object.keys(t))
    t[r] instanceof Object && Object.assign(t[r], fe(e[r], t[r]));
  return Object.assign(e || {}, t), e;
};
var Qe = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
var Ze = et(Qe);
function I(e) {
  return e.replace(/-([a-z])/g, (t, r) => r.toUpperCase());
}
function et(e, t) {
  const r = /* @__PURE__ */ Object.create(null), o = e.split(",");
  for (let n = 0; n < o.length; n++)
    r[o[n]] = true;
  return t ? (n) => !!r[n.toLowerCase()] : (n) => !!r[n];
}
var f = shallowRef();
var H = ref(false);
function tt(e, t, r) {
  const {
    alpha: o = true,
    antialias: n = true,
    depth: i,
    logarithmicDepthBuffer: c,
    failIfMajorPerformanceCaveat: a,
    precision: s,
    premultipliedAlpha: l,
    stencil: p,
    shadows: m = false,
    shadowMapType: d = PCFShadowMap,
    physicallyCorrectLights: w = false,
    useLegacyLights: v = false,
    outputEncoding: g = LinearEncoding,
    toneMapping: E = NoToneMapping,
    toneMappingExposure: x = 1,
    context: de = void 0,
    powerPreference: ve = "default",
    preserveDrawingBuffer: ge = false,
    clearColor: C,
    windowSize: we = false,
    preset: he = void 0
  } = toRefs(r), { setState: D } = L(), { width: N, height: q } = resolveUnref(we) ? useWindowSize() : useElementSize(t), { logError: ye } = j(), { pixelRatio: J } = useDevicePixelRatio(), { pause: Me, resume: Ce } = $(), F = computed(() => N.value / q.value), K = () => {
    f.value && (f.value.setSize(N.value, q.value), f.value.setPixelRatio(Math.min(J.value, 2)));
  }, X = () => {
    if (!f.value)
      return;
    const h2 = resolveUnref(he);
    if (h2) {
      h2 in B || ye("Renderer Preset must be one of these: " + Object.keys(B).join(", ")), fe(f.value, B[h2]);
      return;
    }
    f.value.shadowMap.enabled = resolveUnref(m), f.value.shadowMap.type = resolveUnref(d), f.value.toneMapping = resolveUnref(E) || NoToneMapping, f.value.toneMappingExposure = resolveUnref(x), f.value.outputEncoding = resolveUnref(g) || LinearEncoding, C != null && C.value && f.value.setClearColor(Ye(resolveUnref(C))), f.value.useLegacyLights = resolveUnref(v);
  }, be = () => {
    const h2 = unrefElement(e);
    h2 && (f.value = new WebGLRenderer({
      canvas: h2,
      alpha: resolveUnref(o),
      antialias: resolveUnref(n),
      context: resolveUnref(de),
      depth: resolveUnref(i),
      failIfMajorPerformanceCaveat: resolveUnref(a),
      logarithmicDepthBuffer: resolveUnref(c),
      powerPreference: resolveUnref(ve),
      precision: resolveUnref(s),
      stencil: resolveUnref(p),
      preserveDrawingBuffer: resolveUnref(ge),
      premultipliedAlpha: resolveUnref(l)
    }), D("renderer", f.value), D("clock", new Clock()), D("aspectRatio", F), X(), K(), Ce(), H.value = true);
  }, Le = () => {
    f.value && (f.value.dispose(), f.value = void 0, H.value = false, Me());
  };
  return watch([F, J], K), watch(
    [m, d, g, v, E, x, C],
    X
  ), watch(
    () => [e, t],
    () => {
      unrefElement(e) && unrefElement(t) && be();
    },
    { immediate: true, deep: true }
  ), {
    renderer: f,
    isReady: H,
    dispose: Le,
    aspectRatio: F
  };
}
var pe = (e) => !!e && e.constructor === Array;
function nt(e) {
  const t = { nodes: {}, materials: {} };
  return e && e.traverse((r) => {
    r.name && (t.nodes[r.name] = r), r.material && !t.materials[r.material.name] && (t.materials[r.material.name] = r.material);
  }), t;
}
async function dt(e, t, r, o, n) {
  const { logError: i } = j(), c = new e();
  n && n(c), r && r(c);
  const s = (Array.isArray(t) ? t : [t]).map(
    (l) => new Promise((p, m) => {
      c.load(
        l,
        (d) => {
          d.scene && Object.assign(d, nt(d.scene)), p(d);
        },
        o,
        (d) => m(i("[useLoader] - Failed to load resource", d))
      );
    })
  );
  return pe(t) ? await Promise.all(s) : await s[0];
}
var R = shallowReactive({
  camera: void 0,
  cameras: [],
  aspectRatio: computed(() => window.innerWidth / window.innerHeight)
});
function L() {
  function e(r) {
    return R[r];
  }
  function t(r, o) {
    R[r] = o;
  }
  return {
    state: R,
    ...toRefs(R),
    getState: e,
    setState: t
  };
}
var ee = shallowRef(new Raycaster());
var S = ref(new Vector2());
var at = ref(null);
function me() {
  const { setState: e } = L();
  e("raycaster", ee.value), e("pointer", S), e("currentInstance", at);
  function t(r) {
    S.value.x = r.clientX / window.innerWidth * 2 - 1, S.value.y = -(r.clientY / window.innerHeight) * 2 + 1;
  }
  return window.addEventListener("pointermove", t), {
    raycaster: ee,
    pointer: S
  };
}
var te = "[TresJS ▲ ■ ●] ";
function j() {
  function e(o, n) {
    console.error(`${te} ${o}`, n || "");
  }
  function t(o) {
    console.warn(`${te} ${o}`);
  }
  function r(o, n) {
  }
  return {
    logError: e,
    logWarning: t,
    logMessage: r
  };
}
var { logWarning: rt } = j();
function ot(e) {
  for (const t in e)
    if (t.indexOf("on") === 0)
      return true;
  return false;
}
var T = null;
var it = {
  createElement(e, t, r, o) {
    if (e === "template" || Ze(e))
      return null;
    let n;
    if (o === null && (o = {}), o != null && o.args ? n = new G.value[e.replace("Tres", "")](...o.args) : n = new G.value[e.replace("Tres", "")](), n.isCamera) {
      (!(o != null && o.position) || o != null && o.position.every((c) => c == 0)) && rt(
        // eslint-disable-next-line max-len
        "Camera is positioned at the center of the scene [0,0,0], if this is not intentional try setting a position if your scene seems empty 🤗"
      );
      const { pushCamera: i } = ce();
      i(n);
    }
    return (o == null ? void 0 : o.attach) === void 0 && (n.isMaterial ? n.attach = "material" : n.isBufferGeometry && (n.attach = "geometry")), n;
  },
  insert(e, t, r) {
    if (T === null && t.isScene && (T = t), t === null && (t = T), t != null && t.isObject3D && (e != null && e.isObject3D)) {
      const a = r ? t.children.indexOf(r) : 0;
      e.parent = t, t.children.splice(a, 0, e), e.dispatchEvent({ type: "added" });
    } else
      typeof (e == null ? void 0 : e.attach) == "string" && (e.__previousAttach = e[t == null ? void 0 : t.attach], t && (t[e.attach] = e));
    const { onLoop: o } = $();
    let n = null, i = null;
    const { raycaster: c } = me();
    e && e instanceof Mesh && ot(e) && (o(() => {
      var a, s, l;
      if (t != null && t.children && e && c) {
        const p = c.value.intersectObjects(t.children);
        p.length > 0 && p[0].object.uuid === e.uuid ? (i = p[0], (n === null || n.object.uuid !== (i == null ? void 0 : i.object.uuid)) && ((a = e.onPointerEnter) == null || a.call(e, i)), (s = e.onPointerMove) == null || s.call(e, i)) : (i = null, n !== null && ((l = e.onPointerLeave) == null || l.call(e, n))), n = i;
      }
    }), useEventListener(window, "click", () => {
      var a;
      i !== null && ((a = e.onClick) == null || a.call(e, i));
    }));
  },
  remove(e) {
    if (!e)
      return;
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  patchProp(e, t, r, o) {
    if (e) {
      let n = e, i = t;
      const c = I(i);
      let a = n == null ? void 0 : n[c];
      if (e.parent || (e.parent = T), i.includes("-") && a === void 0) {
        const l = i.split("-");
        a = l.reduce((p, m) => p[I(m)], n), i = l.pop(), a != null && a.set || (n = l.reduce((p, m) => p[I(m)], n));
      }
      let s = o;
      if (s === "" && (s = true), isFunction(a))
        return;
      !(a != null && a.set) && !isFunction(a) ? n[c] = s : a.constructor === s.constructor && (a != null && a.copy) ? a == null || a.copy(s) : Array.isArray(s) ? a.set(...s) : !a.isColor && a.setScalar ? a.setScalar(s) : a.set(s);
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
var { createApp: st } = createRenderer(it);
var ct = (e) => {
  const t = st(r);
  function r() {
    return e && e.default ? e.default() : [];
  }
  return t;
};
se(three_module_exports);
var { logWarning: ut } = j();
var lt = defineComponent({
  name: "TresCanvas",
  props: [
    "shadows",
    "shadowMapType",
    "physicallyCorrectLights",
    "useLegacyLights",
    "outputEncoding",
    "toneMapping",
    "toneMappingExposure",
    "context",
    "powerPreference",
    "preserveDrawingBuffer",
    "clearColor",
    "windowSize",
    "preset"
  ],
  setup(e, { slots: t, expose: r }) {
    e.physicallyCorrectLights === true && ut("physicallyCorrectLights is deprecated, useLegacyLights is now false by default");
    const o = ref(), n = ref(), i = new Scene(), { setState: c } = L();
    c("scene", i);
    function a() {
      const { renderer: p } = tt(n, o, e), { activeCamera: m } = ce(), { onLoop: d } = $(), { raycaster: w, pointer: v } = me();
      d(() => {
        var g;
        m.value && (w.value.setFromCamera(v.value, m.value), (g = p.value) == null || g.render(i, m.value));
      });
    }
    watch(n, a);
    let s;
    function l() {
      s = ct(t), s.provide("useTres", L()), s.provide("extend", se), s.mount(i);
    }
    return l(), r({
      scene: i
    }), () => h(
      h(
        "div",
        {
          ref: o,
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

// node_modules/.pnpm/@tresjs+cientos@2.0.0-alpha.5_three@0.150.1/node_modules/@tresjs/cientos/dist/trescientos.js
function Np(b2, i) {
  for (var r = 0; r < i.length; r++) {
    const s = i[r];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const a in s)
        if (a !== "default" && !(a in b2)) {
          const c = Object.getOwnPropertyDescriptor(s, a);
          c && Object.defineProperty(b2, a, c.get ? c : {
            enumerable: true,
            get: () => s[a]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(b2, Symbol.toStringTag, { value: "Module" }));
}
function Zi(b2) {
  return Zi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(i) {
    return typeof i;
  } : function(i) {
    return i && typeof Symbol == "function" && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i;
  }, Zi(b2);
}
function Fp(b2, i) {
  if (Zi(b2) !== "object" || b2 === null)
    return b2;
  var r = b2[Symbol.toPrimitive];
  if (r !== void 0) {
    var s = r.call(b2, i || "default");
    if (Zi(s) !== "object")
      return s;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (i === "string" ? String : Number)(b2);
}
function Bp(b2) {
  var i = Fp(b2, "string");
  return Zi(i) === "symbol" ? i : String(i);
}
function T2(b2, i, r) {
  return i = Bp(i), i in b2 ? Object.defineProperty(b2, i, {
    value: r,
    enumerable: true,
    configurable: true,
    writable: true
  }) : b2[i] = r, b2;
}
var ut2 = Uint8Array;
var rn = Uint16Array;
var oo = Uint32Array;
var ja = new ut2([
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
var za = new ut2([
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
var jp = new ut2([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var Ua = function(b2, i) {
  for (var r = new rn(31), s = 0; s < 31; ++s)
    r[s] = i += 1 << b2[s - 1];
  for (var a = new oo(r[30]), s = 1; s < 30; ++s)
    for (var c = r[s]; c < r[s + 1]; ++c)
      a[c] = c - r[s] << 5 | s;
  return [r, a];
};
var Ga = Ua(ja, 2);
var Ha = Ga[0];
var zp = Ga[1];
Ha[28] = 258, zp[258] = 28;
var Up = Ua(za, 0);
var Gp = Up[0];
var ao = new rn(32768);
for (Ce = 0; Ce < 32768; ++Ce) {
  tn = (Ce & 43690) >>> 1 | (Ce & 21845) << 1;
  tn = (tn & 52428) >>> 2 | (tn & 13107) << 2, tn = (tn & 61680) >>> 4 | (tn & 3855) << 4, ao[Ce] = ((tn & 65280) >>> 8 | (tn & 255) << 8) >>> 1;
}
var tn;
var Ce;
var Xi = function(b2, i, r) {
  for (var s = b2.length, a = 0, c = new rn(i); a < s; ++a)
    ++c[b2[a] - 1];
  var u = new rn(i);
  for (a = 0; a < i; ++a)
    u[a] = u[a - 1] + c[a - 1] << 1;
  var h2;
  if (r) {
    h2 = new rn(1 << i);
    var d = 15 - i;
    for (a = 0; a < s; ++a)
      if (b2[a])
        for (var g = a << 4 | b2[a], w = i - b2[a], _ = u[b2[a] - 1]++ << w, y2 = _ | (1 << w) - 1; _ <= y2; ++_)
          h2[ao[_] >>> d] = g;
  } else
    for (h2 = new rn(s), a = 0; a < s; ++a)
      b2[a] && (h2[a] = ao[u[b2[a] - 1]++] >>> 15 - b2[a]);
  return h2;
};
var es = new ut2(288);
for (Ce = 0; Ce < 144; ++Ce)
  es[Ce] = 8;
var Ce;
for (Ce = 144; Ce < 256; ++Ce)
  es[Ce] = 9;
var Ce;
for (Ce = 256; Ce < 280; ++Ce)
  es[Ce] = 7;
var Ce;
for (Ce = 280; Ce < 288; ++Ce)
  es[Ce] = 8;
var Ce;
var Ka = new ut2(32);
for (Ce = 0; Ce < 32; ++Ce)
  Ka[Ce] = 5;
var Ce;
var Hp = Xi(es, 9, 1);
var Kp = Xi(Ka, 5, 1);
var Yr = function(b2) {
  for (var i = b2[0], r = 1; r < b2.length; ++r)
    b2[r] > i && (i = b2[r]);
  return i;
};
var _t = function(b2, i, r) {
  var s = i / 8 | 0;
  return (b2[s] | b2[s + 1] << 8) >> (i & 7) & r;
};
var qr = function(b2, i) {
  var r = i / 8 | 0;
  return (b2[r] | b2[r + 1] << 8 | b2[r + 2] << 16) >> (i & 7);
};
var $p = function(b2) {
  return (b2 / 8 | 0) + (b2 & 7 && 1);
};
var Xp = function(b2, i, r) {
  (i == null || i < 0) && (i = 0), (r == null || r > b2.length) && (r = b2.length);
  var s = new (b2 instanceof rn ? rn : b2 instanceof oo ? oo : ut2)(r - i);
  return s.set(b2.subarray(i, r)), s;
};
var Yp = function(b2, i, r) {
  var s = b2.length;
  if (!s || r && !r.l && s < 5)
    return i || new ut2(0);
  var a = !i || r, c = !r || r.i;
  r || (r = {}), i || (i = new ut2(s * 3));
  var u = function(Ve) {
    var Ne2 = i.length;
    if (Ve > Ne2) {
      var we = new ut2(Math.max(Ne2 * 2, Ve));
      we.set(i), i = we;
    }
  }, h2 = r.f || 0, d = r.p || 0, g = r.b || 0, w = r.l, _ = r.d, y2 = r.m, C = r.n, I2 = s * 8;
  do {
    if (!w) {
      r.f = h2 = _t(b2, d, 1);
      var S2 = _t(b2, d + 1, 3);
      if (d += 3, S2)
        if (S2 == 1)
          w = Hp, _ = Kp, y2 = 9, C = 5;
        else if (S2 == 2) {
          var V2 = _t(b2, d, 31) + 257, D = _t(b2, d + 10, 15) + 4, Y = V2 + _t(b2, d + 5, 31) + 1;
          d += 14;
          for (var G2 = new ut2(Y), N = new ut2(19), O = 0; O < D; ++O)
            N[jp[O]] = _t(b2, d + O * 3, 7);
          d += D * 3;
          for (var H2 = Yr(N), K = (1 << H2) - 1, q = Xi(N, H2, 1), O = 0; O < Y; ) {
            var ue2 = q[_t(b2, d, K)];
            d += ue2 & 15;
            var R2 = ue2 >>> 4;
            if (R2 < 16)
              G2[O++] = R2;
            else {
              var ge = 0, ce2 = 0;
              for (R2 == 16 ? (ce2 = 3 + _t(b2, d, 3), d += 2, ge = G2[O - 1]) : R2 == 17 ? (ce2 = 3 + _t(b2, d, 7), d += 3) : R2 == 18 && (ce2 = 11 + _t(b2, d, 127), d += 7); ce2--; )
                G2[O++] = ge;
            }
          }
          var me2 = G2.subarray(0, V2), he = G2.subarray(V2);
          y2 = Yr(me2), C = Yr(he), w = Xi(me2, y2, 1), _ = Xi(he, C, 1);
        } else
          throw "invalid block type";
      else {
        var R2 = $p(d) + 4, j2 = b2[R2 - 4] | b2[R2 - 3] << 8, F = R2 + j2;
        if (F > s) {
          if (c)
            throw "unexpected EOF";
          break;
        }
        a && u(g + j2), i.set(b2.subarray(R2, F), g), r.b = g += j2, r.p = d = F * 8;
        continue;
      }
      if (d > I2) {
        if (c)
          throw "unexpected EOF";
        break;
      }
    }
    a && u(g + 131072);
    for (var ee2 = (1 << y2) - 1, X = (1 << C) - 1, Pe = d; ; Pe = d) {
      var ge = w[qr(b2, d) & ee2], fe2 = ge >>> 4;
      if (d += ge & 15, d > I2) {
        if (c)
          throw "unexpected EOF";
        break;
      }
      if (!ge)
        throw "invalid length/literal";
      if (fe2 < 256)
        i[g++] = fe2;
      else if (fe2 == 256) {
        Pe = d, w = null;
        break;
      } else {
        var ae = fe2 - 254;
        if (fe2 > 264) {
          var O = fe2 - 257, ne = ja[O];
          ae = _t(b2, d, (1 << ne) - 1) + Ha[O], d += ne;
        }
        var be = _[qr(b2, d) & X], M = be >>> 4;
        if (!be)
          throw "invalid distance";
        d += be & 15;
        var he = Gp[M];
        if (M > 3) {
          var ne = za[M];
          he += qr(b2, d) & (1 << ne) - 1, d += ne;
        }
        if (d > I2) {
          if (c)
            throw "unexpected EOF";
          break;
        }
        a && u(g + 131072);
        for (var le2 = g + ae; g < le2; g += 4)
          i[g] = i[g - he], i[g + 1] = i[g + 1 - he], i[g + 2] = i[g + 2 - he], i[g + 3] = i[g + 3 - he];
        g = le2;
      }
    }
    r.l = w, r.p = Pe, r.b = g, w && (h2 = 1, r.m = y2, r.d = _, r.n = C);
  } while (!h2);
  return g == i.length ? i : Xp(i, 0, g);
};
var qp = new ut2(0);
var Qp = function(b2) {
  if ((b2[0] & 15) != 8 || b2[0] >>> 4 > 7 || (b2[0] << 8 | b2[1]) % 31)
    throw "invalid zlib data";
  if (b2[1] & 32)
    throw "invalid zlib data: preset dictionaries not supported";
};
function Zp(b2, i) {
  return Yp((Qp(b2), b2.subarray(2, -4)), i);
}
var Wp = typeof TextDecoder < "u" && new TextDecoder();
var Jp = 0;
try {
  Wp.decode(qp, { stream: true }), Jp = 1;
} catch {
}
var eu = class extends Object3D {
  // events
  constructor(i, r) {
    super(), T2(this, "isTransformControls", true), T2(this, "visible", false), T2(this, "domElement", void 0), T2(this, "raycaster", new Raycaster()), T2(this, "gizmo", void 0), T2(this, "plane", void 0), T2(this, "tempVector", new Vector3()), T2(this, "tempVector2", new Vector3()), T2(this, "tempQuaternion", new Quaternion()), T2(this, "unit", {
      X: new Vector3(1, 0, 0),
      Y: new Vector3(0, 1, 0),
      Z: new Vector3(0, 0, 1)
    }), T2(this, "pointStart", new Vector3()), T2(this, "pointEnd", new Vector3()), T2(this, "offset", new Vector3()), T2(this, "rotationAxis", new Vector3()), T2(this, "startNorm", new Vector3()), T2(this, "endNorm", new Vector3()), T2(this, "rotationAngle", 0), T2(this, "cameraPosition", new Vector3()), T2(this, "cameraQuaternion", new Quaternion()), T2(this, "cameraScale", new Vector3()), T2(this, "parentPosition", new Vector3()), T2(this, "parentQuaternion", new Quaternion()), T2(this, "parentQuaternionInv", new Quaternion()), T2(this, "parentScale", new Vector3()), T2(this, "worldPositionStart", new Vector3()), T2(this, "worldQuaternionStart", new Quaternion()), T2(this, "worldScaleStart", new Vector3()), T2(this, "worldPosition", new Vector3()), T2(this, "worldQuaternion", new Quaternion()), T2(this, "worldQuaternionInv", new Quaternion()), T2(this, "worldScale", new Vector3()), T2(this, "eye", new Vector3()), T2(this, "positionStart", new Vector3()), T2(this, "quaternionStart", new Quaternion()), T2(this, "scaleStart", new Vector3()), T2(this, "camera", void 0), T2(this, "object", void 0), T2(this, "enabled", true), T2(this, "axis", null), T2(this, "mode", "translate"), T2(this, "translationSnap", null), T2(this, "rotationSnap", null), T2(this, "scaleSnap", null), T2(this, "space", "world"), T2(this, "size", 1), T2(this, "dragging", false), T2(this, "showX", true), T2(this, "showY", true), T2(this, "showZ", true), T2(this, "changeEvent", {
      type: "change"
    }), T2(this, "mouseDownEvent", {
      type: "mouseDown",
      mode: this.mode
    }), T2(this, "mouseUpEvent", {
      type: "mouseUp",
      mode: this.mode
    }), T2(this, "objectChangeEvent", {
      type: "objectChange"
    }), T2(this, "intersectObjectWithRay", (a, c, u) => {
      const h2 = c.intersectObject(a, true);
      for (let d = 0; d < h2.length; d++)
        if (h2[d].object.visible || u)
          return h2[d];
      return false;
    }), T2(this, "attach", (a) => (this.object = a, this.visible = true, this)), T2(this, "detach", () => (this.object = void 0, this.visible = false, this.axis = null, this)), T2(this, "reset", () => this.enabled ? (this.dragging && this.object !== void 0 && (this.object.position.copy(this.positionStart), this.object.quaternion.copy(this.quaternionStart), this.object.scale.copy(this.scaleStart), this.dispatchEvent(this.changeEvent), this.dispatchEvent(this.objectChangeEvent), this.pointStart.copy(this.pointEnd)), this) : this), T2(this, "updateMatrixWorld", () => {
      this.object !== void 0 && (this.object.updateMatrixWorld(), this.object.parent === null ? console.error("TransformControls: The attached 3D object must be a part of the scene graph.") : this.object.parent.matrixWorld.decompose(this.parentPosition, this.parentQuaternion, this.parentScale), this.object.matrixWorld.decompose(this.worldPosition, this.worldQuaternion, this.worldScale), this.parentQuaternionInv.copy(this.parentQuaternion).invert(), this.worldQuaternionInv.copy(this.worldQuaternion).invert()), this.camera.updateMatrixWorld(), this.camera.matrixWorld.decompose(this.cameraPosition, this.cameraQuaternion, this.cameraScale), this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(), super.updateMatrixWorld();
    }), T2(this, "pointerHover", (a) => {
      if (this.object === void 0 || this.dragging === true)
        return;
      this.raycaster.setFromCamera(a, this.camera);
      const c = this.intersectObjectWithRay(this.gizmo.picker[this.mode], this.raycaster);
      c ? this.axis = c.object.name : this.axis = null;
    }), T2(this, "pointerDown", (a) => {
      if (!(this.object === void 0 || this.dragging === true || a.button !== 0) && this.axis !== null) {
        this.raycaster.setFromCamera(a, this.camera);
        const c = this.intersectObjectWithRay(this.plane, this.raycaster, true);
        if (c) {
          let u = this.space;
          if (this.mode === "scale" ? u = "local" : (this.axis === "E" || this.axis === "XYZE" || this.axis === "XYZ") && (u = "world"), u === "local" && this.mode === "rotate") {
            const h2 = this.rotationSnap;
            this.axis === "X" && h2 && (this.object.rotation.x = Math.round(this.object.rotation.x / h2) * h2), this.axis === "Y" && h2 && (this.object.rotation.y = Math.round(this.object.rotation.y / h2) * h2), this.axis === "Z" && h2 && (this.object.rotation.z = Math.round(this.object.rotation.z / h2) * h2);
          }
          this.object.updateMatrixWorld(), this.object.parent && this.object.parent.updateMatrixWorld(), this.positionStart.copy(this.object.position), this.quaternionStart.copy(this.object.quaternion), this.scaleStart.copy(this.object.scale), this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this.worldScaleStart), this.pointStart.copy(c.point).sub(this.worldPositionStart);
        }
        this.dragging = true, this.mouseDownEvent.mode = this.mode, this.dispatchEvent(this.mouseDownEvent);
      }
    }), T2(this, "pointerMove", (a) => {
      const c = this.axis, u = this.mode, h2 = this.object;
      let d = this.space;
      if (u === "scale" ? d = "local" : (c === "E" || c === "XYZE" || c === "XYZ") && (d = "world"), h2 === void 0 || c === null || this.dragging === false || a.button !== -1)
        return;
      this.raycaster.setFromCamera(a, this.camera);
      const g = this.intersectObjectWithRay(this.plane, this.raycaster, true);
      if (g) {
        if (this.pointEnd.copy(g.point).sub(this.worldPositionStart), u === "translate")
          this.offset.copy(this.pointEnd).sub(this.pointStart), d === "local" && c !== "XYZ" && this.offset.applyQuaternion(this.worldQuaternionInv), c.indexOf("X") === -1 && (this.offset.x = 0), c.indexOf("Y") === -1 && (this.offset.y = 0), c.indexOf("Z") === -1 && (this.offset.z = 0), d === "local" && c !== "XYZ" ? this.offset.applyQuaternion(this.quaternionStart).divide(this.parentScale) : this.offset.applyQuaternion(this.parentQuaternionInv).divide(this.parentScale), h2.position.copy(this.offset).add(this.positionStart), this.translationSnap && (d === "local" && (h2.position.applyQuaternion(this.tempQuaternion.copy(this.quaternionStart).invert()), c.search("X") !== -1 && (h2.position.x = Math.round(h2.position.x / this.translationSnap) * this.translationSnap), c.search("Y") !== -1 && (h2.position.y = Math.round(h2.position.y / this.translationSnap) * this.translationSnap), c.search("Z") !== -1 && (h2.position.z = Math.round(h2.position.z / this.translationSnap) * this.translationSnap), h2.position.applyQuaternion(this.quaternionStart)), d === "world" && (h2.parent && h2.position.add(this.tempVector.setFromMatrixPosition(h2.parent.matrixWorld)), c.search("X") !== -1 && (h2.position.x = Math.round(h2.position.x / this.translationSnap) * this.translationSnap), c.search("Y") !== -1 && (h2.position.y = Math.round(h2.position.y / this.translationSnap) * this.translationSnap), c.search("Z") !== -1 && (h2.position.z = Math.round(h2.position.z / this.translationSnap) * this.translationSnap), h2.parent && h2.position.sub(this.tempVector.setFromMatrixPosition(h2.parent.matrixWorld))));
        else if (u === "scale") {
          if (c.search("XYZ") !== -1) {
            let w = this.pointEnd.length() / this.pointStart.length();
            this.pointEnd.dot(this.pointStart) < 0 && (w *= -1), this.tempVector2.set(w, w, w);
          } else
            this.tempVector.copy(this.pointStart), this.tempVector2.copy(this.pointEnd), this.tempVector.applyQuaternion(this.worldQuaternionInv), this.tempVector2.applyQuaternion(this.worldQuaternionInv), this.tempVector2.divide(this.tempVector), c.search("X") === -1 && (this.tempVector2.x = 1), c.search("Y") === -1 && (this.tempVector2.y = 1), c.search("Z") === -1 && (this.tempVector2.z = 1);
          h2.scale.copy(this.scaleStart).multiply(this.tempVector2), this.scaleSnap && this.object && (c.search("X") !== -1 && (this.object.scale.x = Math.round(h2.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap), c.search("Y") !== -1 && (h2.scale.y = Math.round(h2.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap), c.search("Z") !== -1 && (h2.scale.z = Math.round(h2.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap));
        } else if (u === "rotate") {
          this.offset.copy(this.pointEnd).sub(this.pointStart);
          const w = 20 / this.worldPosition.distanceTo(this.tempVector.setFromMatrixPosition(this.camera.matrixWorld));
          c === "E" ? (this.rotationAxis.copy(this.eye), this.rotationAngle = this.pointEnd.angleTo(this.pointStart), this.startNorm.copy(this.pointStart).normalize(), this.endNorm.copy(this.pointEnd).normalize(), this.rotationAngle *= this.endNorm.cross(this.startNorm).dot(this.eye) < 0 ? 1 : -1) : c === "XYZE" ? (this.rotationAxis.copy(this.offset).cross(this.eye).normalize(), this.rotationAngle = this.offset.dot(this.tempVector.copy(this.rotationAxis).cross(this.eye)) * w) : (c === "X" || c === "Y" || c === "Z") && (this.rotationAxis.copy(this.unit[c]), this.tempVector.copy(this.unit[c]), d === "local" && this.tempVector.applyQuaternion(this.worldQuaternion), this.rotationAngle = this.offset.dot(this.tempVector.cross(this.eye).normalize()) * w), this.rotationSnap && (this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap), d === "local" && c !== "E" && c !== "XYZE" ? (h2.quaternion.copy(this.quaternionStart), h2.quaternion.multiply(this.tempQuaternion.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize()) : (this.rotationAxis.applyQuaternion(this.parentQuaternionInv), h2.quaternion.copy(this.tempQuaternion.setFromAxisAngle(this.rotationAxis, this.rotationAngle)), h2.quaternion.multiply(this.quaternionStart).normalize());
        }
        this.dispatchEvent(this.changeEvent), this.dispatchEvent(this.objectChangeEvent);
      }
    }), T2(this, "pointerUp", (a) => {
      a.button === 0 && (this.dragging && this.axis !== null && (this.mouseUpEvent.mode = this.mode, this.dispatchEvent(this.mouseUpEvent)), this.dragging = false, this.axis = null);
    }), T2(this, "getPointer", (a) => {
      var c;
      if (this.domElement && (c = this.domElement.ownerDocument) !== null && c !== void 0 && c.pointerLockElement)
        return {
          x: 0,
          y: 0,
          button: a.button
        };
      {
        var u;
        const h2 = a.changedTouches ? a.changedTouches[0] : a, d = (u = this.domElement) === null || u === void 0 ? void 0 : u.getBoundingClientRect();
        return {
          x: (h2.clientX - d.left) / d.width * 2 - 1,
          y: -(h2.clientY - d.top) / d.height * 2 + 1,
          button: a.button
        };
      }
    }), T2(this, "onPointerHover", (a) => {
      if (this.enabled)
        switch (a.pointerType) {
          case "mouse":
          case "pen":
            this.pointerHover(this.getPointer(a));
            break;
        }
    }), T2(this, "onPointerDown", (a) => {
      !this.enabled || !this.domElement || (this.domElement.style.touchAction = "none", this.domElement.ownerDocument.addEventListener("pointermove", this.onPointerMove), this.pointerHover(this.getPointer(a)), this.pointerDown(this.getPointer(a)));
    }), T2(this, "onPointerMove", (a) => {
      this.enabled && this.pointerMove(this.getPointer(a));
    }), T2(this, "onPointerUp", (a) => {
      !this.enabled || !this.domElement || (this.domElement.style.touchAction = "", this.domElement.ownerDocument.removeEventListener("pointermove", this.onPointerMove), this.pointerUp(this.getPointer(a)));
    }), T2(this, "getMode", () => this.mode), T2(this, "setMode", (a) => {
      this.mode = a;
    }), T2(this, "setTranslationSnap", (a) => {
      this.translationSnap = a;
    }), T2(this, "setRotationSnap", (a) => {
      this.rotationSnap = a;
    }), T2(this, "setScaleSnap", (a) => {
      this.scaleSnap = a;
    }), T2(this, "setSize", (a) => {
      this.size = a;
    }), T2(this, "setSpace", (a) => {
      this.space = a;
    }), T2(this, "update", () => {
      console.warn("THREE.TransformControls: update function has no more functionality and therefore has been deprecated.");
    }), T2(this, "connect", (a) => {
      a === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'), this.domElement = a, this.domElement.addEventListener("pointerdown", this.onPointerDown), this.domElement.addEventListener("pointermove", this.onPointerHover), this.domElement.ownerDocument.addEventListener("pointerup", this.onPointerUp);
    }), T2(this, "dispose", () => {
      var a, c, u, h2, d, g;
      (a = this.domElement) === null || a === void 0 || a.removeEventListener("pointerdown", this.onPointerDown), (c = this.domElement) === null || c === void 0 || c.removeEventListener("pointermove", this.onPointerHover), (u = this.domElement) === null || u === void 0 || (h2 = u.ownerDocument) === null || h2 === void 0 || h2.removeEventListener("pointermove", this.onPointerMove), (d = this.domElement) === null || d === void 0 || (g = d.ownerDocument) === null || g === void 0 || g.removeEventListener("pointerup", this.onPointerUp), this.traverse((w) => {
        const _ = w;
        _.geometry && _.geometry.dispose(), _.material && _.material.dispose();
      });
    }), this.domElement = r, this.camera = i, this.gizmo = new tu(), this.add(this.gizmo), this.plane = new nu(), this.add(this.plane);
    const s = (a, c) => {
      let u = c;
      Object.defineProperty(this, a, {
        get: function() {
          return u !== void 0 ? u : c;
        },
        set: function(h2) {
          u !== h2 && (u = h2, this.plane[a] = h2, this.gizmo[a] = h2, this.dispatchEvent({
            type: a + "-changed",
            value: h2
          }), this.dispatchEvent(this.changeEvent));
        }
      }), this[a] = c, this.plane[a] = c, this.gizmo[a] = c;
    };
    s("camera", this.camera), s("object", this.object), s("enabled", this.enabled), s("axis", this.axis), s("mode", this.mode), s("translationSnap", this.translationSnap), s("rotationSnap", this.rotationSnap), s("scaleSnap", this.scaleSnap), s("space", this.space), s("size", this.size), s("dragging", this.dragging), s("showX", this.showX), s("showY", this.showY), s("showZ", this.showZ), s("worldPosition", this.worldPosition), s("worldPositionStart", this.worldPositionStart), s("worldQuaternion", this.worldQuaternion), s("worldQuaternionStart", this.worldQuaternionStart), s("cameraPosition", this.cameraPosition), s("cameraQuaternion", this.cameraQuaternion), s("pointStart", this.pointStart), s("pointEnd", this.pointEnd), s("rotationAxis", this.rotationAxis), s("rotationAngle", this.rotationAngle), s("eye", this.eye), r !== void 0 && this.connect(r);
  }
};
var tu = class extends Object3D {
  // these are set from parent class TransformControls
  constructor() {
    super(), T2(this, "isTransformControlsGizmo", true), T2(this, "type", "TransformControlsGizmo"), T2(this, "tempVector", new Vector3(0, 0, 0)), T2(this, "tempEuler", new Euler()), T2(this, "alignVector", new Vector3(0, 1, 0)), T2(this, "zeroVector", new Vector3(0, 0, 0)), T2(this, "lookAtMatrix", new Matrix4()), T2(this, "tempQuaternion", new Quaternion()), T2(this, "tempQuaternion2", new Quaternion()), T2(this, "identityQuaternion", new Quaternion()), T2(this, "unitX", new Vector3(1, 0, 0)), T2(this, "unitY", new Vector3(0, 1, 0)), T2(this, "unitZ", new Vector3(0, 0, 1)), T2(this, "gizmo", void 0), T2(this, "picker", void 0), T2(this, "helper", void 0), T2(this, "rotationAxis", new Vector3()), T2(this, "cameraPosition", new Vector3()), T2(this, "worldPositionStart", new Vector3()), T2(this, "worldQuaternionStart", new Quaternion()), T2(this, "worldPosition", new Vector3()), T2(this, "worldQuaternion", new Quaternion()), T2(this, "eye", new Vector3()), T2(this, "camera", null), T2(this, "enabled", true), T2(this, "axis", null), T2(this, "mode", "translate"), T2(this, "space", "world"), T2(this, "size", 1), T2(this, "dragging", false), T2(this, "showX", true), T2(this, "showY", true), T2(this, "showZ", true), T2(this, "updateMatrixWorld", () => {
      let fe2 = this.space;
      this.mode === "scale" && (fe2 = "local");
      const ae = fe2 === "local" ? this.worldQuaternion : this.identityQuaternion;
      this.gizmo.translate.visible = this.mode === "translate", this.gizmo.rotate.visible = this.mode === "rotate", this.gizmo.scale.visible = this.mode === "scale", this.helper.translate.visible = this.mode === "translate", this.helper.rotate.visible = this.mode === "rotate", this.helper.scale.visible = this.mode === "scale";
      let ne = [];
      ne = ne.concat(this.picker[this.mode].children), ne = ne.concat(this.gizmo[this.mode].children), ne = ne.concat(this.helper[this.mode].children);
      for (let be = 0; be < ne.length; be++) {
        const M = ne[be];
        M.visible = true, M.rotation.set(0, 0, 0), M.position.copy(this.worldPosition);
        let le2;
        if (this.camera.isOrthographicCamera ? le2 = (this.camera.top - this.camera.bottom) / this.camera.zoom : le2 = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7), M.scale.set(1, 1, 1).multiplyScalar(le2 * this.size / 7), M.tag === "helper") {
          M.visible = false, M.name === "AXIS" ? (M.position.copy(this.worldPositionStart), M.visible = !!this.axis, this.axis === "X" && (this.tempQuaternion.setFromEuler(this.tempEuler.set(0, 0, 0)), M.quaternion.copy(ae).multiply(this.tempQuaternion), Math.abs(this.alignVector.copy(this.unitX).applyQuaternion(ae).dot(this.eye)) > 0.9 && (M.visible = false)), this.axis === "Y" && (this.tempQuaternion.setFromEuler(this.tempEuler.set(0, 0, Math.PI / 2)), M.quaternion.copy(ae).multiply(this.tempQuaternion), Math.abs(this.alignVector.copy(this.unitY).applyQuaternion(ae).dot(this.eye)) > 0.9 && (M.visible = false)), this.axis === "Z" && (this.tempQuaternion.setFromEuler(this.tempEuler.set(0, Math.PI / 2, 0)), M.quaternion.copy(ae).multiply(this.tempQuaternion), Math.abs(this.alignVector.copy(this.unitZ).applyQuaternion(ae).dot(this.eye)) > 0.9 && (M.visible = false)), this.axis === "XYZE" && (this.tempQuaternion.setFromEuler(this.tempEuler.set(0, Math.PI / 2, 0)), this.alignVector.copy(this.rotationAxis), M.quaternion.setFromRotationMatrix(this.lookAtMatrix.lookAt(this.zeroVector, this.alignVector, this.unitY)), M.quaternion.multiply(this.tempQuaternion), M.visible = this.dragging), this.axis === "E" && (M.visible = false)) : M.name === "START" ? (M.position.copy(this.worldPositionStart), M.visible = this.dragging) : M.name === "END" ? (M.position.copy(this.worldPosition), M.visible = this.dragging) : M.name === "DELTA" ? (M.position.copy(this.worldPositionStart), M.quaternion.copy(this.worldQuaternionStart), this.tempVector.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1), this.tempVector.applyQuaternion(this.worldQuaternionStart.clone().invert()), M.scale.copy(this.tempVector), M.visible = this.dragging) : (M.quaternion.copy(ae), this.dragging ? M.position.copy(this.worldPositionStart) : M.position.copy(this.worldPosition), this.axis && (M.visible = this.axis.search(M.name) !== -1));
          continue;
        }
        M.quaternion.copy(ae), this.mode === "translate" || this.mode === "scale" ? ((M.name === "X" || M.name === "XYZX") && Math.abs(this.alignVector.copy(this.unitX).applyQuaternion(ae).dot(this.eye)) > 0.99 && (M.scale.set(1e-10, 1e-10, 1e-10), M.visible = false), (M.name === "Y" || M.name === "XYZY") && Math.abs(this.alignVector.copy(this.unitY).applyQuaternion(ae).dot(this.eye)) > 0.99 && (M.scale.set(1e-10, 1e-10, 1e-10), M.visible = false), (M.name === "Z" || M.name === "XYZZ") && Math.abs(this.alignVector.copy(this.unitZ).applyQuaternion(ae).dot(this.eye)) > 0.99 && (M.scale.set(1e-10, 1e-10, 1e-10), M.visible = false), M.name === "XY" && Math.abs(this.alignVector.copy(this.unitZ).applyQuaternion(ae).dot(this.eye)) < 0.2 && (M.scale.set(1e-10, 1e-10, 1e-10), M.visible = false), M.name === "YZ" && Math.abs(this.alignVector.copy(this.unitX).applyQuaternion(ae).dot(this.eye)) < 0.2 && (M.scale.set(1e-10, 1e-10, 1e-10), M.visible = false), M.name === "XZ" && Math.abs(this.alignVector.copy(this.unitY).applyQuaternion(ae).dot(this.eye)) < 0.2 && (M.scale.set(1e-10, 1e-10, 1e-10), M.visible = false), M.name.search("X") !== -1 && (this.alignVector.copy(this.unitX).applyQuaternion(ae).dot(this.eye) < 0 ? M.tag === "fwd" ? M.visible = false : M.scale.x *= -1 : M.tag === "bwd" && (M.visible = false)), M.name.search("Y") !== -1 && (this.alignVector.copy(this.unitY).applyQuaternion(ae).dot(this.eye) < 0 ? M.tag === "fwd" ? M.visible = false : M.scale.y *= -1 : M.tag === "bwd" && (M.visible = false)), M.name.search("Z") !== -1 && (this.alignVector.copy(this.unitZ).applyQuaternion(ae).dot(this.eye) < 0 ? M.tag === "fwd" ? M.visible = false : M.scale.z *= -1 : M.tag === "bwd" && (M.visible = false))) : this.mode === "rotate" && (this.tempQuaternion2.copy(ae), this.alignVector.copy(this.eye).applyQuaternion(this.tempQuaternion.copy(ae).invert()), M.name.search("E") !== -1 && M.quaternion.setFromRotationMatrix(this.lookAtMatrix.lookAt(this.eye, this.zeroVector, this.unitY)), M.name === "X" && (this.tempQuaternion.setFromAxisAngle(this.unitX, Math.atan2(-this.alignVector.y, this.alignVector.z)), this.tempQuaternion.multiplyQuaternions(this.tempQuaternion2, this.tempQuaternion), M.quaternion.copy(this.tempQuaternion)), M.name === "Y" && (this.tempQuaternion.setFromAxisAngle(this.unitY, Math.atan2(this.alignVector.x, this.alignVector.z)), this.tempQuaternion.multiplyQuaternions(this.tempQuaternion2, this.tempQuaternion), M.quaternion.copy(this.tempQuaternion)), M.name === "Z" && (this.tempQuaternion.setFromAxisAngle(this.unitZ, Math.atan2(this.alignVector.y, this.alignVector.x)), this.tempQuaternion.multiplyQuaternions(this.tempQuaternion2, this.tempQuaternion), M.quaternion.copy(this.tempQuaternion))), M.visible = M.visible && (M.name.indexOf("X") === -1 || this.showX), M.visible = M.visible && (M.name.indexOf("Y") === -1 || this.showY), M.visible = M.visible && (M.name.indexOf("Z") === -1 || this.showZ), M.visible = M.visible && (M.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ), M.material.tempOpacity = M.material.tempOpacity || M.material.opacity, M.material.tempColor = M.material.tempColor || M.material.color.clone(), M.material.color.copy(M.material.tempColor), M.material.opacity = M.material.tempOpacity, this.enabled ? this.axis && (M.name === this.axis ? (M.material.opacity = 1, M.material.color.lerp(new Color(1, 1, 1), 0.5)) : this.axis.split("").some(function(Ve) {
          return M.name === Ve;
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
    const h2 = i.clone();
    h2.color.set(255);
    const d = i.clone();
    d.opacity = 0.25;
    const g = d.clone();
    g.color.set(16776960);
    const w = d.clone();
    w.color.set(65535);
    const _ = d.clone();
    _.color.set(16711935), i.clone().color.set(16776960);
    const C = r.clone();
    C.color.set(16711680);
    const I2 = r.clone();
    I2.color.set(65280);
    const S2 = r.clone();
    S2.color.set(255);
    const R2 = r.clone();
    R2.color.set(65535);
    const j2 = r.clone();
    j2.color.set(16711935);
    const F = r.clone();
    F.color.set(16776960);
    const V2 = r.clone();
    V2.color.set(7895160);
    const D = F.clone();
    D.opacity = 0.25;
    const Y = new CylinderGeometry(0, 0.05, 0.2, 12, 1, false), G2 = new BoxGeometry(0.125, 0.125, 0.125), N = new BufferGeometry();
    N.setAttribute("position", new Float32BufferAttribute([0, 0, 0, 1, 0, 0], 3));
    const O = (fe2, ae) => {
      const ne = new BufferGeometry(), be = [];
      for (let M = 0; M <= 64 * ae; ++M)
        be.push(0, Math.cos(M / 32 * Math.PI) * fe2, Math.sin(M / 32 * Math.PI) * fe2);
      return ne.setAttribute("position", new Float32BufferAttribute(be, 3)), ne;
    }, H2 = () => {
      const fe2 = new BufferGeometry();
      return fe2.setAttribute("position", new Float32BufferAttribute([0, 0, 0, 1, 1, 1], 3)), fe2;
    }, K = {
      X: [[new Mesh(Y, c), [1, 0, 0], [0, 0, -Math.PI / 2], null, "fwd"], [new Mesh(Y, c), [1, 0, 0], [0, 0, Math.PI / 2], null, "bwd"], [new Line(N, C)]],
      Y: [[new Mesh(Y, u), [0, 1, 0], null, null, "fwd"], [new Mesh(Y, u), [0, 1, 0], [Math.PI, 0, 0], null, "bwd"], [new Line(N, I2), null, [0, 0, Math.PI / 2]]],
      Z: [[new Mesh(Y, h2), [0, 0, 1], [Math.PI / 2, 0, 0], null, "fwd"], [new Mesh(Y, h2), [0, 0, 1], [-Math.PI / 2, 0, 0], null, "bwd"], [new Line(N, S2), null, [0, -Math.PI / 2, 0]]],
      XYZ: [[new Mesh(new OctahedronGeometry(0.1, 0), d.clone()), [0, 0, 0], [0, 0, 0]]],
      XY: [[new Mesh(new PlaneGeometry(0.295, 0.295), g.clone()), [0.15, 0.15, 0]], [new Line(N, F), [0.18, 0.3, 0], null, [0.125, 1, 1]], [new Line(N, F), [0.3, 0.18, 0], [0, 0, Math.PI / 2], [0.125, 1, 1]]],
      YZ: [[new Mesh(new PlaneGeometry(0.295, 0.295), w.clone()), [0, 0.15, 0.15], [0, Math.PI / 2, 0]], [new Line(N, R2), [0, 0.18, 0.3], [0, 0, Math.PI / 2], [0.125, 1, 1]], [new Line(N, R2), [0, 0.3, 0.18], [0, -Math.PI / 2, 0], [0.125, 1, 1]]],
      XZ: [[new Mesh(new PlaneGeometry(0.295, 0.295), _.clone()), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]], [new Line(N, j2), [0.18, 0, 0.3], null, [0.125, 1, 1]], [new Line(N, j2), [0.3, 0, 0.18], [0, -Math.PI / 2, 0], [0.125, 1, 1]]]
    }, q = {
      X: [[new Mesh(new CylinderGeometry(0.2, 0, 1, 4, 1, false), s), [0.6, 0, 0], [0, 0, -Math.PI / 2]]],
      Y: [[new Mesh(new CylinderGeometry(0.2, 0, 1, 4, 1, false), s), [0, 0.6, 0]]],
      Z: [[new Mesh(new CylinderGeometry(0.2, 0, 1, 4, 1, false), s), [0, 0, 0.6], [Math.PI / 2, 0, 0]]],
      XYZ: [[new Mesh(new OctahedronGeometry(0.2, 0), s)]],
      XY: [[new Mesh(new PlaneGeometry(0.4, 0.4), s), [0.2, 0.2, 0]]],
      YZ: [[new Mesh(new PlaneGeometry(0.4, 0.4), s), [0, 0.2, 0.2], [0, Math.PI / 2, 0]]],
      XZ: [[new Mesh(new PlaneGeometry(0.4, 0.4), s), [0.2, 0, 0.2], [-Math.PI / 2, 0, 0]]]
    }, ue2 = {
      START: [[new Mesh(new OctahedronGeometry(0.01, 2), a), null, null, null, "helper"]],
      END: [[new Mesh(new OctahedronGeometry(0.01, 2), a), null, null, null, "helper"]],
      DELTA: [[new Line(H2(), a), null, null, null, "helper"]],
      X: [[new Line(N, a.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]],
      Y: [[new Line(N, a.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]],
      Z: [[new Line(N, a.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]]
    }, ge = {
      X: [[new Line(O(1, 0.5), C)], [new Mesh(new OctahedronGeometry(0.04, 0), c), [0, 0, 0.99], null, [1, 3, 1]]],
      Y: [[new Line(O(1, 0.5), I2), null, [0, 0, -Math.PI / 2]], [new Mesh(new OctahedronGeometry(0.04, 0), u), [0, 0, 0.99], null, [3, 1, 1]]],
      Z: [[new Line(O(1, 0.5), S2), null, [0, Math.PI / 2, 0]], [new Mesh(new OctahedronGeometry(0.04, 0), h2), [0.99, 0, 0], null, [1, 3, 1]]],
      E: [[new Line(O(1.25, 1), D), null, [0, Math.PI / 2, 0]], [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), D), [1.17, 0, 0], [0, 0, -Math.PI / 2], [1, 1, 1e-3]], [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), D), [-1.17, 0, 0], [0, 0, Math.PI / 2], [1, 1, 1e-3]], [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), D), [0, -1.17, 0], [Math.PI, 0, 0], [1, 1, 1e-3]], [new Mesh(new CylinderGeometry(0.03, 0, 0.15, 4, 1, false), D), [0, 1.17, 0], [0, 0, 0], [1, 1, 1e-3]]],
      XYZE: [[new Line(O(1, 1), V2), null, [0, Math.PI / 2, 0]]]
    }, ce2 = {
      AXIS: [[new Line(N, a.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]]
    }, me2 = {
      X: [[new Mesh(new TorusGeometry(1, 0.1, 4, 24), s), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]],
      Y: [[new Mesh(new TorusGeometry(1, 0.1, 4, 24), s), [0, 0, 0], [Math.PI / 2, 0, 0]]],
      Z: [[new Mesh(new TorusGeometry(1, 0.1, 4, 24), s), [0, 0, 0], [0, 0, -Math.PI / 2]]],
      E: [[new Mesh(new TorusGeometry(1.25, 0.1, 2, 24), s)]],
      XYZE: [[new Mesh(new SphereGeometry(0.7, 10, 8), s)]]
    }, he = {
      X: [[new Mesh(G2, c), [0.8, 0, 0], [0, 0, -Math.PI / 2]], [new Line(N, C), null, null, [0.8, 1, 1]]],
      Y: [[new Mesh(G2, u), [0, 0.8, 0]], [new Line(N, I2), null, [0, 0, Math.PI / 2], [0.8, 1, 1]]],
      Z: [[new Mesh(G2, h2), [0, 0, 0.8], [Math.PI / 2, 0, 0]], [new Line(N, S2), null, [0, -Math.PI / 2, 0], [0.8, 1, 1]]],
      XY: [[new Mesh(G2, g), [0.85, 0.85, 0], null, [2, 2, 0.2]], [new Line(N, F), [0.855, 0.98, 0], null, [0.125, 1, 1]], [new Line(N, F), [0.98, 0.855, 0], [0, 0, Math.PI / 2], [0.125, 1, 1]]],
      YZ: [[new Mesh(G2, w), [0, 0.85, 0.85], null, [0.2, 2, 2]], [new Line(N, R2), [0, 0.855, 0.98], [0, 0, Math.PI / 2], [0.125, 1, 1]], [new Line(N, R2), [0, 0.98, 0.855], [0, -Math.PI / 2, 0], [0.125, 1, 1]]],
      XZ: [[new Mesh(G2, _), [0.85, 0, 0.85], null, [2, 0.2, 2]], [new Line(N, j2), [0.855, 0, 0.98], null, [0.125, 1, 1]], [new Line(N, j2), [0.98, 0, 0.855], [0, -Math.PI / 2, 0], [0.125, 1, 1]]],
      XYZX: [[new Mesh(new BoxGeometry(0.125, 0.125, 0.125), d.clone()), [1.1, 0, 0]]],
      XYZY: [[new Mesh(new BoxGeometry(0.125, 0.125, 0.125), d.clone()), [0, 1.1, 0]]],
      XYZZ: [[new Mesh(new BoxGeometry(0.125, 0.125, 0.125), d.clone()), [0, 0, 1.1]]]
    }, ee2 = {
      X: [[new Mesh(new CylinderGeometry(0.2, 0, 0.8, 4, 1, false), s), [0.5, 0, 0], [0, 0, -Math.PI / 2]]],
      Y: [[new Mesh(new CylinderGeometry(0.2, 0, 0.8, 4, 1, false), s), [0, 0.5, 0]]],
      Z: [[new Mesh(new CylinderGeometry(0.2, 0, 0.8, 4, 1, false), s), [0, 0, 0.5], [Math.PI / 2, 0, 0]]],
      XY: [[new Mesh(G2, s), [0.85, 0.85, 0], null, [3, 3, 0.2]]],
      YZ: [[new Mesh(G2, s), [0, 0.85, 0.85], null, [0.2, 3, 3]]],
      XZ: [[new Mesh(G2, s), [0.85, 0, 0.85], null, [3, 0.2, 3]]],
      XYZX: [[new Mesh(new BoxGeometry(0.2, 0.2, 0.2), s), [1.1, 0, 0]]],
      XYZY: [[new Mesh(new BoxGeometry(0.2, 0.2, 0.2), s), [0, 1.1, 0]]],
      XYZZ: [[new Mesh(new BoxGeometry(0.2, 0.2, 0.2), s), [0, 0, 1.1]]]
    }, X = {
      X: [[new Line(N, a.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]],
      Y: [[new Line(N, a.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]],
      Z: [[new Line(N, a.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]]
    }, Pe = (fe2) => {
      const ae = new Object3D();
      for (let ne in fe2)
        for (let be = fe2[ne].length; be--; ) {
          const M = fe2[ne][be][0].clone(), le2 = fe2[ne][be][1], Ve = fe2[ne][be][2], Ne2 = fe2[ne][be][3], we = fe2[ne][be][4];
          M.name = ne, M.tag = we, le2 && M.position.set(le2[0], le2[1], le2[2]), Ve && M.rotation.set(Ve[0], Ve[1], Ve[2]), Ne2 && M.scale.set(Ne2[0], Ne2[1], Ne2[2]), M.updateMatrix();
          const it2 = M.geometry.clone();
          it2.applyMatrix4(M.matrix), M.geometry = it2, M.renderOrder = 1 / 0, M.position.set(0, 0, 0), M.rotation.set(0, 0, 0), M.scale.set(1, 1, 1), ae.add(M);
        }
      return ae;
    };
    this.gizmo = {}, this.picker = {}, this.helper = {}, this.add(this.gizmo.translate = Pe(K)), this.add(this.gizmo.rotate = Pe(ge)), this.add(this.gizmo.scale = Pe(he)), this.add(this.picker.translate = Pe(q)), this.add(this.picker.rotate = Pe(me2)), this.add(this.picker.scale = Pe(ee2)), this.add(this.helper.translate = Pe(ue2)), this.add(this.helper.rotate = Pe(ce2)), this.add(this.helper.scale = Pe(X)), this.picker.translate.visible = false, this.picker.rotate.visible = false, this.picker.scale.visible = false;
  }
  // updateMatrixWorld will update transformations and appearance of individual handles
};
var nu = class extends Mesh {
  constructor() {
    super(new PlaneGeometry(1e5, 1e5, 2, 2), new MeshBasicMaterial({
      visible: false,
      wireframe: true,
      side: DoubleSide,
      transparent: true,
      opacity: 0.1,
      toneMapped: false
    })), T2(this, "isTransformControlsPlane", true), T2(this, "type", "TransformControlsPlane"), T2(this, "unitX", new Vector3(1, 0, 0)), T2(this, "unitY", new Vector3(0, 1, 0)), T2(this, "unitZ", new Vector3(0, 0, 1)), T2(this, "tempVector", new Vector3()), T2(this, "dirVector", new Vector3()), T2(this, "alignVector", new Vector3()), T2(this, "tempMatrix", new Matrix4()), T2(this, "identityQuaternion", new Quaternion()), T2(this, "cameraQuaternion", new Quaternion()), T2(this, "worldPosition", new Vector3()), T2(this, "worldQuaternion", new Quaternion()), T2(this, "eye", new Vector3()), T2(this, "axis", null), T2(this, "mode", "translate"), T2(this, "space", "world"), T2(this, "updateMatrixWorld", () => {
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
var oa = (b2, i) => (b2 % i + i) % i;
var iu = class extends EventDispatcher {
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
    super(), T2(this, "object", void 0), T2(this, "domElement", void 0), T2(this, "enabled", true), T2(this, "target", new Vector3()), T2(this, "minDistance", 0), T2(this, "maxDistance", 1 / 0), T2(this, "minZoom", 0), T2(this, "maxZoom", 1 / 0), T2(this, "minPolarAngle", 0), T2(this, "maxPolarAngle", Math.PI), T2(this, "minAzimuthAngle", -1 / 0), T2(this, "maxAzimuthAngle", 1 / 0), T2(this, "enableDamping", false), T2(this, "dampingFactor", 0.05), T2(this, "enableZoom", true), T2(this, "zoomSpeed", 1), T2(this, "enableRotate", true), T2(this, "rotateSpeed", 1), T2(this, "enablePan", true), T2(this, "panSpeed", 1), T2(this, "screenSpacePanning", true), T2(this, "keyPanSpeed", 7), T2(this, "autoRotate", false), T2(this, "autoRotateSpeed", 2), T2(this, "reverseOrbit", false), T2(this, "keys", {
      LEFT: "ArrowLeft",
      UP: "ArrowUp",
      RIGHT: "ArrowRight",
      BOTTOM: "ArrowDown"
    }), T2(this, "mouseButtons", {
      LEFT: MOUSE.ROTATE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.PAN
    }), T2(this, "touches", {
      ONE: TOUCH.ROTATE,
      TWO: TOUCH.DOLLY_PAN
    }), T2(this, "target0", void 0), T2(this, "position0", void 0), T2(this, "zoom0", void 0), T2(this, "_domElementKeyEvents", null), T2(this, "getPolarAngle", void 0), T2(this, "getAzimuthalAngle", void 0), T2(this, "setPolarAngle", void 0), T2(this, "setAzimuthalAngle", void 0), T2(this, "getDistance", void 0), T2(this, "listenToKeyEvents", void 0), T2(this, "saveState", void 0), T2(this, "reset", void 0), T2(this, "update", void 0), T2(this, "connect", void 0), T2(this, "dispose", void 0), this.object = i, this.domElement = r, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object instanceof PerspectiveCamera ? this.object.zoom : 1, this.getPolarAngle = () => w.phi, this.getAzimuthalAngle = () => w.theta, this.setPolarAngle = (A2) => {
      let U = oa(A2, 2 * Math.PI), W = w.phi;
      W < 0 && (W += 2 * Math.PI), U < 0 && (U += 2 * Math.PI);
      let ie = Math.abs(U - W);
      2 * Math.PI - ie < ie && (U < W ? U += 2 * Math.PI : W += 2 * Math.PI), _.phi = U - W, s.update();
    }, this.setAzimuthalAngle = (A2) => {
      let U = oa(A2, 2 * Math.PI), W = w.theta;
      W < 0 && (W += 2 * Math.PI), U < 0 && (U += 2 * Math.PI);
      let ie = Math.abs(U - W);
      2 * Math.PI - ie < ie && (U < W ? U += 2 * Math.PI : W += 2 * Math.PI), _.theta = U - W, s.update();
    }, this.getDistance = () => s.object.position.distanceTo(s.target), this.listenToKeyEvents = (A2) => {
      A2.addEventListener("keydown", yt), this._domElementKeyEvents = A2;
    }, this.saveState = () => {
      s.target0.copy(s.target), s.position0.copy(s.object.position), s.zoom0 = s.object instanceof PerspectiveCamera ? s.object.zoom : 1;
    }, this.reset = () => {
      s.target.copy(s.target0), s.object.position.copy(s.position0), s.object instanceof PerspectiveCamera && (s.object.zoom = s.zoom0, s.object.updateProjectionMatrix()), s.dispatchEvent(a), s.update(), d = h2.NONE;
    }, this.update = (() => {
      const A2 = new Vector3(), U = new Quaternion().setFromUnitVectors(i.up, new Vector3(0, 1, 0)), W = U.clone().invert(), ie = new Vector3(), ye = new Quaternion(), De = 2 * Math.PI;
      return function() {
        const pn = s.object.position;
        A2.copy(pn).sub(s.target), A2.applyQuaternion(U), w.setFromVector3(A2), s.autoRotate && d === h2.NONE && ue2(K()), s.enableDamping ? (w.theta += _.theta * s.dampingFactor, w.phi += _.phi * s.dampingFactor) : (w.theta += _.theta, w.phi += _.phi);
        let Ue = s.minAzimuthAngle, Ge = s.maxAzimuthAngle;
        return isFinite(Ue) && isFinite(Ge) && (Ue < -Math.PI ? Ue += De : Ue > Math.PI && (Ue -= De), Ge < -Math.PI ? Ge += De : Ge > Math.PI && (Ge -= De), Ue <= Ge ? w.theta = Math.max(Ue, Math.min(Ge, w.theta)) : w.theta = w.theta > (Ue + Ge) / 2 ? Math.max(Ue, w.theta) : Math.min(Ge, w.theta)), w.phi = Math.max(s.minPolarAngle, Math.min(s.maxPolarAngle, w.phi)), w.makeSafe(), w.radius *= y2, w.radius = Math.max(s.minDistance, Math.min(s.maxDistance, w.radius)), s.enableDamping === true ? s.target.addScaledVector(C, s.dampingFactor) : s.target.add(C), A2.setFromSpherical(w), A2.applyQuaternion(W), pn.copy(s.target).add(A2), s.object.lookAt(s.target), s.enableDamping === true ? (_.theta *= 1 - s.dampingFactor, _.phi *= 1 - s.dampingFactor, C.multiplyScalar(1 - s.dampingFactor)) : (_.set(0, 0, 0), C.set(0, 0, 0)), y2 = 1, I2 || ie.distanceToSquared(s.object.position) > g || 8 * (1 - ye.dot(s.object.quaternion)) > g ? (s.dispatchEvent(a), ie.copy(s.object.position), ye.copy(s.object.quaternion), I2 = false, true) : false;
      };
    })(), this.connect = (A2) => {
      A2 === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'), s.domElement = A2, s.domElement.style.touchAction = "none", s.domElement.addEventListener("contextmenu", cn), s.domElement.addEventListener("pointerdown", st2), s.domElement.addEventListener("pointercancel", zn), s.domElement.addEventListener("wheel", Gn);
    }, this.dispose = () => {
      var A2, U, W, ie, ye, De;
      (A2 = s.domElement) === null || A2 === void 0 || A2.removeEventListener("contextmenu", cn), (U = s.domElement) === null || U === void 0 || U.removeEventListener("pointerdown", st2), (W = s.domElement) === null || W === void 0 || W.removeEventListener("pointercancel", zn), (ie = s.domElement) === null || ie === void 0 || ie.removeEventListener("wheel", Gn), (ye = s.domElement) === null || ye === void 0 || ye.ownerDocument.removeEventListener("pointermove", ln), (De = s.domElement) === null || De === void 0 || De.ownerDocument.removeEventListener("pointerup", mt), s._domElementKeyEvents !== null && s._domElementKeyEvents.removeEventListener("keydown", yt);
    };
    const s = this, a = {
      type: "change"
    }, c = {
      type: "start"
    }, u = {
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
    let d = h2.NONE;
    const g = 1e-6, w = new Spherical(), _ = new Spherical();
    let y2 = 1;
    const C = new Vector3();
    let I2 = false;
    const S2 = new Vector2(), R2 = new Vector2(), j2 = new Vector2(), F = new Vector2(), V2 = new Vector2(), D = new Vector2(), Y = new Vector2(), G2 = new Vector2(), N = new Vector2(), O = [], H2 = {};
    function K() {
      return 2 * Math.PI / 60 / 60 * s.autoRotateSpeed;
    }
    function q() {
      return Math.pow(0.95, s.zoomSpeed);
    }
    function ue2(A2) {
      s.reverseOrbit ? _.theta += A2 : _.theta -= A2;
    }
    function ge(A2) {
      s.reverseOrbit ? _.phi += A2 : _.phi -= A2;
    }
    const ce2 = (() => {
      const A2 = new Vector3();
      return function(W, ie) {
        A2.setFromMatrixColumn(ie, 0), A2.multiplyScalar(-W), C.add(A2);
      };
    })(), me2 = (() => {
      const A2 = new Vector3();
      return function(W, ie) {
        s.screenSpacePanning === true ? A2.setFromMatrixColumn(ie, 1) : (A2.setFromMatrixColumn(ie, 0), A2.crossVectors(s.object.up, A2)), A2.multiplyScalar(W), C.add(A2);
      };
    })(), he = (() => {
      const A2 = new Vector3();
      return function(W, ie) {
        const ye = s.domElement;
        if (ye && s.object instanceof PerspectiveCamera && s.object.isPerspectiveCamera) {
          const De = s.object.position;
          A2.copy(De).sub(s.target);
          let Ut = A2.length();
          Ut *= Math.tan(s.object.fov / 2 * Math.PI / 180), ce2(2 * W * Ut / ye.clientHeight, s.object.matrix), me2(2 * ie * Ut / ye.clientHeight, s.object.matrix);
        } else
          ye && s.object instanceof OrthographicCamera && s.object.isOrthographicCamera ? (ce2(W * (s.object.right - s.object.left) / s.object.zoom / ye.clientWidth, s.object.matrix), me2(ie * (s.object.top - s.object.bottom) / s.object.zoom / ye.clientHeight, s.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), s.enablePan = false);
      };
    })();
    function ee2(A2) {
      s.object instanceof PerspectiveCamera && s.object.isPerspectiveCamera ? y2 /= A2 : s.object instanceof OrthographicCamera && s.object.isOrthographicCamera ? (s.object.zoom = Math.max(s.minZoom, Math.min(s.maxZoom, s.object.zoom * A2)), s.object.updateProjectionMatrix(), I2 = true) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), s.enableZoom = false);
    }
    function X(A2) {
      s.object instanceof PerspectiveCamera && s.object.isPerspectiveCamera ? y2 *= A2 : s.object instanceof OrthographicCamera && s.object.isOrthographicCamera ? (s.object.zoom = Math.max(s.minZoom, Math.min(s.maxZoom, s.object.zoom / A2)), s.object.updateProjectionMatrix(), I2 = true) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), s.enableZoom = false);
    }
    function Pe(A2) {
      S2.set(A2.clientX, A2.clientY);
    }
    function fe2(A2) {
      Y.set(A2.clientX, A2.clientY);
    }
    function ae(A2) {
      F.set(A2.clientX, A2.clientY);
    }
    function ne(A2) {
      R2.set(A2.clientX, A2.clientY), j2.subVectors(R2, S2).multiplyScalar(s.rotateSpeed);
      const U = s.domElement;
      U && (ue2(2 * Math.PI * j2.x / U.clientHeight), ge(2 * Math.PI * j2.y / U.clientHeight)), S2.copy(R2), s.update();
    }
    function be(A2) {
      G2.set(A2.clientX, A2.clientY), N.subVectors(G2, Y), N.y > 0 ? ee2(q()) : N.y < 0 && X(q()), Y.copy(G2), s.update();
    }
    function M(A2) {
      V2.set(A2.clientX, A2.clientY), D.subVectors(V2, F).multiplyScalar(s.panSpeed), he(D.x, D.y), F.copy(V2), s.update();
    }
    function le2(A2) {
      A2.deltaY < 0 ? X(q()) : A2.deltaY > 0 && ee2(q()), s.update();
    }
    function Ve(A2) {
      let U = false;
      switch (A2.code) {
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
      U && (A2.preventDefault(), s.update());
    }
    function Ne2() {
      if (O.length == 1)
        S2.set(O[0].pageX, O[0].pageY);
      else {
        const A2 = 0.5 * (O[0].pageX + O[1].pageX), U = 0.5 * (O[0].pageY + O[1].pageY);
        S2.set(A2, U);
      }
    }
    function we() {
      if (O.length == 1)
        F.set(O[0].pageX, O[0].pageY);
      else {
        const A2 = 0.5 * (O[0].pageX + O[1].pageX), U = 0.5 * (O[0].pageY + O[1].pageY);
        F.set(A2, U);
      }
    }
    function it2() {
      const A2 = O[0].pageX - O[1].pageX, U = O[0].pageY - O[1].pageY, W = Math.sqrt(A2 * A2 + U * U);
      Y.set(0, W);
    }
    function Bn() {
      s.enableZoom && it2(), s.enablePan && we();
    }
    function Xe2() {
      s.enableZoom && it2(), s.enableRotate && Ne2();
    }
    function jn(A2) {
      if (O.length == 1)
        R2.set(A2.pageX, A2.pageY);
      else {
        const W = At(A2), ie = 0.5 * (A2.pageX + W.x), ye = 0.5 * (A2.pageY + W.y);
        R2.set(ie, ye);
      }
      j2.subVectors(R2, S2).multiplyScalar(s.rotateSpeed);
      const U = s.domElement;
      U && (ue2(2 * Math.PI * j2.x / U.clientHeight), ge(2 * Math.PI * j2.y / U.clientHeight)), S2.copy(R2);
    }
    function an(A2) {
      if (O.length == 1)
        V2.set(A2.pageX, A2.pageY);
      else {
        const U = At(A2), W = 0.5 * (A2.pageX + U.x), ie = 0.5 * (A2.pageY + U.y);
        V2.set(W, ie);
      }
      D.subVectors(V2, F).multiplyScalar(s.panSpeed), he(D.x, D.y), F.copy(V2);
    }
    function dt2(A2) {
      const U = At(A2), W = A2.pageX - U.x, ie = A2.pageY - U.y, ye = Math.sqrt(W * W + ie * ie);
      G2.set(0, ye), N.set(0, Math.pow(G2.y / Y.y, s.zoomSpeed)), ee2(N.y), Y.copy(G2);
    }
    function Mt(A2) {
      s.enableZoom && dt2(A2), s.enablePan && an(A2);
    }
    function ze(A2) {
      s.enableZoom && dt2(A2), s.enableRotate && jn(A2);
    }
    function st2(A2) {
      if (s.enabled !== false) {
        if (O.length === 0) {
          var U, W;
          (U = s.domElement) === null || U === void 0 || U.ownerDocument.addEventListener("pointermove", ln), (W = s.domElement) === null || W === void 0 || W.ownerDocument.addEventListener("pointerup", mt);
        }
        Kn(A2), A2.pointerType === "touch" ? St(A2) : hi(A2);
      }
    }
    function ln(A2) {
      s.enabled !== false && (A2.pointerType === "touch" ? Hn(A2) : Un(A2));
    }
    function mt(A2) {
      if (xt(A2), O.length === 0) {
        var U, W, ie;
        (U = s.domElement) === null || U === void 0 || U.releasePointerCapture(A2.pointerId), (W = s.domElement) === null || W === void 0 || W.ownerDocument.removeEventListener("pointermove", ln), (ie = s.domElement) === null || ie === void 0 || ie.ownerDocument.removeEventListener("pointerup", mt);
      }
      s.dispatchEvent(u), d = h2.NONE;
    }
    function zn(A2) {
      xt(A2);
    }
    function hi(A2) {
      let U;
      switch (A2.button) {
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
          fe2(A2), d = h2.DOLLY;
          break;
        case MOUSE.ROTATE:
          if (A2.ctrlKey || A2.metaKey || A2.shiftKey) {
            if (s.enablePan === false)
              return;
            ae(A2), d = h2.PAN;
          } else {
            if (s.enableRotate === false)
              return;
            Pe(A2), d = h2.ROTATE;
          }
          break;
        case MOUSE.PAN:
          if (A2.ctrlKey || A2.metaKey || A2.shiftKey) {
            if (s.enableRotate === false)
              return;
            Pe(A2), d = h2.ROTATE;
          } else {
            if (s.enablePan === false)
              return;
            ae(A2), d = h2.PAN;
          }
          break;
        default:
          d = h2.NONE;
      }
      d !== h2.NONE && s.dispatchEvent(c);
    }
    function Un(A2) {
      if (s.enabled !== false)
        switch (d) {
          case h2.ROTATE:
            if (s.enableRotate === false)
              return;
            ne(A2);
            break;
          case h2.DOLLY:
            if (s.enableZoom === false)
              return;
            be(A2);
            break;
          case h2.PAN:
            if (s.enablePan === false)
              return;
            M(A2);
            break;
        }
    }
    function Gn(A2) {
      s.enabled === false || s.enableZoom === false || d !== h2.NONE && d !== h2.ROTATE || (A2.preventDefault(), s.dispatchEvent(c), le2(A2), s.dispatchEvent(u));
    }
    function yt(A2) {
      s.enabled === false || s.enablePan === false || Ve(A2);
    }
    function St(A2) {
      switch (ft(A2), O.length) {
        case 1:
          switch (s.touches.ONE) {
            case TOUCH.ROTATE:
              if (s.enableRotate === false)
                return;
              Ne2(), d = h2.TOUCH_ROTATE;
              break;
            case TOUCH.PAN:
              if (s.enablePan === false)
                return;
              we(), d = h2.TOUCH_PAN;
              break;
            default:
              d = h2.NONE;
          }
          break;
        case 2:
          switch (s.touches.TWO) {
            case TOUCH.DOLLY_PAN:
              if (s.enableZoom === false && s.enablePan === false)
                return;
              Bn(), d = h2.TOUCH_DOLLY_PAN;
              break;
            case TOUCH.DOLLY_ROTATE:
              if (s.enableZoom === false && s.enableRotate === false)
                return;
              Xe2(), d = h2.TOUCH_DOLLY_ROTATE;
              break;
            default:
              d = h2.NONE;
          }
          break;
        default:
          d = h2.NONE;
      }
      d !== h2.NONE && s.dispatchEvent(c);
    }
    function Hn(A2) {
      switch (ft(A2), d) {
        case h2.TOUCH_ROTATE:
          if (s.enableRotate === false)
            return;
          jn(A2), s.update();
          break;
        case h2.TOUCH_PAN:
          if (s.enablePan === false)
            return;
          an(A2), s.update();
          break;
        case h2.TOUCH_DOLLY_PAN:
          if (s.enableZoom === false && s.enablePan === false)
            return;
          Mt(A2), s.update();
          break;
        case h2.TOUCH_DOLLY_ROTATE:
          if (s.enableZoom === false && s.enableRotate === false)
            return;
          ze(A2), s.update();
          break;
        default:
          d = h2.NONE;
      }
    }
    function cn(A2) {
      s.enabled !== false && A2.preventDefault();
    }
    function Kn(A2) {
      O.push(A2);
    }
    function xt(A2) {
      delete H2[A2.pointerId];
      for (let U = 0; U < O.length; U++)
        if (O[U].pointerId == A2.pointerId) {
          O.splice(U, 1);
          return;
        }
    }
    function ft(A2) {
      let U = H2[A2.pointerId];
      U === void 0 && (U = new Vector2(), H2[A2.pointerId] = U), U.set(A2.pageX, A2.pageY);
    }
    function At(A2) {
      const U = A2.pointerId === O[0].pointerId ? O[1] : O[0];
      return H2[U.pointerId];
    }
    r !== void 0 && this.connect(r), this.update();
  }
};
var su = class extends Loader {
  constructor(i) {
    super(i), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(r) {
      return new cu(r);
    }), this.register(function(r) {
      return new vu(r);
    }), this.register(function(r) {
      return new bu(r);
    }), this.register(function(r) {
      return new uu(r);
    }), this.register(function(r) {
      return new hu(r);
    }), this.register(function(r) {
      return new du(r);
    }), this.register(function(r) {
      return new mu(r);
    }), this.register(function(r) {
      return new lu(r);
    }), this.register(function(r) {
      return new fu(r);
    }), this.register(function(r) {
      return new pu(r);
    }), this.register(function(r) {
      return new ou(r);
    }), this.register(function(r) {
      return new gu(r);
    });
  }
  load(i, r, s, a) {
    const c = this;
    let u;
    this.resourcePath !== "" ? u = this.resourcePath : this.path !== "" ? u = this.path : u = LoaderUtils.extractUrlBase(i), this.manager.itemStart(i);
    const h2 = function(g) {
      a ? a(g) : console.error(g), c.manager.itemError(i), c.manager.itemEnd(i);
    }, d = new FileLoader(this.manager);
    d.setPath(this.path), d.setResponseType("arraybuffer"), d.setRequestHeader(this.requestHeader), d.setWithCredentials(this.withCredentials), d.load(i, function(g) {
      try {
        c.parse(g, u, function(w) {
          r(w), c.manager.itemEnd(i);
        }, h2);
      } catch (w) {
        h2(w);
      }
    }, s, h2);
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
    const u = {}, h2 = {};
    if (typeof i == "string")
      c = i;
    else if (LoaderUtils.decodeText(new Uint8Array(i, 0, 4)) === $a) {
      try {
        u[re.KHR_BINARY_GLTF] = new _u(i);
      } catch (_) {
        a && a(_);
        return;
      }
      c = u[re.KHR_BINARY_GLTF].content;
    } else
      c = LoaderUtils.decodeText(new Uint8Array(i));
    const d = JSON.parse(c);
    if (d.asset === void 0 || d.asset.version[0] < 2) {
      a && a(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const g = new Ru(d, {
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
      h2[_.name] = _, u[_.name] = true;
    }
    if (d.extensionsUsed)
      for (let w = 0; w < d.extensionsUsed.length; ++w) {
        const _ = d.extensionsUsed[w], y2 = d.extensionsRequired || [];
        switch (_) {
          case re.KHR_MATERIALS_UNLIT:
            u[_] = new au();
            break;
          case re.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
            u[_] = new xu();
            break;
          case re.KHR_DRACO_MESH_COMPRESSION:
            u[_] = new wu(d, this.dracoLoader);
            break;
          case re.KHR_TEXTURE_TRANSFORM:
            u[_] = new yu();
            break;
          case re.KHR_MESH_QUANTIZATION:
            u[_] = new Eu();
            break;
          default:
            y2.indexOf(_) >= 0 && h2[_] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + _ + '".');
        }
      }
    g.setExtensions(u), g.setPlugins(h2), g.parse(s, a);
  }
  parseAsync(i, r) {
    const s = this;
    return new Promise(function(a, c) {
      s.parse(i, r, a, c);
    });
  }
};
function ru() {
  let b2 = {};
  return {
    get: function(i) {
      return b2[i];
    },
    add: function(i, r) {
      b2[i] = r;
    },
    remove: function(i) {
      delete b2[i];
    },
    removeAll: function() {
      b2 = {};
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
var ou = class {
  constructor(i) {
    this.parser = i, this.name = re.KHR_LIGHTS_PUNCTUAL, this.cache = {
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
    const c = r.json, d = ((c.extensions && c.extensions[this.name] || {}).lights || [])[i];
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
    return g.position.set(0, 0, 0), g.decay = 2, d.intensity !== void 0 && (g.intensity = d.intensity), g.name = r.createUniqueName(d.name || "light_" + i), a = Promise.resolve(g), r.cache.add(s, a), a;
  }
  createNodeAttachment(i) {
    const r = this, s = this.parser, c = s.json.nodes[i], h2 = (c.extensions && c.extensions[this.name] || {}).light;
    return h2 === void 0 ? null : this._loadLight(h2).then(function(d) {
      return s._getNodeRef(r.cache, h2, d);
    });
  }
};
var au = class {
  constructor() {
    this.name = re.KHR_MATERIALS_UNLIT;
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
var lu = class {
  constructor(i) {
    this.parser = i, this.name = re.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(i, r) {
    const a = this.parser.json.materials[i];
    if (!a.extensions || !a.extensions[this.name])
      return Promise.resolve();
    const c = a.extensions[this.name].emissiveStrength;
    return c !== void 0 && (r.emissiveIntensity = c), Promise.resolve();
  }
};
var cu = class {
  constructor(i) {
    this.parser = i, this.name = re.KHR_MATERIALS_CLEARCOAT;
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
      const h2 = u.clearcoatNormalTexture.scale;
      r.clearcoatNormalScale = new Vector2(h2, h2);
    }
    return Promise.all(c);
  }
};
var pu = class {
  constructor(i) {
    this.parser = i, this.name = re.KHR_MATERIALS_IRIDESCENCE;
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
var uu = class {
  constructor(i) {
    this.parser = i, this.name = re.KHR_MATERIALS_SHEEN;
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
var hu = class {
  constructor(i) {
    this.parser = i, this.name = re.KHR_MATERIALS_TRANSMISSION;
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
var du = class {
  constructor(i) {
    this.parser = i, this.name = re.KHR_MATERIALS_VOLUME;
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
    const h2 = u.attenuationColor || [1, 1, 1];
    return r.attenuationColor = new Color(h2[0], h2[1], h2[2]), Promise.all(c);
  }
};
var mu = class {
  constructor(i) {
    this.parser = i, this.name = re.KHR_MATERIALS_IOR;
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
var fu = class {
  constructor(i) {
    this.parser = i, this.name = re.KHR_MATERIALS_SPECULAR;
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
    const h2 = u.specularColorFactor || [1, 1, 1];
    return r.specularColor = new Color(h2[0], h2[1], h2[2]), u.specularColorTexture !== void 0 && c.push(s.assignTexture(r, "specularColorMap", u.specularColorTexture, sRGBEncoding)), Promise.all(c);
  }
};
var vu = class {
  constructor(i) {
    this.parser = i, this.name = re.KHR_TEXTURE_BASISU;
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
var bu = class {
  constructor(i) {
    this.parser = i, this.name = re.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(i) {
    const r = this.name, s = this.parser, a = s.json, c = a.textures[i];
    if (!c.extensions || !c.extensions[r])
      return null;
    const u = c.extensions[r], h2 = a.images[u.source];
    let d = s.textureLoader;
    if (h2.uri) {
      const g = s.options.manager.getHandler(h2.uri);
      g !== null && (d = g);
    }
    return this.detectSupport().then(function(g) {
      if (g)
        return s.loadTextureImage(i, u.source, d);
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
var gu = class {
  constructor(i) {
    this.name = re.EXT_MESHOPT_COMPRESSION, this.parser = i;
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
      return c.then(function(h2) {
        const d = a.byteOffset || 0, g = a.byteLength || 0, w = a.count, _ = a.byteStride, y2 = new Uint8Array(h2, d, g);
        return u.decodeGltfBufferAsync ? u.decodeGltfBufferAsync(w, _, y2, a.mode, a.filter).then(function(C) {
          return C.buffer;
        }) : u.ready.then(function() {
          const C = new ArrayBuffer(w * _);
          return u.decodeGltfBuffer(new Uint8Array(C), w, _, y2, a.mode, a.filter), C;
        });
      });
    } else
      return null;
  }
};
var $a = "glTF";
var Gi = 12;
var aa = {
  JSON: 1313821514,
  BIN: 5130562
};
var _u = class {
  constructor(i) {
    this.name = re.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const r = new DataView(i, 0, Gi);
    if (this.header = {
      magic: LoaderUtils.decodeText(new Uint8Array(i.slice(0, 4))),
      version: r.getUint32(4, true),
      length: r.getUint32(8, true)
    }, this.header.magic !== $a)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const s = this.header.length - Gi, a = new DataView(i, Gi);
    let c = 0;
    for (; c < s; ) {
      const u = a.getUint32(c, true);
      c += 4;
      const h2 = a.getUint32(c, true);
      if (c += 4, h2 === aa.JSON) {
        const d = new Uint8Array(i, Gi + c, u);
        this.content = LoaderUtils.decodeText(d);
      } else if (h2 === aa.BIN) {
        const d = Gi + c;
        this.body = i.slice(d, d + u);
      }
      c += u;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
};
var wu = class {
  constructor(i, r) {
    if (!r)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = re.KHR_DRACO_MESH_COMPRESSION, this.json = i, this.dracoLoader = r, this.dracoLoader.preload();
  }
  decodePrimitive(i, r) {
    const s = this.json, a = this.dracoLoader, c = i.extensions[this.name].bufferView, u = i.extensions[this.name].attributes, h2 = {}, d = {}, g = {};
    for (const w in u) {
      const _ = co[w] || w.toLowerCase();
      h2[_] = u[w];
    }
    for (const w in i.attributes) {
      const _ = co[w] || w.toLowerCase();
      if (u[w] !== void 0) {
        const y2 = s.accessors[i.attributes[w]], C = Wi[y2.componentType];
        g[_] = C.name, d[_] = y2.normalized === true;
      }
    }
    return r.getDependency("bufferView", c).then(function(w) {
      return new Promise(function(_) {
        a.decodeDracoFile(w, function(y2) {
          for (const C in y2.attributes) {
            const I2 = y2.attributes[C], S2 = d[C];
            S2 !== void 0 && (I2.normalized = S2);
          }
          _(y2);
        }, h2, g);
      });
    });
  }
};
var yu = class {
  constructor() {
    this.name = re.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(i, r) {
    return r.texCoord !== void 0 && console.warn('THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.'), r.offset === void 0 && r.rotation === void 0 && r.scale === void 0 || (i = i.clone(), r.offset !== void 0 && i.offset.fromArray(r.offset), r.rotation !== void 0 && (i.rotation = r.rotation), r.scale !== void 0 && i.repeat.fromArray(r.scale), i.needsUpdate = true), i;
  }
};
var lo = class extends MeshStandardMaterial {
  constructor(i) {
    super(), this.isGLTFSpecularGlossinessMaterial = true;
    const r = ["#ifdef USE_SPECULARMAP", "	uniform sampler2D specularMap;", "#endif"].join(`
`), s = ["#ifdef USE_GLOSSINESSMAP", "	uniform sampler2D glossinessMap;", "#endif"].join(`
`), a = ["vec3 specularFactor = specular;", "#ifdef USE_SPECULARMAP", "	vec4 texelSpecular = texture2D( specularMap, vUv );", "	// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture", "	specularFactor *= texelSpecular.rgb;", "#endif"].join(`
`), c = ["float glossinessFactor = glossiness;", "#ifdef USE_GLOSSINESSMAP", "	vec4 texelGlossiness = texture2D( glossinessMap, vUv );", "	// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture", "	glossinessFactor *= texelGlossiness.a;", "#endif"].join(`
`), u = ["PhysicalMaterial material;", "material.diffuseColor = diffuseColor.rgb * ( 1. - max( specularFactor.r, max( specularFactor.g, specularFactor.b ) ) );", "vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );", "float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );", "material.roughness = max( 1.0 - glossinessFactor, 0.0525 ); // 0.0525 corresponds to the base mip of a 256 cubemap.", "material.roughness += geometryRoughness;", "material.roughness = min( material.roughness, 1.0 );", "material.specularColor = specularFactor;"].join(`
`), h2 = {
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
    this._extraUniforms = h2, this.onBeforeCompile = function(d) {
      for (const g in h2)
        d.uniforms[g] = h2[g];
      d.fragmentShader = d.fragmentShader.replace("uniform float roughness;", "uniform vec3 specular;").replace("uniform float metalness;", "uniform float glossiness;").replace("#include <roughnessmap_pars_fragment>", r).replace("#include <metalnessmap_pars_fragment>", s).replace("#include <roughnessmap_fragment>", a).replace("#include <metalnessmap_fragment>", c).replace("#include <lights_physical_fragment>", u);
    }, Object.defineProperties(this, {
      specular: {
        get: function() {
          return h2.specular.value;
        },
        set: function(d) {
          h2.specular.value = d;
        }
      },
      specularMap: {
        get: function() {
          return h2.specularMap.value;
        },
        set: function(d) {
          h2.specularMap.value = d, d ? this.defines.USE_SPECULARMAP = "" : delete this.defines.USE_SPECULARMAP;
        }
      },
      glossiness: {
        get: function() {
          return h2.glossiness.value;
        },
        set: function(d) {
          h2.glossiness.value = d;
        }
      },
      glossinessMap: {
        get: function() {
          return h2.glossinessMap.value;
        },
        set: function(d) {
          h2.glossinessMap.value = d, d ? (this.defines.USE_GLOSSINESSMAP = "", this.defines.USE_UV = "") : (delete this.defines.USE_GLOSSINESSMAP, delete this.defines.USE_UV);
        }
      }
    }), delete this.metalness, delete this.roughness, delete this.metalnessMap, delete this.roughnessMap, this.setValues(i);
  }
  copy(i) {
    return super.copy(i), this.specularMap = i.specularMap, this.specular.copy(i.specular), this.glossinessMap = i.glossinessMap, this.glossiness = i.glossiness, delete this.metalness, delete this.roughness, delete this.metalnessMap, delete this.roughnessMap, this;
  }
};
var xu = class {
  constructor() {
    this.name = re.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS, this.specularGlossinessParams = ["color", "map", "lightMap", "lightMapIntensity", "aoMap", "aoMapIntensity", "emissive", "emissiveIntensity", "emissiveMap", "bumpMap", "bumpScale", "normalMap", "normalMapType", "displacementMap", "displacementScale", "displacementBias", "specularMap", "specular", "glossinessMap", "glossiness", "alphaMap", "envMap", "envMapIntensity", "refractionRatio"];
  }
  getMaterialType() {
    return lo;
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
    const r = new lo(i);
    return r.fog = true, r.color = i.color, r.map = i.map === void 0 ? null : i.map, r.lightMap = null, r.lightMapIntensity = 1, r.aoMap = i.aoMap === void 0 ? null : i.aoMap, r.aoMapIntensity = 1, r.emissive = i.emissive, r.emissiveIntensity = i.emissiveIntensity === void 0 ? 1 : i.emissiveIntensity, r.emissiveMap = i.emissiveMap === void 0 ? null : i.emissiveMap, r.bumpMap = i.bumpMap === void 0 ? null : i.bumpMap, r.bumpScale = 1, r.normalMap = i.normalMap === void 0 ? null : i.normalMap, r.normalMapType = TangentSpaceNormalMap, i.normalScale && (r.normalScale = i.normalScale), r.displacementMap = null, r.displacementScale = 1, r.displacementBias = 0, r.specularMap = i.specularMap === void 0 ? null : i.specularMap, r.specular = i.specular, r.glossinessMap = i.glossinessMap === void 0 ? null : i.glossinessMap, r.glossiness = i.glossiness, r.alphaMap = null, r.envMap = i.envMap === void 0 ? null : i.envMap, r.envMapIntensity = 1, r.refractionRatio = 0.98, r;
  }
};
var Eu = class {
  constructor() {
    this.name = re.KHR_MESH_QUANTIZATION;
  }
};
var Xa = class extends Interpolant {
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
    const c = this.resultBuffer, u = this.sampleValues, h2 = this.valueSize, d = h2 * 2, g = h2 * 3, w = a - r, _ = (s - r) / w, y2 = _ * _, C = y2 * _, I2 = i * g, S2 = I2 - g, R2 = -2 * C + 3 * y2, j2 = C - y2, F = 1 - R2, V2 = j2 - y2 + _;
    for (let D = 0; D !== h2; D++) {
      const Y = u[S2 + D + h2], G2 = u[S2 + D + d] * w, N = u[I2 + D + h2], O = u[I2 + D] * w;
      c[D] = F * Y + V2 * G2 + R2 * N + j2 * O;
    }
    return c;
  }
};
var Cu = new Quaternion();
var Pu = class extends Xa {
  interpolate_(i, r, s, a) {
    const c = super.interpolate_(i, r, s, a);
    return Cu.fromArray(c).normalize().toArray(c), c;
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
var Wi = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
var la = {
  9728: NearestFilter,
  9729: LinearFilter,
  9984: NearestMipmapNearestFilter,
  9985: LinearMipmapNearestFilter,
  9986: NearestMipmapLinearFilter,
  9987: LinearMipmapLinearFilter
};
var ca = {
  33071: ClampToEdgeWrapping,
  33648: MirroredRepeatWrapping,
  10497: RepeatWrapping
};
var pa = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
var co = {
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
var Tu = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: InterpolateLinear,
  STEP: InterpolateDiscrete
};
var Qr = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function ku(b2) {
  return b2.DefaultMaterial === void 0 && (b2.DefaultMaterial = new MeshStandardMaterial({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: false,
    depthTest: true,
    side: FrontSide
  })), b2.DefaultMaterial;
}
function Hi(b2, i, r) {
  for (const s in r.extensions)
    b2[s] === void 0 && (i.userData.gltfExtensions = i.userData.gltfExtensions || {}, i.userData.gltfExtensions[s] = r.extensions[s]);
}
function In(b2, i) {
  i.extras !== void 0 && (typeof i.extras == "object" ? Object.assign(b2.userData, i.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + i.extras));
}
function Mu(b2, i, r) {
  let s = false, a = false, c = false;
  for (let g = 0, w = i.length; g < w; g++) {
    const _ = i[g];
    if (_.POSITION !== void 0 && (s = true), _.NORMAL !== void 0 && (a = true), _.COLOR_0 !== void 0 && (c = true), s && a && c)
      break;
  }
  if (!s && !a && !c)
    return Promise.resolve(b2);
  const u = [], h2 = [], d = [];
  for (let g = 0, w = i.length; g < w; g++) {
    const _ = i[g];
    if (s) {
      const y2 = _.POSITION !== void 0 ? r.getDependency("accessor", _.POSITION) : b2.attributes.position;
      u.push(y2);
    }
    if (a) {
      const y2 = _.NORMAL !== void 0 ? r.getDependency("accessor", _.NORMAL) : b2.attributes.normal;
      h2.push(y2);
    }
    if (c) {
      const y2 = _.COLOR_0 !== void 0 ? r.getDependency("accessor", _.COLOR_0) : b2.attributes.color;
      d.push(y2);
    }
  }
  return Promise.all([Promise.all(u), Promise.all(h2), Promise.all(d)]).then(function(g) {
    const w = g[0], _ = g[1], y2 = g[2];
    return s && (b2.morphAttributes.position = w), a && (b2.morphAttributes.normal = _), c && (b2.morphAttributes.color = y2), b2.morphTargetsRelative = true, b2;
  });
}
function Su(b2, i) {
  if (b2.updateMorphTargets(), i.weights !== void 0)
    for (let r = 0, s = i.weights.length; r < s; r++)
      b2.morphTargetInfluences[r] = i.weights[r];
  if (i.extras && Array.isArray(i.extras.targetNames)) {
    const r = i.extras.targetNames;
    if (b2.morphTargetInfluences.length === r.length) {
      b2.morphTargetDictionary = {};
      for (let s = 0, a = r.length; s < a; s++)
        b2.morphTargetDictionary[r[s]] = s;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function Au(b2) {
  const i = b2.extensions && b2.extensions[re.KHR_DRACO_MESH_COMPRESSION];
  let r;
  return i ? r = "draco:" + i.bufferView + ":" + i.indices + ":" + ua(i.attributes) : r = b2.indices + ":" + ua(b2.attributes) + ":" + b2.mode, r;
}
function ua(b2) {
  let i = "";
  const r = Object.keys(b2).sort();
  for (let s = 0, a = r.length; s < a; s++)
    i += r[s] + ":" + b2[r[s]] + ";";
  return i;
}
function po(b2) {
  switch (b2) {
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
function Lu(b2) {
  return b2.search(/\.jpe?g($|\?)/i) > 0 || b2.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : b2.search(/\.webp($|\?)/i) > 0 || b2.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
var Ru = class {
  constructor(i = {}, r = {}) {
    var s, a;
    this.json = i, this.extensions = {}, this.plugins = {}, this.options = r, this.cache = new ru(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.meshCache = {
      refs: {},
      uses: {}
    }, this.cameraCache = {
      refs: {},
      uses: {}
    }, this.lightCache = {
      refs: {},
      uses: {}
    }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    const c = typeof navigator < "u" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === true, u = typeof navigator < "u" && ((s = navigator.userAgent) === null || s === void 0 ? void 0 : s.indexOf("Firefox")) > -1, h2 = typeof navigator < "u" && u ? (a = navigator.userAgent) === null || a === void 0 ? void 0 : a.match(/Firefox\/([0-9]+)\./)[1] : -1;
    typeof createImageBitmap > "u" || c || u && h2 < 98 ? this.textureLoader = new TextureLoader(this.options.manager) : this.textureLoader = new ImageBitmapLoader(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new FileLoader(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(true);
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
      const h2 = {
        scene: u[0][a.scene || 0],
        scenes: u[0],
        animations: u[1],
        cameras: u[2],
        asset: a.asset,
        parser: s,
        userData: {}
      };
      Hi(c, h2, a), In(h2, a), Promise.all(s._invokeAll(function(d) {
        return d.afterRoot && d.afterRoot(h2);
      })).then(function() {
        i(h2);
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
      for (let h2 = 0, d = u.length; h2 < d; h2++)
        i[u[h2]].isBone = true;
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
    const a = s.clone(), c = (u, h2) => {
      const d = this.associations.get(u);
      d != null && this.associations.set(h2, d);
      for (const [g, w] of u.children.entries())
        c(w, h2.children[g]);
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
      return Promise.resolve(this.extensions[re.KHR_BINARY_GLTF].body);
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
      const h2 = u[0], d = pa[a.type], g = Wi[a.componentType], w = g.BYTES_PER_ELEMENT, _ = w * d, y2 = a.byteOffset || 0, C = a.bufferView !== void 0 ? s.bufferViews[a.bufferView].byteStride : void 0, I2 = a.normalized === true;
      let S2, R2;
      if (C && C !== _) {
        const j2 = Math.floor(y2 / C), F = "InterleavedBuffer:" + a.bufferView + ":" + a.componentType + ":" + j2 + ":" + a.count;
        let V2 = r.cache.get(F);
        V2 || (S2 = new g(h2, j2 * C, a.count * C / w), V2 = new InterleavedBuffer(S2, C / w), r.cache.add(F, V2)), R2 = new InterleavedBufferAttribute(V2, d, y2 % C / w, I2);
      } else
        h2 === null ? S2 = new g(a.count * d) : S2 = new g(h2, y2, a.count * d), R2 = new BufferAttribute(S2, d, I2);
      if (a.sparse !== void 0) {
        const j2 = pa.SCALAR, F = Wi[a.sparse.indices.componentType], V2 = a.sparse.indices.byteOffset || 0, D = a.sparse.values.byteOffset || 0, Y = new F(u[1], V2, a.sparse.count * j2), G2 = new g(u[2], D, a.sparse.count * d);
        h2 !== null && (R2 = new BufferAttribute(R2.array.slice(), R2.itemSize, R2.normalized));
        for (let N = 0, O = Y.length; N < O; N++) {
          const H2 = Y[N];
          if (R2.setX(H2, G2[N * d]), d >= 2 && R2.setY(H2, G2[N * d + 1]), d >= 3 && R2.setZ(H2, G2[N * d + 2]), d >= 4 && R2.setW(H2, G2[N * d + 3]), d >= 5)
            throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
      }
      return R2;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture>}
   */
  loadTexture(i) {
    const r = this.json, s = this.options, c = r.textures[i].source, u = r.images[c];
    let h2 = this.textureLoader;
    if (u.uri) {
      const d = s.manager.getHandler(u.uri);
      d !== null && (h2 = d);
    }
    return this.loadTextureImage(i, c, h2);
  }
  loadTextureImage(i, r, s) {
    const a = this, c = this.json, u = c.textures[i], h2 = c.images[r], d = (h2.uri || h2.bufferView) + ":" + u.sampler;
    if (this.textureCache[d])
      return this.textureCache[d];
    const g = this.loadImageSource(r, s).then(function(w) {
      w.flipY = false, u.name && (w.name = u.name);
      const y2 = (c.samplers || {})[u.sampler] || {};
      return w.magFilter = la[y2.magFilter] || LinearFilter, w.minFilter = la[y2.minFilter] || LinearMipmapLinearFilter, w.wrapS = ca[y2.wrapS] || RepeatWrapping, w.wrapT = ca[y2.wrapT] || RepeatWrapping, a.associations.set(w, {
        textures: i
      }), w;
    }).catch(function() {
      return null;
    });
    return this.textureCache[d] = g, g;
  }
  loadImageSource(i, r) {
    const s = this, a = this.json, c = this.options;
    if (this.sourceCache[i] !== void 0)
      return this.sourceCache[i].then((_) => _.clone());
    const u = a.images[i], h2 = self.URL || self.webkitURL;
    let d = u.uri || "", g = false;
    if (u.bufferView !== void 0)
      d = s.getDependency("bufferView", u.bufferView).then(function(_) {
        g = true;
        const y2 = new Blob([_], {
          type: u.mimeType
        });
        return d = h2.createObjectURL(y2), d;
      });
    else if (u.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + i + " is missing URI and bufferView");
    const w = Promise.resolve(d).then(function(_) {
      return new Promise(function(y2, C) {
        let I2 = y2;
        r.isImageBitmapLoader === true && (I2 = function(S2) {
          const R2 = new Texture(S2);
          R2.needsUpdate = true, y2(R2);
        }), r.load(LoaderUtils.resolveURL(_, c.path), I2, void 0, C);
      });
    }).then(function(_) {
      return g === true && h2.revokeObjectURL(d), _.userData.mimeType = u.mimeType || Lu(u.uri), _;
    }).catch(function(_) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", d), _;
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
      if (s.texCoord !== void 0 && s.texCoord != 0 && !(r === "aoMap" && s.texCoord == 1) && console.warn("THREE.GLTFLoader: Custom UV set " + s.texCoord + " for texture " + r + " not yet supported."), c.extensions[re.KHR_TEXTURE_TRANSFORM]) {
        const h2 = s.extensions !== void 0 ? s.extensions[re.KHR_TEXTURE_TRANSFORM] : void 0;
        if (h2) {
          const d = c.associations.get(u);
          u = c.extensions[re.KHR_TEXTURE_TRANSFORM].extendTexture(u, h2), c.associations.set(u, d);
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
      const h2 = "PointsMaterial:" + s.uuid;
      let d = this.cache.get(h2);
      d || (d = new PointsMaterial(), Material.prototype.copy.call(d, s), d.color.copy(s.color), d.map = s.map, d.sizeAttenuation = false, this.cache.add(h2, d)), s = d;
    } else if (i.isLine) {
      const h2 = "LineBasicMaterial:" + s.uuid;
      let d = this.cache.get(h2);
      d || (d = new LineBasicMaterial(), Material.prototype.copy.call(d, s), d.color.copy(s.color), this.cache.add(h2, d)), s = d;
    }
    if (a || c || u) {
      let h2 = "ClonedMaterial:" + s.uuid + ":";
      s.isGLTFSpecularGlossinessMaterial && (h2 += "specular-glossiness:"), a && (h2 += "derivative-tangents:"), c && (h2 += "vertex-colors:"), u && (h2 += "flat-shading:");
      let d = this.cache.get(h2);
      d || (d = s.clone(), c && (d.vertexColors = true), u && (d.flatShading = true), a && (d.normalScale && (d.normalScale.y *= -1), d.clearcoatNormalScale && (d.clearcoatNormalScale.y *= -1)), this.cache.add(h2, d), this.associations.set(d, this.associations.get(s))), s = d;
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
    const h2 = {}, d = c.extensions || {}, g = [];
    if (d[re.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]) {
      const _ = a[re.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];
      u = _.getMaterialType(), g.push(_.extendParams(h2, c, r));
    } else if (d[re.KHR_MATERIALS_UNLIT]) {
      const _ = a[re.KHR_MATERIALS_UNLIT];
      u = _.getMaterialType(), g.push(_.extendParams(h2, c, r));
    } else {
      const _ = c.pbrMetallicRoughness || {};
      if (h2.color = new Color(1, 1, 1), h2.opacity = 1, Array.isArray(_.baseColorFactor)) {
        const y2 = _.baseColorFactor;
        h2.color.fromArray(y2), h2.opacity = y2[3];
      }
      _.baseColorTexture !== void 0 && g.push(r.assignTexture(h2, "map", _.baseColorTexture, sRGBEncoding)), h2.metalness = _.metallicFactor !== void 0 ? _.metallicFactor : 1, h2.roughness = _.roughnessFactor !== void 0 ? _.roughnessFactor : 1, _.metallicRoughnessTexture !== void 0 && (g.push(r.assignTexture(h2, "metalnessMap", _.metallicRoughnessTexture)), g.push(r.assignTexture(h2, "roughnessMap", _.metallicRoughnessTexture))), u = this._invokeOne(function(y2) {
        return y2.getMaterialType && y2.getMaterialType(i);
      }), g.push(Promise.all(this._invokeAll(function(y2) {
        return y2.extendMaterialParams && y2.extendMaterialParams(i, h2);
      })));
    }
    c.doubleSided === true && (h2.side = DoubleSide);
    const w = c.alphaMode || Qr.OPAQUE;
    if (w === Qr.BLEND ? (h2.transparent = true, h2.depthWrite = false) : (h2.transparent = false, w === Qr.MASK && (h2.alphaTest = c.alphaCutoff !== void 0 ? c.alphaCutoff : 0.5)), c.normalTexture !== void 0 && u !== MeshBasicMaterial && (g.push(r.assignTexture(h2, "normalMap", c.normalTexture)), h2.normalScale = new Vector2(1, 1), c.normalTexture.scale !== void 0)) {
      const _ = c.normalTexture.scale;
      h2.normalScale.set(_, _);
    }
    return c.occlusionTexture !== void 0 && u !== MeshBasicMaterial && (g.push(r.assignTexture(h2, "aoMap", c.occlusionTexture)), c.occlusionTexture.strength !== void 0 && (h2.aoMapIntensity = c.occlusionTexture.strength)), c.emissiveFactor !== void 0 && u !== MeshBasicMaterial && (h2.emissive = new Color().fromArray(c.emissiveFactor)), c.emissiveTexture !== void 0 && u !== MeshBasicMaterial && g.push(r.assignTexture(h2, "emissiveMap", c.emissiveTexture, sRGBEncoding)), Promise.all(g).then(function() {
      let _;
      return u === lo ? _ = a[re.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(h2) : _ = new u(h2), c.name && (_.name = c.name), In(_, c), r.associations.set(_, {
        materials: i
      }), c.extensions && Hi(a, _, c), _;
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
    function c(h2) {
      return s[re.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(h2, r).then(function(d) {
        return ha(d, h2, r);
      });
    }
    const u = [];
    for (let h2 = 0, d = i.length; h2 < d; h2++) {
      const g = i[h2], w = Au(g), _ = a[w];
      if (_)
        u.push(_.promise);
      else {
        let y2;
        g.extensions && g.extensions[re.KHR_DRACO_MESH_COMPRESSION] ? y2 = c(g) : y2 = ha(new BufferGeometry(), g, r), a[w] = {
          primitive: g,
          promise: y2
        }, u.push(y2);
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
    const r = this, s = this.json, a = this.extensions, c = s.meshes[i], u = c.primitives, h2 = [];
    for (let d = 0, g = u.length; d < g; d++) {
      const w = u[d].material === void 0 ? ku(this.cache) : this.getDependency("material", u[d].material);
      h2.push(w);
    }
    return h2.push(r.loadGeometries(u)), Promise.all(h2).then(function(d) {
      const g = d.slice(0, d.length - 1), w = d[d.length - 1], _ = [];
      for (let C = 0, I2 = w.length; C < I2; C++) {
        const S2 = w[C], R2 = u[C];
        let j2;
        const F = g[C];
        if (R2.mode === Bt.TRIANGLES || R2.mode === Bt.TRIANGLE_STRIP || R2.mode === Bt.TRIANGLE_FAN || R2.mode === void 0)
          j2 = c.isSkinnedMesh === true ? new SkinnedMesh(S2, F) : new Mesh(S2, F), j2.isSkinnedMesh === true && !j2.geometry.attributes.skinWeight.normalized && j2.normalizeSkinWeights(), R2.mode === Bt.TRIANGLE_STRIP ? j2.geometry = da(j2.geometry, TriangleStripDrawMode) : R2.mode === Bt.TRIANGLE_FAN && (j2.geometry = da(j2.geometry, TriangleFanDrawMode));
        else if (R2.mode === Bt.LINES)
          j2 = new LineSegments(S2, F);
        else if (R2.mode === Bt.LINE_STRIP)
          j2 = new Line(S2, F);
        else if (R2.mode === Bt.LINE_LOOP)
          j2 = new LineLoop(S2, F);
        else if (R2.mode === Bt.POINTS)
          j2 = new Points(S2, F);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + R2.mode);
        Object.keys(j2.geometry.morphAttributes).length > 0 && Su(j2, c), j2.name = r.createUniqueName(c.name || "mesh_" + i), In(j2, c), R2.extensions && Hi(a, j2, R2), r.assignFinalMaterial(j2), _.push(j2);
      }
      for (let C = 0, I2 = _.length; C < I2; C++)
        r.associations.set(_[C], {
          meshes: i,
          primitives: C
        });
      if (_.length === 1)
        return _[0];
      const y2 = new Group();
      r.associations.set(y2, {
        meshes: i
      });
      for (let C = 0, I2 = _.length; C < I2; C++)
        y2.add(_[C]);
      return y2;
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
    return s.type === "perspective" ? r = new PerspectiveCamera(MathUtils.radToDeg(a.yfov), a.aspectRatio || 1, a.znear || 1, a.zfar || 2e6) : s.type === "orthographic" && (r = new OrthographicCamera(-a.xmag, a.xmag, a.ymag, -a.ymag, a.znear, a.zfar)), s.name && (r.name = this.createUniqueName(s.name)), In(r, s), Promise.resolve(r);
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
    const s = this.json.animations[i], a = [], c = [], u = [], h2 = [], d = [];
    for (let g = 0, w = s.channels.length; g < w; g++) {
      const _ = s.channels[g], y2 = s.samplers[_.sampler], C = _.target, I2 = C.node, S2 = s.parameters !== void 0 ? s.parameters[y2.input] : y2.input, R2 = s.parameters !== void 0 ? s.parameters[y2.output] : y2.output;
      a.push(this.getDependency("node", I2)), c.push(this.getDependency("accessor", S2)), u.push(this.getDependency("accessor", R2)), h2.push(y2), d.push(C);
    }
    return Promise.all([Promise.all(a), Promise.all(c), Promise.all(u), Promise.all(h2), Promise.all(d)]).then(function(g) {
      const w = g[0], _ = g[1], y2 = g[2], C = g[3], I2 = g[4], S2 = [];
      for (let j2 = 0, F = w.length; j2 < F; j2++) {
        const V2 = w[j2], D = _[j2], Y = y2[j2], G2 = C[j2], N = I2[j2];
        if (V2 === void 0)
          continue;
        V2.updateMatrix();
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
        const H2 = V2.name ? V2.name : V2.uuid, K = G2.interpolation !== void 0 ? Tu[G2.interpolation] : InterpolateLinear, q = [];
        nn[N.path] === nn.weights ? V2.traverse(function(ge) {
          ge.morphTargetInfluences && q.push(ge.name ? ge.name : ge.uuid);
        }) : q.push(H2);
        let ue2 = Y.array;
        if (Y.normalized) {
          const ge = po(ue2.constructor), ce2 = new Float32Array(ue2.length);
          for (let me2 = 0, he = ue2.length; me2 < he; me2++)
            ce2[me2] = ue2[me2] * ge;
          ue2 = ce2;
        }
        for (let ge = 0, ce2 = q.length; ge < ce2; ge++) {
          const me2 = new O(q[ge] + "." + nn[N.path], D.array, ue2, K);
          G2.interpolation === "CUBICSPLINE" && (me2.createInterpolant = function(ee2) {
            const X = this instanceof QuaternionKeyframeTrack ? Pu : Xa;
            return new X(this.times, this.values, this.getValueSize() / 3, ee2);
          }, me2.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true), S2.push(me2);
        }
      }
      const R2 = s.name ? s.name : "animation_" + i;
      return new AnimationClip(R2, void 0, S2);
    });
  }
  createNodeMesh(i) {
    const r = this.json, s = this, a = r.nodes[i];
    return a.mesh === void 0 ? null : s.getDependency("mesh", a.mesh).then(function(c) {
      const u = s._getNodeRef(s.meshCache, a.mesh, c);
      return a.weights !== void 0 && u.traverse(function(h2) {
        if (h2.isMesh)
          for (let d = 0, g = a.weights.length; d < g; d++)
            h2.morphTargetInfluences[d] = a.weights[d];
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
      const h2 = [], d = a._invokeOne(function(g) {
        return g.createNodeMesh && g.createNodeMesh(i);
      });
      return d && h2.push(d), c.camera !== void 0 && h2.push(a.getDependency("camera", c.camera).then(function(g) {
        return a._getNodeRef(a.cameraCache, c.camera, g);
      })), a._invokeAll(function(g) {
        return g.createNodeAttachment && g.createNodeAttachment(i);
      }).forEach(function(g) {
        h2.push(g);
      }), Promise.all(h2);
    }().then(function(h2) {
      let d;
      if (c.isBone === true ? d = new Bone() : h2.length > 1 ? d = new Group() : h2.length === 1 ? d = h2[0] : d = new Object3D(), d !== h2[0])
        for (let g = 0, w = h2.length; g < w; g++)
          d.add(h2[g]);
      if (c.name && (d.userData.name = c.name, d.name = u), In(d, c), c.extensions && Hi(s, d, c), c.matrix !== void 0) {
        const g = new Matrix4();
        g.fromArray(c.matrix), d.applyMatrix4(g);
      } else
        c.translation !== void 0 && d.position.fromArray(c.translation), c.rotation !== void 0 && d.quaternion.fromArray(c.rotation), c.scale !== void 0 && d.scale.fromArray(c.scale);
      return a.associations.has(d) || a.associations.set(d, {}), a.associations.get(d).nodes = i, d;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(i) {
    const r = this.json, s = this.extensions, a = this.json.scenes[i], c = this, u = new Group();
    a.name && (u.name = c.createUniqueName(a.name)), In(u, a), a.extensions && Hi(s, u, a);
    const h2 = a.nodes || [], d = [];
    for (let g = 0, w = h2.length; g < w; g++)
      d.push(Ya(h2[g], u, r, c));
    return Promise.all(d).then(function() {
      const g = (w) => {
        const _ = /* @__PURE__ */ new Map();
        for (const [y2, C] of c.associations)
          (y2 instanceof Material || y2 instanceof Texture) && _.set(y2, C);
        return w.traverse((y2) => {
          const C = c.associations.get(y2);
          C != null && _.set(y2, C);
        }), _;
      };
      return c.associations = g(u), u;
    });
  }
};
function Ya(b2, i, r, s) {
  const a = r.nodes[b2];
  return s.getDependency("node", b2).then(function(c) {
    if (a.skin === void 0)
      return c;
    let u;
    return s.getDependency("skin", a.skin).then(function(h2) {
      u = h2;
      const d = [];
      for (let g = 0, w = u.joints.length; g < w; g++)
        d.push(s.getDependency("node", u.joints[g]));
      return Promise.all(d);
    }).then(function(h2) {
      return c.traverse(function(d) {
        if (!d.isMesh)
          return;
        const g = [], w = [];
        for (let _ = 0, y2 = h2.length; _ < y2; _++) {
          const C = h2[_];
          if (C) {
            g.push(C);
            const I2 = new Matrix4();
            u.inverseBindMatrices !== void 0 && I2.fromArray(u.inverseBindMatrices.array, _ * 16), w.push(I2);
          } else
            console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', u.joints[_]);
        }
        d.bind(new Skeleton(g, w), d.matrixWorld);
      }), c;
    });
  }).then(function(c) {
    i.add(c);
    const u = [];
    if (a.children) {
      const h2 = a.children;
      for (let d = 0, g = h2.length; d < g; d++) {
        const w = h2[d];
        u.push(Ya(w, c, r, s));
      }
    }
    return Promise.all(u);
  });
}
function Iu(b2, i, r) {
  const s = i.attributes, a = new Box3();
  if (s.POSITION !== void 0) {
    const h2 = r.json.accessors[s.POSITION], d = h2.min, g = h2.max;
    if (d !== void 0 && g !== void 0) {
      if (a.set(new Vector3(d[0], d[1], d[2]), new Vector3(g[0], g[1], g[2])), h2.normalized) {
        const w = po(Wi[h2.componentType]);
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
    const h2 = new Vector3(), d = new Vector3();
    for (let g = 0, w = c.length; g < w; g++) {
      const _ = c[g];
      if (_.POSITION !== void 0) {
        const y2 = r.json.accessors[_.POSITION], C = y2.min, I2 = y2.max;
        if (C !== void 0 && I2 !== void 0) {
          if (d.setX(Math.max(Math.abs(C[0]), Math.abs(I2[0]))), d.setY(Math.max(Math.abs(C[1]), Math.abs(I2[1]))), d.setZ(Math.max(Math.abs(C[2]), Math.abs(I2[2]))), y2.normalized) {
            const S2 = po(Wi[y2.componentType]);
            d.multiplyScalar(S2);
          }
          h2.max(d);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    a.expandByVector(h2);
  }
  b2.boundingBox = a;
  const u = new Sphere();
  a.getCenter(u.center), u.radius = a.min.distanceTo(a.max) / 2, b2.boundingSphere = u;
}
function ha(b2, i, r) {
  const s = i.attributes, a = [];
  function c(u, h2) {
    return r.getDependency("accessor", u).then(function(d) {
      b2.setAttribute(h2, d);
    });
  }
  for (const u in s) {
    const h2 = co[u] || u.toLowerCase();
    h2 in b2.attributes || a.push(c(s[u], h2));
  }
  if (i.indices !== void 0 && !b2.index) {
    const u = r.getDependency("accessor", i.indices).then(function(h2) {
      b2.setIndex(h2);
    });
    a.push(u);
  }
  return In(b2, i), Iu(b2, i, r), Promise.all(a).then(function() {
    return i.targets !== void 0 ? Mu(b2, i.targets, r) : b2;
  });
}
function da(b2, i) {
  let r = b2.getIndex();
  if (r === null) {
    const u = [], h2 = b2.getAttribute("position");
    if (h2 !== void 0) {
      for (let d = 0; d < h2.count; d++)
        u.push(d);
      b2.setIndex(u), r = b2.getIndex();
    } else
      return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), b2;
  }
  const s = r.count - 2, a = [];
  if (i === TriangleFanDrawMode)
    for (let u = 1; u <= s; u++)
      a.push(r.getX(0)), a.push(r.getX(u)), a.push(r.getX(u + 1));
  else
    for (let u = 0; u < s; u++)
      u % 2 === 0 ? (a.push(r.getX(u)), a.push(r.getX(u + 1)), a.push(r.getX(u + 2))) : (a.push(r.getX(u + 2)), a.push(r.getX(u + 1)), a.push(r.getX(u)));
  a.length / 3 !== s && console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
  const c = b2.clone();
  return c.setIndex(a), c;
}
var Vu = class extends ExtrudeGeometry {
  constructor(i, r = {}) {
    const {
      bevelEnabled: s = false,
      bevelSize: a = 8,
      bevelThickness: c = 10,
      font: u,
      height: h2 = 50,
      size: d = 100,
      lineHeight: g = 1,
      letterSpacing: w = 0,
      ..._
    } = r;
    if (u === void 0)
      super();
    else {
      const y2 = u.generateShapes(i, d, {
        lineHeight: g,
        letterSpacing: w
      });
      super(y2, {
        ..._,
        bevelEnabled: s,
        bevelSize: a,
        bevelThickness: c,
        depth: h2
      });
    }
    this.type = "TextGeometry";
  }
};
function qa(b2, i, r) {
  const s = r.length - b2 - 1;
  if (i >= r[s])
    return s - 1;
  if (i <= r[b2])
    return b2;
  let a = b2, c = s, u = Math.floor((a + c) / 2);
  for (; i < r[u] || i >= r[u + 1]; )
    i < r[u] ? c = u : a = u, u = Math.floor((a + c) / 2);
  return u;
}
function Du(b2, i, r, s) {
  const a = [], c = [], u = [];
  a[0] = 1;
  for (let h2 = 1; h2 <= r; ++h2) {
    c[h2] = i - s[b2 + 1 - h2], u[h2] = s[b2 + h2] - i;
    let d = 0;
    for (let g = 0; g < h2; ++g) {
      const w = u[g + 1], _ = c[h2 - g], y2 = a[g] / (w + _);
      a[g] = d + w * y2, d = _ * y2;
    }
    a[h2] = d;
  }
  return a;
}
function Ou(b2, i, r, s) {
  const a = qa(b2, s, i), c = Du(a, s, b2, i), u = new Vector4(0, 0, 0, 0);
  for (let h2 = 0; h2 <= b2; ++h2) {
    const d = r[a - b2 + h2], g = c[h2], w = d.w * g;
    u.x += d.x * w, u.y += d.y * w, u.z += d.z * w, u.w += d.w * g;
  }
  return u;
}
function Nu(b2, i, r, s, a) {
  const c = [];
  for (let y2 = 0; y2 <= r; ++y2)
    c[y2] = 0;
  const u = [];
  for (let y2 = 0; y2 <= s; ++y2)
    u[y2] = c.slice(0);
  const h2 = [];
  for (let y2 = 0; y2 <= r; ++y2)
    h2[y2] = c.slice(0);
  h2[0][0] = 1;
  const d = c.slice(0), g = c.slice(0);
  for (let y2 = 1; y2 <= r; ++y2) {
    d[y2] = i - a[b2 + 1 - y2], g[y2] = a[b2 + y2] - i;
    let C = 0;
    for (let I2 = 0; I2 < y2; ++I2) {
      const S2 = g[I2 + 1], R2 = d[y2 - I2];
      h2[y2][I2] = S2 + R2;
      const j2 = h2[I2][y2 - 1] / h2[y2][I2];
      h2[I2][y2] = C + S2 * j2, C = R2 * j2;
    }
    h2[y2][y2] = C;
  }
  for (let y2 = 0; y2 <= r; ++y2)
    u[0][y2] = h2[y2][r];
  for (let y2 = 0; y2 <= r; ++y2) {
    let C = 0, I2 = 1;
    const S2 = [];
    for (let R2 = 0; R2 <= r; ++R2)
      S2[R2] = c.slice(0);
    S2[0][0] = 1;
    for (let R2 = 1; R2 <= s; ++R2) {
      let j2 = 0;
      const F = y2 - R2, V2 = r - R2;
      y2 >= R2 && (S2[I2][0] = S2[C][0] / h2[V2 + 1][F], j2 = S2[I2][0] * h2[F][V2]);
      const D = F >= -1 ? 1 : -F, Y = y2 - 1 <= V2 ? R2 - 1 : r - y2;
      for (let G2 = D; G2 <= Y; ++G2)
        S2[I2][G2] = (S2[C][G2] - S2[C][G2 - 1]) / h2[V2 + 1][F + G2], j2 += S2[I2][G2] * h2[F + G2][V2];
      y2 <= V2 && (S2[I2][R2] = -S2[C][R2 - 1] / h2[V2 + 1][y2], j2 += S2[I2][R2] * h2[y2][V2]), u[R2][y2] = j2;
      var w = C;
      C = I2, I2 = w;
    }
  }
  var _ = r;
  for (let y2 = 1; y2 <= s; ++y2) {
    for (let C = 0; C <= r; ++C)
      u[y2][C] *= _;
    _ *= r - y2;
  }
  return u;
}
function Fu(b2, i, r, s, a) {
  const c = a < b2 ? a : b2, u = [], h2 = qa(b2, s, i), d = Nu(h2, s, b2, c, i), g = [];
  for (let _ = 0; _ < r.length; ++_) {
    var w = r[_].clone();
    const y2 = w.w;
    w.x *= y2, w.y *= y2, w.z *= y2, g[_] = w;
  }
  for (let _ = 0; _ <= c; ++_) {
    var w = g[h2 - b2].clone().multiplyScalar(d[_][0]);
    for (let C = 1; C <= b2; ++C)
      w.add(g[h2 - b2 + C].clone().multiplyScalar(d[_][C]));
    u[_] = w;
  }
  for (let _ = c + 1; _ <= a + 1; ++_)
    u[_] = new Vector4(0, 0, 0);
  return u;
}
function Bu(b2, i) {
  let r = 1;
  for (let a = 2; a <= b2; ++a)
    r *= a;
  let s = 1;
  for (let a = 2; a <= i; ++a)
    s *= a;
  for (let a = 2; a <= b2 - i; ++a)
    s *= a;
  return r / s;
}
function ju(b2) {
  const i = b2.length, r = [], s = [];
  for (let c = 0; c < i; ++c) {
    const u = b2[c];
    r[c] = new Vector3(u.x, u.y, u.z), s[c] = u.w;
  }
  const a = [];
  for (let c = 0; c < i; ++c) {
    const u = r[c].clone();
    for (let h2 = 1; h2 <= c; ++h2)
      u.sub(a[c - h2].clone().multiplyScalar(Bu(c, h2) * s[h2]));
    a[c] = u.divideScalar(s[0]);
  }
  return a;
}
function zu(b2, i, r, s, a) {
  const c = Fu(b2, i, r, s, a);
  return ju(c);
}
var ma = class extends Curve {
  constructor(i, r, s, a, c) {
    super(), this.degree = i, this.knots = r, this.controlPoints = [], this.startKnot = a || 0, this.endKnot = c || this.knots.length - 1;
    for (let u = 0; u < s.length; ++u) {
      const h2 = s[u];
      this.controlPoints[u] = new Vector4(h2.x, h2.y, h2.z, h2.w);
    }
  }
  getPoint(i, r) {
    const s = r || new Vector3(), a = this.knots[this.startKnot] + i * (this.knots[this.endKnot] - this.knots[this.startKnot]), c = Ou(this.degree, this.knots, this.controlPoints, a);
    return c.w != 1 && c.divideScalar(c.w), s.set(c.x, c.y, c.z);
  }
  getTangent(i, r) {
    const s = r || new Vector3(), a = this.knots[0] + i * (this.knots[this.knots.length - 1] - this.knots[0]), c = zu(this.degree, this.knots, this.controlPoints, a, 1);
    return s.copy(c[1]).normalize(), s;
  }
};
var se2;
var Ae;
var We;
var Uu = class extends Loader {
  constructor(i) {
    super(i);
  }
  load(i, r, s, a) {
    const c = this, u = c.path === "" ? LoaderUtils.extractUrlBase(i) : c.path, h2 = new FileLoader(this.manager);
    h2.setPath(c.path), h2.setResponseType("arraybuffer"), h2.setRequestHeader(c.requestHeader), h2.setWithCredentials(c.withCredentials), h2.load(i, function(d) {
      try {
        r(c.parse(d, u));
      } catch (g) {
        a ? a(g) : console.error(g), c.manager.itemError(i);
      }
    }, s, a);
  }
  parse(i, r) {
    if (Yu(i))
      se2 = new Xu().parse(i);
    else {
      const a = Ja(i);
      if (!qu(a))
        throw new Error("THREE.FBXLoader: Unknown format.");
      if (va(a) < 7e3)
        throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + va(a));
      se2 = new $u().parse(a);
    }
    const s = new TextureLoader(this.manager).setPath(this.resourcePath || r).setCrossOrigin(this.crossOrigin);
    return new Gu(s, this.manager).parse(se2);
  }
};
var Gu = class {
  constructor(i, r) {
    this.textureLoader = i, this.manager = r;
  }
  parse() {
    Ae = this.parseConnections();
    const i = this.parseImages(), r = this.parseTextures(i), s = this.parseMaterials(r), a = this.parseDeformers(), c = new Hu().parse(a);
    return this.parseScene(a, c, s), We;
  }
  // Parses FBXTree.Connections which holds parent-child connections between objects (e.g. material -> texture, model->geometry )
  // and details the connection type
  parseConnections() {
    const i = /* @__PURE__ */ new Map();
    return "Connections" in se2 && se2.Connections.connections.forEach(function(s) {
      const a = s[0], c = s[1], u = s[2];
      i.has(a) || i.set(a, {
        parents: [],
        children: []
      });
      const h2 = {
        ID: c,
        relationship: u
      };
      i.get(a).parents.push(h2), i.has(c) || i.set(c, {
        parents: [],
        children: []
      });
      const d = {
        ID: a,
        relationship: u
      };
      i.get(c).children.push(d);
    }), i;
  }
  // Parse FBXTree.Objects.Video for embedded image data
  // These images are connected to textures in FBXTree.Objects.Textures
  // via FBXTree.Connections.
  parseImages() {
    const i = {}, r = {};
    if ("Video" in se2.Objects) {
      const s = se2.Objects.Video;
      for (const a in s) {
        const c = s[a], u = parseInt(a);
        if (i[u] = c.RelativeFilename || c.Filename, "Content" in c) {
          const h2 = c.Content instanceof ArrayBuffer && c.Content.byteLength > 0, d = typeof c.Content == "string" && c.Content !== "";
          if (h2 || d) {
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
    if ("Texture" in se2.Objects) {
      const s = se2.Objects.Texture;
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
    const a = i.WrapModeU, c = i.WrapModeV, u = a !== void 0 ? a.value : 0, h2 = c !== void 0 ? c.value : 0;
    if (s.wrapS = u === 0 ? RepeatWrapping : ClampToEdgeWrapping, s.wrapT = h2 === 0 ? RepeatWrapping : ClampToEdgeWrapping, "Scaling" in i) {
      const d = i.Scaling.value;
      s.repeat.x = d[0], s.repeat.y = d[1];
    }
    return s;
  }
  // load a texture specified as a blob or data URI, or via an external URL using TextureLoader
  loadTexture(i, r) {
    let s;
    const a = this.textureLoader.path, c = Ae.get(i.id).children;
    c !== void 0 && c.length > 0 && r[c[0].ID] !== void 0 && (s = r[c[0].ID], (s.indexOf("blob:") === 0 || s.indexOf("data:") === 0) && this.textureLoader.setPath(void 0));
    let u;
    const h2 = i.FileName.slice(-3).toLowerCase();
    if (h2 === "tga") {
      const d = this.manager.getHandler(".tga");
      d === null ? (console.warn("FBXLoader: TGA loader not found, creating placeholder texture for", i.RelativeFilename), u = new Texture()) : (d.setPath(this.textureLoader.path), u = d.load(s));
    } else
      h2 === "psd" ? (console.warn("FBXLoader: PSD textures are not supported, creating placeholder texture for", i.RelativeFilename), u = new Texture()) : u = this.textureLoader.load(s);
    return this.textureLoader.setPath(a), u;
  }
  // Parse nodes in FBXTree.Objects.Material
  parseMaterials(i) {
    const r = /* @__PURE__ */ new Map();
    if ("Material" in se2.Objects) {
      const s = se2.Objects.Material;
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
    if (typeof c == "object" && (c = c.value), !Ae.has(s))
      return null;
    const u = this.parseParameters(i, r, s);
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
    return h2.setValues(u), h2.name = a, h2;
  }
  // Parse FBX material and return parameters suitable for a three.js material
  // Also parse the texture map and return any textures associated with the material
  parseParameters(i, r, s) {
    const a = {};
    i.BumpFactor && (a.bumpScale = i.BumpFactor.value), i.Diffuse ? a.color = new Color().fromArray(i.Diffuse.value) : i.DiffuseColor && (i.DiffuseColor.type === "Color" || i.DiffuseColor.type === "ColorRGB") && (a.color = new Color().fromArray(i.DiffuseColor.value)), i.DisplacementFactor && (a.displacementScale = i.DisplacementFactor.value), i.Emissive ? a.emissive = new Color().fromArray(i.Emissive.value) : i.EmissiveColor && (i.EmissiveColor.type === "Color" || i.EmissiveColor.type === "ColorRGB") && (a.emissive = new Color().fromArray(i.EmissiveColor.value)), i.EmissiveFactor && (a.emissiveIntensity = parseFloat(i.EmissiveFactor.value)), i.Opacity && (a.opacity = parseFloat(i.Opacity.value)), a.opacity < 1 && (a.transparent = true), i.ReflectionFactor && (a.reflectivity = i.ReflectionFactor.value), i.Shininess && (a.shininess = i.Shininess.value), i.Specular ? a.specular = new Color().fromArray(i.Specular.value) : i.SpecularColor && i.SpecularColor.type === "Color" && (a.specular = new Color().fromArray(i.SpecularColor.value));
    const c = this;
    return Ae.get(s).children.forEach(function(u) {
      const h2 = u.relationship;
      switch (h2) {
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
          console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.", h2);
          break;
      }
    }), a;
  }
  // get a texture from the textureMap for use by a material.
  getTexture(i, r) {
    return "LayeredTexture" in se2.Objects && r in se2.Objects.LayeredTexture && (console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."), r = Ae.get(r).children[0].ID), i.get(r);
  }
  // Parse nodes in FBXTree.Objects.Deformer
  // Deformer node can contain skinning or Vertex Cache animation data, however only skinning is supported here
  // Generates map of Skeleton-like objects for use later when generating and binding skeletons.
  parseDeformers() {
    const i = {}, r = {};
    if ("Deformer" in se2.Objects) {
      const s = se2.Objects.Deformer;
      for (const a in s) {
        const c = s[a], u = Ae.get(parseInt(a));
        if (c.attrType === "Skin") {
          const h2 = this.parseSkeleton(u, s);
          h2.ID = a, u.parents.length > 1 && console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."), h2.geometryID = u.parents[0].ID, i[a] = h2;
        } else if (c.attrType === "BlendShape") {
          const h2 = {
            id: a
          };
          h2.rawTargets = this.parseMorphTargets(u, s), h2.id = a, u.parents.length > 1 && console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."), r[a] = h2;
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
      const c = i.children[a], u = r[c.ID], h2 = {
        name: u.attrName,
        initialWeight: u.DeformPercent,
        id: u.id,
        fullWeights: u.FullWeights.a
      };
      if (u.attrType !== "BlendShapeChannel")
        return;
      h2.geoID = Ae.get(parseInt(c.ID)).children.filter(function(d) {
        return d.relationship === void 0;
      })[0].ID, s.push(h2);
    }
    return s;
  }
  // create the main Group() to be returned by the loader
  parseScene(i, r, s) {
    We = new Group();
    const a = this.parseModels(i.skeletons, r, s), c = se2.Objects.Model, u = this;
    a.forEach(function(d) {
      const g = c[d.ID];
      u.setLookAtProperties(d, g), Ae.get(d.ID).parents.forEach(function(_) {
        const y2 = a.get(_.ID);
        y2 !== void 0 && y2.add(d);
      }), d.parent === null && We.add(d);
    }), this.bindSkeleton(i.skeletons, r, a), this.createAmbientLight(), We.traverse(function(d) {
      if (d.userData.transformData) {
        d.parent && (d.userData.transformData.parentMatrix = d.parent.matrix, d.userData.transformData.parentMatrixWorld = d.parent.matrixWorld);
        const g = Za(d.userData.transformData);
        d.applyMatrix4(g), d.updateWorldMatrix();
      }
    });
    const h2 = new Ku().parse();
    We.children.length === 1 && We.children[0].isGroup && (We.children[0].animations = h2, We = We.children[0]), We.animations = h2;
  }
  // parse nodes in FBXTree.Objects.Model
  parseModels(i, r, s) {
    const a = /* @__PURE__ */ new Map(), c = se2.Objects.Model;
    for (const u in c) {
      const h2 = parseInt(u), d = c[u], g = Ae.get(h2);
      let w = this.buildSkeleton(g, i, h2, d.attrName);
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
        w.name = d.attrName ? PropertyBinding.sanitizeNodeName(d.attrName) : "", w.ID = h2;
      }
      this.getTransformData(w, d), a.set(h2, w);
    }
    return a;
  }
  buildSkeleton(i, r, s, a) {
    let c = null;
    return i.parents.forEach(function(u) {
      for (const h2 in r) {
        const d = r[h2];
        d.rawBones.forEach(function(g, w) {
          if (g.ID === u.ID) {
            const _ = c;
            c = new Bone(), c.matrixWorld.copy(g.transformLink), c.name = a ? PropertyBinding.sanitizeNodeName(a) : "", c.ID = s, d.bones[w] = c, _ !== null && c.add(_);
          }
        });
      }
    }), c;
  }
  // create a PerspectiveCamera or OrthographicCamera
  createCamera(i) {
    let r, s;
    if (i.children.forEach(function(a) {
      const c = se2.Objects.NodeAttribute[a.ID];
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
      let h2 = window.innerWidth, d = window.innerHeight;
      s.AspectWidth !== void 0 && s.AspectHeight !== void 0 && (h2 = s.AspectWidth.value, d = s.AspectHeight.value);
      const g = h2 / d;
      let w = 45;
      s.FieldOfView !== void 0 && (w = s.FieldOfView.value);
      const _ = s.FocalLength ? s.FocalLength.value : null;
      switch (a) {
        case 0:
          r = new PerspectiveCamera(w, g, c, u), _ !== null && r.setFocalLength(_);
          break;
        case 1:
          r = new OrthographicCamera(-h2 / 2, h2 / 2, d / 2, -d / 2, c, u);
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
      const c = se2.Objects.NodeAttribute[a.ID];
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
      let h2 = 0;
      s.FarAttenuationEnd !== void 0 && (s.EnableFarAttenuation !== void 0 && s.EnableFarAttenuation.value === 0 ? h2 = 0 : h2 = s.FarAttenuationEnd.value);
      const d = 1;
      switch (a) {
        case 0:
          r = new PointLight(c, u, h2, d);
          break;
        case 1:
          r = new DirectionalLight(c, u);
          break;
        case 2:
          let g = Math.PI / 3;
          s.InnerAngle !== void 0 && (g = MathUtils.degToRad(s.InnerAngle.value));
          let w = 0;
          s.OuterAngle !== void 0 && (w = MathUtils.degToRad(s.OuterAngle.value), w = Math.max(w, 1)), r = new SpotLight(c, u, h2, g, w, d);
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
    const h2 = [];
    return i.children.forEach(function(d) {
      r.has(d.ID) && (c = r.get(d.ID)), s.has(d.ID) && h2.push(s.get(d.ID));
    }), h2.length > 1 ? u = h2 : h2.length > 0 ? u = h2[0] : (u = new MeshPhongMaterial({
      color: 13421772
    }), h2.push(u)), "color" in c.attributes && h2.forEach(function(d) {
      d.vertexColors = true;
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
    "InheritType" in r && (s.inheritType = parseInt(r.InheritType.value)), "RotationOrder" in r ? s.eulerOrder = Wa(r.RotationOrder.value) : s.eulerOrder = "ZYX", "Lcl_Translation" in r && (s.translation = r.Lcl_Translation.value), "PreRotation" in r && (s.preRotation = r.PreRotation.value), "Lcl_Rotation" in r && (s.rotation = r.Lcl_Rotation.value), "PostRotation" in r && (s.postRotation = r.PostRotation.value), "Lcl_Scaling" in r && (s.scale = r.Lcl_Scaling.value), "ScalingOffset" in r && (s.scalingOffset = r.ScalingOffset.value), "ScalingPivot" in r && (s.scalingPivot = r.ScalingPivot.value), "RotationOffset" in r && (s.rotationOffset = r.RotationOffset.value), "RotationPivot" in r && (s.rotationPivot = r.RotationPivot.value), i.userData.transformData = s;
  }
  setLookAtProperties(i, r) {
    "LookAtProperty" in r && Ae.get(i.ID).children.forEach(function(a) {
      if (a.relationship === "LookAtProperty") {
        const c = se2.Objects.Model[a.ID];
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
      Ae.get(parseInt(u.ID)).parents.forEach(function(d) {
        if (r.has(d.ID)) {
          const g = d.ID;
          Ae.get(g).parents.forEach(function(_) {
            s.has(_.ID) && s.get(_.ID).bind(new Skeleton(u.bones), a[_.ID]);
          });
        }
      });
    }
  }
  parsePoseNodes() {
    const i = {};
    if ("Pose" in se2.Objects) {
      const r = se2.Objects.Pose;
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
    if ("GlobalSettings" in se2 && "AmbientColor" in se2.GlobalSettings) {
      const i = se2.GlobalSettings.AmbientColor.value, r = i[0], s = i[1], a = i[2];
      if (r !== 0 || s !== 0 || a !== 0) {
        const c = new Color(r, s, a);
        We.add(new AmbientLight(c, 1));
      }
    }
  }
};
var Hu = class {
  // Parse nodes in FBXTree.Objects.Geometry
  parse(i) {
    const r = /* @__PURE__ */ new Map();
    if ("Geometry" in se2.Objects) {
      const s = se2.Objects.Geometry;
      for (const a in s) {
        const c = Ae.get(parseInt(a)), u = this.parseGeometry(c, s[a], i);
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
      return se2.Objects.Model[_.ID];
    });
    if (u.length === 0)
      return;
    const h2 = i.children.reduce(function(_, y2) {
      return a[y2.ID] !== void 0 && (_ = a[y2.ID]), _;
    }, null);
    i.children.forEach(function(_) {
      s.morphTargets[_.ID] !== void 0 && c.push(s.morphTargets[_.ID]);
    });
    const d = u[0], g = {};
    "RotationOrder" in d && (g.eulerOrder = Wa(d.RotationOrder.value)), "InheritType" in d && (g.inheritType = parseInt(d.InheritType.value)), "GeometricTranslation" in d && (g.translation = d.GeometricTranslation.value), "GeometricRotation" in d && (g.rotation = d.GeometricRotation.value), "GeometricScaling" in d && (g.scale = d.GeometricScaling.value);
    const w = Za(g);
    return this.genGeometry(r, h2, c, w);
  }
  // Generate a BufferGeometry from a node in FBXTree.Objects.Geometry
  genGeometry(i, r, s, a) {
    const c = new BufferGeometry();
    i.attrName && (c.name = i.attrName);
    const u = this.parseGeoNode(i, r), h2 = this.genBuffers(u), d = new Float32BufferAttribute(h2.vertex, 3);
    if (d.applyMatrix4(a), c.setAttribute("position", d), h2.colors.length > 0 && c.setAttribute("color", new Float32BufferAttribute(h2.colors, 3)), r && (c.setAttribute("skinIndex", new Uint16BufferAttribute(h2.weightsIndices, 4)), c.setAttribute("skinWeight", new Float32BufferAttribute(h2.vertexWeights, 4)), c.FBX_Deformer = r), h2.normal.length > 0) {
      const g = new Matrix3().getNormalMatrix(a), w = new Float32BufferAttribute(h2.normal, 3);
      w.applyNormalMatrix(g), c.setAttribute("normal", w);
    }
    if (h2.uvs.forEach(function(g, w) {
      let _ = "uv" + (w + 1).toString();
      w === 0 && (_ = "uv"), c.setAttribute(_, new Float32BufferAttribute(h2.uvs[w], 2));
    }), u.material && u.material.mappingType !== "AllSame") {
      let g = h2.materialIndex[0], w = 0;
      if (h2.materialIndex.forEach(function(_, y2) {
        _ !== g && (c.addGroup(w, y2 - w, g), g = _, w = y2);
      }), c.groups.length > 0) {
        const _ = c.groups[c.groups.length - 1], y2 = _.start + _.count;
        y2 !== h2.materialIndex.length && c.addGroup(y2, h2.materialIndex.length - y2, g);
      }
      c.groups.length === 0 && c.addGroup(0, h2.materialIndex.length, h2.materialIndex[0]);
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
      a.indices.forEach(function(u, h2) {
        s.weightTable[u] === void 0 && (s.weightTable[u] = []), s.weightTable[u].push({
          id: c,
          weight: a.weights[h2]
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
    let s = 0, a = 0, c = false, u = [], h2 = [], d = [], g = [], w = [], _ = [];
    const y2 = this;
    return i.vertexIndices.forEach(function(C, I2) {
      let S2, R2 = false;
      C < 0 && (C = C ^ -1, R2 = true);
      let j2 = [], F = [];
      if (u.push(C * 3, C * 3 + 1, C * 3 + 2), i.color) {
        const V2 = Vs(I2, s, C, i.color);
        d.push(V2[0], V2[1], V2[2]);
      }
      if (i.skeleton) {
        if (i.weightTable[C] !== void 0 && i.weightTable[C].forEach(function(V2) {
          F.push(V2.weight), j2.push(V2.id);
        }), F.length > 4) {
          c || (console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."), c = true);
          const V2 = [0, 0, 0, 0], D = [0, 0, 0, 0];
          F.forEach(function(Y, G2) {
            let N = Y, O = j2[G2];
            D.forEach(function(H2, K, q) {
              if (N > H2) {
                q[K] = N, N = H2;
                const ue2 = V2[K];
                V2[K] = O, O = ue2;
              }
            });
          }), j2 = V2, F = D;
        }
        for (; F.length < 4; )
          F.push(0), j2.push(0);
        for (let V2 = 0; V2 < 4; ++V2)
          w.push(F[V2]), _.push(j2[V2]);
      }
      if (i.normal) {
        const V2 = Vs(I2, s, C, i.normal);
        h2.push(V2[0], V2[1], V2[2]);
      }
      i.material && i.material.mappingType !== "AllSame" && (S2 = Vs(I2, s, C, i.material)[0]), i.uv && i.uv.forEach(function(V2, D) {
        const Y = Vs(I2, s, C, V2);
        g[D] === void 0 && (g[D] = []), g[D].push(Y[0]), g[D].push(Y[1]);
      }), a++, R2 && (y2.genFace(r, i, u, S2, h2, d, g, w, _, a), s++, a = 0, u = [], h2 = [], d = [], g = [], w = [], _ = []);
    }), r;
  }
  // Generate data for a single face in a geometry. If the face is a quad then split it into 2 tris
  genFace(i, r, s, a, c, u, h2, d, g, w) {
    for (let _ = 2; _ < w; _++)
      i.vertex.push(r.vertexPositions[s[0]]), i.vertex.push(r.vertexPositions[s[1]]), i.vertex.push(r.vertexPositions[s[2]]), i.vertex.push(r.vertexPositions[s[(_ - 1) * 3]]), i.vertex.push(r.vertexPositions[s[(_ - 1) * 3 + 1]]), i.vertex.push(r.vertexPositions[s[(_ - 1) * 3 + 2]]), i.vertex.push(r.vertexPositions[s[_ * 3]]), i.vertex.push(r.vertexPositions[s[_ * 3 + 1]]), i.vertex.push(r.vertexPositions[s[_ * 3 + 2]]), r.skeleton && (i.vertexWeights.push(d[0]), i.vertexWeights.push(d[1]), i.vertexWeights.push(d[2]), i.vertexWeights.push(d[3]), i.vertexWeights.push(d[(_ - 1) * 4]), i.vertexWeights.push(d[(_ - 1) * 4 + 1]), i.vertexWeights.push(d[(_ - 1) * 4 + 2]), i.vertexWeights.push(d[(_ - 1) * 4 + 3]), i.vertexWeights.push(d[_ * 4]), i.vertexWeights.push(d[_ * 4 + 1]), i.vertexWeights.push(d[_ * 4 + 2]), i.vertexWeights.push(d[_ * 4 + 3]), i.weightsIndices.push(g[0]), i.weightsIndices.push(g[1]), i.weightsIndices.push(g[2]), i.weightsIndices.push(g[3]), i.weightsIndices.push(g[(_ - 1) * 4]), i.weightsIndices.push(g[(_ - 1) * 4 + 1]), i.weightsIndices.push(g[(_ - 1) * 4 + 2]), i.weightsIndices.push(g[(_ - 1) * 4 + 3]), i.weightsIndices.push(g[_ * 4]), i.weightsIndices.push(g[_ * 4 + 1]), i.weightsIndices.push(g[_ * 4 + 2]), i.weightsIndices.push(g[_ * 4 + 3])), r.color && (i.colors.push(u[0]), i.colors.push(u[1]), i.colors.push(u[2]), i.colors.push(u[(_ - 1) * 3]), i.colors.push(u[(_ - 1) * 3 + 1]), i.colors.push(u[(_ - 1) * 3 + 2]), i.colors.push(u[_ * 3]), i.colors.push(u[_ * 3 + 1]), i.colors.push(u[_ * 3 + 2])), r.material && r.material.mappingType !== "AllSame" && (i.materialIndex.push(a), i.materialIndex.push(a), i.materialIndex.push(a)), r.normal && (i.normal.push(c[0]), i.normal.push(c[1]), i.normal.push(c[2]), i.normal.push(c[(_ - 1) * 3]), i.normal.push(c[(_ - 1) * 3 + 1]), i.normal.push(c[(_ - 1) * 3 + 2]), i.normal.push(c[_ * 3]), i.normal.push(c[_ * 3 + 1]), i.normal.push(c[_ * 3 + 2])), r.uv && r.uv.forEach(function(y2, C) {
        i.uvs[C] === void 0 && (i.uvs[C] = []), i.uvs[C].push(h2[C][0]), i.uvs[C].push(h2[C][1]), i.uvs[C].push(h2[C][(_ - 1) * 2]), i.uvs[C].push(h2[C][(_ - 1) * 2 + 1]), i.uvs[C].push(h2[C][_ * 2]), i.uvs[C].push(h2[C][_ * 2 + 1]);
      });
  }
  addMorphTargets(i, r, s, a) {
    if (s.length === 0)
      return;
    i.morphTargetsRelative = true, i.morphAttributes.position = [];
    const c = this;
    s.forEach(function(u) {
      u.rawTargets.forEach(function(h2) {
        const d = se2.Objects.Geometry[h2.geoID];
        d !== void 0 && c.genMorphGeometry(i, r, d, a, h2.name);
      });
    });
  }
  // a morph geometry node is similar to a standard  node, and the node is also contained
  // in FBXTree.Objects.Geometry, however it can only have attributes for position, normal
  // and a special attribute Index defining which vertices of the original geometry are affected
  // Normal and position attributes only have data for the vertices that are affected by the morph
  genMorphGeometry(i, r, s, a, c) {
    const u = r.PolygonVertexIndex !== void 0 ? r.PolygonVertexIndex.a : [], h2 = s.Vertices !== void 0 ? s.Vertices.a : [], d = s.Indexes !== void 0 ? s.Indexes.a : [], g = i.attributes.position.count * 3, w = new Float32Array(g);
    for (let I2 = 0; I2 < d.length; I2++) {
      const S2 = d[I2] * 3;
      w[S2] = h2[I2 * 3], w[S2 + 1] = h2[I2 * 3 + 1], w[S2 + 2] = h2[I2 * 3 + 2];
    }
    const _ = {
      vertexIndices: u,
      vertexPositions: w
    }, y2 = this.genBuffers(_), C = new Float32BufferAttribute(y2.vertex, 3);
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
    if (ma === void 0)
      return console.error("THREE.FBXLoader: The loader relies on NURBSCurve for any nurbs present in the model. Nurbs will show up as empty geometry."), new BufferGeometry();
    const r = parseInt(i.Order);
    if (isNaN(r))
      return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s", i.Order, i.id), new BufferGeometry();
    const s = r - 1, a = i.KnotVector.a, c = [], u = i.Points.a;
    for (let _ = 0, y2 = u.length; _ < y2; _ += 4)
      c.push(new Vector4().fromArray(u, _));
    let h2, d;
    if (i.Form === "Closed")
      c.push(c[0]);
    else if (i.Form === "Periodic") {
      h2 = s, d = a.length - 1 - h2;
      for (let _ = 0; _ < s; ++_)
        c.push(c[_]);
    }
    const w = new ma(s, a, c, h2, d).getPoints(c.length * 12);
    return new BufferGeometry().setFromPoints(w);
  }
};
var Ku = class {
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
    if (se2.Objects.AnimationCurve === void 0)
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
    const i = se2.Objects.AnimationCurveNode, r = /* @__PURE__ */ new Map();
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
    const r = se2.Objects.AnimationCurve;
    for (const s in r) {
      const a = {
        id: r[s].id,
        times: r[s].KeyTime.a.map(Qu),
        values: r[s].KeyValueFloat.a
      }, c = Ae.get(a.id);
      if (c !== void 0) {
        const u = c.parents[0].ID, h2 = c.parents[0].relationship;
        h2.match(/X/) ? i.get(u).curves.x = a : h2.match(/Y/) ? i.get(u).curves.y = a : h2.match(/Z/) ? i.get(u).curves.z = a : h2.match(/d|DeformPercent/) && i.has(u) && (i.get(u).curves.morph = a);
      }
    }
  }
  // parse nodes in FBXTree.Objects.AnimationLayer. Each layers holds references
  // to various AnimationCurveNodes and is referenced by an AnimationStack node
  // note: theoretically a stack can have multiple layers, however in practice there always seems to be one per stack
  parseAnimationLayers(i) {
    const r = se2.Objects.AnimationLayer, s = /* @__PURE__ */ new Map();
    for (const a in r) {
      const c = [], u = Ae.get(parseInt(a));
      u !== void 0 && (u.children.forEach(function(d, g) {
        if (i.has(d.ID)) {
          const w = i.get(d.ID);
          if (w.curves.x !== void 0 || w.curves.y !== void 0 || w.curves.z !== void 0) {
            if (c[g] === void 0) {
              const _ = Ae.get(d.ID).parents.filter(function(y2) {
                return y2.relationship !== void 0;
              })[0].ID;
              if (_ !== void 0) {
                const y2 = se2.Objects.Model[_.toString()];
                if (y2 === void 0) {
                  console.warn("THREE.FBXLoader: Encountered a unused curve.", d);
                  return;
                }
                const C = {
                  modelName: y2.attrName ? PropertyBinding.sanitizeNodeName(y2.attrName) : "",
                  ID: y2.id,
                  initialPosition: [0, 0, 0],
                  initialRotation: [0, 0, 0],
                  initialScale: [1, 1, 1]
                };
                We.traverse(function(I2) {
                  I2.ID === y2.id && (C.transform = I2.matrix, I2.userData.transformData && (C.eulerOrder = I2.userData.transformData.eulerOrder));
                }), C.transform || (C.transform = new Matrix4()), "PreRotation" in y2 && (C.preRotation = y2.PreRotation.value), "PostRotation" in y2 && (C.postRotation = y2.PostRotation.value), c[g] = C;
              }
            }
            c[g] && (c[g][w.attr] = w);
          } else if (w.curves.morph !== void 0) {
            if (c[g] === void 0) {
              const _ = Ae.get(d.ID).parents.filter(function(j2) {
                return j2.relationship !== void 0;
              })[0].ID, y2 = Ae.get(_).parents[0].ID, C = Ae.get(y2).parents[0].ID, I2 = Ae.get(C).parents[0].ID, S2 = se2.Objects.Model[I2], R2 = {
                modelName: S2.attrName ? PropertyBinding.sanitizeNodeName(S2.attrName) : "",
                morphName: se2.Objects.Deformer[_].attrName
              };
              c[g] = R2;
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
    const r = se2.Objects.AnimationStack, s = {};
    for (const a in r) {
      const c = Ae.get(parseInt(a)).children;
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
    const h2 = this.getTimesForAllAxes(r), d = this.getKeyframeTrackValues(h2, r, s);
    a !== void 0 && (a = a.map(MathUtils.degToRad), a.push(u), a = new Euler().fromArray(a), a = new Quaternion().setFromEuler(a)), c !== void 0 && (c = c.map(MathUtils.degToRad), c.push(u), c = new Euler().fromArray(c), c = new Quaternion().setFromEuler(c).invert());
    const g = new Quaternion(), w = new Euler(), _ = [];
    for (let y2 = 0; y2 < d.length; y2 += 3)
      w.set(d[y2], d[y2 + 1], d[y2 + 2], u), g.setFromEuler(w), a !== void 0 && g.premultiply(a), c !== void 0 && g.multiply(c), g.toArray(_, y2 / 3 * 4);
    return new QuaternionKeyframeTrack(i + ".quaternion", h2, _);
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
    let u = -1, h2 = -1, d = -1;
    return i.forEach(function(g) {
      if (r.x && (u = r.x.times.indexOf(g)), r.y && (h2 = r.y.times.indexOf(g)), r.z && (d = r.z.times.indexOf(g)), u !== -1) {
        const w = r.x.values[u];
        c.push(w), a[0] = w;
      } else
        c.push(a[0]);
      if (h2 !== -1) {
        const w = r.y.values[h2];
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
  interpolateRotations(i) {
    for (let r = 1; r < i.values.length; r++) {
      const s = i.values[r - 1], a = i.values[r] - s, c = Math.abs(a);
      if (c >= 180) {
        const u = c / 180, h2 = a / u;
        let d = s + h2;
        const g = i.times[r - 1], _ = (i.times[r] - g) / u;
        let y2 = g + _;
        const C = [], I2 = [];
        for (; y2 < i.times[r]; )
          C.push(y2), y2 += _, I2.push(d), d += h2;
        i.times = ba(i.times, r, C), i.values = ba(i.values, r, I2);
      }
    }
  }
};
var $u = class {
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
    this.currentIndent = 0, this.allNodes = new Qa(), this.nodeStack = [], this.currentProp = [], this.currentPropName = "";
    const r = this, s = i.split(/[\r\n]+/);
    return s.forEach(function(a, c) {
      const u = a.match(/^[\s\t]*;/), h2 = a.match(/^[\s\t]*$/);
      if (u || h2)
        return;
      const d = a.match("^\\t{" + r.currentIndent + "}(\\w+):(.*){", ""), g = a.match("^\\t{" + r.currentIndent + "}(\\w+):[\\s\\t\\r\\n](.*)"), w = a.match("^\\t{" + (r.currentIndent - 1) + "}}");
      d ? r.parseNodeBegin(a, d) : g ? r.parseNodeProperty(a, g, s[++c]) : w ? r.popStack() : a.match(/^[^\s\t}]/) && r.parseNodePropertyContinued(a);
    }), this.allNodes;
  }
  parseNodeBegin(i, r) {
    const s = r[1].trim().replace(/^"/, "").replace(/"$/, ""), a = r[2].split(",").map(function(d) {
      return d.trim().replace(/^"/, "").replace(/"$/, "");
    }), c = {
      name: s
    }, u = this.parseNodeAttr(a), h2 = this.getCurrentNode();
    this.currentIndent === 0 ? this.allNodes.add(s, c) : s in h2 ? (s === "PoseNode" ? h2.PoseNode.push(c) : h2[s].id !== void 0 && (h2[s] = {}, h2[s][h2[s].id] = h2[s]), u.id !== "" && (h2[s][u.id] = c)) : typeof u.id == "number" ? (h2[s] = {}, h2[s][u.id] = c) : s !== "Properties70" && (s === "PoseNode" ? h2[s] = [c] : h2[s] = c), typeof u.id == "number" && (c.id = u.id), u.name !== "" && (c.attrName = u.name), u.type !== "" && (c.attrType = u.type), this.pushStack(c);
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
      const d = c.split(",").slice(1), g = parseInt(d[0]), w = parseInt(d[1]);
      let _ = c.split(",").slice(3);
      _ = _.map(function(y2) {
        return y2.trim().replace(/^"/, "");
      }), a = "connections", c = [g, w], Wu(c, _), u[a] === void 0 && (u[a] = []);
    }
    a === "Node" && (u.id = c), a in u && Array.isArray(u[a]) ? u[a].push(c) : a !== "a" ? u[a] = c : u.a = c, this.setCurrentProp(u, a), a === "a" && c.slice(-1) !== "," && (u.a = Wr(c));
  }
  parseNodePropertyContinued(i) {
    const r = this.getCurrentNode();
    r.a += i, i.slice(-1) !== "," && (r.a = Wr(r.a));
  }
  // parse "Property70"
  parseNodeSpecialProperty(i, r, s) {
    const a = s.split('",').map(function(w) {
      return w.trim().replace(/^\"/, "").replace(/\s/, "_");
    }), c = a[0], u = a[1], h2 = a[2], d = a[3];
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
        g = Wr(g);
        break;
    }
    this.getPrevNode()[c] = {
      type: u,
      type2: h2,
      flag: d,
      value: g
    }, this.setCurrentProp(this.getPrevNode(), c);
  }
};
var Xu = class {
  parse(i) {
    const r = new fa(i);
    r.skip(23);
    const s = r.getUint32();
    if (s < 6400)
      throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + s);
    const a = new Qa();
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
    const u = i.getUint8(), h2 = i.getString(u);
    if (a === 0)
      return null;
    const d = [];
    for (let y2 = 0; y2 < c; y2++)
      d.push(this.parseProperty(i));
    const g = d.length > 0 ? d[0] : "", w = d.length > 1 ? d[1] : "", _ = d.length > 2 ? d[2] : "";
    for (s.singleProperty = c === 1 && i.getOffset() === a; a > i.getOffset(); ) {
      const y2 = this.parseNode(i, r);
      y2 !== null && this.parseSubNode(h2, s, y2);
    }
    return s.propertyList = d, typeof g == "number" && (s.id = g), w !== "" && (s.attrName = w), _ !== "" && (s.attrType = _), h2 !== "" && (s.name = h2), s;
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
      const u = s.propertyList[2], h2 = s.propertyList[3];
      let d;
      a.indexOf("Lcl ") === 0 && (a = a.replace("Lcl ", "Lcl_")), c.indexOf("Lcl ") === 0 && (c = c.replace("Lcl ", "Lcl_")), c === "Color" || c === "ColorRGB" || c === "Vector" || c === "Vector3D" || c.indexOf("Lcl_") === 0 ? d = [s.propertyList[4], s.propertyList[5], s.propertyList[6]] : d = s.propertyList[4], r[a] = {
        type: c,
        type2: u,
        flag: h2,
        value: d
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
        const h2 = Zp(new Uint8Array(i.getArrayBuffer(u))), d = new fa(h2.buffer);
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
var fa = class {
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
var Qa = class {
  add(i, r) {
    this[i] = r;
  }
};
function Yu(b2) {
  const i = "Kaydara FBX Binary  \0";
  return b2.byteLength >= i.length && i === Ja(b2, 0, i.length);
}
function qu(b2) {
  const i = ["K", "a", "y", "d", "a", "r", "a", "\\", "F", "B", "X", "\\", "B", "i", "n", "a", "r", "y", "\\", "\\"];
  let r = 0;
  function s(a) {
    const c = b2[a - 1];
    return b2 = b2.slice(r + a), r++, c;
  }
  for (let a = 0; a < i.length; ++a)
    if (s(1) === i[a])
      return false;
  return true;
}
function va(b2) {
  const i = /FBXVersion: (\d+)/, r = b2.match(i);
  if (r)
    return parseInt(r[1]);
  throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.");
}
function Qu(b2) {
  return b2 / 46186158e3;
}
var Zu = [];
function Vs(b2, i, r, s) {
  let a;
  switch (s.mappingType) {
    case "ByPolygonVertex":
      a = b2;
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
  return Ju(Zu, s.buffer, c, u);
}
var Zr = new Euler();
var ci = new Vector3();
function Za(b2) {
  const i = new Matrix4(), r = new Matrix4(), s = new Matrix4(), a = new Matrix4(), c = new Matrix4(), u = new Matrix4(), h2 = new Matrix4(), d = new Matrix4(), g = new Matrix4(), w = new Matrix4(), _ = new Matrix4(), y2 = new Matrix4(), C = b2.inheritType ? b2.inheritType : 0;
  if (b2.translation && i.setPosition(ci.fromArray(b2.translation)), b2.preRotation) {
    const K = b2.preRotation.map(MathUtils.degToRad);
    K.push(b2.eulerOrder), r.makeRotationFromEuler(Zr.fromArray(K));
  }
  if (b2.rotation) {
    const K = b2.rotation.map(MathUtils.degToRad);
    K.push(b2.eulerOrder), s.makeRotationFromEuler(Zr.fromArray(K));
  }
  if (b2.postRotation) {
    const K = b2.postRotation.map(MathUtils.degToRad);
    K.push(b2.eulerOrder), a.makeRotationFromEuler(Zr.fromArray(K)), a.invert();
  }
  b2.scale && c.scale(ci.fromArray(b2.scale)), b2.scalingOffset && h2.setPosition(ci.fromArray(b2.scalingOffset)), b2.scalingPivot && u.setPosition(ci.fromArray(b2.scalingPivot)), b2.rotationOffset && d.setPosition(ci.fromArray(b2.rotationOffset)), b2.rotationPivot && g.setPosition(ci.fromArray(b2.rotationPivot)), b2.parentMatrixWorld && (_.copy(b2.parentMatrix), w.copy(b2.parentMatrixWorld));
  const I2 = r.clone().multiply(s).multiply(a), S2 = new Matrix4();
  S2.extractRotation(w);
  const R2 = new Matrix4();
  R2.copyPosition(w);
  const j2 = R2.clone().invert().multiply(w), F = S2.clone().invert().multiply(j2), V2 = c, D = new Matrix4();
  if (C === 0)
    D.copy(S2).multiply(I2).multiply(F).multiply(V2);
  else if (C === 1)
    D.copy(S2).multiply(F).multiply(I2).multiply(V2);
  else {
    const q = new Matrix4().scale(new Vector3().setFromMatrixScale(_)).clone().invert(), ue2 = F.clone().multiply(q);
    D.copy(S2).multiply(I2).multiply(ue2).multiply(V2);
  }
  const Y = g.clone().invert(), G2 = u.clone().invert();
  let N = i.clone().multiply(d).multiply(g).multiply(r).multiply(s).multiply(a).multiply(Y).multiply(h2).multiply(u).multiply(c).multiply(G2);
  const O = new Matrix4().copyPosition(N), H2 = w.clone().multiply(O);
  return y2.copyPosition(H2), N = y2.clone().multiply(D), N.premultiply(w.invert()), N;
}
function Wa(b2) {
  b2 = b2 || 0;
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
  return b2 === 6 ? (console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."), i[0]) : i[b2];
}
function Wr(b2) {
  return b2.split(",").map(function(r) {
    return parseFloat(r);
  });
}
function Ja(b2, i, r) {
  return i === void 0 && (i = 0), r === void 0 && (r = b2.byteLength), LoaderUtils.decodeText(new Uint8Array(b2, i, r));
}
function Wu(b2, i) {
  for (let r = 0, s = b2.length, a = i.length; r < a; r++, s++)
    b2[s] = i[r];
}
function Ju(b2, i, r, s) {
  for (let a = r, c = 0; a < s; a++, c++)
    b2[c] = i[a];
  return b2;
}
function ba(b2, i, r) {
  return b2.slice(0, i).concat(r).concat(b2.slice(i));
}
var eh = class extends Loader {
  constructor(i) {
    super(i);
  }
  load(i, r, s, a) {
    const c = new FileLoader(this.manager);
    c.setPath(this.path), c.setRequestHeader(this.requestHeader), c.setWithCredentials(this.withCredentials), c.load(i, (u) => {
      if (typeof u != "string")
        throw new Error("unsupported data type");
      const h2 = JSON.parse(u), d = this.parse(h2);
      r && r(d);
    }, s, a);
  }
  parse(i) {
    return new go(i);
  }
};
var go = class {
  constructor(i) {
    T2(this, "data", void 0), this.data = i;
  }
  generateShapes(i, r = 100, s) {
    const a = [], c = {
      letterSpacing: 0,
      lineHeight: 1,
      ...s
    }, u = th(i, r, this.data, c);
    for (let h2 = 0, d = u.length; h2 < d; h2++)
      Array.prototype.push.apply(a, u[h2].toShapes(false));
    return a;
  }
};
T2(go, "isFont", void 0);
T2(go, "type", void 0);
function th(b2, i, r, s) {
  const a = Array.from(b2), c = i / r.resolution, u = (r.boundingBox.yMax - r.boundingBox.yMin + r.underlineThickness) * c, h2 = [];
  let d = 0, g = 0;
  for (let w = 0; w < a.length; w++) {
    const _ = a[w];
    if (_ === `
`)
      d = 0, g -= u * s.lineHeight;
    else {
      const y2 = nh(_, c, d, g, r);
      y2 && (d += y2.offsetX + s.letterSpacing, h2.push(y2.path));
    }
  }
  return h2;
}
function nh(b2, i, r, s, a) {
  const c = a.glyphs[b2] || a.glyphs["?"];
  if (!c) {
    console.error('THREE.Font: character "' + b2 + '" does not exists in font family ' + a.familyName + ".");
    return;
  }
  const u = new ShapePath();
  let h2, d, g, w, _, y2, C, I2;
  if (c.o) {
    const S2 = c._cachedOutline || (c._cachedOutline = c.o.split(" "));
    for (let R2 = 0, j2 = S2.length; R2 < j2; )
      switch (S2[R2++]) {
        case "m":
          h2 = parseInt(S2[R2++]) * i + r, d = parseInt(S2[R2++]) * i + s, u.moveTo(h2, d);
          break;
        case "l":
          h2 = parseInt(S2[R2++]) * i + r, d = parseInt(S2[R2++]) * i + s, u.lineTo(h2, d);
          break;
        case "q":
          g = parseInt(S2[R2++]) * i + r, w = parseInt(S2[R2++]) * i + s, _ = parseInt(S2[R2++]) * i + r, y2 = parseInt(S2[R2++]) * i + s, u.quadraticCurveTo(_, y2, g, w);
          break;
        case "b":
          g = parseInt(S2[R2++]) * i + r, w = parseInt(S2[R2++]) * i + s, _ = parseInt(S2[R2++]) * i + r, y2 = parseInt(S2[R2++]) * i + s, C = parseInt(S2[R2++]) * i + r, I2 = parseInt(S2[R2++]) * i + s, u.bezierCurveTo(_, y2, C, I2, g, w);
          break;
      }
  }
  return {
    offsetX: c.ha * i,
    path: u
  };
}
var el = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ih(b2) {
  return b2 && b2.__esModule && Object.prototype.hasOwnProperty.call(b2, "default") ? b2.default : b2;
}
var sh = class extends DataTextureLoader {
  constructor(i) {
    super(i), this.type = HalfFloatType;
  }
  // adapted from http://www.graphics.cornell.edu/~bjw/rgbe.html
  parse(i) {
    const h2 = function(V2, D) {
      switch (V2) {
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
`, y2 = function(V2, D, Y) {
      D = D || 1024;
      let N = V2.pos, O = -1, H2 = 0, K = "", q = String.fromCharCode.apply(null, new Uint16Array(V2.subarray(N, N + 128)));
      for (; 0 > (O = q.indexOf(_)) && H2 < D && N < V2.byteLength; )
        K += q, H2 += q.length, N += 128, q += String.fromCharCode.apply(null, new Uint16Array(V2.subarray(N, N + 128)));
      return -1 < O ? (Y !== false && (V2.pos += H2 + O + 1), K + q.slice(0, O)) : false;
    }, C = function(V2) {
      const D = /^#\?(\S+)/, Y = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, G2 = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, N = /^\s*FORMAT=(\S+)\s*$/, O = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, H2 = {
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
      if (V2.pos >= V2.byteLength || !(K = y2(V2)))
        return h2(1, "no header found");
      if (!(q = K.match(D)))
        return h2(3, "bad initial token");
      for (H2.valid |= 1, H2.programtype = q[1], H2.string += K + `
`; K = y2(V2), K !== false; ) {
        if (H2.string += K + `
`, K.charAt(0) === "#") {
          H2.comments += K + `
`;
          continue;
        }
        if ((q = K.match(Y)) && (H2.gamma = parseFloat(q[1])), (q = K.match(G2)) && (H2.exposure = parseFloat(q[1])), (q = K.match(N)) && (H2.valid |= 2, H2.format = q[1]), (q = K.match(O)) && (H2.valid |= 4, H2.height = parseInt(q[1], 10), H2.width = parseInt(q[2], 10)), H2.valid & 2 && H2.valid & 4)
          break;
      }
      return H2.valid & 2 ? H2.valid & 4 ? H2 : h2(3, "missing image size specifier") : h2(3, "missing format specifier");
    }, I2 = function(V2, D, Y) {
      const G2 = D;
      if (
        // run length encoding is not allowed so read flat
        G2 < 8 || G2 > 32767 || // this file is not run length encoded
        V2[0] !== 2 || V2[1] !== 2 || V2[2] & 128
      )
        return new Uint8Array(V2);
      if (G2 !== (V2[2] << 8 | V2[3]))
        return h2(3, "wrong scanline width");
      const N = new Uint8Array(4 * D * Y);
      if (!N.length)
        return h2(4, "unable to allocate buffer space");
      let O = 0, H2 = 0;
      const K = 4 * G2, q = new Uint8Array(4), ue2 = new Uint8Array(K);
      let ge = Y;
      for (; ge > 0 && H2 < V2.byteLength; ) {
        if (H2 + 4 > V2.byteLength)
          return h2(1);
        if (q[0] = V2[H2++], q[1] = V2[H2++], q[2] = V2[H2++], q[3] = V2[H2++], q[0] != 2 || q[1] != 2 || (q[2] << 8 | q[3]) != G2)
          return h2(3, "bad rgbe scanline format");
        let ce2 = 0, me2;
        for (; ce2 < K && H2 < V2.byteLength; ) {
          me2 = V2[H2++];
          const ee2 = me2 > 128;
          if (ee2 && (me2 -= 128), me2 === 0 || ce2 + me2 > K)
            return h2(3, "bad scanline data");
          if (ee2) {
            const X = V2[H2++];
            for (let Pe = 0; Pe < me2; Pe++)
              ue2[ce2++] = X;
          } else
            ue2.set(V2.subarray(H2, H2 + me2), ce2), ce2 += me2, H2 += me2;
        }
        const he = G2;
        for (let ee2 = 0; ee2 < he; ee2++) {
          let X = 0;
          N[O] = ue2[ee2 + X], X += G2, N[O + 1] = ue2[ee2 + X], X += G2, N[O + 2] = ue2[ee2 + X], X += G2, N[O + 3] = ue2[ee2 + X], O += 4;
        }
        ge--;
      }
      return N;
    }, S2 = function(V2, D, Y, G2) {
      const N = V2[D + 3], O = Math.pow(2, N - 128) / 255;
      Y[G2 + 0] = V2[D + 0] * O, Y[G2 + 1] = V2[D + 1] * O, Y[G2 + 2] = V2[D + 2] * O, Y[G2 + 3] = 1;
    }, R2 = function(V2, D, Y, G2) {
      const N = V2[D + 3], O = Math.pow(2, N - 128) / 255;
      Y[G2 + 0] = DataUtils.toHalfFloat(Math.min(V2[D + 0] * O, 65504)), Y[G2 + 1] = DataUtils.toHalfFloat(Math.min(V2[D + 1] * O, 65504)), Y[G2 + 2] = DataUtils.toHalfFloat(Math.min(V2[D + 2] * O, 65504)), Y[G2 + 3] = DataUtils.toHalfFloat(1);
    }, j2 = new Uint8Array(i);
    j2.pos = 0;
    const F = C(j2);
    if (F !== -1) {
      const V2 = F.width, D = F.height, Y = I2(j2.subarray(j2.pos), V2, D);
      if (Y !== -1) {
        let G2, N, O;
        switch (this.type) {
          case FloatType:
            O = Y.length / 4;
            const H2 = new Float32Array(O * 4);
            for (let q = 0; q < O; q++)
              S2(Y, q * 4, H2, q * 4);
            G2 = H2, N = FloatType;
            break;
          case HalfFloatType:
            O = Y.length / 4;
            const K = new Uint16Array(O * 4);
            for (let q = 0; q < O; q++)
              R2(Y, q * 4, K, q * 4);
            G2 = K, N = HalfFloatType;
            break;
          default:
            console.error("THREE.RGBELoader: unsupported type: ", this.type);
            break;
        }
        return {
          width: V2,
          height: D,
          data: G2,
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
    function c(u, h2) {
      switch (u.type) {
        case FloatType:
        case HalfFloatType:
          u.encoding = LinearEncoding, u.minFilter = LinearFilter, u.magFilter = LinearFilter, u.generateMipmaps = false, u.flipY = true;
          break;
      }
      r && r(u, h2);
    }
    return super.load(i, c, s, a);
  }
};
var Jr = /* @__PURE__ */ new WeakMap();
var rh = class extends Loader {
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
      const h2 = {
        attributeIDs: this.defaultAttributeIDs,
        attributeTypes: this.defaultAttributeTypes,
        useUniqueIDs: false
      };
      this.decodeGeometry(u, h2).then(r).catch(a);
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
    for (const d in r.attributeTypes) {
      const g = r.attributeTypes[d];
      g.BYTES_PER_ELEMENT !== void 0 && (r.attributeTypes[d] = g.name);
    }
    const s = JSON.stringify(r);
    if (Jr.has(i)) {
      const d = Jr.get(i);
      if (d.key === s)
        return d.promise;
      if (i.byteLength === 0)
        throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.");
    }
    let a;
    const c = this.workerNextTaskID++, u = i.byteLength, h2 = this._getWorker(c, u).then((d) => (a = d, new Promise((g, w) => {
      a._callbacks[c] = {
        resolve: g,
        reject: w
      }, a.postMessage({
        type: "decode",
        id: c,
        taskConfig: r,
        buffer: i
      }, [i]);
    }))).then((d) => this._createGeometry(d.geometry));
    return h2.catch(() => true).then(() => {
      a && c && this._releaseTask(a, c);
    }), Jr.set(i, {
      key: s,
      promise: h2
    }), h2;
  }
  _createGeometry(i) {
    const r = new BufferGeometry();
    i.index && r.setIndex(new BufferAttribute(i.index.array, 1));
    for (let s = 0; s < i.attributes.length; s++) {
      const a = i.attributes[s], c = a.name, u = a.array, h2 = a.itemSize;
      r.setAttribute(c, new BufferAttribute(u, h2));
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
      const c = oh.toString(), u = ["/* draco decoder */", a, "", "/* worker */", c.substring(c.indexOf("{") + 1, c.lastIndexOf("}"))].join(`
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
function oh() {
  let b2, i;
  onmessage = function(u) {
    const h2 = u.data;
    switch (h2.type) {
      case "init":
        b2 = h2.decoderConfig, i = new Promise(function(w) {
          b2.onModuleLoaded = function(_) {
            w({
              draco: _
            });
          }, DracoDecoderModule(b2);
        });
        break;
      case "decode":
        const d = h2.buffer, g = h2.taskConfig;
        i.then((w) => {
          const _ = w.draco, y2 = new _.Decoder(), C = new _.DecoderBuffer();
          C.Init(new Int8Array(d), d.byteLength);
          try {
            const I2 = r(_, y2, C, g), S2 = I2.attributes.map((R2) => R2.array.buffer);
            I2.index && S2.push(I2.index.array.buffer), self.postMessage({
              type: "decode",
              id: h2.id,
              geometry: I2
            }, S2);
          } catch (I2) {
            console.error(I2), self.postMessage({
              type: "error",
              id: h2.id,
              error: I2.message
            });
          } finally {
            _.destroy(C), _.destroy(y2);
          }
        });
        break;
    }
  };
  function r(u, h2, d, g) {
    const w = g.attributeIDs, _ = g.attributeTypes;
    let y2, C;
    const I2 = h2.GetEncodedGeometryType(d);
    if (I2 === u.TRIANGULAR_MESH)
      y2 = new u.Mesh(), C = h2.DecodeBufferToMesh(d, y2);
    else if (I2 === u.POINT_CLOUD)
      y2 = new u.PointCloud(), C = h2.DecodeBufferToPointCloud(d, y2);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!C.ok() || y2.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + C.error_msg());
    const S2 = {
      index: null,
      attributes: []
    };
    for (const R2 in w) {
      const j2 = self[_[R2]];
      let F, V2;
      if (g.useUniqueIDs)
        V2 = w[R2], F = h2.GetAttributeByUniqueId(y2, V2);
      else {
        if (V2 = h2.GetAttributeId(y2, u[w[R2]]), V2 === -1)
          continue;
        F = h2.GetAttribute(y2, V2);
      }
      S2.attributes.push(a(u, h2, y2, R2, j2, F));
    }
    return I2 === u.TRIANGULAR_MESH && (S2.index = s(u, h2, y2)), u.destroy(y2), S2;
  }
  function s(u, h2, d) {
    const w = d.num_faces() * 3, _ = w * 4, y2 = u._malloc(_);
    h2.GetTrianglesUInt32Array(d, _, y2);
    const C = new Uint32Array(u.HEAPF32.buffer, y2, w).slice();
    return u._free(y2), {
      array: C,
      itemSize: 1
    };
  }
  function a(u, h2, d, g, w, _) {
    const y2 = _.num_components(), I2 = d.num_points() * y2, S2 = I2 * w.BYTES_PER_ELEMENT, R2 = c(u, w), j2 = u._malloc(S2);
    h2.GetAttributeDataArrayForAllPoints(d, _, R2, S2, j2);
    const F = new w(u.HEAPF32.buffer, j2, I2).slice();
    return u._free(j2), {
      name: g,
      array: F,
      itemSize: y2
    };
  }
  function c(u, h2) {
    switch (h2) {
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
function Fn() {
  const { state: b2, setState: i } = inject("useTres", L()), r = inject("extend") || (() => {
  });
  return {
    state: b2,
    setState: i,
    extend: r
  };
}
var ah = ["args"];
var ud = defineComponent({
  __name: "OrbitControls",
  props: {
    makeDefault: { type: Boolean, default: false },
    camera: null,
    domElement: null,
    target: null,
    enableDamping: { type: Boolean }
  },
  setup(b2) {
    const i = b2, { state: r, setState: s, extend: a } = Fn(), c = ref(null);
    return a({ OrbitControls: iu }), watch(c, (u) => {
      u && i.makeDefault ? s("controls", u) : s("controls", null);
    }), (u, h2) => {
      var d;
      return unref(r).camera && unref(r).renderer ? (openBlock(), createElementBlock("TresOrbitControls", {
        key: 0,
        ref_key: "controls",
        ref: c,
        args: [unref(unref(r).camera) || b2.camera, ((d = unref(r).renderer) == null ? void 0 : d.domElement) || b2.domElement]
      }, null, 8, ah)) : createCommentVNode("", true);
    };
  }
});
function lh(b2, i) {
  const r = {};
  for (const s of i)
    Object.prototype.hasOwnProperty.call(b2, s) && (r[s] = b2[s]);
  return r;
}
function ch(b2, i) {
  const r = `set${i[0].toUpperCase()}${i.slice(1)}`;
  return b2[r] !== void 0;
}
var hd = defineComponent({
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
  setup(b2, { emit: i }) {
    const r = b2;
    let s = shallowRef();
    const { state: a } = Fn(), c = computed(
      () => lh(r, [
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
    ), u = () => i("change", s.value), h2 = () => i("mouseDown", s.value), d = () => i("mouseUp", s.value), g = () => i("objectChange", s.value), w = (y2) => {
      a.controls && (a.controls.enabled = !y2.value), i("dragging", y2.value);
    };
    function _(y2) {
      y2.addEventListener("dragging-changed", w), y2.addEventListener("change", u), y2.addEventListener("mouseDown", h2), y2.addEventListener("mouseUp", d), y2.addEventListener("objectChange", g);
    }
    return watchEffect(() => {
      a.camera && a.renderer && a.scene && r.object && (s.value = new eu(a.camera, a.renderer.domElement), s.value.attach(r.object), a.scene.add(s.value), _(s.value));
    }), watch(
      [c, s],
      // TODO: properly type this
      ([y2, C]) => {
        if (y2 && C)
          for (const I2 in y2)
            if (!ch(C, I2))
              C[I2] = y2[I2];
            else {
              const S2 = `set${I2[0].toUpperCase()}${I2.slice(1)}`;
              typeof C[S2] == "function" && y2[I2] !== void 0 && C[S2](y2[I2]);
            }
      },
      {
        immediate: true
      }
    ), onUnmounted(() => {
      s.value && (s.value.removeEventListener("dragging-changed", w), s.value.removeEventListener("change", u), s.value.removeEventListener("mouseDown", h2), s.value.removeEventListener("mouseUp", d), s.value.removeEventListener("objectChange", g));
    }), (y2, C) => renderSlot(y2.$slots, "default");
  }
});
var ga;
var tl = typeof window < "u";
var ph = (b2) => typeof b2 == "string";
var uh = () => {
};
tl && ((ga = window == null ? void 0 : window.navigator) != null && ga.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function nl(b2) {
  return typeof b2 == "function" ? b2() : unref(b2);
}
function hh(b2) {
  return b2;
}
function dh(b2) {
  return getCurrentScope() ? (onScopeDispose(b2), true) : false;
}
function mh(b2, i = true) {
  getCurrentInstance() ? onMounted(b2) : i ? b2() : nextTick(b2);
}
function fh(b2) {
  var i;
  const r = nl(b2);
  return (i = r == null ? void 0 : r.$el) != null ? i : r;
}
var _o = tl ? window : void 0;
function Vn(...b2) {
  let i, r, s, a;
  if (ph(b2[0]) || Array.isArray(b2[0]) ? ([r, s, a] = b2, i = _o) : [i, r, s, a] = b2, !i)
    return uh;
  Array.isArray(r) || (r = [r]), Array.isArray(s) || (s = [s]);
  const c = [], u = () => {
    c.forEach((w) => w()), c.length = 0;
  }, h2 = (w, _, y2, C) => (w.addEventListener(_, y2, C), () => w.removeEventListener(_, y2, C)), d = watch(() => [fh(i), nl(a)], ([w, _]) => {
    u(), w && c.push(...r.flatMap((y2) => s.map((C) => h2(w, y2, C, _))));
  }, { immediate: true, flush: "post" }), g = () => {
    d(), u();
  };
  return dh(g), g;
}
var _a2 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var wa = "__vueuse_ssr_handlers__";
_a2[wa] = _a2[wa] || {};
function vh(b2 = {}) {
  const {
    type: i = "page",
    touch: r = true,
    resetOnTouchEnds: s = false,
    initialValue: a = { x: 0, y: 0 },
    window: c = _o,
    eventFilter: u
  } = b2, h2 = ref(a.x), d = ref(a.y), g = ref(null), w = (S2) => {
    i === "page" ? (h2.value = S2.pageX, d.value = S2.pageY) : i === "client" ? (h2.value = S2.clientX, d.value = S2.clientY) : i === "movement" && (h2.value = S2.movementX, d.value = S2.movementY), g.value = "mouse";
  }, _ = () => {
    h2.value = a.x, d.value = a.y;
  }, y2 = (S2) => {
    if (S2.touches.length > 0) {
      const R2 = S2.touches[0];
      i === "page" ? (h2.value = R2.pageX, d.value = R2.pageY) : i === "client" && (h2.value = R2.clientX, d.value = R2.clientY), g.value = "touch";
    }
  }, C = (S2) => u === void 0 ? w(S2) : u(() => w(S2), {}), I2 = (S2) => u === void 0 ? y2(S2) : u(() => y2(S2), {});
  return c && (Vn(c, "mousemove", C, { passive: true }), Vn(c, "dragover", C, { passive: true }), r && i !== "movement" && (Vn(c, "touchstart", I2, { passive: true }), Vn(c, "touchmove", I2, { passive: true }), s && Vn(c, "touchend", _, { passive: true }))), {
    x: h2,
    y: d,
    sourceType: g
  };
}
var ya;
(function(b2) {
  b2.UP = "UP", b2.RIGHT = "RIGHT", b2.DOWN = "DOWN", b2.LEFT = "LEFT", b2.NONE = "NONE";
})(ya || (ya = {}));
var bh = Object.defineProperty;
var xa = Object.getOwnPropertySymbols;
var gh = Object.prototype.hasOwnProperty;
var _h = Object.prototype.propertyIsEnumerable;
var Ea = (b2, i, r) => i in b2 ? bh(b2, i, { enumerable: true, configurable: true, writable: true, value: r }) : b2[i] = r;
var wh = (b2, i) => {
  for (var r in i || (i = {}))
    gh.call(i, r) && Ea(b2, r, i[r]);
  if (xa)
    for (var r of xa(i))
      _h.call(i, r) && Ea(b2, r, i[r]);
  return b2;
};
var yh = {
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
wh({
  linear: hh
}, yh);
function xh(b2 = {}) {
  const {
    window: i = _o,
    initialWidth: r = 1 / 0,
    initialHeight: s = 1 / 0,
    listenOrientation: a = true,
    includeScrollbar: c = true
  } = b2, u = ref(r), h2 = ref(s), d = () => {
    i && (c ? (u.value = i.innerWidth, h2.value = i.innerHeight) : (u.value = i.document.documentElement.clientWidth, h2.value = i.document.documentElement.clientHeight));
  };
  return d(), mh(d), Vn("resize", d, { passive: true }), a && Vn("orientationchange", d, { passive: true }), { width: u, height: h2 };
}
function Eh(b2 = false, i = 5, r) {
  const { x: s, y: a } = vh(), { logWarning: c } = j(), { width: u, height: h2 } = xh(), d = computed(() => (s.value / u.value - 0.5) * i), g = computed(() => -(a.value / h2.value - 0.5) * i);
  if (r) {
    const { x: w, y: _ } = r.position;
    watchEffect(() => {
      b2 || r && (r.position.x = w + d.value, r.position.y = _ + g.value);
    });
  } else
    c("Scene must contain a Camera component to use this composable");
}
var dd = defineComponent({
  name: "PamCameraMouse",
  props: ["disabled", "factor"],
  setup(b2) {
    const { state: i } = Fn();
    return watchEffect(() => {
      if (i != null && i.camera) {
        const r = i == null ? void 0 : i.camera;
        Eh(b2.disabled, b2.factor, r);
      }
    }), () => {
    };
  }
});
var js = {};
var Ch = {
  get exports() {
    return js;
  },
  set exports(b2) {
    js = b2;
  }
};
(function(b2, i) {
  (function(r, s) {
    s(i);
  })(el, function(r) {
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
    class h2 extends c {
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
    function w(n) {
      return n;
    }
    function _(n) {
      return n == null;
    }
    function y2(n, e) {
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
    const I2 = {
      alreadydisposed: () => "View has been already disposed",
      invalidparams: (n) => `Invalid parameters for '${n.name}'`,
      nomatchingcontroller: (n) => `No matching controller for '${n.key}'`,
      nomatchingview: (n) => `No matching view for '${JSON.stringify(n.params)}'`,
      notbindable: () => "Value is not bindable",
      propertynotfound: (n) => `Property '${n.name}' not found`,
      shouldneverhappen: () => "This error should never happen"
    };
    class S2 {
      static alreadyDisposed() {
        return new S2({ type: "alreadydisposed" });
      }
      static notBindable() {
        return new S2({
          type: "notbindable"
        });
      }
      static propertyNotFound(e) {
        return new S2({
          type: "propertynotfound",
          context: {
            name: e
          }
        });
      }
      static shouldNeverHappen() {
        return new S2({ type: "shouldneverhappen" });
      }
      constructor(e) {
        var t;
        this.message = (t = I2[e.type](e.context)) !== null && t !== void 0 ? t : "Unexpected error", this.name = this.constructor.name, this.stack = new Error(this.message).stack, this.type = e.type;
      }
    }
    class R2 {
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
        if (!R2.isBindable(l))
          throw S2.notBindable();
        if (!(e in l))
          throw S2.propertyNotFound(e);
        l[e] = t;
      }
    }
    class j2 extends a {
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
    const V2 = "tp";
    function D(n) {
      return (t, l) => [
        V2,
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
    function G2(n) {
      return n.rawValue;
    }
    function N(n, e) {
      n.emitter.on("change", Y(G2, e)), e(n.rawValue);
    }
    function O(n, e, t) {
      N(n.value(e), t);
    }
    function H2(n, e, t) {
      t ? n.classList.add(e) : n.classList.remove(e);
    }
    function K(n, e) {
      return (t) => {
        H2(n, e, t);
      };
    }
    function q(n, e) {
      N(n, (t) => {
        e.textContent = t ?? "";
      });
    }
    const ue2 = D("btn");
    class ge {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(ue2()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("button");
        l.classList.add(ue2("b")), t.viewProps.bindDisabled(l), this.element.appendChild(l), this.buttonElement = l;
        const v = e.createElement("div");
        v.classList.add(ue2("t")), q(t.props.value("title"), v), this.buttonElement.appendChild(v);
      }
    }
    class ce2 {
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
    class me2 {
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
    function ee2(n, e) {
      const t = e == null ? void 0 : e.constraint, l = e == null ? void 0 : e.equals;
      return !t && !l ? new he(n) : new me2(n, e);
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
          [v]: ee2(e[v])
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
    function Pe(n, e) {
      const l = Object.keys(e).reduce((v, E) => {
        if (v === void 0)
          return;
        const k2 = e[E], B2 = k2(n[E]);
        return B2.succeeded ? Object.assign(Object.assign({}, v), { [E]: B2.value }) : void 0;
      }, {});
      return l;
    }
    function fe2(n, e) {
      return n.reduce((t, l) => {
        if (t === void 0)
          return;
        const v = e(l);
        if (!(!v.succeeded || v.value === void 0))
          return [...t, v.value];
      }, []);
    }
    function ae(n) {
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
    function be(n) {
      return {
        custom: (e) => ne(e)(n),
        boolean: ne((e) => typeof e == "boolean" ? e : void 0)(n),
        number: ne((e) => typeof e == "number" ? e : void 0)(n),
        string: ne((e) => typeof e == "string" ? e : void 0)(n),
        function: ne((e) => typeof e == "function" ? e : void 0)(n),
        constant: (e) => ne((t) => t === e ? e : void 0)(n),
        raw: ne((e) => e)(n),
        object: (e) => ne((t) => {
          if (ae(t))
            return Pe(t, e);
        })(n),
        array: (e) => ne((t) => {
          if (Array.isArray(t))
            return fe2(t, e);
        })(n)
      };
    }
    const M = {
      optional: be(true),
      required: be(false)
    };
    function le2(n, e) {
      const t = M.required.object(e)(n);
      return t.succeeded ? t.value : void 0;
    }
    function Ve(n) {
      console.warn([
        `Missing '${n.key}' of ${n.target} in ${n.place}.`,
        "Please rebuild plugins with the latest core package."
      ].join(" "));
    }
    function Ne2(n) {
      return n && n.parentElement && n.parentElement.removeChild(n), null;
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
    const it2 = D("");
    function Bn(n, e) {
      return K(n, it2(void 0, e));
    }
    class Xe2 extends X {
      constructor(e) {
        var t;
        super(e), this.onDisabledChange_ = this.onDisabledChange_.bind(this), this.onParentChange_ = this.onParentChange_.bind(this), this.onParentGlobalDisabledChange_ = this.onParentGlobalDisabledChange_.bind(this), [this.globalDisabled_, this.setGlobalDisabled_] = we.create(ee2(this.getGlobalDisabled_())), this.value("disabled").emitter.on("change", this.onDisabledChange_), this.value("parent").emitter.on("change", this.onParentChange_), (t = this.get("parent")) === null || t === void 0 || t.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_);
      }
      static create(e) {
        var t, l, v;
        const E = e ?? {};
        return new Xe2(X.createCore({
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
        N(this.globalDisabled_, Bn(e, "disabled")), O(this, "hidden", Bn(e, "hidden"));
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
    function jn() {
      return ["veryfirst", "first", "last", "verylast"];
    }
    const an = D(""), dt2 = {
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
          jn().forEach((l) => {
            t.classList.remove(an(void 0, dt2[l]));
          }), this.blade.get("positions").forEach((l) => {
            t.classList.add(an(void 0, dt2[l]));
          });
        }), this.viewProps.handleDispose(() => {
          Ne2(t);
        });
      }
      get parent() {
        return this.parent_;
      }
      set parent(e) {
        if (this.parent_ = e, !("parent" in this.viewProps.valMap_)) {
          Ve({
            key: "parent",
            target: Xe2.name,
            place: "BladeController.parent"
          });
          return;
        }
        this.viewProps.set("parent", this.parent_ ? this.parent_.viewProps : null);
      }
    }
    const ze = "http://www.w3.org/2000/svg";
    function st2(n) {
      n.offsetHeight;
    }
    function ln(n, e) {
      const t = n.style.transition;
      n.style.transition = "none", e(), n.style.transition = t;
    }
    function mt(n) {
      return n.ontouchstart !== void 0;
    }
    function zn() {
      return globalThis;
    }
    function hi() {
      return zn().document;
    }
    function Un(n) {
      const e = n.ownerDocument.defaultView;
      return e && "document" in e ? n.getContext("2d", {
        willReadFrequently: true
      }) : null;
    }
    const Gn = {
      check: '<path d="M2 8l4 4l8 -8"/>',
      dropdown: '<path d="M5 7h6l-3 3 z"/>',
      p2dpad: '<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'
    };
    function yt(n, e) {
      const t = n.createElementNS(ze, "svg");
      return t.innerHTML = Gn[e], t;
    }
    function St(n, e, t) {
      n.insertBefore(e, n.children[t]);
    }
    function Hn(n) {
      n.parentElement && n.parentElement.removeChild(n);
    }
    function cn(n) {
      for (; n.children.length > 0; )
        n.removeChild(n.children[0]);
    }
    function Kn(n) {
      for (; n.childNodes.length > 0; )
        n.removeChild(n.childNodes[0]);
    }
    function xt(n) {
      return n.relatedTarget ? n.relatedTarget : "explicitOriginalTarget" in n ? n.explicitOriginalTarget : null;
    }
    const ft = D("lbl");
    function At(n, e) {
      const t = n.createDocumentFragment();
      return e.split(`
`).map((v) => n.createTextNode(v)).forEach((v, E) => {
        E > 0 && t.appendChild(n.createElement("br")), t.appendChild(v);
      }), t;
    }
    class A2 {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(ft()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(ft("l")), O(t.props, "label", (E) => {
          _(E) ? this.element.classList.add(ft(void 0, "nol")) : (this.element.classList.remove(ft(void 0, "nol")), Kn(l), l.appendChild(At(e, E)));
        }), this.element.appendChild(l), this.labelElement = l;
        const v = e.createElement("div");
        v.classList.add(ft("v")), this.element.appendChild(v), this.valueElement = v;
      }
    }
    class U extends Mt {
      constructor(e, t) {
        const l = t.valueController.viewProps;
        super(Object.assign(Object.assign({}, t), { view: new A2(e, {
          props: t.props,
          viewProps: l
        }), viewProps: l })), this.props = t.props, this.valueController = t.valueController, this.view.valueElement.appendChild(this.valueController.view.element);
      }
    }
    const W = {
      id: "button",
      type: "blade",
      accept(n) {
        const e = M, t = le2(n, {
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
          valueController: new ce2(n.document, {
            props: X.fromObject({
              title: n.params.title
            }),
            viewProps: n.viewProps
          })
        });
      },
      api(n) {
        return !(n.controller instanceof U) || !(n.controller.valueController instanceof ce2) ? null : new j2(n.controller);
      }
    };
    class ie extends Mt {
      constructor(e) {
        super(e), this.value = e.value;
      }
    }
    function ye() {
      return new X({
        positions: ee2([], {
          equals: y2
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
    function Ut(n, e) {
      let t = 0;
      return ln(e, () => {
        n.set("expandedHeight", null), n.set("temporaryExpanded", true), st2(e), t = e.clientHeight, n.set("temporaryExpanded", null), st2(e);
      }), t;
    }
    function pn(n, e) {
      e.style.height = n.styleHeight;
    }
    function Ue(n, e) {
      n.value("expanded").emitter.on("beforechange", () => {
        if (n.set("completed", false), _(n.get("expandedHeight"))) {
          const t = Ut(n, e);
          t > 0 && n.set("expandedHeight", t);
        }
        n.set("shouldFixHeight", true), st2(e);
      }), n.emitter.on("change", () => {
        pn(n, e);
      }), pn(n, e), e.addEventListener("transitionend", (t) => {
        t.propertyName === "height" && n.cleanUpTransition();
      });
    }
    class Ge extends a {
      constructor(e, t) {
        super(e), this.rackApi_ = t;
      }
    }
    function Gs(n, e) {
      return n.addBlade(Object.assign(Object.assign({}, e), { view: "button" }));
    }
    function Hs(n, e) {
      return n.addBlade(Object.assign(Object.assign({}, e), { view: "folder" }));
    }
    function Ks(n, e) {
      const t = e ?? {};
      return n.addBlade(Object.assign(Object.assign({}, t), { view: "separator" }));
    }
    function di(n, e) {
      return n.addBlade(Object.assign(Object.assign({}, e), { view: "tab" }));
    }
    class Lt {
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
          throw S2.shouldNeverHappen();
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
    class mi extends a {
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
    class Fe extends U {
      constructor(e, t) {
        super(e, t), this.binding = t.binding;
      }
    }
    class fi extends a {
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
          event: new h2(this, t, this.controller_.binding.target.presetKey)
        });
      }
    }
    class rt2 extends U {
      constructor(e, t) {
        super(e, t), this.binding = t.binding, this.viewProps.bindDisabled(this.binding.ticker), this.viewProps.handleDispose(() => {
          this.binding.dispose();
        });
      }
    }
    function ts(n) {
      return n instanceof $n ? n.apiSet_ : n instanceof Ge ? n.rackApi_.apiSet_ : null;
    }
    function un(n, e) {
      const t = n.find((l) => l.controller_ === e);
      if (!t)
        throw S2.shouldNeverHappen();
      return t;
    }
    function ns(n, e, t) {
      if (!R2.isBindable(n))
        throw S2.notBindable();
      return new R2(n, e, t);
    }
    class $n extends a {
      constructor(e, t) {
        super(e), this.onRackAdd_ = this.onRackAdd_.bind(this), this.onRackRemove_ = this.onRackRemove_.bind(this), this.onRackInputChange_ = this.onRackInputChange_.bind(this), this.onRackMonitorUpdate_ = this.onRackMonitorUpdate_.bind(this), this.emitter_ = new F(), this.apiSet_ = new Lt(ts), this.pool_ = t;
        const l = this.controller_.rack;
        l.emitter.on("add", this.onRackAdd_), l.emitter.on("remove", this.onRackRemove_), l.emitter.on("inputchange", this.onRackInputChange_), l.emitter.on("monitorupdate", this.onRackMonitorUpdate_), l.children.forEach((v) => {
          this.setUpApi_(v);
        });
      }
      get children() {
        return this.controller_.rack.children.map((e) => un(this.apiSet_, e));
      }
      addInput(e, t, l) {
        const v = l ?? {}, E = this.controller_.view.element.ownerDocument, k2 = this.pool_.createInput(E, ns(e, t, v.presetKey), v), B2 = new mi(k2);
        return this.add(B2, v.index);
      }
      addMonitor(e, t, l) {
        const v = l ?? {}, E = this.controller_.view.element.ownerDocument, k2 = this.pool_.createMonitor(E, ns(e, t), v), B2 = new fi(k2);
        return this.add(B2, v.index);
      }
      addFolder(e) {
        return Hs(this, e);
      }
      addButton(e) {
        return Gs(this, e);
      }
      addSeparator(e) {
        return Ks(this, e);
      }
      addTab(e) {
        return di(this, e);
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
          const t = un(this.apiSet_, e.bladeController);
          this.apiSet_.remove(t);
        }
      }
      onRackInputChange_(e) {
        const t = e.bladeController;
        if (t instanceof Fe) {
          const l = un(this.apiSet_, t), v = t.binding;
          this.emitter_.emit("change", {
            event: new u(l, v.target.read(), v.target.presetKey, e.options.last)
          });
        } else if (t instanceof ie) {
          const l = un(this.apiSet_, t);
          this.emitter_.emit("change", {
            event: new u(l, t.value.rawValue, void 0, e.options.last)
          });
        }
      }
      onRackMonitorUpdate_(e) {
        if (!(e.bladeController instanceof rt2))
          throw S2.shouldNeverHappen();
        const t = un(this.apiSet_, e.bladeController), l = e.bladeController.binding;
        this.emitter_.emit("update", {
          event: new h2(t, l.target.read(), l.target.presetKey)
        });
      }
    }
    class vi extends Ge {
      constructor(e, t) {
        super(e, new $n(e.rackController, t)), this.emitter_ = new F(), this.controller_.foldable.value("expanded").emitter.on("change", (l) => {
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
        return this.emitter_.on(e, (v) => {
          l(v.event);
        }), this;
      }
    }
    class bi extends Mt {
      constructor(e) {
        super({
          blade: e.blade,
          view: e.view,
          viewProps: e.rackController.viewProps
        }), this.rackController = e.rackController;
      }
    }
    class $s {
      constructor(e, t) {
        const l = D(t.viewName);
        this.element = e.createElement("div"), this.element.classList.add(l()), t.viewProps.bindClassModifiers(this.element);
      }
    }
    function Xs(n, e) {
      for (let t = 0; t < n.length; t++) {
        const l = n[t];
        if (l instanceof Fe && l.binding === e)
          return l;
      }
      return null;
    }
    function Ys(n, e) {
      for (let t = 0; t < n.length; t++) {
        const l = n[t];
        if (l instanceof rt2 && l.binding === e)
          return l;
      }
      return null;
    }
    function qs(n, e) {
      for (let t = 0; t < n.length; t++) {
        const l = n[t];
        if (l instanceof ie && l.value === e)
          return l;
      }
      return null;
    }
    function gi(n) {
      return n instanceof hn ? n.rack : n instanceof bi ? n.rackController.rack : null;
    }
    function Qs(n) {
      const e = gi(n);
      return e ? e.bcSet_ : null;
    }
    class Zs {
      constructor(e) {
        var t, l;
        this.onBladePositionsChange_ = this.onBladePositionsChange_.bind(this), this.onSetAdd_ = this.onSetAdd_.bind(this), this.onSetRemove_ = this.onSetRemove_.bind(this), this.onChildDispose_ = this.onChildDispose_.bind(this), this.onChildPositionsChange_ = this.onChildPositionsChange_.bind(this), this.onChildInputChange_ = this.onChildInputChange_.bind(this), this.onChildMonitorUpdate_ = this.onChildMonitorUpdate_.bind(this), this.onChildValueChange_ = this.onChildValueChange_.bind(this), this.onChildViewPropsChange_ = this.onChildViewPropsChange_.bind(this), this.onDescendantLayout_ = this.onDescendantLayout_.bind(this), this.onDescendantInputChange_ = this.onDescendantInputChange_.bind(this), this.onDescendantMonitorUpdate_ = this.onDescendantMonitorUpdate_.bind(this), this.emitter = new F(), this.blade_ = (t = e.blade) !== null && t !== void 0 ? t : null, (l = this.blade_) === null || l === void 0 || l.value("positions").emitter.on("change", this.onBladePositionsChange_), this.viewProps = e.viewProps, this.bcSet_ = new Lt(Qs), this.bcSet_.emitter.on("add", this.onSetAdd_), this.bcSet_.emitter.on("remove", this.onSetRemove_);
      }
      get children() {
        return this.bcSet_.items;
      }
      add(e, t) {
        var l;
        (l = e.parent) === null || l === void 0 || l.remove(e), C(e, "parent") ? e.parent = this : (e.parent_ = this, Ve({
          key: "parent",
          target: "BladeController",
          place: "BladeRack.add"
        })), this.bcSet_.add(e, t);
      }
      remove(e) {
        C(e, "parent") ? e.parent = null : (e.parent_ = null, Ve({
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
        if (l.viewProps.emitter.on("change", this.onChildViewPropsChange_), l.blade.value("positions").emitter.on("change", this.onChildPositionsChange_), l.viewProps.handleDispose(this.onChildDispose_), l instanceof Fe)
          l.binding.emitter.on("change", this.onChildInputChange_);
        else if (l instanceof rt2)
          l.binding.emitter.on("update", this.onChildMonitorUpdate_);
        else if (l instanceof ie)
          l.value.emitter.on("change", this.onChildValueChange_);
        else {
          const v = gi(l);
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
        if (l instanceof Fe)
          l.binding.emitter.off("change", this.onChildInputChange_);
        else if (l instanceof rt2)
          l.binding.emitter.off("update", this.onChildMonitorUpdate_);
        else if (l instanceof ie)
          l.value.emitter.off("change", this.onChildValueChange_);
        else {
          const v = gi(l);
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
        const t = Xs(this.find(Fe), e.sender);
        if (!t)
          throw S2.alreadyDisposed();
        this.emitter.emit("inputchange", {
          bladeController: t,
          options: e.options,
          sender: this
        });
      }
      onChildMonitorUpdate_(e) {
        const t = Ys(this.find(rt2), e.sender);
        if (!t)
          throw S2.alreadyDisposed();
        this.emitter.emit("monitorupdate", {
          bladeController: t,
          sender: this
        });
      }
      onChildValueChange_(e) {
        const t = qs(this.find(ie), e.sender);
        if (!t)
          throw S2.alreadyDisposed();
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
    class hn extends Mt {
      constructor(e, t) {
        super(Object.assign(Object.assign({}, t), { view: new $s(e, {
          viewName: "brk",
          viewProps: t.viewProps
        }) })), this.onRackAdd_ = this.onRackAdd_.bind(this), this.onRackRemove_ = this.onRackRemove_.bind(this);
        const l = new Zs({
          blade: t.root ? void 0 : t.blade,
          viewProps: t.viewProps
        });
        l.emitter.on("add", this.onRackAdd_), l.emitter.on("remove", this.onRackRemove_), this.rack = l, this.viewProps.handleDispose(() => {
          for (let v = this.rack.children.length - 1; v >= 0; v--)
            this.rack.children[v].viewProps.set("disposed", true);
        });
      }
      onRackAdd_(e) {
        e.isRoot && St(this.view.element, e.bladeController.view.element, e.index);
      }
      onRackRemove_(e) {
        e.isRoot && Hn(e.bladeController.view.element);
      }
    }
    const is = D("cnt");
    class Ws {
      constructor(e, t) {
        var l;
        this.className_ = D((l = t.viewName) !== null && l !== void 0 ? l : "fld"), this.element = e.createElement("div"), this.element.classList.add(this.className_(), is()), t.viewProps.bindClassModifiers(this.element), this.foldable_ = t.foldable, this.foldable_.bindExpandedClass(this.element, this.className_(void 0, "expanded")), O(this.foldable_, "completed", K(this.element, this.className_(void 0, "cpl")));
        const v = e.createElement("button");
        v.classList.add(this.className_("b")), O(t.props, "title", (J) => {
          _(J) ? this.element.classList.add(this.className_(void 0, "not")) : this.element.classList.remove(this.className_(void 0, "not"));
        }), t.viewProps.bindDisabled(v), this.element.appendChild(v), this.buttonElement = v;
        const E = e.createElement("div");
        E.classList.add(this.className_("i")), this.element.appendChild(E);
        const k2 = e.createElement("div");
        k2.classList.add(this.className_("t")), q(t.props.value("title"), k2), this.buttonElement.appendChild(k2), this.titleElement = k2;
        const B2 = e.createElement("div");
        B2.classList.add(this.className_("m")), this.buttonElement.appendChild(B2);
        const Q = t.containerElement;
        Q.classList.add(this.className_("c")), this.element.appendChild(Q), this.containerElement = Q;
      }
    }
    class Xn extends bi {
      constructor(e, t) {
        var l;
        const v = De.create((l = t.expanded) !== null && l !== void 0 ? l : true), E = new hn(e, {
          blade: t.blade,
          root: t.root,
          viewProps: t.viewProps
        });
        super(Object.assign(Object.assign({}, t), { rackController: E, view: new Ws(e, {
          containerElement: E.view.element,
          foldable: v,
          props: t.props,
          viewName: t.root ? "rot" : void 0,
          viewProps: t.viewProps
        }) })), this.onTitleClick_ = this.onTitleClick_.bind(this), this.props = t.props, this.foldable = v, Ue(this.foldable, this.view.containerElement), this.rackController.rack.emitter.on("add", () => {
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
    const Js = {
      id: "folder",
      type: "blade",
      accept(n) {
        const e = M, t = le2(n, {
          title: e.required.string,
          view: e.required.constant("folder"),
          expanded: e.optional.boolean
        });
        return t ? { params: t } : null;
      },
      controller(n) {
        return new Xn(n.document, {
          blade: n.blade,
          expanded: n.params.expanded,
          props: X.fromObject({
            title: n.params.title
          }),
          viewProps: n.viewProps
        });
      },
      api(n) {
        return n.controller instanceof Xn ? new vi(n.controller, n.pool) : null;
      }
    };
    class Gt extends ie {
      constructor(e, t) {
        const l = t.valueController.viewProps;
        super(Object.assign(Object.assign({}, t), { value: t.valueController.value, view: new A2(e, {
          props: t.props,
          viewProps: l
        }), viewProps: l })), this.props = t.props, this.valueController = t.valueController, this.view.valueElement.appendChild(this.valueController.view.element);
      }
    }
    class ss extends a {
    }
    const _i = D("spr");
    class er {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(_i()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("hr");
        l.classList.add(_i("r")), this.element.appendChild(l);
      }
    }
    class dn extends Mt {
      constructor(e, t) {
        super(Object.assign(Object.assign({}, t), { view: new er(e, {
          viewProps: t.viewProps
        }) }));
      }
    }
    const tr = {
      id: "separator",
      type: "blade",
      accept(n) {
        const t = le2(n, {
          view: M.required.constant("separator")
        });
        return t ? { params: t } : null;
      },
      controller(n) {
        return new dn(n.document, {
          blade: n.blade,
          viewProps: n.viewProps
        });
      },
      api(n) {
        return n.controller instanceof dn ? new ss(n.controller) : null;
      }
    }, Le = D("tbi");
    class nr {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(Le()), t.viewProps.bindClassModifiers(this.element), O(t.props, "selected", (E) => {
          E ? this.element.classList.add(Le(void 0, "sel")) : this.element.classList.remove(Le(void 0, "sel"));
        });
        const l = e.createElement("button");
        l.classList.add(Le("b")), t.viewProps.bindDisabled(l), this.element.appendChild(l), this.buttonElement = l;
        const v = e.createElement("div");
        v.classList.add(Le("t")), q(t.props.value("title"), v), this.buttonElement.appendChild(v), this.titleElement = v;
      }
    }
    class Yn {
      constructor(e, t) {
        this.emitter = new F(), this.onClick_ = this.onClick_.bind(this), this.props = t.props, this.viewProps = t.viewProps, this.view = new nr(e, {
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
    class rs {
      constructor(e, t) {
        this.onItemClick_ = this.onItemClick_.bind(this), this.ic_ = new Yn(e, {
          props: t.itemProps,
          viewProps: Xe2.create()
        }), this.ic_.emitter.on("click", this.onItemClick_), this.cc_ = new hn(e, {
          blade: ye(),
          viewProps: Xe2.create()
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
    class wi {
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
    class os extends Ge {
      constructor(e, t) {
        super(e, new $n(e.rackController, t)), this.onPageAdd_ = this.onPageAdd_.bind(this), this.onPageRemove_ = this.onPageRemove_.bind(this), this.onSelect_ = this.onSelect_.bind(this), this.emitter_ = new F(), this.pageApiMap_ = /* @__PURE__ */ new Map(), this.rackApi_.on("change", (l) => {
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
            throw S2.shouldNeverHappen();
          return t;
        });
      }
      addPage(e) {
        const t = this.controller_.view.element.ownerDocument, l = new rs(t, {
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
          throw S2.shouldNeverHappen();
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
          throw S2.shouldNeverHappen();
        const l = new wi(e, t);
        this.pageApiMap_.set(e, l);
      }
      onPageAdd_(e) {
        this.setUpPageApi_(e.item);
      }
      onPageRemove_(e) {
        if (!this.pageApiMap_.get(e.item))
          throw S2.shouldNeverHappen();
        this.pageApiMap_.delete(e.item);
      }
      onSelect_(e) {
        this.emitter_.emit("select", {
          event: new g(this, e.rawValue)
        });
      }
    }
    const as = -1;
    class ir {
      constructor() {
        this.onItemSelectedChange_ = this.onItemSelectedChange_.bind(this), this.empty = ee2(true), this.selectedIndex = ee2(as), this.items_ = [];
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
          this.selectedIndex.rawValue = as, this.empty.rawValue = true;
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
        this.element = e.createElement("div"), this.element.classList.add(Ht(), is()), t.viewProps.bindClassModifiers(this.element), N(t.empty, K(this.element, Ht(void 0, "nop")));
        const l = e.createElement("div");
        l.classList.add(Ht("t")), this.element.appendChild(l), this.itemsElement = l;
        const v = e.createElement("div");
        v.classList.add(Ht("i")), this.element.appendChild(v);
        const E = t.contentsElement;
        E.classList.add(Ht("c")), this.element.appendChild(E), this.contentsElement = E;
      }
    }
    class mn extends bi {
      constructor(e, t) {
        const l = new hn(e, {
          blade: t.blade,
          viewProps: t.viewProps
        }), v = new ir();
        super({
          blade: t.blade,
          rackController: l,
          view: new Kt(e, {
            contentsElement: l.view.element,
            empty: v.empty,
            viewProps: t.viewProps
          })
        }), this.onPageAdd_ = this.onPageAdd_.bind(this), this.onPageRemove_ = this.onPageRemove_.bind(this), this.pageSet_ = new Lt(() => null), this.pageSet_.emitter.on("add", this.onPageAdd_), this.pageSet_.emitter.on("remove", this.onPageRemove_), this.tab = v;
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
        Hn(t.itemController.view.element), t.itemController.viewProps.set("parent", null), this.rackController.rack.remove(t.contentController), this.tab.remove(t.props.value("selected"));
      }
    }
    const yi = {
      id: "tab",
      type: "blade",
      accept(n) {
        const e = M, t = le2(n, {
          pages: e.required.array(e.required.object({ title: e.required.string })),
          view: e.required.constant("tab")
        });
        return !t || t.pages.length === 0 ? null : { params: t };
      },
      controller(n) {
        const e = new mn(n.document, {
          blade: n.blade,
          viewProps: n.viewProps
        });
        return n.params.pages.forEach((t) => {
          const l = new rs(n.document, {
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
        return n.controller instanceof mn ? new os(n.controller, n.pool) : null;
      }
    };
    function sr(n, e) {
      const t = n.accept(e.params);
      if (!t)
        return null;
      const l = M.optional.boolean(e.params.disabled).value, v = M.optional.boolean(e.params.hidden).value;
      return n.controller({
        blade: ye(),
        document: e.document,
        params: Object.assign(Object.assign({}, t.params), { disabled: l, hidden: v }),
        viewProps: Xe2.create({
          disabled: l,
          hidden: v
        })
      });
    }
    class ls {
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
    class xi {
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
    class qn {
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
    function Me(n, e) {
      for (; n.length < e; )
        n.push(void 0);
    }
    function cs(n) {
      const e = [];
      return Me(e, n), ee2(e);
    }
    function $t(n) {
      const e = n.indexOf(void 0);
      return e < 0 ? n : n.slice(0, e);
    }
    function Ye2(n, e) {
      const t = [...$t(n), e];
      return t.length > n.length ? t.splice(0, t.length - n.length) : Me(t, n.length), t;
    }
    class rr {
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
        this.value.rawValue = Ye2(t, l), this.emitter.emit("update", {
          rawValue: l,
          sender: this
        });
      }
      onTick_(e) {
        this.read();
      }
    }
    class fn {
      constructor(e) {
        this.constraints = e;
      }
      constrain(e) {
        return this.constraints.reduce((t, l) => l.constrain(t), e);
      }
    }
    function et2(n, e) {
      if (n instanceof e)
        return n;
      if (n instanceof fn) {
        const t = n.constraints.reduce((l, v) => l || (v instanceof e ? v : null), null);
        if (t)
          return t;
      }
      return null;
    }
    class Xt {
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
    class vn {
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
    class Ei {
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
    class Qn {
      constructor(e, t = 0) {
        this.step = e, this.origin = t;
      }
      constrain(e) {
        const t = this.origin % this.step, l = Math.round((e - t) / this.step);
        return t + l * this.step;
      }
    }
    const Yt = D("lst");
    class ps {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.props_ = t.props, this.element = e.createElement("div"), this.element.classList.add(Yt()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("select");
        l.classList.add(Yt("s")), O(this.props_, "options", (E) => {
          cn(l), E.forEach((k2, B2) => {
            const Q = e.createElement("option");
            Q.dataset.index = String(B2), Q.textContent = k2.text, Q.value = String(k2.value), l.appendChild(Q);
          });
        }), t.viewProps.bindDisabled(l), this.element.appendChild(l), this.selectElement = l;
        const v = e.createElement("div");
        v.classList.add(Yt("m")), v.appendChild(yt(e, "dropdown")), this.element.appendChild(v), t.value.emitter.on("change", this.onValueChange_), this.value_ = t.value, this.update_();
      }
      update_() {
        this.selectElement.value = String(this.value_.rawValue);
      }
      onValueChange_() {
        this.update_();
      }
    }
    class bn {
      constructor(e, t) {
        this.onSelectChange_ = this.onSelectChange_.bind(this), this.props = t.props, this.value = t.value, this.viewProps = t.viewProps, this.view = new ps(e, {
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
    const us = D("pop");
    class or {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(us()), t.viewProps.bindClassModifiers(this.element), N(t.shows, K(this.element, us(void 0, "v")));
      }
    }
    class hs {
      constructor(e, t) {
        this.shows = ee2(false), this.viewProps = t.viewProps, this.view = new or(e, {
          shows: this.shows,
          viewProps: this.viewProps
        });
      }
    }
    const ds = D("txt");
    class ar {
      constructor(e, t) {
        this.onChange_ = this.onChange_.bind(this), this.element = e.createElement("div"), this.element.classList.add(ds()), t.viewProps.bindClassModifiers(this.element), this.props_ = t.props, this.props_.emitter.on("change", this.onChange_);
        const l = e.createElement("input");
        l.classList.add(ds("i")), l.type = "text", t.viewProps.bindDisabled(l), this.element.appendChild(l), this.inputElement = l, t.value.emitter.on("change", this.onChange_), this.value_ = t.value, this.refresh();
      }
      refresh() {
        const e = this.props_.get("formatter");
        this.inputElement.value = e(this.value_.rawValue);
      }
      onChange_() {
        this.refresh();
      }
    }
    class Zn {
      constructor(e, t) {
        this.onInputChange_ = this.onInputChange_.bind(this), this.parser_ = t.parser, this.props = t.props, this.value = t.value, this.viewProps = t.viewProps, this.view = new ar(e, {
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
    function lr(n) {
      return String(n);
    }
    function ms(n) {
      return n === "false" ? false : !!n;
    }
    function fs(n) {
      return lr(n);
    }
    class cr {
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
    const pr = {
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
    class ur {
      constructor(e, t, l) {
        this.left = t, this.operator = e, this.right = l;
      }
      evaluate() {
        const e = pr[this.operator];
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
    const vs = {
      "+": (n) => n,
      "-": (n) => -n,
      "~": (n) => ~n
    };
    class hr {
      constructor(e, t) {
        this.operator = e, this.expression = t;
      }
      evaluate() {
        const e = vs[this.operator];
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
    function Rt(n, e) {
      var t;
      const l = n.substr(e).match(/^\s+/);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function dr(n, e) {
      const t = n.substr(e, 1);
      return t.match(/^[1-9]$/) ? t : "";
    }
    function gn(n, e) {
      var t;
      const l = n.substr(e).match(/^[0-9]+/);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function mr(n, e) {
      const t = gn(n, e);
      if (t !== "")
        return t;
      const l = n.substr(e, 1);
      if (e += 1, l !== "-" && l !== "+")
        return "";
      const v = gn(n, e);
      return v === "" ? "" : l + v;
    }
    function ot2(n, e) {
      const t = n.substr(e, 1);
      if (e += 1, t.toLowerCase() !== "e")
        return "";
      const l = mr(n, e);
      return l === "" ? "" : t + l;
    }
    function bs(n, e) {
      const t = n.substr(e, 1);
      if (t === "0")
        return t;
      const l = dr(n, e);
      return e += l.length, l === "" ? "" : l + gn(n, e);
    }
    function fr(n, e) {
      const t = bs(n, e);
      if (e += t.length, t === "")
        return "";
      const l = n.substr(e, 1);
      if (e += l.length, l !== ".")
        return "";
      const v = gn(n, e);
      return e += v.length, t + l + v + ot2(n, e);
    }
    function gs(n, e) {
      const t = n.substr(e, 1);
      if (e += t.length, t !== ".")
        return "";
      const l = gn(n, e);
      return e += l.length, l === "" ? "" : t + l + ot2(n, e);
    }
    function vr(n, e) {
      const t = bs(n, e);
      return e += t.length, t === "" ? "" : t + ot2(n, e);
    }
    const _s = Ci([
      fr,
      gs,
      vr
    ]);
    function Pi(n, e) {
      var t;
      const l = n.substr(e).match(/^[01]+/);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function br(n, e) {
      const t = n.substr(e, 2);
      if (e += t.length, t.toLowerCase() !== "0b")
        return "";
      const l = Pi(n, e);
      return l === "" ? "" : t + l;
    }
    function ws(n, e) {
      var t;
      const l = n.substr(e).match(/^[0-7]+/);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function qe2(n, e) {
      const t = n.substr(e, 2);
      if (e += t.length, t.toLowerCase() !== "0o")
        return "";
      const l = ws(n, e);
      return l === "" ? "" : t + l;
    }
    function gr(n, e) {
      var t;
      const l = n.substr(e).match(/^[0-9a-f]+/i);
      return (t = l && l[0]) !== null && t !== void 0 ? t : "";
    }
    function _r(n, e) {
      const t = n.substr(e, 2);
      if (e += t.length, t.toLowerCase() !== "0x")
        return "";
      const l = gr(n, e);
      return l === "" ? "" : t + l;
    }
    const Ti = Ci([
      br,
      qe2,
      _r
    ]), wr = Ci([
      Ti,
      _s
    ]);
    function Et(n, e) {
      const t = wr(n, e);
      return e += t.length, t === "" ? null : {
        evaluable: new cr(t),
        cursor: e
      };
    }
    function ki(n, e) {
      const t = n.substr(e, 1);
      if (e += t.length, t !== "(")
        return null;
      const l = Wn(n, e);
      if (!l)
        return null;
      e = l.cursor, e += Rt(n, e).length;
      const v = n.substr(e, 1);
      return e += v.length, v !== ")" ? null : {
        evaluable: l.evaluable,
        cursor: e
      };
    }
    function yr(n, e) {
      var t;
      return (t = Et(n, e)) !== null && t !== void 0 ? t : ki(n, e);
    }
    function Mi(n, e) {
      const t = yr(n, e);
      if (t)
        return t;
      const l = n.substr(e, 1);
      if (e += l.length, l !== "+" && l !== "-" && l !== "~")
        return null;
      const v = Mi(n, e);
      return v ? (e = v.cursor, {
        cursor: e,
        evaluable: new hr(l, v.evaluable)
      }) : null;
    }
    function xr(n, e, t) {
      t += Rt(e, t).length;
      const l = n.filter((v) => e.startsWith(v, t))[0];
      return l ? (t += l.length, t += Rt(e, t).length, {
        cursor: t,
        operator: l
      }) : null;
    }
    function It(n, e) {
      return (t, l) => {
        const v = n(t, l);
        if (!v)
          return null;
        l = v.cursor;
        let E = v.evaluable;
        for (; ; ) {
          const k2 = xr(e, t, l);
          if (!k2)
            break;
          l = k2.cursor;
          const B2 = n(t, l);
          if (!B2)
            return null;
          l = B2.cursor, E = new ur(k2.operator, E, B2.evaluable);
        }
        return E ? {
          cursor: l,
          evaluable: E
        } : null;
      };
    }
    const ys = [
      ["**"],
      ["*", "/", "%"],
      ["+", "-"],
      ["<<", ">>>", ">>"],
      ["&"],
      ["^"],
      ["|"]
    ].reduce((n, e) => It(n, e), Mi);
    function Wn(n, e) {
      return e += Rt(n, e).length, ys(n, e);
    }
    function xs(n) {
      const e = Wn(n, 0);
      return !e || e.cursor + Rt(n, e.cursor).length !== n.length ? null : e.evaluable;
    }
    function at2(n) {
      var e;
      const t = xs(n);
      return (e = t == null ? void 0 : t.evaluate()) !== null && e !== void 0 ? e : null;
    }
    function vt(n) {
      if (typeof n == "number")
        return n;
      if (typeof n == "string") {
        const e = at2(n);
        if (!_(e))
          return e;
      }
      return 0;
    }
    function Er(n) {
      return String(n);
    }
    function Re(n) {
      return (e) => e.toFixed(Math.max(Math.min(n, 20), 0));
    }
    const Es = Re(0);
    function _n(n) {
      return Es(n) + "%";
    }
    function Si(n) {
      return String(n);
    }
    function Ct(n) {
      return n;
    }
    function qt({ primary: n, secondary: e, forward: t, backward: l }) {
      let v = false;
      function E(k2) {
        v || (v = true, k2(), v = false);
      }
      n.emitter.on("change", (k2) => {
        E(() => {
          e.setRawValue(t(n, e), k2.options);
        });
      }), e.emitter.on("change", (k2) => {
        E(() => {
          n.setRawValue(l(n, e), k2.options);
        }), E(() => {
          e.setRawValue(t(n, e), k2.options);
        });
      }), E(() => {
        e.setRawValue(t(n, e), {
          forceEmit: false,
          last: true
        });
      });
    }
    function Oe(n, e) {
      const t = n * (e.altKey ? 0.1 : 1) * (e.shiftKey ? 10 : 1);
      return e.upKey ? +t : e.downKey ? -t : 0;
    }
    function wn(n) {
      return {
        altKey: n.altKey,
        downKey: n.key === "ArrowDown",
        shiftKey: n.shiftKey,
        upKey: n.key === "ArrowUp"
      };
    }
    function lt2(n) {
      return {
        altKey: n.altKey,
        downKey: n.key === "ArrowLeft",
        shiftKey: n.shiftKey,
        upKey: n.key === "ArrowRight"
      };
    }
    function Cs(n) {
      return n === "ArrowUp" || n === "ArrowDown";
    }
    function Jn(n) {
      return Cs(n) || n === "ArrowLeft" || n === "ArrowRight";
    }
    function Ai(n, e) {
      var t, l;
      const v = e.ownerDocument.defaultView, E = e.getBoundingClientRect();
      return {
        x: n.pageX - (((t = v && v.scrollX) !== null && t !== void 0 ? t : 0) + E.left),
        y: n.pageY - (((l = v && v.scrollY) !== null && l !== void 0 ? l : 0) + E.top)
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
          data: this.computePosition_(Ai(e, this.elem_)),
          sender: this,
          shiftKey: e.shiftKey
        });
      }
      onDocumentMouseMove_(e) {
        this.emitter.emit("move", {
          altKey: e.altKey,
          data: this.computePosition_(Ai(e, this.elem_)),
          sender: this,
          shiftKey: e.shiftKey
        });
      }
      onDocumentMouseUp_(e) {
        const t = this.elem_.ownerDocument;
        t.removeEventListener("mousemove", this.onDocumentMouseMove_), t.removeEventListener("mouseup", this.onDocumentMouseUp_), this.emitter.emit("up", {
          altKey: e.altKey,
          data: this.computePosition_(Ai(e, this.elem_)),
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
    function _e(n, e, t, l, v) {
      const E = (n - e) / (t - e);
      return l + E * (v - l);
    }
    function Li(n) {
      return String(n.toFixed(10)).split(".")[1].replace(/0+$/, "").length;
    }
    function Se(n, e, t) {
      return Math.min(Math.max(n, e), t);
    }
    function Qt(n, e) {
      return (n % e + e) % e;
    }
    const He = D("txt");
    class Ri {
      constructor(e, t) {
        this.onChange_ = this.onChange_.bind(this), this.props_ = t.props, this.props_.emitter.on("change", this.onChange_), this.element = e.createElement("div"), this.element.classList.add(He(), He(void 0, "num")), t.arrayPosition && this.element.classList.add(He(void 0, t.arrayPosition)), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("input");
        l.classList.add(He("i")), l.type = "text", t.viewProps.bindDisabled(l), this.element.appendChild(l), this.inputElement = l, this.onDraggingChange_ = this.onDraggingChange_.bind(this), this.dragging_ = t.dragging, this.dragging_.emitter.on("change", this.onDraggingChange_), this.element.classList.add(He()), this.inputElement.classList.add(He("i"));
        const v = e.createElement("div");
        v.classList.add(He("k")), this.element.appendChild(v), this.knobElement = v;
        const E = e.createElementNS(ze, "svg");
        E.classList.add(He("g")), this.knobElement.appendChild(E);
        const k2 = e.createElementNS(ze, "path");
        k2.classList.add(He("gb")), E.appendChild(k2), this.guideBodyElem_ = k2;
        const B2 = e.createElementNS(ze, "path");
        B2.classList.add(He("gh")), E.appendChild(B2), this.guideHeadElem_ = B2;
        const Q = e.createElement("div");
        Q.classList.add(D("tt")()), this.knobElement.appendChild(Q), this.tooltipElem_ = Q, t.value.emitter.on("change", this.onChange_), this.value = t.value, this.refresh();
      }
      onDraggingChange_(e) {
        if (e.rawValue === null) {
          this.element.classList.remove(He(void 0, "drg"));
          return;
        }
        this.element.classList.add(He(void 0, "drg"));
        const t = e.rawValue / this.props_.get("draggingScale"), l = t + (t > 0 ? -1 : t < 0 ? 1 : 0), v = Se(-l, -4, 4);
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
    class yn {
      constructor(e, t) {
        var l;
        this.originRawValue_ = 0, this.onInputChange_ = this.onInputChange_.bind(this), this.onInputKeyDown_ = this.onInputKeyDown_.bind(this), this.onInputKeyUp_ = this.onInputKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.baseStep_ = t.baseStep, this.parser_ = t.parser, this.props = t.props, this.sliderProps_ = (l = t.sliderProps) !== null && l !== void 0 ? l : null, this.value = t.value, this.viewProps = t.viewProps, this.dragging_ = ee2(null), this.view = new Ri(e, {
          arrayPosition: t.arrayPosition,
          dragging: this.dragging_,
          props: this.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_), this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_), this.view.inputElement.addEventListener("keyup", this.onInputKeyUp_);
        const v = new Vt(this.view.knobElement);
        v.emitter.on("down", this.onPointerDown_), v.emitter.on("move", this.onPointerMove_), v.emitter.on("up", this.onPointerUp_);
      }
      constrainValue_(e) {
        var t, l;
        const v = (t = this.sliderProps_) === null || t === void 0 ? void 0 : t.get("minValue"), E = (l = this.sliderProps_) === null || l === void 0 ? void 0 : l.get("maxValue");
        let k2 = e;
        return v !== void 0 && (k2 = Math.max(k2, v)), E !== void 0 && (k2 = Math.min(k2, E)), k2;
      }
      onInputChange_(e) {
        const l = e.currentTarget.value, v = this.parser_(l);
        _(v) || (this.value.rawValue = this.constrainValue_(v)), this.view.refresh();
      }
      onInputKeyDown_(e) {
        const t = Oe(this.baseStep_, wn(e));
        t !== 0 && this.value.setRawValue(this.constrainValue_(this.value.rawValue + t), {
          forceEmit: false,
          last: false
        });
      }
      onInputKeyUp_(e) {
        Oe(this.baseStep_, wn(e)) !== 0 && this.value.setRawValue(this.value.rawValue, {
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
    const Ii = D("sld");
    class Ke2 {
      constructor(e, t) {
        this.onChange_ = this.onChange_.bind(this), this.props_ = t.props, this.props_.emitter.on("change", this.onChange_), this.element = e.createElement("div"), this.element.classList.add(Ii()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(Ii("t")), t.viewProps.bindTabIndex(l), this.element.appendChild(l), this.trackElement = l;
        const v = e.createElement("div");
        v.classList.add(Ii("k")), this.trackElement.appendChild(v), this.knobElement = v, t.value.emitter.on("change", this.onChange_), this.value = t.value, this.update_();
      }
      update_() {
        const e = Se(_e(this.value.rawValue, this.props_.get("minValue"), this.props_.get("maxValue"), 0, 100), 0, 100);
        this.knobElement.style.width = `${e}%`;
      }
      onChange_() {
        this.update_();
      }
    }
    class Vi {
      constructor(e, t) {
        this.onKeyDown_ = this.onKeyDown_.bind(this), this.onKeyUp_ = this.onKeyUp_.bind(this), this.onPointerDownOrMove_ = this.onPointerDownOrMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.baseStep_ = t.baseStep, this.value = t.value, this.viewProps = t.viewProps, this.props = t.props, this.view = new Ke2(e, {
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
        const t = Oe(this.baseStep_, lt2(e));
        t !== 0 && this.value.setRawValue(this.value.rawValue + t, {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(e) {
        Oe(this.baseStep_, lt2(e)) !== 0 && this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    const xn = D("sldtxt");
    class Di {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(xn());
        const l = e.createElement("div");
        l.classList.add(xn("s")), this.sliderView_ = t.sliderView, l.appendChild(this.sliderView_.element), this.element.appendChild(l);
        const v = e.createElement("div");
        v.classList.add(xn("t")), this.textView_ = t.textView, v.appendChild(this.textView_.element), this.element.appendChild(v);
      }
    }
    class ei {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.sliderC_ = new Vi(e, {
          baseStep: t.baseStep,
          props: t.sliderProps,
          value: t.value,
          viewProps: this.viewProps
        }), this.textC_ = new yn(e, {
          baseStep: t.baseStep,
          parser: t.parser,
          props: t.textProps,
          sliderProps: t.sliderProps,
          value: t.value,
          viewProps: t.viewProps
        }), this.view = new Di(e, {
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
    function tt2(n, e) {
      n.write(e);
    }
    function En(n) {
      const e = M;
      if (Array.isArray(n))
        return e.required.array(e.required.object({
          text: e.required.string,
          value: e.required.raw
        }))(n).value;
      if (typeof n == "object")
        return e.required.raw(n).value;
    }
    function Oi(n) {
      if (n === "inline" || n === "popup")
        return n;
    }
    function bt(n) {
      const e = M;
      return e.required.object({
        max: e.optional.number,
        min: e.optional.number,
        step: e.optional.number
      })(n).value;
    }
    function Ps(n) {
      if (Array.isArray(n))
        return n;
      const e = [];
      return Object.keys(n).forEach((t) => {
        e.push({ text: t, value: n[t] });
      }), e;
    }
    function Ni(n) {
      return _(n) ? null : new vn(Ps(n));
    }
    function Cr(n) {
      const e = n ? et2(n, Qn) : null;
      return e ? e.step : null;
    }
    function ti(n, e) {
      const t = n && et2(n, Qn);
      return t ? Li(t.step) : Math.max(Li(e), 2);
    }
    function Dt(n) {
      const e = Cr(n);
      return e ?? 1;
    }
    function Ot(n, e) {
      var t;
      const l = n && et2(n, Qn), v = Math.abs((t = l == null ? void 0 : l.step) !== null && t !== void 0 ? t : e);
      return v === 0 ? 0.1 : Math.pow(10, Math.floor(Math.log10(v)) - 1);
    }
    const Cn = D("ckb");
    class Pn {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.element = e.createElement("div"), this.element.classList.add(Cn()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("label");
        l.classList.add(Cn("l")), this.element.appendChild(l);
        const v = e.createElement("input");
        v.classList.add(Cn("i")), v.type = "checkbox", l.appendChild(v), this.inputElement = v, t.viewProps.bindDisabled(this.inputElement);
        const E = e.createElement("div");
        E.classList.add(Cn("w")), l.appendChild(E);
        const k2 = yt(e, "check");
        E.appendChild(k2), t.value.emitter.on("change", this.onValueChange_), this.value = t.value, this.update_();
      }
      update_() {
        this.inputElement.checked = this.value.rawValue;
      }
      onValueChange_() {
        this.update_();
      }
    }
    class Ts {
      constructor(e, t) {
        this.onInputChange_ = this.onInputChange_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.view = new Pn(e, {
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_);
      }
      onInputChange_(e) {
        const t = e.currentTarget;
        this.value.rawValue = t.checked;
      }
    }
    function ks(n) {
      const e = [], t = Ni(n.options);
      return t && e.push(t), new fn(e);
    }
    const ni = {
      id: "input-bool",
      type: "input",
      accept: (n, e) => {
        if (typeof n != "boolean")
          return null;
        const l = le2(e, {
          options: M.optional.custom(En)
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => ms,
        constraint: (n) => ks(n.params),
        writer: (n) => tt2
      },
      controller: (n) => {
        const e = n.document, t = n.value, l = n.constraint, v = l && et2(l, vn);
        return v ? new bn(e, {
          props: new X({
            options: v.values.value("options")
          }),
          value: t,
          viewProps: n.viewProps
        }) : new Ts(e, {
          value: t,
          viewProps: n.viewProps
        });
      }
    }, Nt = D("col");
    class Fi {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(Nt()), t.foldable.bindExpandedClass(this.element, Nt(void 0, "expanded")), O(t.foldable, "completed", K(this.element, Nt(void 0, "cpl")));
        const l = e.createElement("div");
        l.classList.add(Nt("h")), this.element.appendChild(l);
        const v = e.createElement("div");
        v.classList.add(Nt("s")), l.appendChild(v), this.swatchElement = v;
        const E = e.createElement("div");
        if (E.classList.add(Nt("t")), l.appendChild(E), this.textElement = E, t.pickerLayout === "inline") {
          const k2 = e.createElement("div");
          k2.classList.add(Nt("p")), this.element.appendChild(k2), this.pickerElement = k2;
        } else
          this.pickerElement = null;
      }
    }
    function Pr(n, e, t) {
      const l = Se(n / 255, 0, 1), v = Se(e / 255, 0, 1), E = Se(t / 255, 0, 1), k2 = Math.max(l, v, E), B2 = Math.min(l, v, E), Q = k2 - B2;
      let J = 0, de = 0;
      const ve = (B2 + k2) / 2;
      return Q !== 0 && (de = Q / (1 - Math.abs(k2 + B2 - 1)), l === k2 ? J = (v - E) / Q : v === k2 ? J = 2 + (E - l) / Q : J = 4 + (l - v) / Q, J = J / 6 + (J < 0 ? 1 : 0)), [J * 360, de * 100, ve * 100];
    }
    function Tr(n, e, t) {
      const l = (n % 360 + 360) % 360, v = Se(e / 100, 0, 1), E = Se(t / 100, 0, 1), k2 = (1 - Math.abs(2 * E - 1)) * v, B2 = k2 * (1 - Math.abs(l / 60 % 2 - 1)), Q = E - k2 / 2;
      let J, de, ve;
      return l >= 0 && l < 60 ? [J, de, ve] = [k2, B2, 0] : l >= 60 && l < 120 ? [J, de, ve] = [B2, k2, 0] : l >= 120 && l < 180 ? [J, de, ve] = [0, k2, B2] : l >= 180 && l < 240 ? [J, de, ve] = [0, B2, k2] : l >= 240 && l < 300 ? [J, de, ve] = [B2, 0, k2] : [J, de, ve] = [k2, 0, B2], [(J + Q) * 255, (de + Q) * 255, (ve + Q) * 255];
    }
    function kr(n, e, t) {
      const l = Se(n / 255, 0, 1), v = Se(e / 255, 0, 1), E = Se(t / 255, 0, 1), k2 = Math.max(l, v, E), B2 = Math.min(l, v, E), Q = k2 - B2;
      let J;
      Q === 0 ? J = 0 : k2 === l ? J = 60 * (((v - E) / Q % 6 + 6) % 6) : k2 === v ? J = 60 * ((E - l) / Q + 2) : J = 60 * ((l - v) / Q + 4);
      const de = k2 === 0 ? 0 : Q / k2, ve = k2;
      return [J, de * 100, ve * 100];
    }
    function Ms(n, e, t) {
      const l = Qt(n, 360), v = Se(e / 100, 0, 1), E = Se(t / 100, 0, 1), k2 = E * v, B2 = k2 * (1 - Math.abs(l / 60 % 2 - 1)), Q = E - k2;
      let J, de, ve;
      return l >= 0 && l < 60 ? [J, de, ve] = [k2, B2, 0] : l >= 60 && l < 120 ? [J, de, ve] = [B2, k2, 0] : l >= 120 && l < 180 ? [J, de, ve] = [0, k2, B2] : l >= 180 && l < 240 ? [J, de, ve] = [0, B2, k2] : l >= 240 && l < 300 ? [J, de, ve] = [B2, 0, k2] : [J, de, ve] = [k2, 0, B2], [(J + Q) * 255, (de + Q) * 255, (ve + Q) * 255];
    }
    function m(n, e, t) {
      const l = t + e * (100 - Math.abs(2 * t - 100)) / 200;
      return [
        n,
        l !== 0 ? e * (100 - Math.abs(2 * t - 100)) / l : 0,
        t + e * (100 - Math.abs(2 * t - 100)) / (2 * 100)
      ];
    }
    function o(n, e, t) {
      const l = 100 - Math.abs(t * (200 - e) / 100 - 100);
      return [n, l !== 0 ? e * t / l : 0, t * (200 - e) / (2 * 100)];
    }
    function p(n) {
      return [n[0], n[1], n[2]];
    }
    function f2(n, e) {
      return [n[0], n[1], n[2], e];
    }
    const x = {
      hsl: {
        hsl: (n, e, t) => [n, e, t],
        hsv: m,
        rgb: Tr
      },
      hsv: {
        hsl: o,
        hsv: (n, e, t) => [n, e, t],
        rgb: Ms
      },
      rgb: {
        hsl: Pr,
        hsv: kr,
        rgb: (n, e, t) => [n, e, t]
      }
    };
    function P(n, e) {
      return [
        e === "float" ? 1 : n === "rgb" ? 255 : 360,
        e === "float" ? 1 : n === "rgb" ? 255 : 100,
        e === "float" ? 1 : n === "rgb" ? 255 : 100
      ];
    }
    function L2(n, e) {
      return n === e ? e : Qt(n, e);
    }
    function z(n, e, t) {
      var l;
      const v = P(e, t);
      return [
        e === "rgb" ? Se(n[0], 0, v[0]) : L2(n[0], v[0]),
        Se(n[1], 0, v[1]),
        Se(n[2], 0, v[2]),
        Se((l = n[3]) !== null && l !== void 0 ? l : 1, 0, 1)
      ];
    }
    function oe(n, e, t, l) {
      const v = P(e, t), E = P(e, l);
      return n.map((k2, B2) => k2 / v[B2] * E[B2]);
    }
    function Qe2(n, e, t) {
      const l = oe(n, e.mode, e.type, "int"), v = x[e.mode][t.mode](...l);
      return oe(v, t.mode, "int", t.type);
    }
    function Ze2(n, e) {
      return typeof n != "object" || _(n) ? false : e in n && typeof n[e] == "number";
    }
    class te2 {
      static black(e = "int") {
        return new te2([0, 0, 0], "rgb", e);
      }
      static fromObject(e, t = "int") {
        const l = "a" in e ? [e.r, e.g, e.b, e.a] : [e.r, e.g, e.b];
        return new te2(l, "rgb", t);
      }
      static toRgbaObject(e, t = "int") {
        return e.toRgbaObject(t);
      }
      static isRgbColorObject(e) {
        return Ze2(e, "r") && Ze2(e, "g") && Ze2(e, "b");
      }
      static isRgbaColorObject(e) {
        return this.isRgbColorObject(e) && Ze2(e, "a");
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
      constructor(e, t, l = "int") {
        this.mode = t, this.type = l, this.comps_ = z(e, t, l);
      }
      getComponents(e, t = "int") {
        return f2(Qe2(p(this.comps_), { mode: this.mode, type: this.type }, { mode: e ?? this.mode, type: t }), this.comps_[3]);
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
    const Pt = D("colp");
    class Mr {
      constructor(e, t) {
        this.alphaViews_ = null, this.element = e.createElement("div"), this.element.classList.add(Pt()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(Pt("hsv"));
        const v = e.createElement("div");
        v.classList.add(Pt("sv")), this.svPaletteView_ = t.svPaletteView, v.appendChild(this.svPaletteView_.element), l.appendChild(v);
        const E = e.createElement("div");
        E.classList.add(Pt("h")), this.hPaletteView_ = t.hPaletteView, E.appendChild(this.hPaletteView_.element), l.appendChild(E), this.element.appendChild(l);
        const k2 = e.createElement("div");
        if (k2.classList.add(Pt("rgb")), this.textView_ = t.textView, k2.appendChild(this.textView_.element), this.element.appendChild(k2), t.alphaViews) {
          this.alphaViews_ = {
            palette: t.alphaViews.palette,
            text: t.alphaViews.text
          };
          const B2 = e.createElement("div");
          B2.classList.add(Pt("a"));
          const Q = e.createElement("div");
          Q.classList.add(Pt("ap")), Q.appendChild(this.alphaViews_.palette.element), B2.appendChild(Q);
          const J = e.createElement("div");
          J.classList.add(Pt("at")), J.appendChild(this.alphaViews_.text.element), B2.appendChild(J), this.element.appendChild(B2);
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
    function il(n) {
      return n === "int" ? "int" : n === "float" ? "float" : void 0;
    }
    function Sr(n) {
      const e = M;
      return le2(n, {
        alpha: e.optional.boolean,
        color: e.optional.object({
          alpha: e.optional.boolean,
          type: e.optional.custom(il)
        }),
        expanded: e.optional.boolean,
        picker: e.optional.custom(Oi)
      });
    }
    function Tn(n) {
      return n ? 0.1 : 1;
    }
    function kn(n) {
      var e;
      return (e = n.color) === null || e === void 0 ? void 0 : e.type;
    }
    function sl(n, e) {
      return n.alpha === e.alpha && n.mode === e.mode && n.notation === e.notation && n.type === e.type;
    }
    function ct2(n, e) {
      const t = n.match(/^(.+)%$/);
      return Math.min(t ? parseFloat(t[1]) * 0.01 * e : parseFloat(n), e);
    }
    const rl = {
      deg: (n) => n,
      grad: (n) => n * 360 / 400,
      rad: (n) => n * 360 / (2 * Math.PI),
      turn: (n) => n * 360
    };
    function wo(n) {
      const e = n.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);
      if (!e)
        return parseFloat(n);
      const t = parseFloat(e[1]), l = e[2];
      return rl[l](t);
    }
    function yo(n) {
      const e = n.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
      if (!e)
        return null;
      const t = [
        ct2(e[1], 255),
        ct2(e[2], 255),
        ct2(e[3], 255)
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) ? null : t;
    }
    function xo(n) {
      return (e) => {
        const t = yo(e);
        return t ? new te2(t, "rgb", n) : null;
      };
    }
    function Eo(n) {
      const e = n.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
      if (!e)
        return null;
      const t = [
        ct2(e[1], 255),
        ct2(e[2], 255),
        ct2(e[3], 255),
        ct2(e[4], 1)
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) || isNaN(t[3]) ? null : t;
    }
    function Co(n) {
      return (e) => {
        const t = Eo(e);
        return t ? new te2(t, "rgb", n) : null;
      };
    }
    function Po(n) {
      const e = n.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
      if (!e)
        return null;
      const t = [
        wo(e[1]),
        ct2(e[2], 100),
        ct2(e[3], 100)
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) ? null : t;
    }
    function To(n) {
      return (e) => {
        const t = Po(e);
        return t ? new te2(t, "hsl", n) : null;
      };
    }
    function ko(n) {
      const e = n.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
      if (!e)
        return null;
      const t = [
        wo(e[1]),
        ct2(e[2], 100),
        ct2(e[3], 100),
        ct2(e[4], 1)
      ];
      return isNaN(t[0]) || isNaN(t[1]) || isNaN(t[2]) || isNaN(t[3]) ? null : t;
    }
    function Mo(n) {
      return (e) => {
        const t = ko(e);
        return t ? new te2(t, "hsl", n) : null;
      };
    }
    function So(n) {
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
      const e = So(n);
      return e ? new te2(e, "rgb", "int") : null;
    }
    function Ao(n) {
      const e = n.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
      if (e)
        return [
          parseInt(e[1] + e[1], 16),
          parseInt(e[2] + e[2], 16),
          parseInt(e[3] + e[3], 16),
          _e(parseInt(e[4] + e[4], 16), 0, 255, 0, 1)
        ];
      const t = n.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
      return t ? [
        parseInt(t[1], 16),
        parseInt(t[2], 16),
        parseInt(t[3], 16),
        _e(parseInt(t[4], 16), 0, 255, 0, 1)
      ] : null;
    }
    function al(n) {
      const e = Ao(n);
      return e ? new te2(e, "rgb", "int") : null;
    }
    function Lo(n) {
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
    function Ro(n) {
      return (e) => {
        const t = Lo(e);
        return t ? new te2(t, "rgb", n) : null;
      };
    }
    function Io(n) {
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
    function Vo(n) {
      return (e) => {
        const t = Io(e);
        return t ? new te2(t, "rgb", n) : null;
      };
    }
    const ll = [
      {
        parser: So,
        result: {
          alpha: false,
          mode: "rgb",
          notation: "hex"
        }
      },
      {
        parser: Ao,
        result: {
          alpha: true,
          mode: "rgb",
          notation: "hex"
        }
      },
      {
        parser: yo,
        result: {
          alpha: false,
          mode: "rgb",
          notation: "func"
        }
      },
      {
        parser: Eo,
        result: {
          alpha: true,
          mode: "rgb",
          notation: "func"
        }
      },
      {
        parser: Po,
        result: {
          alpha: false,
          mode: "hsl",
          notation: "func"
        }
      },
      {
        parser: ko,
        result: {
          alpha: true,
          mode: "hsl",
          notation: "func"
        }
      },
      {
        parser: Lo,
        result: {
          alpha: false,
          mode: "rgb",
          notation: "object"
        }
      },
      {
        parser: Io,
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
    function Ar(n, e = "int") {
      const t = cl(n);
      return t ? t.notation === "hex" && e !== "float" ? Object.assign(Object.assign({}, t), { type: "int" }) : t.notation === "func" ? Object.assign(Object.assign({}, t), { type: e }) : null : null;
    }
    const Do = {
      int: [
        ol,
        al,
        xo("int"),
        Co("int"),
        To("int"),
        Mo("int"),
        Ro("int"),
        Vo("int")
      ],
      float: [
        xo("float"),
        Co("float"),
        To("float"),
        Mo("float"),
        Ro("float"),
        Vo("float")
      ]
    };
    function pl(n) {
      const e = Do[n];
      return (t) => {
        if (typeof t != "string")
          return te2.black(n);
        const l = e.reduce((v, E) => v || E(t), null);
        return l ?? te2.black(n);
      };
    }
    function Lr(n) {
      const e = Do[n];
      return (t) => e.reduce((l, v) => l || v(t), null);
    }
    function Oo(n) {
      const e = Se(Math.floor(n), 0, 255).toString(16);
      return e.length === 1 ? `0${e}` : e;
    }
    function No(n, e = "#") {
      const t = p(n.getComponents("rgb")).map(Oo).join("");
      return `${e}${t}`;
    }
    function Rr(n, e = "#") {
      const t = n.getComponents("rgb"), l = [t[0], t[1], t[2], t[3] * 255].map(Oo).join("");
      return `${e}${l}`;
    }
    function Fo(n, e) {
      const t = Re(e === "float" ? 2 : 0);
      return `rgb(${p(n.getComponents("rgb", e)).map((v) => t(v)).join(", ")})`;
    }
    function ul(n) {
      return (e) => Fo(e, n);
    }
    function Ss(n, e) {
      const t = Re(2), l = Re(e === "float" ? 2 : 0);
      return `rgba(${n.getComponents("rgb", e).map((E, k2) => (k2 === 3 ? t : l)(E)).join(", ")})`;
    }
    function hl(n) {
      return (e) => Ss(e, n);
    }
    function dl(n) {
      const e = [
        Re(0),
        _n,
        _n
      ];
      return `hsl(${p(n.getComponents("hsl")).map((l, v) => e[v](l)).join(", ")})`;
    }
    function ml(n) {
      const e = [
        Re(0),
        _n,
        _n,
        Re(2)
      ];
      return `hsla(${n.getComponents("hsl").map((l, v) => e[v](l)).join(", ")})`;
    }
    function Bo(n, e) {
      const t = Re(e === "float" ? 2 : 0), l = ["r", "g", "b"];
      return `{${p(n.getComponents("rgb", e)).map((E, k2) => `${l[k2]}: ${t(E)}`).join(", ")}}`;
    }
    function fl(n) {
      return (e) => Bo(e, n);
    }
    function jo(n, e) {
      const t = Re(2), l = Re(e === "float" ? 2 : 0), v = ["r", "g", "b", "a"];
      return `{${n.getComponents("rgb", e).map((k2, B2) => {
        const Q = B2 === 3 ? t : l;
        return `${v[B2]}: ${Q(k2)}`;
      }).join(", ")}}`;
    }
    function vl(n) {
      return (e) => jo(e, n);
    }
    const bl = [
      {
        format: {
          alpha: false,
          mode: "rgb",
          notation: "hex",
          type: "int"
        },
        stringifier: No
      },
      {
        format: {
          alpha: true,
          mode: "rgb",
          notation: "hex",
          type: "int"
        },
        stringifier: Rr
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
    function Ir(n) {
      return bl.reduce((e, t) => e || (sl(t.format, n) ? t.stringifier : null), null);
    }
    const Bi = D("apl");
    class gl {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.value = t.value, this.value.emitter.on("change", this.onValueChange_), this.element = e.createElement("div"), this.element.classList.add(Bi()), t.viewProps.bindClassModifiers(this.element), t.viewProps.bindTabIndex(this.element);
        const l = e.createElement("div");
        l.classList.add(Bi("b")), this.element.appendChild(l);
        const v = e.createElement("div");
        v.classList.add(Bi("c")), l.appendChild(v), this.colorElem_ = v;
        const E = e.createElement("div");
        E.classList.add(Bi("m")), this.element.appendChild(E), this.markerElem_ = E;
        const k2 = e.createElement("div");
        k2.classList.add(Bi("p")), this.markerElem_.appendChild(k2), this.previewElem_ = k2, this.update_();
      }
      update_() {
        const e = this.value.rawValue, t = e.getComponents("rgb"), l = new te2([t[0], t[1], t[2], 0], "rgb"), v = new te2([t[0], t[1], t[2], 255], "rgb"), E = [
          "to right",
          Ss(l),
          Ss(v)
        ];
        this.colorElem_.style.background = `linear-gradient(${E.join(",")})`, this.previewElem_.style.backgroundColor = Ss(e);
        const k2 = _e(t[3], 0, 1, 0, 100);
        this.markerElem_.style.left = `${k2}%`;
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
        }), this.ptHandler_ = new Vt(this.view.element), this.ptHandler_.emitter.on("down", this.onPointerDown_), this.ptHandler_.emitter.on("move", this.onPointerMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.element.addEventListener("keydown", this.onKeyDown_), this.view.element.addEventListener("keyup", this.onKeyUp_);
      }
      handlePointerEvent_(e, t) {
        if (!e.point)
          return;
        const l = e.point.x / e.bounds.width, v = this.value.rawValue, [E, k2, B2] = v.getComponents("hsv");
        this.value.setRawValue(new te2([E, k2, B2, l], "hsv"), t);
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
        const t = Oe(Tn(true), lt2(e));
        if (t === 0)
          return;
        const l = this.value.rawValue, [v, E, k2, B2] = l.getComponents("hsv");
        this.value.setRawValue(new te2([v, E, k2, B2 + t], "hsv"), {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(e) {
        Oe(Tn(true), lt2(e)) !== 0 && this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    const ii = D("coltxt");
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
        this.element = e.createElement("div"), this.element.classList.add(ii()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(ii("m")), this.modeElem_ = wl(e), this.modeElem_.classList.add(ii("ms")), l.appendChild(this.modeSelectElement), t.viewProps.bindDisabled(this.modeElem_);
        const v = e.createElement("div");
        v.classList.add(ii("mm")), v.appendChild(yt(e, "dropdown")), l.appendChild(v), this.element.appendChild(l);
        const E = e.createElement("div");
        E.classList.add(ii("w")), this.element.appendChild(E), this.textsElem_ = E, this.textViews_ = t.textViews, this.applyTextViews_(), N(t.colorMode, (k2) => {
          this.modeElem_.value = k2;
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
        cn(this.textsElem_);
        const e = this.element.ownerDocument;
        this.textViews_.forEach((t) => {
          const l = e.createElement("div");
          l.classList.add(ii("c")), l.appendChild(t.element), this.textsElem_.appendChild(l);
        });
      }
    }
    function xl(n) {
      return Re(n === "float" ? 2 : 0);
    }
    function El(n, e, t) {
      const l = P(n, e)[t];
      return new Xt({
        min: 0,
        max: l
      });
    }
    function Vr(n, e, t) {
      return new yn(n, {
        arrayPosition: t === 0 ? "fst" : t === 3 - 1 ? "lst" : "mid",
        baseStep: Tn(false),
        parser: e.parser,
        props: X.fromObject({
          draggingScale: e.colorType === "float" ? 0.01 : 1,
          formatter: xl(e.colorType)
        }),
        value: ee2(0, {
          constraint: El(e.colorMode, e.colorType, t)
        }),
        viewProps: e.viewProps
      });
    }
    class Cl {
      constructor(e, t) {
        this.onModeSelectChange_ = this.onModeSelectChange_.bind(this), this.colorType_ = t.colorType, this.parser_ = t.parser, this.value = t.value, this.viewProps = t.viewProps, this.colorMode = ee2(this.value.rawValue.mode), this.ccs_ = this.createComponentControllers_(e), this.view = new yl(e, {
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
          Vr(e, t, 0),
          Vr(e, t, 1),
          Vr(e, t, 2)
        ];
        return l.forEach((v, E) => {
          qt({
            primary: this.value,
            secondary: v.value,
            forward: (k2) => k2.rawValue.getComponents(this.colorMode.rawValue, this.colorType_)[E],
            backward: (k2, B2) => {
              const Q = this.colorMode.rawValue, J = k2.rawValue.getComponents(Q, this.colorType_);
              return J[E] = B2.rawValue, new te2(f2(p(J), J[3]), Q, this.colorType_);
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
    const Dr = D("hpl");
    class Pl {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.value = t.value, this.value.emitter.on("change", this.onValueChange_), this.element = e.createElement("div"), this.element.classList.add(Dr()), t.viewProps.bindClassModifiers(this.element), t.viewProps.bindTabIndex(this.element);
        const l = e.createElement("div");
        l.classList.add(Dr("c")), this.element.appendChild(l);
        const v = e.createElement("div");
        v.classList.add(Dr("m")), this.element.appendChild(v), this.markerElem_ = v, this.update_();
      }
      update_() {
        const e = this.value.rawValue, [t] = e.getComponents("hsv");
        this.markerElem_.style.backgroundColor = Fo(new te2([t, 100, 100], "hsv"));
        const l = _e(t, 0, 360, 0, 100);
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
        }), this.ptHandler_ = new Vt(this.view.element), this.ptHandler_.emitter.on("down", this.onPointerDown_), this.ptHandler_.emitter.on("move", this.onPointerMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.element.addEventListener("keydown", this.onKeyDown_), this.view.element.addEventListener("keyup", this.onKeyUp_);
      }
      handlePointerEvent_(e, t) {
        if (!e.point)
          return;
        const l = _e(Se(e.point.x, 0, e.bounds.width), 0, e.bounds.width, 0, 360), v = this.value.rawValue, [, E, k2, B2] = v.getComponents("hsv");
        this.value.setRawValue(new te2([l, E, k2, B2], "hsv"), t);
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
        const t = Oe(Tn(false), lt2(e));
        if (t === 0)
          return;
        const l = this.value.rawValue, [v, E, k2, B2] = l.getComponents("hsv");
        this.value.setRawValue(new te2([v + t, E, k2, B2], "hsv"), {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(e) {
        Oe(Tn(false), lt2(e)) !== 0 && this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    const Or = D("svp"), zo = 64;
    class kl {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), this.value = t.value, this.value.emitter.on("change", this.onValueChange_), this.element = e.createElement("div"), this.element.classList.add(Or()), t.viewProps.bindClassModifiers(this.element), t.viewProps.bindTabIndex(this.element);
        const l = e.createElement("canvas");
        l.height = zo, l.width = zo, l.classList.add(Or("c")), this.element.appendChild(l), this.canvasElement = l;
        const v = e.createElement("div");
        v.classList.add(Or("m")), this.element.appendChild(v), this.markerElem_ = v, this.update_();
      }
      update_() {
        const e = Un(this.canvasElement);
        if (!e)
          return;
        const l = this.value.rawValue.getComponents("hsv"), v = this.canvasElement.width, E = this.canvasElement.height, k2 = e.getImageData(0, 0, v, E), B2 = k2.data;
        for (let de = 0; de < E; de++)
          for (let ve = 0; ve < v; ve++) {
            const Mn = _e(ve, 0, v, 0, 100), zi = _e(de, 0, E, 100, 0), Ui = Ms(l[0], Mn, zi), As = (de * v + ve) * 4;
            B2[As] = Ui[0], B2[As + 1] = Ui[1], B2[As + 2] = Ui[2], B2[As + 3] = 255;
          }
        e.putImageData(k2, 0, 0);
        const Q = _e(l[1], 0, 100, 0, 100);
        this.markerElem_.style.left = `${Q}%`;
        const J = _e(l[2], 0, 100, 100, 0);
        this.markerElem_.style.top = `${J}%`;
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
        }), this.ptHandler_ = new Vt(this.view.element), this.ptHandler_.emitter.on("down", this.onPointerDown_), this.ptHandler_.emitter.on("move", this.onPointerMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.element.addEventListener("keydown", this.onKeyDown_), this.view.element.addEventListener("keyup", this.onKeyUp_);
      }
      handlePointerEvent_(e, t) {
        if (!e.point)
          return;
        const l = _e(e.point.x, 0, e.bounds.width, 0, 100), v = _e(e.point.y, 0, e.bounds.height, 100, 0), [E, , , k2] = this.value.rawValue.getComponents("hsv");
        this.value.setRawValue(new te2([E, l, v, k2], "hsv"), t);
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
        Jn(e.key) && e.preventDefault();
        const [t, l, v, E] = this.value.rawValue.getComponents("hsv"), k2 = Tn(false), B2 = Oe(k2, lt2(e)), Q = Oe(k2, wn(e));
        B2 === 0 && Q === 0 || this.value.setRawValue(new te2([t, l + B2, v + Q, E], "hsv"), {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(e) {
        const t = Tn(false), l = Oe(t, lt2(e)), v = Oe(t, wn(e));
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
          text: new yn(e, {
            parser: at2,
            baseStep: 0.1,
            props: X.fromObject({
              draggingScale: 0.01,
              formatter: Re(2)
            }),
            value: ee2(0, {
              constraint: new Xt({ min: 0, max: 1 })
            }),
            viewProps: this.viewProps
          })
        } : null, this.alphaIcs_ && qt({
          primary: this.value,
          secondary: this.alphaIcs_.text.value,
          forward: (l) => l.rawValue.getComponents()[3],
          backward: (l, v) => {
            const E = l.rawValue.getComponents();
            return E[3] = v.rawValue, new te2(E, l.rawValue.mode);
          }
        }), this.textC_ = new Cl(e, {
          colorType: t.colorType,
          parser: at2,
          value: this.value,
          viewProps: this.viewProps
        }), this.view = new Mr(e, {
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
    const Nr = D("colsw");
    class Al {
      constructor(e, t) {
        this.onValueChange_ = this.onValueChange_.bind(this), t.value.emitter.on("change", this.onValueChange_), this.value = t.value, this.element = e.createElement("div"), this.element.classList.add(Nr()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("div");
        l.classList.add(Nr("sw")), this.element.appendChild(l), this.swatchElem_ = l;
        const v = e.createElement("button");
        v.classList.add(Nr("b")), t.viewProps.bindDisabled(v), this.element.appendChild(v), this.buttonElement = v, this.update_();
      }
      update_() {
        const e = this.value.rawValue;
        this.swatchElem_.style.backgroundColor = Rr(e);
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
    class Fr {
      constructor(e, t) {
        this.onButtonBlur_ = this.onButtonBlur_.bind(this), this.onButtonClick_ = this.onButtonClick_.bind(this), this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this), this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.foldable_ = De.create(t.expanded), this.swatchC_ = new Ll(e, {
          value: this.value,
          viewProps: this.viewProps
        });
        const l = this.swatchC_.view.buttonElement;
        l.addEventListener("blur", this.onButtonBlur_), l.addEventListener("click", this.onButtonClick_), this.textC_ = new Zn(e, {
          parser: t.parser,
          props: X.fromObject({
            formatter: t.formatter
          }),
          value: this.value,
          viewProps: this.viewProps
        }), this.view = new Fi(e, {
          foldable: this.foldable_,
          pickerLayout: t.pickerLayout
        }), this.view.swatchElement.appendChild(this.swatchC_.view.element), this.view.textElement.appendChild(this.textC_.view.element), this.popC_ = t.pickerLayout === "popup" ? new hs(e, {
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
        }), this.pickerC_ = v, this.popC_ ? (this.view.element.appendChild(this.popC_.view.element), this.popC_.view.element.appendChild(v.view.element), qt({
          primary: this.foldable_.value("expanded"),
          secondary: this.popC_.shows,
          forward: (E) => E.rawValue,
          backward: (E, k2) => k2.rawValue
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
        const t = this.popC_.view.element, l = xt(e);
        l && t.contains(l) || l && l === this.swatchC_.view.buttonElement && !mt(t.ownerDocument) || (this.popC_.shows.rawValue = false);
      }
      onPopupChildKeydown_(e) {
        this.popC_ ? e.key === "Escape" && (this.popC_.shows.rawValue = false) : this.view.pickerElement && e.key === "Escape" && this.swatchC_.view.buttonElement.focus();
      }
    }
    function Rl(n, e) {
      return te2.isColorObject(n) ? te2.fromObject(n, e) : te2.black(e);
    }
    function Il(n) {
      return p(n.getComponents("rgb")).reduce((e, t) => e << 8 | Math.floor(t) & 255, 0);
    }
    function Vl(n) {
      return n.getComponents("rgb").reduce((e, t, l) => {
        const v = Math.floor(l === 3 ? t * 255 : t) & 255;
        return e << 8 | v;
      }, 0) >>> 0;
    }
    function Dl(n) {
      return new te2([n >> 16 & 255, n >> 8 & 255, n & 255], "rgb");
    }
    function Ol(n) {
      return new te2([
        n >> 24 & 255,
        n >> 16 & 255,
        n >> 8 & 255,
        _e(n & 255, 0, 255, 0, 1)
      ], "rgb");
    }
    function Nl(n) {
      return typeof n != "number" ? te2.black() : Dl(n);
    }
    function Fl(n) {
      return typeof n != "number" ? te2.black() : Ol(n);
    }
    function Bl(n) {
      const e = Ir(n);
      return e ? (t, l) => {
        tt2(t, e(l));
      } : null;
    }
    function jl(n) {
      const e = n ? Vl : Il;
      return (t, l) => {
        tt2(t, e(l));
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
    function Br(n) {
      var e;
      return !!(n != null && n.alpha || !((e = n == null ? void 0 : n.color) === null || e === void 0) && e.alpha);
    }
    function Hl(n) {
      return n ? (e) => Rr(e, "0x") : (e) => No(e, "0x");
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
        const t = Sr(e);
        return t ? {
          initialValue: n,
          params: t
        } : null;
      },
      binding: {
        reader: (n) => Br(n.params) ? Fl : Nl,
        equals: te2.equals,
        writer: (n) => jl(Br(n.params))
      },
      controller: (n) => {
        const e = Br(n.params), t = "expanded" in n.params ? n.params.expanded : void 0, l = "picker" in n.params ? n.params.picker : void 0;
        return new Fr(n.document, {
          colorType: "int",
          expanded: t ?? false,
          formatter: Hl(e),
          parser: Lr("int"),
          pickerLayout: l ?? "popup",
          supportsAlpha: e,
          value: n.value,
          viewProps: n.viewProps
        });
      }
    };
    function Xl(n) {
      return te2.isRgbaColorObject(n);
    }
    function Yl(n) {
      return (e) => Rl(e, n);
    }
    function ql(n, e) {
      return (t) => n ? jo(t, e) : Bo(t, e);
    }
    const Ql = {
      id: "input-color-object",
      type: "input",
      accept: (n, e) => {
        if (!te2.isColorObject(n))
          return null;
        const t = Sr(e);
        return t ? {
          initialValue: n,
          params: t
        } : null;
      },
      binding: {
        reader: (n) => Yl(kn(n.params)),
        equals: te2.equals,
        writer: (n) => Gl(Xl(n.initialValue), kn(n.params))
      },
      controller: (n) => {
        var e;
        const t = te2.isRgbaColorObject(n.initialValue), l = "expanded" in n.params ? n.params.expanded : void 0, v = "picker" in n.params ? n.params.picker : void 0, E = (e = kn(n.params)) !== null && e !== void 0 ? e : "int";
        return new Fr(n.document, {
          colorType: E,
          expanded: l ?? false,
          formatter: ql(t, E),
          parser: Lr(E),
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
        const t = Ar(n, kn(e));
        if (!t || !Ir(t))
          return null;
        const v = Sr(e);
        return v ? {
          initialValue: n,
          params: v
        } : null;
      },
      binding: {
        reader: (n) => {
          var e;
          return pl((e = kn(n.params)) !== null && e !== void 0 ? e : "int");
        },
        equals: te2.equals,
        writer: (n) => {
          const e = Ar(n.initialValue, kn(n.params));
          if (!e)
            throw S2.shouldNeverHappen();
          const t = Bl(e);
          if (!t)
            throw S2.notBindable();
          return t;
        }
      },
      controller: (n) => {
        const e = Ar(n.initialValue, kn(n.params));
        if (!e)
          throw S2.shouldNeverHappen();
        const t = Ir(e);
        if (!t)
          throw S2.shouldNeverHappen();
        const l = "expanded" in n.params ? n.params.expanded : void 0, v = "picker" in n.params ? n.params.picker : void 0;
        return new Fr(n.document, {
          colorType: e.type,
          expanded: l ?? false,
          formatter: t,
          parser: Lr(e.type),
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
          var E, k2;
          return (k2 = (E = this.components[v]) === null || E === void 0 ? void 0 : E.constrain(l)) !== null && k2 !== void 0 ? k2 : l;
        });
        return this.asm_.fromComponents(t);
      }
    }
    const Uo = D("pndtxt");
    class Wl {
      constructor(e, t) {
        this.textViews = t.textViews, this.element = e.createElement("div"), this.element.classList.add(Uo()), this.textViews.forEach((l) => {
          const v = e.createElement("div");
          v.classList.add(Uo("a")), v.appendChild(l.element), this.element.appendChild(v);
        });
      }
    }
    function Jl(n, e, t) {
      return new yn(n, {
        arrayPosition: t === 0 ? "fst" : t === e.axes.length - 1 ? "lst" : "mid",
        baseStep: e.axes[t].baseStep,
        parser: e.parser,
        props: e.axes[t].textProps,
        value: ee2(0, {
          constraint: e.axes[t].constraint
        }),
        viewProps: e.viewProps
      });
    }
    class jr {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.acs_ = t.axes.map((l, v) => Jl(e, t, v)), this.acs_.forEach((l, v) => {
          qt({
            primary: this.value,
            secondary: l.value,
            forward: (E) => t.assembly.toComponents(E.rawValue)[v],
            backward: (E, k2) => {
              const B2 = t.assembly.toComponents(E.rawValue);
              return B2[v] = k2.rawValue, t.assembly.fromComponents(B2);
            }
          });
        }), this.view = new Wl(e, {
          textViews: this.acs_.map((l) => l.view)
        });
      }
    }
    function Go(n, e) {
      return "step" in n && !_(n.step) ? new Qn(n.step, e) : null;
    }
    function Ho(n) {
      return !_(n.max) && !_(n.min) ? new Xt({
        max: n.max,
        min: n.min
      }) : !_(n.max) || !_(n.min) ? new Ei({
        max: n.max,
        min: n.min
      }) : null;
    }
    function ec(n) {
      const e = et2(n, Xt);
      if (e)
        return [e.values.get("min"), e.values.get("max")];
      const t = et2(n, Ei);
      return t ? [t.minValue, t.maxValue] : [void 0, void 0];
    }
    function tc(n, e) {
      const t = [], l = Go(n, e);
      l && t.push(l);
      const v = Ho(n);
      v && t.push(v);
      const E = Ni(n.options);
      return E && t.push(E), new fn(t);
    }
    const nc = {
      id: "input-number",
      type: "input",
      accept: (n, e) => {
        if (typeof n != "number")
          return null;
        const t = M, l = le2(e, {
          format: t.optional.function,
          max: t.optional.number,
          min: t.optional.number,
          options: t.optional.custom(En),
          step: t.optional.number
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => vt,
        constraint: (n) => tc(n.params, n.initialValue),
        writer: (n) => tt2
      },
      controller: (n) => {
        var e;
        const t = n.value, l = n.constraint, v = l && et2(l, vn);
        if (v)
          return new bn(n.document, {
            props: new X({
              options: v.values.value("options")
            }),
            value: t,
            viewProps: n.viewProps
          });
        const E = (e = "format" in n.params ? n.params.format : void 0) !== null && e !== void 0 ? e : Re(ti(l, t.rawValue)), k2 = l && et2(l, Xt);
        return k2 ? new ei(n.document, {
          baseStep: Dt(l),
          parser: at2,
          sliderProps: new X({
            maxValue: k2.values.value("max"),
            minValue: k2.values.value("min")
          }),
          textProps: X.fromObject({
            draggingScale: Ot(l, t.rawValue),
            formatter: E
          }),
          value: t,
          viewProps: n.viewProps
        }) : new yn(n.document, {
          baseStep: Dt(l),
          parser: at2,
          props: X.fromObject({
            draggingScale: Ot(l, t.rawValue),
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
    const Ko = {
      toComponents: (n) => n.getComponents(),
      fromComponents: (n) => new Wt(...n)
    }, si = D("p2d");
    class ic {
      constructor(e, t) {
        this.element = e.createElement("div"), this.element.classList.add(si()), t.viewProps.bindClassModifiers(this.element), N(t.expanded, K(this.element, si(void 0, "expanded")));
        const l = e.createElement("div");
        l.classList.add(si("h")), this.element.appendChild(l);
        const v = e.createElement("button");
        v.classList.add(si("b")), v.appendChild(yt(e, "p2dpad")), t.viewProps.bindDisabled(v), l.appendChild(v), this.buttonElement = v;
        const E = e.createElement("div");
        if (E.classList.add(si("t")), l.appendChild(E), this.textElement = E, t.pickerLayout === "inline") {
          const k2 = e.createElement("div");
          k2.classList.add(si("p")), this.element.appendChild(k2), this.pickerElement = k2;
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
        const v = e.createElementNS(ze, "svg");
        v.classList.add(Jt("g")), this.padElement.appendChild(v), this.svgElem_ = v;
        const E = e.createElementNS(ze, "line");
        E.classList.add(Jt("ax")), E.setAttributeNS(null, "x1", "0"), E.setAttributeNS(null, "y1", "50%"), E.setAttributeNS(null, "x2", "100%"), E.setAttributeNS(null, "y2", "50%"), this.svgElem_.appendChild(E);
        const k2 = e.createElementNS(ze, "line");
        k2.classList.add(Jt("ax")), k2.setAttributeNS(null, "x1", "50%"), k2.setAttributeNS(null, "y1", "0"), k2.setAttributeNS(null, "x2", "50%"), k2.setAttributeNS(null, "y2", "100%"), this.svgElem_.appendChild(k2);
        const B2 = e.createElementNS(ze, "line");
        B2.classList.add(Jt("l")), B2.setAttributeNS(null, "x1", "50%"), B2.setAttributeNS(null, "y1", "50%"), this.svgElem_.appendChild(B2), this.lineElem_ = B2;
        const Q = e.createElement("div");
        Q.classList.add(Jt("m")), this.padElement.appendChild(Q), this.markerElem_ = Q, t.value.emitter.on("change", this.onValueChange_), this.value = t.value, this.update_();
      }
      get allFocusableElements() {
        return [this.padElement];
      }
      update_() {
        const [e, t] = this.value.rawValue.getComponents(), l = this.maxValue_, v = _e(e, -l, +l, 0, 100), E = _e(t, -l, +l, 0, 100), k2 = this.invertsY_ ? 100 - E : E;
        this.lineElem_.setAttributeNS(null, "x2", `${v}%`), this.lineElem_.setAttributeNS(null, "y2", `${k2}%`), this.markerElem_.style.left = `${v}%`, this.markerElem_.style.top = `${k2}%`;
      }
      onValueChange_() {
        this.update_();
      }
      onFoldableChange_() {
        this.update_();
      }
    }
    function $o(n, e, t) {
      return [
        Oe(e[0], lt2(n)),
        Oe(e[1], wn(n)) * (t ? 1 : -1)
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
        }), this.ptHandler_ = new Vt(this.view.padElement), this.ptHandler_.emitter.on("down", this.onPointerDown_), this.ptHandler_.emitter.on("move", this.onPointerMove_), this.ptHandler_.emitter.on("up", this.onPointerUp_), this.view.padElement.addEventListener("keydown", this.onPadKeyDown_), this.view.padElement.addEventListener("keyup", this.onPadKeyUp_);
      }
      handlePointerEvent_(e, t) {
        if (!e.point)
          return;
        const l = this.maxValue_, v = _e(e.point.x, 0, e.bounds.width, -l, +l), E = _e(this.invertsY_ ? e.bounds.height - e.point.y : e.point.y, 0, e.bounds.height, -l, +l);
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
        Jn(e.key) && e.preventDefault();
        const [t, l] = $o(e, this.baseSteps_, this.invertsY_);
        t === 0 && l === 0 || this.value.setRawValue(new Wt(this.value.rawValue.x + t, this.value.rawValue.y + l), {
          forceEmit: false,
          last: false
        });
      }
      onPadKeyUp_(e) {
        const [t, l] = $o(e, this.baseSteps_, this.invertsY_);
        t === 0 && l === 0 || this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    class oc {
      constructor(e, t) {
        var l, v;
        this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this), this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this), this.onPadButtonBlur_ = this.onPadButtonBlur_.bind(this), this.onPadButtonClick_ = this.onPadButtonClick_.bind(this), this.value = t.value, this.viewProps = t.viewProps, this.foldable_ = De.create(t.expanded), this.popC_ = t.pickerLayout === "popup" ? new hs(e, {
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
        E.view.allFocusableElements.forEach((k2) => {
          k2.addEventListener("blur", this.onPopupChildBlur_), k2.addEventListener("keydown", this.onPopupChildKeydown_);
        }), this.pickerC_ = E, this.textC_ = new jr(e, {
          assembly: Ko,
          axes: t.axes,
          parser: t.parser,
          value: this.value,
          viewProps: this.viewProps
        }), this.view = new ic(e, {
          expanded: this.foldable_.value("expanded"),
          pickerLayout: t.pickerLayout,
          viewProps: this.viewProps
        }), this.view.textElement.appendChild(this.textC_.view.element), (l = this.view.buttonElement) === null || l === void 0 || l.addEventListener("blur", this.onPadButtonBlur_), (v = this.view.buttonElement) === null || v === void 0 || v.addEventListener("click", this.onPadButtonClick_), this.popC_ ? (this.view.element.appendChild(this.popC_.view.element), this.popC_.view.element.appendChild(this.pickerC_.view.element), qt({
          primary: this.foldable_.value("expanded"),
          secondary: this.popC_.shows,
          forward: (k2) => k2.rawValue,
          backward: (k2, B2) => B2.rawValue
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
        const t = this.popC_.view.element, l = xt(e);
        l && t.contains(l) || l && l === this.view.buttonElement && !mt(t.ownerDocument) || (this.popC_.shows.rawValue = false);
      }
      onPopupChildKeydown_(e) {
        this.popC_ ? e.key === "Escape" && (this.popC_.shows.rawValue = false) : this.view.pickerElement && e.key === "Escape" && this.view.buttonElement.focus();
      }
    }
    class ri {
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
    const Xo = {
      toComponents: (n) => n.getComponents(),
      fromComponents: (n) => new ri(...n)
    };
    function ac(n) {
      return ri.isObject(n) ? new ri(n.x, n.y, n.z) : new ri();
    }
    function lc(n, e) {
      n.writeProperty("x", e.x), n.writeProperty("y", e.y), n.writeProperty("z", e.z);
    }
    function cc(n, e) {
      return new Zt({
        assembly: Xo,
        components: [
          Ft("x" in n ? n.x : void 0, e.x),
          Ft("y" in n ? n.y : void 0, e.y),
          Ft("z" in n ? n.z : void 0, e.z)
        ]
      });
    }
    function zr(n, e) {
      return {
        baseStep: Dt(e),
        constraint: e,
        textProps: X.fromObject({
          draggingScale: Ot(e, n),
          formatter: Re(ti(e, n))
        })
      };
    }
    const pc = {
      id: "input-point3d",
      type: "input",
      accept: (n, e) => {
        if (!ri.isObject(n))
          return null;
        const t = M, l = le2(e, {
          x: t.optional.custom(bt),
          y: t.optional.custom(bt),
          z: t.optional.custom(bt)
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => ac,
        constraint: (n) => cc(n.params, n.initialValue),
        equals: ri.equals,
        writer: (n) => lc
      },
      controller: (n) => {
        const e = n.value, t = n.constraint;
        if (!(t instanceof Zt))
          throw S2.shouldNeverHappen();
        return new jr(n.document, {
          assembly: Xo,
          axes: [
            zr(e.rawValue.x, t.components[0]),
            zr(e.rawValue.y, t.components[1]),
            zr(e.rawValue.z, t.components[2])
          ],
          parser: at2,
          value: e,
          viewProps: n.viewProps
        });
      }
    };
    class oi {
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
    const Yo = {
      toComponents: (n) => n.getComponents(),
      fromComponents: (n) => new oi(...n)
    };
    function uc(n) {
      return oi.isObject(n) ? new oi(n.x, n.y, n.z, n.w) : new oi();
    }
    function hc(n, e) {
      n.writeProperty("x", e.x), n.writeProperty("y", e.y), n.writeProperty("z", e.z), n.writeProperty("w", e.w);
    }
    function dc(n, e) {
      return new Zt({
        assembly: Yo,
        components: [
          Ft("x" in n ? n.x : void 0, e.x),
          Ft("y" in n ? n.y : void 0, e.y),
          Ft("z" in n ? n.z : void 0, e.z),
          Ft("w" in n ? n.w : void 0, e.w)
        ]
      });
    }
    function mc(n, e) {
      return {
        baseStep: Dt(e),
        constraint: e,
        textProps: X.fromObject({
          draggingScale: Ot(e, n),
          formatter: Re(ti(e, n))
        })
      };
    }
    const fc = {
      id: "input-point4d",
      type: "input",
      accept: (n, e) => {
        if (!oi.isObject(n))
          return null;
        const t = M, l = le2(e, {
          x: t.optional.custom(bt),
          y: t.optional.custom(bt),
          z: t.optional.custom(bt),
          w: t.optional.custom(bt)
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => uc,
        constraint: (n) => dc(n.params, n.initialValue),
        equals: oi.equals,
        writer: (n) => hc
      },
      controller: (n) => {
        const e = n.value, t = n.constraint;
        if (!(t instanceof Zt))
          throw S2.shouldNeverHappen();
        return new jr(n.document, {
          assembly: Yo,
          axes: e.rawValue.getComponents().map((l, v) => mc(l, t.components[v])),
          parser: at2,
          value: e,
          viewProps: n.viewProps
        });
      }
    };
    function vc(n) {
      const e = [], t = Ni(n.options);
      return t && e.push(t), new fn(e);
    }
    const bc = {
      id: "input-string",
      type: "input",
      accept: (n, e) => {
        if (typeof n != "string")
          return null;
        const l = le2(e, {
          options: M.optional.custom(En)
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => Si,
        constraint: (n) => vc(n.params),
        writer: (n) => tt2
      },
      controller: (n) => {
        const e = n.document, t = n.value, l = n.constraint, v = l && et2(l, vn);
        return v ? new bn(e, {
          props: new X({
            options: v.values.value("options")
          }),
          value: t,
          viewProps: n.viewProps
        }) : new Zn(e, {
          parser: (E) => E,
          props: X.fromObject({
            formatter: Ct
          }),
          value: t,
          viewProps: n.viewProps
        });
      }
    }, ji = {
      monitor: {
        defaultInterval: 200,
        defaultLineCount: 3
      }
    }, qo = D("mll");
    class gc {
      constructor(e, t) {
        this.onValueUpdate_ = this.onValueUpdate_.bind(this), this.formatter_ = t.formatter, this.element = e.createElement("div"), this.element.classList.add(qo()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("textarea");
        l.classList.add(qo("i")), l.style.height = `calc(var(--bld-us) * ${t.lineCount})`, l.readOnly = true, t.viewProps.bindDisabled(l), this.element.appendChild(l), this.textareaElem_ = l, t.value.emitter.on("change", this.onValueUpdate_), this.value = t.value, this.update_();
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
    class Ur {
      constructor(e, t) {
        this.value = t.value, this.viewProps = t.viewProps, this.view = new gc(e, {
          formatter: t.formatter,
          lineCount: t.lineCount,
          value: this.value,
          viewProps: this.viewProps
        });
      }
    }
    const Qo = D("sgl");
    class _c {
      constructor(e, t) {
        this.onValueUpdate_ = this.onValueUpdate_.bind(this), this.formatter_ = t.formatter, this.element = e.createElement("div"), this.element.classList.add(Qo()), t.viewProps.bindClassModifiers(this.element);
        const l = e.createElement("input");
        l.classList.add(Qo("i")), l.readOnly = true, l.type = "text", t.viewProps.bindDisabled(l), this.element.appendChild(l), this.inputElement = l, t.value.emitter.on("change", this.onValueUpdate_), this.value = t.value, this.update_();
      }
      update_() {
        const e = this.value.rawValue, t = e[e.length - 1];
        this.inputElement.value = t !== void 0 ? this.formatter_(t) : "";
      }
      onValueUpdate_() {
        this.update_();
      }
    }
    class Gr {
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
        const l = le2(e, {
          lineCount: M.optional.number
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => ms
      },
      controller: (n) => {
        var e;
        return n.value.rawValue.length === 1 ? new Gr(n.document, {
          formatter: fs,
          value: n.value,
          viewProps: n.viewProps
        }) : new Ur(n.document, {
          formatter: fs,
          lineCount: (e = n.params.lineCount) !== null && e !== void 0 ? e : ji.monitor.defaultLineCount,
          value: n.value,
          viewProps: n.viewProps
        });
      }
    }, en = D("grl");
    class yc {
      constructor(e, t) {
        this.onCursorChange_ = this.onCursorChange_.bind(this), this.onValueUpdate_ = this.onValueUpdate_.bind(this), this.element = e.createElement("div"), this.element.classList.add(en()), t.viewProps.bindClassModifiers(this.element), this.formatter_ = t.formatter, this.props_ = t.props, this.cursor_ = t.cursor, this.cursor_.emitter.on("change", this.onCursorChange_);
        const l = e.createElementNS(ze, "svg");
        l.classList.add(en("g")), l.style.height = `calc(var(--bld-us) * ${t.lineCount})`, this.element.appendChild(l), this.svgElem_ = l;
        const v = e.createElementNS(ze, "polyline");
        this.svgElem_.appendChild(v), this.lineElem_ = v;
        const E = e.createElement("div");
        E.classList.add(en("t"), D("tt")()), this.element.appendChild(E), this.tooltipElem_ = E, t.value.emitter.on("change", this.onValueUpdate_), this.value = t.value, this.update_();
      }
      get graphElement() {
        return this.svgElem_;
      }
      update_() {
        const e = this.svgElem_.getBoundingClientRect(), t = this.value.rawValue.length - 1, l = this.props_.get("minValue"), v = this.props_.get("maxValue"), E = [];
        this.value.rawValue.forEach((de, ve) => {
          if (de === void 0)
            return;
          const Mn = _e(ve, 0, t, 0, e.width), zi = _e(de, l, v, e.height, 0);
          E.push([Mn, zi].join(","));
        }), this.lineElem_.setAttributeNS(null, "points", E.join(" "));
        const k2 = this.tooltipElem_, B2 = this.value.rawValue[this.cursor_.rawValue];
        if (B2 === void 0) {
          k2.classList.remove(en("t", "a"));
          return;
        }
        const Q = _e(this.cursor_.rawValue, 0, t, 0, e.width), J = _e(B2, l, v, e.height, 0);
        k2.style.left = `${Q}px`, k2.style.top = `${J}px`, k2.textContent = `${this.formatter_(B2)}`, k2.classList.contains(en("t", "a")) || (k2.classList.add(en("t", "a"), en("t", "in")), st2(k2), k2.classList.remove(en("t", "in")));
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
        if (this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this), this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this), this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this), this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this), this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this), this.props_ = t.props, this.value = t.value, this.viewProps = t.viewProps, this.cursor_ = ee2(-1), this.view = new yc(e, {
          cursor: this.cursor_,
          formatter: t.formatter,
          lineCount: t.lineCount,
          props: this.props_,
          value: this.value,
          viewProps: this.viewProps
        }), !mt(e))
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
    function Hr(n) {
      return "format" in n && !_(n.format) ? n.format : Re(2);
    }
    function Ec(n) {
      var e;
      return n.value.rawValue.length === 1 ? new Gr(n.document, {
        formatter: Hr(n.params),
        value: n.value,
        viewProps: n.viewProps
      }) : new Ur(n.document, {
        formatter: Hr(n.params),
        lineCount: (e = n.params.lineCount) !== null && e !== void 0 ? e : ji.monitor.defaultLineCount,
        value: n.value,
        viewProps: n.viewProps
      });
    }
    function Cc(n) {
      var e, t, l;
      return new xc(n.document, {
        formatter: Hr(n.params),
        lineCount: (e = n.params.lineCount) !== null && e !== void 0 ? e : ji.monitor.defaultLineCount,
        props: X.fromObject({
          maxValue: (t = "max" in n.params ? n.params.max : null) !== null && t !== void 0 ? t : 100,
          minValue: (l = "min" in n.params ? n.params.min : null) !== null && l !== void 0 ? l : 0
        }),
        value: n.value,
        viewProps: n.viewProps
      });
    }
    function Zo(n) {
      return "view" in n && n.view === "graph";
    }
    const Pc = {
      id: "monitor-number",
      type: "monitor",
      accept: (n, e) => {
        if (typeof n != "number")
          return null;
        const t = M, l = le2(e, {
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
        defaultBufferSize: (n) => Zo(n) ? 64 : 1,
        reader: (n) => vt
      },
      controller: (n) => Zo(n.params) ? Cc(n) : Ec(n)
    }, Tc = {
      id: "monitor-string",
      type: "monitor",
      accept: (n, e) => {
        if (typeof n != "string")
          return null;
        const t = M, l = le2(e, {
          lineCount: t.optional.number,
          multiline: t.optional.boolean
        });
        return l ? {
          initialValue: n,
          params: l
        } : null;
      },
      binding: {
        reader: (n) => Si
      },
      controller: (n) => {
        var e;
        const t = n.value;
        return t.rawValue.length > 1 || "multiline" in n.params && n.params.multiline ? new Ur(n.document, {
          formatter: Ct,
          lineCount: (e = n.params.lineCount) !== null && e !== void 0 ? e : ji.monitor.defaultLineCount,
          value: t,
          viewProps: n.viewProps
        }) : new Gr(n.document, {
          formatter: Ct,
          value: t,
          viewProps: n.viewProps
        });
      }
    };
    function kc(n, e) {
      var t;
      const l = n.accept(e.target.read(), e.params);
      if (_(l))
        return null;
      const v = M, E = {
        target: e.target,
        initialValue: l.initialValue,
        params: l.params
      }, k2 = n.binding.reader(E), B2 = n.binding.constraint ? n.binding.constraint(E) : void 0, Q = ee2(k2(l.initialValue), {
        constraint: B2,
        equals: n.binding.equals
      }), J = new qn({
        reader: k2,
        target: e.target,
        value: Q,
        writer: n.binding.writer(E)
      }), de = v.optional.boolean(e.params.disabled).value, ve = v.optional.boolean(e.params.hidden).value, Mn = n.controller({
        constraint: B2,
        document: e.document,
        initialValue: l.initialValue,
        params: l.params,
        value: J.value,
        viewProps: Xe2.create({
          disabled: de,
          hidden: ve
        })
      });
      return new Fe(e.document, {
        binding: J,
        blade: ye(),
        props: X.fromObject({
          label: "label" in e.params ? (t = v.optional.string(e.params.label).value) !== null && t !== void 0 ? t : null : e.target.key
        }),
        valueController: Mn
      });
    }
    function Mc(n, e) {
      return e === 0 ? new ls() : new xi(n, e ?? ji.monitor.defaultInterval);
    }
    function Sc(n, e) {
      var t, l, v;
      const E = M, k2 = n.accept(e.target.read(), e.params);
      if (_(k2))
        return null;
      const B2 = {
        target: e.target,
        initialValue: k2.initialValue,
        params: k2.params
      }, Q = n.binding.reader(B2), J = (l = (t = E.optional.number(e.params.bufferSize).value) !== null && t !== void 0 ? t : n.binding.defaultBufferSize && n.binding.defaultBufferSize(k2.params)) !== null && l !== void 0 ? l : 1, de = E.optional.number(e.params.interval).value, ve = new rr({
        reader: Q,
        target: e.target,
        ticker: Mc(e.document, de),
        value: cs(J)
      }), Mn = E.optional.boolean(e.params.disabled).value, zi = E.optional.boolean(e.params.hidden).value, Ui = n.controller({
        document: e.document,
        params: k2.params,
        value: ve.value,
        viewProps: Xe2.create({
          disabled: Mn,
          hidden: zi
        })
      });
      return new rt2(e.document, {
        binding: ve,
        blade: ye(),
        props: X.fromObject({
          label: "label" in e.params ? (v = E.optional.string(e.params.label).value) !== null && v !== void 0 ? v : null : e.target.key
        }),
        valueController: Ui
      });
    }
    class Ac {
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
          throw new S2({
            context: {
              key: t.key
            },
            type: "nomatchingcontroller"
          });
        const E = this.pluginsMap_.inputs.reduce((k2, B2) => k2 ?? kc(B2, {
          document: e,
          target: t,
          params: l
        }), null);
        if (E)
          return E;
        throw new S2({
          context: {
            key: t.key
          },
          type: "nomatchingcontroller"
        });
      }
      createMonitor(e, t, l) {
        const v = this.pluginsMap_.monitors.reduce((E, k2) => E ?? Sc(k2, {
          document: e,
          params: l,
          target: t
        }), null);
        if (v)
          return v;
        throw new S2({
          context: {
            key: t.key
          },
          type: "nomatchingcontroller"
        });
      }
      createBlade(e, t) {
        const l = this.pluginsMap_.blades.reduce((v, E) => v ?? sr(E, {
          document: e,
          params: t
        }), null);
        if (!l)
          throw new S2({
            type: "nomatchingview",
            context: {
              params: t
            }
          });
        return l;
      }
      createBladeApi(e) {
        if (e instanceof Fe)
          return new mi(e);
        if (e instanceof rt2)
          return new fi(e);
        if (e instanceof hn)
          return new $n(e, this);
        const t = this.pluginsMap_.blades.reduce((l, v) => l ?? v.api({
          controller: e,
          pool: this
        }), null);
        if (!t)
          throw S2.shouldNeverHappen();
        return t;
      }
    }
    function Lc() {
      const n = new Ac();
      return [
        Nc,
        pc,
        fc,
        bc,
        nc,
        Zl,
        Ql,
        $l,
        ni,
        wc,
        Tc,
        Pc,
        W,
        Js,
        tr,
        yi
      ].forEach((e) => {
        n.register(e);
      }), n;
    }
    function Rc(n) {
      return Wt.isObject(n) ? new Wt(n.x, n.y) : new Wt();
    }
    function Ic(n, e) {
      n.writeProperty("x", e.x), n.writeProperty("y", e.y);
    }
    function Ft(n, e) {
      if (!n)
        return;
      const t = [], l = Go(n, e);
      l && t.push(l);
      const v = Ho(n);
      return v && t.push(v), new fn(t);
    }
    function Vc(n, e) {
      return new Zt({
        assembly: Ko,
        components: [
          Ft("x" in n ? n.x : void 0, e.x),
          Ft("y" in n ? n.y : void 0, e.y)
        ]
      });
    }
    function Wo(n, e) {
      const [t, l] = n ? ec(n) : [];
      if (!_(t) || !_(l))
        return Math.max(Math.abs(t ?? 0), Math.abs(l ?? 0));
      const v = Dt(n);
      return Math.max(Math.abs(v) * 10, Math.abs(e) * 10);
    }
    function Dc(n, e) {
      const t = e instanceof Zt ? e.components[0] : void 0, l = e instanceof Zt ? e.components[1] : void 0, v = Wo(t, n.x), E = Wo(l, n.y);
      return Math.max(v, E);
    }
    function Jo(n, e) {
      return {
        baseStep: Dt(e),
        constraint: e,
        textProps: X.fromObject({
          draggingScale: Ot(e, n),
          formatter: Re(ti(e, n))
        })
      };
    }
    function Oc(n) {
      if (!("y" in n))
        return false;
      const e = n.y;
      return e && "inverted" in e ? !!e.inverted : false;
    }
    const Nc = {
      id: "input-point2d",
      type: "input",
      accept: (n, e) => {
        if (!Wt.isObject(n))
          return null;
        const t = M, l = le2(e, {
          expanded: t.optional.boolean,
          picker: t.optional.custom(Oi),
          x: t.optional.custom(bt),
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
        reader: (n) => Rc,
        constraint: (n) => Vc(n.params, n.initialValue),
        equals: Wt.equals,
        writer: (n) => Ic
      },
      controller: (n) => {
        const e = n.document, t = n.value, l = n.constraint;
        if (!(l instanceof Zt))
          throw S2.shouldNeverHappen();
        const v = "expanded" in n.params ? n.params.expanded : void 0, E = "picker" in n.params ? n.params.picker : void 0;
        return new oc(e, {
          axes: [
            Jo(t.rawValue.x, l.components[0]),
            Jo(t.rawValue.y, l.components[1])
          ],
          expanded: v ?? false,
          invertsY: Oc(n.params),
          maxValue: Dc(t.rawValue, l),
          parser: at2,
          pickerLayout: E ?? "popup",
          value: t,
          viewProps: n.viewProps
        });
      }
    };
    class ea extends a {
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
    class ta extends a {
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
    const Fc = function() {
      return {
        id: "list",
        type: "blade",
        accept(n) {
          const e = M, t = le2(n, {
            options: e.required.custom(En),
            value: e.required.raw,
            view: e.required.constant("list"),
            label: e.optional.string
          });
          return t ? { params: t } : null;
        },
        controller(n) {
          const e = new vn(Ps(n.params.options)), t = ee2(n.params.value, {
            constraint: e
          }), l = new bn(n.document, {
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
          return !(n.controller instanceof Gt) || !(n.controller.valueController instanceof bn) ? null : new ea(n.controller);
        }
      };
    }();
    function Bc(n) {
      return n.reduce((e, t) => Object.assign(e, {
        [t.presetKey]: t.read()
      }), {});
    }
    function jc(n, e) {
      n.forEach((t) => {
        const l = e[t.target.presetKey];
        l !== void 0 && t.writer(t.target, t.reader(l));
      });
    }
    class zc extends vi {
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
        const t = this.controller_.rackController.rack.find(Fe).map((l) => l.binding);
        jc(t, e), this.refresh();
      }
      /**
       * Exports a preset of all inputs.
       * @return An exported preset object.
       */
      exportPreset() {
        const e = this.controller_.rackController.rack.find(Fe).map((t) => t.binding.target);
        return Bc(e);
      }
      /**
       * Refreshes all bindings of the pane.
       */
      refresh() {
        this.controller_.rackController.rack.find(Fe).forEach((e) => {
          e.binding.read();
        }), this.controller_.rackController.rack.find(rt2).forEach((e) => {
          e.binding.read();
        });
      }
    }
    class Uc extends Xn {
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
    const Gc = {
      id: "slider",
      type: "blade",
      accept(n) {
        const e = M, t = le2(n, {
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
        const l = (e = n.params.value) !== null && e !== void 0 ? e : 0, v = new Xt({
          max: n.params.max,
          min: n.params.min
        }), E = new ei(n.document, {
          baseStep: 1,
          parser: at2,
          sliderProps: new X({
            maxValue: v.values.value("max"),
            minValue: v.values.value("min")
          }),
          textProps: X.fromObject({
            draggingScale: Ot(void 0, l),
            formatter: (t = n.params.format) !== null && t !== void 0 ? t : Er
          }),
          value: ee2(l, {
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
        return !(n.controller instanceof Gt) || !(n.controller.valueController instanceof ei) ? null : new ta(n.controller);
      }
    }, Hc = function() {
      return {
        id: "text",
        type: "blade",
        accept(n) {
          const e = M, t = le2(n, {
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
          const t = new Zn(n.document, {
            parser: n.params.parse,
            props: X.fromObject({
              formatter: (e = n.params.format) !== null && e !== void 0 ? e : (l) => String(l)
            }),
            value: ee2(n.params.value),
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
          return !(n.controller instanceof Gt) || !(n.controller.valueController instanceof Zn) ? null : new na(n.controller);
        }
      };
    }();
    function Kc(n) {
      const e = n.createElement("div");
      return e.classList.add(D("dfw")()), n.body && n.body.appendChild(e), e;
    }
    function ia(n, e, t) {
      if (n.querySelector(`style[data-tp-style=${e}]`))
        return;
      const l = n.createElement("style");
      l.dataset.tpStyle = e, l.textContent = t, n.head.appendChild(l);
    }
    class $c extends zc {
      constructor(e) {
        var t, l;
        const v = e ?? {}, E = (t = v.document) !== null && t !== void 0 ? t : hi(), k2 = Lc(), B2 = new Uc(E, {
          expanded: v.expanded,
          blade: ye(),
          props: X.fromObject({
            title: v.title
          }),
          viewProps: Xe2.create()
        });
        super(B2, k2), this.pool_ = k2, this.containerElem_ = (l = v.container) !== null && l !== void 0 ? l : Kc(E), this.containerElem_.appendChild(this.element), this.doc_ = E, this.usesDefaultWrapper_ = !v.container, this.setUpDefaultPlugins_();
      }
      get document() {
        if (!this.doc_)
          throw S2.alreadyDisposed();
        return this.doc_;
      }
      dispose() {
        const e = this.containerElem_;
        if (!e)
          throw S2.alreadyDisposed();
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
        e.css && ia(this.document, `plugin-${e.id}`, e.css);
      }
      setUpDefaultPlugins_() {
        ia(this.document, "default", '.tp-tbiv_b,.tp-coltxtv_ms,.tp-ckbv_i,.tp-rotv_b,.tp-fldv_b,.tp-mllv_i,.tp-sglv_i,.tp-grlv_g,.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw,.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-p2dv_b:hover,.tp-btnv_b:hover,.tp-lstv_s:hover{background-color:var(--btn-bg-h)}.tp-p2dv_b:focus,.tp-btnv_b:focus,.tp-lstv_s:focus{background-color:var(--btn-bg-f)}.tp-p2dv_b:active,.tp-btnv_b:active,.tp-lstv_s:active{background-color:var(--btn-bg-a)}.tp-p2dv_b:disabled,.tp-btnv_b:disabled,.tp-lstv_s:disabled{opacity:.5}.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-txtv_i:hover,.tp-p2dpv_p:hover,.tp-colswv_sw:hover{background-color:var(--in-bg-h)}.tp-txtv_i:focus,.tp-p2dpv_p:focus,.tp-colswv_sw:focus{background-color:var(--in-bg-f)}.tp-txtv_i:active,.tp-p2dpv_p:active,.tp-colswv_sw:active{background-color:var(--in-bg-a)}.tp-txtv_i:disabled,.tp-p2dpv_p:disabled,.tp-colswv_sw:disabled{opacity:.5}.tp-mllv_i,.tp-sglv_i,.tp-grlv_g{background-color:var(--mo-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--mo-fg);height:var(--bld-us);scrollbar-color:currentColor rgba(0,0,0,0);scrollbar-width:thin;width:100%}.tp-mllv_i::-webkit-scrollbar,.tp-sglv_i::-webkit-scrollbar,.tp-grlv_g::-webkit-scrollbar{height:8px;width:8px}.tp-mllv_i::-webkit-scrollbar-corner,.tp-sglv_i::-webkit-scrollbar-corner,.tp-grlv_g::-webkit-scrollbar-corner{background-color:rgba(0,0,0,0)}.tp-mllv_i::-webkit-scrollbar-thumb,.tp-sglv_i::-webkit-scrollbar-thumb,.tp-grlv_g::-webkit-scrollbar-thumb{background-clip:padding-box;background-color:currentColor;border:rgba(0,0,0,0) solid 2px;border-radius:4px}.tp-rotv{--font-family: var(--tp-font-family, Roboto Mono, Source Code Pro, Menlo, Courier, monospace);--bs-br: var(--tp-base-border-radius, 6px);--cnt-h-p: var(--tp-container-horizontal-padding, 4px);--cnt-v-p: var(--tp-container-vertical-padding, 4px);--elm-br: var(--tp-element-border-radius, 2px);--bld-s: var(--tp-blade-spacing, 4px);--bld-us: var(--tp-blade-unit-size, 20px);--bs-bg: var(--tp-base-background-color, hsl(230, 7%, 17%));--bs-sh: var(--tp-base-shadow-color, rgba(0, 0, 0, 0.2));--btn-bg: var(--tp-button-background-color, hsl(230, 7%, 70%));--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, hsl(230, 7%, 17%));--cnt-bg: var(--tp-container-background-color, rgba(187, 188, 196, 0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187, 188, 196, 0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187, 188, 196, 0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187, 188, 196, 0.15));--cnt-fg: var(--tp-container-foreground-color, hsl(230, 7%, 75%));--in-bg: var(--tp-input-background-color, rgba(187, 188, 196, 0.1));--in-bg-a: var(--tp-input-background-color-active, rgba(187, 188, 196, 0.25));--in-bg-f: var(--tp-input-background-color-focus, rgba(187, 188, 196, 0.2));--in-bg-h: var(--tp-input-background-color-hover, rgba(187, 188, 196, 0.15));--in-fg: var(--tp-input-foreground-color, hsl(230, 7%, 75%));--lbl-fg: var(--tp-label-foreground-color, rgba(187, 188, 196, 0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0, 0, 0, 0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187, 188, 196, 0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(187, 188, 196, 0.1))}.tp-rotv_c>.tp-cntv.tp-v-lst,.tp-tabv_c .tp-brkv>.tp-cntv.tp-v-lst,.tp-fldv_c>.tp-cntv.tp-v-lst{margin-bottom:calc(-1*var(--cnt-v-p))}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-rotv_c>*:not(.tp-v-fst),.tp-tabv_c .tp-brkv>*:not(.tp-v-fst),.tp-fldv_c>*:not(.tp-v-fst){margin-top:var(--bld-s)}.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-v-p)}.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-cntv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-v-p)}.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-tabv_c .tp-brkv>.tp-cntv,.tp-fldv_c>.tp-cntv{margin-left:4px}.tp-tabv_c .tp-brkv>.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--elm-br);border-bottom-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-tabv_c .tp-brkv .tp-fldv>.tp-fldv_c,.tp-fldv_c .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv>.tp-cntv+.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-cntv+.tp-fldv>.tp-fldv_b{border-top-left-radius:0}.tp-tabv_c .tp-brkv>.tp-cntv+.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-cntv+.tp-tabv>.tp-tabv_t{border-top-left-radius:0}.tp-tabv_c .tp-brkv>.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-tabv>.tp-tabv_t{border-top-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv .tp-tabv>.tp-tabv_c,.tp-fldv_c .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--elm-br)}.tp-rotv_b,.tp-fldv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);overflow:hidden;padding-left:var(--cnt-h-p);padding-right:calc(4px + var(--bld-us) + var(--cnt-h-p));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-rotv_b:hover,.tp-fldv_b:hover{background-color:var(--cnt-bg-h)}.tp-rotv_b:focus,.tp-fldv_b:focus{background-color:var(--cnt-bg-f)}.tp-rotv_b:active,.tp-fldv_b:active{background-color:var(--cnt-bg-a)}.tp-rotv_b:disabled,.tp-fldv_b:disabled{opacity:.5}.tp-rotv_m,.tp-fldv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:"";display:block;height:6px;right:calc(var(--cnt-h-p) + (var(--bld-us) + 4px - 6px)/2 - 2px);margin:auto;opacity:.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-rotv.tp-rotv-expanded .tp-rotv_m,.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m{transform:none}.tp-rotv_c,.tp-fldv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c,.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c{display:none}.tp-rotv.tp-rotv-expanded .tp-rotv_c,.tp-fldv.tp-fldv-expanded>.tp-fldv_c{opacity:1;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-lstv,.tp-coltxtv_m{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m,.tp-coltxtv_mm{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-lstv_m svg,.tp-coltxtv_mm svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-lstv_m svg path,.tp-coltxtv_mm svg path{fill:currentColor}.tp-pndtxtv,.tp-coltxtv_w{display:flex}.tp-pndtxtv_a,.tp-coltxtv_c{width:100%}.tp-pndtxtv_a+.tp-pndtxtv_a,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-coltxtv_c{margin-left:2px}.tp-btnv_b{width:100%}.tp-btnv_t{text-align:center}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--elm-br);cursor:pointer;display:block;height:var(--bld-us);position:relative;width:var(--bld-us)}.tp-ckbv_w svg{bottom:0;display:block;height:16px;left:0;margin:auto;opacity:0;position:absolute;right:0;top:0;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--bld-us)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-cpl .tp-colv_p{overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--bld-s);opacity:1}.tp-colv .tp-popv{left:calc(-1*var(--cnt-h-p));right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--bld-s)}.tp-colpv_rgb{display:flex;margin-top:var(--bld-s);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-v-p);padding-top:calc(var(--cnt-v-p) + 2px);position:relative}.tp-colpv_a::before{background-color:var(--grv-fg);content:"";height:2px;left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:0}.tp-colpv.tp-v-disabled .tp-colpv_a::before{opacity:.5}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--elm-br);outline:none;overflow:hidden;position:relative}.tp-svpv.tp-v-disabled{opacity:.5}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--bld-us)*4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0, 0, 0, 0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative}.tp-hplv.tp-v-disabled{opacity:.5}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--elm-br);border:rgba(255,255,255,.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative;width:100%}.tp-aplv.tp-v-disabled{opacity:.5}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--elm-br);box-shadow:0 0 2px rgba(0,0,0,.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;pointer-events:none;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--elm-br);border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--elm-br);overflow:hidden}.tp-colswv.tp-v-disabled{opacity:.5}.tp-colswv_sw{border-radius:0}.tp-colswv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;cursor:pointer;display:block;height:var(--bld-us);left:0;margin:0;outline:none;padding:0;position:absolute;top:0;width:var(--bld-us)}.tp-colswv_b:focus::after{border:rgba(255,255,255,.75) solid 2px;border-radius:var(--elm-br);bottom:0;content:"";display:block;left:0;position:absolute;right:0;top:0}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--elm-br);color:var(--lbl-fg);cursor:pointer;height:var(--bld-us);line-height:var(--bld-us);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv.tp-v-disabled .tp-coltxtv_mm{opacity:.5}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv{position:relative}.tp-fldv.tp-fldv-not .tp-fldv_b{display:none}.tp-fldv_t{padding-left:4px}.tp-fldv_b:disabled .tp-fldv_m{display:none}.tp-fldv_c{padding-left:4px}.tp-fldv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--bld-us) + 4px);width:var(--bs-br)}.tp-fldv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-fldv_b:hover+.tp-fldv_i{color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_i{color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_i{color:var(--cnt-bg-a)}.tp-fldv.tp-v-disabled>.tp-fldv_i{opacity:.5}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--bld-us)*3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left .05s,top .05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-h-p);padding-right:var(--cnt-h-p)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:160px}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding:0 4px}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:.5}.tp-mllv_i{display:block;height:calc(var(--bld-us)*3);line-height:var(--bld-us);padding:0 4px;resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--bld-us);margin-right:4px;position:relative;width:var(--bld-us)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--bld-s);opacity:1}.tp-p2dv .tp-popv{left:calc(-1*var(--cnt-h-p));right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-p2dpv{padding-left:calc(var(--bld-us) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv.tp-v-disabled .tp-p2dpv_p{opacity:.5}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:6px;box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:168px;padding:var(--cnt-v-p) var(--cnt-h-p);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sprv.tp-v-disabled .tp-sprv_r{opacity:.5}.tp-sldv.tp-v-disabled{opacity:.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--bld-us);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;bottom:0;content:"";display:block;height:2px;left:0;margin:auto;position:absolute;right:0;top:0}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";display:block;height:2px;left:0;margin-bottom:auto;margin-top:auto;position:absolute;right:0;top:0}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--elm-br);bottom:0;content:"";display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv{position:relative}.tp-tabv_t{align-items:flex-end;color:var(--cnt-bg);display:flex;overflow:hidden;position:relative}.tp-tabv_t:hover{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus){color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active){color:var(--cnt-bg-a)}.tp-tabv_t::before{background-color:currentColor;bottom:0;content:"";height:2px;left:0;pointer-events:none;position:absolute;right:0}.tp-tabv.tp-v-disabled .tp-tabv_t::before{opacity:.5}.tp-tabv.tp-tabv-nop .tp-tabv_t{height:calc(var(--bld-us) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_t::before{background-color:var(--cnt-bg);bottom:0;content:"";height:2px;left:0;position:absolute;right:0}.tp-tabv_c{padding-bottom:var(--cnt-v-p);padding-left:4px;padding-top:var(--cnt-v-p)}.tp-tabv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--bld-us) + 4px);width:var(--bs-br)}.tp-tabv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-tabv_t:hover+.tp-tabv_i{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus)+.tp-tabv_i{color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active)+.tp-tabv_i{color:var(--cnt-bg-a)}.tp-tabv.tp-v-disabled>.tp-tabv_i{opacity:.5}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv.tp-v-disabled::before{opacity:.5}.tp-tbiv_b{display:block;padding-left:calc(var(--cnt-h-p) + 4px);padding-right:calc(var(--cnt-h-p) + 4px);position:relative;width:100%}.tp-tbiv_b:disabled{opacity:.5}.tp-tbiv_b::before{background-color:var(--cnt-bg);bottom:2px;content:"";left:0;pointer-events:none;position:absolute;right:0;top:0}.tp-tbiv_b:hover::before{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus::before{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active::before{background-color:var(--cnt-bg-a)}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);opacity:.5;overflow:hidden;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-txtv{position:relative}.tp-txtv_i{padding:0 4px}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:.3}.tp-txtv_k{cursor:pointer;height:100%;left:-3px;position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";height:calc(var(--bld-us) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:.1;position:absolute;top:0;transition:border-radius .1s,height .1s,transform .1s,width .1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--elm-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0);border-style:solid;border-width:2px;box-sizing:border-box;content:"";font-size:.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--font-family);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(4px + var(--bld-us) + var(--cnt-h-p));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0}.tp-rotv.tp-rotv-not .tp-rotv_b{display:none}.tp-rotv_b:disabled .tp-rotv_m{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1*var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1*var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_t{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}'), this.pool_.getAll().forEach((e) => {
          this.embedPluginStyle_(e);
        }), this.registerPlugin({
          plugins: [
            Gc,
            Fc,
            yi,
            Hc
          ]
        });
      }
    }
    const Xc = new s("3.1.7");
    r.BladeApi = a, r.ButtonApi = j2, r.FolderApi = vi, r.InputBindingApi = mi, r.ListApi = ea, r.MonitorBindingApi = fi, r.Pane = $c, r.SeparatorApi = ss, r.SliderApi = ta, r.TabApi = os, r.TabPageApi = wi, r.TextApi = na, r.TpChangeEvent = u, r.VERSION = Xc, Object.defineProperty(r, "__esModule", { value: true });
  });
})(Ch, js);
var Ji = {};
var Ph = {
  get exports() {
    return Ji;
  },
  set exports(b2) {
    Ji = b2;
  }
};
(function(b2, i) {
  (function(r, s) {
    s(i);
  })(el, function(r) {
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
      constructor(o, p, f2, x) {
        super(o), this.value = p, this.presetKey = f2, this.last = x ?? true;
      }
    }
    function u(m) {
      return m;
    }
    function h2(m) {
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
        var p;
        this.message = (p = d[o.type](o.context)) !== null && p !== void 0 ? p : "Unexpected error", this.name = this.constructor.name, this.stack = new Error(this.message).stack, this.type = o.type;
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
        let f2 = this.observers_[o];
        return f2 || (f2 = this.observers_[o] = []), f2.push({
          handler: p
        }), this;
      }
      off(o, p) {
        const f2 = this.observers_[o];
        return f2 && (this.observers_[o] = f2.filter((x) => x.handler !== p)), this;
      }
      emit(o, p) {
        const f2 = this.observers_[o];
        f2 && f2.forEach((x) => {
          x.handler(p);
        });
      }
    }
    const _ = "tp";
    function y2(m) {
      return (p, f2) => [
        _,
        "-",
        m,
        "v",
        p ? `_${p}` : "",
        f2 ? `-${f2}` : ""
      ].join("");
    }
    function C(m, o) {
      return (p) => o(m(p));
    }
    function I2(m) {
      return m.rawValue;
    }
    function S2(m, o) {
      m.emitter.on("change", C(I2, o)), o(m.rawValue);
    }
    function R2(m, o, p) {
      S2(m.value(o), p);
    }
    function j2(m, o, p) {
      p ? m.classList.add(o) : m.classList.remove(o);
    }
    function F(m, o) {
      return (p) => {
        j2(m, o, p);
      };
    }
    function V2(m, o) {
      S2(m, (p) => {
        o.textContent = p ?? "";
      });
    }
    const D = y2("btn");
    class Y {
      constructor(o, p) {
        this.element = o.createElement("div"), this.element.classList.add(D()), p.viewProps.bindClassModifiers(this.element);
        const f2 = o.createElement("button");
        f2.classList.add(D("b")), p.viewProps.bindDisabled(f2), this.element.appendChild(f2), this.buttonElement = f2;
        const x = o.createElement("div");
        x.classList.add(D("t")), V2(p.props.value("title"), x), this.buttonElement.appendChild(x);
      }
    }
    class G2 {
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
        var f2;
        this.constraint_ = p == null ? void 0 : p.constraint, this.equals_ = (f2 = p == null ? void 0 : p.equals) !== null && f2 !== void 0 ? f2 : (x, P) => x === P, this.emitter = new w(), this.rawValue_ = o;
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
        const f2 = p ?? {
          forceEmit: false,
          last: true
        }, x = this.constraint_ ? this.constraint_.constrain(o) : o, P = this.rawValue_;
        this.equals_(P, x) && !f2.forceEmit || (this.emitter.emit("beforechange", {
          sender: this
        }), this.rawValue_ = x, this.emitter.emit("change", {
          options: f2,
          previousRawValue: P,
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
        const f2 = p ?? {
          forceEmit: false,
          last: true
        }, x = this.value_;
        x === o && !f2.forceEmit || (this.emitter.emit("beforechange", {
          sender: this
        }), this.value_ = o, this.emitter.emit("change", {
          options: f2,
          previousRawValue: x,
          rawValue: this.value_,
          sender: this
        }));
      }
    }
    function H2(m, o) {
      const p = o == null ? void 0 : o.constraint, f2 = o == null ? void 0 : o.equals;
      return !p && !f2 ? new O(m) : new N(m, o);
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
        return Object.keys(o).reduce((f2, x) => Object.assign(f2, {
          [x]: H2(o[x])
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
    function q(m, o) {
      const f2 = Object.keys(o).reduce((x, P) => {
        if (x === void 0)
          return;
        const L2 = o[P], z = L2(m[P]);
        return z.succeeded ? Object.assign(Object.assign({}, x), { [P]: z.value }) : void 0;
      }, {});
      return f2;
    }
    function ue2(m, o) {
      return m.reduce((p, f2) => {
        if (p === void 0)
          return;
        const x = o(f2);
        if (!(!x.succeeded || x.value === void 0))
          return [...p, x.value];
      }, []);
    }
    function ge(m) {
      return m === null ? false : typeof m == "object";
    }
    function ce2(m) {
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
        const f2 = m(p);
        return f2 !== void 0 ? {
          succeeded: true,
          value: f2
        } : {
          succeeded: false,
          value: void 0
        };
      };
    }
    function me2(m) {
      return {
        custom: (o) => ce2(o)(m),
        boolean: ce2((o) => typeof o == "boolean" ? o : void 0)(m),
        number: ce2((o) => typeof o == "number" ? o : void 0)(m),
        string: ce2((o) => typeof o == "string" ? o : void 0)(m),
        function: ce2((o) => typeof o == "function" ? o : void 0)(m),
        constant: (o) => ce2((p) => p === o ? o : void 0)(m),
        raw: ce2((o) => o)(m),
        object: (o) => ce2((p) => {
          if (ge(p))
            return q(p, o);
        })(m),
        array: (o) => ce2((p) => {
          if (Array.isArray(p))
            return ue2(p, o);
        })(m)
      };
    }
    const he = {
      optional: me2(true),
      required: me2(false)
    };
    function ee2(m, o) {
      const p = he.required.object(o)(m);
      return p.succeeded ? p.value : void 0;
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
    class fe2 {
      constructor(o) {
        this.value_ = o;
      }
      static create(o) {
        return [
          new fe2(o),
          (p, f2) => {
            o.setRawValue(p, f2);
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
    const ae = y2("");
    function ne(m, o) {
      return F(m, ae(void 0, o));
    }
    class be extends K {
      constructor(o) {
        var p;
        super(o), this.onDisabledChange_ = this.onDisabledChange_.bind(this), this.onParentChange_ = this.onParentChange_.bind(this), this.onParentGlobalDisabledChange_ = this.onParentGlobalDisabledChange_.bind(this), [this.globalDisabled_, this.setGlobalDisabled_] = fe2.create(H2(this.getGlobalDisabled_())), this.value("disabled").emitter.on("change", this.onDisabledChange_), this.value("parent").emitter.on("change", this.onParentChange_), (p = this.get("parent")) === null || p === void 0 || p.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_);
      }
      static create(o) {
        var p, f2, x;
        const P = o ?? {};
        return new be(K.createCore({
          disabled: (p = P.disabled) !== null && p !== void 0 ? p : false,
          disposed: false,
          hidden: (f2 = P.hidden) !== null && f2 !== void 0 ? f2 : false,
          parent: (x = P.parent) !== null && x !== void 0 ? x : null
        }));
      }
      get globalDisabled() {
        return this.globalDisabled_;
      }
      bindClassModifiers(o) {
        S2(this.globalDisabled_, ne(o, "disabled")), R2(this, "hidden", ne(o, "hidden"));
      }
      bindDisabled(o) {
        S2(this.globalDisabled_, (p) => {
          o.disabled = p;
        });
      }
      bindTabIndex(o) {
        S2(this.globalDisabled_, (p) => {
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
        const f2 = o.previousRawValue;
        f2 == null || f2.globalDisabled.emitter.off("change", this.onParentGlobalDisabledChange_), (p = this.get("parent")) === null || p === void 0 || p.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_), this.updateGlobalDisabled_();
      }
    }
    function M() {
      return ["veryfirst", "first", "last", "verylast"];
    }
    const le2 = y2(""), Ve = {
      veryfirst: "vfst",
      first: "fst",
      last: "lst",
      verylast: "vlst"
    };
    class Ne2 {
      constructor(o) {
        this.parent_ = null, this.blade = o.blade, this.view = o.view, this.viewProps = o.viewProps;
        const p = this.view.element;
        this.blade.value("positions").emitter.on("change", () => {
          M().forEach((f2) => {
            p.classList.remove(le2(void 0, Ve[f2]));
          }), this.blade.get("positions").forEach((f2) => {
            p.classList.add(le2(void 0, Ve[f2]));
          });
        }), this.viewProps.handleDispose(() => {
          Pe(p);
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
    function it2(m) {
      m.offsetHeight;
    }
    function Bn(m, o) {
      const p = m.style.transition;
      m.style.transition = "none", o(), m.style.transition = p;
    }
    function Xe2(m) {
      return m.ontouchstart !== void 0;
    }
    function jn(m) {
      for (; m.childNodes.length > 0; )
        m.removeChild(m.childNodes[0]);
    }
    function an(m) {
      return m.relatedTarget ? m.relatedTarget : "explicitOriginalTarget" in m ? m.explicitOriginalTarget : null;
    }
    const dt2 = y2("lbl");
    function Mt(m, o) {
      const p = m.createDocumentFragment();
      return o.split(`
`).map((x) => m.createTextNode(x)).forEach((x, P) => {
        P > 0 && p.appendChild(m.createElement("br")), p.appendChild(x);
      }), p;
    }
    class ze {
      constructor(o, p) {
        this.element = o.createElement("div"), this.element.classList.add(dt2()), p.viewProps.bindClassModifiers(this.element);
        const f2 = o.createElement("div");
        f2.classList.add(dt2("l")), R2(p.props, "label", (P) => {
          h2(P) ? this.element.classList.add(dt2(void 0, "nol")) : (this.element.classList.remove(dt2(void 0, "nol")), jn(f2), f2.appendChild(Mt(o, P)));
        }), this.element.appendChild(f2), this.labelElement = f2;
        const x = o.createElement("div");
        x.classList.add(dt2("v")), this.element.appendChild(x), this.valueElement = x;
      }
    }
    class st2 extends Ne2 {
      constructor(o, p) {
        const f2 = p.valueController.viewProps;
        super(Object.assign(Object.assign({}, p), { view: new ze(o, {
          props: p.props,
          viewProps: f2
        }), viewProps: f2 })), this.props = p.props, this.valueController = p.valueController, this.view.valueElement.appendChild(this.valueController.view.element);
      }
    }
    class ln extends Ne2 {
      constructor(o) {
        super(o), this.value = o.value;
      }
    }
    class mt extends K {
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
        }, f2 = K.createCore(p);
        return new mt(f2);
      }
      get styleExpanded() {
        var o;
        return (o = this.get("temporaryExpanded")) !== null && o !== void 0 ? o : this.get("expanded");
      }
      get styleHeight() {
        if (!this.styleExpanded)
          return "0";
        const o = this.get("expandedHeight");
        return this.get("shouldFixHeight") && !h2(o) ? `${o}px` : "auto";
      }
      bindExpandedClass(o, p) {
        const f2 = () => {
          this.styleExpanded ? o.classList.add(p) : o.classList.remove(p);
        };
        R2(this, "expanded", f2), R2(this, "temporaryExpanded", f2);
      }
      cleanUpTransition() {
        this.set("shouldFixHeight", false), this.set("expandedHeight", null), this.set("completed", true);
      }
    }
    function zn(m) {
      return mt.create(m);
    }
    function hi(m, o) {
      let p = 0;
      return Bn(o, () => {
        m.set("expandedHeight", null), m.set("temporaryExpanded", true), it2(o), p = o.clientHeight, m.set("temporaryExpanded", null), it2(o);
      }), p;
    }
    function Un(m, o) {
      o.style.height = m.styleHeight;
    }
    function Gn(m, o) {
      m.value("expanded").emitter.on("beforechange", () => {
        m.set("completed", false), h2(m.get("expandedHeight")) && m.set("expandedHeight", hi(m, o)), m.set("shouldFixHeight", true), it2(o);
      }), m.emitter.on("change", () => {
        Un(m, o);
      }), Un(m, o), o.addEventListener("transitionend", (p) => {
        p.propertyName === "height" && m.cleanUpTransition();
      });
    }
    class yt {
      constructor(o, p) {
        const f2 = y2(p.viewName);
        this.element = o.createElement("div"), this.element.classList.add(f2()), p.viewProps.bindClassModifiers(this.element);
      }
    }
    class St extends ln {
      constructor(o, p) {
        const f2 = p.valueController.viewProps;
        super(Object.assign(Object.assign({}, p), { value: p.valueController.value, view: new ze(o, {
          props: p.props,
          viewProps: f2
        }), viewProps: f2 })), this.props = p.props, this.valueController = p.valueController, this.view.valueElement.appendChild(this.valueController.view.element);
      }
    }
    class Hn {
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
    class cn {
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
    class Kn {
      constructor(o) {
        this.constraints = o;
      }
      constrain(o) {
        return this.constraints.reduce((p, f2) => f2.constrain(p), o);
      }
    }
    function xt(m, o) {
      if (m instanceof o)
        return m;
      if (m instanceof Kn) {
        const p = m.constraints.reduce((f2, x) => f2 || (x instanceof o ? x : null), null);
        if (p)
          return p;
      }
      return null;
    }
    class ft {
      constructor(o) {
        this.values = K.fromObject({
          max: o.max,
          min: o.min
        });
      }
      constrain(o) {
        const p = this.values.get("max"), f2 = this.values.get("min");
        return Math.min(Math.max(o, f2), p);
      }
    }
    class At {
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
        const p = this.values.get("max"), f2 = this.values.get("min");
        let x = o;
        return h2(f2) || (x = Math.max(x, f2)), h2(p) || (x = Math.min(x, p)), x;
      }
    }
    class A2 {
      constructor(o, p = 0) {
        this.step = o, this.origin = p;
      }
      constrain(o) {
        const p = this.origin % this.step, f2 = Math.round((o - p) / this.step);
        return p + f2 * this.step;
      }
    }
    const U = y2("pop");
    class W {
      constructor(o, p) {
        this.element = o.createElement("div"), this.element.classList.add(U()), p.viewProps.bindClassModifiers(this.element), S2(p.shows, F(this.element, U(void 0, "v")));
      }
    }
    class ie {
      constructor(o, p) {
        this.shows = H2(false), this.viewProps = p.viewProps, this.view = new W(o, {
          shows: this.shows,
          viewProps: this.viewProps
        });
      }
    }
    const ye = y2("txt");
    class De {
      constructor(o, p) {
        this.onChange_ = this.onChange_.bind(this), this.element = o.createElement("div"), this.element.classList.add(ye()), p.viewProps.bindClassModifiers(this.element), this.props_ = p.props, this.props_.emitter.on("change", this.onChange_);
        const f2 = o.createElement("input");
        f2.classList.add(ye("i")), f2.type = "text", p.viewProps.bindDisabled(f2), this.element.appendChild(f2), this.inputElement = f2, p.value.emitter.on("change", this.onChange_), this.value_ = p.value, this.refresh();
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
        this.onInputChange_ = this.onInputChange_.bind(this), this.parser_ = p.parser, this.props = p.props, this.value = p.value, this.viewProps = p.viewProps, this.view = new De(o, {
          props: p.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_);
      }
      onInputChange_(o) {
        const f2 = o.currentTarget.value, x = this.parser_(f2);
        h2(x) || (this.value.rawValue = x), this.view.refresh();
      }
    }
    function pn(m) {
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
    class Gs {
      constructor(o, p, f2) {
        this.left = p, this.operator = o, this.right = f2;
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
    const Hs = {
      "+": (m) => m,
      "-": (m) => -m,
      "~": (m) => ~m
    };
    class Ks {
      constructor(o, p) {
        this.operator = o, this.expression = p;
      }
      evaluate() {
        const o = Hs[this.operator];
        if (!o)
          throw new Error(`unexpected unary operator: '${this.operator}`);
        return o(this.expression.evaluate());
      }
      toString() {
        return ["u(", this.operator, this.expression.toString(), ")"].join(" ");
      }
    }
    function di(m) {
      return (o, p) => {
        for (let f2 = 0; f2 < m.length; f2++) {
          const x = m[f2](o, p);
          if (x !== "")
            return x;
        }
        return "";
      };
    }
    function Lt(m, o) {
      var p;
      const f2 = m.substr(o).match(/^\s+/);
      return (p = f2 && f2[0]) !== null && p !== void 0 ? p : "";
    }
    function mi(m, o) {
      const p = m.substr(o, 1);
      return p.match(/^[1-9]$/) ? p : "";
    }
    function Fe(m, o) {
      var p;
      const f2 = m.substr(o).match(/^[0-9]+/);
      return (p = f2 && f2[0]) !== null && p !== void 0 ? p : "";
    }
    function fi(m, o) {
      const p = Fe(m, o);
      if (p !== "")
        return p;
      const f2 = m.substr(o, 1);
      if (o += 1, f2 !== "-" && f2 !== "+")
        return "";
      const x = Fe(m, o);
      return x === "" ? "" : f2 + x;
    }
    function rt2(m, o) {
      const p = m.substr(o, 1);
      if (o += 1, p.toLowerCase() !== "e")
        return "";
      const f2 = fi(m, o);
      return f2 === "" ? "" : p + f2;
    }
    function ts(m, o) {
      const p = m.substr(o, 1);
      if (p === "0")
        return p;
      const f2 = mi(m, o);
      return o += f2.length, f2 === "" ? "" : f2 + Fe(m, o);
    }
    function un(m, o) {
      const p = ts(m, o);
      if (o += p.length, p === "")
        return "";
      const f2 = m.substr(o, 1);
      if (o += f2.length, f2 !== ".")
        return "";
      const x = Fe(m, o);
      return o += x.length, p + f2 + x + rt2(m, o);
    }
    function ns(m, o) {
      const p = m.substr(o, 1);
      if (o += p.length, p !== ".")
        return "";
      const f2 = Fe(m, o);
      return o += f2.length, f2 === "" ? "" : p + f2 + rt2(m, o);
    }
    function $n(m, o) {
      const p = ts(m, o);
      return o += p.length, p === "" ? "" : p + rt2(m, o);
    }
    const vi = di([
      un,
      ns,
      $n
    ]);
    function bi(m, o) {
      var p;
      const f2 = m.substr(o).match(/^[01]+/);
      return (p = f2 && f2[0]) !== null && p !== void 0 ? p : "";
    }
    function $s(m, o) {
      const p = m.substr(o, 2);
      if (o += p.length, p.toLowerCase() !== "0b")
        return "";
      const f2 = bi(m, o);
      return f2 === "" ? "" : p + f2;
    }
    function Xs(m, o) {
      var p;
      const f2 = m.substr(o).match(/^[0-7]+/);
      return (p = f2 && f2[0]) !== null && p !== void 0 ? p : "";
    }
    function Ys(m, o) {
      const p = m.substr(o, 2);
      if (o += p.length, p.toLowerCase() !== "0o")
        return "";
      const f2 = Xs(m, o);
      return f2 === "" ? "" : p + f2;
    }
    function qs(m, o) {
      var p;
      const f2 = m.substr(o).match(/^[0-9a-f]+/i);
      return (p = f2 && f2[0]) !== null && p !== void 0 ? p : "";
    }
    function gi(m, o) {
      const p = m.substr(o, 2);
      if (o += p.length, p.toLowerCase() !== "0x")
        return "";
      const f2 = qs(m, o);
      return f2 === "" ? "" : p + f2;
    }
    const Qs = di([
      $s,
      Ys,
      gi
    ]), Zs = di([
      Qs,
      vi
    ]);
    function hn(m, o) {
      const p = Zs(m, o);
      return o += p.length, p === "" ? null : {
        evaluable: new Ue(p),
        cursor: o
      };
    }
    function is(m, o) {
      const p = m.substr(o, 1);
      if (o += p.length, p !== "(")
        return null;
      const f2 = _i(m, o);
      if (!f2)
        return null;
      o = f2.cursor, o += Lt(m, o).length;
      const x = m.substr(o, 1);
      return o += x.length, x !== ")" ? null : {
        evaluable: f2.evaluable,
        cursor: o
      };
    }
    function Ws(m, o) {
      var p;
      return (p = hn(m, o)) !== null && p !== void 0 ? p : is(m, o);
    }
    function Xn(m, o) {
      const p = Ws(m, o);
      if (p)
        return p;
      const f2 = m.substr(o, 1);
      if (o += f2.length, f2 !== "+" && f2 !== "-" && f2 !== "~")
        return null;
      const x = Xn(m, o);
      return x ? (o = x.cursor, {
        cursor: o,
        evaluable: new Ks(f2, x.evaluable)
      }) : null;
    }
    function Js(m, o, p) {
      p += Lt(o, p).length;
      const f2 = m.filter((x) => o.startsWith(x, p))[0];
      return f2 ? (p += f2.length, p += Lt(o, p).length, {
        cursor: p,
        operator: f2
      }) : null;
    }
    function Gt(m, o) {
      return (p, f2) => {
        const x = m(p, f2);
        if (!x)
          return null;
        f2 = x.cursor;
        let P = x.evaluable;
        for (; ; ) {
          const L2 = Js(o, p, f2);
          if (!L2)
            break;
          f2 = L2.cursor;
          const z = m(p, f2);
          if (!z)
            return null;
          f2 = z.cursor, P = new Gs(L2.operator, P, z.evaluable);
        }
        return P ? {
          cursor: f2,
          evaluable: P
        } : null;
      };
    }
    const ss = [
      ["**"],
      ["*", "/", "%"],
      ["+", "-"],
      ["<<", ">>>", ">>"],
      ["&"],
      ["^"],
      ["|"]
    ].reduce((m, o) => Gt(m, o), Xn);
    function _i(m, o) {
      return o += Lt(m, o).length, ss(m, o);
    }
    function er(m) {
      const o = _i(m, 0);
      return !o || o.cursor + Lt(m, o.cursor).length !== m.length ? null : o.evaluable;
    }
    function dn(m) {
      var o;
      const p = er(m);
      return (o = p == null ? void 0 : p.evaluate()) !== null && o !== void 0 ? o : null;
    }
    function tr(m) {
      if (typeof m == "number")
        return m;
      if (typeof m == "string") {
        const o = dn(m);
        if (!h2(o))
          return o;
      }
      return 0;
    }
    function Le(m) {
      return (o) => o.toFixed(Math.max(Math.min(m, 20), 0));
    }
    const nr = Le(0);
    function Yn(m) {
      return nr(m) + "%";
    }
    function rs(m) {
      return String(m);
    }
    function wi(m, o) {
      for (; m.length < o; )
        m.push(void 0);
    }
    function os(m) {
      const o = [];
      return wi(o, m), H2(o);
    }
    function as(m) {
      const o = m.indexOf(void 0);
      return o < 0 ? m : m.slice(0, o);
    }
    function ir(m, o) {
      const p = [...as(m), o];
      return p.length > m.length ? p.splice(0, p.length - m.length) : wi(p, m.length), p;
    }
    function Ht({ primary: m, secondary: o, forward: p, backward: f2 }) {
      let x = false;
      function P(L2) {
        x || (x = true, L2(), x = false);
      }
      m.emitter.on("change", (L2) => {
        P(() => {
          o.setRawValue(p(m, o), L2.options);
        });
      }), o.emitter.on("change", (L2) => {
        P(() => {
          m.setRawValue(f2(m, o), L2.options);
        }), P(() => {
          o.setRawValue(p(m, o), L2.options);
        });
      }), P(() => {
        o.setRawValue(p(m, o), {
          forceEmit: false,
          last: true
        });
      });
    }
    function Kt(m, o) {
      const p = m * (o.altKey ? 0.1 : 1) * (o.shiftKey ? 10 : 1);
      return o.upKey ? +p : o.downKey ? -p : 0;
    }
    function mn(m) {
      return {
        altKey: m.altKey,
        downKey: m.key === "ArrowDown",
        shiftKey: m.shiftKey,
        upKey: m.key === "ArrowUp"
      };
    }
    function yi(m) {
      return {
        altKey: m.altKey,
        downKey: m.key === "ArrowLeft",
        shiftKey: m.shiftKey,
        upKey: m.key === "ArrowRight"
      };
    }
    function sr(m) {
      return m === "ArrowUp" || m === "ArrowDown";
    }
    function ls(m) {
      return sr(m) || m === "ArrowLeft" || m === "ArrowRight";
    }
    function xi(m, o) {
      var p, f2;
      const x = o.ownerDocument.defaultView, P = o.getBoundingClientRect();
      return {
        x: m.pageX - (((p = x && x.scrollX) !== null && p !== void 0 ? p : 0) + P.left),
        y: m.pageY - (((f2 = x && x.scrollY) !== null && f2 !== void 0 ? f2 : 0) + P.top)
      };
    }
    class qn {
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
        const f2 = this.elem_.ownerDocument;
        f2.addEventListener("mousemove", this.onDocumentMouseMove_), f2.addEventListener("mouseup", this.onDocumentMouseUp_), this.emitter.emit("down", {
          altKey: o.altKey,
          data: this.computePosition_(xi(o, this.elem_)),
          sender: this,
          shiftKey: o.shiftKey
        });
      }
      onDocumentMouseMove_(o) {
        this.emitter.emit("move", {
          altKey: o.altKey,
          data: this.computePosition_(xi(o, this.elem_)),
          sender: this,
          shiftKey: o.shiftKey
        });
      }
      onDocumentMouseUp_(o) {
        const p = this.elem_.ownerDocument;
        p.removeEventListener("mousemove", this.onDocumentMouseMove_), p.removeEventListener("mouseup", this.onDocumentMouseUp_), this.emitter.emit("up", {
          altKey: o.altKey,
          data: this.computePosition_(xi(o, this.elem_)),
          sender: this,
          shiftKey: o.shiftKey
        });
      }
      onTouchStart_(o) {
        o.preventDefault();
        const p = o.targetTouches.item(0), f2 = this.elem_.getBoundingClientRect();
        this.emitter.emit("down", {
          altKey: o.altKey,
          data: this.computePosition_(p ? {
            x: p.clientX - f2.left,
            y: p.clientY - f2.top
          } : void 0),
          sender: this,
          shiftKey: o.shiftKey
        }), this.lastTouch_ = p;
      }
      onTouchMove_(o) {
        const p = o.targetTouches.item(0), f2 = this.elem_.getBoundingClientRect();
        this.emitter.emit("move", {
          altKey: o.altKey,
          data: this.computePosition_(p ? {
            x: p.clientX - f2.left,
            y: p.clientY - f2.top
          } : void 0),
          sender: this,
          shiftKey: o.shiftKey
        }), this.lastTouch_ = p;
      }
      onTouchEnd_(o) {
        var p;
        const f2 = (p = o.targetTouches.item(0)) !== null && p !== void 0 ? p : this.lastTouch_, x = this.elem_.getBoundingClientRect();
        this.emitter.emit("up", {
          altKey: o.altKey,
          data: this.computePosition_(f2 ? {
            x: f2.clientX - x.left,
            y: f2.clientY - x.top
          } : void 0),
          sender: this,
          shiftKey: o.shiftKey
        });
      }
    }
    function Me(m, o, p, f2, x) {
      const P = (m - o) / (p - o);
      return f2 + P * (x - f2);
    }
    function cs(m) {
      return String(m.toFixed(10)).split(".")[1].replace(/0+$/, "").length;
    }
    function $t(m, o, p) {
      return Math.min(Math.max(m, o), p);
    }
    const Ye2 = y2("txt");
    class rr {
      constructor(o, p) {
        this.onChange_ = this.onChange_.bind(this), this.props_ = p.props, this.props_.emitter.on("change", this.onChange_), this.element = o.createElement("div"), this.element.classList.add(Ye2(), Ye2(void 0, "num")), p.arrayPosition && this.element.classList.add(Ye2(void 0, p.arrayPosition)), p.viewProps.bindClassModifiers(this.element);
        const f2 = o.createElement("input");
        f2.classList.add(Ye2("i")), f2.type = "text", p.viewProps.bindDisabled(f2), this.element.appendChild(f2), this.inputElement = f2, this.onDraggingChange_ = this.onDraggingChange_.bind(this), this.dragging_ = p.dragging, this.dragging_.emitter.on("change", this.onDraggingChange_), this.element.classList.add(Ye2()), this.inputElement.classList.add(Ye2("i"));
        const x = o.createElement("div");
        x.classList.add(Ye2("k")), this.element.appendChild(x), this.knobElement = x;
        const P = o.createElementNS(we, "svg");
        P.classList.add(Ye2("g")), this.knobElement.appendChild(P);
        const L2 = o.createElementNS(we, "path");
        L2.classList.add(Ye2("gb")), P.appendChild(L2), this.guideBodyElem_ = L2;
        const z = o.createElementNS(we, "path");
        z.classList.add(Ye2("gh")), P.appendChild(z), this.guideHeadElem_ = z;
        const oe = o.createElement("div");
        oe.classList.add(y2("tt")()), this.knobElement.appendChild(oe), this.tooltipElem_ = oe, p.value.emitter.on("change", this.onChange_), this.value = p.value, this.refresh();
      }
      onDraggingChange_(o) {
        if (o.rawValue === null) {
          this.element.classList.remove(Ye2(void 0, "drg"));
          return;
        }
        this.element.classList.add(Ye2(void 0, "drg"));
        const p = o.rawValue / this.props_.get("draggingScale"), f2 = p + (p > 0 ? -1 : p < 0 ? 1 : 0), x = $t(-f2, -4, 4);
        this.guideHeadElem_.setAttributeNS(null, "d", [`M ${f2 + x},0 L${f2},4 L${f2 + x},8`, `M ${p},-1 L${p},9`].join(" ")), this.guideBodyElem_.setAttributeNS(null, "d", `M 0,4 L${p},4`);
        const P = this.props_.get("formatter");
        this.tooltipElem_.textContent = P(this.value.rawValue), this.tooltipElem_.style.left = `${p}px`;
      }
      refresh() {
        const o = this.props_.get("formatter");
        this.inputElement.value = o(this.value.rawValue);
      }
      onChange_() {
        this.refresh();
      }
    }
    class fn {
      constructor(o, p) {
        var f2;
        this.originRawValue_ = 0, this.onInputChange_ = this.onInputChange_.bind(this), this.onInputKeyDown_ = this.onInputKeyDown_.bind(this), this.onInputKeyUp_ = this.onInputKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.baseStep_ = p.baseStep, this.parser_ = p.parser, this.props = p.props, this.sliderProps_ = (f2 = p.sliderProps) !== null && f2 !== void 0 ? f2 : null, this.value = p.value, this.viewProps = p.viewProps, this.dragging_ = H2(null), this.view = new rr(o, {
          arrayPosition: p.arrayPosition,
          dragging: this.dragging_,
          props: this.props,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.inputElement.addEventListener("change", this.onInputChange_), this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_), this.view.inputElement.addEventListener("keyup", this.onInputKeyUp_);
        const x = new qn(this.view.knobElement);
        x.emitter.on("down", this.onPointerDown_), x.emitter.on("move", this.onPointerMove_), x.emitter.on("up", this.onPointerUp_);
      }
      constrainValue_(o) {
        var p, f2;
        const x = (p = this.sliderProps_) === null || p === void 0 ? void 0 : p.get("minValue"), P = (f2 = this.sliderProps_) === null || f2 === void 0 ? void 0 : f2.get("maxValue");
        let L2 = o;
        return x !== void 0 && (L2 = Math.max(L2, x)), P !== void 0 && (L2 = Math.min(L2, P)), L2;
      }
      onInputChange_(o) {
        const f2 = o.currentTarget.value, x = this.parser_(f2);
        h2(x) || (this.value.rawValue = this.constrainValue_(x)), this.view.refresh();
      }
      onInputKeyDown_(o) {
        const p = Kt(this.baseStep_, mn(o));
        p !== 0 && this.value.setRawValue(this.constrainValue_(this.value.rawValue + p), {
          forceEmit: false,
          last: false
        });
      }
      onInputKeyUp_(o) {
        Kt(this.baseStep_, mn(o)) !== 0 && this.value.setRawValue(this.value.rawValue, {
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
    function et2(m, o) {
      m.write(o);
    }
    function Xt(m) {
      const o = m ? xt(m, A2) : null;
      return o ? o.step : null;
    }
    function vn(m, o) {
      const p = m && xt(m, A2);
      return p ? cs(p.step) : Math.max(cs(o), 2);
    }
    function Ei(m) {
      const o = Xt(m);
      return o ?? 1;
    }
    function Qn(m, o) {
      var p;
      const f2 = m && xt(m, A2), x = Math.abs((p = f2 == null ? void 0 : f2.step) !== null && p !== void 0 ? p : o);
      return x === 0 ? 0.1 : Math.pow(10, Math.floor(Math.log10(x)) - 1);
    }
    function Yt(m) {
      return [m[0], m[1], m[2]];
    }
    function ps(m) {
      const o = $t(Math.floor(m), 0, 255).toString(16);
      return o.length === 1 ? `0${o}` : o;
    }
    function bn(m, o = "#") {
      const p = Yt(m.getComponents("rgb")).map(ps).join("");
      return `${o}${p}`;
    }
    function us(m, o = "#") {
      const p = m.getComponents("rgb"), f2 = [p[0], p[1], p[2], p[3] * 255].map(ps).join("");
      return `${o}${f2}`;
    }
    function or(m, o) {
      const p = Le(o === "float" ? 2 : 0);
      return `rgb(${Yt(m.getComponents("rgb", o)).map((x) => p(x)).join(", ")})`;
    }
    function hs(m) {
      return (o) => or(o, m);
    }
    function ds(m, o) {
      const p = Le(2), f2 = Le(o === "float" ? 2 : 0);
      return `rgba(${m.getComponents("rgb", o).map((P, L2) => (L2 === 3 ? p : f2)(P)).join(", ")})`;
    }
    function ar(m) {
      return (o) => ds(o, m);
    }
    function Zn(m) {
      const o = [
        Le(0),
        Yn,
        Yn
      ];
      return `hsl(${Yt(m.getComponents("hsl")).map((f2, x) => o[x](f2)).join(", ")})`;
    }
    function lr(m) {
      const o = [
        Le(0),
        Yn,
        Yn,
        Le(2)
      ];
      return `hsla(${m.getComponents("hsl").map((f2, x) => o[x](f2)).join(", ")})`;
    }
    function ms(m, o) {
      const p = Le(o === "float" ? 2 : 0), f2 = ["r", "g", "b"];
      return `{${Yt(m.getComponents("rgb", o)).map((P, L2) => `${f2[L2]}: ${p(P)}`).join(", ")}}`;
    }
    function fs(m) {
      return (o) => ms(o, m);
    }
    function cr(m, o) {
      const p = Le(2), f2 = Le(o === "float" ? 2 : 0), x = ["r", "g", "b", "a"];
      return `{${m.getComponents("rgb", o).map((L2, z) => {
        const oe = z === 3 ? p : f2;
        return `${x[z]}: ${oe(L2)}`;
      }).join(", ")}}`;
    }
    function pr(m) {
      return (o) => cr(o, m);
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
          stringifier: hs(o)
        },
        {
          format: {
            alpha: true,
            mode: "rgb",
            notation: "func",
            type: o
          },
          stringifier: ar(o)
        },
        {
          format: {
            alpha: false,
            mode: "rgb",
            notation: "object",
            type: o
          },
          stringifier: fs(o)
        },
        {
          format: {
            alpha: true,
            mode: "rgb",
            notation: "object",
            type: o
          },
          stringifier: pr(o)
        }
      ], [])
    ];
    class ur {
      constructor(o) {
        this.components = o.components, this.asm_ = o.assembly;
      }
      constrain(o) {
        const p = this.asm_.toComponents(o).map((f2, x) => {
          var P, L2;
          return (L2 = (P = this.components[x]) === null || P === void 0 ? void 0 : P.constrain(f2)) !== null && L2 !== void 0 ? L2 : f2;
        });
        return this.asm_.fromComponents(p);
      }
    }
    const vs = y2("pndtxt");
    class hr {
      constructor(o, p) {
        this.textViews = p.textViews, this.element = o.createElement("div"), this.element.classList.add(vs()), this.textViews.forEach((f2) => {
          const x = o.createElement("div");
          x.classList.add(vs("a")), x.appendChild(f2.element), this.element.appendChild(x);
        });
      }
    }
    function Ci(m, o, p) {
      return new fn(m, {
        arrayPosition: p === 0 ? "fst" : p === o.axes.length - 1 ? "lst" : "mid",
        baseStep: o.axes[p].baseStep,
        parser: o.parser,
        props: o.axes[p].textProps,
        value: H2(0, {
          constraint: o.axes[p].constraint
        }),
        viewProps: o.viewProps
      });
    }
    class Rt {
      constructor(o, p) {
        this.value = p.value, this.viewProps = p.viewProps, this.acs_ = p.axes.map((f2, x) => Ci(o, p, x)), this.acs_.forEach((f2, x) => {
          Ht({
            primary: this.value,
            secondary: f2.value,
            forward: (P) => p.assembly.toComponents(P.rawValue)[x],
            backward: (P, L2) => {
              const z = p.assembly.toComponents(P.rawValue);
              return z[x] = L2.rawValue, p.assembly.fromComponents(z);
            }
          });
        }), this.view = new hr(o, {
          textViews: this.acs_.map((f2) => f2.view)
        });
      }
    }
    function dr(m, o) {
      return "step" in m && !h2(m.step) ? new A2(m.step, o) : null;
    }
    function gn(m) {
      return !h2(m.max) && !h2(m.min) ? new ft({
        max: m.max,
        min: m.min
      }) : !h2(m.max) || !h2(m.min) ? new At({
        max: m.max,
        min: m.min
      }) : null;
    }
    const mr = {
      monitor: {
        defaultInterval: 200,
        defaultLineCount: 3
      }
    }, ot2 = y2("grl");
    class bs {
      constructor(o, p) {
        this.onCursorChange_ = this.onCursorChange_.bind(this), this.onValueUpdate_ = this.onValueUpdate_.bind(this), this.element = o.createElement("div"), this.element.classList.add(ot2()), p.viewProps.bindClassModifiers(this.element), this.formatter_ = p.formatter, this.props_ = p.props, this.cursor_ = p.cursor, this.cursor_.emitter.on("change", this.onCursorChange_);
        const f2 = o.createElementNS(we, "svg");
        f2.classList.add(ot2("g")), f2.style.height = `calc(var(--bld-us) * ${p.lineCount})`, this.element.appendChild(f2), this.svgElem_ = f2;
        const x = o.createElementNS(we, "polyline");
        this.svgElem_.appendChild(x), this.lineElem_ = x;
        const P = o.createElement("div");
        P.classList.add(ot2("t"), y2("tt")()), this.element.appendChild(P), this.tooltipElem_ = P, p.value.emitter.on("change", this.onValueUpdate_), this.value = p.value, this.update_();
      }
      get graphElement() {
        return this.svgElem_;
      }
      update_() {
        const o = this.svgElem_.getBoundingClientRect(), p = this.value.rawValue.length - 1, f2 = this.props_.get("minValue"), x = this.props_.get("maxValue"), P = [];
        this.value.rawValue.forEach((Ze2, te2) => {
          if (Ze2 === void 0)
            return;
          const Pt = Me(te2, 0, p, 0, o.width), Mr = Me(Ze2, f2, x, o.height, 0);
          P.push([Pt, Mr].join(","));
        }), this.lineElem_.setAttributeNS(null, "points", P.join(" "));
        const L2 = this.tooltipElem_, z = this.value.rawValue[this.cursor_.rawValue];
        if (z === void 0) {
          L2.classList.remove(ot2("t", "a"));
          return;
        }
        const oe = Me(this.cursor_.rawValue, 0, p, 0, o.width), Qe2 = Me(z, f2, x, o.height, 0);
        L2.style.left = `${oe}px`, L2.style.top = `${Qe2}px`, L2.textContent = `${this.formatter_(z)}`, L2.classList.contains(ot2("t", "a")) || (L2.classList.add(ot2("t", "a"), ot2("t", "in")), it2(L2), L2.classList.remove(ot2("t", "in")));
      }
      onValueUpdate_() {
        this.update_();
      }
      onCursorChange_() {
        this.update_();
      }
    }
    class fr {
      constructor(o, p) {
        if (this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this), this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this), this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this), this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this), this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this), this.props_ = p.props, this.value = p.value, this.viewProps = p.viewProps, this.cursor_ = H2(-1), this.view = new bs(o, {
          cursor: this.cursor_,
          formatter: p.formatter,
          lineCount: p.lineCount,
          props: this.props_,
          value: this.value,
          viewProps: this.viewProps
        }), !Xe2(o))
          this.view.element.addEventListener("mousemove", this.onGraphMouseMove_), this.view.element.addEventListener("mouseleave", this.onGraphMouseLeave_);
        else {
          const f2 = new qn(this.view.element);
          f2.emitter.on("down", this.onGraphPointerDown_), f2.emitter.on("move", this.onGraphPointerMove_), f2.emitter.on("up", this.onGraphPointerUp_);
        }
      }
      onGraphMouseLeave_() {
        this.cursor_.rawValue = -1;
      }
      onGraphMouseMove_(o) {
        const p = this.view.element.getBoundingClientRect();
        this.cursor_.rawValue = Math.floor(Me(o.offsetX, 0, p.width, 0, this.value.rawValue.length));
      }
      onGraphPointerDown_(o) {
        this.onGraphPointerMove_(o);
      }
      onGraphPointerMove_(o) {
        if (!o.data.point) {
          this.cursor_.rawValue = -1;
          return;
        }
        this.cursor_.rawValue = Math.floor(Me(o.data.point.x, 0, o.data.bounds.width, 0, this.value.rawValue.length));
      }
      onGraphPointerUp_() {
        this.cursor_.rawValue = -1;
      }
    }
    class gs {
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
        const f2 = p.bind(this);
        return this.controller_.emitter.on(o, () => {
          f2(new a(this));
        }), this;
      }
    }
    class vr extends a {
      constructor(o, p, f2) {
        super(o), this.cell = p, this.index = f2;
      }
    }
    class _s extends s {
      constructor(o) {
        super(o), this.cellToApiMap_ = /* @__PURE__ */ new Map(), this.emitter_ = new w();
        const p = this.controller_.valueController;
        p.cellControllers.forEach((f2, x) => {
          const P = new gs(f2);
          this.cellToApiMap_.set(f2, P), f2.emitter.on("click", () => {
            const L2 = x % p.size[0], z = Math.floor(x / p.size[0]);
            this.emitter_.emit("click", {
              event: new vr(this, P, [L2, z])
            });
          });
        });
      }
      cell(o, p) {
        const f2 = this.controller_.valueController, x = f2.cellControllers[p * f2.size[0] + o];
        return this.cellToApiMap_.get(x);
      }
      on(o, p) {
        const f2 = p.bind(this);
        return this.emitter_.on(o, (x) => {
          f2(x.event);
        }), this;
      }
    }
    class Pi {
      constructor(o, p) {
        this.size = p.size;
        const [f2, x] = this.size, P = [];
        for (let L2 = 0; L2 < x; L2++)
          for (let z = 0; z < f2; z++) {
            const oe = new G2(o, {
              props: K.fromObject(Object.assign({}, p.cellConfig(z, L2))),
              viewProps: be.create()
            });
            P.push(oe);
          }
        this.cellCs_ = P, this.viewProps = be.create(), this.viewProps.handleDispose(() => {
          this.cellCs_.forEach((L2) => {
            L2.viewProps.set("disposed", true);
          });
        }), this.view = new yt(o, {
          viewProps: this.viewProps,
          viewName: "btngrid"
        }), this.view.element.style.gridTemplateColumns = `repeat(${f2}, 1fr)`, this.cellCs_.forEach((L2) => {
          this.view.element.appendChild(L2.view.element);
        });
      }
      get cellControllers() {
        return this.cellCs_;
      }
    }
    const br = {
      id: "buttongrid",
      type: "blade",
      // TODO:
      css: '.tp-cbzgv,.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-radv_b:hover,.tp-rslv_k:hover,.tp-cbzv_b:hover{background-color:var(--btn-bg-h)}.tp-radv_b:focus,.tp-rslv_k:focus,.tp-cbzv_b:focus{background-color:var(--btn-bg-f)}.tp-radv_b:active,.tp-rslv_k:active,.tp-cbzv_b:active{background-color:var(--btn-bg-a)}.tp-radv_b:disabled,.tp-rslv_k:disabled,.tp-cbzv_b:disabled{opacity:.5}.tp-cbzgv{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-cbzgv:hover{background-color:var(--in-bg-h)}.tp-cbzgv:focus{background-color:var(--in-bg-f)}.tp-cbzgv:active{background-color:var(--in-bg-a)}.tp-cbzgv:disabled{opacity:.5}.tp-btngridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-btngridv.tp-v-disabled{opacity:.5}.tp-btngridv .tp-btnv_b:disabled{opacity:1}.tp-btngridv .tp-btnv_b:disabled .tp-btnv_t{opacity:.5}.tp-btngridv .tp-btnv_b{border-radius:0}.tp-cbzv{position:relative}.tp-cbzv_h{display:flex}.tp-cbzv_b{margin-right:4px;position:relative;width:var(--bld-us)}.tp-cbzv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-cbzv_b svg path{stroke:var(--bs-bg);stroke-width:2}.tp-cbzv_t{flex:1}.tp-cbzv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-cbzv.tp-cbzv-expanded .tp-cbzv_p{margin-top:var(--bld-s);opacity:1}.tp-cbzv.tp-cbzv-cpl .tp-cbzv_p{overflow:visible}.tp-cbzv .tp-popv{left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-cbzpv_t{margin-top:var(--bld-s)}.tp-cbzgv{height:auto;overflow:hidden;position:relative}.tp-cbzgv.tp-v-disabled{opacity:.5}.tp-cbzgv_p{left:16px;position:absolute;right:16px;top:0}.tp-cbzgv_g{cursor:pointer;display:block;height:calc(var(--bld-us)*5);width:100%}.tp-cbzgv_u{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_l{fill:rgba(0,0,0,0);stroke:var(--in-fg)}.tp-cbzgv_v{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_h{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;pointer-events:none;position:absolute;width:4px}.tp-cbzgv:focus .tp-cbzgv_h-sel{background-color:var(--in-fg);border-width:0}.tp-cbzprvv{cursor:pointer;height:4px;padding:4px 0;position:relative}.tp-cbzprvv_g{display:block;height:100%;overflow:visible;width:100%}.tp-cbzprvv_t{opacity:.5;stroke:var(--mo-fg)}.tp-cbzprvv_m{background-color:var(--mo-fg);border-radius:50%;height:4px;margin-left:-2px;margin-top:-2px;opacity:0;position:absolute;top:50%;transition:opacity .2s ease-out;width:4px}.tp-cbzprvv_m.tp-cbzprvv_m-a{opacity:1}.tp-fpsv{position:relative}.tp-fpsv_l{bottom:4px;color:var(--mo-fg);line-height:1;right:4px;pointer-events:none;position:absolute}.tp-fpsv_u{margin-left:.2em;opacity:.7}.tp-rslv{cursor:pointer;padding-left:8px;padding-right:8px}.tp-rslv.tp-v-disabled{opacity:.5}.tp-rslv_t{height:calc(var(--bld-us));position:relative}.tp-rslv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:-4px;right:-4px}.tp-rslv_b{bottom:0;top:0;position:absolute}.tp-rslv_b::before{background-color:var(--in-fg);content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:0;right:0}.tp-rslv_k{height:calc(var(--bld-us) - 8px);margin-top:calc((var(--bld-us) - 8px)/-2);position:absolute;top:50%;width:8px}.tp-rslv_k.tp-rslv_k-min{margin-left:-8px}.tp-rslv_k.tp-rslv_k-max{margin-left:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-min{border-bottom-right-radius:0;border-top-right-radius:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-max{border-bottom-left-radius:0;border-top-left-radius:0}.tp-rsltxtv{display:flex}.tp-rsltxtv_s{flex:1}.tp-rsltxtv_t{flex:1;margin-left:4px}.tp-radv_l{display:block;position:relative}.tp-radv_i{left:0;opacity:0;position:absolute;top:0}.tp-radv_b{opacity:.5}.tp-radv_i:hover+.tp-radv_b{background-color:var(--btn-bg-h)}.tp-radv_i:focus+.tp-radv_b{background-color:var(--btn-bg-f)}.tp-radv_i:active+.tp-radv_b{background-color:var(--btn-bg-a)}.tp-radv_i:checked+.tp-radv_b{opacity:1}.tp-radv_t{bottom:0;color:inherit;left:0;overflow:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0}.tp-radv_i:disabled+.tp-radv_b>.tp-radv_t{opacity:.5}.tp-radgridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-radgridv.tp-v-disabled{opacity:.5}.tp-radgridv .tp-radv_b{border-radius:0}',
      accept(m) {
        const o = he, p = ee2(m, {
          cells: o.required.function,
          size: o.required.array(o.required.number),
          view: o.required.constant("buttongrid"),
          label: o.optional.string
        });
        return p ? { params: p } : null;
      },
      controller(m) {
        return new st2(m.document, {
          blade: m.blade,
          props: K.fromObject({
            label: m.params.label
          }),
          valueController: new Pi(m.document, {
            cellConfig: m.params.cells,
            size: m.params.size
          })
        });
      },
      api(m) {
        return !(m.controller instanceof st2) || !(m.controller.valueController instanceof Pi) ? null : new _s(m.controller);
      }
    };
    class ws extends s {
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
        const f2 = p.bind(this);
        return this.controller_.valueController.value.emitter.on(o, (x) => {
          f2(new c(this, x.rawValue, void 0, x.options.last));
        }), this;
      }
    }
    function qe2(m, o, p) {
      return m * (1 - p) + o * p;
    }
    const gr = 20, _r = 1e-3, Ti = 100;
    function wr(m, o) {
      let p = 0.25, f2 = 0.5, x = -1;
      for (let P = 0; P < gr; P++) {
        const [L2, z] = m.curve(f2);
        if (f2 += p * (L2 < o ? 1 : -1), x = z, p *= 0.5, Math.abs(o - L2) < _r)
          break;
      }
      return x;
    }
    class Et {
      constructor(o = 0, p = 0, f2 = 1, x = 1) {
        this.cache_ = [], this.comps_ = [o, p, f2, x];
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
        return h2(o) || !Array.isArray(o) ? false : typeof o[0] == "number" && typeof o[1] == "number" && typeof o[2] == "number" && typeof o[3] == "number";
      }
      static equals(o, p) {
        return o.x1 === p.x1 && o.y1 === p.y1 && o.x2 === p.x2 && o.y2 === p.y2;
      }
      curve(o) {
        const p = qe2(0, this.x1, o), f2 = qe2(0, this.y1, o), x = qe2(this.x1, this.x2, o), P = qe2(this.y1, this.y2, o), L2 = qe2(this.x2, 1, o), z = qe2(this.y2, 1, o), oe = qe2(p, x, o), Qe2 = qe2(f2, P, o), Ze2 = qe2(x, L2, o), te2 = qe2(P, z, o);
        return [qe2(oe, Ze2, o), qe2(Qe2, te2, o)];
      }
      y(o) {
        if (this.cache_.length === 0) {
          const p = [];
          for (let f2 = 0; f2 < Ti; f2++)
            p.push(wr(this, Me(f2, 0, Ti - 1, 0, 1)));
          this.cache_ = p;
        }
        return this.cache_[Math.round(Me($t(o, 0, 1), 0, 1, 0, Ti - 1))];
      }
      toObject() {
        return [this.comps_[0], this.comps_[1], this.comps_[2], this.comps_[3]];
      }
    }
    const ki = {
      toComponents: (m) => m.toObject(),
      fromComponents: (m) => new Et(...m)
    };
    function yr(m) {
      const o = Le(2);
      return `cubic-bezier(${m.toObject().map((f2) => o(f2)).join(", ")})`;
    }
    const Mi = [0, 0.5, 0.5, 1];
    function xr(m) {
      const o = m.match(/^cubic-bezier\s*\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*\)$/);
      if (!o)
        return new Et(...Mi);
      const p = [o[1], o[2], o[3], o[4]].reduce((f2, x) => {
        if (!f2)
          return null;
        const P = Number(x);
        return isNaN(P) ? null : [...f2, P];
      }, []);
      return new Et(...p ?? Mi);
    }
    const It = y2("cbz");
    class ys {
      constructor(o, p) {
        this.element = o.createElement("div"), this.element.classList.add(It()), p.viewProps.bindClassModifiers(this.element), p.foldable.bindExpandedClass(this.element, It(void 0, "expanded")), R2(p.foldable, "completed", F(this.element, It(void 0, "cpl")));
        const f2 = o.createElement("div");
        f2.classList.add(It("h")), this.element.appendChild(f2);
        const x = o.createElement("button");
        x.classList.add(It("b")), p.viewProps.bindDisabled(x);
        const P = o.createElementNS(we, "svg");
        P.innerHTML = '<path d="M2 13C8 13 8 3 14 3"/>', x.appendChild(P), f2.appendChild(x), this.buttonElement = x;
        const L2 = o.createElement("div");
        if (L2.classList.add(It("t")), f2.appendChild(L2), this.textElement = L2, p.pickerLayout === "inline") {
          const z = o.createElement("div");
          z.classList.add(It("p")), this.element.appendChild(z), this.pickerElement = z;
        } else
          this.pickerElement = null;
      }
    }
    const Wn = y2("cbzp");
    class xs {
      constructor(o, p) {
        this.element = o.createElement("div"), this.element.classList.add(Wn()), p.viewProps.bindClassModifiers(this.element);
        const f2 = o.createElement("div");
        f2.classList.add(Wn("g")), this.element.appendChild(f2), this.graphElement = f2;
        const x = o.createElement("div");
        x.classList.add(Wn("t")), this.element.appendChild(x), this.textElement = x;
      }
    }
    function at2(m, o) {
      const p = new MutationObserver((x) => {
        for (const P of x)
          P.type === "childList" && P.addedNodes.forEach((L2) => {
            L2.contains(L2) && (o(), p.disconnect());
          });
      }), f2 = m.ownerDocument;
      p.observe(f2.body, {
        attributes: true,
        childList: true,
        subtree: true
      });
    }
    const vt = y2("cbzg");
    function Er(m, o) {
      return (p) => o(m(p));
    }
    class Re {
      constructor(o, p) {
        this.element = o.createElement("div"), this.element.classList.add(vt()), p.viewProps.bindClassModifiers(this.element), p.viewProps.bindTabIndex(this.element);
        const f2 = o.createElement("div");
        f2.classList.add(vt("p")), this.element.appendChild(f2), this.previewElement = f2;
        const x = o.createElementNS(we, "svg");
        x.classList.add(vt("g")), this.element.appendChild(x), this.svgElem_ = x;
        const P = o.createElementNS(we, "path");
        P.classList.add(vt("u")), this.svgElem_.appendChild(P), this.guideElem_ = P;
        const L2 = o.createElementNS(we, "polyline");
        L2.classList.add(vt("l")), this.svgElem_.appendChild(L2), this.lineElem_ = L2, this.handleElems_ = [o.createElement("div"), o.createElement("div")], this.handleElems_.forEach((z) => {
          z.classList.add(vt("h")), this.element.appendChild(z);
        }), this.vectorElems_ = [
          o.createElementNS(we, "line"),
          o.createElementNS(we, "line")
        ], this.vectorElems_.forEach((z) => {
          z.classList.add(vt("v")), this.svgElem_.appendChild(z);
        }), this.value_ = p.value, this.value_.emitter.on("change", this.onValueChange_.bind(this)), this.sel_ = p.selection, this.handleElems_.forEach((z, oe) => {
          S2(this.sel_, Er((Qe2) => Qe2 === oe, F(z, vt("h", "sel"))));
        }), at2(this.element, () => {
          this.refresh();
        });
      }
      getVertMargin_(o) {
        return o * 0.25;
      }
      valueToPosition(o, p) {
        const f2 = this.element.getBoundingClientRect(), x = f2.width, P = f2.height, L2 = this.getVertMargin_(P);
        return {
          x: Me(o, 0, 1, 0, x),
          y: Me(p, 0, 1, P - L2, L2)
        };
      }
      positionToValue(o, p) {
        const f2 = this.element.getBoundingClientRect(), x = f2.width, P = f2.height, L2 = this.getVertMargin_(P);
        return {
          x: $t(Me(o, 0, x, 0, 1), 0, 1),
          y: Me(p, P - L2, L2, 0, 1)
        };
      }
      refresh() {
        this.guideElem_.setAttributeNS(null, "d", [0, 1].map((P) => {
          const L2 = this.valueToPosition(0, P), z = this.valueToPosition(1, P);
          return [`M ${L2.x},${L2.y}`, `L ${z.x},${z.y}`].join(" ");
        }).join(" "));
        const o = this.value_.rawValue, p = [];
        let f2 = 0;
        for (; ; ) {
          const P = this.valueToPosition(...o.curve(f2));
          if (p.push([P.x, P.y].join(",")), f2 >= 1)
            break;
          f2 = Math.min(f2 + 0.05, 1);
        }
        this.lineElem_.setAttributeNS(null, "points", p.join(" "));
        const x = o.toObject();
        [0, 1].forEach((P) => {
          const L2 = this.valueToPosition(P, P), z = this.valueToPosition(x[P * 2], x[P * 2 + 1]), oe = this.vectorElems_[P];
          oe.setAttributeNS(null, "x1", String(L2.x)), oe.setAttributeNS(null, "y1", String(L2.y)), oe.setAttributeNS(null, "x2", String(z.x)), oe.setAttributeNS(null, "y2", String(z.y));
          const Qe2 = this.handleElems_[P];
          Qe2.style.left = `${z.x}px`, Qe2.style.top = `${z.y}px`;
        });
      }
      onValueChange_() {
        this.refresh();
      }
    }
    const Es = 24, _n = 400, Si = 1e3, Ct = y2("cbzprv");
    class qt {
      constructor(o, p) {
        this.stopped_ = true, this.startTime_ = -1, this.onDispose_ = this.onDispose_.bind(this), this.onTimer_ = this.onTimer_.bind(this), this.onValueChange_ = this.onValueChange_.bind(this), this.element = o.createElement("div"), this.element.classList.add(Ct()), p.viewProps.bindClassModifiers(this.element);
        const f2 = o.createElementNS(we, "svg");
        f2.classList.add(Ct("g")), this.element.appendChild(f2), this.svgElem_ = f2;
        const x = o.createElementNS(we, "path");
        x.classList.add(Ct("t")), this.svgElem_.appendChild(x), this.ticksElem_ = x;
        const P = o.createElement("div");
        P.classList.add(Ct("m")), this.element.appendChild(P), this.markerElem_ = P, this.value_ = p.value, this.value_.emitter.on("change", this.onValueChange_), p.viewProps.handleDispose(this.onDispose_), at2(this.element, () => {
          this.refresh();
        });
      }
      play() {
        this.stop(), this.updateMarker_(0), this.markerElem_.classList.add(Ct("m", "a")), this.startTime_ = new Date().getTime() + _n, this.stopped_ = false, requestAnimationFrame(this.onTimer_);
      }
      stop() {
        this.stopped_ = true, this.markerElem_.classList.remove(Ct("m", "a"));
      }
      onDispose_() {
        this.stop();
      }
      updateMarker_(o) {
        const p = this.value_.rawValue.y($t(o, 0, 1));
        this.markerElem_.style.left = `${p * 100}%`;
      }
      refresh() {
        const o = this.svgElem_.getBoundingClientRect(), p = o.width, f2 = o.height, x = [], P = this.value_.rawValue;
        for (let L2 = 0; L2 < Es; L2++) {
          const z = Me(L2, 0, Es - 1, 0, 1), oe = Me(P.y(z), 0, 1, 0, p);
          x.push(`M ${oe},0 v${f2}`);
        }
        this.ticksElem_.setAttributeNS(null, "d", x.join(" "));
      }
      onTimer_() {
        if (this.startTime_ === null)
          return;
        const o = new Date().getTime() - this.startTime_, p = o / Si;
        this.updateMarker_(p), o > Si + _n && this.stop(), this.stopped_ || requestAnimationFrame(this.onTimer_);
      }
      onValueChange_() {
        this.refresh(), this.play();
      }
    }
    function Oe(m, o, p, f2) {
      const x = p - m, P = f2 - o;
      return Math.sqrt(x * x + P * P);
    }
    function wn(m, o, p, f2) {
      const x = Oe(m, o, p, f2), P = Math.atan2(f2 - o, p - m), L2 = Math.round(P / (Math.PI / 4)) * Math.PI / 4;
      return {
        x: m + Math.cos(L2) * x,
        y: o + Math.sin(L2) * x
      };
    }
    class lt2 {
      constructor(o, p) {
        this.onKeyDown_ = this.onKeyDown_.bind(this), this.onKeyUp_ = this.onKeyUp_.bind(this), this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.baseStep_ = p.baseStep, this.value = p.value, this.sel_ = H2(0), this.viewProps = p.viewProps, this.view = new Re(o, {
          selection: this.sel_,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.element.addEventListener("keydown", this.onKeyDown_), this.view.element.addEventListener("keyup", this.onKeyUp_), this.prevView_ = new qt(o, {
          value: this.value,
          viewProps: this.viewProps
        }), this.prevView_.element.addEventListener("mousedown", (x) => {
          x.stopImmediatePropagation(), x.preventDefault(), this.prevView_.play();
        }), this.view.previewElement.appendChild(this.prevView_.element);
        const f2 = new qn(this.view.element);
        f2.emitter.on("down", this.onPointerDown_), f2.emitter.on("move", this.onPointerMove_), f2.emitter.on("up", this.onPointerUp_);
      }
      refresh() {
        this.view.refresh(), this.prevView_.refresh(), this.prevView_.play();
      }
      updateValue_(o, p, f2) {
        const x = this.sel_.rawValue, P = this.value.rawValue.toObject(), L2 = this.view.positionToValue(o.x, o.y), z = p ? wn(x, x, L2.x, L2.y) : L2;
        P[x * 2] = z.x, P[x * 2 + 1] = z.y, this.value.setRawValue(new Et(...P), f2);
      }
      onPointerDown_(o) {
        const p = o.data;
        if (!p.point)
          return;
        const f2 = this.value.rawValue, x = this.view.valueToPosition(f2.x1, f2.y1), P = Oe(p.point.x, p.point.y, x.x, x.y), L2 = this.view.valueToPosition(f2.x2, f2.y2), z = Oe(p.point.x, p.point.y, L2.x, L2.y);
        this.sel_.rawValue = P <= z ? 0 : 1, this.updateValue_(p.point, o.shiftKey, {
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
        ls(o.key) && o.preventDefault();
        const p = this.sel_.rawValue, f2 = this.value.rawValue.toObject();
        f2[p * 2] += Kt(this.baseStep_, yi(o)), f2[p * 2 + 1] += Kt(this.baseStep_, mn(o)), this.value.setRawValue(new Et(...f2), {
          forceEmit: false,
          last: false
        });
      }
      onKeyUp_(o) {
        ls(o.key) && o.preventDefault();
        const p = Kt(this.baseStep_, yi(o)), f2 = Kt(this.baseStep_, mn(o));
        p === 0 && f2 === 0 || this.value.setRawValue(this.value.rawValue, {
          forceEmit: true,
          last: true
        });
      }
    }
    class Cs {
      constructor(o, p) {
        this.value = p.value, this.viewProps = p.viewProps, this.view = new xs(o, {
          viewProps: this.viewProps
        }), this.gc_ = new lt2(o, {
          baseStep: p.axis.baseStep,
          value: this.value,
          viewProps: this.viewProps
        }), this.view.graphElement.appendChild(this.gc_.view.element);
        const f2 = Object.assign(Object.assign({}, p.axis), { constraint: new At({ max: 1, min: 0 }) }), x = Object.assign(Object.assign({}, p.axis), { constraint: void 0 });
        this.tc_ = new Rt(o, {
          assembly: ki,
          axes: [f2, x, f2, x],
          parser: dn,
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
    class Jn {
      constructor(o, p) {
        this.onButtonBlur_ = this.onButtonBlur_.bind(this), this.onButtonClick_ = this.onButtonClick_.bind(this), this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this), this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this), this.value = p.value, this.viewProps = p.viewProps, this.foldable_ = zn(p.expanded), this.view = new ys(o, {
          foldable: this.foldable_,
          pickerLayout: p.pickerLayout,
          viewProps: this.viewProps
        }), this.view.buttonElement.addEventListener("blur", this.onButtonBlur_), this.view.buttonElement.addEventListener("click", this.onButtonClick_), this.tc_ = new Ut(o, {
          parser: xr,
          props: K.fromObject({
            formatter: yr
          }),
          value: this.value,
          viewProps: this.viewProps
        }), this.view.textElement.appendChild(this.tc_.view.element), this.popC_ = p.pickerLayout === "popup" ? new ie(o, {
          viewProps: this.viewProps
        }) : null;
        const f2 = new Cs(o, {
          axis: p.axis,
          value: this.value,
          viewProps: this.viewProps
        });
        f2.allFocusableElements.forEach((x) => {
          x.addEventListener("blur", this.onPopupChildBlur_), x.addEventListener("keydown", this.onPopupChildKeydown_);
        }), this.pickerC_ = f2, this.popC_ ? (this.view.element.appendChild(this.popC_.view.element), this.popC_.view.element.appendChild(this.pickerC_.view.element), S2(this.popC_.shows, (x) => {
          x && f2.refresh();
        }), Ht({
          primary: this.foldable_.value("expanded"),
          secondary: this.popC_.shows,
          forward: (x) => x.rawValue,
          backward: (x, P) => P.rawValue
        })) : this.view.pickerElement && (this.view.pickerElement.appendChild(this.pickerC_.view.element), Gn(this.foldable_, this.view.pickerElement));
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
        const p = this.popC_.view.element, f2 = an(o);
        f2 && p.contains(f2) || f2 && f2 === this.view.buttonElement && !Xe2(p.ownerDocument) || (this.popC_.shows.rawValue = false);
      }
      onPopupChildKeydown_(o) {
        this.popC_ && o.key === "Escape" && (this.popC_.shows.rawValue = false);
      }
    }
    function Ai() {
      return new ur({
        assembly: ki,
        components: [0, 1, 2, 3].map((m) => m % 2 === 0 ? new At({
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
        const o = he, p = ee2(m, {
          value: o.required.array(o.required.number),
          view: o.required.constant("cubicbezier"),
          expanded: o.optional.boolean,
          label: o.optional.string,
          picker: o.optional.custom((f2) => f2 === "inline" || f2 === "popup" ? f2 : void 0)
        });
        return p ? { params: p } : null;
      },
      controller(m) {
        var o, p;
        const f2 = new Et(...m.params.value), x = H2(f2, {
          constraint: Ai(),
          equals: Et.equals
        }), P = new Jn(m.document, {
          axis: {
            baseStep: 0.1,
            textProps: K.fromObject({
              draggingScale: 0.01,
              formatter: Le(2)
            })
          },
          expanded: (o = m.params.expanded) !== null && o !== void 0 ? o : false,
          pickerLayout: (p = m.params.picker) !== null && p !== void 0 ? p : "popup",
          value: x,
          viewProps: m.viewProps
        });
        return new St(m.document, {
          blade: m.blade,
          props: K.fromObject({
            label: m.params.label
          }),
          valueController: P
        });
      },
      api(m) {
        return !(m.controller instanceof St) || !(m.controller.valueController instanceof Jn) ? null : new ws(m.controller);
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
    const Li = 20;
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
        const p = this.timestamps_[0];
        return 1e3 * (this.frameCount_ - p.frameCount) / (o - p.time);
      }
      compactTimestamps_() {
        if (this.timestamps_.length <= Li)
          return;
        const o = this.timestamps_.length - Li;
        this.timestamps_.splice(0, o);
        const p = this.timestamps_[0].frameCount;
        this.timestamps_.forEach((f2) => {
          f2.frameCount -= p;
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
    const Qt = y2("fps");
    class He {
      constructor(o, p) {
        this.element = o.createElement("div"), this.element.classList.add(Qt()), p.viewProps.bindClassModifiers(this.element), this.graphElement = o.createElement("div"), this.graphElement.classList.add(Qt("g")), this.element.appendChild(this.graphElement);
        const f2 = o.createElement("div");
        f2.classList.add(Qt("l")), this.element.appendChild(f2);
        const x = o.createElement("span");
        x.classList.add(Qt("v")), x.textContent = "--", f2.appendChild(x), this.valueElement = x;
        const P = o.createElement("span");
        P.classList.add(Qt("u")), P.textContent = "FPS", f2.appendChild(P);
      }
    }
    class Ri {
      constructor(o, p) {
        this.stopwatch_ = new Se(), this.onTick_ = this.onTick_.bind(this), this.ticker_ = p.ticker, this.ticker_.emitter.on("tick", this.onTick_), this.value_ = p.value, this.viewProps = p.viewProps, this.view = new He(o, {
          viewProps: this.viewProps
        }), this.graphC_ = new fr(o, {
          formatter: Le(0),
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
          this.value_.rawValue = ir(p, o), this.view.valueElement.textContent = o.toFixed(0);
        }
      }
    }
    function yn(m, o) {
      return o === 0 ? new Hn() : new cn(m, o ?? mr.monitor.defaultInterval);
    }
    const Ii = {
      id: "fpsgraph",
      type: "blade",
      accept(m) {
        const o = he, p = ee2(m, {
          view: o.required.constant("fpsgraph"),
          interval: o.optional.number,
          label: o.optional.string,
          lineCount: o.optional.number,
          max: o.optional.number,
          min: o.optional.number
        });
        return p ? { params: p } : null;
      },
      controller(m) {
        var o, p, f2, x;
        const P = (o = m.params.interval) !== null && o !== void 0 ? o : 500;
        return new st2(m.document, {
          blade: m.blade,
          props: K.fromObject({
            label: m.params.label
          }),
          valueController: new Ri(m.document, {
            lineCount: (p = m.params.lineCount) !== null && p !== void 0 ? p : 2,
            maxValue: (f2 = m.params.max) !== null && f2 !== void 0 ? f2 : 90,
            minValue: (x = m.params.min) !== null && x !== void 0 ? x : 0,
            ticker: yn(m.document, P),
            value: os(80),
            viewProps: m.viewProps
          })
        });
      },
      api(m) {
        return !(m.controller instanceof st2) || !(m.controller.valueController instanceof Ri) ? null : new _e(m.controller);
      }
    };
    class Ke2 {
      constructor(o, p) {
        this.min = o, this.max = p;
      }
      static isObject(o) {
        if (typeof o != "object" || o === null)
          return false;
        const p = o.min, f2 = o.max;
        return !(typeof p != "number" || typeof f2 != "number");
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
    const Vi = {
      fromComponents: (m) => new Ke2(m[0], m[1]),
      toComponents: (m) => [m.min, m.max]
    };
    class xn {
      constructor(o) {
        this.edge = o;
      }
      constrain(o) {
        var p, f2, x, P, L2, z, oe, Qe2;
        if (o.min <= o.max)
          return new Ke2((f2 = (p = this.edge) === null || p === void 0 ? void 0 : p.constrain(o.min)) !== null && f2 !== void 0 ? f2 : o.min, (P = (x = this.edge) === null || x === void 0 ? void 0 : x.constrain(o.max)) !== null && P !== void 0 ? P : o.max);
        const Ze2 = (o.min + o.max) / 2;
        return new Ke2((z = (L2 = this.edge) === null || L2 === void 0 ? void 0 : L2.constrain(Ze2)) !== null && z !== void 0 ? z : Ze2, (Qe2 = (oe = this.edge) === null || oe === void 0 ? void 0 : oe.constrain(Ze2)) !== null && Qe2 !== void 0 ? Qe2 : Ze2);
      }
    }
    const Di = y2("rsltxt");
    class ei {
      constructor(o, p) {
        this.sliderView_ = p.sliderView, this.textView_ = p.textView, this.element = o.createElement("div"), this.element.classList.add(Di());
        const f2 = o.createElement("div");
        f2.classList.add(Di("s")), f2.appendChild(this.sliderView_.element), this.element.appendChild(f2);
        const x = o.createElement("div");
        x.classList.add(Di("t")), x.appendChild(this.textView_.element), this.element.appendChild(x);
      }
    }
    const tt2 = y2("rsl");
    class En {
      constructor(o, p) {
        this.onSliderPropsChange_ = this.onSliderPropsChange_.bind(this), this.onValueChange_ = this.onValueChange_.bind(this), this.sliderProps_ = p.sliderProps, this.sliderProps_.emitter.on("change", this.onSliderPropsChange_), this.element = o.createElement("div"), this.element.classList.add(tt2()), p.viewProps.bindClassModifiers(this.element), this.value_ = p.value, this.value_.emitter.on("change", this.onValueChange_);
        const f2 = o.createElement("div");
        f2.classList.add(tt2("t")), this.element.appendChild(f2), this.trackElement = f2;
        const x = o.createElement("div");
        x.classList.add(tt2("b")), f2.appendChild(x), this.barElement = x;
        const P = ["min", "max"].map((L2) => {
          const z = o.createElement("div");
          return z.classList.add(tt2("k"), tt2("k", L2)), f2.appendChild(z), z;
        });
        this.knobElements = [P[0], P[1]], this.update_();
      }
      valueToX_(o) {
        const p = this.sliderProps_.get("minValue"), f2 = this.sliderProps_.get("maxValue");
        return $t(Me(o, p, f2, 0, 1), 0, 1) * 100;
      }
      update_() {
        const o = this.value_.rawValue;
        o.length === 0 ? this.element.classList.add(tt2(void 0, "zero")) : this.element.classList.remove(tt2(void 0, "zero"));
        const p = [this.valueToX_(o.min), this.valueToX_(o.max)];
        this.barElement.style.left = `${p[0]}%`, this.barElement.style.right = `${100 - p[1]}%`, this.knobElements.forEach((f2, x) => {
          f2.style.left = `${p[x]}%`;
        });
      }
      onSliderPropsChange_() {
        this.update_();
      }
      onValueChange_() {
        this.update_();
      }
    }
    class Oi {
      constructor(o, p) {
        this.grabbing_ = null, this.grabOffset_ = 0, this.onPointerDown_ = this.onPointerDown_.bind(this), this.onPointerMove_ = this.onPointerMove_.bind(this), this.onPointerUp_ = this.onPointerUp_.bind(this), this.sliderProps = p.sliderProps, this.viewProps = p.viewProps, this.value = p.value, this.view = new En(o, {
          sliderProps: this.sliderProps,
          value: this.value,
          viewProps: p.viewProps
        });
        const f2 = new qn(this.view.trackElement);
        f2.emitter.on("down", this.onPointerDown_), f2.emitter.on("move", this.onPointerMove_), f2.emitter.on("up", this.onPointerUp_);
      }
      ofs_() {
        return this.grabbing_ === "min" ? this.view.knobElements[0].getBoundingClientRect().width / 2 : this.grabbing_ === "max" ? -this.view.knobElements[1].getBoundingClientRect().width / 2 : 0;
      }
      valueFromData_(o) {
        if (!o.point)
          return null;
        const p = (o.point.x + this.ofs_()) / o.bounds.width, f2 = this.sliderProps.get("minValue"), x = this.sliderProps.get("maxValue");
        return Me(p, 0, 1, f2, x);
      }
      onPointerDown_(o) {
        if (!o.data.point)
          return;
        const p = o.data.point.x / o.data.bounds.width, f2 = this.value.rawValue, x = this.sliderProps.get("minValue"), P = this.sliderProps.get("maxValue"), L2 = Me(f2.min, x, P, 0, 1), z = Me(f2.max, x, P, 0, 1);
        Math.abs(z - p) <= 0.025 ? this.grabbing_ = "max" : Math.abs(L2 - p) <= 0.025 ? this.grabbing_ = "min" : p >= L2 && p <= z ? (this.grabbing_ = "length", this.grabOffset_ = Me(p - L2, 0, 1, 0, P - x)) : p < L2 ? (this.grabbing_ = "min", this.onPointerMove_(o)) : p > z && (this.grabbing_ = "max", this.onPointerMove_(o));
      }
      applyPointToValue_(o, p) {
        const f2 = this.valueFromData_(o);
        if (f2 === null)
          return;
        const x = this.sliderProps.get("minValue"), P = this.sliderProps.get("maxValue");
        if (this.grabbing_ === "min")
          this.value.setRawValue(new Ke2(f2, this.value.rawValue.max), p);
        else if (this.grabbing_ === "max")
          this.value.setRawValue(new Ke2(this.value.rawValue.min, f2), p);
        else if (this.grabbing_ === "length") {
          const L2 = this.value.rawValue.length;
          let z = f2 - this.grabOffset_, oe = z + L2;
          z < x ? (z = x, oe = x + L2) : oe > P && (z = P - L2, oe = P), this.value.setRawValue(new Ke2(z, oe), p);
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
    class bt {
      constructor(o, p) {
        this.value = p.value, this.viewProps = p.viewProps, this.sc_ = new Oi(o, p);
        const f2 = {
          baseStep: p.baseStep,
          constraint: p.constraint,
          textProps: K.fromObject({
            draggingScale: p.draggingScale,
            formatter: p.formatter
          })
        };
        this.tc_ = new Rt(o, {
          assembly: Vi,
          axes: [f2, f2],
          parser: p.parser,
          value: this.value,
          viewProps: p.viewProps
        }), this.view = new ei(o, {
          sliderView: this.sc_.view,
          textView: this.tc_.view
        });
      }
      get textController() {
        return this.tc_;
      }
    }
    function Ps(m) {
      return Ke2.isObject(m) ? new Ke2(m.min, m.max) : new Ke2(0, 0);
    }
    function Ni(m, o) {
      m.writeProperty("max", o.max), m.writeProperty("min", o.min);
    }
    function Cr(m) {
      const o = [], p = gn(m);
      p && o.push(p);
      const f2 = dr(m);
      return f2 && o.push(f2), new xn(new Kn(o));
    }
    const ti = {
      id: "input-interval",
      type: "input",
      css: '.tp-cbzgv,.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-radv_b:hover,.tp-rslv_k:hover,.tp-cbzv_b:hover{background-color:var(--btn-bg-h)}.tp-radv_b:focus,.tp-rslv_k:focus,.tp-cbzv_b:focus{background-color:var(--btn-bg-f)}.tp-radv_b:active,.tp-rslv_k:active,.tp-cbzv_b:active{background-color:var(--btn-bg-a)}.tp-radv_b:disabled,.tp-rslv_k:disabled,.tp-cbzv_b:disabled{opacity:.5}.tp-cbzgv{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-cbzgv:hover{background-color:var(--in-bg-h)}.tp-cbzgv:focus{background-color:var(--in-bg-f)}.tp-cbzgv:active{background-color:var(--in-bg-a)}.tp-cbzgv:disabled{opacity:.5}.tp-btngridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-btngridv.tp-v-disabled{opacity:.5}.tp-btngridv .tp-btnv_b:disabled{opacity:1}.tp-btngridv .tp-btnv_b:disabled .tp-btnv_t{opacity:.5}.tp-btngridv .tp-btnv_b{border-radius:0}.tp-cbzv{position:relative}.tp-cbzv_h{display:flex}.tp-cbzv_b{margin-right:4px;position:relative;width:var(--bld-us)}.tp-cbzv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-cbzv_b svg path{stroke:var(--bs-bg);stroke-width:2}.tp-cbzv_t{flex:1}.tp-cbzv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-cbzv.tp-cbzv-expanded .tp-cbzv_p{margin-top:var(--bld-s);opacity:1}.tp-cbzv.tp-cbzv-cpl .tp-cbzv_p{overflow:visible}.tp-cbzv .tp-popv{left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-cbzpv_t{margin-top:var(--bld-s)}.tp-cbzgv{height:auto;overflow:hidden;position:relative}.tp-cbzgv.tp-v-disabled{opacity:.5}.tp-cbzgv_p{left:16px;position:absolute;right:16px;top:0}.tp-cbzgv_g{cursor:pointer;display:block;height:calc(var(--bld-us)*5);width:100%}.tp-cbzgv_u{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_l{fill:rgba(0,0,0,0);stroke:var(--in-fg)}.tp-cbzgv_v{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_h{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;pointer-events:none;position:absolute;width:4px}.tp-cbzgv:focus .tp-cbzgv_h-sel{background-color:var(--in-fg);border-width:0}.tp-cbzprvv{cursor:pointer;height:4px;padding:4px 0;position:relative}.tp-cbzprvv_g{display:block;height:100%;overflow:visible;width:100%}.tp-cbzprvv_t{opacity:.5;stroke:var(--mo-fg)}.tp-cbzprvv_m{background-color:var(--mo-fg);border-radius:50%;height:4px;margin-left:-2px;margin-top:-2px;opacity:0;position:absolute;top:50%;transition:opacity .2s ease-out;width:4px}.tp-cbzprvv_m.tp-cbzprvv_m-a{opacity:1}.tp-fpsv{position:relative}.tp-fpsv_l{bottom:4px;color:var(--mo-fg);line-height:1;right:4px;pointer-events:none;position:absolute}.tp-fpsv_u{margin-left:.2em;opacity:.7}.tp-rslv{cursor:pointer;padding-left:8px;padding-right:8px}.tp-rslv.tp-v-disabled{opacity:.5}.tp-rslv_t{height:calc(var(--bld-us));position:relative}.tp-rslv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:-4px;right:-4px}.tp-rslv_b{bottom:0;top:0;position:absolute}.tp-rslv_b::before{background-color:var(--in-fg);content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:0;right:0}.tp-rslv_k{height:calc(var(--bld-us) - 8px);margin-top:calc((var(--bld-us) - 8px)/-2);position:absolute;top:50%;width:8px}.tp-rslv_k.tp-rslv_k-min{margin-left:-8px}.tp-rslv_k.tp-rslv_k-max{margin-left:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-min{border-bottom-right-radius:0;border-top-right-radius:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-max{border-bottom-left-radius:0;border-top-left-radius:0}.tp-rsltxtv{display:flex}.tp-rsltxtv_s{flex:1}.tp-rsltxtv_t{flex:1;margin-left:4px}.tp-radv_l{display:block;position:relative}.tp-radv_i{left:0;opacity:0;position:absolute;top:0}.tp-radv_b{opacity:.5}.tp-radv_i:hover+.tp-radv_b{background-color:var(--btn-bg-h)}.tp-radv_i:focus+.tp-radv_b{background-color:var(--btn-bg-f)}.tp-radv_i:active+.tp-radv_b{background-color:var(--btn-bg-a)}.tp-radv_i:checked+.tp-radv_b{opacity:1}.tp-radv_t{bottom:0;color:inherit;left:0;overflow:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0}.tp-radv_i:disabled+.tp-radv_b>.tp-radv_t{opacity:.5}.tp-radgridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-radgridv.tp-v-disabled{opacity:.5}.tp-radgridv .tp-radv_b{border-radius:0}',
      accept: (m, o) => {
        if (!Ke2.isObject(m))
          return null;
        const p = he, f2 = ee2(o, {
          format: p.optional.function,
          max: p.optional.number,
          min: p.optional.number,
          step: p.optional.number
        });
        return f2 ? {
          initialValue: new Ke2(m.min, m.max),
          params: f2
        } : null;
      },
      binding: {
        reader: (m) => Ps,
        constraint: (m) => Cr(m.params),
        equals: Ke2.equals,
        writer: (m) => Ni
      },
      controller(m) {
        var o;
        const p = m.value, f2 = m.constraint;
        if (!(f2 instanceof xn))
          throw g.shouldNeverHappen();
        const x = (p.rawValue.min + p.rawValue.max) / 2, P = (o = m.params.format) !== null && o !== void 0 ? o : Le(vn(f2.edge, x)), L2 = f2.edge && xt(f2.edge, ft);
        if (L2)
          return new bt(m.document, {
            baseStep: Ei(f2.edge),
            constraint: f2.edge,
            draggingScale: Qn(f2.edge, x),
            formatter: P,
            parser: dn,
            sliderProps: new K({
              maxValue: L2.values.value("max"),
              minValue: L2.values.value("min")
            }),
            value: p,
            viewProps: m.viewProps
          });
        const z = {
          baseStep: Ei(f2.edge),
          constraint: f2.edge,
          textProps: K.fromObject({
            draggingScale: x,
            formatter: P
          })
        };
        return new Rt(m.document, {
          assembly: Vi,
          axes: [z, z],
          parser: dn,
          value: p,
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
      constructor(o, p, f2, x, P) {
        super(o, x, P), this.cell = p, this.index = f2;
      }
    }
    class Cn extends s {
      constructor(o) {
        super(o), this.cellToApiMap_ = /* @__PURE__ */ new Map(), this.controller_.valueController.cellControllers.forEach((f2) => {
          const x = new Dt(f2);
          this.cellToApiMap_.set(f2, x);
        });
      }
      get value() {
        return this.controller_.value;
      }
      cell(o, p) {
        const f2 = this.controller_.valueController, x = f2.cellControllers[p * f2.size[0] + o];
        return this.cellToApiMap_.get(x);
      }
      on(o, p) {
        const f2 = p.bind(this);
        this.controller_.value.emitter.on(o, (x) => {
          const P = this.controller_.valueController, L2 = P.findCellByValue(x.rawValue);
          if (!L2)
            return;
          const z = this.cellToApiMap_.get(L2);
          if (!z)
            return;
          const oe = P.cellControllers.indexOf(L2);
          f2(new Ot(this, z, [oe % P.size[0], Math.floor(oe / P.size[0])], x.rawValue, void 0));
        });
      }
    }
    const Pn = y2("rad");
    class Ts {
      constructor(o, p) {
        this.element = o.createElement("div"), this.element.classList.add(Pn()), p.viewProps.bindClassModifiers(this.element);
        const f2 = o.createElement("label");
        f2.classList.add(Pn("l")), this.element.appendChild(f2);
        const x = o.createElement("input");
        x.classList.add(Pn("i")), x.name = p.name, x.type = "radio", p.viewProps.bindDisabled(x), f2.appendChild(x), this.inputElement = x;
        const P = o.createElement("div");
        P.classList.add(Pn("b")), f2.appendChild(P);
        const L2 = o.createElement("div");
        L2.classList.add(Pn("t")), P.appendChild(L2), R2(p.props, "title", (z) => {
          L2.textContent = z;
        });
      }
    }
    class ks {
      constructor(o, p) {
        this.props = p.props, this.viewProps = p.viewProps, this.view = new Ts(o, {
          name: p.name,
          props: this.props,
          viewProps: this.viewProps
        });
      }
    }
    class ni {
      constructor(o, p) {
        this.cellCs_ = [], this.cellValues_ = [], this.onCellInputChange_ = this.onCellInputChange_.bind(this), this.size = p.size;
        const [f2, x] = this.size;
        for (let P = 0; P < x; P++)
          for (let L2 = 0; L2 < f2; L2++) {
            const z = new ks(o, {
              name: p.groupName,
              props: K.fromObject(Object.assign({}, p.cellConfig(L2, P))),
              viewProps: be.create()
            });
            this.cellCs_.push(z), this.cellValues_.push(p.cellConfig(L2, P).value);
          }
        this.value = p.value, S2(this.value, (P) => {
          const L2 = this.findCellByValue(P);
          L2 && (L2.view.inputElement.checked = true);
        }), this.viewProps = be.create(), this.view = new yt(o, {
          viewProps: this.viewProps,
          viewName: "radgrid"
        }), this.view.element.style.gridTemplateColumns = `repeat(${f2}, 1fr)`, this.cellCs_.forEach((P) => {
          P.view.inputElement.addEventListener("change", this.onCellInputChange_), this.view.element.appendChild(P.view.element);
        });
      }
      get cellControllers() {
        return this.cellCs_;
      }
      findCellByValue(o) {
        const p = this.cellValues_.findIndex((f2) => f2 === o);
        return p < 0 ? null : this.cellCs_[p];
      }
      onCellInputChange_(o) {
        const p = o.currentTarget, f2 = this.cellCs_.findIndex((x) => x.view.inputElement === p);
        f2 < 0 || (this.value.rawValue = this.cellValues_[f2]);
      }
    }
    const Nt = function() {
      return {
        id: "radiogrid",
        type: "blade",
        accept(m) {
          const o = he, p = ee2(m, {
            cells: o.required.function,
            groupName: o.required.string,
            size: o.required.array(o.required.number),
            value: o.required.raw,
            view: o.required.constant("radiogrid"),
            label: o.optional.string
          });
          return p ? { params: p } : null;
        },
        controller(m) {
          return new St(m.document, {
            blade: m.blade,
            props: K.fromObject({
              label: m.params.label
            }),
            valueController: new ni(m.document, {
              groupName: m.params.groupName,
              cellConfig: m.params.cells,
              size: m.params.size,
              value: H2(m.params.value)
            })
          });
        },
        api(m) {
          return !(m.controller instanceof St) || !(m.controller.valueController instanceof ni) ? null : new Cn(m.controller);
        }
      };
    }();
    function Fi(m) {
      return {
        id: "input-radiogrid",
        type: "input",
        accept(o, p) {
          if (!m.isType(o))
            return null;
          const f2 = he, x = ee2(p, {
            cells: f2.required.function,
            groupName: f2.required.string,
            size: f2.required.array(f2.required.number),
            view: f2.required.constant("radiogrid")
          });
          return x ? {
            initialValue: o,
            params: x
          } : null;
        },
        binding: m.binding,
        controller: (o) => new ni(o.document, {
          cellConfig: o.params.cells,
          groupName: o.params.groupName,
          size: o.params.size,
          value: o.value
        })
      };
    }
    const Pr = Fi({
      isType: (m) => typeof m == "number",
      binding: {
        reader: (m) => tr,
        writer: (m) => et2
      }
    }), Tr = Fi({
      isType: (m) => typeof m == "string",
      binding: {
        reader: (m) => rs,
        writer: (m) => et2
      }
    }), kr = Fi({
      isType: (m) => typeof m == "boolean",
      binding: {
        reader: (m) => pn,
        writer: (m) => et2
      }
    }), Ms = [
      br,
      Vt,
      Ii,
      ti,
      Nt,
      kr,
      Pr,
      Tr
    ];
    r.ButtonCellApi = gs, r.ButtonGridApi = _s, r.ButtonGridController = Pi, r.CubicBezier = Et, r.CubicBezierApi = ws, r.CubicBezierAssembly = ki, r.CubicBezierController = Jn, r.CubicBezierGraphController = lt2, r.CubicBezierGraphView = Re, r.CubicBezierPickerController = Cs, r.CubicBezierPickerView = xs, r.CubicBezierPreviewView = qt, r.CubicBezierView = ys, r.FpsGraphBladeApi = _e, r.FpsGraphController = Ri, r.FpsView = He, r.Fpswatch = Se, r.Interval = Ke2, r.IntervalAssembly = Vi, r.IntervalConstraint = xn, r.RadioCellApi = Dt, r.RadioController = ks, r.RadioGridApi = Cn, r.RadioGridController = ni, r.RadioView = Ts, r.RangeSliderController = Oi, r.RangeSliderTextController = bt, r.RangeSliderTextView = ei, r.RangeSliderView = En, r.TpRadioGridChangeEvent = Ot, r.plugins = Ms, Object.defineProperty(r, "__esModule", { value: true });
  });
})(Ph, Ji);
var Th = ih(Ji);
var kh = Np({
  __proto__: null,
  default: Th
}, [Ji]);
var Ln;
var Ds;
var md = (b2 = "tres-container") => {
  Ln || (Ln = new js.Pane({
    container: document.querySelector(b2) || void 0
  }), Ln.registerPlugin(kh), Ds = Ln.addBlade({
    view: "fpsgraph",
    label: "fpsgraph"
  }));
  function i() {
    Ln && Ln.dispose();
  }
  return onMounted(() => {
    const { onBeforeLoop: r, onAfterLoop: s, resume: a } = $();
    a(), r(() => Ds.begin()), s(() => Ds.end());
  }), onUnmounted(() => {
    i();
  }), { pane: Ln, fpsGraph: Ds, disposeTweakPane: i };
};
function fd(b2, i) {
  const r = ref(i), s = new AnimationMixer(r.value), a = shallowReactive({});
  b2.forEach((u) => {
    const h2 = s.clipAction(u, r.value);
    a[u.name] = h2;
  });
  const { onLoop: c } = $();
  return c(({ delta: u }) => {
    s.update(u);
  }), {
    actions: a,
    mixer: s
  };
}
var Os = null;
function Mh(b2, i) {
  return (r) => {
    i && i(r), b2.draco && (Os || (Os = new rh()), Os.setDecoderPath(b2.decoderPath || "https://www.gstatic.com/draco/versioned/decoders/1.4.3/"), r.setDRACOLoader(Os));
  };
}
async function Sh(b2, i = {
  draco: false
}, r) {
  return await dt(su, b2, Mh(i, r));
}
var vd = defineComponent({
  name: "GLTFModel",
  props: ["path", "draco", "decoderPath"],
  async setup(b2, { expose: i }) {
    const { state: r } = Fn(), s = ref();
    i({ model: s });
    const { scene: a } = await Sh(b2.path, { draco: b2.draco, decoderPath: b2.decoderPath });
    return s.value = a, r.scene && r.scene.add(a), () => {
    };
  }
});
async function Ah(b2) {
  return await dt(Uu, b2);
}
var bd = defineComponent({
  name: "FBXModel",
  props: ["path"],
  async setup(b2, { expose: i }) {
    const { state: r } = Fn();
    let s = null;
    function a() {
      return s;
    }
    return i({ getModel: a }), s = await Ah(b2.path), r.scene && s.isObject3D && r.scene.add(s), () => {
    };
  }
});
var Lh = { key: 0 };
var Rh = ["args", "center"];
var gd = defineComponent({
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
  async setup(b2) {
    let i, r;
    const s = b2, { extend: a } = Fn();
    a({ TextGeometry: Vu });
    const c = new eh(), u = useSlots(), h2 = computed(() => {
      var w;
      return s.text ? s.text : u.default ? (w = u.default()[0].children) == null ? void 0 : w.trim() : "TresJS";
    }), d = ([i, r] = withAsyncContext(() => new Promise((w, _) => {
      try {
        typeof s.font == "string" ? c.load(s.font, (y2) => {
          w(y2);
        }) : w(s.font);
      } catch (y2) {
        _(console.error("cientos", y2));
      }
    })), i = await i, r(), i), g = computed(() => ({
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
    return (w, _) => unref(d) ? (openBlock(), createElementBlock("TresMesh", Lh, [
      unref(h2) ? (openBlock(), createElementBlock("TresTextGeometry", {
        key: 0,
        args: [unref(h2), unref(g)],
        center: b2.center
      }, null, 8, Rh)) : createCommentVNode("", true),
      renderSlot(w.$slots, "default")
    ])) : createCommentVNode("", true);
  }
});
var Ih = ["rotation"];
var Vh = ["args"];
var Dh = ["color"];
var _d = defineComponent({
  __name: "Plane",
  props: {
    args: { default: () => [1, 1] },
    color: { default: "0xffffff" }
  },
  setup(b2, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "planeRef",
      ref: r,
      rotation: [-Math.PI / 2, 0, 0]
    }, s.$attrs), [
      createBaseVNode("TresPlaneGeometry", { args: b2.args }, null, 8, Vh),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: b2.color }, null, 8, Dh)
      ])
    ], 16, Ih));
  }
});
var Oh = ["args"];
var Nh = ["color"];
var wd = defineComponent({
  __name: "Box",
  props: {
    args: { default: () => [1, 1, 1] },
    color: { default: "0xffffff" }
  },
  setup(b2, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "boxRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresBoxGeometry", { args: b2.args }, null, 8, Oh),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: b2.color }, null, 8, Nh)
      ])
    ], 16));
  }
});
var Fh = ["args"];
var Bh = ["color"];
var yd = defineComponent({
  __name: "Sphere",
  props: {
    args: { default: () => [2, 32, 16] },
    color: { default: "0xffffff" }
  },
  setup(b2, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "sphereRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresSphereGeometry", { args: b2.args }, null, 8, Fh),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: b2.color }, null, 8, Bh)
      ])
    ], 16));
  }
});
var jh = ["args"];
var zh = ["color"];
var xd = defineComponent({
  __name: "Torus",
  props: {
    args: { default: () => [1, 1, 16, 80] },
    color: { default: "0xffffff" }
  },
  setup(b2, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "torusRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresTorusGeometry", { args: b2.args }, null, 8, jh),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: b2.color }, null, 8, zh)
      ])
    ], 16));
  }
});
var Uh = ["args"];
var Gh = ["color"];
var Ed = defineComponent({
  __name: "TorusKnot",
  props: {
    args: { default: () => [1, 0.4, 64, 8] },
    color: { default: "0xffffff" }
  },
  setup(b2, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "torusKnotRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresTorusKnotGeometry", { args: b2.args }, null, 8, Uh),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: b2.color }, null, 8, Gh)
      ])
    ], 16));
  }
});
var Hh = ["args"];
var Kh = ["color"];
var Cd = defineComponent({
  __name: "Circle",
  props: {
    args: { default: () => [1, 32, 0, Math.PI * 2] },
    color: { default: "0xffffff" }
  },
  setup(b2, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "circleRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresCircleGeometry", { args: b2.args }, null, 8, Hh),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: b2.color }, null, 8, Kh)
      ])
    ], 16));
  }
});
var $h = ["args"];
var Xh = ["color"];
var Pd = defineComponent({
  __name: "Cone",
  props: {
    args: { default: () => [1, 1, 12, false, 0, Math.PI * 2] },
    color: { default: "0xffffff" }
  },
  setup(b2, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "coneRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresConeGeometry", { args: b2.args }, null, 8, $h),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: b2.color }, null, 8, Xh)
      ])
    ], 16));
  }
});
var Yh = ["args"];
var qh = ["color"];
var Td = defineComponent({
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
  setup(b2, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "tubeRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresTubeGeometry", { args: b2.args }, null, 8, Yh),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: b2.color }, null, 8, qh)
      ])
    ], 16));
  }
});
var Qh = ["args"];
var Zh = ["color"];
var kd = defineComponent({
  __name: "Ring",
  props: {
    args: { default: () => [0.5, 1, 32] },
    color: { default: "0xffffff" }
  },
  setup(b2, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "ringRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresRingGeometry", { args: b2.args }, null, 8, Qh),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: b2.color }, null, 8, Zh)
      ])
    ], 16));
  }
});
var Wh = ["rotation"];
var Jh = ["args"];
var ed = ["color"];
var Md = defineComponent({
  __name: "Tetrahedron",
  props: {
    args: { default: () => [1, 0] },
    color: { default: "0xffffff" }
  },
  setup(b2, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "tetrahedronRef",
      ref: r,
      rotation: [-Math.PI / 2, 0, 0]
    }, s.$attrs), [
      createBaseVNode("TresTetrahedronGeometry", { args: b2.args }, null, 8, Jh),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: b2.color }, null, 8, ed)
      ])
    ], 16, Wh));
  }
});
var td = ["args"];
var nd = ["color"];
var Sd = defineComponent({
  __name: "Icosahedron",
  props: {
    args: { default: () => [1, 0] },
    color: { default: "0xffffff" }
  },
  setup(b2, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "icosahedronRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresIcosahedronGeometry", { args: b2.args }, null, 8, td),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: b2.color }, null, 8, nd)
      ])
    ], 16));
  }
});
var id = ["args"];
var sd = ["color"];
var Ad = defineComponent({
  __name: "Octahedron",
  props: {
    args: { default: () => [1, 0] },
    color: { default: "0xffffff" }
  },
  setup(b2, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "octahedronRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresOctahedronGeometry", { args: b2.args }, null, 8, id),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: b2.color }, null, 8, sd)
      ])
    ], 16));
  }
});
var rd = ["args"];
var od = ["color"];
var Ld = defineComponent({
  __name: "Dodecahedron",
  props: {
    args: { default: () => [1, 0] },
    color: { default: "0xffffff" }
  },
  setup(b2, { expose: i }) {
    const r = shallowRef();
    return i({
      value: r
    }), (s, a) => (openBlock(), createElementBlock("TresMesh", mergeProps({
      ref_key: "dodecahedronRef",
      ref: r
    }, s.$attrs), [
      createBaseVNode("TresDodecahedronGeometry", { args: b2.args }, null, 8, rd),
      renderSlot(s.$slots, "default", {}, () => [
        createBaseVNode("TresMeshBasicMaterial", { color: b2.color }, null, 8, od)
      ])
    ], 16));
  }
});
var eo = {
  sunset: "venice/venice_sunset_4k.hdr"
};
async function ad({
  files: b2 = ["/px.png", "/nx.png", "/py.png", "/ny.png", "/pz.png", "/nz.png"],
  blur: i = 0,
  background: r = false,
  path: s = "/",
  preset: a = void 0,
  encoding: c = void 0
}) {
  const { state: u } = Fn();
  if (a) {
    if (!(a in eo))
      throw new Error("Preset must be one of: " + Object.keys(eo).join(", "));
    b2 = eo[a], s = "https://raw.githubusercontent.com/Tresjs/assets/main/textures/hdr/";
  }
  const h2 = Array.isArray(b2), g = await dt(
    h2 ? CubeTextureLoader : sh,
    h2 ? [b2] : b2,
    (_) => {
      s && _.setPath(s), c && (_.encoding = c);
    }
  ), w = h2 ? g[0] : g;
  return w && (w.mapping = h2 ? CubeReflectionMapping : EquirectangularReflectionMapping, w.encoding = c ?? h2 ? sRGBEncoding : LinearEncoding), u.scene && (u.scene.environment = w, r !== void 0 && (u.scene.background = w), i && (u.scene.backgroundBlurriness = i | 0)), w;
}
var Rd = defineComponent({
  name: "Environment",
  props: ["background", "blur", "files", "encoding", "path", "preset"],
  async setup(b2, { expose: i }) {
    let r = null;
    return i({ getTexture: () => r }), r = await ad(b2), () => {
    };
  }
});
export {
  wd as Box,
  Cd as Circle,
  Pd as Cone,
  Ld as Dodecahedron,
  Rd as Environment,
  bd as FBXModel,
  vd as GLTFModel,
  Sd as Icosahedron,
  Ad as Octahedron,
  ud as OrbitControls,
  dd as PamCameraMouse,
  _d as Plane,
  kd as Ring,
  yd as Sphere,
  Md as Tetrahedron,
  gd as Text3D,
  xd as Torus,
  Ed as TorusKnot,
  hd as TransformControls,
  Td as Tube,
  fd as useAnimations,
  ad as useEnvironment,
  Ah as useFBX,
  Sh as useGLTF,
  Eh as usePamCameraMouse,
  md as useTweakPane
};
/*! Bundled license information:

@tresjs/cientos/dist/trescientos.js:
  (*! Tweakpane 3.1.7 (c) 2016 cocopon, licensed under the MIT license. *)
*/
//# sourceMappingURL=@tresjs_cientos.js.map
