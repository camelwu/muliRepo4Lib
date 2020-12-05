/*!
 * (c) 2014-2020 FE-Team
 * Released under the Apache License.
 */
import { EventEmitter } from 'events';
import AgoraRTM from 'agora-rtm-sdk';

var IM_TYPE;
(function (IM_TYPE) {
    IM_TYPE[IM_TYPE["RONGYUN"] = 0] = "RONGYUN";
    IM_TYPE[IM_TYPE["RTM"] = 1] = "RTM";
})(IM_TYPE || (IM_TYPE = {}));
var IM_TYPE$1 = IM_TYPE;

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var protobuf2_3_5_min = createCommonjsModule(function (module) {
  /* eslint-disable */
  (function (c, d) {
    {
      if (typeof commonjsRequire === "function" && 'object' === "object" && module && module.exports) {
        module.exports = d(true);
      } else {
        c.RongIMLib = c.RongIMLib || {
          RongIMClient: {}
        };
        c.RongIMLib.RongIMClient.Protobuf = d();
      }
    }
  })(window, function (a) {
    var d = function () {
      function E(an, ap, ao) {
        this.low = an | 0;
        this.high = ap | 0;
        this.unsigned = !!ao;
      }

      E.prototype.__isLong__;
      Object.defineProperty(E.prototype, "__isLong__", {
        value: true,
        enumerable: false,
        configurable: false
      });

      function k(an) {
        return (an && an.__isLong__) === true;
      }

      E.isLong = k;
      var aa = {};
      var M = {};

      function ah(ap, ao) {
        var aq, ar, an;

        if (ao) {
          ap >>>= 0;

          if (an = 0 <= ap && ap < 256) {
            ar = M[ap];

            if (ar) {
              return ar;
            }
          }

          aq = S(ap, (ap | 0) < 0 ? -1 : 0, true);

          if (an) {
            M[ap] = aq;
          }

          return aq;
        } else {
          ap |= 0;

          if (an = -128 <= ap && ap < 128) {
            ar = aa[ap];

            if (ar) {
              return ar;
            }
          }

          aq = S(ap, ap < 0 ? -1 : 0, false);

          if (an) {
            aa[ap] = aq;
          }

          return aq;
        }
      }

      E.fromInt = ah;

      function q(ao, an) {
        if (isNaN(ao) || !isFinite(ao)) {
          return an ? m : F;
        }

        if (an) {
          if (ao < 0) {
            return m;
          }

          if (ao >= h) {
            return D;
          }
        } else {
          if (ao <= -C) {
            return T;
          }

          if (ao + 1 >= C) {
            return b;
          }
        }

        if (ao < 0) {
          return q(-ao, an).neg();
        }

        return S(ao % i | 0, ao / i | 0, an);
      }

      E.fromNumber = q;

      function S(an, ap, ao) {
        return new E(an, ap, ao);
      }

      E.fromBits = S;
      var B = Math.pow;

      function L(ar, ap, at) {
        if (ar.length === 0) {
          throw Error("empty string");
        }

        if (ar === "NaN" || ar === "Infinity" || ar === "+Infinity" || ar === "-Infinity") {
          return F;
        }

        if (typeof ap === "number") {
          at = ap, ap = false;
        } else {
          ap = !!ap;
        }

        at = at || 10;

        if (at < 2 || 36 < at) {
          throw RangeError("radix");
        }

        var ao;

        if ((ao = ar.indexOf("-")) > 0) {
          throw Error("interior hyphen");
        } else {
          if (ao === 0) {
            return L(ar.substring(1), ap, at).neg();
          }
        }

        var av = q(B(at, 8));
        var ax = F;

        for (var aq = 0; aq < ar.length; aq += 8) {
          var aw = Math.min(8, ar.length - aq),
              au = parseInt(ar.substring(aq, aq + aw), at);

          if (aw < 8) {
            var an = q(B(at, aw));
            ax = ax.mul(an).add(q(au));
          } else {
            ax = ax.mul(av);
            ax = ax.add(q(au));
          }
        }

        ax.unsigned = ap;
        return ax;
      }

      E.fromString = L;

      function K(an) {
        if (an instanceof E) {
          return an;
        }

        if (typeof an === "number") {
          return q(an);
        }

        if (typeof an === "string") {
          return L(an);
        }

        return S(an.low, an.high, an.unsigned);
      }

      E.fromValue = K;
      var ai = 1 << 16;
      var al = 1 << 24;
      var i = ai * ai;
      var h = i * i;
      var C = h / 2;
      var u = ah(al);
      var F = ah(0);
      E.ZERO = F;
      var m = ah(0, true);
      E.UZERO = m;
      var W = ah(1);
      E.ONE = W;
      var O = ah(1, true);
      E.UONE = O;
      var f = ah(-1);
      E.NEG_ONE = f;
      var b = S(4294967295 | 0, 2147483647 | 0, false);
      E.MAX_VALUE = b;
      var D = S(4294967295 | 0, 4294967295 | 0, true);
      E.MAX_UNSIGNED_VALUE = D;
      var T = S(0, 2147483648 | 0, false);
      E.MIN_VALUE = T;
      var z = E.prototype;

      z.toInt = function v() {
        return this.unsigned ? this.low >>> 0 : this.low;
      };

      z.toNumber = function ae() {
        if (this.unsigned) {
          return (this.high >>> 0) * i + (this.low >>> 0);
        }

        return this.high * i + (this.low >>> 0);
      };

      z.toString = function n(at) {
        at = at || 10;

        if (at < 2 || 36 < at) {
          throw RangeError("radix");
        }

        if (this.isZero()) {
          return "0";
        }

        if (this.isNegative()) {
          if (this.eq(T)) {
            var aq = q(at),
                an = this.div(aq),
                ap = an.mul(aq).sub(this);
            return an.toString(at) + ap.toInt().toString(at);
          } else {
            return "-" + this.neg().toString(at);
          }
        }

        var aw = q(B(at, 6), this.unsigned),
            av = this;
        var ax = "";

        while (true) {
          var au = av.div(aw),
              ar = av.sub(au.mul(aw)).toInt() >>> 0,
              ao = ar.toString(at);
          av = au;

          if (av.isZero()) {
            return ao + ax;
          } else {
            while (ao.length < 6) {
              ao = "0" + ao;
            }

            ax = "" + ao + ax;
          }
        }
      };

      z.getHighBits = function af() {
        return this.high;
      };

      z.getHighBitsUnsigned = function p() {
        return this.high >>> 0;
      };

      z.getLowBits = function y() {
        return this.low;
      };

      z.getLowBitsUnsigned = function U() {
        return this.low >>> 0;
      };

      z.getNumBitsAbs = function aj() {
        if (this.isNegative()) {
          return this.eq(T) ? 64 : this.neg().getNumBitsAbs();
        }

        var ao = this.high != 0 ? this.high : this.low;

        for (var an = 31; an > 0; an--) {
          if ((ao & 1 << an) != 0) {
            break;
          }
        }

        return this.high != 0 ? an + 33 : an + 1;
      };

      z.isZero = function R() {
        return this.high === 0 && this.low === 0;
      };

      z.isNegative = function X() {
        return !this.unsigned && this.high < 0;
      };

      z.isPositive = function ad() {
        return this.unsigned || this.high >= 0;
      };

      z.isOdd = function V() {
        return (this.low & 1) === 1;
      };

      z.isEven = function x() {
        return (this.low & 1) === 0;
      };

      z.equals = function N(an) {
        if (!k(an)) {
          an = K(an);
        }

        if (this.unsigned !== an.unsigned && this.high >>> 31 === 1 && an.high >>> 31 === 1) {
          return false;
        }

        return this.high === an.high && this.low === an.low;
      };

      z.eq = z.equals;

      z.notEquals = function ag(an) {
        return !this.eq(an);
      };

      z.neq = z.notEquals;

      z.lessThan = function t(an) {
        return this.comp(an) < 0;
      };

      z.lt = z.lessThan;

      z.lessThanOrEqual = function Z(an) {
        return this.comp(an) <= 0;
      };

      z.lte = z.lessThanOrEqual;

      z.greaterThan = function o(an) {
        return this.comp(an) > 0;
      };

      z.gt = z.greaterThan;

      z.greaterThanOrEqual = function Q(an) {
        return this.comp(an) >= 0;
      };

      z.gte = z.greaterThanOrEqual;

      z.compare = function s(ao) {
        if (!k(ao)) {
          ao = K(ao);
        }

        if (this.eq(ao)) {
          return 0;
        }

        var an = this.isNegative(),
            ap = ao.isNegative();

        if (an && !ap) {
          return -1;
        }

        if (!an && ap) {
          return 1;
        }

        if (!this.unsigned) {
          return this.sub(ao).isNegative() ? -1 : 1;
        }

        return ao.high >>> 0 > this.high >>> 0 || ao.high === this.high && ao.low >>> 0 > this.low >>> 0 ? -1 : 1;
      };

      z.comp = z.compare;

      z.negate = function w() {
        if (!this.unsigned && this.eq(T)) {
          return T;
        }

        return this.not().add(W);
      };

      z.neg = z.negate;

      z.add = function j(aq) {
        if (!k(aq)) {
          aq = K(aq);
        }

        var au = this.high >>> 16;
        var ao = this.high & 65535;
        var aw = this.low >>> 16;
        var ap = this.low & 65535;
        var ay = aq.high >>> 16;
        var ar = aq.high & 65535;
        var az = aq.low >>> 16;
        var at = aq.low & 65535;
        var aA = 0,
            av = 0,
            an = 0,
            ax = 0;
        ax += ap + at;
        an += ax >>> 16;
        ax &= 65535;
        an += aw + az;
        av += an >>> 16;
        an &= 65535;
        av += ao + ar;
        aA += av >>> 16;
        av &= 65535;
        aA += au + ay;
        aA &= 65535;
        return S(an << 16 | ax, aA << 16 | av, this.unsigned);
      };

      z.subtract = function r(an) {
        if (!k(an)) {
          an = K(an);
        }

        return this.add(an.neg());
      };

      z.sub = z.subtract;

      z.multiply = function I(az) {
        if (this.isZero()) {
          return F;
        }

        if (!k(az)) {
          az = K(az);
        }

        if (az.isZero()) {
          return F;
        }

        if (this.eq(T)) {
          return az.isOdd() ? T : F;
        }

        if (az.eq(T)) {
          return this.isOdd() ? T : F;
        }

        if (this.isNegative()) {
          if (az.isNegative()) {
            return this.neg().mul(az.neg());
          } else {
            return this.neg().mul(az).neg();
          }
        } else {
          if (az.isNegative()) {
            return this.mul(az.neg()).neg();
          }
        }

        if (this.lt(u) && az.lt(u)) {
          return q(this.toNumber() * az.toNumber(), this.unsigned);
        }

        var at = this.high >>> 16;
        var ao = this.high & 65535;
        var av = this.low >>> 16;
        var ap = this.low & 65535;
        var ax = az.high >>> 16;
        var aq = az.high & 65535;
        var ay = az.low >>> 16;
        var ar = az.low & 65535;
        var aA = 0,
            au = 0,
            an = 0,
            aw = 0;
        aw += ap * ar;
        an += aw >>> 16;
        aw &= 65535;
        an += av * ar;
        au += an >>> 16;
        an &= 65535;
        an += ap * ay;
        au += an >>> 16;
        an &= 65535;
        au += ao * ar;
        aA += au >>> 16;
        au &= 65535;
        au += av * ay;
        aA += au >>> 16;
        au &= 65535;
        au += ap * aq;
        aA += au >>> 16;
        au &= 65535;
        aA += at * ar + ao * ay + av * aq + ap * ax;
        aA &= 65535;
        return S(an << 16 | aw, aA << 16 | au, this.unsigned);
      };

      z.mul = z.multiply;

      z.divide = function J(an) {
        if (!k(an)) {
          an = K(an);
        }

        if (an.isZero()) {
          throw Error("division by zero");
        }

        if (this.isZero()) {
          return this.unsigned ? m : F;
        }

        var at, av, aq;

        if (!this.unsigned) {
          if (this.eq(T)) {
            if (an.eq(W) || an.eq(f)) {
              return T;
            } else {
              if (an.eq(T)) {
                return W;
              } else {
                var ao = this.shr(1);
                at = ao.div(an).shl(1);

                if (at.eq(F)) {
                  return an.isNegative() ? W : f;
                } else {
                  av = this.sub(an.mul(at));
                  aq = at.add(av.div(an));
                  return aq;
                }
              }
            }
          } else {
            if (an.eq(T)) {
              return this.unsigned ? m : F;
            }
          }

          if (this.isNegative()) {
            if (an.isNegative()) {
              return this.neg().div(an.neg());
            }

            return this.neg().div(an).neg();
          } else {
            if (an.isNegative()) {
              return this.div(an.neg()).neg();
            }
          }

          aq = F;
        } else {
          if (!an.unsigned) {
            an = an.toUnsigned();
          }

          if (an.gt(this)) {
            return m;
          }

          if (an.gt(this.shru(1))) {
            return O;
          }

          aq = m;
        }

        av = this;

        while (av.gte(an)) {
          at = Math.max(1, Math.floor(av.toNumber() / an.toNumber()));
          var aw = Math.ceil(Math.log(at) / Math.LN2),
              au = aw <= 48 ? 1 : B(2, aw - 48),
              ap = q(at),
              ar = ap.mul(an);

          while (ar.isNegative() || ar.gt(av)) {
            at -= au;
            ap = q(at, this.unsigned);
            ar = ap.mul(an);
          }

          if (ap.isZero()) {
            ap = W;
          }

          aq = aq.add(ap);
          av = av.sub(ar);
        }

        return aq;
      };

      z.div = z.divide;

      z.modulo = function ak(an) {
        if (!k(an)) {
          an = K(an);
        }

        return this.sub(this.div(an).mul(an));
      };

      z.mod = z.modulo;

      z.not = function ac() {
        return S(~this.low, ~this.high, this.unsigned);
      };

      z.and = function ab(an) {
        if (!k(an)) {
          an = K(an);
        }

        return S(this.low & an.low, this.high & an.high, this.unsigned);
      };

      z.or = function P(an) {
        if (!k(an)) {
          an = K(an);
        }

        return S(this.low | an.low, this.high | an.high, this.unsigned);
      };

      z.xor = function Y(an) {
        if (!k(an)) {
          an = K(an);
        }

        return S(this.low ^ an.low, this.high ^ an.high, this.unsigned);
      };

      z.shiftLeft = function A(an) {
        if (k(an)) {
          an = an.toInt();
        }

        if ((an &= 63) === 0) {
          return this;
        } else {
          if (an < 32) {
            return S(this.low << an, this.high << an | this.low >>> 32 - an, this.unsigned);
          } else {
            return S(0, this.low << an - 32, this.unsigned);
          }
        }
      };

      z.shl = z.shiftLeft;

      z.shiftRight = function l(an) {
        if (k(an)) {
          an = an.toInt();
        }

        if ((an &= 63) === 0) {
          return this;
        } else {
          if (an < 32) {
            return S(this.low >>> an | this.high << 32 - an, this.high >> an, this.unsigned);
          } else {
            return S(this.high >> an - 32, this.high >= 0 ? 0 : -1, this.unsigned);
          }
        }
      };

      z.shr = z.shiftRight;

      z.shiftRightUnsigned = function G(ap) {
        if (k(ap)) {
          ap = ap.toInt();
        }

        ap &= 63;

        if (ap === 0) {
          return this;
        } else {
          var ao = this.high;

          if (ap < 32) {
            var an = this.low;
            return S(an >>> ap | ao << 32 - ap, ao >>> ap, this.unsigned);
          } else {
            if (ap === 32) {
              return S(ao, 0, this.unsigned);
            } else {
              return S(ao >>> ap - 32, 0, this.unsigned);
            }
          }
        }
      };

      z.shru = z.shiftRightUnsigned;

      z.toSigned = function am() {
        if (!this.unsigned) {
          return this;
        }

        return S(this.low, this.high, false);
      };

      z.toUnsigned = function H() {
        if (this.unsigned) {
          return this;
        }

        return S(this.low, this.high, true);
      };

      z.toBytes = function (an) {
        return an ? this.toBytesLE() : this.toBytesBE();
      };

      z.toBytesLE = function () {
        var an = this.high,
            ao = this.low;
        return [ao & 255, ao >>> 8 & 255, ao >>> 16 & 255, ao >>> 24 & 255, an & 255, an >>> 8 & 255, an >>> 16 & 255, an >>> 24 & 255];
      };

      z.toBytesBE = function () {
        var an = this.high,
            ao = this.low;
        return [an >>> 24 & 255, an >>> 16 & 255, an >>> 8 & 255, an & 255, ao >>> 24 & 255, ao >>> 16 & 255, ao >>> 8 & 255, ao & 255];
      };

      return E;
    }();

    var c = function (k) {
      var n = function (q, s, r) {
        if (typeof q === "undefined") {
          q = n.DEFAULT_CAPACITY;
        }

        if (typeof s === "undefined") {
          s = n.DEFAULT_ENDIAN;
        }

        if (typeof r === "undefined") {
          r = n.DEFAULT_NOASSERT;
        }

        if (!r) {
          q = q | 0;

          if (q < 0) {
            throw RangeError("Illegal capacity");
          }

          s = !!s;
          r = !!r;
        }

        this.buffer = q === 0 ? p : new ArrayBuffer(q);
        this.view = q === 0 ? null : new Uint8Array(this.buffer);
        this.offset = 0;
        this.markedOffset = -1;
        this.limit = q;
        this.littleEndian = s;
        this.noAssert = r;
      };

      n.VERSION = "5.0.1";
      n.LITTLE_ENDIAN = true;
      n.BIG_ENDIAN = false;
      n.DEFAULT_CAPACITY = 16;
      n.DEFAULT_ENDIAN = n.BIG_ENDIAN;
      n.DEFAULT_NOASSERT = false;
      n.Long = k || null;
      var l = n.prototype;
      l.__isByteBuffer__;
      Object.defineProperty(l, "__isByteBuffer__", {
        value: true,
        enumerable: false,
        configurable: false
      });
      var p = new ArrayBuffer(0);
      var m = String.fromCharCode;

      function b(r) {
        var q = 0;
        return function () {
          return q < r.length ? r.charCodeAt(q++) : null;
        };
      }

      function f() {
        var q = [],
            r = [];
        return function () {
          if (arguments.length === 0) {
            return r.join("") + m.apply(String, q);
          }

          if (q.length + arguments.length > 1024) {
            r.push(m.apply(String, q)), q.length = 0;
          }

          Array.prototype.push.apply(q, arguments);
        };
      }

      n.accessor = function () {
        return Uint8Array;
      };

      n.allocate = function (q, s, r) {
        return new n(q, s, r);
      };

      n.concat = function (z, s, r, y) {
        if (typeof s === "boolean" || typeof s !== "string") {
          y = r;
          r = s;
          s = undefined;
        }

        var q = 0;

        for (var w = 0, v = z.length, t; w < v; ++w) {
          if (!n.isByteBuffer(z[w])) {
            z[w] = n.wrap(z[w], s);
          }

          t = z[w].limit - z[w].offset;

          if (t > 0) {
            q += t;
          }
        }

        if (q === 0) {
          return new n(0, r, y);
        }

        var x = new n(q, r, y),
            u;
        w = 0;

        while (w < v) {
          u = z[w++];
          t = u.limit - u.offset;

          if (t <= 0) {
            continue;
          }

          x.view.set(u.view.subarray(u.offset, u.limit), x.offset);
          x.offset += t;
        }

        x.limit = x.offset;
        x.offset = 0;
        return x;
      };

      n.isByteBuffer = function (q) {
        return (q && q.__isByteBuffer__) === true;
      };

      n.type = function () {
        return ArrayBuffer;
      };

      n.wrap = function (q, s, u, t) {
        if (typeof s !== "string") {
          t = u;
          u = s;
          s = undefined;
        }

        if (typeof q === "string") {
          if (typeof s === "undefined") {
            s = "utf8";
          }

          switch (s) {
            case "base64":
              return n.fromBase64(q, u);

            case "hex":
              return n.fromHex(q, u);

            case "binary":
              return n.fromBinary(q, u);

            case "utf8":
              return n.fromUTF8(q, u);

            case "debug":
              return n.fromDebug(q, u);

            default:
              throw Error("Unsupported encoding: " + s);
          }
        }

        if (q === null || typeof q !== "object") {
          throw TypeError("Illegal buffer");
        }

        var v;

        if (n.isByteBuffer(q)) {
          v = l.clone.call(q);
          v.markedOffset = -1;
          return v;
        }

        if (q instanceof Uint8Array) {
          v = new n(0, u, t);

          if (q.length > 0) {
            v.buffer = q.buffer;
            v.offset = q.byteOffset;
            v.limit = q.byteOffset + q.byteLength;
            v.view = new Uint8Array(q.buffer);
          }
        } else {
          if (q instanceof ArrayBuffer) {
            v = new n(0, u, t);

            if (q.byteLength > 0) {
              v.buffer = q;
              v.offset = 0;
              v.limit = q.byteLength;
              v.view = q.byteLength > 0 ? new Uint8Array(q) : null;
            }
          } else {
            if (Object.prototype.toString.call(q) === "[object Array]") {
              v = new n(q.length, u, t);
              v.limit = q.length;

              for (var r = 0; r < q.length; ++r) {
                v.view[r] = q[r];
              }
            } else {
              throw TypeError("Illegal buffer");
            }
          }
        }

        return v;
      };

      l.writeBitSet = function (w, u) {
        var q = typeof u === "undefined";

        if (q) {
          u = this.offset;
        }

        if (!this.noAssert) {
          if (!(w instanceof Array)) {
            throw TypeError("Illegal BitSet: Not an array");
          }

          if (typeof u !== "number" || u % 1 !== 0) {
            throw TypeError("Illegal offset: " + u + " (not an integer)");
          }

          u >>>= 0;

          if (u < 0 || u + 0 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + u + " (+" + 0 + ") <= " + this.buffer.byteLength);
          }
        }

        var r = u,
            x = w.length,
            y = x >> 3,
            v = 0,
            t;
        u += this.writeVarint32(x, u);

        while (y--) {
          t = !!w[v++] & 1 | (!!w[v++] & 1) << 1 | (!!w[v++] & 1) << 2 | (!!w[v++] & 1) << 3 | (!!w[v++] & 1) << 4 | (!!w[v++] & 1) << 5 | (!!w[v++] & 1) << 6 | (!!w[v++] & 1) << 7;
          this.writeByte(t, u++);
        }

        if (v < x) {
          var s = 0;
          t = 0;

          while (v < x) {
            t = t | (!!w[v++] & 1) << s++;
          }

          this.writeByte(t, u++);
        }

        if (q) {
          this.offset = u;
          return this;
        }

        return u - r;
      };

      l.readBitSet = function (t) {
        var q = typeof t === "undefined";

        if (q) {
          t = this.offset;
        }

        var u = this.readVarint32(t),
            x = u.value,
            y = x >> 3,
            v = 0,
            w = [],
            s;
        t += u.length;

        while (y--) {
          s = this.readByte(t++);
          w[v++] = !!(s & 1);
          w[v++] = !!(s & 2);
          w[v++] = !!(s & 4);
          w[v++] = !!(s & 8);
          w[v++] = !!(s & 16);
          w[v++] = !!(s & 32);
          w[v++] = !!(s & 64);
          w[v++] = !!(s & 128);
        }

        if (v < x) {
          var r = 0;
          s = this.readByte(t++);

          while (v < x) {
            w[v++] = !!(s >> r++ & 1);
          }
        }

        if (q) {
          this.offset = t;
        }

        return w;
      };

      l.readBytes = function (q, t) {
        var r = typeof t === "undefined";

        if (r) {
          t = this.offset;
        }

        if (!this.noAssert) {
          if (typeof t !== "number" || t % 1 !== 0) {
            throw TypeError("Illegal offset: " + t + " (not an integer)");
          }

          t >>>= 0;

          if (t < 0 || t + q > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + t + " (+" + q + ") <= " + this.buffer.byteLength);
          }
        }

        var s = this.slice(t, t + q);

        if (r) {
          this.offset += q;
        }

        return s;
      };

      l.writeBytes = l.append;

      l.writeInt8 = function (s, t) {
        var r = typeof t === "undefined";

        if (r) {
          t = this.offset;
        }

        if (!this.noAssert) {
          if (typeof s !== "number" || s % 1 !== 0) {
            throw TypeError("Illegal value: " + s + " (not an integer)");
          }

          s |= 0;

          if (typeof t !== "number" || t % 1 !== 0) {
            throw TypeError("Illegal offset: " + t + " (not an integer)");
          }

          t >>>= 0;

          if (t < 0 || t + 0 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + t + " (+" + 0 + ") <= " + this.buffer.byteLength);
          }
        }

        t += 1;
        var q = this.buffer.byteLength;

        if (t > q) {
          this.resize((q *= 2) > t ? q : t);
        }

        t -= 1;
        this.view[t] = s;

        if (r) {
          this.offset += 1;
        }

        return this;
      };

      l.writeByte = l.writeInt8;

      l.readInt8 = function (s) {
        var r = typeof s === "undefined";

        if (r) {
          s = this.offset;
        }

        if (!this.noAssert) {
          if (typeof s !== "number" || s % 1 !== 0) {
            throw TypeError("Illegal offset: " + s + " (not an integer)");
          }

          s >>>= 0;

          if (s < 0 || s + 1 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + s + " (+" + 1 + ") <= " + this.buffer.byteLength);
          }
        }

        var q = this.view[s];

        if ((q & 128) === 128) {
          q = -(255 - q + 1);
        }

        if (r) {
          this.offset += 1;
        }

        return q;
      };

      l.readByte = l.readInt8;

      l.writeUint8 = function (s, t) {
        var r = typeof t === "undefined";

        if (r) {
          t = this.offset;
        }

        if (!this.noAssert) {
          if (typeof s !== "number" || s % 1 !== 0) {
            throw TypeError("Illegal value: " + s + " (not an integer)");
          }

          s >>>= 0;

          if (typeof t !== "number" || t % 1 !== 0) {
            throw TypeError("Illegal offset: " + t + " (not an integer)");
          }

          t >>>= 0;

          if (t < 0 || t + 0 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + t + " (+" + 0 + ") <= " + this.buffer.byteLength);
          }
        }

        t += 1;
        var q = this.buffer.byteLength;

        if (t > q) {
          this.resize((q *= 2) > t ? q : t);
        }

        t -= 1;
        this.view[t] = s;

        if (r) {
          this.offset += 1;
        }

        return this;
      };

      l.writeUInt8 = l.writeUint8;

      l.readUint8 = function (s) {
        var r = typeof s === "undefined";

        if (r) {
          s = this.offset;
        }

        if (!this.noAssert) {
          if (typeof s !== "number" || s % 1 !== 0) {
            throw TypeError("Illegal offset: " + s + " (not an integer)");
          }

          s >>>= 0;

          if (s < 0 || s + 1 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + s + " (+" + 1 + ") <= " + this.buffer.byteLength);
          }
        }

        var q = this.view[s];

        if (r) {
          this.offset += 1;
        }

        return q;
      };

      l.readUInt8 = l.readUint8;

      l.writeInt16 = function (s, t) {
        var r = typeof t === "undefined";

        if (r) {
          t = this.offset;
        }

        if (!this.noAssert) {
          if (typeof s !== "number" || s % 1 !== 0) {
            throw TypeError("Illegal value: " + s + " (not an integer)");
          }

          s |= 0;

          if (typeof t !== "number" || t % 1 !== 0) {
            throw TypeError("Illegal offset: " + t + " (not an integer)");
          }

          t >>>= 0;

          if (t < 0 || t + 0 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + t + " (+" + 0 + ") <= " + this.buffer.byteLength);
          }
        }

        t += 2;
        var q = this.buffer.byteLength;

        if (t > q) {
          this.resize((q *= 2) > t ? q : t);
        }

        t -= 2;

        if (this.littleEndian) {
          this.view[t + 1] = (s & 65280) >>> 8;
          this.view[t] = s & 255;
        } else {
          this.view[t] = (s & 65280) >>> 8;
          this.view[t + 1] = s & 255;
        }

        if (r) {
          this.offset += 2;
        }

        return this;
      };

      l.writeShort = l.writeInt16;

      l.readInt16 = function (s) {
        var r = typeof s === "undefined";

        if (r) {
          s = this.offset;
        }

        if (!this.noAssert) {
          if (typeof s !== "number" || s % 1 !== 0) {
            throw TypeError("Illegal offset: " + s + " (not an integer)");
          }

          s >>>= 0;

          if (s < 0 || s + 2 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + s + " (+" + 2 + ") <= " + this.buffer.byteLength);
          }
        }

        var q = 0;

        if (this.littleEndian) {
          q = this.view[s];
          q |= this.view[s + 1] << 8;
        } else {
          q = this.view[s] << 8;
          q |= this.view[s + 1];
        }

        if ((q & 32768) === 32768) {
          q = -(65535 - q + 1);
        }

        if (r) {
          this.offset += 2;
        }

        return q;
      };

      l.readShort = l.readInt16;

      l.writeUint16 = function (s, t) {
        var r = typeof t === "undefined";

        if (r) {
          t = this.offset;
        }

        if (!this.noAssert) {
          if (typeof s !== "number" || s % 1 !== 0) {
            throw TypeError("Illegal value: " + s + " (not an integer)");
          }

          s >>>= 0;

          if (typeof t !== "number" || t % 1 !== 0) {
            throw TypeError("Illegal offset: " + t + " (not an integer)");
          }

          t >>>= 0;

          if (t < 0 || t + 0 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + t + " (+" + 0 + ") <= " + this.buffer.byteLength);
          }
        }

        t += 2;
        var q = this.buffer.byteLength;

        if (t > q) {
          this.resize((q *= 2) > t ? q : t);
        }

        t -= 2;

        if (this.littleEndian) {
          this.view[t + 1] = (s & 65280) >>> 8;
          this.view[t] = s & 255;
        } else {
          this.view[t] = (s & 65280) >>> 8;
          this.view[t + 1] = s & 255;
        }

        if (r) {
          this.offset += 2;
        }

        return this;
      };

      l.writeUInt16 = l.writeUint16;

      l.readUint16 = function (s) {
        var r = typeof s === "undefined";

        if (r) {
          s = this.offset;
        }

        if (!this.noAssert) {
          if (typeof s !== "number" || s % 1 !== 0) {
            throw TypeError("Illegal offset: " + s + " (not an integer)");
          }

          s >>>= 0;

          if (s < 0 || s + 2 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + s + " (+" + 2 + ") <= " + this.buffer.byteLength);
          }
        }

        var q = 0;

        if (this.littleEndian) {
          q = this.view[s];
          q |= this.view[s + 1] << 8;
        } else {
          q = this.view[s] << 8;
          q |= this.view[s + 1];
        }

        if (r) {
          this.offset += 2;
        }

        return q;
      };

      l.readUInt16 = l.readUint16;

      l.writeInt32 = function (s, t) {
        var r = typeof t === "undefined";

        if (r) {
          t = this.offset;
        }

        if (!this.noAssert) {
          if (typeof s !== "number" || s % 1 !== 0) {
            throw TypeError("Illegal value: " + s + " (not an integer)");
          }

          s |= 0;

          if (typeof t !== "number" || t % 1 !== 0) {
            throw TypeError("Illegal offset: " + t + " (not an integer)");
          }

          t >>>= 0;

          if (t < 0 || t + 0 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + t + " (+" + 0 + ") <= " + this.buffer.byteLength);
          }
        }

        t += 4;
        var q = this.buffer.byteLength;

        if (t > q) {
          this.resize((q *= 2) > t ? q : t);
        }

        t -= 4;

        if (this.littleEndian) {
          this.view[t + 3] = s >>> 24 & 255;
          this.view[t + 2] = s >>> 16 & 255;
          this.view[t + 1] = s >>> 8 & 255;
          this.view[t] = s & 255;
        } else {
          this.view[t] = s >>> 24 & 255;
          this.view[t + 1] = s >>> 16 & 255;
          this.view[t + 2] = s >>> 8 & 255;
          this.view[t + 3] = s & 255;
        }

        if (r) {
          this.offset += 4;
        }

        return this;
      };

      l.writeInt = l.writeInt32;

      l.readInt32 = function (s) {
        var r = typeof s === "undefined";

        if (r) {
          s = this.offset;
        }

        if (!this.noAssert) {
          if (typeof s !== "number" || s % 1 !== 0) {
            throw TypeError("Illegal offset: " + s + " (not an integer)");
          }

          s >>>= 0;

          if (s < 0 || s + 4 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + s + " (+" + 4 + ") <= " + this.buffer.byteLength);
          }
        }

        var q = 0;

        if (this.littleEndian) {
          q = this.view[s + 2] << 16;
          q |= this.view[s + 1] << 8;
          q |= this.view[s];
          q += this.view[s + 3] << 24 >>> 0;
        } else {
          q = this.view[s + 1] << 16;
          q |= this.view[s + 2] << 8;
          q |= this.view[s + 3];
          q += this.view[s] << 24 >>> 0;
        }

        q |= 0;

        if (r) {
          this.offset += 4;
        }

        return q;
      };

      l.readInt = l.readInt32;

      l.writeUint32 = function (s, t) {
        var r = typeof t === "undefined";

        if (r) {
          t = this.offset;
        }

        if (!this.noAssert) {
          if (typeof s !== "number" || s % 1 !== 0) {
            throw TypeError("Illegal value: " + s + " (not an integer)");
          }

          s >>>= 0;

          if (typeof t !== "number" || t % 1 !== 0) {
            throw TypeError("Illegal offset: " + t + " (not an integer)");
          }

          t >>>= 0;

          if (t < 0 || t + 0 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + t + " (+" + 0 + ") <= " + this.buffer.byteLength);
          }
        }

        t += 4;
        var q = this.buffer.byteLength;

        if (t > q) {
          this.resize((q *= 2) > t ? q : t);
        }

        t -= 4;

        if (this.littleEndian) {
          this.view[t + 3] = s >>> 24 & 255;
          this.view[t + 2] = s >>> 16 & 255;
          this.view[t + 1] = s >>> 8 & 255;
          this.view[t] = s & 255;
        } else {
          this.view[t] = s >>> 24 & 255;
          this.view[t + 1] = s >>> 16 & 255;
          this.view[t + 2] = s >>> 8 & 255;
          this.view[t + 3] = s & 255;
        }

        if (r) {
          this.offset += 4;
        }

        return this;
      };

      l.writeUInt32 = l.writeUint32;

      l.readUint32 = function (s) {
        var r = typeof s === "undefined";

        if (r) {
          s = this.offset;
        }

        if (!this.noAssert) {
          if (typeof s !== "number" || s % 1 !== 0) {
            throw TypeError("Illegal offset: " + s + " (not an integer)");
          }

          s >>>= 0;

          if (s < 0 || s + 4 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + s + " (+" + 4 + ") <= " + this.buffer.byteLength);
          }
        }

        var q = 0;

        if (this.littleEndian) {
          q = this.view[s + 2] << 16;
          q |= this.view[s + 1] << 8;
          q |= this.view[s];
          q += this.view[s + 3] << 24 >>> 0;
        } else {
          q = this.view[s + 1] << 16;
          q |= this.view[s + 2] << 8;
          q |= this.view[s + 3];
          q += this.view[s] << 24 >>> 0;
        }

        if (r) {
          this.offset += 4;
        }

        return q;
      };

      l.readUInt32 = l.readUint32;

      if (k) {
        l.writeInt64 = function (t, u) {
          var s = typeof u === "undefined";

          if (s) {
            u = this.offset;
          }

          if (!this.noAssert) {
            if (typeof t === "number") {
              t = k.fromNumber(t);
            } else {
              if (typeof t === "string") {
                t = k.fromString(t);
              } else {
                if (!(t && t instanceof k)) {
                  throw TypeError("Illegal value: " + t + " (not an integer or Long)");
                }
              }
            }

            if (typeof u !== "number" || u % 1 !== 0) {
              throw TypeError("Illegal offset: " + u + " (not an integer)");
            }

            u >>>= 0;

            if (u < 0 || u + 0 > this.buffer.byteLength) {
              throw RangeError("Illegal offset: 0 <= " + u + " (+" + 0 + ") <= " + this.buffer.byteLength);
            }
          }

          if (typeof t === "number") {
            t = k.fromNumber(t);
          } else {
            if (typeof t === "string") {
              t = k.fromString(t);
            }
          }

          u += 8;
          var v = this.buffer.byteLength;

          if (u > v) {
            this.resize((v *= 2) > u ? v : u);
          }

          u -= 8;
          var r = t.low,
              q = t.high;

          if (this.littleEndian) {
            this.view[u + 3] = r >>> 24 & 255;
            this.view[u + 2] = r >>> 16 & 255;
            this.view[u + 1] = r >>> 8 & 255;
            this.view[u] = r & 255;
            u += 4;
            this.view[u + 3] = q >>> 24 & 255;
            this.view[u + 2] = q >>> 16 & 255;
            this.view[u + 1] = q >>> 8 & 255;
            this.view[u] = q & 255;
          } else {
            this.view[u] = q >>> 24 & 255;
            this.view[u + 1] = q >>> 16 & 255;
            this.view[u + 2] = q >>> 8 & 255;
            this.view[u + 3] = q & 255;
            u += 4;
            this.view[u] = r >>> 24 & 255;
            this.view[u + 1] = r >>> 16 & 255;
            this.view[u + 2] = r >>> 8 & 255;
            this.view[u + 3] = r & 255;
          }

          if (s) {
            this.offset += 8;
          }

          return this;
        };

        l.writeLong = l.writeInt64;

        l.readInt64 = function (u) {
          var t = typeof u === "undefined";

          if (t) {
            u = this.offset;
          }

          if (!this.noAssert) {
            if (typeof u !== "number" || u % 1 !== 0) {
              throw TypeError("Illegal offset: " + u + " (not an integer)");
            }

            u >>>= 0;

            if (u < 0 || u + 8 > this.buffer.byteLength) {
              throw RangeError("Illegal offset: 0 <= " + u + " (+" + 8 + ") <= " + this.buffer.byteLength);
            }
          }

          var r = 0,
              q = 0;

          if (this.littleEndian) {
            r = this.view[u + 2] << 16;
            r |= this.view[u + 1] << 8;
            r |= this.view[u];
            r += this.view[u + 3] << 24 >>> 0;
            u += 4;
            q = this.view[u + 2] << 16;
            q |= this.view[u + 1] << 8;
            q |= this.view[u];
            q += this.view[u + 3] << 24 >>> 0;
          } else {
            q = this.view[u + 1] << 16;
            q |= this.view[u + 2] << 8;
            q |= this.view[u + 3];
            q += this.view[u] << 24 >>> 0;
            u += 4;
            r = this.view[u + 1] << 16;
            r |= this.view[u + 2] << 8;
            r |= this.view[u + 3];
            r += this.view[u] << 24 >>> 0;
          }

          var s = new k(r, q, false);

          if (t) {
            this.offset += 8;
          }

          return s;
        };

        l.readLong = l.readInt64;

        l.writeUint64 = function (t, v) {
          var s = typeof v === "undefined";

          if (s) {
            v = this.offset;
          }

          if (!this.noAssert) {
            if (typeof t === "number") {
              t = k.fromNumber(t);
            } else {
              if (typeof t === "string") {
                t = k.fromString(t);
              } else {
                if (!(t && t instanceof k)) {
                  throw TypeError("Illegal value: " + t + " (not an integer or Long)");
                }
              }
            }

            if (typeof v !== "number" || v % 1 !== 0) {
              throw TypeError("Illegal offset: " + v + " (not an integer)");
            }

            v >>>= 0;

            if (v < 0 || v + 0 > this.buffer.byteLength) {
              throw RangeError("Illegal offset: 0 <= " + v + " (+" + 0 + ") <= " + this.buffer.byteLength);
            }
          }

          if (typeof t === "number") {
            t = k.fromNumber(t);
          } else {
            if (typeof t === "string") {
              t = k.fromString(t);
            }
          }

          v += 8;
          var u = this.buffer.byteLength;

          if (v > u) {
            this.resize((u *= 2) > v ? u : v);
          }

          v -= 8;
          var r = t.low,
              q = t.high;

          if (this.littleEndian) {
            this.view[v + 3] = r >>> 24 & 255;
            this.view[v + 2] = r >>> 16 & 255;
            this.view[v + 1] = r >>> 8 & 255;
            this.view[v] = r & 255;
            v += 4;
            this.view[v + 3] = q >>> 24 & 255;
            this.view[v + 2] = q >>> 16 & 255;
            this.view[v + 1] = q >>> 8 & 255;
            this.view[v] = q & 255;
          } else {
            this.view[v] = q >>> 24 & 255;
            this.view[v + 1] = q >>> 16 & 255;
            this.view[v + 2] = q >>> 8 & 255;
            this.view[v + 3] = q & 255;
            v += 4;
            this.view[v] = r >>> 24 & 255;
            this.view[v + 1] = r >>> 16 & 255;
            this.view[v + 2] = r >>> 8 & 255;
            this.view[v + 3] = r & 255;
          }

          if (s) {
            this.offset += 8;
          }

          return this;
        };

        l.writeUInt64 = l.writeUint64;

        l.readUint64 = function (u) {
          var t = typeof u === "undefined";

          if (t) {
            u = this.offset;
          }

          if (!this.noAssert) {
            if (typeof u !== "number" || u % 1 !== 0) {
              throw TypeError("Illegal offset: " + u + " (not an integer)");
            }

            u >>>= 0;

            if (u < 0 || u + 8 > this.buffer.byteLength) {
              throw RangeError("Illegal offset: 0 <= " + u + " (+" + 8 + ") <= " + this.buffer.byteLength);
            }
          }

          var r = 0,
              q = 0;

          if (this.littleEndian) {
            r = this.view[u + 2] << 16;
            r |= this.view[u + 1] << 8;
            r |= this.view[u];
            r += this.view[u + 3] << 24 >>> 0;
            u += 4;
            q = this.view[u + 2] << 16;
            q |= this.view[u + 1] << 8;
            q |= this.view[u];
            q += this.view[u + 3] << 24 >>> 0;
          } else {
            q = this.view[u + 1] << 16;
            q |= this.view[u + 2] << 8;
            q |= this.view[u + 3];
            q += this.view[u] << 24 >>> 0;
            u += 4;
            r = this.view[u + 1] << 16;
            r |= this.view[u + 2] << 8;
            r |= this.view[u + 3];
            r += this.view[u] << 24 >>> 0;
          }

          var s = new k(r, q, true);

          if (t) {
            this.offset += 8;
          }

          return s;
        };

        l.readUInt64 = l.readUint64;
      }

      function i(x, w, t, r, A) {
        var B,
            v,
            u = A * 8 - r - 1,
            z = (1 << u) - 1,
            q = z >> 1,
            D = -7,
            y = t ? A - 1 : 0,
            C = t ? -1 : 1,
            E = x[w + y];
        y += C;
        B = E & (1 << -D) - 1;
        E >>= -D;
        D += u;

        for (; D > 0; B = B * 256 + x[w + y], y += C, D -= 8) {}

        v = B & (1 << -D) - 1;
        B >>= -D;
        D += r;

        for (; D > 0; v = v * 256 + x[w + y], y += C, D -= 8) {}

        if (B === 0) {
          B = 1 - q;
        } else {
          if (B === z) {
            return v ? NaN : (E ? -1 : 1) * Infinity;
          } else {
            v = v + Math.pow(2, r);
            B = B - q;
          }
        }

        return (E ? -1 : 1) * v * Math.pow(2, B - r);
      }

      function j(y, F, x, t, r, B) {
        var C,
            v,
            E,
            u = B * 8 - r - 1,
            A = (1 << u) - 1,
            q = A >> 1,
            w = r === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            z = t ? 0 : B - 1,
            D = t ? 1 : -1,
            G = F < 0 || F === 0 && 1 / F < 0 ? 1 : 0;
        F = Math.abs(F);

        if (isNaN(F) || F === Infinity) {
          v = isNaN(F) ? 1 : 0;
          C = A;
        } else {
          C = Math.floor(Math.log(F) / Math.LN2);

          if (F * (E = Math.pow(2, -C)) < 1) {
            C--;
            E *= 2;
          }

          if (C + q >= 1) {
            F += w / E;
          } else {
            F += w * Math.pow(2, 1 - q);
          }

          if (F * E >= 2) {
            C++;
            E /= 2;
          }

          if (C + q >= A) {
            v = 0;
            C = A;
          } else {
            if (C + q >= 1) {
              v = (F * E - 1) * Math.pow(2, r);
              C = C + q;
            } else {
              v = F * Math.pow(2, q - 1) * Math.pow(2, r);
              C = 0;
            }
          }
        }

        for (; r >= 8; y[x + z] = v & 255, z += D, v /= 256, r -= 8) {}

        C = C << r | v;
        u += r;

        for (; u > 0; y[x + z] = C & 255, z += D, C /= 256, u -= 8) {}

        y[x + z - D] |= G * 128;
      }

      l.writeFloat32 = function (r, t) {
        var q = typeof t === "undefined";

        if (q) {
          t = this.offset;
        }

        if (!this.noAssert) {
          if (typeof r !== "number") {
            throw TypeError("Illegal value: " + r + " (not a number)");
          }

          if (typeof t !== "number" || t % 1 !== 0) {
            throw TypeError("Illegal offset: " + t + " (not an integer)");
          }

          t >>>= 0;

          if (t < 0 || t + 0 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + t + " (+" + 0 + ") <= " + this.buffer.byteLength);
          }
        }

        t += 4;
        var s = this.buffer.byteLength;

        if (t > s) {
          this.resize((s *= 2) > t ? s : t);
        }

        t -= 4;
        j(this.view, r, t, this.littleEndian, 23, 4);

        if (q) {
          this.offset += 4;
        }

        return this;
      };

      l.writeFloat = l.writeFloat32;

      l.readFloat32 = function (s) {
        var r = typeof s === "undefined";

        if (r) {
          s = this.offset;
        }

        if (!this.noAssert) {
          if (typeof s !== "number" || s % 1 !== 0) {
            throw TypeError("Illegal offset: " + s + " (not an integer)");
          }

          s >>>= 0;

          if (s < 0 || s + 4 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + s + " (+" + 4 + ") <= " + this.buffer.byteLength);
          }
        }

        var q = i(this.view, s, this.littleEndian, 23, 4);

        if (r) {
          this.offset += 4;
        }

        return q;
      };

      l.readFloat = l.readFloat32;

      l.writeFloat64 = function (s, t) {
        var r = typeof t === "undefined";

        if (r) {
          t = this.offset;
        }

        if (!this.noAssert) {
          if (typeof s !== "number") {
            throw TypeError("Illegal value: " + s + " (not a number)");
          }

          if (typeof t !== "number" || t % 1 !== 0) {
            throw TypeError("Illegal offset: " + t + " (not an integer)");
          }

          t >>>= 0;

          if (t < 0 || t + 0 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + t + " (+" + 0 + ") <= " + this.buffer.byteLength);
          }
        }

        t += 8;
        var q = this.buffer.byteLength;

        if (t > q) {
          this.resize((q *= 2) > t ? q : t);
        }

        t -= 8;
        j(this.view, s, t, this.littleEndian, 52, 8);

        if (r) {
          this.offset += 8;
        }

        return this;
      };

      l.writeDouble = l.writeFloat64;

      l.readFloat64 = function (s) {
        var r = typeof s === "undefined";

        if (r) {
          s = this.offset;
        }

        if (!this.noAssert) {
          if (typeof s !== "number" || s % 1 !== 0) {
            throw TypeError("Illegal offset: " + s + " (not an integer)");
          }

          s >>>= 0;

          if (s < 0 || s + 8 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + s + " (+" + 8 + ") <= " + this.buffer.byteLength);
          }
        }

        var q = i(this.view, s, this.littleEndian, 52, 8);

        if (r) {
          this.offset += 8;
        }

        return q;
      };

      l.readDouble = l.readFloat64;
      n.MAX_VARINT32_BYTES = 5;

      n.calculateVarint32 = function (q) {
        q = q >>> 0;

        if (q < 1 << 7) {
          return 1;
        } else {
          if (q < 1 << 14) {
            return 2;
          } else {
            if (q < 1 << 21) {
              return 3;
            } else {
              if (q < 1 << 28) {
                return 4;
              } else {
                return 5;
              }
            }
          }
        }
      };

      n.zigZagEncode32 = function (q) {
        return ((q |= 0) << 1 ^ q >> 31) >>> 0;
      };

      n.zigZagDecode32 = function (q) {
        return q >>> 1 ^ -(q & 1) | 0;
      };

      l.writeVarint32 = function (u, v) {
        var t = typeof v === "undefined";

        if (t) {
          v = this.offset;
        }

        if (!this.noAssert) {
          if (typeof u !== "number" || u % 1 !== 0) {
            throw TypeError("Illegal value: " + u + " (not an integer)");
          }

          u |= 0;

          if (typeof v !== "number" || v % 1 !== 0) {
            throw TypeError("Illegal offset: " + v + " (not an integer)");
          }

          v >>>= 0;

          if (v < 0 || v + 0 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + v + " (+" + 0 + ") <= " + this.buffer.byteLength);
          }
        }

        var r = n.calculateVarint32(u),
            q;
        v += r;
        var s = this.buffer.byteLength;

        if (v > s) {
          this.resize((s *= 2) > v ? s : v);
        }

        v -= r;
        u >>>= 0;

        while (u >= 128) {
          q = u & 127 | 128;
          this.view[v++] = q;
          u >>>= 7;
        }

        this.view[v++] = u;

        if (t) {
          this.offset = v;
          return this;
        }

        return r;
      };

      l.writeVarint32ZigZag = function (q, r) {
        return this.writeVarint32(n.zigZagEncode32(q), r);
      };

      l.readVarint32 = function (u) {
        var t = typeof u === "undefined";

        if (t) {
          u = this.offset;
        }

        if (!this.noAssert) {
          if (typeof u !== "number" || u % 1 !== 0) {
            throw TypeError("Illegal offset: " + u + " (not an integer)");
          }

          u >>>= 0;

          if (u < 0 || u + 1 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + u + " (+" + 1 + ") <= " + this.buffer.byteLength);
          }
        }

        var v = 0,
            s = 0 >>> 0,
            q;

        do {
          if (!this.noAssert && u > this.limit) {
            var r = Error("Truncated");
            r.truncated = true;
            throw r;
          }

          q = this.view[u++];

          if (v < 5) {
            s |= (q & 127) << 7 * v;
          }

          ++v;
        } while ((q & 128) !== 0);

        s |= 0;

        if (t) {
          this.offset = u;
          return s;
        }

        return {
          value: s,
          length: v
        };
      };

      l.readVarint32ZigZag = function (r) {
        var q = this.readVarint32(r);

        if (typeof q === "object") {
          q.value = n.zigZagDecode32(q.value);
        } else {
          q = n.zigZagDecode32(q);
        }

        return q;
      };

      if (k) {
        n.MAX_VARINT64_BYTES = 10;

        n.calculateVarint64 = function (r) {
          if (typeof r === "number") {
            r = k.fromNumber(r);
          } else {
            if (typeof r === "string") {
              r = k.fromString(r);
            }
          }

          var t = r.toInt() >>> 0,
              s = r.shiftRightUnsigned(28).toInt() >>> 0,
              q = r.shiftRightUnsigned(56).toInt() >>> 0;

          if (q == 0) {
            if (s == 0) {
              if (t < 1 << 14) {
                return t < 1 << 7 ? 1 : 2;
              } else {
                return t < 1 << 21 ? 3 : 4;
              }
            } else {
              if (s < 1 << 14) {
                return s < 1 << 7 ? 5 : 6;
              } else {
                return s < 1 << 21 ? 7 : 8;
              }
            }
          } else {
            return q < 1 << 7 ? 9 : 10;
          }
        };

        n.zigZagEncode64 = function (q) {
          if (typeof q === "number") {
            q = k.fromNumber(q, false);
          } else {
            if (typeof q === "string") {
              q = k.fromString(q, false);
            } else {
              if (q.unsigned !== false) {
                q = q.toSigned();
              }
            }
          }

          return q.shiftLeft(1).xor(q.shiftRight(63)).toUnsigned();
        };

        n.zigZagDecode64 = function (q) {
          if (typeof q === "number") {
            q = k.fromNumber(q, false);
          } else {
            if (typeof q === "string") {
              q = k.fromString(q, false);
            } else {
              if (q.unsigned !== false) {
                q = q.toSigned();
              }
            }
          }

          return q.shiftRightUnsigned(1).xor(q.and(k.ONE).toSigned().negate()).toSigned();
        };

        l.writeVarint64 = function (u, x) {
          var t = typeof x === "undefined";

          if (t) {
            x = this.offset;
          }

          if (!this.noAssert) {
            if (typeof u === "number") {
              u = k.fromNumber(u);
            } else {
              if (typeof u === "string") {
                u = k.fromString(u);
              } else {
                if (!(u && u instanceof k)) {
                  throw TypeError("Illegal value: " + u + " (not an integer or Long)");
                }
              }
            }

            if (typeof x !== "number" || x % 1 !== 0) {
              throw TypeError("Illegal offset: " + x + " (not an integer)");
            }

            x >>>= 0;

            if (x < 0 || x + 0 > this.buffer.byteLength) {
              throw RangeError("Illegal offset: 0 <= " + x + " (+" + 0 + ") <= " + this.buffer.byteLength);
            }
          }

          if (typeof u === "number") {
            u = k.fromNumber(u, false);
          } else {
            if (typeof u === "string") {
              u = k.fromString(u, false);
            } else {
              if (u.unsigned !== false) {
                u = u.toSigned();
              }
            }
          }

          var q = n.calculateVarint64(u),
              w = u.toInt() >>> 0,
              v = u.shiftRightUnsigned(28).toInt() >>> 0,
              s = u.shiftRightUnsigned(56).toInt() >>> 0;
          x += q;
          var r = this.buffer.byteLength;

          if (x > r) {
            this.resize((r *= 2) > x ? r : x);
          }

          x -= q;

          switch (q) {
            case 10:
              this.view[x + 9] = s >>> 7 & 1;

            case 9:
              this.view[x + 8] = q !== 9 ? s | 128 : s & 127;

            case 8:
              this.view[x + 7] = q !== 8 ? v >>> 21 | 128 : v >>> 21 & 127;

            case 7:
              this.view[x + 6] = q !== 7 ? v >>> 14 | 128 : v >>> 14 & 127;

            case 6:
              this.view[x + 5] = q !== 6 ? v >>> 7 | 128 : v >>> 7 & 127;

            case 5:
              this.view[x + 4] = q !== 5 ? v | 128 : v & 127;

            case 4:
              this.view[x + 3] = q !== 4 ? w >>> 21 | 128 : w >>> 21 & 127;

            case 3:
              this.view[x + 2] = q !== 3 ? w >>> 14 | 128 : w >>> 14 & 127;

            case 2:
              this.view[x + 1] = q !== 2 ? w >>> 7 | 128 : w >>> 7 & 127;

            case 1:
              this.view[x] = q !== 1 ? w | 128 : w & 127;
          }

          if (t) {
            this.offset += q;
            return this;
          } else {
            return q;
          }
        };

        l.writeVarint64ZigZag = function (q, r) {
          return this.writeVarint64(n.zigZagEncode64(q), r);
        };

        l.readVarint64 = function (w) {
          var t = typeof w === "undefined";

          if (t) {
            w = this.offset;
          }

          if (!this.noAssert) {
            if (typeof w !== "number" || w % 1 !== 0) {
              throw TypeError("Illegal offset: " + w + " (not an integer)");
            }

            w >>>= 0;

            if (w < 0 || w + 1 > this.buffer.byteLength) {
              throw RangeError("Illegal offset: 0 <= " + w + " (+" + 1 + ") <= " + this.buffer.byteLength);
            }
          }

          var x = w,
              v = 0,
              u = 0,
              s = 0,
              q = 0;
          q = this.view[w++];
          v = q & 127;

          if (q & 128) {
            q = this.view[w++];
            v |= (q & 127) << 7;

            if (q & 128 || this.noAssert && typeof q === "undefined") {
              q = this.view[w++];
              v |= (q & 127) << 14;

              if (q & 128 || this.noAssert && typeof q === "undefined") {
                q = this.view[w++];
                v |= (q & 127) << 21;

                if (q & 128 || this.noAssert && typeof q === "undefined") {
                  q = this.view[w++];
                  u = q & 127;

                  if (q & 128 || this.noAssert && typeof q === "undefined") {
                    q = this.view[w++];
                    u |= (q & 127) << 7;

                    if (q & 128 || this.noAssert && typeof q === "undefined") {
                      q = this.view[w++];
                      u |= (q & 127) << 14;

                      if (q & 128 || this.noAssert && typeof q === "undefined") {
                        q = this.view[w++];
                        u |= (q & 127) << 21;

                        if (q & 128 || this.noAssert && typeof q === "undefined") {
                          q = this.view[w++];
                          s = q & 127;

                          if (q & 128 || this.noAssert && typeof q === "undefined") {
                            q = this.view[w++];
                            s |= (q & 127) << 7;

                            if (q & 128 || this.noAssert && typeof q === "undefined") {
                              throw Error("Buffer overrun");
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          var r = k.fromBits(v | u << 28, u >>> 4 | s << 24, false);

          if (t) {
            this.offset = w;
            return r;
          } else {
            return {
              value: r,
              length: w - x
            };
          }
        };

        l.readVarint64ZigZag = function (r) {
          var q = this.readVarint64(r);

          if (q && q.value instanceof k) {
            q.value = n.zigZagDecode64(q.value);
          } else {
            q = n.zigZagDecode64(q);
          }

          return q;
        };
      }

      l.writeCString = function (v, u) {
        var t = typeof u === "undefined";

        if (t) {
          u = this.offset;
        }

        var r,
            q = v.length;

        if (!this.noAssert) {
          if (typeof v !== "string") {
            throw TypeError("Illegal str: Not a string");
          }

          for (r = 0; r < q; ++r) {
            if (v.charCodeAt(r) === 0) {
              throw RangeError("Illegal str: Contains NULL-characters");
            }
          }

          if (typeof u !== "number" || u % 1 !== 0) {
            throw TypeError("Illegal offset: " + u + " (not an integer)");
          }

          u >>>= 0;

          if (u < 0 || u + 0 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + u + " (+" + 0 + ") <= " + this.buffer.byteLength);
          }
        }

        q = o.calculateUTF16asUTF8(b(v))[1];
        u += q + 1;
        var s = this.buffer.byteLength;

        if (u > s) {
          this.resize((s *= 2) > u ? s : u);
        }

        u -= q + 1;
        o.encodeUTF16toUTF8(b(v), function (w) {
          this.view[u++] = w;
        }.bind(this));
        this.view[u++] = 0;

        if (t) {
          this.offset = u;
          return this;
        }

        return q;
      };

      l.readCString = function (u) {
        var s = typeof u === "undefined";

        if (s) {
          u = this.offset;
        }

        if (!this.noAssert) {
          if (typeof u !== "number" || u % 1 !== 0) {
            throw TypeError("Illegal offset: " + u + " (not an integer)");
          }

          u >>>= 0;

          if (u < 0 || u + 1 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + u + " (+" + 1 + ") <= " + this.buffer.byteLength);
          }
        }

        var v = u;
        var t,
            q = -1;
        o.decodeUTF8toUTF16(function () {
          if (q === 0) {
            return null;
          }

          if (u >= this.limit) {
            throw RangeError("Illegal range: Truncated data, " + u + " < " + this.limit);
          }

          q = this.view[u++];
          return q === 0 ? null : q;
        }.bind(this), t = f(), true);

        if (s) {
          this.offset = u;
          return t();
        } else {
          return {
            string: t(),
            length: u - v
          };
        }
      };

      l.writeIString = function (u, t) {
        var s = typeof t === "undefined";

        if (s) {
          t = this.offset;
        }

        if (!this.noAssert) {
          if (typeof u !== "string") {
            throw TypeError("Illegal str: Not a string");
          }

          if (typeof t !== "number" || t % 1 !== 0) {
            throw TypeError("Illegal offset: " + t + " (not an integer)");
          }

          t >>>= 0;

          if (t < 0 || t + 0 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + t + " (+" + 0 + ") <= " + this.buffer.byteLength);
          }
        }

        var v = t,
            q;
        q = o.calculateUTF16asUTF8(b(u), this.noAssert)[1];
        t += 4 + q;
        var r = this.buffer.byteLength;

        if (t > r) {
          this.resize((r *= 2) > t ? r : t);
        }

        t -= 4 + q;

        if (this.littleEndian) {
          this.view[t + 3] = q >>> 24 & 255;
          this.view[t + 2] = q >>> 16 & 255;
          this.view[t + 1] = q >>> 8 & 255;
          this.view[t] = q & 255;
        } else {
          this.view[t] = q >>> 24 & 255;
          this.view[t + 1] = q >>> 16 & 255;
          this.view[t + 2] = q >>> 8 & 255;
          this.view[t + 3] = q & 255;
        }

        t += 4;
        o.encodeUTF16toUTF8(b(u), function (w) {
          this.view[t++] = w;
        }.bind(this));

        if (t !== v + 4 + q) {
          throw RangeError("Illegal range: Truncated data, " + t + " == " + (t + 4 + q));
        }

        if (s) {
          this.offset = t;
          return this;
        }

        return t - v;
      };

      l.readIString = function (t) {
        var r = typeof t === "undefined";

        if (r) {
          t = this.offset;
        }

        if (!this.noAssert) {
          if (typeof t !== "number" || t % 1 !== 0) {
            throw TypeError("Illegal offset: " + t + " (not an integer)");
          }

          t >>>= 0;

          if (t < 0 || t + 4 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + t + " (+" + 4 + ") <= " + this.buffer.byteLength);
          }
        }

        var u = t;
        var q = this.readUint32(t);
        var s = this.readUTF8String(q, n.METRICS_BYTES, t += 4);
        t += s.length;

        if (r) {
          this.offset = t;
          return s.string;
        } else {
          return {
            string: s.string,
            length: t - u
          };
        }
      };

      n.METRICS_CHARS = "c";
      n.METRICS_BYTES = "b";

      l.writeUTF8String = function (u, t) {
        var s = typeof t === "undefined";

        if (s) {
          t = this.offset;
        }

        if (!this.noAssert) {
          if (typeof t !== "number" || t % 1 !== 0) {
            throw TypeError("Illegal offset: " + t + " (not an integer)");
          }

          t >>>= 0;

          if (t < 0 || t + 0 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + t + " (+" + 0 + ") <= " + this.buffer.byteLength);
          }
        }

        var q;
        var v = t;
        q = o.calculateUTF16asUTF8(b(u))[1];
        t += q;
        var r = this.buffer.byteLength;

        if (t > r) {
          this.resize((r *= 2) > t ? r : t);
        }

        t -= q;
        o.encodeUTF16toUTF8(b(u), function (w) {
          this.view[t++] = w;
        }.bind(this));

        if (s) {
          this.offset = t;
          return this;
        }

        return t - v;
      };

      l.writeString = l.writeUTF8String;

      n.calculateUTF8Chars = function (q) {
        return o.calculateUTF16asUTF8(b(q))[0];
      };

      n.calculateUTF8Bytes = function (q) {
        return o.calculateUTF16asUTF8(b(q))[1];
      };

      n.calculateString = n.calculateUTF8Bytes;

      l.readUTF8String = function (t, s, w) {
        if (typeof s === "number") {
          w = s;
          s = undefined;
        }

        var u = typeof w === "undefined";

        if (u) {
          w = this.offset;
        }

        if (typeof s === "undefined") {
          s = n.METRICS_CHARS;
        }

        if (!this.noAssert) {
          if (typeof t !== "number" || t % 1 !== 0) {
            throw TypeError("Illegal length: " + t + " (not an integer)");
          }

          t |= 0;

          if (typeof w !== "number" || w % 1 !== 0) {
            throw TypeError("Illegal offset: " + w + " (not an integer)");
          }

          w >>>= 0;

          if (w < 0 || w + 0 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + w + " (+" + 0 + ") <= " + this.buffer.byteLength);
          }
        }

        var r = 0,
            x = w,
            v;

        if (s === n.METRICS_CHARS) {
          v = f();
          o.decodeUTF8(function () {
            return r < t && w < this.limit ? this.view[w++] : null;
          }.bind(this), function (y) {
            ++r;
            o.UTF8toUTF16(y, v);
          });

          if (r !== t) {
            throw RangeError("Illegal range: Truncated data, " + r + " == " + t);
          }

          if (u) {
            this.offset = w;
            return v();
          } else {
            return {
              string: v(),
              length: w - x
            };
          }
        } else {
          if (s === n.METRICS_BYTES) {
            if (!this.noAssert) {
              if (typeof w !== "number" || w % 1 !== 0) {
                throw TypeError("Illegal offset: " + w + " (not an integer)");
              }

              w >>>= 0;

              if (w < 0 || w + t > this.buffer.byteLength) {
                throw RangeError("Illegal offset: 0 <= " + w + " (+" + t + ") <= " + this.buffer.byteLength);
              }
            }

            var q = w + t;
            o.decodeUTF8toUTF16(function () {
              return w < q ? this.view[w++] : null;
            }.bind(this), v = f(), this.noAssert);

            if (w !== q) {
              throw RangeError("Illegal range: Truncated data, " + w + " == " + q);
            }

            if (u) {
              this.offset = w;
              return v();
            } else {
              return {
                string: v(),
                length: w - x
              };
            }
          } else {
            throw TypeError("Unsupported metrics: " + s);
          }
        }
      };

      l.readString = l.readUTF8String;

      l.writeVString = function (v, u) {
        var t = typeof u === "undefined";

        if (t) {
          u = this.offset;
        }

        if (!this.noAssert) {
          if (typeof v !== "string") {
            throw TypeError("Illegal str: Not a string");
          }

          if (typeof u !== "number" || u % 1 !== 0) {
            throw TypeError("Illegal offset: " + u + " (not an integer)");
          }

          u >>>= 0;

          if (u < 0 || u + 0 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + u + " (+" + 0 + ") <= " + this.buffer.byteLength);
          }
        }

        var w = u,
            s,
            q;
        s = o.calculateUTF16asUTF8(b(v), this.noAssert)[1];
        q = n.calculateVarint32(s);
        u += q + s;
        var r = this.buffer.byteLength;

        if (u > r) {
          this.resize((r *= 2) > u ? r : u);
        }

        u -= q + s;
        u += this.writeVarint32(s, u);
        o.encodeUTF16toUTF8(b(v), function (x) {
          this.view[u++] = x;
        }.bind(this));

        if (u !== w + s + q) {
          throw RangeError("Illegal range: Truncated data, " + u + " == " + (u + s + q));
        }

        if (t) {
          this.offset = u;
          return this;
        }

        return u - w;
      };

      l.readVString = function (t) {
        var r = typeof t === "undefined";

        if (r) {
          t = this.offset;
        }

        if (!this.noAssert) {
          if (typeof t !== "number" || t % 1 !== 0) {
            throw TypeError("Illegal offset: " + t + " (not an integer)");
          }

          t >>>= 0;

          if (t < 0 || t + 1 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + t + " (+" + 1 + ") <= " + this.buffer.byteLength);
          }
        }

        var u = t;
        var q = this.readVarint32(t);
        var s = this.readUTF8String(q.value, n.METRICS_BYTES, t += q.length);
        t += s.length;

        if (r) {
          this.offset = t;
          return s.string;
        } else {
          return {
            string: s.string,
            length: t - u
          };
        }
      };

      l.append = function (u, s, v) {
        if (typeof s === "number" || typeof s !== "string") {
          v = s;
          s = undefined;
        }

        var t = typeof v === "undefined";

        if (t) {
          v = this.offset;
        }

        if (!this.noAssert) {
          if (typeof v !== "number" || v % 1 !== 0) {
            throw TypeError("Illegal offset: " + v + " (not an integer)");
          }

          v >>>= 0;

          if (v < 0 || v + 0 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + v + " (+" + 0 + ") <= " + this.buffer.byteLength);
          }
        }

        if (!(u instanceof n)) {
          u = n.wrap(u, s);
        }

        var r = u.limit - u.offset;

        if (r <= 0) {
          return this;
        }

        v += r;
        var q = this.buffer.byteLength;

        if (v > q) {
          this.resize((q *= 2) > v ? q : v);
        }

        v -= r;
        this.view.set(u.view.subarray(u.offset, u.limit), v);
        u.offset += r;

        if (t) {
          this.offset += r;
        }

        return this;
      };

      l.appendTo = function (q, r) {
        q.append(this, r);
        return this;
      };

      l.assert = function (q) {
        this.noAssert = !q;
        return this;
      };

      l.capacity = function () {
        return this.buffer.byteLength;
      };

      l.clear = function () {
        this.offset = 0;
        this.limit = this.buffer.byteLength;
        this.markedOffset = -1;
        return this;
      };

      l.clone = function (r) {
        var q = new n(0, this.littleEndian, this.noAssert);

        if (r) {
          q.buffer = new ArrayBuffer(this.buffer.byteLength);
          q.view = new Uint8Array(q.buffer);
        } else {
          q.buffer = this.buffer;
          q.view = this.view;
        }

        q.offset = this.offset;
        q.markedOffset = this.markedOffset;
        q.limit = this.limit;
        return q;
      };

      l.compact = function (u, t) {
        if (typeof u === "undefined") {
          u = this.offset;
        }

        if (typeof t === "undefined") {
          t = this.limit;
        }

        if (!this.noAssert) {
          if (typeof u !== "number" || u % 1 !== 0) {
            throw TypeError("Illegal begin: Not an integer");
          }

          u >>>= 0;

          if (typeof t !== "number" || t % 1 !== 0) {
            throw TypeError("Illegal end: Not an integer");
          }

          t >>>= 0;

          if (u < 0 || u > t || t > this.buffer.byteLength) {
            throw RangeError("Illegal range: 0 <= " + u + " <= " + t + " <= " + this.buffer.byteLength);
          }
        }

        if (u === 0 && t === this.buffer.byteLength) {
          return this;
        }

        var q = t - u;

        if (q === 0) {
          this.buffer = p;
          this.view = null;

          if (this.markedOffset >= 0) {
            this.markedOffset -= u;
          }

          this.offset = 0;
          this.limit = 0;
          return this;
        }

        var s = new ArrayBuffer(q);
        var r = new Uint8Array(s);
        r.set(this.view.subarray(u, t));
        this.buffer = s;
        this.view = r;

        if (this.markedOffset >= 0) {
          this.markedOffset -= u;
        }

        this.offset = 0;
        this.limit = q;
        return this;
      };

      l.copy = function (s, q) {
        if (typeof s === "undefined") {
          s = this.offset;
        }

        if (typeof q === "undefined") {
          q = this.limit;
        }

        if (!this.noAssert) {
          if (typeof s !== "number" || s % 1 !== 0) {
            throw TypeError("Illegal begin: Not an integer");
          }

          s >>>= 0;

          if (typeof q !== "number" || q % 1 !== 0) {
            throw TypeError("Illegal end: Not an integer");
          }

          q >>>= 0;

          if (s < 0 || s > q || q > this.buffer.byteLength) {
            throw RangeError("Illegal range: 0 <= " + s + " <= " + q + " <= " + this.buffer.byteLength);
          }
        }

        if (s === q) {
          return new n(0, this.littleEndian, this.noAssert);
        }

        var r = q - s,
            t = new n(r, this.littleEndian, this.noAssert);
        t.offset = 0;
        t.limit = r;

        if (t.markedOffset >= 0) {
          t.markedOffset -= s;
        }

        this.copyTo(t, 0, s, q);
        return t;
      };

      l.copyTo = function (u, w, s, v) {
        var t, r;

        if (!this.noAssert) {
          if (!n.isByteBuffer(u)) {
            throw TypeError("Illegal target: Not a ByteBuffer");
          }
        }

        w = (r = typeof w === "undefined") ? u.offset : w | 0;
        s = (t = typeof s === "undefined") ? this.offset : s | 0;
        v = typeof v === "undefined" ? this.limit : v | 0;

        if (w < 0 || w > u.buffer.byteLength) {
          throw RangeError("Illegal target range: 0 <= " + w + " <= " + u.buffer.byteLength);
        }

        if (s < 0 || v > this.buffer.byteLength) {
          throw RangeError("Illegal source range: 0 <= " + s + " <= " + this.buffer.byteLength);
        }

        var q = v - s;

        if (q === 0) {
          return u;
        }

        u.ensureCapacity(w + q);
        u.view.set(this.view.subarray(s, v), w);

        if (t) {
          this.offset += q;
        }

        if (r) {
          u.offset += q;
        }

        return this;
      };

      l.ensureCapacity = function (q) {
        var r = this.buffer.byteLength;

        if (r < q) {
          return this.resize((r *= 2) > q ? r : q);
        }

        return this;
      };

      l.fill = function (t, r, q) {
        var s = typeof r === "undefined";

        if (s) {
          r = this.offset;
        }

        if (typeof t === "string" && t.length > 0) {
          t = t.charCodeAt(0);
        }

        if (typeof r === "undefined") {
          r = this.offset;
        }

        if (typeof q === "undefined") {
          q = this.limit;
        }

        if (!this.noAssert) {
          if (typeof t !== "number" || t % 1 !== 0) {
            throw TypeError("Illegal value: " + t + " (not an integer)");
          }

          t |= 0;

          if (typeof r !== "number" || r % 1 !== 0) {
            throw TypeError("Illegal begin: Not an integer");
          }

          r >>>= 0;

          if (typeof q !== "number" || q % 1 !== 0) {
            throw TypeError("Illegal end: Not an integer");
          }

          q >>>= 0;

          if (r < 0 || r > q || q > this.buffer.byteLength) {
            throw RangeError("Illegal range: 0 <= " + r + " <= " + q + " <= " + this.buffer.byteLength);
          }
        }

        if (r >= q) {
          return this;
        }

        while (r < q) {
          this.view[r++] = t;
        }

        if (s) {
          this.offset = r;
        }

        return this;
      };

      l.flip = function () {
        this.limit = this.offset;
        this.offset = 0;
        return this;
      };

      l.mark = function (q) {
        q = typeof q === "undefined" ? this.offset : q;

        if (!this.noAssert) {
          if (typeof q !== "number" || q % 1 !== 0) {
            throw TypeError("Illegal offset: " + q + " (not an integer)");
          }

          q >>>= 0;

          if (q < 0 || q + 0 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + q + " (+" + 0 + ") <= " + this.buffer.byteLength);
          }
        }

        this.markedOffset = q;
        return this;
      };

      l.order = function (q) {
        if (!this.noAssert) {
          if (typeof q !== "boolean") {
            throw TypeError("Illegal littleEndian: Not a boolean");
          }
        }

        this.littleEndian = !!q;
        return this;
      };

      l.LE = function (q) {
        this.littleEndian = typeof q !== "undefined" ? !!q : true;
        return this;
      };

      l.BE = function (q) {
        this.littleEndian = typeof q !== "undefined" ? !q : false;
        return this;
      };

      l.prepend = function (q, s, t) {
        if (typeof s === "number" || typeof s !== "string") {
          t = s;
          s = undefined;
        }

        var r = typeof t === "undefined";

        if (r) {
          t = this.offset;
        }

        if (!this.noAssert) {
          if (typeof t !== "number" || t % 1 !== 0) {
            throw TypeError("Illegal offset: " + t + " (not an integer)");
          }

          t >>>= 0;

          if (t < 0 || t + 0 > this.buffer.byteLength) {
            throw RangeError("Illegal offset: 0 <= " + t + " (+" + 0 + ") <= " + this.buffer.byteLength);
          }
        }

        if (!(q instanceof n)) {
          q = n.wrap(q, s);
        }

        var v = q.limit - q.offset;

        if (v <= 0) {
          return this;
        }

        var y = v - t;

        if (y > 0) {
          var u = new ArrayBuffer(this.buffer.byteLength + y);
          var x = new Uint8Array(u);
          x.set(this.view.subarray(t, this.buffer.byteLength), v);
          this.buffer = u;
          this.view = x;
          this.offset += y;

          if (this.markedOffset >= 0) {
            this.markedOffset += y;
          }

          this.limit += y;
          t += y;
        } else {
          var w = new Uint8Array(this.buffer);
        }

        this.view.set(q.view.subarray(q.offset, q.limit), t - v);
        q.offset = q.limit;

        if (r) {
          this.offset -= v;
        }

        return this;
      };

      l.prependTo = function (q, r) {
        q.prepend(this, r);
        return this;
      };

      l.printDebug = function (q) {
        if (typeof q !== "function") {
          q = console.log.bind(console);
        }

        q(this.toString() + "\n-------------------------------------------------------------------\n" + this.toDebug(true));
      };

      l.remaining = function () {
        return this.limit - this.offset;
      };

      l.reset = function () {
        if (this.markedOffset >= 0) {
          this.offset = this.markedOffset;
          this.markedOffset = -1;
        } else {
          this.offset = 0;
        }

        return this;
      };

      l.resize = function (s) {
        if (!this.noAssert) {
          if (typeof s !== "number" || s % 1 !== 0) {
            throw TypeError("Illegal capacity: " + s + " (not an integer)");
          }

          s |= 0;

          if (s < 0) {
            throw RangeError("Illegal capacity: 0 <= " + s);
          }
        }

        if (this.buffer.byteLength < s) {
          var r = new ArrayBuffer(s);
          var q = new Uint8Array(r);
          q.set(this.view);
          this.buffer = r;
          this.view = q;
        }

        return this;
      };

      l.reverse = function (r, q) {
        if (typeof r === "undefined") {
          r = this.offset;
        }

        if (typeof q === "undefined") {
          q = this.limit;
        }

        if (!this.noAssert) {
          if (typeof r !== "number" || r % 1 !== 0) {
            throw TypeError("Illegal begin: Not an integer");
          }

          r >>>= 0;

          if (typeof q !== "number" || q % 1 !== 0) {
            throw TypeError("Illegal end: Not an integer");
          }

          q >>>= 0;

          if (r < 0 || r > q || q > this.buffer.byteLength) {
            throw RangeError("Illegal range: 0 <= " + r + " <= " + q + " <= " + this.buffer.byteLength);
          }
        }

        if (r === q) {
          return this;
        }

        Array.prototype.reverse.call(this.view.subarray(r, q));
        return this;
      };

      l.skip = function (q) {
        if (!this.noAssert) {
          if (typeof q !== "number" || q % 1 !== 0) {
            throw TypeError("Illegal length: " + q + " (not an integer)");
          }

          q |= 0;
        }

        var r = this.offset + q;

        if (!this.noAssert) {
          if (r < 0 || r > this.buffer.byteLength) {
            throw RangeError("Illegal length: 0 <= " + this.offset + " + " + q + " <= " + this.buffer.byteLength);
          }
        }

        this.offset = r;
        return this;
      };

      l.slice = function (r, q) {
        if (typeof r === "undefined") {
          r = this.offset;
        }

        if (typeof q === "undefined") {
          q = this.limit;
        }

        if (!this.noAssert) {
          if (typeof r !== "number" || r % 1 !== 0) {
            throw TypeError("Illegal begin: Not an integer");
          }

          r >>>= 0;

          if (typeof q !== "number" || q % 1 !== 0) {
            throw TypeError("Illegal end: Not an integer");
          }

          q >>>= 0;

          if (r < 0 || r > q || q > this.buffer.byteLength) {
            throw RangeError("Illegal range: 0 <= " + r + " <= " + q + " <= " + this.buffer.byteLength);
          }
        }

        var s = this.clone();
        s.offset = r;
        s.limit = q;
        return s;
      };

      l.toBuffer = function (q) {
        var t = this.offset,
            s = this.limit;

        if (!this.noAssert) {
          if (typeof t !== "number" || t % 1 !== 0) {
            throw TypeError("Illegal offset: Not an integer");
          }

          t >>>= 0;

          if (typeof s !== "number" || s % 1 !== 0) {
            throw TypeError("Illegal limit: Not an integer");
          }

          s >>>= 0;

          if (t < 0 || t > s || s > this.buffer.byteLength) {
            throw RangeError("Illegal range: 0 <= " + t + " <= " + s + " <= " + this.buffer.byteLength);
          }
        }

        if (!q && t === 0 && s === this.buffer.byteLength) {
          return this.buffer;
        }

        if (t === s) {
          return p;
        }

        var r = new ArrayBuffer(s - t);
        new Uint8Array(r).set(new Uint8Array(this.buffer).subarray(t, s), 0);
        return r;
      };

      l.toArrayBuffer = l.toBuffer;

      l.toString = function (s, r, q) {
        if (typeof s === "undefined") {
          return "ByteBufferAB(offset=" + this.offset + ",markedOffset=" + this.markedOffset + ",limit=" + this.limit + ",capacity=" + this.capacity() + ")";
        }

        if (typeof s === "number") {
          s = "utf8", r = s, q = r;
        }

        switch (s) {
          case "utf8":
            return this.toUTF8(r, q);

          case "base64":
            return this.toBase64(r, q);

          case "hex":
            return this.toHex(r, q);

          case "binary":
            return this.toBinary(r, q);

          case "debug":
            return this.toDebug();

          case "columns":
            return this.toColumns();

          default:
            throw Error("Unsupported encoding: " + s);
        }
      };

      var h = function () {
        var r = {};
        var u = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47];
        var t = [];

        for (var s = 0, q = u.length; s < q; ++s) {
          t[u[s]] = s;
        }

        r.encode = function (x, y) {
          var v, w;

          while ((v = x()) !== null) {
            y(u[v >> 2 & 63]);
            w = (v & 3) << 4;

            if ((v = x()) !== null) {
              w |= v >> 4 & 15;
              y(u[(w | v >> 4 & 15) & 63]);
              w = (v & 15) << 2;

              if ((v = x()) !== null) {
                y(u[(w | v >> 6 & 3) & 63]), y(u[v & 63]);
              } else {
                y(u[w & 63]), y(61);
              }
            } else {
              y(u[w & 63]), y(61), y(61);
            }
          }
        };

        r.decode = function (y, A) {
          var z, x, w;

          function v(B) {
            throw Error("Illegal character code: " + B);
          }

          while ((z = y()) !== null) {
            x = t[z];

            if (typeof x === "undefined") {
              v(z);
            }

            if ((z = y()) !== null) {
              w = t[z];

              if (typeof w === "undefined") {
                v(z);
              }

              A(x << 2 >>> 0 | (w & 48) >> 4);

              if ((z = y()) !== null) {
                x = t[z];

                if (typeof x === "undefined") {
                  if (z === 61) {
                    break;
                  } else {
                    v(z);
                  }
                }

                A((w & 15) << 4 >>> 0 | (x & 60) >> 2);

                if ((z = y()) !== null) {
                  w = t[z];

                  if (typeof w === "undefined") {
                    if (z === 61) {
                      break;
                    } else {
                      v(z);
                    }
                  }

                  A((x & 3) << 6 >>> 0 | w);
                }
              }
            }
          }
        };

        r.test = function (v) {
          return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(v);
        };

        return r;
      }();

      l.toBase64 = function (r, q) {
        if (typeof r === "undefined") {
          r = this.offset;
        }

        if (typeof q === "undefined") {
          q = this.limit;
        }

        r = r | 0;
        q = q | 0;

        if (r < 0 || q > this.capacity || r > q) {
          throw RangeError("begin, end");
        }

        var s;
        h.encode(function () {
          return r < q ? this.view[r++] : null;
        }.bind(this), s = f());
        return s();
      };

      n.fromBase64 = function (t, r) {
        if (typeof t !== "string") {
          throw TypeError("str");
        }

        var s = new n(t.length / 4 * 3, r),
            q = 0;
        h.decode(b(t), function (u) {
          s.view[q++] = u;
        });
        s.limit = q;
        return s;
      };

      n.btoa = function (q) {
        return n.fromBinary(q).toBase64();
      };

      n.atob = function (q) {
        return n.fromBase64(q).toBinary();
      };

      l.toBinary = function (r, q) {
        if (typeof r === "undefined") {
          r = this.offset;
        }

        if (typeof q === "undefined") {
          q = this.limit;
        }

        r |= 0;
        q |= 0;

        if (r < 0 || q > this.capacity() || r > q) {
          throw RangeError("begin, end");
        }

        if (r === q) {
          return "";
        }

        var s = [],
            t = [];

        while (r < q) {
          s.push(this.view[r++]);

          if (s.length >= 1024) {
            t.push(String.fromCharCode.apply(String, s)), s = [];
          }
        }

        return t.join("") + String.fromCharCode.apply(String, s);
      };

      n.fromBinary = function (v, t) {
        if (typeof v !== "string") {
          throw TypeError("str");
        }

        var s = 0,
            r = v.length,
            q,
            u = new n(r, t);

        while (s < r) {
          q = v.charCodeAt(s);

          if (q > 255) {
            throw RangeError("illegal char code: " + q);
          }

          u.view[s++] = q;
        }

        u.limit = r;
        return u;
      };

      l.toDebug = function (u) {
        var t = -1,
            r = this.buffer.byteLength,
            q,
            w = "",
            v = "",
            s = "";

        while (t < r) {
          if (t !== -1) {
            q = this.view[t];

            if (q < 16) {
              w += "0" + q.toString(16).toUpperCase();
            } else {
              w += q.toString(16).toUpperCase();
            }

            if (u) {
              v += q > 32 && q < 127 ? String.fromCharCode(q) : ".";
            }
          }

          ++t;

          if (u) {
            if (t > 0 && t % 16 === 0 && t !== r) {
              while (w.length < 3 * 16 + 3) {
                w += " ";
              }

              s += w + v + "\n";
              w = v = "";
            }
          }

          if (t === this.offset && t === this.limit) {
            w += t === this.markedOffset ? "!" : "|";
          } else {
            if (t === this.offset) {
              w += t === this.markedOffset ? "[" : "<";
            } else {
              if (t === this.limit) {
                w += t === this.markedOffset ? "]" : ">";
              } else {
                w += t === this.markedOffset ? "'" : u || t !== 0 && t !== r ? " " : "";
              }
            }
          }
        }

        if (u && w !== " ") {
          while (w.length < 3 * 16 + 3) {
            w += " ";
          }

          s += w + v + "\n";
        }

        return u ? s : w;
      };

      n.fromDebug = function (A, s, C) {
        var w = A.length,
            z = new n((w + 1) / 3 | 0, s, C);
        var y = 0,
            x = 0,
            q,
            B,
            v = false,
            D = false,
            r = false,
            t = false,
            u = false;

        while (y < w) {
          switch (q = A.charAt(y++)) {
            case "!":
              if (!C) {
                if (D || r || t) {
                  u = true;
                  break;
                }

                D = r = t = true;
              }

              z.offset = z.markedOffset = z.limit = x;
              v = false;
              break;

            case "|":
              if (!C) {
                if (D || t) {
                  u = true;
                  break;
                }

                D = t = true;
              }

              z.offset = z.limit = x;
              v = false;
              break;

            case "[":
              if (!C) {
                if (D || r) {
                  u = true;
                  break;
                }

                D = r = true;
              }

              z.offset = z.markedOffset = x;
              v = false;
              break;

            case "<":
              if (!C) {
                if (D) {
                  u = true;
                  break;
                }

                D = true;
              }

              z.offset = x;
              v = false;
              break;

            case "]":
              if (!C) {
                if (t || r) {
                  u = true;
                  break;
                }

                t = r = true;
              }

              z.limit = z.markedOffset = x;
              v = false;
              break;

            case ">":
              if (!C) {
                if (t) {
                  u = true;
                  break;
                }

                t = true;
              }

              z.limit = x;
              v = false;
              break;

            case "'":
              if (!C) {
                if (r) {
                  u = true;
                  break;
                }

                r = true;
              }

              z.markedOffset = x;
              v = false;
              break;

            case " ":
              v = false;
              break;

            default:
              if (!C) {
                if (v) {
                  u = true;
                  break;
                }
              }

              B = parseInt(q + A.charAt(y++), 16);

              if (!C) {
                if (isNaN(B) || B < 0 || B > 255) {
                  throw TypeError("Illegal str: Not a debug encoded string");
                }
              }

              z.view[x++] = B;
              v = true;
          }

          if (u) {
            throw TypeError("Illegal str: Invalid symbol at " + y);
          }
        }

        if (!C) {
          if (!D || !t) {
            throw TypeError("Illegal str: Missing offset or limit");
          }

          if (x < z.buffer.byteLength) {
            throw TypeError("Illegal str: Not a debug encoded string (is it hex?) " + x + " < " + w);
          }
        }

        return z;
      };

      l.toHex = function (t, r) {
        t = typeof t === "undefined" ? this.offset : t;
        r = typeof r === "undefined" ? this.limit : r;

        if (!this.noAssert) {
          if (typeof t !== "number" || t % 1 !== 0) {
            throw TypeError("Illegal begin: Not an integer");
          }

          t >>>= 0;

          if (typeof r !== "number" || r % 1 !== 0) {
            throw TypeError("Illegal end: Not an integer");
          }

          r >>>= 0;

          if (t < 0 || t > r || r > this.buffer.byteLength) {
            throw RangeError("Illegal range: 0 <= " + t + " <= " + r + " <= " + this.buffer.byteLength);
          }
        }

        var s = new Array(r - t),
            q;

        while (t < r) {
          q = this.view[t++];

          if (q < 16) {
            s.push("0", q.toString(16));
          } else {
            s.push(q.toString(16));
          }
        }

        return s.join("");
      };

      n.fromHex = function (x, v, u) {
        if (!u) {
          if (typeof x !== "string") {
            throw TypeError("Illegal str: Not a string");
          }

          if (x.length % 2 !== 0) {
            throw TypeError("Illegal str: Length not a multiple of 2");
          }
        }

        var r = x.length,
            w = new n(r / 2 | 0, v),
            q;

        for (var t = 0, s = 0; t < r; t += 2) {
          q = parseInt(x.substring(t, t + 2), 16);

          if (!u) {
            if (!isFinite(q) || q < 0 || q > 255) {
              throw TypeError("Illegal str: Contains non-hex characters");
            }
          }

          w.view[s++] = q;
        }

        w.limit = s;
        return w;
      };

      var o = function () {
        var q = {};
        q.MAX_CODEPOINT = 1114111;

        q.encodeUTF8 = function (s, t) {
          var r = null;

          if (typeof s === "number") {
            r = s, s = function () {
              return null;
            };
          }

          while (r !== null || (r = s()) !== null) {
            if (r < 128) {
              t(r & 127);
            } else {
              if (r < 2048) {
                t(r >> 6 & 31 | 192), t(r & 63 | 128);
              } else {
                if (r < 65536) {
                  t(r >> 12 & 15 | 224), t(r >> 6 & 63 | 128), t(r & 63 | 128);
                } else {
                  t(r >> 18 & 7 | 240), t(r >> 12 & 63 | 128), t(r >> 6 & 63 | 128), t(r & 63 | 128);
                }
              }
            }

            r = null;
          }
        };

        q.decodeUTF8 = function (v, x) {
          var t,
              r,
              w,
              u,
              s = function (y) {
            y = y.slice(0, y.indexOf(null));
            var z = Error(y.toString());
            z.name = "TruncatedError";
            z.bytes = y;
            throw z;
          };

          while ((t = v()) !== null) {
            if ((t & 128) === 0) {
              x(t);
            } else {
              if ((t & 224) === 192) {
                (r = v()) === null && s([t, r]), x((t & 31) << 6 | r & 63);
              } else {
                if ((t & 240) === 224) {
                  ((r = v()) === null || (w = v()) === null) && s([t, r, w]), x((t & 15) << 12 | (r & 63) << 6 | w & 63);
                } else {
                  if ((t & 248) === 240) {
                    ((r = v()) === null || (w = v()) === null || (u = v()) === null) && s([t, r, w, u]), x((t & 7) << 18 | (r & 63) << 12 | (w & 63) << 6 | u & 63);
                  } else {
                    throw RangeError("Illegal starting byte: " + t);
                  }
                }
              }
            }
          }
        };

        q.UTF16toUTF8 = function (t, u) {
          var s,
              r = null;

          while (true) {
            if ((s = r !== null ? r : t()) === null) {
              break;
            }

            if (s >= 55296 && s <= 57343) {
              if ((r = t()) !== null) {
                if (r >= 56320 && r <= 57343) {
                  u((s - 55296) * 1024 + r - 56320 + 65536);
                  r = null;
                  continue;
                }
              }
            }

            u(s);
          }

          if (r !== null) {
            u(r);
          }
        };

        q.UTF8toUTF16 = function (s, t) {
          var r = null;

          if (typeof s === "number") {
            r = s, s = function () {
              return null;
            };
          }

          while (r !== null || (r = s()) !== null) {
            if (r <= 65535) {
              t(r);
            } else {
              r -= 65536, t((r >> 10) + 55296), t(r % 1024 + 56320);
            }

            r = null;
          }
        };

        q.encodeUTF16toUTF8 = function (r, s) {
          q.UTF16toUTF8(r, function (t) {
            q.encodeUTF8(t, s);
          });
        };

        q.decodeUTF8toUTF16 = function (r, s) {
          q.decodeUTF8(r, function (t) {
            q.UTF8toUTF16(t, s);
          });
        };

        q.calculateCodePoint = function (r) {
          return r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
        };

        q.calculateUTF8 = function (t) {
          var s,
              r = 0;

          while ((s = t()) !== null) {
            r += s < 128 ? 1 : s < 2048 ? 2 : s < 65536 ? 3 : 4;
          }

          return r;
        };

        q.calculateUTF16asUTF8 = function (s) {
          var t = 0,
              r = 0;
          q.UTF16toUTF8(s, function (u) {
            ++t;
            r += u < 128 ? 1 : u < 2048 ? 2 : u < 65536 ? 3 : 4;
          });
          return [t, r];
        };

        return q;
      }();

      l.toUTF8 = function (r, q) {
        if (typeof r === "undefined") {
          r = this.offset;
        }

        if (typeof q === "undefined") {
          q = this.limit;
        }

        if (!this.noAssert) {
          if (typeof r !== "number" || r % 1 !== 0) {
            throw TypeError("Illegal begin: Not an integer");
          }

          r >>>= 0;

          if (typeof q !== "number" || q % 1 !== 0) {
            throw TypeError("Illegal end: Not an integer");
          }

          q >>>= 0;

          if (r < 0 || r > q || q > this.buffer.byteLength) {
            throw RangeError("Illegal range: 0 <= " + r + " <= " + q + " <= " + this.buffer.byteLength);
          }
        }

        var t;

        try {
          o.decodeUTF8toUTF16(function () {
            return r < q ? this.view[r++] : null;
          }.bind(this), t = f());
        } catch (s) {
          if (r !== q) {
            throw RangeError("Illegal range: Truncated data, " + r + " != " + q);
          }
        }

        return t();
      };

      n.fromUTF8 = function (u, s, r) {
        if (!r) {
          if (typeof u !== "string") {
            throw TypeError("Illegal str: Not a string");
          }
        }

        var t = new n(o.calculateUTF16asUTF8(b(u), true)[1], s, r),
            q = 0;
        o.encodeUTF16toUTF8(b(u), function (v) {
          t.view[q++] = v;
        });
        t.limit = q;
        return t;
      };

      return n;
    }(d);

    var e = function (j, k, f) {
      var l = {};
      l.ByteBuffer = j;
      l.c = j;
      var n = j;
      l.Long = k || null;
      l.VERSION = "5.0.1";
      l.WIRE_TYPES = {};
      l.WIRE_TYPES.VARINT = 0;
      l.WIRE_TYPES.BITS64 = 1;
      l.WIRE_TYPES.LDELIM = 2;
      l.WIRE_TYPES.STARTGROUP = 3;
      l.WIRE_TYPES.ENDGROUP = 4;
      l.WIRE_TYPES.BITS32 = 5;
      l.PACKABLE_WIRE_TYPES = [l.WIRE_TYPES.VARINT, l.WIRE_TYPES.BITS64, l.WIRE_TYPES.BITS32];
      l.TYPES = {
        int32: {
          name: "int32",
          wireType: l.WIRE_TYPES.VARINT,
          defaultValue: 0
        },
        uint32: {
          name: "uint32",
          wireType: l.WIRE_TYPES.VARINT,
          defaultValue: 0
        },
        sint32: {
          name: "sint32",
          wireType: l.WIRE_TYPES.VARINT,
          defaultValue: 0
        },
        int64: {
          name: "int64",
          wireType: l.WIRE_TYPES.VARINT,
          defaultValue: l.Long ? l.Long.ZERO : undefined
        },
        uint64: {
          name: "uint64",
          wireType: l.WIRE_TYPES.VARINT,
          defaultValue: l.Long ? l.Long.UZERO : undefined
        },
        sint64: {
          name: "sint64",
          wireType: l.WIRE_TYPES.VARINT,
          defaultValue: l.Long ? l.Long.ZERO : undefined
        },
        bool: {
          name: "bool",
          wireType: l.WIRE_TYPES.VARINT,
          defaultValue: false
        },
        "double": {
          name: "double",
          wireType: l.WIRE_TYPES.BITS64,
          defaultValue: 0
        },
        string: {
          name: "string",
          wireType: l.WIRE_TYPES.LDELIM,
          defaultValue: ""
        },
        bytes: {
          name: "bytes",
          wireType: l.WIRE_TYPES.LDELIM,
          defaultValue: null
        },
        fixed32: {
          name: "fixed32",
          wireType: l.WIRE_TYPES.BITS32,
          defaultValue: 0
        },
        sfixed32: {
          name: "sfixed32",
          wireType: l.WIRE_TYPES.BITS32,
          defaultValue: 0
        },
        fixed64: {
          name: "fixed64",
          wireType: l.WIRE_TYPES.BITS64,
          defaultValue: l.Long ? l.Long.UZERO : undefined
        },
        sfixed64: {
          name: "sfixed64",
          wireType: l.WIRE_TYPES.BITS64,
          defaultValue: l.Long ? l.Long.ZERO : undefined
        },
        "float": {
          name: "float",
          wireType: l.WIRE_TYPES.BITS32,
          defaultValue: 0
        },
        "enum": {
          name: "enum",
          wireType: l.WIRE_TYPES.VARINT,
          defaultValue: 0
        },
        message: {
          name: "message",
          wireType: l.WIRE_TYPES.LDELIM,
          defaultValue: null
        },
        group: {
          name: "group",
          wireType: l.WIRE_TYPES.STARTGROUP,
          defaultValue: null
        }
      };
      l.MAP_KEY_TYPES = [l.TYPES.int32, l.TYPES.sint32, l.TYPES.sfixed32, l.TYPES.uint32, l.TYPES.fixed32, l.TYPES.int64, l.TYPES.sint64, l.TYPES.sfixed64, l.TYPES.uint64, l.TYPES.fixed64, l.TYPES.bool, l.TYPES.string, l.TYPES.bytes];
      l.ID_MIN = 1;
      l.ID_MAX = 536870911;
      l.convertFieldsToCamelCase = false;
      l.populateAccessors = true;
      l.populateDefaults = true;

      l.Util = function () {
        var b = {};
        b.IS_NODE = !!(typeof process === "object" && process + "" === "[object process]" && !process.browser);

        b.XHR = function () {
          var r = [function () {
            return new XMLHttpRequest();
          }, function () {
            return new ActiveXObject("Msxml2.XMLHTTP");
          }, function () {
            return new ActiveXObject("Msxml3.XMLHTTP");
          }, function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
          }];
          var o = null;

          for (var q = 0; q < r.length; q++) {
            try {
              o = r[q]();
            } catch (p) {
              continue;
            }

            break;
          }

          if (!o) {
            throw Error("XMLHttpRequest is not supported");
          }

          return o;
        };

        b.fetch = function (q, o) {
          if (o && typeof o != "function") {
            o = null;
          }

          if (b.IS_NODE) {
            if (o) {
              g.readFile(q, function (t, s) {
                if (t) {
                  o(null);
                } else {
                  o("" + s);
                }
              });
            } else {
              try {
                return g.readFileSync(q);
              } catch (r) {
                return null;
              }
            }
          } else {
            var p = b.XHR();
            p.open("GET", q, o ? true : false);
            p.setRequestHeader("Accept", "text/plain");

            if (typeof p.overrideMimeType === "function") {
              p.overrideMimeType("text/plain");
            }

            if (o) {
              p.onreadystatechange = function () {
                if (p.readyState != 4) {
                  return;
                }

                if (p.status == 200 || p.status == 0 && typeof p.responseText === "string") {
                  o(p.responseText);
                } else {
                  o(null);
                }
              };

              if (p.readyState == 4) {
                return;
              }

              p.send(null);
            } else {
              p.send(null);

              if (p.status == 200 || p.status == 0 && typeof p.responseText === "string") {
                return p.responseText;
              }

              return null;
            }
          }
        };

        b.toCamelCase = function (o) {
          return o.replace(/_([a-zA-Z])/g, function (p, q) {
            return q.toUpperCase();
          });
        };

        return b;
      }();

      l.Lang = {
        DELIM: /[\s\{\}=;:\[\],'"\(\)<>]/g,
        RULE: /^(?:required|optional|repeated|map)$/,
        TYPE: /^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/,
        NAME: /^[a-zA-Z_][a-zA-Z_0-9]*$/,
        TYPEDEF: /^[a-zA-Z][a-zA-Z_0-9]*$/,
        TYPEREF: /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,
        FQTYPEREF: /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/,
        NUMBER: /^-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+|([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?)|inf|nan)$/,
        NUMBER_DEC: /^(?:[1-9][0-9]*|0)$/,
        NUMBER_HEX: /^0[xX][0-9a-fA-F]+$/,
        NUMBER_OCT: /^0[0-7]+$/,
        NUMBER_FLT: /^([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?|inf|nan)$/,
        BOOL: /^(?:true|false)$/i,
        ID: /^(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
        NEGID: /^\-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
        WHITESPACE: /\s/,
        STRING: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
        STRING_DQ: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
        STRING_SQ: /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g
      };

      l.DotProto = function (s, t) {
        var q = {};

        var r = function (o) {
          this.source = o + "";
          this.index = 0;
          this.line = 1;
          this.stack = [];
          this._stringOpen = null;
        };

        var b = r.prototype;

        b._readString = function () {
          var o = this._stringOpen === '"' ? t.STRING_DQ : t.STRING_SQ;
          o.lastIndex = this.index - 1;
          var y = o.exec(this.source);

          if (!y) {
            throw Error("unterminated string");
          }

          this.index = o.lastIndex;
          this.stack.push(this._stringOpen);
          this._stringOpen = null;
          return y[1];
        };

        b.next = function () {
          if (this.stack.length > 0) {
            return this.stack.shift();
          }

          if (this.index >= this.source.length) {
            return null;
          }

          if (this._stringOpen !== null) {
            return this._readString();
          }

          var y, z, A;

          do {
            y = false;

            while (t.WHITESPACE.test(A = this.source.charAt(this.index))) {
              if (A === "\n") {
                ++this.line;
              }

              if (++this.index === this.source.length) {
                return null;
              }
            }

            if (this.source.charAt(this.index) === "/") {
              ++this.index;

              if (this.source.charAt(this.index) === "/") {
                while (this.source.charAt(++this.index) !== "\n") {
                  if (this.index == this.source.length) {
                    return null;
                  }
                }

                ++this.index;
                ++this.line;
                y = true;
              } else {
                if ((A = this.source.charAt(this.index)) === "*") {
                  do {
                    if (A === "\n") {
                      ++this.line;
                    }

                    if (++this.index === this.source.length) {
                      return null;
                    }

                    z = A;
                    A = this.source.charAt(this.index);
                  } while (z !== "*" || A !== "/");

                  ++this.index;
                  y = true;
                } else {
                  return "/";
                }
              }
            }
          } while (y);

          if (this.index === this.source.length) {
            return null;
          }

          var C = this.index;
          t.DELIM.lastIndex = 0;
          var o = t.DELIM.test(this.source.charAt(C++));

          if (!o) {
            while (C < this.source.length && !t.DELIM.test(this.source.charAt(C))) {
              ++C;
            }
          }

          var B = this.source.substring(this.index, this.index = C);

          if (B === '"' || B === "'") {
            this._stringOpen = B;
          }

          return B;
        };

        b.peek = function () {
          if (this.stack.length === 0) {
            var o = this.next();

            if (o === null) {
              return null;
            }

            this.stack.push(o);
          }

          return this.stack[0];
        };

        b.skip = function (y) {
          var o = this.next();

          if (o !== y) {
            throw Error("illegal '" + o + "', '" + y + "' expected");
          }
        };

        b.omit = function (o) {
          if (this.peek() === o) {
            this.next();
            return true;
          }

          return false;
        };

        b.toString = function () {
          return "Tokenizer (" + this.index + "/" + this.source.length + " at line " + this.line + ")";
        };

        q.Tokenizer = r;

        var u = function (o) {
          this.tn = new r(o);
          this.proto3 = false;
        };

        var w = u.prototype;

        w.parse = function () {
          var A = {
            name: "[ROOT]",
            "package": null,
            messages: [],
            enums: [],
            imports: [],
            options: {},
            services: []
          };
          var y,
              z = true;

          try {
            while (y = this.tn.next()) {
              switch (y) {
                case "package":
                  if (!z || A["package"] !== null) {
                    throw Error("unexpected 'package'");
                  }

                  y = this.tn.next();

                  if (!t.TYPEREF.test(y)) {
                    throw Error("illegal package name: " + y);
                  }

                  this.tn.skip(";");
                  A["package"] = y;
                  break;

                case "import":
                  if (!z) {
                    throw Error("unexpected 'import'");
                  }

                  y = this.tn.peek();

                  if (y === "public") {
                    this.tn.next();
                  }

                  y = this._readString();
                  this.tn.skip(";");
                  A.imports.push(y);
                  break;

                case "syntax":
                  if (!z) {
                    throw Error("unexpected 'syntax'");
                  }

                  this.tn.skip("=");

                  if ((A.syntax = this._readString()) === "proto3") {
                    this.proto3 = true;
                  }

                  this.tn.skip(";");
                  break;

                case "message":
                  this._parseMessage(A, null);

                  z = false;
                  break;

                case "enum":
                  this._parseEnum(A);

                  z = false;
                  break;

                case "option":
                  this._parseOption(A);

                  break;

                case "service":
                  this._parseService(A);

                  break;

                case "extend":
                  this._parseExtend(A);

                  break;

                default:
                  throw Error("unexpected '" + y + "'");
              }
            }
          } catch (o) {
            o.message = "Parse error at line " + this.tn.line + ": " + o.message;
            throw o;
          }

          delete A.name;
          return A;
        };

        u.parse = function (o) {
          return new u(o).parse();
        };

        function x(y, z) {
          var o = -1,
              A = 1;

          if (y.charAt(0) == "-") {
            A = -1;
            y = y.substring(1);
          }

          if (t.NUMBER_DEC.test(y)) {
            o = parseInt(y);
          } else {
            if (t.NUMBER_HEX.test(y)) {
              o = parseInt(y.substring(2), 16);
            } else {
              if (t.NUMBER_OCT.test(y)) {
                o = parseInt(y.substring(1), 8);
              } else {
                throw Error("illegal id value: " + (A < 0 ? "-" : "") + y);
              }
            }
          }

          o = A * o | 0;

          if (!z && o < 0) {
            throw Error("illegal id value: " + (A < 0 ? "-" : "") + y);
          }

          return o;
        }

        function p(o) {
          var y = 1;

          if (o.charAt(0) == "-") {
            y = -1;
            o = o.substring(1);
          }

          if (t.NUMBER_DEC.test(o)) {
            return y * parseInt(o, 10);
          } else {
            if (t.NUMBER_HEX.test(o)) {
              return y * parseInt(o.substring(2), 16);
            } else {
              if (t.NUMBER_OCT.test(o)) {
                return y * parseInt(o.substring(1), 8);
              } else {
                if (o === "inf") {
                  return y * Infinity;
                } else {
                  if (o === "nan") {
                    return NaN;
                  } else {
                    if (t.NUMBER_FLT.test(o)) {
                      return y * parseFloat(o);
                    }
                  }
                }
              }
            }
          }

          throw Error("illegal number value: " + (y < 0 ? "-" : "") + o);
        }

        w._readString = function () {
          var y = "",
              z,
              o;

          do {
            o = this.tn.next();

            if (o !== "'" && o !== '"') {
              throw Error("illegal string delimiter: " + o);
            }

            y += this.tn.next();
            this.tn.skip(o);
            z = this.tn.peek();
          } while (z === '"' || z === '"');

          return y;
        };

        w._readValue = function (z) {
          var y = this.tn.peek();

          if (y === '"' || y === "'") {
            return this._readString();
          }

          this.tn.next();

          if (t.NUMBER.test(y)) {
            return p(y);
          }

          if (t.BOOL.test(y)) {
            return y.toLowerCase() === "true";
          }

          if (z && t.TYPEREF.test(y)) {
            return y;
          }

          throw Error("illegal value: " + y);
        };

        w._parseOption = function (z, o) {
          var A = this.tn.next(),
              y = false;

          if (A === "(") {
            y = true;
            A = this.tn.next();
          }

          if (!t.TYPEREF.test(A)) {
            throw Error("illegal option name: " + A);
          }

          var B = A;

          if (y) {
            this.tn.skip(")");
            B = "(" + B + ")";
            A = this.tn.peek();

            if (t.FQTYPEREF.test(A)) {
              B += A;
              this.tn.next();
            }
          }

          this.tn.skip("=");

          this._parseOptionValue(z, B);

          if (!o) {
            this.tn.skip(";");
          }
        };

        function v(y, z, o) {
          if (typeof y[z] === "undefined") {
            y[z] = o;
          } else {
            if (!Array.isArray(y[z])) {
              y[z] = [y[z]];
            }

            y[z].push(o);
          }
        }

        w._parseOptionValue = function (o, z) {
          var y = this.tn.peek();

          if (y !== "{") {
            v(o.options, z, this._readValue(true));
          } else {
            this.tn.skip("{");

            while ((y = this.tn.next()) !== "}") {
              if (!t.NAME.test(y)) {
                throw Error("illegal option name: " + z + "." + y);
              }

              if (this.tn.omit(":")) {
                v(o.options, z + "." + y, this._readValue(true));
              } else {
                this._parseOptionValue(o, z + "." + y);
              }
            }
          }
        };

        w._parseService = function (y) {
          var z = this.tn.next();

          if (!t.NAME.test(z)) {
            throw Error("illegal service name at line " + this.tn.line + ": " + z);
          }

          var A = z;
          var o = {
            name: A,
            rpc: {},
            options: {}
          };
          this.tn.skip("{");

          while ((z = this.tn.next()) !== "}") {
            if (z === "option") {
              this._parseOption(o);
            } else {
              if (z === "rpc") {
                this._parseServiceRPC(o);
              } else {
                throw Error("illegal service token: " + z);
              }
            }
          }

          this.tn.omit(";");
          y.services.push(o);
        };

        w._parseServiceRPC = function (y) {
          var z = "rpc",
              A = this.tn.next();

          if (!t.NAME.test(A)) {
            throw Error("illegal rpc service method name: " + A);
          }

          var B = A;
          var o = {
            request: null,
            response: null,
            request_stream: false,
            response_stream: false,
            options: {}
          };
          this.tn.skip("(");
          A = this.tn.next();

          if (A.toLowerCase() === "stream") {
            o.request_stream = true;
            A = this.tn.next();
          }

          if (!t.TYPEREF.test(A)) {
            throw Error("illegal rpc service request type: " + A);
          }

          o.request = A;
          this.tn.skip(")");
          A = this.tn.next();

          if (A.toLowerCase() !== "returns") {
            throw Error("illegal rpc service request type delimiter: " + A);
          }

          this.tn.skip("(");
          A = this.tn.next();

          if (A.toLowerCase() === "stream") {
            o.response_stream = true;
            A = this.tn.next();
          }

          o.response = A;
          this.tn.skip(")");
          A = this.tn.peek();

          if (A === "{") {
            this.tn.next();

            while ((A = this.tn.next()) !== "}") {
              if (A === "option") {
                this._parseOption(o);
              } else {
                throw Error("illegal rpc service token: " + A);
              }
            }

            this.tn.omit(";");
          } else {
            this.tn.skip(";");
          }

          if (typeof y[z] === "undefined") {
            y[z] = {};
          }

          y[z][B] = o;
        };

        w._parseMessage = function (z, A) {
          var o = !!A,
              B = this.tn.next();
          var y = {
            name: "",
            fields: [],
            enums: [],
            messages: [],
            options: {},
            services: [],
            oneofs: {}
          };

          if (!t.NAME.test(B)) {
            throw Error("illegal " + (o ? "group" : "message") + " name: " + B);
          }

          y.name = B;

          if (o) {
            this.tn.skip("=");
            A.id = x(this.tn.next());
            y.isGroup = true;
          }

          B = this.tn.peek();

          if (B === "[" && A) {
            this._parseFieldOptions(A);
          }

          this.tn.skip("{");

          while ((B = this.tn.next()) !== "}") {
            if (t.RULE.test(B)) {
              this._parseMessageField(y, B);
            } else {
              if (B === "oneof") {
                this._parseMessageOneOf(y);
              } else {
                if (B === "enum") {
                  this._parseEnum(y);
                } else {
                  if (B === "message") {
                    this._parseMessage(y);
                  } else {
                    if (B === "option") {
                      this._parseOption(y);
                    } else {
                      if (B === "service") {
                        this._parseService(y);
                      } else {
                        if (B === "extensions") {
                          y.extensions = this._parseExtensionRanges();
                        } else {
                          if (B === "reserved") {
                            this._parseIgnored();
                          } else {
                            if (B === "extend") {
                              this._parseExtend(y);
                            } else {
                              if (t.TYPEREF.test(B)) {
                                if (!this.proto3) {
                                  throw Error("illegal field rule: " + B);
                                }

                                this._parseMessageField(y, "optional", B);
                              } else {
                                throw Error("illegal message token: " + B);
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          this.tn.omit(";");
          z.messages.push(y);
          return y;
        };

        w._parseIgnored = function () {
          while (this.tn.peek() !== ";") {
            this.tn.next();
          }

          this.tn.skip(";");
        };

        w._parseMessageField = function (o, y, z) {
          if (!t.RULE.test(y)) {
            throw Error("illegal message field rule: " + y);
          }

          var A = {
            rule: y,
            type: "",
            name: "",
            options: {},
            id: 0
          };
          var B;

          if (y === "map") {
            if (z) {
              throw Error("illegal type: " + z);
            }

            this.tn.skip("<");
            B = this.tn.next();

            if (!t.TYPE.test(B) && !t.TYPEREF.test(B)) {
              throw Error("illegal message field type: " + B);
            }

            A.keytype = B;
            this.tn.skip(",");
            B = this.tn.next();

            if (!t.TYPE.test(B) && !t.TYPEREF.test(B)) {
              throw Error("illegal message field: " + B);
            }

            A.type = B;
            this.tn.skip(">");
            B = this.tn.next();

            if (!t.NAME.test(B)) {
              throw Error("illegal message field name: " + B);
            }

            A.name = B;
            this.tn.skip("=");
            A.id = x(this.tn.next());
            B = this.tn.peek();

            if (B === "[") {
              this._parseFieldOptions(A);
            }

            this.tn.skip(";");
          } else {
            z = typeof z !== "undefined" ? z : this.tn.next();

            if (z === "group") {
              var C = this._parseMessage(o, A);

              if (!/^[A-Z]/.test(C.name)) {
                throw Error("illegal group name: " + C.name);
              }

              A.type = C.name;
              A.name = C.name.toLowerCase();
              this.tn.omit(";");
            } else {
              if (!t.TYPE.test(z) && !t.TYPEREF.test(z)) {
                throw Error("illegal message field type: " + z);
              }

              A.type = z;
              B = this.tn.next();

              if (!t.NAME.test(B)) {
                throw Error("illegal message field name: " + B);
              }

              A.name = B;
              this.tn.skip("=");
              A.id = x(this.tn.next());
              B = this.tn.peek();

              if (B === "[") {
                this._parseFieldOptions(A);
              }

              this.tn.skip(";");
            }
          }

          o.fields.push(A);
          return A;
        };

        w._parseMessageOneOf = function (o) {
          var y = this.tn.next();

          if (!t.NAME.test(y)) {
            throw Error("illegal oneof name: " + y);
          }

          var A = y,
              z;
          var B = [];
          this.tn.skip("{");

          while ((y = this.tn.next()) !== "}") {
            z = this._parseMessageField(o, "optional", y);
            z.oneof = A;
            B.push(z.id);
          }

          this.tn.omit(";");
          o.oneofs[A] = B;
        };

        w._parseFieldOptions = function (y) {
          this.tn.skip("[");
          var z,
              o = true;

          while ((z = this.tn.peek()) !== "]") {
            if (!o) {
              this.tn.skip(",");
            }

            this._parseOption(y, true);

            o = false;
          }

          this.tn.next();
        };

        w._parseEnum = function (o) {
          var A = {
            name: "",
            values: [],
            options: {}
          };
          var z = this.tn.next();

          if (!t.NAME.test(z)) {
            throw Error("illegal name: " + z);
          }

          A.name = z;
          this.tn.skip("{");

          while ((z = this.tn.next()) !== "}") {
            if (z === "option") {
              this._parseOption(A);
            } else {
              if (!t.NAME.test(z)) {
                throw Error("illegal name: " + z);
              }

              this.tn.skip("=");
              var y = {
                name: z,
                id: x(this.tn.next(), true)
              };
              z = this.tn.peek();

              if (z === "[") {
                this._parseFieldOptions({
                  options: {}
                });
              }

              this.tn.skip(";");
              A.values.push(y);
            }
          }

          this.tn.omit(";");
          o.enums.push(A);
        };

        w._parseExtensionRanges = function () {
          var A = [];
          var y, z, o;

          do {
            z = [];

            while (true) {
              y = this.tn.next();

              switch (y) {
                case "min":
                  o = s.ID_MIN;
                  break;

                case "max":
                  o = s.ID_MAX;
                  break;

                default:
                  o = p(y);
                  break;
              }

              z.push(o);

              if (z.length === 2) {
                break;
              }

              if (this.tn.peek() !== "to") {
                z.push(o);
                break;
              }

              this.tn.next();
            }

            A.push(z);
          } while (this.tn.omit(","));

          this.tn.skip(";");
          return A;
        };

        w._parseExtend = function (o) {
          var z = this.tn.next();

          if (!t.TYPEREF.test(z)) {
            throw Error("illegal extend reference: " + z);
          }

          var y = {
            ref: z,
            fields: []
          };
          this.tn.skip("{");

          while ((z = this.tn.next()) !== "}") {
            if (t.RULE.test(z)) {
              this._parseMessageField(y, z);
            } else {
              if (t.TYPEREF.test(z)) {
                if (!this.proto3) {
                  throw Error("illegal field rule: " + z);
                }

                this._parseMessageField(y, "optional", z);
              } else {
                throw Error("illegal extend token: " + z);
              }
            }
          }

          this.tn.omit(";");
          o.messages.push(y);
          return y;
        };

        w.toString = function () {
          return "Parser at line " + this.tn.line;
        };

        q.Parser = u;
        return q;
      }(l, l.Lang);

      l.Reflect = function (V) {
        var aa = {};

        var Z = function (q, o, p) {
          this.builder = q;
          this.parent = o;
          this.name = p;
          this.className;
        };

        var ab = Z.prototype;

        ab.fqn = function () {
          var p = this.name,
              o = this;

          do {
            o = o.parent;

            if (o == null) {
              break;
            }

            p = o.name + "." + p;
          } while (true);

          return p;
        };

        ab.toString = function (o) {
          return (o ? this.className + " " : "") + this.fqn();
        };

        ab.build = function () {
          throw Error(this.toString(true) + " cannot be built directly");
        };

        aa.T = Z;

        var P = function (r, o, p, q, s) {
          Z.call(this, r, o, p);
          this.className = "Namespace";
          this.children = [];
          this.options = q || {};
          this.syntax = s || "proto2";
        };

        var H = P.prototype = Object.create(Z.prototype);

        H.getChildren = function (o) {
          o = o || null;

          if (o == null) {
            return this.children.slice();
          }

          var p = [];

          for (var q = 0, r = this.children.length; q < r; ++q) {
            if (this.children[q] instanceof o) {
              p.push(this.children[q]);
            }
          }

          return p;
        };

        H.addChild = function (o) {
          var p;

          if (p = this.getChild(o.name)) {
            if (p instanceof ad.Field && p.name !== p.originalName && this.getChild(p.originalName) === null) {
              p.name = p.originalName;
            } else {
              if (o instanceof ad.Field && o.name !== o.originalName && this.getChild(o.originalName) === null) {
                o.name = o.originalName;
              } else {
                throw Error("Duplicate name in namespace " + this.toString(true) + ": " + o.name);
              }
            }
          }

          this.children.push(o);
        };

        H.getChild = function (o) {
          var p = typeof o === "number" ? "id" : "name";

          for (var q = 0, r = this.children.length; q < r; ++q) {
            if (this.children[q][p] === o) {
              return this.children[q];
            }
          }

          return null;
        };

        H.resolve = function (q, t) {
          var s = typeof q === "string" ? q.split(".") : q,
              o = this,
              r = 0;

          if (s[r] === "") {
            while (o.parent !== null) {
              o = o.parent;
            }

            r++;
          }

          var p;

          do {
            do {
              if (!(o instanceof aa.Namespace)) {
                o = null;
                break;
              }

              p = o.getChild(s[r]);

              if (!p || !(p instanceof aa.T) || t && !(p instanceof aa.Namespace)) {
                o = null;
                break;
              }

              o = p;
              r++;
            } while (r < s.length);

            if (o != null) {
              break;
            }

            if (this.parent !== null) {
              return this.parent.resolve(q, t);
            }
          } while (o != null);

          return o;
        };

        H.qn = function (q) {
          var r = [],
              o = q;

          do {
            r.unshift(o.name);
            o = o.parent;
          } while (o !== null);

          for (var s = 1; s <= r.length; s++) {
            var p = r.slice(r.length - s);

            if (q === this.resolve(p, q instanceof aa.Namespace)) {
              return p.join(".");
            }
          }

          return q.fqn();
        };

        H.build = function () {
          var p = {};
          var q = this.children;

          for (var r = 0, s = q.length, o; r < s; ++r) {
            o = q[r];

            if (o instanceof P) {
              p[o.name] = o.build();
            }
          }

          if (Object.defineProperty) {
            Object.defineProperty(p, "$options", {
              value: this.buildOpt()
            });
          }

          return p;
        };

        H.buildOpt = function () {
          var q = {},
              p = Object.keys(this.options);

          for (var r = 0, t = p.length; r < t; ++r) {
            var s = p[r],
                o = this.options[p[r]];
            q[s] = o;
          }

          return q;
        };

        H.getOption = function (o) {
          if (typeof o === "undefined") {
            return this.options;
          }

          return typeof this.options[o] !== "undefined" ? this.options[o] : null;
        };

        aa.Namespace = P;

        var J = function (o, q, p, r) {
          this.type = o;
          this.resolvedType = q;
          this.isMapKey = p;
          this.syntax = r;

          if (p && V.MAP_KEY_TYPES.indexOf(o) < 0) {
            throw Error("Invalid map key type: " + o.name);
          }
        };

        var b = J.prototype;

        function F(o) {
          if (typeof o === "string") {
            o = V.TYPES[o];
          }

          if (typeof o.defaultValue === "undefined") {
            throw Error("default value for type " + o.name + " is not supported");
          }

          if (o == V.TYPES.bytes) {
            return new n(0);
          }

          return o.defaultValue;
        }

        J.defaultFieldValue = F;

        function W(o, p) {
          if (o && typeof o.low === "number" && typeof o.high === "number" && typeof o.unsigned === "boolean" && o.low === o.low && o.high === o.high) {
            return new V.Long(o.low, o.high, typeof p === "undefined" ? o.unsigned : p);
          }

          if (typeof o === "string") {
            return V.Long.fromString(o, p || false, 10);
          }

          if (typeof o === "number") {
            return V.Long.fromNumber(o, p || false);
          }

          throw Error("not convertible to Long");
        }

        b.verifyValue = function (q) {
          var t = function (v, u) {
            throw Error("Illegal value for " + this.toString(true) + " of type " + this.type.name + ": " + v + " (" + u + ")");
          }.bind(this);

          switch (this.type) {
            case V.TYPES.int32:
            case V.TYPES.sint32:
            case V.TYPES.sfixed32:
              if (typeof q !== "number" || q === q && q % 1 !== 0) {
                t(typeof q, "not an integer");
              }

              return q > 4294967295 ? q | 0 : q;

            case V.TYPES.uint32:
            case V.TYPES.fixed32:
              if (typeof q !== "number" || q === q && q % 1 !== 0) {
                t(typeof q, "not an integer");
              }

              return q < 0 ? q >>> 0 : q;

            case V.TYPES.int64:
            case V.TYPES.sint64:
            case V.TYPES.sfixed64:
              if (V.Long) {
                try {
                  return W(q, false);
                } catch (o) {
                  t(typeof q, o.message);
                }
              } else {
                t(typeof q, "requires Long.js");
              }

            case V.TYPES.uint64:
            case V.TYPES.fixed64:
              if (V.Long) {
                try {
                  return W(q, true);
                } catch (o) {
                  t(typeof q, o.message);
                }
              } else {
                t(typeof q, "requires Long.js");
              }

            case V.TYPES.bool:
              if (typeof q !== "boolean") {
                t(typeof q, "not a boolean");
              }

              return q;

            case V.TYPES["float"]:
            case V.TYPES["double"]:
              if (typeof q !== "number") {
                t(typeof q, "not a number");
              }

              return q;

            case V.TYPES.string:
              if (typeof q !== "string" && !(q && q instanceof String)) {
                t(typeof q, "not a string");
              }

              return "" + q;

            case V.TYPES.bytes:
              if (j.isByteBuffer(q)) {
                return q;
              }

              return j.wrap(q);

            case V.TYPES["enum"]:
              var s = this.resolvedType.getChildren(V.Reflect.Enum.Value);

              for (r = 0; r < s.length; r++) {
                if (s[r].name == q) {
                  return s[r].id;
                } else {
                  if (s[r].id == q) {
                    return s[r].id;
                  }
                }
              }

              if (this.syntax === "proto3") {
                if (typeof q !== "number" || q === q && q % 1 !== 0) {
                  t(typeof q, "not an integer");
                }

                if (q > 4294967295 || q < 0) {
                  t(typeof q, "not in range for uint32");
                }

                return q;
              } else {
                t(q, "not a valid enum value");
              }

            case V.TYPES.group:
            case V.TYPES.message:
              if (!q || typeof q !== "object") {
                t(typeof q, "object expected");
              }

              if (q instanceof this.resolvedType.clazz) {
                return q;
              }

              if (q instanceof V.Builder.Message) {
                var p = {};

                for (var r in q) {
                  if (q.hasOwnProperty(r)) {
                    p[r] = q[r];
                  }
                }

                q = p;
              }

              return new this.resolvedType.clazz(q);
          }

          throw Error("[INTERNAL] Illegal value for " + this.toString(true) + ": " + q + " (undefined type " + this.type + ")");
        };

        b.calculateLength = function (o, q) {
          if (q === null) {
            return 0;
          }

          var p;

          switch (this.type) {
            case V.TYPES.int32:
              return q < 0 ? n.calculateVarint64(q) : n.calculateVarint32(q);

            case V.TYPES.uint32:
              return n.calculateVarint32(q);

            case V.TYPES.sint32:
              return n.calculateVarint32(n.zigZagEncode32(q));

            case V.TYPES.fixed32:
            case V.TYPES.sfixed32:
            case V.TYPES["float"]:
              return 4;

            case V.TYPES.int64:
            case V.TYPES.uint64:
              return n.calculateVarint64(q);

            case V.TYPES.sint64:
              return n.calculateVarint64(n.zigZagEncode64(q));

            case V.TYPES.fixed64:
            case V.TYPES.sfixed64:
              return 8;

            case V.TYPES.bool:
              return 1;

            case V.TYPES["enum"]:
              return n.calculateVarint32(q);

            case V.TYPES["double"]:
              return 8;

            case V.TYPES.string:
              p = n.calculateUTF8Bytes(q);
              return n.calculateVarint32(p) + p;

            case V.TYPES.bytes:
              if (q.remaining() < 0) {
                throw Error("Illegal value for " + this.toString(true) + ": " + q.remaining() + " bytes remaining");
              }

              return n.calculateVarint32(q.remaining()) + q.remaining();

            case V.TYPES.message:
              p = this.resolvedType.calculate(q);
              return n.calculateVarint32(p) + p;

            case V.TYPES.group:
              p = this.resolvedType.calculate(q);
              return p + n.calculateVarint32(o << 3 | V.WIRE_TYPES.ENDGROUP);
          }

          throw Error("[INTERNAL] Illegal value to encode in " + this.toString(true) + ": " + q + " (unknown type)");
        };

        b.encodeValue = function (o, r, s) {
          if (r === null) {
            return s;
          }

          switch (this.type) {
            case V.TYPES.int32:
              if (r < 0) {
                s.writeVarint64(r);
              } else {
                s.writeVarint32(r);
              }

              break;

            case V.TYPES.uint32:
              s.writeVarint32(r);
              break;

            case V.TYPES.sint32:
              s.writeVarint32ZigZag(r);
              break;

            case V.TYPES.fixed32:
              s.writeUint32(r);
              break;

            case V.TYPES.sfixed32:
              s.writeInt32(r);
              break;

            case V.TYPES.int64:
            case V.TYPES.uint64:
              s.writeVarint64(r);
              break;

            case V.TYPES.sint64:
              s.writeVarint64ZigZag(r);
              break;

            case V.TYPES.fixed64:
              s.writeUint64(r);
              break;

            case V.TYPES.sfixed64:
              s.writeInt64(r);
              break;

            case V.TYPES.bool:
              if (typeof r === "string") {
                s.writeVarint32(r.toLowerCase() === "false" ? 0 : !!r);
              } else {
                s.writeVarint32(r ? 1 : 0);
              }

              break;

            case V.TYPES["enum"]:
              s.writeVarint32(r);
              break;

            case V.TYPES["float"]:
              s.writeFloat32(r);
              break;

            case V.TYPES["double"]:
              s.writeFloat64(r);
              break;

            case V.TYPES.string:
              s.writeVString(r);
              break;

            case V.TYPES.bytes:
              if (r.remaining() < 0) {
                throw Error("Illegal value for " + this.toString(true) + ": " + r.remaining() + " bytes remaining");
              }

              var q = r.offset;
              s.writeVarint32(r.remaining());
              s.append(r);
              r.offset = q;
              break;

            case V.TYPES.message:
              var p = new n().LE();
              this.resolvedType.encode(r, p);
              s.writeVarint32(p.offset);
              s.append(p.flip());
              break;

            case V.TYPES.group:
              this.resolvedType.encode(r, s);
              s.writeVarint32(o << 3 | V.WIRE_TYPES.ENDGROUP);
              break;

            default:
              throw Error("[INTERNAL] Illegal value to encode in " + this.toString(true) + ": " + r + " (unknown type)");
          }

          return s;
        };

        b.decode = function (r, s, o) {
          if (s != this.type.wireType) {
            throw Error("Unexpected wire type for element");
          }

          var q, p;

          switch (this.type) {
            case V.TYPES.int32:
              return r.readVarint32() | 0;

            case V.TYPES.uint32:
              return r.readVarint32() >>> 0;

            case V.TYPES.sint32:
              return r.readVarint32ZigZag() | 0;

            case V.TYPES.fixed32:
              return r.readUint32() >>> 0;

            case V.TYPES.sfixed32:
              return r.readInt32() | 0;

            case V.TYPES.int64:
              return r.readVarint64();

            case V.TYPES.uint64:
              return r.readVarint64().toUnsigned();

            case V.TYPES.sint64:
              return r.readVarint64ZigZag();

            case V.TYPES.fixed64:
              return r.readUint64();

            case V.TYPES.sfixed64:
              return r.readInt64();

            case V.TYPES.bool:
              return !!r.readVarint32();

            case V.TYPES["enum"]:
              return r.readVarint32();

            case V.TYPES["float"]:
              return r.readFloat();

            case V.TYPES["double"]:
              return r.readDouble();

            case V.TYPES.string:
              return r.readVString();

            case V.TYPES.bytes:
              p = r.readVarint32();

              if (r.remaining() < p) {
                throw Error("Illegal number of bytes for " + this.toString(true) + ": " + p + " required but got only " + r.remaining());
              }

              q = r.clone();
              q.limit = q.offset + p;
              r.offset += p;
              return q;

            case V.TYPES.message:
              p = r.readVarint32();
              return this.resolvedType.decode(r, p);

            case V.TYPES.group:
              return this.resolvedType.decode(r, -1, o);
          }

          throw Error("[INTERNAL] Illegal decode type");
        };

        b.valueFromString = function (o) {
          if (!this.isMapKey) {
            throw Error("valueFromString() called on non-map-key element");
          }

          switch (this.type) {
            case V.TYPES.int32:
            case V.TYPES.sint32:
            case V.TYPES.sfixed32:
            case V.TYPES.uint32:
            case V.TYPES.fixed32:
              return this.verifyValue(parseInt(o));

            case V.TYPES.int64:
            case V.TYPES.sint64:
            case V.TYPES.sfixed64:
            case V.TYPES.uint64:
            case V.TYPES.fixed64:
              return this.verifyValue(o);

            case V.TYPES.bool:
              return o === "true";

            case V.TYPES.string:
              return this.verifyValue(o);

            case V.TYPES.bytes:
              return n.fromBinary(o);
          }
        };

        b.valueToString = function (o) {
          if (!this.isMapKey) {
            throw Error("valueToString() called on non-map-key element");
          }

          if (this.type === V.TYPES.bytes) {
            return o.toString("binary");
          } else {
            return o.toString();
          }
        };

        aa.Element = J;

        var ad = function (s, p, q, r, o, t) {
          P.call(this, s, p, q, r, t);
          this.className = "Message";
          this.extensions = undefined;
          this.clazz = null;
          this.isGroup = !!o;
          this._fields = null;
          this._fieldsById = null;
          this._fieldsByName = null;
        };

        var L = ad.prototype = Object.create(P.prototype);

        L.build = function (s) {
          if (this.clazz && !s) {
            return this.clazz;
          }

          var q = function (y, E) {
            var A = E.getChildren(y.Reflect.Message.Field),
                v = E.getChildren(y.Reflect.Message.OneOf);

            var x = function (ak, ag) {
              y.Builder.Message.call(this);

              for (var aj = 0, af = v.length; aj < af; ++aj) {
                this[v[aj].name] = null;
              }

              for (aj = 0, af = A.length; aj < af; ++aj) {
                var ah = A[aj];
                this[ah.name] = ah.repeated ? [] : ah.map ? new y.Map(ah) : null;

                if ((ah.required || E.syntax === "proto3") && ah.defaultValue !== null) {
                  this[ah.name] = ah.defaultValue;
                }
              }

              if (arguments.length > 0) {
                var ai;

                if (arguments.length === 1 && ak !== null && typeof ak === "object" && (typeof ak.encode !== "function" || ak instanceof x) && !Array.isArray(ak) && !(ak instanceof y.Map) && !n.isByteBuffer(ak) && !(ak instanceof ArrayBuffer) && !(y.Long && ak instanceof y.Long)) {
                  this.$set(ak);
                } else {
                  for (aj = 0, af = arguments.length; aj < af; ++aj) {
                    if (typeof (ai = arguments[aj]) !== "undefined") {
                      this.$set(A[aj].name, ai);
                    }
                  }
                }
              }
            };

            var B = x.prototype = Object.create(y.Builder.Message.prototype);

            B.add = function (af, ai, ah) {
              var ag = E._fieldsByName[af];

              if (!ah) {
                if (!ag) {
                  throw Error(this + "#" + af + " is undefined");
                }

                if (!(ag instanceof y.Reflect.Message.Field)) {
                  throw Error(this + "#" + af + " is not a field: " + ag.toString(true));
                }

                if (!ag.repeated) {
                  throw Error(this + "#" + af + " is not a repeated field");
                }

                ai = ag.verifyValue(ai, true);
              }

              if (this[af] === null) {
                this[af] = [];
              }

              this[af].push(ai);
              return this;
            };

            B.$add = B.add;

            B.set = function (ag, ak, ah) {
              if (ag && typeof ag === "object") {
                ah = ak;

                for (var aj in ag) {
                  if (ag.hasOwnProperty(aj) && typeof (ak = ag[aj]) !== "undefined") {
                    this.$set(aj, ak, ah);
                  }
                }

                return this;
              }

              var ai = E._fieldsByName[ag];

              if (!ah) {
                if (!ai) {
                  throw Error(this + "#" + ag + " is not a field: undefined");
                }

                if (!(ai instanceof y.Reflect.Message.Field)) {
                  throw Error(this + "#" + ag + " is not a field: " + ai.toString(true));
                }

                this[ai.name] = ak = ai.verifyValue(ak);
              } else {
                this[ag] = ak;
              }

              if (ai && ai.oneof) {
                var af = this[ai.oneof.name];

                if (ak !== null) {
                  if (af !== null && af !== ai.name) {
                    this[af] = null;
                  }

                  this[ai.oneof.name] = ai.name;
                } else {
                  if (af === ag) {
                    this[ai.oneof.name] = null;
                  }
                }
              }

              return this;
            };

            B.$set = B.set;

            B.get = function (af, ag) {
              if (ag) {
                return this[af];
              }

              var ah = E._fieldsByName[af];

              if (!ah || !(ah instanceof y.Reflect.Message.Field)) {
                throw Error(this + "#" + af + " is not a field: undefined");
              }

              if (!(ah instanceof y.Reflect.Message.Field)) {
                throw Error(this + "#" + af + " is not a field: " + ah.toString(true));
              }

              return this[ah.name];
            };

            B.$get = B.get;

            for (var D = 0; D < A.length; D++) {
              var w = A[D];

              if (w instanceof y.Reflect.Message.ExtensionField) {
                continue;
              }

              if (E.builder.options.populateAccessors) {
                (function (ai) {
                  var aj = ai.originalName.replace(/(_[a-zA-Z])/g, function (ak) {
                    return ak.toUpperCase().replace("_", "");
                  });
                  aj = aj.substring(0, 1).toUpperCase() + aj.substring(1);
                  var ah = ai.originalName.replace(/([A-Z])/g, function (ak) {
                    return "_" + ak;
                  });

                  var ag = function (al, ak) {
                    this[ai.name] = ak ? al : ai.verifyValue(al);
                    return this;
                  };

                  var af = function () {
                    return this[ai.name];
                  };

                  if (E.getChild("set" + aj) === null) {
                    B["set" + aj] = ag;
                  }

                  if (E.getChild("set_" + ah) === null) {
                    B["set_" + ah] = ag;
                  }

                  if (E.getChild("get" + aj) === null) {
                    B["get" + aj] = af;
                  }

                  if (E.getChild("get_" + ah) === null) {
                    B["get_" + ah] = af;
                  }
                })(w);
              }
            }

            B.encode = function (aj, ai) {
              if (typeof aj === "boolean") {
                ai = aj, aj = undefined;
              }

              var af = false;

              if (!aj) {
                aj = new j(), af = true;
              }

              var ah = aj.littleEndian;

              try {
                E.encode(this, aj.LE(), ai);
                return (af ? aj.flip() : aj).LE(ah);
              } catch (ag) {
                aj.LE(ah);
                throw ag;
              }
            };

            x.encode = function (ag, af, ah) {
              return new x(ag).encode(af, ah);
            };

            B.calculate = function () {
              return E.calculate(this);
            };

            B.encodeDelimited = function (ah) {
              var af = false;

              if (!ah) {
                ah = new n(), af = true;
              }

              var ag = new n().LE();
              E.encode(this, ag).flip();
              ah.writeVarint32(ag.remaining());
              ah.append(ag);
              return af ? ah.flip() : ah;
            };

            B.encodeAB = function () {
              try {
                return this.encode().toArrayBuffer();
              } catch (af) {
                if (af.encoded) {
                  af.encoded = af.encoded.toArrayBuffer();
                }

                throw af;
              }
            };

            B.toArrayBuffer = B.encodeAB;

            B.encodeNB = function () {
              try {
                return this.encode().toBuffer();
              } catch (af) {
                if (af.encoded) {
                  af.encoded = af.encoded.toBuffer();
                }

                throw af;
              }
            };

            B.toBuffer = B.encodeNB;

            B.encode64 = function () {
              try {
                return this.encode().toBase64();
              } catch (af) {
                if (af.encoded) {
                  af.encoded = af.encoded.toBase64();
                }

                throw af;
              }
            };

            B.toBase64 = B.encode64;

            B.encodeHex = function () {
              try {
                return this.encode().toHex();
              } catch (af) {
                if (af.encoded) {
                  af.encoded = af.encoded.toHex();
                }

                throw af;
              }
            };

            B.toHex = B.encodeHex;

            function u(aj, aq, at, am) {
              if (aj === null || typeof aj !== "object") {
                if (am && am instanceof y.Reflect.Enum) {
                  var al = y.Reflect.Enum.getName(am.object, aj);

                  if (al !== null) {
                    return al;
                  }
                }

                return aj;
              }

              if (n.isByteBuffer(aj)) {
                return aq ? aj.toBase64() : aj.toBuffer();
              }

              if (y.Long.isLong(aj)) {
                return at ? aj.toString() : y.Long.fromValue(aj);
              }

              var ao;

              if (Array.isArray(aj)) {
                ao = [];
                aj.forEach(function (ag, af) {
                  ao[af] = u(ag, aq, at, am);
                });
                return ao;
              }

              ao = {};

              if (aj instanceof y.Map) {
                var ai = aj.entries();

                for (var ar = ai.next(); !ar.done; ar = ai.next()) {
                  ao[aj.keyElem.valueToString(ar.value[0])] = u(ar.value[1], aq, at, aj.valueElem.resolvedType);
                }

                return ao;
              }

              var ap = aj.$type,
                  an = undefined;

              for (var ak in aj) {
                if (aj.hasOwnProperty(ak)) {
                  if (ap && (an = ap.getChild(ak))) {
                    ao[ak] = u(aj[ak], aq, at, an.resolvedType);
                  } else {
                    ao[ak] = u(aj[ak], aq, at);
                  }
                }
              }

              return ao;
            }

            B.toRaw = function (af, ag) {
              return u(this, !!af, !!ag, this.$type);
            };

            B.encodeJSON = function () {
              return JSON.stringify(u(this, true, true, this.$type));
            };

            x.decode = function (af, aj) {
              if (typeof af === "string") {
                af = n.wrap(af, aj ? aj : "base64");
              }

              af = n.isByteBuffer(af) ? af : n.wrap(af);
              var ai = af.littleEndian;

              try {
                var ag = E.decode(af.LE());
                af.LE(ai);
                return ag;
              } catch (ah) {
                af.LE(ai);
                throw ah;
              }
            };

            x.decodeDelimited = function (ak, aj) {
              if (typeof ak === "string") {
                ak = n.wrap(ak, aj ? aj : "base64");
              }

              ak = n.isByteBuffer(ak) ? ak : n.wrap(ak);

              if (ak.remaining() < 1) {
                return null;
              }

              var ag = ak.offset,
                  af = ak.readVarint32();

              if (ak.remaining() < af) {
                ak.offset = ag;
                return null;
              }

              try {
                var ah = E.decode(ak.slice(ak.offset, ak.offset + af).LE());
                ak.offset += af;
                return ah;
              } catch (ai) {
                ak.offset += af;
                throw ai;
              }
            };

            x.decode64 = function (af) {
              return x.decode(af, "base64");
            };

            x.decodeHex = function (af) {
              return x.decode(af, "hex");
            };

            x.decodeJSON = function (af) {
              return new x(JSON.parse(af));
            };

            B.toString = function () {
              return E.toString();
            };

            if (Object.defineProperty) {
              Object.defineProperty(x, "$options", {
                value: E.buildOpt()
              }), Object.defineProperty(B, "$options", {
                value: x["$options"]
              }), Object.defineProperty(x, "$type", {
                value: E
              }), Object.defineProperty(B, "$type", {
                value: E
              });
            }

            return x;
          }(V, this);

          this._fields = [];
          this._fieldsById = {};
          this._fieldsByName = {};

          for (var p = 0, r = this.children.length, o; p < r; p++) {
            o = this.children[p];

            if (o instanceof M || o instanceof ad || o instanceof Q) {
              if (q.hasOwnProperty(o.name)) {
                throw Error("Illegal reflect child of " + this.toString(true) + ": " + o.toString(true) + " cannot override static property '" + o.name + "'");
              }

              q[o.name] = o.build();
            } else {
              if (o instanceof ad.Field) {
                o.build(), this._fields.push(o), this._fieldsById[o.id] = o, this._fieldsByName[o.name] = o;
              } else {
                if (!(o instanceof ad.OneOf) && !(o instanceof T)) {
                  throw Error("Illegal reflect child of " + this.toString(true) + ": " + this.children[p].toString(true));
                }
              }
            }
          }

          return this.clazz = q;
        };

        L.encode = function (o, s, r) {
          var w = null,
              p;

          for (var q = 0, t = this._fields.length, v; q < t; ++q) {
            p = this._fields[q];
            v = o[p.name];

            if (p.required && v === null) {
              if (w === null) {
                w = p;
              }
            } else {
              p.encode(r ? v : p.verifyValue(v), s, o);
            }
          }

          if (w !== null) {
            var u = Error("Missing at least one required field for " + this.toString(true) + ": " + w);
            u.encoded = s;
            throw u;
          }

          return s;
        };

        L.calculate = function (r) {
          for (var o = 0, s = 0, t = this._fields.length, q, p; s < t; ++s) {
            q = this._fields[s];
            p = r[q.name];

            if (q.required && p === null) {
              throw Error("Missing at least one required field for " + this.toString(true) + ": " + q);
            } else {
              o += q.calculate(p, r);
            }
          }

          return o;
        };

        function O(p, q) {
          var r = q.readVarint32(),
              s = r & 7,
              o = r >>> 3;

          switch (s) {
            case V.WIRE_TYPES.VARINT:
              do {
                r = q.readUint8();
              } while ((r & 128) === 128);

              break;

            case V.WIRE_TYPES.BITS64:
              q.offset += 8;
              break;

            case V.WIRE_TYPES.LDELIM:
              r = q.readVarint32();
              q.offset += r;
              break;

            case V.WIRE_TYPES.STARTGROUP:
              O(o, q);
              break;

            case V.WIRE_TYPES.ENDGROUP:
              if (o === p) {
                return false;
              } else {
                throw Error("Illegal GROUPEND after unknown group: " + o + " (" + p + " expected)");
              }

            case V.WIRE_TYPES.BITS32:
              q.offset += 4;
              break;

            default:
              throw Error("Illegal wire type in unknown group " + p + ": " + s);
          }

          return true;
        }

        L.decode = function (w, A, u) {
          A = typeof A === "number" ? A : -1;
          var C = w.offset,
              z = new this.clazz(),
              o,
              p,
              B,
              r;

          while (w.offset < C + A || A === -1 && w.remaining() > 0) {
            o = w.readVarint32();
            p = o & 7;
            B = o >>> 3;

            if (p === V.WIRE_TYPES.ENDGROUP) {
              if (B !== u) {
                throw Error("Illegal group end indicator for " + this.toString(true) + ": " + B + " (" + (u ? u + " expected" : "not a group") + ")");
              }

              break;
            }

            if (!(r = this._fieldsById[B])) {
              switch (p) {
                case V.WIRE_TYPES.VARINT:
                  w.readVarint32();
                  break;

                case V.WIRE_TYPES.BITS32:
                  w.offset += 4;
                  break;

                case V.WIRE_TYPES.BITS64:
                  w.offset += 8;
                  break;

                case V.WIRE_TYPES.LDELIM:
                  var t = w.readVarint32();
                  w.offset += t;
                  break;

                case V.WIRE_TYPES.STARTGROUP:
                  while (O(B, w)) {}

                  break;

                default:
                  throw Error("Illegal wire type for unknown field " + B + " in " + this.toString(true) + "#decode: " + p);
              }

              continue;
            }

            if (r.repeated && !r.options.packed) {
              z[r.name].push(r.decode(p, w));
            } else {
              if (r.map) {
                var s = r.decode(p, w);
                z[r.name].set(s[0], s[1]);
              } else {
                z[r.name] = r.decode(p, w);

                if (r.oneof) {
                  var q = z[r.oneof.name];

                  if (q !== null && q !== r.name) {
                    z[q] = null;
                  }

                  z[r.oneof.name] = r.name;
                }
              }
            }
          }

          for (var v = 0, x = this._fields.length; v < x; ++v) {
            r = this._fields[v];

            if (z[r.name] === null) {
              if (this.syntax === "proto3") {
                z[r.name] = r.defaultValue;
              } else {
                if (r.required) {
                  var y = Error("Missing at least one required field for " + this.toString(true) + ": " + r.name);
                  y.decoded = z;
                  throw y;
                } else {
                  if (V.populateDefaults && r.defaultValue !== null) {
                    z[r.name] = r.defaultValue;
                  }
                }
              }
            }
          }

          return z;
        };

        aa.Message = ad;

        var X = function (t, p, q, v, r, x, w, o, s, u) {
          Z.call(this, t, p, x);
          this.className = "Message.Field";
          this.required = q === "required";
          this.repeated = q === "repeated";
          this.map = q === "map";
          this.keyType = v || null;
          this.type = r;
          this.resolvedType = null;
          this.id = w;
          this.options = o || {};
          this.defaultValue = null;
          this.oneof = s || null;
          this.syntax = u || "proto2";
          this.originalName = this.name;
          this.element = null;
          this.keyElement = null;

          if (this.builder.options.convertFieldsToCamelCase && !(this instanceof ad.ExtensionField)) {
            this.name = V.Util.toCamelCase(this.name);
          }
        };

        var N = X.prototype = Object.create(Z.prototype);

        N.build = function () {
          this.element = new J(this.type, this.resolvedType, false, this.syntax);

          if (this.map) {
            this.keyElement = new J(this.keyType, undefined, true, this.syntax);
          }

          if (this.syntax === "proto3" && !this.repeated && !this.map) {
            this.defaultValue = J.defaultFieldValue(this.type);
          } else {
            if (typeof this.options["default"] !== "undefined") {
              this.defaultValue = this.verifyValue(this.options["default"]);
            }
          }
        };

        N.verifyValue = function (o, r) {
          r = r || false;

          var s = function (t, u) {
            throw Error("Illegal value for " + this.toString(true) + " of type " + this.type.name + ": " + t + " (" + u + ")");
          }.bind(this);

          if (o === null) {
            if (this.required) {
              s(typeof o, "required");
            }

            if (this.syntax === "proto3" && this.type !== V.TYPES.message) {
              s(typeof o, "proto3 field without field presence cannot be null");
            }

            return null;
          }

          var p;

          if (this.repeated && !r) {
            if (!Array.isArray(o)) {
              o = [o];
            }

            var q = [];

            for (p = 0; p < o.length; p++) {
              q.push(this.element.verifyValue(o[p]));
            }

            return q;
          }

          if (this.map && !r) {
            if (!(o instanceof V.Map)) {
              if (!(o instanceof Object)) {
                s(typeof o, "expected ProtoBuf.Map or raw object for map field");
              }

              return new V.Map(this, o);
            } else {
              return o;
            }
          }

          if (!this.repeated && Array.isArray(o)) {
            s(typeof o, "no array expected");
          }

          return this.element.verifyValue(o);
        };

        N.hasWirePresence = function (o, p) {
          if (this.syntax !== "proto3") {
            return o !== null;
          }

          if (this.oneof && p[this.oneof.name] === this.name) {
            return true;
          }

          switch (this.type) {
            case V.TYPES.int32:
            case V.TYPES.sint32:
            case V.TYPES.sfixed32:
            case V.TYPES.uint32:
            case V.TYPES.fixed32:
              return o !== 0;

            case V.TYPES.int64:
            case V.TYPES.sint64:
            case V.TYPES.sfixed64:
            case V.TYPES.uint64:
            case V.TYPES.fixed64:
              return o.low !== 0 || o.high !== 0;

            case V.TYPES.bool:
              return o;

            case V.TYPES["float"]:
            case V.TYPES["double"]:
              return o !== 0;

            case V.TYPES.string:
              return o.length > 0;

            case V.TYPES.bytes:
              return o.remaining() > 0;

            case V.TYPES["enum"]:
              return o !== 0;

            case V.TYPES.message:
              return o !== null;

            default:
              return true;
          }
        };

        N.encode = function (p, t, o) {
          if (this.type === null || typeof this.type !== "object") {
            throw Error("[INTERNAL] Unresolved type in " + this.toString(true) + ": " + this.type);
          }

          if (p === null || this.repeated && p.length == 0) {
            return t;
          }

          try {
            if (this.repeated) {
              var s;

              if (this.options.packed && V.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                t.writeVarint32(this.id << 3 | V.WIRE_TYPES.LDELIM);
                t.ensureCapacity(t.offset += 1);
                var w = t.offset;

                for (s = 0; s < p.length; s++) {
                  this.element.encodeValue(this.id, p[s], t);
                }

                var r = t.offset - w,
                    u = n.calculateVarint32(r);

                if (u > 1) {
                  var v = t.slice(w, t.offset);
                  w += u - 1;
                  t.offset = w;
                  t.append(v);
                }

                t.writeVarint32(r, w - u);
              } else {
                for (s = 0; s < p.length; s++) {
                  t.writeVarint32(this.id << 3 | this.type.wireType), this.element.encodeValue(this.id, p[s], t);
                }
              }
            } else {
              if (this.map) {
                p.forEach(function (x, z, A) {
                  var y = n.calculateVarint32(1 << 3 | this.keyType.wireType) + this.keyElement.calculateLength(1, z) + n.calculateVarint32(2 << 3 | this.type.wireType) + this.element.calculateLength(2, x);
                  t.writeVarint32(this.id << 3 | V.WIRE_TYPES.LDELIM);
                  t.writeVarint32(y);
                  t.writeVarint32(1 << 3 | this.keyType.wireType);
                  this.keyElement.encodeValue(1, z, t);
                  t.writeVarint32(2 << 3 | this.type.wireType);
                  this.element.encodeValue(2, x, t);
                }, this);
              } else {
                if (this.hasWirePresence(p, o)) {
                  t.writeVarint32(this.id << 3 | this.type.wireType);
                  this.element.encodeValue(this.id, p, t);
                }
              }
            }
          } catch (q) {
            throw Error("Illegal value for " + this.toString(true) + ": " + p + " (" + q + ")");
          }

          return t;
        };

        N.calculate = function (q, r) {
          q = this.verifyValue(q);

          if (this.type === null || typeof this.type !== "object") {
            throw Error("[INTERNAL] Unresolved type in " + this.toString(true) + ": " + this.type);
          }

          if (q === null || this.repeated && q.length == 0) {
            return 0;
          }

          var o = 0;

          try {
            if (this.repeated) {
              var s, t;

              if (this.options.packed && V.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                o += n.calculateVarint32(this.id << 3 | V.WIRE_TYPES.LDELIM);
                t = 0;

                for (s = 0; s < q.length; s++) {
                  t += this.element.calculateLength(this.id, q[s]);
                }

                o += n.calculateVarint32(t);
                o += t;
              } else {
                for (s = 0; s < q.length; s++) {
                  o += n.calculateVarint32(this.id << 3 | this.type.wireType), o += this.element.calculateLength(this.id, q[s]);
                }
              }
            } else {
              if (this.map) {
                q.forEach(function (v, x, u) {
                  var w = n.calculateVarint32(1 << 3 | this.keyType.wireType) + this.keyElement.calculateLength(1, x) + n.calculateVarint32(2 << 3 | this.type.wireType) + this.element.calculateLength(2, v);
                  o += n.calculateVarint32(this.id << 3 | V.WIRE_TYPES.LDELIM);
                  o += n.calculateVarint32(w);
                  o += w;
                }, this);
              } else {
                if (this.hasWirePresence(q, r)) {
                  o += n.calculateVarint32(this.id << 3 | this.type.wireType);
                  o += this.element.calculateLength(this.id, q);
                }
              }
            }
          } catch (p) {
            throw Error("Illegal value for " + this.toString(true) + ": " + q + " (" + p + ")");
          }

          return o;
        };

        N.decode = function (s, x, v) {
          var t, w;
          var p = !this.map && s == this.type.wireType || !v && this.repeated && this.options.packed && s == V.WIRE_TYPES.LDELIM || this.map && s == V.WIRE_TYPES.LDELIM;

          if (!p) {
            throw Error("Illegal wire type for field " + this.toString(true) + ": " + s + " (" + this.type.wireType + " expected)");
          }

          if (s == V.WIRE_TYPES.LDELIM && this.repeated && this.options.packed && V.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
            if (!v) {
              w = x.readVarint32();
              w = x.offset + w;
              var q = [];

              while (x.offset < w) {
                q.push(this.decode(this.type.wireType, x, true));
              }

              return q;
            }
          }

          if (this.map) {
            var r = J.defaultFieldValue(this.keyType);
            t = J.defaultFieldValue(this.type);
            w = x.readVarint32();

            if (x.remaining() < w) {
              throw Error("Illegal number of bytes for " + this.toString(true) + ": " + w + " required but got only " + x.remaining());
            }

            var u = x.clone();
            u.limit = u.offset + w;
            x.offset += w;

            while (u.remaining() > 0) {
              var o = u.readVarint32();
              s = o & 7;
              var y = o >>> 3;

              if (y === 1) {
                r = this.keyElement.decode(u, s, y);
              } else {
                if (y === 2) {
                  t = this.element.decode(u, s, y);
                } else {
                  throw Error("Unexpected tag in map field key/value submessage");
                }
              }
            }

            return [r, t];
          }

          return this.element.decode(x, s, this.id);
        };

        aa.Message.Field = X;

        var I = function (u, q, p, r, s, o, t) {
          X.call(this, u, q, p, null, r, s, o, t);
          this.extension;
        };

        I.prototype = Object.create(X.prototype);
        aa.Message.ExtensionField = I;

        var G = function (q, o, p) {
          Z.call(this, q, o, p);
          this.fields = [];
        };

        aa.Message.OneOf = G;

        var M = function (r, o, p, q, s) {
          P.call(this, r, o, p, q, s);
          this.className = "Enum";
          this.object = null;
        };

        M.getName = function (s, o) {
          var p = Object.keys(s);

          for (var q = 0, r; q < p.length; ++q) {
            if (s[r = p[q]] === o) {
              return r;
            }
          }

          return null;
        };

        var Y = M.prototype = Object.create(P.prototype);

        Y.build = function (s) {
          if (this.object && !s) {
            return this.object;
          }

          var p = new V.Builder.Enum(),
              q = this.getChildren(M.Value);

          for (var o = 0, r = q.length; o < r; ++o) {
            p[q[o]["name"]] = q[o]["id"];
          }

          if (Object.defineProperty) {
            Object.defineProperty(p, "$options", {
              value: this.buildOpt(),
              enumerable: false
            });
          }

          return this.object = p;
        };

        aa.Enum = M;

        var R = function (r, p, q, o) {
          Z.call(this, r, p, q);
          this.className = "Enum.Value";
          this.id = o;
        };

        R.prototype = Object.create(Z.prototype);
        aa.Enum.Value = R;

        var T = function (r, p, q, o) {
          Z.call(this, r, p, q);
          this.field = o;
        };

        T.prototype = Object.create(Z.prototype);
        aa.Extension = T;

        var Q = function (q, r, o, p) {
          P.call(this, q, r, o, p);
          this.className = "Service";
          this.clazz = null;
        };

        var S = Q.prototype = Object.create(P.prototype);

        S.build = function (o) {
          if (this.clazz && !o) {
            return this.clazz;
          }

          return this.clazz = function (r, w) {
            var x = function (z) {
              r.Builder.Service.call(this);

              this.rpcImpl = z || function (C, B, A) {
                setTimeout(A.bind(this, Error("Not implemented, see: https://github.com/dcodeIO/ProtoBuf.js/wiki/Services")), 0);
              };
            };

            var q = x.prototype = Object.create(r.Builder.Service.prototype);
            var t = w.getChildren(r.Reflect.Service.RPCMethod);

            for (var v = 0; v < t.length; v++) {
              (function (z) {
                q[z.name] = function (B, A) {
                  try {
                    try {
                      B = z.resolvedRequestType.clazz.decode(n.wrap(B));
                    } catch (C) {
                      if (!(C instanceof TypeError)) {
                        throw C;
                      }
                    }

                    if (B === null || typeof B !== "object") {
                      throw Error("Illegal arguments");
                    }

                    if (!(B instanceof z.resolvedRequestType.clazz)) {
                      B = new z.resolvedRequestType.clazz(B);
                    }

                    this.rpcImpl(z.fqn(), B, function (E, ae) {
                      if (E) {
                        A(E);
                        return;
                      }

                      try {
                        ae = z.resolvedResponseType.clazz.decode(ae);
                      } catch (D) {}

                      if (!ae || !(ae instanceof z.resolvedResponseType.clazz)) {
                        A(Error("Illegal response type received in service method " + w.name + "#" + z.name));
                        return;
                      }

                      A(null, ae);
                    });
                  } catch (C) {
                    setTimeout(A.bind(this, C), 0);
                  }
                };

                x[z.name] = function (C, B, A) {
                  new x(C)[z.name](B, A);
                };

                if (Object.defineProperty) {
                  Object.defineProperty(x[z.name], "$options", {
                    value: z.buildOpt()
                  }), Object.defineProperty(q[z.name], "$options", {
                    value: x[z.name]["$options"]
                  });
                }
              })(t[v]);
            }

            if (Object.defineProperty) {
              Object.defineProperty(x, "$options", {
                value: w.buildOpt()
              }), Object.defineProperty(q, "$options", {
                value: x["$options"]
              }), Object.defineProperty(x, "$type", {
                value: w
              }), Object.defineProperty(q, "$type", {
                value: w
              });
            }

            return x;
          }(V, this);
        };

        aa.Service = Q;

        var ac = function (r, o, p, q) {
          Z.call(this, r, o, p);
          this.className = "Service.Method";
          this.options = q || {};
        };

        var U = ac.prototype = Object.create(Z.prototype);
        U.buildOpt = H.buildOpt;
        aa.Service.Method = ac;

        var K = function (s, v, p, o, t, q, u, r) {
          ac.call(this, s, v, p, r);
          this.className = "Service.RPCMethod";
          this.requestName = o;
          this.responseName = t;
          this.requestStream = q;
          this.responseStream = u;
          this.resolvedRequestType = null;
          this.resolvedResponseType = null;
        };

        K.prototype = Object.create(ac.prototype);
        aa.Service.RPCMethod = K;
        return aa;
      }(l);

      l.Builder = function (p, q, b) {
        var o = function (t) {
          this.ns = new b.Namespace(this, null, "");
          this.ptr = this.ns;
          this.resolved = false;
          this.result = null;
          this.files = {};
          this.importRoot = null;
          this.options = t || {};
        };

        var s = o.prototype;

        o.isMessage = function (t) {
          if (typeof t.name !== "string") {
            return false;
          }

          if (typeof t.values !== "undefined" || typeof t.rpc !== "undefined") {
            return false;
          }

          return true;
        };

        o.isMessageField = function (t) {
          if (typeof t.rule !== "string" || typeof t.name !== "string" || typeof t.type !== "string" || typeof t.id === "undefined") {
            return false;
          }

          return true;
        };

        o.isEnum = function (t) {
          if (typeof t.name !== "string") {
            return false;
          }

          if (typeof t.values === "undefined" || !Array.isArray(t.values) || t.values.length === 0) {
            return false;
          }

          return true;
        };

        o.isService = function (t) {
          if (typeof t.name !== "string" || typeof t.rpc !== "object" || !t.rpc) {
            return false;
          }

          return true;
        };

        o.isExtend = function (t) {
          if (typeof t.ref !== "string") {
            return false;
          }

          return true;
        };

        s.reset = function () {
          this.ptr = this.ns;
          return this;
        };

        s.define = function (t) {
          if (typeof t !== "string" || !q.TYPEREF.test(t)) {
            throw Error("illegal namespace: " + t);
          }

          t.split(".").forEach(function (u) {
            var v = this.ptr.getChild(u);

            if (v === null) {
              this.ptr.addChild(v = new b.Namespace(this, this.ptr, u));
            }

            this.ptr = v;
          }, this);
          return this;
        };

        s.create = function (t) {
          if (!t) {
            return this;
          }

          if (!Array.isArray(t)) {
            t = [t];
          } else {
            if (t.length === 0) {
              return this;
            }

            t = t.slice();
          }

          var u = [t];

          while (u.length > 0) {
            t = u.pop();

            if (!Array.isArray(t)) {
              throw Error("not a valid namespace: " + JSON.stringify(t));
            }

            while (t.length > 0) {
              var w = t.shift();

              if (o.isMessage(w)) {
                var v = new b.Message(this, this.ptr, w.name, w.options, w.isGroup, w.syntax);
                var x = {};

                if (w.oneofs) {
                  Object.keys(w.oneofs).forEach(function (z) {
                    v.addChild(x[z] = new b.Message.OneOf(this, v, z));
                  }, this);
                }

                if (w.fields) {
                  w.fields.forEach(function (A) {
                    if (v.getChild(A.id | 0) !== null) {
                      throw Error("duplicate or invalid field id in " + v.name + ": " + A.id);
                    }

                    if (A.options && typeof A.options !== "object") {
                      throw Error("illegal field options in " + v.name + "#" + A.name);
                    }

                    var z = null;

                    if (typeof A.oneof === "string" && !(z = x[A.oneof])) {
                      throw Error("illegal oneof in " + v.name + "#" + A.name + ": " + A.oneof);
                    }

                    A = new b.Message.Field(this, v, A.rule, A.keytype, A.type, A.name, A.id, A.options, z, w.syntax);

                    if (z) {
                      z.fields.push(A);
                    }

                    v.addChild(A);
                  }, this);
                }

                var y = [];

                if (w.enums) {
                  w.enums.forEach(function (z) {
                    y.push(z);
                  });
                }

                if (w.messages) {
                  w.messages.forEach(function (z) {
                    y.push(z);
                  });
                }

                if (w.services) {
                  w.services.forEach(function (z) {
                    y.push(z);
                  });
                }

                if (w.extensions) {
                  if (typeof w.extensions[0] === "number") {
                    v.extensions = [w.extensions];
                  } else {
                    v.extensions = w.extensions;
                  }
                }

                this.ptr.addChild(v);

                if (y.length > 0) {
                  u.push(t);
                  t = y;
                  y = null;
                  this.ptr = v;
                  v = null;
                  continue;
                }

                y = null;
              } else {
                if (o.isEnum(w)) {
                  v = new b.Enum(this, this.ptr, w.name, w.options, w.syntax);
                  w.values.forEach(function (z) {
                    v.addChild(new b.Enum.Value(this, v, z.name, z.id));
                  }, this);
                  this.ptr.addChild(v);
                } else {
                  if (o.isService(w)) {
                    v = new b.Service(this, this.ptr, w.name, w.options);
                    Object.keys(w.rpc).forEach(function (z) {
                      var A = w.rpc[z];
                      v.addChild(new b.Service.RPCMethod(this, v, z, A.request, A.response, !!A.request_stream, !!A.response_stream, A.options));
                    }, this);
                    this.ptr.addChild(v);
                  } else {
                    if (o.isExtend(w)) {
                      v = this.ptr.resolve(w.ref, true);

                      if (v) {
                        w.fields.forEach(function (C) {
                          if (v.getChild(C.id | 0) !== null) {
                            throw Error("duplicate extended field id in " + v.name + ": " + C.id);
                          }

                          if (v.extensions) {
                            var A = false;
                            v.extensions.forEach(function (E) {
                              if (C.id >= E[0] && C.id <= E[1]) {
                                A = true;
                              }
                            });

                            if (!A) {
                              throw Error("illegal extended field id in " + v.name + ": " + C.id + " (not within valid ranges)");
                            }
                          }

                          var D = C.name;

                          if (this.options.convertFieldsToCamelCase) {
                            D = p.Util.toCamelCase(D);
                          }

                          var z = new b.Message.ExtensionField(this, v, C.rule, C.type, this.ptr.fqn() + "." + D, C.id, C.options);
                          var B = new b.Extension(this, this.ptr, C.name, z);
                          z.extension = B;
                          this.ptr.addChild(B);
                          v.addChild(z);
                        }, this);
                      } else {
                        if (!/\.?google\.protobuf\./.test(w.ref)) {
                          throw Error("extended message " + w.ref + " is not defined");
                        }
                      }
                    } else {
                      throw Error("not a valid definition: " + JSON.stringify(w));
                    }
                  }
                }
              }

              w = null;
              v = null;
            }

            t = null;
            this.ptr = this.ptr.parent;
          }

          this.resolved = false;
          this.result = null;
          return this;
        };

        function r(t) {
          if (t.messages) {
            t.messages.forEach(function (u) {
              u.syntax = t.syntax;
              r(u);
            });
          }

          if (t.enums) {
            t.enums.forEach(function (u) {
              u.syntax = t.syntax;
            });
          }
        }

        s["import"] = function (D, C) {
          var A = "/";

          if (typeof C === "string") {
            if (p.Util.IS_NODE) ;

            if (this.files[C] === true) {
              return this.reset();
            }

            this.files[C] = true;
          } else {
            if (typeof C === "object") {
              var F = C.root;

              if (p.Util.IS_NODE) ;

              if (F.indexOf("\\") >= 0 || C.file.indexOf("\\") >= 0) {
                A = "\\";
              }

              var z = F + A + C.file;

              if (this.files[z] === true) {
                return this.reset();
              }

              this.files[z] = true;
            }
          }

          if (D.imports && D.imports.length > 0) {
            var x,
                G = false;

            if (typeof C === "object") {
              this.importRoot = C.root;
              G = true;
              x = this.importRoot;
              C = C.file;

              if (x.indexOf("\\") >= 0 || C.indexOf("\\") >= 0) {
                A = "\\";
              }
            } else {
              if (typeof C === "string") {
                if (this.importRoot) {
                  x = this.importRoot;
                } else {
                  if (C.indexOf("/") >= 0) {
                    x = C.replace(/\/[^\/]*$/, "");

                    if (x === "") {
                      x = "/";
                    }
                  } else {
                    if (C.indexOf("\\") >= 0) {
                      x = C.replace(/\\[^\\]*$/, "");
                      A = "\\";
                    } else {
                      x = ".";
                    }
                  }
                }
              } else {
                x = null;
              }
            }

            for (var w = 0; w < D.imports.length; w++) {
              if (typeof D.imports[w] === "string") {
                if (!x) {
                  throw Error("cannot determine import root");
                }

                var E = D.imports[w];

                if (E === "google/protobuf/descriptor.proto") {
                  continue;
                }

                E = x + A + E;

                if (this.files[E] === true) {
                  continue;
                }

                if (/\.proto$/i.test(E) && !p.DotProto) {
                  E = E.replace(/\.proto$/, ".json");
                }

                var y = p.Util.fetch(E);

                if (y === null) {
                  throw Error("failed to import '" + E + "' in '" + C + "': file not found");
                }

                if (/\.json$/i.test(E)) {
                  this["import"](JSON.parse(y + ""), E);
                } else {
                  this["import"](p.DotProto.Parser.parse(y), E);
                }
              } else {
                if (!C) {
                  this["import"](D.imports[w]);
                } else {
                  if (/\.(\w+)$/.test(C)) {
                    this["import"](D.imports[w], C.replace(/^(.+)\.(\w+)$/, function (t, u, v) {
                      return u + "_import" + w + "." + v;
                    }));
                  } else {
                    this["import"](D.imports[w], C + "_import" + w);
                  }
                }
              }
            }

            if (G) {
              this.importRoot = null;
            }
          }

          if (D["package"]) {
            this.define(D["package"]);
          }

          if (D.syntax) {
            r(D);
          }

          var B = this.ptr;

          if (D.options) {
            Object.keys(D.options).forEach(function (t) {
              B.options[t] = D.options[t];
            });
          }

          if (D.messages) {
            this.create(D.messages), this.ptr = B;
          }

          if (D.enums) {
            this.create(D.enums), this.ptr = B;
          }

          if (D.services) {
            this.create(D.services), this.ptr = B;
          }

          if (D["extends"]) {
            this.create(D["extends"]);
          }

          return this.reset();
        };

        s.resolveAll = function () {
          var t;

          if (this.ptr == null || typeof this.ptr.type === "object") {
            return this;
          }

          if (this.ptr instanceof b.Namespace) {
            this.ptr.children.forEach(function (u) {
              this.ptr = u;
              this.resolveAll();
            }, this);
          } else {
            if (this.ptr instanceof b.Message.Field) {
              if (!q.TYPE.test(this.ptr.type)) {
                if (!q.TYPEREF.test(this.ptr.type)) {
                  throw Error("illegal type reference in " + this.ptr.toString(true) + ": " + this.ptr.type);
                }

                t = (this.ptr instanceof b.Message.ExtensionField ? this.ptr.extension.parent : this.ptr.parent).resolve(this.ptr.type, true);

                if (!t) {
                  throw Error("unresolvable type reference in " + this.ptr.toString(true) + ": " + this.ptr.type);
                }

                this.ptr.resolvedType = t;

                if (t instanceof b.Enum) {
                  this.ptr.type = p.TYPES["enum"];

                  if (this.ptr.syntax === "proto3" && t.syntax !== "proto3") {
                    throw Error("proto3 message cannot reference proto2 enum");
                  }
                } else {
                  if (t instanceof b.Message) {
                    this.ptr.type = t.isGroup ? p.TYPES.group : p.TYPES.message;
                  } else {
                    throw Error("illegal type reference in " + this.ptr.toString(true) + ": " + this.ptr.type);
                  }
                }
              } else {
                this.ptr.type = p.TYPES[this.ptr.type];
              }

              if (this.ptr.map) {
                if (!q.TYPE.test(this.ptr.keyType)) {
                  throw Error("illegal key type for map field in " + this.ptr.toString(true) + ": " + this.ptr.keyType);
                }

                this.ptr.keyType = p.TYPES[this.ptr.keyType];
              }
            } else {
              if (this.ptr instanceof p.Reflect.Service.Method) {
                if (this.ptr instanceof p.Reflect.Service.RPCMethod) {
                  t = this.ptr.parent.resolve(this.ptr.requestName, true);

                  if (!t || !(t instanceof p.Reflect.Message)) {
                    throw Error("Illegal type reference in " + this.ptr.toString(true) + ": " + this.ptr.requestName);
                  }

                  this.ptr.resolvedRequestType = t;
                  t = this.ptr.parent.resolve(this.ptr.responseName, true);

                  if (!t || !(t instanceof p.Reflect.Message)) {
                    throw Error("Illegal type reference in " + this.ptr.toString(true) + ": " + this.ptr.responseName);
                  }

                  this.ptr.resolvedResponseType = t;
                } else {
                  throw Error("illegal service type in " + this.ptr.toString(true));
                }
              } else {
                if (!(this.ptr instanceof p.Reflect.Message.OneOf) && !(this.ptr instanceof p.Reflect.Extension) && !(this.ptr instanceof p.Reflect.Enum.Value)) {
                  throw Error("illegal object in namespace: " + typeof this.ptr + ": " + this.ptr);
                }
              }
            }
          }

          return this.reset();
        };

        s.build = function (w) {
          this.reset();

          if (!this.resolved) {
            this.resolveAll(), this.resolved = true, this.result = null;
          }

          if (this.result === null) {
            this.result = this.ns.build();
          }

          if (!w) {
            return this.result;
          }

          var u = typeof w === "string" ? w.split(".") : w,
              v = this.result;

          for (var t = 0; t < u.length; t++) {
            if (v[u[t]]) {
              v = v[u[t]];
            } else {
              v = null;
              break;
            }
          }

          return v;
        };

        s.lookup = function (t, u) {
          return t ? this.ns.resolve(t, u) : this.ns;
        };

        s.toString = function () {
          return "Builder";
        };

        o.Message = function () {};

        o.Enum = function () {};

        o.Service = function () {};

        return o;
      }(l, l.Lang, l.Reflect);

      l.Map = function (q, b) {
        var r = function (w, x) {
          if (!w.map) {
            throw Error("field is not a map");
          }

          this.field = w;
          this.keyElem = new b.Element(w.keyType, null, true, w.syntax);
          this.valueElem = new b.Element(w.type, w.resolvedType, false, w.syntax);
          this.map = {};
          Object.defineProperty(this, "size", {
            get: function () {
              return Object.keys(this.map).length;
            }
          });

          if (x) {
            var s = Object.keys(x);

            for (var t = 0; t < s.length; t++) {
              var u = this.keyElem.valueFromString(s[t]);
              var v = this.valueElem.verifyValue(x[s[t]]);
              this.map[this.keyElem.valueToString(u)] = {
                key: u,
                value: v
              };
            }
          }
        };

        var p = r.prototype;

        function o(s) {
          var t = 0;
          return {
            next: function () {
              if (t < s.length) {
                return {
                  done: false,
                  value: s[t++]
                };
              }

              return {
                done: true
              };
            }
          };
        }

        p.clear = function () {
          this.map = {};
        };

        p["delete"] = function (t) {
          var s = this.keyElem.valueToString(this.keyElem.verifyValue(t));
          var u = s in this.map;
          delete this.map[s];
          return u;
        };

        p.entries = function () {
          var u = [];
          var v = Object.keys(this.map);

          for (var t = 0, s; t < v.length; t++) {
            u.push([(s = this.map[v[t]]).key, s.value]);
          }

          return o(u);
        };

        p.keys = function () {
          var t = [];
          var s = Object.keys(this.map);

          for (var u = 0; u < s.length; u++) {
            t.push(this.map[s[u]].key);
          }

          return o(t);
        };

        p.values = function () {
          var u = [];
          var s = Object.keys(this.map);

          for (var t = 0; t < s.length; t++) {
            u.push(this.map[s[t]].value);
          }

          return o(u);
        };

        p.forEach = function (u, t) {
          var v = Object.keys(this.map);

          for (var s = 0, w; s < v.length; s++) {
            u.call(t, (w = this.map[v[s]]).value, w.key, this);
          }
        };

        p.set = function (u, s) {
          var v = this.keyElem.verifyValue(u);
          var t = this.valueElem.verifyValue(s);
          this.map[this.keyElem.valueToString(v)] = {
            key: v,
            value: t
          };
          return this;
        };

        p.get = function (t) {
          var s = this.keyElem.valueToString(this.keyElem.verifyValue(t));

          if (!(s in this.map)) {
            return undefined;
          }

          return this.map[s].value;
        };

        p.has = function (t) {
          var s = this.keyElem.valueToString(this.keyElem.verifyValue(t));
          return s in this.map;
        };

        return r;
      }(l, l.Reflect);

      l.loadProto = function (b, o, p) {
        if (typeof o === "string" || o && typeof o.file === "string" && typeof o.root === "string") {
          p = o, o = undefined;
        }

        return l.loadJson(l.DotProto.Parser.parse(b), o, p);
      };

      l.protoFromString = l.loadProto;

      l.loadProtoFile = function (p, b, q) {
        if (b && typeof b === "object") {
          q = b, b = null;
        } else {
          if (!b || typeof b !== "function") {
            b = null;
          }
        }

        if (b) {
          return l.Util.fetch(typeof p === "string" ? p : p.root + "/" + p.file, function (s) {
            if (s === null) {
              b(Error("Failed to fetch file"));
              return;
            }

            try {
              b(null, l.loadProto(s, q, p));
            } catch (r) {
              b(r);
            }
          });
        }

        var o = l.Util.fetch(typeof p === "object" ? p.root + "/" + p.file : p);
        return o === null ? null : l.loadProto(o, q, p);
      };

      l.protoFromFile = l.loadProtoFile;

      l.newBuilder = function (b) {
        b = b || {};

        if (typeof b.convertFieldsToCamelCase === "undefined") {
          b.convertFieldsToCamelCase = l.convertFieldsToCamelCase;
        }

        if (typeof b.populateAccessors === "undefined") {
          b.populateAccessors = l.populateAccessors;
        }

        return new l.Builder(b);
      };

      l.loadJson = function (b, o, p) {
        if (typeof o === "string" || o && typeof o.file === "string" && typeof o.root === "string") {
          p = o, o = null;
        }

        if (!o || typeof o !== "object") {
          o = l.newBuilder();
        }

        if (typeof b === "string") {
          b = JSON.parse(b);
        }

        o["import"](b, p);
        o.resolveAll();
        return o;
      };

      l.loadJsonFile = function (p, b, q) {
        if (b && typeof b === "object") {
          q = b, b = null;
        } else {
          if (!b || typeof b !== "function") {
            b = null;
          }
        }

        if (b) {
          return l.Util.fetch(typeof p === "string" ? p : p.root + "/" + p.file, function (s) {
            if (s === null) {
              b(Error("Failed to fetch file"));
              return;
            }

            try {
              b(null, l.loadJson(JSON.parse(s), q, p));
            } catch (r) {
              b(r);
            }
          });
        }

        var o = l.Util.fetch(typeof p === "object" ? p.root + "/" + p.file : p);
        return o === null ? null : l.loadJson(JSON.parse(o), q, p);
      };

      var m = function (b) {
        var s,
            u,
            v,
            w,
            r,
            p,
            t,
            q = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
        p = b.length;
        r = 0;
        t = "";

        while (r < p) {
          do {
            s = q[b.charCodeAt(r++) & 255];
          } while (r < p && s == -1);

          if (s == -1) {
            break;
          }

          do {
            u = q[b.charCodeAt(r++) & 255];
          } while (r < p && u == -1);

          if (u == -1) {
            break;
          }

          t += String.fromCharCode(s << 2 | (u & 48) >> 4);

          do {
            v = b.charCodeAt(r++) & 255;

            if (v == 61) {
              return t;
            }

            v = q[v];
          } while (r < p && v == -1);

          if (v == -1) {
            break;
          }

          t += String.fromCharCode((u & 15) << 4 | (v & 60) >> 2);

          do {
            w = b.charCodeAt(r++) & 255;

            if (w == 61) {
              return t;
            }

            w = q[w];
          } while (r < p && w == -1);

          if (w == -1) {
            break;
          }

          t += String.fromCharCode((v & 3) << 6 | w);
        }

        return t;
      };

      var h = m("cGFja2FnZSBNb2R1bGVzOwptZXNzYWdlIHByb2J1ZiB7CiAgICBtZXNzYWdlIFNldFVzZXJTdGF0dXNJbnB1dAogICAgewogICAgICAgIG9wdGlvbmFsIGludDMyIHN0YXR1cz0xOwogICAgfQoKICAgIG1lc3NhZ2UgU2V0VXNlclN0YXR1c091dHB1dAogICAgewogICAgICAgIG9wdGlvbmFsIGludDMyIG5vdGhpbmc9MTsKICAgIH0KCiAgICBtZXNzYWdlIEdldFVzZXJTdGF0dXNJbnB1dAogICAgewogICAgICAgIG9wdGlvbmFsIGludDMyIG5vdGhpbmc9MTsKICAgIH0KCiAgICBtZXNzYWdlIEdldFVzZXJTdGF0dXNPdXRwdXQKICAgIHsKICAgICAgICBvcHRpb25hbCBzdHJpbmcgc3RhdHVzPTE7Ly8mIzIzMTvClCYjMTY4OyYjMjMwO8KIJiMxODM7JiMyMjg7JiMxOTE7JiMxNjE7JiMyMzA7woEmIzE3NTsKICAgICAgICBvcHRpb25hbCBzdHJpbmcgc3ViVXNlcklkPTI7Ly8mIzIzMjsmIzE2MjsmIzE3MTsmIzIzMjsmIzE3NDsmIzE2MjsmIzIzMzvCmMKFJiMyMzI7woDChQogICAgfQoKICAgIG1lc3NhZ2UgU3ViVXNlclN0YXR1c0lucHV0CiAgICB7CiAgICAgICAgcmVwZWF0ZWQgc3RyaW5nIHVzZXJpZCA9MTsgIC8vJiMyMzE7wpQmIzE2ODsmIzIzMDvCiCYjMTgzOyYjMjI5O8KIwpcmIzIzMjsmIzE2MTsmIzE2ODsKICAgIH0KCiAgICBtZXNzYWdlIFN1YlVzZXJTdGF0dXNPdXRwdXQKICAgIHsKICAgICAgICBvcHRpb25hbCBpbnQzMiBub3RoaW5nPTE7ICAgIC8vJiMyMjk7wo0mIzE2MDsmIzIyODsmIzE4OTvCjQogICAgfQogICAgbWVzc2FnZSBWb2lwRHluYW1pY0lucHV0CiAgICB7CiAgICAgICAgcmVxdWlyZWQgaW50MzIgIGVuZ2luZVR5cGUgPSAxOwogICAgICAgIHJlcXVpcmVkIHN0cmluZyBjaGFubmVsTmFtZSA9IDI7CiAgICAgICAgb3B0aW9uYWwgc3RyaW5nIGNoYW5uZWxFeHRyYSA9IDM7CiAgICB9CgogICAgbWVzc2FnZSBWb2lwRHluYW1pY091dHB1dAogICAgewogICAgICAgICByZXF1aXJlZCBzdHJpbmcgZHluYW1pY0tleT0xOwogICAgfQogICAgbWVzc2FnZSBOb3RpZnlNc2cgewogICAgICAgIHJlcXVpcmVkIGludDMyIHR5cGUgPSAxOwogICAgICAgIG9wdGlvbmFsIGludDY0IHRpbWUgPSAyOwogICAgICAgIG9wdGlvbmFsIHN0cmluZyBjaHJtSWQ9MzsKICAgIH0KICAgIG1lc3NhZ2UgU3luY1JlcXVlc3RNc2cgewogICAgICAgIHJlcXVpcmVkIGludDY0IHN5bmNUaW1lID0gMTsKICAgICAgICByZXF1aXJlZCBib29sIGlzcG9sbGluZyA9IDI7CiAgICAgICAgb3B0aW9uYWwgYm9vbCBpc3dlYj0zOwogICAgICAgIG9wdGlvbmFsIGJvb2wgaXNQdWxsU2VuZD00OwogICAgICAgIG9wdGlvbmFsIGJvb2wgaXNLZWVwaW5nPTU7CiAgICAgICAgb3B0aW9uYWwgaW50NjQgc2VuZEJveFN5bmNUaW1lPTY7CiAgICB9CiAgICBtZXNzYWdlIFVwU3RyZWFtTWVzc2FnZSB7CiAgICAgICAgcmVxdWlyZWQgaW50MzIgc2Vzc2lvbklkID0gMTsKICAgICAgICByZXF1aXJlZCBzdHJpbmcgY2xhc3NuYW1lID0gMjsKICAgICAgICByZXF1aXJlZCBieXRlcyBjb250ZW50ID0gMzsKICAgICAgICBvcHRpb25hbCBzdHJpbmcgcHVzaFRleHQgPSA0OwogICAgICAgIG9wdGlvbmFsIHN0cmluZyBhcHBEYXRhID0gNTsKICAgICAgICByZXBlYXRlZCBzdHJpbmcgdXNlcklkID0gNjsKICAgIH0KICAgIG1lc3NhZ2UgRG93blN0cmVhbU1lc3NhZ2VzIHsKICAgICAgICByZXBlYXRlZCBEb3duU3RyZWFtTWVzc2FnZSBsaXN0ID0gMTsKICAgICAgICByZXF1aXJlZCBpbnQ2NCBzeW5jVGltZSA9IDI7CiAgICAgICAgb3B0aW9uYWwgYm9vbCBmaW5pc2hlZCA9IDM7CiAgICB9CiAgICBtZXNzYWdlIERvd25TdHJlYW1NZXNzYWdlIHsKICAgICAgICByZXF1aXJlZCBzdHJpbmcgZnJvbVVzZXJJZCA9IDE7CiAgICAgICAgcmVxdWlyZWQgQ2hhbm5lbFR5cGUgdHlwZSA9IDI7CiAgICAgICAgb3B0aW9uYWwgc3RyaW5nIGdyb3VwSWQgPSAzOwogICAgICAgIHJlcXVpcmVkIHN0cmluZyBjbGFzc25hbWUgPSA0OwogICAgICAgIHJlcXVpcmVkIGJ5dGVzIGNvbnRlbnQgPSA1OwogICAgICAgIHJlcXVpcmVkIGludDY0IGRhdGFUaW1lID0gNjsKICAgICAgICByZXF1aXJlZCBpbnQ2NCBzdGF0dXMgPSA3OwogICAgICAgIG9wdGlvbmFsIGludDY0IGV4dHJhID0gODsKICAgICAgICBvcHRpb25hbCBzdHJpbmcgbXNnSWQgPSA5OwogICAgICAgIG9wdGlvbmFsIGludDMyIGRpcmVjdGlvbiA9IDEwOyAKICAgIH0KICAgIGVudW0gQ2hhbm5lbFR5cGUgewogICAgICAgIFBFUlNPTiA9IDE7CiAgICAgICAgUEVSU09OUyA9IDI7CiAgICAgICAgR1JPVVAgPSAzOwogICAgICAgIFRFTVBHUk9VUCA9IDQ7CiAgICAgICAgQ1VTVE9NRVJTRVJWSUNFID0gNTsKICAgICAgICBOT1RJRlkgPSA2OwogICAgICAgIE1DPTc7CiAgICAgICAgTVA9ODsKICAgIH0KICAgIG1lc3NhZ2UgQ3JlYXRlRGlzY3Vzc2lvbklucHV0IHsKICAgICAgICBvcHRpb25hbCBzdHJpbmcgbmFtZSA9IDE7CiAgICB9CiAgICBtZXNzYWdlIENyZWF0ZURpc2N1c3Npb25PdXRwdXQgewogICAgICAgIHJlcXVpcmVkIHN0cmluZyBpZCA9IDE7CiAgICB9CiAgICBtZXNzYWdlIENoYW5uZWxJbnZpdGF0aW9uSW5wdXQgewogICAgICAgIHJlcGVhdGVkIHN0cmluZyB1c2VycyA9IDE7CiAgICB9CiAgICBtZXNzYWdlIExlYXZlQ2hhbm5lbElucHV0IHsKICAgICAgICByZXF1aXJlZCBpbnQzMiBub3RoaW5nID0gMTsKICAgIH0KICAgIG1lc3NhZ2UgQ2hhbm5lbEV2aWN0aW9uSW5wdXQgewogICAgICAgIHJlcXVpcmVkIHN0cmluZyB1c2VyID0gMTsKICAgIH0KICAgIG1lc3NhZ2UgUmVuYW1lQ2hhbm5lbElucHV0IHsKICAgICAgICByZXF1aXJlZCBzdHJpbmcgbmFtZSA9IDE7CiAgICB9CiAgICBtZXNzYWdlIENoYW5uZWxJbmZvSW5wdXQgewogICAgICAgIHJlcXVpcmVkIGludDMyIG5vdGhpbmcgPSAxOwogICAgfQogICAgbWVzc2FnZSBDaGFubmVsSW5mb091dHB1dCB7CiAgICAgICAgcmVxdWlyZWQgQ2hhbm5lbFR5cGUgdHlwZSA9IDE7CiAgICAgICAgcmVxdWlyZWQgc3RyaW5nIGNoYW5uZWxJZCA9IDI7CiAgICAgICAgcmVxdWlyZWQgc3RyaW5nIGNoYW5uZWxOYW1lID0gMzsKICAgICAgICByZXF1aXJlZCBzdHJpbmcgYWRtaW5Vc2VySWQgPSA0OwogICAgICAgIHJlcGVhdGVkIHN0cmluZyBmaXJzdFRlblVzZXJJZHMgPSA1OwogICAgICAgIHJlcXVpcmVkIGludDMyIG9wZW5TdGF0dXMgPSA2OwogICAgfQogICAgbWVzc2FnZSBDaGFubmVsSW5mb3NJbnB1dCB7CiAgICAgICAgcmVxdWlyZWQgaW50MzIgcGFnZSA9IDE7CiAgICAgICAgb3B0aW9uYWwgaW50MzIgbnVtYmVyID0gMjsKICAgIH0KICAgIG1lc3NhZ2UgQ2hhbm5lbEluZm9zT3V0cHV0IHsKICAgICAgICByZXBlYXRlZCBDaGFubmVsSW5mb091dHB1dCBjaGFubmVscyA9IDE7CiAgICAgICAgcmVxdWlyZWQgaW50MzIgdG90YWwgPSAyOwogICAgfQogICAgbWVzc2FnZSBNZW1iZXJJbmZvIHsKICAgICAgICByZXF1aXJlZCBzdHJpbmcgdXNlcklkID0gMTsKICAgICAgICByZXF1aXJlZCBzdHJpbmcgdXNlck5hbWUgPSAyOwogICAgICAgIHJlcXVpcmVkIHN0cmluZyB1c2VyUG9ydHJhaXQgPSAzOwogICAgICAgIHJlcXVpcmVkIHN0cmluZyBleHRlbnNpb24gPSA0OwogICAgfQogICAgbWVzc2FnZSBHcm91cE1lbWJlcnNJbnB1dCB7CiAgICAgICAgcmVxdWlyZWQgaW50MzIgcGFnZSA9IDE7CiAgICAgICAgb3B0aW9uYWwgaW50MzIgbnVtYmVyID0gMjsKICAgIH0KICAgIG1lc3NhZ2UgR3JvdXBNZW1iZXJzT3V0cHV0IHsKICAgICAgICByZXBlYXRlZCBNZW1iZXJJbmZvIG1lbWJlcnMgPSAxOwogICAgICAgIHJlcXVpcmVkIGludDMyIHRvdGFsID0gMjsKICAgIH0KICAgIG1lc3NhZ2UgR2V0VXNlckluZm9JbnB1dCB7CiAgICAgICAgcmVxdWlyZWQgaW50MzIgbm90aGluZyA9IDE7CiAgICB9CiAgICBtZXNzYWdlIEdldFVzZXJJbmZvT3V0cHV0IHsKICAgICAgICByZXF1aXJlZCBzdHJpbmcgdXNlcklkID0gMTsKICAgICAgICByZXF1aXJlZCBzdHJpbmcgdXNlck5hbWUgPSAyOwogICAgICAgIHJlcXVpcmVkIHN0cmluZyB1c2VyUG9ydHJhaXQgPSAzOwogICAgfQogICAgbWVzc2FnZSBHZXRTZXNzaW9uSWRJbnB1dCB7CiAgICAgICAgcmVxdWlyZWQgaW50MzIgbm90aGluZyA9IDE7CiAgICB9CiAgICBtZXNzYWdlIEdldFNlc3Npb25JZE91dHB1dCB7CiAgICAgICAgcmVxdWlyZWQgaW50MzIgc2Vzc2lvbklkID0gMTsKICAgIH0KICAgIGVudW0gRmlsZVR5cGUgewogICAgICAgIGltYWdlID0gMTsKICAgICAgICBhdWRpbyA9IDI7CiAgICAgICAgdmlkZW8gPSAzOwogICAgICAgIGZpbGUgPSA0OwogICAgfQogICAgbWVzc2FnZSBHZXRRTnVwVG9rZW5JbnB1dCB7CiAgICAgICAgcmVxdWlyZWQgRmlsZVR5cGUgdHlwZSA9IDE7CiAgICB9CiAgICBtZXNzYWdlIEdldFFOZG93bmxvYWRVcmxJbnB1dCB7CiAgICAgICAgcmVxdWlyZWQgRmlsZVR5cGUgdHlwZSA9IDE7CiAgICAgICAgcmVxdWlyZWQgc3RyaW5nIGtleSA9IDI7CiAgICAgICAgb3B0aW9uYWwgc3RyaW5nICBmaWxlTmFtZSA9IDM7CiAgICB9CiAgICBtZXNzYWdlIEdldFFOdXBUb2tlbk91dHB1dCB7CiAgICAgICAgcmVxdWlyZWQgaW50NjQgZGVhZGxpbmUgPSAxOwogICAgICAgIHJlcXVpcmVkIHN0cmluZyB0b2tlbiA9IDI7CiAgICB9CiAgICBtZXNzYWdlIEdldFFOZG93bmxvYWRVcmxPdXRwdXQgewogICAgICAgIHJlcXVpcmVkIHN0cmluZyBkb3dubG9hZFVybCA9IDE7CiAgICB9CiAgICBtZXNzYWdlIEFkZDJCbGFja0xpc3RJbnB1dCB7CiAgICAgICAgcmVxdWlyZWQgc3RyaW5nIHVzZXJJZCA9IDE7CiAgICB9CiAgICBtZXNzYWdlIFJlbW92ZUZyb21CbGFja0xpc3RJbnB1dCB7CiAgICAgICAgcmVxdWlyZWQgc3RyaW5nIHVzZXJJZCA9IDE7CiAgICB9CiAgICBtZXNzYWdlIFF1ZXJ5QmxhY2tMaXN0SW5wdXQgewogICAgICAgIHJlcXVpcmVkIGludDMyIG5vdGhpbmcgPSAxOwogICAgfQogICAgbWVzc2FnZSBRdWVyeUJsYWNrTGlzdE91dHB1dCB7CiAgICAgICAgcmVwZWF0ZWQgc3RyaW5nIHVzZXJJZHMgPSAxOwogICAgfQogICAgbWVzc2FnZSBCbGFja0xpc3RTdGF0dXNJbnB1dCB7CiAgICAgICAgcmVxdWlyZWQgc3RyaW5nIHVzZXJJZCA9IDE7CiAgICB9CiAgICBtZXNzYWdlIEJsb2NrUHVzaElucHV0IHsKICAgICAgICByZXF1aXJlZCBzdHJpbmcgYmxvY2tlZUlkID0gMTsKICAgIH0KICAgIG1lc3NhZ2UgTW9kaWZ5UGVybWlzc2lvbklucHV0IHsKICAgICAgICByZXF1aXJlZCBpbnQzMiBvcGVuU3RhdHVzID0gMTsKICAgIH0KICAgIG1lc3NhZ2UgR3JvdXBJbnB1dCB7CiAgICAgICAgcmVwZWF0ZWQgR3JvdXBJbmZvIGdyb3VwSW5mbyA9IDE7CiAgICB9CiAgICBtZXNzYWdlIEdyb3VwT3V0cHV0IHsKICAgICAgICByZXF1aXJlZCBpbnQzMiBub3RoaW5nID0gMTsKICAgIH0KICAgIG1lc3NhZ2UgR3JvdXBJbmZvIHsKICAgICAgICByZXF1aXJlZCBzdHJpbmcgaWQgPSAxOwogICAgICAgIHJlcXVpcmVkIHN0cmluZyBuYW1lID0gMjsKICAgIH0KICAgIG1lc3NhZ2UgR3JvdXBIYXNoSW5wdXQgewogICAgICAgIHJlcXVpcmVkIHN0cmluZyB1c2VySWQgPSAxOwogICAgICAgIHJlcXVpcmVkIHN0cmluZyBncm91cEhhc2hDb2RlID0gMjsKICAgIH0KICAgIG1lc3NhZ2UgR3JvdXBIYXNoT3V0cHV0IHsKICAgICAgICByZXF1aXJlZCBHcm91cEhhc2hUeXBlIHJlc3VsdCA9IDE7CiAgICB9CiAgICBlbnVtIEdyb3VwSGFzaFR5cGUgewogICAgICAgIGdyb3VwX3N1Y2Nlc3MgPSAweDAwOwogICAgICAgIGdyb3VwX2ZhaWx1cmUgPSAweDAxOwogICAgfQogICAgbWVzc2FnZSBDaHJtSW5wdXQgewogICAgICAgIHJlcXVpcmVkIGludDMyIG5vdGhpbmcgPSAxOwogICAgfQogICAgbWVzc2FnZSBDaHJtT3V0cHV0IHsKICAgICAgICByZXF1aXJlZCBpbnQzMiBub3RoaW5nID0gMTsKICAgIH0KICAgIG1lc3NhZ2UgQ2hybVB1bGxNc2cgewogICAgICAgIHJlcXVpcmVkIGludDY0IHN5bmNUaW1lID0gMTsKICAgICAgICByZXF1aXJlZCBpbnQzMiBjb3VudCA9IDI7CiAgICB9CiAgICAKICAgIG1lc3NhZ2UgQ2hybVB1bGxNc2dOZXcgIC8vJiMyMjk7JiMxNzQ7JiMxNjI7JiMyMzA7wogmIzE4MzsmIzIzMTsmIzE3MTsmIzE3NTsmIzIzMDvCliYjMTc2OyYjMjMxO8KawoQmIzIzMDvCi8KJJiMyMjk7wo/CliYjMjMyO8KBwoomIzIyOTsmIzE2NDsmIzE2OTsmIzIyOTsmIzE3NDsmIzE2NDsmIzIzMDsmIzE4MjvCiCYjMjMwO8KBJiMxNzU7CiAgICB7CiAgICAgcmVxdWlyZWQgaW50MzIgY291bnQgPSAxOy8vJiMyMzA7wovCiSYjMjI5O8KPwpYmIzIzMDvCnSYjMTYxOyYjMjMwO8KVJiMxNzY7ICAgMDomIzIzMzvCgMKaJiMyMzE7wp8mIzE2NTsmIzIzMDvCi8KJJiMyMjk7wo/CliAgICYjMjMzO8Kdwp4wJiMyMzk7JiMxODg7wpomIzIyODsmIzE4NDsmIzE4NzsmIzIyOTvCiiYjMTY4OyYjMjMwO8KLwokmIzIyOTvCj8KWJiMyMjk7wo7ChiYjMjI5O8KPJiMxNzg7JiMyMzA7JiMxODI7wogmIzIzMDvCgSYjMTc1OyYjMjMwO8KdJiMxNjE7JiMyMzA7wpUmIzE3NjsKICAgICByZXF1aXJlZCBpbnQ2NCBzeW5jVGltZSA9IDI7Ly8mIzIyOTvCkMKMJiMyMzA7JiMxNzM7JiMxNjU7JiMyMzA7wovCiSYjMjI5O8KPwpYmIzIzMDvClyYjMTgyOyYjMjMzO8KXJiMxODA7CiAgICAgb3B0aW9uYWwgc3RyaW5nIGNocm1JZD0zOy8vJiMyMzI7woHCiiYjMjI5OyYjMTY0OyYjMTY5OyYjMjI5OyYjMTc0OyYjMTY0O0lECiAgICB9CiAgICAKICAgIG1lc3NhZ2UgUmVsYXRpb25zSW5wdXQKICAgIHsKICAgICAgICByZXF1aXJlZCBDaGFubmVsVHlwZSB0eXBlID0gMTsKICAgICAgICBvcHRpb25hbCBEb3duU3RyZWFtTWVzc2FnZSBtc2cgPTI7CiAgICAgICAgb3B0aW9uYWwgaW50MzIgY291bnQgPSAzOwogICAgICAgIG9wdGlvbmFsIGludDMyIG9mZnNldCA9IDQ7CiAgICAgICAgb3B0aW9uYWwgaW50NjQgc3RhcnRUaW1lID0gNTsKICAgICAgICBvcHRpb25hbCBpbnQ2NCBlbmRUaW1lID0gNjsKICAgIH0KICAgIG1lc3NhZ2UgUmVsYXRpb25zT3V0cHV0CiAgICB7CiAgICAgICAgcmVwZWF0ZWQgUmVsYXRpb25JbmZvIGluZm8gPSAxOwogICAgfQogICAgbWVzc2FnZSBSZWxhdGlvbkluZm8KICAgIHsKICAgICAgICByZXF1aXJlZCBDaGFubmVsVHlwZSB0eXBlID0gMTsKICAgICAgICByZXF1aXJlZCBzdHJpbmcgdXNlcklkID0gMjsKICAgICAgICBvcHRpb25hbCBEb3duU3RyZWFtTWVzc2FnZSBtc2cgPTM7CiAgICAgICAgb3B0aW9uYWwgaW50NjQgcmVhZE1zZ1RpbWU9IDQ7CiAgICB9CiAgICBtZXNzYWdlIFJlbGF0aW9uSW5mb1JlYWRUaW1lCiAgICB7CiAgICAgICAgcmVxdWlyZWQgQ2hhbm5lbFR5cGUgdHlwZSA9IDE7CiAgICAgICAgcmVxdWlyZWQgaW50NjQgcmVhZE1zZ1RpbWU9IDI7CiAgICAgICAgcmVxdWlyZWQgc3RyaW5nIHRhcmdldElkID0gMzsKICAgIH0KICAgIG1lc3NhZ2UgQ2xlYW5IaXNNc2dJbnB1dAogICAgewogICAgICAgICByZXF1aXJlZCBzdHJpbmcgdGFyZ2V0SWQgPSAxOy8vJiMyMjk7wo8mIzE3NTsmIzIzMjvCgyYjMTg5OyYjMjMwO8KYJiMxNzU7JiMyMzE7wpQmIzE2ODsmIzIzMDvCiCYjMTgzO2lkJiMyMzk7JiMxODg7wowmIzIzMTsmIzE5MDsmIzE2NDsmIzIzMTsmIzE4NzvChGlkJiMyMzE7JiMxNzM7wokmIzIyNzvCgMKCCiAgICAgICAgIHJlcXVpcmVkIGludDY0IGRhdGFUaW1lID0gMjsvLyYjMjMwOyYjMTg0O8KFJiMyMzM7wpkmIzE2NDsmIzIzMDvClyYjMTgyOyYjMjMzO8KXJiMxODA7CiAgICAgICAgIG9wdGlvbmFsIGludDMyIGNvbnZlcnNhdGlvblR5cGU9IDM7Ly8gJiMyMjk7JiMxNjQ7wocmIzIzMzvCgMKJJiMyMjk7JiMxNzM7wpcmIzIzMDsmIzE3NDsmIzE4MTsmIzIzMDvCmsKCJiMyMjg7JiMxODQ7wo0mIzIzMzvCnMKAJiMyMzI7JiMxNjY7woEKICAgIH0KICAgIG1lc3NhZ2UgSGlzdG9yeU1lc3NhZ2VJbnB1dAogICAgewogICAgICAgIHJlcXVpcmVkIHN0cmluZyB0YXJnZXRJZCA9IDE7CiAgICAgICAgcmVxdWlyZWQgaW50NjQgZGF0YVRpbWUgPTI7CiAgICAgICAgcmVxdWlyZWQgaW50MzIgc2l6ZSAgPSAzOwogICAgfQoKICAgIG1lc3NhZ2UgSGlzdG9yeU1lc3NhZ2VzT3VwdXQKICAgIHsKICAgICAgICByZXBlYXRlZCBEb3duU3RyZWFtTWVzc2FnZSBsaXN0ID0gMTsKICAgICAgICByZXF1aXJlZCBpbnQ2NCBzeW5jVGltZSA9IDI7CiAgICAgICAgcmVxdWlyZWQgaW50MzIgaGFzTXNnID0gMzsKICAgIH0KICAgIG1lc3NhZ2UgUXVlcnlDaGF0cm9vbUluZm9JbnB1dAogICAgewogICAgIHJlcXVpcmVkIGludDMyIGNvdW50PSAxOy8vJiMyMzA7wpzCnyYjMjMwO8KcwpsmIzIzMjvCjiYjMTgzOyYjMjI5O8KPwpYmIzIzMjvCgcKKJiMyMjk7JiMxNjQ7JiMxNjk7JiMyMjk7JiMxNzQ7JiMxNjQ7JiMyMzE7wpQmIzE2ODsmIzIzMDvCiCYjMTgzOyYjMjMxO8KawoQmIzIyODsmIzE4NjsmIzE4NjsmIzIzMDvClSYjMTc2OyYjMjM5OyYjMTg4O8KMJiMyMzI7wozCgyYjMjI5O8KbJiMxODA7JiMyMjg7JiMxODQ7JiMxODY7MH4yMAogICAgIG9wdGlvbmFsIGludDMyIG9yZGVyPSAyOy8vJiMyMzA7wozCiSYjMjMwO8KXJiMxODI7JiMyMzM7wpcmIzE4MDsmIzIzMDvCjsKSJiMyMjk7JiMxODY7wo8mIzIzOTsmIzE4ODvCjCYjMjMyO8KMwoMmIzIyOTvCmyYjMTgwOyYjMjM5OyYjMTg4O8KaMCYjMjM5OyYjMTg4O8KMMSYjMjM5OyYjMTg4O8KMMi4mIzIzOTsmIzE4ODvCiDA6JiMyMjg7JiMxODQ7wo0mIzIzMjsmIzE5MTvClCYjMjI5O8Kbwp4mIzIzOTsmIzE4ODvCmzE6JiMyMzA7JiMxNzM7JiMxNjM7JiMyMjk7JiMxODY7wo8oJiMyMzA7wpzCgCYjMjMwO8KXJiMxNjk7JiMyMjk7woomIzE2MDsmIzIyOTvChSYjMTY1OykmIzIzOTsmIzE4ODvCmzI6JiMyMjk7woDCkiYjMjI5OyYjMTg2O8KPKCYjMjMwO8KcwoAmIzIzMDvCmcKaJiMyMjk7woomIzE2MDsmIzIyOTvChSYjMTY1OykmIzIzOTsmIzE4ODvCiQogICAgfQoKICAgIG1lc3NhZ2UgUXVlcnlDaGF0cm9vbUluZm9PdXRwdXQKICAgIHsKICAgICBvcHRpb25hbCBpbnQzMiB1c2VyVG90YWxOdW1zID0gMTsvLyYjMjI5OyYjMTg5O8KTJiMyMjk7wonCjSYjMjMyO8KBwoomIzIyOTsmIzE2NDsmIzE2OTsmIzIyOTsmIzE3NDsmIzE2NDsmIzIyODsmIzE4NDsmIzE3MzsmIzIzMTvCmsKEJiMyMzA7woAmIzE4NzsmIzIyODsmIzE4NjsmIzE4NjsmIzIzMDvClSYjMTc2OwogICAgIHJlcGVhdGVkIENocm1NZW1iZXIgdXNlckluZm9zID0gMjsvLyYjMjMyOyYjMTkxO8KUJiMyMjk7wpvCniYjMjMzO8KDJiMxNjg7JiMyMjk7wojChiYjMjMxO8KUJiMxNjg7JiMyMzA7wogmIzE4MzsmIzIyODsmIzE5MTsmIzE2MTsmIzIzMDvCgSYjMTc1OyYjMjI5O8KIwpcmIzIzMjsmIzE2MTsmIzE2ODsmIzIzOTsmIzE4ODvCiCYjMjI5O8KPJiMxNzA7JiMyMjk7wozChSYjMjI5O8KQJiMxNzE7dXNlcklkJiMyMjk7wpLCjGpvaW5UaW1lJiMyMjk7JiMxNzc7wp4mIzIzMDvCgCYjMTY3OyYjMjM5OyYjMTg4O8KJCiAgICB9CiAgICBtZXNzYWdlIENocm1NZW1iZXIKICAgIHsKICAgICByZXF1aXJlZCBpbnQ2NCB0aW1lID0gMTsvL01lbWJlciYjMjMxO8KawoRqb2luVGltZQogICAgIHJlcXVpcmVkIHN0cmluZyBpZCA9IDI7Ly9NZW1iZXImIzIzMTvCmsKEdXNlcklkCiAgICB9CiAgICBtZXNzYWdlIE1QRm9sbG93SW5wdXQgIC8vbXAmIzIyOTvChSYjMTc5OyYjMjMwOyYjMTc5OyYjMTY4Oy8mIzIyOTvCj8KWJiMyMzA7JiMxODI7wogmIzIyOTvChSYjMTc5OyYjMjMwOyYjMTc5OyYjMTY4OwogICAgewogICAgICAgIHJlcXVpcmVkIHN0cmluZyBpZCA9IDE7Ly9tcGlkCiAgICB9CgogICAgbWVzc2FnZSBNUEZvbGxvd091dHB1dAogICAgewogICAgICAgIHJlcXVpcmVkIGludDMyIG5vdGhpbmcgPSAxOy8vJiMyMjk7wo0mIzE2MDsmIzIyODsmIzE4OTvCjSYjMjI5OyYjMTczO8KXJiMyMzA7JiMxNzQ7JiMxODE7CiAgICAgICAgb3B0aW9uYWwgTXBJbmZvIGluZm8gPTI7Ly8mIzIyOTvChSYjMTc5OyYjMjMwOyYjMTc5OyYjMTY4OyYjMjMxO8KawoRtcGluZm8KICAgIH0KCiAgICBtZXNzYWdlIE1DRm9sbG93SW5wdXQgICAvL21jJiMyMjk7woUmIzE3OTsmIzIzMDsmIzE3OTsmIzE2ODsvJiMyMjk7wo/CliYjMjMwOyYjMTgyO8KIJiMyMjk7woUmIzE3OTsmIzIzMDsmIzE3OTsmIzE2ODsKICAgIHsKICAgICAgICByZXF1aXJlZCBzdHJpbmcgaWQgPSAxOy8vbWNpZAogICAgfQoKICAgIG1lc3NhZ2UgTUNGb2xsb3dPdXRwdXQKICAgIHsKICAgICAgICByZXF1aXJlZCBpbnQzMiBub3RoaW5nID0gMTsvLyYjMjI5O8KNJiMxNjA7JiMyMjg7JiMxODk7wo0mIzIyOTsmIzE3MzvClyYjMjMwOyYjMTc0OyYjMTgxOwogICAgICAgIG9wdGlvbmFsIE1wSW5mbyBpbmZvID0yOy8vJiMyMjk7woUmIzE3OTsmIzIzMDsmIzE3OTsmIzE2ODsmIzIzMTvCmsKEbXBpbmZvCiAgICB9CgogICAgbWVzc2FnZSBNcEluZm8gIC8vbXAmIzIyOTvCnyYjMTg2OyYjMjMwO8KcJiMxNzI7JiMyMjg7JiMxOTE7JiMxNjE7JiMyMzA7woEmIzE3NTsKICAgIHsKICAgICAgICByZXF1aXJlZCBzdHJpbmcgbXBpZD0xOy8vbXAvbWNpZAogICAgICAgIHJlcXVpcmVkIHN0cmluZyBuYW1lID0gMjsvL2Rpc3BsYXlOYW1lCiAgICAgICAgcmVxdWlyZWQgc3RyaW5nIHR5cGUgPSAzOy8vbXAvbWMKICAgICAgICByZXF1aXJlZCBpbnQ2NCB0aW1lPTQ7Ly8mIzIyOTvChSYjMTcyOyYjMjI4OyYjMTg4O8KXJiMyMjk7JiMxODQ7wpAmIzIyOTvCjyYjMTgzOyYjMjI4OyYjMTkxOyYjMTc0OyYjMjMwO8KUJiMxODU7JiMyMzA7wpcmIzE4MjsmIzIzMzvClyYjMTgwOwogICAgICAgIG9wdGlvbmFsIHN0cmluZyBwb3J0cmFpdFVybD01Oy8vJiMyMjk7JiMxNjQ7JiMxODA7JiMyMjk7woPCjwogICAgICAgIG9wdGlvbmFsIHN0cmluZyBleHRyYSA9NjsvLyYjMjI5O8KFJiMxODI7JiMyMjg7JiMxODc7wpYmIzIyODsmIzE5MTsmIzE2MTsmIzIzMDvCgSYjMTc1Oyhqc29uKSYjMjM5OyYjMTg4O8KMJiMyMzA7wovCiSYjMjI5O8KPwpYmIzIzMTvCmsKEJiMyMzA7wpcmIzE4MjsmIzIyOTvCgMKZJiMyMjk7wozChSYjMjI5O8KQJiMxNzE7JiMyMzI7wo/CnCYjMjI5O8KNwpUmIzIyNzvCgMKBJiMyMzE7JiMxNzQ7woAmIzIyODsmIzE4NzvCiyYjMjMxOyYjMTczO8KJJiMyMjg7JiMxOTE7JiMxNjE7JiMyMzA7woEmIzE3NTsmIzIyNzvCgMKCCiAgICB9CgogICAgbWVzc2FnZSBTZWFyY2hNcElucHV0IC8vJiMyMzA7JiMxNjA7JiMxODU7JiMyMzA7wo0mIzE3NDsmIzIyOTvChSYjMTcyOyYjMjI4OyYjMTg4O8KXJiMyMjk7JiMxODQ7wpAmIzIyOTvCjyYjMTgzO2lkJiMyMjk7JiMxNzQ7wowmIzIyOTvChSYjMTY4OyYjMjI5O8KMJiMxODU7JiMyMzM7woXCjSYjMjMwO8KfJiMxNjU7JiMyMzA7wokmIzE5MDsKICAgIHsKICAgICAgICByZXF1aXJlZCBpbnQzMiB0eXBlPTE7Ly8mIzIzMDsmIzE2MDvChyYjMjI5OyYjMTkxO8KXJiMyMjg7JiMxODk7wo0sJiMyMzA7wpcmIzE2NTsmIzIyOTvCkMKOJiMyMzA7wozCiSYjMjI4OyYjMTg5O8KNJiMyMzA7wp0mIzE2NTsmIzIyOTvCgcKaJiMyMzA7wokmIzE2OTsmIzIyOTsmIzE3NzvClQogICAgICAgIHJlcXVpcmVkIHN0cmluZyBpZD0yOy8vbXBpZC9tY2lkL2Rpc3BsYXlOYW1lCiAgICB9CgogICAgbWVzc2FnZSBTZWFyY2hNcE91dHB1dAogICAgewogICAgICAgIHJlcXVpcmVkIGludDMyIG5vdGhpbmc9MTsvLyYjMjI5O8KNJiMxNjA7JiMyMjg7JiMxODk7wo0mIzIzMTsmIzE3MjsmIzE2NjsKICAgICAgICByZXBlYXRlZCBNcEluZm8gaW5mbyA9IDI7Ly8mIzIyOTvChSYjMTcyOyYjMjI4OyYjMTg4O8KXJiMyMjk7JiMxODQ7wpAmIzIyOTvCjyYjMTgzOwogICAgfQoKICAgIG1lc3NhZ2UgUHVsbE1wSW5wdXQgLy8mIzIzMTsmIzE3MTsmIzE3NTsmIzIyODsmIzE4NDvCiiYjMjMwO8KLwokmIzIyOTvCj8KWJiMyMjk7woUmIzE3MjsmIzIyODsmIzE4ODvClyYjMjMyOyYjMTgwOyYjMTY2OyYjMjI5O8KPJiMxODM7JiMyMjg7JiMxOTE7JiMxNjE7JiMyMzA7woEmIzE3NTsKICAgIHsKICAgICAgICByZXF1aXJlZCBpbnQ2NCB0aW1lPTE7Ly8mIzIyOTvChSYjMTcyOyYjMjI4OyYjMTg4O8KXJiMyMjk7JiMxODQ7wpAmIzIyOTvCjyYjMTgzOyYjMjI4OyYjMTkxOyYjMTc0OyYjMjMwO8KUJiMxODU7JiMyMzA7wpcmIzE4MjsmIzIzMzvClyYjMTgwOwogICAgICAgIHJlcXVpcmVkIHN0cmluZyBtcGlkPTI7Ly8mIzIzMTsmIzE3MTsmIzE3NTsmIzIyODsmIzE4NDvCiiYjMjMxOyYjMTg4O8KTJiMyMjk7JiMxNzM7wpgmIzIyOTvChSYjMTcyOyYjMjI4OyYjMTg4O8KXJiMyMjk7JiMxODQ7wpAmIzIyOTvCjyYjMTgzOyYjMjMxO8KawoRpZCYjMjMxO8KawoRtZDUmIzIyODsmIzE4NDsmIzE3ODsKICAgIH0KCiAgICBtZXNzYWdlIFB1bGxNcE91dHB1dAogICAgewogICAgICAgIHJlcXVpcmVkIGludDMyIHN0YXR1cz0xOy8vJiMyMzA7wpgmIzE3NTsmIzIyOTvCkCYjMTY2OyYjMjMwO8KcwokmIzIzMDsmIzE4MzsmIzE4NzsmIzIyOTvCiiYjMTYwOyYjMjI5O8KSwowmIzIyOTvCiCYjMTYwOyYjMjMzO8KZJiMxNjQ7JiMyMzk7JiMxODg7wowmIzIyOTsmIzE2NjvCgiYjMjMwO8KewpwmIzIzMDvCnMKJJiMyMjk7wo/CmCYjMjI5O8KMwpYmIzIyOTvCiMKZJiMyMzI7JiMxOTE7wpQmIzIyOTvCm8KeJiMyMjk7woUmIzE2ODsmIzIzMzvCgyYjMTY4OyYjMjM5OyYjMTg4O8KMJiMyMjk7wpAmIzE2NjsmIzIyOTvCiMKZJiMyMzI7JiMxOTE7wpQmIzIyOTvCm8KeJiMyMzA7wpsmIzE4MDsmIzIzMDvCliYjMTc2OyYjMjMxO8KawoQKICAgICAgICByZXBlYXRlZCBNcEluZm8gaW5mbyA9IDI7Ly8mIzIyOTvChSYjMTcyOyYjMjI4OyYjMTg4O8KXJiMyMjk7JiMxODQ7wpAmIzIyOTvCjyYjMTgzOwogICAgfQogICAgbWVzc2FnZSBIaXN0b3J5TXNnSW5wdXQgIAogICAgewogICAgICAgIG9wdGlvbmFsIHN0cmluZyB0YXJnZXRJZCA9IDE7Ly8mIzIzMjvCgcKKJiMyMjk7JiMxNjQ7JiMxNjk7JiMyMjk7JiMxNzQ7JiMxNjQ7SUQKICAgICAgICBvcHRpb25hbCBpbnQ2NCB0aW1lID0gMjsvLyYjMjMwO8KfJiMxNjU7JiMyMzI7JiMxNzU7JiMxNjI7JiMyMzA7wpcmIzE4MjsmIzIzMzvClyYjMTgwOyYjMjMxO8KCJiMxODU7CiAgICAgICAgb3B0aW9uYWwgaW50MzIgY291bnQgID0gMzsvLyYjMjMwO8KLwokmIzIyOTvCj8KWJiMyMzA7wp0mIzE2MTsmIzIzMDvClSYjMTc2OwogICAgICAgIG9wdGlvbmFsIGludDMyIG9yZGVyID0gNDsvLyYjMjMwO8KLwokmIzIyOTvCj8KWJiMyMzM7JiMxNjE7JiMxODY7JiMyMjk7JiMxODY7wo8gKDEmIzIzOTsmIzE4ODvCmiYjMjMwOyYjMTczOyYjMTYzOyYjMjI5OyYjMTg2O8KPJiMyMzk7JiMxODg7wpswJiMyMzk7JiMxODg7wpomIzIyOTvCgMKSJiMyMjk7JiMxODY7wo8pCiAgICB9CgogICAgbWVzc2FnZSBIaXN0b3J5TXNnT3VwdXQgIC8vJiMyMzI7JiMxOTE7wpQmIzIyOTvCm8KeJiMyMzI7woHCiiYjMjI5OyYjMTY0OyYjMTY5OyYjMjI5OyYjMTc0OyYjMTY0OyYjMjI5O8KOwoYmIzIyOTvCjyYjMTc4OyYjMjMwOyYjMTgyO8KIJiMyMzA7woEmIzE3NTsKICAgIHsKICAgICAgICByZXBlYXRlZCBEb3duU3RyZWFtTWVzc2FnZSBsaXN0PTE7Ly8mIzIzMDvCicKAJiMyMzA7wosmIzE2NTsmIzIzMDvCnMKJJiMyMzE7wprChCYjMjMwOyYjMTgyO8KIJiMyMzA7woEmIzE3NTsmIzIzOTsmIzE4ODvCiGxpc3QmIzIyOTsmIzE2NDvCjSYjMjMxOyYjMTc3OyYjMTg3OyYjMjI5O8KewosmIzIzOTsmIzE4ODvCiQogICAgICAgIHJlcXVpcmVkIGludDY0IHN5bmNUaW1lPTI7Ly8mIzIyOTvCkMKMJiMyMzA7JiMxNzM7JiMxNjU7JiMyMzA7wpcmIzE4MjsmIzIzMzvClyYjMTgwOwogICAgICAgIHJlcXVpcmVkIGludDMyIGhhc01zZz0zOyAvLyYjMjMwO8KYJiMxNzU7JiMyMjk7wpAmIzE2NjsmIzIzMjsmIzE5MTvCmCYjMjMwO8KcwokmIzIyOTvCkMKOJiMyMzE7JiMxODc7JiMxNzM7JiMyMjk7wo7ChiYjMjI5O8KPJiMxNzg7JiMyMzA7JiMxODI7wogmIzIzMDvCgSYjMTc1OwogICAgfQogICAgbWVzc2FnZSBSdGNRdWVyeUxpc3RJbnB1dHsKICAgICAgb3B0aW9uYWwgaW50MzIgb3JkZXI9MTsgLy8mIzIzMDvCnSYjMTYxOyYjMjMwO8KVJiMxNzY7JiMyMzM7wpnCkCYjMjI5O8KIJiMxODI7JiMyMjk7wpwmIzE2ODsmIzIzMDvCnMKNJiMyMjk7woomIzE2MTsmIzIzMTsmIzE3MTsmIzE3NTsmIzIyOTvCgcKaIDEgJiMyMzA7wpgmIzE3NTsmIzIzMDsmIzE3MzsmIzE2MzsmIzIyOTsmIzE4NjvCjywyJiMyMzA7wpgmIzE3NTsmIzIyOTvCgMKSJiMyMjk7JiMxODY7wo8KICAgIH0KCiAgICBtZXNzYWdlIFJ0Y0tleURlbGV0ZUlucHV0ewogICAgICByZXBlYXRlZCBzdHJpbmcga2V5PTE7CiAgICB9CgogICAgbWVzc2FnZSBSdGNWYWx1ZUluZm97CiAgICAgIHJlcXVpcmVkIHN0cmluZyBrZXk9MTsKICAgICAgcmVxdWlyZWQgc3RyaW5nIHZhbHVlPTI7CiAgICB9CgogICAgbWVzc2FnZSBSdGNVc2VySW5mb3sKICAgICAgcmVxdWlyZWQgc3RyaW5nIHVzZXJJZD0xOwogICAgICByZXBlYXRlZCBSdGNWYWx1ZUluZm8gdXNlckRhdGE9MjsKICAgIH0KCiAgICBtZXNzYWdlIFJ0Y1VzZXJMaXN0T3V0cHV0ewogICAgICByZXBlYXRlZCBSdGNVc2VySW5mbyBsaXN0PTE7CiAgICAgIG9wdGlvbmFsIHN0cmluZyB0b2tlbj0yOwogICAgfQogICAgbWVzc2FnZSBSdGNSb29tSW5mb091dHB1dHsKICAgICAgICBvcHRpb25hbCBzdHJpbmcgcm9vbUlkID0gMTsKICAgICAgICByZXBlYXRlZCBSdGNWYWx1ZUluZm8gcm9vbURhdGEgPSAyOwogICAgICAgIG9wdGlvbmFsIGludDMyIHVzZXJDb3VudCA9IDM7CiAgICAgICAgcmVwZWF0ZWQgUnRjVXNlckluZm8gbGlzdD00OwogICAgfQogICAgbWVzc2FnZSBSdGNJbnB1dHsKICAgICAgb3B0aW9uYWwgaW50MzIgbm90aGluZz0xOwogICAgfQogICAgbWVzc2FnZSBSdGNRcnlJbnB1dHsgLy9xdWVyeSAmIzIyOTvCjyYjMTc1OyYjMjI4OyYjMTg3OyYjMTY1OyYjMjMwO8KYJiMxNzU7JiMyMzA7wp8mIzE2NTsmIzIzMjsmIzE3NTsmIzE2MjsmIzIyOTvCjcKVJiMyMjg7JiMxODQ7JiMxNzA7JiMyMjk7JiMxNzc7wp4mIzIzMDvCgCYjMTY3OyYjMjI4OyYjMTg1O8KfJiMyMjk7wo8mIzE3NTsmIzIyODsmIzE4NzsmIzE2NTsmIzIzMDvCnyYjMTY1OyYjMjMyOyYjMTc1OyYjMTYyOyYjMjI5OyYjMTY0O8KaJiMyMjg7JiMxODQ7JiMxNzA7JiMyMjk7JiMxNzc7wp4mIzIzMDvCgCYjMTY3OwogICAgICByZXF1aXJlZCBib29sIGlzSW50ZXJpb3I9MTsvLyYjMjMwO8KYJiMxNzU7JiMyMjk7wpAmIzE2NjsmIzIyODsmIzE4NDsmIzE4NjsmIzIzMjvCjiYjMTgzOyYjMjI5O8KPwpYmIzIyOTvChsKFJiMyMzM7woMmIzE2ODsmIzIzMDvClSYjMTc2OyYjMjMwO8KNJiMxNzQ7CiAgICAgIHJlcXVpcmVkIHRhcmdldFR5cGUgdGFyZ2V0PTI7CiAgICAgIHJlcGVhdGVkIHN0cmluZyBrZXk9MzsgLy8mIzIyOTvCiCYjMTYwOyYjMjMzO8KZJiMxNjQ7JiMyMzA7wozChyYjMjI5OyYjMTc0O8KaIHVzZXIgJiMyMzA7wojCliYjMjMyO8KAwoUgcm9vbSBJZCYjMjMxO8KawoQga2V5CiAgICB9CiAgICBtZXNzYWdlIFJ0Y1FyeU91dHB1dHsKICAgICAgcmVwZWF0ZWQgUnRjVmFsdWVJbmZvIG91dEluZm89MTsKICAgIH0KICAgIG1lc3NhZ2UgUnRjRGVsRGF0YUlucHV0ewogICAgICByZXBlYXRlZCBzdHJpbmcga2V5PTE7IC8vJiMyMjk7wogmIzE2MDsmIzIzMzvCmSYjMTY0OyYjMjMwO8KMwocmIzIyOTsmIzE3NDvCmiB1c2VyICYjMjMwO8KIwpYmIzIzMjvCgMKFIHJvb20gSWQmIzIzMTvCmsKEIGtleQogICAgICByZXF1aXJlZCBib29sIGlzSW50ZXJpb3I9MjsvLyYjMjMwO8KYJiMxNzU7JiMyMjk7wpAmIzE2NjsmIzIyODsmIzE4NDsmIzE4NjsmIzIyOTsmIzE2NDvChCYjMjMxO8KQwoYmIzIyOTvChsKFJiMyMzM7woMmIzE2ODsmIzIzMDvClSYjMTc2OyYjMjMwO8KNJiMxNzQ7CiAgICAgIHJlcXVpcmVkIHRhcmdldFR5cGUgdGFyZ2V0PTM7CiAgICB9CiAgICBtZXNzYWdlIFJ0Y0RhdGFJbnB1dHsgCiAgICAgIHJlcXVpcmVkIGJvb2wgaW50ZXJpb3I9MTsKICAgICAgLy8mIzIzMDvCmCYjMTc1OyYjMjI5O8KQJiMxNjY7JiMyMjg7JiMxODQ7JiMxODY7JiMyMzI7wo4mIzE4MzsmIzIyOTvCj8KWJiMyMjk7wobChSYjMjMzO8KDJiMxNjg7JiMyMzA7wpUmIzE3NjsmIzIzMDvCjSYjMTc0OwogICAgICByZXF1aXJlZCB0YXJnZXRUeXBlIHRhcmdldD0yOwogICAgICAvLyYjMjI5O8KIJiMxNjA7JiMyMzM7wpkmIzE2NDsmIzIzMDvCjMKHJiMyMjk7JiMxNzQ7wpogdXNlciAmIzIzMDvCiMKWJiMyMzI7woDChSByb29tIElkJiMyMzE7wprChCBrZXkKICAgICAgcmVwZWF0ZWQgc3RyaW5nIGtleT0zOwogICAgICBvcHRpb25hbCBzdHJpbmcgb2JqZWN0TmFtZT00OwogICAgICBvcHRpb25hbCBzdHJpbmcgY29udGVudD01OwogICAgfQogICAgbWVzc2FnZSBSdGNTZXREYXRhSW5wdXR7CiAgICAgIHJlcXVpcmVkIGJvb2wgaW50ZXJpb3I9MTsvLyYjMjMwO8KYJiMxNzU7JiMyMjk7wpAmIzE2NjsmIzIyODsmIzE4NDsmIzE4NjsmIzIyOTvCj8KRJiMyMjk7JiMxODQ7woMmIzIyOTvChsKFJiMyMzM7woMmIzE2ODsmIzIzMDvClSYjMTc2OyYjMjMwO8KNJiMxNzQ7CiAgICAgIHJlcXVpcmVkIHRhcmdldFR5cGUgdGFyZ2V0PTI7CiAgICAgIHJlcXVpcmVkIHN0cmluZyBrZXk9MzsKICAgICAgcmVxdWlyZWQgc3RyaW5nIHZhbHVlPTQ7CiAgICAgIG9wdGlvbmFsIHN0cmluZyBvYmplY3ROYW1lPTU7CiAgICAgIG9wdGlvbmFsIHN0cmluZyBjb250ZW50PTY7CiAgICB9CiAgICBtZXNzYWdlIFJ0Y091dHB1dAogICAgewogICAgICAgIG9wdGlvbmFsIGludDMyIG5vdGhpbmc9MTsgICAgLy8mIzIyOTvCjSYjMTYwOyYjMjI4OyYjMTg5O8KNCiAgICB9CiAgICBtZXNzYWdlIFJ0Y1Rva2VuT3V0cHV0ewogICAgICByZXF1aXJlZCBzdHJpbmcgcnRjVG9rZW49MTsKICAgIH0KICAgIGVudW0gdGFyZ2V0VHlwZSB7CiAgICAgIFJPT00gPTEgOwogICAgICBQRVJTT04gPSAyOwogICAgfQp9");
      var i = l.loadProto(h, undefined, "").build("Modules").probuf;
      return i;
    }(c, d);

    return e;
  });
});

var RongEmoji2_2_7 = createCommonjsModule(function (module, exports) {
  /* eslint-disable */

  /*
      支持范围
      IE6+, Chrome, Safari, Firefox, Android, IOS
   */
  (function (global, factory) {

    {
      module.exports = factory();
    }
  })(window, function () {
    var _export = {}; // emoji 默认大小

    var DefaultSize = 24; // 默认语言, 暂时仅支持 zh, en

    var DefaultLang = 'zh'; // 支持的语言

    var SupportLangs = ['zh', 'en']; // 24px 的 emoji 图片地址

    var NornalImagePath = '//cdn.ronghub.com/emojis-normal.png'; // 48px(高清图) 的 emoji 图片地址

    var HdImagePath = '//cdn.ronghub.com/emojis-hd.png'; // emoji 的 unicode 正则匹配

    var UnicodeReg = /\uf469\u200d\u2764\ufe0f\u200d\uf48b\u200d\uf468|\uf468\u200d\u2764\ufe0f\u200d\uf48b\u200d\uf468|\uf469\u200d\u2764\ufe0f\u200d\uf48b\u200d\uf469|\uf468\u200d\uf469\u200d\uf467\u200d\uf466|\uf468\u200d\uf469\u200d\uf466\u200d\uf466|\uf468\u200d\uf469\u200d\uf467\u200d\uf467|\uf468\u200d\uf468\u200d\uf467\u200d\uf466|\uf468\u200d\uf468\u200d\uf466\u200d\uf466|\uf468\u200d\uf468\u200d\uf467\u200d\uf467|\uf469\u200d\uf469\u200d\uf467\u200d\uf466|\uf469\u200d\uf469\u200d\uf466\u200d\uf466|\uf469\u200d\uf469\u200d\uf467\u200d\uf467|\uf3f4\ue0067\ue0062\ue0065\ue006e\ue0067\ue007f|\uf3f4\ue0067\ue0062\ue0073\ue0063\ue0074\ue007f|\uf3f4\ue0067\ue0062\ue0077\ue006c\ue0073\ue007f|\uf469\u200d\u2764\ufe0f\u200d\uf468|\uf468\u200d\u2764\ufe0f\u200d\uf468|\uf469\u200d\u2764\ufe0f\u200d\uf469|\uf468\uf3fb\u200d\u2695\ufe0f|\uf468\uf3fc\u200d\u2695\ufe0f|\uf468\uf3fd\u200d\u2695\ufe0f|\uf468\uf3fe\u200d\u2695\ufe0f|\uf468\uf3ff\u200d\u2695\ufe0f|\uf469\uf3fb\u200d\u2695\ufe0f|\uf469\uf3fc\u200d\u2695\ufe0f|\uf469\uf3fd\u200d\u2695\ufe0f|\uf469\uf3fe\u200d\u2695\ufe0f|\uf469\uf3ff\u200d\u2695\ufe0f|\uf468\uf3fb\u200d\u2696\ufe0f|\uf468\uf3fc\u200d\u2696\ufe0f|\uf468\uf3fd\u200d\u2696\ufe0f|\uf468\uf3fe\u200d\u2696\ufe0f|\uf468\uf3ff\u200d\u2696\ufe0f|\uf469\uf3fb\u200d\u2696\ufe0f|\uf469\uf3fc\u200d\u2696\ufe0f|\uf469\uf3fd\u200d\u2696\ufe0f|\uf469\uf3fe\u200d\u2696\ufe0f|\uf469\uf3ff\u200d\u2696\ufe0f|\uf468\uf3fb\u200d\u2708\ufe0f|\uf468\uf3fc\u200d\u2708\ufe0f|\uf468\uf3fd\u200d\u2708\ufe0f|\uf468\uf3fe\u200d\u2708\ufe0f|\uf468\uf3ff\u200d\u2708\ufe0f|\uf469\uf3fb\u200d\u2708\ufe0f|\uf469\uf3fc\u200d\u2708\ufe0f|\uf469\uf3fd\u200d\u2708\ufe0f|\uf469\uf3fe\u200d\u2708\ufe0f|\uf469\uf3ff\u200d\u2708\ufe0f|\uf46e\uf3fb\u200d\u2642\ufe0f|\uf46e\uf3fc\u200d\u2642\ufe0f|\uf46e\uf3fd\u200d\u2642\ufe0f|\uf46e\uf3fe\u200d\u2642\ufe0f|\uf46e\uf3ff\u200d\u2642\ufe0f|\uf46e\uf3fb\u200d\u2640\ufe0f|\uf46e\uf3fc\u200d\u2640\ufe0f|\uf46e\uf3fd\u200d\u2640\ufe0f|\uf46e\uf3fe\u200d\u2640\ufe0f|\uf46e\uf3ff\u200d\u2640\ufe0f|\uf575\ufe0f\u200d\u2642\ufe0f|\uf575\uf3fb\u200d\u2642\ufe0f|\uf575\uf3fc\u200d\u2642\ufe0f|\uf575\uf3fd\u200d\u2642\ufe0f|\uf575\uf3fe\u200d\u2642\ufe0f|\uf575\uf3ff\u200d\u2642\ufe0f|\uf575\ufe0f\u200d\u2640\ufe0f|\uf575\uf3fb\u200d\u2640\ufe0f|\uf575\uf3fc\u200d\u2640\ufe0f|\uf575\uf3fd\u200d\u2640\ufe0f|\uf575\uf3fe\u200d\u2640\ufe0f|\uf575\uf3ff\u200d\u2640\ufe0f|\uf482\uf3fb\u200d\u2642\ufe0f|\uf482\uf3fc\u200d\u2642\ufe0f|\uf482\uf3fd\u200d\u2642\ufe0f|\uf482\uf3fe\u200d\u2642\ufe0f|\uf482\uf3ff\u200d\u2642\ufe0f|\uf482\uf3fb\u200d\u2640\ufe0f|\uf482\uf3fc\u200d\u2640\ufe0f|\uf482\uf3fd\u200d\u2640\ufe0f|\uf482\uf3fe\u200d\u2640\ufe0f|\uf482\uf3ff\u200d\u2640\ufe0f|\uf477\uf3fb\u200d\u2642\ufe0f|\uf477\uf3fc\u200d\u2642\ufe0f|\uf477\uf3fd\u200d\u2642\ufe0f|\uf477\uf3fe\u200d\u2642\ufe0f|\uf477\uf3ff\u200d\u2642\ufe0f|\uf477\uf3fb\u200d\u2640\ufe0f|\uf477\uf3fc\u200d\u2640\ufe0f|\uf477\uf3fd\u200d\u2640\ufe0f|\uf477\uf3fe\u200d\u2640\ufe0f|\uf477\uf3ff\u200d\u2640\ufe0f|\uf473\uf3fb\u200d\u2642\ufe0f|\uf473\uf3fc\u200d\u2642\ufe0f|\uf473\uf3fd\u200d\u2642\ufe0f|\uf473\uf3fe\u200d\u2642\ufe0f|\uf473\uf3ff\u200d\u2642\ufe0f|\uf473\uf3fb\u200d\u2640\ufe0f|\uf473\uf3fc\u200d\u2640\ufe0f|\uf473\uf3fd\u200d\u2640\ufe0f|\uf473\uf3fe\u200d\u2640\ufe0f|\uf473\uf3ff\u200d\u2640\ufe0f|\uf471\uf3fb\u200d\u2642\ufe0f|\uf471\uf3fc\u200d\u2642\ufe0f|\uf471\uf3fd\u200d\u2642\ufe0f|\uf471\uf3fe\u200d\u2642\ufe0f|\uf471\uf3ff\u200d\u2642\ufe0f|\uf471\uf3fb\u200d\u2640\ufe0f|\uf471\uf3fc\u200d\u2640\ufe0f|\uf471\uf3fd\u200d\u2640\ufe0f|\uf471\uf3fe\u200d\u2640\ufe0f|\uf471\uf3ff\u200d\u2640\ufe0f|\uf9d9\uf3fb\u200d\u2640\ufe0f|\uf9d9\uf3fc\u200d\u2640\ufe0f|\uf9d9\uf3fd\u200d\u2640\ufe0f|\uf9d9\uf3fe\u200d\u2640\ufe0f|\uf9d9\uf3ff\u200d\u2640\ufe0f|\uf9d9\uf3fb\u200d\u2642\ufe0f|\uf9d9\uf3fc\u200d\u2642\ufe0f|\uf9d9\uf3fd\u200d\u2642\ufe0f|\uf9d9\uf3fe\u200d\u2642\ufe0f|\uf9d9\uf3ff\u200d\u2642\ufe0f|\uf9da\uf3fb\u200d\u2640\ufe0f|\uf9da\uf3fc\u200d\u2640\ufe0f|\uf9da\uf3fd\u200d\u2640\ufe0f|\uf9da\uf3fe\u200d\u2640\ufe0f|\uf9da\uf3ff\u200d\u2640\ufe0f|\uf9da\uf3fb\u200d\u2642\ufe0f|\uf9da\uf3fc\u200d\u2642\ufe0f|\uf9da\uf3fd\u200d\u2642\ufe0f|\uf9da\uf3fe\u200d\u2642\ufe0f|\uf9da\uf3ff\u200d\u2642\ufe0f|\uf9db\uf3fb\u200d\u2640\ufe0f|\uf9db\uf3fc\u200d\u2640\ufe0f|\uf9db\uf3fd\u200d\u2640\ufe0f|\uf9db\uf3fe\u200d\u2640\ufe0f|\uf9db\uf3ff\u200d\u2640\ufe0f|\uf9db\uf3fb\u200d\u2642\ufe0f|\uf9db\uf3fc\u200d\u2642\ufe0f|\uf9db\uf3fd\u200d\u2642\ufe0f|\uf9db\uf3fe\u200d\u2642\ufe0f|\uf9db\uf3ff\u200d\u2642\ufe0f|\uf9dc\uf3fb\u200d\u2640\ufe0f|\uf9dc\uf3fc\u200d\u2640\ufe0f|\uf9dc\uf3fd\u200d\u2640\ufe0f|\uf9dc\uf3fe\u200d\u2640\ufe0f|\uf9dc\uf3ff\u200d\u2640\ufe0f|\uf9dc\uf3fb\u200d\u2642\ufe0f|\uf9dc\uf3fc\u200d\u2642\ufe0f|\uf9dc\uf3fd\u200d\u2642\ufe0f|\uf9dc\uf3fe\u200d\u2642\ufe0f|\uf9dc\uf3ff\u200d\u2642\ufe0f|\uf9dd\uf3fb\u200d\u2640\ufe0f|\uf9dd\uf3fc\u200d\u2640\ufe0f|\uf9dd\uf3fd\u200d\u2640\ufe0f|\uf9dd\uf3fe\u200d\u2640\ufe0f|\uf9dd\uf3ff\u200d\u2640\ufe0f|\uf9dd\uf3fb\u200d\u2642\ufe0f|\uf9dd\uf3fc\u200d\u2642\ufe0f|\uf9dd\uf3fd\u200d\u2642\ufe0f|\uf9dd\uf3fe\u200d\u2642\ufe0f|\uf9dd\uf3ff\u200d\u2642\ufe0f|\uf64d\uf3fb\u200d\u2642\ufe0f|\uf64d\uf3fc\u200d\u2642\ufe0f|\uf64d\uf3fd\u200d\u2642\ufe0f|\uf64d\uf3fe\u200d\u2642\ufe0f|\uf64d\uf3ff\u200d\u2642\ufe0f|\uf64d\uf3fb\u200d\u2640\ufe0f|\uf64d\uf3fc\u200d\u2640\ufe0f|\uf64d\uf3fd\u200d\u2640\ufe0f|\uf64d\uf3fe\u200d\u2640\ufe0f|\uf64d\uf3ff\u200d\u2640\ufe0f|\uf64e\uf3fb\u200d\u2642\ufe0f|\uf64e\uf3fc\u200d\u2642\ufe0f|\uf64e\uf3fd\u200d\u2642\ufe0f|\uf64e\uf3fe\u200d\u2642\ufe0f|\uf64e\uf3ff\u200d\u2642\ufe0f|\uf64e\uf3fb\u200d\u2640\ufe0f|\uf64e\uf3fc\u200d\u2640\ufe0f|\uf64e\uf3fd\u200d\u2640\ufe0f|\uf64e\uf3fe\u200d\u2640\ufe0f|\uf64e\uf3ff\u200d\u2640\ufe0f|\uf645\uf3fb\u200d\u2642\ufe0f|\uf645\uf3fc\u200d\u2642\ufe0f|\uf645\uf3fd\u200d\u2642\ufe0f|\uf645\uf3fe\u200d\u2642\ufe0f|\uf645\uf3ff\u200d\u2642\ufe0f|\uf645\uf3fb\u200d\u2640\ufe0f|\uf645\uf3fc\u200d\u2640\ufe0f|\uf645\uf3fd\u200d\u2640\ufe0f|\uf645\uf3fe\u200d\u2640\ufe0f|\uf645\uf3ff\u200d\u2640\ufe0f|\uf646\uf3fb\u200d\u2642\ufe0f|\uf646\uf3fc\u200d\u2642\ufe0f|\uf646\uf3fd\u200d\u2642\ufe0f|\uf646\uf3fe\u200d\u2642\ufe0f|\uf646\uf3ff\u200d\u2642\ufe0f|\uf646\uf3fb\u200d\u2640\ufe0f|\uf646\uf3fc\u200d\u2640\ufe0f|\uf646\uf3fd\u200d\u2640\ufe0f|\uf646\uf3fe\u200d\u2640\ufe0f|\uf646\uf3ff\u200d\u2640\ufe0f|\uf481\uf3fb\u200d\u2642\ufe0f|\uf481\uf3fc\u200d\u2642\ufe0f|\uf481\uf3fd\u200d\u2642\ufe0f|\uf481\uf3fe\u200d\u2642\ufe0f|\uf481\uf3ff\u200d\u2642\ufe0f|\uf481\uf3fb\u200d\u2640\ufe0f|\uf481\uf3fc\u200d\u2640\ufe0f|\uf481\uf3fd\u200d\u2640\ufe0f|\uf481\uf3fe\u200d\u2640\ufe0f|\uf481\uf3ff\u200d\u2640\ufe0f|\uf64b\uf3fb\u200d\u2642\ufe0f|\uf64b\uf3fc\u200d\u2642\ufe0f|\uf64b\uf3fd\u200d\u2642\ufe0f|\uf64b\uf3fe\u200d\u2642\ufe0f|\uf64b\uf3ff\u200d\u2642\ufe0f|\uf64b\uf3fb\u200d\u2640\ufe0f|\uf64b\uf3fc\u200d\u2640\ufe0f|\uf64b\uf3fd\u200d\u2640\ufe0f|\uf64b\uf3fe\u200d\u2640\ufe0f|\uf64b\uf3ff\u200d\u2640\ufe0f|\uf647\uf3fb\u200d\u2642\ufe0f|\uf647\uf3fc\u200d\u2642\ufe0f|\uf647\uf3fd\u200d\u2642\ufe0f|\uf647\uf3fe\u200d\u2642\ufe0f|\uf647\uf3ff\u200d\u2642\ufe0f|\uf647\uf3fb\u200d\u2640\ufe0f|\uf647\uf3fc\u200d\u2640\ufe0f|\uf647\uf3fd\u200d\u2640\ufe0f|\uf647\uf3fe\u200d\u2640\ufe0f|\uf647\uf3ff\u200d\u2640\ufe0f|\uf926\uf3fb\u200d\u2642\ufe0f|\uf926\uf3fc\u200d\u2642\ufe0f|\uf926\uf3fd\u200d\u2642\ufe0f|\uf926\uf3fe\u200d\u2642\ufe0f|\uf926\uf3ff\u200d\u2642\ufe0f|\uf926\uf3fb\u200d\u2640\ufe0f|\uf926\uf3fc\u200d\u2640\ufe0f|\uf926\uf3fd\u200d\u2640\ufe0f|\uf926\uf3fe\u200d\u2640\ufe0f|\uf926\uf3ff\u200d\u2640\ufe0f|\uf937\uf3fb\u200d\u2642\ufe0f|\uf937\uf3fc\u200d\u2642\ufe0f|\uf937\uf3fd\u200d\u2642\ufe0f|\uf937\uf3fe\u200d\u2642\ufe0f|\uf937\uf3ff\u200d\u2642\ufe0f|\uf937\uf3fb\u200d\u2640\ufe0f|\uf937\uf3fc\u200d\u2640\ufe0f|\uf937\uf3fd\u200d\u2640\ufe0f|\uf937\uf3fe\u200d\u2640\ufe0f|\uf937\uf3ff\u200d\u2640\ufe0f|\uf486\uf3fb\u200d\u2642\ufe0f|\uf486\uf3fc\u200d\u2642\ufe0f|\uf486\uf3fd\u200d\u2642\ufe0f|\uf486\uf3fe\u200d\u2642\ufe0f|\uf486\uf3ff\u200d\u2642\ufe0f|\uf486\uf3fb\u200d\u2640\ufe0f|\uf486\uf3fc\u200d\u2640\ufe0f|\uf486\uf3fd\u200d\u2640\ufe0f|\uf486\uf3fe\u200d\u2640\ufe0f|\uf486\uf3ff\u200d\u2640\ufe0f|\uf487\uf3fb\u200d\u2642\ufe0f|\uf487\uf3fc\u200d\u2642\ufe0f|\uf487\uf3fd\u200d\u2642\ufe0f|\uf487\uf3fe\u200d\u2642\ufe0f|\uf487\uf3ff\u200d\u2642\ufe0f|\uf487\uf3fb\u200d\u2640\ufe0f|\uf487\uf3fc\u200d\u2640\ufe0f|\uf487\uf3fd\u200d\u2640\ufe0f|\uf487\uf3fe\u200d\u2640\ufe0f|\uf487\uf3ff\u200d\u2640\ufe0f|\uf6b6\uf3fb\u200d\u2642\ufe0f|\uf6b6\uf3fc\u200d\u2642\ufe0f|\uf6b6\uf3fd\u200d\u2642\ufe0f|\uf6b6\uf3fe\u200d\u2642\ufe0f|\uf6b6\uf3ff\u200d\u2642\ufe0f|\uf6b6\uf3fb\u200d\u2640\ufe0f|\uf6b6\uf3fc\u200d\u2640\ufe0f|\uf6b6\uf3fd\u200d\u2640\ufe0f|\uf6b6\uf3fe\u200d\u2640\ufe0f|\uf6b6\uf3ff\u200d\u2640\ufe0f|\uf3c3\uf3fb\u200d\u2642\ufe0f|\uf3c3\uf3fc\u200d\u2642\ufe0f|\uf3c3\uf3fd\u200d\u2642\ufe0f|\uf3c3\uf3fe\u200d\u2642\ufe0f|\uf3c3\uf3ff\u200d\u2642\ufe0f|\uf3c3\uf3fb\u200d\u2640\ufe0f|\uf3c3\uf3fc\u200d\u2640\ufe0f|\uf3c3\uf3fd\u200d\u2640\ufe0f|\uf3c3\uf3fe\u200d\u2640\ufe0f|\uf3c3\uf3ff\u200d\u2640\ufe0f|\uf9d6\uf3fb\u200d\u2640\ufe0f|\uf9d6\uf3fc\u200d\u2640\ufe0f|\uf9d6\uf3fd\u200d\u2640\ufe0f|\uf9d6\uf3fe\u200d\u2640\ufe0f|\uf9d6\uf3ff\u200d\u2640\ufe0f|\uf9d6\uf3fb\u200d\u2642\ufe0f|\uf9d6\uf3fc\u200d\u2642\ufe0f|\uf9d6\uf3fd\u200d\u2642\ufe0f|\uf9d6\uf3fe\u200d\u2642\ufe0f|\uf9d6\uf3ff\u200d\u2642\ufe0f|\uf9d7\uf3fb\u200d\u2640\ufe0f|\uf9d7\uf3fc\u200d\u2640\ufe0f|\uf9d7\uf3fd\u200d\u2640\ufe0f|\uf9d7\uf3fe\u200d\u2640\ufe0f|\uf9d7\uf3ff\u200d\u2640\ufe0f|\uf9d7\uf3fb\u200d\u2642\ufe0f|\uf9d7\uf3fc\u200d\u2642\ufe0f|\uf9d7\uf3fd\u200d\u2642\ufe0f|\uf9d7\uf3fe\u200d\u2642\ufe0f|\uf9d7\uf3ff\u200d\u2642\ufe0f|\uf9d8\uf3fb\u200d\u2640\ufe0f|\uf9d8\uf3fc\u200d\u2640\ufe0f|\uf9d8\uf3fd\u200d\u2640\ufe0f|\uf9d8\uf3fe\u200d\u2640\ufe0f|\uf9d8\uf3ff\u200d\u2640\ufe0f|\uf9d8\uf3fb\u200d\u2642\ufe0f|\uf9d8\uf3fc\u200d\u2642\ufe0f|\uf9d8\uf3fd\u200d\u2642\ufe0f|\uf9d8\uf3fe\u200d\u2642\ufe0f|\uf9d8\uf3ff\u200d\u2642\ufe0f|\uf3cc\ufe0f\u200d\u2642\ufe0f|\uf3cc\uf3fb\u200d\u2642\ufe0f|\uf3cc\uf3fc\u200d\u2642\ufe0f|\uf3cc\uf3fd\u200d\u2642\ufe0f|\uf3cc\uf3fe\u200d\u2642\ufe0f|\uf3cc\uf3ff\u200d\u2642\ufe0f|\uf3cc\ufe0f\u200d\u2640\ufe0f|\uf3cc\uf3fb\u200d\u2640\ufe0f|\uf3cc\uf3fc\u200d\u2640\ufe0f|\uf3cc\uf3fd\u200d\u2640\ufe0f|\uf3cc\uf3fe\u200d\u2640\ufe0f|\uf3cc\uf3ff\u200d\u2640\ufe0f|\uf3c4\uf3fb\u200d\u2642\ufe0f|\uf3c4\uf3fc\u200d\u2642\ufe0f|\uf3c4\uf3fd\u200d\u2642\ufe0f|\uf3c4\uf3fe\u200d\u2642\ufe0f|\uf3c4\uf3ff\u200d\u2642\ufe0f|\uf3c4\uf3fb\u200d\u2640\ufe0f|\uf3c4\uf3fc\u200d\u2640\ufe0f|\uf3c4\uf3fd\u200d\u2640\ufe0f|\uf3c4\uf3fe\u200d\u2640\ufe0f|\uf3c4\uf3ff\u200d\u2640\ufe0f|\uf6a3\uf3fb\u200d\u2642\ufe0f|\uf6a3\uf3fc\u200d\u2642\ufe0f|\uf6a3\uf3fd\u200d\u2642\ufe0f|\uf6a3\uf3fe\u200d\u2642\ufe0f|\uf6a3\uf3ff\u200d\u2642\ufe0f|\uf6a3\uf3fb\u200d\u2640\ufe0f|\uf6a3\uf3fc\u200d\u2640\ufe0f|\uf6a3\uf3fd\u200d\u2640\ufe0f|\uf6a3\uf3fe\u200d\u2640\ufe0f|\uf6a3\uf3ff\u200d\u2640\ufe0f|\uf3ca\uf3fb\u200d\u2642\ufe0f|\uf3ca\uf3fc\u200d\u2642\ufe0f|\uf3ca\uf3fd\u200d\u2642\ufe0f|\uf3ca\uf3fe\u200d\u2642\ufe0f|\uf3ca\uf3ff\u200d\u2642\ufe0f|\uf3ca\uf3fb\u200d\u2640\ufe0f|\uf3ca\uf3fc\u200d\u2640\ufe0f|\uf3ca\uf3fd\u200d\u2640\ufe0f|\uf3ca\uf3fe\u200d\u2640\ufe0f|\uf3ca\uf3ff\u200d\u2640\ufe0f|\u26f9\ufe0f\u200d\u2642\ufe0f|\u26f9\uf3fb\u200d\u2642\ufe0f|\u26f9\uf3fc\u200d\u2642\ufe0f|\u26f9\uf3fd\u200d\u2642\ufe0f|\u26f9\uf3fe\u200d\u2642\ufe0f|\u26f9\uf3ff\u200d\u2642\ufe0f|\u26f9\ufe0f\u200d\u2640\ufe0f|\u26f9\uf3fb\u200d\u2640\ufe0f|\u26f9\uf3fc\u200d\u2640\ufe0f|\u26f9\uf3fd\u200d\u2640\ufe0f|\u26f9\uf3fe\u200d\u2640\ufe0f|\u26f9\uf3ff\u200d\u2640\ufe0f|\uf3cb\ufe0f\u200d\u2642\ufe0f|\uf3cb\uf3fb\u200d\u2642\ufe0f|\uf3cb\uf3fc\u200d\u2642\ufe0f|\uf3cb\uf3fd\u200d\u2642\ufe0f|\uf3cb\uf3fe\u200d\u2642\ufe0f|\uf3cb\uf3ff\u200d\u2642\ufe0f|\uf3cb\ufe0f\u200d\u2640\ufe0f|\uf3cb\uf3fb\u200d\u2640\ufe0f|\uf3cb\uf3fc\u200d\u2640\ufe0f|\uf3cb\uf3fd\u200d\u2640\ufe0f|\uf3cb\uf3fe\u200d\u2640\ufe0f|\uf3cb\uf3ff\u200d\u2640\ufe0f|\uf6b4\uf3fb\u200d\u2642\ufe0f|\uf6b4\uf3fc\u200d\u2642\ufe0f|\uf6b4\uf3fd\u200d\u2642\ufe0f|\uf6b4\uf3fe\u200d\u2642\ufe0f|\uf6b4\uf3ff\u200d\u2642\ufe0f|\uf6b4\uf3fb\u200d\u2640\ufe0f|\uf6b4\uf3fc\u200d\u2640\ufe0f|\uf6b4\uf3fd\u200d\u2640\ufe0f|\uf6b4\uf3fe\u200d\u2640\ufe0f|\uf6b4\uf3ff\u200d\u2640\ufe0f|\uf6b5\uf3fb\u200d\u2642\ufe0f|\uf6b5\uf3fc\u200d\u2642\ufe0f|\uf6b5\uf3fd\u200d\u2642\ufe0f|\uf6b5\uf3fe\u200d\u2642\ufe0f|\uf6b5\uf3ff\u200d\u2642\ufe0f|\uf6b5\uf3fb\u200d\u2640\ufe0f|\uf6b5\uf3fc\u200d\u2640\ufe0f|\uf6b5\uf3fd\u200d\u2640\ufe0f|\uf6b5\uf3fe\u200d\u2640\ufe0f|\uf6b5\uf3ff\u200d\u2640\ufe0f|\uf938\uf3fb\u200d\u2642\ufe0f|\uf938\uf3fc\u200d\u2642\ufe0f|\uf938\uf3fd\u200d\u2642\ufe0f|\uf938\uf3fe\u200d\u2642\ufe0f|\uf938\uf3ff\u200d\u2642\ufe0f|\uf938\uf3fb\u200d\u2640\ufe0f|\uf938\uf3fc\u200d\u2640\ufe0f|\uf938\uf3fd\u200d\u2640\ufe0f|\uf938\uf3fe\u200d\u2640\ufe0f|\uf938\uf3ff\u200d\u2640\ufe0f|\uf93d\uf3fb\u200d\u2642\ufe0f|\uf93d\uf3fc\u200d\u2642\ufe0f|\uf93d\uf3fd\u200d\u2642\ufe0f|\uf93d\uf3fe\u200d\u2642\ufe0f|\uf93d\uf3ff\u200d\u2642\ufe0f|\uf93d\uf3fb\u200d\u2640\ufe0f|\uf93d\uf3fc\u200d\u2640\ufe0f|\uf93d\uf3fd\u200d\u2640\ufe0f|\uf93d\uf3fe\u200d\u2640\ufe0f|\uf93d\uf3ff\u200d\u2640\ufe0f|\uf93e\uf3fb\u200d\u2642\ufe0f|\uf93e\uf3fc\u200d\u2642\ufe0f|\uf93e\uf3fd\u200d\u2642\ufe0f|\uf93e\uf3fe\u200d\u2642\ufe0f|\uf93e\uf3ff\u200d\u2642\ufe0f|\uf93e\uf3fb\u200d\u2640\ufe0f|\uf93e\uf3fc\u200d\u2640\ufe0f|\uf93e\uf3fd\u200d\u2640\ufe0f|\uf93e\uf3fe\u200d\u2640\ufe0f|\uf93e\uf3ff\u200d\u2640\ufe0f|\uf939\uf3fb\u200d\u2642\ufe0f|\uf939\uf3fc\u200d\u2642\ufe0f|\uf939\uf3fd\u200d\u2642\ufe0f|\uf939\uf3fe\u200d\u2642\ufe0f|\uf939\uf3ff\u200d\u2642\ufe0f|\uf939\uf3fb\u200d\u2640\ufe0f|\uf939\uf3fc\u200d\u2640\ufe0f|\uf939\uf3fd\u200d\u2640\ufe0f|\uf939\uf3fe\u200d\u2640\ufe0f|\uf939\uf3ff\u200d\u2640\ufe0f|\uf468\u200d\uf469\u200d\uf466|\uf468\u200d\uf469\u200d\uf467|\uf468\u200d\uf468\u200d\uf466|\uf468\u200d\uf468\u200d\uf467|\uf469\u200d\uf469\u200d\uf466|\uf469\u200d\uf469\u200d\uf467|\uf468\u200d\uf466\u200d\uf466|\uf468\u200d\uf467\u200d\uf466|\uf468\u200d\uf467\u200d\uf467|\uf469\u200d\uf466\u200d\uf466|\uf469\u200d\uf467\u200d\uf466|\uf469\u200d\uf467\u200d\uf467|\uf441\ufe0f\u200d\uf5e8\ufe0f|\uf468\u200d\u2695\ufe0f|\uf469\u200d\u2695\ufe0f|\uf468\uf3fb\u200d\uf393|\uf468\uf3fc\u200d\uf393|\uf468\uf3fd\u200d\uf393|\uf468\uf3fe\u200d\uf393|\uf468\uf3ff\u200d\uf393|\uf469\uf3fb\u200d\uf393|\uf469\uf3fc\u200d\uf393|\uf469\uf3fd\u200d\uf393|\uf469\uf3fe\u200d\uf393|\uf469\uf3ff\u200d\uf393|\uf468\uf3fb\u200d\uf3eb|\uf468\uf3fc\u200d\uf3eb|\uf468\uf3fd\u200d\uf3eb|\uf468\uf3fe\u200d\uf3eb|\uf468\uf3ff\u200d\uf3eb|\uf469\uf3fb\u200d\uf3eb|\uf469\uf3fc\u200d\uf3eb|\uf469\uf3fd\u200d\uf3eb|\uf469\uf3fe\u200d\uf3eb|\uf469\uf3ff\u200d\uf3eb|\uf468\u200d\u2696\ufe0f|\uf469\u200d\u2696\ufe0f|\uf468\uf3fb\u200d\uf33e|\uf468\uf3fc\u200d\uf33e|\uf468\uf3fd\u200d\uf33e|\uf468\uf3fe\u200d\uf33e|\uf468\uf3ff\u200d\uf33e|\uf469\uf3fb\u200d\uf33e|\uf469\uf3fc\u200d\uf33e|\uf469\uf3fd\u200d\uf33e|\uf469\uf3fe\u200d\uf33e|\uf469\uf3ff\u200d\uf33e|\uf468\uf3fb\u200d\uf373|\uf468\uf3fc\u200d\uf373|\uf468\uf3fd\u200d\uf373|\uf468\uf3fe\u200d\uf373|\uf468\uf3ff\u200d\uf373|\uf469\uf3fb\u200d\uf373|\uf469\uf3fc\u200d\uf373|\uf469\uf3fd\u200d\uf373|\uf469\uf3fe\u200d\uf373|\uf469\uf3ff\u200d\uf373|\uf468\uf3fb\u200d\uf527|\uf468\uf3fc\u200d\uf527|\uf468\uf3fd\u200d\uf527|\uf468\uf3fe\u200d\uf527|\uf468\uf3ff\u200d\uf527|\uf469\uf3fb\u200d\uf527|\uf469\uf3fc\u200d\uf527|\uf469\uf3fd\u200d\uf527|\uf469\uf3fe\u200d\uf527|\uf469\uf3ff\u200d\uf527|\uf468\uf3fb\u200d\uf3ed|\uf468\uf3fc\u200d\uf3ed|\uf468\uf3fd\u200d\uf3ed|\uf468\uf3fe\u200d\uf3ed|\uf468\uf3ff\u200d\uf3ed|\uf469\uf3fb\u200d\uf3ed|\uf469\uf3fc\u200d\uf3ed|\uf469\uf3fd\u200d\uf3ed|\uf469\uf3fe\u200d\uf3ed|\uf469\uf3ff\u200d\uf3ed|\uf468\uf3fb\u200d\uf4bc|\uf468\uf3fc\u200d\uf4bc|\uf468\uf3fd\u200d\uf4bc|\uf468\uf3fe\u200d\uf4bc|\uf468\uf3ff\u200d\uf4bc|\uf469\uf3fb\u200d\uf4bc|\uf469\uf3fc\u200d\uf4bc|\uf469\uf3fd\u200d\uf4bc|\uf469\uf3fe\u200d\uf4bc|\uf469\uf3ff\u200d\uf4bc|\uf468\uf3fb\u200d\uf52c|\uf468\uf3fc\u200d\uf52c|\uf468\uf3fd\u200d\uf52c|\uf468\uf3fe\u200d\uf52c|\uf468\uf3ff\u200d\uf52c|\uf469\uf3fb\u200d\uf52c|\uf469\uf3fc\u200d\uf52c|\uf469\uf3fd\u200d\uf52c|\uf469\uf3fe\u200d\uf52c|\uf469\uf3ff\u200d\uf52c|\uf468\uf3fb\u200d\uf4bb|\uf468\uf3fc\u200d\uf4bb|\uf468\uf3fd\u200d\uf4bb|\uf468\uf3fe\u200d\uf4bb|\uf468\uf3ff\u200d\uf4bb|\uf469\uf3fb\u200d\uf4bb|\uf469\uf3fc\u200d\uf4bb|\uf469\uf3fd\u200d\uf4bb|\uf469\uf3fe\u200d\uf4bb|\uf469\uf3ff\u200d\uf4bb|\uf468\uf3fb\u200d\uf3a4|\uf468\uf3fc\u200d\uf3a4|\uf468\uf3fd\u200d\uf3a4|\uf468\uf3fe\u200d\uf3a4|\uf468\uf3ff\u200d\uf3a4|\uf469\uf3fb\u200d\uf3a4|\uf469\uf3fc\u200d\uf3a4|\uf469\uf3fd\u200d\uf3a4|\uf469\uf3fe\u200d\uf3a4|\uf469\uf3ff\u200d\uf3a4|\uf468\uf3fb\u200d\uf3a8|\uf468\uf3fc\u200d\uf3a8|\uf468\uf3fd\u200d\uf3a8|\uf468\uf3fe\u200d\uf3a8|\uf468\uf3ff\u200d\uf3a8|\uf469\uf3fb\u200d\uf3a8|\uf469\uf3fc\u200d\uf3a8|\uf469\uf3fd\u200d\uf3a8|\uf469\uf3fe\u200d\uf3a8|\uf469\uf3ff\u200d\uf3a8|\uf468\u200d\u2708\ufe0f|\uf469\u200d\u2708\ufe0f|\uf468\uf3fb\u200d\uf680|\uf468\uf3fc\u200d\uf680|\uf468\uf3fd\u200d\uf680|\uf468\uf3fe\u200d\uf680|\uf468\uf3ff\u200d\uf680|\uf469\uf3fb\u200d\uf680|\uf469\uf3fc\u200d\uf680|\uf469\uf3fd\u200d\uf680|\uf469\uf3fe\u200d\uf680|\uf469\uf3ff\u200d\uf680|\uf468\uf3fb\u200d\uf692|\uf468\uf3fc\u200d\uf692|\uf468\uf3fd\u200d\uf692|\uf468\uf3fe\u200d\uf692|\uf468\uf3ff\u200d\uf692|\uf469\uf3fb\u200d\uf692|\uf469\uf3fc\u200d\uf692|\uf469\uf3fd\u200d\uf692|\uf469\uf3fe\u200d\uf692|\uf469\uf3ff\u200d\uf692|\uf46e\u200d\u2642\ufe0f|\uf46e\u200d\u2640\ufe0f|\uf482\u200d\u2642\ufe0f|\uf482\u200d\u2640\ufe0f|\uf477\u200d\u2642\ufe0f|\uf477\u200d\u2640\ufe0f|\uf473\u200d\u2642\ufe0f|\uf473\u200d\u2640\ufe0f|\uf471\u200d\u2642\ufe0f|\uf471\u200d\u2640\ufe0f|\uf9d9\u200d\u2640\ufe0f|\uf9d9\u200d\u2642\ufe0f|\uf9da\u200d\u2640\ufe0f|\uf9da\u200d\u2642\ufe0f|\uf9db\u200d\u2640\ufe0f|\uf9db\u200d\u2642\ufe0f|\uf9dc\u200d\u2640\ufe0f|\uf9dc\u200d\u2642\ufe0f|\uf9dd\u200d\u2640\ufe0f|\uf9dd\u200d\u2642\ufe0f|\uf9de\u200d\u2640\ufe0f|\uf9de\u200d\u2642\ufe0f|\uf9df\u200d\u2640\ufe0f|\uf9df\u200d\u2642\ufe0f|\uf64d\u200d\u2642\ufe0f|\uf64d\u200d\u2640\ufe0f|\uf64e\u200d\u2642\ufe0f|\uf64e\u200d\u2640\ufe0f|\uf645\u200d\u2642\ufe0f|\uf645\u200d\u2640\ufe0f|\uf646\u200d\u2642\ufe0f|\uf646\u200d\u2640\ufe0f|\uf481\u200d\u2642\ufe0f|\uf481\u200d\u2640\ufe0f|\uf64b\u200d\u2642\ufe0f|\uf64b\u200d\u2640\ufe0f|\uf647\u200d\u2642\ufe0f|\uf647\u200d\u2640\ufe0f|\uf926\u200d\u2642\ufe0f|\uf926\u200d\u2640\ufe0f|\uf937\u200d\u2642\ufe0f|\uf937\u200d\u2640\ufe0f|\uf486\u200d\u2642\ufe0f|\uf486\u200d\u2640\ufe0f|\uf487\u200d\u2642\ufe0f|\uf487\u200d\u2640\ufe0f|\uf6b6\u200d\u2642\ufe0f|\uf6b6\u200d\u2640\ufe0f|\uf3c3\u200d\u2642\ufe0f|\uf3c3\u200d\u2640\ufe0f|\uf46f\u200d\u2642\ufe0f|\uf46f\u200d\u2640\ufe0f|\uf9d6\u200d\u2640\ufe0f|\uf9d6\u200d\u2642\ufe0f|\uf9d7\u200d\u2640\ufe0f|\uf9d7\u200d\u2642\ufe0f|\uf9d8\u200d\u2640\ufe0f|\uf9d8\u200d\u2642\ufe0f|\uf3c4\u200d\u2642\ufe0f|\uf3c4\u200d\u2640\ufe0f|\uf6a3\u200d\u2642\ufe0f|\uf6a3\u200d\u2640\ufe0f|\uf3ca\u200d\u2642\ufe0f|\uf3ca\u200d\u2640\ufe0f|\uf6b4\u200d\u2642\ufe0f|\uf6b4\u200d\u2640\ufe0f|\uf6b5\u200d\u2642\ufe0f|\uf6b5\u200d\u2640\ufe0f|\uf938\u200d\u2642\ufe0f|\uf938\u200d\u2640\ufe0f|\uf93c\u200d\u2642\ufe0f|\uf93c\u200d\u2640\ufe0f|\uf93d\u200d\u2642\ufe0f|\uf93d\u200d\u2640\ufe0f|\uf93e\u200d\u2642\ufe0f|\uf93e\u200d\u2640\ufe0f|\uf939\u200d\u2642\ufe0f|\uf939\u200d\u2640\ufe0f|\uf3f3\ufe0f\u200d\uf308|\uf468\u200d\uf393|\uf469\u200d\uf393|\uf468\u200d\uf3eb|\uf469\u200d\uf3eb|\uf468\u200d\uf33e|\uf469\u200d\uf33e|\uf468\u200d\uf373|\uf469\u200d\uf373|\uf468\u200d\uf527|\uf469\u200d\uf527|\uf468\u200d\uf3ed|\uf469\u200d\uf3ed|\uf468\u200d\uf4bc|\uf469\u200d\uf4bc|\uf468\u200d\uf52c|\uf469\u200d\uf52c|\uf468\u200d\uf4bb|\uf469\u200d\uf4bb|\uf468\u200d\uf3a4|\uf469\u200d\uf3a4|\uf468\u200d\uf3a8|\uf469\u200d\uf3a8|\uf468\u200d\uf680|\uf469\u200d\uf680|\uf468\u200d\uf692|\uf469\u200d\uf692|\uf468\u200d\uf466|\uf468\u200d\uf467|\uf469\u200d\uf466|\uf469\u200d\uf467|\u0023\ufe0f\u20e3|\u002a\ufe0f\u20e3|\u0030\ufe0f\u20e3|\u0031\ufe0f\u20e3|\u0032\ufe0f\u20e3|\u0033\ufe0f\u20e3|\u0034\ufe0f\u20e3|\u0035\ufe0f\u20e3|\u0036\ufe0f\u20e3|\u0037\ufe0f\u20e3|\u0038\ufe0f\u20e3|\u0039\ufe0f\u20e3|\uf476\uf3fb|\uf476\uf3fc|\uf476\uf3fd|\uf476\uf3fe|\uf476\uf3ff|\uf9d2\uf3fb|\uf9d2\uf3fc|\uf9d2\uf3fd|\uf9d2\uf3fe|\uf9d2\uf3ff|\uf466\uf3fb|\uf466\uf3fc|\uf466\uf3fd|\uf466\uf3fe|\uf466\uf3ff|\uf467\uf3fb|\uf467\uf3fc|\uf467\uf3fd|\uf467\uf3fe|\uf467\uf3ff|\uf9d1\uf3fb|\uf9d1\uf3fc|\uf9d1\uf3fd|\uf9d1\uf3fe|\uf9d1\uf3ff|\uf468\uf3fb|\uf468\uf3fc|\uf468\uf3fd|\uf468\uf3fe|\uf468\uf3ff|\uf469\uf3fb|\uf469\uf3fc|\uf469\uf3fd|\uf469\uf3fe|\uf469\uf3ff|\uf9d3\uf3fb|\uf9d3\uf3fc|\uf9d3\uf3fd|\uf9d3\uf3fe|\uf9d3\uf3ff|\uf474\uf3fb|\uf474\uf3fc|\uf474\uf3fd|\uf474\uf3fe|\uf474\uf3ff|\uf475\uf3fb|\uf475\uf3fc|\uf475\uf3fd|\uf475\uf3fe|\uf475\uf3ff|\uf46e\uf3fb|\uf46e\uf3fc|\uf46e\uf3fd|\uf46e\uf3fe|\uf46e\uf3ff|\uf575\uf3fb|\uf575\uf3fc|\uf575\uf3fd|\uf575\uf3fe|\uf575\uf3ff|\uf482\uf3fb|\uf482\uf3fc|\uf482\uf3fd|\uf482\uf3fe|\uf482\uf3ff|\uf477\uf3fb|\uf477\uf3fc|\uf477\uf3fd|\uf477\uf3fe|\uf477\uf3ff|\uf934\uf3fb|\uf934\uf3fc|\uf934\uf3fd|\uf934\uf3fe|\uf934\uf3ff|\uf478\uf3fb|\uf478\uf3fc|\uf478\uf3fd|\uf478\uf3fe|\uf478\uf3ff|\uf473\uf3fb|\uf473\uf3fc|\uf473\uf3fd|\uf473\uf3fe|\uf473\uf3ff|\uf472\uf3fb|\uf472\uf3fc|\uf472\uf3fd|\uf472\uf3fe|\uf472\uf3ff|\uf9d5\uf3fb|\uf9d5\uf3fc|\uf9d5\uf3fd|\uf9d5\uf3fe|\uf9d5\uf3ff|\uf9d4\uf3fb|\uf9d4\uf3fc|\uf9d4\uf3fd|\uf9d4\uf3fe|\uf9d4\uf3ff|\uf471\uf3fb|\uf471\uf3fc|\uf471\uf3fd|\uf471\uf3fe|\uf471\uf3ff|\uf935\uf3fb|\uf935\uf3fc|\uf935\uf3fd|\uf935\uf3fe|\uf935\uf3ff|\uf470\uf3fb|\uf470\uf3fc|\uf470\uf3fd|\uf470\uf3fe|\uf470\uf3ff|\uf930\uf3fb|\uf930\uf3fc|\uf930\uf3fd|\uf930\uf3fe|\uf930\uf3ff|\uf931\uf3fb|\uf931\uf3fc|\uf931\uf3fd|\uf931\uf3fe|\uf931\uf3ff|\uf47c\uf3fb|\uf47c\uf3fc|\uf47c\uf3fd|\uf47c\uf3fe|\uf47c\uf3ff|\uf385\uf3fb|\uf385\uf3fc|\uf385\uf3fd|\uf385\uf3fe|\uf385\uf3ff|\uf936\uf3fb|\uf936\uf3fc|\uf936\uf3fd|\uf936\uf3fe|\uf936\uf3ff|\uf9d9\uf3fb|\uf9d9\uf3fc|\uf9d9\uf3fd|\uf9d9\uf3fe|\uf9d9\uf3ff|\uf9da\uf3fb|\uf9da\uf3fc|\uf9da\uf3fd|\uf9da\uf3fe|\uf9da\uf3ff|\uf9db\uf3fb|\uf9db\uf3fc|\uf9db\uf3fd|\uf9db\uf3fe|\uf9db\uf3ff|\uf9dc\uf3fb|\uf9dc\uf3fc|\uf9dc\uf3fd|\uf9dc\uf3fe|\uf9dc\uf3ff|\uf9dd\uf3fb|\uf9dd\uf3fc|\uf9dd\uf3fd|\uf9dd\uf3fe|\uf9dd\uf3ff|\uf64d\uf3fb|\uf64d\uf3fc|\uf64d\uf3fd|\uf64d\uf3fe|\uf64d\uf3ff|\uf64e\uf3fb|\uf64e\uf3fc|\uf64e\uf3fd|\uf64e\uf3fe|\uf64e\uf3ff|\uf645\uf3fb|\uf645\uf3fc|\uf645\uf3fd|\uf645\uf3fe|\uf645\uf3ff|\uf646\uf3fb|\uf646\uf3fc|\uf646\uf3fd|\uf646\uf3fe|\uf646\uf3ff|\uf481\uf3fb|\uf481\uf3fc|\uf481\uf3fd|\uf481\uf3fe|\uf481\uf3ff|\uf64b\uf3fb|\uf64b\uf3fc|\uf64b\uf3fd|\uf64b\uf3fe|\uf64b\uf3ff|\uf647\uf3fb|\uf647\uf3fc|\uf647\uf3fd|\uf647\uf3fe|\uf647\uf3ff|\uf926\uf3fb|\uf926\uf3fc|\uf926\uf3fd|\uf926\uf3fe|\uf926\uf3ff|\uf937\uf3fb|\uf937\uf3fc|\uf937\uf3fd|\uf937\uf3fe|\uf937\uf3ff|\uf486\uf3fb|\uf486\uf3fc|\uf486\uf3fd|\uf486\uf3fe|\uf486\uf3ff|\uf487\uf3fb|\uf487\uf3fc|\uf487\uf3fd|\uf487\uf3fe|\uf487\uf3ff|\uf6b6\uf3fb|\uf6b6\uf3fc|\uf6b6\uf3fd|\uf6b6\uf3fe|\uf6b6\uf3ff|\uf3c3\uf3fb|\uf3c3\uf3fc|\uf3c3\uf3fd|\uf3c3\uf3fe|\uf3c3\uf3ff|\uf483\uf3fb|\uf483\uf3fc|\uf483\uf3fd|\uf483\uf3fe|\uf483\uf3ff|\uf57a\uf3fb|\uf57a\uf3fc|\uf57a\uf3fd|\uf57a\uf3fe|\uf57a\uf3ff|\uf9d6\uf3fb|\uf9d6\uf3fc|\uf9d6\uf3fd|\uf9d6\uf3fe|\uf9d6\uf3ff|\uf9d7\uf3fb|\uf9d7\uf3fc|\uf9d7\uf3fd|\uf9d7\uf3fe|\uf9d7\uf3ff|\uf9d8\uf3fb|\uf9d8\uf3fc|\uf9d8\uf3fd|\uf9d8\uf3fe|\uf9d8\uf3ff|\uf6c0\uf3fb|\uf6c0\uf3fc|\uf6c0\uf3fd|\uf6c0\uf3fe|\uf6c0\uf3ff|\uf6cc\uf3fb|\uf6cc\uf3fc|\uf6cc\uf3fd|\uf6cc\uf3fe|\uf6cc\uf3ff|\uf574\uf3fb|\uf574\uf3fc|\uf574\uf3fd|\uf574\uf3fe|\uf574\uf3ff|\uf3c7\uf3fb|\uf3c7\uf3fc|\uf3c7\uf3fd|\uf3c7\uf3fe|\uf3c7\uf3ff|\uf3c2\uf3fb|\uf3c2\uf3fc|\uf3c2\uf3fd|\uf3c2\uf3fe|\uf3c2\uf3ff|\uf3cc\uf3fb|\uf3cc\uf3fc|\uf3cc\uf3fd|\uf3cc\uf3fe|\uf3cc\uf3ff|\uf3c4\uf3fb|\uf3c4\uf3fc|\uf3c4\uf3fd|\uf3c4\uf3fe|\uf3c4\uf3ff|\uf6a3\uf3fb|\uf6a3\uf3fc|\uf6a3\uf3fd|\uf6a3\uf3fe|\uf6a3\uf3ff|\uf3ca\uf3fb|\uf3ca\uf3fc|\uf3ca\uf3fd|\uf3ca\uf3fe|\uf3ca\uf3ff|\u26f9\uf3fb|\u26f9\uf3fc|\u26f9\uf3fd|\u26f9\uf3fe|\u26f9\uf3ff|\uf3cb\uf3fb|\uf3cb\uf3fc|\uf3cb\uf3fd|\uf3cb\uf3fe|\uf3cb\uf3ff|\uf6b4\uf3fb|\uf6b4\uf3fc|\uf6b4\uf3fd|\uf6b4\uf3fe|\uf6b4\uf3ff|\uf6b5\uf3fb|\uf6b5\uf3fc|\uf6b5\uf3fd|\uf6b5\uf3fe|\uf6b5\uf3ff|\uf938\uf3fb|\uf938\uf3fc|\uf938\uf3fd|\uf938\uf3fe|\uf938\uf3ff|\uf93d\uf3fb|\uf93d\uf3fc|\uf93d\uf3fd|\uf93d\uf3fe|\uf93d\uf3ff|\uf93e\uf3fb|\uf93e\uf3fc|\uf93e\uf3fd|\uf93e\uf3fe|\uf93e\uf3ff|\uf939\uf3fb|\uf939\uf3fc|\uf939\uf3fd|\uf939\uf3fe|\uf939\uf3ff|\uf933\uf3fb|\uf933\uf3fc|\uf933\uf3fd|\uf933\uf3fe|\uf933\uf3ff|\uf4aa\uf3fb|\uf4aa\uf3fc|\uf4aa\uf3fd|\uf4aa\uf3fe|\uf4aa\uf3ff|\uf448\uf3fb|\uf448\uf3fc|\uf448\uf3fd|\uf448\uf3fe|\uf448\uf3ff|\uf449\uf3fb|\uf449\uf3fc|\uf449\uf3fd|\uf449\uf3fe|\uf449\uf3ff|\u261d\uf3fb|\u261d\uf3fc|\u261d\uf3fd|\u261d\uf3fe|\u261d\uf3ff|\uf446\uf3fb|\uf446\uf3fc|\uf446\uf3fd|\uf446\uf3fe|\uf446\uf3ff|\uf595\uf3fb|\uf595\uf3fc|\uf595\uf3fd|\uf595\uf3fe|\uf595\uf3ff|\uf447\uf3fb|\uf447\uf3fc|\uf447\uf3fd|\uf447\uf3fe|\uf447\uf3ff|\u270c\uf3fb|\u270c\uf3fc|\u270c\uf3fd|\u270c\uf3fe|\u270c\uf3ff|\uf91e\uf3fb|\uf91e\uf3fc|\uf91e\uf3fd|\uf91e\uf3fe|\uf91e\uf3ff|\uf596\uf3fb|\uf596\uf3fc|\uf596\uf3fd|\uf596\uf3fe|\uf596\uf3ff|\uf918\uf3fb|\uf918\uf3fc|\uf918\uf3fd|\uf918\uf3fe|\uf918\uf3ff|\uf919\uf3fb|\uf919\uf3fc|\uf919\uf3fd|\uf919\uf3fe|\uf919\uf3ff|\uf590\uf3fb|\uf590\uf3fc|\uf590\uf3fd|\uf590\uf3fe|\uf590\uf3ff|\u270b\uf3fb|\u270b\uf3fc|\u270b\uf3fd|\u270b\uf3fe|\u270b\uf3ff|\uf44c\uf3fb|\uf44c\uf3fc|\uf44c\uf3fd|\uf44c\uf3fe|\uf44c\uf3ff|\uf44d\uf3fb|\uf44d\uf3fc|\uf44d\uf3fd|\uf44d\uf3fe|\uf44d\uf3ff|\uf44e\uf3fb|\uf44e\uf3fc|\uf44e\uf3fd|\uf44e\uf3fe|\uf44e\uf3ff|\u270a\uf3fb|\u270a\uf3fc|\u270a\uf3fd|\u270a\uf3fe|\u270a\uf3ff|\uf44a\uf3fb|\uf44a\uf3fc|\uf44a\uf3fd|\uf44a\uf3fe|\uf44a\uf3ff|\uf91b\uf3fb|\uf91b\uf3fc|\uf91b\uf3fd|\uf91b\uf3fe|\uf91b\uf3ff|\uf91c\uf3fb|\uf91c\uf3fc|\uf91c\uf3fd|\uf91c\uf3fe|\uf91c\uf3ff|\uf91a\uf3fb|\uf91a\uf3fc|\uf91a\uf3fd|\uf91a\uf3fe|\uf91a\uf3ff|\uf44b\uf3fb|\uf44b\uf3fc|\uf44b\uf3fd|\uf44b\uf3fe|\uf44b\uf3ff|\uf91f\uf3fb|\uf91f\uf3fc|\uf91f\uf3fd|\uf91f\uf3fe|\uf91f\uf3ff|\u270d\uf3fb|\u270d\uf3fc|\u270d\uf3fd|\u270d\uf3fe|\u270d\uf3ff|\uf44f\uf3fb|\uf44f\uf3fc|\uf44f\uf3fd|\uf44f\uf3fe|\uf44f\uf3ff|\uf450\uf3fb|\uf450\uf3fc|\uf450\uf3fd|\uf450\uf3fe|\uf450\uf3ff|\uf64c\uf3fb|\uf64c\uf3fc|\uf64c\uf3fd|\uf64c\uf3fe|\uf64c\uf3ff|\uf932\uf3fb|\uf932\uf3fc|\uf932\uf3fd|\uf932\uf3fe|\uf932\uf3ff|\uf64f\uf3fb|\uf64f\uf3fc|\uf64f\uf3fd|\uf64f\uf3fe|\uf64f\uf3ff|\uf485\uf3fb|\uf485\uf3fc|\uf485\uf3fd|\uf485\uf3fe|\uf485\uf3ff|\uf442\uf3fb|\uf442\uf3fc|\uf442\uf3fd|\uf442\uf3fe|\uf442\uf3ff|\uf443\uf3fb|\uf443\uf3fc|\uf443\uf3fd|\uf443\uf3fe|\uf443\uf3ff|\uf1e6\uf1e8|\uf1e6\uf1e9|\uf1e6\uf1ea|\uf1e6\uf1eb|\uf1e6\uf1ec|\uf1e6\uf1ee|\uf1e6\uf1f1|\uf1e6\uf1f2|\uf1e6\uf1f4|\uf1e6\uf1f6|\uf1e6\uf1f7|\uf1e6\uf1f8|\uf1e6\uf1f9|\uf1e6\uf1fa|\uf1e6\uf1fc|\uf1e6\uf1fd|\uf1e6\uf1ff|\uf1e7\uf1e6|\uf1e7\uf1e7|\uf1e7\uf1e9|\uf1e7\uf1ea|\uf1e7\uf1eb|\uf1e7\uf1ec|\uf1e7\uf1ed|\uf1e7\uf1ee|\uf1e7\uf1ef|\uf1e7\uf1f1|\uf1e7\uf1f2|\uf1e7\uf1f3|\uf1e7\uf1f4|\uf1e7\uf1f6|\uf1e7\uf1f7|\uf1e7\uf1f8|\uf1e7\uf1f9|\uf1e7\uf1fb|\uf1e7\uf1fc|\uf1e7\uf1fe|\uf1e7\uf1ff|\uf1e8\uf1e6|\uf1e8\uf1e8|\uf1e8\uf1e9|\uf1e8\uf1eb|\uf1e8\uf1ec|\uf1e8\uf1ed|\uf1e8\uf1ee|\uf1e8\uf1f0|\uf1e8\uf1f1|\uf1e8\uf1f2|\uf1e8\uf1f3|\uf1e8\uf1f4|\uf1e8\uf1f5|\uf1e8\uf1f7|\uf1e8\uf1fa|\uf1e8\uf1fb|\uf1e8\uf1fc|\uf1e8\uf1fd|\uf1e8\uf1fe|\uf1e8\uf1ff|\uf1e9\uf1ea|\uf1e9\uf1ec|\uf1e9\uf1ef|\uf1e9\uf1f0|\uf1e9\uf1f2|\uf1e9\uf1f4|\uf1e9\uf1ff|\uf1ea\uf1e6|\uf1ea\uf1e8|\uf1ea\uf1ea|\uf1ea\uf1ec|\uf1ea\uf1ed|\uf1ea\uf1f7|\uf1ea\uf1f8|\uf1ea\uf1f9|\uf1ea\uf1fa|\uf1eb\uf1ee|\uf1eb\uf1ef|\uf1eb\uf1f0|\uf1eb\uf1f2|\uf1eb\uf1f4|\uf1eb\uf1f7|\uf1ec\uf1e6|\uf1ec\uf1e7|\uf1ec\uf1e9|\uf1ec\uf1ea|\uf1ec\uf1eb|\uf1ec\uf1ec|\uf1ec\uf1ed|\uf1ec\uf1ee|\uf1ec\uf1f1|\uf1ec\uf1f2|\uf1ec\uf1f3|\uf1ec\uf1f5|\uf1ec\uf1f6|\uf1ec\uf1f7|\uf1ec\uf1f8|\uf1ec\uf1f9|\uf1ec\uf1fa|\uf1ec\uf1fc|\uf1ec\uf1fe|\uf1ed\uf1f0|\uf1ed\uf1f2|\uf1ed\uf1f3|\uf1ed\uf1f7|\uf1ed\uf1f9|\uf1ed\uf1fa|\uf1ee\uf1e8|\uf1ee\uf1e9|\uf1ee\uf1ea|\uf1ee\uf1f1|\uf1ee\uf1f2|\uf1ee\uf1f3|\uf1ee\uf1f4|\uf1ee\uf1f6|\uf1ee\uf1f7|\uf1ee\uf1f8|\uf1ee\uf1f9|\uf1ef\uf1ea|\uf1ef\uf1f2|\uf1ef\uf1f4|\uf1ef\uf1f5|\uf1f0\uf1ea|\uf1f0\uf1ec|\uf1f0\uf1ed|\uf1f0\uf1ee|\uf1f0\uf1f2|\uf1f0\uf1f3|\uf1f0\uf1f5|\uf1f0\uf1f7|\uf1f0\uf1fc|\uf1f0\uf1fe|\uf1f0\uf1ff|\uf1f1\uf1e6|\uf1f1\uf1e7|\uf1f1\uf1e8|\uf1f1\uf1ee|\uf1f1\uf1f0|\uf1f1\uf1f7|\uf1f1\uf1f8|\uf1f1\uf1f9|\uf1f1\uf1fa|\uf1f1\uf1fb|\uf1f1\uf1fe|\uf1f2\uf1e6|\uf1f2\uf1e8|\uf1f2\uf1e9|\uf1f2\uf1ea|\uf1f2\uf1eb|\uf1f2\uf1ec|\uf1f2\uf1ed|\uf1f2\uf1f0|\uf1f2\uf1f1|\uf1f2\uf1f2|\uf1f2\uf1f3|\uf1f2\uf1f4|\uf1f2\uf1f5|\uf1f2\uf1f6|\uf1f2\uf1f7|\uf1f2\uf1f8|\uf1f2\uf1f9|\uf1f2\uf1fa|\uf1f2\uf1fb|\uf1f2\uf1fc|\uf1f2\uf1fd|\uf1f2\uf1fe|\uf1f2\uf1ff|\uf1f3\uf1e6|\uf1f3\uf1e8|\uf1f3\uf1ea|\uf1f3\uf1eb|\uf1f3\uf1ec|\uf1f3\uf1ee|\uf1f3\uf1f1|\uf1f3\uf1f4|\uf1f3\uf1f5|\uf1f3\uf1f7|\uf1f3\uf1fa|\uf1f3\uf1ff|\uf1f4\uf1f2|\uf1f5\uf1e6|\uf1f5\uf1ea|\uf1f5\uf1eb|\uf1f5\uf1ec|\uf1f5\uf1ed|\uf1f5\uf1f0|\uf1f5\uf1f1|\uf1f5\uf1f2|\uf1f5\uf1f3|\uf1f5\uf1f7|\uf1f5\uf1f8|\uf1f5\uf1f9|\uf1f5\uf1fc|\uf1f5\uf1fe|\uf1f6\uf1e6|\uf1f7\uf1ea|\uf1f7\uf1f4|\uf1f7\uf1f8|\uf1f7\uf1fa|\uf1f7\uf1fc|\uf1f8\uf1e6|\uf1f8\uf1e7|\uf1f8\uf1e8|\uf1f8\uf1e9|\uf1f8\uf1ea|\uf1f8\uf1ec|\uf1f8\uf1ed|\uf1f8\uf1ee|\uf1f8\uf1ef|\uf1f8\uf1f0|\uf1f8\uf1f1|\uf1f8\uf1f2|\uf1f8\uf1f3|\uf1f8\uf1f4|\uf1f8\uf1f7|\uf1f8\uf1f8|\uf1f8\uf1f9|\uf1f8\uf1fb|\uf1f8\uf1fd|\uf1f8\uf1fe|\uf1f8\uf1ff|\uf1f9\uf1e6|\uf1f9\uf1e8|\uf1f9\uf1e9|\uf1f9\uf1eb|\uf1f9\uf1ec|\uf1f9\uf1ed|\uf1f9\uf1ef|\uf1f9\uf1f0|\uf1f9\uf1f1|\uf1f9\uf1f2|\uf1f9\uf1f3|\uf1f9\uf1f4|\uf1f9\uf1f7|\uf1f9\uf1f9|\uf1f9\uf1fb|\uf1f9\uf1fc|\uf1f9\uf1ff|\uf1fa\uf1e6|\uf1fa\uf1ec|\uf1fa\uf1f2|\uf1fa\uf1f3|\uf1fa\uf1f8|\uf1fa\uf1fe|\uf1fa\uf1ff|\uf1fb\uf1e6|\uf1fb\uf1e8|\uf1fb\uf1ea|\uf1fb\uf1ec|\uf1fb\uf1ee|\uf1fb\uf1f3|\uf1fb\uf1fa|\uf1fc\uf1eb|\uf1fc\uf1f8|\uf1fd\uf1f0|\uf1fe\uf1ea|\uf1fe\uf1f9|\uf1ff\uf1e6|\uf1ff\uf1f2|\uf1ff\uf1fc|\uf600|\uf601|\uf602|\uf923|\uf603|\uf604|\uf605|\uf606|\uf609|\uf60a|\uf60b|\uf60e|\uf60d|\uf618|\uf617|\uf619|\uf61a|\u263a|\uf642|\uf917|\uf929|\uf914|\uf928|\uf610|\uf611|\uf636|\uf644|\uf60f|\uf623|\uf625|\uf62e|\uf910|\uf62f|\uf62a|\uf62b|\uf634|\uf60c|\uf61b|\uf61c|\uf61d|\uf924|\uf612|\uf613|\uf614|\uf615|\uf643|\uf911|\uf632|\u2639|\uf641|\uf616|\uf61e|\uf61f|\uf624|\uf622|\uf62d|\uf626|\uf627|\uf628|\uf629|\uf92f|\uf62c|\uf630|\uf631|\uf633|\uf92a|\uf635|\uf621|\uf620|\uf92c|\uf637|\uf912|\uf915|\uf922|\uf92e|\uf927|\uf607|\uf920|\uf921|\uf925|\uf92b|\uf92d|\uf9d0|\uf913|\uf608|\uf47f|\uf479|\uf47a|\uf480|\u2620|\uf47b|\uf47d|\uf47e|\uf916|\uf4a9|\uf63a|\uf638|\uf639|\uf63b|\uf63c|\uf63d|\uf640|\uf63f|\uf63e|\uf648|\uf649|\uf64a|\uf476|\uf9d2|\uf466|\uf467|\uf9d1|\uf468|\uf469|\uf9d3|\uf474|\uf475|\uf46e|\uf575|\uf482|\uf477|\uf934|\uf478|\uf473|\uf472|\uf9d5|\uf9d4|\uf471|\uf935|\uf470|\uf930|\uf931|\uf47c|\uf385|\uf936|\uf9d9|\uf9da|\uf9db|\uf9dc|\uf9dd|\uf9de|\uf9df|\uf64d|\uf64e|\uf645|\uf646|\uf481|\uf64b|\uf647|\uf926|\uf937|\uf486|\uf487|\uf6b6|\uf3c3|\uf483|\uf57a|\uf46f|\uf9d6|\uf9d7|\uf9d8|\uf6c0|\uf6cc|\uf574|\uf5e3|\uf464|\uf465|\uf93a|\uf3c7|\u26f7|\uf3c2|\uf3cc|\uf3c4|\uf6a3|\uf3ca|\u26f9|\uf3cb|\uf6b4|\uf6b5|\uf3ce|\uf3cd|\uf938|\uf93c|\uf93d|\uf93e|\uf939|\uf46b|\uf46c|\uf46d|\uf48f|\uf491|\uf46a|\uf933|\uf4aa|\uf448|\uf449|\u261d|\uf446|\uf595|\uf447|\u270c|\uf91e|\uf596|\uf918|\uf919|\uf590|\u270b|\uf44c|\uf44d|\uf44e|\u270a|\uf44a|\uf91b|\uf91c|\uf91a|\uf44b|\uf91f|\u270d|\uf44f|\uf450|\uf64c|\uf932|\uf64f|\uf91d|\uf485|\uf442|\uf443|\uf463|\uf440|\uf441|\uf9e0|\uf445|\uf444|\uf48b|\uf498|\u2764|\uf493|\uf494|\uf495|\uf496|\uf497|\uf499|\uf49a|\uf49b|\uf9e1|\uf49c|\uf5a4|\uf49d|\uf49e|\uf49f|\u2763|\uf48c|\uf4a4|\uf4a2|\uf4a3|\uf4a5|\uf4a6|\uf4a8|\uf4ab|\uf4ac|\uf5e8|\uf5ef|\uf4ad|\uf573|\uf453|\uf576|\uf454|\uf455|\uf456|\uf9e3|\uf9e4|\uf9e5|\uf9e6|\uf457|\uf458|\uf459|\uf45a|\uf45b|\uf45c|\uf45d|\uf6cd|\uf392|\uf45e|\uf45f|\uf460|\uf461|\uf462|\uf451|\uf452|\uf3a9|\uf393|\uf9e2|\u26d1|\uf4ff|\uf484|\uf48d|\uf48e|\uf435|\uf412|\uf98d|\uf436|\uf415|\uf429|\uf43a|\uf98a|\uf431|\uf408|\uf981|\uf42f|\uf405|\uf406|\uf434|\uf40e|\uf984|\uf993|\uf98c|\uf42e|\uf402|\uf403|\uf404|\uf437|\uf416|\uf417|\uf43d|\uf40f|\uf411|\uf410|\uf42a|\uf42b|\uf992|\uf418|\uf98f|\uf42d|\uf401|\uf400|\uf439|\uf430|\uf407|\uf43f|\uf994|\uf987|\uf43b|\uf428|\uf43c|\uf43e|\uf983|\uf414|\uf413|\uf423|\uf424|\uf425|\uf426|\uf427|\uf54a|\uf985|\uf986|\uf989|\uf438|\uf40a|\uf422|\uf98e|\uf40d|\uf432|\uf409|\uf995|\uf996|\uf433|\uf40b|\uf42c|\uf41f|\uf420|\uf421|\uf988|\uf419|\uf41a|\uf980|\uf990|\uf991|\uf40c|\uf98b|\uf41b|\uf41c|\uf41d|\uf41e|\uf997|\uf577|\uf578|\uf982|\uf490|\uf338|\uf4ae|\uf3f5|\uf339|\uf940|\uf33a|\uf33b|\uf33c|\uf337|\uf331|\uf332|\uf333|\uf334|\uf335|\uf33e|\uf33f|\u2618|\uf340|\uf341|\uf342|\uf343|\uf347|\uf348|\uf349|\uf34a|\uf34b|\uf34c|\uf34d|\uf34e|\uf34f|\uf350|\uf351|\uf352|\uf353|\uf95d|\uf345|\uf965|\uf951|\uf346|\uf954|\uf955|\uf33d|\uf336|\uf952|\uf966|\uf344|\uf95c|\uf330|\uf35e|\uf950|\uf956|\uf968|\uf95e|\uf9c0|\uf356|\uf357|\uf969|\uf953|\uf354|\uf35f|\uf355|\uf32d|\uf96a|\uf32e|\uf32f|\uf959|\uf95a|\uf373|\uf958|\uf372|\uf963|\uf957|\uf37f|\uf96b|\uf371|\uf358|\uf359|\uf35a|\uf35b|\uf35c|\uf35d|\uf360|\uf362|\uf363|\uf364|\uf365|\uf361|\uf95f|\uf960|\uf961|\uf366|\uf367|\uf368|\uf369|\uf36a|\uf382|\uf370|\uf967|\uf36b|\uf36c|\uf36d|\uf36e|\uf36f|\uf37c|\uf95b|\u2615|\uf375|\uf376|\uf37e|\uf377|\uf378|\uf379|\uf37a|\uf37b|\uf942|\uf943|\uf964|\uf962|\uf37d|\uf374|\uf944|\uf52a|\uf3fa|\uf30d|\uf30e|\uf30f|\uf310|\uf5fa|\uf5fe|\uf3d4|\u26f0|\uf30b|\uf5fb|\uf3d5|\uf3d6|\uf3dc|\uf3dd|\uf3de|\uf3df|\uf3db|\uf3d7|\uf3d8|\uf3d9|\uf3da|\uf3e0|\uf3e1|\uf3e2|\uf3e3|\uf3e4|\uf3e5|\uf3e6|\uf3e8|\uf3e9|\uf3ea|\uf3eb|\uf3ec|\uf3ed|\uf3ef|\uf3f0|\uf492|\uf5fc|\uf5fd|\u26ea|\uf54c|\uf54d|\u26e9|\uf54b|\u26f2|\u26fa|\uf301|\uf303|\uf304|\uf305|\uf306|\uf307|\uf309|\u2668|\uf30c|\uf3a0|\uf3a1|\uf3a2|\uf488|\uf3aa|\uf3ad|\uf5bc|\uf3a8|\uf3b0|\uf682|\uf683|\uf684|\uf685|\uf686|\uf687|\uf688|\uf689|\uf68a|\uf69d|\uf69e|\uf68b|\uf68c|\uf68d|\uf68e|\uf690|\uf691|\uf692|\uf693|\uf694|\uf695|\uf696|\uf697|\uf698|\uf699|\uf69a|\uf69b|\uf69c|\uf6b2|\uf6f4|\uf6f5|\uf68f|\uf6e3|\uf6e4|\u26fd|\uf6a8|\uf6a5|\uf6a6|\uf6a7|\uf6d1|\u2693|\u26f5|\uf6f6|\uf6a4|\uf6f3|\u26f4|\uf6e5|\uf6a2|\u2708|\uf6e9|\uf6eb|\uf6ec|\uf4ba|\uf681|\uf69f|\uf6a0|\uf6a1|\uf6f0|\uf680|\uf6f8|\uf6ce|\uf6aa|\uf6cf|\uf6cb|\uf6bd|\uf6bf|\uf6c1|\u231b|\u23f3|\u231a|\u23f0|\u23f1|\u23f2|\uf570|\uf55b|\uf567|\uf550|\uf55c|\uf551|\uf55d|\uf552|\uf55e|\uf553|\uf55f|\uf554|\uf560|\uf555|\uf561|\uf556|\uf562|\uf557|\uf563|\uf558|\uf564|\uf559|\uf565|\uf55a|\uf566|\uf311|\uf312|\uf313|\uf314|\uf315|\uf316|\uf317|\uf318|\uf319|\uf31a|\uf31b|\uf31c|\uf321|\u2600|\uf31d|\uf31e|\u2b50|\uf31f|\uf320|\u2601|\u26c5|\u26c8|\uf324|\uf325|\uf326|\uf327|\uf328|\uf329|\uf32a|\uf32b|\uf32c|\uf300|\uf308|\uf302|\u2602|\u2614|\u26f1|\u26a1|\u2744|\u2603|\u26c4|\u2604|\uf525|\uf4a7|\uf30a|\uf383|\uf384|\uf386|\uf387|\u2728|\uf388|\uf389|\uf38a|\uf38b|\uf38d|\uf38e|\uf38f|\uf390|\uf391|\uf380|\uf381|\uf397|\uf39f|\uf3ab|\uf396|\uf3c6|\uf3c5|\uf947|\uf948|\uf949|\u26bd|\u26be|\uf3c0|\uf3d0|\uf3c8|\uf3c9|\uf3be|\uf3b1|\uf3b3|\uf3cf|\uf3d1|\uf3d2|\uf3d3|\uf3f8|\uf94a|\uf94b|\uf945|\uf3af|\u26f3|\u26f8|\uf3a3|\uf3bd|\uf3bf|\uf6f7|\uf94c|\uf3ae|\uf579|\uf3b2|\u2660|\u2665|\u2666|\u2663|\uf0cf|\uf004|\uf3b4|\uf507|\uf508|\uf509|\uf50a|\uf4e2|\uf4e3|\uf4ef|\uf514|\uf515|\uf3bc|\uf3b5|\uf3b6|\uf399|\uf39a|\uf39b|\uf3a4|\uf3a7|\uf4fb|\uf3b7|\uf3b8|\uf3b9|\uf3ba|\uf3bb|\uf941|\uf4f1|\uf4f2|\u260e|\uf4de|\uf4df|\uf4e0|\uf50b|\uf50c|\uf4bb|\uf5a5|\uf5a8|\u2328|\uf5b1|\uf5b2|\uf4bd|\uf4be|\uf4bf|\uf4c0|\uf3a5|\uf39e|\uf4fd|\uf3ac|\uf4fa|\uf4f7|\uf4f8|\uf4f9|\uf4fc|\uf50d|\uf50e|\uf52c|\uf52d|\uf4e1|\uf56f|\uf4a1|\uf526|\uf3ee|\uf4d4|\uf4d5|\uf4d6|\uf4d7|\uf4d8|\uf4d9|\uf4da|\uf4d3|\uf4d2|\uf4c3|\uf4dc|\uf4c4|\uf4f0|\uf5de|\uf4d1|\uf516|\uf3f7|\uf4b0|\uf4b4|\uf4b5|\uf4b6|\uf4b7|\uf4b8|\uf4b3|\uf4b9|\uf4b1|\uf4b2|\u2709|\uf4e7|\uf4e8|\uf4e9|\uf4e4|\uf4e5|\uf4e6|\uf4eb|\uf4ea|\uf4ec|\uf4ed|\uf4ee|\uf5f3|\u270f|\u2712|\uf58b|\uf58a|\uf58c|\uf58d|\uf4dd|\uf4bc|\uf4c1|\uf4c2|\uf5c2|\uf4c5|\uf4c6|\uf5d2|\uf5d3|\uf4c7|\uf4c8|\uf4c9|\uf4ca|\uf4cb|\uf4cc|\uf4cd|\uf4ce|\uf587|\uf4cf|\uf4d0|\u2702|\uf5c3|\uf5c4|\uf5d1|\uf512|\uf513|\uf50f|\uf510|\uf511|\uf5dd|\uf528|\u26cf|\u2692|\uf6e0|\uf5e1|\u2694|\uf52b|\uf3f9|\uf6e1|\uf527|\uf529|\u2699|\uf5dc|\u2697|\u2696|\uf517|\u26d3|\uf489|\uf48a|\uf6ac|\u26b0|\u26b1|\uf5ff|\uf6e2|\uf52e|\uf6d2|\uf3e7|\uf6ae|\uf6b0|\u267f|\uf6b9|\uf6ba|\uf6bb|\uf6bc|\uf6be|\uf6c2|\uf6c3|\uf6c4|\uf6c5|\u26a0|\uf6b8|\u26d4|\uf6ab|\uf6b3|\uf6ad|\uf6af|\uf6b1|\uf6b7|\uf4f5|\uf51e|\u2622|\u2623|\u2b06|\u2197|\u27a1|\u2198|\u2b07|\u2199|\u2b05|\u2196|\u2195|\u2194|\u21a9|\u21aa|\u2934|\u2935|\uf503|\uf504|\uf519|\uf51a|\uf51b|\uf51c|\uf51d|\uf6d0|\u269b|\uf549|\u2721|\u2638|\u262f|\u271d|\u2626|\u262a|\u262e|\uf54e|\uf52f|\u2648|\u2649|\u264a|\u264b|\u264c|\u264d|\u264e|\u264f|\u2650|\u2651|\u2652|\u2653|\u26ce|\uf500|\uf501|\uf502|\u25b6|\u23e9|\u23ed|\u23ef|\u25c0|\u23ea|\u23ee|\uf53c|\u23eb|\uf53d|\u23ec|\u23f8|\u23f9|\u23fa|\u23cf|\uf3a6|\uf505|\uf506|\uf4f6|\uf4f3|\uf4f4|\u2640|\u2642|\u2695|\u267b|\u269c|\uf531|\uf4db|\uf530|\u2b55|\u2705|\u2611|\u2714|\u2716|\u274c|\u274e|\u2795|\u2796|\u2797|\u27b0|\u27bf|\u303d|\u2733|\u2734|\u2747|\u203c|\u2049|\u2753|\u2754|\u2755|\u2757|\u3030|\u00a9|\u00ae|\u2122|\uf51f|\uf4af|\uf520|\uf521|\uf522|\uf523|\uf524|\uf170|\uf18e|\uf171|\uf191|\uf192|\uf193|\u2139|\uf194|\u24c2|\uf195|\uf196|\uf17e|\uf197|\uf17f|\uf198|\uf199|\uf19a|\uf201|\uf202|\uf237|\uf236|\uf22f|\uf250|\uf239|\uf21a|\uf232|\uf251|\uf238|\uf234|\uf233|\u3297|\u3299|\uf23a|\uf235|\u25aa|\u25ab|\u25fb|\u25fc|\u25fd|\u25fe|\u2b1b|\u2b1c|\uf536|\uf537|\uf538|\uf539|\uf53a|\uf53b|\uf4a0|\uf518|\uf532|\uf533|\u26aa|\u26ab|\uf534|\uf535|\uf3c1|\uf6a9|\uf38c|\uf3f4|\uf3f3/g;
    var EmojiReg;
    var EmojiList = [];
    var isIE8 = document.all && !document.addEventListener; // emoji 详情, 扩展时往后叠加

    var EmojiFactory = {
      "u1F603": {
        "en": "Smiley Face",
        "zh": "笑脸",
        "tag": "\uD83D\uDE03",
        "position": "-75px 0px"
      },
      "u1F600": {
        "en": "Grinning Face",
        "zh": "笑嘻嘻",
        "tag": "\uD83D\uDE00",
        "position": "0px 0px"
      },
      "u1F60A": {
        "en": "Smiley",
        "zh": "微笑",
        "tag": "\uD83D\uDE0A",
        "position": "-1725px 0px"
      },
      "u263A": {
        "en": "Cute",
        "zh": "萌萌哒",
        "tag": "\u263A",
        "position": "-2950px 0px"
      },
      "u1F609": {
        "en": "Winking Face",
        "zh": "眨眼",
        "tag": "\uD83D\uDE09",
        "position": "-200px 0px"
      },
      "u1F60D": {
        "en": "Heart Eyes",
        "zh": "色迷迷",
        "tag": "\uD83D\uDE0D",
        "position": "-1800px 0px"
      },
      "u1F618": {
        "en": "Blowing Kiss",
        "zh": "飞吻",
        "tag": "\uD83D\uDE18",
        "position": "-375px 0px"
      },
      "u1F61A": {
        "en": "Kiss Face",
        "zh": "么么哒",
        "tag": "\uD83D\uDE1A",
        "position": "-1875px 0px"
      },
      "u1F61C": {
        "en": "Crazy Face",
        "zh": "调皮",
        "tag": "\uD83D\uDE1C",
        "position": "-1900px 0px"
      },
      "u1F61D": {
        "en": "Tongue Out",
        "zh": "吐舌头",
        "tag": "\uD83D\uDE1D",
        "position": "-1925px 0px"
      },
      "u1F633": {
        "en": "Flushed Face",
        "zh": "脸红",
        "tag": "\uD83D\uDE33",
        "position": "-625px 0px"
      },
      "u1F601": {
        "en": "Grinning With Smiling",
        "zh": "露齿而笑",
        "tag": "\uD83D\uDE01",
        "position": "-25px 0px"
      },
      "u1F614": {
        "en": "Pensive",
        "zh": "沉思",
        "tag": "\uD83D\uDE14",
        "position": "-300px 0px"
      },
      "u1F60C": {
        "en": "Pleased",
        "zh": "满意",
        "tag": "\uD83D\uDE0C",
        "position": "-1775px 0px"
      },
      "u1F612": {
        "en": "Dissatisfied",
        "zh": "不满",
        "tag": "\uD83D\uDE12",
        "position": "-250px 0px"
      },
      "u1F61F": {
        "en": "Worried Face",
        "zh": "苦瓜脸",
        "tag": "\uD83D\uDE1F",
        "position": "-1975px 0px"
      },
      "u1F61E": {
        "en": "Disappointed Face",
        "zh": "失望",
        "tag": "\uD83D\uDE1E",
        "position": "-1950px 0px"
      },
      "u1F623": {
        "en": "Helpless Face",
        "zh": "无助",
        "tag": "\uD83D\uDE23",
        "position": "-450px 0px"
      },
      "u1F62D": {
        "en": "Crying",
        "zh": "伤心",
        "tag": "\uD83D\uDE22",
        "position": "-425px 0px"
      },
      "u1F602": {
        "en": "Laughing Tears",
        "zh": "喜极而泣",
        "tag": "\uD83D\uDE02",
        "position": "-50px 0px"
      },
      "u1F622": {
        "en": "Sobbing",
        "zh": "哭泣",
        "tag": "\uD83D\uDE2D",
        "position": "-2075px 0px"
      },
      "u1F62A": {
        "en": "Sleepy Face",
        "zh": "困",
        "tag": "\uD83D\uDE2A",
        "position": "-2000px 0px"
      },
      "u1F630": {
        "en": "Cold Sweat",
        "zh": "冷汗",
        "tag": "\uD83D\uDE30",
        "position": "-550px 0px"
      },
      "u1F605": {
        "en": "Happy Sweat",
        "zh": "尴尬",
        "tag": "\uD83D\uDE05",
        "position": "-100px 0px"
      },
      "u1F613": {
        "en": "Sweat",
        "zh": "汗",
        "tag": "\uD83D\uDE13",
        "position": "-275px 0px"
      },
      "u1F62B": {
        "en": "Tired Face",
        "zh": "抓狂",
        "tag": "\uD83D\uDE2B",
        "position": "-2025px 0px"
      },
      "u1F629": {
        "en": "Weary Face",
        "zh": "疲惫",
        "tag": "\uD83D\uDE29",
        "position": "-525px 0px"
      },
      "u1F628": {
        "en": "Fearful Face",
        "zh": "可怕",
        "tag": "\uD83D\uDE28",
        "position": "-500px 0px"
      },
      "u1F631": {
        "en": "Scream",
        "zh": "尖叫",
        "tag": "\uD83D\uDE31",
        "position": "-575px 0px"
      },
      "u1F621": {
        "en": "Angry Face",
        "zh": "生气",
        "tag": "\uD83D\uDE21",
        "position": "-400px 0px"
      },
      "u1F624": {
        "en": "Mad Face",
        "zh": "怒气冲冲",
        "tag": "\uD83D\uDE24",
        "position": "-475px 0px"
      },
      "u1F616": {
        "en": "Confounded Face",
        "zh": "蒙羞",
        "tag": "\uD83D\uDE16",
        "position": "-350px 0px"
      },
      "u1F606": {
        "en": "Big Grin",
        "zh": "大笑",
        "tag": "\uD83D\uDE06",
        "position": "-125px 0px"
      },
      "u1F60B": {
        "en": "Hungry",
        "zh": "馋",
        "tag": "\uD83D\uDE0B",
        "position": "-1750px 0px"
      },
      "u1F637": {
        "en": "Mask Face",
        "zh": "口罩",
        "tag": "\uD83D\uDE37",
        "position": "-725px 0px"
      },
      "u1F60E": {
        "en": "Sunglasses",
        "zh": "墨镜",
        "tag": "\uD83D\uDE0E",
        "position": "-1825px 0px"
      },
      "u1F634": {
        "en": "Sleeping",
        "zh": "睡眠",
        "tag": "\uD83D\uDE34",
        "position": "-650px 0px"
      },
      "u1F635": {
        "en": "Dizzy Face",
        "zh": "头晕眼花",
        "tag": "\uD83D\uDE35",
        "position": "-675px 0px"
      },
      "u1F632": {
        "en": "Shocked Face",
        "zh": "震惊",
        "tag": "\uD83D\uDE32",
        "position": "-600px 0px"
      },
      "u1F608": {
        "en": "Purple Devil",
        "zh": "小恶魔",
        "tag": "\uD83D\uDE08",
        "position": "-175px 0px"
      },
      "u1F47F": {
        "en": "Devil",
        "zh": "恶魔",
        "tag": "\uD83D\uDC7F",
        "position": "-1600px 0px"
      },
      "u1F62F": {
        "en": "Surprised Face",
        "zh": "惊呆",
        "tag": "\uD83D\uDE2F",
        "position": "-2100px 0px"
      },
      "u1F62C": {
        "en": "Grimacing Face",
        "zh": "扮鬼脸",
        "tag": "\uD83D\uDE2C",
        "position": "-2050px 0px"
      },
      "u1F615": {
        "en": "Confused",
        "zh": "困惑",
        "tag": "\uD83D\uDE15",
        "position": "-325px 0px"
      },
      "u1F636": {
        "en": "Mouthless",
        "zh": "无口",
        "tag": "\uD83D\uDE36",
        "position": "-700px 0px"
      },
      "u1F607": {
        "en": "Halo",
        "zh": "天使光环",
        "tag": "\uD83D\uDE07",
        "position": "-150px 0px"
      },
      "u1F60F": {
        "en": "Smirking Face",
        "zh": "傻笑",
        "tag": "\uD83D\uDE0F",
        "position": "-1850px 0px"
      },
      "u1F611": {
        "en": "Expressionless Face",
        "zh": "面无表情",
        "tag": "\uD83D\uDE11",
        "position": "-225px 0px"
      },
      "u1F648": {
        "en": "See No Monkey",
        "zh": "不看",
        "tag": "\uD83D\uDE48",
        "position": "-2675px 0px"
      },
      "u1F649": {
        "en": "Hear No Monkey",
        "zh": "不听",
        "tag": "\uD83D\uDE49",
        "position": "-2700px 0px"
      },
      "u1F64A": {
        "en": "No Speaking",
        "zh": "闭嘴",
        "tag": "\uD83D\uDE4A",
        "position": "-2125px 0px"
      },
      "u1F47D": {
        "en": "Alien",
        "zh": "外星人",
        "tag": "\uD83D\uDC7D",
        "position": "-1575px 0px"
      },
      "u1F4A9": {
        "en": "Pile Of Poo",
        "zh": "便便",
        "tag": "\uD83D\uDCA9",
        "position": "-1025px 0px"
      },
      "u1F494": {
        "en": "Broken Heart",
        "zh": "心碎",
        "tag": "\uD83D\uDC94",
        "position": "-2600px 0px"
      },
      "u1F525": {
        "en": "Fire",
        "zh": "火",
        "tag": "\uD83D\uDD25",
        "position": "-2625px 0px"
      },
      "u1F4A2": {
        "en": "Anger",
        "zh": "愤怒",
        "tag": "\uD83D\uDCA2",
        "position": "-950px 0px"
      },
      "u1F4A4": {
        "en": "Zzz",
        "zh": "ZZZ",
        "tag": "\uD83D\uDCA4",
        "position": "-1000px 0px"
      },
      "u1F6AB": {
        "en": "Prohibited",
        "zh": "禁止",
        "tag": "\uD83D\uDEAB",
        "position": "-1175px 0px"
      },
      "u2B50": {
        "en": "Star",
        "zh": "星星",
        "tag": "\u2B50",
        "position": "-2750px 0px"
      },
      "u26A1": {
        "en": "Lightning Bolt",
        "zh": "闪电",
        "tag": "\u26A1",
        "position": "-2825px 0px"
      },
      "u1F319": {
        "en": "Drescent Moon",
        "zh": "弯月",
        "tag": "\uD83C\uDF19",
        "position": "-2175px 0px"
      },
      "u2600": {
        "en": "Sunny",
        "zh": "晴朗",
        "tag": "\u2600",
        "position": "-3075px 0px"
      },
      "u26C5": {
        "en": "Cloudy",
        "zh": "多云",
        "tag": "\u26C5",
        "position": "-2900px 0px"
      },
      "u2601": {
        "en": "Cloud",
        "zh": "云彩",
        "tag": "\u2601",
        "position": "-3100px 0px"
      },
      "u2744": {
        "en": "Snowflake",
        "zh": "雪花",
        "tag": "\u2744",
        "position": "-3175px 0px"
      },
      "u2614": {
        "en": "Umbrella",
        "zh": "雨伞",
        "tag": "\u2614",
        "position": "-3125px 0px"
      },
      "u26C4": {
        "en": "Snowman",
        "zh": "雪人",
        "tag": "\u26C4",
        "position": "-2875px 0px"
      },
      "u1F44D": {
        "en": "Thumbs Up",
        "zh": "赞",
        "tag": "\uD83D\uDC4D",
        "position": "-1400px 0px"
      },
      "u1F44E": {
        "en": "Thumbs Down",
        "zh": "喝倒彩",
        "tag": "\uD83D\uDC4E",
        "position": "-1425px 0px"
      },
      "u1F91D": {
        "en": "Handshake",
        "zh": "握手",
        "tag": "\uD83E\uDD1D",
        "position": "-3200px 0px"
      },
      "u1F44C": {
        "en": "Ok Hand",
        "zh": "没问题",
        "tag": "\uD83D\uDC4C",
        "position": "-1375px 0px"
      },
      "u1F44A": {
        "en": "Raised Fist",
        "zh": "举起拳头",
        "tag": "\u270A",
        "position": "-2975px 0px"
      },
      "u270A": {
        "en": "Oncoming Fist",
        "zh": "击拳",
        "tag": "\uD83D\uDC4A",
        "position": "-1350px 0px"
      },
      "u270C": {
        "en": "Victory Hand",
        "zh": "耶",
        "tag": "\u270C",
        "position": "-3025px 0px"
      },
      "u270B": {
        "en": "Raised Hand",
        "zh": "举手",
        "tag": "\u270B",
        "position": "-3000px 0px"
      },
      "u1F64F": {
        "en": "Folded Hands",
        "zh": "祈祷",
        "tag": "\uD83D\uDE4F",
        "position": "-2150px 0px"
      },
      "u261D": {
        "en": "Pointing Up",
        "zh": "第一",
        "tag": "\u261D",
        "position": "-2925px 0px"
      },
      "u1F44F": {
        "en": "Clapping Hands",
        "zh": "鼓掌",
        "tag": "\uD83D\uDC4F",
        "position": "-1450px 0px"
      },
      "u1F4AA": {
        "en": "Flexed Biceps",
        "zh": "肌肉",
        "tag": "\uD83D\uDCAA",
        "position": "-1050px 0px"
      },
      "u1F46A": {
        "en": "Family",
        "zh": "家庭",
        "tag": "\uD83D\uDC6A",
        "position": "-1475px 0px"
      },
      "u1F46B": {
        "en": "Couple",
        "zh": "情侣",
        "tag": "\uD83D\uDC6B",
        "position": "-1500px 0px"
      },
      "u1F47C": {
        "en": "Baby Angel",
        "zh": "宝贝天使",
        "tag": "\uD83D\uDC7C",
        "position": "-1550px 0px"
      },
      "u1F434": {
        "en": "Horse",
        "zh": "马",
        "tag": "\uD83D\uDC34",
        "position": "-2475px 0px"
      },
      "u1F436": {
        "en": "Dog",
        "zh": "狗",
        "tag": "\uD83D\uDC36",
        "position": "-2500px 0px"
      },
      "u1F437": {
        "en": "Pig",
        "zh": "猪",
        "tag": "\uD83D\uDC37",
        "position": "-2525px 0px"
      },
      "u1F47B": {
        "en": "Ghost",
        "zh": "鬼",
        "tag": "\uD83D\uDC7B",
        "position": "-1525px 0px"
      },
      "u1F339": {
        "en": "Rose",
        "zh": "玫瑰",
        "tag": "\uD83C\uDF39",
        "position": "-2225px 0px"
      },
      "u1F33B": {
        "en": "Sunflower",
        "zh": "向日葵",
        "tag": "\uD83C\uDF3B",
        "position": "-1250px 0px"
      },
      "u1F332": {
        "en": "Pine Tree",
        "zh": "松树",
        "tag": "\uD83C\uDF32",
        "position": "-2200px 0px"
      },
      "u1F384": {
        "en": "Christmas Tree",
        "zh": "圣诞树",
        "tag": "\uD83C\uDF84",
        "position": "-2400px 0px"
      },
      "u1F381": {
        "en": "Wrapped Gift",
        "zh": "礼物",
        "tag": "\uD83C\uDF81",
        "position": "-2350px 0px"
      },
      "u1F389": {
        "en": "Party Popper",
        "zh": "聚会礼花",
        "tag": "\uD83C\uDF89",
        "position": "-2425px 0px"
      },
      "u1F4B0": {
        "en": "Money Bag",
        "zh": "钱袋",
        "tag": "\uD83D\uDCB0",
        "position": "-1075px 0px"
      },
      "u1F382": {
        "en": "Birthday Cake",
        "zh": "生日蛋糕",
        "tag": "\uD83C\uDF82",
        "position": "-2375px 0px"
      },
      "u1F356": {
        "en": "Barbecue",
        "zh": "BBQ",
        "tag": "\uD83C\uDF56",
        "position": "-2275px 0px"
      },
      "u1F35A": {
        "en": "Cooked Rice",
        "zh": "米饭",
        "tag": "\uD83C\uDF5A",
        "position": "-1275px 0px"
      },
      "u1F366": {
        "en": "Ice Cream",
        "zh": "冰淇淋",
        "tag": "\uD83C\uDF66",
        "position": "-2300px 0px"
      },
      "u1F36B": {
        "en": "Chocolate Bar",
        "zh": "巧克力",
        "tag": "\uD83C\uDF6B",
        "position": "-1300px 0px"
      },
      "u1F349": {
        "en": "Watermelon",
        "zh": "西瓜",
        "tag": "\uD83C\uDF49",
        "position": "-2250px 0px"
      },
      "u1F377": {
        "en": "Wine Glass",
        "zh": "红酒",
        "tag": "\uD83C\uDF77",
        "position": "-2325px 0px"
      },
      "u1F37B": {
        "en": "Cheers",
        "zh": "干杯",
        "tag": "\uD83C\uDF7B",
        "position": "-1325px 0px"
      },
      "u2615": {
        "en": "Coffee",
        "zh": "咖啡",
        "tag": "\u2615",
        "position": "-3150px 0px"
      },
      "u1F3C0": {
        "en": "Basketball",
        "zh": "篮球",
        "tag": "\uD83C\uDFC0",
        "position": "-825px 0px"
      },
      "u26BD": {
        "en": "Soccer Ball",
        "zh": "足球",
        "tag": "\u26BD",
        "position": "-2850px 0px"
      },
      "u1F3C2": {
        "en": "Snowboarder",
        "zh": "单板滑雪",
        "tag": "\uD83C\uDFC2",
        "position": "-850px 0px"
      },
      "u1F3A4": {
        "en": "Microphone",
        "zh": "麦克风",
        "tag": "\uD83C\uDFA4",
        "position": "-750px 0px"
      },
      "u1F3B5": {
        "en": "Musical Note",
        "zh": "音乐",
        "tag": "\uD83C\uDFB5",
        "position": "-800px 0px"
      },
      "u1F3B2": {
        "en": "Game Die",
        "zh": "骰子",
        "tag": "\uD83C\uDFB2",
        "position": "-775px 0px"
      },
      "u1F004": {
        "en": "Mahjong Red Dragon",
        "zh": "麻将",
        "tag": "\uD83C\uDC04",
        "position": "-900px 0px"
      },
      "u1F451": {
        "en": "Crown",
        "zh": "王冠",
        "tag": "\uD83D\uDC51",
        "position": "-2550px 0px"
      },
      "u1F484": {
        "en": "Lipstick",
        "zh": "口红",
        "tag": "\uD83D\uDC84",
        "position": "-2575px 0px"
      },
      "u1F48B": {
        "en": "Kiss",
        "zh": "吻",
        "tag": "\uD83D\uDC8B",
        "position": "-1650px 0px"
      },
      "u1F48D": {
        "en": "Ring",
        "zh": "戒指",
        "tag": "\uD83D\uDC8D",
        "position": "-1675px 0px"
      },
      "u1F4DA": {
        "en": "Books",
        "zh": "书籍",
        "tag": "\uD83D\uDCDA",
        "position": "-1100px 0px"
      },
      "u1F393": {
        "en": "Graduation Cap",
        "zh": "毕业帽",
        "tag": "\uD83C\uDF93",
        "position": "-2450px 0px"
      },
      "u270F": {
        "en": "Pencil",
        "zh": "铅笔",
        "tag": "\u270F",
        "position": "-3050px 0px"
      },
      "u1F3E1": {
        "en": "House With Garden",
        "zh": "房子",
        "tag": "\uD83C\uDFE1",
        "position": "-875px 0px"
      },
      "u1F6BF": {
        "en": "Shower",
        "zh": "淋浴",
        "tag": "\uD83D\uDEBF",
        "position": "-1200px 0px"
      },
      "u1F4A1": {
        "en": "Light Bulb",
        "zh": "灯泡",
        "tag": "\uD83D\uDCA1",
        "position": "-925px 0px"
      },
      "u1F4DE": {
        "en": "Telephone Receiver",
        "zh": "电话听筒",
        "tag": "\uD83D\uDCDE",
        "position": "-1125px 0px"
      },
      "u1F4E2": {
        "en": "Loudspeaker",
        "zh": "扩音器",
        "tag": "\uD83D\uDCE2",
        "position": "-1150px 0px"
      },
      "u1F556": {
        "en": "Clock",
        "zh": "表",
        "tag": "\uD83D\uDD56",
        "position": "-2650px 0px"
      },
      "u23F0": {
        "en": "Alarm Clock",
        "zh": "闹钟",
        "tag": "\u23F0",
        "position": "-2775px 0px"
      },
      "u23F3": {
        "en": "Hourglass",
        "zh": "沙漏",
        "tag": "\u23F3",
        "position": "-2800px 0px"
      },
      "u1F4A3": {
        "en": "Bomb",
        "zh": "炸弹",
        "tag": "\uD83D\uDCA3",
        "position": "-975px 0px"
      },
      "u1F52B": {
        "en": "Pistol",
        "zh": "手枪",
        "tag": "\uD83D\uDD2B",
        "position": "-1700px 0px"
      },
      "u1F48A": {
        "en": "Capsule",
        "zh": "药",
        "tag": "\uD83D\uDC8A",
        "position": "-1625px 0px"
      },
      "u1F680": {
        "en": "Rocket",
        "zh": "火箭",
        "tag": "\uD83D\uDE80",
        "position": "-2725px 0px"
      },
      "u1F30F": {
        "en": "Globe",
        "zh": "地球",
        "tag": "\uD83C\uDF0F",
        "position": "-1225px 0px"
      }
    };
    var Config = {
      url: getOnlineImagePath(),
      size: DefaultSize,
      lang: DefaultLang,
      reg: UnicodeReg
    };
    var Utils = {
      extend: function () {
        if (arguments.length === 0) {
          return;
        }

        var obj = arguments[0];

        for (var i = 1, len = arguments.length; i < len; i++) {
          var other = arguments[i];

          for (var item in other) {
            obj[item] = other[item];
          }
        }

        return obj;
      },
      filter: function (arr, func) {
        var array = [];

        for (var i = 0; i < arr.length; i++) {
          var value = arr[i];

          if (func(value)) {
            array.push(value);
          }
        }

        return array;
      },
      cutString: function (string, start, length) {
        var array = [];

        for (var i = start; i < start + length; i++) {
          array.push(string.charAt(i));
        }

        return array.join('');
      },
      map: function (arr, func) {
        var tempArr = arr.concat([]);

        for (var i = 0; i < tempArr.length; i++) {
          var value = tempArr[i];

          if (func && typeof func === "function") {
            tempArr[i] = func(value);
          }
        }

        return tempArr;
      },
      indexOf: function (array, value) {
        if (typeof array === "string") {
          for (var i = 0; i <= array.length - value.length; i++) {
            var string = Utils.cutString(array, i, value.length);

            if (array.charAt(i) == value.charAt(0) && Utils.cutString(array, i, value.length) == value) {
              return i;
            }
          }
        } else if (Object.prototype.toString.call(array) === '[object Array]') {
          for (var i = 0; i < array.length; i++) {
            var item = array[i];

            if (item == value) {
              return i;
            }
          }
        }

        return -1;
      },
      getDom: function (html) {
        var div = document.createElement("div");
        div.innerHTML = html;
        return div.childNodes[0];
      },
      render: function (temp, params) {
        return temp.replace(/\\?\{\{([^}]+)\}\}/g, function (match, name) {
          return params[name] != undefined ? params[name] : match;
        });
      }
    };
    var CheckParam = {
      getType: function (str) {
        /* IE下不准确问题 */
        if (str === undefined) {
          return "undefined";
        }

        if (str === null) {
          return "null";
        }

        var temp = Object.prototype.toString.call(str).toLowerCase();
        return temp.slice(8, temp.length - 1);
      },
      check: function (typeList, funcName, params) {
        params = params || [];
        var maxCount = typeList.length;

        if (params.length > maxCount) {
          params.length = maxCount;
        }

        for (var i = 0; i < typeList.length; i++) {
          var paramType = this.getType(params[i]);
          var sucType = typeList[i];

          if (!new RegExp(paramType).test(sucType)) {
            var msgTemp = "第{{index}}个参数错误, 传入参数类型为: {{errType}}, 应传参数类型为: {{sucType}}, 错误所在位置为: {{funcName}}";
            var msg = Utils.render(msgTemp, {
              index: i + 1,
              errType: paramType,
              sucType: sucType,
              funcName: funcName
            });
            console.error(msg);
          }
        }
      }
    };

    var init = function (option) {
      addBaseCss();
      option = option || {};
      Config = Utils.extend(Config, option);
      extendEmojis(option.extension);
      setEmojiReg();
      setEmojiList();
      adaptOldVersion();
    };
    /**
     * 将字符串中的原生emoji字符转化为 对应的文字标识
     * @param  {string} content 必填，需要转化的包含emoji的字符串
     * @param  {regExp} reg     可选，匹配的正则表达式
     * @param  {func} function  可选，emoji的显示方式
     * @return {string}         转化后的字符串
     */


    var emojiToSymbol = function (content, reg, func) {
      CheckParam.check(['string', 'regexp|null|undefined'], 'emojiToSymbol', arguments);
      content = unicodeToEmoji(content, reg);
      return content.replace(EmojiReg, function (tag) {
        var lang = Config.lang;
        var detail = getDetail('tag', tag);
        var symbol = detail ? '[' + detail[lang] + ']' : tag;
        return func ? func(symbol) : symbol;
      });
    };
    /**
     * 将字符串中的 对应文字标识 转化为原生emoji
     * @param  {string} text 必填 包含symbol的字符串
     * @param  {func} function  可选，emoji的显示方式
     * @return {string}
     */


    var symbolToEmoji = function (text, func) {
      CheckParam.check(['string'], 'symbolToEmoji', arguments);
      text = unicodeToEmoji(text);
      var emojiText = text.replace(/\[([^\[\]]+?)\]/g, function (symbol) {
        symbol = symbol.substr(1, symbol.length - 2);
        var lang = Config.lang;
        var detail = getDetail(lang, symbol);
        return detail ? detail.tag : '[' + symbol + ']';
      });
      return emojiText.replace(EmojiReg, function (tag) {
        return func ? func(tag) : tag;
      });
    };
    /**
     * 将字符串中的原生emoji字符转化为html标签
     * @param  {string} content 必填，包含原生emoji字符的字符串
     * @param  {int} sizePx     可选，html标签的大小
     * @param  {string} reg     可选，正则表达式
     * @param  {func} function  可选，emoji的显示方式
     * @return {string}         转化后，包含emoji背景的span标签
     */


    var emojiToHTML = function (content, sizePx, reg, func) {
      CheckParam.check(["string", "number|null|undefined", "regexp|null|undefined"], "emojiToHTML", arguments);
      content = unicodeToEmoji(content, reg);
      var htmlContent = content.replace(EmojiReg, function (tag) {
        var html = getHTMLByEmoji(tag, sizePx);
        return html || tag;
      });
      return htmlContent.replace(EmojiReg, function (tag) {
        return func ? func(tag) : tag;
      });
    };
    /**
     * 将字符串中的 对应文字标识 转化为html标签
     * @param  {string} text 必填，包含symbol的字符串
     * @param  {int} sizePx    可选，html标签的大小
     * @param  {string} reg    可选，正则表达式
     * @param  {func} function  可选，emoji的显示方式
     * @return {span标签}       转化后，包含emoji背景的span标签
     */


    var symbolToHTML = function (text, sizePx, reg, func) {
      CheckParam.check(["string", "number|null|undefined", "regexp|null|undefined"], "symbolToHTML", arguments);
      var emojiText = text.replace(/\[([^\[\]]+?)\]/g, function (symbol) {
        var text = symbolToEmoji(symbol);
        return emojiToHTML(text, sizePx, reg);
      });
      return emojiText.replace(EmojiReg, function (tag) {
        return func ? func(tag) : tag;
      });
    };

    function getDetail(key, value) {
      for (var unicode in EmojiFactory) {
        var detail = EmojiFactory[unicode];

        if (detail[key] === value) {
          return detail;
        }
      }
    }

    function getHTMLByEmoji(emoji, sizePx) {
      for (var key in EmojiFactory) {
        var detail = EmojiFactory[key];

        if (detail.tag === emoji) {
          return getEmojiHTML(detail, sizePx);
        }
      }

      return false;
    }

    function getEmojiHTML(item, sizePx) {
      var size = sizePx || Config.size;
      var position = getBgPosition(item.position, size);

      if (isIE8) {
        position = item.position;
        size = Config.size;
      }

      var emojiObj = {
        size: size,
        position: position,
        background: item.background || Config.url,
        name: item[Config.lang],
        tag: item.tag
      };
      var style = "width: {{size}}px; height: {{size}}px; line-height: {{size}}px; background-image: url({{background}}); background-position: {{position}}; background-size: auto {{size}}px; overflow: hidden; vertical-align: middle; font-size: 0 !important;";
      var spanTpl = "<span class='rong-emoji-content' name='[{{name}}]' style='{{style}}'></span>";
      spanTpl = Utils.render(spanTpl, {
        style: style
      });
      return Utils.render(spanTpl, emojiObj);
    }

    function getBgPosition(position, sizePx) {
      var size = sizePx || Config.size;
      var baseSize = isIE8 ? 24 : 25;
      var scale = size / baseSize;
      position = position.split(" ");
      var x = position[0],
          y = position[1];
      x = x ? x.split("px")[0] : 0;
      y = y ? y.split("px")[0] : 0;
      var positionTpl = '{{x}}px {{y}}px';
      return Utils.render(positionTpl, {
        x: parseInt(x) * scale,
        y: parseInt(y) * scale
      });
    }
    /**
     * 将字符串中的unicode码转化为可以显示的原生emoji字符
     * @param  {string} content 必填，需要转化的包含emoji的字符串
     * @param  {regExp} reg      可选，标识unicode码的匹配范围
     * @return {string}          转化后的字符串
     */


    function unicodeToEmoji(content, reg) {
      reg = reg || Config.reg;
      return content.replace(reg, function (unicode) {
        return calculateUTF(unicode);
      });
    }

    function calculateUTF(char) {
      var unicodes = escape(char).split('%u');
      unicodes = Utils.filter(unicodes, function (code) {
        return code !== '';
      });
      unicodes = Utils.map(unicodes, function (code) {
        var startWithF = Utils.indexOf(code, 'f') === 0 || Utils.indexOf(code, 'F') === 0;
        var isFE0F = code === 'FE0F' || code === 'fe0f';

        if (startWithF && !isFE0F) {
          return '0x1' + code;
        }

        return '0x' + code;
      });
      return String.RongFromCodePoint(unicodes);
    }

    function extendEmojis(extension) {
      CheckParam.check(['object|undefined'], 'init', arguments);

      if (!extension) {
        return;
      }

      var dataSource = extension.dataSource;
      var url = extension.url || Config.url;

      for (var key in dataSource) {
        var detail = dataSource[key];
        EmojiFactory[key] = detail;
        EmojiFactory[key].background = url;
      }
    }

    function setEmojiList() {
      EmojiList.length = 0;

      for (var unicode in EmojiFactory) {
        var detail = EmojiFactory[unicode];

        if (detail.tag) {
          var lang = Config.lang;
          var html = getHTMLByEmoji(detail.tag);
          var node = Utils.getDom(html);
          var symbol = detail[lang];
          EmojiList.push({
            unicode: unicode,
            symbol: '[' + symbol + ']',
            emoji: detail.tag,
            node: node
          });
        }
      }
    }

    function setEmojiReg() {
      var reg = [];

      for (var key in EmojiFactory) {
        var detail = EmojiFactory[key];
        reg.push(detail.tag);
      }

      reg = reg.join('|');
      EmojiReg = new RegExp(reg, 'g');
    }

    function getOnlineImagePath() {
      var getPath = function (path) {
        var protocol = document.location.protocol;
        var isFileProtocol = protocol === 'file:';
        return isFileProtocol ? 'http:' + path : path;
      };

      var normalImgPath = getPath(NornalImagePath);
      var hdImgPath = getPath(HdImagePath);
      return isIE8 ? normalImgPath : hdImgPath;
    }

    function isSupportEmoji() {
      var getTextFeature = function (text, color) {
        try {
          var canvas = document.createElement("canvas");
          canvas.width = 20;
          canvas.height = 20;
          var ctx = canvas.getContext("2d");
          ctx.textBaseline = "top";
          ctx.font = "20px sans-serif";
          ctx.fillStyle = color;
          ctx.fillText(text, 0, 0);
          var imageData = ctx.getImageData(0, 0, 20, 20).data;
          var imageDataArr = [];

          for (var i = 0; i < imageData.length; i++) {
            imageDataArr[i] = imageData[i];
          }

          var totalColor = 0;

          for (var i = 0; i < imageDataArr.length; i++) {
            totalColor += imageDataArr[i];
          }

          var hasColor = totalColor > 0;
          return hasColor ? imageDataArr.toString() : false;
        } catch (e) {
          return false;
        }
      };

      var testEmoji = "😁";
      var mode = getTextFeature(testEmoji, "#000");

      if (mode) {
        var otherEmoji = "😨";
        var colorFeatrue = getTextFeature(testEmoji, "#FFF");
        var otherFeature = getTextFeature(otherEmoji, "#000"); //为相同emoji添加不同色, 判断两次上色是否相同, 如果相同, 说明emoji以图片渲染, 支持

        var isSameColor = mode && mode === colorFeatrue; //为不同emoji添加相同色, 判断两次上色是否不同, 如果不同, 说明emoji以字符渲染, 支持

        var isDiffColor = mode && mode !== otherFeature;
        return isSameColor || isDiffColor;
      } else {
        return false;
      }
    }

    function addBaseCss() {
      var baseCss = ".rong-emoji-content { display: inline-block; overflow: hidden; font-size: 20px !important; text-align: center; vertical-align: middle; overflow: hidden;}";
      var style = document.createElement("style");
      style.setAttribute("type", "text/css");
      var head = document.getElementsByTagName('head')[0];
      head.appendChild(style);

      if (style.styleSheet) {
        style.styleSheet.cssText = baseCss;
      } else {
        head = document.createTextNode(baseCss);
        style.appendChild(head);
      }
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias,   fromCodePoint兼容 */


    (function () {
      var defineProperty = function () {
        // IE 8 only supports `Object.defineProperty` on DOM elements
        try {
          var object = {};
          var $defineProperty = Object.defineProperty;
          var result = $defineProperty(object, object, object) && $defineProperty;
        } catch (error) {}

        return result;
      }();

      var stringFromCharCode = String.fromCharCode;
      var floor = Math.floor;

      var RongFromCodePoint = function (codeList) {
        var MAX_SIZE = 0x4000;
        var codeUnits = [];
        var highSurrogate;
        var lowSurrogate;
        var index = -1;
        var length = codeList.length || [];

        if (!length) {
          return '';
        }

        var result = '';

        while (++index < length) {
          var codePoint = Number(codeList[index]);

          if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
          codePoint < 0 || // not a valid Unicode code point
          codePoint > 0x10FFFF || // not a valid Unicode code point
          floor(codePoint) != codePoint // not an integer
          ) {
              throw RangeError('Invalid code point: ' + codePoint);
            }

          if (codePoint <= 0xFFFF) {
            // BMP code point
            codeUnits.push(codePoint);
          } else {
            // Astral code point; split in surrogate halves
            // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            codePoint -= 0x10000;
            highSurrogate = (codePoint >> 10) + 0xD800;
            lowSurrogate = codePoint % 0x400 + 0xDC00;
            codeUnits.push(highSurrogate, lowSurrogate);
          }

          if (index + 1 == length || codeUnits.length > MAX_SIZE) {
            result += stringFromCharCode.apply(null, codeUnits);
            codeUnits.length = 0;
          }
        }

        return result;
      };

      if (defineProperty) {
        defineProperty(String, 'RongFromCodePoint', {
          'value': RongFromCodePoint,
          'configurable': true,
          'writable': true
        });
      } else {
        String.RongFromCodePoint = RongFromCodePoint;
      }
    })();

    function adaptOldVersion() {
      _export.emojis = Utils.map(EmojiList, function (item) {
        var unicode = item.unicode;
        var emojiDetail = EmojiFactory[unicode];
        var zh = emojiDetail.zh;
        var en = emojiDetail.en;
        var position = emojiDetail.position;
        en = en.replace(' ', '_').toLowerCase();
        var oldVersionStyle = "height: 24px; width: 24px; display: inline-block; font-size: 20px !important; text-align: center; vertical-align: middle;overflow: hidden; line-height: 24px;";
        var oldVersionBHtml = "<b style='width: 24px; height: 24px; display: inline-block; background-image: url({{url}}); background-position: {{position}}'></b>";
        oldVersionBHtml = Utils.render(oldVersionBHtml, {
          url: NornalImagePath,
          position: position
        });
        var oldVersionHtml = "<span name='[{{zh}}]' class='RongIMExpression_{{en}}' style='{{style}}'>{{b}}</span>";
        oldVersionHtml = Utils.render(oldVersionHtml, {
          zh: zh,
          en: en,
          b: oldVersionBHtml,
          style: oldVersionStyle
        });
        var spanHTML = "<span>" + oldVersionHtml + "</span>";
        return Utils.getDom(spanHTML);
      });

      _export.name = function () {
        var names = [];

        for (var key in EmojiFactory) {
          var value = EmojiFactory[key];
          var data = {};

          for (var i = 0; i < SupportLangs.length; i++) {
            var lang = SupportLangs[i];
            data[lang] = value[lang];
          }

          names.push(data);
        }

        return names;
      }();

      _export.data = Utils.map(EmojiList, function (item) {
        var data;

        for (var key in EmojiFactory) {
          var detail = EmojiFactory[key];

          if (detail.tag === item.emoji) {
            data = detail;
            detail.html = item.node;
          }
        }

        return data;
      });
    }

    return Utils.extend(_export, {
      isSupportEmoji: isSupportEmoji,
      init: init,
      list: EmojiList,
      emojiToSymbol: emojiToSymbol,
      symbolToEmoji: symbolToEmoji,
      emojiToHTML: emojiToHTML,
      symbolToHTML: symbolToHTML
    });
  });
});

var RongIMLib2_5_0=createCommonjsModule(function(module,exports){/* eslint-disable */ /*
    说明: 请勿修改 header.js 和 footer.js
    用途: 自动拼接暴露方式
    命令: grunt release 中 concat
*/(function(global,factory){{module.exports=factory();}})(window,function(){var Polling={SetUserStatusInput:function(){var a={};this.setStatus=function(b){a.status=b;};this.toArrayBuffer=function(){return a;};},SetUserStatusOutput:function(){var a={};this.setNothing=function(b){a.nothing=b;};this.toArrayBuffer=function(){return a;};},GetUserStatusInput:function(){var a={};this.setNothing=function(b){a.nothing=b;};this.toArrayBuffer=function(){return a;};},GetUserStatusOutput:function(){var a={};this.setStatus=function(b){a.status=b;};this.setSubUserId=function(b){a.subUserId=b;};this.toArrayBuffer=function(){return a;};},VoipDynamicInput:function(){var a={};this.setEngineType=function(b){a.engineType=b;};this.setChannelName=function(b){a.channelName=b;};this.setChannelExtra=function(b){a.channelExtra=b;};this.toArrayBuffer=function(){return a;};},VoipDynamicOutput:function(){var a={};this.setDynamicKey=function(b){a.dynamicKey=b;};this.toArrayBuffer=function(){return a;};},SubUserStatusInput:function(){var a={};this.setUserid=function(b){a.userid=b;};this.toArrayBuffer=function(){return a;};},SubUserStatusOutput:function(){var a={};this.setNothing=function(b){a.nothing=b;};this.toArrayBuffer=function(){return a;};},CleanHisMsgInput:function(){var a={};this.setTargetId=function(b){a.targetId=b;};this.setDataTime=function(b){a.dataTime=b;};this.setConversationType=function(b){a.conversationType=b;};this.toArrayBuffer=function(){return a;};},DeleteMsgInput:function(){var a={};this.setType=function(b){a.type=b;};this.setConversationId=function(b){a.conversationId=b;};this.setMsgs=function(b){a.msgs=b;};this.toArrayBuffer=function(){return a;};},DeleteMsg:function(){var a={};this.setMsgId=function(b){a.msgId=b;};this.setMsgDataTime=function(b){a.msgDataTime=b;};this.setDirect=function(b){a.direct=b;};this.toArrayBuffer=function(){return a;};},DeleteMsgOutput:function(){var a={};this.setNothing=function(b){a.nothing=b;};this.toArrayBuffer=function(){return a;};},SearchMpInput:function(){var a={};this.setType=function(b){a.type=b;};this.setId=function(b){a.id=b;};this.toArrayBuffer=function(){return a;};},SearchMpOutput:function(){var a={};this.setNothing=function(b){a.nothing=b;};this.setInfo=function(b){a.info=b;};this.toArrayBuffer=function(){return a;};},MpInfo:function(){var a={};this.setMpid=function(b){a.mpid=b;};this.setName=function(b){a.name=b;};this.setType=function(b){a.type=b;};this.setTime=function(b){a.time=b;};this.setPortraitUri=function(b){a.portraitUrl=b;};this.setExtra=function(b){a.extra=b;};this.toArrayBuffer=function(){return a;};},PullMpInput:function(){var a={};this.setMpid=function(b){a.mpid=b;};this.setTime=function(b){a.time=b;};this.toArrayBuffer=function(){return a;};},PullMpOutput:function(){var a={};this.setStatus=function(b){a.status=b;};this.setInfo=function(b){a.info=b;};this.toArrayBuffer=function(){return a;};},MPFollowInput:function(){var a={};this.setId=function(b){a.id=b;};this.toArrayBuffer=function(){return a;};},MPFollowOutput:function(){var a={};this.setNothing=function(b){a.nothing=b;};this.setInfo=function(b){a.info=b;};this.toArrayBuffer=function(){return a;};},NotifyMsg:function(){var a={};this.setType=function(b){a.type=b;};this.setTime=function(b){a.time=b;};this.setChrmId=function(b){a.chrmId=b;};this.toArrayBuffer=function(){return a;};},SyncRequestMsg:function(){var a={};this.setSyncTime=function(b){a.syncTime=b||0;};this.setIspolling=function(b){a.ispolling=!!b;};this.setIsweb=function(b){a.isweb=!!b;};this.setIsPullSend=function(b){a.isPullSend=!!b;};this.setSendBoxSyncTime=function(b){a.sendBoxSyncTime=b;};this.toArrayBuffer=function(){return a;};},UpStreamMessage:function(){var a={};this.setSessionId=function(b){a.sessionId=b;};this.setClassname=function(b){a.classname=b;};this.setContent=function(b){if(b)a.content=b;};this.setPushText=function(b){a.pushText=b;};this.setUserId=function(b){a.userId=b;};this.setAppData=function(b){a.appData=b;};this.toArrayBuffer=function(){return a;};},DownStreamMessages:function(){var a={};this.setList=function(b){a.list=b;};this.setSyncTime=function(b){a.syncTime=b;};this.setFinished=function(b){a.finished=b;};this.toArrayBuffer=function(){return a;};},DownStreamMessage:function(){var a={};this.setFromUserId=function(b){a.fromUserId=b;};this.setType=function(b){a.type=b;};this.setGroupId=function(b){a.groupId=b;};this.setClassname=function(b){a.classname=b;};this.setContent=function(b){if(b)a.content=b;};this.setDataTime=function(b){a.dataTime=b;};this.setStatus=function(b){a.status=b;};this.setMsgId=function(b){a.msgId=b;};this.toArrayBuffer=function(){return a;};},CreateDiscussionInput:function(){var a={};this.setName=function(b){a.name=b;};this.toArrayBuffer=function(){return a;};},CreateDiscussionOutput:function(){var a={};this.setId=function(b){a.id=b;};this.toArrayBuffer=function(){return a;};},ChannelInvitationInput:function(){var a={};this.setUsers=function(b){a.users=b;};this.toArrayBuffer=function(){return a;};},LeaveChannelInput:function(){var a={};this.setNothing=function(b){a.nothing=b;};this.toArrayBuffer=function(){return a;};},QueryChatroomInfoInput:function(){var a={};this.setCount=function(b){a.count=b;};this.setOrder=function(b){a.order=b;};this.toArrayBuffer=function(){return a;};},QueryChatroomInfoOutput:function(){var a={};this.setUserTotalNums=function(b){a.userTotalNums=b;};this.setUserInfos=function(b){a.userInfos=b;};this.toArrayBuffer=function(){return a;};},ChannelEvictionInput:function(){var a={};this.setUser=function(b){a.user=b;};this.toArrayBuffer=function(){return a;};},RenameChannelInput:function(){var a={};this.setName=function(b){a.name=b;};this.toArrayBuffer=function(){return a;};},ChannelInfoInput:function(){var a={};this.setNothing=function(b){a.nothing=b;};this.toArrayBuffer=function(){return a;};},ChannelInfoOutput:function(){var a={};this.setType=function(b){a.type=b;};this.setChannelId=function(b){a.channelId=b;};this.setChannelName=function(b){a.channelName=b;};this.setAdminUserId=function(b){a.adminUserId=b;};this.setFirstTenUserIds=function(b){a.firstTenUserIds=b;};this.setOpenStatus=function(b){a.openStatus=b;};this.toArrayBuffer=function(){return a;};},ChannelInfosInput:function(){var a={};this.setPage=function(b){a.page=b;};this.setNumber=function(b){a.number=b;};this.toArrayBuffer=function(){return a;};},ChannelInfosOutput:function(){var a={};this.setChannels=function(b){a.channels=b;};this.setTotal=function(b){a.total=b;};this.toArrayBuffer=function(){return a;};},MemberInfo:function(){var a={};this.setUserId=function(b){a.userId=b;};this.setUserName=function(b){a.userName=b;};this.setUserPortrait=function(b){a.userPortrait=b;};this.setExtension=function(b){a.extension=b;};this.toArrayBuffer=function(){return a;};},GroupMembersInput:function(){var a={};this.setPage=function(b){a.page=b;};this.setNumber=function(b){a.number=b;};this.toArrayBuffer=function(){return a;};},GroupMembersOutput:function(){var a={};this.setMembers=function(b){a.members=b;};this.setTotal=function(b){a.total=b;};this.toArrayBuffer=function(){return a;};},GetUserInfoInput:function(){var a={};this.setNothing=function(b){a.nothing=b;};this.toArrayBuffer=function(){return a;};},GetUserInfoOutput:function(){var a={};this.setUserId=function(b){a.userId=b;};this.setUserName=function(b){a.userName=b;};this.setUserPortrait=function(b){a.userPortrait=b;};this.toArrayBuffer=function(){return a;};},GetSessionIdInput:function(){var a={};this.setNothing=function(b){a.nothing=b;};this.toArrayBuffer=function(){return a;};},GetSessionIdOutput:function(){var a={};this.setSessionId=function(b){a.sessionId=b;};this.toArrayBuffer=function(){return a;};},GetQNupTokenInput:function(){var a={};this.setType=function(b){a.type=b;};this.toArrayBuffer=function(){return a;};},GetQNupTokenOutput:function(){var a={};this.setDeadline=function(b){a.deadline=b;};this.setToken=function(b){a.token=b;};this.toArrayBuffer=function(){return a;};},GetQNdownloadUrlInput:function(){var a={};this.setType=function(b){a.type=b;};this.setKey=function(b){a.key=b;};this.setFileName=function(b){a.fileName=b;};this.toArrayBuffer=function(){return a;};},GetQNdownloadUrlOutput:function(){var a={};this.setDownloadUrl=function(b){a.downloadUrl=b;};this.toArrayBuffer=function(){return a;};},Add2BlackListInput:function(){var a={};this.setUserId=function(b){a.userId=b;};this.toArrayBuffer=function(){return a;};},RemoveFromBlackListInput:function(){var a={};this.setUserId=function(b){a.userId=b;};this.toArrayBuffer=function(){return a;};},QueryBlackListInput:function(){var a={};this.setNothing=function(b){a.nothing=b;};this.toArrayBuffer=function(){return a;};},QueryBlackListOutput:function(){var a={};this.setUserIds=function(b){a.userIds=b;};this.toArrayBuffer=function(){return a;};},BlackListStatusInput:function(){var a={};this.setUserId=function(b){a.userId=b;};this.toArrayBuffer=function(){return a;};},BlockPushInput:function(){var a={};this.setBlockeeId=function(b){a.blockeeId=b;};this.toArrayBuffer=function(){return a;};},ModifyPermissionInput:function(){var a={};this.setOpenStatus=function(b){a.openStatus=b;};this.toArrayBuffer=function(){return a;};},GroupInput:function(){var a={};this.setGroupInfo=function(b){for(var i=0,arr=[];i<b.length;i++){arr.push({id:b[i].getContent().id,name:b[i].getContent().name});}a.groupInfo=arr;};this.toArrayBuffer=function(){return a;};},GroupOutput:function(){var a={};this.setNothing=function(b){a.nothing=b;};this.toArrayBuffer=function(){return a;};},GroupInfo:function(){var a={};this.setId=function(b){a.id=b;};this.setName=function(b){a.name=b;};this.getContent=function(){return a;};this.toArrayBuffer=function(){return a;};},GroupHashInput:function(){var a={};this.setUserId=function(b){a.userId=b;};this.setGroupHashCode=function(b){a.groupHashCode=b;};this.toArrayBuffer=function(){return a;};},GroupHashOutput:function(){var a={};this.setResult=function(b){a.result=b;};this.toArrayBuffer=function(){return a;};},ChrmInput:function(){var a={};this.setNothing=function(b){a.nothing=b;};this.toArrayBuffer=function(){return a;};},ChrmOutput:function(){var a={};this.setNothing=function(b){a.nothing=b;};this.toArrayBuffer=function(){return a;};},ChrmPullMsg:function(){var a={};this.setSyncTime=function(b){a.syncTime=b;};this.setCount=function(b){a.count=b;};this.toArrayBuffer=function(){return a;};},RelationsInput:function(){var a={};this.setType=function(b){a.type=b;};this.setMsg=function(b){a.msg=b;};this.setCount=function(b){a.count=b;};this.toArrayBuffer=function(){return a;};},RelationsOutput:function(){var a={};this.setInfo=function(b){a.info=b;};this.toArrayBuffer=function(){return a;};},RelationInfo:function(){var a={};this.setType=function(b){a.type=b;};this.setUserId=function(b){a.userId=b;};this.setMsg=function(b){a.msg=b;};this.toArrayBuffer=function(){return a;};},HistoryMessageInput:function(){var a={};this.setTargetId=function(b){a.targetId=b;};this.setDataTime=function(b){a.dataTime=b;};this.setSize=function(b){a.size=b;};this.toArrayBuffer=function(){return a;};},HistoryMessagesOuput:function(){var a={};this.setList=function(b){a.list=b;};this.setSyncTime=function(b){a.syncTime=b;};this.setHasMsg=function(b){a.hasMsg=b;};this.toArrayBuffer=function(){return a;};},HistoryMsgInput:function(){var a={};this.setTargetId=function(b){a.targetId=b;};this.setTime=function(b){a.time=b;};this.setCount=function(b){a.count=b;};this.setOrder=function(b){a.order=b;};this.toArrayBuffer=function(){return a;};},HistoryMsgOuput:function(){var a={};this.setList=function(b){a.list=b;};this.setSyncTime=function(b){a.syncTime=b;};this.setHasMsg=function(b){a.hasMsg=b;};this.toArrayBuffer=function(){return a;};}};for(var f in Polling){Polling[f].decode=function(b){var back={},val=JSON.parse(b)||eval("("+b+")");for(var i in val){back[i]=val[i];back["get"+i.charAt(0).toUpperCase()+i.slice(1)]=function(){return val[i];};}return back;};}/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */ /*jslint bitwise: true */ /*global unescape, define, module */var md5=function(){/*
    * Add integers, wrapping at 2^32. This uses 16-bit operations internally
    * to work around bugs in some JS interpreters.
    */function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF),msw=(x>>16)+(y>>16)+(lsw>>16);return msw<<16|lsw&0xFFFF;}/*
    * Bitwise rotate a 32-bit number to the left.
    */function bit_rol(num,cnt){return num<<cnt|num>>>32-cnt;}/*
    * These functions implement the four basic operations the algorithm uses.
    */function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);}function md5_ff(a,b,c,d,x,s,t){return md5_cmn(b&c|~b&d,a,b,x,s,t);}function md5_gg(a,b,c,d,x,s,t){return md5_cmn(b&d|c&~d,a,b,x,s,t);}function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t);}function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|~d),a,b,x,s,t);}/*
    * Calculate the MD5 of an array of little-endian words, and a bit length.
    */function binl_md5(x,len){/* append padding */x[len>>5]|=0x80<<len%32;x[(len+64>>>9<<4)+14]=len;var i,olda,oldb,oldc,oldd,a=1732584193,b=-271733879,c=-1732584194,d=271733878;for(i=0;i<x.length;i+=16){olda=a;oldb=b;oldc=c;oldd=d;a=md5_ff(a,b,c,d,x[i],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);}return [a,b,c,d];}/*
    * Convert an array of little-endian words to a string
    */function binl2rstr(input){var i,output='';for(i=0;i<input.length*32;i+=8){output+=String.fromCharCode(input[i>>5]>>>i%32&0xFF);}return output;}/*
    * Convert a raw string to an array of little-endian words
    * Characters >255 have their high-byte silently ignored.
    */function rstr2binl(input){var i,output=[];output[(input.length>>2)-1]=undefined;for(i=0;i<output.length;i+=1){output[i]=0;}for(i=0;i<input.length*8;i+=8){output[i>>5]|=(input.charCodeAt(i/8)&0xFF)<<i%32;}return output;}/*
    * Calculate the MD5 of a raw string
    */function rstr_md5(s){return binl2rstr(binl_md5(rstr2binl(s),s.length*8));}/*
    * Calculate the HMAC-MD5, of a key and some data (raw strings)
    */function rstr_hmac_md5(key,data){var i,bkey=rstr2binl(key),ipad=[],opad=[],hash;ipad[15]=opad[15]=undefined;if(bkey.length>16){bkey=binl_md5(bkey,key.length*8);}for(i=0;i<16;i+=1){ipad[i]=bkey[i]^0x36363636;opad[i]=bkey[i]^0x5C5C5C5C;}hash=binl_md5(ipad.concat(rstr2binl(data)),512+data.length*8);return binl2rstr(binl_md5(opad.concat(hash),512+128));}/*
    * Convert a raw string to a hex string
    */function rstr2hex(input){var hex_tab='0123456789abcdef',output='',x,i;for(i=0;i<input.length;i+=1){x=input.charCodeAt(i);output+=hex_tab.charAt(x>>>4&0x0F)+hex_tab.charAt(x&0x0F);}return output;}/*
    * Encode a string as utf-8
    */function str2rstr_utf8(input){return unescape(encodeURIComponent(input));}/*
    * Take string arguments and return either raw or hex encoded strings
    */function raw_md5(s){return rstr_md5(str2rstr_utf8(s));}function hex_md5(s){return rstr2hex(raw_md5(s));}function raw_hmac_md5(k,d){return rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d));}function hex_hmac_md5(k,d){return rstr2hex(raw_hmac_md5(k,d));}function md5(string,key,raw){if(!key){if(!raw){return hex_md5(string);}return raw_md5(string);}if(!raw){return hex_hmac_md5(key,string);}return raw_hmac_md5(key,string);}return md5;}();var RongIMLib;(function(RongIMLib){(function(MentionedType){MentionedType[MentionedType["ALL"]=1]="ALL";MentionedType[MentionedType["PART"]=2]="PART";})(RongIMLib.MentionedType||(RongIMLib.MentionedType={}));var MentionedType=RongIMLib.MentionedType;(function(MethodType){MethodType[MethodType["CUSTOMER_SERVICE"]=1]="CUSTOMER_SERVICE";MethodType[MethodType["RECALL"]=2]="RECALL";})(RongIMLib.MethodType||(RongIMLib.MethodType={}));var MethodType=RongIMLib.MethodType;(function(BlacklistStatus){/**
         * 在黑名单中。
         */BlacklistStatus[BlacklistStatus["IN_BLACK_LIST"]=0]="IN_BLACK_LIST";/**
         * 不在黑名单中。
         */BlacklistStatus[BlacklistStatus["NOT_IN_BLACK_LIST"]=1]="NOT_IN_BLACK_LIST";})(RongIMLib.BlacklistStatus||(RongIMLib.BlacklistStatus={}));var BlacklistStatus=RongIMLib.BlacklistStatus;(function(ConnectionChannel){ConnectionChannel[ConnectionChannel["XHR_POLLING"]=0]="XHR_POLLING";ConnectionChannel[ConnectionChannel["WEBSOCKET"]=1]="WEBSOCKET";//外部调用
ConnectionChannel[ConnectionChannel["HTTP"]=0]="HTTP";//外部调用
ConnectionChannel[ConnectionChannel["HTTPS"]=1]="HTTPS";})(RongIMLib.ConnectionChannel||(RongIMLib.ConnectionChannel={}));var ConnectionChannel=RongIMLib.ConnectionChannel;(function(CustomerType){CustomerType[CustomerType["ONLY_ROBOT"]=1]="ONLY_ROBOT";CustomerType[CustomerType["ONLY_HUMAN"]=2]="ONLY_HUMAN";CustomerType[CustomerType["ROBOT_FIRST"]=3]="ROBOT_FIRST";CustomerType[CustomerType["HUMAN_FIRST"]=4]="HUMAN_FIRST";})(RongIMLib.CustomerType||(RongIMLib.CustomerType={}));var CustomerType=RongIMLib.CustomerType;(function(GetChatRoomType){GetChatRoomType[GetChatRoomType["NONE"]=0]="NONE";GetChatRoomType[GetChatRoomType["SQQUENCE"]=1]="SQQUENCE";GetChatRoomType[GetChatRoomType["REVERSE"]=2]="REVERSE";})(RongIMLib.GetChatRoomType||(RongIMLib.GetChatRoomType={}));var GetChatRoomType=RongIMLib.GetChatRoomType;(function(ConnectionStatus){/**
         * 连接成功。
         */ConnectionStatus[ConnectionStatus["CONNECTED"]=0]="CONNECTED";/**
         * 连接中。
         */ConnectionStatus[ConnectionStatus["CONNECTING"]=1]="CONNECTING";/**
         * 断开连接。
         */ConnectionStatus[ConnectionStatus["DISCONNECTED"]=2]="DISCONNECTED";/**
         * 用户账户在其他设备登录，本机会被踢掉线。
         */ConnectionStatus[ConnectionStatus["KICKED_OFFLINE_BY_OTHER_CLIENT"]=6]="KICKED_OFFLINE_BY_OTHER_CLIENT";/**
         * websocket 连接失败
         */ConnectionStatus[ConnectionStatus["WEBSOCKET_UNAVAILABLE"]=7]="WEBSOCKET_UNAVAILABLE";/**
         * 网络不可用。
         */ConnectionStatus[ConnectionStatus["NETWORK_UNAVAILABLE"]=3]="NETWORK_UNAVAILABLE";/**
         * 域名错误
         */ConnectionStatus[ConnectionStatus["DOMAIN_INCORRECT"]=12]="DOMAIN_INCORRECT";/**
         * appkey 不正确
         */ConnectionStatus[ConnectionStatus["APPKEY_IS_FAKE"]=20]="APPKEY_IS_FAKE";/**
        *  连接关闭。
        */ConnectionStatus[ConnectionStatus["CONNECTION_CLOSED"]=4]="CONNECTION_CLOSED";/*
            互踢次数过多（count > 5），此时可能出现：在其它他设备登陆有 reconnect 逻辑
        */ConnectionStatus[ConnectionStatus["ULTRALIMIT"]=1101]="ULTRALIMIT";/*
            开始请求导航
        */ConnectionStatus[ConnectionStatus["REQUEST_NAVI"]=201]="REQUEST_NAVI";/*
            请求导航结束
        */ConnectionStatus[ConnectionStatus["RESPONSE_NAVI"]=202]="RESPONSE_NAVI";/*
            请求导航失败
        */ConnectionStatus[ConnectionStatus["RESPONSE_NAVI_ERROR"]=203]="RESPONSE_NAVI_ERROR";/*
            请求导航超时
        */ConnectionStatus[ConnectionStatus["RESPONSE_NAVI_TIMEOUT"]=204]="RESPONSE_NAVI_TIMEOUT";})(RongIMLib.ConnectionStatus||(RongIMLib.ConnectionStatus={}));var ConnectionStatus=RongIMLib.ConnectionStatus;(function(ConversationNotificationStatus){/**
         * 免打扰状态，关闭对应会话的通知提醒。
         */ConversationNotificationStatus[ConversationNotificationStatus["DO_NOT_DISTURB"]=0]="DO_NOT_DISTURB";/**
         * 提醒。
         */ConversationNotificationStatus[ConversationNotificationStatus["NOTIFY"]=1]="NOTIFY";})(RongIMLib.ConversationNotificationStatus||(RongIMLib.ConversationNotificationStatus={}));var ConversationNotificationStatus=RongIMLib.ConversationNotificationStatus;(function(ConversationType){ConversationType[ConversationType["NONE"]=0]="NONE";ConversationType[ConversationType["PRIVATE"]=1]="PRIVATE";ConversationType[ConversationType["DISCUSSION"]=2]="DISCUSSION";ConversationType[ConversationType["GROUP"]=3]="GROUP";ConversationType[ConversationType["CHATROOM"]=4]="CHATROOM";ConversationType[ConversationType["CUSTOMER_SERVICE"]=5]="CUSTOMER_SERVICE";ConversationType[ConversationType["SYSTEM"]=6]="SYSTEM";//默认关注 MC
ConversationType[ConversationType["APP_PUBLIC_SERVICE"]=7]="APP_PUBLIC_SERVICE";//手工关注 MP
ConversationType[ConversationType["PUBLIC_SERVICE"]=8]="PUBLIC_SERVICE";})(RongIMLib.ConversationType||(RongIMLib.ConversationType={}));var ConversationType=RongIMLib.ConversationType;(function(DiscussionInviteStatus){/**
         * 开放邀请。
         */DiscussionInviteStatus[DiscussionInviteStatus["OPENED"]=0]="OPENED";/**
         * 关闭邀请。
         */DiscussionInviteStatus[DiscussionInviteStatus["CLOSED"]=1]="CLOSED";})(RongIMLib.DiscussionInviteStatus||(RongIMLib.DiscussionInviteStatus={}));var DiscussionInviteStatus=RongIMLib.DiscussionInviteStatus;(function(ErrorCode){ErrorCode[ErrorCode["RECALL_MESSAGE"]=25101]="RECALL_MESSAGE";/**
         * 发送频率过快
         */ErrorCode[ErrorCode["SEND_FREQUENCY_TOO_FAST"]=20604]="SEND_FREQUENCY_TOO_FAST";ErrorCode[ErrorCode["RC_MSG_UNAUTHORIZED"]=20406]="RC_MSG_UNAUTHORIZED";/**
         * 群组 Id 无效
         */ErrorCode[ErrorCode["RC_DISCUSSION_GROUP_ID_INVALID"]=20407]="RC_DISCUSSION_GROUP_ID_INVALID";/**
         * 群组被禁言
         */ErrorCode[ErrorCode["FORBIDDEN_IN_GROUP"]=22408]="FORBIDDEN_IN_GROUP";/**
         * 不在讨论组。
         */ErrorCode[ErrorCode["NOT_IN_DISCUSSION"]=21406]="NOT_IN_DISCUSSION";/**
         * 不在群组。
         */ErrorCode[ErrorCode["NOT_IN_GROUP"]=22406]="NOT_IN_GROUP";/**
         * 不在聊天室。
         */ErrorCode[ErrorCode["NOT_IN_CHATROOM"]=23406]="NOT_IN_CHATROOM";/**
         *聊天室被禁言
         */ErrorCode[ErrorCode["FORBIDDEN_IN_CHATROOM"]=23408]="FORBIDDEN_IN_CHATROOM";/**
         * 聊天室中成员被踢出
         */ErrorCode[ErrorCode["RC_CHATROOM_USER_KICKED"]=23409]="RC_CHATROOM_USER_KICKED";/**
         * 聊天室不存在
         */ErrorCode[ErrorCode["RC_CHATROOM_NOT_EXIST"]=23410]="RC_CHATROOM_NOT_EXIST";/**
         * 聊天室成员已满
         */ErrorCode[ErrorCode["RC_CHATROOM_IS_FULL"]=23411]="RC_CHATROOM_IS_FULL";/**
         * 获取聊天室信息参数无效
         */ErrorCode[ErrorCode["RC_CHATROOM_PATAMETER_INVALID"]=23412]="RC_CHATROOM_PATAMETER_INVALID";/**
         * 聊天室异常
         */ErrorCode[ErrorCode["CHATROOM_GET_HISTORYMSG_ERROR"]=23413]="CHATROOM_GET_HISTORYMSG_ERROR";/**
         * 没有打开聊天室消息存储
         */ErrorCode[ErrorCode["CHATROOM_NOT_OPEN_HISTORYMSG_STORE"]=23414]="CHATROOM_NOT_OPEN_HISTORYMSG_STORE";/**
         * 敏感词屏蔽
         */ErrorCode[ErrorCode["SENSITIVE_SHIELD"]=21501]="SENSITIVE_SHIELD";ErrorCode[ErrorCode["SENSITIVE_REPLACE"]=21502]="SENSITIVE_REPLACE";ErrorCode[ErrorCode["TIMEOUT"]=-1]="TIMEOUT";/**
         * 未知原因失败。
         */ErrorCode[ErrorCode["UNKNOWN"]=-2]="UNKNOWN";/**
         * 加入讨论失败
         */ErrorCode[ErrorCode["JOIN_IN_DISCUSSION"]=21407]="JOIN_IN_DISCUSSION";/**
         * 创建讨论组失败
         */ErrorCode[ErrorCode["CREATE_DISCUSSION"]=21408]="CREATE_DISCUSSION";/**
         * 设置讨论组邀请状态失败
         */ErrorCode[ErrorCode["INVITE_DICUSSION"]=21409]="INVITE_DICUSSION";/**
         *获取用户失败
         */ErrorCode[ErrorCode["GET_USERINFO_ERROR"]=23407]="GET_USERINFO_ERROR";/**
         * 在黑名单中。
         */ErrorCode[ErrorCode["REJECTED_BY_BLACKLIST"]=405]="REJECTED_BY_BLACKLIST";/**
         * 通信过程中，当前 Socket 不存在。
         */ErrorCode[ErrorCode["RC_NET_CHANNEL_INVALID"]=30001]="RC_NET_CHANNEL_INVALID";/**
         * Socket 连接不可用。
         */ErrorCode[ErrorCode["RC_NET_UNAVAILABLE"]=30002]="RC_NET_UNAVAILABLE";/**
         * 通信超时。
         */ErrorCode[ErrorCode["RC_MSG_RESP_TIMEOUT"]=30003]="RC_MSG_RESP_TIMEOUT";/**
         * 导航操作时，Http 请求失败。
         */ErrorCode[ErrorCode["RC_HTTP_SEND_FAIL"]=30004]="RC_HTTP_SEND_FAIL";/**
         * HTTP 请求失败。
         */ErrorCode[ErrorCode["RC_HTTP_REQ_TIMEOUT"]=30005]="RC_HTTP_REQ_TIMEOUT";/**
         * HTTP 接收失败。
         */ErrorCode[ErrorCode["RC_HTTP_RECV_FAIL"]=30006]="RC_HTTP_RECV_FAIL";/**
         * 导航操作的 HTTP 请求，返回不是200。
         */ErrorCode[ErrorCode["RC_NAVI_RESOURCE_ERROR"]=30007]="RC_NAVI_RESOURCE_ERROR";/**
         * 导航数据解析后，其中不存在有效数据。
         */ErrorCode[ErrorCode["RC_NODE_NOT_FOUND"]=30008]="RC_NODE_NOT_FOUND";/**
         * 导航数据解析后，其中不存在有效 IP 地址。
         */ErrorCode[ErrorCode["RC_DOMAIN_NOT_RESOLVE"]=30009]="RC_DOMAIN_NOT_RESOLVE";/**
         * 创建 Socket 失败。
         */ErrorCode[ErrorCode["RC_SOCKET_NOT_CREATED"]=30010]="RC_SOCKET_NOT_CREATED";/**
         * Socket 被断开。
         */ErrorCode[ErrorCode["RC_SOCKET_DISCONNECTED"]=30011]="RC_SOCKET_DISCONNECTED";/**
         * PING 操作失败。
         */ErrorCode[ErrorCode["RC_PING_SEND_FAIL"]=30012]="RC_PING_SEND_FAIL";/**
         * PING 超时。
         */ErrorCode[ErrorCode["RC_PONG_RECV_FAIL"]=30013]="RC_PONG_RECV_FAIL";/**
         * 消息发送失败。
         */ErrorCode[ErrorCode["RC_MSG_SEND_FAIL"]=30014]="RC_MSG_SEND_FAIL";/**
         * 做 connect 连接时，收到的 ACK 超时。
         */ErrorCode[ErrorCode["RC_CONN_ACK_TIMEOUT"]=31000]="RC_CONN_ACK_TIMEOUT";/**
         * 参数错误。
         */ErrorCode[ErrorCode["RC_CONN_PROTO_VERSION_ERROR"]=31001]="RC_CONN_PROTO_VERSION_ERROR";/**
         * 参数错误，App Id 错误。
         */ErrorCode[ErrorCode["RC_CONN_ID_REJECT"]=31002]="RC_CONN_ID_REJECT";/**
         * 服务器不可用。
         */ErrorCode[ErrorCode["RC_CONN_SERVER_UNAVAILABLE"]=31003]="RC_CONN_SERVER_UNAVAILABLE";/**
         * Token 错误。
         */ErrorCode[ErrorCode["RC_CONN_USER_OR_PASSWD_ERROR"]=31004]="RC_CONN_USER_OR_PASSWD_ERROR";/**
         * App Id 与 Token 不匹配。
         */ErrorCode[ErrorCode["RC_CONN_NOT_AUTHRORIZED"]=31005]="RC_CONN_NOT_AUTHRORIZED";/**
         * 重定向，地址错误。
         */ErrorCode[ErrorCode["RC_CONN_REDIRECTED"]=31006]="RC_CONN_REDIRECTED";/**
         * NAME 与后台注册信息不一致。
         */ErrorCode[ErrorCode["RC_CONN_PACKAGE_NAME_INVALID"]=31007]="RC_CONN_PACKAGE_NAME_INVALID";/**
         * APP 被屏蔽、删除或不存在。
         */ErrorCode[ErrorCode["RC_CONN_APP_BLOCKED_OR_DELETED"]=31008]="RC_CONN_APP_BLOCKED_OR_DELETED";/**
         * 用户被屏蔽。
         */ErrorCode[ErrorCode["RC_CONN_USER_BLOCKED"]=31009]="RC_CONN_USER_BLOCKED";/**
         * Disconnect，由服务器返回，比如用户互踢。
         */ErrorCode[ErrorCode["RC_DISCONN_KICK"]=31010]="RC_DISCONN_KICK";/**
         * Disconnect，由服务器返回，比如用户互踢。
         */ErrorCode[ErrorCode["RC_DISCONN_EXCEPTION"]=31011]="RC_DISCONN_EXCEPTION";/**
         * 协议层内部错误。query，上传下载过程中数据错误。
         */ErrorCode[ErrorCode["RC_QUERY_ACK_NO_DATA"]=32001]="RC_QUERY_ACK_NO_DATA";/**
         * 协议层内部错误。
         */ErrorCode[ErrorCode["RC_MSG_DATA_INCOMPLETE"]=32002]="RC_MSG_DATA_INCOMPLETE";/**
         * 未调用 init 初始化函数。
         */ErrorCode[ErrorCode["BIZ_ERROR_CLIENT_NOT_INIT"]=33001]="BIZ_ERROR_CLIENT_NOT_INIT";/**
         * 数据库初始化失败。
         */ErrorCode[ErrorCode["BIZ_ERROR_DATABASE_ERROR"]=33002]="BIZ_ERROR_DATABASE_ERROR";/**
         * 传入参数无效。
         */ErrorCode[ErrorCode["BIZ_ERROR_INVALID_PARAMETER"]=33003]="BIZ_ERROR_INVALID_PARAMETER";/**
         * 通道无效。
         */ErrorCode[ErrorCode["BIZ_ERROR_NO_CHANNEL"]=33004]="BIZ_ERROR_NO_CHANNEL";/**
         * 重新连接成功。
         */ErrorCode[ErrorCode["BIZ_ERROR_RECONNECT_SUCCESS"]=33005]="BIZ_ERROR_RECONNECT_SUCCESS";/**
         * 连接中，再调用 connect 被拒绝。
         */ErrorCode[ErrorCode["BIZ_ERROR_CONNECTING"]=33006]="BIZ_ERROR_CONNECTING";/**
         * 消息漫游服务未开通
         */ErrorCode[ErrorCode["MSG_ROAMING_SERVICE_UNAVAILABLE"]=33007]="MSG_ROAMING_SERVICE_UNAVAILABLE";ErrorCode[ErrorCode["MSG_INSERT_ERROR"]=33008]="MSG_INSERT_ERROR";ErrorCode[ErrorCode["MSG_DEL_ERROR"]=33009]="MSG_DEL_ERROR";/**
         * 删除会话失败
         */ErrorCode[ErrorCode["CONVER_REMOVE_ERROR"]=34001]="CONVER_REMOVE_ERROR";/**
         *拉取历史消息
         */ErrorCode[ErrorCode["CONVER_GETLIST_ERROR"]=34002]="CONVER_GETLIST_ERROR";/**
         * 会话指定异常
         */ErrorCode[ErrorCode["CONVER_SETOP_ERROR"]=34003]="CONVER_SETOP_ERROR";/**
         * 获取会话未读消息总数失败
         */ErrorCode[ErrorCode["CONVER_TOTAL_UNREAD_ERROR"]=34004]="CONVER_TOTAL_UNREAD_ERROR";/**
         * 获取指定会话类型未读消息数异常
         */ErrorCode[ErrorCode["CONVER_TYPE_UNREAD_ERROR"]=34005]="CONVER_TYPE_UNREAD_ERROR";/**
         * 获取指定用户ID&会话类型未读消息数异常
         */ErrorCode[ErrorCode["CONVER_ID_TYPE_UNREAD_ERROR"]=34006]="CONVER_ID_TYPE_UNREAD_ERROR";ErrorCode[ErrorCode["CONVER_CLEAR_ERROR"]=34007]="CONVER_CLEAR_ERROR";ErrorCode[ErrorCode["CLEAR_HIS_ERROR"]=34010]="CLEAR_HIS_ERROR";ErrorCode[ErrorCode["CLEAR_HIS_TYPE_ERROR"]=34008]="CLEAR_HIS_TYPE_ERROR";ErrorCode[ErrorCode["CLEAR_HIS_TIME_ERROR"]=34011]="CLEAR_HIS_TIME_ERROR";/*
            
        */ErrorCode[ErrorCode["CONVER_GET_ERROR"]=34009]="CONVER_GET_ERROR";//群组异常信息
/**
         *
         */ErrorCode[ErrorCode["GROUP_SYNC_ERROR"]=35001]="GROUP_SYNC_ERROR";/**
         * 匹配群信息异常
         */ErrorCode[ErrorCode["GROUP_MATCH_ERROR"]=35002]="GROUP_MATCH_ERROR";//聊天室异常
/**
         * 加入聊天室Id为空
         */ErrorCode[ErrorCode["CHATROOM_ID_ISNULL"]=36001]="CHATROOM_ID_ISNULL";/**
         * 加入聊天室失败
         */ErrorCode[ErrorCode["CHARTOOM_JOIN_ERROR"]=36002]="CHARTOOM_JOIN_ERROR";/**
         * 拉取聊天室历史消息失败
         */ErrorCode[ErrorCode["CHATROOM_HISMESSAGE_ERROR"]=36003]="CHATROOM_HISMESSAGE_ERROR";//黑名单异常
/**
         * 加入黑名单异常
         */ErrorCode[ErrorCode["BLACK_ADD_ERROR"]=37001]="BLACK_ADD_ERROR";/**
         * 获得指定人员再黑名单中的状态异常
         */ErrorCode[ErrorCode["BLACK_GETSTATUS_ERROR"]=37002]="BLACK_GETSTATUS_ERROR";/**
         * 移除黑名单异常
         */ErrorCode[ErrorCode["BLACK_REMOVE_ERROR"]=37003]="BLACK_REMOVE_ERROR";/**
         * 获取草稿失败
         */ErrorCode[ErrorCode["DRAF_GET_ERROR"]=38001]="DRAF_GET_ERROR";/**
         * 保存草稿失败
         */ErrorCode[ErrorCode["DRAF_SAVE_ERROR"]=38002]="DRAF_SAVE_ERROR";/**
         * 删除草稿失败
         */ErrorCode[ErrorCode["DRAF_REMOVE_ERROR"]=38003]="DRAF_REMOVE_ERROR";/**
         * 关注公众号失败
         */ErrorCode[ErrorCode["SUBSCRIBE_ERROR"]=39001]="SUBSCRIBE_ERROR";/**
         * 关注公众号失败
         */ErrorCode[ErrorCode["QNTKN_FILETYPE_ERROR"]=41001]="QNTKN_FILETYPE_ERROR";/**
         * 获取七牛token失败
         */ErrorCode[ErrorCode["QNTKN_GET_ERROR"]=41002]="QNTKN_GET_ERROR";/**
         * cookie被禁用
         */ErrorCode[ErrorCode["COOKIE_ENABLE"]=51001]="COOKIE_ENABLE";ErrorCode[ErrorCode["GET_MESSAGE_BY_ID_ERROR"]=61001]="GET_MESSAGE_BY_ID_ERROR";// 没有注册DeviveId 也就是用户没有登陆
ErrorCode[ErrorCode["HAVNODEVICEID"]=24001]="HAVNODEVICEID";// 已经存在
ErrorCode[ErrorCode["DEVICEIDISHAVE"]=24002]="DEVICEIDISHAVE";// 成功
ErrorCode[ErrorCode["SUCCESS"]=0]="SUCCESS";// 没有对应的用户或token
ErrorCode[ErrorCode["FEILD"]=24009]="FEILD";// voip为空
ErrorCode[ErrorCode["VOIPISNULL"]=24013]="VOIPISNULL";// 不支持的Voip引擎
ErrorCode[ErrorCode["NOENGINETYPE"]=24010]="NOENGINETYPE";// channleName 是空
ErrorCode[ErrorCode["NULLCHANNELNAME"]=24011]="NULLCHANNELNAME";// 生成Voipkey失败
ErrorCode[ErrorCode["VOIPDYANMICERROR"]=24012]="VOIPDYANMICERROR";// 没有配置voip
ErrorCode[ErrorCode["NOVOIP"]=24014]="NOVOIP";// 服务器内部错误
ErrorCode[ErrorCode["INTERNALERRROR"]=24015]="INTERNALERRROR";//VOIP close
ErrorCode[ErrorCode["VOIPCLOSE"]=24016]="VOIPCLOSE";ErrorCode[ErrorCode["CLOSE_BEFORE_OPEN"]=51001]="CLOSE_BEFORE_OPEN";ErrorCode[ErrorCode["ALREADY_IN_USE"]=51002]="ALREADY_IN_USE";ErrorCode[ErrorCode["INVALID_CHANNEL_NAME"]=51003]="INVALID_CHANNEL_NAME";ErrorCode[ErrorCode["VIDEO_CONTAINER_IS_NULL"]=51004]="VIDEO_CONTAINER_IS_NULL";/**
        * 删除消息数组长度为 0 .
        */ErrorCode[ErrorCode["DELETE_MESSAGE_ID_IS_NULL"]=61001]="DELETE_MESSAGE_ID_IS_NULL";/*!
        己方取消已发出的通话请求
        */ErrorCode[ErrorCode["CANCEL"]=1]="CANCEL";/*!
         己方拒绝收到的通话请求
         */ErrorCode[ErrorCode["REJECT"]=2]="REJECT";/*!
         己方挂断
         */ErrorCode[ErrorCode["HANGUP"]=3]="HANGUP";/*!
         己方忙碌
         */ErrorCode[ErrorCode["BUSYLINE"]=4]="BUSYLINE";/*!
         己方未接听
         */ErrorCode[ErrorCode["NO_RESPONSE"]=5]="NO_RESPONSE";/*!
         己方不支持当前引擎
         */ErrorCode[ErrorCode["ENGINE_UN_SUPPORTED"]=6]="ENGINE_UN_SUPPORTED";/*!
         己方网络出错
         */ErrorCode[ErrorCode["NETWORK_ERROR"]=7]="NETWORK_ERROR";/*!
         对方取消已发出的通话请求
         */ErrorCode[ErrorCode["REMOTE_CANCEL"]=11]="REMOTE_CANCEL";/*!
         对方拒绝收到的通话请求
         */ErrorCode[ErrorCode["REMOTE_REJECT"]=12]="REMOTE_REJECT";/*!
         通话过程对方挂断
         */ErrorCode[ErrorCode["REMOTE_HANGUP"]=13]="REMOTE_HANGUP";/*!
         对方忙碌
         */ErrorCode[ErrorCode["REMOTE_BUSYLINE"]=14]="REMOTE_BUSYLINE";/*!
         对方未接听
         */ErrorCode[ErrorCode["REMOTE_NO_RESPONSE"]=15]="REMOTE_NO_RESPONSE";/*!
         对方网络错误
         */ErrorCode[ErrorCode["REMOTE_ENGINE_UN_SUPPORTED"]=16]="REMOTE_ENGINE_UN_SUPPORTED";/*!
         对方网络错误
         */ErrorCode[ErrorCode["REMOTE_NETWORK_ERROR"]=17]="REMOTE_NETWORK_ERROR";/*!
         VoIP 不可用
         */ErrorCode[ErrorCode["VOIP_NOT_AVALIABLE"]=18]="VOIP_NOT_AVALIABLE";})(RongIMLib.ErrorCode||(RongIMLib.ErrorCode={}));var ErrorCode=RongIMLib.ErrorCode;(function(VoIPMediaType){VoIPMediaType[VoIPMediaType["MEDIA_AUDIO"]=1]="MEDIA_AUDIO";VoIPMediaType[VoIPMediaType["MEDIA_VEDIO"]=2]="MEDIA_VEDIO";})(RongIMLib.VoIPMediaType||(RongIMLib.VoIPMediaType={}));var VoIPMediaType=RongIMLib.VoIPMediaType;(function(MediaType){/**
         * 图片。
         */MediaType[MediaType["IMAGE"]=1]="IMAGE";/**
         * 声音。
         */MediaType[MediaType["AUDIO"]=2]="AUDIO";/**
         * 视频。
         */MediaType[MediaType["VIDEO"]=3]="VIDEO";/**
         * 通用文件。
         */MediaType[MediaType["FILE"]=100]="FILE";})(RongIMLib.MediaType||(RongIMLib.MediaType={}));var MediaType=RongIMLib.MediaType;(function(MessageDirection){/**
         * 发送消息。
         */MessageDirection[MessageDirection["SEND"]=1]="SEND";/**
         * 接收消息。
         */MessageDirection[MessageDirection["RECEIVE"]=2]="RECEIVE";})(RongIMLib.MessageDirection||(RongIMLib.MessageDirection={}));var MessageDirection=RongIMLib.MessageDirection;(function(FileType){FileType[FileType["IMAGE"]=1]="IMAGE";FileType[FileType["AUDIO"]=2]="AUDIO";FileType[FileType["VIDEO"]=3]="VIDEO";FileType[FileType["FILE"]=4]="FILE";})(RongIMLib.FileType||(RongIMLib.FileType={}));var FileType=RongIMLib.FileType;(function(RealTimeLocationErrorCode){/**
         * 未初始化 RealTimeLocation 实例
         */RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_NOT_INIT"]=-1]="RC_REAL_TIME_LOCATION_NOT_INIT";/**
         * 执行成功。
         */RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_SUCCESS"]=0]="RC_REAL_TIME_LOCATION_SUCCESS";/**
         * 获取 RealTimeLocation 实例时返回
         * GPS 未打开。
         */RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_GPS_DISABLED"]=1]="RC_REAL_TIME_LOCATION_GPS_DISABLED";/**
         * 获取 RealTimeLocation 实例时返回
         * 当前会话不支持位置共享。
         */RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_CONVERSATION_NOT_SUPPORT"]=2]="RC_REAL_TIME_LOCATION_CONVERSATION_NOT_SUPPORT";/**
         * 获取 RealTimeLocation 实例时返回
         * 对方已发起位置共享。
         */RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_IS_ON_GOING"]=3]="RC_REAL_TIME_LOCATION_IS_ON_GOING";/**
         * Join 时返回
         * 当前位置共享已超过最大支持人数。
         */RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_EXCEED_MAX_PARTICIPANT"]=4]="RC_REAL_TIME_LOCATION_EXCEED_MAX_PARTICIPANT";/**
         * Join 时返回
         * 加入位置共享失败。
         */RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_JOIN_FAILURE"]=5]="RC_REAL_TIME_LOCATION_JOIN_FAILURE";/**
         * Start 时返回
         * 发起位置共享失败。
         */RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_START_FAILURE"]=6]="RC_REAL_TIME_LOCATION_START_FAILURE";/**
         * 网络不可用。
         */RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_NETWORK_UNAVAILABLE"]=7]="RC_REAL_TIME_LOCATION_NETWORK_UNAVAILABLE";})(RongIMLib.RealTimeLocationErrorCode||(RongIMLib.RealTimeLocationErrorCode={}));var RealTimeLocationErrorCode=RongIMLib.RealTimeLocationErrorCode;(function(RealTimeLocationStatus){/**
         * 空闲状态 （默认状态）
         * 对方或者自己都未发起位置共享业务，或者位置共享业务已结束。
         */RealTimeLocationStatus[RealTimeLocationStatus["RC_REAL_TIME_LOCATION_STATUS_IDLE"]=0]="RC_REAL_TIME_LOCATION_STATUS_IDLE";/**
         * 呼入状态 （待加入）
         * 1. 对方发起了位置共享业务，此状态下，自己只能选择加入。
         * 2. 自己从已连接的位置共享中退出。
         */RealTimeLocationStatus[RealTimeLocationStatus["RC_REAL_TIME_LOCATION_STATUS_INCOMING"]=1]="RC_REAL_TIME_LOCATION_STATUS_INCOMING";/**
         * 呼出状态 =（自己创建）
         * 1. 自己发起位置共享业务，对方只能选择加入。
         * 2. 对方从已连接的位置共享业务中退出。
         */RealTimeLocationStatus[RealTimeLocationStatus["RC_REAL_TIME_LOCATION_STATUS_OUTGOING"]=2]="RC_REAL_TIME_LOCATION_STATUS_OUTGOING";/**
         * 连接状态 （自己加入）
         * 对方加入了自己发起的位置共享，或者自己加入了对方发起的位置共享。
         */RealTimeLocationStatus[RealTimeLocationStatus["RC_REAL_TIME_LOCATION_STATUS_CONNECTED"]=3]="RC_REAL_TIME_LOCATION_STATUS_CONNECTED";})(RongIMLib.RealTimeLocationStatus||(RongIMLib.RealTimeLocationStatus={}));var RealTimeLocationStatus=RongIMLib.RealTimeLocationStatus;(function(ReceivedStatus){ReceivedStatus[ReceivedStatus["READ"]=1]="READ";ReceivedStatus[ReceivedStatus["LISTENED"]=2]="LISTENED";ReceivedStatus[ReceivedStatus["DOWNLOADED"]=4]="DOWNLOADED";ReceivedStatus[ReceivedStatus["RETRIEVED"]=8]="RETRIEVED";ReceivedStatus[ReceivedStatus["UNREAD"]=0]="UNREAD";})(RongIMLib.ReceivedStatus||(RongIMLib.ReceivedStatus={}));var ReceivedStatus=RongIMLib.ReceivedStatus;(function(ReadStatus){ReadStatus[ReadStatus["READ"]=1]="READ";ReadStatus[ReadStatus["LISTENED"]=2]="LISTENED";ReadStatus[ReadStatus["DOWNLOADED"]=4]="DOWNLOADED";ReadStatus[ReadStatus["RETRIEVED"]=8]="RETRIEVED";ReadStatus[ReadStatus["UNREAD"]=0]="UNREAD";})(RongIMLib.ReadStatus||(RongIMLib.ReadStatus={}));var ReadStatus=RongIMLib.ReadStatus;(function(SearchType){/**
         * 精确。
         */SearchType[SearchType["EXACT"]=0]="EXACT";/**
         * 模糊。
         */SearchType[SearchType["FUZZY"]=1]="FUZZY";})(RongIMLib.SearchType||(RongIMLib.SearchType={}));var SearchType=RongIMLib.SearchType;(function(SentStatus){/**
         * 发送中。
         */SentStatus[SentStatus["SENDING"]=10]="SENDING";/**
         * 发送失败。
         */SentStatus[SentStatus["FAILED"]=20]="FAILED";/**
         * 已发送。
         */SentStatus[SentStatus["SENT"]=30]="SENT";/**
         * 对方已接收。
         */SentStatus[SentStatus["RECEIVED"]=40]="RECEIVED";/**
         * 对方已读。
         */SentStatus[SentStatus["READ"]=50]="READ";/**
         * 对方已销毁。
         */SentStatus[SentStatus["DESTROYED"]=60]="DESTROYED";})(RongIMLib.SentStatus||(RongIMLib.SentStatus={}));var SentStatus=RongIMLib.SentStatus;(function(ConnectionState){ConnectionState[ConnectionState["ACCEPTED"]=0]="ACCEPTED";ConnectionState[ConnectionState["UNACCEPTABLE_PROTOCOL_VERSION"]=1]="UNACCEPTABLE_PROTOCOL_VERSION";ConnectionState[ConnectionState["IDENTIFIER_REJECTED"]=2]="IDENTIFIER_REJECTED";ConnectionState[ConnectionState["SERVER_UNAVAILABLE"]=3]="SERVER_UNAVAILABLE";/**
         * token无效
         */ConnectionState[ConnectionState["TOKEN_INCORRECT"]=4]="TOKEN_INCORRECT";ConnectionState[ConnectionState["NOT_AUTHORIZED"]=5]="NOT_AUTHORIZED";ConnectionState[ConnectionState["REDIRECT"]=6]="REDIRECT";ConnectionState[ConnectionState["PACKAGE_ERROR"]=7]="PACKAGE_ERROR";ConnectionState[ConnectionState["APP_BLOCK_OR_DELETE"]=8]="APP_BLOCK_OR_DELETE";ConnectionState[ConnectionState["BLOCK"]=9]="BLOCK";ConnectionState[ConnectionState["TOKEN_EXPIRE"]=10]="TOKEN_EXPIRE";ConnectionState[ConnectionState["DEVICE_ERROR"]=11]="DEVICE_ERROR";})(RongIMLib.ConnectionState||(RongIMLib.ConnectionState={}));var ConnectionState=RongIMLib.ConnectionState;(function(RTCAPIType){RTCAPIType[RTCAPIType["ROOM"]=1]="ROOM";RTCAPIType[RTCAPIType["PERSON"]=2]="PERSON";})(RongIMLib.RTCAPIType||(RongIMLib.RTCAPIType={}));var RTCAPIType=RongIMLib.RTCAPIType;})(RongIMLib||(RongIMLib={}));var RongIMLib;(function(RongIMLib){var RongIMClient=function(){function RongIMClient(){}RongIMClient.getInstance=function(){if(!RongIMClient._instance){throw new Error("RongIMClient is not initialized. Call .init() method first.");}return RongIMClient._instance;};RongIMClient.showError=function(errorInfo){var hasConsole=console&&console.error;if(hasConsole){console.error(JSON.stringify(errorInfo));}};RongIMClient.logger=function(params){var code=params.code;var errorInfo=RongIMClient.LogFactory[code]||params;errorInfo.funcName=params.funcName;errorInfo.msg=params.msg||errorInfo.msg;if(RongIMClient._memoryStore.depend.showError){RongIMClient.showError(errorInfo);}};RongIMClient.logCallback=function(callback,funcName){return {onSuccess:callback.onSuccess,onError:function(errorCode){RongIMClient.logger({code:errorCode,funcName:funcName});callback.onError(errorCode);}};};RongIMClient.logSendCallback=function(callback,funcName){return {onSuccess:callback.onSuccess,onError:function(errorCode,result){RongIMClient.logger({code:errorCode,funcName:funcName});callback.onError(errorCode,result);},onBefore:callback.onBefore};};/**
         * 初始化 SDK，在整个应用全局只需要调用一次。
         * @param appKey    开发者后台申请的 AppKey，用来标识应用。
         * @param dataAccessProvider 必须是DataAccessProvider的实例
         */RongIMClient.init=function(appKey,dataAccessProvider,options,callback){if(RongIMClient._instance){return RongIMClient._memoryStore.sdkInfo;}RongIMClient._instance=new RongIMClient();options=options||{};var protocol="http://",wsScheme='ws://';if(location.protocol=='https:'){wsScheme='wss://';protocol='https://';}var isPolling=false;if(typeof WebSocket!='function'){isPolling=true;}var isIntegrity=function(){//iOS 9 
var hasWS=typeof WebSocket;var integrity=typeof WebSocket.OPEN=='number';return hasWS&&integrity;};if(typeof WebSocket=='object'&&isIntegrity()){isPolling=false;}var supportUserData=function(){var element=document.documentElement;return element.addBehavior;};if(RongIMLib.RongUtil.supportLocalStorage()){RongIMClient._storageProvider=new RongIMLib.LocalStorageProvider();}else if(supportUserData()){RongIMClient._storageProvider=new RongIMLib.UserDataProvider();}else {RongIMClient._storageProvider=new RongIMLib.MemeoryProvider();}var serverIndex=RongIMClient._storageProvider.getItem('serverIndex');RongIMClient.serverStore.index=serverIndex||0;var pathTmpl='{0}{1}';var _serverPath={api:'api.cn.ronghub.com'};RongIMLib.RongUtil.forEach(_serverPath,function(path,key){_serverPath[key]=RongIMLib.RongUtil.stringFormat(pathTmpl,[protocol,path]);});RongIMLib.RongUtil.forEach(_serverPath,function(path,key){var hasProto=key in options;var config={path:options[key],tmpl:pathTmpl,protocol:protocol,sub:true};path=hasProto?RongIMLib.RongUtil.formatProtoclPath(config):path;options[key]=path;});var navigaters=options.navigaters||[];if(options.navi){navigaters=[options.navi];}if(!options.navi&&RongIMLib.RongUtil.isEqual(navigaters.length,0)){navigaters=['nav.cn.ronghub.com','nav2-cn.ronghub.com'];}RongIMLib.RongUtil.forEach(navigaters,function(navi,index){var config={path:navi,tmpl:pathTmpl,protocol:protocol,sub:true};navi=RongIMLib.RongUtil.formatProtoclPath(config);navigaters[index]=navi;});var _sourcePath={protobuf:'cdn.ronghub.com/protobuf-2.3.5.min.js'};RongIMLib.RongUtil.forEach(_sourcePath,function(path,key){_sourcePath[key]=RongIMLib.RongUtil.stringFormat(pathTmpl,[protocol,path]);});RongIMLib.RongUtil.extend(_sourcePath,options);var _defaultOpts={isPolling:isPolling,wsScheme:wsScheme,protocol:protocol,showError:true,openMp:true,snifferTime:2000,naviTimeout:5000,navigaters:navigaters,maxNaviRetry:10};delete options.navigaters;RongIMLib.RongUtil.extend(_defaultOpts,options);if(RongIMLib.RongUtil.isFunction(options.protobuf)){RongIMClient.Protobuf=options.protobuf;}RongIMClient.userStatusObserver=new RongIMLib.RongObserver();var pather=new RongIMLib.FeaturePatcher();pather.patchAll();var tempStore={token:"",callback:null,lastReadTime:new RongIMLib.LimitableMap(),historyMessageLimit:new RongIMLib.MemoryCache(),conversationList:[],appKey:appKey,publicServiceMap:new RongIMLib.PublicServiceMap(),providerType:1,deltaTime:0,filterMessages:[],isSyncRemoteConverList:true,otherDevice:false,custStore:{},converStore:{latestMessage:{}},connectAckTime:0,voipStategy:0,isFirstPingMsg:true,depend:options,listenerList:RongIMClient._memoryStore.listenerList,notification:{}};RongIMClient._memoryStore=tempStore;if(dataAccessProvider&&Object.prototype.toString.call(dataAccessProvider)=="[object Object]"){RongIMClient._dataAccessProvider=dataAccessProvider;}else {RongIMClient._dataAccessProvider=new RongIMLib.ServerDataProvider();}options.appCallback=callback;var sdkInfo=RongIMClient._dataAccessProvider.init(appKey,options);RongIMClient._memoryStore.sdkInfo=sdkInfo;// 兼容 c++ 设置导航，Web 端不生效
RongIMClient._dataAccessProvider.setServerInfo({navi:location.protocol+options.navi+'/navi.xml'});RongIMClient.MessageParams={TextMessage:{objectName:"RC:TxtMsg",msgTag:new RongIMLib.MessageTag(true,true)},ImageMessage:{objectName:"RC:ImgMsg",msgTag:new RongIMLib.MessageTag(true,true)},DiscussionNotificationMessage:{objectName:"RC:DizNtf",msgTag:new RongIMLib.MessageTag(false,true)},VoiceMessage:{objectName:"RC:VcMsg",msgTag:new RongIMLib.MessageTag(true,true)},RichContentMessage:{objectName:"RC:ImgTextMsg",msgTag:new RongIMLib.MessageTag(true,true)},FileMessage:{objectName:"RC:FileMsg",msgTag:new RongIMLib.MessageTag(true,true)},HQVoiceMessage:{objectName:"RC:HQVCMsg",msgTag:new RongIMLib.MessageTag(true,true)},HandshakeMessage:{objectName:"",msgTag:new RongIMLib.MessageTag(true,true)},UnknownMessage:{objectName:"",msgTag:new RongIMLib.MessageTag(true,true)},LocationMessage:{objectName:"RC:LBSMsg",msgTag:new RongIMLib.MessageTag(true,true)},InformationNotificationMessage:{objectName:"RC:InfoNtf",msgTag:new RongIMLib.MessageTag(false,true)},ContactNotificationMessage:{objectName:"RC:ContactNtf",msgTag:new RongIMLib.MessageTag(false,true)},ProfileNotificationMessage:{objectName:"RC:ProfileNtf",msgTag:new RongIMLib.MessageTag(false,true)},CommandNotificationMessage:{objectName:"RC:CmdNtf",msgTag:new RongIMLib.MessageTag(true,true)},PublicServiceRichContentMessage:{objectName:"RC:PSImgTxtMsg",msgTag:new RongIMLib.MessageTag(true,true)},PublicServiceMultiRichContentMessage:{objectName:"RC:PSMultiImgTxtMsg",msgTag:new RongIMLib.MessageTag(true,true)},JrmfRedPacketMessage:{objectName:"RCJrmf:RpMsg",msgTag:new RongIMLib.MessageTag(true,true)},JrmfRedPacketOpenedMessage:{objectName:"RCJrmf:RpOpendMsg",msgTag:new RongIMLib.MessageTag(true,true)},GroupNotificationMessage:{objectName:"RC:GrpNtf",msgTag:new RongIMLib.MessageTag(false,true)},CommandMessage:{objectName:"RC:CmdMsg",msgTag:new RongIMLib.MessageTag(false,false)},TypingStatusMessage:{objectName:"RC:TypSts",msgTag:new RongIMLib.MessageTag(false,false)},PublicServiceCommandMessage:{objectName:"RC:PSCmd",msgTag:new RongIMLib.MessageTag(false,false)},RecallCommandMessage:{objectName:"RC:RcCmd",msgTag:new RongIMLib.MessageTag(false,true)},SyncReadStatusMessage:{objectName:"RC:SRSMsg",msgTag:new RongIMLib.MessageTag(false,false)},ReadReceiptRequestMessage:{objectName:"RC:RRReqMsg",msgTag:new RongIMLib.MessageTag(false,false)},ReadReceiptResponseMessage:{objectName:"RC:RRRspMsg",msgTag:new RongIMLib.MessageTag(false,false)},ChangeModeResponseMessage:{objectName:"RC:CsChaR",msgTag:new RongIMLib.MessageTag(false,false)},ChangeModeMessage:{objectName:"RC:CSCha",msgTag:new RongIMLib.MessageTag(false,false)},EvaluateMessage:{objectName:"RC:CsEva",msgTag:new RongIMLib.MessageTag(false,false)},CustomerContact:{objectName:"RC:CsContact",msgTag:new RongIMLib.MessageTag(false,false)},HandShakeMessage:{objectName:"RC:CsHs",msgTag:new RongIMLib.MessageTag(false,false)},HandShakeResponseMessage:{objectName:"RC:CsHsR",msgTag:new RongIMLib.MessageTag(false,false)},SuspendMessage:{objectName:"RC:CsSp",msgTag:new RongIMLib.MessageTag(false,false)},TerminateMessage:{objectName:"RC:CsEnd",msgTag:new RongIMLib.MessageTag(false,false)},CustomerStatusUpdateMessage:{objectName:"RC:CsUpdate",msgTag:new RongIMLib.MessageTag(false,false)},ReadReceiptMessage:{objectName:"RC:ReadNtf",msgTag:new RongIMLib.MessageTag(false,false)}};RongIMClient.MessageParams["AcceptMessage"]={objectName:"RC:VCAccept",msgTag:new RongIMLib.MessageTag(false,false)};RongIMClient.MessageParams["RingingMessage"]={objectName:"RC:VCRinging",msgTag:new RongIMLib.MessageTag(false,false)};RongIMClient.MessageParams["SummaryMessage"]={objectName:"RC:VCSummary",msgTag:new RongIMLib.MessageTag(false,false)};RongIMClient.MessageParams["HungupMessage"]={objectName:"RC:VCHangup",msgTag:new RongIMLib.MessageTag(false,false)};RongIMClient.MessageParams["InviteMessage"]={objectName:"RC:VCInvite",msgTag:new RongIMLib.MessageTag(false,false)};RongIMClient.MessageParams["MediaModifyMessage"]={objectName:"RC:VCModifyMedia",msgTag:new RongIMLib.MessageTag(false,false)};RongIMClient.MessageParams["MemberModifyMessage"]={objectName:"RC:VCModifyMem",msgTag:new RongIMLib.MessageTag(false,false)};RongIMClient.MessageType={TextMessage:"TextMessage",ImageMessage:"ImageMessage",DiscussionNotificationMessage:"DiscussionNotificationMessage",VoiceMessage:"VoiceMessage",RichContentMessage:"RichContentMessage",HandshakeMessage:"HandshakeMessage",UnknownMessage:"UnknownMessage",LocationMessage:"LocationMessage",InformationNotificationMessage:"InformationNotificationMessage",ContactNotificationMessage:"ContactNotificationMessage",ProfileNotificationMessage:"ProfileNotificationMessage",CommandNotificationMessage:"CommandNotificationMessage",CommandMessage:"CommandMessage",TypingStatusMessage:"TypingStatusMessage",ChangeModeResponseMessage:"ChangeModeResponseMessage",ChangeModeMessage:"ChangeModeMessage",EvaluateMessage:"EvaluateMessage",HandShakeMessage:"HandShakeMessage",HandShakeResponseMessage:"HandShakeResponseMessage",SuspendMessage:"SuspendMessage",TerminateMessage:"TerminateMessage",CustomerContact:"CustomerContact",CustomerStatusUpdateMessage:"CustomerStatusUpdateMessage",SyncReadStatusMessage:"SyncReadStatusMessage",ReadReceiptRequestMessage:"ReadReceiptRequestMessage",ReadReceiptResponseMessage:"ReadReceiptResponseMessage",FileMessage:'FileMessage',HQVoiceMessage:'HQVoiceMessage',AcceptMessage:"AcceptMessage",RingingMessage:"RingingMessage",SummaryMessage:"SummaryMessage",HungupMessage:"HungupMessage",InviteMessage:"InviteMessage",MediaModifyMessage:"MediaModifyMessage",MemberModifyMessage:"MemberModifyMessage",JrmfRedPacketMessage:"JrmfRedPacketMessage",JrmfRedPacketOpenedMessage:"JrmfRedPacketOpenedMessage",GroupNotificationMessage:"GroupNotificationMessage",PublicServiceRichContentMessage:"PublicServiceRichContentMessage",PublicServiceMultiRichContentMessage:"PublicServiceMultiRichContentMessage",PublicServiceCommandMessage:"PublicServiceCommandMessage",RecallCommandMessage:"RecallCommandMessage",ReadReceiptMessage:"ReadReceiptMessage"};RongIMClient.LogFactory={/**
                 * 个人
                 */"-1":{code:"-1",msg:"服务器超时"},"-2":{code:"-2",msg:"未知原因失败"},"-3":{code:"-3",msg:"参数错误"},"-4":{code:"-4",msg:"参数不正确或尚未实例化"},"25101":{code:"25101",msg:"撤回消息参数错误",desc:"请检查撤回消息参数 https://rongcloud.github.io/websdk-demo/api-test.html"},"25102":{code:"25101",msg:"只能撤回自发发送的消息"},"20604":{code:"20604",msg:"发送频率过快",desc:"https://developer.rongcloud.cn/ticket/info/9Q3L6vRKd1cLS7rycA==?type=1"},"20406":{code:"20406",msg:"被禁言"},"23407":{code:"23407",msg:"获取用户失败"},/**
                 * 群组
                 */"20407":{code:"20407",msg:"群组Id无效"},"22408":{code:"22408",msg:"群组被禁言"},"22406":{code:"22406",msg:"不在群组"},"35001":{code:"35001",msg:"群组同步异常"},"35002":{code:"35002",msg:"匹配群信息异常"},/**
                 * 讨论组
                 */"21406":{code:"21406",msg:"不在讨论组"},"21407":{code:"21407",msg:"加入讨论失败"},"21408":{code:"21408",msg:"创建讨论组失败"},"21409":{code:"21409",msg:"设置讨论组邀请状态失败"},/**
                 * 聊天室
                 */"23406":{code:"23406",msg:"不在聊天室"},"23408":{code:"23408",msg:"聊天室被禁言"},"23409":{code:"23409",msg:"聊天室中成员被踢出"},"23410":{code:"23410",msg:"聊天室不存在"},"23411":{code:"23411",msg:"聊天室成员已满"},"23412":{code:"23412",msg:"获取聊天室信息参数无效"},"23413":{code:"23413",msg:"聊天室异常"},"23414":{code:"23414",msg:"没有打开聊天室消息存储"},"36001":{code:"36001",msg:"加入聊天室Id为空"},"36002":{code:"36002",msg:"加入聊天室失败"},"36003":{code:"36003",msg:"拉取聊天室历史消息失败"},/**
                 * voip
                 */"24001":{code:"24001",msg:"没有注册DeviveId 也就是用户没有登陆"},"24002":{code:"24002",msg:"用户已经存在"},"0":{code:"0",msg:"成功"},"24009":{code:"24009",msg:"没有对应的用户或token"},"24013":{code:"24013",msg:"voip为空"},"24010":{code:"24010",msg:"不支持的Voip引擎"},"24011":{code:"24011",msg:"channelName 是空"},"24012":{code:"24012",msg:"生成Voipkey失败"},"24014":{code:"24014",msg:"没有配置voip"},"24015":{code:"24015",msg:"服务器内部错误"},"24016":{code:"24016",msg:"VOIP close"},/**
                 * 通讯、导航
                 */"30001":{code:"30001",msg:"通信过程中，当前Socket不存在"},"30002":{code:"30002",msg:"Socket连接不可用"},"30003":{code:"30003",msg:"通信超时"},"30004":{code:"30004",msg:"导航操作时，Http请求失败"},"30005":{code:"30005",msg:"HTTP请求失败"},"30006":{code:"30006",msg:"HTTP接收失败"},"30007":{code:"30007",msg:"导航资源错误"},"30008":{code:"30008",msg:"没有有效数据"},"30009":{code:"30009",msg:"不存在有效 IP 地址"},"30010":{code:"30010",msg:"创建 Socket 失败"},"30011":{code:"30011",msg:" Socket 被断开"},"30012":{code:"30012",msg:"PING 操作失败"},"30013":{code:"30013",msg:"PING 超时"},"30014":{code:"30014",msg:"消息发送失败"},"30016":{code:"30016",msg:"消息大小超限，最大 128 KB"},/**
                 * 连接
                 */"31000":{code:"31000",msg:"做 connect 连接时，收到的 ACK 超时"},"31001":{code:"31001",msg:"参数错误"},"31002":{code:"31002",msg:"参数错误，App Id 错误"},"31003":{code:"31003",msg:"服务器不可用"},"31004":{code:"31004",msg:"Token 错误"},"31005":{code:"31005",msg:"App Id 与 Token 不匹配"},"31006":{code:"31006",msg:"重定向，地址错误"},"31007":{code:"31007",msg:"NAME 与后台注册信息不一致"},"31008":{code:"31008",msg:"APP 被屏蔽、删除或不存在"},"31009":{code:"31009",msg:"用户被屏蔽"},"31010":{code:"31010",msg:"Disconnect，由服务器返回，比如用户互踢"},"31011":{code:"31011",msg:"Disconnect，由服务器返回，比如用户互踢"},/**
                 * 协议
                 */"32001":{code:"32001",msg:"协议层内部错误。query，上传下载过程中数据错误"},"32002":{code:"32002",msg:"协议层内部错误"},/**
                 * BIZ
                 */"33001":{code:"33001",msg:"未调用 init 初始化函数"},"33002":{code:"33002",msg:"数据库初始化失败"},"33003":{code:"33003",msg:"传入参数无效"},"33004":{code:"33004",msg:"通道无效"},"33005":{code:"33005",msg:"重新连接成功"},"33006":{code:"33006",msg:"连接中，再调用 connect 被拒绝"},"33007":{code:"33007",msg:"消息漫游服务未开通"},"33008":{code:"33008",msg:"消息添加失败"},"33009":{code:"33009",msg:"消息删除失败"},/**
                 * 会话
                 */"34001":{code:"34001",msg:"删除会话失败"},"34002":{code:"34002",msg:"拉取历史消息失败"},"34003":{code:"34003",msg:"会话指定异常"},"34004":{code:"34004",msg:"获取会话未读消息总数失败"},"34005":{code:"34005",msg:"获取指定会话类型未读消息数异常"},"34006":{code:"34006",msg:"获取指定用户ID&会话类型未读消息数异常"},"34007":{code:"34007",msg:"清除会话消息异常"},"34008":{code:"34008",msg:"获取会话消息异常"},"34009":{code:"34009",msg:"清除历史消息会话类型不正确"},"34010":{code:"34010",msg:"清除历史消息失败，请检查传入参数"},/**
                 * 黑名单异常
                 */"37001":{code:"37001",msg:"加入黑名单异常"},"37002":{code:"37002",msg:"获得指定人员再黑名单中的状态异常"},"37003":{code:"37003",msg:"移除黑名单异常"},"405":{code:"405",msg:"在黑名单中"},/**
                 * 草稿
                 */"38001":{code:"38001",msg:"获取草稿失败"},"38002":{code:"38002",msg:"保存草稿失败"},"38003":{code:"38003",msg:"删除草稿失败"},/**
                 * 公众号
                 */"39001":{code:"39001",msg:"关注公众号失败"},/**
                 * 文件
                 */"41001":{code:"41001",msg:"文件类型错误"},"41002":{code:"41002",msg:"获取七牛token失败"},/**
                 *
                 */"51001":{code:"51001",msg:"未安装或未启动插件"},"51002":{code:"51002",msg:"视频已经存在"},"51003":{code:"51003",msg:"无效的channelName"},"51004":{code:"51004",msg:"视频内容为空"},/**
                 *
                 */"61001":{code:"61001",msg:"删除消息数组长度为 0"}};return sdkInfo;};/**
            var config = {
                appkey: appkey,
                token: token,
                dataAccessProvider:dataAccessProvider,
                opts: opts
            };
            callback(_instance, userId);
        */RongIMClient.initApp=function(config,callback){RongIMClient.init(config.appkey,config.dataAccessProvider,config.opts,function(){var instance=RongIMClient._instance;//备用
var error=null;callback(error,instance);});};/**
         * 连接服务器，在整个应用全局只需要调用一次，断线后 SDK 会自动重连。
         *
         * @param token     从服务端获取的用户身份令牌（Token）。
         * @param callback  连接回调，返回连接的成功或者失败状态。
         */RongIMClient.connect=function(token,_callback,userId,serverConf){RongIMLib.CheckParam.getInstance().check(["string","object","string|null|object|global|undefined","object|null|global|undefined"],"connect",true,arguments);var connectCallback={onSuccess:_callback.onSuccess,onTokenIncorrect:_callback.onTokenIncorrect,onError:function(errorCode){RongIMClient.logger({code:errorCode,funcName:"connect"});_callback.onError(errorCode);}};RongIMClient._dataAccessProvider.connect(token,connectCallback,userId,serverConf);};RongIMClient.reconnect=function(callback,config){var connectCallback={onSuccess:callback.onSuccess,onTokenIncorrect:callback.onTokenIncorrect,onError:function(errorCode){RongIMClient.logger({code:errorCode,funcName:"connect"});callback.onError(errorCode);}};RongIMClient._dataAccessProvider.reconnect(connectCallback,config);};/**
         * 注册消息类型，用于注册用户自定义的消息。
         * 内建的消息类型已经注册过，不需要再次注册。
         * 自定义消息声明需放在执行顺序最高的位置（在RongIMClient.init(appkey)之后即可）
         * @param objectName  消息内置名称
         */RongIMClient.registerMessageType=function(messageType,objectName,messageTag,messageContent,searchProps){RongIMClient._dataAccessProvider.registerMessageType(messageType,objectName,messageTag,messageContent,searchProps);RongIMClient.RegisterMessage[messageType].messageName=messageType;RongIMClient.MessageType[messageType]=messageType;RongIMClient.MessageParams[messageType]={objectName:objectName,msgTag:messageTag};};RongIMClient.prototype.registerMessageTypes=function(types){types=types||{};RongIMClient._dataAccessProvider.registerMessageTypes(types);};/**
         * 设置连接状态变化的监听器。
         *
         * @param listener  连接状态变化的监听器。
         */RongIMClient.setConnectionStatusListener=function(listener){if(RongIMClient._dataAccessProvider){RongIMClient._dataAccessProvider.setConnectionStatusListener(listener);}else {RongIMClient._memoryStore.listenerList.push(listener);}};RongIMClient.statusWatch=function(watcher){if(typeof watcher=='function'){RongIMClient.statusListeners.push(watcher);}};/**
         * 设置接收消息的监听器。
         *
         * @param listener  接收消息的监听器。
         */RongIMClient.setOnReceiveMessageListener=function(listener){if(RongIMClient._dataAccessProvider){RongIMClient._dataAccessProvider.setOnReceiveMessageListener(listener);}else {RongIMClient._memoryStore.listenerList.push(listener);}};/**
         * 清理所有连接相关的变量
         */RongIMClient.prototype.logout=function(){RongIMClient._dataAccessProvider.logout();};/**
         * 断开连接。
         */RongIMClient.prototype.disconnect=function(){RongIMClient._dataAccessProvider.disconnect();};RongIMClient.prototype.startCustomService=function(custId,callback,content){if(!custId||!callback)return;var msg=new RongIMLib.HandShakeMessage(content);var me=this;RongIMLib.RongIMClient._memoryStore.custStore["isInit"]=true;RongIMClient.getInstance().sendMessage(RongIMLib.ConversationType.CUSTOMER_SERVICE,custId,msg,{onSuccess:function(data){if(data.isBlack){callback.onError();me.stopCustomeService(custId,{onSuccess:function(){},onError:function(){}});}else {callback.onSuccess();}},onError:function(){callback.onError();},onBefore:function(){}});};RongIMClient.prototype.stopCustomeService=function(custId,callback){if(!custId||!callback)return;var session=RongIMClient._memoryStore.custStore[custId];if(!session)return;var msg=new RongIMLib.SuspendMessage({sid:session.sid,uid:session.uid,pid:session.pid});this.sendCustMessage(custId,msg,{onSuccess:function(){// delete RongIMClient._memoryStore.custStore[custId];
setTimeout(function(){callback.onSuccess();});},onError:function(){setTimeout(function(){callback.onError();});}});};RongIMClient.prototype.switchToHumanMode=function(custId,callback){if(!custId||!callback)return;var session=RongIMClient._memoryStore.custStore[custId];if(!session)return;var msg=new RongIMLib.ChangeModeMessage({sid:session.sid,uid:session.uid,pid:session.pid});this.sendCustMessage(custId,msg,callback);};RongIMClient.prototype.evaluateRebotCustomService=function(custId,isRobotResolved,sugest,callback){if(!custId||!callback)return;var session=RongIMClient._memoryStore.custStore[custId];if(!session)return;var msg=new RongIMLib.EvaluateMessage({sid:session.sid,uid:session.uid,pid:session.pid,isRobotResolved:isRobotResolved,sugest:sugest,type:0});this.sendCustMessage(custId,msg,callback);};RongIMClient.prototype.evaluateHumanCustomService=function(custId,humanValue,sugest,callback){if(!custId||!callback)return;var session=RongIMClient._memoryStore.custStore[custId];if(!session)return;var msg=new RongIMLib.EvaluateMessage({sid:session.sid,uid:session.uid,pid:session.pid,humanValue:humanValue,sugest:sugest,type:1});this.sendCustMessage(custId,msg,callback);};RongIMClient.prototype.sendCustMessage=function(custId,msg,callback){RongIMClient.getInstance().sendMessage(RongIMLib.ConversationType.CUSTOMER_SERVICE,custId,msg,{onSuccess:function(data){callback.onSuccess();},onError:function(){callback.onError();},onBefore:function(){}});};/**
         * 获取当前连接的状态。
         */RongIMClient.prototype.getCurrentConnectionStatus=function(){return RongIMClient._dataAccessProvider.getCurrentConnectionStatus();};/**
         * 获取当前使用的连接通道。
         */RongIMClient.prototype.getConnectionChannel=function(){if(RongIMLib.Transportations._TransportType==RongIMLib.Socket.XHR_POLLING){return RongIMLib.ConnectionChannel.XHR_POLLING;}else if(RongIMLib.Transportations._TransportType==RongIMLib.Socket.WEBSOCKET){return RongIMLib.ConnectionChannel.WEBSOCKET;}};/**
         * 获取当前使用的本地储存提供者。 TODO
         */RongIMClient.prototype.getStorageProvider=function(){if(RongIMClient._memoryStore.providerType==1){return "ServerDataProvider";}else {return "OtherDataProvider";}};/**
         * 过滤聊天室消息（拉取最近聊天消息）
         * @param {string[]} msgFilterNames
         */RongIMClient.prototype.setFilterMessages=function(msgFilterNames){if(Object.prototype.toString.call(msgFilterNames)=="[object Array]"){RongIMClient._memoryStore.filterMessages=msgFilterNames;}};RongIMClient.prototype.getAgoraDynamicKey=function(engineType,channelName,callback){RongIMClient._dataAccessProvider.getAgoraDynamicKey(engineType,channelName,callback);};/**
         * 获取当前连接用户的 UserId。
         */RongIMClient.prototype.getCurrentUserId=function(){return RongIMLib.Bridge._client.userId;};/**
         * 获取服务器时间与本地时间的差值，单位为毫秒。
         * 计算公式：差值 = 本地时间毫秒数 - 服务器时间毫秒数
         * @param callback  获取的回调，返回差值。
         */RongIMClient.prototype.getDeltaTime=function(){return RongIMClient._dataAccessProvider.getDelaTime();};// #region Message
RongIMClient.prototype.getMessage=function(messageId,callback){RongIMClient._dataAccessProvider.getMessage(messageId,RongIMClient.logCallback(callback,"getMessage"));};RongIMClient.prototype.deleteLocalMessages=function(conversationType,targetId,messageIds,callback){RongIMClient._dataAccessProvider.removeLocalMessage(conversationType,targetId,messageIds,RongIMClient.logCallback(callback,"deleteLocalMessages"));};RongIMClient.prototype.updateMessage=function(message,callback){RongIMClient._dataAccessProvider.updateMessage(message,RongIMClient.logCallback(callback,"updateMessage"));};RongIMClient.prototype.clearData=function(){return RongIMClient._dataAccessProvider.clearData();};RongIMClient.prototype.clearMessages=function(conversationType,targetId,callback){RongIMClient._dataAccessProvider.clearMessages(conversationType,targetId,{onSuccess:function(bool){setTimeout(function(){callback.onSuccess(bool);});},onError:function(errorCode){setTimeout(function(){RongIMClient.logger({code:errorCode,funcName:"clearMessages"});callback.onError(errorCode);});}});};/**TODO 清楚本地存储的未读消息，目前清空内存中的未读消息
         * [clearMessagesUnreadStatus 清空指定会话未读消息]
         * @param  {ConversationType}        conversationType [会话类型]
         * @param  {string}                  targetId         [用户id]
         * @param  {ResultCallback<boolean>} callback         [返回值，参数回调]
         */RongIMClient.prototype.clearMessagesUnreadStatus=function(conversationType,targetId,callback){RongIMClient._dataAccessProvider.updateMessages(conversationType,targetId,"readStatus",null,{onSuccess:function(bool){setTimeout(function(){callback.onSuccess(bool);});},onError:function(errorCode){setTimeout(function(){RongIMClient.logger({code:errorCode,funcName:"clearMessagesUnreadStatus"});callback.onError(errorCode);});}});};RongIMClient.prototype.deleteRemoteMessages=function(conversationType,targetId,delMsgs,callback){RongIMLib.CheckParam.getInstance().check(["number","string|number","array","object"],"deleteRemoteMessages",false,arguments);if(delMsgs.length==0){var errorCode=RongIMLib.ErrorCode.DELETE_MESSAGE_ID_IS_NULL;RongIMClient.logger({code:errorCode,funcName:"deleteRemoteMessages"});callback.onError(RongIMLib.ErrorCode.DELETE_MESSAGE_ID_IS_NULL);return;}else if(delMsgs.length>100){delMsgs.length=100;}// 后续增加，去掉注释即可
callback.onSuccess(true);// var modules = new RongIMClient.Protobuf.DeleteMsgInput();
// modules.setType(conversationType);
// modules.setConversationId(targetId);
// modules.setMsgs(delMsgs);
// RongIMClient.bridge.queryMsg(33, MessageUtil.ArrayForm(modules.toArrayBuffer()), Bridge._client.userId, {
//     onSuccess: function(info: any) {
//         callback.onSuccess(true);
//     },
//     onError: function(err: any) {
//         callback.onError(err);
//     }
// }, "DeleteMsgOutput");
};/**
         * [deleteMessages 删除消息记录。]
         * @param  {ConversationType}        conversationType [description]
         * @param  {string}                  targetId         [description]
         * @param  {number[]}                messageIds       [description]
         * @param  {ResultCallback<boolean>} callback         [description]
         */RongIMClient.prototype.deleteMessages=function(conversationType,targetId,delMsgs,callback){RongIMClient._dataAccessProvider.removeMessage(conversationType,targetId,delMsgs,{onSuccess:function(bool){setTimeout(function(){callback.onSuccess(bool);});},onError:function(errorCode){setTimeout(function(){RongIMClient.logger({code:errorCode,funcName:"deleteMessages"});callback.onError(errorCode);});}});};RongIMClient.prototype.sendLocalMessage=function(message,callback){RongIMLib.CheckParam.getInstance().check(["object","object"],"sendLocalMessage",false,arguments);RongIMClient._dataAccessProvider.updateMessage(message);this.sendMessage(message.conversationType,message.targetId,message.content,RongIMClient.logSendCallback(callback,"sendLocalMessage"));};/**
         * [sendMessage 发送消息。]
         * @param  {ConversationType}        conversationType [会话类型]
         * @param  {string}                  targetId         [目标Id]
         * @param  {MessageContent}          messageContent   [消息类型]
         * @param  {SendMessageCallback}     sendCallback     []
         * @param  {ResultCallback<Message>} resultCallback   [返回值，函数回调]
         * @param  {string}                  pushContent      []
         * @param  {string}                  pushData         []
         */RongIMClient.prototype.sendMessage=function(conversationType,targetId,messageContent,sendCallback,mentiondMsg,pushText,appData,methodType,params){RongIMLib.CheckParam.getInstance().check(["number","string|number","object","object","undefined|object|null|global|boolean","undefined|object|null|global|string","undefined|object|null|global|string","undefined|object|null|global|number","undefined|object|null|global"],"sendMessage",false,arguments);RongIMClient._dataAccessProvider.sendMessage(conversationType,targetId,messageContent,RongIMClient.logSendCallback(sendCallback,"sendMessage"),mentiondMsg,pushText,appData,methodType,params);};RongIMClient.prototype.sendReceiptResponse=function(conversationType,targetId,sendCallback){RongIMClient._dataAccessProvider.sendReceiptResponse(conversationType,targetId,RongIMClient.logSendCallback(sendCallback,"sendReceiptResponse"));};RongIMClient.prototype.sendTypingStatusMessage=function(conversationType,targetId,messageName,sendCallback){RongIMClient._dataAccessProvider.sendTypingStatusMessage(conversationType,targetId,messageName,RongIMClient.logSendCallback(sendCallback,"sendTypingStatusMessage"));};/**
         * [sendStatusMessage description]
         * @param  {MessageContent}          messageContent [description]
         * @param  {SendMessageCallback}     sendCallback   [description]
         * @param  {ResultCallback<Message>} resultCallback [description]
         */RongIMClient.prototype.sendStatusMessage=function(messageContent,sendCallback,resultCallback){throw new Error("Not implemented yet");};/**
         * [sendTextMessage 发送TextMessage快捷方式]
         * @param  {string}                  content        [消息内容]
         * @param  {ResultCallback<Message>} resultCallback [返回值，参数回调]
         */RongIMClient.prototype.sendTextMessage=function(conversationType,targetId,content,sendMessageCallback){RongIMClient._dataAccessProvider.sendTextMessage(conversationType,targetId,content,RongIMClient.logSendCallback(sendMessageCallback,"sendTextMessage"));};RongIMClient.prototype.sendRecallMessage=function(content,sendMessageCallback){var callback=RongIMClient.logSendCallback(sendMessageCallback,"sendRecallMessage");var senderUserId=content.senderUserId;var userId=RongIMLib.Bridge._client.userId;var isOther=senderUserId!=userId;if(isOther){var callback=RongIMClient.logSendCallback(sendMessageCallback,"sendRecallMessage");callback.onError(RongIMLib.ErrorCode.RECALL_MESSAGE,content);return;}RongIMClient._dataAccessProvider.sendRecallMessage(content,callback);};/**
         * [insertMessage 向本地插入一条消息，不发送到服务器。]
         * @param  {ConversationType}        conversationType [description]
         * @param  {string}                  targetId         [description]
         * @param  {string}                  senderUserId     [description]
         * @param  {MessageContent}          content          [description]
         * @param  {ResultCallback<Message>} callback         [description]
         */RongIMClient.prototype.insertMessage=function(conversationType,targetId,content,callback){RongIMClient._dataAccessProvider.addMessage(conversationType,targetId,content,RongIMClient.logCallback(callback,"insertMessage"));};RongIMClient.prototype.setMessageContent=function(messageId,content,objectName){RongIMClient._dataAccessProvider.setMessageContent(messageId,content,objectName);};RongIMClient.prototype.setMessageSearchField=function(messageId,content,searchFiles){RongIMClient._dataAccessProvider.setMessageContent(messageId,content,searchFiles);};/**
         * [getHistoryMessages 拉取历史消息记录。]
         * @param  {ConversationType}          conversationType [会话类型]
         * @param  {string}                    targetId         [用户Id]
         * @param  {number|null}               pullMessageTime  [拉取历史消息起始位置(格式为毫秒数)，可以为null]
         * @param  {number}                    count            [历史消息数量]
         * @param  {ResultCallback<Message[]>} callback         [回调函数]
         * @param  {string}                    objectName       [objectName]
         */RongIMClient.prototype.getHistoryMessages=function(conversationType,targetId,timestamp,count,callback,objectname,order){RongIMLib.CheckParam.getInstance().check(["number","string|number","number|null|global|object","number","object","undefined|object|null|global|string","number|null|global|object"],"getHistoryMessages",false,arguments);if(count>20){throw new Error("HistroyMessage count must be less than or equal to 20!");}if(conversationType.valueOf()<0){throw new Error("ConversationType must be greater than -1");}RongIMClient._dataAccessProvider.getHistoryMessages(conversationType,targetId,timestamp,count,RongIMClient.logCallback(callback,"getHistoryMessages"),objectname,order);};/**
         * [getRemoteHistoryMessages 拉取某个时间戳之前的消息]
         * @param  {ConversationType}          conversationType [description]
         * @param  {string}                    targetId         [description]
         * @param  {Date}                      dateTime         [description]
         * @param  {number}                    count            [description]
         * @param  {ResultCallback<Message[]>} callback         [description]
         */RongIMClient.prototype.getRemoteHistoryMessages=function(conversationType,targetId,timestamp,count,callback,config){RongIMLib.CheckParam.getInstance().check(["number","string|number","number|null|global|object","number","object","undefined|null|global|object"],"getRemoteHistoryMessages",false,arguments);var funcName="getRemoteHistoryMessages";var log={errorCode:RongIMLib.ErrorCode.RC_CONN_PROTO_VERSION_ERROR,funcName:"getRemoteHistoryMessages"};if(count>20){RongIMClient.logger(log);callback.onError(RongIMLib.ErrorCode.RC_CONN_PROTO_VERSION_ERROR);return;}if(conversationType.valueOf()<0){RongIMClient.logger(log);callback.onError(RongIMLib.ErrorCode.RC_CONN_PROTO_VERSION_ERROR);return;}RongIMClient._dataAccessProvider.getRemoteHistoryMessages(conversationType,targetId,timestamp,count,RongIMClient.logCallback(callback,funcName),config);};RongIMClient.prototype.clearHistoryMessages=function(params,callback){RongIMClient._dataAccessProvider.clearHistoryMessages(params,callback);};RongIMClient.prototype.clearRemoteHistoryMessages=function(params,callback){RongIMClient._dataAccessProvider.clearRemoteHistoryMessages(params,RongIMClient.logCallback(callback,"clearRemoteHistoryMessages"));};/**
         * [hasRemoteUnreadMessages 是否有未接收的消息，jsonp方法]
         * @param  {string}          appkey   [appkey]
         * @param  {string}          token    [token]
         * @param  {ConnectCallback} callback [返回值，参数回调]
         */RongIMClient.prototype.hasRemoteUnreadMessages=function(token,callback){RongIMClient._dataAccessProvider.hasRemoteUnreadMessages(token,RongIMClient.logCallback(callback,"hasRemoteUnreadMessages"));};RongIMClient.prototype.getTotalUnreadCount=function(callback,conversationTypes){RongIMClient._dataAccessProvider.getTotalUnreadCount({onSuccess:function(count){setTimeout(function(){callback.onSuccess(count);});},onError:function(errorCode){setTimeout(function(){RongIMClient.logger({code:errorCode,funcName:"getTotalUnreadCount"});callback.onError(errorCode);});}},conversationTypes);};/**
         * [getConversationUnreadCount 指定多种会话类型获取未读消息数]
         * @param  {ResultCallback<number>} callback             [返回值，参数回调。]
         * @param  {ConversationType[]}     ...conversationTypes [会话类型。]
         */RongIMClient.prototype.getConversationUnreadCount=function(conversationTypes,callback){RongIMClient._dataAccessProvider.getConversationUnreadCount(conversationTypes,{onSuccess:function(count){setTimeout(function(){callback.onSuccess(count);});},onError:function(errorCode){setTimeout(function(){RongIMClient.logger({code:errorCode,funcName:"getConversationUnreadCount"});callback.onError(errorCode);});}});};/**
         * [getUnreadCount 指定用户、会话类型的未读消息总数。]
         * @param  {ConversationType} conversationType [会话类型]
         * @param  {string}           targetId         [用户Id]
         */RongIMClient.prototype.getUnreadCount=function(conversationType,targetId,callback){RongIMClient._dataAccessProvider.getUnreadCount(conversationType,targetId,{onSuccess:function(count){setTimeout(function(){callback.onSuccess(count);});},onError:function(errorCode){setTimeout(function(){RongIMClient.logger({code:errorCode,funcName:"getUnreadCount"});callback.onError(errorCode);});}});};RongIMClient.prototype.setUnreadCount=function(conversationType,targetId,count){RongIMLib.CheckParam.getInstance().check(["number","string","number"],"setUnreadCount",false,arguments);RongIMClient._dataAccessProvider.setUnreadCount(conversationType,targetId,count);};RongIMClient.prototype.clearUnreadCountByTimestamp=function(conversationType,targetId,timestamp,callback){RongIMClient._dataAccessProvider.clearUnreadCountByTimestamp(conversationType,targetId,timestamp,RongIMClient.logCallback(callback,"clearUnreadCountByTimestamp"));};/**
         * 清楚会话未读消息数
         * @param  {ConversationType}        conversationType 会话类型
         * @param  {string}                  targetId         目标Id
         * @param  {ResultCallback<boolean>} callback         返回值，函数回调
         */RongIMClient.prototype.clearUnreadCount=function(conversationType,targetId,callback){RongIMClient._dataAccessProvider.clearUnreadCount(conversationType,targetId,{onSuccess:function(bool){setTimeout(function(){callback.onSuccess(bool);});},onError:function(errorCode){setTimeout(function(){RongIMClient.logger({code:errorCode,funcName:"clearUnreadCount"});callback.onError(errorCode);});}});};RongIMClient.prototype.clearTotalUnreadCount=function(callback){RongIMClient._dataAccessProvider.clearTotalUnreadCount({onSuccess:function(bool){callback.onSuccess(bool);},onError:function(errorCode){setTimeout(function(){RongIMClient.logger({code:errorCode,funcName:'clearTotalUnreadCount'});callback.onError(errorCode);});}});};RongIMClient.prototype.clearLocalStorage=function(callback){RongIMClient._storageProvider.clearItem();callback();};RongIMClient.prototype.setMessageExtra=function(messageId,value,callback){RongIMClient._dataAccessProvider.setMessageExtra(messageId,value,{onSuccess:function(bool){setTimeout(function(){callback.onSuccess(bool);});},onError:function(errorCode){setTimeout(function(){RongIMClient.logger({code:errorCode,funcName:"setMessageExtra"});callback.onError(errorCode);});}});};RongIMClient.prototype.setMessageReceivedStatus=function(messageUId,receivedStatus,callback){RongIMClient._dataAccessProvider.setMessageReceivedStatus(messageUId,receivedStatus,{onSuccess:function(bool){setTimeout(function(){callback.onSuccess(bool);});},onError:function(errorCode){setTimeout(function(){RongIMClient.logger({code:errorCode,funcName:"setMessageReceivedStatus"});callback.onError(errorCode);});}});};RongIMClient.prototype.setMessageStatus=function(conersationType,targetId,timestamp,status,callback){RongIMClient._dataAccessProvider.setMessageStatus(conersationType,targetId,timestamp,status,RongIMClient.logCallback(callback,"setMessageStatus"));};RongIMClient.prototype.setMessageSentStatus=function(messageId,sentStatus,callback){RongIMClient._dataAccessProvider.setMessageSentStatus(messageId,sentStatus,{onSuccess:function(bool){setTimeout(function(){callback.onSuccess(bool);});},onError:function(errorCode){setTimeout(function(){RongIMClient.logger({code:errorCode,funcName:"setMessageSentStatus"});callback.onError(errorCode);});}});};// #endregion Message
// #region TextMessage Draft
/**
         * clearTextMessageDraft 清除指定会话和消息类型的草稿。
         * @param  {ConversationType}        conversationType 会话类型
         * @param  {string}                  targetId         目标Id
         */RongIMClient.prototype.clearTextMessageDraft=function(conversationType,targetId){RongIMLib.CheckParam.getInstance().check(["number","string|number","object"],"clearTextMessageDraft",false,arguments);var key="darf_"+conversationType+"_"+targetId;delete RongIMClient._memoryStore[key];return true;};/**
         * [getTextMessageDraft 获取指定消息和会话的草稿。]
         * @param  {ConversationType}       conversationType [会话类型]
         * @param  {string}                 targetId         [目标Id]
         */RongIMClient.prototype.getTextMessageDraft=function(conversationType,targetId){RongIMLib.CheckParam.getInstance().check(["number","string|number","object"],"getTextMessageDraft",false,arguments);if(targetId==""||conversationType<0){throw new Error("params error : "+RongIMLib.ErrorCode.DRAF_GET_ERROR);}var key="darf_"+conversationType+"_"+targetId;return RongIMClient._memoryStore[key];};/**
         * [saveTextMessageDraft description]
         * @param  {ConversationType}        conversationType [会话类型]
         * @param  {string}                  targetId         [目标Id]
         * @param  {string}                  value            [草稿值]
         */RongIMClient.prototype.saveTextMessageDraft=function(conversationType,targetId,value){RongIMLib.CheckParam.getInstance().check(["number","string|number","string","object"],"saveTextMessageDraft",false,arguments);var key="darf_"+conversationType+"_"+targetId;RongIMClient._memoryStore[key]=value;return true;};// #endregion TextMessage Draft
// #region Conversation
RongIMClient.prototype.searchConversationByContent=function(keyword,callback,conversationTypes){RongIMClient._dataAccessProvider.searchConversationByContent(keyword,RongIMClient.logCallback(callback,"searchConversationByContent"),conversationTypes);};RongIMClient.prototype.searchMessageByContent=function(conversationType,targetId,keyword,timestamp,count,total,callback){RongIMClient._dataAccessProvider.searchMessageByContent(conversationType,targetId,keyword,timestamp,count,total,RongIMClient.logCallback(callback,"searchMessageByContent"));};RongIMClient.prototype.clearCache=function(){RongIMClient._dataAccessProvider.clearCache();};RongIMClient.prototype.clearConversations=function(callback){var conversationTypes=[];for(var _i=1;_i<arguments.length;_i++){conversationTypes[_i-1]=arguments[_i];}if(conversationTypes.length==0){conversationTypes=[RongIMLib.ConversationType.CHATROOM,RongIMLib.ConversationType.CUSTOMER_SERVICE,RongIMLib.ConversationType.DISCUSSION,RongIMLib.ConversationType.GROUP,RongIMLib.ConversationType.PRIVATE,RongIMLib.ConversationType.SYSTEM,RongIMLib.ConversationType.PUBLIC_SERVICE,RongIMLib.ConversationType.APP_PUBLIC_SERVICE];}RongIMClient._dataAccessProvider.clearConversations(conversationTypes,{onSuccess:function(bool){setTimeout(function(){callback.onSuccess(bool);});},onError:function(errorCode){setTimeout(function(){RongIMClient.logger({code:errorCode,funcName:"clearConversations"});callback.onError(errorCode);});}});};/**
         * [getConversation 获取指定会话，此方法需在getConversationList之后执行]
         * @param  {ConversationType}             conversationType [会话类型]
         * @param  {string}                       targetId         [目标Id]
         * @param  {ResultCallback<Conversation>} callback         [返回值，函数回调]
         */RongIMClient.prototype.getConversation=function(conversationType,targetId,callback){RongIMLib.CheckParam.getInstance().check(["number","string|number","object"],"getConversation",false,arguments);RongIMClient._dataAccessProvider.getConversation(conversationType,targetId,{onSuccess:function(conver){setTimeout(function(){callback.onSuccess(conver);});},onError:function(error){setTimeout(function(){RongIMClient.logger({code:error,funcName:"getConversation"});callback.onError(error);});}});};/**
         * [pottingConversation 组装会话列表]
         * @param {any} tempConver [临时会话]
         * conver_conversationType_targetId_no.
         * msg_conversationType_targetId_no.
         */RongIMClient.prototype.pottingConversation=function(tempConver){var self=this,isUseReplace=false;RongIMClient._dataAccessProvider.getConversation(tempConver.type,tempConver.userId,{onSuccess:function(conver){if(!conver){conver=new RongIMLib.Conversation();}else {isUseReplace=true;}conver.conversationType=tempConver.type;conver.targetId=tempConver.userId;conver.latestMessage=RongIMLib.MessageUtil.messageParser(tempConver.msg);conver.latestMessageId=conver.latestMessage.messageId;conver.objectName=conver.latestMessage.objectName;conver.receivedStatus=conver.latestMessage.receivedStatus;conver.receivedTime=conver.latestMessage.receiveTime;conver.sentStatus=conver.latestMessage.sentStatus;conver.sentTime=conver.latestMessage.sentTime;var mentioneds=RongIMClient._storageProvider.getItem("mentioneds_"+RongIMLib.Bridge._client.userId+'_'+conver.conversationType+'_'+conver.targetId);if(mentioneds){var info=JSON.parse(mentioneds);conver.mentionedMsg=info[tempConver.type+"_"+tempConver.userId];}if(!isUseReplace){if(RongIMLib.RongUtil.supportLocalStorage()){var count=RongIMClient._storageProvider.getItem("cu"+RongIMLib.Bridge._client.userId+tempConver.type+tempConver.userId);conver.unreadMessageCount=Number(count);}else {conver.unreadMessageCount=0;}}if(conver.conversationType==RongIMLib.ConversationType.DISCUSSION){self.getDiscussion(tempConver.userId,{onSuccess:function(info){conver.conversationTitle=info.name;},onError:function(error){}});}RongIMClient._dataAccessProvider.addConversation(conver,{onSuccess:function(data){}});},onError:function(error){}});};RongIMClient.prototype.addConversation=function(conversation,callback){RongIMClient._dataAccessProvider.addConversation(conversation,callback);};RongIMClient.prototype.sortConversationList=function(conversationList){var convers=[];for(var i=0,len=conversationList.length;i<len;i++){if(!conversationList[i]){continue;}if(conversationList[i].isTop){convers.push(conversationList[i]);conversationList.splice(i,1);continue;}for(var j=0;j<len-i-1;j++){if(conversationList[j].sentTime<conversationList[j+1].sentTime){var swap=conversationList[j];conversationList[j]=conversationList[j+1];conversationList[j+1]=swap;}}}return RongIMClient._memoryStore.conversationList=convers.concat(conversationList);};RongIMClient.prototype.getConversationList=function(callback,conversationTypes,count,isGetHiddenConvers){RongIMLib.CheckParam.getInstance().check(["object","null|undefined|array|object|global","number|undefined|null|object|global","boolean|undefined|null|object|global"],"getConversationList",false,arguments);RongIMClient._dataAccessProvider.getConversationList({onSuccess:function(data){if(conversationTypes||RongIMClient._dataAccessProvider){setTimeout(function(){callback.onSuccess(data);});}else {setTimeout(function(){callback.onSuccess(RongIMClient._memoryStore.conversationList);});}},onError:function(error){setTimeout(function(){RongIMClient.logger({code:error,funcName:"getConversationList"});callback.onError(error);});}},conversationTypes,count,isGetHiddenConvers);};RongIMClient.prototype.getRemoteConversationList=function(callback,conversationTypes,count,isGetHiddenConvers){RongIMLib.CheckParam.getInstance().check(["object","null|array|object|global","number|undefined|null|object|global","boolean|undefined|null|object|global"],"getRemoteConversationList",false,arguments);RongIMClient._dataAccessProvider.getRemoteConversationList(RongIMClient.logCallback(callback,"getRemoteConversationList"),conversationTypes,count,isGetHiddenConvers);};RongIMClient.prototype.updateConversation=function(conversation){return RongIMClient._dataAccessProvider.updateConversation(conversation);};/**
         * [createConversation 创建会话。]
         * @param  {number}  conversationType [会话类型]
         * @param  {string}  targetId         [目标Id]
         * @param  {string}  converTitle      [会话标题]
         * @param  {boolean} islocal          [是否同步到服务器，ture：同步，false:不同步]
         */RongIMClient.prototype.createConversation=function(conversationType,targetId,converTitle){RongIMLib.CheckParam.getInstance().check(["number","string|number","string"],"createConversation",false,arguments);var conver=new RongIMLib.Conversation();// var unreadContent: string = RongIMClient._storageProvider.getItem("cu" + Bridge._client.userId + conversationType + targetId);
// var unreadCount = Number(unreadContent) || 0;
conver.targetId=targetId;conver.conversationType=conversationType;conver.conversationTitle=converTitle;conver.latestMessage={};conver.unreadMessageCount=0;return conver;};//TODO 删除本地和服务器、删除本地和服务器分开
RongIMClient.prototype.removeConversation=function(conversationType,targetId,callback){RongIMLib.CheckParam.getInstance().check(["number","string|number","object"],"removeConversation",false,arguments);RongIMClient._dataAccessProvider.removeConversation(conversationType,targetId,RongIMClient.logCallback(callback,"removeConversation"));};RongIMClient.prototype.setConversationHidden=function(conversationType,targetId,isHidden){RongIMLib.CheckParam.getInstance().check(["number","string|number","boolean"],"setConversationHidden",false,arguments);RongIMClient._dataAccessProvider.setConversationHidden(conversationType,targetId,isHidden);};RongIMClient.prototype.setConversationToTop=function(conversationType,targetId,isTop,callback){RongIMLib.CheckParam.getInstance().check(["number","string|number","boolean","object"],"setConversationToTop",false,arguments);RongIMClient._dataAccessProvider.setConversationToTop(conversationType,targetId,isTop,{onSuccess:function(bool){setTimeout(function(){callback.onSuccess(bool);});},onError:function(errorCode){setTimeout(function(){RongIMClient.logger({code:errorCode,funcName:"setConversationToTop"});callback.onError(errorCode);});}});};// #endregion Conversation
// #region Notifications
/**
         * [getConversationNotificationStatus 获取指定用户和会话类型免提醒。]
         * @param  {ConversationType}                               conversationType [会话类型]
         * @param  {string}                                         targetId         [目标Id]
         * @param  {ResultCallback<ConversationNotificationStatus>} callback         [返回值，函数回调]
         */RongIMClient.prototype.getConversationNotificationStatus=function(conversationType,targetId,callback){var params={conversationType:conversationType,targetId:targetId};RongIMClient._dataAccessProvider.getConversationNotificationStatus(params,RongIMClient.logCallback(callback,"getConversationNotificationStatus"));};/**
         * [setConversationNotificationStatus 设置指定用户和会话类型免提醒。]
         * @param  {ConversationType}                               conversationType [会话类型]
         * @param  {string}                                         targetId         [目标Id]
         * @param  {ResultCallback<ConversationNotificationStatus>} callback         [返回值，函数回调]
         */RongIMClient.prototype.setConversationNotificationStatus=function(conversationType,targetId,notificationStatus,callback){var params={conversationType:conversationType,targetId:targetId,status:status};RongIMClient._dataAccessProvider.setConversationNotificationStatus(params,RongIMClient.logCallback(callback,"setConversationNotificationStatus"));};/**
         * [getNotificationQuietHours 获取免提醒消息时间。]
         * @param  {GetNotificationQuietHoursCallback} callback [返回值，函数回调]
         */RongIMClient.prototype.getNotificationQuietHours=function(callback){throw new Error("Not implemented yet");};/**
         * [removeNotificationQuietHours 移除免提醒消息时间。]
         * @param  {GetNotificationQuietHoursCallback} callback [返回值，函数回调]
         */RongIMClient.prototype.removeNotificationQuietHours=function(callback){throw new Error("Not implemented yet");};/**
         * [setNotificationQuietHours 设置免提醒消息时间。]
         * @param  {GetNotificationQuietHoursCallback} callback [返回值，函数回调]
         */RongIMClient.prototype.setNotificationQuietHours=function(startTime,spanMinutes,callback){throw new Error("Not implemented yet");};// #endregion Notifications
// #region Discussion
/**
         * [addMemberToDiscussion   加入讨论组]
         * @param  {string}            discussionId [讨论组Id]
         * @param  {string[]}          userIdList   [讨论中成员]
         * @param  {OperationCallback} callback     [返回值，函数回调]
         */RongIMClient.prototype.addMemberToDiscussion=function(discussionId,userIdList,callback){RongIMLib.CheckParam.getInstance().check(["string","array","object"],"addMemberToDiscussion",false,arguments);RongIMClient._dataAccessProvider.addMemberToDiscussion(discussionId,userIdList,RongIMClient.logCallback(callback,"addMemberToDiscussion"));};/**
         * [createDiscussion 创建讨论组]
         * @param  {string}                   name       [讨论组名称]
         * @param  {string[]}                 userIdList [讨论组成员]
         * @param  {CreateDiscussionCallback} callback   [返回值，函数回调]
         */RongIMClient.prototype.createDiscussion=function(name,userIdList,callback){RongIMLib.CheckParam.getInstance().check(["string","array","object"],"createDiscussion",false,arguments);RongIMClient._dataAccessProvider.createDiscussion(name,userIdList,callback);};/**
         * [getDiscussion 获取讨论组信息]
         * @param  {string}                     discussionId [讨论组Id]
         * @param  {ResultCallback<Discussion>} callback     [返回值，函数回调]
         */RongIMClient.prototype.getDiscussion=function(discussionId,callback){RongIMLib.CheckParam.getInstance().check(["string","object"],"getDiscussion",false,arguments);RongIMClient._dataAccessProvider.getDiscussion(discussionId,RongIMClient.logCallback(callback,"getDiscussion"));};/**
         * [quitDiscussion 退出讨论组]
         * @param  {string}            discussionId [讨论组Id]
         * @param  {OperationCallback} callback     [返回值，函数回调]
         */RongIMClient.prototype.quitDiscussion=function(discussionId,callback){RongIMLib.CheckParam.getInstance().check(["string","object"],"quitDiscussion",false,arguments);RongIMClient._dataAccessProvider.quitDiscussion(discussionId,RongIMClient.logCallback(callback,"quitDiscussion"));};/**
         * [removeMemberFromDiscussion 将指定成员移除讨论租]
         * @param  {string}            discussionId [讨论组Id]
         * @param  {string}            userId       [被移除的用户Id]
         * @param  {OperationCallback} callback     [返回值，参数回调]
         */RongIMClient.prototype.removeMemberFromDiscussion=function(discussionId,userId,callback){RongIMLib.CheckParam.getInstance().check(["string","string","object"],"removeMemberFromDiscussion",false,arguments);RongIMClient._dataAccessProvider.removeMemberFromDiscussion(discussionId,userId,RongIMClient.logCallback(callback,"removeMemberFromDiscussion"));};/**
         * [setDiscussionInviteStatus 设置讨论组邀请状态]
         * @param  {string}                 discussionId [讨论组Id]
         * @param  {DiscussionInviteStatus} status       [邀请状态]
         * @param  {OperationCallback}      callback     [返回值，函数回调]
         */RongIMClient.prototype.setDiscussionInviteStatus=function(discussionId,status,callback){RongIMLib.CheckParam.getInstance().check(["string","number","object"],"setDiscussionInviteStatus",false,arguments);RongIMClient._dataAccessProvider.setDiscussionInviteStatus(discussionId,status,RongIMClient.logCallback(callback,"setDiscussionInviteStatus"));};/**
         * [setDiscussionName 设置讨论组名称]
         * @param  {string}            discussionId [讨论组Id]
         * @param  {string}            name         [讨论组名称]
         * @param  {OperationCallback} callback     [返回值，函数回调]
         */RongIMClient.prototype.setDiscussionName=function(discussionId,name,callback){RongIMLib.CheckParam.getInstance().check(["string","string","object"],"setDiscussionName",false,arguments);RongIMClient._dataAccessProvider.setDiscussionName(discussionId,name,RongIMClient.logCallback(callback,"setDiscussionName"));};// #endregion Discussion
// #region ChatRoom
/**
         * [加入聊天室。]
         * @param  {string}            chatroomId   [聊天室Id]
         * @param  {number}            messageCount [拉取消息数量，-1为不拉去消息]
         * @param  {OperationCallback} callback     [返回值，函数回调]
         */RongIMClient.prototype.joinChatRoom=function(chatroomId,messageCount,callback){RongIMLib.CheckParam.getInstance().check(["string|number","number","object"],"joinChatRoom",false,arguments);if(chatroomId==""){setTimeout(function(){var errorCode=RongIMLib.ErrorCode.CHATROOM_ID_ISNULL;RongIMClient.logger({code:errorCode,funcName:"joinChatRoom"});callback.onError(RongIMLib.ErrorCode.CHATROOM_ID_ISNULL);});return;}RongIMClient._dataAccessProvider.joinChatRoom(chatroomId,messageCount,RongIMClient.logCallback(callback,"joinChatRoom"));};RongIMClient.prototype.setDeviceInfo=function(device){RongIMClient._dataAccessProvider.setDeviceInfo(device);};RongIMClient.prototype.setChatroomHisMessageTimestamp=function(chatRoomId,timestamp){RongIMLib.CheckParam.getInstance().check(["string|number","number"],"setChatroomHisMessageTimestamp",false,arguments);RongIMClient._dataAccessProvider.setChatroomHisMessageTimestamp(chatRoomId,timestamp);};RongIMClient.prototype.getChatRoomHistoryMessages=function(chatRoomId,count,order,callback){RongIMLib.CheckParam.getInstance().check(["string|number","number","number","object"],"getChatRoomHistoryMessages",false,arguments);RongIMClient._dataAccessProvider.getChatRoomHistoryMessages(chatRoomId,count,order,RongIMClient.logCallback(callback,"getChatRoomHistoryMessages"));};RongIMClient.prototype.getChatRoomInfo=function(chatRoomId,count,order,callback){RongIMLib.CheckParam.getInstance().check(["string|number","number","number","object"],"getChatRoomInfo",false,arguments);RongIMClient._dataAccessProvider.getChatRoomInfo(chatRoomId,count,order,RongIMClient.logCallback(callback,"getChatRoomInfo"));};/**
         * [退出聊天室]
         * @param  {string}            chatroomId [聊天室Id]
         * @param  {OperationCallback} callback   [返回值，函数回调]
         */RongIMClient.prototype.quitChatRoom=function(chatroomId,callback){RongIMLib.CheckParam.getInstance().check(["string|number","object"],"quitChatRoom",false,arguments);RongIMClient._dataAccessProvider.quitChatRoom(chatroomId,RongIMClient.logCallback(callback,"quitChatRoom"));};// #endregion ChatRoom
// #region Public Service
RongIMClient.prototype.getRemotePublicServiceList=function(callback,pullMessageTime){RongIMClient._dataAccessProvider.getRemotePublicServiceList(RongIMClient.logCallback(callback,"getRemotePublicServiceList"),pullMessageTime);};/**
         * [getPublicServiceList ]获取本地的公共账号列表
         * @param  {ResultCallback<PublicServiceProfile[]>} callback [返回值，参数回调]
         */RongIMClient.prototype.getPublicServiceList=function(callback){if(RongIMClient._memoryStore.depend.openMp){RongIMLib.CheckParam.getInstance().check(["object"],"getPublicServiceList",false,arguments);this.getRemotePublicServiceList(RongIMClient.logCallback(callback,"getPublicServiceList"));}};/**
         * [getPublicServiceProfile ]   获取某公共服务信息。
         * @param  {PublicServiceType}                    publicServiceType [公众服务类型。]
         * @param  {string}                               publicServiceId   [公共服务 Id。]
         * @param  {ResultCallback<PublicServiceProfile>} callback          [公共账号信息回调。]
         */RongIMClient.prototype.getPublicServiceProfile=function(publicServiceType,publicServiceId,callback){if(RongIMClient._memoryStore.depend.openMp){RongIMLib.CheckParam.getInstance().check(["number","string|number","object"],"getPublicServiceProfile",false,arguments);RongIMClient._dataAccessProvider.getPublicServiceProfile(publicServiceType,publicServiceId,RongIMClient.logCallback(callback,"getPublicServiceProfile"));}};/**
         * [pottingPublicSearchType ] 公众好查询类型
         * @param  {number} bussinessType [ 0-all 1-mp 2-mc]
         * @param  {number} searchType    [0-exact 1-fuzzy]
         */RongIMClient.prototype.pottingPublicSearchType=function(bussinessType,searchType){if(RongIMClient._memoryStore.depend.openMp){var bits=0;if(bussinessType==0){bits|=3;if(searchType==0){bits|=12;}else {bits|=48;}}else if(bussinessType==1){bits|=1;if(searchType==0){bits|=8;}else {bits|=32;}}else {bits|=2;if(bussinessType==0){bits|=4;}else {bits|=16;}}return bits;}};/**
         * [searchPublicService ]按公众服务类型搜索公众服务。
         * @param  {SearchType}                             searchType [搜索类型枚举。]
         * @param  {string}                                 keywords   [搜索关键字。]
         * @param  {ResultCallback<PublicServiceProfile[]>} callback   [搜索结果回调。]
         */RongIMClient.prototype.searchPublicService=function(searchType,keywords,callback){if(RongIMClient._memoryStore.depend.openMp){RongIMLib.CheckParam.getInstance().check(["number","string","object"],"searchPublicService",false,arguments);var modules=new RongIMClient.Protobuf.SearchMpInput();modules.setType(this.pottingPublicSearchType(0,searchType));modules.setId(keywords);RongIMClient.bridge.queryMsg(29,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),RongIMLib.Bridge._client.userId,RongIMClient.logCallback(callback,"searchPublicService"),"SearchMpOutput");}};/**
         * [searchPublicServiceByType ]按公众服务类型搜索公众服务。
         * @param  {PublicServiceType}                      publicServiceType [公众服务类型。]
         * @param  {SearchType}                             searchType        [搜索类型枚举。]
         * @param  {string}                                 keywords          [搜索关键字。]
         * @param  {ResultCallback<PublicServiceProfile[]>} callback          [搜索结果回调。]
         */RongIMClient.prototype.searchPublicServiceByType=function(publicServiceType,searchType,keywords,callback){if(RongIMClient._memoryStore.depend.openMp){RongIMLib.CheckParam.getInstance().check(["number","number","string","object"],"searchPublicServiceByType",false,arguments);var type=publicServiceType==RongIMLib.ConversationType.APP_PUBLIC_SERVICE?2:1;var modules=new RongIMClient.Protobuf.SearchMpInput();modules.setType(this.pottingPublicSearchType(type,searchType));modules.setId(keywords);RongIMClient.bridge.queryMsg(29,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),RongIMLib.Bridge._client.userId,RongIMClient.logCallback(callback,"searchPublicServiceByType"),"SearchMpOutput");}};/**
         * [subscribePublicService ] 订阅公众号。
         * @param  {PublicServiceType} publicServiceType [公众服务类型。]
         * @param  {string}            publicServiceId   [公共服务 Id。]
         * @param  {OperationCallback} callback          [订阅公众号回调。]
         */RongIMClient.prototype.subscribePublicService=function(publicServiceType,publicServiceId,callback){if(RongIMClient._memoryStore.depend.openMp){RongIMLib.CheckParam.getInstance().check(["number","string|number","object"],"subscribePublicService",false,arguments);var modules=new RongIMClient.Protobuf.MPFollowInput(),me=this,follow=publicServiceType==RongIMLib.ConversationType.APP_PUBLIC_SERVICE?"mcFollow":"mpFollow";modules.setId(publicServiceId);RongIMClient.bridge.queryMsg(follow,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),RongIMLib.Bridge._client.userId,{onSuccess:function(){me.getRemotePublicServiceList({onSuccess:function(){},onError:function(){}});callback.onSuccess();},onError:function(code){var errorCode=code;RongIMClient.logger({code:errorCode,funcName:"subscribePublicService"});callback.onError(code);}},"MPFollowOutput");}};/**
         * [unsubscribePublicService ] 取消订阅公众号。
         * @param  {PublicServiceType} publicServiceType [公众服务类型。]
         * @param  {string}            publicServiceId   [公共服务 Id。]
         * @param  {OperationCallback} callback          [取消订阅公众号回调。]
         */RongIMClient.prototype.unsubscribePublicService=function(publicServiceType,publicServiceId,callback){if(RongIMClient._memoryStore.depend.openMp){RongIMLib.CheckParam.getInstance().check(["number","string|number","object"],"unsubscribePublicService",false,arguments);var modules=new RongIMClient.Protobuf.MPFollowInput(),follow=publicServiceType==RongIMLib.ConversationType.APP_PUBLIC_SERVICE?"mcUnFollow":"mpUnFollow";modules.setId(publicServiceId);RongIMClient.bridge.queryMsg(follow,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),RongIMLib.Bridge._client.userId,{onSuccess:function(){RongIMClient._memoryStore.publicServiceMap.remove(publicServiceType,publicServiceId);callback.onSuccess();},onError:function(code){var errorCode=code;RongIMClient.logger({code:errorCode,funcName:"unsubscribePublicService"});callback.onError(code);}},"MPFollowOutput");}};// #endregion Public Service
// #region Blacklist
/**
         * [加入黑名单]
         * @param  {string}            userId   [将被加入黑名单的用户Id]
         * @param  {OperationCallback} callback [返回值，函数回调]
         */RongIMClient.prototype.addToBlacklist=function(userId,callback){RongIMLib.CheckParam.getInstance().check(["string|number","object"],"addToBlacklist",false,arguments);RongIMClient._dataAccessProvider.addToBlacklist(userId,RongIMClient.logCallback(callback,"addToBlacklist"));};/**
         * [获取黑名单列表]
         * @param  {GetBlacklistCallback} callback [返回值，函数回调]
         */RongIMClient.prototype.getBlacklist=function(callback){RongIMLib.CheckParam.getInstance().check(["object"],"getBlacklist",false,arguments);RongIMClient._dataAccessProvider.getBlacklist(callback);};/**
         * [得到指定人员再黑名单中的状态]
         * @param  {string}                          userId   [description]
         * @param  {ResultCallback<BlacklistStatus>} callback [返回值，函数回调]
         */ //TODO 如果人员不在黑名单中，获取状态会出现异常
RongIMClient.prototype.getBlacklistStatus=function(userId,callback){RongIMLib.CheckParam.getInstance().check(["string|number","object"],"getBlacklistStatus",false,arguments);RongIMClient._dataAccessProvider.getBlacklistStatus(userId,RongIMClient.logCallback(callback,"getBlacklistStatus"));};/**
         * [将指定用户移除黑名单]
         * @param  {string}            userId   [将被移除的用户Id]
         * @param  {OperationCallback} callback [返回值，函数回调]
         */RongIMClient.prototype.removeFromBlacklist=function(userId,callback){RongIMLib.CheckParam.getInstance().check(["string|number","object"],"removeFromBlacklist",false,arguments);RongIMClient._dataAccessProvider.removeFromBlacklist(userId,RongIMClient.logCallback(callback,"removeFromBlacklist"));};RongIMClient.prototype.getFileToken=function(fileType,callback){RongIMLib.CheckParam.getInstance().check(["number","object"],"getQngetFileTokenTkn",false,arguments);RongIMClient._dataAccessProvider.getFileToken(fileType,RongIMClient.logCallback(callback,"getFileToken"));};RongIMClient.prototype.getFileUrl=function(fileType,fileName,oriName,callback){RongIMLib.CheckParam.getInstance().check(["number","string","string|global|object|null","object"],"getFileUrl",false,arguments);RongIMClient._dataAccessProvider.getFileUrl(fileType,fileName,oriName,RongIMClient.logCallback(callback,"getFileUrl"));};// #region Real-time Location Service
RongIMClient.prototype.addRealTimeLocationListener=function(conversationType,targetId,listener){throw new Error("Not implemented yet");};RongIMClient.prototype.getRealTimeLocation=function(conversationType,targetId){throw new Error("Not implemented yet");};RongIMClient.prototype.getRealTimeLocationCurrentState=function(conversationType,targetId){throw new Error("Not implemented yet");};RongIMClient.prototype.getRealTimeLocationParticipants=function(conversationType,targetId){throw new Error("Not implemented yet");};RongIMClient.prototype.joinRealTimeLocation=function(conversationType,targetId){throw new Error("Not implemented yet");};RongIMClient.prototype.quitRealTimeLocation=function(conversationType,targetId){throw new Error("Not implemented yet");};RongIMClient.prototype.startRealTimeLocation=function(conversationType,targetId){throw new Error("Not implemented yet");};RongIMClient.prototype.updateRealTimeLocationStatus=function(conversationType,targetId,latitude,longitude){throw new Error("Not implemented yet");};// #endregion Real-time Location Service
// # startVoIP
RongIMClient.prototype.startCall=function(converType,targetId,userIds,mediaType,extra,callback){RongIMLib.CheckParam.getInstance().check(["number","string|number","array","number","string","object"],"startCall",false,arguments);if(RongIMClient._memoryStore.voipStategy){RongIMClient._voipProvider.startCall(converType,targetId,userIds,mediaType,extra,RongIMClient.logCallback(callback,"startCall"));}else {var errorCode=RongIMLib.ErrorCode.VOIP_NOT_AVALIABLE;RongIMClient.logger({code:errorCode,funcName:"startCall"});callback.onError(RongIMLib.ErrorCode.VOIP_NOT_AVALIABLE);}};RongIMClient.prototype.joinCall=function(mediaType,callback){RongIMLib.CheckParam.getInstance().check(['number','object'],"joinCall",false,arguments);if(RongIMClient._memoryStore.voipStategy){RongIMClient._voipProvider.joinCall(mediaType,RongIMClient.logCallback(callback,"joinCall"));}else {var errorCode=RongIMLib.ErrorCode.VOIP_NOT_AVALIABLE;RongIMClient.logger({code:errorCode,funcName:"joinCall"});callback.onError(RongIMLib.ErrorCode.VOIP_NOT_AVALIABLE);}};RongIMClient.prototype.hungupCall=function(converType,targetId,reason){RongIMLib.CheckParam.getInstance().check(["number","string","number"],"hungupCall",false,arguments);if(RongIMClient._memoryStore.voipStategy){RongIMClient._voipProvider.hungupCall(converType,targetId,reason);}};RongIMClient.prototype.changeMediaType=function(converType,targetId,mediaType,callback){RongIMLib.CheckParam.getInstance().check(["number","string","number","object"],"changeMediaType",false,arguments);if(RongIMClient._memoryStore.voipStategy){RongIMClient._voipProvider.changeMediaType(converType,targetId,mediaType,RongIMClient.logCallback(callback,"changeMediaType"));}else {var errorCode=RongIMLib.ErrorCode.VOIP_NOT_AVALIABLE;RongIMClient.logger({code:errorCode,funcName:"changeMediaType"});callback.onError(RongIMLib.ErrorCode.VOIP_NOT_AVALIABLE);}};// # endVoIP
RongIMClient.prototype.getUnreadMentionedMessages=function(conversationType,targetId){return RongIMClient._dataAccessProvider.getUnreadMentionedMessages(conversationType,targetId);};RongIMClient.prototype.clearListeners=function(){RongIMClient._dataAccessProvider.clearListeners();};// UserStatus start
RongIMClient.prototype.getUserStatus=function(userId,callback){RongIMClient._dataAccessProvider.getUserStatus(userId,RongIMClient.logCallback(callback,"getUserStatus"));};RongIMClient.prototype.setUserStatus=function(status,callback){RongIMClient._dataAccessProvider.setUserStatus(status,RongIMClient.logCallback(callback,"setUserStatus"));};RongIMClient.prototype.setUserStatusListener=function(params,callback){var userIds=params.userIds;var multiple=params.multiple;RongIMClient.userStatusObserver.watch({key:userIds,func:callback,multiple:multiple});RongIMClient._dataAccessProvider.setUserStatusListener(params,callback);};// UserStaus end
// RTC start
RongIMClient.messageWatch=function(watcher){RongIMClient.RTCListener=watcher;};/*
            var data = {
                key1: 123,
                key2: 345
            };
        */RongIMClient.prototype.getRTCUserInfoList=function(room,callback){RongIMLib.CheckParam.getInstance().check(["object","object"],"getRTCUserInfoList",false,arguments);RongIMClient._dataAccessProvider.getRTCUserInfoList(room,callback);};RongIMClient.prototype.getRTCUserList=function(room,callback){RongIMLib.CheckParam.getInstance().check(["object","object"],"getRTCUserList",false,arguments);RongIMClient._dataAccessProvider.getRTCUserList(room,callback);};RongIMClient.prototype.setRTCUserInfo=function(room,info,callback){RongIMLib.CheckParam.getInstance().check(["object","object","object"],"setRTCUserInfo",false,arguments);RongIMClient._dataAccessProvider.setRTCUserInfo(room,info,callback);};RongIMClient.prototype.removeRTCUserInfo=function(room,info,callback){RongIMLib.CheckParam.getInstance().check(["object","object","object"],"removeRTCUserInfo",false,arguments);RongIMClient._dataAccessProvider.removeRTCUserInfo(room,info,callback);};RongIMClient.prototype.getRTCRoomInfo=function(room,callback){RongIMLib.CheckParam.getInstance().check(["object","object"],"getRTCRoomInfo",false,arguments);RongIMClient._dataAccessProvider.getRTCRoomInfo(room,callback);};RongIMClient.prototype.setRTCRoomInfo=function(room,info,callback){RongIMLib.CheckParam.getInstance().check(["object","object","object"],"setRTCRoomInfo",false,arguments);RongIMClient._dataAccessProvider.setRTCRoomInfo(room,info,callback);};RongIMClient.prototype.removeRTCRoomInfo=function(room,info,callback){RongIMLib.CheckParam.getInstance().check(["object","object","object"],"removeRTCRoomInfo",false,arguments);RongIMClient._dataAccessProvider.removeRTCRoomInfo(room,info,callback);};RongIMClient.prototype.joinRTCRoom=function(room,callback){RongIMLib.CheckParam.getInstance().check(["object","object"],"joinRTCRoom",false,arguments);RongIMClient._dataAccessProvider.joinRTCRoom(room,callback);};RongIMClient.prototype.quitRTCRoom=function(room,callback){RongIMLib.CheckParam.getInstance().check(["object","object"],"quitRTCRoom",false,arguments);RongIMClient._dataAccessProvider.quitRTCRoom(room,callback);};RongIMClient.prototype.RTCPing=function(room,callback){RongIMLib.CheckParam.getInstance().check(["object","object"],"RTCPing",false,arguments);RongIMClient._dataAccessProvider.RTCPing(room,callback);};RongIMClient.prototype.setRTCUserData=function(roomId,key,value,isInner,callback,message){RongIMLib.CheckParam.getInstance().check(["string","string","string","boolean","object","global|object|null|undefined"],"setRTCUserData",false,arguments);RongIMClient._dataAccessProvider.setRTCUserData(roomId,key,value,isInner,callback,message);};RongIMClient.prototype.getRTCUserData=function(roomId,keys,isInner,callback){RongIMLib.CheckParam.getInstance().check(["string","array","boolean","object","global|object|null"],"getRTCUserData",false,arguments);RongIMClient._dataAccessProvider.getRTCUserData(roomId,keys,isInner,callback);};RongIMClient.prototype.removeRTCUserData=function(roomId,keys,isInner,callback,message){RongIMLib.CheckParam.getInstance().check(["string","array","boolean","object","global|object|null|undefined"],"removeRTCUserData",false,arguments);RongIMClient._dataAccessProvider.removeRTCUserData(roomId,keys,isInner,callback,message);};RongIMClient.prototype.setRTCRoomData=function(roomId,key,value,isInner,callback,message){RongIMLib.CheckParam.getInstance().check(["string","string","string","boolean","object","global|object|null|undefined"],"setRTCRoomData",false,arguments);RongIMClient._dataAccessProvider.setRTCRoomData(roomId,key,value,isInner,callback,message);};RongIMClient.prototype.getRTCRoomData=function(roomId,keys,isInner,callback){RongIMLib.CheckParam.getInstance().check(["string","array","boolean","object"],"getRTCRoomData",false,arguments);RongIMClient._dataAccessProvider.getRTCRoomData(roomId,keys,isInner,callback);};RongIMClient.prototype.removeRTCRoomData=function(roomId,keys,isInner,callback,message){RongIMLib.CheckParam.getInstance().check(["string","array","boolean","object","global|object|null|undefined"],"removeRTCRoomData",false,arguments);RongIMClient._dataAccessProvider.removeRTCRoomData(roomId,keys,isInner,callback,message);};RongIMClient.prototype.getNavi=function(){return RongIMClient._dataAccessProvider.getNavi();};RongIMClient.prototype.getRTCToken=function(room,callback){RongIMLib.CheckParam.getInstance().check(["object","object"],"getRTCToken",false,arguments);return RongIMClient._dataAccessProvider.getRTCToken(room,callback);};RongIMClient.prototype.getAppInfo=function(){var appKey=RongIMClient._memoryStore.appKey;return {appKey:appKey};};RongIMClient.RTCListener=function(){};RongIMClient.currentServer='';RongIMClient.LogFactory={};RongIMClient.MessageType={};RongIMClient.RegisterMessage={};RongIMClient._memoryStore={listenerList:[],isPullFinished:false,syncMsgQueue:[]};RongIMClient.isNotPullMsg=false;RongIMClient.userStatusObserver=null;RongIMClient.sdkver='2.5.0';RongIMClient.otherDeviceLoginCount=0;RongIMClient.serverStore={index:0};RongIMClient.isFirstConnect=true;RongIMClient.statusListeners=[];RongIMClient.userStatusListener=null;return RongIMClient;}();RongIMLib.RongIMClient=RongIMClient;})(RongIMLib||(RongIMLib={}));//用于连接通道
var RongIMLib;(function(RongIMLib){(function(Qos){Qos[Qos["AT_MOST_ONCE"]=0]="AT_MOST_ONCE";Qos[Qos["AT_LEAST_ONCE"]=1]="AT_LEAST_ONCE";Qos[Qos["EXACTLY_ONCE"]=2]="EXACTLY_ONCE";Qos[Qos["DEFAULT"]=3]="DEFAULT";})(RongIMLib.Qos||(RongIMLib.Qos={}));var Qos=RongIMLib.Qos;(function(Type){Type[Type["CONNECT"]=1]="CONNECT";Type[Type["CONNACK"]=2]="CONNACK";Type[Type["PUBLISH"]=3]="PUBLISH";Type[Type["PUBACK"]=4]="PUBACK";Type[Type["QUERY"]=5]="QUERY";Type[Type["QUERYACK"]=6]="QUERYACK";Type[Type["QUERYCON"]=7]="QUERYCON";Type[Type["SUBSCRIBE"]=8]="SUBSCRIBE";Type[Type["SUBACK"]=9]="SUBACK";Type[Type["UNSUBSCRIBE"]=10]="UNSUBSCRIBE";Type[Type["UNSUBACK"]=11]="UNSUBACK";Type[Type["PINGREQ"]=12]="PINGREQ";Type[Type["PINGRESP"]=13]="PINGRESP";Type[Type["DISCONNECT"]=14]="DISCONNECT";})(RongIMLib.Type||(RongIMLib.Type={}));var Type=RongIMLib.Type;var _topic=["invtDiz","crDiz","qnUrl","userInf","dizInf","userInf","joinGrp","quitDiz","exitGrp","evctDiz",["","ppMsgP","pdMsgP","pgMsgP","chatMsg","pcMsgP","","pmcMsgN","pmpMsgN","","","","prMsgS"],"pdOpen","rename","uGcmpr","qnTkn","destroyChrm","createChrm","exitChrm","queryChrm","joinChrm","pGrps","addBlack","rmBlack","getBlack","blackStat","addRelation","qryRelation","delRelation","pullMp","schMp","qnTkn","qnUrl","qryVoipK","delMsg","qryCHMsg","getUserStatus","setUserStatus","subUserStatus","cleanHisMsg"];var Channel=function(){function Channel(cb,self){this.connectionStatus=-1;var appId=self.appId;var token=encodeURIComponent(self.token);var sdkVer=self.sdkVer;var apiVer=self.apiVer;this.self=self;this.socket=Socket.getInstance().createServer();var that=this;var storage=RongIMLib.RongIMClient._storageProvider;var servers=storage.getItem('servers');servers=JSON.parse(servers)||[];var depend=RongIMLib.RongIMClient._memoryStore.depend;var startConnect=function(host){var tpl='{host}/websocket?appId={appId}&token={token}&sdkVer={sdkVer}&apiVer={apiVer}';that.url=RongIMLib.RongUtil.tplEngine(tpl,{host:host,appId:appId,token:token,sdkVer:sdkVer,apiVer:apiVer});that.socket.connect(that.url,cb);// 临时兼容 Comet 逻辑，Comet 中用到
var userId=storage.getItem('rong_current_user');RongIMLib.Navigation.Endpoint={host:host,userId:userId};};var connectMap={ws:function(){// 所有链接计算器，超过 15 秒后认为所有 CMP 地址均不可用
var totalTimer=new RongIMLib.Timer({timeout:1*1000*15});var timers=[];var xhrs=[];var isFinished=false;var clearHandler=function(){for(var i=0;i<timers.length;i++){var timer=timers[i];clearTimeout(timer);}for(var i=0;i<xhrs.length;i++){var xhr=xhrs[i];xhr.abort();}timers.length=0;xhrs.length=0;};var request=function(config,callback){var url=config.url;var time=config.time;if(isFinished){return;}var timer=setTimeout(function(){var onSuccess=function(){if(isFinished){return;}clearHandler();isFinished=true;totalTimer.pause();callback(url);};var xhr=RongIMLib.MessageUtil.detectCMP({url:url,success:onSuccess,fail:function(code){console.log(code);}});xhrs.push(xhr);},time);timers.push(timer);};var snifferCallback=function(url){var reg=/(http|https):\/\/([^\/]+)/i;var host=url.match(reg)[2];RongIMLib.RongIMClient.currentServer=host;startConnect(host);};var snifferTpl='{protocol}{server}/ping?r={random}';for(var i=0;i<servers.length;i++){var server=servers[i];if(server){server=RongIMLib.RongUtil.tplEngine(snifferTpl,{protocol:depend.protocol,server:server,random:RongIMLib.RongUtil.getTimestamp()});request({url:server,time:i*1000},snifferCallback);}}totalTimer.resume(function(){RongIMLib.Navigation.clear();clearHandler();that.socket.fire("StatusChanged",RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE);});},comet:function(){var host=servers[0];startConnect(host);}};var isPolling=depend.isPolling;var type=isPolling?'comet':'ws';connectMap[type]();//注册状态改变观察者
var StatusEvent=Channel._ConnectionStatusListener;var hasEvent=typeof StatusEvent=="object";var me=this;me.socket.on("StatusChanged",function(code){if(!hasEvent){throw new Error("setConnectStatusListener:Parameter format is incorrect");}var isNetworkUnavailable=code==RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE;var isWebSocket=!RongIMLib.RongIMClient._memoryStore.depend.isPolling;if(RongIMLib.RongIMClient.isFirstConnect&&isNetworkUnavailable&&isWebSocket){code=RongIMLib.ConnectionStatus.WEBSOCKET_UNAVAILABLE;}if(isNetworkUnavailable){var storage=RongIMLib.RongIMClient._storageProvider;var servers=storage.getItem('servers');servers=JSON.parse(servers);var currentServer=RongIMLib.RongIMClient.currentServer;if(currentServer){var index=RongIMLib.RongUtil.indexOf(servers,currentServer);// 如果 currentServer 是 servers 的最后一个，不再替换位置
if(!RongIMLib.RongUtil.isEqual(index,-1)){var server=servers.splice(index,1)[0];servers.push(server);storage.setItem('servers',JSON.stringify(servers));}}}me.connectionStatus=code;setTimeout(function(){StatusEvent.onChanged(code);});var isDisconnected=code==RongIMLib.ConnectionStatus.DISCONNECTED;if(isDisconnected){self.clearHeartbeat();}var isOtherDevice=code==RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT;if(isOtherDevice){// 累计其他设备登陆次数，超过 5 次后，自动销毁内部对象
// 删除位置：ServerDataProivder.prototype.connect
RongIMLib.RongIMClient.otherDeviceLoginCount++;}var isConnected=code==RongIMLib.ConnectionStatus.CONNECTED;if(isConnected){RongIMLib.RongIMClient.isFirstConnect=false;}var isWebsocketUnAvailable=code==RongIMLib.ConnectionStatus.WEBSOCKET_UNAVAILABLE;if(isWebsocketUnAvailable){me.changeConnectType();RongIMLib.RongIMClient.isFirstConnect=false;RongIMLib.RongIMClient.connect(self.token,RongIMLib.RongIMClient._memoryStore.callback);}});//注册message观察者
this.socket.on("message",self.handler.handleMessage);//注册断开连接观察者
this.socket.on("disconnect",function(status){that.socket.fire("StatusChanged",status?status:2);});}Channel.prototype.changeConnectType=function(){RongIMLib.RongIMClient._memoryStore.depend.isPolling=!RongIMLib.RongIMClient._memoryStore.depend.isPolling;new RongIMLib.FeatureDectector();};Channel.prototype.writeAndFlush=function(val){this.socket.send(val);};Channel.prototype.reconnect=function(callback){RongIMLib.MessageIdHandler.clearMessageId();this.socket=this.socket.reconnect();if(callback){this.self.reconnectObj=callback;}};Channel.prototype.disconnect=function(status){this.socket.disconnect(status);};return Channel;}();RongIMLib.Channel=Channel;var Socket=function(){function Socket(){this.socket=null;this._events={};}Socket.getInstance=function(){return new Socket();};Socket.prototype.connect=function(url,cb){if(this.socket){if(url){RongIMLib.RongIMClient._storageProvider.setItem("rongSDK",this.checkTransport());this.on("connect",cb||new Function());}if(url){this.currentURL=url;}this.socket.createTransport(url);}return this;};Socket.prototype.createServer=function(){var transport=this.getTransport(this.checkTransport());if(transport===null){throw new Error("the channel was not supported");}return transport;};Socket.prototype.getTransport=function(transportType){if(transportType==Socket.XHR_POLLING){this.socket=new RongIMLib.PollingTransportation(this);}else if(transportType==Socket.WEBSOCKET){this.socket=new RongIMLib.SocketTransportation(this);}return this;};Socket.prototype.send=function(data){if(this.socket){if(this.checkTransport()==Socket.WEBSOCKET){this.socket.send(data);}else {this.socket.send(this._encode(data));}}};Socket.prototype.onMessage=function(data){this.fire("message",data);};Socket.prototype.disconnect=function(status){this.socket.disconnect(status);this.fire("disconnect",status);return this;};Socket.prototype.reconnect=function(){if(this.currentURL&&RongIMLib.RongIMClient._storageProvider.getItem("rongSDK")){return this.connect(this.currentURL,null);}else {throw new Error("reconnect:no have URL");}};/**
         * [checkTransport 返回通道类型]
         */Socket.prototype.checkTransport=function(){if(RongIMLib.RongIMClient._memoryStore.depend.isPolling){RongIMLib.Transportations._TransportType=Socket.XHR_POLLING;}return RongIMLib.Transportations._TransportType;};Socket.prototype.fire=function(x,args){if(x in this._events){for(var i=0,ii=this._events[x].length;i<ii;i++){this._events[x][i](args);}}return this;};Socket.prototype.on=function(x,func){if(!(typeof func=="function"&&x)){return this;}if(x in this._events){RongIMLib.MessageUtil.indexOf(this._events,func)==-1&&this._events[x].push(func);}else {this._events[x]=[func];}return this;};Socket.prototype.removeEvent=function(x,fn){if(x in this._events){for(var a=0,l=this._events[x].length;a<l;a++){if(this._events[x][a]==fn){this._events[x].splice(a,1);}}}return this;};Socket.prototype._encode=function(x){var str="?messageid="+x.getMessageId()+"&header="+x.getHeaderFlag()+"&sessionid="+RongIMLib.RongIMClient._storageProvider.getItem("sId"+RongIMLib.Navigation.Endpoint.userId);if(!/(PubAckMessage|QueryConMessage)/.test(x._name)){str+="&topic="+x.getTopic()+"&targetid="+(x.getTargetId()||"");}return {url:str,data:"getData"in x?x.getData():""};};//消息通道常量，所有和通道相关判断均用 XHR_POLLING WEBSOCKET两属性
Socket.XHR_POLLING="xhr-polling";Socket.WEBSOCKET="websocket";return Socket;}();RongIMLib.Socket=Socket;//连接端消息累
var Client=function(){function Client(token,appId){this.timeoutMillis=6000;this.timeout_=0;this.sdkVer='';this.apiVer=Math.floor(Math.random()*1e6);this.channel=null;this.handler=null;this.userId="";this.reconnectObj={};this.heartbeat=0;this.pullMsgHearbeat=0;this.chatroomId="";this.SyncTimeQueue=[];this.cacheMessageIds=[];this.token=token;this.appId=appId;this.SyncTimeQueue.state="complete";this.sdkVer=RongIMLib.RongIMClient.sdkver;}Client.prototype.resumeTimer=function(){var me=this;this.timeout_=setTimeout(function(){me.channel.disconnect(RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE);},this.timeoutMillis);};Client.prototype.pauseTimer=function(){if(this.timeout_){clearTimeout(this.timeout_);this.timeout_=0;}};Client.prototype.connect=function(_callback){//实例消息处理类
this.handler=new MessageHandler(this);//设置连接回调
this.handler.setConnectCallback(_callback);//实例通道类型
var me=this;this.channel=new Channel(function(){RongIMLib.Transportations._TransportType==Socket.WEBSOCKET&&me.keepLive();},this);//触发状态改变观察者
this.channel.socket.fire("StatusChanged",RongIMLib.ConnectionStatus.CONNECTING);//没有返回地址就手动抛出错误
//_callback.onError(ConnectionState.NOT_AUTHORIZED);
};Client.prototype.checkSocket=function(callback){var me=this;me.channel.writeAndFlush(new RongIMLib.PingReqMessage());var count=0;var checkTimeout=setInterval(function(){if(!RongIMLib.RongIMClient._memoryStore.isFirstPingMsg){clearInterval(checkTimeout);callback.onSuccess();}else {if(count>15){clearInterval(checkTimeout);callback.onError();}}count++;},100);};Client.prototype.keepLive=function(){if(this.heartbeat>0){clearInterval(this.heartbeat);}var me=this;me.heartbeat=setInterval(function(){me.resumeTimer();me.channel.writeAndFlush(new RongIMLib.PingReqMessage());},30000);if(me.pullMsgHearbeat>0){clearInterval(me.pullMsgHearbeat);}me.pullMsgHearbeat=setInterval(function(){me.syncTime(true,undefined,undefined,false);},180000);};Client.prototype.clearHeartbeat=function(){clearInterval(this.heartbeat);this.heartbeat=0;this.pauseTimer();clearInterval(this.pullMsgHearbeat);this.pullMsgHearbeat=0;};Client.prototype.publishMessage=function(_topic,_data,_targetId,_callback,_msg){var msgId=RongIMLib.MessageIdHandler.messageIdPlus(this.channel.reconnect);if(!msgId){return;}var msg=new RongIMLib.PublishMessage(_topic,_data,_targetId);msg.setMessageId(msgId);if(_callback){msg.setQos(Qos.AT_LEAST_ONCE);this.handler.putCallback(new RongIMLib.PublishCallback(_callback.onSuccess,_callback.onError),msg.getMessageId(),_msg);}else {msg.setQos(Qos.AT_MOST_ONCE);}this.channel.writeAndFlush(msg);};Client.prototype.queryMessage=function(_topic,_data,_targetId,_qos,_callback,pbtype){if(_topic=="userInf"){if(Client.userInfoMapping[_targetId]){_callback.onSuccess(Client.userInfoMapping[_targetId]);return;}}var msgId=RongIMLib.MessageIdHandler.messageIdPlus(this.channel.reconnect);if(!msgId){return;}var msg=new RongIMLib.QueryMessage(_topic,_data,_targetId);msg.setMessageId(msgId);msg.setQos(_qos);this.handler.putCallback(new RongIMLib.QueryCallback(_callback.onSuccess,_callback.onError),msg.getMessageId(),pbtype);this.channel.writeAndFlush(msg);};Client.prototype.invoke=function(isPullMsg,chrmId,offlineMsg){var time,modules,str,me=this,target,temp=this.SyncTimeQueue.shift();if(temp==undefined){return;}this.SyncTimeQueue.state="pending";var localSyncTime=RongIMLib.SyncTimeUtil.get();var sentBoxTime=localSyncTime.sent;if(temp.type!=2){//普通消息
time=localSyncTime.received;modules=new RongIMLib.RongIMClient.Protobuf.SyncRequestMsg();modules.setIspolling(false);str="pullMsg";target=this.userId;modules.setSendBoxSyncTime(sentBoxTime);}else {//聊天室消息
target=temp.chrmId||me.chatroomId;time=RongIMLib.RongIMClient._memoryStore.lastReadTime.get(target+Bridge._client.userId+"CST")||0;modules=new RongIMLib.RongIMClient.Protobuf.ChrmPullMsg();modules.setCount(0);str="chrmPull";if(!target){throw new Error("syncTime:Received messages of chatroom but was not init");}}//判断服务器给的时间是否消息本地存储的时间，小于的话不执行拉取操作，进行一下步队列操作
if(temp.pulltime<=time){this.SyncTimeQueue.state="complete";this.invoke(isPullMsg,target,offlineMsg);return;}if(isPullMsg&&'setIsPullSend'in modules){modules.setIsPullSend(true);}modules.setSyncTime(time);//发送queryMessage请求
this.queryMessage(str,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),target,Qos.AT_LEAST_ONCE,{onSuccess:function(collection){var sync=RongIMLib.MessageUtil.int64ToTimestamp(collection.syncTime),symbol=target;//把返回时间戳存入本地，普通消息key为userid，聊天室消息key为userid＋'CST'；value都为服务器返回的时间戳
var isChrmPull=str=='chrmPull';if(isChrmPull){symbol+=Bridge._client.userId+"CST";RongIMLib.RongIMClient._memoryStore.lastReadTime.set(symbol,sync);}else {var storage=RongIMLib.RongIMClient._storageProvider;if(sync>storage.getItem(symbol)){storage.setItem(symbol,sync);}}//把拉取到的消息逐条传给消息监听器
var list=collection.list;var isPullFinished=collection.finished;// chrmPull 没有 finished 字段，自动设置为拉取完成
if(isChrmPull){isPullFinished=true;}// 兼容长轮训 finished 为空的造成丢消息情况
if(typeof isPullFinished=='undefined'){isPullFinished=true;}RongIMLib.RongIMClient._memoryStore.isPullFinished=isPullFinished;var connectAckTime=RongIMLib.RongIMClient._memoryStore.connectAckTime;for(var i=0,len=list.length,count=len;i<len;i++){count-=1;var message=list[i];var sentTime=RongIMLib.MessageUtil.int64ToTimestamp(message.dataTime);var isSender=message.direction==RongIMLib.MessageDirection.SEND;var compareTime=isSender?sentBoxTime:time;if(sentTime>compareTime){var isSyncMessage=false;var isOffLineMessage=sentTime<connectAckTime;Bridge._client.handler.onReceived(message,undefined,isOffLineMessage,count,isSyncMessage,isPullFinished);}}me.SyncTimeQueue.state="complete";me.invoke(isPullMsg,target,offlineMsg);},onError:function(error){me.SyncTimeQueue.state="complete";me.invoke(isPullMsg,target,offlineMsg);}},"DownStreamMessages");};Client.prototype.syncTime=function(_type,pullTime,chrmId,offlineMsg){this.SyncTimeQueue.push({type:_type,pulltime:pullTime,chrmId:chrmId});//如果队列中只有一个成员并且状态已经完成就执行invoke方法
if(this.SyncTimeQueue.length==1&&this.SyncTimeQueue.state=="complete"){this.invoke(!_type,chrmId,offlineMsg);}};Client.prototype.__init=function(f){this.handler=new MessageHandler(this);//设置连接回调
this.handler.setConnectCallback(RongIMLib.RongIMClient._memoryStore.callback);this.channel=new Channel(f,this);};Client.userInfoMapping={};return Client;}();RongIMLib.Client=Client;//连接类，实现imclient与connect_client的连接
var Bridge=function(){function Bridge(){}Bridge.getInstance=function(){return new Bridge();};//连接服务器
Bridge.prototype.connect=function(appKey,token,callback){if(!RongIMLib.RongIMClient.Protobuf){return;}Bridge._client=new RongIMLib.Navigation().connect(appKey,token,callback);return Bridge._client;};Bridge.prototype.setListener=function(_changer){if(typeof _changer=="object"){if(typeof _changer.onChanged=="function"){Channel._ConnectionStatusListener=_changer;}else if(typeof _changer.onReceived=="function"){Channel._ReceiveMessageListener=_changer;}}};Bridge.prototype.reconnect=function(callabck){Bridge._client.channel.reconnect(callabck);};Bridge.prototype.disconnect=function(){Bridge._client.channel.disconnect(2);};//执行queryMessage请求
Bridge.prototype.queryMsg=function(topic,content,targetId,callback,pbname){if(typeof topic!="string"){topic=_topic[topic];}Bridge._client.queryMessage(topic,content,targetId,Qos.AT_MOST_ONCE,callback,pbname);};//发送消息 执行publishMessage 请求
Bridge.prototype.pubMsg=function(topic,content,targetId,callback,msg,methodType){if(typeof methodType=='number'){if(methodType==RongIMLib.MethodType.CUSTOMER_SERVICE){Bridge._client.publishMessage("pcuMsgP",content,targetId,callback,msg);}else if(methodType==RongIMLib.MethodType.RECALL){Bridge._client.publishMessage("recallMsg",content,targetId,callback,msg);}}else {Bridge._client.publishMessage(_topic[10][topic],content,targetId,callback,msg);}};return Bridge;}();RongIMLib.Bridge=Bridge;var MessageHandler=function(){function MessageHandler(client){this.map={};this.connectCallback=null;if(!Channel._ReceiveMessageListener){throw new Error("please set onReceiveMessageListener");}this._onReceived=Channel._ReceiveMessageListener.onReceived;this._client=client;this.syncMsgMap=new Object();}//把对象推入回调对象队列中，并启动定时器
MessageHandler.prototype.putCallback=function(callbackObj,_publishMessageId,_msg){var item={Callback:callbackObj,Message:_msg};item.Callback.resumeTimer();this.map[_publishMessageId]=item;};//设置连接回调对象，启动定时器
MessageHandler.prototype.setConnectCallback=function(_connectCallback){if(_connectCallback){this.connectCallback=new RongIMLib.ConnectAck(_connectCallback.onSuccess,_connectCallback.onError,this._client);}};MessageHandler.prototype.onReceived=function(msg,pubAckItem,offlineMsg,leftCount,isSync){//实体对象
var entity,//解析完成的消息对象
message,//会话对象
con;if(msg._name!="PublishMessage"){entity=msg;RongIMLib.RongIMClient._storageProvider.setItem(this._client.userId,RongIMLib.MessageUtil.int64ToTimestamp(entity.dataTime));}else {if(msg.getTopic()=="s_ntf"){entity=RongIMLib.RongIMClient.Protobuf.NotifyMsg.decode(msg.getData());this._client.syncTime(entity.type,RongIMLib.MessageUtil.int64ToTimestamp(entity.time),entity.chrmId);return;}else if(msg.getTopic()=="s_msg"){entity=RongIMLib.RongIMClient.Protobuf.DownStreamMessage.decode(msg.getData());var timestamp=RongIMLib.MessageUtil.int64ToTimestamp(entity.dataTime);RongIMLib.RongIMClient._storageProvider.setItem(this._client.userId,timestamp);RongIMLib.RongIMClient._memoryStore.lastReadTime.get(this._client.userId,timestamp);}else if(msg.getTopic()=="s_stat"){entity=RongIMLib.RongIMClient.Protobuf.GetUserStatusOutput.decode(msg.getData());entity=RongIMLib.RongInnerTools.convertUserStatus(entity);RongIMLib.RongIMClient.userStatusObserver.notify({key:entity.userId,entity:entity});return;}else {if(Bridge._client.sdkVer&&Bridge._client.sdkVer=="1.0.0"){return;}entity=RongIMLib.RongIMClient.Protobuf.UpStreamMessage.decode(msg.getData());var tmpTopic=msg.getTopic();var tmpType=tmpTopic.substr(0,2);if(tmpType=="pp"){entity.type=1;}else if(tmpType=="pd"){entity.type=2;}else if(tmpType=="pg"){entity.type=3;}else if(tmpType=="ch"){entity.type=4;}else if(tmpType=="pc"){entity.type=5;}//复用字段，targetId 以此为准
entity.groupId=msg.getTargetId();entity.fromUserId=this._client.userId;entity.dataTime=Date.parse(new Date().toString());}if(!entity){return;}}var isPullFinished=RongIMLib.RongIMClient._memoryStore.isPullFinished;// PullMsg 没有拉取完成，抛弃所有直发在线消息，抛弃的消息会在 PullMsg 中返回
if(!isPullFinished&&!offlineMsg){return;}//解析实体对象为消息对象。
message=RongIMLib.MessageUtil.messageParser(entity,this._onReceived,offlineMsg);var isRTCMessage=message.conversationType==12;if(isRTCMessage){return RongIMLib.RongIMClient.RTCListener(message);}var isRecall=msg.getTopic&&msg.getTopic()=="recallMsg";if(isRecall){var content=message.content;message.conversationType=content.conversationType;message.targetId=content.targetId;message.messageId=null;}if(pubAckItem){message.messageUId=pubAckItem.getMessageUId();message.sentTime=pubAckItem.getTimestamp();RongIMLib.RongIMClient._storageProvider.setItem(this._client.userId,message.sentTime);}if(message===null){return;}var isChatroomMessage=message.conversationType==RongIMLib.ConversationType.CHATROOM;if(!isChatroomMessage){var msgTag=RongIMLib.RongIMClient.MessageParams[message.messageType].msgTag.getMessageTag();if(msgTag>=0){RongIMLib.SyncTimeUtil.set(message);}var isSend=message.messageDirection==RongIMLib.MessageDirection.SEND;if(isSend){var storageProvider=RongIMLib.RongIMClient._storageProvider;var userId=RongIMLib.Bridge._client.userId;var lastSentTime=storageProvider.getItem('last_sentTime_'+userId)||0;if(message.sentTime<=lastSentTime&&!isSync){return;}}}// 设置会话时间戳并且判断是否传递 message  发送消息未处理会话时间戳
// key：'converST_' + 当前用户 + conversationType + targetId
// RongIMClient._storageProvider.setItem('converST_' + Bridge._client.userId + message.conversationType + message.targetId, message.sentTime);
var isPersited=RongIMLib.RongIMClient.MessageParams[message.messageType].msgTag.getMessageTag()>0;if(isPersited){con=RongIMLib.RongIMClient._dataAccessProvider.getConversation(message.conversationType,message.targetId,{onSuccess:function(){},onError:function(){}});if(!con){con=RongIMLib.RongIMClient.getInstance().createConversation(message.conversationType,message.targetId,"");}if(message.messageDirection==RongIMLib.MessageDirection.RECEIVE&&(entity.status&64)==64){var mentioneds=RongIMLib.RongIMClient._storageProvider.getItem("mentioneds_"+Bridge._client.userId+'_'+message.conversationType+'_'+message.targetId);var key=message.conversationType+'_'+message.targetId,info={};if(message.content&&message.content.mentionedInfo){info[key]={uid:message.messageUId,time:message.sentTime,mentionedInfo:message.content.mentionedInfo};RongIMLib.RongIMClient._storageProvider.setItem("mentioneds_"+Bridge._client.userId+'_'+message.conversationType+'_'+message.targetId,JSON.stringify(info));mentioneds=JSON.stringify(info);}if(mentioneds){var info=JSON.parse(mentioneds);con.mentionedMsg=info[key];}}var isReceiver=message.messageDirection==RongIMLib.MessageDirection.RECEIVE;if(isReceiver&&message.senderUserId!=Bridge._client.userId){con.unreadMessageCount=con.unreadMessageCount+1;if(RongIMLib.RongUtil.supportLocalStorage()){var originUnreadCount=RongIMLib.RongIMClient._storageProvider.getItem("cu"+Bridge._client.userId+con.conversationType+con.targetId);// 与本地存储会话合并
var newUnreadCount=Number(originUnreadCount)+1;RongIMLib.RongIMClient._storageProvider.setItem("cu"+Bridge._client.userId+con.conversationType+message.targetId,newUnreadCount);con.unreadMessageCount=newUnreadCount;}}con.receivedTime=new Date().getTime();con.receivedStatus=message.receivedStatus;con.senderUserId=message.sendUserId;con.notificationStatus=RongIMLib.ConversationNotificationStatus.DO_NOT_DISTURB;con.latestMessageId=message.messageId;con.latestMessage=message;con.sentTime=message.sentTime;RongIMLib.RongIMClient._dataAccessProvider.addConversation(con,{onSuccess:function(data){},onError:function(){}});}if(message.conversationType==RongIMLib.ConversationType.CUSTOMER_SERVICE&&(message.messageType=="ChangeModeResponseMessage"||message.messageType=="SuspendMessage"||message.messageType=="HandShakeResponseMessage"||message.messageType=="TerminateMessage"||message.messageType=="CustomerStatusUpdateMessage"||message.messageType=="TextMessage"||message.messageType=="InformationNotificationMessage")){if(!RongIMLib.RongIMClient._memoryStore.custStore["isInit"]){return;}}if(message.conversationType==RongIMLib.ConversationType.CUSTOMER_SERVICE&&message.messageType!="HandShakeResponseMessage"){if(!RongIMLib.RongIMClient._memoryStore.custStore[message.targetId]){return;}if(message.messageType=="TerminateMessage"){if(RongIMLib.RongIMClient._memoryStore.custStore[message.targetId].sid!=message.content.sid){return;}}}if(message.messageType===RongIMLib.RongIMClient.MessageType["HandShakeResponseMessage"]){var session=message.content.data;RongIMLib.RongIMClient._memoryStore.custStore[message.targetId]=session;if(session.serviceType==RongIMLib.CustomerType.ONLY_HUMAN||session.serviceType==RongIMLib.CustomerType.HUMAN_FIRST){if(session.notAutoCha=="1"){RongIMLib.RongIMClient.getInstance().switchToHumanMode(message.targetId,{onSuccess:function(){},onError:function(){}});}}}var d=new Date(),m=d.getMonth()+1,date=d.getFullYear()+'/'+(m.toString().length==1?'0'+m:m)+'/'+d.getDate();//new Date(date).getTime() - message.sentTime < 1 逻辑判断 超过 1 天未收的 ReadReceiptRequestMessage 离线消息自动忽略。
var dealtime=new Date(date).getTime()-message.sentTime<0;if(RongIMLib.RongUtil.supportLocalStorage()&&message.messageType===RongIMLib.RongIMClient.MessageType["ReadReceiptRequestMessage"]&&dealtime&&message.messageDirection==RongIMLib.MessageDirection.SEND){var sentkey=Bridge._client.userId+message.content.messageUId+"SENT";RongIMLib.RongIMClient._storageProvider.setItem(sentkey,JSON.stringify({count:0,dealtime:message.sentTime,userIds:{}}));}else if(RongIMLib.RongUtil.supportLocalStorage()&&message.messageType===RongIMLib.RongIMClient.MessageType["ReadReceiptRequestMessage"]&&dealtime){var reckey=Bridge._client.userId+message.conversationType+message.targetId+'RECEIVED',recData=JSON.parse(RongIMLib.RongIMClient._storageProvider.getItem(reckey));if(recData){if(message.senderUserId in recData){if(recData[message.senderUserId].uIds&&recData[message.senderUserId].uIds&&recData[message.senderUserId].uIds.indexOf(message.content.messageUId)==-1){recData[message.senderUserId].uIds.push(message.content.messageUId);recData[message.senderUserId].dealtime=message.sentTime;recData[message.senderUserId].isResponse=false;RongIMLib.RongIMClient._storageProvider.setItem(reckey,JSON.stringify(recData));}else {return;}}else {var objSon={uIds:[message.content.messageUId],dealtime:message.sentTime,isResponse:false};recData[message.senderUserId]=objSon;RongIMLib.RongIMClient._storageProvider.setItem(reckey,JSON.stringify(recData));}}else {var obj={};obj[message.senderUserId]={uIds:[message.content.messageUId],dealtime:message.sentTime,isResponse:false};RongIMLib.RongIMClient._storageProvider.setItem(reckey,JSON.stringify(obj));}}if(RongIMLib.RongUtil.supportLocalStorage()&&message.messageType===RongIMLib.RongIMClient.MessageType["ReadReceiptResponseMessage"]&&dealtime){var receiptResponseMsg=message.content,uIds=receiptResponseMsg.receiptMessageDic[Bridge._client.userId],sentkey="",sentObj;message.receiptResponse||(message.receiptResponse={});if(uIds){var cbuIds=[];for(var i=0,len=uIds.length;i<len;i++){sentkey=Bridge._client.userId+uIds[i]+"SENT";sentObj=JSON.parse(RongIMLib.RongIMClient._storageProvider.getItem(sentkey));if(sentObj&&!(message.senderUserId in sentObj.userIds)){cbuIds.push(uIds[i]);sentObj.count+=1;sentObj.userIds[message.senderUserId]=message.sentTime;message.receiptResponse[uIds[i]]=sentObj.count;RongIMLib.RongIMClient._storageProvider.setItem(sentkey,JSON.stringify(sentObj));}}receiptResponseMsg.receiptMessageDic[Bridge._client.userId]=cbuIds;message.content=receiptResponseMsg;}}var that=this;if(RongIMLib.RongIMClient._voipProvider&&['AcceptMessage','RingingMessage','HungupMessage','InviteMessage','MediaModifyMessage','MemberModifyMessage'].indexOf(message.messageType)>-1){setTimeout(function(){RongIMLib.RongIMClient._voipProvider.onReceived(message);});}else {var count=leftCount||0;var hasMore=!isPullFinished;setTimeout(function(){that._onReceived(message,count,hasMore);});}};MessageHandler.prototype.handleMessage=function(msg){if(!msg){return;}switch(msg._name){case"ConnAckMessage":Bridge._client.handler.connectCallback.process(msg.getStatus(),msg.getUserId(),msg.getTimestamp());break;case"PublishMessage":if(!msg.getSyncMsg()&&msg.getQos()!=0){Bridge._client.channel.writeAndFlush(new RongIMLib.PubAckMessage(msg.getMessageId()));}// TODO && ->
if(msg.getSyncMsg()&&!RongIMLib.RongIMClient._memoryStore.depend.isPolling){Bridge._client.handler.syncMsgMap[msg.getMessageId()]=msg;}else {//如果是PublishMessage就把该对象给onReceived方法执行处理
Bridge._client.handler.onReceived(msg);}break;case"QueryAckMessage":if(msg.getQos()!=0){Bridge._client.channel.writeAndFlush(new RongIMLib.QueryConMessage(msg.getMessageId()));}var temp=Bridge._client.handler.map[msg.getMessageId()];if(temp){//执行回调操作
temp.Callback.process(msg.getStatus(),msg.getData(),msg.getDate(),temp.Message);delete Bridge._client.handler.map[msg.getMessageId()];}break;case"PubAckMessage":var item=Bridge._client.handler.map[msg.getMessageId()];if(item){item.Callback.process(msg.getStatus()||0,msg.getMessageUId(),msg.getTimestamp(),item.Message,msg.getMessageId());delete Bridge._client.handler.map[msg.getMessageId()];}else {var userId=RongIMLib.Bridge._client.userId;RongIMLib.RongIMClient._storageProvider.setItem('last_sentTime_'+userId,msg.timestamp);Bridge._client.handler.onReceived(Bridge._client.handler.syncMsgMap[msg.messageId],msg,null,null,true);delete Bridge._client.handler.syncMsgMap[msg.getMessageId()];}break;case"PingRespMessage":if(RongIMLib.RongIMClient._memoryStore.isFirstPingMsg){RongIMLib.RongIMClient._memoryStore.isFirstPingMsg=false;}else {Bridge._client.pauseTimer();}break;case"DisconnectMessage":Bridge._client.channel.disconnect(msg.getStatus());break;}};return MessageHandler;}();RongIMLib.MessageHandler=MessageHandler;})(RongIMLib||(RongIMLib={}));var __extends=this&&this.__extends||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];function __(){this.constructor=d;}d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __());};/// <reference path="../dts/helper.d.ts"/>
var RongIMLib;(function(RongIMLib){var MessageCallback=function(){function MessageCallback(error){this.timeout=null;this.onError=null;if(error&&typeof error=="number"){this.timeoutMillis=error;}else {this.timeoutMillis=30000;this.onError=error;}}MessageCallback.prototype.resumeTimer=function(){var me=this;if(this.timeoutMillis>0&&!this.timeout){this.timeout=setTimeout(function(){me.readTimeOut(true);},this.timeoutMillis);}};MessageCallback.prototype.pauseTimer=function(){if(this.timeout){clearTimeout(this.timeout);this.timeout=null;}};MessageCallback.prototype.readTimeOut=function(isTimeout){if(isTimeout&&this.onError){this.onError(RongIMLib.ErrorCode.TIMEOUT);}else {this.pauseTimer();}};return MessageCallback;}();RongIMLib.MessageCallback=MessageCallback;var CallbackMapping=function(){function CallbackMapping(){this.publicServiceList=[];}CallbackMapping.getInstance=function(){return new CallbackMapping();};CallbackMapping.prototype.pottingProfile=function(item){var temp;this.profile=new RongIMLib.PublicServiceProfile();temp=JSON.parse(item.extra);this.profile.isGlobal=temp.isGlobal;this.profile.introduction=temp.introduction;this.profile.menu=temp.menu;this.profile.hasFollowed=temp.follow;this.profile.publicServiceId=item.mpid;this.profile.name=item.name;this.profile.portraitUri=item.portraitUrl;this.profile.conversationType=item.type=="mc"?RongIMLib.ConversationType.APP_PUBLIC_SERVICE:RongIMLib.ConversationType.PUBLIC_SERVICE;this.publicServiceList.push(this.profile);};CallbackMapping.prototype.mapping=function(entity,tag){switch(tag){case"GetUserInfoOutput":var userInfo=new RongIMLib.UserInfo(entity.userId,entity.userName,entity.userPortrait);return userInfo;case"GetQNupTokenOutput":return {deadline:RongIMLib.MessageUtil.int64ToTimestamp(entity.deadline),token:entity.token};case"GetQNdownloadUrlOutput":return {downloadUrl:entity.downloadUrl};case"CreateDiscussionOutput":return entity.id;case"ChannelInfoOutput":var disInfo=new RongIMLib.Discussion();disInfo.creatorId=entity.adminUserId;disInfo.id=entity.channelId;disInfo.memberIdList=entity.firstTenUserIds;disInfo.name=entity.channelName;disInfo.isOpen=entity.openStatus;return disInfo;case"GroupHashOutput":return entity.result;case"QueryBlackListOutput":return entity.userIds;case"SearchMpOutput":case"PullMpOutput":if(entity.info){var self=this;Array.forEach(entity.info,function(item){setTimeout(function(){self.pottingProfile(item);},100);});}return this.publicServiceList;default:return entity;}};return CallbackMapping;}();RongIMLib.CallbackMapping=CallbackMapping;var PublishCallback=function(_super){__extends(PublishCallback,_super);function PublishCallback(_cb,_timeout){_super.call(this,_timeout);this._cb=_cb;this._timeout=_timeout;}PublishCallback.prototype.process=function(_status,messageUId,timestamp,_msg,messageId){this.readTimeOut();if(_status==0){if(_msg){_msg.setSentStatus=_status;}var isPullFinished=RongIMLib.RongIMClient._memoryStore.isPullFinished;if(isPullFinished){var userId=RongIMLib.Bridge._client.userId;var stroageProvider=RongIMLib.RongIMClient._storageProvider;stroageProvider.setItem('last_sentTime_'+userId,timestamp);RongIMLib.SyncTimeUtil.set({messageDirection:RongIMLib.MessageDirection.SEND,sentTime:timestamp});}this._cb({messageUId:messageUId,timestamp:timestamp,messageId:messageId});}else {this._timeout(_status,{messageUId:messageUId,sentTime:timestamp});}};PublishCallback.prototype.readTimeOut=function(x){MessageCallback.prototype.readTimeOut.call(this,x);};return PublishCallback;}(MessageCallback);RongIMLib.PublishCallback=PublishCallback;var QueryCallback=function(_super){__extends(QueryCallback,_super);function QueryCallback(_cb,_timeout){_super.call(this,_timeout);this._cb=_cb;this._timeout=_timeout;}QueryCallback.prototype.process=function(status,data,serverTime,pbtype){this.readTimeOut();if(pbtype&&data&&status==0){try{data=CallbackMapping.getInstance().mapping(RongIMLib.RongIMClient.Protobuf[pbtype].decode(data),pbtype);}catch(e){this._timeout(RongIMLib.ErrorCode.UNKNOWN);return;}if("GetUserInfoOutput"==pbtype){//pb类型为GetUserInfoOutput的话就把data放入userinfo缓存队列
RongIMLib.Client.userInfoMapping[data.userId]=data;}this._cb(data);}else {status>0?this._timeout(status):this._cb(status);}};QueryCallback.prototype.readTimeOut=function(x){MessageCallback.prototype.readTimeOut.call(this,x);};return QueryCallback;}(MessageCallback);RongIMLib.QueryCallback=QueryCallback;var ConnectAck=function(_super){__extends(ConnectAck,_super);function ConnectAck(_cb,_timeout,client){_super.call(this,_timeout);this._client=client;this._cb=_cb;this._timeout=_timeout;}ConnectAck.prototype.process=function(status,userId,timestamp){this.readTimeOut();if(status==0){this._client.userId=userId;var self=this;if(!RongIMLib.RongIMClient._memoryStore.depend.isPolling&&RongIMLib.RongIMClient._memoryStore.isFirstPingMsg){RongIMLib.Bridge._client.checkSocket({onSuccess:function(){if(!RongIMLib.RongIMClient.isNotPullMsg){self._client.syncTime(undefined,undefined,undefined,true);}},onError:function(){RongIMLib.RongIMClient._memoryStore.isFirstPingMsg=false;RongIMLib.RongIMClient.getInstance().disconnect();RongIMLib.RongIMClient.connect(RongIMLib.RongIMClient._memoryStore.token,RongIMLib.RongIMClient._memoryStore.callback);}});}else {if(!RongIMLib.RongIMClient.isNotPullMsg){self._client.syncTime(undefined,undefined,undefined,true);}}RongIMLib.Bridge._client.channel.socket.fire("StatusChanged",0);if(this._client.reconnectObj.onSuccess){this._client.reconnectObj.onSuccess(userId);delete this._client.reconnectObj.onSuccess;}else {var me=this;setTimeout(function(){me._cb(userId);},500);}RongIMLib.RongIMClient._memoryStore.connectAckTime=timestamp;if(!(new Date().getTime()-timestamp)){RongIMLib.RongIMClient._memoryStore.deltaTime=0;}else {RongIMLib.RongIMClient._memoryStore.deltaTime=new Date().getTime()-timestamp;}}else if(status==6){RongIMLib.RongIMClient.getInstance().disconnect();//重定向 连错 CMP
var me=this;var _client=me._client;var appId=_client.appId,token=_client.token;new RongIMLib.Navigation().requestNavi(token,appId,function(){_client.clearHeartbeat();var newClient=new RongIMLib.Client(token,appId);RongIMLib.Bridge._client=newClient;newClient.__init(function(){RongIMLib.Transportations._TransportType=="websocket"&&newClient.keepLive();});},me._timeout,false);}else {RongIMLib.Bridge._client.channel.socket.socket._status=status;if(this._client.reconnectObj.onError){this._client.reconnectObj.onError(status);delete this._client.reconnectObj.onError;}else {this._timeout(status);}}};ConnectAck.prototype.readTimeOut=function(x){MessageCallback.prototype.readTimeOut.call(this,x);};return ConnectAck;}(MessageCallback);RongIMLib.ConnectAck=ConnectAck;})(RongIMLib||(RongIMLib={}));var RongIMLib;(function(RongIMLib){var Navigation=function(){function Navigation(){}Navigation.clear=function(){var storage=RongIMLib.RongIMClient._storageProvider;storage.removeItem('rc_uid');storage.removeItem('serverIndex');storage.removeItem('rongSDK');};Navigation.prototype.getNaviSuccess=function(result){var storage=RongIMLib.RongIMClient._storageProvider;storage.setItem('fullnavi',JSON.stringify(result));var server=result.server;if(server){server+=',';}var backupServer=result.backupServer||'';var tpl='{server}{backupServer}';var servers=RongIMLib.RongUtil.tplEngine(tpl,{server:server,backupServer:backupServer});servers=servers.split(',');storage.setItem('servers',JSON.stringify(servers));var token=RongIMLib.RongIMClient._memoryStore.token;var uid=RongIMLib.InnerUtil.getUId(token);storage.setItem('rc_uid',uid);var userId=result.userId;storage.setItem('current_user',userId);if(result.voipCallInfo){var callInfo=JSON.parse(result.voipCallInfo);RongIMLib.RongIMClient._memoryStore.voipStategy=callInfo.strategy;storage.setItem("voipStrategy",callInfo.strategy);}//替换本地存储的导航信息 
var openMp=result.openMp;storage.setItem('openMp'+uid,openMp);RongIMLib.RongIMClient._memoryStore.depend.openMp=openMp;};Navigation.prototype.connect=function(appId,token,callback){var oldAppId=RongIMLib.RongIMClient._storageProvider.getItem("appId");//如果appid和本地存储的不一样，清空所有本地存储数据
if(oldAppId&&oldAppId!=appId){RongIMLib.RongIMClient._storageProvider.clearItem();RongIMLib.RongIMClient._storageProvider.setItem("appId",appId);}if(!oldAppId){RongIMLib.RongIMClient._storageProvider.setItem("appId",appId);}var client=new RongIMLib.Client(token,appId);this.requestNavi(token,appId,function(){client.connect(callback);},callback.onError,true);return client;};Navigation.prototype.requestNavi=function(token,appId,_onsuccess,_onerror,unignore){if(unignore){//根据token生成MD5截取8-16下标的数据与本地存储的导航信息进行比对
//如果信息和上次的通道类型都一样，不执行navi请求，用本地存储的导航信息连接服务器
var uId=md5(token).slice(8,16);var storage=RongIMLib.RongIMClient._storageProvider;var transportType=storage.getItem("rongSDK");var isSameType=RongIMLib.Transportations._TransportType==transportType;var _old=storage.getItem('rc_uid');var isSameUser=_old==uId;var servers=storage.getItem('servers');var hasServers=typeof servers=='string';if(isSameUser&&isSameType&&hasServers){RongIMLib.RongIMClient._memoryStore.voipStategy=storage.getItem("voipStrategy");var openMp=storage.getItem('openMp'+uId);RongIMLib.RongIMClient._memoryStore.depend.openMp=openMp;_onsuccess();return;}}Navigation.clear();var StatusEvent=RongIMLib.Channel._ConnectionStatusListener;var depend=RongIMLib.RongIMClient._memoryStore.depend;var navigaters=depend.navigaters;var naviTimeout=depend.naviTimeout;var maxNaviRetry=depend.maxNaviRetry;var context=this;var timer=new RongIMLib.Timer({timeout:naviTimeout});var internalRetry=1;var isRange=function(){return internalRetry>=maxNaviRetry;};var indexTools=new RongIMLib.IndexTools({items:navigaters,onwheel:function(){internalRetry+=1;}});var consume=function(){if(isRange()){_onerror(RongIMLib.ConnectionStatus.RESPONSE_NAVI_ERROR);return;}var index=indexTools.get();var navi=navigaters[index];indexTools.add();var success=function(result){timer.pause();StatusEvent.onChanged(RongIMLib.ConnectionStatus.RESPONSE_NAVI);var code=result.code;if(RongIMLib.RongUtil.isEqual(code,200)){context.getNaviSuccess(result);_onsuccess();}if(RongIMLib.RongUtil.isEqual(code,401)){_onerror(RongIMLib.ConnectionState.TOKEN_INCORRECT);}if(RongIMLib.RongUtil.isEqual(code,403)){StatusEvent.onChanged(RongIMLib.ConnectionStatus.APPKEY_IS_FAKE);}};var error=function(status){if(RongIMLib.RongUtil.isEqual(status,0)){return;}timer.pause();StatusEvent.onChanged(RongIMLib.ConnectionStatus.RESPONSE_NAVI_ERROR);consume();};StatusEvent.onChanged(RongIMLib.ConnectionStatus.REQUEST_NAVI);var xhr=context.request(navi,appId,token,success,error);timer.resume(function(){StatusEvent.onChanged(RongIMLib.ConnectionStatus.RESPONSE_NAVI_TIMEOUT);xhr.abort();consume();});};consume();};Navigation.prototype.request=function(navi,appId,token,success,error){var depend=RongIMLib.RongIMClient._memoryStore.depend;var path=depend.isPolling?'cometnavi':'navi';token=encodeURIComponent(token);var sdkver=RongIMLib.RongIMClient.sdkver;var random=RongIMLib.RongUtil.getTimestamp();var tpl='{navi}/{path}.js?appId={appId}&token={token}&callBack=null&v={sdkver}&r={random}';var url=RongIMLib.RongUtil.tplEngine(tpl,{navi:navi,path:path,appId:appId,token:token,sdkver:sdkver,random:random});return RongIMLib.RongUtil.request({url:url,success:function(result){result=result.replace('null(','').replace(');','');// 兼容私有云无分号
var lastIndex=result.lastIndexOf(')');var maxIndex=result.length-1;if(lastIndex==maxIndex){result=result.substr(0,lastIndex);}success(JSON.parse(result));},error:function(status,result){if(status==401||status==403){success(JSON.parse(result));}else {error(status);}}});};Navigation.Endpoint=new Object();return Navigation;}();RongIMLib.Navigation=Navigation;})(RongIMLib||(RongIMLib={}));// TODO: 统一变量、方法等命名规范
var RongIMLib;(function(RongIMLib){/**
     * 消息基类
     */var BaseMessage=function(){function BaseMessage(arg){this._name="BaseMessage";this.lengthSize=0;if(arg instanceof RongIMLib.Header){this._header=arg;}else {this._header=new RongIMLib.Header(arg,false,RongIMLib.Qos.AT_MOST_ONCE,false);}}BaseMessage.prototype.read=function(In,length){this.readMessage(In,length);};BaseMessage.prototype.write=function(Out){var binaryHelper=new RongIMLib.BinaryHelper();var out=binaryHelper.convertStream(Out);this._headerCode=this.getHeaderFlag();out.write(this._headerCode);this.writeMessage(out);return out;};BaseMessage.prototype.getHeaderFlag=function(){return this._header.encode();};BaseMessage.prototype.getLengthSize=function(){return this.lengthSize;};BaseMessage.prototype.toBytes=function(){return this.write([]).getBytesArray();};BaseMessage.prototype.isRetained=function(){return this._header.retain;};BaseMessage.prototype.setRetained=function(retain){this._header.retain=retain;};BaseMessage.prototype.setQos=function(qos){this._header.qos=Object.prototype.toString.call(qos)=="[object Object]"?qos:RongIMLib.Qos[qos];};BaseMessage.prototype.setDup=function(dup){this._header.dup=dup;};BaseMessage.prototype.isDup=function(){return this._header.dup;};BaseMessage.prototype.getType=function(){return this._header.type;};BaseMessage.prototype.getQos=function(){return this._header.qos;};BaseMessage.prototype.messageLength=function(){return 0;};BaseMessage.prototype.writeMessage=function(out){};BaseMessage.prototype.readMessage=function(In,length){};BaseMessage.prototype.init=function(args){var valName,nana,me=this;for(nana in args){if(!args.hasOwnProperty(nana)){continue;}valName=nana.replace(/^\w/,function(x){var tt=x.charCodeAt(0);return "set"+(tt>=0x61?String.fromCharCode(tt&~32):x);});if(valName in me){if(nana=="status"){me[valName](disconnectStatus[args[nana]]?disconnectStatus[args[nana]]:args[nana]);}else {me[valName](args[nana]);}}}};return BaseMessage;}();RongIMLib.BaseMessage=BaseMessage;/**
     *连接消息类型
     */var ConnectMessage=function(_super){__extends(ConnectMessage,_super);function ConnectMessage(header){_super.call(this,arguments.length==0||arguments.length==3?RongIMLib.Type.CONNECT:arguments[0]);this._name="ConnectMessage";this.CONNECT_HEADER_SIZE=12;this.protocolId="RCloud";this.binaryHelper=new RongIMLib.BinaryHelper();this.protocolVersion=3;switch(arguments.length){case 0:case 1:case 3:if(!arguments[0]||arguments[0].length>64){throw new Error("ConnectMessage:Client Id cannot be null and must be at most 64 characters long: "+arguments[0]);}this.clientId=arguments[0];this.cleanSession=arguments[1];this.keepAlive=arguments[2];break;}}ConnectMessage.prototype.messageLength=function(){var payloadSize=this.binaryHelper.toMQttString(this.clientId).length;payloadSize+=this.binaryHelper.toMQttString(this.willTopic).length;payloadSize+=this.binaryHelper.toMQttString(this.will).length;payloadSize+=this.binaryHelper.toMQttString(this.appId).length;payloadSize+=this.binaryHelper.toMQttString(this.token).length;return payloadSize+this.CONNECT_HEADER_SIZE;};ConnectMessage.prototype.readMessage=function(stream){this.protocolId=stream.readUTF();this.protocolVersion=stream.readByte();var cFlags=stream.readByte();this.hasAppId=(cFlags&128)>0;this.hasToken=(cFlags&64)>0;this.retainWill=(cFlags&32)>0;this.willQos=cFlags>>3&3;this.hasWill=(cFlags&4)>0;this.cleanSession=(cFlags&32)>0;this.keepAlive=stream.read()*256+stream.read();this.clientId=stream.readUTF();if(this.hasWill){this.willTopic=stream.readUTF();this.will=stream.readUTF();}if(this.hasAppId){try{this.appId=stream.readUTF();}catch(ex){throw new Error(ex);}}if(this.hasToken){try{this.token=stream.readUTF();}catch(ex){throw new Error(ex);}}return stream;};ConnectMessage.prototype.writeMessage=function(out){var stream=this.binaryHelper.convertStream(out);stream.writeUTF(this.protocolId);stream.write(this.protocolVersion);var flags=this.cleanSession?2:0;flags|=this.hasWill?4:0;flags|=this.willQos?this.willQos>>3:0;flags|=this.retainWill?32:0;flags|=this.hasToken?64:0;flags|=this.hasAppId?128:0;stream.write(flags);stream.writeChar(this.keepAlive);stream.writeUTF(this.clientId);if(this.hasWill){stream.writeUTF(this.willTopic);stream.writeUTF(this.will);}if(this.hasAppId){stream.writeUTF(this.appId);}if(this.hasToken){stream.writeUTF(this.token);}return stream;};return ConnectMessage;}(BaseMessage);RongIMLib.ConnectMessage=ConnectMessage;/**
     *连接应答类型
     */var ConnAckMessage=function(_super){__extends(ConnAckMessage,_super);function ConnAckMessage(header){_super.call(this,arguments.length==0?RongIMLib.Type.CONNACK:arguments.length==1?arguments[0]instanceof RongIMLib.Header?arguments[0]:RongIMLib.Type.CONNACK:null);this._name="ConnAckMessage";this.MESSAGE_LENGTH=2;this.binaryHelper=new RongIMLib.BinaryHelper();var me=this;switch(arguments.length){case 0:case 1:if(!(arguments[0]instanceof RongIMLib.Header)){if(arguments[0]in RongIMLib.ConnectionState){if(arguments[0]==null){throw new Error("ConnAckMessage:The status of ConnAskMessage can't be null");}me.setStatus(arguments[0]);}}break;}}ConnAckMessage.prototype.messageLength=function(){var length=this.MESSAGE_LENGTH;if(this.userId){length+=this.binaryHelper.toMQttString(this.userId).length;}return length;};ConnAckMessage.prototype.readMessage=function(_in,msglength){_in.read();var result=+_in.read();if(result>=0&&result<=12){this.setStatus(result);}else {throw new Error("Unsupported CONNACK code:"+result);}if(msglength>this.MESSAGE_LENGTH){this.setUserId(_in.readUTF());var sessionId=_in.readUTF();var timestamp=_in.readLong();this.setTimestamp(timestamp);}};ConnAckMessage.prototype.writeMessage=function(out){var stream=this.binaryHelper.convertStream(out);stream.write(128);switch(+status){case 0:case 1:case 2:case 5:case 6:stream.write(+status);break;case 3:case 4:stream.write(3);break;default:throw new Error("Unsupported CONNACK code:"+status);}if(this.userId){stream.writeUTF(this.userId);}return stream;};ConnAckMessage.prototype.setStatus=function(x){this.status=x;};ConnAckMessage.prototype.setUserId=function(_userId){this.userId=_userId;};ConnAckMessage.prototype.getStatus=function(){return this.status;};ConnAckMessage.prototype.getUserId=function(){return this.userId;};ConnAckMessage.prototype.setTimestamp=function(x){this.timestrap=x;};ConnAckMessage.prototype.getTimestamp=function(){return this.timestrap;};return ConnAckMessage;}(BaseMessage);RongIMLib.ConnAckMessage=ConnAckMessage;/**
     *断开消息类型
     */var DisconnectMessage=function(_super){__extends(DisconnectMessage,_super);function DisconnectMessage(header){_super.call(this,header instanceof RongIMLib.Header?header:RongIMLib.Type.DISCONNECT);this._name="DisconnectMessage";this.MESSAGE_LENGTH=2;this.binaryHelper=new RongIMLib.BinaryHelper();if(!(header instanceof RongIMLib.Header)){if(header in RongIMLib.ConnectionStatus){this.status=header;}}}DisconnectMessage.prototype.messageLength=function(){return this.MESSAGE_LENGTH;};DisconnectMessage.prototype.readMessage=function(_in){_in.read();var result=+_in.read();if(result>=0&&result<=5){this.setStatus(disconnectStatus[result]?disconnectStatus[result]:result);}else {throw new Error("Unsupported CONNACK code:"+result);}};DisconnectMessage.prototype.writeMessage=function(Out){var out=this.binaryHelper.convertStream(Out);out.write(0);if(+status>=1&&+status<=3){out.write(+status-1);}else {throw new Error("Unsupported CONNACK code:"+status);}};DisconnectMessage.prototype.setStatus=function(x){this.status=x;};DisconnectMessage.prototype.getStatus=function(){return this.status;};return DisconnectMessage;}(BaseMessage);RongIMLib.DisconnectMessage=DisconnectMessage;/**
     *请求消息信令
     */var PingReqMessage=function(_super){__extends(PingReqMessage,_super);function PingReqMessage(header){_super.call(this,header&&header instanceof RongIMLib.Header?header:RongIMLib.Type.PINGREQ);this._name="PingReqMessage";}return PingReqMessage;}(BaseMessage);RongIMLib.PingReqMessage=PingReqMessage;/**
     *响应消息信令
     */var PingRespMessage=function(_super){__extends(PingRespMessage,_super);function PingRespMessage(header){_super.call(this,header&&header instanceof RongIMLib.Header?header:RongIMLib.Type.PINGRESP);this._name="PingRespMessage";}return PingRespMessage;}(BaseMessage);RongIMLib.PingRespMessage=PingRespMessage;/**
     *封装MesssageId
     */var RetryableMessage=function(_super){__extends(RetryableMessage,_super);function RetryableMessage(argu){_super.call(this,argu);this._name="RetryableMessage";this.binaryHelper=new RongIMLib.BinaryHelper();}RetryableMessage.prototype.messageLength=function(){return 2;};RetryableMessage.prototype.writeMessage=function(Out){var out=this.binaryHelper.convertStream(Out),Id=this.getMessageId(),lsb=Id&255,msb=(Id&65280)>>8;out.write(msb);out.write(lsb);return out;};RetryableMessage.prototype.readMessage=function(_in,msgLength){var msgId=_in.read()*256+_in.read();this.setMessageId(parseInt(msgId,10));};RetryableMessage.prototype.setMessageId=function(_messageId){this.messageId=_messageId;};RetryableMessage.prototype.getMessageId=function(){return this.messageId;};return RetryableMessage;}(BaseMessage);RongIMLib.RetryableMessage=RetryableMessage;/**
     *发送消息应答（双向）
     *qos为1必须给出应答（所有消息类型一样）
     */var PubAckMessage=function(_super){__extends(PubAckMessage,_super);function PubAckMessage(header){_super.call(this,header instanceof RongIMLib.Header?header:RongIMLib.Type.PUBACK);this.msgLen=2;this.date=0;this.millisecond=0;this.timestamp=0;this.binaryHelper=new RongIMLib.BinaryHelper();this._name="PubAckMessage";if(!(header instanceof RongIMLib.Header)){_super.prototype.setMessageId.call(this,header);}}PubAckMessage.prototype.messageLength=function(){return this.msgLen;};PubAckMessage.prototype.writeMessage=function(Out){var out=this.binaryHelper.convertStream(Out);RetryableMessage.prototype.writeMessage.call(this,out);};PubAckMessage.prototype.readMessage=function(_in,msgLength){RetryableMessage.prototype.readMessage.call(this,_in);this.date=_in.readInt();this.status=_in.read()*256+_in.read();this.millisecond=_in.read()*256+_in.read();this.timestamp=this.date*1000+this.millisecond;this.messageUId=_in.readUTF();};PubAckMessage.prototype.setStatus=function(x){this.status=x;};PubAckMessage.prototype.setTimestamp=function(timestamp){this.timestamp=timestamp;};PubAckMessage.prototype.setMessageUId=function(messageUId){this.messageUId=messageUId;};PubAckMessage.prototype.getStatus=function(){return this.status;};PubAckMessage.prototype.getDate=function(){return this.date;};PubAckMessage.prototype.getTimestamp=function(){return this.timestamp;};PubAckMessage.prototype.getMessageUId=function(){return this.messageUId;};return PubAckMessage;}(RetryableMessage);RongIMLib.PubAckMessage=PubAckMessage;/**
     *发布消息
     */var PublishMessage=function(_super){__extends(PublishMessage,_super);function PublishMessage(header,two,three){_super.call(this,arguments.length==1&&header instanceof RongIMLib.Header?header:arguments.length==3?RongIMLib.Type.PUBLISH:0);this._name="PublishMessage";this.binaryHelper=new RongIMLib.BinaryHelper();this.syncMsg=false;if(arguments.length==3){this.topic=header;this.targetId=three;this.data=typeof two=="string"?this.binaryHelper.toMQttString(two):two;}}PublishMessage.prototype.messageLength=function(){var length=10;length+=this.binaryHelper.toMQttString(this.topic).length;length+=this.binaryHelper.toMQttString(this.targetId).length;length+=this.data.length;return length;};PublishMessage.prototype.writeMessage=function(Out){var out=this.binaryHelper.convertStream(Out);out.writeUTF(this.topic);out.writeUTF(this.targetId);RetryableMessage.prototype.writeMessage.apply(this,arguments);out.write(this.data);};PublishMessage.prototype.readMessage=function(_in,msgLength){var pos=6;this.date=_in.readInt();this.topic=_in.readUTF();pos+=this.binaryHelper.toMQttString(this.topic).length;this.targetId=_in.readUTF();pos+=this.binaryHelper.toMQttString(this.targetId).length;RetryableMessage.prototype.readMessage.apply(this,arguments);this.data=new Array(msgLength-pos);this.data=_in.read(this.data);};PublishMessage.prototype.setTopic=function(x){this.topic=x;};PublishMessage.prototype.setData=function(x){this.data=x;};PublishMessage.prototype.setTargetId=function(x){this.targetId=x;};PublishMessage.prototype.setDate=function(x){this.date=x;};PublishMessage.prototype.setSyncMsg=function(x){this.syncMsg=x;};//是否是其他端同步过来的消息
PublishMessage.prototype.getSyncMsg=function(){return this.syncMsg;};PublishMessage.prototype.getTopic=function(){return this.topic;};PublishMessage.prototype.getData=function(){return this.data;};PublishMessage.prototype.getTargetId=function(){return this.targetId;};PublishMessage.prototype.getDate=function(){return this.date;};return PublishMessage;}(RetryableMessage);RongIMLib.PublishMessage=PublishMessage;/**
     *请求查询
     */var QueryMessage=function(_super){__extends(QueryMessage,_super);function QueryMessage(header,two,three){_super.call(this,header instanceof RongIMLib.Header?header:arguments.length==3?RongIMLib.Type.QUERY:null);this.binaryHelper=new RongIMLib.BinaryHelper();this._name="QueryMessage";if(arguments.length==3){this.data=typeof two=="string"?this.binaryHelper.toMQttString(two):two;this.topic=header;this.targetId=three;}}QueryMessage.prototype.messageLength=function(){var length=0;length+=this.binaryHelper.toMQttString(this.topic).length;length+=this.binaryHelper.toMQttString(this.targetId).length;length+=2;length+=this.data.length;return length;};QueryMessage.prototype.writeMessage=function(Out){var out=this.binaryHelper.convertStream(Out);out.writeUTF(this.topic);out.writeUTF(this.targetId);RetryableMessage.prototype.writeMessage.call(this,out);out.write(this.data);};QueryMessage.prototype.readMessage=function(_in,msgLength){var pos=0;this.topic=_in.readUTF();this.targetId=_in.readUTF();pos+=this.binaryHelper.toMQttString(this.topic).length;pos+=this.binaryHelper.toMQttString(this.targetId).length;this.readMessage.apply(this,arguments);pos+=2;this.data=new Array(msgLength-pos);_in.read(this.data);};QueryMessage.prototype.setTopic=function(x){this.topic=x;};QueryMessage.prototype.setData=function(x){this.data=x;};QueryMessage.prototype.setTargetId=function(x){this.targetId=x;};QueryMessage.prototype.getTopic=function(){return this.topic;};QueryMessage.prototype.getData=function(){return this.data;};QueryMessage.prototype.getTargetId=function(){return this.targetId;};return QueryMessage;}(RetryableMessage);RongIMLib.QueryMessage=QueryMessage;/**
     *请求查询确认
     */var QueryConMessage=function(_super){__extends(QueryConMessage,_super);function QueryConMessage(messageId){_super.call(this,messageId instanceof RongIMLib.Header?messageId:RongIMLib.Type.QUERYCON);this._name="QueryConMessage";if(!(messageId instanceof RongIMLib.Header)){_super.prototype.setMessageId.call(this,messageId);}}return QueryConMessage;}(RetryableMessage);RongIMLib.QueryConMessage=QueryConMessage;/**
     *请求查询应答
     */var QueryAckMessage=function(_super){__extends(QueryAckMessage,_super);function QueryAckMessage(header){_super.call(this,header);this._name="QueryAckMessage";this.binaryHelper=new RongIMLib.BinaryHelper();}QueryAckMessage.prototype.readMessage=function(In,msgLength){RetryableMessage.prototype.readMessage.call(this,In);this.date=In.readInt();this.setStatus(In.read()*256+In.read());if(msgLength>0){this.data=new Array(msgLength-8);this.data=In.read(this.data);}};QueryAckMessage.prototype.getData=function(){return this.data;};QueryAckMessage.prototype.getStatus=function(){return this.status;};QueryAckMessage.prototype.getDate=function(){return this.date;};QueryAckMessage.prototype.setDate=function(x){this.date=x;};QueryAckMessage.prototype.setStatus=function(x){this.status=x;};QueryAckMessage.prototype.setData=function(x){this.data=x;};return QueryAckMessage;}(RetryableMessage);RongIMLib.QueryAckMessage=QueryAckMessage;})(RongIMLib||(RongIMLib={}));/// <reference path="../../dts/helper.d.ts"/>
var RongIMLib;(function(RongIMLib){/**
     * 把消息对象写入流中
     * 发送消息时用到
     */var MessageOutputStream=function(){function MessageOutputStream(_out){var binaryHelper=new RongIMLib.BinaryHelper();this.out=binaryHelper.convertStream(_out);}MessageOutputStream.prototype.writeMessage=function(msg){if(msg instanceof RongIMLib.BaseMessage){msg.write(this.out);}};return MessageOutputStream;}();RongIMLib.MessageOutputStream=MessageOutputStream;/**
     * 流转换为消息对象
     * 服务器返回消息时用到
     */var MessageInputStream=function(){function MessageInputStream(In,isPolling){if(!isPolling){var _in=new RongIMLib.BinaryHelper().convertStream(In);this.flags=_in.readByte();this._in=_in;}else {this.flags=In["headerCode"];}this.header=new RongIMLib.Header(this.flags);this.isPolling=isPolling;this.In=In;}MessageInputStream.prototype.readMessage=function(){switch(this.header.getType()){case 1:this.msg=new RongIMLib.ConnectMessage(this.header);break;case 2:this.msg=new RongIMLib.ConnAckMessage(this.header);break;case 3:this.msg=new RongIMLib.PublishMessage(this.header);this.msg.setSyncMsg(this.header.getSyncMsg());break;case 4:this.msg=new RongIMLib.PubAckMessage(this.header);break;case 5:this.msg=new RongIMLib.QueryMessage(this.header);break;case 6:this.msg=new RongIMLib.QueryAckMessage(this.header);break;case 7:this.msg=new RongIMLib.QueryConMessage(this.header);break;case 9:case 11:case 13:this.msg=new RongIMLib.PingRespMessage(this.header);break;case 8:case 10:case 12:this.msg=new RongIMLib.PingReqMessage(this.header);break;case 14:this.msg=new RongIMLib.DisconnectMessage(this.header);break;default:throw new Error("No support for deserializing "+this.header.getType()+" messages");}if(this.isPolling){this.msg.init(this.In);}else {this.msg.read(this._in,this.In.length-1);}return this.msg;};return MessageInputStream;}();RongIMLib.MessageInputStream=MessageInputStream;var Header=function(){function Header(_type,_retain,_qos,_dup){this.retain=false;this.qos=RongIMLib.Qos.AT_LEAST_ONCE;this.dup=false;this.syncMsg=false;if(_type&&+_type==_type&&arguments.length==1){this.retain=(_type&1)>0;this.qos=(_type&6)>>1;this.dup=(_type&8)>0;this.type=_type>>4&15;this.syncMsg=(_type&8)==8;}else {this.type=_type;this.retain=_retain;this.qos=_qos;this.dup=_dup;}}Header.prototype.getSyncMsg=function(){return this.syncMsg;};Header.prototype.getType=function(){return this.type;};Header.prototype.encode=function(){var me=this;switch(this.qos){case RongIMLib.Qos[0]:me.qos=RongIMLib.Qos.AT_MOST_ONCE;break;case RongIMLib.Qos[1]:me.qos=RongIMLib.Qos.AT_LEAST_ONCE;break;case RongIMLib.Qos[2]:me.qos=RongIMLib.Qos.EXACTLY_ONCE;break;case RongIMLib.Qos[3]:me.qos=RongIMLib.Qos.DEFAULT;break;}var _byte=this.type<<4;_byte|=this.retain?1:0;_byte|=this.qos<<1;_byte|=this.dup?8:0;return _byte;};Header.prototype.toString=function(){return "Header [type="+this.type+",retain="+this.retain+",qos="+this.qos+",dup="+this.dup+"]";};return Header;}();RongIMLib.Header=Header;/**
     * 二进制帮助对象
     */var BinaryHelper=function(){function BinaryHelper(){}BinaryHelper.prototype.writeUTF=function(str,isGetBytes){var back=[],byteSize=0;for(var i=0,len=str.length;i<len;i++){var code=str.charCodeAt(i);if(code>=0&&code<=127){byteSize+=1;back.push(code);}else if(code>=128&&code<=2047){byteSize+=2;back.push(192|31&code>>6);back.push(128|63&code);}else if(code>=2048&&code<=65535){byteSize+=3;back.push(224|15&code>>12);back.push(128|63&code>>6);back.push(128|63&code);}}for(var i=0,len=back.length;i<len;i++){if(back[i]>255){back[i]&=255;}}if(isGetBytes){return back;}if(byteSize<=255){return [0,byteSize].concat(back);}else {return [byteSize>>8,byteSize&255].concat(back);}};BinaryHelper.prototype.readUTF=function(arr){if(Object.prototype.toString.call(arr)=="[object String]"){return arr;}var UTF="",_arr=arr;for(var i=0,len=_arr.length;i<len;i++){if(_arr[i]<0){_arr[i]+=256;}var one=_arr[i].toString(2),v=one.match(/^1+?(?=0)/);if(v&&one.length==8){var bytesLength=v[0].length,// store = _arr[i].toString(2).slice(7 - bytesLength);
store='';for(var st=0;st<bytesLength;st++){store+=_arr[st+i].toString(2).slice(2);}UTF+=String.fromCharCode(parseInt(store,2));i+=bytesLength-1;}else {UTF+=String.fromCharCode(_arr[i]);}}return UTF;};/**
         * [convertStream 将参数x转化为RongIMStream对象]
         * @param  {any}    x [参数]
         */BinaryHelper.prototype.convertStream=function(x){if(x instanceof RongIMStream){return x;}else {return new RongIMStream(x);}};BinaryHelper.prototype.toMQttString=function(str){return this.writeUTF(str);};return BinaryHelper;}();RongIMLib.BinaryHelper=BinaryHelper;var RongIMStream=function(){function RongIMStream(arr){//当前流执行的起始位置
this.position=0;//当前流写入的多少字节
this.writen=0;this.poolLen=0;this.binaryHelper=new BinaryHelper();this.pool=arr;this.poolLen=arr.length;}RongIMStream.prototype.check=function(){return this.position>=this.pool.length;};RongIMStream.prototype.readInt=function(){if(this.check()){return -1;}var end="";for(var i=0;i<4;i++){var t=this.pool[this.position++].toString(16);if(t.length==1){t="0"+t;}end+=t.toString(16);}return parseInt(end,16);};RongIMStream.prototype.readLong=function(){if(this.check()){return -1;}var end="";for(var i=0;i<8;i++){var t=this.pool[this.position++].toString(16);if(t.length==1){t="0"+t;}end+=t;}return parseInt(end,16);};RongIMStream.prototype.readTimestamp=function(){if(this.check()){return -1;}var end="";for(var i=0;i<8;i++){end+=this.pool[this.position++].toString(16);}end=end.substring(2,8);return parseInt(end,16);};RongIMStream.prototype.readUTF=function(){if(this.check()){return -1;}var big=this.readByte()<<8|this.readByte();return this.binaryHelper.readUTF(this.pool.subarray(this.position,this.position+=big));};RongIMStream.prototype.readByte=function(){if(this.check()){return -1;}var val=this.pool[this.position++];if(val>255){val&=255;}return val;};RongIMStream.prototype.read=function(bytesArray){if(bytesArray){return this.pool.subarray(this.position,this.poolLen);}else {return this.readByte();}};RongIMStream.prototype.write=function(_byte){var b=_byte;if(Object.prototype.toString.call(b).toLowerCase()=="[object array]"){[].push.apply(this.pool,b);}else {if(+b==b){if(b>255){b&=255;}this.pool.push(b);this.writen++;}}return b;};RongIMStream.prototype.writeChar=function(v){if(+v!=v){throw new Error("writeChar:arguments type is error");}this.write(v>>8&255);this.write(v&255);this.writen+=2;};RongIMStream.prototype.writeUTF=function(str){var val=this.binaryHelper.writeUTF(str);[].push.apply(this.pool,val);this.writen+=val.length;};RongIMStream.prototype.toComplements=function(){var _tPool=this.pool;for(var i=0;i<this.poolLen;i++){if(_tPool[i]>128){_tPool[i]-=256;}}return _tPool;};RongIMStream.prototype.getBytesArray=function(isCom){if(isCom){return this.toComplements();}return this.pool;};return RongIMStream;}();RongIMLib.RongIMStream=RongIMStream;})(RongIMLib||(RongIMLib={}));var RongIMLib;(function(RongIMLib){var SocketTransportation=function(){/**
         * [constructor]
         * @param  {string} url [连接地址：包含token、version]
         */function SocketTransportation(_socket){//连接状态 true:已连接 false:未连接
this.connected=false;//是否关闭： true:已关闭 false：未关闭
this.isClose=false;//存放消息队列的临时变量
this.queue=[];this.empty=new Function();this._socket=_socket;return this;}/**
         * [createTransport 创建WebScoket对象]
         */SocketTransportation.prototype.createTransport=function(url,method){if(!url){throw new Error("URL can't be empty");}this.url=url;var depend=RongIMLib.RongIMClient._memoryStore.depend;var wsScheme=depend.wsScheme;var tpl='{wsScheme}{url}';url=RongIMLib.RongUtil.tplEngine(tpl,{wsScheme:wsScheme,url:url});this.socket=new WebSocket(url);this.socket.binaryType="arraybuffer";this.addEvent();return this.socket;};/**
         * [send 传送消息流]
         * @param  {ArrayBuffer} data [二进制消息流]
         */SocketTransportation.prototype.send=function(data){if(!this.connected&&!this.isClose){//当通道不可用时，加入消息队列
this.queue.push(data);return;}if(this.isClose){this._socket.fire("StatusChanged",RongIMLib.ConnectionStatus.CONNECTION_CLOSED);return;}var stream=new RongIMLib.RongIMStream([]),msg=new RongIMLib.MessageOutputStream(stream);msg.writeMessage(data);var val=stream.getBytesArray(true);var binary=new Int8Array(val);this.socket.send(binary.buffer);return this;};/**
         * [onData 通道返回数据时调用的方法，用来想上层传递服务器返回的二进制消息流]
         * @param  {ArrayBuffer}    data [二进制消息流]
         */SocketTransportation.prototype.onData=function(data){if(RongIMLib.MessageUtil.isArray(data)){this._socket.onMessage(new RongIMLib.MessageInputStream(data).readMessage());}else {this._socket.onMessage(new RongIMLib.MessageInputStream(RongIMLib.MessageUtil.ArrayFormInput(data)).readMessage());}return "";};/**
         * [onClose 通道关闭时触发的方法]
         */SocketTransportation.prototype.onClose=function(ev){var me=this;me.isClose=true;me.socket=this.empty;RongIMLib.Bridge._client.clearHeartbeat();if(ev.code==1006&&!this._status){me._socket.fire("StatusChanged",RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE);}else {me._status=0;}};/**
         * [onError 通道报错时触发的方法]
         * @param {any} error [抛出异常]
         */SocketTransportation.prototype.onError=function(error){throw new Error(error);};/**
         * [addEvent 为通道绑定事件]
         */SocketTransportation.prototype.addEvent=function(){var self=this;self.socket.onopen=function(){self.connected=true;self.isClose=false;//通道可以用后，调用发送队列方法，把所有等得发送的消息发出
self.doQueue();self._socket.fire("connect");};self.socket.onmessage=function(ev){//判断数据是不是字符串，如果是字符串那么就是flash传过来的。
if(typeof ev.data=="string"){self.onData(ev.data.split(","));}else {self.onData(ev.data);}};self.socket.onerror=function(ev){self.onError(ev);};self.socket.onclose=function(ev){self.onClose(ev);};};/**
         * [doQueue 消息队列，把队列中消息发出]
         */SocketTransportation.prototype.doQueue=function(){var self=this;for(var i=0,len=self.queue.length;i<len;i++){self.send(self.queue[i]);}};/**
         * [disconnect 断开连接]
         */SocketTransportation.prototype.disconnect=function(status){var me=this;if(me.socket.readyState){me.isClose=true;if(status){me._status=status;}me.socket.close();}};/**
         * [reconnect 重新连接]
         */SocketTransportation.prototype.reconnect=function(){this.disconnect();this.createTransport(this.url);};SocketTransportation.prototype.close=function(){this.socket.close();};return SocketTransportation;}();RongIMLib.SocketTransportation=SocketTransportation;})(RongIMLib||(RongIMLib={}));var RongIMLib;(function(RongIMLib){var PollingTransportation=function(){function PollingTransportation(socket){this.empty=new Function();this.connected=false;this.pid=+new Date()+Math.random()+"";this.queue=[];this.socket=socket;return this;}PollingTransportation.prototype.createTransport=function(url,method){if(!url){throw new Error("Url is empty,Please check it!");}this.url=url;var sid=RongIMLib.RongIMClient._storageProvider.getItem("sId"+RongIMLib.Navigation.Endpoint.userId),me=this;if(sid){setTimeout(function(){me.onSuccess("{\"status\":0,\"userId\":\""+RongIMLib.Navigation.Endpoint.userId+"\",\"headerCode\":32,\"messageId\":0,\"sessionid\":\""+sid+"\"}");me.connected=true;},500);return this;}this.getRequest(url,true);return this;};PollingTransportation.prototype.requestFactory=function(url,method,multipart){var reqest=this.XmlHttpRequest();if(multipart){reqest.multipart=true;}// reqest.timeout = 60000;
reqest.open(method||"GET",RongIMLib.RongIMClient._memoryStore.depend.protocol+url);if(method=="POST"&&"setRequestHeader"in reqest){reqest.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=utf-8");}return reqest;};PollingTransportation.prototype.getRequest=function(url,isconnect){var me=this;me.xhr=this.requestFactory(url+"&pid="+encodeURIComponent(me.pid),"GET");if("onload"in me.xhr){me.xhr.onload=function(){me.xhr.onload=me.empty;if(this.responseText=="lost params"){me.onError();}else {me.onSuccess(this.responseText,isconnect);}};me.xhr.onerror=function(){me.disconnect();};}else {me.xhr.onreadystatechange=function(){if(me.xhr.readyState==4){me.xhr.onreadystatechange=me.empty;if(/^(200|202)$/.test(me.xhr.status)){me.onSuccess(me.xhr.responseText,isconnect);}else if(/^(400|403)$/.test(me.xhr.status)){me.onError();}else {me.disconnect();}}};}me.xhr.send();};/**
         * [send 发送消息，Method:POST]
         * queue 为消息队列，待通道可用发送所有等待消息
         * @param  {string} data [需要传入comet格式数据，此处只负责通讯通道，数据转换在外层处理]
         */PollingTransportation.prototype.send=function(data){var me=this;var _send=me.sendxhr=this.requestFactory(RongIMLib.Navigation.Endpoint.host+"/websocket"+data.url+"&pid="+encodeURIComponent(me.pid),"POST");if("onload"in _send){_send.onload=function(){_send.onload=me.empty;me.onData(_send.responseText);};_send.onerror=function(){_send.onerror=me.empty;};}else {_send.onreadystatechange=function(){if(_send.readyState==4){this.onreadystatechange=this.empty;if(/^(202|200)$/.test(_send.status)){me.onData(_send.responseText);}}};}_send.send(JSON.stringify(data.data));};PollingTransportation.prototype.onData=function(data,header){if(!data||data=="lost params"){return;}var self=this,val=JSON.parse(data);if(val.userId){RongIMLib.Navigation.Endpoint.userId=val.userId;}if(header){RongIMLib.RongIMClient._storageProvider.setItem("sId"+RongIMLib.Navigation.Endpoint.userId,header);}if(!RongIMLib.MessageUtil.isArray(val)){val=[val];}Array.forEach(val,function(m){self.socket.fire("message",new RongIMLib.MessageInputStream(m,true).readMessage());});return "";};PollingTransportation.prototype.XmlHttpRequest=function(){var hasCORS=typeof XMLHttpRequest!=="undefined"&&"withCredentials"in new XMLHttpRequest();if("undefined"!=typeof XMLHttpRequest&&hasCORS){return new XMLHttpRequest();}else if("undefined"!=typeof XDomainRequest){return new XDomainRequest();}else {return new ActiveXObject("Microsoft.XMLHTTP");}};PollingTransportation.prototype.onClose=function(){if(this.xhr){if(this.xhr.onload){this.xhr.onreadystatechange=this.xhr.onload=this.empty;}else {this.xhr.onreadystatechange=this.empty;}this.xhr.abort();this.xhr=null;}if(this.sendxhr){if(this.sendxhr.onload){this.sendxhr.onreadystatechange=this.sendxhr.onload=this.empty;}else {this.sendxhr.onreadystatechange=this.empty;}this.sendxhr.abort();this.sendxhr=null;}};PollingTransportation.prototype.disconnect=function(){RongIMLib.RongIMClient._storageProvider.removeItem("sId"+RongIMLib.Navigation.Endpoint.userId);RongIMLib.RongIMClient._storageProvider.removeItem(RongIMLib.Navigation.Endpoint.userId+"msgId");this.onClose();};PollingTransportation.prototype.reconnect=function(){this.disconnect();this.createTransport(this.url);};PollingTransportation.prototype.onSuccess=function(responseText,isconnect){var txt=responseText.match(/"sessionid":"\S+?(?=")/);this.onData(responseText,txt?txt[0].slice(13):0);if(/"headerCode":-32,/.test(responseText)){RongIMLib.RongIMClient._storageProvider.removeItem("sId"+RongIMLib.Navigation.Endpoint.userId);RongIMLib.RongIMClient._storageProvider.removeItem(RongIMLib.Navigation.Endpoint.userId+"msgId");return;}this.getRequest(RongIMLib.Navigation.Endpoint.host+"/pullmsg.js?sessionid="+RongIMLib.RongIMClient._storageProvider.getItem("sId"+RongIMLib.Navigation.Endpoint.userId)+"&timestrap="+encodeURIComponent(new Date().getTime()+Math.random()+""));this.connected=true;isconnect&&this.socket.fire("connect");};PollingTransportation.prototype.onError=function(){RongIMLib.RongIMClient._storageProvider.removeItem("sId"+RongIMLib.Navigation.Endpoint.userId);RongIMLib.RongIMClient._storageProvider.removeItem(RongIMLib.Navigation.Endpoint.userId+"msgId");this.onClose();this.connected=false;this.socket.fire("disconnect");};PollingTransportation.prototype.close=function(){this.xhr.abort();this.sendxhr=null;};return PollingTransportation;}();RongIMLib.PollingTransportation=PollingTransportation;})(RongIMLib||(RongIMLib={}));//objectname映射
var typeMapping={"RC:TxtMsg":"TextMessage","RC:ImgMsg":"ImageMessage","RC:VcMsg":"VoiceMessage","RC:ImgTextMsg":"RichContentMessage","RC:FileMsg":"FileMessage","RC:HQVCMsg":"HQVoiceMessage","RC:LBSMsg":"LocationMessage","RC:InfoNtf":"InformationNotificationMessage","RC:ContactNtf":"ContactNotificationMessage","RC:ProfileNtf":"ProfileNotificationMessage","RC:CmdNtf":"CommandNotificationMessage","RC:DizNtf":"DiscussionNotificationMessage","RC:CmdMsg":"CommandMessage","RC:TypSts":"TypingStatusMessage","RC:CsChaR":"ChangeModeResponseMessage","RC:CsHsR":"HandShakeResponseMessage","RC:CsEnd":"TerminateMessage","RC:CsSp":"SuspendMessage","RC:CsUpdate":"CustomerStatusUpdateMessage","RC:ReadNtf":"ReadReceiptMessage","RC:VCAccept":"AcceptMessage","RC:VCRinging":"RingingMessage","RC:VCSummary":"SummaryMessage","RC:VCHangup":"HungupMessage","RC:VCInvite":"InviteMessage","RC:VCModifyMedia":"MediaModifyMessage","RC:VCModifyMem":"MemberModifyMessage","RC:CsContact":"CustomerContact","RC:PSImgTxtMsg":"PublicServiceRichContentMessage","RC:PSMultiImgTxtMsg":"PublicServiceMultiRichContentMessage","RC:GrpNtf":"GroupNotificationMessage","RC:PSCmd":"PublicServiceCommandMessage","RC:RcCmd":"RecallCommandMessage","RC:SRSMsg":"SyncReadStatusMessage","RC:RRReqMsg":"ReadReceiptRequestMessage","RC:RRRspMsg":"ReadReceiptResponseMessage","RCJrmf:RpMsg":"JrmfRedPacketMessage","RCJrmf:RpOpendMsg":"JrmfRedPacketOpenedMessage"},//自定义消息类型
registerMessageTypeMapping={},HistoryMsgType={4:"qryCMsg",2:"qryDMsg",3:"qryGMsg",1:"qryPMsg",6:"qrySMsg",7:"qryPMsg",8:"qryPMsg",5:"qryCMsg"},disconnectStatus={1:6};var RongIMLib;(function(RongIMLib){/**
     * 通道标识类
     */var Transportations=function(){function Transportations(){}Transportations._TransportType=RongIMLib.Socket.WEBSOCKET;return Transportations;}();RongIMLib.Transportations=Transportations;var SyncTimeUtil=function(){function SyncTimeUtil(){}SyncTimeUtil.$getKey=function(message){var client=RongIMLib.Bridge._client;var userId=client.userId;var direction=message.messageDirection==1?'send':'receive';var appkey=RongIMLib.RongIMClient._memoryStore.appKey;var tpl='{appkey}_{userId}_{direction}box';return RongIMLib.RongUtil.tplEngine(tpl,{appkey:appkey,userId:userId,direction:direction});};SyncTimeUtil.set=function(message){var key=SyncTimeUtil.$getKey(message);var sentTime=message.sentTime;var storage=RongIMLib.RongIMClient._storageProvider;storage.setItem(key,sentTime);};SyncTimeUtil.get=function(){var sent=SyncTimeUtil.$getKey({messageDirection:RongIMLib.MessageDirection.SEND});var received=SyncTimeUtil.$getKey({messageDirection:RongIMLib.MessageDirection.RECEIVE});var storage=RongIMLib.RongIMClient._storageProvider;return {sent:Number(storage.getItem(sent)||0),received:Number(storage.getItem(received)||0)};};return SyncTimeUtil;}();RongIMLib.SyncTimeUtil=SyncTimeUtil;var MessageUtil=function(){function MessageUtil(){}/**
         *4680000 为localstorage最小容量5200000字节的90%，超过90%将删除之前过早的存储
         */MessageUtil.checkStorageSize=function(){return JSON.stringify(localStorage).length<4680000;};MessageUtil.getFirstKey=function(obj){var str="";for(var key in obj){str=key;break;}return str;};MessageUtil.isEmpty=function(obj){var empty=true;for(var key in obj){empty=false;break;}return empty;};MessageUtil.ArrayForm=function(typearray){if(Object.prototype.toString.call(typearray)=="[object ArrayBuffer]"){var arr=new Int8Array(typearray);return [].slice.call(arr);}return typearray;};MessageUtil.ArrayFormInput=function(typearray){if(Object.prototype.toString.call(typearray)=="[object ArrayBuffer]"){var arr=new Uint8Array(typearray);return arr;}return typearray;};MessageUtil.indexOf=function(arr,item,from){for(var l=arr.length,i=from<0?Math.max(0,+from):from||0;i<l;i++){if(arr[i]==item){return i;}}return -1;};MessageUtil.isArray=function(obj){return Object.prototype.toString.call(obj)=="[object Array]";};//遍历，只能遍历数组
MessageUtil.forEach=function(arr,func){if([].forEach){return function(arr,func){[].forEach.call(arr,func);};}else {return function(arr,func){for(var i=0;i<arr.length;i++){func.call(arr,arr[i],i,arr);}};}};MessageUtil.remove=function(array,func){for(var i=0,len=array.length;i<len;i++){if(func(array[i])){return array.splice(i,1)[0];}}return null;};MessageUtil.int64ToTimestamp=function(obj,isDate){if(obj.low===undefined){return obj;}var low=obj.low;if(low<0){low+=0xffffffff+1;}low=low.toString(16);var timestamp=parseInt(obj.high.toString(16)+"00000000".replace(new RegExp("0{"+low.length+"}$"),low),16);if(isDate){return new Date(timestamp);}return timestamp;};//消息转换方法
MessageUtil.messageParser=function(entity,onReceived,offlineMsg){var message=new RongIMLib.Message(),content=entity.content,de,objectName=entity.classname,val,isUseDef=false;try{if(RongIMLib.RongIMClient._memoryStore.depend.isPolling){val=new RongIMLib.BinaryHelper().readUTF(content.offset?MessageUtil.ArrayForm(content.buffer).slice(content.offset,content.limit):content);de=JSON.parse(val);}else {val=new RongIMLib.BinaryHelper().readUTF(content.offset?MessageUtil.ArrayFormInput(content.buffer).subarray(content.offset,content.limit):content);de=JSON.parse(val);}}catch(ex){de=val;isUseDef=true;}//映射为具体消息对象
if(objectName in typeMapping){var str="new RongIMLib."+typeMapping[objectName]+"(de)";message.content=eval(str);message.messageType=typeMapping[objectName];}else if(objectName in registerMessageTypeMapping){var str="new RongIMLib.RongIMClient.RegisterMessage."+registerMessageTypeMapping[objectName]+"(de)";if(isUseDef){message.content=eval(str).decode(de);}else {message.content=eval(str);}message.messageType=registerMessageTypeMapping[objectName];}else {message.content=new RongIMLib.UnknownMessage({content:de,objectName:objectName});message.messageType="UnknownMessage";}//根据实体对象设置message对象]
var dateTime=MessageUtil.int64ToTimestamp(entity.dataTime);if(dateTime>0){message.sentTime=dateTime;}else {message.sentTime=+new Date();}message.senderUserId=entity.fromUserId;message.conversationType=entity.type;if(entity.fromUserId==RongIMLib.Bridge._client.userId){message.targetId=entity.groupId;}else {message.targetId=/^[234]$/.test(entity.type||entity.getType())?entity.groupId:message.senderUserId;}var selfUserId=RongIMLib.Bridge._client.userId;// 解决多端在线收自己发的消息时, messageDirection 为 2(接收), 导致未读数增加
var isSelfSend=entity.direction==1||message.senderUserId===selfUserId;if(isSelfSend){message.messageDirection=RongIMLib.MessageDirection.SEND;message.senderUserId=RongIMLib.Bridge._client.userId;}else {message.messageDirection=RongIMLib.MessageDirection.RECEIVE;}// 自己给自己发的消息, messageDirection 为 2(接收)
var isSelfToSelf=message.senderUserId===selfUserId&&message.targetId===selfUserId;if(isSelfToSelf){message.messageDirection=RongIMLib.MessageDirection.RECEIVE;}message.messageUId=entity.msgId;message.receivedTime=new Date().getTime();message.messageId=message.conversationType+"_"+~~(Math.random()*0xffffff);message.objectName=objectName;message.receivedStatus=RongIMLib.ReceivedStatus.READ;if((entity.status&2)==2){message.receivedStatus=RongIMLib.ReceivedStatus.RETRIEVED;}message.offLineMessage=offlineMsg?true:false;if(!offlineMsg){if(RongIMLib.RongIMClient._memoryStore.connectAckTime>message.sentTime){message.offLineMessage=true;}}return message;};MessageUtil.detectCMP=function(options){var xhr=new XMLHttpRequest();xhr.onreadystatechange=function(){if(xhr.readyState==4){var status=xhr.status;if(status==200){options.success();}else {options.fail(xhr.status);}}};var method=options.url;var url=options.url;var method=options.method||'GET';xhr.open(method,url);var headers=options.headers;for(var key in headers){var value=headers[key];xhr.setRequestHeader(key,value);}var body=JSON.stringify(options.body||{});xhr.send(body);return xhr;};//适配SSL
// static schemeArrs: Array<any> = [["http", "ws"], ["https", "wss"]];
MessageUtil.sign={converNum:1,msgNum:1,isMsgStart:true,isConvStart:true};return MessageUtil;}();RongIMLib.MessageUtil=MessageUtil;/**
     * 工具类
     */var MessageIdHandler=function(){function MessageIdHandler(){}MessageIdHandler.init=function(){this.messageId=+(RongIMLib.RongIMClient._storageProvider.getItem(RongIMLib.Navigation.Endpoint.userId+"msgId")||RongIMLib.RongIMClient._storageProvider.setItem(RongIMLib.Navigation.Endpoint.userId+"msgId",0)||0);};MessageIdHandler.messageIdPlus=function(method){RongIMLib.RongIMClient._memoryStore.depend.isPolling&&this.init();if(this.messageId>=65535){method();return false;}this.messageId++;RongIMLib.RongIMClient._memoryStore.depend.isPolling&&RongIMLib.RongIMClient._storageProvider.setItem(RongIMLib.Navigation.Endpoint.userId+"msgId",this.messageId);return this.messageId;};MessageIdHandler.clearMessageId=function(){this.messageId=0;RongIMLib.RongIMClient._memoryStore.depend.isPolling&&RongIMLib.RongIMClient._storageProvider.setItem(RongIMLib.Navigation.Endpoint.userId+"msgId",this.messageId);};MessageIdHandler.getMessageId=function(){RongIMLib.RongIMClient._memoryStore.depend.isPolling&&this.init();return this.messageId;};MessageIdHandler.messageId=0;return MessageIdHandler;}();RongIMLib.MessageIdHandler=MessageIdHandler;var RongInnerTools=function(){function RongInnerTools(){}RongInnerTools.convertUserStatus=function(entity){entity=RongIMLib.RongUtil.rename(entity,{subUserId:'userId'});var status=JSON.parse(entity.status);var us=status.us;if(!us){return entity;}entity.status=RongIMLib.RongUtil.rename(us,{o:'online','p':'platform',s:'status'});return entity;};return RongInnerTools;}();RongIMLib.RongInnerTools=RongInnerTools;})(RongIMLib||(RongIMLib={}));var RongIMLib;(function(RongIMLib){var MessageContent=function(){function MessageContent(data){throw new Error("This method is abstract, you must implement this method in inherited class.");}MessageContent.obtain=function(){throw new Error("This method is abstract, you must implement this method in inherited class.");};return MessageContent;}();RongIMLib.MessageContent=MessageContent;var NotificationMessage=function(_super){__extends(NotificationMessage,_super);function NotificationMessage(){_super.apply(this,arguments);}return NotificationMessage;}(MessageContent);RongIMLib.NotificationMessage=NotificationMessage;var StatusMessage=function(_super){__extends(StatusMessage,_super);function StatusMessage(){_super.apply(this,arguments);}return StatusMessage;}(MessageContent);RongIMLib.StatusMessage=StatusMessage;var ModelUtil=function(){function ModelUtil(){}ModelUtil.modelClone=function(object){var obj={};for(var item in object){if(item!="messageName"&&"encode"!=item){obj[item]=object[item];}}return obj;};ModelUtil.modleCreate=function(fields,msgType){// if (fields.length < 1) {
//     throw new Error("Array is empty  -> registerMessageType.modleCreate");
// }
var Object=function(message){var me=this;for(var index in fields){me[fields[index]]=message[fields[index]];}Object.prototype.messageName=msgType;Object.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};};return Object;};return ModelUtil;}();RongIMLib.ModelUtil=ModelUtil;})(RongIMLib||(RongIMLib={}));var RongIMLib;(function(RongIMLib){var CustomerStatusMessage=function(){function CustomerStatusMessage(message){this.messageName="CustomerStatusMessage";this.status=message.status;}CustomerStatusMessage.obtain=function(){return null;};CustomerStatusMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return CustomerStatusMessage;}();RongIMLib.CustomerStatusMessage=CustomerStatusMessage;/**
     * 客服转换响应消息的类型名
     */var ChangeModeResponseMessage=function(){function ChangeModeResponseMessage(message){this.messageName="ChangeModeResponseMessage";this.code=message.code;this.data=message.data;this.msg=message.msg;}ChangeModeResponseMessage.obtain=function(){return null;};ChangeModeResponseMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return ChangeModeResponseMessage;}();RongIMLib.ChangeModeResponseMessage=ChangeModeResponseMessage;/**
     * 客服转换消息的类型名
     * 此消息不计入未读消息数
     */var ChangeModeMessage=function(){function ChangeModeMessage(message){this.messageName="ChangeModeMessage";this.uid=message.uid;this.sid=message.sid;this.pid=message.pid;}ChangeModeMessage.obtain=function(){return null;};ChangeModeMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return ChangeModeMessage;}();RongIMLib.ChangeModeMessage=ChangeModeMessage;var CustomerStatusUpdateMessage=function(){function CustomerStatusUpdateMessage(message){this.messageName="CustomerStatusUpdateMessage";this.serviceStatus=message.serviceStatus;this.sid=message.sid;}CustomerStatusUpdateMessage.obtain=function(){return null;};CustomerStatusUpdateMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return CustomerStatusUpdateMessage;}();RongIMLib.CustomerStatusUpdateMessage=CustomerStatusUpdateMessage;var HandShakeMessage=function(){function HandShakeMessage(message){this.messageName="HandShakeMessage";if(message){this.requestInfo=message.requestInfo;this.userInfo=message.userInfo;}}HandShakeMessage.obtain=function(){return null;};HandShakeMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return HandShakeMessage;}();RongIMLib.HandShakeMessage=HandShakeMessage;var CustomerContact=function(){function CustomerContact(message){this.messageName="CustomerContact";this.page=message.page;this.nickName=message.nickName;this.routingInfo=message.routingInfo;this.info=message.info;this.requestInfo=message.requestInfo;}CustomerContact.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return CustomerContact;}();RongIMLib.CustomerContact=CustomerContact;var EvaluateMessage=function(){function EvaluateMessage(message){this.messageName="EvaluateMessage";this.uid=message.uid;this.sid=message.sid;this.pid=message.pid;this.source=message.source;this.suggest=message.suggest;this.isresolve=message.isresolve;this.type=message.type;}EvaluateMessage.obtain=function(){return null;};EvaluateMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return EvaluateMessage;}();RongIMLib.EvaluateMessage=EvaluateMessage;/**
     * 客服握手响应消息的类型名
     */var HandShakeResponseMessage=function(){function HandShakeResponseMessage(message){this.messageName="HandShakeResponseMessage";this.msg=message.msg;this.status=message.status;this.data=message.data;}HandShakeResponseMessage.obtain=function(){return null;};HandShakeResponseMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return HandShakeResponseMessage;}();RongIMLib.HandShakeResponseMessage=HandShakeResponseMessage;var SuspendMessage=function(){function SuspendMessage(message){this.messageName="SuspendMessage";this.uid=message.uid;this.sid=message.sid;this.pid=message.pid;}SuspendMessage.obtain=function(){return null;};SuspendMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return SuspendMessage;}();RongIMLib.SuspendMessage=SuspendMessage;var TerminateMessage=function(){function TerminateMessage(message){this.messageName="TerminateMessage";this.code=message.code;this.msg=message.msg;this.sid=message.sid;}TerminateMessage.obtain=function(){return null;};TerminateMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return TerminateMessage;}();RongIMLib.TerminateMessage=TerminateMessage;})(RongIMLib||(RongIMLib={}));var RongIMLib;(function(RongIMLib){var IsTypingStatusMessage=function(){function IsTypingStatusMessage(data){this.messageName="IsTypingStatusMessage";}IsTypingStatusMessage.prototype.encode=function(){return undefined;};IsTypingStatusMessage.prototype.getMessage=function(){return null;};return IsTypingStatusMessage;}();RongIMLib.IsTypingStatusMessage=IsTypingStatusMessage;})(RongIMLib||(RongIMLib={}));var RongIMLib;(function(RongIMLib){var InformationNotificationMessage=function(){function InformationNotificationMessage(message){this.messageName="InformationNotificationMessage";if(arguments.length==0){throw new Error("Can not instantiate with empty parameters, use obtain method instead -> InformationNotificationMessage.");}this.message=message.message;this.extra=message.extra;if(message.user){this.user=message.user;}}InformationNotificationMessage.obtain=function(message){return new InformationNotificationMessage({message:message,extra:""});};InformationNotificationMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return InformationNotificationMessage;}();RongIMLib.InformationNotificationMessage=InformationNotificationMessage;var CommandMessage=function(){function CommandMessage(message){this.messageName="CommandMessage";if(arguments.length==0){throw new Error("Can not instantiate with empty parameters, use obtain method instead -> CommandMessage.");}try{if(Object.prototype.toString.call(message.data)=="[object String]"){this.data=JSON.parse(message.data);}else {this.data=message.data;}}catch(e){this.data=message.data;}this.name=message.name;this.extra=message.extra;}CommandMessage.obtain=function(data){return new CommandMessage({data:data,extra:""});};CommandMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return CommandMessage;}();RongIMLib.CommandMessage=CommandMessage;var ContactNotificationMessage=function(){function ContactNotificationMessage(message){this.messageName="ContactNotificationMessage";if(arguments.length==0){throw new Error("Can not instantiate with empty parameters, use obtain method instead -> ContactNotificationMessage.");}this.operation=message.operation;this.targetUserId=message.targetUserId;this.message=message.message;this.extra=message.extra;this.sourceUserId=message.sourceUserId;if(message.user){this.user=message.user;}}ContactNotificationMessage.obtain=function(operation,sourceUserId,targetUserId,message){return new InformationNotificationMessage({operation:operation,sourceUserId:sourceUserId,targetUserId:targetUserId,message:message});};ContactNotificationMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};ContactNotificationMessage.CONTACT_OPERATION_ACCEPT_RESPONSE="ContactOperationAcceptResponse";ContactNotificationMessage.CONTACT_OPERATION_REJECT_RESPONSE="ContactOperationRejectResponse";ContactNotificationMessage.CONTACT_OPERATION_REQUEST="ContactOperationRequest";return ContactNotificationMessage;}();RongIMLib.ContactNotificationMessage=ContactNotificationMessage;var ProfileNotificationMessage=function(){function ProfileNotificationMessage(message){this.messageName="ProfileNotificationMessage";if(arguments.length==0){throw new Error("Can not instantiate with empty parameters, use obtain method instead -> ProfileNotificationMessage.");}this.operation=message.operation;try{if(Object.prototype.toString.call(message.data)=="[object String]"){this.data=JSON.parse(message.data);}else {this.data=message.data;}}catch(e){this.data=message.data;}this.extra=message.extra;if(message.user){this.user=message.user;}}ProfileNotificationMessage.obtain=function(operation,data){return new ProfileNotificationMessage({operation:operation,data:data});};ProfileNotificationMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return ProfileNotificationMessage;}();RongIMLib.ProfileNotificationMessage=ProfileNotificationMessage;var CommandNotificationMessage=function(){function CommandNotificationMessage(message){this.messageName="CommandNotificationMessage";if(arguments.length==0){throw new Error("Can not instantiate with empty parameters, use obtain method instead -> ProfileNotificationMessage.");}try{if(Object.prototype.toString.call(message.data)=="[object String]"){this.data=JSON.parse(message.data);}else {this.data=message.data;}}catch(e){this.data=message.data;}this.name=message.name;this.extra=message.extra;if(message.user){this.user=message.user;}}CommandNotificationMessage.obtain=function(name,data){return new CommandNotificationMessage({name:name,data:data,extra:""});};CommandNotificationMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return CommandNotificationMessage;}();RongIMLib.CommandNotificationMessage=CommandNotificationMessage;var DiscussionNotificationMessage=function(){function DiscussionNotificationMessage(message){this.messageName="DiscussionNotificationMessage";if(arguments.length==0){throw new Error("Can not instantiate with empty parameters, use obtain method instead -> DiscussionNotificationMessage.");}this.extra=message.extra;this.extension=message.extension;this.type=message.type;this.isHasReceived=message.isHasReceived;this.operation=message.operation;this.user=message.user;if(message.user){this.user=message.user;}}DiscussionNotificationMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return DiscussionNotificationMessage;}();RongIMLib.DiscussionNotificationMessage=DiscussionNotificationMessage;var GroupNotificationMessage=function(){function GroupNotificationMessage(msg){this.messageName="GroupNotificationMessage";if(arguments.length==0){throw new Error("Can not instantiate with empty parameters, use obtain method instead -> GroupNotificationMessage.");}msg.operatorUserId&&(this.operatorUserId=msg.operatorUserId);msg.operation&&(this.operation=msg.operation);msg.data&&(this.data=msg.data);msg.message&&(this.message=msg.message);msg.extra&&(this.extra=msg.extra);}GroupNotificationMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return GroupNotificationMessage;}();RongIMLib.GroupNotificationMessage=GroupNotificationMessage;})(RongIMLib||(RongIMLib={}));var RongIMLib;(function(RongIMLib){var TextMessage=function(){function TextMessage(message){this.messageName="TextMessage";if(arguments.length==0){throw new Error("Can not instantiate with empty parameters, use obtain method instead -> TextMessage.");}this.content=message.content;this.extra=message.extra;if(message.user){this.user=message.user;}if(message.mentionedInfo){this.mentionedInfo=message.mentionedInfo;}}TextMessage.obtain=function(text){return new TextMessage({extra:"",content:text});};TextMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return TextMessage;}();RongIMLib.TextMessage=TextMessage;var TypingStatusMessage=function(){function TypingStatusMessage(message){this.messageName="TypingStatusMessage";if(arguments.length==0){throw new Error("Can not instantiate with empty parameters, use obtain method instead -> TypingStatusMessage.");}this.typingContentType=message.typingContentType;this.data=message.data;}TypingStatusMessage.obtain=function(typingContentType,data){return new TypingStatusMessage({typingContentType:typingContentType,data:data});};TypingStatusMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return TypingStatusMessage;}();RongIMLib.TypingStatusMessage=TypingStatusMessage;var ReadReceiptMessage=function(){function ReadReceiptMessage(message){this.messageName="ReadReceiptMessage";if(arguments.length==0){throw new Error("Can not instantiate with empty parameters, use obtain method instead -> ReadReceiptMessage.");}this.lastMessageSendTime=message.lastMessageSendTime;this.messageUId=message.messageUId;this.type=message.type;}ReadReceiptMessage.obtain=function(messageUId,lastMessageSendTime,type){return new ReadReceiptMessage({messageUId:messageUId,lastMessageSendTime:lastMessageSendTime,type:type});};ReadReceiptMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return ReadReceiptMessage;}();RongIMLib.ReadReceiptMessage=ReadReceiptMessage;var VoiceMessage=function(){function VoiceMessage(message){this.messageName="VoiceMessage";if(arguments.length==0){throw new Error("Can not instantiate with empty parameters, use obtain method instead -> VoiceMessage.");}this.content=message.content;this.duration=message.duration;this.extra=message.extra;if(message.user){this.user=message.user;}if(message.mentionedInfo){this.mentionedInfo=message.mentionedInfo;}}VoiceMessage.obtain=function(base64Content,duration){return new VoiceMessage({content:base64Content,duration:duration,extra:""});};VoiceMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return VoiceMessage;}();RongIMLib.VoiceMessage=VoiceMessage;var RecallCommandMessage=function(){function RecallCommandMessage(message){this.messageName="RecallCommandMessage";this.messageUId=message.messageUId;this.conversationType=message.conversationType;this.targetId=message.targetId;this.sentTime=message.sentTime;message.extra&&(this.extra=message.extra);message.user&&(this.user=message.user);}RecallCommandMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return RecallCommandMessage;}();RongIMLib.RecallCommandMessage=RecallCommandMessage;var ImageMessage=function(){function ImageMessage(message){this.messageName="ImageMessage";if(arguments.length==0){throw new Error("Can not instantiate with empty parameters, use obtain method instead -> ImageMessage.");}this.content=message.content;this.imageUri=message.imageUri;message.extra&&(this.extra=message.extra);message.user&&(this.user=message.user);if(message.mentionedInfo){this.mentionedInfo=message.mentionedInfo;}}ImageMessage.obtain=function(content,imageUri){return new ImageMessage({content:content,imageUri:imageUri,extra:""});};ImageMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return ImageMessage;}();RongIMLib.ImageMessage=ImageMessage;var LocationMessage=function(){function LocationMessage(message){this.messageName="LocationMessage";if(arguments.length==0){throw new Error("Can not instantiate with empty parameters, use obtain method instead -> LocationMessage.");}this.latitude=message.latitude;this.longitude=message.longitude;this.poi=message.poi;this.content=message.content;this.extra=message.extra;if(message.user){this.user=message.user;}if(message.mentionedInfo){this.mentionedInfo=message.mentionedInfo;}}LocationMessage.obtain=function(latitude,longitude,poi,content){return new LocationMessage({latitude:latitude,longitude:longitude,poi:poi,content:content,extra:""});};LocationMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return LocationMessage;}();RongIMLib.LocationMessage=LocationMessage;var RichContentMessage=function(){function RichContentMessage(message){this.messageName="RichContentMessage";if(arguments.length==0){throw new Error("Can not instantiate with empty parameters, use obtain method instead -> RichContentMessage.");}this.title=message.title;this.content=message.content;this.imageUri=message.imageUri;this.extra=message.extra;this.url=message.url;if(message.user){this.user=message.user;}}RichContentMessage.obtain=function(title,content,imageUri,url){return new RichContentMessage({title:title,content:content,imageUri:imageUri,url:url,extra:""});};RichContentMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return RichContentMessage;}();RongIMLib.RichContentMessage=RichContentMessage;var JrmfRedPacketMessage=function(){function JrmfRedPacketMessage(message){this.messageName='JrmfRedPacketMessage';message&&(this.message=message);}JrmfRedPacketMessage.prototype.encode=function(){return "";};return JrmfRedPacketMessage;}();RongIMLib.JrmfRedPacketMessage=JrmfRedPacketMessage;var JrmfRedPacketOpenedMessage=function(){function JrmfRedPacketOpenedMessage(message){this.messageName='JrmfRedPacketOpenedMessage';message&&(this.message=message);}JrmfRedPacketOpenedMessage.prototype.encode=function(){return "";};return JrmfRedPacketOpenedMessage;}();RongIMLib.JrmfRedPacketOpenedMessage=JrmfRedPacketOpenedMessage;var UnknownMessage=function(){function UnknownMessage(message){this.messageName="UnknownMessage";if(arguments.length==0){throw new Error("Can not instantiate with empty parameters, use obtain method instead -> UnknownMessage.");}this.message=message;}UnknownMessage.prototype.encode=function(){return "";};return UnknownMessage;}();RongIMLib.UnknownMessage=UnknownMessage;var PublicServiceCommandMessage=function(){function PublicServiceCommandMessage(message){this.messageName="PublicServiceCommandMessage";if(arguments.length==0){throw new Error("Can not instantiate with empty parameters, use obtain method instead -> PublicServiceCommandMessage.");}this.content=message.content;this.extra=message.extra;this.menuItem=message.menuItem;if(message.user){this.user=message.user;}if(message.mentionedInfo){this.mentionedInfo=message.mentionedInfo;}}PublicServiceCommandMessage.obtain=function(item){return new PublicServiceCommandMessage({content:"",command:"",menuItem:item,extra:""});};PublicServiceCommandMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return PublicServiceCommandMessage;}();RongIMLib.PublicServiceCommandMessage=PublicServiceCommandMessage;var PublicServiceMultiRichContentMessage=function(){function PublicServiceMultiRichContentMessage(messages){this.messageName="PublicServiceMultiRichContentMessage";this.richContentMessages=messages;}PublicServiceMultiRichContentMessage.prototype.encode=function(){return null;};return PublicServiceMultiRichContentMessage;}();RongIMLib.PublicServiceMultiRichContentMessage=PublicServiceMultiRichContentMessage;var SyncReadStatusMessage=function(){function SyncReadStatusMessage(message){this.messageName="SyncReadStatusMessage";message.lastMessageSendTime&&(this.lastMessageSendTime=message.lastMessageSendTime);}SyncReadStatusMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return SyncReadStatusMessage;}();RongIMLib.SyncReadStatusMessage=SyncReadStatusMessage;var ReadReceiptRequestMessage=function(){function ReadReceiptRequestMessage(message){this.messageName="ReadReceiptRequestMessage";message.messageUId&&(this.messageUId=message.messageUId);}ReadReceiptRequestMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return ReadReceiptRequestMessage;}();RongIMLib.ReadReceiptRequestMessage=ReadReceiptRequestMessage;var ReadReceiptResponseMessage=function(){function ReadReceiptResponseMessage(message){this.messageName="ReadReceiptResponseMessage";message.receiptMessageDic&&(this.receiptMessageDic=message.receiptMessageDic);}ReadReceiptResponseMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return ReadReceiptResponseMessage;}();RongIMLib.ReadReceiptResponseMessage=ReadReceiptResponseMessage;var PublicServiceRichContentMessage=function(){function PublicServiceRichContentMessage(message){this.messageName="PublicServiceRichContentMessage";this.richContentMessage=message;}PublicServiceRichContentMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return PublicServiceRichContentMessage;}();RongIMLib.PublicServiceRichContentMessage=PublicServiceRichContentMessage;var FileMessage=function(){function FileMessage(message){this.messageName="FileMessage";message.name&&(this.name=message.name);message.size&&(this.size=message.size);message.type&&(this.type=message.type);message.fileUrl&&(this.fileUrl=message.fileUrl);message.extra&&(this.extra=message.extra);message.user&&(this.user=message.user);}FileMessage.obtain=function(msg){return new FileMessage({name:msg.name,size:msg.size,type:msg.type,fileUrl:msg.fileUrl});};FileMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return FileMessage;}();RongIMLib.FileMessage=FileMessage;var HQVoiceMessage=function(){function HQVoiceMessage(message){this.messageName="HQVoiceMessage";this.type=message.type||'aac';message.localPath&&(this.localPath=message.localPath);message.remoteUrl&&(this.remoteUrl=message.remoteUrl);message.duration&&(this.duration=message.duration);message.extra&&(this.extra=message.extra);message.user&&(this.user=message.user);}HQVoiceMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return HQVoiceMessage;}();RongIMLib.HQVoiceMessage=HQVoiceMessage;var AcceptMessage=function(){function AcceptMessage(message){this.messageName="AcceptMessage";this.mediaId=message.mediaId;this.callId=message.callId;this.mediaType=message.mediaType;this.mode=message.mode;this.subInfo=message.subInfo;}AcceptMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return AcceptMessage;}();RongIMLib.AcceptMessage=AcceptMessage;var RingingMessage=function(){function RingingMessage(message){this.messageName="RingingMessage";this.callId=message.callId;}RingingMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return RingingMessage;}();RongIMLib.RingingMessage=RingingMessage;var SummaryMessage=function(){function SummaryMessage(message){this.messageName="SummaryMessage";this.caller=message.caller;this.inviter=message.inviter;this.mediaType=message.mediaType;this.memberIdList=message.memberIdList;this.startTime=message.startTime;this.connectedTime=message.connectedTime;this.duration=message.duration;this.status=message.status;}SummaryMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return SummaryMessage;}();RongIMLib.SummaryMessage=SummaryMessage;var HungupMessage=function(){function HungupMessage(message){this.messageName="HungupMessage";this.callId=message.callId;this.reason=message.reason;this.mode=message.mode;this.subInfo=message.subInfo;}HungupMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return HungupMessage;}();RongIMLib.HungupMessage=HungupMessage;var InviteMessage=function(){function InviteMessage(message){this.messageName="InviteMessage";this.mediaId=message.mediaId;this.callId=message.callId;this.engineType=message.engineType;this.channelInfo=message.channelInfo;this.mediaType=message.mediaType;this.extra=message.extra;this.inviteUserIds=message.inviteUserIds;this.observerUserIds=message.observerUserIds;this.mode=message.mode;this.subInfo=message.subInfo;}InviteMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return InviteMessage;}();RongIMLib.InviteMessage=InviteMessage;var MediaModifyMessage=function(){function MediaModifyMessage(message){this.messageName="MediaModifyMessage";this.callId=message.callId;this.mediaType=message.mediaType;this.mode=message.mode;this.subInfo=message.subInfo;}MediaModifyMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return MediaModifyMessage;}();RongIMLib.MediaModifyMessage=MediaModifyMessage;var MemberModifyMessage=function(){function MemberModifyMessage(message){this.messageName="MemberModifyMessage";this.modifyMemType=message.modifyMemType;this.callId=message.callId;this.caller=message.caller;this.engineType=message.engineType;this.channelInfo=message.channelInfo;this.mediaType=message.mediaType;this.extra=message.extra;this.inviteUserIds=message.inviteUserIds;this.existedMemberStatusList=message.existedMemberStatusList;this.existedUserPofiles=message.existedUserPofiles;this.observerUserIds=message.observerUserIds;this.mode=message.mode;this.subInfo=message.subInfo;}MemberModifyMessage.prototype.encode=function(){return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));};return MemberModifyMessage;}();RongIMLib.MemberModifyMessage=MemberModifyMessage;})(RongIMLib||(RongIMLib={}));var RongIMLib;(function(RongIMLib){var ChannelInfo=function(){function ChannelInfo(Id,Key){this.Id=Id;this.Key=Key;}return ChannelInfo;}();RongIMLib.ChannelInfo=ChannelInfo;var UserStatus=function(){function UserStatus(platform,online,status){this.platform=platform;this.online=online;this.status=status;}return UserStatus;}();RongIMLib.UserStatus=UserStatus;var MentionedInfo=function(){function MentionedInfo(type,userIdList,mentionedContent){}return MentionedInfo;}();RongIMLib.MentionedInfo=MentionedInfo;var DeleteMessage=function(){function DeleteMessage(msgId,msgDataTime,direct){this.msgId=msgId;this.msgDataTime=msgDataTime;this.direct=direct;}return DeleteMessage;}();RongIMLib.DeleteMessage=DeleteMessage;var CustomServiceConfig=function(){function CustomServiceConfig(isBlack,companyName,companyUrl){}return CustomServiceConfig;}();RongIMLib.CustomServiceConfig=CustomServiceConfig;var CustomServiceSession=function(){function CustomServiceSession(uid,cid,pid,isQuited,type,adminHelloWord,adminOfflineWord){}return CustomServiceSession;}();RongIMLib.CustomServiceSession=CustomServiceSession;var Conversation=function(){function Conversation(conversationTitle,conversationType,draft,isTop,latestMessage,latestMessageId,notificationStatus,objectName,receivedStatus,receivedTime,senderUserId,senderUserName,sentStatus,sentTime,targetId,unreadMessageCount,senderPortraitUri,isHidden,mentionedMsg,hasUnreadMention,_readTime){this.conversationTitle=conversationTitle;this.conversationType=conversationType;this.draft=draft;this.isTop=isTop;this.latestMessage=latestMessage;this.latestMessageId=latestMessageId;this.notificationStatus=notificationStatus;this.objectName=objectName;this.receivedStatus=receivedStatus;this.receivedTime=receivedTime;this.senderUserId=senderUserId;this.senderUserName=senderUserName;this.sentStatus=sentStatus;this.sentTime=sentTime;this.targetId=targetId;this.unreadMessageCount=unreadMessageCount;this.senderPortraitUri=senderPortraitUri;this.isHidden=isHidden;this.mentionedMsg=mentionedMsg;this.hasUnreadMention=hasUnreadMention;this._readTime=_readTime;}Conversation.prototype.setTop=function(){RongIMLib.RongIMClient._dataAccessProvider.addConversation(this,{onSuccess:function(data){}});};return Conversation;}();RongIMLib.Conversation=Conversation;var Discussion=function(){function Discussion(creatorId,id,memberIdList,name,isOpen){this.creatorId=creatorId;this.id=id;this.memberIdList=memberIdList;this.name=name;this.isOpen=isOpen;}return Discussion;}();RongIMLib.Discussion=Discussion;var Group=function(){function Group(id,name,portraitUri){this.id=id;this.name=name;this.portraitUri=portraitUri;}return Group;}();RongIMLib.Group=Group;var Message=function(){function Message(content,conversationType,extra,objectName,messageDirection,messageId,receivedStatus,receivedTime,senderUserId,sentStatus,sentTime,targetId,messageType,messageUId,isLocalMessage,offLineMessage,receiptResponse){this.content=content;this.conversationType=conversationType;this.extra=extra;this.objectName=objectName;this.messageDirection=messageDirection;this.messageId=messageId;this.receivedStatus=receivedStatus;this.receivedTime=receivedTime;this.senderUserId=senderUserId;this.sentStatus=sentStatus;this.sentTime=sentTime;this.targetId=targetId;this.messageType=messageType;this.messageUId=messageUId;this.isLocalMessage=isLocalMessage;this.offLineMessage=offLineMessage;this.receiptResponse=receiptResponse;}return Message;}();RongIMLib.Message=Message;var MessageTag=function(){function MessageTag(isCounted,isPersited){this.isCounted=isCounted;this.isPersited=isPersited;}MessageTag.prototype.getMessageTag=function(){if(this.isCounted&&this.isPersited){return 3;}else if(this.isCounted){return 2;}else if(this.isPersited){return 1;}else if(!this.isCounted&&!this.isPersited){return 0;}};MessageTag.getTagByStatus=function(status){var statusMap={3:{isCounted:true,isPersited:true},2:{isCounted:true,isPersited:false},1:{isCounted:true,isPersited:true},0:{isCounted:true,isPersited:true}};return statusMap[status]||statusMap[3];};return MessageTag;}();RongIMLib.MessageTag=MessageTag;var PublicServiceMenuItem=function(){function PublicServiceMenuItem(id,name,type,sunMenuItems,url){this.id=id;this.name=name;this.type=type;this.sunMenuItems=sunMenuItems;this.url=url;}return PublicServiceMenuItem;}();RongIMLib.PublicServiceMenuItem=PublicServiceMenuItem;// TODO: TBD
var PublicServiceProfile=function(){function PublicServiceProfile(conversationType,introduction,menu,name,portraitUri,publicServiceId,hasFollowed,isGlobal){this.conversationType=conversationType;this.introduction=introduction;this.menu=menu;this.name=name;this.portraitUri=portraitUri;this.publicServiceId=publicServiceId;this.hasFollowed=hasFollowed;this.isGlobal=isGlobal;}return PublicServiceProfile;}();RongIMLib.PublicServiceProfile=PublicServiceProfile;var UserInfo=function(){function UserInfo(id,name,portraitUri){this.id=id;this.name=name;this.portraitUri=portraitUri;}return UserInfo;}();RongIMLib.UserInfo=UserInfo;var User=function(){function User(id,token){this.id=id;this.token=token;}return User;}();RongIMLib.User=User;var Room=function(){function Room(id,user,mode){this.id=id;this.user=user;this.mode=mode;}return Room;}();RongIMLib.Room=Room;})(RongIMLib||(RongIMLib={}));var RongIMLib;(function(RongIMLib){var ServerDataProvider=function(){function ServerDataProvider(){this.userStatusListener=null;}ServerDataProvider.prototype.init=function(appKey,options){new RongIMLib.FeatureDectector(options.appCallback);};ServerDataProvider.prototype.connect=function(token,callback,userId,option){RongIMLib.RongIMClient.bridge=RongIMLib.Bridge.getInstance();RongIMLib.RongIMClient._memoryStore.token=token;RongIMLib.RongIMClient._memoryStore.callback=callback;option=option||{};var isConnecting=false,isConnected=false;if(RongIMLib.Bridge._client&&RongIMLib.Bridge._client.channel){isConnecting=RongIMLib.Bridge._client.channel.connectionStatus==RongIMLib.ConnectionStatus.CONNECTING;isConnected=RongIMLib.Bridge._client.channel.connectionStatus==RongIMLib.ConnectionStatus.CONNECTED;}if(isConnected||isConnecting){return;}var isGreater=RongIMLib.RongIMClient.otherDeviceLoginCount>5;if(isGreater){callback.onError(RongIMLib.ConnectionStatus.ULTRALIMIT);return;}// 清除本地导航缓存
if(option.force){RongIMLib.RongIMClient._storageProvider.removeItem('servers');}//循环设置监听事件，追加之后清空存放事件数据
for(var i=0,len=RongIMLib.RongIMClient._memoryStore.listenerList.length;i<len;i++){RongIMLib.RongIMClient.bridge["setListener"](RongIMLib.RongIMClient._memoryStore.listenerList[i]);}RongIMLib.RongIMClient._memoryStore.listenerList.length=0;RongIMLib.RongIMClient.bridge.connect(RongIMLib.RongIMClient._memoryStore.appKey,token,{onSuccess:function(data){setTimeout(function(){callback.onSuccess(data);});},onError:function(e){if(e==RongIMLib.ConnectionState.TOKEN_INCORRECT||!e){setTimeout(function(){callback.onTokenIncorrect();});}else {setTimeout(function(){callback.onError(e);});}}});};/*
            config.auto: 默认 false, true 启用自动重连，启用则为必选参数
            config.rate: 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
            config.url: 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
        */ServerDataProvider.prototype.reconnect=function(callback,config){var store=RongIMLib.RongIMClient._memoryStore;var token=store.token;if(!token){throw new Error('reconnect: token is empty.');}if(RongIMLib.Bridge._client&&RongIMLib.Bridge._client.channel&&RongIMLib.Bridge._client.channel.connectionStatus!=RongIMLib.ConnectionStatus.CONNECTED&&RongIMLib.Bridge._client.channel.connectionStatus!=RongIMLib.ConnectionStatus.CONNECTING){config=config||{};var key=config.auto?'auto':'custom';var handler={auto:function(){var repeatConnect=function(options){var step=options.step();var url=options.url;var ping=function(){RongIMLib.RongUtil.request({url:url,success:function(){options.done();},error:function(){repeat();}});};var repeat=function(){var next=step();if(next=='done'){var error=RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE;options.done(error);return;}setTimeout(ping,next);};repeat();};var protocol=RongIMLib.RongIMClient._memoryStore.depend.protocol;var url=config.url||'cdn.ronghub.com/RongIMLib-2.2.6.min.js';var pathConfig={protocol:protocol,path:url};url=RongIMLib.RongUtil.formatProtoclPath(pathConfig);var rate=config.rate||[100,1000,3000,6000,10000,18000];//结束标识
rate.push('done');var opts={url:url,step:function(){var index=0;return function(){var time=rate[index];index++;return time;};},done:function(error){if(error){callback.onError(error);return;}RongIMLib.RongIMClient.connect(token,callback);}};repeatConnect(opts);},custom:function(){RongIMLib.RongIMClient.connect(token,callback);}};handler[key]();}};ServerDataProvider.prototype.logout=function(){RongIMLib.RongIMClient.bridge.disconnect();RongIMLib.RongIMClient.bridge=null;};ServerDataProvider.prototype.disconnect=function(){RongIMLib.RongIMClient.bridge.disconnect();};ServerDataProvider.prototype.sendReceiptResponse=function(conversationType,targetId,sendCallback){var rspkey=RongIMLib.Bridge._client.userId+conversationType+targetId+'RECEIVED',me=this;if(RongIMLib.RongUtil.supportLocalStorage()){var valObj=JSON.parse(RongIMLib.RongIMClient._storageProvider.getItem(rspkey));if(valObj){var vals=[];for(var key in valObj){var tmp={};tmp[key]=valObj[key].uIds;valObj[key].isResponse||vals.push(tmp);}if(vals.length==0){sendCallback.onSuccess();return;}var interval=setInterval(function(){if(vals.length==1){clearInterval(interval);}var obj=vals.splice(0,1)[0];var rspMsg=new RongIMLib.ReadReceiptResponseMessage({receiptMessageDic:obj});me.sendMessage(conversationType,targetId,rspMsg,{onSuccess:function(msg){var senderUserId=RongIMLib.MessageUtil.getFirstKey(obj);valObj[senderUserId].isResponse=true;RongIMLib.RongIMClient._storageProvider.setItem(rspkey,JSON.stringify(valObj));sendCallback.onSuccess(msg);},onError:function(error,msg){sendCallback.onError(error,msg);}});},200);}else {sendCallback.onSuccess();}}else {sendCallback.onSuccess();}};ServerDataProvider.prototype.sendTypingStatusMessage=function(conversationType,targetId,messageName,sendCallback){var me=this;if(messageName in RongIMLib.RongIMClient.MessageParams){me.sendMessage(conversationType,targetId,RongIMLib.TypingStatusMessage.obtain(RongIMLib.RongIMClient.MessageParams[messageName].objectName,""),{onSuccess:function(){setTimeout(function(){sendCallback.onSuccess();});},onError:function(errorCode){setTimeout(function(){sendCallback.onError(errorCode,null);});},onBefore:function(){}});}};ServerDataProvider.prototype.sendRecallMessage=function(content,sendMessageCallback){var msg=new RongIMLib.RecallCommandMessage({conversationType:content.conversationType,targetId:content.targetId,sentTime:content.sentTime,messageUId:content.messageUId,extra:content.extra,user:content.user});this.sendMessage(content.conversationType,content.senderUserId,msg,sendMessageCallback,false,null,null,2);};ServerDataProvider.prototype.sendTextMessage=function(conversationType,targetId,content,sendMessageCallback){var msgContent=RongIMLib.TextMessage.obtain(content);this.sendMessage(conversationType,targetId,msgContent,sendMessageCallback);};ServerDataProvider.prototype.getRemoteHistoryMessages=function(conversationType,targetId,timestamp,count,callback,config){if(count<=1){throw new Error("the count must be greater than 1.");}config=config||{};var order=config.order||0;var getKey=function(){return [conversationType,targetId,'_',order].join('');};var key=getKey();if(!RongIMLib.RongUtil.isNumber(timestamp)){timestamp=RongIMLib.RongIMClient._memoryStore.lastReadTime.get(key);}var memoryStore=RongIMLib.RongIMClient._memoryStore;var historyMessageLimit=memoryStore.historyMessageLimit;/*
                limit 属性:
                var limit = {
                    time: '时间戳, 最后一次拉取时间',
                    hasMore: '是否还有历史消息, bool 值'
                };
            */var limit=historyMessageLimit.get(key)||{};var hasMore=limit.hasMore;var isFecth=hasMore||limit.time!=timestamp;// 正序获取消息时不做限制，防止有新消息导致无法获取
if(!isFecth&&order==0){return callback.onSuccess([],hasMore);}var modules=new RongIMLib.RongIMClient.Protobuf.HistoryMsgInput();modules.setTargetId(targetId);modules.setTime(timestamp);modules.setCount(count);modules.setOrder(order);RongIMLib.RongIMClient.bridge.queryMsg(HistoryMsgType[conversationType],RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),targetId,{onSuccess:function(data){var fetchTime=RongIMLib.MessageUtil.int64ToTimestamp(data.syncTime);RongIMLib.RongIMClient._memoryStore.lastReadTime.set(key,fetchTime);historyMessageLimit.set(key,{hasMore:!!data.hasMsg,time:fetchTime});var list=data.list.reverse(),tempMsg=null,tempDir;var read=RongIMLib.SentStatus.READ;if(RongIMLib.RongUtil.supportLocalStorage()){for(var i=0,len=list.length;i<len;i++){tempMsg=RongIMLib.MessageUtil.messageParser(list[i]);tempDir=JSON.parse(RongIMLib.RongIMClient._storageProvider.getItem(RongIMLib.Bridge._client.userId+tempMsg.messageUId+"SENT"));if(tempDir){tempMsg.receiptResponse||(tempMsg.receiptResponse={});tempMsg.receiptResponse[tempMsg.messageUId]=tempDir.count;}tempMsg.sentStatus=read;tempMsg.targetId=targetId;list[i]=tempMsg;}}else {for(var i=0,len=list.length;i<len;i++){var tempMsg=RongIMLib.MessageUtil.messageParser(list[i]);tempMsg.sentStatus=read;list[i]=tempMsg;}}setTimeout(function(){callback.onSuccess(list,!!data.hasMsg);});},onError:function(error){setTimeout(function(){callback.onError(error);});}},"HistoryMessagesOuput");};ServerDataProvider.prototype.hasRemoteUnreadMessages=function(token,callback){var xss=null;window.RCCallback=function(x){setTimeout(function(){callback.onSuccess(!!+x.status);});xss.parentNode.removeChild(xss);};xss=document.createElement("script");xss.src=RongIMLib.RongIMClient._memoryStore.depend.api+"/message/exist.js?appKey="+encodeURIComponent(RongIMLib.RongIMClient._memoryStore.appKey)+"&token="+encodeURIComponent(token)+"&callBack=RCCallback&_="+RongIMLib.RongUtil.getTimestamp();document.body.appendChild(xss);xss.onerror=function(){setTimeout(function(){callback.onError(RongIMLib.ErrorCode.UNKNOWN);});xss.parentNode.removeChild(xss);};};ServerDataProvider.prototype.getRemoteConversationList=function(callback,conversationTypes,count){var modules=new RongIMLib.RongIMClient.Protobuf.RelationsInput(),self=this;modules.setType(1);if(typeof count=='undefined'){modules.setCount(0);}else {modules.setCount(count);}RongIMLib.RongIMClient.bridge.queryMsg(26,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),RongIMLib.Bridge._client.userId,{onSuccess:function(list){if(list.info){list.info=list.info.reverse();for(var i=0,len=list.info.length;i<len;i++){RongIMLib.RongIMClient.getInstance().pottingConversation(list.info[i]);}}var conversations=RongIMLib.RongIMClient._memoryStore.conversationList;setTimeout(function(){if(conversationTypes){return callback.onSuccess(self.filterConversations(conversationTypes,conversations));}callback.onSuccess(conversations);});},onError:function(error){callback.onError(error);}},"RelationsOutput");};ServerDataProvider.prototype.addMemberToDiscussion=function(discussionId,userIdList,callback){var modules=new RongIMLib.RongIMClient.Protobuf.ChannelInvitationInput();modules.setUsers(userIdList);RongIMLib.RongIMClient.bridge.queryMsg(0,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),discussionId,{onSuccess:function(){setTimeout(function(){callback.onSuccess();});},onError:function(error){setTimeout(function(){callback.onError(error);});}});};ServerDataProvider.prototype.createDiscussion=function(name,userIdList,callback){var modules=new RongIMLib.RongIMClient.Protobuf.CreateDiscussionInput(),self=this;modules.setName(name);RongIMLib.RongIMClient.bridge.queryMsg(1,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),RongIMLib.Bridge._client.userId,{onSuccess:function(discussId){if(userIdList.length>0){self.addMemberToDiscussion(discussId,userIdList,{onSuccess:function(){},onError:function(error){setTimeout(function(){callback.onError(error);});}});}setTimeout(function(){callback.onSuccess(discussId);});},onError:function(error){setTimeout(function(){callback.onError(error);});}},"CreateDiscussionOutput");};ServerDataProvider.prototype.getDiscussion=function(discussionId,callback){var modules=new RongIMLib.RongIMClient.Protobuf.ChannelInfoInput();modules.setNothing(1);RongIMLib.RongIMClient.bridge.queryMsg(4,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),discussionId,{onSuccess:function(data){setTimeout(function(){callback.onSuccess(data);});},onError:function(errorCode){setTimeout(function(){callback.onError(errorCode);});}},"ChannelInfoOutput");};ServerDataProvider.prototype.quitDiscussion=function(discussionId,callback){var modules=new RongIMLib.RongIMClient.Protobuf.LeaveChannelInput();modules.setNothing(1);RongIMLib.RongIMClient.bridge.queryMsg(7,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),discussionId,{onSuccess:function(){setTimeout(function(){callback.onSuccess();});},onError:function(errorCode){setTimeout(function(){callback.onError(errorCode);});}});};ServerDataProvider.prototype.removeMemberFromDiscussion=function(discussionId,userId,callback){var modules=new RongIMLib.RongIMClient.Protobuf.ChannelEvictionInput();modules.setUser(userId);RongIMLib.RongIMClient.bridge.queryMsg(9,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),discussionId,{onSuccess:function(){setTimeout(function(){callback.onSuccess();});},onError:function(errorCode){setTimeout(function(){callback.onError(errorCode);});}});};ServerDataProvider.prototype.setDiscussionInviteStatus=function(discussionId,status,callback){var modules=new RongIMLib.RongIMClient.Protobuf.ModifyPermissionInput();modules.setOpenStatus(status.valueOf());RongIMLib.RongIMClient.bridge.queryMsg(11,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),discussionId,{onSuccess:function(x){setTimeout(function(){callback.onSuccess();});},onError:function(error){setTimeout(function(){callback.onError(error);});}});};ServerDataProvider.prototype.setDiscussionName=function(discussionId,name,callback){var modules=new RongIMLib.RongIMClient.Protobuf.RenameChannelInput();modules.setName(name);RongIMLib.RongIMClient.bridge.queryMsg(12,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),discussionId,{onSuccess:function(){setTimeout(function(){callback.onSuccess();});},onError:function(errcode){callback.onError(errcode);}});};ServerDataProvider.prototype.joinChatRoom=function(chatroomId,messageCount,callback){var e=new RongIMLib.RongIMClient.Protobuf.ChrmInput();e.setNothing(1);RongIMLib.Bridge._client.chatroomId=chatroomId;RongIMLib.RongIMClient.bridge.queryMsg(19,RongIMLib.MessageUtil.ArrayForm(e.toArrayBuffer()),chatroomId,{onSuccess:function(){setTimeout(function(){callback.onSuccess();});var modules=new RongIMLib.RongIMClient.Protobuf.ChrmPullMsg();messageCount==0&&(messageCount=-1);modules.setCount(messageCount);modules.setSyncTime(0);RongIMLib.Bridge._client.queryMessage("chrmPull",RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),chatroomId,1,{onSuccess:function(collection){var list=collection.list;var sync=RongIMLib.MessageUtil.int64ToTimestamp(collection.syncTime);var latestMessage=list[list.length-1];if(latestMessage){latestMessage=RongIMLib.MessageUtil.messageParser(latestMessage);sync=latestMessage.sentTime;}RongIMLib.RongIMClient._memoryStore.lastReadTime.set(chatroomId+RongIMLib.Bridge._client.userId+"CST",sync);var _client=RongIMLib.Bridge._client;for(var i=0,mlen=list.length;i<mlen;i++){var uId='R'+list[i].msgId;if(!(uId in _client.cacheMessageIds)){_client.cacheMessageIds[uId]=true;var cacheUIds=RongIMLib.RongUtil.keys(_client.cacheMessageIds);if(cacheUIds.length>10){uId=cacheUIds[0];delete _client.cacheMessageIds[uId];}if(RongIMLib.RongIMClient._memoryStore.filterMessages.length>0){for(var j=0,flen=RongIMLib.RongIMClient._memoryStore.filterMessages.length;j<flen;j++){if(RongIMLib.RongIMClient.MessageParams[RongIMLib.RongIMClient._memoryStore.filterMessages[j]].objectName!=list[i].classname){_client.handler.onReceived(list[i]);}}}else {_client.handler.onReceived(list[i]);}}}},onError:function(x){setTimeout(function(){callback.onError(RongIMLib.ErrorCode.CHATROOM_HISMESSAGE_ERROR);});}},"DownStreamMessages");},onError:function(error){setTimeout(function(){callback.onError(error);});}},"ChrmOutput");};ServerDataProvider.prototype.getChatRoomInfo=function(chatRoomId,count,order,callback){var modules=new RongIMLib.RongIMClient.Protobuf.QueryChatroomInfoInput();modules.setCount(count);modules.setOrder(order);RongIMLib.RongIMClient.bridge.queryMsg("queryChrmI",RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),chatRoomId,{onSuccess:function(ret){var userInfos=ret.userInfos;userInfos.forEach(function(item){item.time=RongIMLib.MessageUtil.int64ToTimestamp(item.time);});setTimeout(function(){callback.onSuccess(ret);});},onError:function(errcode){setTimeout(function(){callback.onError(errcode);});}},"QueryChatroomInfoOutput");};ServerDataProvider.prototype.quitChatRoom=function(chatroomId,callback){var e=new RongIMLib.RongIMClient.Protobuf.ChrmInput();e.setNothing(1);RongIMLib.RongIMClient.bridge.queryMsg(17,RongIMLib.MessageUtil.ArrayForm(e.toArrayBuffer()),chatroomId,{onSuccess:function(){setTimeout(function(){callback.onSuccess();});},onError:function(errcode){setTimeout(function(){callback.onError(errcode);});}},"ChrmOutput");};ServerDataProvider.prototype.setChatroomHisMessageTimestamp=function(chatRoomId,timestamp){RongIMLib.RongIMClient._memoryStore.lastReadTime.set('chrhis_'+chatRoomId,timestamp);};ServerDataProvider.prototype.getChatRoomHistoryMessages=function(chatRoomId,count,order,callback){var modules=new RongIMLib.RongIMClient.Protobuf.HistoryMsgInput();modules.setTargetId(chatRoomId);var timestamp=RongIMLib.RongIMClient._memoryStore.lastReadTime.get('chrhis_'+chatRoomId)||0;modules.setTime(timestamp);modules.setCount(count);modules.setOrder(order);RongIMLib.RongIMClient.bridge.queryMsg(34,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),RongIMLib.Bridge._client.userId,{onSuccess:function(data){RongIMLib.RongIMClient._memoryStore.lastReadTime.set('chrhis_'+chatRoomId,RongIMLib.MessageUtil.int64ToTimestamp(data.syncTime));var list=data.list.reverse();for(var i=0,len=list.length;i<len;i++){list[i]=RongIMLib.MessageUtil.messageParser(list[i]);}setTimeout(function(){callback.onSuccess(list,!!data.hasMsg);});},onError:function(error){setTimeout(function(){callback.onError(error);});}},"HistoryMsgOuput");};ServerDataProvider.prototype.setMessageStatus=function(conversationType,targetId,timestamp,status,callback){setTimeout(function(){callback.onSuccess(true);});};ServerDataProvider.prototype.addToBlacklist=function(userId,callback){var modules=new RongIMLib.RongIMClient.Protobuf.Add2BlackListInput();modules.setUserId(userId);RongIMLib.RongIMClient.bridge.queryMsg(21,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),userId,{onSuccess:function(){setTimeout(function(){callback.onSuccess();});},onError:function(error){setTimeout(function(){callback.onError(error);});}});};ServerDataProvider.prototype.getBlacklist=function(callback){var modules=new RongIMLib.RongIMClient.Protobuf.QueryBlackListInput();modules.setNothing(1);RongIMLib.RongIMClient.bridge.queryMsg(23,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),RongIMLib.Bridge._client.userId,{onSuccess:function(list){setTimeout(function(){callback.onSuccess(list);});},onError:function(error){setTimeout(function(){callback.onError(error);});}},"QueryBlackListOutput");};ServerDataProvider.prototype.getBlacklistStatus=function(userId,callback){var modules=new RongIMLib.RongIMClient.Protobuf.BlackListStatusInput();modules.setUserId(userId);RongIMLib.RongIMClient.bridge.queryMsg(24,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),userId,{onSuccess:function(status){setTimeout(function(){callback.onSuccess(RongIMLib.BlacklistStatus[status]);});},onError:function(error){setTimeout(function(){callback.onError(error);});}});};ServerDataProvider.prototype.removeFromBlacklist=function(userId,callback){var modules=new RongIMLib.RongIMClient.Protobuf.RemoveFromBlackListInput();modules.setUserId(userId);RongIMLib.RongIMClient.bridge.queryMsg(22,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),userId,{onSuccess:function(){setTimeout(function(){callback.onSuccess();});},onError:function(error){setTimeout(function(){callback.onError(error);});}});};ServerDataProvider.prototype.getFileToken=function(fileType,callback){if(!/(1|2|3|4)/.test(fileType.toString())){setTimeout(function(){callback.onError(RongIMLib.ErrorCode.QNTKN_FILETYPE_ERROR);});return;}var modules=new RongIMLib.RongIMClient.Protobuf.GetQNupTokenInput();modules.setType(fileType);RongIMLib.RongIMClient.bridge.queryMsg(30,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),RongIMLib.Bridge._client.userId,{onSuccess:function(data){setTimeout(function(){callback.onSuccess(data);});},onError:function(errcode){setTimeout(function(){callback.onError(errcode);});}},"GetQNupTokenOutput");};ServerDataProvider.prototype.getFileUrl=function(fileType,fileName,oriName,callback){if(!/(1|2|3|4)/.test(fileType.toString())){setTimeout(function(){callback.onError(RongIMLib.ErrorCode.QNTKN_FILETYPE_ERROR);});return;}var modules=new RongIMLib.RongIMClient.Protobuf.GetQNdownloadUrlInput();modules.setType(fileType);modules.setKey(fileName);if(oriName){modules.setFileName(oriName);}RongIMLib.RongIMClient.bridge.queryMsg(31,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),RongIMLib.Bridge._client.userId,{onSuccess:function(data){setTimeout(function(){callback.onSuccess(data);});},onError:function(errcode){setTimeout(function(){callback.onError(errcode);});}},"GetQNdownloadUrlOutput");};/*
            methodType 1 : 多客服(客服后台使用);   2 : 消息撤回
            params.userIds : 定向消息接收者
        */ServerDataProvider.prototype.sendMessage=function(conversationType,targetId,messageContent,sendCallback,mentiondMsg,pushText,appData,methodType,params){if(!RongIMLib.Bridge._client.channel){setTimeout(function(){sendCallback.onError(RongIMLib.ErrorCode.RC_NET_UNAVAILABLE,null);});return;}if(!RongIMLib.Bridge._client.channel.socket.socket.connected){setTimeout(function(){sendCallback.onError(RongIMLib.ErrorCode.TIMEOUT,null);});throw new Error("connect is timeout! postion:sendMessage");}var isGroup=conversationType==RongIMLib.ConversationType.DISCUSSION||conversationType==RongIMLib.ConversationType.GROUP;var modules=new RongIMLib.RongIMClient.Protobuf.UpStreamMessage();if(mentiondMsg&&isGroup){modules.setSessionId(7);}else {modules.setSessionId(RongIMLib.RongIMClient.MessageParams[messageContent.messageName].msgTag.getMessageTag());}pushText&&modules.setPushText(pushText);appData&&modules.setAppData(appData);if(isGroup&&messageContent.messageName==RongIMLib.RongIMClient.MessageType["ReadReceiptResponseMessage"]){var rspMsg=messageContent;if(rspMsg.receiptMessageDic){var ids=[];for(var key in rspMsg.receiptMessageDic){ids.push(key);}modules.setUserId(ids);}}if(isGroup&&messageContent.messageName==RongIMLib.RongIMClient.MessageType["SyncReadStatusMessage"]){modules.setUserId(RongIMLib.Bridge._client.userId);}params=params||{};var userIds=params.userIds;if(isGroup&&userIds){modules.setUserId(userIds);}modules.setClassname(RongIMLib.RongIMClient.MessageParams[messageContent.messageName].objectName);modules.setContent(messageContent.encode());var content=modules.toArrayBuffer();if(Object.prototype.toString.call(content)=="[object ArrayBuffer]"){content=[].slice.call(new Int8Array(content));}var me=this,msg=new RongIMLib.Message();var c=this.getConversation(conversationType,targetId);if(RongIMLib.RongIMClient.MessageParams[messageContent.messageName].msgTag.getMessageTag()==3){if(!c){c=RongIMLib.RongIMClient.getInstance().createConversation(conversationType,targetId,"");}c.sentTime=new Date().getTime();c.sentStatus=RongIMLib.SentStatus.SENDING;c.senderUserName="";c.senderUserId=RongIMLib.Bridge._client.userId;c.notificationStatus=RongIMLib.ConversationNotificationStatus.DO_NOT_DISTURB;c.latestMessage=msg;c.unreadMessageCount=0;RongIMLib.RongIMClient._dataAccessProvider.addConversation(c,{onSuccess:function(data){}});}RongIMLib.RongIMClient._memoryStore.converStore=c;msg.content=messageContent;msg.conversationType=conversationType;msg.senderUserId=RongIMLib.Bridge._client.userId;msg.objectName=RongIMLib.RongIMClient.MessageParams[messageContent.messageName].objectName;msg.targetId=targetId;msg.sentTime=new Date().getTime();msg.messageDirection=RongIMLib.MessageDirection.SEND;msg.sentStatus=RongIMLib.SentStatus.SENT;msg.messageType=messageContent.messageName;RongIMLib.RongIMClient.bridge.pubMsg(conversationType.valueOf(),content,targetId,{onSuccess:function(data){if(data&&data.timestamp){RongIMLib.RongIMClient._memoryStore.lastReadTime.set('converST_'+RongIMLib.Bridge._client.userId+conversationType+targetId,data.timestamp);}if((conversationType==RongIMLib.ConversationType.DISCUSSION||conversationType==RongIMLib.ConversationType.GROUP)&&messageContent.messageName==RongIMLib.RongIMClient.MessageType["ReadReceiptRequestMessage"]){var reqMsg=msg.content;var sentkey=RongIMLib.Bridge._client.userId+reqMsg.messageUId+"SENT";RongIMLib.RongIMClient._storageProvider.setItem(sentkey,JSON.stringify({count:0,dealtime:data.timestamp,userIds:{}}));}if(RongIMLib.RongIMClient.MessageParams[msg.messageType].msgTag.getMessageTag()==3){var cacheConversation=RongIMLib.RongIMClient._memoryStore.converStore;cacheConversation.sentStatus=msg.sentStatus;cacheConversation.latestMessage=msg;me.updateConversation(cacheConversation);RongIMLib.RongIMClient._dataAccessProvider.addMessage(conversationType,targetId,msg,{onSuccess:function(ret){msg=ret;msg.messageUId=data.messageUId;msg.sentTime=data.timestamp;msg.sentStatus=RongIMLib.SentStatus.SENT;msg.messageId=data.messageId;RongIMLib.RongIMClient._dataAccessProvider.updateMessage(msg);},onError:function(){}});}setTimeout(function(){cacheConversation&&me.updateConversation(cacheConversation);msg.sentTime=data.timestamp;msg.messageUId=data.messageUId;sendCallback.onSuccess(msg);});},onError:function(errorCode,_msg){msg.sentStatus=RongIMLib.SentStatus.FAILED;if(_msg){msg.messageUId=_msg.messageUId;msg.sentTime=_msg.sentTime;}if(RongIMLib.RongIMClient.MessageParams[msg.messageType].msgTag.getMessageTag()==3){RongIMLib.RongIMClient._memoryStore.converStore.latestMessage=msg;}RongIMLib.RongIMClient._dataAccessProvider.addMessage(conversationType,targetId,msg,{onSuccess:function(ret){msg.messageId=ret.messageId;RongIMLib.RongIMClient._dataAccessProvider.updateMessage(msg);},onError:function(){}});setTimeout(function(){sendCallback.onError(errorCode,msg);});}},null,methodType);sendCallback.onBefore&&sendCallback.onBefore(RongIMLib.MessageIdHandler.messageId);msg.messageId=RongIMLib.MessageIdHandler.messageId+"";};ServerDataProvider.prototype.setConnectionStatusListener=function(listener){var watcher={onChanged:function(status){listener.onChanged(status);RongIMLib.RongUtil.forEach(RongIMLib.RongIMClient.statusListeners,function(watch){watch(status);});}};if(RongIMLib.RongIMClient.bridge){RongIMLib.RongIMClient.bridge.setListener(watcher);}else {RongIMLib.RongIMClient._memoryStore.listenerList.push(watcher);}};ServerDataProvider.prototype.setOnReceiveMessageListener=function(listener){if(RongIMLib.RongIMClient.bridge){RongIMLib.RongIMClient.bridge.setListener(listener);}else {RongIMLib.RongIMClient._memoryStore.listenerList.push(listener);}};ServerDataProvider.prototype.registerMessageType=function(messageType,objectName,messageTag,messageContent,searchProps){if(!messageType){throw new Error("messageType can't be empty,postion -> registerMessageType");}if(!objectName){throw new Error("objectName can't be empty,postion -> registerMessageType");}if(Object.prototype.toString.call(messageContent)=="[object Array]"){var regMsg=RongIMLib.ModelUtil.modleCreate(messageContent,messageType);RongIMLib.RongIMClient.RegisterMessage[messageType]=regMsg;}else if(Object.prototype.toString.call(messageContent)=="[object Function]"||Object.prototype.toString.call(messageContent)=="[object Object]"){if(!messageContent.encode){throw new Error("encode method has not realized or messageName is undefined-> registerMessageType");}if(!messageContent.decode){throw new Error("decode method has not realized -> registerMessageType");}}else {throw new Error("The index of 3 parameter was wrong type  must be object or function or array-> registerMessageType");}registerMessageTypeMapping[objectName]=messageType;};ServerDataProvider.prototype.registerMessageTypes=function(messages){var types=[];var getProtos=function(proto){var protos=[];for(var p in proto){protos.push(p);}return protos;};//转换消息为自定义消息参数格式
for(var name in messages){var message=messages[name];var proto=message.proto;var protos=getProtos(proto);var flag=message.flag||3;var tag=RongIMLib.MessageTag.getTagByStatus(flag);flag=new RongIMLib.MessageTag(tag.isCounted,tag.isPersited);types.push({type:name,name:message.name,flag:flag,protos:protos});}var register=function(message){var type=message.type;var name=message.name;var flag=message.flag;var protos=message.protos;RongIMLib.RongIMClient.registerMessageType(type,name,flag,protos);};for(var i=0,len=types.length;i<len;i++){var message=types[i];register(message);}};ServerDataProvider.prototype.addConversation=function(conversation,callback){var isAdd=true;for(var i=0,len=RongIMLib.RongIMClient._memoryStore.conversationList.length;i<len;i++){if(RongIMLib.RongIMClient._memoryStore.conversationList[i].conversationType===conversation.conversationType&&RongIMLib.RongIMClient._memoryStore.conversationList[i].targetId===conversation.targetId){// RongIMClient._memoryStore.conversationList[i] = conversation;
RongIMLib.RongIMClient._memoryStore.conversationList.unshift(RongIMLib.RongIMClient._memoryStore.conversationList.splice(i,1)[0]);isAdd=false;break;}}if(isAdd){RongIMLib.RongIMClient._memoryStore.conversationList.unshift(conversation);}callback&&callback.onSuccess(true);};ServerDataProvider.prototype.updateConversation=function(conversation){var conver;for(var i=0,len=RongIMLib.RongIMClient._memoryStore.conversationList.length;i<len;i++){var item=RongIMLib.RongIMClient._memoryStore.conversationList[i];if(conversation.conversationType===item.conversationType&&conversation.targetId===item.targetId){conversation.conversationTitle&&(item.conversationTitle=conversation.conversationTitle);conversation.senderUserName&&(item.senderUserName=conversation.senderUserName);conversation.senderPortraitUri&&(item.senderPortraitUri=conversation.senderPortraitUri);conversation.latestMessage&&(item.latestMessage=conversation.latestMessage);conversation.sentStatus&&(item.sentStatus=conversation.sentStatus);break;}}return conver;};ServerDataProvider.prototype.removeConversation=function(conversationType,targetId,callback){var mod=new RongIMLib.RongIMClient.Protobuf.RelationsInput();mod.setType(conversationType);RongIMLib.RongIMClient.bridge.queryMsg(27,RongIMLib.MessageUtil.ArrayForm(mod.toArrayBuffer()),targetId,{onSuccess:function(){var conversations=RongIMLib.RongIMClient._memoryStore.conversationList;var len=conversations.length;for(var i=0;i<len;i++){if(conversations[i].conversationType==conversationType&&targetId==conversations[i].targetId){conversations.splice(i,1);break;}}callback.onSuccess(true);},onError:function(error){setTimeout(function(){callback.onError(error);});}});};ServerDataProvider.prototype.getMessage=function(messageId,callback){callback.onSuccess(new RongIMLib.Message());};ServerDataProvider.prototype.addMessage=function(conversationType,targetId,message,callback){if(callback){callback.onSuccess(message);}};ServerDataProvider.prototype.removeMessage=function(conversationType,targetId,messageIds,callback){RongIMLib.RongIMClient.getInstance().deleteRemoteMessages(conversationType,targetId,messageIds,callback);};ServerDataProvider.prototype.removeLocalMessage=function(conversationType,targetId,timestamps,callback){callback.onSuccess(true);};ServerDataProvider.prototype.updateMessage=function(message,callback){if(callback){callback.onSuccess(message);}};ServerDataProvider.prototype.clearRemoteHistoryMessages=function(params,callback){var modules=new RongIMLib.RongIMClient.Protobuf.CleanHisMsgInput();var conversationType=params.conversationType;var _topic={1:'cleanPMsg',2:'cleanDMsg',3:'cleanGMsg',5:'cleanCMsg',6:'cleanSMsg'};var topic=_topic[conversationType];if(!topic){callback.onError(RongIMLib.ErrorCode.CLEAR_HIS_TYPE_ERROR);return;}var timestamp=params.timestamp;if(typeof timestamp!='number'){callback.onError(RongIMLib.ErrorCode.CLEAR_HIS_TIME_ERROR);return;}modules.setDataTime(timestamp);var targetId=params.targetId;modules.setTargetId(targetId);RongIMLib.RongIMClient.bridge.queryMsg(topic,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),targetId,{onSuccess:function(result){callback.onSuccess(!result);},onError:function(error){// error 1 历史消息云存储没有开通、传入时间大于服务器时间 清除失败，1 与其他错误码冲突，所以自定义错误码返回
if(error==1){error=RongIMLib.ErrorCode.CLEAR_HIS_ERROR;}setTimeout(function(){callback.onError(error);});}});};ServerDataProvider.prototype.clearHistoryMessages=function(params,callback){this.clearRemoteHistoryMessages(params,callback);};// 兼容老版本
ServerDataProvider.prototype.clearMessages=function(conversationType,targetId,callback){};ServerDataProvider.prototype.updateMessages=function(conversationType,targetId,key,value,callback){var me=this;if(key=="readStatus"){if(RongIMLib.RongIMClient._memoryStore.conversationList.length>0){me.getConversationList({onSuccess:function(list){Array.forEach(list,function(conver){if(conver.conversationType==conversationType&&conver.targetId==targetId){conver.unreadMessageCount=0;}});},onError:function(errorCode){setTimeout(function(){callback.onError(errorCode);});}},null);}}setTimeout(function(){callback.onSuccess(true);});};ServerDataProvider.prototype.getConversation=function(conversationType,targetId,callback){var conver=null;for(var i=0,len=RongIMLib.RongIMClient._memoryStore.conversationList.length;i<len;i++){if(RongIMLib.RongIMClient._memoryStore.conversationList[i].conversationType==conversationType&&RongIMLib.RongIMClient._memoryStore.conversationList[i].targetId==targetId){conver=RongIMLib.RongIMClient._memoryStore.conversationList[i];if(RongIMLib.RongUtil.supportLocalStorage()){var count=RongIMLib.RongIMClient._storageProvider.getItem("cu"+RongIMLib.Bridge._client.userId+conversationType+targetId);if(conver.unreadMessageCount==0){conver.unreadMessageCount=Number(count);}}}}setTimeout(function(){callback&&callback.onSuccess(conver);});return conver;};ServerDataProvider.prototype.filterConversations=function(types,list){var conversaions=[];RongIMLib.RongUtil.forEach(types,function(type){RongIMLib.RongUtil.forEach(list,function(conversation){if(conversation.conversationType==type){conversaions.push(conversation);}});});return conversaions;};ServerDataProvider.prototype.getConversationList=function(callback,conversationTypes,count,isHidden){var that=this;var isSync=RongIMLib.RongIMClient._memoryStore.isSyncRemoteConverList;var list=RongIMLib.RongIMClient._memoryStore.conversationList;var isLocalInclude=list.length>count;if(!isSync&&isLocalInclude){setTimeout(function(){var localList=list.slice(0,count);if(conversationTypes){localList=that.filterConversations(conversationTypes,localList);}callback.onSuccess(localList);});return;}RongIMLib.RongIMClient.getInstance().getRemoteConversationList({onSuccess:function(list){if(RongIMLib.RongUtil.supportLocalStorage()){Array.forEach(RongIMLib.RongIMClient._memoryStore.conversationList,function(item){var count=RongIMLib.RongIMClient._storageProvider.getItem("cu"+RongIMLib.Bridge._client.userId+item.conversationType+item.targetId);if(item.unreadMessageCount==0){item.unreadMessageCount=Number(count);}});}RongIMLib.RongIMClient._memoryStore.isSyncRemoteConverList=false;setTimeout(function(){callback.onSuccess(list);});},onError:function(errorcode){setTimeout(function(){callback.onError(errorcode);});}},conversationTypes,count,isHidden);};ServerDataProvider.prototype.clearCache=function(){var memoryStore=RongIMLib.RongIMClient._memoryStore||{};memoryStore.conversationList=[];memoryStore.isSyncRemoteConverList=true;};ServerDataProvider.prototype.clearConversations=function(conversationTypes,callback){Array.forEach(conversationTypes,function(conversationType){Array.forEach(RongIMLib.RongIMClient._memoryStore.conversationList,function(conver){if(conversationType==conver.conversationType){RongIMLib.RongIMClient.getInstance().removeConversation(conver.conversationType,conver.targetId,{onSuccess:function(){},onError:function(){}});}});});setTimeout(function(){callback.onSuccess(true);});};ServerDataProvider.prototype.setMessageContent=function(messageId,content,objectname){};ServerDataProvider.prototype.setMessageSearchField=function(messageId,content,searchFiles){};ServerDataProvider.prototype.getHistoryMessages=function(conversationType,targetId,timestamp,count,callback,objectname,order){var config={objectname:objectname,order:order};RongIMLib.RongIMClient.getInstance().getRemoteHistoryMessages(conversationType,targetId,timestamp,count,callback,config);};ServerDataProvider.prototype.getTotalUnreadCount=function(callback,conversationTypes){var count=0;var storageProvider=RongIMLib.RongIMClient._storageProvider;if(conversationTypes){RongIMLib.RongUtil.forEach(conversationTypes,function(type){var unreadKeys=storageProvider.getItemKeyList("cu"+RongIMLib.Bridge._client.userId+type);RongIMLib.RongUtil.forEach(unreadKeys,function(key){var unread=storageProvider.getItem(key);var unreadCount=Number(unread)||0;count+=unreadCount;});});}else {var unreadKeys=storageProvider.getItemKeyList("cu"+RongIMLib.Bridge._client.userId);RongIMLib.RongUtil.forEach(unreadKeys,function(key){var unread=storageProvider.getItem(key);var unreadCount=Number(unread)||0;count+=unreadCount;});}callback.onSuccess(count);};ServerDataProvider.prototype.getConversationUnreadCount=function(conversationTypes,callback){var count=0;Array.forEach(conversationTypes,function(converType){Array.forEach(RongIMLib.RongIMClient._memoryStore.conversationList,function(conver){if(conver.conversationType==converType){count+=conver.unreadMessageCount;}});});setTimeout(function(){callback.onSuccess(count);});};//由于 Web 端未读消息数按会话统计，撤回消息会导致未读数不准确，提供设置未读数接口，桌面版不实现此方法
ServerDataProvider.prototype.setUnreadCount=function(conversationType,targetId,count){var storageProvider=RongIMLib.RongIMClient._storageProvider;var key="cu"+RongIMLib.Bridge._client.userId+conversationType+targetId;storageProvider.setItem(key,count);};ServerDataProvider.prototype.getUnreadCount=function(conversationType,targetId,callback){var key="cu"+RongIMLib.Bridge._client.userId+conversationType+targetId;var unread=RongIMLib.RongIMClient._storageProvider.getItem(key);var unreadCount=Number(unread);setTimeout(function(){callback.onSuccess(unreadCount||0);});};ServerDataProvider.prototype.cleanMentioneds=function(conver){if(conver){conver.mentionedMsg=null;var targetId=conver.targetId;var conversationType=conver.conversationType;var mentioneds=RongIMLib.RongIMClient._storageProvider.getItem("mentioneds_"+RongIMLib.Bridge._client.userId+'_'+conversationType+'_'+targetId);if(mentioneds){var info=JSON.parse(mentioneds);delete info[conversationType+"_"+targetId];if(!RongIMLib.MessageUtil.isEmpty(info)){RongIMLib.RongIMClient._storageProvider.setItem("mentioneds_"+RongIMLib.Bridge._client.userId+'_'+conversationType+'_'+targetId,JSON.stringify(info));}else {RongIMLib.RongIMClient._storageProvider.removeItem("mentioneds_"+RongIMLib.Bridge._client.userId+'_'+conversationType+'_'+targetId);}}}};ServerDataProvider.prototype.clearUnreadCountByTimestamp=function(conversationType,targetId,timestamp,callback){setTimeout(function(){callback.onSuccess(true);});};ServerDataProvider.prototype.clearUnreadCount=function(conversationType,targetId,callback){var me=this;RongIMLib.RongIMClient._storageProvider.removeItem("cu"+RongIMLib.Bridge._client.userId+conversationType+targetId);this.getConversation(conversationType,targetId,{onSuccess:function(conver){if(conver){conver.unreadMessageCount=0;me.cleanMentioneds(conver);}setTimeout(function(){callback.onSuccess(true);});},onError:function(error){setTimeout(function(){callback.onError(error);});}});};ServerDataProvider.prototype.clearTotalUnreadCount=function(callback){var list=RongIMLib.RongIMClient._memoryStore.conversationList;var me=this;if(list){// 清除 mentioneds、清除 list 中的 unreadMessageCount
for(var i=0;i<list.length;i++){var conver=list[i];if(conver){conver.unreadMessageCount=0;me.cleanMentioneds(conver);}}}// 1. 获取所有 key 2. 清除
var unreadKeys=RongIMLib.RongIMClient._storageProvider.getItemKeyList("cu"+RongIMLib.Bridge._client.userId);RongIMLib.RongUtil.forEach(unreadKeys,function(key){RongIMLib.RongIMClient._storageProvider.removeItem(key);});setTimeout(function(){callback.onSuccess(true);});};ServerDataProvider.prototype.setConversationToTop=function(conversationType,targetId,isTop,callback){var me=this;this.getConversation(conversationType,targetId,{onSuccess:function(conver){conver.isTop=isTop;me.addConversation(conver,callback);setTimeout(function(){callback.onSuccess(true);});},onError:function(error){setTimeout(function(){callback.onError(error);});}});};ServerDataProvider.prototype.getConversationNotificationStatus=function(params,callback){var targetId=params.targetId;var conversationType=params.conversationType;var notification=RongIMLib.RongIMClient._memoryStore.notification;var getKey=function(){return conversationType+'_'+targetId;};var key=getKey();var status=notification[key];if(typeof status=='number'){callback.onSuccess(status);return;}var topics={1:'qryPPush',3:'qryDPush'};var topic=topics[conversationType];if(!topic){var error=8001;callback.onError(error);return;}var modules=new RongIMLib.RongIMClient.Protobuf.BlockPushInput();modules.setBlockeeId(targetId);var userId=RongIMLib.Bridge._client.userId;var success=function(status){notification[key]=status;setTimeout(function(){callback.onSuccess(status);});};RongIMLib.RongIMClient.bridge.queryMsg(topic,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),userId,{onSuccess:function(status){success(status);},onError:function(e){if(e==1){success(e);}else {setTimeout(function(){callback.onError(e);});}}});};ServerDataProvider.prototype.setConversationNotificationStatus=function(params,callback){var conversationType=params.conversationType;var targetId=params.targetId;var status=params.status;var getKey=function(){return conversationType+'_'+status;};var topics={'1_1':'blkPPush','3_1':'blkDPush','1_0':'unblkPPush','3_0':'unblkDPush'};var key=getKey();var notification=RongIMLib.RongIMClient._memoryStore.notification;notification[key]=status;var topic=topics[key];if(!topic){var error=8001;setTimeout(function(){callback.onError(error);});return;}var modules=new RongIMLib.RongIMClient.Protobuf.BlockPushInput();modules.setBlockeeId(targetId);var userId=RongIMLib.Bridge._client.userId;RongIMLib.RongIMClient.bridge.queryMsg(topic,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),userId,{onSuccess:function(status){setTimeout(function(){callback.onSuccess(status);});},onError:function(e){setTimeout(function(){callback.onError(e);});}});};ServerDataProvider.prototype.getUserStatus=function(userId,callback){var modules=new RongIMLib.RongIMClient.Protobuf.GetUserStatusInput();userId=RongIMLib.Bridge._client.userId;RongIMLib.RongIMClient.bridge.queryMsg(35,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),userId,{onSuccess:function(status){status=RongIMLib.RongInnerTools.convertUserStatus(status);setTimeout(function(){callback.onSuccess(status);});},onError:function(e){setTimeout(function(){callback.onError(e);});}},'GetUserStatusOutput');// callback.onSuccess(new UserStatus());
};ServerDataProvider.prototype.setUserStatus=function(status,callback){var modules=new RongIMLib.RongIMClient.Protobuf.SetUserStatusInput();var userId=RongIMLib.Bridge._client.userId;if(status){modules.setStatus(status);}RongIMLib.RongIMClient.bridge.queryMsg(36,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),userId,{onSuccess:function(status){setTimeout(function(){callback.onSuccess(true);});},onError:function(e){setTimeout(function(){callback.onError(e);});}},'SetUserStatusOutput');};ServerDataProvider.prototype.subscribeUserStatus=function(userIds,callback){var modules=new RongIMLib.RongIMClient.Protobuf.SubUserStatusInput();var userId=RongIMLib.Bridge._client.userId;modules.setUserid(userIds);RongIMLib.RongIMClient.bridge.queryMsg(37,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),userId,{onSuccess:function(status){setTimeout(function(){callback&&callback.onSuccess(true);});},onError:function(e){setTimeout(function(){callback&&callback.onError(e);});}},'SubUserStatusOutput');};ServerDataProvider.prototype.setUserStatusListener=function(params,callback){RongIMLib.RongIMClient.userStatusListener=callback;var userIds=params.userIds||[];if(userIds.length){RongIMLib.RongIMClient._dataAccessProvider.subscribeUserStatus(userIds);}};ServerDataProvider.prototype.clearListeners=function(){};ServerDataProvider.prototype.setServerInfo=function(info){};ServerDataProvider.prototype.getUnreadMentionedMessages=function(conversationType,targetId){return null;};ServerDataProvider.prototype.setConversationHidden=function(conversationType,targetId,isHidden){};ServerDataProvider.prototype.setMessageExtra=function(messageId,value,callback){setTimeout(function(){callback.onSuccess(true);});};ServerDataProvider.prototype.setMessageReceivedStatus=function(messageId,receivedStatus,callback){setTimeout(function(){callback.onSuccess(true);});};ServerDataProvider.prototype.setMessageSentStatus=function(messageId,sentStatus,callback){setTimeout(function(){callback.onSuccess(true);});};ServerDataProvider.prototype.getAllConversations=function(callback){setTimeout(function(){callback.onSuccess([]);});};ServerDataProvider.prototype.getConversationByContent=function(keywords,callback){setTimeout(function(){callback.onSuccess([]);});};ServerDataProvider.prototype.getMessagesFromConversation=function(conversationType,targetId,keywords,callback){setTimeout(function(){callback.onSuccess([]);});};ServerDataProvider.prototype.searchConversationByContent=function(keyword,callback,conversationTypes){setTimeout(function(){callback.onSuccess([]);});};ServerDataProvider.prototype.searchMessageByContent=function(conversationType,targetId,keyword,timestamp,count,total,callback){setTimeout(function(){callback.onSuccess([]);});};ServerDataProvider.prototype.getDelaTime=function(){return RongIMLib.RongIMClient._memoryStore.deltaTime;};ServerDataProvider.prototype.getCurrentConnectionStatus=function(){var client=RongIMLib.Bridge._client||{};var channel=client.channel||{};var status=RongIMLib.ConnectionStatus.CONNECTION_CLOSED;if(typeof channel.connectionStatus=='number'){status=channel.connectionStatus;}return status;};ServerDataProvider.prototype.getAgoraDynamicKey=function(engineType,channelName,callback){var modules=new RongIMLib.RongIMClient.Protobuf.VoipDynamicInput();modules.setEngineType(engineType);modules.setChannelName(channelName);RongIMLib.RongIMClient.bridge.queryMsg(32,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),RongIMLib.Bridge._client.userId,{onSuccess:function(result){setTimeout(function(){callback.onSuccess(result);});},onError:function(errorCode){setTimeout(function(){callback.onError(errorCode);});}},"VoipDynamicOutput");};ServerDataProvider.prototype.setDeviceInfo=function(deviceId){};ServerDataProvider.prototype.setEnvironment=function(isPrivate){};ServerDataProvider.prototype.clearData=function(){return true;};ServerDataProvider.prototype.getPublicServiceProfile=function(publicServiceType,publicServiceId,callback){var profile=RongIMLib.RongIMClient._memoryStore.publicServiceMap.get(publicServiceType,publicServiceId);setTimeout(function(){callback.onSuccess(profile);});};ServerDataProvider.prototype.getRemotePublicServiceList=function(callback,pullMessageTime){if(RongIMLib.RongIMClient._memoryStore.depend.openMp){var modules=new RongIMLib.RongIMClient.Protobuf.PullMpInput();if(!pullMessageTime){modules.setTime(0);}else {modules.setTime(pullMessageTime);}modules.setMpid("");RongIMLib.RongIMClient.bridge.queryMsg(28,RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),RongIMLib.Bridge._client.userId,{onSuccess:function(data){//TODO 找出最大时间
// self.lastReadTime.set(conversationType + targetId, MessageUtil.int64ToTimestamp(data.syncTime));
RongIMLib.RongIMClient._memoryStore.publicServiceMap.publicServiceList.length=0;RongIMLib.RongIMClient._memoryStore.publicServiceMap.publicServiceList=data;setTimeout(function(){callback&&callback.onSuccess(data);});},onError:function(errorCode){setTimeout(function(){callback&&callback.onError(errorCode);});}},"PullMpOutput");}};ServerDataProvider.prototype.getRTCUserInfoList=function(room,callback){var modules=new RongIMLib.RongIMClient.Protobuf.RtcQueryListInput();// 1 是正序,2是倒序
modules.setOrder(2);RongIMLib.RongIMClient.bridge.queryMsg("rtcUData",RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),room.id,{onSuccess:function(result){var users={};var list=result.list;RongIMLib.RongUtil.forEach(list,function(item){var userId=item.userId;var tmpData={};RongIMLib.RongUtil.forEach(item.userData,function(data){var key=data.key;var value=data.value;tmpData[key]=value;});users[userId]=tmpData;});callback.onSuccess(users);},onError:function(errorCode){callback.onError(errorCode);}},"RtcUserListOutput");};ServerDataProvider.prototype.getRTCUserList=function(room,callback){var modules=new RongIMLib.RongIMClient.Protobuf.RtcQueryListInput();modules.setOrder(2);RongIMLib.RongIMClient.bridge.queryMsg("rtcUList",RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),room.id,{onSuccess:function(result){callback.onSuccess({users:result.list});},onError:function(errorCode){callback.onError(errorCode);}},"RtcUserListOutput");};ServerDataProvider.prototype.setRTCUserInfo=function(room,info,callback){var modules=new RongIMLib.RongIMClient.Protobuf.RtcValueInfo();modules.setKey(info.key);modules.setValue(info.value);RongIMLib.RongIMClient.bridge.queryMsg("rtcUPut",RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),room.id,{onSuccess:function(){callback.onSuccess(true);},onError:function(errorCode){callback.onError(errorCode);}});};ServerDataProvider.prototype.removeRTCUserInfo=function(room,info,callback){var modules=new RongIMLib.RongIMClient.Protobuf.RtcKeyDeleteInput();var keys=info.keys||[];if(!RongIMLib.RongUtil.isArray(keys)){keys=[keys];}modules.setKey(keys);RongIMLib.RongIMClient.bridge.queryMsg("rtcUDel",RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),room.id,{onSuccess:function(){callback.onSuccess(true);},onError:function(errorCode){callback.onError(errorCode);}});};ServerDataProvider.prototype.getRTCRoomInfo=function(room,callback){var modules=new RongIMLib.RongIMClient.Protobuf.RtcQueryListInput();modules.setOrder(2);RongIMLib.RongIMClient.bridge.queryMsg("rtcRInfo",RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),room.id,{onSuccess:function(result){var room={id:result.roomId,total:result.userCount};RongIMLib.RongUtil.forEach(result.roomData,function(data){room[data.key]=data.value;});callback.onSuccess(room);},onError:function(errorCode){callback.onError(errorCode);}},"RtcRoomInfoOutput");};ServerDataProvider.prototype.setRTCRoomInfo=function(room,info,callback){var modules=new RongIMLib.RongIMClient.Protobuf.RtcValueInfo();modules.setKey(info.key);modules.setValue(info.value);RongIMLib.RongIMClient.bridge.queryMsg("rtcRPut",RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),room.id,{onSuccess:function(){callback.onSuccess(true);},onError:function(errorCode){callback.onError(errorCode);}});};ServerDataProvider.prototype.removeRTCRoomInfo=function(room,info,callback){var modules=new RongIMLib.RongIMClient.Protobuf.RtcKeyDeleteInput();var keys=info.keys||[];if(!RongIMLib.RongUtil.isArray(keys)){keys=[keys];}modules.setKey(keys);RongIMLib.RongIMClient.bridge.queryMsg("rtcRDel",RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),room.id,{onSuccess:function(){callback.onSuccess(true);},onError:function(errorCode){callback.onError(errorCode);}});};ServerDataProvider.prototype.joinRTCRoom=function(room,callback){var modules=new RongIMLib.RongIMClient.Protobuf.RtcInput();// 复用 PB
modules.setNothing(room.mode);RongIMLib.RongIMClient.bridge.queryMsg("rtcRJoin_data",RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),room.id,{onSuccess:function(result){var users={};var list=result.list,token=result.token;RongIMLib.RongUtil.forEach(list,function(item){var userId=item.userId;var tmpData={};RongIMLib.RongUtil.forEach(item.userData,function(data){var key=data.key;var value=data.value;tmpData[key]=value;});users[userId]=tmpData;});callback.onSuccess({users:users,token:token});},onError:function(errorCode){callback.onError(errorCode);}},"RtcUserListOutput");};ServerDataProvider.prototype.quitRTCRoom=function(room,callback){var modules=new RongIMLib.RongIMClient.Protobuf.SetUserStatusInput();RongIMLib.RongIMClient.bridge.queryMsg("rtcRExit",RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),room.id,{onSuccess:function(){callback.onSuccess(true);},onError:function(errorCode){callback.onError(errorCode);}});};ServerDataProvider.prototype.RTCPing=function(room,callback){var modules=new RongIMLib.RongIMClient.Protobuf.RtcInput();RongIMLib.RongIMClient.bridge.queryMsg("rtcPing",RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),room.id,callback);};ServerDataProvider.prototype.setRTCData=function(roomId,key,value,isInner,apiType,callback,message){var modules=new RongIMLib.RongIMClient.Protobuf.RtcSetDataInput();modules.setInterior(isInner);modules.setTarget(apiType);modules.setKey(key);modules.setValue(value);message=message||{};var name=message.name;var content=message.content;if(name){modules.setObjectName(name);}if(content){if(!RongIMLib.RongUtil.isString(content)){content=JSON.stringify(content);}modules.setContent(content);}RongIMLib.RongIMClient.bridge.queryMsg("rtcSetData",RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),roomId,callback,"RtcOutput");};ServerDataProvider.prototype.getRTCData=function(roomId,keys,isInner,apiType,callback){var modules=new RongIMLib.RongIMClient.Protobuf.RtcDataInput();modules.setInterior(isInner);modules.setTarget(apiType);modules.setKey(keys);RongIMLib.RongIMClient.bridge.queryMsg("rtcQryData",RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),roomId,{onSuccess:function(result){var props={};var list=result.outInfo;RongIMLib.RongUtil.forEach(list,function(item){props[item.key]=item.value;});callback.onSuccess(props);},onError:callback.onError},"RtcQryOutput");};ServerDataProvider.prototype.removeRTCData=function(roomId,keys,isInner,apiType,callback,message){var modules=new RongIMLib.RongIMClient.Protobuf.RtcDataInput();modules.setInterior(isInner);modules.setTarget(apiType);modules.setKey(keys);message=message||{};var name=message.name;var content=message.content;if(name){modules.setObjectName(name);}if(content){if(!RongIMLib.RongUtil.isString(content)){content=JSON.stringify(content);}modules.setContent(content);}RongIMLib.RongIMClient.bridge.queryMsg("rtcDelData",RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),roomId,callback,"RtcOutput");};ServerDataProvider.prototype.setRTCUserData=function(roomId,key,value,isInner,callback,message){this.setRTCData(roomId,key,value,isInner,RongIMLib.RTCAPIType.PERSON,callback,message);};ServerDataProvider.prototype.getRTCUserData=function(roomId,keys,isInner,callback,message){this.getRTCData(roomId,keys,isInner,RongIMLib.RTCAPIType.PERSON,callback);};ServerDataProvider.prototype.removeRTCUserData=function(roomId,keys,isInner,callback,message){this.removeRTCData(roomId,keys,isInner,RongIMLib.RTCAPIType.PERSON,callback,message);};ServerDataProvider.prototype.setRTCRoomData=function(roomId,key,value,isInner,callback,message){this.setRTCData(roomId,key,value,isInner,RongIMLib.RTCAPIType.ROOM,callback,message);};ServerDataProvider.prototype.getRTCRoomData=function(roomId,keys,isInner,callback,message){this.getRTCData(roomId,keys,isInner,RongIMLib.RTCAPIType.ROOM,callback);};ServerDataProvider.prototype.removeRTCRoomData=function(roomId,keys,isInner,callback,message){this.removeRTCData(roomId,keys,isInner,RongIMLib.RTCAPIType.ROOM,callback,message);};ServerDataProvider.prototype.getNavi=function(){var navi=RongIMLib.RongIMClient._storageProvider.getItem("fullnavi")||"{}";return JSON.parse(navi);};ServerDataProvider.prototype.getRTCToken=function(room,callback){var modules=new RongIMLib.RongIMClient.Protobuf.RtcInput();RongIMLib.RongIMClient.bridge.queryMsg("rtcToken",RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()),room.id,{onSuccess:function(result){callback.onSuccess(result);},onError:function(errorCode){callback.onError(errorCode);}},"RtcTokenOutput");};return ServerDataProvider;}();RongIMLib.ServerDataProvider=ServerDataProvider;})(RongIMLib||(RongIMLib={}));var RongIMLib;(function(RongIMLib){var VCDataProvider=function(){function VCDataProvider(addon){// C++ 需要的 SDK 版本号
this.version='2.8.27';this.userId="";this.useConsole=false;this.appKey="";this.token="";this.addon=addon;}VCDataProvider.prototype.init=function(appKey,config){this.appKey=appKey;this.useConsole&&console.log("init");config=config||{};config.version=this.version;var sdkInfo=this.addon.initWithAppkey(appKey,config.dbPath,config);if(sdkInfo){sdkInfo=JSON.parse(sdkInfo);}// 0 不存不计数  1 只存不计数 3 存且计数
this.addon.registerMessageType("RC:VcMsg",3);this.addon.registerMessageType("RC:ImgTextMsg",3);this.addon.registerMessageType("RC:FileMsg",3);this.addon.registerMessageType("RC:LBSMsg",3);this.addon.registerMessageType("RC:PSImgTxtMsg",3);this.addon.registerMessageType("RC:PSMultiImgTxtMsg",3);this.addon.registerMessageType("RCJrmf:RpMsg",3);this.addon.registerMessageType("RCJrmf:RpOpendMsg",1);this.addon.registerMessageType("RC:GrpNtf",1);this.addon.registerMessageType("RC:DizNtf",0);this.addon.registerMessageType("RC:InfoNtf",0);this.addon.registerMessageType("RC:ContactNtf",0);this.addon.registerMessageType("RC:ProfileNtf",0);this.addon.registerMessageType("RC:CmdNtf",0);this.addon.registerMessageType("RC:CmdMsg",0);this.addon.registerMessageType("RC:TypSts",0);this.addon.registerMessageType("RC:CsChaR",0);this.addon.registerMessageType("RC:CsHsR",0);this.addon.registerMessageType("RC:CsEnd",0);this.addon.registerMessageType("RC:CsSp",0);this.addon.registerMessageType("RC:CsUpdate",0);this.addon.registerMessageType("RC:CsContact",0);this.addon.registerMessageType("RC:ReadNtf",0);this.addon.registerMessageType("RC:VCAccept",0);this.addon.registerMessageType("RC:VCRinging",0);this.addon.registerMessageType("RC:VCSummary",0);this.addon.registerMessageType("RC:VCHangup",0);this.addon.registerMessageType("RC:VCInvite",0);this.addon.registerMessageType("RC:VCModifyMedia",0);this.addon.registerMessageType("RC:VCModifyMem",0);this.addon.registerMessageType("RC:PSCmd",0);this.addon.registerMessageType("RC:RcCmd",0);this.addon.registerMessageType("RC:SRSMsg",0);this.addon.registerMessageType("RC:RRReqMsg",0);this.addon.registerMessageType("RC:RRRspMsg",0);return sdkInfo;};VCDataProvider.prototype.connect=function(token,callback,userId,serverConf){this.useConsole&&console.log("connect");this.userId=userId;this.connectCallback=callback;RongIMLib.Bridge._client={userId:userId};serverConf=serverConf||{};var openmp=!!serverConf.openMp;var openus=!!serverConf.openUS;if(serverConf.type){this.addon.setEnvironment(true);}this.addon.connectWithToken(token,userId,serverConf.serverList,openmp,openus);};VCDataProvider.prototype.setServerInfo=function(info){'setServerInfo'in this.addon&&this.addon.setServerInfo(info.navi);};VCDataProvider.prototype.logout=function(){this.useConsole&&console.log("logout");this.disconnect();};VCDataProvider.prototype.disconnect=function(){this.useConsole&&console.log("disconnect");this.addon.disconnect(true);};VCDataProvider.prototype.clearListeners=function(){this.addon.setOnReceiveStatusListener();this.addon.setConnectionStatusListener();this.addon.setOnReceiveMessageListener();};VCDataProvider.prototype.clearData=function(){this.useConsole&&console.log("clearData");return this.addon.clearData();};VCDataProvider.prototype.setConnectionStatusListener=function(listener){var me=this;/**
            ConnectionStatus_TokenIncorrect = 31004,
            ConnectionStatus_Connected = 0,
            ConnectionStatus_KickedOff = 6,	// 其他设备登录
            ConnectionStatus_Connecting = 10,// 连接中
            ConnectionStatus_SignUp = 12, // 未登录
            ConnectionStatus_NetworkUnavailable = 1, // 连接断开
            ConnectionStatus_ServerInvalid = 8, // 断开
            ConnectionStatus_ValidateFailure = 9,//断开
            ConnectionStatus_Unconnected = 11,//断开
            ConnectionStatus_DisconnExecption = 31011 //断开
            RC_NAVI_MALLOC_ERROR   = 30000,//断开
            RC_NAVI_NET_UNAVAILABLE= 30002,//断开
            RC_NAVI_SEND_FAIL      = 30004,//断开
            RC_NAVI_REQ_TIMEOUT    = 30005,//断开
            RC_NAVI_RECV_FAIL      = 30006,//断开
            RC_NAVI_RESOURCE_ERROR = 30007,//断开
            RC_NAVI_NODE_NOT_FOUND = 30008,//断开
            RC_NAVI_DNS_ERROR      = 30009,//断开
            */me.connectListener=listener;this.useConsole&&console.log("setConnectionStatusListener");me.addon&&me.addon.setConnectionStatusListener(function(result){switch(result){case 10:setTimeout(function(){listener.onChanged(RongIMLib.ConnectionStatus.CONNECTING);});break;case 31004:setTimeout(function(){me.connectCallback.onTokenIncorrect();});break;case 1:case 8:case 9:case 11:case 12:case 31011:case 30000:case 30002:setTimeout(function(){listener.onChanged(RongIMLib.ConnectionStatus.DISCONNECTED);});break;case 0:case 33005:setTimeout(function(){me.connectCallback.onSuccess(me.userId);listener.onChanged(RongIMLib.ConnectionStatus.CONNECTED);});break;case 6:setTimeout(function(){listener.onChanged(RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT);});break;default:setTimeout(function(){listener.onChanged(result);});break;}});};VCDataProvider.prototype.setOnReceiveMessageListener=function(listener){var me=this;me.messageListener=listener;this.useConsole&&console.log("setOnReceiveMessageListener");me.addon&&me.addon.setOnReceiveMessageListener(function(result,leftCount,offline,hasMore){var message=me.buildMessage(result);message.offLineMessage=offline;setTimeout(function(){var voipMsgTypes=['AcceptMessage','RingingMessage','HungupMessage','InviteMessage','MediaModifyMessage','MemberModifyMessage'];var isVoIPMsg=voipMsgTypes.indexOf(message.messageType)>-1;if(isVoIPMsg){RongIMLib.RongIMClient._voipProvider&&RongIMLib.RongIMClient._voipProvider.onReceived(message);}else {listener.onReceived(message,leftCount,hasMore);}});});};VCDataProvider.prototype.sendTypingStatusMessage=function(conversationType,targetId,messageName,sendCallback){var me=this;this.useConsole&&console.log("sendTypingStatusMessage");if(messageName in RongIMLib.RongIMClient.MessageParams){me.sendMessage(conversationType,targetId,RongIMLib.TypingStatusMessage.obtain(RongIMLib.RongIMClient.MessageParams[messageName].objectName,""),{onSuccess:function(){setTimeout(function(){sendCallback.onSuccess();});},onError:function(errorCode){setTimeout(function(){sendCallback.onError(errorCode,null);});},onBefore:function(){}});}};VCDataProvider.prototype.setMessageStatus=function(conversationType,targetId,timestamp,status,callback){this.addon.updateMessageReceiptStatus(conversationType,targetId,timestamp);callback.onSuccess(true);};VCDataProvider.prototype.sendTextMessage=function(conversationType,targetId,content,sendMessageCallback){var msgContent=RongIMLib.TextMessage.obtain(content);this.useConsole&&console.log("sendTextMessage");this.sendMessage(conversationType,targetId,msgContent,sendMessageCallback);};VCDataProvider.prototype.getRemoteHistoryMessages=function(conversationType,targetId,timestamp,count,callback,config){try{var me=this;me.useConsole&&console.log("getRemoteHistoryMessages");me.addon.getRemoteHistoryMessages(conversationType,targetId,timestamp?timestamp:0,count,function(ret,hasMore){var list=ret?JSON.parse(ret).list:[],msgs=[];list.reverse();for(var i=0,len=list.length;i<len;i++){var message=me.buildMessage(list[i].obj);message.sentStatus=RongIMLib.SentStatus.READ;msgs[i]=message;}callback.onSuccess(msgs,hasMore?true:false);},function(errorCode){callback.onError(errorCode);});}catch(e){callback.onError(e);}};VCDataProvider.prototype.getRemoteConversationList=function(callback,conversationTypes,count,isGetHiddenConvers){try{this.useConsole&&console.log("getRemoteConversationList");var converTypes=conversationTypes||[1,2,3,4,5,6,7,8];var result=this.addon.getConversationList(converTypes);var list=JSON.parse(result).list,convers=[],me=this,index=0;list.reverse();isGetHiddenConvers=typeof isGetHiddenConvers==='boolean'?isGetHiddenConvers:false;for(var i=0,len_1=list.length;i<len_1;i++){var tmpObj=list[i].obj,obj=JSON.parse(tmpObj);if(obj!=""){if(obj.isHidden==1&&isGetHiddenConvers){continue;}convers[index]=me.buildConversation(tmpObj);index++;}}convers.reverse();var len=convers.length;count=count||len;if(len>count){convers.length=count;}callback.onSuccess(convers);}catch(e){callback.onError(e);}};VCDataProvider.prototype.removeConversation=function(conversationType,targetId,callback){try{this.useConsole&&console.log("removeConversation");this.addon.removeConversation(conversationType,targetId);var conversations=RongIMLib.RongIMClient._memoryStore.conversationList;var len=conversations.length;for(var i=0;i<len;i++){if(conversations[i].conversationType==conversationType&&targetId==conversations[i].targetId){conversations.splice(i,1);break;}}callback.onSuccess(true);}catch(e){callback.onError(e);}};VCDataProvider.prototype.joinChatRoom=function(chatRoomId,messageCount,callback){this.useConsole&&console.log("joinChatRoom");this.addon.joinChatRoom(chatRoomId,messageCount,function(){callback.onSuccess();},function(error){callback.onError(error);});};VCDataProvider.prototype.quitChatRoom=function(chatRoomId,callback){this.useConsole&&console.log("quitChatRoom");this.addon.quitChatRoom(chatRoomId,function(){callback.onSuccess();},function(error){callback.onError(error);});};VCDataProvider.prototype.addToBlacklist=function(userId,callback){this.useConsole&&console.log("addToBlacklist");this.addon.addToBlacklist(userId,function(){callback.onSuccess();},function(error){callback.onError(error);});};VCDataProvider.prototype.getBlacklist=function(callback){this.useConsole&&console.log("getBlacklist");this.addon.getBlacklist(function(blacklistors){callback.onSuccess(blacklistors);},function(error){callback.onError(error);});};VCDataProvider.prototype.getBlacklistStatus=function(userId,callback){this.useConsole&&console.log("getBlacklistStatus");this.addon.getBlacklistStatus(userId,function(result){callback.onSuccess(result);},function(error){callback.onError(error);});};VCDataProvider.prototype.removeFromBlacklist=function(userId,callback){this.useConsole&&console.log("removeFromBlacklist");this.addon.removeFromBlacklist(userId,function(){callback.onSuccess();},function(error){callback.onError(error);});};VCDataProvider.prototype.sendMessage=function(conversationType,targetId,messageContent,sendCallback,mentiondMsg,pushText,appData,methodType,params){var me=this,users=[];me.useConsole&&console.log("sendMessage");params=params||{};var isGroup=conversationType==RongIMLib.ConversationType.DISCUSSION||conversationType==RongIMLib.ConversationType.GROUP;if(isGroup&&messageContent.messageName==RongIMLib.RongIMClient.MessageType["ReadReceiptResponseMessage"]){users=[];var rspMsg=messageContent;if(rspMsg.receiptMessageDic){var ids=[];for(var key in rspMsg.receiptMessageDic){ids.push(key);}users=ids;}}if(isGroup&&messageContent.messageName==RongIMLib.RongIMClient.MessageType["SyncReadStatusMessage"]){users=[];users.push(me.userId);}var userIds=params.userIds;if(isGroup&&userIds){users=userIds;}var msg=me.addon.sendMessage(conversationType,targetId,RongIMLib.RongIMClient.MessageParams[messageContent.messageName].objectName,messageContent.encode(),pushText||"",appData||"",function(progress){},function(message,code){var msg=me.buildMessage(message);var errorCode=RongIMLib.ErrorCode.SENSITIVE_REPLACE;if(code==errorCode){return sendCallback.onError(errorCode,msg);}sendCallback.onSuccess(msg);},function(message,code){sendCallback.onError(code,me.buildMessage(message));},users,mentiondMsg);var tempMessage=JSON.parse(msg);sendCallback.onBefore&&sendCallback.onBefore(tempMessage.messageId);RongIMLib.MessageIdHandler.messageId=tempMessage.messageId;};VCDataProvider.prototype.registerMessageType=function(messageType,objectName,messageTag,messageContent,searchProps){this.useConsole&&console.log("registerMessageType");this.addon.registerMessageType(objectName,messageTag.getMessageTag(),searchProps);var regMsg=RongIMLib.ModelUtil.modleCreate(messageContent,messageType);RongIMLib.RongIMClient.RegisterMessage[messageType]=regMsg;RongIMLib.RongIMClient.RegisterMessage[messageType].messageName=messageType;registerMessageTypeMapping[objectName]=messageType;RongIMLib.RongIMClient.MessageType[messageType]=messageType;RongIMLib.RongIMClient.MessageParams[messageType]={objectName:objectName,msgTag:messageTag};typeMapping[objectName]=messageType;};VCDataProvider.prototype.registerMessageTypes=function(messages){var types=[];var getProtos=function(proto){var protos=[];for(var p in proto){protos.push(p);}return protos;};//转换消息为自定义消息参数格式
for(var name in messages){var message=messages[name];var proto=message.proto;var protos=getProtos(proto);var flag=message.flag||3;var tag=RongIMLib.MessageTag.getTagByStatus(flag);flag=new RongIMLib.MessageTag(tag.isCounted,tag.isPersited);types.push({type:name,name:message.name,flag:flag,protos:protos});}var register=function(message){var type=message.type;var name=message.name;var flag=message.flag;var protos=message.protos;RongIMLib.RongIMClient.registerMessageType(type,name,flag,protos);};for(var i=0,len=types.length;i<len;i++){var message=types[i];register(message);}};VCDataProvider.prototype.addMessage=function(conversationType,targetId,message,callback){this.useConsole&&console.log("addMessage");var direction=message.direction;var msg=this.addon.insertMessage(conversationType,targetId,message.senderUserId,message.objectName,JSON.stringify(message.content),function(){callback.onSuccess(me.buildMessage(msg));},function(){callback.onError(RongIMLib.ErrorCode.MSG_INSERT_ERROR);},direction),me=this;};VCDataProvider.prototype.removeMessage=function(conversationType,targetId,delMsgs,callback){};VCDataProvider.prototype.removeLocalMessage=function(conversationType,targetId,timestamps,callback){try{this.useConsole&&console.log("removeLocalMessage");this.addon.deleteMessages(timestamps);callback.onSuccess(true);}catch(e){callback.onError(e);}};VCDataProvider.prototype.getMessage=function(messageId,callback){try{this.useConsole&&console.log("getMessage");var msg=this.buildMessage(this.addon.getMessage(messageId));callback.onSuccess(msg);}catch(e){callback.onError(e);}};VCDataProvider.prototype.clearMessages=function(conversationType,targetId,callback){try{this.useConsole&&console.log("clearMessages");this.addon.clearMessages(conversationType,targetId);callback.onSuccess(true);}catch(e){callback.onError(e);}};// Web 端接口，桌面版无需实现
VCDataProvider.prototype.setUnreadCount=function(conversationType,targetId,count){};VCDataProvider.prototype.getConversation=function(conversationType,targetId,callback){try{this.useConsole&&console.log("getConversation");var ret=this.addon.getConversation(conversationType,targetId);callback.onSuccess(this.buildConversation(ret));}catch(e){callback.onError(e);}};VCDataProvider.prototype.getConversationList=function(callback,conversationTypes,count,isGetHiddenConvers){this.useConsole&&console.log("getConversationList");this.getRemoteConversationList(callback,conversationTypes,count,isGetHiddenConvers);};VCDataProvider.prototype.clearCache=function(){var memoryStore=RongIMLib.RongIMClient._memoryStore||{};memoryStore.conversationList=[];memoryStore.isSyncRemoteConverList;};VCDataProvider.prototype.clearConversations=function(conversationTypes,callback){try{this.useConsole&&console.log("clearConversations");this.addon.clearConversations();callback.onSuccess(true);}catch(e){callback.onError(e);}};VCDataProvider.prototype.setMessageContent=function(messageId,content,objectName){content=JSON.stringify(content);this.addon.setMessageContent(messageId,content,objectName);};VCDataProvider.prototype.setMessageSearchField=function(messageId,content,searchFiles){content=JSON.stringify(content);this.addon.setMessageContent(messageId,content,searchFiles);};VCDataProvider.prototype.getHistoryMessages=function(conversationType,targetId,timestamp,count,callback,objectname,direction){this.useConsole&&console.log("getHistoryMessages");if(count<=0){callback.onError(RongIMLib.ErrorCode.TIMEOUT);return;}objectname=objectname||'';direction=typeof direction=='undefined'||direction;try{var ret=this.addon.getHistoryMessages(conversationType,targetId,timestamp?timestamp:0,count,objectname,direction);var list=ret?JSON.parse(ret).list:[],msgs=[],me=this;list.reverse();for(var i=0,len=list.length;i<len;i++){var message=me.buildMessage(list[i].obj);msgs[i]=message;}callback.onSuccess(msgs,len==count);}catch(e){callback.onError(e);}};VCDataProvider.prototype.clearRemoteHistoryMessages=function(params,callback){var conversationType=params.conversationType;var targetId=params.targetId;var timestamp=params.timestamp;var _topic={1:true,2:true,3:true,5:true,6:true};var topic=_topic[conversationType];if(!topic){callback.onError(RongIMLib.ErrorCode.CLEAR_HIS_TYPE_ERROR);return;}if(typeof timestamp!='number'){callback.onError(RongIMLib.ErrorCode.CLEAR_HIS_TIME_ERROR);return;}this.addon.clearRemoteHistoryMessages(+conversationType,targetId,timestamp,function(){callback.onSuccess(true);},function(errorCode){if(errorCode==1){// 没有开通历史消息云存储
errorCode=RongIMLib.ErrorCode.CLEAR_HIS_ERROR;}callback.onError(errorCode);});};VCDataProvider.prototype.clearHistoryMessages=function(params,callback){var conversationType=+params.conversationType;var targetId=params.targetId;try{this.addon.clearMessages(conversationType,targetId);var isSuccess=true;callback.onSuccess(isSuccess);}catch(e){console.log(e);callback.onError(RongIMLib.ErrorCode.CLEAR_HIS_ERROR);}};VCDataProvider.prototype.getTotalUnreadCount=function(callback,conversationTypes){try{var result;this.useConsole&&console.log("getTotalUnreadCount");if(conversationTypes){result=this.addon.getTotalUnreadCount(conversationTypes);}else {result=this.addon.getTotalUnreadCount();}callback.onSuccess(result);}catch(e){callback.onError(e);}};VCDataProvider.prototype.getConversationUnreadCount=function(conversationTypes,callback){this.useConsole&&console.log("getConversationUnreadCount");this.getTotalUnreadCount(callback,conversationTypes);};VCDataProvider.prototype.getUnreadCount=function(conversationType,targetId,callback){try{this.useConsole&&console.log("getUnreadCount");var result=this.addon.getUnreadCount(conversationType,targetId);callback.onSuccess(result);}catch(e){callback.onError(e);}};VCDataProvider.prototype.clearUnreadCount=function(conversationType,targetId,callback){try{this.useConsole&&console.log("clearUnreadCount");var result=this.addon.clearUnreadCount(conversationType,targetId);callback.onSuccess(true);}catch(e){callback.onError(e);}};VCDataProvider.prototype.clearTotalUnreadCount=function(callback){this.useConsole&&console.log("clearTotalUnreadCount");};VCDataProvider.prototype.clearUnreadCountByTimestamp=function(conversationType,targetId,timestamp,callback){try{this.useConsole&&console.log("clearUnreadCountByTimestamp");var result=this.addon.clearUnreadCountByTimestamp(conversationType,targetId,timestamp);callback.onSuccess(true);}catch(e){callback.onError(e);}};VCDataProvider.prototype.setConversationToTop=function(conversationType,targetId,isTop,callback){try{this.useConsole&&console.log("setConversationToTop");this.addon.setConversationToTop(conversationType,targetId,isTop);callback.onSuccess(true);}catch(e){callback.onError(e);}};VCDataProvider.prototype.setConversationHidden=function(conversationType,targetId,isHidden){this.addon.setConversationHidden(conversationType,targetId,isHidden);};VCDataProvider.prototype.setMessageReceivedStatus=function(messageId,receivedStatus,callback){try{this.useConsole&&console.log("setMessageReceivedStatus");this.addon.setMessageReceivedStatus(messageId,receivedStatus);callback.onSuccess(true);}catch(e){callback.onError(e);}};VCDataProvider.prototype.setMessageSentStatus=function(messageId,sentStatus,callback){try{this.useConsole&&console.log("setMessageSentStatus");this.addon.setMessageSentStatus(messageId,sentStatus);callback.onSuccess(true);}catch(e){callback.onError(e);}};VCDataProvider.prototype.getFileToken=function(fileType,callback){this.useConsole&&console.log("getFileToken");this.addon.getUploadToken(fileType,function(token){callback.onSuccess({token:token});},function(errorCode){callback.onError(errorCode);});};VCDataProvider.prototype.getFileUrl=function(fileType,fileName,oriName,callback){this.useConsole&&console.log("getFileUrl");this.addon.getDownloadUrl(fileType,fileName,oriName,function(url){callback.onSuccess({downloadUrl:url});},function(errorCode){callback.onError(errorCode);});};VCDataProvider.prototype.searchConversationByContent=function(keyword,callback,conversationTypes){var converTypes=[];if(typeof conversationTypes=='undefined'){converTypes=[1,2,3,4,5,6,7];}else {converTypes=conversationTypes;}try{this.useConsole&&console.log("searchConversationByContent");var result=this.addon.searchConversationByContent(converTypes,keyword);var list=JSON.parse(result).list,convers=[],me=this;list.reverse();for(var i=0,len=list.length;i<len;i++){convers[i]=me.buildConversation(list[i].obj);}callback.onSuccess(convers);}catch(e){callback.onError(e);}};VCDataProvider.prototype.searchMessageByContent=function(conversationType,targetId,keyword,timestamp,count,total,callback){var me=this;try{this.useConsole&&console.log("searchMessageByContent");this.addon.searchMessageByContent(conversationType,targetId,keyword,timestamp,count,total,function(ret,matched){var list=ret?JSON.parse(ret).list:[],msgs=[];list.reverse();for(var i=0,len=list.length;i<len;i++){msgs[i]=me.buildMessage(list[i].obj);}callback.onSuccess(msgs,matched);});}catch(e){callback.onError(e);}};VCDataProvider.prototype.getChatRoomInfo=function(chatRoomId,count,order,callback){this.useConsole&&console.log("getChatRoomInfo");this.addon.getChatroomInfo(chatRoomId,count,order,function(ret,count){var list=ret?JSON.parse(ret).list:[],chatRoomInfo={userInfos:[],userTotalNums:count};if(list.length>0){for(var i=0,len=list.length;i<len;i++){chatRoomInfo.userInfos.push(JSON.parse(list[i].obj));}}callback.onSuccess(chatRoomInfo);},function(errcode){callback.onError(errcode);});};VCDataProvider.prototype.setChatroomHisMessageTimestamp=function(chatRoomId,timestamp){};VCDataProvider.prototype.getChatRoomHistoryMessages=function(chatRoomId,count,order,callback){};VCDataProvider.prototype.getDelaTime=function(){return this.addon.getDeltaTime();};VCDataProvider.prototype.getUserStatus=function(userId,callback){this.addon.getUserStatus(userId,function(status){var entity=RongIMLib.RongInnerTools.convertUserStatus({status:status,userId:''});callback.onSuccess(entity);},function(code){callback.onError(code);});};VCDataProvider.prototype.setUserStatus=function(status,callback){this.addon.setUserStatus(status,function(){callback.onSuccess(true);},function(code){callback.onError(code);});};VCDataProvider.prototype.subscribeUserStatus=function(userIds,callback){this.addon.subscribeUserStatus(userIds,function(){callback&&callback.onSuccess(true);},function(code){callback&&callback.onError(code);});};VCDataProvider.prototype.setUserStatusListener=function(params,callback){this.addon.setOnReceiveStatusListener(function(userId,status){var entity=RongIMLib.RongInnerTools.convertUserStatus({userId:userId,status:status});RongIMLib.RongIMClient.userStatusObserver.notify({key:userId,entity:entity});});var userIds=params.userIds||[];if(userIds.length){RongIMLib.RongIMClient._dataAccessProvider.subscribeUserStatus(userIds);}};VCDataProvider.prototype.getUnreadMentionedMessages=function(conversationType,targetId){var me=this;var mentions=JSON.parse(me.addon.getUnreadMentionedMessages(conversationType,targetId)).list;for(var i=0,len=mentions.length;i<len;i++){var temp=JSON.parse(mentions[i].obj);temp.content=JSON.parse(temp.content);mentions[i]=temp;}return mentions;};VCDataProvider.prototype.hasRemoteUnreadMessages=function(token,callback){callback.onSuccess(false);};VCDataProvider.prototype.sendRecallMessage=function(content,sendMessageCallback){var me=this;me.addon.recallMessage("RC:RcCmd",JSON.stringify(content),content.push||"",function(){content.objectName='RC:RcCmd';sendMessageCallback.onSuccess(me.buildMessage(JSON.stringify(content)));},function(errorCode){sendMessageCallback.onError(errorCode);});};VCDataProvider.prototype.updateMessage=function(message,callback){};VCDataProvider.prototype.updateMessages=function(conversationType,targetId,key,value,callback){};VCDataProvider.prototype.reconnect=function(callback){};VCDataProvider.prototype.sendReceiptResponse=function(conversationType,targetId,sendCallback){};VCDataProvider.prototype.setMessageExtra=function(messageId,value,callback){};VCDataProvider.prototype.addMemberToDiscussion=function(discussionId,userIdList,callback){};VCDataProvider.prototype.createDiscussion=function(name,userIdList,callback){};VCDataProvider.prototype.getDiscussion=function(discussionId,callback){};VCDataProvider.prototype.quitDiscussion=function(discussionId,callback){};VCDataProvider.prototype.removeMemberFromDiscussion=function(discussionId,userId,callback){};VCDataProvider.prototype.setDiscussionInviteStatus=function(discussionId,status,callback){};VCDataProvider.prototype.setDiscussionName=function(discussionId,name,callback){};VCDataProvider.prototype.setEnvironment=function(isPrivate){this.addon.setEnvironment(isPrivate);};VCDataProvider.prototype.addConversation=function(conversation,callback){};VCDataProvider.prototype.updateConversation=function(conversation){return null;};VCDataProvider.prototype.getConversationNotificationStatus=function(params,callback){var conversationType=params.conversationType;var targetId=params.targetId;var notification=RongIMLib.RongIMClient._memoryStore.notification;var key=conversationType+'_'+targetId;var status=notification[key];if(typeof status=='number'){callback.onSuccess(status);return;}this.addon.getConversationNotificationStatus(conversationType,targetId,function(status){notification[key]=status;callback.onSuccess(status);},function(error){callback.onError(error);});};VCDataProvider.prototype.setConversationNotificationStatus=function(params,callback){var conversationType=params.conversationType;var targetId=params.targetId;var status=params.status;var notification=RongIMLib.RongIMClient._memoryStore.notification;var key=conversationType+'_'+targetId;notification[key]=status;var notify=!!status;this.addon.setConversationNotificationStatus(conversationType,targetId,notify,function(){callback.onSuccess(status);},function(error){callback.onError(error);});};VCDataProvider.prototype.getCurrentConnectionStatus=function(){return this.addon.getConnectionStatus();};VCDataProvider.prototype.getAgoraDynamicKey=function(engineType,channelName,callback){var extra="";this.addon.getVoIPKey(engineType,channelName,extra,function(token){callback.onSuccess(token);},function(errorCode){callback.onError(errorCode);});};VCDataProvider.prototype.getPublicServiceProfile=function(publicServiceType,publicServiceId,callback){var profile=RongIMLib.RongIMClient._memoryStore.publicServiceMap.get(publicServiceType,publicServiceId);callback.onSuccess(profile);};VCDataProvider.prototype.setDeviceInfo=function(device){var id=device.id||'';this.addon.setDeviceId(id);};VCDataProvider.prototype.getRemotePublicServiceList=function(callback,pullMessageTime){var publicList=[];var ret=this.addon.getAccounts();var transformProto=function(ret){var result={hasFollowed:false,isGlobal:false,menu:null};if(!ret.obj){var error={error:ret};throw new Error('公众账号数据格式错误: '+JSON.stringify(error));}var obj=JSON.parse(ret.obj);var protoMap={aType:'conversationType',aId:'publicServiceId',aName:'introduction',aUri:'portraitUri',follow:'hasFollowed',isGlobal:'isGlobal'};for(var key in obj){var val=obj[key];if(key=='aExtra'){var extra=JSON.parse(val);result["hasFollowed"]=extra.follow;result["isGlobal"]=extra.isGlobal;result["menu"]=extra.menu;}var uId=protoMap[key];if(uId){result[uId]=val;}}return result;};if(ret){ret=JSON.parse(ret);var list=ret.list;for(var i=0,len=list.length;i<len;i++){var item=list[i];item=transformProto(item);publicList.push(item);}}if(publicList.length>0){RongIMLib.RongIMClient._memoryStore.publicServiceMap.publicServiceList.length=0;RongIMLib.RongIMClient._memoryStore.publicServiceMap.publicServiceList=publicList;}callback.onSuccess(RongIMLib.RongIMClient._memoryStore.publicServiceMap.publicServiceList);};VCDataProvider.prototype.buildMessage=function(result){var message=new RongIMLib.Message(),ret=JSON.parse(result);message.conversationType=ret.conversationType;message.targetId=ret.targetId;message.messageDirection=ret.direction;message.senderUserId=ret.senderUserId;if(ret.direction==RongIMLib.MessageDirection.RECEIVE){message.receivedStatus=ret.status;}else if(ret.direction==RongIMLib.MessageDirection.SEND){message.sentStatus=ret.status;}message.sentTime=ret.sentTime;message.objectName=ret.objectName;var content=ret.content?JSON.parse(ret.content):ret.content;var messageType=typeMapping[ret.objectName]||registerMessageTypeMapping[ret.objectName];if(content){content.messageName=messageType;}message.content=content;message.messageId=ret.messageId;message.messageUId=ret.messageUid;message.messageType=messageType;return message;};VCDataProvider.prototype.buildConversation=function(val){if(val===''){return null;}var conver=new RongIMLib.Conversation(),c=JSON.parse(val),lastestMsg=c.lastestMsg?this.buildMessage(c.lastestMsg):{};conver.conversationTitle=c.title;conver.conversationType=c.conversationType;conver.draft=c.draft;conver.isTop=c.isTop;conver.isHidden=c.isHidden;lastestMsg.conversationType=c.conversationType;lastestMsg.targetId=c.targetId;conver.latestMessage=lastestMsg;conver.latestMessageId=lastestMsg.messageId;conver.latestMessage.messageType=typeMapping[lastestMsg.objectName]||registerMessageTypeMapping[lastestMsg.objectName];conver.objectName=lastestMsg.objectName;conver.receivedStatus=RongIMLib.ReceivedStatus.READ;conver.sentTime=lastestMsg.sentTime;conver.senderUserId=lastestMsg.senderUserId;conver.sentStatus=lastestMsg.status;conver.targetId=c.targetId;conver.unreadMessageCount=c.unreadCount;conver.hasUnreadMention=c.m_hasUnreadMention;var mentions=this.getUnreadMentionedMessages(c.conversationType,c.targetId);if(mentions.length>0){// 取最后一条 @ 消息,原因：和 web 互相兼容
var mention=mentions.pop();conver.mentionedMsg={uid:mention.messageUid,time:mention.sentTime,mentionedInfo:mention.content.mentionedInfo,sendUserId:mention.senderUserId};}return conver;};VCDataProvider.prototype.getRTCUserInfoList=function(room,callback){};VCDataProvider.prototype.setRTCUserInfo=function(room,info,callback){};VCDataProvider.prototype.removeRTCUserInfo=function(room,info,callback){};VCDataProvider.prototype.getRTCUserList=function(room,callback){};VCDataProvider.prototype.getRTCRoomInfo=function(room,callback){};VCDataProvider.prototype.setRTCRoomInfo=function(room,data,callback){};VCDataProvider.prototype.removeRTCRoomInfo=function(room,data,callback){};VCDataProvider.prototype.joinRTCRoom=function(room,callback){};VCDataProvider.prototype.quitRTCRoom=function(room,callback){};VCDataProvider.prototype.RTCPing=function(room,callback){};VCDataProvider.prototype.setRTCUserData=function(roomId,key,value,isInner,callback,message){};VCDataProvider.prototype.getRTCUserData=function(roomId,key,isInner,callback,message){};VCDataProvider.prototype.removeRTCUserData=function(roomId,key,isInner,callback,message){};VCDataProvider.prototype.setRTCRoomData=function(roomId,key,value,isInner,callback,message){};VCDataProvider.prototype.getRTCRoomData=function(roomId,key,isInner,callback,message){};VCDataProvider.prototype.removeRTCRoomData=function(roomId,key,isInner,callback,message){};VCDataProvider.prototype.getNavi=function(){};VCDataProvider.prototype.getRTCToken=function(room,callback){};return VCDataProvider;}();RongIMLib.VCDataProvider=VCDataProvider;})(RongIMLib||(RongIMLib={}));var RongIMLib;(function(RongIMLib){var MemeoryProvider=function(){function MemeoryProvider(){this._memeoryStore={};this.prefix="rong_";}MemeoryProvider.prototype.setItem=function(composedKey,object){this._memeoryStore[composedKey]=decodeURIComponent(object);};MemeoryProvider.prototype.getItem=function(composedKey){return this._memeoryStore[composedKey];};MemeoryProvider.prototype.removeItem=function(composedKey){if(this.getItem(composedKey)){delete this._memeoryStore[composedKey];}};MemeoryProvider.prototype.getItemKey=function(regStr){var me=this,item=null,reg=new RegExp(regStr+"\\w+");for(var key in me._memeoryStore){var arr=key.match(reg);if(arr){item=key;}}return item;};MemeoryProvider.prototype.getItemKeyList=function(regStr){var prefix=this.prefix;var me=this,itemList=[],reg=new RegExp(regStr+"\\w+");for(var key in me._memeoryStore){var arr=key.match(reg);if(arr){key=key.substring(prefix.length);itemList.push(key);}}return itemList;};MemeoryProvider.prototype.clearItem=function(){var me=this;for(var key in me._memeoryStore){delete me._memeoryStore[key];}};//单位：字节
MemeoryProvider.prototype.onOutOfQuota=function(){return 4*1024;};return MemeoryProvider;}();RongIMLib.MemeoryProvider=MemeoryProvider;})(RongIMLib||(RongIMLib={}));var RongIMLib;(function(RongIMLib){var LocalStorageProvider=function(){// static _instance: LocalStorageProvider = new LocalStorageProvider();
function LocalStorageProvider(){this.prefix='rong_';this._host="";var d=new Date(),m=d.getMonth()+1,date=d.getFullYear()+'/'+(m.toString().length==1?'0'+m:m)+'/'+d.getDate(),nowDate=new Date(date).getTime();for(var key in localStorage){if(key.lastIndexOf('RECEIVED')>-1){var recObj=JSON.parse(localStorage.getItem(key));for(var key_1 in recObj){nowDate-recObj[key_1].dealtime>0&&delete recObj[key_1];}if(RongIMLib.RongUtil.isEmpty(recObj)){localStorage.removeItem(key);}else {localStorage.setItem(key,JSON.stringify(recObj));}}if(key.lastIndexOf('SENT')>-1){var sentObj=JSON.parse(localStorage.getItem(key));nowDate-sentObj.dealtime>0&&localStorage.removeItem(key);}}}LocalStorageProvider.prototype.setItem=function(composedKey,object){if(composedKey){composedKey.indexOf(this.prefix)==-1&&(composedKey=this.prefix+composedKey);localStorage.setItem(composedKey,object);}};LocalStorageProvider.prototype.getItem=function(composedKey){if(composedKey){composedKey.indexOf(this.prefix)==-1&&(composedKey=this.prefix+composedKey);return localStorage.getItem(composedKey?composedKey:"");}return "";};LocalStorageProvider.prototype.getItemKey=function(composedStr){var item="";var _key=this.prefix+composedStr;for(var key in localStorage){if(key.indexOf(_key)==0){item=key;break;}}return item;};LocalStorageProvider.prototype.getItemKeyList=function(composedStr){var itemList=[];var prefix=this.prefix;var _key=prefix+composedStr;for(var key in localStorage){if(key.indexOf(_key)==0){key=key.substring(prefix.length);itemList.push(key);}}return itemList;};LocalStorageProvider.prototype.removeItem=function(composedKey){if(composedKey){composedKey.indexOf(this.prefix)==-1&&(composedKey=this.prefix+composedKey);localStorage.removeItem(composedKey.toString());}};LocalStorageProvider.prototype.clearItem=function(){var me=this;for(var key in localStorage){if(key.indexOf(me.prefix)>-1){me.removeItem(key);}}};//单位：字节
LocalStorageProvider.prototype.onOutOfQuota=function(){return JSON.stringify(localStorage).length;};return LocalStorageProvider;}();RongIMLib.LocalStorageProvider=LocalStorageProvider;})(RongIMLib||(RongIMLib={}));var RongIMLib;(function(RongIMLib){var UserDataProvider=function(){function UserDataProvider(){this.opersistName='RongIMLib';this.keyManager='RongUserDataKeyManager';this._host="";this.prefix="rong_";this.oPersist=document.createElement("div");this.oPersist.style.display="none";this.oPersist.style.behavior="url('#default#userData')";document.body.appendChild(this.oPersist);this.oPersist.load(this.opersistName);}UserDataProvider.prototype.setItem=function(key,value){key&&key.indexOf(this.prefix)==-1&&(key=this.prefix+key);this.oPersist.setAttribute(key,value);var keyNames=this.getItem(this.keyManager);keyNames?keyNames.indexOf(key)==-1&&(keyNames+=','+key):keyNames=key;this.oPersist.setAttribute(this.prefix+this.keyManager,keyNames);this.oPersist.save(this.opersistName);};UserDataProvider.prototype.getItem=function(key){key&&key.indexOf(this.prefix)==-1&&(key=this.prefix+key);return key?this.oPersist.getAttribute(key):key;};UserDataProvider.prototype.removeItem=function(key){key&&key.indexOf(this.prefix)==-1&&(key=this.prefix+key);this.oPersist.removeAttribute(key);this.oPersist.save(this.opersistName);var keyNames=this.getItem(this.keyManager),keyNameArray=keyNames&&keyNames.split(',')||[];for(var i=0,len=keyNameArray.length;i<len;i++){if(keyNameArray[i]==key){keyNameArray.splice(i,1);}}this.oPersist.setAttribute(this.prefix+this.keyManager,keyNameArray.join(','));this.oPersist.save(this.opersistName);};UserDataProvider.prototype.getItemKey=function(composedStr){var item=null,keyNames=this.getItem(this.keyManager),keyNameArray=keyNames&&keyNames.split(',')||[];var _key=this.prefix+composedStr;if(keyNameArray.length){for(var i=0,len=keyNameArray.length;i<len;i++){if(keyNameArray[i]&&keyNameArray[i].indexOf(_key)==0){item=keyNameArray[i];break;}}}return item;};UserDataProvider.prototype.getItemKeyList=function(composedStr){var itemList=[],keyNames=this.getItem(this.keyManager),keyNameArray=keyNames&&keyNames.split(',')||[];var prefix=this.prefix;var _key=prefix+composedStr;if(keyNameArray.length){for(var i=0,len=keyNameArray.length;i<len;i++){if(keyNameArray[i]&&keyNameArray[i].indexOf(_key)==0){var keyName=keyNameArray[i];keyName=keyName.substring(prefix.length);itemList.push(keyNameArray[i]);}}}return itemList;};UserDataProvider.prototype.clearItem=function(){var keyNames=this.getItem(this.keyManager),keyNameArray=[],me=this;keyNames&&(keyNameArray=keyNames.split(','));if(keyNameArray.length){for(var i=0,len=keyNameArray.length;i<len;i++){keyNameArray[i]&&me.removeItem(keyNameArray[i]);}me.removeItem(me.keyManager);}};UserDataProvider.prototype.onOutOfQuota=function(){return 10*1024*1024;};return UserDataProvider;}();RongIMLib.UserDataProvider=UserDataProvider;})(RongIMLib||(RongIMLib={}));var RongIMLib;(function(RongIMLib){var FeatureDectector=function(){function FeatureDectector(callback){this.script=document.createElement("script");this.head=document.getElementsByTagName("head")[0];if("WebSocket"in window&&"ArrayBuffer"in window&&WebSocket.prototype.CLOSED===3&&!RongIMLib.RongIMClient._memoryStore.depend.isPolling){RongIMLib.Transportations._TransportType=RongIMLib.Socket.WEBSOCKET;if(!RongIMLib.RongIMClient.Protobuf){var url=RongIMLib.RongIMClient._memoryStore.depend.protobuf;var script=this.script;script.src=url;this.head.appendChild(script);script.onload=script.onreadystatechange=function(){var isLoaded=!this.readyState||this.readyState=='loaded'||this.readyState=='complete';if(isLoaded){// 防止 IE6、7 下偶发触发两次 loaded
script.onload=script.onreadystatechange=null;if(callback){callback();}if(!callback){var token=RongIMLib.RongIMClient._memoryStore.token;var connectCallback=RongIMLib.RongIMClient._memoryStore.callback;token&&RongIMLib.RongIMClient.connect(token,connectCallback);}}};}}else {RongIMLib.Transportations._TransportType="xhr-polling";RongIMLib.RongIMClient.Protobuf=Polling;}}return FeatureDectector;}();RongIMLib.FeatureDectector=FeatureDectector;})(RongIMLib||(RongIMLib={}));var RongIMLib;(function(RongIMLib){var FeaturePatcher=function(){function FeaturePatcher(){}FeaturePatcher.prototype.patchAll=function(){this.patchJSON();this.patchForEach();};FeaturePatcher.prototype.patchForEach=function(){if(!Array.forEach){Array.forEach=function(arr,func){for(var i=0;i<arr.length;i++){func.call(arr,arr[i],i,arr);}};}};FeaturePatcher.prototype.patchJSON=function(){if(!window["JSON"]){window["JSON"]=function(){function JSON(){}JSON.parse=function(sJSON){return eval('('+sJSON+')');};JSON.stringify=function(value){return this.str("",{"":value});};JSON.str=function(key,holder){var i,k,v,length,partial,value=holder[key],me=this;if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key);}switch(typeof value){case"string":return me.quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return "null";}partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=me.str(i,value)||"null";}v=partial.length===0?"[]":"["+partial.join(",")+"]";return v;}for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=me.str(k,value);if(v){partial.push(me.quote(k)+":"+v);}}}v=partial.length===0?"{}":"{"+partial.join(",")+"}";return v;}};JSON.quote=function(string){var me=this;me.rx_escapable.lastIndex=0;return me.rx_escapable.test(string)?'"'+string.replace(me.rx_escapable,function(a){var c=me.meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';};JSON.rx_escapable=new RegExp('[\\\"\\\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]',"g");JSON.meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"''":"\\''","\\":"\\\\"};return JSON;}();}};return FeaturePatcher;}();RongIMLib.FeaturePatcher=FeaturePatcher;})(RongIMLib||(RongIMLib={}));var RongIMLib;(function(RongIMLib){})(RongIMLib||(RongIMLib={}));var RongIMLib;(function(RongIMLib){var PublicServiceMap=function(){function PublicServiceMap(){this.publicServiceList=[];}PublicServiceMap.prototype.get=function(publicServiceType,publicServiceId){for(var i=0,len=this.publicServiceList.length;i<len;i++){if(this.publicServiceList[i].conversationType==publicServiceType&&publicServiceId==this.publicServiceList[i].publicServiceId){return this.publicServiceList[i];}}};PublicServiceMap.prototype.add=function(publicServiceProfile){var isAdd=true,me=this;for(var i=0,len=this.publicServiceList.length;i<len;i++){if(me.publicServiceList[i].conversationType==publicServiceProfile.conversationType&&publicServiceProfile.publicServiceId==me.publicServiceList[i].publicServiceId){this.publicServiceList.unshift(this.publicServiceList.splice(i,1)[0]);isAdd=false;break;}}if(isAdd){this.publicServiceList.unshift(publicServiceProfile);}};PublicServiceMap.prototype.replace=function(publicServiceProfile){var me=this;for(var i=0,len=this.publicServiceList.length;i<len;i++){if(me.publicServiceList[i].conversationType==publicServiceProfile.conversationType&&publicServiceProfile.publicServiceId==me.publicServiceList[i].publicServiceId){me.publicServiceList.splice(i,1,publicServiceProfile);break;}}};PublicServiceMap.prototype.remove=function(conversationType,publicServiceId){var me=this;for(var i=0,len=this.publicServiceList.length;i<len;i++){if(me.publicServiceList[i].conversationType==conversationType&&publicServiceId==me.publicServiceList[i].publicServiceId){this.publicServiceList.splice(i,1);break;}}};return PublicServiceMap;}();RongIMLib.PublicServiceMap=PublicServiceMap;/**
     * 会话工具类。
     */var ConversationMap=function(){function ConversationMap(){this.conversationList=[];}ConversationMap.prototype.get=function(conversavtionType,targetId){for(var i=0,len=this.conversationList.length;i<len;i++){if(this.conversationList[i].conversationType==conversavtionType&&this.conversationList[i].targetId==targetId){return this.conversationList[i];}}return null;};ConversationMap.prototype.add=function(conversation){var isAdd=true;for(var i=0,len=this.conversationList.length;i<len;i++){if(this.conversationList[i].conversationType===conversation.conversationType&&this.conversationList[i].targetId===conversation.targetId){this.conversationList.unshift(this.conversationList.splice(i,1)[0]);isAdd=false;break;}}if(isAdd){this.conversationList.unshift(conversation);}};/**
         * [replace 替换会话]
         * 会话数组存在的情况下调用add方法会是当前会话被替换且返回到第一个位置，导致用户本地一些设置失效，所以提供replace方法
         */ConversationMap.prototype.replace=function(conversation){for(var i=0,len=this.conversationList.length;i<len;i++){if(this.conversationList[i].conversationType===conversation.conversationType&&this.conversationList[i].targetId===conversation.targetId){this.conversationList.splice(i,1,conversation);break;}}};ConversationMap.prototype.remove=function(conversation){for(var i=0,len=this.conversationList.length;i<len;i++){if(this.conversationList[i].conversationType===conversation.conversationType&&this.conversationList[i].targetId===conversation.targetId){this.conversationList.splice(i,1);break;}}};return ConversationMap;}();RongIMLib.ConversationMap=ConversationMap;var CheckParam=function(){function CheckParam(){}CheckParam.getInstance=function(){if(!CheckParam._instance){CheckParam._instance=new CheckParam();}return CheckParam._instance;};CheckParam.prototype.logger=function(code,funcName,msg){RongIMLib.RongIMClient.logger({code:code,funcName:funcName,msg:msg});};CheckParam.prototype.check=function(f,position,d,c){if(RongIMLib.RongIMClient._dataAccessProvider||d){for(var g=0,e=c.length;g<e;g++){if(!new RegExp(this.getType(c[g])).test(f[g])){// throw new Error("The index of " + g + " parameter was wrong type " + this.getType(c[g]) + " [" + f[g] + "] -> position:" + position);
var msg="第"+(g+1)+"个参数错误, 错误类型："+this.getType(c[g])+" ["+f[g]+"] -> 位置:"+position;this.logger("-3",position,msg);}}}else {var msg="该参数不正确或尚未实例化RongIMClient -> 位置:"+position;this.logger("-4",position,msg);}};CheckParam.prototype.getType=function(str){var temp=Object.prototype.toString.call(str).toLowerCase();return temp.slice(8,temp.length-1);};CheckParam.prototype.checkCookieDisable=function(){document.cookie="checkCookie=1";var arr=document.cookie.match(new RegExp("(^| )checkCookie=([^;]*)(;|$)")),isDisable=false;if(!arr){isDisable=true;}document.cookie="checkCookie=1;expires=Thu, 01-Jan-1970 00:00:01 GMT";return isDisable;};return CheckParam;}();RongIMLib.CheckParam=CheckParam;var LimitableMap=function(){function LimitableMap(limit){this.map={};this.keys=[];this.limit=limit||10;}LimitableMap.prototype.set=function(key,value){this.map[key]=value;};LimitableMap.prototype.get=function(key){return this.map[key]||0;};LimitableMap.prototype.remove=function(key){delete this.map[key];};return LimitableMap;}();RongIMLib.LimitableMap=LimitableMap;var MemoryCache=function(){function MemoryCache(){this.cache={};}MemoryCache.prototype.set=function(key,value){this.cache[key]=value;};MemoryCache.prototype.get=function(key){return this.cache[key];};MemoryCache.prototype.remove=function(key){delete this.cache[key];};return MemoryCache;}();RongIMLib.MemoryCache=MemoryCache;var RongAjax=function(){function RongAjax(options){var me=this;me.xmlhttp=null;me.options=options;var hasCORS=typeof XMLHttpRequest!=="undefined"&&"withCredentials"in new XMLHttpRequest();if("undefined"!=typeof XMLHttpRequest&&hasCORS){me.xmlhttp=new XMLHttpRequest();}else if("undefined"!=typeof XDomainRequest){me.xmlhttp=new XDomainRequest();}else {me.xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}}RongAjax.prototype.send=function(callback){var me=this;me.options.url||(me.options.url="http://upload.qiniu.com/putb64/-1");me.xmlhttp.onreadystatechange=function(){if(me.xmlhttp.readyState==4){if(me.options.type){callback();}else {callback(JSON.parse(me.xmlhttp.responseText.replace(/'/g,'"')));}}};me.xmlhttp.open("POST",me.options.url,true);me.xmlhttp.withCredentials=false;if("setRequestHeader"in me.xmlhttp){if(me.options.type){me.xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=utf-8");}else {me.xmlhttp.setRequestHeader("Content-type","application/octet-stream");me.xmlhttp.setRequestHeader('Authorization',"UpToken "+me.options.token);}}me.xmlhttp.send(me.options.type?"appKey="+me.options.appKey+"&deviceId="+me.options.deviceId+"&timestamp="+me.options.timestamp+"&deviceInfo="+me.options.deviceInfo+"&privateInfo="+JSON.stringify(me.options.privateInfo):me.options.base64);};return RongAjax;}();RongIMLib.RongAjax=RongAjax;var RongUtil=function(){function RongUtil(){}RongUtil.noop=function(){};RongUtil.isEmpty=function(obj){var empty=true;for(var key in obj){empty=false;break;}return empty;};RongUtil.MD5=function(str,key,raw){return md5(str,key,raw);};RongUtil.isObject=function(obj){return Object.prototype.toString.call(obj)=='[object Object]';};RongUtil.isArray=function(array){return Object.prototype.toString.call(array)=='[object Array]';};RongUtil.isString=function(array){return Object.prototype.toString.call(array)=='[object String]';};RongUtil.isFunction=function(fun){return Object.prototype.toString.call(fun)=='[object Function]';};RongUtil.isUndefined=function(str){return Object.prototype.toString.call(str)=='[object Undefined]';};RongUtil.isEqual=function(a,b){return a===b;};RongUtil.indexOf=function(arrs,item){var index=-1;for(var i=0;i<arrs.length;i++){if(item===arrs[i]){index=i;break;}}return index;};RongUtil.stringFormat=function(tmpl,vals){for(var i=0,len=vals.length;i<len;i++){var val=vals[i],reg=new RegExp("\\{"+i+"\\}","g");tmpl=tmpl.replace(reg,val);}return tmpl;};RongUtil.tplEngine=function(temp,data,regexp){if(!(Object.prototype.toString.call(data)==="[object Array]")){data=[data];}var ret=[];for(var i=0,j=data.length;i<j;i++){ret.push(replaceAction(data[i]));}return ret.join("");function replaceAction(object){return temp.replace(regexp||/{([^}]+)}/g,function(match,name){if(match.charAt(0)=='\\'){return match.slice(1);}return object[name]!=undefined?object[name]:'{'+name+'}';});}};RongUtil.forEach=function(obj,callback){callback=callback||RongUtil.noop;var loopObj=function(){for(var key in obj){if(obj.hasOwnProperty(key)){callback(obj[key],key,obj);}}};var loopArr=function(){for(var i=0,len=obj.length;i<len;i++){callback(obj[i],i);}};if(RongUtil.isObject(obj)){loopObj();}if(RongUtil.isArray(obj)){loopArr();}};RongUtil.extend=function(source,target,callback,force){RongUtil.forEach(source,function(val,key){var hasProto=key in target;if(force&&hasProto){target[key]=val;}if(!hasProto){target[key]=val;}});return target;};RongUtil.createXHR=function(){var item={XMLHttpRequest:function(){return new XMLHttpRequest();},XDomainRequest:function(){return new XDomainRequest();},ActiveXObject:function(){return new ActiveXObject('Microsoft.XMLHTTP');}};var isXHR=typeof XMLHttpRequest=='function';var isXDR=typeof XDomainRequest=='function';var key=isXHR?'XMLHttpRequest':isXDR?'XDomainRequest':'ActiveXObject';return item[key]();};RongUtil.request=function(opts){var url=opts.url;var success=opts.success;var error=opts.error;var method=opts.method||'GET';var xhr=RongUtil.createXHR();xhr.onreadystatechange=function(){if(xhr.readyState==4){var status=xhr.status;if(status==200){success(xhr.responseText);}else {error(status,xhr.responseText);}}};xhr.open(method,url,true);xhr.send(null);return xhr;};RongUtil.formatProtoclPath=function(config){var path=config.path;var protocol=config.protocol;var tmpl=config.tmpl||'{0}{1}';var sub=config.sub;var flag='://';var index=path.indexOf(flag);var hasProtocol=index>-1;if(hasProtocol){index+=flag.length;path=path.substring(index);}if(sub){index=path.indexOf('/');var hasPath=index>-1;if(hasPath){path=path.substr(0,index);}}return RongUtil.stringFormat(tmpl,[protocol,path]);};RongUtil.supportLocalStorage=function(){var support=false;if(typeof localStorage=='object'){try{var key='RC_TMP_KEY',value='RC_TMP_VAL';localStorage.setItem(key,value);var localVal=localStorage.getItem(key);if(localVal==value){support=true;}}catch(err){console.log('localStorage is disabled.');}}return support;};/*
            //返回新引用，不破坏原始对象
            rename({n: 'martin'}, {n: 'name'}); => {name: 'martin'}
            rename([{n: 'martin'}, {a: 18}], {n: 'name', a: 'age'});
            => [{name: 'martin'}, {age: 18}]
        */RongUtil.rename=function(origin,newNames){var isObject=RongUtil.isObject(origin);if(isObject){origin=[origin];}origin=JSON.parse(JSON.stringify(origin));var updateProperty=function(val,key,obj){delete obj[key];key=newNames[key];obj[key]=val;};RongUtil.forEach(origin,function(item){RongUtil.forEach(item,function(val,key,obj){var isRename=key in newNames;(isRename?updateProperty:RongUtil.noop)(val,key,obj);});});return isObject?origin[0]:origin;};RongUtil.some=function(arrs,callback){var has=false;for(var i=0,len=arrs.length;i<len;i++){if(callback(arrs[i])){has=true;break;}}return has;};RongUtil.keys=function(obj){var props=[];for(var key in obj){props.push(key);}return props;};RongUtil.isNumber=function(num){return Object.prototype.toString.call(num)=='[object Number]';};RongUtil.getTimestamp=function(){var date=new Date();return date.getTime();};return RongUtil;}();RongIMLib.RongUtil=RongUtil;/*
        var observer = new RongObserver();
        observer.watch({
            key: 'key',
            func: function(entity){
                
            }
        });

    */var RongObserver=function(){function RongObserver(){this.watchers={};}RongObserver.prototype.genUId=function(key){var time=new Date().getTime();return [key,time].join('_');};RongObserver.prototype.watch=function(params){var me=this;var key=params.key;var multiple=params.multiple;key=RongUtil.isArray(key)?key:[key];var func=params.func;RongUtil.forEach(key,function(k){k=multiple?me.genUId(k):k;me.watchers[k]=func;});};RongObserver.prototype.notify=function(params){var me=this;var key=params.key;var entity=params.entity;for(var k in me.watchers){var isNotify=k.indexOf(key)==0;if(isNotify){me.watchers[k](entity);}}};RongObserver.prototype.remove=function(){};return RongObserver;}();RongIMLib.RongObserver=RongObserver;var Timer=function(){function Timer(config){this.timeout=0;this.timers=[];this.timeout=config.timeout;}Timer.prototype.resume=function(callback){var timer=setTimeout(callback,this.timeout);this.timers.push(timer);};Timer.prototype.pause=function(){RongUtil.forEach(this.timers,function(timer){clearTimeout(timer);});};return Timer;}();RongIMLib.Timer=Timer;var IndexTools=function(){function IndexTools(config){this.items=[];this.index=0;this.onwheel=function(){};this.items=config.items;this.onwheel=config.onwheel;}IndexTools.prototype.get=function(){var context=this;var items=context.items;var index=context.index;var isWheel=index>=items.length;if(isWheel){context.onwheel();}return isWheel?0:index;};IndexTools.prototype.add=function(){this.index+=1;};return IndexTools;}();RongIMLib.IndexTools=IndexTools;var InnerUtil=function(){function InnerUtil(){}InnerUtil.getUId=function(token){return md5(token).slice(8,16);};return InnerUtil;}();RongIMLib.InnerUtil=InnerUtil;})(RongIMLib||(RongIMLib={}));/*
    说明: 请勿修改 header.js 和 footer.js
    用途: 自动拼接暴露方式
    命令: grunt release 中 concat
*/return RongIMLib;});});

const { RongIMLib, RongIMClient } = window;
const RIMLIB = window.RongIMLib || {};
// 基于board，使用融云同步的画板
class RongYunClient extends EventEmitter {
    constructor(options) {
        super();
        this.opts = {
            appKey: '',
            isAutoConnect: false,
            isAutoReconnect: true,
            defaultToken: '',
            defaultGroupId: '',
            interval: 200,
            reconnectConf: {
                auto: true,
                // 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
                url: 'http://cdn.ronghub.com/RongIMLib-2.2.6.min.js',
                // 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
                rate: [100, 1000, 3000, 6000, 10000],
            },
            ...options,
        };
        if (!this.opts.appKey) {
            throw new Error('必须 配置 appkey');
        }
        this.appKey = this.opts.appKey;
        this.init();
        // 注册画板消息类型 一定要放在 初始化之后
        this.registerBoardMsgType();
        if (this.opts.isAutoConnect && this.opts.defaultToken) {
            this.connect(this.opts.defaultToken);
        }
        // if (this.opts.isAutoReconnect) {
        //     this.reconnect();
        // }
        this.messageQuene = [];
        this.msgInterval = null;
        this.connectionState = 0;
        this.defaultGroupId = this.opts.defaultGroupId;
    }
    get imType() {
        return RongYunClient.__TYPE;
    }
    init() {
        RongIMLib.RongIMClient.init(this.appKey);
        // eslint-disable-next-line no-underscore-dangle
        this._bindEvent();
    }
    _bindEvent() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;
        // 连接状态监听器
        RongIMClient.setConnectionStatusListener({
            onChanged: status => {
                // status 标识当前连接状态
                switch (status) {
                    case RongIMLib.ConnectionStatus.CONNECTED:
                        this.connectionState = 1;
                        that.emit('n:connected', status);
                        break;
                    case RongIMLib.ConnectionStatus.CONNECTING:
                        this.connectionState = 2;
                        that.emit('n:connecting', status);
                        break;
                    case RongIMLib.ConnectionStatus.DISCONNECTED:
                        this.connectionState = 0;
                        that.emit('n:disconnected', status);
                        break;
                    case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                        this.connectionState = 4;
                        that.emit('n:kickedOfflineByOtherClient', status);
                        break;
                    case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                        this.connectionState = 5;
                        that.emit('n:domainIncorrect', status);
                        break;
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                        this.connectionState = 6;
                        that.emit('n:networkUnavailable', status);
                        if (that.opts.isAutoReconnect) {
                            that.reconnect();
                        }
                        break;
                    default:
                        that.emit('n:unknowStatus', status);
                }
            },
        });
        // 消息监听器
        // TODO: 添加对自定义类型消息的支持
        RongIMClient.setOnReceiveMessageListener({
            // 接收到的消息
            onReceived(message) {
                that.emit('m:all', message);
                // 判断消息类型
                switch (message.messageType) {
                    case RongIMClient.MessageType.TextMessage:
                        that.emit('m:text', message);
                        break;
                    case RongIMClient.MessageType.VoiceMessage:
                        that.emit('m:voice', message);
                        break;
                    case RongIMClient.MessageType.ImageMessage:
                        that.emit('m:image', message);
                        break;
                    case RongIMClient.MessageType.LocationMessage:
                        that.emit('m:location', message);
                        break;
                    case RongIMClient.MessageType.RichContentMessage:
                        that.emit('m:rich', message);
                        break;
                    case RongIMClient.MessageType.InformationNotificationMessage:
                        that.emit('m:n:info', message);
                        break;
                    case RongIMClient.MessageType.ContactNotificationMessage:
                        that.emit('m:n:contact', message);
                        break;
                    case RongIMClient.MessageType.ProfileNotificationMessage:
                        that.emit('m:n:profile', message);
                        break;
                    case RongIMClient.MessageType.CommandNotificationMessage:
                        that.emit('m:n:command', message);
                        break;
                    case RongIMClient.MessageType.CommandMessage:
                        that.emit('m:command', message);
                        break;
                    case RongIMClient.MessageType.UnknownMessage:
                        that.emit('m:unknown', message);
                        break;
                    case RongIMClient.MessageType[RongYunClient.messageType.MSB_MSG]:
                        that.emit('m:msb', message);
                        break;
                    default:
                        that.emit('m:nocatch', message);
                }
            },
        });
    }
    _connectError(errorCode) {
        let info = '';
        switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
                info = '超时';
                break;
            case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
                info = '不可接受的协议版本';
                break;
            case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
                info = 'appkey不正确';
                break;
            case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
                info = '服务器不可用';
                break;
            default:
                info = '未知错误';
        }
        return info;
    }
    joinChatRoom(opts) {
        const opt = {
            success: () => { },
            error: () => { },
            count: 50,
            ...opts,
        };
        const chatRoomId = opt.roomId || this.defaultGroupId; // 聊天室 Id
        RongIMClient.getInstance().joinChatRoom(chatRoomId, opt.count, {
            onSuccess(...args) {
                opt.success(...args);
            },
            onError(...args) {
                // 加入聊天室失败
                opt.error(...args);
            },
        });
    }
    leaveChatRoom(opts) {
        const opt = {
            success: () => { },
            error: () => { },
            ...opts,
        };
        const chatRoomId = opt.roomId || this.defaultGroupId; // 聊天室 Id
        RongIMClient.getInstance().quitChatRoom(chatRoomId, {
            onSuccess(...args) {
                // 退出聊天室成功
                opt.success(...args);
            },
            onError(...args) {
                // 退出聊天室失败
                opt.error(...args);
            },
        });
    }
    getChatRoomInfo(opts) {
        const opt = {
            success: () => { },
            error: () => { },
            count: 20,
            order: RongIMLib.GetChatRoomType.REVERSE,
            ...opts,
        };
        const chatRoomId = opt.roomId || this.defaultGroupId; // 聊天室 Id
        // const count = 10; // 获取聊天室人数 （范围 0-20 ）
        // const order = RongIMLib.GetChatRoomType.REVERSE; // 排序方式
        RongIMClient.getInstance().getChatRoomInfo(chatRoomId, opt.count, opt.order, {
            onSuccess(...args) {
                // chatRoom => 聊天室信息
                // chatRoom.userInfos => 返回聊天室成员
                // chatRoom.userTotalNums => 当前聊天室总人数
                opt.success(...args);
            },
            onError(...args) {
                // 获取聊天室信息失败
                opt.error(...args);
            },
        });
    }
    connect(token) {
        if (!token) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;
        RongIMClient.connect(token, {
            onSuccess(userId) {
                that.emit('c:success', {
                    userId,
                    msg: '',
                });
            },
            onTokenIncorrect() {
                that.emit('c:failed', {
                    msg: 'token incorrect',
                });
            },
            onError(errorCode) {
                that.emit('c:error', {
                    code: errorCode,
                    // eslint-disable-next-line no-underscore-dangle
                    msg: that._connectError(errorCode),
                });
            },
        });
    }
    reconnect() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;
        RongIMClient.reconnect({
            onSuccess(userId) {
                this.connectionState = 1;
                that.emit('rc:success', {
                    userId,
                });
            },
            onTokenIncorrect() {
                this.connectionState = 7;
                that.emit('rc:failed', {
                    msg: 'token incorrect',
                });
            },
            onError(errorCode) {
                this.connectionState = 0;
                that.emit('c:error', {
                    code: errorCode,
                    // eslint-disable-next-line no-underscore-dangle
                    msg: that._connectError(errorCode),
                });
            },
        }, this.opts.reconnectConf);
    }
    // TODO: messageName、objectName、prototypes 支持自定义
    registerBoardMsgType() {
        const messageName = RongYunClient.messageType.MSB_MSG; // 消息名称
        const objectName = `s:msb`; // 消息内置名称，请按照此格式命名
        const isCounted = false; // 消息计数
        const isPersited = false; // 消息保存
        const mesasgeTag = new RongIMLib.MessageTag(isCounted, isPersited); // 消息是否保存是否计数，true true 计数且保存，false false 不计数不保存
        const prototypes = ['content']; // 消息类中的属性名
        RongIMClient.registerMessageType(messageName, objectName, mesasgeTag, prototypes);
    }
    _doSend() {
        if (this.msgInterval) {
            return;
        }
        this.msgInterval = setInterval(() => {
            if (this.messageQuene.length < 1) {
                if (this.msgInterval) {
                    clearInterval(this.msgInterval);
                    this.msgInterval = null;
                }
                return;
            }
            const msg = this.messageQuene.shift();
            RongIMClient.getInstance().sendMessage(msg.conversationType, msg.targetId, msg.msg, msg.callback);
        }, this.opts.interval);
    }
    _sendMessage(msgInfo) {
        this.messageQuene.push({
            ...msgInfo,
        });
        // eslint-disable-next-line no-underscore-dangle
        this._doSend();
    }
    // 发送群组消息
    // 该方法已经废弃，请谨慎使用
    sendGroup(options) {
        const opts = {
            groupId: '',
            content: {},
            ...options,
        };
        const conversationType = RongIMLib.ConversationType.GROUP; // 群聊
        const gid = opts.groupId || this.opts.defaultGroupId;
        if (!gid) {
            return Promise.reject(new Error('必须传入参数 groupId'));
        }
        // const targetId = 'g1'; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id
        const msg = new RongIMClient.RegisterMessage[RongYunClient.messageType.MSB_MSG]({
            content: opts.content,
        });
        return new Promise((pResolve, reject) => {
            RongIMClient.getInstance().sendMessage(conversationType, gid, msg, {
                onSuccess(message) {
                    pResolve(message);
                },
                onError(errorCode) {
                    reject(errorCode);
                },
            });
        });
    }
    sendChat(options) {
        const opts = {
            groupId: '',
            content: {},
            ...options,
        };
        const conversationType = RongIMLib.ConversationType.CHATROOM; // 群聊
        const gid = opts.groupId || this.opts.defaultGroupId;
        if (!gid) {
            return Promise.reject(new Error('必须传入参数 groupId'));
        }
        // const targetId = 'g1'; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id
        const msg = new RongIMClient.RegisterMessage[RongYunClient.messageType.MSB_MSG]({
            content: opts.content,
        });
        return new Promise((pResolve, reject) => {
            RongIMClient.getInstance().sendMessage(conversationType, gid, msg, {
                onSuccess(message) {
                    pResolve(message);
                },
                onError(errorCode) {
                    reject(errorCode);
                },
            });
        });
    }
    // 发送消息
    send(options) {
        const opts = {
            targetId: '',
            conversationType: RongIMLib.ConversationType.PRIVATE,
            msg: {},
            callback: {
                onSuccess: () => { },
                onError: () => { },
            },
            ...options,
        };
        // eslint-disable-next-line no-underscore-dangle
        this._sendMessage({
            ...opts,
        });
    }
    sendGroupMsg(options) {
        const opts = {
            groupId: '',
            content: {},
            callback: {
                onSuccess: () => { },
                onError: () => { },
            },
            ...options,
        };
        const conversationType = RongIMLib.ConversationType.GROUP; // 群聊
        const gid = opts.groupId || this.opts.defaultGroupId;
        if (!gid) {
            throw new Error('必须传入参数 groupId');
        }
        // const targetId = 'g1'; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id
        const msg = new RongIMClient.RegisterMessage[RongYunClient.messageType.MSB_MSG]({
            content: opts.content,
        });
        this.send({
            targetId: gid,
            msg,
            conversationType,
            callback: opts.callback,
        });
    }
    // TODO: callback 需要外部自己维护
    sendChatMsg(options) {
        const opts = {
            groupId: '',
            content: {},
            callback: {
                onSuccess: () => { },
                onError: () => { },
            },
            ...options,
        };
        const conversationType = RongIMLib.ConversationType.CHATROOM; // 聊天室
        const gid = opts.groupId || this.opts.defaultGroupId;
        if (!gid) {
            throw new Error('必须传入参数 groupId');
        }
        // const targetId = 'g1'; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id
        const msg = new RongIMClient.RegisterMessage[RongYunClient.messageType.MSB_MSG]({
            content: opts.content,
        });
        this.send({
            targetId: gid,
            msg,
            conversationType,
            callback: opts.callback,
        });
    }
    // 销毁IM
    destory() {
        // 断开连接
        // 移除事件绑定
        this.removeAllListeners();
        if (this.connectionState === 1) {
            // this.im.disconnect();
            RongIMClient.getInstance().logout();
        }
    }
}
RongYunClient.messageType = {
    ...RIMLIB.MessageType,
    MSB_MSG: 'ArtSimpleMessage',
};
RongYunClient.ConversationType = RIMLIB.ConversationType;
RongYunClient.__TYPE = IM_TYPE$1.RONGYUN;

var CONNECT_STATE;
(function (CONNECT_STATE) {
    CONNECT_STATE[CONNECT_STATE["DEFAULT"] = 0] = "DEFAULT";
    CONNECT_STATE[CONNECT_STATE["CONNECTED"] = 1] = "CONNECTED";
    CONNECT_STATE[CONNECT_STATE["DISCONNECTED"] = 2] = "DISCONNECTED";
    CONNECT_STATE[CONNECT_STATE["ERROR"] = -1] = "ERROR";
})(CONNECT_STATE || (CONNECT_STATE = {}));
var CONNECT_STATE$1 = CONNECT_STATE;

class BaseIM extends EventEmitter {
    constructor(...args) {
        super(...args);
        this.connectState = CONNECT_STATE$1.DEFAULT;
    }
    /**
     *
     * 初始化当前实例
     *
     * @memberof BaseIM
     */
    init() {
        console.log('not extends BaseIM method init: ');
    }
    /**
     *
     * 加入聊天室
     *
     * @param { Object } opts
     * opts: {
     *   success: () => {}, // 成功后的回调
     *   error: () => {}, // 失败后的回调
     * }
     *
     * @memberof BaseIM
     */
    joinChatRoom(opts) {
        console.log('not extends BaseIM method joinChatRoom: ', opts);
    }
    /**
     *
     * 退出聊天室聊天室
     *
     * @param { Object } opts
     * opts: {
     *   success: () => {}, // 成功后的回调
     *   error: () => {}, // 失败后的回调
     * }
     *
     * @memberof BaseIM
     */
    // eslint-disable-next-line no-unused-vars
    leaveChatRoom(opts) {
        console.log('not extends BaseIM method leaveChatRoom: ', opts);
    }
    /**
     *
     * 链接到IM
     *
     * @param { String } token 声网是userId, 融云是用户的token
     *
     *
     * @memberof BaseIM
     */
    // eslint-disable-next-line no-unused-vars
    connect(userId, token) {
        console.log('not extends BaseIM method connect: ', userId, token);
    }
    /**
     *
     * 重新链接到IM
     *
     *
     *
     * @memberof BaseIM
     */
    reconnect() { }
    /**
     * 直接发送群组消息
     *
     * @param {Object} options
     *
     * options: {
     *   groupId: '', // 要发送的群id
     *   content: {}, // 需要发送的内容 (json)
     * }
     *
     * @returns Promise
     * @memberof BaseIM
     */
    // eslint-disable-next-line no-unused-vars
    sendGroup(options) {
        console.log('not extends BaseIM method sendGroup: ', options);
        return Promise.resolve();
    }
    /**
     * 直接发送聊天室消息
     *
     * @param {Object} options
     *
     * options: {
     *   groupId: '', // 要发送的群id
     *   content: {}, // 需要发送的内容 (json)
     * }
     *
     * @returns Promise
     * @memberof BaseIM
     */
    // eslint-disable-next-line no-unused-vars
    sendChat(options) {
        console.log('not extends BaseIM method sendChat: ', options);
        return Promise.resolve();
    }
    /**
     * 使用队列，发送消息
     *
     * @param {Object} options
     *
     * options: {
     *   targetId: '', // 发送的目标
     *   conversationType: // 发送的类型:群组、单聊、聊天室
     *   msg: {}, // 发送的消息类型
     *   callback: {
     *     onSuccess: () => {}, // 发送成功的回调
     *     onError: () => {}, // 发送失败的回调
     *   },
     * }
     *
     * @memberof BaseIM
     */
    // eslint-disable-next-line no-unused-vars
    send(options) {
        console.log('not extends BaseIM method send: ', options);
    }
    /**
     * 使用队列，发送群组消息
     *
     * @param {Object} options
     *
     * options: {
     *   groupId: '',
     *   content: {},
     *   callback: {
     *     onSuccess: () => {}, // 发送成功的回调
     *     onError: () => {}, // 发送失败的回调
     *   },
     * }
     *
     * @memberof BaseIM
     */
    // eslint-disable-next-line no-unused-vars
    sendGroupMsg(options) {
        console.log('not extends BaseIM method sendGroupMsg: ', options);
    }
    /**
     * 使用队列，发送聊天室消息
     *
     * @param {Object} options
     *
     * options: {
     *   groupId: '',
     *   content: {},
     *   callback: {
     *     onSuccess: () => {}, // 发送成功的回调
     *     onError: () => {}, // 发送失败的回调
     *   },
     * }
     *
     * @memberof BaseIM
     */
    // eslint-disable-next-line no-unused-vars
    sendChatMsg(options) {
        console.log('not extends BaseIM method sendChatMsg: ', options);
    }
    /**
     * 销毁im
     *
     *
     * @memberof BaseIM
     */
    destory() {
        console.log('not extends BaseIM method destory: ');
    }
}

class RTMClient extends BaseIM {
    constructor(options) {
        super();
        this.opts = {
            appKey: '',
            appId: '',
            isAutoConnect: false,
            isAutoReconnect: true,
            defaultToken: '',
            defaultGroupId: '',
            interval: 17,
            ...options,
        };
        if (!this.opts.appId) {
            throw new Error('rtm: 必须 配置 appId');
        }
        this.appId = this.opts.appId;
        this.channels = {};
        this.client = null;
        this.messageQuene = [];
        this.msgInterval = null;
        this.prevSendTime = null;
        this.connectStatus = 0;
        this.defaultToken = this.opts.defaultToken;
        this.defaultGroupId = this.opts.defaultGroupId;
        this.init();
    }
    get imType() {
        return RTMClient.__TYPE;
    }
    init() {
        try {
            this.client = AgoraRTM.createInstance(this.appId);
            this.subscribeClientEvents();
        }
        catch (err) {
            // 创建实例失败，整个系统不可用，需要直接抛出异常
            throw err;
        }
    }
    // subscribe client events
    subscribeClientEvents() {
        this.client.on('ConnectionStateChanged', (newState, reason) => {
            switch (newState) {
                case 'ABORTED':
                    this.connectStatus = 1;
                    // 如果用户被提出，可以考虑重新登录
                    this.emit('n:aborted', reason);
                    break;
                case 'CONNECTED':
                    this.connectStatus = 2;
                    this.emit('n:connected', reason);
                    break;
                case 'CONNECTING':
                    this.connectStatus = 3;
                    this.emit('n:connecting', reason);
                    break;
                case 'DISCONNECTED':
                    // 断开为初始化状态
                    this.connectStatus = 0;
                    this.emit('n:disconnected', reason);
                    break;
                case 'RECONNECTING':
                    this.connectStatus = 5;
                    this.emit('rc:reconnecting', reason);
                    break;
                default:
                    this.connectStatus = 6;
                    this.emit('n:unknowStatus', reason);
                    break;
            }
            if (reason === 'REMOTE_LOGIN') {
                this.emit('n:kickedOfflineByOtherClient', reason);
            }
        });
        // 接收到的消息
        this.client.on('MessageFromPeer', (...args) => {
            console.log('MessageFromPeer', ...args);
            this.emit('m:text', ...args);
            this.emit('m:msb', ...args);
        });
    }
    // subscribe channel events
    subscribeChannelEvents(chatRoomId) {
        if (!this.channels[chatRoomId]) {
            return;
        }
        this.channels[chatRoomId].channel.on('ChannelMessage', ({ text }) => {
            try {
                const content = {
                    content: JSON.parse(text),
                };
                this.emit('m:all', { targetId: chatRoomId, content });
                this.emit('m:msb', { targetId: chatRoomId, content });
                // this.emit('m:text', { chatRoomId, content: data })
            }
            catch (err) {
                this.emit('m:error', {
                    code: -2,
                    error: err,
                });
            }
        });
        // 当频道成员超过 512 时，该回调失效。
        this.channels[chatRoomId].channel.on('MemberJoined', uid => {
            // console.log(res);
            this.emit('m:joined', uid);
        });
        // 当频道成员超过 512 时，该回调失效。
        this.channels[chatRoomId].channel.on('MemberLeft', uid => {
            this.emit('m:left', uid);
        });
    }
    connect(userId, token) {
        return this.login(userId, token || this.defaultToken);
    }
    reconnect() {
        // RTM自动重连
    }
    _connectError(errorCode) {
        let info = '';
        switch (errorCode) {
            // case AgoraRTM.ErrorStatusCode.LoginError.LOGIN_ERR_ALREADY_LOGIN:
            case 8:
                info = '用户已登录，或正在登录 Agora RTM 系统';
                break;
            // case AgoraRTM.ErrorStatusCode.LoginError.LOGIN_ERR_INVALID_APP_ID:
            case 4:
                info = '无效的 App ID';
                break;
            // case AgoraRTM.ErrorStatusCode.LoginError.LOGIN_ERR_INVALID_TOKEN:
            case 5:
                info = '无效的 Token';
                break;
            // case AgoraRTM.ErrorStatusCode.LoginError.LOGIN_ERR_NOT_AUTHORIZED:
            case 7:
                info = '预留错误码';
                break;
            // case AgoraRTM.ErrorStatusCode.LoginError.LOGIN_ERR_TIMEOUT:
            case 9:
                info = '登录超时。目前的超时设置为 6 秒';
                break;
            // case AgoraRTM.ErrorStatusCode.LoginError.LOGIN_ERR_TOKEN_EXPIRED:
            case 6:
                info = 'Token 已过期，登录被拒绝';
                break;
            // case AgoraRTM.ErrorStatusCode.LoginError.LOGIN_ERR_TOO_OFTEN:
            case 10:
                info = '登录过于频繁。超过 2 次／秒的上限';
                break;
            default:
                info = '未知错误';
        }
        return info;
    }
    login(userId, token = null) {
        this.userId = userId.toString();
        return this.client
            .login({ uid: this.userId, token })
            .then(() => {
            this.emit('c:success', {
                userId,
                msg: '登录成功',
            });
        })
            .catch(err => {
            this.emit('c:error', {
                code: err,
                msg: this._connectError(err),
            });
        });
    }
    logout() {
        return this.client
            .logout()
            .then(() => {
            this.connectStatus = 0;
            this.channels = {};
        })
            .catch(err => {
            this.emit('d:error', {
                code: err,
                msg: '退出失败',
            });
        });
    }
    _createChannel(chatRoomId) {
        if (!chatRoomId) {
            return null;
        }
        if (this.channels[chatRoomId]) {
            return this.channels[chatRoomId];
        }
        const channel = this.client.createChannel(chatRoomId);
        this.channels[chatRoomId] = {
            channel,
            status: 0,
        };
        return this.channels[chatRoomId];
    }
    // 最多加入 20 个频道
    joinChatRoom(opts) {
        const opt = {
            success: () => { },
            error: () => { },
            ...opts,
        };
        const chatRoomId = opt.roomId || this.defaultGroupId;
        if (!chatRoomId) {
            throw new Error(`rtm: roomid 不能为空`);
        }
        const faChatRoomId = `${chatRoomId}`;
        // 已经创建过了该频道，直接加入
        const channelInfo = this._createChannel(faChatRoomId);
        if (!channelInfo || channelInfo.status === 1) {
            return null;
        }
        this.subscribeChannelEvents(faChatRoomId);
        return channelInfo.channel
            .join()
            .then((...args) => {
            channelInfo.status = 1;
            opt.success(...args);
        })
            .catch((...args) => {
            opt.error(...args);
        });
    }
    leaveChatRoom(opts) {
        const opt = {
            success: () => { },
            error: () => { },
            count: 50,
            ...opts,
        };
        const chatRoomId = opt.roomId || this.defaultGroupId; // 聊天室 Id
        // 没有初始化完成则不执行退出
        if (!this.channels[chatRoomId] ||
            (this.channels[chatRoomId] && this.channels[chatRoomId].status === 0)) {
            return;
        }
        this.channels[chatRoomId].channel
            .leave()
            .then((...args) => {
            this.channels[chatRoomId].status = 0;
            opt.success(...args);
        })
            .catch((...args) => {
            opt.error(...args);
        });
    }
    sendSingleMsg(options) {
        const opts = {
            userId: '',
            content: {},
            callback: {
                onSuccess: () => { },
                onError: () => { },
            },
            sendOption: {
                enableOfflineMessaging: false,
            },
            ...options,
        };
        this._sendMessage({
            type: 'chat',
            targetId: opts.userId,
            options: opts.sendOption,
            content: opts.content,
            callback: opts.callback,
        });
    }
    sendChatMsg(options) {
        const opts = {
            groupId: this.defaultGroupId,
            content: {},
            callback: {
                onSuccess: () => { },
                onError: () => { },
            },
            ...options,
        };
        this._sendMessage({
            type: 'chat',
            targetId: opts.groupId,
            content: opts.content,
            callback: opts.callback,
        });
    }
    _sendMessage(msgInfo) {
        this.messageQuene.push({
            ...msgInfo,
        });
        this._doSend();
    }
    _doSend() {
        if (this.msgInterval) {
            return;
        }
        this.msgInterval = setInterval(() => {
            // 如果没有消息
            if (this.messageQuene.length < 1) {
                if (this.msgInterval) {
                    clearInterval(this.msgInterval);
                    this.msgInterval = null;
                }
                return;
            }
            // 如果用户退出，则清空消息
            if (this.connectStatus !== 2) {
                if (this.msgInterval) {
                    clearInterval(this.msgInterval);
                    this.msgInterval = null;
                }
                this.messageQuene = [];
                return;
            }
            const currentSendTime = new Date().getTime();
            if (this.prevSendTime) {
                console.log('im 发送时间间隔:', currentSendTime - this.prevSendTime);
                this.prevSendTime = currentSendTime;
            }
            else {
                this.prevSendTime = currentSendTime;
            }
            console.log('im 发送时间：', currentSendTime);
            try {
                const msg = this.messageQuene.shift();
                const text = JSON.stringify(msg.content);
                if (msg.type === 'chat') {
                    this.channels[msg.targetId].channel
                        .sendMessage({
                        text,
                    })
                        .then((...args) => {
                        if (msg.callback && msg.callback.onSuccess) {
                            msg.callback.onSuccess(...args);
                        }
                    })
                        .catch((...args) => {
                        if (msg.callback && msg.callback.onError) {
                            msg.callback.onError(...args);
                        }
                    });
                }
                else {
                    // TODO: 有bug
                    this.client
                        .sendMessageToPeer({
                        text,
                    })
                        .then((...args) => {
                        if (msg.callback && msg.callback.onSuccess) {
                            msg.callback.onSuccess(...args);
                        }
                    })
                        .catch((...args) => {
                        if (msg.callback && msg.callback.onError) {
                            msg.callback.onError(...args);
                        }
                    });
                }
            }
            catch (err) {
                console.log('rtm: 发送消息失败', err);
            }
        }, this.opts.interval);
    }
    async queryPeersOnlineStatus(memberId) {
        console.log('queryPeersOnlineStatus', memberId);
        return this.client.queryPeersOnlineStatus([memberId]);
    }
    // 销毁IM
    destory() {
        this.removeAllListeners();
        return this.logout();
    }
}
RTMClient.__TYPE = IM_TYPE$1;

// TODO: 后续优化
const createIM = (type, ...args) => {
    const option = args[0];
    if (type === IM_TYPE$1.RONGYUN) {
        return new RongYunClient(option);
    }
    if (type === IM_TYPE$1.RTM) {
        return new RTMClient(option);
    }
    throw new Error('im 类型错误');
};
var index = {
    IMTYPE: IM_TYPE$1,
    RongYunIM: RongYunClient,
    RTM: RTMClient,
};

export default index;
export { IM_TYPE$1 as IM_TYPE, RTMClient as RTM, RongYunClient as RongYunIM, createIM };
//# sourceMappingURL=index.js.map
