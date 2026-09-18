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

const splashScreenEl = document.getElementById('splashScreen');
const splashProgressBar = document.getElementById('splashProgressBar');
const splashProgressText = document.getElementById('splashProgressText');

const authNavContainer = document.getElementById('authNavContainer');

const authModalEl = document.getElementById('authModal');
const authModalBackdropEl = document.getElementById('authModalBackdrop');
const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
const tabLoginBtn = document.getElementById('tabLoginBtn');
const tabRegisterBtn = document.getElementById('tabRegisterBtn');
const loginTabPane = document.getElementById('loginTabPane');
const registerTabPane = document.getElementById('registerTabPane');
const authNoticeBanner = document.getElementById('authNoticeBanner');
const authNoticeText = document.getElementById('authNoticeText');
const authModalTitle = document.getElementById('authModalTitle');

const loginForm = document.getElementById('loginForm');
const loginIdentityInput = document.getElementById('loginIdentity');
const loginPasswordInput = document.getElementById('loginPassword');
const toggleLoginPassBtn = document.getElementById('toggleLoginPassBtn');
const switchToRegisterBtn = document.getElementById('switchToRegisterBtn');

const registerForm = document.getElementById('registerForm');
const regFullNameInput = document.getElementById('regFullName');
const regEmailInput = document.getElementById('regEmail');
const regPhoneInput = document.getElementById('regPhone');
const regPasswordInput = document.getElementById('regPassword');
const regConfirmPasswordInput = document.getElementById('regConfirmPassword');
const toggleRegPassBtn = document.getElementById('toggleRegPassBtn');
const regTermsCheckbox = document.getElementById('regTerms');
const strengthSeg1 = document.getElementById('strengthSeg1');
const strengthSeg2 = document.getElementById('strengthSeg2');
const strengthSeg3 = document.getElementById('strengthSeg3');
const strengthLabelText = document.getElementById('strengthLabelText');
const switchToLoginBtn = document.getElementById('switchToLoginBtn');

const profileDrawerEl = document.getElementById('profileDrawer');
const profileDrawerBackdropEl = document.getElementById('profileDrawerBackdrop');
const closeProfileDrawerBtn = document.getElementById('closeProfileDrawerBtn');
const profileLargeAvatar = document.getElementById('profileLargeAvatar');
const profileDrawerName = document.getElementById('profileDrawerName');
const profileDrawerEmail = document.getElementById('profileDrawerEmail');
const profileJoinDate = document.getElementById('profileJoinDate');
const profilePointsVal = document.getElementById('profilePointsVal');
const orderCountBadge = document.getElementById('orderCountBadge');
const orderHistoryContainer = document.getElementById('orderHistoryContainer');
const signOutBtn = document.getElementById('signOutBtn');

const DEFAULT_USER = {
  id: 'usr-alex-1',
  name: 'Alex Pratama',
  email: 'alex@gmail.com',
  phone: '+62 812-3456-7890',
  password: 'password123',
  tier: 'VIP Gold Member',
  vibePoints: 250,
  joinedDate: 'March 2026'
};

const DEFAULT_ORDERS = [
  {
    id: '#SV-89421',
    date: 'March 14, 2026',
    status: 'Delivered',
    items: 'Acid-Wash Oversized Denim Jacket (Size L), Modular Utility Vest (Size M)',
    total: '$213.00'
  },
  {
    id: '#SV-76120',
    date: 'February 28, 2026',
    status: 'Delivered',
    items: 'Vibe Platform Cushion Sneakers (Size 42)',
    total: '$125.00'
  }
];

