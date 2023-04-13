song = "";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
scoreLeftWrist = 0;
function preload() {
    song = loadSound("music.mp3");
}

function play() {

    song.play();
}



function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("FF0000");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftwristX,leftwristY,20);
        InNumberleftWristY = Number(leftwristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "volume = " + volume;
        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
if(results.length > 0){
console.log(results);
scoreLeftWrist = results[0].pose.keypoints[9].score;
console.log("scoreleftWrist = " + scoreLeftWrist);
leftwristX = results[0].pose.leftWrist.x;
leftwristY = results[0].pose.leftWrist.y;
console.log("leftwristX = " + leftwristX +" leftwristY = "+ leftwristY);
rightwristX = results[0].pose.rightWrist.x;
rightwristY = results[0].pose.rightWrist.y;
console.log("rightwristX = " + rightwristX +" rightwristY = "+ rightwristY);
}
    
}