//For the carousel in the products page
const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");
//Edit profile modal
const modalBtn = document.getElementById('edit-profile-icon');
const modalBg = document.querySelector('.modal-bg');
const modalClose = document.querySelector('.modal-close');
const modalSave = document.querySelector('.edit_profile_modal_save_btn');
const client_name_input = document.getElementById('profile-input-name');
const client_username_input = document.getElementById('profile-input-username');
const client_email_input = document.getElementById('profile-input-email');

const user_in_storage =JSON.parse(localStorage.getItem('auth'));
const client_id=user_in_storage[0];
console.log(client_id);


//For the Carousel
nextButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft += slideWidth;
});

prevButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft -= slideWidth;
});

//When the button that should show the modal is clicked
modalBtn.addEventListener('click', function () {
    modalBg.classList.add('bg-active');
    getProfile();
})

//When the X at the top left of the modal is clicked
modalClose.addEventListener('click', function () {
    modalBg.classList.remove('bg-active');
})
const data = new FormData();
//When the Save button is clicked
modalSave.addEventListener('click', function () {
    modalBg.classList.remove('bg-active');
    data.append('client_id', client_id);
    data.append('edited_name', client_name_input.value);
    data.append('edited_username', client_username_input.value);
    data.append('edited_email', client_email_input.value);
    updateClientProfile();
})

//function to save changes on the db 
async function updateClientProfile() {
    const response = await axios.post(
        `http://localhost/e-commerce/ecommerce-server/api/edit_client_profile.php`, data).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        }
        );
}

// Retrieving logged in users data and displaying it in the edit profile modal
async function getProfile() {
  const data= new FormData()
    data.append('client_id',client_id)
  axios({
    method: "post",
    url: "http://localhost/e-commerce-project/e-commerce-server/api/get_client_profile.php",
 data,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
            client_name_input.value = response.data.data[0].client_name;
            client_username_input.value = response.data.data[0].client_username;
            client_email_input.value = response.data.data[0].email;

      }
    )
    .catch(function (response) {
      //handle error
      console.log(error)
    })}




getProfile()



