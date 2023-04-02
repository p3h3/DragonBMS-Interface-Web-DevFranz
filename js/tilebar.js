document.getElementById("tileBarConnectBMS").addEventListener("click",()=>{bmsObj.connect()}),document.getElementById("tileBarConnectTacho").addEventListener("click",()=>{tachoObj.connect()}),document.getElementById("tileBarDisconnect").addEventListener("click",()=>{resetAutoconnectBMSSilentInstant(),resetAutoconnectTachoSilentInstant(),bmsObj.disconnect(!0).then(()=>{tachoObj.disconnect()})}),document.getElementById("tileBarBoardInfo").addEventListener("click",()=>{closeCaptureMode(),boardInfoContainer.classList.contains("hidden")?bmsObj.isConnected()&&(boardInfoContainer.classList.remove("hidden"),zoomedIn?zoom.out({callback:()=>{scrollToElement(boardInfoContainer)}}):scrollToElement(boardInfoContainer)):(boardInfoContainer.classList.add("hidden"),scrollToElement(table))}),document.getElementById("tileBarBoardConfig").addEventListener("click",()=>{closeCaptureMode(),settingsContainer.classList.contains("hidden")?bmsObj.isConnected()&&(settingsContainer.classList.remove("hidden"),zoomedIn?zoom.out({callback:()=>{visualiseSettingsAvailable(),scrollToElement(boardConfigContainer)}}):(visualiseSettingsAvailable(),scrollToElement(boardConfigContainer))):scrollToElement(boardConfigContainer)}),document.getElementById("tileBarBoardCalib").addEventListener("click",()=>{closeCaptureMode(),boardCalibContainer.classList.contains("hidden")?bmsObj.isConnected()&&(settingsContainer.classList.remove("hidden"),zoomedIn?zoom.out({callback:()=>{boardCalibContainer.classList.remove("hidden"),scrollToElement(boardCalibContainer)}}):(boardCalibContainer.classList.remove("hidden"),scrollToElement(boardCalibContainer))):(boardCalibContainer.classList.add("hidden"),scrollToElement(table))}),document.getElementById("tileBarTachoConfig").addEventListener("click",()=>{closeCaptureMode(),settingsContainer.classList.contains("hidden")?tachoObj.isConnected()&&(settingsContainer.classList.remove("hidden"),zoomedIn?zoom.out({callback:()=>{visualiseSettingsAvailable(),scrollToElement(inlineConfigContainer)}}):(visualiseSettingsAvailable(),scrollToElement(inlineConfigContainer))):tachoObj.isConnected()&&scrollToElement(inlineConfigContainer)}),document.getElementById("tileBarSelectDataLoggingFile").addEventListener("click",()=>{bmsObj.isConnected()&&tachoObj.isConnected()||dataLoggingEnabled||((loggingFileObject=new loggingDataFileObject).getHandle().then(()=>{}),loggingDataBuffer=["psn;timestamp;ms_today;u1;u2;u3;uOut;i1;i2;i3;tShunt;tPch;speed;rpm;motorTemp;externTemp;tripOdo;"])}),document.getElementById("tileBarStartDataLogging").addEventListener("click",()=>{!bmsObj.isConnected()&&tachoObj.isConnected()||("undefined"==typeof loggingFileObject||null===loggingFileObject?(loggingFileObject=new loggingDataFileObject).getHandle().then(()=>{loggingDataBuffer=["psn;ms_today;stamp;u1;u2;u3;uOut;i1;i2;i3;tShunt;tPch;speed;rpm;motorTemp;externTemp;tripOdo;"],dataLoggingEnabled=!0,document.getElementById("logging-span").classList.add("recording")}):(dataLoggingEnabled=!0,document.getElementById("logging-span").classList.add("recording")))}),document.getElementById("tileBarStopDataLogging").addEventListener("click",()=>{dataLoggingEnabled&&(dataLoggingEnabled=!1,document.getElementById("logging-span").classList.remove("recording"),loggingFileObject.closeObject(),loggingFileObject=null,loggingDataBuffer=[])}),document.getElementById("tileBarAbout").addEventListener("click",()=>{closeCaptureMode(),interfaceSettingsContainer.classList.contains("hidden")?(disableNothingConnectedOverlay(),zoomedIn?zoom.out({callback:()=>{interfaceSettingsContainerLastSeen=Date.now(),interfaceSettingsContainer.classList.remove("hidden"),interfaceSettingsContainer.scrollIntoView({behavior:"smooth"})}}):(interfaceSettingsContainerLastSeen=Date.now(),interfaceSettingsContainer.classList.remove("hidden"),interfaceSettingsContainer.scrollIntoView({behavior:"smooth"}))):(bmsObj.isDisconnected()&&!tachoObj.isConnected()&&enableNothingConnectedOverlay(),table.scrollIntoView({behavior:"smooth"}),interfaceSettingsContainer.classList.add("hidden"))}),document.getElementById("tileBarDarkmode").addEventListener("click",()=>{toggleColorMode()}),tileBarEditMode.addEventListener("click",()=>{toggleTileMoveMode()}),"mediaDevices"in navigator&&"getUserMedia"in navigator.mediaDevices?tileBarCaptureMode.addEventListener("click",()=>{hideSettings(),boardCalibContainer.classList.add("hidden"),boardInfoContainer.classList.add("hidden"),interfaceSettingsContainer.classList.add("hidden"),zoomedIn&&zoom.out({callback:()=>{(captureModeContainer.classList.contains("display-none")?(activateCaptureMode(),captureModeContainer):(closeCaptureMode(),table)).scrollIntoView({behavior:"smooth"})}}),(captureModeContainer.classList.contains("display-none")?(activateCaptureMode(),captureModeContainer):(closeCaptureMode(),table)).scrollIntoView({behavior:"smooth"})}):tileBarCaptureMode.classList.add("display-none"),isChrome||(table.classList.add("hidden"),nothingConnectedOverlay.classList.add("hidden"),settingsSwipeContainer.classList.add("hidden"),tilebar.classList.add("disabled"),alert("This site is tailored around Progressive Wep App services that are only supported in full by Chrome.\nPlease open this site in Chrome only as we can't ensure functionality otherwise ;)"));