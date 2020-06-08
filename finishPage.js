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

  function extractMoney(string){
    var amount = string.match(/[0-9]+([,.][0-9]+)?/)
    var unit = string.replace(/[0-9]+([,.][0-9]+)?/, "")
    
      return amount[0].replace(",", ".")}
          
    var sum = 0
    var remainingBudget = 0
 // firebase.analytics();
 firebase.database().ref('/budgetList/').once('value').then(function(snapshot){
   
      
    var itemObject = snapshot.val()
    var keys = Object.keys(itemObject)

var currentItem = itemObject[keys[0]];
console.log(currentItem.price)
console.log(parseInt(extractMoney(currentItem.price),10)-10)
if (parseInt(extractMoney(currentItem.price),10)>0){
    var image = document.createElement('img')
    image.src = 'moneyBag.png'
    $(image).css('width','300px')
    $(image).css('height','200px')

    $("#lastWords").append(image)
    words = document.createElement('h3')

    $(words).html('WOW!')
    words2 = document.createElement('h5')
    $(words2).html('You were such a saver today!')
    $("#lastWords").append(words)
    $("#lastWords").append(words2)
    words3 = document.createElement('p')
    remainingBudget =parseInt(currentItem.price) 
    $(words3).css('margin-top','20px')
    $(words3).html('Remaining budget: '+currentItem.price+"$")
    $("#lastWords").append(words3)




}
    





    
  })
  firebase.database().ref('/pressureItemList/').once('value').then(function(snapshot){
    if(snapshot.val()!=null){
      
    var sum = 0
    var itemObject = snapshot.val()
    var keys = Object.keys(itemObject)
    for (var i=0; i<keys.length;i++){
     sum += parseInt(itemObject[keys[i]].price);}
     var price = document.createElement('p')
     $(price).html("Peer pressure savings: "+sum + "$")
          
            $("#lastWords").append(price)

    
    }




    else{
        var price = document.createElement('p')
     $(price).html("Peer pressure savings: "+ "0$")
    
            $("#lastWords").append(price)
    }
    totalSavings = sum + remainingBudget
    var total = document.createElement('p')
    $(total).html("Total savings: "+ totalSavings + "$")
    $(total).css('border','3px solid black')  
    $(total).css('border-radius','3px')  
    $(total).css('border-width','40px;')  
           $("#lastWords").append(total)
  })
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
    
          }).then(function(){ window.location.href='Home.html'
        })
         
  }
  