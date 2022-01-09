song="";
LeftWristX=0;
LeftWristY=0;
ScoreLeftWrist=0;
ScoreRightWrist=0;
RightWristX=0;
RightWristY=0;

function setup() {
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}

function draw(){

 image(video,0,0,600,500);

 fill("red");
 stroke("red");
 
 if (ScoreLeftWrist>0.2){

 circle(LeftWristX,LeftWristY-100,20);
innumberleftwristY=Number(LeftWristY);
 remove_decimals=floor(innumberleftwristY);
 volume=remove_decimals/500;
 document.getElementById("volume").innerHTML="Volume is "+volume;
 song.setVolume(volume);
 }

 if (ScoreRightWrist>0.2){
    circle(RightWristX,RightWristY,20);

    if(RightWristY>0 && RightWristY<=100){
        document.getElementById("sp").innerHTML="The speed is 0.5x";
        song.rate(0.5);
   }
   
   else if (RightWristY>100 && RightWristY<=200){
       document.getElementById("sp").innerHTML="The speed is 1.0x";
        song.rate(1);
   }
   
   else if (RightWristY>200 && RightWristY<=300){
       document.getElementById("sp").innerHTML="The speed is 1.5x";
        song.rate(1.5);
   }
   
   else if (RightWristY>300 && RightWristY<=400){
       document.getElementById("sp").innerHTML="The speed is 2.0x";
        song.rate(2);
   }
   
   else if (RightWristY>400 && RightWristY<=500){
       document.getElementById("sp").innerHTML="The speed is 2.5x";
        song.rate(2.5);
   }
 }

 
}

function preload(){
    song=loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function pause(){
    song.pause();
}



function modelLoaded(){
    console.log("PoseNet Is Initiaized");
}

function gotPoses(results){

  if (results.length>0){
      console.log(results);
      LeftWristX=results[0].pose.leftWrist.x;
      LeftWristY=results[0].pose.leftWrist.y;
      RightWristX=results[0].pose.rightWrist.x;
      RightWristY=results[0].pose.rightWrist.y;
      ScoreLeftWrist=results[0].pose.keypoints[9].score;
      ScoreRightWrist=results[0].pose.keypoints[10].score;
      console.log("X value of left wrist is"+LeftWristX+" "+"Y value of the left wrist is"+LeftWristY);
      console.log("X value of right wrist is"+RightWristX+" "+"Y value of the right wrist is"+RightWristY);
  }


}