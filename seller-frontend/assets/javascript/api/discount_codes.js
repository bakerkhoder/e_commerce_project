const discounts_table = document.querySelector('#table-body')
const user_id = JSON.parse(localStorage.getItem('user')).id
const get_discounts_api =
  'http://localhost/e-commerce-project/e-commerce-server/api/get_discounts.php'
const getDiscounts = async () => {
    const dataa=new FormData()
    dataa.append("id",user_id)
  const response = await axios.post(get_discounts_api,dataa)
  const data = response.data
  console.log(response.data)
  if (data.status == 1 && data.data != null) {
    // console.log(data)
    discounts_table.innerHTML = ''
    for (const product of data.data) {
      const row = `<tr>
        <td>${product.code}</td>
        <td>${product.percentage}</td>
        <td>${TDate() ? 'expired' : product.expired_at}</td>        
        </tr>`
      discounts_table.innerHTML += row
    }
  } else {
    const row = `<tr><td colspan="3">${data.message}</td></tr>`
    discounts_table.innerHTML += row
  }
}
getDiscounts()

function TDate(date) {
  if (date < Date.now()) {
    return true
  }
  if (date >= Date.now()) {
    return false
  }
}
