
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
function extractMoney(string){
    var amount = string.match(/[0-9]+([,.][0-9]+)?/)
    var unit = string.replace(/[0-9]+([,.][0-9]+)?/, "")
    
      return amount[0].replace(",", ".")}
        

function uploadFile(){
  
    var itemName = selectedFile.name
    var storageRef = firebase.storage().ref('/items/' + itemName);
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
          var key = firebase.database().ref('/itemList/').push();
       
        
          var updateData = {}
          key.set({
              
              url: downloadURL,
              name: $("#itemName").val(),
              price:$("#exampleFormControlPrice").val(),
              place:$("#exampleFormControlPlace").val(),
              additionalInfo:$("#exampleFormControlTextarea1").val(),
              bought:false
          })
          
      
        });
        
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        
      });
  }
  function displayData(){
    var result = []
    var val = 0
      firebase.database().ref('/itemList/').once('value').then(function(snapshot){
        if(snapshot.val()!=null){
          
        var itemObject = snapshot.val()
        var keys = Object.keys(itemObject)
          console.log(keys)
        for (var i=0; i<keys.length;i++){
 currentItem = itemObject[keys[i]];
obj ={
}
obj['name'] = currentItem.name
obj['price'] =currentItem.price
obj['place'] = currentItem.place
obj['url']  =currentItem.url
obj['addInfo'] = currentItem.additionalInfo
result.push(obj)

if(i%3==0){
currentRow = document.createElement('div')
        $(currentRow).addClass('row')
        $("#contents").append(currentRow)
}
var col =document.createElement('div')


$(col).addClass('col-lg-4 col-md-4 col-sm-12 col-xs-12')
var card =document.createElement('div')
$(card).addClass('card')

card2 = document.createElement('div')

$(card2).addClass('row card-body')

col2 = document.createElement('div')
$(col2).addClass('col-sm-6')
$(col2).attr('id', val.toString())
val = val+1
var itemName = document.createElement('h4')
$(itemName).addClass('card-subtitle mb-2 text-muted')
var itemPrice = document.createElement('h6')
var itemPlace =document.createElement('h6')
var addInfo =document.createElement('h6')
$(itemName).html(currentItem.name)
$(itemPrice).html('Price: ' + currentItem.price)
$(itemPlace).html('Place: ' + currentItem.place)
$(addInfo).html('Details: ' + currentItem.additionalInfo)
var button = document.createElement('button')

$(button).addClass('btn btn-primary')
if (currentItem.bought){
  $(button).attr('disabled','true')
  $(button).css('background-color','green')
  $(button).html('Bought!')
}
else{
$(button).html('Mark as bought')}
$(button).click(function(){

  pid =parseInt($(this).closest('div').attr('id'))
  
  $(this).attr('disabled','true')
  $(this).css('background-color','green')
  $(this).html('Bought!')
  
       firebase.database().ref('/budgetList/').once('value').then(function(snapshot){
         if (snapshot.val()===null){
           alert('You have to define a budget')
         }
         else{
        var budgetItem = snapshot.val()
        var keys = Object.keys(budgetItem)
        itemObject = budgetItem[keys[0]];
      
        
        if (parseInt(extractMoney(result[pid].price),10)>parseInt(extractMoney(itemObject.price)))
        {
          alert('It exceeds the budget limit!')
        }
        else{
          
          firebase.database().ref("/itemList/").orderByKey()
          .once("value")
        .then(function(snapshot) {
          
          
        snapshot.forEach(function(childSnapshot) {
          var pkey = childSnapshot.key; 
          var chval = childSnapshot.val();
          
      
         if((parseInt(extractMoney(chval.price)) === parseInt(extractMoney(result[pid].price)) && chval.name === result[pid].name)){
            
            firebase.database().ref("/itemList/"+pkey).remove();

            var key = firebase.database().ref('/itemList/').push();
       
        
          var updateData = {}
          key.set({
              
              url: result[pid].url,
              name: result[pid].name,
              price:result[pid].price,
              place:result[pid].place,
              additionalInfo:result[pid].addInfo,
              bought:true
          })
         }
        })
  
        })
          newPrice = parseInt(extractMoney(itemObject.price),10)-parseInt(extractMoney(result[pid].price))
          newPrice = newPrice.toString()
          newName = itemObject.name
       
          firebase.database().ref("/budgetList/").orderByKey()
          .once("value")
        .then(function(snapshot) {
          
          
        snapshot.forEach(function(childSnapshot) {
          var pkey = childSnapshot.key; 
          var chval = childSnapshot.val();
          
      
         
            
            firebase.database().ref("/budgetList/"+pkey).remove();
          
        })
  
        }).then(function(){;
        var newKey = firebase.database().ref('/budgetList/').push();
        newKey.set({
            
            name:newName,
            price:newPrice
            
        })
      })
          var key = firebase.database().ref('/boughtList/').push();
          key.set({
              
              url: result[pid].url,
              name: result[pid].name,
              price:result[pid].price,
              place:result[pid].place
              
          })
        }}
})
})
var image = document.createElement('img')
$(image).addClass('col-sm-6')
image.src = currentItem.url
$(image).css('height','270px')
$(image).addClass('contentImage')
$(col2).append(itemName)
$(col2).append(itemPrice)
$(col2).append(itemPlace)
$(col2).append(addInfo)
$(col2).append(button)
$(card2).append(image)
$(card2).append(col2)
$(card).append(card2)
$(col).append(card)
$(currentRow).append(col)

var button = document.createElement('button')
$(button).addClass('btn btn-warning')
$(button).html('peer pressure savings')
$(button).css('width','145px')
$(button).css('margin-top','4%')
$(button).click(function(){

  pid =parseInt($(this).closest('div').attr('id'))
  
  $(this).attr('disabled','true')
  $(this).css('background-color','green')
  $(this).html('Added!')
  
      
       
     
      
        
       
       
          
          firebase.database().ref("/itemList/").orderByKey()
          .once("value")
        .then(function(snapshot) {
          
          
        snapshot.forEach(function(childSnapshot) {
          var pkey = childSnapshot.key; 
          var chval = childSnapshot.val();
          
      
         if((parseInt(extractMoney(chval.price)) === parseInt(extractMoney(result[pid].price)) && chval.name === result[pid].name)){
            
            firebase.database().ref("/itemList/"+pkey).remove();

            var key = firebase.database().ref('/itemList/').push();
       
        
         
         }
        })
  
        })
         
          var key = firebase.database().ref('/pressureItemList/').push();
          key.set({
              
              url: result[pid].url,
              name: result[pid].name,
              price:result[pid].price,
              
              
          })
      
})
$(button).css('height','50%')
$(col2).append(button)
        }}

      })
  }
