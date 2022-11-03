const dashboard = document.getElementById('dashboard')
const customers = document.getElementById('customers')
const sellers = document.getElementById('sellers')
const iframe = document.getElementById('frame')
const username = document.getElementById('username')
const title = document.getElementById('nav-title')
const nav_items = document.querySelectorAll('.sidebar-item')

nav_items.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(item)
    iframe.src = item.dataset.page
    nav_items.forEach((item) => item.classList.remove('active'))
    item.classList.add('active')
  })
})
// dashboard.addEventListener('click', () => {
//   iframe.src = 'statistics.html'
//   title.innerText = 'Statistics'
// })
// customers.addEventListener('click', () => {
//   iframe.src = 'clients_list.html'
//   title.innerText = 'Customers'
// })
// sellers.addEventListener('click', () => {
//   iframe.src = 'seller_list.html'
//   title.innerText = 'Sellers'
// })
