const clients_table = document.querySelector('#table-body')
const get_clients_api =
  'http://localhost/e-commerce-project/e-commerce-server/api/get_clients.php'
const ban_client_api =
  'http://localhost/e-commerce/ecommerce-server/api/ban_client.php?id='

//ban client
async function deleteClient(id, isbanned) {
  const response = await axios
    .get(ban_client_api + id + '&ban=' + isbanned)
    .then(
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

const getClients = async () => {
  const response = await axios.get(get_clients_api)
  const data = response.data
  console.log(response.data)
  if (data.status == 1 && data.data != null) {
    // console.log(data)
    clients_table.innerHTML = ''
    for (const client of data.data) {
      let icon = `<a href="javascript:void(0);" class="delete-icon" data-action="ban" data-id = "${client.client_id}"><img src='../images/svg/ban-svgrepo-com.svg'></a>`
      if (client.is_banned) {
        icon = `<a href="javascript:void(0);" class="edit-icon" data-action="activate" data-id = "${client.client_id}"><img src='../images/svg/unblock-svgrepo-com.svg'></a>`
      }
      const row = `<tr>
      <td>${client.client_name}</td>
      <td>${client.client_username}</td>
      <td>${client.client_email}</td>
      <td class="actions">                       
          ${icon}
      </td>
      </tr>`
      clients_table.innerHTML += row
    }
    const edit_icons = document.querySelectorAll('.actions > a')

    edit_icons.forEach((deleteicon) => {
      deleteicon.addEventListener('click', () => {
        let text, isbanned
        if (deleteicon.dataset.action == 'ban') {
          text = 'Are you sure you want to ban this user?'
          isbanned = 1
        } else if (deleteicon.dataset.action == 'activate') {
          text = 'Are you sure you want to unban this user?'
          isbanned = 0
        }
        // console.log(icon)
        if (triggerAlert(text)) {
          confirmPopupBtn.addEventListener('click', function () {
            console.log(deleteicon.dataset.id, isbanned)
            deleteClient(deleteicon.dataset.id, isbanned)
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
getClients()