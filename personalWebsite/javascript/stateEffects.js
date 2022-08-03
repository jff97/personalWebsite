$("path, circle").hover(
  function(e) {
    $('#info-box').css('display','block');
    $('#info-box').html($(this).data('info'));
  }
);

$("path, circle").mouseleave(
  function(e) {
    $('#info-box').css('display','none');
  }
);

$(document).mousemove(
  function(e) {
    $('#info-box').css('top',e.pageY-$('#info-box').height()-30);
    $('#info-box').css('left',e.pageX-($('#info-box').width())/2);
  }
).mouseover();

var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if(ios) {
  $('a').on('click touchend', function() {
    var link = $(this).attr('href');
    window.open(link,'_blank');
    return false;
  });
}


//my stuff below
$("path, circle").click(
  function checkVisitedList(e) {
    for (var i = 0; i < visitedList.length; i++) {
      if (e.currentTarget.id === visitedList[i]) {
        window.location.replace('state/' + e.currentTarget.id + '.html');
      }
    }
  }
)
//Edit the visited list when you add a new state page
let visitedList = ["WI", "MN" ,"IL", "SD", "IN", "KY", "TN", "GA", "FL", "IA"];


