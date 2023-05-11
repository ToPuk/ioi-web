/*!
 * VERSION: 0.7.0
 * DATE: 2019-02-07
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
!function (a) {
	"use strict";
	var b = a.GreenSockGlobals || a, c = function (a) {
			var c, d = a.split("."), e = b;
			for (c = 0; c < d.length; c++) e[d[c]] = e = e[d[c]] || {};
			return e
		}, d = c("com.greensock.utils"), e = function (a) {
			var b = a.nodeType, c = "";
			if (1 === b || 9 === b || 11 === b) {
				if ("string" == typeof a.textContent) return a.textContent;
				for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
			} else if (3 === b || 4 === b) return a.nodeValue;
			return c
		}, f = _gsScope.document || {}, g = "undefined" != typeof a ? a : f.defaultView || {
			getComputedStyle: function () {
			}
		}, h = function (a) {
			return g.getComputedStyle(a)
		}, i = /([A-Z])/g, j = function (a, b, c, d) {
			var e;
			return (c = c || h(a, null)) ? (a = c.getPropertyValue(b.replace(i, "-$1").toLowerCase()), e = a || c.length ? a : c[b]) : a.currentStyle && (c = a.currentStyle, e = c[b]), d ? e : parseInt(e, 10) || 0
		}, k = function (a) {
			return a.length && a[0] && (a[0].nodeType && a[0].style && !a.nodeType || a[0].length && a[0][0]) ? !0 : !1
		}, l = function (a) {
			var b, c, d, e = [], f = a.length;
			for (b = 0; f > b; b++) if (c = a[b], k(c)) for (d = c.length, d = 0; d < c.length; d++) e.push(c[d]); else e.push(c);
			return e
		}, m = function (a, b) {
			for (var c, d = b.length; --d > -1;) if (c = b[d], a.substr(0, c.length) === c) return c.length
		}, n = /(?:\r|\n|\t\t)/g, o = /(?:\s\s+)/g, p = 55296, q = 56319, r = 56320, s = 127462, t = 127487, u = 127995,
		v = 127999, w = function (a) {
			return (a.charCodeAt(0) - p << 10) + (a.charCodeAt(1) - r) + 65536
		}, x = f.all && !f.addEventListener,
		y = " style='position:relative;display:inline-block;" + (x ? "*display:inline;*zoom:1;'" : "'"),
		z = function (a, b) {
			a = a || "";
			var c = -1 !== a.indexOf("++"), d = 1;
			return c && (a = a.split("++").join("")), function () {
				return "<" + b + y + (a ? " class='" + a + (c ? d++ : "") + "'>" : ">")
			}
		}, A = d.SplitText = b.SplitText = function (a, b) {
			if ("string" == typeof a && (a = A.selector(a)), !a) throw"cannot split a null element.";
			this.elements = k(a) ? l(a) : [a], this.chars = [], this.words = [], this.lines = [], this._originals = [], this.vars = b || {}, this.split(b)
		}, B = function (a, b, c) {
			var d = a.nodeType;
			if (1 === d || 9 === d || 11 === d) for (a = a.firstChild; a; a = a.nextSibling) B(a, b, c); else (3 === d || 4 === d) && (a.nodeValue = a.nodeValue.split(b).join(c))
		}, C = function (a, b) {
			for (var c = b.length; --c > -1;) a.push(b[c])
		}, D = function (a) {
			var b, c = [], d = a.length;
			for (b = 0; b !== d; c.push(a[b++])) ;
			return c
		}, E = function (a, b, c) {
			for (var d; a && a !== b;) {
				if (d = a._next || a.nextSibling) return d.textContent.charAt(0) === c;
				a = a.parentNode || a._parent
			}
			return !1
		}, F = function (a) {
			var b, c, d = D(a.childNodes), e = d.length;
			for (b = 0; e > b; b++) c = d[b], c._isSplit ? F(c) : (b && 3 === c.previousSibling.nodeType ? c.previousSibling.nodeValue += 3 === c.nodeType ? c.nodeValue : c.firstChild.nodeValue : 3 !== c.nodeType && a.insertBefore(c.firstChild, c), a.removeChild(c))
		}, G = function (a, b, c, d, e, g, i) {
			var k, l, m, n, o, p, q, r, s, t, u, v, w = h(a), x = j(a, "paddingLeft", w), y = -999,
				z = j(a, "borderBottomWidth", w) + j(a, "borderTopWidth", w),
				A = j(a, "borderLeftWidth", w) + j(a, "borderRightWidth", w),
				D = j(a, "paddingTop", w) + j(a, "paddingBottom", w), G = j(a, "paddingLeft", w) + j(a, "paddingRight", w),
				H = .2 * j(a, "fontSize"), I = j(a, "textAlign", w, !0), J = [], K = [], L = [], M = b.wordDelimiter || " ",
				N = b.tag ? b.tag : b.span ? "span" : "div", O = b.type || b.split || "chars,words,lines",
				P = e && -1 !== O.indexOf("lines") ? [] : null, Q = -1 !== O.indexOf("words"),
				R = -1 !== O.indexOf("chars"), S = "absolute" === b.position || b.absolute === !0, T = b.linesClass,
				U = -1 !== (T || "").indexOf("++"), V = [];
			for (U && (T = T.split("++").join("")), l = a.getElementsByTagName("*"), m = l.length, o = [], k = 0; m > k; k++) o[k] = l[k];
			if (P || S) for (k = 0; m > k; k++) n = o[k], p = n.parentNode === a, (p || S || R && !Q) && (v = n.offsetTop, P && p && Math.abs(v - y) > H && ("BR" !== n.nodeName || 0 === k) && (q = [], P.push(q), y = v), S && (n._x = n.offsetLeft, n._y = v, n._w = n.offsetWidth, n._h = n.offsetHeight), P && ((n._isSplit && p || !R && p || Q && p || !Q && n.parentNode.parentNode === a && !n.parentNode._isSplit) && (q.push(n), n._x -= x, E(n, a, M) && (n._wordEnd = !0)), "BR" === n.nodeName && (n.nextSibling && "BR" === n.nextSibling.nodeName || 0 === k) && P.push([])));
			for (k = 0; m > k; k++) n = o[k], p = n.parentNode === a, "BR" !== n.nodeName ? (S && (s = n.style, Q || p || (n._x += n.parentNode._x, n._y += n.parentNode._y), s.left = n._x + "px", s.top = n._y + "px", s.position = "absolute", s.display = "block", s.width = n._w + 1 + "px", s.height = n._h + "px"), !Q && R ? n._isSplit ? (n._next = n.nextSibling, n.parentNode.appendChild(n)) : n.parentNode._isSplit ? (n._parent = n.parentNode, !n.previousSibling && n.firstChild && (n.firstChild._isFirst = !0), n.nextSibling && " " === n.nextSibling.textContent && !n.nextSibling.nextSibling && V.push(n.nextSibling), n._next = n.nextSibling && n.nextSibling._isFirst ? null : n.nextSibling, n.parentNode.removeChild(n), o.splice(k--, 1), m--) : p || (v = !n.nextSibling && E(n.parentNode, a, M), n.parentNode._parent && n.parentNode._parent.appendChild(n), v && n.parentNode.appendChild(f.createTextNode(" ")), "span" === N && (n.style.display = "inline"), J.push(n)) : n.parentNode._isSplit && !n._isSplit && "" !== n.innerHTML ? K.push(n) : R && !n._isSplit && ("span" === N && (n.style.display = "inline"), J.push(n))) : P || S ? (n.parentNode && n.parentNode.removeChild(n), o.splice(k--, 1), m--) : Q || a.appendChild(n);
			for (k = V.length; --k > -1;) V[k].parentNode.removeChild(V[k]);
			if (P) {
				for (S && (t = f.createElement(N), a.appendChild(t), u = t.offsetWidth + "px", v = t.offsetParent === a ? 0 : a.offsetLeft, a.removeChild(t)), s = a.style.cssText, a.style.cssText = "display:none;"; a.firstChild;) a.removeChild(a.firstChild);
				for (r = " " === M && (!S || !Q && !R), k = 0; k < P.length; k++) {
					for (q = P[k], t = f.createElement(N), t.style.cssText = "display:block;text-align:" + I + ";position:" + (S ? "absolute;" : "relative;"), T && (t.className = T + (U ? k + 1 : "")), L.push(t), m = q.length, l = 0; m > l; l++) "BR" !== q[l].nodeName && (n = q[l], t.appendChild(n), r && n._wordEnd && t.appendChild(f.createTextNode(" ")), S && (0 === l && (t.style.top = n._y + "px", t.style.left = x + v + "px"), n.style.top = "0px", v && (n.style.left = n._x - v + "px")));
					0 === m ? t.innerHTML = "&nbsp;" : Q || R || (F(t), B(t, String.fromCharCode(160), " ")), S && (t.style.width = u, t.style.height = n._h + "px"), a.appendChild(t)
				}
				a.style.cssText = s
			}
			S && (i > a.clientHeight && (a.style.height = i - D + "px", a.clientHeight < i && (a.style.height = i + z + "px")), g > a.clientWidth && (a.style.width = g - G + "px", a.clientWidth < g && (a.style.width = g + A + "px"))), C(c, J), Q && C(d, K), C(e, L)
		}, H = function (a, b, c, d) {
			var g, h, i, j, k, l, r, x, y, z, A = b.tag ? b.tag : b.span ? "span" : "div",
				C = b.type || b.split || "chars,words,lines", D = -1 !== C.indexOf("chars"),
				E = "absolute" === b.position || b.absolute === !0, F = b.wordDelimiter || " ",
				G = " " !== F ? "" : E ? "&#173; " : " ", H = "</" + A + ">", I = !0,
				J = b.specialChars ? "function" == typeof b.specialChars ? b.specialChars : m : null,
				K = f.createElement("div"), L = a.parentNode;
			for (L.insertBefore(K, a), K.textContent = a.nodeValue, L.removeChild(a), a = K, g = e(a), r = -1 !== g.indexOf("<"), b.reduceWhiteSpace !== !1 && (g = g.replace(o, " ").replace(n, "")), r && (g = g.split("<").join("{{LT}}")), k = g.length, h = (" " === g.charAt(0) ? G : "") + c(), i = 0; k > i; i++) if (l = g.charAt(i), J && (z = J(g.substr(i), b.specialChars))) l = g.substr(i, z || 1), h += D && " " !== l ? d() + l + "</" + A + ">" : l, i += z - 1; else if (l === F && g.charAt(i - 1) !== F && i) {
				for (h += I ? H : "", I = !1; g.charAt(i + 1) === F;) h += G, i++;
				i === k - 1 ? h += G : ")" !== g.charAt(i + 1) && (h += G + c(), I = !0)
			} else "{" === l && "{{LT}}" === g.substr(i, 6) ? (h += D ? d() + "{{LT}}</" + A + ">" : "{{LT}}", i += 5) : l.charCodeAt(0) >= p && l.charCodeAt(0) <= q || g.charCodeAt(i + 1) >= 65024 && g.charCodeAt(i + 1) <= 65039 ? (x = w(g.substr(i, 2)), y = w(g.substr(i + 2, 2)), j = x >= s && t >= x && y >= s && t >= y || y >= u && v >= y ? 4 : 2, h += D && " " !== l ? d() + g.substr(i, j) + "</" + A + ">" : g.substr(i, j), i += j - 1) : h += D && " " !== l ? d() + l + "</" + A + ">" : l;
			a.outerHTML = h + (I ? H : ""), r && B(L, "{{LT}}", "<")
		}, I = function (a, b, c, d) {
			var e, f, g = D(a.childNodes), h = g.length, i = "absolute" === b.position || b.absolute === !0;
			if (3 !== a.nodeType || h > 1) {
				for (b.absolute = !1, e = 0; h > e; e++) f = g[e], (3 !== f.nodeType || /\S+/.test(f.nodeValue)) && (i && 3 !== f.nodeType && "inline" === j(f, "display", null, !0) && (f.style.display = "inline-block", f.style.position = "relative"), f._isSplit = !0, I(f, b, c, d));
				return b.absolute = i, void (a._isSplit = !0)
			}
			H(a, b, c, d)
		}, J = A.prototype;
	J.split = function (a) {
		this.isSplit && this.revert(), this.vars = a = a || this.vars, this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
		for (var b, c, d, e = this.elements.length, f = a.tag ? a.tag : a.span ? "span" : "div", g = z(a.wordsClass, f), h = z(a.charsClass, f); --e > -1;) d = this.elements[e], this._originals[e] = d.innerHTML, b = d.clientHeight, c = d.clientWidth, I(d, a, g, h), G(d, a, this.chars, this.words, this.lines, c, b);
		return this.chars.reverse(), this.words.reverse(), this.lines.reverse(), this.isSplit = !0, this
	}, J.revert = function () {
		if (!this._originals) throw"revert() call wasn't scoped properly.";
		for (var a = this._originals.length; --a > -1;) this.elements[a].innerHTML = this._originals[a];
		return this.chars = [], this.words = [], this.lines = [], this.isSplit = !1, this
	}, A.selector = a.$ || a.jQuery || function (b) {
		var c = a.$ || a.jQuery;
		return c ? (A.selector = c, c(b)) : "undefined" == typeof document ? b : document.querySelectorAll ? document.querySelectorAll(b) : document.getElementById("#" === b.charAt(0) ? b.substr(1) : b)
	}, A.version = "0.7.0"
}(_gsScope), function (a) {
	"use strict";
	var b = function () {
		return (_gsScope.GreenSockGlobals || _gsScope)[a]
	};
	"undefined" != typeof module && module.exports ? module.exports = b() : "function" == typeof define && define.amd && define([], b)
}("SplitText");
/**
 * Swiper 5.2.0
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://swiperjs.com
 *
 * Copyright 2014-2019 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: October 26, 2019
 */

!function (e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Swiper = t()
}(this, (function () {
	"use strict";
	var e = "undefined" == typeof document ? {
		body: {}, addEventListener: function () {
		}, removeEventListener: function () {
		}, activeElement: {
			blur: function () {
			}, nodeName: ""
		}, querySelector: function () {
			return null
		}, querySelectorAll: function () {
			return []
		}, getElementById: function () {
			return null
		}, createEvent: function () {
			return {
				initEvent: function () {
				}
			}
		}, createElement: function () {
			return {
				children: [], childNodes: [], style: {}, setAttribute: function () {
				}, getElementsByTagName: function () {
					return []
				}
			}
		}, location: {hash: ""}
	} : document, t = "undefined" == typeof window ? {
		document: e,
		navigator: {userAgent: ""},
		location: {},
		history: {},
		CustomEvent: function () {
			return this
		},
		addEventListener: function () {
		},
		removeEventListener: function () {
		},
		getComputedStyle: function () {
			return {
				getPropertyValue: function () {
					return ""
				}
			}
		},
		Image: function () {
		},
		Date: function () {
		},
		screen: {},
		setTimeout: function () {
		},
		clearTimeout: function () {
		}
	} : window, i = function (e) {
		for (var t = 0; t < e.length; t += 1) this[t] = e[t];
		return this.length = e.length, this
	};

	function s(s, a) {
		var r = [], n = 0;
		if (s && !a && s instanceof i) return s;
		if (s) if ("string" == typeof s) {
			var o, l, d = s.trim();
			if (d.indexOf("<") >= 0 && d.indexOf(">") >= 0) {
				var h = "div";
				for (0 === d.indexOf("<li") && (h = "ul"), 0 === d.indexOf("<tr") && (h = "tbody"), 0 !== d.indexOf("<td") && 0 !== d.indexOf("<th") || (h = "tr"), 0 === d.indexOf("<tbody") && (h = "table"), 0 === d.indexOf("<option") && (h = "select"), (l = e.createElement(h)).innerHTML = d, n = 0; n < l.childNodes.length; n += 1) r.push(l.childNodes[n])
			} else for (o = a || "#" !== s[0] || s.match(/[ .<>:~]/) ? (a || e).querySelectorAll(s.trim()) : [e.getElementById(s.trim().split("#")[1])], n = 0; n < o.length; n += 1) o[n] && r.push(o[n])
		} else if (s.nodeType || s === t || s === e) r.push(s); else if (s.length > 0 && s[0].nodeType) for (n = 0; n < s.length; n += 1) r.push(s[n]);
		return new i(r)
	}

	function a(e) {
		for (var t = [], i = 0; i < e.length; i += 1) -1 === t.indexOf(e[i]) && t.push(e[i]);
		return t
	}

	s.fn = i.prototype, s.Class = i, s.Dom7 = i;
	var r = {
		addClass: function (e) {
			if (void 0 === e) return this;
			for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.add(t[i]);
			return this
		}, removeClass: function (e) {
			for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.remove(t[i]);
			return this
		}, hasClass: function (e) {
			return !!this[0] && this[0].classList.contains(e)
		}, toggleClass: function (e) {
			for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.toggle(t[i]);
			return this
		}, attr: function (e, t) {
			var i = arguments;
			if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
			for (var s = 0; s < this.length; s += 1) if (2 === i.length) this[s].setAttribute(e, t); else for (var a in e) this[s][a] = e[a], this[s].setAttribute(a, e[a]);
			return this
		}, removeAttr: function (e) {
			for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
			return this
		}, data: function (e, t) {
			var i;
			if (void 0 !== t) {
				for (var s = 0; s < this.length; s += 1) (i = this[s]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), i.dom7ElementDataStorage[e] = t;
				return this
			}
			if (i = this[0]) {
				if (i.dom7ElementDataStorage && e in i.dom7ElementDataStorage) return i.dom7ElementDataStorage[e];
				var a = i.getAttribute("data-" + e);
				return a || void 0
			}
		}, transform: function (e) {
			for (var t = 0; t < this.length; t += 1) {
				var i = this[t].style;
				i.webkitTransform = e, i.transform = e
			}
			return this
		}, transition: function (e) {
			"string" != typeof e && (e += "ms");
			for (var t = 0; t < this.length; t += 1) {
				var i = this[t].style;
				i.webkitTransitionDuration = e, i.transitionDuration = e
			}
			return this
		}, on: function () {
			for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i];
			var a = t[0], r = t[1], n = t[2], o = t[3];

			function l(e) {
				var t = e.target;
				if (t) {
					var i = e.target.dom7EventData || [];
					if (i.indexOf(e) < 0 && i.unshift(e), s(t).is(r)) n.apply(t, i); else for (var a = s(t).parents(), o = 0; o < a.length; o += 1) s(a[o]).is(r) && n.apply(a[o], i)
				}
			}

			function d(e) {
				var t = e && e.target && e.target.dom7EventData || [];
				t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t)
			}

			"function" == typeof t[1] && (a = (e = t)[0], n = e[1], o = e[2], r = void 0), o || (o = !1);
			for (var h, p = a.split(" "), c = 0; c < this.length; c += 1) {
				var u = this[c];
				if (r) for (h = 0; h < p.length; h += 1) {
					var v = p[h];
					u.dom7LiveListeners || (u.dom7LiveListeners = {}), u.dom7LiveListeners[v] || (u.dom7LiveListeners[v] = []), u.dom7LiveListeners[v].push({
						listener: n,
						proxyListener: l
					}), u.addEventListener(v, l, o)
				} else for (h = 0; h < p.length; h += 1) {
					var f = p[h];
					u.dom7Listeners || (u.dom7Listeners = {}), u.dom7Listeners[f] || (u.dom7Listeners[f] = []), u.dom7Listeners[f].push({
						listener: n,
						proxyListener: d
					}), u.addEventListener(f, d, o)
				}
			}
			return this
		}, off: function () {
			for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i];
			var s = t[0], a = t[1], r = t[2], n = t[3];
			"function" == typeof t[1] && (s = (e = t)[0], r = e[1], n = e[2], a = void 0), n || (n = !1);
			for (var o = s.split(" "), l = 0; l < o.length; l += 1) for (var d = o[l], h = 0; h < this.length; h += 1) {
				var p = this[h], c = void 0;
				if (!a && p.dom7Listeners ? c = p.dom7Listeners[d] : a && p.dom7LiveListeners && (c = p.dom7LiveListeners[d]), c && c.length) for (var u = c.length - 1; u >= 0; u -= 1) {
					var v = c[u];
					r && v.listener === r ? (p.removeEventListener(d, v.proxyListener, n), c.splice(u, 1)) : r && v.listener && v.listener.dom7proxy && v.listener.dom7proxy === r ? (p.removeEventListener(d, v.proxyListener, n), c.splice(u, 1)) : r || (p.removeEventListener(d, v.proxyListener, n), c.splice(u, 1))
				}
			}
			return this
		}, trigger: function () {
			for (var i = [], s = arguments.length; s--;) i[s] = arguments[s];
			for (var a = i[0].split(" "), r = i[1], n = 0; n < a.length; n += 1) for (var o = a[n], l = 0; l < this.length; l += 1) {
				var d = this[l], h = void 0;
				try {
					h = new t.CustomEvent(o, {detail: r, bubbles: !0, cancelable: !0})
				} catch (t) {
					(h = e.createEvent("Event")).initEvent(o, !0, !0), h.detail = r
				}
				d.dom7EventData = i.filter((function (e, t) {
					return t > 0
				})), d.dispatchEvent(h), d.dom7EventData = [], delete d.dom7EventData
			}
			return this
		}, transitionEnd: function (e) {
			var t, i = ["webkitTransitionEnd", "transitionend"], s = this;

			function a(r) {
				if (r.target === this) for (e.call(this, r), t = 0; t < i.length; t += 1) s.off(i[t], a)
			}

			if (e) for (t = 0; t < i.length; t += 1) s.on(i[t], a);
			return this
		}, outerWidth: function (e) {
			if (this.length > 0) {
				if (e) {
					var t = this.styles();
					return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
				}
				return this[0].offsetWidth
			}
			return null
		}, outerHeight: function (e) {
			if (this.length > 0) {
				if (e) {
					var t = this.styles();
					return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
				}
				return this[0].offsetHeight
			}
			return null
		}, offset: function () {
			if (this.length > 0) {
				var i = this[0], s = i.getBoundingClientRect(), a = e.body, r = i.clientTop || a.clientTop || 0,
					n = i.clientLeft || a.clientLeft || 0, o = i === t ? t.scrollY : i.scrollTop,
					l = i === t ? t.scrollX : i.scrollLeft;
				return {top: s.top + o - r, left: s.left + l - n}
			}
			return null
		}, css: function (e, i) {
			var s;
			if (1 === arguments.length) {
				if ("string" != typeof e) {
					for (s = 0; s < this.length; s += 1) for (var a in e) this[s].style[a] = e[a];
					return this
				}
				if (this[0]) return t.getComputedStyle(this[0], null).getPropertyValue(e)
			}
			if (2 === arguments.length && "string" == typeof e) {
				for (s = 0; s < this.length; s += 1) this[s].style[e] = i;
				return this
			}
			return this
		}, each: function (e) {
			if (!e) return this;
			for (var t = 0; t < this.length; t += 1) if (!1 === e.call(this[t], t, this[t])) return this;
			return this
		}, html: function (e) {
			if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
			for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
			return this
		}, text: function (e) {
			if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
			for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
			return this
		}, is: function (a) {
			var r, n, o = this[0];
			if (!o || void 0 === a) return !1;
			if ("string" == typeof a) {
				if (o.matches) return o.matches(a);
				if (o.webkitMatchesSelector) return o.webkitMatchesSelector(a);
				if (o.msMatchesSelector) return o.msMatchesSelector(a);
				for (r = s(a), n = 0; n < r.length; n += 1) if (r[n] === o) return !0;
				return !1
			}
			if (a === e) return o === e;
			if (a === t) return o === t;
			if (a.nodeType || a instanceof i) {
				for (r = a.nodeType ? [a] : a, n = 0; n < r.length; n += 1) if (r[n] === o) return !0;
				return !1
			}
			return !1
		}, index: function () {
			var e, t = this[0];
			if (t) {
				for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
				return e
			}
		}, eq: function (e) {
			if (void 0 === e) return this;
			var t, s = this.length;
			return new i(e > s - 1 ? [] : e < 0 ? (t = s + e) < 0 ? [] : [this[t]] : [this[e]])
		}, append: function () {
			for (var t, s = [], a = arguments.length; a--;) s[a] = arguments[a];
			for (var r = 0; r < s.length; r += 1) {
				t = s[r];
				for (var n = 0; n < this.length; n += 1) if ("string" == typeof t) {
					var o = e.createElement("div");
					for (o.innerHTML = t; o.firstChild;) this[n].appendChild(o.firstChild)
				} else if (t instanceof i) for (var l = 0; l < t.length; l += 1) this[n].appendChild(t[l]); else this[n].appendChild(t)
			}
			return this
		}, prepend: function (t) {
			var s, a;
			for (s = 0; s < this.length; s += 1) if ("string" == typeof t) {
				var r = e.createElement("div");
				for (r.innerHTML = t, a = r.childNodes.length - 1; a >= 0; a -= 1) this[s].insertBefore(r.childNodes[a], this[s].childNodes[0])
			} else if (t instanceof i) for (a = 0; a < t.length; a += 1) this[s].insertBefore(t[a], this[s].childNodes[0]); else this[s].insertBefore(t, this[s].childNodes[0]);
			return this
		}, next: function (e) {
			return this.length > 0 ? e ? this[0].nextElementSibling && s(this[0].nextElementSibling).is(e) ? new i([this[0].nextElementSibling]) : new i([]) : this[0].nextElementSibling ? new i([this[0].nextElementSibling]) : new i([]) : new i([])
		}, nextAll: function (e) {
			var t = [], a = this[0];
			if (!a) return new i([]);
			for (; a.nextElementSibling;) {
				var r = a.nextElementSibling;
				e ? s(r).is(e) && t.push(r) : t.push(r), a = r
			}
			return new i(t)
		}, prev: function (e) {
			if (this.length > 0) {
				var t = this[0];
				return e ? t.previousElementSibling && s(t.previousElementSibling).is(e) ? new i([t.previousElementSibling]) : new i([]) : t.previousElementSibling ? new i([t.previousElementSibling]) : new i([])
			}
			return new i([])
		}, prevAll: function (e) {
			var t = [], a = this[0];
			if (!a) return new i([]);
			for (; a.previousElementSibling;) {
				var r = a.previousElementSibling;
				e ? s(r).is(e) && t.push(r) : t.push(r), a = r
			}
			return new i(t)
		}, parent: function (e) {
			for (var t = [], i = 0; i < this.length; i += 1) null !== this[i].parentNode && (e ? s(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode));
			return s(a(t))
		}, parents: function (e) {
			for (var t = [], i = 0; i < this.length; i += 1) for (var r = this[i].parentNode; r;) e ? s(r).is(e) && t.push(r) : t.push(r), r = r.parentNode;
			return s(a(t))
		}, closest: function (e) {
			var t = this;
			return void 0 === e ? new i([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
		}, find: function (e) {
			for (var t = [], s = 0; s < this.length; s += 1) for (var a = this[s].querySelectorAll(e), r = 0; r < a.length; r += 1) t.push(a[r]);
			return new i(t)
		}, children: function (e) {
			for (var t = [], r = 0; r < this.length; r += 1) for (var n = this[r].childNodes, o = 0; o < n.length; o += 1) e ? 1 === n[o].nodeType && s(n[o]).is(e) && t.push(n[o]) : 1 === n[o].nodeType && t.push(n[o]);
			return new i(a(t))
		}, filter: function (e) {
			for (var t = [], s = 0; s < this.length; s += 1) e.call(this[s], s, this[s]) && t.push(this[s]);
			return new i(t)
		}, remove: function () {
			for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
			return this
		}, add: function () {
			for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
			var i, a;
			for (i = 0; i < e.length; i += 1) {
				var r = s(e[i]);
				for (a = 0; a < r.length; a += 1) this[this.length] = r[a], this.length += 1
			}
			return this
		}, styles: function () {
			return this[0] ? t.getComputedStyle(this[0], null) : {}
		}
	};
	Object.keys(r).forEach((function (e) {
		s.fn[e] = s.fn[e] || r[e]
	}));
	var n = {
		deleteProps: function (e) {
			var t = e;
			Object.keys(t).forEach((function (e) {
				try {
					t[e] = null
				} catch (e) {
				}
				try {
					delete t[e]
				} catch (e) {
				}
			}))
		}, nextTick: function (e, t) {
			return void 0 === t && (t = 0), setTimeout(e, t)
		}, now: function () {
			return Date.now()
		}, getTranslate: function (e, i) {
			var s, a, r;
			void 0 === i && (i = "x");
			var n = t.getComputedStyle(e, null);
			return t.WebKitCSSMatrix ? ((a = n.transform || n.webkitTransform).split(",").length > 6 && (a = a.split(", ").map((function (e) {
				return e.replace(",", ".")
			})).join(", ")), r = new t.WebKitCSSMatrix("none" === a ? "" : a)) : s = (r = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === i && (a = t.WebKitCSSMatrix ? r.m41 : 16 === s.length ? parseFloat(s[12]) : parseFloat(s[4])), "y" === i && (a = t.WebKitCSSMatrix ? r.m42 : 16 === s.length ? parseFloat(s[13]) : parseFloat(s[5])), a || 0
		}, parseUrlQuery: function (e) {
			var i, s, a, r, n = {}, o = e || t.location.href;
			if ("string" == typeof o && o.length) for (r = (s = (o = o.indexOf("?") > -1 ? o.replace(/\S*\?/, "") : "").split("&").filter((function (e) {
				return "" !== e
			}))).length, i = 0; i < r; i += 1) a = s[i].replace(/#\S+/g, "").split("="), n[decodeURIComponent(a[0])] = void 0 === a[1] ? void 0 : decodeURIComponent(a[1]) || "";
			return n
		}, isObject: function (e) {
			return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
		}, extend: function () {
			for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
			for (var i = Object(e[0]), s = 1; s < e.length; s += 1) {
				var a = e[s];
				if (null != a) for (var r = Object.keys(Object(a)), o = 0, l = r.length; o < l; o += 1) {
					var d = r[o], h = Object.getOwnPropertyDescriptor(a, d);
					void 0 !== h && h.enumerable && (n.isObject(i[d]) && n.isObject(a[d]) ? n.extend(i[d], a[d]) : !n.isObject(i[d]) && n.isObject(a[d]) ? (i[d] = {}, n.extend(i[d], a[d])) : i[d] = a[d])
				}
			}
			return i
		}
	}, o = {
		touch: t.Modernizr && !0 === t.Modernizr.touch || !!(t.navigator.maxTouchPoints > 0 || "ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch),
		pointerEvents: !!t.PointerEvent && "maxTouchPoints" in t.navigator && t.navigator.maxTouchPoints > 0,
		observer: "MutationObserver" in t || "WebkitMutationObserver" in t,
		passiveListener: function () {
			var e = !1;
			try {
				var i = Object.defineProperty({}, "passive", {
					get: function () {
						e = !0
					}
				});
				t.addEventListener("testPassiveListener", null, i)
			} catch (e) {
			}
			return e
		}(),
		gestures: "ongesturestart" in t
	}, l = function (e) {
		void 0 === e && (e = {});
		var t = this;
		t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach((function (e) {
			t.on(e, t.params.on[e])
		}))
	}, d = {components: {configurable: !0}};
	l.prototype.on = function (e, t, i) {
		var s = this;
		if ("function" != typeof t) return s;
		var a = i ? "unshift" : "push";
		return e.split(" ").forEach((function (e) {
			s.eventsListeners[e] || (s.eventsListeners[e] = []), s.eventsListeners[e][a](t)
		})), s
	}, l.prototype.once = function (e, t, i) {
		var s = this;
		if ("function" != typeof t) return s;

		function a() {
			for (var i = [], r = arguments.length; r--;) i[r] = arguments[r];
			t.apply(s, i), s.off(e, a), a.f7proxy && delete a.f7proxy
		}

		return a.f7proxy = t, s.on(e, a, i)
	}, l.prototype.off = function (e, t) {
		var i = this;
		return i.eventsListeners ? (e.split(" ").forEach((function (e) {
			void 0 === t ? i.eventsListeners[e] = [] : i.eventsListeners[e] && i.eventsListeners[e].length && i.eventsListeners[e].forEach((function (s, a) {
				(s === t || s.f7proxy && s.f7proxy === t) && i.eventsListeners[e].splice(a, 1)
			}))
		})), i) : i
	}, l.prototype.emit = function () {
		for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
		var i, s, a, r = this;
		if (!r.eventsListeners) return r;
		"string" == typeof e[0] || Array.isArray(e[0]) ? (i = e[0], s = e.slice(1, e.length), a = r) : (i = e[0].events, s = e[0].data, a = e[0].context || r);
		var n = Array.isArray(i) ? i : i.split(" ");
		return n.forEach((function (e) {
			if (r.eventsListeners && r.eventsListeners[e]) {
				var t = [];
				r.eventsListeners[e].forEach((function (e) {
					t.push(e)
				})), t.forEach((function (e) {
					e.apply(a, s)
				}))
			}
		})), r
	}, l.prototype.useModulesParams = function (e) {
		var t = this;
		t.modules && Object.keys(t.modules).forEach((function (i) {
			var s = t.modules[i];
			s.params && n.extend(e, s.params)
		}))
	}, l.prototype.useModules = function (e) {
		void 0 === e && (e = {});
		var t = this;
		t.modules && Object.keys(t.modules).forEach((function (i) {
			var s = t.modules[i], a = e[i] || {};
			s.instance && Object.keys(s.instance).forEach((function (e) {
				var i = s.instance[e];
				t[e] = "function" == typeof i ? i.bind(t) : i
			})), s.on && t.on && Object.keys(s.on).forEach((function (e) {
				t.on(e, s.on[e])
			})), s.create && s.create.bind(t)(a)
		}))
	}, d.components.set = function (e) {
		this.use && this.use(e)
	}, l.installModule = function (e) {
		for (var t = [], i = arguments.length - 1; i-- > 0;) t[i] = arguments[i + 1];
		var s = this;
		s.prototype.modules || (s.prototype.modules = {});
		var a = e.name || Object.keys(s.prototype.modules).length + "_" + n.now();
		return s.prototype.modules[a] = e, e.proto && Object.keys(e.proto).forEach((function (t) {
			s.prototype[t] = e.proto[t]
		})), e.static && Object.keys(e.static).forEach((function (t) {
			s[t] = e.static[t]
		})), e.install && e.install.apply(s, t), s
	}, l.use = function (e) {
		for (var t = [], i = arguments.length - 1; i-- > 0;) t[i] = arguments[i + 1];
		var s = this;
		return Array.isArray(e) ? (e.forEach((function (e) {
			return s.installModule(e)
		})), s) : s.installModule.apply(s, [e].concat(t))
	}, Object.defineProperties(l, d);
	var h = {
		updateSize: function () {
			var e, t, i = this.$el;
			e = void 0 !== this.params.width ? this.params.width : i[0].clientWidth, t = void 0 !== this.params.height ? this.params.height : i[0].clientHeight, 0 === e && this.isHorizontal() || 0 === t && this.isVertical() || (e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10), t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10), n.extend(this, {
				width: e,
				height: t,
				size: this.isHorizontal() ? e : t
			}))
		}, updateSlides: function () {
			var e = this.params, i = this.$wrapperEl, s = this.size, a = this.rtlTranslate, r = this.wrongRTL,
				o = this.virtual && e.virtual.enabled, l = o ? this.virtual.slides.length : this.slides.length,
				d = i.children("." + this.params.slideClass), h = o ? this.virtual.slides.length : d.length, p = [],
				c = [], u = [];

			function v(t) {
				return !e.cssMode || t !== d.length - 1
			}

			var f = e.slidesOffsetBefore;
			"function" == typeof f && (f = e.slidesOffsetBefore.call(this));
			var m = e.slidesOffsetAfter;
			"function" == typeof m && (m = e.slidesOffsetAfter.call(this));
			var g = this.snapGrid.length, b = this.snapGrid.length, w = e.spaceBetween, y = -f, x = 0, T = 0;
			if (void 0 !== s) {
				var E, C;
				"string" == typeof w && w.indexOf("%") >= 0 && (w = parseFloat(w.replace("%", "")) / 100 * s), this.virtualSize = -w, a ? d.css({
					marginLeft: "",
					marginTop: ""
				}) : d.css({
					marginRight: "",
					marginBottom: ""
				}), e.slidesPerColumn > 1 && (E = Math.floor(h / e.slidesPerColumn) === h / this.params.slidesPerColumn ? h : Math.ceil(h / e.slidesPerColumn) * e.slidesPerColumn, "auto" !== e.slidesPerView && "row" === e.slidesPerColumnFill && (E = Math.max(E, e.slidesPerView * e.slidesPerColumn)));
				for (var S, M = e.slidesPerColumn, P = E / M, z = Math.floor(h / e.slidesPerColumn), k = 0; k < h; k += 1) {
					C = 0;
					var $ = d.eq(k);
					if (e.slidesPerColumn > 1) {
						var L = void 0, I = void 0, D = void 0;
						if ("row" === e.slidesPerColumnFill && e.slidesPerGroup > 1) {
							var O = Math.floor(k / (e.slidesPerGroup * e.slidesPerColumn)),
								A = k - e.slidesPerColumn * e.slidesPerGroup * O,
								G = 0 === O ? e.slidesPerGroup : Math.min(Math.ceil((h - O * M * e.slidesPerGroup) / M), e.slidesPerGroup);
							L = (I = A - (D = Math.floor(A / G)) * G + O * e.slidesPerGroup) + D * E / M, $.css({
								"-webkit-box-ordinal-group": L,
								"-moz-box-ordinal-group": L,
								"-ms-flex-order": L,
								"-webkit-order": L,
								order: L
							})
						} else "column" === e.slidesPerColumnFill ? (D = k - (I = Math.floor(k / M)) * M, (I > z || I === z && D === M - 1) && (D += 1) >= M && (D = 0, I += 1)) : I = k - (D = Math.floor(k / P)) * P;
						$.css("margin-" + (this.isHorizontal() ? "top" : "left"), 0 !== D && e.spaceBetween && e.spaceBetween + "px")
					}
					if ("none" !== $.css("display")) {
						if ("auto" === e.slidesPerView) {
							var B = t.getComputedStyle($[0], null), H = $[0].style.transform,
								N = $[0].style.webkitTransform;
							if (H && ($[0].style.transform = "none"), N && ($[0].style.webkitTransform = "none"), e.roundLengths) C = this.isHorizontal() ? $.outerWidth(!0) : $.outerHeight(!0); else if (this.isHorizontal()) {
								var X = parseFloat(B.getPropertyValue("width")),
									V = parseFloat(B.getPropertyValue("padding-left")),
									Y = parseFloat(B.getPropertyValue("padding-right")),
									F = parseFloat(B.getPropertyValue("margin-left")),
									W = parseFloat(B.getPropertyValue("margin-right")),
									R = B.getPropertyValue("box-sizing");
								C = R && "border-box" === R ? X + F + W : X + V + Y + F + W
							} else {
								var q = parseFloat(B.getPropertyValue("height")),
									j = parseFloat(B.getPropertyValue("padding-top")),
									K = parseFloat(B.getPropertyValue("padding-bottom")),
									U = parseFloat(B.getPropertyValue("margin-top")),
									_ = parseFloat(B.getPropertyValue("margin-bottom")),
									Z = B.getPropertyValue("box-sizing");
								C = Z && "border-box" === Z ? q + U + _ : q + j + K + U + _
							}
							H && ($[0].style.transform = H), N && ($[0].style.webkitTransform = N), e.roundLengths && (C = Math.floor(C))
						} else C = (s - (e.slidesPerView - 1) * w) / e.slidesPerView, e.roundLengths && (C = Math.floor(C)), d[k] && (this.isHorizontal() ? d[k].style.width = C + "px" : d[k].style.height = C + "px");
						d[k] && (d[k].swiperSlideSize = C), u.push(C), e.centeredSlides ? (y = y + C / 2 + x / 2 + w, 0 === x && 0 !== k && (y = y - s / 2 - w), 0 === k && (y = y - s / 2 - w), Math.abs(y) < .001 && (y = 0), e.roundLengths && (y = Math.floor(y)), T % e.slidesPerGroup == 0 && p.push(y), c.push(y)) : (e.roundLengths && (y = Math.floor(y)), T % e.slidesPerGroup == 0 && p.push(y), c.push(y), y = y + C + w), this.virtualSize += C + w, x = C, T += 1
					}
				}
				if (this.virtualSize = Math.max(this.virtualSize, s) + m, a && r && ("slide" === e.effect || "coverflow" === e.effect) && i.css({width: this.virtualSize + e.spaceBetween + "px"}), e.setWrapperSize && (this.isHorizontal() ? i.css({width: this.virtualSize + e.spaceBetween + "px"}) : i.css({height: this.virtualSize + e.spaceBetween + "px"})), e.slidesPerColumn > 1 && (this.virtualSize = (C + e.spaceBetween) * E, this.virtualSize = Math.ceil(this.virtualSize / e.slidesPerColumn) - e.spaceBetween, this.isHorizontal() ? i.css({width: this.virtualSize + e.spaceBetween + "px"}) : i.css({height: this.virtualSize + e.spaceBetween + "px"}), e.centeredSlides)) {
					S = [];
					for (var Q = 0; Q < p.length; Q += 1) {
						var J = p[Q];
						e.roundLengths && (J = Math.floor(J)), p[Q] < this.virtualSize + p[0] && S.push(J)
					}
					p = S
				}
				if (!e.centeredSlides) {
					S = [];
					for (var ee = 0; ee < p.length; ee += 1) {
						var te = p[ee];
						e.roundLengths && (te = Math.floor(te)), p[ee] <= this.virtualSize - s && S.push(te)
					}
					p = S, Math.floor(this.virtualSize - s) - Math.floor(p[p.length - 1]) > 1 && p.push(this.virtualSize - s)
				}
				if (0 === p.length && (p = [0]), 0 !== e.spaceBetween && (this.isHorizontal() ? a ? d.filter(v).css({marginLeft: w + "px"}) : d.filter(v).css({marginRight: w + "px"}) : d.filter(v).css({marginBottom: w + "px"})), e.centeredSlides && e.centeredSlidesBounds) {
					var ie = 0;
					u.forEach((function (t) {
						ie += t + (e.spaceBetween ? e.spaceBetween : 0)
					}));
					var se = (ie -= e.spaceBetween) - s;
					p = p.map((function (e) {
						return e < 0 ? -f : e > se ? se + m : e
					}))
				}
				if (e.centerInsufficientSlides) {
					var ae = 0;
					if (u.forEach((function (t) {
						ae += t + (e.spaceBetween ? e.spaceBetween : 0)
					})), (ae -= e.spaceBetween) < s) {
						var re = (s - ae) / 2;
						p.forEach((function (e, t) {
							p[t] = e - re
						})), c.forEach((function (e, t) {
							c[t] = e + re
						}))
					}
				}
				n.extend(this, {
					slides: d,
					snapGrid: p,
					slidesGrid: c,
					slidesSizesGrid: u
				}), h !== l && this.emit("slidesLengthChange"), p.length !== g && (this.params.watchOverflow && this.checkOverflow(), this.emit("snapGridLengthChange")), c.length !== b && this.emit("slidesGridLengthChange"), (e.watchSlidesProgress || e.watchSlidesVisibility) && this.updateSlidesOffset()
			}
		}, updateAutoHeight: function (e) {
			var t, i = [], s = 0;
			if ("number" == typeof e ? this.setTransition(e) : !0 === e && this.setTransition(this.params.speed), "auto" !== this.params.slidesPerView && this.params.slidesPerView > 1) for (t = 0; t < Math.ceil(this.params.slidesPerView); t += 1) {
				var a = this.activeIndex + t;
				if (a > this.slides.length) break;
				i.push(this.slides.eq(a)[0])
			} else i.push(this.slides.eq(this.activeIndex)[0]);
			for (t = 0; t < i.length; t += 1) if (void 0 !== i[t]) {
				var r = i[t].offsetHeight;
				s = r > s ? r : s
			}
			s && this.$wrapperEl.css("height", s + "px")
		}, updateSlidesOffset: function () {
			for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
		}, updateSlidesProgress: function (e) {
			void 0 === e && (e = this && this.translate || 0);
			var t = this.params, i = this.slides, a = this.rtlTranslate;
			if (0 !== i.length) {
				void 0 === i[0].swiperSlideOffset && this.updateSlidesOffset();
				var r = -e;
				a && (r = e), i.removeClass(t.slideVisibleClass), this.visibleSlidesIndexes = [], this.visibleSlides = [];
				for (var n = 0; n < i.length; n += 1) {
					var o = i[n],
						l = (r + (t.centeredSlides ? this.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + t.spaceBetween);
					if (t.watchSlidesVisibility) {
						var d = -(r - o.swiperSlideOffset), h = d + this.slidesSizesGrid[n];
						(d >= 0 && d < this.size - 1 || h > 1 && h <= this.size || d <= 0 && h >= this.size) && (this.visibleSlides.push(o), this.visibleSlidesIndexes.push(n), i.eq(n).addClass(t.slideVisibleClass))
					}
					o.progress = a ? -l : l
				}
				this.visibleSlides = s(this.visibleSlides)
			}
		}, updateProgress: function (e) {
			if (void 0 === e) {
				var t = this.rtlTranslate ? -1 : 1;
				e = this && this.translate && this.translate * t || 0
			}
			var i = this.params, s = this.maxTranslate() - this.minTranslate(), a = this.progress, r = this.isBeginning,
				o = this.isEnd, l = r, d = o;
			0 === s ? (a = 0, r = !0, o = !0) : (r = (a = (e - this.minTranslate()) / s) <= 0, o = a >= 1), n.extend(this, {
				progress: a,
				isBeginning: r,
				isEnd: o
			}), (i.watchSlidesProgress || i.watchSlidesVisibility) && this.updateSlidesProgress(e), r && !l && this.emit("reachBeginning toEdge"), o && !d && this.emit("reachEnd toEdge"), (l && !r || d && !o) && this.emit("fromEdge"), this.emit("progress", a)
		}, updateSlidesClasses: function () {
			var e, t = this.slides, i = this.params, s = this.$wrapperEl, a = this.activeIndex, r = this.realIndex,
				n = this.virtual && i.virtual.enabled;
			t.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass), (e = n ? this.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + a + '"]') : t.eq(a)).addClass(i.slideActiveClass), i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass));
			var o = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
			i.loop && 0 === o.length && (o = t.eq(0)).addClass(i.slideNextClass);
			var l = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
			i.loop && 0 === l.length && (l = t.eq(-1)).addClass(i.slidePrevClass), i.loop && (o.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass), l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass))
		}, updateActiveIndex: function (e) {
			var t, i = this.rtlTranslate ? this.translate : -this.translate, s = this.slidesGrid, a = this.snapGrid,
				r = this.params, o = this.activeIndex, l = this.realIndex, d = this.snapIndex, h = e;
			if (void 0 === h) {
				for (var p = 0; p < s.length; p += 1) void 0 !== s[p + 1] ? i >= s[p] && i < s[p + 1] - (s[p + 1] - s[p]) / 2 ? h = p : i >= s[p] && i < s[p + 1] && (h = p + 1) : i >= s[p] && (h = p);
				r.normalizeSlideIndex && (h < 0 || void 0 === h) && (h = 0)
			}
			if ((t = a.indexOf(i) >= 0 ? a.indexOf(i) : Math.floor(h / r.slidesPerGroup)) >= a.length && (t = a.length - 1), h !== o) {
				var c = parseInt(this.slides.eq(h).attr("data-swiper-slide-index") || h, 10);
				n.extend(this, {
					snapIndex: t,
					realIndex: c,
					previousIndex: o,
					activeIndex: h
				}), this.emit("activeIndexChange"), this.emit("snapIndexChange"), l !== c && this.emit("realIndexChange"), (this.initialized || this.runCallbacksOnInit) && this.emit("slideChange")
			} else t !== d && (this.snapIndex = t, this.emit("snapIndexChange"))
		}, updateClickedSlide: function (e) {
			var t = this.params, i = s(e.target).closest("." + t.slideClass)[0], a = !1;
			if (i) for (var r = 0; r < this.slides.length; r += 1) this.slides[r] === i && (a = !0);
			if (!i || !a) return this.clickedSlide = void 0, void (this.clickedIndex = void 0);
			this.clickedSlide = i, this.virtual && this.params.virtual.enabled ? this.clickedIndex = parseInt(s(i).attr("data-swiper-slide-index"), 10) : this.clickedIndex = s(i).index(), t.slideToClickedSlide && void 0 !== this.clickedIndex && this.clickedIndex !== this.activeIndex && this.slideToClickedSlide()
		}
	};
	var p = {
		getTranslate: function (e) {
			void 0 === e && (e = this.isHorizontal() ? "x" : "y");
			var t = this.params, i = this.rtlTranslate, s = this.translate, a = this.$wrapperEl;
			if (t.virtualTranslate) return i ? -s : s;
			if (t.cssMode) return s;
			var r = n.getTranslate(a[0], e);
			return i && (r = -r), r || 0
		}, setTranslate: function (e, t) {
			var i = this.rtlTranslate, s = this.params, a = this.$wrapperEl, r = this.wrapperEl, n = this.progress,
				o = 0, l = 0;
			this.isHorizontal() ? o = i ? -e : e : l = e, s.roundLengths && (o = Math.floor(o), l = Math.floor(l)), s.cssMode ? r[this.isHorizontal() ? "scrollLeft" : "scrollTop"] = this.isHorizontal() ? -o : -l : s.virtualTranslate || a.transform("translate3d(" + o + "px, " + l + "px, 0px)"), this.previousTranslate = this.translate, this.translate = this.isHorizontal() ? o : l;
			var d = this.maxTranslate() - this.minTranslate();
			(0 === d ? 0 : (e - this.minTranslate()) / d) !== n && this.updateProgress(e), this.emit("setTranslate", this.translate, t)
		}, minTranslate: function () {
			return -this.snapGrid[0]
		}, maxTranslate: function () {
			return -this.snapGrid[this.snapGrid.length - 1]
		}, translateTo: function (e, t, i, s, a) {
			var r;
			void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), void 0 === s && (s = !0);
			var n = this, o = n.params, l = n.wrapperEl;
			if (n.animating && o.preventInteractionOnTransition) return !1;
			var d, h = n.minTranslate(), p = n.maxTranslate();
			if (d = s && e > h ? h : s && e < p ? p : e, n.updateProgress(d), o.cssMode) {
				var c = n.isHorizontal();
				return 0 === t ? l[c ? "scrollLeft" : "scrollTop"] = -d : l.scrollTo ? l.scrollTo(((r = {})[c ? "left" : "top"] = -d, r.behavior = "smooth", r)) : l[c ? "scrollLeft" : "scrollTop"] = -d, !0
			}
			return 0 === t ? (n.setTransition(0), n.setTranslate(d), i && (n.emit("beforeTransitionStart", t, a), n.emit("transitionEnd"))) : (n.setTransition(t), n.setTranslate(d), i && (n.emit("beforeTransitionStart", t, a), n.emit("transitionStart")), n.animating || (n.animating = !0, n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function (e) {
				n && !n.destroyed && e.target === this && (n.$wrapperEl[0].removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.$wrapperEl[0].removeEventListener("webkitTransitionEnd", n.onTranslateToWrapperTransitionEnd), n.onTranslateToWrapperTransitionEnd = null, delete n.onTranslateToWrapperTransitionEnd, i && n.emit("transitionEnd"))
			}), n.$wrapperEl[0].addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.$wrapperEl[0].addEventListener("webkitTransitionEnd", n.onTranslateToWrapperTransitionEnd))), !0
		}
	};
	var c = {
		setTransition: function (e, t) {
			this.params.cssMode || this.$wrapperEl.transition(e), this.emit("setTransition", e, t)
		}, transitionStart: function (e, t) {
			void 0 === e && (e = !0);
			var i = this.activeIndex, s = this.params, a = this.previousIndex;
			if (!s.cssMode) {
				s.autoHeight && this.updateAutoHeight();
				var r = t;
				if (r || (r = i > a ? "next" : i < a ? "prev" : "reset"), this.emit("transitionStart"), e && i !== a) {
					if ("reset" === r) return void this.emit("slideResetTransitionStart");
					this.emit("slideChangeTransitionStart"), "next" === r ? this.emit("slideNextTransitionStart") : this.emit("slidePrevTransitionStart")
				}
			}
		}, transitionEnd: function (e, t) {
			void 0 === e && (e = !0);
			var i = this.activeIndex, s = this.previousIndex, a = this.params;
			if (this.animating = !1, !a.cssMode) {
				this.setTransition(0);
				var r = t;
				if (r || (r = i > s ? "next" : i < s ? "prev" : "reset"), this.emit("transitionEnd"), e && i !== s) {
					if ("reset" === r) return void this.emit("slideResetTransitionEnd");
					this.emit("slideChangeTransitionEnd"), "next" === r ? this.emit("slideNextTransitionEnd") : this.emit("slidePrevTransitionEnd")
				}
			}
		}
	};
	var u = {
		slideTo: function (e, t, i, s) {
			var a;
			void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
			var r = this, n = e;
			n < 0 && (n = 0);
			var o = r.params, l = r.snapGrid, d = r.slidesGrid, h = r.previousIndex, p = r.activeIndex,
				c = r.rtlTranslate, u = r.wrapperEl;
			if (r.animating && o.preventInteractionOnTransition) return !1;
			var v = Math.floor(n / o.slidesPerGroup);
			v >= l.length && (v = l.length - 1), (p || o.initialSlide || 0) === (h || 0) && i && r.emit("beforeSlideChangeStart");
			var f, m = -l[v];
			if (r.updateProgress(m), o.normalizeSlideIndex) for (var g = 0; g < d.length; g += 1) -Math.floor(100 * m) >= Math.floor(100 * d[g]) && (n = g);
			if (r.initialized && n !== p) {
				if (!r.allowSlideNext && m < r.translate && m < r.minTranslate()) return !1;
				if (!r.allowSlidePrev && m > r.translate && m > r.maxTranslate() && (p || 0) !== n) return !1
			}
			if (f = n > p ? "next" : n < p ? "prev" : "reset", c && -m === r.translate || !c && m === r.translate) return r.updateActiveIndex(n), o.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== o.effect && r.setTranslate(m), "reset" !== f && (r.transitionStart(i, f), r.transitionEnd(i, f)), !1;
			if (o.cssMode) {
				var b = r.isHorizontal();
				return 0 === t ? u[b ? "scrollLeft" : "scrollTop"] = -m : u.scrollTo ? u.scrollTo(((a = {})[b ? "left" : "top"] = -m, a.behavior = "smooth", a)) : u[b ? "scrollLeft" : "scrollTop"] = -m, !0
			}
			return 0 === t ? (r.setTransition(0), r.setTranslate(m), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, s), r.transitionStart(i, f), r.transitionEnd(i, f)) : (r.setTransition(t), r.setTranslate(m), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, s), r.transitionStart(i, f), r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function (e) {
				r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(i, f))
			}), r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd))), !0
		}, slideToLoop: function (e, t, i, s) {
			void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
			var a = e;
			return this.params.loop && (a += this.loopedSlides), this.slideTo(a, t, i, s)
		}, slideNext: function (e, t, i) {
			void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
			var s = this.params, a = this.animating;
			return s.loop ? !a && (this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft, this.slideTo(this.activeIndex + s.slidesPerGroup, e, t, i)) : this.slideTo(this.activeIndex + s.slidesPerGroup, e, t, i)
		}, slidePrev: function (e, t, i) {
			void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
			var s = this.params, a = this.animating, r = this.snapGrid, n = this.slidesGrid, o = this.rtlTranslate;
			if (s.loop) {
				if (a) return !1;
				this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft
			}

			function l(e) {
				return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
			}

			var d, h = l(o ? this.translate : -this.translate), p = r.map((function (e) {
				return l(e)
			})), c = (n.map((function (e) {
				return l(e)
			})), r[p.indexOf(h)], r[p.indexOf(h) - 1]);
			return void 0 === c && s.cssMode && r.forEach((function (e) {
				!c && h >= e && (c = e)
			})), void 0 !== c && (d = n.indexOf(c)) < 0 && (d = this.activeIndex - 1), this.slideTo(d, e, t, i)
		}, slideReset: function (e, t, i) {
			return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, i)
		}, slideToClosest: function (e, t, i, s) {
			void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === s && (s = .5);
			var a = this.activeIndex, r = Math.floor(a / this.params.slidesPerGroup),
				n = this.rtlTranslate ? this.translate : -this.translate;
			if (n >= this.snapGrid[r]) {
				var o = this.snapGrid[r];
				n - o > (this.snapGrid[r + 1] - o) * s && (a += this.params.slidesPerGroup)
			} else {
				var l = this.snapGrid[r - 1];
				n - l <= (this.snapGrid[r] - l) * s && (a -= this.params.slidesPerGroup)
			}
			return a = Math.max(a, 0), a = Math.min(a, this.snapGrid.length - 1), this.slideTo(a, e, t, i)
		}, slideToClickedSlide: function () {
			var e, t = this, i = t.params, a = t.$wrapperEl,
				r = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView, o = t.clickedIndex;
			if (i.loop) {
				if (t.animating) return;
				e = parseInt(s(t.clickedSlide).attr("data-swiper-slide-index"), 10), i.centeredSlides ? o < t.loopedSlides - r / 2 || o > t.slides.length - t.loopedSlides + r / 2 ? (t.loopFix(), o = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), n.nextTick((function () {
					t.slideTo(o)
				}))) : t.slideTo(o) : o > t.slides.length - r ? (t.loopFix(), o = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), n.nextTick((function () {
					t.slideTo(o)
				}))) : t.slideTo(o)
			} else t.slideTo(o)
		}
	};
	var v = {
		loopCreate: function () {
			var t = this, i = t.params, a = t.$wrapperEl;
			a.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
			var r = a.children("." + i.slideClass);
			if (i.loopFillGroupWithBlank) {
				var n = i.slidesPerGroup - r.length % i.slidesPerGroup;
				if (n !== i.slidesPerGroup) {
					for (var o = 0; o < n; o += 1) {
						var l = s(e.createElement("div")).addClass(i.slideClass + " " + i.slideBlankClass);
						a.append(l)
					}
					r = a.children("." + i.slideClass)
				}
			}
			"auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = r.length), t.loopedSlides = Math.ceil(parseFloat(i.loopedSlides || i.slidesPerView, 10)), t.loopedSlides += i.loopAdditionalSlides, t.loopedSlides > r.length && (t.loopedSlides = r.length);
			var d = [], h = [];
			r.each((function (e, i) {
				var a = s(i);
				e < t.loopedSlides && h.push(i), e < r.length && e >= r.length - t.loopedSlides && d.push(i), a.attr("data-swiper-slide-index", e)
			}));
			for (var p = 0; p < h.length; p += 1) a.append(s(h[p].cloneNode(!0)).addClass(i.slideDuplicateClass));
			for (var c = d.length - 1; c >= 0; c -= 1) a.prepend(s(d[c].cloneNode(!0)).addClass(i.slideDuplicateClass))
		}, loopFix: function () {
			var e, t = this.activeIndex, i = this.slides, s = this.loopedSlides, a = this.allowSlidePrev,
				r = this.allowSlideNext, n = this.snapGrid, o = this.rtlTranslate;
			this.allowSlidePrev = !0, this.allowSlideNext = !0;
			var l = -n[t] - this.getTranslate();
			if (t < s) e = i.length - 3 * s + t, e += s, this.slideTo(e, 0, !1, !0) && 0 !== l && this.setTranslate((o ? -this.translate : this.translate) - l); else if (t >= i.length - s) {
				e = -i.length + t + s, e += s, this.slideTo(e, 0, !1, !0) && 0 !== l && this.setTranslate((o ? -this.translate : this.translate) - l)
			}
			this.allowSlidePrev = a, this.allowSlideNext = r
		}, loopDestroy: function () {
			var e = this.$wrapperEl, t = this.params, i = this.slides;
			e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(), i.removeAttr("data-swiper-slide-index")
		}
	};
	var f = {
		setGrabCursor: function (e) {
			if (!(o.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked || this.params.cssMode)) {
				var t = this.el;
				t.style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab"
			}
		}, unsetGrabCursor: function () {
			o.touch || this.params.watchOverflow && this.isLocked || this.params.cssMode || (this.el.style.cursor = "")
		}
	};
	var m, g, b, w, y, x, T, E, C, S, M, P, z, k, $, L = {
		appendSlide: function (e) {
			var t = this.$wrapperEl, i = this.params;
			if (i.loop && this.loopDestroy(), "object" == typeof e && "length" in e) for (var s = 0; s < e.length; s += 1) e[s] && t.append(e[s]); else t.append(e);
			i.loop && this.loopCreate(), i.observer && o.observer || this.update()
		}, prependSlide: function (e) {
			var t = this.params, i = this.$wrapperEl, s = this.activeIndex;
			t.loop && this.loopDestroy();
			var a = s + 1;
			if ("object" == typeof e && "length" in e) {
				for (var r = 0; r < e.length; r += 1) e[r] && i.prepend(e[r]);
				a = s + e.length
			} else i.prepend(e);
			t.loop && this.loopCreate(), t.observer && o.observer || this.update(), this.slideTo(a, 0, !1)
		}, addSlide: function (e, t) {
			var i = this.$wrapperEl, s = this.params, a = this.activeIndex;
			s.loop && (a -= this.loopedSlides, this.loopDestroy(), this.slides = i.children("." + s.slideClass));
			var r = this.slides.length;
			if (e <= 0) this.prependSlide(t); else if (e >= r) this.appendSlide(t); else {
				for (var n = a > e ? a + 1 : a, l = [], d = r - 1; d >= e; d -= 1) {
					var h = this.slides.eq(d);
					h.remove(), l.unshift(h)
				}
				if ("object" == typeof t && "length" in t) {
					for (var p = 0; p < t.length; p += 1) t[p] && i.append(t[p]);
					n = a > e ? a + t.length : a
				} else i.append(t);
				for (var c = 0; c < l.length; c += 1) i.append(l[c]);
				s.loop && this.loopCreate(), s.observer && o.observer || this.update(), s.loop ? this.slideTo(n + this.loopedSlides, 0, !1) : this.slideTo(n, 0, !1)
			}
		}, removeSlide: function (e) {
			var t = this.params, i = this.$wrapperEl, s = this.activeIndex;
			t.loop && (s -= this.loopedSlides, this.loopDestroy(), this.slides = i.children("." + t.slideClass));
			var a, r = s;
			if ("object" == typeof e && "length" in e) {
				for (var n = 0; n < e.length; n += 1) a = e[n], this.slides[a] && this.slides.eq(a).remove(), a < r && (r -= 1);
				r = Math.max(r, 0)
			} else a = e, this.slides[a] && this.slides.eq(a).remove(), a < r && (r -= 1), r = Math.max(r, 0);
			t.loop && this.loopCreate(), t.observer && o.observer || this.update(), t.loop ? this.slideTo(r + this.loopedSlides, 0, !1) : this.slideTo(r, 0, !1)
		}, removeAllSlides: function () {
			for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
			this.removeSlide(e)
		}
	}, I = (m = t.navigator.platform, g = t.navigator.userAgent, b = {
		ios: !1,
		android: !1,
		androidChrome: !1,
		desktop: !1,
		iphone: !1,
		ipod: !1,
		ipad: !1,
		edge: !1,
		ie: !1,
		firefox: !1,
		macos: !1,
		windows: !1,
		cordova: !(!t.cordova && !t.phonegap),
		phonegap: !(!t.cordova && !t.phonegap),
		electron: !1
	}, w = t.screen.width, y = t.screen.height, x = g.match(/(Android);?[\s\/]+([\d.]+)?/), T = g.match(/(iPad).*OS\s([\d_]+)/), E = g.match(/(iPod)(.*OS\s([\d_]+))?/), C = !T && g.match(/(iPhone\sOS|iOS)\s([\d_]+)/), S = g.indexOf("MSIE ") >= 0 || g.indexOf("Trident/index.html") >= 0, M = g.indexOf("Edge/index.html") >= 0, P = g.indexOf("Gecko/index.html") >= 0 && g.indexOf("Firefox/index.html") >= 0, z = "Win32" === m, k = g.toLowerCase().indexOf("electron") >= 0, $ = "MacIntel" === m, !T && $ && o.touch && (1024 === w && 1366 === y || 834 === w && 1194 === y || 834 === w && 1112 === y || 768 === w && 1024 === y) && (T = g.match(/(Version)\/([\d.]+)/), $ = !1), b.ie = S, b.edge = M, b.firefox = P, x && !z && (b.os = "android", b.osVersion = x[2], b.android = !0, b.androidChrome = g.toLowerCase().indexOf("chrome") >= 0), (T || C || E) && (b.os = "ios", b.ios = !0), C && !E && (b.osVersion = C[2].replace(/_/g, "."), b.iphone = !0), T && (b.osVersion = T[2].replace(/_/g, "."), b.ipad = !0), E && (b.osVersion = E[3] ? E[3].replace(/_/g, ".") : null, b.ipod = !0), b.ios && b.osVersion && g.indexOf("Version/index.html") >= 0 && "10" === b.osVersion.split(".")[0] && (b.osVersion = g.toLowerCase().split("version/index-2.html")[1].split(" ")[0]), b.webView = !(!(C || T || E) || !g.match(/.*AppleWebKit(?!.*Safari)/i) && !t.navigator.standalone) || t.matchMedia && t.matchMedia("(display-mode: standalone)").matches, b.webview = b.webView, b.standalone = b.webView, b.desktop = !(b.ios || b.android) || k, b.desktop && (b.electron = k, b.macos = $, b.windows = z, b.macos && (b.os = "macos"), b.windows && (b.os = "windows")), b.pixelRatio = t.devicePixelRatio || 1, b);

	function D(i) {
		var a = this.touchEventsData, r = this.params, o = this.touches;
		if (!this.animating || !r.preventInteractionOnTransition) {
			var l = i;
			l.originalEvent && (l = l.originalEvent);
			var d = s(l.target);
			if (("wrapper" !== r.touchEventsTarget || d.closest(this.wrapperEl).length) && (a.isTouchEvent = "touchstart" === l.type, (a.isTouchEvent || !("which" in l) || 3 !== l.which) && !(!a.isTouchEvent && "button" in l && l.button > 0 || a.isTouched && a.isMoved))) if (r.noSwiping && d.closest(r.noSwipingSelector ? r.noSwipingSelector : "." + r.noSwipingClass)[0]) this.allowClick = !0; else if (!r.swipeHandler || d.closest(r.swipeHandler)[0]) {
				o.currentX = "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX, o.currentY = "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY;
				var h = o.currentX, p = o.currentY, c = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
					u = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
				if (!c || !(h <= u || h >= t.screen.width - u)) {
					if (n.extend(a, {
						isTouched: !0,
						isMoved: !1,
						allowTouchCallbacks: !0,
						isScrolling: void 0,
						startMoving: void 0
					}), o.startX = h, o.startY = p, a.touchStartTime = n.now(), this.allowClick = !0, this.updateSize(), this.swipeDirection = void 0, r.threshold > 0 && (a.allowThresholdMove = !1), "touchstart" !== l.type) {
						var v = !0;
						d.is(a.formElements) && (v = !1), e.activeElement && s(e.activeElement).is(a.formElements) && e.activeElement !== d[0] && e.activeElement.blur();
						var f = v && this.allowTouchMove && r.touchStartPreventDefault;
						(r.touchStartForcePreventDefault || f) && l.preventDefault()
					}
					this.emit("touchStart", l)
				}
			}
		}
	}

	function O(t) {
		var i = this.touchEventsData, a = this.params, r = this.touches, o = this.rtlTranslate, l = t;
		if (l.originalEvent && (l = l.originalEvent), i.isTouched) {
			if (!i.isTouchEvent || "mousemove" !== l.type) {
				var d = "touchmove" === l.type && l.targetTouches && (l.targetTouches[0] || l.changedTouches[0]),
					h = "touchmove" === l.type ? d.pageX : l.pageX, p = "touchmove" === l.type ? d.pageY : l.pageY;
				if (l.preventedByNestedSwiper) return r.startX = h, void (r.startY = p);
				if (!this.allowTouchMove) return this.allowClick = !1, void (i.isTouched && (n.extend(r, {
					startX: h,
					startY: p,
					currentX: h,
					currentY: p
				}), i.touchStartTime = n.now()));
				if (i.isTouchEvent && a.touchReleaseOnEdges && !a.loop) if (this.isVertical()) {
					if (p < r.startY && this.translate <= this.maxTranslate() || p > r.startY && this.translate >= this.minTranslate()) return i.isTouched = !1, void (i.isMoved = !1)
				} else if (h < r.startX && this.translate <= this.maxTranslate() || h > r.startX && this.translate >= this.minTranslate()) return;
				if (i.isTouchEvent && e.activeElement && l.target === e.activeElement && s(l.target).is(i.formElements)) return i.isMoved = !0, void (this.allowClick = !1);
				if (i.allowTouchCallbacks && this.emit("touchMove", l), !(l.targetTouches && l.targetTouches.length > 1)) {
					r.currentX = h, r.currentY = p;
					var c = r.currentX - r.startX, u = r.currentY - r.startY;
					if (!(this.params.threshold && Math.sqrt(Math.pow(c, 2) + Math.pow(u, 2)) < this.params.threshold)) {
						var v;
						if (void 0 === i.isScrolling) this.isHorizontal() && r.currentY === r.startY || this.isVertical() && r.currentX === r.startX ? i.isScrolling = !1 : c * c + u * u >= 25 && (v = 180 * Math.atan2(Math.abs(u), Math.abs(c)) / Math.PI, i.isScrolling = this.isHorizontal() ? v > a.touchAngle : 90 - v > a.touchAngle);
						if (i.isScrolling && this.emit("touchMoveOpposite", l), void 0 === i.startMoving && (r.currentX === r.startX && r.currentY === r.startY || (i.startMoving = !0)), i.isScrolling) i.isTouched = !1; else if (i.startMoving) {
							this.allowClick = !1, a.cssMode || l.preventDefault(), a.touchMoveStopPropagation && !a.nested && l.stopPropagation(), i.isMoved || (a.loop && this.loopFix(), i.startTranslate = this.getTranslate(), this.setTransition(0), this.animating && this.$wrapperEl.trigger("webkitTransitionEnd transitionend"), i.allowMomentumBounce = !1, !a.grabCursor || !0 !== this.allowSlideNext && !0 !== this.allowSlidePrev || this.setGrabCursor(!0), this.emit("sliderFirstMove", l)), this.emit("sliderMove", l), i.isMoved = !0;
							var f = this.isHorizontal() ? c : u;
							r.diff = f, f *= a.touchRatio, o && (f = -f), this.swipeDirection = f > 0 ? "prev" : "next", i.currentTranslate = f + i.startTranslate;
							var m = !0, g = a.resistanceRatio;
							if (a.touchReleaseOnEdges && (g = 0), f > 0 && i.currentTranslate > this.minTranslate() ? (m = !1, a.resistance && (i.currentTranslate = this.minTranslate() - 1 + Math.pow(-this.minTranslate() + i.startTranslate + f, g))) : f < 0 && i.currentTranslate < this.maxTranslate() && (m = !1, a.resistance && (i.currentTranslate = this.maxTranslate() + 1 - Math.pow(this.maxTranslate() - i.startTranslate - f, g))), m && (l.preventedByNestedSwiper = !0), !this.allowSlideNext && "next" === this.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !this.allowSlidePrev && "prev" === this.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), a.threshold > 0) {
								if (!(Math.abs(f) > a.threshold || i.allowThresholdMove)) return void (i.currentTranslate = i.startTranslate);
								if (!i.allowThresholdMove) return i.allowThresholdMove = !0, r.startX = r.currentX, r.startY = r.currentY, i.currentTranslate = i.startTranslate, void (r.diff = this.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY)
							}
							a.followFinger && !a.cssMode && ((a.freeMode || a.watchSlidesProgress || a.watchSlidesVisibility) && (this.updateActiveIndex(), this.updateSlidesClasses()), a.freeMode && (0 === i.velocities.length && i.velocities.push({
								position: r[this.isHorizontal() ? "startX" : "startY"],
								time: i.touchStartTime
							}), i.velocities.push({
								position: r[this.isHorizontal() ? "currentX" : "currentY"],
								time: n.now()
							})), this.updateProgress(i.currentTranslate), this.setTranslate(i.currentTranslate))
						}
					}
				}
			}
		} else i.startMoving && i.isScrolling && this.emit("touchMoveOpposite", l)
	}

	function A(e) {
		var t = this, i = t.touchEventsData, s = t.params, a = t.touches, r = t.rtlTranslate, o = t.$wrapperEl,
			l = t.slidesGrid, d = t.snapGrid, h = e;
		if (h.originalEvent && (h = h.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", h), i.allowTouchCallbacks = !1, !i.isTouched) return i.isMoved && s.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, void (i.startMoving = !1);
		s.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
		var p, c = n.now(), u = c - i.touchStartTime;
		if (t.allowClick && (t.updateClickedSlide(h), t.emit("tap click", h), u < 300 && c - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", h)), i.lastClickTime = n.now(), n.nextTick((function () {
			t.destroyed || (t.allowClick = !0)
		})), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === a.diff || i.currentTranslate === i.startTranslate) return i.isTouched = !1, i.isMoved = !1, void (i.startMoving = !1);
		if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, p = s.followFinger ? r ? t.translate : -t.translate : -i.currentTranslate, !s.cssMode) if (s.freeMode) {
			if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
			if (p > -t.maxTranslate()) return void (t.slides.length < d.length ? t.slideTo(d.length - 1) : t.slideTo(t.slides.length - 1));
			if (s.freeModeMomentum) {
				if (i.velocities.length > 1) {
					var v = i.velocities.pop(), f = i.velocities.pop(), m = v.position - f.position,
						g = v.time - f.time;
					t.velocity = m / g, t.velocity /= 2, Math.abs(t.velocity) < s.freeModeMinimumVelocity && (t.velocity = 0), (g > 150 || n.now() - v.time > 300) && (t.velocity = 0)
				} else t.velocity = 0;
				t.velocity *= s.freeModeMomentumVelocityRatio, i.velocities.length = 0;
				var b = 1e3 * s.freeModeMomentumRatio, w = t.velocity * b, y = t.translate + w;
				r && (y = -y);
				var x, T, E = !1, C = 20 * Math.abs(t.velocity) * s.freeModeMomentumBounceRatio;
				if (y < t.maxTranslate()) s.freeModeMomentumBounce ? (y + t.maxTranslate() < -C && (y = t.maxTranslate() - C), x = t.maxTranslate(), E = !0, i.allowMomentumBounce = !0) : y = t.maxTranslate(), s.loop && s.centeredSlides && (T = !0); else if (y > t.minTranslate()) s.freeModeMomentumBounce ? (y - t.minTranslate() > C && (y = t.minTranslate() + C), x = t.minTranslate(), E = !0, i.allowMomentumBounce = !0) : y = t.minTranslate(), s.loop && s.centeredSlides && (T = !0); else if (s.freeModeSticky) {
					for (var S, M = 0; M < d.length; M += 1) if (d[M] > -y) {
						S = M;
						break
					}
					y = -(y = Math.abs(d[S] - y) < Math.abs(d[S - 1] - y) || "next" === t.swipeDirection ? d[S] : d[S - 1])
				}
				if (T && t.once("transitionEnd", (function () {
					t.loopFix()
				})), 0 !== t.velocity) {
					if (b = r ? Math.abs((-y - t.translate) / t.velocity) : Math.abs((y - t.translate) / t.velocity), s.freeModeSticky) {
						var P = Math.abs((r ? -y : y) - t.translate), z = t.slidesSizesGrid[t.activeIndex];
						b = P < z ? s.speed : P < 2 * z ? 1.5 * s.speed : 2.5 * s.speed
					}
				} else if (s.freeModeSticky) return void t.slideToClosest();
				s.freeModeMomentumBounce && E ? (t.updateProgress(x), t.setTransition(b), t.setTranslate(y), t.transitionStart(!0, t.swipeDirection), t.animating = !0, o.transitionEnd((function () {
					t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(s.speed), t.setTranslate(x), o.transitionEnd((function () {
						t && !t.destroyed && t.transitionEnd()
					})))
				}))) : t.velocity ? (t.updateProgress(y), t.setTransition(b), t.setTranslate(y), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, o.transitionEnd((function () {
					t && !t.destroyed && t.transitionEnd()
				})))) : t.updateProgress(y), t.updateActiveIndex(), t.updateSlidesClasses()
			} else if (s.freeModeSticky) return void t.slideToClosest();
			(!s.freeModeMomentum || u >= s.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
		} else {
			for (var k = 0, $ = t.slidesSizesGrid[0], L = 0; L < l.length; L += s.slidesPerGroup) void 0 !== l[L + s.slidesPerGroup] ? p >= l[L] && p < l[L + s.slidesPerGroup] && (k = L, $ = l[L + s.slidesPerGroup] - l[L]) : p >= l[L] && (k = L, $ = l[l.length - 1] - l[l.length - 2]);
			var I = (p - l[k]) / $;
			if (u > s.longSwipesMs) {
				if (!s.longSwipes) return void t.slideTo(t.activeIndex);
				"next" === t.swipeDirection && (I >= s.longSwipesRatio ? t.slideTo(k + s.slidesPerGroup) : t.slideTo(k)), "prev" === t.swipeDirection && (I > 1 - s.longSwipesRatio ? t.slideTo(k + s.slidesPerGroup) : t.slideTo(k))
			} else {
				if (!s.shortSwipes) return void t.slideTo(t.activeIndex);
				t.navigation && (h.target === t.navigation.nextEl || h.target === t.navigation.prevEl) ? h.target === t.navigation.nextEl ? t.slideTo(k + s.slidesPerGroup) : t.slideTo(k) : ("next" === t.swipeDirection && t.slideTo(k + s.slidesPerGroup), "prev" === t.swipeDirection && t.slideTo(k))
			}
		}
	}

	function G() {
		var e = this.params, t = this.el;
		if (!t || 0 !== t.offsetWidth) {
			e.breakpoints && this.setBreakpoint();
			var i = this.allowSlideNext, s = this.allowSlidePrev, a = this.snapGrid;
			this.allowSlideNext = !0, this.allowSlidePrev = !0, this.updateSize(), this.updateSlides(), this.updateSlidesClasses(), ("auto" === e.slidesPerView || e.slidesPerView > 1) && this.isEnd && !this.params.centeredSlides ? this.slideTo(this.slides.length - 1, 0, !1, !0) : this.slideTo(this.activeIndex, 0, !1, !0), this.autoplay && this.autoplay.running && this.autoplay.paused && this.autoplay.run(), this.allowSlidePrev = s, this.allowSlideNext = i, this.params.watchOverflow && a !== this.snapGrid && this.checkOverflow()
		}
	}

	function B(e) {
		this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
	}

	function H() {
		var e = this.wrapperEl;
		this.previousTranslate = this.translate, this.translate = this.isHorizontal() ? -e.scrollLeft : -e.scrollTop, -0 === this.translate && (this.translate = 0), this.updateActiveIndex(), this.updateSlidesClasses();
		var t = this.maxTranslate() - this.minTranslate();
		(0 === t ? 0 : (this.translate - this.minTranslate()) / t) !== this.progress && this.updateProgress(this.translate), this.emit("setTranslate", this.translate, !1)
	}

	var N = !1;

	function X() {
	}

	var V = {
			init: !0,
			direction: "horizontal",
			touchEventsTarget: "container",
			initialSlide: 0,
			speed: 300,
			cssMode: !1,
			preventInteractionOnTransition: !1,
			edgeSwipeDetection: !1,
			edgeSwipeThreshold: 20,
			freeMode: !1,
			freeModeMomentum: !0,
			freeModeMomentumRatio: 1,
			freeModeMomentumBounce: !0,
			freeModeMomentumBounceRatio: 1,
			freeModeMomentumVelocityRatio: 1,
			freeModeSticky: !1,
			freeModeMinimumVelocity: .02,
			autoHeight: !1,
			setWrapperSize: !1,
			virtualTranslate: !1,
			effect: "slide",
			breakpoints: void 0,
			spaceBetween: 0,
			slidesPerView: 1,
			slidesPerColumn: 1,
			slidesPerColumnFill: "column",
			slidesPerGroup: 1,
			centeredSlides: !1,
			centeredSlidesBounds: !1,
			slidesOffsetBefore: 0,
			slidesOffsetAfter: 0,
			normalizeSlideIndex: !0,
			centerInsufficientSlides: !1,
			watchOverflow: !1,
			roundLengths: !1,
			touchRatio: 1,
			touchAngle: 45,
			simulateTouch: !0,
			shortSwipes: !0,
			longSwipes: !0,
			longSwipesRatio: .5,
			longSwipesMs: 300,
			followFinger: !0,
			allowTouchMove: !0,
			threshold: 0,
			touchMoveStopPropagation: !1,
			touchStartPreventDefault: !0,
			touchStartForcePreventDefault: !1,
			touchReleaseOnEdges: !1,
			uniqueNavElements: !0,
			resistance: !0,
			resistanceRatio: .85,
			watchSlidesProgress: !1,
			watchSlidesVisibility: !1,
			grabCursor: !1,
			preventClicks: !0,
			preventClicksPropagation: !0,
			slideToClickedSlide: !1,
			preloadImages: !0,
			updateOnImagesReady: !0,
			loop: !1,
			loopAdditionalSlides: 0,
			loopedSlides: null,
			loopFillGroupWithBlank: !1,
			allowSlidePrev: !0,
			allowSlideNext: !0,
			swipeHandler: null,
			noSwiping: !0,
			noSwipingClass: "swiper-no-swiping",
			noSwipingSelector: null,
			passiveListeners: !0,
			containerModifierClass: "swiper-container-",
			slideClass: "swiper-slide",
			slideBlankClass: "swiper-slide-invisible-blank",
			slideActiveClass: "swiper-slide-active",
			slideDuplicateActiveClass: "swiper-slide-duplicate-active",
			slideVisibleClass: "swiper-slide-visible",
			slideDuplicateClass: "swiper-slide-duplicate",
			slideNextClass: "swiper-slide-next",
			slideDuplicateNextClass: "swiper-slide-duplicate-next",
			slidePrevClass: "swiper-slide-prev",
			slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
			wrapperClass: "swiper-wrapper",
			runCallbacksOnInit: !0
		}, Y = {
			update: h, translate: p, transition: c, slide: u, loop: v, grabCursor: f, manipulation: L, events: {
				attachEvents: function () {
					var t = this.params, i = this.touchEvents, s = this.el, a = this.wrapperEl;
					this.onTouchStart = D.bind(this), this.onTouchMove = O.bind(this), this.onTouchEnd = A.bind(this), t.cssMode && (this.onScroll = H.bind(this)), this.onClick = B.bind(this);
					var r = !!t.nested;
					if (!o.touch && o.pointerEvents) s.addEventListener(i.start, this.onTouchStart, !1), e.addEventListener(i.move, this.onTouchMove, r), e.addEventListener(i.end, this.onTouchEnd, !1); else {
						if (o.touch) {
							var n = !("touchstart" !== i.start || !o.passiveListener || !t.passiveListeners) && {
								passive: !0,
								capture: !1
							};
							s.addEventListener(i.start, this.onTouchStart, n), s.addEventListener(i.move, this.onTouchMove, o.passiveListener ? {
								passive: !1,
								capture: r
							} : r), s.addEventListener(i.end, this.onTouchEnd, n), i.cancel && s.addEventListener(i.cancel, this.onTouchEnd, n), N || (e.addEventListener("touchstart", X), N = !0)
						}
						(t.simulateTouch && !I.ios && !I.android || t.simulateTouch && !o.touch && I.ios) && (s.addEventListener("mousedown", this.onTouchStart, !1), e.addEventListener("mousemove", this.onTouchMove, r), e.addEventListener("mouseup", this.onTouchEnd, !1))
					}
					(t.preventClicks || t.preventClicksPropagation) && s.addEventListener("click", this.onClick, !0), t.cssMode && a.addEventListener("scroll", this.onScroll), this.on(I.ios || I.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", G, !0)
				}, detachEvents: function () {
					var t = this.params, i = this.touchEvents, s = this.el, a = this.wrapperEl, r = !!t.nested;
					if (!o.touch && o.pointerEvents) s.removeEventListener(i.start, this.onTouchStart, !1), e.removeEventListener(i.move, this.onTouchMove, r), e.removeEventListener(i.end, this.onTouchEnd, !1); else {
						if (o.touch) {
							var n = !("onTouchStart" !== i.start || !o.passiveListener || !t.passiveListeners) && {
								passive: !0,
								capture: !1
							};
							s.removeEventListener(i.start, this.onTouchStart, n), s.removeEventListener(i.move, this.onTouchMove, r), s.removeEventListener(i.end, this.onTouchEnd, n), i.cancel && s.removeEventListener(i.cancel, this.onTouchEnd, n)
						}
						(t.simulateTouch && !I.ios && !I.android || t.simulateTouch && !o.touch && I.ios) && (s.removeEventListener("mousedown", this.onTouchStart, !1), e.removeEventListener("mousemove", this.onTouchMove, r), e.removeEventListener("mouseup", this.onTouchEnd, !1))
					}
					(t.preventClicks || t.preventClicksPropagation) && s.removeEventListener("click", this.onClick, !0), t.cssMode && a.removeEventListener("scroll", this.onScroll), this.off(I.ios || I.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", G)
				}
			}, breakpoints: {
				setBreakpoint: function () {
					var e = this.activeIndex, t = this.initialized, i = this.loopedSlides;
					void 0 === i && (i = 0);
					var s = this.params, a = this.$el, r = s.breakpoints;
					if (r && (!r || 0 !== Object.keys(r).length)) {
						var o = this.getBreakpoint(r);
						if (o && this.currentBreakpoint !== o) {
							var l = o in r ? r[o] : void 0;
							l && ["slidesPerView", "spaceBetween", "slidesPerGroup", "slidesPerColumn"].forEach((function (e) {
								var t = l[e];
								void 0 !== t && (l[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
							}));
							var d = l || this.originalParams, h = s.slidesPerColumn > 1, p = d.slidesPerColumn > 1;
							h && !p ? a.removeClass(s.containerModifierClass + "multirow " + s.containerModifierClass + "multirow-column") : !h && p && (a.addClass(s.containerModifierClass + "multirow"), "column" === d.slidesPerColumnFill && a.addClass(s.containerModifierClass + "multirow-column"));
							var c = d.direction && d.direction !== s.direction,
								u = s.loop && (d.slidesPerView !== s.slidesPerView || c);
							c && t && this.changeDirection(), n.extend(this.params, d), n.extend(this, {
								allowTouchMove: this.params.allowTouchMove,
								allowSlideNext: this.params.allowSlideNext,
								allowSlidePrev: this.params.allowSlidePrev
							}), this.currentBreakpoint = o, u && t && (this.loopDestroy(), this.loopCreate(), this.updateSlides(), this.slideTo(e - i + this.loopedSlides, 0, !1)), this.emit("breakpoint", d)
						}
					}
				}, getBreakpoint: function (e) {
					if (e) {
						var i = !1, s = [];
						Object.keys(e).forEach((function (e) {
							s.push(e)
						})), s.sort((function (e, t) {
							return parseInt(e, 10) - parseInt(t, 10)
						}));
						for (var a = 0; a < s.length; a += 1) {
							var r = s[a];
							r <= t.innerWidth && (i = r)
						}
						return i || "max"
					}
				}
			}, checkOverflow: {
				checkOverflow: function () {
					var e = this.params, t = this.isLocked,
						i = this.slides.length > 0 && e.slidesOffsetBefore + e.spaceBetween * (this.slides.length - 1) + this.slides[0].offsetWidth * this.slides.length;
					e.slidesOffsetBefore && e.slidesOffsetAfter && i ? this.isLocked = i <= this.size : this.isLocked = 1 === this.snapGrid.length, this.allowSlideNext = !this.isLocked, this.allowSlidePrev = !this.isLocked, t !== this.isLocked && this.emit(this.isLocked ? "lock" : "unlock"), t && t !== this.isLocked && (this.isEnd = !1, this.navigation.update())
				}
			}, classes: {
				addClasses: function () {
					var e = this.classNames, t = this.params, i = this.rtl, s = this.$el, a = [];
					a.push("initialized"), a.push(t.direction), t.freeMode && a.push("free-mode"), t.autoHeight && a.push("autoheight"), i && a.push("rtl"), t.slidesPerColumn > 1 && (a.push("multirow"), "column" === t.slidesPerColumnFill && a.push("multirow-column")), I.android && a.push("android"), I.ios && a.push("ios"), t.cssMode && a.push("css-mode"), a.forEach((function (i) {
						e.push(t.containerModifierClass + i)
					})), s.addClass(e.join(" "))
				}, removeClasses: function () {
					var e = this.$el, t = this.classNames;
					e.removeClass(t.join(" "))
				}
			}, images: {
				loadImage: function (e, i, s, a, r, n) {
					var o;

					function l() {
						n && n()
					}

					e.complete && r ? l() : i ? ((o = new t.Image).onload = l, o.onerror = l, a && (o.sizes = a), s && (o.srcset = s), i && (o.src = i)) : l()
				}, preloadImages: function () {
					var e = this;

					function t() {
						null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
					}

					e.imagesToLoad = e.$el.find("img");
					for (var i = 0; i < e.imagesToLoad.length; i += 1) {
						var s = e.imagesToLoad[i];
						e.loadImage(s, s.currentSrc || s.getAttribute("src"), s.srcset || s.getAttribute("srcset"), s.sizes || s.getAttribute("sizes"), !0, t)
					}
				}
			}
		}, F = {}, W = function (e) {
			function t() {
				for (var i, a, r, l = [], d = arguments.length; d--;) l[d] = arguments[d];
				1 === l.length && l[0].constructor && l[0].constructor === Object ? r = l[0] : (a = (i = l)[0], r = i[1]), r || (r = {}), r = n.extend({}, r), a && !r.el && (r.el = a), e.call(this, r), Object.keys(Y).forEach((function (e) {
					Object.keys(Y[e]).forEach((function (i) {
						t.prototype[i] || (t.prototype[i] = Y[e][i])
					}))
				}));
				var h = this;
				void 0 === h.modules && (h.modules = {}), Object.keys(h.modules).forEach((function (e) {
					var t = h.modules[e];
					if (t.params) {
						var i = Object.keys(t.params)[0], s = t.params[i];
						if ("object" != typeof s || null === s) return;
						if (!(i in r && "enabled" in s)) return;
						!0 === r[i] && (r[i] = {enabled: !0}), "object" != typeof r[i] || "enabled" in r[i] || (r[i].enabled = !0), r[i] || (r[i] = {enabled: !1})
					}
				}));
				var p = n.extend({}, V);
				h.useModulesParams(p), h.params = n.extend({}, p, F, r), h.originalParams = n.extend({}, h.params), h.passedParams = n.extend({}, r), h.$ = s;
				var c = s(h.params.el);
				if (a = c[0]) {
					if (c.length > 1) {
						var u = [];
						return c.each((function (e, i) {
							var s = n.extend({}, r, {el: i});
							u.push(new t(s))
						})), u
					}
					var v, f, m;
					return a.swiper = h, c.data("swiper", h), a && a.shadowRoot && a.shadowRoot.querySelector ? (v = s(a.shadowRoot.querySelector("." + h.params.wrapperClass))).children = function (e) {
						return c.children(e)
					} : v = c.children("." + h.params.wrapperClass), n.extend(h, {
						$el: c,
						el: a,
						$wrapperEl: v,
						wrapperEl: v[0],
						classNames: [],
						slides: s(),
						slidesGrid: [],
						snapGrid: [],
						slidesSizesGrid: [],
						isHorizontal: function () {
							return "horizontal" === h.params.direction
						},
						isVertical: function () {
							return "vertical" === h.params.direction
						},
						rtl: "rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction"),
						rtlTranslate: "horizontal" === h.params.direction && ("rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction")),
						wrongRTL: "-webkit-box" === v.css("display"),
						activeIndex: 0,
						realIndex: 0,
						isBeginning: !0,
						isEnd: !1,
						translate: 0,
						previousTranslate: 0,
						progress: 0,
						velocity: 0,
						animating: !1,
						allowSlideNext: h.params.allowSlideNext,
						allowSlidePrev: h.params.allowSlidePrev,
						touchEvents: (f = ["touchstart", "touchmove", "touchend", "touchcancel"], m = ["mousedown", "mousemove", "mouseup"], o.pointerEvents && (m = ["pointerdown", "pointermove", "pointerup"]), h.touchEventsTouch = {
							start: f[0],
							move: f[1],
							end: f[2],
							cancel: f[3]
						}, h.touchEventsDesktop = {
							start: m[0],
							move: m[1],
							end: m[2]
						}, o.touch || !h.params.simulateTouch ? h.touchEventsTouch : h.touchEventsDesktop),
						touchEventsData: {
							isTouched: void 0,
							isMoved: void 0,
							allowTouchCallbacks: void 0,
							touchStartTime: void 0,
							isScrolling: void 0,
							currentTranslate: void 0,
							startTranslate: void 0,
							allowThresholdMove: void 0,
							formElements: "input, select, option, textarea, button, video",
							lastClickTime: n.now(),
							clickTimeout: void 0,
							velocities: [],
							allowMomentumBounce: void 0,
							isTouchEvent: void 0,
							startMoving: void 0
						},
						allowClick: !0,
						allowTouchMove: h.params.allowTouchMove,
						touches: {startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0},
						imagesToLoad: [],
						imagesLoaded: 0
					}), h.useModules(), h.params.init && h.init(), h
				}
			}

			e && (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t;
			var i = {
				extendedDefaults: {configurable: !0},
				defaults: {configurable: !0},
				Class: {configurable: !0},
				$: {configurable: !0}
			};
			return t.prototype.slidesPerViewDynamic = function () {
				var e = this.params, t = this.slides, i = this.slidesGrid, s = this.size, a = this.activeIndex, r = 1;
				if (e.centeredSlides) {
					for (var n, o = t[a].swiperSlideSize, l = a + 1; l < t.length; l += 1) t[l] && !n && (r += 1, (o += t[l].swiperSlideSize) > s && (n = !0));
					for (var d = a - 1; d >= 0; d -= 1) t[d] && !n && (r += 1, (o += t[d].swiperSlideSize) > s && (n = !0))
				} else for (var h = a + 1; h < t.length; h += 1) i[h] - i[a] < s && (r += 1);
				return r
			}, t.prototype.update = function () {
				var e = this;
				if (e && !e.destroyed) {
					var t = e.snapGrid, i = e.params;
					i.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode ? (s(), e.params.autoHeight && e.updateAutoHeight()) : (("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || s(), i.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update")
				}

				function s() {
					var t = e.rtlTranslate ? -1 * e.translate : e.translate,
						i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
					e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses()
				}
			}, t.prototype.changeDirection = function (e, t) {
				void 0 === t && (t = !0);
				var i = this.params.direction;
				return e || (e = "horizontal" === i ? "vertical" : "horizontal"), e === i || "horizontal" !== e && "vertical" !== e ? this : (this.$el.removeClass("" + this.params.containerModifierClass + i).addClass("" + this.params.containerModifierClass + e), this.params.direction = e, this.slides.each((function (t, i) {
					"vertical" === e ? i.style.width = "" : i.style.height = ""
				})), this.emit("changeDirection"), t && this.update(), this)
			}, t.prototype.init = function () {
				this.initialized || (this.emit("beforeInit"), this.params.breakpoints && this.setBreakpoint(), this.addClasses(), this.params.loop && this.loopCreate(), this.updateSize(), this.updateSlides(), this.params.watchOverflow && this.checkOverflow(), this.params.grabCursor && this.setGrabCursor(), this.params.preloadImages && this.preloadImages(), this.params.loop ? this.slideTo(this.params.initialSlide + this.loopedSlides, 0, this.params.runCallbacksOnInit) : this.slideTo(this.params.initialSlide, 0, this.params.runCallbacksOnInit), this.attachEvents(), this.initialized = !0, this.emit("init"))
			}, t.prototype.destroy = function (e, t) {
				void 0 === e && (e = !0), void 0 === t && (t = !0);
				var i = this, s = i.params, a = i.$el, r = i.$wrapperEl, o = i.slides;
				return void 0 === i.params || i.destroyed ? null : (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), s.loop && i.loopDestroy(), t && (i.removeClasses(), a.removeAttr("style"), r.removeAttr("style"), o && o.length && o.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), i.emit("destroy"), Object.keys(i.eventsListeners).forEach((function (e) {
					i.off(e)
				})), !1 !== e && (i.$el[0].swiper = null, i.$el.data("swiper", null), n.deleteProps(i)), i.destroyed = !0, null)
			}, t.extendDefaults = function (e) {
				n.extend(F, e)
			}, i.extendedDefaults.get = function () {
				return F
			}, i.defaults.get = function () {
				return V
			}, i.Class.get = function () {
				return e
			}, i.$.get = function () {
				return s
			}, Object.defineProperties(t, i), t
		}(l), R = {name: "device", proto: {device: I}, static: {device: I}},
		q = {name: "support", proto: {support: o}, static: {support: o}}, j = {
			isEdge: !!t.navigator.userAgent.match(/Edge/g), isSafari: function () {
				var e = t.navigator.userAgent.toLowerCase();
				return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
			}(), isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
		}, K = {name: "browser", proto: {browser: j}, static: {browser: j}}, U = {
			name: "resize", create: function () {
				var e = this;
				n.extend(e, {
					resize: {
						resizeHandler: function () {
							e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
						}, orientationChangeHandler: function () {
							e && !e.destroyed && e.initialized && e.emit("orientationchange")
						}
					}
				})
			}, on: {
				init: function () {
					t.addEventListener("resize", this.resize.resizeHandler), t.addEventListener("orientationchange", this.resize.orientationChangeHandler)
				}, destroy: function () {
					t.removeEventListener("resize", this.resize.resizeHandler), t.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
				}
			}
		}, _ = {
			func: t.MutationObserver || t.WebkitMutationObserver, attach: function (e, i) {
				void 0 === i && (i = {});
				var s = this, a = new (0, _.func)((function (e) {
					if (1 !== e.length) {
						var i = function () {
							s.emit("observerUpdate", e[0])
						};
						t.requestAnimationFrame ? t.requestAnimationFrame(i) : t.setTimeout(i, 0)
					} else s.emit("observerUpdate", e[0])
				}));
				a.observe(e, {
					attributes: void 0 === i.attributes || i.attributes,
					childList: void 0 === i.childList || i.childList,
					characterData: void 0 === i.characterData || i.characterData
				}), s.observer.observers.push(a)
			}, init: function () {
				if (o.observer && this.params.observer) {
					if (this.params.observeParents) for (var e = this.$el.parents(), t = 0; t < e.length; t += 1) this.observer.attach(e[t]);
					this.observer.attach(this.$el[0], {childList: this.params.observeSlideChildren}), this.observer.attach(this.$wrapperEl[0], {attributes: !1})
				}
			}, destroy: function () {
				this.observer.observers.forEach((function (e) {
					e.disconnect()
				})), this.observer.observers = []
			}
		}, Z = {
			name: "observer",
			params: {observer: !1, observeParents: !1, observeSlideChildren: !1},
			create: function () {
				n.extend(this, {
					observer: {
						init: _.init.bind(this),
						attach: _.attach.bind(this),
						destroy: _.destroy.bind(this),
						observers: []
					}
				})
			},
			on: {
				init: function () {
					this.observer.init()
				}, destroy: function () {
					this.observer.destroy()
				}
			}
		}, Q = {
			update: function (e) {
				var t = this, i = t.params, s = i.slidesPerView, a = i.slidesPerGroup, r = i.centeredSlides,
					o = t.params.virtual, l = o.addSlidesBefore, d = o.addSlidesAfter, h = t.virtual, p = h.from, c = h.to,
					u = h.slides, v = h.slidesGrid, f = h.renderSlide, m = h.offset;
				t.updateActiveIndex();
				var g, b, w, y = t.activeIndex || 0;
				g = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", r ? (b = Math.floor(s / 2) + a + l, w = Math.floor(s / 2) + a + d) : (b = s + (a - 1) + l, w = a + d);
				var x = Math.max((y || 0) - w, 0), T = Math.min((y || 0) + b, u.length - 1),
					E = (t.slidesGrid[x] || 0) - (t.slidesGrid[0] || 0);

				function C() {
					t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load()
				}

				if (n.extend(t.virtual, {
					from: x,
					to: T,
					offset: E,
					slidesGrid: t.slidesGrid
				}), p === x && c === T && !e) return t.slidesGrid !== v && E !== m && t.slides.css(g, E + "px"), void t.updateProgress();
				if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, {
					offset: E,
					from: x,
					to: T,
					slides: function () {
						for (var e = [], t = x; t <= T; t += 1) e.push(u[t]);
						return e
					}()
				}), void C();
				var S = [], M = [];
				if (e) t.$wrapperEl.find("." + t.params.slideClass).remove(); else for (var P = p; P <= c; P += 1) (P < x || P > T) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + P + '"]').remove();
				for (var z = 0; z < u.length; z += 1) z >= x && z <= T && (void 0 === c || e ? M.push(z) : (z > c && M.push(z), z < p && S.push(z)));
				M.forEach((function (e) {
					t.$wrapperEl.append(f(u[e], e))
				})), S.sort((function (e, t) {
					return t - e
				})).forEach((function (e) {
					t.$wrapperEl.prepend(f(u[e], e))
				})), t.$wrapperEl.children(".swiper-slide").css(g, E + "px"), C()
			}, renderSlide: function (e, t) {
				var i = this.params.virtual;
				if (i.cache && this.virtual.cache[t]) return this.virtual.cache[t];
				var a = i.renderSlide ? s(i.renderSlide.call(this, e, t)) : s('<div class="' + this.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
				return a.attr("data-swiper-slide-index") || a.attr("data-swiper-slide-index", t), i.cache && (this.virtual.cache[t] = a), a
			}, appendSlide: function (e) {
				if ("object" == typeof e && "length" in e) for (var t = 0; t < e.length; t += 1) e[t] && this.virtual.slides.push(e[t]); else this.virtual.slides.push(e);
				this.virtual.update(!0)
			}, prependSlide: function (e) {
				var t = this.activeIndex, i = t + 1, s = 1;
				if (Array.isArray(e)) {
					for (var a = 0; a < e.length; a += 1) e[a] && this.virtual.slides.unshift(e[a]);
					i = t + e.length, s = e.length
				} else this.virtual.slides.unshift(e);
				if (this.params.virtual.cache) {
					var r = this.virtual.cache, n = {};
					Object.keys(r).forEach((function (e) {
						var t = r[e], i = t.attr("data-swiper-slide-index");
						i && t.attr("data-swiper-slide-index", parseInt(i, 10) + 1), n[parseInt(e, 10) + s] = t
					})), this.virtual.cache = n
				}
				this.virtual.update(!0), this.slideTo(i, 0)
			}, removeSlide: function (e) {
				if (null != e) {
					var t = this.activeIndex;
					if (Array.isArray(e)) for (var i = e.length - 1; i >= 0; i -= 1) this.virtual.slides.splice(e[i], 1), this.params.virtual.cache && delete this.virtual.cache[e[i]], e[i] < t && (t -= 1), t = Math.max(t, 0); else this.virtual.slides.splice(e, 1), this.params.virtual.cache && delete this.virtual.cache[e], e < t && (t -= 1), t = Math.max(t, 0);
					this.virtual.update(!0), this.slideTo(t, 0)
				}
			}, removeAllSlides: function () {
				this.virtual.slides = [], this.params.virtual.cache && (this.virtual.cache = {}), this.virtual.update(!0), this.slideTo(0, 0)
			}
		}, J = {
			name: "virtual",
			params: {
				virtual: {
					enabled: !1,
					slides: [],
					cache: !0,
					renderSlide: null,
					renderExternal: null,
					addSlidesBefore: 0,
					addSlidesAfter: 0
				}
			},
			create: function () {
				n.extend(this, {
					virtual: {
						update: Q.update.bind(this),
						appendSlide: Q.appendSlide.bind(this),
						prependSlide: Q.prependSlide.bind(this),
						removeSlide: Q.removeSlide.bind(this),
						removeAllSlides: Q.removeAllSlides.bind(this),
						renderSlide: Q.renderSlide.bind(this),
						slides: this.params.virtual.slides,
						cache: {}
					}
				})
			},
			on: {
				beforeInit: function () {
					if (this.params.virtual.enabled) {
						this.classNames.push(this.params.containerModifierClass + "virtual");
						var e = {watchSlidesProgress: !0};
						n.extend(this.params, e), n.extend(this.originalParams, e), this.params.initialSlide || this.virtual.update()
					}
				}, setTranslate: function () {
					this.params.virtual.enabled && this.virtual.update()
				}
			}
		}, ee = {
			handle: function (i) {
				var s = this.rtlTranslate, a = i;
				a.originalEvent && (a = a.originalEvent);
				var r = a.keyCode || a.charCode;
				if (!this.allowSlideNext && (this.isHorizontal() && 39 === r || this.isVertical() && 40 === r || 34 === r)) return !1;
				if (!this.allowSlidePrev && (this.isHorizontal() && 37 === r || this.isVertical() && 38 === r || 33 === r)) return !1;
				if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || e.activeElement && e.activeElement.nodeName && ("input" === e.activeElement.nodeName.toLowerCase() || "textarea" === e.activeElement.nodeName.toLowerCase()))) {
					if (this.params.keyboard.onlyInViewport && (33 === r || 34 === r || 37 === r || 39 === r || 38 === r || 40 === r)) {
						var n = !1;
						if (this.$el.parents("." + this.params.slideClass).length > 0 && 0 === this.$el.parents("." + this.params.slideActiveClass).length) return;
						var o = t.innerWidth, l = t.innerHeight, d = this.$el.offset();
						s && (d.left -= this.$el[0].scrollLeft);
						for (var h = [[d.left, d.top], [d.left + this.width, d.top], [d.left, d.top + this.height], [d.left + this.width, d.top + this.height]], p = 0; p < h.length; p += 1) {
							var c = h[p];
							c[0] >= 0 && c[0] <= o && c[1] >= 0 && c[1] <= l && (n = !0)
						}
						if (!n) return
					}
					this.isHorizontal() ? (33 !== r && 34 !== r && 37 !== r && 39 !== r || (a.preventDefault ? a.preventDefault() : a.returnValue = !1), (34 !== r && 39 !== r || s) && (33 !== r && 37 !== r || !s) || this.slideNext(), (33 !== r && 37 !== r || s) && (34 !== r && 39 !== r || !s) || this.slidePrev()) : (33 !== r && 34 !== r && 38 !== r && 40 !== r || (a.preventDefault ? a.preventDefault() : a.returnValue = !1), 34 !== r && 40 !== r || this.slideNext(), 33 !== r && 38 !== r || this.slidePrev()), this.emit("keyPress", r)
				}
			}, enable: function () {
				this.keyboard.enabled || (s(e).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0)
			}, disable: function () {
				this.keyboard.enabled && (s(e).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1)
			}
		}, te = {
			name: "keyboard", params: {keyboard: {enabled: !1, onlyInViewport: !0}}, create: function () {
				n.extend(this, {
					keyboard: {
						enabled: !1,
						enable: ee.enable.bind(this),
						disable: ee.disable.bind(this),
						handle: ee.handle.bind(this)
					}
				})
			}, on: {
				init: function () {
					this.params.keyboard.enabled && this.keyboard.enable()
				}, destroy: function () {
					this.keyboard.enabled && this.keyboard.disable()
				}
			}
		};
	var ie = {
		lastScrollTime: n.now(), lastEventBeforeSnap: void 0, recentWheelEvents: [], event: function () {
			return t.navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function () {
				var t = "onwheel" in e;
				if (!t) {
					var i = e.createElement("div");
					i.setAttribute("onwheel", "return;"), t = "function" == typeof i.onwheel
				}
				return !t && e.implementation && e.implementation.hasFeature && !0 !== e.implementation.hasFeature("", "") && (t = e.implementation.hasFeature("Events.wheel", "3.0")), t
			}() ? "wheel" : "mousewheel"
		}, normalize: function (e) {
			var t = 0, i = 0, s = 0, a = 0;
			return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), s = 10 * t, a = 10 * i, "deltaY" in e && (a = e.deltaY), "deltaX" in e && (s = e.deltaX), e.shiftKey && !s && (s = a, a = 0), (s || a) && e.deltaMode && (1 === e.deltaMode ? (s *= 40, a *= 40) : (s *= 800, a *= 800)), s && !t && (t = s < 1 ? -1 : 1), a && !i && (i = a < 1 ? -1 : 1), {
				spinX: t,
				spinY: i,
				pixelX: s,
				pixelY: a
			}
		}, handleMouseEnter: function () {
			this.mouseEntered = !0
		}, handleMouseLeave: function () {
			this.mouseEntered = !1
		}, handle: function (e) {
			var i = e, s = this, a = s.params.mousewheel;
			if (s.params.cssMode && i.preventDefault(), !s.mouseEntered && !a.releaseOnEdges) return !0;
			i.originalEvent && (i = i.originalEvent);
			var r = 0, o = s.rtlTranslate ? -1 : 1, l = ie.normalize(i);
			if (a.forceToAxis) if (s.isHorizontal()) {
				if (!(Math.abs(l.pixelX) > Math.abs(l.pixelY))) return !0;
				r = l.pixelX * o
			} else {
				if (!(Math.abs(l.pixelY) > Math.abs(l.pixelX))) return !0;
				r = l.pixelY
			} else r = Math.abs(l.pixelX) > Math.abs(l.pixelY) ? -l.pixelX * o : -l.pixelY;
			if (0 === r) return !0;
			if (a.invert && (r = -r), s.params.freeMode) {
				var d = {time: n.now(), delta: Math.abs(r), direction: Math.sign(r)},
					h = s.mousewheel.lastEventBeforeSnap,
					p = h && d.time < h.time + 500 && d.delta <= h.delta && d.direction === h.direction;
				if (!p) {
					s.mousewheel.lastEventBeforeSnap = void 0, s.params.loop && s.loopFix();
					var c = s.getTranslate() + r * a.sensitivity, u = s.isBeginning, v = s.isEnd;
					if (c >= s.minTranslate() && (c = s.minTranslate()), c <= s.maxTranslate() && (c = s.maxTranslate()), s.setTransition(0), s.setTranslate(c), s.updateProgress(), s.updateActiveIndex(), s.updateSlidesClasses(), (!u && s.isBeginning || !v && s.isEnd) && s.updateSlidesClasses(), s.params.freeModeSticky) {
						clearTimeout(s.mousewheel.timeout), s.mousewheel.timeout = void 0;
						var f = s.mousewheel.recentWheelEvents;
						f.length >= 15 && f.shift();
						var m = f.length ? f[f.length - 1] : void 0, g = f[0];
						if (f.push(d), m && (d.delta > m.delta || d.direction !== m.direction)) f.splice(0); else if (f.length >= 15 && d.time - g.time < 500 && g.delta - d.delta >= 1 && d.delta <= 6) {
							var b = r > 0 ? .8 : .2;
							s.mousewheel.lastEventBeforeSnap = d, f.splice(0), s.mousewheel.timeout = n.nextTick((function () {
								s.slideToClosest(s.params.speed, !0, void 0, b)
							}), 0)
						}
						s.mousewheel.timeout || (s.mousewheel.timeout = n.nextTick((function () {
							s.mousewheel.lastEventBeforeSnap = d, f.splice(0), s.slideToClosest(s.params.speed, !0, void 0, .5)
						}), 500))
					}
					if (p || s.emit("scroll", i), s.params.autoplay && s.params.autoplayDisableOnInteraction && s.autoplay.stop(), c === s.minTranslate() || c === s.maxTranslate()) return !0
				}
			} else {
				if (n.now() - s.mousewheel.lastScrollTime > 60) if (r < 0) if (s.isEnd && !s.params.loop || s.animating) {
					if (a.releaseOnEdges) return !0
				} else s.slideNext(), s.emit("scroll", i); else if (s.isBeginning && !s.params.loop || s.animating) {
					if (a.releaseOnEdges) return !0
				} else s.slidePrev(), s.emit("scroll", i);
				s.mousewheel.lastScrollTime = (new t.Date).getTime()
			}
			return i.preventDefault ? i.preventDefault() : i.returnValue = !1, !1
		}, enable: function () {
			var e = ie.event();
			if (this.params.cssMode) return this.wrapperEl.removeEventListener(e, this.mousewheel.handle), !0;
			if (!e) return !1;
			if (this.mousewheel.enabled) return !1;
			var t = this.$el;
			return "container" !== this.params.mousewheel.eventsTarged && (t = s(this.params.mousewheel.eventsTarged)), t.on("mouseenter", this.mousewheel.handleMouseEnter), t.on("mouseleave", this.mousewheel.handleMouseLeave), t.on(e, this.mousewheel.handle), this.mousewheel.enabled = !0, !0
		}, disable: function () {
			var e = ie.event();
			if (this.params.cssMode) return this.wrapperEl.addEventListener(e, this.mousewheel.handle), !0;
			if (!e) return !1;
			if (!this.mousewheel.enabled) return !1;
			var t = this.$el;
			return "container" !== this.params.mousewheel.eventsTarged && (t = s(this.params.mousewheel.eventsTarged)), t.off(e, this.mousewheel.handle), this.mousewheel.enabled = !1, !0
		}
	}, se = {
		update: function () {
			var e = this.params.navigation;
			if (!this.params.loop) {
				var t = this.navigation, i = t.$nextEl, s = t.$prevEl;
				s && s.length > 0 && (this.isBeginning ? s.addClass(e.disabledClass) : s.removeClass(e.disabledClass), s[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass)), i && i.length > 0 && (this.isEnd ? i.addClass(e.disabledClass) : i.removeClass(e.disabledClass), i[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass))
			}
		}, onPrevClick: function (e) {
			e.preventDefault(), this.isBeginning && !this.params.loop || this.slidePrev()
		}, onNextClick: function (e) {
			e.preventDefault(), this.isEnd && !this.params.loop || this.slideNext()
		}, init: function () {
			var e, t, i = this.params.navigation;
			(i.nextEl || i.prevEl) && (i.nextEl && (e = s(i.nextEl), this.params.uniqueNavElements && "string" == typeof i.nextEl && e.length > 1 && 1 === this.$el.find(i.nextEl).length && (e = this.$el.find(i.nextEl))), i.prevEl && (t = s(i.prevEl), this.params.uniqueNavElements && "string" == typeof i.prevEl && t.length > 1 && 1 === this.$el.find(i.prevEl).length && (t = this.$el.find(i.prevEl))), e && e.length > 0 && e.on("click", this.navigation.onNextClick), t && t.length > 0 && t.on("click", this.navigation.onPrevClick), n.extend(this.navigation, {
				$nextEl: e,
				nextEl: e && e[0],
				$prevEl: t,
				prevEl: t && t[0]
			}))
		}, destroy: function () {
			var e = this.navigation, t = e.$nextEl, i = e.$prevEl;
			t && t.length && (t.off("click", this.navigation.onNextClick), t.removeClass(this.params.navigation.disabledClass)), i && i.length && (i.off("click", this.navigation.onPrevClick), i.removeClass(this.params.navigation.disabledClass))
		}
	}, ae = {
		update: function () {
			var e = this.rtl, t = this.params.pagination;
			if (t.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
				var i,
					a = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
					r = this.pagination.$el,
					n = this.params.loop ? Math.ceil((a - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length;
				if (this.params.loop ? ((i = Math.ceil((this.activeIndex - this.loopedSlides) / this.params.slidesPerGroup)) > a - 1 - 2 * this.loopedSlides && (i -= a - 2 * this.loopedSlides), i > n - 1 && (i -= n), i < 0 && "bullets" !== this.params.paginationType && (i = n + i)) : i = void 0 !== this.snapIndex ? this.snapIndex : this.activeIndex || 0, "bullets" === t.type && this.pagination.bullets && this.pagination.bullets.length > 0) {
					var o, l, d, h = this.pagination.bullets;
					if (t.dynamicBullets && (this.pagination.bulletSize = h.eq(0)[this.isHorizontal() ? "outerWidth" : "outerHeight"](!0), r.css(this.isHorizontal() ? "width" : "height", this.pagination.bulletSize * (t.dynamicMainBullets + 4) + "px"), t.dynamicMainBullets > 1 && void 0 !== this.previousIndex && (this.pagination.dynamicBulletIndex += i - this.previousIndex, this.pagination.dynamicBulletIndex > t.dynamicMainBullets - 1 ? this.pagination.dynamicBulletIndex = t.dynamicMainBullets - 1 : this.pagination.dynamicBulletIndex < 0 && (this.pagination.dynamicBulletIndex = 0)), o = i - this.pagination.dynamicBulletIndex, d = ((l = o + (Math.min(h.length, t.dynamicMainBullets) - 1)) + o) / 2), h.removeClass(t.bulletActiveClass + " " + t.bulletActiveClass + "-next " + t.bulletActiveClass + "-next-next " + t.bulletActiveClass + "-prev " + t.bulletActiveClass + "-prev-prev " + t.bulletActiveClass + "-main"), r.length > 1) h.each((function (e, a) {
						var r = s(a), n = r.index();
						n === i && r.addClass(t.bulletActiveClass), t.dynamicBullets && (n >= o && n <= l && r.addClass(t.bulletActiveClass + "-main"), n === o && r.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), n === l && r.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next"))
					})); else {
						var p = h.eq(i), c = p.index();
						if (p.addClass(t.bulletActiveClass), t.dynamicBullets) {
							for (var u = h.eq(o), v = h.eq(l), f = o; f <= l; f += 1) h.eq(f).addClass(t.bulletActiveClass + "-main");
							if (this.params.loop) if (c >= h.length - t.dynamicMainBullets) {
								for (var m = t.dynamicMainBullets; m >= 0; m -= 1) h.eq(h.length - m).addClass(t.bulletActiveClass + "-main");
								h.eq(h.length - t.dynamicMainBullets - 1).addClass(t.bulletActiveClass + "-prev")
							} else u.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), v.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next"); else u.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), v.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next")
						}
					}
					if (t.dynamicBullets) {
						var g = Math.min(h.length, t.dynamicMainBullets + 4),
							b = (this.pagination.bulletSize * g - this.pagination.bulletSize) / 2 - d * this.pagination.bulletSize,
							w = e ? "right" : "left";
						h.css(this.isHorizontal() ? w : "top", b + "px")
					}
				}
				if ("fraction" === t.type && (r.find("." + t.currentClass).text(t.formatFractionCurrent(i + 1)), r.find("." + t.totalClass).text(t.formatFractionTotal(n))), "progressbar" === t.type) {
					var y;
					y = t.progressbarOpposite ? this.isHorizontal() ? "vertical" : "horizontal" : this.isHorizontal() ? "horizontal" : "vertical";
					var x = (i + 1) / n, T = 1, E = 1;
					"horizontal" === y ? T = x : E = x, r.find("." + t.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + T + ") scaleY(" + E + ")").transition(this.params.speed)
				}
				"custom" === t.type && t.renderCustom ? (r.html(t.renderCustom(this, i + 1, n)), this.emit("paginationRender", this, r[0])) : this.emit("paginationUpdate", this, r[0]), r[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](t.lockClass)
			}
		}, render: function () {
			var e = this.params.pagination;
			if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
				var t = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
					i = this.pagination.$el, s = "";
				if ("bullets" === e.type) {
					for (var a = this.params.loop ? Math.ceil((t - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length, r = 0; r < a; r += 1) e.renderBullet ? s += e.renderBullet.call(this, r, e.bulletClass) : s += "<" + e.bulletElement + ' class="' + e.bulletClass + '"></' + e.bulletElement + ">";
					i.html(s), this.pagination.bullets = i.find("." + e.bulletClass)
				}
				"fraction" === e.type && (s = e.renderFraction ? e.renderFraction.call(this, e.currentClass, e.totalClass) : '<span class="' + e.currentClass + '"></span> / <span class="' + e.totalClass + '"></span>', i.html(s)), "progressbar" === e.type && (s = e.renderProgressbar ? e.renderProgressbar.call(this, e.progressbarFillClass) : '<span class="' + e.progressbarFillClass + '"></span>', i.html(s)), "custom" !== e.type && this.emit("paginationRender", this.pagination.$el[0])
			}
		}, init: function () {
			var e = this, t = e.params.pagination;
			if (t.el) {
				var i = s(t.el);
				0 !== i.length && (e.params.uniqueNavElements && "string" == typeof t.el && i.length > 1 && 1 === e.$el.find(t.el).length && (i = e.$el.find(t.el)), "bullets" === t.type && t.clickable && i.addClass(t.clickableClass), i.addClass(t.modifierClass + t.type), "bullets" === t.type && t.dynamicBullets && (i.addClass("" + t.modifierClass + t.type + "-dynamic"), e.pagination.dynamicBulletIndex = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && i.addClass(t.progressbarOppositeClass), t.clickable && i.on("click", "." + t.bulletClass, (function (t) {
					t.preventDefault();
					var i = s(this).index() * e.params.slidesPerGroup;
					e.params.loop && (i += e.loopedSlides), e.slideTo(i)
				})), n.extend(e.pagination, {$el: i, el: i[0]}))
			}
		}, destroy: function () {
			var e = this.params.pagination;
			if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
				var t = this.pagination.$el;
				t.removeClass(e.hiddenClass), t.removeClass(e.modifierClass + e.type), this.pagination.bullets && this.pagination.bullets.removeClass(e.bulletActiveClass), e.clickable && t.off("click", "." + e.bulletClass)
			}
		}
	}, re = {
		setTranslate: function () {
			if (this.params.scrollbar.el && this.scrollbar.el) {
				var e = this.scrollbar, t = this.rtlTranslate, i = this.progress, s = e.dragSize, a = e.trackSize,
					r = e.$dragEl, n = e.$el, o = this.params.scrollbar, l = s, d = (a - s) * i;
				t ? (d = -d) > 0 ? (l = s - d, d = 0) : -d + s > a && (l = a + d) : d < 0 ? (l = s + d, d = 0) : d + s > a && (l = a - d), this.isHorizontal() ? (r.transform("translate3d(" + d + "px, 0, 0)"), r[0].style.width = l + "px") : (r.transform("translate3d(0px, " + d + "px, 0)"), r[0].style.height = l + "px"), o.hide && (clearTimeout(this.scrollbar.timeout), n[0].style.opacity = 1, this.scrollbar.timeout = setTimeout((function () {
					n[0].style.opacity = 0, n.transition(400)
				}), 1e3))
			}
		}, setTransition: function (e) {
			this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
		}, updateSize: function () {
			if (this.params.scrollbar.el && this.scrollbar.el) {
				var e = this.scrollbar, t = e.$dragEl, i = e.$el;
				t[0].style.width = "", t[0].style.height = "";
				var s, a = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight, r = this.size / this.virtualSize,
					o = r * (a / this.size);
				s = "auto" === this.params.scrollbar.dragSize ? a * r : parseInt(this.params.scrollbar.dragSize, 10), this.isHorizontal() ? t[0].style.width = s + "px" : t[0].style.height = s + "px", i[0].style.display = r >= 1 ? "none" : "", this.params.scrollbar.hide && (i[0].style.opacity = 0), n.extend(e, {
					trackSize: a,
					divider: r,
					moveDivider: o,
					dragSize: s
				}), e.$el[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](this.params.scrollbar.lockClass)
			}
		}, getPointerPosition: function (e) {
			return this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY
		}, setDragPosition: function (e) {
			var t, i = this.scrollbar, s = this.rtlTranslate, a = i.$el, r = i.dragSize, n = i.trackSize,
				o = i.dragStartPos;
			t = (i.getPointerPosition(e) - a.offset()[this.isHorizontal() ? "left" : "top"] - (null !== o ? o : r / 2)) / (n - r), t = Math.max(Math.min(t, 1), 0), s && (t = 1 - t);
			var l = this.minTranslate() + (this.maxTranslate() - this.minTranslate()) * t;
			this.updateProgress(l), this.setTranslate(l), this.updateActiveIndex(), this.updateSlidesClasses()
		}, onDragStart: function (e) {
			var t = this.params.scrollbar, i = this.scrollbar, s = this.$wrapperEl, a = i.$el, r = i.$dragEl;
			this.scrollbar.isTouched = !0, this.scrollbar.dragStartPos = e.target === r[0] || e.target === r ? i.getPointerPosition(e) - e.target.getBoundingClientRect()[this.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), s.transition(100), r.transition(100), i.setDragPosition(e), clearTimeout(this.scrollbar.dragTimeout), a.transition(0), t.hide && a.css("opacity", 1), this.params.cssMode && this.$wrapperEl.css("scroll-snap-type", "none"), this.emit("scrollbarDragStart", e)
		}, onDragMove: function (e) {
			var t = this.scrollbar, i = this.$wrapperEl, s = t.$el, a = t.$dragEl;
			this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), i.transition(0), s.transition(0), a.transition(0), this.emit("scrollbarDragMove", e))
		}, onDragEnd: function (e) {
			var t = this.params.scrollbar, i = this.scrollbar, s = this.$wrapperEl, a = i.$el;
			this.scrollbar.isTouched && (this.scrollbar.isTouched = !1, this.params.cssMode && (this.$wrapperEl.css("scroll-snap-type", ""), s.transition("")), t.hide && (clearTimeout(this.scrollbar.dragTimeout), this.scrollbar.dragTimeout = n.nextTick((function () {
				a.css("opacity", 0), a.transition(400)
			}), 1e3)), this.emit("scrollbarDragEnd", e), t.snapOnRelease && this.slideToClosest())
		}, enableDraggable: function () {
			if (this.params.scrollbar.el) {
				var t = this.scrollbar, i = this.touchEventsTouch, s = this.touchEventsDesktop, a = this.params,
					r = t.$el[0], n = !(!o.passiveListener || !a.passiveListeners) && {passive: !1, capture: !1},
					l = !(!o.passiveListener || !a.passiveListeners) && {passive: !0, capture: !1};
				o.touch ? (r.addEventListener(i.start, this.scrollbar.onDragStart, n), r.addEventListener(i.move, this.scrollbar.onDragMove, n), r.addEventListener(i.end, this.scrollbar.onDragEnd, l)) : (r.addEventListener(s.start, this.scrollbar.onDragStart, n), e.addEventListener(s.move, this.scrollbar.onDragMove, n), e.addEventListener(s.end, this.scrollbar.onDragEnd, l))
			}
		}, disableDraggable: function () {
			if (this.params.scrollbar.el) {
				var t = this.scrollbar, i = this.touchEventsTouch, s = this.touchEventsDesktop, a = this.params,
					r = t.$el[0], n = !(!o.passiveListener || !a.passiveListeners) && {passive: !1, capture: !1},
					l = !(!o.passiveListener || !a.passiveListeners) && {passive: !0, capture: !1};
				o.touch ? (r.removeEventListener(i.start, this.scrollbar.onDragStart, n), r.removeEventListener(i.move, this.scrollbar.onDragMove, n), r.removeEventListener(i.end, this.scrollbar.onDragEnd, l)) : (r.removeEventListener(s.start, this.scrollbar.onDragStart, n), e.removeEventListener(s.move, this.scrollbar.onDragMove, n), e.removeEventListener(s.end, this.scrollbar.onDragEnd, l))
			}
		}, init: function () {
			if (this.params.scrollbar.el) {
				var e = this.scrollbar, t = this.$el, i = this.params.scrollbar, a = s(i.el);
				this.params.uniqueNavElements && "string" == typeof i.el && a.length > 1 && 1 === t.find(i.el).length && (a = t.find(i.el));
				var r = a.find("." + this.params.scrollbar.dragClass);
				0 === r.length && (r = s('<div class="' + this.params.scrollbar.dragClass + '"></div>'), a.append(r)), n.extend(e, {
					$el: a,
					el: a[0],
					$dragEl: r,
					dragEl: r[0]
				}), i.draggable && e.enableDraggable()
			}
		}, destroy: function () {
			this.scrollbar.disableDraggable()
		}
	}, ne = {
		setTransform: function (e, t) {
			var i = this.rtl, a = s(e), r = i ? -1 : 1, n = a.attr("data-swiper-parallax") || "0",
				o = a.attr("data-swiper-parallax-x"), l = a.attr("data-swiper-parallax-y"),
				d = a.attr("data-swiper-parallax-scale"), h = a.attr("data-swiper-parallax-opacity");
			if (o || l ? (o = o || "0", l = l || "0") : this.isHorizontal() ? (o = n, l = "0") : (l = n, o = "0"), o = o.indexOf("%") >= 0 ? parseInt(o, 10) * t * r + "%" : o * t * r + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px", null != h) {
				var p = h - (h - 1) * (1 - Math.abs(t));
				a[0].style.opacity = p
			}
			if (null == d) a.transform("translate3d(" + o + ", " + l + ", 0px)"); else {
				var c = d - (d - 1) * (1 - Math.abs(t));
				a.transform("translate3d(" + o + ", " + l + ", 0px) scale(" + c + ")")
			}
		}, setTranslate: function () {
			var e = this, t = e.$el, i = e.slides, a = e.progress, r = e.snapGrid;
			t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function (t, i) {
				e.parallax.setTransform(i, a)
			})), i.each((function (t, i) {
				var n = i.progress;
				e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (n += Math.ceil(t / 2) - a * (r.length - 1)), n = Math.min(Math.max(n, -1), 1), s(i).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function (t, i) {
					e.parallax.setTransform(i, n)
				}))
			}))
		}, setTransition: function (e) {
			void 0 === e && (e = this.params.speed);
			this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function (t, i) {
				var a = s(i), r = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e;
				0 === e && (r = 0), a.transition(r)
			}))
		}
	}, oe = {
		getDistanceBetweenTouches: function (e) {
			if (e.targetTouches.length < 2) return 1;
			var t = e.targetTouches[0].pageX, i = e.targetTouches[0].pageY, s = e.targetTouches[1].pageX,
				a = e.targetTouches[1].pageY;
			return Math.sqrt(Math.pow(s - t, 2) + Math.pow(a - i, 2))
		}, onGestureStart: function (e) {
			var t = this.params.zoom, i = this.zoom, a = i.gesture;
			if (i.fakeGestureTouched = !1, i.fakeGestureMoved = !1, !o.gestures) {
				if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
				i.fakeGestureTouched = !0, a.scaleStart = oe.getDistanceBetweenTouches(e)
			}
			a.$slideEl && a.$slideEl.length || (a.$slideEl = s(e.target).closest(".swiper-slide"), 0 === a.$slideEl.length && (a.$slideEl = this.slides.eq(this.activeIndex)), a.$imageEl = a.$slideEl.find("img, svg, canvas"), a.$imageWrapEl = a.$imageEl.parent("." + t.containerClass), a.maxRatio = a.$imageWrapEl.attr("data-swiper-zoom") || t.maxRatio, 0 !== a.$imageWrapEl.length) ? (a.$imageEl.transition(0), this.zoom.isScaling = !0) : a.$imageEl = void 0
		}, onGestureChange: function (e) {
			var t = this.params.zoom, i = this.zoom, s = i.gesture;
			if (!o.gestures) {
				if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
				i.fakeGestureMoved = !0, s.scaleMove = oe.getDistanceBetweenTouches(e)
			}
			s.$imageEl && 0 !== s.$imageEl.length && (o.gestures ? i.scale = e.scale * i.currentScale : i.scale = s.scaleMove / s.scaleStart * i.currentScale, i.scale > s.maxRatio && (i.scale = s.maxRatio - 1 + Math.pow(i.scale - s.maxRatio + 1, .5)), i.scale < t.minRatio && (i.scale = t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, .5)), s.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"))
		}, onGestureEnd: function (e) {
			var t = this.params.zoom, i = this.zoom, s = i.gesture;
			if (!o.gestures) {
				if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
				if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !I.android) return;
				i.fakeGestureTouched = !1, i.fakeGestureMoved = !1
			}
			s.$imageEl && 0 !== s.$imageEl.length && (i.scale = Math.max(Math.min(i.scale, s.maxRatio), t.minRatio), s.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"), i.currentScale = i.scale, i.isScaling = !1, 1 === i.scale && (s.$slideEl = void 0))
		}, onTouchStart: function (e) {
			var t = this.zoom, i = t.gesture, s = t.image;
			i.$imageEl && 0 !== i.$imageEl.length && (s.isTouched || (I.android && e.preventDefault(), s.isTouched = !0, s.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
		}, onTouchMove: function (e) {
			var t = this.zoom, i = t.gesture, s = t.image, a = t.velocity;
			if (i.$imageEl && 0 !== i.$imageEl.length && (this.allowClick = !1, s.isTouched && i.$slideEl)) {
				s.isMoved || (s.width = i.$imageEl[0].offsetWidth, s.height = i.$imageEl[0].offsetHeight, s.startX = n.getTranslate(i.$imageWrapEl[0], "x") || 0, s.startY = n.getTranslate(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), this.rtl && (s.startX = -s.startX, s.startY = -s.startY));
				var r = s.width * t.scale, o = s.height * t.scale;
				if (!(r < i.slideWidth && o < i.slideHeight)) {
					if (s.minX = Math.min(i.slideWidth / 2 - r / 2, 0), s.maxX = -s.minX, s.minY = Math.min(i.slideHeight / 2 - o / 2, 0), s.maxY = -s.minY, s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !s.isMoved && !t.isScaling) {
						if (this.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)) return void (s.isTouched = !1);
						if (!this.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)) return void (s.isTouched = !1)
					}
					e.preventDefault(), e.stopPropagation(), s.isMoved = !0, s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX, s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY, s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)), s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)), s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)), s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)), a.prevPositionX || (a.prevPositionX = s.touchesCurrent.x), a.prevPositionY || (a.prevPositionY = s.touchesCurrent.y), a.prevTime || (a.prevTime = Date.now()), a.x = (s.touchesCurrent.x - a.prevPositionX) / (Date.now() - a.prevTime) / 2, a.y = (s.touchesCurrent.y - a.prevPositionY) / (Date.now() - a.prevTime) / 2, Math.abs(s.touchesCurrent.x - a.prevPositionX) < 2 && (a.x = 0), Math.abs(s.touchesCurrent.y - a.prevPositionY) < 2 && (a.y = 0), a.prevPositionX = s.touchesCurrent.x, a.prevPositionY = s.touchesCurrent.y, a.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")
				}
			}
		}, onTouchEnd: function () {
			var e = this.zoom, t = e.gesture, i = e.image, s = e.velocity;
			if (t.$imageEl && 0 !== t.$imageEl.length) {
				if (!i.isTouched || !i.isMoved) return i.isTouched = !1, void (i.isMoved = !1);
				i.isTouched = !1, i.isMoved = !1;
				var a = 300, r = 300, n = s.x * a, o = i.currentX + n, l = s.y * r, d = i.currentY + l;
				0 !== s.x && (a = Math.abs((o - i.currentX) / s.x)), 0 !== s.y && (r = Math.abs((d - i.currentY) / s.y));
				var h = Math.max(a, r);
				i.currentX = o, i.currentY = d;
				var p = i.width * e.scale, c = i.height * e.scale;
				i.minX = Math.min(t.slideWidth / 2 - p / 2, 0), i.maxX = -i.minX, i.minY = Math.min(t.slideHeight / 2 - c / 2, 0), i.maxY = -i.minY, i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX), i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY), t.$imageWrapEl.transition(h).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)")
			}
		}, onTransitionEnd: function () {
			var e = this.zoom, t = e.gesture;
			t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, e.currentScale = 1, t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0)
		}, toggle: function (e) {
			var t = this.zoom;
			t.scale && 1 !== t.scale ? t.out() : t.in(e)
		}, in: function (e) {
			var t, i, a, r, n, o, l, d, h, p, c, u, v, f, m, g, b = this.zoom, w = this.params.zoom, y = b.gesture,
				x = b.image;
			(y.$slideEl || (y.$slideEl = this.clickedSlide ? s(this.clickedSlide) : this.slides.eq(this.activeIndex), y.$imageEl = y.$slideEl.find("img, svg, canvas"), y.$imageWrapEl = y.$imageEl.parent("." + w.containerClass)), y.$imageEl && 0 !== y.$imageEl.length) && (y.$slideEl.addClass("" + w.zoomedSlideClass), void 0 === x.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, i = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = x.touchesStart.x, i = x.touchesStart.y), b.scale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, b.currentScale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, e ? (m = y.$slideEl[0].offsetWidth, g = y.$slideEl[0].offsetHeight, a = y.$slideEl.offset().left + m / 2 - t, r = y.$slideEl.offset().top + g / 2 - i, l = y.$imageEl[0].offsetWidth, d = y.$imageEl[0].offsetHeight, h = l * b.scale, p = d * b.scale, v = -(c = Math.min(m / 2 - h / 2, 0)), f = -(u = Math.min(g / 2 - p / 2, 0)), (n = a * b.scale) < c && (n = c), n > v && (n = v), (o = r * b.scale) < u && (o = u), o > f && (o = f)) : (n = 0, o = 0), y.$imageWrapEl.transition(300).transform("translate3d(" + n + "px, " + o + "px,0)"), y.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + b.scale + ")"))
		}, out: function () {
			var e = this.zoom, t = this.params.zoom, i = e.gesture;
			i.$slideEl || (i.$slideEl = this.clickedSlide ? s(this.clickedSlide) : this.slides.eq(this.activeIndex), i.$imageEl = i.$slideEl.find("img, svg, canvas"), i.$imageWrapEl = i.$imageEl.parent("." + t.containerClass)), i.$imageEl && 0 !== i.$imageEl.length && (e.scale = 1, e.currentScale = 1, i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), i.$slideEl.removeClass("" + t.zoomedSlideClass), i.$slideEl = void 0)
		}, enable: function () {
			var e = this.zoom;
			if (!e.enabled) {
				e.enabled = !0;
				var t = !("touchstart" !== this.touchEvents.start || !o.passiveListener || !this.params.passiveListeners) && {
					passive: !0,
					capture: !1
				}, i = !o.passiveListener || {passive: !1, capture: !0};
				o.gestures ? (this.$wrapperEl.on("gesturestart", ".swiper-slide", e.onGestureStart, t), this.$wrapperEl.on("gesturechange", ".swiper-slide", e.onGestureChange, t), this.$wrapperEl.on("gestureend", ".swiper-slide", e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.on(this.touchEvents.start, ".swiper-slide", e.onGestureStart, t), this.$wrapperEl.on(this.touchEvents.move, ".swiper-slide", e.onGestureChange, i), this.$wrapperEl.on(this.touchEvents.end, ".swiper-slide", e.onGestureEnd, t), this.touchEvents.cancel && this.$wrapperEl.on(this.touchEvents.cancel, ".swiper-slide", e.onGestureEnd, t)), this.$wrapperEl.on(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove, i)
			}
		}, disable: function () {
			var e = this.zoom;
			if (e.enabled) {
				this.zoom.enabled = !1;
				var t = !("touchstart" !== this.touchEvents.start || !o.passiveListener || !this.params.passiveListeners) && {
					passive: !0,
					capture: !1
				}, i = !o.passiveListener || {passive: !1, capture: !0};
				o.gestures ? (this.$wrapperEl.off("gesturestart", ".swiper-slide", e.onGestureStart, t), this.$wrapperEl.off("gesturechange", ".swiper-slide", e.onGestureChange, t), this.$wrapperEl.off("gestureend", ".swiper-slide", e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.off(this.touchEvents.start, ".swiper-slide", e.onGestureStart, t), this.$wrapperEl.off(this.touchEvents.move, ".swiper-slide", e.onGestureChange, i), this.$wrapperEl.off(this.touchEvents.end, ".swiper-slide", e.onGestureEnd, t), this.touchEvents.cancel && this.$wrapperEl.off(this.touchEvents.cancel, ".swiper-slide", e.onGestureEnd, t)), this.$wrapperEl.off(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove, i)
			}
		}
	}, le = {
		loadInSlide: function (e, t) {
			void 0 === t && (t = !0);
			var i = this, a = i.params.lazy;
			if (void 0 !== e && 0 !== i.slides.length) {
				var r = i.virtual && i.params.virtual.enabled ? i.$wrapperEl.children("." + i.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : i.slides.eq(e),
					n = r.find("." + a.elementClass + ":not(." + a.loadedClass + "):not(." + a.loadingClass + ")");
				!r.hasClass(a.elementClass) || r.hasClass(a.loadedClass) || r.hasClass(a.loadingClass) || (n = n.add(r[0])), 0 !== n.length && n.each((function (e, n) {
					var o = s(n);
					o.addClass(a.loadingClass);
					var l = o.attr("data-background"), d = o.attr("data-src"), h = o.attr("data-srcset"),
						p = o.attr("data-sizes");
					i.loadImage(o[0], d || l, h, p, !1, (function () {
						if (null != i && i && (!i || i.params) && !i.destroyed) {
							if (l ? (o.css("background-image", 'url("' + l + '")'), o.removeAttr("data-background")) : (h && (o.attr("srcset", h), o.removeAttr("data-srcset")), p && (o.attr("sizes", p), o.removeAttr("data-sizes")), d && (o.attr("src", d), o.removeAttr("data-src"))), o.addClass(a.loadedClass).removeClass(a.loadingClass), r.find("." + a.preloaderClass).remove(), i.params.loop && t) {
								var e = r.attr("data-swiper-slide-index");
								if (r.hasClass(i.params.slideDuplicateClass)) {
									var s = i.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + i.params.slideDuplicateClass + ")");
									i.lazy.loadInSlide(s.index(), !1)
								} else {
									var n = i.$wrapperEl.children("." + i.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
									i.lazy.loadInSlide(n.index(), !1)
								}
							}
							i.emit("lazyImageReady", r[0], o[0])
						}
					})), i.emit("lazyImageLoad", r[0], o[0])
				}))
			}
		}, load: function () {
			var e = this, t = e.$wrapperEl, i = e.params, a = e.slides, r = e.activeIndex,
				n = e.virtual && i.virtual.enabled, o = i.lazy, l = i.slidesPerView;

			function d(e) {
				if (n) {
					if (t.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0
				} else if (a[e]) return !0;
				return !1
			}

			function h(e) {
				return n ? s(e).attr("data-swiper-slide-index") : s(e).index()
			}

			if ("auto" === l && (l = 0), e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0), e.params.watchSlidesVisibility) t.children("." + i.slideVisibleClass).each((function (t, i) {
				var a = n ? s(i).attr("data-swiper-slide-index") : s(i).index();
				e.lazy.loadInSlide(a)
			})); else if (l > 1) for (var p = r; p < r + l; p += 1) d(p) && e.lazy.loadInSlide(p); else e.lazy.loadInSlide(r);
			if (o.loadPrevNext) if (l > 1 || o.loadPrevNextAmount && o.loadPrevNextAmount > 1) {
				for (var c = o.loadPrevNextAmount, u = l, v = Math.min(r + u + Math.max(c, u), a.length), f = Math.max(r - Math.max(u, c), 0), m = r + l; m < v; m += 1) d(m) && e.lazy.loadInSlide(m);
				for (var g = f; g < r; g += 1) d(g) && e.lazy.loadInSlide(g)
			} else {
				var b = t.children("." + i.slideNextClass);
				b.length > 0 && e.lazy.loadInSlide(h(b));
				var w = t.children("." + i.slidePrevClass);
				w.length > 0 && e.lazy.loadInSlide(h(w))
			}
		}
	}, de = {
		LinearSpline: function (e, t) {
			var i, s, a, r, n, o = function (e, t) {
				for (s = -1, i = e.length; i - s > 1;) e[a = i + s >> 1] <= t ? s = a : i = a;
				return i
			};
			return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function (e) {
				return e ? (n = o(this.x, e), r = n - 1, (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0
			}, this
		}, getInterpolateFunction: function (e) {
			this.controller.spline || (this.controller.spline = this.params.loop ? new de.LinearSpline(this.slidesGrid, e.slidesGrid) : new de.LinearSpline(this.snapGrid, e.snapGrid))
		}, setTranslate: function (e, t) {
			var i, s, a = this, r = a.controller.control;

			function n(e) {
				var t = a.rtlTranslate ? -a.translate : a.translate;
				"slide" === a.params.controller.by && (a.controller.getInterpolateFunction(e), s = -a.controller.spline.interpolate(-t)), s && "container" !== a.params.controller.by || (i = (e.maxTranslate() - e.minTranslate()) / (a.maxTranslate() - a.minTranslate()), s = (t - a.minTranslate()) * i + e.minTranslate()), a.params.controller.inverse && (s = e.maxTranslate() - s), e.updateProgress(s), e.setTranslate(s, a), e.updateActiveIndex(), e.updateSlidesClasses()
			}

			if (Array.isArray(r)) for (var o = 0; o < r.length; o += 1) r[o] !== t && r[o] instanceof W && n(r[o]); else r instanceof W && t !== r && n(r)
		}, setTransition: function (e, t) {
			var i, s = this, a = s.controller.control;

			function r(t) {
				t.setTransition(e, s), 0 !== e && (t.transitionStart(), t.params.autoHeight && n.nextTick((function () {
					t.updateAutoHeight()
				})), t.$wrapperEl.transitionEnd((function () {
					a && (t.params.loop && "slide" === s.params.controller.by && t.loopFix(), t.transitionEnd())
				})))
			}

			if (Array.isArray(a)) for (i = 0; i < a.length; i += 1) a[i] !== t && a[i] instanceof W && r(a[i]); else a instanceof W && t !== a && r(a)
		}
	}, he = {
		makeElFocusable: function (e) {
			return e.attr("tabIndex", "0"), e
		}, addElRole: function (e, t) {
			return e.attr("role", t), e
		}, addElLabel: function (e, t) {
			return e.attr("aria-label", t), e
		}, disableEl: function (e) {
			return e.attr("aria-disabled", !0), e
		}, enableEl: function (e) {
			return e.attr("aria-disabled", !1), e
		}, onEnterKey: function (e) {
			var t = this.params.a11y;
			if (13 === e.keyCode) {
				var i = s(e.target);
				this.navigation && this.navigation.$nextEl && i.is(this.navigation.$nextEl) && (this.isEnd && !this.params.loop || this.slideNext(), this.isEnd ? this.a11y.notify(t.lastSlideMessage) : this.a11y.notify(t.nextSlideMessage)), this.navigation && this.navigation.$prevEl && i.is(this.navigation.$prevEl) && (this.isBeginning && !this.params.loop || this.slidePrev(), this.isBeginning ? this.a11y.notify(t.firstSlideMessage) : this.a11y.notify(t.prevSlideMessage)), this.pagination && i.is("." + this.params.pagination.bulletClass) && i[0].click()
			}
		}, notify: function (e) {
			var t = this.a11y.liveRegion;
			0 !== t.length && (t.html(""), t.html(e))
		}, updateNavigation: function () {
			if (!this.params.loop) {
				var e = this.navigation, t = e.$nextEl, i = e.$prevEl;
				i && i.length > 0 && (this.isBeginning ? this.a11y.disableEl(i) : this.a11y.enableEl(i)), t && t.length > 0 && (this.isEnd ? this.a11y.disableEl(t) : this.a11y.enableEl(t))
			}
		}, updatePagination: function () {
			var e = this, t = e.params.a11y;
			e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each((function (i, a) {
				var r = s(a);
				e.a11y.makeElFocusable(r), e.a11y.addElRole(r, "button"), e.a11y.addElLabel(r, t.paginationBulletMessage.replace(/{{index}}/, r.index() + 1))
			}))
		}, init: function () {
			this.$el.append(this.a11y.liveRegion);
			var e, t, i = this.params.a11y;
			this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && (this.a11y.makeElFocusable(e), this.a11y.addElRole(e, "button"), this.a11y.addElLabel(e, i.nextSlideMessage), e.on("keydown", this.a11y.onEnterKey)), t && (this.a11y.makeElFocusable(t), this.a11y.addElRole(t, "button"), this.a11y.addElLabel(t, i.prevSlideMessage), t.on("keydown", this.a11y.onEnterKey)), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.on("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
		}, destroy: function () {
			var e, t;
			this.a11y.liveRegion && this.a11y.liveRegion.length > 0 && this.a11y.liveRegion.remove(), this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && e.off("keydown", this.a11y.onEnterKey), t && t.off("keydown", this.a11y.onEnterKey), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.off("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
		}
	}, pe = {
		init: function () {
			if (this.params.history) {
				if (!t.history || !t.history.pushState) return this.params.history.enabled = !1, void (this.params.hashNavigation.enabled = !0);
				var e = this.history;
				e.initialized = !0, e.paths = pe.getPathValues(), (e.paths.key || e.paths.value) && (e.scrollToSlide(0, e.paths.value, this.params.runCallbacksOnInit), this.params.history.replaceState || t.addEventListener("popstate", this.history.setHistoryPopState))
			}
		}, destroy: function () {
			this.params.history.replaceState || t.removeEventListener("popstate", this.history.setHistoryPopState)
		}, setHistoryPopState: function () {
			this.history.paths = pe.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
		}, getPathValues: function () {
			var e = t.location.pathname.slice(1).split('/').filter((function (e) {
				return "" !== e
			})), i = e.length;
			return {key: e[i - 2], value: e[i - 1]}
		}, setHistory: function (e, i) {
			if (this.history.initialized && this.params.history.enabled) {
				var s = this.slides.eq(i), a = pe.slugify(s.attr("data-history"));
				t.location.pathname.includes(e) || (a = e + "/" + a);
				var r = t.history.state;
				r && r.value === a || (this.params.history.replaceState ? t.history.replaceState({value: a}, null, a) : t.history.pushState({value: a}, null, a))
			}
		}, slugify: function (e) {
			return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
		}, scrollToSlide: function (e, t, i) {
			if (t) for (var s = 0, a = this.slides.length; s < a; s += 1) {
				var r = this.slides.eq(s);
				if (pe.slugify(r.attr("data-history")) === t && !r.hasClass(this.params.slideDuplicateClass)) {
					var n = r.index();
					this.slideTo(n, e, i)
				}
			} else this.slideTo(0, e, i)
		}
	}, ce = {
		onHashCange: function () {
			var t = e.location.hash.replace("#", "");
			if (t !== this.slides.eq(this.activeIndex).attr("data-hash")) {
				var i = this.$wrapperEl.children("." + this.params.slideClass + '[data-hash="' + t + '"]').index();
				if (void 0 === i) return;
				this.slideTo(i)
			}
		}, setHash: function () {
			if (this.hashNavigation.initialized && this.params.hashNavigation.enabled) if (this.params.hashNavigation.replaceState && t.history && t.history.replaceState) t.history.replaceState(null, null, "#" + this.slides.eq(this.activeIndex).attr("data-hash") || ""); else {
				var i = this.slides.eq(this.activeIndex), s = i.attr("data-hash") || i.attr("data-history");
				e.location.hash = s || ""
			}
		}, init: function () {
			if (!(!this.params.hashNavigation.enabled || this.params.history && this.params.history.enabled)) {
				this.hashNavigation.initialized = !0;
				var i = e.location.hash.replace("#", "");
				if (i) for (var a = 0, r = this.slides.length; a < r; a += 1) {
					var n = this.slides.eq(a);
					if ((n.attr("data-hash") || n.attr("data-history")) === i && !n.hasClass(this.params.slideDuplicateClass)) {
						var o = n.index();
						this.slideTo(o, 0, this.params.runCallbacksOnInit, !0)
					}
				}
				this.params.hashNavigation.watchState && s(t).on("hashchange", this.hashNavigation.onHashCange)
			}
		}, destroy: function () {
			this.params.hashNavigation.watchState && s(t).off("hashchange", this.hashNavigation.onHashCange)
		}
	}, ue = {
		run: function () {
			var e = this, t = e.slides.eq(e.activeIndex), i = e.params.autoplay.delay;
			t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), clearTimeout(e.autoplay.timeout), e.autoplay.timeout = n.nextTick((function () {
				e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")), e.params.cssMode && e.autoplay.running && e.autoplay.run()
			}), i)
		}, start: function () {
			return void 0 === this.autoplay.timeout && (!this.autoplay.running && (this.autoplay.running = !0, this.emit("autoplayStart"), this.autoplay.run(), !0))
		}, stop: function () {
			return !!this.autoplay.running && (void 0 !== this.autoplay.timeout && (this.autoplay.timeout && (clearTimeout(this.autoplay.timeout), this.autoplay.timeout = void 0), this.autoplay.running = !1, this.emit("autoplayStop"), !0))
		}, pause: function (e) {
			this.autoplay.running && (this.autoplay.paused || (this.autoplay.timeout && clearTimeout(this.autoplay.timeout), this.autoplay.paused = !0, 0 !== e && this.params.autoplay.waitForTransition ? (this.$wrapperEl[0].addEventListener("transitionend", this.autoplay.onTransitionEnd), this.$wrapperEl[0].addEventListener("webkitTransitionEnd", this.autoplay.onTransitionEnd)) : (this.autoplay.paused = !1, this.autoplay.run())))
		}
	}, ve = {
		setTranslate: function () {
			for (var e = this.slides, t = 0; t < e.length; t += 1) {
				var i = this.slides.eq(t), s = -i[0].swiperSlideOffset;
				this.params.virtualTranslate || (s -= this.translate);
				var a = 0;
				this.isHorizontal() || (a = s, s = 0);
				var r = this.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
				i.css({opacity: r}).transform("translate3d(" + s + "px, " + a + "px, 0px)")
			}
		}, setTransition: function (e) {
			var t = this, i = t.slides, s = t.$wrapperEl;
			if (i.transition(e), t.params.virtualTranslate && 0 !== e) {
				var a = !1;
				i.transitionEnd((function () {
					if (!a && t && !t.destroyed) {
						a = !0, t.animating = !1;
						for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) s.trigger(e[i])
					}
				}))
			}
		}
	}, fe = {
		setTranslate: function () {
			var e, t = this.$el, i = this.$wrapperEl, a = this.slides, r = this.width, n = this.height,
				o = this.rtlTranslate, l = this.size, d = this.params.cubeEffect, h = this.isHorizontal(),
				p = this.virtual && this.params.virtual.enabled, c = 0;
			d.shadow && (h ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = s('<div class="swiper-cube-shadow"></div>'), i.append(e)), e.css({height: r + "px"})) : 0 === (e = t.find(".swiper-cube-shadow")).length && (e = s('<div class="swiper-cube-shadow"></div>'), t.append(e)));
			for (var u = 0; u < a.length; u += 1) {
				var v = a.eq(u), f = u;
				p && (f = parseInt(v.attr("data-swiper-slide-index"), 10));
				var m = 90 * f, g = Math.floor(m / 360);
				o && (m = -m, g = Math.floor(-m / 360));
				var b = Math.max(Math.min(v[0].progress, 1), -1), w = 0, y = 0, x = 0;
				f % 4 == 0 ? (w = 4 * -g * l, x = 0) : (f - 1) % 4 == 0 ? (w = 0, x = 4 * -g * l) : (f - 2) % 4 == 0 ? (w = l + 4 * g * l, x = l) : (f - 3) % 4 == 0 && (w = -l, x = 3 * l + 4 * l * g), o && (w = -w), h || (y = w, w = 0);
				var T = "rotateX(" + (h ? 0 : -m) + "deg) rotateY(" + (h ? m : 0) + "deg) translate3d(" + w + "px, " + y + "px, " + x + "px)";
				if (b <= 1 && b > -1 && (c = 90 * f + 90 * b, o && (c = 90 * -f - 90 * b)), v.transform(T), d.slideShadows) {
					var E = h ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
						C = h ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
					0 === E.length && (E = s('<div class="swiper-slide-shadow-' + (h ? "left" : "top") + '"></div>'), v.append(E)), 0 === C.length && (C = s('<div class="swiper-slide-shadow-' + (h ? "right" : "bottom") + '"></div>'), v.append(C)), E.length && (E[0].style.opacity = Math.max(-b, 0)), C.length && (C[0].style.opacity = Math.max(b, 0))
				}
			}
			if (i.css({
				"-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
				"-moz-transform-origin": "50% 50% -" + l / 2 + "px",
				"-ms-transform-origin": "50% 50% -" + l / 2 + "px",
				"transform-origin": "50% 50% -" + l / 2 + "px"
			}), d.shadow) if (h) e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")"); else {
				var S = Math.abs(c) - 90 * Math.floor(Math.abs(c) / 90),
					M = 1.5 - (Math.sin(2 * S * Math.PI / 360) / 2 + Math.cos(2 * S * Math.PI / 360) / 2),
					P = d.shadowScale, z = d.shadowScale / M, k = d.shadowOffset;
				e.transform("scale3d(" + P + ", 1, " + z + ") translate3d(0px, " + (n / 2 + k) + "px, " + -n / 2 / z + "px) rotateX(-90deg)")
			}
			var $ = j.isSafari || j.isUiWebView ? -l / 2 : 0;
			i.transform("translate3d(0px,0," + $ + "px) rotateX(" + (this.isHorizontal() ? 0 : c) + "deg) rotateY(" + (this.isHorizontal() ? -c : 0) + "deg)")
		}, setTransition: function (e) {
			var t = this.$el;
			this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
		}
	}, me = {
		setTranslate: function () {
			for (var e = this.slides, t = this.rtlTranslate, i = 0; i < e.length; i += 1) {
				var a = e.eq(i), r = a[0].progress;
				this.params.flipEffect.limitRotation && (r = Math.max(Math.min(a[0].progress, 1), -1));
				var n = -180 * r, o = 0, l = -a[0].swiperSlideOffset, d = 0;
				if (this.isHorizontal() ? t && (n = -n) : (d = l, l = 0, o = -n, n = 0), a[0].style.zIndex = -Math.abs(Math.round(r)) + e.length, this.params.flipEffect.slideShadows) {
					var h = this.isHorizontal() ? a.find(".swiper-slide-shadow-left") : a.find(".swiper-slide-shadow-top"),
						p = this.isHorizontal() ? a.find(".swiper-slide-shadow-right") : a.find(".swiper-slide-shadow-bottom");
					0 === h.length && (h = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "left" : "top") + '"></div>'), a.append(h)), 0 === p.length && (p = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "right" : "bottom") + '"></div>'), a.append(p)), h.length && (h[0].style.opacity = Math.max(-r, 0)), p.length && (p[0].style.opacity = Math.max(r, 0))
				}
				a.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
			}
		}, setTransition: function (e) {
			var t = this, i = t.slides, s = t.activeIndex, a = t.$wrapperEl;
			if (i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.virtualTranslate && 0 !== e) {
				var r = !1;
				i.eq(s).transitionEnd((function () {
					if (!r && t && !t.destroyed) {
						r = !0, t.animating = !1;
						for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) a.trigger(e[i])
					}
				}))
			}
		}
	}, ge = {
		setTranslate: function () {
			for (var e = this.width, t = this.height, i = this.slides, a = this.$wrapperEl, r = this.slidesSizesGrid, n = this.params.coverflowEffect, l = this.isHorizontal(), d = this.translate, h = l ? e / 2 - d : t / 2 - d, p = l ? n.rotate : -n.rotate, c = n.depth, u = 0, v = i.length; u < v; u += 1) {
				var f = i.eq(u), m = r[u], g = (h - f[0].swiperSlideOffset - m / 2) / m * n.modifier, b = l ? p * g : 0,
					w = l ? 0 : p * g, y = -c * Math.abs(g), x = l ? 0 : n.stretch * g, T = l ? n.stretch * g : 0;
				Math.abs(T) < .001 && (T = 0), Math.abs(x) < .001 && (x = 0), Math.abs(y) < .001 && (y = 0), Math.abs(b) < .001 && (b = 0), Math.abs(w) < .001 && (w = 0);
				var E = "translate3d(" + T + "px," + x + "px," + y + "px)  rotateX(" + w + "deg) rotateY(" + b + "deg)";
				if (f.transform(E), f[0].style.zIndex = 1 - Math.abs(Math.round(g)), n.slideShadows) {
					var C = l ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top"),
						S = l ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
					0 === C.length && (C = s('<div class="swiper-slide-shadow-' + (l ? "left" : "top") + '"></div>'), f.append(C)), 0 === S.length && (S = s('<div class="swiper-slide-shadow-' + (l ? "right" : "bottom") + '"></div>'), f.append(S)), C.length && (C[0].style.opacity = g > 0 ? g : 0), S.length && (S[0].style.opacity = -g > 0 ? -g : 0)
				}
			}
			(o.pointerEvents || o.prefixedPointerEvents) && (a[0].style.perspectiveOrigin = h + "px 50%")
		}, setTransition: function (e) {
			this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
		}
	}, be = {
		init: function () {
			var e = this.params.thumbs, t = this.constructor;
			e.swiper instanceof t ? (this.thumbs.swiper = e.swiper, n.extend(this.thumbs.swiper.originalParams, {
				watchSlidesProgress: !0,
				slideToClickedSlide: !1
			}), n.extend(this.thumbs.swiper.params, {
				watchSlidesProgress: !0,
				slideToClickedSlide: !1
			})) : n.isObject(e.swiper) && (this.thumbs.swiper = new t(n.extend({}, e.swiper, {
				watchSlidesVisibility: !0,
				watchSlidesProgress: !0,
				slideToClickedSlide: !1
			})), this.thumbs.swiperCreated = !0), this.thumbs.swiper.$el.addClass(this.params.thumbs.thumbsContainerClass), this.thumbs.swiper.on("tap", this.thumbs.onThumbClick)
		}, onThumbClick: function () {
			var e = this.thumbs.swiper;
			if (e) {
				var t = e.clickedIndex, i = e.clickedSlide;
				if (!(i && s(i).hasClass(this.params.thumbs.slideThumbActiveClass) || null == t)) {
					var a;
					if (a = e.params.loop ? parseInt(s(e.clickedSlide).attr("data-swiper-slide-index"), 10) : t, this.params.loop) {
						var r = this.activeIndex;
						this.slides.eq(r).hasClass(this.params.slideDuplicateClass) && (this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft, r = this.activeIndex);
						var n = this.slides.eq(r).prevAll('[data-swiper-slide-index="' + a + '"]').eq(0).index(),
							o = this.slides.eq(r).nextAll('[data-swiper-slide-index="' + a + '"]').eq(0).index();
						a = void 0 === n ? o : void 0 === o ? n : o - r < r - n ? o : n
					}
					this.slideTo(a)
				}
			}
		}, update: function (e) {
			var t = this.thumbs.swiper;
			if (t) {
				var i = "auto" === t.params.slidesPerView ? t.slidesPerViewDynamic() : t.params.slidesPerView;
				if (this.realIndex !== t.realIndex) {
					var s, a = t.activeIndex;
					if (t.params.loop) {
						t.slides.eq(a).hasClass(t.params.slideDuplicateClass) && (t.loopFix(), t._clientLeft = t.$wrapperEl[0].clientLeft, a = t.activeIndex);
						var r = t.slides.eq(a).prevAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index(),
							n = t.slides.eq(a).nextAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index();
						s = void 0 === r ? n : void 0 === n ? r : n - a == a - r ? a : n - a < a - r ? n : r
					} else s = this.realIndex;
					t.visibleSlidesIndexes && t.visibleSlidesIndexes.indexOf(s) < 0 && (t.params.centeredSlides ? s = s > a ? s - Math.floor(i / 2) + 1 : s + Math.floor(i / 2) - 1 : s > a && (s = s - i + 1), t.slideTo(s, e ? 0 : void 0))
				}
				var o = 1, l = this.params.thumbs.slideThumbActiveClass;
				if (this.params.slidesPerView > 1 && !this.params.centeredSlides && (o = this.params.slidesPerView), t.slides.removeClass(l), t.params.loop || t.params.virtual && t.params.virtual.enabled) for (var d = 0; d < o; d += 1) t.$wrapperEl.children('[data-swiper-slide-index="' + (this.realIndex + d) + '"]').addClass(l); else for (var h = 0; h < o; h += 1) t.slides.eq(this.realIndex + h).addClass(l)
			}
		}
	}, we = [R, q, K, U, Z, J, te, {
		name: "mousewheel",
		params: {
			mousewheel: {
				enabled: !1,
				releaseOnEdges: !1,
				invert: !1,
				forceToAxis: !1,
				sensitivity: 1,
				eventsTarged: "container"
			}
		},
		create: function () {
			n.extend(this, {
				mousewheel: {
					enabled: !1,
					enable: ie.enable.bind(this),
					disable: ie.disable.bind(this),
					handle: ie.handle.bind(this),
					handleMouseEnter: ie.handleMouseEnter.bind(this),
					handleMouseLeave: ie.handleMouseLeave.bind(this),
					lastScrollTime: n.now(),
					lastEventBeforeSnap: void 0,
					recentWheelEvents: []
				}
			})
		},
		on: {
			init: function () {
				!this.params.mousewheel.enabled && this.params.cssMode && this.mousewheel.disable(), this.params.mousewheel.enabled && this.mousewheel.enable()
			}, destroy: function () {
				this.params.cssMode && this.mousewheel.enable(), this.mousewheel.enabled && this.mousewheel.disable()
			}
		}
	}, {
		name: "navigation",
		params: {
			navigation: {
				nextEl: null,
				prevEl: null,
				hideOnClick: !1,
				disabledClass: "swiper-button-disabled",
				hiddenClass: "swiper-button-hidden",
				lockClass: "swiper-button-lock"
			}
		},
		create: function () {
			n.extend(this, {
				navigation: {
					init: se.init.bind(this),
					update: se.update.bind(this),
					destroy: se.destroy.bind(this),
					onNextClick: se.onNextClick.bind(this),
					onPrevClick: se.onPrevClick.bind(this)
				}
			})
		},
		on: {
			init: function () {
				this.navigation.init(), this.navigation.update()
			}, toEdge: function () {
				this.navigation.update()
			}, fromEdge: function () {
				this.navigation.update()
			}, destroy: function () {
				this.navigation.destroy()
			}, click: function (e) {
				var t, i = this.navigation, a = i.$nextEl, r = i.$prevEl;
				!this.params.navigation.hideOnClick || s(e.target).is(r) || s(e.target).is(a) || (a ? t = a.hasClass(this.params.navigation.hiddenClass) : r && (t = r.hasClass(this.params.navigation.hiddenClass)), !0 === t ? this.emit("navigationShow", this) : this.emit("navigationHide", this), a && a.toggleClass(this.params.navigation.hiddenClass), r && r.toggleClass(this.params.navigation.hiddenClass))
			}
		}
	}, {
		name: "pagination",
		params: {
			pagination: {
				el: null,
				bulletElement: "span",
				clickable: !1,
				hideOnClick: !1,
				renderBullet: null,
				renderProgressbar: null,
				renderFraction: null,
				renderCustom: null,
				progressbarOpposite: !1,
				type: "bullets",
				dynamicBullets: !1,
				dynamicMainBullets: 1,
				formatFractionCurrent: function (e) {
					return e
				},
				formatFractionTotal: function (e) {
					return e
				},
				bulletClass: "swiper-pagination-bullet",
				bulletActiveClass: "swiper-pagination-bullet-active",
				modifierClass: "swiper-pagination-",
				currentClass: "swiper-pagination-current",
				totalClass: "swiper-pagination-total",
				hiddenClass: "swiper-pagination-hidden",
				progressbarFillClass: "swiper-pagination-progressbar-fill",
				progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
				clickableClass: "swiper-pagination-clickable",
				lockClass: "swiper-pagination-lock"
			}
		},
		create: function () {
			n.extend(this, {
				pagination: {
					init: ae.init.bind(this),
					render: ae.render.bind(this),
					update: ae.update.bind(this),
					destroy: ae.destroy.bind(this),
					dynamicBulletIndex: 0
				}
			})
		},
		on: {
			init: function () {
				this.pagination.init(), this.pagination.render(), this.pagination.update()
			}, activeIndexChange: function () {
				this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update()
			}, snapIndexChange: function () {
				this.params.loop || this.pagination.update()
			}, slidesLengthChange: function () {
				this.params.loop && (this.pagination.render(), this.pagination.update())
			}, snapGridLengthChange: function () {
				this.params.loop || (this.pagination.render(), this.pagination.update())
			}, destroy: function () {
				this.pagination.destroy()
			}, click: function (e) {
				this.params.pagination.el && this.params.pagination.hideOnClick && this.pagination.$el.length > 0 && !s(e.target).hasClass(this.params.pagination.bulletClass) && (!0 === this.pagination.$el.hasClass(this.params.pagination.hiddenClass) ? this.emit("paginationShow", this) : this.emit("paginationHide", this), this.pagination.$el.toggleClass(this.params.pagination.hiddenClass))
			}
		}
	}, {
		name: "scrollbar",
		params: {
			scrollbar: {
				el: null,
				dragSize: "auto",
				hide: !1,
				draggable: !1,
				snapOnRelease: !0,
				lockClass: "swiper-scrollbar-lock",
				dragClass: "swiper-scrollbar-drag"
			}
		},
		create: function () {
			n.extend(this, {
				scrollbar: {
					init: re.init.bind(this),
					destroy: re.destroy.bind(this),
					updateSize: re.updateSize.bind(this),
					setTranslate: re.setTranslate.bind(this),
					setTransition: re.setTransition.bind(this),
					enableDraggable: re.enableDraggable.bind(this),
					disableDraggable: re.disableDraggable.bind(this),
					setDragPosition: re.setDragPosition.bind(this),
					getPointerPosition: re.getPointerPosition.bind(this),
					onDragStart: re.onDragStart.bind(this),
					onDragMove: re.onDragMove.bind(this),
					onDragEnd: re.onDragEnd.bind(this),
					isTouched: !1,
					timeout: null,
					dragTimeout: null
				}
			})
		},
		on: {
			init: function () {
				this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate()
			}, update: function () {
				this.scrollbar.updateSize()
			}, resize: function () {
				this.scrollbar.updateSize()
			}, observerUpdate: function () {
				this.scrollbar.updateSize()
			}, setTranslate: function () {
				this.scrollbar.setTranslate()
			}, setTransition: function (e) {
				this.scrollbar.setTransition(e)
			}, destroy: function () {
				this.scrollbar.destroy()
			}
		}
	}, {
		name: "parallax", params: {parallax: {enabled: !1}}, create: function () {
			n.extend(this, {
				parallax: {
					setTransform: ne.setTransform.bind(this),
					setTranslate: ne.setTranslate.bind(this),
					setTransition: ne.setTransition.bind(this)
				}
			})
		}, on: {
			beforeInit: function () {
				this.params.parallax.enabled && (this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0)
			}, init: function () {
				this.params.parallax.enabled && this.parallax.setTranslate()
			}, setTranslate: function () {
				this.params.parallax.enabled && this.parallax.setTranslate()
			}, setTransition: function (e) {
				this.params.parallax.enabled && this.parallax.setTransition(e)
			}
		}
	}, {
		name: "zoom",
		params: {
			zoom: {
				enabled: !1,
				maxRatio: 3,
				minRatio: 1,
				toggle: !0,
				containerClass: "swiper-zoom-container",
				zoomedSlideClass: "swiper-slide-zoomed"
			}
		},
		create: function () {
			var e = this, t = {
				enabled: !1,
				scale: 1,
				currentScale: 1,
				isScaling: !1,
				gesture: {
					$slideEl: void 0,
					slideWidth: void 0,
					slideHeight: void 0,
					$imageEl: void 0,
					$imageWrapEl: void 0,
					maxRatio: 3
				},
				image: {
					isTouched: void 0,
					isMoved: void 0,
					currentX: void 0,
					currentY: void 0,
					minX: void 0,
					minY: void 0,
					maxX: void 0,
					maxY: void 0,
					width: void 0,
					height: void 0,
					startX: void 0,
					startY: void 0,
					touchesStart: {},
					touchesCurrent: {}
				},
				velocity: {x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0}
			};
			"onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach((function (i) {
				t[i] = oe[i].bind(e)
			})), n.extend(e, {zoom: t});
			var i = 1;
			Object.defineProperty(e.zoom, "scale", {
				get: function () {
					return i
				}, set: function (t) {
					if (i !== t) {
						var s = e.zoom.gesture.$imageEl ? e.zoom.gesture.$imageEl[0] : void 0,
							a = e.zoom.gesture.$slideEl ? e.zoom.gesture.$slideEl[0] : void 0;
						e.emit("zoomChange", t, s, a)
					}
					i = t
				}
			})
		},
		on: {
			init: function () {
				this.params.zoom.enabled && this.zoom.enable()
			}, destroy: function () {
				this.zoom.disable()
			}, touchStart: function (e) {
				this.zoom.enabled && this.zoom.onTouchStart(e)
			}, touchEnd: function (e) {
				this.zoom.enabled && this.zoom.onTouchEnd(e)
			}, doubleTap: function (e) {
				this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e)
			}, transitionEnd: function () {
				this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd()
			}, slideChange: function () {
				this.zoom.enabled && this.params.zoom.enabled && this.params.cssMode && this.zoom.onTransitionEnd()
			}
		}
	}, {
		name: "lazy",
		params: {
			lazy: {
				enabled: !1,
				loadPrevNext: !1,
				loadPrevNextAmount: 1,
				loadOnTransitionStart: !1,
				elementClass: "swiper-lazy",
				loadingClass: "swiper-lazy-loading",
				loadedClass: "swiper-lazy-loaded",
				preloaderClass: "swiper-lazy-preloader"
			}
		},
		create: function () {
			n.extend(this, {
				lazy: {
					initialImageLoaded: !1,
					load: le.load.bind(this),
					loadInSlide: le.loadInSlide.bind(this)
				}
			})
		},
		on: {
			beforeInit: function () {
				this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1)
			}, init: function () {
				this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load()
			}, scroll: function () {
				this.params.freeMode && !this.params.freeModeSticky && this.lazy.load()
			}, resize: function () {
				this.params.lazy.enabled && this.lazy.load()
			}, scrollbarDragMove: function () {
				this.params.lazy.enabled && this.lazy.load()
			}, transitionStart: function () {
				this.params.lazy.enabled && (this.params.lazy.loadOnTransitionStart || !this.params.lazy.loadOnTransitionStart && !this.lazy.initialImageLoaded) && this.lazy.load()
			}, transitionEnd: function () {
				this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load()
			}, slideChange: function () {
				this.params.lazy.enabled && this.params.cssMode && this.lazy.load()
			}
		}
	}, {
		name: "controller", params: {controller: {control: void 0, inverse: !1, by: "slide"}}, create: function () {
			n.extend(this, {
				controller: {
					control: this.params.controller.control,
					getInterpolateFunction: de.getInterpolateFunction.bind(this),
					setTranslate: de.setTranslate.bind(this),
					setTransition: de.setTransition.bind(this)
				}
			})
		}, on: {
			update: function () {
				this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
			}, resize: function () {
				this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
			}, observerUpdate: function () {
				this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
			}, setTranslate: function (e, t) {
				this.controller.control && this.controller.setTranslate(e, t)
			}, setTransition: function (e, t) {
				this.controller.control && this.controller.setTransition(e, t)
			}
		}
	}, {
		name: "a11y",
		params: {
			a11y: {
				enabled: !0,
				notificationClass: "swiper-notification",
				prevSlideMessage: "Previous slide",
				nextSlideMessage: "Next slide",
				firstSlideMessage: "This is the first slide",
				lastSlideMessage: "This is the last slide",
				paginationBulletMessage: "Go to slide {{index}}"
			}
		},
		create: function () {
			var e = this;
			n.extend(e, {a11y: {liveRegion: s('<span class="' + e.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')}}), Object.keys(he).forEach((function (t) {
				e.a11y[t] = he[t].bind(e)
			}))
		},
		on: {
			init: function () {
				this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation())
			}, toEdge: function () {
				this.params.a11y.enabled && this.a11y.updateNavigation()
			}, fromEdge: function () {
				this.params.a11y.enabled && this.a11y.updateNavigation()
			}, paginationUpdate: function () {
				this.params.a11y.enabled && this.a11y.updatePagination()
			}, destroy: function () {
				this.params.a11y.enabled && this.a11y.destroy()
			}
		}
	}, {
		name: "history", params: {history: {enabled: !1, replaceState: !1, key: "slides"}}, create: function () {
			n.extend(this, {
				history: {
					init: pe.init.bind(this),
					setHistory: pe.setHistory.bind(this),
					setHistoryPopState: pe.setHistoryPopState.bind(this),
					scrollToSlide: pe.scrollToSlide.bind(this),
					destroy: pe.destroy.bind(this)
				}
			})
		}, on: {
			init: function () {
				this.params.history.enabled && this.history.init()
			}, destroy: function () {
				this.params.history.enabled && this.history.destroy()
			}, transitionEnd: function () {
				this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex)
			}, slideChange: function () {
				this.history.initialized && this.params.cssMode && this.history.setHistory(this.params.history.key, this.activeIndex)
			}
		}
	}, {
		name: "hash-navigation",
		params: {hashNavigation: {enabled: !1, replaceState: !1, watchState: !1}},
		create: function () {
			n.extend(this, {
				hashNavigation: {
					initialized: !1,
					init: ce.init.bind(this),
					destroy: ce.destroy.bind(this),
					setHash: ce.setHash.bind(this),
					onHashCange: ce.onHashCange.bind(this)
				}
			})
		},
		on: {
			init: function () {
				this.params.hashNavigation.enabled && this.hashNavigation.init()
			}, destroy: function () {
				this.params.hashNavigation.enabled && this.hashNavigation.destroy()
			}, transitionEnd: function () {
				this.hashNavigation.initialized && this.hashNavigation.setHash()
			}, slideChange: function () {
				this.hashNavigation.initialized && this.params.cssMode && this.hashNavigation.setHash()
			}
		}
	}, {
		name: "autoplay",
		params: {
			autoplay: {
				enabled: !1,
				delay: 3e3,
				waitForTransition: !0,
				disableOnInteraction: !0,
				stopOnLastSlide: !1,
				reverseDirection: !1
			}
		},
		create: function () {
			var e = this;
			n.extend(e, {
				autoplay: {
					running: !1,
					paused: !1,
					run: ue.run.bind(e),
					start: ue.start.bind(e),
					stop: ue.stop.bind(e),
					pause: ue.pause.bind(e),
					onVisibilityChange: function () {
						"hidden" === document.visibilityState && e.autoplay.running && e.autoplay.pause(), "visible" === document.visibilityState && e.autoplay.paused && (e.autoplay.run(), e.autoplay.paused = !1)
					},
					onTransitionEnd: function (t) {
						e && !e.destroyed && e.$wrapperEl && t.target === this && (e.$wrapperEl[0].removeEventListener("transitionend", e.autoplay.onTransitionEnd), e.$wrapperEl[0].removeEventListener("webkitTransitionEnd", e.autoplay.onTransitionEnd), e.autoplay.paused = !1, e.autoplay.running ? e.autoplay.run() : e.autoplay.stop())
					}
				}
			})
		},
		on: {
			init: function () {
				this.params.autoplay.enabled && (this.autoplay.start(), document.addEventListener("visibilitychange", this.autoplay.onVisibilityChange))
			}, beforeTransitionStart: function (e, t) {
				this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop())
			}, sliderFirstMove: function () {
				this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause())
			}, touchEnd: function () {
				this.params.cssMode && this.autoplay.paused && !this.params.autoplay.disableOnInteraction && this.autoplay.run()
			}, destroy: function () {
				this.autoplay.running && this.autoplay.stop(), document.removeEventListener("visibilitychange", this.autoplay.onVisibilityChange)
			}
		}
	}, {
		name: "effect-fade", params: {fadeEffect: {crossFade: !1}}, create: function () {
			n.extend(this, {
				fadeEffect: {
					setTranslate: ve.setTranslate.bind(this),
					setTransition: ve.setTransition.bind(this)
				}
			})
		}, on: {
			beforeInit: function () {
				if ("fade" === this.params.effect) {
					this.classNames.push(this.params.containerModifierClass + "fade");
					var e = {
						slidesPerView: 1,
						slidesPerColumn: 1,
						slidesPerGroup: 1,
						watchSlidesProgress: !0,
						spaceBetween: 0,
						virtualTranslate: !0
					};
					n.extend(this.params, e), n.extend(this.originalParams, e)
				}
			}, setTranslate: function () {
				"fade" === this.params.effect && this.fadeEffect.setTranslate()
			}, setTransition: function (e) {
				"fade" === this.params.effect && this.fadeEffect.setTransition(e)
			}
		}
	}, {
		name: "effect-cube",
		params: {cubeEffect: {slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94}},
		create: function () {
			n.extend(this, {
				cubeEffect: {
					setTranslate: fe.setTranslate.bind(this),
					setTransition: fe.setTransition.bind(this)
				}
			})
		},
		on: {
			beforeInit: function () {
				if ("cube" === this.params.effect) {
					this.classNames.push(this.params.containerModifierClass + "cube"), this.classNames.push(this.params.containerModifierClass + "3d");
					var e = {
						slidesPerView: 1,
						slidesPerColumn: 1,
						slidesPerGroup: 1,
						watchSlidesProgress: !0,
						resistanceRatio: 0,
						spaceBetween: 0,
						centeredSlides: !1,
						virtualTranslate: !0
					};
					n.extend(this.params, e), n.extend(this.originalParams, e)
				}
			}, setTranslate: function () {
				"cube" === this.params.effect && this.cubeEffect.setTranslate()
			}, setTransition: function (e) {
				"cube" === this.params.effect && this.cubeEffect.setTransition(e)
			}
		}
	}, {
		name: "effect-flip", params: {flipEffect: {slideShadows: !0, limitRotation: !0}}, create: function () {
			n.extend(this, {
				flipEffect: {
					setTranslate: me.setTranslate.bind(this),
					setTransition: me.setTransition.bind(this)
				}
			})
		}, on: {
			beforeInit: function () {
				if ("flip" === this.params.effect) {
					this.classNames.push(this.params.containerModifierClass + "flip"), this.classNames.push(this.params.containerModifierClass + "3d");
					var e = {
						slidesPerView: 1,
						slidesPerColumn: 1,
						slidesPerGroup: 1,
						watchSlidesProgress: !0,
						spaceBetween: 0,
						virtualTranslate: !0
					};
					n.extend(this.params, e), n.extend(this.originalParams, e)
				}
			}, setTranslate: function () {
				"flip" === this.params.effect && this.flipEffect.setTranslate()
			}, setTransition: function (e) {
				"flip" === this.params.effect && this.flipEffect.setTransition(e)
			}
		}
	}, {
		name: "effect-coverflow",
		params: {coverflowEffect: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0}},
		create: function () {
			n.extend(this, {
				coverflowEffect: {
					setTranslate: ge.setTranslate.bind(this),
					setTransition: ge.setTransition.bind(this)
				}
			})
		},
		on: {
			beforeInit: function () {
				"coverflow" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "coverflow"), this.classNames.push(this.params.containerModifierClass + "3d"), this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0)
			}, setTranslate: function () {
				"coverflow" === this.params.effect && this.coverflowEffect.setTranslate()
			}, setTransition: function (e) {
				"coverflow" === this.params.effect && this.coverflowEffect.setTransition(e)
			}
		}
	}, {
		name: "thumbs",
		params: {
			thumbs: {
				swiper: null,
				slideThumbActiveClass: "swiper-slide-thumb-active",
				thumbsContainerClass: "swiper-container-thumbs"
			}
		},
		create: function () {
			n.extend(this, {
				thumbs: {
					swiper: null,
					init: be.init.bind(this),
					update: be.update.bind(this),
					onThumbClick: be.onThumbClick.bind(this)
				}
			})
		},
		on: {
			beforeInit: function () {
				var e = this.params.thumbs;
				e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0))
			}, slideChange: function () {
				this.thumbs.swiper && this.thumbs.update()
			}, update: function () {
				this.thumbs.swiper && this.thumbs.update()
			}, resize: function () {
				this.thumbs.swiper && this.thumbs.update()
			}, observerUpdate: function () {
				this.thumbs.swiper && this.thumbs.update()
			}, setTransition: function (e) {
				var t = this.thumbs.swiper;
				t && t.setTransition(e)
			}, beforeDestroy: function () {
				var e = this.thumbs.swiper;
				e && this.thumbs.swiperCreated && e && e.destroy()
			}
		}
	}];
	return void 0 === W.use && (W.use = W.Class.use, W.installModule = W.Class.installModule), W.use(we), W
}));
//# sourceMappingURL=swiper.min.js.map
/*!
 * GSAP 3.8.0
 * https://greensock.com
 *
 * @license Copyright 2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!function (t, e) {
	"object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {})
}(this, function (e) {
	"use strict";

	function _inheritsLoose(t, e) {
		t.prototype = Object.create(e.prototype), (t.prototype.constructor = t).__proto__ = e
	}

	function _assertThisInitialized(t) {
		if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t
	}

	function o(t) {
		return "string" == typeof t
	}

	function p(t) {
		return "function" == typeof t
	}

	function q(t) {
		return "number" == typeof t
	}

	function r(t) {
		return void 0 === t
	}

	function s(t) {
		return "object" == typeof t
	}

	function t(t) {
		return !1 !== t
	}

	function u() {
		return "undefined" != typeof window
	}

	function v(t) {
		return p(t) || o(t)
	}

	function M(t) {
		return (h = mt(t, ot)) && oe
	}

	function N(t, e) {
		return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()")
	}

	function O(t, e) {
		return !e && console.warn(t)
	}

	function P(t, e) {
		return t && (ot[t] = e) && h && (h[t] = e) || ot
	}

	function Q() {
		return 0
	}

	function $(t) {
		var e, r, i = t[0];
		if (s(i) || p(i) || (t = [t]), !(e = (i._gsap || {}).harness)) {
			for (r = ct.length; r-- && !ct[r].targetTest(i);) ;
			e = ct[r]
		}
		for (r = t.length; r--;) t[r] && (t[r]._gsap || (t[r]._gsap = new Lt(t[r], e))) || t.splice(r, 1);
		return t
	}

	function _(t) {
		return t._gsap || $(xt(t))[0]._gsap
	}

	function aa(t, e, i) {
		return (i = t[e]) && p(i) ? t[e]() : r(i) && t.getAttribute && t.getAttribute(e) || i
	}

	function ba(t, e) {
		return (t = t.split(",")).forEach(e) || t
	}

	function ca(t) {
		return Math.round(1e5 * t) / 1e5 || 0
	}

	function da(t) {
		return Math.round(1e7 * t) / 1e7 || 0
	}

	function ea(t, e) {
		for (var r = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < r;) ;
		return i < r
	}

	function fa() {
		var t, e, r = ht.length, i = ht.slice(0);
		for (lt = {}, t = ht.length = 0; t < r; t++) (e = i[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0)
	}

	function ga(t, e, r, i) {
		ht.length && fa(), t.render(e, r, i), ht.length && fa()
	}

	function ha(t) {
		var e = parseFloat(t);
		return (e || 0 === e) && (t + "").match(at).length < 2 ? e : o(t) ? t.trim() : t
	}

	function ia(t) {
		return t
	}

	function ja(t, e) {
		for (var r in e) r in t || (t[r] = e[r]);
		return t
	}

	function ka(t, e) {
		for (var r in e) r in t || "duration" === r || "ease" === r || (t[r] = e[r])
	}

	function ma(t, e) {
		for (var r in e) "__proto__" !== r && "constructor" !== r && "prototype" !== r && (t[r] = s(e[r]) ? ma(t[r] || (t[r] = {}), e[r]) : e[r]);
		return t
	}

	function na(t, e) {
		var r, i = {};
		for (r in t) r in e || (i[r] = t[r]);
		return i
	}

	function oa(e) {
		var r = e.parent || I, i = e.keyframes ? ka : ja;
		if (t(e.inherit)) for (; r;) i(e, r.vars.defaults), r = r.parent || r._dp;
		return e
	}

	function ra(t, e, r, i) {
		void 0 === r && (r = "_first"), void 0 === i && (i = "_last");
		var n = e._prev, a = e._next;
		n ? n._next = a : t[r] === e && (t[r] = a), a ? a._prev = n : t[i] === e && (t[i] = n), e._next = e._prev = e.parent = null
	}

	function sa(t, e) {
		!t.parent || e && !t.parent.autoRemoveChildren || t.parent.remove(t), t._act = 0
	}

	function ta(t, e) {
		if (t && (!e || e._end > t._dur || e._start < 0)) for (var r = t; r;) r._dirty = 1, r = r.parent;
		return t
	}

	function wa(t) {
		return t._repeat ? gt(t._tTime, t = t.duration() + t._rDelay) * t : 0
	}

	function ya(t, e) {
		return (t - e._start) * e._ts + (0 <= e._ts ? 0 : e._dirty ? e.totalDuration() : e._tDur)
	}

	function za(t) {
		return t._end = da(t._start + (t._tDur / Math.abs(t._ts || t._rts || X) || 0))
	}

	function Aa(t, e) {
		var r = t._dp;
		return r && r.smoothChildTiming && t._ts && (t._start = da(r._time - (0 < t._ts ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), za(t), r._dirty || ta(r, t)), t
	}

	function Ba(t, e) {
		var r;
		if ((e._time || e._initted && !e._dur) && (r = ya(t.rawTime(), e), (!e._dur || Tt(0, e.totalDuration(), r) - e._tTime > X) && e.render(r, !0)), ta(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
			if (t._dur < t.duration()) for (r = t; r._dp;) 0 <= r.rawTime() && r.totalTime(r._tTime), r = r._dp;
			t._zTime = -X
		}
	}

	function Ca(t, e, r, i) {
		return e.parent && sa(e), e._start = da((q(r) ? r : r || t !== I ? bt(t, r, e) : t._time) + e._delay), e._end = da(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), function _addLinkedListItem(t, e, r, i, n) {
			void 0 === r && (r = "_first"), void 0 === i && (i = "_last");
			var a, s = t[i];
			if (n) for (a = e[n]; s && s[n] > a;) s = s._prev;
			s ? (e._next = s._next, s._next = e) : (e._next = t[r], t[r] = e), e._next ? e._next._prev = e : t[i] = e, e._prev = s, e.parent = e._dp = t
		}(t, e, "_first", "_last", t._sort ? "_start" : 0), vt(e) || (t._recent = e), i || Ba(t, e), t
	}

	function Da(t, e) {
		return (ot.ScrollTrigger || N("scrollTrigger", e)) && ot.ScrollTrigger.create(e, t)
	}

	function Ea(t, e, r, i) {
		return jt(t, e), t._initted ? !r && t._pt && (t._dur && !1 !== t.vars.lazy || !t._dur && t.vars.lazy) && f !== St.frame ? (ht.push(t), t._lazy = [e, i], 1) : void 0 : 1
	}

	function Ja(t, e, r, i) {
		var n = t._repeat, a = da(e) || 0, s = t._tTime / t._tDur;
		return s && !i && (t._time *= a / t._dur), t._dur = a, t._tDur = n ? n < 0 ? 1e10 : da(a * (n + 1) + t._rDelay * n) : a, s && !i ? Aa(t, t._tTime = t._tDur * s) : t.parent && za(t), r || ta(t.parent, t), t
	}

	function Ka(t) {
		return t instanceof Nt ? ta(t) : Ja(t, t._dur)
	}

	function Na(e, r, i) {
		var n, a, s = q(r[1]), o = (s ? 2 : 1) + (e < 2 ? 0 : 1), u = r[o];
		if (s && (u.duration = r[1]), u.parent = i, e) {
			for (n = u, a = i; a && !("immediateRender" in n);) n = a.vars.defaults || {}, a = t(a.vars.inherit) && a.parent;
			u.immediateRender = t(n.immediateRender), e < 2 ? u.runBackwards = 1 : u.startAt = r[o - 1]
		}
		return new Vt(r[0], u, r[1 + o])
	}

	function Oa(t, e) {
		return t || 0 === t ? e(t) : e
	}

	function Qa(t) {
		if ("string" != typeof t) return "";
		var e = st.exec(t);
		return e ? t.substr(e.index + e[0].length) : ""
	}

	function Ta(t, e) {
		return t && s(t) && "length" in t && (!e && !t.length || t.length - 1 in t && s(t[0])) && !t.nodeType && t !== i
	}

	function Xa(t) {
		return t.sort(function () {
			return .5 - Math.random()
		})
	}

	function Ya(t) {
		if (p(t)) return t;
		var c = s(t) ? t : {each: t}, _ = Bt(c.ease), m = c.from || 0, g = parseFloat(c.base) || 0, v = {},
			e = 0 < m && m < 1, y = isNaN(m) || e, b = c.axis, T = m, w = m;
		return o(m) ? T = w = {
			center: .5,
			edges: .5,
			end: 1
		}[m] || 0 : !e && y && (T = m[0], w = m[1]), function (t, e, r) {
			var i, n, a, s, o, u, h, l, f, d = (r || c).length, p = v[d];
			if (!p) {
				if (!(f = "auto" === c.grid ? 0 : (c.grid || [1, j])[1])) {
					for (h = -j; h < (h = r[f++].getBoundingClientRect().left) && f < d;) ;
					f--
				}
				for (p = v[d] = [], i = y ? Math.min(f, d) * T - .5 : m % f, n = y ? d * w / f - .5 : m / f | 0, l = j, u = h = 0; u < d; u++) a = u % f - i, s = n - (u / f | 0), p[u] = o = b ? Math.abs("y" === b ? s : a) : W(a * a + s * s), h < o && (h = o), o < l && (l = o);
				"random" === m && Xa(p), p.max = h - l, p.min = l, p.v = d = (parseFloat(c.amount) || parseFloat(c.each) * (d < f ? d - 1 : b ? "y" === b ? d / f : f : Math.max(f, d / f)) || 0) * ("edges" === m ? -1 : 1), p.b = d < 0 ? g - d : g, p.u = Qa(c.amount || c.each) || 0, _ = _ && d < 0 ? Rt(_) : _
			}
			return d = (p[t] - p.min) / p.max || 0, da(p.b + (_ ? _(d) : d) * p.v) + p.u
		}
	}

	function Za(r) {
		var i = Math.pow(10, ((r + "").split(".")[1] || "").length);
		return function (t) {
			var e = Math.round(parseFloat(t) / r) * r * i;
			return (e - e % 1) / i + (q(t) ? 0 : Qa(t))
		}
	}

	function $a(u, t) {
		var h, l, e = Z(u);
		return !e && s(u) && (h = e = u.radius || j, u.values ? (u = xt(u.values), (l = !q(u[0])) && (h *= h)) : u = Za(u.increment)), Oa(t, e ? p(u) ? function (t) {
			return l = u(t), Math.abs(l - t) <= h ? l : t
		} : function (t) {
			for (var e, r, i = parseFloat(l ? t.x : t), n = parseFloat(l ? t.y : 0), a = j, s = 0, o = u.length; o--;) (e = l ? (e = u[o].x - i) * e + (r = u[o].y - n) * r : Math.abs(u[o] - i)) < a && (a = e, s = o);
			return s = !h || a <= h ? u[s] : t, l || s === t || q(t) ? s : s + Qa(t)
		} : Za(u))
	}

	function _a(t, e, r, i) {
		return Oa(Z(t) ? !e : !0 === r ? !!(r = 0) : !i, function () {
			return Z(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((t - r / 2 + Math.random() * (e - t + .99 * r)) / r) * r * i) / i
		})
	}

	function db(e, r, t) {
		return Oa(t, function (t) {
			return e[~~r(t)]
		})
	}

	function gb(t) {
		for (var e, r, i, n, a = 0, s = ""; ~(e = t.indexOf("random(", a));) i = t.indexOf(")", e), n = "[" === t.charAt(e + 7), r = t.substr(e + 7, i - e - 7).match(n ? at : tt), s += t.substr(a, e - a) + _a(n ? r : +r[0], n ? 0 : +r[1], +r[2] || 1e-5), a = i + 1;
		return s + t.substr(a, t.length - a)
	}

	function jb(t, e, r) {
		var i, n, a, s = t.labels, o = j;
		for (i in s) (n = s[i] - e) < 0 == !!r && n && o > (n = Math.abs(n)) && (a = i, o = n);
		return a
	}

	function lb(t) {
		return sa(t), t.scrollTrigger && t.scrollTrigger.kill(!1), t.progress() < 1 && Mt(t, "onInterrupt"), t
	}

	function qb(t, e, r) {
		return (6 * (t = t < 0 ? t + 1 : 1 < t ? t - 1 : t) < 1 ? e + (r - e) * t * 6 : t < .5 ? r : 3 * t < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) * kt + .5 | 0
	}

	function rb(t, e, r) {
		var i, n, a, s, o, u, h, l, f, d, p = t ? q(t) ? [t >> 16, t >> 8 & kt, t & kt] : 0 : At.black;
		if (!p) {
			if ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), At[t]) p = At[t]; else if ("#" === t.charAt(0)) {
				if (t.length < 6 && (t = "#" + (i = t.charAt(1)) + i + (n = t.charAt(2)) + n + (a = t.charAt(3)) + a + (5 === t.length ? t.charAt(4) + t.charAt(4) : "")), 9 === t.length) return [(p = parseInt(t.substr(1, 6), 16)) >> 16, p >> 8 & kt, p & kt, parseInt(t.substr(7), 16) / 255];
				p = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & kt, t & kt]
			} else if ("hsl" === t.substr(0, 3)) if (p = d = t.match(tt), e) {
				if (~t.indexOf("=")) return p = t.match(et), r && p.length < 4 && (p[3] = 1), p
			} else s = +p[0] % 360 / 360, o = p[1] / 100, i = 2 * (u = p[2] / 100) - (n = u <= .5 ? u * (o + 1) : u + o - u * o), 3 < p.length && (p[3] *= 1), p[0] = qb(s + 1 / 3, i, n), p[1] = qb(s, i, n), p[2] = qb(s - 1 / 3, i, n); else p = t.match(tt) || At.transparent;
			p = p.map(Number)
		}
		return e && !d && (i = p[0] / kt, n = p[1] / kt, a = p[2] / kt, u = ((h = Math.max(i, n, a)) + (l = Math.min(i, n, a))) / 2, h === l ? s = o = 0 : (f = h - l, o = .5 < u ? f / (2 - h - l) : f / (h + l), s = h === i ? (n - a) / f + (n < a ? 6 : 0) : h === n ? (a - i) / f + 2 : (i - n) / f + 4, s *= 60), p[0] = ~~(s + .5), p[1] = ~~(100 * o + .5), p[2] = ~~(100 * u + .5)), r && p.length < 4 && (p[3] = 1), p
	}

	function sb(t) {
		var r = [], i = [], n = -1;
		return t.split(Pt).forEach(function (t) {
			var e = t.match(rt) || [];
			r.push.apply(r, e), i.push(n += e.length + 1)
		}), r.c = i, r
	}

	function tb(t, e, r) {
		var i, n, a, s, o = "", u = (t + o).match(Pt), h = e ? "hsla(" : "rgba(", l = 0;
		if (!u) return t;
		if (u = u.map(function (t) {
			return (t = rb(t, e, 1)) && h + (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) + ")"
		}), r && (a = sb(t), (i = r.c).join(o) !== a.c.join(o))) for (s = (n = t.replace(Pt, "1").split(rt)).length - 1; l < s; l++) o += n[l] + (~i.indexOf(l) ? u.shift() || h + "0,0,0,0)" : (a.length ? a : u.length ? u : r).shift());
		if (!n) for (s = (n = t.split(Pt)).length - 1; l < s; l++) o += n[l] + u[l];
		return o + n[s]
	}

	function wb(t) {
		var e, r = t.join(" ");
		if (Pt.lastIndex = 0, Pt.test(r)) return e = Ct.test(r), t[1] = tb(t[1], e), t[0] = tb(t[0], e, sb(t[1])), !0
	}

	function Fb(t) {
		var e = (t + "").split("("), r = zt[e[0]];
		return r && 1 < e.length && r.config ? r.config.apply(null, ~t.indexOf("{") ? [function _parseObjectInString(t) {
			for (var e, r, i, n = {}, a = t.substr(1, t.length - 3).split(":"), s = a[0], o = 1, u = a.length; o < u; o++) r = a[o], e = o !== u - 1 ? r.lastIndexOf(",") : r.length, i = r.substr(0, e), n[s] = isNaN(i) ? i.replace(Ft, "").trim() : +i, s = r.substr(e + 1).trim();
			return n
		}(e[1])] : function _valueInParentheses(t) {
			var e = t.indexOf("(") + 1, r = t.indexOf(")"), i = t.indexOf("(", e);
			return t.substring(e, ~i && i < r ? t.indexOf(")", r + 1) : r)
		}(t).split(",").map(ha)) : zt._CE && Et.test(t) ? zt._CE("", t) : r
	}

	function Hb(t, e) {
		for (var r, i = t._first; i;) i instanceof Nt ? Hb(i, e) : !i.vars.yoyoEase || i._yoyo && i._repeat || i._yoyo === e || (i.timeline ? Hb(i.timeline, e) : (r = i._ease, i._ease = i._yEase, i._yEase = r, i._yoyo = e)), i = i._next
	}

	function Jb(t, e, r, i) {
		void 0 === r && (r = function easeOut(t) {
			return 1 - e(1 - t)
		}), void 0 === i && (i = function easeInOut(t) {
			return t < .5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2
		});
		var n, a = {easeIn: e, easeOut: r, easeInOut: i};
		return ba(t, function (t) {
			for (var e in zt[t] = ot[t] = a, zt[n = t.toLowerCase()] = r, a) zt[n + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = zt[t + "." + e] = a[e]
		}), a
	}

	function Kb(e) {
		return function (t) {
			return t < .5 ? (1 - e(1 - 2 * t)) / 2 : .5 + e(2 * (t - .5)) / 2
		}
	}

	function Lb(r, t, e) {
		function Ql(t) {
			return 1 === t ? 1 : i * Math.pow(2, -10 * t) * H((t - a) * n) + 1
		}

		var i = 1 <= t ? t : 1, n = (e || (r ? .3 : .45)) / (t < 1 ? t : 1), a = n / U * (Math.asin(1 / i) || 0),
			s = "out" === r ? Ql : "in" === r ? function (t) {
				return 1 - Ql(1 - t)
			} : Kb(Ql);
		return n = U / n, s.config = function (t, e) {
			return Lb(r, t, e)
		}, s
	}

	function Mb(e, r) {
		function Yl(t) {
			return t ? --t * t * ((r + 1) * t + r) + 1 : 0
		}

		void 0 === r && (r = 1.70158);
		var t = "out" === e ? Yl : "in" === e ? function (t) {
			return 1 - Yl(1 - t)
		} : Kb(Yl);
		return t.config = function (t) {
			return Mb(e, t)
		}, t
	}

	var B, I, i, n, a, h, l, f, d, c, m, g, y, b, T, w, x, k, A, C, S, D, z, E, F, R,
		Y = {autoSleep: 120, force3D: "auto", nullTargetWarn: 1, units: {lineHeight: ""}},
		L = {duration: .5, overwrite: !1, delay: 0}, j = 1e8, X = 1 / j, U = 2 * Math.PI, J = U / 4, V = 0,
		W = Math.sqrt, G = Math.cos, H = Math.sin,
		K = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function () {
		}, Z = Array.isArray, tt = /(?:-?\.?\d|\.)+/gi, et = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
		rt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, it = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, nt = /[+-]=-?[.\d]+/,
		at = /[^,'"\[\]\s]+/gi, st = /[\d.+\-=]+(?:e[-+]\d*)*/i, ot = {}, ut = {}, ht = [], lt = {}, ft = {}, dt = {},
		pt = 30, ct = [], _t = "", mt = function _merge(t, e) {
			for (var r in e) t[r] = e[r];
			return t
		}, gt = function _animationCycle(t, e) {
			var r = Math.floor(t /= e);
			return t && r === t ? r - 1 : r
		}, vt = function _isFromOrFromStart(t) {
			var e = t.data;
			return "isFromStart" === e || "isStart" === e
		}, yt = {_start: 0, endTime: Q, totalDuration: Q}, bt = function _parsePosition(t, e, r) {
			var i, n, a, s = t.labels, u = t._recent || yt, h = t.duration() >= j ? u.endTime(!1) : t._dur;
			return o(e) && (isNaN(e) || e in s) ? (n = e.charAt(0), a = "%" === e.substr(-1), i = e.indexOf("="), "<" === n || ">" === n ? (0 <= i && (e = e.replace(/=/, "")), ("<" === n ? u._start : u.endTime(0 <= u._repeat)) + (parseFloat(e.substr(1)) || 0) * (a ? (i < 0 ? u : r).totalDuration() / 100 : 1)) : i < 0 ? (e in s || (s[e] = h), s[e]) : (n = parseFloat(e.charAt(i - 1) + e.substr(i + 1)), a && r && (n = n / 100 * (Z(r) ? r[0] : r).totalDuration()), 1 < i ? _parsePosition(t, e.substr(0, i - 1), r) + n : h + n)) : null == e ? h : +e
		}, Tt = function _clamp(t, e, r) {
			return r < t ? t : e < r ? e : r
		}, wt = [].slice, xt = function toArray(t, e, r) {
			return !o(t) || r || !n && Dt() ? Z(t) ? function _flatten(t, e, r) {
				return void 0 === r && (r = []), t.forEach(function (t) {
					return o(t) && !e || Ta(t, 1) ? r.push.apply(r, xt(t)) : r.push(t)
				}) || r
			}(t, r) : Ta(t) ? wt.call(t, 0) : t ? [t] : [] : wt.call((e || a).querySelectorAll(t), 0)
		}, Ot = function mapRange(e, t, r, i, n) {
			var a = t - e, s = i - r;
			return Oa(n, function (t) {
				return r + ((t - e) / a * s || 0)
			})
		}, Mt = function _callback(t, e, r) {
			var i, n, a = t.vars, s = a[e];
			if (s) return i = a[e + "Params"], n = a.callbackScope || t, r && ht.length && fa(), i ? s.apply(n, i) : s.call(n)
		}, kt = 255, At = {
			aqua: [0, kt, kt],
			lime: [0, kt, 0],
			silver: [192, 192, 192],
			black: [0, 0, 0],
			maroon: [128, 0, 0],
			teal: [0, 128, 128],
			blue: [0, 0, kt],
			navy: [0, 0, 128],
			white: [kt, kt, kt],
			olive: [128, 128, 0],
			yellow: [kt, kt, 0],
			orange: [kt, 165, 0],
			gray: [128, 128, 128],
			purple: [128, 0, 128],
			green: [0, 128, 0],
			red: [kt, 0, 0],
			pink: [kt, 192, 203],
			cyan: [0, kt, kt],
			transparent: [kt, kt, kt, 0]
		}, Pt = function () {
			var t, e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
			for (t in At) e += "|" + t + "\\b";
			return new RegExp(e + ")", "gi")
		}(), Ct = /hsl[a]?\(/, St = (x = Date.now, k = 500, A = 33, C = x(), S = C, z = D = 1e3 / 240, b = {
			time: 0,
			frame: 0,
			tick: function tick() {
				Mk(!0)
			},
			deltaRatio: function deltaRatio(t) {
				return T / (1e3 / (t || 60))
			},
			wake: function wake() {
				l && (!n && u() && (i = n = window, a = i.document || {}, ot.gsap = oe, (i.gsapVersions || (i.gsapVersions = [])).push(oe.version), M(h || i.GreenSockGlobals || !i.gsap && i || {}), y = i.requestAnimationFrame), m && b.sleep(), g = y || function (t) {
					return setTimeout(t, z - 1e3 * b.time + 1 | 0)
				}, c = 1, Mk(2))
			},
			sleep: function sleep() {
				(y ? i.cancelAnimationFrame : clearTimeout)(m), c = 0, g = Q
			},
			lagSmoothing: function lagSmoothing(t, e) {
				k = t || 1e8, A = Math.min(e, k, 0)
			},
			fps: function fps(t) {
				D = 1e3 / (t || 240), z = 1e3 * b.time + D
			},
			add: function add(t) {
				E.indexOf(t) < 0 && E.push(t), Dt()
			},
			remove: function remove(t) {
				var e;
				~(e = E.indexOf(t)) && E.splice(e, 1) && e <= w && w--
			},
			_listeners: E = []
		}), Dt = function _wake() {
			return !c && St.wake()
		}, zt = {}, Et = /^[\d.\-M][\d.\-,\s]/, Ft = /["']/g, Rt = function _invertEase(e) {
			return function (t) {
				return 1 - e(1 - t)
			}
		}, Bt = function _parseEase(t, e) {
			return t && (p(t) ? t : zt[t] || Fb(t)) || e
		};

	function Mk(t) {
		var e, r, i, n, a = x() - S, s = !0 === t;
		if (k < a && (C += a - A), (0 < (e = (i = (S += a) - C) - z) || s) && (n = ++b.frame, T = i - 1e3 * b.time, b.time = i /= 1e3, z += e + (D <= e ? 4 : D - e), r = 1), s || (m = g(Mk)), r) for (w = 0; w < E.length; w++) E[w](i, T, n, t)
	}

	function nm(t) {
		return t < R ? F * t * t : t < .7272727272727273 ? F * Math.pow(t - 1.5 / 2.75, 2) + .75 : t < .9090909090909092 ? F * (t -= 2.25 / 2.75) * t + .9375 : F * Math.pow(t - 2.625 / 2.75, 2) + .984375
	}

	ba("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
		var r = e < 5 ? e + 1 : e;
		Jb(t + ",Power" + (r - 1), e ? function (t) {
			return Math.pow(t, r)
		} : function (t) {
			return t
		}, function (t) {
			return 1 - Math.pow(1 - t, r)
		}, function (t) {
			return t < .5 ? Math.pow(2 * t, r) / 2 : 1 - Math.pow(2 * (1 - t), r) / 2
		})
	}), zt.Linear.easeNone = zt.none = zt.Linear.easeIn, Jb("Elastic", Lb("in"), Lb("out"), Lb()), F = 7.5625, R = 1 / 2.75, Jb("Bounce", function (t) {
		return 1 - nm(1 - t)
	}, nm), Jb("Expo", function (t) {
		return t ? Math.pow(2, 10 * (t - 1)) : 0
	}), Jb("Circ", function (t) {
		return -(W(1 - t * t) - 1)
	}), Jb("Sine", function (t) {
		return 1 === t ? 1 : 1 - G(t * J)
	}), Jb("Back", Mb("in"), Mb("out"), Mb()), zt.SteppedEase = zt.steps = ot.SteppedEase = {
		config: function config(t, e) {
			void 0 === t && (t = 1);
			var r = 1 / t, i = t + (e ? 0 : 1), n = e ? 1 : 0;
			return function (t) {
				return ((i * Tt(0, .99999999, t) | 0) + n) * r
			}
		}
	}, L.ease = zt["quad.out"], ba("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (t) {
		return _t += t + "," + t + "Params,"
	});
	var It, Lt = function GSCache(t, e) {
		this.id = V++, (t._gsap = this).target = t, this.harness = e, this.get = e ? e.get : aa, this.set = e ? e.getSetter : Kt
	}, qt = ((It = Animation.prototype).delay = function delay(t) {
		return t || 0 === t ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + t - this._delay), this._delay = t, this) : this._delay
	}, It.duration = function duration(t) {
		return arguments.length ? this.totalDuration(0 < this._repeat ? t + (t + this._rDelay) * this._repeat : t) : this.totalDuration() && this._dur
	}, It.totalDuration = function totalDuration(t) {
		return arguments.length ? (this._dirty = 0, Ja(this, this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
	}, It.totalTime = function totalTime(t, e) {
		if (Dt(), !arguments.length) return this._tTime;
		var r = this._dp;
		if (r && r.smoothChildTiming && this._ts) {
			for (Aa(this, t), !r._dp || r.parent || Ba(r, this); r && r.parent;) r.parent._time !== r._start + (0 <= r._ts ? r._tTime / r._ts : (r.totalDuration() - r._tTime) / -r._ts) && r.totalTime(r._tTime, !0), r = r.parent;
			!this.parent && this._dp.autoRemoveChildren && (0 < this._ts && t < this._tDur || this._ts < 0 && 0 < t || !this._tDur && !t) && Ca(this._dp, this, this._start - this._delay)
		}
		return (this._tTime !== t || !this._dur && !e || this._initted && Math.abs(this._zTime) === X || !t && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = t), ga(this, t, e)), this
	}, It.time = function time(t, e) {
		return arguments.length ? this.totalTime(Math.min(this.totalDuration(), t + wa(this)) % (this._dur + this._rDelay) || (t ? this._dur : 0), e) : this._time
	}, It.totalProgress = function totalProgress(t, e) {
		return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio
	}, It.progress = function progress(t, e) {
		return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? t : 1 - t) + wa(this), e) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio
	}, It.iteration = function iteration(t, e) {
		var r = this.duration() + this._rDelay;
		return arguments.length ? this.totalTime(this._time + (t - 1) * r, e) : this._repeat ? gt(this._tTime, r) + 1 : 1
	}, It.timeScale = function timeScale(t) {
		if (!arguments.length) return this._rts === -X ? 0 : this._rts;
		if (this._rts === t) return this;
		var e = this.parent && this._ts ? ya(this.parent._time, this) : this._tTime;
		return this._rts = +t || 0, this._ts = this._ps || t === -X ? 0 : this._rts, function _recacheAncestors(t) {
			for (var e = t.parent; e && e.parent;) e._dirty = 1, e.totalDuration(), e = e.parent
		}(this.totalTime(Tt(-this._delay, this._tDur, e), !0)), za(this), this
	}, It.paused = function paused(t) {
		return arguments.length ? (this._ps !== t && ((this._ps = t) ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Dt(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && Math.abs(this._zTime) !== X && (this._tTime -= X)))), this) : this._ps
	}, It.startTime = function startTime(t) {
		if (arguments.length) {
			this._start = t;
			var e = this.parent || this._dp;
			return !e || !e._sort && this.parent || Ca(e, this, t - this._delay), this
		}
		return this._start
	}, It.endTime = function endTime(e) {
		return this._start + (t(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
	}, It.rawTime = function rawTime(t) {
		var e = this.parent || this._dp;
		return e ? t && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? ya(e.rawTime(t), this) : this._tTime : this._tTime
	}, It.globalTime = function globalTime(t) {
		for (var e = this, r = arguments.length ? t : e.rawTime(); e;) r = e._start + r / (e._ts || 1), e = e._dp;
		return r
	}, It.repeat = function repeat(t) {
		return arguments.length ? (this._repeat = t === 1 / 0 ? -2 : t, Ka(this)) : -2 === this._repeat ? 1 / 0 : this._repeat
	}, It.repeatDelay = function repeatDelay(t) {
		if (arguments.length) {
			var e = this._time;
			return this._rDelay = t, Ka(this), e ? this.time(e) : this
		}
		return this._rDelay
	}, It.yoyo = function yoyo(t) {
		return arguments.length ? (this._yoyo = t, this) : this._yoyo
	}, It.seek = function seek(e, r) {
		return this.totalTime(bt(this, e), t(r))
	}, It.restart = function restart(e, r) {
		return this.play().totalTime(e ? -this._delay : 0, t(r))
	}, It.play = function play(t, e) {
		return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
	}, It.reverse = function reverse(t, e) {
		return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
	}, It.pause = function pause(t, e) {
		return null != t && this.seek(t, e), this.paused(!0)
	}, It.resume = function resume() {
		return this.paused(!1)
	}, It.reversed = function reversed(t) {
		return arguments.length ? (!!t !== this.reversed() && this.timeScale(-this._rts || (t ? -X : 0)), this) : this._rts < 0
	}, It.invalidate = function invalidate() {
		return this._initted = this._act = 0, this._zTime = -X, this
	}, It.isActive = function isActive() {
		var t, e = this.parent || this._dp, r = this._start;
		return !(e && !(this._ts && this._initted && e.isActive() && (t = e.rawTime(!0)) >= r && t < this.endTime(!0) - X))
	}, It.eventCallback = function eventCallback(t, e, r) {
		var i = this.vars;
		return 1 < arguments.length ? (e ? (i[t] = e, r && (i[t + "Params"] = r), "onUpdate" === t && (this._onUpdate = e)) : delete i[t], this) : i[t]
	}, It.then = function then(t) {
		var i = this;
		return new Promise(function (e) {
			function En() {
				var t = i.then;
				i.then = null, p(r) && (r = r(i)) && (r.then || r === i) && (i.then = t), e(r), i.then = t
			}

			var r = p(t) ? t : ia;
			i._initted && 1 === i.totalProgress() && 0 <= i._ts || !i._tTime && i._ts < 0 ? En() : i._prom = En
		})
	}, It.kill = function kill() {
		lb(this)
	}, Animation);

	function Animation(t) {
		this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, Ja(this, +t.duration, 1, 1), this.data = t.data, c || St.wake()
	}

	ja(qt.prototype, {
		_time: 0,
		_start: 0,
		_end: 0,
		_tTime: 0,
		_tDur: 0,
		_dirty: 0,
		_repeat: 0,
		_yoyo: !1,
		parent: null,
		_initted: !1,
		_rDelay: 0,
		_ts: 1,
		_dp: 0,
		ratio: 0,
		_zTime: -X,
		_prom: 0,
		_ps: !1,
		_rts: 1
	});
	var Nt = function (n) {
		function Timeline(e, r) {
			var i;
			return void 0 === e && (e = {}), (i = n.call(this, e) || this).labels = {}, i.smoothChildTiming = !!e.smoothChildTiming, i.autoRemoveChildren = !!e.autoRemoveChildren, i._sort = t(e.sortChildren), I && Ca(e.parent || I, _assertThisInitialized(i), r), e.reversed && i.reverse(), e.paused && i.paused(!0), e.scrollTrigger && Da(_assertThisInitialized(i), e.scrollTrigger), i
		}

		_inheritsLoose(Timeline, n);
		var e = Timeline.prototype;
		return e.to = function to(t, e, r) {
			return Na(0, arguments, this), this
		}, e.from = function from(t, e, r) {
			return Na(1, arguments, this), this
		}, e.fromTo = function fromTo(t, e, r, i) {
			return Na(2, arguments, this), this
		}, e.set = function set(t, e, r) {
			return e.duration = 0, e.parent = this, oa(e).repeatDelay || (e.repeat = 0), e.immediateRender = !!e.immediateRender, new Vt(t, e, bt(this, r), 1), this
		}, e.call = function call(t, e, r) {
			return Ca(this, Vt.delayedCall(0, t, e), r)
		}, e.staggerTo = function staggerTo(t, e, r, i, n, a, s) {
			return r.duration = e, r.stagger = r.stagger || i, r.onComplete = a, r.onCompleteParams = s, r.parent = this, new Vt(t, r, bt(this, n)), this
		}, e.staggerFrom = function staggerFrom(e, r, i, n, a, s, o) {
			return i.runBackwards = 1, oa(i).immediateRender = t(i.immediateRender), this.staggerTo(e, r, i, n, a, s, o)
		}, e.staggerFromTo = function staggerFromTo(e, r, i, n, a, s, o, u) {
			return n.startAt = i, oa(n).immediateRender = t(n.immediateRender), this.staggerTo(e, r, n, a, s, o, u)
		}, e.render = function render(t, e, r) {
			var i, n, a, s, o, u, h, l, f, d, p, c, _ = this._time, m = this._dirty ? this.totalDuration() : this._tDur,
				g = this._dur, v = t <= 0 ? 0 : da(t), y = this._zTime < 0 != t < 0 && (this._initted || !g);
			if (this !== I && m < v && 0 <= t && (v = m), v !== this._tTime || r || y) {
				if (_ !== this._time && g && (v += this._time - _, t += this._time - _), i = v, f = this._start, u = !(l = this._ts), y && (g || (_ = this._zTime), !t && e || (this._zTime = t)), this._repeat) {
					if (p = this._yoyo, o = g + this._rDelay, this._repeat < -1 && t < 0) return this.totalTime(100 * o + t, e, r);
					if (i = da(v % o), v === m ? (s = this._repeat, i = g) : ((s = ~~(v / o)) && s === v / o && (i = g, s--), g < i && (i = g)), d = gt(this._tTime, o), !_ && this._tTime && d !== s && (d = s), p && 1 & s && (i = g - i, c = 1), s !== d && !this._lock) {
						var b = p && 1 & d, T = b === (p && 1 & s);
						if (s < d && (b = !b), _ = b ? 0 : g, this._lock = 1, this.render(_ || (c ? 0 : da(s * o)), e, !g)._lock = 0, this._tTime = v, !e && this.parent && Mt(this, "onRepeat"), this.vars.repeatRefresh && !c && (this.invalidate()._lock = 1), _ && _ !== this._time || u != !this._ts || this.vars.onRepeat && !this.parent && !this._act) return this;
						if (g = this._dur, m = this._tDur, T && (this._lock = 2, _ = b ? g : -1e-4, this.render(_, !0), this.vars.repeatRefresh && !c && this.invalidate()), this._lock = 0, !this._ts && !u) return this;
						Hb(this, c)
					}
				}
				if (this._hasPause && !this._forcing && this._lock < 2 && (h = function _findNextPauseTween(t, e, r) {
					var i;
					if (e < r) for (i = t._first; i && i._start <= r;) {
						if (!i._dur && "isPause" === i.data && i._start > e) return i;
						i = i._next
					} else for (i = t._last; i && i._start >= r;) {
						if (!i._dur && "isPause" === i.data && i._start < e) return i;
						i = i._prev
					}
				}(this, da(_), da(i))) && (v -= i - (i = h._start)), this._tTime = v, this._time = i, this._act = !l, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = t, _ = 0), !_ && i && !e && (Mt(this, "onStart"), this._tTime !== v)) return this;
				if (_ <= i && 0 <= t) for (n = this._first; n;) {
					if (a = n._next, (n._act || i >= n._start) && n._ts && h !== n) {
						if (n.parent !== this) return this.render(t, e, r);
						if (n.render(0 < n._ts ? (i - n._start) * n._ts : (n._dirty ? n.totalDuration() : n._tDur) + (i - n._start) * n._ts, e, r), i !== this._time || !this._ts && !u) {
							h = 0, a && (v += this._zTime = -X);
							break
						}
					}
					n = a
				} else {
					n = this._last;
					for (var w = t < 0 ? t : i; n;) {
						if (a = n._prev, (n._act || w <= n._end) && n._ts && h !== n) {
							if (n.parent !== this) return this.render(t, e, r);
							if (n.render(0 < n._ts ? (w - n._start) * n._ts : (n._dirty ? n.totalDuration() : n._tDur) + (w - n._start) * n._ts, e, r), i !== this._time || !this._ts && !u) {
								h = 0, a && (v += this._zTime = w ? -X : X);
								break
							}
						}
						n = a
					}
				}
				if (h && !e && (this.pause(), h.render(_ <= i ? 0 : -X)._zTime = _ <= i ? 1 : -1, this._ts)) return this._start = f, za(this), this.render(t, e, r);
				this._onUpdate && !e && Mt(this, "onUpdate", !0), (v === m && m >= this.totalDuration() || !v && _) && (f !== this._start && Math.abs(l) === Math.abs(this._ts) || this._lock || (!t && g || !(v === m && 0 < this._ts || !v && this._ts < 0) || sa(this, 1), e || t < 0 && !_ || !v && !_ && m || (Mt(this, v === m && 0 <= t ? "onComplete" : "onReverseComplete", !0), !this._prom || v < m && 0 < this.timeScale() || this._prom())))
			}
			return this
		}, e.add = function add(t, e) {
			var r = this;
			if (q(e) || (e = bt(this, e, t)), !(t instanceof qt)) {
				if (Z(t)) return t.forEach(function (t) {
					return r.add(t, e)
				}), this;
				if (o(t)) return this.addLabel(t, e);
				if (!p(t)) return this;
				t = Vt.delayedCall(0, t)
			}
			return this !== t ? Ca(this, t, e) : this
		}, e.getChildren = function getChildren(t, e, r, i) {
			void 0 === t && (t = !0), void 0 === e && (e = !0), void 0 === r && (r = !0), void 0 === i && (i = -j);
			for (var n = [], a = this._first; a;) a._start >= i && (a instanceof Vt ? e && n.push(a) : (r && n.push(a), t && n.push.apply(n, a.getChildren(!0, e, r)))), a = a._next;
			return n
		}, e.getById = function getById(t) {
			for (var e = this.getChildren(1, 1, 1), r = e.length; r--;) if (e[r].vars.id === t) return e[r]
		}, e.remove = function remove(t) {
			return o(t) ? this.removeLabel(t) : p(t) ? this.killTweensOf(t) : (ra(this, t), t === this._recent && (this._recent = this._last), ta(this))
		}, e.totalTime = function totalTime(t, e) {
			return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = da(St.time - (0 < this._ts ? t / this._ts : (this.totalDuration() - t) / -this._ts))), n.prototype.totalTime.call(this, t, e), this._forcing = 0, this) : this._tTime
		}, e.addLabel = function addLabel(t, e) {
			return this.labels[t] = bt(this, e), this
		}, e.removeLabel = function removeLabel(t) {
			return delete this.labels[t], this
		}, e.addPause = function addPause(t, e, r) {
			var i = Vt.delayedCall(0, e || Q, r);
			return i.data = "isPause", this._hasPause = 1, Ca(this, i, bt(this, t))
		}, e.removePause = function removePause(t) {
			var e = this._first;
			for (t = bt(this, t); e;) e._start === t && "isPause" === e.data && sa(e), e = e._next
		}, e.killTweensOf = function killTweensOf(t, e, r) {
			for (var i = this.getTweensOf(t, r), n = i.length; n--;) Qt !== i[n] && i[n].kill(t, e);
			return this
		}, e.getTweensOf = function getTweensOf(t, e) {
			for (var r, i = [], n = xt(t), a = this._first, s = q(e); a;) a instanceof Vt ? ea(a._targets, n) && (s ? (!Qt || a._initted && a._ts) && a.globalTime(0) <= e && a.globalTime(a.totalDuration()) > e : !e || a.isActive()) && i.push(a) : (r = a.getTweensOf(n, e)).length && i.push.apply(i, r), a = a._next;
			return i
		}, e.tweenTo = function tweenTo(t, e) {
			e = e || {};
			var r, i = this, n = bt(i, t), a = e.startAt, s = e.onStart, o = e.onStartParams, u = e.immediateRender,
				h = Vt.to(i, ja({
					ease: e.ease || "none",
					lazy: !1,
					immediateRender: !1,
					time: n,
					overwrite: "auto",
					duration: e.duration || Math.abs((n - (a && "time" in a ? a.time : i._time)) / i.timeScale()) || X,
					onStart: function onStart() {
						if (i.pause(), !r) {
							var t = e.duration || Math.abs((n - (a && "time" in a ? a.time : i._time)) / i.timeScale());
							h._dur !== t && Ja(h, t, 0, 1).render(h._time, !0, !0), r = 1
						}
						s && s.apply(h, o || [])
					}
				}, e));
			return u ? h.render(0) : h
		}, e.tweenFromTo = function tweenFromTo(t, e, r) {
			return this.tweenTo(e, ja({startAt: {time: bt(this, t)}}, r))
		}, e.recent = function recent() {
			return this._recent
		}, e.nextLabel = function nextLabel(t) {
			return void 0 === t && (t = this._time), jb(this, bt(this, t))
		}, e.previousLabel = function previousLabel(t) {
			return void 0 === t && (t = this._time), jb(this, bt(this, t), 1)
		}, e.currentLabel = function currentLabel(t) {
			return arguments.length ? this.seek(t, !0) : this.previousLabel(this._time + X)
		}, e.shiftChildren = function shiftChildren(t, e, r) {
			void 0 === r && (r = 0);
			for (var i, n = this._first, a = this.labels; n;) n._start >= r && (n._start += t, n._end += t), n = n._next;
			if (e) for (i in a) a[i] >= r && (a[i] += t);
			return ta(this)
		}, e.invalidate = function invalidate() {
			var t = this._first;
			for (this._lock = 0; t;) t.invalidate(), t = t._next;
			return n.prototype.invalidate.call(this)
		}, e.clear = function clear(t) {
			void 0 === t && (t = !0);
			for (var e, r = this._first; r;) e = r._next, this.remove(r), r = e;
			return this._dp && (this._time = this._tTime = this._pTime = 0), t && (this.labels = {}), ta(this)
		}, e.totalDuration = function totalDuration(t) {
			var e, r, i, n = 0, a = this, s = a._last, o = j;
			if (arguments.length) return a.timeScale((a._repeat < 0 ? a.duration() : a.totalDuration()) / (a.reversed() ? -t : t));
			if (a._dirty) {
				for (i = a.parent; s;) e = s._prev, s._dirty && s.totalDuration(), o < (r = s._start) && a._sort && s._ts && !a._lock ? (a._lock = 1, Ca(a, s, r - s._delay, 1)._lock = 0) : o = r, r < 0 && s._ts && (n -= r, (!i && !a._dp || i && i.smoothChildTiming) && (a._start += r / a._ts, a._time -= r, a._tTime -= r), a.shiftChildren(-r, !1, -Infinity), o = 0), s._end > n && s._ts && (n = s._end), s = e;
				Ja(a, a === I && a._time > n ? a._time : n, 1, 1), a._dirty = 0
			}
			return a._tDur
		}, Timeline.updateRoot = function updateRoot(t) {
			if (I._ts && (ga(I, ya(t, I)), f = St.frame), St.frame >= pt) {
				pt += Y.autoSleep || 120;
				var e = I._first;
				if ((!e || !e._ts) && Y.autoSleep && St._listeners.length < 2) {
					for (; e && !e._ts;) e = e._next;
					e || St.sleep()
				}
			}
		}, Timeline
	}(qt);
	ja(Nt.prototype, {_lock: 0, _hasPause: 0, _forcing: 0});

	function Tb(t, e, r, i, n, a) {
		var u, h, l, f;
		if (ft[t] && !1 !== (u = new ft[t]).init(n, u.rawVars ? e[t] : function _processVars(t, e, r, i, n) {
			if (p(t) && (t = Xt(t, n, e, r, i)), !s(t) || t.style && t.nodeType || Z(t) || K(t)) return o(t) ? Xt(t, n, e, r, i) : t;
			var a, u = {};
			for (a in t) u[a] = Xt(t[a], n, e, r, i);
			return u
		}(e[t], i, n, a, r), r, i, a) && (r._pt = h = new ae(r._pt, n, t, 0, 1, u.render, u, 0, u.priority), r !== d)) for (l = r._ptLookup[r._targets.indexOf(n)], f = u._props.length; f--;) l[u._props[f]] = h;
		return u
	}

	var Qt, Yt = function _addPropTween(t, e, r, i, n, a, s, u, h) {
			p(i) && (i = i(n || 0, t, a));
			var l, f = t[e],
				d = "get" !== r ? r : p(f) ? h ? t[e.indexOf("set") || !p(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](h) : t[e]() : f,
				c = p(f) ? h ? Ht : Gt : Wt;
			if (o(i) && (~i.indexOf("random(") && (i = gb(i)), "=" === i.charAt(1) && (!(l = parseFloat(d) + parseFloat(i.substr(2)) * ("-" === i.charAt(0) ? -1 : 1) + (Qa(d) || 0)) && 0 !== l || (i = l))), d !== i) return isNaN(d * i) || "" === i ? (f || e in t || N(e, i), function _addComplexStringPropTween(t, e, r, i, n, a, s) {
				var o, u, h, l, f, d, p, c, _ = new ae(this._pt, t, e, 0, 1, te, null, n), m = 0, g = 0;
				for (_.b = r, _.e = i, r += "", (p = ~(i += "").indexOf("random(")) && (i = gb(i)), a && (a(c = [r, i], t, e), r = c[0], i = c[1]), u = r.match(it) || []; o = it.exec(i);) l = o[0], f = i.substring(m, o.index), h ? h = (h + 1) % 5 : "rgba(" === f.substr(-5) && (h = 1), l !== u[g++] && (d = parseFloat(u[g - 1]) || 0, _._pt = {
					_next: _._pt,
					p: f || 1 === g ? f : ",",
					s: d,
					c: "=" === l.charAt(1) ? parseFloat(l.substr(2)) * ("-" === l.charAt(0) ? -1 : 1) : parseFloat(l) - d,
					m: h && h < 4 ? Math.round : 0
				}, m = it.lastIndex);
				return _.c = m < i.length ? i.substring(m, i.length) : "", _.fp = s, (nt.test(i) || p) && (_.e = 0), this._pt = _
			}.call(this, t, e, d, i, c, u || Y.stringFilter, h)) : (l = new ae(this._pt, t, e, +d || 0, i - (d || 0), "boolean" == typeof f ? $t : Zt, 0, c), h && (l.fp = h), s && l.modifier(s, this, t), this._pt = l)
		}, jt = function _initTween(e, r) {
			var i, n, a, s, o, u, h, l, f, d, p, c, m, g = e.vars, v = g.ease, y = g.startAt, b = g.immediateRender,
				T = g.lazy, w = g.onUpdate, x = g.onUpdateParams, O = g.callbackScope, M = g.runBackwards, k = g.yoyoEase,
				A = g.keyframes, P = g.autoRevert, C = e._dur, S = e._startAt, D = e._targets, z = e.parent,
				E = z && "nested" === z.data ? z.parent._targets : D, F = "auto" === e._overwrite && !B, R = e.timeline;
			if (!R || A && v || (v = "none"), e._ease = Bt(v, L.ease), e._yEase = k ? Rt(Bt(!0 === k ? v : k, L.ease)) : 0, k && e._yoyo && !e._repeat && (k = e._yEase, e._yEase = e._ease, e._ease = k), e._from = !R && !!g.runBackwards, !R) {
				if (c = (l = D[0] ? _(D[0]).harness : 0) && g[l.prop], i = na(g, ut), S && S.render(-1, !0).kill(), y) if (sa(e._startAt = Vt.set(D, ja({
					data: "isStart",
					overwrite: !1,
					parent: z,
					immediateRender: !0,
					lazy: t(T),
					startAt: null,
					delay: 0,
					onUpdate: w,
					onUpdateParams: x,
					callbackScope: O,
					stagger: 0
				}, y))), r < 0 && !b && !P && e._startAt.render(-1, !0), b) {
					if (0 < r && !P && (e._startAt = 0), C && r <= 0) return void (r && (e._zTime = r))
				} else !1 === P && (e._startAt = 0); else if (M && C) if (S) P || (e._startAt = 0); else if (r && (b = !1), a = ja({
					overwrite: !1,
					data: "isFromStart",
					lazy: b && t(T),
					immediateRender: b,
					stagger: 0,
					parent: z
				}, i), c && (a[l.prop] = c), sa(e._startAt = Vt.set(D, a)), r < 0 && e._startAt.render(-1, !0), b) {
					if (!r) return
				} else _initTween(e._startAt, X);
				for (e._pt = 0, T = C && t(T) || T && !C, n = 0; n < D.length; n++) {
					if (h = (o = D[n])._gsap || $(D)[n]._gsap, e._ptLookup[n] = d = {}, lt[h.id] && ht.length && fa(), p = E === D ? n : E.indexOf(o), l && !1 !== (f = new l).init(o, c || i, e, p, E) && (e._pt = s = new ae(e._pt, o, f.name, 0, 1, f.render, f, 0, f.priority), f._props.forEach(function (t) {
						d[t] = s
					}), f.priority && (u = 1)), !l || c) for (a in i) ft[a] && (f = Tb(a, i, e, p, o, E)) ? f.priority && (u = 1) : d[a] = s = Yt.call(e, o, a, "get", i[a], p, E, 0, g.stringFilter);
					e._op && e._op[n] && e.kill(o, e._op[n]), F && e._pt && (Qt = e, I.killTweensOf(o, d, e.globalTime(r)), m = !e.parent, Qt = 0), e._pt && T && (lt[h.id] = 1)
				}
				u && ne(e), e._onInit && e._onInit(e)
			}
			e._onUpdate = w, e._initted = (!e._op || e._pt) && !m
		}, Xt = function _parseFuncOrString(t, e, r, i, n) {
			return p(t) ? t.call(e, r, i, n) : o(t) && ~t.indexOf("random(") ? gb(t) : t
		}, Ut = _t + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
		Jt = (Ut + ",id,stagger,delay,duration,paused,scrollTrigger").split(","), Vt = function (C) {
			function Tween(e, r, i, n) {
				var a;
				"number" == typeof r && (i.duration = r, r = i, i = null);
				var o, u, h, l, f, d, p, c, _ = (a = C.call(this, n ? r : oa(r)) || this).vars, m = _.duration, g = _.delay,
					y = _.immediateRender, b = _.stagger, T = _.overwrite, w = _.keyframes, x = _.defaults,
					M = _.scrollTrigger, k = _.yoyoEase, A = r.parent || I,
					P = (Z(e) || K(e) ? q(e[0]) : "length" in r) ? [e] : xt(e);
				if (a._targets = P.length ? $(P) : O("GSAP target " + e + " not found. https://greensock.com", !Y.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = T, w || b || v(m) || v(g)) {
					if (r = a.vars, (o = a.timeline = new Nt({
						data: "nested",
						defaults: x || {}
					})).kill(), o.parent = o._dp = _assertThisInitialized(a), o._start = 0, w) oa(ja(o.vars.defaults, {ease: "none"})), b ? P.forEach(function (r, i) {
						return w.forEach(function (t, e) {
							return o.to(r, t, e ? ">" : i * b)
						})
					}) : w.forEach(function (t) {
						return o.to(P, t, ">")
					}); else {
						if (l = P.length, p = b ? Ya(b) : Q, s(b)) for (f in b) ~Ut.indexOf(f) && ((c = c || {})[f] = b[f]);
						for (u = 0; u < l; u++) {
							for (f in h = {}, r) Jt.indexOf(f) < 0 && (h[f] = r[f]);
							h.stagger = 0, k && (h.yoyoEase = k), c && mt(h, c), d = P[u], h.duration = +Xt(m, _assertThisInitialized(a), u, d, P), h.delay = (+Xt(g, _assertThisInitialized(a), u, d, P) || 0) - a._delay, !b && 1 === l && h.delay && (a._delay = g = h.delay, a._start += g, h.delay = 0), o.to(d, h, p(u, d, P))
						}
						o.duration() ? m = g = 0 : a.timeline = 0
					}
					m || a.duration(m = o.duration())
				} else a.timeline = 0;
				return !0 !== T || B || (Qt = _assertThisInitialized(a), I.killTweensOf(P), Qt = 0), Ca(A, _assertThisInitialized(a), i), r.reversed && a.reverse(), r.paused && a.paused(!0), (y || !m && !w && a._start === da(A._time) && t(y) && function _hasNoPausedAncestors(t) {
					return !t || t._ts && _hasNoPausedAncestors(t.parent)
				}(_assertThisInitialized(a)) && "nested" !== A.data) && (a._tTime = -X, a.render(Math.max(0, -g))), M && Da(_assertThisInitialized(a), M), a
			}

			_inheritsLoose(Tween, C);
			var e = Tween.prototype;
			return e.render = function render(t, e, r) {
				var i, n, a, s, o, u, h, l, f, d = this._time, p = this._tDur, c = this._dur,
					_ = p - X < t && 0 <= t ? p : t < X ? 0 : t;
				if (c) {
					if (_ !== this._tTime || !t || r || !this._initted && this._tTime || this._startAt && this._zTime < 0 != t < 0) {
						if (i = _, l = this.timeline, this._repeat) {
							if (s = c + this._rDelay, this._repeat < -1 && t < 0) return this.totalTime(100 * s + t, e, r);
							if (i = da(_ % s), _ === p ? (a = this._repeat, i = c) : ((a = ~~(_ / s)) && a === _ / s && (i = c, a--), c < i && (i = c)), (u = this._yoyo && 1 & a) && (f = this._yEase, i = c - i), o = gt(this._tTime, s), i === d && !r && this._initted) return this;
							a !== o && (l && this._yEase && Hb(l, u), !this.vars.repeatRefresh || u || this._lock || (this._lock = r = 1, this.render(da(s * a), !0).invalidate()._lock = 0))
						}
						if (!this._initted) {
							if (Ea(this, t < 0 ? t : i, r, e)) return this._tTime = 0, this;
							if (c !== this._dur) return this.render(t, e, r)
						}
						if (this._tTime = _, this._time = i, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = h = (f || this._ease)(i / c), this._from && (this.ratio = h = 1 - h), i && !d && !e && (Mt(this, "onStart"), this._tTime !== _)) return this;
						for (n = this._pt; n;) n.r(h, n.d), n = n._next;
						l && l.render(t < 0 ? t : !i && u ? -X : l._dur * h, e, r) || this._startAt && (this._zTime = t), this._onUpdate && !e && (t < 0 && this._startAt && this._startAt.render(t, !0, r), Mt(this, "onUpdate")), this._repeat && a !== o && this.vars.onRepeat && !e && this.parent && Mt(this, "onRepeat"), _ !== this._tDur && _ || this._tTime !== _ || (t < 0 && this._startAt && !this._onUpdate && this._startAt.render(t, !0, !0), !t && c || !(_ === this._tDur && 0 < this._ts || !_ && this._ts < 0) || sa(this, 1), e || t < 0 && !d || !_ && !d || (Mt(this, _ === p ? "onComplete" : "onReverseComplete", !0), !this._prom || _ < p && 0 < this.timeScale() || this._prom()))
					}
				} else !function _renderZeroDurationTween(t, e, r, i) {
					var n, a, s, o = t.ratio, u = e < 0 || !e && (!t._start && function _parentPlayheadIsBeforeStart(t) {
						var e = t.parent;
						return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || _parentPlayheadIsBeforeStart(e))
					}(t) && (t._initted || !vt(t)) || (t._ts < 0 || t._dp._ts < 0) && !vt(t)) ? 0 : 1, h = t._rDelay, l = 0;
					if (h && t._repeat && (l = Tt(0, t._tDur, e), a = gt(l, h), s = gt(t._tTime, h), t._yoyo && 1 & a && (u = 1 - u), a !== s && (o = 1 - u, t.vars.repeatRefresh && t._initted && t.invalidate())), u !== o || i || t._zTime === X || !e && t._zTime) {
						if (!t._initted && Ea(t, e, i, r)) return;
						for (s = t._zTime, t._zTime = e || (r ? X : 0), r = r || e && !s, t.ratio = u, t._from && (u = 1 - u), t._time = 0, t._tTime = l, n = t._pt; n;) n.r(u, n.d), n = n._next;
						t._startAt && e < 0 && t._startAt.render(e, !0, !0), t._onUpdate && !r && Mt(t, "onUpdate"), l && t._repeat && !r && t.parent && Mt(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === u && (u && sa(t, 1), r || (Mt(t, u ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()))
					} else t._zTime || (t._zTime = e)
				}(this, t, e, r);
				return this
			}, e.targets = function targets() {
				return this._targets
			}, e.invalidate = function invalidate() {
				return this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(), C.prototype.invalidate.call(this)
			}, e.kill = function kill(t, e) {
				if (void 0 === e && (e = "all"), !(t || e && "all" !== e)) return this._lazy = this._pt = 0, this.parent ? lb(this) : this;
				if (this.timeline) {
					var r = this.timeline.totalDuration();
					return this.timeline.killTweensOf(t, e, Qt && !0 !== Qt.vars.overwrite)._first || lb(this), this.parent && r !== this.timeline.totalDuration() && Ja(this, this._dur * this.timeline._tDur / r, 0, 1), this
				}
				var i, n, a, s, u, h, l, f = this._targets, d = t ? xt(t) : f, p = this._ptLookup, c = this._pt;
				if ((!e || "all" === e) && function _arraysMatch(t, e) {
					for (var r = t.length, i = r === e.length; i && r-- && t[r] === e[r];) ;
					return r < 0
				}(f, d)) return "all" === e && (this._pt = 0), lb(this);
				for (i = this._op = this._op || [], "all" !== e && (o(e) && (u = {}, ba(e, function (t) {
					return u[t] = 1
				}), e = u), e = function _addAliasesToVars(t, e) {
					var r, i, n, a, s = t[0] ? _(t[0]).harness : 0, o = s && s.aliases;
					if (!o) return e;
					for (i in r = mt({}, e), o) if (i in r) for (n = (a = o[i].split(",")).length; n--;) r[a[n]] = r[i];
					return r
				}(f, e)), l = f.length; l--;) if (~d.indexOf(f[l])) for (u in n = p[l], "all" === e ? (i[l] = e, s = n, a = {}) : (a = i[l] = i[l] || {}, s = e), s) (h = n && n[u]) && ("kill" in h.d && !0 !== h.d.kill(u) || ra(this, h, "_pt"), delete n[u]), "all" !== a && (a[u] = 1);
				return this._initted && !this._pt && c && lb(this), this
			}, Tween.to = function to(t, e, r) {
				return new Tween(t, e, r)
			}, Tween.from = function from(t, e) {
				return Na(1, arguments)
			}, Tween.delayedCall = function delayedCall(t, e, r, i) {
				return new Tween(e, 0, {
					immediateRender: !1,
					lazy: !1,
					overwrite: !1,
					delay: t,
					onComplete: e,
					onReverseComplete: e,
					onCompleteParams: r,
					onReverseCompleteParams: r,
					callbackScope: i
				})
			}, Tween.fromTo = function fromTo(t, e, r) {
				return Na(2, arguments)
			}, Tween.set = function set(t, e) {
				return e.duration = 0, e.repeatDelay || (e.repeat = 0), new Tween(t, e)
			}, Tween.killTweensOf = function killTweensOf(t, e, r) {
				return I.killTweensOf(t, e, r)
			}, Tween
		}(qt);
	ja(Vt.prototype, {
		_targets: [],
		_lazy: 0,
		_startAt: 0,
		_op: 0,
		_onInit: 0
	}), ba("staggerTo,staggerFrom,staggerFromTo", function (r) {
		Vt[r] = function () {
			var t = new Nt, e = wt.call(arguments, 0);
			return e.splice("staggerFromTo" === r ? 5 : 4, 0, 0), t[r].apply(t, e)
		}
	});

	function cc(t, e, r) {
		return t.setAttribute(e, r)
	}

	function kc(t, e, r, i) {
		i.mSet(t, e, i.m.call(i.tween, r, i.mt), i)
	}

	var Wt = function _setterPlain(t, e, r) {
		return t[e] = r
	}, Gt = function _setterFunc(t, e, r) {
		return t[e](r)
	}, Ht = function _setterFuncWithParam(t, e, r, i) {
		return t[e](i.fp, r)
	}, Kt = function _getSetter(t, e) {
		return p(t[e]) ? Gt : r(t[e]) && t.setAttribute ? cc : Wt
	}, Zt = function _renderPlain(t, e) {
		return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e)
	}, $t = function _renderBoolean(t, e) {
		return e.set(e.t, e.p, !!(e.s + e.c * t), e)
	}, te = function _renderComplexString(t, e) {
		var r = e._pt, i = "";
		if (!t && e.b) i = e.b; else if (1 === t && e.e) i = e.e; else {
			for (; r;) i = r.p + (r.m ? r.m(r.s + r.c * t) : Math.round(1e4 * (r.s + r.c * t)) / 1e4) + i, r = r._next;
			i += e.c
		}
		e.set(e.t, e.p, i, e)
	}, ee = function _renderPropTweens(t, e) {
		for (var r = e._pt; r;) r.r(t, r.d), r = r._next
	}, re = function _addPluginModifier(t, e, r, i) {
		for (var n, a = this._pt; a;) n = a._next, a.p === i && a.modifier(t, e, r), a = n
	}, ie = function _killPropTweensOf(t) {
		for (var e, r, i = this._pt; i;) r = i._next, i.p === t && !i.op || i.op === t ? ra(this, i, "_pt") : i.dep || (e = 1), i = r;
		return !e
	}, ne = function _sortPropTweensByPriority(t) {
		for (var e, r, i, n, a = t._pt; a;) {
			for (e = a._next, r = i; r && r.pr > a.pr;) r = r._next;
			(a._prev = r ? r._prev : n) ? a._prev._next = a : i = a, (a._next = r) ? r._prev = a : n = a, a = e
		}
		t._pt = i
	}, ae = (PropTween.prototype.modifier = function modifier(t, e, r) {
		this.mSet = this.mSet || this.set, this.set = kc, this.m = t, this.mt = r, this.tween = e
	}, PropTween);

	function PropTween(t, e, r, i, n, a, s, o, u) {
		this.t = e, this.s = i, this.c = n, this.p = r, this.r = a || Zt, this.d = s || this, this.set = o || Wt, this.pr = u || 0, (this._next = t) && (t._prev = this)
	}

	ba(_t + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (t) {
		return ut[t] = 1
	}), ot.TweenMax = ot.TweenLite = Vt, ot.TimelineLite = ot.TimelineMax = Nt, I = new Nt({
		sortChildren: !1,
		defaults: L,
		autoRemoveChildren: !0,
		id: "root",
		smoothChildTiming: !0
	}), Y.stringFilter = wb;
	var se = {
		registerPlugin: function registerPlugin() {
			for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
			e.forEach(function (t) {
				return function _createPlugin(t) {
					var e = (t = !t.name && t.default || t).name, r = p(t), i = e && !r && t.init ? function () {
							this._props = []
						} : t, n = {init: Q, render: ee, add: Yt, kill: ie, modifier: re, rawVars: 0},
						a = {targetTest: 0, get: 0, getSetter: Kt, aliases: {}, register: 0};
					if (Dt(), t !== i) {
						if (ft[e]) return;
						ja(i, ja(na(t, n), a)), mt(i.prototype, mt(n, na(t, a))), ft[i.prop = e] = i, t.targetTest && (ct.push(i), ut[e] = 1), e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin"
					}
					P(e, i), t.register && t.register(oe, i, ae)
				}(t)
			})
		},
		timeline: function timeline(t) {
			return new Nt(t)
		},
		getTweensOf: function getTweensOf(t, e) {
			return I.getTweensOf(t, e)
		},
		getProperty: function getProperty(i, t, e, r) {
			o(i) && (i = xt(i)[0]);
			var n = _(i || {}).get, a = e ? ia : ha;
			return "native" === e && (e = ""), i ? t ? a((ft[t] && ft[t].get || n)(i, t, e, r)) : function (t, e, r) {
				return a((ft[t] && ft[t].get || n)(i, t, e, r))
			} : i
		},
		quickSetter: function quickSetter(r, e, i) {
			if (1 < (r = xt(r)).length) {
				var n = r.map(function (t) {
					return oe.quickSetter(t, e, i)
				}), a = n.length;
				return function (t) {
					for (var e = a; e--;) n[e](t)
				}
			}
			r = r[0] || {};
			var s = ft[e], o = _(r), u = o.harness && (o.harness.aliases || {})[e] || e, h = s ? function (t) {
				var e = new s;
				d._pt = 0, e.init(r, i ? t + i : t, d, 0, [r]), e.render(1, e), d._pt && ee(1, d)
			} : o.set(r, u);
			return s ? h : function (t) {
				return h(r, u, i ? t + i : t, o, 1)
			}
		},
		isTweening: function isTweening(t) {
			return 0 < I.getTweensOf(t, !0).length
		},
		defaults: function defaults(t) {
			return t && t.ease && (t.ease = Bt(t.ease, L.ease)), ma(L, t || {})
		},
		config: function config(t) {
			return ma(Y, t || {})
		},
		registerEffect: function registerEffect(t) {
			var i = t.name, n = t.effect, e = t.plugins, a = t.defaults, r = t.extendTimeline;
			(e || "").split(",").forEach(function (t) {
				return t && !ft[t] && !ot[t] && O(i + " effect requires " + t + " plugin.")
			}), dt[i] = function (t, e, r) {
				return n(xt(t), ja(e || {}, a), r)
			}, r && (Nt.prototype[i] = function (t, e, r) {
				return this.add(dt[i](t, s(e) ? e : (r = e) && {}, this), r)
			})
		},
		registerEase: function registerEase(t, e) {
			zt[t] = Bt(e)
		},
		parseEase: function parseEase(t, e) {
			return arguments.length ? Bt(t, e) : zt
		},
		getById: function getById(t) {
			return I.getById(t)
		},
		exportRoot: function exportRoot(e, r) {
			void 0 === e && (e = {});
			var i, n, a = new Nt(e);
			for (a.smoothChildTiming = t(e.smoothChildTiming), I.remove(a), a._dp = 0, a._time = a._tTime = I._time, i = I._first; i;) n = i._next, !r && !i._dur && i instanceof Vt && i.vars.onComplete === i._targets[0] || Ca(a, i, i._start - i._delay), i = n;
			return Ca(I, a, 0), a
		},
		utils: {
			wrap: function wrap(e, t, r) {
				var i = t - e;
				return Z(e) ? db(e, wrap(0, e.length), t) : Oa(r, function (t) {
					return (i + (t - e) % i) % i + e
				})
			}, wrapYoyo: function wrapYoyo(e, t, r) {
				var i = t - e, n = 2 * i;
				return Z(e) ? db(e, wrapYoyo(0, e.length - 1), t) : Oa(r, function (t) {
					return e + (i < (t = (n + (t - e) % n) % n || 0) ? n - t : t)
				})
			}, distribute: Ya, random: _a, snap: $a, normalize: function normalize(t, e, r) {
				return Ot(t, e, 0, 1, r)
			}, getUnit: Qa, clamp: function clamp(e, r, t) {
				return Oa(t, function (t) {
					return Tt(e, r, t)
				})
			}, splitColor: rb, toArray: xt, selector: function selector(r) {
				return r = xt(r)[0] || O("Invalid scope") || {}, function (t) {
					var e = r.current || r.nativeElement || r;
					return xt(t, e.querySelectorAll ? e : e === r ? O("Invalid scope") || a.createElement("div") : r)
				}
			}, mapRange: Ot, pipe: function pipe() {
				for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
				return function (t) {
					return e.reduce(function (t, e) {
						return e(t)
					}, t)
				}
			}, unitize: function unitize(e, r) {
				return function (t) {
					return e(parseFloat(t)) + (r || Qa(t))
				}
			}, interpolate: function interpolate(e, r, t, i) {
				var n = isNaN(e + r) ? 0 : function (t) {
					return (1 - t) * e + t * r
				};
				if (!n) {
					var a, s, u, h, l, f = o(e), d = {};
					if (!0 === t && (i = 1) && (t = null), f) e = {p: e}, r = {p: r}; else if (Z(e) && !Z(r)) {
						for (u = [], h = e.length, l = h - 2, s = 1; s < h; s++) u.push(interpolate(e[s - 1], e[s]));
						h--, n = function func(t) {
							t *= h;
							var e = Math.min(l, ~~t);
							return u[e](t - e)
						}, t = r
					} else i || (e = mt(Z(e) ? [] : {}, e));
					if (!u) {
						for (a in r) Yt.call(d, e, a, "get", r[a]);
						n = function func(t) {
							return ee(t, d) || (f ? e.p : e)
						}
					}
				}
				return Oa(t, n)
			}, shuffle: Xa
		},
		install: M,
		effects: dt,
		ticker: St,
		updateRoot: Nt.updateRoot,
		plugins: ft,
		globalTimeline: I,
		core: {
			PropTween: ae,
			globals: P,
			Tween: Vt,
			Timeline: Nt,
			Animation: qt,
			getCache: _,
			_removeLinkedListItem: ra,
			suppressOverwrites: function suppressOverwrites(t) {
				return B = t
			}
		}
	};
	ba("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
		return se[t] = Vt[t]
	}), St.add(Nt.updateRoot), d = se.to({}, {duration: 0});

	function oc(t, e) {
		for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e;) r = r._next;
		return r
	}

	function qc(t, n) {
		return {
			name: t, rawVars: 1, init: function init(t, i, e) {
				e._onInit = function (t) {
					var e, r;
					if (o(i) && (e = {}, ba(i, function (t) {
						return e[t] = 1
					}), i = e), n) {
						for (r in e = {}, i) e[r] = n(i[r]);
						i = e
					}
					!function _addModifiers(t, e) {
						var r, i, n, a = t._targets;
						for (r in e) for (i = a.length; i--;) (n = (n = t._ptLookup[i][r]) && n.d) && (n._pt && (n = oc(n, r)), n && n.modifier && n.modifier(e[r], t, a[i], r))
					}(t, i)
				}
			}
		}
	}

	var oe = se.registerPlugin({
		name: "attr", init: function init(t, e, r, i, n) {
			var a, s;
			for (a in e) (s = this.add(t, "setAttribute", (t.getAttribute(a) || 0) + "", e[a], i, n, 0, 0, a)) && (s.op = a), this._props.push(a)
		}
	}, {
		name: "endArray", init: function init(t, e) {
			for (var r = e.length; r--;) this.add(t, r, t[r] || 0, e[r])
		}
	}, qc("roundProps", Za), qc("modifiers"), qc("snap", $a)) || se;
	Vt.version = Nt.version = oe.version = "3.8.0", l = 1, u() && Dt();

	function _c(t, e) {
		return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
	}

	function ad(t, e) {
		return e.set(e.t, e.p, 1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
	}

	function bd(t, e) {
		return e.set(e.t, e.p, t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b, e)
	}

	function cd(t, e) {
		var r = e.s + e.c * t;
		e.set(e.t, e.p, ~~(r + (r < 0 ? -.5 : .5)) + e.u, e)
	}

	function dd(t, e) {
		return e.set(e.t, e.p, t ? e.e : e.b, e)
	}

	function ed(t, e) {
		return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e)
	}

	function fd(t, e, r) {
		return t.style[e] = r
	}

	function gd(t, e, r) {
		return t.style.setProperty(e, r)
	}

	function hd(t, e, r) {
		return t._gsap[e] = r
	}

	function id(t, e, r) {
		return t._gsap.scaleX = t._gsap.scaleY = r
	}

	function jd(t, e, r, i, n) {
		var a = t._gsap;
		a.scaleX = a.scaleY = r, a.renderTransform(n, a)
	}

	function kd(t, e, r, i, n) {
		var a = t._gsap;
		a[e] = r, a.renderTransform(n, a)
	}

	function od(t, e) {
		var r = he.createElementNS ? he.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : he.createElement(t);
		return r.style ? r : he.createElement(t)
	}

	function pd(t, e, r) {
		var i = getComputedStyle(t);
		return i[e] || i.getPropertyValue(e.replace(Ie, "-$1").toLowerCase()) || i.getPropertyValue(e) || !r && pd(t, Xe(e) || e, 1) || ""
	}

	function sd() {
		(function _windowExists() {
			return "undefined" != typeof window
		})() && window.document && (ue = window, he = ue.document, le = he.documentElement, de = od("div") || {style: {}}, od("div"), Qe = Xe(Qe), Ye = Qe + "Origin", de.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", ce = !!Xe("perspective"), fe = 1)
	}

	function td(t) {
		var e,
			r = od("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
			i = this.parentNode, n = this.nextSibling, a = this.style.cssText;
		if (le.appendChild(r), r.appendChild(this), this.style.display = "block", t) try {
			e = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = td
		} catch (t) {
		} else this._gsapBBox && (e = this._gsapBBox());
		return i && (n ? i.insertBefore(this, n) : i.appendChild(this)), le.removeChild(r), this.style.cssText = a, e
	}

	function ud(t, e) {
		for (var r = e.length; r--;) if (t.hasAttribute(e[r])) return t.getAttribute(e[r])
	}

	function vd(e) {
		var r;
		try {
			r = e.getBBox()
		} catch (t) {
			r = td.call(e, !0)
		}
		return r && (r.width || r.height) || e.getBBox === td || (r = td.call(e, !0)), !r || r.width || r.x || r.y ? r : {
			x: +ud(e, ["x", "cx", "x1"]) || 0,
			y: +ud(e, ["y", "cy", "y1"]) || 0,
			width: 0,
			height: 0
		}
	}

	function wd(t) {
		return !(!t.getCTM || t.parentNode && !t.ownerSVGElement || !vd(t))
	}

	function xd(t, e) {
		if (e) {
			var r = t.style;
			e in Ee && e !== Ye && (e = Qe), r.removeProperty ? ("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6) || (e = "-" + e), r.removeProperty(e.replace(Ie, "-$1").toLowerCase())) : r.removeAttribute(e)
		}
	}

	function yd(t, e, r, i, n, a) {
		var s = new ae(t._pt, e, r, 0, 1, a ? ed : dd);
		return (t._pt = s).b = i, s.e = n, t._props.push(r), s
	}

	function Ad(t, e, r, i) {
		var n, a, s, o, u = parseFloat(r) || 0, h = (r + "").trim().substr((u + "").length) || "px", l = de.style,
			f = Le.test(e), d = "svg" === t.tagName.toLowerCase(),
			p = (d ? "client" : "offset") + (f ? "Width" : "Height"), c = "px" === i, m = "%" === i;
		return i === h || !u || Ue[i] || Ue[h] ? u : ("px" === h || c || (u = Ad(t, e, r, "px")), o = t.getCTM && wd(t), !m && "%" !== h || !Ee[e] && !~e.indexOf("adius") ? (l[f ? "width" : "height"] = 100 + (c ? h : i), a = ~e.indexOf("adius") || "em" === i && t.appendChild && !d ? t : t.parentNode, o && (a = (t.ownerSVGElement || {}).parentNode), a && a !== he && a.appendChild || (a = he.body), (s = a._gsap) && m && s.width && f && s.time === St.time ? ca(u / s.width * 100) : (!m && "%" !== h || (l.position = pd(t, "position")), a === t && (l.position = "static"), a.appendChild(de), n = de[p], a.removeChild(de), l.position = "absolute", f && m && ((s = _(a)).time = St.time, s.width = a[p]), ca(c ? n * u / 100 : n && u ? 100 / n * u : 0))) : (n = o ? t.getBBox()[f ? "width" : "height"] : t[p], ca(m ? u / n * 100 : u / 100 * n)))
	}

	function Bd(t, e, r, i) {
		var n;
		return fe || sd(), e in Ne && "transform" !== e && ~(e = Ne[e]).indexOf(",") && (e = e.split(",")[0]), Ee[e] && "transform" !== e ? (n = He(t, i), n = "transformOrigin" !== e ? n[e] : n.svg ? n.origin : Ke(pd(t, Ye)) + " " + n.zOrigin + "px") : (n = t.style[e]) && "auto" !== n && !i && !~(n + "").indexOf("calc(") || (n = Ve[e] && Ve[e](t, e, r) || pd(t, e) || aa(t, e) || ("opacity" === e ? 1 : 0)), r && !~(n + "").trim().indexOf(" ") ? Ad(t, e, n, r) + r : n
	}

	function Cd(t, e, r, i) {
		if (!r || "none" === r) {
			var n = Xe(e, t, 1), a = n && pd(t, n, 1);
			a && a !== r ? (e = n, r = a) : "borderColor" === e && (r = pd(t, "borderTopColor"))
		}
		var s, o, u, h, l, f, d, p, c, _, m, g, v = new ae(this._pt, t.style, e, 0, 1, te), y = 0, b = 0;
		if (v.b = r, v.e = i, r += "", "auto" === (i += "") && (t.style[e] = i, i = pd(t, e) || i, t.style[e] = r), wb(s = [r, i]), i = s[1], u = (r = s[0]).match(rt) || [], (i.match(rt) || []).length) {
			for (; o = rt.exec(i);) d = o[0], c = i.substring(y, o.index), l ? l = (l + 1) % 5 : "rgba(" !== c.substr(-5) && "hsla(" !== c.substr(-5) || (l = 1), d !== (f = u[b++] || "") && (h = parseFloat(f) || 0, m = f.substr((h + "").length), (g = "=" === d.charAt(1) ? +(d.charAt(0) + "1") : 0) && (d = d.substr(2)), p = parseFloat(d), _ = d.substr((p + "").length), y = rt.lastIndex - _.length, _ || (_ = _ || Y.units[e] || m, y === i.length && (i += _, v.e += _)), m !== _ && (h = Ad(t, e, f, _) || 0), v._pt = {
				_next: v._pt,
				p: c || 1 === b ? c : ",",
				s: h,
				c: g ? g * p : p - h,
				m: l && l < 4 || "zIndex" === e ? Math.round : 0
			});
			v.c = y < i.length ? i.substring(y, i.length) : ""
		} else v.r = "display" === e && "none" === i ? ed : dd;
		return nt.test(i) && (v.e = 0), this._pt = v
	}

	function Ed(t) {
		var e = t.split(" "), r = e[0], i = e[1] || "50%";
		return "top" !== r && "bottom" !== r && "left" !== i && "right" !== i || (t = r, r = i, i = t), e[0] = Je[r] || r, e[1] = Je[i] || i, e.join(" ")
	}

	function Fd(t, e) {
		if (e.tween && e.tween._time === e.tween._dur) {
			var r, i, n, a = e.t, s = a.style, o = e.u, u = a._gsap;
			if ("all" === o || !0 === o) s.cssText = "", i = 1; else for (n = (o = o.split(",")).length; -1 < --n;) r = o[n], Ee[r] && (i = 1, r = "transformOrigin" === r ? Ye : Qe), xd(a, r);
			i && (xd(a, Qe), u && (u.svg && a.removeAttribute("transform"), He(a, 1), u.uncache = 1))
		}
	}

	function Jd(t) {
		return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t
	}

	function Kd(t) {
		var e = pd(t, Qe);
		return Jd(e) ? We : e.substr(7).match(et).map(ca)
	}

	function Ld(t, e) {
		var r, i, n, a, s = t._gsap || _(t), o = t.style, u = Kd(t);
		return s.svg && t.getAttribute("transform") ? "1,0,0,1,0,0" === (u = [(n = t.transform.baseVal.consolidate().matrix).a, n.b, n.c, n.d, n.e, n.f]).join(",") ? We : u : (u !== We || t.offsetParent || t === le || s.svg || (n = o.display, o.display = "block", (r = t.parentNode) && t.offsetParent || (a = 1, i = t.nextSibling, le.appendChild(t)), u = Kd(t), n ? o.display = n : xd(t, "display"), a && (i ? r.insertBefore(t, i) : r ? r.appendChild(t) : le.removeChild(t))), e && 6 < u.length ? [u[0], u[1], u[4], u[5], u[12], u[13]] : u)
	}

	function Md(t, e, r, i, n, a) {
		var s, o, u, h = t._gsap, l = n || Ld(t, !0), f = h.xOrigin || 0, d = h.yOrigin || 0, p = h.xOffset || 0,
			c = h.yOffset || 0, _ = l[0], m = l[1], g = l[2], v = l[3], y = l[4], b = l[5], T = e.split(" "),
			w = parseFloat(T[0]) || 0, x = parseFloat(T[1]) || 0;
		r ? l !== We && (o = _ * v - m * g) && (u = w * (-m / o) + x * (_ / o) - (_ * b - m * y) / o, w = w * (v / o) + x * (-g / o) + (g * b - v * y) / o, x = u) : (w = (s = vd(t)).x + (~T[0].indexOf("%") ? w / 100 * s.width : w), x = s.y + (~(T[1] || T[0]).indexOf("%") ? x / 100 * s.height : x)), i || !1 !== i && h.smooth ? (y = w - f, b = x - d, h.xOffset = p + (y * _ + b * g) - y, h.yOffset = c + (y * m + b * v) - b) : h.xOffset = h.yOffset = 0, h.xOrigin = w, h.yOrigin = x, h.smooth = !!i, h.origin = e, h.originIsAbsolute = !!r, t.style[Ye] = "0px 0px", a && (yd(a, h, "xOrigin", f, w), yd(a, h, "yOrigin", d, x), yd(a, h, "xOffset", p, h.xOffset), yd(a, h, "yOffset", c, h.yOffset)), t.setAttribute("data-svg-origin", w + " " + x)
	}

	function Pd(t, e, r) {
		var i = Qa(e);
		return ca(parseFloat(e) + parseFloat(Ad(t, "x", r + "px", i))) + i
	}

	function Wd(t, e, r, i, n, a) {
		var s, u, h = 360, l = o(n), f = parseFloat(n) * (l && ~n.indexOf("rad") ? Fe : 1), d = a ? f * a : f - i,
			p = i + d + "deg";
		return l && ("short" === (s = n.split("_")[1]) && (d %= h) !== d % 180 && (d += d < 0 ? h : -h), "cw" === s && d < 0 ? d = (d + 36e9) % h - ~~(d / h) * h : "ccw" === s && 0 < d && (d = (d - 36e9) % h - ~~(d / h) * h)), t._pt = u = new ae(t._pt, e, r, i, d, ad), u.e = p, u.u = "deg", t._props.push(r), u
	}

	function Xd(t, e) {
		for (var r in e) t[r] = e[r];
		return t
	}

	function Yd(t, e, r) {
		var i, n, a, s, o, u, h, l = Xd({}, r._gsap), f = r.style;
		for (n in l.svg ? (a = r.getAttribute("transform"), r.setAttribute("transform", ""), f[Qe] = e, i = He(r, 1), xd(r, Qe), r.setAttribute("transform", a)) : (a = getComputedStyle(r)[Qe], f[Qe] = e, i = He(r, 1), f[Qe] = a), Ee) (a = l[n]) !== (s = i[n]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(n) < 0 && (o = Qa(a) !== (h = Qa(s)) ? Ad(r, n, a, h) : parseFloat(a), u = parseFloat(s), t._pt = new ae(t._pt, i, n, o, u - o, _c), t._pt.u = h || 0, t._props.push(n));
		Xd(i, l)
	}

	var ue, he, le, fe, de, pe, ce, _e = zt.Power0, me = zt.Power1, ge = zt.Power2, ve = zt.Power3, ye = zt.Power4,
		be = zt.Linear, Te = zt.Quad, we = zt.Cubic, xe = zt.Quart, Oe = zt.Quint, Me = zt.Strong, ke = zt.Elastic,
		Ae = zt.Back, Pe = zt.SteppedEase, Ce = zt.Bounce, Se = zt.Sine, De = zt.Expo, ze = zt.Circ, Ee = {},
		Fe = 180 / Math.PI, Re = Math.PI / 180, Be = Math.atan2, Ie = /([A-Z])/g,
		Le = /(?:left|right|width|margin|padding|x)/i, qe = /[\s,\(]\S/,
		Ne = {autoAlpha: "opacity,visibility", scale: "scaleX,scaleY", alpha: "opacity"}, Qe = "transform",
		Ye = Qe + "Origin", je = "O,Moz,ms,Ms,Webkit".split(","), Xe = function _checkPropPrefix(t, e, r) {
			var i = (e || de).style, n = 5;
			if (t in i && !r) return t;
			for (t = t.charAt(0).toUpperCase() + t.substr(1); n-- && !(je[n] + t in i);) ;
			return n < 0 ? null : (3 === n ? "ms" : 0 <= n ? je[n] : "") + t
		}, Ue = {deg: 1, rad: 1, turn: 1}, Je = {top: "0%", bottom: "100%", left: "0%", right: "100%", center: "50%"},
		Ve = {
			clearProps: function clearProps(t, e, r, i, n) {
				if ("isFromStart" !== n.data) {
					var a = t._pt = new ae(t._pt, e, r, 0, 0, Fd);
					return a.u = i, a.pr = -10, a.tween = n, t._props.push(r), 1
				}
			}
		}, We = [1, 0, 0, 1, 0, 0], Ge = {}, He = function _parseTransform(t, e) {
			var r = t._gsap || new Lt(t);
			if ("x" in r && !e && !r.uncache) return r;
			var i, n, a, s, o, u, h, l, f, d, p, c, _, m, g, v, y, b, T, w, x, O, M, k, A, P, C, S, D, z, E, F, R = t.style,
				B = r.scaleX < 0, I = "deg", L = pd(t, Ye) || "0";
			return i = n = a = u = h = l = f = d = p = 0, s = o = 1, r.svg = !(!t.getCTM || !wd(t)), m = Ld(t, r.svg), r.svg && (k = (!r.uncache || "0px 0px" === L) && !e && t.getAttribute("data-svg-origin"), Md(t, k || L, !!k || r.originIsAbsolute, !1 !== r.smooth, m)), c = r.xOrigin || 0, _ = r.yOrigin || 0, m !== We && (b = m[0], T = m[1], w = m[2], x = m[3], i = O = m[4], n = M = m[5], 6 === m.length ? (s = Math.sqrt(b * b + T * T), o = Math.sqrt(x * x + w * w), u = b || T ? Be(T, b) * Fe : 0, (f = w || x ? Be(w, x) * Fe + u : 0) && (o *= Math.abs(Math.cos(f * Re))), r.svg && (i -= c - (c * b + _ * w), n -= _ - (c * T + _ * x))) : (F = m[6], z = m[7], C = m[8], S = m[9], D = m[10], E = m[11], i = m[12], n = m[13], a = m[14], h = (g = Be(F, D)) * Fe, g && (k = O * (v = Math.cos(-g)) + C * (y = Math.sin(-g)), A = M * v + S * y, P = F * v + D * y, C = O * -y + C * v, S = M * -y + S * v, D = F * -y + D * v, E = z * -y + E * v, O = k, M = A, F = P), l = (g = Be(-w, D)) * Fe, g && (v = Math.cos(-g), E = x * (y = Math.sin(-g)) + E * v, b = k = b * v - C * y, T = A = T * v - S * y, w = P = w * v - D * y), u = (g = Be(T, b)) * Fe, g && (k = b * (v = Math.cos(g)) + T * (y = Math.sin(g)), A = O * v + M * y, T = T * v - b * y, M = M * v - O * y, b = k, O = A), h && 359.9 < Math.abs(h) + Math.abs(u) && (h = u = 0, l = 180 - l), s = ca(Math.sqrt(b * b + T * T + w * w)), o = ca(Math.sqrt(M * M + F * F)), g = Be(O, M), f = 2e-4 < Math.abs(g) ? g * Fe : 0, p = E ? 1 / (E < 0 ? -E : E) : 0), r.svg && (k = t.getAttribute("transform"), r.forceCSS = t.setAttribute("transform", "") || !Jd(pd(t, Qe)), k && t.setAttribute("transform", k))), 90 < Math.abs(f) && Math.abs(f) < 270 && (B ? (s *= -1, f += u <= 0 ? 180 : -180, u += u <= 0 ? 180 : -180) : (o *= -1, f += f <= 0 ? 180 : -180)), r.x = i - ((r.xPercent = i && (r.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-i) ? -50 : 0))) ? t.offsetWidth * r.xPercent / 100 : 0) + "px", r.y = n - ((r.yPercent = n && (r.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-n) ? -50 : 0))) ? t.offsetHeight * r.yPercent / 100 : 0) + "px", r.z = a + "px", r.scaleX = ca(s), r.scaleY = ca(o), r.rotation = ca(u) + I, r.rotationX = ca(h) + I, r.rotationY = ca(l) + I, r.skewX = f + I, r.skewY = d + I, r.transformPerspective = p + "px", (r.zOrigin = parseFloat(L.split(" ")[2]) || 0) && (R[Ye] = Ke(L)), r.xOffset = r.yOffset = 0, r.force3D = Y.force3D, r.renderTransform = r.svg ? ir : ce ? rr : Ze, r.uncache = 0, r
		}, Ke = function _firstTwoOnly(t) {
			return (t = t.split(" "))[0] + " " + t[1]
		}, Ze = function _renderNon3DTransforms(t, e) {
			e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, rr(t, e)
		}, $e = "0deg", tr = "0px", er = ") ", rr = function _renderCSSTransforms(t, e) {
			var r = e || this, i = r.xPercent, n = r.yPercent, a = r.x, s = r.y, o = r.z, u = r.rotation, h = r.rotationY,
				l = r.rotationX, f = r.skewX, d = r.skewY, p = r.scaleX, c = r.scaleY, _ = r.transformPerspective,
				m = r.force3D, g = r.target, v = r.zOrigin, y = "", b = "auto" === m && t && 1 !== t || !0 === m;
			if (v && (l !== $e || h !== $e)) {
				var T, w = parseFloat(h) * Re, x = Math.sin(w), O = Math.cos(w);
				w = parseFloat(l) * Re, T = Math.cos(w), a = Pd(g, a, x * T * -v), s = Pd(g, s, -Math.sin(w) * -v), o = Pd(g, o, O * T * -v + v)
			}
			_ !== tr && (y += "perspective(" + _ + er), (i || n) && (y += "translate(" + i + "%, " + n + "%) "), !b && a === tr && s === tr && o === tr || (y += o !== tr || b ? "translate3d(" + a + ", " + s + ", " + o + ") " : "translate(" + a + ", " + s + er), u !== $e && (y += "rotate(" + u + er), h !== $e && (y += "rotateY(" + h + er), l !== $e && (y += "rotateX(" + l + er), f === $e && d === $e || (y += "skew(" + f + ", " + d + er), 1 === p && 1 === c || (y += "scale(" + p + ", " + c + er), g.style[Qe] = y || "translate(0, 0)"
		}, ir = function _renderSVGTransforms(t, e) {
			var r, i, n, a, s, o = e || this, u = o.xPercent, h = o.yPercent, l = o.x, f = o.y, d = o.rotation, p = o.skewX,
				c = o.skewY, _ = o.scaleX, m = o.scaleY, g = o.target, v = o.xOrigin, y = o.yOrigin, b = o.xOffset,
				T = o.yOffset, w = o.forceCSS, x = parseFloat(l), O = parseFloat(f);
			d = parseFloat(d), p = parseFloat(p), (c = parseFloat(c)) && (p += c = parseFloat(c), d += c), d || p ? (d *= Re, p *= Re, r = Math.cos(d) * _, i = Math.sin(d) * _, n = Math.sin(d - p) * -m, a = Math.cos(d - p) * m, p && (c *= Re, s = Math.tan(p - c), n *= s = Math.sqrt(1 + s * s), a *= s, c && (s = Math.tan(c), r *= s = Math.sqrt(1 + s * s), i *= s)), r = ca(r), i = ca(i), n = ca(n), a = ca(a)) : (r = _, a = m, i = n = 0), (x && !~(l + "").indexOf("px") || O && !~(f + "").indexOf("px")) && (x = Ad(g, "x", l, "px"), O = Ad(g, "y", f, "px")), (v || y || b || T) && (x = ca(x + v - (v * r + y * n) + b), O = ca(O + y - (v * i + y * a) + T)), (u || h) && (s = g.getBBox(), x = ca(x + u / 100 * s.width), O = ca(O + h / 100 * s.height)), s = "matrix(" + r + "," + i + "," + n + "," + a + "," + x + "," + O + ")", g.setAttribute("transform", s), w && (g.style[Qe] = s)
		};
	ba("padding,margin,Width,Radius", function (e, r) {
		var t = "Right", i = "Bottom", n = "Left",
			o = (r < 3 ? ["Top", t, i, n] : ["Top" + n, "Top" + t, i + t, i + n]).map(function (t) {
				return r < 2 ? e + t : "border" + t + e
			});
		Ve[1 < r ? "border" + e : e] = function (e, t, r, i, n) {
			var a, s;
			if (arguments.length < 4) return a = o.map(function (t) {
				return Bd(e, t, r)
			}), 5 === (s = a.join(" ")).split(a[0]).length ? a[0] : s;
			a = (i + "").split(" "), s = {}, o.forEach(function (t, e) {
				return s[t] = a[e] = a[e] || a[(e - 1) / 2 | 0]
			}), e.init(t, s, n)
		}
	});
	var nr, ar, sr, or = {
		name: "css", register: sd, targetTest: function targetTest(t) {
			return t.style && t.nodeType
		}, init: function init(t, e, r, i, n) {
			var a, s, u, h, l, f, d, p, c, _, m, g, v, y, b, T = this._props, w = t.style, x = r.vars.startAt;
			for (d in fe || sd(), e) if ("autoRound" !== d && (s = e[d], !ft[d] || !Tb(d, e, r, i, t, n))) if (l = typeof s, f = Ve[d], "function" === l && (l = typeof (s = s.call(r, i, t, n))), "string" === l && ~s.indexOf("random(") && (s = gb(s)), f) f(this, t, d, s, r) && (b = 1); else if ("--" === d.substr(0, 2)) a = (getComputedStyle(t).getPropertyValue(d) + "").trim(), s += "", Pt.lastIndex = 0, Pt.test(a) || (p = Qa(a), c = Qa(s)), c ? p !== c && (a = Ad(t, d, a, c) + c) : p && (s += p), this.add(w, "setProperty", a, s, i, n, 0, 0, d), T.push(d); else if ("undefined" !== l) {
				if (x && d in x ? (a = "function" == typeof x[d] ? x[d].call(r, i, t, n) : x[d], d in Y.units && !Qa(a) && (a += Y.units[d]), o(a) && ~a.indexOf("random(") && (a = gb(a)), "=" === (a + "").charAt(1) && (a = Bd(t, d))) : a = Bd(t, d), h = parseFloat(a), (_ = "string" === l && "=" === s.charAt(1) ? +(s.charAt(0) + "1") : 0) && (s = s.substr(2)), u = parseFloat(s), d in Ne && ("autoAlpha" === d && (1 === h && "hidden" === Bd(t, "visibility") && u && (h = 0), yd(this, w, "visibility", h ? "inherit" : "hidden", u ? "inherit" : "hidden", !u)), "scale" !== d && "transform" !== d && ~(d = Ne[d]).indexOf(",") && (d = d.split(",")[0])), m = d in Ee) if (g || ((v = t._gsap).renderTransform && !e.parseTransform || He(t, e.parseTransform), y = !1 !== e.smoothOrigin && v.smooth, (g = this._pt = new ae(this._pt, w, Qe, 0, 1, v.renderTransform, v, 0, -1)).dep = 1), "scale" === d) this._pt = new ae(this._pt, v, "scaleY", v.scaleY, (_ ? _ * u : u - v.scaleY) || 0), T.push("scaleY", d), d += "X"; else {
					if ("transformOrigin" === d) {
						s = Ed(s), v.svg ? Md(t, s, 0, y, 0, this) : ((c = parseFloat(s.split(" ")[2]) || 0) !== v.zOrigin && yd(this, v, "zOrigin", v.zOrigin, c), yd(this, w, d, Ke(a), Ke(s)));
						continue
					}
					if ("svgOrigin" === d) {
						Md(t, s, 1, y, 0, this);
						continue
					}
					if (d in Ge) {
						Wd(this, v, d, h, s, _);
						continue
					}
					if ("smoothOrigin" === d) {
						yd(this, v, "smooth", v.smooth, s);
						continue
					}
					if ("force3D" === d) {
						v[d] = s;
						continue
					}
					if ("transform" === d) {
						Yd(this, s, t);
						continue
					}
				} else d in w || (d = Xe(d) || d);
				if (m || (u || 0 === u) && (h || 0 === h) && !qe.test(s) && d in w) u = u || 0, (p = (a + "").substr((h + "").length)) !== (c = Qa(s) || (d in Y.units ? Y.units[d] : p)) && (h = Ad(t, d, a, c)), this._pt = new ae(this._pt, m ? v : w, d, h, _ ? _ * u : u - h, m || "px" !== c && "zIndex" !== d || !1 === e.autoRound ? _c : cd), this._pt.u = c || 0, p !== c && "%" !== c && (this._pt.b = a, this._pt.r = bd); else if (d in w) Cd.call(this, t, d, a, s); else {
					if (!(d in t)) {
						N(d, s);
						continue
					}
					this.add(t, d, a || t[d], s, i, n)
				}
				T.push(d)
			}
			b && ne(this)
		}, get: Bd, aliases: Ne, getSetter: function getSetter(t, e, i) {
			var n = Ne[e];
			return n && n.indexOf(",") < 0 && (e = n), e in Ee && e !== Ye && (t._gsap.x || Bd(t, "x")) ? i && pe === i ? "scale" === e ? id : hd : (pe = i || {}) && ("scale" === e ? jd : kd) : t.style && !r(t.style[e]) ? fd : ~e.indexOf("-") ? gd : Kt(t, e)
		}, core: {_removeProperty: xd, _getMatrix: Ld}
	};
	oe.utils.checkPrefix = Xe, sr = ba((nr = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") + "," + (ar = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", function (t) {
		Ee[t] = 1
	}), ba(ar, function (t) {
		Y.units[t] = "deg", Ge[t] = 1
	}), Ne[sr[13]] = nr + "," + ar, ba("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", function (t) {
		var e = t.split(":");
		Ne[e[1]] = sr[e[0]]
	}), ba("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (t) {
		Y.units[t] = "px"
	}), oe.registerPlugin(or);
	var ur = oe.registerPlugin(or) || oe, hr = ur.core.Tween;
	e.Back = Ae, e.Bounce = Ce, e.CSSPlugin = or, e.Circ = ze, e.Cubic = we, e.Elastic = ke, e.Expo = De, e.Linear = be, e.Power0 = _e, e.Power1 = me, e.Power2 = ge, e.Power3 = ve, e.Power4 = ye, e.Quad = Te, e.Quart = xe, e.Quint = Oe, e.Sine = Se, e.SteppedEase = Pe, e.Strong = Me, e.TimelineLite = Nt, e.TimelineMax = Nt, e.TweenLite = Vt, e.TweenMax = hr, e.default = ur, e.gsap = ur;
	if (typeof (window) === "undefined" || window !== e) {
		Object.defineProperty(e, "__esModule", {value: !0})
	} else {
		delete e.default
	}
});


/*!
 * Vue.js v2.6.14
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
!function (e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Vue = t()
}(this, function () {
	"use strict";
	var e = Object.freeze({});

	function t(e) {
		return null == e
	}

	function n(e) {
		return null != e
	}

	function r(e) {
		return !0 === e
	}

	function i(e) {
		return "string" == typeof e || "number" == typeof e || "symbol" == typeof e || "boolean" == typeof e
	}

	function o(e) {
		return null !== e && "object" == typeof e
	}

	var a = Object.prototype.toString;

	function s(e) {
		return "[object Object]" === a.call(e)
	}

	function c(e) {
		var t = parseFloat(String(e));
		return t >= 0 && Math.floor(t) === t && isFinite(e)
	}

	function u(e) {
		return n(e) && "function" == typeof e.then && "function" == typeof e.catch
	}

	function l(e) {
		return null == e ? "" : Array.isArray(e) || s(e) && e.toString === a ? JSON.stringify(e, null, 2) : String(e)
	}

	function f(e) {
		var t = parseFloat(e);
		return isNaN(t) ? e : t
	}

	function p(e, t) {
		for (var n = Object.create(null), r = e.split(","), i = 0; i < r.length; i++) n[r[i]] = !0;
		return t ? function (e) {
			return n[e.toLowerCase()]
		} : function (e) {
			return n[e]
		}
	}

	var d = p("slot,component", !0), v = p("key,ref,slot,slot-scope,is");

	function h(e, t) {
		if (e.length) {
			var n = e.indexOf(t);
			if (n > -1) return e.splice(n, 1)
		}
	}

	var m = Object.prototype.hasOwnProperty;

	function y(e, t) {
		return m.call(e, t)
	}

	function g(e) {
		var t = Object.create(null);
		return function (n) {
			return t[n] || (t[n] = e(n))
		}
	}

	var _ = /-(\w)/g, b = g(function (e) {
		return e.replace(_, function (e, t) {
			return t ? t.toUpperCase() : ""
		})
	}), $ = g(function (e) {
		return e.charAt(0).toUpperCase() + e.slice(1)
	}), w = /\B([A-Z])/g, C = g(function (e) {
		return e.replace(w, "-$1").toLowerCase()
	});
	var x = Function.prototype.bind ? function (e, t) {
		return e.bind(t)
	} : function (e, t) {
		function n(n) {
			var r = arguments.length;
			return r ? r > 1 ? e.apply(t, arguments) : e.call(t, n) : e.call(t)
		}

		return n._length = e.length, n
	};

	function k(e, t) {
		t = t || 0;
		for (var n = e.length - t, r = new Array(n); n--;) r[n] = e[n + t];
		return r
	}

	function A(e, t) {
		for (var n in t) e[n] = t[n];
		return e
	}

	function O(e) {
		for (var t = {}, n = 0; n < e.length; n++) e[n] && A(t, e[n]);
		return t
	}

	function S(e, t, n) {
	}

	var T = function (e, t, n) {
		return !1
	}, N = function (e) {
		return e
	};

	function E(e, t) {
		if (e === t) return !0;
		var n = o(e), r = o(t);
		if (!n || !r) return !n && !r && String(e) === String(t);
		try {
			var i = Array.isArray(e), a = Array.isArray(t);
			if (i && a) return e.length === t.length && e.every(function (e, n) {
				return E(e, t[n])
			});
			if (e instanceof Date && t instanceof Date) return e.getTime() === t.getTime();
			if (i || a) return !1;
			var s = Object.keys(e), c = Object.keys(t);
			return s.length === c.length && s.every(function (n) {
				return E(e[n], t[n])
			})
		} catch (e) {
			return !1
		}
	}

	function j(e, t) {
		for (var n = 0; n < e.length; n++) if (E(e[n], t)) return n;
		return -1
	}

	function D(e) {
		var t = !1;
		return function () {
			t || (t = !0, e.apply(this, arguments))
		}
	}

	var L = "data-server-rendered", I = ["component", "directive", "filter"],
		M = ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestroy", "destroyed", "activated", "deactivated", "errorCaptured", "serverPrefetch"],
		F = {
			optionMergeStrategies: Object.create(null),
			silent: !1,
			productionTip: !1,
			devtools: !1,
			performance: !1,
			errorHandler: null,
			warnHandler: null,
			ignoredElements: [],
			keyCodes: Object.create(null),
			isReservedTag: T,
			isReservedAttr: T,
			isUnknownElement: T,
			getTagNamespace: S,
			parsePlatformTagName: N,
			mustUseProp: T,
			async: !0,
			_lifecycleHooks: M
		},
		P = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

	function R(e, t, n, r) {
		Object.defineProperty(e, t, {value: n, enumerable: !!r, writable: !0, configurable: !0})
	}

	var H = new RegExp("[^" + P.source + ".$_\\d]");
	var B, U = "__proto__" in {}, V = "undefined" != typeof window,
		z = "undefined" != typeof WXEnvironment && !!WXEnvironment.platform,
		K = z && WXEnvironment.platform.toLowerCase(), J = V && window.navigator.userAgent.toLowerCase(),
		q = J && /msie|trident/.test(J), W = J && J.indexOf("msie 9.0") > 0,
		Z = J && J.indexOf("edge/index-2.html") > 0,
		G = (J && J.indexOf("android"), J && /iphone|ipad|ipod|ios/.test(J) || "ios" === K),
		X = (J && /chrome\/\d+/.test(J), J && /phantomjs/.test(J), J && J.match(/firefox\/(\d+)/)), Y = {}.watch,
		Q = !1;
	if (V) try {
		var ee = {};
		Object.defineProperty(ee, "passive", {
			get: function () {
				Q = !0
			}
		}), window.addEventListener("test-passive", null, ee)
	} catch (e) {
	}
	var te = function () {
		return void 0 === B && (B = !V && !z && "undefined" != typeof global && (global.process && "server" === global.process.env.VUE_ENV)), B
	}, ne = V && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	function re(e) {
		return "function" == typeof e && /native code/.test(e.toString())
	}

	var ie, oe = "undefined" != typeof Symbol && re(Symbol) && "undefined" != typeof Reflect && re(Reflect.ownKeys);
	ie = "undefined" != typeof Set && re(Set) ? Set : function () {
		function e() {
			this.set = Object.create(null)
		}

		return e.prototype.has = function (e) {
			return !0 === this.set[e]
		}, e.prototype.add = function (e) {
			this.set[e] = !0
		}, e.prototype.clear = function () {
			this.set = Object.create(null)
		}, e
	}();
	var ae = S, se = 0, ce = function () {
		this.id = se++, this.subs = []
	};
	ce.prototype.addSub = function (e) {
		this.subs.push(e)
	}, ce.prototype.removeSub = function (e) {
		h(this.subs, e)
	}, ce.prototype.depend = function () {
		ce.target && ce.target.addDep(this)
	}, ce.prototype.notify = function () {
		for (var e = this.subs.slice(), t = 0, n = e.length; t < n; t++) e[t].update()
	}, ce.target = null;
	var ue = [];

	function le(e) {
		ue.push(e), ce.target = e
	}

	function fe() {
		ue.pop(), ce.target = ue[ue.length - 1]
	}

	var pe = function (e, t, n, r, i, o, a, s) {
		this.tag = e, this.data = t, this.children = n, this.text = r, this.elm = i, this.ns = void 0, this.context = o, this.fnContext = void 0, this.fnOptions = void 0, this.fnScopeId = void 0, this.key = t && t.key, this.componentOptions = a, this.componentInstance = void 0, this.parent = void 0, this.raw = !1, this.isStatic = !1, this.isRootInsert = !0, this.isComment = !1, this.isCloned = !1, this.isOnce = !1, this.asyncFactory = s, this.asyncMeta = void 0, this.isAsyncPlaceholder = !1
	}, de = {child: {configurable: !0}};
	de.child.get = function () {
		return this.componentInstance
	}, Object.defineProperties(pe.prototype, de);
	var ve = function (e) {
		void 0 === e && (e = "");
		var t = new pe;
		return t.text = e, t.isComment = !0, t
	};

	function he(e) {
		return new pe(void 0, void 0, void 0, String(e))
	}

	function me(e) {
		var t = new pe(e.tag, e.data, e.children && e.children.slice(), e.text, e.elm, e.context, e.componentOptions, e.asyncFactory);
		return t.ns = e.ns, t.isStatic = e.isStatic, t.key = e.key, t.isComment = e.isComment, t.fnContext = e.fnContext, t.fnOptions = e.fnOptions, t.fnScopeId = e.fnScopeId, t.asyncMeta = e.asyncMeta, t.isCloned = !0, t
	}

	var ye = Array.prototype, ge = Object.create(ye);
	["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(function (e) {
		var t = ye[e];
		R(ge, e, function () {
			for (var n = [], r = arguments.length; r--;) n[r] = arguments[r];
			var i, o = t.apply(this, n), a = this.__ob__;
			switch (e) {
				case"push":
				case"unshift":
					i = n;
					break;
				case"splice":
					i = n.slice(2)
			}
			return i && a.observeArray(i), a.dep.notify(), o
		})
	});
	var _e = Object.getOwnPropertyNames(ge), be = !0;

	function $e(e) {
		be = e
	}

	var we = function (e) {
		var t;
		this.value = e, this.dep = new ce, this.vmCount = 0, R(e, "__ob__", this), Array.isArray(e) ? (U ? (t = ge, e.__proto__ = t) : function (e, t, n) {
			for (var r = 0, i = n.length; r < i; r++) {
				var o = n[r];
				R(e, o, t[o])
			}
		}(e, ge, _e), this.observeArray(e)) : this.walk(e)
	};

	function Ce(e, t) {
		var n;
		if (o(e) && !(e instanceof pe)) return y(e, "__ob__") && e.__ob__ instanceof we ? n = e.__ob__ : be && !te() && (Array.isArray(e) || s(e)) && Object.isExtensible(e) && !e._isVue && (n = new we(e)), t && n && n.vmCount++, n
	}

	function xe(e, t, n, r, i) {
		var o = new ce, a = Object.getOwnPropertyDescriptor(e, t);
		if (!a || !1 !== a.configurable) {
			var s = a && a.get, c = a && a.set;
			s && !c || 2 !== arguments.length || (n = e[t]);
			var u = !i && Ce(n);
			Object.defineProperty(e, t, {
				enumerable: !0, configurable: !0, get: function () {
					var t = s ? s.call(e) : n;
					return ce.target && (o.depend(), u && (u.dep.depend(), Array.isArray(t) && function e(t) {
						for (var n = void 0, r = 0, i = t.length; r < i; r++) (n = t[r]) && n.__ob__ && n.__ob__.dep.depend(), Array.isArray(n) && e(n)
					}(t))), t
				}, set: function (t) {
					var r = s ? s.call(e) : n;
					t === r || t != t && r != r || s && !c || (c ? c.call(e, t) : n = t, u = !i && Ce(t), o.notify())
				}
			})
		}
	}

	function ke(e, t, n) {
		if (Array.isArray(e) && c(t)) return e.length = Math.max(e.length, t), e.splice(t, 1, n), n;
		if (t in e && !(t in Object.prototype)) return e[t] = n, n;
		var r = e.__ob__;
		return e._isVue || r && r.vmCount ? n : r ? (xe(r.value, t, n), r.dep.notify(), n) : (e[t] = n, n)
	}

	function Ae(e, t) {
		if (Array.isArray(e) && c(t)) e.splice(t, 1); else {
			var n = e.__ob__;
			e._isVue || n && n.vmCount || y(e, t) && (delete e[t], n && n.dep.notify())
		}
	}

	we.prototype.walk = function (e) {
		for (var t = Object.keys(e), n = 0; n < t.length; n++) xe(e, t[n])
	}, we.prototype.observeArray = function (e) {
		for (var t = 0, n = e.length; t < n; t++) Ce(e[t])
	};
	var Oe = F.optionMergeStrategies;

	function Se(e, t) {
		if (!t) return e;
		for (var n, r, i, o = oe ? Reflect.ownKeys(t) : Object.keys(t), a = 0; a < o.length; a++) "__ob__" !== (n = o[a]) && (r = e[n], i = t[n], y(e, n) ? r !== i && s(r) && s(i) && Se(r, i) : ke(e, n, i));
		return e
	}

	function Te(e, t, n) {
		return n ? function () {
			var r = "function" == typeof t ? t.call(n, n) : t, i = "function" == typeof e ? e.call(n, n) : e;
			return r ? Se(r, i) : i
		} : t ? e ? function () {
			return Se("function" == typeof t ? t.call(this, this) : t, "function" == typeof e ? e.call(this, this) : e)
		} : t : e
	}

	function Ne(e, t) {
		var n = t ? e ? e.concat(t) : Array.isArray(t) ? t : [t] : e;
		return n ? function (e) {
			for (var t = [], n = 0; n < e.length; n++) -1 === t.indexOf(e[n]) && t.push(e[n]);
			return t
		}(n) : n
	}

	function Ee(e, t, n, r) {
		var i = Object.create(e || null);
		return t ? A(i, t) : i
	}

	Oe.data = function (e, t, n) {
		return n ? Te(e, t, n) : t && "function" != typeof t ? e : Te(e, t)
	}, M.forEach(function (e) {
		Oe[e] = Ne
	}), I.forEach(function (e) {
		Oe[e + "s"] = Ee
	}), Oe.watch = function (e, t, n, r) {
		if (e === Y && (e = void 0), t === Y && (t = void 0), !t) return Object.create(e || null);
		if (!e) return t;
		var i = {};
		for (var o in A(i, e), t) {
			var a = i[o], s = t[o];
			a && !Array.isArray(a) && (a = [a]), i[o] = a ? a.concat(s) : Array.isArray(s) ? s : [s]
		}
		return i
	}, Oe.props = Oe.methods = Oe.inject = Oe.computed = function (e, t, n, r) {
		if (!e) return t;
		var i = Object.create(null);
		return A(i, e), t && A(i, t), i
	}, Oe.provide = Te;
	var je = function (e, t) {
		return void 0 === t ? e : t
	};

	function De(e, t, n) {
		if ("function" == typeof t && (t = t.options), function (e, t) {
			var n = e.props;
			if (n) {
				var r, i, o = {};
				if (Array.isArray(n)) for (r = n.length; r--;) "string" == typeof (i = n[r]) && (o[b(i)] = {type: null}); else if (s(n)) for (var a in n) i = n[a], o[b(a)] = s(i) ? i : {type: i};
				e.props = o
			}
		}(t), function (e, t) {
			var n = e.inject;
			if (n) {
				var r = e.inject = {};
				if (Array.isArray(n)) for (var i = 0; i < n.length; i++) r[n[i]] = {from: n[i]}; else if (s(n)) for (var o in n) {
					var a = n[o];
					r[o] = s(a) ? A({from: o}, a) : {from: a}
				}
			}
		}(t), function (e) {
			var t = e.directives;
			if (t) for (var n in t) {
				var r = t[n];
				"function" == typeof r && (t[n] = {bind: r, update: r})
			}
		}(t), !t._base && (t.extends && (e = De(e, t.extends, n)), t.mixins)) for (var r = 0, i = t.mixins.length; r < i; r++) e = De(e, t.mixins[r], n);
		var o, a = {};
		for (o in e) c(o);
		for (o in t) y(e, o) || c(o);

		function c(r) {
			var i = Oe[r] || je;
			a[r] = i(e[r], t[r], n, r)
		}

		return a
	}

	function Le(e, t, n, r) {
		if ("string" == typeof n) {
			var i = e[t];
			if (y(i, n)) return i[n];
			var o = b(n);
			if (y(i, o)) return i[o];
			var a = $(o);
			return y(i, a) ? i[a] : i[n] || i[o] || i[a]
		}
	}

	function Ie(e, t, n, r) {
		var i = t[e], o = !y(n, e), a = n[e], s = Re(Boolean, i.type);
		if (s > -1) if (o && !y(i, "default")) a = !1; else if ("" === a || a === C(e)) {
			var c = Re(String, i.type);
			(c < 0 || s < c) && (a = !0)
		}
		if (void 0 === a) {
			a = function (e, t, n) {
				if (!y(t, "default")) return;
				var r = t.default;
				if (e && e.$options.propsData && void 0 === e.$options.propsData[n] && void 0 !== e._props[n]) return e._props[n];
				return "function" == typeof r && "Function" !== Fe(t.type) ? r.call(e) : r
			}(r, i, e);
			var u = be;
			$e(!0), Ce(a), $e(u)
		}
		return a
	}

	var Me = /^\s*function (\w+)/;

	function Fe(e) {
		var t = e && e.toString().match(Me);
		return t ? t[1] : ""
	}

	function Pe(e, t) {
		return Fe(e) === Fe(t)
	}

	function Re(e, t) {
		if (!Array.isArray(t)) return Pe(t, e) ? 0 : -1;
		for (var n = 0, r = t.length; n < r; n++) if (Pe(t[n], e)) return n;
		return -1
	}

	function He(e, t, n) {
		le();
		try {
			if (t) for (var r = t; r = r.$parent;) {
				var i = r.$options.errorCaptured;
				if (i) for (var o = 0; o < i.length; o++) try {
					if (!1 === i[o].call(r, e, t, n)) return
				} catch (e) {
					Ue(e, r, "errorCaptured hook")
				}
			}
			Ue(e, t, n)
		} finally {
			fe()
		}
	}

	function Be(e, t, n, r, i) {
		var o;
		try {
			(o = n ? e.apply(t, n) : e.call(t)) && !o._isVue && u(o) && !o._handled && (o.catch(function (e) {
				return He(e, r, i + " (Promise/async)")
			}), o._handled = !0)
		} catch (e) {
			He(e, r, i)
		}
		return o
	}

	function Ue(e, t, n) {
		if (F.errorHandler) try {
			return F.errorHandler.call(null, e, t, n)
		} catch (t) {
			t !== e && Ve(t, null, "config.errorHandler")
		}
		Ve(e, t, n)
	}

	function Ve(e, t, n) {
		if (!V && !z || "undefined" == typeof console) throw e;
		console.error(e)
	}

	var ze, Ke = !1, Je = [], qe = !1;

	function We() {
		qe = !1;
		var e = Je.slice(0);
		Je.length = 0;
		for (var t = 0; t < e.length; t++) e[t]()
	}

	if ("undefined" != typeof Promise && re(Promise)) {
		var Ze = Promise.resolve();
		ze = function () {
			Ze.then(We), G && setTimeout(S)
		}, Ke = !0
	} else if (q || "undefined" == typeof MutationObserver || !re(MutationObserver) && "[object MutationObserverConstructor]" !== MutationObserver.toString()) ze = "undefined" != typeof setImmediate && re(setImmediate) ? function () {
		setImmediate(We)
	} : function () {
		setTimeout(We, 0)
	}; else {
		var Ge = 1, Xe = new MutationObserver(We), Ye = document.createTextNode(String(Ge));
		Xe.observe(Ye, {characterData: !0}), ze = function () {
			Ge = (Ge + 1) % 2, Ye.data = String(Ge)
		}, Ke = !0
	}

	function Qe(e, t) {
		var n;
		if (Je.push(function () {
			if (e) try {
				e.call(t)
			} catch (e) {
				He(e, t, "nextTick")
			} else n && n(t)
		}), qe || (qe = !0, ze()), !e && "undefined" != typeof Promise) return new Promise(function (e) {
			n = e
		})
	}

	var et = new ie;

	function tt(e) {
		!function e(t, n) {
			var r, i;
			var a = Array.isArray(t);
			if (!a && !o(t) || Object.isFrozen(t) || t instanceof pe) return;
			if (t.__ob__) {
				var s = t.__ob__.dep.id;
				if (n.has(s)) return;
				n.add(s)
			}
			if (a) for (r = t.length; r--;) e(t[r], n); else for (i = Object.keys(t), r = i.length; r--;) e(t[i[r]], n)
		}(e, et), et.clear()
	}

	var nt = g(function (e) {
		var t = "&" === e.charAt(0), n = "~" === (e = t ? e.slice(1) : e).charAt(0),
			r = "!" === (e = n ? e.slice(1) : e).charAt(0);
		return {name: e = r ? e.slice(1) : e, once: n, capture: r, passive: t}
	});

	function rt(e, t) {
		function n() {
			var e = arguments, r = n.fns;
			if (!Array.isArray(r)) return Be(r, null, arguments, t, "v-on handler");
			for (var i = r.slice(), o = 0; o < i.length; o++) Be(i[o], null, e, t, "v-on handler")
		}

		return n.fns = e, n
	}

	function it(e, n, i, o, a, s) {
		var c, u, l, f;
		for (c in e) u = e[c], l = n[c], f = nt(c), t(u) || (t(l) ? (t(u.fns) && (u = e[c] = rt(u, s)), r(f.once) && (u = e[c] = a(f.name, u, f.capture)), i(f.name, u, f.capture, f.passive, f.params)) : u !== l && (l.fns = u, e[c] = l));
		for (c in n) t(e[c]) && o((f = nt(c)).name, n[c], f.capture)
	}

	function ot(e, i, o) {
		var a;
		e instanceof pe && (e = e.data.hook || (e.data.hook = {}));
		var s = e[i];

		function c() {
			o.apply(this, arguments), h(a.fns, c)
		}

		t(s) ? a = rt([c]) : n(s.fns) && r(s.merged) ? (a = s).fns.push(c) : a = rt([s, c]), a.merged = !0, e[i] = a
	}

	function at(e, t, r, i, o) {
		if (n(t)) {
			if (y(t, r)) return e[r] = t[r], o || delete t[r], !0;
			if (y(t, i)) return e[r] = t[i], o || delete t[i], !0
		}
		return !1
	}

	function st(e) {
		return i(e) ? [he(e)] : Array.isArray(e) ? function e(o, a) {
			var s = [];
			var c, u, l, f;
			for (c = 0; c < o.length; c++) t(u = o[c]) || "boolean" == typeof u || (l = s.length - 1, f = s[l], Array.isArray(u) ? u.length > 0 && (ct((u = e(u, (a || "") + "_" + c))[0]) && ct(f) && (s[l] = he(f.text + u[0].text), u.shift()), s.push.apply(s, u)) : i(u) ? ct(f) ? s[l] = he(f.text + u) : "" !== u && s.push(he(u)) : ct(u) && ct(f) ? s[l] = he(f.text + u.text) : (r(o._isVList) && n(u.tag) && t(u.key) && n(a) && (u.key = "__vlist" + a + "_" + c + "__"), s.push(u)));
			return s
		}(e) : void 0
	}

	function ct(e) {
		return n(e) && n(e.text) && !1 === e.isComment
	}

	function ut(e, t) {
		if (e) {
			for (var n = Object.create(null), r = oe ? Reflect.ownKeys(e) : Object.keys(e), i = 0; i < r.length; i++) {
				var o = r[i];
				if ("__ob__" !== o) {
					for (var a = e[o].from, s = t; s;) {
						if (s._provided && y(s._provided, a)) {
							n[o] = s._provided[a];
							break
						}
						s = s.$parent
					}
					if (!s && "default" in e[o]) {
						var c = e[o].default;
						n[o] = "function" == typeof c ? c.call(t) : c
					}
				}
			}
			return n
		}
	}

	function lt(e, t) {
		if (!e || !e.length) return {};
		for (var n = {}, r = 0, i = e.length; r < i; r++) {
			var o = e[r], a = o.data;
			if (a && a.attrs && a.attrs.slot && delete a.attrs.slot, o.context !== t && o.fnContext !== t || !a || null == a.slot) (n.default || (n.default = [])).push(o); else {
				var s = a.slot, c = n[s] || (n[s] = []);
				"template" === o.tag ? c.push.apply(c, o.children || []) : c.push(o)
			}
		}
		for (var u in n) n[u].every(ft) && delete n[u];
		return n
	}

	function ft(e) {
		return e.isComment && !e.asyncFactory || " " === e.text
	}

	function pt(e) {
		return e.isComment && e.asyncFactory
	}

	function dt(t, n, r) {
		var i, o = Object.keys(n).length > 0, a = t ? !!t.$stable : !o, s = t && t.$key;
		if (t) {
			if (t._normalized) return t._normalized;
			if (a && r && r !== e && s === r.$key && !o && !r.$hasNormal) return r;
			for (var c in i = {}, t) t[c] && "$" !== c[0] && (i[c] = vt(n, c, t[c]))
		} else i = {};
		for (var u in n) u in i || (i[u] = ht(n, u));
		return t && Object.isExtensible(t) && (t._normalized = i), R(i, "$stable", a), R(i, "$key", s), R(i, "$hasNormal", o), i
	}

	function vt(e, t, n) {
		var r = function () {
			var e = arguments.length ? n.apply(null, arguments) : n({}),
				t = (e = e && "object" == typeof e && !Array.isArray(e) ? [e] : st(e)) && e[0];
			return e && (!t || 1 === e.length && t.isComment && !pt(t)) ? void 0 : e
		};
		return n.proxy && Object.defineProperty(e, t, {get: r, enumerable: !0, configurable: !0}), r
	}

	function ht(e, t) {
		return function () {
			return e[t]
		}
	}

	function mt(e, t) {
		var r, i, a, s, c;
		if (Array.isArray(e) || "string" == typeof e) for (r = new Array(e.length), i = 0, a = e.length; i < a; i++) r[i] = t(e[i], i); else if ("number" == typeof e) for (r = new Array(e), i = 0; i < e; i++) r[i] = t(i + 1, i); else if (o(e)) if (oe && e[Symbol.iterator]) {
			r = [];
			for (var u = e[Symbol.iterator](), l = u.next(); !l.done;) r.push(t(l.value, r.length)), l = u.next()
		} else for (s = Object.keys(e), r = new Array(s.length), i = 0, a = s.length; i < a; i++) c = s[i], r[i] = t(e[c], c, i);
		return n(r) || (r = []), r._isVList = !0, r
	}

	function yt(e, t, n, r) {
		var i, o = this.$scopedSlots[e];
		o ? (n = n || {}, r && (n = A(A({}, r), n)), i = o(n) || ("function" == typeof t ? t() : t)) : i = this.$slots[e] || ("function" == typeof t ? t() : t);
		var a = n && n.slot;
		return a ? this.$createElement("template", {slot: a}, i) : i
	}

	function gt(e) {
		return Le(this.$options, "filters", e) || N
	}

	function _t(e, t) {
		return Array.isArray(e) ? -1 === e.indexOf(t) : e !== t
	}

	function bt(e, t, n, r, i) {
		var o = F.keyCodes[t] || n;
		return i && r && !F.keyCodes[t] ? _t(i, r) : o ? _t(o, e) : r ? C(r) !== t : void 0 === e
	}

	function $t(e, t, n, r, i) {
		if (n) if (o(n)) {
			var a;
			Array.isArray(n) && (n = O(n));
			var s = function (o) {
				if ("class" === o || "style" === o || v(o)) a = e; else {
					var s = e.attrs && e.attrs.type;
					a = r || F.mustUseProp(t, s, o) ? e.domProps || (e.domProps = {}) : e.attrs || (e.attrs = {})
				}
				var c = b(o), u = C(o);
				c in a || u in a || (a[o] = n[o], i && ((e.on || (e.on = {}))["update:" + o] = function (e) {
					n[o] = e
				}))
			};
			for (var c in n) s(c)
		} else ;
		return e
	}

	function wt(e, t) {
		var n = this._staticTrees || (this._staticTrees = []), r = n[e];
		return r && !t ? r : (xt(r = n[e] = this.$options.staticRenderFns[e].call(this._renderProxy, null, this), "__static__" + e, !1), r)
	}

	function Ct(e, t, n) {
		return xt(e, "__once__" + t + (n ? "_" + n : ""), !0), e
	}

	function xt(e, t, n) {
		if (Array.isArray(e)) for (var r = 0; r < e.length; r++) e[r] && "string" != typeof e[r] && kt(e[r], t + "_" + r, n); else kt(e, t, n)
	}

	function kt(e, t, n) {
		e.isStatic = !0, e.key = t, e.isOnce = n
	}

	function At(e, t) {
		if (t) if (s(t)) {
			var n = e.on = e.on ? A({}, e.on) : {};
			for (var r in t) {
				var i = n[r], o = t[r];
				n[r] = i ? [].concat(i, o) : o
			}
		} else ;
		return e
	}

	function Ot(e, t, n, r) {
		t = t || {$stable: !n};
		for (var i = 0; i < e.length; i++) {
			var o = e[i];
			Array.isArray(o) ? Ot(o, t, n) : o && (o.proxy && (o.fn.proxy = !0), t[o.key] = o.fn)
		}
		return r && (t.$key = r), t
	}

	function St(e, t) {
		for (var n = 0; n < t.length; n += 2) {
			var r = t[n];
			"string" == typeof r && r && (e[t[n]] = t[n + 1])
		}
		return e
	}

	function Tt(e, t) {
		return "string" == typeof e ? t + e : e
	}

	function Nt(e) {
		e._o = Ct, e._n = f, e._s = l, e._l = mt, e._t = yt, e._q = E, e._i = j, e._m = wt, e._f = gt, e._k = bt, e._b = $t, e._v = he, e._e = ve, e._u = Ot, e._g = At, e._d = St, e._p = Tt
	}

	function Et(t, n, i, o, a) {
		var s, c = this, u = a.options;
		y(o, "_uid") ? (s = Object.create(o))._original = o : (s = o, o = o._original);
		var l = r(u._compiled), f = !l;
		this.data = t, this.props = n, this.children = i, this.parent = o, this.listeners = t.on || e, this.injections = ut(u.inject, o), this.slots = function () {
			return c.$slots || dt(t.scopedSlots, c.$slots = lt(i, o)), c.$slots
		}, Object.defineProperty(this, "scopedSlots", {
			enumerable: !0, get: function () {
				return dt(t.scopedSlots, this.slots())
			}
		}), l && (this.$options = u, this.$slots = this.slots(), this.$scopedSlots = dt(t.scopedSlots, this.$slots)), u._scopeId ? this._c = function (e, t, n, r) {
			var i = Ht(s, e, t, n, r, f);
			return i && !Array.isArray(i) && (i.fnScopeId = u._scopeId, i.fnContext = o), i
		} : this._c = function (e, t, n, r) {
			return Ht(s, e, t, n, r, f)
		}
	}

	function jt(e, t, n, r, i) {
		var o = me(e);
		return o.fnContext = n, o.fnOptions = r, t.slot && ((o.data || (o.data = {})).slot = t.slot), o
	}

	function Dt(e, t) {
		for (var n in t) e[b(n)] = t[n]
	}

	Nt(Et.prototype);
	var Lt = {
		init: function (e, t) {
			if (e.componentInstance && !e.componentInstance._isDestroyed && e.data.keepAlive) {
				var r = e;
				Lt.prepatch(r, r)
			} else {
				(e.componentInstance = function (e, t) {
					var r = {_isComponent: !0, _parentVnode: e, parent: t}, i = e.data.inlineTemplate;
					n(i) && (r.render = i.render, r.staticRenderFns = i.staticRenderFns);
					return new e.componentOptions.Ctor(r)
				}(e, Zt)).$mount(t ? e.elm : void 0, t)
			}
		}, prepatch: function (t, n) {
			var r = n.componentOptions;
			!function (t, n, r, i, o) {
				var a = i.data.scopedSlots, s = t.$scopedSlots,
					c = !!(a && !a.$stable || s !== e && !s.$stable || a && t.$scopedSlots.$key !== a.$key || !a && t.$scopedSlots.$key),
					u = !!(o || t.$options._renderChildren || c);
				t.$options._parentVnode = i, t.$vnode = i, t._vnode && (t._vnode.parent = i);
				if (t.$options._renderChildren = o, t.$attrs = i.data.attrs || e, t.$listeners = r || e, n && t.$options.props) {
					$e(!1);
					for (var l = t._props, f = t.$options._propKeys || [], p = 0; p < f.length; p++) {
						var d = f[p], v = t.$options.props;
						l[d] = Ie(d, v, n, t)
					}
					$e(!0), t.$options.propsData = n
				}
				r = r || e;
				var h = t.$options._parentListeners;
				t.$options._parentListeners = r, Wt(t, r, h), u && (t.$slots = lt(o, i.context), t.$forceUpdate())
			}(n.componentInstance = t.componentInstance, r.propsData, r.listeners, n, r.children)
		}, insert: function (e) {
			var t, n = e.context, r = e.componentInstance;
			r._isMounted || (r._isMounted = !0, Qt(r, "mounted")), e.data.keepAlive && (n._isMounted ? ((t = r)._inactive = !1, tn.push(t)) : Yt(r, !0))
		}, destroy: function (e) {
			var t = e.componentInstance;
			t._isDestroyed || (e.data.keepAlive ? function e(t, n) {
				if (n && (t._directInactive = !0, Xt(t))) return;
				if (!t._inactive) {
					t._inactive = !0;
					for (var r = 0; r < t.$children.length; r++) e(t.$children[r]);
					Qt(t, "deactivated")
				}
			}(t, !0) : t.$destroy())
		}
	}, It = Object.keys(Lt);

	function Mt(i, a, s, c, l) {
		if (!t(i)) {
			var f = s.$options._base;
			if (o(i) && (i = f.extend(i)), "function" == typeof i) {
				var p;
				if (t(i.cid) && void 0 === (i = function (e, i) {
					if (r(e.error) && n(e.errorComp)) return e.errorComp;
					if (n(e.resolved)) return e.resolved;
					var a = Ut;
					a && n(e.owners) && -1 === e.owners.indexOf(a) && e.owners.push(a);
					if (r(e.loading) && n(e.loadingComp)) return e.loadingComp;
					if (a && !n(e.owners)) {
						var s = e.owners = [a], c = !0, l = null, f = null;
						a.$on("hook:destroyed", function () {
							return h(s, a)
						});
						var p = function (e) {
							for (var t = 0, n = s.length; t < n; t++) s[t].$forceUpdate();
							e && (s.length = 0, null !== l && (clearTimeout(l), l = null), null !== f && (clearTimeout(f), f = null))
						}, d = D(function (t) {
							e.resolved = Vt(t, i), c ? s.length = 0 : p(!0)
						}), v = D(function (t) {
							n(e.errorComp) && (e.error = !0, p(!0))
						}), m = e(d, v);
						return o(m) && (u(m) ? t(e.resolved) && m.then(d, v) : u(m.component) && (m.component.then(d, v), n(m.error) && (e.errorComp = Vt(m.error, i)), n(m.loading) && (e.loadingComp = Vt(m.loading, i), 0 === m.delay ? e.loading = !0 : l = setTimeout(function () {
							l = null, t(e.resolved) && t(e.error) && (e.loading = !0, p(!1))
						}, m.delay || 200)), n(m.timeout) && (f = setTimeout(function () {
							f = null, t(e.resolved) && v(null)
						}, m.timeout)))), c = !1, e.loading ? e.loadingComp : e.resolved
					}
				}(p = i, f))) return function (e, t, n, r, i) {
					var o = ve();
					return o.asyncFactory = e, o.asyncMeta = {data: t, context: n, children: r, tag: i}, o
				}(p, a, s, c, l);
				a = a || {}, wn(i), n(a.model) && function (e, t) {
					var r = e.model && e.model.prop || "value", i = e.model && e.model.event || "input";
					(t.attrs || (t.attrs = {}))[r] = t.model.value;
					var o = t.on || (t.on = {}), a = o[i], s = t.model.callback;
					n(a) ? (Array.isArray(a) ? -1 === a.indexOf(s) : a !== s) && (o[i] = [s].concat(a)) : o[i] = s
				}(i.options, a);
				var d = function (e, r, i) {
					var o = r.options.props;
					if (!t(o)) {
						var a = {}, s = e.attrs, c = e.props;
						if (n(s) || n(c)) for (var u in o) {
							var l = C(u);
							at(a, c, u, l, !0) || at(a, s, u, l, !1)
						}
						return a
					}
				}(a, i);
				if (r(i.options.functional)) return function (t, r, i, o, a) {
					var s = t.options, c = {}, u = s.props;
					if (n(u)) for (var l in u) c[l] = Ie(l, u, r || e); else n(i.attrs) && Dt(c, i.attrs), n(i.props) && Dt(c, i.props);
					var f = new Et(i, c, a, o, t), p = s.render.call(null, f._c, f);
					if (p instanceof pe) return jt(p, i, f.parent, s);
					if (Array.isArray(p)) {
						for (var d = st(p) || [], v = new Array(d.length), h = 0; h < d.length; h++) v[h] = jt(d[h], i, f.parent, s);
						return v
					}
				}(i, d, a, s, c);
				var v = a.on;
				if (a.on = a.nativeOn, r(i.options.abstract)) {
					var m = a.slot;
					a = {}, m && (a.slot = m)
				}
				!function (e) {
					for (var t = e.hook || (e.hook = {}), n = 0; n < It.length; n++) {
						var r = It[n], i = t[r], o = Lt[r];
						i === o || i && i._merged || (t[r] = i ? Ft(o, i) : o)
					}
				}(a);
				var y = i.options.name || l;
				return new pe("vue-component-" + i.cid + (y ? "-" + y : ""), a, void 0, void 0, void 0, s, {
					Ctor: i,
					propsData: d,
					listeners: v,
					tag: l,
					children: c
				}, p)
			}
		}
	}

	function Ft(e, t) {
		var n = function (n, r) {
			e(n, r), t(n, r)
		};
		return n._merged = !0, n
	}

	var Pt = 1, Rt = 2;

	function Ht(e, a, s, c, u, l) {
		return (Array.isArray(s) || i(s)) && (u = c, c = s, s = void 0), r(l) && (u = Rt), function (e, i, a, s, c) {
			if (n(a) && n(a.__ob__)) return ve();
			n(a) && n(a.is) && (i = a.is);
			if (!i) return ve();
			Array.isArray(s) && "function" == typeof s[0] && ((a = a || {}).scopedSlots = {default: s[0]}, s.length = 0);
			c === Rt ? s = st(s) : c === Pt && (s = function (e) {
				for (var t = 0; t < e.length; t++) if (Array.isArray(e[t])) return Array.prototype.concat.apply([], e);
				return e
			}(s));
			var u, l;
			if ("string" == typeof i) {
				var f;
				l = e.$vnode && e.$vnode.ns || F.getTagNamespace(i), u = F.isReservedTag(i) ? new pe(F.parsePlatformTagName(i), a, s, void 0, void 0, e) : a && a.pre || !n(f = Le(e.$options, "components", i)) ? new pe(i, a, s, void 0, void 0, e) : Mt(f, a, e, s, i)
			} else u = Mt(i, a, e, s);
			return Array.isArray(u) ? u : n(u) ? (n(l) && function e(i, o, a) {
				i.ns = o;
				"foreignObject" === i.tag && (o = void 0, a = !0);
				if (n(i.children)) for (var s = 0, c = i.children.length; s < c; s++) {
					var u = i.children[s];
					n(u.tag) && (t(u.ns) || r(a) && "svg" !== u.tag) && e(u, o, a)
				}
			}(u, l), n(a) && function (e) {
				o(e.style) && tt(e.style);
				o(e.class) && tt(e.class)
			}(a), u) : ve()
		}(e, a, s, c, u)
	}

	var Bt, Ut = null;

	function Vt(e, t) {
		return (e.__esModule || oe && "Module" === e[Symbol.toStringTag]) && (e = e.default), o(e) ? t.extend(e) : e
	}

	function zt(e) {
		if (Array.isArray(e)) for (var t = 0; t < e.length; t++) {
			var r = e[t];
			if (n(r) && (n(r.componentOptions) || pt(r))) return r
		}
	}

	function Kt(e, t) {
		Bt.$on(e, t)
	}

	function Jt(e, t) {
		Bt.$off(e, t)
	}

	function qt(e, t) {
		var n = Bt;
		return function r() {
			null !== t.apply(null, arguments) && n.$off(e, r)
		}
	}

	function Wt(e, t, n) {
		Bt = e, it(t, n || {}, Kt, Jt, qt, e), Bt = void 0
	}

	var Zt = null;

	function Gt(e) {
		var t = Zt;
		return Zt = e, function () {
			Zt = t
		}
	}

	function Xt(e) {
		for (; e && (e = e.$parent);) if (e._inactive) return !0;
		return !1
	}

	function Yt(e, t) {
		if (t) {
			if (e._directInactive = !1, Xt(e)) return
		} else if (e._directInactive) return;
		if (e._inactive || null === e._inactive) {
			e._inactive = !1;
			for (var n = 0; n < e.$children.length; n++) Yt(e.$children[n]);
			Qt(e, "activated")
		}
	}

	function Qt(e, t) {
		le();
		var n = e.$options[t], r = t + " hook";
		if (n) for (var i = 0, o = n.length; i < o; i++) Be(n[i], e, null, e, r);
		e._hasHookEvent && e.$emit("hook:" + t), fe()
	}

	var en = [], tn = [], nn = {}, rn = !1, on = !1, an = 0;
	var sn = 0, cn = Date.now;
	if (V && !q) {
		var un = window.performance;
		un && "function" == typeof un.now && cn() > document.createEvent("Event").timeStamp && (cn = function () {
			return un.now()
		})
	}

	function ln() {
		var e, t;
		for (sn = cn(), on = !0, en.sort(function (e, t) {
			return e.id - t.id
		}), an = 0; an < en.length; an++) (e = en[an]).before && e.before(), t = e.id, nn[t] = null, e.run();
		var n = tn.slice(), r = en.slice();
		an = en.length = tn.length = 0, nn = {}, rn = on = !1, function (e) {
			for (var t = 0; t < e.length; t++) e[t]._inactive = !0, Yt(e[t], !0)
		}(n), function (e) {
			var t = e.length;
			for (; t--;) {
				var n = e[t], r = n.vm;
				r._watcher === n && r._isMounted && !r._isDestroyed && Qt(r, "updated")
			}
		}(r), ne && F.devtools && ne.emit("flush")
	}

	var fn = 0, pn = function (e, t, n, r, i) {
		this.vm = e, i && (e._watcher = this), e._watchers.push(this), r ? (this.deep = !!r.deep, this.user = !!r.user, this.lazy = !!r.lazy, this.sync = !!r.sync, this.before = r.before) : this.deep = this.user = this.lazy = this.sync = !1, this.cb = n, this.id = ++fn, this.active = !0, this.dirty = this.lazy, this.deps = [], this.newDeps = [], this.depIds = new ie, this.newDepIds = new ie, this.expression = "", "function" == typeof t ? this.getter = t : (this.getter = function (e) {
			if (!H.test(e)) {
				var t = e.split(".");
				return function (e) {
					for (var n = 0; n < t.length; n++) {
						if (!e) return;
						e = e[t[n]]
					}
					return e
				}
			}
		}(t), this.getter || (this.getter = S)), this.value = this.lazy ? void 0 : this.get()
	};
	pn.prototype.get = function () {
		var e;
		le(this);
		var t = this.vm;
		try {
			e = this.getter.call(t, t)
		} catch (e) {
			if (!this.user) throw e;
			He(e, t, 'getter for watcher "' + this.expression + '"')
		} finally {
			this.deep && tt(e), fe(), this.cleanupDeps()
		}
		return e
	}, pn.prototype.addDep = function (e) {
		var t = e.id;
		this.newDepIds.has(t) || (this.newDepIds.add(t), this.newDeps.push(e), this.depIds.has(t) || e.addSub(this))
	}, pn.prototype.cleanupDeps = function () {
		for (var e = this.deps.length; e--;) {
			var t = this.deps[e];
			this.newDepIds.has(t.id) || t.removeSub(this)
		}
		var n = this.depIds;
		this.depIds = this.newDepIds, this.newDepIds = n, this.newDepIds.clear(), n = this.deps, this.deps = this.newDeps, this.newDeps = n, this.newDeps.length = 0
	}, pn.prototype.update = function () {
		this.lazy ? this.dirty = !0 : this.sync ? this.run() : function (e) {
			var t = e.id;
			if (null == nn[t]) {
				if (nn[t] = !0, on) {
					for (var n = en.length - 1; n > an && en[n].id > e.id;) n--;
					en.splice(n + 1, 0, e)
				} else en.push(e);
				rn || (rn = !0, Qe(ln))
			}
		}(this)
	}, pn.prototype.run = function () {
		if (this.active) {
			var e = this.get();
			if (e !== this.value || o(e) || this.deep) {
				var t = this.value;
				if (this.value = e, this.user) {
					var n = 'callback for watcher "' + this.expression + '"';
					Be(this.cb, this.vm, [e, t], this.vm, n)
				} else this.cb.call(this.vm, e, t)
			}
		}
	}, pn.prototype.evaluate = function () {
		this.value = this.get(), this.dirty = !1
	}, pn.prototype.depend = function () {
		for (var e = this.deps.length; e--;) this.deps[e].depend()
	}, pn.prototype.teardown = function () {
		if (this.active) {
			this.vm._isBeingDestroyed || h(this.vm._watchers, this);
			for (var e = this.deps.length; e--;) this.deps[e].removeSub(this);
			this.active = !1
		}
	};
	var dn = {enumerable: !0, configurable: !0, get: S, set: S};

	function vn(e, t, n) {
		dn.get = function () {
			return this[t][n]
		}, dn.set = function (e) {
			this[t][n] = e
		}, Object.defineProperty(e, n, dn)
	}

	function hn(e) {
		e._watchers = [];
		var t = e.$options;
		t.props && function (e, t) {
			var n = e.$options.propsData || {}, r = e._props = {}, i = e.$options._propKeys = [];
			e.$parent && $e(!1);
			var o = function (o) {
				i.push(o);
				var a = Ie(o, t, n, e);
				xe(r, o, a), o in e || vn(e, "_props", o)
			};
			for (var a in t) o(a);
			$e(!0)
		}(e, t.props), t.methods && function (e, t) {
			e.$options.props;
			for (var n in t) e[n] = "function" != typeof t[n] ? S : x(t[n], e)
		}(e, t.methods), t.data ? function (e) {
			var t = e.$options.data;
			s(t = e._data = "function" == typeof t ? function (e, t) {
				le();
				try {
					return e.call(t, t)
				} catch (e) {
					return He(e, t, "data()"), {}
				} finally {
					fe()
				}
			}(t, e) : t || {}) || (t = {});
			var n = Object.keys(t), r = e.$options.props, i = (e.$options.methods, n.length);
			for (; i--;) {
				var o = n[i];
				r && y(r, o) || (a = void 0, 36 !== (a = (o + "").charCodeAt(0)) && 95 !== a && vn(e, "_data", o))
			}
			var a;
			Ce(t, !0)
		}(e) : Ce(e._data = {}, !0), t.computed && function (e, t) {
			var n = e._computedWatchers = Object.create(null), r = te();
			for (var i in t) {
				var o = t[i], a = "function" == typeof o ? o : o.get;
				r || (n[i] = new pn(e, a || S, S, mn)), i in e || yn(e, i, o)
			}
		}(e, t.computed), t.watch && t.watch !== Y && function (e, t) {
			for (var n in t) {
				var r = t[n];
				if (Array.isArray(r)) for (var i = 0; i < r.length; i++) bn(e, n, r[i]); else bn(e, n, r)
			}
		}(e, t.watch)
	}

	var mn = {lazy: !0};

	function yn(e, t, n) {
		var r = !te();
		"function" == typeof n ? (dn.get = r ? gn(t) : _n(n), dn.set = S) : (dn.get = n.get ? r && !1 !== n.cache ? gn(t) : _n(n.get) : S, dn.set = n.set || S), Object.defineProperty(e, t, dn)
	}

	function gn(e) {
		return function () {
			var t = this._computedWatchers && this._computedWatchers[e];
			if (t) return t.dirty && t.evaluate(), ce.target && t.depend(), t.value
		}
	}

	function _n(e) {
		return function () {
			return e.call(this, this)
		}
	}

	function bn(e, t, n, r) {
		return s(n) && (r = n, n = n.handler), "string" == typeof n && (n = e[n]), e.$watch(t, n, r)
	}

	var $n = 0;

	function wn(e) {
		var t = e.options;
		if (e.super) {
			var n = wn(e.super);
			if (n !== e.superOptions) {
				e.superOptions = n;
				var r = function (e) {
					var t, n = e.options, r = e.sealedOptions;
					for (var i in n) n[i] !== r[i] && (t || (t = {}), t[i] = n[i]);
					return t
				}(e);
				r && A(e.extendOptions, r), (t = e.options = De(n, e.extendOptions)).name && (t.components[t.name] = e)
			}
		}
		return t
	}

	function Cn(e) {
		this._init(e)
	}

	function xn(e) {
		e.cid = 0;
		var t = 1;
		e.extend = function (e) {
			e = e || {};
			var n = this, r = n.cid, i = e._Ctor || (e._Ctor = {});
			if (i[r]) return i[r];
			var o = e.name || n.options.name, a = function (e) {
				this._init(e)
			};
			return (a.prototype = Object.create(n.prototype)).constructor = a, a.cid = t++, a.options = De(n.options, e), a.super = n, a.options.props && function (e) {
				var t = e.options.props;
				for (var n in t) vn(e.prototype, "_props", n)
			}(a), a.options.computed && function (e) {
				var t = e.options.computed;
				for (var n in t) yn(e.prototype, n, t[n])
			}(a), a.extend = n.extend, a.mixin = n.mixin, a.use = n.use, I.forEach(function (e) {
				a[e] = n[e]
			}), o && (a.options.components[o] = a), a.superOptions = n.options, a.extendOptions = e, a.sealedOptions = A({}, a.options), i[r] = a, a
		}
	}

	function kn(e) {
		return e && (e.Ctor.options.name || e.tag)
	}

	function An(e, t) {
		return Array.isArray(e) ? e.indexOf(t) > -1 : "string" == typeof e ? e.split(",").indexOf(t) > -1 : (n = e, "[object RegExp]" === a.call(n) && e.test(t));
		var n
	}

	function On(e, t) {
		var n = e.cache, r = e.keys, i = e._vnode;
		for (var o in n) {
			var a = n[o];
			if (a) {
				var s = a.name;
				s && !t(s) && Sn(n, o, r, i)
			}
		}
	}

	function Sn(e, t, n, r) {
		var i = e[t];
		!i || r && i.tag === r.tag || i.componentInstance.$destroy(), e[t] = null, h(n, t)
	}

	!function (t) {
		t.prototype._init = function (t) {
			var n = this;
			n._uid = $n++, n._isVue = !0, t && t._isComponent ? function (e, t) {
				var n = e.$options = Object.create(e.constructor.options), r = t._parentVnode;
				n.parent = t.parent, n._parentVnode = r;
				var i = r.componentOptions;
				n.propsData = i.propsData, n._parentListeners = i.listeners, n._renderChildren = i.children, n._componentTag = i.tag, t.render && (n.render = t.render, n.staticRenderFns = t.staticRenderFns)
			}(n, t) : n.$options = De(wn(n.constructor), t || {}, n), n._renderProxy = n, n._self = n, function (e) {
				var t = e.$options, n = t.parent;
				if (n && !t.abstract) {
					for (; n.$options.abstract && n.$parent;) n = n.$parent;
					n.$children.push(e)
				}
				e.$parent = n, e.$root = n ? n.$root : e, e.$children = [], e.$refs = {}, e._watcher = null, e._inactive = null, e._directInactive = !1, e._isMounted = !1, e._isDestroyed = !1, e._isBeingDestroyed = !1
			}(n), function (e) {
				e._events = Object.create(null), e._hasHookEvent = !1;
				var t = e.$options._parentListeners;
				t && Wt(e, t)
			}(n), function (t) {
				t._vnode = null, t._staticTrees = null;
				var n = t.$options, r = t.$vnode = n._parentVnode, i = r && r.context;
				t.$slots = lt(n._renderChildren, i), t.$scopedSlots = e, t._c = function (e, n, r, i) {
					return Ht(t, e, n, r, i, !1)
				}, t.$createElement = function (e, n, r, i) {
					return Ht(t, e, n, r, i, !0)
				};
				var o = r && r.data;
				xe(t, "$attrs", o && o.attrs || e, null, !0), xe(t, "$listeners", n._parentListeners || e, null, !0)
			}(n), Qt(n, "beforeCreate"), function (e) {
				var t = ut(e.$options.inject, e);
				t && ($e(!1), Object.keys(t).forEach(function (n) {
					xe(e, n, t[n])
				}), $e(!0))
			}(n), hn(n), function (e) {
				var t = e.$options.provide;
				t && (e._provided = "function" == typeof t ? t.call(e) : t)
			}(n), Qt(n, "created"), n.$options.el && n.$mount(n.$options.el)
		}
	}(Cn), function (e) {
		var t = {
			get: function () {
				return this._data
			}
		}, n = {
			get: function () {
				return this._props
			}
		};
		Object.defineProperty(e.prototype, "$data", t), Object.defineProperty(e.prototype, "$props", n), e.prototype.$set = ke, e.prototype.$delete = Ae, e.prototype.$watch = function (e, t, n) {
			if (s(t)) return bn(this, e, t, n);
			(n = n || {}).user = !0;
			var r = new pn(this, e, t, n);
			if (n.immediate) {
				var i = 'callback for immediate watcher "' + r.expression + '"';
				le(), Be(t, this, [r.value], this, i), fe()
			}
			return function () {
				r.teardown()
			}
		}
	}(Cn), function (e) {
		var t = /^hook:/;
		e.prototype.$on = function (e, n) {
			var r = this;
			if (Array.isArray(e)) for (var i = 0, o = e.length; i < o; i++) r.$on(e[i], n); else (r._events[e] || (r._events[e] = [])).push(n), t.test(e) && (r._hasHookEvent = !0);
			return r
		}, e.prototype.$once = function (e, t) {
			var n = this;

			function r() {
				n.$off(e, r), t.apply(n, arguments)
			}

			return r.fn = t, n.$on(e, r), n
		}, e.prototype.$off = function (e, t) {
			var n = this;
			if (!arguments.length) return n._events = Object.create(null), n;
			if (Array.isArray(e)) {
				for (var r = 0, i = e.length; r < i; r++) n.$off(e[r], t);
				return n
			}
			var o, a = n._events[e];
			if (!a) return n;
			if (!t) return n._events[e] = null, n;
			for (var s = a.length; s--;) if ((o = a[s]) === t || o.fn === t) {
				a.splice(s, 1);
				break
			}
			return n
		}, e.prototype.$emit = function (e) {
			var t = this._events[e];
			if (t) {
				t = t.length > 1 ? k(t) : t;
				for (var n = k(arguments, 1), r = 'event handler for "' + e + '"', i = 0, o = t.length; i < o; i++) Be(t[i], this, n, this, r)
			}
			return this
		}
	}(Cn), function (e) {
		e.prototype._update = function (e, t) {
			var n = this, r = n.$el, i = n._vnode, o = Gt(n);
			n._vnode = e, n.$el = i ? n.__patch__(i, e) : n.__patch__(n.$el, e, t, !1), o(), r && (r.__vue__ = null), n.$el && (n.$el.__vue__ = n), n.$vnode && n.$parent && n.$vnode === n.$parent._vnode && (n.$parent.$el = n.$el)
		}, e.prototype.$forceUpdate = function () {
			this._watcher && this._watcher.update()
		}, e.prototype.$destroy = function () {
			var e = this;
			if (!e._isBeingDestroyed) {
				Qt(e, "beforeDestroy"), e._isBeingDestroyed = !0;
				var t = e.$parent;
				!t || t._isBeingDestroyed || e.$options.abstract || h(t.$children, e), e._watcher && e._watcher.teardown();
				for (var n = e._watchers.length; n--;) e._watchers[n].teardown();
				e._data.__ob__ && e._data.__ob__.vmCount--, e._isDestroyed = !0, e.__patch__(e._vnode, null), Qt(e, "destroyed"), e.$off(), e.$el && (e.$el.__vue__ = null), e.$vnode && (e.$vnode.parent = null)
			}
		}
	}(Cn), function (e) {
		Nt(e.prototype), e.prototype.$nextTick = function (e) {
			return Qe(e, this)
		}, e.prototype._render = function () {
			var e, t = this, n = t.$options, r = n.render, i = n._parentVnode;
			i && (t.$scopedSlots = dt(i.data.scopedSlots, t.$slots, t.$scopedSlots)), t.$vnode = i;
			try {
				Ut = t, e = r.call(t._renderProxy, t.$createElement)
			} catch (n) {
				He(n, t, "render"), e = t._vnode
			} finally {
				Ut = null
			}
			return Array.isArray(e) && 1 === e.length && (e = e[0]), e instanceof pe || (e = ve()), e.parent = i, e
		}
	}(Cn);
	var Tn = [String, RegExp, Array], Nn = {
		KeepAlive: {
			name: "keep-alive",
			abstract: !0,
			props: {include: Tn, exclude: Tn, max: [String, Number]},
			methods: {
				cacheVNode: function () {
					var e = this.cache, t = this.keys, n = this.vnodeToCache, r = this.keyToCache;
					if (n) {
						var i = n.tag, o = n.componentInstance, a = n.componentOptions;
						e[r] = {
							name: kn(a),
							tag: i,
							componentInstance: o
						}, t.push(r), this.max && t.length > parseInt(this.max) && Sn(e, t[0], t, this._vnode), this.vnodeToCache = null
					}
				}
			},
			created: function () {
				this.cache = Object.create(null), this.keys = []
			},
			destroyed: function () {
				for (var e in this.cache) Sn(this.cache, e, this.keys)
			},
			mounted: function () {
				var e = this;
				this.cacheVNode(), this.$watch("include", function (t) {
					On(e, function (e) {
						return An(t, e)
					})
				}), this.$watch("exclude", function (t) {
					On(e, function (e) {
						return !An(t, e)
					})
				})
			},
			updated: function () {
				this.cacheVNode()
			},
			render: function () {
				var e = this.$slots.default, t = zt(e), n = t && t.componentOptions;
				if (n) {
					var r = kn(n), i = this.include, o = this.exclude;
					if (i && (!r || !An(i, r)) || o && r && An(o, r)) return t;
					var a = this.cache, s = this.keys,
						c = null == t.key ? n.Ctor.cid + (n.tag ? "::" + n.tag : "") : t.key;
					a[c] ? (t.componentInstance = a[c].componentInstance, h(s, c), s.push(c)) : (this.vnodeToCache = t, this.keyToCache = c), t.data.keepAlive = !0
				}
				return t || e && e[0]
			}
		}
	};
	!function (e) {
		var t = {
			get: function () {
				return F
			}
		};
		Object.defineProperty(e, "config", t), e.util = {
			warn: ae,
			extend: A,
			mergeOptions: De,
			defineReactive: xe
		}, e.set = ke, e.delete = Ae, e.nextTick = Qe, e.observable = function (e) {
			return Ce(e), e
		}, e.options = Object.create(null), I.forEach(function (t) {
			e.options[t + "s"] = Object.create(null)
		}), e.options._base = e, A(e.options.components, Nn), function (e) {
			e.use = function (e) {
				var t = this._installedPlugins || (this._installedPlugins = []);
				if (t.indexOf(e) > -1) return this;
				var n = k(arguments, 1);
				return n.unshift(this), "function" == typeof e.install ? e.install.apply(e, n) : "function" == typeof e && e.apply(null, n), t.push(e), this
			}
		}(e), function (e) {
			e.mixin = function (e) {
				return this.options = De(this.options, e), this
			}
		}(e), xn(e), function (e) {
			I.forEach(function (t) {
				e[t] = function (e, n) {
					return n ? ("component" === t && s(n) && (n.name = n.name || e, n = this.options._base.extend(n)), "directive" === t && "function" == typeof n && (n = {
						bind: n,
						update: n
					}), this.options[t + "s"][e] = n, n) : this.options[t + "s"][e]
				}
			})
		}(e)
	}(Cn), Object.defineProperty(Cn.prototype, "$isServer", {get: te}), Object.defineProperty(Cn.prototype, "$ssrContext", {
		get: function () {
			return this.$vnode && this.$vnode.ssrContext
		}
	}), Object.defineProperty(Cn, "FunctionalRenderContext", {value: Et}), Cn.version = "2.6.14";
	var En = p("style,class"), jn = p("input,textarea,option,select,progress"), Dn = function (e, t, n) {
			return "value" === n && jn(e) && "button" !== t || "selected" === n && "option" === e || "checked" === n && "input" === e || "muted" === n && "video" === e
		}, Ln = p("contenteditable,draggable,spellcheck"), In = p("events,caret,typing,plaintext-only"),
		Mn = function (e, t) {
			return Bn(t) || "false" === t ? "false" : "contenteditable" === e && In(t) ? t : "true"
		},
		Fn = p("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible"),
		Pn = "http://www.w3.org/1999/xlink", Rn = function (e) {
			return ":" === e.charAt(5) && "xlink" === e.slice(0, 5)
		}, Hn = function (e) {
			return Rn(e) ? e.slice(6, e.length) : ""
		}, Bn = function (e) {
			return null == e || !1 === e
		};

	function Un(e) {
		for (var t = e.data, r = e, i = e; n(i.componentInstance);) (i = i.componentInstance._vnode) && i.data && (t = Vn(i.data, t));
		for (; n(r = r.parent);) r && r.data && (t = Vn(t, r.data));
		return function (e, t) {
			if (n(e) || n(t)) return zn(e, Kn(t));
			return ""
		}(t.staticClass, t.class)
	}

	function Vn(e, t) {
		return {staticClass: zn(e.staticClass, t.staticClass), class: n(e.class) ? [e.class, t.class] : t.class}
	}

	function zn(e, t) {
		return e ? t ? e + " " + t : e : t || ""
	}

	function Kn(e) {
		return Array.isArray(e) ? function (e) {
			for (var t, r = "", i = 0, o = e.length; i < o; i++) n(t = Kn(e[i])) && "" !== t && (r && (r += " "), r += t);
			return r
		}(e) : o(e) ? function (e) {
			var t = "";
			for (var n in e) e[n] && (t && (t += " "), t += n);
			return t
		}(e) : "string" == typeof e ? e : ""
	}

	var Jn = {svg: "http://www.w3.org/2000/svg", math: "http://www.w3.org/1998/Math/MathML"},
		qn = p("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),
		Wn = p("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", !0),
		Zn = function (e) {
			return qn(e) || Wn(e)
		};

	function Gn(e) {
		return Wn(e) ? "svg" : "math" === e ? "math" : void 0
	}

	var Xn = Object.create(null);
	var Yn = p("text,number,password,search,email,tel,url");

	function Qn(e) {
		if ("string" == typeof e) {
			var t = document.querySelector(e);
			return t || document.createElement("div")
		}
		return e
	}

	var er = Object.freeze({
		createElement: function (e, t) {
			var n = document.createElement(e);
			return "select" !== e ? n : (t.data && t.data.attrs && void 0 !== t.data.attrs.multiple && n.setAttribute("multiple", "multiple"), n)
		}, createElementNS: function (e, t) {
			return document.createElementNS(Jn[e], t)
		}, createTextNode: function (e) {
			return document.createTextNode(e)
		}, createComment: function (e) {
			return document.createComment(e)
		}, insertBefore: function (e, t, n) {
			e.insertBefore(t, n)
		}, removeChild: function (e, t) {
			e.removeChild(t)
		}, appendChild: function (e, t) {
			e.appendChild(t)
		}, parentNode: function (e) {
			return e.parentNode
		}, nextSibling: function (e) {
			return e.nextSibling
		}, tagName: function (e) {
			return e.tagName
		}, setTextContent: function (e, t) {
			e.textContent = t
		}, setStyleScope: function (e, t) {
			e.setAttribute(t, "")
		}
	}), tr = {
		create: function (e, t) {
			nr(t)
		}, update: function (e, t) {
			e.data.ref !== t.data.ref && (nr(e, !0), nr(t))
		}, destroy: function (e) {
			nr(e, !0)
		}
	};

	function nr(e, t) {
		var r = e.data.ref;
		if (n(r)) {
			var i = e.context, o = e.componentInstance || e.elm, a = i.$refs;
			t ? Array.isArray(a[r]) ? h(a[r], o) : a[r] === o && (a[r] = void 0) : e.data.refInFor ? Array.isArray(a[r]) ? a[r].indexOf(o) < 0 && a[r].push(o) : a[r] = [o] : a[r] = o
		}
	}

	var rr = new pe("", {}, []), ir = ["create", "activate", "update", "remove", "destroy"];

	function or(e, i) {
		return e.key === i.key && e.asyncFactory === i.asyncFactory && (e.tag === i.tag && e.isComment === i.isComment && n(e.data) === n(i.data) && function (e, t) {
			if ("input" !== e.tag) return !0;
			var r, i = n(r = e.data) && n(r = r.attrs) && r.type, o = n(r = t.data) && n(r = r.attrs) && r.type;
			return i === o || Yn(i) && Yn(o)
		}(e, i) || r(e.isAsyncPlaceholder) && t(i.asyncFactory.error))
	}

	function ar(e, t, r) {
		var i, o, a = {};
		for (i = t; i <= r; ++i) n(o = e[i].key) && (a[o] = i);
		return a
	}

	var sr = {
		create: cr, update: cr, destroy: function (e) {
			cr(e, rr)
		}
	};

	function cr(e, t) {
		(e.data.directives || t.data.directives) && function (e, t) {
			var n, r, i, o = e === rr, a = t === rr, s = lr(e.data.directives, e.context),
				c = lr(t.data.directives, t.context), u = [], l = [];
			for (n in c) r = s[n], i = c[n], r ? (i.oldValue = r.value, i.oldArg = r.arg, pr(i, "update", t, e), i.def && i.def.componentUpdated && l.push(i)) : (pr(i, "bind", t, e), i.def && i.def.inserted && u.push(i));
			if (u.length) {
				var f = function () {
					for (var n = 0; n < u.length; n++) pr(u[n], "inserted", t, e)
				};
				o ? ot(t, "insert", f) : f()
			}
			l.length && ot(t, "postpatch", function () {
				for (var n = 0; n < l.length; n++) pr(l[n], "componentUpdated", t, e)
			});
			if (!o) for (n in s) c[n] || pr(s[n], "unbind", e, e, a)
		}(e, t)
	}

	var ur = Object.create(null);

	function lr(e, t) {
		var n, r, i = Object.create(null);
		if (!e) return i;
		for (n = 0; n < e.length; n++) (r = e[n]).modifiers || (r.modifiers = ur), i[fr(r)] = r, r.def = Le(t.$options, "directives", r.name);
		return i
	}

	function fr(e) {
		return e.rawName || e.name + "." + Object.keys(e.modifiers || {}).join(".")
	}

	function pr(e, t, n, r, i) {
		var o = e.def && e.def[t];
		if (o) try {
			o(n.elm, e, n, r, i)
		} catch (r) {
			He(r, n.context, "directive " + e.name + " " + t + " hook")
		}
	}

	var dr = [tr, sr];

	function vr(e, r) {
		var i = r.componentOptions;
		if (!(n(i) && !1 === i.Ctor.options.inheritAttrs || t(e.data.attrs) && t(r.data.attrs))) {
			var o, a, s = r.elm, c = e.data.attrs || {}, u = r.data.attrs || {};
			for (o in n(u.__ob__) && (u = r.data.attrs = A({}, u)), u) a = u[o], c[o] !== a && hr(s, o, a, r.data.pre);
			for (o in (q || Z) && u.value !== c.value && hr(s, "value", u.value), c) t(u[o]) && (Rn(o) ? s.removeAttributeNS(Pn, Hn(o)) : Ln(o) || s.removeAttribute(o))
		}
	}

	function hr(e, t, n, r) {
		r || e.tagName.indexOf("-") > -1 ? mr(e, t, n) : Fn(t) ? Bn(n) ? e.removeAttribute(t) : (n = "allowfullscreen" === t && "EMBED" === e.tagName ? "true" : t, e.setAttribute(t, n)) : Ln(t) ? e.setAttribute(t, Mn(t, n)) : Rn(t) ? Bn(n) ? e.removeAttributeNS(Pn, Hn(t)) : e.setAttributeNS(Pn, t, n) : mr(e, t, n)
	}

	function mr(e, t, n) {
		if (Bn(n)) e.removeAttribute(t); else {
			if (q && !W && "TEXTAREA" === e.tagName && "placeholder" === t && "" !== n && !e.__ieph) {
				var r = function (t) {
					t.stopImmediatePropagation(), e.removeEventListener("input", r)
				};
				e.addEventListener("input", r), e.__ieph = !0
			}
			e.setAttribute(t, n)
		}
	}

	var yr = {create: vr, update: vr};

	function gr(e, r) {
		var i = r.elm, o = r.data, a = e.data;
		if (!(t(o.staticClass) && t(o.class) && (t(a) || t(a.staticClass) && t(a.class)))) {
			var s = Un(r), c = i._transitionClasses;
			n(c) && (s = zn(s, Kn(c))), s !== i._prevClass && (i.setAttribute("class", s), i._prevClass = s)
		}
	}

	var _r, br, $r, wr, Cr, xr, kr = {create: gr, update: gr}, Ar = /[\w).+\-_$\]]/;

	function Or(e) {
		var t, n, r, i, o, a = !1, s = !1, c = !1, u = !1, l = 0, f = 0, p = 0, d = 0;
		for (r = 0; r < e.length; r++) if (n = t, t = e.charCodeAt(r), a) 39 === t && 92 !== n && (a = !1); else if (s) 34 === t && 92 !== n && (s = !1); else if (c) 96 === t && 92 !== n && (c = !1); else if (u) 47 === t && 92 !== n && (u = !1); else if (124 !== t || 124 === e.charCodeAt(r + 1) || 124 === e.charCodeAt(r - 1) || l || f || p) {
			switch (t) {
				case 34:
					s = !0;
					break;
				case 39:
					a = !0;
					break;
				case 96:
					c = !0;
					break;
				case 40:
					p++;
					break;
				case 41:
					p--;
					break;
				case 91:
					f++;
					break;
				case 93:
					f--;
					break;
				case 123:
					l++;
					break;
				case 125:
					l--
			}
			if (47 === t) {
				for (var v = r - 1, h = void 0; v >= 0 && " " === (h = e.charAt(v)); v--) ;
				h && Ar.test(h) || (u = !0)
			}
		} else void 0 === i ? (d = r + 1, i = e.slice(0, r).trim()) : m();

		function m() {
			(o || (o = [])).push(e.slice(d, r).trim()), d = r + 1
		}

		if (void 0 === i ? i = e.slice(0, r).trim() : 0 !== d && m(), o) for (r = 0; r < o.length; r++) i = Sr(i, o[r]);
		return i
	}

	function Sr(e, t) {
		var n = t.indexOf("(");
		if (n < 0) return '_f("' + t + '")(' + e + ")";
		var r = t.slice(0, n), i = t.slice(n + 1);
		return '_f("' + r + '")(' + e + (")" !== i ? "," + i : i)
	}

	function Tr(e, t) {
		console.error("[Vue compiler]: " + e)
	}

	function Nr(e, t) {
		return e ? e.map(function (e) {
			return e[t]
		}).filter(function (e) {
			return e
		}) : []
	}

	function Er(e, t, n, r, i) {
		(e.props || (e.props = [])).push(Hr({name: t, value: n, dynamic: i}, r)), e.plain = !1
	}

	function jr(e, t, n, r, i) {
		(i ? e.dynamicAttrs || (e.dynamicAttrs = []) : e.attrs || (e.attrs = [])).push(Hr({
			name: t,
			value: n,
			dynamic: i
		}, r)), e.plain = !1
	}

	function Dr(e, t, n, r) {
		e.attrsMap[t] = n, e.attrsList.push(Hr({name: t, value: n}, r))
	}

	function Lr(e, t, n, r, i, o, a, s) {
		(e.directives || (e.directives = [])).push(Hr({
			name: t,
			rawName: n,
			value: r,
			arg: i,
			isDynamicArg: o,
			modifiers: a
		}, s)), e.plain = !1
	}

	function Ir(e, t, n) {
		return n ? "_p(" + t + ',"' + e + '")' : e + t
	}

	function Mr(t, n, r, i, o, a, s, c) {
		var u;
		(i = i || e).right ? c ? n = "(" + n + ")==='click'?'contextmenu':(" + n + ")" : "click" === n && (n = "contextmenu", delete i.right) : i.middle && (c ? n = "(" + n + ")==='click'?'mouseup':(" + n + ")" : "click" === n && (n = "mouseup")), i.capture && (delete i.capture, n = Ir("!", n, c)), i.once && (delete i.once, n = Ir("~", n, c)), i.passive && (delete i.passive, n = Ir("&", n, c)), i.native ? (delete i.native, u = t.nativeEvents || (t.nativeEvents = {})) : u = t.events || (t.events = {});
		var l = Hr({value: r.trim(), dynamic: c}, s);
		i !== e && (l.modifiers = i);
		var f = u[n];
		Array.isArray(f) ? o ? f.unshift(l) : f.push(l) : u[n] = f ? o ? [l, f] : [f, l] : l, t.plain = !1
	}

	function Fr(e, t, n) {
		var r = Pr(e, ":" + t) || Pr(e, "v-bind:" + t);
		if (null != r) return Or(r);
		if (!1 !== n) {
			var i = Pr(e, t);
			if (null != i) return JSON.stringify(i)
		}
	}

	function Pr(e, t, n) {
		var r;
		if (null != (r = e.attrsMap[t])) for (var i = e.attrsList, o = 0, a = i.length; o < a; o++) if (i[o].name === t) {
			i.splice(o, 1);
			break
		}
		return n && delete e.attrsMap[t], r
	}

	function Rr(e, t) {
		for (var n = e.attrsList, r = 0, i = n.length; r < i; r++) {
			var o = n[r];
			if (t.test(o.name)) return n.splice(r, 1), o
		}
	}

	function Hr(e, t) {
		return t && (null != t.start && (e.start = t.start), null != t.end && (e.end = t.end)), e
	}

	function Br(e, t, n) {
		var r = n || {}, i = r.number, o = "$$v";
		r.trim && (o = "(typeof $$v === 'string'? $$v.trim(): $$v)"), i && (o = "_n(" + o + ")");
		var a = Ur(t, o);
		e.model = {value: "(" + t + ")", expression: JSON.stringify(t), callback: "function ($$v) {" + a + "}"}
	}

	function Ur(e, t) {
		var n = function (e) {
			if (e = e.trim(), _r = e.length, e.indexOf("[") < 0 || e.lastIndexOf("]") < _r - 1) return (wr = e.lastIndexOf(".")) > -1 ? {
				exp: e.slice(0, wr),
				key: '"' + e.slice(wr + 1) + '"'
			} : {exp: e, key: null};
			br = e, wr = Cr = xr = 0;
			for (; !zr();) Kr($r = Vr()) ? qr($r) : 91 === $r && Jr($r);
			return {exp: e.slice(0, Cr), key: e.slice(Cr + 1, xr)}
		}(e);
		return null === n.key ? e + "=" + t : "$set(" + n.exp + ", " + n.key + ", " + t + ")"
	}

	function Vr() {
		return br.charCodeAt(++wr)
	}

	function zr() {
		return wr >= _r
	}

	function Kr(e) {
		return 34 === e || 39 === e
	}

	function Jr(e) {
		var t = 1;
		for (Cr = wr; !zr();) if (Kr(e = Vr())) qr(e); else if (91 === e && t++, 93 === e && t--, 0 === t) {
			xr = wr;
			break
		}
	}

	function qr(e) {
		for (var t = e; !zr() && (e = Vr()) !== t;) ;
	}

	var Wr, Zr = "__r", Gr = "__c";

	function Xr(e, t, n) {
		var r = Wr;
		return function i() {
			null !== t.apply(null, arguments) && ei(e, i, n, r)
		}
	}

	var Yr = Ke && !(X && Number(X[1]) <= 53);

	function Qr(e, t, n, r) {
		if (Yr) {
			var i = sn, o = t;
			t = o._wrapper = function (e) {
				if (e.target === e.currentTarget || e.timeStamp >= i || e.timeStamp <= 0 || e.target.ownerDocument !== document) return o.apply(this, arguments)
			}
		}
		Wr.addEventListener(e, t, Q ? {capture: n, passive: r} : n)
	}

	function ei(e, t, n, r) {
		(r || Wr).removeEventListener(e, t._wrapper || t, n)
	}

	function ti(e, r) {
		if (!t(e.data.on) || !t(r.data.on)) {
			var i = r.data.on || {}, o = e.data.on || {};
			Wr = r.elm, function (e) {
				if (n(e[Zr])) {
					var t = q ? "change" : "input";
					e[t] = [].concat(e[Zr], e[t] || []), delete e[Zr]
				}
				n(e[Gr]) && (e.change = [].concat(e[Gr], e.change || []), delete e[Gr])
			}(i), it(i, o, Qr, ei, Xr, r.context), Wr = void 0
		}
	}

	var ni, ri = {create: ti, update: ti};

	function ii(e, r) {
		if (!t(e.data.domProps) || !t(r.data.domProps)) {
			var i, o, a = r.elm, s = e.data.domProps || {}, c = r.data.domProps || {};
			for (i in n(c.__ob__) && (c = r.data.domProps = A({}, c)), s) i in c || (a[i] = "");
			for (i in c) {
				if (o = c[i], "textContent" === i || "innerHTML" === i) {
					if (r.children && (r.children.length = 0), o === s[i]) continue;
					1 === a.childNodes.length && a.removeChild(a.childNodes[0])
				}
				if ("value" === i && "PROGRESS" !== a.tagName) {
					a._value = o;
					var u = t(o) ? "" : String(o);
					oi(a, u) && (a.value = u)
				} else if ("innerHTML" === i && Wn(a.tagName) && t(a.innerHTML)) {
					(ni = ni || document.createElement("div")).innerHTML = "<svg>" + o + "</svg>";
					for (var l = ni.firstChild; a.firstChild;) a.removeChild(a.firstChild);
					for (; l.firstChild;) a.appendChild(l.firstChild)
				} else if (o !== s[i]) try {
					a[i] = o
				} catch (e) {
				}
			}
		}
	}

	function oi(e, t) {
		return !e.composing && ("OPTION" === e.tagName || function (e, t) {
			var n = !0;
			try {
				n = document.activeElement !== e
			} catch (e) {
			}
			return n && e.value !== t
		}(e, t) || function (e, t) {
			var r = e.value, i = e._vModifiers;
			if (n(i)) {
				if (i.number) return f(r) !== f(t);
				if (i.trim) return r.trim() !== t.trim()
			}
			return r !== t
		}(e, t))
	}

	var ai = {create: ii, update: ii}, si = g(function (e) {
		var t = {}, n = /:(.+)/;
		return e.split(/;(?![^(]*\))/g).forEach(function (e) {
			if (e) {
				var r = e.split(n);
				r.length > 1 && (t[r[0].trim()] = r[1].trim())
			}
		}), t
	});

	function ci(e) {
		var t = ui(e.style);
		return e.staticStyle ? A(e.staticStyle, t) : t
	}

	function ui(e) {
		return Array.isArray(e) ? O(e) : "string" == typeof e ? si(e) : e
	}

	var li, fi = /^--/, pi = /\s*!important$/, di = function (e, t, n) {
		if (fi.test(t)) e.style.setProperty(t, n); else if (pi.test(n)) e.style.setProperty(C(t), n.replace(pi, ""), "important"); else {
			var r = hi(t);
			if (Array.isArray(n)) for (var i = 0, o = n.length; i < o; i++) e.style[r] = n[i]; else e.style[r] = n
		}
	}, vi = ["Webkit", "Moz", "ms"], hi = g(function (e) {
		if (li = li || document.createElement("div").style, "filter" !== (e = b(e)) && e in li) return e;
		for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < vi.length; n++) {
			var r = vi[n] + t;
			if (r in li) return r
		}
	});

	function mi(e, r) {
		var i = r.data, o = e.data;
		if (!(t(i.staticStyle) && t(i.style) && t(o.staticStyle) && t(o.style))) {
			var a, s, c = r.elm, u = o.staticStyle, l = o.normalizedStyle || o.style || {}, f = u || l,
				p = ui(r.data.style) || {};
			r.data.normalizedStyle = n(p.__ob__) ? A({}, p) : p;
			var d = function (e, t) {
				var n, r = {};
				if (t) for (var i = e; i.componentInstance;) (i = i.componentInstance._vnode) && i.data && (n = ci(i.data)) && A(r, n);
				(n = ci(e.data)) && A(r, n);
				for (var o = e; o = o.parent;) o.data && (n = ci(o.data)) && A(r, n);
				return r
			}(r, !0);
			for (s in f) t(d[s]) && di(c, s, "");
			for (s in d) (a = d[s]) !== f[s] && di(c, s, null == a ? "" : a)
		}
	}

	var yi = {create: mi, update: mi}, gi = /\s+/;

	function _i(e, t) {
		if (t && (t = t.trim())) if (e.classList) t.indexOf(" ") > -1 ? t.split(gi).forEach(function (t) {
			return e.classList.add(t)
		}) : e.classList.add(t); else {
			var n = " " + (e.getAttribute("class") || "") + " ";
			n.indexOf(" " + t + " ") < 0 && e.setAttribute("class", (n + t).trim())
		}
	}

	function bi(e, t) {
		if (t && (t = t.trim())) if (e.classList) t.indexOf(" ") > -1 ? t.split(gi).forEach(function (t) {
			return e.classList.remove(t)
		}) : e.classList.remove(t), e.classList.length || e.removeAttribute("class"); else {
			for (var n = " " + (e.getAttribute("class") || "") + " ", r = " " + t + " "; n.indexOf(r) >= 0;) n = n.replace(r, " ");
			(n = n.trim()) ? e.setAttribute("class", n) : e.removeAttribute("class")
		}
	}

	function $i(e) {
		if (e) {
			if ("object" == typeof e) {
				var t = {};
				return !1 !== e.css && A(t, wi(e.name || "v")), A(t, e), t
			}
			return "string" == typeof e ? wi(e) : void 0
		}
	}

	var wi = g(function (e) {
			return {
				enterClass: e + "-enter",
				enterToClass: e + "-enter-to",
				enterActiveClass: e + "-enter-active",
				leaveClass: e + "-leave",
				leaveToClass: e + "-leave-to",
				leaveActiveClass: e + "-leave-active"
			}
		}), Ci = V && !W, xi = "transition", ki = "animation", Ai = "transition", Oi = "transitionend", Si = "animation",
		Ti = "animationend";
	Ci && (void 0 === window.ontransitionend && void 0 !== window.onwebkittransitionend && (Ai = "WebkitTransition", Oi = "webkitTransitionEnd"), void 0 === window.onanimationend && void 0 !== window.onwebkitanimationend && (Si = "WebkitAnimation", Ti = "webkitAnimationEnd"));
	var Ni = V ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : function (e) {
		return e()
	};

	function Ei(e) {
		Ni(function () {
			Ni(e)
		})
	}

	function ji(e, t) {
		var n = e._transitionClasses || (e._transitionClasses = []);
		n.indexOf(t) < 0 && (n.push(t), _i(e, t))
	}

	function Di(e, t) {
		e._transitionClasses && h(e._transitionClasses, t), bi(e, t)
	}

	function Li(e, t, n) {
		var r = Mi(e, t), i = r.type, o = r.timeout, a = r.propCount;
		if (!i) return n();
		var s = i === xi ? Oi : Ti, c = 0, u = function () {
			e.removeEventListener(s, l), n()
		}, l = function (t) {
			t.target === e && ++c >= a && u()
		};
		setTimeout(function () {
			c < a && u()
		}, o + 1), e.addEventListener(s, l)
	}

	var Ii = /\b(transform|all)(,|$)/;

	function Mi(e, t) {
		var n, r = window.getComputedStyle(e), i = (r[Ai + "Delay"] || "").split(", "),
			o = (r[Ai + "Duration"] || "").split(", "), a = Fi(i, o), s = (r[Si + "Delay"] || "").split(", "),
			c = (r[Si + "Duration"] || "").split(", "), u = Fi(s, c), l = 0, f = 0;
		return t === xi ? a > 0 && (n = xi, l = a, f = o.length) : t === ki ? u > 0 && (n = ki, l = u, f = c.length) : f = (n = (l = Math.max(a, u)) > 0 ? a > u ? xi : ki : null) ? n === xi ? o.length : c.length : 0, {
			type: n,
			timeout: l,
			propCount: f,
			hasTransform: n === xi && Ii.test(r[Ai + "Property"])
		}
	}

	function Fi(e, t) {
		for (; e.length < t.length;) e = e.concat(e);
		return Math.max.apply(null, t.map(function (t, n) {
			return Pi(t) + Pi(e[n])
		}))
	}

	function Pi(e) {
		return 1e3 * Number(e.slice(0, -1).replace(",", "."))
	}

	function Ri(e, r) {
		var i = e.elm;
		n(i._leaveCb) && (i._leaveCb.cancelled = !0, i._leaveCb());
		var a = $i(e.data.transition);
		if (!t(a) && !n(i._enterCb) && 1 === i.nodeType) {
			for (var s = a.css, c = a.type, u = a.enterClass, l = a.enterToClass, p = a.enterActiveClass, d = a.appearClass, v = a.appearToClass, h = a.appearActiveClass, m = a.beforeEnter, y = a.enter, g = a.afterEnter, _ = a.enterCancelled, b = a.beforeAppear, $ = a.appear, w = a.afterAppear, C = a.appearCancelled, x = a.duration, k = Zt, A = Zt.$vnode; A && A.parent;) k = A.context, A = A.parent;
			var O = !k._isMounted || !e.isRootInsert;
			if (!O || $ || "" === $) {
				var S = O && d ? d : u, T = O && h ? h : p, N = O && v ? v : l, E = O && b || m,
					j = O && "function" == typeof $ ? $ : y, L = O && w || g, I = O && C || _,
					M = f(o(x) ? x.enter : x), F = !1 !== s && !W, P = Ui(j), R = i._enterCb = D(function () {
						F && (Di(i, N), Di(i, T)), R.cancelled ? (F && Di(i, S), I && I(i)) : L && L(i), i._enterCb = null
					});
				e.data.show || ot(e, "insert", function () {
					var t = i.parentNode, n = t && t._pending && t._pending[e.key];
					n && n.tag === e.tag && n.elm._leaveCb && n.elm._leaveCb(), j && j(i, R)
				}), E && E(i), F && (ji(i, S), ji(i, T), Ei(function () {
					Di(i, S), R.cancelled || (ji(i, N), P || (Bi(M) ? setTimeout(R, M) : Li(i, c, R)))
				})), e.data.show && (r && r(), j && j(i, R)), F || P || R()
			}
		}
	}

	function Hi(e, r) {
		var i = e.elm;
		n(i._enterCb) && (i._enterCb.cancelled = !0, i._enterCb());
		var a = $i(e.data.transition);
		if (t(a) || 1 !== i.nodeType) return r();
		if (!n(i._leaveCb)) {
			var s = a.css, c = a.type, u = a.leaveClass, l = a.leaveToClass, p = a.leaveActiveClass, d = a.beforeLeave,
				v = a.leave, h = a.afterLeave, m = a.leaveCancelled, y = a.delayLeave, g = a.duration,
				_ = !1 !== s && !W, b = Ui(v), $ = f(o(g) ? g.leave : g), w = i._leaveCb = D(function () {
					i.parentNode && i.parentNode._pending && (i.parentNode._pending[e.key] = null), _ && (Di(i, l), Di(i, p)), w.cancelled ? (_ && Di(i, u), m && m(i)) : (r(), h && h(i)), i._leaveCb = null
				});
			y ? y(C) : C()
		}

		function C() {
			w.cancelled || (!e.data.show && i.parentNode && ((i.parentNode._pending || (i.parentNode._pending = {}))[e.key] = e), d && d(i), _ && (ji(i, u), ji(i, p), Ei(function () {
				Di(i, u), w.cancelled || (ji(i, l), b || (Bi($) ? setTimeout(w, $) : Li(i, c, w)))
			})), v && v(i, w), _ || b || w())
		}
	}

	function Bi(e) {
		return "number" == typeof e && !isNaN(e)
	}

	function Ui(e) {
		if (t(e)) return !1;
		var r = e.fns;
		return n(r) ? Ui(Array.isArray(r) ? r[0] : r) : (e._length || e.length) > 1
	}

	function Vi(e, t) {
		!0 !== t.data.show && Ri(t)
	}

	var zi = function (e) {
		var o, a, s = {}, c = e.modules, u = e.nodeOps;
		for (o = 0; o < ir.length; ++o) for (s[ir[o]] = [], a = 0; a < c.length; ++a) n(c[a][ir[o]]) && s[ir[o]].push(c[a][ir[o]]);

		function l(e) {
			var t = u.parentNode(e);
			n(t) && u.removeChild(t, e)
		}

		function f(e, t, i, o, a, c, l) {
			if (n(e.elm) && n(c) && (e = c[l] = me(e)), e.isRootInsert = !a, !function (e, t, i, o) {
				var a = e.data;
				if (n(a)) {
					var c = n(e.componentInstance) && a.keepAlive;
					if (n(a = a.hook) && n(a = a.init) && a(e, !1), n(e.componentInstance)) return d(e, t), v(i, e.elm, o), r(c) && function (e, t, r, i) {
						for (var o, a = e; a.componentInstance;) if (a = a.componentInstance._vnode, n(o = a.data) && n(o = o.transition)) {
							for (o = 0; o < s.activate.length; ++o) s.activate[o](rr, a);
							t.push(a);
							break
						}
						v(r, e.elm, i)
					}(e, t, i, o), !0
				}
			}(e, t, i, o)) {
				var f = e.data, p = e.children, m = e.tag;
				n(m) ? (e.elm = e.ns ? u.createElementNS(e.ns, m) : u.createElement(m, e), g(e), h(e, p, t), n(f) && y(e, t), v(i, e.elm, o)) : r(e.isComment) ? (e.elm = u.createComment(e.text), v(i, e.elm, o)) : (e.elm = u.createTextNode(e.text), v(i, e.elm, o))
			}
		}

		function d(e, t) {
			n(e.data.pendingInsert) && (t.push.apply(t, e.data.pendingInsert), e.data.pendingInsert = null), e.elm = e.componentInstance.$el, m(e) ? (y(e, t), g(e)) : (nr(e), t.push(e))
		}

		function v(e, t, r) {
			n(e) && (n(r) ? u.parentNode(r) === e && u.insertBefore(e, t, r) : u.appendChild(e, t))
		}

		function h(e, t, n) {
			if (Array.isArray(t)) for (var r = 0; r < t.length; ++r) f(t[r], n, e.elm, null, !0, t, r); else i(e.text) && u.appendChild(e.elm, u.createTextNode(String(e.text)))
		}

		function m(e) {
			for (; e.componentInstance;) e = e.componentInstance._vnode;
			return n(e.tag)
		}

		function y(e, t) {
			for (var r = 0; r < s.create.length; ++r) s.create[r](rr, e);
			n(o = e.data.hook) && (n(o.create) && o.create(rr, e), n(o.insert) && t.push(e))
		}

		function g(e) {
			var t;
			if (n(t = e.fnScopeId)) u.setStyleScope(e.elm, t); else for (var r = e; r;) n(t = r.context) && n(t = t.$options._scopeId) && u.setStyleScope(e.elm, t), r = r.parent;
			n(t = Zt) && t !== e.context && t !== e.fnContext && n(t = t.$options._scopeId) && u.setStyleScope(e.elm, t)
		}

		function _(e, t, n, r, i, o) {
			for (; r <= i; ++r) f(n[r], o, e, t, !1, n, r)
		}

		function b(e) {
			var t, r, i = e.data;
			if (n(i)) for (n(t = i.hook) && n(t = t.destroy) && t(e), t = 0; t < s.destroy.length; ++t) s.destroy[t](e);
			if (n(t = e.children)) for (r = 0; r < e.children.length; ++r) b(e.children[r])
		}

		function $(e, t, r) {
			for (; t <= r; ++t) {
				var i = e[t];
				n(i) && (n(i.tag) ? (w(i), b(i)) : l(i.elm))
			}
		}

		function w(e, t) {
			if (n(t) || n(e.data)) {
				var r, i = s.remove.length + 1;
				for (n(t) ? t.listeners += i : t = function (e, t) {
					function n() {
						0 == --n.listeners && l(e)
					}

					return n.listeners = t, n
				}(e.elm, i), n(r = e.componentInstance) && n(r = r._vnode) && n(r.data) && w(r, t), r = 0; r < s.remove.length; ++r) s.remove[r](e, t);
				n(r = e.data.hook) && n(r = r.remove) ? r(e, t) : t()
			} else l(e.elm)
		}

		function C(e, t, r, i) {
			for (var o = r; o < i; o++) {
				var a = t[o];
				if (n(a) && or(e, a)) return o
			}
		}

		function x(e, i, o, a, c, l) {
			if (e !== i) {
				n(i.elm) && n(a) && (i = a[c] = me(i));
				var p = i.elm = e.elm;
				if (r(e.isAsyncPlaceholder)) n(i.asyncFactory.resolved) ? O(e.elm, i, o) : i.isAsyncPlaceholder = !0; else if (r(i.isStatic) && r(e.isStatic) && i.key === e.key && (r(i.isCloned) || r(i.isOnce))) i.componentInstance = e.componentInstance; else {
					var d, v = i.data;
					n(v) && n(d = v.hook) && n(d = d.prepatch) && d(e, i);
					var h = e.children, y = i.children;
					if (n(v) && m(i)) {
						for (d = 0; d < s.update.length; ++d) s.update[d](e, i);
						n(d = v.hook) && n(d = d.update) && d(e, i)
					}
					t(i.text) ? n(h) && n(y) ? h !== y && function (e, r, i, o, a) {
						for (var s, c, l, p = 0, d = 0, v = r.length - 1, h = r[0], m = r[v], y = i.length - 1, g = i[0], b = i[y], w = !a; p <= v && d <= y;) t(h) ? h = r[++p] : t(m) ? m = r[--v] : or(h, g) ? (x(h, g, o, i, d), h = r[++p], g = i[++d]) : or(m, b) ? (x(m, b, o, i, y), m = r[--v], b = i[--y]) : or(h, b) ? (x(h, b, o, i, y), w && u.insertBefore(e, h.elm, u.nextSibling(m.elm)), h = r[++p], b = i[--y]) : or(m, g) ? (x(m, g, o, i, d), w && u.insertBefore(e, m.elm, h.elm), m = r[--v], g = i[++d]) : (t(s) && (s = ar(r, p, v)), t(c = n(g.key) ? s[g.key] : C(g, r, p, v)) ? f(g, o, e, h.elm, !1, i, d) : or(l = r[c], g) ? (x(l, g, o, i, d), r[c] = void 0, w && u.insertBefore(e, l.elm, h.elm)) : f(g, o, e, h.elm, !1, i, d), g = i[++d]);
						p > v ? _(e, t(i[y + 1]) ? null : i[y + 1].elm, i, d, y, o) : d > y && $(r, p, v)
					}(p, h, y, o, l) : n(y) ? (n(e.text) && u.setTextContent(p, ""), _(p, null, y, 0, y.length - 1, o)) : n(h) ? $(h, 0, h.length - 1) : n(e.text) && u.setTextContent(p, "") : e.text !== i.text && u.setTextContent(p, i.text), n(v) && n(d = v.hook) && n(d = d.postpatch) && d(e, i)
				}
			}
		}

		function k(e, t, i) {
			if (r(i) && n(e.parent)) e.parent.data.pendingInsert = t; else for (var o = 0; o < t.length; ++o) t[o].data.hook.insert(t[o])
		}

		var A = p("attrs,class,staticClass,staticStyle,key");

		function O(e, t, i, o) {
			var a, s = t.tag, c = t.data, u = t.children;
			if (o = o || c && c.pre, t.elm = e, r(t.isComment) && n(t.asyncFactory)) return t.isAsyncPlaceholder = !0, !0;
			if (n(c) && (n(a = c.hook) && n(a = a.init) && a(t, !0), n(a = t.componentInstance))) return d(t, i), !0;
			if (n(s)) {
				if (n(u)) if (e.hasChildNodes()) if (n(a = c) && n(a = a.domProps) && n(a = a.innerHTML)) {
					if (a !== e.innerHTML) return !1
				} else {
					for (var l = !0, f = e.firstChild, p = 0; p < u.length; p++) {
						if (!f || !O(f, u[p], i, o)) {
							l = !1;
							break
						}
						f = f.nextSibling
					}
					if (!l || f) return !1
				} else h(t, u, i);
				if (n(c)) {
					var v = !1;
					for (var m in c) if (!A(m)) {
						v = !0, y(t, i);
						break
					}
					!v && c.class && tt(c.class)
				}
			} else e.data !== t.text && (e.data = t.text);
			return !0
		}

		return function (e, i, o, a) {
			if (!t(i)) {
				var c, l = !1, p = [];
				if (t(e)) l = !0, f(i, p); else {
					var d = n(e.nodeType);
					if (!d && or(e, i)) x(e, i, p, null, null, a); else {
						if (d) {
							if (1 === e.nodeType && e.hasAttribute(L) && (e.removeAttribute(L), o = !0), r(o) && O(e, i, p)) return k(i, p, !0), e;
							c = e, e = new pe(u.tagName(c).toLowerCase(), {}, [], void 0, c)
						}
						var v = e.elm, h = u.parentNode(v);
						if (f(i, p, v._leaveCb ? null : h, u.nextSibling(v)), n(i.parent)) for (var y = i.parent, g = m(i); y;) {
							for (var _ = 0; _ < s.destroy.length; ++_) s.destroy[_](y);
							if (y.elm = i.elm, g) {
								for (var w = 0; w < s.create.length; ++w) s.create[w](rr, y);
								var C = y.data.hook.insert;
								if (C.merged) for (var A = 1; A < C.fns.length; A++) C.fns[A]()
							} else nr(y);
							y = y.parent
						}
						n(h) ? $([e], 0, 0) : n(e.tag) && b(e)
					}
				}
				return k(i, p, l), i.elm
			}
			n(e) && b(e)
		}
	}({
		nodeOps: er, modules: [yr, kr, ri, ai, yi, V ? {
			create: Vi, activate: Vi, remove: function (e, t) {
				!0 !== e.data.show ? Hi(e, t) : t()
			}
		} : {}].concat(dr)
	});
	W && document.addEventListener("selectionchange", function () {
		var e = document.activeElement;
		e && e.vmodel && Yi(e, "input")
	});
	var Ki = {
		inserted: function (e, t, n, r) {
			"select" === n.tag ? (r.elm && !r.elm._vOptions ? ot(n, "postpatch", function () {
				Ki.componentUpdated(e, t, n)
			}) : Ji(e, t, n.context), e._vOptions = [].map.call(e.options, Zi)) : ("textarea" === n.tag || Yn(e.type)) && (e._vModifiers = t.modifiers, t.modifiers.lazy || (e.addEventListener("compositionstart", Gi), e.addEventListener("compositionend", Xi), e.addEventListener("change", Xi), W && (e.vmodel = !0)))
		}, componentUpdated: function (e, t, n) {
			if ("select" === n.tag) {
				Ji(e, t, n.context);
				var r = e._vOptions, i = e._vOptions = [].map.call(e.options, Zi);
				if (i.some(function (e, t) {
					return !E(e, r[t])
				})) (e.multiple ? t.value.some(function (e) {
					return Wi(e, i)
				}) : t.value !== t.oldValue && Wi(t.value, i)) && Yi(e, "change")
			}
		}
	};

	function Ji(e, t, n) {
		qi(e, t, n), (q || Z) && setTimeout(function () {
			qi(e, t, n)
		}, 0)
	}

	function qi(e, t, n) {
		var r = t.value, i = e.multiple;
		if (!i || Array.isArray(r)) {
			for (var o, a, s = 0, c = e.options.length; s < c; s++) if (a = e.options[s], i) o = j(r, Zi(a)) > -1, a.selected !== o && (a.selected = o); else if (E(Zi(a), r)) return void (e.selectedIndex !== s && (e.selectedIndex = s));
			i || (e.selectedIndex = -1)
		}
	}

	function Wi(e, t) {
		return t.every(function (t) {
			return !E(t, e)
		})
	}

	function Zi(e) {
		return "_value" in e ? e._value : e.value
	}

	function Gi(e) {
		e.target.composing = !0
	}

	function Xi(e) {
		e.target.composing && (e.target.composing = !1, Yi(e.target, "input"))
	}

	function Yi(e, t) {
		var n = document.createEvent("HTMLEvents");
		n.initEvent(t, !0, !0), e.dispatchEvent(n)
	}

	function Qi(e) {
		return !e.componentInstance || e.data && e.data.transition ? e : Qi(e.componentInstance._vnode)
	}

	var eo = {
		model: Ki, show: {
			bind: function (e, t, n) {
				var r = t.value, i = (n = Qi(n)).data && n.data.transition,
					o = e.__vOriginalDisplay = "none" === e.style.display ? "" : e.style.display;
				r && i ? (n.data.show = !0, Ri(n, function () {
					e.style.display = o
				})) : e.style.display = r ? o : "none"
			}, update: function (e, t, n) {
				var r = t.value;
				!r != !t.oldValue && ((n = Qi(n)).data && n.data.transition ? (n.data.show = !0, r ? Ri(n, function () {
					e.style.display = e.__vOriginalDisplay
				}) : Hi(n, function () {
					e.style.display = "none"
				})) : e.style.display = r ? e.__vOriginalDisplay : "none")
			}, unbind: function (e, t, n, r, i) {
				i || (e.style.display = e.__vOriginalDisplay)
			}
		}
	}, to = {
		name: String,
		appear: Boolean,
		css: Boolean,
		mode: String,
		type: String,
		enterClass: String,
		leaveClass: String,
		enterToClass: String,
		leaveToClass: String,
		enterActiveClass: String,
		leaveActiveClass: String,
		appearClass: String,
		appearActiveClass: String,
		appearToClass: String,
		duration: [Number, String, Object]
	};

	function no(e) {
		var t = e && e.componentOptions;
		return t && t.Ctor.options.abstract ? no(zt(t.children)) : e
	}

	function ro(e) {
		var t = {}, n = e.$options;
		for (var r in n.propsData) t[r] = e[r];
		var i = n._parentListeners;
		for (var o in i) t[b(o)] = i[o];
		return t
	}

	function io(e, t) {
		if (/\d-keep-alive$/.test(t.tag)) return e("keep-alive", {props: t.componentOptions.propsData})
	}

	var oo = function (e) {
		return e.tag || pt(e)
	}, ao = function (e) {
		return "show" === e.name
	}, so = {
		name: "transition", props: to, abstract: !0, render: function (e) {
			var t = this, n = this.$slots.default;
			if (n && (n = n.filter(oo)).length) {
				var r = this.mode, o = n[0];
				if (function (e) {
					for (; e = e.parent;) if (e.data.transition) return !0
				}(this.$vnode)) return o;
				var a = no(o);
				if (!a) return o;
				if (this._leaving) return io(e, o);
				var s = "__transition-" + this._uid + "-";
				a.key = null == a.key ? a.isComment ? s + "comment" : s + a.tag : i(a.key) ? 0 === String(a.key).indexOf(s) ? a.key : s + a.key : a.key;
				var c = (a.data || (a.data = {})).transition = ro(this), u = this._vnode, l = no(u);
				if (a.data.directives && a.data.directives.some(ao) && (a.data.show = !0), l && l.data && !function (e, t) {
					return t.key === e.key && t.tag === e.tag
				}(a, l) && !pt(l) && (!l.componentInstance || !l.componentInstance._vnode.isComment)) {
					var f = l.data.transition = A({}, c);
					if ("out-in" === r) return this._leaving = !0, ot(f, "afterLeave", function () {
						t._leaving = !1, t.$forceUpdate()
					}), io(e, o);
					if ("in-out" === r) {
						if (pt(a)) return u;
						var p, d = function () {
							p()
						};
						ot(c, "afterEnter", d), ot(c, "enterCancelled", d), ot(f, "delayLeave", function (e) {
							p = e
						})
					}
				}
				return o
			}
		}
	}, co = A({tag: String, moveClass: String}, to);

	function uo(e) {
		e.elm._moveCb && e.elm._moveCb(), e.elm._enterCb && e.elm._enterCb()
	}

	function lo(e) {
		e.data.newPos = e.elm.getBoundingClientRect()
	}

	function fo(e) {
		var t = e.data.pos, n = e.data.newPos, r = t.left - n.left, i = t.top - n.top;
		if (r || i) {
			e.data.moved = !0;
			var o = e.elm.style;
			o.transform = o.WebkitTransform = "translate(" + r + "px," + i + "px)", o.transitionDuration = "0s"
		}
	}

	delete co.mode;
	var po = {
		Transition: so, TransitionGroup: {
			props: co, beforeMount: function () {
				var e = this, t = this._update;
				this._update = function (n, r) {
					var i = Gt(e);
					e.__patch__(e._vnode, e.kept, !1, !0), e._vnode = e.kept, i(), t.call(e, n, r)
				}
			}, render: function (e) {
				for (var t = this.tag || this.$vnode.data.tag || "span", n = Object.create(null), r = this.prevChildren = this.children, i = this.$slots.default || [], o = this.children = [], a = ro(this), s = 0; s < i.length; s++) {
					var c = i[s];
					c.tag && null != c.key && 0 !== String(c.key).indexOf("__vlist") && (o.push(c), n[c.key] = c, (c.data || (c.data = {})).transition = a)
				}
				if (r) {
					for (var u = [], l = [], f = 0; f < r.length; f++) {
						var p = r[f];
						p.data.transition = a, p.data.pos = p.elm.getBoundingClientRect(), n[p.key] ? u.push(p) : l.push(p)
					}
					this.kept = e(t, null, u), this.removed = l
				}
				return e(t, null, o)
			}, updated: function () {
				var e = this.prevChildren, t = this.moveClass || (this.name || "v") + "-move";
				e.length && this.hasMove(e[0].elm, t) && (e.forEach(uo), e.forEach(lo), e.forEach(fo), this._reflow = document.body.offsetHeight, e.forEach(function (e) {
					if (e.data.moved) {
						var n = e.elm, r = n.style;
						ji(n, t), r.transform = r.WebkitTransform = r.transitionDuration = "", n.addEventListener(Oi, n._moveCb = function e(r) {
							r && r.target !== n || r && !/transform$/.test(r.propertyName) || (n.removeEventListener(Oi, e), n._moveCb = null, Di(n, t))
						})
					}
				}))
			}, methods: {
				hasMove: function (e, t) {
					if (!Ci) return !1;
					if (this._hasMove) return this._hasMove;
					var n = e.cloneNode();
					e._transitionClasses && e._transitionClasses.forEach(function (e) {
						bi(n, e)
					}), _i(n, t), n.style.display = "none", this.$el.appendChild(n);
					var r = Mi(n);
					return this.$el.removeChild(n), this._hasMove = r.hasTransform
				}
			}
		}
	};
	Cn.config.mustUseProp = Dn, Cn.config.isReservedTag = Zn, Cn.config.isReservedAttr = En, Cn.config.getTagNamespace = Gn, Cn.config.isUnknownElement = function (e) {
		if (!V) return !0;
		if (Zn(e)) return !1;
		if (e = e.toLowerCase(), null != Xn[e]) return Xn[e];
		var t = document.createElement(e);
		return e.indexOf("-") > -1 ? Xn[e] = t.constructor === window.HTMLUnknownElement || t.constructor === window.HTMLElement : Xn[e] = /HTMLUnknownElement/.test(t.toString())
	}, A(Cn.options.directives, eo), A(Cn.options.components, po), Cn.prototype.__patch__ = V ? zi : S, Cn.prototype.$mount = function (e, t) {
		return function (e, t, n) {
			var r;
			return e.$el = t, e.$options.render || (e.$options.render = ve), Qt(e, "beforeMount"), r = function () {
				e._update(e._render(), n)
			}, new pn(e, r, S, {
				before: function () {
					e._isMounted && !e._isDestroyed && Qt(e, "beforeUpdate")
				}
			}, !0), n = !1, null == e.$vnode && (e._isMounted = !0, Qt(e, "mounted")), e
		}(this, e = e && V ? Qn(e) : void 0, t)
	}, V && setTimeout(function () {
		F.devtools && ne && ne.emit("init", Cn)
	}, 0);
	var vo = /\{\{((?:.|\r?\n)+?)\}\}/g, ho = /[-.*+?^${}()|[\]\/\\]/g, mo = g(function (e) {
		var t = e[0].replace(ho, "\\$&"), n = e[1].replace(ho, "\\$&");
		return new RegExp(t + "((?:.|\\n)+?)" + n, "g")
	});
	var yo = {
		staticKeys: ["staticClass"], transformNode: function (e, t) {
			t.warn;
			var n = Pr(e, "class");
			n && (e.staticClass = JSON.stringify(n));
			var r = Fr(e, "class", !1);
			r && (e.classBinding = r)
		}, genData: function (e) {
			var t = "";
			return e.staticClass && (t += "staticClass:" + e.staticClass + ","), e.classBinding && (t += "class:" + e.classBinding + ","), t
		}
	};
	var go, _o = {
			staticKeys: ["staticStyle"], transformNode: function (e, t) {
				t.warn;
				var n = Pr(e, "style");
				n && (e.staticStyle = JSON.stringify(si(n)));
				var r = Fr(e, "style", !1);
				r && (e.styleBinding = r)
			}, genData: function (e) {
				var t = "";
				return e.staticStyle && (t += "staticStyle:" + e.staticStyle + ","), e.styleBinding && (t += "style:(" + e.styleBinding + "),"), t
			}
		}, bo = function (e) {
			return (go = go || document.createElement("div")).innerHTML = e, go.textContent
		}, $o = p("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"),
		wo = p("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),
		Co = p("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"),
		xo = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,
		ko = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,
		Ao = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + P.source + "]*", Oo = "((?:" + Ao + "\\:)?" + Ao + ")",
		So = new RegExp("^<" + Oo), To = /^\s*(\/?)>/, No = new RegExp("^<\\/" + Oo + "[^>]*>"),
		Eo = /^<!DOCTYPE [^>]+>/i, jo = /^<!\--/, Do = /^<!\[/, Lo = p("script,style,textarea", !0), Io = {},
		Mo = {"&lt;": "<", "&gt;": ">", "&quot;": '"', "&amp;": "&", "&#10;": "\n", "&#9;": "\t", "&#39;": "'"},
		Fo = /&(?:lt|gt|quot|amp|#39);/g, Po = /&(?:lt|gt|quot|amp|#39|#10|#9);/g, Ro = p("pre,textarea", !0),
		Ho = function (e, t) {
			return e && Ro(e) && "\n" === t[0]
		};

	function Bo(e, t) {
		var n = t ? Po : Fo;
		return e.replace(n, function (e) {
			return Mo[e]
		})
	}

	var Uo, Vo, zo, Ko, Jo, qo, Wo, Zo, Go = /^@|^v-on:/, Xo = /^v-|^@|^:|^#/,
		Yo = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, Qo = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, ea = /^\(|\)$/g,
		ta = /^\[.*\]$/, na = /:(.*)$/, ra = /^:|^\.|^v-bind:/, ia = /\.[^.\]]+(?=[^\]]*$)/g, oa = /^v-slot(:|$)|^#/,
		aa = /[\r\n]/, sa = /[ \f\t\r\n]+/g, ca = g(bo), ua = "_empty_";

	function la(e, t, n) {
		return {type: 1, tag: e, attrsList: t, attrsMap: ya(t), rawAttrsMap: {}, parent: n, children: []}
	}

	function fa(e, t) {
		Uo = t.warn || Tr, qo = t.isPreTag || T, Wo = t.mustUseProp || T, Zo = t.getTagNamespace || T;
		t.isReservedTag;
		zo = Nr(t.modules, "transformNode"), Ko = Nr(t.modules, "preTransformNode"), Jo = Nr(t.modules, "postTransformNode"), Vo = t.delimiters;
		var n, r, i = [], o = !1 !== t.preserveWhitespace, a = t.whitespace, s = !1, c = !1;

		function u(e) {
			if (l(e), s || e.processed || (e = pa(e, t)), i.length || e === n || n.if && (e.elseif || e.else) && va(n, {
				exp: e.elseif,
				block: e
			}), r && !e.forbidden) if (e.elseif || e.else) a = e, (u = function (e) {
				var t = e.length;
				for (; t--;) {
					if (1 === e[t].type) return e[t];
					e.pop()
				}
			}(r.children)) && u.if && va(u, {exp: a.elseif, block: a}); else {
				if (e.slotScope) {
					var o = e.slotTarget || '"default"';
					(r.scopedSlots || (r.scopedSlots = {}))[o] = e
				}
				r.children.push(e), e.parent = r
			}
			var a, u;
			e.children = e.children.filter(function (e) {
				return !e.slotScope
			}), l(e), e.pre && (s = !1), qo(e.tag) && (c = !1);
			for (var f = 0; f < Jo.length; f++) Jo[f](e, t)
		}

		function l(e) {
			if (!c) for (var t; (t = e.children[e.children.length - 1]) && 3 === t.type && " " === t.text;) e.children.pop()
		}

		return function (e, t) {
			for (var n, r, i = [], o = t.expectHTML, a = t.isUnaryTag || T, s = t.canBeLeftOpenTag || T, c = 0; e;) {
				if (n = e, r && Lo(r)) {
					var u = 0, l = r.toLowerCase(),
						f = Io[l] || (Io[l] = new RegExp("([\\s\\S]*?)(</" + l + "[^>]*>)", "i")),
						p = e.replace(f, function (e, n, r) {
							return u = r.length, Lo(l) || "noscript" === l || (n = n.replace(/<!\--([\s\S]*?)-->/g, "$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g, "$1")), Ho(l, n) && (n = n.slice(1)), t.chars && t.chars(n), ""
						});
					c += e.length - p.length, e = p, A(l, c - u, c)
				} else {
					var d = e.indexOf("<");
					if (0 === d) {
						if (jo.test(e)) {
							var v = e.indexOf("--\x3e");
							if (v >= 0) {
								t.shouldKeepComment && t.comment(e.substring(4, v), c, c + v + 3), C(v + 3);
								continue
							}
						}
						if (Do.test(e)) {
							var h = e.indexOf("]>");
							if (h >= 0) {
								C(h + 2);
								continue
							}
						}
						var m = e.match(Eo);
						if (m) {
							C(m[0].length);
							continue
						}
						var y = e.match(No);
						if (y) {
							var g = c;
							C(y[0].length), A(y[1], g, c);
							continue
						}
						var _ = x();
						if (_) {
							k(_), Ho(_.tagName, e) && C(1);
							continue
						}
					}
					var b = void 0, $ = void 0, w = void 0;
					if (d >= 0) {
						for ($ = e.slice(d); !(No.test($) || So.test($) || jo.test($) || Do.test($) || (w = $.indexOf("<", 1)) < 0);) d += w, $ = e.slice(d);
						b = e.substring(0, d)
					}
					d < 0 && (b = e), b && C(b.length), t.chars && b && t.chars(b, c - b.length, c)
				}
				if (e === n) {
					t.chars && t.chars(e);
					break
				}
			}

			function C(t) {
				c += t, e = e.substring(t)
			}

			function x() {
				var t = e.match(So);
				if (t) {
					var n, r, i = {tagName: t[1], attrs: [], start: c};
					for (C(t[0].length); !(n = e.match(To)) && (r = e.match(ko) || e.match(xo));) r.start = c, C(r[0].length), r.end = c, i.attrs.push(r);
					if (n) return i.unarySlash = n[1], C(n[0].length), i.end = c, i
				}
			}

			function k(e) {
				var n = e.tagName, c = e.unarySlash;
				o && ("p" === r && Co(n) && A(r), s(n) && r === n && A(n));
				for (var u = a(n) || !!c, l = e.attrs.length, f = new Array(l), p = 0; p < l; p++) {
					var d = e.attrs[p], v = d[3] || d[4] || d[5] || "",
						h = "a" === n && "href" === d[1] ? t.shouldDecodeNewlinesForHref : t.shouldDecodeNewlines;
					f[p] = {name: d[1], value: Bo(v, h)}
				}
				u || (i.push({
					tag: n,
					lowerCasedTag: n.toLowerCase(),
					attrs: f,
					start: e.start,
					end: e.end
				}), r = n), t.start && t.start(n, f, u, e.start, e.end)
			}

			function A(e, n, o) {
				var a, s;
				if (null == n && (n = c), null == o && (o = c), e) for (s = e.toLowerCase(), a = i.length - 1; a >= 0 && i[a].lowerCasedTag !== s; a--) ; else a = 0;
				if (a >= 0) {
					for (var u = i.length - 1; u >= a; u--) t.end && t.end(i[u].tag, n, o);
					i.length = a, r = a && i[a - 1].tag
				} else "br" === s ? t.start && t.start(e, [], !0, n, o) : "p" === s && (t.start && t.start(e, [], !1, n, o), t.end && t.end(e, n, o))
			}

			A()
		}(e, {
			warn: Uo,
			expectHTML: t.expectHTML,
			isUnaryTag: t.isUnaryTag,
			canBeLeftOpenTag: t.canBeLeftOpenTag,
			shouldDecodeNewlines: t.shouldDecodeNewlines,
			shouldDecodeNewlinesForHref: t.shouldDecodeNewlinesForHref,
			shouldKeepComment: t.comments,
			outputSourceRange: t.outputSourceRange,
			start: function (e, o, a, l, f) {
				var p = r && r.ns || Zo(e);
				q && "svg" === p && (o = function (e) {
					for (var t = [], n = 0; n < e.length; n++) {
						var r = e[n];
						ga.test(r.name) || (r.name = r.name.replace(_a, ""), t.push(r))
					}
					return t
				}(o));
				var d, v = la(e, o, r);
				p && (v.ns = p), "style" !== (d = v).tag && ("script" !== d.tag || d.attrsMap.type && "text/javascript" !== d.attrsMap.type) || te() || (v.forbidden = !0);
				for (var h = 0; h < Ko.length; h++) v = Ko[h](v, t) || v;
				s || (!function (e) {
					null != Pr(e, "v-pre") && (e.pre = !0)
				}(v), v.pre && (s = !0)), qo(v.tag) && (c = !0), s ? function (e) {
					var t = e.attrsList, n = t.length;
					if (n) for (var r = e.attrs = new Array(n), i = 0; i < n; i++) r[i] = {
						name: t[i].name,
						value: JSON.stringify(t[i].value)
					}, null != t[i].start && (r[i].start = t[i].start, r[i].end = t[i].end); else e.pre || (e.plain = !0)
				}(v) : v.processed || (da(v), function (e) {
					var t = Pr(e, "v-if");
					if (t) e.if = t, va(e, {exp: t, block: e}); else {
						null != Pr(e, "v-else") && (e.else = !0);
						var n = Pr(e, "v-else-if");
						n && (e.elseif = n)
					}
				}(v), function (e) {
					null != Pr(e, "v-once") && (e.once = !0)
				}(v)), n || (n = v), a ? u(v) : (r = v, i.push(v))
			},
			end: function (e, t, n) {
				var o = i[i.length - 1];
				i.length -= 1, r = i[i.length - 1], u(o)
			},
			chars: function (e, t, n) {
				if (r && (!q || "textarea" !== r.tag || r.attrsMap.placeholder !== e)) {
					var i, u, l, f = r.children;
					if (e = c || e.trim() ? "script" === (i = r).tag || "style" === i.tag ? e : ca(e) : f.length ? a ? "condense" === a && aa.test(e) ? "" : " " : o ? " " : "" : "") c || "condense" !== a || (e = e.replace(sa, " ")), !s && " " !== e && (u = function (e, t) {
						var n = t ? mo(t) : vo;
						if (n.test(e)) {
							for (var r, i, o, a = [], s = [], c = n.lastIndex = 0; r = n.exec(e);) {
								(i = r.index) > c && (s.push(o = e.slice(c, i)), a.push(JSON.stringify(o)));
								var u = Or(r[1].trim());
								a.push("_s(" + u + ")"), s.push({"@binding": u}), c = i + r[0].length
							}
							return c < e.length && (s.push(o = e.slice(c)), a.push(JSON.stringify(o))), {
								expression: a.join("+"),
								tokens: s
							}
						}
					}(e, Vo)) ? l = {
						type: 2,
						expression: u.expression,
						tokens: u.tokens,
						text: e
					} : " " === e && f.length && " " === f[f.length - 1].text || (l = {
						type: 3,
						text: e
					}), l && f.push(l)
				}
			},
			comment: function (e, t, n) {
				if (r) {
					var i = {type: 3, text: e, isComment: !0};
					r.children.push(i)
				}
			}
		}), n
	}

	function pa(e, t) {
		var n, r;
		(r = Fr(n = e, "key")) && (n.key = r), e.plain = !e.key && !e.scopedSlots && !e.attrsList.length, function (e) {
			var t = Fr(e, "ref");
			t && (e.ref = t, e.refInFor = function (e) {
				var t = e;
				for (; t;) {
					if (void 0 !== t.for) return !0;
					t = t.parent
				}
				return !1
			}(e))
		}(e), function (e) {
			var t;
			"template" === e.tag ? (t = Pr(e, "scope"), e.slotScope = t || Pr(e, "slot-scope")) : (t = Pr(e, "slot-scope")) && (e.slotScope = t);
			var n = Fr(e, "slot");
			n && (e.slotTarget = '""' === n ? '"default"' : n, e.slotTargetDynamic = !(!e.attrsMap[":slot"] && !e.attrsMap["v-bind:slot"]), "template" === e.tag || e.slotScope || jr(e, "slot", n, function (e, t) {
				return e.rawAttrsMap[":" + t] || e.rawAttrsMap["v-bind:" + t] || e.rawAttrsMap[t]
			}(e, "slot")));
			if ("template" === e.tag) {
				var r = Rr(e, oa);
				if (r) {
					var i = ha(r), o = i.name, a = i.dynamic;
					e.slotTarget = o, e.slotTargetDynamic = a, e.slotScope = r.value || ua
				}
			} else {
				var s = Rr(e, oa);
				if (s) {
					var c = e.scopedSlots || (e.scopedSlots = {}), u = ha(s), l = u.name, f = u.dynamic,
						p = c[l] = la("template", [], e);
					p.slotTarget = l, p.slotTargetDynamic = f, p.children = e.children.filter(function (e) {
						if (!e.slotScope) return e.parent = p, !0
					}), p.slotScope = s.value || ua, e.children = [], e.plain = !1
				}
			}
		}(e), function (e) {
			"slot" === e.tag && (e.slotName = Fr(e, "name"))
		}(e), function (e) {
			var t;
			(t = Fr(e, "is")) && (e.component = t);
			null != Pr(e, "inline-template") && (e.inlineTemplate = !0)
		}(e);
		for (var i = 0; i < zo.length; i++) e = zo[i](e, t) || e;
		return function (e) {
			var t, n, r, i, o, a, s, c, u = e.attrsList;
			for (t = 0, n = u.length; t < n; t++) if (r = i = u[t].name, o = u[t].value, Xo.test(r)) if (e.hasBindings = !0, (a = ma(r.replace(Xo, ""))) && (r = r.replace(ia, "")), ra.test(r)) r = r.replace(ra, ""), o = Or(o), (c = ta.test(r)) && (r = r.slice(1, -1)), a && (a.prop && !c && "innerHtml" === (r = b(r)) && (r = "innerHTML"), a.camel && !c && (r = b(r)), a.sync && (s = Ur(o, "$event"), c ? Mr(e, '"update:"+(' + r + ")", s, null, !1, 0, u[t], !0) : (Mr(e, "update:" + b(r), s, null, !1, 0, u[t]), C(r) !== b(r) && Mr(e, "update:" + C(r), s, null, !1, 0, u[t])))), a && a.prop || !e.component && Wo(e.tag, e.attrsMap.type, r) ? Er(e, r, o, u[t], c) : jr(e, r, o, u[t], c); else if (Go.test(r)) r = r.replace(Go, ""), (c = ta.test(r)) && (r = r.slice(1, -1)), Mr(e, r, o, a, !1, 0, u[t], c); else {
				var l = (r = r.replace(Xo, "")).match(na), f = l && l[1];
				c = !1, f && (r = r.slice(0, -(f.length + 1)), ta.test(f) && (f = f.slice(1, -1), c = !0)), Lr(e, r, i, o, f, c, a, u[t])
			} else jr(e, r, JSON.stringify(o), u[t]), !e.component && "muted" === r && Wo(e.tag, e.attrsMap.type, r) && Er(e, r, "true", u[t])
		}(e), e
	}

	function da(e) {
		var t;
		if (t = Pr(e, "v-for")) {
			var n = function (e) {
				var t = e.match(Yo);
				if (!t) return;
				var n = {};
				n.for = t[2].trim();
				var r = t[1].trim().replace(ea, ""), i = r.match(Qo);
				i ? (n.alias = r.replace(Qo, "").trim(), n.iterator1 = i[1].trim(), i[2] && (n.iterator2 = i[2].trim())) : n.alias = r;
				return n
			}(t);
			n && A(e, n)
		}
	}

	function va(e, t) {
		e.ifConditions || (e.ifConditions = []), e.ifConditions.push(t)
	}

	function ha(e) {
		var t = e.name.replace(oa, "");
		return t || "#" !== e.name[0] && (t = "default"), ta.test(t) ? {
			name: t.slice(1, -1),
			dynamic: !0
		} : {name: '"' + t + '"', dynamic: !1}
	}

	function ma(e) {
		var t = e.match(ia);
		if (t) {
			var n = {};
			return t.forEach(function (e) {
				n[e.slice(1)] = !0
			}), n
		}
	}

	function ya(e) {
		for (var t = {}, n = 0, r = e.length; n < r; n++) t[e[n].name] = e[n].value;
		return t
	}

	var ga = /^xmlns:NS\d+/, _a = /^NS\d+:/;

	function ba(e) {
		return la(e.tag, e.attrsList.slice(), e.parent)
	}

	var $a = [yo, _o, {
		preTransformNode: function (e, t) {
			if ("input" === e.tag) {
				var n, r = e.attrsMap;
				if (!r["v-model"]) return;
				if ((r[":type"] || r["v-bind:type"]) && (n = Fr(e, "type")), r.type || n || !r["v-bind"] || (n = "(" + r["v-bind"] + ").type"), n) {
					var i = Pr(e, "v-if", !0), o = i ? "&&(" + i + ")" : "", a = null != Pr(e, "v-else", !0),
						s = Pr(e, "v-else-if", !0), c = ba(e);
					da(c), Dr(c, "type", "checkbox"), pa(c, t), c.processed = !0, c.if = "(" + n + ")==='checkbox'" + o, va(c, {
						exp: c.if,
						block: c
					});
					var u = ba(e);
					Pr(u, "v-for", !0), Dr(u, "type", "radio"), pa(u, t), va(c, {
						exp: "(" + n + ")==='radio'" + o,
						block: u
					});
					var l = ba(e);
					return Pr(l, "v-for", !0), Dr(l, ":type", n), pa(l, t), va(c, {
						exp: i,
						block: l
					}), a ? c.else = !0 : s && (c.elseif = s), c
				}
			}
		}
	}];
	var wa, Ca, xa = {
		expectHTML: !0,
		modules: $a,
		directives: {
			model: function (e, t, n) {
				var r = t.value, i = t.modifiers, o = e.tag, a = e.attrsMap.type;
				if (e.component) return Br(e, r, i), !1;
				if ("select" === o) !function (e, t, n) {
					var r = 'var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return ' + (n && n.number ? "_n(val)" : "val") + "});";
					r = r + " " + Ur(t, "$event.target.multiple ? $$selectedVal : $$selectedVal[0]"), Mr(e, "change", r, null, !0)
				}(e, r, i); else if ("input" === o && "checkbox" === a) !function (e, t, n) {
					var r = n && n.number, i = Fr(e, "value") || "null", o = Fr(e, "true-value") || "true",
						a = Fr(e, "false-value") || "false";
					Er(e, "checked", "Array.isArray(" + t + ")?_i(" + t + "," + i + ")>-1" + ("true" === o ? ":(" + t + ")" : ":_q(" + t + "," + o + ")")), Mr(e, "change", "var $$a=" + t + ",$$el=$event.target,$$c=$$el.checked?(" + o + "):(" + a + ");if(Array.isArray($$a)){var $$v=" + (r ? "_n(" + i + ")" : i) + ",$$i=_i($$a,$$v);if($$el.checked){$$i<0&&(" + Ur(t, "$$a.concat([$$v])") + ")}else{$$i>-1&&(" + Ur(t, "$$a.slice(0,$$i).concat($$a.slice($$i+1))") + ")}}else{" + Ur(t, "$$c") + "}", null, !0)
				}(e, r, i); else if ("input" === o && "radio" === a) !function (e, t, n) {
					var r = n && n.number, i = Fr(e, "value") || "null";
					Er(e, "checked", "_q(" + t + "," + (i = r ? "_n(" + i + ")" : i) + ")"), Mr(e, "change", Ur(t, i), null, !0)
				}(e, r, i); else if ("input" === o || "textarea" === o) !function (e, t, n) {
					var r = e.attrsMap.type, i = n || {}, o = i.lazy, a = i.number, s = i.trim, c = !o && "range" !== r,
						u = o ? "change" : "range" === r ? Zr : "input", l = "$event.target.value";
					s && (l = "$event.target.value.trim()"), a && (l = "_n(" + l + ")");
					var f = Ur(t, l);
					c && (f = "if($event.target.composing)return;" + f), Er(e, "value", "(" + t + ")"), Mr(e, u, f, null, !0), (s || a) && Mr(e, "blur", "$forceUpdate()")
				}(e, r, i); else if (!F.isReservedTag(o)) return Br(e, r, i), !1;
				return !0
			}, text: function (e, t) {
				t.value && Er(e, "textContent", "_s(" + t.value + ")", t)
			}, html: function (e, t) {
				t.value && Er(e, "innerHTML", "_s(" + t.value + ")", t)
			}
		},
		isPreTag: function (e) {
			return "pre" === e
		},
		isUnaryTag: $o,
		mustUseProp: Dn,
		canBeLeftOpenTag: wo,
		isReservedTag: Zn,
		getTagNamespace: Gn,
		staticKeys: function (e) {
			return e.reduce(function (e, t) {
				return e.concat(t.staticKeys || [])
			}, []).join(",")
		}($a)
	}, ka = g(function (e) {
		return p("type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap" + (e ? "," + e : ""))
	});

	function Aa(e, t) {
		e && (wa = ka(t.staticKeys || ""), Ca = t.isReservedTag || T, function e(t) {
			t.static = function (e) {
				if (2 === e.type) return !1;
				if (3 === e.type) return !0;
				return !(!e.pre && (e.hasBindings || e.if || e.for || d(e.tag) || !Ca(e.tag) || function (e) {
					for (; e.parent;) {
						if ("template" !== (e = e.parent).tag) return !1;
						if (e.for) return !0
					}
					return !1
				}(e) || !Object.keys(e).every(wa)))
			}(t);
			if (1 === t.type) {
				if (!Ca(t.tag) && "slot" !== t.tag && null == t.attrsMap["inline-template"]) return;
				for (var n = 0, r = t.children.length; n < r; n++) {
					var i = t.children[n];
					e(i), i.static || (t.static = !1)
				}
				if (t.ifConditions) for (var o = 1, a = t.ifConditions.length; o < a; o++) {
					var s = t.ifConditions[o].block;
					e(s), s.static || (t.static = !1)
				}
			}
		}(e), function e(t, n) {
			if (1 === t.type) {
				if ((t.static || t.once) && (t.staticInFor = n), t.static && t.children.length && (1 !== t.children.length || 3 !== t.children[0].type)) return void (t.staticRoot = !0);
				if (t.staticRoot = !1, t.children) for (var r = 0, i = t.children.length; r < i; r++) e(t.children[r], n || !!t.for);
				if (t.ifConditions) for (var o = 1, a = t.ifConditions.length; o < a; o++) e(t.ifConditions[o].block, n)
			}
		}(e, !1))
	}

	var Oa = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/, Sa = /\([^)]*?\);*$/,
		Ta = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/,
		Na = {esc: 27, tab: 9, enter: 13, space: 32, up: 38, left: 37, right: 39, down: 40, delete: [8, 46]}, Ea = {
			esc: ["Esc", "Escape"],
			tab: "Tab",
			enter: "Enter",
			space: [" ", "Spacebar"],
			up: ["Up", "ArrowUp"],
			left: ["Left", "ArrowLeft"],
			right: ["Right", "ArrowRight"],
			down: ["Down", "ArrowDown"],
			delete: ["Backspace", "Delete", "Del"]
		}, ja = function (e) {
			return "if(" + e + ")return null;"
		}, Da = {
			stop: "$event.stopPropagation();",
			prevent: "$event.preventDefault();",
			self: ja("$event.target !== $event.currentTarget"),
			ctrl: ja("!$event.ctrlKey"),
			shift: ja("!$event.shiftKey"),
			alt: ja("!$event.altKey"),
			meta: ja("!$event.metaKey"),
			left: ja("'button' in $event && $event.button !== 0"),
			middle: ja("'button' in $event && $event.button !== 1"),
			right: ja("'button' in $event && $event.button !== 2")
		};

	function La(e, t) {
		var n = t ? "nativeOn:" : "on:", r = "", i = "";
		for (var o in e) {
			var a = Ia(e[o]);
			e[o] && e[o].dynamic ? i += o + "," + a + "," : r += '"' + o + '":' + a + ","
		}
		return r = "{" + r.slice(0, -1) + "}", i ? n + "_d(" + r + ",[" + i.slice(0, -1) + "])" : n + r
	}

	function Ia(e) {
		if (!e) return "function(){}";
		if (Array.isArray(e)) return "[" + e.map(function (e) {
			return Ia(e)
		}).join(",") + "]";
		var t = Ta.test(e.value), n = Oa.test(e.value), r = Ta.test(e.value.replace(Sa, ""));
		if (e.modifiers) {
			var i = "", o = "", a = [];
			for (var s in e.modifiers) if (Da[s]) o += Da[s], Na[s] && a.push(s); else if ("exact" === s) {
				var c = e.modifiers;
				o += ja(["ctrl", "shift", "alt", "meta"].filter(function (e) {
					return !c[e]
				}).map(function (e) {
					return "$event." + e + "Key"
				}).join("||"))
			} else a.push(s);
			return a.length && (i += function (e) {
				return "if(!$event.type.indexOf('key')&&" + e.map(Ma).join("&&") + ")return null;"
			}(a)), o && (i += o), "function($event){" + i + (t ? "return " + e.value + ".apply(null, arguments)" : n ? "return (" + e.value + ").apply(null, arguments)" : r ? "return " + e.value : e.value) + "}"
		}
		return t || n ? e.value : "function($event){" + (r ? "return " + e.value : e.value) + "}"
	}

	function Ma(e) {
		var t = parseInt(e, 10);
		if (t) return "$event.keyCode!==" + t;
		var n = Na[e], r = Ea[e];
		return "_k($event.keyCode," + JSON.stringify(e) + "," + JSON.stringify(n) + ",$event.key," + JSON.stringify(r) + ")"
	}

	var Fa = {
		on: function (e, t) {
			e.wrapListeners = function (e) {
				return "_g(" + e + "," + t.value + ")"
			}
		}, bind: function (e, t) {
			e.wrapData = function (n) {
				return "_b(" + n + ",'" + e.tag + "'," + t.value + "," + (t.modifiers && t.modifiers.prop ? "true" : "false") + (t.modifiers && t.modifiers.sync ? ",true" : "") + ")"
			}
		}, cloak: S
	}, Pa = function (e) {
		this.options = e, this.warn = e.warn || Tr, this.transforms = Nr(e.modules, "transformCode"), this.dataGenFns = Nr(e.modules, "genData"), this.directives = A(A({}, Fa), e.directives);
		var t = e.isReservedTag || T;
		this.maybeComponent = function (e) {
			return !!e.component || !t(e.tag)
		}, this.onceId = 0, this.staticRenderFns = [], this.pre = !1
	};

	function Ra(e, t) {
		var n = new Pa(t);
		return {
			render: "with(this){return " + (e ? "script" === e.tag ? "null" : Ha(e, n) : '_c("div")') + "}",
			staticRenderFns: n.staticRenderFns
		}
	}

	function Ha(e, t) {
		if (e.parent && (e.pre = e.pre || e.parent.pre), e.staticRoot && !e.staticProcessed) return Ba(e, t);
		if (e.once && !e.onceProcessed) return Ua(e, t);
		if (e.for && !e.forProcessed) return za(e, t);
		if (e.if && !e.ifProcessed) return Va(e, t);
		if ("template" !== e.tag || e.slotTarget || t.pre) {
			if ("slot" === e.tag) return function (e, t) {
				var n = e.slotName || '"default"', r = Wa(e, t),
					i = "_t(" + n + (r ? ",function(){return " + r + "}" : ""),
					o = e.attrs || e.dynamicAttrs ? Xa((e.attrs || []).concat(e.dynamicAttrs || []).map(function (e) {
						return {name: b(e.name), value: e.value, dynamic: e.dynamic}
					})) : null, a = e.attrsMap["v-bind"];
				!o && !a || r || (i += ",null");
				o && (i += "," + o);
				a && (i += (o ? "" : ",null") + "," + a);
				return i + ")"
			}(e, t);
			var n;
			if (e.component) n = function (e, t, n) {
				var r = t.inlineTemplate ? null : Wa(t, n, !0);
				return "_c(" + e + "," + Ka(t, n) + (r ? "," + r : "") + ")"
			}(e.component, e, t); else {
				var r;
				(!e.plain || e.pre && t.maybeComponent(e)) && (r = Ka(e, t));
				var i = e.inlineTemplate ? null : Wa(e, t, !0);
				n = "_c('" + e.tag + "'" + (r ? "," + r : "") + (i ? "," + i : "") + ")"
			}
			for (var o = 0; o < t.transforms.length; o++) n = t.transforms[o](e, n);
			return n
		}
		return Wa(e, t) || "void 0"
	}

	function Ba(e, t) {
		e.staticProcessed = !0;
		var n = t.pre;
		return e.pre && (t.pre = e.pre), t.staticRenderFns.push("with(this){return " + Ha(e, t) + "}"), t.pre = n, "_m(" + (t.staticRenderFns.length - 1) + (e.staticInFor ? ",true" : "") + ")"
	}

	function Ua(e, t) {
		if (e.onceProcessed = !0, e.if && !e.ifProcessed) return Va(e, t);
		if (e.staticInFor) {
			for (var n = "", r = e.parent; r;) {
				if (r.for) {
					n = r.key;
					break
				}
				r = r.parent
			}
			return n ? "_o(" + Ha(e, t) + "," + t.onceId++ + "," + n + ")" : Ha(e, t)
		}
		return Ba(e, t)
	}

	function Va(e, t, n, r) {
		return e.ifProcessed = !0, function e(t, n, r, i) {
			if (!t.length) return i || "_e()";
			var o = t.shift();
			return o.exp ? "(" + o.exp + ")?" + a(o.block) + ":" + e(t, n, r, i) : "" + a(o.block);

			function a(e) {
				return r ? r(e, n) : e.once ? Ua(e, n) : Ha(e, n)
			}
		}(e.ifConditions.slice(), t, n, r)
	}

	function za(e, t, n, r) {
		var i = e.for, o = e.alias, a = e.iterator1 ? "," + e.iterator1 : "", s = e.iterator2 ? "," + e.iterator2 : "";
		return e.forProcessed = !0, (r || "_l") + "((" + i + "),function(" + o + a + s + "){return " + (n || Ha)(e, t) + "})"
	}

	function Ka(e, t) {
		var n = "{", r = function (e, t) {
			var n = e.directives;
			if (!n) return;
			var r, i, o, a, s = "directives:[", c = !1;
			for (r = 0, i = n.length; r < i; r++) {
				o = n[r], a = !0;
				var u = t.directives[o.name];
				u && (a = !!u(e, o, t.warn)), a && (c = !0, s += '{name:"' + o.name + '",rawName:"' + o.rawName + '"' + (o.value ? ",value:(" + o.value + "),expression:" + JSON.stringify(o.value) : "") + (o.arg ? ",arg:" + (o.isDynamicArg ? o.arg : '"' + o.arg + '"') : "") + (o.modifiers ? ",modifiers:" + JSON.stringify(o.modifiers) : "") + "},")
			}
			if (c) return s.slice(0, -1) + "]"
		}(e, t);
		r && (n += r + ","), e.key && (n += "key:" + e.key + ","), e.ref && (n += "ref:" + e.ref + ","), e.refInFor && (n += "refInFor:true,"), e.pre && (n += "pre:true,"), e.component && (n += 'tag:"' + e.tag + '",');
		for (var i = 0; i < t.dataGenFns.length; i++) n += t.dataGenFns[i](e);
		if (e.attrs && (n += "attrs:" + Xa(e.attrs) + ","), e.props && (n += "domProps:" + Xa(e.props) + ","), e.events && (n += La(e.events, !1) + ","), e.nativeEvents && (n += La(e.nativeEvents, !0) + ","), e.slotTarget && !e.slotScope && (n += "slot:" + e.slotTarget + ","), e.scopedSlots && (n += function (e, t, n) {
			var r = e.for || Object.keys(t).some(function (e) {
				var n = t[e];
				return n.slotTargetDynamic || n.if || n.for || Ja(n)
			}), i = !!e.if;
			if (!r) for (var o = e.parent; o;) {
				if (o.slotScope && o.slotScope !== ua || o.for) {
					r = !0;
					break
				}
				o.if && (i = !0), o = o.parent
			}
			var a = Object.keys(t).map(function (e) {
				return qa(t[e], n)
			}).join(",");
			return "scopedSlots:_u([" + a + "]" + (r ? ",null,true" : "") + (!r && i ? ",null,false," + function (e) {
				var t = 5381, n = e.length;
				for (; n;) t = 33 * t ^ e.charCodeAt(--n);
				return t >>> 0
			}(a) : "") + ")"
		}(e, e.scopedSlots, t) + ","), e.model && (n += "model:{value:" + e.model.value + ",callback:" + e.model.callback + ",expression:" + e.model.expression + "},"), e.inlineTemplate) {
			var o = function (e, t) {
				var n = e.children[0];
				if (n && 1 === n.type) {
					var r = Ra(n, t.options);
					return "inlineTemplate:{render:function(){" + r.render + "},staticRenderFns:[" + r.staticRenderFns.map(function (e) {
						return "function(){" + e + "}"
					}).join(",") + "]}"
				}
			}(e, t);
			o && (n += o + ",")
		}
		return n = n.replace(/,$/, "") + "}", e.dynamicAttrs && (n = "_b(" + n + ',"' + e.tag + '",' + Xa(e.dynamicAttrs) + ")"), e.wrapData && (n = e.wrapData(n)), e.wrapListeners && (n = e.wrapListeners(n)), n
	}

	function Ja(e) {
		return 1 === e.type && ("slot" === e.tag || e.children.some(Ja))
	}

	function qa(e, t) {
		var n = e.attrsMap["slot-scope"];
		if (e.if && !e.ifProcessed && !n) return Va(e, t, qa, "null");
		if (e.for && !e.forProcessed) return za(e, t, qa);
		var r = e.slotScope === ua ? "" : String(e.slotScope),
			i = "function(" + r + "){return " + ("template" === e.tag ? e.if && n ? "(" + e.if + ")?" + (Wa(e, t) || "undefined") + ":undefined" : Wa(e, t) || "undefined" : Ha(e, t)) + "}",
			o = r ? "" : ",proxy:true";
		return "{key:" + (e.slotTarget || '"default"') + ",fn:" + i + o + "}"
	}

	function Wa(e, t, n, r, i) {
		var o = e.children;
		if (o.length) {
			var a = o[0];
			if (1 === o.length && a.for && "template" !== a.tag && "slot" !== a.tag) {
				var s = n ? t.maybeComponent(a) ? ",1" : ",0" : "";
				return "" + (r || Ha)(a, t) + s
			}
			var c = n ? function (e, t) {
				for (var n = 0, r = 0; r < e.length; r++) {
					var i = e[r];
					if (1 === i.type) {
						if (Za(i) || i.ifConditions && i.ifConditions.some(function (e) {
							return Za(e.block)
						})) {
							n = 2;
							break
						}
						(t(i) || i.ifConditions && i.ifConditions.some(function (e) {
							return t(e.block)
						})) && (n = 1)
					}
				}
				return n
			}(o, t.maybeComponent) : 0, u = i || Ga;
			return "[" + o.map(function (e) {
				return u(e, t)
			}).join(",") + "]" + (c ? "," + c : "")
		}
	}

	function Za(e) {
		return void 0 !== e.for || "template" === e.tag || "slot" === e.tag
	}

	function Ga(e, t) {
		return 1 === e.type ? Ha(e, t) : 3 === e.type && e.isComment ? (r = e, "_e(" + JSON.stringify(r.text) + ")") : "_v(" + (2 === (n = e).type ? n.expression : Ya(JSON.stringify(n.text))) + ")";
		var n, r
	}

	function Xa(e) {
		for (var t = "", n = "", r = 0; r < e.length; r++) {
			var i = e[r], o = Ya(i.value);
			i.dynamic ? n += i.name + "," + o + "," : t += '"' + i.name + '":' + o + ","
		}
		return t = "{" + t.slice(0, -1) + "}", n ? "_d(" + t + ",[" + n.slice(0, -1) + "])" : t
	}

	function Ya(e) {
		return e.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029")
	}

	new RegExp("\\b" + "do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b") + "\\b");

	function Qa(e, t) {
		try {
			return new Function(e)
		} catch (n) {
			return t.push({err: n, code: e}), S
		}
	}

	function es(e) {
		var t = Object.create(null);
		return function (n, r, i) {
			(r = A({}, r)).warn;
			delete r.warn;
			var o = r.delimiters ? String(r.delimiters) + n : n;
			if (t[o]) return t[o];
			var a = e(n, r), s = {}, c = [];
			return s.render = Qa(a.render, c), s.staticRenderFns = a.staticRenderFns.map(function (e) {
				return Qa(e, c)
			}), t[o] = s
		}
	}

	var ts, ns, rs = (ts = function (e, t) {
		var n = fa(e.trim(), t);
		!1 !== t.optimize && Aa(n, t);
		var r = Ra(n, t);
		return {ast: n, render: r.render, staticRenderFns: r.staticRenderFns}
	}, function (e) {
		function t(t, n) {
			var r = Object.create(e), i = [], o = [];
			if (n) for (var a in n.modules && (r.modules = (e.modules || []).concat(n.modules)), n.directives && (r.directives = A(Object.create(e.directives || null), n.directives)), n) "modules" !== a && "directives" !== a && (r[a] = n[a]);
			r.warn = function (e, t, n) {
				(n ? o : i).push(e)
			};
			var s = ts(t.trim(), r);
			return s.errors = i, s.tips = o, s
		}

		return {compile: t, compileToFunctions: es(t)}
	})(xa), is = (rs.compile, rs.compileToFunctions);

	function os(e) {
		return (ns = ns || document.createElement("div")).innerHTML = e ? '<a href="\n"/>' : '<div a="\n"/>', ns.innerHTML.indexOf("&#10;") > 0
	}

	var as = !!V && os(!1), ss = !!V && os(!0), cs = g(function (e) {
		var t = Qn(e);
		return t && t.innerHTML
	}), us = Cn.prototype.$mount;
	return Cn.prototype.$mount = function (e, t) {
		if ((e = e && Qn(e)) === document.body || e === document.documentElement) return this;
		var n = this.$options;
		if (!n.render) {
			var r = n.template;
			if (r) if ("string" == typeof r) "#" === r.charAt(0) && (r = cs(r)); else {
				if (!r.nodeType) return this;
				r = r.innerHTML
			} else e && (r = function (e) {
				if (e.outerHTML) return e.outerHTML;
				var t = document.createElement("div");
				return t.appendChild(e.cloneNode(!0)), t.innerHTML
			}(e));
			if (r) {
				var i = is(r, {
					outputSourceRange: !1,
					shouldDecodeNewlines: as,
					shouldDecodeNewlinesForHref: ss,
					delimiters: n.delimiters,
					comments: n.comments
				}, this), o = i.render, a = i.staticRenderFns;
				n.render = o, n.staticRenderFns = a
			}
		}
		return us.call(this, e, t)
	}, Cn.compile = is, Cn
});
!function (t, e) {
	"object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.vuelidate = e() : t.vuelidate = e()
}(window, (function () {
	return function (t) {
		var e = {};

		function r(n) {
			if (e[n]) return e[n].exports;
			var o = e[n] = {i: n, l: !1, exports: {}};
			return t[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports
		}

		return r.m = t, r.c = e, r.d = function (t, e, n) {
			r.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: n})
		}, r.r = function (t) {
			"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
		}, r.t = function (t, e) {
			if (1 & e && (t = r(t)), 8 & e) return t;
			if (4 & e && "object" == typeof t && t && t.__esModule) return t;
			var n = Object.create(null);
			if (r.r(n), Object.defineProperty(n, "default", {
				enumerable: !0,
				value: t
			}), 2 & e && "string" != typeof t) for (var o in t) r.d(n, o, function (e) {
				return t[e]
			}.bind(null, o));
			return n
		}, r.n = function (t) {
			var e = t && t.__esModule ? function () {
				return t.default
			} : function () {
				return t
			};
			return r.d(e, "a", e), e
		}, r.o = function (t, e) {
			return Object.prototype.hasOwnProperty.call(t, e)
		}, r.p = "/", r(r.s = 3)
	}({
		3: function (t, e, r) {
			"use strict";

			function n(t) {
				return null == t
			}

			function o(t) {
				return null != t
			}

			function i(t, e) {
				return e.tag === t.tag && e.key === t.key
			}

			function u(t) {
				var e = t.tag;
				t.vm = new e({data: t.args})
			}

			function a(t, e, r) {
				var n, i, u = {};
				for (n = e; n <= r; ++n) o(i = t[n].key) && (u[i] = n);
				return u
			}

			function l(t, e, r) {
				for (; e <= r; ++e) u(t[e])
			}

			function c(t, e, r) {
				for (; e <= r; ++e) {
					var n = t[e];
					o(n) && (n.vm.$destroy(), n.vm = null)
				}
			}

			function s(t, e) {
				t !== e && (e.vm = t.vm, function (t) {
					for (var e = Object.keys(t.args), r = 0; r < e.length; r++) e.forEach((function (e) {
						t.vm[e] = t.args[e]
					}))
				}(e))
			}

			function f(t, e) {
				o(t) && o(e) ? t !== e && function (t, e) {
					for (var r, f, d, y = 0, h = 0, p = t.length - 1, v = t[0], b = t[p], m = e.length - 1, g = e[0], M = e[m]; y <= p && h <= m;) n(v) ? v = t[++y] : n(b) ? b = t[--p] : i(v, g) ? (s(v, g), v = t[++y], g = e[++h]) : i(b, M) ? (s(b, M), b = t[--p], M = e[--m]) : i(v, M) ? (s(v, M), v = t[++y], M = e[--m]) : i(b, g) ? (s(b, g), b = t[--p], g = e[++h]) : (n(r) && (r = a(t, y, p)), n(f = o(g.key) ? r[g.key] : null) ? (u(g), g = e[++h]) : i(d = t[f], g) ? (s(d, g), t[f] = void 0, g = e[++h]) : (u(g), g = e[++h]));
					y > p ? l(e, h, m) : h > m && c(t, y, p)
				}(t, e) : o(e) ? l(e, 0, e.length - 1) : o(t) && c(t, 0, t.length - 1)
			}

			function d(t, e, r) {
				return {tag: t, key: e, args: r}
			}

			function y(t, e) {
				var r = Object.keys(t);
				if (Object.getOwnPropertySymbols) {
					var n = Object.getOwnPropertySymbols(t);
					e && (n = n.filter((function (e) {
						return Object.getOwnPropertyDescriptor(t, e).enumerable
					}))), r.push.apply(r, n)
				}
				return r
			}

			function h(t) {
				for (var e = 1; e < arguments.length; e++) {
					var r = null != arguments[e] ? arguments[e] : {};
					e % 2 ? y(Object(r), !0).forEach((function (e) {
						p(t, e, r[e])
					})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : y(Object(r)).forEach((function (e) {
						Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e))
					}))
				}
				return t
			}

			function p(t, e, r) {
				return e in t ? Object.defineProperty(t, e, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : t[e] = r, t
			}

			function v(t) {
				return (v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
					return typeof t
				} : function (t) {
					return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
				})(t)
			}

			r.r(e), r.d(e, "Vuelidate", (function () {
				return q
			})), r.d(e, "validationMixin", (function () {
				return U
			})), r.d(e, "withParams", (function () {
				return j
			}));
			var b = [], m = null;

			function g() {
				null !== m && b.push(m), m = {}
			}

			function M() {
				var t = m, e = m = b.pop() || null;
				return e && (Array.isArray(e.$sub) || (e.$sub = []), e.$sub.push(t)), t
			}

			function O(t) {
				if ("object" !== v(t) || Array.isArray(t)) throw new Error("params must be an object");
				m = h(h({}, m), t)
			}

			function $(t) {
				var e = t(O);
				return function () {
					g();
					try {
						for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
						return e.apply(this, r)
					} finally {
						M()
					}
				}
			}

			function j(t, e) {
				return "object" === v(t) && void 0 !== e ? (r = t, n = e, $((function (t) {
					return function () {
						t(r);
						for (var e = arguments.length, o = new Array(e), i = 0; i < e; i++) o[i] = arguments[i];
						return n.apply(this, o)
					}
				}))) : $(t);
				var r, n
			}

			function _(t) {
				return function (t) {
					if (Array.isArray(t)) return P(t)
				}(t) || function (t) {
					if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
				}(t) || function (t, e) {
					if (!t) return;
					if ("string" == typeof t) return P(t, e);
					var r = Object.prototype.toString.call(t).slice(8, -1);
					"Object" === r && t.constructor && (r = t.constructor.name);
					if ("Map" === r || "Set" === r) return Array.from(t);
					if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return P(t, e)
				}(t) || function () {
					throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
				}()
			}

			function P(t, e) {
				(null == e || e > t.length) && (e = t.length);
				for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
				return n
			}

			function w(t, e) {
				var r = Object.keys(t);
				if (Object.getOwnPropertySymbols) {
					var n = Object.getOwnPropertySymbols(t);
					e && (n = n.filter((function (e) {
						return Object.getOwnPropertyDescriptor(t, e).enumerable
					}))), r.push.apply(r, n)
				}
				return r
			}

			function x(t) {
				for (var e = 1; e < arguments.length; e++) {
					var r = null != arguments[e] ? arguments[e] : {};
					e % 2 ? w(Object(r), !0).forEach((function (e) {
						k(t, e, r[e])
					})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : w(Object(r)).forEach((function (e) {
						Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e))
					}))
				}
				return t
			}

			function k(t, e, r) {
				return e in t ? Object.defineProperty(t, e, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : t[e] = r, t
			}

			function z(t) {
				return (z = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
					return typeof t
				} : function (t) {
					return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
				})(t)
			}

			var A = function () {
				return null
			}, S = function (t, e, r) {
				return t.reduce((function (t, n) {
					return t[r ? r(n) : n] = e(n), t
				}), {})
			};

			function K(t) {
				return "function" == typeof t
			}

			function W(t) {
				return null !== t && ("object" === z(t) || K(t))
			}

			var D = function (t, e, r, n) {
				if ("function" == typeof r) return r.call(t, e, n);
				r = Array.isArray(r) ? r : r.split(".");
				for (var o = 0; o < r.length; o++) {
					if (!e || "object" !== z(e)) return n;
					e = e[r[o]]
				}
				return void 0 === e ? n : e
			};
			var E = {
				$invalid: function () {
					var t = this, e = this.proxy;
					return this.nestedKeys.some((function (e) {
						return t.refProxy(e).$invalid
					})) || this.ruleKeys.some((function (t) {
						return !e[t]
					}))
				}, $dirty: function () {
					var t = this;
					return !!this.dirty || 0 !== this.nestedKeys.length && this.nestedKeys.every((function (e) {
						return t.refProxy(e).$dirty
					}))
				}, $anyDirty: function () {
					var t = this;
					return !!this.dirty || 0 !== this.nestedKeys.length && this.nestedKeys.some((function (e) {
						return t.refProxy(e).$anyDirty
					}))
				}, $error: function () {
					return this.$dirty && !this.$pending && this.$invalid
				}, $anyError: function () {
					var t = this;
					return !!this.$error || this.nestedKeys.some((function (e) {
						return t.refProxy(e).$anyError
					}))
				}, $pending: function () {
					var t = this;
					return this.ruleKeys.some((function (e) {
						return t.getRef(e).$pending
					})) || this.nestedKeys.some((function (e) {
						return t.refProxy(e).$pending
					}))
				}, $params: function () {
					var t = this, e = this.validations;
					return x(x({}, S(this.nestedKeys, (function (t) {
						return e[t] && e[t].$params || null
					}))), S(this.ruleKeys, (function (e) {
						return t.getRef(e).$params
					})))
				}
			};

			function V(t) {
				this.dirty = t;
				var e = this.proxy, r = t ? "$touch" : "$reset";
				this.nestedKeys.forEach((function (t) {
					e[t][r]()
				}))
			}

			var R = {
				$touch: function () {
					V.call(this, !0)
				}, $reset: function () {
					V.call(this, !1)
				}, $flattenParams: function () {
					var t = this.proxy, e = [];
					for (var r in this.$params) if (this.isNested(r)) {
						for (var n = t[r].$flattenParams(), o = 0; o < n.length; o++) n[o].path.unshift(r);
						e = e.concat(n)
					} else e.push({path: [], name: r, params: this.$params[r]});
					return e
				}
			}, B = Object.keys(E), I = Object.keys(R), N = null, C = function (t) {
				if (N) return N;
				var e = t.extend({
					computed: {
						refs: function () {
							var t = this._vval;
							this._vval = this.children, f(t, this._vval);
							var e = {};
							return this._vval.forEach((function (t) {
								e[t.key] = t.vm
							})), e
						}
					}, beforeCreate: function () {
						this._vval = null
					}, beforeDestroy: function () {
						this._vval && (f(this._vval), this._vval = null)
					}, methods: {
						getModel: function () {
							return this.lazyModel ? this.lazyModel(this.prop) : this.model
						}, getModelKey: function (t) {
							var e = this.getModel();
							if (e) return e[t]
						}, hasIter: function () {
							return !1
						}
					}
				}), r = e.extend({
					data: function () {
						return {rule: null, lazyModel: null, model: null, lazyParentModel: null, rootModel: null}
					}, methods: {
						runRule: function (e) {
							var r = this.getModel();
							g();
							var n, o = this.rule.call(this.rootModel, r, e),
								i = W(n = o) && K(n.then) ? function (t, e) {
									var r = new t({data: {p: !0, v: !1}});
									return e.then((function (t) {
										r.p = !1, r.v = t
									}), (function (t) {
										throw r.p = !1, r.v = !1, t
									})), r.__isVuelidateAsyncVm = !0, r
								}(t, o) : o, u = M();
							return {output: i, params: u && u.$sub ? u.$sub.length > 1 ? u : u.$sub[0] : null}
						}
					}, computed: {
						run: function () {
							var t = this, e = this.lazyParentModel();
							if (Array.isArray(e) && e.__ob__) {
								var r = e.__ob__.dep;
								r.depend();
								var n = r.constructor.target;
								if (!this._indirectWatcher) {
									var o = n.constructor;
									this._indirectWatcher = new o(this, (function () {
										return t.runRule(e)
									}), null, {lazy: !0})
								}
								var i = this.getModel();
								if (!this._indirectWatcher.dirty && this._lastModel === i) return this._indirectWatcher.depend(), n.value;
								this._lastModel = i, this._indirectWatcher.evaluate(), this._indirectWatcher.depend()
							} else this._indirectWatcher && (this._indirectWatcher.teardown(), this._indirectWatcher = null);
							return this._indirectWatcher ? this._indirectWatcher.value : this.runRule(e)
						}, $params: function () {
							return this.run.params
						}, proxy: function () {
							var t = this.run.output;
							return t.__isVuelidateAsyncVm ? !!t.v : !!t
						}, $pending: function () {
							var t = this.run.output;
							return !!t.__isVuelidateAsyncVm && t.p
						}
					}, destroyed: function () {
						this._indirectWatcher && (this._indirectWatcher.teardown(), this._indirectWatcher = null)
					}
				}), n = e.extend({
					data: function () {
						return {
							dirty: !1,
							validations: null,
							lazyModel: null,
							model: null,
							prop: null,
							lazyParentModel: null,
							rootModel: null
						}
					}, methods: x(x({}, R), {}, {
						refProxy: function (t) {
							return this.getRef(t).proxy
						}, getRef: function (t) {
							return this.refs[t]
						}, isNested: function (t) {
							return "function" != typeof this.validations[t]
						}
					}), computed: x(x({}, E), {}, {
						nestedKeys: function () {
							return this.keys.filter(this.isNested)
						}, ruleKeys: function () {
							var t = this;
							return this.keys.filter((function (e) {
								return !t.isNested(e)
							}))
						}, keys: function () {
							return Object.keys(this.validations).filter((function (t) {
								return "$params" !== t
							}))
						}, proxy: function () {
							var t = this, e = S(this.keys, (function (e) {
								return {
									enumerable: !0, configurable: !0, get: function () {
										return t.refProxy(e)
									}
								}
							})), r = S(B, (function (e) {
								return {
									enumerable: !0, configurable: !0, get: function () {
										return t[e]
									}
								}
							})), n = S(I, (function (e) {
								return {
									enumerable: !1, configurable: !0, get: function () {
										return t[e]
									}
								}
							})), o = this.hasIter() ? {
								$iter: {
									enumerable: !0,
									value: Object.defineProperties({}, x({}, e))
								}
							} : {};
							return Object.defineProperties({}, x(x(x(x({}, e), o), {}, {
								$model: {
									enumerable: !0,
									get: function () {
										var e = t.lazyParentModel();
										return null != e ? e[t.prop] : null
									},
									set: function (e) {
										var r = t.lazyParentModel();
										null != r && (r[t.prop] = e, t.$touch())
									}
								}
							}, r), n))
						}, children: function () {
							var t = this;
							return [].concat(_(this.nestedKeys.map((function (e) {
								return u(t, e)
							}))), _(this.ruleKeys.map((function (e) {
								return a(t, e)
							})))).filter(Boolean)
						}
					})
				}), o = n.extend({
					methods: {
						isNested: function (t) {
							return void 0 !== this.validations[t]()
						}, getRef: function (t) {
							var e = this;
							return {
								get proxy() {
									return e.validations[t]() || !1
								}
							}
						}
					}
				}), i = n.extend({
					computed: {
						keys: function () {
							var t = this.getModel();
							return W(t) ? Object.keys(t) : []
						}, tracker: function () {
							var t = this, e = this.validations.$trackBy;
							return e ? function (r) {
								return "".concat(D(t.rootModel, t.getModelKey(r), e))
							} : function (t) {
								return "".concat(t)
							}
						}, getModelLazy: function () {
							var t = this;
							return function () {
								return t.getModel()
							}
						}, children: function () {
							var t = this, e = this.validations, r = this.getModel(), o = x({}, e);
							delete o.$trackBy;
							var i = {};
							return this.keys.map((function (e) {
								var u = t.tracker(e);
								return i.hasOwnProperty(u) ? null : (i[u] = !0, d(n, u, {
									validations: o,
									prop: e,
									lazyParentModel: t.getModelLazy,
									model: r[e],
									rootModel: t.rootModel
								}))
							})).filter(Boolean)
						}
					}, methods: {
						isNested: function () {
							return !0
						}, getRef: function (t) {
							return this.refs[this.tracker(t)]
						}, hasIter: function () {
							return !0
						}
					}
				}), u = function (t, e) {
					if ("$each" === e) return d(i, e, {
						validations: t.validations[e],
						lazyParentModel: t.lazyParentModel,
						prop: e,
						lazyModel: t.getModel,
						rootModel: t.rootModel
					});
					var r = t.validations[e];
					if (Array.isArray(r)) {
						var u = t.rootModel, a = S(r, (function (t) {
							return function () {
								return D(u, u.$v, t)
							}
						}), (function (t) {
							return Array.isArray(t) ? t.join(".") : t
						}));
						return d(o, e, {validations: a, lazyParentModel: A, prop: e, lazyModel: A, rootModel: u})
					}
					return d(n, e, {
						validations: r,
						lazyParentModel: t.getModel,
						prop: e,
						lazyModel: t.getModelKey,
						rootModel: t.rootModel
					})
				}, a = function (t, e) {
					return d(r, e, {
						rule: t.validations[e],
						lazyParentModel: t.lazyParentModel,
						lazyModel: t.getModel,
						rootModel: t.rootModel
					})
				};
				return N = {VBase: e, Validation: n}
			}, T = null;
			var L = function (t, e) {
				var r = function (t) {
					if (T) return T;
					for (var e = t.constructor; e.super;) e = e.super;
					return T = e, e
				}(t), n = C(r), o = n.Validation;
				return new (0, n.VBase)({
					computed: {
						children: function () {
							var r = "function" == typeof e ? e.call(t) : e;
							return [d(o, "$v", {
								validations: r,
								lazyParentModel: A,
								prop: "$v",
								model: t,
								rootModel: t
							})]
						}
					}
				})
			}, U = {
				data: function () {
					var t = this.$options.validations;
					return t && (this._vuelidate = L(this, t)), {}
				}, beforeCreate: function () {
					var t = this.$options;
					t.validations && (t.computed || (t.computed = {}), t.computed.$v || (t.computed.$v = function () {
						return this._vuelidate ? this._vuelidate.refs.$v.proxy : null
					}))
				}, beforeDestroy: function () {
					this._vuelidate && (this._vuelidate.$destroy(), this._vuelidate = null)
				}
			};

			function q(t) {
				t.mixin(U)
			}

			e.default = q
		}
	})
}));
!function (n, t) {
	"object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.validators = t() : n.validators = t()
}(window, (function () {
	return function (n) {
		var t = {};

		function r(e) {
			if (t[e]) return t[e].exports;
			var u = t[e] = {i: e, l: !1, exports: {}};
			return n[e].call(u.exports, u, u.exports, r), u.l = !0, u.exports
		}

		return r.m = n, r.c = t, r.d = function (n, t, e) {
			r.o(n, t) || Object.defineProperty(n, t, {enumerable: !0, get: e})
		}, r.r = function (n) {
			"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(n, "__esModule", {value: !0})
		}, r.t = function (n, t) {
			if (1 & t && (n = r(n)), 8 & t) return n;
			if (4 & t && "object" == typeof n && n && n.__esModule) return n;
			var e = Object.create(null);
			if (r.r(e), Object.defineProperty(e, "default", {
				enumerable: !0,
				value: n
			}), 2 & t && "string" != typeof n) for (var u in n) r.d(e, u, function (t) {
				return n[t]
			}.bind(null, u));
			return e
		}, r.n = function (n) {
			var t = n && n.__esModule ? function () {
				return n.default
			} : function () {
				return n
			};
			return r.d(t, "a", t), t
		}, r.o = function (n, t) {
			return Object.prototype.hasOwnProperty.call(n, t)
		}, r.p = "/", r(r.s = 2)
	}([function (n, t, r) {
		"use strict";
		r.r(t), function (n) {
			function e(n) {
				return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (n) {
					return typeof n
				} : function (n) {
					return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
				})(n)
			}

			r.d(t, "withParams", (function () {
				return o
			}));
			var u = "undefined" != typeof window ? window : void 0 !== n ? n : {},
				o = u.vuelidate ? u.vuelidate.withParams : function (n, t) {
					return "object" === e(n) && void 0 !== t ? t : n((function () {
					}))
				}
		}.call(this, r(1))
	}, function (n, t) {
		var r;
		r = function () {
			return this
		}();
		try {
			r = r || new Function("return this")()
		} catch (n) {
			"object" == typeof window && (r = window)
		}
		n.exports = r
	}, function (n, t, r) {
		"use strict";
		r.r(t), r.d(t, "alpha", (function () {
			return d
		})), r.d(t, "alphaNum", (function () {
			return l
		})), r.d(t, "numeric", (function () {
			return s
		})), r.d(t, "between", (function () {
			return p
		})), r.d(t, "email", (function () {
			return y
		})), r.d(t, "ipAddress", (function () {
			return m
		})), r.d(t, "macAddress", (function () {
			return h
		})), r.d(t, "maxLength", (function () {
			return g
		})), r.d(t, "minLength", (function () {
			return v
		})), r.d(t, "required", (function () {
			return w
		})), r.d(t, "requiredIf", (function () {
			return S
		})), r.d(t, "requiredUnless", (function () {
			return A
		})), r.d(t, "sameAs", (function () {
			return z
		})), r.d(t, "url", (function () {
			return j
		})), r.d(t, "or", (function () {
			return $
		})), r.d(t, "and", (function () {
			return P
		})), r.d(t, "not", (function () {
			return _
		})), r.d(t, "minValue", (function () {
			return q
		})), r.d(t, "maxValue", (function () {
			return O
		})), r.d(t, "integer", (function () {
			return L
		})), r.d(t, "decimal", (function () {
			return D
		})), r.d(t, "helpers", (function () {
			return e
		}));
		var e = {};
		r.r(e), r.d(e, "withParams", (function () {
			return u
		})), r.d(e, "req", (function () {
			return i
		})), r.d(e, "len", (function () {
			return f
		})), r.d(e, "ref", (function () {
			return c
		})), r.d(e, "regex", (function () {
			return a
		}));
		var u = r(0).withParams;

		function o(n) {
			return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (n) {
				return typeof n
			} : function (n) {
				return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
			})(n)
		}

		var i = function (n) {
				if (Array.isArray(n)) return !!n.length;
				if (null == n) return !1;
				if (!1 === n) return !0;
				if (n instanceof Date) return !isNaN(n.getTime());
				if ("object" === o(n)) {
					for (var t in n) return !0;
					return !1
				}
				return !!String(n).length
			}, f = function (n) {
				return Array.isArray(n) ? n.length : "object" === o(n) ? Object.keys(n).length : String(n).length
			}, c = function (n, t, r) {
				return "function" == typeof n ? n.call(t, r) : r[n]
			}, a = function (n, t) {
				return u({type: n}, (function (n) {
					return !i(n) || t.test(n)
				}))
			}, d = a("alpha", /^[a-zA-Z]*$/), l = a("alphaNum", /^[a-zA-Z0-9]*$/), s = a("numeric", /^[0-9]*$/),
			p = function (n, t) {
				return u({type: "between", min: n, max: t}, (function (r) {
					return !i(r) || (!/\s/.test(r) || r instanceof Date) && +n <= +r && +t >= +r
				}))
			},
			y = a("email", /^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i),
			m = u({type: "ipAddress"}, (function (n) {
				if (!i(n)) return !0;
				if ("string" != typeof n) return !1;
				var t = n.split(".");
				return 4 === t.length && t.every(x)
			})), x = function (n) {
				if (n.length > 3 || 0 === n.length) return !1;
				if ("0" === n[0] && "0" !== n) return !1;
				if (!n.match(/^\d+$/)) return !1;
				var t = 0 | +n;
				return t >= 0 && t <= 255
			}, h = function () {
				var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ":";
				return u({type: "macAddress"}, (function (t) {
					if (!i(t)) return !0;
					if ("string" != typeof t) return !1;
					var r = "string" == typeof n && "" !== n ? t.split(n) : 12 === t.length || 16 === t.length ? t.match(/.{2}/g) : null;
					return null !== r && (6 === r.length || 8 === r.length) && r.every(b)
				}))
			}, b = function (n) {
				return n.toLowerCase().match(/^[0-9a-f]{2}$/)
			}, g = function (n) {
				return u({type: "maxLength", max: n}, (function (t) {
					return !i(t) || f(t) <= n
				}))
			}, v = function (n) {
				return u({type: "minLength", min: n}, (function (t) {
					return !i(t) || f(t) >= n
				}))
			}, w = u({type: "required"}, (function (n) {
				return i("string" == typeof n ? n.trim() : n)
			})), S = function (n) {
				return u({type: "requiredIf", prop: n}, (function (t, r) {
					return !c(n, this, r) || i(t)
				}))
			}, A = function (n) {
				return u({type: "requiredUnless", prop: n}, (function (t, r) {
					return !!c(n, this, r) || i(t)
				}))
			}, z = function (n) {
				return u({type: "sameAs", eq: n}, (function (t, r) {
					return t === c(n, this, r)
				}))
			},
			j = a("url", /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i),
			$ = function () {
				for (var n = arguments.length, t = new Array(n), r = 0; r < n; r++) t[r] = arguments[r];
				return u({type: "or"}, (function () {
					for (var n = this, r = arguments.length, e = new Array(r), u = 0; u < r; u++) e[u] = arguments[u];
					return t.length > 0 && t.reduce((function (t, r) {
						return t || r.apply(n, e)
					}), !1)
				}))
			}, P = function () {
				for (var n = arguments.length, t = new Array(n), r = 0; r < n; r++) t[r] = arguments[r];
				return u({type: "and"}, (function () {
					for (var n = this, r = arguments.length, e = new Array(r), u = 0; u < r; u++) e[u] = arguments[u];
					return t.length > 0 && t.reduce((function (t, r) {
						return t && r.apply(n, e)
					}), !0)
				}))
			}, _ = function (n) {
				return u({type: "not"}, (function (t, r) {
					return !i(t) || !n.call(this, t, r)
				}))
			}, q = function (n) {
				return u({type: "minValue", min: n}, (function (t) {
					return !i(t) || (!/\s/.test(t) || t instanceof Date) && +t >= +n
				}))
			}, O = function (n) {
				return u({type: "maxValue", max: n}, (function (t) {
					return !i(t) || (!/\s/.test(t) || t instanceof Date) && +t <= +n
				}))
			}, L = a("integer", /(^[0-9]*$)|(^-[0-9]+$)/), D = a("decimal", /^[-]?\d*(\.\d+)?$/)
	}])
}));
/*!
 * FilePond 4.30.3
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */

/* eslint-disable */

!function (e, t) {
	"object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).FilePond = {})
}(this, function (e) {
	"use strict";
	var t = function (e, t) {
			for (var n in e) e.hasOwnProperty(n) && t(n, e[n])
		}, n = function (e) {
			var n = {};
			return t(e, function (t) {
				!function (e, t, n) {
					"function" != typeof n ? Object.defineProperty(e, t, Object.assign({}, n)) : e[t] = n
				}(n, t, e[t])
			}), n
		}, r = function (e, t) {
			var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
			if (null === n) return e.getAttribute(t) || e.hasAttribute(t);
			e.setAttribute(t, n)
		}, o = ["svg", "path"], i = function (e) {
			return o.includes(e)
		}, a = function (e, n) {
			var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
			"object" == typeof n && (o = n, n = null);
			var a = i(e) ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);
			return n && (i(e) ? r(a, "class", n) : a.className = n), t(o, function (e, t) {
				r(a, e, t)
			}), a
		}, s = function (e, t) {
			return function (e, n) {
				return void 0 !== n ? t.splice(n, 0, e) : t.push(e), e
			}
		}, u = function (e, t) {
			return function (n) {
				return t.splice(t.indexOf(n), 1), n.element.parentNode && e.removeChild(n.element), n
			}
		}, l = "undefined" != typeof window && void 0 !== window.document, c = function () {
			return l
		}, f = "children" in (c() ? a("svg") : {}) ? function (e) {
			return e.children.length
		} : function (e) {
			return e.childNodes.length
		}, d = function (e, t, n, r) {
			var o = n[0] || e.left, i = n[1] || e.top, a = o + e.width, s = i + e.height * (r[1] || 1), u = {
				element: Object.assign({}, e),
				inner: {left: e.left, top: e.top, right: e.right, bottom: e.bottom},
				outer: {left: o, top: i, right: a, bottom: s}
			};
			return t.filter(function (e) {
				return !e.isRectIgnored()
			}).map(function (e) {
				return e.rect
			}).forEach(function (e) {
				p(u.inner, Object.assign({}, e.inner)), p(u.outer, Object.assign({}, e.outer))
			}), E(u.inner), u.outer.bottom += u.element.marginBottom, u.outer.right += u.element.marginRight, E(u.outer), u
		}, p = function (e, t) {
			t.top += e.top, t.right += e.left, t.bottom += e.top, t.left += e.left, t.bottom > e.bottom && (e.bottom = t.bottom), t.right > e.right && (e.right = t.right)
		}, E = function (e) {
			e.width = e.right - e.left, e.height = e.bottom - e.top
		}, _ = function (e) {
			return "number" == typeof e
		}, T = function (e) {
			return e < .5 ? 2 * e * e : (4 - 2 * e) * e - 1
		}, I = {
			spring: function () {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.stiffness,
					r = void 0 === t ? .5 : t, o = e.damping, i = void 0 === o ? .75 : o, a = e.mass,
					s = void 0 === a ? 10 : a, u = null, l = null, c = 0, f = !1, d = n({
						interpolate: function (e, t) {
							if (!f) {
								if (!_(u) || !_(l)) return f = !0, void (c = 0);
								(function (e, t, n) {
									var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : .001;
									return Math.abs(e - t) < r && Math.abs(n) < r
								})(l += c += -(l - u) * r / s, u, c *= i) || t ? (l = u, c = 0, f = !0, d.onupdate(l), d.oncomplete(l)) : d.onupdate(l)
							}
						}, target: {
							set: function (e) {
								if (_(e) && !_(l) && (l = e), null === u && (u = e, l = e), l === (u = e) || void 0 === u) return f = !0, c = 0, d.onupdate(l), void d.oncomplete(l);
								f = !1
							}, get: function () {
								return u
							}
						}, resting: {
							get: function () {
								return f
							}
						}, onupdate: function (e) {
						}, oncomplete: function (e) {
						}
					});
				return d
			}, tween: function () {
				var e, t, r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = r.duration,
					i = void 0 === o ? 500 : o, a = r.easing, s = void 0 === a ? T : a, u = r.delay,
					l = void 0 === u ? 0 : u, c = null, f = !0, d = !1, p = null, E = n({
						interpolate: function (n, r) {
							f || null === p || (null === c && (c = n), n - c < l || ((e = n - c - l) >= i || r ? (e = 1, t = d ? 0 : 1, E.onupdate(t * p), E.oncomplete(t * p), f = !0) : (t = e / i, E.onupdate((e >= 0 ? s(d ? 1 - t : t) : 0) * p))))
						}, target: {
							get: function () {
								return d ? 0 : p
							}, set: function (e) {
								if (null === p) return p = e, E.onupdate(e), void E.oncomplete(e);
								e < p ? (p = 1, d = !0) : (d = !1, p = e), f = !1, c = null
							}
						}, resting: {
							get: function () {
								return f
							}
						}, onupdate: function (e) {
						}, oncomplete: function (e) {
						}
					});
				return E
			}
		}, v = function (e, t, n) {
			var r = e[t] && "object" == typeof e[t][n] ? e[t][n] : e[t] || e, o = "string" == typeof r ? r : r.type,
				i = "object" == typeof r ? Object.assign({}, r) : {};
			return I[o] ? I[o](i) : null
		}, m = function (e, t, n) {
			var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
			(t = Array.isArray(t) ? t : [t]).forEach(function (t) {
				e.forEach(function (e) {
					var o = e, i = function () {
						return n[e]
					}, a = function (t) {
						return n[e] = t
					};
					"object" == typeof e && (o = e.key, i = e.getter || i, a = e.setter || a), t[o] && !r || (t[o] = {
						get: i,
						set: a
					})
				})
			})
		}, h = function (e) {
			return null != e
		}, g = {
			opacity: 1,
			scaleX: 1,
			scaleY: 1,
			translateX: 0,
			translateY: 0,
			rotateX: 0,
			rotateY: 0,
			rotateZ: 0,
			originX: 0,
			originY: 0
		}, R = function (e, t) {
			if (Object.keys(e).length !== Object.keys(t).length) return !0;
			for (var n in t) if (t[n] !== e[n]) return !0;
			return !1
		}, O = function (e, t) {
			var n = t.opacity, r = t.perspective, o = t.translateX, i = t.translateY, a = t.scaleX, s = t.scaleY,
				u = t.rotateX, l = t.rotateY, c = t.rotateZ, f = t.originX, d = t.originY, p = t.width, E = t.height,
				_ = "", T = "";
			(h(f) || h(d)) && (T += "transform-origin: " + (f || 0) + "px " + (d || 0) + "px;"), h(r) && (_ += "perspective(" + r + "px) "), (h(o) || h(i)) && (_ += "translate3d(" + (o || 0) + "px, " + (i || 0) + "px, 0) "), (h(a) || h(s)) && (_ += "scale3d(" + (h(a) ? a : 1) + ", " + (h(s) ? s : 1) + ", 1) "), h(c) && (_ += "rotateZ(" + c + "rad) "), h(u) && (_ += "rotateX(" + u + "rad) "), h(l) && (_ += "rotateY(" + l + "rad) "), _.length && (T += "transform:" + _ + ";"), h(n) && (T += "opacity:" + n + ";", 0 === n && (T += "visibility:hidden;"), n < 1 && (T += "pointer-events:none;")), h(E) && (T += "height:" + E + "px;"), h(p) && (T += "width:" + p + "px;");
			var I = e.elementCurrentStyle || "";
			T.length === I.length && T === I || (e.style.cssText = T, e.elementCurrentStyle = T)
		}, y = {
			styles: function (e) {
				var t = e.mixinConfig, n = e.viewProps, r = e.viewInternalAPI, o = e.viewExternalAPI, i = e.view,
					a = Object.assign({}, n), s = {};
				m(t, [r, o], n);
				var u = function () {
					return i.rect ? d(i.rect, i.childViews, [n.translateX || 0, n.translateY || 0], [n.scaleX || 0, n.scaleY || 0]) : null
				};
				return r.rect = {get: u}, o.rect = {get: u}, t.forEach(function (e) {
					n[e] = void 0 === a[e] ? g[e] : a[e]
				}), {
					write: function () {
						if (R(s, n)) return O(i.element, n), Object.assign(s, Object.assign({}, n)), !0
					}, destroy: function () {
					}
				}
			}, listeners: function (e) {
				e.mixinConfig, e.viewProps, e.viewInternalAPI;
				var t, n = e.viewExternalAPI, r = (e.viewState, e.view), o = [], i = (t = r.element, function (e, n) {
					t.addEventListener(e, n)
				}), a = function (e) {
					return function (t, n) {
						e.removeEventListener(t, n)
					}
				}(r.element);
				return n.on = function (e, t) {
					o.push({type: e, fn: t}), i(e, t)
				}, n.off = function (e, t) {
					o.splice(o.findIndex(function (n) {
						return n.type === e && n.fn === t
					}), 1), a(e, t)
				}, {
					write: function () {
						return !0
					}, destroy: function () {
						o.forEach(function (e) {
							a(e.type, e.fn)
						})
					}
				}
			}, animations: function (e) {
				var n = e.mixinConfig, r = e.viewProps, o = e.viewInternalAPI, i = e.viewExternalAPI,
					a = Object.assign({}, r), s = [];
				return t(n, function (e, t) {
					var n = v(t);
					n && (n.onupdate = function (t) {
						r[e] = t
					}, n.target = a[e], m([{
						key: e, setter: function (e) {
							n.target !== e && (n.target = e)
						}, getter: function () {
							return r[e]
						}
					}], [o, i], r, !0), s.push(n))
				}), {
					write: function (e) {
						var t = document.hidden, n = !0;
						return s.forEach(function (r) {
							r.resting || (n = !1), r.interpolate(e, t)
						}), n
					}, destroy: function () {
					}
				}
			}, apis: function (e) {
				var t = e.mixinConfig, n = e.viewProps, r = e.viewExternalAPI;
				m(t, r, n)
			}
		}, D = function () {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
				t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
				n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
			return t.layoutCalculated || (e.paddingTop = parseInt(n.paddingTop, 10) || 0, e.marginTop = parseInt(n.marginTop, 10) || 0, e.marginRight = parseInt(n.marginRight, 10) || 0, e.marginBottom = parseInt(n.marginBottom, 10) || 0, e.marginLeft = parseInt(n.marginLeft, 10) || 0, t.layoutCalculated = !0), e.left = t.offsetLeft || 0, e.top = t.offsetTop || 0, e.width = t.offsetWidth || 0, e.height = t.offsetHeight || 0, e.right = e.left + e.width, e.bottom = e.top + e.height, e.scrollTop = t.scrollTop, e.hidden = null === t.offsetParent, e
		}, S = function () {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.tag,
				r = void 0 === t ? "div" : t, o = e.name, i = void 0 === o ? null : o, l = e.attributes,
				c = void 0 === l ? {} : l, p = e.read, E = void 0 === p ? function () {
				} : p, _ = e.write, T = void 0 === _ ? function () {
				} : _, I = e.create, v = void 0 === I ? function () {
				} : I, m = e.destroy, h = void 0 === m ? function () {
				} : m, g = e.filterFrameActionsForChild, R = void 0 === g ? function (e, t) {
					return t
				} : g, O = e.didCreateView, S = void 0 === O ? function () {
				} : O, A = e.didWriteView, L = void 0 === A ? function () {
				} : A, b = e.ignoreRect, P = void 0 !== b && b, M = e.ignoreRectUpdate, w = void 0 !== M && M, C = e.mixins,
				N = void 0 === C ? [] : C;
			return function (e) {
				var t, o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
					l = a(r, "filepond--" + i, c), p = window.getComputedStyle(l, null), _ = D(), I = null, m = !1, g = [],
					O = [], A = {}, b = {}, M = [T], C = [E], G = [h], U = function () {
						return l
					}, B = function () {
						return g.concat()
					}, F = function () {
						return I || (I = d(_, g, [0, 0], [1, 1]))
					}, q = {
						element: {get: U}, style: {
							get: function () {
								return p
							}
						}, childViews: {get: B}
					}, V = Object.assign({}, q, {
						rect: {get: F}, ref: {
							get: function () {
								return A
							}
						}, is: function (e) {
							return i === e
						}, appendChild: (t = l, function (e, n) {
							void 0 !== n && t.children[n] ? t.insertBefore(e, t.children[n]) : t.appendChild(e)
						}), createChildView: function (e) {
							return function (t, n) {
								return t(e, n)
							}
						}(e), linkView: function (e) {
							return g.push(e), e
						}, unlinkView: function (e) {
							g.splice(g.indexOf(e), 1)
						}, appendChildView: s(0, g), removeChildView: u(l, g), registerWriter: function (e) {
							return M.push(e)
						}, registerReader: function (e) {
							return C.push(e)
						}, registerDestroyer: function (e) {
							return G.push(e)
						}, invalidateLayout: function () {
							return l.layoutCalculated = !1
						}, dispatch: e.dispatch, query: e.query
					}), x = {
						element: {get: U}, childViews: {get: B}, rect: {get: F}, resting: {
							get: function () {
								return m
							}
						}, isRectIgnored: function () {
							return P
						}, _read: function () {
							I = null, g.forEach(function (e) {
								return e._read()
							}), !(w && _.width && _.height) && D(_, l, p);
							var e = {root: k, props: o, rect: _};
							C.forEach(function (t) {
								return t(e)
							})
						}, _write: function (e, t, n) {
							var r = 0 === t.length;
							return M.forEach(function (i) {
								!1 === i({props: o, root: k, actions: t, timestamp: e, shouldOptimize: n}) && (r = !1)
							}), O.forEach(function (t) {
								!1 === t.write(e) && (r = !1)
							}), g.filter(function (e) {
								return !!e.element.parentNode
							}).forEach(function (o) {
								o._write(e, R(o, t), n) || (r = !1)
							}), g.forEach(function (o, i) {
								o.element.parentNode || (k.appendChild(o.element, i), o._read(), o._write(e, R(o, t), n), r = !1)
							}), m = r, L({props: o, root: k, actions: t, timestamp: e}), r
						}, _destroy: function () {
							O.forEach(function (e) {
								return e.destroy()
							}), G.forEach(function (e) {
								e({root: k, props: o})
							}), g.forEach(function (e) {
								return e._destroy()
							})
						}
					}, Y = Object.assign({}, q, {
						rect: {
							get: function () {
								return _
							}
						}
					});
				Object.keys(N).sort(function (e, t) {
					return "styles" === e ? 1 : "styles" === t ? -1 : 0
				}).forEach(function (e) {
					var t = y[e]({
						mixinConfig: N[e],
						viewProps: o,
						viewState: b,
						viewInternalAPI: V,
						viewExternalAPI: x,
						view: n(Y)
					});
					t && O.push(t)
				});
				var k = n(V);
				v({root: k, props: o});
				var j = f(l);
				return g.forEach(function (e, t) {
					k.appendChild(e.element, j + t)
				}), S(k), n(x)
			}
		}, A = function (e, t) {
			return function (n) {
				var r = n.root, o = n.props, i = n.actions, a = void 0 === i ? [] : i, s = n.timestamp,
					u = n.shouldOptimize;
				a.filter(function (t) {
					return e[t.type]
				}).forEach(function (t) {
					return e[t.type]({root: r, props: o, action: t.data, timestamp: s, shouldOptimize: u})
				}), t && t({root: r, props: o, actions: a, timestamp: s, shouldOptimize: u})
			}
		}, L = function (e, t) {
			return t.parentNode.insertBefore(e, t)
		}, b = function (e, t) {
			return t.parentNode.insertBefore(e, t.nextSibling)
		}, P = function (e) {
			return Array.isArray(e)
		}, M = function (e) {
			return null == e
		}, w = function (e) {
			return e.trim()
		}, C = function (e) {
			return "" + e
		}, N = function (e) {
			return "boolean" == typeof e
		}, G = function (e) {
			return N(e) ? e : "true" === e
		}, U = function (e) {
			return "string" == typeof e
		}, B = function (e) {
			return _(e) ? e : U(e) ? C(e).replace(/[a-z]+/gi, "") : 0
		}, F = function (e) {
			return parseInt(B(e), 10)
		}, q = function (e) {
			return parseFloat(B(e))
		}, V = function (e) {
			return _(e) && isFinite(e) && Math.floor(e) === e
		}, x = function (e) {
			var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e3;
			if (V(e)) return e;
			var n = C(e).trim();
			return /MB$/i.test(n) ? (n = n.replace(/MB$i/, "").trim(), F(n) * t * t) : /KB/i.test(n) ? (n = n.replace(/KB$i/, "").trim(), F(n) * t) : F(n)
		}, Y = function (e) {
			return "function" == typeof e
		}, k = {process: "POST", patch: "PATCH", revert: "DELETE", fetch: "GET", restore: "GET", load: "GET"},
		j = function (e, t, n, r, o) {
			if (null === t) return null;
			if ("function" == typeof t) return t;
			var i = {
				url: "GET" === n || "PATCH" === n ? "?" + e + "=" : "",
				method: n,
				headers: o,
				withCredentials: !1,
				timeout: r,
				onload: null,
				ondata: null,
				onerror: null
			};
			if (U(t)) return i.url = t, i;
			if (Object.assign(i, t), U(i.headers)) {
				var a = i.headers.split(/:(.+)/);
				i.headers = {header: a[0], value: a[1]}
			}
			return i.withCredentials = G(i.withCredentials), i
		}, H = function (e) {
			return "object" == typeof e && null !== e
		}, X = function (e) {
			return P(e) ? "array" : function (e) {
				return null === e
			}(e) ? "null" : V(e) ? "int" : /^[0-9]+ ?(?:GB|MB|KB)$/gi.test(e) ? "bytes" : function (e) {
				return H(e) && U(e.url) && H(e.process) && H(e.revert) && H(e.restore) && H(e.fetch)
			}(e) ? "api" : typeof e
		}, W = {
			array: function (e) {
				var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ",";
				return M(e) ? [] : P(e) ? e : C(e).split(t).map(w).filter(function (e) {
					return e.length
				})
			}, boolean: G, int: function (e) {
				return "bytes" === X(e) ? x(e) : F(e)
			}, number: q, float: q, bytes: x, string: function (e) {
				return Y(e) ? e : C(e)
			}, function: function (e) {
				return function (e) {
					for (var t = self, n = e.split("."), r = null; r = n.shift();) if (!(t = t[r])) return null;
					return t
				}(e)
			}, serverapi: function (e) {
				return (r = {}).url = U(n = e) ? n : n.url || "", r.timeout = n.timeout ? parseInt(n.timeout, 10) : 0, r.headers = n.headers ? n.headers : {}, t(k, function (e) {
					r[e] = j(e, n[e], k[e], r.timeout, r.headers)
				}), r.process = n.process || U(n) || n.url ? r.process : null, r.remove = n.remove || null, delete r.headers, r;
				var n, r
			}, object: function (e) {
				try {
					return JSON.parse(e.replace(/{\s*'/g, '{"').replace(/'\s*}/g, '"}').replace(/'\s*:/g, '":').replace(/:\s*'/g, ':"').replace(/,\s*'/g, ',"').replace(/'\s*,/g, '",'))
				} catch (e) {
					return null
				}
			}
		}, z = function (e, t, n) {
			if (e === t) return e;
			var r, o = X(e);
			if (o !== n) {
				var i = (r = e, W[n](r));
				if (o = X(i), null === i) throw'Trying to assign value with incorrect type to "' + option + '", allowed type: "' + n + '"';
				e = i
			}
			return e
		}, Q = function (e) {
			var r = {};
			return t(e, function (t) {
				var n, o, i, a = e[t];
				r[t] = (n = a[0], o = a[1], i = n, {
					enumerable: !0, get: function () {
						return i
					}, set: function (e) {
						i = z(e, n, o)
					}
				})
			}), n(r)
		}, Z = function (e) {
			var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "-";
			return e.split(/(?=[A-Z])/).map(function (e) {
				return e.toLowerCase()
			}).join(t)
		}, K = function (e) {
			return function (n, r, o) {
				var i = {};
				return t(e, function (e) {
					var t = Z(e, "_").toUpperCase();
					i["SET_" + t] = function (r) {
						try {
							o.options[e] = r.value
						} catch (e) {
						}
						n("DID_SET_" + t, {value: o.options[e]})
					}
				}), i
			}
		}, $ = function (e) {
			return function (n) {
				var r = {};
				return t(e, function (e) {
					r["GET_" + Z(e, "_").toUpperCase()] = function (t) {
						return n.options[e]
					}
				}), r
			}
		}, J = 1, ee = 2, te = 3, ne = 4, re = 5, oe = function () {
			return Math.random().toString(36).substr(2, 9)
		};

	function ie(e) {
		this.wrapped = e
	}

	function ae(e) {
		var t, n;

		function r(t, n) {
			try {
				var i = e[t](n), a = i.value, s = a instanceof ie;
				Promise.resolve(s ? a.wrapped : a).then(function (e) {
					s ? r("next", e) : o(i.done ? "return" : "normal", e)
				}, function (e) {
					r("throw", e)
				})
			} catch (e) {
				o("throw", e)
			}
		}

		function o(e, o) {
			switch (e) {
				case"return":
					t.resolve({value: o, done: !0});
					break;
				case"throw":
					t.reject(o);
					break;
				default:
					t.resolve({value: o, done: !1})
			}
			(t = t.next) ? r(t.key, t.arg) : n = null
		}

		this._invoke = function (e, o) {
			return new Promise(function (i, a) {
				var s = {key: e, arg: o, resolve: i, reject: a, next: null};
				n ? n = n.next = s : (t = n = s, r(e, o))
			})
		}, "function" != typeof e.return && (this.return = void 0)
	}

	function se(e, t) {
		if (null == e) return {};
		var n, r, o = function (e, t) {
			if (null == e) return {};
			var n, r, o = {}, i = Object.keys(e);
			for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
			return o
		}(e, t);
		if (Object.getOwnPropertySymbols) {
			var i = Object.getOwnPropertySymbols(e);
			for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
		}
		return o
	}

	"function" == typeof Symbol && Symbol.asyncIterator && (ae.prototype[Symbol.asyncIterator] = function () {
		return this
	}), ae.prototype.next = function (e) {
		return this._invoke("next", e)
	}, ae.prototype.throw = function (e) {
		return this._invoke("throw", e)
	}, ae.prototype.return = function (e) {
		return this._invoke("return", e)
	};

	function ue(e) {
		return function (e) {
			if (Array.isArray(e)) {
				for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
				return n
			}
		}(e) || le(e) || function () {
			throw new TypeError("Invalid attempt to spread non-iterable instance")
		}()
	}

	function le(e) {
		if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
	}

	var ce, fe, de = function (e, t) {
			return e.splice(t, 1)
		}, pe = function () {
			var e = [], t = function (t, n) {
				de(e, e.findIndex(function (e) {
					return e.event === t && (e.cb === n || !n)
				}))
			}, n = function (t, n, r) {
				e.filter(function (e) {
					return e.event === t
				}).map(function (e) {
					return e.cb
				}).forEach(function (e) {
					return function (e, t) {
						t ? e() : document.hidden ? Promise.resolve(1).then(e) : setTimeout(e, 0)
					}(function () {
						return e.apply(void 0, ue(n))
					}, r)
				})
			};
			return {
				fireSync: function (e) {
					for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) r[o - 1] = arguments[o];
					n(e, r, !0)
				}, fire: function (e) {
					for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) r[o - 1] = arguments[o];
					n(e, r, !1)
				}, on: function (t, n) {
					e.push({event: t, cb: n})
				}, onOnce: function (n, r) {
					e.push({
						event: n, cb: function () {
							t(n, r), r.apply(void 0, arguments)
						}
					})
				}, off: t
			}
		}, Ee = function (e, t, n) {
			Object.getOwnPropertyNames(e).filter(function (e) {
				return !n.includes(e)
			}).forEach(function (n) {
				return Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n))
			})
		},
		_e = ["fire", "process", "revert", "load", "on", "off", "onOnce", "retryLoad", "extend", "archive", "archived", "release", "released", "requestProcessing", "freeze"],
		Te = function (e) {
			var t = {};
			return Ee(e, t, _e), t
		}, Ie = {
			INIT: 1,
			IDLE: 2,
			PROCESSING_QUEUED: 9,
			PROCESSING: 3,
			PROCESSING_COMPLETE: 5,
			PROCESSING_ERROR: 6,
			PROCESSING_REVERT_ERROR: 10,
			LOADING: 7,
			LOAD_ERROR: 8
		}, ve = {INPUT: 1, LIMBO: 2, LOCAL: 3}, me = function (e) {
			return /[^0-9]+/.exec(e)
		}, he = function () {
			return me(1.1.toLocaleString())[0]
		}, ge = {
			BOOLEAN: "boolean",
			INT: "int",
			NUMBER: "number",
			STRING: "string",
			ARRAY: "array",
			OBJECT: "object",
			FUNCTION: "function",
			ACTION: "action",
			SERVER_API: "serverapi",
			REGEX: "regex"
		}, Re = [], Oe = function (e, t, n) {
			return new Promise(function (r, o) {
				var i = Re.filter(function (t) {
					return t.key === e
				}).map(function (e) {
					return e.cb
				});
				if (0 !== i.length) {
					var a = i.shift();
					i.reduce(function (e, t) {
						return e.then(function (e) {
							return t(e, n)
						})
					}, a(t, n)).then(function (e) {
						return r(e)
					}).catch(function (e) {
						return o(e)
					})
				} else r(t)
			})
		}, ye = function (e, t, n) {
			return Re.filter(function (t) {
				return t.key === e
			}).map(function (e) {
				return e.cb(t, n)
			})
		}, De = function (e, t) {
			return Re.push({key: e, cb: t})
		}, Se = function () {
			return Object.assign({}, Ae)
		}, Ae = {
			id: [null, ge.STRING],
			name: ["filepond", ge.STRING],
			disabled: [!1, ge.BOOLEAN],
			className: [null, ge.STRING],
			required: [!1, ge.BOOLEAN],
			captureMethod: [null, ge.STRING],
			allowSyncAcceptAttribute: [!0, ge.BOOLEAN],
			allowDrop: [!0, ge.BOOLEAN],
			allowBrowse: [!0, ge.BOOLEAN],
			allowPaste: [!0, ge.BOOLEAN],
			allowMultiple: [!1, ge.BOOLEAN],
			allowReplace: [!0, ge.BOOLEAN],
			allowRevert: [!0, ge.BOOLEAN],
			allowRemove: [!0, ge.BOOLEAN],
			allowProcess: [!0, ge.BOOLEAN],
			allowReorder: [!1, ge.BOOLEAN],
			allowDirectoriesOnly: [!1, ge.BOOLEAN],
			storeAsFile: [!1, ge.BOOLEAN],
			forceRevert: [!1, ge.BOOLEAN],
			maxFiles: [null, ge.INT],
			checkValidity: [!1, ge.BOOLEAN],
			itemInsertLocationFreedom: [!0, ge.BOOLEAN],
			itemInsertLocation: ["before", ge.STRING],
			itemInsertInterval: [75, ge.INT],
			dropOnPage: [!1, ge.BOOLEAN],
			dropOnElement: [!0, ge.BOOLEAN],
			dropValidation: [!1, ge.BOOLEAN],
			ignoredFiles: [[".ds_store", "thumbs.db", "desktop.ini"], ge.ARRAY],
			instantUpload: [!0, ge.BOOLEAN],
			maxParallelUploads: [2, ge.INT],
			allowMinimumUploadDuration: [!0, ge.BOOLEAN],
			chunkUploads: [!1, ge.BOOLEAN],
			chunkForce: [!1, ge.BOOLEAN],
			chunkSize: [5e6, ge.INT],
			chunkRetryDelays: [[500, 1e3, 3e3], ge.ARRAY],
			server: [null, ge.SERVER_API],
			fileSizeBase: [1e3, ge.INT],
			labelFileSizeBytes: ["bytes", ge.STRING],
			labelFileSizeKilobytes: ["KB", ge.STRING],
			labelFileSizeMegabytes: ["MB", ge.STRING],
			labelFileSizeGigabytes: ["GB", ge.STRING],
			labelDecimalSeparator: [he(), ge.STRING],
			labelThousandsSeparator: [(ce = he(), fe = 1e3.toLocaleString(), fe !== 1e3.toString() ? me(fe)[0] : "." === ce ? "," : "."), ge.STRING],
			labelIdle: ['Drag & Drop your files or <span class="filepond--label-action">Browse</span>', ge.STRING],
			labelInvalidField: ["Field contains invalid files", ge.STRING],
			labelFileWaitingForSize: ["Waiting for size", ge.STRING],
			labelFileSizeNotAvailable: ["Size not available", ge.STRING],
			labelFileCountSingular: ["file in list", ge.STRING],
			labelFileCountPlural: ["files in list", ge.STRING],
			labelFileLoading: ["Loading", ge.STRING],
			labelFileAdded: ["Added", ge.STRING],
			labelFileLoadError: ["Error during load", ge.STRING],
			labelFileRemoved: ["Removed", ge.STRING],
			labelFileRemoveError: ["Error during remove", ge.STRING],
			labelFileProcessing: ["Uploading", ge.STRING],
			labelFileProcessingComplete: ["Upload complete", ge.STRING],
			labelFileProcessingAborted: ["Upload cancelled", ge.STRING],
			labelFileProcessingError: ["Error during upload", ge.STRING],
			labelFileProcessingRevertError: ["Error during revert", ge.STRING],
			labelTapToCancel: ["tap to cancel", ge.STRING],
			labelTapToRetry: ["tap to retry", ge.STRING],
			labelTapToUndo: ["tap to undo", ge.STRING],
			labelButtonRemoveItem: ["Remove", ge.STRING],
			labelButtonAbortItemLoad: ["Abort", ge.STRING],
			labelButtonRetryItemLoad: ["Retry", ge.STRING],
			labelButtonAbortItemProcessing: ["Cancel", ge.STRING],
			labelButtonUndoItemProcessing: ["Undo", ge.STRING],
			labelButtonRetryItemProcessing: ["Retry", ge.STRING],
			labelButtonProcessItem: ["Upload", ge.STRING],
			iconRemove: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z" fill="currentColor" fill-rule="nonzero"/></svg>', ge.STRING],
			iconProcess: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M14 10.414v3.585a1 1 0 0 1-2 0v-3.585l-1.293 1.293a1 1 0 0 1-1.414-1.415l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.415L14 10.414zM9 18a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2H9z" fill="currentColor" fill-rule="evenodd"/></svg>', ge.STRING],
			iconRetry: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M10.81 9.185l-.038.02A4.997 4.997 0 0 0 8 13.683a5 5 0 0 0 5 5 5 5 0 0 0 5-5 1 1 0 0 1 2 0A7 7 0 1 1 9.722 7.496l-.842-.21a.999.999 0 1 1 .484-1.94l3.23.806c.535.133.86.675.73 1.21l-.804 3.233a.997.997 0 0 1-1.21.73.997.997 0 0 1-.73-1.21l.23-.928v-.002z" fill="currentColor" fill-rule="nonzero"/></svg>', ge.STRING],
			iconUndo: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M9.185 10.81l.02-.038A4.997 4.997 0 0 1 13.683 8a5 5 0 0 1 5 5 5 5 0 0 1-5 5 1 1 0 0 0 0 2A7 7 0 1 0 7.496 9.722l-.21-.842a.999.999 0 1 0-1.94.484l.806 3.23c.133.535.675.86 1.21.73l3.233-.803a.997.997 0 0 0 .73-1.21.997.997 0 0 0-1.21-.73l-.928.23-.002-.001z" fill="currentColor" fill-rule="nonzero"/></svg>', ge.STRING],
			iconDone: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M18.293 9.293a1 1 0 0 1 1.414 1.414l-7.002 7a1 1 0 0 1-1.414 0l-3.998-4a1 1 0 1 1 1.414-1.414L12 15.586l6.294-6.293z" fill="currentColor" fill-rule="nonzero"/></svg>', ge.STRING],
			oninit: [null, ge.FUNCTION],
			onwarning: [null, ge.FUNCTION],
			onerror: [null, ge.FUNCTION],
			onactivatefile: [null, ge.FUNCTION],
			oninitfile: [null, ge.FUNCTION],
			onaddfilestart: [null, ge.FUNCTION],
			onaddfileprogress: [null, ge.FUNCTION],
			onaddfile: [null, ge.FUNCTION],
			onprocessfilestart: [null, ge.FUNCTION],
			onprocessfileprogress: [null, ge.FUNCTION],
			onprocessfileabort: [null, ge.FUNCTION],
			onprocessfilerevert: [null, ge.FUNCTION],
			onprocessfile: [null, ge.FUNCTION],
			onprocessfiles: [null, ge.FUNCTION],
			onremovefile: [null, ge.FUNCTION],
			onpreparefile: [null, ge.FUNCTION],
			onupdatefiles: [null, ge.FUNCTION],
			onreorderfiles: [null, ge.FUNCTION],
			beforeDropFile: [null, ge.FUNCTION],
			beforeAddFile: [null, ge.FUNCTION],
			beforeRemoveFile: [null, ge.FUNCTION],
			beforePrepareFile: [null, ge.FUNCTION],
			stylePanelLayout: [null, ge.STRING],
			stylePanelAspectRatio: [null, ge.STRING],
			styleItemPanelAspectRatio: [null, ge.STRING],
			styleButtonRemoveItemPosition: ["left", ge.STRING],
			styleButtonProcessItemPosition: ["right", ge.STRING],
			styleLoadIndicatorPosition: ["right", ge.STRING],
			styleProgressIndicatorPosition: ["right", ge.STRING],
			styleButtonRemoveItemAlign: [!1, ge.BOOLEAN],
			files: [[], ge.ARRAY],
			credits: [["https://pqina.nl/", "Powered by PQINA"], ge.ARRAY]
		}, Le = function (e, t) {
			return M(t) ? e[0] || null : V(t) ? e[t] || null : ("object" == typeof t && (t = t.id), e.find(function (e) {
				return e.id === t
			}) || null)
		}, be = function (e) {
			if (M(e)) return e;
			if (/:/.test(e)) {
				var t = e.split(":");
				return t[1] / t[0]
			}
			return parseFloat(e)
		}, Pe = function (e) {
			return e.filter(function (e) {
				return !e.archived
			})
		}, Me = {EMPTY: 0, IDLE: 1, ERROR: 2, BUSY: 3, READY: 4}, we = null,
		Ce = [Ie.LOAD_ERROR, Ie.PROCESSING_ERROR, Ie.PROCESSING_REVERT_ERROR],
		Ne = [Ie.LOADING, Ie.PROCESSING, Ie.PROCESSING_QUEUED, Ie.INIT], Ge = [Ie.PROCESSING_COMPLETE],
		Ue = function (e) {
			return Ce.includes(e.status)
		}, Be = function (e) {
			return Ne.includes(e.status)
		}, Fe = function (e) {
			return Ge.includes(e.status)
		}, qe = function (e) {
			return H(e.options.server) && (H(e.options.server.process) || Y(e.options.server.process))
		}, Ve = function (e) {
			return {
				GET_STATUS: function () {
					var t = Pe(e.items), n = Me.EMPTY, r = Me.ERROR, o = Me.BUSY, i = Me.IDLE, a = Me.READY;
					return 0 === t.length ? n : t.some(Ue) ? r : t.some(Be) ? o : t.some(Fe) ? a : i
				}, GET_ITEM: function (t) {
					return Le(e.items, t)
				}, GET_ACTIVE_ITEM: function (t) {
					return Le(Pe(e.items), t)
				}, GET_ACTIVE_ITEMS: function () {
					return Pe(e.items)
				}, GET_ITEMS: function () {
					return e.items
				}, GET_ITEM_NAME: function (t) {
					var n = Le(e.items, t);
					return n ? n.filename : null
				}, GET_ITEM_SIZE: function (t) {
					var n = Le(e.items, t);
					return n ? n.fileSize : null
				}, GET_STYLES: function () {
					return Object.keys(e.options).filter(function (e) {
						return /^style/.test(e)
					}).map(function (t) {
						return {name: t, value: e.options[t]}
					})
				}, GET_PANEL_ASPECT_RATIO: function () {
					return /circle/.test(e.options.stylePanelLayout) ? 1 : be(e.options.stylePanelAspectRatio)
				}, GET_ITEM_PANEL_ASPECT_RATIO: function () {
					return e.options.styleItemPanelAspectRatio
				}, GET_ITEMS_BY_STATUS: function (t) {
					return Pe(e.items).filter(function (e) {
						return e.status === t
					})
				}, GET_TOTAL_ITEMS: function () {
					return Pe(e.items).length
				}, SHOULD_UPDATE_FILE_INPUT: function () {
					return e.options.storeAsFile && function () {
						if (null === we) try {
							var e = new DataTransfer;
							e.items.add(new File(["hello world"], "This_Works.html"));
							var t = document.createElement("input");
							t.setAttribute("type", "file"), t.files = e.files, we = 1 === t.files.length
						} catch (e) {
							we = !1
						}
						return we
					}() && !qe(e)
				}, IS_ASYNC: function () {
					return qe(e)
				}, GET_FILE_SIZE_LABELS: function (e) {
					return {
						labelBytes: e("GET_LABEL_FILE_SIZE_BYTES") || void 0,
						labelKilobytes: e("GET_LABEL_FILE_SIZE_KILOBYTES") || void 0,
						labelMegabytes: e("GET_LABEL_FILE_SIZE_MEGABYTES") || void 0,
						labelGigabytes: e("GET_LABEL_FILE_SIZE_GIGABYTES") || void 0
					}
				}
			}
		}, xe = function (e, t, n) {
			return Math.max(Math.min(n, e), t)
		}, Ye = function (e) {
			return /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)\s*$/i.test(e)
		}, ke = function (e) {
			return e.split("/").pop().split("?").shift()
		}, je = function (e) {
			return e.split(".").pop()
		}, He = function (e) {
			var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
			return (t + e).slice(-t.length)
		}, Xe = function () {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Date;
			return e.getFullYear() + "-" + He(e.getMonth() + 1, "00") + "-" + He(e.getDate(), "00") + "_" + He(e.getHours(), "00") + "-" + He(e.getMinutes(), "00") + "-" + He(e.getSeconds(), "00")
		}, We = function (e, t) {
			var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
				r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
				o = "string" == typeof n ? e.slice(0, e.size, n) : e.slice(0, e.size, e.type);
			return o.lastModifiedDate = new Date, e._relativePath && (o._relativePath = e._relativePath), U(t) || (t = Xe()), t && null === r && je(t) ? o.name = t : (r = r || function (e) {
				if ("string" != typeof e) return "";
				var t = e.split("/").pop();
				return /svg/.test(t) ? "svg" : /zip|compressed/.test(t) ? "zip" : /plain/.test(t) ? "txt" : /msword/.test(t) ? "doc" : /[a-z]+/.test(t) ? "jpeg" === t ? "jpg" : t : ""
			}(o.type), o.name = t + (r ? "." + r : "")), o
		}, ze = function (e, t) {
			var n = window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
			if (n) {
				var r = new n;
				return r.append(e), r.getBlob(t)
			}
			return new Blob([e], {type: t})
		}, Qe = function (e) {
			return (/^data:(.+);/.exec(e) || [])[1] || null
		}, Ze = function (e) {
			var t = Qe(e);
			return function (e, t) {
				for (var n = new ArrayBuffer(e.length), r = new Uint8Array(n), o = 0; o < e.length; o++) r[o] = e.charCodeAt(o);
				return ze(n, t)
			}(function (e) {
				return atob(function (e) {
					return e.split(",")[1].replace(/\s/g, "")
				}(e))
			}(e), t)
		}, Ke = function (e) {
			if (!/^content-disposition:/i.test(e)) return null;
			var t = e.split(/filename=|filename\*=.+''/).splice(1).map(function (e) {
				return e.trim().replace(/^["']|[;"']{0,2}$/g, "")
			}).filter(function (e) {
				return e.length
			});
			return t.length ? decodeURI(t[t.length - 1]) : null
		}, $e = function (e) {
			if (/content-length:/i.test(e)) {
				var t = e.match(/[0-9]+/)[0];
				return t ? parseInt(t, 10) : null
			}
			return null
		}, Je = function (e) {
			return /x-content-transfer-id:/i.test(e) && (e.split(":")[1] || "").trim() || null
		}, et = function (e) {
			var t = {source: null, name: null, size: null}, n = e.split("\n"), r = !0, o = !1, i = void 0;
			try {
				for (var a, s = n[Symbol.iterator](); !(r = (a = s.next()).done); r = !0) {
					var u = a.value, l = Ke(u);
					if (l) t.name = l; else {
						var c = $e(u);
						if (c) t.size = c; else {
							var f = Je(u);
							f && (t.source = f)
						}
					}
				}
			} catch (e) {
				o = !0, i = e
			} finally {
				try {
					r || null == s.return || s.return()
				} finally {
					if (o) throw i
				}
			}
			return t
		}, tt = function (e) {
			var t = {source: null, complete: !1, progress: 0, size: null, timestamp: null, duration: 0, request: null},
				n = function (n) {
					e ? (t.timestamp = Date.now(), t.request = e(n, function (e) {
						t.duration = Date.now() - t.timestamp, t.complete = !0, e instanceof Blob && (e = We(e, e.name || ke(n))), r.fire("load", e instanceof Blob ? e : e ? e.body : null)
					}, function (e) {
						r.fire("error", "string" == typeof e ? {type: "error", code: 0, body: e} : e)
					}, function (e, n, o) {
						o && (t.size = o), t.duration = Date.now() - t.timestamp, e ? (t.progress = n / o, r.fire("progress", t.progress)) : t.progress = null
					}, function () {
						r.fire("abort")
					}, function (e) {
						var n = et("string" == typeof e ? e : e.headers);
						r.fire("meta", {size: t.size || n.size, filename: n.name, source: n.source})
					})) : r.fire("error", {type: "error", body: "Can't load URL", code: 400})
				}, r = Object.assign({}, pe(), {
					setSource: function (e) {
						return t.source = e
					}, getProgress: function () {
						return t.progress
					}, abort: function () {
						t.request && t.request.abort && t.request.abort()
					}, load: function () {
						var e, o, i = t.source;
						r.fire("init", i), i instanceof File ? r.fire("load", i) : i instanceof Blob ? r.fire("load", We(i, i.name)) : Ye(i) ? r.fire("load", We(Ze(i), e, null, o)) : n(i)
					}
				});
			return r
		}, nt = function (e) {
			return /GET|HEAD/.test(e)
		}, rt = function (e, t, n) {
			var r = {
				onheaders: function () {
				}, onprogress: function () {
				}, onload: function () {
				}, ontimeout: function () {
				}, onerror: function () {
				}, onabort: function () {
				}, abort: function () {
					o = !0, a.abort()
				}
			}, o = !1, i = !1;
			n = Object.assign({
				method: "POST",
				headers: {},
				withCredentials: !1
			}, n), t = encodeURI(t), nt(n.method) && e && (t = "" + t + encodeURIComponent("string" == typeof e ? e : JSON.stringify(e)));
			var a = new XMLHttpRequest;
			return (nt(n.method) ? a : a.upload).onprogress = function (e) {
				o || r.onprogress(e.lengthComputable, e.loaded, e.total)
			}, a.onreadystatechange = function () {
				a.readyState < 2 || 4 === a.readyState && 0 === a.status || i || (i = !0, r.onheaders(a))
			}, a.onload = function () {
				a.status >= 200 && a.status < 300 ? r.onload(a) : r.onerror(a)
			}, a.onerror = function () {
				return r.onerror(a)
			}, a.onabort = function () {
				o = !0, r.onabort()
			}, a.ontimeout = function () {
				return r.ontimeout(a)
			}, a.open(n.method, t, !0), V(n.timeout) && (a.timeout = n.timeout), Object.keys(n.headers).forEach(function (e) {
				var t = unescape(encodeURIComponent(n.headers[e]));
				a.setRequestHeader(e, t)
			}), n.responseType && (a.responseType = n.responseType), n.withCredentials && (a.withCredentials = !0), a.send(e), r
		}, ot = function (e, t, n, r) {
			return {type: e, code: t, body: n, headers: r}
		}, it = function (e) {
			return function (t) {
				e(ot("error", 0, "Timeout", t.getAllResponseHeaders()))
			}
		}, at = function (e) {
			return /\?/.test(e)
		}, st = function () {
			for (var e = "", t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
			return n.forEach(function (t) {
				e += at(e) && at(t) ? t.replace(/\?/, "&") : t
			}), e
		}, ut = function () {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
				t = arguments.length > 1 ? arguments[1] : void 0;
			if ("function" == typeof t) return t;
			if (!t || !U(t.url)) return null;
			var n = t.onload || function (e) {
				return e
			}, r = t.onerror || function (e) {
				return null
			};
			return function (o, i, a, s, u, l) {
				var c = rt(o, st(e, t.url), Object.assign({}, t, {responseType: "blob"}));
				return c.onload = function (e) {
					var r = e.getAllResponseHeaders(), a = et(r).name || ke(o);
					i(ot("load", e.status, "HEAD" === t.method ? null : We(n(e.response), a), r))
				}, c.onerror = function (e) {
					a(ot("error", e.status, r(e.response) || e.statusText, e.getAllResponseHeaders()))
				}, c.onheaders = function (e) {
					l(ot("headers", e.status, null, e.getAllResponseHeaders()))
				}, c.ontimeout = it(a), c.onprogress = s, c.onabort = u, c
			}
		}, lt = 0, ct = 1, ft = 2, dt = 3, pt = 4, Et = function (e, t, n, r, o, i, a, s, u, l, c) {
			for (var f = [], d = c.chunkTransferId, p = c.chunkServer, E = c.chunkSize, _ = c.chunkRetryDelays, T = {
				serverId: d,
				aborted: !1
			}, I = t.ondata || function (e) {
				return e
			}, v = t.onload || function (e, t) {
				return "HEAD" === t ? e.getResponseHeader("Upload-Offset") : e.response
			}, m = t.onerror || function (e) {
				return null
			}, h = Math.floor(r.size / E), g = 0; g <= h; g++) {
				var R = g * E, O = r.slice(R, R + E, "application/offset+octet-stream");
				f[g] = {
					index: g,
					size: O.size,
					offset: R,
					data: O,
					file: r,
					progress: 0,
					retries: ue(_),
					status: lt,
					error: null,
					request: null,
					timeout: null
				}
			}
			var y, D, S, A, L = function (e) {
				return e.status === lt || e.status === dt
			}, b = function (t) {
				if (!T.aborted) if (t = t || f.find(L)) {
					t.status = ft, t.progress = null;
					var n = p.ondata || function (e) {
							return e
						}, o = p.onerror || function (e) {
							return null
						}, s = st(e, p.url, T.serverId),
						l = "function" == typeof p.headers ? p.headers(t) : Object.assign({}, p.headers, {
							"Content-Type": "application/offset+octet-stream",
							"Upload-Offset": t.offset,
							"Upload-Length": r.size,
							"Upload-Name": r.name
						}), c = t.request = rt(n(t.data), s, Object.assign({}, p, {headers: l}));
					c.onload = function () {
						t.status = ct, t.request = null, w()
					}, c.onprogress = function (e, n, r) {
						t.progress = e ? n : null, M()
					}, c.onerror = function (e) {
						t.status = dt, t.request = null, t.error = o(e.response) || e.statusText, P(t) || a(ot("error", e.status, o(e.response) || e.statusText, e.getAllResponseHeaders()))
					}, c.ontimeout = function (e) {
						t.status = dt, t.request = null, P(t) || it(a)(e)
					}, c.onabort = function () {
						t.status = lt, t.request = null, u()
					}
				} else f.every(function (e) {
					return e.status === ct
				}) && i(T.serverId)
			}, P = function (e) {
				return 0 !== e.retries.length && (e.status = pt, clearTimeout(e.timeout), e.timeout = setTimeout(function () {
					b(e)
				}, e.retries.shift()), !0)
			}, M = function () {
				var e = f.reduce(function (e, t) {
					return null === e || null === t.progress ? null : e + t.progress
				}, 0);
				if (null === e) return s(!1, 0, 0);
				var t = f.reduce(function (e, t) {
					return e + t.size
				}, 0);
				s(!0, e, t)
			}, w = function () {
				f.filter(function (e) {
					return e.status === ft
				}).length >= 1 || b()
			};
			return T.serverId ? (y = function (e) {
				T.aborted || (f.filter(function (t) {
					return t.offset < e
				}).forEach(function (e) {
					e.status = ct, e.progress = e.size
				}), w())
			}, D = st(e, p.url, T.serverId), S = {
				headers: "function" == typeof t.headers ? t.headers(T.serverId) : Object.assign({}, t.headers),
				method: "HEAD"
			}, (A = rt(null, D, S)).onload = function (e) {
				return y(v(e, S.method))
			}, A.onerror = function (e) {
				return a(ot("error", e.status, m(e.response) || e.statusText, e.getAllResponseHeaders()))
			}, A.ontimeout = it(a)) : function (i) {
				var s = new FormData;
				H(o) && s.append(n, JSON.stringify(o));
				var u = "function" == typeof t.headers ? t.headers(r, o) : Object.assign({}, t.headers, {"Upload-Length": r.size}),
					l = Object.assign({}, t, {headers: u}), c = rt(I(s), st(e, t.url), l);
				c.onload = function (e) {
					return i(v(e, l.method))
				}, c.onerror = function (e) {
					return a(ot("error", e.status, m(e.response) || e.statusText, e.getAllResponseHeaders()))
				}, c.ontimeout = it(a)
			}(function (e) {
				T.aborted || (l(e), T.serverId = e, w())
			}), {
				abort: function () {
					T.aborted = !0, f.forEach(function (e) {
						clearTimeout(e.timeout), e.request && e.request.abort()
					})
				}
			}
		}, _t = function () {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
				t = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 ? arguments[2] : void 0,
				r = arguments.length > 3 ? arguments[3] : void 0;
			return "function" == typeof t ? function () {
				for (var e = arguments.length, o = new Array(e), i = 0; i < e; i++) o[i] = arguments[i];
				return t.apply(void 0, [n].concat(o, [r]))
			} : t && U(t.url) ? function (e, t, n, r) {
				return function (o, i, a, s, u, l, c) {
					if (o) {
						var f = r.chunkUploads, d = f && o.size > r.chunkSize, p = f && (d || r.chunkForce);
						if (o instanceof Blob && p) return Et(e, t, n, o, i, a, s, u, l, c, r);
						var E = t.ondata || function (e) {
								return e
							}, _ = t.onload || function (e) {
								return e
							}, T = t.onerror || function (e) {
								return null
							}, I = "function" == typeof t.headers ? t.headers(o, i) || {} : Object.assign({}, t.headers),
							v = Object.assign({}, t, {headers: I}), m = new FormData;
						H(i) && m.append(n, JSON.stringify(i)), (o instanceof Blob ? [{
							name: null,
							file: o
						}] : o).forEach(function (e) {
							m.append(n, e.file, null === e.name ? e.file.name : "" + e.name + e.file.name)
						});
						var h = rt(E(m), st(e, t.url), v);
						return h.onload = function (e) {
							a(ot("load", e.status, _(e.response), e.getAllResponseHeaders()))
						}, h.onerror = function (e) {
							s(ot("error", e.status, T(e.response) || e.statusText, e.getAllResponseHeaders()))
						}, h.ontimeout = it(s), h.onprogress = u, h.onabort = l, h
					}
				}
			}(e, t, n, r) : null
		}, Tt = function () {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
				t = arguments.length > 1 ? arguments[1] : void 0;
			if ("function" == typeof t) return t;
			if (!t || !U(t.url)) return function (e, t) {
				return t()
			};
			var n = t.onload || function (e) {
				return e
			}, r = t.onerror || function (e) {
				return null
			};
			return function (o, i, a) {
				var s = rt(o, e + t.url, t);
				return s.onload = function (e) {
					i(ot("load", e.status, n(e.response), e.getAllResponseHeaders()))
				}, s.onerror = function (e) {
					a(ot("error", e.status, r(e.response) || e.statusText, e.getAllResponseHeaders()))
				}, s.ontimeout = it(a), s
			}
		}, It = function () {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
				t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
			return e + Math.random() * (t - e)
		}, vt = function (e, t) {
			var n = {
				complete: !1,
				perceivedProgress: 0,
				perceivedPerformanceUpdater: null,
				progress: null,
				timestamp: null,
				perceivedDuration: 0,
				duration: 0,
				request: null,
				response: null
			}, r = t.allowMinimumUploadDuration, o = function () {
				n.request && (n.perceivedPerformanceUpdater.clear(), n.request.abort && n.request.abort(), n.complete = !0)
			}, i = r ? function () {
				return n.progress ? Math.min(n.progress, n.perceivedProgress) : null
			} : function () {
				return n.progress || null
			}, a = r ? function () {
				return Math.min(n.duration, n.perceivedDuration)
			} : function () {
				return n.duration
			}, s = Object.assign({}, pe(), {
				process: function (t, o) {
					var i = function () {
						0 !== n.duration && null !== n.progress && s.fire("progress", s.getProgress())
					}, a = function () {
						n.complete = !0, s.fire("load-perceived", n.response.body)
					};
					s.fire("start"), n.timestamp = Date.now(), n.perceivedPerformanceUpdater = function (e) {
						var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e3,
							n = (arguments.length > 2 && void 0 !== arguments[2] && arguments[2], arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 25),
							r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 250, o = null,
							i = Date.now();
						return t > 0 && function a() {
							var s = Date.now() - i, u = It(n, r);
							s + u > t && (u = s + u - t);
							var l = s / t;
							l >= 1 || document.hidden ? e(1) : (e(l), o = setTimeout(a, u))
						}(), {
							clear: function () {
								clearTimeout(o)
							}
						}
					}(function (e) {
						n.perceivedProgress = e, n.perceivedDuration = Date.now() - n.timestamp, i(), n.response && 1 === n.perceivedProgress && !n.complete && a()
					}, r ? It(750, 1500) : 0), n.request = e(t, o, function (e) {
						n.response = H(e) ? e : {
							type: "load",
							code: 200,
							body: "" + e,
							headers: {}
						}, n.duration = Date.now() - n.timestamp, n.progress = 1, s.fire("load", n.response.body), (!r || r && 1 === n.perceivedProgress) && a()
					}, function (e) {
						n.perceivedPerformanceUpdater.clear(), s.fire("error", H(e) ? e : {
							type: "error",
							code: 0,
							body: "" + e
						})
					}, function (e, t, r) {
						n.duration = Date.now() - n.timestamp, n.progress = e ? t / r : null, i()
					}, function () {
						n.perceivedPerformanceUpdater.clear(), s.fire("abort", n.response ? n.response.body : null)
					}, function (e) {
						s.fire("transfer", e)
					})
				}, abort: o, getProgress: i, getDuration: a, reset: function () {
					o(), n.complete = !1, n.perceivedProgress = 0, n.progress = 0, n.timestamp = null, n.perceivedDuration = 0, n.duration = 0, n.request = null, n.response = null
				}
			});
			return s
		}, mt = function (e) {
			return e.substr(0, e.lastIndexOf(".")) || e
		}, ht = function (e) {
			return !!(e instanceof File || e instanceof Blob && e.name)
		}, gt = function () {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
				t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
				r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, o = oe(), i = {
					archived: !1,
					frozen: !1,
					released: !1,
					source: null,
					file: r,
					serverFileReference: t,
					transferId: null,
					processingAborted: !1,
					status: t ? Ie.PROCESSING_COMPLETE : Ie.INIT,
					activeLoader: null,
					activeProcessor: null
				}, a = null, s = {}, u = function (e) {
					return i.status = e
				}, l = function (e) {
					if (!i.released && !i.frozen) {
						for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
						f.fire.apply(f, [e].concat(n))
					}
				}, c = function (e, t, n) {
					var r = e.split("."), o = r[0], i = r.pop(), a = s;
					r.forEach(function (e) {
						return a = a[e]
					}), JSON.stringify(a[i]) !== JSON.stringify(t) && (a[i] = t, l("metadata-update", {
						key: o,
						value: s[o],
						silent: n
					}))
				}, f = Object.assign({
					id: {
						get: function () {
							return o
						}
					}, origin: {
						get: function () {
							return e
						}, set: function (t) {
							return e = t
						}
					}, serverId: {
						get: function () {
							return i.serverFileReference
						}
					}, transferId: {
						get: function () {
							return i.transferId
						}
					}, status: {
						get: function () {
							return i.status
						}
					}, filename: {
						get: function () {
							return i.file.name
						}
					}, filenameWithoutExtension: {
						get: function () {
							return mt(i.file.name)
						}
					}, fileExtension: {
						get: function () {
							return je(i.file.name)
						}
					}, fileType: {
						get: function () {
							return i.file.type
						}
					}, fileSize: {
						get: function () {
							return i.file.size
						}
					}, file: {
						get: function () {
							return i.file
						}
					}, relativePath: {
						get: function () {
							return i.file._relativePath
						}
					}, source: {
						get: function () {
							return i.source
						}
					}, getMetadata: function (e) {
						return function e(t) {
							if (!H(t)) return t;
							var n = P(t) ? [] : {};
							for (var r in t) if (t.hasOwnProperty(r)) {
								var o = t[r];
								n[r] = o && H(o) ? e(o) : o
							}
							return n
						}(e ? s[e] : s)
					}, setMetadata: function (e, t, n) {
						if (H(e)) {
							var r = e;
							return Object.keys(r).forEach(function (e) {
								c(e, r[e], t)
							}), e
						}
						return c(e, t, n), t
					}, extend: function (e, t) {
						return d[e] = t
					}, abortLoad: function () {
						i.activeLoader ? i.activeLoader.abort() : (u(Ie.INIT), l("load-abort"))
					}, retryLoad: function () {
						i.activeLoader && i.activeLoader.load()
					}, requestProcessing: function () {
						i.processingAborted = !1, u(Ie.PROCESSING_QUEUED)
					}, abortProcessing: function () {
						return new Promise(function (e) {
							if (!i.activeProcessor) return i.processingAborted = !0, u(Ie.IDLE), l("process-abort"), void e();
							a = function () {
								e()
							}, i.activeProcessor.abort()
						})
					}, load: function (t, n, r) {
						i.source = t, f.fireSync("init"), i.file ? f.fireSync("load-skip") : (i.file = function (e) {
							var t = [e.name, e.size, e.type];
							return e instanceof Blob || Ye(e) ? t[0] = e.name || Xe() : Ye(e) ? (t[1] = e.length, t[2] = Qe(e)) : U(e) && (t[0] = ke(e), t[1] = 0, t[2] = "application/octet-stream"), {
								name: t[0],
								size: t[1],
								type: t[2]
							}
						}(t), n.on("init", function () {
							l("load-init")
						}), n.on("meta", function (t) {
							i.file.size = t.size, i.file.filename = t.filename, t.source && (e = ve.LIMBO, i.serverFileReference = t.source, i.status = Ie.PROCESSING_COMPLETE), l("load-meta")
						}), n.on("progress", function (e) {
							u(Ie.LOADING), l("load-progress", e)
						}), n.on("error", function (e) {
							u(Ie.LOAD_ERROR), l("load-request-error", e)
						}), n.on("abort", function () {
							u(Ie.INIT), l("load-abort")
						}), n.on("load", function (t) {
							i.activeLoader = null;
							var n = function (t) {
								i.file = ht(t) ? t : i.file, e === ve.LIMBO && i.serverFileReference ? u(Ie.PROCESSING_COMPLETE) : u(Ie.IDLE), l("load")
							};
							i.serverFileReference ? n(t) : r(t, n, function (e) {
								i.file = t, l("load-meta"), u(Ie.LOAD_ERROR), l("load-file-error", e)
							})
						}), n.setSource(t), i.activeLoader = n, n.load())
					}, process: function e(t, n) {
						if (i.processingAborted) i.processingAborted = !1; else if (u(Ie.PROCESSING), a = null, i.file instanceof Blob) {
							t.on("load", function (e) {
								i.transferId = null, i.serverFileReference = e
							}), t.on("transfer", function (e) {
								i.transferId = e
							}), t.on("load-perceived", function (e) {
								i.activeProcessor = null, i.transferId = null, i.serverFileReference = e, u(Ie.PROCESSING_COMPLETE), l("process-complete", e)
							}), t.on("start", function () {
								l("process-start")
							}), t.on("error", function (e) {
								i.activeProcessor = null, u(Ie.PROCESSING_ERROR), l("process-error", e)
							}), t.on("abort", function (e) {
								i.activeProcessor = null, i.serverFileReference = e, u(Ie.IDLE), l("process-abort"), a && a()
							}), t.on("progress", function (e) {
								l("process-progress", e)
							});
							var r = console.error;
							n(i.file, function (e) {
								i.archived || t.process(e, Object.assign({}, s))
							}, r), i.activeProcessor = t
						} else f.on("load", function () {
							e(t, n)
						})
					}, revert: function (e, t) {
						return new Promise(function (n, r) {
							var o = null !== i.serverFileReference ? i.serverFileReference : i.transferId;
							null !== o ? (e(o, function () {
								i.serverFileReference = null, i.transferId = null, n()
							}, function (e) {
								t ? (u(Ie.PROCESSING_REVERT_ERROR), l("process-revert-error"), r(e)) : n()
							}), u(Ie.IDLE), l("process-revert")) : n()
						})
					}
				}, pe(), {
					freeze: function () {
						return i.frozen = !0
					}, release: function () {
						return i.released = !0
					}, released: {
						get: function () {
							return i.released
						}
					}, archive: function () {
						return i.archived = !0
					}, archived: {
						get: function () {
							return i.archived
						}
					}
				}), d = n(f);
			return d
		}, Rt = function (e, t) {
			var n = function (e, t) {
				return M(t) ? 0 : U(t) ? e.findIndex(function (e) {
					return e.id === t
				}) : -1
			}(e, t);
			if (!(n < 0)) return e[n] || null
		}, Ot = function (e, t, n, r, o, i) {
			var a = rt(null, e, {method: "GET", responseType: "blob"});
			return a.onload = function (n) {
				var r = n.getAllResponseHeaders(), o = et(r).name || ke(e);
				t(ot("load", n.status, We(n.response, o), r))
			}, a.onerror = function (e) {
				n(ot("error", e.status, e.statusText, e.getAllResponseHeaders()))
			}, a.onheaders = function (e) {
				i(ot("headers", e.status, null, e.getAllResponseHeaders()))
			}, a.ontimeout = it(n), a.onprogress = r, a.onabort = o, a
		}, yt = function (e) {
			return 0 === e.indexOf("//") && (e = location.protocol + e), e.toLowerCase().replace("blob:", "").replace(/([a-z])?:\/\//, "$1").split("/")[0]
		}, Dt = function (e) {
			return function () {
				return Y(e) ? e.apply(void 0, arguments) : e
			}
		}, St = function (e, t) {
			clearTimeout(t.listUpdateTimeout), t.listUpdateTimeout = setTimeout(function () {
				e("DID_UPDATE_ITEMS", {items: Pe(t.items)})
			}, 0)
		}, At = function (e) {
			for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
			return new Promise(function (t) {
				if (!e) return t(!0);
				var r = e.apply(void 0, n);
				return null == r ? t(!0) : "boolean" == typeof r ? t(r) : void ("function" == typeof r.then && r.then(t))
			})
		}, Lt = function (e, t) {
			e.items.sort(function (e, n) {
				return t(Te(e), Te(n))
			})
		}, bt = function (e, t) {
			return function () {
				var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = n.query, o = n.success,
					i = void 0 === o ? function () {
					} : o, a = n.failure, s = void 0 === a ? function () {
					} : a, u = se(n, ["query", "success", "failure"]), l = Le(e.items, r);
				l ? t(l, i, s, u || {}) : s({error: ot("error", 0, "Item not found"), file: null})
			}
		}, Pt = function (e, t, n) {
			return {
				ABORT_ALL: function () {
					Pe(n.items).forEach(function (e) {
						e.freeze(), e.abortLoad(), e.abortProcessing()
					})
				}, DID_SET_FILES: function (t) {
					var r = t.value, o = (void 0 === r ? [] : r).map(function (e) {
						return {source: e.source ? e.source : e, options: e.options}
					}), i = Pe(n.items);
					i.forEach(function (t) {
						o.find(function (e) {
							return e.source === t.source || e.source === t.file
						}) || e("REMOVE_ITEM", {query: t, remove: !1})
					}), i = Pe(n.items), o.forEach(function (t, n) {
						i.find(function (e) {
							return e.source === t.source || e.file === t.source
						}) || e("ADD_ITEM", Object.assign({}, t, {interactionMethod: re, index: n}))
					})
				}, DID_UPDATE_ITEM_METADATA: function (r) {
					var o = r.id, i = r.action, a = r.change;
					a.silent || (clearTimeout(n.itemUpdateTimeout), n.itemUpdateTimeout = setTimeout(function () {
						var r = Rt(n.items, o);
						if (t("IS_ASYNC")) {
							r.origin === ve.LOCAL && e("DID_LOAD_ITEM", {
								id: r.id,
								error: null,
								serverFileReference: r.source
							});
							var s, u = function () {
								setTimeout(function () {
									e("REQUEST_ITEM_PROCESSING", {query: o})
								}, 32)
							};
							return r.status === Ie.PROCESSING_COMPLETE ? (s = n.options.instantUpload, void r.revert(Tt(n.options.server.url, n.options.server.revert), t("GET_FORCE_REVERT")).then(s ? u : function () {
							}).catch(function () {
							})) : r.status === Ie.PROCESSING ? function (e) {
								r.abortProcessing().then(e ? u : function () {
								})
							}(n.options.instantUpload) : void (n.options.instantUpload && u())
						}
						Oe("SHOULD_PREPARE_OUTPUT", !1, {item: r, query: t, action: i, change: a}).then(function (n) {
							var i = t("GET_BEFORE_PREPARE_FILE");
							i && (n = i(r, n)), n && e("REQUEST_PREPARE_OUTPUT", {
								query: o, item: r, success: function (t) {
									e("DID_PREPARE_OUTPUT", {id: o, file: t})
								}
							}, !0)
						})
					}, 0))
				}, MOVE_ITEM: function (e) {
					var t = e.query, r = e.index, o = Le(n.items, t);
					if (o) {
						var i = n.items.indexOf(o);
						i !== (r = xe(r, 0, n.items.length - 1)) && n.items.splice(r, 0, n.items.splice(i, 1)[0])
					}
				}, SORT: function (r) {
					var o = r.compare;
					Lt(n, o), e("DID_SORT_ITEMS", {items: t("GET_ACTIVE_ITEMS")})
				}, ADD_ITEMS: function (n) {
					var r = n.items, o = n.index, i = n.interactionMethod, a = n.success, s = void 0 === a ? function () {
					} : a, u = n.failure, l = void 0 === u ? function () {
					} : u, c = o;
					if (-1 === o || void 0 === o) {
						var f = t("GET_ITEM_INSERT_LOCATION"), d = t("GET_TOTAL_ITEMS");
						c = "before" === f ? 0 : d
					}
					var p = t("GET_IGNORED_FILES"), E = r.filter(function (e) {
						return ht(e) ? !p.includes(e.name.toLowerCase()) : !M(e)
					}).map(function (t) {
						return new Promise(function (n, r) {
							e("ADD_ITEM", {
								interactionMethod: i,
								source: t.source || t,
								success: n,
								failure: r,
								index: c++,
								options: t.options || {}
							})
						})
					});
					Promise.all(E).then(s).catch(l)
				}, ADD_ITEM: function (r) {
					var o = r.source, i = r.index, a = void 0 === i ? -1 : i, s = r.interactionMethod, u = r.success,
						l = void 0 === u ? function () {
						} : u, c = r.failure, f = void 0 === c ? function () {
						} : c, d = r.options, p = void 0 === d ? {} : d;
					if (M(o)) f({
						error: ot("error", 0, "No source"),
						file: null
					}); else if (!ht(o) || !n.options.ignoredFiles.includes(o.name.toLowerCase())) {
						if (!function (e) {
							var t = Pe(e.items).length;
							if (!e.options.allowMultiple) return 0 === t;
							var n = e.options.maxFiles;
							return null === n || t < n
						}(n)) {
							if (n.options.allowMultiple || !n.options.allowMultiple && !n.options.allowReplace) {
								var E = ot("warning", 0, "Max files");
								return e("DID_THROW_MAX_FILES", {source: o, error: E}), void f({error: E, file: null})
							}
							var _ = Pe(n.items)[0];
							if (_.status === Ie.PROCESSING_COMPLETE || _.status === Ie.PROCESSING_REVERT_ERROR) {
								var T = t("GET_FORCE_REVERT");
								if (_.revert(Tt(n.options.server.url, n.options.server.revert), T).then(function () {
									T && e("ADD_ITEM", {
										source: o,
										index: a,
										interactionMethod: s,
										success: l,
										failure: f,
										options: p
									})
								}).catch(function () {
								}), T) return
							}
							e("REMOVE_ITEM", {query: _.id})
						}
						var I = "local" === p.type ? ve.LOCAL : "limbo" === p.type ? ve.LIMBO : ve.INPUT,
							v = gt(I, I === ve.INPUT ? null : o, p.file);
						Object.keys(p.metadata || {}).forEach(function (e) {
							v.setMetadata(e, p.metadata[e])
						}), ye("DID_CREATE_ITEM", v, {query: t, dispatch: e});
						var m = t("GET_ITEM_INSERT_LOCATION");
						n.options.itemInsertLocationFreedom || (a = "before" === m ? -1 : n.items.length), function (e, t, n) {
							M(t) || (void 0 === n ? e.push(t) : function (e, t, n) {
								e.splice(t, 0, n)
							}(e, n = xe(n, 0, e.length), t))
						}(n.items, v, a), Y(m) && o && Lt(n, m);
						var h = v.id;
						v.on("init", function () {
							e("DID_INIT_ITEM", {id: h})
						}), v.on("load-init", function () {
							e("DID_START_ITEM_LOAD", {id: h})
						}), v.on("load-meta", function () {
							e("DID_UPDATE_ITEM_META", {id: h})
						}), v.on("load-progress", function (t) {
							e("DID_UPDATE_ITEM_LOAD_PROGRESS", {id: h, progress: t})
						}), v.on("load-request-error", function (t) {
							var r = Dt(n.options.labelFileLoadError)(t);
							if (t.code >= 400 && t.code < 500) return e("DID_THROW_ITEM_INVALID", {
								id: h,
								error: t,
								status: {main: r, sub: t.code + " (" + t.body + ")"}
							}), void f({error: t, file: Te(v)});
							e("DID_THROW_ITEM_LOAD_ERROR", {
								id: h,
								error: t,
								status: {main: r, sub: n.options.labelTapToRetry}
							})
						}), v.on("load-file-error", function (t) {
							e("DID_THROW_ITEM_INVALID", {id: h, error: t.status, status: t.status}), f({
								error: t.status,
								file: Te(v)
							})
						}), v.on("load-abort", function () {
							e("REMOVE_ITEM", {query: h})
						}), v.on("load-skip", function () {
							e("COMPLETE_LOAD_ITEM", {query: h, item: v, data: {source: o, success: l}})
						}), v.on("load", function () {
							var r = function (r) {
								r ? (v.on("metadata-update", function (t) {
									e("DID_UPDATE_ITEM_METADATA", {id: h, change: t})
								}), Oe("SHOULD_PREPARE_OUTPUT", !1, {item: v, query: t}).then(function (r) {
									var i = t("GET_BEFORE_PREPARE_FILE");
									i && (r = i(v, r));
									var a = function () {
										e("COMPLETE_LOAD_ITEM", {
											query: h,
											item: v,
											data: {source: o, success: l}
										}), St(e, n)
									};
									r ? e("REQUEST_PREPARE_OUTPUT", {
										query: h, item: v, success: function (t) {
											e("DID_PREPARE_OUTPUT", {id: h, file: t}), a()
										}
									}, !0) : a()
								})) : e("REMOVE_ITEM", {query: h})
							};
							Oe("DID_LOAD_ITEM", v, {query: t, dispatch: e}).then(function () {
								At(t("GET_BEFORE_ADD_FILE"), Te(v)).then(r)
							}).catch(function (t) {
								if (!t || !t.error || !t.status) return r(!1);
								e("DID_THROW_ITEM_INVALID", {id: h, error: t.error, status: t.status})
							})
						}), v.on("process-start", function () {
							e("DID_START_ITEM_PROCESSING", {id: h})
						}), v.on("process-progress", function (t) {
							e("DID_UPDATE_ITEM_PROCESS_PROGRESS", {id: h, progress: t})
						}), v.on("process-error", function (t) {
							e("DID_THROW_ITEM_PROCESSING_ERROR", {
								id: h,
								error: t,
								status: {main: Dt(n.options.labelFileProcessingError)(t), sub: n.options.labelTapToRetry}
							})
						}), v.on("process-revert-error", function (t) {
							e("DID_THROW_ITEM_PROCESSING_REVERT_ERROR", {
								id: h,
								error: t,
								status: {
									main: Dt(n.options.labelFileProcessingRevertError)(t),
									sub: n.options.labelTapToRetry
								}
							})
						}), v.on("process-complete", function (t) {
							e("DID_COMPLETE_ITEM_PROCESSING", {
								id: h,
								error: null,
								serverFileReference: t
							}), e("DID_DEFINE_VALUE", {id: h, value: t})
						}), v.on("process-abort", function () {
							e("DID_ABORT_ITEM_PROCESSING", {id: h})
						}), v.on("process-revert", function () {
							e("DID_REVERT_ITEM_PROCESSING", {id: h}), e("DID_DEFINE_VALUE", {id: h, value: null})
						}), e("DID_ADD_ITEM", {id: h, index: a, interactionMethod: s}), St(e, n);
						var g = n.options.server || {}, R = g.url, O = g.load, y = g.restore, D = g.fetch;
						v.load(o, tt(I === ve.INPUT ? U(o) && function (e) {
							return (e.indexOf(":") > -1 || e.indexOf("//") > -1) && yt(location.href) !== yt(e)
						}(o) && D ? ut(R, D) : Ot : ut(R, I === ve.LIMBO ? y : O)), function (e, n, r) {
							Oe("LOAD_FILE", e, {query: t}).then(n).catch(r)
						})
					}
				}, REQUEST_PREPARE_OUTPUT: function (e) {
					var n = e.item, r = e.success, o = e.failure, i = void 0 === o ? function () {
					} : o, a = {error: ot("error", 0, "Item not found"), file: null};
					if (n.archived) return i(a);
					Oe("PREPARE_OUTPUT", n.file, {query: t, item: n}).then(function (e) {
						Oe("COMPLETE_PREPARE_OUTPUT", e, {query: t, item: n}).then(function (e) {
							if (n.archived) return i(a);
							r(e)
						})
					})
				}, COMPLETE_LOAD_ITEM: function (r) {
					var o = r.item, i = r.data, a = i.success, s = i.source, u = t("GET_ITEM_INSERT_LOCATION");
					if (Y(u) && s && Lt(n, u), e("DID_LOAD_ITEM", {
						id: o.id,
						error: null,
						serverFileReference: o.origin === ve.INPUT ? null : s
					}), a(Te(o)), o.origin !== ve.LOCAL) return o.origin === ve.LIMBO ? (e("DID_COMPLETE_ITEM_PROCESSING", {
						id: o.id,
						error: null,
						serverFileReference: s
					}), void e("DID_DEFINE_VALUE", {
						id: o.id,
						value: o.serverId || s
					})) : void (t("IS_ASYNC") && n.options.instantUpload && e("REQUEST_ITEM_PROCESSING", {query: o.id}));
					e("DID_LOAD_LOCAL_ITEM", {id: o.id})
				}, RETRY_ITEM_LOAD: bt(n, function (e) {
					e.retryLoad()
				}), REQUEST_ITEM_PREPARE: bt(n, function (t, n, r) {
					e("REQUEST_PREPARE_OUTPUT", {
						query: t.id, item: t, success: function (r) {
							e("DID_PREPARE_OUTPUT", {id: t.id, file: r}), n({file: t, output: r})
						}, failure: r
					}, !0)
				}), REQUEST_ITEM_PROCESSING: bt(n, function (r, o, i) {
					if (r.status === Ie.IDLE || r.status === Ie.PROCESSING_ERROR) r.status !== Ie.PROCESSING_QUEUED && (r.requestProcessing(), e("DID_REQUEST_ITEM_PROCESSING", {id: r.id}), e("PROCESS_ITEM", {
						query: r,
						success: o,
						failure: i
					}, !0)); else {
						var a = function () {
							return e("REQUEST_ITEM_PROCESSING", {query: r, success: o, failure: i})
						}, s = function () {
							return document.hidden ? a() : setTimeout(a, 32)
						};
						r.status === Ie.PROCESSING_COMPLETE || r.status === Ie.PROCESSING_REVERT_ERROR ? r.revert(Tt(n.options.server.url, n.options.server.revert), t("GET_FORCE_REVERT")).then(s).catch(function () {
						}) : r.status === Ie.PROCESSING && r.abortProcessing().then(s)
					}
				}), PROCESS_ITEM: bt(n, function (r, o, i) {
					var a = t("GET_MAX_PARALLEL_UPLOADS");
					if (t("GET_ITEMS_BY_STATUS", Ie.PROCESSING).length !== a) {
						if (r.status !== Ie.PROCESSING) {
							var s = function t() {
								var r = n.processingQueue.shift();
								if (r) {
									var o = r.id, i = r.success, a = r.failure, s = Le(n.items, o);
									s && !s.archived ? e("PROCESS_ITEM", {query: o, success: i, failure: a}, !0) : t()
								}
							};
							r.onOnce("process-complete", function () {
								o(Te(r)), s();
								var i = n.options.server;
								if (n.options.instantUpload && r.origin === ve.LOCAL && Y(i.remove)) {
									var a = function () {
									};
									r.origin = ve.LIMBO, n.options.server.remove(r.source, a, a)
								}
								t("GET_ITEMS_BY_STATUS", Ie.PROCESSING_COMPLETE).length === n.items.length && e("DID_COMPLETE_ITEM_PROCESSING_ALL")
							}), r.onOnce("process-error", function (e) {
								i({error: e, file: Te(r)}), s()
							});
							var u = n.options;
							r.process(vt(_t(u.server.url, u.server.process, u.name, {
								chunkTransferId: r.transferId,
								chunkServer: u.server.patch,
								chunkUploads: u.chunkUploads,
								chunkForce: u.chunkForce,
								chunkSize: u.chunkSize,
								chunkRetryDelays: u.chunkRetryDelays
							}), {allowMinimumUploadDuration: t("GET_ALLOW_MINIMUM_UPLOAD_DURATION")}), function (n, o, i) {
								Oe("PREPARE_OUTPUT", n, {query: t, item: r}).then(function (t) {
									e("DID_PREPARE_OUTPUT", {id: r.id, file: t}), o(t)
								}).catch(i)
							})
						}
					} else n.processingQueue.push({id: r.id, success: o, failure: i})
				}), RETRY_ITEM_PROCESSING: bt(n, function (t) {
					e("REQUEST_ITEM_PROCESSING", {query: t})
				}), REQUEST_REMOVE_ITEM: bt(n, function (n) {
					At(t("GET_BEFORE_REMOVE_FILE"), Te(n)).then(function (t) {
						t && e("REMOVE_ITEM", {query: n})
					})
				}), RELEASE_ITEM: bt(n, function (e) {
					e.release()
				}), REMOVE_ITEM: bt(n, function (r, o, i, a) {
					var s = function () {
						var t = r.id;
						Rt(n.items, t).archive(), e("DID_REMOVE_ITEM", {error: null, id: t, item: r}), St(e, n), o(Te(r))
					}, u = n.options.server;
					r.origin === ve.LOCAL && u && Y(u.remove) && !1 !== a.remove ? (e("DID_START_ITEM_REMOVE", {id: r.id}), u.remove(r.source, function () {
						return s()
					}, function (t) {
						e("DID_THROW_ITEM_REMOVE_ERROR", {
							id: r.id,
							error: ot("error", 0, t, null),
							status: {main: Dt(n.options.labelFileRemoveError)(t), sub: n.options.labelTapToRetry}
						})
					})) : ((a.revert && r.origin !== ve.LOCAL && null !== r.serverId || n.options.chunkUploads && r.file.size > n.options.chunkSize || n.options.chunkUploads && n.options.chunkForce) && r.revert(Tt(n.options.server.url, n.options.server.revert), t("GET_FORCE_REVERT")), s())
				}), ABORT_ITEM_LOAD: bt(n, function (e) {
					e.abortLoad()
				}), ABORT_ITEM_PROCESSING: bt(n, function (t) {
					t.serverId ? e("REVERT_ITEM_PROCESSING", {id: t.id}) : t.abortProcessing().then(function () {
						n.options.instantUpload && e("REMOVE_ITEM", {query: t.id})
					})
				}), REQUEST_REVERT_ITEM_PROCESSING: bt(n, function (r) {
					if (n.options.instantUpload) {
						var o = function (t) {
							t && e("REVERT_ITEM_PROCESSING", {query: r})
						}, i = t("GET_BEFORE_REMOVE_FILE");
						if (!i) return o(!0);
						var a = i(Te(r));
						return null == a ? o(!0) : "boolean" == typeof a ? o(a) : void ("function" == typeof a.then && a.then(o))
					}
					e("REVERT_ITEM_PROCESSING", {query: r})
				}), REVERT_ITEM_PROCESSING: bt(n, function (r) {
					r.revert(Tt(n.options.server.url, n.options.server.revert), t("GET_FORCE_REVERT")).then(function () {
						(n.options.instantUpload || function (e) {
							return !ht(e.file)
						}(r)) && e("REMOVE_ITEM", {query: r.id})
					}).catch(function () {
					})
				}), SET_OPTIONS: function (t) {
					var n = t.options, r = Object.keys(n), o = Mt.filter(function (e) {
						return r.includes(e)
					});
					[].concat(ue(o), ue(Object.keys(n).filter(function (e) {
						return !o.includes(e)
					}))).forEach(function (t) {
						e("SET_" + Z(t, "_").toUpperCase(), {value: n[t]})
					})
				}
			}
		}, Mt = ["server"], wt = function (e) {
			return e
		}, Ct = function (e) {
			return document.createElement(e)
		}, Nt = function (e, t) {
			var n = e.childNodes[0];
			n ? t !== n.nodeValue && (n.nodeValue = t) : (n = document.createTextNode(t), e.appendChild(n))
		}, Gt = function (e, t, n, r) {
			var o = (r % 360 - 90) * Math.PI / 180;
			return {x: e + n * Math.cos(o), y: t + n * Math.sin(o)}
		}, Ut = function (e, t, n, r, o) {
			var i = 1;
			return o > r && o - r <= .5 && (i = 0), r > o && r - o >= .5 && (i = 0), function (e, t, n, r, o, i) {
				var a = Gt(e, t, n, o), s = Gt(e, t, n, r);
				return ["M", a.x, a.y, "A", n, n, 0, i, 0, s.x, s.y].join(" ")
			}(e, t, n, 360 * Math.min(.9999, r), 360 * Math.min(.9999, o), i)
		}, Bt = S({
			tag: "div",
			name: "progress-indicator",
			ignoreRectUpdate: !0,
			ignoreRect: !0,
			create: function (e) {
				var t = e.root, n = e.props;
				n.spin = !1, n.progress = 0, n.opacity = 0;
				var r = a("svg");
				t.ref.path = a("path", {
					"stroke-width": 2,
					"stroke-linecap": "round"
				}), r.appendChild(t.ref.path), t.ref.svg = r, t.appendChild(r)
			},
			write: function (e) {
				var t = e.root, n = e.props;
				if (0 !== n.opacity) {
					n.align && (t.element.dataset.align = n.align);
					var o = parseInt(r(t.ref.path, "stroke-width"), 10), i = .5 * t.rect.element.width, a = 0, s = 0;
					n.spin ? (a = 0, s = .5) : (a = 0, s = n.progress);
					var u = Ut(i, i, i - o, a, s);
					r(t.ref.path, "d", u), r(t.ref.path, "stroke-opacity", n.spin || n.progress > 0 ? 1 : 0)
				}
			},
			mixins: {
				apis: ["progress", "spin", "align"],
				styles: ["opacity"],
				animations: {
					opacity: {type: "tween", duration: 500},
					progress: {type: "spring", stiffness: .95, damping: .65, mass: 10}
				}
			}
		}), Ft = S({
			tag: "button",
			attributes: {type: "button"},
			ignoreRect: !0,
			ignoreRectUpdate: !0,
			name: "file-action-button",
			mixins: {
				apis: ["label"],
				styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"],
				animations: {
					scaleX: "spring",
					scaleY: "spring",
					translateX: "spring",
					translateY: "spring",
					opacity: {type: "tween", duration: 250}
				},
				listeners: !0
			},
			create: function (e) {
				var t = e.root, n = e.props;
				t.element.innerHTML = (n.icon || "") + "<span>" + n.label + "</span>", n.isDisabled = !1
			},
			write: function (e) {
				var t = e.root, n = e.props, o = n.isDisabled, i = t.query("GET_DISABLED") || 0 === n.opacity;
				i && !o ? (n.isDisabled = !0, r(t.element, "disabled", "disabled")) : !i && o && (n.isDisabled = !1, t.element.removeAttribute("disabled"))
			}
		}), qt = function (e) {
			var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ".",
				n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e3,
				r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, o = r.labelBytes,
				i = void 0 === o ? "bytes" : o, a = r.labelKilobytes, s = void 0 === a ? "KB" : a, u = r.labelMegabytes,
				l = void 0 === u ? "MB" : u, c = r.labelGigabytes, f = void 0 === c ? "GB" : c, d = n, p = n * n,
				E = n * n * n;
			return (e = Math.round(Math.abs(e))) < d ? e + " " + i : e < p ? Math.floor(e / d) + " " + s : e < E ? Vt(e / p, 1, t) + " " + l : Vt(e / E, 2, t) + " " + f
		}, Vt = function (e, t, n) {
			return e.toFixed(t).split(".").filter(function (e) {
				return "0" !== e
			}).join(n)
		}, xt = function (e) {
			var t = e.root, n = e.props;
			Nt(t.ref.fileSize, qt(t.query("GET_ITEM_SIZE", n.id), ".", t.query("GET_FILE_SIZE_BASE"), t.query("GET_FILE_SIZE_LABELS", t.query))), Nt(t.ref.fileName, wt(t.query("GET_ITEM_NAME", n.id)))
		}, Yt = function (e) {
			var t = e.root, n = e.props;
			V(t.query("GET_ITEM_SIZE", n.id)) ? xt({
				root: t,
				props: n
			}) : Nt(t.ref.fileSize, t.query("GET_LABEL_FILE_SIZE_NOT_AVAILABLE"))
		}, kt = S({
			name: "file-info",
			ignoreRect: !0,
			ignoreRectUpdate: !0,
			write: A({
				DID_LOAD_ITEM: xt,
				DID_UPDATE_ITEM_META: xt,
				DID_THROW_ITEM_LOAD_ERROR: Yt,
				DID_THROW_ITEM_INVALID: Yt
			}),
			didCreateView: function (e) {
				ye("CREATE_VIEW", Object.assign({}, e, {view: e}))
			},
			create: function (e) {
				var t = e.root, n = e.props, o = Ct("span");
				o.className = "filepond--file-info-main", r(o, "aria-hidden", "true"), t.appendChild(o), t.ref.fileName = o;
				var i = Ct("span");
				i.className = "filepond--file-info-sub", t.appendChild(i), t.ref.fileSize = i, Nt(i, t.query("GET_LABEL_FILE_WAITING_FOR_SIZE")), Nt(o, wt(t.query("GET_ITEM_NAME", n.id)))
			},
			mixins: {styles: ["translateX", "translateY"], animations: {translateX: "spring", translateY: "spring"}}
		}), jt = function (e) {
			return Math.round(100 * e)
		}, Ht = function (e) {
			var t = e.root, n = e.action,
				r = null === n.progress ? t.query("GET_LABEL_FILE_LOADING") : t.query("GET_LABEL_FILE_LOADING") + " " + jt(n.progress) + "%";
			Nt(t.ref.main, r), Nt(t.ref.sub, t.query("GET_LABEL_TAP_TO_CANCEL"))
		}, Xt = function (e) {
			var t = e.root;
			Nt(t.ref.main, ""), Nt(t.ref.sub, "")
		}, Wt = function (e) {
			var t = e.root, n = e.action;
			Nt(t.ref.main, n.status.main), Nt(t.ref.sub, n.status.sub)
		}, zt = S({
			name: "file-status",
			ignoreRect: !0,
			ignoreRectUpdate: !0,
			write: A({
				DID_LOAD_ITEM: Xt,
				DID_REVERT_ITEM_PROCESSING: Xt,
				DID_REQUEST_ITEM_PROCESSING: function (e) {
					var t = e.root;
					Nt(t.ref.main, t.query("GET_LABEL_FILE_PROCESSING")), Nt(t.ref.sub, t.query("GET_LABEL_TAP_TO_CANCEL"))
				},
				DID_ABORT_ITEM_PROCESSING: function (e) {
					var t = e.root;
					Nt(t.ref.main, t.query("GET_LABEL_FILE_PROCESSING_ABORTED")), Nt(t.ref.sub, t.query("GET_LABEL_TAP_TO_RETRY"))
				},
				DID_COMPLETE_ITEM_PROCESSING: function (e) {
					var t = e.root;
					Nt(t.ref.main, t.query("GET_LABEL_FILE_PROCESSING_COMPLETE")), Nt(t.ref.sub, t.query("GET_LABEL_TAP_TO_UNDO"))
				},
				DID_UPDATE_ITEM_PROCESS_PROGRESS: function (e) {
					var t = e.root, n = e.action,
						r = null === n.progress ? t.query("GET_LABEL_FILE_PROCESSING") : t.query("GET_LABEL_FILE_PROCESSING") + " " + jt(n.progress) + "%";
					Nt(t.ref.main, r), Nt(t.ref.sub, t.query("GET_LABEL_TAP_TO_CANCEL"))
				},
				DID_UPDATE_ITEM_LOAD_PROGRESS: Ht,
				DID_THROW_ITEM_LOAD_ERROR: Wt,
				DID_THROW_ITEM_INVALID: Wt,
				DID_THROW_ITEM_PROCESSING_ERROR: Wt,
				DID_THROW_ITEM_PROCESSING_REVERT_ERROR: Wt,
				DID_THROW_ITEM_REMOVE_ERROR: Wt
			}),
			didCreateView: function (e) {
				ye("CREATE_VIEW", Object.assign({}, e, {view: e}))
			},
			create: function (e) {
				var t = e.root, n = Ct("span");
				n.className = "filepond--file-status-main", t.appendChild(n), t.ref.main = n;
				var r = Ct("span");
				r.className = "filepond--file-status-sub", t.appendChild(r), t.ref.sub = r, Ht({
					root: t,
					action: {progress: null}
				})
			},
			mixins: {
				styles: ["translateX", "translateY", "opacity"],
				animations: {opacity: {type: "tween", duration: 250}, translateX: "spring", translateY: "spring"}
			}
		}), Qt = {
			AbortItemLoad: {
				label: "GET_LABEL_BUTTON_ABORT_ITEM_LOAD",
				action: "ABORT_ITEM_LOAD",
				className: "filepond--action-abort-item-load",
				align: "LOAD_INDICATOR_POSITION"
			},
			RetryItemLoad: {
				label: "GET_LABEL_BUTTON_RETRY_ITEM_LOAD",
				action: "RETRY_ITEM_LOAD",
				icon: "GET_ICON_RETRY",
				className: "filepond--action-retry-item-load",
				align: "BUTTON_PROCESS_ITEM_POSITION"
			},
			RemoveItem: {
				label: "GET_LABEL_BUTTON_REMOVE_ITEM",
				action: "REQUEST_REMOVE_ITEM",
				icon: "GET_ICON_REMOVE",
				className: "filepond--action-remove-item",
				align: "BUTTON_REMOVE_ITEM_POSITION"
			},
			ProcessItem: {
				label: "GET_LABEL_BUTTON_PROCESS_ITEM",
				action: "REQUEST_ITEM_PROCESSING",
				icon: "GET_ICON_PROCESS",
				className: "filepond--action-process-item",
				align: "BUTTON_PROCESS_ITEM_POSITION"
			},
			AbortItemProcessing: {
				label: "GET_LABEL_BUTTON_ABORT_ITEM_PROCESSING",
				action: "ABORT_ITEM_PROCESSING",
				className: "filepond--action-abort-item-processing",
				align: "BUTTON_PROCESS_ITEM_POSITION"
			},
			RetryItemProcessing: {
				label: "GET_LABEL_BUTTON_RETRY_ITEM_PROCESSING",
				action: "RETRY_ITEM_PROCESSING",
				icon: "GET_ICON_RETRY",
				className: "filepond--action-retry-item-processing",
				align: "BUTTON_PROCESS_ITEM_POSITION"
			},
			RevertItemProcessing: {
				label: "GET_LABEL_BUTTON_UNDO_ITEM_PROCESSING",
				action: "REQUEST_REVERT_ITEM_PROCESSING",
				icon: "GET_ICON_UNDO",
				className: "filepond--action-revert-item-processing",
				align: "BUTTON_PROCESS_ITEM_POSITION"
			}
		}, Zt = [];
	t(Qt, function (e) {
		Zt.push(e)
	});
	var Kt, $t = function (e) {
			if ("right" === nn(e)) return 0;
			var t = e.ref.buttonRemoveItem.rect.element;
			return t.hidden ? null : t.width + t.left
		}, Jt = function (e) {
			return e.ref.buttonAbortItemLoad.rect.element.width
		}, en = function (e) {
			return Math.floor(e.ref.buttonRemoveItem.rect.element.height / 4)
		}, tn = function (e) {
			return Math.floor(e.ref.buttonRemoveItem.rect.element.left / 2)
		}, nn = function (e) {
			return e.query("GET_STYLE_BUTTON_REMOVE_ITEM_POSITION")
		}, rn = {
			buttonAbortItemLoad: {opacity: 0},
			buttonRetryItemLoad: {opacity: 0},
			buttonRemoveItem: {opacity: 0},
			buttonProcessItem: {opacity: 0},
			buttonAbortItemProcessing: {opacity: 0},
			buttonRetryItemProcessing: {opacity: 0},
			buttonRevertItemProcessing: {opacity: 0},
			loadProgressIndicator: {
				opacity: 0, align: function (e) {
					return e.query("GET_STYLE_LOAD_INDICATOR_POSITION")
				}
			},
			processProgressIndicator: {
				opacity: 0, align: function (e) {
					return e.query("GET_STYLE_PROGRESS_INDICATOR_POSITION")
				}
			},
			processingCompleteIndicator: {opacity: 0, scaleX: .75, scaleY: .75},
			info: {translateX: 0, translateY: 0, opacity: 0},
			status: {translateX: 0, translateY: 0, opacity: 0}
		}, on = {
			buttonRemoveItem: {opacity: 1},
			buttonProcessItem: {opacity: 1},
			info: {translateX: $t},
			status: {translateX: $t}
		}, an = {buttonAbortItemProcessing: {opacity: 1}, processProgressIndicator: {opacity: 1}, status: {opacity: 1}},
		sn = {
			DID_THROW_ITEM_INVALID: {
				buttonRemoveItem: {opacity: 1},
				info: {translateX: $t},
				status: {translateX: $t, opacity: 1}
			},
			DID_START_ITEM_LOAD: {
				buttonAbortItemLoad: {opacity: 1},
				loadProgressIndicator: {opacity: 1},
				status: {opacity: 1}
			},
			DID_THROW_ITEM_LOAD_ERROR: {
				buttonRetryItemLoad: {opacity: 1},
				buttonRemoveItem: {opacity: 1},
				info: {translateX: $t},
				status: {opacity: 1}
			},
			DID_START_ITEM_REMOVE: {
				processProgressIndicator: {opacity: 1, align: nn},
				info: {translateX: $t},
				status: {opacity: 0}
			},
			DID_THROW_ITEM_REMOVE_ERROR: {
				processProgressIndicator: {opacity: 0, align: nn},
				buttonRemoveItem: {opacity: 1},
				info: {translateX: $t},
				status: {opacity: 1, translateX: $t}
			},
			DID_LOAD_ITEM: on,
			DID_LOAD_LOCAL_ITEM: {buttonRemoveItem: {opacity: 1}, info: {translateX: $t}, status: {translateX: $t}},
			DID_START_ITEM_PROCESSING: an,
			DID_REQUEST_ITEM_PROCESSING: an,
			DID_UPDATE_ITEM_PROCESS_PROGRESS: an,
			DID_COMPLETE_ITEM_PROCESSING: {
				buttonRevertItemProcessing: {opacity: 1},
				info: {opacity: 1},
				status: {opacity: 1}
			},
			DID_THROW_ITEM_PROCESSING_ERROR: {
				buttonRemoveItem: {opacity: 1},
				buttonRetryItemProcessing: {opacity: 1},
				status: {opacity: 1},
				info: {translateX: $t}
			},
			DID_THROW_ITEM_PROCESSING_REVERT_ERROR: {
				buttonRevertItemProcessing: {opacity: 1},
				status: {opacity: 1},
				info: {opacity: 1}
			},
			DID_ABORT_ITEM_PROCESSING: {
				buttonRemoveItem: {opacity: 1},
				buttonProcessItem: {opacity: 1},
				info: {translateX: $t},
				status: {opacity: 1}
			},
			DID_REVERT_ITEM_PROCESSING: on
		}, un = S({
			create: function (e) {
				var t = e.root;
				t.element.innerHTML = t.query("GET_ICON_DONE")
			},
			name: "processing-complete-indicator",
			ignoreRect: !0,
			mixins: {
				styles: ["scaleX", "scaleY", "opacity"],
				animations: {scaleX: "spring", scaleY: "spring", opacity: {type: "tween", duration: 250}}
			}
		}), ln = A({
			DID_SET_LABEL_BUTTON_ABORT_ITEM_PROCESSING: function (e) {
				var t = e.root, n = e.action;
				t.ref.buttonAbortItemProcessing.label = n.value
			}, DID_SET_LABEL_BUTTON_ABORT_ITEM_LOAD: function (e) {
				var t = e.root, n = e.action;
				t.ref.buttonAbortItemLoad.label = n.value
			}, DID_SET_LABEL_BUTTON_ABORT_ITEM_REMOVAL: function (e) {
				var t = e.root, n = e.action;
				t.ref.buttonAbortItemRemoval.label = n.value
			}, DID_REQUEST_ITEM_PROCESSING: function (e) {
				var t = e.root;
				t.ref.processProgressIndicator.spin = !0, t.ref.processProgressIndicator.progress = 0
			}, DID_START_ITEM_LOAD: function (e) {
				var t = e.root;
				t.ref.loadProgressIndicator.spin = !0, t.ref.loadProgressIndicator.progress = 0
			}, DID_START_ITEM_REMOVE: function (e) {
				var t = e.root;
				t.ref.processProgressIndicator.spin = !0, t.ref.processProgressIndicator.progress = 0
			}, DID_UPDATE_ITEM_LOAD_PROGRESS: function (e) {
				var t = e.root, n = e.action;
				t.ref.loadProgressIndicator.spin = !1, t.ref.loadProgressIndicator.progress = n.progress
			}, DID_UPDATE_ITEM_PROCESS_PROGRESS: function (e) {
				var t = e.root, n = e.action;
				t.ref.processProgressIndicator.spin = !1, t.ref.processProgressIndicator.progress = n.progress
			}
		}), cn = S({
			create: function (e) {
				var n, r = e.root, o = e.props, i = Object.keys(Qt).reduce(function (e, t) {
						return e[t] = Object.assign({}, Qt[t]), e
					}, {}), a = o.id, s = r.query("GET_ALLOW_REVERT"), u = r.query("GET_ALLOW_REMOVE"),
					l = r.query("GET_ALLOW_PROCESS"), c = r.query("GET_INSTANT_UPLOAD"), f = r.query("IS_ASYNC"),
					d = r.query("GET_STYLE_BUTTON_REMOVE_ITEM_ALIGN");
				f ? l && !s ? n = function (e) {
					return !/RevertItemProcessing/.test(e)
				} : !l && s ? n = function (e) {
					return !/ProcessItem|RetryItemProcessing|AbortItemProcessing/.test(e)
				} : l || s || (n = function (e) {
					return !/Process/.test(e)
				}) : n = function (e) {
					return !/Process/.test(e)
				};
				var p = n ? Zt.filter(n) : Zt.concat();
				if (c && s && (i.RevertItemProcessing.label = "GET_LABEL_BUTTON_REMOVE_ITEM", i.RevertItemProcessing.icon = "GET_ICON_REMOVE"), f && !s) {
					var E = sn.DID_COMPLETE_ITEM_PROCESSING;
					E.info.translateX = tn, E.info.translateY = en, E.status.translateY = en, E.processingCompleteIndicator = {
						opacity: 1,
						scaleX: 1,
						scaleY: 1
					}
				}
				if (f && !l && (["DID_START_ITEM_PROCESSING", "DID_REQUEST_ITEM_PROCESSING", "DID_UPDATE_ITEM_PROCESS_PROGRESS", "DID_THROW_ITEM_PROCESSING_ERROR"].forEach(function (e) {
					sn[e].status.translateY = en
				}), sn.DID_THROW_ITEM_PROCESSING_ERROR.status.translateX = Jt), d && s) {
					i.RevertItemProcessing.align = "BUTTON_REMOVE_ITEM_POSITION";
					var _ = sn.DID_COMPLETE_ITEM_PROCESSING;
					_.info.translateX = $t, _.status.translateY = en, _.processingCompleteIndicator = {
						opacity: 1,
						scaleX: 1,
						scaleY: 1
					}
				}
				u || (i.RemoveItem.disabled = !0), t(i, function (e, t) {
					var n = r.createChildView(Ft, {label: r.query(t.label), icon: r.query(t.icon), opacity: 0});
					p.includes(e) && r.appendChildView(n), t.disabled && (n.element.setAttribute("disabled", "disabled"), n.element.setAttribute("hidden", "hidden")), n.element.dataset.align = r.query("GET_STYLE_" + t.align), n.element.classList.add(t.className), n.on("click", function (e) {
						e.stopPropagation(), t.disabled || r.dispatch(t.action, {query: a})
					}), r.ref["button" + e] = n
				}), r.ref.processingCompleteIndicator = r.appendChildView(r.createChildView(un)), r.ref.processingCompleteIndicator.element.dataset.align = r.query("GET_STYLE_BUTTON_PROCESS_ITEM_POSITION"), r.ref.info = r.appendChildView(r.createChildView(kt, {id: a})), r.ref.status = r.appendChildView(r.createChildView(zt, {id: a}));
				var T = r.appendChildView(r.createChildView(Bt, {
					opacity: 0,
					align: r.query("GET_STYLE_LOAD_INDICATOR_POSITION")
				}));
				T.element.classList.add("filepond--load-indicator"), r.ref.loadProgressIndicator = T;
				var I = r.appendChildView(r.createChildView(Bt, {
					opacity: 0,
					align: r.query("GET_STYLE_PROGRESS_INDICATOR_POSITION")
				}));
				I.element.classList.add("filepond--process-indicator"), r.ref.processProgressIndicator = I, r.ref.activeStyles = []
			}, write: function (e) {
				var n = e.root, r = e.actions, o = e.props;
				ln({root: n, actions: r, props: o});
				var i = r.concat().filter(function (e) {
					return /^DID_/.test(e.type)
				}).reverse().find(function (e) {
					return sn[e.type]
				});
				if (i) {
					n.ref.activeStyles = [];
					var a = sn[i.type];
					t(rn, function (e, r) {
						var o = n.ref[e];
						t(r, function (t, r) {
							var i = a[e] && void 0 !== a[e][t] ? a[e][t] : r;
							n.ref.activeStyles.push({control: o, key: t, value: i})
						})
					})
				}
				n.ref.activeStyles.forEach(function (e) {
					var t = e.control, r = e.key, o = e.value;
					t[r] = "function" == typeof o ? o(n) : o
				})
			}, didCreateView: function (e) {
				ye("CREATE_VIEW", Object.assign({}, e, {view: e}))
			}, name: "file"
		}), fn = S({
			create: function (e) {
				var t = e.root, n = e.props;
				t.ref.fileName = Ct("legend"), t.appendChild(t.ref.fileName), t.ref.file = t.appendChildView(t.createChildView(cn, {id: n.id})), t.ref.data = !1
			}, ignoreRect: !0, write: A({
				DID_LOAD_ITEM: function (e) {
					var t = e.root, n = e.props;
					Nt(t.ref.fileName, wt(t.query("GET_ITEM_NAME", n.id)))
				}
			}), didCreateView: function (e) {
				ye("CREATE_VIEW", Object.assign({}, e, {view: e}))
			}, tag: "fieldset", name: "file-wrapper"
		}), dn = {type: "spring", damping: .6, mass: 7}, pn = function (e, t, n) {
			var r = S({name: "panel-" + t.name + " filepond--" + n, mixins: t.mixins, ignoreRectUpdate: !0}),
				o = e.createChildView(r, t.props);
			e.ref[t.name] = e.appendChildView(o)
		}, En = S({
			name: "panel", read: function (e) {
				var t = e.root;
				return e.props.heightCurrent = t.ref.bottom.translateY
			}, write: function (e) {
				var t = e.root, n = e.props;
				if (null !== t.ref.scalable && n.scalable === t.ref.scalable || (t.ref.scalable = !N(n.scalable) || n.scalable, t.element.dataset.scalable = t.ref.scalable), n.height) {
					var r = t.ref.top.rect.element, o = t.ref.bottom.rect.element,
						i = Math.max(r.height + o.height, n.height);
					t.ref.center.translateY = r.height, t.ref.center.scaleY = (i - r.height - o.height) / 100, t.ref.bottom.translateY = i - o.height
				}
			}, create: function (e) {
				var t = e.root, n = e.props;
				[{name: "top"}, {
					name: "center",
					props: {translateY: null, scaleY: null},
					mixins: {animations: {scaleY: dn}, styles: ["translateY", "scaleY"]}
				}, {
					name: "bottom",
					props: {translateY: null},
					mixins: {animations: {translateY: dn}, styles: ["translateY"]}
				}].forEach(function (e) {
					pn(t, e, n.name)
				}), t.element.classList.add("filepond--" + n.name), t.ref.scalable = null
			}, ignoreRect: !0, mixins: {apis: ["height", "heightCurrent", "scalable"]}
		}), _n = {type: "spring", stiffness: .75, damping: .45, mass: 10}, Tn = {
			DID_START_ITEM_LOAD: "busy",
			DID_UPDATE_ITEM_LOAD_PROGRESS: "loading",
			DID_THROW_ITEM_INVALID: "load-invalid",
			DID_THROW_ITEM_LOAD_ERROR: "load-error",
			DID_LOAD_ITEM: "idle",
			DID_THROW_ITEM_REMOVE_ERROR: "remove-error",
			DID_START_ITEM_REMOVE: "busy",
			DID_START_ITEM_PROCESSING: "busy processing",
			DID_REQUEST_ITEM_PROCESSING: "busy processing",
			DID_UPDATE_ITEM_PROCESS_PROGRESS: "processing",
			DID_COMPLETE_ITEM_PROCESSING: "processing-complete",
			DID_THROW_ITEM_PROCESSING_ERROR: "processing-error",
			DID_THROW_ITEM_PROCESSING_REVERT_ERROR: "processing-revert-error",
			DID_ABORT_ITEM_PROCESSING: "cancelled",
			DID_REVERT_ITEM_PROCESSING: "idle"
		}, In = A({
			DID_UPDATE_PANEL_HEIGHT: function (e) {
				var t = e.root, n = e.action;
				t.height = n.height
			}
		}), vn = A({
			DID_GRAB_ITEM: function (e) {
				var t = e.root;
				e.props.dragOrigin = {x: t.translateX, y: t.translateY}
			}, DID_DRAG_ITEM: function (e) {
				e.root.element.dataset.dragState = "drag"
			}, DID_DROP_ITEM: function (e) {
				var t = e.root, n = e.props;
				n.dragOffset = null, n.dragOrigin = null, t.element.dataset.dragState = "drop"
			}
		}, function (e) {
			var t = e.root, n = e.actions, r = e.props, o = e.shouldOptimize;
			"drop" === t.element.dataset.dragState && t.scaleX <= 1 && (t.element.dataset.dragState = "idle");
			var i = n.concat().filter(function (e) {
				return /^DID_/.test(e.type)
			}).reverse().find(function (e) {
				return Tn[e.type]
			});
			i && i.type !== r.currentState && (r.currentState = i.type, t.element.dataset.filepondItemState = Tn[r.currentState] || "");
			var a = t.query("GET_ITEM_PANEL_ASPECT_RATIO") || t.query("GET_PANEL_ASPECT_RATIO");
			a ? o || (t.height = t.rect.element.width * a) : (In({
				root: t,
				actions: n,
				props: r
			}), !t.height && t.ref.container.rect.element.height > 0 && (t.height = t.ref.container.rect.element.height)), o && (t.ref.panel.height = null), t.ref.panel.height = t.height
		}), mn = S({
			create: function (e) {
				var t = e.root, n = e.props;
				t.ref.handleClick = function (e) {
					return t.dispatch("DID_ACTIVATE_ITEM", {id: n.id})
				}, t.element.id = "filepond--item-" + n.id, t.element.addEventListener("click", t.ref.handleClick), t.ref.container = t.appendChildView(t.createChildView(fn, {id: n.id})), t.ref.panel = t.appendChildView(t.createChildView(En, {name: "item-panel"})), t.ref.panel.height = null, n.markedForRemoval = !1, t.query("GET_ALLOW_REORDER") && (t.element.dataset.dragState = "idle", t.element.addEventListener("pointerdown", function (e) {
					if (e.isPrimary) {
						var r = !1, o = e.pageX, i = e.pageY;
						n.dragOrigin = {x: t.translateX, y: t.translateY}, n.dragCenter = {x: e.offsetX, y: e.offsetY};
						var a, s, u, l = (a = t.query("GET_ACTIVE_ITEMS"), s = a.map(function (e) {
							return e.id
						}), u = void 0, {
							setIndex: function (e) {
								u = e
							}, getIndex: function () {
								return u
							}, getItemIndex: function (e) {
								return s.indexOf(e.id)
							}
						});
						t.dispatch("DID_GRAB_ITEM", {id: n.id, dragState: l});
						var c = function (e) {
							e.isPrimary && (e.stopPropagation(), e.preventDefault(), n.dragOffset = {
								x: e.pageX - o,
								y: e.pageY - i
							}, n.dragOffset.x * n.dragOffset.x + n.dragOffset.y * n.dragOffset.y > 16 && !r && (r = !0, t.element.removeEventListener("click", t.ref.handleClick)), t.dispatch("DID_DRAG_ITEM", {
								id: n.id,
								dragState: l
							}))
						};
						document.addEventListener("pointermove", c), document.addEventListener("pointerup", function e(a) {
							a.isPrimary && (document.removeEventListener("pointermove", c), document.removeEventListener("pointerup", e), n.dragOffset = {
								x: a.pageX - o,
								y: a.pageY - i
							}, t.dispatch("DID_DROP_ITEM", {id: n.id, dragState: l}), r && setTimeout(function () {
								return t.element.addEventListener("click", t.ref.handleClick)
							}, 0))
						})
					}
				}))
			},
			write: vn,
			destroy: function (e) {
				var t = e.root, n = e.props;
				t.element.removeEventListener("click", t.ref.handleClick), t.dispatch("RELEASE_ITEM", {query: n.id})
			},
			tag: "li",
			name: "item",
			mixins: {
				apis: ["id", "interactionMethod", "markedForRemoval", "spawnDate", "dragCenter", "dragOrigin", "dragOffset"],
				styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity", "height"],
				animations: {
					scaleX: "spring",
					scaleY: "spring",
					translateX: _n,
					translateY: _n,
					opacity: {type: "tween", duration: 150}
				}
			}
		}), hn = function (e, t) {
			return Math.max(1, Math.floor((e + 1) / t))
		}, gn = function (e, t, n) {
			if (n) {
				var r = e.rect.element.width, o = t.length, i = null;
				if (0 === o || n.top < t[0].rect.element.top) return -1;
				var a = t[0].rect.element, s = a.marginLeft + a.marginRight, u = a.width + s, l = hn(r, u);
				if (1 === l) {
					for (var c = 0; c < o; c++) {
						var f = t[c], d = f.rect.outer.top + .5 * f.rect.element.height;
						if (n.top < d) return c
					}
					return o
				}
				for (var p = a.marginTop + a.marginBottom, E = a.height + p, _ = 0; _ < o; _++) {
					var T = _ % l * u, I = Math.floor(_ / l) * E, v = I - a.marginTop, m = T + u,
						h = I + E + a.marginBottom;
					if (n.top < h && n.top > v) {
						if (n.left < m) return _;
						i = _ !== o - 1 ? _ : null
					}
				}
				return null !== i ? i : o
			}
		}, Rn = {
			height: 0, width: 0, get getHeight() {
				return this.height
			}, set setHeight(e) {
				0 !== this.height && 0 !== e || (this.height = e)
			}, get getWidth() {
				return this.width
			}, set setWidth(e) {
				0 !== this.width && 0 !== e || (this.width = e)
			}, setDimensions: function (e, t) {
				0 !== this.height && 0 !== e || (this.height = e), 0 !== this.width && 0 !== t || (this.width = t)
			}
		}, On = function (e, t, n) {
			var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
				o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1;
			e.dragOffset ? (e.translateX = null, e.translateY = null, e.translateX = e.dragOrigin.x + e.dragOffset.x, e.translateY = e.dragOrigin.y + e.dragOffset.y, e.scaleX = 1.025, e.scaleY = 1.025) : (e.translateX = t, e.translateY = n, Date.now() > e.spawnDate && (0 === e.opacity && yn(e, t, n, r, o), e.scaleX = 1, e.scaleY = 1, e.opacity = 1))
		}, yn = function (e, t, n, r, o) {
			e.interactionMethod === re ? (e.translateX = null, e.translateX = t, e.translateY = null, e.translateY = n) : e.interactionMethod === ee ? (e.translateX = null, e.translateX = t - 20 * r, e.translateY = null, e.translateY = n - 10 * o, e.scaleX = .8, e.scaleY = .8) : e.interactionMethod === te ? (e.translateY = null, e.translateY = n - 30) : e.interactionMethod === J && (e.translateX = null, e.translateX = t - 30, e.translateY = null)
		}, Dn = function (e) {
			return e.rect.element.height + .5 * e.rect.element.marginBottom + .5 * e.rect.element.marginTop
		}, Sn = A({
			DID_ADD_ITEM: function (e) {
				var t = e.root, n = e.action, r = n.id, o = n.index, i = n.interactionMethod;
				t.ref.addIndex = o;
				var a = Date.now(), s = a, u = 1;
				if (i !== re) {
					u = 0;
					var l = t.query("GET_ITEM_INSERT_INTERVAL"), c = a - t.ref.lastItemSpanwDate;
					s = c < l ? a + (l - c) : a
				}
				t.ref.lastItemSpanwDate = s, t.appendChildView(t.createChildView(mn, {
					spawnDate: s,
					id: r,
					opacity: u,
					interactionMethod: i
				}), o)
			}, DID_REMOVE_ITEM: function (e) {
				var t = e.root, n = e.action.id, r = t.childViews.find(function (e) {
					return e.id === n
				});
				r && (r.scaleX = .9, r.scaleY = .9, r.opacity = 0, r.markedForRemoval = !0)
			}, DID_DRAG_ITEM: function (e) {
				var t = e.root, n = e.action, r = n.id, o = n.dragState, i = t.query("GET_ITEM", {id: r}),
					a = t.childViews.find(function (e) {
						return e.id === r
					}), s = t.childViews.length, u = o.getItemIndex(i);
				if (a) {
					var l, c = a.dragOrigin.x + a.dragOffset.x + a.dragCenter.x,
						f = a.dragOrigin.y + a.dragOffset.y + a.dragCenter.y, d = Dn(a),
						p = (l = a).rect.element.width + .5 * l.rect.element.marginLeft + .5 * l.rect.element.marginRight,
						E = Math.floor(t.rect.outer.width / p);
					E > s && (E = s);
					var _ = Math.floor(s / E + 1);
					Rn.setHeight = d * _, Rn.setWidth = p * E;
					var T = {
						y: Math.floor(f / d), x: Math.floor(c / p), getGridIndex: function () {
							return f > Rn.getHeight || f < 0 || c > Rn.getWidth || c < 0 ? u : this.y * E + this.x
						}, getColIndex: function () {
							for (var e = t.query("GET_ACTIVE_ITEMS"), n = t.childViews.filter(function (e) {
								return e.rect.element.height
							}), r = e.map(function (e) {
								return n.find(function (t) {
									return t.id === e.id
								})
							}), o = r.findIndex(function (e) {
								return e === a
							}), i = Dn(a), s = r.length, u = s, l = 0, c = 0, d = 0, p = 0; p < s; p++) if (l = Dn(r[p]), f < (c = (d = c) + l)) {
								if (o > p) {
									if (f < d + i) {
										u = p;
										break
									}
									continue
								}
								u = p;
								break
							}
							return u
						}
					}, I = E > 1 ? T.getGridIndex() : T.getColIndex();
					t.dispatch("MOVE_ITEM", {query: a, index: I});
					var v = o.getIndex();
					if (void 0 === v || v !== I) {
						if (o.setIndex(I), void 0 === v) return;
						t.dispatch("DID_REORDER_ITEMS", {items: t.query("GET_ACTIVE_ITEMS"), origin: u, target: I})
					}
				}
			}
		}), An = S({
			create: function (e) {
				var t = e.root;
				r(t.element, "role", "list"), t.ref.lastItemSpanwDate = Date.now()
			}, write: function (e) {
				var t = e.root, n = e.props, r = e.actions, o = e.shouldOptimize;
				Sn({root: t, props: n, actions: r});
				var i = n.dragCoordinates, a = t.rect.element.width, s = t.childViews.filter(function (e) {
					return e.rect.element.height
				}), u = t.query("GET_ACTIVE_ITEMS").map(function (e) {
					return s.find(function (t) {
						return t.id === e.id
					})
				}).filter(function (e) {
					return e
				}), l = i ? gn(t, u, i) : null, c = t.ref.addIndex || null;
				t.ref.addIndex = null;
				var f = 0, d = 0, p = 0;
				if (0 !== u.length) {
					var E = u[0].rect.element, _ = E.marginTop + E.marginBottom, T = E.marginLeft + E.marginRight,
						I = E.width + T, v = E.height + _, m = hn(a, I);
					if (1 === m) {
						var h = 0, g = 0;
						u.forEach(function (e, t) {
							if (l) {
								var n = t - l;
								g = -2 === n ? .25 * -_ : -1 === n ? .75 * -_ : 0 === n ? .75 * _ : 1 === n ? .25 * _ : 0
							}
							o && (e.translateX = null, e.translateY = null), e.markedForRemoval || On(e, 0, h + g);
							var r = (e.rect.element.height + _) * (e.markedForRemoval ? e.opacity : 1);
							h += r
						})
					} else {
						var R = 0, O = 0;
						u.forEach(function (e, t) {
							t === l && (f = 1), t === c && (p += 1), e.markedForRemoval && e.opacity < .5 && (d -= 1);
							var n = t + p + f + d, r = n % m, i = Math.floor(n / m), a = r * I, s = i * v,
								u = Math.sign(a - R), E = Math.sign(s - O);
							R = a, O = s, e.markedForRemoval || (o && (e.translateX = null, e.translateY = null), On(e, a, s, u, E))
						})
					}
				}
			}, tag: "ul", name: "list", didWriteView: function (e) {
				var t = e.root;
				t.childViews.filter(function (e) {
					return e.markedForRemoval && 0 === e.opacity && e.resting
				}).forEach(function (e) {
					e._destroy(), t.removeChildView(e)
				})
			}, filterFrameActionsForChild: function (e, t) {
				return t.filter(function (t) {
					return !t.data || !t.data.id || e.id === t.data.id
				})
			}, mixins: {apis: ["dragCoordinates"]}
		}), Ln = A({
			DID_DRAG: function (e) {
				var t = e.root, n = e.props, r = e.action;
				t.query("GET_ITEM_INSERT_LOCATION_FREEDOM") && (n.dragCoordinates = {
					left: r.position.scopeLeft - t.ref.list.rect.element.left,
					top: r.position.scopeTop - (t.rect.outer.top + t.rect.element.marginTop + t.rect.element.scrollTop)
				})
			}, DID_END_DRAG: function (e) {
				e.props.dragCoordinates = null
			}
		}), bn = S({
			create: function (e) {
				var t = e.root, n = e.props;
				t.ref.list = t.appendChildView(t.createChildView(An)), n.dragCoordinates = null, n.overflowing = !1
			},
			write: function (e) {
				var t = e.root, n = e.props, r = e.actions;
				if (Ln({
					root: t,
					props: n,
					actions: r
				}), t.ref.list.dragCoordinates = n.dragCoordinates, n.overflowing && !n.overflow && (n.overflowing = !1, t.element.dataset.state = "", t.height = null), n.overflow) {
					var o = Math.round(n.overflow);
					o !== t.height && (n.overflowing = !0, t.element.dataset.state = "overflow", t.height = o)
				}
			},
			name: "list-scroller",
			mixins: {
				apis: ["overflow", "dragCoordinates"],
				styles: ["height", "translateY"],
				animations: {translateY: "spring"}
			}
		}), Pn = function (e, t, n) {
			var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
			n ? r(e, t, o) : e.removeAttribute(t)
		}, Mn = function (e) {
			var t = e.root, n = e.action;
			t.query("GET_ALLOW_SYNC_ACCEPT_ATTRIBUTE") && Pn(t.element, "accept", !!n.value, n.value ? n.value.join(",") : "")
		}, wn = function (e) {
			var t = e.root, n = e.action;
			Pn(t.element, "multiple", n.value)
		}, Cn = function (e) {
			var t = e.root, n = e.action;
			Pn(t.element, "webkitdirectory", n.value)
		}, Nn = function (e) {
			var t = e.root, n = t.query("GET_DISABLED"), r = t.query("GET_ALLOW_BROWSE"), o = n || !r;
			Pn(t.element, "disabled", o)
		}, Gn = function (e) {
			var t = e.root;
			e.action.value ? 0 === t.query("GET_TOTAL_ITEMS") && Pn(t.element, "required", !0) : Pn(t.element, "required", !1)
		}, Un = function (e) {
			var t = e.root, n = e.action;
			Pn(t.element, "capture", !!n.value, !0 === n.value ? "" : n.value)
		}, Bn = function (e) {
			var t = e.root, n = t.element;
			t.query("GET_TOTAL_ITEMS") > 0 ? (Pn(n, "required", !1), Pn(n, "name", !1)) : (Pn(n, "name", !0, t.query("GET_NAME")), t.query("GET_CHECK_VALIDITY") && n.setCustomValidity(""), t.query("GET_REQUIRED") && Pn(n, "required", !0))
		}, Fn = S({
			tag: "input",
			name: "browser",
			ignoreRect: !0,
			ignoreRectUpdate: !0,
			attributes: {type: "file"},
			create: function (e) {
				var t = e.root, n = e.props;
				t.element.id = "filepond--browser-" + n.id, r(t.element, "name", t.query("GET_NAME")), r(t.element, "aria-controls", "filepond--assistant-" + n.id), r(t.element, "aria-labelledby", "filepond--drop-label-" + n.id), Mn({
					root: t,
					action: {value: t.query("GET_ACCEPTED_FILE_TYPES")}
				}), wn({root: t, action: {value: t.query("GET_ALLOW_MULTIPLE")}}), Cn({
					root: t,
					action: {value: t.query("GET_ALLOW_DIRECTORIES_ONLY")}
				}), Nn({root: t}), Gn({root: t, action: {value: t.query("GET_REQUIRED")}}), Un({
					root: t,
					action: {value: t.query("GET_CAPTURE_METHOD")}
				}), t.ref.handleChange = function (e) {
					if (t.element.value) {
						var r = Array.from(t.element.files).map(function (e) {
							return e._relativePath = e.webkitRelativePath, e
						});
						setTimeout(function () {
							n.onload(r), function (e) {
								if (e && "" !== e.value) {
									try {
										e.value = ""
									} catch (e) {
									}
									if (e.value) {
										var t = Ct("form"), n = e.parentNode, r = e.nextSibling;
										t.appendChild(e), t.reset(), r ? n.insertBefore(e, r) : n.appendChild(e)
									}
								}
							}(t.element)
						}, 250)
					}
				}, t.element.addEventListener("change", t.ref.handleChange)
			},
			destroy: function (e) {
				var t = e.root;
				t.element.removeEventListener("change", t.ref.handleChange)
			},
			write: A({
				DID_LOAD_ITEM: Bn,
				DID_REMOVE_ITEM: Bn,
				DID_THROW_ITEM_INVALID: function (e) {
					var t = e.root;
					t.query("GET_CHECK_VALIDITY") && t.element.setCustomValidity(t.query("GET_LABEL_INVALID_FIELD"))
				},
				DID_SET_DISABLED: Nn,
				DID_SET_ALLOW_BROWSE: Nn,
				DID_SET_ALLOW_DIRECTORIES_ONLY: Cn,
				DID_SET_ALLOW_MULTIPLE: wn,
				DID_SET_ACCEPTED_FILE_TYPES: Mn,
				DID_SET_CAPTURE_METHOD: Un,
				DID_SET_REQUIRED: Gn
			})
		}), qn = 13, Vn = 32, xn = function (e, t) {
			e.innerHTML = t;
			var n = e.querySelector(".filepond--label-action");
			return n && r(n, "tabindex", "0"), t
		}, Yn = S({
			name: "drop-label",
			ignoreRect: !0,
			create: function (e) {
				var t = e.root, n = e.props, o = Ct("label");
				r(o, "for", "filepond--browser-" + n.id), r(o, "id", "filepond--drop-label-" + n.id), r(o, "aria-hidden", "true"), t.ref.handleKeyDown = function (e) {
					(e.keyCode === qn || e.keyCode === Vn) && (e.preventDefault(), t.ref.label.click())
				}, t.ref.handleClick = function (e) {
					e.target === o || o.contains(e.target) || t.ref.label.click()
				}, o.addEventListener("keydown", t.ref.handleKeyDown), t.element.addEventListener("click", t.ref.handleClick), xn(o, n.caption), t.appendChild(o), t.ref.label = o
			},
			destroy: function (e) {
				var t = e.root;
				t.ref.label.addEventListener("keydown", t.ref.handleKeyDown), t.element.removeEventListener("click", t.ref.handleClick)
			},
			write: A({
				DID_SET_LABEL_IDLE: function (e) {
					var t = e.root, n = e.action;
					xn(t.ref.label, n.value)
				}
			}),
			mixins: {
				styles: ["opacity", "translateX", "translateY"],
				animations: {opacity: {type: "tween", duration: 150}, translateX: "spring", translateY: "spring"}
			}
		}), kn = S({
			name: "drip-blob",
			ignoreRect: !0,
			mixins: {
				styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"],
				animations: {
					scaleX: "spring",
					scaleY: "spring",
					translateX: "spring",
					translateY: "spring",
					opacity: {type: "tween", duration: 250}
				}
			}
		}), jn = A({
			DID_DRAG: function (e) {
				var t = e.root, n = e.action;
				t.ref.blob ? (t.ref.blob.translateX = n.position.scopeLeft, t.ref.blob.translateY = n.position.scopeTop, t.ref.blob.scaleX = 1, t.ref.blob.scaleY = 1, t.ref.blob.opacity = 1) : function (e) {
					var t = e.root, n = .5 * t.rect.element.width, r = .5 * t.rect.element.height;
					t.ref.blob = t.appendChildView(t.createChildView(kn, {
						opacity: 0,
						scaleX: 2.5,
						scaleY: 2.5,
						translateX: n,
						translateY: r
					}))
				}({root: t})
			}, DID_DROP: function (e) {
				var t = e.root;
				t.ref.blob && (t.ref.blob.scaleX = 2.5, t.ref.blob.scaleY = 2.5, t.ref.blob.opacity = 0)
			}, DID_END_DRAG: function (e) {
				var t = e.root;
				t.ref.blob && (t.ref.blob.opacity = 0)
			}
		}), Hn = S({
			ignoreRect: !0, ignoreRectUpdate: !0, name: "drip", write: function (e) {
				var t = e.root, n = e.props, r = e.actions;
				jn({root: t, props: n, actions: r});
				var o = t.ref.blob;
				0 === r.length && o && 0 === o.opacity && (t.removeChildView(o), t.ref.blob = null)
			}
		}), Xn = function (e, t) {
			try {
				var n = new DataTransfer;
				t.forEach(function (e) {
					e instanceof File ? n.items.add(e) : n.items.add(new File([e], e.name, {type: e.type}))
				}), e.files = n.files
			} catch (e) {
				return !1
			}
			return !0
		}, Wn = function (e, t) {
			return e.ref.fields[t]
		}, zn = function (e) {
			e.query("GET_ACTIVE_ITEMS").forEach(function (t) {
				e.ref.fields[t.id] && e.element.appendChild(e.ref.fields[t.id])
			})
		}, Qn = function (e) {
			var t = e.root;
			return zn(t)
		}, Zn = A({
			DID_SET_DISABLED: function (e) {
				var t = e.root;
				t.element.disabled = t.query("GET_DISABLED")
			}, DID_ADD_ITEM: function (e) {
				var t = e.root, n = e.action,
					r = !(t.query("GET_ITEM", n.id).origin === ve.LOCAL) && t.query("SHOULD_UPDATE_FILE_INPUT"),
					o = Ct("input");
				o.type = r ? "file" : "hidden", o.name = t.query("GET_NAME"), o.disabled = t.query("GET_DISABLED"), t.ref.fields[n.id] = o, zn(t)
			}, DID_LOAD_ITEM: function (e) {
				var t = e.root, n = e.action, r = Wn(t, n.id);
				if (r && (null !== n.serverFileReference && (r.value = n.serverFileReference), t.query("SHOULD_UPDATE_FILE_INPUT"))) {
					var o = t.query("GET_ITEM", n.id);
					Xn(r, [o.file])
				}
			}, DID_REMOVE_ITEM: function (e) {
				var t = e.root, n = e.action, r = Wn(t, n.id);
				r && (r.parentNode && r.parentNode.removeChild(r), delete t.ref.fields[n.id])
			}, DID_DEFINE_VALUE: function (e) {
				var t = e.root, n = e.action, r = Wn(t, n.id);
				r && (null === n.value ? r.removeAttribute("value") : r.value = n.value, zn(t))
			}, DID_PREPARE_OUTPUT: function (e) {
				var t = e.root, n = e.action;
				t.query("SHOULD_UPDATE_FILE_INPUT") && setTimeout(function () {
					var e = Wn(t, n.id);
					e && Xn(e, [n.file])
				}, 0)
			}, DID_REORDER_ITEMS: Qn, DID_SORT_ITEMS: Qn
		}), Kn = S({
			tag: "fieldset", name: "data", create: function (e) {
				return e.root.ref.fields = {}
			}, write: Zn, ignoreRect: !0
		}), $n = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "tiff"], Jn = ["css", "csv", "html", "txt"],
		er = {zip: "zip|compressed", epub: "application/epub+zip"}, tr = function () {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
			return e = e.toLowerCase(), $n.includes(e) ? "image/" + ("jpg" === e ? "jpeg" : "svg" === e ? "svg+xml" : e) : Jn.includes(e) ? "text/" + e : er[e] || ""
		}, nr = function (e) {
			return new Promise(function (t, n) {
				var r = dr(e);
				if (r.length && !rr(e)) return t(r);
				or(e).then(t)
			})
		}, rr = function (e) {
			return !!e.files && e.files.length > 0
		}, or = function (e) {
			return new Promise(function (t, n) {
				var r = (e.items ? Array.from(e.items) : []).filter(function (e) {
					return ir(e)
				}).map(function (e) {
					return ar(e)
				});
				r.length ? Promise.all(r).then(function (e) {
					var n = [];
					e.forEach(function (e) {
						n.push.apply(n, e)
					}), t(n.filter(function (e) {
						return e
					}).map(function (e) {
						return e._relativePath || (e._relativePath = e.webkitRelativePath), e
					}))
				}).catch(console.error) : t(e.files ? Array.from(e.files) : [])
			})
		}, ir = function (e) {
			if (cr(e)) {
				var t = fr(e);
				if (t) return t.isFile || t.isDirectory
			}
			return "file" === e.kind
		}, ar = function (e) {
			return new Promise(function (t, n) {
				lr(e) ? sr(fr(e)).then(t).catch(n) : t([e.getAsFile()])
			})
		}, sr = function (e) {
			return new Promise(function (t, n) {
				var r = [], o = 0, i = 0, a = function () {
					0 === i && 0 === o && t(r)
				};
				!function e(t) {
					o++;
					var s = t.createReader();
					!function t() {
						s.readEntries(function (n) {
							if (0 === n.length) return o--, void a();
							n.forEach(function (t) {
								t.isDirectory ? e(t) : (i++, t.file(function (e) {
									var n = ur(e);
									t.fullPath && (n._relativePath = t.fullPath), r.push(n), i--, a()
								}))
							}), t()
						}, n)
					}()
				}(e)
			})
		}, ur = function (e) {
			if (e.type.length) return e;
			var t = e.lastModifiedDate, n = e.name, r = tr(je(e.name));
			return r.length ? ((e = e.slice(0, e.size, r)).name = n, e.lastModifiedDate = t, e) : e
		}, lr = function (e) {
			return cr(e) && (fr(e) || {}).isDirectory
		}, cr = function (e) {
			return "webkitGetAsEntry" in e
		}, fr = function (e) {
			return e.webkitGetAsEntry()
		}, dr = function (e) {
			var t = [];
			try {
				if ((t = Er(e)).length) return t;
				t = pr(e)
			} catch (e) {
			}
			return t
		}, pr = function (e) {
			var t = e.getData("url");
			return "string" == typeof t && t.length ? [t] : []
		}, Er = function (e) {
			var t = e.getData("text/html");
			if ("string" == typeof t && t.length) {
				var n = t.match(/src\s*=\s*"(.+?)"/);
				if (n) return [n[1]]
			}
			return []
		}, _r = [], Tr = function (e) {
			return {pageLeft: e.pageX, pageTop: e.pageY, scopeLeft: e.offsetX || e.layerX, scopeTop: e.offsetY || e.layerY}
		}, Ir = function (e) {
			var t = _r.find(function (t) {
				return t.element === e
			});
			if (t) return t;
			var n = vr(e);
			return _r.push(n), n
		}, vr = function (e) {
			var n = [], r = {dragenter: Rr, dragover: Or, dragleave: Dr, drop: yr}, o = {};
			t(r, function (t, r) {
				o[t] = r(e, n), e.addEventListener(t, o[t], !1)
			});
			var i = {
				element: e, addListener: function (a) {
					return n.push(a), function () {
						n.splice(n.indexOf(a), 1), 0 === n.length && (_r.splice(_r.indexOf(i), 1), t(r, function (t) {
							e.removeEventListener(t, o[t], !1)
						}))
					}
				}
			};
			return i
		}, mr = function (e, t) {
			var n, r = function (e, t) {
				return "elementFromPoint" in e || (e = document), e.elementFromPoint(t.x, t.y)
			}("getRootNode" in (n = t) ? n.getRootNode() : document, {
				x: e.pageX - window.pageXOffset,
				y: e.pageY - window.pageYOffset
			});
			return r === t || t.contains(r)
		}, hr = null, gr = function (e, t) {
			try {
				e.dropEffect = t
			} catch (e) {
			}
		}, Rr = function (e, t) {
			return function (e) {
				e.preventDefault(), hr = e.target, t.forEach(function (t) {
					var n = t.element, r = t.onenter;
					mr(e, n) && (t.state = "enter", r(Tr(e)))
				})
			}
		}, Or = function (e, t) {
			return function (e) {
				e.preventDefault();
				var n = e.dataTransfer;
				nr(n).then(function (r) {
					var o = !1;
					t.some(function (t) {
						var i = t.filterElement, a = t.element, s = t.onenter, u = t.onexit, l = t.ondrag, c = t.allowdrop;
						gr(n, "copy");
						var f = c(r);
						if (f) if (mr(e, a)) {
							if (o = !0, null === t.state) return t.state = "enter", void s(Tr(e));
							if (t.state = "over", i && !f) return void gr(n, "none");
							l(Tr(e))
						} else i && !o && gr(n, "none"), t.state && (t.state = null, u(Tr(e))); else gr(n, "none")
					})
				})
			}
		}, yr = function (e, t) {
			return function (e) {
				e.preventDefault();
				var n = e.dataTransfer;
				nr(n).then(function (n) {
					t.forEach(function (t) {
						var r = t.filterElement, o = t.element, i = t.ondrop, a = t.onexit, s = t.allowdrop;
						if (t.state = null, !r || mr(e, o)) return s(n) ? void i(Tr(e), n) : a(Tr(e))
					})
				})
			}
		}, Dr = function (e, t) {
			return function (e) {
				hr === e.target && t.forEach(function (t) {
					var n = t.onexit;
					t.state = null, n(Tr(e))
				})
			}
		}, Sr = function (e, t, n) {
			e.classList.add("filepond--hopper");
			var r = n.catchesDropsOnPage, o = n.requiresDropOnElement, i = n.filterItems, a = void 0 === i ? function (e) {
				return e
			} : i, s = function (e, t, n) {
				var r = Ir(t), o = {
					element: e, filterElement: n, state: null, ondrop: function () {
					}, onenter: function () {
					}, ondrag: function () {
					}, onexit: function () {
					}, onload: function () {
					}, allowdrop: function () {
					}
				};
				return o.destroy = r.addListener(o), o
			}(e, r ? document.documentElement : e, o), u = "", l = "";
			s.allowdrop = function (e) {
				return t(a(e))
			}, s.ondrop = function (e, n) {
				var r = a(n);
				t(r) ? (l = "drag-drop", c.onload(r, e)) : c.ondragend(e)
			}, s.ondrag = function (e) {
				c.ondrag(e)
			}, s.onenter = function (e) {
				l = "drag-over", c.ondragstart(e)
			}, s.onexit = function (e) {
				l = "drag-exit", c.ondragend(e)
			};
			var c = {
				updateHopperState: function () {
					u !== l && (e.dataset.hopperState = l, u = l)
				}, onload: function () {
				}, ondragstart: function () {
				}, ondrag: function () {
				}, ondragend: function () {
				}, destroy: function () {
					s.destroy()
				}
			};
			return c
		}, Ar = !1, Lr = [], br = function (e) {
			var t = document.activeElement;
			if (t && /textarea|input/i.test(t.nodeName)) {
				for (var n = !1, r = t; r !== document.body;) {
					if (r.classList.contains("filepond--root")) {
						n = !0;
						break
					}
					r = r.parentNode
				}
				if (!n) return
			}
			nr(e.clipboardData).then(function (e) {
				e.length && Lr.forEach(function (t) {
					return t(e)
				})
			})
		}, Pr = function () {
			var e = function (e) {
				t.onload(e)
			}, t = {
				destroy: function () {
					var t;
					t = e, de(Lr, Lr.indexOf(t)), 0 === Lr.length && (document.removeEventListener("paste", br), Ar = !1)
				}, onload: function () {
				}
			};
			return function (e) {
				Lr.includes(e) || (Lr.push(e), Ar || (Ar = !0, document.addEventListener("paste", br)))
			}(e), t
		}, Mr = null, wr = null, Cr = [], Nr = function (e, t) {
			e.element.textContent = t
		}, Gr = function (e, t, n) {
			var r = e.query("GET_TOTAL_ITEMS");
			Nr(e, n + " " + t + ", " + r + " " + (1 === r ? e.query("GET_LABEL_FILE_COUNT_SINGULAR") : e.query("GET_LABEL_FILE_COUNT_PLURAL"))), clearTimeout(wr), wr = setTimeout(function () {
				!function (e) {
					e.element.textContent = ""
				}(e)
			}, 1500)
		}, Ur = function (e) {
			return e.element.parentNode.contains(document.activeElement)
		}, Br = function (e) {
			var t = e.root, n = e.action, r = t.query("GET_ITEM", n.id).filename,
				o = t.query("GET_LABEL_FILE_PROCESSING_ABORTED");
			Nr(t, r + " " + o)
		}, Fr = function (e) {
			var t = e.root, n = e.action, r = t.query("GET_ITEM", n.id).filename;
			Nr(t, n.status.main + " " + r + " " + n.status.sub)
		}, qr = S({
			create: function (e) {
				var t = e.root, n = e.props;
				t.element.id = "filepond--assistant-" + n.id, r(t.element, "role", "status"), r(t.element, "aria-live", "polite"), r(t.element, "aria-relevant", "additions")
			}, ignoreRect: !0, ignoreRectUpdate: !0, write: A({
				DID_LOAD_ITEM: function (e) {
					var t = e.root, n = e.action;
					if (Ur(t)) {
						t.element.textContent = "";
						var r = t.query("GET_ITEM", n.id);
						Cr.push(r.filename), clearTimeout(Mr), Mr = setTimeout(function () {
							Gr(t, Cr.join(", "), t.query("GET_LABEL_FILE_ADDED")), Cr.length = 0
						}, 750)
					}
				},
				DID_REMOVE_ITEM: function (e) {
					var t = e.root, n = e.action;
					if (Ur(t)) {
						var r = n.item;
						Gr(t, r.filename, t.query("GET_LABEL_FILE_REMOVED"))
					}
				},
				DID_COMPLETE_ITEM_PROCESSING: function (e) {
					var t = e.root, n = e.action, r = t.query("GET_ITEM", n.id).filename,
						o = t.query("GET_LABEL_FILE_PROCESSING_COMPLETE");
					Nr(t, r + " " + o)
				},
				DID_ABORT_ITEM_PROCESSING: Br,
				DID_REVERT_ITEM_PROCESSING: Br,
				DID_THROW_ITEM_REMOVE_ERROR: Fr,
				DID_THROW_ITEM_LOAD_ERROR: Fr,
				DID_THROW_ITEM_INVALID: Fr,
				DID_THROW_ITEM_PROCESSING_ERROR: Fr
			}), tag: "span", name: "assistant"
		}), Vr = function (e) {
			var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "-";
			return e.replace(new RegExp(t + ".", "g"), function (e) {
				return e.charAt(1).toUpperCase()
			})
		}, xr = function (e) {
			var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 16,
				n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], r = Date.now(), o = null;
			return function () {
				for (var i = arguments.length, a = new Array(i), s = 0; s < i; s++) a[s] = arguments[s];
				clearTimeout(o);
				var u = Date.now() - r, l = function () {
					r = Date.now(), e.apply(void 0, a)
				};
				u < t ? n || (o = setTimeout(l, t - u)) : l()
			}
		}, Yr = function (e) {
			return e.preventDefault()
		}, kr = function (e) {
			var t = e.ref.list.childViews[0].childViews[0];
			return t ? {top: t.rect.element.marginTop, bottom: t.rect.element.marginBottom} : {top: 0, bottom: 0}
		}, jr = function (e) {
			var t = 0, n = 0, r = e.ref.list, o = r.childViews[0], i = o.childViews.filter(function (e) {
				return e.rect.element.height
			}), a = e.query("GET_ACTIVE_ITEMS").map(function (e) {
				return i.find(function (t) {
					return t.id === e.id
				})
			}).filter(function (e) {
				return e
			});
			if (0 === a.length) return {visual: t, bounds: n};
			var s = o.rect.element.width, u = gn(o, a, r.dragCoordinates), l = a[0].rect.element,
				c = l.marginTop + l.marginBottom, f = l.marginLeft + l.marginRight, d = l.width + f, p = l.height + c,
				E = void 0 !== u && u >= 0 ? 1 : 0, _ = a.find(function (e) {
					return e.markedForRemoval && e.opacity < .45
				}) ? -1 : 0, T = a.length + E + _, I = hn(s, d);
			return 1 === I ? a.forEach(function (e) {
				var r = e.rect.element.height + c;
				n += r, t += r * e.opacity
			}) : (n = Math.ceil(T / I) * p, t = n), {visual: t, bounds: n}
		}, Hr = function (e) {
			var t = e.ref.measureHeight || null;
			return {cappedHeight: parseInt(e.style.maxHeight, 10) || null, fixedHeight: 0 === t ? null : t}
		}, Xr = function (e, t) {
			var n = e.query("GET_ALLOW_REPLACE"), r = e.query("GET_ALLOW_MULTIPLE"), o = e.query("GET_TOTAL_ITEMS"),
				i = e.query("GET_MAX_FILES"), a = t.length;
			return !r && a > 1 || !!(V(i = r ? i : n ? i : 1) && o + a > i) && (e.dispatch("DID_THROW_MAX_FILES", {
				source: t,
				error: ot("warning", 0, "Max files")
			}), !0)
		}, Wr = function (e, t, n) {
			var r = e.childViews[0];
			return gn(r, t, {
				left: n.scopeLeft - r.rect.element.left,
				top: n.scopeTop - (e.rect.outer.top + e.rect.element.marginTop + e.rect.element.scrollTop)
			})
		}, zr = function (e) {
			var t = e.query("GET_ALLOW_DROP"), n = e.query("GET_DISABLED"), r = t && !n;
			if (r && !e.ref.hopper) {
				var o = Sr(e.element, function (t) {
					var n = e.query("GET_BEFORE_DROP_FILE") || function () {
						return !0
					};
					return !e.query("GET_DROP_VALIDATION") || t.every(function (t) {
						return ye("ALLOW_HOPPER_ITEM", t, {query: e.query}).every(function (e) {
							return !0 === e
						}) && n(t)
					})
				}, {
					filterItems: function (t) {
						var n = e.query("GET_IGNORED_FILES");
						return t.filter(function (e) {
							return !ht(e) || !n.includes(e.name.toLowerCase())
						})
					},
					catchesDropsOnPage: e.query("GET_DROP_ON_PAGE"),
					requiresDropOnElement: e.query("GET_DROP_ON_ELEMENT")
				});
				o.onload = function (t, n) {
					var r = e.ref.list.childViews[0].childViews.filter(function (e) {
						return e.rect.element.height
					}), o = e.query("GET_ACTIVE_ITEMS").map(function (e) {
						return r.find(function (t) {
							return t.id === e.id
						})
					}).filter(function (e) {
						return e
					});
					Oe("ADD_ITEMS", t, {dispatch: e.dispatch}).then(function (t) {
						if (Xr(e, t)) return !1;
						e.dispatch("ADD_ITEMS", {items: t, index: Wr(e.ref.list, o, n), interactionMethod: ee})
					}), e.dispatch("DID_DROP", {position: n}), e.dispatch("DID_END_DRAG", {position: n})
				}, o.ondragstart = function (t) {
					e.dispatch("DID_START_DRAG", {position: t})
				}, o.ondrag = xr(function (t) {
					e.dispatch("DID_DRAG", {position: t})
				}), o.ondragend = function (t) {
					e.dispatch("DID_END_DRAG", {position: t})
				}, e.ref.hopper = o, e.ref.drip = e.appendChildView(e.createChildView(Hn))
			} else !r && e.ref.hopper && (e.ref.hopper.destroy(), e.ref.hopper = null, e.removeChildView(e.ref.drip))
		}, Qr = function (e, t) {
			var n = e.query("GET_ALLOW_BROWSE"), r = e.query("GET_DISABLED"), o = n && !r;
			o && !e.ref.browser ? e.ref.browser = e.appendChildView(e.createChildView(Fn, Object.assign({}, t, {
				onload: function (t) {
					Oe("ADD_ITEMS", t, {dispatch: e.dispatch}).then(function (t) {
						if (Xr(e, t)) return !1;
						e.dispatch("ADD_ITEMS", {items: t, index: -1, interactionMethod: te})
					})
				}
			})), 0) : !o && e.ref.browser && (e.removeChildView(e.ref.browser), e.ref.browser = null)
		}, Zr = function (e) {
			var t = e.query("GET_ALLOW_PASTE"), n = e.query("GET_DISABLED"), r = t && !n;
			r && !e.ref.paster ? (e.ref.paster = Pr(), e.ref.paster.onload = function (t) {
				Oe("ADD_ITEMS", t, {dispatch: e.dispatch}).then(function (t) {
					if (Xr(e, t)) return !1;
					e.dispatch("ADD_ITEMS", {items: t, index: -1, interactionMethod: ne})
				})
			}) : !r && e.ref.paster && (e.ref.paster.destroy(), e.ref.paster = null)
		}, Kr = A({
			DID_SET_ALLOW_BROWSE: function (e) {
				var t = e.root, n = e.props;
				Qr(t, n)
			}, DID_SET_ALLOW_DROP: function (e) {
				var t = e.root;
				zr(t)
			}, DID_SET_ALLOW_PASTE: function (e) {
				var t = e.root;
				Zr(t)
			}, DID_SET_DISABLED: function (e) {
				var t = e.root, n = e.props;
				zr(t), Zr(t), Qr(t, n), t.query("GET_DISABLED") ? t.element.dataset.disabled = "disabled" : t.element.removeAttribute("data-disabled")
			}
		}), $r = S({
			name: "root", read: function (e) {
				var t = e.root;
				t.ref.measure && (t.ref.measureHeight = t.ref.measure.offsetHeight)
			}, create: function (e) {
				var t = e.root, n = e.props, r = t.query("GET_ID");
				r && (t.element.id = r);
				var o = t.query("GET_CLASS_NAME");
				o && o.split(" ").filter(function (e) {
					return e.length
				}).forEach(function (e) {
					t.element.classList.add(e)
				}), t.ref.label = t.appendChildView(t.createChildView(Yn, Object.assign({}, n, {
					translateY: null,
					caption: t.query("GET_LABEL_IDLE")
				}))), t.ref.list = t.appendChildView(t.createChildView(bn, {translateY: null})), t.ref.panel = t.appendChildView(t.createChildView(En, {name: "panel-root"})), t.ref.assistant = t.appendChildView(t.createChildView(qr, Object.assign({}, n))), t.ref.data = t.appendChildView(t.createChildView(Kn, Object.assign({}, n))), t.ref.measure = Ct("div"), t.ref.measure.style.height = "100%", t.element.appendChild(t.ref.measure), t.ref.bounds = null, t.query("GET_STYLES").filter(function (e) {
					return !M(e.value)
				}).map(function (e) {
					var n = e.name, r = e.value;
					t.element.dataset[n] = r
				}), t.ref.widthPrevious = null, t.ref.widthUpdated = xr(function () {
					t.ref.updateHistory = [], t.dispatch("DID_RESIZE_ROOT")
				}, 250), t.ref.previousAspectRatio = null, t.ref.updateHistory = [];
				var i = window.matchMedia("(pointer: fine) and (hover: hover)").matches, a = "PointerEvent" in window;
				t.query("GET_ALLOW_REORDER") && a && !i && (t.element.addEventListener("touchmove", Yr, {passive: !1}), t.element.addEventListener("gesturestart", Yr));
				var s = t.query("GET_CREDITS");
				if (2 === s.length) {
					var u = document.createElement("a");
					u.className = "filepond--credits", u.setAttribute("aria-hidden", "true"), u.href = s[0], u.tabindex = -1, u.target = "_blank", u.rel = "noopener noreferrer", u.textContent = s[1], t.element.appendChild(u), t.ref.credits = u
				}
			}, write: function (e) {
				var t = e.root, n = e.props, r = e.actions;
				if (Kr({root: t, props: n, actions: r}), r.filter(function (e) {
					return /^DID_SET_STYLE_/.test(e.type)
				}).filter(function (e) {
					return !M(e.data.value)
				}).map(function (e) {
					var n = e.type, r = e.data, o = Vr(n.substr(8).toLowerCase(), "_");
					t.element.dataset[o] = r.value, t.invalidateLayout()
				}), !t.rect.element.hidden) {
					t.rect.element.width !== t.ref.widthPrevious && (t.ref.widthPrevious = t.rect.element.width, t.ref.widthUpdated());
					var o = t.ref.bounds;
					o || (o = t.ref.bounds = Hr(t), t.element.removeChild(t.ref.measure), t.ref.measure = null);
					var i = t.ref, a = i.hopper, s = i.label, u = i.list, l = i.panel;
					a && a.updateHopperState();
					var c = t.query("GET_PANEL_ASPECT_RATIO"), f = t.query("GET_ALLOW_MULTIPLE"),
						d = t.query("GET_TOTAL_ITEMS"), p = d === (f ? t.query("GET_MAX_FILES") || 1e6 : 1),
						E = r.find(function (e) {
							return "DID_ADD_ITEM" === e.type
						});
					if (p && E) {
						var _ = E.data.interactionMethod;
						s.opacity = 0, f ? s.translateY = -40 : _ === J ? s.translateX = 40 : s.translateY = _ === te ? 40 : 30
					} else p || (s.opacity = 1, s.translateX = 0, s.translateY = 0);
					var T = kr(t), I = jr(t), v = s.rect.element.height, m = !f || p ? 0 : v,
						h = p ? u.rect.element.marginTop : 0, g = 0 === d ? 0 : u.rect.element.marginBottom,
						R = m + h + I.visual + g, O = m + h + I.bounds + g;
					if (u.translateY = Math.max(0, m - u.rect.element.marginTop) - T.top, c) {
						var y = t.rect.element.width, D = y * c;
						c !== t.ref.previousAspectRatio && (t.ref.previousAspectRatio = c, t.ref.updateHistory = []);
						var S = t.ref.updateHistory;
						if (S.push(y), S.length > 4) for (var A = S.length, L = A - 10, b = 0, P = A; P >= L; P--) if (S[P] === S[P - 2] && b++, b >= 2) return;
						l.scalable = !1, l.height = D;
						var w = D - m - (g - T.bottom) - (p ? h : 0);
						I.visual > w ? u.overflow = w : u.overflow = null, t.height = D
					} else if (o.fixedHeight) {
						l.scalable = !1;
						var C = o.fixedHeight - m - (g - T.bottom) - (p ? h : 0);
						I.visual > C ? u.overflow = C : u.overflow = null
					} else if (o.cappedHeight) {
						var N = R >= o.cappedHeight, G = Math.min(o.cappedHeight, R);
						l.scalable = !0, l.height = N ? G : G - T.top - T.bottom;
						var U = G - m - (g - T.bottom) - (p ? h : 0);
						R > o.cappedHeight && I.visual > U ? u.overflow = U : u.overflow = null, t.height = Math.min(o.cappedHeight, O - T.top - T.bottom)
					} else {
						var B = d > 0 ? T.top + T.bottom : 0;
						l.scalable = !0, l.height = Math.max(v, R - B), t.height = Math.max(v, O - B)
					}
					t.ref.credits && l.heightCurrent && (t.ref.credits.style.transform = "translateY(" + l.heightCurrent + "px)")
				}
			}, destroy: function (e) {
				var t = e.root;
				t.ref.paster && t.ref.paster.destroy(), t.ref.hopper && t.ref.hopper.destroy(), t.element.removeEventListener("touchmove", Yr), t.element.removeEventListener("gesturestart", Yr)
			}, mixins: {styles: ["height"]}
		}), Jr = function () {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = null, o = Se(),
				i = function (e) {
					var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
						n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], r = Object.assign({}, e),
						o = [], i = [], a = function (e, t, n) {
							!n || document.hidden ? (c[e] && c[e](t), o.push({type: e, data: t})) : i.push({type: e, data: t})
						}, s = function (e) {
							for (var t, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) r[o - 1] = arguments[o];
							return l[e] ? (t = l)[e].apply(t, r) : null
						}, u = {
							getState: function () {
								return Object.assign({}, r)
							}, processActionQueue: function () {
								var e = [].concat(o);
								return o.length = 0, e
							}, processDispatchQueue: function () {
								var e = [].concat(i);
								i.length = 0, e.forEach(function (e) {
									var t = e.type, n = e.data;
									a(t, n)
								})
							}, dispatch: a, query: s
						}, l = {};
					t.forEach(function (e) {
						l = Object.assign({}, e(r), {}, l)
					});
					var c = {};
					return n.forEach(function (e) {
						c = Object.assign({}, e(a, s, r), {}, c)
					}), u
				}({
					items: [],
					listUpdateTimeout: null,
					itemUpdateTimeout: null,
					processingQueue: [],
					options: Q(o)
				}, [Ve, $(o)], [Pt, K(o)]);
			i.dispatch("SET_OPTIONS", {options: e});
			var a = function () {
				document.hidden || i.dispatch("KICK")
			};
			document.addEventListener("visibilitychange", a);
			var s = null, u = !1, l = !1, c = null, f = null, d = function () {
				u || (u = !0), clearTimeout(s), s = setTimeout(function () {
					u = !1, c = null, f = null, l && (l = !1, i.dispatch("DID_STOP_RESIZE"))
				}, 500)
			};
			window.addEventListener("resize", d);
			var p = $r(i, {id: oe()}), E = !1, T = !1, I = {
				_read: function () {
					u && (f = window.innerWidth, c || (c = f), l || f === c || (i.dispatch("DID_START_RESIZE"), l = !0)), T && E && (E = null === p.element.offsetParent), E || (p._read(), T = p.rect.element.hidden)
				}, _write: function (e) {
					var t, n = i.processActionQueue().filter(function (e) {
						return !/^SET_/.test(e.type)
					});
					E && !n.length || (g(n), E = p._write(e, n, l), (t = i.query("GET_ITEMS")).forEach(function (e, n) {
						e.released && de(t, n)
					}), E && i.processDispatchQueue())
				}
			}, v = function (e) {
				return function (t) {
					var n = {type: e};
					if (!t) return n;
					if (t.hasOwnProperty("error") && (n.error = t.error ? Object.assign({}, t.error) : null), t.status && (n.status = Object.assign({}, t.status)), t.file && (n.output = t.file), t.source) n.file = t.source; else if (t.item || t.id) {
						var r = t.item ? t.item : i.query("GET_ITEM", t.id);
						n.file = r ? Te(r) : null
					}
					return t.items && (n.items = t.items.map(Te)), /progress/.test(e) && (n.progress = t.progress), t.hasOwnProperty("origin") && t.hasOwnProperty("target") && (n.origin = t.origin, n.target = t.target), n
				}
			}, m = {
				DID_DESTROY: v("destroy"),
				DID_INIT: v("init"),
				DID_THROW_MAX_FILES: v("warning"),
				DID_INIT_ITEM: v("initfile"),
				DID_START_ITEM_LOAD: v("addfilestart"),
				DID_UPDATE_ITEM_LOAD_PROGRESS: v("addfileprogress"),
				DID_LOAD_ITEM: v("addfile"),
				DID_THROW_ITEM_INVALID: [v("error"), v("addfile")],
				DID_THROW_ITEM_LOAD_ERROR: [v("error"), v("addfile")],
				DID_THROW_ITEM_REMOVE_ERROR: [v("error"), v("removefile")],
				DID_PREPARE_OUTPUT: v("preparefile"),
				DID_START_ITEM_PROCESSING: v("processfilestart"),
				DID_UPDATE_ITEM_PROCESS_PROGRESS: v("processfileprogress"),
				DID_ABORT_ITEM_PROCESSING: v("processfileabort"),
				DID_COMPLETE_ITEM_PROCESSING: v("processfile"),
				DID_COMPLETE_ITEM_PROCESSING_ALL: v("processfiles"),
				DID_REVERT_ITEM_PROCESSING: v("processfilerevert"),
				DID_THROW_ITEM_PROCESSING_ERROR: [v("error"), v("processfile")],
				DID_REMOVE_ITEM: v("removefile"),
				DID_UPDATE_ITEMS: v("updatefiles"),
				DID_ACTIVATE_ITEM: v("activatefile"),
				DID_REORDER_ITEMS: v("reorderfiles")
			}, h = function (e) {
				var t = Object.assign({pond: A}, e);
				delete t.type, p.element.dispatchEvent(new CustomEvent("FilePond:" + e.type, {
					detail: t,
					bubbles: !0,
					cancelable: !0,
					composed: !0
				}));
				var n = [];
				e.hasOwnProperty("error") && n.push(e.error), e.hasOwnProperty("file") && n.push(e.file);
				var r = ["type", "error", "file"];
				Object.keys(e).filter(function (e) {
					return !r.includes(e)
				}).forEach(function (t) {
					return n.push(e[t])
				}), A.fire.apply(A, [e.type].concat(n));
				var o = i.query("GET_ON" + e.type.toUpperCase());
				o && o.apply(void 0, n)
			}, g = function (e) {
				e.length && e.filter(function (e) {
					return m[e.type]
				}).forEach(function (e) {
					var t = m[e.type];
					(Array.isArray(t) ? t : [t]).forEach(function (t) {
						"DID_INIT_ITEM" === e.type ? h(t(e.data)) : setTimeout(function () {
							h(t(e.data))
						}, 0)
					})
				})
			}, R = function (e) {
				return new Promise(function (t, n) {
					i.dispatch("REQUEST_ITEM_PREPARE", {
						query: e, success: function (e) {
							t(e)
						}, failure: function (e) {
							n(e)
						}
					})
				})
			}, O = function (e, t) {
				var n;
				return "object" != typeof e || (n = e).file && n.id || t || (t = e, e = void 0), i.dispatch("REMOVE_ITEM", Object.assign({}, t, {query: e})), null === i.query("GET_ACTIVE_ITEM", e)
			}, y = function () {
				for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
				return new Promise(function (e, n) {
					var r = [], o = {};
					if (P(t[0])) r.push.apply(r, t[0]), Object.assign(o, t[1] || {}); else {
						var a = t[t.length - 1];
						"object" != typeof a || a instanceof Blob || Object.assign(o, t.pop()), r.push.apply(r, t)
					}
					i.dispatch("ADD_ITEMS", {items: r, index: o.index, interactionMethod: J, success: e, failure: n})
				})
			}, D = function () {
				return i.query("GET_ACTIVE_ITEMS")
			}, S = function (e) {
				return new Promise(function (t, n) {
					i.dispatch("REQUEST_ITEM_PROCESSING", {
						query: e, success: function (e) {
							t(e)
						}, failure: function (e) {
							n(e)
						}
					})
				})
			}, A = Object.assign({}, pe(), {}, I, {}, function (e, n) {
				var r = {};
				return t(n, function (t) {
					r[t] = {
						get: function () {
							return e.getState().options[t]
						}, set: function (n) {
							e.dispatch("SET_" + Z(t, "_").toUpperCase(), {value: n})
						}
					}
				}), r
			}(i, o), {
				setOptions: function (e) {
					return i.dispatch("SET_OPTIONS", {options: e})
				}, addFile: function (e) {
					var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
					return new Promise(function (n, r) {
						y([{source: e, options: t}], {index: t.index}).then(function (e) {
							return n(e && e[0])
						}).catch(r)
					})
				}, addFiles: y, getFile: function (e) {
					return i.query("GET_ACTIVE_ITEM", e)
				}, processFile: S, prepareFile: R, removeFile: O, moveFile: function (e, t) {
					return i.dispatch("MOVE_ITEM", {query: e, index: t})
				}, getFiles: D, processFiles: function () {
					for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
					var r = Array.isArray(t[0]) ? t[0] : t;
					if (!r.length) {
						var o = D().filter(function (e) {
							return !(e.status === Ie.IDLE && e.origin === ve.LOCAL) && e.status !== Ie.PROCESSING && e.status !== Ie.PROCESSING_COMPLETE && e.status !== Ie.PROCESSING_REVERT_ERROR
						});
						return Promise.all(o.map(S))
					}
					return Promise.all(r.map(S))
				}, removeFiles: function () {
					for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
					var r, o = Array.isArray(t[0]) ? t[0] : t;
					"object" == typeof o[o.length - 1] ? r = o.pop() : Array.isArray(t[0]) && (r = t[1]);
					var i = D();
					return o.length ? o.map(function (e) {
						return _(e) ? i[e] ? i[e].id : null : e
					}).filter(function (e) {
						return e
					}).map(function (e) {
						return O(e, r)
					}) : Promise.all(i.map(function (e) {
						return O(e, r)
					}))
				}, prepareFiles: function () {
					for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
					var r = Array.isArray(t[0]) ? t[0] : t, o = r.length ? r : D();
					return Promise.all(o.map(R))
				}, sort: function (e) {
					return i.dispatch("SORT", {compare: e})
				}, browse: function () {
					var e = p.element.querySelector("input[type=file]");
					e && e.click()
				}, destroy: function () {
					A.fire("destroy", p.element), i.dispatch("ABORT_ALL"), p._destroy(), window.removeEventListener("resize", d), document.removeEventListener("visibilitychange", a), i.dispatch("DID_DESTROY")
				}, insertBefore: function (e) {
					return L(p.element, e)
				}, insertAfter: function (e) {
					return b(p.element, e)
				}, appendTo: function (e) {
					return e.appendChild(p.element)
				}, replaceElement: function (e) {
					L(p.element, e), e.parentNode.removeChild(e), r = e
				}, restoreElement: function () {
					r && (b(r, p.element), p.element.parentNode.removeChild(p.element), r = null)
				}, isAttachedTo: function (e) {
					return p.element === e || r === e
				}, element: {
					get: function () {
						return p.element
					}
				}, status: {
					get: function () {
						return i.query("GET_STATUS")
					}
				}
			});
			return i.dispatch("DID_INIT"), n(A)
		}, eo = function () {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = {};
			return t(Se(), function (e, t) {
				n[e] = t[0]
			}), Jr(Object.assign({}, n, {}, e))
		}, to = function (e) {
			var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = [];
			t(e.attributes, function (t) {
				o.push(e.attributes[t])
			});
			var i = o.filter(function (e) {
				return e.name
			}).reduce(function (t, n) {
				var o, i = r(e, n.name);
				return t[(o = n.name, Vr(o.replace(/^data-/, "")))] = i === n.name || i, t
			}, {});
			return function e(n, r) {
				t(r, function (r, o) {
					t(n, function (e, t) {
						var i = new RegExp(r);
						if (i.test(e) && (delete n[e], !1 !== o)) if (U(o)) n[o] = t; else {
							var a, s = o.group;
							H(o) && !n[s] && (n[s] = {}), n[s][(a = e.replace(i, ""), a.charAt(0).toLowerCase() + a.slice(1))] = t
						}
					}), o.mapping && e(n[o.group], o.mapping)
				})
			}(i, n), i
		}, no = function () {
			return (arguments.length <= 0 ? void 0 : arguments[0]) instanceof HTMLElement ? function (e) {
				var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = {
					"^class$": "className",
					"^multiple$": "allowMultiple",
					"^capture$": "captureMethod",
					"^webkitdirectory$": "allowDirectoriesOnly",
					"^server": {
						group: "server",
						mapping: {
							"^process": {group: "process"},
							"^revert": {group: "revert"},
							"^fetch": {group: "fetch"},
							"^restore": {group: "restore"},
							"^load": {group: "load"}
						}
					},
					"^type$": !1,
					"^files$": !1
				};
				ye("SET_ATTRIBUTE_TO_OPTION_MAP", n);
				var r = Object.assign({}, t),
					o = to("FIELDSET" === e.nodeName ? e.querySelector("input[type=file]") : e, n);
				Object.keys(o).forEach(function (e) {
					H(o[e]) ? (H(r[e]) || (r[e] = {}), Object.assign(r[e], o[e])) : r[e] = o[e]
				}), r.files = (t.files || []).concat(Array.from(e.querySelectorAll("input:not([type=file])")).map(function (e) {
					return {source: e.value, options: {type: e.dataset.type}}
				}));
				var i = eo(r);
				return e.files && Array.from(e.files).forEach(function (e) {
					i.addFile(e)
				}), i.replaceElement(e), i
			}.apply(void 0, arguments) : eo.apply(void 0, arguments)
		}, ro = ["fire", "_read", "_write"], oo = function (e) {
			var t = {};
			return Ee(e, t, ro), t
		}, io = function (e, t) {
			return e.replace(/(?:{([a-zA-Z]+)})/g, function (e, n) {
				return t[n]
			})
		}, ao = function (e) {
			var t = new Blob(["(", e.toString(), ")()"], {type: "application/javascript"}), n = URL.createObjectURL(t),
				r = new Worker(n);
			return {
				transfer: function (e, t) {
				}, post: function (e, t, n) {
					var o = oe();
					r.onmessage = function (e) {
						e.data.id === o && t(e.data.message)
					}, r.postMessage({id: o, message: e}, n)
				}, terminate: function () {
					r.terminate(), URL.revokeObjectURL(n)
				}
			}
		}, so = function (e) {
			return new Promise(function (t, n) {
				var r = new Image;
				r.onload = function () {
					t(r)
				}, r.onerror = function (e) {
					n(e)
				}, r.src = e
			})
		}, uo = function (e, t) {
			var n = e.slice(0, e.size, e.type);
			return n.lastModifiedDate = e.lastModifiedDate, n.name = t, n
		}, lo = function (e) {
			return uo(e, e.name)
		}, co = [], fo = function (e) {
			if (!co.includes(e)) {
				co.push(e);
				var n, r = e({
					addFilter: De,
					utils: {
						Type: ge,
						forin: t,
						isString: U,
						isFile: ht,
						toNaturalFileSize: qt,
						replaceInString: io,
						getExtensionFromFilename: je,
						getFilenameWithoutExtension: mt,
						guesstimateMimeType: tr,
						getFileFromBlob: We,
						getFilenameFromURL: ke,
						createRoute: A,
						createWorker: ao,
						createView: S,
						createItemAPI: Te,
						loadImage: so,
						copyFile: lo,
						renameFile: uo,
						createBlob: ze,
						applyFilterChain: Oe,
						text: Nt,
						getNumericAspectRatioFromString: be
					},
					views: {fileActionButton: Ft}
				});
				n = r.options, Object.assign(Ae, n)
			}
		},
		po = (Kt = c() && !("[object OperaMini]" === Object.prototype.toString.call(window.operamini)) && "visibilityState" in document && "Promise" in window && "slice" in Blob.prototype && "URL" in window && "createObjectURL" in window.URL && "performance" in window && ("supports" in (window.CSS || {}) || /MSIE|Trident/.test(window.navigator.userAgent)), function () {
			return Kt
		}), Eo = {apps: []}, _o = function () {
		};
	if (e.Status = {}, e.FileStatus = {}, e.FileOrigin = {}, e.OptionTypes = {}, e.create = _o, e.destroy = _o, e.parse = _o, e.find = _o, e.registerPlugin = _o, e.getOptions = _o, e.setOptions = _o, po()) {
		!function (e, t) {
			var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 60, r = "__framePainter";
			if (window[r]) return window[r].readers.push(e), void window[r].writers.push(t);
			window[r] = {readers: [e], writers: [t]};
			var o = window[r], i = 1e3 / n, a = null, s = null, u = null, l = null, c = function () {
				document.hidden ? (u = function () {
					return window.setTimeout(function () {
						return f(performance.now())
					}, i)
				}, l = function () {
					return window.clearTimeout(s)
				}) : (u = function () {
					return window.requestAnimationFrame(f)
				}, l = function () {
					return window.cancelAnimationFrame(s)
				})
			};
			document.addEventListener("visibilitychange", function () {
				l && l(), c(), f(performance.now())
			});
			var f = function e(t) {
				s = u(e), a || (a = t);
				var n = t - a;
				n <= i || (a = t - n % i, o.readers.forEach(function (e) {
					return e()
				}), o.writers.forEach(function (e) {
					return e(t)
				}))
			};
			c(), f(performance.now())
		}(function () {
			Eo.apps.forEach(function (e) {
				return e._read()
			})
		}, function (e) {
			Eo.apps.forEach(function (t) {
				return t._write(e)
			})
		});
		var To = function t() {
			document.dispatchEvent(new CustomEvent("FilePond:loaded", {
				detail: {
					supported: po,
					create: e.create,
					destroy: e.destroy,
					parse: e.parse,
					find: e.find,
					registerPlugin: e.registerPlugin,
					setOptions: e.setOptions
				}
			})), document.removeEventListener("DOMContentLoaded", t)
		};
		"loading" !== document.readyState ? setTimeout(function () {
			return To()
		}, 0) : document.addEventListener("DOMContentLoaded", To);
		var Io = function () {
			return t(Se(), function (t, n) {
				e.OptionTypes[t] = n[1]
			})
		};
		e.Status = Object.assign({}, Me), e.FileOrigin = Object.assign({}, ve), e.FileStatus = Object.assign({}, Ie), e.OptionTypes = {}, Io(), e.create = function () {
			var t = no.apply(void 0, arguments);
			return t.on("destroy", e.destroy), Eo.apps.push(t), oo(t)
		}, e.destroy = function (e) {
			var t = Eo.apps.findIndex(function (t) {
				return t.isAttachedTo(e)
			});
			return t >= 0 && (Eo.apps.splice(t, 1)[0].restoreElement(), !0)
		}, e.parse = function (t) {
			return Array.from(t.querySelectorAll(".filepond")).filter(function (e) {
				return !Eo.apps.find(function (t) {
					return t.isAttachedTo(e)
				})
			}).map(function (t) {
				return e.create(t)
			})
		}, e.find = function (e) {
			var t = Eo.apps.find(function (t) {
				return t.isAttachedTo(e)
			});
			return t ? oo(t) : null
		}, e.registerPlugin = function () {
			for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
			t.forEach(fo), Io()
		}, e.getOptions = function () {
			var e = {};
			return t(Se(), function (t, n) {
				e[t] = n[0]
			}), e
		}, e.setOptions = function (n) {
			return H(n) && (Eo.apps.forEach(function (e) {
				e.setOptions(n)
			}), function (e) {
				t(e, function (e, t) {
					Ae[e] && (Ae[e][0] = z(t, Ae[e][0], Ae[e][1]))
				})
			}(n)), e.getOptions()
		}
	}
	e.supported = po, Object.defineProperty(e, "__esModule", {value: !0})
});

/*!
 * FilePondPluginFileValidateType 1.2.6
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */

/* eslint-disable */

!function (e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).FilePondPluginFileValidateType = t()
}(this, function () {
	"use strict";
	var e = function (e) {
		var t = e.addFilter, n = e.utils, i = n.Type, T = n.isString, E = n.replaceInString, l = n.guesstimateMimeType,
			o = n.getExtensionFromFilename, a = n.getFilenameFromURL, r = function (e, t) {
				return e.some(function (e) {
					return /\*$/.test(e) ? (n = e, (/^[^/]+/.exec(t) || []).pop() === n.slice(0, -2)) : e === t;
					var n
				})
			}, u = function (e, t, n) {
				if (0 === t.length) return !0;
				var i = function (e) {
					var t = "";
					if (T(e)) {
						var n = a(e), i = o(n);
						i && (t = l(i))
					} else t = e.type;
					return t
				}(e);
				return n ? new Promise(function (T, E) {
					n(e, i).then(function (e) {
						r(t, e) ? T() : E()
					}).catch(E)
				}) : r(t, i)
			};
		return t("SET_ATTRIBUTE_TO_OPTION_MAP", function (e) {
			return Object.assign(e, {accept: "acceptedFileTypes"})
		}), t("ALLOW_HOPPER_ITEM", function (e, t) {
			var n = t.query;
			return !n("GET_ALLOW_FILE_TYPE_VALIDATION") || u(e, n("GET_ACCEPTED_FILE_TYPES"))
		}), t("LOAD_FILE", function (e, t) {
			var n = t.query;
			return new Promise(function (t, i) {
				if (n("GET_ALLOW_FILE_TYPE_VALIDATION")) {
					var T = n("GET_ACCEPTED_FILE_TYPES"), l = n("GET_FILE_VALIDATE_TYPE_DETECT_TYPE"), o = u(e, T, l),
						a = function () {
							var e, t = T.map((e = n("GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES_MAP"), function (t) {
								return null !== e[t] && (e[t] || t)
							})).filter(function (e) {
								return !1 !== e
							});
							i({
								status: {
									main: n("GET_LABEL_FILE_TYPE_NOT_ALLOWED"),
									sub: E(n("GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES"), {
										allTypes: t.join(", "),
										allButLastType: t.slice(0, -1).join(", "),
										lastType: t[t.length - 1]
									})
								}
							})
						};
					if ("boolean" == typeof o) return o ? t(e) : a();
					o.then(function () {
						t(e)
					}).catch(a)
				} else t(e)
			})
		}), {
			options: {
				allowFileTypeValidation: [!0, i.BOOLEAN],
				acceptedFileTypes: [[], i.ARRAY],
				labelFileTypeNotAllowed: ["File is of invalid type", i.STRING],
				fileValidateTypeLabelExpectedTypes: ["Expects {allButLastType} or {lastType}", i.STRING],
				fileValidateTypeLabelExpectedTypesMap: [{}, i.OBJECT],
				fileValidateTypeDetectType: [null, i.FUNCTION]
			}
		}
	};
	return "undefined" != typeof window && void 0 !== window.document && document.dispatchEvent(new CustomEvent("FilePond:pluginloaded", {detail: e})), e
});

/*!
 * vue-filepond v6.0.3
 * A handy FilePond adapter component for Vue
 *
 * Copyright (c) 2020 PQINA
 * https://pqina.nl/filepond
 *
 * Licensed under the MIT license.
 */
!function (global, factory) {
	if ("function" == typeof define && define.amd) define("vueFilePond", ["exports", "vue", "filepond"], factory); else if ("undefined" != typeof exports) factory(exports, require("vue"), require("filepond")); else {
		var mod_exports = {};
		factory(mod_exports, global.Vue, global.FilePond), global.vueFilePond = mod_exports
	}
}("undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : this, function (_exports, _vue, _filepond) {
	"use strict";
	var obj;
	Object.defineProperty(_exports, "__esModule", {value: !0}), _exports.default = _exports.setOptions = void 0, _vue = (obj = _vue) && obj.__esModule ? obj : {default: obj};
	var filteredComponentMethods = ["setOptions", "on", "off", "onOnce", "appendTo", "insertAfter", "insertBefore", "isAttachedTo", "replaceElement", "restoreElement", "destroy"],
		isSupported = (0, _filepond.supported)(), props = {}, events = [], watch = {}, instances = [],
		globalOptions = {};
	_exports.setOptions = function (options) {
		globalOptions = Object.assign(globalOptions, options), instances.forEach(function (instance) {
			instance.setOptions(globalOptions)
		})
	};
	_exports.default = function () {
		_filepond.registerPlugin.apply(void 0, arguments), events.length = 0;
		var _loop = function (prop) {
			if (/^on/.test(prop)) return events.push(prop), "continue";
			var type;
			props[prop] = [String, (type = _filepond.OptionTypes[prop], {
				string: String,
				boolean: Boolean,
				array: Array,
				function: Function,
				int: Number,
				serverapi: Object,
				object: Object
			}[type])], watch[prop] = function (value) {
				this._pond[prop] = value
			}
		};
		for (var prop in _filepond.OptionTypes) _loop(prop);
		return _vue.default.component("FilePond", {
			name: "FilePond", props: props, watch: watch, render: function (h) {
				return h("div", {class: {"filepond--wrapper": !0}}, [h("input", {
					attrs: {
						id: this.id,
						name: this.name,
						type: "file",
						class: this.className,
						required: this.required,
						multiple: this.allowMultiple,
						accept: this.acceptedFileTypes,
						capture: this.captureMethod
					}
				})])
			}, mounted: function () {
				var _this = this;
				if (isSupported) {
					this._element = this.$el.querySelector("input");
					var options = events.reduce(function (obj, value) {
						return obj[value] = function () {
							_this.$emit("input", _this._pond ? _this._pond.getFiles() : []);
							for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
							_this.$emit.apply(_this, [value.substr(2)].concat(args))
						}, obj
					}, {}), attrs = Object.assign({}, this.$attrs);
					this._pond = (0, _filepond.create)(this._element, Object.assign({}, globalOptions, options, attrs, this.$options.propsData)), Object.keys(this._pond).filter(function (key) {
						return !filteredComponentMethods.includes(key)
					}).forEach(function (key) {
						_this[key] = _this._pond[key]
					}), instances.push(this._pond)
				}
			}, destroyed: function () {
				var _this2 = this, detached = this.$options.detached;
				if (this.$el.offsetParent) {
					new MutationObserver(function (mutations, observer) {
						var removedNode = ((mutations[0] || {}).removedNodes || [])[0];
						removedNode && removedNode.contains(_this2.$el) && (observer.disconnect(), detached.call(_this2))
					}).observe(document.documentElement, {childList: !0, subtree: !0})
				} else detached.call(this)
			}, detached: function () {
				if (this._pond) {
					this._pond.destroy();
					var index = instances.indexOf(this._pond);
					0 <= index && instances.splice(index, 1), this._pond = null
				}
			}
		})
	}
});
