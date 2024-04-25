document.getElementById("currentYear").innerText = new Date().getFullYear();

const btn_dark_mode = document.getElementById("btn_dark_mode");
var element = document.body;

function checkTheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    // Dark mode is enabled
    element.classList.add("dark-mode");
  } else {
    // Light mode is enabled or unable to determine
    element.classList.remove("dark-mode");
  }
}

// checkTheme();

btn_dark_mode.addEventListener("click", () => {
  element.classList.toggle("dark-mode");
});
