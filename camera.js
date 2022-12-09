/**
*********
Dec,7 (When Program Started)

(C) Gvbvdxx 2022

no stealing the application or claming as your own,
by the way I made this on a school chrome OS, so no inspect, no view source,
and a whole bunch of blocked websites, so be impressed that I made all of this on a school pc.

*********

*/
var startingScreen = document.getElementById("startingScreen");
var startText = document.getElementById("startText");
var mainScreen = document.getElementById("mainScreen");
var HTMLRecordButton = document.getElementById("HTMLRecordButton");
var camVideo = document.getElementById("camVideo");
var picturePreview = document.getElementById("picturePreview");
var afterPictureButtons = document.getElementById("afterPictureButtons");
var mainButtons = document.getElementById("mainButtons");
var recordingPreview = document.getElementById("recordingPreview");
var TakePictureButton = document.getElementById("TakePictureButton");
var afterRecordingButtons = document.getElementById("afterRecordingButtons");
var favicon = document.getElementById("favicon");
var canvas = document.createElement("canvas");
var recordImage = document.getElementById("REC");
var pictureMode = document.getElementById("pictureMode");
var videoMode = document.getElementById("videoMode");
var switchModes = document.getElementById("switchModes");
var screenRecordMode = document.getElementById("screenRecordMode");
var recordScreenButton = document.getElementById("recordScreenButton");
var runCVS = document.createElement("canvas");
var aud1 = document.createElement("audio")
aud1.src = ("./startedRecording.wav?n=1");
var aud2 = document.createElement("audio");
aud2.src = ("./stopRecording.wav?n=1");
var camInfo = {width:0,height:0};
var mScreen = null;
var medrecorder = null;
var typeScale = true;
var textEnabled = true;
var mScreenVideo = document.createElement("video");
var med = null;
var stream = null;
var extraAudioStream = new MediaStream();
var camVideoOg = null;
var mcOg = null;
var cvs2 = document.createElement("canvas");
var cvs2d = cvs2.getContext("2d");
window.micMuted = false;
canvas.width = 1000;
canvas.height = 200;
window.onerror = (a,b,c,d) => {
    window.alert("catched an error "+a+" "+b+" "+c+" "+d);
};
recordingPreview.onplay = function () {
    favicon.href = "play.png";
}
recordingPreview.onstop = function () {
    favicon.href = "stop.png";
}
recordingPreview.onpause = function () {
    favicon.href = "pause.png";
}
async function sideView(mstream) {
    var stream2 = new MediaStream();
    cvs2.width = mstream.getTracks()[0].getSettings().width;
    cvs2.height = mstream.getTracks()[0].getSettings().height;
    var interval = setInterval(() => {
        cvs2d.drawImage(mScreenVideo,0,0,mstream.getTracks()[0].getSettings().width,mstream.getTracks()[0].getSettings().height);
    },1);
    mScreenVideo.srcObject.getTracks()[0].onended = function () {
        clearInterval(interval);
    }
}
function onDataAvailiable(event) {
            try{
            try{        mScreenVideo.srcObject.getTracks().forEach((track) => {
            track.stop();
        });}catch(e){}
                videoBlob = new Blob([event.data], { type: "video/mp4" });
                camVideo.hidden = true;
                recordingPreview.hidden = false;
                recordingPreview.src = URL.createObjectURL(videoBlob);
                recordingPreview.play();
            }catch(e){
                window.alert(e);
            }
        
}
async function selectScreen() {
   try {
    try{
        mScreenVideo.srcObject.getTracks().forEach((track) => {
          track.stop();  
        })
        
    }catch(e){}
       var mScreen = await navigator.mediaDevices.getDisplayMedia({video:true,audio:true}); 
       medrecorder = new MediaRecorder(mScreen);
       medrecorder.ondataavailable = onDataAvailiable;
    mScreenVideo.srcObject = mScreen;
    mScreenVideo.volume = 0;
    mScreenVideo.play();
    
    camVideo.srcObject = mScreen;
    camVideo.volume = 0;
    camVideo.play();
   }catch(e){window.alert("failed to get screen, device not supported or outdated browser");}
}
async function StartCanvasDraw(m) {
    var video = document.createElement("video");
    video.srcObject = m;
    video.volume = 0;
    video.play();
    var runctx = runCVS.getContext("2d");
    var streama = runCVS.captureStream(60);
        var tracks = m.getTracks();
        for (var track of tracks) {
            var {width, height} = track.getSettings();
            if (width || height) {
                break;
            }
        }
    var main = new MediaStream();
    var micTrack = m.getAudioTracks()[0];
    function draw() {
        runctx.fillStyle = "black";
        runctx.fillRect(0,0,runCVS.width,runCVS.height);
        //runctx.scale(-1, 1);
        if (screenRecordMode.hidden) {
            
        if (typeScale) {
            runctx.drawImage(video,20,20,runCVS.width-40,runCVS.height-40);
        } else {
            runctx.drawImage(video,0,0,runCVS.width,runCVS.height);
        }
        if (textEnabled) {
            const date = new Date();
            runctx.fillStyle = "white";
            var scaleSize = (runCVS.height/360)*12;
            runctx.font = scaleSize+"px arial";
            runctx.fillText(date.toString(),0,runCVS.height-scaleSize);
            runctx.fillText(`Video/Picture Tooken With Gvbvdxx Camrea`,0,scaleSize);
            
        }
            //m.getAudioTracks()[0] = micTrack;
            m.getAudioTracks()[0].enabled = !(window.micMuted);
        } else {
            var scaleSizeW = (runCVS.width/360)*12;
            var scaleSizeH = (runCVS.height/360)*12;
            try{
                m.getAudioTracks()[0].enabled = false;
                
                //m.getAudioTracks()[0] = mScreenVideo.srcObject.getAudioTracks()[0];
               runctx.drawImage(mScreenVideo,0,0,runCVS.width,runCVS.height);
            }catch(e){}
            //runctx.drawImage(video,0,0,5*scaleSizeW,5*scaleSizeH);
        }
    }
    draw();
    setInterval(draw,1);
    
    for (var videoTrack of streama.getTracks()) {
        main.addTrack(videoTrack);
    }
    
    for (var audioTrack of m.getAudioTracks()) {
        main.addTrack(audioTrack);
    }
    
    return main;
}
var videoBlob = null;

