function loadHighQualityImages() {
  // Delay the image loading for 4 seconds
  setTimeout(function () {
    // Get all the images
    var picFlowDivs = document.getElementsByClassName('picFlow');
    var imageList = [];

    for (var i = 0; i < picFlowDivs.length; i++) {
      var images = picFlowDivs[i].getElementsByTagName('img');

      for (var j = 0; j < images.length; j++) {
        imageList.push(images[j]);
      }
    }
    // Start dual loading
    for (var i = 0; i < imageList.length; i++) {
      var image = imageList[i];
      var lowQSrc = image.src;
      var highQSrc = lowQSrc.replace('/statesLowQ/', '/statesHighQ/');
      var highQImg = new Image();

      highQImg.onload = (function (img, highQSrc) {
        return function () {
          img.src = highQSrc;
        };
      })(image, highQSrc);

      highQImg.src = highQSrc;
      image.parentNode.appendChild(highQImg);
    }
  }, 100); // Delay for 1/10 of a second
}

window.addEventListener('load', loadHighQualityImages);
 