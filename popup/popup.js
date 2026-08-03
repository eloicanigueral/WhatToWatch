// popup.js basic structure

const button = document.getElementById('pickRandomVideo');
const statusText = document.getElementById('status');

button.addEventListener('click', function() { // when clicking the main button:
    
    statusText.innerText = "If this is shown, js works! jeje";
});



