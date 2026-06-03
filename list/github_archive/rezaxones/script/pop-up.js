$(document).ready(function(){

  $('#disclaimerModal').fadeIn(300);

  $('#acceptBtn').click(function(){
      $('#disclaimerModal').fadeOut(300);
  });
  
  $('#disclaimerModal').click(function(e){
      e.stopPropagation();
  });

});