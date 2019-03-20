const expandDiv = (value) => {
    if (value == "angry") {
        $("#testResult").html("<div class = 'container'><div class='buttonContainer'><a id='play-video' class='video-play-button' onclick='playEmotion(\"angry\")'><span></span></a></div><img style='width: 500px;height:300px;padding-left:60px;' src='/static/assets/angry.png'><div class='predictContainer'><button class='loading-button'><span>Predict</span></button><div id='prediction'></div></div></div>");
    } else if (value == "happy") {
        $("#testResult").html("<div class = 'container'><div class='buttonContainer'><a id='play-video' class='video-play-button' onclick='playEmotion(\"happy\")'><span></span></a></div><img style='width: 500px;height:300px;' src='/static/assets/happy.png''><div class='predictContainer'><button class='loading-button'><span>Predict</span></button><div id='prediction'></div></div></div>");
    }
    else if (value == "sad") {
        $("#testResult").html("<div class = 'container'><div class='buttonContainer'><a id='play-video' class='video-play-button' onclick='playEmotion(\"sad\")'><span></span></a></div><img style='width: 500px;height:300px;' src='/static/assets/sad.png'><div class='predictContainer'><button class='loading-button'><span>Predict</span></button><div id='prediction'></div></div></div>");
    }
    else if (value == "neutral") {
        $("#testResult").html("<div class = 'container'><div class='buttonContainer'><a id='play-video' class='video-play-button' onclick='playEmotion(\"neutral\")'><span></span></a></div><img style='width: 500px;height:300px;' src='/static/assets/neutral.png'><div class='predictContainer'><button class='loading-button'><span>Predict</span></button><div id='prediction'></div></div></div>");
    }
    const button = document.getElementsByClassName("loading-button")[0];
    button.addEventListener("click", function () {

        button.classList.add("loading");
        axios.get('http://localhost:5000/predict?emotion=' + value, { crossdomain: true })
            .then(function (response) {
                console.log("hello??" + response.data);
                let string = response.data
                let desired = string.replace(/[^\w\s]/gi, '')
                console.log(desired);
                let upper = desired.charAt(0).toUpperCase() + desired.slice(1);
                $('#prediction').html(upper);
            })
            .catch(function (err) {
                console.log("Could not get prediction");
            })

        setTimeout(function () {
            button.classList.remove("loading");
            button.classList.add("success");
            //This is "DONE"
            setTimeout(function () {
                button.classList.remove("success");
            }, 3000);

        }, 2000);
    });

}

const playEmotion = (value) => {
    var audio;
    if (value == 'angry') {
        audio = new Audio('/static/testdata/angry.wav');
        audio.play();
    }

    else if (value == "happy") {
        audio = new Audio('/static/testdata/happy.wav');
        audio.play();
    }

    else if (value == "sad") {
        audio = new Audio('/static/testdata/sad.wav');
        audio.play();
    }

    else if (value == "neutral") {
        audio = new Audio('/static/testdata/neutral.wav');
        audio.play();
    }
}
// cool buttons stuff
