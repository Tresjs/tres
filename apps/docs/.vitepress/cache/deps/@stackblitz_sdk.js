// ../node_modules/.pnpm/@stackblitz+sdk@1.11.0/node_modules/@stackblitz/sdk/bundles/sdk.m.js
var CONNECT_INTERVAL = 500;
var CONNECT_MAX_ATTEMPTS = 20;
var DEFAULT_FRAME_HEIGHT = 300;
var DEFAULT_ORIGIN = "https://stackblitz.com";
var PROJECT_TEMPLATES = [
  "angular-cli",
  "create-react-app",
  "html",
  "javascript",
  "node",
  "polymer",
  "typescript",
  "vue"
];
var UI_SIDEBAR_VIEWS = ["project", "search", "ports", "settings"];
var UI_THEMES = ["light", "dark"];
var UI_VIEWS = ["editor", "preview"];
var generators = {
  clickToLoad: (value) => trueParam("ctl", value),
  devToolsHeight: (value) => percentParam("devtoolsheight", value),
  forceEmbedLayout: (value) => trueParam("embed", value),
  hideDevTools: (value) => trueParam("hidedevtools", value),
  hideExplorer: (value) => trueParam("hideExplorer", value),
  hideNavigation: (value) => trueParam("hideNavigation", value),
  openFile: (value) => stringParams("file", value),
  showSidebar: (value) => booleanParam("showSidebar", value),
  sidebarView: (value) => enumParam("sidebarView", value, UI_SIDEBAR_VIEWS),
  startScript: (value) => stringParams("startScript", value),
  terminalHeight: (value) => percentParam("terminalHeight", value),
  theme: (value) => enumParam("theme", value, UI_THEMES),
  view: (value) => enumParam("view", value, UI_VIEWS),
  zenMode: (value) => trueParam("zenMode", value),
  organization: (value) => `${stringParams("orgName", value == null ? void 0 : value.name)}&${stringParams("orgProvider", value == null ? void 0 : value.provider)}`,
  crossOriginIsolated: (value) => trueParam("corp", value)
};
function buildParams(options = {}) {
  const params = Object.entries(options).map(([key, value]) => {
    if (value != null && generators.hasOwnProperty(key)) {
      return generators[key](value);
    }
    return "";
  }).filter(Boolean);
  return params.length ? `?${params.join("&")}` : "";
}
function trueParam(name, value) {
  if (value === true) {
    return `${name}=1`;
  }
  return "";
}
function booleanParam(name, value) {
  if (typeof value === "boolean") {
    return `${name}=${value ? "1" : "0"}`;
  }
  return "";
}
function percentParam(name, value) {
  if (typeof value === "number" && !Number.isNaN(value)) {
    const clamped = Math.min(100, Math.max(0, value));
    return `${name}=${encodeURIComponent(Math.round(clamped))}`;
  }
  return "";
}
function enumParam(name, value = "", allowList = []) {
  if (allowList.includes(value)) {
    return `${name}=${encodeURIComponent(value)}`;
  }
  return "";
}
function stringParams(name, value) {
  const values = Array.isArray(value) ? value : [value];
  return values.filter((val) => typeof val === "string" && val.trim() !== "").map((val) => `${name}=${encodeURIComponent(val)}`).join("&");
}
function genID() {
  return Math.random().toString(36).slice(2, 6) + Math.random().toString(36).slice(2, 6);
}
function openUrl(route, options) {
  return `${getOrigin(options)}${route}${buildParams(options)}`;
}
function embedUrl(route, options) {
  const config = {
    forceEmbedLayout: true
  };
  if (options && typeof options === "object") {
    Object.assign(config, options);
  }
  return `${getOrigin(config)}${route}${buildParams(config)}`;
}
function getOrigin(options = {}) {
  const origin = typeof options.origin === "string" ? options.origin : DEFAULT_ORIGIN;
  return origin.replace(/\/$/, "");
}
function replaceAndEmbed(target, frame, options) {
  if (!frame || !target || !target.parentNode) {
    throw new Error("Invalid Element");
  }
  if (target.id) {
    frame.id = target.id;
  }
  if (target.className) {
    frame.className = target.className;
  }
  setFrameDimensions(frame, options);
  setFrameAllowList(target, frame, options);
  target.replaceWith(frame);
}
function findElement(elementOrId) {
  if (typeof elementOrId === "string") {
    const element = document.getElementById(elementOrId);
    if (!element) {
      throw new Error(`Could not find element with id '${elementOrId}'`);
    }
    return element;
  } else if (elementOrId instanceof HTMLElement) {
    return elementOrId;
  }
  throw new Error(`Invalid element: ${elementOrId}`);
}
function openTarget(options) {
  return options && options.newWindow === false ? "_self" : "_blank";
}
function setFrameDimensions(frame, options = {}) {
  const height = Object.hasOwnProperty.call(options, "height") ? `${options.height}` : `${DEFAULT_FRAME_HEIGHT}`;
  const width = Object.hasOwnProperty.call(options, "width") ? `${options.width}` : void 0;
  frame.setAttribute("height", height);
  if (width) {
    frame.setAttribute("width", width);
  } else {
    frame.setAttribute("style", "width:100%;");
  }
}
function setFrameAllowList(target, frame, options = {}) {
  var _a, _b;
  const allowList = ((_b = (_a = target.allow) == null ? void 0 : _a.split(";")) == null ? void 0 : _b.map((key) => key.trim())) ?? [];
  if (options.crossOriginIsolated && !allowList.includes("cross-origin-isolated")) {
    allowList.push("cross-origin-isolated");
  }
  if (allowList.length > 0) {
    frame.allow = allowList.join("; ");
  }
}
var RDC = class {
  constructor(port) {
    this.pending = {};
    this.port = port;
    this.port.onmessage = this.messageListener.bind(this);
  }
  request({ type, payload }) {
    return new Promise((resolve, reject) => {
      const id = genID();
      this.pending[id] = { resolve, reject };
      this.port.postMessage({
        type,
        payload: {
          ...payload,
          // Ensure the payload object includes the request ID
          __reqid: id
        }
      });
    });
  }
  messageListener(event) {
    var _a;
    if (typeof ((_a = event.data.payload) == null ? void 0 : _a.__reqid) !== "string") {
      return;
    }
    const { type, payload } = event.data;
    const { __reqid: id, __success: success, __error: error } = payload;
    if (this.pending[id]) {
      if (success) {
        this.pending[id].resolve(this.cleanResult(payload));
      } else {
        this.pending[id].reject(error ? `${type}: ${error}` : type);
      }
      delete this.pending[id];
    }
  }
  cleanResult(payload) {
    const result = { ...payload };
    delete result.__reqid;
    delete result.__success;
    delete result.__error;
    return Object.keys(result).length ? result : null;
  }
};
var VM = class {
  constructor(port, config) {
    this.editor = {
      /**
       * Open one of several files in tabs and/or split panes.
       *
       * @since 1.7.0 Added support for opening multiple files
       */
      openFile: (path) => {
        return this._rdc.request({
          type: "SDK_OPEN_FILE",
          payload: { path }
        });
      },
      /**
       * Set a project file as the currently selected file.
       *
       * - This may update the highlighted file in the file explorer,
       *   and the currently open and/or focused editor tab.
       * - It will _not_ open a new editor tab if the provided path does not
       *   match a currently open tab. See `vm.editor.openFile` to open files.
       *
       * @since 1.7.0
       * @experimental
       */
      setCurrentFile: (path) => {
        return this._rdc.request({
          type: "SDK_SET_CURRENT_FILE",
          payload: { path }
        });
      },
      /**
       * Change the color theme
       *
       * @since 1.7.0
       */
      setTheme: (theme) => {
        return this._rdc.request({
          type: "SDK_SET_UI_THEME",
          payload: { theme }
        });
      },
      /**
       * Change the display mode of the project:
       *
       * - `default`: show the editor and preview pane
       * - `editor`: show the editor pane only
       * - `preview`: show the preview pane only
       *
       * @since 1.7.0
       */
      setView: (view) => {
        return this._rdc.request({
          type: "SDK_SET_UI_VIEW",
          payload: { view }
        });
      },
      /**
       * Change the display mode of the sidebar:
       *
       * - `true`: show the sidebar
       * - `false`: hide the sidebar
       *
       * @since 1.7.0
       */
      showSidebar: (visible = true) => {
        return this._rdc.request({
          type: "SDK_TOGGLE_SIDEBAR",
          payload: { visible }
        });
      }
    };
    this.preview = {
      /**
       * The origin (protocol and domain) of the preview iframe.
       *
       * In WebContainers-based projects, the origin will always be `null`;
       * try using `vm.preview.getUrl` instead.
       *
       * @see https://developer.stackblitz.com/guides/user-guide/available-environments
       */
      origin: "",
      /**
       * Get the current preview URL.
       *
       * In both and EngineBlock and WebContainers-based projects, the preview URL
       * may not reflect the exact path of the current page, after user navigation.
       *
       * In WebContainers-based projects, the preview URL will be `null` initially,
       * and until the project starts a web server.
       *
       * @since 1.7.0
       * @experimental
       */
      getUrl: () => {
        return this._rdc.request({
          type: "SDK_GET_PREVIEW_URL",
          payload: {}
        }).then((data) => (data == null ? void 0 : data.url) ?? null);
      },
      /**
       * Change the path of the preview URL.
       *
       * In WebContainers-based projects, this will be ignored if there is no
       * currently running web server.
       *
       * @since 1.7.0
       * @experimental
       */
      setUrl: (path = "/") => {
        if (typeof path !== "string" || !path.startsWith("/")) {
          throw new Error(`Invalid argument: expected a path starting with '/', got '${path}'`);
        }
        return this._rdc.request({
          type: "SDK_SET_PREVIEW_URL",
          payload: { path }
        });
      }
    };
    this._rdc = new RDC(port);
    Object.defineProperty(this.preview, "origin", {
      value: typeof config.previewOrigin === "string" ? config.previewOrigin : null,
      writable: false
    });
  }
  /**
   * Apply batch updates to the project files in one call.
   */
  applyFsDiff(diff) {
    const isObject = (val) => val !== null && typeof val === "object";
    if (!isObject(diff) || !isObject(diff.create)) {
      throw new Error("Invalid diff object: expected diff.create to be an object.");
    } else if (!Array.isArray(diff.destroy)) {
      throw new Error("Invalid diff object: expected diff.destroy to be an array.");
    }
    return this._rdc.request({
      type: "SDK_APPLY_FS_DIFF",
      payload: diff
    });
  }
  /**
   * Get the project’s defined dependencies.
   *
   * In EngineBlock projects, version numbers represent the resolved dependency versions.
   * In WebContainers-based projects, returns data from the project’s `package.json` without resolving installed version numbers.
   */
  getDependencies() {
    return this._rdc.request({
      type: "SDK_GET_DEPS_SNAPSHOT",
      payload: {}
    });
  }
  /**
   * Get a snapshot of the project files and their content.
   */
  getFsSnapshot() {
    return this._rdc.request({
      type: "SDK_GET_FS_SNAPSHOT",
      payload: {}
    });
  }
};
var connections = [];
var Connection = class {
  constructor(element) {
    this.id = genID();
    this.element = element;
    this.pending = new Promise((resolve, reject) => {
      const listenForSuccess = ({ data, ports }) => {
        if ((data == null ? void 0 : data.action) === "SDK_INIT_SUCCESS" && data.id === this.id) {
          this.vm = new VM(ports[0], data.payload);
          resolve(this.vm);
          cleanup();
        }
      };
      const pingFrame = () => {
        var _a;
        (_a = this.element.contentWindow) == null ? void 0 : _a.postMessage(
          {
            action: "SDK_INIT",
            id: this.id
          },
          "*"
        );
      };
      function cleanup() {
        window.clearInterval(interval);
        window.removeEventListener("message", listenForSuccess);
      }
      window.addEventListener("message", listenForSuccess);
      pingFrame();
      let attempts = 0;
      const interval = window.setInterval(() => {
        if (this.vm) {
          cleanup();
          return;
        }
        if (attempts >= CONNECT_MAX_ATTEMPTS) {
          cleanup();
          reject("Timeout: Unable to establish a connection with the StackBlitz VM");
          connections.forEach((connection, index) => {
            if (connection.id === this.id) {
              connections.splice(index, 1);
            }
          });
          return;
        }
        attempts++;
        pingFrame();
      }, CONNECT_INTERVAL);
    });
    connections.push(this);
  }
};
var getConnection = (identifier) => {
  const key = identifier instanceof Element ? "element" : "id";
  return connections.find((c) => c[key] === identifier) ?? null;
};
function createHiddenInput(name, value) {
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = name;
  input.value = value;
  return input;
}
function encodeFilePath(path) {
  return path.replace(/\[/g, "%5B").replace(/\]/g, "%5D");
}
function createProjectForm({
  template,
  title,
  description,
  dependencies,
  files,
  settings
}) {
  if (!PROJECT_TEMPLATES.includes(template)) {
    const names = PROJECT_TEMPLATES.map((t) => `'${t}'`).join(", ");
    console.warn(`Unsupported project.template: must be one of ${names}`);
  }
  const inputs = [];
  const addInput = (name, value, defaultValue = "") => {
    inputs.push(createHiddenInput(name, typeof value === "string" ? value : defaultValue));
  };
  addInput("project[title]", title);
  if (typeof description === "string" && description.length > 0) {
    addInput("project[description]", description);
  }
  addInput("project[template]", template, "javascript");
  if (dependencies) {
    if (template === "node") {
      console.warn(
        `Invalid project.dependencies: dependencies must be provided as a 'package.json' file when using the 'node' template.`
      );
    } else {
      addInput("project[dependencies]", JSON.stringify(dependencies));
    }
  }
  if (settings) {
    addInput("project[settings]", JSON.stringify(settings));
  }
  Object.entries(files).forEach(([path, contents]) => {
    addInput(`project[files][${encodeFilePath(path)}]`, contents);
  });
  const form = document.createElement("form");
  form.method = "POST";
  form.setAttribute("style", "display:none!important;");
  form.append(...inputs);
  return form;
}
function createProjectFrameHTML(project, options) {
  const form = createProjectForm(project);
  form.action = embedUrl("/run", options);
  form.id = "sb_run";
  const html = `<!doctype html>
<html>
<head><title></title></head>
<body>
  ${form.outerHTML}
  <script>document.getElementById('${form.id}').submit();<\/script>
</body>
</html>`;
  return html;
}
function openNewProject(project, options) {
  const form = createProjectForm(project);
  form.action = openUrl("/run", options);
  form.target = openTarget(options);
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}
function connect(frameEl) {
  if (!(frameEl == null ? void 0 : frameEl.contentWindow)) {
    return Promise.reject("Provided element is not an iframe.");
  }
  const connection = getConnection(frameEl) ?? new Connection(frameEl);
  return connection.pending;
}
function openProject(project, options) {
  openNewProject(project, options);
}
function openProjectId(projectId, options) {
  const url = openUrl(`/edit/${projectId}`, options);
  const target = openTarget(options);
  window.open(url, target);
}
function openGithubProject(repoSlug, options) {
  const url = openUrl(`/github/${repoSlug}`, options);
  const target = openTarget(options);
  window.open(url, target);
}
function embedProject(elementOrId, project, options) {
  var _a;
  const element = findElement(elementOrId);
  const html = createProjectFrameHTML(project, options);
  const frame = document.createElement("iframe");
  replaceAndEmbed(element, frame, options);
  (_a = frame.contentDocument) == null ? void 0 : _a.write(html);
  return connect(frame);
}
function embedProjectId(elementOrId, projectId, options) {
  const element = findElement(elementOrId);
  const frame = document.createElement("iframe");
  frame.src = embedUrl(`/edit/${projectId}`, options);
  replaceAndEmbed(element, frame, options);
  return connect(frame);
}
function embedGithubProject(elementOrId, repoSlug, options) {
  const element = findElement(elementOrId);
  const frame = document.createElement("iframe");
  frame.src = embedUrl(`/github/${repoSlug}`, options);
  replaceAndEmbed(element, frame, options);
  return connect(frame);
}
var StackBlitzSDK = {
  connect,
  embedGithubProject,
  embedProject,
  embedProjectId,
  openGithubProject,
  openProject,
  openProjectId
};
export {
  StackBlitzSDK as default
};
//# sourceMappingURL=@stackblitz_sdk.js.map
