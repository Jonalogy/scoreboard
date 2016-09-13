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


////------Function Hoisting-------////
function listAll(){
  $.get('http://localhost:3000/entries',function(data){

      for(i=0; i<data.length; i++){
        var rowNew = $('<div>').attr('id','row'+data[i]['id']).attr('class','row');
        var idCreate = $('<div>').text(data[i]['id']).attr('class','cell');
        var nameNew = $('<div>').text(data[i].name).attr('class','cell');
        var scoreNew = $('<div>').text(data[i].score).attr('class','cell');

        rowNew.append(idCreate).append(nameNew).append(scoreNew);
        rowNew.appendTo($('#board'));

        $('<button>').attr('type','button').attr('id','editButt'+data[i].id).text('Edit').appendTo(rowNew);
        $('<button>').attr('type','button').attr('id','deleteButt'+data[i].id).text('Delete').appendTo(rowNew);
      }// End of for loop

    });//End of GET route for /entries
}// End of listAll()

function addNewScore(newDataSend){
  $.ajax({
    url: 'http://localhost:3000/entries',
    type: 'POST',
    data: newDataSend
    }).done(function(server_data){
    listNewEntry(server_data);
    })


  function listNewEntry(data){
    var rowNew = $('<div>').attr('id','row'+data.id).attr('class','row');
    var idCreate = $('<div>').text(data.id).attr('class','cell');
    var nameNew = $('<div>').text(data.name).attr('class','cell');
    var scoreNew = $('<div>').text(data.score).attr('class','cell');

    rowNew.append(idCreate).append(nameNew).append(scoreNew);
    rowNew.appendTo($('#board'));

    $('<button>').attr('type','button').attr('id','editButt'+data.id).text('Edit').appendTo(rowNew);
    $('<button>').attr('type','button').attr('id','deleteButt'+data.id).text('Delete').appendTo(rowNew);
  }//END of listNewEntry()

}//END of addNewScore()
