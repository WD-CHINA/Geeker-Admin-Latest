! function (t, e) {
  "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" ==
    typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports
    .DocConverter = e() : t.DocConverter = e()
}(self, (function () {
  return (() => {
    var t = {
        302: t => {
          self,
          t.exports = function () {
            "use strict";
            var t = {
                d: function (e, r) {
                  for (var o in r) t.o(r, o) && !t.o(e, o) && Object.defineProperty(e,
                    o, {
                      enumerable: !0,
                      get: r[o]
                    })
                },
                o: function (t, e) {
                  return Object.prototype.hasOwnProperty.call(t, e)
                }
              },
              e = {};
            t.d(e, {
              default: function () {
                return b
              }
            });
            var r = function t(e) {
              for (var r in function (t, e) {
                    if (!(t instanceof e)) throw new TypeError(
                      "Cannot call a class as a function")
                  }(this, t), this.directUploadAddr = "https://wanproxy-web.127.net",
                  this.retryCount = 4, this.trunkSize = 4194304, this
                  .trunkUploadTimeout = 5e4, this.getOffsetTimeout = 1e4, this.version =
                  "1.0", this.enableCache = !0, this.logger = console, this.onError =
                  function (t) {}, this.onProgress = function (t) {}, this
                  .onUploadProgress = function (t) {}, this.onComplete = function (
                  t) {}, e) this[r] = e[r]
            };

            function o(t, e) {
              var r = "undefined" != typeof Symbol && t[Symbol.iterator] || t[
                "@@iterator"];
              if (!r) {
                if (Array.isArray(t) || (r = function (t, e) {
                    if (t) {
                      if ("string" == typeof t) return n(t, e);
                      var r = Object.prototype.toString.call(t).slice(8, -1);
                      return "Object" === r && t.constructor && (r = t.constructor
                        .name), "Map" === r || "Set" === r ? Array.from(t) :
                        "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/
                        .test(r) ? n(t, e) : void 0
                    }
                  }(t)) || e && t && "number" == typeof t.length) {
                  r && (t = r);
                  var o = 0,
                    s = function () {};
                  return {
                    s,
                    n: function () {
                      return o >= t.length ? {
                        done: !0
                      } : {
                        done: !1,
                        value: t[o++]
                      }
                    },
                    e: function (t) {
                      throw t
                    },
                    f: s
                  }
                }
                throw new TypeError(
                  "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                  )
              }
              var a, i = !0,
                c = !1;
              return {
                s: function () {
                  r = r.call(t)
                },
                n: function () {
                  var t = r.next();
                  return i = t.done, t
                },
                e: function (t) {
                  c = !0, a = t
                },
                f: function () {
                  try {
                    i || null == r.return || r.return()
                  } finally {
                    if (c) throw a
                  }
                }
              }
            }

            function n(t, e) {
              (null == e || e > t.length) && (e = t.length);
              for (var r = 0, o = new Array(e); r < e; r++) o[r] = t[r];
              return o
            }
            var s = window.localStorage;
            window.localStorage && "function" == typeof window.localStorage.getItem &&
              "function" == typeof window.localStorage.setItem && "function" ==
              typeof window.localStorage.removeItem || (s = {
                privateObj: {},
                setItem: function (t, e) {
                  s.privateObj[t] = e
                },
                getItem: function (t) {
                  return s.privateObj[t]
                },
                removeItem: function (t) {
                  delete s.privateObj[t]
                },
                getKeys: function () {
                  return Object.keys(s.privateObj)
                }
              });
            var a = {
                getFileKey: function (t) {
                  var e = t.size.toString(),
                    r = t.lastModified.toString();
                  return "_NosUploader_" + t.name + e.slice(e.length - 5) + r.slice(r
                    .length - 5)
                },
                getFileInfo: function (t) {
                  var e = s.getItem(t);
                  if (!e) return null;
                  try {
                    return JSON.parse(e)
                  } catch (t) {
                    return null
                  }
                },
                initFile: function (t, e, r) {
                  a.clearExpiredInfo();
                  var o = this.getFileKey(e),
                    n = {
                      ctx: void 0 !== t.ctx ? t.ctx : "",
                      bucket: t.bucketName,
                      obj: t.objectName,
                      token: t.token,
                      modifyAt: Date.now(),
                      end: !1
                    };
                  return t.payload && (n.payload = t.payload), r && s.setItem(o, JSON
                    .stringify(n)), o
                },
                setUploadContext: function (t, e, r) {
                  var o = this.getFileInfo(t);
                  o && (o.ctx = e, r && s.setItem(t, JSON.stringify(o)))
                },
                setComplete: function (t, e) {
                  var r = this.getFileInfo(t);
                  r && (r.modifyAt = Date.now(), r.end = !0, e && s.setItem(t, JSON
                    .stringify(r)))
                },
                getUploadContext: function (t) {
                  var e = this.getFileInfo(t);
                  return e ? e.ctx : ""
                },
                removeFileInfo: function (t) {
                  0 === t.indexOf("_NosUploader_") && s.removeItem(t)
                },
                clearExpiredInfo: function () {
                  var t, e = "function" == typeof s.getKeys ? s.getKeys() : Object.keys(
                      s),
                    r = Date.now(),
                    n = [],
                    i = o(e);
                  try {
                    for (i.s(); !(t = i.n()).done;) {
                      var c = t.value;
                      if (0 === c.indexOf("_NosUploader_")) {
                        var l = a.getFileInfo(c);
                        null === l || r - l.modifyAt > b.expireTime ? s.removeItem(c) :
                          n.push({
                            fileInfo: l,
                            key: c
                          })
                      }
                    }
                  } catch (t) {
                    i.e(t)
                  } finally {
                    i.f()
                  }
                  if (n.length > b.maxFileCache) {
                    var d, u = o(n.sort((function (t, e) {
                      return e.fileInfo.modifyAt - t.fileInfo.modifyAt
                    })).slice(b.maxFileCache));
                    try {
                      for (u.s(); !(d = u.n()).done;) {
                        var h = d.value;
                        0 === h.key.indexOf("_NosUploader_") && s.removeItem(h.key)
                      }
                    } catch (t) {
                      u.e(t)
                    } finally {
                      u.f()
                    }
                  }
                }
              },
              i = a;

            function c(t) {
              return (c = "function" == typeof Symbol && "symbol" == typeof Symbol
                .iterator ? function (t) {
                  return typeof t
                } : function (t) {
                  return t && "function" == typeof Symbol && t.constructor === Symbol &&
                    t !== Symbol.prototype ? "symbol" : typeof t
                })(t)
            }

            function l(t, e) {
              return !e || "object" !== c(e) && "function" != typeof e ? function (t) {
                if (void 0 === t) throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called");
                return t
              }(t) : e
            }

            function d(t) {
              var e = "function" == typeof Map ? new Map : void 0;
              return (d = function (t) {
                if (null === t || (r = t, -1 === Function.toString.call(r).indexOf(
                    "[native code]"))) return t;
                var r;
                if ("function" != typeof t) throw new TypeError(
                  "Super expression must either be null or a function");
                if (void 0 !== e) {
                  if (e.has(t)) return e.get(t);
                  e.set(t, o)
                }

                function o() {
                  return u(t, arguments, p(this).constructor)
                }
                return o.prototype = Object.create(t.prototype, {
                  constructor: {
                    value: o,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                  }
                }), f(o, t)
              })(t)
            }

            function u(t, e, r) {
              return (u = h() ? Reflect.construct : function (t, e, r) {
                var o = [null];
                o.push.apply(o, e);
                var n = new(Function.bind.apply(t, o));
                return r && f(n, r.prototype), n
              }).apply(null, arguments)
            }

            function h() {
              if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
              if (Reflect.construct.sham) return !1;
              if ("function" == typeof Proxy) return !0;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (
                  function () {}))), !0
              } catch (t) {
                return !1
              }
            }

            function f(t, e) {
              return (f = Object.setPrototypeOf || function (t, e) {
                return t.__proto__ = e, t
              })(t, e)
            }

            function p(t) {
              return (p = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t)
              })(t)
            }
            var g = function (t) {
                ! function (t, e) {
                  if ("function" != typeof e && null !== e) throw new TypeError(
                    "Super expression must either be null or a function");
                  t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                      value: t,
                      writable: !0,
                      configurable: !0
                    }
                  }), e && f(t, e)
                }(n, t);
                var e, r, o = (e = n, r = h(), function () {
                  var t, o = p(e);
                  if (r) {
                    var n = p(this).constructor;
                    t = Reflect.construct(o, arguments, n)
                  } else t = o.apply(this, arguments);
                  return l(this, t)
                });

                function n(t, e) {
                  var r;
                  return function (t, e) {
                      if (!(t instanceof e)) throw new TypeError(
                        "Cannot call a class as a function")
                    }(this, n), (r = o.call(this, "NosUploadError:" + t)).errCode = e, r
                    .errMsg = t, r
                }
                return n
              }(d(Error)),
              m = function t(e, r, o) {
                if ("uploading" === e.uploadState) {
                  var n = e.config,
                    s = e.param,
                    a = i.getUploadContext(e.fileKey);
                  if (!a) return o(0);
                  var c = new XMLHttpRequest,
                    l = n.directUploadAddr + "/".concat(s.bucketName) + "/".concat(
                      encodeURIComponent(s.objectName)) + "?uploadContext" + "&context="
                    .concat(a) + "&version=".concat(n.version);
                  c.onreadystatechange = function () {
                      var s;
                      if ("abort" !== e.uploadState && 4 === c.readyState) {
                        var a;
                        try {
                          a = JSON.parse(c.responseText)
                        } catch (t) {
                          a = {
                            errMsg: "JsonParseError in getOffset",
                            errCode: 500
                          }
                        }
                        200 === c.status ? a.errCode ? e.config.onError(new g(a.errMsg, a
                            .errCode)) : o(a.offset) : c.status.toString().match(/^5/) ?
                          t(e, r - 1, o) : r > 0 ? ("function" == typeof (null === (s = n
                              .logger) || void 0 === s ? void 0 : s.error) && n.logger
                            .error("getOffset(".concat(l,
                              ") error. retry after 3 seconds. ").concat((new Date)
                              .toTimeString())), setTimeout((function () {
                              t(e, r - 1, o)
                            }), 3500)) : (i.removeFileInfo(e.fileKey), c.status ? n
                            .onError(new g("getOffset(".concat(l, ") error: ").concat(c
                              .status, " ").concat(c.statusText))) : n.onError(new g(
                              "getOffset(".concat(l, ") error. no Error Code"))))
                      }
                    }, c.open("get", l), c.setRequestHeader("x-nos-token", s.token), c
                    .timeout = n.getOffsetTimeout, c.send()
                }
              },
              y = function t(e, r, o, n) {
                if ("uploading" === e.uploadState) {
                  var s = e.param,
                    a = e.config,
                    c = File.prototype.slice,
                    l = void 0 !== s.ctx ? s.ctx : "",
                    d = r + a.trunkSize > e.file.size,
                    u = d ? e.file.size : r + a.trunkSize,
                    h = new XMLHttpRequest,
                    f = a.directUploadAddr + "/".concat(s.bucketName) + "/".concat(
                      encodeURIComponent(s.objectName));
                  if (h.upload.onprogress = function (t) {
                      if ("abort" !== e.uploadState) {
                        var o = 0;
                        t.lengthComputable ? (o = (r + t.loaded) / e.file.size, a
                          .onProgress(o), a.onUploadProgress({
                            loaded: t.loaded,
                            total: e.file.size,
                            percentage: o,
                            percentageText: (100 * o).toFixed(2) + "%"
                          })) : a.onError(new g(
                          "browser does not support query upload progress"))
                      }
                    }, h.onreadystatechange = function () {
                      var s, c;
                      if ("abort" !== e.uploadState && 4 === h.readyState) {
                        var l;
                        try {
                          l = JSON.parse(h.responseText)
                        } catch (t) {
                          "function" == typeof (null === (s = a.logger) || void 0 === s ?
                            void 0 : s.error) && a.logger.error(
                            "JsonParseError in uploadTrunk", t), l = {
                            errMsg: "JsonParseError in uploadTrunk"
                          }
                        }
                        200 === h.status ? (e.setContext(l.context), d ? (n(), e
                            .setComplete()) : t(e, l.offset, a.retryCount, n)) : h.status
                          .toString().match(/^5/) ? o > 0 ? t(e, r, o - 1, n) : (i
                            .removeFileInfo(e.fileKey), a.onError(new g(l.errMsg, l
                              .errCode))) : o > 0 ? ("function" == typeof (null === (c = a
                              .logger) || void 0 === c ? void 0 : c.error) && a.logger
                            .error("uploadTrunk(".concat(f,
                              ") error. retry after 3 seconds. ").concat((new Date)
                              .toTimeString())), setTimeout((function () {
                              t(e, r, o - 1, n)
                            }), 3500)) : (i.removeFileInfo(e.fileKey), h.status ? a
                            .onError(new g("uploadTrunk(".concat(f, ") error: ").concat(h
                              .status, " ").concat(h.statusText))) : a.onError(new g(
                              "uploadTrunk(".concat(f,
                                ") error. no Error Code. Please check your network"))))
                      }
                    }, h.open("post", f + "?offset=".concat(r) + "&complete=".concat(d) +
                      "&context=".concat(l) + "&version=".concat(a.version)), h
                    .setRequestHeader("x-nos-token", s.token), e.file.type && h
                    .setRequestHeader("content-type", e.file.type), h.timeout = a
                    .trunkUploadTimeout, "undefined" != typeof FileReader) {
                    var p = new FileReader;
                    p.addEventListener("load", (function (t) {
                      var e;
                      (null === (e = null == t ? void 0 : t.target) || void 0 ===
                        e ? void 0 : e.result) ? h.send(t.target.result): a.onError(
                        new g("Read ArrayBuffer failed"))
                    })), p.addEventListener("error", (function (t) {
                      var e = t.target.error;
                      a.onError(new g("Read ArrayBuffer error. ".concat(e
                      .toString()), e.code))
                    })), p.readAsArrayBuffer(c.call(e.file, r, u))
                  } else h.send(c.call(e.file, r, u))
                }
              };
            var T = function () {
                function t(e, r, o) {
                  ! function (t, e) {
                    if (!(t instanceof e)) throw new TypeError(
                      "Cannot call a class as a function")
                  }(this, t), this.uploadState = "paused", this.config = o, this.file = e,
                    this.param = r, this.fileKey = i.initFile(r, e, this.config
                      .enableCache), this.resume()
                }
                var e;
                return (e = [{
                  key: "resume",
                  value: function () {
                    var t = this;
                    if ("uploading" !== this.uploadState) {
                      this.setUploadState("uploading");
                      var e = this.config;
                      m(this, e.retryCount, (function (r) {
                        y(t, r, e.retryCount, (function () {
                          t.setUploadState("ended"), "function" ==
                            typeof e.onComplete && e.onComplete(t
                              .param)
                        }))
                      }))
                    }
                  }
                }, {
                  key: "pause",
                  value: function () {
                    this.setUploadState("paused")
                  }
                }, {
                  key: "abort",
                  value: function () {
                    this.setUploadState("abort"), i.removeFileInfo(this.fileKey),
                      this.config.onError(new g("Upload Aborted", 10499))
                  }
                }, {
                  key: "setUploadState",
                  value: function (t) {
                    t !== this.uploadState && (this.uploadState = t)
                  }
                }, {
                  key: "setContext",
                  value: function (t) {
                    i.setUploadContext(this.fileKey, t, this.config.enableCache),
                      this.param.ctx = t
                  }
                }, {
                  key: "setComplete",
                  value: function () {
                    i.setComplete(this.fileKey, this.config.enableCache), this
                      .setUploadState("ended")
                  }
                }]) && function (t, e) {
                  for (var r = 0; r < e.length; r++) {
                    var o = e[r];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in
                      o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                  }
                }(t.prototype, e), t
              }(),
              v = {
                maxFileCache: 6,
                expireTime: 864e5,
                getFileUploadInformation: function (t) {
                  var e = i.getFileKey(t),
                    r = i.getFileInfo(e);
                  return null === r ? null : Date.now() - r.modifyAt > v.expireTime ? (i
                    .removeFileInfo(e), null) : {
                    uploadInfo: Object.assign({
                      bucketName: r.bucket,
                      objectName: r.obj,
                      token: r.token,
                      ctx: r.ctx
                    }, r.payload ? {
                      payload: r.payload
                    } : {}),
                    complete: r.end
                  }
                },
                setMaxFileCache: function (t) {
                  v.maxFileCache = t
                },
                setExpireTime: function (t) {
                  v.expireTime = t
                },
                printCaches: function () {
                  for (var t = 0, e = Object.keys(localStorage); t < e.length; t++) {
                    var r = e[t],
                      o = i.getFileInfo(r);
                    o && console.log(o, "modifiedAt", new Date(o.modifyAt)
                    .toTimeString())
                  }
                },
                createConfig: function (t) {
                  return new r(t)
                },
                createTask: function (t, e, r) {
                  return new T(t, e, r)
                }
              },
              b = v;
            return e.default
          }()
        }
      },
      e = {};

    function r(o) {
      var n = e[o];
      if (void 0 !== n) return n.exports;
      var s = e[o] = {
        exports: {}
      };
      return t[o](s, s.exports, r), s.exports
    }
    r.n = t => {
      var e = t && t.__esModule ? () => t.default : () => t;
      return r.d(e, {
        a: e
      }), e
    }, r.d = (t, e) => {
      for (var o in e) r.o(e, o) && !r.o(t, o) && Object.defineProperty(t, o, {
        enumerable: !0,
        get: e[o]
      })
    }, r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e);
    var o = {};
    return (() => {
      "use strict";
      r.d(o, {
        default: () => u
      });
      class t extends Error {
        constructor(t, e) {
          super("DocConverterError:" + t), this.errCode = e, this.errMsg = t
        }
      }
      const e = (t, e, r) => {
        let o = "";
        try {
          o = JSON.stringify({
            result: t,
            param: e,
            url: r
          }, null, 2)
        } finally {
          o || (o = `request url: ${r} return code: ${t.code}`)
        }
        return o
      };

      function n(t) {
        let {
          resultUrl: e,
          pageCount: r,
          width: o,
          height: n,
          backupResultUrls: s,
          thumbnailDto: a
        } = t.data, i = e.endsWith("/") ? e + "index.json" : e + "/index.json";
        return s = Array.isArray(s) ? s.map((t => t.endsWith("/") ? t + "index.json" :
          t + "/index.json")) : [], o || (o = 1080), n || (n = 1080), {
          width: o,
          height: n,
          url: i,
          pageCount: r,
          backupResultUrls: s,
          trans: "h5",
          thumbnailDto: a
        }
      }

      function s(t, e) {
        let {
          pageCount: r,
          format: o,
          resultUrl: n,
          width: s,
          height: a,
          backupResultUrls: i
        } = t.data;
        if (s || (s = 1080), a || (a = 1080), "array" === e) {
          let t = [];
          for (let e = 0; e < r; e++) {
            let r = `${n}${e+1}.${o}`;
            t.push({
              url: r,
              width: s,
              height: a
            })
          }
          return t
        } {
          let t = n.endsWith("/") ? `${n}{index}.${o}` : `${n}/{index}.${o}`;
          return i = Array.isArray(i) ? i.map((t => t.endsWith("/") ?
            `${t}{index}.${o}` : `${t}/{index}.${o}`)) : [], {
            template: t,
            width: s,
            height: a,
            pageCount: r,
            offset: 1,
            backupResultUrls: i,
            trans: "pic"
          }
        }
      }

      function a(t, e) {
        if (!t || !t.ret) return null;
        const r = "0" !== t.ret.width && 0 !== t.ret.width;
        let o, n;
        return e && t.ret.uhdMp4Url && t.ret.duration > 0 ? (o = t.ret.uhdMp4Url, n = t
            .ret.origUrl) : e && t.ret.shdMp4Url && t.ret.duration > 0 ? (o = t.ret
            .shdMp4Url, n = t.ret.origUrl) : e && t.ret.hdMp4Url && t.ret.duration > 0 ?
          (o = t.ret.hdMp4Url, n = t.ret.origUrl) : e && t.ret.sdMp4Url && t.ret
          .duration > 0 ? (o = t.ret.sdMp4Url, n = t.ret.origUrl) : !e && t.ret
          .origUrl && t.ret.duration > 0 && (o = t.ret.origUrl, n = t.ret.origUrl), o &&
          n ? {
            url: o,
            origin: n,
            video: r,
            duration: t.ret.duration,
            trans: e
          } : null
      }
      const i = function r(o, n, s, a) {
        if (o.aborted) return;
        const {
          config: i
        } = o, c = new XMLHttpRequest, l = i.transServiceUrl + n.url;
        c.onreadystatechange = function () {
            if (o.aborted) return;
            if (4 !== c.readyState) return;
            let d;
            try {
              d = JSON.parse(c.responseText)
            } catch (t) {
              d = {
                errMsg: "返回json无法解析",
                errCode: 500
              }
            }
            if (200 === c.status)
              if (200 !== d.code) o.abort(), i.onError(new t(e(d, n.param, l)));
              else if (d[n.retBody])
              if (40 === d[n.retBody].status) a.onComplete(d);
              else if (30 === d[n.retBody].status) "function" == typeof a
              .onProgress && a.onProgress(d), setTimeout((() => {
                r(o, n, s, a)
              }), i.checkTransProgressInterval);
            else {
              o.abort();
              const e = (null == d ? void 0 : d.requestId) || "not found";
              let r = "{}";
              try {
                r = JSON.stringify(n.param, null, 2)
              } catch (t) {}
              i.onError(new t(
                `request fail ${JSON.stringify({url:l,requestId:e,statusText:c.statusText,param:r},null,2)}`
                ))
            } else o.abort(), i.onError(new t(e(d, n.param, l)));
            else c.status.toString().match(/^5/) ? setTimeout((() => {
                r(o, n, s - 1, a)
              }), i.checkTransProgressInterval) : "429" === c.status.toString() ?
              setTimeout((() => {
                r(o, n, s - 1, a)
              }), i.checkTransProgressInterval + 3e3 * Math.random()) : s > 0 ? (
                console.error(
                  `queryTransProgress(${l}) error. retry after 3 seconds. ${(new Date).toTimeString()}`
                  ), setTimeout((() => {
                  r(o, n, s - 1, a)
                }), 3500)) : (o.abort(), 0 !== c.status ? i.onError(new t(
                  `queryTransProgress(${l}) error: ${c.status} ${c.statusText}`)) : i
                .onError(new t(
                  `queryTransProgress(${l}) error. please check your network`)))
          }, c.open("post", l), c.setRequestHeader("content-type",
          "application/json"), c.setRequestHeader("appkey", o.authInfo.appkey), c
          .setRequestHeader("curtime", o.authInfo.curtime.toString()), c
          .setRequestHeader("nonce", o.authInfo.nonce), c.setRequestHeader("checksum",
            o.authInfo.checksum), c.timeout = 1e4, c.send(JSON.stringify(n.param))
      };
      var c = r(302),
        l = r.n(c);
      const d = function r(o, n, s, a) {
          if (o.aborted) return;
          const {
            config: i
          } = o, c = new XMLHttpRequest, l = i.transServiceUrl + n.url;
          c.onreadystatechange = function () {
              if (o.aborted) return;
              if (4 !== c.readyState) return;
              let d;
              try {
                d = JSON.parse(c.responseText)
              } catch (t) {
                d = {
                  errMsg: "返回json无法解析",
                  errCode: 500
                }
              }
              200 === c.status ? 200 !== d.code ? i.onError(new t(e(d, n.param, l))) :
                a(d) : c.status.toString().match(/^5/) ? r(o, n, s - 1, a) : s > 0 ? (
                  console.error(
                    `request(${l}) error. retry after 3 seconds ${(new Date).toTimeString()}`
                    ), setTimeout((() => {
                    r(o, n, s - 1, a)
                  }), 3500)) : 0 !== c.status ? i.onError(new t(
                  `request(${l}) error: ${c.status} ${c.statusText}`)) : i.onError(
                  new t(`request(${l}) error. please check your network`))
            }, c.open("post", l), c.setRequestHeader("content-type",
            "application/json"), c.setRequestHeader("appkey", o.authInfo.appkey), c
            .setRequestHeader("curtime", o.authInfo.curtime.toString()), c
            .setRequestHeader("nonce", o.authInfo.nonce), c.setRequestHeader("checksum",
              o.authInfo.checksum), c.timeout = 1e4, c.send(JSON.stringify(n.param))
        },
        u = {
          createConfig: e => new class {
            constructor(e) {
              if (this.transServiceUrl = "https://vcloud.163.com/app/wboard", this
                .staticDocType = "template", this.onBeginUpload = () => {}, this
                .onUploadProgress = () => {}, this.onUploadComplete = () => {}, this
                .onTransBegin = () => {}, this.onTransProgress = () => {}, this
                .onTransComplete = () => {}, this.onError = () => {}, this
                .checkTransProgressInterval = 4e3, this.transcodeFormat = "jpg", e
                .directUploadAddr && (this.directUploadAddr = e.directUploadAddr), e
                .transcodeFormat && (this.transcodeFormat = e.transcodeFormat), e
                .onError && (this.onError = e.onError), e.onBeginUpload && (this
                  .onBeginUpload = e.onBeginUpload), e.onUploadProgress && (this
                  .onUploadProgress = e.onUploadProgress), e.onUploadComplete && (
                  this.onUploadComplete = e.onUploadComplete), e.onTransBegin && (
                  this.onTransBegin = e.onTransBegin), e.onTransProgress && (this
                  .onTransProgress = e.onTransProgress), e.onTransComplete && (this
                  .onTransComplete = e.onTransComplete), e
                .checkTransProgressInterval && (this.checkTransProgressInterval = e
                  .checkTransProgressInterval), e.staticDocType && (this
                  .staticDocType = e.staticDocType), e.transServiceUrl && (this
                  .transServiceUrl = e.transServiceUrl), e.thumbnailWidth && (
                  "number" != typeof e.thumbnailWidth || e.thumbnailWidth < 200 || e
                  .thumbnailWidth > 500 ? console.error(
                    "thumbnailWidth必须为数字，且必须为[200, 500]之间的数值") : this
                  .thumbnailWidth = e.thumbnailWidth), this.transServiceUrl
                .endsWith("/") && (this.transServiceUrl = this.transServiceUrl
                  .slice(0, this.transServiceUrl.length - 1)), !["jpg", "png", "h5"]
                .includes(this.transcodeFormat)) throw new t(
                "transcodeFormat只能是h5, jpg或者png")
            }
          }(e),
          createMediaConfig: t => new class {
            constructor(t) {
              this.trans = !1, this.transServiceUrl =
                "https://vcloud.163.com/app/vod/", this.onBeginUpload = () => {},
                this.onError = t => {}, this.onUploadProgress = t => {}, this
                .onUploadComplete = () => {}, this.onTransProgress = t => {}, this
                .onTransComplete = () => {}, this.onTransBegin = t => {}, this
                .checkTransProgressInterval = 4e3, this.presetId = t.presetId, t
                .directUploadAddr && (this.directUploadAddr = t.directUploadAddr), t
                .onError && (this.onError = t.onError), t.onBeginUpload && (this
                  .onBeginUpload = t.onBeginUpload), t.onUploadProgress && (this
                  .onUploadProgress = t.onUploadProgress), t.onUploadComplete && (
                  this.onUploadComplete = t.onUploadComplete), t.onTransBegin && (
                  this.onTransBegin = t.onTransBegin), t.onTransProgress && (this
                  .onTransProgress = t.onTransProgress), t.onTransComplete && (this
                  .onTransComplete = t.onTransComplete), t
                .checkTransProgressInterval && (this.checkTransProgressInterval = t
                  .checkTransProgressInterval), t.transServiceUrl && (this
                  .transServiceUrl = t.transServiceUrl), t.trans && (this.trans = t
                  .trans), this.transServiceUrl.endsWith("/") && (this
                  .transServiceUrl = this.transServiceUrl.slice(0, this
                    .transServiceUrl.length - 1))
            }
          }(t),
          createTask: (e, r, o) => new class {
            constructor(e, r, o) {
              if (this.abort = () => {
                  this.uploadTask && this.uploadTask.abort(), clearTimeout(this
                    .transProgressTimer), this.aborted = !0
                }, this.startUploadPhase = t => {
                  var e;
                  d(this, {
                    param: {
                      name: this.file.name,
                      docFormat: (e = this.file.name, e.slice(e.lastIndexOf(
                        ".") + 1))
                    },
                    url: "/upload/init"
                  }, 3, (e => {
                    this.config.onBeginUpload && this.config.onBeginUpload({
                      docId: e.data.docId
                    }), this.uploadTask = l().createTask(this.file, {
                      bucketName: e.data.bucket,
                      objectName: e.data.objectKey,
                      token: e.data.token,
                      ctx: "",
                      payload: {
                        docId: e.data.docId
                      }
                    }, t)
                  }))
                }, this.startTransUrlPhase = () => {
                  const t = {
                    docUrl: this.docInfo.url,
                    docFormat: this.docInfo.format,
                    transcodeFormat: this.config.transcodeFormat,
                    dpi: 300
                  };
                  "h5" === t.transcodeFormat && "number" == typeof this.config
                    .thumbnailWidth && this.config.thumbnailWidth > 0 && (t
                      .thumbnail = !0, t.thumbnailWidth = this.config.thumbnailWidth
                      ), d(this, {
                      param: t,
                      url: "/transcode/commitUrl"
                    }, 3, (t => {
                      this.config.onUploadComplete && this.config
                        .onUploadComplete({
                          docUrl: t.data.docUrl
                        }), this.startTransAt = Date.now(), this
                        .sendProgressFeedback(), this.config.onTransBegin({
                          taskId: t.data.taskId
                        }), i(this, {
                          retBody: "data",
                          url: "/transcode/query",
                          param: {
                            taskId: t.data.taskId
                          }
                        }, 5, {
                          onComplete: t => {
                            clearTimeout(this.transProgressTimer), this
                              .config.onTransProgress(1), "h5" === this
                              .config.transcodeFormat ? this.config
                              .onTransComplete(n(t)) : this.config
                              .onTransComplete(s(t, this.config
                                .staticDocType))
                          }
                        })
                    }))
                }, this.startTransPhase = e => {
                  if (!e.payload.docId) return this.config.onError(new t(
                    "找不到docId"));
                  const r = {
                    docId: e.payload.docId,
                    transcodeFormat: this.config.transcodeFormat,
                    dpi: 300
                  };
                  "h5" === r.transcodeFormat && "number" == typeof this.config
                    .thumbnailWidth && this.config.thumbnailWidth > 0 && (r
                      .thumbnail = !0, r.thumbnailWidth = this.config.thumbnailWidth
                      ), d(this, {
                      url: "/transcode/commit",
                      param: r
                    }, 3, (t => {
                      this.startTransAt = Date.now(), this
                      .sendProgressFeedback(), this.config.onTransBegin({
                        taskId: t.data.taskId
                      }), i(this, {
                        retBody: "data",
                        url: "/transcode/query",
                        param: {
                          taskId: t.data.taskId
                        }
                      }, 5, {
                        onComplete: t => {
                          clearTimeout(this.transProgressTimer), this
                            .config.onTransProgress(1), "h5" === this
                            .config.transcodeFormat ? this.config
                            .onTransComplete(n(t)) : this.config
                            .onTransComplete(s(t, this.config
                              .staticDocType))
                        }
                      })
                    }))
                }, this.sendProgressFeedback = () => {
                  clearTimeout(this.transProgressTimer), this.transProgressTimer =
                    setTimeout((() => {
                      this.startTransAt || (this.startTransAt = Date.now());
                      const t = Math.floor((Date.now() - this.startTransAt) /
                        1e3);
                      let e = 1 - Math.pow(.97716, t);
                      e = e > .99 ? .9999 : e, this.config.onTransProgress(e),
                        this.sendProgressFeedback()
                    }), 1e3)
                }, this.config = o, this.authInfo = r, e instanceof File) {
                this.file = e;
                const t = {
                  onProgress: o.onUploadProgress,
                  onError: o.onError
                };
                o.directUploadAddr && (t.directUploadAddr = o.directUploadAddr), t
                  .onComplete = t => {
                    o.onUploadComplete ? d(this, {
                      param: {
                        docId: t.payload.docId
                      },
                      url: "/doc/get"
                    }, 3, (e => {
                      e.data && e.data.docUrl ? o.onUploadComplete({
                        docUrl: e.data.docUrl
                      }) : o.onUploadComplete({
                        docUrl: null
                      }), this.startTransPhase(t)
                    })) : this.startTransPhase(t)
                  };
                const r = l().createConfig(t);
                this.startUploadPhase(r)
              } else this.docInfo = e, this.startTransUrlPhase()
            }
          }(e, r, o),
          createMediaTask: (e, r, o) => new class {
            constructor(e, r, o) {
              if (this.abort = () => {
                  this.uploadTask && this.uploadTask.abort(), clearTimeout(this
                    .transProgressTimer), this.aborted = !0
                }, this.startUploadPhase = t => {
                  d(this, {
                    param: {
                      originFileName: this.file.name
                    },
                    url: "/upload/init"
                  }, 3, (e => {
                    this.config.onBeginUpload && this.config.onBeginUpload(),
                      this.uploadTask = l().createTask(this.file, {
                        bucketName: e.ret.bucket,
                        objectName: e.ret.object,
                        token: e.ret.xNosToken,
                        ctx: ""
                      }, t)
                  }))
                }, this.startTransPhase = e => {
                  if (this.config.trans) {
                    if (!this.config.presetId) return this.config.onError(new t(
                      "未提供转码模板"));
                    d(this, {
                      param: {
                        vids: [e],
                        presetId: this.config.presetId
                      },
                      url: "/transcode/resetmulti"
                    }, 3, (r => {
                      r.ret && 1 === r.ret.successCount ? (this.startTransAt =
                        Date.now(), this.sendProgressFeedback(), this.config
                        .onTransBegin({
                          vid: e
                        }), i(this, {
                          url: "/video/get",
                          retBody: "ret",
                          param: {
                            vid: e
                          }
                        }, 5, {
                          onComplete: r => {
                            clearTimeout(this.transProgressTimer), this
                              .config.onTransProgress(1);
                            const o = a(r, this.config.trans);
                            o ? this.config.onTransComplete(o) : this
                              .config.onError(new t(
                                `未能够获得转码视频，或者媒体文件长度为0. vid: ${e}`))
                          }
                        })) : this.config.onError(new t(
                        `/transcode/resetmulti failed.vid: ${e}` + r
                        .toString()))
                    }))
                  } else this.sendProgressFeedback(), this.config.onTransBegin({
                    vid: e
                  }), i(this, {
                    url: "/video/get",
                    retBody: "ret",
                    param: {
                      vid: e
                    }
                  }, 5, {
                    onComplete: r => {
                      clearTimeout(this.transProgressTimer), this.config
                        .onTransProgress(1);
                      const o = a(r, this.config.trans);
                      o ? this.config.onTransComplete(o) : this.config
                        .onError(new t(`未能够获得转码视频，或者媒体文件长度为0. vid: ${e}`))
                    }
                  })
                }, this.sendProgressFeedback = () => {
                  clearTimeout(this.transProgressTimer), this.transProgressTimer =
                    setTimeout((() => {
                      this.startTransAt || (this.startTransAt = Date.now());
                      const t = Math.floor((Date.now() - this.startTransAt) /
                        1e3);
                      let e = 1 - Math.pow(.97716, t);
                      e = e > .99 ? .9999 : e, this.config.onTransProgress(e),
                        this.sendProgressFeedback()
                    }), 1e3)
                }, this.config = o, this.authInfo = r, this.file = e, this.config
                .trans && !this.config.presetId) return this.config.onError(new t(
                "未提供转码模板"));
              const n = {
                onProgress: o.onUploadProgress,
                onError: o.onError
              };
              o.directUploadAddr && (n.directUploadAddr = o.directUploadAddr), n
                .onComplete = e => {
                  o.onUploadComplete({
                    bucket: e.bucketName,
                    object: e.objectName
                  }), d(this, {
                    param: {
                      objectNames: [e.objectName]
                    },
                    url: "/video/query"
                  }, 3, (r => {
                    r.ret && 1 === r.ret.count ? this.startTransPhase(r.ret
                      .list[0].vid) : o.onError && o.onError(new t(
                      `上传后无法获取vid. objectName为: ${e.objectName}`))
                  }))
                };
              const s = l().createConfig(n);
              this.startUploadPhase(s)
            }
          }(e, r, o),
          createQueryTask: (t, e, r) => new class {
            constructor(t, e, r) {
              this.complete = !1, this.abort = () => {
                clearTimeout(this.transProgressTimer), this.aborted = !0
              }, this.sendProgressFeedback = () => {
                clearTimeout(this.transProgressTimer), this.complete || (this
                  .transProgressTimer = setTimeout((() => {
                    this.startTransAt || (this.startTransAt = Date.now());
                    const t = Math.floor((Date.now() - this.startTransAt) /
                      1e3);
                    let e = 1 - Math.pow(.97716, t);
                    e = e > .99 ? .9999 : e, this.config.onTransProgress(e),
                      this.sendProgressFeedback()
                  }), 1e3))
              };
              const {
                taskId: o
              } = t;
              this.config = r, this.authInfo = e, this.taskId = o.toString(), this
                .config.onTransProgress(0), i(this, {
                  retBody: "data",
                  url: "/transcode/query",
                  param: {
                    taskId: this.taskId
                  }
                }, 5, {
                  onComplete: t => {
                    clearTimeout(this.transProgressTimer), this.complete = !0,
                      this.config.onTransProgress(1), "h5" === this.config
                      .transcodeFormat ? this.config.onTransComplete(n(t)) :
                      this.config.onTransComplete(s(t, this.config
                        .staticDocType))
                  },
                  onProgress: t => {
                    this.startTransAt || (this.startTransAt = Number(t.data
                      .createTime), this.sendProgressFeedback())
                  }
                })
            }
          }(t, e, r),
          createMediaQueryTask: (e, r, o) => new class {
            constructor(e, r, o) {
              this.complete = !1, this.abort = () => {
                clearTimeout(this.transProgressTimer), this.aborted = !0
              }, this.sendProgressFeedback = () => {
                clearTimeout(this.transProgressTimer), this.complete || (this
                  .transProgressTimer = setTimeout((() => {
                    this.startTransAt || (this.startTransAt = Date.now());
                    const t = Math.floor((Date.now() - this.startTransAt) /
                      1e3);
                    let e = 1 - Math.pow(.97716, t);
                    e = e > .99 ? .9999 : e, this.config.onTransProgress(e),
                      this.sendProgressFeedback()
                  }), 1e3))
              };
              const {
                vid: n
              } = e;
              this.config = o, this.authInfo = r, this.vid = n, this.config
                .onTransProgress(0), i(this, {
                  url: "/video/get",
                  retBody: "ret",
                  param: {
                    vid: n
                  }
                }, 5, {
                  onProgress: t => {
                    var e;
                    !this.startTransAt && (null === (e = null == t ? void 0 : t
                        .ret) || void 0 === e ? void 0 : e.createTime) && (this
                        .startTransAt = Number(t.ret.createTime)), this
                      .sendProgressFeedback()
                  },
                  onComplete: e => {
                    this.complete = !0, clearTimeout(this.transProgressTimer),
                      this.config.onTransProgress(1);
                    const r = a(e, this.config.trans);
                    r ? this.config.onTransComplete(r) : this.config.onError(
                      new t(`未能够获得转码视频，或者媒体文件长度为0. vid: ${n}`))
                  }
                })
            }
          }(e, r, o)
        }
    })(), o.default
  })()
}));
//# sourceMappingURL=DocConverter.js.map

/** 
 Git Hash: 2fc403e2535810d2e766606f826a420c6578e9a9
 Create At: 2025/4/14 20:00:13
*/
