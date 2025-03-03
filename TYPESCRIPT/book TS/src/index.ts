interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  image: string;
}

interface CartItem extends Book {
  quantity: number;
}

const fetchData = async (): Promise<void> => {
  try {
    const response = await fetch("http://localhost:3000/Books");
    const bookData: Book[] = await response.json();
    console.log(bookData);

    criteriaFn(bookData);
    sortBooks(bookData);
    multipleFiltersBooks(bookData);
    formattedBookSummaries(bookData);
    filterBooks(bookData);
  } catch (error) {
    console.error("Error fetching data:", (error as Error).message);
  }
};

fetchData();

document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.getElementById("book-list") as HTMLDivElement;
  const searchDropdown = document.getElementById(
    "search-dropdown"
  ) as HTMLSelectElement;
  const searchInput = document.getElementById("search") as HTMLInputElement;
  const sortSelect = document.getElementById("sort") as HTMLSelectElement;
  const themeToggle = document.getElementById(
    "theme-toggle"
  ) as HTMLButtonElement;
  const cartButton = document.getElementById(
    "cart-button"
  ) as HTMLButtonElement;
  const cartModal = document.getElementById("cart-modal") as HTMLDivElement;
  const closeCart = document.getElementById("close-cart") as HTMLButtonElement;
  const cartItems = document.getElementById("cart-items") as HTMLUListElement;
  const cartCount = document.getElementById("cart-count") as HTMLSpanElement;

  let books: Book[] = [];
  let cart: CartItem[] = [];

  async function fetchBooks(): Promise<void> {
    try {
      const response = await fetch("http://localhost:3000/Books");
      books = await response.json();
      displayBooks(books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  function displayBooks(bookArray: Book[]): void {
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
    const filterType = searchDropdown.value as keyof Book;
    const searchTerm = searchInput.value.toLowerCase();
    if (!filterType) return;

    const filteredBooks = books.filter((book) =>
      book[filterType].toString().toLowerCase().includes(searchTerm)
    );
    displayBooks(filteredBooks);
  });

  sortSelect.addEventListener("change", () => {
    const sortBy = sortSelect.value as keyof Book;
    const sortedBooks = [...books].sort(
      (a, b) => Number(a[sortBy]) - Number(b[sortBy])
    );
    displayBooks(sortedBooks);
  });

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("buy-button")) {
      const bookId = target.dataset.id;
      if (bookId) addToCart(parseInt(bookId));
    }
  });

  function addToCart(bookId: number): void {
    const book = books.find((b) => b.id === bookId);
    if (!book) return;

    const existingItem = cart.find((item) => item.id === bookId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...book, quantity: 1 });
    }
    updateCartUI();
  }

  function updateCartUI(): void {
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
    cartCount.textContent = cart.length.toString();
  }

  cartItems.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const bookId = target.dataset.id;
    if (!bookId) return;

    const id = parseInt(bookId);
    if (target.classList.contains("decrease")) {
      const item = cart.find((i) => i.id === id);
      if (item) {
        item.quantity > 1
          ? item.quantity--
          : (cart = cart.filter((i) => i.id !== id));
      }
    } else if (target.classList.contains("increase")) {
      const item = cart.find((i) => i.id === id);
      if (item) item.quantity++;
    } else if (target.classList.contains("remove")) {
      cart = cart.filter((i) => i.id !== id);
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

function criteriaFn(bookData: Book[]) {
  throw new Error("Function not implemented.");
}

function sortBooks(bookData: Book[]) {
  throw new Error("Function not implemented.");
}

function multipleFiltersBooks(bookData: Book[]) {
  throw new Error("Function not implemented.");
}

function formattedBookSummaries(bookData: Book[]) {
  throw new Error("Function not implemented.");
}

function filterBooks(bookData: Book[]) {
  throw new Error("Function not implemented.");
}
