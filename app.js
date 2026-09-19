const PRODUCTS = [
  {
    id: 'sv-1',
    name: 'Acid-Wash Oversized Denim Jacket',
    category: 'Outerwear',
    price: 98,
    originalPrice: 128,
    rating: 4.9,
    reviewsCount: 142,
    stock: 3,
    isLowStock: true,
    isSale: true,
    isNew: false,
    image: 'assets/images/jacket.jpg',
    description: 'Constructed from premium 14oz Japanese denim featuring artisanal vintage wash treatment, relaxed drop-shoulders, and custom gunmetal hardware.'
  },
  {
    id: 'sv-2',
    name: 'Vibe Platform Cushion Sneakers',
    category: 'Footwear',
    price: 125,
    originalPrice: 160,
    rating: 4.8,
    reviewsCount: 98,
    stock: 8,
    isLowStock: false,
    isSale: true,
    isNew: true,
    image: 'assets/images/sneakers.jpg',
    description: 'Sculpted lightweight EVA midsole paired with breathable organic knit uppers and custom tread pattern for maximum daily mobility.'
  },
  {
    id: 'sv-3',
    name: 'Heavy Ribbed Cashmere Knit Beanie',
    category: 'Accessories',
    price: 28,
    originalPrice: 38,
    rating: 4.7,
    reviewsCount: 76,
    stock: 15,
    isLowStock: false,
    isSale: true,
    isNew: false,
    image: 'assets/images/beanie.jpg',
    description: 'Ultra-soft blend of recycled cashmere and merino wool engineered to maintain shape and deliver warmth without scalp irritation.'
  },
  {
    id: 'sv-4',
    name: 'Modular Minimalist Utility Vest',
    category: 'Outerwear',
    price: 115,
    originalPrice: 145,
    rating: 4.9,
    reviewsCount: 64,
    stock: 2,
    isLowStock: true,
    isSale: true,
    isNew: true,
    image: 'assets/images/vest.jpg',
    description: 'Weather-resistant ripstop nylon shell with multi-compartment magnetic stash pockets and tactical FIDLOCK buckle integration.'
  },
  {
    id: 'sv-5',
    name: 'Geometric Acetate Bold Sunglasses',
    category: 'Accessories',
    price: 42,
    originalPrice: 55,
    rating: 4.6,
    reviewsCount: 110,
    stock: 12,
    isLowStock: false,
    isSale: true,
    isNew: false,
    image: 'assets/images/sunglasses.jpg',
    description: 'Hand-polished Italian Mazzucchelli acetate frames equipped with Category 3 100% UV400 anti-reflective polarized lenses.'
  },
  {
    id: 'sv-6',
    name: 'Tactical Wide-Leg Cargo Trousers',
    category: 'Streetwear',
    price: 74,
    originalPrice: 92,
    rating: 4.8,
    reviewsCount: 85,
    stock: 5,
    isLowStock: false,
    isSale: true,
    isNew: true,
    image: 'assets/images/cargo.jpg',
    description: 'Tailored with heavy 320gsm cotton twill, articulated knee darts for unrestricted movement, and expandable bellow cargo pockets.'
  },
  {
    id: 'sv-7',
    name: 'Heavyweight Boxy Graphic Hoodie',
    category: 'Streetwear',
    price: 86,
    originalPrice: 110,
    rating: 4.9,
    reviewsCount: 215,
    stock: 4,
    isLowStock: true,
    isSale: true,
    isNew: false,
    image: 'assets/images/hoodie.jpg',
    description: 'Heavy 480gsm French terry cotton with zero shrinkage preshrunk wash, double-layer hood construction, and clean kangaroo pouch.'
  },
  {
    id: 'sv-8',
    name: 'All-Weather Technical Sling Bag',
    category: 'Accessories',
    price: 59,
    originalPrice: 78,
    rating: 4.7,
    reviewsCount: 132,
    stock: 10,
    isLowStock: false,
    isSale: true,
    isNew: false,
    image: 'assets/images/bag.jpg',
    description: 'Waterproof Cordura 500D nylon with YKK AquaGuard zippers, padded breathable mesh rear panel, and quick-adjust webbing strap.'
  }
];

