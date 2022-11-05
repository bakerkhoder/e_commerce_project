const products_cont = document.querySelector('.top-5-products')

const getProducts = async () => {
  const response = await axios.get(
    'http://localhost/e-commerce/ecommerce-server/api/top_five_viewed.php?id=' +
      user_id
  )
  const data = response.data
  if (data.status == 1 && data.data != null) {
    products_cont.innerHTML = ''
    for (const product of data.data) {
      const row = `<div class="product-card">    
      
      <img src="./assets/images/products/${product.image}" alt="">
      <div>${product.title}</div>
      <div>${product.views} views</div>
  </div>`
      products_cont.innerHTML += row
    }
  } else {
    const row = `<p>${data.message}</p>`
    clients_table.innerHTML += row
  }
}
getProducts()
