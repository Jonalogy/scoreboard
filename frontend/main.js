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

      $('#board').empty()//Drops all child elements

      for(i=0; i<data.length; i++){
        var rowNew = $('<div>').attr('id','row'+data[i]['id']).attr('class','row');
        var idCreate = $('<div>').text(data[i]['id']).attr('class','cell');
        var nameNew = $('<div>').text(data[i].name).attr('class','cell').attr('id','name'+data[i]['id']);
        var scoreNew = $('<div>').text(data[i].score).attr('class','cell').attr('id','score'+data[i]['id']);

        rowNew.append(idCreate).append(nameNew).append(scoreNew);
        rowNew.appendTo($('#board'));

        $('<button>').attr('type','button').attr('id','editButt'+data[i].id).attr('value',data[i].id).text('Edit').appendTo(rowNew);
        $('<button>').attr('type','button').attr('id','deleteButt'+data[i].id).attr('value',data[i].id).text('Delete').appendTo(rowNew);

        $('#editButt'+data[i].id).on('click',function(event){
          var editData = event.target.value;
          edit(editData);
        });

        $('#deleteButt'+data[i].id).on('click',function(event){
          var deleteData = event.target.value;
          remove(deleteData);
        });
      }// End of for loop

    });//End of GET route for /entries
}// End of listAll()

function remove(deleteData){
  $.ajax({
    url:'http://localhost:3000/entries/'+deleteData,
    type: 'DELETE'
  }).done(function(data){
    listAll();
  });

}

function edit(editData){
  var nameHolder = $('#name'+ editData).text();
  console.log(nameHolder)
  $('#name'+ editData).text('');
  $('<input>').attr('type','text').attr('name','name').attr('value',nameHolder).appendTo($('#name'+ editData));

  var scoreHolder = $('#score'+ editData).text();
  $('#score'+ editData).text('');
  $('<input>').attr('type','text').attr('name','name').attr('value',scoreHolder).appendTo($('#score'+ editData));

  // var editForm = $('<form>').attr('id','editForm').appendTo()
}
