const bars = document.querySelector("#bars"),
  strengthDiv = document.querySelector("#strength"),
  emailEl = document.querySelector("#email"),
  passwordInput = document.querySelector("#password");

const strength = {
  1: "weak",
  2: "medium",
  3: "strong",
};

function validateEmail() {
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  
  if (emailInput.value.includes('@') && emailInput.value.includes('.com')) {
    emailError.textContent = '';
  } else {
    emailError.textContent = 'Please enter a valid email address.';
  }
}

const getIndicator = (password, strengthValue) => {
  strengthValue.upper = /[A-Z]/.test(password);
  strengthValue.number = /\d/.test(password);
  strengthValue.lower = /[a-z]/.test(password);
  

  let strengthIndicator = 0;

  for (let metric in strengthValue) {
    if (strengthValue[metric] === true) {
      strengthIndicator++;
    }
  }
  return strength[strengthIndicator] ?? "";
};

const getStrength = (password) => {
  let strengthValue = {
    upper: false,
    lower: false,
    number: false,
  };
  return getIndicator(password, strengthValue);
};

const handleChange = () => {
  let { value: password } = passwordInput;
  console.log(password);
  const strengthText = getStrength(password);
  bars.classList = ""; 

  if (strengthText) {
    strengthDiv.innerText = `${strengthText} password`; 
    bars.classList.add(strengthText);
  } else {
    strengthDiv.innerText = "";
  }
};

const showPasswordCheckbox = document.getElementById('show-password-checkbox');
const passwordField = document.getElementById('password');

showPasswordCheckbox.addEventListener('change', function() {
  if (this.checked) {
    passwordField.type = 'text';
 
  } else {
    passwordField.type = 'password';
    showPasswordCheckbox.nextElementSibling.textContent = "Show Password";
  }
});

passwordInput.addEventListener("input", handleChange);