let windowLoaded=!1;function invokeServiceWorkerUpdateFlow(e){confirm("The deployment has a newer interface version. Would you like to update now?Note: to apply the update, after pressing ok, please close and reopen the app.")&&e.waiting&&e.waiting.postMessage("SKIP_WAITING")}window.onload=function(){windowLoaded=!0},navigator.serviceWorker.ready.then(async e=>{e.active&&(await until(e=>windowLoaded),e.active.postMessage("GET_VERSION"))}),navigator.serviceWorker.addEventListener("message",e=>{"version"===e.data.msg&&(e=e.data.version.split("-v")[1],setValueTexts(interfaceVersionFields,e))}),"serviceWorker"in navigator&&window.addEventListener("load",async()=>{const e=await navigator.serviceWorker.register("serviceworker.js");e.waiting&&invokeServiceWorkerUpdateFlow(e),e.addEventListener("updatefound",()=>{e.installing&&e.installing.addEventListener("statechange",()=>{e.waiting&&(navigator.serviceWorker.controller?invokeServiceWorkerUpdateFlow(e):console.log("Service Worker initialized for the first time"))})});let i=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{i||(window.location.reload(),i=!0)})});