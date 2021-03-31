
song = ""
leftWristX = ""
leftWristY = ""
rightWristX = ""
rightWristY = ""
scorePointLeft = 0;
scorePointRight = 0;

function preload() {

    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 600)
    canvas.center()

    video = createCapture(VIDEO);
    video.hide()
    
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model Loaded")
}



function draw() {
    image(video, 0, 0, 600, 600);
        fill('#de1010');
        stroke('#de1010');

if (scorePointRight > 0.2) {

        circle(rightWristX, rightWristY, 20);

        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if (rightWristY > 200 && rightWristY <=300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if (rightWristY > 300 && rightWristY <=400) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if (rightWristY > 400 && rightWristY <=500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }

if (scorePointLeft > 0.2) {

        circle(leftWristX, leftWristY, 20);

        in_number_leftWristY = Number (leftWristY);
        no_decimals = floor(in_number_leftWristY);
volume = no_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume)
    
    }





  }

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

       leftWristX = results[0].pose.leftWrist.x;
       leftWristY = results[0].pose.leftWrist.y;
       console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY);

       rightWristX = results[0].pose.rightWrist.x;
       rightWristY = results[0].pose.rightWrist.y;
       console.log("Right Wrist X = " + rightWristX + " Right Wrist Y = " + rightWristY);

       scorePointLeft = results[0].pose.keypoints[9].score;
       console.log("Score Left = " + scorePointLeft);

       scorePointRight = results[0].pose.keypoints[10].score;
       console.log("Score Right = " + scorePointRight);


     
    }
}

function play() {
    song.play();
    song.setVolume(1);

    song.rate(1);
}

function stop() {
    song.stop();
}

function pause() {
    song.pause();
}