(async function () {
    try{
        med = await navigator.mediaDevices.getUserMedia({audio:true,video:true});
stream = await StartCanvasDraw(med,camVideo);
        var tracks = med.getTracks();
        for (var track of tracks) {
            var {width, height} = track.getSettings();
            if (width || height) {
                break;
            }
        }
        startingScreen.hidden = true;
        mainScreen.hidden = false;
        camVideoOg = stream;
        camVideo.srcObject = stream;
        camVideo.volume = 0;
        camVideo.play();
        camInfo.width = width;
        camInfo.height = height;
        //window.alert(`${width}x${height}`);
        canvas.width = camInfo.width;
        canvas.height = camInfo.height;
        runCVS.width = camInfo.width;
        runCVS.height = camInfo.height;
        medrecorder = new MediaRecorder(stream);
        mcOg = medrecorder;
        medrecorder.ondataavailable = onDataAvailiable;
    } catch (e) {
         startingScreen.hidden = false;
        mainScreen.hidden = true;
        if (e.toString() == "NotAllowedError: Permission denied" || e.toString() == "NotAllowedError: Permission dismissed") {
            startText.innerHTML = "Please Give Access To Camera!!<img src='https://jasonglenevans.github.io/GvbvdxxChatEmojis/MSG_8.png' width='64' >";
        } else {
            startText.innerHTML = "Failed To Get Camera!! (Unknown Error) "+e;
        }
    }
})();
var cvs2d = canvas.getContext("2d");
var photo = null;
function takePicture() {
    cvs2d.drawImage(camVideo,0,0,canvas.width,canvas.height);
    photo = canvas.toDataURL();
    picturePreview.hidden = false;
    camVideo.hidden = true;
    picturePreview.src = photo;
    mainButtons.hidden = true;
    afterPictureButtons.hidden = false;
    switchModes.hidden = true;
}
window.isRecording = false;
var recText = HTMLRecordButton.innerHTML;
var recText2 = recordScreenButton.innerHTML;

