const input_image = document.getElementById('image')
const input_image_edit = document.getElementById('image-edit')

let base64_image
let base64_image_edit


input_image.onchange = function () {
  const reader = new FileReader()
  reader.onload = () => {
    const image = reader.result
    document.getElementById('image-element').src = image
    base64_image = image
  }
  console.log(reader.files)
  reader.readAsDataURL(this.files[0])
}

input_image_edit.onchange = function () {
  const reader = new FileReader()
  reader.onload = () => {
    const image = reader.result
    document.getElementById('edit-image-element').src = image
    base64_image_edit = image
  }
  console.log(reader.files)
  reader.readAsDataURL(this.files[0])
}

input_username.onblur = validUsername
input_name.onblur = validName
input_email.onblur = validEmail
input_password.onblur = validPass
image_error.onblur = validateImage

function validUsername(username, error) {
  const pattern = /^\w{2,}\w$/
  const result = username.value.search(pattern)
  if (result == -1) {
    error.innerText =
      '*should be at least 3 characters with no spaces or special characters'
    return false
  } else {
    error.innerText = ''
    return true
  }
}
function validEmail(email, error) {
  const pattern = /^\w{3,}@\w{3,}\.\w{2,}$/
  const result = email.value.search(pattern)
  if (result == -1) {
    error.innerText = '*please enter a valid email'
    return false
  } else {
    error.innerText = ''
    return true
  }
}

function validName(name, error) {
  const pattern = /\w{2,}/
  result = name.value.search(pattern)
  if (result == -1) {
    error.innerText = '*name should be at least 2 characters'
    return false
  } else {
    error.innerText = ''
    return true
  }
}

function twoInt(password) {
  let pattern = /\d.*\d/
  let result = password.value.search(pattern)
  if (result == -1) {
    return false
  } else {
    return true
  }
}

function twoSymbols(password) {
  pattern = /\W.*\W/
  result = password.value.search(pattern)
  if (result == -1) {
    return false
  } else {
    return true
  }
}

function twoLower(password) {
  pattern = /[a-z].*[a-z]/
  result = password.value.search(pattern)
  if (result == -1) {
    return false
  } else {
    return true
  }
}

function twoUpper(password) {
  pattern = /[A-Z].*[A-Z]/
  result = password.value.search(pattern)
  if (result == -1) {
    return false
  } else {
    return true
  }
}

function passStrong(password, error) {
  let text = ''
  if (password.value.length < 8) {
    text = 'password should have 8 characters'
  }
  if (!twoLower(password)) {
    text = 'password should have 2 lowers'
  }

  if (!twoUpper(password)) {
    text = 'password should have 2 uppers'
  }

  if (!twoSymbols(password)) {
    text = 'password should have 2 symbols'
  }

  if (!twoInt(password)) {
    text = 'password should have 2 integers'
  }

  if (text.length > 0) {
    error.innerText = text
    return false
  } else {
    error.innerText = ''
    return true
  }
}
