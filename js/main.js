// Listen for form Submit

document.getElementById('myForm').addEventListener('submit',saveBookmark);

function saveBookmark(e){
//Get form values
  var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

if(!siteName || !siteUrl )
{
  alert('Please fill in the form');
  return false;
}

  if(!validateForm(siteName,siteUrl)){
    return false;
  }
  var bookmark = {
    name: siteName,
    url: siteUrl

  }
  //Local Storage test
  //stores Strings
  /*localStorage.setItem('test','Hello World');
  console.log(localStorage.getItem('test'));
  localStorage.removeItem('test');
  console.log(localStorage.getItem('test'));*/

    // Test if bookmarks is null
    if(localStorage.getItem('bookmarks')=== null){
      var bookmarks = [];
      bookmarks.push(bookmark);
      localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }else{
      //Get bookmarks from local Storage
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      //Add Bookmark to array
      bookmarks.push(bookmark);
      //Reset back to local Storage
      localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

      //Re -fetch bookmarksresults
      //Clear FORM
      document.getElementById('myForm').reset();
      fetchBookmarks();

    }
  e.preventDefault(); //Prevent form from submitting
}

function deleteBookmark(url)
{
//Get bookmarks from local Storage
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//Loop thru bookmarks
for(var i = 0; i<bookmarks.length; i++){
  if(bookmarks[i].url == url){
    bookmarks.splice(i,1);
  }
}
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  fetchBookmarks();
}
//Fetch bookmarks
function fetchBookmarks(){
  //Get bookmarks from local Storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //Get output id
  var bookmarksresults = document.getElementById('bookmarksresults');

  bookmarksresults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksresults.innerHTML += '<div class ="card bg-light text-dark card-body">'+
                                  '<h3>'+name+
                                  ' <a class = "btn btn-default" target="_blank" href="'+url+'">Visit</a>' +
                                  ' <a onclick = "deleteBookmark(\''+url+'\')"class = "btn btn-danger" href="#">Delete</a>' +
                                  '</h3>'+
                                  '</div>';
  }

}
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please use a vailid website URL. It\'s best to copy and paste the entire web address from your browser\'s address bar ;-)');
    return false;
  }

  return true;
}
