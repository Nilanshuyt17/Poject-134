status1 = "";
objects = [];
song = "";

function preload() {
    song = loadSound("alert.mp3");
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("ModelLoaded!");
    status1 = true;
}

function draw() {
    image(video, 0, 0, 400, 400);

    if (status1 != "") {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++) {
            r = random(255);
            g = random(255);
            b = random(255);
            document.getElementById("status").innerHTML = "Status: Object Detected";
            percent = floor(objects[i].confidence * 100);
            fill(r, g, b);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            stroke(r, g, b);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects.length == "1") {
                document.getElementById("Baby_capture").innerHTML = "Baby Found";
                song.stop();
            } else {
                document.getElementById("Baby_capture").innerHTML = "Baby Not Found";
                song.play();
            }
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}