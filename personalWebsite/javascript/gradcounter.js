/**
 * @file uses the imported day.js library to run the a countdown timer on the homepage
 * Authors John Fox, dcode (youtuber)
 * this code is mostly from a youtube tutorial at https://www.youtube.com/watch?v=Zr2kBYzcJ14
 */
 
//import the library
dayjs.extend(dayjs_plugin_duration);

/**
 * This function runs on the loading of the page
 * @param {Element} element 
 * @param {string} dateString 
 */
function activateCountdown(element, dateString) {
   const targetDate = dayjs(dateString);

   element.querySelector(".until__event").textContent = `Until ${targetDate.format("D MMMM YYYY")}`;
   setInterval(() => {
      const now = dayjs();
      const gradDuration = dayjs.duration(targetDate.diff(now));

      element.querySelector(".until__numeric--seconds").textContent = gradDuration.seconds().toString();
      element.querySelector(".until__numeric--minutes").textContent = gradDuration.minutes().toString();
      element.querySelector(".until__numeric--hours").textContent = gradDuration.hours().toString();
      element.querySelector(".until__numeric--days").textContent = gradDuration.asDays().toFixed(0).toString();
      //element.querySelector(".until__numeric--months").textContent = gradDuration.months().toString();
      //element.querySelector(".until__numeric--years").textContent = gradDuration.years().toString();
   }, 250)
}

//this is called when the page loads
activateCountdown(document.getElementById("gradCountdown"), "2023-12-22");