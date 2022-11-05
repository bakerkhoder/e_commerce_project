const products_table = document.querySelector('#table-body')
const edit_popup = document.querySelector('#edit-popup')
const user_id = JSON.parse(localStorage.getItem('user')).id
const get_products_api =
  'http://localhost/e-commerce-project/e-commerce-server/api/get_products.php'
const delete_product_api =
  'http://localhost/e-commerce-project/e-commerce-server/api/delete_product.php'
const get_product_api =
  'http://localhost/e-commerce-project/e-commerce-server/api/get_product.php'

const config = {}

//open modal
const resetForm = (parent, id) => {
  const status_message = parent.querySelector('.status-message')
  const profile_image = parent.querySelector('.profile-picture')
  const input_fields = parent.querySelectorAll('.info-field')
  if (status_message) {
    status_message.remove()
  }
  // clearing old data if it exists
  // profile_image.src = '../images/svg/no-profile.svg'
  // for (const i of input_fields) {
  //   i.value = ''
  // }
  parent.dataset.id = id
  parent.style.display = 'block'
}

//delete seller
async function deleteProduct(id) {
    const dataa =new FormData()
    dataa.append("id",id)
  const response = await axios.post(delete_product_api,dataa).then(
    (response) => {
      console.log(response.data)
      if (response.data.status) {
        //success
        displaySuccessMsg(response.data.message)
      } else {
        //error
        displayErrorMsg(response.data.message)
        return
      }
    },
    (error) => {
      console.log(error)
    }
  )
}

const fillCategories = async (parent, id) => {
  const user_id = JSON.parse(localStorage.getItem('user')).id
  const categories = document.querySelector(id)
  const dataa=new FormData()
  dataa.append("id",user_id)
  const response = await axios.post(
    'http://localhost/e-commerce-project/e-commerce-server/api/get_categories_by_seller.php',dataa
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

//get user data
async function getProduct(id) {
    const dataa =new FormData()
    dataa.append("id",id)
  await axios.post(get_product_api,dataa).then(
    (response) => {
        console.log("e")
      console.log(response.data)
      if (response.data.status) {
        //success
        console.log("sa7i7")
        console.log(response.data.data[0])
        fillCategories('#edit-popup', '#edit-category')
        edit_input_title.value = response.data.data[0].title
        edit_input_price.value = response.data.data[0].price
        edit_input_qty.value = response.data.data[0].quantity
        edit_input_description.textContent = response.data.data[0].description

        console.log(response.data.data[0].image)
        if (response.data.data[0].image) {
          console.log(edit_popup.querySelector('#edit-image-element').src)
          edit_popup.querySelector(
            '#edit-image-element'
          ).src = `./assets/images/products/${response.data.data[0].image}`
          console.log(edit_popup.querySelector('#edit-image-element').src)
        } else {
          edit_popup.querySelector(
            '#edit-image-element'
          ).src = `./assets/images/blanck.png`
        }
        resetForm(edit_popup, id)
      } else {
        //error
        alert(response.data.message)
      }
    },
    (error) => {
      console.log(error)
    }
  )
}

const getProducts = async () => {
 const dataa= new FormData()
 dataa.append("id",user_id)
 const response = await axios.post(
    get_products_api,
    dataa
  )
  const data = response.data
  console.log(response.data)
  
  if (data.status == 1 && data.data != null) {
    products_table.innerHTML = ''
    for (const product of data.data) {
      const row = `<tr>
      <td>${product.title}</td>
      <td>${product.category}</td>
      <td>${product.price}</td>
      <td>${product.quantity}</td>
      <td>${product.views}</td>
      <td class="actions">                       
          <a href="javascript:void(0);" class="edit-icon" data-action="edit" data-id = "${product.id}"><img src='../../../admin-electron/src/images/svg/edit-svgrepo-com.svg'></a>
          <a href="javascript:void(0);" class="delete-icon" data-action="delete" data-id = "${product.id}"><img src='../../../admin-electron/src/images/svg/delete-svgrepo-com.svg'></a>
      </td>
      </tr>`
      products_table.innerHTML += row
    }
    const edit_icons = document.querySelectorAll('.actions > .edit-icon')
    const delete_icons = document.querySelectorAll('.actions > .delete-icon')

    edit_icons.forEach((editicon) => {
      editicon.addEventListener('click', () => {
        // console.log(icon)
        getProduct(editicon.dataset.id)
      })
    })

    delete_icons.forEach((deleteicon) => {
      deleteicon.addEventListener('click', () => {
        // console.log(icon)
        if (triggerAlert('Are you sure you want to delete this user?')) {
          confirmPopupBtn.addEventListener('click', function () {
            deleteProduct(deleteicon.dataset.id)
          })
          cancelPopupBtn.addEventListener('click', function () {
            return
          })
        }
      })
    })
  } else {
    const row = `<tr><td colspan="4">${data.message}</td></tr>`
   products_table.innerHTML += row
  }
}
getProducts()
