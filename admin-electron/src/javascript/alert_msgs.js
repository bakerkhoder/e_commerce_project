// Alert message popup
// const confPopupBtn = document.querySelector('.confirmation-popup-active')
const popUpBg = document.querySelector('.confirmation-popup-container')
const cancelPopupBtn = document.getElementById('cancel-conf-popup')
const confirmPopupBtn = document.getElementById('confirm-conf-popup')
const description_conf_popup = document.querySelector(
  '.confirmation_alert_description'
)

//Success message div
const successMsg = (msg) => {
  let success_msg_html = `            
    <div class="sucess-msg-div">
    <img class="success" src="../images/png/green_check_mark.png">
    <p class="success_msg">${msg}</p>
    </div> `
  description_conf_popup.innerHTML = success_msg_html
}

const errorMsg = (msg) => {
  let error_msg_html = `            
  <div class="sucess-msg-div">
    <img class="success" src="../images/png/alert_icon_red.png">
    <p class="error_msg">${msg}</p>
    </div> `
  description_conf_popup.innerHTML = error_msg_html
}

const triggerAlert = (text) => {
  const text_alert = popUpBg.querySelector('#text-alert')
  text_alert.textContent = text
  popUpBg.classList.add('bg-active')
  return true
}

cancelPopupBtn.addEventListener('click', function () {
  popUpBg.classList.remove('bg-active')
})

const displaySuccessMsg = (msg) => {
  successMsg(msg)

  setTimeout(function () {
    window.location.reload()
  }, 1500)
}

const displayErrorMsg = (msg) => {
  errorMsg(msg)

  setTimeout(function () {
    window.location.reload()
  }, 1500)
}
