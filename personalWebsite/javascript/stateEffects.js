/**
 * @file the jquery that makes the svg us map interactive 
 * author John Fox wrote one function at the bottom
 * author David Marcus wrote all other jquery functions
 */

/**
 * when a state or the circle representing DC get hovered make a info box for the state appear next to the cursor
 */
$("path, circle").hover(
  function(e) {
    $('#info-box').css('display','block');
    $('#info-box').html($(this).data('info'));
  }
);

/**
 * when a state or the circle representing DC have the cursor leave them hide the info box
 */
$("path, circle").mouseleave(
  function(e) {
    $('#info-box').css('display','none');
  }
);

/**
 * Make the info box follow the cursor with a mouse move event
 */
$(document).mousemove(
  function(e) {
    $('#info-box').css('top',e.pageY-$('#info-box').height()-30);
    $('#info-box').css('left',e.pageX-($('#info-box').width())/2);
  }
).mouseover();

/**
 * Make the map work better on mobile
 */
var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if(ios) {
  $('a').on('click touchend', function() {
    var link = $(this).attr('href');
    window.open(link,'_blank');
    return false;
  });
}


//Code written by John Fox below
/**
 * when a state or the circle representing DC gets clicked redirect the page to one of the state gallery pages with 
 * a name that matches the id of the svg path or circle
 */
$("path, circle").click(
  function checkVisitedList(e) {
    for (var i = 0; i < visitedList.length; i++) {
      if (e.currentTarget.id === visitedList[i]) {
        window.location.href = 'state/' + e.currentTarget.id + '.html'
      }
    }
  }
);
//Edit the visited list when you add a new state page
let visitedList = 
  [
    "WI", "MN" ,"IL", "SD", "IN", "KY", "TN", "GA", "FL", "IA", "MO", "KS", "NE", "NC", "OH", "SC", "WV", "VA", "DE", "DC"
  ];