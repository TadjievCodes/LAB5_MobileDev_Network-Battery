document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    useCamera();
    useMedia();
    useMediaCapture();
}



function useCamera() {
    var takePictureButton = document.getElementById("take-picture-button");
    takePictureButton.addEventListener("click", takePicture, false);

    var getImageButton = document.getElementById("get-image-button");
    getImageButton.addEventListener("click", getImage, false);

    var getImageForEditButton = document.getElementById("get-image-edit-button");
    getImageForEditButton.addEventListener("click", getImageForEdit, false);

    var getVideoButton = document.getElementById("get-video-button");
    getVideoButton.addEventListener("click", getVideo, false);

    var getMediaButton = document.getElementById("get-any-media-button");
    getMediaButton.addEventListener("click", getMedia, false);

    function camSuccess(imageData) {
        console.log(imageData);

        // ADD phonegap plugin add cordova-plugin-filepath
        if (imageData.startsWith("content://")) {
            // We have a native file path (usually returned when a user gets a file from their android gallery)
            // Let's convert to a file URI that we can consume properly
            window.FilePath.resolveNativePath(imageData, function(localFileUri) {
                var img ='<img src="'+localFileUri+'" style=" display:block; padding:0px 15px 15px 15px; box-sizing:border-box; width:100%; margin:0 auto"/>';
                console.log(img);
                document.getElementById('CameraOutput').innerHTML = img; 
            });
        }
        else {
            var img ='<img src="'+imageData+'" style=" display:block; padding:0px 15px 15px 15px; box-sizing:border-box; width:100%; margin:0 auto"/>';
            document.getElementById('CameraOutput').innerHTML = img; 
        }
    }

    function camError(errorMessage) {
        alert("Error: " + errorMessage);
    }

    function uriSuccess(file_URI) {
        document.getElementById('CameraOutput').innerHTML = '<p style=" margin:0; padding: 0px 15px 15px 15px; ">' + file_URI + '</p>';
    }

    function takePicture() {
        var options = {
            'quality': 85,
            'targetWidth': 1280,
            'targetHeight': 720,
            'saveToPhotoAlbum': true,
            'allowEdit': false,
            'destinationType': navigator.camera.DestinationType.FILE_URI,
            /*
                0: DATA_URL     //Return image as base64-encoded string
                1: FILE_URI     //Return image file URI
                2: NATIVE_URI   //Return image native URI (assets-library:// for iOS OR content:// for android) 

            */
            
            'sourceType': navigator.camera.PictureSourceType.CAMERA,
            /*
                0: PHOTOLIBRARY
                1: CAMERA
                2: SAVEDPHOTOALBUM

            */

            'MediaType': navigator.camera.MediaType.PICTURE,
            /*
                0: PICTURE      //Allow selection of still pictures only. DEFAULT. Will return format specified via DestinationType
                1: VIDEO        //Allow selection of video only, will always return FILE_URI
                2: ALLMEDIA     //Allow selection from alla media types

            */

            'encodingType': navigator.camera.EncodingType.JPEG,
            /*
                0: JPEG     //Return JPEG encoded image
                1: PNG      //Return PNG encoded image

            */

            'Direction': navigator.camera.Direction.BACK,
            /*
                0: BACK     //Use the back-facing camera
                1: FRONT    //Use the front-facing camera

            */ 
        }
        navigator.camera.getPicture(camSuccess, camError, options);
    }

    function getImage() {
        var options = {
            'destinationType': 2,
            // DATA_URL: 0, FILE_URI: 1, NATIVE_URI: 2

            'sourceType': 0,
            // PHOTOLIBRARY: 0, CAMERA: 1, SAVEPHOTOALBUM: 2

            'mediaType': 0,
            // PICTURE: 0, VIDEO: 1, ALLMEDIA: 2
        }
        navigator.camera.getPicture(camSuccess, camError, options);
    }

    function getImageForEdit() {
        var options = {

            'allowEdit': true,

            'destinationType': 2,
            // DATA_URL: 0, FILE_URI: 1, NATIVE_URI: 2

            'sourceType': 0,
            // PHOTOLIBRARY: 0, CAMERA: 1, SAVEPHOTOALBUM: 2

            'mediaType': 0,
            // PICTURE: 0, VIDEO: 1, ALLMEDIA: 2
        }
        navigator.camera.getPicture(camSuccess, camError, options);
    }

    function getVideo() {
        var options = {

            'destinationType': 1,
            // DATA_URL: 0, FILE_URI: 1, NATIVE_URI: 2

            'sourceType': 0,
            // PHOTOLIBRARY: 0, CAMERA: 1, SAVEPHOTOALBUM: 2

            'mediaType': 1,
            // PICTURE: 0, VIDEO: 1, ALLMEDIA: 2
        }
        navigator.camera.getPicture(uriSuccess, camError, options);
    }

    function getMedia() {
        var options = {

            'destinationType': 1,
            // DATA_URL: 0, FILE_URI: 1, NATIVE_URI: 2

            'sourceType': 0,
            // PHOTOLIBRARY: 0, CAMERA: 1, SAVEPHOTOALBUM: 2

            'mediaType': 2,
            // PICTURE: 0, VIDEO: 1, ALLMEDIA: 2
        }
        navigator.camera.getPicture(uriSuccess, camError, options);
    }
}

