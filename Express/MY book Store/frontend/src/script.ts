document.addEventListener("DOMContentLoaded", function (){
  const booksContainer = document.getElementById("books-container");
  const genreFilter = document.getElementById("genre-filter");
  const yearFilter = document.getElementById("year-filter");
  const sortBy = document.getElementById("sort-by");
  const applyFiltersBtn = document.getElementById("apply-filters");
  const searchInput = document.querySelector(".search-bar input") as HTMLInputElement;
  const loadingContainer = document.getElementById("loading-container");
  const cartCountElement = document.querySelector(".cart-count");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartEmptyMessage = document.querySelector(".cart-empty-message");
  const cartTotalItems = document.querySelector(".cart-total span:last-child");
  const cartTotalPrice = document.createElement("div");
  cartTotalPrice.className = "cart-total";
  cartTotalPrice.innerHTML = "<span>Total Price:</span><span>$0.00</span>";
  const checkoutBtn = document.querySelector(".checkout-btn");
  const cartFooter = document.querySelector(".cart-footer");
  
  // CRUD related elements
  const addBookBtn = document.getElementById("add-book-btn");
  const addModalOverlay = document.getElementById("add-modal-overlay");
  const closeAddModal = document.getElementById("close-add-modal");
  const addBookForm = document.getElementById("add-book-form") as HTMLFormElement;
  
  const editModalOverlay = document.getElementById("edit-modal-overlay");
  const closeEditModal = document.getElementById("close-edit-modal");
  const editBookForm = document.getElementById("edit-book-form") as HTMLFormElement;
  
  const deleteModalOverlay = document.getElementById("delete-modal-overlay");
  const cancelDeleteBtn = document.getElementById("cancel-delete");
  const confirmDeleteBtn = document.getElementById("confirm-delete");
  
  let currentBookIdToDelete: string | null = null;
  
  if (cartFooter) {
    cartFooter.insertBefore(cartTotalPrice, checkoutBtn);
  }
  
  interface Book { 
    book_id: string;
    title: string;
    author: string;
    genre: string;
    year: number;  // Changed from string to number
    pages: number; // Changed from string to number
    publisher: string;
    description: string;
    total_copies: number; // Added
    available_copies: number; // Added
    image: string;
    price: number;
}


  interface CartItem extends Book {
    quantity: number;
  }

  let cartItems: CartItem[] = [];
  let allBooks: Book[] = [];

  async function fetchBooks(params: Record<string, string> = {}) {
    try {
      if (loadingContainer) {
        loadingContainer.style.display = "flex";
      }

      const queryParams = new URLSearchParams(params).toString();
      const url = `http://localhost:5000/api/books${queryParams ? `?${queryParams}` : ''}`;

      const response = await fetch(url);
      const data = await response.json();
    
      console.log("API Response:", data);

      if (loadingContainer) {
        loadingContainer.style.display = "none";
      }

      return {
        books: Array.isArray(data.books) ? data.books : (Array.isArray(data) ? data : []),
        stats: data.stats || {}
      };
    } catch (error) {
      console.error("Error fetching books:", error);
      if (loadingContainer) {
        loadingContainer.style.display = "none";
      }
      return { books:[], stats: {} };
    }
  }
  
  function filterAndSortBooks() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const genre = genreFilter ? (genreFilter as HTMLSelectElement).value : '';
    const yearRange = yearFilter ? (yearFilter as HTMLSelectElement).value : '';
    const sortOption = sortBy ? (sortBy as HTMLSelectElement).value : '';

    const params: Record<string, string> = {};

    if (searchTerm) params['search'] = searchTerm;
    if (genre) params['genre'] = genre;
    if (yearRange) params['yearRange'] = yearRange;
    if (sortOption) params['sortBy'] = sortOption;

    fetchBooks(params).then(({ books, stats }) => {
      displayBooks(books);
      updateStats(stats);
    });
  }
  
  fetchBooks().then(({ books, stats }) => {
    displayBooks(books);
    updateStats(stats);
  });
  
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", filterAndSortBooks);
  }
  
  if (searchInput) {
    searchInput.addEventListener("keyup", function(event) {    
      if (event.key === "Enter") {
        filterAndSortBooks();
      }
    });
  }
  
  function displayBooks(books: Book[]) {
    if (booksContainer) booksContainer.innerHTML = "";
    
    if (books.length === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'no-results';
      noResults.textContent = 'No books match your filters. Try adjusting your search criteria.';
      if (booksContainer) booksContainer.appendChild(noResults);
      return;
    }
    
    books.forEach((result:Book) => {
      const bookCard = document.createElement("div");
      bookCard.className = "book-card";
      
      const bookImage = document.createElement("div");
      bookImage.className = "book-image";
      
      const image = document.createElement("img");
      image.className = "image";
      image.src = result.image;
      image.alt = result.title;
      
      const bookCategory = document.createElement("div");
      bookCategory.className = "book-category";
      bookCategory.textContent = result.genre;
      
      const bookActions = document.createElement("div");
      bookActions.className = "book-actions";
      
      const editBtn = document.createElement("button");
      editBtn.className = "action-btn edit-btn";
      editBtn.setAttribute("data-id", result.book_id);
      editBtn.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openEditModal(result);
      });
      
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "action-btn delete-btn";
      deleteBtn.setAttribute("data-id", result.book_id);

      deleteBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log(result.book_id);
        openDeleteModal(result.book_id);
      });
      
      bookActions.appendChild(editBtn);
      bookActions.appendChild(deleteBtn);
      
      bookImage.appendChild(image);
      bookImage.appendChild(bookCategory);
      bookImage.appendChild(bookActions);
    
      const bookInfo = document.createElement("div");
      bookInfo.className = "book-info";
      
      const bookTitle = document.createElement("h3");
      bookTitle.className = "book-title";
      bookTitle.textContent = result.title;
      
      const bookAuthor = document.createElement("p");
      bookAuthor.className = "book-author";
      bookAuthor.textContent = result.author;
      
      const bookMeta = document.createElement("div");
      bookMeta.className = "book-meta";
      
      const year = document.createElement("span");
      year.id = "year";
      year.textContent = result.year.toString();
      
      const pages = document.createElement("span");
      pages.id = "pages";
      pages.textContent = `${result.pages} pages`;
      
      const price = document.createElement("span");
      price.id = "price";
      price.textContent = `$${Number(result.price).toFixed(2)}`;
      price.style.color = "var(--primary)";
      price.style.fontWeight = "bold";
      
      bookMeta.appendChild(year);
      bookMeta.appendChild(pages);
      bookMeta.appendChild(price);
      
      const description = document.createElement("p");
      description.className = "book-description";
      description.textContent = result.description;
      
      const bookPublisher = document.createElement("p");
      bookPublisher.className = "book-publisher";
      bookPublisher.textContent = result.publisher;
    
      const bookId = document.createElement("p");
      bookId.className = 'id-book';
      bookId.textContent = result.book_id;
      bookId.style.display = 'none';
    
      const buyBook = document.createElement("button");
      buyBook.className = "buy-book";
      buyBook.textContent = `Buy Now • $${Number(result.price).toFixed(2)}`;
      
      buyBook.addEventListener('click', function(e) {
        e.stopPropagation();
        const target = e.target as HTMLElement;
        let bookId: string | null = null;
        if (target && target.parentNode) {
          const idElement = target.parentNode.querySelector('.id-book') as HTMLElement;
          bookId = idElement ? idElement.textContent : null;
        }
        if (bookId) {
          addToCart(bookId, books);
        }
      });
      
      bookInfo.appendChild(bookTitle);
      bookInfo.appendChild(bookAuthor);
      bookInfo.appendChild(bookMeta);
      bookInfo.appendChild(description);
      bookInfo.appendChild(bookPublisher);
      bookInfo.appendChild(bookId);
      bookInfo.appendChild(buyBook);
      
      bookCard.appendChild(bookImage);
      bookCard.appendChild(bookInfo);
      
      bookCard.addEventListener('click', () => {
        showBookModal(result);
      });
      
      if (booksContainer) booksContainer.appendChild(bookCard);
    });
  }

  function updateStats(stats: { 
    totalBooks: number, 
    avgPages: number, 
    oldestBook: number | null, 
    uniqueGenres: number 
  }) {
    const totalBooksElement = document.getElementById("total-books");
    if (totalBooksElement) {
      // totalBooksElement.textContent = stats.totalBooks.toString();
    }
    
    const avgPagesElement = document.getElementById("avg-pages");
    if (avgPagesElement) {
      // avgPagesElement.textContent = stats.avgPages.toString();
    }
    
    const oldestBookElement = document.getElementById("oldest-book");
    if (oldestBookElement && stats.oldestBook !== null) {
      // oldestBookElement.textContent = 
      //   stats.oldestBook < 0 ? `${Math.abs(stats.oldestBook)} BCE` : stats.oldestBook.toString();
    }
    
    const genresCountElement = document.getElementById("genres-count");
    if (genresCountElement) {
      // genresCountElement.textContent = stats.uniqueGenres.toString();
    }
  }
  
  function addToCart(bookId: string, booksArray: Book[]) {
    const bookToAdd = booksArray.find((book: Book) => book.book_id === bookId);
    
    if (!bookToAdd) return;
    
    const existingItemIndex = cartItems.findIndex(item => item.book_id === bookId);
    
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({
        ...bookToAdd,
        quantity: 1
      });
    }
    
    updateCartUI();
    showNotification(`Added "${bookToAdd.title}" to cart`);
  }
  
  function updateCartUI() {
    if (!cartCountElement || !cartTotalItems || !cartTotalPrice) return;
    
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    if (cartCountElement) {
      cartCountElement.textContent = totalItems.toString();
    }
    if (cartTotalItems) {
      cartTotalItems.textContent = `${totalItems} ${totalItems === 1 ? 'book' : 'books'}`;
    }
    
    const totalPrice = cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    
    const priceElement = cartTotalPrice.querySelector('span:last-child');
    if (priceElement) {
      priceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }
    
    renderCartItems();
  }
  
  function renderCartItems() {
    if (!cartItemsContainer || !cartEmptyMessage || !checkoutBtn) return;
    
    const itemElements = cartItemsContainer.querySelectorAll('.cart-item');
    itemElements.forEach(item => item.remove());
    
    if (cartItems.length === 0) {
      (cartEmptyMessage as HTMLElement).style.display = 'block';
      (checkoutBtn as HTMLButtonElement).disabled = true;
      return;
    } else {
      (cartEmptyMessage as HTMLElement).style.display = 'none';
      (checkoutBtn as HTMLButtonElement).disabled = false;
    }
    
    cartItems.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      
      cartItem.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="cart-item-details">
          <h3 class="cart-item-title">${item.title}</h3>
          <p class="cart-item-author">${item.author}</p>
          <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
          <div class="cart-item-controls">
            <div class="quantity-controls">
              <button class="quantity-btn decrease-quantity" data-id="${item.book_id}">
                <i class="fa fa-minus" aria-hidden="true"></i>
              </button>
              <span class="quantity">${item.quantity}</span>
              <button class="quantity-btn btn2 increase-quantity" data-id="${item.book_id}">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </button>
            </div>
            <span class="item-total">$${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-item" data-id="${item.book_id}">
              <i class="fa fa-trash" aria-hidden="true"></i>
              Remove
            </button>
          </div>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
    
    addCartItemEventListeners();
  }
  
  function addCartItemEventListeners() {
    const increaseButtons = document.querySelectorAll('.increase-quantity');
    increaseButtons.forEach(button => {
      button.addEventListener('click', function(this: HTMLElement) {
        const id = this.getAttribute('data-id');
        if (id) {
          incrementCartItem(id);
        }
      });
    });
    
    const decreaseButtons = document.querySelectorAll('.decrease-quantity');
    decreaseButtons.forEach(button => {
      button.addEventListener('click', function(this: HTMLElement) {
        const id = this.getAttribute('data-id');
        if (id) {
          decrementCartItem(id);
        }
      });
    });
    
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
      button.addEventListener('click', function(this: HTMLElement) {
        const id = this.getAttribute('data-id');
        if (id) {
          removeCartItem(id);
        }
      });
    });
  }
  
  function incrementCartItem(id: string) {
    const itemIndex = cartItems.findIndex(item => item.book_id === id);
    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity += 1;
      updateCartUI();
    }
  }
  
  function decrementCartItem(id: string) {
    const itemIndex = cartItems.findIndex(item => item.book_id=== id);
    if (itemIndex !== -1) {
      if (cartItems[itemIndex].quantity > 1) {
        cartItems[itemIndex].quantity -= 1;
      } else {
        removeCartItem(id);
        return;
      }
      updateCartUI();
    }
  }
  
  function removeCartItem(id: string) {
    cartItems = cartItems.filter(item => item.book_id!== id);
    updateCartUI();
    showNotification("Item removed from cart");
  }
  
  function showNotification(message: string) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: var(--primary);
      color: white;
      padding: 10px 15px;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      z-index: 1000;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.3s, transform 0.3s;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
  
  function showBookModal(result: Book) {
    const modal = document.createElement('div');
    modal.className = 'book-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>${result.title}</h2>
        <p><strong>Author:</strong> ${result.author}</p>
        <p><strong>Genre:</strong> ${result.genre}</p>
        <p><strong>Year:</strong> ${result.year}</p>
        <p><strong>Pages:</strong> ${result.pages}</p>
        <p><strong>Price:</strong> $${Number(result.price).toFixed(2)}</p>
        <p><strong>Description:</strong> ${result.description}</p>
        <p><strong>Publisher:</strong> ${result.publisher}</p>
        <img src="${result.image}" alt="${result.title}">
      </div>
    `;
  
    document.body.appendChild(modal);
  
    const closeButton = modal.querySelector('.close-button');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
      });
    }
  
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }
  
  const cartButton = document.getElementById('cart-button');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartModal = document.querySelector('.cart-modal');
  const closeCart = document.getElementById('close-cart');
  
  if (cartButton && cartOverlay && closeCart && cartModal) {
    cartButton.addEventListener('click', () => {
      cartOverlay.classList.add('active');
      cartModal.classList.add('active');
    });
    
    const closeCartModal = () => {
      cartOverlay.classList.remove('active');
      cartModal.classList.remove('active');
    };
    
    closeCart.addEventListener('click', closeCartModal);
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) {
        closeCartModal();
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && cartOverlay.classList.contains('active')) {
        closeCartModal();
      }
    });
  }
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      if (cartItems.length > 0) {
        const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        alert(`Proceeding to checkout!\nTotal: $${totalPrice.toFixed(2)}\nNumber of books: ${cartItems.reduce((count, item) => count + item.quantity, 0)}`);
      }
    });
  }
  
  // CRUD Functionality
  
  // Add Book Modal
  if (addBookBtn && addModalOverlay) {
    addBookBtn.addEventListener('click', () => {
      openAddModal();
    });
  }
  
  function openAddModal() {
    if (addModalOverlay) {
      addModalOverlay.classList.add('active');
      
      // Reset the form
      if (addBookForm) {
        addBookForm.reset();
      }
    }
  }
  
  if (closeAddModal && addModalOverlay) {
    closeAddModal.addEventListener('click', () => {
      addModalOverlay.classList.remove('active');
    });
    
    addModalOverlay.addEventListener('click', (e) => {
      if (e.target === addModalOverlay) {
        addModalOverlay.classList.remove('active');
      }
    });
  }
  
  // Edit Book Modal
  function openEditModal(book: Book) {
    if (editModalOverlay) {
      editModalOverlay.classList.add('active');
      
      const editBookId = document.getElementById('edit-book-id') as HTMLInputElement;
      const editTitle = document.getElementById('edit-title') as HTMLInputElement;
      const editAuthor = document.getElementById('edit-author') as HTMLInputElement;
      const editYear = document.getElementById('edit-year') as HTMLInputElement;
      const editPages = document.getElementById('edit-pages') as HTMLInputElement;
      const editGenre = document.getElementById('edit-genre') as HTMLSelectElement;
      const editDescription = document.getElementById('edit-description') as HTMLTextAreaElement;
      const editPublisher = document.getElementById('edit-publisher') as HTMLInputElement;
      const editImage = document.getElementById('edit-image') as HTMLInputElement;
      
      if (editBookId) editBookId.value = book.book_id;
      if (editTitle) editTitle.value = book.title;
      if (editAuthor) editAuthor.value = book.author;
      if (editYear) editYear.value = book.year.toString();
      if (editPages) editPages.value = book.pages.toString();
      if (editGenre) editGenre.value = book.genre;
      if (editDescription) editDescription.value = book.description;
      if (editPublisher) editPublisher.value = book.publisher;
      if (editImage) editImage.value = book.image;
    }
  }
  
  if (closeEditModal && editModalOverlay) {
    closeEditModal.addEventListener('click', () => {
      editModalOverlay.classList.remove('active');
    });
    
    editModalOverlay.addEventListener('click', (e) => {
      if (e.target === editModalOverlay) {
        editModalOverlay.classList.remove('active');
      }
    });
  }
  
  // Delete Confirmation Modal
  function openDeleteModal(bookId: string) {
    if (deleteModalOverlay) {
      deleteModalOverlay.classList.add('active');
      currentBookIdToDelete = bookId;
    }
  }
  
  if (cancelDeleteBtn && deleteModalOverlay) {
    cancelDeleteBtn.addEventListener('click', () => {
      deleteModalOverlay.classList.remove('active');
      currentBookIdToDelete = null;
    });
  }
  
  if (deleteModalOverlay) {
    deleteModalOverlay.addEventListener('click', (e) => {
      if (e.target === deleteModalOverlay) {
        deleteModalOverlay.classList.remove('active');
        currentBookIdToDelete = null;
      }
    });
  }
  
  // Form Submissions
  if (addBookForm) {
    addBookForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(addBookForm);
      const bookData: Record<string, string> = {};
      
      formData.forEach((value, key) => {
        bookData[key] = value as string;
      });
      
      // Add price field (random between $9.99 and $29.99)
      const price = (Math.random() * 20 + 9.99).toFixed(2);
      bookData['price'] = price;
      
      try {
        if (loadingContainer) {
          loadingContainer.style.display = "flex";
        }
        
        const response = await fetch('http://localhost:5000/api/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookData),
        });
        
        if (!response.ok) {
          throw new Error('Failed to add book');
        }
        
        // Close modal and refresh books
        if (addModalOverlay) {
          addModalOverlay.classList.remove('active');
        }
        
        // Refresh book list
        fetchBooks().then(({ books, stats }) => {
          displayBooks(books);
          updateStats(stats);
        });
        
        showNotification('Book added successfully!');
      } catch (error) {
        console.error("Error adding book:", error);
        showNotification('Failed to add book. Please try again.');
      } finally {
        if (loadingContainer) {
          loadingContainer.style.display = "none";
        }
      }
    });
  }
  
  if (editBookForm) {
    editBookForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(editBookForm);
      const bookData: Record<string, string> = {};
      const bookId = (document.getElementById('edit-book-id') as HTMLInputElement).value;
      
      formData.forEach((value, key) => {
        if (key !== 'id') {
          bookData[key] = value as string;
        }
      });
      
      try {
        if (loadingContainer) {
          loadingContainer.style.display = "flex";
        }
        
        const response = await fetch(`http://localhost:5000/api/books/${bookId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookData),
        });
        
        if (!response.ok) {
          throw new Error('Failed to update book');
        }
        
        // Close modal and refresh books
        if (editModalOverlay) {
          editModalOverlay.classList.remove('active');
        }
        
        // Refresh book list
        fetchBooks().then(({ books, stats }) => {
          displayBooks(books);
          updateStats(stats);
        });
        
        showNotification('Book updated successfully!');
      } catch (error) {
        console.error("Error updating book:", error);
        showNotification('Failed to update book. Please try again.');
      } finally {
        if (loadingContainer) {
          loadingContainer.style.display = "none";
        }
      }
    });
  }
  
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', async () => {
      if (!currentBookIdToDelete) return;
      
      try {
        if (loadingContainer) {
          loadingContainer.style.display = "flex";
        }
        
        const response = await fetch(`http://localhost:5000/api/books/${currentBookIdToDelete}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete book');
        }
        
        // Close modal
        if (deleteModalOverlay) {
          deleteModalOverlay.classList.remove('active');
        }
        
        // Remove from cart if present
        cartItems = cartItems.filter(item => item.book_id !== currentBookIdToDelete);
        updateCartUI();
        
        // Refresh book list
        fetchBooks().then(({ books, stats }) => {
          displayBooks(books);
          updateStats(stats);
        });
        
        showNotification('Book deleted successfully!');
      } catch (error) {
        console.error("Error deleting book:", error);
        showNotification('Failed to delete book. Please try again.');
      } finally {
        if (loadingContainer) {
          loadingContainer.style.display = "none";
        }
        currentBookIdToDelete = null;
      }
    });
  }
  
  // Global ESC key handler for all modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (addModalOverlay && addModalOverlay.classList.contains('active')) {
        addModalOverlay.classList.remove('active');
      }
      
      if (editModalOverlay && editModalOverlay.classList.contains('active')) {
        editModalOverlay.classList.remove('active');
      }
      
      if (deleteModalOverlay && deleteModalOverlay.classList.contains('active')) {
        deleteModalOverlay.classList.remove('active');
        currentBookIdToDelete = null;
      }
    }
  });
  
  updateCartUI();
});
