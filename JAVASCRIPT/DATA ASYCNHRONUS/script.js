
const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3000/Books');
    const bookData = await response.json();
    console.log(bookData);
    
    criteriaFn(bookData);
    sortBooks(bookData);
    multipleFiltersBooks(bookData);
    formattedBookSummaries(bookData);
    filterBooks(bookData);
    
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

fetchData();


document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.getElementById("book-list");
  const searchDropdown = document.getElementById("search-dropdown");
  const searchInput = document.getElementById("search");
  const sortSelect = document.getElementById("sort");
  const themeToggle = document.getElementById("theme-toggle");
  const cartButton = document.getElementById("cart-button");
  const cartModal = document.getElementById("cart-modal");
  const closeCart = document.getElementById("close-cart");
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");

  let books = [];
  let cart = [];

  async function fetchBooks() {
    try {
      const response = await fetch("http://localhost:3000/Books"); // Replace with actual API endpoint
      books = await response.json();
      displayBooks(books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  function displayBooks(bookArray) {
    bookList.innerHTML = "";
    bookArray.forEach((book) => {
      const bookItem = document.createElement("div");
      bookItem.classList.add("book");
      bookItem.innerHTML = `
              <img src="${book.image}" alt="${book.title}">
              <h3>${book.title}</h3>
              <p><strong>Author:</strong> ${book.author}</p>
              <p><strong>Genre:</strong> ${book.genre}</p>
              <p><strong>Year:</strong> ${book.year}</p>
              <p><strong>Pages:</strong> ${book.pages}</p>
              <button class="buy-button" data-id="${book.id}">Buy</button>
          `;
      bookList.appendChild(bookItem);
    });
  }

  searchInput.addEventListener("input", () => {
    const filterType = searchDropdown.value;
    const searchTerm = searchInput.value.toLowerCase();
    if (!filterType) return;

    const filteredBooks = books.filter((book) =>
      book[filterType].toString().toLowerCase().includes(searchTerm)
    );
    displayBooks(filteredBooks);
  });

  sortSelect.addEventListener("change", () => {
    const sortBy = sortSelect.value;
    const sortedBooks = [...books].sort((a, b) => a[sortBy] - b[sortBy]);
    displayBooks(sortedBooks);
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("buy-button")) {
      const bookId = event.target.dataset.id;
      addToCart(bookId);
    }
  });

  function addToCart(bookId) {
    const book = books.find((b) => b.id == bookId);
    const existingItem = cart.find((item) => item.id == bookId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...book, quantity: 1 });
    }
    updateCartUI();
  }

  function updateCartUI() {
    cartItems.innerHTML = "";
    cart.forEach((item) => {
      const cartItem = document.createElement("li");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
              ${item.title} (x${item.quantity})
              <button class="decrease" data-id="${item.id}">-</button>
              <button class="increase" data-id="${item.id}">+</button>
              <button class="remove" data-id="${item.id}">Remove</button>
          `;
      cartItems.appendChild(cartItem);
    });
    cartCount.textContent = cart.length;
  }

  cartItems.addEventListener("click", (event) => {
    const bookId = event.target.dataset.id;
    if (!bookId) return;

    if (event.target.classList.contains("decrease")) {
      const item = cart.find((i) => i.id == bookId);
      if (item.quantity > 1) item.quantity--;
      else cart = cart.filter((i) => i.id != bookId);
    }

    if (event.target.classList.contains("increase")) {
      const item = cart.find((i) => i.id == bookId);
      item.quantity++;
    }

    if (event.target.classList.contains("remove")) {
      cart = cart.filter((i) => i.id != bookId);
    }
    updateCartUI();
  });

  cartButton.addEventListener("click", () => {
    cartModal.classList.toggle("hidden");
  });

  closeCart.addEventListener("click", () => {
    cartModal.classList.add("hidden");
  });

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  fetchBooks();
});