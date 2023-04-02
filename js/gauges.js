function clearAlerts(t,e){10!==t&&bmsObj.alertCharacteristic.writeValue(Uint8Array.from([0]).buffer).then(()=>{alertBuffer=0,warningBuffer=0,updateWarningFields()}).catch(e=>{setTimeout(()=>{clearAlerts(t+1,e)},100)})}clearAlertsButton.addEventListener("click",()=>{clearAlerts(0,"")});let warningBuffer=0,alertBuffer=0;function updateConfigRelatedGauges(e){setValueTexts(bmsConfigStartupValues,e.boardAutoStart?"Autostart":"manual Start"),setValueTexts(bmsConfigOverVoltageValues,String(e.battCellCount*e.protMaxCellVoltage/1e3)+"V"),setValueTexts(bmsConfigUnderVoltageValues,String(e.battCellCount*e.protMinCellVoltage/1e3)+"V"),setValueTexts(bmsConfigOverTempValues,String(Math.min(e.protMaxLogicTemp,e.protMaxPowerTemp))+"°C");let t=0;1&e.boardEnabledChannels?(document.getElementById("channel-info-1").classList.remove("disabled"),t++):document.getElementById("channel-info-1").classList.add("disabled"),2&e.boardEnabledChannels?(document.getElementById("channel-info-2").classList.remove("disabled"),t++):document.getElementById("channel-info-2").classList.add("disabled"),4&e.boardEnabledChannels?(document.getElementById("channel-info-3").classList.remove("disabled"),t++):document.getElementById("channel-info-3").classList.add("disabled"),setValueTexts(bmsConfigUnderCurrentValues,String(.01*e.protMaxReverseCurrent*t)+"A"),setValueTexts(bmsConfigOverCurrentValues,String(.01*e.protMaxCurrent*t)+"A"),setValueTexts(bmsCh1TypeValues,e.battCellCount+"S"),setValueTexts(bmsCh2TypeValues,e.battCellCount+"S"),setValueTexts(bmsCh3TypeValues,e.battCellCount+"S")}function setBMSState(e){let t;t=0===e?"Startup":1===e?"Precharging...":2===e?"Ready":3===e?"Operation":4===e?"Fault":"UNDEFINED STATE!",setValueTexts(bmsStateMachineStateValues,t)}function handleTurnOnTd(e){2===e&&(elementsDiv.childNodes.forEach(e=>{e===turnOnTd&&swap(clearAlertsTd,turnOnTd)}),turnOnButton.innerHTML.includes("ON")||(turnOnButton.innerHTML="<h2>Switch ON</h2>")),3===e&&(elementsDiv.childNodes.forEach(e=>{e===turnOnTd&&swap(clearAlertsTd,turnOnTd)}),turnOnButton.innerHTML.includes("OFF")||(turnOnButton.innerHTML="<h2>Switch OFF</h2>")),1===e&&(elementsDiv.childNodes.forEach(e=>{e===turnOnTd&&swap(clearAlertsTd,turnOnTd)}),turnOnButton.innerHTML="<h2>Precharging...</h2>"),4===e&&elementsDiv.childNodes.forEach(e=>{e===clearAlertsTd&&swap(clearAlertsTd,turnOnTd)})}function handleConfigWarningButtons(e){3===e?(boardConfigTurnOnButton.innerHTML.includes("OFF")||(boardConfigTurnOnButton.innerHTML="Turn OFF"),boardCalibTurnOnButton.innerHTML.includes("OFF")||(boardCalibTurnOnButton.innerHTML="Turn OFF"),configWriteWarning.classList.remove("hidden"),calibWriteWarning.classList.remove("hidden"),boardConfigInputFields.forEach(e=>{e.classList.add("warning")}),boardCalibInputFields.forEach(e=>{e.classList.add("warning")})):(boardConfigTurnOnButton.innerHTML.includes("ON")||(boardConfigTurnOnButton.innerHTML="Turn ON"),boardCalibTurnOnButton.innerHTML.includes("ON")||(boardCalibTurnOnButton.innerHTML="Turn ON"),configWriteWarning.classList.add("hidden"),calibWriteWarning.classList.add("hidden"),boardConfigInputFields.forEach(e=>{e.classList.remove("warning")}),boardCalibInputFields.forEach(e=>{e.classList.remove("warning")}))}boardConfigTurnOnButton.addEventListener("click",()=>{boardConfigTurnOnButton.innerHTML.includes("ON")&&(boardConfigTurnOnButton.classList.add("button-orange"),bmsObj.turnOnCharacteristic.writeValue(Uint8Array.from([1]).buffer).then(e=>{boardConfigTurnOnButton.classList.remove("button-orange")}).catch(e=>{console.log("failed to turn on")})),boardConfigTurnOnButton.innerHTML.includes("OFF")&&(boardConfigTurnOnButton.classList.add("button-orange"),bmsObj.turnOnCharacteristic.writeValue(Uint8Array.from([0]).buffer).then(e=>{boardConfigTurnOnButton.classList.remove("button-orange")}).catch(e=>{console.log("failed to turn off")}))}),boardCalibTurnOnButton.addEventListener("click",()=>{boardCalibTurnOnButton.innerHTML.includes("ON")&&(boardCalibTurnOnButton.classList.add("button-orange"),bmsObj.turnOnCharacteristic.writeValue(Uint8Array.from([1]).buffer).then(e=>{boardCalibTurnOnButton.classList.remove("button-orange")}).catch(e=>{console.log("failed to turn on")})),boardCalibTurnOnButton.innerHTML.includes("OFF")&&(boardCalibTurnOnButton.classList.add("button-orange"),bmsObj.turnOnCharacteristic.writeValue(Uint8Array.from([0]).buffer).then(e=>{boardCalibTurnOnButton.classList.remove("button-orange")}).catch(e=>{console.log("failed to turn off")}))});let turnOnTdMoveStart={x:0,y:0};function turnOnTdPressed(e){try{turnOnTdMoveStart.x=e.changedTouches[0].screenX,turnOnTdMoveStart.y=e.changedTouches[0].screenY}catch(e){e instanceof TypeError||console.log(e)}turnOnButton.innerHTML.includes("ON")&&(turnOnButton.classList.add("animateTurnOnButton"),turnOnButton.addEventListener("animationend",function(e){turnOnButton.classList.add("orange"),bmsObj.turnOnCharacteristic.writeValue(Uint8Array.from([1]).buffer).then(e=>{turnOnButton.classList.remove("orange")}).catch(e=>{console.log("failed to turn on"+e)}),turnOnButton.classList.remove("animateTurnOnButton")})),turnOnButton.innerHTML.includes("OFF")&&(turnOnButton.classList.add("animateTurnOffButton"),turnOnButton.addEventListener("animationend",function(e){turnOnButton.classList.add("orange"),bmsObj.turnOnCharacteristic.writeValue(Uint8Array.from([0]).buffer).then(e=>{turnOnButton.classList.remove("orange")}).catch(e=>{console.log("failed to turn off"+e)}),turnOnButton.classList.remove("animateTurnOffButton")}))}function turnOnTdMoved(e){var t=turnOnTdMoveStart.x-e.changedTouches[0].screenX,e=turnOnTdMoveStart.y-e.changedTouches[0].screenY;Math.sqrt(Math.pow(t,2)+Math.pow(e,2))>.01*window.outerHeight&&(turnOnButton.classList.remove("animateTurnOnButton"),turnOnButton.classList.remove("animateTurnOffButton"))}function turnOnTdReleased(){turnOnButton.innerHTML.includes("ON")&&turnOnButton.classList.remove("animateTurnOnButton"),turnOnButton.innerHTML.includes("OFF")&&turnOnButton.classList.remove("animateTurnOffButton")}function updateBMSNameFields(e){void 0===e?setValueValues(bmsNameFields,"too old firmware"):setValueValues(bmsNameFields,e)}function setBMSCalculatedValues(e){let t=e.iTotal.toFixed(1),a=("-0.0"===t&&(t="0.0"),setValueTexts(bmsCombinedCurrentValues,t+"A"),e.pTotal.toFixed(1)),n=("-0.0"===a&&(a="0.0"),setValueTexts(bmsCombinedPowerValues,a+"kW"),"");e.pLoss<2?e.pLoss<2&&(n="<2.0"):n=e.pLoss.toFixed(1),setValueTexts(bmsPowerLossValues,n+"W"),Math.abs(e.energyUsed.combined/1e3)<200?setValueTexts(bmsCombinedEnergyUsedValues,(e.energyUsed.combined/1e3).toFixed(1)+"Wh"):Math.abs(e.energyUsed.combined/1e3)<1e3?setValueTexts(bmsCombinedEnergyUsedValues,(e.energyUsed.combined/1e3).toFixed(0)+"Wh"):Math.abs(e.energyUsed.combined/1e3)<2e4?setValueTexts(bmsCombinedEnergyUsedValues,(e.energyUsed.combined/1e6).toFixed(1)+"kWh"):setValueTexts(bmsCombinedEnergyUsedValues,(e.energyUsed.combined/1e6).toFixed(0)+"kWh"),Math.abs(e.energyUsed.ch1/1e3)<200?setValueTexts(bmsCh1EnergyUsedValues,(e.energyUsed.ch1/1e3).toFixed(3)+"Wh"):Math.abs(e.energyUsed.ch1/1e3)<1e3?setValueTexts(bmsCh1EnergyUsedValues,(e.energyUsed.ch1/1e3).toFixed(2)+"Wh"):Math.abs(e.energyUsed.ch1/1e3)<1e4?setValueTexts(bmsCh1EnergyUsedValues,(e.energyUsed.ch1/1e3).toFixed(1)+"Wh"):Math.abs(e.energyUsed.ch1/1e3)<1e5?setValueTexts(bmsCh1EnergyUsedValues,(e.energyUsed.ch1/1e3).toFixed(0)+"Wh"):setValueTexts(bmsCh1EnergyUsedValues,(e.energyUsed.ch1/1e6).toFixed(1)+"kWh"),Math.abs(e.energyUsed.ch2/1e3)<200?setValueTexts(bmsCh2EnergyUsedValues,(e.energyUsed.ch2/1e3).toFixed(3)+"Wh"):Math.abs(e.energyUsed.ch2/1e3)<1e3?setValueTexts(bmsCh2EnergyUsedValues,(e.energyUsed.ch2/1e3).toFixed(2)+"Wh"):Math.abs(e.energyUsed.ch2/1e3)<1e4?setValueTexts(bmsCh2EnergyUsedValues,(e.energyUsed.ch2/1e3).toFixed(1)+"Wh"):Math.abs(e.energyUsed.ch2/1e3)<1e5?setValueTexts(bmsCh2EnergyUsedValues,(e.energyUsed.ch2/1e3).toFixed(0)+"Wh"):setValueTexts(bmsCh2EnergyUsedValues,(e.energyUsed.ch2/1e6).toFixed(1)+"kWh"),Math.abs(e.energyUsed.ch3/1e3)<200?setValueTexts(bmsCh3EnergyUsedValues,(e.energyUsed.ch3/1e3).toFixed(3)+"Wh"):Math.abs(e.energyUsed.ch3/1e3)<1e3?setValueTexts(bmsCh3EnergyUsedValues,(e.energyUsed.ch3/1e3).toFixed(2)+"Wh"):Math.abs(e.energyUsed.ch3/1e3)<1e4?setValueTexts(bmsCh3EnergyUsedValues,(e.energyUsed.ch3/1e3).toFixed(1)+"Wh"):Math.abs(e.energyUsed.ch3/1e3)<1e5?setValueTexts(bmsCh3EnergyUsedValues,(e.energyUsed.ch3/1e3).toFixed(0)+"Wh"):setValueTexts(bmsCh3EnergyUsedValues,(e.energyUsed.ch3/1e6).toFixed(1)+"kWh"),setValueTexts(bmsCh1SOCValues,e.soc.ch1.toFixed(1)+"%"),setValueTexts(bmsCh2SOCValues,e.soc.ch2.toFixed(1)+"%"),setValueTexts(bmsCh3SOCValues,e.soc.ch3.toFixed(1)+"%"),setValueTexts(bmsMinSOCValues,e.soc.min.toFixed(1)+"%")}function setBMSTempValues(e){150<=parseFloat(e.tShunt)?setValueTexts(bmsShuntTempValues,"150+°C"):parseFloat(e.tShunt)<=-50?setValueTexts(bmsShuntTempValues,"-50-°C"):setValueTexts(bmsShuntTempValues,e.tShunt+"°C"),150<=parseFloat(e.tPch)?setValueTexts(bmsPrechargeTempValues,"150+°C"):parseFloat(e.tPch)<=-50?setValueTexts(bmsPrechargeTempValues,"-50-°C"):setValueTexts(bmsPrechargeTempValues,e.tPch+"°C")}function setOnTime(e){let t=(e%60).toString();for(;t.length<2;)t="0"+t;let a=Math.floor(e/60%60).toString();for(;a.length<2;)a="0"+a;let n=Math.floor(e/3600).toString();for(;n.length<1;)n="0"+n;setValueTexts(bmsOnTimeValues,n+":"+a+":"+t)}function setBMSMaxValues(e){setValueTexts(bmsMaxPowerValues,e.power+"kW"),setValueTexts(bmsMaxCurrentValues,e.maxCurrent+"A"),setValueTexts(bmsMinCurrentValues,e.minCurrent+"A"),setValueTexts(bmsMinVoltageValues,e.minVoltage+"V"),setValueTexts(bmsMaxVoltageValues,e.maxVoltage+"V"),setValueTexts(bmsMaxShuntTempValues,e.shuntTemp+"°C"),setValueTexts(bmsMaxPrechargeTempValues,e.prechargeTemp+"°C")}function setChannelVoltageInfo(e){setValueTexts(bmsCh1VoltageValues,e.u1+"V"),setValueTexts(bmsCh2VoltageValues,e.u2+"V"),setValueTexts(bmsCh3VoltageValues,e.u3+"V"),setValueTexts(bmsOutputVoltageValues,e.uOut+"V")}function setChannelCurrentInfo(e){"-0.00"===e.i1&&(e.i1="0.00"),"-0.00"===e.i2&&(e.i2="0.00"),"-0.00"===e.i3&&(e.i3="0.00"),325<=parseFloat(e.i1)&&(e.i1="325+"),parseFloat(e.i1)<=-325&&(e.i1="-325-"),325<=parseFloat(e.i2)&&(e.i2="325+"),parseFloat(e.i2)<=-325&&(e.i2="-325-"),325<=parseFloat(e.i3)&&(e.i3="325+"),parseFloat(e.i3)<=-325&&(e.i3="-325-"),setValueTexts(bmsCh1CurrentValues,e.i1+"A"),setValueTexts(bmsCh1PowerValues,(parseFloat(e.u1)*parseFloat(e.i1)).toFixed(1)+"W"),setValueTexts(bmsCh2CurrentValues,e.i2+"A"),setValueTexts(bmsCh2PowerValues,(parseFloat(e.u2)*parseFloat(e.i2)).toFixed(1)+"W"),setValueTexts(bmsCh3CurrentValues,e.i3+"A"),setValueTexts(bmsCh3PowerValues,(parseFloat(e.u3)*parseFloat(e.i3)).toFixed(1)+"W")}function enableBoardGauges(){for(let e=0;e<boardElements.length;e++)boardElements[e].classList.remove("board-gauge-disabled");connectBMSOverlay.classList.add("hidden")}function disableBoardGauges(){for(let e=0;e<boardElements.length;e++)boardElements[e].classList.add("board-gauge-disabled");connectBMSOverlay.classList.remove("hidden")}function updateTempGauges(){(interfaceConfig.showBMSIntTemp?(classListValueTextsRemove(bmsShuntTempValues,"disabled"),classListValueTextsRemove):(setValueTexts(bmsShuntTempValues,"--°C"),classListValueTextsAdd(bmsShuntTempValues,"disabled"),setValueTexts(bmsMaxShuntTempValues,"--°C"),classListValueTextsAdd))(bmsMaxShuntTempValues,"disabled"),(interfaceConfig.showBMSExtTemp?(classListValueTextsRemove(bmsPrechargeTempValues,"disabled"),classListValueTextsRemove):(setValueTexts(bmsPrechargeTempValues,"--°C"),classListValueTextsAdd(bmsPrechargeTempValues,"disabled"),setValueTexts(bmsMaxPrechargeTempValues,"--°C"),classListValueTextsAdd))(bmsMaxPrechargeTempValues,"disabled"),(interfaceConfig.showMotorTemp?(classListValueTextsRemove(tachoMotorTempValues,"disabled"),classListValueTextsRemove):(setValueTexts(tachoMotorTempValues,"--°C"),classListValueTextsAdd(tachoMotorTempValues,"disabled"),setValueTexts(tachoMaxMotorTempValues,"--°C"),classListValueTextsAdd))(tachoMaxMotorTempValues,"disabled"),(interfaceConfig.showTachoExtTemp?(classListValueTextsRemove(tachoExternTempValues,"disabled"),classListValueTextsRemove):(setValueTexts(tachoExternTempValues,"--°C"),classListValueTextsAdd(tachoExternTempValues,"disabled"),setValueTexts(tachoMaxExternTempValues,"--°C"),classListValueTextsAdd))(tachoMaxExternTempValues,"disabled")}function updateWarningFields(){let e="",t="",a="";0===alertBuffer&&0===warningBuffer&&(e="None"),0!==warningBuffer&&(e+="<warning>"),1&warningBuffer&&(e+="GPO OC  "),8&warningBuffer&&(e+="Power Temp  "),16&warningBuffer&&(e+="Logic Temp  "),32&warningBuffer&&(e+="C Imb  "),64&warningBuffer&&(e+="Ch1 UC  "),128&warningBuffer&&(e+="Ch1 OC  "),256&warningBuffer&&(e+="Ch2 UC  "),512&warningBuffer&&(e+="Ch2 OC  "),1024&warningBuffer&&(e+="Ch3 UC  "),2048&warningBuffer&&(e+="Ch3 OC  "),4096&warningBuffer&&(e+="Ch1 OV  "),8192&warningBuffer&&(e+="Ch1 UV  "),16384&warningBuffer&&(e+="Ch2 OV  "),32768&warningBuffer&&(e+="Ch2 UV  "),65536&warningBuffer&&(e+="Ch3 OV  "),131072&warningBuffer&&(e+="Ch3 UV  "),262144&warningBuffer&&(e+="LIMP  "),0!==warningBuffer&&(e+="</warning>"),0!==alertBuffer&&(e+="<fault>"),2&alertBuffer&&(e+="Unable to Precharge",t="Unable to Precharge",a="either your load's current is too high during precharge or your capacitor is too big"),4&alertBuffer&&(e+="Nothing Connected",t="Nothing Connected",a="Voltage increased to quickly. Either your load is disconnected or your load capacitance setting is wrong."),8&alertBuffer&&(e+="BMS Temp",t="BMS Temperature",a="The BMS-Temperature exceeded your max. setting (should always be below 85C°)"),16&alertBuffer&&(e+="Extern Temp",t="Extern Temperature",a="With MosfetBMS, your Precharge got too hot, with RelaisBMS your external Sensor got too hot"),32&alertBuffer&&(e+="Current-Imbalance",t="Current-Imbalance",a="Current difference setting between batteries was exceeded during operation OR turn on would have caused such an imbalance."),64&alertBuffer&&(e+="Charge 1",t="Charge Current 1",a="Battery 1 has exceeded your max. charge-current setting for 10ms"),128&alertBuffer&&(e+="Discharge Current 1",t="Discharge Current 1",a="Battery 1 has exceeded your max. discharge-current setting for 10ms"),256&alertBuffer&&(e+="Charge 2",t="Charge Current 2",a="Battery 2 has exceeded your max. charge-current setting for 10ms"),512&alertBuffer&&(e+="Discharge Current 2",t="Discharge Current 2",a="Battery 2 has exceeded your max. discharge-current setting for 10ms"),1024&alertBuffer&&(e+="Charge 3",t="Charge Current 3",a="Battery 3 has exceeded your max. charge-current setting for 10ms"),2048&alertBuffer&&(e+="Discharge Current 3",t="Discharge Current 3",a="Battery 3 has exceeded your max. discharge-current setting for 10ms"),4096&alertBuffer&&(e+="Over-Voltage 1",t="Over-Voltage 1",a="Battery 1 exceeded your max. voltage setting"),8192&alertBuffer&&(e+="Low-Voltage 1",t="Low-Voltage 1",a="Battery 1 voltage dropped below your low voltage setting"),16384&alertBuffer&&(e+="Over-Voltage 2",t="Over-Voltage 2",a="Battery 2 exceeded your max. voltage setting"),32768&alertBuffer&&(e+="Low-Voltage 2",t="Low-Voltage 2",a="Battery 2 voltage dropped below your low voltage setting"),65536&alertBuffer&&(e+="Over-Voltage 3",t="Over-Voltage 3",a="Battery 3 exceeded your max. voltage setting"),131072&alertBuffer&&(e+="Low-Voltage 3",t="Low-Voltage 3",a="Battery 3 Voltage dropped below your low voltage settings"),262144&alertBuffer&&(e+="Other Fault",t="Other Fault",a="Other Fault(oldShort) Not implemented yet"),268435456&alertBuffer&&(e+="Invalid Input",t="Invalid config/calib input",a="Sorry, we forgot to make this input impossible for the user, will be fixed soon! :)"),536870912&alertBuffer&&(e+="Firmware",t="Firmware Hiccup",a="Firmware internal hiccup. This might be caused by corrupted config/calib data. Please restart your device."),2147483648&alertBuffer&&(e+="HW Fault",t="Hardware Fault",a="Most likely a broken switch or broken precharge"),0!==alertBuffer&&""===e&&(e+="Fault",t="Fault",a="alert spike - big EMI/EMC problem or Hiccup. Please confirm!"),0!==alertBuffer&&(e+="</fault>"),faultStateValue.innerHTML!==e&&setValueTexts(bmsFaultStateValues,e),clearAlertsFaultName.innerHTML!==t&&(clearAlertsFaultName.innerHTML=t),clearAlertsFaultExplanation.innerHTML!==a&&(clearAlertsFaultExplanation.innerHTML=a)}function setInlineMaxValues(e){setValueTexts(tachoMaxSpeedValues,e.speed.toFixed(1)+"km/h"),150<=parseFloat(e.motorTemp)?setValueTexts(tachoMaxMotorTempValues,"150+°C"):parseFloat(e.motorTemp)<=-50?setValueTexts(tachoMaxMotorTempValues,"-50-°C"):setValueTexts(tachoMaxMotorTempValues,e.motorTemp+"°C"),150<=parseFloat(e.externTemp)?setValueTexts(tachoMaxExternTempValues,"150+°C"):parseFloat(e.externTemp)<=-50?setValueTexts(tachoMaxExternTempValues,"-50-°C"):setValueTexts(tachoMaxExternTempValues,e.externTemp+"°C")}function setSpeedGaugeValues(e){0<=e.speed?(setValueTexts(tachoSpeedValues,e.speed+"km/h"),setValueTexts(tachoSpeedNoUnitValues,e.speed)):(setValueTexts(tachoSpeedValues,"-"+e.speed+"km/h"),setValueTexts(tachoSpeedNoUnitValues,"-"+e.speed)),setValueTexts(tachoRPMValues,parseFloat(e.rpm).toFixed(0)+"RPM")}function setTachoGauges(e){setValueTexts(tachoTripOdoValues,(e.tripOdo/1e6).toFixed(2)),setValueTexts(tachoVehicleOdoValues,(Math.floor(e.vehicleOdo/10)/10).toFixed(1))}function setInlineTempValues(e){150<=parseFloat(e.motor)?setValueTexts(tachoMotorTempValues,"150+°C"):parseFloat(e.motor)<=-50?setValueTexts(tachoMotorTempValues,"-50-°C"):setValueTexts(tachoMotorTempValues,e.motor+"°C"),150<=parseFloat(e.extern)?setValueTexts(tachoExternTempValues,"150+°C"):parseFloat(e.extern)<=-50?setValueTexts(tachoExternTempValues,"-50-°C"):setValueTexts(tachoExternTempValues,e.extern+"°C")}function setEconomyGauges(e){Math.abs(e.whkmSession)===1/0?setValueTexts(sessionEconomyValues,"∞"):setValueTexts(sessionEconomyValues,e.whkmSession.toFixed(1)),setValueTexts(sessionRangeValues,e.range.toFixed(1))}function disableEconomyGauges(){setValueTexts(sessionRangeValues,"no BMS"),setValueTexts(sessionEconomyValues,"no BMS")}turnOnTd.addEventListener("mousedown",turnOnTdPressed),turnOnTd.addEventListener("touchstart",turnOnTdPressed),turnOnTd.addEventListener("touchmove",turnOnTdMoved),turnOnTd.addEventListener("mouseup",turnOnTdReleased),turnOnTd.addEventListener("touchend",turnOnTdReleased),disableBoardGauges(),resetEconomyButton.addEventListener("click",()=>{console.log("new session values for economy!"),drivenDistanceOffset=-1}),resetTripButton.addEventListener("click",()=>{tachoObj.inlineOdometerCharacteristic.writeValueWithoutResponse(Uint8Array.from([1]).buffer).then(()=>{drivenDistanceOffset=-1}).catch(e=>{console.log("failed to reset trip odometer")})});let prechargeEnabled=!1,currentPrechargeValue=0,channel1enabled=(precharge_button_div.addEventListener("click",function(){(prechargeEnabled=!prechargeEnabled)?(console.log(parseInt(document.getElementById("prechargePWMInput").value)),bmsObj.prechargeControlCharacteristic.writeValue(Uint8Array.from([parseInt(document.getElementById("prechargePWMInput").value)]).buffer).catch(e=>{console.log("failed to enable precharge")}),currentPrechargeValue=parseInt(document.getElementById("prechargePWMInput").value),precharge_button_div.style.background="green",precharge_button.style.color="white",precharge_button.innerHTML="stop Precharge"):(currentPrechargeValue=0,bmsObj.prechargeControlCharacteristic.writeValue(Uint8Array.from([0]).buffer).catch(e=>{console.log("failed to turn off precharge")}),precharge_button_div.style.background="",precharge_button.style.color="green",precharge_button.innerHTML="start Precharge")}),!1),channel2enabled=!1,channel3enabled=!1;channel1_button.addEventListener("click",function(){channel1enabled=!channel1enabled,bmsObj.sendChannelControlData(0,channel1enabled,channel2enabled,channel3enabled),channel1enabled?channel1_button.src="img/on-button.png":channel1_button.src="img/off.jpg"}),channel2_button.addEventListener("click",function(){channel2enabled=!channel2enabled,bmsObj.sendChannelControlData(0,channel1enabled,channel2enabled,channel3enabled),channel2enabled?channel2_button.src="img/on-button.png":channel2_button.src="img/off.jpg"}),channel3_button.addEventListener("click",function(){channel3enabled=!channel3enabled,bmsObj.sendChannelControlData(0,channel1enabled,channel2enabled,channel3enabled),channel3enabled?channel3_button.src="img/on-button.png":channel3_button.src="img/off.jpg"});