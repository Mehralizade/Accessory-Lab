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

    
    function writeToDatabase(){
   
   
    
        var key = firebase.database().ref('/budgetList/').push();
               
                
                 
                  key.set({
                      
                    name:$("#month").val(),
                    price:$("#amount").val()
                  })
                  
              
              
                
                
                }

