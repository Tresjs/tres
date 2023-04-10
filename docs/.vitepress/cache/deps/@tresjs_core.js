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
} from "./chunk-WRT3FA2T.js";
import {
  createEventHook,
  isFunction,
  resolveUnref,
  unrefElement,
  useDevicePixelRatio,
  useElementSize,
  useEventListener,
  useRafFn,
  useWindowSize
} from "./chunk-QHXUETYZ.js";
import {
  computed,
  createRenderer,
  defineComponent,
  h,
  inject,
  onMounted,
  onUnmounted,
  provide,
  ref,
  shallowReactive,
  shallowRef,
  toRef,
  toRefs,
  watch,
  watchEffect
} from "./chunk-LZPJ5JBW.js";
import "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@tresjs+core@2.0.0-beta.2_three@0.150.1+vue@3.2.47/node_modules/@tresjs/core/dist/tres.js
var N = ref({ uuid: MathUtils.generateUUID() });
var ve = (e) => void Object.assign(N.value, e);
var Xe = ((e) => (e.Perspective = "Perspective", e.Orthographic = "Orthographic", e))(Xe || {});
var Je = 45;
var L;
function q() {
  const { state: e, setState: t, aspectRatio: r } = k();
  function a(o = "Perspective", c) {
    var l, v, d;
    if (o === "Perspective") {
      const { near: f, far: M, fov: h2 } = c || {
        near: 0.1,
        far: 1e3,
        fov: Je
      };
      L = new PerspectiveCamera(h2, ((l = e.aspectRatio) == null ? void 0 : l.value) || window.innerWidth / window.innerHeight, f, M), (v = e.cameras) == null || v.push(L);
    } else {
      const { left: f, right: M, top: h2, bottom: C, near: g, far: p } = c || {
        left: -100,
        right: 100,
        top: 100,
        bottom: -100,
        near: 0.1,
        far: 1e3
      };
      L = new OrthographicCamera(f, M, h2, C, g, p), (d = e.cameras) == null || d.push(L);
    }
    return e.camera = L, t("camera", e.camera), L;
  }
  function n() {
    var o;
    e.camera instanceof PerspectiveCamera && e.aspectRatio && (e.camera.aspect = e.aspectRatio.value), (o = e.camera) == null || o.updateProjectionMatrix();
  }
  function i(o) {
    var c;
    (c = e.cameras) == null || c.push(o), o instanceof PerspectiveCamera && e.aspectRatio && (o.aspect = e.aspectRatio.value), o.updateProjectionMatrix(), t("camera", o);
  }
  function s() {
    e.cameras = [];
  }
  return watchEffect(() => {
    r != null && r.value && n();
  }), {
    activeCamera: toRef(e, "camera"),
    createCamera: a,
    updateCamera: n,
    pushCamera: i,
    clearCameras: s
  };
}
var he = createEventHook();
var ge = createEventHook();
var Y = createEventHook();
var R = new Clock();
var D = 0;
var W = 0;
var { pause: Qe, resume: Ze, isActive: et } = useRafFn(
  () => {
    he.trigger({ delta: D, elapsed: W, clock: R }), ge.trigger({ delta: D, elapsed: W, clock: R }), Y.trigger({ delta: D, elapsed: W, clock: R });
  },
  { immediate: false }
);
Y.on(() => {
  D = R.getDelta(), W = R.getElapsedTime();
});
function we() {
  return {
    onBeforeLoop: he.on,
    onLoop: ge.on,
    onAfterLoop: Y.on,
    pause: Qe,
    resume: Ze,
    isActive: et
  };
}
function tt(e) {
  return e instanceof Color ? e : Array.isArray(e) ? new Color(...e) : new Color(e);
}
var G = {
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
var be = (e, t) => {
  for (const r of Object.keys(t))
    t[r] instanceof Object && Object.assign(t[r], be(e[r], t[r]));
  return Object.assign(e || {}, t), e;
};
var nt = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
var at = rt(nt);
function _(e) {
  return e.replace(/-([a-z])/g, (t, r) => r.toUpperCase());
}
function rt(e, t) {
  const r = /* @__PURE__ */ Object.create(null), a = e.split(",");
  for (let n = 0; n < a.length; n++)
    r[a[n]] = true;
  return t ? (n) => !!r[n.toLowerCase()] : (n) => !!r[n];
}
function ot(e) {
  var ee, te;
  const t = shallowRef(), r = ref(false), {
    alpha: a = true,
    antialias: n = true,
    depth: i,
    logarithmicDepthBuffer: s,
    failIfMajorPerformanceCaveat: o,
    precision: c,
    premultipliedAlpha: l,
    stencil: v,
    shadows: d = false,
    shadowMapType: f = PCFShadowMap,
    physicallyCorrectLights: M = false,
    useLegacyLights: h2 = false,
    outputEncoding: C = LinearEncoding,
    toneMapping: g = NoToneMapping,
    toneMappingExposure: p = 1,
    context: b = void 0,
    powerPreference: y = "default",
    preserveDrawingBuffer: O = false,
    clearColor: w,
    windowSize: T = false,
    preset: j = void 0
  } = toRefs(e), { state: x, setState: F } = k(), { width: K, height: X } = resolveUnref(T) ? useWindowSize() : useElementSize(x.container), { logError: Me, logWarning: Ce } = A(), { pixelRatio: J } = useDevicePixelRatio(), { pause: Ee, resume: Le } = we(), I = computed(() => K.value / X.value);
  !resolveUnref(T) && ((te = (ee = x.container) == null ? void 0 : ee.value) == null ? void 0 : te.offsetHeight) === 0 && Ce(`Oops... Seems like your canvas height is currently 0px, by default it takes the height of it's parent, so make sure it has some height with CSS.
You could set windowSize=true to force the canvas to be the size of the window.`);
  const Q = () => {
    t.value && (t.value.setSize(K.value, X.value), t.value.setPixelRatio(Math.min(J.value, 2)));
  }, Z = () => {
    if (!t.value)
      return;
    const E = resolveUnref(j);
    if (E) {
      E in G || Me("Renderer Preset must be one of these: " + Object.keys(G).join(", ")), be(t.value, G[E]);
      return;
    }
    t.value.shadowMap.enabled = resolveUnref(d), t.value.shadowMap.type = resolveUnref(f), t.value.toneMapping = resolveUnref(g) || NoToneMapping, t.value.toneMappingExposure = resolveUnref(p), t.value.outputEncoding = resolveUnref(C) || LinearEncoding, w != null && w.value && t.value.setClearColor(tt(resolveUnref(w))), t.value.useLegacyLights = resolveUnref(h2);
  }, Se = () => {
    const E = unrefElement(x.canvas);
    E && (t.value = new WebGLRenderer({
      canvas: E,
      alpha: resolveUnref(a),
      antialias: resolveUnref(n),
      context: resolveUnref(b),
      depth: resolveUnref(i),
      failIfMajorPerformanceCaveat: resolveUnref(o),
      logarithmicDepthBuffer: resolveUnref(s),
      powerPreference: resolveUnref(y),
      precision: resolveUnref(c),
      stencil: resolveUnref(v),
      preserveDrawingBuffer: resolveUnref(O),
      premultipliedAlpha: resolveUnref(l)
    }), F("renderer", t.value), F("clock", new Clock()), F("aspectRatio", I), Z(), Q(), Le(), r.value = true);
  }, Te = () => {
    t.value && (t.value.dispose(), t.value = void 0, r.value = false, Ee());
  };
  return watch([I, J], Q), watch(
    [d, f, C, h2, g, p, w],
    Z
  ), watch(
    () => [x.canvas, x.container],
    () => {
      unrefElement(x.canvas) && unrefElement(x.container) && Se();
    },
    { immediate: true, deep: true }
  ), {
    renderer: t,
    isReady: r,
    dispose: Te,
    aspectRatio: I
  };
}
var ye = (e) => !!e && e.constructor === Array;
function it(e) {
  const t = { nodes: {}, materials: {} };
  return e && e.traverse((r) => {
    r.name && (t.nodes[r.name] = r), r.material && !t.materials[r.material.name] && (t.materials[r.material.name] = r.material);
  }), t;
}
async function Mt(e, t, r, a, n) {
  const { logError: i } = A(), s = new e();
  n && n(s), r && r(s);
  const c = (Array.isArray(t) ? t : [t]).map(
    (l) => new Promise((v, d) => {
      s.load(
        l,
        (f) => {
          f.scene && Object.assign(f, it(f.scene)), v(f);
        },
        a,
        (f) => d(i("[useLoader] - Failed to load resource", f))
      );
    })
  );
  return ye(t) ? await Promise.all(c) : await c[0];
}
async function Ct(e) {
  const t = new LoadingManager(), r = new TextureLoader(t), a = (n) => new Promise((i, s) => {
    r.load(
      n,
      (o) => i(o),
      () => null,
      () => {
        s(new Error("[useTextures] - Failed to load texture"));
      }
    );
  });
  if (ye(e)) {
    const n = await Promise.all(e.map((i) => a(i)));
    return e.length > 1 ? n : n[0];
  } else {
    const {
      map: n,
      displacementMap: i,
      normalMap: s,
      roughnessMap: o,
      metalnessMap: c,
      aoMap: l,
      alphaMap: v,
      matcap: d
    } = e;
    return {
      map: n ? await a(n) : null,
      displacementMap: i ? await a(i) : null,
      normalMap: s ? await a(s) : null,
      roughnessMap: o ? await a(o) : null,
      metalnessMap: c ? await a(c) : null,
      aoMap: l ? await a(l) : null,
      alphaMap: v ? await a(v) : null,
      matcap: d ? await a(d) : null
    };
  }
}
var m = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
function st() {
  const e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, r = Math.random() * 4294967295 | 0, a = Math.random() * 4294967295 | 0;
  return (m[e & 255] + m[e >> 8 & 255] + m[e >> 16 & 255] + m[e >> 24 & 255] + "-" + m[t & 255] + m[t >> 8 & 255] + "-" + m[t >> 16 & 15 | 64] + m[t >> 24 & 255] + "-" + m[r & 63 | 128] + m[r >> 8 & 255] + "-" + m[r >> 16 & 255] + m[r >> 24 & 255] + m[a & 255] + m[a >> 8 & 255] + m[a >> 16 & 255] + m[a >> 24 & 255]).toLowerCase();
}
var xe = Symbol();
function ct() {
  const e = shallowReactive({
    uuid: st(),
    camera: void 0,
    cameras: [],
    scene: void 0,
    renderer: void 0,
    aspectRatio: computed(() => window.innerWidth / window.innerHeight)
  });
  function t(n) {
    return e[n];
  }
  function r(n, i) {
    e[n] = i;
  }
  const a = {
    state: e,
    ...toRefs(e),
    getState: t,
    setState: r
  };
  return provide(xe, a), a;
}
var k = () => inject(xe, {
  state: shallowReactive({
    camera: void 0,
    cameras: [],
    scene: void 0,
    renderer: void 0
  })
});
function ut() {
  var s;
  const e = shallowRef(new Raycaster()), t = ref(new Vector2()), r = ref(null), { setState: a, state: n } = k();
  a("raycaster", e.value), a("pointer", t), a("currentInstance", r);
  function i(o) {
    t.value.x = o.clientX / window.innerWidth * 2 - 1, t.value.y = -(o.clientY / window.innerHeight) * 2 + 1;
  }
  return (s = n == null ? void 0 : n.renderer) == null || s.domElement.addEventListener("pointermove", i), onUnmounted(() => {
    var o;
    (o = n == null ? void 0 : n.renderer) == null || o.domElement.removeEventListener("pointermove", i);
  }), {
    raycaster: e,
    pointer: t
  };
}
var Et = true;
var oe = "[TresJS ▲ ■ ●] ";
function A() {
  function e(a, n) {
    console.error(`${oe} ${a}`, n || "");
  }
  function t(a) {
    console.warn(`${oe} ${a}`);
  }
  function r(a, n) {
  }
  return {
    logError: e,
    logWarning: t,
    logMessage: r
  };
}
function Lt() {
  const { logWarning: e } = A();
  function t(a, n, i) {
    let s = null;
    return a.traverse((o) => {
      o[n] === i && (s = o);
    }), s || e(`Child with ${n} '${i}' not found.`), s;
  }
  function r(a, n) {
    return t(a, "name", n);
  }
  return {
    seek: t,
    seekByName: r
  };
}
var { logWarning: lt } = A();
var ft = /^on[^a-z]/;
var dt = (e) => ft.test(e);
var z = null;
var pt = {
  createElement(e, t, r, a) {
    if (e === "template" || at(e))
      return null;
    let n;
    if (a === null && (a = {}), a != null && a.args ? n = new N.value[e.replace("Tres", "")](...a.args) : n = new N.value[e.replace("Tres", "")](), n.isCamera) {
      (!(a != null && a.position) || a != null && a.position.every((s) => s == 0)) && lt(
        // eslint-disable-next-line max-len
        "Camera is positioned at the center of the scene [0,0,0], if this is not intentional try setting a position if your scene seems empty 🤗"
      );
      const { pushCamera: i } = q();
      i(n);
    }
    return (a == null ? void 0 : a.attach) === void 0 && (n.isMaterial ? n.attach = "material" : n.isBufferGeometry && (n.attach = "geometry")), n.events = {}, n;
  },
  insert(e, t, r) {
    if (z === null && t.isScene && (z = t), t === null && (t = z), t != null && t.isObject3D && (e != null && e.isObject3D)) {
      const a = r ? t.children.indexOf(r) : 0;
      e.parent = t, t.children.splice(a, 0, e), e.dispatchEvent({ type: "added" });
    } else
      typeof (e == null ? void 0 : e.attach) == "string" && (e.__previousAttach = e[t == null ? void 0 : t.attach], t && (t[e.attach] = e));
  },
  remove(e) {
    if (!e)
      return;
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  patchProp(e, t, r, a) {
    if (e) {
      let n = e, i = t;
      const s = _(i);
      let o = n == null ? void 0 : n[s];
      if (e.parent || (e.parent = z), n.type === "BufferGeometry") {
        n.setAttribute(
          _(i),
          new BufferAttribute(...a)
        );
        return;
      }
      if (i.includes("-") && o === void 0) {
        const l = i.split("-");
        o = l.reduce((v, d) => v[_(d)], n), i = l.pop(), o != null && o.set || (n = l.reduce((v, d) => v[_(d)], n));
      }
      dt(i) && (e.events[i] = a);
      let c = a;
      if (c === "" && (c = true), isFunction(o)) {
        Array.isArray(c) ? e[s](...c) : e[s](c);
        return;
      }
      !(o != null && o.set) && !isFunction(o) ? n[s] = c : o.constructor === c.constructor && (o != null && o.copy) ? o == null || o.copy(c) : Array.isArray(c) ? o.set(...c) : !o.isColor && o.setScalar ? o.setScalar(c) : o.set(c);
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
var { createApp: mt } = createRenderer(pt);
var vt = (e) => {
  const t = mt(r);
  function r() {
    return e && e.default ? e.default() : [];
  }
  return t;
};
ve(three_module_exports);
var { logWarning: ht } = A();
var gt = defineComponent({
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
    "preset"
  ],
  setup(e, { slots: t, expose: r }) {
    e.physicallyCorrectLights === true && ht("physicallyCorrectLights is deprecated, useLegacyLights is now false by default");
    const a = ref(), n = ref(), i = new Scene(), { setState: s } = k();
    s("scene", i), s("canvas", n), s("container", a);
    const { pushCamera: o } = q();
    o(new PerspectiveCamera()), onMounted(() => {
      c();
    }), onUnmounted(() => {
      s("renderer", null);
    });
    function c() {
      const { renderer: d } = ot(e), { activeCamera: f } = q(), { onLoop: M } = we(), { raycaster: h2, pointer: C } = ut();
      let g = null, p = null;
      watchEffect(() => {
        f.value && h2.value.setFromCamera(C.value, f.value);
      }), M(() => {
        var b, y, O, w, T;
        if (f.value && ((b = d.value) == null || b.render(i, f.value)), h2.value) {
          const j = h2.value.intersectObjects(i.children);
          j.length > 0 ? (p = j[0], g === null && ((O = (y = p.object.events).onPointerEnter) == null || O.call(y, p))) : g !== null && ((T = p == null ? void 0 : (w = p.object.events).onPointerLeave) == null || T.call(w, g), p = null), g = p;
        }
      }), useEventListener(n.value, "click", () => {
        var b, y;
        p !== null && ((y = (b = p.object.events).onClick) == null || y.call(b, p));
      });
    }
    let l;
    function v() {
      l = vt(t), l.provide("useTres", k()), l.provide("extend", ve), l.mount(i);
    }
    return v(), r({
      scene: i
    }), () => h(
      h(
        "div",
        {
          ref: a,
          "data-scene": i.uuid,
          key: i.uuid,
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
                "data-scene": i.uuid,
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
var wt = defineComponent({
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
    const a = ct();
    return r(a), () => h(gt, e, t);
  }
});
var St = {
  install(e) {
    e.component("TresCanvas", wt);
  }
};
export {
  Xe as CameraType,
  wt as TresCanvas,
  N as catalogue,
  St as default,
  ve as extend,
  Et as isProd,
  it as trasverseObjects,
  q as useCamera,
  Mt as useLoader,
  A as useLogger,
  ut as useRaycaster,
  we as useRenderLoop,
  ot as useRenderer,
  Lt as useSeek,
  Ct as useTexture,
  k as useTres,
  ct as useTresProvider
};
//# sourceMappingURL=@tresjs_core.js.map
