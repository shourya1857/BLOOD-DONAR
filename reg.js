document.addEventListener('DOMContentLoaded', function() {

var formContainer = document.getElementById('form-container');
var loginBtn = document.getElementById('donate');
var registerBtn = document.getElementById('check');

loginBtn.addEventListener('click', function() {
  loadForm('reg.html');
});

registerBtn.addEventListener('click', function() {
  loadForm('reg.html');
});

function loadForm(formUrl) {
  fetch(formUrl)
    .then(response => response.text())
    .then(data => {
      formContainer.innerHTML = data;
    });
}

});