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

    // Snapshot Data to Variables
    var nameDisplay = (childSnapshot.val().name);
    var destinationDisplay = (childSnapshot.val().destination);
    var departureDisplay = (childSnapshot.val().departure);
    var frequencyDisplay = (childSnapshot.val().frequency);

    //First Time
    var firstTimeConverted = moment(departureDisplay, "HH:mm").subtract(1, "years");
    //Difference Between Times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    //Time apart
    var tRemainder = diffTime % frequencyDisplay;
    //Minutes Until Train
    var minAway = frequencyDisplay - tRemainder;
    // Next Train
    var nextArrival = moment().add(minAway, "minutes");
    var nextArrivalFormat = moment(nextArrival).format("hh:mm");
    //Propogate Train list
    $('#train-list').prepend('<tr><td scope="row" class="name">'+nameDisplay+'</th><td class="destination">'+destinationDisplay+'</td><td class="frequency">'+frequencyDisplay+
    '</td><td class= "nextArrival">'+nextArrivalFormat+'</td><td class="minAway">'+minAway+'</td></tr>')
}, function(errorObject) {
    console.log("Errors handled: "+errorObject.code);
});