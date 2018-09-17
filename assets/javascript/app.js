$(document).ready(function() {
    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyDRzz2rDyHjCTKlrvfXziF4-MeghQPcIsY",
    authDomain: "train-scheduler-18c48.firebaseapp.com",
    databaseURL: "https://train-scheduler-18c48.firebaseio.com",
    projectId: "train-scheduler-18c48",
    storageBucket: "train-scheduler-18c48.appspot.com",
    messagingSenderId: "115118991417"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $(document).on("click", "#submit", function() {
        event.preventDefault();
        var trainName = $("#trainNameInput").val();
        var destination = $("#destinationInput").val();
        var firstTrain = $("#trainTimeInput").val();
        var frequency = $("#frequencyInput").val();


        database.ref("trains/").push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        });
    

    });

    var addRow = function(snap) {
        var firstTrain = snap.firstTrain;
        var frequency = snap.frequency;
        var format = dateFns.format;
        var currentTime = new Date ();
        var timeArray = firstTrain.split(":");
        var hours = timeArray[0];
        var minutes = timeArray[1];
        var time1 = dateFns.setHours(dateFns.setMinutes(new Date (), minutes), hours)
        var difference = dateFns.differenceInMinutes(currentTime, dateFns.subYears(time1, 1));
        var getRemainder = difference % frequency;
        var minutesAway = frequency - getRemainder;   
        var nextArrival = dateFns.addMinutes(new Date(), minutesAway);

        var tr = $("<tr>");
        var td1 = $("<td>");
        var td2 = $("<td>");
        var td3 = $("<td>");
        var td4 = $("<td>");
        var td5 = $("<td>");
        tr.append(td1.text(snap.trainName));
        tr.append(td2.text(snap.destination));
        tr.append(td3.text(snap.frequency));
        tr.append(td4.text(format(nextArrival, "HH:mm")));
        tr.append(td5.text(minutesAway));
        tr.addClass("bg-info");
        td1.addClass("text-white");
        td2.addClass("text-white");
        td3.addClass("text-white");
        td4.addClass("text-white");
        td5.addClass("text-white");
        $("tbody").append(tr);
    }

    database.ref("trains").on("child_added", function(snapshot) {
        addRow(snapshot.val());
    })





});



