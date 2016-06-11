/**
 * Created by wajahat on 15/05/2016.
 */
//////////////////////////////////////////////////////////////////////////////////////
// Copyright 2016 Syed Wajahat Aziz.                                                //
// This computer program is protected by copyright law and international treaties.  //
// Unauthorized reproduction or distribution of this program, or any portion of it, //
// may result in severe civil and criminal penalties,                               //
// and will be prosecuted to the maximum extent possible under the law.             //
//////////////////////////////////////////////////////////////////////////////////////

function info(a) {
    alert(a)
}

function error(a, b) {
    alert("Error [" + a + "]: " + b)
}

function debug(a) {
    alert("Debug: " + a)
}

function $cmn_load_XML_text(a) {
    var b = null;
    if ("undefined" != typeof window.ActiveXObject) {
        b = new ActiveXObject("Microsoft.XMLDOM");
        b.async = "false";
        for (b.loadXML(a); 4 != b.readyState;);
    } else b = (new DOMParser).parseFromString(a, "text/xml");
    return b
}

function $cmn_load_XML_file(a) {
    var b = null,
        b = new window.XMLHttpRequest;
    b.open("GET", a, !1);
    b.send(null);
    return b.responseXML
}

function cmn_is_cognos_loaded() {
    return $cmn_is_cognos_loaded()
}

function cmn_toggle_div_display(a) {
    return $cmn_toggle_div_display(a)
}

function cmn_refresh_report() {
    return $cmn_refresh_report()
}
var COOKIE_LIFETIME = 30;

function $cmn_el(a) {
    return document.getElementById(a)
}

function $cmn_generate_id() {
    return 1E10 * (Date.parse((new Date).toString()) / 1E6 + Math.random())
}

function $cmn_toggle_div_display(a) {
    try {
        a.style.display = "none" == a.style.display ? "inline" : "none"
    } catch (b) {}
}

function $cmn_set_cookie(a, b, c) {
    if (c) {
        var d = new Date;
        d.setTime(d.getTime() + 864E5 * c);
        c = "; expires= " + d.toGMTString()
    } else c = "";
    document.cookie = a + "=" + b + c + "; path=/"
}

function $cmn_get_cookie(a) {
    a += "=";
    for (var b = document.cookie.split(";"), c = 0; c < b.length; c++) {
        for (var d = b[c];
             " " == d.charAt(0);) d = d.substring(1, d.length);
        if (0 == d.indexOf(a)) return d.substring(a.length, d.length)
    }
    return null
}

function $cmn_get_element_by_tag_type_name_ext(a, b, c, d) {
    var e = null;
    try {
        var f = a.getElementsByTagName(b);
        for (a = 0; a < f.length; a++)
            if (0 <= f[a].name.indexOf(d) && 0 <= f[a].type.indexOf(c)) {
                e = f[a];
                break
            }
    } catch (g) {
        e = null
    }
    return e
}

function $cmn_get_element(a, b, c) {
    var d = null;
    try {
        for (var e = 0; e < a.children.length && !(d = $cmn_get_element(a.children[e], b, c)); e++);
        a.tagName.toUpperCase() == b.toUpperCase() && 0 <= a.id.toUpperCase().indexOf(c.toUpperCase()) && (d = a)
    } catch (f) {
        return null
    }
    return d
}

function $cog_get_report_objects(a, b, c) {
    var d = $cmn_get_elements_by_attribute(a, "div", "LID", c);
    0 == d.length && (d = $cmn_get_elements_by_attribute(a, "div", "LID", c + b));
    return d
}

function $cog_get_report_objects_ext(a, b, c, d) {
    var e = $cmn_get_elements_by_attribute(a, c, "LID", d);
    0 == e.length && (e = $cmn_get_elements_by_attribute(a, c, "LID", d + b));
    return e
}

function $cmn_is_cognos_loaded() {
    return !0
}

function $cmn_refresh_report() {
    $cog_is_cognos_loaded() ? promptButtonFinish() : setTimeout("$cmn_refresh_report()", 20)
}

function $cmn_getRandomNumber(a) {
    return Math.floor(Math.random() * a)
}

function $cmn_getRandomChar() {
    return "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ".substr($cmn_getRandomNumber(62), 1)
}

function $cmn_randomId(a) {
    for (var b = dateFormat(new Date, "yymmddhhMMss"), c = 0; c < a - b.length; c++) b += $cmn_getRandomChar();
    return b
}

function $cmn_replace_all(a, b, c) {
    return 0 <= a.indexOf(b) ? $cmn_replace_all(a.replace(b, c), b, c) : a
}
var dateFormat = function() {
    var a = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        b = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        c = /[^-+\dA-Z]/g,
        d = function(a, b) {
            a = String(a);
            for (b = b || 2; a.length < b;) a = "0" + a;
            return a
        };
    return function(e, f, g) {
        var h = dateFormat;
        1 == arguments.length && ("[object String]" == Object.prototype.toString.call(e) && !/\d/.test(e)) && (f = e, e = void 0);
        e = e ? new Date(e) : new Date;
        if (isNaN(e)) throw SyntaxError("invalid date");
        f = String(h.masks[f] || f || h.masks["default"]);
        "UTC:" == f.slice(0, 4) && (f = f.slice(4), g = !0);
        var j = g ? "getUTC" : "get",
            l = e[j + "Date"](),
            k = e[j + "Day"](),
            n = e[j + "Month"](),
            q = e[j + "FullYear"](),
            m = e[j + "Hours"](),
            r = e[j + "Minutes"](),
            s = e[j + "Seconds"](),
            j = e[j + "Milliseconds"](),
            p = g ? 0 : e.getTimezoneOffset(),
            t = {
                d: l,
                dd: d(l),
                ddd: h.i18n.dayNames[k],
                dddd: h.i18n.dayNames[k + 7],
                m: n + 1,
                mm: d(n + 1),
                mmm: h.i18n.monthNames[n],
                mmmm: h.i18n.monthNames[n + 12],
                yy: String(q).slice(2),
                yyyy: q,
                h: m % 12 || 12,
                hh: d(m % 12 || 12),
                H: m,
                HH: d(m),
                M: r,
                MM: d(r),
                s: s,
                ss: d(s),
                l: d(j, 3),
                L: d(99 < j ? Math.round(j / 10) : j),
                t: 12 > m ? "a" : "p",
                tt: 12 > m ? "am" : "pm",
                T: 12 > m ? "A" : "P",
                TT: 12 > m ? "AM" : "PM",
                Z: g ? "UTC" : (String(e).match(b) || [""]).pop().replace(c, ""),
                o: (0 < p ? "-" : "+") + d(100 * Math.floor(Math.abs(p) / 60) + Math.abs(p) % 60, 4),
                S: ["th", "st", "nd", "rd"][3 < l % 10 ? 0 : (10 != l % 100 - l % 10) * l % 10]
            };
        return f.replace(a, function(a) {
            return a in t ? t[a] : a.slice(1, a.length - 1)
        })
    }
}();
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};
dateFormat.i18n = {
    dayNames: "Sun Mon Tue Wed Thu Fri Sat Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
    monthNames: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec January February March April May June July August September October November December".split(" ")
};
Date.prototype.format = function(a, b) {
    return dateFormat(this, a, b)
};