const state = {
  cart: [],
  promoCode: null,
  discountPercent: 0,
  flatDiscount: 0,
  freeShippingPromo: false,
  activeCategory: 'all',
  searchQuery: '',
  onlyLowStock: false,
  sortBy: 'featured',
  activeModalProduct: null,
  checkoutStep: 1,
  selectedPaymentMethod: 'card',
  selectedBank: 'BCA',
  shippingData: {
    email: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    phone: ''
  }
};

try {
  const savedCart = localStorage.getItem('shopvibe_cart_v2');
  if (savedCart) {
    state.cart = JSON.parse(savedCart);
  }
} catch (e) {
  state.cart = [];
}

const productsGridEl = document.getElementById('productsGrid');
const cartToggleBtn = document.getElementById('cartToggleBtn');
const cartDrawerEl = document.getElementById('cartDrawer');
const drawerBackdropEl = document.getElementById('drawerBackdrop');
const closeDrawerBtn = document.getElementById('closeDrawerBtn');
const cartCountBadge = document.getElementById('cartCountBadge');
const drawerCountText = document.getElementById('drawerCountText');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartEmptyState = document.getElementById('cartEmptyState');
const cartTotalValue = document.getElementById('cartTotalValue');
const cartShippingValue = document.getElementById('cartShippingValue');
const discountSummaryRow = document.getElementById('discountSummaryRow');
const discountCodeName = document.getElementById('discountCodeName');
const cartDiscountValue = document.getElementById('cartDiscountValue');
const promoCodeInput = document.getElementById('promoCodeInput');
const applyPromoBtn = document.getElementById('applyPromoBtn');
const checkoutBtn = document.getElementById('checkoutBtn');
const searchInput = document.getElementById('searchInput');
const searchKbdShortcut = document.getElementById('searchKbdShortcut');
const searchClearBtn = document.getElementById('searchClearBtn');
const categoryChips = document.getElementById('categoryChips');
const stockFilterCheckbox = document.getElementById('stockFilterCheckbox');
const sortSelect = document.getElementById('sortSelect');
const wishlistBtn = document.getElementById('wishlistBtn');
const heroPromoBtn = document.getElementById('heroPromoBtn');
const continueShoppingBtn = document.getElementById('continueShoppingBtn');
const newsletterForm = document.getElementById('newsletterForm');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterHelper = document.getElementById('newsletterHelper');
const quickViewModal = document.getElementById('quickViewModal');
const modalBackdropEl = document.getElementById('modalBackdrop');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalProductImage = document.getElementById('modalProductImage');
const modalProductCategory = document.getElementById('modalProductCategory');
const modalProductTitle = document.getElementById('modalProductTitle');
const modalProductRating = document.getElementById('modalProductRating');
const modalProductPrice = document.getElementById('modalProductPrice');
const modalProductOriginalPrice = document.getElementById('modalProductOriginalPrice');
const modalProductDescription = document.getElementById('modalProductDescription');
const modalAddToCartBtn = document.getElementById('modalAddToCartBtn');
const toastContainer = document.getElementById('toastContainer');
const navLinks = document.querySelectorAll('.nav-link');
const floatingCartBtn = document.getElementById('floatingCartBtn');
const floatingCartBadge = document.getElementById('floatingCartBadge');
const backToTopBtn = document.getElementById('backToTopBtn');
const freeShippingNotice = document.getElementById('freeShippingNotice');
const freeShippingFill = document.getElementById('freeShippingFill');

const checkoutModal = document.getElementById('checkoutModal');
const checkoutBackdrop = document.getElementById('checkoutBackdrop');
const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
const autofillDemoBtn = document.getElementById('autofillDemoBtn');
const toStep2Btn = document.getElementById('toStep2Btn');
const backToStep1Btn = document.getElementById('backToStep1Btn');
const toStep3Btn = document.getElementById('toStep3Btn');
const backToStep2Btn = document.getElementById('backToStep2Btn');
const placeOrderBtn = document.getElementById('placeOrderBtn');
const finishCheckoutBtn = document.getElementById('finishCheckoutBtn');
const printReceiptBtn = document.getElementById('printReceiptBtn');
const copyVaBtn = document.getElementById('copyVaBtn');
const cardNumberInput = document.getElementById('cardNumber');
const cardExpiryInput = document.getElementById('cardExpiry');
const payMethodTabs = document.querySelectorAll('.pay-method-tab');
const bankPills = document.querySelectorAll('.bank-pill');

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('active');
  });

  setTimeout(() => {
    toast.classList.remove('active');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 250);
  }, 2800);
}

