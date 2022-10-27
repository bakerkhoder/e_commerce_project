const cardsContainer = document.querySelector('.product_cards_container')
const id = JSON.parse(localStorage.getItem('auth'))[0]
const search = document.getElementById('search')


search.addEventListener("keypress",(e)=>{
  if(e.key==="Enter"){ 
  e.preventDefault()
  const searchText = search.value
  cardsContainer.innerHTML = ''
  if (searchText) {
    getSearchResults(searchText)
  } else {
    getAllProducts()
  }
}})




async function getSearchResults(search){
  
    const data= new FormData()
    data.append('search_text',search)
  axios({
    method: "post",
    url: "http://localhost/e-commerce-project/e-commerce-server/api/search_product.php",
 data,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
         for (const i of response.data.data) {
       cardsContainer.appendChild(
       createCard(i.title, i.description, i.price, i.image, i.id))}
      }
    )
    .catch(function (response) {
      //handle error
      console.log(response);
    });}

// async function getSearchResults(search) {
//   const response = await axios.get(
//     'http://localhost/e-commerce/ecommerce-server/api/search_product.php?search_text=' +
//       search
//   )
//   const data = response.data.data
//   if (response.data.status && response.data.data) {
//     for (const i of data) {
//       cardsContainer.appendChild(
//         createCard(i.title, i.description, i.price, i.image, i.id)
//       )
//     }
//   } else {
//     cardsContainer.innerHTML = `<h4>${response.data.message}</h4>`
//   }
// }

// async function getSomeProducts() {
//   const response = await axios.get(
//     'http://localhost/e-commerce/ecommerce-server/api/get_all_products.php?id=' +
//       id
//   )
//   const data = response.data.data
//   let count = 0
//   for (const i of data) {
//     cardsContainer.appendChild(
//       createCard(i.title, i.description, i.price, i.image, i.id)
//     )
//     count++
//     if (count == 8) return data
//   }
//   return data
// }

async function getAllProducts() {
  
    const data= new FormData()
    data.append('id',id)
  axios({
    method: "post",
    url: "http://localhost/e-commerce-project/e-commerce-server/api/get_all_products.php",
 data,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
         for (const i of response.data.data) {
       cardsContainer.appendChild(
       createCard(i.title, i.description, i.price, i.image, i.id))}

      }
    )
    .catch(function (response) {
      //handle error
    });}
getAllProducts()
