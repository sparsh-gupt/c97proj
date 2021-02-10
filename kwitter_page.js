//YOUR FIREBASE LINKS
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
email = localStorage.getItem("email");
room_name = localStorage.getItem("room_name");

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name1 = message_data["name"];
                        like = message_data["like"];
                        message = message_data["message"];
                        message = message_data['message'];

                        like = message_data['like'];
                        name_with_tag = "<h4> " + name1 + "<img class='user_tick' src='tick.png'></h4>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;
                        //End code


                  }
            });
      });
}
var mySound;

function sound(src) {
      this.sound = document.createElement("audio");
      this.sound.src = src;
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.sound.style.display = "none";
      document.body.appendChild(this.sound);
      this.play = function () {
            this.sound.play();
      }
      this.stop = function () {
            this.sound.pause();
      }
}

function updateLike(message_id) {
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updatedlikes = Number(likes) + 1;
      firebase.database().ref(room_name).child(message_id).update({
            like: updatedlikes
      });
      mySound = new sound("like_sound.mp3");
      console.log(mySound)
      mySound.play();
}

getData();

function logout() {
      localStorage.removeItem("email");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: email,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}