function $cmn_get_elements_by_attribute(a, b, c, d) {
    a = "*" == b && a.all ? a.all : a.getElementsByTagName(b);
    b = [];
    for (var e = "undefined" != typeof d ? RegExp("(^|\\s)" + d + "(\\s|$)", "i") : null, f, g, h = 0; h < a.length; h++) f = a[h], g = f.getAttribute && f.getAttribute(c), "string" == typeof g && 0 < g.length && ("undefined" == typeof d || e && e.test(g)) && b.push(f);
    return b
}

function $cmn_find_select_option(a, b) {
    for (var c = 0; c < a.options.length; c++)
        if (a.options[c].value == b) return c;
    return -1
}

function $cmn_add_select_option(a, b, c) {
    if (-1 == $cmn_find_select_option(a, c)) {
        var d = document.createElement("OPTION");
        d.text = b;
        d.value = c;
        a.options.add(d)
    }
}

function $cmn_remove_select_option(a, b) {
    var c = $cmn_find_select_option(a, b); - 1 != c && a.remove(c)
}

function $cmn_set_select_option(a, b) {
    for (var c = 0; c < a.options.length; c++)
        if (a.options[c].value == b) {
            a.options[c].selected = !0;
            break
        }
}

function $cog_getIFrameCV(a) {
    var b;
    try {
        b = "RS" == a.getFormWarpRequest().elements["cv.id"].value ? a.oCVRS : a.oCV_NS_
    } catch (c) {
        b = a.oCV_THIS_, b || (b = a.oCV_NS_, b || (b = a.oCVRS))
    }
    return b
}

function $cog_is_cognos_loaded_ext(a) {
    return $cmn_get_element_by_tag_type_name_ext(a, "INPUT", "hidden", "responseText") || $cmn_get_element_by_tag_type_name_ext(a, "INPUT", "hidden", "responseXML") || $cmn_get_element_by_tag_type_name_ext(a, "INPUT", "hidden", "cv.contextInfo") ? !0 : !1
}

function $cog_get_pageletpath(a, b) {
    return b && "" != b ? a + "?b_action=dashboard&pathinfo=/cm&frag-header=false&path=" + b : ""
}

function $cog_get_reppath(a, b, c) {
    if (b && "" != b) switch (c) {
        case "interactiveReport":
            return a + "?b_action=xts.run&m=portal/report-viewer.xts&cd=r&ui.object=" + encodeURIComponent(b) + "&cv.header=false&cv.toolbar=false";
        case "report":
            return a + "?b_action=cognosViewer&ui.action=run&ui.object=" + encodeURIComponent(b) + "&cv.header=false&cv.toolbar=false";
        case "reportView":
            return a + "?b_action=cognosViewer&ui.action=view&ui.object=defaultOutput(" + encodeURIComponent(b) + ")&cv.header=false&cv.toolbar=false";
        case "query":
            return a +
                "?b_action=xts.run&ui.action=edit&m=portal/launch.xts&ui.tool=QueryStudio&ui.object=" + encodeURIComponent(b) + "&ui.header=false&ui.toolbar=false";
        case "analysis":
            return a + "?b_action=xts.run&ui.action=edit&m=portal/launch.xts&ui.gateway=" + a + "&ui.tool=AnalysisStudio&ui.object=" + encodeURIComponent(b) + "&launch.openJSStudioInFrame=true&ui.header=false&ui.toolbar=false";
        default:
            return ""
    } else return ""
}

function $cog_get_repdisplaypath(a, b) {
    if ("cognos" != b && "report" != b && "interactiveReport" != b && "reportView" != b && "pagelet" != b) return a;
    if ("" == a) {
        switch (b) {
            case "pagelet":
                return "No page defined"
        }
        return "No report defined"
    }
    for (var c = a, d = "Public Folders", e = c.indexOf("[@name='"); 0 < e;)
        if (c = c.substring(e + 8), e = c.indexOf("']"), 0 < e) d += " > " + c.substring(0, e), c = c.substring(e + 1), e = c.indexOf("[@name='");
        else break;
    return d
}

function $cog_getCognosToolPath(a, b) {
    switch (b) {
        case "ReportStudio":
            return a + "?b_action=xts.run&ui.action=new&m=portal/launch.xts&ui.gateway=" + a + "&ui.tool=ReportStudio&launch.openJSStudioInFrame=true&ui.header=false&ui.toolbar=false";
        case "QueryStudio":
            return a + "?b_action=xts.run&ui.action=new&m=portal/launch.xts&ui.gateway=" + a + "&ui.tool=QueryStudio&launch.openJSStudioInFrame=true&ui.header=false&ui.toolbar=false";
        case "AnalysisStudio":
            return a + "?b_action=xts.run&ui.action=new&m=portal/launch.xts&ui.gateway=" +
                a + "&ui.tool=AnalysisStudio&launch.openJSStudioInFrame=true&ui.header=false&ui.toolbar=false";
        case "PowerplayStudio":
            return a + "?b_action=xts.run&ui.action=new&m=portal/launch.xts&ui.gateway=" + a + "&ui.tool=PowerplayStudio&launch.openJSStudioInFrame=true&ui.header=false&ui.toolbar=false";
        case "BInsight":
            return a + "?b_action=xts.run&ui.action=new&m=portal/launch.xts&ui.gateway=" + a + "&ui.tool=DashboardConsole&launch.openJSStudioInFrame=true&ui.header=false&ui.toolbar=false";
        case "BIAdvanced":
            return a + "?b_action=xts.run&ui.action=new&m=portal/launch.xts&ui.gateway=" +
                a + "&ui.tool=ReportStudio&launch.openJSStudioInFrame=true&ui.header=false&ui.toolbar=false&ui.profile=BUA_standalone"
    }
    return null
}

function $cog_sendCognosRequest(a, b, c) {
    var d = $cog_createXMLHttpRequest();
    if (!d) return c(null), !1;
    d.open("GET", a + "?" + b, !0);
    d.setRequestHeader("Content-type", "xml");
    d.onreadystatechange = function() {
        if (4 == d.readyState) return 200 == d.status ? c(d.responseXML) : c(null), !1
    };
    d.send(null);
    return !0
}

function $cog_createXMLHttpRequest() {
    try {
        return new ActiveXObject("Msxml2.XMLHTTP")
    } catch (a) {}
    try {
        return new ActiveXObject("Microsoft.XMLHTTP")
    } catch (b) {}
    try {
        return new XMLHttpRequest
    } catch (c) {}
    return null
}

function $cog_get_global_object(a, b, c) {
    var d = null;
    a[b + c] ? d = a[b + c] : a[b + "_NS_"] ? d = a[b + "_NS_"] : a[b + "RS"] ? d = a[b + "RS"] : a[b + "_THIS_"] && (d = a[b + "_THIS_"]);
    return d
}

