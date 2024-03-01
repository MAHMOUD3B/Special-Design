// change landing background image
let option = true;
let stops;
let storage = localStorage.getItem("btnStatus");
let landing = document.querySelector(".landing");
let backgrounds = [
  "../images/one.jfif",
  "../images/two.jpg",
  "../images/three.jpg",
  "../images/four.jpg",
  "../images/five.jpg",
  "../images/six.jfif",
];
function randImgs() {
  if (option === true) {
    stops = setInterval(() => {
      let random = Math.floor(Math.random() * backgrounds.length);
      landing.style.backgroundImage = `url("${backgrounds[random]}")`;
    }, 5000);
  }
}

// open and close setting box
let gear = document.querySelector(".gear");
let settings = document.querySelector(".setting-box");
let icon = document.querySelector(".icon");
gear.addEventListener("click", () => {
  settings.classList.toggle("open");
  icon.classList.toggle("fa-spin");
});

// change colors from setting box
let colorOptions = document.querySelectorAll(".colors ul li");
colorOptions.forEach((opt) => {
  // check the active icon
  if (opt.dataset.color === localStorage.getItem("colorOne")) {
    opt.classList.add("active");
  }

  // change the value of root colors
  opt.addEventListener("click", (ele) => {
    let currentColor = ele.target.dataset.color;
    let secondColor = ele.target.dataset.altClr;
    document.documentElement.style.cssText = `--color-one: ${currentColor}; --color-three: ${secondColor}`;

    // Save changes in the local storage
    localStorage.setItem("colorOne", currentColor);
    localStorage.setItem("colorTwo", secondColor);

    // remove all classes active from elements and put it on targeted element
    ele.target.parentElement.querySelectorAll(".active").forEach((e) => {
      e.classList.remove("active");
    });
    ele.target.classList.add("active");
  });
});

// get the colors from local storage.
document.documentElement.style.cssText = `--color-one: ${localStorage.getItem(
  "colorOne"
)}; --color-three: ${localStorage.getItem("colorTwo")}`;

// choose random background behavior
document.querySelectorAll(".backgrounds .buttons span").forEach((btns) => {
  if (storage !== null) {
    if (storage === "true") {
      option = true;
      randImgs();
      if (btns.dataset.background === "yes") {
        btns.className = "active";
      }
    } else {
      option = false;
      if (btns.dataset.background === "no") {
        btns.className = "active";
      }
    }
  }
  btns.addEventListener("click", (btn) => {
    btn.target.parentElement.querySelectorAll(".active").forEach((span) => {
      span.classList.remove("active");
    });
    btn.target.classList.add("active");
    if (btn.target.dataset.background === "yes") {
      option = true;
      randImgs();
      localStorage.setItem("btnStatus", true);
    } else {
      option = false;
      randImgs();
      clearInterval(stops);
      localStorage.setItem("background", landing.style.backgroundImage);
      localStorage.setItem("btnStatus", false);
    }
  });
});
landing.style.backgroundImage = localStorage.getItem("background");
console.log(option);

//