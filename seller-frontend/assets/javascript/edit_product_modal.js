//To open and close the edit_product_modal

const modalBtn = document.querySelector('.edit_product_modal_btn');
const modalBg = document.querySelector('.modal-bg');
const modalClose = document.querySelector('.modal-close');
const modalSave=document.querySelector('.edit_product_modal_save_btn')

//When the button that should show the modal is clicked
modalBtn.addEventListener('click', function(){
    modalBg.classList.add('bg-active');
})

//When the X at the top left of the modal is clicked
modalClose.addEventListener('click', function(){
    modalBg.classList.remove('bg-active');
})

//When the Save button is clicked
modalSave.addEventListener('click', function(){
    modalBg.classList.remove('bg-active');
})


