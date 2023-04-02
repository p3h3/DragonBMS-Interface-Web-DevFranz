function swap(e,t){var n=t.nextElementSibling,o=t.parentNode;n===e?swap(t,e):(e.replaceWith(t),o.insertBefore(e,n))}function until(e){const n=t=>{e()?t():setTimeout(e=>n(t),100)};return new Promise(n)}function isScrolledIntoViewWithKeyboard(e){var t;return!isElementHidden(e)&&(t=(e=e.getBoundingClientRect()).top,e=e.bottom,t<window.innerHeight-265)&&0<=e}function isScrolledIntoView(e){var t;return!isElementHidden(e)&&(t=(e=e.getBoundingClientRect()).top,e=e.bottom,t<window.innerHeight)&&0<=e}function isElementHidden(e){for(;void 0!==e&&e!==document&&!e.classList.contains("hidden");)e=e.parentNode;return e!==document}function to16bit(e){if(!(65536<=e))return[e%256,Math.floor(e/256)]}function handleSignedBullshit(e){return e>Math.pow(2,15)?Math.pow(2,16)-e:-e}function handleSignedBullshit32(e){return e>Math.pow(2,31)?Math.pow(2,32)-e:-e}function handleUnsignedBullshit32(e){return e<0?Math.pow(2,32)+e:e}function handleSignedBullshit64(e){return e>Math.pow(2,63)?Math.pow(2,64)-e:-e}function getId(e){return document.getElementById(e)}function getIdValue(e){return document.getElementById(e).value}function getIdChecked(e){return document.getElementById(e).checked}function setValueBacktoBoundaries(e,t,n){var e=document.getElementById(e),o=parseFloat(e.value);o<t?(e.value=t,e.style.color="red"):n<o?(e.value=n,e.style.color="red"):e.style.color=""}function arraysEqual(e,t){if(e!==t){if(null==e||null==t)return!1;if(e.length!==t.length)return!1;for(var n=0;n<e.length;++n)if(e[n]!==t[n])return!1}return!0}function objectsEqual(t,n){var o=Object.getOwnPropertyNames(t),e=Object.getOwnPropertyNames(n);if(o.length!==e.length)return!1;for(let e=0;e<o.length;e++){var r=t[o[e]],i=n[o[e]],a=isObject(r)&&isObject(i);if(a&&!objectsEqual(r,i)||!a&&r!==i)return!1}return!0}function isObject(e){return null!=e&&"object"==typeof e}function mobileDevice(){return navigator.userAgentData.mobile}let isChrome=!1;"undefined"!=typeof window&&(isChrome=!!window.chrome);const mod=(e,t)=>(t+e%t)%t,cap=(e,t,n)=>t+mod(e-t,n-t+1);function isTouchDevice(){return"ontouchstart"in window||0<navigator.maxTouchPoints}function getDateStamp(){var e=new Date;return e.getFullYear().toString()+"_"+pad2(e.getMonth()+1)+"_"+pad2(e.getDate())+"__"+pad2(e.getHours())+"_"+pad2(e.getMinutes())+"_"+pad2(e.getSeconds())}function getTimeStamp(){var e=new Date;return e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()+"."+e.getMilliseconds()}function getMsToday(){var e=new Date;return 3600*(e.getHours()-2)*1e3+60*e.getMinutes()*1e3+1e3*e.getSeconds()+e.getMilliseconds()}function getUnixTime(){return Date.now()}function averagedArray(t,n){let o=[],r=[];return t.forEach(e=>{e.map(Number).forEach((e,t)=>{o[t]?o[t]+=e:o[t]=e})}),o.forEach(e=>{r.push((e/t.length).toFixed(n))}),r}function averagedData(e,t){if(0!==e.length){let o={...e[0]};for(var[n,r]of Object.entries(o))o[n]=0;e.forEach(e=>{for(var[t,n]of Object.entries(e))o[t]=o[t]+n});var i,a,u={...e[0]};for([i,a]of Object.entries(u))u[i]=(o[i]/e.length).toFixed(t);return u}}function averagedDataNumbers(e){if(0!==e.length){let o={...e[0]};for(var[t,n]of Object.entries(o))o[t]=0;e.forEach(e=>{for(var[t,n]of Object.entries(e))o[t]=o[t]+n});var r,i,a={...e[0]};for([r,i]of Object.entries(a))a[r]=o[r]/e.length;return a}}function pad2(e){return e<10?"0"+e:e}function getLastXSeconds(e,t){let n=Date.now();return e.filter(e=>e.time>n-1e3*t)}function setValueTexts(e,t){for(const n of e)n.classList.contains("disabled")||(n.innerHTML=t)}function classListValueTextsAdd(e,t){for(const n of e)n.classList.add(t)}function classListValueTextsRemove(e,t){for(const n of e)n.classList.remove(t)}function setValueValues(e,t){for(const n of e)n.value=t}function scrollToElement(e){var t=document.body.getBoundingClientRect(),e=e.getBoundingClientRect().top-t.top;window.scrollTo(0,e)}function deleteOlderDataPackets(e,t){var n;e.length<2||(n=Date.now(),e.at(-1).time<n-1e3*t&&(e.pop(),deleteOlderDataPackets(e,t)))}