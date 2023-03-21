import {
  computed,
  defineComponent,
  getCurrentInstance,
  getCurrentScope,
  h,
  inject,
  nextTick,
  onBeforeUnmount,
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
  watch
} from "./chunk-LZPJ5JBW.js";
import {
  ACESFilmicToneMapping,
  BufferAttribute,
  Clock,
  Color,
  Fog,
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
  Vector3,
  WebGLRenderer,
  sRGBEncoding,
  three_module_exports
} from "./chunk-4QXXOI63.js";

// node_modules/.pnpm/@vueuse+shared@9.13.0/node_modules/@vueuse/shared/index.mjs
var _a;
var isClient = typeof window !== "undefined";
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

// node_modules/.pnpm/@vueuse+core@9.13.0/node_modules/@vueuse/core/index.mjs
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

// node_modules/.pnpm/@tresjs+core@1.8.1_three@0.150.1/node_modules/@tresjs/core/dist/tres.js
var qe = ((e) => (e.Perspective = "Perspective", e.Orthographic = "Orthographic", e))(qe || {});
var Qe = 45;
var b;
function Se() {
  const { state: e, setState: n } = $(), o = inject("aspect-ratio");
  function a(t = "Perspective", r) {
    var l, s, i;
    if (t === "Perspective") {
      const { near: u, far: d, fov: p } = r || {
        near: 0.1,
        far: 1e3,
        fov: Qe
      };
      b = new PerspectiveCamera(p, ((l = e.aspectRatio) == null ? void 0 : l.value) || window.innerWidth / window.innerHeight, u, d), (s = e.cameras) == null || s.push(b);
    } else {
      const { left: u, right: d, top: p, bottom: m, near: g, far: R } = r || {
        left: -100,
        right: 100,
        top: 100,
        bottom: -100,
        near: 0.1,
        far: 1e3
      };
      b = new OrthographicCamera(u, d, p, m, g, R), (i = e.cameras) == null || i.push(b);
    }
    return e.camera = b, n("camera", e.camera), b;
  }
  function c() {
    var t;
    e.camera instanceof PerspectiveCamera && e.aspectRatio && (e.camera.aspect = e.aspectRatio.value), (t = e.camera) == null || t.updateProjectionMatrix();
  }
  function f(t) {
    var r;
    (r = e.cameras) == null || r.push(t), t instanceof PerspectiveCamera && e.aspectRatio && (t.aspect = e.aspectRatio.value), t.updateProjectionMatrix(), n("camera", t);
  }
  function h2() {
    e.cameras = [];
  }
  return o && watch(o, c), {
    activeCamera: toRef(e, "camera"),
    createCamera: a,
    updateCamera: c,
    pushCamera: f,
    clearCameras: h2
  };
}
var fe = "[TresJS ▲ ■ ●] ";
function F() {
  function e(a, c) {
    console.error(`${fe} ${a}`, c || "");
  }
  function n(a) {
    console.warn(`${fe} ${a}`);
  }
  function o(a, c) {
  }
  return {
    logError: e,
    logWarning: n,
    logMessage: o
  };
}
var D = ref({ ...three_module_exports, uuid: MathUtils.generateUUID() });
delete D.value.Scene;
var A;
function et(e, n = "Tres") {
  const { logError: o } = F();
  !A && e && (A = e);
  const { createComponentInstances: a } = Ce(n);
  return {
    extend: (f) => {
      if (!f) {
        o("No objects provided to extend catalogue");
        return;
      }
      D.value = Object.assign(D.value, f);
      const h2 = a(ref(f));
      A && h2.forEach(([t, r]) => {
        A._context.components[t] || A.component(t, r);
      });
    },
    catalogue: D
  };
}
var M = (e) => typeof e < "u";
var tt = (e) => typeof e == "function";
var N = (e) => !!e && e.constructor === Array;
function nt(e) {
  return typeof e == "number" ? [e, e, e] : e instanceof Vector3 ? [e.x, e.y, e.z] : e;
}
function rt(e) {
  return e instanceof Color ? e : Array.isArray(e) ? new Color(...e) : new Color(e);
}
var pe = ["rotation", "scale", "position"];
var ot = ["X", "Y", "Z"];
var at = ["color"];
var it = ["r", "g", "b"];
function Ce(e) {
  const {
    /* logMessage, */
    logError: n
  } = F();
  function o(t, r) {
    M(t) && M(r) && Object.entries(t).forEach(([l, s]) => {
      const i = l.replace(/(-\w)/g, (u) => u[1].toUpperCase());
      r.setAttribute(i, new BufferAttribute(...s));
    });
  }
  function a(t, r) {
    M(t) && M(r) && Object.entries(t).forEach(([l, s]) => {
      const i = l.replace(/(-\w)/g, (g) => g[1].toUpperCase());
      let u, d, p, m;
      if (!(i === "args" || s === void 0)) {
        pe.includes(i) && s ? s = nt(s) : pe.forEach((g) => {
          i.startsWith(g) && i.length === g.length + 1 && (u = g, d = i.substring(g.length), ot.includes(d) || n(
            // eslint-disable-next-line max-len
            `There was an error setting ${l} property, ${d} is not a valid axis for ${u}`
          ));
        }), at.forEach((g) => {
          i.startsWith(g) && i.length === g.length + 1 && (p = g, m = i.substring(g.length).toLowerCase(), it.includes(m) || n(`There was an error setting ${l} property , ${m} is not a valid axis for ${p}`));
        }), t.ref && (t.ref = r);
        try {
          if (r[i] && M(r[i].set))
            r[i].set(...N(s) ? s : [s]);
          else if (
            // Check if the property has a "setAxis" method
            u && r[u]
          )
            M(r[u][`set${d}`]) ? r[u][`set${d}`](s) : M(r[`rotate${d}`]) && r[`rotate${d}`](s);
          else if (
            // Check if the instance has a "color" property
            p && m && r[p] && r[p][m]
          )
            r[p][m] = s;
          else {
            if (s === "" && (s = true), tt(r[i])) {
              if (l === "center" && !s)
                return;
              r[i](...N(s) ? s : [s]);
              return;
            }
            r[i] = s;
          }
        } catch (g) {
          n(`There was an error setting ${i} property`, g);
        }
      }
    });
  }
  function c(t) {
    var i, u;
    const r = /^Symbol\(Fragment\)$/g, l = /^Symbol\(Text\)$/g, s = /^Symbol\(Comment\)$/g;
    if (r.test(t.type.toString()))
      return t.children.map((d) => c(d));
    if (l.test(t.type.toString()) || s.test(t.type.toString()))
      return;
    {
      const d = t.type.name.replace(e, ""), p = inject("catalogue");
      let m;
      if (p)
        if ((i = t.children) != null && i.default) {
          const g = t.children.default().map((R) => c(R));
          m = new p.value[d](...g.flat().filter(Boolean));
        } else
          (u = t == null ? void 0 : t.props) != null && u.args ? p != null && p.value[d] ? m = new p.value[d](...t.props.args) : n(`There is no ${d} in the catalogue`, p == null ? void 0 : p.value.uuid) : m = new p.value[d]();
      return t != null && t.props && (d === "BufferGeometry" ? o(t.props, m) : a(t.props, m)), m;
    }
  }
  function f(t, r, l) {
    if (l.default && (l != null && l.default())) {
      const s = l.default().map((i) => c(i));
      if (t.name === "Group") {
        const i = new t();
        return s.forEach((u) => {
          i.add(u);
        }), i;
      } else
        return new t(...s.flat().filter(Boolean));
    } else
      return r.args ? new t(...r.args) : new t();
  }
  function h2(t) {
    return Object.entries(t.value).filter(([r, l]) => {
      var s, i;
      return (i = (s = l == null ? void 0 : l.prototype) == null ? void 0 : s.constructor) == null ? void 0 : i.toString().includes("class");
    }).map(([r, l]) => {
      const s = `${e}${r}`, i = defineComponent({
        name: s,
        setup(u, { slots: d, attrs: p, ...m }) {
          const { state: g } = $(), { onLoop: R } = ne(), v = g.scene, _ = g.raycaster;
          let S = f(l, p, d);
          if (a(p, S), S instanceof PerspectiveCamera || S instanceof OrthographicCamera) {
            const { pushCamera: O } = Se();
            O(S);
          }
          S.isObject3D && (v == null || v.add(S));
          let C = null, E = null;
          if (S instanceof Mesh) {
            R(() => {
              if (S && _ && (v != null && v.children)) {
                const x = _.intersectObjects(v == null ? void 0 : v.children);
                x.length > 0 ? (E = x[0], (C === null || C.object.uuid !== (E == null ? void 0 : E.object.uuid)) && m.emit("pointer-enter", E), m.emit("pointer-move", E)) : (E = null, C !== null && m.emit("pointer-leave", C)), C = E;
              }
            });
            const O = useEventListener(window, "click", () => {
              m.emit("click", C);
            });
            onUnmounted(() => {
              O();
            });
          }
          return v && S instanceof Fog && (v.fog = S), m.expose(S), () => {
          };
        }
      });
      return [s, i];
    });
  }
  return {
    createComponentInstances: h2,
    processProps: a,
    createInstanceFromVNode: c
  };
}
var Ee = createEventHook();
var Re = createEventHook();
var te = createEventHook();
var I = new Clock();
var W = 0;
var k = 0;
var { pause: st, resume: ct, isActive: lt } = useRafFn(
  () => {
    Ee.trigger({ delta: W, elapsed: k, clock: I }), Re.trigger({ delta: W, elapsed: k, clock: I }), te.trigger({ delta: W, elapsed: k, clock: I });
  },
  { immediate: false }
);
te.on(() => {
  W = I.getDelta(), k = I.getElapsedTime();
});
function ne() {
  return {
    onBeforeLoop: Ee.on,
    onLoop: Re.on,
    onAfterLoop: te.on,
    pause: st,
    resume: ct,
    isActive: lt
  };
}
var ut = shallowRef(new Scene());
function ft() {
  return {
    scene: ut
  };
}
function pt(e) {
  const n = { nodes: {}, materials: {} };
  return e && e.traverse((o) => {
    o.name && (n.nodes[o.name] = o), o.material && !n.materials[o.material.name] && (n.materials[o.material.name] = o.material);
  }), n;
}
async function Ct(e, n, o, a, c) {
  const { logError: f } = F(), h2 = new e();
  c && c(h2), o && o(h2);
  const r = (Array.isArray(n) ? n : [n]).map(
    (l) => new Promise((s, i) => {
      h2.load(
        l,
        (u) => {
          u.scene && Object.assign(u, pt(u.scene)), s(u);
        },
        a,
        (u) => i(f("[useLoader] - Failed to load resource", u))
      );
    })
  );
  return N(n) ? await Promise.all(r) : await r[0];
}
async function Et(e) {
  const n = new LoadingManager(), o = new TextureLoader(n), a = (c) => new Promise((f, h2) => {
    o.load(
      c,
      (t) => f(t),
      () => null,
      () => {
        h2(new Error("[useTextures] - Failed to load texture"));
      }
    );
  });
  if (N(e)) {
    const c = await Promise.all(e.map((f) => a(f)));
    return e.length > 1 ? c : c[0];
  } else {
    const { map: c, displacementMap: f, normalMap: h2, roughnessMap: t, metalnessMap: r, aoMap: l } = e;
    return {
      map: c ? await a(c) : null,
      displacementMap: f ? await a(f) : null,
      normalMap: h2 ? await a(h2) : null,
      roughnessMap: t ? await a(t) : null,
      metalnessMap: r ? await a(r) : null,
      aoMap: l ? await a(l) : null
    };
  }
}
var U = shallowReactive({
  camera: void 0,
  cameras: [],
  aspectRatio: computed(() => window.innerWidth / window.innerHeight)
});
function $() {
  function e(o) {
    return U[o];
  }
  function n(o, a) {
    U[o] = a;
  }
  return {
    state: U,
    ...toRefs(U),
    getState: e,
    setState: n
  };
}
var X = shallowRef(new Raycaster());
var B = ref(new Vector2());
var me = ref(null);
function mt() {
  const { setState: e } = $();
  e("raycaster", X.value), e("pointer", B), e("currentInstance", me), provide("raycaster", X), provide("pointer", B), provide("currentInstance", me);
  function n(o) {
    B.value.x = o.clientX / window.innerWidth * 2 - 1, B.value.y = -(o.clientY / window.innerHeight) * 2 + 1;
  }
  return window.addEventListener("pointermove", n), onUnmounted(() => {
    window.removeEventListener("pointermove", n);
  }), {
    raycaster: X,
    pointer: B
  };
}
var Y = {
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
var Me = (e, n) => {
  for (const o of Object.keys(n))
    n[o] instanceof Object && Object.assign(n[o], Me(e[o], n[o]));
  return Object.assign(e || {}, n), e;
};
var y = shallowRef();
var J = ref(false);
function dt(e, n, o) {
  const {
    alpha: a = true,
    antialias: c = true,
    depth: f,
    logarithmicDepthBuffer: h2,
    failIfMajorPerformanceCaveat: t,
    precision: r,
    premultipliedAlpha: l,
    stencil: s,
    shadows: i = false,
    shadowMapType: u = PCFShadowMap,
    physicallyCorrectLights: d = false,
    useLegacyLights: p = false,
    outputEncoding: m = LinearEncoding,
    toneMapping: g = NoToneMapping,
    toneMappingExposure: R = 1,
    context: v = void 0,
    powerPreference: _ = "default",
    preserveDrawingBuffer: S = false,
    clearColor: C,
    windowSize: E = false,
    preset: O = void 0
  } = toRefs(o), { setState: x } = $(), { width: re, height: oe } = resolveUnref(E) ? useWindowSize() : useElementSize(n), { logError: Le } = F(), { pixelRatio: ae } = useDevicePixelRatio(), { pause: xe, resume: Pe } = ne(), V = computed(() => re.value / oe.value), ie = () => {
    y.value && (y.value.setSize(re.value, oe.value), y.value.setPixelRatio(Math.min(ae.value, 2)));
  }, se = () => {
    if (!y.value)
      return;
    const P = resolveUnref(O);
    if (P) {
      P in Y || Le("Renderer Preset must be one of these: " + Object.keys(Y).join(", ")), Me(y.value, Y[P]);
      return;
    }
    y.value.shadowMap.enabled = resolveUnref(i), y.value.shadowMap.type = resolveUnref(u), y.value.toneMapping = resolveUnref(g) || NoToneMapping, y.value.toneMappingExposure = resolveUnref(R), y.value.outputEncoding = resolveUnref(m) || LinearEncoding, C != null && C.value && y.value.setClearColor(rt(resolveUnref(C))), y.value.useLegacyLights = resolveUnref(p);
  }, be = () => {
    const P = unrefElement(e);
    y.value || !P || (y.value = new WebGLRenderer({
      canvas: P,
      alpha: resolveUnref(a),
      antialias: resolveUnref(c),
      context: resolveUnref(v),
      depth: resolveUnref(f),
      failIfMajorPerformanceCaveat: resolveUnref(t),
      logarithmicDepthBuffer: resolveUnref(h2),
      powerPreference: resolveUnref(_),
      precision: resolveUnref(r),
      stencil: resolveUnref(s),
      preserveDrawingBuffer: resolveUnref(S),
      premultipliedAlpha: resolveUnref(l)
    }), x("renderer", y.value), x("clock", new Clock()), x("aspectRatio", V), se(), ie(), Pe(), J.value = true);
  }, Te = () => {
    y.value && (y.value.dispose(), y.value = void 0, J.value = false, xe());
  };
  return watch([V, ae], ie), watch(
    [i, u, m, p, g, R, C],
    se
  ), watch(
    () => [e, n],
    () => {
      unrefElement(e) && unrefElement(n) && be();
    },
    { immediate: true, deep: true }
  ), {
    renderer: y,
    isReady: J,
    dispose: Te,
    aspectRatio: V
  };
}
var { logError: de, logWarning: gt } = F();
var ht = defineComponent({
  name: "TresCanvas",
  props: {
    shadows: Boolean,
    shadowMapType: Number,
    physicallyCorrectLights: {
      type: Boolean,
      default: false,
      validator: (e) => (e && gt("physicallyCorrectLights is deprecated. Use useLegacyLights instead."), true)
    },
    useLegacyLights: Boolean,
    outputEncoding: Number,
    toneMapping: Number,
    toneMappingExposure: Number,
    context: Object,
    powerPreference: String,
    preserveDrawingBuffer: Boolean,
    clearColor: String,
    windowSize: { type: Boolean, default: false },
    preset: String
  },
  setup(e, { slots: n, attrs: o }) {
    const a = ref(), c = ref(), { renderer: f, dispose: h2, aspectRatio: t } = dt(a, c, e);
    return provide("aspect-ratio", t), provide("renderer", f), n.default && !n.default().some((r) => r.type.name === "Scene") && de("TresCanvas must contain a Scene component."), n.default && !n.default().some((r) => {
      var l;
      return (l = r.type.name) == null ? void 0 : l.includes("Camera");
    }) && de("Scene must contain a Camera component."), onBeforeUnmount(() => h2()), () => {
      if (n.default)
        return h(
          "div",
          {
            ref: c,
            style: {
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
              pointerEvents: "auto",
              touchAction: "none",
              ...o.style
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
                  ref: a,
                  style: {
                    display: "block",
                    width: "100%",
                    height: "100%",
                    position: e.windowSize ? "fixed" : "absolute",
                    top: 0,
                    left: 0
                  }
                }),
                n.default()
              ]
            )
          ]
        );
    };
  }
});
var wt = defineComponent({
  name: "Scene",
  setup(e, { slots: n }) {
    const { setState: o } = $(), { scene: a } = ft(), c = inject("renderer"), { activeCamera: f } = Se(), { raycaster: h2, pointer: t } = mt(), { onLoop: r } = ne();
    return provide("local-scene", a), o("scene", a.value), r(() => {
      f.value && (h2.value.setFromCamera(t.value, f.value), c != null && c.value && f && (a != null && a.value) && c.value.render(a == null ? void 0 : a.value, f.value));
    }), () => {
      if (n.default)
        return n.default();
    };
  }
});
var Rt = Symbol("UseTresState");
var Mt = {
  install(e, n) {
    const o = (n == null ? void 0 : n.prefix) || "Tres";
    e.component(`${o}Canvas`, ht), e.component(`${o}Scene`, wt);
    const { catalogue: a, extend: c } = et(e, o);
    e.provide("catalogue", a), e.provide("extend", c), e.provide("useTres", $());
    const { createComponentInstances: f } = Ce(o);
    f(a).forEach(([t, r]) => {
      e.component(t, r);
    });
  }
};

export {
  qe,
  Se,
  et,
  Ce,
  ne,
  ft,
  pt,
  Ct,
  Et,
  $,
  mt,
  dt,
  Rt,
  Mt
};
//# sourceMappingURL=chunk-W6CIMB7R.js.map
