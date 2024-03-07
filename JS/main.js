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

// change colors setting
let colorOptions = document.querySelectorAll(".colors ul li");
colorOptions.forEach((opt) => {
  if (opt.dataset.color === localStorage.getItem("colorOne")) {
    opt.classList.add("active");
  }
  opt.addEventListener("click", (ele) => {
    let currentColor = ele.target.dataset.color;
    let secondColor = ele.target.dataset.altClr;
    document.documentElement.style.cssText = `--color-one: ${currentColor}; --color-three: ${secondColor}`;
    localStorage.setItem("colorOne", currentColor);
    localStorage.setItem("colorTwo", secondColor);
    handelActive(ele);
  });
});
document.documentElement.style.cssText = `--color-one: ${localStorage.getItem(
  "colorOne"
)}; --color-three: ${localStorage.getItem("colorTwo")}`;

// change background setting
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
    handelActive(btn);
    if (btn.target.dataset.background === "yes") {
      option = true;
      randImgs();
      localStorage.setItem("btnStatus", true);
      location.reload();
    } else {
      option = false;
      randImgs();
      clearInterval(stops);
      localStorage.setItem("background", landing.style.backgroundImage);
      localStorage.setItem("btnStatus", false);
      location.reload();
    }
  });
});
landing.style.backgroundImage = localStorage.getItem("background");

// change bullets settings
let bulletsSetting = document.querySelectorAll(".bullets-setting span");
let bulletsContainer = document.querySelector(".bullets");
bulletsSetting.forEach((btns) => {
  btns.addEventListener("click", (ele) => {
    if (ele.target.dataset.bullet === "show") {
      bulletsContainer.style.display = "flex";
      localStorage.setItem("bulletsStatus", "flex");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bulletsStatus", "none");
    }
    handelActive(ele);
    localStorage.setItem("bulletsBtns", ele.target.dataset.bullet);
  });
  if (localStorage.getItem("bulletsBtns") === "show") {
    if (btns.dataset.bullet === "show") {
      btns.classList.add("active");
    }
  } else {
    if (btns.dataset.bullet === "hide") {
      btns.classList.add("active");
    }
  }
  bulletsContainer.style.display = localStorage.getItem("bulletsStatus");
});

// skills animation
window.onscroll = function () {
  let skills = document.querySelector(".skills");
  let skillsPosition = skills.offsetTop; // get postion of skills section
  let skillsHeight = skills.offsetHeight; // get the height of skills section
  let pagePosition = window.scrollY; // get the position of page
  let pageHeight = window.innerHeight; // get the height of page
  let condition = skillsPosition - pageHeight + skillsHeight - 50;
  if (pagePosition > condition) {
    let skillsLoop = document.querySelectorAll(".skills .progress span");
    skillsLoop.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  } else {
    let skillsLoop = document.querySelectorAll(".skills .progress span");
    skillsLoop.forEach((span) => {
      span.style.width = 0;
    });
  }
};

// gallary popup
let images = document.querySelectorAll(".gallary .images img");
images.forEach((img) => {
  img.addEventListener("click", (ele) => {
    // create overlay
    let overlay = document.createElement("div");
    overlay.className = "popOverlay";
    document.body.appendChild(overlay);
    // create popup
    let popup = document.createElement("div");
    popup.className = "popup";
    document.body.appendChild(popup);
    // create img
    let image = document.createElement("img");
    image.src = ele.target.currentSrc;
    image.className = "image";
    popup.appendChild(image);
    // append title of image
    if (img.alt !== null) {
      let imageTitle = document.createElement("h3");
      let TitleTxt = document.createTextNode(img.alt);
      imageTitle.className = "imgTitle";
      imageTitle.appendChild(TitleTxt);
      popup.prepend(imageTitle);
      console.log(img.alt);
    }
    // create close button
    let close = document.createElement("span");
    let closeTxt = document.createTextNode("X");
    close.className = "close";
    close.appendChild(closeTxt);
    popup.append(close);
  });
  document.addEventListener("click", (ele) => {
    if (ele.target.className === "close") {
      document.querySelector(".popOverlay").remove();
      document.querySelector(".popup").remove();
    }
  });
});

// side bullets
const bullets = document.querySelectorAll(".bullets .bullet");
bullets.forEach((bull) => {
  bull.addEventListener("click", (ele) => {
    document.querySelector(ele.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// toggle menu
let btn = document.querySelector(".btn-toggle");
btn.addEventListener("click", () => {
  document.querySelector(".navigation").classList.toggle("menu");
  document.querySelectorAll(".btn-toggle span").forEach((span) => {
    span.classList.toggle("opened");
  });
});

// functions
function handelActive(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((e) => {
    e.classList.remove("active");
  });
  event.target.classList.add("active");
}
