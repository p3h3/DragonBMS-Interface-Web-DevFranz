export default class wakeLock{wakeLockObj=null;constructor(){}handleVisibilityChange(){null!==this.wakeLockObj&&"visible"===document.visibilityState&&this.enable()}enable(){document.addEventListener("visibilitychange",()=>{this.handleVisibilityChange()}),document.addEventListener("fullscreenchange",()=>{this.handleVisibilityChange()}),"keepAwake"in screen?screen.keepAwake=!0:"wakeLock"in navigator&&navigator.wakeLock.request("screen").then(e=>{this.wakeLockObj=e}).catch(e=>{console.error(e)})}disable(){document.removeEventListener("visibilitychange",()=>{this.handleVisibilityChange()}),document.removeEventListener("fullscreenchange",()=>{this.handleVisibilityChange()}),"keepAwake"in screen?screen.keepAwake=!1:"wakeLock"in navigator&&this.wakeLockObj&&(this.wakeLockObj.release(),this.wakeLockObj=null)}}