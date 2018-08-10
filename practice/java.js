$(document).ready(function()
{
  var totList = [];
  var usersPerPage = 10;
  var currentPage = 1;
  var tableLength ;
  var lastUsedPageNumber = '';
  $.getJSON("https://jsonplaceholder.typicode.com/todos", function(data){
    $.each(data, function(key,value){
        totList.push(value);
    });
    dispTable(totList);
    tableLength = totList.length;
  });

	$('#form-control').on("change",function(){
    var employee_data = [];
    usersPerPage = parseInt(document.getElementById('form-control').value);
    var numPages = Math.ceil(tableLength / usersPerPage);
    $('.pagination').empty()
    $('.pagination').append("<button data-pgnum='prev'>Prev</button>")
    for( i = 1; i <= numPages; i++){
      $('.pagination').append("<button data-pgnum = "+i+">"+i+"</button>")
    }
    $('.pagination').append("<button data-pgnum='next'>Next</button>")

    $("button").on('click', function(){
    $(this).siblings().removeClass('active')
    $(this).addClass('active');
    })
    for(var i = 0; i < usersPerPage ; i++){

      employee_data.push(totList[i]);
    }
    dispTable(employee_data);


    $('button').on('click', function(){

          var pg = $(this).attr('data-pgnum');
          var last , initial, currentList;
          if(pg == "prev")
          {
              if(currentPage == 1)
              {
                  alert('you are already at start page');
                  pg = 1;
              }
              else
              {
                  currentPage -= 1;
                  pg = currentPage;

              }
          }
          else if(pg == "next")
          {
              if(currentPage == numPages)
              {
                  alert('you are already at end page');
                  pg = numPages;
              }
              else
              {
                currentPage +=1;
                pg = currentPage;
              }
          }
          else
          { 
            currentPage = pg; 
          }
          
          last = pg * usersPerPage;
          initial = last - usersPerPage;
          currentList = totList.slice(initial, last);      
          dispTable(currentList);
    });
  });

  console.log(lastUsedPageNumber)

	window.sortTable= function(n)  {
      var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      table = document.getElementById("display");
      switching = true;
      dir = "asc"; 
      while (switching) {
        switching = false;
        rows = table.getElementsByTagName("tr");
        for (i = 1; i < (rows.length - 1); i++){
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("td")[n];
          y = rows[i + 1].getElementsByTagName("td")[n];
          if(n==2 || n==3){
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                  shouldSwitch = true;
                  break;
                }
            }else if (dir == "desc") {
              if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
              }
            }
          }else{
           if(dir == "asc"){
              if (Number(x.innerHTML) > Number(y.innerHTML)) {
                shouldSwitch = true;
                break;
              }
            }else if (dir == "desc") {
              if (Number(x.innerHTML) < Number(y.innerHTML)) {
                 shouldSwitch = true;
                 break;
              }
            }
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          switchcount ++; 
        } 
        else if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
        }
      }
}  


 window.myFunction = function(){
    var heyword = $('#myInput').val().toUpperCase();
      $('tbody tr').each(function(){
        var cols = $(this).find('td');
        $(this).toggle($(this).text().toUpperCase().indexOf(heyword) > -1);
    });
  }

function dispTable(data){
      
    $('#display tbody').empty();
    for(i=0;i<data.length;i++){
        $('tbody').append('<tr><td>'+data[i].userId+'</td><td>'+data[i].id+
          '</td><td>'+data[i].title+'</td><td>'+data[i].completed+'</td></tr>');
    }
}


});







