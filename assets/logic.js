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
        frequency:frequency
    });
});

//Firebase watch and initial load
dataRef.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().departure);
    console.log(childSnapshot.val().frequency);
});

