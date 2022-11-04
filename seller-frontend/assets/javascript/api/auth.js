var base_url = window.location.origin

if (
  !localStorage.getItem('user') &&
  window.location.href != base_url + '/seller-frontend/index.html'
) {
  console.log('true')
  window.location.href = base_url + '/seller-frontend/index.html'
}

document.querySelector('#logout').addEventListener('click', (e) => {
  e.preventDefault()
  console.log('logout')
  localStorage.removeItem('user')
  window.location.href = base_url + '/seller-frontend/index.html'
})