function getUsers() {
  try {
    const raw = localStorage.getItem('shopvibe_users');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  const initial = [DEFAULT_USER];
  try {
    localStorage.setItem('shopvibe_users', JSON.stringify(initial));
  } catch (e) {}
  return initial;
}

function saveUsers(users) {
  try {
    localStorage.setItem('shopvibe_users', JSON.stringify(users));
  } catch (e) {}
}

function getActiveSession() {
  try {
    const raw = localStorage.getItem('shopvibe_active_session');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

function setActiveSession(user) {
  try {
    if (user) {
      localStorage.setItem('shopvibe_active_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('shopvibe_active_session');
    }
  } catch (e) {}
}

function isAuthenticated() {
  return !!getActiveSession();
}

function checkAuthGuard(callback) {
  if (isAuthenticated()) {
    if (typeof callback === 'function') callback();
    return true;
  }
  openAuthModal('login', 'Silakan masuk ke akun VIP Anda untuk mulai berbelanja koleksi ShopVibe.');
  showToast('Silakan masuk ke akun VIP Anda untuk mulai berbelanja koleksi ShopVibe.', 'info');
  return false;
}

function initSplashScreen() {
  if (!splashScreenEl) return;

  const isShown = sessionStorage.getItem('splash_shown');
  if (isShown === 'true') {
    splashScreenEl.style.display = 'none';
    return;
  }

  const duration = 1500;
  const startTime = performance.now();

  function updateProgress(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(1, elapsed / duration);
    const percent = Math.round(progress * 100);

    if (splashProgressBar) {
      splashProgressBar.style.width = `${percent}%`;
    }
    if (splashProgressText) {
      splashProgressText.textContent = `${percent}%`;
    }

    if (progress < 1) {
      requestAnimationFrame(updateProgress);
    } else {
      try {
        sessionStorage.setItem('splash_shown', 'true');
      } catch (e) {}
      splashScreenEl.classList.add('fade-out');
      setTimeout(() => {
        splashScreenEl.style.display = 'none';
      }, 500);
    }
  }

  requestAnimationFrame(updateProgress);
}

function renderAuthNav() {
  if (!authNavContainer) return;
  const activeUser = getActiveSession();

  if (activeUser) {
    const initial = activeUser.name ? activeUser.name.charAt(0).toUpperCase() : 'V';
    const firstName = activeUser.name ? activeUser.name.split(' ')[0] : 'Member';
    authNavContainer.innerHTML = `
      <button type="button" id="navProfileBtn" class="nav-profile-btn tooltip" data-tooltip="VIP Member Lounge" aria-label="Open VIP Profile">
        <div class="user-avatar" id="navUserAvatar">${initial}</div>
        <div class="nav-user-info">
          <span class="nav-user-greeting" id="navUserGreeting">Hi, ${firstName}</span>
          <span class="vip-badge-pill">VIP Member</span>
        </div>
      </button>
    `;
    const navProfileBtn = document.getElementById('navProfileBtn');
    if (navProfileBtn) {
      navProfileBtn.addEventListener('click', openProfileDrawer);
    }
  } else {
    authNavContainer.innerHTML = `
      <button type="button" id="navAuthBtn" class="btn btn-secondary btn-sm nav-auth-btn" aria-label="Sign In or Join VIP">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span>Sign In / Join VIP</span>
      </button>
    `;
    const navAuthBtn = document.getElementById('navAuthBtn');
    if (navAuthBtn) {
      navAuthBtn.addEventListener('click', () => openAuthModal('login'));
    }
  }
}

function openAuthModal(tab = 'login', noticeText = '') {
  if (!authModalEl || !authModalBackdropEl) return;

  switchAuthTab(tab);

  if (noticeText && authNoticeBanner && authNoticeText) {
    authNoticeText.textContent = noticeText;
    authNoticeBanner.style.display = 'flex';
  } else if (authNoticeBanner) {
    authNoticeBanner.style.display = 'none';
  }

  authModalEl.classList.add('active');
  authModalBackdropEl.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
  if (!authModalEl || !authModalBackdropEl) return;
  authModalEl.classList.remove('active');
  authModalBackdropEl.classList.remove('active');
  document.body.style.overflow = '';
  if (authNoticeBanner) authNoticeBanner.style.display = 'none';
}

function switchAuthTab(tab) {
  if (tab === 'register') {
    tabLoginBtn?.classList.remove('active');
    tabRegisterBtn?.classList.add('active');
    loginTabPane?.classList.remove('active');
    registerTabPane?.classList.add('active');
    if (authModalTitle) authModalTitle.textContent = 'Create VIP Account';
  } else {
    tabRegisterBtn?.classList.remove('active');
    tabLoginBtn?.classList.add('active');
    registerTabPane?.classList.remove('active');
    loginTabPane?.classList.add('active');
    if (authModalTitle) authModalTitle.textContent = 'Welcome to VIP Access';
  }
}

function evaluatePasswordStrength(password) {
  if (!password) return { score: 0, label: 'None' };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: 'Weak' };
  if (score <= 3) return { score: 2, label: 'Medium' };
  return { score: 3, label: 'Strong' };
}

function updatePasswordStrengthDisplay() {
  const pwd = regPasswordInput?.value || '';
  const { score, label } = evaluatePasswordStrength(pwd);

  if (strengthLabelText) strengthLabelText.textContent = label;

  strengthSeg1?.classList.remove('active-weak', 'active-medium', 'active-strong');
  strengthSeg2?.classList.remove('active-weak', 'active-medium', 'active-strong');
  strengthSeg3?.classList.remove('active-weak', 'active-medium', 'active-strong');

  if (score === 1) {
    strengthSeg1?.classList.add('active-weak');
  } else if (score === 2) {
    strengthSeg1?.classList.add('active-medium');
    strengthSeg2?.classList.add('active-medium');
  } else if (score === 3) {
    strengthSeg1?.classList.add('active-strong');
    strengthSeg2?.classList.add('active-strong');
    strengthSeg3?.classList.add('active-strong');
  }
}

function togglePasswordVisibility(inputEl, btnEl) {
  if (!inputEl || !btnEl) return;
  const isPass = inputEl.type === 'password';
  inputEl.type = isPass ? 'text' : 'password';
  const showIcon = btnEl.querySelector('.eye-show');
  const hideIcon = btnEl.querySelector('.eye-hide');
  if (showIcon && hideIcon) {
    showIcon.style.display = isPass ? 'none' : 'block';
    hideIcon.style.display = isPass ? 'block' : 'none';
  }
}

function getUserOrders(userId) {
  try {
    const raw = localStorage.getItem(`shopvibe_orders_${userId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  try {
    localStorage.setItem(`shopvibe_orders_${userId}`, JSON.stringify(DEFAULT_ORDERS));
  } catch (e) {}
  return [...DEFAULT_ORDERS];
}

function saveUserOrders(userId, orders) {
  try {
    localStorage.setItem(`shopvibe_orders_${userId}`, JSON.stringify(orders));
  } catch (e) {}
}

function openProfileDrawer() {
  const activeUser = getActiveSession();
  if (!activeUser) {
    openAuthModal('login');
    return;
  }

  if (profileLargeAvatar) profileLargeAvatar.textContent = activeUser.name ? activeUser.name.charAt(0).toUpperCase() : 'V';
  if (profileDrawerName) profileDrawerName.textContent = activeUser.name || 'VIP Member';
  if (profileDrawerEmail) profileDrawerEmail.textContent = activeUser.email || '';
  if (profileJoinDate) profileJoinDate.textContent = `Member since: ${activeUser.joinedDate || 'March 2026'}`;
  if (profilePointsVal) profilePointsVal.textContent = `${activeUser.vibePoints || 250} PTS`;

  const orders = getUserOrders(activeUser.id);
  if (orderCountBadge) orderCountBadge.textContent = `${orders.length} Pesanan`;

  if (orderHistoryContainer) {
    if (orders.length === 0) {
      orderHistoryContainer.innerHTML = `
        <div class="empty-state" style="padding: 24px 12px;">
          <p style="font-size: 13px; color: var(--color-text-muted);">Belum ada riwayat transaksi.</p>
        </div>
      `;
    } else {
      orderHistoryContainer.innerHTML = orders.map(ord => {
        let statusClass = 'status-delivered';
        if (ord.status === 'In Transit') statusClass = 'status-transit';
        if (ord.status === 'Processing') statusClass = 'status-processing';

        return `
          <div class="order-card">
            <div class="order-card-top">
              <span class="order-card-id">${ord.id}</span>
              <span class="order-status-pill ${statusClass}">${ord.status}</span>
            </div>
            <div class="order-card-date">${ord.date}</div>
            <div class="order-card-items">${ord.items}</div>
            <div class="order-card-total">
              <span>Total Pembayaran:</span>
              <strong>${ord.total}</strong>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  profileDrawerEl?.classList.add('active');
  profileDrawerBackdropEl?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProfileDrawer() {
  profileDrawerEl?.classList.remove('active');
  profileDrawerBackdropEl?.classList.remove('active');
  document.body.style.overflow = '';
}

function signOut() {
  setActiveSession(null);
  closeProfileDrawer();
  renderAuthNav();
  showToast('Anda telah keluar. Mode penjelajahan tamu aktif.', 'info');
}

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

cartToggleBtn.addEventListener('click', () => {
  if (!checkAuthGuard()) return;
  openDrawer();
});

floatingCartBtn.addEventListener('click', () => {
  if (!checkAuthGuard()) return;
  openDrawer();
});

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
  if (e.key === 'Escape') {
    if (cartDrawerEl.classList.contains('active')) closeDrawer();
    if (quickViewModal.classList.contains('active')) closeQuickView();
    if (checkoutModal.classList.contains('active')) closeCheckoutModal();
    if (authModalEl && authModalEl.classList.contains('active')) closeAuthModal();
    if (profileDrawerEl && profileDrawerEl.classList.contains('active')) closeProfileDrawer();
  }
});

productsGridEl.addEventListener('click', (e) => {
  const addBtn = e.target.closest('[data-action="add"]');
  if (addBtn) {
    if (!checkAuthGuard()) return;
    const id = addBtn.dataset.id;
    addToCart(id, 'M');
    return;
  }

  const quickViewBtn = e.target.closest('[data-action="quickview"]');
  if (quickViewBtn) {
    if (!checkAuthGuard()) return;
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
  if (!checkAuthGuard()) return;
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
  searchClearBtn.classList.toggle('visible', state.searchQuery.length > 0);
  renderProducts();
});

searchClearBtn.addEventListener('click', () => {
  searchInput.value = '';
  state.searchQuery = '';
  searchClearBtn.classList.remove('visible');
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
  if (!checkAuthGuard()) return;
  showToast('Wishlist feature synced to your profile.', 'info');
});

heroPromoBtn.addEventListener('click', () => {
  if (!checkAuthGuard()) return;
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

    const activeUser = getActiveSession();
    if (activeUser) {
      const orders = getUserOrders(activeUser.id);
      const itemsSummary = state.cart.map(i => `${i.name} (${i.size})`).join(', ');
      orders.unshift({
        id: '#' + randomOrderId,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Processing',
        items: itemsSummary || 'Streetwear Seasonal Drop',
        total: totalPaid
      });
      saveUserOrders(activeUser.id, orders);
    }

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

tabLoginBtn?.addEventListener('click', () => switchAuthTab('login'));
tabRegisterBtn?.addEventListener('click', () => switchAuthTab('register'));

switchToRegisterBtn?.addEventListener('click', () => switchAuthTab('register'));
switchToLoginBtn?.addEventListener('click', () => switchAuthTab('login'));

toggleLoginPassBtn?.addEventListener('click', () => togglePasswordVisibility(loginPasswordInput, toggleLoginPassBtn));
toggleRegPassBtn?.addEventListener('click', () => togglePasswordVisibility(regPasswordInput, toggleRegPassBtn));

regPasswordInput?.addEventListener('input', updatePasswordStrengthDisplay);

loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const identity = loginIdentityInput?.value.trim().toLowerCase();
  const password = loginPasswordInput?.value;

  if (!identity || !password) {
    showToast('Silakan isi email/username dan password.', 'error');
    return;
  }

  const users = getUsers();
  const user = users.find(u => 
    u.email.toLowerCase() === identity || 
    u.name.toLowerCase() === identity || 
    (u.name.toLowerCase().replace(/\s+/g, '') === identity)
  );

  if (!user || user.password !== password) {
    showToast('Email atau password tidak sesuai. Silakan coba lagi.', 'error');
    return;
  }

  setActiveSession(user);
  closeAuthModal();
  renderAuthNav();
  showToast(`Selamat datang kembali, ${user.name}!`, 'success');
});

registerForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = regFullNameInput?.value.trim();
  const email = regEmailInput?.value.trim();
  const phone = regPhoneInput?.value.trim();
  const password = regPasswordInput?.value;
  const confirmPassword = regConfirmPasswordInput?.value;
  const terms = regTermsCheckbox?.checked;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !phone || !password || !confirmPassword) {
    showToast('Harap lengkapi semua bidang registrasi.', 'error');
    return;
  }

  if (!emailRegex.test(email)) {
    showToast('Format email tidak valid.', 'error');
    return;
  }

  if (password.length < 6) {
    showToast('Password minimal harus 6 karakter.', 'error');
    return;
  }

  if (password !== confirmPassword) {
    showToast('Konfirmasi kata sandi tidak cocok.', 'error');
    return;
  }

  if (!terms) {
    showToast('Anda harus menyetujui Syarat & Ketentuan VIP.', 'error');
    return;
  }

  const users = getUsers();
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    showToast('Email ini telah terdaftar. Silakan masuk.', 'error');
    switchAuthTab('login');
    if (loginIdentityInput) loginIdentityInput.value = email;
    return;
  }

  const newUser = {
    id: 'usr-' + Date.now(),
    name,
    email,
    phone,
    password,
    tier: 'VIP Gold Member',
    vibePoints: 250,
    joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  };

  users.push(newUser);
  saveUsers(users);
  setActiveSession(newUser);

  registerForm.reset();
  updatePasswordStrengthDisplay();
  closeAuthModal();
  renderAuthNav();
  showToast(`Selamat bergabung di VIP Club, ${newUser.name}!`, 'success');
});

closeAuthModalBtn?.addEventListener('click', closeAuthModal);
authModalBackdropEl?.addEventListener('click', closeAuthModal);

closeProfileDrawerBtn?.addEventListener('click', closeProfileDrawer);
profileDrawerBackdropEl?.addEventListener('click', closeProfileDrawer);
signOutBtn?.addEventListener('click', signOut);

initSplashScreen();
renderAuthNav();
renderProducts();
renderCartDrawer();
