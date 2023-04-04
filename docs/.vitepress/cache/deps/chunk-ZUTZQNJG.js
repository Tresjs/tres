import {
  ACESFilmicToneMapping,
  Clock,
  Color,
  LinearEncoding,
  LoadingManager,
  MathUtils,
  Mesh,
  NoToneMapping,
  OrthographicCamera,
  PCFShadowMap,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Raycaster,
  Scene,
  TextureLoader,
  Vector2,
  WebGLRenderer,
  sRGBEncoding,
  three_module_exports
} from "./chunk-UMTEG5DH.js";
import {
  computed,
  createRenderer,
  defineComponent,
  getCurrentInstance,
  getCurrentScope,
  h,
  nextTick,
  onMounted,
  onScopeDispose,
  readonly,
  ref,
  shallowReactive,
  shallowRef,
  toRef,
  toRefs,
  unref,
  watch,
  watchEffect
} from "./chunk-LZPJ5JBW.js";

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
  var _a2;
  const plain = resolveUnref(elRef);
  return (_a2 = plain == null ? void 0 : plain.$el) != null ? _a2 : plain;
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
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(() => [unrefElement(target), resolveUnref(options)], ([el, options2]) => {
    cleanup();
    if (!el)
      return;
    cleanups.push(...events.flatMap((event) => {
      return listeners.map((listener) => register(el, event, listener, options2));
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
  const _a2 = options, { window: window2 = defaultWindow } = _a2, observerOptions = __objRest$2(_a2, ["window"]);
  let observer;
  const isSupported = useSupported(() => window2 && "ResizeObserver" in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const stopWatch = watch(() => unrefElement(target), (el) => {
    cleanup();
    if (isSupported.value && window2 && el) {
      observer = new ResizeObserver(callback);
      observer.observe(el, observerOptions);
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
    var _a2, _b;
    return (_b = (_a2 = unrefElement(target)) == null ? void 0 : _a2.namespaceURI) == null ? void 0 : _b.includes("svg");
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

// node_modules/.pnpm/@tresjs+core@2.0.0-alpha.1_three@0.151.3+vue@3.2.47/node_modules/@tresjs/core/dist/tres.js
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
async function vt(e) {
  const t = new LoadingManager(), r = new TextureLoader(t), o = (n) => new Promise((i, c) => {
    r.load(
      n,
      (a) => i(a),
      () => null,
      () => {
        c(new Error("[useTextures] - Failed to load texture"));
      }
    );
  });
  if (pe(e)) {
    const n = await Promise.all(e.map((i) => o(i)));
    return e.length > 1 ? n : n[0];
  } else {
    const { map: n, displacementMap: i, normalMap: c, roughnessMap: a, metalnessMap: s, aoMap: l } = e;
    return {
      map: n ? await o(n) : null,
      displacementMap: i ? await o(i) : null,
      normalMap: c ? await o(c) : null,
      roughnessMap: a ? await o(a) : null,
      metalnessMap: s ? await o(s) : null,
      aoMap: l ? await o(l) : null
    };
  }
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
var gt = true;
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
var wt = {
  install(e) {
    e.component("TresCanvas", lt);
  }
};

export {
  G,
  se,
  Ne,
  ce,
  $,
  tt,
  nt,
  dt,
  vt,
  L,
  me,
  gt,
  j,
  lt,
  wt
};
//# sourceMappingURL=chunk-ZUTZQNJG.js.map