function $pr_build_page_drill_def_ext(a, b) {
    var c = null,
        d = "<dps>";
    if (a)
        for (var e = 0; e < a.getControls().length; e++) {
            var c = a.getControls()[e],
                f = c["@parameter"]; - 1 == f.indexOf("dexp_dbg") && b.get(f) && 0 < c.getValues().length && (d += '<dp name="' + f + '">', c.m_oSubmit.value = "", d += "<selectChoices>" + c.preProcess() + "</selectChoices>", c.m_oSubmit.value = "", d += "</dp>")
        }
    return d + "</dps>"
}

function $pr_build_page_drill_def(a) {
    for (var b = null, c = "<dps>", d = 0; d < a.getControls().length; d++) b = a.getControls()[d], 0 < b.getValues().length && (c += '<dp name="' + b["@parameter"] + '">', b.m_oSubmit.value = "", c += "<selectChoices>" + b.preProcess() + "</selectChoices>", b.m_oSubmit.value = "", c += "</dp>");
    return c + "</dps>"
}

function $pr_build_page_drill_def_b(a, b) {
    var c = null,
        d = "<dps>";
    b && (d += '<dp name="dexp_notes"><selectChoices><selectOption useValue="' + sXmlEncode(b) + '"/></selectChoices></dp>');
    for (var e = 0; e < a.getControls().length; e++) c = a.getControls()[e], 0 < c.getValues().length && (d += '<dp name="' + c["@parameter"] + '">', c.m_oSubmit.value = "", d += "<selectChoices>" + c.preProcess() + "</selectChoices>", c.m_oSubmit.value = "", d += "</dp>");
    return d + "</dps>"
}

function $pr_build_page_drill_def_tmp(a, b) {
    var c = null,
        d = "<dps>";
    b && (d += b);
    for (var e = 0; e < a.getControls().length; e++) c = a.getControls()[e], -1 == c["@parameter"].indexOf("dexp_dbg") && 0 < c.getValues().length && (d += '<dp name="' + c["@parameter"] + '">', c.m_oSubmit.value = "", d += "<selectChoices>" + c.preProcess() + "</selectChoices>", oPromptControl.m_oSubmit.value = "", d += "</dp>");
    return d + "</dps>"
}

function $pr_get_prompt_ifr(a, b) {
    for (var c = null, d = $cog_get_global_object(a.window, "G_PM", "RS"), e = 0; e < d.getControls().length && !(c = d.getControls()[e], c["@parameter"] == b); e++);
    return c
}

function $pr_get_prompt_control_by_manager_and_name(a, b) {
    for (var c = null, d = 0; d < a.getControls().length; d++)
        if (c = a.getControls()[d], c["@parameter"] == b) return c;
    return null
}