function saveCartToStorage() {
  try {
    localStorage.setItem('shopvibe_cart_v2', JSON.stringify(state.cart));
  } catch (e) {}
}

function getFilteredProducts() {
  let list = [...PRODUCTS];

  if (state.activeCategory !== 'all') {
    list = list.filter(p => p.category.toLowerCase() === state.activeCategory.toLowerCase());
  }

  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }

  if (state.onlyLowStock) {
    list = list.filter(p => p.isLowStock);
  }

  if (state.sortBy === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  }

  return list;
}

function renderStars() {
  return `
    <span class="stars-row" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
    </span>
  `;
}

function renderProducts() {
  const products = getFilteredProducts();

  if (products.length === 0) {
    productsGridEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <h3>No matching drops found</h3>
        <p>Try clearing filters or changing your search terms to explore our full seasonal roster.</p>
        <button type="button" class="btn btn-secondary btn-sm" id="resetFiltersBtn">Reset All Filters</button>
      </div>
    `;

    const resetBtn = document.getElementById('resetFiltersBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.activeCategory = 'all';
        state.searchQuery = '';
        state.onlyLowStock = false;
        state.sortBy = 'featured';

        searchInput.value = '';
        searchClearBtn.classList.remove('visible');
        if (searchKbdShortcut) {
          searchKbdShortcut.classList.remove('hidden');
        }
        stockFilterCheckbox.checked = false;
        sortSelect.value = 'featured';

        document.querySelectorAll('.filter-chip').forEach(c => {
          c.classList.toggle('selected', c.dataset.filter === 'all');
        });
        navLinks.forEach(l => {
          l.classList.toggle('active', l.dataset.category === 'all');
        });

        renderProducts();
      });
    }
    return;
  }

  productsGridEl.innerHTML = products.map(item => `
    <article class="product-card" data-id="${item.id}">
      <div class="product-image-wrap">
        <div class="product-badge-group">
          ${item.isSale ? '<span class="status-chip status-chip-sale">20% OFF</span>' : ''}
          ${item.isNew ? '<span class="status-chip status-chip-new">NEW DROP</span>' : ''}
          ${item.isLowStock ? `<span class="status-chip status-chip-stock">ONLY ${item.stock} LEFT</span>` : ''}
        </div>
        <button type="button" class="quick-view-btn-card" data-action="quickview" data-id="${item.id}" aria-label="Quick view for ${item.name}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
        <img src="${item.image}" alt="${item.name}" class="product-img" loading="lazy" width="400" height="400">
      </div>

      <div class="product-content">
        <span class="product-category">${item.category}</span>
        <h3 class="product-title">${item.name}</h3>

        <div class="product-rating">
          ${renderStars()}
          <span class="rating-count">(${item.reviewsCount})</span>
        </div>

        <div class="product-pricing">
          <span class="price-promo">$${item.price.toFixed(2)}</span>
          ${item.originalPrice ? `<span class="price-original">$${item.originalPrice.toFixed(2)}</span>` : ''}
        </div>

        ${item.isLowStock ? `
          <div class="product-urgency">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Selling fast &bull; Only ${item.stock} remaining</span>
          </div>
        ` : ''}

        <div class="card-action-bar">
          <button type="button" class="btn btn-primary btn-md" data-action="add" data-id="${item.id}">
            Add to Bag
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

function updateCartBadges() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountBadge.textContent = totalItems;
  drawerCountText.textContent = `(${totalItems})`;
  floatingCartBadge.textContent = totalItems;

  cartCountBadge.style.transform = 'scale(1.25)';
  floatingCartBadge.style.transform = 'scale(1.25)';
  setTimeout(() => {
    cartCountBadge.style.transform = 'scale(1)';
    floatingCartBadge.style.transform = 'scale(1)';
  }, 150);
}

function renderCartDrawer() {
  updateCartBadges();

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const target = 75;
  const remaining = Math.max(0, target - subtotal);
  const percent = Math.min(100, Math.round((subtotal / target) * 100));

  freeShippingFill.style.width = `${percent}%`;

  if (remaining === 0 && subtotal > 0) {
    freeShippingNotice.innerHTML = `<strong>You unlocked FREE Express Delivery!</strong>`;
  } else {
    freeShippingNotice.innerHTML = `Add <strong>$${remaining.toFixed(2)}</strong> more for <strong>FREE Express Delivery</strong>`;
  }

  if (state.cart.length === 0) {
    cartEmptyState.style.display = 'flex';
    cartItemsContainer.innerHTML = '';
    cartShippingValue.textContent = 'FREE';
    discountSummaryRow.style.display = 'none';
    cartTotalValue.textContent = '$0.00';
    return;
  }

  cartEmptyState.style.display = 'none';

  cartItemsContainer.innerHTML = state.cart.map(item => `
    <div class="cart-item" data-cart-id="${item.cartItemId}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-name">${item.name}</h4>
        <div style="display: flex; align-items: center; gap: 8px;">
          <label style="font-size: 11px; color: var(--color-text-muted);">Size:</label>
          <select class="cart-item-size-select" data-action="change-size" data-cart-id="${item.cartItemId}">
            <option value="S" ${item.size === 'S' ? 'selected' : ''}>S</option>
            <option value="M" ${item.size === 'M' ? 'selected' : ''}>M</option>
            <option value="L" ${item.size === 'L' ? 'selected' : ''}>L</option>
            <option value="XL" ${item.size === 'XL' ? 'selected' : ''}>XL</option>
          </select>
        </div>
        <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
        <button type="button" class="cart-remove-item" data-action="remove-cart" data-cart-id="${item.cartItemId}" aria-label="Remove ${item.name} from bag">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
        <div class="cart-quantity-selector">
          <button type="button" class="qty-btn" data-action="decrease-qty" data-cart-id="${item.cartItemId}" aria-label="Decrease quantity">-</button>
          <span class="qty-display">${item.quantity}</span>
          <button type="button" class="qty-btn" data-action="increase-qty" data-cart-id="${item.cartItemId}" aria-label="Increase quantity">+</button>
        </div>
      </div>
    </div>
  `).join('');

  let shipping = subtotal >= 75 || subtotal === 0 || state.freeShippingPromo ? 0 : 10;
  let discountAmount = 0;

  if (state.discountPercent > 0) {
    discountAmount += subtotal * (state.discountPercent / 100);
  }
  if (state.flatDiscount > 0) {
    discountAmount += state.flatDiscount;
  }

  const total = Math.max(0, subtotal - discountAmount + shipping);

  cartShippingValue.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;

  if (discountAmount > 0) {
    discountSummaryRow.style.display = 'flex';
    discountCodeName.textContent = state.promoCode;
    cartDiscountValue.textContent = `-$${discountAmount.toFixed(2)}`;
  } else {
    discountSummaryRow.style.display = 'none';
  }

  cartTotalValue.textContent = `$${total.toFixed(2)}`;
}

function addToCart(productId, size = 'M') {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const cartItemId = `${productId}-${size}`;
  const existingItem = state.cart.find(item => item.cartItemId === cartItemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({
      cartItemId,
      id: product.id,
      name: product.name,
      price: product.price,
      size,
      image: product.image,
      quantity: 1
    });
  }

  saveCartToStorage();
  renderCartDrawer();
  openDrawer();
  showToast(`Added ${product.name} (Size ${size}) to your bag.`);
}

function updateItemQuantity(cartItemId, delta) {
  const itemIndex = state.cart.findIndex(i => i.cartItemId === cartItemId);
  if (itemIndex === -1) return;

  state.cart[itemIndex].quantity += delta;

  if (state.cart[itemIndex].quantity <= 0) {
    state.cart.splice(itemIndex, 1);
    showToast('Item removed from your bag.', 'info');
  }

  saveCartToStorage();
  renderCartDrawer();
}

function updateItemSize(cartItemId, newSize) {
  const itemIndex = state.cart.findIndex(i => i.cartItemId === cartItemId);
  if (itemIndex === -1) return;

  const currentItem = state.cart[itemIndex];
  const targetCartId = `${currentItem.id}-${newSize}`;

  const existingWithTargetSize = state.cart.find(i => i.cartItemId === targetCartId);
  if (existingWithTargetSize && targetCartId !== cartItemId) {
    existingWithTargetSize.quantity += currentItem.quantity;
    state.cart.splice(itemIndex, 1);
  } else {
    currentItem.size = newSize;
    currentItem.cartItemId = targetCartId;
  }

  saveCartToStorage();
  renderCartDrawer();
  showToast(`Size updated to ${newSize}.`);
}

function removeCartItem(cartItemId) {
  state.cart = state.cart.filter(i => i.cartItemId !== cartItemId);
  saveCartToStorage();
  renderCartDrawer();
  showToast('Item removed from your bag.', 'info');
}

function openDrawer() {
  cartDrawerEl.classList.add('active');
  drawerBackdropEl.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  cartDrawerEl.classList.remove('active');
  drawerBackdropEl.classList.remove('active');
  document.body.style.overflow = '';
}

function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  state.activeModalProduct = product;

  modalProductImage.src = product.image;
  modalProductImage.alt = product.name;
  modalProductCategory.textContent = product.category;
  modalProductTitle.textContent = product.name;
  modalProductRating.textContent = `${product.rating} (${product.reviewsCount} reviews)`;
  modalProductPrice.textContent = `$${product.price.toFixed(2)}`;
  modalProductOriginalPrice.textContent = product.originalPrice ? `$${product.originalPrice.toFixed(2)}` : '';
  modalProductDescription.textContent = product.description;

  const defaultSizeRadio = document.querySelector('input[name="modalSize"][value="M"]');
  if (defaultSizeRadio) defaultSizeRadio.checked = true;

  quickViewModal.classList.add('active');
  modalBackdropEl.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  quickViewModal.classList.remove('active');
  modalBackdropEl.classList.remove('active');
  state.activeModalProduct = null;
  document.body.style.overflow = '';
}

