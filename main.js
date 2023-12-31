song = "";
song2 = "";
song_status = "";
song2_status = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0; 

function preload()
{
	song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}


function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
	video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log("PoseNet foi inicializado");
}
function gotPoses(results)
{
if (results.length > 0) {
    console.log(results);
    scoreLeftWrist =  results[0].pose.keypoints[9].score;
    scoreRightWrist =  results[0].pose.keypoints[10].score;
    console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = "+ rightWristX +"rightWristY = "+rightWristY);

    leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
}
}
function draw() {
	image(video, 0, 0, 600, 500);
	song_status = song.isPlaying();
	song2_status = song.isPlaying();
    fill("#FF0000");
	stroke("#FF0000");
    if (scoreRightWrist > 0.2) {
      circle(rightWristX,rightWristY, 20);
	  song2.stop();
	  if (song_status == false) {
		song.play();
		document.getElementById("song").innerHTML = "Tocando :Tema de Harry Potter "
	  }
    }
	if (scoreLeftWrist > 0.2) {
		circle(rightWristX,rightWristY, 20);
		song.stop();
		if (song2_status == false) {
		song2.play();
		document.getElementById("song").innerHTML = "Tocando :Tema de Peter Pan "
		}
	}
}
function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}