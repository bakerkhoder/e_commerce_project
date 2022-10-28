//Edit profile modal
const modalBtn2 = document.getElementById('edit-profile-icon');
const modalBg2 = document.querySelector('.modal-bg');
const modalClose2 = document.querySelector('.modal-close');
const modalSave2 = document.querySelector('.edit_profile_modal_save_btn');

 const Id=JSON.parse(localStorage.getItem('auth'))[0]

// const burgerMenu = document.querySelector('.menu');

//When the button that should show the modal is clicked
modalBtn2.addEventListener('click', function () {

    modalBg2.classList.add('bg-active');

})

//When the X at the top left of the modal is clicked
modalClose2.addEventListener('click', function () {
    modalBg2.classList.remove('bg-active');
})

//When the Save button is clicked
modalSave2.addEventListener('click', function () {
    modalBg2.classList.remove('bg-active');
})

//Checkout confirmation popup
// Alert message popup
const confPopupBtn = document.querySelector('.confirmation-popup-active')
const popUpBg = document.querySelector('.confirmation-popup-container')
const cancelPopupBtn = document.getElementById('cancel-conf-popup')
const confirmPopupBtn = document.getElementById('confirm-conf-popup')
const description_conf_popup = document.querySelector(
  '.confirmation_alert_description'
)

//Success message div
const successMsg = () => {
  let success_msg_html = `            
    <div class="sucess-msg-div">
    <img class="success" src="./assets/images/congrats.png">
    <p class="success_msg">Congratulations!</p>
    <p class="success_msg">Payment succeeded</p>
    <p class="small-instruction">you can close this, or wait it'll disappear in a few seconds</p>
    </div> `
  description_conf_popup.innerHTML = success_msg_html
}

const checkout = async () => {
      const data= new FormData()
    data.append('id',Id)
  axios({
    method: "post",
    url: "http://localhost/e-commerce-project/e-commerce-server/api/checkout.php",
 data,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
           console.log(response.data)

      }
    )
    .catch(function (response) {
      //handle error
      console.log(error)
    })
}
//When the button that should show the confirmation popup is clicked
confPopupBtn.addEventListener('click', function () {
  popUpBg.classList.add('bg-active')
})

//When the cancel button of the popup is clicked
cancelPopupBtn.addEventListener('click', function () {
  popUpBg.classList.remove('bg-active')
})

//When the Save button is clicked
confirmPopupBtn.addEventListener('click', function () {
  checkout()
  successMsg()

  //Two options to close the popup, close button, or timeout where it'll disappear on its own after 3 sec (choose whichever you want)
  cancelPopupBtn.innerHTML = 'Close'
  setTimeout(function () {
    popUpBg.classList.remove('bg-active')
    window.location.reload()
  }, 1500)
})
