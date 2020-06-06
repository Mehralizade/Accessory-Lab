$(document).ready(function () {
    var firebaseConfig = {
        apiKey: "AIzaSyAbfoVxmt9CX2Roj20RCx5CSV05OW_TxLs",
        authDomain: "accessories-dc172.firebaseapp.com",
        databaseURL: "https://accessories-dc172.firebaseio.com",
        projectId: "accessories-dc172",
        storageBucket: "accessories-dc172.appspot.com",
        messagingSenderId: "669280046057",
        appId: "1:669280046057:web:f0b77cd35ec6bde9869978",
        measurementId: "G-K78LZWQ4L6"
    };
    firebase.initializeApp(firebaseConfig);

    function writeToDataBase(mounth,amount) {
        var newKey = firebase.database().ref('/thresholds/').push();
        newKey.set({
            Mounth: mounth,
            Amount: amount,
            
        })
    }
    writeToDataBase("sdfsf","sdfs")
    var setBudget = document.getElementById("set__budget") 
    $("#set__budget").click(function () {
        writeToDataBase("asda", "amount")
    });
    })
