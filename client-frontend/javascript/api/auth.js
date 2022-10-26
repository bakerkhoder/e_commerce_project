
if (
  !localStorage.getItem('auth') &&
  window.location.href != 'index.html'
) {
  console.log('true')
  window.location.href = 'index.html'
}

document.querySelector('#logout').addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.removeItem('auth')
  window.location.href = 'index.html'
})
