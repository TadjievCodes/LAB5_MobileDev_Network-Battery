document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    useCamera();
    playAudio("/android_asset/www/song.mp3");

    // useFileSystem();
}

// Play audio
function playAudio(src) {
// Create Media object from src
    media = new Media(src, onSuccess, onError);

// Play audio
media.play();

// Update media position every second
    if (mediaTimer == null) {
        mediaTimer = setInterval(function() {
            // get media position
            media.getCurrentPosition(
                // success callback
                function(position) {
                    if (position > -1) {
                        setAudioPosition((position) + " sec");
                    }
                },
            // error callback
                function(e) {
                    console.log("Error getting pos=" + e);
                    setAudioPosition("Error: " + e);
                }
            );
        }, 1000);
    }
}



// onSuccess Callback function Validation
function onSuccess() {

    console.log("playAudio():Audio Success");

}

// onError Callback Validation
function onError(error) {
    alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}




//Show Network Status
function checkConnect() {
    var netState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[netState]);
}

// Calling the function here
checkConnect();



function useCamera() {
    var picButton = document.getElementById("take-picture-btn");
    picButton.addEventListener("click", takePicture, false);

    function camSuccess(imageData) {
        console.log(imageData);

        // ADD phonegap plugin add cordova-plugin-filepath
        if (imageData.startsWith("content://")) {
            // We have a native file path (usually returned when a user gets a file from their android gallery)
            // Let's convert to a file URI that we can consume properly
            window.FilePath.resolveNativePath(imageData, function(localFileUri) {
                var img ='<img src="'+localFileUri+'" style=" display:block; padding:0px 15px 15px 15px; box-sizing:border-box; width:100%; margin:0 auto"/>';
                console.log(img);
                document.getElementById('cameraDisplay').innerHTML = img; 
            });
        }
        else {
            var img ='<img src="'+imageData+'" style=" display:block; padding:0px 15px 15px 15px; box-sizing:border-box; width:100%; margin:0 auto"/>';
            document.getElementById('cameraDisplay').innerHTML = img; 
        }
    }




    function takePicture() {
        var options = {
            'quality': 85,
            'targetWidth': 1280,
            'targetHeight': 720,
            'saveToPhotoAlbum': false,
            'allowEdit': false,
            'destinationType': navigator.camera.DestinationType.FILE_URI,           
            'sourceType': navigator.camera.PictureSourceType.CAMERA,
            'MediaType': navigator.camera.MediaType.PICTURE,
            'encodingType': navigator.camera.EncodingType.JPEG,
            'Direction': navigator.camera.Direction.BACK,
        }
        navigator.camera.getPicture(camSuccess, camError, options);
    }



    function camError(errorMessage) {
        alert("Error: " + errorMessage);
    }


}

/*
var users = [];


function User(text) {
  this.text = text;
}


function addUser() {
   
    users.push( // adding new users to the array
        new User( //Through the new special keyword creating new instances for the object by getting the values through DOM   
            document.getElementById('textbox').value
            
        )
    );
     
    document.forms[0].reset(); // to clear the form for the next entries
}


// Event listener for the click of the button


function showUserDetails() { 
 
 document.getElementById('textbox').value = users.text;

}

*/


/*


function useFileSystem() {
    
    var saveButton = document.getElementById("save-button");
    saveButton.addEventListener("click", saveFile, false);

    var loadButton = document.getElementById("save-button");
    loadButton.addEventListener("click", loadFile, false);

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
        navigator.input.prompt(
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

 
} // Main closing bracket

*/