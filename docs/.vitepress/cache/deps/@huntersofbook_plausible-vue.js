import {
  inject
} from "./chunk-LZPJ5JBW.js";
import "./chunk-JC4IRQUL.js";

// node_modules/.pnpm/defu@6.1.2/node_modules/defu/dist/defu.mjs
function isObject(value) {
  return value !== null && typeof value === "object";
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isObject(value) && isObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
var defu = createDefu();
var defuFn = createDefu((object, key, currentValue) => {
  if (typeof object[key] !== "undefined" && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});
var defuArrayFn = createDefu((object, key, currentValue) => {
  if (Array.isArray(object[key]) && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

// node_modules/.pnpm/plausible-tracker@0.3.8/node_modules/plausible-tracker/build/module/lib/request.js
function sendEvent(eventName, data, options) {
  const isLocalhost = /^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*:)*?:?0*1$/.test(location.hostname) || location.protocol === "file:";
  if (!data.trackLocalhost && isLocalhost) {
    return console.warn("[Plausible] Ignoring event because website is running locally");
  }
  try {
    if (window.localStorage.plausible_ignore === "true") {
      return console.warn('[Plausible] Ignoring event because "plausible_ignore" is set to "true" in localStorage');
    }
  } catch (e) {
    null;
  }
  const payload = {
    n: eventName,
    u: data.url,
    d: data.domain,
    r: data.referrer,
    w: data.deviceWidth,
    h: data.hashMode ? 1 : 0,
    p: options && options.props ? JSON.stringify(options.props) : void 0
  };
  const req = new XMLHttpRequest();
  req.open("POST", `${data.apiHost}/api/event`, true);
  req.setRequestHeader("Content-Type", "text/plain");
  req.send(JSON.stringify(payload));
  req.onreadystatechange = () => {
    if (req.readyState !== 4)
      return;
    if (options && options.callback) {
      options.callback();
    }
  };
}

// node_modules/.pnpm/plausible-tracker@0.3.8/node_modules/plausible-tracker/build/module/lib/tracker.js
function Plausible(defaults) {
  const getConfig = () => ({
    hashMode: false,
    trackLocalhost: false,
    url: location.href,
    domain: location.hostname,
    referrer: document.referrer || null,
    deviceWidth: window.innerWidth,
    apiHost: "https://plausible.io",
    ...defaults
  });
  const trackEvent = (eventName, options, eventData) => {
    sendEvent(eventName, { ...getConfig(), ...eventData }, options);
  };
  const trackPageview = (eventData, options) => {
    trackEvent("pageview", options, eventData);
  };
  const enableAutoPageviews = () => {
    const page = () => trackPageview();
    const originalPushState = history.pushState;
    if (originalPushState) {
      history.pushState = function(data, title, url) {
        originalPushState.apply(this, [data, title, url]);
        page();
      };
      addEventListener("popstate", page);
    }
    if (defaults && defaults.hashMode) {
      addEventListener("hashchange", page);
    }
    trackPageview();
    return function cleanup() {
      if (originalPushState) {
        history.pushState = originalPushState;
        removeEventListener("popstate", page);
      }
      if (defaults && defaults.hashMode) {
        removeEventListener("hashchange", page);
      }
    };
  };
  const enableAutoOutboundTracking = (targetNode = document, observerInit = {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ["href"]
  }) => {
    function trackClick(event) {
      trackEvent("Outbound Link: Click", { props: { url: this.href } });
      if (!(typeof process !== "undefined" && process && false)) {
        setTimeout(() => {
          location.href = this.href;
        }, 150);
      }
      event.preventDefault();
    }
    const tracked = /* @__PURE__ */ new Set();
    function addNode(node) {
      if (node instanceof HTMLAnchorElement) {
        if (node.host !== location.host) {
          node.addEventListener("click", trackClick);
          tracked.add(node);
        }
      } else if ("querySelectorAll" in node) {
        node.querySelectorAll("a").forEach(addNode);
      }
    }
    function removeNode(node) {
      if (node instanceof HTMLAnchorElement) {
        node.removeEventListener("click", trackClick);
        tracked.delete(node);
      } else if ("querySelectorAll" in node) {
        node.querySelectorAll("a").forEach(removeNode);
      }
    }
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          removeNode(mutation.target);
          addNode(mutation.target);
        } else if (mutation.type === "childList") {
          mutation.addedNodes.forEach(addNode);
          mutation.removedNodes.forEach(removeNode);
        }
      });
    });
    targetNode.querySelectorAll("a").forEach(addNode);
    observer.observe(targetNode, observerInit);
    return function cleanup() {
      tracked.forEach((a) => {
        a.removeEventListener("click", trackClick);
      });
      tracked.clear();
      observer.disconnect();
    };
  };
  return {
    trackEvent,
    trackPageview,
    enableAutoPageviews,
    enableAutoOutboundTracking
  };
}

// node_modules/.pnpm/plausible-tracker@0.3.8/node_modules/plausible-tracker/build/module/index.js
var module_default = Plausible;

// node_modules/.pnpm/@huntersofbook+plausible-vue@1.0.0/node_modules/@huntersofbook/plausible-vue/dist/index.mjs
var loadScript = (source, options = {}) => {
  return new Promise((resolve, reject) => {
    const head = document.head || document.getElementsByTagName("head")[0];
    const script = document.createElement("script");
    const {
      src,
      type = options.partytown ? "text/partytown" : "text/javascript",
      defer = false,
      async = false,
      ...restAttrs
    } = options;
    script.type = type;
    script.defer = defer;
    script.async = async;
    script.src = src || source;
    script.setAttribute("data-domain", options["data-domain"]);
    Object.keys(restAttrs).forEach((key) => {
      script[key] = restAttrs[key];
    });
    head.appendChild(script);
    script.onload = resolve;
    script.onerror = reject;
  });
};
var createPlausible = (options) => {
  const plausible = {
    install(app) {
      const data = defu(options.init, {
        apiHost: "https://plausible.io",
        enableAutoPageviews: true
      });
      const plausible2 = module_default(data);
      if (options.settings.enableAutoPageviews === true)
        plausible2.enableAutoPageviews();
      if (options.settings.enableAutoOutboundTracking === true)
        plausible2.enableAutoOutboundTracking();
      loadScript(`${data.apiHost}/js/script.js`, {
        "defer": true,
        "data-domain": data.apiHost || "https://plausible.io",
        "partytown": options.partytown || false
      });
      app.config.globalProperties.$plausible = plausible2;
      app.provide("$plausible", plausible2);
    }
  };
  return plausible;
};
var usePlausible = () => {
  const plausible = inject("$plausible");
  return {
    ...plausible
  };
};
export {
  createPlausible,
  usePlausible
};
//# sourceMappingURL=@huntersofbook_plausible-vue.js.map
