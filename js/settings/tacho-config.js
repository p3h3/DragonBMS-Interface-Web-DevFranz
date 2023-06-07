import gui_elements from"../gui_elements";import sf from"../helpers/small_functions";export default class tachoConfig extends gui_elements{tempSensorType;divider_r;ntc_r;ntc_b;impulses;reversed;backwards_negative;motor_poles;initialised=!1;initialPulseValue=0;currentPulseValue=0;constructor(e){super(),this.initialised=!1,this.tachoObj=e,this.#blurAppropriateTempFields(),this.#setStandardNTCValues()}addEventListeners(){this.tempSensorSelector.addEventListener("change",()=>{this.#blurAppropriateTempFields(),this.#setStandardNTCValues()}),sf.getId("resetPulses").addEventListener("click",e=>{this.initialPulseValue=this.currentPulseValue}),sf.getId("calculatedistperpulse").addEventListener("click",()=>{this.#calculateDistancePerPulse()}),sf.getId("inline-config-write").addEventListener("click",()=>{this.readInGUIElements(),this.tachoObj.inlineConfigCharacteristic.writeValue(Uint8Array.from(this.getBuffer()).buffer).then(()=>{this.indicateSuccess(3e3),console.log("successfully wrote config"),setTimeout(()=>{this.readInlineConfig(()=>{})},200)}).catch(e=>{this.indicateFailure()})}),sf.getId("inline-config-read").addEventListener("click",()=>{this.readInlineConfig(()=>{this.indicateSuccess(500)})}),this.tachoResetTripOdoButton.addEventListener("click",()=>{this.tachoObj.inlineOdometerCharacteristic.writeValueWithoutResponse(Uint8Array.from([1]).buffer).catch(e=>{console.log("failed to reset trip odometer")})}),this.tachoResetVehicleOdoButton.addEventListener("click",()=>{this.tachoObj.inlineOdometerCharacteristic.writeValueWithoutResponse(Uint8Array.from([2]).buffer).catch(e=>{console.log("failed to reset vehicle odometer")})})}readInlineConfig(t){this.tachoObj.inlineConfigCharacteristic.readValue().then(e=>{this.readInBuffer(e),this.setGUIElements(),t()}).catch(e=>{this.indicateFailure()})}indicateSuccess(e){this.inlineConfigContainer.classList.add("success"),setTimeout(()=>{this.inlineConfigContainer.classList.remove("success")},e)}indicateFailure(){this.inlineConfigContainer.classList.add("fault"),setTimeout(()=>{this.inlineConfigContainer.classList.remove("fault")},2e3)}#blurAppropriateTempFields(){var e=this.tempSensorSelector.options[this.tempSensorSelector.selectedIndex].value;if("ntc_custom"!==e&&"ptc_custom"!==e){var t=document.getElementsByClassName("customTempInput");for(let e=0;e<t.length;e++)t[e].style.opacity="0.5",t[e].style.pointerEvents="none"}else{var s=document.getElementsByClassName("customTempInput");for(let e=0;e<s.length;e++)s[e].style.opacity="1",s[e].style.pointerEvents=""}}#setStandardNTCValues(){var e=this.tempSensorSelector.options[this.tempSensorSelector.selectedIndex].value;"ntc10k"===e?(sf.getId("r-value").value="29400",sf.getId("b-value").value="3460"):"ntc100k"===e?(sf.getId("r-value").value="350000",sf.getId("b-value").value="4334"):(sf.getId("r-value").value="",sf.getId("b-value").value="")}#checkInlineConfigPlausibility(){sf.setValueBacktoBoundaries("battery-cells",4,30),sf.setValueBacktoBoundaries("battery-capacity",0,1e7),sf.setValueBacktoBoundaries("max-cell-voltage",2e3,5e3),sf.setValueBacktoBoundaries("min-cell-voltage",2e3,5e3),sf.setValueBacktoBoundaries("strand-max-imbalance-current",0,100),sf.setValueBacktoBoundaries("strand-max-current",1,300),sf.setValueBacktoBoundaries("power-max-temp",30,90),sf.setValueBacktoBoundaries("logic-max-temp",30,90),sf.setValueBacktoBoundaries("precharge-current-limit",1,50),sf.setValueBacktoBoundaries("load-capacitance",1,1e5),sf.setValueBacktoBoundaries("datalogging-update-interval",20,255),sf.setValueBacktoBoundaries("auto-poweroff",30,90)}#getTempSensorType(){var e=sf.getId("ntc-type-select").value;return"kty83"===e?1:"kty84"===e?2:0}#setTempSensorType(e){1===e&&(sf.getId("ntc-type-select").value="kty83"),2===e&&(sf.getId("ntc-type-select").value="kty84"),0===e&&(sf.getId("ntc-type-select").value="ntc_custom"),this.#blurAppropriateTempFields(),this.#setStandardNTCValues()}readInBuffer(e){this.tempSensorType=e.getUint8(0),this.divider_r=e.getUint8(2)<<8|e.getUint8(1),this.ntc_r=e.getUint8(4)<<8|e.getUint8(3),this.ntc_b=e.getUint8(6)<<8|e.getUint8(5),this.impulses=e.getUint8(8)<<8|e.getUint8(7),this.reversed=e.getUint8(9),this.backwards_negative=e.getUint8(10),this.motor_poles=e.getUint8(11);try{this.dataLoggingUpdateInterval=e.getUint8(15)<<8|e.getUint8(14)}catch(e){e.constructor===RangeError&&console.log("[inline config] fw doesn't support dl_update_interval")}this.initialised=!0}readInGUIElements(){this.tempSensorType=this.#getTempSensorType(),this.ntc_r=sf.getIdValue("r-value")/10,this.divider_r=sf.getIdValue("r-value-divider")/10,this.ntc_b=parseInt(sf.getIdValue("b-value")),this.reversed=sf.getIdChecked("reversed"),this.backwards_negative=sf.getIdChecked("back-neg"),this.impulses=parseInt(sf.getIdValue("distperpulse")),this.motor_poles=parseInt(sf.getIdValue("motor-poles")),this.inlineConfigDataLoggingFrequency.disabled||(this.dataLoggingUpdateInterval=1e3/this.inlineConfigDataLoggingFrequency.value)}getBuffer(){var e;if(this.initialised)return(e=[])[0]=parseInt(this.tempSensorType),e[1]=sf.to16bit(this.divider_r)[0],e[2]=sf.to16bit(this.divider_r)[1],e[3]=sf.to16bit(this.ntc_r)[0],e[4]=sf.to16bit(this.ntc_r)[1],e[5]=sf.to16bit(this.ntc_b)[0],e[6]=sf.to16bit(this.ntc_b)[1],e[7]=sf.to16bit(this.impulses)[0],e[8]=sf.to16bit(this.impulses)[1],e[9]=this.reversed,e[10]=this.backwards_negative,e[11]=this.motor_poles,void 0!==this.dataLoggingUpdateInterval?(e[15]=sf.to16bit(this.dataLoggingUpdateInterval)[0],e[14]=sf.to16bit(this.dataLoggingUpdateInterval)[1],e[12]=0,e[13]=0):console.log("[tacho config] fw doesn't support dl_update_interval"),e}setGUIElements(){this.#setTempSensorType(this.tempSensorType),sf.getId("r-value").value=10*this.ntc_r,sf.getId("r-value-divider").value=10*this.divider_r,sf.getId("b-value").value=this.ntc_b,sf.getId("reversed").checked=this.reversed,sf.getId("back-neg").checked=this.backwards_negative,sf.getId("distperpulse").value=this.impulses,sf.getId("motor-poles").value=this.motor_poles,void 0!==this.dataLoggingUpdateInterval?(this.inlineConfigDataLoggingFrequency.disabled=!1,sf.getId("inline-dl-frequency").value=this.dataLoggingUpdateInterval):this.inlineConfigDataLoggingFrequency.disabled=!0}updatePulseCount(e){this.currentPulseValue=e,sf.getId("pulses").innerHTML=String(parseFloat(e)-this.initialPulseValue)}#calculateDistancePerPulse(){var e=parseFloat(sf.getId("pulses").innerHTML),t=parseFloat(sf.getId("distance").value);0===e?(sf.getId("pulses").style.color="red",setTimeout(()=>{sf.getId("pulses").style.color=""},500)):sf.getId("distperpulse").value=Math.abs(Math.round(10*t/e))}}