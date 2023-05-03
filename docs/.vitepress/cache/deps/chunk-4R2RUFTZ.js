import {
  computed,
  createRenderer,
  customRef,
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
import {
  ACESFilmicToneMapping,
  BufferAttribute,
  Clock,
  Color,
  LinearSRGBColorSpace,
  LoadingManager,
  MathUtils,
  NoToneMapping,
  OrthographicCamera,
  PCFShadowMap,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Raycaster,
  SRGBColorSpace,
  Scene,
  TextureLoader,
  Vector2,
  WebGLRenderer,
  three_module_exports
} from "./chunk-PDZK3SQX.js";

// node_modules/.pnpm/@vueuse+shared@10.1.2_vue@3.2.47/node_modules/@vueuse/shared/index.mjs
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function createEventHook() {
  const fns = /* @__PURE__ */ new Set();
  const off = (fn) => {
    fns.delete(fn);
  };
  const on = (fn) => {
    fns.add(fn);
    const offFn = () => off(fn);
    tryOnScopeDispose(offFn);
    return {
      off: offFn
    };
  };
  const trigger = (param) => {
    return Promise.all(Array.from(fns).map((fn) => fn(param)));
  };
  return {
    on,
    off,
    trigger
  };
}
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
var isClient = typeof window !== "undefined";
var noop = () => {
};
var isIOS = getIsIOS();
function getIsIOS() {
  var _a;
  return isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
}
function identity(arg) {
  return arg;
}
function toRef2(...args) {
  if (args.length !== 1)
    return toRef(...args);
  const r = args[0];
  return typeof r === "function" ? readonly(customRef(() => ({ get: r, set: noop }))) : ref(r);
}
function tryOnMounted(fn, sync = true) {
  if (getCurrentInstance())
    onMounted(fn);
  else if (sync)
    fn();
  else
    nextTick(fn);
}

// node_modules/.pnpm/@vueuse+core@10.1.2_vue@3.2.47/node_modules/@vueuse/core/index.mjs
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
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
  if (typeof args[0] === "string" || Array.isArray(args[0])) {
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
  const stopWatch = watch(
    () => [unrefElement(target), toValue(options)],
    ([el, options2]) => {
      cleanup();
      if (!el)
        return;
      cleanups.push(
        ...events.flatMap((event) => {
          return listeners.map((listener) => register(el, event, listener, options2));
        })
      );
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function useMounted() {
  const isMounted = ref(false);
  if (getCurrentInstance()) {
    onMounted(() => {
      isMounted.value = true;
    });
  }
  return isMounted;
}
function useSupported(callback) {
  const isMounted = useMounted();
  return computed(() => {
    isMounted.value;
    return Boolean(callback());
  });
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
function useMediaQuery(query, options = {}) {
  const { window: window2 = defaultWindow } = options;
  const isSupported = useSupported(() => window2 && "matchMedia" in window2 && typeof window2.matchMedia === "function");
  let mediaQuery;
  const matches = ref(false);
  const cleanup = () => {
    if (!mediaQuery)
      return;
    if ("removeEventListener" in mediaQuery)
      mediaQuery.removeEventListener("change", update);
    else
      mediaQuery.removeListener(update);
  };
  const update = () => {
    if (!isSupported.value)
      return;
    cleanup();
    mediaQuery = window2.matchMedia(toRef2(query).value);
    matches.value = !!(mediaQuery == null ? void 0 : mediaQuery.matches);
    if (!mediaQuery)
      return;
    if ("addEventListener" in mediaQuery)
      mediaQuery.addEventListener("change", update);
    else
      mediaQuery.addListener(update);
  };
  watchEffect(update);
  tryOnScopeDispose(() => cleanup());
  return matches;
}
var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var globalKey = "__vueuse_ssr_handlers__";
var handlers = getHandlers();
function getHandlers() {
  if (!(globalKey in _global))
    _global[globalKey] = _global[globalKey] || {};
  return _global[globalKey];
}
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
  const _a = options, { window: window2 = defaultWindow } = _a, observerOptions = __objRest$2(_a, ["window"]);
  let observer;
  const isSupported = useSupported(() => window2 && "ResizeObserver" in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const targets = computed(
    () => Array.isArray(target) ? target.map((el) => unrefElement(el)) : [unrefElement(target)]
  );
  const stopWatch = watch(
    targets,
    (els) => {
      cleanup();
      if (isSupported.value && window2) {
        observer = new ResizeObserver(callback);
        for (const _el of els)
          _el && observer.observe(_el, observerOptions);
      }
    },
    { immediate: true, flush: "post", deep: true }
  );
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
function useElementSize(target, initialSize = { width: 0, height: 0 }, options = {}) {
  const { window: window2 = defaultWindow, box = "content-box" } = options;
  const isSVG = computed(() => {
    var _a, _b;
    return (_b = (_a = unrefElement(target)) == null ? void 0 : _a.namespaceURI) == null ? void 0 : _b.includes("svg");
  });
  const width = ref(initialSize.width);
  const height = ref(initialSize.height);
  useResizeObserver(
    target,
    ([entry]) => {
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
    },
    options
  );
  watch(
    () => unrefElement(target),
    (ele) => {
      width.value = ele ? initialSize.width : 0;
      height.value = ele ? initialSize.height : 0;
    }
  );
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
var TransitionPresets = Object.assign({}, { linear: identity }, _TransitionPresets);
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
  if (listenOrientation) {
    const matches = useMediaQuery("(orientation: portrait)");
    watch(matches, () => update());
  }
  return { width, height };
}

// node_modules/.pnpm/@tresjs+core@2.0.0-rc.2_three@0.152.2_vue@3.2.47/node_modules/@tresjs/core/dist/tres.js
var ye = ref({ uuid: MathUtils.generateUUID() });
var Me = (e) => void Object.assign(ye.value, e);
var Qe = ((e) => (e.Perspective = "Perspective", e.Orthographic = "Orthographic", e))(Qe || {});
var Ze = 45;
var A;
function Ce() {
  const { state: e, setState: t, aspectRatio: o } = _();
  function a(i = "Perspective", s) {
    var u, f, m;
    if (i === "Perspective") {
      const { near: v, far: h2, fov: M } = s || {
        near: 0.1,
        far: 1e3,
        fov: Ze
      };
      A = new PerspectiveCamera(M, ((u = e.aspectRatio) == null ? void 0 : u.value) || window.innerWidth / window.innerHeight, v, h2), (f = e.cameras) == null || f.push(A);
    } else {
      const { left: v, right: h2, top: M, bottom: w, near: P, far: C } = s || {
        left: -100,
        right: 100,
        top: 100,
        bottom: -100,
        near: 0.1,
        far: 1e3
      };
      A = new OrthographicCamera(v, h2, M, w, P, C), (m = e.cameras) == null || m.push(A);
    }
    return e.camera = A, t("camera", e.camera), A;
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
var Re = createEventHook();
var X = createEventHook();
var j = new Clock();
var W = 0;
var H = 0;
var { pause: et, resume: tt, isActive: at } = useRafFn(
  () => {
    xe.trigger({ delta: W, elapsed: H, clock: j }), Re.trigger({ delta: W, elapsed: H, clock: j }), X.trigger({ delta: W, elapsed: H, clock: j });
  },
  { immediate: false }
);
X.on(() => {
  W = j.getDelta(), H = j.getElapsedTime();
});
function Ee() {
  return {
    onBeforeLoop: xe.on,
    onLoop: Re.on,
    onAfterLoop: X.on,
    pause: et,
    resume: tt,
    isActive: at
  };
}
function nt(e) {
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
var Pe = (e, t) => {
  for (const o of Object.keys(t))
    t[o] instanceof Object && Object.assign(t[o], Pe(e[o], t[o]));
  return Object.assign(e || {}, t), e;
};
var rt = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
var ot = it(rt);
function V(e) {
  return e.replace(/-([a-z])/g, (t, o) => o.toUpperCase());
}
function it(e, t) {
  const o = /* @__PURE__ */ Object.create(null), a = e.split(",");
  for (let n = 0; n < a.length; n++)
    o[a[n]] = true;
  return t ? (n) => !!o[n.toLowerCase()] : (n) => !!o[n];
}
function st(e) {
  var te, ae;
  const t = shallowRef(), o = ref(false), {
    alpha: a = true,
    antialias: n = true,
    depth: r,
    logarithmicDepthBuffer: c,
    failIfMajorPerformanceCaveat: i,
    precision: s,
    premultipliedAlpha: u,
    stencil: f,
    shadows: m = false,
    shadowMapType: v = PCFShadowMap,
    useLegacyLights: h2 = false,
    outputColorSpace: M = LinearSRGBColorSpace,
    toneMapping: w = NoToneMapping,
    toneMappingExposure: P = 1,
    context: C = void 0,
    powerPreference: U = "default",
    preserveDrawingBuffer: S = false,
    clearColor: d,
    windowSize: b = false,
    preset: y = void 0
  } = toRefs(e), { state: g, setState: T } = _(), { width: O, height: x } = toValue(b) == true || toValue(b) === "" || toValue(b) === "true" ? useWindowSize() : useElementSize(g.container), { logError: I, logWarning: B } = D(), { pixelRatio: R } = useDevicePixelRatio(), { pause: z, resume: G } = Ee(), Y = computed(() => O.value / x.value);
  !toValue(b) && ((ae = (te = g.container) == null ? void 0 : te.value) == null ? void 0 : ae.offsetHeight) === 0 && B(`Oops... Seems like your canvas height is currently 0px, by default it takes the height of it's parent, so make sure it has some height with CSS.
You could set windowSize=true to force the canvas to be the size of the window.`);
  const Z = () => {
    t.value && (t.value.setSize(O.value, x.value), t.value.setPixelRatio(Math.min(R.value, 2)));
  }, ee = () => {
    if (!t.value)
      return;
    const L = toValue(y);
    if (L) {
      L in K || I("Renderer Preset must be one of these: " + Object.keys(K).join(", ")), Pe(t.value, K[L]);
      return;
    }
    t.value.shadowMap.enabled = toValue(m), t.value.shadowMap.type = toValue(v), t.value.toneMapping = toValue(w) || NoToneMapping, t.value.toneMappingExposure = toValue(P), t.value.outputColorSpace = toValue(M) || LinearSRGBColorSpace, d != null && d.value && t.value.setClearColor(nt(toValue(d))), t.value.useLegacyLights = toValue(h2);
  }, Te = () => {
    const L = unrefElement(g.canvas);
    L && (t.value = new WebGLRenderer({
      canvas: L,
      alpha: toValue(a),
      antialias: toValue(n),
      context: toValue(C),
      depth: toValue(r),
      failIfMajorPerformanceCaveat: toValue(i),
      logarithmicDepthBuffer: toValue(c),
      powerPreference: toValue(U),
      precision: toValue(s),
      stencil: toValue(f),
      preserveDrawingBuffer: toValue(S),
      premultipliedAlpha: toValue(u)
    }), T("renderer", t.value), T("clock", new Clock()), T("aspectRatio", Y), ee(), Z(), G(), o.value = true);
  }, Le = () => {
    t.value && (t.value.dispose(), t.value = void 0, o.value = false, z());
  };
  return watch([Y, R], Z), watch(
    [m, v, M, h2, w, P, d],
    ee
  ), watch(
    () => [g.canvas, g.container],
    () => {
      unrefElement(g.canvas) && unrefElement(g.container) && Te();
    },
    { immediate: true, deep: true }
  ), {
    renderer: t,
    isReady: o,
    dispose: Le,
    aspectRatio: Y
  };
}
var oe = (e) => typeof e == "function";
var ct = (e) => typeof e == "string";
var Se = (e) => !!e && e.constructor === Array;
function ut(e) {
  const t = { nodes: {}, materials: {} };
  return e && e.traverse((o) => {
    o.name && (t.nodes[o.name] = o), o.material && !t.materials[o.material.name] && (t.materials[o.material.name] = o.material);
  }), t;
}
async function xt(e, t, o, a, n) {
  const { logError: r } = D(), c = new e();
  n && n(c), o && o(c);
  const s = (Array.isArray(t) ? t : [t]).map(
    (u) => new Promise((f, m) => {
      c.load(
        u,
        (v) => {
          v.scene && Object.assign(v, ut(v.scene)), f(v);
        },
        a,
        (v) => m(r("[useLoader] - Failed to load resource", v))
      );
    })
  );
  return Se(t) ? await Promise.all(s) : await s[0];
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
  if (Se(e)) {
    const n = await Promise.all(e.map((r) => a(r)));
    return e.length > 1 ? n : n[0];
  } else {
    const {
      map: n,
      displacementMap: r,
      normalMap: c,
      roughnessMap: i,
      metalnessMap: s,
      aoMap: u,
      alphaMap: f,
      matcap: m
    } = e;
    return {
      map: n ? await a(n) : null,
      displacementMap: r ? await a(r) : null,
      normalMap: c ? await a(c) : null,
      roughnessMap: i ? await a(i) : null,
      metalnessMap: s ? await a(s) : null,
      aoMap: u ? await a(u) : null,
      alphaMap: f ? await a(f) : null,
      matcap: m ? await a(m) : null
    };
  }
}
var p = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
function ft() {
  const e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, o = Math.random() * 4294967295 | 0, a = Math.random() * 4294967295 | 0;
  return (p[e & 255] + p[e >> 8 & 255] + p[e >> 16 & 255] + p[e >> 24 & 255] + "-" + p[t & 255] + p[t >> 8 & 255] + "-" + p[t >> 16 & 15 | 64] + p[t >> 24 & 255] + "-" + p[o & 63 | 128] + p[o >> 8 & 255] + "-" + p[o >> 16 & 255] + p[o >> 24 & 255] + p[a & 255] + p[a >> 8 & 255] + p[a >> 16 & 255] + p[a >> 24 & 255]).toLowerCase();
}
var Q = Symbol();
function lt() {
  const e = shallowReactive({
    uuid: ft(),
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
function dt() {
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
var Et = true;
var ie = "[TresJS ▲ ■ ●] ";
function D() {
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
function Pt() {
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
var pt = (e) => mt.test(e);
var se = null;
var ce = {
  GEOMETRY_VIA_PROP: "tres__geometryViaProp",
  MATERIAL_VIA_PROP: "tres__materialViaProp"
};
var { logError: ue } = D();
var vt = {
  createElement(e, t, o, a) {
    var s, u;
    if (a || (a = {}), a.args || (a.args = []), e === "template" || ot(e))
      return null;
    let n = e.replace("Tres", ""), r;
    if (e === "primitive") {
      (a == null ? void 0 : a.object) === void 0 && ue("Tres primitives need a prop 'object'");
      const f = a.object;
      n = f.type, r = Object.assign(f, { type: n, attach: a.attach, primitive: true });
    } else {
      const f = ye.value[n];
      f || ue(`${n} is not defined on the THREE namespace. Use extend to add it to the catalog.`), r = new f(...a.args);
    }
    if (r.isCamera) {
      a != null && a.position || r.position.set(3, 3, 3), a != null && a.lookAt || r.lookAt(0, 0, 0);
      const { pushCamera: f } = Ce();
      f(r);
    }
    (a == null ? void 0 : a.attach) === void 0 && (r.isMaterial ? r.attach = "material" : r.isBufferGeometry && (r.attach = "geometry"));
    const { GEOMETRY_VIA_PROP: c, MATERIAL_VIA_PROP: i } = ce;
    return r.isObject3D && ((s = a == null ? void 0 : a.material) != null && s.isMaterial && (r.userData[i] = true), (u = a == null ? void 0 : a.geometry) != null && u.isBufferGeometry && (r.userData[c] = true)), r.events = {}, r;
  },
  insert(e, t) {
    var o, a, n, r;
    if ((((o = e == null ? void 0 : e.__vnode) == null ? void 0 : o.type) === "TresGroup" || ((a = e == null ? void 0 : e.__vnode) == null ? void 0 : a.type) === "TresObject3D") && t === null && !((r = (n = e == null ? void 0 : e.__vnode) == null ? void 0 : n.ctx) != null && r.asyncResolved)) {
      se = e;
      return;
    }
    t || (t = se), e != null && e.isObject3D && (t != null && t.isObject3D) ? (t.add(e), e.dispatchEvent({ type: "added" })) : typeof (e == null ? void 0 : e.attach) == "string" && (e.__previousAttach = e[t == null ? void 0 : t.attach], t && (t[e.attach] = e));
  },
  remove(e) {
    var t, o;
    if (e) {
      if (e.isObject3D) {
        const a = e, n = (r) => {
          var s, u;
          const { GEOMETRY_VIA_PROP: c, MATERIAL_VIA_PROP: i } = ce;
          r.userData[i] || (s = r.material) == null || s.dispose(), r.userData[c] || (u = r.geometry) == null || u.dispose();
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
        const u = r.split("-");
        i = u.reduce((f, m) => f[V(m)], n), r = u.pop(), c = r.toLowerCase(), i != null && i.set || (n = u.reduce((f, m) => f[V(m)], n));
      }
      pt(r) && (e.events[r] = a);
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
var { createApp: gt } = createRenderer(vt);
var ht = (e) => {
  const t = gt(o);
  function o() {
    return e && e.default ? e.default() : [];
  }
  return t;
};
Me(three_module_exports);
var { logWarning: fe } = D();
var wt = defineComponent({
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
    e.physicallyCorrectLights === true && fe("physicallyCorrectLights is deprecated, useLegacyLights is now false by default");
    const a = ref(), n = ref(), r = new Scene(), { setState: c } = _();
    c("scene", r), c("canvas", n), c("container", a);
    const i = ref(), s = t && t.default && t.default();
    s && (s == null ? void 0 : s.length) > 0 && (i.value = s.some((w) => ct(w.type) && w.type.includes("Camera")) || e.camera, i.value || fe("No camera found in the scene, please add one!")), onMounted(() => {
      v();
    }), onUnmounted(() => {
      c("renderer", null);
    });
    const { activeCamera: u, pushCamera: f, clearCameras: m } = Ce();
    function v() {
      const { renderer: w } = st(e);
      e.camera && f(e.camera);
      const { onLoop: P } = Ee(), { raycaster: C, pointer: U } = dt();
      let S = null, d = null;
      watchEffect(() => {
        u.value && C.value.setFromCamera(U.value, u.value);
      }), P(() => {
        var b, y, g, T, O, x, I, B, R, z;
        if (u.value && e.disableRender !== true && e.disableRender !== "" && ((b = w.value) == null || b.render(r, u.value)), C.value) {
          const G = C.value.intersectObjects(r.children);
          G.length > 0 ? (d = G[0], S === null && ((T = (g = (y = d.object) == null ? void 0 : y.events) == null ? void 0 : g.onPointerEnter) == null || T.call(g, d)), (I = (x = (O = d.object) == null ? void 0 : O.events) == null ? void 0 : x.onPointerMove) == null || I.call(x, d)) : S !== null && ((z = (R = (B = d == null ? void 0 : d.object) == null ? void 0 : B.events) == null ? void 0 : R.onPointerLeave) == null || z.call(R, S), d = null), S = d;
        }
      }), useEventListener(n.value, "click", () => {
        var b, y, g;
        d !== null && ((g = (y = (b = d.object) == null ? void 0 : b.events) == null ? void 0 : y.onClick) == null || g.call(y, d));
      });
    }
    let h2;
    function M() {
      h2 = ht(t), h2.provide("useTres", _()), h2.provide(Q, _()), h2.provide("extend", Me), h2.mount(r);
    }
    return M(), o({
      scene: r
    }), watch(
      () => e.camera,
      (w) => {
        w && (m(), f(w));
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
var bt = defineComponent({
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
    const a = lt();
    return o(a), () => h(wt, e, t);
  }
});
var St = {
  install(e) {
    e.component("TresCanvas", bt);
  }
};

export {
  ye,
  Me,
  Qe,
  Ce,
  Ee,
  st,
  ut,
  xt,
  Rt,
  Q,
  lt,
  _,
  dt,
  Et,
  D,
  Pt,
  bt,
  St
};
//# sourceMappingURL=chunk-4R2RUFTZ.js.map