function recordButton() {
    if (!(isRecording)) {
        HTMLRecordButton.innerHTML = "Stop<br>Recording";
        recordScreenButton.innerHTML = "Stop<br>Recording";
        favicon.href = "rec-icon.png?n=1";
        isRecording = true;
        TakePictureButton.hidden = true;
        recordImage.hidden = false;
        medrecorder.start();
        aud1.currentTime = 0;
        aud1.volume = 1;
        switchModes.hidden = true;
        aud1.play();
    } else {
        favicon.href = "icon.png?n=1";
        aud1.currentTime = 0;
        aud2.volume = 1;
        aud2.play();
        HTMLRecordButton.innerHTML = recText;
        recordScreenButton.innerHTML = recText2;
        isRecording = false;
        recordImage.hidden = true;
        medrecorder.stop();
        afterRecordingButtons.hidden = false;
        TakePictureButton.hidden = false;
    picturePreview.hidden = true;
    camVideo.hidden = false;
    mainButtons.hidden = true;
    afterPictureButtons.hidden = true;
    }
}
function savePhoto() {
    picturePreview.hidden = true;
    camVideo.hidden = false;
    mainButtons.hidden = false;
    afterPictureButtons.hidden = true;
    switchModes.hidden = false;
    var a = document.createElement("a");
    a.href = photo;
    a.download = "webcam photo.png";
    a.click();
}
function cancelPhoto() {
    picturePreview.hidden = true;
    camVideo.hidden = false;
    mainButtons.hidden = false;
    afterPictureButtons.hidden = true;
    switchModes.hidden = false;
}
function saveVideo() {
            var a = document.createElement("a");
            a.href = URL.createObjectURL(videoBlob);
            a.download = "webcam recorded video.mp4";
            a.click();
    favicon.href = "icon.png?n=1";
           afterRecordingButtons.hidden = true;
        TakePictureButton.hidden = false; 
    picturePreview.hidden = true;
    camVideo.hidden = false;
    mainButtons.hidden = false;
    afterPictureButtons.hidden = true;
    recordingPreview.hidden = true;
    switchModes.hidden = false;
    switchModes.hidden = false;
}
function cancelVideo() {
    favicon.href = "icon.png?n=1";
           afterRecordingButtons.hidden = true;
        TakePictureButton.hidden = false; 
    picturePreview.hidden = true;
    camVideo.hidden = false;
    mainButtons.hidden = false;
    afterPictureButtons.hidden = true;
    recordingPreview.hidden = true;
    switchModes.hidden = false;
}
function toggleText() {
    textEnabled = !(textEnabled);
}
function toggleScale() {
    typeScale = !(typeScale);
}
function setMode(mode){
    try{
        mScreenVideo.srcObject.getTracks().forEach((track) => {
            track.stop();
        })
    camVideo.srcObject = camVideoOg;
    camVideo.volume = 0;
    camVideo.play();
        medrecorder = mcOg;
    }catch(e){}
    if (mode == 0) {
        pictureMode.hidden = false;
        videoMode.hidden = true;
        screenRecordMode.hidden = true;
    }
    if (mode == 1) {
        pictureMode.hidden = true;
        videoMode.hidden = false;
        screenRecordMode.hidden = true;
    }
    if (mode == 2) {
        pictureMode.hidden = true;
        videoMode.hidden = true;
        screenRecordMode.hidden = false;
    }
}
var mode = 0;
function switchModesFunct() {
    mode += 1;
    if (mode > 2) {
        mode = 0;
    }
    setMode(mode)
}