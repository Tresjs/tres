import "./chunk-JC4IRQUL.js";

// node_modules/.pnpm/@alvarosabu+utils@2.3.0/node_modules/@alvarosabu/utils/dist/as-utils.js
var l = typeof window < "u";
var f = (n) => typeof n < "u";
var p = (n) => n != null;
var w = (n) => typeof n == "boolean";
var g = (n) => typeof n == "function";
var d = (n) => typeof n == "number";
var C = (n) => typeof n == "string";
var h = (n) => typeof window < "u" && toString.call(n) === "[object Window]";
var r = (n) => !!n && n.constructor === Array;
var s = (n) => !!n && n.constructor === Object;
var S = (n) => !!n && n.constructor === Event;
var _ = (n) => !!n && n.constructor.name === "Promise";
var A = (n) => r(n) ? n.length <= 0 : s(n) ? Object.entries(n).length <= 0 : false;
var E = (n) => n.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
var c = (n) => {
  const t = {};
  return Object.keys(n).forEach((e) => {
    r(n[e]) ? t[e.replace(/(_\w)/g, (o) => o[1].toUpperCase())] = a(n[e]) : s(n[e]) ? t[e.replace(/(_\w)/g, (o) => o[1].toUpperCase())] = c(n[e]) : t[e.replace(/(_\w)/g, (o) => o[1].toUpperCase())] = n[e];
  }), t;
};
var i = (n) => {
  const t = {};
  return Object.keys(n).forEach((e) => {
    r(n[e]) ? t[e.replace(/([A-Z])/g, (o) => `_${o.toLowerCase()}`)] = n[e] = u(n[e]) : s(n[e]) ? t[e.replace(/([A-Z])/g, (o) => `_${o.toLowerCase()}`)] = n[e] = i(n[e]) : t[e.replace(/([A-Z])/g, (o) => `_${o.toLowerCase()}`)] = n[e];
  }), t;
};
var a = (n) => n.map((t) => r(t) ? a(t) : s(t) ? c(t) : t);
var u = (n) => n.map((t) => r(t) ? u(t) : s(t) ? i(t) : t);
function T(n, t, e) {
  return Math.min(e, Math.max(t, n));
}
function L(n) {
  return n != null;
}
function U(n) {
  return n !== null;
}
function $(n) {
  return n !== void 0;
}
function m(n) {
  return Boolean(n);
}
export {
  i as camelToSnake,
  T as clamp,
  p as hasValue,
  r as isArray,
  w as isBoolean,
  l as isBrowser,
  f as isDefined,
  A as isEmpty,
  S as isEvent,
  g as isFunction,
  d as isNumber,
  s as isObject,
  _ as isPromise,
  C as isString,
  m as isTruthy,
  h as isWindow,
  u as listCamelToSnake,
  a as listSnakeToCamel,
  U as noNull,
  L as notNullish,
  $ as notUndefined,
  E as slugify,
  c as snakeToCamel
};
//# sourceMappingURL=@alvarosabu_utils.js.map