function setCheckoutStep(step) {
  state.checkoutStep = step;
  document.querySelectorAll('.checkout-step-pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.step-node').forEach(n => {
    const nodeStep = parseInt(n.dataset.step, 10);
    n.classList.toggle('active', nodeStep <= step);
  });

  if (step === 1) {
    document.getElementById('checkoutStep1').classList.add('active');
  } else if (step === 2) {
    document.getElementById('checkoutStep2').classList.add('active');
  } else if (step === 3) {
    populateReviewStep();
    document.getElementById('checkoutStep3').classList.add('active');
  } else if (step === 4) {
    document.getElementById('checkoutStepSuccess').classList.add('active');
  }
}

function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Your shopping bag is empty. Add items first!', 'error');
    return;
  }
  closeDrawer();
  setCheckoutStep(1);
  checkoutModal.classList.add('active');
  checkoutBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  checkoutModal.classList.remove('active');
  checkoutBackdrop.classList.remove('active');
  document.body.style.overflow = '';
}

function populateReviewStep() {
  const recipientEl = document.getElementById('reviewRecipient');
  const addressEl = document.getElementById('reviewAddress');
  const paymentEl = document.getElementById('reviewPayment');
  const itemsListEl = document.getElementById('reviewItemsList');
  const subtotalEl = document.getElementById('reviewSubtotal');
  const shippingEl = document.getElementById('reviewShipping');
  const discountRowEl = document.getElementById('reviewDiscountRow');
  const discountEl = document.getElementById('reviewDiscount');
  const totalEl = document.getElementById('reviewTotal');

  recipientEl.textContent = `${state.shippingData.name} (${state.shippingData.phone})`;
  addressEl.textContent = `${state.shippingData.address}, ${state.shippingData.city} ${state.shippingData.zip}`;

  if (state.selectedPaymentMethod === 'card') {
    const rawCard = cardNumberInput.value.replace(/\s+/g, '');
    const last4 = rawCard.length >= 4 ? rawCard.slice(-4) : '4242';
    paymentEl.textContent = `Credit Card ending in •••• ${last4}`;
  } else if (state.selectedPaymentMethod === 'va') {
    paymentEl.textContent = `Virtual Account (${state.selectedBank})`;
  } else {
    paymentEl.textContent = 'Instant QRIS';
  }

  itemsListEl.innerHTML = state.cart.map(item => `
    <div class="review-item-row">
      <span><strong>${item.quantity}x</strong> ${item.name} (${item.size})</span>
      <span style="font-family: var(--font-mono); font-weight: 700;">$${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  `).join('');

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 75 || subtotal === 0 || state.freeShippingPromo ? 0 : 10;
  let discountAmount = 0;
  if (state.discountPercent > 0) discountAmount += subtotal * (state.discountPercent / 100);
  if (state.flatDiscount > 0) discountAmount += state.flatDiscount;

  const total = Math.max(0, subtotal - discountAmount + shipping);

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  shippingEl.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;

  if (discountAmount > 0) {
    discountRowEl.style.display = 'flex';
    discountEl.textContent = `-$${discountAmount.toFixed(2)}`;
  } else {
    discountRowEl.style.display = 'none';
  }

  totalEl.textContent = `$${total.toFixed(2)}`;
}

