function displayLinkInfo(type) {
   let linkDisplay = document.getElementById("linkDisplay");
   if (type === "github") {
      linkDisplay.innerHTML = "https://github.com/jff97";
   } else if (type === "email") {
      linkDisplay.innerHTML = "jicfox7@gmail.com";
   } else if (type === "phone") {
      linkDisplay.innerHTML = "(715)-523-1588";
   }
}