import gui_elements from"../gui_elements";export default class colorMode extends gui_elements{mode="dark";constructor(t){super(),this.interfaceConfigObj=t,this.addEventListeners()}addEventListeners(){document.addEventListener("coloris:pick",t=>{this.mode="custom",localStorage.setItem("customColorForeground",this.getCustomForegroundColor()),localStorage.setItem("customColorBackground",this.getCustomBackgroundColor()),localStorage.setItem("customColorAccent",this.getCustomAccentColor()),localStorage.setItem("customColorCaptureModeBackground",this.getCustomCaptureModeBackgroundColor()),localStorage.setItem("lastColorMode",this.mode),this.interfaceConfigObj.updateConfig(),this.adjust(this.interfaceConfigObj.colorMode)})}toggle(){"dark"===this.mode?this.mode="light":"light"===this.mode?this.mode="custom":"custom"===this.mode&&(this.mode="dark"),localStorage.setItem("lastColorMode",this.mode),this.adjust(this.mode)}adjust(t){switch(t){case"light":document.getElementsByTagName("link")[1].href="css/index-light.css";break;case"dark":document.getElementsByTagName("link")[1].href="css/index-dark.css";break;case"custom":document.getElementsByTagName("link")[1].href="";break;default:document.getElementsByTagName("link")[1].href="css/index-dark.css"}document.getElementById("interface-foreground-color").parentNode.style.color=this.interfaceConfigObj.customColorForeground,document.getElementById("interface-background-color").parentNode.style.color=this.interfaceConfigObj.customColorBackground,document.getElementById("interface-accent-color").parentNode.style.color=this.interfaceConfigObj.customColorAccent,document.getElementById("capture-mode-background-color").parentNode.style.color=this.interfaceConfigObj.customColorCaptureModeBackground;var t=this.interfaceConfigObj.customColorForeground,o=this.interfaceConfigObj.customColorBackground,e=this.interfaceConfigObj.customColorAccent,r=this.interfaceConfigObj.customColorCaptureModeBackground,e=(this.domRoot.style.setProperty("--background-color",o),this.domRoot.style.setProperty("--text-color",t),this.domRoot.style.setProperty("--accent-color",e),this.domRoot.style.setProperty("--capture-mode-background-color",r),this.domRoot.style.setProperty("--color-good","green"),this.domRoot.style.setProperty("--color-bad","red"),this.domRoot.style.setProperty("--color-warning","orange"),new color(o)),r=(e.scale(.7),this.domRoot.style.setProperty("--tilebar-background-color",e.getString()),new color(o)),e=(e.scale(1.2),this.domRoot.style.setProperty("--dropdown-background-color",r.getString()),new color(o)),r=(e.contrast(.5),this.domRoot.style.setProperty("--gauge-div-border-color",e.getString()),new color(o)),e=(r.contrast(.5),this.domRoot.style.setProperty("--main-table-grid-color",r.getString()),new color(o)),r=(e.contrast(.5),this.domRoot.style.setProperty("--config-input-background-color",e.getString()),new color(t)),e=(r.scale(1),this.domRoot.style.setProperty("--config-input-text-color",r.getString()),new color(o));e.scale(1.5),e.a=.7,this.domRoot.style.setProperty("--nothing-connected-overlay-background-color",e.getString())}getCustomForegroundColor(){return document.getElementById("interface-foreground-color").parentNode.style.color}getCustomBackgroundColor(){return document.getElementById("interface-background-color").parentNode.style.color}getCustomAccentColor(){return document.getElementById("interface-accent-color").parentNode.style.color}getCustomCaptureModeBackgroundColor(){return document.getElementById("capture-mode-background-color").parentNode.style.color}}class color{constructor(t){t.includes("rgb")||console.log("fuck hex colors");t=t.replaceAll(" ","").replaceAll("rgb","").replaceAll("a","").replaceAll("(","").replaceAll(")","").split(",");this.r=parseInt(t[0]),this.g=parseInt(t[1]),this.b=parseInt(t[2]),4===t.length?this.a=parseFloat(t[3]):this.a=1}scale(t){this.r+=Math.floor((1-t)*this.r),this.g+=Math.floor((1-t)*this.g),this.b+=Math.floor((1-t)*this.b),this.containInLimits()}contrast(t){this.r+=Math.floor(t*(128-this.r)),this.g+=Math.floor(t*(128-this.g)),this.b+=Math.floor(t*(128-this.b)),this.containInLimits()}containInLimits(){255<this.r&&(this.r=255),255<this.g&&(this.g=255),255<this.b&&(this.b=255),this.r<0&&(this.r=0),this.g<0&&(this.g=0),this.b<0&&(this.b=0)}getString(){return"rgba("+this.r+","+this.g+","+this.b+","+this.a+")"}}