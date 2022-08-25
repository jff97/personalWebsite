//this code is mostly from a youtube tutorial at https://www.youtube.com/watch?v=Zr2kBYzcJ14 

dayjs.extend(dayjs_plugin_duration);


function activateCountdown(element, dateString) {
   const targetDate = dayjs(dateString);

   element.querySelector(".until__event").textContent = `Until ${targetDate.format("D MMMM YYYY")}`;
   setInterval(() => {
      const now = dayjs();
      const gradDuration = dayjs.duration(targetDate.diff(now));

      element.querySelector(".until__numeric--seconds").textContent = gradDuration.seconds().toString();
      element.querySelector(".until__numeric--minutes").textContent = gradDuration.minutes().toString();
      element.querySelector(".until__numeric--hours").textContent = gradDuration.hours().toString();
      element.querySelector(".until__numeric--days").textContent = gradDuration.days().toFixed(0).toString();
      element.querySelector(".until__numeric--months").textContent = gradDuration.months().toString();
      element.querySelector(".until__numeric--years").textContent = gradDuration.years().toString();
   }, 250)
}
activateCountdown(document.getElementById("gradCountdown"), "2023-12-22");