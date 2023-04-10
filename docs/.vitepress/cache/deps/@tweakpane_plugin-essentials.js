import {
  __commonJS
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@tweakpane+plugin-essentials@0.1.8_tweakpane@3.1.7/node_modules/@tweakpane/plugin-essentials/dist/tweakpane-plugin-essentials.js
var require_tweakpane_plugin_essentials = __commonJS({
  "node_modules/.pnpm/@tweakpane+plugin-essentials@0.1.8_tweakpane@3.1.7/node_modules/@tweakpane/plugin-essentials/dist/tweakpane-plugin-essentials.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.TweakpaneEssentialsPlugin = {}));
    })(exports, function(exports2) {
      "use strict";
      class BladeApi {
        constructor(controller) {
          this.controller_ = controller;
        }
        get element() {
          return this.controller_.view.element;
        }
        get disabled() {
          return this.controller_.viewProps.get("disabled");
        }
        set disabled(disabled) {
          this.controller_.viewProps.set("disabled", disabled);
        }
        get hidden() {
          return this.controller_.viewProps.get("hidden");
        }
        set hidden(hidden) {
          this.controller_.viewProps.set("hidden", hidden);
        }
        dispose() {
          this.controller_.viewProps.set("disposed", true);
        }
      }
      class TpEvent {
        constructor(target) {
          this.target = target;
        }
      }
      class TpChangeEvent extends TpEvent {
        constructor(target, value, presetKey, last) {
          super(target);
          this.value = value;
          this.presetKey = presetKey;
          this.last = last !== null && last !== void 0 ? last : true;
        }
      }
      function forceCast(v) {
        return v;
      }
      function isEmpty(value) {
        return value === null || value === void 0;
      }
      const CREATE_MESSAGE_MAP = {
        alreadydisposed: () => "View has been already disposed",
        invalidparams: (context) => `Invalid parameters for '${context.name}'`,
        nomatchingcontroller: (context) => `No matching controller for '${context.key}'`,
        nomatchingview: (context) => `No matching view for '${JSON.stringify(context.params)}'`,
        notbindable: () => `Value is not bindable`,
        propertynotfound: (context) => `Property '${context.name}' not found`,
        shouldneverhappen: () => "This error should never happen"
      };
      class TpError {
        constructor(config) {
          var _a;
          this.message = (_a = CREATE_MESSAGE_MAP[config.type](forceCast(config.context))) !== null && _a !== void 0 ? _a : "Unexpected error";
          this.name = this.constructor.name;
          this.stack = new Error(this.message).stack;
          this.type = config.type;
        }
        static alreadyDisposed() {
          return new TpError({ type: "alreadydisposed" });
        }
        static notBindable() {
          return new TpError({
            type: "notbindable"
          });
        }
        static propertyNotFound(name) {
          return new TpError({
            type: "propertynotfound",
            context: {
              name
            }
          });
        }
        static shouldNeverHappen() {
          return new TpError({ type: "shouldneverhappen" });
        }
      }
      class Emitter {
        constructor() {
          this.observers_ = {};
        }
        on(eventName, handler) {
          let observers = this.observers_[eventName];
          if (!observers) {
            observers = this.observers_[eventName] = [];
          }
          observers.push({
            handler
          });
          return this;
        }
        off(eventName, handler) {
          const observers = this.observers_[eventName];
          if (observers) {
            this.observers_[eventName] = observers.filter((observer) => {
              return observer.handler !== handler;
            });
          }
          return this;
        }
        emit(eventName, event) {
          const observers = this.observers_[eventName];
          if (!observers) {
            return;
          }
          observers.forEach((observer) => {
            observer.handler(event);
          });
        }
      }
      const PREFIX = "tp";
      function ClassName(viewName) {
        const fn = (opt_elementName, opt_modifier) => {
          return [
            PREFIX,
            "-",
            viewName,
            "v",
            opt_elementName ? `_${opt_elementName}` : "",
            opt_modifier ? `-${opt_modifier}` : ""
          ].join("");
        };
        return fn;
      }
      function compose$1(h1, h2) {
        return (input) => h2(h1(input));
      }
      function extractValue(ev) {
        return ev.rawValue;
      }
      function bindValue(value, applyValue) {
        value.emitter.on("change", compose$1(extractValue, applyValue));
        applyValue(value.rawValue);
      }
      function bindValueMap(valueMap, key, applyValue) {
        bindValue(valueMap.value(key), applyValue);
      }
      function applyClass(elem, className2, active) {
        if (active) {
          elem.classList.add(className2);
        } else {
          elem.classList.remove(className2);
        }
      }
      function valueToClassName(elem, className2) {
        return (value) => {
          applyClass(elem, className2, value);
        };
      }
      function bindValueToTextContent(value, elem) {
        bindValue(value, (text) => {
          elem.textContent = text !== null && text !== void 0 ? text : "";
        });
      }
      const className$g = ClassName("btn");
      class ButtonView {
        constructor(doc, config) {
          this.element = doc.createElement("div");
          this.element.classList.add(className$g());
          config.viewProps.bindClassModifiers(this.element);
          const buttonElem = doc.createElement("button");
          buttonElem.classList.add(className$g("b"));
          config.viewProps.bindDisabled(buttonElem);
          this.element.appendChild(buttonElem);
          this.buttonElement = buttonElem;
          const titleElem = doc.createElement("div");
          titleElem.classList.add(className$g("t"));
          bindValueToTextContent(config.props.value("title"), titleElem);
          this.buttonElement.appendChild(titleElem);
        }
      }
      class ButtonController {
        constructor(doc, config) {
          this.emitter = new Emitter();
          this.onClick_ = this.onClick_.bind(this);
          this.props = config.props;
          this.viewProps = config.viewProps;
          this.view = new ButtonView(doc, {
            props: this.props,
            viewProps: this.viewProps
          });
          this.view.buttonElement.addEventListener("click", this.onClick_);
        }
        onClick_() {
          this.emitter.emit("click", {
            sender: this
          });
        }
      }
      class BoundValue {
        constructor(initialValue, config) {
          var _a;
          this.constraint_ = config === null || config === void 0 ? void 0 : config.constraint;
          this.equals_ = (_a = config === null || config === void 0 ? void 0 : config.equals) !== null && _a !== void 0 ? _a : (v1, v2) => v1 === v2;
          this.emitter = new Emitter();
          this.rawValue_ = initialValue;
        }
        get constraint() {
          return this.constraint_;
        }
        get rawValue() {
          return this.rawValue_;
        }
        set rawValue(rawValue) {
          this.setRawValue(rawValue, {
            forceEmit: false,
            last: true
          });
        }
        setRawValue(rawValue, options) {
          const opts = options !== null && options !== void 0 ? options : {
            forceEmit: false,
            last: true
          };
          const constrainedValue = this.constraint_ ? this.constraint_.constrain(rawValue) : rawValue;
          const prevValue = this.rawValue_;
          const changed = !this.equals_(prevValue, constrainedValue);
          if (!changed && !opts.forceEmit) {
            return;
          }
          this.emitter.emit("beforechange", {
            sender: this
          });
          this.rawValue_ = constrainedValue;
          this.emitter.emit("change", {
            options: opts,
            previousRawValue: prevValue,
            rawValue: constrainedValue,
            sender: this
          });
        }
      }
      class PrimitiveValue {
        constructor(initialValue) {
          this.emitter = new Emitter();
          this.value_ = initialValue;
        }
        get rawValue() {
          return this.value_;
        }
        set rawValue(value) {
          this.setRawValue(value, {
            forceEmit: false,
            last: true
          });
        }
        setRawValue(value, options) {
          const opts = options !== null && options !== void 0 ? options : {
            forceEmit: false,
            last: true
          };
          const prevValue = this.value_;
          if (prevValue === value && !opts.forceEmit) {
            return;
          }
          this.emitter.emit("beforechange", {
            sender: this
          });
          this.value_ = value;
          this.emitter.emit("change", {
            options: opts,
            previousRawValue: prevValue,
            rawValue: this.value_,
            sender: this
          });
        }
      }
      function createValue(initialValue, config) {
        const constraint = config === null || config === void 0 ? void 0 : config.constraint;
        const equals = config === null || config === void 0 ? void 0 : config.equals;
        if (!constraint && !equals) {
          return new PrimitiveValue(initialValue);
        }
        return new BoundValue(initialValue, config);
      }
      class ValueMap {
        constructor(valueMap) {
          this.emitter = new Emitter();
          this.valMap_ = valueMap;
          for (const key in this.valMap_) {
            const v = this.valMap_[key];
            v.emitter.on("change", () => {
              this.emitter.emit("change", {
                key,
                sender: this
              });
            });
          }
        }
        static createCore(initialValue) {
          const keys = Object.keys(initialValue);
          return keys.reduce((o, key) => {
            return Object.assign(o, {
              [key]: createValue(initialValue[key])
            });
          }, {});
        }
        static fromObject(initialValue) {
          const core = this.createCore(initialValue);
          return new ValueMap(core);
        }
        get(key) {
          return this.valMap_[key].rawValue;
        }
        set(key, value) {
          this.valMap_[key].rawValue = value;
        }
        value(key) {
          return this.valMap_[key];
        }
      }
      function parseObject(value, keyToParserMap) {
        const keys = Object.keys(keyToParserMap);
        const result = keys.reduce((tmp, key) => {
          if (tmp === void 0) {
            return void 0;
          }
          const parser = keyToParserMap[key];
          const result2 = parser(value[key]);
          return result2.succeeded ? Object.assign(Object.assign({}, tmp), { [key]: result2.value }) : void 0;
        }, {});
        return forceCast(result);
      }
      function parseArray(value, parseItem) {
        return value.reduce((tmp, item) => {
          if (tmp === void 0) {
            return void 0;
          }
          const result = parseItem(item);
          if (!result.succeeded || result.value === void 0) {
            return void 0;
          }
          return [...tmp, result.value];
        }, []);
      }
      function isObject(value) {
        if (value === null) {
          return false;
        }
        return typeof value === "object";
      }
      function createParamsParserBuilder(parse) {
        return (optional) => (v) => {
          if (!optional && v === void 0) {
            return {
              succeeded: false,
              value: void 0
            };
          }
          if (optional && v === void 0) {
            return {
              succeeded: true,
              value: void 0
            };
          }
          const result = parse(v);
          return result !== void 0 ? {
            succeeded: true,
            value: result
          } : {
            succeeded: false,
            value: void 0
          };
        };
      }
      function createParamsParserBuilders(optional) {
        return {
          custom: (parse) => createParamsParserBuilder(parse)(optional),
          boolean: createParamsParserBuilder((v) => typeof v === "boolean" ? v : void 0)(optional),
          number: createParamsParserBuilder((v) => typeof v === "number" ? v : void 0)(optional),
          string: createParamsParserBuilder((v) => typeof v === "string" ? v : void 0)(optional),
          function: createParamsParserBuilder((v) => typeof v === "function" ? v : void 0)(optional),
          constant: (value) => createParamsParserBuilder((v) => v === value ? value : void 0)(optional),
          raw: createParamsParserBuilder((v) => v)(optional),
          object: (keyToParserMap) => createParamsParserBuilder((v) => {
            if (!isObject(v)) {
              return void 0;
            }
            return parseObject(v, keyToParserMap);
          })(optional),
          array: (itemParser) => createParamsParserBuilder((v) => {
            if (!Array.isArray(v)) {
              return void 0;
            }
            return parseArray(v, itemParser);
          })(optional)
        };
      }
      const ParamsParsers = {
        optional: createParamsParserBuilders(true),
        required: createParamsParserBuilders(false)
      };
      function parseParams(value, keyToParserMap) {
        const result = ParamsParsers.required.object(keyToParserMap)(value);
        return result.succeeded ? result.value : void 0;
      }
      function warnMissing(info) {
        console.warn([
          `Missing '${info.key}' of ${info.target} in ${info.place}.`,
          "Please rebuild plugins with the latest core package."
        ].join(" "));
      }
      function disposeElement(elem) {
        if (elem && elem.parentElement) {
          elem.parentElement.removeChild(elem);
        }
        return null;
      }
      class ReadonlyValue {
        constructor(value) {
          this.value_ = value;
        }
        static create(value) {
          return [
            new ReadonlyValue(value),
            (rawValue, options) => {
              value.setRawValue(rawValue, options);
            }
          ];
        }
        get emitter() {
          return this.value_.emitter;
        }
        get rawValue() {
          return this.value_.rawValue;
        }
      }
      const className$f = ClassName("");
      function valueToModifier(elem, modifier) {
        return valueToClassName(elem, className$f(void 0, modifier));
      }
      class ViewProps extends ValueMap {
        constructor(valueMap) {
          var _a;
          super(valueMap);
          this.onDisabledChange_ = this.onDisabledChange_.bind(this);
          this.onParentChange_ = this.onParentChange_.bind(this);
          this.onParentGlobalDisabledChange_ = this.onParentGlobalDisabledChange_.bind(this);
          [this.globalDisabled_, this.setGlobalDisabled_] = ReadonlyValue.create(createValue(this.getGlobalDisabled_()));
          this.value("disabled").emitter.on("change", this.onDisabledChange_);
          this.value("parent").emitter.on("change", this.onParentChange_);
          (_a = this.get("parent")) === null || _a === void 0 ? void 0 : _a.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_);
        }
        static create(opt_initialValue) {
          var _a, _b, _c;
          const initialValue = opt_initialValue !== null && opt_initialValue !== void 0 ? opt_initialValue : {};
          return new ViewProps(ValueMap.createCore({
            disabled: (_a = initialValue.disabled) !== null && _a !== void 0 ? _a : false,
            disposed: false,
            hidden: (_b = initialValue.hidden) !== null && _b !== void 0 ? _b : false,
            parent: (_c = initialValue.parent) !== null && _c !== void 0 ? _c : null
          }));
        }
        get globalDisabled() {
          return this.globalDisabled_;
        }
        bindClassModifiers(elem) {
          bindValue(this.globalDisabled_, valueToModifier(elem, "disabled"));
          bindValueMap(this, "hidden", valueToModifier(elem, "hidden"));
        }
        bindDisabled(target) {
          bindValue(this.globalDisabled_, (disabled) => {
            target.disabled = disabled;
          });
        }
        bindTabIndex(elem) {
          bindValue(this.globalDisabled_, (disabled) => {
            elem.tabIndex = disabled ? -1 : 0;
          });
        }
        handleDispose(callback) {
          this.value("disposed").emitter.on("change", (disposed) => {
            if (disposed) {
              callback();
            }
          });
        }
        getGlobalDisabled_() {
          const parent = this.get("parent");
          const parentDisabled = parent ? parent.globalDisabled.rawValue : false;
          return parentDisabled || this.get("disabled");
        }
        updateGlobalDisabled_() {
          this.setGlobalDisabled_(this.getGlobalDisabled_());
        }
        onDisabledChange_() {
          this.updateGlobalDisabled_();
        }
        onParentGlobalDisabledChange_() {
          this.updateGlobalDisabled_();
        }
        onParentChange_(ev) {
          var _a;
          const prevParent = ev.previousRawValue;
          prevParent === null || prevParent === void 0 ? void 0 : prevParent.globalDisabled.emitter.off("change", this.onParentGlobalDisabledChange_);
          (_a = this.get("parent")) === null || _a === void 0 ? void 0 : _a.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_);
          this.updateGlobalDisabled_();
        }
      }
      function getAllBladePositions() {
        return ["veryfirst", "first", "last", "verylast"];
      }
      const className$e = ClassName("");
      const POS_TO_CLASS_NAME_MAP = {
        veryfirst: "vfst",
        first: "fst",
        last: "lst",
        verylast: "vlst"
      };
      class BladeController {
        constructor(config) {
          this.parent_ = null;
          this.blade = config.blade;
          this.view = config.view;
          this.viewProps = config.viewProps;
          const elem = this.view.element;
          this.blade.value("positions").emitter.on("change", () => {
            getAllBladePositions().forEach((pos) => {
              elem.classList.remove(className$e(void 0, POS_TO_CLASS_NAME_MAP[pos]));
            });
            this.blade.get("positions").forEach((pos) => {
              elem.classList.add(className$e(void 0, POS_TO_CLASS_NAME_MAP[pos]));
            });
          });
          this.viewProps.handleDispose(() => {
            disposeElement(elem);
          });
        }
        get parent() {
          return this.parent_;
        }
        set parent(parent) {
          this.parent_ = parent;
          if (!("parent" in this.viewProps.valMap_)) {
            warnMissing({
              key: "parent",
              target: ViewProps.name,
              place: "BladeController.parent"
            });
            return;
          }
          this.viewProps.set("parent", this.parent_ ? this.parent_.viewProps : null);
        }
      }
      const SVG_NS = "http://www.w3.org/2000/svg";
      function forceReflow(element) {
        element.offsetHeight;
      }
      function disableTransitionTemporarily(element, callback) {
        const t = element.style.transition;
        element.style.transition = "none";
        callback();
        element.style.transition = t;
      }
      function supportsTouch(doc) {
        return doc.ontouchstart !== void 0;
      }
      function removeChildNodes(element) {
        while (element.childNodes.length > 0) {
          element.removeChild(element.childNodes[0]);
        }
      }
      function findNextTarget(ev) {
        if (ev.relatedTarget) {
          return forceCast(ev.relatedTarget);
        }
        if ("explicitOriginalTarget" in ev) {
          return ev.explicitOriginalTarget;
        }
        return null;
      }
      const className$d = ClassName("lbl");
      function createLabelNode(doc, label) {
        const frag = doc.createDocumentFragment();
        const lineNodes = label.split("\n").map((line) => {
          return doc.createTextNode(line);
        });
        lineNodes.forEach((lineNode, index) => {
          if (index > 0) {
            frag.appendChild(doc.createElement("br"));
          }
          frag.appendChild(lineNode);
        });
        return frag;
      }
      class LabelView {
        constructor(doc, config) {
          this.element = doc.createElement("div");
          this.element.classList.add(className$d());
          config.viewProps.bindClassModifiers(this.element);
          const labelElem = doc.createElement("div");
          labelElem.classList.add(className$d("l"));
          bindValueMap(config.props, "label", (value) => {
            if (isEmpty(value)) {
              this.element.classList.add(className$d(void 0, "nol"));
            } else {
              this.element.classList.remove(className$d(void 0, "nol"));
              removeChildNodes(labelElem);
              labelElem.appendChild(createLabelNode(doc, value));
            }
          });
          this.element.appendChild(labelElem);
          this.labelElement = labelElem;
          const valueElem = doc.createElement("div");
          valueElem.classList.add(className$d("v"));
          this.element.appendChild(valueElem);
          this.valueElement = valueElem;
        }
      }
      class LabelController extends BladeController {
        constructor(doc, config) {
          const viewProps = config.valueController.viewProps;
          super(Object.assign(Object.assign({}, config), { view: new LabelView(doc, {
            props: config.props,
            viewProps
          }), viewProps }));
          this.props = config.props;
          this.valueController = config.valueController;
          this.view.valueElement.appendChild(this.valueController.view.element);
        }
      }
      class ValueBladeController extends BladeController {
        constructor(config) {
          super(config);
          this.value = config.value;
        }
      }
      class Foldable extends ValueMap {
        constructor(valueMap) {
          super(valueMap);
        }
        static create(expanded) {
          const coreObj = {
            completed: true,
            expanded,
            expandedHeight: null,
            shouldFixHeight: false,
            temporaryExpanded: null
          };
          const core = ValueMap.createCore(coreObj);
          return new Foldable(core);
        }
        get styleExpanded() {
          var _a;
          return (_a = this.get("temporaryExpanded")) !== null && _a !== void 0 ? _a : this.get("expanded");
        }
        get styleHeight() {
          if (!this.styleExpanded) {
            return "0";
          }
          const exHeight = this.get("expandedHeight");
          if (this.get("shouldFixHeight") && !isEmpty(exHeight)) {
            return `${exHeight}px`;
          }
          return "auto";
        }
        bindExpandedClass(elem, expandedClassName) {
          const onExpand = () => {
            const expanded = this.styleExpanded;
            if (expanded) {
              elem.classList.add(expandedClassName);
            } else {
              elem.classList.remove(expandedClassName);
            }
          };
          bindValueMap(this, "expanded", onExpand);
          bindValueMap(this, "temporaryExpanded", onExpand);
        }
        cleanUpTransition() {
          this.set("shouldFixHeight", false);
          this.set("expandedHeight", null);
          this.set("completed", true);
        }
      }
      function createFoldable(expanded) {
        return Foldable.create(expanded);
      }
      function computeExpandedFolderHeight(folder, containerElement) {
        let height = 0;
        disableTransitionTemporarily(containerElement, () => {
          folder.set("expandedHeight", null);
          folder.set("temporaryExpanded", true);
          forceReflow(containerElement);
          height = containerElement.clientHeight;
          folder.set("temporaryExpanded", null);
          forceReflow(containerElement);
        });
        return height;
      }
      function applyHeight(foldable, elem) {
        elem.style.height = foldable.styleHeight;
      }
      function bindFoldable(foldable, elem) {
        foldable.value("expanded").emitter.on("beforechange", () => {
          foldable.set("completed", false);
          if (isEmpty(foldable.get("expandedHeight"))) {
            foldable.set("expandedHeight", computeExpandedFolderHeight(foldable, elem));
          }
          foldable.set("shouldFixHeight", true);
          forceReflow(elem);
        });
        foldable.emitter.on("change", () => {
          applyHeight(foldable, elem);
        });
        applyHeight(foldable, elem);
        elem.addEventListener("transitionend", (ev) => {
          if (ev.propertyName !== "height") {
            return;
          }
          foldable.cleanUpTransition();
        });
      }
      class PlainView {
        constructor(doc, config) {
          const className2 = ClassName(config.viewName);
          this.element = doc.createElement("div");
          this.element.classList.add(className2());
          config.viewProps.bindClassModifiers(this.element);
        }
      }
      class LabeledValueController extends ValueBladeController {
        constructor(doc, config) {
          const viewProps = config.valueController.viewProps;
          super(Object.assign(Object.assign({}, config), { value: config.valueController.value, view: new LabelView(doc, {
            props: config.props,
            viewProps
          }), viewProps }));
          this.props = config.props;
          this.valueController = config.valueController;
          this.view.valueElement.appendChild(this.valueController.view.element);
        }
      }
      class ManualTicker {
        constructor() {
          this.disabled = false;
          this.emitter = new Emitter();
        }
        dispose() {
        }
        tick() {
          if (this.disabled) {
            return;
          }
          this.emitter.emit("tick", {
            sender: this
          });
        }
      }
      class IntervalTicker {
        constructor(doc, interval) {
          this.disabled_ = false;
          this.timerId_ = null;
          this.onTick_ = this.onTick_.bind(this);
          this.doc_ = doc;
          this.emitter = new Emitter();
          this.interval_ = interval;
          this.setTimer_();
        }
        get disabled() {
          return this.disabled_;
        }
        set disabled(inactive) {
          this.disabled_ = inactive;
          if (this.disabled_) {
            this.clearTimer_();
          } else {
            this.setTimer_();
          }
        }
        dispose() {
          this.clearTimer_();
        }
        clearTimer_() {
          if (this.timerId_ === null) {
            return;
          }
          const win = this.doc_.defaultView;
          if (win) {
            win.clearInterval(this.timerId_);
          }
          this.timerId_ = null;
        }
        setTimer_() {
          this.clearTimer_();
          if (this.interval_ <= 0) {
            return;
          }
          const win = this.doc_.defaultView;
          if (win) {
            this.timerId_ = win.setInterval(this.onTick_, this.interval_);
          }
        }
        onTick_() {
          if (this.disabled_) {
            return;
          }
          this.emitter.emit("tick", {
            sender: this
          });
        }
      }
      class CompositeConstraint {
        constructor(constraints) {
          this.constraints = constraints;
        }
        constrain(value) {
          return this.constraints.reduce((result, c) => {
            return c.constrain(result);
          }, value);
        }
      }
      function findConstraint(c, constraintClass) {
        if (c instanceof constraintClass) {
          return c;
        }
        if (c instanceof CompositeConstraint) {
          const result = c.constraints.reduce((tmpResult, sc) => {
            if (tmpResult) {
              return tmpResult;
            }
            return sc instanceof constraintClass ? sc : null;
          }, null);
          if (result) {
            return result;
          }
        }
        return null;
      }
      class DefiniteRangeConstraint {
        constructor(config) {
          this.values = ValueMap.fromObject({
            max: config.max,
            min: config.min
          });
        }
        constrain(value) {
          const max = this.values.get("max");
          const min = this.values.get("min");
          return Math.min(Math.max(value, min), max);
        }
      }
      class RangeConstraint {
        constructor(config) {
          this.values = ValueMap.fromObject({
            max: config.max,
            min: config.min
          });
        }
        get maxValue() {
          return this.values.get("max");
        }
        get minValue() {
          return this.values.get("min");
        }
        constrain(value) {
          const max = this.values.get("max");
          const min = this.values.get("min");
          let result = value;
          if (!isEmpty(min)) {
            result = Math.max(result, min);
          }
          if (!isEmpty(max)) {
            result = Math.min(result, max);
          }
          return result;
        }
      }
      class StepConstraint {
        constructor(step, origin = 0) {
          this.step = step;
          this.origin = origin;
        }
        constrain(value) {
          const o = this.origin % this.step;
          const r = Math.round((value - o) / this.step);
          return o + r * this.step;
        }
      }
      const className$c = ClassName("pop");
      class PopupView {
        constructor(doc, config) {
          this.element = doc.createElement("div");
          this.element.classList.add(className$c());
          config.viewProps.bindClassModifiers(this.element);
          bindValue(config.shows, valueToClassName(this.element, className$c(void 0, "v")));
        }
      }
      class PopupController {
        constructor(doc, config) {
          this.shows = createValue(false);
          this.viewProps = config.viewProps;
          this.view = new PopupView(doc, {
            shows: this.shows,
            viewProps: this.viewProps
          });
        }
      }
      const className$b = ClassName("txt");
      class TextView {
        constructor(doc, config) {
          this.onChange_ = this.onChange_.bind(this);
          this.element = doc.createElement("div");
          this.element.classList.add(className$b());
          config.viewProps.bindClassModifiers(this.element);
          this.props_ = config.props;
          this.props_.emitter.on("change", this.onChange_);
          const inputElem = doc.createElement("input");
          inputElem.classList.add(className$b("i"));
          inputElem.type = "text";
          config.viewProps.bindDisabled(inputElem);
          this.element.appendChild(inputElem);
          this.inputElement = inputElem;
          config.value.emitter.on("change", this.onChange_);
          this.value_ = config.value;
          this.refresh();
        }
        refresh() {
          const formatter = this.props_.get("formatter");
          this.inputElement.value = formatter(this.value_.rawValue);
        }
        onChange_() {
          this.refresh();
        }
      }
      class TextController {
        constructor(doc, config) {
          this.onInputChange_ = this.onInputChange_.bind(this);
          this.parser_ = config.parser;
          this.props = config.props;
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.view = new TextView(doc, {
            props: config.props,
            value: this.value,
            viewProps: this.viewProps
          });
          this.view.inputElement.addEventListener("change", this.onInputChange_);
        }
        onInputChange_(e) {
          const inputElem = forceCast(e.currentTarget);
          const value = inputElem.value;
          const parsedValue = this.parser_(value);
          if (!isEmpty(parsedValue)) {
            this.value.rawValue = parsedValue;
          }
          this.view.refresh();
        }
      }
      function boolFromUnknown(value) {
        if (value === "false") {
          return false;
        }
        return !!value;
      }
      class NumberLiteralNode {
        constructor(text) {
          this.text = text;
        }
        evaluate() {
          return Number(this.text);
        }
        toString() {
          return this.text;
        }
      }
      const BINARY_OPERATION_MAP = {
        "**": (v1, v2) => Math.pow(v1, v2),
        "*": (v1, v2) => v1 * v2,
        "/": (v1, v2) => v1 / v2,
        "%": (v1, v2) => v1 % v2,
        "+": (v1, v2) => v1 + v2,
        "-": (v1, v2) => v1 - v2,
        "<<": (v1, v2) => v1 << v2,
        ">>": (v1, v2) => v1 >> v2,
        ">>>": (v1, v2) => v1 >>> v2,
        "&": (v1, v2) => v1 & v2,
        "^": (v1, v2) => v1 ^ v2,
        "|": (v1, v2) => v1 | v2
      };
      class BinaryOperationNode {
        constructor(operator, left, right) {
          this.left = left;
          this.operator = operator;
          this.right = right;
        }
        evaluate() {
          const op = BINARY_OPERATION_MAP[this.operator];
          if (!op) {
            throw new Error(`unexpected binary operator: '${this.operator}`);
          }
          return op(this.left.evaluate(), this.right.evaluate());
        }
        toString() {
          return [
            "b(",
            this.left.toString(),
            this.operator,
            this.right.toString(),
            ")"
          ].join(" ");
        }
      }
      const UNARY_OPERATION_MAP = {
        "+": (v) => v,
        "-": (v) => -v,
        "~": (v) => ~v
      };
      class UnaryOperationNode {
        constructor(operator, expr) {
          this.operator = operator;
          this.expression = expr;
        }
        evaluate() {
          const op = UNARY_OPERATION_MAP[this.operator];
          if (!op) {
            throw new Error(`unexpected unary operator: '${this.operator}`);
          }
          return op(this.expression.evaluate());
        }
        toString() {
          return ["u(", this.operator, this.expression.toString(), ")"].join(" ");
        }
      }
      function combineReader(parsers) {
        return (text, cursor) => {
          for (let i = 0; i < parsers.length; i++) {
            const result = parsers[i](text, cursor);
            if (result !== "") {
              return result;
            }
          }
          return "";
        };
      }
      function readWhitespace(text, cursor) {
        var _a;
        const m = text.substr(cursor).match(/^\s+/);
        return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
      }
      function readNonZeroDigit(text, cursor) {
        const ch = text.substr(cursor, 1);
        return ch.match(/^[1-9]$/) ? ch : "";
      }
      function readDecimalDigits(text, cursor) {
        var _a;
        const m = text.substr(cursor).match(/^[0-9]+/);
        return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
      }
      function readSignedInteger(text, cursor) {
        const ds = readDecimalDigits(text, cursor);
        if (ds !== "") {
          return ds;
        }
        const sign = text.substr(cursor, 1);
        cursor += 1;
        if (sign !== "-" && sign !== "+") {
          return "";
        }
        const sds = readDecimalDigits(text, cursor);
        if (sds === "") {
          return "";
        }
        return sign + sds;
      }
      function readExponentPart(text, cursor) {
        const e = text.substr(cursor, 1);
        cursor += 1;
        if (e.toLowerCase() !== "e") {
          return "";
        }
        const si = readSignedInteger(text, cursor);
        if (si === "") {
          return "";
        }
        return e + si;
      }
      function readDecimalIntegerLiteral(text, cursor) {
        const ch = text.substr(cursor, 1);
        if (ch === "0") {
          return ch;
        }
        const nzd = readNonZeroDigit(text, cursor);
        cursor += nzd.length;
        if (nzd === "") {
          return "";
        }
        return nzd + readDecimalDigits(text, cursor);
      }
      function readDecimalLiteral1(text, cursor) {
        const dil = readDecimalIntegerLiteral(text, cursor);
        cursor += dil.length;
        if (dil === "") {
          return "";
        }
        const dot = text.substr(cursor, 1);
        cursor += dot.length;
        if (dot !== ".") {
          return "";
        }
        const dds = readDecimalDigits(text, cursor);
        cursor += dds.length;
        return dil + dot + dds + readExponentPart(text, cursor);
      }
      function readDecimalLiteral2(text, cursor) {
        const dot = text.substr(cursor, 1);
        cursor += dot.length;
        if (dot !== ".") {
          return "";
        }
        const dds = readDecimalDigits(text, cursor);
        cursor += dds.length;
        if (dds === "") {
          return "";
        }
        return dot + dds + readExponentPart(text, cursor);
      }
      function readDecimalLiteral3(text, cursor) {
        const dil = readDecimalIntegerLiteral(text, cursor);
        cursor += dil.length;
        if (dil === "") {
          return "";
        }
        return dil + readExponentPart(text, cursor);
      }
      const readDecimalLiteral = combineReader([
        readDecimalLiteral1,
        readDecimalLiteral2,
        readDecimalLiteral3
      ]);
      function parseBinaryDigits(text, cursor) {
        var _a;
        const m = text.substr(cursor).match(/^[01]+/);
        return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
      }
      function readBinaryIntegerLiteral(text, cursor) {
        const prefix = text.substr(cursor, 2);
        cursor += prefix.length;
        if (prefix.toLowerCase() !== "0b") {
          return "";
        }
        const bds = parseBinaryDigits(text, cursor);
        if (bds === "") {
          return "";
        }
        return prefix + bds;
      }
      function readOctalDigits(text, cursor) {
        var _a;
        const m = text.substr(cursor).match(/^[0-7]+/);
        return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
      }
      function readOctalIntegerLiteral(text, cursor) {
        const prefix = text.substr(cursor, 2);
        cursor += prefix.length;
        if (prefix.toLowerCase() !== "0o") {
          return "";
        }
        const ods = readOctalDigits(text, cursor);
        if (ods === "") {
          return "";
        }
        return prefix + ods;
      }
      function readHexDigits(text, cursor) {
        var _a;
        const m = text.substr(cursor).match(/^[0-9a-f]+/i);
        return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
      }
      function readHexIntegerLiteral(text, cursor) {
        const prefix = text.substr(cursor, 2);
        cursor += prefix.length;
        if (prefix.toLowerCase() !== "0x") {
          return "";
        }
        const hds = readHexDigits(text, cursor);
        if (hds === "") {
          return "";
        }
        return prefix + hds;
      }
      const readNonDecimalIntegerLiteral = combineReader([
        readBinaryIntegerLiteral,
        readOctalIntegerLiteral,
        readHexIntegerLiteral
      ]);
      const readNumericLiteral = combineReader([
        readNonDecimalIntegerLiteral,
        readDecimalLiteral
      ]);
      function parseLiteral(text, cursor) {
        const num = readNumericLiteral(text, cursor);
        cursor += num.length;
        if (num === "") {
          return null;
        }
        return {
          evaluable: new NumberLiteralNode(num),
          cursor
        };
      }
      function parseParenthesizedExpression(text, cursor) {
        const op = text.substr(cursor, 1);
        cursor += op.length;
        if (op !== "(") {
          return null;
        }
        const expr = parseExpression(text, cursor);
        if (!expr) {
          return null;
        }
        cursor = expr.cursor;
        cursor += readWhitespace(text, cursor).length;
        const cl = text.substr(cursor, 1);
        cursor += cl.length;
        if (cl !== ")") {
          return null;
        }
        return {
          evaluable: expr.evaluable,
          cursor
        };
      }
      function parsePrimaryExpression(text, cursor) {
        var _a;
        return (_a = parseLiteral(text, cursor)) !== null && _a !== void 0 ? _a : parseParenthesizedExpression(text, cursor);
      }
      function parseUnaryExpression(text, cursor) {
        const expr = parsePrimaryExpression(text, cursor);
        if (expr) {
          return expr;
        }
        const op = text.substr(cursor, 1);
        cursor += op.length;
        if (op !== "+" && op !== "-" && op !== "~") {
          return null;
        }
        const num = parseUnaryExpression(text, cursor);
        if (!num) {
          return null;
        }
        cursor = num.cursor;
        return {
          cursor,
          evaluable: new UnaryOperationNode(op, num.evaluable)
        };
      }
      function readBinaryOperator(ops, text, cursor) {
        cursor += readWhitespace(text, cursor).length;
        const op = ops.filter((op2) => text.startsWith(op2, cursor))[0];
        if (!op) {
          return null;
        }
        cursor += op.length;
        cursor += readWhitespace(text, cursor).length;
        return {
          cursor,
          operator: op
        };
      }
      function createBinaryOperationExpressionParser(exprParser, ops) {
        return (text, cursor) => {
          const firstExpr = exprParser(text, cursor);
          if (!firstExpr) {
            return null;
          }
          cursor = firstExpr.cursor;
          let expr = firstExpr.evaluable;
          for (; ; ) {
            const op = readBinaryOperator(ops, text, cursor);
            if (!op) {
              break;
            }
            cursor = op.cursor;
            const nextExpr = exprParser(text, cursor);
            if (!nextExpr) {
              return null;
            }
            cursor = nextExpr.cursor;
            expr = new BinaryOperationNode(op.operator, expr, nextExpr.evaluable);
          }
          return expr ? {
            cursor,
            evaluable: expr
          } : null;
        };
      }
      const parseBinaryOperationExpression = [
        ["**"],
        ["*", "/", "%"],
        ["+", "-"],
        ["<<", ">>>", ">>"],
        ["&"],
        ["^"],
        ["|"]
      ].reduce((parser, ops) => {
        return createBinaryOperationExpressionParser(parser, ops);
      }, parseUnaryExpression);
      function parseExpression(text, cursor) {
        cursor += readWhitespace(text, cursor).length;
        return parseBinaryOperationExpression(text, cursor);
      }
      function parseEcmaNumberExpression(text) {
        const expr = parseExpression(text, 0);
        if (!expr) {
          return null;
        }
        const cursor = expr.cursor + readWhitespace(text, expr.cursor).length;
        if (cursor !== text.length) {
          return null;
        }
        return expr.evaluable;
      }
      function parseNumber(text) {
        var _a;
        const r = parseEcmaNumberExpression(text);
        return (_a = r === null || r === void 0 ? void 0 : r.evaluate()) !== null && _a !== void 0 ? _a : null;
      }
      function numberFromUnknown(value) {
        if (typeof value === "number") {
          return value;
        }
        if (typeof value === "string") {
          const pv = parseNumber(value);
          if (!isEmpty(pv)) {
            return pv;
          }
        }
        return 0;
      }
      function createNumberFormatter(digits) {
        return (value) => {
          return value.toFixed(Math.max(Math.min(digits, 20), 0));
        };
      }
      const innerFormatter = createNumberFormatter(0);
      function formatPercentage(value) {
        return innerFormatter(value) + "%";
      }
      function stringFromUnknown(value) {
        return String(value);
      }
      function fillBuffer(buffer, bufferSize) {
        while (buffer.length < bufferSize) {
          buffer.push(void 0);
        }
      }
      function initializeBuffer(bufferSize) {
        const buffer = [];
        fillBuffer(buffer, bufferSize);
        return createValue(buffer);
      }
      function createTrimmedBuffer(buffer) {
        const index = buffer.indexOf(void 0);
        return forceCast(index < 0 ? buffer : buffer.slice(0, index));
      }
      function createPushedBuffer(buffer, newValue) {
        const newBuffer = [...createTrimmedBuffer(buffer), newValue];
        if (newBuffer.length > buffer.length) {
          newBuffer.splice(0, newBuffer.length - buffer.length);
        } else {
          fillBuffer(newBuffer, buffer.length);
        }
        return newBuffer;
      }
      function connectValues({ primary, secondary, forward, backward }) {
        let changing = false;
        function preventFeedback(callback) {
          if (changing) {
            return;
          }
          changing = true;
          callback();
          changing = false;
        }
        primary.emitter.on("change", (ev) => {
          preventFeedback(() => {
            secondary.setRawValue(forward(primary, secondary), ev.options);
          });
        });
        secondary.emitter.on("change", (ev) => {
          preventFeedback(() => {
            primary.setRawValue(backward(primary, secondary), ev.options);
          });
          preventFeedback(() => {
            secondary.setRawValue(forward(primary, secondary), ev.options);
          });
        });
        preventFeedback(() => {
          secondary.setRawValue(forward(primary, secondary), {
            forceEmit: false,
            last: true
          });
        });
      }
      function getStepForKey(baseStep, keys) {
        const step = baseStep * (keys.altKey ? 0.1 : 1) * (keys.shiftKey ? 10 : 1);
        if (keys.upKey) {
          return +step;
        } else if (keys.downKey) {
          return -step;
        }
        return 0;
      }
      function getVerticalStepKeys(ev) {
        return {
          altKey: ev.altKey,
          downKey: ev.key === "ArrowDown",
          shiftKey: ev.shiftKey,
          upKey: ev.key === "ArrowUp"
        };
      }
      function getHorizontalStepKeys(ev) {
        return {
          altKey: ev.altKey,
          downKey: ev.key === "ArrowLeft",
          shiftKey: ev.shiftKey,
          upKey: ev.key === "ArrowRight"
        };
      }
      function isVerticalArrowKey(key) {
        return key === "ArrowUp" || key === "ArrowDown";
      }
      function isArrowKey(key) {
        return isVerticalArrowKey(key) || key === "ArrowLeft" || key === "ArrowRight";
      }
      function computeOffset(ev, elem) {
        var _a, _b;
        const win = elem.ownerDocument.defaultView;
        const rect = elem.getBoundingClientRect();
        return {
          x: ev.pageX - (((_a = win && win.scrollX) !== null && _a !== void 0 ? _a : 0) + rect.left),
          y: ev.pageY - (((_b = win && win.scrollY) !== null && _b !== void 0 ? _b : 0) + rect.top)
        };
      }
      class PointerHandler {
        constructor(element) {
          this.lastTouch_ = null;
          this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this);
          this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this);
          this.onMouseDown_ = this.onMouseDown_.bind(this);
          this.onTouchEnd_ = this.onTouchEnd_.bind(this);
          this.onTouchMove_ = this.onTouchMove_.bind(this);
          this.onTouchStart_ = this.onTouchStart_.bind(this);
          this.elem_ = element;
          this.emitter = new Emitter();
          element.addEventListener("touchstart", this.onTouchStart_, {
            passive: false
          });
          element.addEventListener("touchmove", this.onTouchMove_, {
            passive: true
          });
          element.addEventListener("touchend", this.onTouchEnd_);
          element.addEventListener("mousedown", this.onMouseDown_);
        }
        computePosition_(offset) {
          const rect = this.elem_.getBoundingClientRect();
          return {
            bounds: {
              width: rect.width,
              height: rect.height
            },
            point: offset ? {
              x: offset.x,
              y: offset.y
            } : null
          };
        }
        onMouseDown_(ev) {
          var _a;
          ev.preventDefault();
          (_a = ev.currentTarget) === null || _a === void 0 ? void 0 : _a.focus();
          const doc = this.elem_.ownerDocument;
          doc.addEventListener("mousemove", this.onDocumentMouseMove_);
          doc.addEventListener("mouseup", this.onDocumentMouseUp_);
          this.emitter.emit("down", {
            altKey: ev.altKey,
            data: this.computePosition_(computeOffset(ev, this.elem_)),
            sender: this,
            shiftKey: ev.shiftKey
          });
        }
        onDocumentMouseMove_(ev) {
          this.emitter.emit("move", {
            altKey: ev.altKey,
            data: this.computePosition_(computeOffset(ev, this.elem_)),
            sender: this,
            shiftKey: ev.shiftKey
          });
        }
        onDocumentMouseUp_(ev) {
          const doc = this.elem_.ownerDocument;
          doc.removeEventListener("mousemove", this.onDocumentMouseMove_);
          doc.removeEventListener("mouseup", this.onDocumentMouseUp_);
          this.emitter.emit("up", {
            altKey: ev.altKey,
            data: this.computePosition_(computeOffset(ev, this.elem_)),
            sender: this,
            shiftKey: ev.shiftKey
          });
        }
        onTouchStart_(ev) {
          ev.preventDefault();
          const touch = ev.targetTouches.item(0);
          const rect = this.elem_.getBoundingClientRect();
          this.emitter.emit("down", {
            altKey: ev.altKey,
            data: this.computePosition_(touch ? {
              x: touch.clientX - rect.left,
              y: touch.clientY - rect.top
            } : void 0),
            sender: this,
            shiftKey: ev.shiftKey
          });
          this.lastTouch_ = touch;
        }
        onTouchMove_(ev) {
          const touch = ev.targetTouches.item(0);
          const rect = this.elem_.getBoundingClientRect();
          this.emitter.emit("move", {
            altKey: ev.altKey,
            data: this.computePosition_(touch ? {
              x: touch.clientX - rect.left,
              y: touch.clientY - rect.top
            } : void 0),
            sender: this,
            shiftKey: ev.shiftKey
          });
          this.lastTouch_ = touch;
        }
        onTouchEnd_(ev) {
          var _a;
          const touch = (_a = ev.targetTouches.item(0)) !== null && _a !== void 0 ? _a : this.lastTouch_;
          const rect = this.elem_.getBoundingClientRect();
          this.emitter.emit("up", {
            altKey: ev.altKey,
            data: this.computePosition_(touch ? {
              x: touch.clientX - rect.left,
              y: touch.clientY - rect.top
            } : void 0),
            sender: this,
            shiftKey: ev.shiftKey
          });
        }
      }
      function mapRange(value, start1, end1, start2, end2) {
        const p = (value - start1) / (end1 - start1);
        return start2 + p * (end2 - start2);
      }
      function getDecimalDigits(value) {
        const text = String(value.toFixed(10));
        const frac = text.split(".")[1];
        return frac.replace(/0+$/, "").length;
      }
      function constrainRange(value, min, max) {
        return Math.min(Math.max(value, min), max);
      }
      const className$a = ClassName("txt");
      class NumberTextView {
        constructor(doc, config) {
          this.onChange_ = this.onChange_.bind(this);
          this.props_ = config.props;
          this.props_.emitter.on("change", this.onChange_);
          this.element = doc.createElement("div");
          this.element.classList.add(className$a(), className$a(void 0, "num"));
          if (config.arrayPosition) {
            this.element.classList.add(className$a(void 0, config.arrayPosition));
          }
          config.viewProps.bindClassModifiers(this.element);
          const inputElem = doc.createElement("input");
          inputElem.classList.add(className$a("i"));
          inputElem.type = "text";
          config.viewProps.bindDisabled(inputElem);
          this.element.appendChild(inputElem);
          this.inputElement = inputElem;
          this.onDraggingChange_ = this.onDraggingChange_.bind(this);
          this.dragging_ = config.dragging;
          this.dragging_.emitter.on("change", this.onDraggingChange_);
          this.element.classList.add(className$a());
          this.inputElement.classList.add(className$a("i"));
          const knobElem = doc.createElement("div");
          knobElem.classList.add(className$a("k"));
          this.element.appendChild(knobElem);
          this.knobElement = knobElem;
          const guideElem = doc.createElementNS(SVG_NS, "svg");
          guideElem.classList.add(className$a("g"));
          this.knobElement.appendChild(guideElem);
          const bodyElem = doc.createElementNS(SVG_NS, "path");
          bodyElem.classList.add(className$a("gb"));
          guideElem.appendChild(bodyElem);
          this.guideBodyElem_ = bodyElem;
          const headElem = doc.createElementNS(SVG_NS, "path");
          headElem.classList.add(className$a("gh"));
          guideElem.appendChild(headElem);
          this.guideHeadElem_ = headElem;
          const tooltipElem = doc.createElement("div");
          tooltipElem.classList.add(ClassName("tt")());
          this.knobElement.appendChild(tooltipElem);
          this.tooltipElem_ = tooltipElem;
          config.value.emitter.on("change", this.onChange_);
          this.value = config.value;
          this.refresh();
        }
        onDraggingChange_(ev) {
          if (ev.rawValue === null) {
            this.element.classList.remove(className$a(void 0, "drg"));
            return;
          }
          this.element.classList.add(className$a(void 0, "drg"));
          const x = ev.rawValue / this.props_.get("draggingScale");
          const aox = x + (x > 0 ? -1 : x < 0 ? 1 : 0);
          const adx = constrainRange(-aox, -4, 4);
          this.guideHeadElem_.setAttributeNS(null, "d", [`M ${aox + adx},0 L${aox},4 L${aox + adx},8`, `M ${x},-1 L${x},9`].join(" "));
          this.guideBodyElem_.setAttributeNS(null, "d", `M 0,4 L${x},4`);
          const formatter = this.props_.get("formatter");
          this.tooltipElem_.textContent = formatter(this.value.rawValue);
          this.tooltipElem_.style.left = `${x}px`;
        }
        refresh() {
          const formatter = this.props_.get("formatter");
          this.inputElement.value = formatter(this.value.rawValue);
        }
        onChange_() {
          this.refresh();
        }
      }
      class NumberTextController {
        constructor(doc, config) {
          var _a;
          this.originRawValue_ = 0;
          this.onInputChange_ = this.onInputChange_.bind(this);
          this.onInputKeyDown_ = this.onInputKeyDown_.bind(this);
          this.onInputKeyUp_ = this.onInputKeyUp_.bind(this);
          this.onPointerDown_ = this.onPointerDown_.bind(this);
          this.onPointerMove_ = this.onPointerMove_.bind(this);
          this.onPointerUp_ = this.onPointerUp_.bind(this);
          this.baseStep_ = config.baseStep;
          this.parser_ = config.parser;
          this.props = config.props;
          this.sliderProps_ = (_a = config.sliderProps) !== null && _a !== void 0 ? _a : null;
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.dragging_ = createValue(null);
          this.view = new NumberTextView(doc, {
            arrayPosition: config.arrayPosition,
            dragging: this.dragging_,
            props: this.props,
            value: this.value,
            viewProps: this.viewProps
          });
          this.view.inputElement.addEventListener("change", this.onInputChange_);
          this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_);
          this.view.inputElement.addEventListener("keyup", this.onInputKeyUp_);
          const ph = new PointerHandler(this.view.knobElement);
          ph.emitter.on("down", this.onPointerDown_);
          ph.emitter.on("move", this.onPointerMove_);
          ph.emitter.on("up", this.onPointerUp_);
        }
        constrainValue_(value) {
          var _a, _b;
          const min = (_a = this.sliderProps_) === null || _a === void 0 ? void 0 : _a.get("minValue");
          const max = (_b = this.sliderProps_) === null || _b === void 0 ? void 0 : _b.get("maxValue");
          let v = value;
          if (min !== void 0) {
            v = Math.max(v, min);
          }
          if (max !== void 0) {
            v = Math.min(v, max);
          }
          return v;
        }
        onInputChange_(e) {
          const inputElem = forceCast(e.currentTarget);
          const value = inputElem.value;
          const parsedValue = this.parser_(value);
          if (!isEmpty(parsedValue)) {
            this.value.rawValue = this.constrainValue_(parsedValue);
          }
          this.view.refresh();
        }
        onInputKeyDown_(ev) {
          const step = getStepForKey(this.baseStep_, getVerticalStepKeys(ev));
          if (step === 0) {
            return;
          }
          this.value.setRawValue(this.constrainValue_(this.value.rawValue + step), {
            forceEmit: false,
            last: false
          });
        }
        onInputKeyUp_(ev) {
          const step = getStepForKey(this.baseStep_, getVerticalStepKeys(ev));
          if (step === 0) {
            return;
          }
          this.value.setRawValue(this.value.rawValue, {
            forceEmit: true,
            last: true
          });
        }
        onPointerDown_() {
          this.originRawValue_ = this.value.rawValue;
          this.dragging_.rawValue = 0;
        }
        computeDraggingValue_(data) {
          if (!data.point) {
            return null;
          }
          const dx = data.point.x - data.bounds.width / 2;
          return this.constrainValue_(this.originRawValue_ + dx * this.props.get("draggingScale"));
        }
        onPointerMove_(ev) {
          const v = this.computeDraggingValue_(ev.data);
          if (v === null) {
            return;
          }
          this.value.setRawValue(v, {
            forceEmit: false,
            last: false
          });
          this.dragging_.rawValue = this.value.rawValue - this.originRawValue_;
        }
        onPointerUp_(ev) {
          const v = this.computeDraggingValue_(ev.data);
          if (v === null) {
            return;
          }
          this.value.setRawValue(v, {
            forceEmit: true,
            last: true
          });
          this.dragging_.rawValue = null;
        }
      }
      function writePrimitive(target, value) {
        target.write(value);
      }
      function findStep(constraint) {
        const c = constraint ? findConstraint(constraint, StepConstraint) : null;
        if (!c) {
          return null;
        }
        return c.step;
      }
      function getSuitableDecimalDigits(constraint, rawValue) {
        const sc = constraint && findConstraint(constraint, StepConstraint);
        if (sc) {
          return getDecimalDigits(sc.step);
        }
        return Math.max(getDecimalDigits(rawValue), 2);
      }
      function getBaseStep(constraint) {
        const step = findStep(constraint);
        return step !== null && step !== void 0 ? step : 1;
      }
      function getSuitableDraggingScale(constraint, rawValue) {
        var _a;
        const sc = constraint && findConstraint(constraint, StepConstraint);
        const base = Math.abs((_a = sc === null || sc === void 0 ? void 0 : sc.step) !== null && _a !== void 0 ? _a : rawValue);
        return base === 0 ? 0.1 : Math.pow(10, Math.floor(Math.log10(base)) - 1);
      }
      function removeAlphaComponent(comps) {
        return [comps[0], comps[1], comps[2]];
      }
      function zerofill(comp) {
        const hex = constrainRange(Math.floor(comp), 0, 255).toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
      }
      function colorToHexRgbString(value, prefix = "#") {
        const hexes = removeAlphaComponent(value.getComponents("rgb")).map(zerofill).join("");
        return `${prefix}${hexes}`;
      }
      function colorToHexRgbaString(value, prefix = "#") {
        const rgbaComps = value.getComponents("rgb");
        const hexes = [rgbaComps[0], rgbaComps[1], rgbaComps[2], rgbaComps[3] * 255].map(zerofill).join("");
        return `${prefix}${hexes}`;
      }
      function colorToFunctionalRgbString(value, opt_type) {
        const formatter = createNumberFormatter(opt_type === "float" ? 2 : 0);
        const comps = removeAlphaComponent(value.getComponents("rgb", opt_type)).map((comp) => formatter(comp));
        return `rgb(${comps.join(", ")})`;
      }
      function createFunctionalRgbColorFormatter(type) {
        return (value) => {
          return colorToFunctionalRgbString(value, type);
        };
      }
      function colorToFunctionalRgbaString(value, opt_type) {
        const aFormatter = createNumberFormatter(2);
        const rgbFormatter = createNumberFormatter(opt_type === "float" ? 2 : 0);
        const comps = value.getComponents("rgb", opt_type).map((comp, index) => {
          const formatter = index === 3 ? aFormatter : rgbFormatter;
          return formatter(comp);
        });
        return `rgba(${comps.join(", ")})`;
      }
      function createFunctionalRgbaColorFormatter(type) {
        return (value) => {
          return colorToFunctionalRgbaString(value, type);
        };
      }
      function colorToFunctionalHslString(value) {
        const formatters = [
          createNumberFormatter(0),
          formatPercentage,
          formatPercentage
        ];
        const comps = removeAlphaComponent(value.getComponents("hsl")).map((comp, index) => formatters[index](comp));
        return `hsl(${comps.join(", ")})`;
      }
      function colorToFunctionalHslaString(value) {
        const formatters = [
          createNumberFormatter(0),
          formatPercentage,
          formatPercentage,
          createNumberFormatter(2)
        ];
        const comps = value.getComponents("hsl").map((comp, index) => formatters[index](comp));
        return `hsla(${comps.join(", ")})`;
      }
      function colorToObjectRgbString(value, type) {
        const formatter = createNumberFormatter(type === "float" ? 2 : 0);
        const names = ["r", "g", "b"];
        const comps = removeAlphaComponent(value.getComponents("rgb", type)).map((comp, index) => `${names[index]}: ${formatter(comp)}`);
        return `{${comps.join(", ")}}`;
      }
      function createObjectRgbColorFormatter(type) {
        return (value) => colorToObjectRgbString(value, type);
      }
      function colorToObjectRgbaString(value, type) {
        const aFormatter = createNumberFormatter(2);
        const rgbFormatter = createNumberFormatter(type === "float" ? 2 : 0);
        const names = ["r", "g", "b", "a"];
        const comps = value.getComponents("rgb", type).map((comp, index) => {
          const formatter = index === 3 ? aFormatter : rgbFormatter;
          return `${names[index]}: ${formatter(comp)}`;
        });
        return `{${comps.join(", ")}}`;
      }
      function createObjectRgbaColorFormatter(type) {
        return (value) => colorToObjectRgbaString(value, type);
      }
      [
        {
          format: {
            alpha: false,
            mode: "rgb",
            notation: "hex",
            type: "int"
          },
          stringifier: colorToHexRgbString
        },
        {
          format: {
            alpha: true,
            mode: "rgb",
            notation: "hex",
            type: "int"
          },
          stringifier: colorToHexRgbaString
        },
        {
          format: {
            alpha: false,
            mode: "hsl",
            notation: "func",
            type: "int"
          },
          stringifier: colorToFunctionalHslString
        },
        {
          format: {
            alpha: true,
            mode: "hsl",
            notation: "func",
            type: "int"
          },
          stringifier: colorToFunctionalHslaString
        },
        ...["int", "float"].reduce((prev, type) => {
          return [
            ...prev,
            {
              format: {
                alpha: false,
                mode: "rgb",
                notation: "func",
                type
              },
              stringifier: createFunctionalRgbColorFormatter(type)
            },
            {
              format: {
                alpha: true,
                mode: "rgb",
                notation: "func",
                type
              },
              stringifier: createFunctionalRgbaColorFormatter(type)
            },
            {
              format: {
                alpha: false,
                mode: "rgb",
                notation: "object",
                type
              },
              stringifier: createObjectRgbColorFormatter(type)
            },
            {
              format: {
                alpha: true,
                mode: "rgb",
                notation: "object",
                type
              },
              stringifier: createObjectRgbaColorFormatter(type)
            }
          ];
        }, [])
      ];
      class PointNdConstraint {
        constructor(config) {
          this.components = config.components;
          this.asm_ = config.assembly;
        }
        constrain(value) {
          const comps = this.asm_.toComponents(value).map((comp, index) => {
            var _a, _b;
            return (_b = (_a = this.components[index]) === null || _a === void 0 ? void 0 : _a.constrain(comp)) !== null && _b !== void 0 ? _b : comp;
          });
          return this.asm_.fromComponents(comps);
        }
      }
      const className$9 = ClassName("pndtxt");
      class PointNdTextView {
        constructor(doc, config) {
          this.textViews = config.textViews;
          this.element = doc.createElement("div");
          this.element.classList.add(className$9());
          this.textViews.forEach((v) => {
            const axisElem = doc.createElement("div");
            axisElem.classList.add(className$9("a"));
            axisElem.appendChild(v.element);
            this.element.appendChild(axisElem);
          });
        }
      }
      function createAxisController(doc, config, index) {
        return new NumberTextController(doc, {
          arrayPosition: index === 0 ? "fst" : index === config.axes.length - 1 ? "lst" : "mid",
          baseStep: config.axes[index].baseStep,
          parser: config.parser,
          props: config.axes[index].textProps,
          value: createValue(0, {
            constraint: config.axes[index].constraint
          }),
          viewProps: config.viewProps
        });
      }
      class PointNdTextController {
        constructor(doc, config) {
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.acs_ = config.axes.map((_, index) => createAxisController(doc, config, index));
          this.acs_.forEach((c, index) => {
            connectValues({
              primary: this.value,
              secondary: c.value,
              forward: (p) => {
                return config.assembly.toComponents(p.rawValue)[index];
              },
              backward: (p, s) => {
                const comps = config.assembly.toComponents(p.rawValue);
                comps[index] = s.rawValue;
                return config.assembly.fromComponents(comps);
              }
            });
          });
          this.view = new PointNdTextView(doc, {
            textViews: this.acs_.map((ac) => ac.view)
          });
        }
      }
      function createStepConstraint(params, initialValue) {
        if ("step" in params && !isEmpty(params.step)) {
          return new StepConstraint(params.step, initialValue);
        }
        return null;
      }
      function createRangeConstraint(params) {
        if (!isEmpty(params.max) && !isEmpty(params.min)) {
          return new DefiniteRangeConstraint({
            max: params.max,
            min: params.min
          });
        }
        if (!isEmpty(params.max) || !isEmpty(params.min)) {
          return new RangeConstraint({
            max: params.max,
            min: params.min
          });
        }
        return null;
      }
      const Constants = {
        monitor: {
          defaultInterval: 200,
          defaultLineCount: 3
        }
      };
      const className$8 = ClassName("grl");
      class GraphLogView {
        constructor(doc, config) {
          this.onCursorChange_ = this.onCursorChange_.bind(this);
          this.onValueUpdate_ = this.onValueUpdate_.bind(this);
          this.element = doc.createElement("div");
          this.element.classList.add(className$8());
          config.viewProps.bindClassModifiers(this.element);
          this.formatter_ = config.formatter;
          this.props_ = config.props;
          this.cursor_ = config.cursor;
          this.cursor_.emitter.on("change", this.onCursorChange_);
          const svgElem = doc.createElementNS(SVG_NS, "svg");
          svgElem.classList.add(className$8("g"));
          svgElem.style.height = `calc(var(--bld-us) * ${config.lineCount})`;
          this.element.appendChild(svgElem);
          this.svgElem_ = svgElem;
          const lineElem = doc.createElementNS(SVG_NS, "polyline");
          this.svgElem_.appendChild(lineElem);
          this.lineElem_ = lineElem;
          const tooltipElem = doc.createElement("div");
          tooltipElem.classList.add(className$8("t"), ClassName("tt")());
          this.element.appendChild(tooltipElem);
          this.tooltipElem_ = tooltipElem;
          config.value.emitter.on("change", this.onValueUpdate_);
          this.value = config.value;
          this.update_();
        }
        get graphElement() {
          return this.svgElem_;
        }
        update_() {
          const bounds = this.svgElem_.getBoundingClientRect();
          const maxIndex = this.value.rawValue.length - 1;
          const min = this.props_.get("minValue");
          const max = this.props_.get("maxValue");
          const points = [];
          this.value.rawValue.forEach((v, index) => {
            if (v === void 0) {
              return;
            }
            const x = mapRange(index, 0, maxIndex, 0, bounds.width);
            const y2 = mapRange(v, min, max, bounds.height, 0);
            points.push([x, y2].join(","));
          });
          this.lineElem_.setAttributeNS(null, "points", points.join(" "));
          const tooltipElem = this.tooltipElem_;
          const value = this.value.rawValue[this.cursor_.rawValue];
          if (value === void 0) {
            tooltipElem.classList.remove(className$8("t", "a"));
            return;
          }
          const tx = mapRange(this.cursor_.rawValue, 0, maxIndex, 0, bounds.width);
          const ty = mapRange(value, min, max, bounds.height, 0);
          tooltipElem.style.left = `${tx}px`;
          tooltipElem.style.top = `${ty}px`;
          tooltipElem.textContent = `${this.formatter_(value)}`;
          if (!tooltipElem.classList.contains(className$8("t", "a"))) {
            tooltipElem.classList.add(className$8("t", "a"), className$8("t", "in"));
            forceReflow(tooltipElem);
            tooltipElem.classList.remove(className$8("t", "in"));
          }
        }
        onValueUpdate_() {
          this.update_();
        }
        onCursorChange_() {
          this.update_();
        }
      }
      class GraphLogController {
        constructor(doc, config) {
          this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this);
          this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this);
          this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this);
          this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this);
          this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this);
          this.props_ = config.props;
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.cursor_ = createValue(-1);
          this.view = new GraphLogView(doc, {
            cursor: this.cursor_,
            formatter: config.formatter,
            lineCount: config.lineCount,
            props: this.props_,
            value: this.value,
            viewProps: this.viewProps
          });
          if (!supportsTouch(doc)) {
            this.view.element.addEventListener("mousemove", this.onGraphMouseMove_);
            this.view.element.addEventListener("mouseleave", this.onGraphMouseLeave_);
          } else {
            const ph = new PointerHandler(this.view.element);
            ph.emitter.on("down", this.onGraphPointerDown_);
            ph.emitter.on("move", this.onGraphPointerMove_);
            ph.emitter.on("up", this.onGraphPointerUp_);
          }
        }
        onGraphMouseLeave_() {
          this.cursor_.rawValue = -1;
        }
        onGraphMouseMove_(ev) {
          const bounds = this.view.element.getBoundingClientRect();
          this.cursor_.rawValue = Math.floor(mapRange(ev.offsetX, 0, bounds.width, 0, this.value.rawValue.length));
        }
        onGraphPointerDown_(ev) {
          this.onGraphPointerMove_(ev);
        }
        onGraphPointerMove_(ev) {
          if (!ev.data.point) {
            this.cursor_.rawValue = -1;
            return;
          }
          this.cursor_.rawValue = Math.floor(mapRange(ev.data.point.x, 0, ev.data.bounds.width, 0, this.value.rawValue.length));
        }
        onGraphPointerUp_() {
          this.cursor_.rawValue = -1;
        }
      }
      class ButtonCellApi {
        constructor(controller) {
          this.controller_ = controller;
        }
        get disabled() {
          return this.controller_.viewProps.get("disabled");
        }
        set disabled(disabled) {
          this.controller_.viewProps.set("disabled", disabled);
        }
        get title() {
          var _a;
          return (_a = this.controller_.props.get("title")) !== null && _a !== void 0 ? _a : "";
        }
        set title(title) {
          this.controller_.props.set("title", title);
        }
        on(eventName, handler) {
          const bh = handler.bind(this);
          const emitter = this.controller_.emitter;
          emitter.on(eventName, () => {
            bh(new TpEvent(this));
          });
          return this;
        }
      }
      class TpButtonGridEvent extends TpEvent {
        constructor(target, cell, index) {
          super(target);
          this.cell = cell;
          this.index = index;
        }
      }
      class ButtonGridApi extends BladeApi {
        constructor(controller) {
          super(controller);
          this.cellToApiMap_ = /* @__PURE__ */ new Map();
          this.emitter_ = new Emitter();
          const gc = this.controller_.valueController;
          gc.cellControllers.forEach((cc, i) => {
            const api = new ButtonCellApi(cc);
            this.cellToApiMap_.set(cc, api);
            cc.emitter.on("click", () => {
              const x = i % gc.size[0];
              const y2 = Math.floor(i / gc.size[0]);
              this.emitter_.emit("click", {
                event: new TpButtonGridEvent(this, api, [x, y2])
              });
            });
          });
        }
        cell(x, y2) {
          const gc = this.controller_.valueController;
          const cc = gc.cellControllers[y2 * gc.size[0] + x];
          return this.cellToApiMap_.get(cc);
        }
        on(eventName, handler) {
          const bh = handler.bind(this);
          this.emitter_.on(eventName, (ev) => {
            bh(ev.event);
          });
          return this;
        }
      }
      class ButtonGridController {
        constructor(doc, config) {
          this.size = config.size;
          const [w, h] = this.size;
          const bcs = [];
          for (let y2 = 0; y2 < h; y2++) {
            for (let x = 0; x < w; x++) {
              const bc = new ButtonController(doc, {
                props: ValueMap.fromObject(Object.assign({}, config.cellConfig(x, y2))),
                viewProps: ViewProps.create()
              });
              bcs.push(bc);
            }
          }
          this.cellCs_ = bcs;
          this.viewProps = ViewProps.create();
          this.viewProps.handleDispose(() => {
            this.cellCs_.forEach((c) => {
              c.viewProps.set("disposed", true);
            });
          });
          this.view = new PlainView(doc, {
            viewProps: this.viewProps,
            viewName: "btngrid"
          });
          this.view.element.style.gridTemplateColumns = `repeat(${w}, 1fr)`;
          this.cellCs_.forEach((bc) => {
            this.view.element.appendChild(bc.view.element);
          });
        }
        get cellControllers() {
          return this.cellCs_;
        }
      }
      const ButtonGridBladePlugin = {
        id: "buttongrid",
        type: "blade",
        // TODO:
        css: '.tp-cbzgv,.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-radv_b:hover,.tp-rslv_k:hover,.tp-cbzv_b:hover{background-color:var(--btn-bg-h)}.tp-radv_b:focus,.tp-rslv_k:focus,.tp-cbzv_b:focus{background-color:var(--btn-bg-f)}.tp-radv_b:active,.tp-rslv_k:active,.tp-cbzv_b:active{background-color:var(--btn-bg-a)}.tp-radv_b:disabled,.tp-rslv_k:disabled,.tp-cbzv_b:disabled{opacity:.5}.tp-cbzgv{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-cbzgv:hover{background-color:var(--in-bg-h)}.tp-cbzgv:focus{background-color:var(--in-bg-f)}.tp-cbzgv:active{background-color:var(--in-bg-a)}.tp-cbzgv:disabled{opacity:.5}.tp-btngridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-btngridv.tp-v-disabled{opacity:.5}.tp-btngridv .tp-btnv_b:disabled{opacity:1}.tp-btngridv .tp-btnv_b:disabled .tp-btnv_t{opacity:.5}.tp-btngridv .tp-btnv_b{border-radius:0}.tp-cbzv{position:relative}.tp-cbzv_h{display:flex}.tp-cbzv_b{margin-right:4px;position:relative;width:var(--bld-us)}.tp-cbzv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-cbzv_b svg path{stroke:var(--bs-bg);stroke-width:2}.tp-cbzv_t{flex:1}.tp-cbzv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-cbzv.tp-cbzv-expanded .tp-cbzv_p{margin-top:var(--bld-s);opacity:1}.tp-cbzv.tp-cbzv-cpl .tp-cbzv_p{overflow:visible}.tp-cbzv .tp-popv{left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-cbzpv_t{margin-top:var(--bld-s)}.tp-cbzgv{height:auto;overflow:hidden;position:relative}.tp-cbzgv.tp-v-disabled{opacity:.5}.tp-cbzgv_p{left:16px;position:absolute;right:16px;top:0}.tp-cbzgv_g{cursor:pointer;display:block;height:calc(var(--bld-us)*5);width:100%}.tp-cbzgv_u{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_l{fill:rgba(0,0,0,0);stroke:var(--in-fg)}.tp-cbzgv_v{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_h{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;pointer-events:none;position:absolute;width:4px}.tp-cbzgv:focus .tp-cbzgv_h-sel{background-color:var(--in-fg);border-width:0}.tp-cbzprvv{cursor:pointer;height:4px;padding:4px 0;position:relative}.tp-cbzprvv_g{display:block;height:100%;overflow:visible;width:100%}.tp-cbzprvv_t{opacity:.5;stroke:var(--mo-fg)}.tp-cbzprvv_m{background-color:var(--mo-fg);border-radius:50%;height:4px;margin-left:-2px;margin-top:-2px;opacity:0;position:absolute;top:50%;transition:opacity .2s ease-out;width:4px}.tp-cbzprvv_m.tp-cbzprvv_m-a{opacity:1}.tp-fpsv{position:relative}.tp-fpsv_l{bottom:4px;color:var(--mo-fg);line-height:1;right:4px;pointer-events:none;position:absolute}.tp-fpsv_u{margin-left:.2em;opacity:.7}.tp-rslv{cursor:pointer;padding-left:8px;padding-right:8px}.tp-rslv.tp-v-disabled{opacity:.5}.tp-rslv_t{height:calc(var(--bld-us));position:relative}.tp-rslv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:-4px;right:-4px}.tp-rslv_b{bottom:0;top:0;position:absolute}.tp-rslv_b::before{background-color:var(--in-fg);content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:0;right:0}.tp-rslv_k{height:calc(var(--bld-us) - 8px);margin-top:calc((var(--bld-us) - 8px)/-2);position:absolute;top:50%;width:8px}.tp-rslv_k.tp-rslv_k-min{margin-left:-8px}.tp-rslv_k.tp-rslv_k-max{margin-left:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-min{border-bottom-right-radius:0;border-top-right-radius:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-max{border-bottom-left-radius:0;border-top-left-radius:0}.tp-rsltxtv{display:flex}.tp-rsltxtv_s{flex:1}.tp-rsltxtv_t{flex:1;margin-left:4px}.tp-radv_l{display:block;position:relative}.tp-radv_i{left:0;opacity:0;position:absolute;top:0}.tp-radv_b{opacity:.5}.tp-radv_i:hover+.tp-radv_b{background-color:var(--btn-bg-h)}.tp-radv_i:focus+.tp-radv_b{background-color:var(--btn-bg-f)}.tp-radv_i:active+.tp-radv_b{background-color:var(--btn-bg-a)}.tp-radv_i:checked+.tp-radv_b{opacity:1}.tp-radv_t{bottom:0;color:inherit;left:0;overflow:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0}.tp-radv_i:disabled+.tp-radv_b>.tp-radv_t{opacity:.5}.tp-radgridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-radgridv.tp-v-disabled{opacity:.5}.tp-radgridv .tp-radv_b{border-radius:0}',
        accept(params) {
          const p = ParamsParsers;
          const result = parseParams(params, {
            cells: p.required.function,
            size: p.required.array(p.required.number),
            view: p.required.constant("buttongrid"),
            label: p.optional.string
          });
          return result ? { params: result } : null;
        },
        controller(args) {
          return new LabelController(args.document, {
            blade: args.blade,
            props: ValueMap.fromObject({
              label: args.params.label
            }),
            valueController: new ButtonGridController(args.document, {
              cellConfig: args.params.cells,
              size: args.params.size
            })
          });
        },
        api(args) {
          if (!(args.controller instanceof LabelController)) {
            return null;
          }
          if (!(args.controller.valueController instanceof ButtonGridController)) {
            return null;
          }
          return new ButtonGridApi(args.controller);
        }
      };
      class CubicBezierApi extends BladeApi {
        get label() {
          return this.controller_.props.get("label");
        }
        set label(label) {
          this.controller_.props.set("label", label);
        }
        get value() {
          return this.controller_.valueController.value.rawValue;
        }
        set value(value) {
          this.controller_.valueController.value.rawValue = value;
        }
        on(eventName, handler) {
          const bh = handler.bind(this);
          this.controller_.valueController.value.emitter.on(eventName, (ev) => {
            bh(new TpChangeEvent(this, ev.rawValue, void 0, ev.options.last));
          });
          return this;
        }
      }
      function interpolate(x1, x2, t) {
        return x1 * (1 - t) + x2 * t;
      }
      const MAX_ITERATION = 20;
      const X_DELTA = 1e-3;
      const CACHE_RESOLUTION = 100;
      function y(cb, x) {
        let dt = 0.25;
        let t = 0.5;
        let y2 = -1;
        for (let i = 0; i < MAX_ITERATION; i++) {
          const [tx, ty] = cb.curve(t);
          t += dt * (tx < x ? 1 : -1);
          y2 = ty;
          dt *= 0.5;
          if (Math.abs(x - tx) < X_DELTA) {
            break;
          }
        }
        return y2;
      }
      class CubicBezier {
        constructor(x1 = 0, y1 = 0, x2 = 1, y2 = 1) {
          this.cache_ = [];
          this.comps_ = [x1, y1, x2, y2];
        }
        get x1() {
          return this.comps_[0];
        }
        get y1() {
          return this.comps_[1];
        }
        get x2() {
          return this.comps_[2];
        }
        get y2() {
          return this.comps_[3];
        }
        static isObject(obj) {
          if (isEmpty(obj)) {
            return false;
          }
          if (!Array.isArray(obj)) {
            return false;
          }
          return typeof obj[0] === "number" && typeof obj[1] === "number" && typeof obj[2] === "number" && typeof obj[3] === "number";
        }
        static equals(v1, v2) {
          return v1.x1 === v2.x1 && v1.y1 === v2.y1 && v1.x2 === v2.x2 && v1.y2 === v2.y2;
        }
        curve(t) {
          const x01 = interpolate(0, this.x1, t);
          const y01 = interpolate(0, this.y1, t);
          const x12 = interpolate(this.x1, this.x2, t);
          const y12 = interpolate(this.y1, this.y2, t);
          const x23 = interpolate(this.x2, 1, t);
          const y23 = interpolate(this.y2, 1, t);
          const xr0 = interpolate(x01, x12, t);
          const yr0 = interpolate(y01, y12, t);
          const xr1 = interpolate(x12, x23, t);
          const yr1 = interpolate(y12, y23, t);
          return [interpolate(xr0, xr1, t), interpolate(yr0, yr1, t)];
        }
        y(x) {
          if (this.cache_.length === 0) {
            const cache = [];
            for (let i = 0; i < CACHE_RESOLUTION; i++) {
              cache.push(y(this, mapRange(i, 0, CACHE_RESOLUTION - 1, 0, 1)));
            }
            this.cache_ = cache;
          }
          return this.cache_[Math.round(mapRange(constrainRange(x, 0, 1), 0, 1, 0, CACHE_RESOLUTION - 1))];
        }
        toObject() {
          return [this.comps_[0], this.comps_[1], this.comps_[2], this.comps_[3]];
        }
      }
      const CubicBezierAssembly = {
        toComponents: (p) => p.toObject(),
        fromComponents: (comps) => new CubicBezier(...comps)
      };
      function cubicBezierToString(cb) {
        const formatter = createNumberFormatter(2);
        const comps = cb.toObject().map((c) => formatter(c));
        return `cubic-bezier(${comps.join(", ")})`;
      }
      const COMPS_EMPTY = [0, 0.5, 0.5, 1];
      function cubicBezierFromString(text) {
        const m = text.match(/^cubic-bezier\s*\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*\)$/);
        if (!m) {
          return new CubicBezier(...COMPS_EMPTY);
        }
        const comps = [m[1], m[2], m[3], m[4]].reduce((comps2, comp) => {
          if (!comps2) {
            return null;
          }
          const n = Number(comp);
          if (isNaN(n)) {
            return null;
          }
          return [...comps2, n];
        }, []);
        return new CubicBezier(...comps !== null && comps !== void 0 ? comps : COMPS_EMPTY);
      }
      const className$7 = ClassName("cbz");
      class CubicBezierView {
        constructor(doc, config) {
          this.element = doc.createElement("div");
          this.element.classList.add(className$7());
          config.viewProps.bindClassModifiers(this.element);
          config.foldable.bindExpandedClass(this.element, className$7(void 0, "expanded"));
          bindValueMap(config.foldable, "completed", valueToClassName(this.element, className$7(void 0, "cpl")));
          const headElem = doc.createElement("div");
          headElem.classList.add(className$7("h"));
          this.element.appendChild(headElem);
          const buttonElem = doc.createElement("button");
          buttonElem.classList.add(className$7("b"));
          config.viewProps.bindDisabled(buttonElem);
          const iconElem = doc.createElementNS(SVG_NS, "svg");
          iconElem.innerHTML = '<path d="M2 13C8 13 8 3 14 3"/>';
          buttonElem.appendChild(iconElem);
          headElem.appendChild(buttonElem);
          this.buttonElement = buttonElem;
          const textElem = doc.createElement("div");
          textElem.classList.add(className$7("t"));
          headElem.appendChild(textElem);
          this.textElement = textElem;
          if (config.pickerLayout === "inline") {
            const pickerElem = doc.createElement("div");
            pickerElem.classList.add(className$7("p"));
            this.element.appendChild(pickerElem);
            this.pickerElement = pickerElem;
          } else {
            this.pickerElement = null;
          }
        }
      }
      const className$6 = ClassName("cbzp");
      class CubicBezierPickerView {
        constructor(doc, config) {
          this.element = doc.createElement("div");
          this.element.classList.add(className$6());
          config.viewProps.bindClassModifiers(this.element);
          const graphElem = doc.createElement("div");
          graphElem.classList.add(className$6("g"));
          this.element.appendChild(graphElem);
          this.graphElement = graphElem;
          const textElem = doc.createElement("div");
          textElem.classList.add(className$6("t"));
          this.element.appendChild(textElem);
          this.textElement = textElem;
        }
      }
      function waitToBeAddedToDom(elem, callback) {
        const ob = new MutationObserver((ml) => {
          for (const m of ml) {
            if (m.type !== "childList") {
              continue;
            }
            m.addedNodes.forEach((elem2) => {
              if (!elem2.contains(elem2)) {
                return;
              }
              callback();
              ob.disconnect();
            });
          }
        });
        const doc = elem.ownerDocument;
        ob.observe(doc.body, {
          attributes: true,
          childList: true,
          subtree: true
        });
      }
      const className$5 = ClassName("cbzg");
      function compose(h1, h2) {
        return (input) => h2(h1(input));
      }
      class CubicBezierGraphView {
        constructor(doc, config) {
          this.element = doc.createElement("div");
          this.element.classList.add(className$5());
          config.viewProps.bindClassModifiers(this.element);
          config.viewProps.bindTabIndex(this.element);
          const previewElem = doc.createElement("div");
          previewElem.classList.add(className$5("p"));
          this.element.appendChild(previewElem);
          this.previewElement = previewElem;
          const svgElem = doc.createElementNS(SVG_NS, "svg");
          svgElem.classList.add(className$5("g"));
          this.element.appendChild(svgElem);
          this.svgElem_ = svgElem;
          const guideElem = doc.createElementNS(SVG_NS, "path");
          guideElem.classList.add(className$5("u"));
          this.svgElem_.appendChild(guideElem);
          this.guideElem_ = guideElem;
          const lineElem = doc.createElementNS(SVG_NS, "polyline");
          lineElem.classList.add(className$5("l"));
          this.svgElem_.appendChild(lineElem);
          this.lineElem_ = lineElem;
          this.handleElems_ = [doc.createElement("div"), doc.createElement("div")];
          this.handleElems_.forEach((elem) => {
            elem.classList.add(className$5("h"));
            this.element.appendChild(elem);
          });
          this.vectorElems_ = [
            doc.createElementNS(SVG_NS, "line"),
            doc.createElementNS(SVG_NS, "line")
          ];
          this.vectorElems_.forEach((elem) => {
            elem.classList.add(className$5("v"));
            this.svgElem_.appendChild(elem);
          });
          this.value_ = config.value;
          this.value_.emitter.on("change", this.onValueChange_.bind(this));
          this.sel_ = config.selection;
          this.handleElems_.forEach((elem, index) => {
            bindValue(this.sel_, compose((selection) => selection === index, valueToClassName(elem, className$5("h", "sel"))));
          });
          waitToBeAddedToDom(this.element, () => {
            this.refresh();
          });
        }
        getVertMargin_(h) {
          return h * 0.25;
        }
        valueToPosition(x, y2) {
          const bounds = this.element.getBoundingClientRect();
          const w = bounds.width;
          const h = bounds.height;
          const vm = this.getVertMargin_(h);
          return {
            x: mapRange(x, 0, 1, 0, w),
            y: mapRange(y2, 0, 1, h - vm, vm)
          };
        }
        positionToValue(x, y2) {
          const bounds = this.element.getBoundingClientRect();
          const w = bounds.width;
          const h = bounds.height;
          const vm = this.getVertMargin_(h);
          return {
            x: constrainRange(mapRange(x, 0, w, 0, 1), 0, 1),
            y: mapRange(y2, h - vm, vm, 0, 1)
          };
        }
        refresh() {
          this.guideElem_.setAttributeNS(null, "d", [0, 1].map((index) => {
            const p1 = this.valueToPosition(0, index);
            const p2 = this.valueToPosition(1, index);
            return [`M ${p1.x},${p1.y}`, `L ${p2.x},${p2.y}`].join(" ");
          }).join(" "));
          const bezier = this.value_.rawValue;
          const points = [];
          let t = 0;
          for (; ; ) {
            const p = this.valueToPosition(...bezier.curve(t));
            points.push([p.x, p.y].join(","));
            if (t >= 1) {
              break;
            }
            t = Math.min(t + 0.05, 1);
          }
          this.lineElem_.setAttributeNS(null, "points", points.join(" "));
          const obj = bezier.toObject();
          [0, 1].forEach((index) => {
            const p1 = this.valueToPosition(index, index);
            const p2 = this.valueToPosition(obj[index * 2], obj[index * 2 + 1]);
            const vElem = this.vectorElems_[index];
            vElem.setAttributeNS(null, "x1", String(p1.x));
            vElem.setAttributeNS(null, "y1", String(p1.y));
            vElem.setAttributeNS(null, "x2", String(p2.x));
            vElem.setAttributeNS(null, "y2", String(p2.y));
            const hElem = this.handleElems_[index];
            hElem.style.left = `${p2.x}px`;
            hElem.style.top = `${p2.y}px`;
          });
        }
        onValueChange_() {
          this.refresh();
        }
      }
      const TICK_COUNT = 24;
      const PREVIEW_DELAY = 400;
      const PREVIEW_DURATION = 1e3;
      const className$4 = ClassName("cbzprv");
      class CubicBezierPreviewView {
        constructor(doc, config) {
          this.stopped_ = true;
          this.startTime_ = -1;
          this.onDispose_ = this.onDispose_.bind(this);
          this.onTimer_ = this.onTimer_.bind(this);
          this.onValueChange_ = this.onValueChange_.bind(this);
          this.element = doc.createElement("div");
          this.element.classList.add(className$4());
          config.viewProps.bindClassModifiers(this.element);
          const svgElem = doc.createElementNS(SVG_NS, "svg");
          svgElem.classList.add(className$4("g"));
          this.element.appendChild(svgElem);
          this.svgElem_ = svgElem;
          const ticksElem = doc.createElementNS(SVG_NS, "path");
          ticksElem.classList.add(className$4("t"));
          this.svgElem_.appendChild(ticksElem);
          this.ticksElem_ = ticksElem;
          const markerElem = doc.createElement("div");
          markerElem.classList.add(className$4("m"));
          this.element.appendChild(markerElem);
          this.markerElem_ = markerElem;
          this.value_ = config.value;
          this.value_.emitter.on("change", this.onValueChange_);
          config.viewProps.handleDispose(this.onDispose_);
          waitToBeAddedToDom(this.element, () => {
            this.refresh();
          });
        }
        play() {
          this.stop();
          this.updateMarker_(0);
          this.markerElem_.classList.add(className$4("m", "a"));
          this.startTime_ = (/* @__PURE__ */ new Date()).getTime() + PREVIEW_DELAY;
          this.stopped_ = false;
          requestAnimationFrame(this.onTimer_);
        }
        stop() {
          this.stopped_ = true;
          this.markerElem_.classList.remove(className$4("m", "a"));
        }
        onDispose_() {
          this.stop();
        }
        updateMarker_(progress) {
          const p = this.value_.rawValue.y(constrainRange(progress, 0, 1));
          this.markerElem_.style.left = `${p * 100}%`;
        }
        refresh() {
          const bounds = this.svgElem_.getBoundingClientRect();
          const w = bounds.width;
          const h = bounds.height;
          const ds = [];
          const bezier = this.value_.rawValue;
          for (let i = 0; i < TICK_COUNT; i++) {
            const px = mapRange(i, 0, TICK_COUNT - 1, 0, 1);
            const x = mapRange(bezier.y(px), 0, 1, 0, w);
            ds.push(`M ${x},0 v${h}`);
          }
          this.ticksElem_.setAttributeNS(null, "d", ds.join(" "));
        }
        onTimer_() {
          if (this.startTime_ === null) {
            return;
          }
          const dt = (/* @__PURE__ */ new Date()).getTime() - this.startTime_;
          const p = dt / PREVIEW_DURATION;
          this.updateMarker_(p);
          if (dt > PREVIEW_DURATION + PREVIEW_DELAY) {
            this.stop();
          }
          if (!this.stopped_) {
            requestAnimationFrame(this.onTimer_);
          }
        }
        onValueChange_() {
          this.refresh();
          this.play();
        }
      }
      function getDistance(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
      }
      function lockAngle(x1, y1, x2, y2) {
        const d = getDistance(x1, y1, x2, y2);
        const a = Math.atan2(y2 - y1, x2 - x1);
        const la = Math.round(a / (Math.PI / 4)) * Math.PI / 4;
        return {
          x: x1 + Math.cos(la) * d,
          y: y1 + Math.sin(la) * d
        };
      }
      class CubicBezierGraphController {
        constructor(doc, config) {
          this.onKeyDown_ = this.onKeyDown_.bind(this);
          this.onKeyUp_ = this.onKeyUp_.bind(this);
          this.onPointerDown_ = this.onPointerDown_.bind(this);
          this.onPointerMove_ = this.onPointerMove_.bind(this);
          this.onPointerUp_ = this.onPointerUp_.bind(this);
          this.baseStep_ = config.baseStep;
          this.value = config.value;
          this.sel_ = createValue(0);
          this.viewProps = config.viewProps;
          this.view = new CubicBezierGraphView(doc, {
            selection: this.sel_,
            value: this.value,
            viewProps: this.viewProps
          });
          this.view.element.addEventListener("keydown", this.onKeyDown_);
          this.view.element.addEventListener("keyup", this.onKeyUp_);
          this.prevView_ = new CubicBezierPreviewView(doc, {
            value: this.value,
            viewProps: this.viewProps
          });
          this.prevView_.element.addEventListener("mousedown", (ev) => {
            ev.stopImmediatePropagation();
            ev.preventDefault();
            this.prevView_.play();
          });
          this.view.previewElement.appendChild(this.prevView_.element);
          const ptHandler = new PointerHandler(this.view.element);
          ptHandler.emitter.on("down", this.onPointerDown_);
          ptHandler.emitter.on("move", this.onPointerMove_);
          ptHandler.emitter.on("up", this.onPointerUp_);
        }
        refresh() {
          this.view.refresh();
          this.prevView_.refresh();
          this.prevView_.play();
        }
        updateValue_(point, locksAngle, opts) {
          const index = this.sel_.rawValue;
          const comps = this.value.rawValue.toObject();
          const vp = this.view.positionToValue(point.x, point.y);
          const v = locksAngle ? lockAngle(index, index, vp.x, vp.y) : vp;
          comps[index * 2] = v.x;
          comps[index * 2 + 1] = v.y;
          this.value.setRawValue(new CubicBezier(...comps), opts);
        }
        onPointerDown_(ev) {
          const data = ev.data;
          if (!data.point) {
            return;
          }
          const bezier = this.value.rawValue;
          const p1 = this.view.valueToPosition(bezier.x1, bezier.y1);
          const d1 = getDistance(data.point.x, data.point.y, p1.x, p1.y);
          const p2 = this.view.valueToPosition(bezier.x2, bezier.y2);
          const d2 = getDistance(data.point.x, data.point.y, p2.x, p2.y);
          this.sel_.rawValue = d1 <= d2 ? 0 : 1;
          this.updateValue_(data.point, ev.shiftKey, {
            forceEmit: false,
            last: false
          });
        }
        onPointerMove_(ev) {
          const data = ev.data;
          if (!data.point) {
            return;
          }
          this.updateValue_(data.point, ev.shiftKey, {
            forceEmit: false,
            last: false
          });
        }
        onPointerUp_(ev) {
          const data = ev.data;
          if (!data.point) {
            return;
          }
          this.updateValue_(data.point, ev.shiftKey, {
            forceEmit: true,
            last: true
          });
        }
        onKeyDown_(ev) {
          if (isArrowKey(ev.key)) {
            ev.preventDefault();
          }
          const index = this.sel_.rawValue;
          const comps = this.value.rawValue.toObject();
          comps[index * 2] += getStepForKey(this.baseStep_, getHorizontalStepKeys(ev));
          comps[index * 2 + 1] += getStepForKey(this.baseStep_, getVerticalStepKeys(ev));
          this.value.setRawValue(new CubicBezier(...comps), {
            forceEmit: false,
            last: false
          });
        }
        onKeyUp_(ev) {
          if (isArrowKey(ev.key)) {
            ev.preventDefault();
          }
          const xStep = getStepForKey(this.baseStep_, getHorizontalStepKeys(ev));
          const yStep = getStepForKey(this.baseStep_, getVerticalStepKeys(ev));
          if (xStep === 0 && yStep === 0) {
            return;
          }
          this.value.setRawValue(this.value.rawValue, {
            forceEmit: true,
            last: true
          });
        }
      }
      class CubicBezierPickerController {
        constructor(doc, config) {
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.view = new CubicBezierPickerView(doc, {
            viewProps: this.viewProps
          });
          this.gc_ = new CubicBezierGraphController(doc, {
            baseStep: config.axis.baseStep,
            value: this.value,
            viewProps: this.viewProps
          });
          this.view.graphElement.appendChild(this.gc_.view.element);
          const xAxis = Object.assign(Object.assign({}, config.axis), { constraint: new RangeConstraint({ max: 1, min: 0 }) });
          const yAxis = Object.assign(Object.assign({}, config.axis), { constraint: void 0 });
          this.tc_ = new PointNdTextController(doc, {
            assembly: CubicBezierAssembly,
            axes: [xAxis, yAxis, xAxis, yAxis],
            parser: parseNumber,
            value: this.value,
            viewProps: this.viewProps
          });
          this.view.textElement.appendChild(this.tc_.view.element);
        }
        get allFocusableElements() {
          return [
            this.gc_.view.element,
            ...this.tc_.view.textViews.map((v) => v.inputElement)
          ];
        }
        refresh() {
          this.gc_.refresh();
        }
      }
      class CubicBezierController {
        constructor(doc, config) {
          this.onButtonBlur_ = this.onButtonBlur_.bind(this);
          this.onButtonClick_ = this.onButtonClick_.bind(this);
          this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this);
          this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this);
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.foldable_ = createFoldable(config.expanded);
          this.view = new CubicBezierView(doc, {
            foldable: this.foldable_,
            pickerLayout: config.pickerLayout,
            viewProps: this.viewProps
          });
          this.view.buttonElement.addEventListener("blur", this.onButtonBlur_);
          this.view.buttonElement.addEventListener("click", this.onButtonClick_);
          this.tc_ = new TextController(doc, {
            parser: cubicBezierFromString,
            props: ValueMap.fromObject({
              formatter: cubicBezierToString
            }),
            value: this.value,
            viewProps: this.viewProps
          });
          this.view.textElement.appendChild(this.tc_.view.element);
          this.popC_ = config.pickerLayout === "popup" ? new PopupController(doc, {
            viewProps: this.viewProps
          }) : null;
          const pickerC = new CubicBezierPickerController(doc, {
            axis: config.axis,
            value: this.value,
            viewProps: this.viewProps
          });
          pickerC.allFocusableElements.forEach((elem) => {
            elem.addEventListener("blur", this.onPopupChildBlur_);
            elem.addEventListener("keydown", this.onPopupChildKeydown_);
          });
          this.pickerC_ = pickerC;
          if (this.popC_) {
            this.view.element.appendChild(this.popC_.view.element);
            this.popC_.view.element.appendChild(this.pickerC_.view.element);
            bindValue(this.popC_.shows, (shows) => {
              if (shows) {
                pickerC.refresh();
              }
            });
            connectValues({
              primary: this.foldable_.value("expanded"),
              secondary: this.popC_.shows,
              forward: (p) => p.rawValue,
              backward: (_, s) => s.rawValue
            });
          } else if (this.view.pickerElement) {
            this.view.pickerElement.appendChild(this.pickerC_.view.element);
            bindFoldable(this.foldable_, this.view.pickerElement);
          }
        }
        onButtonBlur_(ev) {
          if (!this.popC_) {
            return;
          }
          const nextTarget = forceCast(ev.relatedTarget);
          if (!nextTarget || !this.popC_.view.element.contains(nextTarget)) {
            this.popC_.shows.rawValue = false;
          }
        }
        onButtonClick_() {
          this.foldable_.set("expanded", !this.foldable_.get("expanded"));
          if (this.foldable_.get("expanded")) {
            this.pickerC_.allFocusableElements[0].focus();
          }
        }
        onPopupChildBlur_(ev) {
          if (!this.popC_) {
            return;
          }
          const elem = this.popC_.view.element;
          const nextTarget = findNextTarget(ev);
          if (nextTarget && elem.contains(nextTarget)) {
            return;
          }
          if (nextTarget && nextTarget === this.view.buttonElement && !supportsTouch(elem.ownerDocument)) {
            return;
          }
          this.popC_.shows.rawValue = false;
        }
        onPopupChildKeydown_(ev) {
          if (!this.popC_) {
            return;
          }
          if (ev.key === "Escape") {
            this.popC_.shows.rawValue = false;
          }
        }
      }
      function createConstraint$1() {
        return new PointNdConstraint({
          assembly: CubicBezierAssembly,
          components: [0, 1, 2, 3].map((index) => index % 2 === 0 ? new RangeConstraint({
            min: 0,
            max: 1
          }) : void 0)
        });
      }
      const CubicBezierBladePlugin = {
        id: "cubic-bezier",
        type: "blade",
        css: '.tp-cbzgv,.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-radv_b:hover,.tp-rslv_k:hover,.tp-cbzv_b:hover{background-color:var(--btn-bg-h)}.tp-radv_b:focus,.tp-rslv_k:focus,.tp-cbzv_b:focus{background-color:var(--btn-bg-f)}.tp-radv_b:active,.tp-rslv_k:active,.tp-cbzv_b:active{background-color:var(--btn-bg-a)}.tp-radv_b:disabled,.tp-rslv_k:disabled,.tp-cbzv_b:disabled{opacity:.5}.tp-cbzgv{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-cbzgv:hover{background-color:var(--in-bg-h)}.tp-cbzgv:focus{background-color:var(--in-bg-f)}.tp-cbzgv:active{background-color:var(--in-bg-a)}.tp-cbzgv:disabled{opacity:.5}.tp-btngridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-btngridv.tp-v-disabled{opacity:.5}.tp-btngridv .tp-btnv_b:disabled{opacity:1}.tp-btngridv .tp-btnv_b:disabled .tp-btnv_t{opacity:.5}.tp-btngridv .tp-btnv_b{border-radius:0}.tp-cbzv{position:relative}.tp-cbzv_h{display:flex}.tp-cbzv_b{margin-right:4px;position:relative;width:var(--bld-us)}.tp-cbzv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-cbzv_b svg path{stroke:var(--bs-bg);stroke-width:2}.tp-cbzv_t{flex:1}.tp-cbzv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-cbzv.tp-cbzv-expanded .tp-cbzv_p{margin-top:var(--bld-s);opacity:1}.tp-cbzv.tp-cbzv-cpl .tp-cbzv_p{overflow:visible}.tp-cbzv .tp-popv{left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-cbzpv_t{margin-top:var(--bld-s)}.tp-cbzgv{height:auto;overflow:hidden;position:relative}.tp-cbzgv.tp-v-disabled{opacity:.5}.tp-cbzgv_p{left:16px;position:absolute;right:16px;top:0}.tp-cbzgv_g{cursor:pointer;display:block;height:calc(var(--bld-us)*5);width:100%}.tp-cbzgv_u{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_l{fill:rgba(0,0,0,0);stroke:var(--in-fg)}.tp-cbzgv_v{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_h{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;pointer-events:none;position:absolute;width:4px}.tp-cbzgv:focus .tp-cbzgv_h-sel{background-color:var(--in-fg);border-width:0}.tp-cbzprvv{cursor:pointer;height:4px;padding:4px 0;position:relative}.tp-cbzprvv_g{display:block;height:100%;overflow:visible;width:100%}.tp-cbzprvv_t{opacity:.5;stroke:var(--mo-fg)}.tp-cbzprvv_m{background-color:var(--mo-fg);border-radius:50%;height:4px;margin-left:-2px;margin-top:-2px;opacity:0;position:absolute;top:50%;transition:opacity .2s ease-out;width:4px}.tp-cbzprvv_m.tp-cbzprvv_m-a{opacity:1}.tp-fpsv{position:relative}.tp-fpsv_l{bottom:4px;color:var(--mo-fg);line-height:1;right:4px;pointer-events:none;position:absolute}.tp-fpsv_u{margin-left:.2em;opacity:.7}.tp-rslv{cursor:pointer;padding-left:8px;padding-right:8px}.tp-rslv.tp-v-disabled{opacity:.5}.tp-rslv_t{height:calc(var(--bld-us));position:relative}.tp-rslv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:-4px;right:-4px}.tp-rslv_b{bottom:0;top:0;position:absolute}.tp-rslv_b::before{background-color:var(--in-fg);content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:0;right:0}.tp-rslv_k{height:calc(var(--bld-us) - 8px);margin-top:calc((var(--bld-us) - 8px)/-2);position:absolute;top:50%;width:8px}.tp-rslv_k.tp-rslv_k-min{margin-left:-8px}.tp-rslv_k.tp-rslv_k-max{margin-left:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-min{border-bottom-right-radius:0;border-top-right-radius:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-max{border-bottom-left-radius:0;border-top-left-radius:0}.tp-rsltxtv{display:flex}.tp-rsltxtv_s{flex:1}.tp-rsltxtv_t{flex:1;margin-left:4px}.tp-radv_l{display:block;position:relative}.tp-radv_i{left:0;opacity:0;position:absolute;top:0}.tp-radv_b{opacity:.5}.tp-radv_i:hover+.tp-radv_b{background-color:var(--btn-bg-h)}.tp-radv_i:focus+.tp-radv_b{background-color:var(--btn-bg-f)}.tp-radv_i:active+.tp-radv_b{background-color:var(--btn-bg-a)}.tp-radv_i:checked+.tp-radv_b{opacity:1}.tp-radv_t{bottom:0;color:inherit;left:0;overflow:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0}.tp-radv_i:disabled+.tp-radv_b>.tp-radv_t{opacity:.5}.tp-radgridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-radgridv.tp-v-disabled{opacity:.5}.tp-radgridv .tp-radv_b{border-radius:0}',
        accept(params) {
          const p = ParamsParsers;
          const result = parseParams(params, {
            value: p.required.array(p.required.number),
            view: p.required.constant("cubicbezier"),
            expanded: p.optional.boolean,
            label: p.optional.string,
            picker: p.optional.custom((v) => {
              return v === "inline" || v === "popup" ? v : void 0;
            })
          });
          return result ? { params: result } : null;
        },
        controller(args) {
          var _a, _b;
          const rv = new CubicBezier(...args.params.value);
          const v = createValue(rv, {
            constraint: createConstraint$1(),
            equals: CubicBezier.equals
          });
          const vc = new CubicBezierController(args.document, {
            axis: {
              baseStep: 0.1,
              textProps: ValueMap.fromObject({
                draggingScale: 0.01,
                formatter: createNumberFormatter(2)
              })
            },
            expanded: (_a = args.params.expanded) !== null && _a !== void 0 ? _a : false,
            pickerLayout: (_b = args.params.picker) !== null && _b !== void 0 ? _b : "popup",
            value: v,
            viewProps: args.viewProps
          });
          return new LabeledValueController(args.document, {
            blade: args.blade,
            props: ValueMap.fromObject({
              label: args.params.label
            }),
            valueController: vc
          });
        },
        api(args) {
          if (!(args.controller instanceof LabeledValueController)) {
            return null;
          }
          if (!(args.controller.valueController instanceof CubicBezierController)) {
            return null;
          }
          return new CubicBezierApi(args.controller);
        }
      };
      class FpsGraphBladeApi extends BladeApi {
        begin() {
          this.controller_.valueController.begin();
        }
        end() {
          this.controller_.valueController.end();
        }
      }
      const MAX_TIMESTAMPS = 20;
      class Fpswatch {
        constructor() {
          this.start_ = null;
          this.duration_ = 0;
          this.fps_ = null;
          this.frameCount_ = 0;
          this.timestamps_ = [];
        }
        get duration() {
          return this.duration_;
        }
        get fps() {
          return this.fps_;
        }
        begin(now) {
          this.start_ = now.getTime();
        }
        calculateFps_(nowTime) {
          if (this.timestamps_.length === 0) {
            return null;
          }
          const ts = this.timestamps_[0];
          return 1e3 * (this.frameCount_ - ts.frameCount) / (nowTime - ts.time);
        }
        compactTimestamps_() {
          if (this.timestamps_.length <= MAX_TIMESTAMPS) {
            return;
          }
          const len = this.timestamps_.length - MAX_TIMESTAMPS;
          this.timestamps_.splice(0, len);
          const df = this.timestamps_[0].frameCount;
          this.timestamps_.forEach((ts) => {
            ts.frameCount -= df;
          });
          this.frameCount_ -= df;
        }
        end(now) {
          if (this.start_ === null) {
            return;
          }
          const t = now.getTime();
          this.duration_ = t - this.start_;
          this.start_ = null;
          this.fps_ = this.calculateFps_(t);
          this.timestamps_.push({
            frameCount: this.frameCount_,
            time: t
          });
          ++this.frameCount_;
          this.compactTimestamps_();
        }
      }
      const className$3 = ClassName("fps");
      class FpsView {
        constructor(doc, config) {
          this.element = doc.createElement("div");
          this.element.classList.add(className$3());
          config.viewProps.bindClassModifiers(this.element);
          this.graphElement = doc.createElement("div");
          this.graphElement.classList.add(className$3("g"));
          this.element.appendChild(this.graphElement);
          const labelElement = doc.createElement("div");
          labelElement.classList.add(className$3("l"));
          this.element.appendChild(labelElement);
          const valueElement = doc.createElement("span");
          valueElement.classList.add(className$3("v"));
          valueElement.textContent = "--";
          labelElement.appendChild(valueElement);
          this.valueElement = valueElement;
          const unitElement = doc.createElement("span");
          unitElement.classList.add(className$3("u"));
          unitElement.textContent = "FPS";
          labelElement.appendChild(unitElement);
        }
      }
      class FpsGraphController {
        constructor(doc, config) {
          this.stopwatch_ = new Fpswatch();
          this.onTick_ = this.onTick_.bind(this);
          this.ticker_ = config.ticker;
          this.ticker_.emitter.on("tick", this.onTick_);
          this.value_ = config.value;
          this.viewProps = config.viewProps;
          this.view = new FpsView(doc, {
            viewProps: this.viewProps
          });
          this.graphC_ = new GraphLogController(doc, {
            formatter: createNumberFormatter(0),
            lineCount: config.lineCount,
            props: ValueMap.fromObject({
              maxValue: config.maxValue,
              minValue: config.minValue
            }),
            value: this.value_,
            viewProps: this.viewProps
          });
          this.view.graphElement.appendChild(this.graphC_.view.element);
          this.viewProps.handleDispose(() => {
            this.graphC_.viewProps.set("disposed", true);
            this.ticker_.dispose();
          });
        }
        begin() {
          this.stopwatch_.begin(/* @__PURE__ */ new Date());
        }
        end() {
          this.stopwatch_.end(/* @__PURE__ */ new Date());
        }
        onTick_() {
          const fps = this.stopwatch_.fps;
          if (fps !== null) {
            const buffer = this.value_.rawValue;
            this.value_.rawValue = createPushedBuffer(buffer, fps);
            this.view.valueElement.textContent = fps.toFixed(0);
          }
        }
      }
      function createTicker(document, interval) {
        return interval === 0 ? new ManualTicker() : new IntervalTicker(document, interval !== null && interval !== void 0 ? interval : Constants.monitor.defaultInterval);
      }
      const FpsGraphBladePlugin = {
        id: "fpsgraph",
        type: "blade",
        accept(params) {
          const p = ParamsParsers;
          const result = parseParams(params, {
            view: p.required.constant("fpsgraph"),
            interval: p.optional.number,
            label: p.optional.string,
            lineCount: p.optional.number,
            max: p.optional.number,
            min: p.optional.number
          });
          return result ? { params: result } : null;
        },
        controller(args) {
          var _a, _b, _c, _d;
          const interval = (_a = args.params.interval) !== null && _a !== void 0 ? _a : 500;
          return new LabelController(args.document, {
            blade: args.blade,
            props: ValueMap.fromObject({
              label: args.params.label
            }),
            valueController: new FpsGraphController(args.document, {
              lineCount: (_b = args.params.lineCount) !== null && _b !== void 0 ? _b : 2,
              maxValue: (_c = args.params.max) !== null && _c !== void 0 ? _c : 90,
              minValue: (_d = args.params.min) !== null && _d !== void 0 ? _d : 0,
              ticker: createTicker(args.document, interval),
              value: initializeBuffer(80),
              viewProps: args.viewProps
            })
          });
        },
        api(args) {
          if (!(args.controller instanceof LabelController)) {
            return null;
          }
          if (!(args.controller.valueController instanceof FpsGraphController)) {
            return null;
          }
          return new FpsGraphBladeApi(args.controller);
        }
      };
      class Interval {
        constructor(min, max) {
          this.min = min;
          this.max = max;
        }
        static isObject(obj) {
          if (typeof obj !== "object" || obj === null) {
            return false;
          }
          const min = obj.min;
          const max = obj.max;
          if (typeof min !== "number" || typeof max !== "number") {
            return false;
          }
          return true;
        }
        static equals(v1, v2) {
          return v1.min === v2.min && v1.max === v2.max;
        }
        get length() {
          return this.max - this.min;
        }
        toObject() {
          return {
            min: this.min,
            max: this.max
          };
        }
      }
      const IntervalAssembly = {
        fromComponents: (comps) => new Interval(comps[0], comps[1]),
        toComponents: (p) => [p.min, p.max]
      };
      class IntervalConstraint {
        constructor(edge) {
          this.edge = edge;
        }
        constrain(value) {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (value.min <= value.max) {
            return new Interval((_b = (_a = this.edge) === null || _a === void 0 ? void 0 : _a.constrain(value.min)) !== null && _b !== void 0 ? _b : value.min, (_d = (_c = this.edge) === null || _c === void 0 ? void 0 : _c.constrain(value.max)) !== null && _d !== void 0 ? _d : value.max);
          }
          const c = (value.min + value.max) / 2;
          return new Interval((_f = (_e = this.edge) === null || _e === void 0 ? void 0 : _e.constrain(c)) !== null && _f !== void 0 ? _f : c, (_h = (_g = this.edge) === null || _g === void 0 ? void 0 : _g.constrain(c)) !== null && _h !== void 0 ? _h : c);
        }
      }
      const className$2 = ClassName("rsltxt");
      class RangeSliderTextView {
        constructor(doc, config) {
          this.sliderView_ = config.sliderView;
          this.textView_ = config.textView;
          this.element = doc.createElement("div");
          this.element.classList.add(className$2());
          const sliderElem = doc.createElement("div");
          sliderElem.classList.add(className$2("s"));
          sliderElem.appendChild(this.sliderView_.element);
          this.element.appendChild(sliderElem);
          const textElem = doc.createElement("div");
          textElem.classList.add(className$2("t"));
          textElem.appendChild(this.textView_.element);
          this.element.appendChild(textElem);
        }
      }
      const className$1 = ClassName("rsl");
      class RangeSliderView {
        constructor(doc, config) {
          this.onSliderPropsChange_ = this.onSliderPropsChange_.bind(this);
          this.onValueChange_ = this.onValueChange_.bind(this);
          this.sliderProps_ = config.sliderProps;
          this.sliderProps_.emitter.on("change", this.onSliderPropsChange_);
          this.element = doc.createElement("div");
          this.element.classList.add(className$1());
          config.viewProps.bindClassModifiers(this.element);
          this.value_ = config.value;
          this.value_.emitter.on("change", this.onValueChange_);
          const trackElem = doc.createElement("div");
          trackElem.classList.add(className$1("t"));
          this.element.appendChild(trackElem);
          this.trackElement = trackElem;
          const barElem = doc.createElement("div");
          barElem.classList.add(className$1("b"));
          trackElem.appendChild(barElem);
          this.barElement = barElem;
          const knobElems = ["min", "max"].map((modifier) => {
            const elem = doc.createElement("div");
            elem.classList.add(className$1("k"), className$1("k", modifier));
            trackElem.appendChild(elem);
            return elem;
          });
          this.knobElements = [knobElems[0], knobElems[1]];
          this.update_();
        }
        valueToX_(value) {
          const min = this.sliderProps_.get("minValue");
          const max = this.sliderProps_.get("maxValue");
          return constrainRange(mapRange(value, min, max, 0, 1), 0, 1) * 100;
        }
        update_() {
          const v = this.value_.rawValue;
          if (v.length === 0) {
            this.element.classList.add(className$1(void 0, "zero"));
          } else {
            this.element.classList.remove(className$1(void 0, "zero"));
          }
          const xs = [this.valueToX_(v.min), this.valueToX_(v.max)];
          this.barElement.style.left = `${xs[0]}%`;
          this.barElement.style.right = `${100 - xs[1]}%`;
          this.knobElements.forEach((elem, index) => {
            elem.style.left = `${xs[index]}%`;
          });
        }
        onSliderPropsChange_() {
          this.update_();
        }
        onValueChange_() {
          this.update_();
        }
      }
      class RangeSliderController {
        constructor(doc, config) {
          this.grabbing_ = null;
          this.grabOffset_ = 0;
          this.onPointerDown_ = this.onPointerDown_.bind(this);
          this.onPointerMove_ = this.onPointerMove_.bind(this);
          this.onPointerUp_ = this.onPointerUp_.bind(this);
          this.sliderProps = config.sliderProps;
          this.viewProps = config.viewProps;
          this.value = config.value;
          this.view = new RangeSliderView(doc, {
            sliderProps: this.sliderProps,
            value: this.value,
            viewProps: config.viewProps
          });
          const ptHandler = new PointerHandler(this.view.trackElement);
          ptHandler.emitter.on("down", this.onPointerDown_);
          ptHandler.emitter.on("move", this.onPointerMove_);
          ptHandler.emitter.on("up", this.onPointerUp_);
        }
        ofs_() {
          if (this.grabbing_ === "min") {
            return this.view.knobElements[0].getBoundingClientRect().width / 2;
          }
          if (this.grabbing_ === "max") {
            return -this.view.knobElements[1].getBoundingClientRect().width / 2;
          }
          return 0;
        }
        valueFromData_(data) {
          if (!data.point) {
            return null;
          }
          const p = (data.point.x + this.ofs_()) / data.bounds.width;
          const min = this.sliderProps.get("minValue");
          const max = this.sliderProps.get("maxValue");
          return mapRange(p, 0, 1, min, max);
        }
        onPointerDown_(ev) {
          if (!ev.data.point) {
            return;
          }
          const p = ev.data.point.x / ev.data.bounds.width;
          const v = this.value.rawValue;
          const min = this.sliderProps.get("minValue");
          const max = this.sliderProps.get("maxValue");
          const pmin = mapRange(v.min, min, max, 0, 1);
          const pmax = mapRange(v.max, min, max, 0, 1);
          if (Math.abs(pmax - p) <= 0.025) {
            this.grabbing_ = "max";
          } else if (Math.abs(pmin - p) <= 0.025) {
            this.grabbing_ = "min";
          } else if (p >= pmin && p <= pmax) {
            this.grabbing_ = "length";
            this.grabOffset_ = mapRange(p - pmin, 0, 1, 0, max - min);
          } else if (p < pmin) {
            this.grabbing_ = "min";
            this.onPointerMove_(ev);
          } else if (p > pmax) {
            this.grabbing_ = "max";
            this.onPointerMove_(ev);
          }
        }
        applyPointToValue_(data, opts) {
          const v = this.valueFromData_(data);
          if (v === null) {
            return;
          }
          const rmin = this.sliderProps.get("minValue");
          const rmax = this.sliderProps.get("maxValue");
          if (this.grabbing_ === "min") {
            this.value.setRawValue(new Interval(v, this.value.rawValue.max), opts);
          } else if (this.grabbing_ === "max") {
            this.value.setRawValue(new Interval(this.value.rawValue.min, v), opts);
          } else if (this.grabbing_ === "length") {
            const len = this.value.rawValue.length;
            let min = v - this.grabOffset_;
            let max = min + len;
            if (min < rmin) {
              min = rmin;
              max = rmin + len;
            } else if (max > rmax) {
              min = rmax - len;
              max = rmax;
            }
            this.value.setRawValue(new Interval(min, max), opts);
          }
        }
        onPointerMove_(ev) {
          this.applyPointToValue_(ev.data, {
            forceEmit: false,
            last: false
          });
        }
        onPointerUp_(ev) {
          this.applyPointToValue_(ev.data, {
            forceEmit: true,
            last: true
          });
          this.grabbing_ = null;
        }
      }
      class RangeSliderTextController {
        constructor(doc, config) {
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.sc_ = new RangeSliderController(doc, config);
          const axis = {
            baseStep: config.baseStep,
            constraint: config.constraint,
            textProps: ValueMap.fromObject({
              draggingScale: config.draggingScale,
              formatter: config.formatter
            })
          };
          this.tc_ = new PointNdTextController(doc, {
            assembly: IntervalAssembly,
            axes: [axis, axis],
            parser: config.parser,
            value: this.value,
            viewProps: config.viewProps
          });
          this.view = new RangeSliderTextView(doc, {
            sliderView: this.sc_.view,
            textView: this.tc_.view
          });
        }
        get textController() {
          return this.tc_;
        }
      }
      function intervalFromUnknown(value) {
        return Interval.isObject(value) ? new Interval(value.min, value.max) : new Interval(0, 0);
      }
      function writeInterval(target, value) {
        target.writeProperty("max", value.max);
        target.writeProperty("min", value.min);
      }
      function createConstraint(params) {
        const constraints = [];
        const rc = createRangeConstraint(params);
        if (rc) {
          constraints.push(rc);
        }
        const sc = createStepConstraint(params);
        if (sc) {
          constraints.push(sc);
        }
        return new IntervalConstraint(new CompositeConstraint(constraints));
      }
      const IntervalInputPlugin = {
        id: "input-interval",
        type: "input",
        css: '.tp-cbzgv,.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-radv_b:hover,.tp-rslv_k:hover,.tp-cbzv_b:hover{background-color:var(--btn-bg-h)}.tp-radv_b:focus,.tp-rslv_k:focus,.tp-cbzv_b:focus{background-color:var(--btn-bg-f)}.tp-radv_b:active,.tp-rslv_k:active,.tp-cbzv_b:active{background-color:var(--btn-bg-a)}.tp-radv_b:disabled,.tp-rslv_k:disabled,.tp-cbzv_b:disabled{opacity:.5}.tp-cbzgv{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-cbzgv:hover{background-color:var(--in-bg-h)}.tp-cbzgv:focus{background-color:var(--in-bg-f)}.tp-cbzgv:active{background-color:var(--in-bg-a)}.tp-cbzgv:disabled{opacity:.5}.tp-btngridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-btngridv.tp-v-disabled{opacity:.5}.tp-btngridv .tp-btnv_b:disabled{opacity:1}.tp-btngridv .tp-btnv_b:disabled .tp-btnv_t{opacity:.5}.tp-btngridv .tp-btnv_b{border-radius:0}.tp-cbzv{position:relative}.tp-cbzv_h{display:flex}.tp-cbzv_b{margin-right:4px;position:relative;width:var(--bld-us)}.tp-cbzv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-cbzv_b svg path{stroke:var(--bs-bg);stroke-width:2}.tp-cbzv_t{flex:1}.tp-cbzv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-cbzv.tp-cbzv-expanded .tp-cbzv_p{margin-top:var(--bld-s);opacity:1}.tp-cbzv.tp-cbzv-cpl .tp-cbzv_p{overflow:visible}.tp-cbzv .tp-popv{left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-cbzpv_t{margin-top:var(--bld-s)}.tp-cbzgv{height:auto;overflow:hidden;position:relative}.tp-cbzgv.tp-v-disabled{opacity:.5}.tp-cbzgv_p{left:16px;position:absolute;right:16px;top:0}.tp-cbzgv_g{cursor:pointer;display:block;height:calc(var(--bld-us)*5);width:100%}.tp-cbzgv_u{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_l{fill:rgba(0,0,0,0);stroke:var(--in-fg)}.tp-cbzgv_v{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_h{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;pointer-events:none;position:absolute;width:4px}.tp-cbzgv:focus .tp-cbzgv_h-sel{background-color:var(--in-fg);border-width:0}.tp-cbzprvv{cursor:pointer;height:4px;padding:4px 0;position:relative}.tp-cbzprvv_g{display:block;height:100%;overflow:visible;width:100%}.tp-cbzprvv_t{opacity:.5;stroke:var(--mo-fg)}.tp-cbzprvv_m{background-color:var(--mo-fg);border-radius:50%;height:4px;margin-left:-2px;margin-top:-2px;opacity:0;position:absolute;top:50%;transition:opacity .2s ease-out;width:4px}.tp-cbzprvv_m.tp-cbzprvv_m-a{opacity:1}.tp-fpsv{position:relative}.tp-fpsv_l{bottom:4px;color:var(--mo-fg);line-height:1;right:4px;pointer-events:none;position:absolute}.tp-fpsv_u{margin-left:.2em;opacity:.7}.tp-rslv{cursor:pointer;padding-left:8px;padding-right:8px}.tp-rslv.tp-v-disabled{opacity:.5}.tp-rslv_t{height:calc(var(--bld-us));position:relative}.tp-rslv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:-4px;right:-4px}.tp-rslv_b{bottom:0;top:0;position:absolute}.tp-rslv_b::before{background-color:var(--in-fg);content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:0;right:0}.tp-rslv_k{height:calc(var(--bld-us) - 8px);margin-top:calc((var(--bld-us) - 8px)/-2);position:absolute;top:50%;width:8px}.tp-rslv_k.tp-rslv_k-min{margin-left:-8px}.tp-rslv_k.tp-rslv_k-max{margin-left:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-min{border-bottom-right-radius:0;border-top-right-radius:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-max{border-bottom-left-radius:0;border-top-left-radius:0}.tp-rsltxtv{display:flex}.tp-rsltxtv_s{flex:1}.tp-rsltxtv_t{flex:1;margin-left:4px}.tp-radv_l{display:block;position:relative}.tp-radv_i{left:0;opacity:0;position:absolute;top:0}.tp-radv_b{opacity:.5}.tp-radv_i:hover+.tp-radv_b{background-color:var(--btn-bg-h)}.tp-radv_i:focus+.tp-radv_b{background-color:var(--btn-bg-f)}.tp-radv_i:active+.tp-radv_b{background-color:var(--btn-bg-a)}.tp-radv_i:checked+.tp-radv_b{opacity:1}.tp-radv_t{bottom:0;color:inherit;left:0;overflow:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0}.tp-radv_i:disabled+.tp-radv_b>.tp-radv_t{opacity:.5}.tp-radgridv{border-radius:var(--elm-br);display:grid;overflow:hidden;gap:2px}.tp-radgridv.tp-v-disabled{opacity:.5}.tp-radgridv .tp-radv_b{border-radius:0}',
        accept: (exValue, params) => {
          if (!Interval.isObject(exValue)) {
            return null;
          }
          const p = ParamsParsers;
          const result = parseParams(params, {
            format: p.optional.function,
            max: p.optional.number,
            min: p.optional.number,
            step: p.optional.number
          });
          return result ? {
            initialValue: new Interval(exValue.min, exValue.max),
            params: result
          } : null;
        },
        binding: {
          reader: (_args) => intervalFromUnknown,
          constraint: (args) => createConstraint(args.params),
          equals: Interval.equals,
          writer: (_args) => writeInterval
        },
        controller(args) {
          var _a;
          const v = args.value;
          const c = args.constraint;
          if (!(c instanceof IntervalConstraint)) {
            throw TpError.shouldNeverHappen();
          }
          const midValue = (v.rawValue.min + v.rawValue.max) / 2;
          const formatter = (_a = args.params.format) !== null && _a !== void 0 ? _a : createNumberFormatter(getSuitableDecimalDigits(c.edge, midValue));
          const drc = c.edge && findConstraint(c.edge, DefiniteRangeConstraint);
          if (drc) {
            return new RangeSliderTextController(args.document, {
              baseStep: getBaseStep(c.edge),
              constraint: c.edge,
              draggingScale: getSuitableDraggingScale(c.edge, midValue),
              formatter,
              parser: parseNumber,
              sliderProps: new ValueMap({
                maxValue: drc.values.value("max"),
                minValue: drc.values.value("min")
              }),
              value: v,
              viewProps: args.viewProps
            });
          }
          const axis = {
            baseStep: getBaseStep(c.edge),
            constraint: c.edge,
            textProps: ValueMap.fromObject({
              draggingScale: midValue,
              formatter
            })
          };
          return new PointNdTextController(args.document, {
            assembly: IntervalAssembly,
            axes: [axis, axis],
            parser: parseNumber,
            value: v,
            viewProps: args.viewProps
          });
        }
      };
      class RadioCellApi {
        constructor(controller) {
          this.controller_ = controller;
        }
        get disabled() {
          return this.controller_.viewProps.get("disabled");
        }
        set disabled(disabled) {
          this.controller_.viewProps.set("disabled", disabled);
        }
        get title() {
          var _a;
          return (_a = this.controller_.props.get("title")) !== null && _a !== void 0 ? _a : "";
        }
        set title(title) {
          this.controller_.props.set("title", title);
        }
      }
      class TpRadioGridChangeEvent extends TpChangeEvent {
        constructor(target, cell, index, value, presetKey) {
          super(target, value, presetKey);
          this.cell = cell;
          this.index = index;
        }
      }
      class RadioGridApi extends BladeApi {
        constructor(controller) {
          super(controller);
          this.cellToApiMap_ = /* @__PURE__ */ new Map();
          const gc = this.controller_.valueController;
          gc.cellControllers.forEach((cc) => {
            const api = new RadioCellApi(cc);
            this.cellToApiMap_.set(cc, api);
          });
        }
        get value() {
          return this.controller_.value;
        }
        cell(x, y2) {
          const gc = this.controller_.valueController;
          const cc = gc.cellControllers[y2 * gc.size[0] + x];
          return this.cellToApiMap_.get(cc);
        }
        on(eventName, handler) {
          const bh = handler.bind(this);
          this.controller_.value.emitter.on(eventName, (ev) => {
            const gc = this.controller_.valueController;
            const cc = gc.findCellByValue(ev.rawValue);
            if (!cc) {
              return;
            }
            const capi = this.cellToApiMap_.get(cc);
            if (!capi) {
              return;
            }
            const i = gc.cellControllers.indexOf(cc);
            bh(new TpRadioGridChangeEvent(this, capi, [i % gc.size[0], Math.floor(i / gc.size[0])], ev.rawValue, void 0));
          });
        }
      }
      const className = ClassName("rad");
      class RadioView {
        constructor(doc, config) {
          this.element = doc.createElement("div");
          this.element.classList.add(className());
          config.viewProps.bindClassModifiers(this.element);
          const labelElem = doc.createElement("label");
          labelElem.classList.add(className("l"));
          this.element.appendChild(labelElem);
          const inputElem = doc.createElement("input");
          inputElem.classList.add(className("i"));
          inputElem.name = config.name;
          inputElem.type = "radio";
          config.viewProps.bindDisabled(inputElem);
          labelElem.appendChild(inputElem);
          this.inputElement = inputElem;
          const bodyElem = doc.createElement("div");
          bodyElem.classList.add(className("b"));
          labelElem.appendChild(bodyElem);
          const titleElem = doc.createElement("div");
          titleElem.classList.add(className("t"));
          bodyElem.appendChild(titleElem);
          bindValueMap(config.props, "title", (title) => {
            titleElem.textContent = title;
          });
        }
      }
      class RadioController {
        constructor(doc, config) {
          this.props = config.props;
          this.viewProps = config.viewProps;
          this.view = new RadioView(doc, {
            name: config.name,
            props: this.props,
            viewProps: this.viewProps
          });
        }
      }
      class RadioGridController {
        constructor(doc, config) {
          this.cellCs_ = [];
          this.cellValues_ = [];
          this.onCellInputChange_ = this.onCellInputChange_.bind(this);
          this.size = config.size;
          const [w, h] = this.size;
          for (let y2 = 0; y2 < h; y2++) {
            for (let x = 0; x < w; x++) {
              const bc = new RadioController(doc, {
                name: config.groupName,
                props: ValueMap.fromObject(Object.assign({}, config.cellConfig(x, y2))),
                viewProps: ViewProps.create()
              });
              this.cellCs_.push(bc);
              this.cellValues_.push(config.cellConfig(x, y2).value);
            }
          }
          this.value = config.value;
          bindValue(this.value, (value) => {
            const cc = this.findCellByValue(value);
            if (!cc) {
              return;
            }
            cc.view.inputElement.checked = true;
          });
          this.viewProps = ViewProps.create();
          this.view = new PlainView(doc, {
            viewProps: this.viewProps,
            viewName: "radgrid"
          });
          this.view.element.style.gridTemplateColumns = `repeat(${w}, 1fr)`;
          this.cellCs_.forEach((bc) => {
            bc.view.inputElement.addEventListener("change", this.onCellInputChange_);
            this.view.element.appendChild(bc.view.element);
          });
        }
        get cellControllers() {
          return this.cellCs_;
        }
        findCellByValue(value) {
          const index = this.cellValues_.findIndex((v) => v === value);
          if (index < 0) {
            return null;
          }
          return this.cellCs_[index];
        }
        onCellInputChange_(ev) {
          const inputElem = ev.currentTarget;
          const index = this.cellCs_.findIndex((c) => c.view.inputElement === inputElem);
          if (index < 0) {
            return;
          }
          this.value.rawValue = this.cellValues_[index];
        }
      }
      const RadioGridBladePlugin = function() {
        return {
          id: "radiogrid",
          type: "blade",
          accept(params) {
            const p = ParamsParsers;
            const result = parseParams(params, {
              cells: p.required.function,
              groupName: p.required.string,
              size: p.required.array(p.required.number),
              value: p.required.raw,
              view: p.required.constant("radiogrid"),
              label: p.optional.string
            });
            return result ? { params: result } : null;
          },
          controller(args) {
            return new LabeledValueController(args.document, {
              blade: args.blade,
              props: ValueMap.fromObject({
                label: args.params.label
              }),
              valueController: new RadioGridController(args.document, {
                groupName: args.params.groupName,
                cellConfig: args.params.cells,
                size: args.params.size,
                value: createValue(args.params.value)
              })
            });
          },
          api(args) {
            if (!(args.controller instanceof LabeledValueController)) {
              return null;
            }
            if (!(args.controller.valueController instanceof RadioGridController)) {
              return null;
            }
            return new RadioGridApi(args.controller);
          }
        };
      }();
      function createRadioGridInputPlugin(config) {
        return {
          id: "input-radiogrid",
          type: "input",
          accept(value, params) {
            if (!config.isType(value)) {
              return null;
            }
            const p = ParamsParsers;
            const result = parseParams(params, {
              cells: p.required.function,
              groupName: p.required.string,
              size: p.required.array(p.required.number),
              view: p.required.constant("radiogrid")
            });
            return result ? {
              initialValue: value,
              params: result
            } : null;
          },
          binding: config.binding,
          controller: (args) => {
            return new RadioGridController(args.document, {
              cellConfig: args.params.cells,
              groupName: args.params.groupName,
              size: args.params.size,
              value: args.value
            });
          }
        };
      }
      const RadioGruidNumberInputPlugin = createRadioGridInputPlugin({
        isType: (value) => {
          return typeof value === "number";
        },
        binding: {
          reader: (_args) => numberFromUnknown,
          writer: (_args) => writePrimitive
        }
      });
      const RadioGruidStringInputPlugin = createRadioGridInputPlugin({
        isType: (value) => {
          return typeof value === "string";
        },
        binding: {
          reader: (_args) => stringFromUnknown,
          writer: (_args) => writePrimitive
        }
      });
      const RadioGruidBooleanInputPlugin = createRadioGridInputPlugin({
        isType: (value) => {
          return typeof value === "boolean";
        },
        binding: {
          reader: (_args) => boolFromUnknown,
          writer: (_args) => writePrimitive
        }
      });
      const plugins = [
        ButtonGridBladePlugin,
        CubicBezierBladePlugin,
        FpsGraphBladePlugin,
        IntervalInputPlugin,
        RadioGridBladePlugin,
        RadioGruidBooleanInputPlugin,
        RadioGruidNumberInputPlugin,
        RadioGruidStringInputPlugin
      ];
      exports2.ButtonCellApi = ButtonCellApi;
      exports2.ButtonGridApi = ButtonGridApi;
      exports2.ButtonGridController = ButtonGridController;
      exports2.CubicBezier = CubicBezier;
      exports2.CubicBezierApi = CubicBezierApi;
      exports2.CubicBezierAssembly = CubicBezierAssembly;
      exports2.CubicBezierController = CubicBezierController;
      exports2.CubicBezierGraphController = CubicBezierGraphController;
      exports2.CubicBezierGraphView = CubicBezierGraphView;
      exports2.CubicBezierPickerController = CubicBezierPickerController;
      exports2.CubicBezierPickerView = CubicBezierPickerView;
      exports2.CubicBezierPreviewView = CubicBezierPreviewView;
      exports2.CubicBezierView = CubicBezierView;
      exports2.FpsGraphBladeApi = FpsGraphBladeApi;
      exports2.FpsGraphController = FpsGraphController;
      exports2.FpsView = FpsView;
      exports2.Fpswatch = Fpswatch;
      exports2.Interval = Interval;
      exports2.IntervalAssembly = IntervalAssembly;
      exports2.IntervalConstraint = IntervalConstraint;
      exports2.RadioCellApi = RadioCellApi;
      exports2.RadioController = RadioController;
      exports2.RadioGridApi = RadioGridApi;
      exports2.RadioGridController = RadioGridController;
      exports2.RadioView = RadioView;
      exports2.RangeSliderController = RangeSliderController;
      exports2.RangeSliderTextController = RangeSliderTextController;
      exports2.RangeSliderTextView = RangeSliderTextView;
      exports2.RangeSliderView = RangeSliderView;
      exports2.TpRadioGridChangeEvent = TpRadioGridChangeEvent;
      exports2.plugins = plugins;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});
export default require_tweakpane_plugin_essentials();
//# sourceMappingURL=@tweakpane_plugin-essentials.js.map