function $pr_get_promptcontrol_values(a) {
    var b = [];
    a.m_oSubmit.value = "";
    var c = a.preProcess();
    a.m_oSubmit.value = "";
    if (0 < c.length && (a = $cmn_load_XML_text("<xml> " + c + "</xml>"))) {
        for (var c = a.getElementsByTagName("selectOption"), d = 0; d < c.length; d++) b.push(c[d].getAttribute("displayValue"));
        c = a.getElementsByTagName("selectBoundRange");
        for (d = 0; d < c.length; d++) b.push("between " + c[d].childNodes[0].getAttribute("displayValue") + " and " + c[d].childNodes[1].getAttribute("displayValue"));
        c = a.getElementsByTagName("selectUnboundedEndRange");
        for (d = 0; d < c.length; d++) b.push("greater or equal than " + c[d].childNodes[0].getAttribute("displayValue"));
        c = a.getElementsByTagName("selectUnboundedStartRange");
        for (d = 0; d < c.length; d++) b.push("less or equal than " + c[d].childNodes[0].getAttribute("displayValue"))
    }
    return b.join(", ")
}
Number.formatFunctions = {
    count: 0
};
Number.prototype.NaN = "NaN";
Number.prototype.posInfinity = "Infinity";
Number.prototype.negInfinity = "-Infinity";
Number.prototype.numberFormat = function(a, b) {
    if (isNaN(this)) return Number.prototype.NaNstring;
    if (Infinity == this) return Number.prototype.posInfinity;
    if (-Infinity == this) return Number.prototype.negInfinity;
    null == Number.formatFunctions[a] && Number.createNewFormat(a);
    return this[Number.formatFunctions[a]](b)
};
Number.createNewFormat = function(a) {
    var b = "format" + Number.formatFunctions.count++;
    Number.formatFunctions[a] = b;
    var b = "Number.prototype." + b + " = function(context){\n",
        c = a.split(";");
    switch (c.length) {
        case 1:
            b += Number.createTerminalFormat(a);
            break;
        case 2:
            b += 'return (this < 0) ? this.numberFormat("' + String.escape(c[1]) + '", 1) : this.numberFormat("' + String.escape(c[0]) + '", 2);';
            break;
        case 3:
            b += 'return (this < 0) ? this.numberFormat("' + String.escape(c[1]) + '", 1) : ((this == 0) ? this.numberFormat("' + String.escape(c[2]) +
            '", 2) : this.numberFormat("' + String.escape(c[0]) + '", 3));';
            break;
        default:
            b += "throw 'Too many semicolons in format string';"
    }
    eval(b + "}")
};
Number.createTerminalFormat = function(a) {
    if (0 < a.length && -1 == a.search(/[0#?]/)) return "return '" + String.escape(a) + "';\n";
    var b = "var val = (context == null) ? new Number(this) : Math.abs(this);\n",
        c = !1,
        d = a,
        e = "",
        f = 0,
        g = 0,
        h = 0,
        j = !1,
        l = "";
    if (k = a.match(/\..*(e)([+-]?)(0+)/i)) l = k[1], j = "+" == k[2], h = k[3].length, a = a.replace(/(e)([+-]?)(0+)/i, "");
    var k = a.match(/^([^.]*)\.(.*)$/);
    k && (d = k[1].replace(/\./g, ""), e = k[2].replace(/\./g, ""));
    0 <= a.indexOf("%") && (b += "val *= 100;\n");
    (k = d.match(/(,+)(?:$|[^0#?,])/)) && (b += "val /= " +
    Math.pow(1E3, k[1].length) + "\n;");
    0 <= d.search(/[0#?],[0#?]/) && (c = !0);
    if (k || c) d = d.replace(/,/g, "");
    if (k = d.match(/0[0#?]*/)) f = k[0].length;
    if (k = e.match(/[0#?]*/)) g = k[0].length;
    0 < h ? b += "var sci = Number.toScientific(val," + f + ", " + g + ", " + h + ", " + j + ");\nvar arr = [sci.l, sci.r];\n" : (0 > a.indexOf(".") && (b += "val = (val > 0) ? Math.ceil(val) : Math.floor(val);\n"), b = b + ("var arr = val.round(" + g + ").toFixed(" + g + ").split('.');\n") + ("arr[0] = (val < 0 ? '-' : '') + String.leftPad((val < 0 ? arr[0].substring(1) : arr[0]), " +
    f + ", '0');\n"));
    c && (b += "arr[0] = Number.addSeparators(arr[0]);\n");
    b += "arr[0] = Number.injectIntoFormat(arr[0].reverse(), '" + String.escape(d.reverse()) + "', true).reverse();\n";
    0 < g && (b += "arr[1] = Number.injectIntoFormat(arr[1], '" + String.escape(e) + "', false);\n");
    0 < h && (b += "arr[1] = arr[1].replace(/(\\d{" + g + "})/, '1" + l + "' + sci.s);\n");
    return b + "return arr.join('.');\n"
};
Number.toScientific = function(a, b, c, d, e) {
    var f = {
            l: "",
            r: "",
            s: ""
        },
        g = "",
        h = Math.abs(a).toFixed(b + c + 1).trim("0");
    c = Math.round(new Number(h.replace(".", "").replace(RegExp("(\\d{" + (b + c) + "})(.*)"), "1.$2"))).toFixed(0);
    c = c.length >= b ? c.substring(0, b) + "." + c.substring(b) : c + ".";
    f.s = h.indexOf(".") - h.search(/[1-9]/) - c.indexOf(".");
    0 > f.s && f.s++;
    f.l = (0 > a ? "-" : "") + String.leftPad(c.substring(0, c.indexOf(".")), b, "0");
    f.r = c.substring(c.indexOf(".") + 1);
    0 > f.s ? g = "-" : e && (g = "+");
    f.s = g + String.leftPad(Math.abs(f.s).toFixed(0),
        d, "0");
    return f
};
Number.prototype.round = function(a) {
    if (0 < a) {
        var b = this.toFixed(a + 1).match(RegExp("(-?\\d*).(\\d{" + a + "})(\\d)\\d*$"));
        if (b && b.length) return new Number(b[1] + "." + String.leftPad(Math.round(b[2] + "." + b[3]), a, "0"))
    }
    return this
};
Number.injectIntoFormat = function(a, b, c) {
    var d = 0,
        e = 0,
        f = "",
        g = "-" == a.charAt(a.length - 1);
    for (g && (a = a.substring(0, a.length - 1)); d < b.length && e < a.length && 0 <= b.substring(d).search(/[0#?]/);) b.charAt(d).match(/[0#?]/) ? (f = "-" != a.charAt(e) ? f + a.charAt(e) : f + "0", e++) : f += b.charAt(d), ++d;
    g && e == a.length && (f += "-");
    e < a.length && (c && (f += a.substring(e)), g && (f += "-"));
    d < b.length && (f += b.substring(d));
    return f.replace(/#/g, "").replace(/\?/g, " ")
};
Number.addSeparators = function(a) {
    return a.reverse().replace(/(\d{3})/g, "1,").reverse().replace(/^(-)?,/, "1")
};
String.prototype.reverse = function() {
    for (var a = "", b = this.length; 0 < b; --b) a += this.charAt(b - 1);
    return a
};
String.prototype.trim = function(a) {
    a || (a = " ");
    return this.replace(RegExp("^" + a + "+|" + a + "+$", "g"), "")
};
String.leftPad = function(a, b, c) {
    a = new String(a);
    for (null == c && (c = " "); a.length < b;) a = c + a;
    return a
};
String.escape = function(a) {
    return a.replace(/('|\\)/g, "\\$1")
};

function $DFHashtable() {
    this.hash = [];
    this.keys = [];
    this.location = 0
}
$DFHashtable.prototype.get = function(a) {
    return this.hash[a]
};
$DFHashtable.prototype.put = function(a, b) {
    if (null == b) return null;
    null == this.hash[a] && (this.keys[this.keys.length] = a);
    this.hash[a] = b
};
$DFHashtable.prototype.remove = function(a) {
    if (null == this.hash[a]) return !1;
    this.hash.splice(a, 1);
    for (var b = 0; b < this.keys.length; b++)
        if (this.keys[b] == a) {
            this.keys.splice(b, 1);
            break
        }
    return !0
};
$DFHashtable.prototype.getAllKeys = function() {
    return this.keys
};
$DFHashtable.prototype.clearAll = function() {
    this.hash = [];
    this.keys = []
};
$DFHashtable.prototype.canMoveLeft = function(a) {
    if (null == this.hash[a]) return !1;
    for (var b = 0; b < this.keys.length; b++)
        if (this.keys[b] == a)
            if (0 == b) break;
            else return !0;
    return !1
};
$DFHashtable.prototype.moveLeft = function(a) {
    if (null == this.hash[a]) return -1;
    for (var b = 0; b < this.keys.length; b++)
        if (this.keys[b] == a) {
            if (0 == b) break;
            var c = this.keys[b - 1];
            this.keys[b - 1] = this.keys[b];
            this.keys[b] = c
        }
};
$DFHashtable.prototype.canMoveRight = function(a) {
    if (null == this.hash[a]) return !1;
    for (var b = 0; b < this.keys.length; b++)
        if (this.keys[b] == a)
            if (b == this.keys.length - 1) break;
            else return !0;
    return !1
};
$DFHashtable.prototype.moveRight = function(a) {
    if (null == this.hash[a]) return -1;
    for (var b = 0; b < this.keys.length; b++)
        if (this.keys[b] == a) {
            if (b == this.keys.length - 1) break;
            a = this.keys[b + 1];
            this.keys[b + 1] = this.keys[b];
            this.keys[b] = a;
            break
        }
};
var Aes = {
        Cipher: function(a, b) {
            for (var c = b.length / 4 - 1, d = [
                [],
                [],
                [],
                []
            ], e = 0; 16 > e; e++) d[e % 4][Math.floor(e / 4)] = a[e];
            d = Aes.AddRoundKey(d, b, 0, 4);
            for (e = 1; e < c; e++) d = Aes.SubBytes(d, 4), d = Aes.ShiftRows(d, 4), d = Aes.MixColumns(d, 4), d = Aes.AddRoundKey(d, b, e, 4);
            d = Aes.SubBytes(d, 4);
            d = Aes.ShiftRows(d, 4);
            d = Aes.AddRoundKey(d, b, c, 4);
            c = Array(16);
            for (e = 0; 16 > e; e++) c[e] = d[e % 4][Math.floor(e / 4)];
            return c
        },
        KeyExpansion: function(a) {
            for (var b = a.length / 4, c = b + 6, d = Array(4 * (c + 1)), e = Array(4), f = 0; f < b; f++) d[f] = [a[4 * f], a[4 * f + 1], a[4 * f + 2],
                a[4 * f + 3]
            ];
            for (f = b; f < 4 * (c + 1); f++) {
                d[f] = Array(4);
                for (a = 0; 4 > a; a++) e[a] = d[f - 1][a];
                if (0 == f % b) {
                    e = Aes.SubWord(Aes.RotWord(e));
                    for (a = 0; 4 > a; a++) e[a] ^= Aes.Rcon[f / b][a]
                } else 6 < b && 4 == f % b && (e = Aes.SubWord(e));
                for (a = 0; 4 > a; a++) d[f][a] = d[f - b][a] ^ e[a]
            }
            return d
        },
        SubBytes: function(a, b) {
            for (var c = 0; 4 > c; c++)
                for (var d = 0; d < b; d++) a[c][d] = Aes.Sbox[a[c][d]];
            return a
        },
        ShiftRows: function(a, b) {
            for (var c = Array(4), d = 1; 4 > d; d++) {
                for (var e = 0; 4 > e; e++) c[e] = a[d][(e + d) % b];
                for (e = 0; 4 > e; e++) a[d][e] = c[e]
            }
            return a
        },
        MixColumns: function(a) {
            for (var b =
                0; 4 > b; b++) {
                for (var c = Array(4), d = Array(4), e = 0; 4 > e; e++) c[e] = a[e][b], d[e] = a[e][b] & 128 ? a[e][b] << 1 ^ 283 : a[e][b] << 1;
                a[0][b] = d[0] ^ c[1] ^ d[1] ^ c[2] ^ c[3];
                a[1][b] = c[0] ^ d[1] ^ c[2] ^ d[2] ^ c[3];
                a[2][b] = c[0] ^ c[1] ^ d[2] ^ c[3] ^ d[3];
                a[3][b] = c[0] ^ d[0] ^ c[1] ^ c[2] ^ d[3]
            }
            return a
        },
        AddRoundKey: function(a, b, c, d) {
            for (var e = 0; 4 > e; e++)
                for (var f = 0; f < d; f++) a[e][f] ^= b[4 * c + f][e];
            return a
        },
        SubWord: function(a) {
            for (var b = 0; 4 > b; b++) a[b] = Aes.Sbox[a[b]];
            return a
        },
        RotWord: function(a) {
            for (var b = a[0], c = 0; 3 > c; c++) a[c] = a[c + 1];
            a[3] = b;
            return a
        },
        Sbox: [99,
            124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93,
            25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22
        ],
        Rcon: [
            [0, 0, 0, 0],
            [1, 0, 0, 0],
            [2, 0, 0, 0],
            [4, 0, 0, 0],
            [8, 0, 0, 0],
            [16, 0, 0, 0],
            [32, 0, 0, 0],
            [64, 0, 0, 0],
            [128,
                0, 0, 0
            ],
            [27, 0, 0, 0],
            [54, 0, 0, 0]
        ]
    },
    AesCtr = {
        encrypt: function(a, b, c) {
            if (!(128 == c || 192 == c || 256 == c)) return "";
            a = Utf8.encode(a);
            b = Utf8.encode(b);
            var d = c / 8,
                e = Array(d);
            for (c = 0; c < d; c++) e[c] = isNaN(b.charCodeAt(c)) ? 0 : b.charCodeAt(c);
            e = Aes.Cipher(e, Aes.KeyExpansion(e));
            e = e.concat(e.slice(0, d - 16));
            b = Array(16);
            c = (new Date).getTime();
            var d = Math.floor(c / 1E3),
                f = c % 1E3;
            for (c = 0; 4 > c; c++) b[c] = d >>> 8 * c & 255;
            for (c = 0; 4 > c; c++) b[c + 4] = f & 255;
            d = "";
            for (c = 0; 8 > c; c++) d += String.fromCharCode(b[c]);
            for (var e = Aes.KeyExpansion(e), f = Math.ceil(a.length /
            16), g = Array(f), h = 0; h < f; h++) {
                for (c = 0; 4 > c; c++) b[15 - c] = h >>> 8 * c & 255;
                for (c = 0; 4 > c; c++) b[15 - c - 4] = h / 4294967296 >>> 8 * c;
                var j = Aes.Cipher(b, e),
                    l = h < f - 1 ? 16 : (a.length - 1) % 16 + 1,
                    k = Array(l);
                for (c = 0; c < l; c++) k[c] = j[c] ^ a.charCodeAt(16 * h + c), k[c] = String.fromCharCode(k[c]);
                g[h] = k.join("")
            }
            a = d + g.join("");
            return a = Base64.encode(a)
        },
        decrypt: function(a, b, c) {
            if (!(128 == c || 192 == c || 256 == c)) return "";
            a = Base64.decode(a);
            b = Utf8.encode(b);
            var d = c / 8,
                e = Array(d);
            for (c = 0; c < d; c++) e[c] = isNaN(b.charCodeAt(c)) ? 0 : b.charCodeAt(c);
            e = Aes.Cipher(e,
                Aes.KeyExpansion(e));
            e = e.concat(e.slice(0, d - 16));
            b = Array(8);
            ctrTxt = a.slice(0, 8);
            for (c = 0; 8 > c; c++) b[c] = ctrTxt.charCodeAt(c);
            d = Aes.KeyExpansion(e);
            e = Math.ceil((a.length - 8) / 16);
            c = Array(e);
            for (var f = 0; f < e; f++) c[f] = a.slice(8 + 16 * f, 16 * f + 24);
            a = c;
            for (var g = Array(a.length), f = 0; f < e; f++) {
                for (c = 0; 4 > c; c++) b[15 - c] = f >>> 8 * c & 255;
                for (c = 0; 4 > c; c++) b[15 - c - 4] = (f + 1) / 4294967296 - 1 >>> 8 * c & 255;
                var h = Aes.Cipher(b, d),
                    j = Array(a[f].length);
                for (c = 0; c < a[f].length; c++) j[c] = h[c] ^ a[f].charCodeAt(c), j[c] = String.fromCharCode(j[c]);
                g[f] =
                    j.join("")
            }
            a = g.join("");
            return a = Utf8.decode(a)
        }
    },
    Base64 = {
        code: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function(a, b) {
            var c, d, e, f, g = [],
                h = "",
                j, l, k = Base64.code;
            l = ("undefined" == typeof b ? 0 : b) ? a.encodeUTF8() : a;
            j = l.length % 3;
            if (0 < j)
                for (; 3 > j++;) h += "=", l += "\x00";
            for (j = 0; j < l.length; j += 3) c = l.charCodeAt(j), d = l.charCodeAt(j + 1), e = l.charCodeAt(j + 2), f = c << 16 | d << 8 | e, c = f >> 18 & 63, d = f >> 12 & 63, e = f >> 6 & 63, f &= 63, g[j / 3] = k.charAt(c) + k.charAt(d) + k.charAt(e) + k.charAt(f);
            g = g.join("");
            return g = g.slice(0,
                g.length - h.length) + h
        },
        decode: function(a, b) {
            b = "undefined" == typeof b ? !1 : b;
            var c, d, e, f, g, h = [],
                j, l = Base64.code;
            j = b ? a.decodeUTF8() : a;
            for (var k = 0; k < j.length; k += 4) c = l.indexOf(j.charAt(k)), d = l.indexOf(j.charAt(k + 1)), f = l.indexOf(j.charAt(k + 2)), g = l.indexOf(j.charAt(k + 3)), e = c << 18 | d << 12 | f << 6 | g, c = e >>> 16 & 255, d = e >>> 8 & 255, e &= 255, h[k / 4] = String.fromCharCode(c, d, e), 64 == g && (h[k / 4] = String.fromCharCode(c, d)), 64 == f && (h[k / 4] = String.fromCharCode(c));
            f = h.join("");
            return b ? f.decodeUTF8() : f
        }
    },
    Utf8 = {
        encode: function(a) {
            a = a.replace(/[\u0080-\u07ff]/g,
                function(a) {
                    a = a.charCodeAt(0);
                    return String.fromCharCode(192 | a >> 6, 128 | a & 63)
                });
            return a = a.replace(/[\u0800-\uffff]/g, function(a) {
                a = a.charCodeAt(0);
                return String.fromCharCode(224 | a >> 12, 128 | a >> 6 & 63, 128 | a & 63)
            })
        },
        decode: function(a) {
            a = a.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function(a) {
                a = (a.charCodeAt(0) & 31) << 6 | a.charCodeAt(1) & 63;
                return String.fromCharCode(a)
            });
            return a = a.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function(a) {
                a = (a.charCodeAt(0) & 15) << 12 | (a.charCodeAt(1) & 63) << 6 | a.charCodeAt(2) &
                63;
                return String.fromCharCode(a)
            })
        }
    },
    event_utils = {
        add: function(a, b, c) {
            a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
        }
    };
$IFramePreloader = function(a) {
    try {
        that = this, this.id = a, this.iframe = $cmn_el(a), this.placeholder = this.createPlaceholder()
    } catch (b) {
        error("$IFramePreloader.init()", b.message)
    }
};
$IFramePreloader.prototype = {
    init: function() {
        this.iframe.style.display = "none";
        event_utils.add(this.iframe, "readystatechange", function(a) {
            that.handleLoad(a)
        });
        event_utils.add(this.iframe, "load", function(a) {
            that.handleLoad(a)
        })
    },
    createPlaceholder: function() {
        var a = document.createElement("div");
        a.id = this.id + "-placeholder";
        a.setAttribute("class", "dc_content_body_report_loader");
        a.appendChild(document.createTextNode("Loading ..."));
        var b = this.iframe.parentNode;
        b.lastChild == this.iframe ? b.appendChild(a) : b.insertBefore(a,
            this.iframe.nextSibling);
        return a
    },
    handleLoad: function() {
        "complete" == this.iframe.readyState && (this.iframe.style.display = "block", this.placeholder.style.display = "none")
    }
};
vGLB_TARGET = "";

function $drm_execute_drill_ext_snapshot(a, b, c, d) {
    b = new DFRViewer;
    b.setGateway($df_get_cognos_gateway());
    b.setTarget(d);
    b.setObject(c);
    b.setFormat(a);
    b.launchRV_o()
}

function $drm_execute_drill_ext_recent(a, b, c, d, e, f, g, h, j) {
    b = d;
    !0 == g && (b = "yes");
    g = new DFRViewer;
    g.setGateway($df_get_cognos_gateway());
    g.setTarget(e);
    g.setObject(c);
    g.addParam("run.prompt", "yes" == b);
    g.setFormat(a);
    "" != f && g.addPrompts(f);
    "" != h && g.addPrompts(h);
    "" != j && g.addPrompts(j);
    g.launchRV_o()
}

function $drm_execute_drill_ext_interactive(a, b, c, d, e, f, g, h, j) {
    b = new DFRViewer;
    b.setGateway($df_get_cognos_gateway());
    b.setTarget(e);
    b.setObject(c);
    b.setFormat(a);
    "" != f && b.addPrompts(f);
    "" != h && b.addPrompts(h);
    "" != j && b.addPrompts(j);
    b.launchRV_interactive()
}

function $drm_execute_drill_ext_reportView(a, b, c, d, e, f, g, h, j) {
    b = new DFRViewer;
    b.setGateway($df_get_cognos_gateway());
    b.setTarget(e);
    b.setObject(c);
    b.setFormat(a);
    "" != f && b.addPrompts(f);
    "" != h && b.addPrompts(h);
    "" != j && b.addPrompts(j);
    b.launchRV_rv()
}

function $drm_execute_drill_ext(a, b, c, d, e, f, g, h, j, l) {
    b = d;
    !0 == g && (b = "yes");
    g = new DFRViewer;
    g.setGateway($df_get_cognos_gateway());
    g.setTarget(e);
    try {
        l && "DEMO" == l.$_repType.toUpperCase() ? g.setSpec(l.$_repSpec) : g.setObject(c)
    } catch (k) {
        g.setObject(c)
    }
    g.addParam("run.prompt", "yes" == b);
    g.setFormat(a);
    "" != f && g.addPrompts(f);
    "" != h && g.addPrompts(h);
    "" != j && g.addPrompts(j);
    g.launchRV()
}

function DFRViewer() {
    this.submitForm = null;
    this.host = "";
    this.params = this.path = this.spec = this.target = this.gateway = null
}
DFRViewer.prototype.setHost = function(a) {
    this.host = a;
    0 > this.host.indexOf("http") && (this.host = "http://" + this.host)
};
DFRViewer.prototype.setGateway = function(a) {
    this.gateway = a
};
DFRViewer.prototype.setTarget = function(a) {
    this.target = a
};
DFRViewer.prototype.setSpec = function(a) {
    this.spec = a
};
DFRViewer.prototype.setObject = function(a) {
    this.object = a
};
DFRViewer.prototype.setFormat = function(a) {
    this.format = a
};
DFRViewer.prototype.addParam = function(a, b) {
    this.submitForm || (this.submitForm = document.createElement("form"), this.submitForm.setAttribute("id", "drviewer_form"), document.body.appendChild(this.submitForm));
    $cmn_createFormField(this.submitForm, a, b)
};
DFRViewer.prototype.addPrompts = function(a) {
    $drm_addDrillParamsFormFields(this.submitForm, a)
};
Date.now = Date.now || function() {
    return +new Date
};
DFRViewer.prototype.launchRV = function() {
    this.submitForm || (this.submitForm = document.createElement("form"), document.body.appendChild(this.submitForm));
    this.submitForm.setAttribute("name", "df_rviewer_form");
    this.submitForm.setAttribute("id", "df_rviewer_form");
    this.submitForm.setAttribute("method", "POST");
    this.submitForm.setAttribute("action", this.gateway);
    this.submitForm.setAttribute("target", this.target);
    $cmn_createFormField(this.submitForm, "b_action", "cognosViewer");
    var a;
    try {
        a = Date.now()
    } catch (b) {
        a = +new Date
    }
    $cmn_createFormField(this.submitForm, "curr_time", a);
    $cmn_createFormField(this.submitForm, "p_pDIClient", "true");
    if (this.spec) $cmn_createFormField(this.submitForm, "ui.spec", this.spec), $cmn_createFormField(this.submitForm, "ui.action", "run");
    else if ($cmn_createFormField(this.submitForm, "ui.action", "run"), this.object) {
        a = this.object;
        var c = a.indexOf("defaultOutput(");
        0 <= c && (a = a.substring(c + 14), a = a.substring(0, a.length - 1));
        $cmn_createFormField(this.submitForm, "ui.object", a)
    }
    this.format && $cmn_createFormField(this.submitForm,
        "run.outputFormat", this.format);
    $cmn_createFormField(this.submitForm, "cv.header", "false");
    $cmn_createFormField(this.submitForm, "cv.toolbar", "false");
    this.submitForm.submit();
    document.body.removeChild(this.submitForm)
};
DFRViewer.prototype.launchRV_o = function() {
    this.submitForm || (this.submitForm = document.createElement("form"), document.body.appendChild(this.submitForm));
    this.submitForm.setAttribute("name", "df_rviewer_form");
    this.submitForm.setAttribute("id", "df_rviewer_form");
    this.submitForm.setAttribute("method", "POST");
    this.submitForm.setAttribute("action", this.gateway);
    this.submitForm.setAttribute("target", this.target);
    $cmn_createFormField(this.submitForm, "b_action", "cognosViewer");
    $cmn_createFormField(this.submitForm,
        "ui.action", "view");
    this.spec && $cmn_createFormField(this.submitForm, "ui.spec", this.spec);
    this.object && (0 <= this.object.indexOf("defaultOutput") ? $cmn_createFormField(this.submitForm, "ui.object", this.object) : $cmn_createFormField(this.submitForm, "ui.object", "defaultOutput(" + this.object + ")"));
    this.format && $cmn_createFormField(this.submitForm, "ui.format", this.format);
    $cmn_createFormField(this.submitForm, "cv.header", "false");
    $cmn_createFormField(this.submitForm, "cv.toolbar", "false");
    this.submitForm.submit();
    document.body.removeChild(this.submitForm)
};
DFRViewer.prototype.launchRV_rv = function() {
    this.submitForm || (this.submitForm = document.createElement("form"), document.body.appendChild(this.submitForm));
    this.submitForm.setAttribute("name", "df_rviewer_form");
    this.submitForm.setAttribute("id", "df_rviewer_form");
    this.submitForm.setAttribute("method", "POST");
    this.submitForm.setAttribute("action", this.gateway);
    this.submitForm.setAttribute("target", this.target);
    $cmn_createFormField(this.submitForm, "b_action", "cognosViewer");
    $cmn_createFormField(this.submitForm,
        "ui.action", "view");
    this.spec && $cmn_createFormField(this.submitForm, "ui.spec", this.spec);
    this.object && (0 <= this.object.indexOf("defaultOutput") ? $cmn_createFormField(this.submitForm, "ui.object", this.object) : $cmn_createFormField(this.submitForm, "ui.object", "defaultOutput(" + this.object + ")"));
    this.format && $cmn_createFormField(this.submitForm, "ui.format", this.format);
    $cmn_createFormField(this.submitForm, "cv.header", "false");
    $cmn_createFormField(this.submitForm, "cv.toolbar", "false");
    this.submitForm.submit();
    document.body.removeChild(this.submitForm);
    jQuery("#" + this.target).show()
};
DFRViewer.prototype.launchRV_interactive = function() {
    var a = this.object;
    if (this.object) {
        var b = a.indexOf("defaultOutput(");
        0 <= b && (a = a.substring(b + 14), a = a.substring(0, a.length - 1))
    }
    a = this.gateway + "?b_action=cognosViewer&ui.action=run&ui.object=" + encodeURIComponent(a);
    console.log(a);
    jQuery.ajax({
        url: a,
        async: !1,
        success: function(a) {
            console.log(a)
        },
        error: function(a) {
            dcLog.error("Error. ", a.getMessage())
        }
    })
};
$cmn_createFormField = function(a, b, c) {
    var d = document.createElement("input");
    d.name = b;
    d.value = c;
    a.appendChild(d)
};

function DisplayFormValues(a) {
    for (var b = "", c = 0; c < a.length; c++) b += "<PARAM>", b += "<type>" + a[c].type + "</type>", b += "<name>" + a[c].name + "</name>", b += "<value>" + a[c].value + "<value>", b += "</PARAM>";
    return b
}

function $drm_addDrillParamsFormFields(a, b) {
    try {
        for (var c = $cmn_load_XML_text("<drill>" + b + "</drill>").getElementsByTagName("dp"), d = 0; d < c.length; ++d) {
            var e = c[d],
                f = XMLBuilderSerializeNode(e.childNodes[0]);
            $cmn_createFormField(a, "p_" + e.getAttribute("name"), f)
        }
    } catch (g) {}
}

function sXmlDecodeParser(a, b) {
    var c = a;
    switch (b) {
        case "amp":
            c = "&";
            break;
        case "lt":
            c = "<";
            break;
        case "gt":
            c = ">";
            break;
        case "quot":
            c = '"';
            break;
        case "apos":
            c = "'"
    }
    return c
}

function sXmlEncode(a) {
    var b = new String(a);
    "0" == b || null != a && !1 != a ? (b = b.replace(/&/g, "&amp;"), b = b.replace(/</g, "&lt;"), b = b.replace(/>/g, "&gt;"), b = b.replace(/"/g, "&quot;"), b = b.replace(/'/g, "&apos;")) : null == a && (b = "");
    return b
}

function sXmlDecode(a) {
    var b = new String(a);
    "0" == b || null != a && !1 != a ? b = b.replace(/&(amp|lt|gt|quot|apos);/g, sXmlDecodeParser) : null == a && (b = "");
    return b
}
var utl_MONTH_NAMES = "January February March April May June July August September October November December Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
    utl_DAY_NAMES = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday Sun Mon Tue Wed Thu Fri Sat".split(" ");

function utl_isInteger(a) {
    for (var b = 0; b < a.length; b++)
        if (-1 == "1234567890".indexOf(a.charAt(b))) return !1;
    return !0
}

function utl_getInt(a, b, c, d) {
    for (; d >= c; d--) {
        var e = a.substring(b, b + d);
        if (e.length < c) break;
        if (utl_isInteger(e)) return e
    }
    return null
}

function XMLBuilderSerializeNode(a) {
    var b = "";
    if ("undefined" != typeof XMLSerializer) try {
        b = (new XMLSerializer).serializeToString(a)
    } catch (c) {
        b = a.xml
    } else "object" == typeof a && "undefined" != typeof a.xml && (b = a.xml);
    return b.replace(/^\s+/g, "").replace(/\s+$/g, "")
}

function showLoadingMessage(a, b, c, d) {
    var e = document.createElement("div");
    e.setAttribute("id", "di_loadingMessageBg");
    e.setAttribute("z-index", "1000");
    e.style.cssText = "visibility: visible; position: absolute; left: 0px; top: 0px; bottom: 0px; right:0px; width:100%; height:100%; filter:alpha(opacity=50); opacity: .5; z-index: 3000; background-color:rgb(0,0,0);";
    document.body.appendChild(e);
    e = document.createElement("div");
    e.setAttribute("id", "di_loadingMessageContnet");
    e.setAttribute("z-index", "2000");
    var f = 200,
        g = 50,
        h = !1;
    "undefined" != typeof b && (f = b);
    "undefined" != typeof c && (g = c);
    "undefined" != typeof d && (h = d);
    e.style.cssText = "position: absolute; width:" + f + "px;height:" + g + "px; left:50%;margin:20px;margin-left:-" + f / 2 + "px; text-align:center; top:50%; margin-top: -" + g / 2 + "px;background-color:#eeeeee; border:1px solid #000; padding:15px; text-align:center;z-index: 3001;filter:alpha(opacity=100)";
    e.innerHTML = "<span class='dc_system_page'>" + a + "</span><br /><img style='margin:5px;' src='dinsight/imgs/controls/ajax-loader.gif' />";
    h && (e.innerHTML += "<br /><span style='text-decoration:underline; cursor: pointer;' onclick='hideLoadingMessage();'>Cancel loading</span>");
    document.body.appendChild(e)
}

function hideLoadingMessage() {
    var a = document.getElementById("di_loadingMessageBg"),
        b = document.getElementById("di_loadingMessageContnet");
    a && b && (document.body.removeChild(b), document.body.removeChild(a))
}

function formatDate(a) {
    a.split(".");
    var b = a.split(" ");
    a = b[1];
    var b = b[0].split("-"),
        c = a.split(":");
    a = new Date;
    a.setFullYear(b[0], b[1] - 1, b[2]);
    a.setHours(c[0]);
    a.setMinutes(c[1]);
    a.setSeconds(c[2]);
    var b = a.getDate(),
        c = a.getMonth() + 1,
        d = a.getFullYear().toString().substring(2, 4),
        e = 12 < a.getHours() ? a.getHours() - 12 : a.getHours(),
        f = 10 > a.getMinutes() ? "0" + a.getMinutes() : a.getMinutes();
    a = 12 < a.getHours() ? "PM" : "AM";
    return formattedDate = c + "/" + b + "/" + d + ", " + e + ":" + f + " " + a
}

function $drm_execute_drill_iframe(a, b, c, d, e) {
    var f = new DFRViewer;
    f.setGateway($df_get_cognos_gateway());
    f.setTarget(c);
    f.setObject(b);
    f.setFormat("HTML");
    f.submitForm = a.createElement("form");
    a.body.appendChild(f.submitForm);
    !0 == d && (b = $df_get_report_context($df_get_last_report_id()), "" != b && f.addPrompts_iframe(a, b), b = $df_get_prompt_context(), "" != b && f.addPrompts_iframe(a, b));
    f.launchRV_iframe(a, e)
}
DFRViewer.prototype.launchRV_iframe = function(a, b) {
    this.submitForm.setAttribute("name", "df_rviewer_form");
    this.submitForm.setAttribute("id", "df_rviewer_form");
    this.submitForm.setAttribute("method", "POST");
    "" != b ? this.submitForm.setAttribute("action", this.gateway + "?" + b) : this.submitForm.setAttribute("action", this.gateway);
    this.submitForm.setAttribute("target", this.target);
    $cmn_createFormField_iframe(a, this.submitForm, "b_action", "cognosViewer");
    $cmn_createFormField_iframe(a, this.submitForm, "ui.action",
        "run");
    $cmn_createFormField_iframe(a, this.submitForm, "run.prompt", "false");
    $cmn_createFormField_iframe(a, this.submitForm, "p_pDIClient", "true");
    this.spec && $cmn_createFormField_iframe(a, this.submitForm, "ui.spec", this.spec);
    if (this.object) {
        var c = this.object,
            d = c.indexOf("defaultOutput(");
        0 <= d && (c = c.substring(d + 14), c = c.substring(0, c.length - 1));
        $cmn_createFormField_iframe(a, this.submitForm, "ui.object", c)
    }
    this.format && $cmn_createFormField_iframe(a, this.submitForm, "run.outputFormat", this.format);
    $cmn_createFormField_iframe(a,
        this.submitForm, "cv.header", "false");
    $cmn_createFormField_iframe(a, this.submitForm, "cv.toolbar", "false");
    this.submitForm.submit();
    a.body.removeChild(this.submitForm)
};
DFRViewer.prototype.addPrompts_iframe = function(a, b) {
    $drm_addDrillParamsFormFields_iframe(a, this.submitForm, b)
};
$cmn_createFormField_iframe = function(a, b, c, d) {
    a = a.createElement("input");
    a.name = c;
    a.value = d;
    b.appendChild(a)
};

function $drm_addDrillParamsFormFields_iframe(a, b, c) {
    try {
        var d = $cmn_load_XML_text("<drill>" + c + "</drill>").getElementsByTagName("dp");
        for (c = 0; c < d.length; ++c) {
            var e = d[c],
                f = XMLBuilderSerializeNode(e.childNodes[0]);
            $cmn_createFormField_iframe(a, b, "p_" + e.getAttribute("name"), f)
        }
    } catch (g) {}
}

function cmnSelectSingleNode(a, b) {
    return document.implementation && document.implementation.createDocument ? a.evaluate(b, a, null, XPathResult.ANY_TYPE, null).iterateNext() : a.selectSingleNode(b)
}

function displayShortLinkPublish(a, b) {
    var c = "",
        d = 550;
    isIE() && (c = '<input type="button" value="' + DC_LANG.get("LABEL_COPY_TO_CLIPBOARD") + '" onclick="copyLink();df_closeAboutDialog();"/>', d = 400);
    parent.display_splash('<div style="height:130px;width:600px; border:solid 1px #A1A1A1;background-color:#FFF;"><div style="position:relative; height: 40px; background-color:#999; color:#FFF; font-size: 18px;"><div style="margin: 10px 0 0 10px; float: left;">' + b + '</div><div style="cursor:pointer; float: right; margin: 10px 10px 0 0;"><img title="Close" onclick="df_closeAboutDialog();" src="' +
    parent.$IMG_ROOT_FOLDER + '/dfa_app/close_button_white.png"/></div></div><div style="position:relative; padding:15px; font-size:12px; color:#fff;margin-top:10px;" align="center"><input type="text" id="sharedURLText" style="width:' + d + 'px;margin-right:10px;" value="' + a + '" />' + c + "</div></div>", 600, 130)
}

function displayShortLink(a, b, c) {
    var d = "",
        e = 550;
    isIE() && (d = '<input type="button" value="' + DC_LANG.get("LABEL_COPY_TO_CLIPBOARD") + '" onclick="copyLink();df_closeAboutDialog();"/>', e = 400);
    jQuery.ajax({
        async: !1,
        url: DINSIGHT_URL,
        cache: !1,
        data: {
            action: "getShortLink",
            link: a
        },
        dataType: "json",
        success: function(a) {
            parent.display_splash('<div style="height: 130px;width:600px; border:solid 1px #999;background-color:#FFF;"><div style="position:relative; height: 40px; background-color:#999; color:#FFF; font-size: 18px;"><div style="margin: 10px 0 0 10px; float: left;">' +
            b + '</div><div style="cursor:pointer; float: right; margin: 10px 10px 0 0;"><img title="Close" onclick="df_closeAboutDialog();" src="' + parent.$IMG_ROOT_FOLDER + '/dfa_app/close_button_white.png"/></div></div><div style="position:relative; padding:20px; font-size:12px; color:#fff;" align="center"><input type="text" id="sharedURLText" style="width:' + e + 'px;margin-right:10px;" value="' + DINSIGHT_URL + a.short_link + '" />' + d + "</div></div>", 600, 130)
        },
        error: function() {
            alert(c)
        }
    })
}

function htmlDecode(a) {
    var b = document.createElement("div");
    b.innerHTML = a;
    return b.childNodes[0].nodeValue
};