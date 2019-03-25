URL = window.URL

var gumStream;
var rec;
var input;
 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext;

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");


recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);


function startRecording() {
    console.log("recordButton clicked");
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
            /* assign to gumStream for later use */
            gumStream = stream;
            /* use the stream */
            input = audioContext.createMediaStreamSource(stream);
            /* Create the Recorder object and configure to record mono sound (1 channel) Recording 2 channels will double the file size */
            rec = new Recorder(input, {
                numChannels: 1
            })
            //start the recording process 
            rec.record()
            console.log("Recording started");
        })
        .catch(function (err) {
            //enable the record button if getUserMedia() fails 
        });
}

var constraints = {
    audio: true,
    video: false
}

function stopRecording() {
    console.log("stopButton clicked");
    //disable the stop button, enable the record too allow for new recordings 
    //reset button just in case the recording is stopped while paused 
    //tell the recorder to stop the recording 
    rec.stop(); //stop microphone access 
    gumStream.getAudioTracks()[0].stop();
    //create the wav blob and pass it on to createDownloadLink 
    rec.exportWAV(createDownloadLink);
}

function createDownloadLink(blob) {
    let nameOfClip = prompt("Name of clip?")
    var url = URL.createObjectURL(blob);
    console.log(blob)

    var au = document.createElement('audio');
    var li = document.createElement('div');
    var link = document.createElement('a');
    var breakk = document.createElement('br');
    //add controls to the <audio> element 
    au.controls = true;
    au.src = url;
    au.style.paddingRight = "20px";
    //link the a element to the blob 
    link.href = url;
    link.download = nameOfClip + '.wav';
    link.innerHTML = link.download;
    // link.verticalAlign = 'text-top';
    link.style.textDecoration = 'none';
    link.style.color = '#393BC2';
    link.style.paddingRight = "5px";    

    //add the new audio and a elements to the li element 
    li.appendChild(au);

    //this is for link namebutton.wav    
    // li.appendChild(link);
    


    var upload = document.createElement('a');
    //this is upload button
    upload.href = "#liveTest"
    upload.innerHTML = "Upload";
    upload.style.textDecoration = 'none';
    upload.style.color = '#393BC2';
    upload.addEventListener("click", function (event) {
        var headers = {
            'Content-Type': 'multipart/form-data',
        }
        const data = new FormData();
        data.append('name', nameOfClip);
        data.append('audio_file', blob);

        axios.post('http://localhost:5000/predict', data)
            .then(function (response) {
                console.log(response.data);
                let string = response.data
                let desired = string.replace(/[^\w\s]/gi, '')
                console.log(desired);
                let upper = desired.charAt(0).toUpperCase() + desired.slice(1);
                var div = document.createElement('div');
                div.append("Prediction: "+ upper);
                div.style.height = "74px";
                div.style.display = "flex";
                div.style.alignItems = "center";
                div.style.padding = "0px 0px 0px 115px";

                // div.style.padding = "30px 0px 0px 10px";
                $('#emotion').append(div);
            })
            .catch(function (err) {
                console.log("Could not get prediction");
            })

    })

   
    // $('.results').append(breakk);
    li.appendChild(link);
    li.appendChild(upload);    
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.justifyContent = "center";
    li.style.padding = "10px 0px 10px 0px";
    //add the li element to the ordered list 
    recordingsList.appendChild(li);
    // $('#recordingsList').append(link);
    // $('#recordingsList').append(upload);

}