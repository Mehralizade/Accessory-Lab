
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
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 // firebase.analytics();
var selectedFile;
  $("#exampleFormControlFile1").on("change", function(event) {
      selectedFile = event.target.files[0]
  })

function uploadFile(){
    var itemName = selectedFile.name
    var storageRef = firebase.storage().ref('/pressureSavings/' + itemName);
    var uploadTask = storageRef.put(selectedFile)
   
    uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          var key = firebase.database().ref('/pressureItemList/').push();
       
        
         
          key.set({
              
              url: downloadURL,
              name: $("#itemName").val(),
              price:$("#exampleFormControlPrice").val(),
             
          })
          
      
        });
        
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        
      });
  }
  function displayData(){
      firebase.database().ref('/pressureItemList/').once('value').then(function(snapshot){
        if(snapshot.val()!=null){
          
        var itemObject = snapshot.val()
        var keys = Object.keys(itemObject)
          
        for (var i=0; i<keys.length;i++){
 currentItem = itemObject[keys[i]];
if(i%3==0){
currentRow = document.createElement('div')
        $(currentRow).addClass('row')
        $("#contents").append(currentRow)
}
var col =document.createElement('div')
$(col).addClass('col-lg-4 col-md-3 col-sm-12')
var card =document.createElement('div')
$(card).addClass('card')
card2 = document.createElement('div')

$(card2).addClass('row card-body')

col2 = document.createElement('div')
$(col2).addClass('col-sm-6')

var itemName = document.createElement('h4')
$(itemName).addClass('card-subtitle mb-2 text-muted')
var itemPrice = document.createElement('h6')
var itemPlace =document.createElement('h6')
var addInfo =document.createElement('h6')
$(itemName).html(currentItem.name)
$(itemPrice).html('Price: ' + currentItem.price)



var image = document.createElement('img')
$(image).addClass('col-sm-6')
image.src = currentItem.url
$(image).addClass('contentImage')
$(col2).append(itemName)
$(col2).append(itemPrice)
$(col2).append(itemPlace)
$(col2).append(addInfo)
$(card2).append(image)
$(card2).append(col2)
$(card).append(card2)
$(col).append(card)
$(currentRow).append(col)
        }}
      })
  }
displayData()