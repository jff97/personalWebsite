function loadHighQualityImages() {
  // Delay before loading high-quality images
  setTimeout(function() {
    //alert("Before loading high-quality images");
    var picFlowDivs = document.getElementsByClassName('picFlow');
    var imagePromises = [];

    for (var i = 0; i < picFlowDivs.length; i++) {
      var images = picFlowDivs[i].getElementsByTagName('img');

      for (var j = 0; j < images.length; j++) {
        var image = images[j];
        imagePromises.push(loadHighQualityImage(image));
      }
    }

    // Wait for all high-quality images to load
    Promise.all(imagePromises).then(function (loadedImages) {
      // Now that all images are loaded, replace the old ones with the new ones
      for (var i = 0; i < loadedImages.length; i++) {
        var loadedImage = loadedImages[i];
        loadedImage.originalImage.parentNode.replaceChild(loadedImage.highQImg, loadedImage.originalImage);
      }
      
      //alert("After loading high-quality images");
    });
  }, 10);
}

function loadHighQualityImage(image) {
  var lowQSrc = image.src;
  var highQSrc = lowQSrc.replace('/statesLowQ/', '/statesHighQ/');
  var highQImg = new Image();

  var promise = new Promise(function (resolve) {
    highQImg.onload = function () {
      resolve({
        originalImage: image,
        highQImg: highQImg,
      });
    };
  });

  highQImg.src = highQSrc;

  return promise;
}

window.addEventListener('load', loadHighQualityImages);
