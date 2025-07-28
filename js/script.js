// script.js

// =================================================================================
// == EVENT LISTENER: DOM CONTENT LOADED
// =================================================================================
// All code runs after the HTML page is fully loaded.
document.addEventListener('DOMContentLoaded', () => {

    // --- GLOBAL CONFIGURATION & VARIABLES ---
    // Ganti baris ini di script.js Anda
    const API_URL = 'https://my-api-theta-three.vercel.app/pangeran/api';
    let allProductsData = [];
    let currentLang = localStorage.getItem('userLanguage') || 'id'; // Default to Indonesian

    // --- DOM ELEMENTS ---
    const body = document.body;
    const accountMenu = document.getElementById('account-menu');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const productGrid = document.querySelector('.featured-products .product-grid');
    const cartIcon = document.getElementById('cart-icon-img');
    const heroSection = document.querySelector('.hero');
    const carouselContainer = document.querySelector('.carousel-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mainNav = document.querySelector('.header-main-nav');
    const customSelect = document.querySelector('.custom-select');

    // --- STATIC UI TRANSLATION DICTIONARY ---
    const translations = {
        id: {
            'page-title-home': 'MineCart - Beranda',
            'page-title-products': 'MineCart - Semua Produk',
            'hero-title': 'Koleksi Terbaru Musim Ini',
            'hero-subtitle': 'Temukan gaya terbaik Anda dengan produk pilihan berkualitas tinggi.',
            'hero-cta': 'Lihat Semua Produk',
            'featured-title': 'Produk Rekomendasi',
            'see-more-btn': 'Lihat Lainnya',
            'buy-button': 'Tambah ke Keranjang',
            'loading-text': 'Memuat produk...',
            'page-title': 'Toko Keren',
            'follow-us-title': 'Ikuti Kami di',
            'about-us-title': 'Tentang Kami',
            'help-title': 'Bantuan',
            'page-title-about': 'MineCart - Tentang Kami',
            'login': 'Masuk',
            'register': 'Daftar',
            'search-title': 'Cari di MineCart...',
            'categories-title': 'Kategori',
            'cart-title': 'Keranjang Belanja',
            'home-title': 'Beranda',
            'all-products-title': 'Semua Produk',
            'page-title-help': 'MineCart - Bantuan',
            'page-title-cart': 'MineCart - Keranjang Belanja',
            'page-title-login': 'MineCart - Masuk',
            'login-header': 'Masuk ke Akun Anda',
            'page-title-register': 'MineCart - Daftar',
            'register-header': 'Buat Akun Baru',
            'search-btn-title': 'Cari',
            'cart-link-title': 'Lihat Keranjang Belanja',
            'theme-toggle-title': 'Ubah Tema',
            'error-load-products': 'Gagal memuat produk. Silakan coba lagi nanti.',
            'page-title-search': 'Hasil untuk',
            'search-results-for': 'Hasil Pencarian untuk',
            'my-account': 'Akun Saya',
            'logout': 'Keluar',
            'select-lang': 'Ganti Bahasa',
            'search-btn': 'Cari',
            'theme-toggle-btn': 'Ubah Tema',
            'categories': {
                'Semua': 'Semua',
                'Pakaian': 'Pakaian',
                'Elektronik': 'Elektronik',
                'Aksesoris': 'Aksesoris',
                'Buku': 'Buku',
                'Kecantikan': 'Kecantikan',
                'Olahraga': 'Olahraga',
                'Rumah & Dapur': 'Rumah & Dapur'
            },
            'summary-title': 'Ringkasan Belanja',
            'summary-subtotal': 'Subtotal',
            'summary-tax': 'Pajak (11%)',
            'summary-total': 'Total',
            'remove-item': 'Hapus',
            'help-q1': 'Bagaimana cara memesan produk?',
            'help-a1': 'Anda dapat memesan produk dengan menekan tombol "Tambah ke Keranjang", lalu melanjutkan ke halaman keranjang untuk menyelesaikan proses checkout.',
            'help-q2': 'Apa saja metode pembayaran yang diterima?',
            'help-a2': 'Saat ini, proyek ini adalah simulasi front-end dan tidak memproses pembayaran sungguhan. Semua fitur checkout hanya untuk tujuan demonstrasi.',
            'help-q3': 'Berapa lama waktu pengiriman?',
            'help-a3': 'Karena ini adalah website simulasi, tidak ada pengiriman fisik yang terjadi. Namun, kami memastikan pengalaman berbelanja virtual Anda secepat mungkin!',
            'help-q4': 'Bagaimana cara mengembalikan produk?',
            'help-a4': 'Proses pengembalian produk saat ini tidak dapat dilakukan karena website ini merupakan simulasi untuk proyek. Namun, kami selalu memastikan data produk yang ditampilkan akurat.',
            'help-q5': 'Apakah semua produk ready stock?',
            'help-a5': 'Ya, semua produk yang ditampilkan di website ini dianggap ready stock. Jumlah stok yang tertera pada setiap halaman produk adalah angka simulasi dan akan berkurang setiap kali ada transaksi pembelian.',
            'help-q6': 'Bagaimana cara mengubah data akun saya?',
            'help-a6': 'Fitur untuk mengubah data akun seperti password atau alamat akan tersedia di halaman "Akun Saya" yang saat ini sedang dalam pengembangan untuk proyek ini.',
            'help-q7': 'Ke mana saja jangkauan pengiriman MineCart?',
            'help-a7': 'Jangkauan pengiriman kami seluas imajinasi Anda! Sebagai platform simulasi, kami dapat "mengirim" ke lokasi mana pun di dunia virtual. Tidak ada biaya ongkos kirim yang akan dikenakan.',
            'help-q8': 'Bagaimana jika saya butuh bantuan lebih lanjut?',
            'help-a8': 'Jika pertanyaan Anda tidak terjawab di sini, jangan ragu untuk mengunjungi halaman "Tentang Kami" untuk mempelajari lebih lanjut tentang proyek ini atau hubungi kami melalui media sosial yang tertera di bagian atas halaman.',
            'help-q9': 'Mengapa ada fitur tema gelap/terang?',
            'help-a9': 'Kami menyediakan fitur tema gelap dan terang untuk memberikan kenyamanan visual maksimal bagi Anda. Fitur ini dibuat menggunakan CSS Variables dan JavaScript untuk menunjukkan salah satu komponen wajib dalam proyek ini.',

            'footer-title': '© 2025 MineCart. Dibuat oleh Pangeran Valerensco Rivaldi Hutabarat. Semua hak cipta dilindungi.'
        },
        en: {
            'page-title-home': 'MineCart - Homepage',
            'page-title-products': 'MineCart - All Products',
            'hero-title': 'This Season\'s Newest Collection',
            'hero-subtitle': 'Find your best style with high-quality selected products.',
            'hero-cta': 'Shop All Products',
            'featured-title': 'Recommended Products',
            'see-more-btn': 'See More',
            'buy-button': 'Add to Cart',
            'loading-text': 'Loading products...',
            'page-title': 'Cool Store',
            'follow-us-title': 'Follow Us On',
            'about-us-title': 'About Us',
            'help-title': 'Help',
            'page-title-about': 'MineCart - About Us',
            'page-title-cart': 'MineCart - Shopping Cart',
            'page-title-login': 'MineCart - Login',
            'login-header': 'login to your account',
            'page-title-register': 'MineCart - Register',
            'register-header': 'Create a New Account',
            'login': 'Login',
            'register': 'Register',
            'search-title': 'Search in MineCart...',
            'categories-title': 'Categories',
            'cart-title': 'Shopping Cart',
            'home-title': 'Home Page',
            'all-products-title': 'All Products',
            'page-title-help': 'MineCart - Help',
            'search-btn-title': 'Search',
            'cart-link-title': 'View Shopping Cart',
            'theme-toggle-title': 'Change Theme',
            'error-load-products': 'Failed to load products. Please try again later.',
            'page-title-search': 'Results for',
            'search-results-for': 'Search Results for',
            'my-account': 'My Account',
            'logout': 'Logout',
            'select-lang': 'Change Language',
            'search-btn': 'Search',
            'theme-toggle-btn': 'Change Theme',
            'categories': {
                'Semua': 'All',
                'Pakaian': 'Apparel',
                'Elektronik': 'Electronics',
                'Aksesoris': 'Accessories',
                'Buku': 'Books',
                'Kecantikan': 'Beauty',
                'Olahraga': 'Sports',
                'Rumah & Dapur': 'Home & Kitchen'
            },
            'summary-title': 'Order Summary',
            'summary-subtotal': 'Subtotal',
            'summary-tax': 'Tax (11%)',
            'summary-total': 'Total',
            'remove-item': 'Remove',
            'help-q1': 'How do I order a product?',
            'help-a1': 'You can order a product by pressing the "Add to Cart" button, then proceed to the cart page to complete the checkout process.',
            'help-q2': 'What payment methods are accepted?',
            'help-a2': 'Currently, this project is a front-end simulation and does not process real payments. All checkout features are for demonstration purposes only.',
            'help-q3': 'How long is the shipping time?',
            'help-a3': 'Since this is a simulation website, no physical shipping occurs. However, we ensure your virtual shopping experience is as fast as possible!',
            'help-q4': 'How do I return a product?',
            'help-a4': 'The product return process is currently unavailable as this website is a project simulation. However, we always ensure the product data displayed is accurate.',
            'help-q5': 'Are all products ready stock?',
            'help-a5': 'Yes, all products displayed on this website are considered ready stock. The stock quantity shown on each product page is a simulation number and will decrease with each purchase transaction.',
            'help-q6': 'How do I change my account details?',
            'help-a6': 'Features to change account details like password or address will be available on the "My Account" page, which is currently under development for this project.',
            'help-q7': 'What is the shipping range of MineCart?',
            'help-a7': 'Our shipping range is as vast as your imagination! As a simulation platform, we can "ship" to any location in the virtual world. No shipping fees will be charged.',
            'help-q8': 'What if I need further assistance?',
            'help-a8': 'If your question is not answered here, feel free to visit the "About Us" page to learn more about this project or contact us via the social media listed at the top of the page.',
            'help-q9': 'Why is there a dark/light theme feature?',
            'help-a9': 'We provide a dark and light theme feature to offer maximum visual comfort for you. This feature is built using CSS Variables and JavaScript to demonstrate one of the mandatory components of this project.',
            'footer-title': '© 2025 MineCart. Created by Pangeran Valerensco Rivaldi Hutabarat. All rights reserved.'
        }
    };


    // =================================================================================
    // == FEATURE: AUTHENTICATION & ACCOUNT MENU
    // =================================================================================

    /**
     * Checks if the user is logged in by checking localStorage.
     * @returns {{isLoggedIn: boolean, username: string}}
     */
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const username = localStorage.getItem('username') || 'Pengguna';
        return { isLoggedIn, username };
    }

    /**
     * Updates the account menu based on the user's login status.
     */
    function updateAccountMenu() {
        if (!accountMenu) return;

        // Clear the menu correctly
        while (accountMenu.firstChild) {
            accountMenu.removeChild(accountMenu.firstChild);
        }

        const { isLoggedIn, username } = checkLoginStatus();

        if (isLoggedIn) {
            // --- View if user is logged in (With Dropdown) ---
            const userProfileButton = document.createElement('button');
            userProfileButton.className = 'user-profile';
            userProfileButton.setAttribute('aria-haspopup', 'true');
            userProfileButton.setAttribute('aria-expanded', 'false');
            const userIcon = document.createElement('img');
            userIcon.src = '/assets/logo-akun-terang.png';
            userIcon.alt = 'Akun';
            userIcon.className = 'profile-icon';
            const userNameSpan = document.createElement('span');
            userNameSpan.textContent = username;
            userProfileButton.appendChild(userIcon);
            userProfileButton.appendChild(userNameSpan);

            const dropdownContent = document.createElement('div');
            dropdownContent.className = 'dropdown-content';
            dropdownContent.id = 'user-dropdown';

            const myAccountLink = document.createElement('a');
            myAccountLink.href = 'account.html';
            myAccountLink.dataset.translateKey = 'my-account';

            const logoutButton = document.createElement('button');
            logoutButton.id = 'logout-btn';
            logoutButton.dataset.translateKey = 'logout';

            dropdownContent.appendChild(myAccountLink);
            dropdownContent.appendChild(logoutButton);

            accountMenu.appendChild(userProfileButton);
            accountMenu.appendChild(dropdownContent);

            translateUI(currentLang); // Translate text immediately upon menu creation

            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                window.location.reload();
            });

            userProfileButton.addEventListener('click', (event) => {
                event.stopPropagation();
                dropdownContent.classList.toggle('show');
                const isExpanded = dropdownContent.classList.contains('show');
                userProfileButton.setAttribute('aria-expanded', isExpanded);
            });

        } else {
            // --- View if user is not logged in ---
            const loginLink = document.createElement('a');
            loginLink.href = '/html/login.html';
            loginLink.className = 'btn btn-secondary';
            loginLink.dataset.translateKey = 'login';

            const registerLink = document.createElement('a');
            registerLink.href = '/html/register.html';
            registerLink.className = 'btn btn-primary';
            registerLink.dataset.translateKey = 'register';

            accountMenu.appendChild(loginLink);
            accountMenu.appendChild(registerLink);

            accountMenu.style.display = 'flex';
            accountMenu.style.gap = '10px';

            translateUI(currentLang);
        }
    }


    // =================================================================================
    // == FEATURE: DARK/LIGHT THEME
    // =================================================================================

    const sunIconPath = '/assets/logo-terang.png';
    const moonIconPath = '/assets/logo-gelap.png';
    const cartLightPath = '/assets/logo-keranjang-gelap.png'; // for light theme (default)
    const cartDarkPath = '/assets/logo-keranjang-terang.png'; // for dark theme

    /**
     * Applies the specified theme (dark or light) to the page.
     * @param {string} theme - The theme to apply ('dark' or 'light').
     */
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            if (themeIcon) themeIcon.src = sunIconPath;
            if (cartIcon) cartIcon.src = cartDarkPath;
        } else {
            body.classList.remove('dark-mode');
            if (cartIcon) cartIcon.src = cartLightPath;
            if (themeIcon) themeIcon.src = moonIconPath;
        }
    }


    // =================================================================================
    // == FEATURE: LANGUAGE SWITCHER
    // =================================================================================
    // script.js

    /**
     * Translates the UI elements based on the selected language.
     * @param {string} lang - The language code ('id' or 'en').
     */
    function translateUI(lang) {
        // --- AWAL PERUBAHAN LOGIKA JUDUL ---

        // Tentukan kunci judul berdasarkan elemen unik di setiap halaman
        let titleKey = 'page-title-home'; // Default untuk Beranda

        if (document.getElementById('all-products-grid')) {
            // Cek jika ini halaman Semua Produk
            titleKey = 'page-title-products';
        } else if (document.querySelector('.faq-container')) {
            // Cek jika ini halaman Bantuan (yang memiliki kontainer FAQ)
            titleKey = 'page-title-help';
        } else if (document.querySelector('.about-layout')) {
            // Cek jika ini halaman Tentang Kami
            titleKey = 'page-title-about';
        } else if (document.getElementById('cart-items-container')) {
            // Cek jika ini halaman Keranjang
            titleKey = 'page-title-cart';
        } else if (document.getElementById('login-form')) {
            // Cek jika ini halaman Masuk
            titleKey = 'page-title-login';
        } else if (document.getElementById('register-form')) {
            // Cek jika ini halaman Daftar
            titleKey = 'page-title-register';
        } else if (document.getElementById('search-query-display')) {
            titleKey = 'head-title-search';
        }

        if (document.getElementById('search-results-grid')) {
            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('q');
            const titlePrefix = translations[lang]['page-title-search'] || 'Hasil untuk';
            document.title = `${titlePrefix} "${query}" - MineCart`;
        } else {
            // Atur judul untuk semua halaman statis lainnya
            document.title = translations[lang][titleKey];
        }

        // Terapkan judul yang sesuai
        if (translations[lang] && translations[lang][titleKey]) {
            document.title = translations[lang][titleKey];
        }


        // Translate Product Detail Page Title & Description
        if (document.getElementById('product-images')) {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
            if (productId && allProductsData.length > 0) {
                const product = allProductsData.find(p => p.id == productId);
                if (product) {
                    if (lang === 'en') {
                        document.title = `${product.titleEn} - MineCart`;
                        document.getElementById('product-title').textContent = product.titleEn;
                        document.getElementById('product-description').textContent = product.descriptionEn;
                    } else {
                        document.title = `${product.titleId} - MineCart`;
                        document.getElementById('product-title').textContent = product.titleId;
                        document.getElementById('product-description').textContent = product.descriptionId;
                    }
                }
            }
        }

        // Translate Category Filter Buttons
        document.querySelectorAll('#category-filters button').forEach(button => {
            const categoryKey = button.dataset.category;
            if (translations[lang]?.categories?.[categoryKey]) {
                button.textContent = translations[lang].categories[categoryKey];
            }
        });

        // Translate all other elements with data-translate-key
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey;
            if (translations[lang] && translations[lang][key]) {
                const translatedText = translations[lang][key];
                if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                    el.placeholder = translatedText;
                } else if (el.hasAttribute('title')) {
                    el.title = translatedText;
                } else {
                    el.textContent = translatedText;
                }
            }
        });

        document.querySelectorAll('.cart-item').forEach(item => {
            const titleEl = item.querySelector('h3');
            if (titleEl) {
                titleEl.textContent = lang === 'id' ? titleEl.dataset.titleId : titleEl.dataset.titleEn;
            }
        });

        // Translate Dynamic Product Content
        document.querySelectorAll('.product-card').forEach(card => {
            const titleEl = card.querySelector('h3');
            const descEl = card.querySelector('.description');

            if (lang === 'id') {
                titleEl.textContent = titleEl.dataset.titleId;
                descEl.textContent = descEl.dataset.descriptionId;
            } else {
                titleEl.textContent = titleEl.dataset.titleEn;
                descEl.textContent = descEl.dataset.descriptionEn;
            }
        });
    }

    // =================================================================================
    // == FEATURE: PRODUCT DISPLAY & MANAGEMENT
    // =================================================================================

    /**
     * Creates and returns a single product card HTML element.
     * @param {object} product - A single product object from the API data.
     * @returns {HTMLElement} The product card link element.
     */
    function createProductCard(product) {
        const cardLink = document.createElement('a');
        cardLink.className = 'product-card-link';

        const isIndexPage = window.location.pathname.endsWith('/index.html') || window.location.pathname === '/';
        cardLink.href = isIndexPage ? `html/detail.html?id=${product.id}` : `detail.html?id=${product.id}`;

        const card = document.createElement('div');
        card.className = 'product-card';

        const image = document.createElement('img');
        image.src = product.images[0];
        image.alt = product.titleId;

        const cardBody = document.createElement('div');
        cardBody.className = 'product-card-body';
        const title = document.createElement('h3');
        title.dataset.titleId = product.titleId;
        title.dataset.titleEn = product.titleEn;
        const description = document.createElement('p');
        description.className = 'description';
        description.dataset.descriptionId = product.descriptionId;
        description.dataset.descriptionEn = product.descriptionEn;

        const cardFooter = document.createElement('div');
        cardFooter.className = 'product-card-footer';
        const price = document.createElement('span');
        price.className = 'price';
        price.textContent = `Rp ${parseInt(product.price).toLocaleString('id-ID')}`;
        const buyButton = document.createElement('button');
        buyButton.className = 'buy-btn';
        buyButton.dataset.translateKey = 'buy-button';
        buyButton.dataset.productId = product.id;

        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardFooter.appendChild(price);
        cardFooter.appendChild(buyButton);
        card.appendChild(image);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);

        cardLink.appendChild(card);
        return cardLink;
    }

    /**
     * Fetches and displays recommended products on the homepage.
     */
    async function displayFeaturedProducts() {
        if (!productGrid) return;

        productGrid.innerHTML = '';
        const loadingElement = document.createElement('p');
        loadingElement.dataset.translateKey = 'loading-text';
        productGrid.appendChild(loadingElement);
        translateUI(currentLang);

        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`API fetch failed with status: ${response.status}`);
            }

            allProductsData = await response.json();
            const recommendedProducts = allProductsData.filter(p => p.isRecommended === true);

            productGrid.innerHTML = '';
            recommendedProducts.forEach(product => {
                const cardElement = createProductCard(product);
                productGrid.appendChild(cardElement);
            });
            translateUI(currentLang);

        } catch (error) {
            console.error('Failed to load products:', error);
            productGrid.innerHTML = '';
            const errorElement = document.createElement('p');
            errorElement.dataset.translateKey = 'error-load-products';
            productGrid.appendChild(errorElement);
            translateUI(currentLang);
        }
    }

    /**
     * Fetches and displays all products on the products page.
     */
    async function displayAllProducts() {
        const allProductsGrid = document.getElementById('all-products-grid');
        const categoryFiltersContainer = document.getElementById('category-filters');
        if (!allProductsGrid || !categoryFiltersContainer) return;

        allProductsGrid.innerHTML = '';
        const loadingEl = document.createElement('p');
        loadingEl.dataset.translateKey = 'loading-text';
        allProductsGrid.appendChild(loadingEl);
        translateUI(currentLang);

        try {
            if (allProductsData.length === 0) {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('API fetch failed');
                allProductsData = await response.json();
            }

            const categories = ['Semua', ...new Set(allProductsData.map(p => p.category))];
            categoryFiltersContainer.innerHTML = '';
            categories.forEach(category => {
                const button = document.createElement('button');
                button.textContent = category;
                button.dataset.category = category;
                if (category === 'Semua') button.classList.add('active');
                categoryFiltersContainer.appendChild(button);
                button.dataset.translateKey = `categories.${category}`;
                // categoryFiltersContainer.appendChild(button);
            });

            const renderProducts = (products) => {
                allProductsGrid.innerHTML = '';
                if (products.length === 0) {
                    const noProductEl = document.createElement('p');
                    noProductEl.textContent = 'Tidak ada produk dalam kategori ini.';
                    allProductsGrid.appendChild(noProductEl);
                    return;
                }
                products.forEach(product => {
                    const cardElement = createProductCard(product);
                    allProductsGrid.appendChild(cardElement);
                });
                translateUI(currentLang);
            };

            // const categoryFiltersContainer = document.getElementById('category-filters');
            if (categoryFiltersContainer) {
                categoryFiltersContainer.addEventListener('click', (e) => {
                    if (e.target.tagName === 'BUTTON') {
                        categoryFiltersContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                        e.target.classList.add('active');
                        const selectedCategory = e.target.dataset.category;
                        const filteredProducts = selectedCategory === 'Semua' ? allProductsData : allProductsData.filter(p => p.category === selectedCategory);
                        renderProducts(filteredProducts);
                    }
                });
            }


            renderProducts(allProductsData);

        } catch (error) {
            console.error('Failed to load products:', error);
            allProductsGrid.innerHTML = '';
            const errorEl = document.createElement('p');
            errorEl.textContent = 'Gagal memuat produk.';
            allProductsGrid.appendChild(errorEl);
        }
    }

    /**
     * Fetches and displays the details of a single product.
     */
    async function displayProductDetail() {
        const productImagesContainer = document.getElementById('product-images');
        if (!productImagesContainer) return;

        try {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
            if (!productId) throw new Error("Product ID not found in URL");

            if (allProductsData.length === 0) {
                const response = await fetch(API_URL);
                allProductsData = await response.json();
            }

            const product = allProductsData.find(p => p.id == productId);
            if (!product) throw new Error("Product not found");

            document.getElementById('add-to-cart-btn').dataset.productId = product.id;

            // Populate product details
            document.getElementById('product-category').textContent = product.category;
            document.getElementById('product-price').textContent = `Rp ${parseInt(product.price).toLocaleString('id-ID')}`;
            document.getElementById('product-stock').textContent = `Stok: ${product.stock}`;

            // Translate title and description
            if (currentLang === 'en') {
                document.title = `${product.titleEn} - MineCart`;
                document.getElementById('product-title').textContent = product.titleEn;
                document.getElementById('product-description').textContent = product.descriptionEn;
            } else {
                document.title = `${product.titleId} - MineCart`;
                document.getElementById('product-title').textContent = product.titleId;
                document.getElementById('product-description').textContent = product.descriptionId;
            }

            // Populate image gallery
            productImagesContainer.innerHTML = '';
            const mainImage = document.createElement('img');
            mainImage.src = product.images[0];
            mainImage.alt = product.titleId;

            const thumbnailContainer = document.createElement('div');
            thumbnailContainer.className = 'thumbnails';

            product.images.forEach((imageUrl, index) => {
                const thumb = document.createElement('img');
                thumb.src = imageUrl;
                thumb.alt = `${product.titleId} - Gambar ${index + 1}`;
                if (index === 0) thumb.classList.add('active');

                thumb.addEventListener('click', () => {
                    mainImage.src = thumb.src;
                    thumbnailContainer.querySelectorAll('img').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                });
                thumbnailContainer.appendChild(thumb);
            });

            productImagesContainer.appendChild(mainImage);
            productImagesContainer.appendChild(thumbnailContainer);

        } catch (error) {
            console.error("Failed to display product detail:", error);
            const layout = document.querySelector('.product-detail-layout');
            if (layout) {
                layout.innerHTML = '';
                const errorEl = document.createElement('p');
                errorEl.textContent = `Gagal memuat produk. ${error.message}`;
                layout.appendChild(errorEl);
            }
        }
    }


    /**
 * Fetches, filters, and displays search results on the search page.
 */
    async function displaySearchResults() {
        const searchResultsGrid = document.getElementById('search-results-grid');
        const queryDisplay = document.getElementById('search-query-display');

        // Penjaga: Hanya berjalan di halaman search.html
        if (!searchResultsGrid || !queryDisplay) return;

        try {
            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('q');

            // Jika tidak ada query di URL, tampilkan pesan
            if (!query) {
                searchResultsGrid.innerHTML = '<p>Silakan masukkan kata kunci pencarian.</p>';
                queryDisplay.textContent = '...';
                return;
            }

            // Tampilkan query pencarian di judul halaman
            // Mengambil 'Hasil untuk' atau 'Results for' dari kamus
            const titlePrefix = translations[currentLang]['page-title-search'];

            queryDisplay.textContent = query;
            document.title = `${titlePrefix} "${query}" - MineCart`;

            // Tampilkan pesan loading
            searchResultsGrid.innerHTML = '<p data-translate-key="loading-text">Memuat produk...</p>';
            translateUI(currentLang);

            // Ambil data produk jika belum ada
            if (allProductsData.length === 0) {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('API fetch failed');
                allProductsData = await response.json();
            }

            const lowerCaseQuery = query.toLowerCase();
            const results = allProductsData.filter(product =>
                // Menambahkan pengecekan (product.titleId && ...) agar lebih aman
                (product.titleId && product.titleId.toLowerCase().includes(lowerCaseQuery)) ||
                (product.titleEn && product.titleEn.toLowerCase().includes(lowerCaseQuery)) ||
                (product.descriptionId && product.descriptionId.toLowerCase().includes(lowerCaseQuery)) ||
                (product.descriptionEn && product.descriptionEn.toLowerCase().includes(lowerCaseQuery)) ||
                (product.category && product.category.toLowerCase().includes(lowerCaseQuery))
            );

            // Kosongkan grid sebelum menampilkan hasil
            searchResultsGrid.innerHTML = '';

            if (results.length > 0) {
                results.forEach(product => {
                    const cardElement = createProductCard(product);
                    searchResultsGrid.appendChild(cardElement);
                });
            } else {
                // Jika tidak ada hasil
                searchResultsGrid.innerHTML = `<p>Tidak ada produk yang cocok dengan pencarian "${query}".</p>`;
            }

            // Terjemahkan kartu produk yang baru dibuat
            translateUI(currentLang);

        } catch (error) {
            console.error('Failed to display search results:', error);
            searchResultsGrid.innerHTML = '<p>Terjadi kesalahan saat memuat hasil pencarian.</p>';
        }
    }

    // =================================================================================
    // == FEATURE: SHOPPING CART
    // =================================================================================

    /**
     * Adds a product to the cart or increments its quantity if it already exists.
     * @param {string} productId - The ID of the product to add.
     */
    function addToCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Produk berhasil ditambahkan ke keranjang!');
        console.log('Isi keranjang saat ini:', cart);

        updateCartCounter();
    }

    /**
     * Updates the cart counter icon in the header.
     */
    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const counterElement = document.getElementById('cart-counter');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        if (counterElement) {
            if (totalItems > 0) {
                counterElement.textContent = totalItems;
                counterElement.classList.add('visible');
            } else {
                counterElement.classList.remove('visible');
            }
        }
    }


    // =================================================================================
    // == UI COMPONENTS & WIDGETS (Carousel, Menus)
    // =================================================================================

    /**
     * Initializes the hero carousel functionality.
     */
    function initializeCarousel() {
        if (!carouselContainer || !prevBtn || !nextBtn || !heroSection) return;

        const slides = document.querySelectorAll('.carousel-slide');
        const slideCount = slides.length;
        let currentIndex = 0;
        let slideInterval;

        function goToSlide(index) {
            const transformValue = -index * (100 / slideCount);
            carouselContainer.style.transform = `translateX(${transformValue}%)`;
            currentIndex = index;
        }

        function nextSlide() {
            let nextIndex = (currentIndex + 1) % slideCount;
            goToSlide(nextIndex);
        }

        function prevSlide() {
            let prevIndex = (currentIndex - 1 + slideCount) % slideCount;
            goToSlide(prevIndex);
        }

        function startSlideShow() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }

        function stopSlideShow() {
            clearInterval(slideInterval);
        }

        nextBtn.addEventListener('click', () => {
            nextSlide();
            startSlideShow();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            startSlideShow();
        });

        heroSection.addEventListener('mouseenter', stopSlideShow);
        heroSection.addEventListener('mouseleave', startSlideShow);

        startSlideShow();
    }

    // LETAKKAN INI BERSAMA FUNGSI SPESIFIK HALAMAN LAINNYA

    /**
     * Mengubah kuantitas item di keranjang
     * @param {string} productId - ID produk yang akan diubah
     * @param {number} change - Jumlah perubahan (+1 atau -1)
     */
    function updateCartQuantity(productId, change) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productIndex = cart.findIndex(item => item.id === productId);

        if (productIndex > -1) {
            cart[productIndex].quantity += change;
            if (cart[productIndex].quantity <= 0) {
                // Jika kuantitas 0 atau kurang, hapus item
                cart.splice(productIndex, 1);
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart(); // Render ulang tampilan keranjang
        updateCartCounter(); // Perbarui counter di header
    }

    /**
     * Menghapus item dari keranjang
     * @param {string} productId - ID produk yang akan dihapus
     */
    function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.filter(item => item.id !== productId);

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        displayCart(); // Render ulang tampilan keranjang
        updateCartCounter(); // Perbarui counter di header
    }

    /**
     * Fungsi utama untuk menampilkan halaman keranjang (cart.html)
     */
    async function displayCart() {
        const cartItemsContainer = document.getElementById('cart-items-container');
        const cartSummaryContainer = document.getElementById('cart-summary');

        // Penjaga: Hanya berjalan jika berada di halaman cart.html
        if (!cartItemsContainer || !cartSummaryContainer) return;

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Keranjang Anda kosong.</p>';
            cartSummaryContainer.style.display = 'none';
            return;
        }

        try {
            if (allProductsData.length === 0) {
                const response = await fetch(API_URL);
                allProductsData = await response.json();
            }

            cartItemsContainer.innerHTML = '';
            let subtotal = 0;

            cart.forEach(cartItem => {
                const productDetail = allProductsData.find(p => p.id == cartItem.id);
                if (productDetail) {
                    // Membuat elemen dengan createElement
                    const itemElement = document.createElement('div');
                    itemElement.className = 'cart-item';

                    const image = document.createElement('img');
                    image.src = productDetail.images[0];
                    image.alt = productDetail.titleId;

                    const infoDiv = document.createElement('div');
                    infoDiv.className = 'cart-item-info';

                    const title = document.createElement('h3');
                    title.dataset.titleId = productDetail.titleId;
                    title.dataset.titleEn = productDetail.titleEn;
                    title.textContent = currentLang === 'id' ? productDetail.titleId : productDetail.titleEn;

                    const price = document.createElement('p');
                    price.className = 'price';
                    price.textContent = `Rp ${parseInt(productDetail.price).toLocaleString('id-ID')}`;

                    infoDiv.appendChild(title);
                    infoDiv.appendChild(price);

                    const actionsDiv = document.createElement('div');
                    actionsDiv.className = 'cart-item-actions';

                    const quantityDiv = document.createElement('div');
                    quantityDiv.className = 'quantity-controls';

                    const minusBtn = document.createElement('button');
                    minusBtn.textContent = '-';
                    minusBtn.onclick = () => updateCartQuantity(cartItem.id, -1);

                    const quantitySpan = document.createElement('span');
                    quantitySpan.textContent = cartItem.quantity;

                    const plusBtn = document.createElement('button');
                    plusBtn.textContent = '+';
                    plusBtn.onclick = () => updateCartQuantity(cartItem.id, 1);

                    quantityDiv.appendChild(minusBtn);
                    quantityDiv.appendChild(quantitySpan);
                    quantityDiv.appendChild(plusBtn);

                    const removeBtn = document.createElement('button');
                    removeBtn.className = 'remove-btn';
                    removeBtn.textContent = 'Hapus';
                    removeBtn.onclick = () => removeFromCart(cartItem.id);

                    actionsDiv.appendChild(quantityDiv);
                    actionsDiv.appendChild(removeBtn);

                    itemElement.appendChild(image);
                    itemElement.appendChild(infoDiv);
                    itemElement.appendChild(actionsDiv);

                    cartItemsContainer.appendChild(itemElement);

                    subtotal += productDetail.price * cartItem.quantity;
                }
            });

            // Tampilkan ringkasan belanja
            // Tampilkan ringkasan belanja
            cartSummaryContainer.style.display = 'block';
            cartSummaryContainer.innerHTML = `
    <h2 data-translate-key="summary-title">${translations[currentLang]['summary-title']}</h2>
    <p><span data-translate-key="summary-subtotal">${translations[currentLang]['summary-subtotal']}</span> <span>Rp ${subtotal.toLocaleString('id-ID')}</span></p>
    <p><span data-translate-key="summary-tax">${translations[currentLang]['summary-tax']}</span> <span>Rp ${Math.round(subtotal * 0.11).toLocaleString('id-ID')}</span></p>
    <hr>
    <p class="total"><span data-translate-key="summary-total">${translations[currentLang]['summary-total']}</span> <span>Rp ${Math.round(subtotal * 1.11).toLocaleString('id-ID')}</span></p>
`;

            // Dan juga bagian tombol hapus di dalam loop
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = translations[currentLang]['remove-item']; // <-- Diubah menjadi ini
            removeBtn.dataset.translateKey = 'remove-item';
            removeBtn.onclick = () => removeFromCart(cartItem.id);

        } catch (error) {
            console.error("Gagal memuat data keranjang:", error);
            cartItemsContainer.innerHTML = '<p>Gagal memuat keranjang. Coba lagi.</p>';
        }
    }

    /**
     * Initializes the custom language dropdown functionality.
     */
    function initializeLanguageDropdown() {
        if (!customSelect) return;

        const selectButton = customSelect.querySelector('.select-button');
        const dropdown = customSelect.querySelector('.select-dropdown');
        const selectedLangText = document.getElementById('selected-lang-text');

        selectButton.addEventListener('click', () => {
            dropdown.classList.toggle('show');
            const isExpanded = dropdown.classList.contains('show');
            selectButton.setAttribute('aria-expanded', isExpanded);
        });

        dropdown.addEventListener('click', (e) => {
            if (e.target.tagName === 'LI') {
                const selectedValue = e.target.dataset.value;
                const selectedText = e.target.textContent;

                selectedLangText.textContent = selectedText;
                currentLang = selectedValue;
                localStorage.setItem('userLanguage', currentLang);
                translateUI(currentLang);

                dropdown.classList.remove('show');
                selectButton.setAttribute('aria-expanded', 'false');
            }
        });

        window.addEventListener('click', (e) => {
            if (!customSelect.contains(e.target)) {
                dropdown.classList.remove('show');
                selectButton.setAttribute('aria-expanded', 'false');
            }
        });

        selectedLangText.textContent = (currentLang === 'en') ? 'English' : 'Bahasa Indonesia';
    }

    /**
     * Initializes the hamburger menu for mobile navigation.
     */
    function initializeHamburgerMenu() {
        if (hamburgerBtn && mainNav) {
            hamburgerBtn.addEventListener('click', () => {
                mainNav.classList.toggle('is-active');
            });
        }
    }

    // Tambahkan fungsi ini di script.js
    function initFaqAccordion() {
        const faqContainer = document.querySelector('.faq-container');
        if (!faqContainer) return; // Penjaga agar hanya berjalan di halaman bantuan

        faqContainer.addEventListener('click', e => {
            if (e.target.classList.contains('faq-question')) {
                const question = e.target;
                const answer = question.nextElementSibling;

                question.classList.toggle('active');

                if (question.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '0px';
                }
            }
        });
    }

    // =================================================================================
    // == INITIALIZATION & GLOBAL EVENT LISTENERS
    // =================================================================================

    // 1. Apply saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // 2. Set up UI components
    updateAccountMenu();
    updateCartCounter();
    initializeCarousel();
    initializeLanguageDropdown();
    initializeHamburgerMenu();

    // 3. Display products based on the current page
    displayFeaturedProducts(); // For homepage
    displayAllProducts();      // For all-products page
    displayProductDetail();    // For product detail page
    displayCart();
    initFaqAccordion();
    displaySearchResults();

    // 4. Setup global event listeners
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('buy-btn') || e.target.id === 'add-to-cart-btn') {
            const productId = e.target.dataset.productId;
            if (productId) {
                addToCart(productId);
            }
        }
    });

    window.addEventListener('click', (event) => {
        // Close account dropdown if clicking outside
        if (!event.target.closest('#account-menu')) {
            const dropdowns = document.querySelectorAll('.dropdown-content.show');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
                const button = dropdown.previousElementSibling;
                if (button) {
                    button.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });

});