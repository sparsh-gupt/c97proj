//ADD YOUR FIREBASE LINKS HERE

// Your web app's Firebase configuration
var firebaseConfig = {
      apiKey: "AIzaSyBw3iQYMpCT0R-uNKeL2oGlpFS69WcZEHA",
      authDomain: "kwittersparsh.firebaseapp.com",
      databaseURL: "https://kwittersparsh-default-rtdb.firebaseio.com",
      projectId: "kwittersparsh",
      storageBucket: "kwittersparsh.appspot.com",
      messagingSenderId: "530716107994",
      appId: "1:530716107994:web:37c029d9d4e0a101f071e3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

add_user = localStorage.getItem("email");
document.getElementById("user_name").innerHTML = "Welcome " + add_user + "!";

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log("Room Name - " + Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;

                  //End code
            });
      });
}
getData();


function addRoom() {
      Room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(Room_name).update({
            purpose: "adding room name"
      });
      localStorage.setItem("room_name", Room_name);
      window.location = "kwitter_page.html";
}

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}