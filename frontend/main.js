$(document).ready(function(){
  console.log('DOM content loaded!')

  //#newEntry is the id of the submit button.
  $('#newEntry').submit(function(event){
    event.preventDefault();
    var newData = $('#newEntry').serialize();
    console.log(newData);
    $('#newEntry').trigger('reset');
    addNewScore(newData);
  })

  listAll();
}); //End DOM Content Loaded


////------Functions-------////

function listAll(){
  $.get('http://localhost:3000/entries',function(data){

    for(i=0; i<data.length; i++){
      var idCreate = $('<p>').text(data[i]['id']);
      var idHolder = idCreate.appendTo($('<div>'));
      idHolder.appendTo($('#idCol'));

      var nameNew = $('<p>').text(data[i].name);
      var nameHolder = nameNew.appendTo($('<div>'));
      nameHolder.appendTo($('#nameCol'));

      var scoreNew = $('<p>').text(data[i].score);
      var scoreHolder = scoreNew.appendTo($('<div>'));
      scoreHolder.appendTo($('#scoreCol'));
    }
    });//End of GET route for /entries
}

function addNewScore(newDataSend){
  $.ajax({
    url: 'http://localhost:3000/entries',
    type: 'POST',
    data: newDataSend
  }).done(function(server_data){
    listNewEntry(server_data);
    }
  )}

function listNewEntry(data){
  console.log(data);
  var idCreate = $('<p>').text(data.id);
  var idHolder = idCreate.appendTo($('<div>'));
  idHolder.appendTo($('#idCol'));

  var nameNew = $('<p>').text(data.name);
  var nameHolder = nameNew.appendTo($('<div>'));
  nameHolder.appendTo($('#nameCol'));

  var scoreNew = $('<p>').text(data.score);
  var scoreHolder = scoreNew.appendTo($('<div>'));
  scoreHolder.appendTo($('#scoreCol'));
}//END of listNewEntry()
