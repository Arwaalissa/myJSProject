// $(window).load(function() {
//     getAllImagesOfUser();
// });

// when page is loaded get all the images.
function getAllImagesOfUser() {
    startLoader();
    // remove previouse images
    // $('.polaroid').remove();
    var loggedUserName = sessionStorage.getItem("userName");
    var loggedUserUID = sessionStorage.getItem("userUID");
    // var imageId = null;
    // var imageURL = null;
    if(loggedUserName != null){
    // get all user images
      firebase.database().ref('user/'+loggedUserUID).child('images').once('value').then(function(snapshot) {
        var allImages = snapshot.val();

            snapshot.forEach((child) => {
              console.log(child.key, child.val()); 

              var imageId = allImages[child.key].imageId;
              var imageURL = allImages[child.key].imageURL;
              console.log(imageId);
              console.log(imageURL);
              let stickerDiv = $('<div>').addClass('polaroid content2');
            let stickerATag = $('<a>').attr('href', '');
    
            stickerATag.click(function() {
              event.preventDefault();
              addPhotoToFavorite(imageURL, imageId);
            });
      
            let sticker = $('<img>').attr('src', imageURL).addClass('image');
            let fav = $('<span>').css('align', 'center').addClass('likeButton icon fa fa-heart');
    
            stickerATag.append(fav);
            stickerDiv.append(sticker);
            stickerDiv.append(stickerATag);
      
            $('.content').append(stickerDiv);
  
            });

        stopLoader();
      });
    }
}