function useMedia(){
    var sourceToPlay;

    if(device.platform === 'Android') {
        sourceToPlay = '/android_asset/www/song.mp3';
    }else {
        sourceToPlay = 'song.mp3';
    }

    var media = new Media(sourceToPlay, null, mediaError, mediaStatus);


    var playButton = document.getElementById("play-media-button");
    playButton.addEventListener("click", playMedia, false);

    var pauseButton = document.getElementById("pause-media-button");
    pauseButton.addEventListener("click", pauseMedia, false);

    var stopButton = document.getElementById("stop-media-button");
    stopButton.addEventListener("click", stopMedia, false);

    var increaseVolumeButton = document.getElementById("increase-volume-button");
    increaseVolumeButton.addEventListener("click", increaseVolume, false);

    var muteVolumeButton = document.getElementById("mute-volume-button");
    muteVolumeButton.addEventListener("click", muteVolume, false);

    var restartButton = document.getElementById("restart-button");
    restartButton.addEventListener("click", restart, false);

    function mediaStatus(status) {
        document.getElementById('duration').innerHTML = (Math.floor(media.getDuration() / 60)) + ':' + (Math.floor(media.getDuration() % 60));
    
        if (status === 0) {
            document.getElementById('media-status').innerHTML = 'Sorry no media!';
        }
    
        if (status === 1) {
            document.getElementById('media-status').innerHTML = 'Loading...';
        }
    
        if (status === 2) {
            document.getElementById('media-status').innerHTML = 'Playing...';
        }
    
        if (status === 3) {
            document.getElementById('media-status').innerHTML = 'Paused...';
        }
    
        if (status === 4) {
            document.getElementById('media-status').innerHTML = 'Stopped!';
        }
    }

    function mediaError(error) {
        document.getElementById('media-status').innerHTML = 'There was a problem. Error code ' + error.code;
    }

    function playMedia() {
        media.play();
    }

    function pauseMedia() {
        media.pause();
    }

    function stopMedia() {
        media.stop();
    }

    function increaseVolume() {
        media.setVolume(1.0);
    }

    function muteVolume() {
        media.setVolume(0.0);
    }

    function restart() {
        media.seekTo(1);
    }
}

function useMediaCapture() {
    var capture = navigator.device.capture;
    var captureOptions = { limit: 3, duration: 10};

    var captureAudioButton = document.getElementById("capture-audio-button");
    captureAudioButton.addEventListener("click", captureAudio, false);

    var captureImageButton = document.getElementById("capture-image-button");
    captureImageButton.addEventListener("click", captureImage, false);

    var captureVideoButton = document.getElementById("capture-video-button");
    captureVideoButton.addEventListener("click", captureVideo, false); 

    function captureSuccess(mediaFiles) {
        console.log(mediaFiles);
        document.getElementById('capture-output').innerHTML = JSON.stringify(mediaFiles, null, '<br/>');

        var i;

        for (i = 0; i < mediaFiles.length; i++) {
            var mediaFile = mediaFiles[i];
            mediaFile.getFormatData (
                function(data) {
                    document.getElementById('capture-output').insertAdjacentHTML('beforeend', '<hr/>' + JSON.stringify(data, null, '<br/>'));
                },
                function(err) { alert (err.code); }
            );
        }
    }

    function captureError(error) {
        navigator.notification.alert('Error code: ' + error.code);
    }

    function captureAudio() {
        capture.captureAudio(captureSuccess, captureError, captureOptions);
    }

    function captureImage() {
        capture.captureImage(captureSuccess, captureError, captureOptions);
    }

    function captureVideo() {
        capture.captureVideo(captureSuccess, captureError, captureOptions);
    }
}