cartToggleBtn.addEventListener('click', openDrawer);
floatingCartBtn.addEventListener('click', openDrawer);
closeDrawerBtn.addEventListener('click', closeDrawer);
drawerBackdropEl.addEventListener('click', closeDrawer);

closeModalBtn.addEventListener('click', closeQuickView);
modalBackdropEl.addEventListener('click', closeQuickView);

checkoutBtn.addEventListener('click', openCheckoutModal);
closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
checkoutBackdrop.addEventListener('click', closeCheckoutModal);

if (continueShoppingBtn) {
  continueShoppingBtn.addEventListener('click', closeDrawer);
}

document.addEventListener('keydown', (e) => {
  if ((e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) && document.activeElement !== searchInput) {
    const isEditing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);
    if (!isEditing || e.key !== '/') {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  }

  if (e.key === 'Escape') {
    if (document.activeElement === searchInput) {
      if (searchInput.value.length > 0) {
        searchInput.value = '';
        state.searchQuery = '';
        searchClearBtn.classList.remove('visible');
        if (searchKbdShortcut) {
          searchKbdShortcut.classList.remove('hidden');
        }
        renderProducts();
      }
      searchInput.blur();
    }
    if (cartDrawerEl.classList.contains('active')) closeDrawer();
    if (quickViewModal.classList.contains('active')) closeQuickView();
    if (checkoutModal.classList.contains('active')) closeCheckoutModal();
  }
});

