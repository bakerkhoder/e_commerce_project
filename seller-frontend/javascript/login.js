const login_form = document.querySelector('.login-form')
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const success_message = document.querySelector('.success-message')
const error_message = document.querySelector('.error-message')
const username_message = document.querySelector('#input-username')
const password_message = document.querySelector('#input-password')
let valid_name, valid_password

const login = async (data) => {
  const response = await axios.post(
    'http://localhost/e-commerce-project/e-commerce-server/api/login_authorization.php',
    data
  )

  console.log(response.data)

  if (response.data.status && response.data.data) {
    //success
    const user = {
      id: response.data.data.user_id,
      username: response.data.data.username,
      token: response.data.data.token,
    }
    console.log(user)
    localStorage.setItem('user', JSON.stringify(user))

    if (login_form.id == 'client') {
      window.location.href = './client_homepage.html'
    } else {
      window.location.href = './dashboard.html'
    }
  } else {
    //error
    error_message.classList.remove('hide')
    error_message.textContent = response.data.message
  }
}
login_form.addEventListener('submit', (e) => {
  e.preventDefault()

  if (valid_name && valid_password) {
    let formData = new FormData()
    formData.append('user_indentifier', username.value)
    formData.append('password', password.value)
    //submit
    error_message.classList.add('hide')
    error_message.textContent = ''
    login(formData)
  } else {
    //prevented
    error_message.classList.remove('hide')
    error_message.textContent = 'Fill all the fields'

    e.preventDefault()
  }
})

username.addEventListener('input', () => {
  if (username.value.length < 1) {
    username.style.border = '1px solid red'
    username_message.classList.remove('hide')
    username_message.textContent = 'Username/Email should not be empty'
    valid_username = false
  } else {
    error_message.classList.add('hide')
    username_message.classList.add('hide')
    username.style.border = '2px solid #64c5b1'
    valid_name = true
  }
})

password.addEventListener('input', () => {
  if (password.value.length < 1) {
    password.style.border = '1px solid red'
    password_message.classList.remove('hide')
    password_message.textContent = 'Username/Email should not be empty'
    valid_password = false
  } else {
    error_message.classList.add('hide')
    password_message.classList.add('hide')
    password.style.border = '2px solid #64c5b1'
    valid_password = true
  }
})
