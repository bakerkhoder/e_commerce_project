const cardsContainer = document.querySelector('.product_cards_container')
const id = JSON.parse(localStorage.getItem('auth'))[0]

async function getAllFavorites() {

 

 
   const data= new FormData()
   data.append('client_id',id)
  axios({
    method: "post",
    url: "http://localhost/e-commerce-project/e-commerce-server/api/get_all_favorites.php",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
       console.log(response.data)
       const data = response.data.data
       for (const i of data) {
       cardsContainer.appendChild(
       createCard(i.title, i.description, i.price, i.image, i.id)
     )
    }
  return data
       
      }
    )

}
getAllFavorites()