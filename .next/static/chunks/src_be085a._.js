(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_be085a._.js", {

"[project]/src/components/FaviconUpdater.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_refresh__.signature();
'use client';
;
const FaviconUpdater = ()=>{
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FaviconUpdater.useEffect": ()=>{
            const favicon = document.getElementById("favicon");
            const updateFavicon = {
                "FaviconUpdater.useEffect.updateFavicon": ()=>{
                    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
                    favicon.href = isDarkMode ? "/mixMv2.svg" : "/mixMv1.svg";
                }
            }["FaviconUpdater.useEffect.updateFavicon"];
            updateFavicon(); // Set favicon on load
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            mediaQuery.addEventListener("change", updateFavicon);
            return ({
                "FaviconUpdater.useEffect": ()=>mediaQuery.removeEventListener("change", updateFavicon)
            })["FaviconUpdater.useEffect"];
        }
    }["FaviconUpdater.useEffect"], []);
    return null;
};
_s(FaviconUpdater, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = FaviconUpdater;
const __TURBOPACK__default__export__ = FaviconUpdater;
var _c;
__turbopack_refresh__.register(_c, "FaviconUpdater");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_be085a._.js.map