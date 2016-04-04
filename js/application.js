/*! echo.js v1.7.0 | (c) 2015 @toddmotto | https://github.com/toddmotto/echo */ ! function(t, e) {
    "function" == typeof define && define.amd ? define(function() {
        return e(t)
    }) : "object" == typeof exports ? module.exports = e : t.echo = e(t)
}(this, function(t) {
    "use strict";
    var e, i, n, r, s, a = {},
        o = function() {},
        h = function(t) {
            return null === t.offsetParent
        },
        c = function(t, e) {
            if (h(t)) return !1;
            var i = t.getBoundingClientRect();
            return i.right >= e.l && i.bottom >= e.t && i.left <= e.r && i.top <= e.b
        },
        l = function() {
            (r || !i) && (clearTimeout(i), i = setTimeout(function() {
                a.render(), i = null
            }, n))
        };
    return a.init = function(i) {
        i = i || {};
        var h = i.offset || 0,
            c = i.offsetVertical || h,
            d = i.offsetHorizontal || h,
            u = function(t, e) {
                return parseInt(t || e, 10)
            };
        e = {
            t: u(i.offsetTop, c),
            b: u(i.offsetBottom, c),
            l: u(i.offsetLeft, d),
            r: u(i.offsetRight, d)
        }, n = u(i.throttle, 250), r = i.debounce !== !1, s = !!i.unload, o = i.callback || o, a.render(), document.addEventListener ? (t.addEventListener("scroll", l, !1), t.addEventListener("load", l, !1)) : (t.attachEvent("onscroll", l), t.attachEvent("onload", l))
    }, a.render = function() {
        for (var i, n, r = document.querySelectorAll("img[data-echo], [data-echo-background]"), h = r.length, l = {
                l: 0 - e.l,
                t: 0 - e.t,
                b: (t.innerHeight || document.documentElement.clientHeight) + e.b,
                r: (t.innerWidth || document.documentElement.clientWidth) + e.r
            }, d = 0; h > d; d++) n = r[d], c(n, l) ? (s && n.setAttribute("data-echo-placeholder", n.src), null !== n.getAttribute("data-echo-background") ? n.style.backgroundImage = "url(" + n.getAttribute("data-echo-background") + ")" : n.src = n.getAttribute("data-echo"), s || (n.removeAttribute("data-echo"), n.removeAttribute("data-echo-background")), o(n, "load")) : s && (i = n.getAttribute("data-echo-placeholder")) && (null !== n.getAttribute("data-echo-background") ? n.style.backgroundImage = "url(" + i + ")" : n.src = i, n.removeAttribute("data-echo-placeholder"), o(n, "unload"));
        h || a.detach()
    }, a.detach = function() {
        document.removeEventListener ? t.removeEventListener("scroll", l) : t.detachEvent("onscroll", l), clearTimeout(i)
    }, a
}),
function() {
    "use strict";

    function t(t) {
        this.a = h, this.b = void 0, this.d = [];
        var e = this;
        try {
            t(function(t) {
                n(e, t)
            }, function(t) {
                r(e, t)
            })
        } catch (i) {
            r(e, i)
        }
    }

    function e(e) {
        return new t(function(t, i) {
            i(e)
        })
    }

    function i(e) {
        return new t(function(t) {
            t(e)
        })
    }

    function n(t, e) {
        if (t.a === h) {
            if (e === t) throw new TypeError("Promise settled with itself.");
            var i = !1;
            try {
                var a = e && e.then;
                if (null !== e && "object" == typeof e && "function" == typeof a) return void a.call(e, function(e) {
                    i || n(t, e), i = !0
                }, function(e) {
                    i || r(t, e), i = !0
                })
            } catch (o) {
                return void(i || r(t, o))
            }
            t.a = 0, t.b = e, s(t)
        }
    }

    function r(t, e) {
        if (t.a === h) {
            if (e === t) throw new TypeError("Promise settled with itself.");
            t.a = 1, t.b = e, s(t)
        }
    }

    function s(t) {
        setTimeout(function() {
            if (t.a !== h)
                for (; t.d.length;) {
                    var e = t.d.shift(),
                        i = e[0],
                        n = e[1],
                        r = e[2],
                        e = e[3];
                    try {
                        0 === t.a ? r("function" == typeof i ? i.call(void 0, t.b) : t.b) : 1 === t.a && ("function" == typeof n ? r(n.call(void 0, t.b)) : e(t.b))
                    } catch (s) {
                        e(s)
                    }
                }
        }, 0)
    }

    function a(e) {
        return new t(function(t, i) {
            function n(i) {
                return function(n) {
                    s[i] = n, r += 1, r === e.length && t(s)
                }
            }
            var r = 0,
                s = [];
            0 === e.length && t(s);
            for (var a = 0; a < e.length; a += 1) e[a].c(n(a), i)
        })
    }

    function o(e) {
        return new t(function(t, i) {
            for (var n = 0; n < e.length; n += 1) e[n].c(t, i)
        })
    }
    var h = 2;
    t.prototype.e = function(t) {
        return this.c(void 0, t)
    }, t.prototype.c = function(e, i) {
        var n = this;
        return new t(function(t, r) {
            n.d.push([e, i, t, r]), s(n)
        })
    }, window.Promise || (window.Promise = t, window.Promise.resolve = i, window.Promise.reject = e, window.Promise.race = o, window.Promise.all = a, window.Promise.prototype.then = t.prototype.c, window.Promise.prototype["catch"] = t.prototype.e)
}(),
function() {
    "use strict";

    function t(t) {
        function e() {
            document.body ? t() : setTimeout(e, 0)
        }
        e()
    }

    function e(t) {
        this.a = document.createElement("div"), this.a.setAttribute("aria-hidden", "true"), this.a.appendChild(document.createTextNode(t)), this.b = document.createElement("span"), this.c = document.createElement("span"), this.f = document.createElement("span"), this.e = document.createElement("span"), this.d = -1, this.b.style.cssText = "display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;", this.c.style.cssText = "display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;", this.e.style.cssText = "display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;", this.f.style.cssText = "display:inline-block;width:200%;height:200%;", this.b.appendChild(this.f), this.c.appendChild(this.e), this.a.appendChild(this.b), this.a.appendChild(this.c)
    }

    function i(t, e, i) {
        t.a.style.cssText = "min-width:20px;min-height:20px;display:inline-block;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font-size:100px;font-family:" + e + ";" + i
    }

    function n(t) {
        var e = t.a.offsetWidth,
            i = e + 100;
        return t.e.style.width = i + "px", t.c.scrollLeft = i, t.b.scrollLeft = t.b.scrollWidth + 100, t.d !== e ? (t.d = e, !0) : !1
    }

    function r(t, e) {
        t.b.addEventListener("scroll", function() {
            n(t) && null !== t.a.parentNode && e(t.d)
        }, !1), t.c.addEventListener("scroll", function() {
            n(t) && null !== t.a.parentNode && e(t.d)
        }, !1), n(t)
    }

    function s(t, e) {
        var i = e || {};
        this.family = t, this.style = i.style || "normal", this.variant = i.variant || "normal", this.weight = i.weight || "normal", this.stretch = i.stretch || "stretch", this.featureSettings = i.featureSettings || "normal"
    }
    var a = null;
    s.prototype.a = function(n, s) {
        var o = n || "BESbswy",
            h = s || 3e3,
            c = "font-style:" + this.style + ";font-variant:" + this.variant + ";font-weight:" + this.weight + ";font-stretch:" + this.stretch + ";font-feature-settings:" + this.featureSettings + ";-moz-font-feature-settings:" + this.featureSettings + ";-webkit-font-feature-settings:" + this.featureSettings + ";",
            l = document.createElement("div"),
            d = new e(o),
            u = new e(o),
            p = new e(o),
            f = -1,
            m = -1,
            v = -1,
            y = -1,
            g = -1,
            w = -1,
            b = this;
        return new Promise(function(e, n) {
            function s() {
                null !== l.parentNode && l.parentNode.removeChild(l)
            }

            function o() {
                if ((-1 !== f && -1 !== m || -1 !== f && -1 !== v || -1 !== m && -1 !== v) && (f === m || f === v || m === v)) {
                    if (null === a) {
                        var t = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
                        a = !!t && (536 > parseInt(t[1], 10) || 536 === parseInt(t[1], 10) && 11 >= parseInt(t[2], 10))
                    }
                    a ? f === y && m === y && v === y || f === g && m === g && v === g || f === w && m === w && v === w || (s(), e(b)) : (s(), e(b))
                }
            }
            t(function() {
                function t() {
                    if (Date.now() - e >= h) s(), n(b);
                    else {
                        var i = document.hidden;
                        (!0 === i || void 0 === i) && (f = d.a.offsetWidth, m = u.a.offsetWidth, v = p.a.offsetWidth, o()), setTimeout(t, 50)
                    }
                }
                var e = Date.now();
                i(d, "sans-serif", c), i(u, "serif", c), i(p, "monospace", c), l.appendChild(d.a), l.appendChild(u.a), l.appendChild(p.a), document.body.appendChild(l), y = d.a.offsetWidth, g = u.a.offsetWidth, w = p.a.offsetWidth, t(), r(d, function(t) {
                    f = t, o()
                }), i(d, b.family + ",sans-serif", c), r(u, function(t) {
                    m = t, o()
                }), i(u, b.family + ",serif", c), r(p, function(t) {
                    v = t, o()
                }), i(p, b.family + ",monospace", c)
            })
        })
    }, window.FontFaceObserver = s, window.FontFaceObserver.prototype.check = s.prototype.a
}();
var Froogaloop = function() {
    function t(e) {
        return new t.fn.init(e)
    }

    function e(t, e, i) {
        return i.contentWindow.postMessage ? (t = JSON.stringify({
            method: t,
            value: e
        }), void i.contentWindow.postMessage(t, a)) : !1
    }

    function i(t) {
        var e, i;
        try {
            e = JSON.parse(t.data), i = e.event || e.method
        } catch (n) {}
        if ("ready" != i || s || (s = !0), !/^https?:\/\/player.vimeo.com/.test(t.origin)) return !1;
        "*" === a && (a = t.origin), t = e.value;
        var o = e.data,
            h = "" === h ? null : e.player_id;
        return e = h ? r[h][i] : r[i], i = [], e ? (void 0 !== t && i.push(t), o && i.push(o), h && i.push(h), 0 < i.length ? e.apply(null, i) : e.call()) : !1
    }

    function n(t, e, i) {
        i ? (r[i] || (r[i] = {}), r[i][t] = e) : r[t] = e
    }
    var r = {},
        s = !1,
        a = "*";
    return t.fn = t.prototype = {
        element: null,
        init: function(t) {
            return "string" == typeof t && (t = document.getElementById(t)), this.element = t, this
        },
        api: function(t, i) {
            if (!this.element || !t) return !1;
            var r = this.element,
                s = "" !== r.id ? r.id : null,
                a = i && i.constructor && i.call && i.apply ? null : i,
                o = i && i.constructor && i.call && i.apply ? i : null;
            return o && n(t, o, s), e(t, a, r), this
        },
        addEvent: function(t, i) {
            if (!this.element) return !1;
            var r = this.element,
                a = "" !== r.id ? r.id : null;
            return n(t, i, a), "ready" != t ? e("addEventListener", t, r) : "ready" == t && s && i.call(null, a), this
        },
        removeEvent: function(t) {
            if (!this.element) return !1;
            var i = this.element,
                n = "" !== i.id ? i.id : null;
            t: {
                if (n && r[n]) {
                    if (!r[n][t]) {
                        n = !1;
                        break t
                    }
                    r[n][t] = null
                } else {
                    if (!r[t]) {
                        n = !1;
                        break t
                    }
                    r[t] = null
                }
                n = !0
            }
            "ready" != t && n && e("removeEventListener", t, i)
        }
    }, t.fn.init.prototype = t.fn, window.addEventListener ? window.addEventListener("message", i, !1) : window.attachEvent("onmessage", i), window.Froogaloop = window.$f = t
}();
/*!
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */
! function(t) {
    "use strict";
    t.fn.fitVids = function(e) {
        var i = {
            customSelector: null,
            ignore: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var n = document.head || document.getElementsByTagName("head")[0],
                r = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
                s = document.createElement("div");
            s.innerHTML = '<p>x</p><style id="fit-vids-style">' + r + "</style>", n.appendChild(s.childNodes[1])
        }
        return e && t.extend(i, e), this.each(function() {
            var e = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
            i.customSelector && e.push(i.customSelector);
            var n = ".fitvidsignore";
            i.ignore && (n = n + ", " + i.ignore);
            var r = t(this).find(e.join(","));
            r = r.not("object object"), r = r.not(n), r.each(function() {
                var e = t(this);
                if (!(e.parents(n).length > 0 || "embed" === this.tagName.toLowerCase() && e.parent("object").length || e.parent(".fluid-width-video-wrapper").length)) {
                    e.css("height") || e.css("width") || !isNaN(e.attr("height")) && !isNaN(e.attr("width")) || (e.attr("height", 9), e.attr("width", 16));
                    var i = "object" === this.tagName.toLowerCase() || e.attr("height") && !isNaN(parseInt(e.attr("height"), 10)) ? parseInt(e.attr("height"), 10) : e.height(),
                        r = isNaN(parseInt(e.attr("width"), 10)) ? e.width() : parseInt(e.attr("width"), 10),
                        s = i / r;
                    if (!e.attr("id")) {
                        var a = "fitvid" + Math.floor(999999 * Math.random());
                        e.attr("id", a)
                    }
                    e.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * s + "%"), e.removeAttr("height").removeAttr("width")
                }
            })
        })
    }
}(window.jQuery || window.Zepto), window.Modernizr = function(t, e, i) {
        function n(t) {
            g.cssText = t
        }

        function r(t, e) {
            return typeof t === e
        }

        function s(t, e) {
            return !!~("" + t).indexOf(e)
        }

        function a(t, e) {
            for (var n in t) {
                var r = t[n];
                if (!s(r, "-") && g[r] !== i) return "pfx" == e ? r : !0
            }
            return !1
        }

        function o(t, e, n) {
            for (var s in t) {
                var a = e[t[s]];
                if (a !== i) return n === !1 ? t[s] : r(a, "function") ? a.bind(n || e) : a
            }
            return !1
        }

        function h(t, e, i) {
            var n = t.charAt(0).toUpperCase() + t.slice(1),
                s = (t + " " + b.join(n + " ") + n).split(" ");
            return r(e, "string") || r(e, "undefined") ? a(s, e) : (s = (t + " " + x.join(n + " ") + n).split(" "), o(s, e, i))
        }
        var c, l, d, u = "2.8.3",
            p = {},
            f = !0,
            m = e.documentElement,
            v = "modernizr",
            y = e.createElement(v),
            g = y.style,
            w = ({}.toString, "Webkit Moz O ms"),
            b = w.split(" "),
            x = w.toLowerCase().split(" "),
            E = {},
            T = [],
            C = T.slice,
            k = {}.hasOwnProperty;
        d = r(k, "undefined") || r(k.call, "undefined") ? function(t, e) {
            return e in t && r(t.constructor.prototype[e], "undefined")
        } : function(t, e) {
            return k.call(t, e)
        }, Function.prototype.bind || (Function.prototype.bind = function(t) {
            var e = this;
            if ("function" != typeof e) throw new TypeError;
            var i = C.call(arguments, 1),
                n = function() {
                    if (this instanceof n) {
                        var r = function() {};
                        r.prototype = e.prototype;
                        var s = new r,
                            a = e.apply(s, i.concat(C.call(arguments)));
                        return Object(a) === a ? a : s
                    }
                    return e.apply(t, i.concat(C.call(arguments)))
                };
            return n
        }), E.flexbox = function() {
            return h("flexWrap")
        };
        for (var S in E) d(E, S) && (l = S.toLowerCase(), p[l] = E[S](), T.push((p[l] ? "" : "no-") + l));
        return p.addTest = function(t, e) {
                if ("object" == typeof t)
                    for (var n in t) d(t, n) && p.addTest(n, t[n]);
                else {
                    if (t = t.toLowerCase(), p[t] !== i) return p;
                    e = "function" == typeof e ? e() : e, "undefined" != typeof f && f && (m.className += " " + (e ? "" : "no-") + t), p[t] = e
                }
                return p
            }, n(""), y = c = null,
            function(t, e) {
                function i(t, e) {
                    var i = t.createElement("p"),
                        n = t.getElementsByTagName("head")[0] || t.documentElement;
                    return i.innerHTML = "x<style>" + e + "</style>", n.insertBefore(i.lastChild, n.firstChild)
                }

                function n() {
                    var t = g.elements;
                    return "string" == typeof t ? t.split(" ") : t
                }

                function r(t) {
                    var e = y[t[m]];
                    return e || (e = {}, v++, t[m] = v, y[v] = e), e
                }

                function s(t, i, n) {
                    if (i || (i = e), l) return i.createElement(t);
                    n || (n = r(i));
                    var s;
                    return s = n.cache[t] ? n.cache[t].cloneNode() : f.test(t) ? (n.cache[t] = n.createElem(t)).cloneNode() : n.createElem(t), !s.canHaveChildren || p.test(t) || s.tagUrn ? s : n.frag.appendChild(s)
                }

                function a(t, i) {
                    if (t || (t = e), l) return t.createDocumentFragment();
                    i = i || r(t);
                    for (var s = i.frag.cloneNode(), a = 0, o = n(), h = o.length; h > a; a++) s.createElement(o[a]);
                    return s
                }

                function o(t, e) {
                    e.cache || (e.cache = {}, e.createElem = t.createElement, e.createFrag = t.createDocumentFragment, e.frag = e.createFrag()), t.createElement = function(i) {
                        return g.shivMethods ? s(i, t, e) : e.createElem(i)
                    }, t.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + n().join().replace(/[\w\-]+/g, function(t) {
                        return e.createElem(t), e.frag.createElement(t), 'c("' + t + '")'
                    }) + ");return n}")(g, e.frag)
                }

                function h(t) {
                    t || (t = e);
                    var n = r(t);
                    return g.shivCSS && !c && !n.hasCSS && (n.hasCSS = !!i(t, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), l || o(t, n), t
                }
                var c, l, d = "3.7.0",
                    u = t.html5 || {},
                    p = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    m = "_html5shiv",
                    v = 0,
                    y = {};
                ! function() {
                    try {
                        var t = e.createElement("a");
                        t.innerHTML = "<xyz></xyz>", c = "hidden" in t, l = 1 == t.childNodes.length || function() {
                            e.createElement("a");
                            var t = e.createDocumentFragment();
                            return "undefined" == typeof t.cloneNode || "undefined" == typeof t.createDocumentFragment || "undefined" == typeof t.createElement
                        }()
                    } catch (i) {
                        c = !0, l = !0
                    }
                }();
                var g = {
                    elements: u.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                    version: d,
                    shivCSS: u.shivCSS !== !1,
                    supportsUnknownElements: l,
                    shivMethods: u.shivMethods !== !1,
                    type: "default",
                    shivDocument: h,
                    createElement: s,
                    createDocumentFragment: a
                };
                t.html5 = g, h(e)
            }(this, e), p._version = u, p._domPrefixes = x, p._cssomPrefixes = b, p.testProp = function(t) {
                return a([t])
            }, p.testAllProps = h, m.className = m.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + T.join(" ") : ""), p
    }(this, this.document),
    function() {
        for (var t = 0, e = ["ms", "moz", "webkit", "o"], i = 0; i < e.length && !window.requestAnimationFrame; ++i) window.requestAnimationFrame = window[e[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[i] + "CancelAnimationFrame"] || window[e[i] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(e, i) {
            var n = (new Date).getTime(),
                r = Math.max(0, 16 - (n - t)),
                s = window.setTimeout(function() {
                    e(n + r)
                }, r);
            return t = n + r, s
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
            clearTimeout(t)
        })
    }(),
    function() {
        var t = function(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        };
        this.Feature = function() {
            function e(e) {
                var i, n, r, s, a;
                for (this.data = e, this.resize = t(this.resize, this), this.loop = t(this.loop, this), this.isVisible = t(this.isVisible, this), this.GO = !0, this.HOVER = !1, this.VISIBLE = !0, this.type = {
                        elapsed: 0,
                        index: -1,
                        letters: null,
                        link: $(".feature-link"),
                        more: $(".feature-more"),
                        wrap: $(".feature")
                    }, this.ease = {
                        duration: 3e3,
                        elapsed: 0
                    }, this.elapsed = 0, this.index = -1, this.then = Date.now(), this.timer = 5e3, this.canvas = document.getElementById("canvas"), this.ctx = this.canvas.getContext("2d"), this.resize(), this.isVisible(), this.dictionary = "abcdefghijklmnopqrstuvwxyz0123456789<>{}()!@#$%^&*=+", i = 200 * (this.width / 1500), this.particles = [], n = r = 0, a = i; a >= 0 ? a > r : r > a; n = a >= 0 ? ++r : --r) s = {
                    a: Math.random(),
                    halo: 0,
                    letter: this.dictionary[Math.floor(Math.random() * this.dictionary.length)],
                    r: 0,
                    rTarget: 0,
                    v: [0, 0],
                    vTarget: [0, 0],
                    x: this.width * Math.random(),
                    y: this.height * Math.random()
                }, this.particles.push(s);
                this.listeners(), this.next(), this.loop()
            }
            return e.prototype.addLetter = function() {
                return this.type.index++, this.type.index < this.type.letters.length ? this.type.letters.eq(this.type.index).addClass("is-active") : void 0
            }, e.prototype.draw = function() {
                var t, e, i, n, r, s, a, o, h;
                for (t = this.HOVER === !0 ? .015 : .15, 0 === this.index ? this.ctx.fillStyle = "rgba(144, 79, 103, " + t + ")" : 1 === this.index ? this.ctx.fillStyle = "rgba(51, 37, 48, " + t + ")" : this.ctx.fillStyle = "rgba(39, 137, 152, " + t + ")", this.ctx.fillRect(0, 0, this.width, this.height), a = this.particles, o = [], e = i = 0, n = a.length; n > i; e = ++i) r = a[e], this.ease.elapsed < this.ease.duration ? (s = this.easeCubicOut(this.ease.elapsed, r.r, r.rTarget - r.r), h = [this.easeCubicOut(this.ease.elapsed, r.v[0], r.vTarget[0] - r.v[0]), this.easeCubicOut(this.ease.elapsed, r.v[1], r.vTarget[1] - r.v[1])]) : (r.r = r.rTarget, s = r.r, r.v = r.vTarget, h = r.v), r.x += h[0], r.y += h[1], 0 === this.index && (r.halo = .0025 * this.elapsed * r.rTarget, this.ctx.beginPath(), this.ctx.arc(r.x, r.y, r.halo, 0, 2 * Math.PI, !0), this.ctx.fillStyle = "rgba(30, 52, 63, 0.02)", this.ctx.fill(), this.ctx.beginPath(), this.ctx.arc(r.x, r.y, s, 0, 2 * Math.PI, !0), this.ctx.strokeStyle = "rgba(30, 52, 63, 0.2)", this.ctx.stroke()), 1 === this.index && (this.ctx.beginPath(), this.ctx.arc(r.x, r.y, s, 0, 2 * Math.PI, !0), this.ctx.fillStyle = "rgba(180, 180, 180, " + r.a + ")", this.ctx.fill()), 2 === this.index && (this.ctx.beginPath(), this.ctx.arc(r.x, r.y, s, 0, 2 * Math.PI, !0), this.ctx.fillStyle = "rgba(0, 0, 0, 0.015)", this.ctx.fill(), this.ctx.font = "30px monospace", this.ctx.textAlign = "center", this.ctx.textBaseline = "middle", this.ctx.fillStyle = "rgba(0, 0, 0, 0.04)", this.ctx.fillText(r.letter, r.x, r.y)), r.x > this.width && (r.x = 0), r.x < 0 && (r.x = this.width), r.y > this.height && (r.y = 0), r.y < 0 ? o.push(r.y = this.height) : o.push(void 0);
                return o
            }, e.prototype.easeCubicOut = function(t, e, i) {
                return i * ((t = t / this.ease.duration - 1) * t * t + 1) + e
            }, e.prototype.isVisible = function() {
                return this.VISIBLE = document.body.scrollTop > this.height / 2 ? !1 : !0
            }, e.prototype.listeners = function() {
                return window.addEventListener("scroll", this.isVisible), window.addEventListener("resize", this.resize), this.type.link.on("mouseenter", function(t) {
                    return function() {
                        return t.HOVER = !0, t.type.wrap.removeClass("is-warning")
                    }
                }(this)).on("mouseleave", function(t) {
                    return function() {
                        return t.HOVER = !1
                    }
                }(this)), $(".feature-pause").on("click", function(t) {
                    return function() {
                        return t.then = Date.now(), t.GO = t.GO ? !1 : !0
                    }
                }(this))
            }, e.prototype.loop = function() {
                var t, e;
                return this.GO && this.VISIBLE && (e = Date.now(), t = e - this.then, this.ease.elapsed += t, this.elapsed += t, this.type.elapsed += t, this.then = e, this.draw(), this.type.elapsed > 100 && (this.addLetter(), this.type.elapsed = 0), this.HOVER === !1 ? (this.elapsed > this.timer - 1e3 && this.type.wrap.addClass("is-warning"), this.elapsed > this.timer && this.next()) : this.elapsed = 0), requestAnimationFrame(this.loop)
            }, e.prototype.next = function() {
                var t, e, i, n, r, s, a, o, h, c, l, d, u, p, f, m, v, y;
                for (this.ease.elapsed = 0, this.elapsed = 0, this.type.elapsed = 0, this.index++, void 0 === this.data[this.index] && (this.index = 0), this.type.index = -1, this.type.link.empty(), this.type.link.attr("href", this.data[this.index].src), this.type.more.attr("href", this.data[this.index].src), this.type.wrap.attr("data-theme", this.data[this.index].slug), this.type.wrap.removeClass("is-warning"), y = "", t = e = 0, l = this.data[this.index].text.length; l >= 0 ? l > e : e > l; t = l >= 0 ? ++e : --e) y += "<span>" + this.data[this.index].text[t] + "</span>";
                if (this.type.link.html(y), this.type.letters = this.type.link.children(), 0 === this.index) {
                    for (d = this.particles, f = [], t = i = 0, r = d.length; r > i; t = ++i) h = d[t], h.halo = 0, h.rTarget = 3 * Math.random() + 2, f.push(h.vTarget = [.25 * Math.random() - .125, .25 * Math.random() - .125]);
                    return f
                }
                if (1 === this.index) {
                    for (u = this.particles, m = [], t = n = 0, s = u.length; s > n; t = ++n) h = u[t], h.rTarget = 2.5 * Math.random() + .5, c = 1 / this.particles[t].rTarget, m.push(h.vTarget = [-2 * c, -1 * c]);
                    return m
                }
                for (p = this.particles, v = [], t = o = 0, a = p.length; a > o; t = ++o) h = p[t], h.rTarget = 10 * Math.random() + 30, t % 2 === 0 ? v.push(h.vTarget = [1 * Math.random(), 1]) : v.push(h.vTarget = [-1 * Math.random(), 1]);
                return v
            }, e.prototype.resize = function() {
                return this.width = this.canvas.parentElement.clientWidth, this.height = this.canvas.parentElement.clientHeight, this.canvas.width = this.width, this.canvas.height = this.height
            }, e
        }()
    }.call(this),
    function() {
        var t = function(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        };
        this.Process = function() {
            function e(e) {
                this.el = e, this.loop = t(this.loop, this), this.resize = t(this.resize, this), this.canvas = document.getElementById("canvas"), this.ctx = this.canvas.getContext("2d"), this.pac = {
                    dir: [0, 1],
                    odometer: 0,
                    mouthDir: 1,
                    mouthSize: 0,
                    y: 0
                }, this.delta = 0, this.then = Date.now(), this.resize(), this.loop(), window.addEventListener("resize", this.resize)
            }
            return e.prototype.resize = function() {
                return this.width = this.el.innerWidth(), this.height = this.el.innerHeight(), this.canvas.width = this.width, this.canvas.height = this.height, this.pac.x = this.width / 2, this.pac.r = this.width / 16, this.pelletGap = this.width / 10, this.velocity = this.width / 150
            }, e.prototype.update = function() {
                var t, e, i;
                for (this.pac.y > 4 * this.pelletGap && this.pac.y < 5 * this.pelletGap && this.pac.x < this.width / 2 + 4 * this.pelletGap ? this.pac.dir = [1, 0] : this.pac.y > 8 * this.pelletGap && this.pac.x > this.width / 2 ? this.pac.dir = [-1, 0] : this.pac.dir = [0, 1], e = this.pac.dir[0] * this.velocity, i = this.pac.dir[1] * this.velocity, this.pac.odometer += Math.abs(e + i), this.pac.x += e, this.pac.y += i, this.pac.y > this.height && (this.resize(), this.pac.odometer = 0, this.pac.x = this.width / 2, this.pac.y = 0, this.delta = 0), this.pac.mouthSize += 5 * this.pac.mouthDir, (this.pac.mouthSize < 1 || this.pac.mouthSize > 40) && (this.pac.mouthDir *= -1), this.ctx.fillStyle = "#82b854", this.ctx.beginPath(), 1 === this.pac.dir[0] ? this.ctx.arc(this.pac.x, this.pac.y, this.pac.r, Math.PI / 180 * this.pac.mouthSize, Math.PI / 180 * (360 - this.pac.mouthSize)) : -1 === this.pac.dir[0] ? this.ctx.arc(this.pac.x, this.pac.y, this.pac.r, Math.PI / 180 * (179 - this.pac.mouthSize), Math.PI / 180 * (180 + this.pac.mouthSize), !0) : this.ctx.arc(this.pac.x, this.pac.y, this.pac.r, Math.PI / 180 * (89 - this.pac.mouthSize), Math.PI / 180 * (90 + this.pac.mouthSize), !0), this.ctx.lineTo(this.pac.x, this.pac.y), this.ctx.fill(), t = {
                        i: 0,
                        x: 5 * this.pelletGap,
                        y: 0
                    }, this.delta <= 500 && (this.ctx.fillStyle = "rgba(130, 184, 84, " + this.delta / 500 + ")"), this.ctx.beginPath(); t.y < this.height;) t.i > this.pac.odometer / this.pelletGap + .5 && (this.ctx.moveTo(t.x, t.y), this.ctx.arc(t.x, t.y, this.pac.r / 4, 0, 2 * Math.PI)), t.i >= 4 && t.i < 8 ? t.x += this.pelletGap : t.i >= 12 && t.i < 16 ? t.x -= this.pelletGap : t.y += this.pelletGap, t.i++;
                return this.ctx.fill()
            }, e.prototype.loop = function() {
                var t;
                return t = Date.now(), this.delta += t - this.then, this.then = t, this.ctx.clearRect(0, 0, this.width, this.height), this.update(), requestAnimationFrame(this.loop)
            }, e
        }()
    }.call(this),
    function() {
        this.EL = {}, this.EL.navbar = function() {
            var t;
            return t = "is-collapsed", $("body").addClass(t), $(".nav-toggle").on("click", function(e) {
                return $("body").toggleClass(t), e.preventDefault()
            })
        }, this.EL.carousel = function(t) {
            var e, i, n, r;
            return r = $(t.wrap), e = $(t.item), e.length <= 5 && e.each(function() {
                $(this).clone().appendTo(t.wrap + " ul"), e = $(t.item)
            }), e.first().addClass("is-reference"), i = function(t) {
                var i;
                return i = t.next().length > 0 ? t.next() : e.first()
            }, n = function(t) {
                var i;
                return i = t.prev().length > 0 ? t.prev() : e.last()
            }, $(t.trigger).on("click", function(s) {
                return function(s) {
                    var a, o, h, c, l;
                    for (a = r.find(".is-reference").removeClass("is-reference"), e.css("order", t.max + 3), $(s.currentTarget).data("next") ? (c = i(a).addClass("is-reference").css("order", 1), r.removeClass("is-reversing")) : (c = n(a).addClass("is-reference").css("order", 1), r.addClass("is-reversing")), o = h = 2, l = t.max + 2; l >= 2 ? l >= h : h >= l; o = l >= 2 ? ++h : --h) c = i(c).css("order", o);
                    return r.addClass("is-sliding"), echo.render(), setTimeout(function() {
                        return r.removeClass("is-sliding")
                    }, 50), setTimeout(function() {
                        return echo.render()
                    }, 700), s.preventDefault()
                }
            }(this))
        }, this.EL.history = function(t) {
            return t.on("mousemove touchmove", function(e) {
                var i;
                return i = e.pageX - t.offset().left || e.originalEvent.targetTouches[0].pageX - t.offset().left, t.addClass("is-active"), t.find(".historic-overlay").css("opacity", (i - 75) / (t.width() - 150)), t.find(".historic-waypoint").css("left", i / t.width() * 100 + "%")
            }).on("mouseleave touchend", function(t) {
                return $(this).removeClass("is-active")
            })
        }, this.EL.team = function() {
            return $(".team").on("click", function(t) {
                return $(this).toggleClass("is-flipped"), t.preventDefault()
            }), $(".team a").on("click", function(t) {
                return t.stopPropagation()
            })
        }, this.EL.video = function() {
            var t;
            return $("#video-play").on("click", function(t) {
                var e;
                return $("body").addClass("is-playing"), e = $f($("#video-embed")[0]), e.api("play"), t.preventDefault()
            }), t = function() {
                var t;
                return $("body").removeClass("is-playing"), t = $f($("#video-embed")[0]), t.api("pause")
            }, $(".video-close, .video").on("click", function(e) {
                return function(e) {
                    return t(), e.preventDefault()
                }
            }(this)), $(window).on("keyup", function(e) {
                return function(e) {
                    return 27 === e.keyCode ? t() : void 0
                }
            }(this))
        }, this.mapInit = function() {
            var t, e, i, n, r;
            return i = {
                center: {
                    lat: 28.5375,
                    lng: -81.368804
                },
                disableDefaultUI: !0,
                scrollwheel: !1,
                zoom: 15
            }, t = {
                anchor: new google.maps.Point(27, 72),
                url: "/assets/images/marker.svg"
            }, r = [{
                featureType: "administrative",
                stylers: [{
                    visibility: "on"
                }, {
                    saturation: -100
                }]
            }, {
                featureType: "landscape.man_made",
                stylers: [{
                    visibility: "simplified"
                }, {
                    color: "#f2f2f2"
                }]
            }, {
                featureType: "poi",
                stylers: [{
                    visibility: "simplified"
                }]
            }, {
                featureType: "poi",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "poi.business",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "poi.park",
                stylers: [{
                    color: "#cbe8b1"
                }]
            }, {
                featureType: "road",
                stylers: [{
                    visibility: "simplified"
                }]
            }, {
                featureType: "road",
                elementType: "labels.text",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "road.arterial",
                stylers: [{
                    hue: "#464c3e"
                }]
            }, {
                featureType: "road.highway",
                stylers: [{
                    hue: "#464c3e"
                }, {
                    lightness: 30
                }, {
                    saturation: -90
                }]
            }, {
                featureType: "road.local",
                stylers: [{
                    hue: "#464c3e"
                }]
            }, {
                featureType: "transit",
                stylers: [{
                    visibility: "simplified"
                }]
            }, {
                featureType: "water",
                stylers: [{
                    visibility: "simplified"
                }, {
                    color: "#bbd3db"
                }]
            }, {
                featureType: "water",
                elementType: "labels.text",
                stylers: [{
                    visibility: "off"
                }]
            }], e = new google.maps.Map(document.getElementById("map"), i), e.setOptions({
                styles: r
            }), e.panBy(-$("#map-cell").width() / 4, 0), n = new google.maps.Marker({
                icon: t,
                map: e,
                position: {
                    lat: 28.538042,
                    lng: -81.368804
                },
                title: "Envy"
            })
        }, this.EL.mapLoad = function() {
            var t;
            return t = document.createElement("script"), t.type = "text/javascript", t.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&key=AIzaSyAGImN6xbaaR3DW3IO3sgvrOHDiSxixEk8&callback=mapInit", document.body.appendChild(t)
        }, $(function() {
            var t, e, i, n, r;
            return t = new FontFaceObserver("Calibre"), e = new FontFaceObserver("Calibre", {
                weight: "bold"
            }), n = new FontFaceObserver("Calibre", {
                style: "italic"
            }), i = new FontFaceObserver("Calibre", {
                style: "italic",
                weight: "bold"
            }), r = new FontFaceObserver("Tiempos", {
                weight: "bold"
            }), Promise.all([t.check(null, 1e4), e.check(null, 1e4), n.check(null, 1e4), i.check(null, 1e4), r.check(null, 1e4)]).then(function() {
                return document.documentElement.className += " is-fonting"
            }, function() {
                return console.log("Unable to load fonts")
            }), window.EL.navbar(), echo.init({
                offset: 400,
                callback: function(t) {
                    return $(t).addClass("is-loaded")
                }
            })
        })
    }.call(this);