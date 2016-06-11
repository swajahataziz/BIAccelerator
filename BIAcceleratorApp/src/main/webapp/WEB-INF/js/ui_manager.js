/**
 * Created by wajahat on 15/05/2016.
 */
var UIManager = function() {

    var


}

var DCUIEngine = function() {
    var h = {},
        e = new dcTplManager,
        l = [],
        m = [],
        f = "",
        n = "",
        j = "",
        p = null,
        g = !0,
        k = function(a) {
            var b = !1;
            jQuery.ajax({
                url: a,
                async: !1,
                type: "HEAD",
                success: function() {
                    b = !0
                },
                error: function() {
                    b = !1
                }
            });
            return b
        },
        q = function(a) {
            "" == a || null == a || "buttons" in a && DCUIButtonHandler.loadUserButtonPrefs(a.buttons)
        };
    return {
        init: function(a) {
            h = checkBrowserSupported();
            dcLog.debug("Browser info: ", h);
            if ("app" in a) {
                var b = a.app;
                "id" in b && (n = b.id);
                b = a.app;
                "path" in b && (f = b.path);
                b = a.app;
                "currentView" in b && (p = b.currentView);
                b = a.app;
                if ("defaults" in b && (b = b.defaults, "buttons" in b)) {
                    var d = b.buttons;
                    "topbar" in d && DCUIButtonHandler.loadDefaultTopbarButtons(d.topbar);
                    b = b.buttons;
                    "sidebar" in b && DCUIButtonHandler.loadDefaultSidebarButtons(b.sidebar)
                }
                b = a.app;
                "views" in b && DCUIViewHandler.loadViews(b.views);
                b = a.app;
                "skins" in b && DCUISkinHandler.parseSkins(b.skins);
                "defaultSkinId" in b && DCUISkinHandler.setDefaultSkinId(b.defaultSkinId);
                "skinCookiePath" in b && DCUISkinHandler.setCookiePath(b.skinCookiePath);
                "skinCookieLifetime" in b &&
                DCUISkinHandler.setCookieLifetime(b.skinCookieLifetime)
            }
            a = a.userPrefs;
            "displayAnimations" in a && (g = a.displayAnimations);
            "fullScreenMode" in a && DCUIFullscreenHandler.loadFullScreenPrefs(a.fullScreenMode);
            q(a);
            "ui" in a && q(jQuery.parseJSON(a.ui));
            DCUIUtils.init();
            DCUIBuilder.init();
            DCUIPanelHandler.init();
            DCUIButtonHandler.init();
            DCUIDesignModeHandler.init()
        },
        getBrowserSupport: function() {
            return h
        },
        getAppPath: function() {
            return f
        },
        getLibPath: function() {
            return "libs/dataclarity/ui/v2"
        },
        getSkinPath: function() {
            return DCUISkinHandler.getSkinPath()
        },
        getAppId: function() {
            return n
        },
        setAppUrl: function(a) {
            j = a
        },
        getAppUrl: function() {
            return j
        },
        getCurrentViewId: function() {
            return p
        },
        setDisplayAnimations: function(a) {
            g = a
        },
        displayAnimations: function() {
            return g
        },
        setFullScreenMode: function(a) {
            _fullScreenMode = a
        },
        fullScreenMode: function() {
            return _fullScreenMode
        },
        exportUserPrefs: function() {
            return {
                displayAnimations: g
            }
        },
        addBaseTemplate: function(a, b, d) {
            !0 !== d && (d = !1);
            m.push({
                id: a,
                path: b,
                cache: d
            });
            e.registerTpl(a, "libs/dataclarity/ui/v2/" + b, d)
        },
        addAppTemplate: function(a,
                                 b, d) {
            !0 !== d && (d = !1);
            l.push({
                id: a,
                path: b,
                cache: d
            });
            e.registerTpl(a, f + "/" + b, d)
        },
        loadTemplatesForSkin: function(a) {
            var b = DCUISkinHandler.buildSkinPath(a);
            jQuery.each(m, function(a, c) {
                k(b + "/" + c.path) ? (dcLog.debug("template [" + c.id + "] - SKIN"), e.registerTpl(c.id, b + "/" + c.path, c.cache)) : (dcLog.debug("template [" + c.id + "] - BASE"), e.registerTpl(c.id, "libs/dataclarity/ui/v2/" + c.path, c.cache))
            });
            jQuery.each(l, function(a, c) {
                k(b + "/" + c.path) ? (dcLog.debug("template [" + c.id + "] - SKIN"), e.registerTpl(c.id, b + "/" + c.path,
                    c.cache)) : (dcLog.debug("template [" + c.id + "] - APP"), e.registerTpl(c.id, f + "/" + c.path, c.cache))
            })
        },
        buildTemplate: function(a, b) {
            return Mustache.to_html(e.get(a), b)
        },
        loadSkin: function(a) {
            return DCUISkinHandler.loadSkinById(a)
        },
        changeSkin: function(a) {
            return DCUISkinHandler.changeSkin(a)
        },
        buildUI: function(a) {
            DCUISkinHandler.setSkinIdFromCookie();
            DCUIBuilder.build(a)
        },
        refreshUI: function() {
            DCUIBuilder.refreshUI()
        },
        loadCss: function(a) {
            var b = document.createElement("link");
            b.href = a;
            b.rel = "stylesheet";
            b.setAttribute("data-skin-css", !0);
            document.getElementsByTagName("head")[0].appendChild(b)
        },
        unloadCss: function(a) {
            jQuery("link[href='" + a + "']").remove()
        },
        send: function(a, b) {
            var d = jQuery.extend({}, {
                url: j,
                type: "GET",
                dataType: "JSON",
                success: function(a) {
                    dcLog.info("DCUIEngine.send response: ", JSON.stringify(a));
                    "function" == typeof b && b(a)
                },
                error: function(a, b, d) {
                    dcLog.error("error sending: ", d)
                }
            }, a);
            dcLog.info("DCUIEngine.send sData: ", JSON.stringify(d));
            jQuery.ajax(d)
        },
        checkFileExists: k
    }
}();