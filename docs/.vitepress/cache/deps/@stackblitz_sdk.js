// node_modules/.pnpm/@stackblitz+sdk@1.8.1/node_modules/@stackblitz/sdk/bundles/sdk.m.js
var e = ["angular-cli", "create-react-app", "html", "javascript", "node", "polymer", "typescript", "vue"];
var t = { clickToLoad: function(e2) {
  return r("ctl", e2);
}, devToolsHeight: function(e2) {
  return i("devtoolsheight", e2);
}, forceEmbedLayout: function(e2) {
  return r("embed", e2);
}, hideDevTools: function(e2) {
  return r("hidedevtools", e2);
}, hideExplorer: function(e2) {
  return r("hideExplorer", e2);
}, hideNavigation: function(e2) {
  return r("hideNavigation", e2);
}, showSidebar: function(e2) {
  return function(e3, t2) {
    return "boolean" == typeof t2 ? "showSidebar=" + (t2 ? "1" : "0") : "";
  }(0, e2);
}, openFile: function(e2) {
  return function(e3, t2) {
    return (Array.isArray(t2) ? t2 : [t2]).filter(function(e4) {
      return "string" == typeof e4 && "" !== e4.trim();
    }).map(function(e4) {
      return "file=" + encodeURIComponent(e4.trim());
    });
  }(0, e2).join("&");
}, terminalHeight: function(e2) {
  return i("terminalHeight", e2);
}, theme: function(e2) {
  return o("theme", ["light", "dark"], e2);
}, view: function(e2) {
  return o("view", ["preview", "editor"], e2);
} };
function n(e2) {
  void 0 === e2 && (e2 = {});
  var n2 = Object.entries(e2).map(function(e3) {
    var n3 = e3[0], r2 = e3[1];
    return null != r2 && t.hasOwnProperty(n3) ? t[n3](r2) : "";
  }).filter(Boolean);
  return n2.length ? "?" + n2.join("&") : "";
}
function r(e2, t2) {
  return true === t2 ? e2 + "=1" : "";
}
function i(e2, t2) {
  return "number" == typeof t2 && t2 >= 0 && t2 <= 100 ? e2 + "=" + Math.round(t2) : "";
}
function o(e2, t2, n2) {
  return "string" == typeof n2 && t2.includes(n2) ? e2 + "=" + n2 : "";
}
function a() {
  return Math.random().toString(36).slice(2, 6) + Math.random().toString(36).slice(2, 6);
}
function d(e2, t2) {
  return "" + u(t2) + e2 + n(t2);
}
function c(e2, t2) {
  var r2 = { forceEmbedLayout: true };
  return t2 && "object" == typeof t2 && Object.assign(r2, t2), "" + u(r2) + e2 + n(r2);
}
function u(e2) {
  return void 0 === e2 && (e2 = {}), "string" == typeof e2.origin ? e2.origin : "https://stackblitz.com";
}
function s(e2, t2, n2) {
  if (!t2 || !e2 || !e2.parentNode)
    throw new Error("Invalid Element");
  e2.id && (t2.id = e2.id), e2.className && (t2.className = e2.className), function(e3, t3) {
    t3 && "object" == typeof t3 && (Object.hasOwnProperty.call(t3, "height") && (e3.height = "" + t3.height), Object.hasOwnProperty.call(t3, "width") && (e3.width = "" + t3.width)), e3.height || (e3.height = "300"), e3.width || e3.setAttribute("style", "width:100%;");
  }(t2, n2), e2.parentNode.replaceChild(t2, e2);
}
function l(e2) {
  if ("string" == typeof e2) {
    var t2 = document.getElementById(e2);
    if (!t2)
      throw new Error("Could not find element with id '" + e2 + "'");
    return t2;
  }
  if (e2 instanceof HTMLElement)
    return e2;
  throw new Error("Invalid element: " + e2);
}
function p(e2) {
  return e2 && false === e2.newWindow ? "_self" : "_blank";
}
function f() {
  return f = Object.assign || function(e2) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var n2 = arguments[t2];
      for (var r2 in n2)
        Object.prototype.hasOwnProperty.call(n2, r2) && (e2[r2] = n2[r2]);
    }
    return e2;
  }, f.apply(this, arguments);
}
var h = function() {
  function e2(e3) {
    this.port = void 0, this.pending = {}, this.port = e3, this.port.onmessage = this.messageListener.bind(this);
  }
  var t2 = e2.prototype;
  return t2.request = function(e3) {
    var t3 = this, n2 = e3.type, r2 = e3.payload, i2 = a();
    return new Promise(function(e4, o2) {
      t3.pending[i2] = { resolve: e4, reject: o2 }, t3.port.postMessage({ type: n2, payload: f({}, r2, { __reqid: i2 }) });
    });
  }, t2.messageListener = function(e3) {
    var t3;
    if ("string" == typeof (null == (t3 = e3.data.payload) ? void 0 : t3.__reqid)) {
      var n2 = e3.data, r2 = n2.type, i2 = n2.payload, o2 = i2.__reqid, a2 = i2.__error;
      this.pending[o2] && (i2.__success ? this.pending[o2].resolve(function(e4) {
        var t4 = f({}, e4);
        return delete t4.__reqid, delete t4.__success, delete t4.__error, Object.keys(t4).length ? t4 : null;
      }(i2)) : this.pending[o2].reject(a2 ? r2 + ": " + a2 : r2), delete this.pending[o2]);
    }
  }, e2;
}();
var m = function() {
  function e2(e3, t3) {
    var n2 = this;
    this._rdc = void 0, this.editor = { openFile: function(e4) {
      return n2._rdc.request({ type: "SDK_OPEN_FILE", payload: { path: e4 } });
    }, setCurrentFile: function(e4) {
      return n2._rdc.request({ type: "SDK_SET_CURRENT_FILE", payload: { path: e4 } });
    }, setTheme: function(e4) {
      return n2._rdc.request({ type: "SDK_SET_UI_THEME", payload: { theme: e4 } });
    }, setView: function(e4) {
      return n2._rdc.request({ type: "SDK_SET_UI_VIEW", payload: { view: e4 } });
    }, showSidebar: function(e4) {
      return void 0 === e4 && (e4 = true), n2._rdc.request({ type: "SDK_TOGGLE_SIDEBAR", payload: { visible: e4 } });
    } }, this.preview = { origin: "", getUrl: function() {
      return n2._rdc.request({ type: "SDK_GET_PREVIEW_URL", payload: {} }).then(function(e4) {
        var t4;
        return null != (t4 = null == e4 ? void 0 : e4.url) ? t4 : null;
      });
    }, setUrl: function(e4) {
      if (void 0 === e4 && (e4 = "/"), "string" != typeof e4 || !e4.startsWith("/"))
        throw new Error("Invalid argument: expected a path starting with '/', got '" + e4 + "'");
      return n2._rdc.request({ type: "SDK_SET_PREVIEW_URL", payload: { path: e4 } });
    } }, this._rdc = new h(e3), Object.defineProperty(this.preview, "origin", { value: "string" == typeof t3.previewOrigin ? t3.previewOrigin : null, writable: false });
  }
  var t2 = e2.prototype;
  return t2.applyFsDiff = function(e3) {
    var t3 = function(e4) {
      return null !== e4 && "object" == typeof e4;
    };
    if (!t3(e3) || !t3(e3.create))
      throw new Error("Invalid diff object: expected diff.create to be an object.");
    if (!Array.isArray(e3.destroy))
      throw new Error("Invalid diff object: expected diff.create to be an array.");
    return this._rdc.request({ type: "SDK_APPLY_FS_DIFF", payload: e3 });
  }, t2.getDependencies = function() {
    return this._rdc.request({ type: "SDK_GET_DEPS_SNAPSHOT", payload: {} });
  }, t2.getFsSnapshot = function() {
    return this._rdc.request({ type: "SDK_GET_FS_SNAPSHOT", payload: {} });
  }, e2;
}();
var v = [];
var y = function(e2) {
  var t2 = this;
  this.element = void 0, this.id = void 0, this.pending = void 0, this.vm = void 0, this.id = a(), this.element = e2, this.pending = new Promise(function(e3, n2) {
    var r2 = function(n3) {
      var r3 = n3.data;
      "SDK_INIT_SUCCESS" === (null == r3 ? void 0 : r3.action) && r3.id === t2.id && (t2.vm = new m(n3.ports[0], r3.payload), e3(t2.vm), o2());
    }, i2 = function() {
      var e4;
      null == (e4 = t2.element.contentWindow) || e4.postMessage({ action: "SDK_INIT", id: t2.id }, "*");
    };
    function o2() {
      window.clearInterval(d2), window.removeEventListener("message", r2);
    }
    window.addEventListener("message", r2), i2();
    var a2 = 0, d2 = window.setInterval(function() {
      if (t2.vm)
        o2();
      else {
        if (a2 >= 20)
          return o2(), n2("Timeout: Unable to establish a connection with the StackBlitz VM"), void v.forEach(function(e4, n3) {
            e4.id === t2.id && v.splice(n3, 1);
          });
        a2++, i2();
      }
    }, 500);
  }), v.push(this);
};
function g(e2, t2) {
  var n2 = document.createElement("input");
  return n2.type = "hidden", n2.name = e2, n2.value = t2, n2;
}
function w(t2) {
  if (!e.includes(t2.template)) {
    var n2 = e.map(function(e2) {
      return "'" + e2 + "'";
    }).join(", ");
    console.warn("Unsupported project.template: must be one of " + n2);
  }
  var r2 = "node" === t2.template, i2 = document.createElement("form");
  return i2.method = "POST", i2.setAttribute("style", "display:none!important;"), i2.appendChild(g("project[title]", t2.title)), i2.appendChild(g("project[description]", t2.description)), i2.appendChild(g("project[template]", t2.template)), t2.dependencies && (r2 ? console.warn("Invalid project.dependencies: dependencies must be provided as a 'package.json' file when using the 'node' template.") : i2.appendChild(g("project[dependencies]", JSON.stringify(t2.dependencies)))), t2.settings && i2.appendChild(g("project[settings]", JSON.stringify(t2.settings))), Object.keys(t2.files).forEach(function(e2) {
    "string" == typeof t2.files[e2] && i2.appendChild(g("project[files][" + e2 + "]", t2.files[e2]));
  }), i2;
}
function _(e2) {
  var t2, n2, r2, i2;
  return null != e2 && e2.contentWindow ? (null != (i2 = (n2 = e2) instanceof Element ? "element" : "id", t2 = null != (r2 = v.find(function(e3) {
    return e3[i2] === n2;
  })) ? r2 : null) ? t2 : new y(e2)).pending : Promise.reject("Provided element is not an iframe.");
}
var b = { connect: _, embedGithubProject: function(e2, t2, n2) {
  var r2 = l(e2), i2 = document.createElement("iframe");
  return i2.src = c("/github/" + t2, n2), s(r2, i2, n2), _(i2);
}, embedProject: function(e2, t2, n2) {
  var r2, i2 = l(e2), o2 = function(e3, t3) {
    var n3 = w(e3);
    return n3.action = c("/run", t3), n3.id = "sb", "<html><head><title></title></head><body>" + n3.outerHTML + "<script>document.getElementById('" + n3.id + "').submit();<\/script></body></html>";
  }(t2, n2), a2 = document.createElement("iframe");
  return s(i2, a2, n2), null == (r2 = a2.contentDocument) || r2.write(o2), _(a2);
}, embedProjectId: function(e2, t2, n2) {
  var r2 = l(e2), i2 = document.createElement("iframe");
  return i2.src = c("/edit/" + t2, n2), s(r2, i2, n2), _(i2);
}, openGithubProject: function(e2, t2) {
  var n2 = d("/github/" + e2, t2), r2 = p(t2);
  window.open(n2, r2);
}, openProject: function(e2, t2) {
  !function(e3, t3) {
    var n2 = w(e3);
    n2.action = d("/run", t3), n2.target = p(t3), document.body.appendChild(n2), n2.submit(), document.body.removeChild(n2);
  }(e2, t2);
}, openProjectId: function(e2, t2) {
  var n2 = d("/edit/" + e2, t2), r2 = p(t2);
  window.open(n2, r2);
} };
export {
  b as default
};
//# sourceMappingURL=@stackblitz_sdk.js.map
