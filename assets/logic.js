// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCICNlRxYGxSnFDuc8SM0sshSee54GmmnE",
    authDomain: "train-schedule-2076a.firebaseapp.com",
    databaseURL: "https://train-schedule-2076a.firebaseio.com",
    projectId: "train-schedule-2076a",
    storageBucket: "train-schedule-2076a.appspot.com",
    messagingSenderId: "243610620184",
    appId: "1:243610620184:web:1bc04299792241882cce6d"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var dataRef = firebase.database();
var name = "";
var destination = "";
var departure = "";
var frequency = 0;

$('#add-train').on('click',function(event) {
    event.preventDefault();
    console.log('click');
    name = $('#name-input').val().trim();
    destination = $('#destination-input').val().trim();
    departure = $('#departure-input').val().trim();
    frequency = $('#frequency-input').val().trim();

    dataRef.ref().push({
        name:name,
        destination:destination,
        departure:departure,
        frequency:frequency,
        dateAdded:firebase.database.ServerValue.TIMESTAMP
    });

    //clear text box
    $('#name-input').val('');
    $('#destination-input').val('');
    $('#departure-input').val('');
    $('#frequency-input').val('');
});



//Firebase watch and initial load
dataRef.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().departure);
    console.log(childSnapshot.val().frequency);


    //First Time
    var firstTimeConverted = moment(departure, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    //Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    //Difference Between Times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: "+diffTime);
    //Time apart
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
    //Minutes Until Train
    var minAway = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minAway);
    // Next Train
    var nextArrival = moment().add(minAway, "minutes");
    var nextArrivalFormat = moment(nextArrival).format("hh:mm");
    console.log("ARRIVAL TIME: " + nextArrivalFormat);
    //Propogate Train list
    $('#train-list').prepend('<tr><td scope="row" class="name">'+childSnapshot.val().name+'</th><td class="destination">'+childSnapshot.val().destination+'</td><td class="frequency">'+childSnapshot.val().frequency+
    '</td><td class= "nextArrival">'+nextArrivalFormat+'</td><td class="minAway">'+minAway+'</td></tr>')
}, function(errorObject) {
    console.log("Errors handled: "+errorObject.code);
});