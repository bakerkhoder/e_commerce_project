const cart_container = document.querySelector('.card-checkout')
const empty_cart = document.querySelector('.empty-cart')
const checkoutCont = document.querySelector('.checkout')
const id=JSON.parse(localStorage.getItem('auth'))[0]



   const checkout_total = document.querySelector('.checkout-total')
   const checkout_subtotal = document.querySelector('.checkout-subtotal')

   const header = `<div class="pagetitle">
   <h1>MY BAG</h1>
   </div>`
   cart_container.innerHTML = header
   let total = 0

    const data= new FormData()
    data.append('id',id)
  axios({
    method: "post",
    url: "http://localhost/e-commerce-project/e-commerce-server/api/get_cart_items.php",
 data,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
       const data = response.data
  if (data.status == 1 && data.data != null) {
    // console.log(data)

    for (const product of data.data) {
      total += product.price * product.quantity
      cart_container.innerHTML = ''
      const row = `<div class="saved-product">
      <div class="saved-product-img">
          <img src="../seller-frontend/assets/images/products/${product.image}">
      </div>
      <div class="saved-product-details">
          <h3>${product.title}</h3>
          <p class="description">${product.description}</p>

          <div class="price-quantity">
              <h6>$<span class="product_price">${product.price}</span></h6>
              <div class="quantity">
                  <label for="quantity">Qty</label>
                  <input type="number" name="quantity" min="1" value="${product.quantity}" disabled>
              </div>
          </div>
      </div>
  </div>`
      cart_container.innerHTML += row
    }
    cart_container.classList.remove('hidden')

    //checkout
    const total_cont = `<p>Total</p>
    <p>$<span>${total}</span></p>`
    checkout_total.innerHTML = total_cont

    const subtotal_cont = ` <p>Total</p>
    <p>$<span>${total}</span></p>`
    checkout_subtotal.innerHTML = subtotal_cont

    checkoutCont.classList.remove('hidden')
  } else {
    cart_container.classList.add('hidden')
    checkoutCont.classList.add('hidden')
    empty_cart.classList.remove('hidden')
    // window.location.href = './client_homepage.html'
  }
      }
    )
    .catch(function (response) {
      //handle error
    })


// const getCartItems = async () => {
//   const response = await axios.get(get_cartItems_api)
//   const data = response.data
//   if (data.status == 1 && data.data != null) {
//     // console.log(data)

//     for (const product of data.data) {
//       total += product.price * product.quantity
//       cart_container.innerHTML = ''
//       const row = `<div class="saved-product">
//       <div class="saved-product-img">
//           <img src="../seller-frontend/assets/images/products/${product.image}">
//       </div>
//       <div class="saved-product-details">
//           <h3>Title</h3>
//           <p class="description">${product.description}</p>

//           <div class="price-quantity">
//               <h6>$<span class="product_price">${product.price}</span></h6>
//               <div class="quantity">
//                   <label for="quantity">Qty</label>
//                   <input type="number" name="quantity" min="1" value="${product.quantity}" disabled>
//               </div>
//           </div>
//       </div>
//   </div>`
//       cart_container.innerHTML += row
//     }
//     cart_container.classList.remove('hidden')

//     //checkout
//     const total_cont = `<p>Total</p>
//     <p>$<span>${total}</span></p>`
//     checkout_total.innerHTML = total_cont

//     const subtotal_cont = ` <p>Total</p>
//     <p>$<span>${total}</span></p>`
//     checkout_subtotal.innerHTML = subtotal_cont

//     checkoutCont.classList.remove('hidden')
//   } else {
//     cart_container.classList.add('hidden')
//     checkoutCont.classList.add('hidden')
//     empty_cart.classList.remove('hidden')
//     // window.location.href = './client_homepage.html'
//   }
// }

getCartItems()
