const category_form = document.querySelector('.category-form')
const category = document.querySelector('#category')
const success_message = document.querySelector('.success-message')
const error_message = document.querySelector('.error-message')
const category_message = document.querySelector('#input-password')
let valid_name, valid_password

  category_form.addEventListener('submit', (e) => {
  e.preventDefault()

  if (valid_name && valid_password) {
    //submit
    error_message.classList.add('hide')
    error_message.textContent = ''
    window.location.href = './views/dashboard.html'
  } else {
    //prevented
    error_message.classList.remove('hide')
    error_message.textContent = 'Fill all the fields'
  }
})



category.addEventListener('input', () => {
  if (category.value.length < 1) {
   category.style.border = '1px solid red'
    category_message.classList.remove('hide')
    category_message.textContent = 'category should not be empty'
    valid_password = false
  } else {
    error_message.classList.add('hide')
    category_message.classList.add('hide')
    category.style.border = '2px solid #64c5b1'
    valid_password = true
  }
})
