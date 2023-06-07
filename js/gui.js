import gui_elements from"./gui_elements";import sf from"./helpers/small_functions";export default class gui extends gui_elements{turnOnTdMoveStart={x:0,y:0};constructor(){super()}initBmsObj(e){this.bmsObj=e}inlineConnected(){this.inlineGaugeDiv.classList.remove("inline-gauge-disabled"),this.connectTachoOverlay.classList.add("hidden"),void 0!==this.serviceInitDoneCB&&null!==this.serviceInitDoneCB&&this.serviceInitDoneCB()}inlineDisconnected(){this.inlineGaugeDiv.classList.add("inline-gauge-disabled"),this.connectTachoOverlay.classList.remove("hidden")}resetAutoconnectBMS(){this.autoConnectBMSError(),setTimeout(()=>{sf.setValueTexts(this.autoConnectBMSTexts,"Connect</br>BMS"),sf.classListValueTextsRemove(this.autoConnectBMSTexts,"fault")},1e3)}autoConnectBMSError(){this.autoconnectingBMSText.classList.add("hidden"),this.autoconnectingBMSText.style.position="",sf.setValueTexts(this.autoConnectBMSTexts,"Didn't</br>work"),sf.classListValueTextsAdd(this.autoConnectBMSTexts,"fault")}setAutoconnectBMSText(e){this.autoconnectingBMSText.style.position="inherit",this.autoconnectingBMSText.classList.remove("hidden"),sf.setValueTexts(this.autoConnectBMSTexts,e)}resetAutoconnectBMSSilentInstant(){this.autoconnectingBMSText.classList.add("hidden"),this.autoconnectingBMSText.style.position="",sf.setValueTexts(this.autoConnectBMSTexts,"Connect</br>BMS"),sf.classListValueTextsRemove(this.autoConnectBMSTexts,"fault")}resetAutoconnectTacho(){this.autoconnectTachoError(),setTimeout(()=>{sf.setValueTexts(this.autoConnectTachoTexts,"Connect</br>Tacho"),sf.classListValueTextsRemove(this.autoConnectTachoTexts,"fault")},1e3)}resetAutoconnectTachoSilentInstant(){this.autoconnectingTachoText.classList.add("hidden"),this.autoconnectingTachoText.style.position="",sf.setValueTexts(this.autoConnectTachoTexts,"Connect</br>Tacho"),sf.classListValueTextsRemove(this.autoConnectTachoTexts,"fault")}autoconnectTachoError(){this.autoconnectingTachoText.classList.add("hidden"),this.autoconnectingTachoText.style.position="",sf.setValueTexts(this.autoConnectTachoTexts,"Didn't</br>work"),sf.classListValueTextsAdd(this.autoConnectTachoTexts,"fault")}setAutoconnectTachoText(e){this.autoconnectingTachoText.style.position="inherit",this.autoconnectingTachoText.classList.remove("hidden"),sf.setValueTexts(this.autoConnectTachoTexts,e)}initTachoObj(e){this.tachoObj=e}addGUIEventListeners(){this.clearAlertsButton.addEventListener("click",()=>{this.bmsObj.clearAlerts(0,"")}),this.boardConfigTurnOnButton.addEventListener("click",()=>{this.boardConfigTurnOnButton.innerHTML.includes("ON")&&(this.boardConfigTurnOnButton.classList.add("button-orange"),this.bmsObj.turnOnCharacteristic.writeValue(Uint8Array.from([1]).buffer).then(e=>{this.boardConfigTurnOnButton.classList.remove("button-orange")}).catch(e=>{console.log("failed to turn on")})),this.boardConfigTurnOnButton.innerHTML.includes("OFF")&&(this.boardConfigTurnOnButton.classList.add("button-orange"),this.bmsObj.turnOnCharacteristic.writeValue(Uint8Array.from([0]).buffer).then(e=>{this.boardConfigTurnOnButton.classList.remove("button-orange")}).catch(e=>{console.log("failed to turn off")}))}),this.boardCalibTurnOnButton.addEventListener("click",()=>{this.boardCalibTurnOnButton.innerHTML.includes("ON")&&(this.boardCalibTurnOnButton.classList.add("button-orange"),this.bmsObj.turnOnCharacteristic.writeValue(Uint8Array.from([1]).buffer).then(e=>{this.boardCalibTurnOnButton.classList.remove("button-orange")}).catch(e=>{console.log("failed to turn on")})),this.boardCalibTurnOnButton.innerHTML.includes("OFF")&&(this.boardCalibTurnOnButton.classList.add("button-orange"),this.bmsObj.turnOnCharacteristic.writeValue(Uint8Array.from([0]).buffer).then(e=>{this.boardCalibTurnOnButton.classList.remove("button-orange")}).catch(e=>{console.log("failed to turn off")}))}),this.turnOnTd.addEventListener("mousedown",this.turnOnTdPressed.bind(this)),this.turnOnTd.addEventListener("touchstart",this.turnOnTdPressed.bind(this)),this.turnOnTd.addEventListener("touchmove",this.turnOnTdMoved.bind(this)),this.turnOnTd.addEventListener("mouseup",this.turnOnTdReleased.bind(this)),this.turnOnTd.addEventListener("touchend",this.turnOnTdReleased.bind(this)),this.resetEconomyButton.addEventListener("click",()=>{console.log("new session values for economy!"),this.tachoObj.tachoDataProcessor.drivenDistanceOffset=-1}),this.resetTripButton.addEventListener("click",()=>{this.tachoObj.inlineOdometerCharacteristic.writeValueWithoutResponse(Uint8Array.from([1]).buffer).then(()=>{this.tachoObj.tachoDataProcessor.drivenDistanceOffset=-1}).catch(e=>{console.log("failed to reset trip odometer")})});for(var e of this.hideSettingButtons)e.addEventListener("click",()=>{this.table.scrollIntoView({behavior:"smooth"}),this.hideAllSettings()})}hideAllSettings(){this.boardCalibContainer.classList.add("hidden"),this.boardConfigContainer.classList.add("hidden"),this.inlineConfigContainer.classList.add("hidden"),this.boardInfoContainer.classList.add("hidden"),this.interfaceSettingsContainer.classList.add("hidden")}updateConfigRelatedGauges(e){sf.setValueTexts(this.bmsConfigStartupValues,e.boardAutoStart?"Autostart":"manual Start"),sf.setValueTexts(this.bmsConfigOverVoltageValues,String(e.packOverVoltage)+"V"),sf.setValueTexts(this.bmsConfigUnderVoltageValues,String(e.packUnderVoltage)+"V"),sf.setValueTexts(this.bmsConfigOverTempValues,String(Math.min(e.protMaxLogicTemp,e.protMaxPowerTemp))+"°C");let t=0;1&e.boardEnabledChannels?(document.getElementById("channel-info-1").classList.remove("disabled"),t++):document.getElementById("channel-info-1").classList.add("disabled"),2&e.boardEnabledChannels?(document.getElementById("channel-info-2").classList.remove("disabled"),t++):document.getElementById("channel-info-2").classList.add("disabled"),4&e.boardEnabledChannels?(document.getElementById("channel-info-3").classList.remove("disabled"),t++):document.getElementById("channel-info-3").classList.add("disabled"),sf.setValueTexts(this.bmsConfigUnderCurrentValues,String(.01*e.protMaxReverseCurrent*t)+"A"),sf.setValueTexts(this.bmsConfigOverCurrentValues,String(.01*e.protMaxCurrent*t)+"A"),sf.setValueTexts(this.bmsCh1TypeValues,e.battCellCount+"S"),sf.setValueTexts(this.bmsCh2TypeValues,e.battCellCount+"S"),sf.setValueTexts(this.bmsCh3TypeValues,e.battCellCount+"S")}setBMSState(e){let t;switch(e){case 0:t="Startup";break;case 1:t="Precharging...";break;case 2:t="Ready";break;case 4:t="Fault";break;case 3:t="Operation",sf.classListValueTextsAdd(this.bmsStateMachineStateValues,"success");break;default:t="UNDEFINED STATE!"}3!==e&&sf.classListValueTextsRemove(this.bmsStateMachineStateValues,"success"),sf.setValueTexts(this.bmsStateMachineStateValues,t)}handleTurnOnTd(e){var t,s=e.stateMachineState;2===s&&(this.elementsDiv.childNodes.forEach(e=>{e===this.turnOnTd&&sf.swap(this.clearAlertsTd,this.turnOnTd)}),this.turnOnButton.innerHTML.includes("ON")||(this.turnOnButton.innerHTML="<h2>Switch ON</h2>")),3===s&&(this.elementsDiv.childNodes.forEach(e=>{e===this.turnOnTd&&sf.swap(this.clearAlertsTd,this.turnOnTd)}),this.turnOnButton.innerHTML.includes("OFF")||(this.turnOnButton.innerHTML="<h2>Switch OFF</h2>")),1===s?(this.elementsDiv.childNodes.forEach(e=>{e===this.turnOnTd&&sf.swap(this.clearAlertsTd,this.turnOnTd)}),this.turnOnButton.innerHTML="<h2>Precharging...</h2>",this.turnOnButton.classList.add("animateLoading"),t=Math.max(e.u1,e.u2,e.u3),e=e.uOut/(t-1),this.turnOnButton.style.backgroundSize=100*e+"% 100%"):(this.turnOnButton.classList.remove("animateLoading"),this.turnOnButton.style.backgroundSize=""),4===s&&this.elementsDiv.childNodes.forEach(e=>{e===this.clearAlertsTd&&sf.swap(this.clearAlertsTd,this.turnOnTd)})}handleConfigWarningButtons(e){3===e?(this.boardConfigTurnOnButton.innerHTML.includes("OFF")||(this.boardConfigTurnOnButton.innerHTML="Turn OFF"),this.boardCalibTurnOnButton.innerHTML.includes("OFF")||(this.boardCalibTurnOnButton.innerHTML="Turn OFF"),this.configWriteWarning.classList.remove("hidden"),this.calibWriteWarning.classList.remove("hidden"),this.boardConfigInputFields.forEach(e=>{e.classList.add("warning")}),this.boardCalibInputFields.forEach(e=>{e.classList.add("warning")})):(this.boardConfigTurnOnButton.innerHTML.includes("ON")||(this.boardConfigTurnOnButton.innerHTML="Turn ON"),this.boardCalibTurnOnButton.innerHTML.includes("ON")||(this.boardCalibTurnOnButton.innerHTML="Turn ON"),this.configWriteWarning.classList.add("hidden"),this.calibWriteWarning.classList.add("hidden"),this.boardConfigInputFields.forEach(e=>{e.classList.remove("warning")}),this.boardCalibInputFields.forEach(e=>{e.classList.remove("warning")}))}turnOnTdPressed(e){try{this.turnOnTdMoveStart.x=e.changedTouches[0].screenX,this.turnOnTdMoveStart.y=e.changedTouches[0].screenY}catch(e){e instanceof TypeError||console.log(e)}this.turnOnButton.innerHTML.includes("ON")&&(this.turnOnButton.classList.add("animateTurnOnButton"),this.turnOnButton.addEventListener("animationend",()=>{this.turnOnButton.classList.add("orange"),this.bmsObj.turnOnCharacteristic.writeValue(Uint8Array.from([1]).buffer).then(()=>{this.turnOnButton.classList.remove("orange")}).catch(e=>{console.log("failed to turn on"+e)}),this.turnOnButton.classList.remove("animateTurnOnButton")})),this.turnOnButton.innerHTML.includes("OFF")&&(this.turnOnButton.classList.add("animateTurnOffButton"),this.turnOnButton.addEventListener("animationend",()=>{this.turnOnButton.classList.add("orange"),this.bmsObj.turnOnCharacteristic.writeValue(Uint8Array.from([0]).buffer).then(()=>{this.turnOnButton.classList.remove("orange")}).catch(e=>{console.log("failed to turn off"+e)}),this.turnOnButton.classList.remove("animateTurnOffButton")}))}turnOnTdMoved(e){var t=this.turnOnTdMoveStart.x-e.changedTouches[0].screenX,e=this.turnOnTdMoveStart.y-e.changedTouches[0].screenY;Math.sqrt(Math.pow(t,2)+Math.pow(e,2))>.01*window.outerHeight&&(this.turnOnButton.classList.remove("animateTurnOnButton"),this.turnOnButton.classList.remove("animateTurnOffButton"))}turnOnTdReleased(){this.turnOnButton.innerHTML.includes("ON")&&this.turnOnButton.classList.remove("animateTurnOnButton"),this.turnOnButton.innerHTML.includes("OFF")&&this.turnOnButton.classList.remove("animateTurnOffButton")}updateBMSNameFields(e){void 0===e?sf.setValueValues(this.deviceNameFields,"too old firmware"):sf.setValueValues(this.deviceNameFields,e)}setBMSCalculatedValues(e){let t=e.iTotal.toFixed(1),s=("-0.0"===t&&(t="0.0"),sf.setValueTexts(this.bmsCombinedCurrentValues,t+"A"),e.pTotal.toFixed(1)),a=("-0.0"===s&&(s="0.0"),sf.setValueTexts(this.bmsCombinedPowerValues,s+"kW"),"");e.pLoss<2?e.pLoss<2&&(a="<2.0"):a=e.pLoss.toFixed(1),sf.setValueTexts(this.bmsPowerLossValues,a+"W"),Math.abs(e.energyUsed.combined/1e3)<200?sf.setValueTexts(this.bmsCombinedEnergyUsedValues,(e.energyUsed.combined/1e3).toFixed(1)+"Wh"):Math.abs(e.energyUsed.combined/1e3)<1e3?sf.setValueTexts(this.bmsCombinedEnergyUsedValues,(e.energyUsed.combined/1e3).toFixed(0)+"Wh"):Math.abs(e.energyUsed.combined/1e3)<2e4?sf.setValueTexts(this.bmsCombinedEnergyUsedValues,(e.energyUsed.combined/1e6).toFixed(1)+"kWh"):sf.setValueTexts(this.bmsCombinedEnergyUsedValues,(e.energyUsed.combined/1e6).toFixed(0)+"kWh"),Math.abs(e.energyUsed.ch1/1e3)<200?sf.setValueTexts(this.bmsCh1EnergyUsedValues,(e.energyUsed.ch1/1e3).toFixed(3)+"Wh"):Math.abs(e.energyUsed.ch1/1e3)<1e3?sf.setValueTexts(this.bmsCh1EnergyUsedValues,(e.energyUsed.ch1/1e3).toFixed(2)+"Wh"):Math.abs(e.energyUsed.ch1/1e3)<1e4?sf.setValueTexts(this.bmsCh1EnergyUsedValues,(e.energyUsed.ch1/1e3).toFixed(1)+"Wh"):Math.abs(e.energyUsed.ch1/1e3)<1e5?sf.setValueTexts(this.bmsCh1EnergyUsedValues,(e.energyUsed.ch1/1e3).toFixed(0)+"Wh"):sf.setValueTexts(this.bmsCh1EnergyUsedValues,(e.energyUsed.ch1/1e6).toFixed(1)+"kWh"),Math.abs(e.energyUsed.ch2/1e3)<200?sf.setValueTexts(this.bmsCh2EnergyUsedValues,(e.energyUsed.ch2/1e3).toFixed(3)+"Wh"):Math.abs(e.energyUsed.ch2/1e3)<1e3?sf.setValueTexts(this.bmsCh2EnergyUsedValues,(e.energyUsed.ch2/1e3).toFixed(2)+"Wh"):Math.abs(e.energyUsed.ch2/1e3)<1e4?sf.setValueTexts(this.bmsCh2EnergyUsedValues,(e.energyUsed.ch2/1e3).toFixed(1)+"Wh"):Math.abs(e.energyUsed.ch2/1e3)<1e5?sf.setValueTexts(this.bmsCh2EnergyUsedValues,(e.energyUsed.ch2/1e3).toFixed(0)+"Wh"):sf.setValueTexts(this.bmsCh2EnergyUsedValues,(e.energyUsed.ch2/1e6).toFixed(1)+"kWh"),Math.abs(e.energyUsed.ch3/1e3)<200?sf.setValueTexts(this.bmsCh3EnergyUsedValues,(e.energyUsed.ch3/1e3).toFixed(3)+"Wh"):Math.abs(e.energyUsed.ch3/1e3)<1e3?sf.setValueTexts(this.bmsCh3EnergyUsedValues,(e.energyUsed.ch3/1e3).toFixed(2)+"Wh"):Math.abs(e.energyUsed.ch3/1e3)<1e4?sf.setValueTexts(this.bmsCh3EnergyUsedValues,(e.energyUsed.ch3/1e3).toFixed(1)+"Wh"):Math.abs(e.energyUsed.ch3/1e3)<1e5?sf.setValueTexts(this.bmsCh3EnergyUsedValues,(e.energyUsed.ch3/1e3).toFixed(0)+"Wh"):sf.setValueTexts(this.bmsCh3EnergyUsedValues,(e.energyUsed.ch3/1e6).toFixed(1)+"kWh"),sf.setValueTexts(this.bmsCh1SOCValues,e.soc.ch1.toFixed(1)+"%"),sf.setValueTexts(this.bmsCh2SOCValues,e.soc.ch2.toFixed(1)+"%"),sf.setValueTexts(this.bmsCh3SOCValues,e.soc.ch3.toFixed(1)+"%"),sf.setValueTexts(this.bmsMinSOCValues,e.soc.min.toFixed(1)+"%")}setBMSTempValues(e){150<=parseFloat(e.tShunt)?sf.setValueTexts(this.bmsShuntTempValues,"150+°C"):parseFloat(e.tShunt)<=-50?sf.setValueTexts(this.bmsShuntTempValues,"-50-°C"):sf.setValueTexts(this.bmsShuntTempValues,e.tShunt+"°C"),150<=parseFloat(e.tPch)?sf.setValueTexts(this.bmsPrechargeTempValues,"150+°C"):parseFloat(e.tPch)<=-50?sf.setValueTexts(this.bmsPrechargeTempValues,"-50-°C"):sf.setValueTexts(this.bmsPrechargeTempValues,e.tPch+"°C")}setOnTime(e){let t=(e%60).toString();for(;t.length<2;)t="0"+t;let s=Math.floor(e/60%60).toString();for(;s.length<2;)s="0"+s;let a=Math.floor(e/3600).toString();for(;a.length<1;)a="0"+a;sf.setValueTexts(this.bmsOnTimeValues,a+":"+s+":"+t)}setBMSMaxValues(e){sf.setValueTexts(this.bmsMaxPowerValues,e.power+"kW"),sf.setValueTexts(this.bmsMaxCurrentValues,e.maxCurrent+"A"),sf.setValueTexts(this.bmsMinCurrentValues,e.minCurrent+"A"),sf.setValueTexts(this.bmsMinVoltageValues,e.minVoltage+"V"),sf.setValueTexts(this.bmsMaxVoltageValues,e.maxVoltage+"V"),sf.setValueTexts(this.bmsMaxShuntTempValues,e.shuntTemp+"°C"),sf.setValueTexts(this.bmsMaxPrechargeTempValues,e.prechargeTemp+"°C")}setChannelVoltageInfo(e){sf.setValueTexts(this.bmsCh1VoltageValues,e.u1+"V"),sf.setValueTexts(this.bmsCh2VoltageValues,e.u2+"V"),sf.setValueTexts(this.bmsCh3VoltageValues,e.u3+"V"),sf.setValueTexts(this.bmsOutputVoltageValues,e.uOut+"V")}setChannelCurrentInfo(e){"-0.00"===e.i1&&(e.i1="0.00"),"-0.00"===e.i2&&(e.i2="0.00"),"-0.00"===e.i3&&(e.i3="0.00"),325<=parseFloat(e.i1)&&(e.i1="325+"),parseFloat(e.i1)<=-325&&(e.i1="-325-"),325<=parseFloat(e.i2)&&(e.i2="325+"),parseFloat(e.i2)<=-325&&(e.i2="-325-"),325<=parseFloat(e.i3)&&(e.i3="325+"),parseFloat(e.i3)<=-325&&(e.i3="-325-"),sf.setValueTexts(this.bmsCh1CurrentValues,e.i1+"A"),sf.setValueTexts(this.bmsCh1PowerValues,(parseFloat(e.u1)*parseFloat(e.i1)).toFixed(1)+"W"),sf.setValueTexts(this.bmsCh2CurrentValues,e.i2+"A"),sf.setValueTexts(this.bmsCh2PowerValues,(parseFloat(e.u2)*parseFloat(e.i2)).toFixed(1)+"W"),sf.setValueTexts(this.bmsCh3CurrentValues,e.i3+"A"),sf.setValueTexts(this.bmsCh3PowerValues,(parseFloat(e.u3)*parseFloat(e.i3)).toFixed(1)+"W")}enableBoardGauges(){for(let e=0;e<this.boardElements.length;e++)this.boardElements[e].classList.remove("board-gauge-disabled");this.connectBMSOverlay.classList.add("hidden")}disableBoardGauges(){for(let e=0;e<this.boardElements.length;e++)this.boardElements[e].classList.add("board-gauge-disabled");this.connectBMSOverlay.classList.remove("hidden")}updateTempGauges(e){e.showBMSIntTemp?(sf.classListValueTextsRemove(this.bmsShuntTempValues,"disabled"),sf.classListValueTextsRemove(this.bmsMaxShuntTempValues,"disabled")):(sf.setValueTexts(this.bmsShuntTempValues,"--°C"),sf.classListValueTextsAdd(this.bmsShuntTempValues,"disabled"),sf.setValueTexts(this.bmsMaxShuntTempValues,"--°C"),sf.classListValueTextsAdd(this.bmsMaxShuntTempValues,"disabled")),e.showBMSExtTemp?(sf.classListValueTextsRemove(this.bmsPrechargeTempValues,"disabled"),sf.classListValueTextsRemove(this.bmsMaxPrechargeTempValues,"disabled")):(sf.setValueTexts(this.bmsPrechargeTempValues,"--°C"),sf.classListValueTextsAdd(this.bmsPrechargeTempValues,"disabled"),sf.setValueTexts(this.bmsMaxPrechargeTempValues,"--°C"),sf.classListValueTextsAdd(this.bmsMaxPrechargeTempValues,"disabled")),e.showMotorTemp?(sf.classListValueTextsRemove(this.tachoMotorTempValues,"disabled"),sf.classListValueTextsRemove(this.tachoMaxMotorTempValues,"disabled")):(sf.setValueTexts(this.tachoMotorTempValues,"--°C"),sf.classListValueTextsAdd(this.tachoMotorTempValues,"disabled"),sf.setValueTexts(this.tachoMaxMotorTempValues,"--°C"),sf.classListValueTextsAdd(this.tachoMaxMotorTempValues,"disabled")),e.showTachoExtTemp?(sf.classListValueTextsRemove(this.tachoExternTempValues,"disabled"),sf.classListValueTextsRemove(this.tachoMaxExternTempValues,"disabled")):(sf.setValueTexts(this.tachoExternTempValues,"--°C"),sf.classListValueTextsAdd(this.tachoExternTempValues,"disabled"),sf.setValueTexts(this.tachoMaxExternTempValues,"--°C"),sf.classListValueTextsAdd(this.tachoMaxExternTempValues,"disabled"))}updateWarningFields(e,t){let s="",a="",n="";0===t&&0===e&&(s="None"),0!==e&&(s+="<warning>"),1&e&&(s+="GPO OC  "),8&e&&(s+="Power Temp  "),16&e&&(s+="Logic Temp  "),32&e&&(s+="C Imb  "),64&e&&(s+="Ch1 UC  "),128&e&&(s+="Ch1 OC  "),256&e&&(s+="Ch2 UC  "),512&e&&(s+="Ch2 OC  "),1024&e&&(s+="Ch3 UC  "),2048&e&&(s+="Ch3 OC  "),4096&e&&(s+="Ch1 OV  "),8192&e&&(s+="Ch1 UV  "),16384&e&&(s+="Ch2 OV  "),32768&e&&(s+="Ch2 UV  "),65536&e&&(s+="Ch3 OV  "),131072&e&&(s+="Ch3 UV  "),262144&e&&(s+="LIMP  "),0!==e&&(s+="</warning>"),0!==t&&(s+="<fault>"),2&t&&(s+="Unable to Precharge",a="Unable to Precharge",n="either your load's current is too high during precharge or your capacitor is too big"),4&t&&(s+="Nothing Connected",a="Nothing Connected",n="Voltage increased to quickly. Either your load is disconnected or your load capacitance setting is wrong."),8&t&&(s+="BMS Temp",a="BMS Temperature",n="The BMS-Temperature exceeded your max. setting (should always be below 85C°)"),16&t&&(s+="Extern Temp",a="Extern Temperature",n="With MosfetBMS, your Precharge got too hot, with RelaisBMS your external Sensor got too hot"),32&t&&(s+="Current-Imbalance",a="Current-Imbalance",n="Current difference setting between batteries was exceeded during operation OR turn on would have caused such an imbalance."),64&t&&(s+="Charge 1",a="Charge Current 1",n="Battery 1 has exceeded your max. charge-current setting for 10ms"),128&t&&(s+="Discharge Current 1",a="Discharge Current 1",n="Battery 1 has exceeded your max. discharge-current setting for 10ms"),256&t&&(s+="Charge 2",a="Charge Current 2",n="Battery 2 has exceeded your max. charge-current setting for 10ms"),512&t&&(s+="Discharge Current 2",a="Discharge Current 2",n="Battery 2 has exceeded your max. discharge-current setting for 10ms"),1024&t&&(s+="Charge 3",a="Charge Current 3",n="Battery 3 has exceeded your max. charge-current setting for 10ms"),2048&t&&(s+="Discharge Current 3",a="Discharge Current 3",n="Battery 3 has exceeded your max. discharge-current setting for 10ms"),4096&t&&(s+="Over-Voltage 1",a="Over-Voltage 1",n="Battery 1 exceeded your max. voltage setting"),8192&t&&(s+="Low-Voltage 1",a="Low-Voltage 1",n="Battery 1 voltage dropped below your low voltage setting"),16384&t&&(s+="Over-Voltage 2",a="Over-Voltage 2",n="Battery 2 exceeded your max. voltage setting"),32768&t&&(s+="Low-Voltage 2",a="Low-Voltage 2",n="Battery 2 voltage dropped below your low voltage setting"),65536&t&&(s+="Over-Voltage 3",a="Over-Voltage 3",n="Battery 3 exceeded your max. voltage setting"),131072&t&&(s+="Low-Voltage 3",a="Low-Voltage 3",n="Battery 3 Voltage dropped below your low voltage settings"),262144&t&&(s+="Other Fault",a="Other Fault",n="Other Fault(oldShort) Not implemented yet"),268435456&t&&(s+="Invalid Input",a="Invalid config/calib input",n="Sorry, we forgot to make this input impossible for the user, will be fixed soon! :)"),536870912&t&&(s+="Firmware",a="Firmware Hiccup",n="Firmware internal hiccup. This might be caused by corrupted config/calib data. Please restart your device."),2147483648&t&&(s+="HW Fault",a="Hardware Fault",n="Most likely a broken switch or broken precharge"),0!==t&&""===s&&(s+="Fault",a="Fault",n="alert spike - big EMI/EMC problem or Hiccup. Please confirm!"),0!==t&&(s+="</fault>"),this.faultStateValue.innerHTML!==s&&sf.setValueTexts(this.bmsFaultStateValues,s),this.clearAlertsFaultName.innerHTML!==a&&(this.clearAlertsFaultName.innerHTML=a),this.clearAlertsFaultExplanation.innerHTML!==n&&(this.clearAlertsFaultExplanation.innerHTML=n)}setInlineMaxValues(e){sf.setValueTexts(this.tachoMaxSpeedValues,e.speed.toFixed(1)+"km/h"),150<=parseFloat(e.motorTemp)?sf.setValueTexts(this.tachoMaxMotorTempValues,"150+°C"):parseFloat(e.motorTemp)<=-50?sf.setValueTexts(this.tachoMaxMotorTempValues,"-50-°C"):sf.setValueTexts(this.tachoMaxMotorTempValues,e.motorTemp+"°C"),150<=parseFloat(e.externTemp)?sf.setValueTexts(this.tachoMaxExternTempValues,"150+°C"):parseFloat(e.externTemp)<=-50?sf.setValueTexts(this.tachoMaxExternTempValues,"-50-°C"):sf.setValueTexts(this.tachoMaxExternTempValues,e.externTemp+"°C")}setSpeedGaugeValues(e){e.speed,sf.setValueTexts(this.tachoSpeedValues,e.speed+"km/h"),sf.setValueTexts(this.tachoSpeedNoUnitValues,e.speed),sf.setValueTexts(this.tachoRPMValues,parseFloat(e.rpm).toFixed(0)+"RPM")}setTachoGauges(e){sf.setValueTexts(this.tachoTripOdoValues,(e.tripOdo/1e6).toFixed(2)),sf.setValueTexts(this.tachoVehicleOdoValues,(Math.floor(e.vehicleOdo/10)/10).toFixed(1))}setInlineTempValues(e){150<=parseFloat(e.motor)?sf.setValueTexts(this.tachoMotorTempValues,"150+°C"):parseFloat(e.motor)<=-50?sf.setValueTexts(this.tachoMotorTempValues,"-50-°C"):sf.setValueTexts(this.tachoMotorTempValues,e.motor+"°C"),150<=parseFloat(e.extern)?sf.setValueTexts(this.tachoExternTempValues,"150+°C"):parseFloat(e.extern)<=-50?sf.setValueTexts(this.tachoExternTempValues,"-50-°C"):sf.setValueTexts(this.tachoExternTempValues,e.extern+"°C")}setEconomyGauges(e){Math.abs(e.whkmSession)===1/0?sf.setValueTexts(this.sessionEconomyValues,"∞"):sf.setValueTexts(this.sessionEconomyValues,e.whkmSession.toFixed(1)),sf.setValueTexts(this.sessionRangeValues,e.range.toFixed(1))}disableEconomyGauges(){sf.setValueTexts(this.sessionRangeValues,"no BMS"),sf.setValueTexts(this.sessionEconomyValues,"no BMS")}disableNothingConnectedOverlay(){this.nothingConnectedOverlay.classList.add("disabled"),this.nothingConnectedOverlay.classList.add("hidden"),this.autoconnectingTachoText.classList.add("hidden"),this.autoconnectingBMSText.classList.add("hidden")}enableNothingConnectedOverlay(){this.nothingConnectedOverlay.classList.contains("disabled")&&this.nothingConnectedOverlay.classList.remove("disabled"),this.nothingConnectedOverlay.classList.contains("hidden")&&this.nothingConnectedOverlay.classList.remove("hidden")}}