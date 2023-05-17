Webcam.set({
    width : 350,
    height : 300,
    image_format : 'png',
    png_quality : 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">';
    });
}
console.log('ml5 version = ', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/VhQINWrgT/model.json', modelloaded);
function modelloaded(){
    console.log("model loaded");
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = tospeak;
    var utterthis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterthis);
}
function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotresult);
}
function gotresult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        if(results[0].label == "amazing"){
            tospeak = "amazing";
            document.getElementById("update_emoji").innerHTML = "&#128076";
        }
        if(results[0].label == "best"){
            tospeak = "all the best";
            document.getElementById("update_emoji").innerHTML = "&#128077";
        }
        if(results[0].label == "victory"){
            tospeak = "Victory";
            document.getElementById("update_emoji").innerHTML = "&#9996";
        }
        speak();
    }
}