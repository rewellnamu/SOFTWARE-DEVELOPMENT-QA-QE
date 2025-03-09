"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("http://localhost:3000/Books");
        const bookData = yield response.json();
        console.log(bookData);
        criteriaFn(bookData);
        sortBooks(bookData);
        multipleFiltersBooks(bookData);
        formattedBookSummaries(bookData);
        filterBooks(bookData);
    }
    catch (error) {
        console.error("Error fetching data:", error.message);
    }
});
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
    function fetchBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("http://localhost:3000/Books");
                books = yield response.json();
                displayBooks(books);
            }
            catch (error) {
                console.error("Error fetching books:", error);
            }
        });
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
        if (!filterType)
            return;
        const filteredBooks = books.filter((book) => book[filterType].toString().toLowerCase().includes(searchTerm));
        displayBooks(filteredBooks);
    });
    sortSelect.addEventListener("change", () => {
        const sortBy = sortSelect.value;
        const sortedBooks = [...books].sort((a, b) => Number(a[sortBy]) - Number(b[sortBy]));
        displayBooks(sortedBooks);
    });
    document.addEventListener("click", (event) => {
        const target = event.target;
        if (target.classList.contains("buy-button")) {
            const bookId = target.dataset.id;
            if (bookId)
                addToCart(parseInt(bookId));
        }
    });
    function addToCart(bookId) {
        const book = books.find((b) => b.id === bookId);
        if (!book)
            return;
        const existingItem = cart.find((item) => item.id === bookId);
        if (existingItem) {
            existingItem.quantity++;
        }
        else {
            cart.push(Object.assign(Object.assign({}, book), { quantity: 1 }));
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
        cartCount.textContent = cart.length.toString();
    }
    cartItems.addEventListener("click", (event) => {
        const target = event.target;
        const bookId = target.dataset.id;
        if (!bookId)
            return;
        const id = parseInt(bookId);
        if (target.classList.contains("decrease")) {
            const item = cart.find((i) => i.id === id);
            if (item) {
                item.quantity > 1
                    ? item.quantity--
                    : (cart = cart.filter((i) => i.id !== id));
            }
        }
        else if (target.classList.contains("increase")) {
            const item = cart.find((i) => i.id === id);
            if (item)
                item.quantity++;
        }
        else if (target.classList.contains("remove")) {
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
function criteriaFn(bookData) {
    throw new Error("Function not implemented.");
}
function sortBooks(bookData) {
    throw new Error("Function not implemented.");
}
function multipleFiltersBooks(bookData) {
    throw new Error("Function not implemented.");
}
function formattedBookSummaries(bookData) {
    throw new Error("Function not implemented.");
}
function filterBooks(bookData) {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=index.js.map