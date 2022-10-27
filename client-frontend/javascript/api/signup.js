const login_form = document.querySelector('.login-form')

const name_input = document.querySelector('#name')
const name_message = document.querySelector('#input-name')

const username = document.querySelector('#username')
const username_message = document.querySelector('#input-username')

const email = document.querySelector('#email')
const email_message = document.querySelector('#input-email')

const password = document.querySelector('#password')
const password_message = document.querySelector('#input-password')

const password_conf = document.querySelector('#password-confirm')
const password_conf_message = document.querySelector('#input-password-confirm')

const success_message = document.querySelector('.success-message')
const error_message = document.querySelector('.error-message')

function removeErrorMessages(parent) {
  const inputs = Array.from(parent.querySelectorAll('.input'))

  const errors = Array.from(parent.querySelectorAll('.input-message'))
  console.log(errors)
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', () => {
      errors[i].textContent = ''
    })
  }
}

removeErrorMessages(login_form)

const isNotEmpty = (input, error, name) => {
  if (input.length > 0) {
    error.classList.add('hide')
    return true
  } else {
    error.classList.remove('hide')
    error.innerText = `${name} should not be empty!`
    return false
  }
}

const checkPassMatch = (password, confirm, error) => {
  if (password === confirm) {
    error.classList.add('hide')
    return true
  } else {
    error.classList.remove('hide')
    error.innerText = `Passwords are not matching`
    return false
  }
}

function validEmail(email, error) {
  const pattern = /^\w{3,}@\w{3,}\.\w{2,}$/
  const result = email.search(pattern)
  if (result == -1) {
    error.classList.remove('hide')
    error.innerText = `Email not valid`
    return false
  } else {
    error.classList.add('hide')
    return true
  }
}

const validName = (name, error, title) => {
  const pattern = /\w{5,}/
  result = name.search(pattern)
  if (result == -1) {
    error.classList.remove('hide')
    error.innerText = `${title} should be at least 5 characters`
    return false
  } else {
    error.classList.add('hide')
    return true
  }
}

const strongPass = (password, error) => {
  let one_upper = /(?=.*?[A-Z])/
  let one_lower = /(?=.*?[a-z])/
  let one_digit = /(?=.*?[0-9])/
  let min = /.{8,}/
  let text = ''
  if (password.search(one_upper) == -1) {
    text = `Password should have at least one upper letter`
    error.classList.remove('hide')
    error.innerText = text
    return false
  }

  if (password.search(one_lower) == -1) {
    text = `Password should have at least one lower letter`
    error.classList.remove('hide')
    error.innerText = text
    return false
  }

  if (password.search(one_digit) == -1) {
    text = `Password should have at least one number`
    error.classList.remove('hide')
    error.innerText = text
    return false
  }

  if (password.search(min) == -1) {
    text = `Password should be at least 8 characters`
    error.classList.remove('hide')
    error.innerText = text
    return false
  }

  if (text == '') {
    error.classList.add('hide')
    return true
  }
}

const signup = async (data) => {
  const response = await axios.post(
    'http://localhost/e-commerce-project/e-commerce-server/api/signup.php',
    data
  )

  console.log(response.data)

  if ((response.data.status)) {
    //success

    error_message.classList.add('hide')
    error_message.textContent = ''

    success_message.classList.remove('hide')
    success_message.textContent = response.data.message

    setTimeout(function () {
      console.log("done")
      window.location.href = './index.html'
    }, 800)
  } else {
    //error
    success_message.classList.add('hide')
    success_message.textContent = ''

    error_message.classList.remove('hide')
    error_message.textContent = response.data.message
  }
}
login_form.addEventListener('submit', (e) => {
  e.preventDefault()

  if (
    validName(name_input.value, name_message, 'Name') &&
    validName(username.value, username_message, 'Username') &&
    isNotEmpty(email.value, email_message) &&
    validEmail(email.value, email_message) &&
    isNotEmpty(password.value, password_message, 'Password') &&
    strongPass(password.value, password_message) &&
    isNotEmpty(
      password_conf.value,
      password_conf_message,
      'Confirm Password'
    ) &&
    checkPassMatch(password.value, password_conf.value, password_conf_message)
  ) {
    const data = new FormData()
    data.append('username', username.value)
    data.append('password', password.value)
    data.append('email', email.value)
    data.append('type', 'client')
    data.append('name', name_input.value)
    signup(data)
  } else {
    //prevented
    // error_message.classList.remove('hide')
    // error_message.textContent = 'Fill all the fields'

    e.preventDefault()
  }
})