productsGridEl.addEventListener('click', (e) => {
  const addBtn = e.target.closest('[data-action="add"]');
  if (addBtn) {
    const id = addBtn.dataset.id;
    addToCart(id, 'M');
    return;
  }

  const quickViewBtn = e.target.closest('[data-action="quickview"]');
  if (quickViewBtn) {
    const id = quickViewBtn.dataset.id;
    openQuickView(id);
  }
});

cartItemsContainer.addEventListener('click', (e) => {
  const incBtn = e.target.closest('[data-action="increase-qty"]');
  if (incBtn) {
    updateItemQuantity(incBtn.dataset.cartId, 1);
    return;
  }

  const decBtn = e.target.closest('[data-action="decrease-qty"]');
  if (decBtn) {
    updateItemQuantity(decBtn.dataset.cartId, -1);
    return;
  }

  const removeBtn = e.target.closest('[data-action="remove-cart"]');
  if (removeBtn) {
    removeCartItem(removeBtn.dataset.cartId);
  }
});

cartItemsContainer.addEventListener('change', (e) => {
  const sizeSelect = e.target.closest('[data-action="change-size"]');
  if (sizeSelect) {
    updateItemSize(sizeSelect.dataset.cartId, sizeSelect.value);
  }
});

modalAddToCartBtn.addEventListener('click', () => {
  if (!state.activeModalProduct) return;
  const selectedSize = document.querySelector('input[name="modalSize"]:checked')?.value || 'M';
  addToCart(state.activeModalProduct.id, selectedSize);
  closeQuickView();
});

