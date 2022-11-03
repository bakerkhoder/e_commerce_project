const sellers_table = document.querySelector('#table-body')
const edit_popup = document.querySelector('#edit-popup')
const get_sellers_api =
  'http://localhost/e-commerce-project/e-commerce-server/api/get_sellers.php'
const delete_seller_api =
  'http://localhost/e-commerce-project/e-commerce-server/api/delete_seller.php'
const get_seller_api =
  'http://localhost/e-commerce-project/e-commerce-server/api/get_seller_info.php'

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
async function deleteSeller(id) {
const data= new FormData()
data.append("id",id)
axios({
    method: "post",
    url: "http://localhost/e-commerce-project/e-commerce-server/api/delete_seller.php",
 data,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
       const res = response.data
       console.log(res)
    if (res.status) {
       displaySuccessMsg(response.data.message)
    } else {
   displayErrorMsg(response.data.message)
        return
    }
      }
    )
    .catch(function (response) {
      //handle error
      console.log(response)
    })}




//get user data
async function getSeller(id) {
  await axios.get(get_seller_api + id).then(
    (response) => {
      console.log(response.data)
      if (response.data.status) {
        //success
        console.log(response.data.data[0])
        edit_input_username.value = response.data.data[0].username
        edit_input_email.value = response.data.data[0].email
        edit_input_name.value = response.data.data[0].name

        console.log(response.data.data[0].profile_picture)
        if (response.data.data[0].profile_picture) {
          console.log(edit_popup.querySelector('#edit-image-element').src)
          edit_popup.querySelector(
            '#edit-image-element'
          ).src = `../../src/images/sellers-profiles/${response.data.data[0].profile_picture}`
          console.log(edit_popup.querySelector('#edit-image-element').src)
        }
        resetForm(edit_popup, id)
      } else {
        //error
      }
    },
    (error) => {
      console.log(error)
    }
  )
}

const getSellers = async () => {
  const response = await axios.get(get_sellers_api)
  const data = response.data
  if (data.status == 1 && data.data != null) {
    // console.log(data)
    sellers_table.innerHTML = ''
    for (const seller of data.data) {
      const row = `<tr>
      <td>${seller.seller_name}</td>
      <td>${seller.seller_username}</td>
      <td>${seller.seller_email}</td>
      <td class="actions">                       
          <a href="javascript:void(0);" class="edit-icon" data-action="edit" data-id = "${seller.seller_id}"><img src='../images/svg/edit-svgrepo-com.svg'></a>
          <a href="javascript:void(0);" class="delete-icon" data-action="delete" data-id = "${seller.seller_id}"><img src='../images/svg/delete-svgrepo-com.svg'></a>
      </td>
      </tr>`
      sellers_table.innerHTML += row
    }
    const edit_icons = document.querySelectorAll('.actions > .edit-icon')
    const delete_icons = document.querySelectorAll('.actions > .delete-icon')

    edit_icons.forEach((editicon) => {
      editicon.addEventListener('click', () => {
        // console.log(icon)
        getSeller(editicon.dataset.id)
      })
    })

    delete_icons.forEach((deleteicon) => {
      deleteicon.addEventListener('click', () => {
        // console.log(icon)
        if (triggerAlert('Are you sure you want to delete this user?')) {
          confirmPopupBtn.addEventListener('click', function () {
            deleteSeller(deleteicon.dataset.id)
          })
          cancelPopupBtn.addEventListener('click', function () {
            return
          })
        }
      })
    })
  } else {
    const row = `<tr><td colspan="4">${data.message}</td></tr>`
    clients_table.innerHTML += row
  }
}
getSellers()
