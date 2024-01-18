import calculate from "./calculate.js"
import { handleButtonPress, handleClear, handleType } from "./keyHandlers.js"
import copyToClipboard from "./copyToClipboard.js"
import themeSwitcher from "./themeSwitcher.js"

document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener("click", handleButtonPress)
})

document.getElementById("clear").addEventListener("click", handleClear)
document.getElementById('input').addEventListener("keydown", handleType)
document.getElementById("equal").addEventListener("click", calculate)
document.getElementById("copyToClipboard").addEventListener("click",copyToClipboard)
document.getElementById("themeSwitcher").addEventListener("click", themeSwitcher)