categoryChips.addEventListener('click', (e) => {
  const chip = e.target.closest('.filter-chip');
  if (!chip) return;

  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('selected'));
  chip.classList.add('selected');

  state.activeCategory = chip.dataset.filter;

  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.category === state.activeCategory);
  });

  renderProducts();
});

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const category = link.dataset.category;
    state.activeCategory = category;

    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.classList.toggle('selected', chip.dataset.filter === category);
    });

    renderProducts();

    const catalogSec = document.getElementById('catalog');
    if (catalogSec) {
      catalogSec.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

stockFilterCheckbox.addEventListener('change', (e) => {
  state.onlyLowStock = e.target.checked;
  renderProducts();
});

sortSelect.addEventListener('change', (e) => {
  state.sortBy = e.target.value;
  renderProducts();
});

searchInput.addEventListener('input', (e) => {
  state.searchQuery = e.target.value;
  const hasQuery = state.searchQuery.length > 0;
  searchClearBtn.classList.toggle('visible', hasQuery);
  if (searchKbdShortcut) {
    searchKbdShortcut.classList.toggle('hidden', hasQuery);
  }
  renderProducts();
});

searchClearBtn.addEventListener('click', () => {
  searchInput.value = '';
  state.searchQuery = '';
  searchClearBtn.classList.remove('visible');
  if (searchKbdShortcut) {
    searchKbdShortcut.classList.remove('hidden');
  }
  searchInput.focus();
  renderProducts();
});

applyPromoBtn.addEventListener('click', () => {
  const code = promoCodeInput.value.trim().toUpperCase();
  if (code === 'VIBE20') {
    state.promoCode = 'VIBE20';
    state.discountPercent = 20;
    renderCartDrawer();
    showToast('Voucher VIBE20 applied: 20% OFF granted!', 'success');
  } else if (code === 'FREESHIP') {
    state.promoCode = 'FREESHIP';
    state.freeShippingPromo = true;
    renderCartDrawer();
    showToast('Voucher FREESHIP applied: Free delivery unlocked!', 'success');
  } else if (code === 'SAVE10') {
    state.promoCode = 'SAVE10';
    state.flatDiscount = 10;
    renderCartDrawer();
    showToast('Voucher SAVE10 applied: $10 discount granted!', 'success');
  } else if (code === '') {
    showToast('Please enter a promo code.', 'error');
  } else {
    showToast('Invalid promo code. Try VIBE20 or FREESHIP.', 'error');
  }
});

wishlistBtn.addEventListener('click', () => {
  showToast('Wishlist feature synced to your profile.', 'info');
});

heroPromoBtn.addEventListener('click', () => {
  promoCodeInput.value = 'VIBE20';
  state.promoCode = 'VIBE20';
  state.discountPercent = 20;
  openDrawer();
  renderCartDrawer();
  showToast('Voucher VIBE20 activated for your order!', 'success');
});

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const val = newsletterEmail.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(val)) {
    newsletterEmail.classList.add('error');
    newsletterHelper.classList.add('error-text');
    newsletterHelper.textContent = 'Please provide a valid email address.';
    return;
  }

  newsletterEmail.classList.remove('error');
  newsletterHelper.classList.remove('error-text');
  newsletterHelper.textContent = 'Welcome to the inner circle! Check your email for secret drops.';
  newsletterEmail.value = '';
  showToast('VIP invitation link dispatched to your inbox.', 'success');
});

newsletterEmail.addEventListener('input', () => {
  if (newsletterEmail.classList.contains('error')) {
    newsletterEmail.classList.remove('error');
    newsletterHelper.classList.remove('error-text');
    newsletterHelper.textContent = 'We respect your inbox. Instant unsubscribe at any time.';
  }
});

