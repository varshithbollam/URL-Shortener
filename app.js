"use strict";

const shortlyInput = document.querySelector(".url-input");
const shortlyBtn = document.querySelector(".url-button");
const shortlyResult = document.querySelector(".hidden-result");
const insertedLink = document.querySelector(".inserted-link");
const shortCode = document.querySelector(".short-code");
const parentNode = document.querySelector(".search-result-block");
const errorMsg = document.querySelector(".error-msg");

//URL Validiation
function urlValidation(defaultUrl) {
  const urlRule =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  if (defaultUrl.match(urlRule)) {
    return true;
  } else {
    return false;
  }
}

// URL Submission Click Event
const apiFunc = shortlyBtn.addEventListener("click", function () {
  let inputValue = shortlyInput.value;
  //URL Validation
  if (!urlValidation(inputValue)) {
    // alert("Please enter a valid URL!");
    errorMsg.classList.add("shown");
    shortlyInput.classList.add("shown");
    errorMsg.innerHTML = "Please enter a link here";
  } else {
    errorMsg.classList.remove("shown");
    shortlyInput.classList.remove("shown");

    //Passed Validation - init API
    fetch(`https://api.shrtco.de/v2/shorten?url=` + inputValue)
      .then((response) => response.json())
      .then((response) => {
        if (response.ok) {
          let shortlyCode = response.result.code;
          //Started Cloning
          let mainClone = shortlyResult.cloneNode(true);
          // mainClone.classList = "search-result";
          mainClone.classList.replace("hidden-result", "search-result");

          //Finished Cloning
          //Storage
          sessionStorage.setItem("cloneCache", parentNode.innerHTML);

          //Target clone child elements
          let cloneLink = mainClone.querySelector(".inserted-link");

          let cloneResultLink = mainClone.querySelector(".short-code");
          let cloneCopyBtn = mainClone.querySelector(".copy-btn");
          //Storage
          sessionStorage.setItem("cloneCopyBtn", cloneCopyBtn.outerHTML);

          //Inserting value of search input
          cloneLink.textContent = `${inputValue}`;

          //Storage
          sessionStorage.setItem("cloneLink", cloneLink.textContent);

          //Inserting the result value
          cloneResultLink.textContent = `shrtco.de/${shortlyCode}`;

          //Storage
          sessionStorage.setItem(
            "cloneResultLink",
            cloneResultLink.textContent
          );

          parentNode.appendChild(mainClone);

          //Link Copy Event
          cloneCopyBtn.addEventListener("click", function (e) {
            e.preventDefault();
            //Target text
            let textToCopy = cloneResultLink.textContent;
            //  Copy Text
            navigator.clipboard.writeText(textToCopy);
            //Change CSS
            cloneCopyBtn.textContent = "Copied!";
            cloneCopyBtn.style.backgroundColor = "var(--dark-violet)";
            setTimeout(function () {
              cloneCopyBtn.textContent = "Copy";
              cloneCopyBtn.style.backgroundColor = "var(--cyan)";
            }, 1000);
          });
        } else {
          console.log("error");
        }
      });
  }
});

// Reload function
window.onload = () => {
  let mainClone = shortlyResult.cloneNode(true);
  mainClone.classList.replace("hidden-result", "search-result");
  let cloneLinkField = mainClone.querySelector(".inserted-link");
  let cloneResultLink = mainClone.querySelector(".short-code");

  //Retrieving
  let originalHtml = sessionStorage.getItem("cloneCache");
  let cloneLink = sessionStorage.getItem("cloneLink");
  let cloneResultLinks = sessionStorage.getItem("cloneResultLink");

  //Injecting
  cloneLinkField.innerHTML = cloneLink;
  cloneResultLink.textContent = cloneResultLinks;
  parentNode.appendChild(mainClone);
  parentNode.innerHTML = originalHtml;

  //Repeating Copy Event
  let cloneCopyBtn = parentNode.querySelector(".copy-btn");
  console.log(cloneCopyBtn);

  cloneCopyBtn.addEventListener("click", function (e) {
    e.preventDefault();
    //Target text
    let textToCopy = cloneResultLink.textContent;
    //  Copy Text
    navigator.clipboard.writeText(textToCopy);
    //Change CSS
    cloneCopyBtn.textContent = "Copied!";
    cloneCopyBtn.style.backgroundColor = "var(--dark-violet)";
    setTimeout(function () {
      cloneCopyBtn.textContent = "Copy";
      cloneCopyBtn.style.backgroundColor = "var(--cyan)";
    }, 1000);
  });
};

// sessionStorage.clear();

//Hamburger Menu
const burgerIcon = document.querySelector(".fa-bars");
const navMenu = document.querySelector(".menu-section");
const mainElement = document.querySelector(".main-container");

//Toggle Menu
const menuToggle = () => navMenu.classList.toggle("show");
//Remove Menu
const removeMenu = () => navMenu.classList.remove("show");

//Toggle menu with hamburger
burgerIcon.addEventListener("click", function () {
  menuToggle();
});

//Remove menu by clicking outside navigation
mainElement.addEventListener("click", function () {
  removeMenu();
});
