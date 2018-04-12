// Initialize Firebase
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDOHeT0HANmL3oxE8pWvqO_vhUkkyCAQLw",
    authDomain: "train-scheduler-dc098.firebaseapp.com",
    databaseURL: "https://train-scheduler-dc098.firebaseio.com",
    projectId: "train-scheduler-dc098",
    storageBucket: "train-scheduler-dc098.appspot.com",
    messagingSenderId: "788802512705"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Creat a click event.
$("#train-btn").on("click", function (event) {
    event.preventDefault();
    console.log("test");
    var name = $("#trainInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var date = moment($("#frequencyInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
    var frequency = $("#minutesInput").val().trim();


    console.log(name);
    console.log(destination);
    console.log(date);
    console.log(frequency);


    database.ref().push({
        name: name,
        destination: destination,
        date: date,
        frequency: frequency,
    })

    // clear text-boxes
    $("#trainInput").val("");
    $("#destinationInput").val("");
    $("#frequencyInput").val("");
    $("#minutesInput").val("");

    // Prevents page from refreshing
    return false;
});

database.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().date);
    console.log(childSnapshot.val().frequency);

    var firebaseName = childSnapshot.val().name;
    var firebaseDestination = childSnapshot.val().destination;
    var firebaseDateInput = childSnapshot.val().date;
    var firebaseFrequency = childSnapshot.val().frequency;

    var diffTime = moment().diff(moment.unix(firebaseDateInput), "minutes");
    var timeRemainder = moment().diff(moment.unix(firebaseDateInput), "minutes") % firebaseFrequency;
    var minutes = firebaseFrequency - timeRemainder;

    var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");
    // Test for correct times and info
    console.log(minutes);
    console.log(nextTrainArrival);
    console.log(moment().format("hh:mm A"));
    console.log(nextTrainArrival);
    console.log(moment().format("X"));

    // Append train info to table on page
		$(".table > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");




    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});