
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

 function extractMoney(string) {
  var amount = string.match(/[0-9]+([,.][0-9]+)?/)
  var unit = string.replace(/[0-9]+([,.][0-9]+)?/, "")
  if (amount && unit) {
    return {
      amount: +amount[0].replace(",", "."),
      currency: unit
    }
  }
  return null;
}
function uploadFile(){
   
   
    
var key = firebase.database().ref('/budgetList/').push();
       
        
         
          key.set({
              
            name:$("#month").val(),
            price:$("#amount").val()
          })
          
      
      
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        
        }
  function displayData(){
      firebase.database().ref('/budgetList/').once('value').then(function(snapshot){
        if(snapshot.val()===null){
          var row = document.createElement('h2')
          $(row).html('You have not set a budget')
          var button = document.createElement('button')
          $(button).addClass('btn btn-primary')
          $(button).html('Create a one!')
          $(button).click(function(){
            window.location.href='setBudget.html';
            
         })
         $("#contents").append(row)
         $("#contents").append(button)}
         else{
          
        var itemObject = snapshot.val()
        var keys = Object.keys(itemObject)
          console.log(keys)
        
var currentItem = itemObject[keys[0]];
          var container = document.createElement('container')
        var image = document.createElement('img')
        image.src = 'Purse.png'
        $(container).append(image)
        var budget = document.createElement('h4')
        $(budget).html("Your new budget")
        var name = document.createElement('h5')
        $(name).html("Name: " + currentItem.name)

        var price = document.createElement('h5')
        $(price).html("Remaining amount: " + currentItem.price+ "$")
        $(container).append(budget)
        $(container).append(name)
        $(container).append(price)
       
$("#contents").append(container)




        }
      })
  firebase.database().ref('/boughtList/').once('value').then(function(snapshot){
    if(snapshot.val()===null){
      var row = document.createElement('h2')
      $(row).html('You have not anything..')
      
    }
    
     else{
      
    var boughtObject = snapshot.val()
    var keys = Object.keys(boughtObject)
    currentRow = document.createElement('div')
    $(currentRow).addClass('row')
    for (var i=0; i<keys.length;i++){
     
      currentItem = boughtObject[keys[i]];
      
      $("#contents").append(currentRow)
      var col =document.createElement('div')
      $(col).addClass('col-lg-12 col-md-12 col-sm-12')
      var card =document.createElement('div')
      $(card).addClass('card')
      $(card).css('margin','5px')
      card2 = document.createElement('div')
      
      $(card2).addClass('row card-body')
      
      col2 = document.createElement('div')
      $(col2).addClass('col-sm-6')
      
      var itemName = document.createElement('h4')
      $(itemName).addClass('card-subtitle mb-2 text-muted')
      var itemPrice = document.createElement('h6')
      var itemPlace =document.createElement('h6')
      
      $(itemName).html(currentItem.name)
      $(itemPrice).html('Price: ' + currentItem.price)
      $(itemPlace).html('Place: ' + currentItem.place)
      

      var image = document.createElement('img')
      $(image).addClass('col-sm-6')
      $(image).css('height',"250px")
      $(image).css('width',"60px")
      image.src = currentItem.url
      $(image).addClass('contentImage')
   
   




$(col2).append(itemName)
$(col2).append(itemPrice)
$(col2).append(itemPlace)


$(card2).append(image)
$(card2).append(col2)
$(card).append(card2)
$(col).append(card)
$(currentRow).append(col)}
    }

  })
  }
  
function homePage(){
    window.location.href='Home.html';
    
 }
displayData()