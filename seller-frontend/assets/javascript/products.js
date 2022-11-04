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

  const fillCategories = async (parent, id) => {
    const user_id = JSON.parse(localStorage.getItem('user')).id
    const categories = document.querySelector(id)
        const dataa= new FormData()
        dataa.append("id",user_id)
    const response = await axios.get(
      'http://localhost/e-commerce/ecommerce-server/api/get_categories_by_seller.php?',
      dataa
    )
    const data = response.data
    console.log(data)
    if (data.status == 1 && data.data != null) {
      categories.innerHTML = ''
      for (const category of data.data) {
        const row = `<option value="${category.category_id}">
          ${category.category}
          </option>`
        categories.innerHTML += row
      }
      document.querySelector(parent).querySelector(id).selectedIndex = 0
    } else {
      const row = `<option value="">${data.message}</option>`
      categories.innerHTML += row
    }
  }

  const resetForm = (parent) => {
    const status_message = parent.querySelector('.status-message')
    const profile_image = parent.querySelector('.profile-picture')
    const input_fields = parent.querySelectorAll('.info-field')
    if (status_message) {
      status_message.remove()
    }
    // clearing old data if it exists
    profile_image.src = './assets/images/blanck.png'
    for (const i of input_fields) {
      i.value = ''
    }
    fillCategories('#add-popup', '#category')
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
