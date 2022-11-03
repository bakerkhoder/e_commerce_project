document.addEventListener('DOMContentLoaded', () => {
  const add_button = document.getElementById('add-button')
  const add_popup = document.querySelector('#add-popup')
  const edit_popup = document.querySelector('#edit-popup')
  const exit_add_form = document.getElementById('add-close')
  const exit_edit_form = document.getElementById('edit-close')

  exit_add_form.addEventListener('click', () => {
    add_popup.style.display = 'none'
  })

  exit_edit_form.addEventListener('click', () => {
    edit_popup.style.display = 'none'
  })

  const resetForm = (parent) => {
    const status_message = parent.querySelector('.status-message')
    const profile_image = parent.querySelector('.profile-picture')
    const input_fields = parent.querySelectorAll('.info-field')
    if (status_message) {
      status_message.remove()
    }
    // clearing old data if it exists
    profile_image.src = '../images/svg/no-profile.svg'
    for (const i of input_fields) {
      i.value = ''
    }
    parent.style.display = 'block'
  }

  // show popup for seller info and change buttons from edit to add
  add_button.addEventListener('click', () => {
    resetForm(add_popup)
  })

  window.onclick = function (event) {
    if (event.target == add_popup) {
      add_popup.style.display = 'none'
    } else if (event.target == edit_popup) {
      edit_popup.style.display = 'none'
    }
  }
})
