import gui_elements from"../gui_elements";import sf from"../helpers/small_functions";export default class tachoGatherer extends gui_elements{inlineHertzSampleBuffer=[];lastInlineLoggingDataTimeStamp;constructor(e){super(),this.tachoConfigObj=e}gatherData(e){if(this.tachoConfigObj.initialised){e=e.target.value;if(0!==e.byteLength)return this.lastInlineLoggingDataTimeStamp=Date.now(),this.inlineHertzSampleBuffer.push([this.lastInlineLoggingDataTimeStamp]),this.inlineHertzSampleBuffer.forEach(e=>{e[0]+1e3<Date.now()&&-1<(e=this.inlineHertzSampleBuffer.indexOf(e))&&this.inlineHertzSampleBuffer.splice(e,1)}),sf.setValueTexts(this.tachoDataLoggingFrequencyValues,"T: "+this.inlineHertzSampleBuffer.length+"Hz"),{time:this.lastInlineLoggingDataTimeStamp,speed:.036*-sf.handleSignedBullshit(e.getUint8(2)<<8|e.getUint8(1)),rpm:e.getUint8(4)<<8|e.getUint8(3),motorTemp:sf.cap(-sf.handleSignedBullshit(e.getUint8(6)<<8|e.getUint8(5))/10,-50,200),integratedTemp:sf.cap(-sf.handleSignedBullshit(e.getUint8(8)<<8|e.getUint8(7))/10,-50,200),tripOdo:sf.handleUnsignedBullshit32(e.getUint8(12)<<24|e.getUint8(11)<<16|e.getUint8(10)<<8|e.getUint8(9)),vehicleOdo:sf.handleUnsignedBullshit32(e.getUint8(16)<<24|e.getUint8(15)<<16|e.getUint8(14)<<8|e.getUint8(13)),calibPulseCount:-sf.handleSignedBullshit(e.getUint8(18)<<8|e.getUint8(17))};console.log("Something wrong with incoming BLE Data!")}else console.log("waiting for config to be read...")}}