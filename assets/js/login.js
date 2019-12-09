// check if user is logged in show the favorite menu
$(window).load(function() {
    var loggedUserName = sessionStorage.getItem("userName");

    if(loggedUserName != null){
        var navMenu = $('#nav-menu');
        var span = $('<span>').addClass('icon fa fa-heart');
        var aTag = $('<a>').attr('href', 'gallery.html');
        let li = $('<li>');
        aTag.append(span);
        li.append(aTag);
        navMenu.append(li);
    }
});


// firebase reference
var loginAppReference = firebase.database();

// log in button event
$('#openLogin').click(function() {
    var userName = $('#user-name').val();
    var userPw = $('#pw').val();

loginAppReference.ref('user').orderByChild("name").equalTo(userName).once('value').then(function(snapshot) {
    var allUsers = snapshot.val();
    for (var usr in allUsers) {
              // get method is supposed to represent HTTP GET method
              var name = allUsers[usr].name
              var pw = allUsers[usr].pw
              if(userPw == pw){
                sessionStorage.setItem("userName", name);
                sessionStorage.setItem("userUID", usr);
                window.location.href = window.location.href;
                // Retrieve
                // document.getElementById("result").innerHTML = sessionStorage.getItem("userName");
                        }
            }

});
});
// log out button event to clear the session.
$('#Logout').click(function() {
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userUID");
    window.location.href = window.location.href;
});

// $(document).ready(function() {
  
//     var messageAppReference = firebase.database();
    
//     $('#message-form').submit(function(event) {
//       // by default a form submit reloads the DOM which will subsequently reload all our JS
//       // to avoid this we preventDefault()
//       event.preventDefault()
  
//       // grab user message input
//       var message = $('#message').val()
  
//       // clear message input (for UX purposes)
//       $('#message').val('')
  
//       // create a section for messages data in your db
//       var messagesReference = messageAppReference.ref('messages');
  
//       // use the set method to save data to the messages
//       messagesReference.push({
//         message: message,
//         votes: 0
//       })
//     });
//   });
  