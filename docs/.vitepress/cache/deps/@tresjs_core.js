import {
  createEventHook,
  toValue,
  unrefElement,
  useDevicePixelRatio,
  useElementSize,
  useEventListener,
  useRafFn,
  useWindowSize
} from "./chunk-COVIEUS2.js";
import {
  ACESFilmicToneMapping,
  BufferAttribute,
  Clock,
  Color,
  LinearSRGBColorSpace,
  LoadingManager,
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
} from "./chunk-BMVNX5DT.js";
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
} from "./chunk-JKV2V35Q.js";
import "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@tresjs+core@2.1.1_three@0.152.2_vue@3.3.4/node_modules/@tresjs/core/dist/tres.js
var oe = (e) => typeof e == "function";
var Qe = (e) => typeof e == "string";
var Ce = (e) => !!e && e.constructor === Array;
var Me = ref({});
var xe = (e) => void Object.assign(Me.value, e);
var p = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
function Ze() {
  const e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, o = Math.random() * 4294967295 | 0, a = Math.random() * 4294967295 | 0;
  return (p[e & 255] + p[e >> 8 & 255] + p[e >> 16 & 255] + p[e >> 24 & 255] + "-" + p[t & 255] + p[t >> 8 & 255] + "-" + p[t >> 16 & 15 | 64] + p[t >> 24 & 255] + "-" + p[o & 63 | 128] + p[o >> 8 & 255] + "-" + p[o >> 16 & 255] + p[o >> 24 & 255] + p[a & 255] + p[a >> 8 & 255] + p[a >> 16 & 255] + p[a >> 24 & 255]).toLowerCase();
}
var X = Symbol();
function et() {
  const e = shallowReactive({
    uuid: Ze(),
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
  return provide(X, a), a;
}
var B = () => inject(X, {
  state: shallowReactive({
    camera: void 0,
    cameras: [],
    scene: void 0,
    renderer: void 0
  })
});
var tt = ((e) => (e.Perspective = "Perspective", e.Orthographic = "Orthographic", e))(tt || {});
var at = 45;
var _;
function Re() {
  const { state: e, setState: t, aspectRatio: o } = B();
  function a(s = "Perspective", f) {
    var l, d, v;
    if (s === "Perspective") {
      const { near: C, far: M, fov: w } = f || {
        near: 0.1,
        far: 1e3,
        fov: at
      };
      _ = new PerspectiveCamera(w, ((l = e.aspectRatio) == null ? void 0 : l.value) || window.innerWidth / window.innerHeight, C, M), (d = e.cameras) == null || d.push(_);
    } else {
      const { left: C, right: M, top: w, bottom: P, near: h2, far: x } = f || {
        left: -100,
        right: 100,
        top: 100,
        bottom: -100,
        near: 0.1,
        far: 1e3
      };
      _ = new OrthographicCamera(C, M, w, P, h2, x), (v = e.cameras) == null || v.push(_);
    }
    return e.camera = _, t("camera", e.camera), _;
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
var Ee = createEventHook();
var Pe = createEventHook();
var Q = createEventHook();
var I = new Clock();
var W = 0;
var Y = 0;
var { pause: nt, resume: rt, isActive: ot } = useRafFn(
  () => {
    Ee.trigger({ delta: W, elapsed: Y, clock: I }), Pe.trigger({ delta: W, elapsed: Y, clock: I }), Q.trigger({ delta: W, elapsed: Y, clock: I });
  },
  { immediate: false }
);
Q.on(() => {
  W = I.getDelta(), Y = I.getElapsedTime();
});
function Se() {
  return {
    onBeforeLoop: Ee.on,
    onLoop: Pe.on,
    onAfterLoop: Q.on,
    pause: nt,
    resume: rt,
    isActive: ot
  };
}
function it(e) {
  return e instanceof Color ? e : Array.isArray(e) ? new Color(...e) : new Color(e);
}
var q = {
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
var Te = (e, t) => {
  for (const o of Object.keys(t))
    t[o] instanceof Object && Object.assign(t[o], Te(e[o], t[o]));
  return Object.assign(e || {}, t), e;
};
var st = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
var ct = ft(st);
function V(e) {
  return e.replace(/-([a-z])/g, (t, o) => o.toUpperCase());
}
function ft(e, t) {
  const o = /* @__PURE__ */ Object.create(null), a = e.split(",");
  for (let n = 0; n < a.length; n++)
    o[a[n]] = true;
  return t ? (n) => !!o[n.toLowerCase()] : (n) => !!o[n];
}
var xt = true;
var ie = "[TresJS ▲ ■ ●] ";
function F() {
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
function ut(e) {
  var te, ae;
  const t = shallowRef(), o = ref(false), {
    alpha: a = true,
    antialias: n = true,
    depth: r,
    logarithmicDepthBuffer: c,
    failIfMajorPerformanceCaveat: i,
    precision: s,
    premultipliedAlpha: f,
    stencil: l,
    shadows: d = false,
    shadowMapType: v = PCFShadowMap,
    useLegacyLights: C = false,
    outputColorSpace: M = LinearSRGBColorSpace,
    toneMapping: w = NoToneMapping,
    toneMappingExposure: P = 1,
    context: h2 = void 0,
    powerPreference: x = "default",
    preserveDrawingBuffer: $ = false,
    clearColor: y,
    windowSize: m = false,
    preset: R = void 0
  } = toRefs(e), { state: g, setState: b } = B(), { width: O, height: k } = toValue(m) == true || toValue(m) === "" || toValue(m) === "true" ? useWindowSize() : useElementSize(g.container), { logError: S, logWarning: z } = F(), { pixelRatio: j } = useDevicePixelRatio(), { pause: T, resume: G } = Se(), L = computed(() => O.value / k.value);
  !toValue(m) && ((ae = (te = g.container) == null ? void 0 : te.value) == null ? void 0 : ae.offsetHeight) === 0 && z(`Oops... Seems like your canvas height is currently 0px, by default it takes the height of it's parent, so make sure it has some height with CSS.
You could set windowSize=true to force the canvas to be the size of the window.`);
  const Z = () => {
    t.value && (t.value.setSize(O.value, k.value), t.value.setPixelRatio(Math.min(j.value, 2)));
  }, ee = () => {
    if (!t.value)
      return;
    const A = toValue(R);
    if (A) {
      A in q || S("Renderer Preset must be one of these: " + Object.keys(q).join(", ")), Te(t.value, q[A]);
      return;
    }
    t.value.shadowMap.enabled = toValue(d), t.value.shadowMap.type = toValue(v), t.value.toneMapping = toValue(w) || NoToneMapping, t.value.toneMappingExposure = toValue(P), t.value.outputColorSpace = toValue(M) || LinearSRGBColorSpace, y != null && y.value && t.value.setClearColor(it(toValue(y))), t.value.useLegacyLights = toValue(C);
  }, Le = () => {
    const A = unrefElement(g.canvas);
    A && (t.value = new WebGLRenderer({
      canvas: A,
      alpha: toValue(a),
      antialias: toValue(n),
      context: toValue(h2),
      depth: toValue(r),
      failIfMajorPerformanceCaveat: toValue(i),
      logarithmicDepthBuffer: toValue(c),
      powerPreference: toValue(x),
      precision: toValue(s),
      stencil: toValue(l),
      preserveDrawingBuffer: toValue($),
      premultipliedAlpha: toValue(f)
    }), b("renderer", t.value), b("clock", new Clock()), b("aspectRatio", L), ee(), Z(), G(), o.value = true);
  }, Ae = () => {
    t.value && (t.value.dispose(), t.value = void 0, o.value = false, T());
  };
  return watch([L, j], Z), watch(
    [d, v, M, C, w, P, y],
    ee
  ), watch(
    () => [g.canvas, g.container],
    () => {
      unrefElement(g.canvas) && unrefElement(g.container) && Le();
    },
    { immediate: true, deep: true }
  ), {
    renderer: t,
    isReady: o,
    dispose: Ae,
    aspectRatio: L
  };
}
function lt(e) {
  const t = { nodes: {}, materials: {} };
  return e && e.traverse((o) => {
    o.name && (t.nodes[o.name] = o), o.material && !t.materials[o.material.name] && (t.materials[o.material.name] = o.material);
  }), t;
}
async function Rt(e, t, o, a, n) {
  const { logError: r } = F(), c = new e();
  n && n(c), o && o(c);
  const s = (Array.isArray(t) ? t : [t]).map(
    (f) => new Promise((l, d) => {
      c.load(
        f,
        (v) => {
          v.scene && Object.assign(v, lt(v.scene)), l(v);
        },
        a,
        (v) => d(r("[useLoader] - Failed to load resource", v))
      );
    })
  );
  return Ce(t) ? await Promise.all(s) : await s[0];
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
  if (Ce(e)) {
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
      alphaMap: l,
      matcap: d
    } = e;
    return {
      map: n ? await a(n) : null,
      displacementMap: r ? await a(r) : null,
      normalMap: c ? await a(c) : null,
      roughnessMap: i ? await a(i) : null,
      metalnessMap: s ? await a(s) : null,
      aoMap: f ? await a(f) : null,
      alphaMap: l ? await a(l) : null,
      matcap: d ? await a(d) : null
    };
  }
}
function dt() {
  var c;
  const e = shallowRef(new Raycaster()), t = ref(new Vector2()), o = ref(null), { setState: a, state: n } = B();
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
function Pt() {
  const { logWarning: e } = F();
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
var { logError: fe } = F();
var ue = true;
var vt = {
  createElement(e, t, o, a) {
    var s, f;
    if (a || (a = {}), a.args || (a.args = []), e === "template" || ct(e))
      return null;
    let n = e.replace("Tres", ""), r;
    if (e === "primitive") {
      (a == null ? void 0 : a.object) === void 0 && fe("Tres primitives need a prop 'object'");
      const l = a.object;
      n = l.type, r = Object.assign(l, { type: n, attach: a.attach, primitive: true });
    } else {
      const l = Me.value[n];
      l || fe(`${n} is not defined on the THREE namespace. Use extend to add it to the catalog.`), r = new l(...a.args);
    }
    if (r.isCamera && ue) {
      a != null && a.position || r.position.set(3, 3, 3), a != null && a.lookAt || r.lookAt(0, 0, 0);
      const { setFirstCamera: l } = Re();
      l(r), ue = false;
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
        i = f.reduce((l, d) => l[V(d)], n), r = f.pop(), c = r.toLowerCase(), i != null && i.set || (n = f.reduce((l, d) => l[V(d)], n));
      }
      if (pt(r)) {
        const f = r;
        e.events[f] = a;
      }
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
xe(three_module_exports);
var { logWarning: le } = F();
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
    e.physicallyCorrectLights === true && le("physicallyCorrectLights is deprecated, useLegacyLights is now false by default");
    const a = ref(), n = ref(), r = new Scene(), { setState: c } = B();
    c("scene", r), c("canvas", n), c("container", a);
    const i = ref(), s = t && t.default && t.default();
    s && (s == null ? void 0 : s.length) > 0 && (i.value = s.some((h2) => Qe(h2.type) && h2.type.includes("Camera")) || e.camera, i.value || le("No camera found in the scene, please add one!"));
    const { onLoop: f, resume: l } = Se();
    onMounted(() => {
      M();
    }), onUnmounted(() => {
      c("renderer", null);
    });
    const { activeCamera: d, pushCamera: v, clearCameras: C } = Re();
    function M() {
      const { renderer: h2 } = ut(e);
      e.camera && v(e.camera);
      const { raycaster: x, pointer: $ } = dt();
      let y = null, m = null;
      watchEffect(() => {
        d.value && x.value.setFromCamera($.value, d.value);
      }), f(() => {
        var R, g, b, O, k, S, z, j, T, G;
        if (d.value && e.disableRender !== true && ((R = h2.value) == null || R.render(r, d.value)), x.value) {
          const L = x.value.intersectObjects(r.children);
          L.length > 0 ? (m = L[0], y === null && ((O = (b = (g = m.object) == null ? void 0 : g.events) == null ? void 0 : b.onPointerEnter) == null || O.call(b, m)), (z = (S = (k = m.object) == null ? void 0 : k.events) == null ? void 0 : S.onPointerMove) == null || z.call(S, m)) : y !== null && ((G = (T = (j = m == null ? void 0 : m.object) == null ? void 0 : j.events) == null ? void 0 : T.onPointerLeave) == null || G.call(T, y), m = null), y = m;
        }
      }), useEventListener(n.value, "click", () => {
        var R, g, b;
        m !== null && ((b = (g = (R = m.object) == null ? void 0 : R.events) == null ? void 0 : g.onClick) == null || b.call(g, m));
      });
    }
    let w;
    function P() {
      w = ht(t);
      const h2 = B();
      w.provide("useTres", h2), w.provide(X, h2), w.provide("extend", xe), w.mount(r);
    }
    return P(), o({
      scene: r
    }), watch(
      () => e.camera,
      (h2) => {
        h2 && (C(), v(h2));
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
    const a = et();
    return o(a), () => h(wt, e, t);
  }
});
var St = {
  install(e) {
    e.component("TresCanvas", bt);
  }
};
export {
  tt as CameraType,
  X as TRES_CONTEXT_KEY,
  bt as TresCanvas,
  Me as catalogue,
  St as default,
  xe as extend,
  xt as isProd,
  lt as trasverseObjects,
  Re as useCamera,
  Rt as useLoader,
  F as useLogger,
  dt as useRaycaster,
  Se as useRenderLoop,
  ut as useRenderer,
  Pt as useSeek,
  Et as useTexture,
  B as useTres,
  et as useTresProvider
};
//# sourceMappingURL=@tresjs_core.js.map
