var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var Po = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
var Mg = Po((ue, he) => {
  (function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
    new MutationObserver((s) => {
      for (const i of s) if (i.type === "childList") for (const a of i.addedNodes) a.tagName === "LINK" && a.rel === "modulepreload" && r(a);
    }).observe(document, { childList: true, subtree: true });
    function n(s) {
      const i = {};
      return s.integrity && (i.integrity = s.integrity), s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? i.credentials = "include" : s.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i;
    }
    function r(s) {
      if (s.ep) return;
      s.ep = true;
      const i = n(s);
      fetch(s.href, i);
    }
  })();
  var ki = typeof global == "object" && global && global.Object === Object && global, Uo = typeof self == "object" && self && self.Object === Object && self, Ge = ki || Uo || Function("return this")(), Se = Ge.Symbol, Ci = Object.prototype, $o = Ci.hasOwnProperty, Fo = Ci.toString, Ft = Se ? Se.toStringTag : void 0;
  function Bo(t) {
    var e = $o.call(t, Ft), n = t[Ft];
    try {
      t[Ft] = void 0;
      var r = true;
    } catch {
    }
    var s = Fo.call(t);
    return r && (e ? t[Ft] = n : delete t[Ft]), s;
  }
  var Do = Object.prototype, jo = Do.toString;
  function Go(t) {
    return jo.call(t);
  }
  var Wo = "[object Null]", Ko = "[object Undefined]", Ss = Se ? Se.toStringTag : void 0;
  function ot(t) {
    return t == null ? t === void 0 ? Ko : Wo : Ss && Ss in Object(t) ? Bo(t) : Go(t);
  }
  function Ce(t) {
    return t != null && typeof t == "object";
  }
  var Ho = "[object Symbol]";
  function Wn(t) {
    return typeof t == "symbol" || Ce(t) && ot(t) == Ho;
  }
  function Kn(t, e) {
    for (var n = -1, r = t == null ? 0 : t.length, s = Array(r); ++n < r; ) s[n] = e(t[n], n, t);
    return s;
  }
  var C = Array.isArray, _s = Se ? Se.prototype : void 0, Rs = _s ? _s.toString : void 0;
  function vi(t) {
    if (typeof t == "string") return t;
    if (C(t)) return Kn(t, vi) + "";
    if (Wn(t)) return Rs ? Rs.call(t) : "";
    var e = t + "";
    return e == "0" && 1 / t == -1 / 0 ? "-0" : e;
  }
  var zo = /\s/;
  function qo(t) {
    for (var e = t.length; e-- && zo.test(t.charAt(e)); ) ;
    return e;
  }
  var Vo = /^\s+/;
  function Yo(t) {
    return t && t.slice(0, qo(t) + 1).replace(Vo, "");
  }
  function _e(t) {
    var e = typeof t;
    return t != null && (e == "object" || e == "function");
  }
  var Ls = NaN, Xo = /^[-+]0x[0-9a-f]+$/i, Zo = /^0b[01]+$/i, Jo = /^0o[0-7]+$/i, Qo = parseInt;
  function ec(t) {
    if (typeof t == "number") return t;
    if (Wn(t)) return Ls;
    if (_e(t)) {
      var e = typeof t.valueOf == "function" ? t.valueOf() : t;
      t = _e(e) ? e + "" : e;
    }
    if (typeof t != "string") return t === 0 ? t : +t;
    t = Yo(t);
    var n = Zo.test(t);
    return n || Jo.test(t) ? Qo(t.slice(2), n ? 2 : 8) : Xo.test(t) ? Ls : +t;
  }
  var Is = 1 / 0, tc = 17976931348623157e292;
  function nc(t) {
    if (!t) return t === 0 ? t : 0;
    if (t = ec(t), t === Is || t === -Is) {
      var e = t < 0 ? -1 : 1;
      return e * tc;
    }
    return t === t ? t : 0;
  }
  function Hn(t) {
    var e = nc(t), n = e % 1;
    return e === e ? n ? e - n : e : 0;
  }
  function nn(t) {
    return t;
  }
  var rc = "[object AsyncFunction]", sc = "[object Function]", ic = "[object GeneratorFunction]", ac = "[object Proxy]";
  function et(t) {
    if (!_e(t)) return false;
    var e = ot(t);
    return e == sc || e == ic || e == rc || e == ac;
  }
  var lr = Ge["__core-js_shared__"], Os = function() {
    var t = /[^.]+$/.exec(lr && lr.keys && lr.keys.IE_PROTO || "");
    return t ? "Symbol(src)_1." + t : "";
  }();
  function oc(t) {
    return !!Os && Os in t;
  }
  var cc = Function.prototype, lc = cc.toString;
  function _t(t) {
    if (t != null) {
      try {
        return lc.call(t);
      } catch {
      }
      try {
        return t + "";
      } catch {
      }
    }
    return "";
  }
  var uc = /[\\^$.*+?()[\]{}|]/g, hc = /^\[object .+?Constructor\]$/, dc = Function.prototype, fc = Object.prototype, pc = dc.toString, mc = fc.hasOwnProperty, gc = RegExp("^" + pc.call(mc).replace(uc, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  function Ec(t) {
    if (!_e(t) || oc(t)) return false;
    var e = et(t) ? gc : hc;
    return e.test(_t(t));
  }
  function Tc(t, e) {
    return t == null ? void 0 : t[e];
  }
  function Rt(t, e) {
    var n = Tc(t, e);
    return Ec(n) ? n : void 0;
  }
  var Ar = Rt(Ge, "WeakMap"), Ns = Object.create, yc = /* @__PURE__ */ function() {
    function t() {
    }
    return function(e) {
      if (!_e(e)) return {};
      if (Ns) return Ns(e);
      t.prototype = e;
      var n = new t();
      return t.prototype = void 0, n;
    };
  }();
  function Ac(t, e, n) {
    switch (n.length) {
      case 0:
        return t.call(e);
      case 1:
        return t.call(e, n[0]);
      case 2:
        return t.call(e, n[0], n[1]);
      case 3:
        return t.call(e, n[0], n[1], n[2]);
    }
    return t.apply(e, n);
  }
  function z() {
  }
  function Sc(t, e) {
    var n = -1, r = t.length;
    for (e || (e = Array(r)); ++n < r; ) e[n] = t[n];
    return e;
  }
  var _c = 800, Rc = 16, Lc = Date.now;
  function Ic(t) {
    var e = 0, n = 0;
    return function() {
      var r = Lc(), s = Rc - (r - n);
      if (n = r, s > 0) {
        if (++e >= _c) return arguments[0];
      } else e = 0;
      return t.apply(void 0, arguments);
    };
  }
  function Oc(t) {
    return function() {
      return t;
    };
  }
  var Cn = function() {
    try {
      var t = Rt(Object, "defineProperty");
      return t({}, "", {}), t;
    } catch {
    }
  }(), Nc = Cn ? function(t, e) {
    return Cn(t, "toString", { configurable: true, enumerable: false, value: Oc(e), writable: true });
  } : nn, bc = Ic(Nc);
  function wi(t, e) {
    for (var n = -1, r = t == null ? 0 : t.length; ++n < r && e(t[n], n, t) !== false; ) ;
    return t;
  }
  function xi(t, e, n, r) {
    for (var s = t.length, i = n + -1; ++i < s; ) if (e(t[i], i, t)) return i;
    return -1;
  }
  function kc(t) {
    return t !== t;
  }
  function Cc(t, e, n) {
    for (var r = n - 1, s = t.length; ++r < s; ) if (t[r] === e) return r;
    return -1;
  }
  function Wr(t, e, n) {
    return e === e ? Cc(t, e, n) : xi(t, kc, n);
  }
  function Mi(t, e) {
    var n = t == null ? 0 : t.length;
    return !!n && Wr(t, e, 0) > -1;
  }
  var vc = 9007199254740991, wc = /^(?:0|[1-9]\d*)$/;
  function zn(t, e) {
    var n = typeof t;
    return e = e ?? vc, !!e && (n == "number" || n != "symbol" && wc.test(t)) && t > -1 && t % 1 == 0 && t < e;
  }
  function Kr(t, e, n) {
    e == "__proto__" && Cn ? Cn(t, e, { configurable: true, enumerable: true, value: n, writable: true }) : t[e] = n;
  }
  function rn(t, e) {
    return t === e || t !== t && e !== e;
  }
  var xc = Object.prototype, Mc = xc.hasOwnProperty;
  function qn(t, e, n) {
    var r = t[e];
    (!(Mc.call(t, e) && rn(r, n)) || n === void 0 && !(e in t)) && Kr(t, e, n);
  }
  function Hr(t, e, n, r) {
    var s = !n;
    n || (n = {});
    for (var i = -1, a = e.length; ++i < a; ) {
      var o = e[i], c = void 0;
      c === void 0 && (c = t[o]), s ? Kr(n, o, c) : qn(n, o, c);
    }
    return n;
  }
  var bs = Math.max;
  function Pc(t, e, n) {
    return e = bs(e === void 0 ? t.length - 1 : e, 0), function() {
      for (var r = arguments, s = -1, i = bs(r.length - e, 0), a = Array(i); ++s < i; ) a[s] = r[e + s];
      s = -1;
      for (var o = Array(e + 1); ++s < e; ) o[s] = r[s];
      return o[e] = n(a), Ac(t, this, o);
    };
  }
  function zr(t, e) {
    return bc(Pc(t, e, nn), t + "");
  }
  var Uc = 9007199254740991;
  function qr(t) {
    return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Uc;
  }
  function We(t) {
    return t != null && qr(t.length) && !et(t);
  }
  function Pi(t, e, n) {
    if (!_e(n)) return false;
    var r = typeof e;
    return (r == "number" ? We(n) && zn(e, n.length) : r == "string" && e in n) ? rn(n[e], t) : false;
  }
  function $c(t) {
    return zr(function(e, n) {
      var r = -1, s = n.length, i = s > 1 ? n[s - 1] : void 0, a = s > 2 ? n[2] : void 0;
      for (i = t.length > 3 && typeof i == "function" ? (s--, i) : void 0, a && Pi(n[0], n[1], a) && (i = s < 3 ? void 0 : i, s = 1), e = Object(e); ++r < s; ) {
        var o = n[r];
        o && t(e, o, r, i);
      }
      return e;
    });
  }
  var Fc = Object.prototype;
  function sn(t) {
    var e = t && t.constructor, n = typeof e == "function" && e.prototype || Fc;
    return t === n;
  }
  function Bc(t, e) {
    for (var n = -1, r = Array(t); ++n < t; ) r[n] = e(n);
    return r;
  }
  var Dc = "[object Arguments]";
  function ks(t) {
    return Ce(t) && ot(t) == Dc;
  }
  var Ui = Object.prototype, jc = Ui.hasOwnProperty, Gc = Ui.propertyIsEnumerable, Vn = ks(/* @__PURE__ */ function() {
    return arguments;
  }()) ? ks : function(t) {
    return Ce(t) && jc.call(t, "callee") && !Gc.call(t, "callee");
  };
  function Wc() {
    return false;
  }
  var $i = typeof ue == "object" && ue && !ue.nodeType && ue, Cs = $i && typeof he == "object" && he && !he.nodeType && he, Kc = Cs && Cs.exports === $i, vs = Kc ? Ge.Buffer : void 0, Hc = vs ? vs.isBuffer : void 0, Jt = Hc || Wc, zc = "[object Arguments]", qc = "[object Array]", Vc = "[object Boolean]", Yc = "[object Date]", Xc = "[object Error]", Zc = "[object Function]", Jc = "[object Map]", Qc = "[object Number]", el = "[object Object]", tl = "[object RegExp]", nl = "[object Set]", rl = "[object String]", sl = "[object WeakMap]", il = "[object ArrayBuffer]", al = "[object DataView]", ol = "[object Float32Array]", cl = "[object Float64Array]", ll = "[object Int8Array]", ul = "[object Int16Array]", hl = "[object Int32Array]", dl = "[object Uint8Array]", fl = "[object Uint8ClampedArray]", pl = "[object Uint16Array]", ml = "[object Uint32Array]", $ = {};
  $[ol] = $[cl] = $[ll] = $[ul] = $[hl] = $[dl] = $[fl] = $[pl] = $[ml] = true;
  $[zc] = $[qc] = $[il] = $[Vc] = $[al] = $[Yc] = $[Xc] = $[Zc] = $[Jc] = $[Qc] = $[el] = $[tl] = $[nl] = $[rl] = $[sl] = false;
  function gl(t) {
    return Ce(t) && qr(t.length) && !!$[ot(t)];
  }
  function Yn(t) {
    return function(e) {
      return t(e);
    };
  }
  var Fi = typeof ue == "object" && ue && !ue.nodeType && ue, Yt = Fi && typeof he == "object" && he && !he.nodeType && he, El = Yt && Yt.exports === Fi, ur = El && ki.process, it = function() {
    try {
      var t = Yt && Yt.require && Yt.require("util").types;
      return t || ur && ur.binding && ur.binding("util");
    } catch {
    }
  }(), ws = it && it.isTypedArray, Vr = ws ? Yn(ws) : gl, Tl = Object.prototype, yl = Tl.hasOwnProperty;
  function Bi(t, e) {
    var n = C(t), r = !n && Vn(t), s = !n && !r && Jt(t), i = !n && !r && !s && Vr(t), a = n || r || s || i, o = a ? Bc(t.length, String) : [], c = o.length;
    for (var l in t) (e || yl.call(t, l)) && !(a && (l == "length" || s && (l == "offset" || l == "parent") || i && (l == "buffer" || l == "byteLength" || l == "byteOffset") || zn(l, c))) && o.push(l);
    return o;
  }
  function Di(t, e) {
    return function(n) {
      return t(e(n));
    };
  }
  var Al = Di(Object.keys, Object), Sl = Object.prototype, _l = Sl.hasOwnProperty;
  function ji(t) {
    if (!sn(t)) return Al(t);
    var e = [];
    for (var n in Object(t)) _l.call(t, n) && n != "constructor" && e.push(n);
    return e;
  }
  function Re(t) {
    return We(t) ? Bi(t) : ji(t);
  }
  var Rl = Object.prototype, Ll = Rl.hasOwnProperty, de = $c(function(t, e) {
    if (sn(e) || We(e)) {
      Hr(e, Re(e), t);
      return;
    }
    for (var n in e) Ll.call(e, n) && qn(t, n, e[n]);
  });
  function Il(t) {
    var e = [];
    if (t != null) for (var n in Object(t)) e.push(n);
    return e;
  }
  var Ol = Object.prototype, Nl = Ol.hasOwnProperty;
  function bl(t) {
    if (!_e(t)) return Il(t);
    var e = sn(t), n = [];
    for (var r in t) r == "constructor" && (e || !Nl.call(t, r)) || n.push(r);
    return n;
  }
  function Gi(t) {
    return We(t) ? Bi(t, true) : bl(t);
  }
  var kl = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Cl = /^\w*$/;
  function Yr(t, e) {
    if (C(t)) return false;
    var n = typeof t;
    return n == "number" || n == "symbol" || n == "boolean" || t == null || Wn(t) ? true : Cl.test(t) || !kl.test(t) || e != null && t in Object(e);
  }
  var Qt = Rt(Object, "create");
  function vl() {
    this.__data__ = Qt ? Qt(null) : {}, this.size = 0;
  }
  function wl(t) {
    var e = this.has(t) && delete this.__data__[t];
    return this.size -= e ? 1 : 0, e;
  }
  var xl = "__lodash_hash_undefined__", Ml = Object.prototype, Pl = Ml.hasOwnProperty;
  function Ul(t) {
    var e = this.__data__;
    if (Qt) {
      var n = e[t];
      return n === xl ? void 0 : n;
    }
    return Pl.call(e, t) ? e[t] : void 0;
  }
  var $l = Object.prototype, Fl = $l.hasOwnProperty;
  function Bl(t) {
    var e = this.__data__;
    return Qt ? e[t] !== void 0 : Fl.call(e, t);
  }
  var Dl = "__lodash_hash_undefined__";
  function jl(t, e) {
    var n = this.__data__;
    return this.size += this.has(t) ? 0 : 1, n[t] = Qt && e === void 0 ? Dl : e, this;
  }
  function Et(t) {
    var e = -1, n = t == null ? 0 : t.length;
    for (this.clear(); ++e < n; ) {
      var r = t[e];
      this.set(r[0], r[1]);
    }
  }
  Et.prototype.clear = vl;
  Et.prototype.delete = wl;
  Et.prototype.get = Ul;
  Et.prototype.has = Bl;
  Et.prototype.set = jl;
  function Gl() {
    this.__data__ = [], this.size = 0;
  }
  function Xn(t, e) {
    for (var n = t.length; n--; ) if (rn(t[n][0], e)) return n;
    return -1;
  }
  var Wl = Array.prototype, Kl = Wl.splice;
  function Hl(t) {
    var e = this.__data__, n = Xn(e, t);
    if (n < 0) return false;
    var r = e.length - 1;
    return n == r ? e.pop() : Kl.call(e, n, 1), --this.size, true;
  }
  function zl(t) {
    var e = this.__data__, n = Xn(e, t);
    return n < 0 ? void 0 : e[n][1];
  }
  function ql(t) {
    return Xn(this.__data__, t) > -1;
  }
  function Vl(t, e) {
    var n = this.__data__, r = Xn(n, t);
    return r < 0 ? (++this.size, n.push([t, e])) : n[r][1] = e, this;
  }
  function tt(t) {
    var e = -1, n = t == null ? 0 : t.length;
    for (this.clear(); ++e < n; ) {
      var r = t[e];
      this.set(r[0], r[1]);
    }
  }
  tt.prototype.clear = Gl;
  tt.prototype.delete = Hl;
  tt.prototype.get = zl;
  tt.prototype.has = ql;
  tt.prototype.set = Vl;
  var en = Rt(Ge, "Map");
  function Yl() {
    this.size = 0, this.__data__ = { hash: new Et(), map: new (en || tt)(), string: new Et() };
  }
  function Xl(t) {
    var e = typeof t;
    return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
  }
  function Zn(t, e) {
    var n = t.__data__;
    return Xl(e) ? n[typeof e == "string" ? "string" : "hash"] : n.map;
  }
  function Zl(t) {
    var e = Zn(this, t).delete(t);
    return this.size -= e ? 1 : 0, e;
  }
  function Jl(t) {
    return Zn(this, t).get(t);
  }
  function Ql(t) {
    return Zn(this, t).has(t);
  }
  function eu(t, e) {
    var n = Zn(this, t), r = n.size;
    return n.set(t, e), this.size += n.size == r ? 0 : 1, this;
  }
  function nt(t) {
    var e = -1, n = t == null ? 0 : t.length;
    for (this.clear(); ++e < n; ) {
      var r = t[e];
      this.set(r[0], r[1]);
    }
  }
  nt.prototype.clear = Yl;
  nt.prototype.delete = Zl;
  nt.prototype.get = Jl;
  nt.prototype.has = Ql;
  nt.prototype.set = eu;
  var tu = "Expected a function";
  function Xr(t, e) {
    if (typeof t != "function" || e != null && typeof e != "function") throw new TypeError(tu);
    var n = function() {
      var r = arguments, s = e ? e.apply(this, r) : r[0], i = n.cache;
      if (i.has(s)) return i.get(s);
      var a = t.apply(this, r);
      return n.cache = i.set(s, a) || i, a;
    };
    return n.cache = new (Xr.Cache || nt)(), n;
  }
  Xr.Cache = nt;
  var nu = 500;
  function ru(t) {
    var e = Xr(t, function(r) {
      return n.size === nu && n.clear(), r;
    }), n = e.cache;
    return e;
  }
  var su = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, iu = /\\(\\)?/g, au = ru(function(t) {
    var e = [];
    return t.charCodeAt(0) === 46 && e.push(""), t.replace(su, function(n, r, s, i) {
      e.push(s ? i.replace(iu, "$1") : r || n);
    }), e;
  });
  function ou(t) {
    return t == null ? "" : vi(t);
  }
  function Jn(t, e) {
    return C(t) ? t : Yr(t, e) ? [t] : au(ou(t));
  }
  function an(t) {
    if (typeof t == "string" || Wn(t)) return t;
    var e = t + "";
    return e == "0" && 1 / t == -1 / 0 ? "-0" : e;
  }
  function Zr(t, e) {
    e = Jn(e, t);
    for (var n = 0, r = e.length; t != null && n < r; ) t = t[an(e[n++])];
    return n && n == r ? t : void 0;
  }
  function cu(t, e, n) {
    var r = t == null ? void 0 : Zr(t, e);
    return r === void 0 ? n : r;
  }
  function Jr(t, e) {
    for (var n = -1, r = e.length, s = t.length; ++n < r; ) t[s + n] = e[n];
    return t;
  }
  var xs = Se ? Se.isConcatSpreadable : void 0;
  function lu(t) {
    return C(t) || Vn(t) || !!(xs && t && t[xs]);
  }
  function Qr(t, e, n, r, s) {
    var i = -1, a = t.length;
    for (n || (n = lu), s || (s = []); ++i < a; ) {
      var o = t[i];
      n(o) ? Jr(s, o) : r || (s[s.length] = o);
    }
    return s;
  }
  function be(t) {
    var e = t == null ? 0 : t.length;
    return e ? Qr(t) : [];
  }
  var Wi = Di(Object.getPrototypeOf, Object);
  function Ki(t, e, n) {
    var r = -1, s = t.length;
    e < 0 && (e = -e > s ? 0 : s + e), n = n > s ? s : n, n < 0 && (n += s), s = e > n ? 0 : n - e >>> 0, e >>>= 0;
    for (var i = Array(s); ++r < s; ) i[r] = t[r + e];
    return i;
  }
  function uu(t, e, n, r) {
    var s = -1, i = t == null ? 0 : t.length;
    for (r && i && (n = t[++s]); ++s < i; ) n = e(n, t[s], s, t);
    return n;
  }
  function hu() {
    this.__data__ = new tt(), this.size = 0;
  }
  function du(t) {
    var e = this.__data__, n = e.delete(t);
    return this.size = e.size, n;
  }
  function fu(t) {
    return this.__data__.get(t);
  }
  function pu(t) {
    return this.__data__.has(t);
  }
  var mu = 200;
  function gu(t, e) {
    var n = this.__data__;
    if (n instanceof tt) {
      var r = n.__data__;
      if (!en || r.length < mu - 1) return r.push([t, e]), this.size = ++n.size, this;
      n = this.__data__ = new nt(r);
    }
    return n.set(t, e), this.size = n.size, this;
  }
  function je(t) {
    var e = this.__data__ = new tt(t);
    this.size = e.size;
  }
  je.prototype.clear = hu;
  je.prototype.delete = du;
  je.prototype.get = fu;
  je.prototype.has = pu;
  je.prototype.set = gu;
  function Eu(t, e) {
    return t && Hr(e, Re(e), t);
  }
  var Hi = typeof ue == "object" && ue && !ue.nodeType && ue, Ms = Hi && typeof he == "object" && he && !he.nodeType && he, Tu = Ms && Ms.exports === Hi, Ps = Tu ? Ge.Buffer : void 0, Us = Ps ? Ps.allocUnsafe : void 0;
  function yu(t, e) {
    var n = t.length, r = Us ? Us(n) : new t.constructor(n);
    return t.copy(r), r;
  }
  function es(t, e) {
    for (var n = -1, r = t == null ? 0 : t.length, s = 0, i = []; ++n < r; ) {
      var a = t[n];
      e(a, n, t) && (i[s++] = a);
    }
    return i;
  }
  function zi() {
    return [];
  }
  var Au = Object.prototype, Su = Au.propertyIsEnumerable, $s = Object.getOwnPropertySymbols, ts = $s ? function(t) {
    return t == null ? [] : (t = Object(t), es($s(t), function(e) {
      return Su.call(t, e);
    }));
  } : zi;
  function _u(t, e) {
    return Hr(t, ts(t), e);
  }
  var Ru = Object.getOwnPropertySymbols, Lu = Ru ? function(t) {
    for (var e = []; t; ) Jr(e, ts(t)), t = Wi(t);
    return e;
  } : zi;
  function qi(t, e, n) {
    var r = e(t);
    return C(t) ? r : Jr(r, n(t));
  }
  function Sr(t) {
    return qi(t, Re, ts);
  }
  function Iu(t) {
    return qi(t, Gi, Lu);
  }
  var _r = Rt(Ge, "DataView"), Rr = Rt(Ge, "Promise"), Nt = Rt(Ge, "Set"), Fs = "[object Map]", Ou = "[object Object]", Bs = "[object Promise]", Ds = "[object Set]", js = "[object WeakMap]", Gs = "[object DataView]", Nu = _t(_r), bu = _t(en), ku = _t(Rr), Cu = _t(Nt), vu = _t(Ar), ye = ot;
  (_r && ye(new _r(new ArrayBuffer(1))) != Gs || en && ye(new en()) != Fs || Rr && ye(Rr.resolve()) != Bs || Nt && ye(new Nt()) != Ds || Ar && ye(new Ar()) != js) && (ye = function(t) {
    var e = ot(t), n = e == Ou ? t.constructor : void 0, r = n ? _t(n) : "";
    if (r) switch (r) {
      case Nu:
        return Gs;
      case bu:
        return Fs;
      case ku:
        return Bs;
      case Cu:
        return Ds;
      case vu:
        return js;
    }
    return e;
  });
  var wu = Object.prototype, xu = wu.hasOwnProperty;
  function Mu(t) {
    var e = t.length, n = new t.constructor(e);
    return e && typeof t[0] == "string" && xu.call(t, "index") && (n.index = t.index, n.input = t.input), n;
  }
  var vn = Ge.Uint8Array;
  function Pu(t) {
    var e = new t.constructor(t.byteLength);
    return new vn(e).set(new vn(t)), e;
  }
  function Uu(t, e) {
    var n = t.buffer;
    return new t.constructor(n, t.byteOffset, t.byteLength);
  }
  var $u = /\w*$/;
  function Fu(t) {
    var e = new t.constructor(t.source, $u.exec(t));
    return e.lastIndex = t.lastIndex, e;
  }
  var Ws = Se ? Se.prototype : void 0, Ks = Ws ? Ws.valueOf : void 0;
  function Bu(t) {
    return Ks ? Object(Ks.call(t)) : {};
  }
  function Du(t, e) {
    var n = t.buffer;
    return new t.constructor(n, t.byteOffset, t.length);
  }
  var ju = "[object Boolean]", Gu = "[object Date]", Wu = "[object Map]", Ku = "[object Number]", Hu = "[object RegExp]", zu = "[object Set]", qu = "[object String]", Vu = "[object Symbol]", Yu = "[object ArrayBuffer]", Xu = "[object DataView]", Zu = "[object Float32Array]", Ju = "[object Float64Array]", Qu = "[object Int8Array]", eh = "[object Int16Array]", th = "[object Int32Array]", nh = "[object Uint8Array]", rh = "[object Uint8ClampedArray]", sh = "[object Uint16Array]", ih = "[object Uint32Array]";
  function ah(t, e, n) {
    var r = t.constructor;
    switch (e) {
      case Yu:
        return Pu(t);
      case ju:
      case Gu:
        return new r(+t);
      case Xu:
        return Uu(t);
      case Zu:
      case Ju:
      case Qu:
      case eh:
      case th:
      case nh:
      case rh:
      case sh:
      case ih:
        return Du(t);
      case Wu:
        return new r();
      case Ku:
      case qu:
        return new r(t);
      case Hu:
        return Fu(t);
      case zu:
        return new r();
      case Vu:
        return Bu(t);
    }
  }
  function oh(t) {
    return typeof t.constructor == "function" && !sn(t) ? yc(Wi(t)) : {};
  }
  var ch = "[object Map]";
  function lh(t) {
    return Ce(t) && ye(t) == ch;
  }
  var Hs = it && it.isMap, uh = Hs ? Yn(Hs) : lh, hh = "[object Set]";
  function dh(t) {
    return Ce(t) && ye(t) == hh;
  }
  var zs = it && it.isSet, fh = zs ? Yn(zs) : dh, Vi = "[object Arguments]", ph = "[object Array]", mh = "[object Boolean]", gh = "[object Date]", Eh = "[object Error]", Yi = "[object Function]", Th = "[object GeneratorFunction]", yh = "[object Map]", Ah = "[object Number]", Xi = "[object Object]", Sh = "[object RegExp]", _h = "[object Set]", Rh = "[object String]", Lh = "[object Symbol]", Ih = "[object WeakMap]", Oh = "[object ArrayBuffer]", Nh = "[object DataView]", bh = "[object Float32Array]", kh = "[object Float64Array]", Ch = "[object Int8Array]", vh = "[object Int16Array]", wh = "[object Int32Array]", xh = "[object Uint8Array]", Mh = "[object Uint8ClampedArray]", Ph = "[object Uint16Array]", Uh = "[object Uint32Array]", P = {};
  P[Vi] = P[ph] = P[Oh] = P[Nh] = P[mh] = P[gh] = P[bh] = P[kh] = P[Ch] = P[vh] = P[wh] = P[yh] = P[Ah] = P[Xi] = P[Sh] = P[_h] = P[Rh] = P[Lh] = P[xh] = P[Mh] = P[Ph] = P[Uh] = true;
  P[Eh] = P[Yi] = P[Ih] = false;
  function yn(t, e, n, r, s, i) {
    var a;
    if (a !== void 0) return a;
    if (!_e(t)) return t;
    var o = C(t);
    if (o) return a = Mu(t), Sc(t, a);
    var c = ye(t), l = c == Yi || c == Th;
    if (Jt(t)) return yu(t);
    if (c == Xi || c == Vi || l && !s) return a = l ? {} : oh(t), _u(t, Eu(a, t));
    if (!P[c]) return s ? t : {};
    a = ah(t, c), i || (i = new je());
    var u = i.get(t);
    if (u) return u;
    i.set(t, a), fh(t) ? t.forEach(function(p) {
      a.add(yn(p, e, n, p, t, i));
    }) : uh(t) && t.forEach(function(p, f) {
      a.set(f, yn(p, e, n, f, t, i));
    });
    var h = Sr, d = o ? void 0 : h(t);
    return wi(d || t, function(p, f) {
      d && (f = p, p = t[f]), qn(a, f, yn(p, e, n, f, t, i));
    }), a;
  }
  var $h = 4;
  function Z(t) {
    return yn(t, $h);
  }
  function on(t) {
    for (var e = -1, n = t == null ? 0 : t.length, r = 0, s = []; ++e < n; ) {
      var i = t[e];
      i && (s[r++] = i);
    }
    return s;
  }
  var Fh = "__lodash_hash_undefined__";
  function Bh(t) {
    return this.__data__.set(t, Fh), this;
  }
  function Dh(t) {
    return this.__data__.has(t);
  }
  function Ct(t) {
    var e = -1, n = t == null ? 0 : t.length;
    for (this.__data__ = new nt(); ++e < n; ) this.add(t[e]);
  }
  Ct.prototype.add = Ct.prototype.push = Bh;
  Ct.prototype.has = Dh;
  function Zi(t, e) {
    for (var n = -1, r = t == null ? 0 : t.length; ++n < r; ) if (e(t[n], n, t)) return true;
    return false;
  }
  function ns(t, e) {
    return t.has(e);
  }
  var jh = 1, Gh = 2;
  function Ji(t, e, n, r, s, i) {
    var a = n & jh, o = t.length, c = e.length;
    if (o != c && !(a && c > o)) return false;
    var l = i.get(t), u = i.get(e);
    if (l && u) return l == e && u == t;
    var h = -1, d = true, p = n & Gh ? new Ct() : void 0;
    for (i.set(t, e), i.set(e, t); ++h < o; ) {
      var f = t[h], y = e[h];
      if (r) var R = a ? r(y, f, h, e, t, i) : r(f, y, h, t, e, i);
      if (R !== void 0) {
        if (R) continue;
        d = false;
        break;
      }
      if (p) {
        if (!Zi(e, function(E, m) {
          if (!ns(p, m) && (f === E || s(f, E, n, r, i))) return p.push(m);
        })) {
          d = false;
          break;
        }
      } else if (!(f === y || s(f, y, n, r, i))) {
        d = false;
        break;
      }
    }
    return i.delete(t), i.delete(e), d;
  }
  function Wh(t) {
    var e = -1, n = Array(t.size);
    return t.forEach(function(r, s) {
      n[++e] = [s, r];
    }), n;
  }
  function rs(t) {
    var e = -1, n = Array(t.size);
    return t.forEach(function(r) {
      n[++e] = r;
    }), n;
  }
  var Kh = 1, Hh = 2, zh = "[object Boolean]", qh = "[object Date]", Vh = "[object Error]", Yh = "[object Map]", Xh = "[object Number]", Zh = "[object RegExp]", Jh = "[object Set]", Qh = "[object String]", ed = "[object Symbol]", td = "[object ArrayBuffer]", nd = "[object DataView]", qs = Se ? Se.prototype : void 0, hr = qs ? qs.valueOf : void 0;
  function rd(t, e, n, r, s, i, a) {
    switch (n) {
      case nd:
        if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) return false;
        t = t.buffer, e = e.buffer;
      case td:
        return !(t.byteLength != e.byteLength || !i(new vn(t), new vn(e)));
      case zh:
      case qh:
      case Xh:
        return rn(+t, +e);
      case Vh:
        return t.name == e.name && t.message == e.message;
      case Zh:
      case Qh:
        return t == e + "";
      case Yh:
        var o = Wh;
      case Jh:
        var c = r & Kh;
        if (o || (o = rs), t.size != e.size && !c) return false;
        var l = a.get(t);
        if (l) return l == e;
        r |= Hh, a.set(t, e);
        var u = Ji(o(t), o(e), r, s, i, a);
        return a.delete(t), u;
      case ed:
        if (hr) return hr.call(t) == hr.call(e);
    }
    return false;
  }
  var sd = 1, id = Object.prototype, ad = id.hasOwnProperty;
  function od(t, e, n, r, s, i) {
    var a = n & sd, o = Sr(t), c = o.length, l = Sr(e), u = l.length;
    if (c != u && !a) return false;
    for (var h = c; h--; ) {
      var d = o[h];
      if (!(a ? d in e : ad.call(e, d))) return false;
    }
    var p = i.get(t), f = i.get(e);
    if (p && f) return p == e && f == t;
    var y = true;
    i.set(t, e), i.set(e, t);
    for (var R = a; ++h < c; ) {
      d = o[h];
      var E = t[d], m = e[d];
      if (r) var g = a ? r(m, E, d, e, t, i) : r(E, m, d, t, e, i);
      if (!(g === void 0 ? E === m || s(E, m, n, r, i) : g)) {
        y = false;
        break;
      }
      R || (R = d == "constructor");
    }
    if (y && !R) {
      var T = t.constructor, x = e.constructor;
      T != x && "constructor" in t && "constructor" in e && !(typeof T == "function" && T instanceof T && typeof x == "function" && x instanceof x) && (y = false);
    }
    return i.delete(t), i.delete(e), y;
  }
  var cd = 1, Vs = "[object Arguments]", Ys = "[object Array]", fn = "[object Object]", ld = Object.prototype, Xs = ld.hasOwnProperty;
  function ud(t, e, n, r, s, i) {
    var a = C(t), o = C(e), c = a ? Ys : ye(t), l = o ? Ys : ye(e);
    c = c == Vs ? fn : c, l = l == Vs ? fn : l;
    var u = c == fn, h = l == fn, d = c == l;
    if (d && Jt(t)) {
      if (!Jt(e)) return false;
      a = true, u = false;
    }
    if (d && !u) return i || (i = new je()), a || Vr(t) ? Ji(t, e, n, r, s, i) : rd(t, e, c, n, r, s, i);
    if (!(n & cd)) {
      var p = u && Xs.call(t, "__wrapped__"), f = h && Xs.call(e, "__wrapped__");
      if (p || f) {
        var y = p ? t.value() : t, R = f ? e.value() : e;
        return i || (i = new je()), s(y, R, n, r, i);
      }
    }
    return d ? (i || (i = new je()), od(t, e, n, r, s, i)) : false;
  }
  function ss(t, e, n, r, s) {
    return t === e ? true : t == null || e == null || !Ce(t) && !Ce(e) ? t !== t && e !== e : ud(t, e, n, r, ss, s);
  }
  var hd = 1, dd = 2;
  function fd(t, e, n, r) {
    var s = n.length, i = s;
    if (t == null) return !i;
    for (t = Object(t); s--; ) {
      var a = n[s];
      if (a[2] ? a[1] !== t[a[0]] : !(a[0] in t)) return false;
    }
    for (; ++s < i; ) {
      a = n[s];
      var o = a[0], c = t[o], l = a[1];
      if (a[2]) {
        if (c === void 0 && !(o in t)) return false;
      } else {
        var u = new je(), h;
        if (!(h === void 0 ? ss(l, c, hd | dd, r, u) : h)) return false;
      }
    }
    return true;
  }
  function Qi(t) {
    return t === t && !_e(t);
  }
  function pd(t) {
    for (var e = Re(t), n = e.length; n--; ) {
      var r = e[n], s = t[r];
      e[n] = [r, s, Qi(s)];
    }
    return e;
  }
  function ea(t, e) {
    return function(n) {
      return n == null ? false : n[t] === e && (e !== void 0 || t in Object(n));
    };
  }
  function md(t) {
    var e = pd(t);
    return e.length == 1 && e[0][2] ? ea(e[0][0], e[0][1]) : function(n) {
      return n === t || fd(n, t, e);
    };
  }
  function gd(t, e) {
    return t != null && e in Object(t);
  }
  function ta(t, e, n) {
    e = Jn(e, t);
    for (var r = -1, s = e.length, i = false; ++r < s; ) {
      var a = an(e[r]);
      if (!(i = t != null && n(t, a))) break;
      t = t[a];
    }
    return i || ++r != s ? i : (s = t == null ? 0 : t.length, !!s && qr(s) && zn(a, s) && (C(t) || Vn(t)));
  }
  function Ed(t, e) {
    return t != null && ta(t, e, gd);
  }
  var Td = 1, yd = 2;
  function Ad(t, e) {
    return Yr(t) && Qi(e) ? ea(an(t), e) : function(n) {
      var r = cu(n, t);
      return r === void 0 && r === e ? Ed(n, t) : ss(e, r, Td | yd);
    };
  }
  function Sd(t) {
    return function(e) {
      return e == null ? void 0 : e[t];
    };
  }
  function _d(t) {
    return function(e) {
      return Zr(e, t);
    };
  }
  function Rd(t) {
    return Yr(t) ? Sd(an(t)) : _d(t);
  }
  function Ke(t) {
    return typeof t == "function" ? t : t == null ? nn : typeof t == "object" ? C(t) ? Ad(t[0], t[1]) : md(t) : Rd(t);
  }
  function Ld(t, e, n, r) {
    for (var s = -1, i = t == null ? 0 : t.length; ++s < i; ) {
      var a = t[s];
      e(r, a, n(a), t);
    }
    return r;
  }
  function Id(t) {
    return function(e, n, r) {
      for (var s = -1, i = Object(e), a = r(e), o = a.length; o--; ) {
        var c = a[++s];
        if (n(i[c], c, i) === false) break;
      }
      return e;
    };
  }
  var Od = Id();
  function Nd(t, e) {
    return t && Od(t, e, Re);
  }
  function bd(t, e) {
    return function(n, r) {
      if (n == null) return n;
      if (!We(n)) return t(n, r);
      for (var s = n.length, i = -1, a = Object(n); ++i < s && r(a[i], i, a) !== false; ) ;
      return n;
    };
  }
  var Lt = bd(Nd);
  function kd(t, e, n, r) {
    return Lt(t, function(s, i, a) {
      e(r, s, n(s), a);
    }), r;
  }
  function Cd(t, e) {
    return function(n, r) {
      var s = C(n) ? Ld : kd, i = e ? e() : {};
      return s(n, t, Ke(r), i);
    };
  }
  var na = Object.prototype, vd = na.hasOwnProperty, is = zr(function(t, e) {
    t = Object(t);
    var n = -1, r = e.length, s = r > 2 ? e[2] : void 0;
    for (s && Pi(e[0], e[1], s) && (r = 1); ++n < r; ) for (var i = e[n], a = Gi(i), o = -1, c = a.length; ++o < c; ) {
      var l = a[o], u = t[l];
      (u === void 0 || rn(u, na[l]) && !vd.call(t, l)) && (t[l] = i[l]);
    }
    return t;
  });
  function Zs(t) {
    return Ce(t) && We(t);
  }
  var wd = 200;
  function xd(t, e, n, r) {
    var s = -1, i = Mi, a = true, o = t.length, c = [], l = e.length;
    if (!o) return c;
    e.length >= wd && (i = ns, a = false, e = new Ct(e));
    e: for (; ++s < o; ) {
      var u = t[s], h = u;
      if (u = u !== 0 ? u : 0, a && h === h) {
        for (var d = l; d--; ) if (e[d] === h) continue e;
        c.push(u);
      } else i(e, h, r) || c.push(u);
    }
    return c;
  }
  var Qn = zr(function(t, e) {
    return Zs(t) ? xd(t, Qr(e, 1, Zs, true)) : [];
  });
  function Tt(t) {
    var e = t == null ? 0 : t.length;
    return e ? t[e - 1] : void 0;
  }
  function Y(t, e, n) {
    var r = t == null ? 0 : t.length;
    return r ? (e = e === void 0 ? 1 : Hn(e), Ki(t, e < 0 ? 0 : e, r)) : [];
  }
  function tn(t, e, n) {
    var r = t == null ? 0 : t.length;
    return r ? (e = e === void 0 ? 1 : Hn(e), e = r - e, Ki(t, 0, e < 0 ? 0 : e)) : [];
  }
  function Md(t) {
    return typeof t == "function" ? t : nn;
  }
  function L(t, e) {
    var n = C(t) ? wi : Lt;
    return n(t, Md(e));
  }
  function Pd(t, e) {
    for (var n = -1, r = t == null ? 0 : t.length; ++n < r; ) if (!e(t[n], n, t)) return false;
    return true;
  }
  function Ud(t, e) {
    var n = true;
    return Lt(t, function(r, s, i) {
      return n = !!e(r, s, i), n;
    }), n;
  }
  function ke(t, e, n) {
    var r = C(t) ? Pd : Ud;
    return r(t, Ke(e));
  }
  function ra(t, e) {
    var n = [];
    return Lt(t, function(r, s, i) {
      e(r, s, i) && n.push(r);
    }), n;
  }
  function Le(t, e) {
    var n = C(t) ? es : ra;
    return n(t, Ke(e));
  }
  function $d(t) {
    return function(e, n, r) {
      var s = Object(e);
      if (!We(e)) {
        var i = Ke(n);
        e = Re(e), n = function(o) {
          return i(s[o], o, s);
        };
      }
      var a = t(e, n, r);
      return a > -1 ? s[i ? e[a] : a] : void 0;
    };
  }
  var Fd = Math.max;
  function Bd(t, e, n) {
    var r = t == null ? 0 : t.length;
    if (!r) return -1;
    var s = n == null ? 0 : Hn(n);
    return s < 0 && (s = Fd(r + s, 0)), xi(t, Ke(e), s);
  }
  var vt = $d(Bd);
  function ve(t) {
    return t && t.length ? t[0] : void 0;
  }
  function Dd(t, e) {
    var n = -1, r = We(t) ? Array(t.length) : [];
    return Lt(t, function(s, i, a) {
      r[++n] = e(s, i, a);
    }), r;
  }
  function S(t, e) {
    var n = C(t) ? Kn : Dd;
    return n(t, Ke(e));
  }
  function Ae(t, e) {
    return Qr(S(t, e));
  }
  var jd = Object.prototype, Gd = jd.hasOwnProperty, Wd = Cd(function(t, e, n) {
    Gd.call(t, n) ? t[n].push(e) : Kr(t, n, [e]);
  }), Kd = Object.prototype, Hd = Kd.hasOwnProperty;
  function zd(t, e) {
    return t != null && Hd.call(t, e);
  }
  function _(t, e) {
    return t != null && ta(t, e, zd);
  }
  var qd = "[object String]";
  function oe(t) {
    return typeof t == "string" || !C(t) && Ce(t) && ot(t) == qd;
  }
  function Vd(t, e) {
    return Kn(e, function(n) {
      return t[n];
    });
  }
  function K(t) {
    return t == null ? [] : Vd(t, Re(t));
  }
  var Yd = Math.max;
  function re(t, e, n, r) {
    t = We(t) ? t : K(t), n = n ? Hn(n) : 0;
    var s = t.length;
    return n < 0 && (n = Yd(s + n, 0)), oe(t) ? n <= s && t.indexOf(e, n) > -1 : !!s && Wr(t, e, n) > -1;
  }
  function Js(t, e, n) {
    var r = t == null ? 0 : t.length;
    if (!r) return -1;
    var s = 0;
    return Wr(t, e, s);
  }
  var Xd = "[object Map]", Zd = "[object Set]", Jd = Object.prototype, Qd = Jd.hasOwnProperty;
  function U(t) {
    if (t == null) return true;
    if (We(t) && (C(t) || typeof t == "string" || typeof t.splice == "function" || Jt(t) || Vr(t) || Vn(t))) return !t.length;
    var e = ye(t);
    if (e == Xd || e == Zd) return !t.size;
    if (sn(t)) return !ji(t).length;
    for (var n in t) if (Qd.call(t, n)) return false;
    return true;
  }
  var ef = "[object RegExp]";
  function tf(t) {
    return Ce(t) && ot(t) == ef;
  }
  var Qs = it && it.isRegExp, Ze = Qs ? Yn(Qs) : tf;
  function Je(t) {
    return t === void 0;
  }
  var nf = "Expected a function";
  function rf(t) {
    if (typeof t != "function") throw new TypeError(nf);
    return function() {
      var e = arguments;
      switch (e.length) {
        case 0:
          return !t.call(this);
        case 1:
          return !t.call(this, e[0]);
        case 2:
          return !t.call(this, e[0], e[1]);
        case 3:
          return !t.call(this, e[0], e[1], e[2]);
      }
      return !t.apply(this, e);
    };
  }
  function sf(t, e, n, r) {
    if (!_e(t)) return t;
    e = Jn(e, t);
    for (var s = -1, i = e.length, a = i - 1, o = t; o != null && ++s < i; ) {
      var c = an(e[s]), l = n;
      if (c === "__proto__" || c === "constructor" || c === "prototype") return t;
      if (s != a) {
        var u = o[c];
        l = void 0, l === void 0 && (l = _e(u) ? u : zn(e[s + 1]) ? [] : {});
      }
      qn(o, c, l), o = o[c];
    }
    return t;
  }
  function af(t, e, n) {
    for (var r = -1, s = e.length, i = {}; ++r < s; ) {
      var a = e[r], o = Zr(t, a);
      n(o, a) && sf(i, Jn(a, t), o);
    }
    return i;
  }
  function we(t, e) {
    if (t == null) return {};
    var n = Kn(Iu(t), function(r) {
      return [r];
    });
    return e = Ke(e), af(t, n, function(r, s) {
      return e(r, s[0]);
    });
  }
  function of(t, e, n, r, s) {
    return s(t, function(i, a, o) {
      n = r ? (r = false, i) : e(n, i, a, o);
    }), n;
  }
  function fe(t, e, n) {
    var r = C(t) ? uu : of, s = arguments.length < 3;
    return r(t, Ke(e), n, s, Lt);
  }
  function er(t, e) {
    var n = C(t) ? es : ra;
    return n(t, rf(Ke(e)));
  }
  function cf(t, e) {
    var n;
    return Lt(t, function(r, s, i) {
      return n = e(r, s, i), !n;
    }), !!n;
  }
  function sa(t, e, n) {
    var r = C(t) ? Zi : cf;
    return r(t, Ke(e));
  }
  var lf = 1 / 0, uf = Nt && 1 / rs(new Nt([, -0]))[1] == lf ? function(t) {
    return new Nt(t);
  } : z, hf = 200;
  function df(t, e, n) {
    var r = -1, s = Mi, i = t.length, a = true, o = [], c = o;
    if (i >= hf) {
      var l = uf(t);
      if (l) return rs(l);
      a = false, s = ns, c = new Ct();
    } else c = o;
    e: for (; ++r < i; ) {
      var u = t[r], h = u;
      if (u = u !== 0 ? u : 0, a && h === h) {
        for (var d = c.length; d--; ) if (c[d] === h) continue e;
        o.push(u);
      } else s(c, h, n) || (c !== o && c.push(h), o.push(u));
    }
    return o;
  }
  function as(t) {
    return t && t.length ? df(t) : [];
  }
  function Lr(t) {
    console && console.error && console.error(`Error: ${t}`);
  }
  function ia(t) {
    console && console.warn && console.warn(`Warning: ${t}`);
  }
  function aa(t) {
    const e = (/* @__PURE__ */ new Date()).getTime(), n = t();
    return { time: (/* @__PURE__ */ new Date()).getTime() - e, value: n };
  }
  function oa(t) {
    function e() {
    }
    e.prototype = t;
    const n = new e();
    function r() {
      return typeof n.bar;
    }
    return r(), r(), t;
  }
  function ff(t) {
    return pf(t) ? t.LABEL : t.name;
  }
  function pf(t) {
    return oe(t.LABEL) && t.LABEL !== "";
  }
  class He {
    get definition() {
      return this._definition;
    }
    set definition(e) {
      this._definition = e;
    }
    constructor(e) {
      this._definition = e;
    }
    accept(e) {
      e.visit(this), L(this.definition, (n) => {
        n.accept(e);
      });
    }
  }
  class pe extends He {
    constructor(e) {
      super([]), this.idx = 1, de(this, we(e, (n) => n !== void 0));
    }
    set definition(e) {
    }
    get definition() {
      return this.referencedRule !== void 0 ? this.referencedRule.definition : [];
    }
    accept(e) {
      e.visit(this);
    }
  }
  class xt extends He {
    constructor(e) {
      super(e.definition), this.orgText = "", de(this, we(e, (n) => n !== void 0));
    }
  }
  class ce extends He {
    constructor(e) {
      super(e.definition), this.ignoreAmbiguities = false, de(this, we(e, (n) => n !== void 0));
    }
  }
  class ae extends He {
    constructor(e) {
      super(e.definition), this.idx = 1, de(this, we(e, (n) => n !== void 0));
    }
  }
  class ze extends He {
    constructor(e) {
      super(e.definition), this.idx = 1, de(this, we(e, (n) => n !== void 0));
    }
  }
  class qe extends He {
    constructor(e) {
      super(e.definition), this.idx = 1, de(this, we(e, (n) => n !== void 0));
    }
  }
  class H extends He {
    constructor(e) {
      super(e.definition), this.idx = 1, de(this, we(e, (n) => n !== void 0));
    }
  }
  class xe extends He {
    constructor(e) {
      super(e.definition), this.idx = 1, de(this, we(e, (n) => n !== void 0));
    }
  }
  class Me extends He {
    get definition() {
      return this._definition;
    }
    set definition(e) {
      this._definition = e;
    }
    constructor(e) {
      super(e.definition), this.idx = 1, this.ignoreAmbiguities = false, this.hasPredicates = false, de(this, we(e, (n) => n !== void 0));
    }
  }
  class D {
    constructor(e) {
      this.idx = 1, de(this, we(e, (n) => n !== void 0));
    }
    accept(e) {
      e.visit(this);
    }
  }
  function mf(t) {
    return S(t, An);
  }
  function An(t) {
    function e(n) {
      return S(n, An);
    }
    if (t instanceof pe) {
      const n = { type: "NonTerminal", name: t.nonTerminalName, idx: t.idx };
      return oe(t.label) && (n.label = t.label), n;
    } else {
      if (t instanceof ce) return { type: "Alternative", definition: e(t.definition) };
      if (t instanceof ae) return { type: "Option", idx: t.idx, definition: e(t.definition) };
      if (t instanceof ze) return { type: "RepetitionMandatory", idx: t.idx, definition: e(t.definition) };
      if (t instanceof qe) return { type: "RepetitionMandatoryWithSeparator", idx: t.idx, separator: An(new D({ terminalType: t.separator })), definition: e(t.definition) };
      if (t instanceof xe) return { type: "RepetitionWithSeparator", idx: t.idx, separator: An(new D({ terminalType: t.separator })), definition: e(t.definition) };
      if (t instanceof H) return { type: "Repetition", idx: t.idx, definition: e(t.definition) };
      if (t instanceof Me) return { type: "Alternation", idx: t.idx, definition: e(t.definition) };
      if (t instanceof D) {
        const n = { type: "Terminal", name: t.terminalType.name, label: ff(t.terminalType), idx: t.idx };
        oe(t.label) && (n.terminalLabel = t.label);
        const r = t.terminalType.PATTERN;
        return t.terminalType.PATTERN && (n.pattern = Ze(r) ? r.source : r), n;
      } else {
        if (t instanceof xt) return { type: "Rule", name: t.name, orgText: t.orgText, definition: e(t.definition) };
        throw Error("non exhaustive match");
      }
    }
  }
  class Mt {
    visit(e) {
      const n = e;
      switch (n.constructor) {
        case pe:
          return this.visitNonTerminal(n);
        case ce:
          return this.visitAlternative(n);
        case ae:
          return this.visitOption(n);
        case ze:
          return this.visitRepetitionMandatory(n);
        case qe:
          return this.visitRepetitionMandatoryWithSeparator(n);
        case xe:
          return this.visitRepetitionWithSeparator(n);
        case H:
          return this.visitRepetition(n);
        case Me:
          return this.visitAlternation(n);
        case D:
          return this.visitTerminal(n);
        case xt:
          return this.visitRule(n);
        default:
          throw Error("non exhaustive match");
      }
    }
    visitNonTerminal(e) {
    }
    visitAlternative(e) {
    }
    visitOption(e) {
    }
    visitRepetition(e) {
    }
    visitRepetitionMandatory(e) {
    }
    visitRepetitionMandatoryWithSeparator(e) {
    }
    visitRepetitionWithSeparator(e) {
    }
    visitAlternation(e) {
    }
    visitTerminal(e) {
    }
    visitRule(e) {
    }
  }
  function gf(t) {
    return t instanceof ce || t instanceof ae || t instanceof H || t instanceof ze || t instanceof qe || t instanceof xe || t instanceof D || t instanceof xt;
  }
  function wn(t, e = []) {
    return t instanceof ae || t instanceof H || t instanceof xe ? true : t instanceof Me ? sa(t.definition, (r) => wn(r, e)) : t instanceof pe && re(e, t) ? false : t instanceof He ? (t instanceof pe && e.push(t), ke(t.definition, (r) => wn(r, e))) : false;
  }
  function Ef(t) {
    return t instanceof Me;
  }
  function Fe(t) {
    if (t instanceof pe) return "SUBRULE";
    if (t instanceof ae) return "OPTION";
    if (t instanceof Me) return "OR";
    if (t instanceof ze) return "AT_LEAST_ONE";
    if (t instanceof qe) return "AT_LEAST_ONE_SEP";
    if (t instanceof xe) return "MANY_SEP";
    if (t instanceof H) return "MANY";
    if (t instanceof D) return "CONSUME";
    throw Error("non exhaustive match");
  }
  class tr {
    walk(e, n = []) {
      L(e.definition, (r, s) => {
        const i = Y(e.definition, s + 1);
        if (r instanceof pe) this.walkProdRef(r, i, n);
        else if (r instanceof D) this.walkTerminal(r, i, n);
        else if (r instanceof ce) this.walkFlat(r, i, n);
        else if (r instanceof ae) this.walkOption(r, i, n);
        else if (r instanceof ze) this.walkAtLeastOne(r, i, n);
        else if (r instanceof qe) this.walkAtLeastOneSep(r, i, n);
        else if (r instanceof xe) this.walkManySep(r, i, n);
        else if (r instanceof H) this.walkMany(r, i, n);
        else if (r instanceof Me) this.walkOr(r, i, n);
        else throw Error("non exhaustive match");
      });
    }
    walkTerminal(e, n, r) {
    }
    walkProdRef(e, n, r) {
    }
    walkFlat(e, n, r) {
      const s = n.concat(r);
      this.walk(e, s);
    }
    walkOption(e, n, r) {
      const s = n.concat(r);
      this.walk(e, s);
    }
    walkAtLeastOne(e, n, r) {
      const s = [new ae({ definition: e.definition })].concat(n, r);
      this.walk(e, s);
    }
    walkAtLeastOneSep(e, n, r) {
      const s = ei(e, n, r);
      this.walk(e, s);
    }
    walkMany(e, n, r) {
      const s = [new ae({ definition: e.definition })].concat(n, r);
      this.walk(e, s);
    }
    walkManySep(e, n, r) {
      const s = ei(e, n, r);
      this.walk(e, s);
    }
    walkOr(e, n, r) {
      const s = n.concat(r);
      L(e.definition, (i) => {
        const a = new ce({ definition: [i] });
        this.walk(a, s);
      });
    }
  }
  function ei(t, e, n) {
    return [new ae({ definition: [new D({ terminalType: t.separator })].concat(t.definition) })].concat(e, n);
  }
  function cn(t) {
    if (t instanceof pe) return cn(t.referencedRule);
    if (t instanceof D) return Af(t);
    if (gf(t)) return Tf(t);
    if (Ef(t)) return yf(t);
    throw Error("non exhaustive match");
  }
  function Tf(t) {
    let e = [];
    const n = t.definition;
    let r = 0, s = n.length > r, i, a = true;
    for (; s && a; ) i = n[r], a = wn(i), e = e.concat(cn(i)), r = r + 1, s = n.length > r;
    return as(e);
  }
  function yf(t) {
    const e = S(t.definition, (n) => cn(n));
    return as(be(e));
  }
  function Af(t) {
    return [t.terminalType];
  }
  const ca = "_~IN~_";
  class Sf extends tr {
    constructor(e) {
      super(), this.topProd = e, this.follows = {};
    }
    startWalking() {
      return this.walk(this.topProd), this.follows;
    }
    walkTerminal(e, n, r) {
    }
    walkProdRef(e, n, r) {
      const s = Rf(e.referencedRule, e.idx) + this.topProd.name, i = n.concat(r), a = new ce({ definition: i }), o = cn(a);
      this.follows[s] = o;
    }
  }
  function _f(t) {
    const e = {};
    return L(t, (n) => {
      const r = new Sf(n).startWalking();
      de(e, r);
    }), e;
  }
  function Rf(t, e) {
    return t.name + e + ca;
  }
  function I(t) {
    return t.charCodeAt(0);
  }
  function dr(t, e) {
    Array.isArray(t) ? t.forEach(function(n) {
      e.push(n);
    }) : e.push(t);
  }
  function Bt(t, e) {
    if (t[e] === true) throw "duplicate flag " + e;
    t[e], t[e] = true;
  }
  function It(t) {
    if (t === void 0) throw Error("Internal Error - Should never get here!");
    return true;
  }
  function Lf() {
    throw Error("Internal Error - Should never get here!");
  }
  function ti(t) {
    return t.type === "Character";
  }
  const xn = [];
  for (let t = I("0"); t <= I("9"); t++) xn.push(t);
  const Mn = [I("_")].concat(xn);
  for (let t = I("a"); t <= I("z"); t++) Mn.push(t);
  for (let t = I("A"); t <= I("Z"); t++) Mn.push(t);
  const ni = [I(" "), I("\f"), I(`
`), I("\r"), I("	"), I("\v"), I("	"), I("\xA0"), I("\u1680"), I("\u2000"), I("\u2001"), I("\u2002"), I("\u2003"), I("\u2004"), I("\u2005"), I("\u2006"), I("\u2007"), I("\u2008"), I("\u2009"), I("\u200A"), I("\u2028"), I("\u2029"), I("\u202F"), I("\u205F"), I("\u3000"), I("\uFEFF")], If = /[0-9a-fA-F]/, pn = /[0-9]/, Of = /[1-9]/;
  class Nf {
    constructor() {
      this.idx = 0, this.input = "", this.groupIdx = 0;
    }
    saveState() {
      return { idx: this.idx, input: this.input, groupIdx: this.groupIdx };
    }
    restoreState(e) {
      this.idx = e.idx, this.input = e.input, this.groupIdx = e.groupIdx;
    }
    pattern(e) {
      this.idx = 0, this.input = e, this.groupIdx = 0, this.consumeChar("/");
      const n = this.disjunction();
      this.consumeChar("/");
      const r = { type: "Flags", loc: { begin: this.idx, end: e.length }, global: false, ignoreCase: false, multiLine: false, unicode: false, sticky: false };
      for (; this.isRegExpFlag(); ) switch (this.popChar()) {
        case "g":
          Bt(r, "global");
          break;
        case "i":
          Bt(r, "ignoreCase");
          break;
        case "m":
          Bt(r, "multiLine");
          break;
        case "u":
          Bt(r, "unicode");
          break;
        case "y":
          Bt(r, "sticky");
          break;
      }
      if (this.idx !== this.input.length) throw Error("Redundant input: " + this.input.substring(this.idx));
      return { type: "Pattern", flags: r, value: n, loc: this.loc(0) };
    }
    disjunction() {
      const e = [], n = this.idx;
      for (e.push(this.alternative()); this.peekChar() === "|"; ) this.consumeChar("|"), e.push(this.alternative());
      return { type: "Disjunction", value: e, loc: this.loc(n) };
    }
    alternative() {
      const e = [], n = this.idx;
      for (; this.isTerm(); ) e.push(this.term());
      return { type: "Alternative", value: e, loc: this.loc(n) };
    }
    term() {
      return this.isAssertion() ? this.assertion() : this.atom();
    }
    assertion() {
      const e = this.idx;
      switch (this.popChar()) {
        case "^":
          return { type: "StartAnchor", loc: this.loc(e) };
        case "$":
          return { type: "EndAnchor", loc: this.loc(e) };
        case "\\":
          switch (this.popChar()) {
            case "b":
              return { type: "WordBoundary", loc: this.loc(e) };
            case "B":
              return { type: "NonWordBoundary", loc: this.loc(e) };
          }
          throw Error("Invalid Assertion Escape");
        case "(":
          this.consumeChar("?");
          let n;
          switch (this.popChar()) {
            case "=":
              n = "Lookahead";
              break;
            case "!":
              n = "NegativeLookahead";
              break;
            case "<": {
              switch (this.popChar()) {
                case "=":
                  n = "Lookbehind";
                  break;
                case "!":
                  n = "NegativeLookbehind";
              }
              break;
            }
          }
          It(n);
          const r = this.disjunction();
          return this.consumeChar(")"), { type: n, value: r, loc: this.loc(e) };
      }
      return Lf();
    }
    quantifier(e = false) {
      let n;
      const r = this.idx;
      switch (this.popChar()) {
        case "*":
          n = { atLeast: 0, atMost: 1 / 0 };
          break;
        case "+":
          n = { atLeast: 1, atMost: 1 / 0 };
          break;
        case "?":
          n = { atLeast: 0, atMost: 1 };
          break;
        case "{":
          const s = this.integerIncludingZero();
          switch (this.popChar()) {
            case "}":
              n = { atLeast: s, atMost: s };
              break;
            case ",":
              let i;
              this.isDigit() ? (i = this.integerIncludingZero(), n = { atLeast: s, atMost: i }) : n = { atLeast: s, atMost: 1 / 0 }, this.consumeChar("}");
              break;
          }
          if (e === true && n === void 0) return;
          It(n);
          break;
      }
      if (!(e === true && n === void 0) && It(n)) return this.peekChar(0) === "?" ? (this.consumeChar("?"), n.greedy = false) : n.greedy = true, n.type = "Quantifier", n.loc = this.loc(r), n;
    }
    atom() {
      let e;
      const n = this.idx;
      switch (this.peekChar()) {
        case ".":
          e = this.dotAll();
          break;
        case "\\":
          e = this.atomEscape();
          break;
        case "[":
          e = this.characterClass();
          break;
        case "(":
          e = this.group();
          break;
      }
      if (e === void 0 && this.isPatternCharacter() && (e = this.patternCharacter()), It(e)) return e.loc = this.loc(n), this.isQuantifier() && (e.quantifier = this.quantifier()), e;
    }
    dotAll() {
      return this.consumeChar("."), { type: "Set", complement: true, value: [I(`
`), I("\r"), I("\u2028"), I("\u2029")] };
    }
    atomEscape() {
      switch (this.consumeChar("\\"), this.peekChar()) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          return this.decimalEscapeAtom();
        case "d":
        case "D":
        case "s":
        case "S":
        case "w":
        case "W":
          return this.characterClassEscape();
        case "f":
        case "n":
        case "r":
        case "t":
        case "v":
          return this.controlEscapeAtom();
        case "c":
          return this.controlLetterEscapeAtom();
        case "0":
          return this.nulCharacterAtom();
        case "x":
          return this.hexEscapeSequenceAtom();
        case "u":
          return this.regExpUnicodeEscapeSequenceAtom();
        default:
          return this.identityEscapeAtom();
      }
    }
    decimalEscapeAtom() {
      return { type: "GroupBackReference", value: this.positiveInteger() };
    }
    characterClassEscape() {
      let e, n = false;
      switch (this.popChar()) {
        case "d":
          e = xn;
          break;
        case "D":
          e = xn, n = true;
          break;
        case "s":
          e = ni;
          break;
        case "S":
          e = ni, n = true;
          break;
        case "w":
          e = Mn;
          break;
        case "W":
          e = Mn, n = true;
          break;
      }
      if (It(e)) return { type: "Set", value: e, complement: n };
    }
    controlEscapeAtom() {
      let e;
      switch (this.popChar()) {
        case "f":
          e = I("\f");
          break;
        case "n":
          e = I(`
`);
          break;
        case "r":
          e = I("\r");
          break;
        case "t":
          e = I("	");
          break;
        case "v":
          e = I("\v");
          break;
      }
      if (It(e)) return { type: "Character", value: e };
    }
    controlLetterEscapeAtom() {
      this.consumeChar("c");
      const e = this.popChar();
      if (/[a-zA-Z]/.test(e) === false) throw Error("Invalid ");
      return { type: "Character", value: e.toUpperCase().charCodeAt(0) - 64 };
    }
    nulCharacterAtom() {
      return this.consumeChar("0"), { type: "Character", value: I("\0") };
    }
    hexEscapeSequenceAtom() {
      return this.consumeChar("x"), this.parseHexDigits(2);
    }
    regExpUnicodeEscapeSequenceAtom() {
      return this.consumeChar("u"), this.parseHexDigits(4);
    }
    identityEscapeAtom() {
      const e = this.popChar();
      return { type: "Character", value: I(e) };
    }
    classPatternCharacterAtom() {
      switch (this.peekChar()) {
        case `
`:
        case "\r":
        case "\u2028":
        case "\u2029":
        case "\\":
        case "]":
          throw Error("TBD");
        default:
          const e = this.popChar();
          return { type: "Character", value: I(e) };
      }
    }
    characterClass() {
      const e = [];
      let n = false;
      for (this.consumeChar("["), this.peekChar(0) === "^" && (this.consumeChar("^"), n = true); this.isClassAtom(); ) {
        const r = this.classAtom();
        if (r.type, ti(r) && this.isRangeDash()) {
          this.consumeChar("-");
          const s = this.classAtom();
          if (s.type, ti(s)) {
            if (s.value < r.value) throw Error("Range out of order in character class");
            e.push({ from: r.value, to: s.value });
          } else dr(r.value, e), e.push(I("-")), dr(s.value, e);
        } else dr(r.value, e);
      }
      return this.consumeChar("]"), { type: "Set", complement: n, value: e };
    }
    classAtom() {
      switch (this.peekChar()) {
        case "]":
        case `
`:
        case "\r":
        case "\u2028":
        case "\u2029":
          throw Error("TBD");
        case "\\":
          return this.classEscape();
        default:
          return this.classPatternCharacterAtom();
      }
    }
    classEscape() {
      switch (this.consumeChar("\\"), this.peekChar()) {
        case "b":
          return this.consumeChar("b"), { type: "Character", value: I("\b") };
        case "d":
        case "D":
        case "s":
        case "S":
        case "w":
        case "W":
          return this.characterClassEscape();
        case "f":
        case "n":
        case "r":
        case "t":
        case "v":
          return this.controlEscapeAtom();
        case "c":
          return this.controlLetterEscapeAtom();
        case "0":
          return this.nulCharacterAtom();
        case "x":
          return this.hexEscapeSequenceAtom();
        case "u":
          return this.regExpUnicodeEscapeSequenceAtom();
        default:
          return this.identityEscapeAtom();
      }
    }
    group() {
      let e = true;
      switch (this.consumeChar("("), this.peekChar(0)) {
        case "?":
          this.consumeChar("?"), this.consumeChar(":"), e = false;
          break;
        default:
          this.groupIdx++;
          break;
      }
      const n = this.disjunction();
      this.consumeChar(")");
      const r = { type: "Group", capturing: e, value: n };
      return e && (r.idx = this.groupIdx), r;
    }
    positiveInteger() {
      let e = this.popChar();
      if (Of.test(e) === false) throw Error("Expecting a positive integer");
      for (; pn.test(this.peekChar(0)); ) e += this.popChar();
      return parseInt(e, 10);
    }
    integerIncludingZero() {
      let e = this.popChar();
      if (pn.test(e) === false) throw Error("Expecting an integer");
      for (; pn.test(this.peekChar(0)); ) e += this.popChar();
      return parseInt(e, 10);
    }
    patternCharacter() {
      const e = this.popChar();
      switch (e) {
        case `
`:
        case "\r":
        case "\u2028":
        case "\u2029":
        case "^":
        case "$":
        case "\\":
        case ".":
        case "*":
        case "+":
        case "?":
        case "(":
        case ")":
        case "[":
        case "|":
          throw Error("TBD");
        default:
          return { type: "Character", value: I(e) };
      }
    }
    isRegExpFlag() {
      switch (this.peekChar(0)) {
        case "g":
        case "i":
        case "m":
        case "u":
        case "y":
          return true;
        default:
          return false;
      }
    }
    isRangeDash() {
      return this.peekChar() === "-" && this.isClassAtom(1);
    }
    isDigit() {
      return pn.test(this.peekChar(0));
    }
    isClassAtom(e = 0) {
      switch (this.peekChar(e)) {
        case "]":
        case `
`:
        case "\r":
        case "\u2028":
        case "\u2029":
          return false;
        default:
          return true;
      }
    }
    isTerm() {
      return this.isAtom() || this.isAssertion();
    }
    isAtom() {
      if (this.isPatternCharacter()) return true;
      switch (this.peekChar(0)) {
        case ".":
        case "\\":
        case "[":
        case "(":
          return true;
        default:
          return false;
      }
    }
    isAssertion() {
      switch (this.peekChar(0)) {
        case "^":
        case "$":
          return true;
        case "\\":
          switch (this.peekChar(1)) {
            case "b":
            case "B":
              return true;
            default:
              return false;
          }
        case "(":
          return this.peekChar(1) === "?" && (this.peekChar(2) === "=" || this.peekChar(2) === "!" || this.peekChar(2) === "<" && (this.peekChar(3) === "=" || this.peekChar(3) === "!"));
        default:
          return false;
      }
    }
    isQuantifier() {
      const e = this.saveState();
      try {
        return this.quantifier(true) !== void 0;
      } catch {
        return false;
      } finally {
        this.restoreState(e);
      }
    }
    isPatternCharacter() {
      switch (this.peekChar()) {
        case "^":
        case "$":
        case "\\":
        case ".":
        case "*":
        case "+":
        case "?":
        case "(":
        case ")":
        case "[":
        case "|":
        case "/":
        case `
`:
        case "\r":
        case "\u2028":
        case "\u2029":
          return false;
        default:
          return true;
      }
    }
    parseHexDigits(e) {
      let n = "";
      for (let s = 0; s < e; s++) {
        const i = this.popChar();
        if (If.test(i) === false) throw Error("Expecting a HexDecimal digits");
        n += i;
      }
      return { type: "Character", value: parseInt(n, 16) };
    }
    peekChar(e = 0) {
      return this.input[this.idx + e];
    }
    popChar() {
      const e = this.peekChar(0);
      return this.consumeChar(void 0), e;
    }
    consumeChar(e) {
      if (e !== void 0 && this.input[this.idx] !== e) throw Error("Expected: '" + e + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx);
      if (this.idx >= this.input.length) throw Error("Unexpected end of input");
      this.idx++;
    }
    loc(e) {
      return { begin: e, end: this.idx };
    }
  }
  class os {
    visitChildren(e) {
      for (const n in e) {
        const r = e[n];
        e.hasOwnProperty(n) && (r.type !== void 0 ? this.visit(r) : Array.isArray(r) && r.forEach((s) => {
          this.visit(s);
        }, this));
      }
    }
    visit(e) {
      switch (e.type) {
        case "Pattern":
          this.visitPattern(e);
          break;
        case "Flags":
          this.visitFlags(e);
          break;
        case "Disjunction":
          this.visitDisjunction(e);
          break;
        case "Alternative":
          this.visitAlternative(e);
          break;
        case "StartAnchor":
          this.visitStartAnchor(e);
          break;
        case "EndAnchor":
          this.visitEndAnchor(e);
          break;
        case "WordBoundary":
          this.visitWordBoundary(e);
          break;
        case "NonWordBoundary":
          this.visitNonWordBoundary(e);
          break;
        case "Lookahead":
          this.visitLookahead(e);
          break;
        case "NegativeLookahead":
          this.visitNegativeLookahead(e);
          break;
        case "Lookbehind":
          this.visitLookbehind(e);
          break;
        case "NegativeLookbehind":
          this.visitNegativeLookbehind(e);
          break;
        case "Character":
          this.visitCharacter(e);
          break;
        case "Set":
          this.visitSet(e);
          break;
        case "Group":
          this.visitGroup(e);
          break;
        case "GroupBackReference":
          this.visitGroupBackReference(e);
          break;
        case "Quantifier":
          this.visitQuantifier(e);
          break;
      }
      this.visitChildren(e);
    }
    visitPattern(e) {
    }
    visitFlags(e) {
    }
    visitDisjunction(e) {
    }
    visitAlternative(e) {
    }
    visitStartAnchor(e) {
    }
    visitEndAnchor(e) {
    }
    visitWordBoundary(e) {
    }
    visitNonWordBoundary(e) {
    }
    visitLookahead(e) {
    }
    visitNegativeLookahead(e) {
    }
    visitLookbehind(e) {
    }
    visitNegativeLookbehind(e) {
    }
    visitCharacter(e) {
    }
    visitSet(e) {
    }
    visitGroup(e) {
    }
    visitGroupBackReference(e) {
    }
    visitQuantifier(e) {
    }
  }
  let Sn = {};
  const bf = new Nf();
  function nr(t) {
    const e = t.toString();
    if (Sn.hasOwnProperty(e)) return Sn[e];
    {
      const n = bf.pattern(e);
      return Sn[e] = n, n;
    }
  }
  function kf() {
    Sn = {};
  }
  const la = "Complement Sets are not supported for first char optimization", Pn = `Unable to use "first char" lexer optimizations:
`;
  function Cf(t, e = false) {
    try {
      const n = nr(t);
      return Ir(n.value, {}, n.flags.ignoreCase);
    } catch (n) {
      if (n.message === la) e && ia(`${Pn}	Unable to optimize: < ${t.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);
      else {
        let r = "";
        e && (r = `
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`), Lr(`${Pn}
	Failed parsing: < ${t.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues` + r);
      }
    }
    return [];
  }
  function Ir(t, e, n) {
    switch (t.type) {
      case "Disjunction":
        for (let s = 0; s < t.value.length; s++) Ir(t.value[s], e, n);
        break;
      case "Alternative":
        const r = t.value;
        for (let s = 0; s < r.length; s++) {
          const i = r[s];
          switch (i.type) {
            case "EndAnchor":
            case "GroupBackReference":
            case "Lookahead":
            case "NegativeLookahead":
            case "Lookbehind":
            case "NegativeLookbehind":
            case "StartAnchor":
            case "WordBoundary":
            case "NonWordBoundary":
              continue;
          }
          const a = i;
          switch (a.type) {
            case "Character":
              mn(a.value, e, n);
              break;
            case "Set":
              if (a.complement === true) throw Error(la);
              L(a.value, (c) => {
                if (typeof c == "number") mn(c, e, n);
                else {
                  const l = c;
                  if (n === true) for (let u = l.from; u <= l.to; u++) mn(u, e, n);
                  else {
                    for (let u = l.from; u <= l.to && u < Wt; u++) mn(u, e, n);
                    if (l.to >= Wt) {
                      const u = l.from >= Wt ? l.from : Wt, h = l.to, d = at(u), p = at(h);
                      for (let f = d; f <= p; f++) e[f] = f;
                    }
                  }
                }
              });
              break;
            case "Group":
              Ir(a.value, e, n);
              break;
            default:
              throw Error("Non Exhaustive Match");
          }
          const o = a.quantifier !== void 0 && a.quantifier.atLeast === 0;
          if (a.type === "Group" && Or(a) === false || a.type !== "Group" && o === false) break;
        }
        break;
      default:
        throw Error("non exhaustive match!");
    }
    return K(e);
  }
  function mn(t, e, n) {
    const r = at(t);
    e[r] = r, n === true && vf(t, e);
  }
  function vf(t, e) {
    const n = String.fromCharCode(t), r = n.toUpperCase();
    if (r !== n) {
      const s = at(r.charCodeAt(0));
      e[s] = s;
    } else {
      const s = n.toLowerCase();
      if (s !== n) {
        const i = at(s.charCodeAt(0));
        e[i] = i;
      }
    }
  }
  function ri(t, e) {
    return vt(t.value, (n) => {
      if (typeof n == "number") return re(e, n);
      {
        const r = n;
        return vt(e, (s) => r.from <= s && s <= r.to) !== void 0;
      }
    });
  }
  function Or(t) {
    const e = t.quantifier;
    return e && e.atLeast === 0 ? true : t.value ? C(t.value) ? ke(t.value, Or) : Or(t.value) : false;
  }
  class wf extends os {
    constructor(e) {
      super(), this.targetCharCodes = e, this.found = false;
    }
    visitChildren(e) {
      if (this.found !== true) {
        switch (e.type) {
          case "Lookahead":
            this.visitLookahead(e);
            return;
          case "NegativeLookahead":
            this.visitNegativeLookahead(e);
            return;
          case "Lookbehind":
            this.visitLookbehind(e);
            return;
          case "NegativeLookbehind":
            this.visitNegativeLookbehind(e);
            return;
        }
        super.visitChildren(e);
      }
    }
    visitCharacter(e) {
      re(this.targetCharCodes, e.value) && (this.found = true);
    }
    visitSet(e) {
      e.complement ? ri(e, this.targetCharCodes) === void 0 && (this.found = true) : ri(e, this.targetCharCodes) !== void 0 && (this.found = true);
    }
  }
  function cs(t, e) {
    if (e instanceof RegExp) {
      const n = nr(e), r = new wf(t);
      return r.visit(n), r.found;
    } else return vt(e, (n) => re(t, n.charCodeAt(0))) !== void 0;
  }
  const yt = "PATTERN", Gt = "defaultMode", gn = "modes";
  function xf(t, e) {
    e = is(e, { debug: false, safeMode: false, positionTracking: "full", lineTerminatorCharacters: ["\r", `
`], tracer: (m, g) => g() });
    const n = e.tracer;
    n("initCharCodeToOptimizedIndexMap", () => {
      rp();
    });
    let r;
    n("Reject Lexer.NA", () => {
      r = er(t, (m) => m[yt] === X.NA);
    });
    let s = false, i;
    n("Transform Patterns", () => {
      s = false, i = S(r, (m) => {
        const g = m[yt];
        if (Ze(g)) {
          const T = g.source;
          return T.length === 1 && T !== "^" && T !== "$" && T !== "." && !g.ignoreCase ? T : T.length === 2 && T[0] === "\\" && !re(["d", "D", "s", "S", "t", "r", "n", "t", "0", "c", "b", "B", "f", "v", "w", "W"], T[1]) ? T[1] : si(g);
        } else {
          if (et(g)) return s = true, { exec: g };
          if (typeof g == "object") return s = true, g;
          if (typeof g == "string") {
            if (g.length === 1) return g;
            {
              const T = g.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&"), x = new RegExp(T);
              return si(x);
            }
          } else throw Error("non exhaustive match");
        }
      });
    });
    let a, o, c, l, u;
    n("misc mapping", () => {
      a = S(r, (m) => m.tokenTypeIdx), o = S(r, (m) => {
        const g = m.GROUP;
        if (g !== X.SKIPPED) {
          if (oe(g)) return g;
          if (Je(g)) return false;
          throw Error("non exhaustive match");
        }
      }), c = S(r, (m) => {
        const g = m.LONGER_ALT;
        if (g) return C(g) ? S(g, (x) => Js(r, x)) : [Js(r, g)];
      }), l = S(r, (m) => m.PUSH_MODE), u = S(r, (m) => _(m, "POP_MODE"));
    });
    let h;
    n("Line Terminator Handling", () => {
      const m = da(e.lineTerminatorCharacters);
      h = S(r, (g) => false), e.positionTracking !== "onlyOffset" && (h = S(r, (g) => _(g, "LINE_BREAKS") ? !!g.LINE_BREAKS : ha(g, m) === false && cs(m, g.PATTERN)));
    });
    let d, p, f, y;
    n("Misc Mapping #2", () => {
      d = S(r, ua), p = S(i, ep), f = fe(r, (m, g) => {
        const T = g.GROUP;
        return oe(T) && T !== X.SKIPPED && (m[T] = []), m;
      }, {}), y = S(i, (m, g) => ({ pattern: i[g], longerAlt: c[g], canLineTerminator: h[g], isCustom: d[g], short: p[g], group: o[g], push: l[g], pop: u[g], tokenTypeIdx: a[g], tokenType: r[g] }));
    });
    let R = true, E = [];
    return e.safeMode || n("First Char Optimization", () => {
      E = fe(r, (m, g, T) => {
        if (typeof g.PATTERN == "string") {
          const x = g.PATTERN.charCodeAt(0), le = at(x);
          fr(m, le, y[T]);
        } else if (C(g.START_CHARS_HINT)) {
          let x;
          L(g.START_CHARS_HINT, (le) => {
            const Pe = typeof le == "string" ? le.charCodeAt(0) : le, Ve = at(Pe);
            x !== Ve && (x = Ve, fr(m, Ve, y[T]));
          });
        } else if (Ze(g.PATTERN)) if (g.PATTERN.unicode) R = false, e.ensureOptimizations && Lr(`${Pn}	Unable to analyze < ${g.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);
        else {
          const x = Cf(g.PATTERN, e.ensureOptimizations);
          U(x) && (R = false), L(x, (le) => {
            fr(m, le, y[T]);
          });
        }
        else e.ensureOptimizations && Lr(`${Pn}	TokenType: <${g.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`), R = false;
        return m;
      }, []);
    }), { emptyGroups: f, patternIdxToConfig: y, charCodeToPatternIdxToConfig: E, hasCustom: s, canBeOptimized: R };
  }
  function Mf(t, e) {
    let n = [];
    const r = Uf(t);
    n = n.concat(r.errors);
    const s = $f(r.valid), i = s.valid;
    return n = n.concat(s.errors), n = n.concat(Pf(i)), n = n.concat(Hf(i)), n = n.concat(zf(i, e)), n = n.concat(qf(i)), n;
  }
  function Pf(t) {
    let e = [];
    const n = Le(t, (r) => Ze(r[yt]));
    return e = e.concat(Bf(n)), e = e.concat(Gf(n)), e = e.concat(Wf(n)), e = e.concat(Kf(n)), e = e.concat(Df(n)), e;
  }
  function Uf(t) {
    const e = Le(t, (s) => !_(s, yt)), n = S(e, (s) => ({ message: "Token Type: ->" + s.name + "<- missing static 'PATTERN' property", type: W.MISSING_PATTERN, tokenTypes: [s] })), r = Qn(t, e);
    return { errors: n, valid: r };
  }
  function $f(t) {
    const e = Le(t, (s) => {
      const i = s[yt];
      return !Ze(i) && !et(i) && !_(i, "exec") && !oe(i);
    }), n = S(e, (s) => ({ message: "Token Type: ->" + s.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.", type: W.INVALID_PATTERN, tokenTypes: [s] })), r = Qn(t, e);
    return { errors: n, valid: r };
  }
  const Ff = /[^\\][$]/;
  function Bf(t) {
    class e extends os {
      constructor() {
        super(...arguments), this.found = false;
      }
      visitEndAnchor(i) {
        this.found = true;
      }
    }
    const n = Le(t, (s) => {
      const i = s.PATTERN;
      try {
        const a = nr(i), o = new e();
        return o.visit(a), o.found;
      } catch {
        return Ff.test(i.source);
      }
    });
    return S(n, (s) => ({ message: `Unexpected RegExp Anchor Error:
	Token Type: ->` + s.name + `<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`, type: W.EOI_ANCHOR_FOUND, tokenTypes: [s] }));
  }
  function Df(t) {
    const e = Le(t, (r) => r.PATTERN.test(""));
    return S(e, (r) => ({ message: "Token Type: ->" + r.name + "<- static 'PATTERN' must not match an empty string", type: W.EMPTY_MATCH_PATTERN, tokenTypes: [r] }));
  }
  const jf = /[^\\[][\^]|^\^/;
  function Gf(t) {
    class e extends os {
      constructor() {
        super(...arguments), this.found = false;
      }
      visitStartAnchor(i) {
        this.found = true;
      }
    }
    const n = Le(t, (s) => {
      const i = s.PATTERN;
      try {
        const a = nr(i), o = new e();
        return o.visit(a), o.found;
      } catch {
        return jf.test(i.source);
      }
    });
    return S(n, (s) => ({ message: `Unexpected RegExp Anchor Error:
	Token Type: ->` + s.name + `<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`, type: W.SOI_ANCHOR_FOUND, tokenTypes: [s] }));
  }
  function Wf(t) {
    const e = Le(t, (r) => {
      const s = r[yt];
      return s instanceof RegExp && (s.multiline || s.global);
    });
    return S(e, (r) => ({ message: "Token Type: ->" + r.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')", type: W.UNSUPPORTED_FLAGS_FOUND, tokenTypes: [r] }));
  }
  function Kf(t) {
    const e = [];
    let n = S(t, (i) => fe(t, (a, o) => (i.PATTERN.source === o.PATTERN.source && !re(e, o) && o.PATTERN !== X.NA && (e.push(o), a.push(o)), a), []));
    n = on(n);
    const r = Le(n, (i) => i.length > 1);
    return S(r, (i) => {
      const a = S(i, (c) => c.name);
      return { message: `The same RegExp pattern ->${ve(i).PATTERN}<-has been used in all of the following Token Types: ${a.join(", ")} <-`, type: W.DUPLICATE_PATTERNS_FOUND, tokenTypes: i };
    });
  }
  function Hf(t) {
    const e = Le(t, (r) => {
      if (!_(r, "GROUP")) return false;
      const s = r.GROUP;
      return s !== X.SKIPPED && s !== X.NA && !oe(s);
    });
    return S(e, (r) => ({ message: "Token Type: ->" + r.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String", type: W.INVALID_GROUP_TYPE_FOUND, tokenTypes: [r] }));
  }
  function zf(t, e) {
    const n = Le(t, (s) => s.PUSH_MODE !== void 0 && !re(e, s.PUSH_MODE));
    return S(n, (s) => ({ message: `Token Type: ->${s.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${s.PUSH_MODE}<-which does not exist`, type: W.PUSH_MODE_DOES_NOT_EXIST, tokenTypes: [s] }));
  }
  function qf(t) {
    const e = [], n = fe(t, (r, s, i) => {
      const a = s.PATTERN;
      return a === X.NA || (oe(a) ? r.push({ str: a, idx: i, tokenType: s }) : Ze(a) && Yf(a) && r.push({ str: a.source, idx: i, tokenType: s })), r;
    }, []);
    return L(t, (r, s) => {
      L(n, ({ str: i, idx: a, tokenType: o }) => {
        if (s < a && Vf(i, r.PATTERN)) {
          const c = `Token: ->${o.name}<- can never be matched.
Because it appears AFTER the Token Type ->${r.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;
          e.push({ message: c, type: W.UNREACHABLE_PATTERN, tokenTypes: [r, o] });
        }
      });
    }), e;
  }
  function Vf(t, e) {
    if (Ze(e)) {
      if (Xf(e)) return false;
      const n = e.exec(t);
      return n !== null && n.index === 0;
    } else {
      if (et(e)) return e(t, 0, [], {});
      if (_(e, "exec")) return e.exec(t, 0, [], {});
      if (typeof e == "string") return e === t;
      throw Error("non exhaustive match");
    }
  }
  function Yf(t) {
    return vt([".", "\\", "[", "]", "|", "^", "$", "(", ")", "?", "*", "+", "{"], (n) => t.source.indexOf(n) !== -1) === void 0;
  }
  function Xf(t) {
    return /(\(\?=)|(\(\?!)|(\(\?<=)|(\(\?<!)/.test(t.source);
  }
  function si(t) {
    const e = t.ignoreCase ? "iy" : "y";
    return new RegExp(`${t.source}`, e);
  }
  function Zf(t, e, n) {
    const r = [];
    return _(t, Gt) || r.push({ message: "A MultiMode Lexer cannot be initialized without a <" + Gt + `> property in its definition
`, type: W.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE }), _(t, gn) || r.push({ message: "A MultiMode Lexer cannot be initialized without a <" + gn + `> property in its definition
`, type: W.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY }), _(t, gn) && _(t, Gt) && !_(t.modes, t.defaultMode) && r.push({ message: `A MultiMode Lexer cannot be initialized with a ${Gt}: <${t.defaultMode}>which does not exist
`, type: W.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST }), _(t, gn) && L(t.modes, (s, i) => {
      L(s, (a, o) => {
        if (Je(a)) r.push({ message: `A Lexer cannot be initialized using an undefined Token Type. Mode:<${i}> at index: <${o}>
`, type: W.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED });
        else if (_(a, "LONGER_ALT")) {
          const c = C(a.LONGER_ALT) ? a.LONGER_ALT : [a.LONGER_ALT];
          L(c, (l) => {
            !Je(l) && !re(s, l) && r.push({ message: `A MultiMode Lexer cannot be initialized with a longer_alt <${l.name}> on token <${a.name}> outside of mode <${i}>
`, type: W.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE });
          });
        }
      });
    }), r;
  }
  function Jf(t, e, n) {
    const r = [];
    let s = false;
    const i = on(be(K(t.modes))), a = er(i, (c) => c[yt] === X.NA), o = da(n);
    return e && L(a, (c) => {
      const l = ha(c, o);
      if (l !== false) {
        const h = { message: np(c, l), type: l.issue, tokenType: c };
        r.push(h);
      } else _(c, "LINE_BREAKS") ? c.LINE_BREAKS === true && (s = true) : cs(o, c.PATTERN) && (s = true);
    }), e && !s && r.push({ message: `Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`, type: W.NO_LINE_BREAKS_FLAGS }), r;
  }
  function Qf(t) {
    const e = {}, n = Re(t);
    return L(n, (r) => {
      const s = t[r];
      if (C(s)) e[r] = [];
      else throw Error("non exhaustive match");
    }), e;
  }
  function ua(t) {
    const e = t.PATTERN;
    if (Ze(e)) return false;
    if (et(e)) return true;
    if (_(e, "exec")) return true;
    if (oe(e)) return false;
    throw Error("non exhaustive match");
  }
  function ep(t) {
    return oe(t) && t.length === 1 ? t.charCodeAt(0) : false;
  }
  const tp = { test: function(t) {
    const e = t.length;
    for (let n = this.lastIndex; n < e; n++) {
      const r = t.charCodeAt(n);
      if (r === 10) return this.lastIndex = n + 1, true;
      if (r === 13) return t.charCodeAt(n + 1) === 10 ? this.lastIndex = n + 2 : this.lastIndex = n + 1, true;
    }
    return false;
  }, lastIndex: 0 };
  function ha(t, e) {
    if (_(t, "LINE_BREAKS")) return false;
    if (Ze(t.PATTERN)) {
      try {
        cs(e, t.PATTERN);
      } catch (n) {
        return { issue: W.IDENTIFY_TERMINATOR, errMsg: n.message };
      }
      return false;
    } else {
      if (oe(t.PATTERN)) return false;
      if (ua(t)) return { issue: W.CUSTOM_LINE_BREAK };
      throw Error("non exhaustive match");
    }
  }
  function np(t, e) {
    if (e.issue === W.IDENTIFY_TERMINATOR) return `Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${t.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;
    if (e.issue === W.CUSTOM_LINE_BREAK) return `Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${t.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;
    throw Error("non exhaustive match");
  }
  function da(t) {
    return S(t, (n) => oe(n) ? n.charCodeAt(0) : n);
  }
  function fr(t, e, n) {
    t[e] === void 0 ? t[e] = [n] : t[e].push(n);
  }
  const Wt = 256;
  let _n = [];
  function at(t) {
    return t < Wt ? t : _n[t];
  }
  function rp() {
    if (U(_n)) {
      _n = new Array(65536);
      for (let t = 0; t < 65536; t++) _n[t] = t > 255 ? 255 + ~~(t / 255) : t;
    }
  }
  function ln(t, e) {
    const n = t.tokenTypeIdx;
    return n === e.tokenTypeIdx ? true : e.isParent === true && e.categoryMatchesMap[n] === true;
  }
  function Un(t, e) {
    return t.tokenTypeIdx === e.tokenTypeIdx;
  }
  let ii = 1;
  const fa = {};
  function un(t) {
    const e = sp(t);
    ip(e), op(e), ap(e), L(e, (n) => {
      n.isParent = n.categoryMatches.length > 0;
    });
  }
  function sp(t) {
    let e = Z(t), n = t, r = true;
    for (; r; ) {
      n = on(be(S(n, (i) => i.CATEGORIES)));
      const s = Qn(n, e);
      e = e.concat(s), U(s) ? r = false : n = s;
    }
    return e;
  }
  function ip(t) {
    L(t, (e) => {
      ma(e) || (fa[ii] = e, e.tokenTypeIdx = ii++), ai(e) && !C(e.CATEGORIES) && (e.CATEGORIES = [e.CATEGORIES]), ai(e) || (e.CATEGORIES = []), cp(e) || (e.categoryMatches = []), lp(e) || (e.categoryMatchesMap = {});
    });
  }
  function ap(t) {
    L(t, (e) => {
      e.categoryMatches = [], L(e.categoryMatchesMap, (n, r) => {
        e.categoryMatches.push(fa[r].tokenTypeIdx);
      });
    });
  }
  function op(t) {
    L(t, (e) => {
      pa([], e);
    });
  }
  function pa(t, e) {
    L(t, (n) => {
      e.categoryMatchesMap[n.tokenTypeIdx] = true;
    }), L(e.CATEGORIES, (n) => {
      const r = t.concat(e);
      re(r, n) || pa(r, n);
    });
  }
  function ma(t) {
    return _(t, "tokenTypeIdx");
  }
  function ai(t) {
    return _(t, "CATEGORIES");
  }
  function cp(t) {
    return _(t, "categoryMatches");
  }
  function lp(t) {
    return _(t, "categoryMatchesMap");
  }
  function up(t) {
    return _(t, "tokenTypeIdx");
  }
  const hp = { buildUnableToPopLexerModeMessage(t) {
    return `Unable to pop Lexer Mode after encountering Token ->${t.image}<- The Mode Stack is empty`;
  }, buildUnexpectedCharactersMessage(t, e, n, r, s, i) {
    return `unexpected character: ->${t.charAt(e)}<- at offset: ${e}, skipped ${n} characters.`;
  } };
  var W;
  (function(t) {
    t[t.MISSING_PATTERN = 0] = "MISSING_PATTERN", t[t.INVALID_PATTERN = 1] = "INVALID_PATTERN", t[t.EOI_ANCHOR_FOUND = 2] = "EOI_ANCHOR_FOUND", t[t.UNSUPPORTED_FLAGS_FOUND = 3] = "UNSUPPORTED_FLAGS_FOUND", t[t.DUPLICATE_PATTERNS_FOUND = 4] = "DUPLICATE_PATTERNS_FOUND", t[t.INVALID_GROUP_TYPE_FOUND = 5] = "INVALID_GROUP_TYPE_FOUND", t[t.PUSH_MODE_DOES_NOT_EXIST = 6] = "PUSH_MODE_DOES_NOT_EXIST", t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE", t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY", t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST", t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED", t[t.SOI_ANCHOR_FOUND = 11] = "SOI_ANCHOR_FOUND", t[t.EMPTY_MATCH_PATTERN = 12] = "EMPTY_MATCH_PATTERN", t[t.NO_LINE_BREAKS_FLAGS = 13] = "NO_LINE_BREAKS_FLAGS", t[t.UNREACHABLE_PATTERN = 14] = "UNREACHABLE_PATTERN", t[t.IDENTIFY_TERMINATOR = 15] = "IDENTIFY_TERMINATOR", t[t.CUSTOM_LINE_BREAK = 16] = "CUSTOM_LINE_BREAK", t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE = 17] = "MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE";
  })(W || (W = {}));
  const Kt = { deferDefinitionErrorsHandling: false, positionTracking: "full", lineTerminatorsPattern: /\n|\r\n?/g, lineTerminatorCharacters: [`
`, "\r"], ensureOptimizations: false, safeMode: false, errorMessageProvider: hp, traceInitPerf: false, skipValidations: false, recoveryEnabled: true };
  Object.freeze(Kt);
  class X {
    constructor(e, n = Kt) {
      if (this.lexerDefinition = e, this.lexerDefinitionErrors = [], this.lexerDefinitionWarning = [], this.patternIdxToConfig = {}, this.charCodeToPatternIdxToConfig = {}, this.modes = [], this.emptyGroups = {}, this.trackStartLines = true, this.trackEndLines = true, this.hasCustom = false, this.canModeBeOptimized = {}, this.TRACE_INIT = (s, i) => {
        if (this.traceInitPerf === true) {
          this.traceInitIndent++;
          const a = new Array(this.traceInitIndent + 1).join("	");
          this.traceInitIndent < this.traceInitMaxIdent && console.log(`${a}--> <${s}>`);
          const { time: o, value: c } = aa(i), l = o > 10 ? console.warn : console.log;
          return this.traceInitIndent < this.traceInitMaxIdent && l(`${a}<-- <${s}> time: ${o}ms`), this.traceInitIndent--, c;
        } else return i();
      }, typeof n == "boolean") throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);
      this.config = de({}, Kt, n);
      const r = this.config.traceInitPerf;
      r === true ? (this.traceInitMaxIdent = 1 / 0, this.traceInitPerf = true) : typeof r == "number" && (this.traceInitMaxIdent = r, this.traceInitPerf = true), this.traceInitIndent = -1, this.TRACE_INIT("Lexer Constructor", () => {
        let s, i = true;
        this.TRACE_INIT("Lexer Config handling", () => {
          if (this.config.lineTerminatorsPattern === Kt.lineTerminatorsPattern) this.config.lineTerminatorsPattern = tp;
          else if (this.config.lineTerminatorCharacters === Kt.lineTerminatorCharacters) throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);
          if (n.safeMode && n.ensureOptimizations) throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');
          this.trackStartLines = /full|onlyStart/i.test(this.config.positionTracking), this.trackEndLines = /full/i.test(this.config.positionTracking), C(e) ? s = { modes: { defaultMode: Z(e) }, defaultMode: Gt } : (i = false, s = Z(e));
        }), this.config.skipValidations === false && (this.TRACE_INIT("performRuntimeChecks", () => {
          this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(Zf(s, this.trackStartLines, this.config.lineTerminatorCharacters));
        }), this.TRACE_INIT("performWarningRuntimeChecks", () => {
          this.lexerDefinitionWarning = this.lexerDefinitionWarning.concat(Jf(s, this.trackStartLines, this.config.lineTerminatorCharacters));
        })), s.modes = s.modes ? s.modes : {}, L(s.modes, (o, c) => {
          s.modes[c] = er(o, (l) => Je(l));
        });
        const a = Re(s.modes);
        if (L(s.modes, (o, c) => {
          this.TRACE_INIT(`Mode: <${c}> processing`, () => {
            if (this.modes.push(c), this.config.skipValidations === false && this.TRACE_INIT("validatePatterns", () => {
              this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(Mf(o, a));
            }), U(this.lexerDefinitionErrors)) {
              un(o);
              let l;
              this.TRACE_INIT("analyzeTokenTypes", () => {
                l = xf(o, { lineTerminatorCharacters: this.config.lineTerminatorCharacters, positionTracking: n.positionTracking, ensureOptimizations: n.ensureOptimizations, safeMode: n.safeMode, tracer: this.TRACE_INIT });
              }), this.patternIdxToConfig[c] = l.patternIdxToConfig, this.charCodeToPatternIdxToConfig[c] = l.charCodeToPatternIdxToConfig, this.emptyGroups = de({}, this.emptyGroups, l.emptyGroups), this.hasCustom = l.hasCustom || this.hasCustom, this.canModeBeOptimized[c] = l.canBeOptimized;
            }
          });
        }), this.defaultMode = s.defaultMode, !U(this.lexerDefinitionErrors) && !this.config.deferDefinitionErrorsHandling) {
          const c = S(this.lexerDefinitionErrors, (l) => l.message).join(`-----------------------
`);
          throw new Error(`Errors detected in definition of Lexer:
` + c);
        }
        L(this.lexerDefinitionWarning, (o) => {
          ia(o.message);
        }), this.TRACE_INIT("Choosing sub-methods implementations", () => {
          if (i && (this.handleModes = z), this.trackStartLines === false && (this.computeNewColumn = nn), this.trackEndLines === false && (this.updateTokenEndLineColumnLocation = z), /full/i.test(this.config.positionTracking)) this.createTokenInstance = this.createFullToken;
          else if (/onlyStart/i.test(this.config.positionTracking)) this.createTokenInstance = this.createStartOnlyToken;
          else if (/onlyOffset/i.test(this.config.positionTracking)) this.createTokenInstance = this.createOffsetOnlyToken;
          else throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);
          this.hasCustom ? (this.addToken = this.addTokenUsingPush, this.handlePayload = this.handlePayloadWithCustom) : (this.addToken = this.addTokenUsingMemberAccess, this.handlePayload = this.handlePayloadNoCustom);
        }), this.TRACE_INIT("Failed Optimization Warnings", () => {
          const o = fe(this.canModeBeOptimized, (c, l, u) => (l === false && c.push(u), c), []);
          if (n.ensureOptimizations && !U(o)) throw Error(`Lexer Modes: < ${o.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`);
        }), this.TRACE_INIT("clearRegExpParserCache", () => {
          kf();
        }), this.TRACE_INIT("toFastProperties", () => {
          oa(this);
        });
      });
    }
    tokenize(e, n = this.defaultMode) {
      if (!U(this.lexerDefinitionErrors)) {
        const s = S(this.lexerDefinitionErrors, (i) => i.message).join(`-----------------------
`);
        throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
` + s);
      }
      return this.tokenizeInternal(e, n);
    }
    tokenizeInternal(e, n) {
      let r, s, i, a, o, c, l, u, h, d, p, f, y, R, E;
      const m = e, g = m.length;
      let T = 0, x = 0;
      const le = this.hasCustom ? 0 : Math.floor(e.length / 10), Pe = new Array(le), Ve = [];
      let lt = this.trackStartLines ? 1 : void 0, Ie = this.trackStartLines ? 1 : void 0;
      const O = Qf(this.emptyGroups), M = this.trackStartLines, Ue = this.config.lineTerminatorsPattern;
      let Ye = 0, $e = [], Pt = [];
      const Ut = [], Es = [];
      Object.freeze(Es);
      let $t = false;
      const Mo = (se) => {
        if (Ut.length === 1 && se.tokenType.PUSH_MODE === void 0) {
          const me = this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(se);
          Ve.push({ offset: se.startOffset, line: se.startLine, column: se.startColumn, length: se.image.length, message: me });
        } else {
          Ut.pop();
          const me = Tt(Ut);
          $e = this.patternIdxToConfig[me], Pt = this.charCodeToPatternIdxToConfig[me], Ye = $e.length;
          const or = this.canModeBeOptimized[me] && this.config.safeMode === false;
          Pt && or ? $t = true : $t = false;
        }
      };
      function Ts(se) {
        Ut.push(se), Pt = this.charCodeToPatternIdxToConfig[se], $e = this.patternIdxToConfig[se], Ye = $e.length, Ye = $e.length;
        const me = this.canModeBeOptimized[se] && this.config.safeMode === false;
        Pt && me ? $t = true : $t = false;
      }
      Ts.call(this, n);
      let Oe;
      const ys = this.config.recoveryEnabled;
      for (; T < g; ) {
        c = null, h = -1;
        const se = m.charCodeAt(T);
        let me;
        if ($t) {
          const ee = at(se), ge = Pt[ee];
          me = ge !== void 0 ? ge : Es;
        } else me = $e;
        const or = me.length;
        for (r = 0; r < or; r++) {
          Oe = me[r];
          const ee = Oe.pattern;
          l = null;
          const ge = Oe.short;
          if (ge !== false ? se === ge && (h = 1, c = ee) : Oe.isCustom === true ? (E = ee.exec(m, T, Pe, O), E !== null ? (c = E[0], h = c.length, E.payload !== void 0 && (l = E.payload)) : c = null) : (ee.lastIndex = T, h = this.matchLength(ee, e, T)), h !== -1) {
            if (o = Oe.longerAlt, o !== void 0) {
              c = e.substring(T, T + h);
              const rt = o.length;
              for (i = 0; i < rt; i++) {
                const Xe = $e[o[i]], ut = Xe.pattern;
                if (u = null, Xe.isCustom === true ? (E = ut.exec(m, T, Pe, O), E !== null ? (a = E[0], E.payload !== void 0 && (u = E.payload)) : a = null) : (ut.lastIndex = T, a = this.match(ut, e, T)), a && a.length > c.length) {
                  c = a, h = a.length, l = u, Oe = Xe;
                  break;
                }
              }
            }
            break;
          }
        }
        if (h !== -1) {
          if (d = Oe.group, d !== void 0 && (c = c !== null ? c : e.substring(T, T + h), p = Oe.tokenTypeIdx, f = this.createTokenInstance(c, T, p, Oe.tokenType, lt, Ie, h), this.handlePayload(f, l), d === false ? x = this.addToken(Pe, x, f) : O[d].push(f)), M === true && Oe.canLineTerminator === true) {
            let ee = 0, ge, rt;
            Ue.lastIndex = 0;
            do
              c = c !== null ? c : e.substring(T, T + h), ge = Ue.test(c), ge === true && (rt = Ue.lastIndex - 1, ee++);
            while (ge === true);
            ee !== 0 ? (lt = lt + ee, Ie = h - rt, this.updateTokenEndLineColumnLocation(f, d, rt, ee, lt, Ie, h)) : Ie = this.computeNewColumn(Ie, h);
          } else Ie = this.computeNewColumn(Ie, h);
          T = T + h, this.handleModes(Oe, Mo, Ts, f);
        } else {
          const ee = T, ge = lt, rt = Ie;
          let Xe = ys === false;
          for (; Xe === false && T < g; ) for (T++, s = 0; s < Ye; s++) {
            const ut = $e[s], cr = ut.pattern, As = ut.short;
            if (As !== false ? m.charCodeAt(T) === As && (Xe = true) : ut.isCustom === true ? Xe = cr.exec(m, T, Pe, O) !== null : (cr.lastIndex = T, Xe = cr.exec(e) !== null), Xe === true) break;
          }
          if (y = T - ee, Ie = this.computeNewColumn(Ie, y), R = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(m, ee, y, ge, rt, Tt(Ut)), Ve.push({ offset: ee, line: ge, column: rt, length: y, message: R }), ys === false) break;
        }
      }
      return this.hasCustom || (Pe.length = x), { tokens: Pe, groups: O, errors: Ve };
    }
    handleModes(e, n, r, s) {
      if (e.pop === true) {
        const i = e.push;
        n(s), i !== void 0 && r.call(this, i);
      } else e.push !== void 0 && r.call(this, e.push);
    }
    updateTokenEndLineColumnLocation(e, n, r, s, i, a, o) {
      let c, l;
      n !== void 0 && (c = r === o - 1, l = c ? -1 : 0, s === 1 && c === true || (e.endLine = i + l, e.endColumn = a - 1 + -l));
    }
    computeNewColumn(e, n) {
      return e + n;
    }
    createOffsetOnlyToken(e, n, r, s) {
      return { image: e, startOffset: n, tokenTypeIdx: r, tokenType: s };
    }
    createStartOnlyToken(e, n, r, s, i, a) {
      return { image: e, startOffset: n, startLine: i, startColumn: a, tokenTypeIdx: r, tokenType: s };
    }
    createFullToken(e, n, r, s, i, a, o) {
      return { image: e, startOffset: n, endOffset: n + o - 1, startLine: i, endLine: i, startColumn: a, endColumn: a + o - 1, tokenTypeIdx: r, tokenType: s };
    }
    addTokenUsingPush(e, n, r) {
      return e.push(r), n;
    }
    addTokenUsingMemberAccess(e, n, r) {
      return e[n] = r, n++, n;
    }
    handlePayloadNoCustom(e, n) {
    }
    handlePayloadWithCustom(e, n) {
      n !== null && (e.payload = n);
    }
    match(e, n, r) {
      return e.test(n) === true ? n.substring(r, e.lastIndex) : null;
    }
    matchLength(e, n, r) {
      return e.test(n) === true ? e.lastIndex - r : -1;
    }
  }
  X.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it will be consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";
  X.NA = /NOT_APPLICABLE/;
  function Xt(t) {
    return ga(t) ? t.LABEL : t.name;
  }
  function ga(t) {
    return oe(t.LABEL) && t.LABEL !== "";
  }
  const dp = "parent", oi = "categories", ci = "label", li = "group", ui = "push_mode", hi = "pop_mode", di = "longer_alt", fi = "line_breaks", pi = "start_chars_hint";
  function A(t) {
    return fp(t);
  }
  function fp(t) {
    const e = t.pattern, n = {};
    if (n.name = t.name, Je(e) || (n.PATTERN = e), _(t, dp)) throw `The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;
    return _(t, oi) && (n.CATEGORIES = t[oi]), un([n]), _(t, ci) && (n.LABEL = t[ci]), _(t, li) && (n.GROUP = t[li]), _(t, hi) && (n.POP_MODE = t[hi]), _(t, ui) && (n.PUSH_MODE = t[ui]), _(t, di) && (n.LONGER_ALT = t[di]), _(t, fi) && (n.LINE_BREAKS = t[fi]), _(t, pi) && (n.START_CHARS_HINT = t[pi]), n;
  }
  const At = A({ name: "EOF", pattern: X.NA });
  un([At]);
  function ls(t, e, n, r, s, i, a, o) {
    return { image: e, startOffset: n, endOffset: r, startLine: s, endLine: i, startColumn: a, endColumn: o, tokenTypeIdx: t.tokenTypeIdx, tokenType: t };
  }
  function pp(t, e) {
    return ln(t, e);
  }
  const Ea = { buildMismatchTokenMessage({ expected: t, actual: e, previous: n, ruleName: r }) {
    return `Expecting ${ga(t) ? `--> ${Xt(t)} <--` : `token of type --> ${t.name} <--`} but found --> '${e.image}' <--`;
  }, buildNotAllInputParsedMessage({ firstRedundant: t, ruleName: e }) {
    return "Redundant input, expecting EOF but found: " + t.image;
  }, buildNoViableAltMessage({ expectedPathsPerAlt: t, actual: e, previous: n, customUserDescription: r, ruleName: s }) {
    const i = "Expecting: ", o = `
but found: '` + ve(e).image + "'";
    if (r) return i + r + o;
    {
      const c = fe(t, (d, p) => d.concat(p), []), l = S(c, (d) => `[${S(d, (p) => Xt(p)).join(", ")}]`), h = `one of these possible Token sequences:
${S(l, (d, p) => `  ${p + 1}. ${d}`).join(`
`)}`;
      return i + h + o;
    }
  }, buildEarlyExitMessage({ expectedIterationPaths: t, actual: e, customUserDescription: n, ruleName: r }) {
    const s = "Expecting: ", a = `
but found: '` + ve(e).image + "'";
    if (n) return s + n + a;
    {
      const c = `expecting at least one iteration which starts with one of these possible Token sequences::
  <${S(t, (l) => `[${S(l, (u) => Xt(u)).join(",")}]`).join(" ,")}>`;
      return s + c + a;
    }
  } };
  Object.freeze(Ea);
  const mp = { buildRuleNotFoundError(t, e) {
    return "Invalid grammar, reference to a rule which is not defined: ->" + e.nonTerminalName + `<-
inside top level rule: ->` + t.name + "<-";
  } }, pt = { buildDuplicateFoundError(t, e) {
    function n(u) {
      return u instanceof D ? u.terminalType.name : u instanceof pe ? u.nonTerminalName : "";
    }
    const r = t.name, s = ve(e), i = s.idx, a = Fe(s), o = n(s), c = i > 0;
    let l = `->${a}${c ? i : ""}<- ${o ? `with argument: ->${o}<-` : ""}
                  appears more than once (${e.length} times) in the top level rule: ->${r}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;
    return l = l.replace(/[ \t]+/g, " "), l = l.replace(/\s\s+/g, `
`), l;
  }, buildNamespaceConflictError(t) {
    return `Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${t.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;
  }, buildAlternationPrefixAmbiguityError(t) {
    const e = S(t.prefixPath, (s) => Xt(s)).join(", "), n = t.alternation.idx === 0 ? "" : t.alternation.idx;
    return `Ambiguous alternatives: <${t.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${n}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;
  }, buildAlternationAmbiguityError(t) {
    const e = t.alternation.idx === 0 ? "" : t.alternation.idx, n = t.prefixPath.length === 0;
    let r = `Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(" ,")}> in <OR${e}> inside <${t.topLevelRule.name}> Rule,
`;
    if (n) r += `These alternatives are all empty (match no tokens), making them indistinguishable.
Only the last alternative may be empty.
`;
    else {
      const s = S(t.prefixPath, (i) => Xt(i)).join(", ");
      r += `<${s}> may appears as a prefix path in all these alternatives.
`;
    }
    return r += `See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`, r;
  }, buildEmptyRepetitionError(t) {
    let e = Fe(t.repetition);
    return t.repetition.idx !== 0 && (e += t.repetition.idx), `The repetition <${e}> within Rule <${t.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`;
  }, buildTokenNameError(t) {
    return "deprecated";
  }, buildEmptyAlternationError(t) {
    return `Ambiguous empty alternative: <${t.emptyChoiceIdx + 1}> in <OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`;
  }, buildTooManyAlternativesError(t) {
    return `An Alternation cannot have more than 256 alternatives:
<OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
 has ${t.alternation.definition.length + 1} alternatives.`;
  }, buildLeftRecursionError(t) {
    const e = t.topLevelRule.name, n = S(t.leftRecursionPath, (i) => i.name), r = `${e} --> ${n.concat([e]).join(" --> ")}`;
    return `Left Recursion found in grammar.
rule: <${e}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${r}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;
  }, buildInvalidRuleNameError(t) {
    return "deprecated";
  }, buildDuplicateRuleNameError(t) {
    let e;
    return t.topLevelRule instanceof xt ? e = t.topLevelRule.name : e = t.topLevelRule, `Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${t.grammarName}<-`;
  } };
  function gp(t, e) {
    const n = new Ep(t, e);
    return n.resolveRefs(), n.errors;
  }
  class Ep extends Mt {
    constructor(e, n) {
      super(), this.nameToTopRule = e, this.errMsgProvider = n, this.errors = [];
    }
    resolveRefs() {
      L(K(this.nameToTopRule), (e) => {
        this.currTopLevel = e, e.accept(this);
      });
    }
    visitNonTerminal(e) {
      const n = this.nameToTopRule[e.nonTerminalName];
      if (n) e.referencedRule = n;
      else {
        const r = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, e);
        this.errors.push({ message: r, type: ne.UNRESOLVED_SUBRULE_REF, ruleName: this.currTopLevel.name, unresolvedRefName: e.nonTerminalName });
      }
    }
  }
  class Tp extends tr {
    constructor(e, n) {
      super(), this.topProd = e, this.path = n, this.possibleTokTypes = [], this.nextProductionName = "", this.nextProductionOccurrence = 0, this.found = false, this.isAtEndOfPath = false;
    }
    startWalking() {
      if (this.found = false, this.path.ruleStack[0] !== this.topProd.name) throw Error("The path does not start with the walker's top Rule!");
      return this.ruleStack = Z(this.path.ruleStack).reverse(), this.occurrenceStack = Z(this.path.occurrenceStack).reverse(), this.ruleStack.pop(), this.occurrenceStack.pop(), this.updateExpectedNext(), this.walk(this.topProd), this.possibleTokTypes;
    }
    walk(e, n = []) {
      this.found || super.walk(e, n);
    }
    walkProdRef(e, n, r) {
      if (e.referencedRule.name === this.nextProductionName && e.idx === this.nextProductionOccurrence) {
        const s = n.concat(r);
        this.updateExpectedNext(), this.walk(e.referencedRule, s);
      }
    }
    updateExpectedNext() {
      U(this.ruleStack) ? (this.nextProductionName = "", this.nextProductionOccurrence = 0, this.isAtEndOfPath = true) : (this.nextProductionName = this.ruleStack.pop(), this.nextProductionOccurrence = this.occurrenceStack.pop());
    }
  }
  class yp extends Tp {
    constructor(e, n) {
      super(e, n), this.path = n, this.nextTerminalName = "", this.nextTerminalOccurrence = 0, this.nextTerminalName = this.path.lastTok.name, this.nextTerminalOccurrence = this.path.lastTokOccurrence;
    }
    walkTerminal(e, n, r) {
      if (this.isAtEndOfPath && e.terminalType.name === this.nextTerminalName && e.idx === this.nextTerminalOccurrence && !this.found) {
        const s = n.concat(r), i = new ce({ definition: s });
        this.possibleTokTypes = cn(i), this.found = true;
      }
    }
  }
  class rr extends tr {
    constructor(e, n) {
      super(), this.topRule = e, this.occurrence = n, this.result = { token: void 0, occurrence: void 0, isEndOfRule: void 0 };
    }
    startWalking() {
      return this.walk(this.topRule), this.result;
    }
  }
  class Ap extends rr {
    walkMany(e, n, r) {
      if (e.idx === this.occurrence) {
        const s = ve(n.concat(r));
        this.result.isEndOfRule = s === void 0, s instanceof D && (this.result.token = s.terminalType, this.result.occurrence = s.idx);
      } else super.walkMany(e, n, r);
    }
  }
  class mi extends rr {
    walkManySep(e, n, r) {
      if (e.idx === this.occurrence) {
        const s = ve(n.concat(r));
        this.result.isEndOfRule = s === void 0, s instanceof D && (this.result.token = s.terminalType, this.result.occurrence = s.idx);
      } else super.walkManySep(e, n, r);
    }
  }
  class Sp extends rr {
    walkAtLeastOne(e, n, r) {
      if (e.idx === this.occurrence) {
        const s = ve(n.concat(r));
        this.result.isEndOfRule = s === void 0, s instanceof D && (this.result.token = s.terminalType, this.result.occurrence = s.idx);
      } else super.walkAtLeastOne(e, n, r);
    }
  }
  class gi extends rr {
    walkAtLeastOneSep(e, n, r) {
      if (e.idx === this.occurrence) {
        const s = ve(n.concat(r));
        this.result.isEndOfRule = s === void 0, s instanceof D && (this.result.token = s.terminalType, this.result.occurrence = s.idx);
      } else super.walkAtLeastOneSep(e, n, r);
    }
  }
  function Nr(t, e, n = []) {
    n = Z(n);
    let r = [], s = 0;
    function i(o) {
      return o.concat(Y(t, s + 1));
    }
    function a(o) {
      const c = Nr(i(o), e, n);
      return r.concat(c);
    }
    for (; n.length < e && s < t.length; ) {
      const o = t[s];
      if (o instanceof ce) return a(o.definition);
      if (o instanceof pe) return a(o.definition);
      if (o instanceof ae) r = a(o.definition);
      else if (o instanceof ze) {
        const c = o.definition.concat([new H({ definition: o.definition })]);
        return a(c);
      } else if (o instanceof qe) {
        const c = [new ce({ definition: o.definition }), new H({ definition: [new D({ terminalType: o.separator })].concat(o.definition) })];
        return a(c);
      } else if (o instanceof xe) {
        const c = o.definition.concat([new H({ definition: [new D({ terminalType: o.separator })].concat(o.definition) })]);
        r = a(c);
      } else if (o instanceof H) {
        const c = o.definition.concat([new H({ definition: o.definition })]);
        r = a(c);
      } else {
        if (o instanceof Me) return L(o.definition, (c) => {
          U(c.definition) === false && (r = a(c.definition));
        }), r;
        if (o instanceof D) n.push(o.terminalType);
        else throw Error("non exhaustive match");
      }
      s++;
    }
    return r.push({ partialPath: n, suffixDef: Y(t, s) }), r;
  }
  function Ta(t, e, n, r) {
    const s = "EXIT_NONE_TERMINAL", i = [s], a = "EXIT_ALTERNATIVE";
    let o = false;
    const c = e.length, l = c - r - 1, u = [], h = [];
    for (h.push({ idx: -1, def: t, ruleStack: [], occurrenceStack: [] }); !U(h); ) {
      const d = h.pop();
      if (d === a) {
        o && Tt(h).idx <= l && h.pop();
        continue;
      }
      const p = d.def, f = d.idx, y = d.ruleStack, R = d.occurrenceStack;
      if (U(p)) continue;
      const E = p[0];
      if (E === s) {
        const m = { idx: f, def: Y(p), ruleStack: tn(y), occurrenceStack: tn(R) };
        h.push(m);
      } else if (E instanceof D) if (f < c - 1) {
        const m = f + 1, g = e[m];
        if (n(g, E.terminalType)) {
          const T = { idx: m, def: Y(p), ruleStack: y, occurrenceStack: R };
          h.push(T);
        }
      } else if (f === c - 1) u.push({ nextTokenType: E.terminalType, nextTokenOccurrence: E.idx, ruleStack: y, occurrenceStack: R }), o = true;
      else throw Error("non exhaustive match");
      else if (E instanceof pe) {
        const m = Z(y);
        m.push(E.nonTerminalName);
        const g = Z(R);
        g.push(E.idx);
        const T = { idx: f, def: E.definition.concat(i, Y(p)), ruleStack: m, occurrenceStack: g };
        h.push(T);
      } else if (E instanceof ae) {
        const m = { idx: f, def: Y(p), ruleStack: y, occurrenceStack: R };
        h.push(m), h.push(a);
        const g = { idx: f, def: E.definition.concat(Y(p)), ruleStack: y, occurrenceStack: R };
        h.push(g);
      } else if (E instanceof ze) {
        const m = new H({ definition: E.definition, idx: E.idx }), g = E.definition.concat([m], Y(p)), T = { idx: f, def: g, ruleStack: y, occurrenceStack: R };
        h.push(T);
      } else if (E instanceof qe) {
        const m = new D({ terminalType: E.separator }), g = new H({ definition: [m].concat(E.definition), idx: E.idx }), T = E.definition.concat([g], Y(p)), x = { idx: f, def: T, ruleStack: y, occurrenceStack: R };
        h.push(x);
      } else if (E instanceof xe) {
        const m = { idx: f, def: Y(p), ruleStack: y, occurrenceStack: R };
        h.push(m), h.push(a);
        const g = new D({ terminalType: E.separator }), T = new H({ definition: [g].concat(E.definition), idx: E.idx }), x = E.definition.concat([T], Y(p)), le = { idx: f, def: x, ruleStack: y, occurrenceStack: R };
        h.push(le);
      } else if (E instanceof H) {
        const m = { idx: f, def: Y(p), ruleStack: y, occurrenceStack: R };
        h.push(m), h.push(a);
        const g = new H({ definition: E.definition, idx: E.idx }), T = E.definition.concat([g], Y(p)), x = { idx: f, def: T, ruleStack: y, occurrenceStack: R };
        h.push(x);
      } else if (E instanceof Me) for (let m = E.definition.length - 1; m >= 0; m--) {
        const g = E.definition[m], T = { idx: f, def: g.definition.concat(Y(p)), ruleStack: y, occurrenceStack: R };
        h.push(T), h.push(a);
      }
      else if (E instanceof ce) h.push({ idx: f, def: E.definition.concat(Y(p)), ruleStack: y, occurrenceStack: R });
      else if (E instanceof xt) h.push(_p(E, f, y, R));
      else throw Error("non exhaustive match");
    }
    return u;
  }
  function _p(t, e, n, r) {
    const s = Z(n);
    s.push(t.name);
    const i = Z(r);
    return i.push(1), { idx: e, def: t.definition, ruleStack: s, occurrenceStack: i };
  }
  var G;
  (function(t) {
    t[t.OPTION = 0] = "OPTION", t[t.REPETITION = 1] = "REPETITION", t[t.REPETITION_MANDATORY = 2] = "REPETITION_MANDATORY", t[t.REPETITION_MANDATORY_WITH_SEPARATOR = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR", t[t.REPETITION_WITH_SEPARATOR = 4] = "REPETITION_WITH_SEPARATOR", t[t.ALTERNATION = 5] = "ALTERNATION";
  })(G || (G = {}));
  function ya(t) {
    if (t instanceof ae || t === "Option") return G.OPTION;
    if (t instanceof H || t === "Repetition") return G.REPETITION;
    if (t instanceof ze || t === "RepetitionMandatory") return G.REPETITION_MANDATORY;
    if (t instanceof qe || t === "RepetitionMandatoryWithSeparator") return G.REPETITION_MANDATORY_WITH_SEPARATOR;
    if (t instanceof xe || t === "RepetitionWithSeparator") return G.REPETITION_WITH_SEPARATOR;
    if (t instanceof Me || t === "Alternation") return G.ALTERNATION;
    throw Error("non exhaustive match");
  }
  function Rp(t, e, n, r, s, i) {
    const a = us(t, e, n), o = _a(a) ? Un : ln;
    return i(a, r, o, s);
  }
  function Lp(t, e, n, r, s, i) {
    const a = hs(t, e, s, n), o = _a(a) ? Un : ln;
    return i(a[0], o, r);
  }
  function Ip(t, e, n, r) {
    const s = t.length, i = ke(t, (a) => ke(a, (o) => o.length === 1));
    if (e) return function(a) {
      const o = S(a, (c) => c.GATE);
      for (let c = 0; c < s; c++) {
        const l = t[c], u = l.length, h = o[c];
        if (!(h !== void 0 && h.call(this) === false)) e: for (let d = 0; d < u; d++) {
          const p = l[d], f = p.length;
          for (let y = 0; y < f; y++) {
            const R = this.LA(y + 1);
            if (n(R, p[y]) === false) continue e;
          }
          return c;
        }
      }
    };
    if (i && !r) {
      const a = S(t, (c) => be(c)), o = fe(a, (c, l, u) => (L(l, (h) => {
        _(c, h.tokenTypeIdx) || (c[h.tokenTypeIdx] = u), L(h.categoryMatches, (d) => {
          _(c, d) || (c[d] = u);
        });
      }), c), {});
      return function() {
        const c = this.LA(1);
        return o[c.tokenTypeIdx];
      };
    } else return function() {
      for (let a = 0; a < s; a++) {
        const o = t[a], c = o.length;
        e: for (let l = 0; l < c; l++) {
          const u = o[l], h = u.length;
          for (let d = 0; d < h; d++) {
            const p = this.LA(d + 1);
            if (n(p, u[d]) === false) continue e;
          }
          return a;
        }
      }
    };
  }
  function Op(t, e, n) {
    const r = ke(t, (i) => i.length === 1), s = t.length;
    if (r && !n) {
      const i = be(t);
      if (i.length === 1 && U(i[0].categoryMatches)) {
        const o = i[0].tokenTypeIdx;
        return function() {
          return this.LA(1).tokenTypeIdx === o;
        };
      } else {
        const a = fe(i, (o, c, l) => (o[c.tokenTypeIdx] = true, L(c.categoryMatches, (u) => {
          o[u] = true;
        }), o), []);
        return function() {
          const o = this.LA(1);
          return a[o.tokenTypeIdx] === true;
        };
      }
    } else return function() {
      e: for (let i = 0; i < s; i++) {
        const a = t[i], o = a.length;
        for (let c = 0; c < o; c++) {
          const l = this.LA(c + 1);
          if (e(l, a[c]) === false) continue e;
        }
        return true;
      }
      return false;
    };
  }
  class Np extends tr {
    constructor(e, n, r) {
      super(), this.topProd = e, this.targetOccurrence = n, this.targetProdType = r;
    }
    startWalking() {
      return this.walk(this.topProd), this.restDef;
    }
    checkIsTarget(e, n, r, s) {
      return e.idx === this.targetOccurrence && this.targetProdType === n ? (this.restDef = r.concat(s), true) : false;
    }
    walkOption(e, n, r) {
      this.checkIsTarget(e, G.OPTION, n, r) || super.walkOption(e, n, r);
    }
    walkAtLeastOne(e, n, r) {
      this.checkIsTarget(e, G.REPETITION_MANDATORY, n, r) || super.walkOption(e, n, r);
    }
    walkAtLeastOneSep(e, n, r) {
      this.checkIsTarget(e, G.REPETITION_MANDATORY_WITH_SEPARATOR, n, r) || super.walkOption(e, n, r);
    }
    walkMany(e, n, r) {
      this.checkIsTarget(e, G.REPETITION, n, r) || super.walkOption(e, n, r);
    }
    walkManySep(e, n, r) {
      this.checkIsTarget(e, G.REPETITION_WITH_SEPARATOR, n, r) || super.walkOption(e, n, r);
    }
  }
  class Aa extends Mt {
    constructor(e, n, r) {
      super(), this.targetOccurrence = e, this.targetProdType = n, this.targetRef = r, this.result = [];
    }
    checkIsTarget(e, n) {
      e.idx === this.targetOccurrence && this.targetProdType === n && (this.targetRef === void 0 || e === this.targetRef) && (this.result = e.definition);
    }
    visitOption(e) {
      this.checkIsTarget(e, G.OPTION);
    }
    visitRepetition(e) {
      this.checkIsTarget(e, G.REPETITION);
    }
    visitRepetitionMandatory(e) {
      this.checkIsTarget(e, G.REPETITION_MANDATORY);
    }
    visitRepetitionMandatoryWithSeparator(e) {
      this.checkIsTarget(e, G.REPETITION_MANDATORY_WITH_SEPARATOR);
    }
    visitRepetitionWithSeparator(e) {
      this.checkIsTarget(e, G.REPETITION_WITH_SEPARATOR);
    }
    visitAlternation(e) {
      this.checkIsTarget(e, G.ALTERNATION);
    }
  }
  function Ei(t) {
    const e = new Array(t);
    for (let n = 0; n < t; n++) e[n] = [];
    return e;
  }
  function pr(t) {
    let e = [""];
    for (let n = 0; n < t.length; n++) {
      const r = t[n], s = [];
      for (let i = 0; i < e.length; i++) {
        const a = e[i];
        s.push(a + "_" + r.tokenTypeIdx);
        for (let o = 0; o < r.categoryMatches.length; o++) {
          const c = "_" + r.categoryMatches[o];
          s.push(a + c);
        }
      }
      e = s;
    }
    return e;
  }
  function bp(t, e, n) {
    for (let r = 0; r < t.length; r++) {
      if (r === n) continue;
      const s = t[r];
      for (let i = 0; i < e.length; i++) {
        const a = e[i];
        if (s[a] === true) return false;
      }
    }
    return true;
  }
  function Sa(t, e) {
    const n = S(t, (a) => Nr([a], 1)), r = Ei(n.length), s = S(n, (a) => {
      const o = {};
      return L(a, (c) => {
        const l = pr(c.partialPath);
        L(l, (u) => {
          o[u] = true;
        });
      }), o;
    });
    let i = n;
    for (let a = 1; a <= e; a++) {
      const o = i;
      i = Ei(o.length);
      for (let c = 0; c < o.length; c++) {
        const l = o[c];
        for (let u = 0; u < l.length; u++) {
          const h = l[u].partialPath, d = l[u].suffixDef, p = pr(h);
          if (bp(s, p, c) || U(d) || h.length === e) {
            const y = r[c];
            if (br(y, h) === false) {
              y.push(h);
              for (let R = 0; R < p.length; R++) {
                const E = p[R];
                s[c][E] = true;
              }
            }
          } else {
            const y = Nr(d, a + 1, h);
            i[c] = i[c].concat(y), L(y, (R) => {
              const E = pr(R.partialPath);
              L(E, (m) => {
                s[c][m] = true;
              });
            });
          }
        }
      }
    }
    return r;
  }
  function us(t, e, n, r) {
    const s = new Aa(t, G.ALTERNATION, r);
    return e.accept(s), Sa(s.result, n);
  }
  function hs(t, e, n, r) {
    const s = new Aa(t, n);
    e.accept(s);
    const i = s.result, o = new Np(e, t, n).startWalking(), c = new ce({ definition: i }), l = new ce({ definition: o });
    return Sa([c, l], r);
  }
  function br(t, e) {
    e: for (let n = 0; n < t.length; n++) {
      const r = t[n];
      if (r.length === e.length) {
        for (let s = 0; s < r.length; s++) {
          const i = e[s], a = r[s];
          if ((i === a || a.categoryMatchesMap[i.tokenTypeIdx] !== void 0) === false) continue e;
        }
        return true;
      }
    }
    return false;
  }
  function kp(t, e) {
    return t.length < e.length && ke(t, (n, r) => {
      const s = e[r];
      return n === s || s.categoryMatchesMap[n.tokenTypeIdx];
    });
  }
  function _a(t) {
    return ke(t, (e) => ke(e, (n) => ke(n, (r) => U(r.categoryMatches))));
  }
  function Cp(t) {
    const e = t.lookaheadStrategy.validate({ rules: t.rules, tokenTypes: t.tokenTypes, grammarName: t.grammarName });
    return S(e, (n) => Object.assign({ type: ne.CUSTOM_LOOKAHEAD_VALIDATION }, n));
  }
  function vp(t, e, n, r) {
    const s = Ae(t, (c) => wp(c, n)), i = Kp(t, e, n), a = Ae(t, (c) => Dp(c, n)), o = Ae(t, (c) => Pp(c, t, r, n));
    return s.concat(i, a, o);
  }
  function wp(t, e) {
    const n = new Mp();
    t.accept(n);
    const r = n.allProductions, s = Wd(r, xp), i = we(s, (o) => o.length > 1);
    return S(K(i), (o) => {
      const c = ve(o), l = e.buildDuplicateFoundError(t, o), u = Fe(c), h = { message: l, type: ne.DUPLICATE_PRODUCTIONS, ruleName: t.name, dslName: u, occurrence: c.idx }, d = Ra(c);
      return d && (h.parameter = d), h;
    });
  }
  function xp(t) {
    return `${Fe(t)}_#_${t.idx}_#_${Ra(t)}`;
  }
  function Ra(t) {
    return t instanceof D ? t.terminalType.name : t instanceof pe ? t.nonTerminalName : "";
  }
  class Mp extends Mt {
    constructor() {
      super(...arguments), this.allProductions = [];
    }
    visitNonTerminal(e) {
      this.allProductions.push(e);
    }
    visitOption(e) {
      this.allProductions.push(e);
    }
    visitRepetitionWithSeparator(e) {
      this.allProductions.push(e);
    }
    visitRepetitionMandatory(e) {
      this.allProductions.push(e);
    }
    visitRepetitionMandatoryWithSeparator(e) {
      this.allProductions.push(e);
    }
    visitRepetition(e) {
      this.allProductions.push(e);
    }
    visitAlternation(e) {
      this.allProductions.push(e);
    }
    visitTerminal(e) {
      this.allProductions.push(e);
    }
  }
  function Pp(t, e, n, r) {
    const s = [];
    if (fe(e, (a, o) => o.name === t.name ? a + 1 : a, 0) > 1) {
      const a = r.buildDuplicateRuleNameError({ topLevelRule: t, grammarName: n });
      s.push({ message: a, type: ne.DUPLICATE_RULE_NAME, ruleName: t.name });
    }
    return s;
  }
  function Up(t, e, n) {
    const r = [];
    let s;
    return re(e, t) || (s = `Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${n}<-as it is not defined in any of the super grammars `, r.push({ message: s, type: ne.INVALID_RULE_OVERRIDE, ruleName: t })), r;
  }
  function La(t, e, n, r = []) {
    const s = [], i = Rn(e.definition);
    if (U(i)) return [];
    {
      const a = t.name;
      re(i, t) && s.push({ message: n.buildLeftRecursionError({ topLevelRule: t, leftRecursionPath: r }), type: ne.LEFT_RECURSION, ruleName: a });
      const c = Qn(i, r.concat([t])), l = Ae(c, (u) => {
        const h = Z(r);
        return h.push(u), La(t, u, n, h);
      });
      return s.concat(l);
    }
  }
  function Rn(t) {
    let e = [];
    if (U(t)) return e;
    const n = ve(t);
    if (n instanceof pe) e.push(n.referencedRule);
    else if (n instanceof ce || n instanceof ae || n instanceof ze || n instanceof qe || n instanceof xe || n instanceof H) e = e.concat(Rn(n.definition));
    else if (n instanceof Me) e = be(S(n.definition, (i) => Rn(i.definition)));
    else if (!(n instanceof D)) throw Error("non exhaustive match");
    const r = wn(n), s = t.length > 1;
    if (r && s) {
      const i = Y(t);
      return e.concat(Rn(i));
    } else return e;
  }
  class ds extends Mt {
    constructor() {
      super(...arguments), this.alternations = [];
    }
    visitAlternation(e) {
      this.alternations.push(e);
    }
  }
  function $p(t, e) {
    const n = new ds();
    t.accept(n);
    const r = n.alternations;
    return Ae(r, (i) => {
      const a = tn(i.definition);
      return Ae(a, (o, c) => {
        const l = Ta([o], [], ln, 1);
        return U(l) ? [{ message: e.buildEmptyAlternationError({ topLevelRule: t, alternation: i, emptyChoiceIdx: c }), type: ne.NONE_LAST_EMPTY_ALT, ruleName: t.name, occurrence: i.idx, alternative: c + 1 }] : [];
      });
    });
  }
  function Fp(t, e, n) {
    const r = new ds();
    t.accept(r);
    let s = r.alternations;
    return s = er(s, (a) => a.ignoreAmbiguities === true), Ae(s, (a) => {
      const o = a.idx, c = a.maxLookahead || e, l = us(o, t, c, a), u = Gp(l, a, t, n), h = Wp(l, a, t, n);
      return u.concat(h);
    });
  }
  class Bp extends Mt {
    constructor() {
      super(...arguments), this.allProductions = [];
    }
    visitRepetitionWithSeparator(e) {
      this.allProductions.push(e);
    }
    visitRepetitionMandatory(e) {
      this.allProductions.push(e);
    }
    visitRepetitionMandatoryWithSeparator(e) {
      this.allProductions.push(e);
    }
    visitRepetition(e) {
      this.allProductions.push(e);
    }
  }
  function Dp(t, e) {
    const n = new ds();
    t.accept(n);
    const r = n.alternations;
    return Ae(r, (i) => i.definition.length > 255 ? [{ message: e.buildTooManyAlternativesError({ topLevelRule: t, alternation: i }), type: ne.TOO_MANY_ALTS, ruleName: t.name, occurrence: i.idx }] : []);
  }
  function jp(t, e, n) {
    const r = [];
    return L(t, (s) => {
      const i = new Bp();
      s.accept(i);
      const a = i.allProductions;
      L(a, (o) => {
        const c = ya(o), l = o.maxLookahead || e, u = o.idx, d = hs(u, s, c, l)[0];
        if (U(be(d))) {
          const p = n.buildEmptyRepetitionError({ topLevelRule: s, repetition: o });
          r.push({ message: p, type: ne.NO_NON_EMPTY_LOOKAHEAD, ruleName: s.name });
        }
      });
    }), r;
  }
  function Gp(t, e, n, r) {
    const s = [], i = fe(t, (o, c, l) => (e.definition[l].ignoreAmbiguities === true || L(c, (u) => {
      const h = [l];
      L(t, (d, p) => {
        l !== p && br(d, u) && e.definition[p].ignoreAmbiguities !== true && h.push(p);
      }), h.length > 1 && !br(s, u) && (s.push(u), o.push({ alts: h, path: u }));
    }), o), []);
    return S(i, (o) => {
      const c = S(o.alts, (u) => u + 1);
      return { message: r.buildAlternationAmbiguityError({ topLevelRule: n, alternation: e, ambiguityIndices: c, prefixPath: o.path }), type: ne.AMBIGUOUS_ALTS, ruleName: n.name, occurrence: e.idx, alternatives: o.alts };
    });
  }
  function Wp(t, e, n, r) {
    const s = fe(t, (a, o, c) => {
      const l = S(o, (u) => ({ idx: c, path: u }));
      return a.concat(l);
    }, []);
    return on(Ae(s, (a) => {
      if (e.definition[a.idx].ignoreAmbiguities === true) return [];
      const c = a.idx, l = a.path, u = Le(s, (d) => e.definition[d.idx].ignoreAmbiguities !== true && d.idx < c && kp(d.path, l));
      return S(u, (d) => {
        const p = [d.idx + 1, c + 1], f = e.idx === 0 ? "" : e.idx;
        return { message: r.buildAlternationPrefixAmbiguityError({ topLevelRule: n, alternation: e, ambiguityIndices: p, prefixPath: d.path }), type: ne.AMBIGUOUS_PREFIX_ALTS, ruleName: n.name, occurrence: f, alternatives: p };
      });
    }));
  }
  function Kp(t, e, n) {
    const r = [], s = S(e, (i) => i.name);
    return L(t, (i) => {
      const a = i.name;
      if (re(s, a)) {
        const o = n.buildNamespaceConflictError(i);
        r.push({ message: o, type: ne.CONFLICT_TOKENS_RULES_NAMESPACE, ruleName: a });
      }
    }), r;
  }
  function Hp(t) {
    const e = is(t, { errMsgProvider: mp }), n = {};
    return L(t.rules, (r) => {
      n[r.name] = r;
    }), gp(n, e.errMsgProvider);
  }
  function zp(t) {
    return t = is(t, { errMsgProvider: pt }), vp(t.rules, t.tokenTypes, t.errMsgProvider, t.grammarName);
  }
  const Ia = "MismatchedTokenException", Oa = "NoViableAltException", Na = "EarlyExitException", ba = "NotAllInputParsedException", ka = [Ia, Oa, Na, ba];
  Object.freeze(ka);
  function $n(t) {
    return re(ka, t.name);
  }
  class sr extends Error {
    constructor(e, n) {
      super(e), this.token = n, this.resyncedTokens = [], Object.setPrototypeOf(this, new.target.prototype), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
    }
  }
  class Ca extends sr {
    constructor(e, n, r) {
      super(e, n), this.previousToken = r, this.name = Ia;
    }
  }
  class qp extends sr {
    constructor(e, n, r) {
      super(e, n), this.previousToken = r, this.name = Oa;
    }
  }
  class Vp extends sr {
    constructor(e, n) {
      super(e, n), this.name = ba;
    }
  }
  class Yp extends sr {
    constructor(e, n, r) {
      super(e, n), this.previousToken = r, this.name = Na;
    }
  }
  const mr = {}, va = "InRuleRecoveryException";
  class Xp extends Error {
    constructor(e) {
      super(e), this.name = va;
    }
  }
  class Zp {
    initRecoverable(e) {
      this.firstAfterRepMap = {}, this.resyncFollows = {}, this.recoveryEnabled = _(e, "recoveryEnabled") ? e.recoveryEnabled : Qe.recoveryEnabled, this.recoveryEnabled && (this.attemptInRepetitionRecovery = Jp);
    }
    getTokenToInsert(e) {
      const n = ls(e, "", NaN, NaN, NaN, NaN, NaN, NaN);
      return n.isInsertedInRecovery = true, n;
    }
    canTokenTypeBeInsertedInRecovery(e) {
      return true;
    }
    canTokenTypeBeDeletedInRecovery(e) {
      return true;
    }
    tryInRepetitionRecovery(e, n, r, s) {
      const i = this.findReSyncTokenType(), a = this.exportLexerState(), o = [];
      let c = false;
      const l = this.LA(1);
      let u = this.LA(1);
      const h = () => {
        const d = this.LA(0), p = this.errorMessageProvider.buildMismatchTokenMessage({ expected: s, actual: l, previous: d, ruleName: this.getCurrRuleFullName() }), f = new Ca(p, l, this.LA(0));
        f.resyncedTokens = tn(o), this.SAVE_ERROR(f);
      };
      for (; !c; ) if (this.tokenMatcher(u, s)) {
        h();
        return;
      } else if (r.call(this)) {
        h(), e.apply(this, n);
        return;
      } else this.tokenMatcher(u, i) ? c = true : (u = this.SKIP_TOKEN(), this.addToResyncTokens(u, o));
      this.importLexerState(a);
    }
    shouldInRepetitionRecoveryBeTried(e, n, r) {
      return !(r === false || this.tokenMatcher(this.LA(1), e) || this.isBackTracking() || this.canPerformInRuleRecovery(e, this.getFollowsForInRuleRecovery(e, n)));
    }
    getFollowsForInRuleRecovery(e, n) {
      const r = this.getCurrentGrammarPath(e, n);
      return this.getNextPossibleTokenTypes(r);
    }
    tryInRuleRecovery(e, n) {
      if (this.canRecoverWithSingleTokenInsertion(e, n)) return this.getTokenToInsert(e);
      if (this.canRecoverWithSingleTokenDeletion(e)) {
        const r = this.SKIP_TOKEN();
        return this.consumeToken(), r;
      }
      throw new Xp("sad sad panda");
    }
    canPerformInRuleRecovery(e, n) {
      return this.canRecoverWithSingleTokenInsertion(e, n) || this.canRecoverWithSingleTokenDeletion(e);
    }
    canRecoverWithSingleTokenInsertion(e, n) {
      if (!this.canTokenTypeBeInsertedInRecovery(e) || U(n)) return false;
      const r = this.LA(1);
      return vt(n, (i) => this.tokenMatcher(r, i)) !== void 0;
    }
    canRecoverWithSingleTokenDeletion(e) {
      return this.canTokenTypeBeDeletedInRecovery(e) ? this.tokenMatcher(this.LA(2), e) : false;
    }
    isInCurrentRuleReSyncSet(e) {
      const n = this.getCurrFollowKey(), r = this.getFollowSetFromFollowKey(n);
      return re(r, e);
    }
    findReSyncTokenType() {
      const e = this.flattenFollowSet();
      let n = this.LA(1), r = 2;
      for (; ; ) {
        const s = vt(e, (i) => pp(n, i));
        if (s !== void 0) return s;
        n = this.LA(r), r++;
      }
    }
    getCurrFollowKey() {
      if (this.RULE_STACK.length === 1) return mr;
      const e = this.getLastExplicitRuleShortName(), n = this.getLastExplicitRuleOccurrenceIndex(), r = this.getPreviousExplicitRuleShortName();
      return { ruleName: this.shortRuleNameToFullName(e), idxInCallingRule: n, inRule: this.shortRuleNameToFullName(r) };
    }
    buildFullFollowKeyStack() {
      const e = this.RULE_STACK, n = this.RULE_OCCURRENCE_STACK;
      return S(e, (r, s) => s === 0 ? mr : { ruleName: this.shortRuleNameToFullName(r), idxInCallingRule: n[s], inRule: this.shortRuleNameToFullName(e[s - 1]) });
    }
    flattenFollowSet() {
      const e = S(this.buildFullFollowKeyStack(), (n) => this.getFollowSetFromFollowKey(n));
      return be(e);
    }
    getFollowSetFromFollowKey(e) {
      if (e === mr) return [At];
      const n = e.ruleName + e.idxInCallingRule + ca + e.inRule;
      return this.resyncFollows[n];
    }
    addToResyncTokens(e, n) {
      return this.tokenMatcher(e, At) || n.push(e), n;
    }
    reSyncTo(e) {
      const n = [];
      let r = this.LA(1);
      for (; this.tokenMatcher(r, e) === false; ) r = this.SKIP_TOKEN(), this.addToResyncTokens(r, n);
      return tn(n);
    }
    attemptInRepetitionRecovery(e, n, r, s, i, a, o) {
    }
    getCurrentGrammarPath(e, n) {
      const r = this.getHumanReadableRuleStack(), s = Z(this.RULE_OCCURRENCE_STACK);
      return { ruleStack: r, occurrenceStack: s, lastTok: e, lastTokOccurrence: n };
    }
    getHumanReadableRuleStack() {
      return S(this.RULE_STACK, (e) => this.shortRuleNameToFullName(e));
    }
  }
  function Jp(t, e, n, r, s, i, a) {
    const o = this.getKeyForAutomaticLookahead(r, s);
    let c = this.firstAfterRepMap[o];
    if (c === void 0) {
      const d = this.getCurrRuleFullName(), p = this.getGAstProductions()[d];
      c = new i(p, s).startWalking(), this.firstAfterRepMap[o] = c;
    }
    let l = c.token, u = c.occurrence;
    const h = c.isEndOfRule;
    this.RULE_STACK.length === 1 && h && l === void 0 && (l = At, u = 1), !(l === void 0 || u === void 0) && this.shouldInRepetitionRecoveryBeTried(l, u, a) && this.tryInRepetitionRecovery(t, e, n, l);
  }
  const Qp = 4, ct = 8, wa = 1 << ct, xa = 2 << ct, kr = 3 << ct, Cr = 4 << ct, vr = 5 << ct, Ln = 6 << ct;
  function gr(t, e, n) {
    return n | e | t;
  }
  class em {
    constructor(e) {
      var n;
      this.maxLookahead = (n = e == null ? void 0 : e.maxLookahead) !== null && n !== void 0 ? n : Qe.maxLookahead;
    }
    validate(e) {
      const n = this.validateNoLeftRecursion(e.rules);
      if (U(n)) {
        const r = this.validateEmptyOrAlternatives(e.rules), s = this.validateAmbiguousAlternationAlternatives(e.rules, this.maxLookahead), i = this.validateSomeNonEmptyLookaheadPath(e.rules, this.maxLookahead);
        return [...n, ...r, ...s, ...i];
      }
      return n;
    }
    validateNoLeftRecursion(e) {
      return Ae(e, (n) => La(n, n, pt));
    }
    validateEmptyOrAlternatives(e) {
      return Ae(e, (n) => $p(n, pt));
    }
    validateAmbiguousAlternationAlternatives(e, n) {
      return Ae(e, (r) => Fp(r, n, pt));
    }
    validateSomeNonEmptyLookaheadPath(e, n) {
      return jp(e, n, pt);
    }
    buildLookaheadForAlternation(e) {
      return Rp(e.prodOccurrence, e.rule, e.maxLookahead, e.hasPredicates, e.dynamicTokensEnabled, Ip);
    }
    buildLookaheadForOptional(e) {
      return Lp(e.prodOccurrence, e.rule, e.maxLookahead, e.dynamicTokensEnabled, ya(e.prodType), Op);
    }
  }
  class tm {
    initLooksAhead(e) {
      this.dynamicTokensEnabled = _(e, "dynamicTokensEnabled") ? e.dynamicTokensEnabled : Qe.dynamicTokensEnabled, this.maxLookahead = _(e, "maxLookahead") ? e.maxLookahead : Qe.maxLookahead, this.lookaheadStrategy = _(e, "lookaheadStrategy") ? e.lookaheadStrategy : new em({ maxLookahead: this.maxLookahead }), this.lookAheadFuncsCache = /* @__PURE__ */ new Map();
    }
    preComputeLookaheadFunctions(e) {
      L(e, (n) => {
        this.TRACE_INIT(`${n.name} Rule Lookahead`, () => {
          const { alternation: r, repetition: s, option: i, repetitionMandatory: a, repetitionMandatoryWithSeparator: o, repetitionWithSeparator: c } = rm(n);
          L(r, (l) => {
            const u = l.idx === 0 ? "" : l.idx;
            this.TRACE_INIT(`${Fe(l)}${u}`, () => {
              const h = this.lookaheadStrategy.buildLookaheadForAlternation({ prodOccurrence: l.idx, rule: n, maxLookahead: l.maxLookahead || this.maxLookahead, hasPredicates: l.hasPredicates, dynamicTokensEnabled: this.dynamicTokensEnabled }), d = gr(this.fullRuleNameToShort[n.name], wa, l.idx);
              this.setLaFuncCache(d, h);
            });
          }), L(s, (l) => {
            this.computeLookaheadFunc(n, l.idx, kr, "Repetition", l.maxLookahead, Fe(l));
          }), L(i, (l) => {
            this.computeLookaheadFunc(n, l.idx, xa, "Option", l.maxLookahead, Fe(l));
          }), L(a, (l) => {
            this.computeLookaheadFunc(n, l.idx, Cr, "RepetitionMandatory", l.maxLookahead, Fe(l));
          }), L(o, (l) => {
            this.computeLookaheadFunc(n, l.idx, Ln, "RepetitionMandatoryWithSeparator", l.maxLookahead, Fe(l));
          }), L(c, (l) => {
            this.computeLookaheadFunc(n, l.idx, vr, "RepetitionWithSeparator", l.maxLookahead, Fe(l));
          });
        });
      });
    }
    computeLookaheadFunc(e, n, r, s, i, a) {
      this.TRACE_INIT(`${a}${n === 0 ? "" : n}`, () => {
        const o = this.lookaheadStrategy.buildLookaheadForOptional({ prodOccurrence: n, rule: e, maxLookahead: i || this.maxLookahead, dynamicTokensEnabled: this.dynamicTokensEnabled, prodType: s }), c = gr(this.fullRuleNameToShort[e.name], r, n);
        this.setLaFuncCache(c, o);
      });
    }
    getKeyForAutomaticLookahead(e, n) {
      const r = this.getLastExplicitRuleShortName();
      return gr(r, e, n);
    }
    getLaFuncFromCache(e) {
      return this.lookAheadFuncsCache.get(e);
    }
    setLaFuncCache(e, n) {
      this.lookAheadFuncsCache.set(e, n);
    }
  }
  class nm extends Mt {
    constructor() {
      super(...arguments), this.dslMethods = { option: [], alternation: [], repetition: [], repetitionWithSeparator: [], repetitionMandatory: [], repetitionMandatoryWithSeparator: [] };
    }
    reset() {
      this.dslMethods = { option: [], alternation: [], repetition: [], repetitionWithSeparator: [], repetitionMandatory: [], repetitionMandatoryWithSeparator: [] };
    }
    visitOption(e) {
      this.dslMethods.option.push(e);
    }
    visitRepetitionWithSeparator(e) {
      this.dslMethods.repetitionWithSeparator.push(e);
    }
    visitRepetitionMandatory(e) {
      this.dslMethods.repetitionMandatory.push(e);
    }
    visitRepetitionMandatoryWithSeparator(e) {
      this.dslMethods.repetitionMandatoryWithSeparator.push(e);
    }
    visitRepetition(e) {
      this.dslMethods.repetition.push(e);
    }
    visitAlternation(e) {
      this.dslMethods.alternation.push(e);
    }
  }
  const En = new nm();
  function rm(t) {
    En.reset(), t.accept(En);
    const e = En.dslMethods;
    return En.reset(), e;
  }
  function Ti(t, e) {
    isNaN(t.startOffset) === true ? (t.startOffset = e.startOffset, t.endOffset = e.endOffset) : t.endOffset < e.endOffset && (t.endOffset = e.endOffset);
  }
  function yi(t, e) {
    isNaN(t.startOffset) === true ? (t.startOffset = e.startOffset, t.startColumn = e.startColumn, t.startLine = e.startLine, t.endOffset = e.endOffset, t.endColumn = e.endColumn, t.endLine = e.endLine) : t.endOffset < e.endOffset && (t.endOffset = e.endOffset, t.endColumn = e.endColumn, t.endLine = e.endLine);
  }
  function sm(t, e, n) {
    t.children[n] === void 0 ? t.children[n] = [e] : t.children[n].push(e);
  }
  function im(t, e, n) {
    t.children[e] === void 0 ? t.children[e] = [n] : t.children[e].push(n);
  }
  const am = "name";
  function Ma(t, e) {
    Object.defineProperty(t, am, { enumerable: false, configurable: true, writable: false, value: e });
  }
  function om(t, e) {
    const n = Re(t), r = n.length;
    for (let s = 0; s < r; s++) {
      const i = n[s], a = t[i], o = a.length;
      for (let c = 0; c < o; c++) {
        const l = a[c];
        l.tokenTypeIdx === void 0 && this[l.name](l.children, e);
      }
    }
  }
  function cm(t, e) {
    const n = function() {
    };
    Ma(n, t + "BaseSemantics");
    const r = { visit: function(s, i) {
      if (C(s) && (s = s[0]), !Je(s)) return this[s.name](s.children, i);
    }, validateVisitor: function() {
      const s = um(this, e);
      if (!U(s)) {
        const i = S(s, (a) => a.msg);
        throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${i.join(`

`).replace(/\n/g, `
	`)}`);
      }
    } };
    return n.prototype = r, n.prototype.constructor = n, n._RULE_NAMES = e, n;
  }
  function lm(t, e, n) {
    const r = function() {
    };
    Ma(r, t + "BaseSemanticsWithDefaults");
    const s = Object.create(n.prototype);
    return L(e, (i) => {
      s[i] = om;
    }), r.prototype = s, r.prototype.constructor = r, r;
  }
  var wr;
  (function(t) {
    t[t.REDUNDANT_METHOD = 0] = "REDUNDANT_METHOD", t[t.MISSING_METHOD = 1] = "MISSING_METHOD";
  })(wr || (wr = {}));
  function um(t, e) {
    return hm(t, e);
  }
  function hm(t, e) {
    const n = Le(e, (s) => et(t[s]) === false), r = S(n, (s) => ({ msg: `Missing visitor method: <${s}> on ${t.constructor.name} CST Visitor.`, type: wr.MISSING_METHOD, methodName: s }));
    return on(r);
  }
  class dm {
    initTreeBuilder(e) {
      if (this.CST_STACK = [], this.outputCst = e.outputCst, this.nodeLocationTracking = _(e, "nodeLocationTracking") ? e.nodeLocationTracking : Qe.nodeLocationTracking, !this.outputCst) this.cstInvocationStateUpdate = z, this.cstFinallyStateUpdate = z, this.cstPostTerminal = z, this.cstPostNonTerminal = z, this.cstPostRule = z;
      else if (/full/i.test(this.nodeLocationTracking)) this.recoveryEnabled ? (this.setNodeLocationFromToken = yi, this.setNodeLocationFromNode = yi, this.cstPostRule = z, this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery) : (this.setNodeLocationFromToken = z, this.setNodeLocationFromNode = z, this.cstPostRule = this.cstPostRuleFull, this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular);
      else if (/onlyOffset/i.test(this.nodeLocationTracking)) this.recoveryEnabled ? (this.setNodeLocationFromToken = Ti, this.setNodeLocationFromNode = Ti, this.cstPostRule = z, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery) : (this.setNodeLocationFromToken = z, this.setNodeLocationFromNode = z, this.cstPostRule = this.cstPostRuleOnlyOffset, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular);
      else if (/none/i.test(this.nodeLocationTracking)) this.setNodeLocationFromToken = z, this.setNodeLocationFromNode = z, this.cstPostRule = z, this.setInitialNodeLocation = z;
      else throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`);
    }
    setInitialNodeLocationOnlyOffsetRecovery(e) {
      e.location = { startOffset: NaN, endOffset: NaN };
    }
    setInitialNodeLocationOnlyOffsetRegular(e) {
      e.location = { startOffset: this.LA(1).startOffset, endOffset: NaN };
    }
    setInitialNodeLocationFullRecovery(e) {
      e.location = { startOffset: NaN, startLine: NaN, startColumn: NaN, endOffset: NaN, endLine: NaN, endColumn: NaN };
    }
    setInitialNodeLocationFullRegular(e) {
      const n = this.LA(1);
      e.location = { startOffset: n.startOffset, startLine: n.startLine, startColumn: n.startColumn, endOffset: NaN, endLine: NaN, endColumn: NaN };
    }
    cstInvocationStateUpdate(e) {
      const n = { name: e, children: /* @__PURE__ */ Object.create(null) };
      this.setInitialNodeLocation(n), this.CST_STACK.push(n);
    }
    cstFinallyStateUpdate() {
      this.CST_STACK.pop();
    }
    cstPostRuleFull(e) {
      const n = this.LA(0), r = e.location;
      r.startOffset <= n.startOffset ? (r.endOffset = n.endOffset, r.endLine = n.endLine, r.endColumn = n.endColumn) : (r.startOffset = NaN, r.startLine = NaN, r.startColumn = NaN);
    }
    cstPostRuleOnlyOffset(e) {
      const n = this.LA(0), r = e.location;
      r.startOffset <= n.startOffset ? r.endOffset = n.endOffset : r.startOffset = NaN;
    }
    cstPostTerminal(e, n) {
      const r = this.CST_STACK[this.CST_STACK.length - 1];
      sm(r, n, e), this.setNodeLocationFromToken(r.location, n);
    }
    cstPostNonTerminal(e, n) {
      const r = this.CST_STACK[this.CST_STACK.length - 1];
      im(r, n, e), this.setNodeLocationFromNode(r.location, e.location);
    }
    getBaseCstVisitorConstructor() {
      if (Je(this.baseCstVisitorConstructor)) {
        const e = cm(this.className, Re(this.gastProductionsCache));
        return this.baseCstVisitorConstructor = e, e;
      }
      return this.baseCstVisitorConstructor;
    }
    getBaseCstVisitorConstructorWithDefaults() {
      if (Je(this.baseCstVisitorWithDefaultsConstructor)) {
        const e = lm(this.className, Re(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
        return this.baseCstVisitorWithDefaultsConstructor = e, e;
      }
      return this.baseCstVisitorWithDefaultsConstructor;
    }
    getLastExplicitRuleShortName() {
      const e = this.RULE_STACK;
      return e[e.length - 1];
    }
    getPreviousExplicitRuleShortName() {
      const e = this.RULE_STACK;
      return e[e.length - 2];
    }
    getLastExplicitRuleOccurrenceIndex() {
      const e = this.RULE_OCCURRENCE_STACK;
      return e[e.length - 1];
    }
  }
  class fm {
    initLexerAdapter() {
      this.tokVector = [], this.tokVectorLength = 0, this.currIdx = -1;
    }
    set input(e) {
      if (this.selfAnalysisDone !== true) throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");
      this.reset(), this.tokVector = e, this.tokVectorLength = e.length;
    }
    get input() {
      return this.tokVector;
    }
    SKIP_TOKEN() {
      return this.currIdx <= this.tokVector.length - 2 ? (this.consumeToken(), this.LA(1)) : Bn;
    }
    LA(e) {
      const n = this.currIdx + e;
      return n < 0 || this.tokVectorLength <= n ? Bn : this.tokVector[n];
    }
    consumeToken() {
      this.currIdx++;
    }
    exportLexerState() {
      return this.currIdx;
    }
    importLexerState(e) {
      this.currIdx = e;
    }
    resetLexerState() {
      this.currIdx = -1;
    }
    moveToTerminatedState() {
      this.currIdx = this.tokVector.length - 1;
    }
    getLexerPosition() {
      return this.exportLexerState();
    }
  }
  class pm {
    ACTION(e) {
      return e.call(this);
    }
    consume(e, n, r) {
      return this.consumeInternal(n, e, r);
    }
    subrule(e, n, r) {
      return this.subruleInternal(n, e, r);
    }
    option(e, n) {
      return this.optionInternal(n, e);
    }
    or(e, n) {
      return this.orInternal(n, e);
    }
    many(e, n) {
      return this.manyInternal(e, n);
    }
    atLeastOne(e, n) {
      return this.atLeastOneInternal(e, n);
    }
    CONSUME(e, n) {
      return this.consumeInternal(e, 0, n);
    }
    CONSUME1(e, n) {
      return this.consumeInternal(e, 1, n);
    }
    CONSUME2(e, n) {
      return this.consumeInternal(e, 2, n);
    }
    CONSUME3(e, n) {
      return this.consumeInternal(e, 3, n);
    }
    CONSUME4(e, n) {
      return this.consumeInternal(e, 4, n);
    }
    CONSUME5(e, n) {
      return this.consumeInternal(e, 5, n);
    }
    CONSUME6(e, n) {
      return this.consumeInternal(e, 6, n);
    }
    CONSUME7(e, n) {
      return this.consumeInternal(e, 7, n);
    }
    CONSUME8(e, n) {
      return this.consumeInternal(e, 8, n);
    }
    CONSUME9(e, n) {
      return this.consumeInternal(e, 9, n);
    }
    SUBRULE(e, n) {
      return this.subruleInternal(e, 0, n);
    }
    SUBRULE1(e, n) {
      return this.subruleInternal(e, 1, n);
    }
    SUBRULE2(e, n) {
      return this.subruleInternal(e, 2, n);
    }
    SUBRULE3(e, n) {
      return this.subruleInternal(e, 3, n);
    }
    SUBRULE4(e, n) {
      return this.subruleInternal(e, 4, n);
    }
    SUBRULE5(e, n) {
      return this.subruleInternal(e, 5, n);
    }
    SUBRULE6(e, n) {
      return this.subruleInternal(e, 6, n);
    }
    SUBRULE7(e, n) {
      return this.subruleInternal(e, 7, n);
    }
    SUBRULE8(e, n) {
      return this.subruleInternal(e, 8, n);
    }
    SUBRULE9(e, n) {
      return this.subruleInternal(e, 9, n);
    }
    OPTION(e) {
      return this.optionInternal(e, 0);
    }
    OPTION1(e) {
      return this.optionInternal(e, 1);
    }
    OPTION2(e) {
      return this.optionInternal(e, 2);
    }
    OPTION3(e) {
      return this.optionInternal(e, 3);
    }
    OPTION4(e) {
      return this.optionInternal(e, 4);
    }
    OPTION5(e) {
      return this.optionInternal(e, 5);
    }
    OPTION6(e) {
      return this.optionInternal(e, 6);
    }
    OPTION7(e) {
      return this.optionInternal(e, 7);
    }
    OPTION8(e) {
      return this.optionInternal(e, 8);
    }
    OPTION9(e) {
      return this.optionInternal(e, 9);
    }
    OR(e) {
      return this.orInternal(e, 0);
    }
    OR1(e) {
      return this.orInternal(e, 1);
    }
    OR2(e) {
      return this.orInternal(e, 2);
    }
    OR3(e) {
      return this.orInternal(e, 3);
    }
    OR4(e) {
      return this.orInternal(e, 4);
    }
    OR5(e) {
      return this.orInternal(e, 5);
    }
    OR6(e) {
      return this.orInternal(e, 6);
    }
    OR7(e) {
      return this.orInternal(e, 7);
    }
    OR8(e) {
      return this.orInternal(e, 8);
    }
    OR9(e) {
      return this.orInternal(e, 9);
    }
    MANY(e) {
      this.manyInternal(0, e);
    }
    MANY1(e) {
      this.manyInternal(1, e);
    }
    MANY2(e) {
      this.manyInternal(2, e);
    }
    MANY3(e) {
      this.manyInternal(3, e);
    }
    MANY4(e) {
      this.manyInternal(4, e);
    }
    MANY5(e) {
      this.manyInternal(5, e);
    }
    MANY6(e) {
      this.manyInternal(6, e);
    }
    MANY7(e) {
      this.manyInternal(7, e);
    }
    MANY8(e) {
      this.manyInternal(8, e);
    }
    MANY9(e) {
      this.manyInternal(9, e);
    }
    MANY_SEP(e) {
      this.manySepFirstInternal(0, e);
    }
    MANY_SEP1(e) {
      this.manySepFirstInternal(1, e);
    }
    MANY_SEP2(e) {
      this.manySepFirstInternal(2, e);
    }
    MANY_SEP3(e) {
      this.manySepFirstInternal(3, e);
    }
    MANY_SEP4(e) {
      this.manySepFirstInternal(4, e);
    }
    MANY_SEP5(e) {
      this.manySepFirstInternal(5, e);
    }
    MANY_SEP6(e) {
      this.manySepFirstInternal(6, e);
    }
    MANY_SEP7(e) {
      this.manySepFirstInternal(7, e);
    }
    MANY_SEP8(e) {
      this.manySepFirstInternal(8, e);
    }
    MANY_SEP9(e) {
      this.manySepFirstInternal(9, e);
    }
    AT_LEAST_ONE(e) {
      this.atLeastOneInternal(0, e);
    }
    AT_LEAST_ONE1(e) {
      return this.atLeastOneInternal(1, e);
    }
    AT_LEAST_ONE2(e) {
      this.atLeastOneInternal(2, e);
    }
    AT_LEAST_ONE3(e) {
      this.atLeastOneInternal(3, e);
    }
    AT_LEAST_ONE4(e) {
      this.atLeastOneInternal(4, e);
    }
    AT_LEAST_ONE5(e) {
      this.atLeastOneInternal(5, e);
    }
    AT_LEAST_ONE6(e) {
      this.atLeastOneInternal(6, e);
    }
    AT_LEAST_ONE7(e) {
      this.atLeastOneInternal(7, e);
    }
    AT_LEAST_ONE8(e) {
      this.atLeastOneInternal(8, e);
    }
    AT_LEAST_ONE9(e) {
      this.atLeastOneInternal(9, e);
    }
    AT_LEAST_ONE_SEP(e) {
      this.atLeastOneSepFirstInternal(0, e);
    }
    AT_LEAST_ONE_SEP1(e) {
      this.atLeastOneSepFirstInternal(1, e);
    }
    AT_LEAST_ONE_SEP2(e) {
      this.atLeastOneSepFirstInternal(2, e);
    }
    AT_LEAST_ONE_SEP3(e) {
      this.atLeastOneSepFirstInternal(3, e);
    }
    AT_LEAST_ONE_SEP4(e) {
      this.atLeastOneSepFirstInternal(4, e);
    }
    AT_LEAST_ONE_SEP5(e) {
      this.atLeastOneSepFirstInternal(5, e);
    }
    AT_LEAST_ONE_SEP6(e) {
      this.atLeastOneSepFirstInternal(6, e);
    }
    AT_LEAST_ONE_SEP7(e) {
      this.atLeastOneSepFirstInternal(7, e);
    }
    AT_LEAST_ONE_SEP8(e) {
      this.atLeastOneSepFirstInternal(8, e);
    }
    AT_LEAST_ONE_SEP9(e) {
      this.atLeastOneSepFirstInternal(9, e);
    }
    RULE(e, n, r = Dn) {
      if (re(this.definedRulesNames, e)) {
        const a = { message: pt.buildDuplicateRuleNameError({ topLevelRule: e, grammarName: this.className }), type: ne.DUPLICATE_RULE_NAME, ruleName: e };
        this.definitionErrors.push(a);
      }
      this.definedRulesNames.push(e);
      const s = this.defineRule(e, n, r);
      return this[e] = s, s;
    }
    OVERRIDE_RULE(e, n, r = Dn) {
      const s = Up(e, this.definedRulesNames, this.className);
      this.definitionErrors = this.definitionErrors.concat(s);
      const i = this.defineRule(e, n, r);
      return this[e] = i, i;
    }
    BACKTRACK(e, n) {
      return function() {
        this.isBackTrackingStack.push(1);
        const r = this.saveRecogState();
        try {
          return e.apply(this, n), true;
        } catch (s) {
          if ($n(s)) return false;
          throw s;
        } finally {
          this.reloadRecogState(r), this.isBackTrackingStack.pop();
        }
      };
    }
    getGAstProductions() {
      return this.gastProductionsCache;
    }
    getSerializedGastProductions() {
      return mf(K(this.gastProductionsCache));
    }
  }
  class mm {
    initRecognizerEngine(e, n) {
      if (this.className = this.constructor.name, this.shortRuleNameToFull = {}, this.fullRuleNameToShort = {}, this.ruleShortNameIdx = 256, this.tokenMatcher = Un, this.subruleIdx = 0, this.definedRulesNames = [], this.tokensMap = {}, this.isBackTrackingStack = [], this.RULE_STACK = [], this.RULE_OCCURRENCE_STACK = [], this.gastProductionsCache = {}, _(n, "serializedGrammar")) throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);
      if (C(e)) {
        if (U(e)) throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);
        if (typeof e[0].startOffset == "number") throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`);
      }
      if (C(e)) this.tokensMap = fe(e, (i, a) => (i[a.name] = a, i), {});
      else if (_(e, "modes") && ke(be(K(e.modes)), up)) {
        const i = be(K(e.modes)), a = as(i);
        this.tokensMap = fe(a, (o, c) => (o[c.name] = c, o), {});
      } else if (_e(e)) this.tokensMap = Z(e);
      else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
      this.tokensMap.EOF = At;
      const r = _(e, "modes") ? be(K(e.modes)) : K(e), s = ke(r, (i) => U(i.categoryMatches));
      this.tokenMatcher = s ? Un : ln, un(K(this.tokensMap));
    }
    defineRule(e, n, r) {
      if (this.selfAnalysisDone) throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);
      const s = _(r, "resyncEnabled") ? r.resyncEnabled : Dn.resyncEnabled, i = _(r, "recoveryValueFunc") ? r.recoveryValueFunc : Dn.recoveryValueFunc, a = this.ruleShortNameIdx << Qp + ct;
      this.ruleShortNameIdx++, this.shortRuleNameToFull[a] = e, this.fullRuleNameToShort[e] = a;
      let o;
      return this.outputCst === true ? o = function(...u) {
        try {
          this.ruleInvocationStateUpdate(a, e, this.subruleIdx), n.apply(this, u);
          const h = this.CST_STACK[this.CST_STACK.length - 1];
          return this.cstPostRule(h), h;
        } catch (h) {
          return this.invokeRuleCatch(h, s, i);
        } finally {
          this.ruleFinallyStateUpdate();
        }
      } : o = function(...u) {
        try {
          return this.ruleInvocationStateUpdate(a, e, this.subruleIdx), n.apply(this, u);
        } catch (h) {
          return this.invokeRuleCatch(h, s, i);
        } finally {
          this.ruleFinallyStateUpdate();
        }
      }, Object.assign(o, { ruleName: e, originalGrammarAction: n });
    }
    invokeRuleCatch(e, n, r) {
      const s = this.RULE_STACK.length === 1, i = n && !this.isBackTracking() && this.recoveryEnabled;
      if ($n(e)) {
        const a = e;
        if (i) {
          const o = this.findReSyncTokenType();
          if (this.isInCurrentRuleReSyncSet(o)) if (a.resyncedTokens = this.reSyncTo(o), this.outputCst) {
            const c = this.CST_STACK[this.CST_STACK.length - 1];
            return c.recoveredNode = true, c;
          } else return r(e);
          else {
            if (this.outputCst) {
              const c = this.CST_STACK[this.CST_STACK.length - 1];
              c.recoveredNode = true, a.partialCstResult = c;
            }
            throw a;
          }
        } else {
          if (s) return this.moveToTerminatedState(), r(e);
          throw a;
        }
      } else throw e;
    }
    optionInternal(e, n) {
      const r = this.getKeyForAutomaticLookahead(xa, n);
      return this.optionInternalLogic(e, n, r);
    }
    optionInternalLogic(e, n, r) {
      let s = this.getLaFuncFromCache(r), i;
      if (typeof e != "function") {
        i = e.DEF;
        const a = e.GATE;
        if (a !== void 0) {
          const o = s;
          s = () => a.call(this) && o.call(this);
        }
      } else i = e;
      if (s.call(this) === true) return i.call(this);
    }
    atLeastOneInternal(e, n) {
      const r = this.getKeyForAutomaticLookahead(Cr, e);
      return this.atLeastOneInternalLogic(e, n, r);
    }
    atLeastOneInternalLogic(e, n, r) {
      let s = this.getLaFuncFromCache(r), i;
      if (typeof n != "function") {
        i = n.DEF;
        const a = n.GATE;
        if (a !== void 0) {
          const o = s;
          s = () => a.call(this) && o.call(this);
        }
      } else i = n;
      if (s.call(this) === true) {
        let a = this.doSingleRepetition(i);
        for (; s.call(this) === true && a === true; ) a = this.doSingleRepetition(i);
      } else throw this.raiseEarlyExitException(e, G.REPETITION_MANDATORY, n.ERR_MSG);
      this.attemptInRepetitionRecovery(this.atLeastOneInternal, [e, n], s, Cr, e, Sp);
    }
    atLeastOneSepFirstInternal(e, n) {
      const r = this.getKeyForAutomaticLookahead(Ln, e);
      this.atLeastOneSepFirstInternalLogic(e, n, r);
    }
    atLeastOneSepFirstInternalLogic(e, n, r) {
      const s = n.DEF, i = n.SEP;
      if (this.getLaFuncFromCache(r).call(this) === true) {
        s.call(this);
        const o = () => this.tokenMatcher(this.LA(1), i);
        for (; this.tokenMatcher(this.LA(1), i) === true; ) this.CONSUME(i), s.call(this);
        this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [e, i, o, s, gi], o, Ln, e, gi);
      } else throw this.raiseEarlyExitException(e, G.REPETITION_MANDATORY_WITH_SEPARATOR, n.ERR_MSG);
    }
    manyInternal(e, n) {
      const r = this.getKeyForAutomaticLookahead(kr, e);
      return this.manyInternalLogic(e, n, r);
    }
    manyInternalLogic(e, n, r) {
      let s = this.getLaFuncFromCache(r), i;
      if (typeof n != "function") {
        i = n.DEF;
        const o = n.GATE;
        if (o !== void 0) {
          const c = s;
          s = () => o.call(this) && c.call(this);
        }
      } else i = n;
      let a = true;
      for (; s.call(this) === true && a === true; ) a = this.doSingleRepetition(i);
      this.attemptInRepetitionRecovery(this.manyInternal, [e, n], s, kr, e, Ap, a);
    }
    manySepFirstInternal(e, n) {
      const r = this.getKeyForAutomaticLookahead(vr, e);
      this.manySepFirstInternalLogic(e, n, r);
    }
    manySepFirstInternalLogic(e, n, r) {
      const s = n.DEF, i = n.SEP;
      if (this.getLaFuncFromCache(r).call(this) === true) {
        s.call(this);
        const o = () => this.tokenMatcher(this.LA(1), i);
        for (; this.tokenMatcher(this.LA(1), i) === true; ) this.CONSUME(i), s.call(this);
        this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [e, i, o, s, mi], o, vr, e, mi);
      }
    }
    repetitionSepSecondInternal(e, n, r, s, i) {
      for (; r(); ) this.CONSUME(n), s.call(this);
      this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [e, n, r, s, i], r, Ln, e, i);
    }
    doSingleRepetition(e) {
      const n = this.getLexerPosition();
      return e.call(this), this.getLexerPosition() > n;
    }
    orInternal(e, n) {
      const r = this.getKeyForAutomaticLookahead(wa, n), s = C(e) ? e : e.DEF, a = this.getLaFuncFromCache(r).call(this, s);
      if (a !== void 0) return s[a].ALT.call(this);
      this.raiseNoAltException(n, e.ERR_MSG);
    }
    ruleFinallyStateUpdate() {
      if (this.RULE_STACK.pop(), this.RULE_OCCURRENCE_STACK.pop(), this.cstFinallyStateUpdate(), this.RULE_STACK.length === 0 && this.isAtEndOfInput() === false) {
        const e = this.LA(1), n = this.errorMessageProvider.buildNotAllInputParsedMessage({ firstRedundant: e, ruleName: this.getCurrRuleFullName() });
        this.SAVE_ERROR(new Vp(n, e));
      }
    }
    subruleInternal(e, n, r) {
      let s;
      try {
        const i = r !== void 0 ? r.ARGS : void 0;
        return this.subruleIdx = n, s = e.apply(this, i), this.cstPostNonTerminal(s, r !== void 0 && r.LABEL !== void 0 ? r.LABEL : e.ruleName), s;
      } catch (i) {
        throw this.subruleInternalError(i, r, e.ruleName);
      }
    }
    subruleInternalError(e, n, r) {
      throw $n(e) && e.partialCstResult !== void 0 && (this.cstPostNonTerminal(e.partialCstResult, n !== void 0 && n.LABEL !== void 0 ? n.LABEL : r), delete e.partialCstResult), e;
    }
    consumeInternal(e, n, r) {
      let s;
      try {
        const i = this.LA(1);
        this.tokenMatcher(i, e) === true ? (this.consumeToken(), s = i) : this.consumeInternalError(e, i, r);
      } catch (i) {
        s = this.consumeInternalRecovery(e, n, i);
      }
      return this.cstPostTerminal(r !== void 0 && r.LABEL !== void 0 ? r.LABEL : e.name, s), s;
    }
    consumeInternalError(e, n, r) {
      let s;
      const i = this.LA(0);
      throw r !== void 0 && r.ERR_MSG ? s = r.ERR_MSG : s = this.errorMessageProvider.buildMismatchTokenMessage({ expected: e, actual: n, previous: i, ruleName: this.getCurrRuleFullName() }), this.SAVE_ERROR(new Ca(s, n, i));
    }
    consumeInternalRecovery(e, n, r) {
      if (this.recoveryEnabled && r.name === "MismatchedTokenException" && !this.isBackTracking()) {
        const s = this.getFollowsForInRuleRecovery(e, n);
        try {
          return this.tryInRuleRecovery(e, s);
        } catch (i) {
          throw i.name === va ? r : i;
        }
      } else throw r;
    }
    saveRecogState() {
      const e = this.errors, n = Z(this.RULE_STACK);
      return { errors: e, lexerState: this.exportLexerState(), RULE_STACK: n, CST_STACK: this.CST_STACK };
    }
    reloadRecogState(e) {
      this.errors = e.errors, this.importLexerState(e.lexerState), this.RULE_STACK = e.RULE_STACK;
    }
    ruleInvocationStateUpdate(e, n, r) {
      this.RULE_OCCURRENCE_STACK.push(r), this.RULE_STACK.push(e), this.cstInvocationStateUpdate(n);
    }
    isBackTracking() {
      return this.isBackTrackingStack.length !== 0;
    }
    getCurrRuleFullName() {
      const e = this.getLastExplicitRuleShortName();
      return this.shortRuleNameToFull[e];
    }
    shortRuleNameToFullName(e) {
      return this.shortRuleNameToFull[e];
    }
    isAtEndOfInput() {
      return this.tokenMatcher(this.LA(1), At);
    }
    reset() {
      this.resetLexerState(), this.subruleIdx = 0, this.isBackTrackingStack = [], this.errors = [], this.RULE_STACK = [], this.CST_STACK = [], this.RULE_OCCURRENCE_STACK = [];
    }
  }
  class gm {
    initErrorHandler(e) {
      this._errors = [], this.errorMessageProvider = _(e, "errorMessageProvider") ? e.errorMessageProvider : Qe.errorMessageProvider;
    }
    SAVE_ERROR(e) {
      if ($n(e)) return e.context = { ruleStack: this.getHumanReadableRuleStack(), ruleOccurrenceStack: Z(this.RULE_OCCURRENCE_STACK) }, this._errors.push(e), e;
      throw Error("Trying to save an Error which is not a RecognitionException");
    }
    get errors() {
      return Z(this._errors);
    }
    set errors(e) {
      this._errors = e;
    }
    raiseEarlyExitException(e, n, r) {
      const s = this.getCurrRuleFullName(), i = this.getGAstProductions()[s], o = hs(e, i, n, this.maxLookahead)[0], c = [];
      for (let u = 1; u <= this.maxLookahead; u++) c.push(this.LA(u));
      const l = this.errorMessageProvider.buildEarlyExitMessage({ expectedIterationPaths: o, actual: c, previous: this.LA(0), customUserDescription: r, ruleName: s });
      throw this.SAVE_ERROR(new Yp(l, this.LA(1), this.LA(0)));
    }
    raiseNoAltException(e, n) {
      const r = this.getCurrRuleFullName(), s = this.getGAstProductions()[r], i = us(e, s, this.maxLookahead), a = [];
      for (let l = 1; l <= this.maxLookahead; l++) a.push(this.LA(l));
      const o = this.LA(0), c = this.errorMessageProvider.buildNoViableAltMessage({ expectedPathsPerAlt: i, actual: a, previous: o, customUserDescription: n, ruleName: this.getCurrRuleFullName() });
      throw this.SAVE_ERROR(new qp(c, this.LA(1), o));
    }
  }
  class Em {
    initContentAssist() {
    }
    computeContentAssist(e, n) {
      const r = this.gastProductionsCache[e];
      if (Je(r)) throw Error(`Rule ->${e}<- does not exist in this grammar.`);
      return Ta([r], n, this.tokenMatcher, this.maxLookahead);
    }
    getNextPossibleTokenTypes(e) {
      const n = ve(e.ruleStack), s = this.getGAstProductions()[n];
      return new yp(s, e).startWalking();
    }
  }
  const ir = { description: "This Object indicates the Parser is during Recording Phase" };
  Object.freeze(ir);
  const Ai = true, Si = Math.pow(2, ct) - 1, Pa = A({ name: "RECORDING_PHASE_TOKEN", pattern: X.NA });
  un([Pa]);
  const Ua = ls(Pa, `This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`, -1, -1, -1, -1, -1, -1);
  Object.freeze(Ua);
  const Tm = { name: `This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`, children: {} };
  class ym {
    initGastRecorder(e) {
      this.recordingProdStack = [], this.RECORDING_PHASE = false;
    }
    enableRecording() {
      this.RECORDING_PHASE = true, this.TRACE_INIT("Enable Recording", () => {
        for (let e = 0; e < 10; e++) {
          const n = e > 0 ? e : "";
          this[`CONSUME${n}`] = function(r, s) {
            return this.consumeInternalRecord(r, e, s);
          }, this[`SUBRULE${n}`] = function(r, s) {
            return this.subruleInternalRecord(r, e, s);
          }, this[`OPTION${n}`] = function(r) {
            return this.optionInternalRecord(r, e);
          }, this[`OR${n}`] = function(r) {
            return this.orInternalRecord(r, e);
          }, this[`MANY${n}`] = function(r) {
            this.manyInternalRecord(e, r);
          }, this[`MANY_SEP${n}`] = function(r) {
            this.manySepFirstInternalRecord(e, r);
          }, this[`AT_LEAST_ONE${n}`] = function(r) {
            this.atLeastOneInternalRecord(e, r);
          }, this[`AT_LEAST_ONE_SEP${n}`] = function(r) {
            this.atLeastOneSepFirstInternalRecord(e, r);
          };
        }
        this.consume = function(e, n, r) {
          return this.consumeInternalRecord(n, e, r);
        }, this.subrule = function(e, n, r) {
          return this.subruleInternalRecord(n, e, r);
        }, this.option = function(e, n) {
          return this.optionInternalRecord(n, e);
        }, this.or = function(e, n) {
          return this.orInternalRecord(n, e);
        }, this.many = function(e, n) {
          this.manyInternalRecord(e, n);
        }, this.atLeastOne = function(e, n) {
          this.atLeastOneInternalRecord(e, n);
        }, this.ACTION = this.ACTION_RECORD, this.BACKTRACK = this.BACKTRACK_RECORD, this.LA = this.LA_RECORD;
      });
    }
    disableRecording() {
      this.RECORDING_PHASE = false, this.TRACE_INIT("Deleting Recording methods", () => {
        const e = this;
        for (let n = 0; n < 10; n++) {
          const r = n > 0 ? n : "";
          delete e[`CONSUME${r}`], delete e[`SUBRULE${r}`], delete e[`OPTION${r}`], delete e[`OR${r}`], delete e[`MANY${r}`], delete e[`MANY_SEP${r}`], delete e[`AT_LEAST_ONE${r}`], delete e[`AT_LEAST_ONE_SEP${r}`];
        }
        delete e.consume, delete e.subrule, delete e.option, delete e.or, delete e.many, delete e.atLeastOne, delete e.ACTION, delete e.BACKTRACK, delete e.LA;
      });
    }
    ACTION_RECORD(e) {
    }
    BACKTRACK_RECORD(e, n) {
      return () => true;
    }
    LA_RECORD(e) {
      return Bn;
    }
    topLevelRuleRecord(e, n) {
      try {
        const r = new xt({ definition: [], name: e });
        return r.name = e, this.recordingProdStack.push(r), n.call(this), this.recordingProdStack.pop(), r;
      } catch (r) {
        if (r.KNOWN_RECORDER_ERROR !== true) try {
          r.message = r.message + `
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`;
        } catch {
          throw r;
        }
        throw r;
      }
    }
    optionInternalRecord(e, n) {
      return Dt.call(this, ae, e, n);
    }
    atLeastOneInternalRecord(e, n) {
      Dt.call(this, ze, n, e);
    }
    atLeastOneSepFirstInternalRecord(e, n) {
      Dt.call(this, qe, n, e, Ai);
    }
    manyInternalRecord(e, n) {
      Dt.call(this, H, n, e);
    }
    manySepFirstInternalRecord(e, n) {
      Dt.call(this, xe, n, e, Ai);
    }
    orInternalRecord(e, n) {
      return Am.call(this, e, n);
    }
    subruleInternalRecord(e, n, r) {
      if (Fn(n), !e || _(e, "ruleName") === false) {
        const o = new Error(`<SUBRULE${_i(n)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
        throw o.KNOWN_RECORDER_ERROR = true, o;
      }
      const s = Tt(this.recordingProdStack), i = e.ruleName, a = new pe({ idx: n, nonTerminalName: i, label: r == null ? void 0 : r.LABEL, referencedRule: void 0 });
      return s.definition.push(a), this.outputCst ? Tm : ir;
    }
    consumeInternalRecord(e, n, r) {
      if (Fn(n), !ma(e)) {
        const a = new Error(`<CONSUME${_i(n)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
        throw a.KNOWN_RECORDER_ERROR = true, a;
      }
      const s = Tt(this.recordingProdStack), i = new D({ idx: n, terminalType: e, label: r == null ? void 0 : r.LABEL });
      return s.definition.push(i), Ua;
    }
  }
  function Dt(t, e, n, r = false) {
    Fn(n);
    const s = Tt(this.recordingProdStack), i = et(e) ? e : e.DEF, a = new t({ definition: [], idx: n });
    return r && (a.separator = e.SEP), _(e, "MAX_LOOKAHEAD") && (a.maxLookahead = e.MAX_LOOKAHEAD), this.recordingProdStack.push(a), i.call(this), s.definition.push(a), this.recordingProdStack.pop(), ir;
  }
  function Am(t, e) {
    Fn(e);
    const n = Tt(this.recordingProdStack), r = C(t) === false, s = r === false ? t : t.DEF, i = new Me({ definition: [], idx: e, ignoreAmbiguities: r && t.IGNORE_AMBIGUITIES === true });
    _(t, "MAX_LOOKAHEAD") && (i.maxLookahead = t.MAX_LOOKAHEAD);
    const a = sa(s, (o) => et(o.GATE));
    return i.hasPredicates = a, n.definition.push(i), L(s, (o) => {
      const c = new ce({ definition: [] });
      i.definition.push(c), _(o, "IGNORE_AMBIGUITIES") ? c.ignoreAmbiguities = o.IGNORE_AMBIGUITIES : _(o, "GATE") && (c.ignoreAmbiguities = true), this.recordingProdStack.push(c), o.ALT.call(this), this.recordingProdStack.pop();
    }), ir;
  }
  function _i(t) {
    return t === 0 ? "" : `${t}`;
  }
  function Fn(t) {
    if (t < 0 || t > Si) {
      const e = new Error(`Invalid DSL Method idx value: <${t}>
	Idx value must be a none negative value smaller than ${Si + 1}`);
      throw e.KNOWN_RECORDER_ERROR = true, e;
    }
  }
  class Sm {
    initPerformanceTracer(e) {
      if (_(e, "traceInitPerf")) {
        const n = e.traceInitPerf, r = typeof n == "number";
        this.traceInitMaxIdent = r ? n : 1 / 0, this.traceInitPerf = r ? n > 0 : n;
      } else this.traceInitMaxIdent = 0, this.traceInitPerf = Qe.traceInitPerf;
      this.traceInitIndent = -1;
    }
    TRACE_INIT(e, n) {
      if (this.traceInitPerf === true) {
        this.traceInitIndent++;
        const r = new Array(this.traceInitIndent + 1).join("	");
        this.traceInitIndent < this.traceInitMaxIdent && console.log(`${r}--> <${e}>`);
        const { time: s, value: i } = aa(n), a = s > 10 ? console.warn : console.log;
        return this.traceInitIndent < this.traceInitMaxIdent && a(`${r}<-- <${e}> time: ${s}ms`), this.traceInitIndent--, i;
      } else return n();
    }
  }
  function _m(t, e) {
    e.forEach((n) => {
      const r = n.prototype;
      Object.getOwnPropertyNames(r).forEach((s) => {
        if (s === "constructor") return;
        const i = Object.getOwnPropertyDescriptor(r, s);
        i && (i.get || i.set) ? Object.defineProperty(t.prototype, s, i) : t.prototype[s] = n.prototype[s];
      });
    });
  }
  const Bn = ls(At, "", NaN, NaN, NaN, NaN, NaN, NaN);
  Object.freeze(Bn);
  const Qe = Object.freeze({ recoveryEnabled: false, maxLookahead: 3, dynamicTokensEnabled: false, outputCst: true, errorMessageProvider: Ea, nodeLocationTracking: "none", traceInitPerf: false, skipValidations: false }), Dn = Object.freeze({ recoveryValueFunc: () => {
  }, resyncEnabled: true });
  var ne;
  (function(t) {
    t[t.INVALID_RULE_NAME = 0] = "INVALID_RULE_NAME", t[t.DUPLICATE_RULE_NAME = 1] = "DUPLICATE_RULE_NAME", t[t.INVALID_RULE_OVERRIDE = 2] = "INVALID_RULE_OVERRIDE", t[t.DUPLICATE_PRODUCTIONS = 3] = "DUPLICATE_PRODUCTIONS", t[t.UNRESOLVED_SUBRULE_REF = 4] = "UNRESOLVED_SUBRULE_REF", t[t.LEFT_RECURSION = 5] = "LEFT_RECURSION", t[t.NONE_LAST_EMPTY_ALT = 6] = "NONE_LAST_EMPTY_ALT", t[t.AMBIGUOUS_ALTS = 7] = "AMBIGUOUS_ALTS", t[t.CONFLICT_TOKENS_RULES_NAMESPACE = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE", t[t.INVALID_TOKEN_NAME = 9] = "INVALID_TOKEN_NAME", t[t.NO_NON_EMPTY_LOOKAHEAD = 10] = "NO_NON_EMPTY_LOOKAHEAD", t[t.AMBIGUOUS_PREFIX_ALTS = 11] = "AMBIGUOUS_PREFIX_ALTS", t[t.TOO_MANY_ALTS = 12] = "TOO_MANY_ALTS", t[t.CUSTOM_LOOKAHEAD_VALIDATION = 13] = "CUSTOM_LOOKAHEAD_VALIDATION";
  })(ne || (ne = {}));
  class hn {
    static performSelfAnalysis(e) {
      throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.");
    }
    performSelfAnalysis() {
      this.TRACE_INIT("performSelfAnalysis", () => {
        let e;
        this.selfAnalysisDone = true;
        const n = this.className;
        this.TRACE_INIT("toFastProps", () => {
          oa(this);
        }), this.TRACE_INIT("Grammar Recording", () => {
          try {
            this.enableRecording(), L(this.definedRulesNames, (s) => {
              const a = this[s].originalGrammarAction;
              let o;
              this.TRACE_INIT(`${s} Rule`, () => {
                o = this.topLevelRuleRecord(s, a);
              }), this.gastProductionsCache[s] = o;
            });
          } finally {
            this.disableRecording();
          }
        });
        let r = [];
        if (this.TRACE_INIT("Grammar Resolving", () => {
          r = Hp({ rules: K(this.gastProductionsCache) }), this.definitionErrors = this.definitionErrors.concat(r);
        }), this.TRACE_INIT("Grammar Validations", () => {
          if (U(r) && this.skipValidations === false) {
            const s = zp({ rules: K(this.gastProductionsCache), tokenTypes: K(this.tokensMap), errMsgProvider: pt, grammarName: n }), i = Cp({ lookaheadStrategy: this.lookaheadStrategy, rules: K(this.gastProductionsCache), tokenTypes: K(this.tokensMap), grammarName: n });
            this.definitionErrors = this.definitionErrors.concat(s, i);
          }
        }), U(this.definitionErrors) && (this.recoveryEnabled && this.TRACE_INIT("computeAllProdsFollows", () => {
          const s = _f(K(this.gastProductionsCache));
          this.resyncFollows = s;
        }), this.TRACE_INIT("ComputeLookaheadFunctions", () => {
          var s, i;
          (i = (s = this.lookaheadStrategy).initialize) === null || i === void 0 || i.call(s, { rules: K(this.gastProductionsCache) }), this.preComputeLookaheadFunctions(K(this.gastProductionsCache));
        })), !hn.DEFER_DEFINITION_ERRORS_HANDLING && !U(this.definitionErrors)) throw e = S(this.definitionErrors, (s) => s.message), new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`);
      });
    }
    constructor(e, n) {
      this.definitionErrors = [], this.selfAnalysisDone = false;
      const r = this;
      if (r.initErrorHandler(n), r.initLexerAdapter(), r.initLooksAhead(n), r.initRecognizerEngine(e, n), r.initRecoverable(n), r.initTreeBuilder(n), r.initContentAssist(), r.initGastRecorder(n), r.initPerformanceTracer(n), _(n, "ignoredIssues")) throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);
      this.skipValidations = _(n, "skipValidations") ? n.skipValidations : Qe.skipValidations;
    }
  }
  hn.DEFER_DEFINITION_ERRORS_HANDLING = false;
  _m(hn, [Zp, tm, dm, fm, mm, pm, gm, Em, ym, Sm]);
  class Rm extends hn {
    constructor(e, n = Qe) {
      const r = Z(n);
      r.outputCst = true, super(e, r);
    }
  }
  const Lm = A({ name: "WhiteSpace", pattern: / +/, group: X.SKIPPED }), Im = A({ name: "NewlineEscape", pattern: /\\\n/, group: X.SKIPPED, line_breaks: true }), Om = A({ name: "BlockComment", pattern: /\/\*[\s\S]*?\*\//, group: X.SKIPPED, line_breaks: true }), Nm = A({ name: "LineComment", pattern: /\/\/[^\n]*/, group: X.SKIPPED }), Ne = A({ name: "Newline", pattern: /\n/, line_breaks: true }), $a = A({ name: "Array", pattern: /array/ }), xr = A({ name: "Assert", pattern: /assert/ }), Fa = A({ name: "Bool", pattern: /bool/ }), Ba = A({ name: "Else", pattern: /else/ }), Da = A({ name: "False", pattern: /false/ }), ja = A({ name: "Float", pattern: /float/ }), Ga = A({ name: "Fn", pattern: /fn/ }), Wa = A({ name: "If", pattern: /if/ }), Mr = A({ name: "Image", pattern: /image/ }), Ka = A({ name: "Int", pattern: /int/ }), Pr = A({ name: "Let", pattern: /let/ }), Ha = A({ name: "Print", pattern: /print/ }), za = A({ name: "Read", pattern: /read/ }), qa = A({ name: "Return", pattern: /return/ }), Va = A({ name: "Show", pattern: /show/ }), Ya = A({ name: "Struct", pattern: /struct/ }), Xa = A({ name: "Sum", pattern: /sum/ }), Za = A({ name: "Then", pattern: /then/ }), Ja = A({ name: "Time", pattern: /time/ }), Ur = A({ name: "To", pattern: /to/ }), Qa = A({ name: "True", pattern: /true/ }), $r = A({ name: "Void", pattern: /void/ }), eo = A({ name: "Write", pattern: /write/ }), Te = A({ name: "Identifier", pattern: /[a-zA-Z][a-zA-Z0-9_]*/ }), to = [$a, xr, Fa, Ba, Da, ja, Ga, Wa, Mr, Ka, Pr, Ha, za, qa, Va, Ya, Xa, Za, Ja, Ur, Qa, $r, eo];
  for (const t of to) t.LONGER_ALT = Te;
  const no = A({ name: "FloatLiteral", pattern: /(?:\d+\.\d*|\d*\.\d+)/ }), ro = A({ name: "IntegerLiteral", pattern: /\d+/ }), ht = A({ name: "StringLiteral", pattern: /"[^\n"]*"/ }), so = A({ name: "AndAnd", pattern: /&&/ }), io = A({ name: "OrOr", pattern: /\|\|/ }), ao = A({ name: "LessEq", pattern: /<=/ }), oo = A({ name: "GreaterEq", pattern: />=/ }), co = A({ name: "EqEq", pattern: /==/ }), lo = A({ name: "BangEq", pattern: /!=/ }), uo = A({ name: "Plus", pattern: /\+/ }), Fr = A({ name: "Minus", pattern: /-/ }), ho = A({ name: "Star", pattern: /\*/ }), fo = A({ name: "Slash", pattern: /\// }), po = A({ name: "Percent", pattern: /%/ }), mo = A({ name: "Bang", pattern: /!/ }), go = A({ name: "Less", pattern: /</ }), Eo = A({ name: "Greater", pattern: />/ }), To = A({ name: "Dot", pattern: /\./ }), In = A({ name: "LParen", pattern: /\(/ }), On = A({ name: "RParen", pattern: /\)/ }), dt = A({ name: "LBracket", pattern: /\[/ }), ft = A({ name: "RBracket", pattern: /\]/ }), Nn = A({ name: "LBrace", pattern: /\{/ }), bn = A({ name: "RBrace", pattern: /\}/ }), Ee = A({ name: "Comma", pattern: /,/ }), Ht = A({ name: "Colon", pattern: /:/ }), Br = A({ name: "Equals", pattern: /=/ }), yo = [Lm, Im, Om, Nm, Ne, ...to, Te, no, ro, ht, so, io, ao, oo, co, lo, uo, Fr, ho, fo, po, mo, go, Eo, To, In, On, dt, ft, Nn, bn, Ee, Ht, Br], bm = new X(yo);
  function km(t) {
    const e = [];
    let n = false;
    for (const r of t) r.tokenType === Ne ? n || (e.push(r), n = true) : (e.push(r), n = false);
    return e;
  }
  function Cm(t) {
    const e = bm.tokenize(t);
    return e.tokens = km(e.tokens), e;
  }
  class vm extends Rm {
    constructor() {
      super(yo, { maxLookahead: 4 });
      const e = this;
      e.RULE("program", () => {
        e.MANY(() => e.CONSUME(Ne)), e.OPTION(() => {
          e.SUBRULE(e.command), e.MANY2(() => {
            e.CONSUME2(Ne), e.MANY3(() => e.CONSUME3(Ne)), e.OPTION2(() => {
              e.SUBRULE2(e.command);
            });
          });
        });
      }), e.RULE("command", () => {
        e.OR([{ ALT: () => e.SUBRULE(e.readCmd) }, { ALT: () => e.SUBRULE(e.writeCmd) }, { ALT: () => e.SUBRULE(e.printCmd) }, { ALT: () => e.SUBRULE(e.showCmd) }, { ALT: () => e.SUBRULE(e.timeCmd) }, { ALT: () => e.SUBRULE(e.structCmd) }, { ALT: () => e.SUBRULE(e.fnCmd) }, { ALT: () => e.SUBRULE(e.letCmd) }, { ALT: () => e.SUBRULE(e.assertCmd) }]);
      }), e.RULE("readCmd", () => {
        e.CONSUME(za), e.CONSUME(Mr), e.CONSUME(ht), e.CONSUME(Ur), e.SUBRULE(e.argument);
      }), e.RULE("writeCmd", () => {
        e.CONSUME(eo), e.CONSUME(Mr), e.SUBRULE(e.expr), e.CONSUME(Ur), e.CONSUME(ht);
      }), e.RULE("printCmd", () => {
        e.CONSUME(Ha), e.CONSUME(ht);
      }), e.RULE("showCmd", () => {
        e.CONSUME(Va), e.SUBRULE(e.expr);
      }), e.RULE("timeCmd", () => {
        e.CONSUME(Ja), e.SUBRULE(e.command);
      }), e.RULE("structCmd", () => {
        e.CONSUME(Ya), e.CONSUME(Te), e.CONSUME(Nn), e.CONSUME(Ne), e.MANY(() => {
          e.SUBRULE(e.structField), e.CONSUME2(Ne), e.MANY2(() => e.CONSUME3(Ne));
        }), e.CONSUME(bn);
      }), e.RULE("structField", () => {
        e.CONSUME(Te), e.CONSUME(Ht), e.SUBRULE(e.type);
      }), e.RULE("fnCmd", () => {
        e.CONSUME(Ga), e.CONSUME(Te), e.CONSUME(In), e.OPTION(() => {
          e.SUBRULE(e.binding), e.MANY(() => {
            e.CONSUME(Ee), e.SUBRULE2(e.binding);
          });
        }), e.CONSUME(On), e.CONSUME(Ht), e.SUBRULE(e.type), e.CONSUME(Nn), e.CONSUME(Ne), e.MANY2(() => {
          e.SUBRULE(e.statement), e.CONSUME2(Ne), e.MANY3(() => e.CONSUME3(Ne));
        }), e.CONSUME(bn);
      }), e.RULE("letCmd", () => {
        e.CONSUME(Pr), e.SUBRULE(e.lvalue), e.CONSUME(Br), e.SUBRULE(e.expr);
      }), e.RULE("assertCmd", () => {
        e.CONSUME(xr), e.SUBRULE(e.expr), e.CONSUME(Ee), e.CONSUME(ht);
      }), e.RULE("statement", () => {
        e.OR([{ ALT: () => e.SUBRULE(e.letStmt) }, { ALT: () => e.SUBRULE(e.assertStmt) }, { ALT: () => e.SUBRULE(e.returnStmt) }]);
      }), e.RULE("letStmt", () => {
        e.CONSUME(Pr), e.SUBRULE(e.lvalue), e.CONSUME(Br), e.SUBRULE(e.expr);
      }), e.RULE("assertStmt", () => {
        e.CONSUME(xr), e.SUBRULE(e.expr), e.CONSUME(Ee), e.CONSUME(ht);
      }), e.RULE("returnStmt", () => {
        e.CONSUME(qa), e.SUBRULE(e.expr);
      }), e.RULE("argument", () => {
        e.CONSUME(Te), e.OPTION(() => {
          e.CONSUME(dt), e.OPTION2(() => {
            e.CONSUME2(Te), e.MANY(() => {
              e.CONSUME(Ee), e.CONSUME3(Te);
            });
          }), e.CONSUME(ft);
        });
      }), e.RULE("lvalue", () => {
        e.SUBRULE(e.argument);
      }), e.RULE("binding", () => {
        e.SUBRULE(e.argument), e.CONSUME(Ht), e.SUBRULE(e.type);
      }), e.RULE("type", () => {
        e.SUBRULE(e.baseType), e.MANY(() => {
          e.CONSUME(dt), e.MANY2(() => e.CONSUME(Ee)), e.CONSUME(ft);
        });
      }), e.RULE("baseType", () => {
        e.OR([{ ALT: () => e.CONSUME(Ka) }, { ALT: () => e.CONSUME(Fa) }, { ALT: () => e.CONSUME(ja) }, { ALT: () => e.CONSUME($r) }, { ALT: () => e.CONSUME(Te) }]);
      }), e.RULE("expr", () => {
        e.OR([{ ALT: () => e.SUBRULE(e.ifExpr) }, { ALT: () => e.SUBRULE(e.arrayExpr) }, { ALT: () => e.SUBRULE(e.sumExpr) }, { ALT: () => e.SUBRULE(e.orExpr) }]);
      }), e.RULE("ifExpr", () => {
        e.CONSUME(Wa), e.SUBRULE(e.expr, { LABEL: "condition" }), e.CONSUME(Za), e.SUBRULE2(e.expr, { LABEL: "thenBranch" }), e.CONSUME(Ba), e.SUBRULE3(e.expr, { LABEL: "elseBranch" });
      }), e.RULE("loopBinding", () => {
        e.CONSUME(Te), e.CONSUME(Ht), e.SUBRULE(e.expr);
      }), e.RULE("arrayExpr", () => {
        e.CONSUME($a), e.CONSUME(dt), e.OPTION(() => {
          e.SUBRULE(e.loopBinding), e.MANY(() => {
            e.CONSUME(Ee), e.SUBRULE2(e.loopBinding);
          });
        }), e.CONSUME(ft), e.SUBRULE(e.expr, { LABEL: "body" });
      }), e.RULE("sumExpr", () => {
        e.CONSUME(Xa), e.CONSUME(dt), e.OPTION(() => {
          e.SUBRULE(e.loopBinding), e.MANY(() => {
            e.CONSUME(Ee), e.SUBRULE2(e.loopBinding);
          });
        }), e.CONSUME(ft), e.SUBRULE(e.expr, { LABEL: "body" });
      }), e.RULE("orExpr", () => {
        e.SUBRULE(e.andExpr, { LABEL: "lhs" }), e.MANY(() => {
          e.CONSUME(io), e.SUBRULE2(e.andExpr, { LABEL: "rhs" });
        });
      }), e.RULE("andExpr", () => {
        e.SUBRULE(e.compExpr, { LABEL: "lhs" }), e.MANY(() => {
          e.CONSUME(so), e.SUBRULE2(e.compExpr, { LABEL: "rhs" });
        });
      }), e.RULE("compExpr", () => {
        e.SUBRULE(e.addExpr, { LABEL: "lhs" }), e.MANY(() => {
          e.OR2([{ ALT: () => e.CONSUME(go) }, { ALT: () => e.CONSUME(Eo) }, { ALT: () => e.CONSUME(ao) }, { ALT: () => e.CONSUME(oo) }, { ALT: () => e.CONSUME(co) }, { ALT: () => e.CONSUME(lo) }]), e.SUBRULE2(e.addExpr, { LABEL: "rhs" });
        });
      }), e.RULE("addExpr", () => {
        e.SUBRULE(e.mulExpr, { LABEL: "lhs" }), e.MANY(() => {
          e.OR2([{ ALT: () => e.CONSUME(uo) }, { ALT: () => e.CONSUME(Fr) }]), e.SUBRULE2(e.mulExpr, { LABEL: "rhs" });
        });
      }), e.RULE("mulExpr", () => {
        e.SUBRULE(e.unaryExpr, { LABEL: "lhs" }), e.MANY(() => {
          e.OR2([{ ALT: () => e.CONSUME(ho) }, { ALT: () => e.CONSUME(fo) }, { ALT: () => e.CONSUME(po) }]), e.SUBRULE2(e.unaryExpr, { LABEL: "rhs" });
        });
      }), e.RULE("unaryExpr", () => {
        e.OR([{ ALT: () => {
          e.CONSUME(Fr), e.SUBRULE(e.unaryExpr, { LABEL: "operand" });
        } }, { ALT: () => {
          e.CONSUME(mo), e.SUBRULE2(e.unaryExpr, { LABEL: "operand" });
        } }, { ALT: () => e.SUBRULE(e.postfixExpr) }]);
      }), e.RULE("postfixExpr", () => {
        e.SUBRULE(e.primaryExpr), e.MANY(() => {
          e.OR2([{ ALT: () => {
            e.CONSUME(dt), e.SUBRULE(e.expr, { LABEL: "index" }), e.MANY2(() => {
              e.CONSUME(Ee), e.SUBRULE2(e.expr, { LABEL: "index" });
            }), e.CONSUME(ft);
          } }, { ALT: () => {
            e.CONSUME(To), e.CONSUME(Te, { LABEL: "field" });
          } }]);
        });
      }), e.RULE("primaryExpr", () => {
        e.OR([{ ALT: () => e.CONSUME(ro) }, { ALT: () => e.CONSUME(no) }, { ALT: () => e.CONSUME(Qa) }, { ALT: () => e.CONSUME(Da) }, { ALT: () => e.CONSUME($r) }, { ALT: () => e.CONSUME(ht) }, { ALT: () => {
          e.CONSUME(In), e.SUBRULE(e.expr), e.CONSUME(On);
        } }, { ALT: () => e.SUBRULE(e.arrayLiteral) }, { ALT: () => e.SUBRULE(e.identExpr) }]);
      }), e.RULE("arrayLiteral", () => {
        e.CONSUME(dt), e.OPTION(() => {
          e.SUBRULE(e.expr), e.MANY(() => {
            e.CONSUME(Ee), e.SUBRULE2(e.expr);
          });
        }), e.CONSUME(ft);
      }), e.RULE("identExpr", () => {
        e.CONSUME(Te), e.OPTION(() => {
          e.OR2([{ ALT: () => {
            e.CONSUME(Nn), e.OPTION2(() => {
              e.SUBRULE(e.expr), e.MANY(() => {
                e.CONSUME(Ee), e.SUBRULE2(e.expr);
              });
            }), e.CONSUME(bn);
          } }, { ALT: () => {
            e.CONSUME(In), e.OPTION3(() => {
              e.SUBRULE3(e.expr), e.MANY2(() => {
                e.CONSUME2(Ee), e.SUBRULE4(e.expr);
              });
            }), e.CONSUME(On);
          } }]);
        });
      }), this.performSelfAnalysis();
    }
  }
  const Er = new vm();
  function B(t, e) {
    return (t.children[e] || [])[0] || null;
  }
  function b(t, e) {
    return t.children[e] || [];
  }
  function wm(t, e) {
    return e.flatMap((n) => b(t, n).map((r) => ({ op: n, off: r.startOffset }))).sort((n, r) => n.off - r.off).map((n) => n.op);
  }
  function Ao(t) {
    return t ? typeof t.startOffset == "number" ? t.startOffset : Object.values(t.children || {}).flat().reduce((e, n) => Math.min(e, Ao(n)), 1 / 0) : 1 / 0;
  }
  function xm(t) {
    const e = t.children;
    return e.Int ? { kind: "int" } : e.Bool ? { kind: "bool" } : e.Float ? { kind: "float" } : e.Void ? { kind: "void" } : { kind: "named", name: e.Identifier[0].image };
  }
  function Dr(t) {
    const e = xm(B(t, "baseType")), n = b(t, "LBracket").length;
    if (n === 0) return e;
    const r = n + b(t, "Comma").length;
    return { kind: "array", elem: e, rank: r };
  }
  function fs(t) {
    const e = b(t, "Identifier"), n = b(t, "LBracket").length > 0;
    return { name: e[0].image, dims: n ? e.slice(1).map((r) => r.image) : [] };
  }
  function Mm(t) {
    return { arg: fs(B(t, "argument")), type: Dr(B(t, "type")) };
  }
  function Q(t) {
    return B(t, "ifExpr") ? Pm(B(t, "ifExpr")) : B(t, "arrayExpr") ? Um(B(t, "arrayExpr")) : B(t, "sumExpr") ? $m(B(t, "sumExpr")) : Fm(B(t, "orExpr"));
  }
  function Pm(t) {
    return { kind: "IfExpr", cond: Q(b(t, "condition")[0]), then: Q(b(t, "thenBranch")[0]), else: Q(b(t, "elseBranch")[0]) };
  }
  function So(t) {
    return { var: b(t, "Identifier")[0].image, bound: Q(B(t, "expr")) };
  }
  function Um(t) {
    return { kind: "ArrayExpr", bindings: b(t, "loopBinding").map(So), body: Q(b(t, "body")[0]) };
  }
  function $m(t) {
    return { kind: "SumExpr", bindings: b(t, "loopBinding").map(So), body: Q(b(t, "body")[0]) };
  }
  function dn(t, e, n, r, s, i) {
    const a = wm(t, r), o = b(t, n);
    let c = i(b(t, e)[0]);
    for (let l = 0; l < o.length; l++) c = { kind: "BinOp", op: s[a[l]], lhs: c, rhs: i(o[l]) };
    return c;
  }
  function Fm(t) {
    return dn(t, "lhs", "rhs", ["OrOr"], { OrOr: "||" }, Bm);
  }
  function Bm(t) {
    return dn(t, "lhs", "rhs", ["AndAnd"], { AndAnd: "&&" }, Dm);
  }
  function Dm(t) {
    const e = { Less: "<", Greater: ">", LessEq: "<=", GreaterEq: ">=", EqEq: "==", BangEq: "!=" };
    return dn(t, "lhs", "rhs", Object.keys(e), e, jm);
  }
  function jm(t) {
    return dn(t, "lhs", "rhs", ["Plus", "Minus"], { Plus: "+", Minus: "-" }, Gm);
  }
  function Gm(t) {
    return dn(t, "lhs", "rhs", ["Star", "Slash", "Percent"], { Star: "*", Slash: "/", Percent: "%" }, jr);
  }
  function jr(t) {
    return b(t, "Minus").length > 0 ? { kind: "UnaryOp", op: "-", operand: jr(b(t, "operand")[0]) } : b(t, "Bang").length > 0 ? { kind: "UnaryOp", op: "!", operand: jr(b(t, "operand")[0]) } : Wm(B(t, "postfixExpr"));
  }
  function Wm(t) {
    let e = Km(B(t, "primaryExpr"));
    const n = b(t, "LBracket"), r = b(t, "RBracket"), s = b(t, "Dot"), i = b(t, "field"), a = b(t, "index"), o = [];
    for (let c = 0; c < n.length; c++) {
      const l = n[c].startOffset, u = r[c].startOffset, h = a.filter((d) => {
        const p = Ao(d);
        return p > l && p < u;
      }).map(Q);
      o.push({ kind: "index", indices: h, offset: l });
    }
    for (let c = 0; c < s.length; c++) o.push({ kind: "field", field: i[c].image, offset: s[c].startOffset });
    o.sort((c, l) => c.offset - l.offset);
    for (const c of o) e = c.kind === "index" ? { kind: "Index", base: e, indices: c.indices } : { kind: "FieldAccess", base: e, field: c.field };
    return e;
  }
  function Km(t) {
    const e = t.children;
    if (e.IntegerLiteral) return { kind: "IntLit", value: parseInt(e.IntegerLiteral[0].image, 10) };
    if (e.FloatLiteral) return { kind: "FloatLit", value: parseFloat(e.FloatLiteral[0].image) };
    if (e.True) return { kind: "BoolLit", value: true };
    if (e.False) return { kind: "BoolLit", value: false };
    if (e.Void) return { kind: "VoidLit" };
    if (e.StringLiteral) return { kind: "StringLit", value: e.StringLiteral[0].image.slice(1, -1) };
    if (e.expr) return Q(e.expr[0]);
    if (e.arrayLiteral) return { kind: "ArrayLit", elements: b(e.arrayLiteral[0], "expr").map(Q) };
    if (e.identExpr) return Hm(e.identExpr[0]);
    throw new Error("Unknown primaryExpr");
  }
  function Hm(t) {
    const e = b(t, "Identifier")[0].image;
    return b(t, "LBrace").length > 0 ? { kind: "StructCtor", name: e, args: b(t, "expr").map(Q) } : b(t, "LParen").length > 0 ? { kind: "Call", callee: e, args: b(t, "expr").map(Q) } : { kind: "Var", name: e };
  }
  function zm(t) {
    const e = t.children;
    if (e.letStmt) return _o(e.letStmt[0], "LetStmt");
    if (e.assertStmt) return Ro(e.assertStmt[0], "AssertStmt");
    if (e.returnStmt) return { kind: "ReturnStmt", expr: Q(B(e.returnStmt[0], "expr")) };
    throw new Error("Unknown statement");
  }
  function _o(t, e) {
    return { kind: e, lvalue: fs(B(B(t, "lvalue"), "argument")), expr: Q(B(t, "expr")) };
  }
  function Ro(t, e) {
    return { kind: e, cond: Q(B(t, "expr")), msg: b(t, "StringLiteral")[0].image.slice(1, -1) };
  }
  function Lo(t) {
    const e = t.children;
    if (e.letCmd) return _o(e.letCmd[0], "LetCmd");
    if (e.assertCmd) return Ro(e.assertCmd[0], "AssertCmd");
    if (e.showCmd) return { kind: "ShowCmd", expr: Q(B(e.showCmd[0], "expr")) };
    if (e.printCmd) return { kind: "PrintCmd", msg: b(e.printCmd[0], "StringLiteral")[0].image.slice(1, -1) };
    if (e.timeCmd) return { kind: "TimeCmd", cmd: Lo(B(e.timeCmd[0], "command")) };
    if (e.readCmd) return { kind: "ReadCmd", filename: b(e.readCmd[0], "StringLiteral")[0].image.slice(1, -1), target: fs(B(e.readCmd[0], "argument")) };
    if (e.writeCmd) return { kind: "WriteCmd", expr: Q(B(e.writeCmd[0], "expr")), filename: b(e.writeCmd[0], "StringLiteral")[0].image.slice(1, -1) };
    if (e.structCmd) {
      const n = e.structCmd[0];
      return { kind: "StructCmd", name: b(n, "Identifier")[0].image, fields: b(n, "structField").map((r) => ({ name: b(r, "Identifier")[0].image, type: Dr(B(r, "type")) })) };
    }
    if (e.fnCmd) {
      const n = e.fnCmd[0];
      return { kind: "FnCmd", name: b(n, "Identifier")[0].image, params: b(n, "binding").map(Mm), retType: Dr(B(n, "type")), body: b(n, "statement").map(zm) };
    }
    throw new Error("Unknown command");
  }
  function qm(t) {
    return { kind: "Program", commands: b(t, "command").map(Lo) };
  }
  const st = { kind: "int" }, te = { kind: "float" }, Ot = { kind: "bool" }, Vm = { kind: "void" }, q = { kind: "error" };
  function bt(t, e) {
    return { kind: "array", elem: t, rank: e };
  }
  function Gr(t) {
    return { kind: "named", name: t };
  }
  function De(t, e) {
    return t.kind !== e.kind ? false : t.kind === "array" ? t.rank === e.rank && De(t.elem, e.elem) : t.kind === "named" ? t.name === e.name : true;
  }
  function w(t) {
    switch (t.kind) {
      case "int":
        return "int";
      case "float":
        return "float";
      case "bool":
        return "bool";
      case "void":
        return "void";
      case "error":
        return "<error>";
      case "named":
        return t.name;
      case "array":
        return `${w(t.elem)}[${",".repeat(t.rank - 1)}]`;
      default:
        return "<?>";
    }
  }
  function jn(t) {
    return t.kind === "int" || t.kind === "float";
  }
  class ps {
    constructor(e = null) {
      this.parent = e, this.vars = /* @__PURE__ */ new Map(), this.fns = /* @__PURE__ */ new Map(), this.structs = /* @__PURE__ */ new Map();
    }
    lookupVar(e) {
      var _a2;
      return this.vars.get(e) ?? ((_a2 = this.parent) == null ? void 0 : _a2.lookupVar(e)) ?? null;
    }
    lookupFn(e) {
      var _a2;
      return this.fns.get(e) ?? ((_a2 = this.parent) == null ? void 0 : _a2.lookupFn(e)) ?? null;
    }
    lookupStruct(e) {
      var _a2;
      return this.structs.get(e) ?? ((_a2 = this.parent) == null ? void 0 : _a2.lookupStruct(e)) ?? null;
    }
    isVisible(e) {
      return this.vars.has(e) || this.fns.has(e) || this.structs.has(e) || (this.parent ? this.parent.isVisible(e) : false);
    }
    child() {
      return new ps(this);
    }
  }
  function kn(t, e, n, r) {
    if (t.dims.length === 0) {
      n.isVisible(t.name) && r.push(`Name '${t.name}' already defined`), n.vars.set(t.name, e);
      return;
    }
    if (e.kind === "error") {
      n.vars.set(t.name, q);
      return;
    }
    if (e.kind !== "array") {
      r.push(`Cannot destructure non-array type ${w(e)} into ${t.name}[...]`), n.vars.set(t.name, q);
      return;
    }
    t.dims.length !== e.rank && r.push(`Binding ${t.name}[${t.dims.join(",")}] has ${t.dims.length} dim(s) but expression has rank ${e.rank}`), n.isVisible(t.name) && r.push(`Name '${t.name}' already defined`), n.vars.set(t.name, e);
    for (const s of t.dims) n.isVisible(s) && r.push(`Name '${s}' already defined`), n.vars.set(s, st);
  }
  function j(t, e, n) {
    switch (t.kind) {
      case "IntLit":
        return st;
      case "FloatLit":
        return te;
      case "BoolLit":
        return Ot;
      case "VoidLit":
        return Vm;
      case "StringLit":
        return { kind: "string" };
      case "Var": {
        const r = e.lookupVar(t.name);
        return r || n.push(`Undefined variable: ${t.name}`), r ?? q;
      }
      case "BinOp": {
        const r = j(t.lhs, e, n), s = j(t.rhs, e, n);
        return Ym(t.op, r, s, n);
      }
      case "UnaryOp": {
        const r = j(t.operand, e, n);
        return r.kind === "error" ? q : t.op === "-" ? (jn(r) || n.push(`Unary - requires numeric operand, got ${w(r)}`), r) : t.op === "!" ? (r.kind !== "bool" && n.push(`Unary ! requires bool, got ${w(r)}`), Ot) : q;
      }
      case "Index": {
        const r = j(t.base, e, n);
        for (const s of t.indices) {
          const i = j(s, e, n);
          i.kind !== "int" && i.kind !== "error" && n.push(`Array index must be int, got ${w(i)}`);
        }
        return r.kind === "array" ? (t.indices.length !== r.rank && n.push(`Rank-${r.rank} array indexed with ${t.indices.length} index(es)`), r.elem) : (r.kind !== "error" && n.push(`Cannot index non-array type ${w(r)}`), q);
      }
      case "FieldAccess": {
        const r = j(t.base, e, n);
        if (r.kind === "named") {
          const s = e.lookupStruct(r.name);
          if (!s) return n.push(`Unknown struct type: ${r.name}`), q;
          const i = s.find((a) => a.name === t.field);
          return i ? i.type : (n.push(`Struct ${r.name} has no field '${t.field}'`), q);
        }
        return r.kind !== "error" && n.push(`Field access on non-struct type ${w(r)}`), q;
      }
      case "Call": {
        const r = e.lookupFn(t.callee);
        if (!r) return n.push(`Undefined function: ${t.callee}`), q;
        t.args.length !== r.params.length && n.push(`${t.callee} expects ${r.params.length} arg(s), got ${t.args.length}`);
        for (let s = 0; s < t.args.length; s++) {
          const i = j(t.args[s], e, n);
          s < r.params.length && i.kind !== "error" && !De(i, r.params[s]) && n.push(`Arg ${s + 1} to ${t.callee}: expected ${w(r.params[s])}, got ${w(i)}`);
        }
        return r.ret;
      }
      case "StructCtor": {
        const r = e.lookupStruct(t.name);
        if (!r) return n.push(`Unknown struct type: ${t.name}`), q;
        t.args.length !== r.length && n.push(`Struct ${t.name} has ${r.length} field(s), got ${t.args.length} value(s)`);
        for (let s = 0; s < t.args.length; s++) {
          const i = j(t.args[s], e, n);
          s < r.length && i.kind !== "error" && !De(i, r[s].type) && n.push(`Field ${r[s].name} of ${t.name}: expected ${w(r[s].type)}, got ${w(i)}`);
        }
        return Gr(t.name);
      }
      case "IfExpr": {
        const r = j(t.cond, e, n);
        r.kind !== "bool" && r.kind !== "error" && n.push(`If condition must be bool, got ${w(r)}`);
        const s = j(t.then, e, n), i = j(t.else, e, n);
        return s.kind !== "error" && i.kind !== "error" && !De(s, i) && n.push(`If branches have mismatched types: ${w(s)} vs ${w(i)}`), s.kind !== "error" ? s : i;
      }
      case "ArrayLit": {
        if (t.elements.length === 0) return bt(q, 1);
        const r = t.elements.map((i) => j(i, e, n)), s = r[0];
        for (let i = 1; i < r.length; i++) r[i].kind !== "error" && !De(r[i], s) && n.push(`Array literal element ${i}: expected ${w(s)}, got ${w(r[i])}`);
        return bt(s, 1);
      }
      case "ArrayExpr": {
        if (t.bindings.length === 0) return n.push("Array expression requires at least one binding"), q;
        const r = e.child();
        Ri(t.bindings, r, n);
        const s = j(t.body, r, n);
        return bt(s, t.bindings.length);
      }
      case "SumExpr": {
        if (t.bindings.length === 0) return n.push("Sum expression requires at least one binding"), q;
        const r = e.child();
        Ri(t.bindings, r, n);
        const s = j(t.body, r, n);
        return s.kind !== "error" && !jn(s) && n.push(`Sum body must be numeric, got ${w(s)}`), s.kind !== "error" ? s : st;
      }
      default:
        return n.push(`Unknown expression kind: ${t.kind}`), q;
    }
  }
  function Ri(t, e, n) {
    for (const r of t) {
      const s = j(r.bound, e, n);
      s.kind !== "int" && s.kind !== "error" && n.push(`Loop bound must be int, got ${w(s)}`), e.isVisible(r.var) && n.push(`Name '${r.var}' already defined`), e.vars.set(r.var, st);
    }
  }
  function Ym(t, e, n, r) {
    return e.kind === "error" || n.kind === "error" ? q : ["+", "-", "*", "/", "%"].includes(t) ? jn(e) && De(e, n) ? e : (r.push(`Operator ${t} requires matching int/float, got ${w(e)} and ${w(n)}`), q) : ["<", ">", "<=", ">="].includes(t) ? (jn(e) && De(e, n) || r.push(`Operator ${t} requires matching numeric operands, got ${w(e)} and ${w(n)}`), Ot) : ["==", "!="].includes(t) ? (De(e, n) || r.push(`Operator ${t} requires same-type operands, got ${w(e)} and ${w(n)}`), Ot) : ["&&", "||"].includes(t) ? (e.kind !== "bool" && r.push(`Left operand of ${t} must be bool, got ${w(e)}`), n.kind !== "bool" && r.push(`Right operand of ${t} must be bool, got ${w(e)}`), Ot) : (r.push(`Unknown operator: ${t}`), q);
  }
  function Xm(t, e, n, r) {
    switch (t.kind) {
      case "LetStmt": {
        const s = j(t.expr, e, r);
        kn(t.lvalue, s, e, r);
        break;
      }
      case "AssertStmt": {
        const s = j(t.cond, e, r);
        s.kind !== "bool" && s.kind !== "error" && r.push(`Assert condition must be bool, got ${w(s)}`);
        break;
      }
      case "ReturnStmt": {
        const s = j(t.expr, e, r);
        s.kind !== "error" && !De(s, n) && r.push(`Return: expected ${w(n)}, got ${w(s)}`);
        break;
      }
      default:
        r.push(`Unknown statement kind: ${t.kind}`);
    }
  }
  function Io(t, e, n) {
    switch (t.kind) {
      case "LetCmd": {
        const r = j(t.expr, e, n);
        kn(t.lvalue, r, e, n);
        break;
      }
      case "ShowCmd":
        j(t.expr, e, n);
        break;
      case "PrintCmd":
        break;
      case "AssertCmd": {
        const r = j(t.cond, e, n);
        r.kind !== "bool" && r.kind !== "error" && n.push(`Assert condition must be bool, got ${w(r)}`);
        break;
      }
      case "ReadCmd": {
        const r = bt(Gr("rgba"), 2);
        kn(t.target, r, e, n);
        break;
      }
      case "WriteCmd": {
        const r = j(t.expr, e, n), s = bt(Gr("rgba"), 2);
        r.kind !== "error" && !De(r, s) && n.push(`write image expects rgba[,], got ${w(r)}`);
        break;
      }
      case "TimeCmd":
        Io(t.cmd, e, n);
        break;
      case "StructCmd": {
        e.isVisible(t.name) && n.push(`Name '${t.name}' already defined`), e.structs.set(t.name, t.fields.map((r) => ({ name: r.name, type: r.type })));
        break;
      }
      case "FnCmd": {
        e.isVisible(t.name) && n.push(`Name '${t.name}' already defined`), e.fns.set(t.name, { params: t.params.map((i) => i.type), ret: t.retType });
        const r = e.child(), s = t.retType;
        for (const i of t.params) kn(i.arg, i.type, r, n);
        for (const i of t.body) Xm(i, r, s, n);
        s.kind !== "void" && !t.body.some((i) => i.kind === "ReturnStmt") && n.push(`Function '${t.name}' must have at least one return statement`);
        break;
      }
      default:
        n.push(`Unknown command kind: ${t.kind}`);
    }
  }
  function Zm(t) {
    const e = [], n = new ps();
    for (const r of ["sqrt", "sin", "cos", "tan", "exp", "log", "abs", "floor", "ceil", "asin", "acos", "atan"]) n.fns.set(r, { params: [te], ret: te });
    n.fns.set("pow", { params: [te, te], ret: te }), n.fns.set("atan2", { params: [te, te], ret: te }), n.fns.set("to_float", { params: [st], ret: te }), n.fns.set("to_int", { params: [te], ret: st }), n.structs.set("rgba", [{ name: "r", type: te }, { name: "g", type: te }, { name: "b", type: te }, { name: "a", type: te }]), n.vars.set("args", bt(st, 1)), n.vars.set("argnum", st);
    for (const r of t.commands) Io(r, n, e);
    return e;
  }
  const V = { kind: "int" }, N = { kind: "float" }, mt = { kind: "bool" }, Oo = { kind: "void" }, ie = { kind: "error" };
  function gt(t, e) {
    return { kind: "array", elem: t, rank: e };
  }
  function St(t) {
    return { kind: "named", name: t };
  }
  function ms(t, e) {
    return !t || !e || t.kind !== e.kind ? false : t.kind === "array" ? t.rank === e.rank && ms(t.elem, e.elem) : t.kind === "named" ? t.name === e.name : true;
  }
  function kt(t) {
    switch (t.kind) {
      case "int":
        return "i64";
      case "float":
        return "f64";
      case "bool":
        return "i32";
      case "void":
        return "void";
      case "named":
        return `named:${t.name}`;
      case "array":
        return `arr:${kt(t.elem)}:${t.rank}`;
      default:
        return "err";
    }
  }
  function wt(t, e) {
    switch (t.kind) {
      case "int":
        return "i64";
      case "float":
        return "f64";
      case "bool":
        return "i32";
      case "void":
        return null;
      case "named":
        return { ref: e.structTypeId(t.name), nullable: true };
      case "array":
        return { ref: e.ensureArrayBindingType(t.elem, t.rank), nullable: true };
      default:
        return "i64";
    }
  }
  function Jm(t) {
    t.imports.push({ module: "host", name: "show_i64", as: "$host_show_i64", params: ["i64"], results: [] }, { module: "host", name: "show_f64", as: "$host_show_f64", params: ["f64"], results: [] }, { module: "host", name: "show_i32", as: "$host_show_i32", params: ["i32"], results: [] }, { module: "host", name: "show_ref", as: "$host_show_ref", params: [{ ref: "any", nullable: true }], results: [] }, { module: "host", name: "print_literal", as: "$host_print_literal", params: ["i64"], results: [] }, { module: "host", name: "assert_fail", as: "$host_assert_fail", params: ["i64"], results: [] }, { module: "host", name: "sqrt", as: "$sqrt", params: ["f64"], results: ["f64"] }, { module: "host", name: "sin", as: "$sin", params: ["f64"], results: ["f64"] }, { module: "host", name: "cos", as: "$cos", params: ["f64"], results: ["f64"] }, { module: "host", name: "tan", as: "$tan", params: ["f64"], results: ["f64"] }, { module: "host", name: "exp", as: "$exp", params: ["f64"], results: ["f64"] }, { module: "host", name: "log", as: "$log", params: ["f64"], results: ["f64"] }, { module: "host", name: "abs", as: "$abs", params: ["f64"], results: ["f64"] }, { module: "host", name: "floor", as: "$floor", params: ["f64"], results: ["f64"] }, { module: "host", name: "ceil", as: "$ceil", params: ["f64"], results: ["f64"] }, { module: "host", name: "asin", as: "$asin", params: ["f64"], results: ["f64"] }, { module: "host", name: "acos", as: "$acos", params: ["f64"], results: ["f64"] }, { module: "host", name: "atan", as: "$atan", params: ["f64"], results: ["f64"] }, { module: "host", name: "pow", as: "$pow", params: ["f64", "f64"], results: ["f64"] }, { module: "host", name: "atan2", as: "$atan2", params: ["f64", "f64"], results: ["f64"] }, { module: "host", name: "to_float", as: "$to_float", params: ["i64"], results: ["f64"] }, { module: "host", name: "to_int", as: "$to_int", params: ["f64"], results: ["i64"] });
  }
  function Qm(t, e, n, r) {
    for (const s of t.commands) s.kind === "StructCmd" && (r.set(s.name, s.fields), e.ensureStruct(s.name, s.fields.map((i) => ({ name: i.name, type: wt(i.type, e), mutability: "mut" }))));
    n.set("sqrt", { params: [N], ret: N }), n.set("sin", { params: [N], ret: N }), n.set("cos", { params: [N], ret: N }), n.set("tan", { params: [N], ret: N }), n.set("exp", { params: [N], ret: N }), n.set("log", { params: [N], ret: N }), n.set("abs", { params: [N], ret: N }), n.set("floor", { params: [N], ret: N }), n.set("ceil", { params: [N], ret: N }), n.set("asin", { params: [N], ret: N }), n.set("acos", { params: [N], ret: N }), n.set("atan", { params: [N], ret: N }), n.set("pow", { params: [N, N], ret: N }), n.set("atan2", { params: [N, N], ret: N }), n.set("to_float", { params: [V], ret: N }), n.set("to_int", { params: [N], ret: V });
    for (const s of t.commands) s.kind === "FnCmd" && n.set(s.name, { params: s.params.map((i) => i.type), ret: s.retType });
  }
  class No {
    constructor(e, n) {
      this.func = e, this.registry = n, this.localCounter = 0;
    }
    allocLocal(e, n) {
      const r = `$${e}_${this.localCounter++}`;
      return this.func.locals.push({ name: r, type: n }), r;
    }
  }
  function J(t, e, n, r) {
    var _a2, _b, _c2;
    switch (t.kind) {
      case "IntLit":
        return V;
      case "FloatLit":
        return N;
      case "BoolLit":
        return mt;
      case "VoidLit":
        return Oo;
      case "StringLit":
        return St("extern_string");
      case "Var":
        return ((_a2 = e.lookup(t.name)) == null ? void 0 : _a2.type) ?? ie;
      case "UnaryOp": {
        const s = J(t.operand, e, n, r);
        return t.op === "!" ? mt : s;
      }
      case "BinOp": {
        if (["&&", "||", "<", "<=", ">", ">=", "==", "!="].includes(t.op)) return mt;
        const s = J(t.lhs, e, n, r), i = J(t.rhs, e, n, r);
        return s.kind === "float" || i.kind === "float" ? N : V;
      }
      case "IfExpr": {
        const s = J(t.then, e, n, r), i = J(t.else, e, n, r);
        return ms(s, i) || s.kind !== "error" ? s : i;
      }
      case "Call":
        return ((_b = n.get(t.callee)) == null ? void 0 : _b.ret) ?? ie;
      case "StructCtor":
        return St(t.name);
      case "FieldAccess": {
        const s = J(t.base, e, n, r);
        return s.kind !== "named" ? ie : ((_c2 = (r.get(s.name) || []).find((a) => a.name === t.field)) == null ? void 0 : _c2.type) ?? ie;
      }
      case "ArrayLit":
        return t.elements.length === 0 ? gt(ie, 1) : gt(J(t.elements[0], e, n, r), 1);
      case "ArrayExpr": {
        const s = e.child();
        for (const a of t.bindings) s.set(a.var, { type: V });
        const i = J(t.body, s, n, r);
        return gt(i, Math.max(1, t.bindings.length));
      }
      case "SumExpr": {
        const s = e.child();
        for (const a of t.bindings) s.set(a.var, { type: V });
        return J(t.body, s, n, r);
      }
      case "Index": {
        const s = J(t.base, e, n, r);
        return s.kind === "array" ? s.elem : ie;
      }
      default:
        return ie;
    }
  }
  function eg(t, e) {
    const n = e.kind === "float";
    switch (t) {
      case "+":
        return n ? "f64.add" : "i64.add";
      case "-":
        return n ? "f64.sub" : "i64.sub";
      case "*":
        return n ? "f64.mul" : "i64.mul";
      case "/":
        return n ? "f64.div" : "i64.div_s";
      case "%":
        return n ? "f64.rem" : "i64.rem_s";
      case "<":
        return n ? "f64.lt" : "i64.lt_s";
      case "<=":
        return n ? "f64.le" : "i64.le_s";
      case ">":
        return n ? "f64.gt" : "i64.gt_s";
      case ">=":
        return n ? "f64.ge" : "i64.ge_s";
      case "==":
        return n ? "f64.eq" : "i64.eq";
      case "!=":
        return n ? "f64.ne" : "i64.ne";
      default:
        return "i64.add";
    }
  }
  function tg(t, e) {
    const n = t.strings.indexOf(e);
    return n >= 0 ? n : (t.strings.push(e), t.strings.length - 1);
  }
  function Zt(t, e, n) {
    const r = tg(t, e);
    n.push({ op: "string.const", value: e, index: r });
  }
  function bo(t, e, n, r) {
    r.push({ op: "local.get", local: t }), r.push({ op: "i64.const", value: 0 }), r.push({ op: "i64.gt_s" });
    const s = [];
    Zt(n, `array bound for '${e}' must be positive`, s), s.push({ op: "call", func: "$host_assert_fail" }), s.push({ op: "unreachable" }), r.push({ op: "if", then: [], else: s });
  }
  function gs(t, e, n, r) {
    if (e >= t.length) {
      r(n);
      return;
    }
    const s = t[e], i = `$exit_${e}_${s.var}`, a = `$loop_${e}_${s.var}`, o = [];
    o.push({ op: "local.get", local: s.indexLocal }), o.push({ op: "local.get", local: s.boundLocal }), o.push({ op: "i64.ge_s" }), o.push({ op: "br_if", label: i }), gs(t, e + 1, o, r), o.push({ op: "local.get", local: s.indexLocal }), o.push({ op: "i64.const", value: 1 }), o.push({ op: "i64.add" }), o.push({ op: "local.set", local: s.indexLocal }), o.push({ op: "br", label: a }), n.push({ op: "block", label: i, body: [{ op: "loop", label: a, body: o }] }), n.push({ op: "i64.const", value: 0 }), n.push({ op: "local.set", local: s.indexLocal });
  }
  function F(t, e, n, r, s) {
    var _a2, _b;
    const { registry: i, fnSigs: a, structFields: o } = s;
    switch (t.kind) {
      case "IntLit":
        return e.push({ op: "i64.const", value: t.value }), V;
      case "FloatLit":
        return e.push({ op: "f64.const", value: t.value }), N;
      case "BoolLit":
        return e.push({ op: "i32.const", value: t.value ? 1 : 0 }), mt;
      case "VoidLit":
        return Oo;
      case "StringLit":
        return e.push({ op: "string.const", value: t.value }), St("extern_string");
      case "Var": {
        const c = r.lookup(t.name);
        return c ? (e.push({ op: "local.get", local: c.local }), c.type) : (e.push({ op: "i64.const", value: 0 }), ie);
      }
      case "UnaryOp": {
        const c = F(t.operand, e, n, r, s);
        return t.op === "-" ? (c.kind === "float" ? e.push({ op: "f64.neg" }) : (e.push({ op: "i64.const", value: -1 }), e.push({ op: "i64.mul" })), c) : t.op === "!" ? (e.push({ op: "i32.eqz" }), mt) : ie;
      }
      case "BinOp": {
        if (t.op === "&&" || t.op === "||") {
          const h = [], d = [];
          return F(t.lhs, e, n, r, s), t.op === "&&" ? (F(t.rhs, h, n, r, s), d.push({ op: "i32.const", value: 0 })) : (h.push({ op: "i32.const", value: 1 }), F(t.rhs, d, n, r, s)), e.push({ op: "if", result: "i32", then: h, else: d }), mt;
        }
        const c = F(t.lhs, e, n, r, s), l = F(t.rhs, e, n, r, s), u = c.kind === "float" || l.kind === "float" ? N : c;
        return e.push({ op: eg(t.op, u) }), ["<", "<=", ">", ">=", "==", "!="].includes(t.op) ? mt : u;
      }
      case "IfExpr": {
        const c = [];
        F(t.cond, c, n, r, s), e.push(...c);
        const l = J(t.then, r, a, o), u = [], h = [];
        return F(t.then, u, n, r, s), F(t.else, h, n, r, s), e.push({ op: "if", result: wt(l, i), then: u, else: h }), l;
      }
      case "Call": {
        for (const c of t.args) F(c, e, n, r, s);
        return e.push({ op: "call", func: `$${t.callee}` }), ((_a2 = a.get(t.callee)) == null ? void 0 : _a2.ret) ?? ie;
      }
      case "StructCtor": {
        const c = i.structTypeId(t.name);
        for (const l of t.args) F(l, e, n, r, s);
        return e.push({ op: "struct.new", type: c }), St(t.name);
      }
      case "FieldAccess": {
        const c = F(t.base, e, n, r, s);
        if (c.kind !== "named") return ie;
        const l = o.get(c.name) || [], u = l.findIndex((d) => d.name === t.field), h = i.structTypeId(c.name);
        return e.push({ op: "struct.get", type: h, field: u < 0 ? 0 : u }), ((_b = l[u]) == null ? void 0 : _b.type) ?? ie;
      }
      case "ArrayLit": {
        const c = t.elements.length > 0 ? J(t.elements[0], r, a, o) : V, l = i.ensureArrayBindingType(c, 1), u = i.ensureArrayDataType(c);
        for (const d of t.elements) F(d, e, n, r, s);
        e.push({ op: "array.new_fixed", type: u, length: t.elements.length });
        const h = n.allocLocal("lit_data", { ref: u, nullable: false });
        return e.push({ op: "local.set", local: h }), e.push({ op: "i64.const", value: t.elements.length }), e.push({ op: "local.get", local: h }), e.push({ op: "struct.new", type: l }), gt(c, 1);
      }
      case "ArrayExpr":
        return rg(t, e, n, r, s);
      case "SumExpr":
        return sg(t, e, n, r, s);
      case "Index":
        return ng(t, e, n, r, s);
      default:
        return e.push({ op: "i64.const", value: 0 }), ie;
    }
  }
  function ng(t, e, n, r, s) {
    const { registry: i, fnSigs: a, structFields: o } = s, c = J(t.base, r, a, o);
    if (c.kind !== "array") return e.push({ op: "i64.const", value: 0 }), ie;
    const l = i.ensureArrayBindingType(c.elem, c.rank), u = i.ensureArrayDataType(c.elem), h = n.allocLocal("arr_binding", { ref: l, nullable: true }), d = n.allocLocal("arr_data", { ref: u, nullable: true }), p = n.allocLocal("arr_idx", "i64");
    if (F(t.base, e, n, r, s), e.push({ op: "local.set", local: h }), t.indices.length === 0) e.push({ op: "i64.const", value: 0 });
    else {
      F(t.indices[0], e, n, r, s);
      for (let f = 1; f < t.indices.length; f++) e.push({ op: "local.get", local: h }), e.push({ op: "struct.get", type: l, field: f }), e.push({ op: "i64.mul" }), F(t.indices[f], e, n, r, s), e.push({ op: "i64.add" });
    }
    return e.push({ op: "local.set", local: p }), e.push({ op: "local.get", local: h }), e.push({ op: "struct.get", type: l, field: c.rank }), e.push({ op: "local.set", local: d }), e.push({ op: "local.get", local: d }), e.push({ op: "local.get", local: p }), e.push({ op: "i32.wrap_i64" }), e.push({ op: "array.get", type: u }), c.elem;
  }
  function rg(t, e, n, r, s) {
    const { registry: i, fnSigs: a, structFields: o } = s, c = Math.max(1, t.bindings.length), l = r.child(), u = [];
    for (const m of t.bindings) {
      const g = n.allocLocal(`${m.var}_bound`, "i64");
      F(m.bound, e, n, r, s), e.push({ op: "local.set", local: g }), bo(g, m.var, s.module, e);
      const T = n.allocLocal(`${m.var}_idx`, "i64");
      e.push({ op: "i64.const", value: 0 }), e.push({ op: "local.set", local: T }), l.set(m.var, { local: T, type: V }), u.push({ var: m.var, boundLocal: g, indexLocal: T });
    }
    const h = J(t.body, l, a, o), d = i.ensureArrayBindingType(h, c), p = i.ensureArrayDataType(h), f = n.allocLocal("array_data", { ref: p, nullable: false }), y = n.allocLocal("array_total_len", "i64"), R = n.allocLocal("array_linear", "i64");
    e.push({ op: "i64.const", value: 1 });
    for (const m of u) e.push({ op: "local.get", local: m.boundLocal }), e.push({ op: "i64.mul" });
    e.push({ op: "local.set", local: y }), e.push({ op: "local.get", local: y }), e.push({ op: "i32.wrap_i64" }), e.push({ op: "array.new_default", type: p }), e.push({ op: "local.set", local: f }), e.push({ op: "i64.const", value: 0 }), e.push({ op: "local.set", local: R });
    const E = [];
    gs(u, 0, E, (m) => {
      const g = [];
      F(t.body, g, n, l, s), m.push({ op: "local.get", local: f }), m.push({ op: "local.get", local: R }), m.push({ op: "i32.wrap_i64" }), m.push(...g), m.push({ op: "array.set", type: p }), m.push({ op: "local.get", local: R }), m.push({ op: "i64.const", value: 1 }), m.push({ op: "i64.add" }), m.push({ op: "local.set", local: R });
    }), e.push(...E);
    for (const m of u) e.push({ op: "local.get", local: m.boundLocal });
    return e.push({ op: "local.get", local: f }), e.push({ op: "struct.new", type: d }), gt(h, c);
  }
  function sg(t, e, n, r, s) {
    const { fnSigs: i, structFields: a } = s, o = r.child(), c = [];
    for (const d of t.bindings) {
      const p = n.allocLocal(`${d.var}_bound`, "i64");
      F(d.bound, e, n, r, s), e.push({ op: "local.set", local: p }), bo(p, d.var, s.module, e);
      const f = n.allocLocal(`${d.var}_idx`, "i64");
      e.push({ op: "i64.const", value: 0 }), e.push({ op: "local.set", local: f }), o.set(d.var, { local: f, type: V }), c.push({ var: d.var, boundLocal: p, indexLocal: f });
    }
    const l = J(t.body, o, i, a), u = l.kind === "float" ? "f64" : "i64", h = n.allocLocal("sum_acc", u);
    return l.kind === "float" ? e.push({ op: "f64.const", value: 0 }) : e.push({ op: "i64.const", value: 0 }), e.push({ op: "local.set", local: h }), gs(c, 0, e, (d) => {
      d.push({ op: "local.get", local: h }), F(t.body, d, n, o, s), d.push({ op: l.kind === "float" ? "f64.add" : "i64.add" }), d.push({ op: "local.set", local: h });
    }), e.push({ op: "local.get", local: h }), l.kind === "float" ? N : V;
  }
  function ko(t, e, n, r, s) {
    const i = J(t.expr, r, s.fnSigs, s.structFields), a = wt(i, s.registry) ?? "i64", o = n.allocLocal(t.lvalue.name, a);
    if (F(t.expr, e, n, r, s), e.push({ op: "local.set", local: o }), r.set(t.lvalue.name, { local: o, type: i }), t.lvalue.dims.length > 0 && i.kind === "array") {
      const c = s.registry.ensureArrayBindingType(i.elem, i.rank);
      for (let l = 0; l < t.lvalue.dims.length; l++) {
        const u = t.lvalue.dims[l], h = n.allocLocal(u, "i64");
        e.push({ op: "local.get", local: o }), e.push({ op: "struct.get", type: c, field: l }), e.push({ op: "local.set", local: h }), r.set(u, { local: h, type: V });
      }
    }
  }
  function Co(t, e, n, r, s) {
    const i = [];
    F(t.cond, i, n, r, s), e.push(...i);
    const a = [];
    Zt(s.module, t.msg, a), a.push({ op: "call", func: "$host_assert_fail" }), a.push({ op: "unreachable" }), e.push({ op: "if", then: [], else: a });
  }
  function vo(t, e, n, r, s) {
    const { registry: i } = s;
    switch (t.kind) {
      case "LetCmd":
        ko(t, e, n, r, s);
        break;
      case "ShowCmd": {
        const a = F(t.expr, e, n, r, s);
        a.kind === "int" ? e.push({ op: "call", func: "$host_show_i64" }) : a.kind === "float" ? e.push({ op: "call", func: "$host_show_f64" }) : a.kind === "bool" ? e.push({ op: "call", func: "$host_show_i32" }) : e.push({ op: "call", func: "$host_show_ref" });
        break;
      }
      case "PrintCmd":
        Zt(s.module, t.msg, e), e.push({ op: "call", func: "$host_print_literal" });
        break;
      case "AssertCmd":
        Co(t, e, n, r, s);
        break;
      case "TimeCmd":
        e.push({ op: "call", func: "$host_time_start" }), vo(t.cmd, e, n, r, s), e.push({ op: "call", func: "$host_time_end" });
        break;
      case "ReadCmd": {
        const a = gt(St("rgba"), 2), o = i.ensureArrayBindingType(St("rgba"), 2), c = n.allocLocal(t.target.name, { ref: o, nullable: true });
        Zt(s.module, t.filename, e), e.push({ op: "call", func: "$host_read_image" }), e.push({ op: "local.set", local: c }), r.set(t.target.name, { local: c, type: a });
        for (let l = 0; l < t.target.dims.length; l++) {
          const u = t.target.dims[l], h = n.allocLocal(u, "i64");
          e.push({ op: "local.get", local: c }), e.push({ op: "struct.get", type: o, field: l }), e.push({ op: "local.set", local: h }), r.set(u, { local: h, type: V });
        }
        break;
      }
      case "WriteCmd": {
        F(t.expr, e, n, r, s), Zt(s.module, t.filename, e), e.push({ op: "call", func: "$host_write_image" });
        break;
      }
      case "StructCmd":
        break;
      case "FnCmd":
        break;
      default:
        e.push({ op: "todo.unknown_command", kind: t.kind });
        break;
    }
  }
  function ig(t, e, n, r, s, i) {
    switch (t.kind) {
      case "LetStmt":
        ko(t, e, n, r, s);
        break;
      case "AssertStmt":
        Co(t, e, n, r, s);
        break;
      case "ReturnStmt": {
        const a = F(t.expr, e, n, r, s);
        !ms(a, i) && i.kind !== "void" && e.push({ op: "todo.return_type_mismatch", expected: kt(i), got: kt(a) }), e.push({ op: "return" });
        break;
      }
      default:
        e.push({ op: "todo.unknown_statement", kind: t.kind });
        break;
    }
  }
  class ar {
    constructor(e = null) {
      this.parent = e, this.vars = /* @__PURE__ */ new Map();
    }
    child() {
      return new ar(this);
    }
    set(e, n) {
      this.vars.set(e, n);
    }
    lookup(e) {
      var _a2;
      return this.vars.get(e) ?? ((_a2 = this.parent) == null ? void 0 : _a2.lookup(e)) ?? null;
    }
  }
  function ag(t, e, n) {
    var _a2, _b, _c2;
    const r = t.params.map((c) => ({ name: `$${c.arg.name}`, type: wt(c.type, n.registry), jplType: c.type })), s = wt(t.retType, n.registry), i = { name: `$${t.name}`, export: t.name, params: r.map((c) => ({ name: c.name, type: c.type })), results: s ? [s] : [], locals: [], body: [] }, a = new No(i, n.registry), o = new ar();
    for (const c of r) if (o.set(c.name.slice(1), { local: c.name, type: c.jplType }), c.jplType.kind === "array" && ((_c2 = (_b = (_a2 = t.params.find((l) => l.arg.name === c.name.slice(1))) == null ? void 0 : _a2.arg) == null ? void 0 : _b.dims) == null ? void 0 : _c2.length) > 0) {
      const l = t.params.find((h) => h.arg.name === c.name.slice(1)).arg.dims, u = n.registry.ensureArrayBindingType(c.jplType.elem, c.jplType.rank);
      for (let h = 0; h < l.length; h++) {
        const d = a.allocLocal(l[h], "i64");
        i.body.push({ op: "local.get", local: c.name }), i.body.push({ op: "struct.get", type: u, field: h }), i.body.push({ op: "local.set", local: d }), o.set(l[h], { local: d, type: V });
      }
    }
    for (const c of t.body) ig(c, i.body, a, o, n, t.retType);
    e.funcs.push(i);
  }
  class og {
    constructor(e) {
      this.module = e, this.structIds = /* @__PURE__ */ new Map(), this.arrayDataIds = /* @__PURE__ */ new Map(), this.arrayBindingIds = /* @__PURE__ */ new Map();
    }
    structTypeId(e) {
      return this.structIds.get(e) ?? `$${e}`;
    }
    ensureStruct(e, n) {
      if (this.structIds.has(e)) return this.structIds.get(e);
      const r = `$${e}`;
      return this.structIds.set(e, r), this.module.types.push({ id: r, kind: "struct", fields: n }), r;
    }
    ensureArrayDataType(e) {
      const n = kt(e);
      if (this.arrayDataIds.has(n)) return this.arrayDataIds.get(n);
      const r = `$jpl_data_${n.replace(/[^a-zA-Z0-9_]/g, "_")}`;
      return this.arrayDataIds.set(n, r), this.module.types.push({ id: r, kind: "array", element: wt(e, this), mutability: "mut" }), r;
    }
    ensureArrayBindingType(e, n) {
      const r = `${kt(e)}#${n}`;
      if (this.arrayBindingIds.has(r)) return this.arrayBindingIds.get(r);
      const s = this.ensureArrayDataType(e), i = `$jpl_arr_r${n}_${kt(e).replace(/[^a-zA-Z0-9_]/g, "_")}`, a = [];
      for (let o = 0; o < n; o++) a.push({ name: `d${o + 1}`, type: "i64", mutability: "mut" });
      return a.push({ name: "data", type: { ref: s, nullable: true }, mutability: "mut" }), this.arrayBindingIds.set(r, i), this.module.types.push({ id: i, kind: "struct", fields: a }), i;
    }
  }
  function cg(t, e = {}) {
    const n = { kind: "Wasm3ModuleIR", wasmVersion: "3.0", features: ["gc", "typed-function-references"], imports: [], types: [], funcs: [], strings: [] };
    Jm(n);
    const r = new og(n), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
    Qm(t, r, s, i), r.ensureStruct("rgba", [{ name: "r", type: "f64", mutability: "mut" }, { name: "g", type: "f64", mutability: "mut" }, { name: "b", type: "f64", mutability: "mut" }, { name: "a", type: "f64", mutability: "mut" }]), i.set("rgba", [{ name: "r", type: N }, { name: "g", type: N }, { name: "b", type: N }, { name: "a", type: N }]), n.imports.push({ module: "host", name: "time_start", as: "$host_time_start", params: [], results: [] }, { module: "host", name: "time_end", as: "$host_time_end", params: [], results: [] });
    const a = t.commands.some((E) => E.kind === "ReadCmd" || E.kind === "WriteCmd");
    if (n.hasImageIO = a, a) {
      const E = r.ensureArrayBindingType(St("rgba"), 2);
      n.imports.push({ module: "host", name: "read_image", as: "$host_read_image", params: ["i64"], results: [{ ref: E, nullable: true }] }, { module: "host", name: "write_image", as: "$host_write_image", params: [{ ref: E, nullable: true }, "i64"], results: [] });
    }
    const o = { registry: r, fnSigs: s, structFields: i, module: n };
    for (const E of t.commands) E.kind === "FnCmd" && ag(E, n, o);
    const c = { name: "$main", export: "main", params: [], results: [], locals: [], body: [] }, l = new No(c, r), u = new ar(), h = e.args || [], d = r.ensureArrayDataType(V), p = r.ensureArrayBindingType(V, 1), f = l.allocLocal("args_data", { ref: d, nullable: true }), y = l.allocLocal("args", { ref: p, nullable: true }), R = l.allocLocal("argnum", "i64");
    for (const E of h) c.body.push({ op: "i64.const", value: E });
    c.body.push({ op: "array.new_fixed", type: d, length: h.length }), c.body.push({ op: "local.set", local: f }), c.body.push({ op: "i64.const", value: h.length }), c.body.push({ op: "local.get", local: f }), c.body.push({ op: "struct.new", type: p }), c.body.push({ op: "local.set", local: y }), c.body.push({ op: "i64.const", value: h.length }), c.body.push({ op: "local.set", local: R }), u.set("args", { local: y, type: gt(V, 1) }), u.set("argnum", { local: R, type: V });
    for (const E of t.commands) E.kind === "FnCmd" || E.kind === "StructCmd" || vo(E, c.body, l, u, o);
    return n.funcs.push(c), n;
  }
  function lg(t) {
    const e = Cm(t);
    return e.errors.length > 0 ? { cst: null, lexErrors: e.errors, parseErrors: [] } : (Er.input = e.tokens, { cst: Er.program(), lexErrors: e.errors, parseErrors: Er.errors });
  }
  function ug(t) {
    const e = [];
    for (const n of t.lexErrors) e.push(`Lex error at ${n.line}:${n.column}: ${n.message}`);
    for (const n of t.parseErrors) {
      const r = n.token, s = r ? `${r.startLine}:${r.startColumn}` : "?";
      e.push(`Parse error at ${s}: ${n.message}`);
    }
    return e;
  }
  function k(t) {
    return "  ".repeat(t);
  }
  function Gn(t) {
    return JSON.stringify(t);
  }
  function Be(t) {
    return t ? typeof t == "string" ? t : t.ref ? t.nullable ? `(ref null ${t.ref})` : `(ref ${t.ref})` : "i64" : "";
  }
  function hg(t, e) {
    if (t.kind === "array") {
      const r = Be(t.element);
      return `${k(e)}(type ${t.id} (array (${t.mutability} ${r})))`;
    }
    const n = t.fields.map((r) => `${k(e + 1)}(field $${r.name} (${r.mutability} ${Be(r.type)}))`).join(`
`);
    return n.length === 0 ? `${k(e)}(type ${t.id} (struct))` : `${k(e)}(type ${t.id} (struct
${n}
${k(e)}))`;
  }
  function dg(t, e) {
    const n = (t.params || []).map((i) => `(param ${Be(i)})`).join(" "), r = (t.results || []).map((i) => `(result ${Be(i)})`).join(" "), s = [n, r].filter(Boolean).join(" ");
    return `${k(e)}(import ${Gn(t.module)} ${Gn(t.name)} (func ${t.as}${s ? ` ${s}` : ""}))`;
  }
  function zt(t, e, n, r) {
    const s = (i) => r ? i : n.get(i) ?? i;
    switch (t.op) {
      case "i64.const":
      case "f64.const":
      case "i32.const":
        return `${k(e)}${t.op} ${t.value}`;
      case "local.get":
      case "local.set":
        return `${k(e)}${t.op} ${s(t.local)}`;
      case "call":
        return `${k(e)}call ${t.func}`;
      case "br":
      case "br_if":
        return `${k(e)}${t.op} ${t.label}`;
      case "return":
      case "unreachable":
      case "i64.add":
      case "i64.sub":
      case "i64.mul":
      case "i64.div_s":
      case "i64.rem_s":
      case "i64.lt_s":
      case "i64.le_s":
      case "i64.gt_s":
      case "i64.ge_s":
      case "i64.eq":
      case "i64.ne":
      case "f64.add":
      case "f64.sub":
      case "f64.mul":
      case "f64.div":
      case "f64.lt":
      case "f64.le":
      case "f64.gt":
      case "f64.ge":
      case "f64.eq":
      case "f64.ne":
      case "f64.neg":
      case "i32.eqz":
      case "i32.wrap_i64":
        return `${k(e)}${t.op}`;
      case "f64.rem":
        return `${k(e)};; non-standard op
${k(e)}f64.div`;
      case "ref.null":
        return `${k(e)}ref.null ${t.type || "any"}`;
      case "struct.new":
        return `${k(e)}struct.new ${t.type}`;
      case "struct.get":
        return `${k(e)}struct.get ${t.type} ${t.field}`;
      case "array.new_fixed":
        return `${k(e)}array.new_fixed ${t.type} ${t.length}`;
      case "array.new_default":
        return `${k(e)}array.new_default ${t.type}`;
      case "array.get":
        return `${k(e)}array.get ${t.type}`;
      case "array.set":
        return `${k(e)}array.set ${t.type}`;
      case "string.const":
        return `${k(e)}i64.const ${t.index}   ;; ${Gn(t.value)}`;
      case "if": {
        const i = t.result ? ` (result ${Be(t.result)})` : "", a = (t.then || []).map((l) => zt(l, e + 1, n, r)).join(`
`), o = (t.else || []).map((l) => zt(l, e + 1, n, r)).join(`
`), c = [`${k(e)}if${i}`];
        return a && c.push(a), c.push(`${k(e)}else`), o && c.push(o), c.push(`${k(e)}end`), c.join(`
`);
      }
      case "block": {
        const i = (t.body || []).map((a) => zt(a, e + 1, n, r)).join(`
`);
        return `${k(e)}block ${t.label}
${i}
${k(e)}end`;
      }
      case "loop": {
        const i = (t.body || []).map((a) => zt(a, e + 1, n, r)).join(`
`);
        return `${k(e)}loop ${t.label}
${i}
${k(e)}end`;
      }
      default:
        return (t.op || "").startsWith("todo.") ? `${k(e)}nop ;; ${t.op}` : `${k(e)}nop ;; unknown ${t.op}`;
    }
  }
  function fg(t, e, n) {
    const r = [`(func ${t.name}`], s = /* @__PURE__ */ new Map();
    let i = 0;
    t.export && r.push(`(export ${Gn(t.export)})`);
    for (const o of t.params || []) s.set(o.name, i++), n ? r.push(`(param ${o.name} ${Be(o.type)})`) : r.push(`(param ${Be(o.type)})`);
    for (const o of t.results || []) r.push(`(result ${Be(o)})`);
    const a = [`${k(e)}${r.join(" ")}`];
    for (const o of t.locals || []) s.set(o.name, i++), n ? a.push(`${k(e + 1)}(local ${o.name} ${Be(o.type)})`) : a.push(`${k(e + 1)}(local ${Be(o.type)})`);
    for (const o of t.body || []) a.push(zt(o, e + 1, s, n));
    return a.push(`${k(e)})`), a.join(`
`);
  }
  function pg(t, e = {}) {
    const n = !!e.namedVars, r = ["(module"];
    r.push(`${k(1)};; generated from Wasm3ModuleIR`), r.push(`${k(1)};; features: ${(t.features || []).join(", ")}`);
    for (const s of t.types || []) r.push(hg(s, 1));
    for (const s of t.imports || []) r.push(dg(s, 1));
    for (const s of t.funcs || []) r.push(fg(s, 1, n));
    return r.push(")"), `${r.join(`
`)}
`;
  }
  function mg(t, e = {}) {
    const n = { ok: false, ast: null, ir: null, wat: "", strings: [], hasImageIO: false, diagnostics: [] };
    let r, s;
    try {
      r = lg(t), s = ug(r);
    } catch (l) {
      return { ...n, diagnostics: [{ kind: "parse", message: Tn(l) }] };
    }
    if (s.length > 0) return { ...n, diagnostics: s.map(gg) };
    let i;
    try {
      i = qm(r.cst);
    } catch (l) {
      return { ...n, diagnostics: [{ kind: "parse", message: Tn(l) }] };
    }
    let a;
    try {
      a = Zm(i);
    } catch (l) {
      return { ...n, ast: i, diagnostics: [{ kind: "type", message: Tn(l) }] };
    }
    if (a.length > 0) return { ...n, ast: i, diagnostics: a.map((l) => ({ kind: "type", message: l })) };
    let o, c;
    try {
      o = cg(i, { args: e.args ?? [] }), c = pg(o, { namedVars: e.namedVars ?? false });
    } catch (l) {
      return { ...n, ast: i, diagnostics: [{ kind: "type", message: Tn(l) }] };
    }
    return { ok: true, ast: i, ir: o, wat: c, strings: o.strings ?? [], hasImageIO: o.hasImageIO ?? false, diagnostics: [] };
  }
  function Tn(t) {
    return t instanceof Error ? t.message : String(t);
  }
  function gg(t) {
    const e = t.match(/^(?:Lex|Parse) error at (\d+):(\d+): (.+)$/);
    return e ? { kind: t.startsWith("Lex") ? "lex" : "parse", message: e[3], line: parseInt(e[1], 10), column: parseInt(e[2], 10) } : { kind: "parse", message: t };
  }
  function v(t) {
    const e = [];
    do {
      let n = t & 127;
      t >>>= 7, t !== 0 && (n |= 128), e.push(n);
    } while (t !== 0);
    return e;
  }
  function wo(t) {
    const e = [];
    let n = true;
    for (; n; ) {
      let r = t & 127;
      t >>= 7;
      const s = (r & 64) !== 0;
      t === 0 && !s || t === -1 && s ? n = false : r |= 128, e.push(r);
    }
    return e;
  }
  function Li(t) {
    return wo(t);
  }
  function Eg(t) {
    const e = new ArrayBuffer(8);
    return new DataView(e).setFloat64(0, t, true), Array.from(new Uint8Array(e));
  }
  function Ii(t) {
    return [...v(t.length), ...t.flat()];
  }
  function jt(t, e) {
    return [t, ...v(e.length), ...e];
  }
  function Tr(t) {
    const e = new TextEncoder().encode(t);
    return [...v(e.length), ...e];
  }
  function qt(t, e) {
    if (typeof t == "string") {
      if (t === "i64") return [126];
      if (t === "f64") return [124];
      if (t === "i32") return [127];
      throw new Error(`Unknown valtype string: ${t}`);
    }
    const n = t;
    if (n.ref === "any") return [110];
    const r = e(n.ref);
    return n.nullable ? [99, ...v(r)] : [100, ...v(r)];
  }
  function Tg(t, e) {
    return JSON.stringify({ params: t, results: e });
  }
  function yg(t) {
    const e = t.types ?? [], n = /* @__PURE__ */ new Map();
    e.forEach((O, M) => n.set(O.id, M));
    const r = (O) => {
      const M = n.get(O);
      if (M === void 0) throw new Error(`Unknown type: ${O}`);
      return M;
    }, s = [], i = [], a = /* @__PURE__ */ new Map();
    function o(O, M) {
      const Ue = Tg(O, M);
      if (a.has(Ue)) return a.get(Ue);
      const Ye = e.length + s.length;
      return s.push(Ue), i.push({ params: O, results: M }), a.set(Ue, Ye), Ye;
    }
    const c = t.imports ?? [], l = c.map((O) => o(O.params ?? [], O.results ?? [])), u = t.funcs ?? [], h = u.map((O) => o((O.params ?? []).map((M) => M.type), O.results ?? [])), d = /* @__PURE__ */ new Map();
    c.forEach((O, M) => {
      d.set(O.as, M);
    }), u.forEach((O, M) => {
      d.set(O.name, c.length + M);
    });
    const p = e.length + i.length, f = [];
    f.push(...v(p));
    for (const O of e) if (O.kind === "struct") {
      f.push(95), f.push(...v(O.fields.length));
      for (const M of O.fields) f.push(...qt(M.type, r)), f.push(M.mutability === "mut" ? 1 : 0);
    } else if (O.kind === "array") f.push(94), f.push(...qt(O.element, r)), f.push(O.mutability === "mut" ? 1 : 0);
    else throw new Error(`Unknown GC type kind: ${O.kind}`);
    for (const O of i) {
      f.push(96), f.push(...v(O.params.length));
      for (const M of O.params) f.push(...qt(M, r));
      f.push(...v(O.results.length));
      for (const M of O.results) f.push(...qt(M, r));
    }
    const y = jt(1, f), R = c.map((O, M) => {
      const Ue = Tr(O.module), Ye = Tr(O.name), $e = v(l[M]);
      return [...Ue, ...Ye, 0, ...$e];
    }), E = jt(2, Ii(R)), m = jt(3, [...v(u.length), ...u.flatMap((O, M) => v(h[M]))]), g = u.findIndex((O) => O.name === "$main");
    if (g === -1) throw new Error("No $main function in IR");
    const T = c.length + g, x = jt(7, [...v(1), ...Tr("main"), 0, ...v(T)]), le = u.map((O) => Ag(O, d, r)), Pe = jt(10, Ii(le)), Ve = [0, 97, 115, 109], lt = [1, 0, 0, 0];
    return new Uint8Array([...Ve, ...lt, ...y, ...E, ...m, ...x, ...Pe]);
  }
  function Ag(t, e, n) {
    const r = /* @__PURE__ */ new Map();
    let s = 0;
    for (const u of t.params ?? []) r.set(u.name, s++);
    for (const u of t.locals ?? []) r.set(u.name, s++);
    const i = [], a = t.locals ?? [];
    i.push(...v(a.length));
    for (const u of a) i.push(...v(1)), i.push(...qt(u.type, n));
    const o = [], c = Vt(t.body ?? [], r, e, n, o);
    c.push(11);
    const l = [...i, ...c];
    return [...v(l.length), ...l];
  }
  function Vt(t, e, n, r, s) {
    const i = [];
    for (const a of t) Sg(a, i, e, n, r, s);
    return i;
  }
  function Sg(t, e, n, r, s, i) {
    const a = t.op;
    switch (a) {
      case "unreachable":
        e.push(0);
        break;
      case "return":
        e.push(15);
        break;
      case "block": {
        e.push(2), e.push(64);
        const o = t.label;
        i.push(o);
        const c = Vt(t.body, n, r, s, i);
        e.push(...c), e.push(11), i.pop();
        break;
      }
      case "loop": {
        e.push(3), e.push(64);
        const o = t.label;
        i.push(o);
        const c = Vt(t.body, n, r, s, i);
        e.push(...c), e.push(11), i.pop();
        break;
      }
      case "if": {
        e.push(4);
        const o = t.result;
        if (!o) e.push(64);
        else if (o === "i64") e.push(126);
        else if (o === "i32") e.push(127);
        else if (o === "f64") e.push(124);
        else throw new Error(`Unknown if result type: ${o}`);
        i.push(null);
        const c = Vt(t.then ?? [], n, r, s, i);
        if (e.push(...c), t.else && t.else.length > 0) {
          e.push(5);
          const l = Vt(t.else, n, r, s, i);
          e.push(...l);
        }
        e.push(11), i.pop();
        break;
      }
      case "br": {
        e.push(12), e.push(...v(Oi(t.label, i)));
        break;
      }
      case "br_if": {
        e.push(13), e.push(...v(Oi(t.label, i)));
        break;
      }
      case "call": {
        const o = r.get(t.func);
        if (o === void 0) throw new Error(`Unknown function: ${t.func}`);
        e.push(16, ...v(o));
        break;
      }
      case "local.get": {
        const o = n.get(t.local);
        if (o === void 0) throw new Error(`Unknown local: ${t.local}`);
        e.push(32, ...v(o));
        break;
      }
      case "local.set": {
        const o = n.get(t.local);
        if (o === void 0) throw new Error(`Unknown local: ${t.local}`);
        e.push(33, ...v(o));
        break;
      }
      case "i32.const":
        e.push(65, ...wo(t.value));
        break;
      case "i64.const":
        e.push(66, ...Li(t.value));
        break;
      case "string.const":
        e.push(66, ...Li(t.index));
        break;
      case "f64.const":
        e.push(68, ...Eg(t.value));
        break;
      case "i32.eqz":
        e.push(69);
        break;
      case "i32.wrap_i64":
        e.push(167);
        break;
      case "i64.eq":
        e.push(81);
        break;
      case "i64.ne":
        e.push(82);
        break;
      case "i64.lt_s":
        e.push(83);
        break;
      case "i64.gt_s":
        e.push(85);
        break;
      case "i64.le_s":
        e.push(87);
        break;
      case "i64.ge_s":
        e.push(89);
        break;
      case "i64.add":
        e.push(124);
        break;
      case "i64.sub":
        e.push(125);
        break;
      case "i64.mul":
        e.push(126);
        break;
      case "i64.div_s":
        e.push(127);
        break;
      case "i64.rem_s":
        e.push(129);
        break;
      case "f64.eq":
        e.push(97);
        break;
      case "f64.ne":
        e.push(98);
        break;
      case "f64.lt":
        e.push(99);
        break;
      case "f64.gt":
        e.push(100);
        break;
      case "f64.le":
        e.push(101);
        break;
      case "f64.ge":
        e.push(102);
        break;
      case "f64.neg":
        e.push(154);
        break;
      case "f64.add":
        e.push(160);
        break;
      case "f64.sub":
        e.push(161);
        break;
      case "f64.mul":
        e.push(162);
        break;
      case "f64.div":
        e.push(163);
        break;
      case "struct.new": {
        e.push(251, 0, ...v(s(t.type)));
        break;
      }
      case "struct.get": {
        e.push(251, 2, ...v(s(t.type)), ...v(t.field));
        break;
      }
      case "struct.set": {
        e.push(251, 5, ...v(s(t.type)), ...v(t.field));
        break;
      }
      case "array.new_default": {
        e.push(251, 7, ...v(s(t.type)));
        break;
      }
      case "array.new_fixed": {
        e.push(251, 8, ...v(s(t.type)), ...v(t.length));
        break;
      }
      case "array.get": {
        e.push(251, 11, ...v(s(t.type)));
        break;
      }
      case "array.set": {
        e.push(251, 14, ...v(s(t.type)));
        break;
      }
      default:
        throw new Error(`Unknown IR op: ${a}`);
    }
  }
  function Oi(t, e) {
    for (let n = e.length - 1; n >= 0; n--) if (e[n] === t) return e.length - 1 - n;
    throw new Error(`Unknown label: ${t}. Stack: [${e.join(", ")}]`);
  }
  class _g extends EventTarget {
    constructor() {
      super(...arguments);
      __publicField(this, "_state", "idle");
      __publicField(this, "_cancelFlag", false);
    }
    get state() {
      return this._state;
    }
    _setState(e) {
      this._state !== e && (this._state = e, this.dispatchEvent(Object.assign(new Event("statechange"), { detail: { state: e } })));
    }
    async run(e, n) {
      if (this._state === "running" || this._state === "suspended") throw new Error("Runtime is already active \u2014 call cancel() first.");
      this._cancelFlag = false, this._setState("running");
      try {
        if (!e.ok) throw new Error("Cannot run: compilation failed.");
        const r = yg(e.ir);
        if (this._cancelFlag) {
          this._setState("cancelled");
          return;
        }
        const s = e.strings;
        let i = 0;
        const o = { show_i64: (u) => n.onOutput(String(u)), show_f64: (u) => n.onOutput(String(u)), show_i32: (u) => n.onOutput(u ? "true" : "false"), show_ref: (u) => n.onOutput("<ref>"), print_literal: (u) => n.onOutput(s[Number(u)] ?? ""), assert_fail: (u) => {
          throw new Error(`[abort] ${s[Number(u)] ?? ""}`);
        }, time_start: () => {
          i = Date.now();
        }, time_end: () => n.onOutput(`Time: ${Date.now() - i}ms`), sqrt: Math.sqrt, sin: Math.sin, cos: Math.cos, tan: Math.tan, exp: Math.exp, log: Math.log, abs: Math.abs, floor: Math.floor, ceil: Math.ceil, asin: Math.asin, acos: Math.acos, atan: Math.atan, pow: Math.pow, atan2: Math.atan2, to_float: (u) => Number(u), to_int: (u) => Number.isNaN(u) ? 0n : BigInt(u === 1 / 0 ? Number.MAX_SAFE_INTEGER : u === -1 / 0 ? Number.MIN_SAFE_INTEGER : Math.trunc(u)) };
        e.hasImageIO && (o.read_image = (u) => {
          throw new Error("[abort] read image: image I/O requires the Worker-based runtime (not yet available in this preview).");
        }, o.write_image = (u, h) => {
          throw new Error("[abort] write image: image I/O requires the Worker-based runtime (not yet available in this preview).");
        });
        const c = r.buffer.slice(r.byteOffset, r.byteOffset + r.byteLength), { instance: l } = await WebAssembly.instantiate(c, { host: o });
        l.exports.main(), this._setState("completed");
      } catch (r) {
        const s = r instanceof Error ? r.message : String(r);
        n.onError(s), this._setState(this._cancelFlag ? "cancelled" : "failed");
      }
    }
    cancel() {
      (this._state === "running" || this._state === "suspended") && (this._cancelFlag = true);
    }
    reset() {
      this._state !== "running" && this._state !== "suspended" && this._setState("idle");
    }
  }
  class Rg {
    constructor(e) {
      this.cb = e;
    }
    onOutput(e) {
      this.cb.onOutput(e);
    }
    onError(e) {
      this.cb.onError(e);
    }
    onImageOutput(e, n) {
      this.cb.onImageOutput(e, n);
    }
    requestImageInput(e) {
      return this.cb.requestImageInput(e);
    }
  }
  function Lg(t) {
    let e = t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return e = e.replace(/(;;[^\n]*)/g, '<span class="wat-comment">$1</span>'), e = e.replace(/("(?:[^"\\]|\\.)*")/g, '<span class="wat-string">$1</span>'), e = e.replace(/\b(module|func|import|export|memory|table|global|type|start|elem|data|local|param|result|struct|array|field|ref|null|mut|final|sub|rec|anyref|eqref|i31ref|funcref|externref|nofunc|noextern|none)\b/g, '<span class="wat-keyword">$1</span>'), e = e.replace(/\b(i32|i64|f32|f64|v128)\b/g, '<span class="wat-type">$1</span>'), e = e.replace(/\b([a-z][a-z0-9_]*(?:\.[a-z][a-z0-9_.]*)+)\b/g, '<span class="wat-instr">$1</span>'), e = e.replace(/(\$[A-Za-z0-9_$.]+)/g, '<span class="wat-ident">$1</span>'), e = e.replace(/\b([-+]?(?:0x[0-9a-fA-F]+|\d+(?:\.\d*)?(?:[eE][+-]?\d+)?))\b/g, '<span class="wat-number">$1</span>'), e;
  }
  class Ig {
    constructor(e, n = {}) {
      __publicField(this, "pre");
      __publicField(this, "_wat", "");
      __publicField(this, "_lastSuccessfulWat", "");
      e.classList.add("jpl-wat-panel");
      const r = document.createElement("div");
      r.className = "jpl-wat-toolbar";
      const s = document.createElement("span");
      if (s.className = "jpl-wat-title", s.textContent = "WAT", r.appendChild(s), n.copyButton !== false) {
        const i = this._makeBtn("Copy", () => navigator.clipboard.writeText(this._wat).catch(() => {
        }));
        r.appendChild(i);
      }
      if (n.downloadButton !== false) {
        const i = this._makeBtn("Download .wat", () => this._download());
        r.appendChild(i);
      }
      this.pre = document.createElement("pre"), this.pre.className = "jpl-wat-code", this.pre.innerHTML = '<span class="jpl-placeholder">Run a program to see its WAT output.</span>', e.appendChild(r), e.appendChild(this.pre);
    }
    set wat(e) {
      this._wat = e, this._lastSuccessfulWat = e, this.pre.innerHTML = e ? Lg(e) : '<span class="jpl-placeholder">No WAT generated.</span>';
    }
    get wat() {
      return this._wat;
    }
    markStale() {
      this.pre.classList.add("jpl-stale");
    }
    markFresh() {
      this.pre.classList.remove("jpl-stale");
    }
    _download() {
      if (!this._lastSuccessfulWat) return;
      const e = new Blob([this._lastSuccessfulWat], { type: "text/plain" }), n = URL.createObjectURL(e), r = document.createElement("a");
      r.href = n, r.download = "program.wat", r.click(), URL.revokeObjectURL(n);
    }
    _makeBtn(e, n) {
      const r = document.createElement("button");
      return r.className = "jpl-btn jpl-btn-sm", r.textContent = e, r.addEventListener("click", n), r;
    }
  }
  const yr = 4096, Ni = 16e6;
  async function Og(t) {
    if (t.size === 0) throw new Error("File is empty.");
    const e = URL.createObjectURL(t);
    try {
      return await Ng(e, t.name);
    } finally {
      URL.revokeObjectURL(e);
    }
  }
  async function Ng(t, e) {
    const n = await bg(t), r = n.naturalWidth, s = n.naturalHeight;
    if (r > yr || s > yr) throw new Error(`Image too large: ${r}\xD7${s} exceeds the ${yr}px dimension limit.`);
    if (r * s > Ni) throw new Error(`Image too large: ${r * s} pixels exceeds the ${Ni} pixel limit.`);
    const i = document.createElement("canvas");
    i.width = r, i.height = s;
    const a = i.getContext("2d");
    if (!a) throw new Error("Could not obtain 2D canvas context.");
    a.drawImage(n, 0, 0);
    const { data: o } = a.getImageData(0, 0, r, s);
    return { width: r, height: s, rgba: new Uint8Array(o.buffer), filename: e };
  }
  function bg(t) {
    return new Promise((e, n) => {
      const r = new Image();
      r.crossOrigin = "anonymous", r.onload = () => e(r), r.onerror = () => n(new Error(`Failed to load image from: ${t}`)), r.src = t;
    });
  }
  async function kg(t) {
    const e = new OffscreenCanvas(t.width, t.height), n = e.getContext("2d");
    if (!n) throw new Error("Could not obtain OffscreenCanvas 2D context.");
    const r = new Uint8ClampedArray(t.rgba.length);
    r.set(t.rgba);
    const s = new ImageData(r, t.width, t.height);
    return n.putImageData(s, 0, 0), e.convertToBlob({ type: "image/png" });
  }
  async function Cg(t) {
    const e = await kg(t);
    return URL.createObjectURL(e);
  }
  class vg {
    constructor(e, n = {}) {
      __publicField(this, "runtime", new _g());
      __publicField(this, "watPanel");
      __publicField(this, "sourceEl");
      __publicField(this, "outputEl");
      __publicField(this, "statusEl");
      __publicField(this, "runBtn");
      __publicField(this, "stopBtn");
      __publicField(this, "imagesEl");
      __publicField(this, "suspendOverlay");
      __publicField(this, "imageUrls", []);
      __publicField(this, "opts");
      this.opts = n, this._buildDOM(e), this.sourceEl = e.querySelector(".jpl-source"), this.outputEl = e.querySelector(".jpl-output"), this.statusEl = e.querySelector(".jpl-status"), this.runBtn = e.querySelector("#jpl-run"), this.stopBtn = e.querySelector("#jpl-stop"), this.imagesEl = e.querySelector(".jpl-images"), this.suspendOverlay = e.querySelector(".jpl-suspend-overlay"), this.watPanel = new Ig(e.querySelector(".jpl-wat-section")), this.runtime.addEventListener("statechange", (r) => {
        var _a2;
        const s = r.detail.state;
        this._onStateChange(s), (_a2 = n.onStateChange) == null ? void 0 : _a2.call(n, s);
      }), this.sourceEl.addEventListener("keydown", (r) => {
        (r.ctrlKey || r.metaKey) && r.key === "Enter" && (r.preventDefault(), this._run());
      }), this.runBtn.addEventListener("click", () => void this._run()), this.stopBtn.addEventListener("click", () => this.runtime.cancel()), n.initialSource && (this.sourceEl.value = n.initialSource);
    }
    get source() {
      return this.sourceEl.value;
    }
    set source(e) {
      this.sourceEl.value = e;
    }
    _buildDOM(e) {
      e.classList.add("jpl-run-page"), e.innerHTML = `
      <div class="jpl-editor-section">
        <div class="jpl-toolbar">
          <button class="jpl-btn jpl-btn-primary" id="jpl-run" title="Run (\u2318Enter)">\u25B6 Run</button>
          <button class="jpl-btn" id="jpl-stop" disabled title="Stop">\u25A0 Stop</button>
          <span class="jpl-status jpl-status-idle">idle</span>
        </div>
        <textarea
          class="jpl-source"
          spellcheck="false"
          autocorrect="off"
          autocapitalize="off"
          placeholder="Write JPL here\u2026 (\u2318Enter to run)"
        ></textarea>
      </div>

      <div class="jpl-panels">
        <div class="jpl-tab-bar" role="tablist">
          <button class="jpl-tab active" data-tab="output" role="tab">Output</button>
          <button class="jpl-tab" data-tab="wat" role="tab">WAT</button>
          <button class="jpl-tab" data-tab="images" role="tab">Images</button>
        </div>
        <div class="jpl-panel" data-panel="output">
          <div class="jpl-output"></div>
        </div>
        <div class="jpl-panel hidden" data-panel="wat">
          <div class="jpl-wat-section"></div>
        </div>
        <div class="jpl-panel hidden" data-panel="images">
          <div class="jpl-images"></div>
        </div>
      </div>

      <div class="jpl-suspend-overlay hidden" role="dialog" aria-modal="true">
        <div class="jpl-suspend-modal">
          <h3 class="jpl-suspend-title">Image Required</h3>
          <p class="jpl-suspend-hint"></p>
          <label class="jpl-file-label">
            Choose image\u2026
            <input type="file" accept="image/*" class="jpl-file-input">
          </label>
          <button class="jpl-btn jpl-btn-cancel-upload">Cancel</button>
        </div>
      </div>
    `, e.querySelectorAll(".jpl-tab").forEach((n) => {
        n.addEventListener("click", () => {
          const r = n.dataset.tab;
          e.querySelectorAll(".jpl-tab").forEach((s) => s.classList.remove("active")), e.querySelectorAll(".jpl-panel").forEach((s) => s.classList.add("hidden")), n.classList.add("active"), e.querySelector(`[data-panel="${r}"]`).classList.remove("hidden");
        });
      });
    }
    async _run() {
      if (this.runtime.state === "running" || this.runtime.state === "suspended") return;
      this._clearOutput();
      for (const s of this.imageUrls) URL.revokeObjectURL(s);
      this.imageUrls = [], this.imagesEl.innerHTML = "";
      const e = this.sourceEl.value.trim();
      if (!e) return;
      const n = mg(e, { args: this.opts.args });
      if (n.ok) this.watPanel.wat = n.wat, this.watPanel.markFresh();
      else {
        this.watPanel.markStale();
        for (const s of n.diagnostics) {
          const i = s.line != null ? ` [${s.line}:${s.column ?? 0}]` : "";
          this._appendOutput(`${s.kind} error${i}: ${s.message}`, "jpl-error");
        }
        return;
      }
      const r = new Rg({ onOutput: (s) => this._appendOutput(s), onError: (s) => this._appendOutput(s, "jpl-error"), onImageOutput: async (s, i) => {
        try {
          const a = await Cg(s);
          this.imageUrls.push(a), this._addImageCard(a, i ?? s.filename), this._switchTab("images");
        } catch (a) {
          this._appendOutput(`Failed to display image: ${a}`, "jpl-error");
        }
      }, requestImageInput: (s) => this._promptUpload(s) });
      await this.runtime.run(n, r), this.runtime.reset();
    }
    _appendOutput(e, n) {
      const r = document.createElement("div");
      r.className = "jpl-output-line" + (n ? ` ${n}` : ""), r.textContent = e, this.outputEl.appendChild(r), this.outputEl.scrollTop = this.outputEl.scrollHeight;
    }
    _clearOutput() {
      this.outputEl.innerHTML = "";
    }
    _addImageCard(e, n) {
      const r = document.createElement("div");
      r.className = "jpl-image-card";
      const s = document.createElement("img");
      s.src = e, s.className = "jpl-image-preview", s.alt = n ?? "output image";
      const i = document.createElement("div");
      i.className = "jpl-image-footer";
      const a = document.createElement("a");
      if (a.href = e, a.download = n ?? "output.png", a.className = "jpl-btn jpl-btn-sm", a.textContent = "Download", n) {
        const o = document.createElement("span");
        o.className = "jpl-image-name", o.textContent = n, i.appendChild(o);
      }
      i.appendChild(a), r.appendChild(s), r.appendChild(i), this.imagesEl.appendChild(r);
    }
    _switchTab(e) {
      const n = this.sourceEl.closest(".jpl-run-page");
      n.querySelectorAll(".jpl-tab").forEach((r) => r.classList.remove("active")), n.querySelectorAll(".jpl-panel").forEach((r) => r.classList.add("hidden")), n.querySelector(`[data-tab="${e}"]`).classList.add("active"), n.querySelector(`[data-panel="${e}"]`).classList.remove("hidden");
    }
    _promptUpload(e) {
      return new Promise((n, r) => {
        const s = this.suspendOverlay.querySelector(".jpl-suspend-hint"), i = this.suspendOverlay.querySelector(".jpl-file-input"), a = this.suspendOverlay.querySelector(".jpl-btn-cancel-upload");
        s.textContent = e.filenameHint ? `Program is requesting: "${e.filenameHint}"` : "Program is requesting an image file.", i.value = "", this.suspendOverlay.classList.remove("hidden");
        const o = () => {
          this.suspendOverlay.classList.add("hidden"), i.onchange = null;
        };
        i.onchange = async () => {
          var _a2;
          const c = (_a2 = i.files) == null ? void 0 : _a2[0];
          if (c) {
            o();
            try {
              n(await Og(c));
            } catch (l) {
              r(l instanceof Error ? l : new Error(String(l)));
            }
          }
        }, a.addEventListener("click", () => {
          o(), r(new Error("Image upload cancelled by user."));
        }, { once: true });
      });
    }
    _onStateChange(e) {
      this.statusEl.textContent = e, this.statusEl.className = `jpl-status jpl-status-${e}`, this.runBtn.disabled = e === "running" || e === "suspended", this.stopBtn.disabled = e !== "running" && e !== "suspended";
    }
  }
  const xo = [{ name: "Hello, World", source: 'print "Hello, World!"' }, { name: "Arithmetic", source: `show 1 + 2 * 3
show (10 - 4) / 2
show 2.0 * 3.14159` }, { name: "Factorial", source: `fn fact(n : int) : int {
  return if n <= 1 then 1 else n * fact(n - 1)
}

show fact(1)
show fact(5)
show fact(10)` }, { name: "Fibonacci", source: `fn fib(n : int) : int {
  return if n <= 1 then n else fib(n - 1) + fib(n - 2)
}

show fib(0)
show fib(1)
show fib(10)
show fib(15)` }, { name: "Array comprehension", source: `let squares = array[i : 8] i * i
show squares[0]
show squares[3]
show squares[7]` }, { name: "Sum loop", source: `let n = 10
let total = sum[i : n] (i + 1)
show total` }, { name: "Boolean logic", source: `show true && false
show true || false
show !true
show 3 > 2 && 5 != 6` }, { name: "Math builtins", source: `show sqrt(2.0)
show sin(0.0)
show cos(0.0)
show pow(2.0, 10.0)
show floor(3.9)
show ceil(3.1)` }, { name: "Assert", source: `fn safe_div(a : int, b : int) : int {
  assert b != 0, "division by zero"
  return a / b
}
show safe_div(10, 2)` }, { name: "Timing", source: `fn fib(n : int) : int {
  return if n <= 1 then n else fib(n - 1) + fib(n - 2)
}

time show fib(30)` }], bi = document.getElementById("example-list"), wg = document.getElementById("workspace"), xg = new vg(wg, { initialSource: xo[0].source });
  xo.forEach((t, e) => {
    const n = document.createElement("li"), r = document.createElement("button");
    r.className = "jpl-example-btn" + (e === 0 ? " active" : ""), r.textContent = t.name, r.addEventListener("click", () => {
      bi.querySelectorAll(".jpl-example-btn").forEach((s) => s.classList.remove("active")), r.classList.add("active"), xg.source = t.source;
    }), n.appendChild(r), bi.appendChild(n);
  });
});
var stdin_default = Mg();
export {
  stdin_default as default
};
