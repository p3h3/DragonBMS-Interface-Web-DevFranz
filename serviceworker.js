const serviceWorkerDebug=!1,cacheName="voltaicbms-interface-web-v5.0D",appShellFiles=["index.html","app.webmanifest","Pervitina-Dex.ttf","css/dynamic-style.css","css/fixed-style.css","css/fonts.css","css/index-dark.css","css/index-light.css","css/settings.css","css/colors.css","css/tables.css","css/libraries/coloris.css","css/libraries/simplekeyboard.css","js/ble/bms.js","js/ble/tacho.js","js/dataProcessing/bms_gathering.js","js/dataProcessing/bms_processing.js","js/dataProcessing/tacho_gathering.js","js/dataProcessing/tacho_processing.js","js/dataProcessing/datalogging.js","js/ble/overlay_watchdog.js","js/helpers/color_mode.js","js/helpers/configcalib_processing.js","js/helpers/fileaccess.js","js/helpers/small_functions.js","js/helpers/wakelock.js","js/helpers/tests.js","js/helpers/zoom.js","js/libraries/coloris.js","js/libraries/simplekeyboard.js","js/captureMode.js","js/serviceworker/sw_init.js","js/settings/board-calib.js","js/settings/board-config.js","js/settings/tacho-config.js","js/settings/interface-config.js","js/settings/virtualkeyboard.js","js/settings/export_import.js","js/connection_gui.js","js/dom_element_init.js","js/gauges.js","js/rearrange.js","js/settings_detection.js","js/tilebar.js","img/icon/64x64.png","img/icon/192x192.png","img/icon/256x256.png","img/icon/512x512.png","img/icon/1024x1024.png","img/icon/1500x1500.png","img/off.jpg","img/off-switch.png","img/on-button.png","img/on-switch.jpg"];self.addEventListener("install",s=>{console.log("[Service Worker] Install"),s.waitUntil((async()=>{const s=await caches.open(cacheName);serviceWorkerDebug&&console.log("[Service Worker] Caching all: app shell and content"),appShellFiles.forEach(e=>{s.add(e).catch(s=>console.error(`[Service Worker] can't load ${e} to cache`))})})())}),self.addEventListener("fetch",c=>{c.respondWith((async()=>{var s,e=await caches.match(c.request);return serviceWorkerDebug&&console.log("[Service Worker] Fetching resource: "+c.request.url),e||(e=await fetch(c.request),s=await caches.open(cacheName),serviceWorkerDebug&&console.log("[Service Worker] Caching new resource: "+c.request.url),await s.put(c.request,e.clone()),e)})())}),self.addEventListener("activate",async()=>{await self.clients.claim(),caches.keys().then(s=>Promise.all(s.map(s=>{if(s!==cacheName)return caches.delete(s)})))}),self.addEventListener("message",async s=>{if("SKIP_WAITING"===s.data&&await self.skipWaiting(),"GET_VERSION"===s.data)for(const e of await self.clients.matchAll())e.postMessage({msg:"version",version:cacheName})});