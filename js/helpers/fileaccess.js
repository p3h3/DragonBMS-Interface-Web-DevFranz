let loggingDataBuffer=[];class fileObject{constructor(e){this.fileType=e}async getSaveFileHandle(e){this.hasFileAccess()&&(e={suggestedName:e,excludeAcceptAllOption:!0,multiple:!1},"csv"===this.fileType&&(e.types=[{description:"CSV File",accept:{"text/csv":[".csv"]}}]),"json"===this.fileType&&(e.types=[{description:"JSON File",accept:{"text/json":[".json"]}}]),this.fileHandle=await window.showSaveFilePicker(e),this.writableStream=await this.fileHandle.createWritable())}async getReadFileHandle(){var e={types:[{description:this.fileType+" File",accept:{"text/*":["."+this.fileType]}}],excludeAcceptAllOption:!0,multiple:!1};[this.fileHandle]=await window.showOpenFilePicker(e)}saveLegacy(e,i){var t;this.hasFileAccess()||i.length<2||(t={},"csv"===this.fileType&&(t.type="text/csv"),"xml"===this.fileType&&(t.type="text/xml"),i=new File([i.join("\n")],"",t),aDownloadFile.href=window.URL.createObjectURL(i),aDownloadFile.setAttribute("download",e),aDownloadFile.click())}hasFileAccess(){return"chooseFileSystemEntries"in window||"showOpenFilePicker"in window}}let hasFSAccess="chooseFileSystemEntries"in window||"showOpenFilePicker"in window;hasFSAccess||document.getElementById("tileBarSelectDataLoggingFile").classList.add("hidden");