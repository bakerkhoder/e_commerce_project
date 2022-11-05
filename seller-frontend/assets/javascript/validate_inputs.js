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

function isEmpty(input, error, name) {
  if (input.value.length > 0) {
    error.innerText = ''
    return true
  } else {
    error.innerText = `${name} should not be empty!`
    return false
  }
}

function isNumberr(input, error, name) {
  var RE = /^-{0,1}\d*\.{0,1}\d+$/
  if (RE.test(input.value)) {
    error.innerText = ''
    return true
  } else {
    error.innerText = `${name} should be number!`
    return false
  }
}

function removeErrorMessages(parent) {
  const inputs = Array.from(
    parent.querySelectorAll('.column-direction > input[type="text"]')
  )

  inputs.push(parent.querySelector('.column-direction > textarea'))

  const errors = Array.from(
    parent.querySelectorAll('.column-direction > span:last-child')
  )
  console.log(errors)
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', () => {
      errors[i].textContent = ''
    })
  }

  console.log(inputs)
}

removeErrorMessages(document.querySelector('#add-popup'))
removeErrorMessages(document.querySelector('#edit-popup'))
