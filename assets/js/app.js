// Constants:
GIPHY_URL = "https://api.giphy.com/v1/";

// firebase reference
//  var imageAppReference = firebase.database();

// button search for stickers
$('#searchS').click(function() {
  // start loader 
  startLoader();
// GET the search word from HTML by using DOM.
    var searchWord = $('#searchWord').val();
    GIPHY_URL_S = GIPHY_URL + "stickers/search?";
// Get parameters for API URL
let searchOptions = {
    api_key: apiKeyGif, // stored in js/key.js
    q: searchWord,
    limit: 25,
    offset:0,
    rating:'G',
    lang:'en',
  };
  // loop to create the http request.
  for (let key in searchOptions) {
    GIPHY_URL_S +=  key + '=' + searchOptions[key] + '&';
  }
// Create Ajax method to call the API
    $.ajax({
        // type: 'GET',
        url: GIPHY_URL_S,
        success: function(response){
            fetchResponse(response);
        },
        error: function(error) {
            console.log('error');
            console.log(error);
        },
        statusCode: {
            200: function (response) {
              console.log('200');
            },
            201: function (response) {
              console.log('201');
            },
            400: function (response) {
              console.log('400');
            },
            404: function (response) {
              console.log('404');
            }
         },
    });
   
  });
// button search for gif
$('#searchG').click(function() {
   // start loader 
   startLoader();
    // GET the search word from HTML by using DOM.
        var searchWord = $('#searchWord').val();
        GIPHY_URL_G = GIPHY_URL + "gifs/search?";
    // Get parameters for API URL
    let searchOptions = {
        api_key: apiKeyGif, // stored in js/key.js
        q: searchWord,
        limit: 25,
        offset:0,
        rating:'G',
        lang:'en',
      };
      // loop to create the http request.
      for (let key in searchOptions) {
        GIPHY_URL_G +=  key + '=' + searchOptions[key] + '&';
      }
    // Create Ajax method to call the API
        $.ajax({
            // type: 'GET',
            url: GIPHY_URL_G,
            success: function(response){
                fetchResponse(response);
            },
            error: function(error) {
                console.log('error');
                console.log(error);
            },
            statusCode: {
                200: function (response) {
                  console.log('200, ' + response);
                },
                201: function (response) {
                  console.log('201, ' + response);
                },
                400: function (response) {
                  console.log('400, ' + response);
                },
                404: function (response) {
                  console.log('404, ' + response);
                }
             },
        });
      });
  
// fetch function to fetch the images and append them to html
function fetchResponse(response) {
      console.log(JSON.stringify(response));
      $('.polaroid').remove();
      response.data.forEach(element => {
          console.log(element.url);
          console.log(element.id);
          let stickerDiv = $('<div>').addClass('polaroid content2');
          let stickerATag = $('<a>').attr('href', '');

          stickerATag.click(function() {
            event.preventDefault();
            addPhotoToFavorite(element.images.downsized_large.url, element.id);
          });
    
          let sticker = $('<img>').attr({'src': element.images.downsized_large.url,
          'title':element.title}).addClass('image');
          let fav = $('<span>').css('align', 'center').addClass(' icon fa fa-heart');

          stickerATag.append(fav);
          stickerDiv.append(sticker);
          stickerDiv.append(stickerATag);
    
          $('.content').append(stickerDiv);

          
      });
      stopLoader();
  }
// function to add photos to DB.
function addPhotoToFavorite(imageURLParam, id){
    var loggedUserName = sessionStorage.getItem("userName");
    var loggedUserUID = sessionStorage.getItem("userUID");
    if(loggedUserName != null){
      // find if image already in favorite then delete it.
      firebase.database().ref('user/'+loggedUserUID).child('images').orderByChild("imageId")
      .equalTo(id).once('value').then(function(snapshot) {
      if(snapshot && snapshot.val() != null){
        var allImages = snapshot.val();
        var imgKey = null;
        for (var img in allImages) {
          imageId = allImages[img].imageId;
          imageURL = allImages[img].imageURL;
          // get the uniqe id of the image to delete it.
          imgKey = img;
          console.log(imageId);
          console.log(imageURL);
        }
        firebase.database().ref('user/'+loggedUserUID).child('images').child(imgKey).remove();

        showAlert('This sticker has been deleted.')
      } else {
        // else if image is not saved before then add it to the favorite to that user.
        firebase.database().ref('user/'+loggedUserUID).child('images').push({
          imageId: id,
          imageURL: imageURLParam,
        });
        showAlert('This sticker is saved to your favorite')
      }
      });
    } else {
      showAlert('Please Login first!');
    }

  }

  // function to start loader
function startLoader(){
  document.getElementById("preloader").style.display = "block";
  document.getElementById("loader").style.display = "block";
}

// function to stop loader
function stopLoader(){
  document.getElementById("preloader").style.display = "none";
  document.getElementById("loader").style.display = "none";
}

function showAlert(msg){
  var msg = $('<text>').css({'font-size': '20px', 'color': 'black'}).text(msg);
  let logo = $('<img>').attr('src', 'images/fulls/alert.png').css({'height': '5%', 'width': '5%'});
  $('#alertMsg').append(logo);
  $('#alertMsg').append(msg);
  $('#showAlertId').click();
}