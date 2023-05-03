import {
  ACESFilmicToneMapping,
  BufferAttribute,
  Clock,
  Color,
  LinearEncoding,
  LoadingManager,
  MathUtils,
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
} from "./chunk-PDZK3SQX.js";
import {
  computed,
  createRenderer,
  defineComponent,
  getCurrentInstance,
  getCurrentScope,
  h,
  inject,
  nextTick,
  onMounted,
  onScopeDispose,
  onUnmounted,
  provide,
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
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
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

// node_modules/.pnpm/@tresjs+core@2.0.0-beta.11_three@0.152.2_vue@3.2.47/node_modules/@tresjs/core/dist/tres.js
var be = ref({ uuid: MathUtils.generateUUID() });
var ye = (e) => void Object.assign(be.value, e);
var Ze = ((e) => (e.Perspective = "Perspective", e.Orthographic = "Orthographic", e))(Ze || {});
var et = 45;
var _;
function Me() {
  const { state: e, setState: t, aspectRatio: o } = S();
  function a(i = "Perspective", s) {
    var l, u, p;
    if (i === "Perspective") {
      const { near: d, far: w, fov: M } = s || {
        near: 0.1,
        far: 1e3,
        fov: et
      };
      _ = new PerspectiveCamera(M, ((l = e.aspectRatio) == null ? void 0 : l.value) || window.innerWidth / window.innerHeight, d, w), (u = e.cameras) == null || u.push(_);
    } else {
      const { left: d, right: w, top: M, bottom: x, near: L, far: b } = s || {
        left: -100,
        right: 100,
        top: 100,
        bottom: -100,
        near: 0.1,
        far: 1e3
      };
      _ = new OrthographicCamera(d, w, M, x, L, b), (p = e.cameras) == null || p.push(_);
    }
    return e.camera = _, t("camera", e.camera), _;
  }
  function n() {
    var i;
    e.camera instanceof PerspectiveCamera && e.aspectRatio && (e.camera.aspect = e.aspectRatio.value), (i = e.camera) == null || i.updateProjectionMatrix();
  }
  function r(i) {
    var s;
    (s = e.cameras) == null || s.push(i), i instanceof PerspectiveCamera && e.aspectRatio && (i.aspect = e.aspectRatio.value), i.updateProjectionMatrix(), t("camera", i);
  }
  function c() {
    e.cameras = [];
  }
  return watchEffect(() => {
    o != null && o.value && n();
  }), {
    activeCamera: toRef(e, "camera"),
    createCamera: a,
    updateCamera: n,
    pushCamera: r,
    clearCameras: c
  };
}
var xe = createEventHook();
var Ee = createEventHook();
var K = createEventHook();
var j = new Clock();
var G = 0;
var V = 0;
var { pause: tt, resume: at, isActive: nt } = useRafFn(
  () => {
    xe.trigger({ delta: G, elapsed: V, clock: j }), Ee.trigger({ delta: G, elapsed: V, clock: j }), K.trigger({ delta: G, elapsed: V, clock: j });
  },
  { immediate: false }
);
K.on(() => {
  G = j.getDelta(), V = j.getElapsedTime();
});
function Ce() {
  return {
    onBeforeLoop: xe.on,
    onLoop: Ee.on,
    onAfterLoop: K.on,
    pause: tt,
    resume: at,
    isActive: nt
  };
}
function rt(e) {
  return e instanceof Color ? e : Array.isArray(e) ? new Color(...e) : new Color(e);
}
var N = {
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
var Re = (e, t) => {
  for (const o of Object.keys(t))
    t[o] instanceof Object && Object.assign(t[o], Re(e[o], t[o]));
  return Object.assign(e || {}, t), e;
};
var ot = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
var it = st(ot);
function F(e) {
  return e.replace(/-([a-z])/g, (t, o) => o.toUpperCase());
}
function st(e, t) {
  const o = /* @__PURE__ */ Object.create(null), a = e.split(",");
  for (let n = 0; n < a.length; n++)
    o[a[n]] = true;
  return t ? (n) => !!o[n.toLowerCase()] : (n) => !!o[n];
}
function ct(e) {
  var ee, te;
  const t = shallowRef(), o = ref(false), {
    alpha: a = true,
    antialias: n = true,
    depth: r,
    logarithmicDepthBuffer: c,
    failIfMajorPerformanceCaveat: i,
    precision: s,
    premultipliedAlpha: l,
    stencil: u,
    shadows: p = false,
    shadowMapType: d = PCFShadowMap,
    physicallyCorrectLights: w = false,
    useLegacyLights: M = false,
    outputEncoding: x = LinearEncoding,
    toneMapping: L = NoToneMapping,
    toneMappingExposure: b = 1,
    context: v = void 0,
    powerPreference: E = "default",
    preserveDrawingBuffer: y = false,
    clearColor: g,
    windowSize: C = false,
    preset: I = void 0
  } = toRefs(e), { state: h2, setState: T } = S(), { width: O, height: R } = resolveUnref(C) == true || resolveUnref(C) === "" || resolveUnref(C) === "true" ? useWindowSize() : useElementSize(h2.container), { logError: B, logWarning: z } = D(), { pixelRatio: X } = useDevicePixelRatio(), { pause: Le, resume: Te } = Ce(), U = computed(() => O.value / R.value);
  !resolveUnref(C) && ((te = (ee = h2.container) == null ? void 0 : ee.value) == null ? void 0 : te.offsetHeight) === 0 && z(`Oops... Seems like your canvas height is currently 0px, by default it takes the height of it's parent, so make sure it has some height with CSS.
You could set windowSize=true to force the canvas to be the size of the window.`);
  const Q = () => {
    t.value && (t.value.setSize(O.value, R.value), t.value.setPixelRatio(Math.min(X.value, 2)));
  }, Z = () => {
    if (!t.value)
      return;
    const A = resolveUnref(I);
    if (A) {
      A in N || B("Renderer Preset must be one of these: " + Object.keys(N).join(", ")), Re(t.value, N[A]);
      return;
    }
    t.value.shadowMap.enabled = resolveUnref(p), t.value.shadowMap.type = resolveUnref(d), t.value.toneMapping = resolveUnref(L) || NoToneMapping, t.value.toneMappingExposure = resolveUnref(b), t.value.outputEncoding = resolveUnref(x) || LinearEncoding, g != null && g.value && t.value.setClearColor(rt(resolveUnref(g))), t.value.useLegacyLights = resolveUnref(M);
  }, Ae = () => {
    const A = unrefElement(h2.canvas);
    A && (t.value = new WebGLRenderer({
      canvas: A,
      alpha: resolveUnref(a),
      antialias: resolveUnref(n),
      context: resolveUnref(v),
      depth: resolveUnref(r),
      failIfMajorPerformanceCaveat: resolveUnref(i),
      logarithmicDepthBuffer: resolveUnref(c),
      powerPreference: resolveUnref(E),
      precision: resolveUnref(s),
      stencil: resolveUnref(u),
      preserveDrawingBuffer: resolveUnref(y),
      premultipliedAlpha: resolveUnref(l)
    }), T("renderer", t.value), T("clock", new Clock()), T("aspectRatio", U), Z(), Q(), Te(), o.value = true);
  }, _e = () => {
    t.value && (t.value.dispose(), t.value = void 0, o.value = false, Le());
  };
  return watch([U, X], Q), watch(
    [p, d, x, M, L, b, g],
    Z
  ), watch(
    () => [h2.canvas, h2.container],
    () => {
      unrefElement(h2.canvas) && unrefElement(h2.container) && Ae();
    },
    { immediate: true, deep: true }
  ), {
    renderer: t,
    isReady: o,
    dispose: _e,
    aspectRatio: U
  };
}
var ut = (e) => typeof e == "string";
var Pe = (e) => !!e && e.constructor === Array;
function ft(e) {
  const t = { nodes: {}, materials: {} };
  return e && e.traverse((o) => {
    o.name && (t.nodes[o.name] = o), o.material && !t.materials[o.material.name] && (t.materials[o.material.name] = o.material);
  }), t;
}
async function Ct(e, t, o, a, n) {
  const { logError: r } = D(), c = new e();
  n && n(c), o && o(c);
  const s = (Array.isArray(t) ? t : [t]).map(
    (l) => new Promise((u, p) => {
      c.load(
        l,
        (d) => {
          d.scene && Object.assign(d, ft(d.scene)), u(d);
        },
        a,
        (d) => p(r("[useLoader] - Failed to load resource", d))
      );
    })
  );
  return Pe(t) ? await Promise.all(s) : await s[0];
}
async function Rt(e) {
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
  if (Pe(e)) {
    const n = await Promise.all(e.map((r) => a(r)));
    return e.length > 1 ? n : n[0];
  } else {
    const {
      map: n,
      displacementMap: r,
      normalMap: c,
      roughnessMap: i,
      metalnessMap: s,
      aoMap: l,
      alphaMap: u,
      matcap: p
    } = e;
    return {
      map: n ? await a(n) : null,
      displacementMap: r ? await a(r) : null,
      normalMap: c ? await a(c) : null,
      roughnessMap: i ? await a(i) : null,
      metalnessMap: s ? await a(s) : null,
      aoMap: l ? await a(l) : null,
      alphaMap: u ? await a(u) : null,
      matcap: p ? await a(p) : null
    };
  }
}
var m = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
function lt() {
  const e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, o = Math.random() * 4294967295 | 0, a = Math.random() * 4294967295 | 0;
  return (m[e & 255] + m[e >> 8 & 255] + m[e >> 16 & 255] + m[e >> 24 & 255] + "-" + m[t & 255] + m[t >> 8 & 255] + "-" + m[t >> 16 & 15 | 64] + m[t >> 24 & 255] + "-" + m[o & 63 | 128] + m[o >> 8 & 255] + "-" + m[o >> 16 & 255] + m[o >> 24 & 255] + m[a & 255] + m[a >> 8 & 255] + m[a >> 16 & 255] + m[a >> 24 & 255]).toLowerCase();
}
var J = Symbol();
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
  return provide(J, a), a;
}
var S = () => inject(J, {
  state: shallowReactive({
    camera: void 0,
    cameras: [],
    scene: void 0,
    renderer: void 0
  })
});
function pt() {
  var c;
  const e = shallowRef(new Raycaster()), t = ref(new Vector2()), o = ref(null), { setState: a, state: n } = S();
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
var Pt = true;
var oe = "[TresJS ▲ ■ ●] ";
function D() {
  function e(a, n) {
    console.error(`${oe} ${a}`, n || "");
  }
  function t(a) {
    console.warn(`${oe} ${a}`);
  }
  function o(a, n) {
  }
  return {
    logError: e,
    logWarning: t,
    logMessage: o
  };
}
function Lt() {
  const { logWarning: e } = D();
  function t(a, n, r) {
    let c = null;
    return a.traverse((i) => {
      i[n] === r && (c = i);
    }), c || e(`Child with ${n} '${r}' not found.`), c;
  }
  function o(a, n) {
    return t(a, "name", n);
  }
  return {
    seek: t,
    seekByName: o
  };
}
var mt = /^on[^a-z]/;
var vt = (e) => mt.test(e);
var ie = null;
var se = {
  GEOMETRY_VIA_PROP: "tres__geometryViaProp",
  MATERIAL_VIA_PROP: "tres__materialViaProp"
};
var { logError: ce } = D();
var gt = {
  createElement(e, t, o, a) {
    var s, l;
    if (a || (a = {}), a.args || (a.args = []), e === "template" || it(e))
      return null;
    let n = e.replace("Tres", ""), r;
    if (e === "primitive") {
      (a == null ? void 0 : a.object) === void 0 && ce("Tres primitives need a prop 'object'");
      const u = a.object;
      n = u.type, r = Object.assign(u, { type: n, attach: a.attach, primitive: true });
    } else {
      const u = be.value[n];
      u || ce(`${n} is not defined on the THREE namespace. Use extend to add it to the catalog.`), r = new u(...a.args);
    }
    if (r.isCamera) {
      a != null && a.position || r.position.set(3, 3, 3), a != null && a.lookAt || r.lookAt(0, 0, 0);
      const { pushCamera: u } = Me();
      u(r);
    }
    (a == null ? void 0 : a.attach) === void 0 && (r.isMaterial ? r.attach = "material" : r.isBufferGeometry && (r.attach = "geometry"));
    const { GEOMETRY_VIA_PROP: c, MATERIAL_VIA_PROP: i } = se;
    return r.isObject3D && ((s = a == null ? void 0 : a.material) != null && s.isMaterial && (r.userData[i] = true), (l = a == null ? void 0 : a.geometry) != null && l.isBufferGeometry && (r.userData[c] = true)), r.events = {}, r;
  },
  insert(e, t) {
    var o, a, n, r;
    if ((((o = e == null ? void 0 : e.__vnode) == null ? void 0 : o.type) === "TresGroup" || ((a = e == null ? void 0 : e.__vnode) == null ? void 0 : a.type) === "TresObject3D") && t === null && !((r = (n = e == null ? void 0 : e.__vnode) == null ? void 0 : n.ctx) != null && r.asyncResolved)) {
      ie = e;
      return;
    }
    t || (t = ie), e != null && e.isObject3D && (t != null && t.isObject3D) ? (t.add(e), e.dispatchEvent({ type: "added" })) : typeof (e == null ? void 0 : e.attach) == "string" && (e.__previousAttach = e[t == null ? void 0 : t.attach], t && (t[e.attach] = e));
  },
  remove(e) {
    var t, o;
    if (e) {
      if (e.isObject3D) {
        const a = e, n = (r) => {
          var s, l;
          const { GEOMETRY_VIA_PROP: c, MATERIAL_VIA_PROP: i } = se;
          r.userData[i] || (s = r.material) == null || s.dispose(), r.userData[c] || (l = r.geometry) == null || l.dispose();
        };
        a.traverse((r) => n(r)), n(a);
      }
      (t = e.removeFromParent) == null || t.call(e), (o = e.dispose) == null || o.call(e);
    }
  },
  patchProp(e, t, o, a) {
    if (e) {
      let n = e, r = t, c = F(r), i = n == null ? void 0 : n[c];
      if (n.type === "BufferGeometry") {
        n.setAttribute(
          F(r),
          new BufferAttribute(...a)
        );
        return;
      }
      if (r.includes("-") && i === void 0) {
        const l = r.split("-");
        i = l.reduce((u, p) => u[F(p)], n), r = l.pop(), c = r.toLowerCase(), i != null && i.set || (n = l.reduce((u, p) => u[F(p)], n));
      }
      vt(r) && (e.events[r] = a);
      let s = a;
      if (s === "" && (s = true), isFunction(i)) {
        Array.isArray(s) ? e[c](...s) : e[c](s);
        return;
      }
      !(i != null && i.set) && !isFunction(i) ? n[c] = s : i.constructor === s.constructor && (i != null && i.copy) ? i == null || i.copy(s) : Array.isArray(s) ? i.set(...s) : !i.isColor && i.setScalar ? i.setScalar(s) : i.set(s);
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
ye(three_module_exports);
var { logWarning: ue } = D();
var bt = defineComponent({
  name: "TresScene",
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
    "preset",
    "disableRender"
  ],
  setup(e, { slots: t, expose: o }) {
    e.physicallyCorrectLights === true && ue("physicallyCorrectLights is deprecated, useLegacyLights is now false by default");
    const a = ref(), n = ref(), r = new Scene(), { setState: c } = S();
    c("scene", r), c("canvas", n), c("container", a);
    const i = ref(), s = t && t.default && t.default();
    (s == null ? void 0 : s.length) > 0 && (i.value = s.some((d) => ut(d.type) && d.type.includes("Camera")), i.value || ue("No camera found in the scene, please add one!")), onMounted(() => {
      l();
    }), onUnmounted(() => {
      c("renderer", null);
    });
    function l() {
      const { renderer: d } = ct(e), { activeCamera: w } = Me(), { onLoop: M } = Ce(), { raycaster: x, pointer: L } = pt();
      let b = null, v = null;
      watchEffect(() => {
        w.value && x.value.setFromCamera(L.value, w.value);
      }), M(() => {
        var E, y, g, C, I, h2, T, O, R, B;
        if (w.value && e.disableRender !== true && e.disableRender !== "" && ((E = d.value) == null || E.render(r, w.value)), x.value) {
          const z = x.value.intersectObjects(r.children);
          z.length > 0 ? (v = z[0], b === null && ((C = (g = (y = v.object) == null ? void 0 : y.events) == null ? void 0 : g.onPointerEnter) == null || C.call(g, v)), (T = (h2 = (I = v.object) == null ? void 0 : I.events) == null ? void 0 : h2.onPointerMove) == null || T.call(h2, v)) : b !== null && ((B = (R = (O = v == null ? void 0 : v.object) == null ? void 0 : O.events) == null ? void 0 : R.onPointerLeave) == null || B.call(R, b), v = null), b = v;
        }
      }), useEventListener(n.value, "click", () => {
        var E, y, g;
        v !== null && ((g = (y = (E = v.object) == null ? void 0 : E.events) == null ? void 0 : y.onClick) == null || g.call(y, v));
      });
    }
    let u;
    function p() {
      u = wt(t), u.provide("useTres", S()), u.provide(J, S()), u.provide("extend", ye), u.mount(r);
    }
    return p(), o({
      scene: r
    }), () => h(
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
    "outputEncoding",
    "toneMapping",
    "toneMappingExposure",
    "context",
    "powerPreference",
    "preserveDrawingBuffer",
    "clearColor",
    "windowSize",
    "preset",
    "disableRender"
  ],
  setup(e, { slots: t, expose: o }) {
    const a = dt();
    return o(a), () => h(bt, e, t);
  }
});
var Tt = {
  install(e) {
    e.component("TresCanvas", yt);
  }
};

export {
  be,
  ye,
  Ze,
  Me,
  Ce,
  ct,
  ft,
  Ct,
  Rt,
  J,
  dt,
  S,
  pt,
  Pt,
  D,
  Lt,
  yt,
  Tt
};
//# sourceMappingURL=chunk-KVUXOTEI.js.map
