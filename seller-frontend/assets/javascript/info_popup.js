// Alert message popup
const confPopupBtn = document.querySelector('.info-popup-active');
const popUpBg = document.querySelector('.confirmation-popup-container');
const confirmPopupBtn = document.getElementById('confirm-conf-popup');

//When the button that should show the info popup is clicked
confPopupBtn.addEventListener('click', function () {
    popUpBg.classList.add('bg-active');
})

//When the OK button of the popup is clicked
confirmPopupBtn.addEventListener('click', function () {
    popUpBg.classList.remove('bg-active');
})




