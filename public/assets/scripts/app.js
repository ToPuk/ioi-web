(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
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
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __reExport = (target, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toESM = (module, isNodeMode) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/clipboard/dist/clipboard.js
  var require_clipboard = __commonJS({
    "node_modules/clipboard/dist/clipboard.js"(exports, module) {
      (function webpackUniversalModuleDefinition(root, factory) {
        if (typeof exports === "object" && typeof module === "object")
          module.exports = factory();
        else if (typeof define === "function" && define.amd)
          define([], factory);
        else if (typeof exports === "object")
          exports["ClipboardJS"] = factory();
        else
          root["ClipboardJS"] = factory();
      })(exports, function() {
        return function(modules) {
          var installedModules = {};
          function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
              return installedModules[moduleId].exports;
            }
            var module2 = installedModules[moduleId] = {
              i: moduleId,
              l: false,
              exports: {}
            };
            modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
            module2.l = true;
            return module2.exports;
          }
          __webpack_require__.m = modules;
          __webpack_require__.c = installedModules;
          __webpack_require__.d = function(exports2, name, getter) {
            if (!__webpack_require__.o(exports2, name)) {
              Object.defineProperty(exports2, name, { enumerable: true, get: getter });
            }
          };
          __webpack_require__.r = function(exports2) {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
              Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
            }
            Object.defineProperty(exports2, "__esModule", { value: true });
          };
          __webpack_require__.t = function(value, mode) {
            if (mode & 1)
              value = __webpack_require__(value);
            if (mode & 8)
              return value;
            if (mode & 4 && typeof value === "object" && value && value.__esModule)
              return value;
            var ns = /* @__PURE__ */ Object.create(null);
            __webpack_require__.r(ns);
            Object.defineProperty(ns, "default", { enumerable: true, value });
            if (mode & 2 && typeof value != "string")
              for (var key in value)
                __webpack_require__.d(ns, key, function(key2) {
                  return value[key2];
                }.bind(null, key));
            return ns;
          };
          __webpack_require__.n = function(module2) {
            var getter = module2 && module2.__esModule ? function getDefault() {
              return module2["default"];
            } : function getModuleExports() {
              return module2;
            };
            __webpack_require__.d(getter, "a", getter);
            return getter;
          };
          __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          };
          __webpack_require__.p = "";
          return __webpack_require__(__webpack_require__.s = 6);
        }([
          function(module2, exports2) {
            function select(element) {
              var selectedText;
              if (element.nodeName === "SELECT") {
                element.focus();
                selectedText = element.value;
              } else if (element.nodeName === "INPUT" || element.nodeName === "TEXTAREA") {
                var isReadOnly = element.hasAttribute("readonly");
                if (!isReadOnly) {
                  element.setAttribute("readonly", "");
                }
                element.select();
                element.setSelectionRange(0, element.value.length);
                if (!isReadOnly) {
                  element.removeAttribute("readonly");
                }
                selectedText = element.value;
              } else {
                if (element.hasAttribute("contenteditable")) {
                  element.focus();
                }
                var selection = window.getSelection();
                var range = document.createRange();
                range.selectNodeContents(element);
                selection.removeAllRanges();
                selection.addRange(range);
                selectedText = selection.toString();
              }
              return selectedText;
            }
            module2.exports = select;
          },
          function(module2, exports2) {
            function E2() {
            }
            E2.prototype = {
              on: function(name, callback, ctx) {
                var e = this.e || (this.e = {});
                (e[name] || (e[name] = [])).push({
                  fn: callback,
                  ctx
                });
                return this;
              },
              once: function(name, callback, ctx) {
                var self2 = this;
                function listener() {
                  self2.off(name, listener);
                  callback.apply(ctx, arguments);
                }
                ;
                listener._ = callback;
                return this.on(name, listener, ctx);
              },
              emit: function(name) {
                var data = [].slice.call(arguments, 1);
                var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
                var i = 0;
                var len = evtArr.length;
                for (i; i < len; i++) {
                  evtArr[i].fn.apply(evtArr[i].ctx, data);
                }
                return this;
              },
              off: function(name, callback) {
                var e = this.e || (this.e = {});
                var evts = e[name];
                var liveEvents = [];
                if (evts && callback) {
                  for (var i = 0, len = evts.length; i < len; i++) {
                    if (evts[i].fn !== callback && evts[i].fn._ !== callback)
                      liveEvents.push(evts[i]);
                  }
                }
                liveEvents.length ? e[name] = liveEvents : delete e[name];
                return this;
              }
            };
            module2.exports = E2;
            module2.exports.TinyEmitter = E2;
          },
          function(module2, exports2, __webpack_require__) {
            var is = __webpack_require__(3);
            var delegate = __webpack_require__(4);
            function listen(target, type, callback) {
              if (!target && !type && !callback) {
                throw new Error("Missing required arguments");
              }
              if (!is.string(type)) {
                throw new TypeError("Second argument must be a String");
              }
              if (!is.fn(callback)) {
                throw new TypeError("Third argument must be a Function");
              }
              if (is.node(target)) {
                return listenNode(target, type, callback);
              } else if (is.nodeList(target)) {
                return listenNodeList(target, type, callback);
              } else if (is.string(target)) {
                return listenSelector(target, type, callback);
              } else {
                throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
              }
            }
            function listenNode(node, type, callback) {
              node.addEventListener(type, callback);
              return {
                destroy: function() {
                  node.removeEventListener(type, callback);
                }
              };
            }
            function listenNodeList(nodeList, type, callback) {
              Array.prototype.forEach.call(nodeList, function(node) {
                node.addEventListener(type, callback);
              });
              return {
                destroy: function() {
                  Array.prototype.forEach.call(nodeList, function(node) {
                    node.removeEventListener(type, callback);
                  });
                }
              };
            }
            function listenSelector(selector3, type, callback) {
              return delegate(document.body, selector3, type, callback);
            }
            module2.exports = listen;
          },
          function(module2, exports2) {
            exports2.node = function(value) {
              return value !== void 0 && value instanceof HTMLElement && value.nodeType === 1;
            };
            exports2.nodeList = function(value) {
              var type = Object.prototype.toString.call(value);
              return value !== void 0 && (type === "[object NodeList]" || type === "[object HTMLCollection]") && "length" in value && (value.length === 0 || exports2.node(value[0]));
            };
            exports2.string = function(value) {
              return typeof value === "string" || value instanceof String;
            };
            exports2.fn = function(value) {
              var type = Object.prototype.toString.call(value);
              return type === "[object Function]";
            };
          },
          function(module2, exports2, __webpack_require__) {
            var closest = __webpack_require__(5);
            function _delegate(element, selector3, type, callback, useCapture) {
              var listenerFn = listener.apply(this, arguments);
              element.addEventListener(type, listenerFn, useCapture);
              return {
                destroy: function() {
                  element.removeEventListener(type, listenerFn, useCapture);
                }
              };
            }
            function delegate(elements, selector3, type, callback, useCapture) {
              if (typeof elements.addEventListener === "function") {
                return _delegate.apply(null, arguments);
              }
              if (typeof type === "function") {
                return _delegate.bind(null, document).apply(null, arguments);
              }
              if (typeof elements === "string") {
                elements = document.querySelectorAll(elements);
              }
              return Array.prototype.map.call(elements, function(element) {
                return _delegate(element, selector3, type, callback, useCapture);
              });
            }
            function listener(element, selector3, type, callback) {
              return function(e) {
                e.delegateTarget = closest(e.target, selector3);
                if (e.delegateTarget) {
                  callback.call(element, e);
                }
              };
            }
            module2.exports = delegate;
          },
          function(module2, exports2) {
            var DOCUMENT_NODE_TYPE = 9;
            if (typeof Element !== "undefined" && !Element.prototype.matches) {
              var proto = Element.prototype;
              proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
            }
            function closest(element, selector3) {
              while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
                if (typeof element.matches === "function" && element.matches(selector3)) {
                  return element;
                }
                element = element.parentNode;
              }
            }
            module2.exports = closest;
          },
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            var src_select = __webpack_require__(0);
            var select_default = /* @__PURE__ */ __webpack_require__.n(src_select);
            var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
              return typeof obj;
            } : function(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            var _createClass4 = function() {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor)
                    descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
              return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                  defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                  defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();
            function _classCallCheck4(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }
            var clipboard_action_ClipboardAction = function() {
              function ClipboardAction(options) {
                _classCallCheck4(this, ClipboardAction);
                this.resolveOptions(options);
                this.initSelection();
              }
              _createClass4(ClipboardAction, [{
                key: "resolveOptions",
                value: function resolveOptions() {
                  var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                  this.action = options.action;
                  this.container = options.container;
                  this.emitter = options.emitter;
                  this.target = options.target;
                  this.text = options.text;
                  this.trigger = options.trigger;
                  this.selectedText = "";
                }
              }, {
                key: "initSelection",
                value: function initSelection() {
                  if (this.text) {
                    this.selectFake();
                  } else if (this.target) {
                    this.selectTarget();
                  }
                }
              }, {
                key: "selectFake",
                value: function selectFake() {
                  var _this = this;
                  var isRTL = document.documentElement.getAttribute("dir") == "rtl";
                  this.removeFake();
                  this.fakeHandlerCallback = function() {
                    return _this.removeFake();
                  };
                  this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || true;
                  this.fakeElem = document.createElement("textarea");
                  this.fakeElem.style.fontSize = "12pt";
                  this.fakeElem.style.border = "0";
                  this.fakeElem.style.padding = "0";
                  this.fakeElem.style.margin = "0";
                  this.fakeElem.style.position = "absolute";
                  this.fakeElem.style[isRTL ? "right" : "left"] = "-9999px";
                  var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                  this.fakeElem.style.top = yPosition + "px";
                  this.fakeElem.setAttribute("readonly", "");
                  this.fakeElem.value = this.text;
                  this.container.appendChild(this.fakeElem);
                  this.selectedText = select_default()(this.fakeElem);
                  this.copyText();
                }
              }, {
                key: "removeFake",
                value: function removeFake() {
                  if (this.fakeHandler) {
                    this.container.removeEventListener("click", this.fakeHandlerCallback);
                    this.fakeHandler = null;
                    this.fakeHandlerCallback = null;
                  }
                  if (this.fakeElem) {
                    this.container.removeChild(this.fakeElem);
                    this.fakeElem = null;
                  }
                }
              }, {
                key: "selectTarget",
                value: function selectTarget() {
                  this.selectedText = select_default()(this.target);
                  this.copyText();
                }
              }, {
                key: "copyText",
                value: function copyText() {
                  var succeeded = void 0;
                  try {
                    succeeded = document.execCommand(this.action);
                  } catch (err) {
                    succeeded = false;
                  }
                  this.handleResult(succeeded);
                }
              }, {
                key: "handleResult",
                value: function handleResult(succeeded) {
                  this.emitter.emit(succeeded ? "success" : "error", {
                    action: this.action,
                    text: this.selectedText,
                    trigger: this.trigger,
                    clearSelection: this.clearSelection.bind(this)
                  });
                }
              }, {
                key: "clearSelection",
                value: function clearSelection() {
                  if (this.trigger) {
                    this.trigger.focus();
                  }
                  document.activeElement.blur();
                  window.getSelection().removeAllRanges();
                }
              }, {
                key: "destroy",
                value: function destroy() {
                  this.removeFake();
                }
              }, {
                key: "action",
                set: function set() {
                  var action = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "copy";
                  this._action = action;
                  if (this._action !== "copy" && this._action !== "cut") {
                    throw new Error('Invalid "action" value, use either "copy" or "cut"');
                  }
                },
                get: function get() {
                  return this._action;
                }
              }, {
                key: "target",
                set: function set(target) {
                  if (target !== void 0) {
                    if (target && (typeof target === "undefined" ? "undefined" : _typeof2(target)) === "object" && target.nodeType === 1) {
                      if (this.action === "copy" && target.hasAttribute("disabled")) {
                        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                      }
                      if (this.action === "cut" && (target.hasAttribute("readonly") || target.hasAttribute("disabled"))) {
                        throw new Error(`Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`);
                      }
                      this._target = target;
                    } else {
                      throw new Error('Invalid "target" value, use a valid Element');
                    }
                  }
                },
                get: function get() {
                  return this._target;
                }
              }]);
              return ClipboardAction;
            }();
            var clipboard_action = clipboard_action_ClipboardAction;
            var tiny_emitter = __webpack_require__(1);
            var tiny_emitter_default = /* @__PURE__ */ __webpack_require__.n(tiny_emitter);
            var listen = __webpack_require__(2);
            var listen_default = /* @__PURE__ */ __webpack_require__.n(listen);
            var clipboard_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
              return typeof obj;
            } : function(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            var clipboard_createClass = function() {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor)
                    descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
              return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                  defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                  defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();
            function clipboard_classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }
            function _possibleConstructorReturn2(self2, call) {
              if (!self2) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }
              return call && (typeof call === "object" || typeof call === "function") ? call : self2;
            }
            function _inherits2(subClass, superClass) {
              if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
              }
              subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
              if (superClass)
                Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }
            var clipboard_Clipboard = function(_Emitter) {
              _inherits2(Clipboard2, _Emitter);
              function Clipboard2(trigger, options) {
                clipboard_classCallCheck(this, Clipboard2);
                var _this = _possibleConstructorReturn2(this, (Clipboard2.__proto__ || Object.getPrototypeOf(Clipboard2)).call(this));
                _this.resolveOptions(options);
                _this.listenClick(trigger);
                return _this;
              }
              clipboard_createClass(Clipboard2, [{
                key: "resolveOptions",
                value: function resolveOptions() {
                  var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                  this.action = typeof options.action === "function" ? options.action : this.defaultAction;
                  this.target = typeof options.target === "function" ? options.target : this.defaultTarget;
                  this.text = typeof options.text === "function" ? options.text : this.defaultText;
                  this.container = clipboard_typeof(options.container) === "object" ? options.container : document.body;
                }
              }, {
                key: "listenClick",
                value: function listenClick(trigger) {
                  var _this2 = this;
                  this.listener = listen_default()(trigger, "click", function(e) {
                    return _this2.onClick(e);
                  });
                }
              }, {
                key: "onClick",
                value: function onClick(e) {
                  var trigger = e.delegateTarget || e.currentTarget;
                  if (this.clipboardAction) {
                    this.clipboardAction = null;
                  }
                  this.clipboardAction = new clipboard_action({
                    action: this.action(trigger),
                    target: this.target(trigger),
                    text: this.text(trigger),
                    container: this.container,
                    trigger,
                    emitter: this
                  });
                }
              }, {
                key: "defaultAction",
                value: function defaultAction(trigger) {
                  return getAttributeValue("action", trigger);
                }
              }, {
                key: "defaultTarget",
                value: function defaultTarget(trigger) {
                  var selector3 = getAttributeValue("target", trigger);
                  if (selector3) {
                    return document.querySelector(selector3);
                  }
                }
              }, {
                key: "defaultText",
                value: function defaultText(trigger) {
                  return getAttributeValue("text", trigger);
                }
              }, {
                key: "destroy",
                value: function destroy() {
                  this.listener.destroy();
                  if (this.clipboardAction) {
                    this.clipboardAction.destroy();
                    this.clipboardAction = null;
                  }
                }
              }], [{
                key: "isSupported",
                value: function isSupported() {
                  var action = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["copy", "cut"];
                  var actions = typeof action === "string" ? [action] : action;
                  var support2 = !!document.queryCommandSupported;
                  actions.forEach(function(action2) {
                    support2 = support2 && !!document.queryCommandSupported(action2);
                  });
                  return support2;
                }
              }]);
              return Clipboard2;
            }(tiny_emitter_default.a);
            function getAttributeValue(suffix, element) {
              var attribute = "data-clipboard-" + suffix;
              if (!element.hasAttribute(attribute)) {
                return;
              }
              return element.getAttribute(attribute);
            }
            var clipboard = __webpack_exports__["default"] = clipboard_Clipboard;
          }
        ])["default"];
      });
    }
  });

  // node_modules/svg4everybody/dist/svg4everybody.js
  var require_svg4everybody = __commonJS({
    "node_modules/svg4everybody/dist/svg4everybody.js"(exports, module) {
      !function(root, factory) {
        typeof define == "function" && define.amd ? define([], function() {
          return root.svg4everybody = factory();
        }) : typeof module == "object" && module.exports ? module.exports = factory() : root.svg4everybody = factory();
      }(exports, function() {
        function embed(parent, svg, target) {
          if (target) {
            var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
            viewBox && svg.setAttribute("viewBox", viewBox);
            for (var clone = target.cloneNode(true); clone.childNodes.length; ) {
              fragment.appendChild(clone.firstChild);
            }
            parent.appendChild(fragment);
          }
        }
        function loadreadystatechange(xhr) {
          xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
              var cachedDocument = xhr._cachedDocument;
              cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), xhr._embeds.splice(0).map(function(item) {
                var target = xhr._cachedTarget[item.id];
                target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), embed(item.parent, item.svg, target);
              });
            }
          }, xhr.onreadystatechange();
        }
        function svg4everybody2(rawopts) {
          function oninterval() {
            for (var index = 0; index < uses.length; ) {
              var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent), src2 = use.getAttribute("xlink:href") || use.getAttribute("href");
              if (!src2 && opts.attributeName && (src2 = use.getAttribute(opts.attributeName)), svg && src2) {
                if (polyfill) {
                  if (!opts.validate || opts.validate(src2, svg, use)) {
                    parent.removeChild(use);
                    var srcSplit = src2.split("#"), url2 = srcSplit.shift(), id = srcSplit.join("#");
                    if (url2.length) {
                      var xhr = requests[url2];
                      xhr || (xhr = requests[url2] = new XMLHttpRequest(), xhr.open("GET", url2), xhr.send(), xhr._embeds = []), xhr._embeds.push({
                        parent,
                        svg,
                        id
                      }), loadreadystatechange(xhr);
                    } else {
                      embed(parent, svg, document.getElementById(id));
                    }
                  } else {
                    ++index, ++numberOfSvgUseElementsToBypass;
                  }
                }
              } else {
                ++index;
              }
            }
            (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame2(oninterval, 67);
          }
          var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/, edgeUA = /\bEdge\/.(\d+)\b/, inIframe = window.top !== window.self;
          polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
          var requests = {}, requestAnimationFrame2 = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use"), numberOfSvgUseElementsToBypass = 0;
          polyfill && oninterval();
        }
        function getSVGAncestor(node) {
          for (var svg = node; svg.nodeName.toLowerCase() !== "svg" && (svg = svg.parentNode); ) {
          }
          return svg;
        }
        return svg4everybody2;
      });
    }
  });

  // node_modules/modujs/dist/main.esm.js
  function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof = function(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
      return Array.from(iter);
  }
  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = void 0;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var _default = /* @__PURE__ */ function() {
    function _default4(options) {
      _classCallCheck(this, _default4);
      this.mAttr = "data-" + options.dataName;
      this.mCaptureEvents = ["mouseenter", "mouseleave"];
      this.el = options.el;
    }
    _createClass(_default4, [{
      key: "mInit",
      value: function mInit(modules) {
        var _this = this;
        this.modules = modules;
        this.mCheckEventTarget = this.mCheckEventTarget.bind(this);
        if (this.events) {
          Object.keys(this.events).forEach(function(event) {
            return _this.mAddEvent(event);
          });
        }
      }
    }, {
      key: "mUpdate",
      value: function mUpdate(modules) {
        this.modules = modules;
      }
    }, {
      key: "mDestroy",
      value: function mDestroy() {
        var _this2 = this;
        if (this.events) {
          Object.keys(this.events).forEach(function(event) {
            return _this2.mRemoveEvent(event);
          });
        }
      }
    }, {
      key: "mAddEvent",
      value: function mAddEvent(event) {
        var capture = this.mCaptureEvents.includes(event) ? true : false;
        this.el.addEventListener(event, this.mCheckEventTarget, capture);
      }
    }, {
      key: "mRemoveEvent",
      value: function mRemoveEvent(event) {
        var capture = this.mCaptureEvents.includes(event) ? true : false;
        this.el.removeEventListener(event, this.mCheckEventTarget, capture);
      }
    }, {
      key: "mCheckEventTarget",
      value: function mCheckEventTarget(e) {
        var event = this.events[e.type];
        if (typeof event === "string") {
          this[event](e);
        } else {
          var data = "[" + this.mAttr + "]";
          var target = e.target;
          if (this.mCaptureEvents.includes(e.type)) {
            if (target.matches(data)) {
              this.mCallEventMethod(e, event, target);
            }
          } else {
            while (target && target !== document) {
              if (target.matches(data)) {
                if (this.mCallEventMethod(e, event, target) != "undefined") {
                  break;
                }
              }
              target = target.parentNode;
            }
          }
        }
      }
    }, {
      key: "mCallEventMethod",
      value: function mCallEventMethod(e, event, target) {
        var name = target.getAttribute(this.mAttr);
        if (event.hasOwnProperty(name)) {
          var method = event[name];
          if (!e.hasOwnProperty("currentTarget")) {
            Object.defineProperty(e, "currentTarget", {
              value: target
            });
          }
          if (!e.hasOwnProperty("curTarget")) {
            Object.defineProperty(e, "curTarget", {
              value: target
            });
          }
          this[method](e);
        }
      }
    }, {
      key: "$",
      value: function $(query, context) {
        var classIndex = query.indexOf(".");
        var idIndex = query.indexOf("#");
        var attrIndex = query.indexOf("[");
        var indexes = [classIndex, idIndex, attrIndex].filter(function(index2) {
          return index2 != -1;
        });
        var index = false;
        var name = query;
        var more = "";
        var parent = this.el;
        if (indexes.length) {
          index = Math.min.apply(Math, _toConsumableArray(indexes));
          name = query.slice(0, index);
          more = query.slice(index);
        }
        if (_typeof(context) == "object") {
          parent = context;
        }
        return parent.querySelectorAll("[" + this.mAttr + "=" + name + "]" + more);
      }
    }, {
      key: "parent",
      value: function parent(query, context) {
        var data = "[" + this.mAttr + "=" + query + "]";
        var parent2 = context.parentNode;
        while (parent2 && parent2 !== document) {
          if (parent2.matches(data)) {
            return parent2;
          }
          parent2 = parent2.parentNode;
        }
      }
    }, {
      key: "getData",
      value: function getData(name, context) {
        var target = context || this.el;
        return target.getAttribute(this.mAttr + "-" + name);
      }
    }, {
      key: "setData",
      value: function setData(name, value, context) {
        var target = context || this.el;
        return target.setAttribute(this.mAttr + "-" + name, value);
      }
    }, {
      key: "call",
      value: function call(func, args, mod, id) {
        var _this3 = this;
        if (args && !mod) {
          mod = args;
          args = false;
        }
        if (this.modules[mod]) {
          if (id) {
            if (this.modules[mod][id]) {
              this.modules[mod][id][func](args);
            }
          } else {
            Object.keys(this.modules[mod]).forEach(function(id2) {
              _this3.modules[mod][id2][func](args);
            });
          }
        }
      }
    }, {
      key: "on",
      value: function on(e, mod, func, id) {
        var _this4 = this;
        if (this.modules[mod]) {
          if (id) {
            this.modules[mod][id].el.addEventListener(e, function(o) {
              return func(o);
            });
          } else {
            Object.keys(this.modules[mod]).forEach(function(i) {
              _this4.modules[mod][i].el.addEventListener(e, function(o) {
                return func(o);
              });
            });
          }
        }
      }
    }, {
      key: "init",
      value: function init5() {
      }
    }, {
      key: "destroy",
      value: function destroy() {
      }
    }]);
    return _default4;
  }();
  var _default$1 = /* @__PURE__ */ function() {
    function _default4(options) {
      _classCallCheck(this, _default4);
      this.app;
      this.modules = options.modules;
      this.currentModules = {};
      this.activeModules = {};
      this.newModules = {};
      this.moduleId = 0;
    }
    _createClass(_default4, [{
      key: "init",
      value: function init5(app2, scope) {
        var _this = this;
        var container = scope || document;
        var elements = container.querySelectorAll("*");
        if (app2 && !this.app) {
          this.app = app2;
        }
        this.activeModules["app"] = {
          "app": this.app
        };
        elements.forEach(function(el) {
          Array.from(el.attributes).forEach(function(i) {
            if (i.name.startsWith("data-module")) {
              var moduleExists = false;
              var dataName = i.name.split("-").splice(2);
              var moduleName = _this.toCamel(dataName);
              if (_this.modules[moduleName]) {
                moduleExists = true;
              } else if (_this.modules[_this.toUpper(moduleName)]) {
                moduleName = _this.toUpper(moduleName);
                moduleExists = true;
              }
              if (moduleExists) {
                var options = {
                  el,
                  name: moduleName,
                  dataName: dataName.join("-")
                };
                var module = new _this.modules[moduleName](options);
                var id = i.value;
                if (!id) {
                  _this.moduleId++;
                  id = "m" + _this.moduleId;
                  el.setAttribute(i.name, id);
                }
                _this.addActiveModule(moduleName, id, module);
                var moduleId = moduleName + "-" + id;
                if (scope) {
                  _this.newModules[moduleId] = module;
                } else {
                  _this.currentModules[moduleId] = module;
                }
              }
            }
          });
        });
        Object.entries(this.currentModules).forEach(function(_ref) {
          var _ref2 = _slicedToArray(_ref, 2), id = _ref2[0], module = _ref2[1];
          if (scope) {
            var split = id.split("-");
            var moduleName = split.shift();
            var moduleId = split.pop();
            _this.addActiveModule(moduleName, moduleId, module);
          } else {
            _this.initModule(module);
          }
        });
      }
    }, {
      key: "initModule",
      value: function initModule(module) {
        module.mInit(this.activeModules);
        module.init();
      }
    }, {
      key: "addActiveModule",
      value: function addActiveModule(name, id, module) {
        if (this.activeModules[name]) {
          Object.assign(this.activeModules[name], _defineProperty({}, id, module));
        } else {
          this.activeModules[name] = _defineProperty({}, id, module);
        }
      }
    }, {
      key: "update",
      value: function update(scope) {
        var _this2 = this;
        this.init(this.app, scope);
        Object.entries(this.currentModules).forEach(function(_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2), id = _ref4[0], module = _ref4[1];
          module.mUpdate(_this2.activeModules);
        });
        Object.entries(this.newModules).forEach(function(_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2), id = _ref6[0], module = _ref6[1];
          _this2.initModule(module);
        });
        Object.assign(this.currentModules, this.newModules);
      }
    }, {
      key: "destroy",
      value: function destroy(scope) {
        if (scope) {
          this.destroyScope(scope);
        } else {
          this.destroyModules();
        }
      }
    }, {
      key: "destroyScope",
      value: function destroyScope(scope) {
        var _this3 = this;
        var elements = scope.querySelectorAll("*");
        elements.forEach(function(el) {
          Array.from(el.attributes).forEach(function(i) {
            if (i.name.startsWith("data-module")) {
              var id = i.value;
              var dataName = i.name.split("-").splice(2);
              var moduleName = _this3.toCamel(dataName) + "-" + id;
              var moduleExists = false;
              if (_this3.currentModules[moduleName]) {
                moduleExists = true;
              } else if (_this3.currentModules[_this3.toUpper(moduleName)]) {
                moduleName = _this3.toUpper(moduleName);
                moduleExists = true;
              }
              if (moduleExists) {
                _this3.destroyModule(_this3.currentModules[moduleName]);
                delete _this3.currentModules[moduleName];
              }
            }
          });
        });
        this.activeModules = {};
        this.newModules = {};
      }
    }, {
      key: "destroyModules",
      value: function destroyModules() {
        var _this4 = this;
        Object.entries(this.currentModules).forEach(function(_ref7) {
          var _ref8 = _slicedToArray(_ref7, 2), id = _ref8[0], module = _ref8[1];
          _this4.destroyModule(module);
        });
        this.currentModules = [];
      }
    }, {
      key: "destroyModule",
      value: function destroyModule(module) {
        module.mDestroy();
        module.destroy();
      }
    }, {
      key: "toCamel",
      value: function toCamel(arr) {
        var _this5 = this;
        return arr.reduce(function(a, b) {
          return a + _this5.toUpper(b);
        });
      }
    }, {
      key: "toUpper",
      value: function toUpper(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    }]);
    return _default4;
  }();
  var main_esm_default = _default$1;

  // assets/scripts/modules.js
  var modules_exports = {};
  __export(modules_exports, {
    Accordion: () => Accordion_default,
    ArticleSwitcher: () => ArticleSwitcher_default,
    CareerHero: () => CareerHero_default,
    Carousel: () => Carousel_default,
    CarouselCaseStudy: () => CarouselCaseStudy_default,
    CarouselJob: () => CarouselJob_default,
    CarouselQuote: () => CarouselQuote_default,
    CarouselWide: () => CarouselWide_default,
    CultureIcon: () => CultureIcon_default,
    Form: () => Form_default,
    FormJoinUs: () => FormJoinUs_default,
    FormRedirect: () => FormRedirect_default,
    HeaderProgress: () => HeaderProgress_default,
    JobList: () => JobList_default,
    Load: () => Load_default,
    Nav: () => Nav_default,
    NavButton: () => NavButton_default,
    NavCases: () => NavCases_default,
    NavControls: () => NavControls_default,
    Perks: () => Perks_default,
    Popup: () => Popup_default,
    Scroll: () => Scroll_default,
    Share: () => Share_default,
    ShareToggler: () => ShareToggler_default,
    Slider: () => Slider_default,
    SliderLogo: () => SliderLogo_default,
    Split: () => Split_default,
    SplitChars: () => SplitChars_default,
    TalkButton: () => TalkButton_default,
    Transition: () => Transition_default,
    TriggerPopup: () => TriggerPopup_default,
    VideoCopy: () => VideoCopy_default,
    Wysiwyg: () => Wysiwyg_default
  });

  // assets/scripts/utils/environment.js
  var html = document.documentElement;
  var body = document.body;
  var isDebug = !!html.getAttribute("data-debug");

  // node_modules/modularload/dist/main.esm.js
  function _classCallCheck2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties2(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass2(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties2(Constructor, staticProps);
    return Constructor;
  }
  function _slicedToArray2(arr, i) {
    return _arrayWithHoles2(arr) || _iterableToArrayLimit2(arr, i) || _unsupportedIterableToArray2(arr, i) || _nonIterableRest2();
  }
  function _arrayWithHoles2(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function _iterableToArrayLimit2(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = void 0;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _unsupportedIterableToArray2(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray2(o, minLen);
  }
  function _arrayLikeToArray2(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableRest2() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var _default2 = /* @__PURE__ */ function() {
    function _default4(options) {
      _classCallCheck2(this, _default4);
      this.defaults = {
        name: "load",
        loadingClass: "is-loading",
        loadedClass: "is-loaded",
        readyClass: "is-ready",
        transitionsPrefix: "is-",
        transitionsHistory: true,
        enterDelay: 0,
        exitDelay: 0,
        loadedDelay: 0,
        isLoaded: false,
        isEntered: false,
        isUrl: false,
        transitionContainer: null
      };
      Object.assign(this, this.defaults, options);
      this.options = options;
      this.namespace = "modular";
      this.html = document.documentElement;
      this.href = window.location.href;
      this.container = "data-" + this.name + "-container";
      this.subContainer = false;
      this.prevTransition = null;
      this.loadAttributes = ["src", "srcset", "style", "href"];
      this.isInserted = false;
      this.isLoading = false;
      this.enterTimeout = false;
      this.controller = new AbortController();
      this.classContainer = this.html;
      this.isChrome = navigator.userAgent.indexOf("Chrome") != -1 ? true : false;
      this.init();
    }
    _createClass2(_default4, [{
      key: "init",
      value: function init5() {
        var _this = this;
        window.addEventListener("popstate", function(e) {
          return _this.checkState(e);
        }, false);
        this.html.addEventListener("click", function(e) {
          return _this.checkClick(e);
        }, false);
        this.loadEls(document);
      }
    }, {
      key: "checkClick",
      value: function checkClick(e) {
        if (!e.ctrlKey && !e.metaKey) {
          var target = e.target;
          while (target && target !== document) {
            if (target.matches("a") && target.getAttribute("download") == null) {
              var href = target.getAttribute("href");
              if (!href.startsWith("#") && !href.startsWith("mailto:") && !href.startsWith("tel:")) {
                e.preventDefault();
                this.reset();
                this.getClickOptions(target);
              }
              break;
            }
            target = target.parentNode;
          }
        }
      }
    }, {
      key: "checkState",
      value: function checkState() {
        this.reset();
        this.getStateOptions();
      }
    }, {
      key: "reset",
      value: function reset() {
        if (this.isLoading) {
          this.controller.abort();
          this.isLoading = false;
          this.controller = new AbortController();
        }
        window.clearTimeout(this.enterTimeout);
        if (this.isInserted) {
          this.removeContainer();
        }
        this.classContainer = this.html;
        Object.assign(this, this.defaults, this.options);
      }
    }, {
      key: "getClickOptions",
      value: function getClickOptions(link) {
        this.transition = link.getAttribute("data-" + this.name);
        this.isUrl = link.getAttribute("data-" + this.name + "-url");
        var href = link.getAttribute("href");
        var target = link.getAttribute("target");
        if (target == "_blank") {
          window.open(href, "_blank");
          return;
        }
        if (this.transition == "false") {
          window.location = href;
          return;
        }
        this.setOptions(href, true);
      }
    }, {
      key: "getStateOptions",
      value: function getStateOptions() {
        if (this.transitionsHistory) {
          this.transition = history.state;
        } else {
          this.transition = false;
        }
        var href = window.location.href;
        this.setOptions(href);
      }
    }, {
      key: "goTo",
      value: function goTo(href, transition, isUrl) {
        this.reset();
        this.transition = transition;
        this.isUrl = isUrl;
        this.setOptions(href, true);
      }
    }, {
      key: "setOptions",
      value: function setOptions(href, push) {
        var container = "[" + this.container + "]";
        var oldContainer;
        if (this.transition && this.transition != "true") {
          this.transitionContainer = "[" + this.container + '="' + this.transition + '"]';
          this.loadingClass = this.transitions[this.transition].loadingClass || this.loadingClass;
          this.loadedClass = this.transitions[this.transition].loadedClass || this.loadedClass;
          this.readyClass = this.transitions[this.transition].readyClass || this.readyClass;
          this.transitionsPrefix = this.transitions[this.transition].transitionsPrefix || this.transitionsPrefix;
          this.enterDelay = this.transitions[this.transition].enterDelay || this.enterDelay;
          this.exitDelay = this.transitions[this.transition].exitDelay || this.exitDelay;
          this.loadedDelay = this.transitions[this.transition].loadedDelay || this.loadedDelay;
          oldContainer = document.querySelector(this.transitionContainer);
        }
        if (oldContainer) {
          container = this.transitionContainer;
          this.oldContainer = oldContainer;
          this.classContainer = this.oldContainer.parentNode;
          if (!this.subContainer) {
            history.replaceState(this.transition, null, this.href);
          }
          this.subContainer = true;
        } else {
          this.oldContainer = document.querySelector(container);
          if (this.subContainer) {
            history.replaceState(this.prevTransition, null, this.href);
          }
          this.subContainer = false;
        }
        this.href = href;
        this.parentContainer = this.oldContainer.parentNode;
        if (this.isUrl === "" || this.isUrl != null && this.isUrl != "false" && this.isUrl != false) {
          history.pushState(this.transition, null, href);
        } else {
          this.oldContainer.classList.add("is-old");
          this.setLoading();
          this.startEnterDelay();
          this.loadHref(href, container, push);
        }
      }
    }, {
      key: "setLoading",
      value: function setLoading() {
        this.classContainer.classList.remove(this.loadedClass, this.readyClass);
        this.classContainer.classList.add(this.loadingClass);
        this.classContainer.classList.remove(this.transitionsPrefix + this.prevTransition);
        if (this.transition) {
          this.classContainer.classList.add(this.transitionsPrefix + this.transition);
        }
        if (!this.subContainer) {
          this.prevTransition = this.transition;
        }
        var loadingEvent = new Event(this.namespace + "loading");
        window.dispatchEvent(loadingEvent);
      }
    }, {
      key: "startEnterDelay",
      value: function startEnterDelay() {
        var _this2 = this;
        this.enterTimeout = window.setTimeout(function() {
          _this2.isEntered = true;
          if (_this2.isLoaded) {
            _this2.transitionContainers();
          }
        }, this.enterDelay);
      }
    }, {
      key: "loadHref",
      value: function loadHref(href, container, push) {
        var _this3 = this;
        this.isLoading = true;
        var signal = this.controller.signal;
        fetch(href, {
          signal
        }).then(function(response) {
          return response.text();
        }).then(function(data) {
          if (push) {
            history.pushState(_this3.transition, null, href);
          }
          var parser = new DOMParser();
          _this3.data = parser.parseFromString(data, "text/html");
          _this3.newContainer = _this3.data.querySelector(container);
          _this3.newContainer.classList.add("is-new");
          _this3.parentNewContainer = _this3.newContainer.parentNode;
          _this3.hideContainer();
          _this3.parentContainer.insertBefore(_this3.newContainer, _this3.oldContainer);
          _this3.isInserted = true;
          _this3.setSvgs();
          _this3.isLoaded = true;
          if (_this3.isEntered) {
            _this3.transitionContainers();
          }
          _this3.loadEls(_this3.newContainer);
          _this3.isLoading = false;
        })["catch"](function(err) {
          window.location = href;
        });
      }
    }, {
      key: "transitionContainers",
      value: function transitionContainers() {
        var _this4 = this;
        this.setAttributes();
        this.showContainer();
        this.setLoaded();
        setTimeout(function() {
          _this4.removeContainer();
          _this4.setReady();
        }, this.exitDelay);
      }
    }, {
      key: "setSvgs",
      value: function setSvgs() {
        if (this.isChrome) {
          var svgs = this.newContainer.querySelectorAll("use");
          if (svgs.length) {
            svgs.forEach(function(svg) {
              var xhref = svg.getAttribute("xlink:href");
              if (xhref) {
                svg.parentNode.innerHTML = '<use xlink:href="' + xhref + '"></use>';
              } else {
                var href = svg.getAttribute("href");
                if (href)
                  svg.parentNode.innerHTML = '<use href="' + href + '"></use>';
              }
            });
          }
        }
      }
    }, {
      key: "setAttributes",
      value: function setAttributes() {
        var _this5 = this;
        var title = this.data.getElementsByTagName("title")[0];
        var newDesc = this.data.head.querySelector('meta[name="description"]');
        var oldDesc = document.head.querySelector('meta[name="description"]');
        var container;
        var newContainer;
        if (this.subContainer) {
          newContainer = this.parentNewContainer;
          container = document.querySelector(this.transitionContainer).parentNode;
        } else {
          newContainer = this.data.querySelector("html");
          container = document.querySelector("html");
        }
        var datas = Object.assign({}, newContainer.dataset);
        if (title)
          document.title = title.innerText;
        if (oldDesc && newDesc)
          oldDesc.setAttribute("content", newDesc.getAttribute("content"));
        if (datas) {
          Object.entries(datas).forEach(function(_ref) {
            var _ref2 = _slicedToArray2(_ref, 2), key = _ref2[0], val = _ref2[1];
            container.setAttribute("data-" + _this5.toDash(key), val);
          });
        }
      }
    }, {
      key: "toDash",
      value: function toDash(str) {
        return str.split(/(?=[A-Z])/).join("-").toLowerCase();
      }
    }, {
      key: "hideContainer",
      value: function hideContainer() {
        this.newContainer.style.visibility = "hidden";
        this.newContainer.style.height = 0;
        this.newContainer.style.overflow = "hidden";
      }
    }, {
      key: "showContainer",
      value: function showContainer() {
        this.newContainer.style.visibility = "";
        this.newContainer.style.height = "";
        this.newContainer.style.overflow = "";
      }
    }, {
      key: "loadEls",
      value: function loadEls(container) {
        var _this6 = this;
        var promises = [];
        this.loadAttributes.forEach(function(attr) {
          var data = "data-" + _this6.name + "-" + attr;
          var els = container.querySelectorAll("[" + data + "]");
          if (els.length) {
            els.forEach(function(el) {
              var elData = el.getAttribute(data);
              el.setAttribute(attr, elData);
              if (attr == "src" || attr == "srcset") {
                var promise = new Promise(function(resolve) {
                  el.onload = function() {
                    return resolve(el);
                  };
                });
                promises.push(promise);
              }
            });
          }
        });
        Promise.all(promises).then(function(val) {
          var imagesEvent = new Event(_this6.namespace + "images");
          window.dispatchEvent(imagesEvent);
        });
      }
    }, {
      key: "setLoaded",
      value: function setLoaded() {
        var _this7 = this;
        this.classContainer.classList.remove(this.loadingClass);
        setTimeout(function() {
          _this7.classContainer.classList.add(_this7.loadedClass);
        }, this.loadedDelay);
        var loadedEvent = new Event(this.namespace + "loaded");
        window.dispatchEvent(loadedEvent);
      }
    }, {
      key: "removeContainer",
      value: function removeContainer() {
        this.parentContainer.removeChild(this.oldContainer);
        this.newContainer.classList.remove("is-new");
        this.isInserted = false;
      }
    }, {
      key: "setReady",
      value: function setReady() {
        this.classContainer.classList.add(this.readyClass);
        var readyEvent = new Event(this.namespace + "ready");
        window.dispatchEvent(readyEvent);
      }
    }, {
      key: "on",
      value: function on(event, func) {
        var _this8 = this;
        window.addEventListener(this.namespace + event, function() {
          switch (event) {
            case "loading":
              return func(_this8.transition, _this8.oldContainer);
            case "loaded":
              return func(_this8.transition, _this8.oldContainer, _this8.newContainer);
            case "ready":
              return func(_this8.transition, _this8.newContainer);
            default:
              return func();
          }
        }, false);
      }
    }]);
    return _default4;
  }();
  var main_esm_default2 = _default2;

  // assets/scripts/modules/Load.js
  var Load_default = class extends _default {
    constructor(m) {
      super(m);
    }
    init() {
      this.analyticsId = this.getData("analytics");
      this.load = new main_esm_default2({
        enterDelay: 1e3,
        transitions: {
          customTransition: {}
        }
      });
      this.load.on("loading", (transition, oldContainer) => {
        html.classList.remove("has-dom-ready");
        html.classList.remove("is-animated");
        setTimeout(() => {
          html.classList.remove("has-nav-open");
        }, 600);
      });
      this.load.on("loaded", (transition, oldContainer, newContainer) => {
        this.call("destroy", oldContainer, "app");
        this.call("update", newContainer, "app");
        if (window.gtag && this.analyticsId != null) {
          gtag("config", this.analyticsId, {
            "page_path": location.pathname,
            "page_title": document.title
          });
        }
        setTimeout(() => {
          html.classList.add("has-dom-ready");
          setTimeout(() => {
            html.classList.add("is-animated");
            this.call("updatePositions", "Transition");
          }, 1200);
        }, 1e3);
      });
    }
    goTo(options) {
      this.load.goTo(options.url, options.transitionName);
    }
  };

  // node_modules/locomotive-scroll/dist/locomotive-scroll.esm.js
  function _classCallCheck3(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties3(t, e) {
    for (var i = 0; i < e.length; i++) {
      var s = e[i];
      s.enumerable = s.enumerable || false, s.configurable = true, "value" in s && (s.writable = true), Object.defineProperty(t, s.key, s);
    }
  }
  function _createClass3(t, e, i) {
    return e && _defineProperties3(t.prototype, e), i && _defineProperties3(t, i), t;
  }
  function _defineProperty2(t, e, i) {
    return e in t ? Object.defineProperty(t, e, { value: i, enumerable: true, configurable: true, writable: true }) : t[e] = i, t;
  }
  function ownKeys(t, e) {
    var i = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var s = Object.getOwnPropertySymbols(t);
      e && (s = s.filter(function(e2) {
        return Object.getOwnPropertyDescriptor(t, e2).enumerable;
      })), i.push.apply(i, s);
    }
    return i;
  }
  function _objectSpread2(t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = arguments[e] != null ? arguments[e] : {};
      e % 2 ? ownKeys(Object(i), true).forEach(function(e2) {
        _defineProperty2(t, e2, i[e2]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : ownKeys(Object(i)).forEach(function(e2) {
        Object.defineProperty(t, e2, Object.getOwnPropertyDescriptor(i, e2));
      });
    }
    return t;
  }
  function _inherits(t, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: true, configurable: true } }), e && _setPrototypeOf(t, e);
  }
  function _getPrototypeOf(t) {
    return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(t2) {
      return t2.__proto__ || Object.getPrototypeOf(t2);
    })(t);
  }
  function _setPrototypeOf(t, e) {
    return (_setPrototypeOf = Object.setPrototypeOf || function(t2, e2) {
      return t2.__proto__ = e2, t2;
    })(t, e);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect == "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy == "function")
      return true;
    try {
      return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
      })), true;
    } catch (t) {
      return false;
    }
  }
  function _assertThisInitialized(t) {
    if (t === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function _possibleConstructorReturn(t, e) {
    return !e || typeof e != "object" && typeof e != "function" ? _assertThisInitialized(t) : e;
  }
  function _createSuper(t) {
    var e = _isNativeReflectConstruct();
    return function() {
      var i, s = _getPrototypeOf(t);
      if (e) {
        var n = _getPrototypeOf(this).constructor;
        i = Reflect.construct(s, arguments, n);
      } else
        i = s.apply(this, arguments);
      return _possibleConstructorReturn(this, i);
    };
  }
  function _superPropBase(t, e) {
    for (; !Object.prototype.hasOwnProperty.call(t, e) && (t = _getPrototypeOf(t)) !== null; )
      ;
    return t;
  }
  function _get(t, e, i) {
    return (_get = typeof Reflect != "undefined" && Reflect.get ? Reflect.get : function(t2, e2, i2) {
      var s = _superPropBase(t2, e2);
      if (s) {
        var n = Object.getOwnPropertyDescriptor(s, e2);
        return n.get ? n.get.call(i2) : n.value;
      }
    })(t, e, i || t);
  }
  function _slicedToArray3(t, e) {
    return _arrayWithHoles3(t) || _iterableToArrayLimit3(t, e) || _unsupportedIterableToArray3(t, e) || _nonIterableRest3();
  }
  function _toConsumableArray2(t) {
    return _arrayWithoutHoles2(t) || _iterableToArray2(t) || _unsupportedIterableToArray3(t) || _nonIterableSpread2();
  }
  function _arrayWithoutHoles2(t) {
    if (Array.isArray(t))
      return _arrayLikeToArray3(t);
  }
  function _arrayWithHoles3(t) {
    if (Array.isArray(t))
      return t;
  }
  function _iterableToArray2(t) {
    if (typeof Symbol != "undefined" && Symbol.iterator in Object(t))
      return Array.from(t);
  }
  function _iterableToArrayLimit3(t, e) {
    if (typeof Symbol != "undefined" && Symbol.iterator in Object(t)) {
      var i = [], s = true, n = false, o = void 0;
      try {
        for (var r, l = t[Symbol.iterator](); !(s = (r = l.next()).done) && (i.push(r.value), !e || i.length !== e); s = true)
          ;
      } catch (t2) {
        n = true, o = t2;
      } finally {
        try {
          s || l.return == null || l.return();
        } finally {
          if (n)
            throw o;
        }
      }
      return i;
    }
  }
  function _unsupportedIterableToArray3(t, e) {
    if (t) {
      if (typeof t == "string")
        return _arrayLikeToArray3(t, e);
      var i = Object.prototype.toString.call(t).slice(8, -1);
      return i === "Object" && t.constructor && (i = t.constructor.name), i === "Map" || i === "Set" ? Array.from(t) : i === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? _arrayLikeToArray3(t, e) : void 0;
    }
  }
  function _arrayLikeToArray3(t, e) {
    (e == null || e > t.length) && (e = t.length);
    for (var i = 0, s = new Array(e); i < e; i++)
      s[i] = t[i];
    return s;
  }
  function _nonIterableSpread2() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest3() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var defaults = { el: document, name: "scroll", offset: [0, 0], repeat: false, smooth: false, direction: "vertical", gestureDirection: "vertical", reloadOnContextChange: false, lerp: 0.1, class: "is-inview", scrollbarContainer: false, scrollbarClass: "c-scrollbar", scrollingClass: "has-scroll-scrolling", draggingClass: "has-scroll-dragging", smoothClass: "has-scroll-smooth", initClass: "has-scroll-init", getSpeed: false, getDirection: false, scrollFromAnywhere: false, multiplier: 1, firefoxMultiplier: 50, touchMultiplier: 2, resetNativeScroll: true, tablet: { smooth: false, direction: "vertical", gestureDirection: "vertical", breakpoint: 1024 }, smartphone: { smooth: false, direction: "vertical", gestureDirection: "vertical" } };
  var _default3 = function() {
    function t() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      _classCallCheck3(this, t), Object.assign(this, defaults, e), this.smartphone = defaults.smartphone, e.smartphone && Object.assign(this.smartphone, e.smartphone), this.tablet = defaults.tablet, e.tablet && Object.assign(this.tablet, e.tablet), this.namespace = "locomotive", this.html = document.documentElement, this.windowHeight = window.innerHeight, this.windowWidth = window.innerWidth, this.windowMiddle = { x: this.windowWidth / 2, y: this.windowHeight / 2 }, this.els = {}, this.currentElements = {}, this.listeners = {}, this.hasScrollTicking = false, this.hasCallEventSet = false, this.checkScroll = this.checkScroll.bind(this), this.checkResize = this.checkResize.bind(this), this.checkEvent = this.checkEvent.bind(this), this.instance = { scroll: { x: 0, y: 0 }, limit: { x: this.html.offsetHeight, y: this.html.offsetHeight }, currentElements: this.currentElements }, this.isMobile ? this.isTablet ? this.context = "tablet" : this.context = "smartphone" : this.context = "desktop", this.isMobile && (this.direction = this[this.context].direction), this.direction === "horizontal" ? this.directionAxis = "x" : this.directionAxis = "y", this.getDirection && (this.instance.direction = null), this.getDirection && (this.instance.speed = 0), this.html.classList.add(this.initClass), window.addEventListener("resize", this.checkResize, false);
    }
    return _createClass3(t, [{ key: "init", value: function() {
      this.initEvents();
    } }, { key: "checkScroll", value: function() {
      this.dispatchScroll();
    } }, { key: "checkResize", value: function() {
      var t2 = this;
      this.resizeTick || (this.resizeTick = true, requestAnimationFrame(function() {
        t2.resize(), t2.resizeTick = false;
      }));
    } }, { key: "resize", value: function() {
    } }, { key: "checkContext", value: function() {
      if (this.reloadOnContextChange) {
        this.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1 || this.windowWidth < this.tablet.breakpoint, this.isTablet = this.isMobile && this.windowWidth >= this.tablet.breakpoint;
        var t2 = this.context;
        if (this.isMobile ? this.isTablet ? this.context = "tablet" : this.context = "smartphone" : this.context = "desktop", t2 != this.context)
          (t2 == "desktop" ? this.smooth : this[t2].smooth) != (this.context == "desktop" ? this.smooth : this[this.context].smooth) && window.location.reload();
      }
    } }, { key: "initEvents", value: function() {
      var t2 = this;
      this.scrollToEls = this.el.querySelectorAll("[data-".concat(this.name, "-to]")), this.setScrollTo = this.setScrollTo.bind(this), this.scrollToEls.forEach(function(e) {
        e.addEventListener("click", t2.setScrollTo, false);
      });
    } }, { key: "setScrollTo", value: function(t2) {
      t2.preventDefault(), this.scrollTo(t2.currentTarget.getAttribute("data-".concat(this.name, "-href")) || t2.currentTarget.getAttribute("href"), { offset: t2.currentTarget.getAttribute("data-".concat(this.name, "-offset")) });
    } }, { key: "addElements", value: function() {
    } }, { key: "detectElements", value: function(t2) {
      var e = this, i = this.instance.scroll.y, s = i + this.windowHeight, n = this.instance.scroll.x, o = n + this.windowWidth;
      Object.entries(this.els).forEach(function(r) {
        var l = _slicedToArray3(r, 2), a = l[0], c = l[1];
        if (!c || c.inView && !t2 || (e.direction === "horizontal" ? o >= c.left && n < c.right && e.setInView(c, a) : s >= c.top && i < c.bottom && e.setInView(c, a)), c && c.inView)
          if (e.direction === "horizontal") {
            var h = c.right - c.left;
            c.progress = (e.instance.scroll.x - (c.left - e.windowWidth)) / (h + e.windowWidth), (o < c.left || n > c.right) && e.setOutOfView(c, a);
          } else {
            var d = c.bottom - c.top;
            c.progress = (e.instance.scroll.y - (c.top - e.windowHeight)) / (d + e.windowHeight), (s < c.top || i > c.bottom) && e.setOutOfView(c, a);
          }
      }), this.hasScrollTicking = false;
    } }, { key: "setInView", value: function(t2, e) {
      this.els[e].inView = true, t2.el.classList.add(t2.class), this.currentElements[e] = t2, t2.call && this.hasCallEventSet && (this.dispatchCall(t2, "enter"), t2.repeat || (this.els[e].call = false));
    } }, { key: "setOutOfView", value: function(t2, e) {
      var i = this;
      this.els[e].inView = false, Object.keys(this.currentElements).forEach(function(t3) {
        t3 === e && delete i.currentElements[t3];
      }), t2.call && this.hasCallEventSet && this.dispatchCall(t2, "exit"), t2.repeat && t2.el.classList.remove(t2.class);
    } }, { key: "dispatchCall", value: function(t2, e) {
      this.callWay = e, this.callValue = t2.call.split(",").map(function(t3) {
        return t3.trim();
      }), this.callObj = t2, this.callValue.length == 1 && (this.callValue = this.callValue[0]);
      var i = new Event(this.namespace + "call");
      this.el.dispatchEvent(i);
    } }, { key: "dispatchScroll", value: function() {
      var t2 = new Event(this.namespace + "scroll");
      this.el.dispatchEvent(t2);
    } }, { key: "setEvents", value: function(t2, e) {
      this.listeners[t2] || (this.listeners[t2] = []);
      var i = this.listeners[t2];
      i.push(e), i.length === 1 && this.el.addEventListener(this.namespace + t2, this.checkEvent, false), t2 === "call" && (this.hasCallEventSet = true, this.detectElements(true));
    } }, { key: "unsetEvents", value: function(t2, e) {
      if (this.listeners[t2]) {
        var i = this.listeners[t2], s = i.indexOf(e);
        s < 0 || (i.splice(s, 1), i.index === 0 && this.el.removeEventListener(this.namespace + t2, this.checkEvent, false));
      }
    } }, { key: "checkEvent", value: function(t2) {
      var e = this, i = t2.type.replace(this.namespace, ""), s = this.listeners[i];
      s && s.length !== 0 && s.forEach(function(t3) {
        switch (i) {
          case "scroll":
            return t3(e.instance);
          case "call":
            return t3(e.callValue, e.callWay, e.callObj);
          default:
            return t3();
        }
      });
    } }, { key: "startScroll", value: function() {
    } }, { key: "stopScroll", value: function() {
    } }, { key: "setScroll", value: function(t2, e) {
      this.instance.scroll = { x: 0, y: 0 };
    } }, { key: "destroy", value: function() {
      var t2 = this;
      window.removeEventListener("resize", this.checkResize, false), Object.keys(this.listeners).forEach(function(e) {
        t2.el.removeEventListener(t2.namespace + e, t2.checkEvent, false);
      }), this.listeners = {}, this.scrollToEls.forEach(function(e) {
        e.removeEventListener("click", t2.setScrollTo, false);
      }), this.html.classList.remove(this.initClass);
    } }]), t;
  }();
  var commonjsGlobal = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
  function createCommonjsModule(t, e) {
    return t(e = { exports: {} }, e.exports), e.exports;
  }
  var smoothscroll = createCommonjsModule(function(t, e) {
    t.exports = { polyfill: function() {
      var t2 = window, e2 = document;
      if (!("scrollBehavior" in e2.documentElement.style) || t2.__forceSmoothScrollPolyfill__ === true) {
        var i, s = t2.HTMLElement || t2.Element, n = { scroll: t2.scroll || t2.scrollTo, scrollBy: t2.scrollBy, elementScroll: s.prototype.scroll || l, scrollIntoView: s.prototype.scrollIntoView }, o = t2.performance && t2.performance.now ? t2.performance.now.bind(t2.performance) : Date.now, r = (i = t2.navigator.userAgent, new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(i) ? 1 : 0);
        t2.scroll = t2.scrollTo = function() {
          arguments[0] !== void 0 && (a(arguments[0]) !== true ? p.call(t2, e2.body, arguments[0].left !== void 0 ? ~~arguments[0].left : t2.scrollX || t2.pageXOffset, arguments[0].top !== void 0 ? ~~arguments[0].top : t2.scrollY || t2.pageYOffset) : n.scroll.call(t2, arguments[0].left !== void 0 ? arguments[0].left : typeof arguments[0] != "object" ? arguments[0] : t2.scrollX || t2.pageXOffset, arguments[0].top !== void 0 ? arguments[0].top : arguments[1] !== void 0 ? arguments[1] : t2.scrollY || t2.pageYOffset));
        }, t2.scrollBy = function() {
          arguments[0] !== void 0 && (a(arguments[0]) ? n.scrollBy.call(t2, arguments[0].left !== void 0 ? arguments[0].left : typeof arguments[0] != "object" ? arguments[0] : 0, arguments[0].top !== void 0 ? arguments[0].top : arguments[1] !== void 0 ? arguments[1] : 0) : p.call(t2, e2.body, ~~arguments[0].left + (t2.scrollX || t2.pageXOffset), ~~arguments[0].top + (t2.scrollY || t2.pageYOffset)));
        }, s.prototype.scroll = s.prototype.scrollTo = function() {
          if (arguments[0] !== void 0)
            if (a(arguments[0]) !== true) {
              var t3 = arguments[0].left, e3 = arguments[0].top;
              p.call(this, this, t3 === void 0 ? this.scrollLeft : ~~t3, e3 === void 0 ? this.scrollTop : ~~e3);
            } else {
              if (typeof arguments[0] == "number" && arguments[1] === void 0)
                throw new SyntaxError("Value could not be converted");
              n.elementScroll.call(this, arguments[0].left !== void 0 ? ~~arguments[0].left : typeof arguments[0] != "object" ? ~~arguments[0] : this.scrollLeft, arguments[0].top !== void 0 ? ~~arguments[0].top : arguments[1] !== void 0 ? ~~arguments[1] : this.scrollTop);
            }
        }, s.prototype.scrollBy = function() {
          arguments[0] !== void 0 && (a(arguments[0]) !== true ? this.scroll({ left: ~~arguments[0].left + this.scrollLeft, top: ~~arguments[0].top + this.scrollTop, behavior: arguments[0].behavior }) : n.elementScroll.call(this, arguments[0].left !== void 0 ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, arguments[0].top !== void 0 ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop));
        }, s.prototype.scrollIntoView = function() {
          if (a(arguments[0]) !== true) {
            var i2 = u(this), s2 = i2.getBoundingClientRect(), o2 = this.getBoundingClientRect();
            i2 !== e2.body ? (p.call(this, i2, i2.scrollLeft + o2.left - s2.left, i2.scrollTop + o2.top - s2.top), t2.getComputedStyle(i2).position !== "fixed" && t2.scrollBy({ left: s2.left, top: s2.top, behavior: "smooth" })) : t2.scrollBy({ left: o2.left, top: o2.top, behavior: "smooth" });
          } else
            n.scrollIntoView.call(this, arguments[0] === void 0 || arguments[0]);
        };
      }
      function l(t3, e3) {
        this.scrollLeft = t3, this.scrollTop = e3;
      }
      function a(t3) {
        if (t3 === null || typeof t3 != "object" || t3.behavior === void 0 || t3.behavior === "auto" || t3.behavior === "instant")
          return true;
        if (typeof t3 == "object" && t3.behavior === "smooth")
          return false;
        throw new TypeError("behavior member of ScrollOptions " + t3.behavior + " is not a valid value for enumeration ScrollBehavior.");
      }
      function c(t3, e3) {
        return e3 === "Y" ? t3.clientHeight + r < t3.scrollHeight : e3 === "X" ? t3.clientWidth + r < t3.scrollWidth : void 0;
      }
      function h(e3, i2) {
        var s2 = t2.getComputedStyle(e3, null)["overflow" + i2];
        return s2 === "auto" || s2 === "scroll";
      }
      function d(t3) {
        var e3 = c(t3, "Y") && h(t3, "Y"), i2 = c(t3, "X") && h(t3, "X");
        return e3 || i2;
      }
      function u(t3) {
        for (; t3 !== e2.body && d(t3) === false; )
          t3 = t3.parentNode || t3.host;
        return t3;
      }
      function f(e3) {
        var i2, s2, n2, r2, l2 = (o() - e3.startTime) / 468;
        r2 = l2 = l2 > 1 ? 1 : l2, i2 = 0.5 * (1 - Math.cos(Math.PI * r2)), s2 = e3.startX + (e3.x - e3.startX) * i2, n2 = e3.startY + (e3.y - e3.startY) * i2, e3.method.call(e3.scrollable, s2, n2), s2 === e3.x && n2 === e3.y || t2.requestAnimationFrame(f.bind(t2, e3));
      }
      function p(i2, s2, r2) {
        var a2, c2, h2, d2, u2 = o();
        i2 === e2.body ? (a2 = t2, c2 = t2.scrollX || t2.pageXOffset, h2 = t2.scrollY || t2.pageYOffset, d2 = n.scroll) : (a2 = i2, c2 = i2.scrollLeft, h2 = i2.scrollTop, d2 = l), f({ scrollable: a2, method: d2, startTime: u2, startX: c2, startY: h2, x: s2, y: r2 });
      }
    } };
  });
  var smoothscroll_1 = smoothscroll.polyfill;
  var _default$12 = function(t) {
    _inherits(i, t);
    var e = _createSuper(i);
    function i() {
      var t2, s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return _classCallCheck3(this, i), (t2 = e.call(this, s)).resetNativeScroll && (history.scrollRestoration && (history.scrollRestoration = "manual"), window.scrollTo(0, 0)), window.addEventListener("scroll", t2.checkScroll, false), window.smoothscrollPolyfill === void 0 && (window.smoothscrollPolyfill = smoothscroll, window.smoothscrollPolyfill.polyfill()), t2;
    }
    return _createClass3(i, [{ key: "init", value: function() {
      this.instance.scroll.y = window.pageYOffset, this.addElements(), this.detectElements(), _get(_getPrototypeOf(i.prototype), "init", this).call(this);
    } }, { key: "checkScroll", value: function() {
      var t2 = this;
      _get(_getPrototypeOf(i.prototype), "checkScroll", this).call(this), this.getDirection && this.addDirection(), this.getSpeed && (this.addSpeed(), this.speedTs = Date.now()), this.instance.scroll.y = window.pageYOffset, Object.entries(this.els).length && (this.hasScrollTicking || (requestAnimationFrame(function() {
        t2.detectElements();
      }), this.hasScrollTicking = true));
    } }, { key: "addDirection", value: function() {
      window.pageYOffset > this.instance.scroll.y ? this.instance.direction !== "down" && (this.instance.direction = "down") : window.pageYOffset < this.instance.scroll.y && this.instance.direction !== "up" && (this.instance.direction = "up");
    } }, { key: "addSpeed", value: function() {
      window.pageYOffset != this.instance.scroll.y ? this.instance.speed = (window.pageYOffset - this.instance.scroll.y) / Math.max(1, Date.now() - this.speedTs) : this.instance.speed = 0;
    } }, { key: "resize", value: function() {
      Object.entries(this.els).length && (this.windowHeight = window.innerHeight, this.updateElements());
    } }, { key: "addElements", value: function() {
      var t2 = this;
      this.els = {}, this.el.querySelectorAll("[data-" + this.name + "]").forEach(function(e2, i2) {
        var s = e2.getBoundingClientRect(), n = e2.dataset[t2.name + "Class"] || t2.class, o = typeof e2.dataset[t2.name + "Id"] == "string" ? e2.dataset[t2.name + "Id"] : i2, r = s.top + t2.instance.scroll.y, l = s.left, a = s.right, c = r + e2.offsetHeight, h = typeof e2.dataset[t2.name + "Offset"] == "string" ? e2.dataset[t2.name + "Offset"].split(",") : t2.offset, d = e2.dataset[t2.name + "Repeat"], u = e2.dataset[t2.name + "Call"];
        d = d != "false" && (d != null || t2.repeat);
        var f = t2.getRelativeOffset(h), p = { el: e2, id: o, class: n, top: r + f[0], bottom: c - f[1], left: l, right: a, offset: h, progress: 0, repeat: d, inView: false, call: u };
        t2.els[o] = p, e2.classList.contains(n) && t2.setInView(t2.els[o], o);
      });
    } }, { key: "updateElements", value: function() {
      var t2 = this;
      Object.entries(this.els).forEach(function(e2) {
        var i2 = _slicedToArray3(e2, 2), s = i2[0], n = i2[1], o = n.el.getBoundingClientRect().top + t2.instance.scroll.y, r = o + n.el.offsetHeight, l = t2.getRelativeOffset(n.offset);
        t2.els[s].top = o + l[0], t2.els[s].bottom = r - l[1];
      }), this.hasScrollTicking = false;
    } }, { key: "getRelativeOffset", value: function(t2) {
      var e2 = [0, 0];
      if (t2)
        for (var i2 = 0; i2 < t2.length; i2++)
          typeof t2[i2] == "string" ? t2[i2].includes("%") ? e2[i2] = parseInt(t2[i2].replace("%", "") * this.windowHeight / 100) : e2[i2] = parseInt(t2[i2]) : e2[i2] = t2[i2];
      return e2;
    } }, { key: "scrollTo", value: function(t2) {
      var e2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i2 = parseInt(e2.offset) || 0, s = !!e2.callback && e2.callback;
      if (typeof t2 == "string") {
        if (t2 === "top")
          t2 = this.html;
        else if (t2 === "bottom")
          t2 = this.html.offsetHeight - window.innerHeight;
        else if (!(t2 = document.querySelector(t2)))
          return;
      } else if (typeof t2 == "number")
        t2 = parseInt(t2);
      else if (!t2 || !t2.tagName)
        return void console.warn("`target` parameter is not valid");
      if (i2 = typeof t2 != "number" ? t2.getBoundingClientRect().top + i2 + this.instance.scroll.y : t2 + i2, s) {
        i2 = i2.toFixed();
        var n = function t3() {
          window.pageYOffset.toFixed() === i2 && (window.removeEventListener("scroll", t3), s());
        };
        window.addEventListener("scroll", n);
      }
      window.scrollTo({ top: i2, behavior: "smooth" });
    } }, { key: "update", value: function() {
      this.addElements(), this.detectElements();
    } }, { key: "destroy", value: function() {
      _get(_getPrototypeOf(i.prototype), "destroy", this).call(this), window.removeEventListener("scroll", this.checkScroll, false);
    } }]), i;
  }(_default3);
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;
  function toObject(t) {
    if (t == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(t);
  }
  function shouldUseNative() {
    try {
      if (!Object.assign)
        return false;
      var t = new String("abc");
      if (t[5] = "de", Object.getOwnPropertyNames(t)[0] === "5")
        return false;
      for (var e = {}, i = 0; i < 10; i++)
        e["_" + String.fromCharCode(i)] = i;
      if (Object.getOwnPropertyNames(e).map(function(t2) {
        return e[t2];
      }).join("") !== "0123456789")
        return false;
      var s = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(t2) {
        s[t2] = t2;
      }), Object.keys(Object.assign({}, s)).join("") === "abcdefghijklmnopqrst";
    } catch (t2) {
      return false;
    }
  }
  var objectAssign = shouldUseNative() ? Object.assign : function(t, e) {
    for (var i, s, n = toObject(t), o = 1; o < arguments.length; o++) {
      for (var r in i = Object(arguments[o]))
        hasOwnProperty.call(i, r) && (n[r] = i[r]);
      if (getOwnPropertySymbols) {
        s = getOwnPropertySymbols(i);
        for (var l = 0; l < s.length; l++)
          propIsEnumerable.call(i, s[l]) && (n[s[l]] = i[s[l]]);
      }
    }
    return n;
  };
  function E() {
  }
  E.prototype = { on: function(t, e, i) {
    var s = this.e || (this.e = {});
    return (s[t] || (s[t] = [])).push({ fn: e, ctx: i }), this;
  }, once: function(t, e, i) {
    var s = this;
    function n() {
      s.off(t, n), e.apply(i, arguments);
    }
    return n._ = e, this.on(t, n, i);
  }, emit: function(t) {
    for (var e = [].slice.call(arguments, 1), i = ((this.e || (this.e = {}))[t] || []).slice(), s = 0, n = i.length; s < n; s++)
      i[s].fn.apply(i[s].ctx, e);
    return this;
  }, off: function(t, e) {
    var i = this.e || (this.e = {}), s = i[t], n = [];
    if (s && e)
      for (var o = 0, r = s.length; o < r; o++)
        s[o].fn !== e && s[o].fn._ !== e && n.push(s[o]);
    return n.length ? i[t] = n : delete i[t], this;
  } };
  var tinyEmitter = E;
  var lethargy = createCommonjsModule(function(t, e) {
    (function() {
      (e !== null ? e : this).Lethargy = function() {
        function t2(t3, e2, i, s) {
          this.stability = t3 != null ? Math.abs(t3) : 8, this.sensitivity = e2 != null ? 1 + Math.abs(e2) : 100, this.tolerance = i != null ? 1 + Math.abs(i) : 1.1, this.delay = s != null ? s : 150, this.lastUpDeltas = function() {
            var t4, e3, i2;
            for (i2 = [], t4 = 1, e3 = 2 * this.stability; 1 <= e3 ? t4 <= e3 : t4 >= e3; 1 <= e3 ? t4++ : t4--)
              i2.push(null);
            return i2;
          }.call(this), this.lastDownDeltas = function() {
            var t4, e3, i2;
            for (i2 = [], t4 = 1, e3 = 2 * this.stability; 1 <= e3 ? t4 <= e3 : t4 >= e3; 1 <= e3 ? t4++ : t4--)
              i2.push(null);
            return i2;
          }.call(this), this.deltasTimestamp = function() {
            var t4, e3, i2;
            for (i2 = [], t4 = 1, e3 = 2 * this.stability; 1 <= e3 ? t4 <= e3 : t4 >= e3; 1 <= e3 ? t4++ : t4--)
              i2.push(null);
            return i2;
          }.call(this);
        }
        return t2.prototype.check = function(t3) {
          var e2;
          return (t3 = t3.originalEvent || t3).wheelDelta != null ? e2 = t3.wheelDelta : t3.deltaY != null ? e2 = -40 * t3.deltaY : t3.detail == null && t3.detail !== 0 || (e2 = -40 * t3.detail), this.deltasTimestamp.push(Date.now()), this.deltasTimestamp.shift(), e2 > 0 ? (this.lastUpDeltas.push(e2), this.lastUpDeltas.shift(), this.isInertia(1)) : (this.lastDownDeltas.push(e2), this.lastDownDeltas.shift(), this.isInertia(-1));
        }, t2.prototype.isInertia = function(t3) {
          var e2, i, s, n, o, r, l;
          return (e2 = t3 === -1 ? this.lastDownDeltas : this.lastUpDeltas)[0] === null ? t3 : !(this.deltasTimestamp[2 * this.stability - 2] + this.delay > Date.now() && e2[0] === e2[2 * this.stability - 1]) && (s = e2.slice(0, this.stability), i = e2.slice(this.stability, 2 * this.stability), l = s.reduce(function(t4, e3) {
            return t4 + e3;
          }), o = i.reduce(function(t4, e3) {
            return t4 + e3;
          }), r = l / s.length, n = o / i.length, Math.abs(r) < Math.abs(n * this.tolerance) && this.sensitivity < Math.abs(n) && t3);
        }, t2.prototype.showLastUpDeltas = function() {
          return this.lastUpDeltas;
        }, t2.prototype.showLastDownDeltas = function() {
          return this.lastDownDeltas;
        }, t2;
      }();
    }).call(commonjsGlobal);
  });
  var support = { hasWheelEvent: "onwheel" in document, hasMouseWheelEvent: "onmousewheel" in document, hasTouch: "ontouchstart" in window || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch, hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1, hasPointer: !!window.navigator.msPointerEnabled, hasKeyDown: "onkeydown" in document, isFirefox: navigator.userAgent.indexOf("Firefox") > -1 };
  var toString = Object.prototype.toString;
  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var bindallStandalone = function(t) {
    if (!t)
      return console.warn("bindAll requires at least one argument.");
    var e = Array.prototype.slice.call(arguments, 1);
    if (e.length === 0)
      for (var i in t)
        hasOwnProperty$1.call(t, i) && typeof t[i] == "function" && toString.call(t[i]) == "[object Function]" && e.push(i);
    for (var s = 0; s < e.length; s++) {
      var n = e[s];
      t[n] = bind(t[n], t);
    }
  };
  function bind(t, e) {
    return function() {
      return t.apply(e, arguments);
    };
  }
  var Lethargy = lethargy.Lethargy;
  var EVT_ID = "virtualscroll";
  var src = VirtualScroll;
  var keyCodes = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, SPACE: 32 };
  function VirtualScroll(t) {
    bindallStandalone(this, "_onWheel", "_onMouseWheel", "_onTouchStart", "_onTouchMove", "_onKeyDown"), this.el = window, t && t.el && (this.el = t.el, delete t.el), this.options = objectAssign({ mouseMultiplier: 1, touchMultiplier: 2, firefoxMultiplier: 15, keyStep: 120, preventTouch: false, unpreventTouchClass: "vs-touchmove-allowed", limitInertia: false, useKeyboard: true, useTouch: true }, t), this.options.limitInertia && (this._lethargy = new Lethargy()), this._emitter = new tinyEmitter(), this._event = { y: 0, x: 0, deltaX: 0, deltaY: 0 }, this.touchStartX = null, this.touchStartY = null, this.bodyTouchAction = null, this.options.passive !== void 0 && (this.listenerOptions = { passive: this.options.passive });
  }
  function lerp(t, e, i) {
    return (1 - i) * t + i * e;
  }
  function getTranslate(t) {
    var e = {};
    if (window.getComputedStyle) {
      var i = getComputedStyle(t), s = i.transform || i.webkitTransform || i.mozTransform, n = s.match(/^matrix3d\((.+)\)$/);
      return n ? (e.x = n ? parseFloat(n[1].split(", ")[12]) : 0, e.y = n ? parseFloat(n[1].split(", ")[13]) : 0) : (n = s.match(/^matrix\((.+)\)$/), e.x = n ? parseFloat(n[1].split(", ")[4]) : 0, e.y = n ? parseFloat(n[1].split(", ")[5]) : 0), e;
    }
  }
  function getParents(t) {
    for (var e = []; t && t !== document; t = t.parentNode)
      e.push(t);
    return e;
  }
  VirtualScroll.prototype._notify = function(t) {
    var e = this._event;
    e.x += e.deltaX, e.y += e.deltaY, this._emitter.emit(EVT_ID, { x: e.x, y: e.y, deltaX: e.deltaX, deltaY: e.deltaY, originalEvent: t });
  }, VirtualScroll.prototype._onWheel = function(t) {
    var e = this.options;
    if (!this._lethargy || this._lethargy.check(t) !== false) {
      var i = this._event;
      i.deltaX = t.wheelDeltaX || -1 * t.deltaX, i.deltaY = t.wheelDeltaY || -1 * t.deltaY, support.isFirefox && t.deltaMode == 1 && (i.deltaX *= e.firefoxMultiplier, i.deltaY *= e.firefoxMultiplier), i.deltaX *= e.mouseMultiplier, i.deltaY *= e.mouseMultiplier, this._notify(t);
    }
  }, VirtualScroll.prototype._onMouseWheel = function(t) {
    if (!this.options.limitInertia || this._lethargy.check(t) !== false) {
      var e = this._event;
      e.deltaX = t.wheelDeltaX ? t.wheelDeltaX : 0, e.deltaY = t.wheelDeltaY ? t.wheelDeltaY : t.wheelDelta, this._notify(t);
    }
  }, VirtualScroll.prototype._onTouchStart = function(t) {
    var e = t.targetTouches ? t.targetTouches[0] : t;
    this.touchStartX = e.pageX, this.touchStartY = e.pageY;
  }, VirtualScroll.prototype._onTouchMove = function(t) {
    var e = this.options;
    e.preventTouch && !t.target.classList.contains(e.unpreventTouchClass) && t.preventDefault();
    var i = this._event, s = t.targetTouches ? t.targetTouches[0] : t;
    i.deltaX = (s.pageX - this.touchStartX) * e.touchMultiplier, i.deltaY = (s.pageY - this.touchStartY) * e.touchMultiplier, this.touchStartX = s.pageX, this.touchStartY = s.pageY, this._notify(t);
  }, VirtualScroll.prototype._onKeyDown = function(t) {
    var e = this._event;
    e.deltaX = e.deltaY = 0;
    var i = window.innerHeight - 40;
    switch (t.keyCode) {
      case keyCodes.LEFT:
      case keyCodes.UP:
        e.deltaY = this.options.keyStep;
        break;
      case keyCodes.RIGHT:
      case keyCodes.DOWN:
        e.deltaY = -this.options.keyStep;
        break;
      case t.shiftKey:
        e.deltaY = i;
        break;
      case keyCodes.SPACE:
        e.deltaY = -i;
        break;
      default:
        return;
    }
    this._notify(t);
  }, VirtualScroll.prototype._bind = function() {
    support.hasWheelEvent && this.el.addEventListener("wheel", this._onWheel, this.listenerOptions), support.hasMouseWheelEvent && this.el.addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions), support.hasTouch && this.options.useTouch && (this.el.addEventListener("touchstart", this._onTouchStart, this.listenerOptions), this.el.addEventListener("touchmove", this._onTouchMove, this.listenerOptions)), support.hasPointer && support.hasTouchWin && (this.bodyTouchAction = document.body.style.msTouchAction, document.body.style.msTouchAction = "none", this.el.addEventListener("MSPointerDown", this._onTouchStart, true), this.el.addEventListener("MSPointerMove", this._onTouchMove, true)), support.hasKeyDown && this.options.useKeyboard && document.addEventListener("keydown", this._onKeyDown);
  }, VirtualScroll.prototype._unbind = function() {
    support.hasWheelEvent && this.el.removeEventListener("wheel", this._onWheel), support.hasMouseWheelEvent && this.el.removeEventListener("mousewheel", this._onMouseWheel), support.hasTouch && (this.el.removeEventListener("touchstart", this._onTouchStart), this.el.removeEventListener("touchmove", this._onTouchMove)), support.hasPointer && support.hasTouchWin && (document.body.style.msTouchAction = this.bodyTouchAction, this.el.removeEventListener("MSPointerDown", this._onTouchStart, true), this.el.removeEventListener("MSPointerMove", this._onTouchMove, true)), support.hasKeyDown && this.options.useKeyboard && document.removeEventListener("keydown", this._onKeyDown);
  }, VirtualScroll.prototype.on = function(t, e) {
    this._emitter.on(EVT_ID, t, e);
    var i = this._emitter.e;
    i && i[EVT_ID] && i[EVT_ID].length === 1 && this._bind();
  }, VirtualScroll.prototype.off = function(t, e) {
    this._emitter.off(EVT_ID, t, e);
    var i = this._emitter.e;
    (!i[EVT_ID] || i[EVT_ID].length <= 0) && this._unbind();
  }, VirtualScroll.prototype.reset = function() {
    var t = this._event;
    t.x = 0, t.y = 0;
  }, VirtualScroll.prototype.destroy = function() {
    this._emitter.off(), this._unbind();
  };
  var NEWTON_ITERATIONS = 4;
  var NEWTON_MIN_SLOPE = 1e-3;
  var SUBDIVISION_PRECISION = 1e-7;
  var SUBDIVISION_MAX_ITERATIONS = 10;
  var kSplineTableSize = 11;
  var kSampleStepSize = 1 / (kSplineTableSize - 1);
  var float32ArraySupported = typeof Float32Array == "function";
  function A(t, e) {
    return 1 - 3 * e + 3 * t;
  }
  function B(t, e) {
    return 3 * e - 6 * t;
  }
  function C(t) {
    return 3 * t;
  }
  function calcBezier(t, e, i) {
    return ((A(e, i) * t + B(e, i)) * t + C(e)) * t;
  }
  function getSlope(t, e, i) {
    return 3 * A(e, i) * t * t + 2 * B(e, i) * t + C(e);
  }
  function binarySubdivide(t, e, i, s, n) {
    var o, r, l = 0;
    do {
      (o = calcBezier(r = e + (i - e) / 2, s, n) - t) > 0 ? i = r : e = r;
    } while (Math.abs(o) > SUBDIVISION_PRECISION && ++l < SUBDIVISION_MAX_ITERATIONS);
    return r;
  }
  function newtonRaphsonIterate(t, e, i, s) {
    for (var n = 0; n < NEWTON_ITERATIONS; ++n) {
      var o = getSlope(e, i, s);
      if (o === 0)
        return e;
      e -= (calcBezier(e, i, s) - t) / o;
    }
    return e;
  }
  function LinearEasing(t) {
    return t;
  }
  var src$1 = function(t, e, i, s) {
    if (!(0 <= t && t <= 1 && 0 <= i && i <= 1))
      throw new Error("bezier x values must be in [0, 1] range");
    if (t === e && i === s)
      return LinearEasing;
    for (var n = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize), o = 0; o < kSplineTableSize; ++o)
      n[o] = calcBezier(o * kSampleStepSize, t, i);
    return function(o2) {
      return o2 === 0 ? 0 : o2 === 1 ? 1 : calcBezier(function(e2) {
        for (var s2 = 0, o3 = 1, r = kSplineTableSize - 1; o3 !== r && n[o3] <= e2; ++o3)
          s2 += kSampleStepSize;
        --o3;
        var l = s2 + (e2 - n[o3]) / (n[o3 + 1] - n[o3]) * kSampleStepSize, a = getSlope(l, t, i);
        return a >= NEWTON_MIN_SLOPE ? newtonRaphsonIterate(e2, l, t, i) : a === 0 ? l : binarySubdivide(e2, s2, s2 + kSampleStepSize, t, i);
      }(o2), e, s);
    };
  };
  var keyCodes$1 = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, SPACE: 32, TAB: 9, PAGEUP: 33, PAGEDOWN: 34, HOME: 36, END: 35 };
  var _default$2 = function(t) {
    _inherits(i, t);
    var e = _createSuper(i);
    function i() {
      var t2, s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return _classCallCheck3(this, i), history.scrollRestoration && (history.scrollRestoration = "manual"), window.scrollTo(0, 0), (t2 = e.call(this, s)).inertia && (t2.lerp = 0.1 * t2.inertia), t2.isScrolling = false, t2.isDraggingScrollbar = false, t2.isTicking = false, t2.hasScrollTicking = false, t2.parallaxElements = {}, t2.stop = false, t2.scrollbarContainer = s.scrollbarContainer, t2.checkKey = t2.checkKey.bind(_assertThisInitialized(t2)), window.addEventListener("keydown", t2.checkKey, false), t2;
    }
    return _createClass3(i, [{ key: "init", value: function() {
      var t2 = this;
      this.html.classList.add(this.smoothClass), this.html.setAttribute("data-".concat(this.name, "-direction"), this.direction), this.instance = _objectSpread2({ delta: { x: 0, y: 0 } }, this.instance), this.vs = new src({ el: this.scrollFromAnywhere ? document : this.el, mouseMultiplier: navigator.platform.indexOf("Win") > -1 ? 1 : 0.4, firefoxMultiplier: this.firefoxMultiplier, touchMultiplier: this.touchMultiplier, useKeyboard: false, passive: true }), this.vs.on(function(e2) {
        t2.stop || t2.isDraggingScrollbar || requestAnimationFrame(function() {
          t2.updateDelta(e2), t2.isScrolling || t2.startScrolling();
        });
      }), this.setScrollLimit(), this.initScrollBar(), this.addSections(), this.addElements(), this.checkScroll(true), this.transformElements(true, true), _get(_getPrototypeOf(i.prototype), "init", this).call(this);
    } }, { key: "setScrollLimit", value: function() {
      if (this.instance.limit.y = this.el.offsetHeight - this.windowHeight, this.direction === "horizontal") {
        for (var t2 = 0, e2 = this.el.children, i2 = 0; i2 < e2.length; i2++)
          t2 += e2[i2].offsetWidth;
        this.instance.limit.x = t2 - this.windowWidth;
      }
    } }, { key: "startScrolling", value: function() {
      this.startScrollTs = Date.now(), this.isScrolling = true, this.checkScroll(), this.html.classList.add(this.scrollingClass);
    } }, { key: "stopScrolling", value: function() {
      cancelAnimationFrame(this.checkScrollRaf), this.scrollToRaf && (cancelAnimationFrame(this.scrollToRaf), this.scrollToRaf = null), this.isScrolling = false, this.instance.scroll.y = Math.round(this.instance.scroll.y), this.html.classList.remove(this.scrollingClass);
    } }, { key: "checkKey", value: function(t2) {
      var e2 = this;
      if (this.stop)
        t2.keyCode == keyCodes$1.TAB && requestAnimationFrame(function() {
          e2.html.scrollTop = 0, document.body.scrollTop = 0, e2.html.scrollLeft = 0, document.body.scrollLeft = 0;
        });
      else {
        switch (t2.keyCode) {
          case keyCodes$1.TAB:
            requestAnimationFrame(function() {
              e2.html.scrollTop = 0, document.body.scrollTop = 0, e2.html.scrollLeft = 0, document.body.scrollLeft = 0, e2.scrollTo(document.activeElement, -window.innerHeight / 2);
            });
            break;
          case keyCodes$1.UP:
            this.instance.delta[this.directionAxis] -= 240;
            break;
          case keyCodes$1.DOWN:
            this.instance.delta[this.directionAxis] += 240;
            break;
          case keyCodes$1.PAGEUP:
            this.instance.delta[this.directionAxis] -= window.innerHeight;
            break;
          case keyCodes$1.PAGEDOWN:
            this.instance.delta[this.directionAxis] += window.innerHeight;
            break;
          case keyCodes$1.HOME:
            this.instance.delta[this.directionAxis] -= this.instance.limit[this.directionAxis];
            break;
          case keyCodes$1.END:
            this.instance.delta[this.directionAxis] += this.instance.limit[this.directionAxis];
            break;
          case keyCodes$1.SPACE:
            document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement || (t2.shiftKey ? this.instance.delta[this.directionAxis] -= window.innerHeight : this.instance.delta[this.directionAxis] += window.innerHeight);
            break;
          default:
            return;
        }
        this.instance.delta[this.directionAxis] < 0 && (this.instance.delta[this.directionAxis] = 0), this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis] && (this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis]), this.stopScrolling(), this.isScrolling = true, this.checkScroll(), this.html.classList.add(this.scrollingClass);
      }
    } }, { key: "checkScroll", value: function() {
      var t2 = this, e2 = arguments.length > 0 && arguments[0] !== void 0 && arguments[0];
      if (e2 || this.isScrolling || this.isDraggingScrollbar) {
        this.hasScrollTicking || (this.checkScrollRaf = requestAnimationFrame(function() {
          return t2.checkScroll();
        }), this.hasScrollTicking = true), this.updateScroll();
        var s = Math.abs(this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]), n = Date.now() - this.startScrollTs;
        if (!this.animatingScroll && n > 100 && (s < 0.5 && this.instance.delta[this.directionAxis] != 0 || s < 0.5 && this.instance.delta[this.directionAxis] == 0) && this.stopScrolling(), Object.entries(this.sections).forEach(function(e3) {
          var i2 = _slicedToArray3(e3, 2), s2 = (i2[0], i2[1]);
          s2.persistent || t2.instance.scroll[t2.directionAxis] > s2.offset[t2.directionAxis] && t2.instance.scroll[t2.directionAxis] < s2.limit[t2.directionAxis] ? (t2.direction === "horizontal" ? t2.transform(s2.el, -t2.instance.scroll[t2.directionAxis], 0) : t2.transform(s2.el, 0, -t2.instance.scroll[t2.directionAxis]), s2.inView || (s2.inView = true, s2.el.style.opacity = 1, s2.el.style.pointerEvents = "all", s2.el.setAttribute("data-".concat(t2.name, "-section-inview"), ""))) : (s2.inView && (s2.inView = false, s2.el.style.opacity = 0, s2.el.style.pointerEvents = "none", s2.el.removeAttribute("data-".concat(t2.name, "-section-inview"))), t2.transform(s2.el, 0, 0));
        }), this.getDirection && this.addDirection(), this.getSpeed && (this.addSpeed(), this.speedTs = Date.now()), this.detectElements(), this.transformElements(), this.hasScrollbar) {
          var o = this.instance.scroll[this.directionAxis] / this.instance.limit[this.directionAxis] * this.scrollBarLimit[this.directionAxis];
          this.direction === "horizontal" ? this.transform(this.scrollbarThumb, o, 0) : this.transform(this.scrollbarThumb, 0, o);
        }
        _get(_getPrototypeOf(i.prototype), "checkScroll", this).call(this), this.hasScrollTicking = false;
      }
    } }, { key: "resize", value: function() {
      this.windowHeight = window.innerHeight, this.windowWidth = window.innerWidth, this.checkContext(), this.windowMiddle = { x: this.windowWidth / 2, y: this.windowHeight / 2 }, this.update();
    } }, { key: "updateDelta", value: function(t2) {
      var e2, i2 = this[this.context] && this[this.context].gestureDirection ? this[this.context].gestureDirection : this.gestureDirection;
      e2 = i2 === "both" ? t2.deltaX + t2.deltaY : i2 === "vertical" ? t2.deltaY : i2 === "horizontal" ? t2.deltaX : t2.deltaY, this.instance.delta[this.directionAxis] -= e2 * this.multiplier, this.instance.delta[this.directionAxis] < 0 && (this.instance.delta[this.directionAxis] = 0), this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis] && (this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis]);
    } }, { key: "updateScroll", value: function(t2) {
      this.isScrolling || this.isDraggingScrollbar ? this.instance.scroll[this.directionAxis] = lerp(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis], this.lerp) : this.instance.scroll[this.directionAxis] > this.instance.limit[this.directionAxis] ? this.setScroll(this.instance.scroll[this.directionAxis], this.instance.limit[this.directionAxis]) : this.instance.scroll.y < 0 ? this.setScroll(this.instance.scroll[this.directionAxis], 0) : this.setScroll(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis]);
    } }, { key: "addDirection", value: function() {
      this.instance.delta.y > this.instance.scroll.y ? this.instance.direction !== "down" && (this.instance.direction = "down") : this.instance.delta.y < this.instance.scroll.y && this.instance.direction !== "up" && (this.instance.direction = "up"), this.instance.delta.x > this.instance.scroll.x ? this.instance.direction !== "right" && (this.instance.direction = "right") : this.instance.delta.x < this.instance.scroll.x && this.instance.direction !== "left" && (this.instance.direction = "left");
    } }, { key: "addSpeed", value: function() {
      this.instance.delta[this.directionAxis] != this.instance.scroll[this.directionAxis] ? this.instance.speed = (this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]) / Math.max(1, Date.now() - this.speedTs) : this.instance.speed = 0;
    } }, { key: "initScrollBar", value: function() {
      if (this.scrollbar = document.createElement("span"), this.scrollbarThumb = document.createElement("span"), this.scrollbar.classList.add("".concat(this.scrollbarClass)), this.scrollbarThumb.classList.add("".concat(this.scrollbarClass, "_thumb")), this.scrollbar.append(this.scrollbarThumb), this.scrollbarContainer ? this.scrollbarContainer.append(this.scrollbar) : document.body.append(this.scrollbar), this.getScrollBar = this.getScrollBar.bind(this), this.releaseScrollBar = this.releaseScrollBar.bind(this), this.moveScrollBar = this.moveScrollBar.bind(this), this.scrollbarThumb.addEventListener("mousedown", this.getScrollBar), window.addEventListener("mouseup", this.releaseScrollBar), window.addEventListener("mousemove", this.moveScrollBar), this.hasScrollbar = false, this.direction == "horizontal") {
        if (this.instance.limit.x + this.windowWidth <= this.windowWidth)
          return;
      } else if (this.instance.limit.y + this.windowHeight <= this.windowHeight)
        return;
      this.hasScrollbar = true, this.scrollbarBCR = this.scrollbar.getBoundingClientRect(), this.scrollbarHeight = this.scrollbarBCR.height, this.scrollbarWidth = this.scrollbarBCR.width, this.direction === "horizontal" ? this.scrollbarThumb.style.width = "".concat(this.scrollbarWidth * this.scrollbarWidth / (this.instance.limit.x + this.scrollbarWidth), "px") : this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit.y + this.scrollbarHeight), "px"), this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect(), this.scrollBarLimit = { x: this.scrollbarWidth - this.scrollbarThumbBCR.width, y: this.scrollbarHeight - this.scrollbarThumbBCR.height };
    } }, { key: "reinitScrollBar", value: function() {
      if (this.hasScrollbar = false, this.direction == "horizontal") {
        if (this.instance.limit.x + this.windowWidth <= this.windowWidth)
          return;
      } else if (this.instance.limit.y + this.windowHeight <= this.windowHeight)
        return;
      this.hasScrollbar = true, this.scrollbarBCR = this.scrollbar.getBoundingClientRect(), this.scrollbarHeight = this.scrollbarBCR.height, this.scrollbarWidth = this.scrollbarBCR.width, this.direction === "horizontal" ? this.scrollbarThumb.style.width = "".concat(this.scrollbarWidth * this.scrollbarWidth / (this.instance.limit.x + this.scrollbarWidth), "px") : this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit.y + this.scrollbarHeight), "px"), this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect(), this.scrollBarLimit = { x: this.scrollbarWidth - this.scrollbarThumbBCR.width, y: this.scrollbarHeight - this.scrollbarThumbBCR.height };
    } }, { key: "destroyScrollBar", value: function() {
      this.scrollbarThumb.removeEventListener("mousedown", this.getScrollBar), window.removeEventListener("mouseup", this.releaseScrollBar), window.removeEventListener("mousemove", this.moveScrollBar), this.scrollbar.remove();
    } }, { key: "getScrollBar", value: function(t2) {
      this.isDraggingScrollbar = true, this.checkScroll(), this.html.classList.remove(this.scrollingClass), this.html.classList.add(this.draggingClass);
    } }, { key: "releaseScrollBar", value: function(t2) {
      this.isDraggingScrollbar = false, this.html.classList.add(this.scrollingClass), this.html.classList.remove(this.draggingClass);
    } }, { key: "moveScrollBar", value: function(t2) {
      var e2 = this;
      this.isDraggingScrollbar && requestAnimationFrame(function() {
        var i2 = 100 * (t2.clientX - e2.scrollbarBCR.left) / e2.scrollbarWidth * e2.instance.limit.x / 100, s = 100 * (t2.clientY - e2.scrollbarBCR.top) / e2.scrollbarHeight * e2.instance.limit.y / 100;
        s > 0 && s < e2.instance.limit.y && (e2.instance.delta.y = s), i2 > 0 && i2 < e2.instance.limit.x && (e2.instance.delta.x = i2);
      });
    } }, { key: "addElements", value: function() {
      var t2 = this;
      this.els = {}, this.parallaxElements = {}, this.el.querySelectorAll("[data-".concat(this.name, "]")).forEach(function(e2, i2) {
        var s, n, o, r = getParents(e2), l = Object.entries(t2.sections).map(function(t3) {
          var e3 = _slicedToArray3(t3, 2);
          e3[0];
          return e3[1];
        }).find(function(t3) {
          return r.includes(t3.el);
        }), a = e2.dataset[t2.name + "Class"] || t2.class, c = typeof e2.dataset[t2.name + "Id"] == "string" ? e2.dataset[t2.name + "Id"] : "el" + i2, h = e2.dataset[t2.name + "Repeat"], d = e2.dataset[t2.name + "Call"], u = e2.dataset[t2.name + "Position"], f = e2.dataset[t2.name + "Delay"], p = e2.dataset[t2.name + "Direction"], y = typeof e2.dataset[t2.name + "Sticky"] == "string", m = !!e2.dataset[t2.name + "Speed"] && parseFloat(e2.dataset[t2.name + "Speed"]) / 10, v = typeof e2.dataset[t2.name + "Offset"] == "string" ? e2.dataset[t2.name + "Offset"].split(",") : t2.offset, b = e2.dataset[t2.name + "Target"], g = (o = b !== void 0 ? document.querySelector("".concat(b)) : e2).getBoundingClientRect();
        l === null || l.inView ? (s = g.top + t2.instance.scroll.y - getTranslate(o).y, n = g.left + t2.instance.scroll.x - getTranslate(o).x) : (s = g.top - getTranslate(l.el).y - getTranslate(o).y, n = g.left - getTranslate(l.el).x - getTranslate(o).x);
        var w = s + o.offsetHeight, S = n + o.offsetWidth, k = { x: (S - n) / 2 + n, y: (w - s) / 2 + s };
        if (y) {
          var T = e2.getBoundingClientRect(), x = T.top, E2 = T.left, _ = { x: E2 - n, y: x - s };
          s += window.innerHeight, n += window.innerWidth, w = x + o.offsetHeight - e2.offsetHeight - _[t2.directionAxis], k = { x: ((S = E2 + o.offsetWidth - e2.offsetWidth - _[t2.directionAxis]) - n) / 2 + n, y: (w - s) / 2 + s };
        }
        h = h != "false" && (h != null || t2.repeat);
        var O = [0, 0];
        if (v)
          if (t2.direction === "horizontal") {
            for (var A2 = 0; A2 < v.length; A2++)
              typeof v[A2] == "string" ? v[A2].includes("%") ? O[A2] = parseInt(v[A2].replace("%", "") * t2.windowWidth / 100) : O[A2] = parseInt(v[A2]) : O[A2] = v[A2];
            n += O[0], S -= O[1];
          } else {
            for (A2 = 0; A2 < v.length; A2++)
              typeof v[A2] == "string" ? v[A2].includes("%") ? O[A2] = parseInt(v[A2].replace("%", "") * t2.windowHeight / 100) : O[A2] = parseInt(v[A2]) : O[A2] = v[A2];
            s += O[0], w -= O[1];
          }
        var C2 = { el: e2, id: c, class: a, section: l, top: s, middle: k, bottom: w, left: n, right: S, offset: v, progress: 0, repeat: h, inView: false, call: d, speed: m, delay: f, position: u, target: o, direction: p, sticky: y };
        t2.els[c] = C2, e2.classList.contains(a) && t2.setInView(t2.els[c], c), (m !== false || y) && (t2.parallaxElements[c] = C2);
      });
    } }, { key: "addSections", value: function() {
      var t2 = this;
      this.sections = {};
      var e2 = this.el.querySelectorAll("[data-".concat(this.name, "-section]"));
      e2.length === 0 && (e2 = [this.el]), e2.forEach(function(e3, i2) {
        var s = typeof e3.dataset[t2.name + "Id"] == "string" ? e3.dataset[t2.name + "Id"] : "section" + i2, n = e3.getBoundingClientRect(), o = { x: n.left - 1.5 * window.innerWidth - getTranslate(e3).x, y: n.top - 1.5 * window.innerHeight - getTranslate(e3).y }, r = { x: o.x + n.width + 2 * window.innerWidth, y: o.y + n.height + 2 * window.innerHeight }, l = typeof e3.dataset[t2.name + "Persistent"] == "string";
        e3.setAttribute("data-scroll-section-id", s);
        var a = { el: e3, offset: o, limit: r, inView: false, persistent: l, id: s };
        t2.sections[s] = a;
      });
    } }, { key: "transform", value: function(t2, e2, i2, s) {
      var n;
      if (s) {
        var o = getTranslate(t2), r = lerp(o.x, e2, s), l = lerp(o.y, i2, s);
        n = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(r, ",").concat(l, ",0,1)");
      } else
        n = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(e2, ",").concat(i2, ",0,1)");
      t2.style.webkitTransform = n, t2.style.msTransform = n, t2.style.transform = n;
    } }, { key: "transformElements", value: function(t2) {
      var e2 = this, i2 = arguments.length > 1 && arguments[1] !== void 0 && arguments[1], s = this.instance.scroll.x + this.windowWidth, n = this.instance.scroll.y + this.windowHeight, o = { x: this.instance.scroll.x + this.windowMiddle.x, y: this.instance.scroll.y + this.windowMiddle.y };
      Object.entries(this.parallaxElements).forEach(function(r) {
        var l = _slicedToArray3(r, 2), a = (l[0], l[1]), c = false;
        if (t2 && (c = 0), a.inView || i2)
          switch (a.position) {
            case "top":
              c = e2.instance.scroll[e2.directionAxis] * -a.speed;
              break;
            case "elementTop":
              c = (n - a.top) * -a.speed;
              break;
            case "bottom":
              c = (e2.instance.limit[e2.directionAxis] - n + e2.windowHeight) * a.speed;
              break;
            case "left":
              c = e2.instance.scroll[e2.directionAxis] * -a.speed;
              break;
            case "elementLeft":
              c = (s - a.left) * -a.speed;
              break;
            case "right":
              c = (e2.instance.limit[e2.directionAxis] - s + e2.windowHeight) * a.speed;
              break;
            default:
              c = (o[e2.directionAxis] - a.middle[e2.directionAxis]) * -a.speed;
          }
        a.sticky && (c = a.inView ? e2.direction === "horizontal" ? e2.instance.scroll.x - a.left + window.innerWidth : e2.instance.scroll.y - a.top + window.innerHeight : e2.direction === "horizontal" ? e2.instance.scroll.x < a.left - window.innerWidth && e2.instance.scroll.x < a.left - window.innerWidth / 2 ? 0 : e2.instance.scroll.x > a.right && e2.instance.scroll.x > a.right + 100 && a.right - a.left + window.innerWidth : e2.instance.scroll.y < a.top - window.innerHeight && e2.instance.scroll.y < a.top - window.innerHeight / 2 ? 0 : e2.instance.scroll.y > a.bottom && e2.instance.scroll.y > a.bottom + 100 && a.bottom - a.top + window.innerHeight), c !== false && (a.direction === "horizontal" || e2.direction === "horizontal" && a.direction !== "vertical" ? e2.transform(a.el, c, 0, !t2 && a.delay) : e2.transform(a.el, 0, c, !t2 && a.delay));
      });
    } }, { key: "scrollTo", value: function(t2) {
      var e2 = this, i2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s = parseInt(i2.offset) || 0, n = i2.duration || 1e3, o = i2.easing || [0.25, 0, 0.35, 1], r = !!i2.disableLerp, l = !!i2.callback && i2.callback;
      if (o = src$1.apply(void 0, _toConsumableArray2(o)), typeof t2 == "string") {
        if (t2 === "top")
          t2 = 0;
        else if (t2 === "bottom")
          t2 = this.instance.limit.y;
        else if (t2 === "left")
          t2 = 0;
        else if (t2 === "right")
          t2 = this.instance.limit.x;
        else if (!(t2 = document.querySelector(t2)))
          return;
      } else if (typeof t2 == "number")
        t2 = parseInt(t2);
      else if (!t2 || !t2.tagName)
        return void console.warn("`target` parameter is not valid");
      if (typeof t2 != "number") {
        var a = getParents(t2).includes(this.el);
        if (!a)
          return;
        var c = t2.getBoundingClientRect(), h = c.top, d = c.left, u = getParents(t2), f = u.find(function(t3) {
          return Object.entries(e2.sections).map(function(t4) {
            var e3 = _slicedToArray3(t4, 2);
            e3[0];
            return e3[1];
          }).find(function(e3) {
            return e3.el == t3;
          });
        }), p = 0;
        p = f ? getTranslate(f)[this.directionAxis] : -this.instance.scroll[this.directionAxis], s = this.direction === "horizontal" ? d + s - p : h + s - p;
      } else
        s = t2 + s;
      var y = parseFloat(this.instance.delta[this.directionAxis]), m = Math.max(0, Math.min(s, this.instance.limit[this.directionAxis])), v = m - y, b = function(t3) {
        r ? e2.direction === "horizontal" ? e2.setScroll(y + v * t3, e2.instance.delta.y) : e2.setScroll(e2.instance.delta.x, y + v * t3) : e2.instance.delta[e2.directionAxis] = y + v * t3;
      };
      this.animatingScroll = true, this.stopScrolling(), this.startScrolling();
      var g = Date.now(), w = function t3() {
        var i3 = (Date.now() - g) / n;
        i3 > 1 ? (b(1), e2.animatingScroll = false, n == 0 && e2.update(), l && l()) : (e2.scrollToRaf = requestAnimationFrame(t3), b(o(i3)));
      };
      w();
    } }, { key: "update", value: function() {
      this.setScrollLimit(), this.addSections(), this.addElements(), this.detectElements(), this.updateScroll(), this.transformElements(true), this.reinitScrollBar(), this.checkScroll(true);
    } }, { key: "startScroll", value: function() {
      this.stop = false;
    } }, { key: "stopScroll", value: function() {
      this.stop = true;
    } }, { key: "setScroll", value: function(t2, e2) {
      this.instance = _objectSpread2(_objectSpread2({}, this.instance), {}, { scroll: { x: t2, y: e2 }, delta: { x: t2, y: e2 }, speed: 0 });
    } }, { key: "destroy", value: function() {
      _get(_getPrototypeOf(i.prototype), "destroy", this).call(this), this.stopScrolling(), this.html.classList.remove(this.smoothClass), this.vs.destroy(), this.destroyScrollBar(), window.removeEventListener("keydown", this.checkKey, false);
    } }]), i;
  }(_default3);
  var Smooth = function() {
    function t() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      _classCallCheck3(this, t), this.options = e, Object.assign(this, defaults, e), this.smartphone = defaults.smartphone, e.smartphone && Object.assign(this.smartphone, e.smartphone), this.tablet = defaults.tablet, e.tablet && Object.assign(this.tablet, e.tablet), this.smooth || this.direction != "horizontal" || console.warn("\u{1F6A8} `smooth:false` & `horizontal` direction are not yet compatible"), this.tablet.smooth || this.tablet.direction != "horizontal" || console.warn("\u{1F6A8} `smooth:false` & `horizontal` direction are not yet compatible (tablet)"), this.smartphone.smooth || this.smartphone.direction != "horizontal" || console.warn("\u{1F6A8} `smooth:false` & `horizontal` direction are not yet compatible (smartphone)"), this.init();
    }
    return _createClass3(t, [{ key: "init", value: function() {
      if (this.options.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1 || window.innerWidth < this.tablet.breakpoint, this.options.isTablet = this.options.isMobile && window.innerWidth >= this.tablet.breakpoint, this.smooth && !this.options.isMobile || this.tablet.smooth && this.options.isTablet || this.smartphone.smooth && this.options.isMobile && !this.options.isTablet ? this.scroll = new _default$2(this.options) : this.scroll = new _default$12(this.options), this.scroll.init(), window.location.hash) {
        var t2 = window.location.hash.slice(1, window.location.hash.length), e = document.getElementById(t2);
        e && this.scroll.scrollTo(e);
      }
    } }, { key: "update", value: function() {
      this.scroll.update();
    } }, { key: "start", value: function() {
      this.scroll.startScroll();
    } }, { key: "stop", value: function() {
      this.scroll.stopScroll();
    } }, { key: "scrollTo", value: function(t2, e) {
      this.scroll.scrollTo(t2, e);
    } }, { key: "setScroll", value: function(t2, e) {
      this.scroll.setScroll(t2, e);
    } }, { key: "on", value: function(t2, e) {
      this.scroll.setEvents(t2, e);
    } }, { key: "off", value: function(t2, e) {
      this.scroll.unsetEvents(t2, e);
    } }, { key: "destroy", value: function() {
      this.scroll.destroy();
    } }]), t;
  }();
  var Native = function() {
    function t() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      _classCallCheck3(this, t), this.options = e, Object.assign(this, defaults, e), this.smartphone = defaults.smartphone, e.smartphone && Object.assign(this.smartphone, e.smartphone), this.tablet = defaults.tablet, e.tablet && Object.assign(this.tablet, e.tablet), this.init();
    }
    return _createClass3(t, [{ key: "init", value: function() {
      if (this.scroll = new _default$12(this.options), this.scroll.init(), window.location.hash) {
        var t2 = window.location.hash.slice(1, window.location.hash.length), e = document.getElementById(t2);
        e && this.scroll.scrollTo(e);
      }
    } }, { key: "update", value: function() {
      this.scroll.update();
    } }, { key: "start", value: function() {
      this.scroll.startScroll();
    } }, { key: "stop", value: function() {
      this.scroll.stopScroll();
    } }, { key: "scrollTo", value: function(t2, e) {
      this.scroll.scrollTo(t2, e);
    } }, { key: "setScroll", value: function(t2, e) {
      this.scroll.setScroll(t2, e);
    } }, { key: "on", value: function(t2, e) {
      this.scroll.setEvents(t2, e);
    } }, { key: "off", value: function(t2, e) {
      this.scroll.unsetEvents(t2, e);
    } }, { key: "destroy", value: function() {
      this.scroll.destroy();
    } }]), t;
  }();
  var locomotive_scroll_esm_default = Smooth;

  // assets/scripts/classes/HorizontalScrollCall.js
  var ScrollCall = class {
    static _namespace() {
      return "hscroll-";
    }
    static on(event, callback) {
      ScrollCall._subscribeEvents(event, callback);
    }
    static off(event, callback) {
      ScrollCall._unsubcribeEvents(event, callback);
    }
    static _subscribeEvents(event, func) {
      if (!ScrollCall.listeners) {
        ScrollCall.listeners = {};
      }
      if (!ScrollCall.listeners[event]) {
        ScrollCall.listeners[event] = [];
      }
      const list = ScrollCall.listeners[event];
      list.push(func);
      if (list.length === 1) {
        document.addEventListener(ScrollCall._namespace() + event, ScrollCall.checkEvent, false);
      }
    }
    static _unsubcribeEvents(event, func) {
      if (!ScrollCall.listeners[event])
        return;
      const list = ScrollCall.listeners[event];
      const index = list.indexOf(func);
      if (index < 0)
        return;
      list.splice(index, 1);
      if (list.length === 0) {
        document.removeEventListener(ScrollCall._namespace() + event, ScrollCall.checkEvent, false);
      }
    }
    static checkEvent(event) {
      const name = event.type.replace(ScrollCall._namespace(), "");
      const list = ScrollCall.listeners[name];
      if (!list || list.length === 0)
        return;
      list.forEach((func) => {
        switch (name) {
          case "call":
            return func(ScrollCall.callValue, ScrollCall.callWay, ScrollCall.callObj);
          default:
            return func();
        }
      });
    }
    static dispatch(call, way, obj) {
      ScrollCall.callWay = way;
      ScrollCall.callValue = call.split(",").map((item) => item.trim());
      ScrollCall.callObj = obj;
      ScrollCall.callObj.isHScroll = true;
      if (ScrollCall.callObj.$view) {
        ScrollCall.callObj.el = ScrollCall.callObj.$view;
      }
      if (ScrollCall.callValue.length == 1)
        ScrollCall.callValue = ScrollCall.callValue[0];
      const callEvent = new Event(ScrollCall._namespace() + "call");
      document.dispatchEvent(callEvent);
    }
  };

  // assets/scripts/utils/image.js
  var LAZY_LOADED_IMAGES = [];
  function loadImage(url2, options = {}) {
    return new Promise((resolve, reject) => {
      const $img = new Image();
      if (options.crossOrigin) {
        $img.crossOrigin = options.crossOrigin;
      }
      const loadCallback = () => {
        resolve(__spreadValues({
          element: $img
        }, getImageMetadata($img)));
      };
      if ($img.decode) {
        $img.src = url2;
        $img.decode().then(loadCallback).catch((e) => {
          reject(e);
        });
      } else {
        $img.onload = loadCallback;
        $img.onerror = (e) => {
          reject(e);
        };
        $img.src = url2;
      }
    });
  }
  function getImageMetadata($img) {
    return {
      url: $img.src,
      width: $img.naturalWidth,
      height: $img.naturalHeight,
      ratio: $img.naturalWidth / $img.naturalHeight
    };
  }
  function lazyLoadImage($el, url2, callback) {
    return __async(this, null, function* () {
      let src2 = url2 ? url2 : $el.dataset.src;
      let loadedImage = LAZY_LOADED_IMAGES.find((image) => image.url === src2);
      if (!loadedImage) {
        loadedImage = yield loadImage(src2);
        if (!loadedImage.url) {
          return;
        }
        LAZY_LOADED_IMAGES.push(loadedImage);
      }
      if ($el.src === src2) {
        return;
      }
      if ($el.tagName === "IMG") {
        $el.src = loadedImage.url;
      } else {
        $el.style.backgroundImage = `url(${loadedImage.url})`;
      }
      requestAnimationFrame(() => {
        let lazyParent = $el.closest(".c-lazy");
        if (lazyParent) {
          lazyParent.classList.add("-lazy-loaded");
          lazyParent.style.backgroundImage = "";
        }
        $el.classList.add("-lazy-loaded");
        callback == null ? void 0 : callback();
      });
    });
  }

  // assets/scripts/modules/Scroll.js
  var Scroll_default = class extends _default {
    constructor(m) {
      super(m);
      this.onHScrollCall = this.onHScrollCall.bind(this);
      this.direction = this.getData("horizontal") == "true" ? "horizontal" : "vertical";
    }
    init() {
      this.scroll = new locomotive_scroll_esm_default({
        el: this.el,
        smooth: true,
        offset: ["15%"],
        getDirection: true,
        direction: this.direction,
        reloadOnContextChange: true,
        tablet: {
          breakpoint: 1200
        }
      });
      html.setAttribute("data-scroll-theme", "");
      this.scroll.on("call", (func, way, obj, id) => {
        this.call(func[0], { way, obj }, func[1], func[2]);
      });
      ScrollCall.on("call", this.onHScrollCall);
      this.scroll.on("scroll", (args) => {
        if (args.scroll.y > 50) {
          html.classList.add("has-scrolled");
        } else {
          html.classList.remove("has-scrolled");
        }
        if (html.getAttribute("data-direction") != args.direction) {
          html.setAttribute("data-direction", args.direction);
        }
        Object.values(args.currentElements).forEach((item) => {
          if (item.el.getAttribute("data-module-culture-icon") !== null) {
            let progress = item.progress;
            this.call("progress", progress, "CultureIcon", item.el.getAttribute("data-module-culture-icon"));
          }
        });
        if (typeof args.currentElements["perks"] === "object") {
          let progress = args.currentElements["perks"].progress;
          this.call("onProgress", progress, "Perks");
        }
        if (typeof args.currentElements["career-hero"] === "object") {
          let progress = args.currentElements["career-hero"].progress;
          this.call("onProgress", progress, "CareerHero");
        }
        if (typeof args.currentElements["header"] === "object") {
          let progress = args.currentElements["header"].progress;
          this.call("onProgress", progress, "HeaderProgress");
        }
      });
      if (window.isMobile || window.innerWidth < 1e3) {
        setTimeout(() => {
          const hash = window.location.hash.split("?")[0];
          if (hash) {
            const $target = document.querySelector(hash);
            $target && this.scrollTo([$target, {
              duration: 300,
              offset: -240
            }]);
          }
        }, 200);
      }
      requestAnimationFrame(() => {
        this.update();
      });
    }
    toggleCareerHeroProgress(args) {
      const moduleID = args.obj.el.dataset.moduleCareerHero;
      if (args.way === "exit") {
        if (args.obj.progress > 0.5) {
          this.call("forceProgressEnd", null, "CareerHero", moduleID);
        } else {
          this.call("forceProgressStart", null, "CareerHero", moduleID);
        }
      }
    }
    toggleHeaderProgress(args) {
      const moduleID = args.obj.el.dataset.moduleHeader;
      if (args.way === "exit") {
        if (args.obj.progress > 0.5) {
          this.call("forceProgressEnd", null, "HeaderProgress", moduleID);
        } else {
          this.call("forceProgressStart", null, "HeaderProgress", moduleID);
        }
      }
    }
    toggleStickyApplication(args) {
      if (args.way === "enter") {
        html.classList.remove("has-sticky-application");
      } else if (args.way === "exit") {
        html.classList.add("has-sticky-application");
      }
    }
    toggleFooter(args) {
      if (args.way === "enter") {
        html.classList.add("has-footer-inview");
      } else if (args.way === "exit") {
        html.classList.remove("has-footer-inview");
      }
    }
    update() {
      this.scroll.update();
    }
    updateTheme(e) {
      if (e.way === "enter" && e.obj.isHScroll) {
        html.setAttribute("data-scroll-theme", e.obj.el.getAttribute("data-theme"));
      } else if (e.way === "enter" && (html.getAttribute("data-direction") === "down" || html.getAttribute("data-direction") === "right")) {
        html.setAttribute("data-scroll-theme", e.obj.el.getAttribute("data-theme"));
      }
      if (e.way === "exit" && (html.getAttribute("data-direction") === "up" || html.getAttribute("data-direction") === "left")) {
        if (!e.obj.isHScroll) {
          html.setAttribute("data-scroll-theme", "");
        }
      }
    }
    updateMainTheme(e) {
      if (e.way === "enter" && (html.getAttribute("data-direction") === "down" || html.getAttribute("data-direction") === "right")) {
        html.setAttribute("data-theme", e.obj.el.getAttribute("data-theme"));
      }
      if (e.way === "exit" && (html.getAttribute("data-direction") === "up" || html.getAttribute("data-direction") === "left")) {
        html.setAttribute("data-theme", document.querySelector("[data-load-container]").getAttribute("data-theme"));
      }
    }
    onHScrollCall(func, way, obj, id) {
      this.call(func[0], { way, obj }, func[1], func[2]);
    }
    scrollTo(param) {
      if (this.scroll && this.scroll.scrollTo)
        this.scroll.scrollTo(param[0], param[1]);
    }
    lazyLoad(args) {
      lazyLoadImage(args.obj.el, null, () => {
      });
    }
    destroy() {
      this.scroll.destroy();
      html.classList.remove("has-scrolled");
      html.setAttribute("data-scroll-theme", "");
      html.setAttribute("data-direction", "");
    }
  };

  // assets/scripts/modules/Split.js
  var Split_default = class extends _default {
    constructor(m) {
      super(m);
    }
    init() {
      const splittedTitle = new SplitText(this.el, { type: this.getData("type") !== null ? this.getData("type") : "lines" });
    }
  };

  // assets/scripts/modules/SplitChars.js
  var SplitChars_default = class extends _default {
    constructor(m) {
      super(m);
    }
    init() {
      const splittedTitle = new SplitText(this.el, { type: this.getData("type") !== null ? this.getData("type") : "words,chars" });
    }
  };

  // assets/scripts/modules/Carousel.js
  var Carousel_default = class extends _default {
    constructor(m) {
      super(m);
      this.events = {
        click: {
          prev: "prev",
          next: "next"
        }
      };
    }
    init() {
      this.$controls = this.$("controls")[0];
      this.$controlsTop = this.getData("controls-top") === "true";
      this.swiper = new Swiper(this.$("slideshow")[0], {
        loop: true,
        slidesPerView: 1,
        loopedSlides: 3,
        speed: 600,
        preloadImages: false,
        watchSlidesVisibility: true,
        breakpoints: {
          700: {
            slidesPerView: 2
          }
        },
        on: {
          init: () => {
            if (this.$controlsTop != true)
              return;
            setTimeout(() => {
              this.imageModel = this.$("image")[0].getBoundingClientRect();
              this.$controls.style.top = `${this.imageModel.height}px`;
              this.call("update", {}, "Scroll", "main");
            }, 1e3);
          },
          resize: () => {
            if (this.$controlsTop != true)
              return;
            this.imageModel = this.$("image")[0].getBoundingClientRect();
            this.$controls.style.top = `${this.imageModel.height}px`;
            this.call("update", null, "Scroll");
          },
          slideChange: () => {
            this.swiper.lazy.load();
          }
        }
      });
    }
    prev() {
      this.swiper.slidePrev();
    }
    next() {
      this.swiper.slideNext();
    }
    inview(e) {
      if (e.obj.el == this.el) {
        this.swiper.lazy.load();
      }
    }
    destroy() {
      var _a, _b;
      (_b = (_a = this.swiper) == null ? void 0 : _a.destroy) == null ? void 0 : _b.call(_a);
    }
  };

  // assets/scripts/modules/CarouselJob.js
  var CarouselJob_default = class extends _default {
    constructor(m) {
      super(m);
      this.carousel = this.$("carousel")[0];
      if (!this.carousel)
        this.carousel = this.el;
      this.arrowNext = this.$("next")[0];
      this.arrowPrev = this.$("prev")[0];
    }
    init() {
      this.length = this.$("item").length;
      const args = {
        speed: 1e3,
        loop: true,
        spaceBetween: 0,
        loopedSlides: 2,
        grabCursor: true,
        slidesPerView: 1,
        threshold: 2,
        parallax: true,
        navigation: {
          nextEl: this.arrowNext,
          prevEl: this.arrowPrev
        }
      };
      if (this.length > 1) {
        this.carousel = new Swiper(this.carousel, args);
      }
      if (this.length < 2) {
        this.arrowPrev.classList.add("is-invisible");
        this.arrowNext.classList.add("is-invisible");
      }
    }
    destroy() {
      if (this.carousel && this.carousel.destroy)
        this.carousel.destroy(true, true);
    }
  };

  // assets/scripts/modules/CarouselWide.js
  var CarouselWide_default = class extends _default {
    constructor(m) {
      super(m);
      this.onResizeBind = this.onResize.bind(this);
      this.carousel = this.$("carousel")[0];
      if (!this.carousel)
        this.carousel = this.el;
      this.arrowNext = this.$("next")[0];
      this.arrowPrev = this.$("prev")[0];
      this.pagination = this.$("pagination")[0];
      this.$visuals = this.$("visual");
      this.isProjectCarousel = this.getData("project") != null ? true : false;
    }
    init() {
      this.length = this.$("item").length;
      const args = {
        speed: 1e3,
        loop: this.isProjectCarousel ? false : true,
        spaceBetween: 0,
        parallax: true,
        grabCursor: true,
        slidesPerView: 1,
        threshold: 2,
        navigation: {
          nextEl: this.arrowNext,
          prevEl: this.arrowPrev
        },
        pagination: {
          el: this.pagination,
          type: "fraction"
        },
        on: {
          init: () => {
            this.computeVisualHeight();
          },
          slideChangeTransitionEnd: () => {
            var _a, _b;
            (_b = (_a = this.carousel) == null ? void 0 : _a.lazy) == null ? void 0 : _b.load();
          }
        }
      };
      if (this.length > 1) {
        this.el.classList.add("has-item");
        this.carousel = new Swiper(this.carousel, args);
      }
      if (this.length < 2) {
        this.arrowPrev.classList.add("is-invisible");
        this.arrowNext.classList.add("is-invisible");
      }
      this.bindEvents();
    }
    destroy() {
      if (this.carousel && this.carousel.destroy)
        this.carousel.destroy(true, true);
      this.unbindEvents();
    }
    bindEvents() {
      window.addEventListener("resize", this.onResizeBind);
    }
    unbindEvents() {
      window.removeEventListener("resize", this.onResizeBind);
    }
    inview(e) {
      var _a, _b, _c;
      if (e.obj.el == this.el) {
        if (this.carousel && this.carousel.params)
          this.carousel.params.lazy.loadPrevNext = true;
        (_c = (_b = (_a = this.carousel) == null ? void 0 : _a.lazy) == null ? void 0 : _b.load) == null ? void 0 : _c.call(_b);
        if (this.length < 2) {
          for (let item of Array.from(this.$("item"))) {
            let lazyArray = item.querySelectorAll(".swiper-lazy");
            for (let el of lazyArray) {
              this.call("lazyLoad", { obj: { el } }, "Scroll");
            }
          }
        }
      }
    }
    onResize() {
      this.computeVisualHeight();
    }
    computeVisualHeight() {
      this.el.style.setProperty("--max-visual-height", "100%");
      this.el.style.flex = 1;
      requestAnimationFrame(() => {
        const heights = [];
        let visualIndex = 0;
        while (visualIndex < this.$visuals.length) {
          heights.push(this.$visuals[visualIndex].offsetHeight);
          visualIndex++;
        }
        const minHeight = Math.min(...heights);
        this.el.style.setProperty("--max-visual-height", `${minHeight}px`);
        this.el.style.flex = "inherit";
      });
    }
  };

  // assets/scripts/modules/CarouselQuote.js
  var CarouselQuote_default = class extends _default {
    constructor(m) {
      super(m);
      this.carousel = this.$("carousel")[0];
      if (!this.carousel)
        this.carousel = this.el;
      this.arrowNext = this.$("next")[0];
      this.arrowPrev = this.$("prev")[0];
    }
    init() {
      this.length = this.$("item").length;
      const args = {
        speed: 1e3,
        loop: true,
        spaceBetween: 0,
        loopedSlides: 2,
        grabCursor: true,
        slidesPerView: 1,
        threshold: 2,
        parallax: true,
        navigation: {
          nextEl: this.arrowNext,
          prevEl: this.arrowPrev
        }
      };
      if (this.length > 1) {
        this.carousel = new Swiper(this.carousel, args);
      }
      if (this.length < 2) {
        this.arrowPrev.classList.add("is-invisible");
        this.arrowNext.classList.add("is-invisible");
      }
    }
    destroy() {
      if (this.carousel && this.carousel.destroy)
        this.carousel.destroy(true, true);
    }
  };

  // assets/scripts/modules/CarouselCaseStudy.js
  var CarouselCaseStudy_default = class extends _default {
    constructor(m) {
      super(m);
      this.carousel = this.$("carousel")[0];
      if (!this.carousel)
        this.carousel = this.el;
      this.arrowNext = this.$("next")[0];
      this.arrowPrev = this.$("prev")[0];
    }
    init() {
      this.length = this.$("item").length;
      const args = {
        speed: 1e3,
        loop: true,
        spaceBetween: 0,
        loopedSlides: 2,
        grabCursor: true,
        slidesPerView: 1,
        threshold: 2,
        parallax: true,
        navigation: {
          nextEl: this.arrowNext,
          prevEl: this.arrowPrev
        },
        breakpoints: {
          700: {
            slidesPerView: 2
          }
        },
        on: {
          slideChangeTransitionEnd: () => {
            var _a, _b, _c;
            (_c = (_b = (_a = this.swiper) == null ? void 0 : _a.lazy) == null ? void 0 : _b.load) == null ? void 0 : _c.call(_b);
          }
        }
      };
      let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      if (viewportWidth < 700) {
        if (this.length > 0) {
          this.carousel = new Swiper(this.carousel, args);
          this.arrowPrev.classList.remove("is-invisible");
          this.arrowNext.classList.remove("is-invisible");
        }
      } else {
        if (this.length > 1) {
          this.carousel = new Swiper(this.carousel, args);
          this.arrowPrev.classList.remove("is-invisible");
          this.arrowNext.classList.remove("is-invisible");
        }
      }
    }
    inview(e) {
      if (e.obj.el == this.el) {
        this.swiper.lazy.load();
      }
    }
    destroy() {
      if (this.carousel && this.carousel.destroy)
        this.carousel.destroy(true, true);
    }
  };

  // assets/scripts/modules/TalkButton.js
  var TalkButton_default = class extends _default {
    constructor(m) {
      super(m);
    }
    init() {
      this.swiper = new Swiper(this.$("slider")[0], {
        loop: true,
        speed: 600,
        direction: "vertical",
        autoplay: {
          delay: 2e3
        }
      });
    }
    destroy() {
      var _a, _b;
      (_b = (_a = this.swiper) == null ? void 0 : _a.destroy) == null ? void 0 : _b.call(_a);
    }
  };

  // assets/scripts/modules/Accordion.js
  var Accordion_default = class extends _default {
    constructor(m) {
      super(m);
      this.events = {
        click: {
          toggler: "toggle"
        }
      };
    }
    init() {
    }
    toggle(e) {
      let el = e.curTarget;
      let parent = this.parent("item", el);
      if (parent.classList.contains("is-open")) {
        this.close();
      } else {
        this.close();
        this.open(parent);
      }
    }
    open(item) {
      let collapsible = this.$("content", item)[0];
      item.classList.add("is-open");
      gsap.to(collapsible, 0.3, {
        height: this.compute(this.$("inner", item)[0]).height,
        onComplete: () => {
          this.call("update", "Scroll");
        }
      });
    }
    close() {
      this.$("item").forEach((item) => {
        item.classList.remove("is-open");
        let collapsible = this.$("content", item)[0];
        if (collapsible) {
          gsap.to(collapsible, 0.3, {
            height: 0,
            onComplete: () => {
              this.call("update", "Scroll");
            }
          });
        }
      });
    }
    compute(item) {
      return item.getBoundingClientRect();
    }
  };

  // assets/scripts/modules/NavCases.js
  var NavCases_default = class extends _default {
    constructor(m) {
      super(m);
      this.arrowNext = this.$("next")[0];
      this.arrowPrev = this.$("prev")[0];
    }
    init() {
      this.length = this.$("item").length;
      this.swiper = new Swiper(this.$("slider")[0], {
        speed: 600,
        direction: "horizontal",
        slidesPerView: 1.1,
        loop: true,
        loopedSlides: 3,
        preloadImages: false,
        navigation: {
          nextEl: this.arrowNext,
          prevEl: this.arrowPrev
        },
        breakpoints: {
          1200: {
            slidesPerView: 2.1,
            direction: "vertical",
            loop: false
          },
          1e3: {
            slidesPerView: 2.5,
            direction: "vertical",
            loop: false
          }
        },
        on: {
          slideChange: () => {
            this.swiper.lazy.load();
          }
        }
      });
      let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      if (viewportWidth < 700) {
        if (this.length > 0) {
          this.arrowPrev.classList.remove("is-invisible");
          this.arrowNext.classList.remove("is-invisible");
        }
      } else {
        if (this.length > 2) {
          this.arrowPrev.classList.remove("is-invisible");
          this.arrowNext.classList.remove("is-invisible");
        }
      }
    }
    inview(e) {
      this.swiper.lazy.load();
    }
    close() {
      if (this.swiper.params.loop) {
        this.swiper.slideToLoop(0);
      } else {
        this.swiper.slideTo(0);
      }
    }
  };

  // assets/scripts/modules/NavControls.js
  var NavControls_default = class extends _default {
    constructor(m) {
      super(m);
      this.events = {
        click: {
          next: "next",
          prev: "prev"
        }
      };
    }
    init() {
    }
    next() {
      this.call("next", "NavCases");
    }
    prev() {
      this.call("prev", "NavCases");
    }
  };

  // assets/scripts/modules/NavButton.js
  var NavButton_default = class extends _default {
    constructor(m) {
      super(m);
      this.events = {
        click: "toggle"
      };
    }
    init() {
    }
    toggle() {
      this.call("toggle", null, "Nav");
    }
  };

  // assets/scripts/modules/Slider.js
  var Slider_default = class extends _default {
    constructor(m) {
      super(m);
    }
    init() {
      this.swiper = new Swiper(this.$("slideshow")[0], {
        loop: true,
        slidesPerView: 1,
        loopedSlides: 3,
        centeredSlides: true,
        speed: 600,
        grabCursor: true,
        navigation: {
          nextEl: this.$("next")[0],
          prevEl: this.$("prev")[0]
        },
        on: {
          slideChangeTransitionEnd: () => {
            var _a, _b, _c;
            (_c = (_b = (_a = this.swiper) == null ? void 0 : _a.lazy) == null ? void 0 : _b.load) == null ? void 0 : _c.call(_b);
          }
        }
      });
    }
    inview(e) {
      if (e.obj.el == this.el) {
        this.swiper.params.lazy.loadPrevNext = true;
        this.swiper.lazy.load();
      }
    }
    destroy() {
      var _a, _b;
      (_b = (_a = this.swiper) == null ? void 0 : _a.destroy) == null ? void 0 : _b.call(_a);
    }
  };

  // assets/scripts/modules/SliderLogo.js
  var SliderLogo_default = class extends _default {
    constructor(m) {
      super(m);
    }
    init() {
      this.swiper = new Swiper(this.$("slideshow")[0], {
        loop: true,
        slidesPerView: 1,
        loopedSlides: 3,
        centeredSlides: true,
        preloadImages: false,
        speed: 800,
        navigation: {
          nextEl: this.$("next")[0],
          prevEl: this.$("prev")[0]
        },
        on: {
          slideChange: () => {
            this.swiper.lazy.load();
          }
        }
      });
    }
    inview(e) {
      if (e.obj.el == this.el) {
        this.swiper.params.lazy.loadPrevNext = true;
        this.swiper.lazy.load();
        this.swiper.autoplay.start();
        this.swiper.params.autoplay.disableOnInteraction = false;
      }
    }
    destroy() {
      this.swiper.destroy();
    }
  };

  // assets/scripts/modules/TriggerPopup.js
  var TriggerPopup_default = class extends _default {
    constructor(m) {
      super(m);
      this.events = {
        click: "trigger"
      };
    }
    init() {
    }
    trigger(e) {
      this.call("open", {
        provider: this.el.getAttribute("data-provider"),
        id: this.el.getAttribute("data-id"),
        iframe: this.el.getAttribute("data-iframe")
      }, "Popup");
    }
  };

  // assets/scripts/modules/Popup.js
  var Popup_default = class extends _default {
    constructor(m) {
      super(m);
      this.events = {
        click: {
          closeButton: "close"
        }
      };
    }
    init() {
      this.$inner = this.$("inner")[0];
      this.closeBind = (e) => {
        if (e.key === "Escape") {
          this.close();
        }
      };
      document.addEventListener("keyup", this.closeBind);
    }
    open(param) {
      if (this.timeout !== void 0)
        clearTimeout(this.timeout);
      if (param.iframe !== null) {
        this.$inner.innerHTML = param.iframe;
      } else {
        if (param.provider === "vimeo") {
          this.$inner.innerHTML = `<iframe src="https://player.vimeo.com/video/${param.id}?controls=true&amp;autoplay=1&amp;transparent=false&amp;autopause=false&amp;muted=0"frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; encrypted-media"></iframe>`;
        } else if (param.provider = "youtube") {
          this.$inner.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${param.id}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        }
      }
      html.classList.add("has-popup-open");
    }
    close() {
      html.classList.add("has-popup-closing");
      html.classList.remove("has-popup-open");
      this.timeout = setTimeout(() => {
        this.$inner.innerHTML = "";
      }, 600);
      setTimeout(() => {
        html.classList.remove("has-popup-closing");
      }, 600);
    }
    destroy() {
      document.removeEventListener("keyup", this.closeBind);
    }
  };

  // assets/scripts/modules/ArticleSwitcher.js
  var CLASS = {
    OPEN: `has-prev-show`
  };
  var ArticleSwitcher_default = class extends _default {
    constructor(m) {
      super(m);
      this.events = {
        mouseenter: {
          prev: "togglePrev"
        },
        mouseleave: {
          prev: "togglePrev"
        }
      };
    }
    init() {
    }
    togglePrev(e) {
      const target = e.curTarget;
      const container = this.parent("container", target);
      if (container.classList.contains(CLASS.OPEN)) {
        container.classList.remove(CLASS.OPEN);
      } else {
        container.classList.add(CLASS.OPEN);
      }
    }
  };

  // assets/scripts/modules/Share.js
  var import_clipboard = __toESM(require_clipboard(), 1);
  var Share_default = class extends _default {
    constructor(m) {
      super(m);
      this.events = {
        click: {
          share: "share",
          close: "hide"
        }
      };
    }
    init() {
      this.inner = this.$("inner")[0];
      this.setupClipboard();
    }
    show() {
      document.documentElement.classList.add("has-modal-share-opened");
      this.copylink.setAttribute("data-clipboard-text", window.location.href);
      this.inner.focus();
    }
    hide() {
      document.documentElement.classList.remove("has-modal-share-opened");
    }
    setupClipboard() {
      this.copylink = this.$("copylink")[0];
      this.clipboard = new import_clipboard.default(this.copylink);
      this.clipboard.on("error", function(e) {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
      });
      this.clipboard.on("success", () => {
        alert(this.getData("text", this.copylink));
      });
    }
    share(e) {
      const el = e.curTarget;
      const platform = this.getData("platform", e.curTarget);
      const url2 = window.location.href;
      let shareUrl;
      switch (platform) {
        case "facebook":
          shareUrl = "https://facebook.com/sharer/sharer.php?u=" + url2;
          this.openWindow(shareUrl);
          break;
        case "twitter":
          shareUrl = "https://twitter.com/share?url=" + url2 + "&amp;text=" + encodeURIComponent(this.getData("text", e.curTarget));
          this.openWindow(shareUrl);
          break;
        case "mail":
          const subject = encodeURIComponent(this.getData("subject", e.curTarget));
          const body2 = encodeURIComponent(this.getData("body", e.curTarget));
          this.openMail(subject, body2);
          break;
        case "copylink":
          el.setAttribute("data-clipboard-text", url2);
          break;
      }
    }
    openWindow(url2) {
      window.open(url2, "Share", "menubar=no, toolbar=no, resizable=yes, scrollbars=yes, height=500, width=600");
    }
    openMail(subject, body2) {
      window.location = "mailto:?subject=" + subject + "&body=" + body2;
    }
    destroy() {
      this.clipboard.destroy();
    }
  };

  // assets/scripts/modules/ShareToggler.js
  var ShareToggler_default = class extends _default {
    constructor(m) {
      super(m);
      this.events = {
        click: "onClick"
      };
    }
    onClick() {
      this.call("show", null, "Share");
    }
  };

  // assets/scripts/modules/Wysiwyg.js
  var Wysiwyg_default = class extends _default {
    constructor(m) {
      super(m);
    }
    init() {
      this.$tables = this.el.querySelectorAll("table");
      if (this.$tables.length > 0) {
        this.$tables.forEach(($table) => {
          const table = $table;
          const wrapper = document.createElement("div");
          wrapper.classList.add("o-wysiwyg_table");
          table.parentNode.insertBefore(wrapper, table);
          wrapper.appendChild(table);
        });
      }
    }
  };

  // assets/scripts/modules/Transition.js
  var Transition_default = class extends _default {
    constructor(m) {
      super(m);
    }
    init() {
      this.$bleams = this.$("bleam");
      for (let i = 0; i < this.$bleams.length; i++) {
        const bleam = this.$bleams[i];
        bleam.style.left = `${Math.random() * window.innerWidth}px`;
        bleam.style.animationDelay = `${0.3 + Math.random() * 0.5}s`;
      }
    }
    updatePositions() {
      for (let i = 0; i < this.$bleams.length; i++) {
        const bleam = this.$bleams[i];
        bleam.style.left = `${Math.random() * window.innerWidth}px`;
        bleam.style.animationDelay = `${0.3 + Math.random() * 0.5}s`;
      }
    }
  };

  // assets/scripts/utils/recaptcha.js
  var RecaptchaHelper = class {
    constructor() {
      this.executed = false;
    }
    setInputElement($el) {
      this.inputElement = $el;
    }
    execute(done, fail) {
      if (typeof window.grecaptcha === "undefined" || !document.querySelector("#g-recaptcha-challenge").querySelector(".g-recaptcha-response")) {
        this.executed = false;
        window.onRecaptchaLoadCallback = () => {
          this.execute(done, fail);
        };
        this.getScript("https://www.google.com/recaptcha/api.js?hl=en&onload=onRecaptchaLoadCallback", () => {
        });
        return this;
      }
      window.submitRecaptchaForm = (response) => {
        return new Promise((resolve, reject) => {
          this.executed = true;
          if (this.inputElement) {
            const element = document.querySelector("#g-recaptcha-challenge").querySelector(".g-recaptcha-response");
            this.inputElement.value = element.value;
          }
          done();
          resolve();
        });
      };
      window.failedRecaptchaForm = () => {
        this.executed = false;
        fail();
      };
      if (this.executed) {
        if (this.inputElement) {
          this.inputElement.value = "";
        }
        window.grecaptcha.reset();
      }
      window.grecaptcha.execute();
      return this;
    }
    getScript(src2, cb) {
      let script = document.createElement("script");
      let prior = document.getElementsByTagName("script")[0];
      script.onload = script.onreadystatechange = function(_, isAbort) {
        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
          script.onload = script.onreadystatechange = null;
          script = void 0;
          if (!isAbort && cb)
            setTimeout(cb, 0);
        }
      };
      script.src = src2;
      prior.parentNode.insertBefore(script, prior);
    }
  };
  var Recaptcha = new RecaptchaHelper();

  // assets/scripts/modules/Form.js
  var CLASS2 = {
    IS_SUCCESS: "is-success",
    IS_LOADING: "is-loading",
    IS_ERROR: "is-error"
  };
  var Form_default = class extends _default {
    constructor(m) {
      super(m);
      this.events = {
        submit: "submit"
      };
    }
    init() {
      this.confirmMessage = this.getData("confirm-message");
      this.errorMessage = this.getData("error-message");
      this.feedbackEl = this.$("feedback")[0];
    }
    setLoadingState(state) {
      this.isSubmitting = state;
      this.el.classList.toggle(CLASS2.IS_LOADING, state);
    }
    setConfirmationState(message) {
      this.clearState();
      this.el.reset();
      this.el.classList.add(CLASS2.IS_SUCCESS);
      if (this.feedbackEl) {
        this.feedbackEl.innerHTML = message;
      }
      this.updateScroll();
    }
    setErrorState(message) {
      this.clearState();
      this.el.classList.add(CLASS2.IS_ERROR);
      if (this.feedbackEl) {
        this.feedbackEl.innerHTML = message;
      }
      this.updateScroll();
    }
    clearState() {
      this.el.classList.remove(CLASS2.IS_SUCCESS, CLASS2.IS_LOADING, CLASS2.IS_ERROR);
      if (this.feedbackEl) {
        this.feedbackEl.innerHTML = "";
      }
      this.updateScroll();
    }
    updateScroll() {
      requestAnimationFrame(() => {
        this.call("update", null, "Scroll");
      });
    }
    submit(event) {
      try {
        event.preventDefault();
        const form = event.target;
        const recaptchaElement = form.querySelector(".js-recaptcha-response");
        if (recaptchaElement || !this.isSubmitting) {
          this.clearState();
          this.setLoadingState(true);
          let isError = false;
          Recaptcha.setInputElement(recaptchaElement);
          Recaptcha.execute(() => {
            fetch(form.getAttribute("action"), {
              method: "POST",
              body: new FormData(form)
            }).then((response) => {
              if (response.status !== 200) {
                isError = true;
              }
              return response.json();
            }).then((response) => {
              if (isError) {
                this.setErrorState(this.errorMessage);
              } else {
                this.setConfirmationState(this.confirmMessage);
              }
            }).finally(() => {
              this.setLoadingState(false);
            });
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // assets/scripts/modules/CultureIcon.js
  var CultureIcon_default = class extends _default {
    constructor(m) {
      super(m);
    }
    init() {
      this.anim = gsap.fromTo(this.el, {
        rotate: 15
      }, {
        rotate: -15,
        duration: 1
      });
      this.anim.pause();
    }
    progress(value) {
      this.anim.progress(value);
    }
  };

  // assets/scripts/modules/Nav.js
  var CLASS3 = {
    OPEN: `has-nav-open`
  };
  var Nav_default = class extends _default {
    constructor(m) {
      super(m);
      this.events = {
        click: {
          buttonClose: "close"
        }
      };
    }
    init() {
      this.closeBind = (e) => {
        if (e.key === "Escape") {
          this.close();
        }
      };
      document.addEventListener("keyup", this.closeBind);
    }
    toggle() {
      html.classList.contains(CLASS3.OPEN) ? this.close() : this.open();
    }
    open() {
      html.classList.add(CLASS3.OPEN);
      this.call("inview", null, "NavCases");
    }
    close() {
      html.classList.remove(CLASS3.OPEN);
      if (this.timeout !== void 0) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.call("close", null, "NavCases");
      }, 1200);
    }
    destroy() {
      document.removeEventListener("keyup", this.closeBind);
    }
  };

  // assets/scripts/modules/VideoCopy.js
  var VideoCopy_default = class extends _default {
    constructor(m) {
      super(m);
    }
    init() {
      if (this.getData("id") !== "anthem") {
        this.copy();
      }
    }
    copy() {
      const parent = this.el.parentNode;
      const id = this.getData("id");
      const video = document.querySelector(`.js-video-base[data-video-id="${id}"]`).cloneNode(true);
      video.classList.remove("js-video-base");
      video.classList.add("js-video");
      this.$("video")[0].appendChild(video);
      video.play();
      const event = new Event("ready");
      this.el.dispatchEvent(event);
    }
  };

  // node_modules/gsap/gsap-core.js
  function _assertThisInitialized2(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  var _config = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
      lineHeight: ""
    }
  };
  var _defaults = {
    duration: 0.5,
    overwrite: false,
    delay: 0
  };
  var _suppressOverwrites;
  var _bigNum = 1e8;
  var _tinyNum = 1 / _bigNum;
  var _2PI = Math.PI * 2;
  var _HALF_PI = _2PI / 4;
  var _gsID = 0;
  var _sqrt = Math.sqrt;
  var _cos = Math.cos;
  var _sin = Math.sin;
  var _isString = function _isString2(value) {
    return typeof value === "string";
  };
  var _isFunction = function _isFunction2(value) {
    return typeof value === "function";
  };
  var _isNumber = function _isNumber2(value) {
    return typeof value === "number";
  };
  var _isUndefined = function _isUndefined2(value) {
    return typeof value === "undefined";
  };
  var _isObject = function _isObject2(value) {
    return typeof value === "object";
  };
  var _isNotFalse = function _isNotFalse2(value) {
    return value !== false;
  };
  var _windowExists = function _windowExists2() {
    return typeof window !== "undefined";
  };
  var _isFuncOrString = function _isFuncOrString2(value) {
    return _isFunction(value) || _isString(value);
  };
  var _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function() {
  };
  var _isArray = Array.isArray;
  var _strictNumExp = /(?:-?\.?\d|\.)+/gi;
  var _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g;
  var _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g;
  var _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi;
  var _relExp = /[+-]=-?[.\d]+/;
  var _delimitedValueExp = /[^,'"\[\]\s]+/gi;
  var _unitExp = /[\d.+\-=]+(?:e[-+]\d*)*/i;
  var _globalTimeline;
  var _win;
  var _coreInitted;
  var _doc;
  var _globals = {};
  var _installScope = {};
  var _coreReady;
  var _install = function _install2(scope) {
    return (_installScope = _merge(scope, _globals)) && gsap2;
  };
  var _missingPlugin = function _missingPlugin2(property, value) {
    return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
  };
  var _warn = function _warn2(message, suppress) {
    return !suppress && console.warn(message);
  };
  var _addGlobal = function _addGlobal2(name, obj) {
    return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
  };
  var _emptyFunc = function _emptyFunc2() {
    return 0;
  };
  var _reservedProps = {};
  var _lazyTweens = [];
  var _lazyLookup = {};
  var _lastRenderedFrame;
  var _plugins = {};
  var _effects = {};
  var _nextGCFrame = 30;
  var _harnessPlugins = [];
  var _callbackNames = "";
  var _harness = function _harness2(targets) {
    var target = targets[0], harnessPlugin, i;
    _isObject(target) || _isFunction(target) || (targets = [targets]);
    if (!(harnessPlugin = (target._gsap || {}).harness)) {
      i = _harnessPlugins.length;
      while (i-- && !_harnessPlugins[i].targetTest(target)) {
      }
      harnessPlugin = _harnessPlugins[i];
    }
    i = targets.length;
    while (i--) {
      targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
    }
    return targets;
  };
  var _getCache = function _getCache2(target) {
    return target._gsap || _harness(toArray(target))[0]._gsap;
  };
  var _getProperty = function _getProperty2(target, property, v) {
    return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
  };
  var _forEachName = function _forEachName2(names, func) {
    return (names = names.split(",")).forEach(func) || names;
  };
  var _round = function _round2(value) {
    return Math.round(value * 1e5) / 1e5 || 0;
  };
  var _roundPrecise = function _roundPrecise2(value) {
    return Math.round(value * 1e7) / 1e7 || 0;
  };
  var _arrayContainsAny = function _arrayContainsAny2(toSearch, toFind) {
    var l = toFind.length, i = 0;
    for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l; ) {
    }
    return i < l;
  };
  var _lazyRender = function _lazyRender2() {
    var l = _lazyTweens.length, a = _lazyTweens.slice(0), i, tween;
    _lazyLookup = {};
    _lazyTweens.length = 0;
    for (i = 0; i < l; i++) {
      tween = a[i];
      tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
    }
  };
  var _lazySafeRender = function _lazySafeRender2(animation, time, suppressEvents, force) {
    _lazyTweens.length && _lazyRender();
    animation.render(time, suppressEvents, force);
    _lazyTweens.length && _lazyRender();
  };
  var _numericIfPossible = function _numericIfPossible2(value) {
    var n = parseFloat(value);
    return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
  };
  var _passThrough = function _passThrough2(p) {
    return p;
  };
  var _setDefaults = function _setDefaults2(obj, defaults3) {
    for (var p in defaults3) {
      p in obj || (obj[p] = defaults3[p]);
    }
    return obj;
  };
  var _setKeyframeDefaults = function _setKeyframeDefaults2(obj, defaults3) {
    for (var p in defaults3) {
      p in obj || p === "duration" || p === "ease" || (obj[p] = defaults3[p]);
    }
  };
  var _merge = function _merge2(base, toMerge) {
    for (var p in toMerge) {
      base[p] = toMerge[p];
    }
    return base;
  };
  var _mergeDeep = function _mergeDeep2(base, toMerge) {
    for (var p in toMerge) {
      p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep2(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
    }
    return base;
  };
  var _copyExcluding = function _copyExcluding2(obj, excluding) {
    var copy = {}, p;
    for (p in obj) {
      p in excluding || (copy[p] = obj[p]);
    }
    return copy;
  };
  var _inheritDefaults = function _inheritDefaults2(vars) {
    var parent = vars.parent || _globalTimeline, func = vars.keyframes ? _setKeyframeDefaults : _setDefaults;
    if (_isNotFalse(vars.inherit)) {
      while (parent) {
        func(vars, parent.vars.defaults);
        parent = parent.parent || parent._dp;
      }
    }
    return vars;
  };
  var _arraysMatch = function _arraysMatch2(a1, a2) {
    var i = a1.length, match = i === a2.length;
    while (match && i-- && a1[i] === a2[i]) {
    }
    return i < 0;
  };
  var _addLinkedListItem = function _addLinkedListItem2(parent, child, firstProp, lastProp, sortBy) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }
    if (lastProp === void 0) {
      lastProp = "_last";
    }
    var prev = parent[lastProp], t;
    if (sortBy) {
      t = child[sortBy];
      while (prev && prev[sortBy] > t) {
        prev = prev._prev;
      }
    }
    if (prev) {
      child._next = prev._next;
      prev._next = child;
    } else {
      child._next = parent[firstProp];
      parent[firstProp] = child;
    }
    if (child._next) {
      child._next._prev = child;
    } else {
      parent[lastProp] = child;
    }
    child._prev = prev;
    child.parent = child._dp = parent;
    return child;
  };
  var _removeLinkedListItem = function _removeLinkedListItem2(parent, child, firstProp, lastProp) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }
    if (lastProp === void 0) {
      lastProp = "_last";
    }
    var prev = child._prev, next = child._next;
    if (prev) {
      prev._next = next;
    } else if (parent[firstProp] === child) {
      parent[firstProp] = next;
    }
    if (next) {
      next._prev = prev;
    } else if (parent[lastProp] === child) {
      parent[lastProp] = prev;
    }
    child._next = child._prev = child.parent = null;
  };
  var _removeFromParent = function _removeFromParent2(child, onlyIfParentHasAutoRemove) {
    child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove(child);
    child._act = 0;
  };
  var _uncache = function _uncache2(animation, child) {
    if (animation && (!child || child._end > animation._dur || child._start < 0)) {
      var a = animation;
      while (a) {
        a._dirty = 1;
        a = a.parent;
      }
    }
    return animation;
  };
  var _recacheAncestors = function _recacheAncestors2(animation) {
    var parent = animation.parent;
    while (parent && parent.parent) {
      parent._dirty = 1;
      parent.totalDuration();
      parent = parent.parent;
    }
    return animation;
  };
  var _hasNoPausedAncestors = function _hasNoPausedAncestors2(animation) {
    return !animation || animation._ts && _hasNoPausedAncestors2(animation.parent);
  };
  var _elapsedCycleDuration = function _elapsedCycleDuration2(animation) {
    return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
  };
  var _animationCycle = function _animationCycle2(tTime, cycleDuration) {
    var whole = Math.floor(tTime /= cycleDuration);
    return tTime && whole === tTime ? whole - 1 : whole;
  };
  var _parentToChildTotalTime = function _parentToChildTotalTime2(parentTime, child) {
    return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
  };
  var _setEnd = function _setEnd2(animation) {
    return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
  };
  var _alignPlayhead = function _alignPlayhead2(animation, totalTime) {
    var parent = animation._dp;
    if (parent && parent.smoothChildTiming && animation._ts) {
      animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));
      _setEnd(animation);
      parent._dirty || _uncache(parent, animation);
    }
    return animation;
  };
  var _postAddChecks = function _postAddChecks2(timeline2, child) {
    var t;
    if (child._time || child._initted && !child._dur) {
      t = _parentToChildTotalTime(timeline2.rawTime(), child);
      if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
        child.render(t, true);
      }
    }
    if (_uncache(timeline2, child)._dp && timeline2._initted && timeline2._time >= timeline2._dur && timeline2._ts) {
      if (timeline2._dur < timeline2.duration()) {
        t = timeline2;
        while (t._dp) {
          t.rawTime() >= 0 && t.totalTime(t._tTime);
          t = t._dp;
        }
      }
      timeline2._zTime = -_tinyNum;
    }
  };
  var _addToTimeline = function _addToTimeline2(timeline2, child, position, skipChecks) {
    child.parent && _removeFromParent(child);
    child._start = _roundPrecise((_isNumber(position) ? position : position || timeline2 !== _globalTimeline ? _parsePosition(timeline2, position, child) : timeline2._time) + child._delay);
    child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));
    _addLinkedListItem(timeline2, child, "_first", "_last", timeline2._sort ? "_start" : 0);
    _isFromOrFromStart(child) || (timeline2._recent = child);
    skipChecks || _postAddChecks(timeline2, child);
    return timeline2;
  };
  var _scrollTrigger = function _scrollTrigger2(animation, trigger) {
    return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
  };
  var _attemptInitTween = function _attemptInitTween2(tween, totalTime, force, suppressEvents) {
    _initTween(tween, totalTime);
    if (!tween._initted) {
      return 1;
    }
    if (!force && tween._pt && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
      _lazyTweens.push(tween);
      tween._lazy = [totalTime, suppressEvents];
      return 1;
    }
  };
  var _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart2(_ref) {
    var parent = _ref.parent;
    return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart2(parent));
  };
  var _isFromOrFromStart = function _isFromOrFromStart2(_ref2) {
    var data = _ref2.data;
    return data === "isFromStart" || data === "isStart";
  };
  var _renderZeroDurationTween = function _renderZeroDurationTween2(tween, totalTime, suppressEvents, force) {
    var prevRatio = tween.ratio, ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1, repeatDelay = tween._rDelay, tTime = 0, pt, iteration, prevIteration;
    if (repeatDelay && tween._repeat) {
      tTime = _clamp(0, tween._tDur, totalTime);
      iteration = _animationCycle(tTime, repeatDelay);
      prevIteration = _animationCycle(tween._tTime, repeatDelay);
      tween._yoyo && iteration & 1 && (ratio = 1 - ratio);
      if (iteration !== prevIteration) {
        prevRatio = 1 - ratio;
        tween.vars.repeatRefresh && tween._initted && tween.invalidate();
      }
    }
    if (ratio !== prevRatio || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
      if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents)) {
        return;
      }
      prevIteration = tween._zTime;
      tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0);
      suppressEvents || (suppressEvents = totalTime && !prevIteration);
      tween.ratio = ratio;
      tween._from && (ratio = 1 - ratio);
      tween._time = 0;
      tween._tTime = tTime;
      pt = tween._pt;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
      tween._startAt && totalTime < 0 && tween._startAt.render(totalTime, true, true);
      tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
      tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");
      if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
        ratio && _removeFromParent(tween, 1);
        if (!suppressEvents) {
          _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);
          tween._prom && tween._prom();
        }
      }
    } else if (!tween._zTime) {
      tween._zTime = totalTime;
    }
  };
  var _findNextPauseTween = function _findNextPauseTween2(animation, prevTime, time) {
    var child;
    if (time > prevTime) {
      child = animation._first;
      while (child && child._start <= time) {
        if (!child._dur && child.data === "isPause" && child._start > prevTime) {
          return child;
        }
        child = child._next;
      }
    } else {
      child = animation._last;
      while (child && child._start >= time) {
        if (!child._dur && child.data === "isPause" && child._start < prevTime) {
          return child;
        }
        child = child._prev;
      }
    }
  };
  var _setDuration = function _setDuration2(animation, duration, skipUncache, leavePlayhead) {
    var repeat = animation._repeat, dur = _roundPrecise(duration) || 0, totalProgress = animation._tTime / animation._tDur;
    totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
    animation._dur = dur;
    animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
    totalProgress && !leavePlayhead ? _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress) : animation.parent && _setEnd(animation);
    skipUncache || _uncache(animation.parent, animation);
    return animation;
  };
  var _onUpdateTotalDuration = function _onUpdateTotalDuration2(animation) {
    return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
  };
  var _zeroPosition = {
    _start: 0,
    endTime: _emptyFunc,
    totalDuration: _emptyFunc
  };
  var _parsePosition = function _parsePosition2(animation, position, percentAnimation) {
    var labels = animation.labels, recent = animation._recent || _zeroPosition, clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur, i, offset, isPercent;
    if (_isString(position) && (isNaN(position) || position in labels)) {
      offset = position.charAt(0);
      isPercent = position.substr(-1) === "%";
      i = position.indexOf("=");
      if (offset === "<" || offset === ">") {
        i >= 0 && (position = position.replace(/=/, ""));
        return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
      }
      if (i < 0) {
        position in labels || (labels[position] = clippedDuration);
        return labels[position];
      }
      offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));
      if (isPercent && percentAnimation) {
        offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
      }
      return i > 1 ? _parsePosition2(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
    }
    return position == null ? clippedDuration : +position;
  };
  var _createTweenType = function _createTweenType2(type, params, timeline2) {
    var isLegacy = _isNumber(params[1]), varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1), vars = params[varsIndex], irVars, parent;
    isLegacy && (vars.duration = params[1]);
    vars.parent = timeline2;
    if (type) {
      irVars = vars;
      parent = timeline2;
      while (parent && !("immediateRender" in irVars)) {
        irVars = parent.vars.defaults || {};
        parent = _isNotFalse(parent.vars.inherit) && parent.parent;
      }
      vars.immediateRender = _isNotFalse(irVars.immediateRender);
      type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1];
    }
    return new Tween(params[0], vars, params[varsIndex + 1]);
  };
  var _conditionalReturn = function _conditionalReturn2(value, func) {
    return value || value === 0 ? func(value) : func;
  };
  var _clamp = function _clamp2(min, max, value) {
    return value < min ? min : value > max ? max : value;
  };
  var getUnit = function getUnit2(value) {
    if (typeof value !== "string") {
      return "";
    }
    var v = _unitExp.exec(value);
    return v ? value.substr(v.index + v[0].length) : "";
  };
  var clamp = function clamp2(min, max, value) {
    return _conditionalReturn(value, function(v) {
      return _clamp(min, max, v);
    });
  };
  var _slice = [].slice;
  var _isArrayLike = function _isArrayLike2(value, nonEmpty) {
    return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
  };
  var _flatten = function _flatten2(ar, leaveStrings, accumulator) {
    if (accumulator === void 0) {
      accumulator = [];
    }
    return ar.forEach(function(value) {
      var _accumulator;
      return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
    }) || accumulator;
  };
  var toArray = function toArray2(value, scope, leaveStrings) {
    return _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
  };
  var selector = function selector2(value) {
    value = toArray(value)[0] || _warn("Invalid scope") || {};
    return function(v) {
      var el = value.current || value.nativeElement || value;
      return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
    };
  };
  var shuffle = function shuffle2(a) {
    return a.sort(function() {
      return 0.5 - Math.random();
    });
  };
  var distribute = function distribute2(v) {
    if (_isFunction(v)) {
      return v;
    }
    var vars = _isObject(v) ? v : {
      each: v
    }, ease = _parseEase(vars.ease), from = vars.from || 0, base = parseFloat(vars.base) || 0, cache = {}, isDecimal = from > 0 && from < 1, ratios = isNaN(from) || isDecimal, axis = vars.axis, ratioX = from, ratioY = from;
    if (_isString(from)) {
      ratioX = ratioY = {
        center: 0.5,
        edges: 0.5,
        end: 1
      }[from] || 0;
    } else if (!isDecimal && ratios) {
      ratioX = from[0];
      ratioY = from[1];
    }
    return function(i, target, a) {
      var l = (a || vars).length, distances = cache[l], originX, originY, x, y, d, j, max, min, wrapAt;
      if (!distances) {
        wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];
        if (!wrapAt) {
          max = -_bigNum;
          while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {
          }
          wrapAt--;
        }
        distances = cache[l] = [];
        originX = ratios ? Math.min(wrapAt, l) * ratioX - 0.5 : from % wrapAt;
        originY = ratios ? l * ratioY / wrapAt - 0.5 : from / wrapAt | 0;
        max = 0;
        min = _bigNum;
        for (j = 0; j < l; j++) {
          x = j % wrapAt - originX;
          y = originY - (j / wrapAt | 0);
          distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
          d > max && (max = d);
          d < min && (min = d);
        }
        from === "random" && shuffle(distances);
        distances.max = max - min;
        distances.min = min;
        distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
        distances.b = l < 0 ? base - l : base;
        distances.u = getUnit(vars.amount || vars.each) || 0;
        ease = ease && l < 0 ? _invertEase(ease) : ease;
      }
      l = (distances[i] - distances.min) / distances.max || 0;
      return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u;
    };
  };
  var _roundModifier = function _roundModifier2(v) {
    var p = Math.pow(10, ((v + "").split(".")[1] || "").length);
    return function(raw) {
      var n = Math.round(parseFloat(raw) / v) * v * p;
      return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw));
    };
  };
  var snap = function snap2(snapTo, value) {
    var isArray = _isArray(snapTo), radius, is2D;
    if (!isArray && _isObject(snapTo)) {
      radius = isArray = snapTo.radius || _bigNum;
      if (snapTo.values) {
        snapTo = toArray(snapTo.values);
        if (is2D = !_isNumber(snapTo[0])) {
          radius *= radius;
        }
      } else {
        snapTo = _roundModifier(snapTo.increment);
      }
    }
    return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function(raw) {
      is2D = snapTo(raw);
      return Math.abs(is2D - raw) <= radius ? is2D : raw;
    } : function(raw) {
      var x = parseFloat(is2D ? raw.x : raw), y = parseFloat(is2D ? raw.y : 0), min = _bigNum, closest = 0, i = snapTo.length, dx, dy;
      while (i--) {
        if (is2D) {
          dx = snapTo[i].x - x;
          dy = snapTo[i].y - y;
          dx = dx * dx + dy * dy;
        } else {
          dx = Math.abs(snapTo[i] - x);
        }
        if (dx < min) {
          min = dx;
          closest = i;
        }
      }
      closest = !radius || min <= radius ? snapTo[closest] : raw;
      return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
    });
  };
  var random = function random2(min, max, roundingIncrement, returnFunction) {
    return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function() {
      return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * 0.99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
    });
  };
  var pipe = function pipe2() {
    for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
      functions[_key] = arguments[_key];
    }
    return function(value) {
      return functions.reduce(function(v, f) {
        return f(v);
      }, value);
    };
  };
  var unitize = function unitize2(func, unit) {
    return function(value) {
      return func(parseFloat(value)) + (unit || getUnit(value));
    };
  };
  var normalize = function normalize2(min, max, value) {
    return mapRange(min, max, 0, 1, value);
  };
  var _wrapArray = function _wrapArray2(a, wrapper, value) {
    return _conditionalReturn(value, function(index) {
      return a[~~wrapper(index)];
    });
  };
  var wrap = function wrap2(min, max, value) {
    var range = max - min;
    return _isArray(min) ? _wrapArray(min, wrap2(0, min.length), max) : _conditionalReturn(value, function(value2) {
      return (range + (value2 - min) % range) % range + min;
    });
  };
  var wrapYoyo = function wrapYoyo2(min, max, value) {
    var range = max - min, total = range * 2;
    return _isArray(min) ? _wrapArray(min, wrapYoyo2(0, min.length - 1), max) : _conditionalReturn(value, function(value2) {
      value2 = (total + (value2 - min) % total) % total || 0;
      return min + (value2 > range ? total - value2 : value2);
    });
  };
  var _replaceRandom = function _replaceRandom2(value) {
    var prev = 0, s = "", i, nums, end, isArray;
    while (~(i = value.indexOf("random(", prev))) {
      end = value.indexOf(")", i);
      isArray = value.charAt(i + 7) === "[";
      nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
      s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
      prev = end + 1;
    }
    return s + value.substr(prev, value.length - prev);
  };
  var mapRange = function mapRange2(inMin, inMax, outMin, outMax, value) {
    var inRange = inMax - inMin, outRange = outMax - outMin;
    return _conditionalReturn(value, function(value2) {
      return outMin + ((value2 - inMin) / inRange * outRange || 0);
    });
  };
  var interpolate = function interpolate2(start, end, progress, mutate) {
    var func = isNaN(start + end) ? 0 : function(p2) {
      return (1 - p2) * start + p2 * end;
    };
    if (!func) {
      var isString = _isString(start), master = {}, p, i, interpolators, l, il;
      progress === true && (mutate = 1) && (progress = null);
      if (isString) {
        start = {
          p: start
        };
        end = {
          p: end
        };
      } else if (_isArray(start) && !_isArray(end)) {
        interpolators = [];
        l = start.length;
        il = l - 2;
        for (i = 1; i < l; i++) {
          interpolators.push(interpolate2(start[i - 1], start[i]));
        }
        l--;
        func = function func2(p2) {
          p2 *= l;
          var i2 = Math.min(il, ~~p2);
          return interpolators[i2](p2 - i2);
        };
        progress = end;
      } else if (!mutate) {
        start = _merge(_isArray(start) ? [] : {}, start);
      }
      if (!interpolators) {
        for (p in end) {
          _addPropTween.call(master, start, p, "get", end[p]);
        }
        func = function func2(p2) {
          return _renderPropTweens(p2, master) || (isString ? start.p : start);
        };
      }
    }
    return _conditionalReturn(progress, func);
  };
  var _getLabelInDirection = function _getLabelInDirection2(timeline2, fromTime, backward) {
    var labels = timeline2.labels, min = _bigNum, p, distance, label;
    for (p in labels) {
      distance = labels[p] - fromTime;
      if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
        label = p;
        min = distance;
      }
    }
    return label;
  };
  var _callback = function _callback2(animation, type, executeLazyFirst) {
    var v = animation.vars, callback = v[type], params, scope;
    if (!callback) {
      return;
    }
    params = v[type + "Params"];
    scope = v.callbackScope || animation;
    executeLazyFirst && _lazyTweens.length && _lazyRender();
    return params ? callback.apply(scope, params) : callback.call(scope);
  };
  var _interrupt = function _interrupt2(animation) {
    _removeFromParent(animation);
    animation.scrollTrigger && animation.scrollTrigger.kill(false);
    animation.progress() < 1 && _callback(animation, "onInterrupt");
    return animation;
  };
  var _quickTween;
  var _createPlugin = function _createPlugin2(config3) {
    config3 = !config3.name && config3["default"] || config3;
    var name = config3.name, isFunc = _isFunction(config3), Plugin = name && !isFunc && config3.init ? function() {
      this._props = [];
    } : config3, instanceDefaults = {
      init: _emptyFunc,
      render: _renderPropTweens,
      add: _addPropTween,
      kill: _killPropTweensOf,
      modifier: _addPluginModifier,
      rawVars: 0
    }, statics = {
      targetTest: 0,
      get: 0,
      getSetter: _getSetter,
      aliases: {},
      register: 0
    };
    _wake();
    if (config3 !== Plugin) {
      if (_plugins[name]) {
        return;
      }
      _setDefaults(Plugin, _setDefaults(_copyExcluding(config3, instanceDefaults), statics));
      _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config3, statics)));
      _plugins[Plugin.prop = name] = Plugin;
      if (config3.targetTest) {
        _harnessPlugins.push(Plugin);
        _reservedProps[name] = 1;
      }
      name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin";
    }
    _addGlobal(name, Plugin);
    config3.register && config3.register(gsap2, Plugin, PropTween);
  };
  var _255 = 255;
  var _colorLookup = {
    aqua: [0, _255, _255],
    lime: [0, _255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, _255],
    navy: [0, 0, 128],
    white: [_255, _255, _255],
    olive: [128, 128, 0],
    yellow: [_255, _255, 0],
    orange: [_255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [_255, 0, 0],
    pink: [_255, 192, 203],
    cyan: [0, _255, _255],
    transparent: [_255, _255, _255, 0]
  };
  var _hue = function _hue2(h, m1, m2) {
    h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
    return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < 0.5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + 0.5 | 0;
  };
  var splitColor = function splitColor2(v, toHSL, forceAlpha) {
    var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0, r, g, b, h, s, l, max, min, d, wasHSL;
    if (!a) {
      if (v.substr(-1) === ",") {
        v = v.substr(0, v.length - 1);
      }
      if (_colorLookup[v]) {
        a = _colorLookup[v];
      } else if (v.charAt(0) === "#") {
        if (v.length < 6) {
          r = v.charAt(1);
          g = v.charAt(2);
          b = v.charAt(3);
          v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
        }
        if (v.length === 9) {
          a = parseInt(v.substr(1, 6), 16);
          return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
        }
        v = parseInt(v.substr(1), 16);
        a = [v >> 16, v >> 8 & _255, v & _255];
      } else if (v.substr(0, 3) === "hsl") {
        a = wasHSL = v.match(_strictNumExp);
        if (!toHSL) {
          h = +a[0] % 360 / 360;
          s = +a[1] / 100;
          l = +a[2] / 100;
          g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
          r = l * 2 - g;
          a.length > 3 && (a[3] *= 1);
          a[0] = _hue(h + 1 / 3, r, g);
          a[1] = _hue(h, r, g);
          a[2] = _hue(h - 1 / 3, r, g);
        } else if (~v.indexOf("=")) {
          a = v.match(_numExp);
          forceAlpha && a.length < 4 && (a[3] = 1);
          return a;
        }
      } else {
        a = v.match(_strictNumExp) || _colorLookup.transparent;
      }
      a = a.map(Number);
    }
    if (toHSL && !wasHSL) {
      r = a[0] / _255;
      g = a[1] / _255;
      b = a[2] / _255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      l = (max + min) / 2;
      if (max === min) {
        h = s = 0;
      } else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h *= 60;
      }
      a[0] = ~~(h + 0.5);
      a[1] = ~~(s * 100 + 0.5);
      a[2] = ~~(l * 100 + 0.5);
    }
    forceAlpha && a.length < 4 && (a[3] = 1);
    return a;
  };
  var _colorOrderData = function _colorOrderData2(v) {
    var values = [], c = [], i = -1;
    v.split(_colorExp).forEach(function(v2) {
      var a = v2.match(_numWithUnitExp) || [];
      values.push.apply(values, a);
      c.push(i += a.length + 1);
    });
    values.c = c;
    return values;
  };
  var _formatColors = function _formatColors2(s, toHSL, orderMatchData) {
    var result = "", colors = (s + result).match(_colorExp), type = toHSL ? "hsla(" : "rgba(", i = 0, c, shell, d, l;
    if (!colors) {
      return s;
    }
    colors = colors.map(function(color) {
      return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
    });
    if (orderMatchData) {
      d = _colorOrderData(s);
      c = orderMatchData.c;
      if (c.join(result) !== d.c.join(result)) {
        shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
        l = shell.length - 1;
        for (; i < l; i++) {
          result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
        }
      }
    }
    if (!shell) {
      shell = s.split(_colorExp);
      l = shell.length - 1;
      for (; i < l; i++) {
        result += shell[i] + colors[i];
      }
    }
    return result + shell[l];
  };
  var _colorExp = function() {
    var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", p;
    for (p in _colorLookup) {
      s += "|" + p + "\\b";
    }
    return new RegExp(s + ")", "gi");
  }();
  var _hslExp = /hsl[a]?\(/;
  var _colorStringFilter = function _colorStringFilter2(a) {
    var combined = a.join(" "), toHSL;
    _colorExp.lastIndex = 0;
    if (_colorExp.test(combined)) {
      toHSL = _hslExp.test(combined);
      a[1] = _formatColors(a[1], toHSL);
      a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1]));
      return true;
    }
  };
  var _tickerActive;
  var _ticker = function() {
    var _getTime = Date.now, _lagThreshold = 500, _adjustedLag = 33, _startTime = _getTime(), _lastUpdate = _startTime, _gap = 1e3 / 240, _nextTime = _gap, _listeners = [], _id, _req, _raf, _self, _delta, _i, _tick = function _tick2(v) {
      var elapsed = _getTime() - _lastUpdate, manual = v === true, overlap, dispatch, time, frame;
      elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
      _lastUpdate += elapsed;
      time = _lastUpdate - _startTime;
      overlap = time - _nextTime;
      if (overlap > 0 || manual) {
        frame = ++_self.frame;
        _delta = time - _self.time * 1e3;
        _self.time = time = time / 1e3;
        _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
        dispatch = 1;
      }
      manual || (_id = _req(_tick2));
      if (dispatch) {
        for (_i = 0; _i < _listeners.length; _i++) {
          _listeners[_i](time, _delta, frame, v);
        }
      }
    };
    _self = {
      time: 0,
      frame: 0,
      tick: function tick() {
        _tick(true);
      },
      deltaRatio: function deltaRatio(fps) {
        return _delta / (1e3 / (fps || 60));
      },
      wake: function wake() {
        if (_coreReady) {
          if (!_coreInitted && _windowExists()) {
            _win = _coreInitted = window;
            _doc = _win.document || {};
            _globals.gsap = gsap2;
            (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap2.version);
            _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});
            _raf = _win.requestAnimationFrame;
          }
          _id && _self.sleep();
          _req = _raf || function(f) {
            return setTimeout(f, _nextTime - _self.time * 1e3 + 1 | 0);
          };
          _tickerActive = 1;
          _tick(2);
        }
      },
      sleep: function sleep() {
        (_raf ? _win.cancelAnimationFrame : clearTimeout)(_id);
        _tickerActive = 0;
        _req = _emptyFunc;
      },
      lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
        _lagThreshold = threshold || 1 / _tinyNum;
        _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
      },
      fps: function fps(_fps) {
        _gap = 1e3 / (_fps || 240);
        _nextTime = _self.time * 1e3 + _gap;
      },
      add: function add(callback) {
        _listeners.indexOf(callback) < 0 && _listeners.push(callback);
        _wake();
      },
      remove: function remove(callback) {
        var i;
        ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
      },
      _listeners
    };
    return _self;
  }();
  var _wake = function _wake2() {
    return !_tickerActive && _ticker.wake();
  };
  var _easeMap = {};
  var _customEaseExp = /^[\d.\-M][\d.\-,\s]/;
  var _quotesExp = /["']/g;
  var _parseObjectInString = function _parseObjectInString2(value) {
    var obj = {}, split = value.substr(1, value.length - 3).split(":"), key = split[0], i = 1, l = split.length, index, val, parsedVal;
    for (; i < l; i++) {
      val = split[i];
      index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
      parsedVal = val.substr(0, index);
      obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
      key = val.substr(index + 1).trim();
    }
    return obj;
  };
  var _valueInParentheses = function _valueInParentheses2(value) {
    var open = value.indexOf("(") + 1, close = value.indexOf(")"), nested = value.indexOf("(", open);
    return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
  };
  var _configEaseFromString = function _configEaseFromString2(name) {
    var split = (name + "").split("("), ease = _easeMap[split[0]];
    return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
  };
  var _invertEase = function _invertEase2(ease) {
    return function(p) {
      return 1 - ease(1 - p);
    };
  };
  var _propagateYoyoEase = function _propagateYoyoEase2(timeline2, isYoyo) {
    var child = timeline2._first, ease;
    while (child) {
      if (child instanceof Timeline) {
        _propagateYoyoEase2(child, isYoyo);
      } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
        if (child.timeline) {
          _propagateYoyoEase2(child.timeline, isYoyo);
        } else {
          ease = child._ease;
          child._ease = child._yEase;
          child._yEase = ease;
          child._yoyo = isYoyo;
        }
      }
      child = child._next;
    }
  };
  var _parseEase = function _parseEase2(ease, defaultEase) {
    return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
  };
  var _insertEase = function _insertEase2(names, easeIn, easeOut, easeInOut) {
    if (easeOut === void 0) {
      easeOut = function easeOut2(p) {
        return 1 - easeIn(1 - p);
      };
    }
    if (easeInOut === void 0) {
      easeInOut = function easeInOut2(p) {
        return p < 0.5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
      };
    }
    var ease = {
      easeIn,
      easeOut,
      easeInOut
    }, lowercaseName;
    _forEachName(names, function(name) {
      _easeMap[name] = _globals[name] = ease;
      _easeMap[lowercaseName = name.toLowerCase()] = easeOut;
      for (var p in ease) {
        _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
      }
    });
    return ease;
  };
  var _easeInOutFromOut = function _easeInOutFromOut2(easeOut) {
    return function(p) {
      return p < 0.5 ? (1 - easeOut(1 - p * 2)) / 2 : 0.5 + easeOut((p - 0.5) * 2) / 2;
    };
  };
  var _configElastic = function _configElastic2(type, amplitude, period) {
    var p1 = amplitude >= 1 ? amplitude : 1, p2 = (period || (type ? 0.3 : 0.45)) / (amplitude < 1 ? amplitude : 1), p3 = p2 / _2PI * (Math.asin(1 / p1) || 0), easeOut = function easeOut2(p) {
      return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
    }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);
    p2 = _2PI / p2;
    ease.config = function(amplitude2, period2) {
      return _configElastic2(type, amplitude2, period2);
    };
    return ease;
  };
  var _configBack = function _configBack2(type, overshoot) {
    if (overshoot === void 0) {
      overshoot = 1.70158;
    }
    var easeOut = function easeOut2(p) {
      return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
    }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);
    ease.config = function(overshoot2) {
      return _configBack2(type, overshoot2);
    };
    return ease;
  };
  _forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function(name, i) {
    var power = i < 5 ? i + 1 : i;
    _insertEase(name + ",Power" + (power - 1), i ? function(p) {
      return Math.pow(p, power);
    } : function(p) {
      return p;
    }, function(p) {
      return 1 - Math.pow(1 - p, power);
    }, function(p) {
      return p < 0.5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
    });
  });
  _easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;
  _insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());
  (function(n, c) {
    var n1 = 1 / c, n2 = 2 * n1, n3 = 2.5 * n1, easeOut = function easeOut2(p) {
      return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + 0.75 : p < n3 ? n * (p -= 2.25 / c) * p + 0.9375 : n * Math.pow(p - 2.625 / c, 2) + 0.984375;
    };
    _insertEase("Bounce", function(p) {
      return 1 - easeOut(1 - p);
    }, easeOut);
  })(7.5625, 2.75);
  _insertEase("Expo", function(p) {
    return p ? Math.pow(2, 10 * (p - 1)) : 0;
  });
  _insertEase("Circ", function(p) {
    return -(_sqrt(1 - p * p) - 1);
  });
  _insertEase("Sine", function(p) {
    return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
  });
  _insertEase("Back", _configBack("in"), _configBack("out"), _configBack());
  _easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
    config: function config(steps, immediateStart) {
      if (steps === void 0) {
        steps = 1;
      }
      var p1 = 1 / steps, p2 = steps + (immediateStart ? 0 : 1), p3 = immediateStart ? 1 : 0, max = 1 - _tinyNum;
      return function(p) {
        return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
      };
    }
  };
  _defaults.ease = _easeMap["quad.out"];
  _forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(name) {
    return _callbackNames += name + "," + name + "Params,";
  });
  var GSCache = function GSCache2(target, harness) {
    this.id = _gsID++;
    target._gsap = this;
    this.target = target;
    this.harness = harness;
    this.get = harness ? harness.get : _getProperty;
    this.set = harness ? harness.getSetter : _getSetter;
  };
  var Animation = /* @__PURE__ */ function() {
    function Animation2(vars) {
      this.vars = vars;
      this._delay = +vars.delay || 0;
      if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
        this._rDelay = vars.repeatDelay || 0;
        this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
      }
      this._ts = 1;
      _setDuration(this, +vars.duration, 1, 1);
      this.data = vars.data;
      _tickerActive || _ticker.wake();
    }
    var _proto = Animation2.prototype;
    _proto.delay = function delay(value) {
      if (value || value === 0) {
        this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
        this._delay = value;
        return this;
      }
      return this._delay;
    };
    _proto.duration = function duration(value) {
      return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
    };
    _proto.totalDuration = function totalDuration(value) {
      if (!arguments.length) {
        return this._tDur;
      }
      this._dirty = 0;
      return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
    };
    _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
      _wake();
      if (!arguments.length) {
        return this._tTime;
      }
      var parent = this._dp;
      if (parent && parent.smoothChildTiming && this._ts) {
        _alignPlayhead(this, _totalTime);
        !parent._dp || parent.parent || _postAddChecks(parent, this);
        while (parent && parent.parent) {
          if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
            parent.totalTime(parent._tTime, true);
          }
          parent = parent.parent;
        }
        if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
          _addToTimeline(this._dp, this, this._start - this._delay);
        }
      }
      if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
        this._ts || (this._pTime = _totalTime);
        _lazySafeRender(this, _totalTime, suppressEvents);
      }
      return this;
    };
    _proto.time = function time(value, suppressEvents) {
      return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time;
    };
    _proto.totalProgress = function totalProgress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
    };
    _proto.progress = function progress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
    };
    _proto.iteration = function iteration(value, suppressEvents) {
      var cycleDuration = this.duration() + this._rDelay;
      return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
    };
    _proto.timeScale = function timeScale(value) {
      if (!arguments.length) {
        return this._rts === -_tinyNum ? 0 : this._rts;
      }
      if (this._rts === value) {
        return this;
      }
      var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime;
      this._rts = +value || 0;
      this._ts = this._ps || value === -_tinyNum ? 0 : this._rts;
      _recacheAncestors(this.totalTime(_clamp(-this._delay, this._tDur, tTime), true));
      _setEnd(this);
      return this;
    };
    _proto.paused = function paused(value) {
      if (!arguments.length) {
        return this._ps;
      }
      if (this._ps !== value) {
        this._ps = value;
        if (value) {
          this._pTime = this._tTime || Math.max(-this._delay, this.rawTime());
          this._ts = this._act = 0;
        } else {
          _wake();
          this._ts = this._rts;
          this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum));
        }
      }
      return this;
    };
    _proto.startTime = function startTime(value) {
      if (arguments.length) {
        this._start = value;
        var parent = this.parent || this._dp;
        parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
        return this;
      }
      return this._start;
    };
    _proto.endTime = function endTime(includeRepeats) {
      return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
    };
    _proto.rawTime = function rawTime(wrapRepeats) {
      var parent = this.parent || this._dp;
      return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
    };
    _proto.globalTime = function globalTime(rawTime) {
      var animation = this, time = arguments.length ? rawTime : animation.rawTime();
      while (animation) {
        time = animation._start + time / (animation._ts || 1);
        animation = animation._dp;
      }
      return time;
    };
    _proto.repeat = function repeat(value) {
      if (arguments.length) {
        this._repeat = value === Infinity ? -2 : value;
        return _onUpdateTotalDuration(this);
      }
      return this._repeat === -2 ? Infinity : this._repeat;
    };
    _proto.repeatDelay = function repeatDelay(value) {
      if (arguments.length) {
        var time = this._time;
        this._rDelay = value;
        _onUpdateTotalDuration(this);
        return time ? this.time(time) : this;
      }
      return this._rDelay;
    };
    _proto.yoyo = function yoyo(value) {
      if (arguments.length) {
        this._yoyo = value;
        return this;
      }
      return this._yoyo;
    };
    _proto.seek = function seek(position, suppressEvents) {
      return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
    };
    _proto.restart = function restart(includeDelay, suppressEvents) {
      return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
    };
    _proto.play = function play(from, suppressEvents) {
      from != null && this.seek(from, suppressEvents);
      return this.reversed(false).paused(false);
    };
    _proto.reverse = function reverse(from, suppressEvents) {
      from != null && this.seek(from || this.totalDuration(), suppressEvents);
      return this.reversed(true).paused(false);
    };
    _proto.pause = function pause(atTime, suppressEvents) {
      atTime != null && this.seek(atTime, suppressEvents);
      return this.paused(true);
    };
    _proto.resume = function resume() {
      return this.paused(false);
    };
    _proto.reversed = function reversed(value) {
      if (arguments.length) {
        !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0));
        return this;
      }
      return this._rts < 0;
    };
    _proto.invalidate = function invalidate() {
      this._initted = this._act = 0;
      this._zTime = -_tinyNum;
      return this;
    };
    _proto.isActive = function isActive() {
      var parent = this.parent || this._dp, start = this._start, rawTime;
      return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
    };
    _proto.eventCallback = function eventCallback(type, callback, params) {
      var vars = this.vars;
      if (arguments.length > 1) {
        if (!callback) {
          delete vars[type];
        } else {
          vars[type] = callback;
          params && (vars[type + "Params"] = params);
          type === "onUpdate" && (this._onUpdate = callback);
        }
        return this;
      }
      return vars[type];
    };
    _proto.then = function then(onFulfilled) {
      var self2 = this;
      return new Promise(function(resolve) {
        var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough, _resolve = function _resolve2() {
          var _then = self2.then;
          self2.then = null;
          _isFunction(f) && (f = f(self2)) && (f.then || f === self2) && (self2.then = _then);
          resolve(f);
          self2.then = _then;
        };
        if (self2._initted && self2.totalProgress() === 1 && self2._ts >= 0 || !self2._tTime && self2._ts < 0) {
          _resolve();
        } else {
          self2._prom = _resolve;
        }
      });
    };
    _proto.kill = function kill() {
      _interrupt(this);
    };
    return Animation2;
  }();
  _setDefaults(Animation.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: false,
    parent: null,
    _initted: false,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -_tinyNum,
    _prom: 0,
    _ps: false,
    _rts: 1
  });
  var Timeline = /* @__PURE__ */ function(_Animation) {
    _inheritsLoose(Timeline2, _Animation);
    function Timeline2(vars, position) {
      var _this;
      if (vars === void 0) {
        vars = {};
      }
      _this = _Animation.call(this, vars) || this;
      _this.labels = {};
      _this.smoothChildTiming = !!vars.smoothChildTiming;
      _this.autoRemoveChildren = !!vars.autoRemoveChildren;
      _this._sort = _isNotFalse(vars.sortChildren);
      _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized2(_this), position);
      vars.reversed && _this.reverse();
      vars.paused && _this.paused(true);
      vars.scrollTrigger && _scrollTrigger(_assertThisInitialized2(_this), vars.scrollTrigger);
      return _this;
    }
    var _proto2 = Timeline2.prototype;
    _proto2.to = function to(targets, vars, position) {
      _createTweenType(0, arguments, this);
      return this;
    };
    _proto2.from = function from(targets, vars, position) {
      _createTweenType(1, arguments, this);
      return this;
    };
    _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
      _createTweenType(2, arguments, this);
      return this;
    };
    _proto2.set = function set(targets, vars, position) {
      vars.duration = 0;
      vars.parent = this;
      _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
      vars.immediateRender = !!vars.immediateRender;
      new Tween(targets, vars, _parsePosition(this, position), 1);
      return this;
    };
    _proto2.call = function call(callback, params, position) {
      return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
    };
    _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.duration = duration;
      vars.stagger = vars.stagger || stagger;
      vars.onComplete = onCompleteAll;
      vars.onCompleteParams = onCompleteAllParams;
      vars.parent = this;
      new Tween(targets, vars, _parsePosition(this, position));
      return this;
    };
    _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.runBackwards = 1;
      _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
      return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
    };
    _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
      toVars.startAt = fromVars;
      _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
      return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
    };
    _proto2.render = function render(totalTime, suppressEvents, force) {
      var prevTime = this._time, tDur = this._dirty ? this.totalDuration() : this._tDur, dur = this._dur, tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime), crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur), time, child, next, iteration, cycleDuration, prevPaused, pauseTween, timeScale, prevStart, prevIteration, yoyo, isYoyo;
      this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);
      if (tTime !== this._tTime || force || crossingStart) {
        if (prevTime !== this._time && dur) {
          tTime += this._time - prevTime;
          totalTime += this._time - prevTime;
        }
        time = tTime;
        prevStart = this._start;
        timeScale = this._ts;
        prevPaused = !timeScale;
        if (crossingStart) {
          dur || (prevTime = this._zTime);
          (totalTime || !suppressEvents) && (this._zTime = totalTime);
        }
        if (this._repeat) {
          yoyo = this._yoyo;
          cycleDuration = dur + this._rDelay;
          if (this._repeat < -1 && totalTime < 0) {
            return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
          }
          time = _roundPrecise(tTime % cycleDuration);
          if (tTime === tDur) {
            iteration = this._repeat;
            time = dur;
          } else {
            iteration = ~~(tTime / cycleDuration);
            if (iteration && iteration === tTime / cycleDuration) {
              time = dur;
              iteration--;
            }
            time > dur && (time = dur);
          }
          prevIteration = _animationCycle(this._tTime, cycleDuration);
          !prevTime && this._tTime && prevIteration !== iteration && (prevIteration = iteration);
          if (yoyo && iteration & 1) {
            time = dur - time;
            isYoyo = 1;
          }
          if (iteration !== prevIteration && !this._lock) {
            var rewinding = yoyo && prevIteration & 1, doesWrap = rewinding === (yoyo && iteration & 1);
            iteration < prevIteration && (rewinding = !rewinding);
            prevTime = rewinding ? 0 : dur;
            this._lock = 1;
            this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
            this._tTime = tTime;
            !suppressEvents && this.parent && _callback(this, "onRepeat");
            this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);
            if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
              return this;
            }
            dur = this._dur;
            tDur = this._tDur;
            if (doesWrap) {
              this._lock = 2;
              prevTime = rewinding ? dur : -1e-4;
              this.render(prevTime, true);
              this.vars.repeatRefresh && !isYoyo && this.invalidate();
            }
            this._lock = 0;
            if (!this._ts && !prevPaused) {
              return this;
            }
            _propagateYoyoEase(this, isYoyo);
          }
        }
        if (this._hasPause && !this._forcing && this._lock < 2) {
          pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));
          if (pauseTween) {
            tTime -= time - (time = pauseTween._start);
          }
        }
        this._tTime = tTime;
        this._time = time;
        this._act = !timeScale;
        if (!this._initted) {
          this._onUpdate = this.vars.onUpdate;
          this._initted = 1;
          this._zTime = totalTime;
          prevTime = 0;
        }
        if (!prevTime && time && !suppressEvents) {
          _callback(this, "onStart");
          if (this._tTime !== tTime) {
            return this;
          }
        }
        if (time >= prevTime && totalTime >= 0) {
          child = this._first;
          while (child) {
            next = child._next;
            if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                return this.render(totalTime, suppressEvents, force);
              }
              child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);
              if (time !== this._time || !this._ts && !prevPaused) {
                pauseTween = 0;
                next && (tTime += this._zTime = -_tinyNum);
                break;
              }
            }
            child = next;
          }
        } else {
          child = this._last;
          var adjustedTime = totalTime < 0 ? totalTime : time;
          while (child) {
            next = child._prev;
            if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                return this.render(totalTime, suppressEvents, force);
              }
              child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force);
              if (time !== this._time || !this._ts && !prevPaused) {
                pauseTween = 0;
                next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum);
                break;
              }
            }
            child = next;
          }
        }
        if (pauseTween && !suppressEvents) {
          this.pause();
          pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;
          if (this._ts) {
            this._start = prevStart;
            _setEnd(this);
            return this.render(totalTime, suppressEvents, force);
          }
        }
        this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
        if (tTime === tDur && tDur >= this.totalDuration() || !tTime && prevTime) {
          if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) {
            if (!this._lock) {
              (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
              if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
                _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);
                this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
              }
            }
          }
        }
      }
      return this;
    };
    _proto2.add = function add(child, position) {
      var _this2 = this;
      _isNumber(position) || (position = _parsePosition(this, position, child));
      if (!(child instanceof Animation)) {
        if (_isArray(child)) {
          child.forEach(function(obj) {
            return _this2.add(obj, position);
          });
          return this;
        }
        if (_isString(child)) {
          return this.addLabel(child, position);
        }
        if (_isFunction(child)) {
          child = Tween.delayedCall(0, child);
        } else {
          return this;
        }
      }
      return this !== child ? _addToTimeline(this, child, position) : this;
    };
    _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
      if (nested === void 0) {
        nested = true;
      }
      if (tweens === void 0) {
        tweens = true;
      }
      if (timelines === void 0) {
        timelines = true;
      }
      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = -_bigNum;
      }
      var a = [], child = this._first;
      while (child) {
        if (child._start >= ignoreBeforeTime) {
          if (child instanceof Tween) {
            tweens && a.push(child);
          } else {
            timelines && a.push(child);
            nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
          }
        }
        child = child._next;
      }
      return a;
    };
    _proto2.getById = function getById2(id) {
      var animations = this.getChildren(1, 1, 1), i = animations.length;
      while (i--) {
        if (animations[i].vars.id === id) {
          return animations[i];
        }
      }
    };
    _proto2.remove = function remove(child) {
      if (_isString(child)) {
        return this.removeLabel(child);
      }
      if (_isFunction(child)) {
        return this.killTweensOf(child);
      }
      _removeLinkedListItem(this, child);
      if (child === this._recent) {
        this._recent = this._last;
      }
      return _uncache(this);
    };
    _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
      if (!arguments.length) {
        return this._tTime;
      }
      this._forcing = 1;
      if (!this._dp && this._ts) {
        this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
      }
      _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);
      this._forcing = 0;
      return this;
    };
    _proto2.addLabel = function addLabel(label, position) {
      this.labels[label] = _parsePosition(this, position);
      return this;
    };
    _proto2.removeLabel = function removeLabel(label) {
      delete this.labels[label];
      return this;
    };
    _proto2.addPause = function addPause(position, callback, params) {
      var t = Tween.delayedCall(0, callback || _emptyFunc, params);
      t.data = "isPause";
      this._hasPause = 1;
      return _addToTimeline(this, t, _parsePosition(this, position));
    };
    _proto2.removePause = function removePause(position) {
      var child = this._first;
      position = _parsePosition(this, position);
      while (child) {
        if (child._start === position && child.data === "isPause") {
          _removeFromParent(child);
        }
        child = child._next;
      }
    };
    _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      var tweens = this.getTweensOf(targets, onlyActive), i = tweens.length;
      while (i--) {
        _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
      }
      return this;
    };
    _proto2.getTweensOf = function getTweensOf2(targets, onlyActive) {
      var a = [], parsedTargets = toArray(targets), child = this._first, isGlobalTime = _isNumber(onlyActive), children;
      while (child) {
        if (child instanceof Tween) {
          if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
            a.push(child);
          }
        } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
          a.push.apply(a, children);
        }
        child = child._next;
      }
      return a;
    };
    _proto2.tweenTo = function tweenTo(position, vars) {
      vars = vars || {};
      var tl = this, endTime = _parsePosition(tl, position), _vars = vars, startAt = _vars.startAt, _onStart = _vars.onStart, onStartParams = _vars.onStartParams, immediateRender = _vars.immediateRender, initted, tween = Tween.to(tl, _setDefaults({
        ease: vars.ease || "none",
        lazy: false,
        immediateRender: false,
        time: endTime,
        overwrite: "auto",
        duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
        onStart: function onStart() {
          tl.pause();
          if (!initted) {
            var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
            tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
            initted = 1;
          }
          _onStart && _onStart.apply(tween, onStartParams || []);
        }
      }, vars));
      return immediateRender ? tween.render(0) : tween;
    };
    _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
      return this.tweenTo(toPosition, _setDefaults({
        startAt: {
          time: _parsePosition(this, fromPosition)
        }
      }, vars));
    };
    _proto2.recent = function recent() {
      return this._recent;
    };
    _proto2.nextLabel = function nextLabel(afterTime) {
      if (afterTime === void 0) {
        afterTime = this._time;
      }
      return _getLabelInDirection(this, _parsePosition(this, afterTime));
    };
    _proto2.previousLabel = function previousLabel(beforeTime) {
      if (beforeTime === void 0) {
        beforeTime = this._time;
      }
      return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
    };
    _proto2.currentLabel = function currentLabel(value) {
      return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
    };
    _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = 0;
      }
      var child = this._first, labels = this.labels, p;
      while (child) {
        if (child._start >= ignoreBeforeTime) {
          child._start += amount;
          child._end += amount;
        }
        child = child._next;
      }
      if (adjustLabels) {
        for (p in labels) {
          if (labels[p] >= ignoreBeforeTime) {
            labels[p] += amount;
          }
        }
      }
      return _uncache(this);
    };
    _proto2.invalidate = function invalidate() {
      var child = this._first;
      this._lock = 0;
      while (child) {
        child.invalidate();
        child = child._next;
      }
      return _Animation.prototype.invalidate.call(this);
    };
    _proto2.clear = function clear(includeLabels) {
      if (includeLabels === void 0) {
        includeLabels = true;
      }
      var child = this._first, next;
      while (child) {
        next = child._next;
        this.remove(child);
        child = next;
      }
      this._dp && (this._time = this._tTime = this._pTime = 0);
      includeLabels && (this.labels = {});
      return _uncache(this);
    };
    _proto2.totalDuration = function totalDuration(value) {
      var max = 0, self2 = this, child = self2._last, prevStart = _bigNum, prev, start, parent;
      if (arguments.length) {
        return self2.timeScale((self2._repeat < 0 ? self2.duration() : self2.totalDuration()) / (self2.reversed() ? -value : value));
      }
      if (self2._dirty) {
        parent = self2.parent;
        while (child) {
          prev = child._prev;
          child._dirty && child.totalDuration();
          start = child._start;
          if (start > prevStart && self2._sort && child._ts && !self2._lock) {
            self2._lock = 1;
            _addToTimeline(self2, child, start - child._delay, 1)._lock = 0;
          } else {
            prevStart = start;
          }
          if (start < 0 && child._ts) {
            max -= start;
            if (!parent && !self2._dp || parent && parent.smoothChildTiming) {
              self2._start += start / self2._ts;
              self2._time -= start;
              self2._tTime -= start;
            }
            self2.shiftChildren(-start, false, -Infinity);
            prevStart = 0;
          }
          child._end > max && child._ts && (max = child._end);
          child = prev;
        }
        _setDuration(self2, self2 === _globalTimeline && self2._time > max ? self2._time : max, 1, 1);
        self2._dirty = 0;
      }
      return self2._tDur;
    };
    Timeline2.updateRoot = function updateRoot(time) {
      if (_globalTimeline._ts) {
        _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));
        _lastRenderedFrame = _ticker.frame;
      }
      if (_ticker.frame >= _nextGCFrame) {
        _nextGCFrame += _config.autoSleep || 120;
        var child = _globalTimeline._first;
        if (!child || !child._ts) {
          if (_config.autoSleep && _ticker._listeners.length < 2) {
            while (child && !child._ts) {
              child = child._next;
            }
            child || _ticker.sleep();
          }
        }
      }
    };
    return Timeline2;
  }(Animation);
  _setDefaults(Timeline.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
  });
  var _addComplexStringPropTween = function _addComplexStringPropTween2(target, prop, start, end, setter, stringFilter, funcParam) {
    var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter), index = 0, matchIndex = 0, result, startNums, color, endNum, chunk, startNum, hasRandom, a;
    pt.b = start;
    pt.e = end;
    start += "";
    end += "";
    if (hasRandom = ~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }
    if (stringFilter) {
      a = [start, end];
      stringFilter(a, target, prop);
      start = a[0];
      end = a[1];
    }
    startNums = start.match(_complexStringNumExp) || [];
    while (result = _complexStringNumExp.exec(end)) {
      endNum = result[0];
      chunk = end.substring(index, result.index);
      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(") {
        color = 1;
      }
      if (endNum !== startNums[matchIndex++]) {
        startNum = parseFloat(startNums[matchIndex - 1]) || 0;
        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          s: startNum,
          c: endNum.charAt(1) === "=" ? parseFloat(endNum.substr(2)) * (endNum.charAt(0) === "-" ? -1 : 1) : parseFloat(endNum) - startNum,
          m: color && color < 4 ? Math.round : 0
        };
        index = _complexStringNumExp.lastIndex;
      }
    }
    pt.c = index < end.length ? end.substring(index, end.length) : "";
    pt.fp = funcParam;
    if (_relExp.test(end) || hasRandom) {
      pt.e = 0;
    }
    this._pt = pt;
    return pt;
  };
  var _addPropTween = function _addPropTween2(target, prop, start, end, index, targets, modifier, stringFilter, funcParam) {
    _isFunction(end) && (end = end(index || 0, target, targets));
    var currentValue = target[prop], parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](), setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc, pt;
    if (_isString(end)) {
      if (~end.indexOf("random(")) {
        end = _replaceRandom(end);
      }
      if (end.charAt(1) === "=") {
        pt = parseFloat(parsedStart) + parseFloat(end.substr(2)) * (end.charAt(0) === "-" ? -1 : 1) + (getUnit(parsedStart) || 0);
        if (pt || pt === 0) {
          end = pt;
        }
      }
    }
    if (parsedStart !== end) {
      if (!isNaN(parsedStart * end) && end !== "") {
        pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
        funcParam && (pt.fp = funcParam);
        modifier && pt.modifier(modifier, this, target);
        return this._pt = pt;
      }
      !currentValue && !(prop in target) && _missingPlugin(prop, end);
      return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
    }
  };
  var _processVars = function _processVars2(vars, index, target, targets, tween) {
    _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));
    if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
      return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
    }
    var copy = {}, p;
    for (p in vars) {
      copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
    }
    return copy;
  };
  var _checkPlugin = function _checkPlugin2(property, vars, tween, index, target, targets) {
    var plugin, pt, ptLookup, i;
    if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
      tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);
      if (tween !== _quickTween) {
        ptLookup = tween._ptLookup[tween._targets.indexOf(target)];
        i = plugin._props.length;
        while (i--) {
          ptLookup[plugin._props[i]] = pt;
        }
      }
    }
    return plugin;
  };
  var _overwritingTween;
  var _initTween = function _initTween2(tween, time) {
    var vars = tween.vars, ease = vars.ease, startAt = vars.startAt, immediateRender = vars.immediateRender, lazy = vars.lazy, onUpdate = vars.onUpdate, onUpdateParams = vars.onUpdateParams, callbackScope = vars.callbackScope, runBackwards = vars.runBackwards, yoyoEase = vars.yoyoEase, keyframes = vars.keyframes, autoRevert = vars.autoRevert, dur = tween._dur, prevStartAt = tween._startAt, targets = tween._targets, parent = tween.parent, fullTargets = parent && parent.data === "nested" ? parent.parent._targets : targets, autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites, tl = tween.timeline, cleanVars, i, p, pt, target, hasPriority, gsData, harness, plugin, ptLookup, index, harnessVars, overwritten;
    tl && (!keyframes || !ease) && (ease = "none");
    tween._ease = _parseEase(ease, _defaults.ease);
    tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;
    if (yoyoEase && tween._yoyo && !tween._repeat) {
      yoyoEase = tween._yEase;
      tween._yEase = tween._ease;
      tween._ease = yoyoEase;
    }
    tween._from = !tl && !!vars.runBackwards;
    if (!tl) {
      harness = targets[0] ? _getCache(targets[0]).harness : 0;
      harnessVars = harness && vars[harness.prop];
      cleanVars = _copyExcluding(vars, _reservedProps);
      prevStartAt && prevStartAt.render(-1, true).kill();
      if (startAt) {
        _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
          data: "isStart",
          overwrite: false,
          parent,
          immediateRender: true,
          lazy: _isNotFalse(lazy),
          startAt: null,
          delay: 0,
          onUpdate,
          onUpdateParams,
          callbackScope,
          stagger: 0
        }, startAt)));
        time < 0 && !immediateRender && !autoRevert && tween._startAt.render(-1, true);
        if (immediateRender) {
          time > 0 && !autoRevert && (tween._startAt = 0);
          if (dur && time <= 0) {
            time && (tween._zTime = time);
            return;
          }
        } else if (autoRevert === false) {
          tween._startAt = 0;
        }
      } else if (runBackwards && dur) {
        if (prevStartAt) {
          !autoRevert && (tween._startAt = 0);
        } else {
          time && (immediateRender = false);
          p = _setDefaults({
            overwrite: false,
            data: "isFromStart",
            lazy: immediateRender && _isNotFalse(lazy),
            immediateRender,
            stagger: 0,
            parent
          }, cleanVars);
          harnessVars && (p[harness.prop] = harnessVars);
          _removeFromParent(tween._startAt = Tween.set(targets, p));
          time < 0 && tween._startAt.render(-1, true);
          if (!immediateRender) {
            _initTween2(tween._startAt, _tinyNum);
          } else if (!time) {
            return;
          }
        }
      }
      tween._pt = 0;
      lazy = dur && _isNotFalse(lazy) || lazy && !dur;
      for (i = 0; i < targets.length; i++) {
        target = targets[i];
        gsData = target._gsap || _harness(targets)[i]._gsap;
        tween._ptLookup[i] = ptLookup = {};
        _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender();
        index = fullTargets === targets ? i : fullTargets.indexOf(target);
        if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
          tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);
          plugin._props.forEach(function(name) {
            ptLookup[name] = pt;
          });
          plugin.priority && (hasPriority = 1);
        }
        if (!harness || harnessVars) {
          for (p in cleanVars) {
            if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
              plugin.priority && (hasPriority = 1);
            } else {
              ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
            }
          }
        }
        tween._op && tween._op[i] && tween.kill(target, tween._op[i]);
        if (autoOverwrite && tween._pt) {
          _overwritingTween = tween;
          _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time));
          overwritten = !tween.parent;
          _overwritingTween = 0;
        }
        tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
      }
      hasPriority && _sortPropTweensByPriority(tween);
      tween._onInit && tween._onInit(tween);
    }
    tween._onUpdate = onUpdate;
    tween._initted = (!tween._op || tween._pt) && !overwritten;
  };
  var _addAliasesToVars = function _addAliasesToVars2(targets, vars) {
    var harness = targets[0] ? _getCache(targets[0]).harness : 0, propertyAliases = harness && harness.aliases, copy, p, i, aliases;
    if (!propertyAliases) {
      return vars;
    }
    copy = _merge({}, vars);
    for (p in propertyAliases) {
      if (p in copy) {
        aliases = propertyAliases[p].split(",");
        i = aliases.length;
        while (i--) {
          copy[aliases[i]] = copy[p];
        }
      }
    }
    return copy;
  };
  var _parseFuncOrString = function _parseFuncOrString2(value, tween, i, target, targets) {
    return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
  };
  var _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase";
  var _staggerPropsToSkip = (_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger").split(",");
  var Tween = /* @__PURE__ */ function(_Animation2) {
    _inheritsLoose(Tween2, _Animation2);
    function Tween2(targets, vars, position, skipInherit) {
      var _this3;
      if (typeof vars === "number") {
        position.duration = vars;
        vars = position;
        position = null;
      }
      _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
      var _this3$vars = _this3.vars, duration = _this3$vars.duration, delay = _this3$vars.delay, immediateRender = _this3$vars.immediateRender, stagger = _this3$vars.stagger, overwrite = _this3$vars.overwrite, keyframes = _this3$vars.keyframes, defaults3 = _this3$vars.defaults, scrollTrigger = _this3$vars.scrollTrigger, yoyoEase = _this3$vars.yoyoEase, parent = vars.parent || _globalTimeline, parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets), tl, i, copy, l, p, curTarget, staggerFunc, staggerVarsToMerge;
      _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
      _this3._ptLookup = [];
      _this3._overwrite = overwrite;
      if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        vars = _this3.vars;
        tl = _this3.timeline = new Timeline({
          data: "nested",
          defaults: defaults3 || {}
        });
        tl.kill();
        tl.parent = tl._dp = _assertThisInitialized2(_this3);
        tl._start = 0;
        if (keyframes) {
          _inheritDefaults(_setDefaults(tl.vars.defaults, {
            ease: "none"
          }));
          stagger ? parsedTargets.forEach(function(t, i2) {
            return keyframes.forEach(function(frame, j) {
              return tl.to(t, frame, j ? ">" : i2 * stagger);
            });
          }) : keyframes.forEach(function(frame) {
            return tl.to(parsedTargets, frame, ">");
          });
        } else {
          l = parsedTargets.length;
          staggerFunc = stagger ? distribute(stagger) : _emptyFunc;
          if (_isObject(stagger)) {
            for (p in stagger) {
              if (~_staggerTweenProps.indexOf(p)) {
                staggerVarsToMerge || (staggerVarsToMerge = {});
                staggerVarsToMerge[p] = stagger[p];
              }
            }
          }
          for (i = 0; i < l; i++) {
            copy = {};
            for (p in vars) {
              if (_staggerPropsToSkip.indexOf(p) < 0) {
                copy[p] = vars[p];
              }
            }
            copy.stagger = 0;
            yoyoEase && (copy.yoyoEase = yoyoEase);
            staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
            curTarget = parsedTargets[i];
            copy.duration = +_parseFuncOrString(duration, _assertThisInitialized2(_this3), i, curTarget, parsedTargets);
            copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized2(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;
            if (!stagger && l === 1 && copy.delay) {
              _this3._delay = delay = copy.delay;
              _this3._start += delay;
              copy.delay = 0;
            }
            tl.to(curTarget, copy, staggerFunc(i, curTarget, parsedTargets));
          }
          tl.duration() ? duration = delay = 0 : _this3.timeline = 0;
        }
        duration || _this3.duration(duration = tl.duration());
      } else {
        _this3.timeline = 0;
      }
      if (overwrite === true && !_suppressOverwrites) {
        _overwritingTween = _assertThisInitialized2(_this3);
        _globalTimeline.killTweensOf(parsedTargets);
        _overwritingTween = 0;
      }
      _addToTimeline(parent, _assertThisInitialized2(_this3), position);
      vars.reversed && _this3.reverse();
      vars.paused && _this3.paused(true);
      if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized2(_this3)) && parent.data !== "nested") {
        _this3._tTime = -_tinyNum;
        _this3.render(Math.max(0, -delay));
      }
      scrollTrigger && _scrollTrigger(_assertThisInitialized2(_this3), scrollTrigger);
      return _this3;
    }
    var _proto3 = Tween2.prototype;
    _proto3.render = function render(totalTime, suppressEvents, force) {
      var prevTime = this._time, tDur = this._tDur, dur = this._dur, tTime = totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime, time, pt, iteration, cycleDuration, prevIteration, isYoyo, ratio, timeline2, yoyoEase;
      if (!dur) {
        _renderZeroDurationTween(this, totalTime, suppressEvents, force);
      } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== totalTime < 0) {
        time = tTime;
        timeline2 = this.timeline;
        if (this._repeat) {
          cycleDuration = dur + this._rDelay;
          if (this._repeat < -1 && totalTime < 0) {
            return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
          }
          time = _roundPrecise(tTime % cycleDuration);
          if (tTime === tDur) {
            iteration = this._repeat;
            time = dur;
          } else {
            iteration = ~~(tTime / cycleDuration);
            if (iteration && iteration === tTime / cycleDuration) {
              time = dur;
              iteration--;
            }
            time > dur && (time = dur);
          }
          isYoyo = this._yoyo && iteration & 1;
          if (isYoyo) {
            yoyoEase = this._yEase;
            time = dur - time;
          }
          prevIteration = _animationCycle(this._tTime, cycleDuration);
          if (time === prevTime && !force && this._initted) {
            return this;
          }
          if (iteration !== prevIteration) {
            timeline2 && this._yEase && _propagateYoyoEase(timeline2, isYoyo);
            if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
              this._lock = force = 1;
              this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
            }
          }
        }
        if (!this._initted) {
          if (_attemptInitTween(this, totalTime < 0 ? totalTime : time, force, suppressEvents)) {
            this._tTime = 0;
            return this;
          }
          if (dur !== this._dur) {
            return this.render(totalTime, suppressEvents, force);
          }
        }
        this._tTime = tTime;
        this._time = time;
        if (!this._act && this._ts) {
          this._act = 1;
          this._lazy = 0;
        }
        this.ratio = ratio = (yoyoEase || this._ease)(time / dur);
        if (this._from) {
          this.ratio = ratio = 1 - ratio;
        }
        if (time && !prevTime && !suppressEvents) {
          _callback(this, "onStart");
          if (this._tTime !== tTime) {
            return this;
          }
        }
        pt = this._pt;
        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }
        timeline2 && timeline2.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline2._dur * ratio, suppressEvents, force) || this._startAt && (this._zTime = totalTime);
        if (this._onUpdate && !suppressEvents) {
          totalTime < 0 && this._startAt && this._startAt.render(totalTime, true, force);
          _callback(this, "onUpdate");
        }
        this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");
        if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
          totalTime < 0 && this._startAt && !this._onUpdate && this._startAt.render(totalTime, true, true);
          (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
          if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
            _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);
            this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
          }
        }
      }
      return this;
    };
    _proto3.targets = function targets() {
      return this._targets;
    };
    _proto3.invalidate = function invalidate() {
      this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0;
      this._ptLookup = [];
      this.timeline && this.timeline.invalidate();
      return _Animation2.prototype.invalidate.call(this);
    };
    _proto3.kill = function kill(targets, vars) {
      if (vars === void 0) {
        vars = "all";
      }
      if (!targets && (!vars || vars === "all")) {
        this._lazy = this._pt = 0;
        return this.parent ? _interrupt(this) : this;
      }
      if (this.timeline) {
        var tDur = this.timeline.totalDuration();
        this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this);
        this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1);
        return this;
      }
      var parsedTargets = this._targets, killingTargets = targets ? toArray(targets) : parsedTargets, propTweenLookup = this._ptLookup, firstPT = this._pt, overwrittenProps, curLookup, curOverwriteProps, props, p, pt, i;
      if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
        vars === "all" && (this._pt = 0);
        return _interrupt(this);
      }
      overwrittenProps = this._op = this._op || [];
      if (vars !== "all") {
        if (_isString(vars)) {
          p = {};
          _forEachName(vars, function(name) {
            return p[name] = 1;
          });
          vars = p;
        }
        vars = _addAliasesToVars(parsedTargets, vars);
      }
      i = parsedTargets.length;
      while (i--) {
        if (~killingTargets.indexOf(parsedTargets[i])) {
          curLookup = propTweenLookup[i];
          if (vars === "all") {
            overwrittenProps[i] = vars;
            props = curLookup;
            curOverwriteProps = {};
          } else {
            curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
            props = vars;
          }
          for (p in props) {
            pt = curLookup && curLookup[p];
            if (pt) {
              if (!("kill" in pt.d) || pt.d.kill(p) === true) {
                _removeLinkedListItem(this, pt, "_pt");
              }
              delete curLookup[p];
            }
            if (curOverwriteProps !== "all") {
              curOverwriteProps[p] = 1;
            }
          }
        }
      }
      this._initted && !this._pt && firstPT && _interrupt(this);
      return this;
    };
    Tween2.to = function to(targets, vars) {
      return new Tween2(targets, vars, arguments[2]);
    };
    Tween2.from = function from(targets, vars) {
      return _createTweenType(1, arguments);
    };
    Tween2.delayedCall = function delayedCall(delay, callback, params, scope) {
      return new Tween2(callback, 0, {
        immediateRender: false,
        lazy: false,
        overwrite: false,
        delay,
        onComplete: callback,
        onReverseComplete: callback,
        onCompleteParams: params,
        onReverseCompleteParams: params,
        callbackScope: scope
      });
    };
    Tween2.fromTo = function fromTo(targets, fromVars, toVars) {
      return _createTweenType(2, arguments);
    };
    Tween2.set = function set(targets, vars) {
      vars.duration = 0;
      vars.repeatDelay || (vars.repeat = 0);
      return new Tween2(targets, vars);
    };
    Tween2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      return _globalTimeline.killTweensOf(targets, props, onlyActive);
    };
    return Tween2;
  }(Animation);
  _setDefaults(Tween.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
  });
  _forEachName("staggerTo,staggerFrom,staggerFromTo", function(name) {
    Tween[name] = function() {
      var tl = new Timeline(), params = _slice.call(arguments, 0);
      params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
      return tl[name].apply(tl, params);
    };
  });
  var _setterPlain = function _setterPlain2(target, property, value) {
    return target[property] = value;
  };
  var _setterFunc = function _setterFunc2(target, property, value) {
    return target[property](value);
  };
  var _setterFuncWithParam = function _setterFuncWithParam2(target, property, value, data) {
    return target[property](data.fp, value);
  };
  var _setterAttribute = function _setterAttribute2(target, property, value) {
    return target.setAttribute(property, value);
  };
  var _getSetter = function _getSetter2(target, property) {
    return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
  };
  var _renderPlain = function _renderPlain2(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e6) / 1e6, data);
  };
  var _renderBoolean = function _renderBoolean2(ratio, data) {
    return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
  };
  var _renderComplexString = function _renderComplexString2(ratio, data) {
    var pt = data._pt, s = "";
    if (!ratio && data.b) {
      s = data.b;
    } else if (ratio === 1 && data.e) {
      s = data.e;
    } else {
      while (pt) {
        s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 1e4) / 1e4) + s;
        pt = pt._next;
      }
      s += data.c;
    }
    data.set(data.t, data.p, s, data);
  };
  var _renderPropTweens = function _renderPropTweens2(ratio, data) {
    var pt = data._pt;
    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }
  };
  var _addPluginModifier = function _addPluginModifier2(modifier, tween, target, property) {
    var pt = this._pt, next;
    while (pt) {
      next = pt._next;
      pt.p === property && pt.modifier(modifier, tween, target);
      pt = next;
    }
  };
  var _killPropTweensOf = function _killPropTweensOf2(property) {
    var pt = this._pt, hasNonDependentRemaining, next;
    while (pt) {
      next = pt._next;
      if (pt.p === property && !pt.op || pt.op === property) {
        _removeLinkedListItem(this, pt, "_pt");
      } else if (!pt.dep) {
        hasNonDependentRemaining = 1;
      }
      pt = next;
    }
    return !hasNonDependentRemaining;
  };
  var _setterWithModifier = function _setterWithModifier2(target, property, value, data) {
    data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
  };
  var _sortPropTweensByPriority = function _sortPropTweensByPriority2(parent) {
    var pt = parent._pt, next, pt2, first, last;
    while (pt) {
      next = pt._next;
      pt2 = first;
      while (pt2 && pt2.pr > pt.pr) {
        pt2 = pt2._next;
      }
      if (pt._prev = pt2 ? pt2._prev : last) {
        pt._prev._next = pt;
      } else {
        first = pt;
      }
      if (pt._next = pt2) {
        pt2._prev = pt;
      } else {
        last = pt;
      }
      pt = next;
    }
    parent._pt = first;
  };
  var PropTween = /* @__PURE__ */ function() {
    function PropTween2(next, target, prop, start, change, renderer, data, setter, priority) {
      this.t = target;
      this.s = start;
      this.c = change;
      this.p = prop;
      this.r = renderer || _renderPlain;
      this.d = data || this;
      this.set = setter || _setterPlain;
      this.pr = priority || 0;
      this._next = next;
      if (next) {
        next._prev = this;
      }
    }
    var _proto4 = PropTween2.prototype;
    _proto4.modifier = function modifier(func, tween, target) {
      this.mSet = this.mSet || this.set;
      this.set = _setterWithModifier;
      this.m = func;
      this.mt = target;
      this.tween = tween;
    };
    return PropTween2;
  }();
  _forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(name) {
    return _reservedProps[name] = 1;
  });
  _globals.TweenMax = _globals.TweenLite = Tween;
  _globals.TimelineLite = _globals.TimelineMax = Timeline;
  _globalTimeline = new Timeline({
    sortChildren: false,
    defaults: _defaults,
    autoRemoveChildren: true,
    id: "root",
    smoothChildTiming: true
  });
  _config.stringFilter = _colorStringFilter;
  var _gsap = {
    registerPlugin: function registerPlugin() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      args.forEach(function(config3) {
        return _createPlugin(config3);
      });
    },
    timeline: function timeline(vars) {
      return new Timeline(vars);
    },
    getTweensOf: function getTweensOf(targets, onlyActive) {
      return _globalTimeline.getTweensOf(targets, onlyActive);
    },
    getProperty: function getProperty(target, property, unit, uncache) {
      _isString(target) && (target = toArray(target)[0]);
      var getter = _getCache(target || {}).get, format = unit ? _passThrough : _numericIfPossible;
      unit === "native" && (unit = "");
      return !target ? target : !property ? function(property2, unit2, uncache2) {
        return format((_plugins[property2] && _plugins[property2].get || getter)(target, property2, unit2, uncache2));
      } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    },
    quickSetter: function quickSetter(target, property, unit) {
      target = toArray(target);
      if (target.length > 1) {
        var setters = target.map(function(t) {
          return gsap2.quickSetter(t, property, unit);
        }), l = setters.length;
        return function(value) {
          var i = l;
          while (i--) {
            setters[i](value);
          }
        };
      }
      target = target[0] || {};
      var Plugin = _plugins[property], cache = _getCache(target), p = cache.harness && (cache.harness.aliases || {})[property] || property, setter = Plugin ? function(value) {
        var p2 = new Plugin();
        _quickTween._pt = 0;
        p2.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
        p2.render(1, p2);
        _quickTween._pt && _renderPropTweens(1, _quickTween);
      } : cache.set(target, p);
      return Plugin ? setter : function(value) {
        return setter(target, p, unit ? value + unit : value, cache, 1);
      };
    },
    isTweening: function isTweening(targets) {
      return _globalTimeline.getTweensOf(targets, true).length > 0;
    },
    defaults: function defaults2(value) {
      value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
      return _mergeDeep(_defaults, value || {});
    },
    config: function config2(value) {
      return _mergeDeep(_config, value || {});
    },
    registerEffect: function registerEffect(_ref3) {
      var name = _ref3.name, effect = _ref3.effect, plugins = _ref3.plugins, defaults3 = _ref3.defaults, extendTimeline = _ref3.extendTimeline;
      (plugins || "").split(",").forEach(function(pluginName) {
        return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
      });
      _effects[name] = function(targets, vars, tl) {
        return effect(toArray(targets), _setDefaults(vars || {}, defaults3), tl);
      };
      if (extendTimeline) {
        Timeline.prototype[name] = function(targets, vars, position) {
          return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
        };
      }
    },
    registerEase: function registerEase(name, ease) {
      _easeMap[name] = _parseEase(ease);
    },
    parseEase: function parseEase(ease, defaultEase) {
      return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
    },
    getById: function getById(id) {
      return _globalTimeline.getById(id);
    },
    exportRoot: function exportRoot(vars, includeDelayedCalls) {
      if (vars === void 0) {
        vars = {};
      }
      var tl = new Timeline(vars), child, next;
      tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);
      _globalTimeline.remove(tl);
      tl._dp = 0;
      tl._time = tl._tTime = _globalTimeline._time;
      child = _globalTimeline._first;
      while (child) {
        next = child._next;
        if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
          _addToTimeline(tl, child, child._start - child._delay);
        }
        child = next;
      }
      _addToTimeline(_globalTimeline, tl, 0);
      return tl;
    },
    utils: {
      wrap,
      wrapYoyo,
      distribute,
      random,
      snap,
      normalize,
      getUnit,
      clamp,
      splitColor,
      toArray,
      selector,
      mapRange,
      pipe,
      unitize,
      interpolate,
      shuffle
    },
    install: _install,
    effects: _effects,
    ticker: _ticker,
    updateRoot: Timeline.updateRoot,
    plugins: _plugins,
    globalTimeline: _globalTimeline,
    core: {
      PropTween,
      globals: _addGlobal,
      Tween,
      Timeline,
      Animation,
      getCache: _getCache,
      _removeLinkedListItem,
      suppressOverwrites: function suppressOverwrites(value) {
        return _suppressOverwrites = value;
      }
    }
  };
  _forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function(name) {
    return _gsap[name] = Tween[name];
  });
  _ticker.add(Timeline.updateRoot);
  _quickTween = _gsap.to({}, {
    duration: 0
  });
  var _getPluginPropTween = function _getPluginPropTween2(plugin, prop) {
    var pt = plugin._pt;
    while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
      pt = pt._next;
    }
    return pt;
  };
  var _addModifiers = function _addModifiers2(tween, modifiers) {
    var targets = tween._targets, p, i, pt;
    for (p in modifiers) {
      i = targets.length;
      while (i--) {
        pt = tween._ptLookup[i][p];
        if (pt && (pt = pt.d)) {
          if (pt._pt) {
            pt = _getPluginPropTween(pt, p);
          }
          pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
        }
      }
    }
  };
  var _buildModifierPlugin = function _buildModifierPlugin2(name, modifier) {
    return {
      name,
      rawVars: 1,
      init: function init5(target, vars, tween) {
        tween._onInit = function(tween2) {
          var temp, p;
          if (_isString(vars)) {
            temp = {};
            _forEachName(vars, function(name2) {
              return temp[name2] = 1;
            });
            vars = temp;
          }
          if (modifier) {
            temp = {};
            for (p in vars) {
              temp[p] = modifier(vars[p]);
            }
            vars = temp;
          }
          _addModifiers(tween2, vars);
        };
      }
    };
  };
  var gsap2 = _gsap.registerPlugin({
    name: "attr",
    init: function init(target, vars, tween, index, targets) {
      var p, pt;
      for (p in vars) {
        pt = this.add(target, "setAttribute", (target.getAttribute(p) || 0) + "", vars[p], index, targets, 0, 0, p);
        pt && (pt.op = p);
        this._props.push(p);
      }
    }
  }, {
    name: "endArray",
    init: function init2(target, value) {
      var i = value.length;
      while (i--) {
        this.add(target, i, target[i] || 0, value[i]);
      }
    }
  }, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap;
  Tween.version = Timeline.version = gsap2.version = "3.8.0";
  _coreReady = 1;
  _windowExists() && _wake();
  var Power0 = _easeMap.Power0;
  var Power1 = _easeMap.Power1;
  var Power2 = _easeMap.Power2;
  var Power3 = _easeMap.Power3;
  var Power4 = _easeMap.Power4;
  var Linear = _easeMap.Linear;
  var Quad = _easeMap.Quad;
  var Cubic = _easeMap.Cubic;
  var Quart = _easeMap.Quart;
  var Quint = _easeMap.Quint;
  var Strong = _easeMap.Strong;
  var Elastic = _easeMap.Elastic;
  var Back = _easeMap.Back;
  var SteppedEase = _easeMap.SteppedEase;
  var Bounce = _easeMap.Bounce;
  var Sine = _easeMap.Sine;
  var Expo = _easeMap.Expo;
  var Circ = _easeMap.Circ;

  // node_modules/gsap/CSSPlugin.js
  var _win2;
  var _doc2;
  var _docElement;
  var _pluginInitted;
  var _tempDiv;
  var _tempDivStyler;
  var _recentSetterPlugin;
  var _windowExists3 = function _windowExists4() {
    return typeof window !== "undefined";
  };
  var _transformProps = {};
  var _RAD2DEG = 180 / Math.PI;
  var _DEG2RAD = Math.PI / 180;
  var _atan2 = Math.atan2;
  var _bigNum2 = 1e8;
  var _capsExp = /([A-Z])/g;
  var _horizontalExp = /(?:left|right|width|margin|padding|x)/i;
  var _complexExp = /[\s,\(]\S/;
  var _propertyAliases = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
  };
  var _renderCSSProp = function _renderCSSProp2(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
  };
  var _renderPropWithEnd = function _renderPropWithEnd2(ratio, data) {
    return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
  };
  var _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning2(ratio, data) {
    return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u : data.b, data);
  };
  var _renderRoundedCSSProp = function _renderRoundedCSSProp2(ratio, data) {
    var value = data.s + data.c * ratio;
    data.set(data.t, data.p, ~~(value + (value < 0 ? -0.5 : 0.5)) + data.u, data);
  };
  var _renderNonTweeningValue = function _renderNonTweeningValue2(ratio, data) {
    return data.set(data.t, data.p, ratio ? data.e : data.b, data);
  };
  var _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd2(ratio, data) {
    return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
  };
  var _setterCSSStyle = function _setterCSSStyle2(target, property, value) {
    return target.style[property] = value;
  };
  var _setterCSSProp = function _setterCSSProp2(target, property, value) {
    return target.style.setProperty(property, value);
  };
  var _setterTransform = function _setterTransform2(target, property, value) {
    return target._gsap[property] = value;
  };
  var _setterScale = function _setterScale2(target, property, value) {
    return target._gsap.scaleX = target._gsap.scaleY = value;
  };
  var _setterScaleWithRender = function _setterScaleWithRender2(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache.scaleX = cache.scaleY = value;
    cache.renderTransform(ratio, cache);
  };
  var _setterTransformWithRender = function _setterTransformWithRender2(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache[property] = value;
    cache.renderTransform(ratio, cache);
  };
  var _transformProp = "transform";
  var _transformOriginProp = _transformProp + "Origin";
  var _supports3D;
  var _createElement = function _createElement2(type, ns) {
    var e = _doc2.createElementNS ? _doc2.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc2.createElement(type);
    return e.style ? e : _doc2.createElement(type);
  };
  var _getComputedProperty = function _getComputedProperty2(target, property, skipPrefixFallback) {
    var cs = getComputedStyle(target);
    return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty2(target, _checkPropPrefix(property) || property, 1) || "";
  };
  var _prefixes = "O,Moz,ms,Ms,Webkit".split(",");
  var _checkPropPrefix = function _checkPropPrefix2(property, element, preferPrefix) {
    var e = element || _tempDiv, s = e.style, i = 5;
    if (property in s && !preferPrefix) {
      return property;
    }
    property = property.charAt(0).toUpperCase() + property.substr(1);
    while (i-- && !(_prefixes[i] + property in s)) {
    }
    return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
  };
  var _initCore = function _initCore2() {
    if (_windowExists3() && window.document) {
      _win2 = window;
      _doc2 = _win2.document;
      _docElement = _doc2.documentElement;
      _tempDiv = _createElement("div") || {
        style: {}
      };
      _tempDivStyler = _createElement("div");
      _transformProp = _checkPropPrefix(_transformProp);
      _transformOriginProp = _transformProp + "Origin";
      _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0";
      _supports3D = !!_checkPropPrefix("perspective");
      _pluginInitted = 1;
    }
  };
  var _getBBoxHack = function _getBBoxHack2(swapIfPossible) {
    var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), oldParent = this.parentNode, oldSibling = this.nextSibling, oldCSS = this.style.cssText, bbox;
    _docElement.appendChild(svg);
    svg.appendChild(this);
    this.style.display = "block";
    if (swapIfPossible) {
      try {
        bbox = this.getBBox();
        this._gsapBBox = this.getBBox;
        this.getBBox = _getBBoxHack2;
      } catch (e) {
      }
    } else if (this._gsapBBox) {
      bbox = this._gsapBBox();
    }
    if (oldParent) {
      if (oldSibling) {
        oldParent.insertBefore(this, oldSibling);
      } else {
        oldParent.appendChild(this);
      }
    }
    _docElement.removeChild(svg);
    this.style.cssText = oldCSS;
    return bbox;
  };
  var _getAttributeFallbacks = function _getAttributeFallbacks2(target, attributesArray) {
    var i = attributesArray.length;
    while (i--) {
      if (target.hasAttribute(attributesArray[i])) {
        return target.getAttribute(attributesArray[i]);
      }
    }
  };
  var _getBBox = function _getBBox2(target) {
    var bounds;
    try {
      bounds = target.getBBox();
    } catch (error) {
      bounds = _getBBoxHack.call(target, true);
    }
    bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true));
    return bounds && !bounds.width && !bounds.x && !bounds.y ? {
      x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
      y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
      width: 0,
      height: 0
    } : bounds;
  };
  var _isSVG = function _isSVG2(e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
  };
  var _removeProperty = function _removeProperty2(target, property) {
    if (property) {
      var style = target.style;
      if (property in _transformProps && property !== _transformOriginProp) {
        property = _transformProp;
      }
      if (style.removeProperty) {
        if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
          property = "-" + property;
        }
        style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
      } else {
        style.removeAttribute(property);
      }
    }
  };
  var _addNonTweeningPT = function _addNonTweeningPT2(plugin, target, property, beginning, end, onlySetAtEnd) {
    var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
    plugin._pt = pt;
    pt.b = beginning;
    pt.e = end;
    plugin._props.push(property);
    return pt;
  };
  var _nonConvertibleUnits = {
    deg: 1,
    rad: 1,
    turn: 1
  };
  var _convertToUnit = function _convertToUnit2(target, property, value, unit) {
    var curValue = parseFloat(value) || 0, curUnit = (value + "").trim().substr((curValue + "").length) || "px", style = _tempDiv.style, horizontal = _horizontalExp.test(property), isRootSVG = target.tagName.toLowerCase() === "svg", measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"), amount = 100, toPixels = unit === "px", toPercent = unit === "%", px, parent, cache, isSVG;
    if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
      return curValue;
    }
    curUnit !== "px" && !toPixels && (curValue = _convertToUnit2(target, property, value, "px"));
    isSVG = target.getCTM && _isSVG(target);
    if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
      px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
      return _round(toPercent ? curValue / px * amount : curValue / 100 * px);
    }
    style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
    parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;
    if (isSVG) {
      parent = (target.ownerSVGElement || {}).parentNode;
    }
    if (!parent || parent === _doc2 || !parent.appendChild) {
      parent = _doc2.body;
    }
    cache = parent._gsap;
    if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time) {
      return _round(curValue / cache.width * amount);
    } else {
      (toPercent || curUnit === "%") && (style.position = _getComputedProperty(target, "position"));
      parent === target && (style.position = "static");
      parent.appendChild(_tempDiv);
      px = _tempDiv[measureProperty];
      parent.removeChild(_tempDiv);
      style.position = "absolute";
      if (horizontal && toPercent) {
        cache = _getCache(parent);
        cache.time = _ticker.time;
        cache.width = parent[measureProperty];
      }
    }
    return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
  };
  var _get2 = function _get3(target, property, unit, uncache) {
    var value;
    _pluginInitted || _initCore();
    if (property in _propertyAliases && property !== "transform") {
      property = _propertyAliases[property];
      if (~property.indexOf(",")) {
        property = property.split(",")[0];
      }
    }
    if (_transformProps[property] && property !== "transform") {
      value = _parseTransform(target, uncache);
      value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
    } else {
      value = target.style[property];
      if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
        value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0);
      }
    }
    return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
  };
  var _tweenComplexCSSString = function _tweenComplexCSSString2(target, prop, start, end) {
    if (!start || start === "none") {
      var p = _checkPropPrefix(prop, target, 1), s = p && _getComputedProperty(target, p, 1);
      if (s && s !== start) {
        prop = p;
        start = s;
      } else if (prop === "borderColor") {
        start = _getComputedProperty(target, "borderTopColor");
      }
    }
    var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString), index = 0, matchIndex = 0, a, result, startValues, startNum, color, startValue, endValue, endNum, chunk, endUnit, startUnit, relative, endValues;
    pt.b = start;
    pt.e = end;
    start += "";
    end += "";
    if (end === "auto") {
      target.style[prop] = end;
      end = _getComputedProperty(target, prop) || end;
      target.style[prop] = start;
    }
    a = [start, end];
    _colorStringFilter(a);
    start = a[0];
    end = a[1];
    startValues = start.match(_numWithUnitExp) || [];
    endValues = end.match(_numWithUnitExp) || [];
    if (endValues.length) {
      while (result = _numWithUnitExp.exec(end)) {
        endValue = result[0];
        chunk = end.substring(index, result.index);
        if (color) {
          color = (color + 1) % 5;
        } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
          color = 1;
        }
        if (endValue !== (startValue = startValues[matchIndex++] || "")) {
          startNum = parseFloat(startValue) || 0;
          startUnit = startValue.substr((startNum + "").length);
          relative = endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;
          if (relative) {
            endValue = endValue.substr(2);
          }
          endNum = parseFloat(endValue);
          endUnit = endValue.substr((endNum + "").length);
          index = _numWithUnitExp.lastIndex - endUnit.length;
          if (!endUnit) {
            endUnit = endUnit || _config.units[prop] || startUnit;
            if (index === end.length) {
              end += endUnit;
              pt.e += endUnit;
            }
          }
          if (startUnit !== endUnit) {
            startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
          }
          pt._pt = {
            _next: pt._pt,
            p: chunk || matchIndex === 1 ? chunk : ",",
            s: startNum,
            c: relative ? relative * endNum : endNum - startNum,
            m: color && color < 4 || prop === "zIndex" ? Math.round : 0
          };
        }
      }
      pt.c = index < end.length ? end.substring(index, end.length) : "";
    } else {
      pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
    }
    _relExp.test(end) && (pt.e = 0);
    this._pt = pt;
    return pt;
  };
  var _keywordToPercent = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
  };
  var _convertKeywordsToPercentages = function _convertKeywordsToPercentages2(value) {
    var split = value.split(" "), x = split[0], y = split[1] || "50%";
    if (x === "top" || x === "bottom" || y === "left" || y === "right") {
      value = x;
      x = y;
      y = value;
    }
    split[0] = _keywordToPercent[x] || x;
    split[1] = _keywordToPercent[y] || y;
    return split.join(" ");
  };
  var _renderClearProps = function _renderClearProps2(ratio, data) {
    if (data.tween && data.tween._time === data.tween._dur) {
      var target = data.t, style = target.style, props = data.u, cache = target._gsap, prop, clearTransforms, i;
      if (props === "all" || props === true) {
        style.cssText = "";
        clearTransforms = 1;
      } else {
        props = props.split(",");
        i = props.length;
        while (--i > -1) {
          prop = props[i];
          if (_transformProps[prop]) {
            clearTransforms = 1;
            prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
          }
          _removeProperty(target, prop);
        }
      }
      if (clearTransforms) {
        _removeProperty(target, _transformProp);
        if (cache) {
          cache.svg && target.removeAttribute("transform");
          _parseTransform(target, 1);
          cache.uncache = 1;
        }
      }
    }
  };
  var _specialProps = {
    clearProps: function clearProps(plugin, target, property, endValue, tween) {
      if (tween.data !== "isFromStart") {
        var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
        pt.u = endValue;
        pt.pr = -10;
        pt.tween = tween;
        plugin._props.push(property);
        return 1;
      }
    }
  };
  var _identity2DMatrix = [1, 0, 0, 1, 0, 0];
  var _rotationalProperties = {};
  var _isNullTransform = function _isNullTransform2(value) {
    return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
  };
  var _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray2(target) {
    var matrixString = _getComputedProperty(target, _transformProp);
    return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
  };
  var _getMatrix = function _getMatrix2(target, force2D) {
    var cache = target._gsap || _getCache(target), style = target.style, matrix = _getComputedTransformMatrixAsArray(target), parent, nextSibling, temp, addedToDOM;
    if (cache.svg && target.getAttribute("transform")) {
      temp = target.transform.baseVal.consolidate().matrix;
      matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
      return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
    } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
      temp = style.display;
      style.display = "block";
      parent = target.parentNode;
      if (!parent || !target.offsetParent) {
        addedToDOM = 1;
        nextSibling = target.nextSibling;
        _docElement.appendChild(target);
      }
      matrix = _getComputedTransformMatrixAsArray(target);
      temp ? style.display = temp : _removeProperty(target, "display");
      if (addedToDOM) {
        nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
      }
    }
    return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
  };
  var _applySVGOrigin = function _applySVGOrigin2(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
    var cache = target._gsap, matrix = matrixArray || _getMatrix(target, true), xOriginOld = cache.xOrigin || 0, yOriginOld = cache.yOrigin || 0, xOffsetOld = cache.xOffset || 0, yOffsetOld = cache.yOffset || 0, a = matrix[0], b = matrix[1], c = matrix[2], d = matrix[3], tx = matrix[4], ty = matrix[5], originSplit = origin.split(" "), xOrigin = parseFloat(originSplit[0]) || 0, yOrigin = parseFloat(originSplit[1]) || 0, bounds, determinant, x, y;
    if (!originIsAbsolute) {
      bounds = _getBBox(target);
      xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
      yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
    } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
      x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
      y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
      xOrigin = x;
      yOrigin = y;
    }
    if (smooth || smooth !== false && cache.smooth) {
      tx = xOrigin - xOriginOld;
      ty = yOrigin - yOriginOld;
      cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
      cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
    } else {
      cache.xOffset = cache.yOffset = 0;
    }
    cache.xOrigin = xOrigin;
    cache.yOrigin = yOrigin;
    cache.smooth = !!smooth;
    cache.origin = origin;
    cache.originIsAbsolute = !!originIsAbsolute;
    target.style[_transformOriginProp] = "0px 0px";
    if (pluginToAddPropTweensTo) {
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
    }
    target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
  };
  var _parseTransform = function _parseTransform2(target, uncache) {
    var cache = target._gsap || new GSCache(target);
    if ("x" in cache && !uncache && !cache.uncache) {
      return cache;
    }
    var style = target.style, invertedScaleX = cache.scaleX < 0, px = "px", deg = "deg", origin = _getComputedProperty(target, _transformOriginProp) || "0", x, y, z, scaleX, scaleY, rotation, rotationX, rotationY, skewX, skewY, perspective, xOrigin, yOrigin, matrix, angle, cos, sin, a, b, c, d, a12, a22, t1, t2, t3, a13, a23, a33, a42, a43, a32;
    x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
    scaleX = scaleY = 1;
    cache.svg = !!(target.getCTM && _isSVG(target));
    matrix = _getMatrix(target, cache.svg);
    if (cache.svg) {
      t1 = (!cache.uncache || origin === "0px 0px") && !uncache && target.getAttribute("data-svg-origin");
      _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
    }
    xOrigin = cache.xOrigin || 0;
    yOrigin = cache.yOrigin || 0;
    if (matrix !== _identity2DMatrix) {
      a = matrix[0];
      b = matrix[1];
      c = matrix[2];
      d = matrix[3];
      x = a12 = matrix[4];
      y = a22 = matrix[5];
      if (matrix.length === 6) {
        scaleX = Math.sqrt(a * a + b * b);
        scaleY = Math.sqrt(d * d + c * c);
        rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0;
        skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
        skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));
        if (cache.svg) {
          x -= xOrigin - (xOrigin * a + yOrigin * c);
          y -= yOrigin - (xOrigin * b + yOrigin * d);
        }
      } else {
        a32 = matrix[6];
        a42 = matrix[7];
        a13 = matrix[8];
        a23 = matrix[9];
        a33 = matrix[10];
        a43 = matrix[11];
        x = matrix[12];
        y = matrix[13];
        z = matrix[14];
        angle = _atan2(a32, a33);
        rotationX = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a12 * cos + a13 * sin;
          t2 = a22 * cos + a23 * sin;
          t3 = a32 * cos + a33 * sin;
          a13 = a12 * -sin + a13 * cos;
          a23 = a22 * -sin + a23 * cos;
          a33 = a32 * -sin + a33 * cos;
          a43 = a42 * -sin + a43 * cos;
          a12 = t1;
          a22 = t2;
          a32 = t3;
        }
        angle = _atan2(-c, a33);
        rotationY = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a * cos - a13 * sin;
          t2 = b * cos - a23 * sin;
          t3 = c * cos - a33 * sin;
          a43 = d * sin + a43 * cos;
          a = t1;
          b = t2;
          c = t3;
        }
        angle = _atan2(b, a);
        rotation = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(angle);
          sin = Math.sin(angle);
          t1 = a * cos + b * sin;
          t2 = a12 * cos + a22 * sin;
          b = b * cos - a * sin;
          a22 = a22 * cos - a12 * sin;
          a = t1;
          a12 = t2;
        }
        if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
          rotationX = rotation = 0;
          rotationY = 180 - rotationY;
        }
        scaleX = _round(Math.sqrt(a * a + b * b + c * c));
        scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
        angle = _atan2(a12, a22);
        skewX = Math.abs(angle) > 2e-4 ? angle * _RAD2DEG : 0;
        perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
      }
      if (cache.svg) {
        t1 = target.getAttribute("transform");
        cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
        t1 && target.setAttribute("transform", t1);
      }
    }
    if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
      if (invertedScaleX) {
        scaleX *= -1;
        skewX += rotation <= 0 ? 180 : -180;
        rotation += rotation <= 0 ? 180 : -180;
      } else {
        scaleY *= -1;
        skewX += skewX <= 0 ? 180 : -180;
      }
    }
    cache.x = x - ((cache.xPercent = x && (cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
    cache.y = y - ((cache.yPercent = y && (cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
    cache.z = z + px;
    cache.scaleX = _round(scaleX);
    cache.scaleY = _round(scaleY);
    cache.rotation = _round(rotation) + deg;
    cache.rotationX = _round(rotationX) + deg;
    cache.rotationY = _round(rotationY) + deg;
    cache.skewX = skewX + deg;
    cache.skewY = skewY + deg;
    cache.transformPerspective = perspective + px;
    if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) {
      style[_transformOriginProp] = _firstTwoOnly(origin);
    }
    cache.xOffset = cache.yOffset = 0;
    cache.force3D = _config.force3D;
    cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
    cache.uncache = 0;
    return cache;
  };
  var _firstTwoOnly = function _firstTwoOnly2(value) {
    return (value = value.split(" "))[0] + " " + value[1];
  };
  var _addPxTranslate = function _addPxTranslate2(target, start, value) {
    var unit = getUnit(start);
    return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
  };
  var _renderNon3DTransforms = function _renderNon3DTransforms2(ratio, cache) {
    cache.z = "0px";
    cache.rotationY = cache.rotationX = "0deg";
    cache.force3D = 0;
    _renderCSSTransforms(ratio, cache);
  };
  var _zeroDeg = "0deg";
  var _zeroPx = "0px";
  var _endParenthesis = ") ";
  var _renderCSSTransforms = function _renderCSSTransforms2(ratio, cache) {
    var _ref = cache || this, xPercent = _ref.xPercent, yPercent = _ref.yPercent, x = _ref.x, y = _ref.y, z = _ref.z, rotation = _ref.rotation, rotationY = _ref.rotationY, rotationX = _ref.rotationX, skewX = _ref.skewX, skewY = _ref.skewY, scaleX = _ref.scaleX, scaleY = _ref.scaleY, transformPerspective = _ref.transformPerspective, force3D = _ref.force3D, target = _ref.target, zOrigin = _ref.zOrigin, transforms = "", use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true;
    if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
      var angle = parseFloat(rotationY) * _DEG2RAD, a13 = Math.sin(angle), a33 = Math.cos(angle), cos;
      angle = parseFloat(rotationX) * _DEG2RAD;
      cos = Math.cos(angle);
      x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
      y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
      z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
    }
    if (transformPerspective !== _zeroPx) {
      transforms += "perspective(" + transformPerspective + _endParenthesis;
    }
    if (xPercent || yPercent) {
      transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
    }
    if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
      transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
    }
    if (rotation !== _zeroDeg) {
      transforms += "rotate(" + rotation + _endParenthesis;
    }
    if (rotationY !== _zeroDeg) {
      transforms += "rotateY(" + rotationY + _endParenthesis;
    }
    if (rotationX !== _zeroDeg) {
      transforms += "rotateX(" + rotationX + _endParenthesis;
    }
    if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
      transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
    }
    if (scaleX !== 1 || scaleY !== 1) {
      transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
    }
    target.style[_transformProp] = transforms || "translate(0, 0)";
  };
  var _renderSVGTransforms = function _renderSVGTransforms2(ratio, cache) {
    var _ref2 = cache || this, xPercent = _ref2.xPercent, yPercent = _ref2.yPercent, x = _ref2.x, y = _ref2.y, rotation = _ref2.rotation, skewX = _ref2.skewX, skewY = _ref2.skewY, scaleX = _ref2.scaleX, scaleY = _ref2.scaleY, target = _ref2.target, xOrigin = _ref2.xOrigin, yOrigin = _ref2.yOrigin, xOffset = _ref2.xOffset, yOffset = _ref2.yOffset, forceCSS = _ref2.forceCSS, tx = parseFloat(x), ty = parseFloat(y), a11, a21, a12, a22, temp;
    rotation = parseFloat(rotation);
    skewX = parseFloat(skewX);
    skewY = parseFloat(skewY);
    if (skewY) {
      skewY = parseFloat(skewY);
      skewX += skewY;
      rotation += skewY;
    }
    if (rotation || skewX) {
      rotation *= _DEG2RAD;
      skewX *= _DEG2RAD;
      a11 = Math.cos(rotation) * scaleX;
      a21 = Math.sin(rotation) * scaleX;
      a12 = Math.sin(rotation - skewX) * -scaleY;
      a22 = Math.cos(rotation - skewX) * scaleY;
      if (skewX) {
        skewY *= _DEG2RAD;
        temp = Math.tan(skewX - skewY);
        temp = Math.sqrt(1 + temp * temp);
        a12 *= temp;
        a22 *= temp;
        if (skewY) {
          temp = Math.tan(skewY);
          temp = Math.sqrt(1 + temp * temp);
          a11 *= temp;
          a21 *= temp;
        }
      }
      a11 = _round(a11);
      a21 = _round(a21);
      a12 = _round(a12);
      a22 = _round(a22);
    } else {
      a11 = scaleX;
      a22 = scaleY;
      a21 = a12 = 0;
    }
    if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
      tx = _convertToUnit(target, "x", x, "px");
      ty = _convertToUnit(target, "y", y, "px");
    }
    if (xOrigin || yOrigin || xOffset || yOffset) {
      tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
      ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
    }
    if (xPercent || yPercent) {
      temp = target.getBBox();
      tx = _round(tx + xPercent / 100 * temp.width);
      ty = _round(ty + yPercent / 100 * temp.height);
    }
    temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
    target.setAttribute("transform", temp);
    forceCSS && (target.style[_transformProp] = temp);
  };
  var _addRotationalPropTween = function _addRotationalPropTween2(plugin, target, property, startNum, endValue, relative) {
    var cap = 360, isString = _isString(endValue), endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1), change = relative ? endNum * relative : endNum - startNum, finalValue = startNum + change + "deg", direction, pt;
    if (isString) {
      direction = endValue.split("_")[1];
      if (direction === "short") {
        change %= cap;
        if (change !== change % (cap / 2)) {
          change += change < 0 ? cap : -cap;
        }
      }
      if (direction === "cw" && change < 0) {
        change = (change + cap * _bigNum2) % cap - ~~(change / cap) * cap;
      } else if (direction === "ccw" && change > 0) {
        change = (change - cap * _bigNum2) % cap - ~~(change / cap) * cap;
      }
    }
    plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
    pt.e = finalValue;
    pt.u = "deg";
    plugin._props.push(property);
    return pt;
  };
  var _assign = function _assign2(target, source) {
    for (var p in source) {
      target[p] = source[p];
    }
    return target;
  };
  var _addRawTransformPTs = function _addRawTransformPTs2(plugin, transforms, target) {
    var startCache = _assign({}, target._gsap), exclude = "perspective,force3D,transformOrigin,svgOrigin", style = target.style, endCache, p, startValue, endValue, startNum, endNum, startUnit, endUnit;
    if (startCache.svg) {
      startValue = target.getAttribute("transform");
      target.setAttribute("transform", "");
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);
      _removeProperty(target, _transformProp);
      target.setAttribute("transform", startValue);
    } else {
      startValue = getComputedStyle(target)[_transformProp];
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);
      style[_transformProp] = startValue;
    }
    for (p in _transformProps) {
      startValue = startCache[p];
      endValue = endCache[p];
      if (startValue !== endValue && exclude.indexOf(p) < 0) {
        startUnit = getUnit(startValue);
        endUnit = getUnit(endValue);
        startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
        endNum = parseFloat(endValue);
        plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
        plugin._pt.u = endUnit || 0;
        plugin._props.push(p);
      }
    }
    _assign(endCache, startCache);
  };
  _forEachName("padding,margin,Width,Radius", function(name, index) {
    var t = "Top", r = "Right", b = "Bottom", l = "Left", props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function(side) {
      return index < 2 ? name + side : "border" + side + name;
    });
    _specialProps[index > 1 ? "border" + name : name] = function(plugin, target, property, endValue, tween) {
      var a, vars;
      if (arguments.length < 4) {
        a = props.map(function(prop) {
          return _get2(plugin, prop, property);
        });
        vars = a.join(" ");
        return vars.split(a[0]).length === 5 ? a[0] : vars;
      }
      a = (endValue + "").split(" ");
      vars = {};
      props.forEach(function(prop, i) {
        return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
      });
      plugin.init(target, vars, tween);
    };
  });
  var CSSPlugin = {
    name: "css",
    register: _initCore,
    targetTest: function targetTest(target) {
      return target.style && target.nodeType;
    },
    init: function init3(target, vars, tween, index, targets) {
      var props = this._props, style = target.style, startAt = tween.vars.startAt, startValue, endValue, endNum, startNum, type, specialProp, p, startUnit, endUnit, relative, isTransformRelated, transformPropTween, cache, smooth, hasPriority;
      _pluginInitted || _initCore();
      for (p in vars) {
        if (p === "autoRound") {
          continue;
        }
        endValue = vars[p];
        if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
          continue;
        }
        type = typeof endValue;
        specialProp = _specialProps[p];
        if (type === "function") {
          endValue = endValue.call(tween, index, target, targets);
          type = typeof endValue;
        }
        if (type === "string" && ~endValue.indexOf("random(")) {
          endValue = _replaceRandom(endValue);
        }
        if (specialProp) {
          specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
        } else if (p.substr(0, 2) === "--") {
          startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
          endValue += "";
          _colorExp.lastIndex = 0;
          if (!_colorExp.test(startValue)) {
            startUnit = getUnit(startValue);
            endUnit = getUnit(endValue);
          }
          endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
          this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
          props.push(p);
        } else if (type !== "undefined") {
          if (startAt && p in startAt) {
            startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
            p in _config.units && !getUnit(startValue) && (startValue += _config.units[p]);
            _isString(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
            (startValue + "").charAt(1) === "=" && (startValue = _get2(target, p));
          } else {
            startValue = _get2(target, p);
          }
          startNum = parseFloat(startValue);
          relative = type === "string" && endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;
          relative && (endValue = endValue.substr(2));
          endNum = parseFloat(endValue);
          if (p in _propertyAliases) {
            if (p === "autoAlpha") {
              if (startNum === 1 && _get2(target, "visibility") === "hidden" && endNum) {
                startNum = 0;
              }
              _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
            }
            if (p !== "scale" && p !== "transform") {
              p = _propertyAliases[p];
              ~p.indexOf(",") && (p = p.split(",")[0]);
            }
          }
          isTransformRelated = p in _transformProps;
          if (isTransformRelated) {
            if (!transformPropTween) {
              cache = target._gsap;
              cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform);
              smooth = vars.smoothOrigin !== false && cache.smooth;
              transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1);
              transformPropTween.dep = 1;
            }
            if (p === "scale") {
              this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? relative * endNum : endNum - cache.scaleY) || 0);
              props.push("scaleY", p);
              p += "X";
            } else if (p === "transformOrigin") {
              endValue = _convertKeywordsToPercentages(endValue);
              if (cache.svg) {
                _applySVGOrigin(target, endValue, 0, smooth, 0, this);
              } else {
                endUnit = parseFloat(endValue.split(" ")[2]) || 0;
                endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);
                _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
              }
              continue;
            } else if (p === "svgOrigin") {
              _applySVGOrigin(target, endValue, 1, smooth, 0, this);
              continue;
            } else if (p in _rotationalProperties) {
              _addRotationalPropTween(this, cache, p, startNum, endValue, relative);
              continue;
            } else if (p === "smoothOrigin") {
              _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);
              continue;
            } else if (p === "force3D") {
              cache[p] = endValue;
              continue;
            } else if (p === "transform") {
              _addRawTransformPTs(this, endValue, target);
              continue;
            }
          } else if (!(p in style)) {
            p = _checkPropPrefix(p) || p;
          }
          if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
            startUnit = (startValue + "").substr((startNum + "").length);
            endNum || (endNum = 0);
            endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
            startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
            this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, relative ? relative * endNum : endNum - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
            this._pt.u = endUnit || 0;
            if (startUnit !== endUnit && endUnit !== "%") {
              this._pt.b = startValue;
              this._pt.r = _renderCSSPropWithBeginning;
            }
          } else if (!(p in style)) {
            if (p in target) {
              this.add(target, p, startValue || target[p], endValue, index, targets);
            } else {
              _missingPlugin(p, endValue);
              continue;
            }
          } else {
            _tweenComplexCSSString.call(this, target, p, startValue, endValue);
          }
          props.push(p);
        }
      }
      hasPriority && _sortPropTweensByPriority(this);
    },
    get: _get2,
    aliases: _propertyAliases,
    getSetter: function getSetter(target, property, plugin) {
      var p = _propertyAliases[property];
      p && p.indexOf(",") < 0 && (property = p);
      return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get2(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
    },
    core: {
      _removeProperty,
      _getMatrix
    }
  };
  gsap2.utils.checkPrefix = _checkPropPrefix;
  (function(positionAndScale, rotation, others, aliases) {
    var all = _forEachName(positionAndScale + "," + rotation + "," + others, function(name) {
      _transformProps[name] = 1;
    });
    _forEachName(rotation, function(name) {
      _config.units[name] = "deg";
      _rotationalProperties[name] = 1;
    });
    _propertyAliases[all[13]] = positionAndScale + "," + rotation;
    _forEachName(aliases, function(name) {
      var split = name.split(":");
      _propertyAliases[split[1]] = all[split[0]];
    });
  })("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
  _forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(name) {
    _config.units[name] = "px";
  });
  gsap2.registerPlugin(CSSPlugin);

  // node_modules/gsap/all.js
  var gsapWithCSS = gsap2.registerPlugin(CSSPlugin) || gsap2;
  var TweenMaxWithCSS = gsapWithCSS.core.Tween;

  // assets/scripts/classes/HorizontalView.js
  var HorizontalView = class {
    constructor($el, $parent, parentIndex, opts = {}) {
      this.$view = $el;
      this.opts = opts;
      this.$parent = $parent;
      this.parentIndex = parentIndex;
      this.intersectionStart = 0;
      this.intersectionEnd = 0;
      this.progressStart = 0;
      this.progressEnd = 1;
      this.repeat = $el.dataset["hscrollRepeat"] != void 0 ? true : false;
      this.translate = $el.dataset["hscrollTranslate"] != void 0 ? parseInt($el.dataset["hscrollTranslate"], 10) : 0;
      this.rotation = $el.dataset["hscrollRotation"] != void 0 ? parseInt($el.dataset["hscrollRotation"], 10) : 0;
      this.speed = $el.dataset["hscrollSpeed"] != void 0 ? $el.dataset["hscrollSpeed"] : 1;
      this.call = $el.dataset["hscrollCall"] ? $el.dataset["hscrollCall"] : null;
      this.isInteractive = false;
      this.isInview = false;
      this.isIntersected = false;
      this.intersection = {
        start: 0,
        end: 0
      };
      this.metrics = {
        offsetLeft: 0,
        offsetRight: 0,
        bcr: {}
      };
      this.pixelsScrolled = 0;
      this.inViewClass = "is-inview";
      this.init();
    }
    init() {
    }
    destroy() {
    }
    onScroll(pixelsScrolled = 0) {
      if (!this.isInteractive)
        return;
      this.pixelsScrolled = pixelsScrolled;
      this._computeProgress();
    }
    onResize(pixelsScrolled = 0, scrollMetrics) {
      this.pixelsScrolled = pixelsScrolled;
      this._setIntersection(scrollMetrics[this.parentIndex]);
      this._computeProgress();
    }
    _setIntersection(scrollMetrics) {
      const viewBCR = this.$view.getBoundingClientRect();
      const parentBCR = this.$parent.getBoundingClientRect();
      const translate = this.translate != null ? this.translate : 0;
      this.intersection = {
        start: this.parentIndex > 0 ? scrollMetrics.start + viewBCR.left - parentBCR.left : scrollMetrics.start + viewBCR.left - parentBCR.left - scrollMetrics.rootWidth,
        end: this.parentIndex > 0 ? scrollMetrics.start + viewBCR.left - parentBCR.left + viewBCR.width + translate + scrollMetrics.rootWidth : scrollMetrics.start + viewBCR.left - parentBCR.left + viewBCR.width + translate
      };
    }
    setInteractiveArea(isInteractive) {
      this.isInteractive = isInteractive;
      if (!this.isIntersected) {
        this.isIntersected = true;
        this._computeProgress();
      }
    }
    _setInviewClass(isInview) {
      this.isInview = isInview;
      if (this.isInview) {
        this.$view.classList.add(this.inViewClass);
      } else {
        this.$view.classList.remove(this.inViewClass);
      }
    }
    _computeProgress() {
      const defaultProgress = clamp(0, 1, mapRange(this.intersection.start, this.intersection.end, 0, 1, this.pixelsScrolled));
      const progress = defaultProgress;
      let currentProgress = clamp(this.progressStart, this.progressEnd, mapRange(0, 1, this.progressStart, this.progressEnd, progress));
      currentProgress = (1e5 * currentProgress | 0) / 1e5;
      this._animate(currentProgress);
      if (progress > 0 && progress < 1 && !this.isInview) {
        this._setInviewClass(true);
        this._dispatchScrollCall(true);
      } else if (progress === 1 && this.isInview && this.repeat) {
        this._setInviewClass(false);
        this._dispatchScrollCall(false);
      } else if (progress === 0 && this.isInview && this.repeat) {
        this._setInviewClass(false);
        this._dispatchScrollCall(false);
      }
    }
    _animate(progress) {
      if (this.translate || this.rotation) {
        let transform = "";
        if (this.translate) {
          const translate = mapRange(0, 1, this.translate * -1 * this.speed, this.translate * this.speed, progress);
          transform += `translate3d(${translate}%, 0, 0) `;
        }
        if (this.rotation) {
          const rotation = mapRange(0, 1, this.rotation * -1 * this.speed, this.rotation * this.speed, progress);
          transform += `rotate(${rotation}deg) `;
        }
        this.$view.style.transform = transform;
      }
    }
    _dispatchScrollCall(isInview) {
      if (isInview && this.call) {
        requestAnimationFrame(() => {
          ScrollCall.dispatch(this.call, "enter", this);
        });
      } else if (this.call) {
        ScrollCall.dispatch(this.call, "exit", this);
      }
    }
  };

  // assets/scripts/modules/Perks.js
  var MQ = 1200;
  var Perks_default = class extends _default {
    constructor(m) {
      super(m);
      this.onResizeBind = this.onResize.bind(this);
      this.$el = this.el;
      this.$slider = this.$("slider")[0];
      this.$root = this.$("root")[0];
      this.$slides = this.$("slide");
      this.sidebarWidth = 0;
      this.pixelsScrolled = 0;
      this.views = [];
      this.slideMetrics = [];
      this.hasInit = false;
    }
    init() {
      this.bindEvents();
      if (window.innerWidth >= MQ && !this.hasInit) {
        this.hasInit = true;
        this._init();
      }
    }
    destroy() {
      super.destroy();
      this.unbindEvents();
      if (this.hasInit) {
        this._destroy();
      }
    }
    bindEvents() {
      window.addEventListener("resize", this.onResizeBind);
    }
    unbindEvents() {
      window.removeEventListener("resize", this.onResizeBind);
    }
    onResize() {
      if (window.innerWidth >= MQ && !this.hasInit) {
        const styledElements = this.$el.querySelectorAll("[style]");
        let styledElementsIndex = 0;
        while (styledElementsIndex < styledElements.length) {
          styledElements[styledElementsIndex].style = "";
          styledElementsIndex++;
        }
        requestAnimationFrame(() => {
          this.hasInit = true;
          this._init();
        });
      }
      if (window.innerWidth < MQ && this.hasInit) {
        const styledElements = this.$el.querySelectorAll("[style]");
        let styledElementsIndex = 0;
        while (styledElementsIndex < styledElements.length) {
          styledElements[styledElementsIndex].style = "";
          styledElementsIndex++;
        }
        requestAnimationFrame(() => {
          this.hasInit = false;
          this._destroy();
        });
      }
      if (this.hasInit) {
        requestAnimationFrame(() => {
          this.computeScrollHeight();
          this.computeSlideMetrics();
          this.resizeViews();
        });
      }
    }
    onProgress(progress) {
      if (!this.scrollHeight)
        return;
      this.pixelsScrolled = clamp(0, this.scrollHeight, mapRange(0, 1, 0, this.scrollHeight, progress));
      let index = 0;
      while (index < this.$slides.length) {
        const metrics = this.slideMetrics[index];
        if (this.pixelsScrolled >= metrics.start && this.pixelsScrolled <= metrics.end) {
          const localPixelsScrolled = mapRange(metrics.start, metrics.end, 0, metrics.width, this.pixelsScrolled);
          const computedPixelsScrolled = localPixelsScrolled - metrics.originX;
          this.$slides[index].style.transform = `translate3d(${computedPixelsScrolled * -1}px, 0, 0)`;
          if (!metrics.isVisible) {
            this.$slides[index].style.visibility = "";
            metrics.isVisible = true;
            let viewIndex = 0;
            while (viewIndex < this.views.length) {
              const view = this.views[viewIndex];
              if (view.obj.parentIndex == index) {
                view.obj.isInteractive = true;
              }
              viewIndex++;
            }
          }
        } else if (this.pixelsScrolled < metrics.start) {
          this.$slides[index].style.transform = `translate3d(${metrics.originX}px, 0, 0)`;
          if (metrics.isVisible) {
            this.$slides[index].style.visibility = `hidden`;
            metrics.isVisible = false;
            let viewIndex = 0;
            while (viewIndex < this.views.length) {
              const view = this.views[viewIndex];
              if (view.obj.parentIndex == index) {
                view.obj.isInteractive = false;
              }
              viewIndex++;
            }
          }
        } else if (this.pixelsScrolled > metrics.end) {
          if (metrics.isVisible) {
            this.$slides[index].style.visibility = `hidden`;
            metrics.isVisible = false;
            let viewIndex = 0;
            while (viewIndex < this.views.length) {
              const view = this.views[viewIndex];
              if (view.obj.parentIndex == index) {
                view.obj.isInteractive = false;
              }
              viewIndex++;
            }
          }
        }
        index++;
      }
      this.scrollViews();
    }
    _init() {
      const $views = this.$el.querySelectorAll("[data-hscroll]");
      let index = 0;
      while (index < $views.length) {
        const $view = $views[index];
        let $viewParent, viewParentIndex;
        let slideIndex = 0;
        while (slideIndex < this.$slides.length) {
          const $slide = this.$slides[slideIndex];
          if ($slide.contains($view)) {
            $viewParent = $slide;
            viewParentIndex = slideIndex;
            break;
          }
          slideIndex++;
        }
        const viewInstance = new HorizontalView($view, $viewParent, viewParentIndex);
        this.views.push({ index, obj: viewInstance });
        index++;
      }
      requestAnimationFrame(() => {
        this.computeScrollHeight();
        this.computeSlideMetrics();
        this.onProgress(0);
        this.resizeViews();
      });
    }
    _destroy() {
      this.unsubscribeAllViews();
    }
    computeScrollHeight() {
      this.viewWidth = this.$el.offsetWidth;
      let index = 0;
      let sliderWidth = 0;
      while (index < this.$slides.length) {
        sliderWidth += this.$slides[index].offsetWidth;
        index++;
      }
      this.scrollHeight = sliderWidth - this.viewWidth;
      this.$el.style.setProperty("--scroll-height", `${this.scrollHeight}px`);
      requestAnimationFrame(() => {
        this.call("update", null, "Scroll");
      });
    }
    computeSlideMetrics() {
      this.slideMetrics = [];
      let offset = 0;
      let index = 0;
      while (index < this.$slides.length) {
        this.slideMetrics.push({
          index,
          rootWidth: this.$root.offsetWidth,
          start: offset,
          end: index > 0 && index < this.$slides.length - 1 ? offset + this.$slides[index].offsetWidth + this.$root.offsetWidth : offset + this.$slides[index].offsetWidth,
          originX: index < 1 ? 0 : this.$root.offsetWidth,
          width: index > 0 && index < this.$slides.length - 1 ? this.$slides[index].offsetWidth + this.$root.offsetWidth : this.$slides[index].offsetWidth,
          isVisible: index < 1 ? false : true
        });
        offset += index < 1 ? this.$slides[index].offsetWidth - this.$root.offsetWidth : this.$slides[index].offsetWidth;
        index++;
      }
    }
    scrollViews() {
      let index = 0;
      while (index < this.views.length) {
        const $view = this.views[index];
        $view.obj.onScroll(this.pixelsScrolled);
        index++;
      }
    }
    resizeViews() {
      let index = 0;
      while (index < this.views.length) {
        const $view = this.views[index];
        $view.obj.onResize(this.pixelsScrolled, this.slideMetrics);
        index++;
      }
    }
    unsubscribeAllViews() {
      let index = 0;
      while (index < this.views.length) {
        const view = this.views[index];
        view.obj.destroy();
        index++;
      }
      this.views = [];
    }
  };

  // assets/scripts/modules/CareerHero.js
  var LEFT_COL_WIDTH_START = 0.38;
  var LEFT_COL_WIDTH_END = 0.25;
  var FONT_SIZE_START = 50;
  var FONT_SIZE_END = 35;
  var CareerHero_default = class extends _default {
    constructor(m) {
      super(m);
      this.onResizeBind = this.onResize.bind(this);
      this.$el = this.el;
      this.$left = this.$("left")[0];
      this.width = this.$el.offsetWidth;
    }
    init() {
      this.bindEvents();
      this.onResize();
      requestAnimationFrame(() => {
        this.onProgress(0);
      });
    }
    destroy() {
      super.destroy();
      this.unbindEvents();
    }
    bindEvents() {
      window.addEventListener("resize", this.onResizeBind);
    }
    unbindEvents() {
      window.removeEventListener("resize", this.onResizeBind);
    }
    onResize() {
      this.width = this.$el.offsetWidth;
    }
    onProgress(progress) {
      const leftPercent = clamp(LEFT_COL_WIDTH_END, LEFT_COL_WIDTH_START, mapRange(0, 1, LEFT_COL_WIDTH_START, LEFT_COL_WIDTH_END, progress));
      const fontSize = clamp(FONT_SIZE_END, FONT_SIZE_START, mapRange(0, 1, FONT_SIZE_START, FONT_SIZE_END, progress));
      this.$el.style.setProperty("--left-col-width", `calc(${this.width * leftPercent}px - 1px)`);
      this.$el.style.setProperty("--font-size", `${fontSize}px`);
    }
    forceProgressStart() {
      this.$el.style.setProperty("--left-col-width", `calc(${this.width * LEFT_COL_WIDTH_START}px - 1px)`);
      this.$el.style.setProperty("--font-size", `${FONT_SIZE_START}px`);
    }
    forceProgressEnd() {
      this.$el.style.setProperty("--left-col-width", `calc(${this.width * LEFT_COL_WIDTH_END}px - 1px)`);
      this.$el.style.setProperty("--font-size", `${FONT_SIZE_END}px`);
    }
  };

  // assets/scripts/modules/HeaderProgress.js
  var HeaderProgress_default = class extends _default {
    constructor(m) {
      super(m);
      this.onResizeBind = this.onResize.bind(this);
      this.$el = this.el;
      this.height = this.$el.offsetHeight;
    }
    init() {
      this.bindEvents();
      this.onResize();
      requestAnimationFrame(() => {
        this.onProgress(0);
      });
    }
    destroy() {
      super.destroy();
      this.unbindEvents();
    }
    bindEvents() {
      window.addEventListener("resize", this.onResizeBind);
    }
    unbindEvents() {
      window.removeEventListener("resize", this.onResizeBind);
    }
    onResize() {
      this.height = this.$el.offsetHeight;
    }
    onProgress(progress) {
      const scrolled = clamp(0, this.height, mapRange(0, 1, this.height, 0, progress));
      html.style.setProperty("--scrolled-header", `${scrolled}px`);
    }
    forceProgressStart() {
      html.style.setProperty("--scrolled-header", `${this.height}px`);
    }
    forceProgressEnd() {
      html.style.setProperty("--scrolled-header", `0px`);
    }
  };

  // assets/scripts/utils/form.js
  var DEFAULT_VUE_DATA = function(formEl = {}) {
    return {
      action: formEl.action || "",
      method: "post",
      hasErrors: false,
      isLoading: false,
      isSubmitted: false,
      isResubmitable: true,
      formData: {},
      messages: []
    };
  };
  var DEFAULT_VUE_FORM = {
    delimiters: ["${", "}"],
    validations: {
      formData: {}
    },
    computed: {
      hasMessages: function() {
        return this.messages.length > 0;
      },
      feedbackClasses: function() {
        return {
          "is-error": this.hasErrors,
          "is-loading": this.isLoading,
          "is-success": this.isSubmitted
        };
      }
    },
    methods: {
      inputClasses: function(validation) {
        return {
          "is-error": validation.$error,
          "is-dirty": validation.$dirty
        };
      },
      submit: function() {
        if (!this.isLoading && (this.isResubmitable || !this.isResubmitable && !this.isSubmitted)) {
          this.hasErrors = false;
          this.$v.$touch();
          if (this.$v.$invalid) {
            this.hasErrors = true;
            requestAnimationFrame(() => {
              const $inputError = this.$el.querySelectorAll(".is-error")[0];
              if ($inputError && this.moduleInstance) {
                this.moduleInstance.call("scrollTo", [$inputError, { duration: 600, offset: -200 }], "Scroll");
                $inputError.focus();
              }
            });
            this.messages = [{ message: "Il semble y avoir une ou plusieurs erreurs." }];
          } else {
            this.sendData();
            this.$v.$reset();
          }
        }
      },
      sendData: function() {
        try {
          this.isLoading = true;
          this.messages = [];
          let isError = false;
          fetch(this.action, {
            method: this.method,
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.formData)
          }).then((response) => {
            if (response.status !== 200 && response.status !== 202) {
              isError = true;
            }
            return response.json();
          }).then((response) => {
            if (isError) {
              this.hasErrors = true;
              this.messages = response;
              this.onSendDataFailure(response);
            } else {
              this.onSendDataSuccess(response);
              this.isSubmitted = true;
            }
          }).catch(() => {
          }).finally(() => {
            this.isLoading = false;
            requestAnimationFrame(() => {
              const $success = this.$el.querySelectorAll(".c-form_success")[0];
              if ($success && this.moduleInstance) {
                this.moduleInstance.call("scrollTo", [$success, { duration: 600, offset: -200 }], "Scroll");
              }
            });
            this.onSendDataFinally();
          });
        } catch (error) {
          console.error(error);
        }
      },
      onSendDataSuccess: function(response) {
      },
      onSendDataFailure: function(response) {
      },
      onSendDataFinally: function() {
      }
    }
  };

  // assets/scripts/modules/FormJoinUs.js
  var { required, requiredIf, email, url } = window.validators;
  var FormJoinUs_default = class extends _default {
    constructor(m) {
      super(m);
      this.$el = this.el;
    }
    init() {
      this.openingId = this.getData("opening-id");
      this.language = this.getData("language");
      this.initVue();
    }
    destroy() {
      var _a, _b;
      super.destroy();
      (_b = (_a = this.app) == null ? void 0 : _a.$destroy) == null ? void 0 : _b.call(_a);
    }
    initVue() {
      const moduleInstance = this;
      Vue.config.devtools = true;
      Vue.use(window.vuelidate.default);
      this.app = new Vue(__spreadProps(__spreadValues({}, DEFAULT_VUE_FORM), {
        el: this.el,
        mixins: [{
          data: DEFAULT_VUE_DATA(this.el)
        }],
        components: {
          FilePond: vueFilePond.default(FilePondPluginFileValidateType)
        },
        data() {
          return {
            formData: {
              openingId: moduleInstance.openingId,
              officeId: "",
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              linkedin: "",
              resume: "",
              message: "",
              language: moduleInstance.language
            }
          };
        },
        watch: {
          "$v": {
            deep: true,
            immediate: true,
            handler(value) {
              var _a;
              (_a = this.moduleInstance) == null ? void 0 : _a.call("update", null, "Scroll");
            }
          }
        },
        validations: __spreadProps(__spreadValues({}, DEFAULT_VUE_FORM.validations.formData), {
          formData: {
            officeId: {},
            firstName: {
              required
            },
            lastName: {
              required
            },
            email: {
              required,
              email
            },
            phoneNumber: {
              required
            },
            message: {},
            linkedin: {
              required: requiredIf(function(formData) {
                return formData.resume.length < 1;
              }),
              url
            },
            resume: {
              required: requiredIf(function(formData) {
                return formData.linkedin === "";
              })
            }
          }
        }),
        created() {
          this.moduleInstance = moduleInstance;
        },
        mounted() {
        },
        methods: __spreadProps(__spreadValues({}, DEFAULT_VUE_FORM.methods), {
          onSendDataSuccess: function(response) {
            moduleInstance.call("goTo", { url: response.feedbackUrl, transition: null }, "Load");
          },
          handleFilePondInit: function() {
          },
          handleAddResumeFile: function(error, file) {
            this.formData.resume = file.file.name;
          },
          handleRemoveResumeFile: function(error, file) {
            this.formData.resume = "";
          },
          handleProcessResumeFile: function(error, file) {
            if (typeof file !== "undefined" && file.serverId) {
              this.formData.resume = file.serverId;
            }
          }
        })
      }));
    }
  };

  // assets/scripts/modules/FormRedirect.js
  var FormRedirect_default = class extends _default {
    constructor(m) {
      super(m);
      this.$el = this.el;
    }
    init() {
      this.initVue();
    }
    destroy() {
      var _a, _b;
      super.destroy();
      (_b = (_a = this.app) == null ? void 0 : _a.$destroy) == null ? void 0 : _b.call(_a);
    }
    initVue() {
      const moduleInstance = this;
      Vue.config.devtools = true;
      this.app = new Vue({
        delimiters: ["${", "}"],
        el: this.el,
        methods: {
          onChange(event) {
            moduleInstance.call("goTo", { url: event.target.value, transition: null }, "Load");
          }
        }
      });
    }
  };

  // assets/scripts/modules/JobList.js
  var JobList_default = class extends _default {
    constructor(m) {
      super(m);
      this.$el = this.el;
      this.$buttons = this.$("button");
      this.$items = this.$("item");
      this.$separatorsY = this.$("separatorsY")[0];
      this.$separatorsX = this.$("separatorsX")[0];
      this.filterActive = "all";
      this.selectedItems = [];
      this.onClickBind = this.onClick.bind(this);
      this.onResizeBind = this.onResize.bind(this);
    }
    init() {
      this.bindEvents();
      const maxSeparatorsY = this.$items.length - 1;
      for (let index = 0; index < maxSeparatorsY; index++) {
        const $span = document.createElement("span");
        this.$separatorsY.appendChild($span);
      }
      requestAnimationFrame(() => {
        this.filterJob();
      });
    }
    destroy() {
      super.destroy();
      this.unbindEvents();
    }
    bindEvents() {
      for (let index = 0; index < this.$buttons.length; index++) {
        const $button = this.$buttons[index];
        $button.addEventListener("click", this.onClickBind);
      }
      window.addEventListener("resize", this.onResizeBind);
    }
    unbindEvents() {
      for (let index = 0; index < this.$buttons.length; index++) {
        const $button = this.$buttons[index];
        $button.removeEventListener("click", this.onClickBind);
      }
      window.removeEventListener("resize", this.onResizeBind);
    }
    onClick(e) {
      const $target = e.target;
      this.filterActive = e.target.dataset.id;
      for (let index = 0; index < this.$buttons.length; index++) {
        const $button = this.$buttons[index];
        if ($button === $target) {
          $button.classList.add("is-active");
        } else {
          $button.classList.remove("is-active");
        }
      }
      this.filterJob();
    }
    onResize() {
      this.setSeparators();
    }
    setSeparators() {
      const widths = [];
      const heights = [];
      for (let index = 0; index < this.selectedItems.length; index++) {
        const $item = this.selectedItems[index];
        widths.push($item.offsetWidth);
        heights.push($item.offsetHeight);
      }
      const offsetX = Math.max(...widths);
      const offsetY = Math.max(...heights);
      this.$el.style.setProperty("--offset-x", `${offsetX - 1}px`);
      this.$el.style.setProperty("--offset-y", `${offsetY}px`);
      let lines = 0;
      if (window.innerWidth > 1200) {
        const itemsByLine = 3;
        lines = Math.ceil(this.selectedItems.length / itemsByLine);
      } else if (window.innerWidth > 700) {
        const itemsByLine = 2;
        lines = Math.ceil(this.selectedItems.length / itemsByLine);
      } else {
        const itemsByLine = 1;
        lines = Math.ceil(this.selectedItems.length / itemsByLine);
      }
      const $separatorsYSpans = this.$separatorsY.querySelectorAll("span");
      for (let index = 0; index < $separatorsYSpans.length; index++) {
        const $span = $separatorsYSpans[index];
        if (index > lines - 2) {
          $span.style.display = "none";
        } else {
          $span.style = "";
        }
      }
    }
    filterJob() {
      this.selectedItems = [];
      for (let index = 0; index < this.$items.length; index++) {
        const $item = this.$items[index];
        const itemFilters = $item.dataset.ids;
        const filters = itemFilters.split(",");
        if (this.filterActive === "all") {
          $item.classList.remove("-unactive");
          this.selectedItems.push($item);
        } else if (filters.indexOf(this.filterActive) > -1) {
          $item.classList.remove("-unactive");
          this.selectedItems.push($item);
        } else {
          $item.classList.add("-unactive");
        }
      }
      const $staticTiles = this.el.querySelectorAll(".-is-custom");
      const $lastStatic = $staticTiles[$staticTiles.length - 1];
      $lastStatic.classList.remove("-unactive");
      this.selectedItems.push($lastStatic);
      this.$el.style.setProperty("--items", this.selectedItems.length);
      this.setSeparators();
      this.call("update", null, "Scroll");
    }
  };

  // assets/scripts/globals.js
  var import_svg4everybody = __toESM(require_svg4everybody(), 1);
  function globals_default() {
    (0, import_svg4everybody.default)();
  }

  // assets/scripts/app.js
  var app = new main_esm_default({
    modules: modules_exports
  });
  window.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  if (window.isMobile) {
    html.classList.add("is-mobile");
  }
  window.onload = (event) => {
    const $style = document.getElementById("stylesheet");
    if ($style.isLoaded) {
      init4();
    } else {
      $style.addEventListener("load", (event2) => {
        init4();
      });
    }
  };
  function init4() {
    app.init(app);
    globals_default();
    html.classList.add("is-loaded", "is-ready");
    html.classList.remove("is-loading");
    setTimeout(() => {
      html.classList.add("is-first-load");
      html.classList.add("has-dom-ready");
      setTimeout(() => {
        html.classList.add("is-animated");
      }, 1200);
    }, 1200);
    bindEvents();
  }
  function bindEvents() {
    if (window.isMobile) {
      console.log("isMobile");
      window.addEventListener("resize", () => {
        onMobileResize();
      });
    } else {
      window.addEventListener("resize", () => {
        onResize();
      });
    }
  }
  function onResize() {
    let vw = html.offsetWidth * 0.01;
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vw", `${vw}px`);
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  function onMobileResize() {
    if (window.innerWidth > window.innerHeight && window.customOrientation != "landscape") {
      window.customOrientation = "landscape";
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    if (window.innerWidth < window.innerHeight && window.customOrientation != "portrait") {
      window.customOrientation = "portrait";
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
  }
})();

