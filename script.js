var menuBtn = document.getElementById("menu-btn");
var menuClose = document.getElementById("menu-close");
var navUl = document.querySelector("nav .navigation ul");

menuBtn.addEventListener("click", () => {
  navUl.classList.add("active");
});

menuClose.addEventListener("click", () => {
  navUl.classList.remove("active");
});

// Counters
var CountDownDate = new Date("Apr 5, 2024 00:00:00").getTime();
var x = setInterval(function () {
  var now = new Date().getTime();
  var distance = CountDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = "" + days + " Days";
  document.getElementById("hours").innerHTML = "" + hours + " Hours";
  document.getElementById("minutes").innerHTML = "" + minutes + " Minutes";
  document.getElementById("seconds").innerHTML = "" + seconds + " Seconds";
}, 1000);

// Home page Validation
document.querySelector("#bt-submit").addEventListener("click", () => {
  pname = /^[A-z]+$/;
  bt_name = document.querySelector("#bt-name");
  pemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  bt_email = document.querySelector("#bt-email");
  pnumber = /^\d{10}$/;
  bt_number = document.querySelector("#bt-number");

  if (pname.test(bt_name.value)) {
    if (pemail.test(bt_email.value)) {
      if (pnumber.test(bt_number.value)) {
        alert("Submitted Successfully");
      } else {
        alert("Invaid Number: ");
      }
    } else {
      alert("Invalid E-mail: ");
    }
  } else {
    alert("Invalid Name: ");
  }
});

document.querySelector("#submit").addEventListener("click", () => {
  pemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  bt_email = document.querySelector("#bt-email");

  if (pemail.test(bt_email.value)) {
    alert("Submited");
  } else {
    alert("Invalid E-Mail");
  }
});