autofillDemoBtn.addEventListener('click', () => {
  document.getElementById('shipEmail').value = 'alex.pratama@gmail.com';
  document.getElementById('shipName').value = 'Alex Pratama';
  document.getElementById('shipAddress').value = 'Jl. Sudirman No. 42, Senayan';
  document.getElementById('shipCity').value = 'Jakarta Selatan';
  document.getElementById('shipZip').value = '12190';
  document.getElementById('shipPhone').value = '+62 812-3456-7890';
  showToast('Demo shipping information autofilled!');
});

toStep2Btn.addEventListener('click', () => {
  const email = document.getElementById('shipEmail').value.trim();
  const name = document.getElementById('shipName').value.trim();
  const address = document.getElementById('shipAddress').value.trim();
  const city = document.getElementById('shipCity').value.trim();
  const zip = document.getElementById('shipZip').value.trim();
  const phone = document.getElementById('shipPhone').value.trim();

  if (!email || !name || !address || !city || !zip || !phone) {
    showToast('Please fill in all required shipping fields.', 'error');
    return;
  }

  state.shippingData = { email, name, address, city, zip, phone };
  setCheckoutStep(2);
});

backToStep1Btn.addEventListener('click', () => setCheckoutStep(1));
backToStep2Btn.addEventListener('click', () => setCheckoutStep(2));

toStep3Btn.addEventListener('click', () => {
  setCheckoutStep(3);
});

payMethodTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    payMethodTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const method = tab.dataset.method;
    state.selectedPaymentMethod = method;

    document.querySelectorAll('.payment-detail-box').forEach(b => b.classList.remove('active'));
    if (method === 'card') {
      document.getElementById('cardPaymentPane').classList.add('active');
    } else if (method === 'va') {
      document.getElementById('vaPaymentPane').classList.add('active');
    } else if (method === 'qris') {
      document.getElementById('qrisPaymentPane').classList.add('active');
    }
  });
});

bankPills.forEach(pill => {
  pill.addEventListener('click', () => {
    bankPills.forEach(p => p.classList.remove('selected'));
    pill.classList.add('selected');
    state.selectedBank = pill.dataset.bank;

    const vaMap = {
      BCA: '8801 2948 2018 4712',
      Mandiri: '8912 0482 9182 3019',
      BNI: '9880 1928 3819 0182',
      BRI: '7721 9482 1049 2819'
    };
    document.getElementById('vaNumberDisplay').textContent = vaMap[state.selectedBank] || '8801 2948 2018 4712';
  });
});

if (cardNumberInput) {
  cardNumberInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    e.target.value = formatted;
  });
}

if (cardExpiryInput) {
  cardExpiryInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 2) {
      e.target.value = `${val.slice(0, 2)}/${val.slice(2)}`;
    } else {
      e.target.value = val;
    }
  });
}

if (copyVaBtn) {
  copyVaBtn.addEventListener('click', () => {
    const text = document.getElementById('vaNumberDisplay').textContent.replace(/\s+/g, '');
    navigator.clipboard.writeText(text).then(() => {
      showToast('Virtual Account number copied to clipboard!');
    }).catch(() => {
      showToast('Virtual Account copied!');
    });
  });
}

placeOrderBtn.addEventListener('click', () => {
  placeOrderBtn.disabled = true;
  placeOrderBtn.textContent = 'Processing Payment...';

  setTimeout(() => {
    placeOrderBtn.disabled = false;
    placeOrderBtn.textContent = 'Confirm & Pay Now';

    const randomOrderId = 'SV-' + Math.floor(100000 + Math.random() * 900000);
    const totalPaid = document.getElementById('reviewTotal').textContent;

    document.getElementById('confirmedOrderId').textContent = randomOrderId;
    document.getElementById('confirmedEmail').textContent = state.shippingData.email;
    document.getElementById('confirmedTotal').textContent = totalPaid;

    state.cart = [];
    saveCartToStorage();
    renderCartDrawer();

    setCheckoutStep(4);
    showToast('Payment verified! Order confirmed.', 'success');
  }, 1200);
});

finishCheckoutBtn.addEventListener('click', () => {
  closeCheckoutModal();
});

printReceiptBtn.addEventListener('click', () => {
  window.print();
});

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

renderProducts();
renderCartDrawer();
