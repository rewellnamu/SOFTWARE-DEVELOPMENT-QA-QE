fetch('http://localhost:3000/products')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(products => {
    const productsList = document.getElementById('products');
    products.forEach(product => {
      const listItem = document.createElement('li');
      listItem.textContent = `${product.name}, Price: $${product.price}`;
      productsList.appendChild(listItem);
    });
  })
  .catch(error => console.error('Error fetching data:', error));