function killThemAll(){
  firebase.database().ref("/budgetList/").orderByKey()
          .once("value")
        .then(function(snapshot) {
          
          
        snapshot.forEach(function(childSnapshot) {
          var pkey = childSnapshot.key; 
          var chval = childSnapshot.val();
          
      
         
            
            firebase.database().ref("/budgetList/"+pkey).remove();
          
        })
  
        })
        firebase.database().ref("/itemList/").orderByKey()
          .once("value")
        .then(function(snapshot) {
          
          
        snapshot.forEach(function(childSnapshot) {
          var pkey = childSnapshot.key; 
          var chval = childSnapshot.val();
          
      
         
            
            firebase.database().ref("/itemList/"+pkey).remove();
          
        })
  
        })
        firebase.database().ref("/boughtList/").orderByKey()
          .once("value")
        .then(function(snapshot) {
          
          
        snapshot.forEach(function(childSnapshot) {
          var pkey = childSnapshot.key; 
          var chval = childSnapshot.val();
          
      
         
            
            firebase.database().ref("/boughtList/"+pkey).remove();
          
        })
  
        })
        firebase.database().ref("/pressureItemList/").orderByKey()
          .once("value")
        .then(function(snapshot) {
          
          
        snapshot.forEach(function(childSnapshot) {
          var pkey = childSnapshot.key; 
          var chval = childSnapshot.val();
          
      
         
            
            firebase.database().ref("/pressureItemList/"+pkey).remove();
          
        })
  
        })
}
displayData()
function searchItem(){
  $('#contents').empty()
  var item  = $("#search").val()
  console.log(item.toUpperCase())
    var result = []
    var val = 0
      firebase.database().ref('/itemList/').once('value').then(function(snapshot){
        if(snapshot.val()!=null){
          
        var itemObject = snapshot.val()
        var keys = Object.keys(itemObject)
          console.log(keys)
        for (var i=0; i<keys.length;i++){
 currentItem = itemObject[keys[i]];
obj ={
}
obj['name'] = currentItem.name
obj['price'] =currentItem.price
obj['place'] = currentItem.place
obj['url']  =currentItem.url
obj['addInfo'] = currentItem.additionalInfo
result.push(obj)
console.log(currentItem.name.toUpperCase())
if(currentItem.name.toString().toUpperCase() === item.toString().toUpperCase()){

currentRow = document.createElement('div')
        $(currentRow).addClass('row')
        $("#contents").append(currentRow)

var col =document.createElement('div')


$(col).addClass('col-lg-4 col-md-4 col-sm-12 col-xs-12')
var card =document.createElement('div')
$(card).addClass('card')
card2 = document.createElement('div')

$(card2).addClass('row card-body')

col2 = document.createElement('div')
$(col2).addClass('col-sm-6')
$(col2).attr('id', val.toString())
val = val+1
var itemName = document.createElement('h4')
$(itemName).addClass('card-subtitle mb-2 text-muted')
var itemPrice = document.createElement('h6')
var itemPlace =document.createElement('h6')
var addInfo =document.createElement('h6')
$(itemName).html(currentItem.name)
$(itemPrice).html('Price: ' + currentItem.price)
$(itemPlace).html('Place: ' + currentItem.place)
$(addInfo).html('Details: ' + currentItem.additionalInfo)
var button = document.createElement('button')

$(button).addClass('btn btn-primary')
if (currentItem.bought){
  $(button).attr('disabled','true')
  $(button).css('background-color','green')
  $(button).html('Bought!')
}
else{
$(button).html('Mark as bought')}
$(button).click(function(){

  pid =parseInt($(this).closest('div').attr('id'))
  
  $(this).attr('disabled','true')
  $(this).css('background-color','green')
  $(this).html('Bought!')
  
       firebase.database().ref('/budgetList/').once('value').then(function(snapshot){
         if (snapshot.val()===null){
           alert('You have to define a budget')
         }
         else{
        var budgetItem = snapshot.val()
        var keys = Object.keys(budgetItem)
        itemObject = budgetItem[keys[0]];
      
        
        if (parseInt(extractMoney(result[pid].price),10)>parseInt(extractMoney(itemObject.price)))
        {
          alert('It exceeds the budget limit!')
        }
        else{
          
          firebase.database().ref("/itemList/").orderByKey()
          .once("value")
        .then(function(snapshot) {
          
          
        snapshot.forEach(function(childSnapshot) {
          var pkey = childSnapshot.key; 
          var chval = childSnapshot.val();
          
      
         if((parseInt(extractMoney(chval.price)) === parseInt(extractMoney(result[pid].price)) && chval.name === result[pid].name)){
            
            firebase.database().ref("/itemList/"+pkey).remove();

            var key = firebase.database().ref('/itemList/').push();
       
        
          var updateData = {}
          key.set({
              
              url: result[pid].url,
              name: result[pid].name,
              price:result[pid].price,
              place:result[pid].place,
              additionalInfo:result[pid].addInfo,
              bought:true
          })
         }
        })
  
        })
          newPrice = parseInt(extractMoney(itemObject.price),10)-parseInt(extractMoney(result[pid].price))
          newPrice = newPrice.toString()
          newName = itemObject.name
       
          firebase.database().ref("/budgetList/").orderByKey()
          .once("value")
        .then(function(snapshot) {
          
          
        snapshot.forEach(function(childSnapshot) {
          var pkey = childSnapshot.key; 
          var chval = childSnapshot.val();
          
      
         
            
            firebase.database().ref("/budgetList/"+pkey).remove();
          
        })
  
        }).then(function(){;
        var newKey = firebase.database().ref('/budgetList/').push();
        newKey.set({
            
            name:newName,
            price:newPrice
            
        })
      })
          var key = firebase.database().ref('/boughtList/').push();
          key.set({
              
              url: result[pid].url,
              name: result[pid].name,
              price:result[pid].price,
              place:result[pid].place
              
          })
        }}
})
})
var image = document.createElement('img')
$(image).addClass('col-sm-6')
image.src = currentItem.url
$(image).addClass('contentImage')
$(col2).append(itemName)
$(col2).append(itemPrice)
$(col2).append(itemPlace)
$(col2).append(addInfo)
$(col2).append(button)
$(card2).append(image)
$(card2).append(col2)
$(card).append(card2)
$(col).append(card)
$(currentRow).append(col)

var button = document.createElement('button')
$(button).addClass('btn btn-warning')
$(button).html('Add to peer pressure savings')
$(button).click(function(){

  pid =parseInt($(this).closest('div').attr('id'))
  
  $(this).attr('disabled','true')
  $(this).css('background-color','green')
  $(this).html('Bought!')
  
      
       
     
      
        
       
       
          
          firebase.database().ref("/itemList/").orderByKey()
          .once("value")
        .then(function(snapshot) {
          
          
        snapshot.forEach(function(childSnapshot) {
          var pkey = childSnapshot.key; 
          var chval = childSnapshot.val();
          
      
         if((parseInt(extractMoney(chval.price)) === parseInt(extractMoney(result[pid].price)) && chval.name === result[pid].name)){
            
            firebase.database().ref("/itemList/"+pkey).remove();

            var key = firebase.database().ref('/itemList/').push();
       
        
         
         }
        })
  
        })
         
          var key = firebase.database().ref('/pressureItemList/').push();
          key.set({
              
              url: result[pid].url,
              name: result[pid].name,
              price:result[pid].price,
              
              
          })
      
})
$(button).css('height','50%')
$(col2).append(button)
        }
        }}

      })
  }

