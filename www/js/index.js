// Wait for device API libraries to load first
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
function onDeviceReady() {  
    // Battery Status API Usage
    useFileSystem();
    window.addEventListener("batterystatus", onBatteryStatus, false);  
    window.addEventListener("batterylow", onBatteryLow, false);
    window.addEventListener("batterycritical", onBatteryCritical, false);

    // Network API Usage here
    document.addEventListener("online", networkIsOnline, false);
    document.addEventListener("offline", networkIsOffline, false);

}



function useFileSystem() {
    var writeFileButton = document.getElementById("write-file-button");
    writeFileButton.addEventListener("click", showPrompt, false);

    var readFileButton = document.getElementById("read-file-button");
    readFileButton.addEventListener("click", readFile, false);

    var clearFileButton = document.getElementById("clear-file-button");
    clearFileButton.addEventListener("click", clearFile, false);

    var file = {};

    // attempt to get access to the file system
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
        // onSuccess
        function (fs) {
            fs.root.getFile("newPersistentFile.txt", { create: true, exclusive: false }, 
                // onSuccess
                function (fileEntry) {
                    file = fileEntry; 
                    
                    writeFile(fileEntry, null);
            
                }, 
                // onError
                function (e) {
                    console.log("Failed file write: " + e.toString());
                }
            );
        }, 
        // onError
        function (e) {

            console.log("Failed to access file system: " + e.toString());
        }   
    );

    function showPrompt() {
        navigator.notification.prompt(
            'Please enter your name',   // message
            writeFile,                  // callback to invoke
            'Write a file!',            // title
            ['Ok'],                     // buttonLabels
            ''                          // defaultText
        );
    }

    function writeFile(results) {
        // Create a FileWriter object for our FileEntry (log.txt). here
        file.createWriter(function (fileWriter) {
    
            // this executes when the writer has finished
            fileWriter.onwriteend = function() {
                console.log("Successful file write...");
            };
            
            // this executes is the writer encounters an error
            fileWriter.onerror = function (e) {
                console.log("Failed file write: " + e.toString());
            };
    
            // attempt to write to the file using fileWriter object with a ternary JS operator
            fileWriter.write(!!results.input1 ? results.input1 : '');
        });
    };



    function readFile() {
        file.file(
            // onSuccess (file can be read)
            function (file) {
                var reader = new FileReader();
    
                reader.onloadend = function() {
                    console.log("Successful file read: " + this.result);
                    console.log(file.fullPath + ": " + this.result);
                    
                    if(this.result !== undefined) {
                        alert(this.result);
                    }
                };
                
                reader.readAsText(file);
            }, 
            // onError
            function(e) {

                console.log("Failed file read: " + e.toString());
            }
        );
    };

 


    function clearFile(results) {
        function onSuccess(writer) {
            // this will truncate all the files data back to position 0 (or whatever index specified there)
            writer.truncate(0);
        };
        

        var onError = function(evt) {
            console.log(error.code);
        };
        
        file.createWriter(onSuccess, onError);
    };
}



// Battery status event callbacks
function onBatteryStatus(status) {
    var batteryStatusDiv = document.getElementById('battery-status');
    batteryStatusDiv.innerHTML = 'Level: ' + status.level + ' isPlugged: ' + status.isPlugged;
}



function onBatteryLow(status) {
    alert("Battery Level Low " + status.level + "%");
}



function onBatteryCritical(status) {
    alert("Battery Level Critical " + status.level + "%\nRecharge Soon!");
}



// Network status callbacks
// in emulator or physical device: use airplane mode to test these events always!
function networkIsOnline() {
    alert("Network is online! \nConnection Type: " + navigator.connection.type);
}



function networkIsOffline() {
    alert("Network is offline!");
}


