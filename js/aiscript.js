// script.js

// =================================================================================
// == EVENT LISTENER: DOM CONTENT LOADED
// =================================================================================
document.addEventListener('DOMContentLoaded', () => {

    // --- GLOBAL CONFIGURATION & VARIABLES ---
    const API_URL = 'https://my-api-theta-three.vercel.app/pangeran/api';
    let allProductsData = [];
    let currentLang = localStorage.getItem('userLanguage') || 'id'; // Default to Indonesian

    const body = document.body;
    const accountMenu = document.getElementById('account-menu');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const cartIcon = document.getElementById('cart-icon-img');

    // --- DOM ELEMENTS (untuk halaman index) ---
    const productGrid = document.querySelector('.featured-products .product-grid');
    const heroSection = document.querySelector('.hero');
    const carouselContainer = document.querySelector('.carousel-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mainNav = document.querySelector('.header-main-nav');
    const customSelect = document.querySelector('.custom-select');

    // --- SIMULASI DATA ONGKIR ---
    const shippingCostsData = {
        'bandung': { baseCost: 9000, interProvincialCost: 30000, province: 'Jawa Barat' },
        'jakarta': { baseCost: 10000, interProvincialCost: 35000, province: 'DKI Jakarta' },
        'bogor': { baseCost: 9500, interProvincialCost: 32000, province: 'Jawa Barat' },
        'depok': { baseCost: 9500, interProvincialCost: 32000, province: 'Jawa Barat' },
        'surabaya': { baseCost: 11000, interProvincialCost: 40000, province: 'Jawa Timur' },
        'yogyakarta': { baseCost: 12000, interProvincialCost: 42000, province: 'DIY' },
        'sleman': { baseCost: 12000, interProvincialCost: 42000, province: 'DIY' },
        'medan': { baseCost: 15000, interProvincialCost: 50000, province: 'Sumatera Utara' },
        'tangerang': { baseCost: 10500, interProvincialCost: 36000, province: 'Banten' },
        'kuta': { baseCost: 13000, interProvincialCost: 45000, province: 'Bali' },
        'denpasar': { baseCost: 13000, interProvincialCost: 45000, province: 'Bali' },
        'semarang': { baseCost: 12500, interProvincialCost: 43000, province: 'Jawa Tengah' },
        'malang': { baseCost: 11500, interProvincialCost: 41000, province: 'Jawa Timur' },
        'garut': { baseCost: 9500, interProvincialCost: 31000, province: 'Jawa Barat' },
        'makassar': { baseCost: 18000, interProvincialCost: 60000, province: 'Sulawesi Selatan' },
        'jepara': { baseCost: 12500, interProvincialCost: 43000, province: 'Jawa Tengah' },
        'palembang': { baseCost: 16000, interProvincialCost: 55000, province: 'Sumatera Selatan' },
    };

    // --- SIMULASI DATA WAKTU PENGIRIMAN ---
    const shippingTimesData = {
        'intraCity': [1, 2],
        'intraProvince': [2, 4],
        'interProvince': [3, 7]
    };

    // --- STATIC UI TRANSLATION DICTIONARY ---
    const translations = {
        id: {
            'page-title-home': 'MineCart - Beranda',
            'page-title-products': 'MineCart - Semua Produk',
            'hero-title': 'Koleksi Terbaru Musim Ini',
            'hero-subtitle': 'Temukan gaya terbaik Anda dengan produk pilihan berkualitas tinggi.',
            'hero-cta': 'Lihat Semua Produk',
            'featured-title': 'Produk Rekomendasi',
            'recommended-title': 'Rekomendasi',
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
            'page-title-register': 'MineCart - Daftar',
            'register-header': 'Buat Akun Baru',
            'search-btn-title': 'Cari',
            'cart-link-title': 'Lihat Keranjang Belanja',
            'theme-toggle-title': 'Ubah Tema',
            'error-load-products': 'Gagal memuat produk. Silakan coba lagi nanti.',
            'page-title-search': 'Hasil untuk',
            'search-results-for': 'Hasil Pencarian untuk',
            'no-search-results': 'Tidak ada produk yang cocok dengan pencarian',
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
            'summary-total': 'Total',
            'remove-item': 'Hapus',
            'product-location-title': 'Lokasi Produk:',
            'not-available': 'Tidak tersedia',
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
            'login-title': 'Masuk ke Akun Anda',
            'register-title': 'Daftar Akun Baru',
            'label-username': 'Nama Pengguna',
            'label-email': 'Email',
            'label-password': 'Kata Sandi',
            'label-dob': 'Tanggal Lahir',
            'label-gender': 'Jenis Kelamin',
            'gender-male': 'Pria',
            'gender-female': 'Wanita',
            'btn-login': 'Masuk',
            'btn-register': 'Daftar',
            'auth-switch-text-login': 'Sudah punya akun? ',
            'auth-switch-link-login': 'Masuk di sini',
            'auth-switch-text-register': 'Belum punya akun? ',
            'auth-switch-link-register': 'Daftar di sini',
            'toast-add-success': 'Produk berhasil ditambahkan ke keranjang!',
            'toast-register-success': 'Pendaftaran berhasil! Silakan masuk.',
            'toast-login-success': 'Selamat datang, {{username}}!',
            'toast-login-error': 'Nama pengguna atau password salah!',
            'toast-fill-all-fields': 'Semua field wajib diisi!',
            'toast-account-not-found': 'Akun tidak ditemukan. Silakan daftar.',
            'validation-required': 'Kolom ini wajib diisi.',
            'validation-password-short': 'Password minimal 6 karakter.',
            'toast-email-exists': 'Email ini sudah terdaftar. Silakan gunakan email lain.',
            'toast-must-login': 'Anda harus masuk untuk menambahkan barang!',
            'select-all': 'Pilih Semua',
            'summary-title': 'Ringkasan Belanja',
            'summary-subtotal': 'Subtotal',
            'summary-shipping': 'Ongkir',
            'summary-total': 'Total',
            'summary-checkout-btn': 'Checkout',
            'summary-empty-cart': 'Pilih barang untuk dihitung.',
            'summary-items': 'barang',
            'cart-must-login': 'Anda harus masuk untuk melihat keranjang.',
            'toast-remove-item': 'Produk berhasil dihapus dari keranjang.',
            'empty-cart-message': 'Keranjang Anda kosong.',
            'page-title-account': 'MineCart - Akun Saya',
            'account-info': 'Informasi Akun',
            'address-info': 'Informasi Alamat',
            'label-fullname': 'Nama Lengkap',
            'label-address': 'Alamat Lengkap',
            'label-city': 'Kota',
            'label-postalcode': 'Kode Pos',
            'label-phone': 'Nomor Telepon',
            'edit-address-btn': 'Edit Alamat',
            'edit-address-title': 'Edit Alamat',
            'save-address-btn': 'Simpan Alamat',
            'cancel-btn': 'Batal',
            'toast-address-saved': 'Alamat berhasil disimpan!',
            'toast-address-error': 'Gagal menyimpan alamat. Mohon isi semua field.',
            'not-filled': 'Belum diisi',
            'shipping-address-missing': 'Silakan lengkapi alamat di halaman akun untuk menghitung ongkir.',
            'page-title-checkout': 'MineCart - Checkout',
            'checkout-title': 'Checkout Pesanan',
            'order-summary-title': 'Ringkasan Belanja Anda',
            'shipping-info-title': 'Informasi Pengiriman',
            'change-address-btn': 'Ubah Alamat',
            'payment-method-title': 'Metode Pembayaran',
            'courier-note-title': 'Catatan untuk Kurir (Opsional)',
            'courier-note-label': 'Catatan untuk Kurir',
            'courier-note-placeholder': 'Contoh: Titip ke satpam jika tidak ada orang di rumah.',
            'place-order-btn': 'Selesaikan Pembayaran',
            'toast-checkout-no-items': 'Pilih setidaknya satu barang untuk checkout.',
            'toast-checkout-no-address': 'Alamat pengiriman belum lengkap. Mohon lengkapi di halaman akun.',
            'toast-checkout-data-missing': 'Data pesanan tidak ditemukan. Kembali ke keranjang.',
            'toast-no-payment-method': 'Silakan pilih metode pembayaran.',
            'toast-order-success': 'Pesanan berhasil diproses! Terima kasih.',
            'toast-stock-issue': 'Gagal memproses pesanan: Stok produk tidak mencukupi.',
            'product-seller-title': 'Penjual:',
            'seller-name-label': 'Nama Toko:',
            'footer-title': '© 2025 MineCart. Dibuat oleh Pangeran Valerensco Rivaldi Hutabarat. Semua hak cipta dilindungi.',
            'shipping-time-label': 'Estimasi Waktu Sampai:',
            'shipping-time-days': 'hari',
            'cart-quantity': 'Jumlah:'
        },
        en: {
            'page-title-home': 'MineCart - Homepage',
            'page-title-products': 'MineCart - All Products',
            'hero-title': 'This Season\'s Newest Collection',
            'hero-subtitle': 'Find your best style with high-quality selected products.',
            'hero-cta': 'Shop All Products',
            'featured-title': 'Recommended Products',
            'recommended-title': 'Recommended',
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
            'no-search-results': 'No products found matching the search',
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
            'summary-total': 'Total',
            'summary-checkout-btn': 'Checkout',
            'summary-empty-cart': 'Select items to calculate.',
            'summary-items': 'items',
            'cart-must-login': 'You must be logged in to view the cart.',
            'toast-remove-item': 'Product successfully removed from cart.',
            'empty-cart-message': 'Your cart is empty.',
            'page-title-account': 'MineCart - My Account',
            'account-info': 'Account Information',
            'address-info': 'Address Information',
            'label-fullname': 'Full Name',
            'label-address': 'Full Address',
            'label-city': 'City',
            'label-postalcode': 'Postal Code',
            'label-phone': 'Phone Number',
            'edit-address-btn': 'Edit Address',
            'edit-address-title': 'Edit Address',
            'save-address-btn': 'Save Address',
            'cancel-btn': 'Cancel',
            'toast-address-saved': 'Address saved successfully!',
            'toast-address-error': 'Failed to save address. Please fill all fields.',
            'not-filled': 'Not Filled',
            'shipping-address-missing': 'Please complete your address in the account page to calculate shipping.',
            'page-title-checkout': 'MineCart - Checkout',
            'checkout-title': 'Order Checkout',
            'order-summary-title': 'Your Order Summary',
            'shipping-info-title': 'Shipping Information',
            'change-address-btn': 'Change Address',
            'payment-method-title': 'Payment Method',
            'courier-note-title': 'Note for Courier (Optional)',
            'courier-note-label': 'Note for Courier',
            'courier-note-placeholder': 'Example: Leave with security if no one is home.',
            'place-order-btn': 'Complete Payment',
            'toast-checkout-no-items': 'Please select at least one item to checkout.',
            'toast-checkout-no-address': 'Shipping address is incomplete. Please complete it in your account page.',
            'toast-checkout-data-missing': 'Order data not found. Returning to cart.',
            'toast-no-payment-method': 'Please select a payment method.',
            'toast-order-success': 'Order processed successfully! Thank you.',
            'toast-stock-issue': 'Failed to process order: Insufficient product stock.',
            'product-seller-title': 'Seller:',
            'seller-name-label': 'Store Name:',
            'footer-title': '© 2025 MineCart. Created by Pangeran Valerensco Rivaldi Hutabarat. All rights reserved.',
            'shipping-time-label': 'Estimated Delivery Time:',
            'shipping-time-days': 'days',
            'cart-quantity': 'Quantity:'
        }
    };

    /**
     * FUNGSI GLOBAL UTILITY UNTUK TRANSLATE
     * Translates the UI elements based on the selected language.
     * @param {string} lang - The language code ('id' or 'en').
     */
    function translateUI(lang) {
        // --- AWAL PERUBAHAN LOGIKA JUDUL ---
        let titleKey = 'page-title-home';
        if (document.getElementById('all-products-grid')) {
            titleKey = 'page-title-products';
        } else if (document.querySelector('.faq-container')) {
            titleKey = 'page-title-help';
        } else if (document.querySelector('.about-layout')) {
            titleKey = 'page-title-about';
        } else if (document.getElementById('cart-items-container')) {
            titleKey = 'page-title-cart';
        } else if (document.getElementById('login-form')) {
            titleKey = 'page-title-login';
        } else if (document.getElementById('register-form')) {
            titleKey = 'page-title-register';
        }

        if (document.getElementById('search-results-grid')) {
            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('q');
            const titlePrefix = translations[lang]['page-title-search'];
            document.title = `${titlePrefix} "${query}" - MineCart`;
        } else {
            if (translations[lang] && translations[lang][titleKey]) {
                document.title = translations[lang][titleKey];
            }
        }

        if (document.getElementById('product-images')) {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
            if (productId && allProductsData.length > 0) {
                const product = allProductsData.find(p => p.id == productId);
                if (product) {
                    if (lang === 'en') {
                        document.getElementById('product-title').textContent = product.titleEn;
                        document.getElementById('product-description').textContent = product.descriptionEn;
                    } else {
                        document.getElementById('product-title').textContent = product.titleId;
                        document.getElementById('product-description').textContent = product.descriptionId;
                    }
                    const categoryElement = document.getElementById('product-category');
                    if (categoryElement) {
                        categoryElement.textContent = translations[lang]?.categories?.[product.category] || product.category;
                    }
                }
            }
        }

        const noResultsMessage = document.getElementById('no-results-message');
        if (noResultsMessage) {
            const query = noResultsMessage.dataset.query;
            const noResultText = translations[lang]['no-search-results'] || 'Tidak ada hasil';
            noResultsMessage.textContent = `${noResultText} "${query}".`;
        }

        document.querySelectorAll('#category-filters button').forEach(button => {
            const categoryKey = button.dataset.category;
            if (translations[lang]?.categories?.[categoryKey]) {
                button.textContent = translations[lang].categories[categoryKey];
            }
        });

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

        document.querySelectorAll('.product-card').forEach(card => {
            const titleEl = card.querySelector('h3');
            const descEl = card.querySelector('.description');
            if (lang === 'id') {
                if (titleEl) titleEl.textContent = titleEl.dataset.titleId;
                if (descEl) descEl.textContent = descEl.dataset.descriptionId;
            } else {
                if (titleEl) titleEl.textContent = titleEl.dataset.titleEn;
                if (descEl) descEl.textContent = descEl.dataset.descriptionEn;
            }
        });

        // PENTING: Panggil renderSummary jika di halaman checkout
        const checkoutPage = document.querySelector('.checkout-layout');
        if (checkoutPage) {
            const checkoutTotalSummary = document.getElementById('checkout-total-summary');
            if (checkoutTotalSummary) {
                // Panggil renderSummary jika elemennya ada
                renderCheckoutSummary(checkoutTotalSummary);
            }
        }
    }

    // --- FUNGSI GLOBAL UTILITY UNTUK SHOW TOAST ---
    function showToast(messageKey, type = 'success', data = {}) {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;

        let message = translations[currentLang][messageKey] || 'Pesan tidak ditemukan';

        // Logika untuk mengganti placeholder seperti {{username}}
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const placeholder = new RegExp(`{{${key}}}`, 'g');
                message = message.replace(placeholder, data[key]);
            }
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        toastContainer.appendChild(toast);

        // Hapus toast setelah 3 detik
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
    
    // --- FUNGSI GLOBAL UTILITY UNTUK CLEAR ELEMENT ---
    function clearContainer(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    // --- FUNGSI GLOBAL UTILITY UNTUK CEK STATUS LOGIN ---
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const username = localStorage.getItem('username') || 'Pengguna';
        return { isLoggedIn, username };
    }
    
    // --- FUNGSI GLOBAL UTILITY UNTUK MENGURAIKAN ALAMAT ---
    function extractCityAndProvince(fullAddressString) {
        if (!fullAddressString) return { city: '', province: '' };
    
        const lowerCaseAddress = fullAddressString.toLowerCase();
        let city = '';
        let province = '';
    
        for (const key in shippingCostsData) {
            if (lowerCaseAddress.includes(key)) {
                city = key;
                province = shippingCostsData[key].province;
                break;
            }
        }
    
        if (!province) {
            if (lowerCaseAddress.includes('jawa barat')) province = 'Jawa Barat';
            else if (lowerCaseAddress.includes('dki jakarta')) province = 'DKI Jakarta';
            else if (lowerCaseAddress.includes('jawa timur')) province = 'Jawa Timur';
            else if (lowerCaseAddress.includes('diy') || lowerCaseAddress.includes('yogyakarta')) province = 'DIY';
            else if (lowerCaseAddress.includes('sumatera utara')) province = 'Sumatera Utara';
            else if (lowerCaseAddress.includes('banten')) province = 'Banten';
            else if (lowerCaseAddress.includes('bali')) province = 'Bali';
            else if (lowerCaseAddress.includes('jawa tengah')) province = 'Jawa Tengah';
            else if (lowerCaseAddress.includes('sulawesi selatan')) province = 'Sulawesi Selatan';
            else if (lowerCaseAddress.includes('sumatera selatan')) province = 'Sumatera Selatan';
        }
    
        return { city, province };
    }

    // --- FUNGSI GLOBAL UTILITY UNTUK MENGHITUNG ONGKIR ---
    function calculateShippingCost(productAddress, userAddress) {
        if (!userAddress || (!userAddress.city && !userAddress.fullAddress)) {
            return 0;
        }

        const originInfo = extractCityAndProvince(productAddress);
        const destinationInfo = extractCityAndProvince(userAddress.fullAddress || userAddress.city);

        const originCityKey = originInfo.city;
        const originProvince = originInfo.province;
        const destinationCityKey = destinationInfo.city;
        const destinationProvince = destinationInfo.province;

        const originData = shippingCostsData[originCityKey];

        if (!originData) {
            return 15000;
        }
        
        if (originCityKey && destinationCityKey && originCityKey === destinationCityKey) {
            return originData.baseCost;
        }

        if (originProvince && destinationProvince && originProvince === destinationProvince) {
            return originData.baseCost * 1.5;
        }

        return originData.interProvincialCost;
    }
    
    // --- FUNGSI GLOBAL UTILITY UNTUK MENGHITUNG WAKTU PENGIRIMAN ---
    function calculateShippingTime(productAddress, userAddress) {
        if (!userAddress || (!userAddress.city && !userAddress.fullAddress)) {
            return 'Waktu tidak dapat dihitung.';
        }

        const originInfo = extractCityAndProvince(productAddress);
        const destinationInfo = extractCityAndProvince(userAddress.fullAddress || userAddress.city);

        const originCityKey = originInfo.city;
        const originProvince = originInfo.province;
        const destinationCityKey = destinationInfo.city;
        const destinationProvince = destinationInfo.province;

        const originData = shippingCostsData[originCityKey];

        if (!originData) {
            return 'Waktu tidak dapat dihitung.';
        }

        if (originCityKey && destinationCityKey && originCityKey === destinationCityKey) {
            return shippingTimesData.intraCity;
        }

        if (originProvince && destinationProvince && originProvince === destinationProvince) {
            return shippingTimesData.intraProvince;
        }

        return shippingTimesData.interProvince;
    }

    // --- FUNGSI GLOBAL UTILITY UNTUK MENGELOLA TEMA ---
    function applyTheme(theme) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const cartIcon = document.getElementById('cart-icon-img');

        if (theme === 'dark') {
            body.classList.add('dark-mode');
            if (themeIcon) themeIcon.src = '/assets/logo-terang.png';
            if (cartIcon) cartIcon.src = '/assets/logo-keranjang-terang.png';
        } else {
            body.classList.remove('dark-mode');
            if (cartIcon) cartIcon.src = '/assets/logo-keranjang-gelap.png';
            if (themeIcon) themeIcon.src = '/assets/logo-gelap.png';
        }
    }

    // --- FUNGSI GLOBAL UTILITY UNTUK MENGGANTI BAHASA ---
    function translateUI(lang) {
        const titleElements = {
            'page-title-home': document.title,
            'page-title-products': document.title,
            'page-title-help': document.title,
            'page-title-about': document.title,
            'page-title-cart': document.title,
            'page-title-login': document.title,
            'page-title-register': document.title,
            'page-title-search': document.title
        };

        let currentTitleKey = '';
        for (const key in titleElements) {
            if (window.location.pathname.includes(key.replace('page-title-', '') + '.html')) {
                currentTitleKey = key;
                break;
            }
        }

        if (window.location.pathname.includes('index.html')) {
            currentTitleKey = 'page-title-home';
        }

        if (translations[lang] && translations[lang][currentTitleKey]) {
            document.title = translations[lang][currentTitleKey];
        }

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
    }

    // --- FUNGSI GLOBAL UTILITY UNTUK MEMBUAT KARTU PRODUK ---
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

        buyButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const { isLoggedIn } = checkLoginStatus();

            if (isLoggedIn) {
                const productId = e.target.dataset.productId;
                if (productId) {
                    addToCart(productId);
                }
            } else {
                showToast('toast-must-login', 'error');
                setTimeout(() => {
                    const loginPagePath = window.location.pathname.includes('/html/') ? 'login.html' : 'html/login.html';
                    window.location.href = loginPagePath;
                }, 3000);
            }
        });

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

    // --- FUNGSI GLOBAL UTILITY UNTUK VALIDASI FORM ---
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required]');

        form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        form.querySelectorAll('.error-message').forEach(el => el.remove());

        inputs.forEach(input => {
            if (input.type === 'radio') return;

            if (!input.value.trim()) {
                isValid = false;
                showValidationError(input, 'validation-required');
            }

            if (input.type === 'password' && input.value.length > 0 && input.value.length < 6) {
                isValid = false;
                showValidationError(input, 'validation-password-short');
            }
        });

        const radioGroups = form.querySelectorAll('input[type="radio"][required]');
        if (radioGroups.length > 0) {
            const groupName = radioGroups[0].name;
            const selectedOption = form.querySelector(`input[name="${groupName}"]:checked`);
            if (!selectedOption) {
                isValid = false;
                showValidationError(radioGroups[0].closest('.radio-container'), 'validation-required');
            }
        }

        return isValid;
    }

    function showValidationError(inputElement, messageKey) {
        inputElement.classList.add('is-invalid');
        const errorMessage = document.createElement('p');
        errorMessage.className = 'error-message';
        errorMessage.dataset.translateKey = messageKey;
        errorMessage.textContent = translations[currentLang][messageKey] || 'Error';

        inputElement.parentNode.appendChild(errorMessage);
    }
    
    // --- FUNGSI GLOBAL UTILITY UNTUK MENGURANGI STOK ---
    async function processOrder(orderedItems, username) {
        let updatedProductsData = [...allProductsData];
        let hasStockIssues = false;

        orderedItems.forEach(orderedItem => {
            const productIndex = updatedProductsData.findIndex(p => p.id == orderedItem.id);
            if (productIndex !== -1) {
                if (updatedProductsData[productIndex].stock >= orderedItem.quantity) {
                    updatedProductsData[productIndex].stock -= orderedItem.quantity;
                } else {
                    console.error(`Stok tidak cukup untuk produk ID: ${orderedItem.id}`);
                    hasStockIssues = true;
                }
            }
        });

        if (!hasStockIssues) {
            allProductsData = updatedProductsData;
        } else {
            showToast('toast-stock-issue', 'error');
            return;
        }

        const userCartKey = `cart_${username}`;
        let currentCart = JSON.parse(localStorage.getItem(userCartKey)) || [];

        const orderedItemIds = orderedItems.map(item => item.id);

        const updatedCart = currentCart.filter(item => !orderedItemIds.includes(item.id));

        localStorage.setItem(userCartKey, JSON.stringify(updatedCart));

        updateCartCounter();
    }
    
    // --- FUNGSI GLOBAL UTILITY UNTUK MENGUPDATE KERANJANG ---
    function addToCart(productId) {
        const { username } = checkLoginStatus();
        const userCartKey = `cart_${username}`;

        let cart = JSON.parse(localStorage.getItem(userCartKey)) || [];
        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }

        localStorage.setItem(userCartKey, JSON.stringify(cart));
        showToast('toast-add-success', 'success');
        updateCartCounter();
    }
    
    function updateCart(productId, change) {
        const { username } = checkLoginStatus();
        const userCartKey = `cart_${username}`;
        let cart = JSON.parse(localStorage.getItem(userCartKey)) || [];
        const productIndex = cart.findIndex(item => item.id === productId);

        if (productIndex > -1) {
            if (change === 0) {
                showToast('toast-remove-item', 'success');
                cart.splice(productIndex, 1);
            } else {
                cart[productIndex].quantity += change;
                if (cart[productIndex].quantity <= 0) {
                    showToast('toast-remove-item', 'success');
                    cart.splice(productIndex, 1);
                }
            }
        }
        localStorage.setItem(userCartKey, JSON.stringify(cart));
        displayCart();
        updateCartCounter();
    }
    
    function updateCartCounter() {
        const { isLoggedIn, username } = checkLoginStatus();
        const counterElement = document.getElementById('cart-counter');
        if (!counterElement) return;

        if (!isLoggedIn) {
            counterElement.classList.remove('visible');
            counterElement.textContent = '0';
            return;
        }

        const userCartKey = `cart_${username}`;
        const cart = JSON.parse(localStorage.getItem(userCartKey)) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        counterElement.textContent = totalItems;
        counterElement.classList.toggle('visible', totalItems > 0);
    }

    // --- FUNGSI GLOBAL UNTUK MENGUPDATE VISIBILITAS MENU MOBILE ---
    function updateMobileNavState() {
        const { isLoggedIn } = checkLoginStatus();
        const loggedOutItems = document.querySelectorAll('.mobile-only-logged-out');
        const loggedInItems = document.querySelectorAll('.mobile-only-logged-in');
        const hamburgerMenu = document.querySelector('.header-main-nav');

        if (isLoggedIn) {
            loggedOutItems.forEach(item => item.style.display = 'none');
            loggedInItems.forEach(item => item.style.display = 'list-item');
        } else {
            loggedOutItems.forEach(item => item.style.display = 'list-item');
            loggedInItems.forEach(item => item.style.display = 'none');
        }

        const mobileLangSwitcherLink = document.querySelector('#mobile-lang-switcher a');
        if (mobileLangSwitcherLink) {
            mobileLangSwitcherLink.textContent = (currentLang === 'id') ? 'English' : 'Bahasa Indonesia';
        }
    }

    // --- FUNGSI UNTUK MENAMPILKAN RINGKASAN CHECKOUT ---
    function renderCheckoutSummary(checkoutTotalSummary, checkoutState) {
        if (!checkoutTotalSummary) return;

        const { selectedItems, userAddress, subtotal, totalShippingCost } = checkoutState;
        
        if (allProductsData.length === 0) return;

        let shippingTime = translations[currentLang]['not-available'];
        if (selectedItems.length > 0 && userAddress && userAddress.fullAddress) {
            const firstProduct = allProductsData.find(p => p.id == selectedItems[0].id);
            if (firstProduct && firstProduct.address) {
                const timeArray = calculateShippingTime(firstProduct.address, userAddress);
                const daysText = translations[currentLang]['shipping-time-days'];
                shippingTime = `${timeArray[0]} - ${timeArray[1]} ${daysText}`;
            }
        }
        
        clearContainer(checkoutTotalSummary);
        
        const subtotalText = translations[currentLang]['summary-subtotal'];
        const shippingText = translations[currentLang]['summary-shipping'];
        const itemsText = translations[currentLang]['summary-items'];
        const totalText = translations[currentLang]['summary-total'];

        const subtotalP = document.createElement('p');
        const subtotalSpanLeft = document.createElement('span');
        subtotalSpanLeft.textContent = `${subtotalText} (${selectedItems.length} ${itemsText})`;
        const subtotalSpanRight = document.createElement('span');
        subtotalSpanRight.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
        subtotalP.append(subtotalSpanLeft, subtotalSpanRight);

        const shippingP = document.createElement('p');
        const shippingSpanLeft = document.createElement('span');
        shippingSpanLeft.textContent = shippingText;
        const shippingSpanRight = document.createElement('span');
        shippingSpanRight.textContent = `Rp ${totalShippingCost.toLocaleString('id-ID')}`;
        shippingP.append(shippingSpanLeft, shippingSpanRight);

        const hr1 = document.createElement('hr');
        hr1.style.margin = '15px 0';

        const timeP = document.createElement('p');
        const timeSpanLeft = document.createElement('span');
        timeSpanLeft.textContent = translations[currentLang]['shipping-time-label'];
        const timeSpanRight = document.createElement('span');
        timeSpanRight.textContent = shippingTime;
        timeP.append(timeSpanLeft, timeSpanRight);

        const totalP = document.createElement('p');
        totalP.className = 'total-price';
        const totalSpanLeft = document.createElement('span');
        totalSpanLeft.textContent = totalText;
        const totalSpanRight = document.createElement('span');
        totalSpanRight.textContent = `Rp ${(subtotal + totalShippingCost).toLocaleString('id-ID')}`;
        totalP.append(totalSpanLeft, totalSpanRight);

        checkoutTotalSummary.append(subtotalP, shippingP, hr1, timeP, totalP);
    }
    
    // --- FUNGSI UNTUK MENGINISIALISASI HALAMAN CHECKOUT ---
    async function initCheckoutPage() {
        const checkoutPage = document.querySelector('.checkout-layout');
        if (!checkoutPage) return;

        const { isLoggedIn, username } = checkLoginStatus();
        if (!isLoggedIn) {
            showToast('cart-must-login', 'error');
            setTimeout(() => { window.location.href = '../html/login.html'; }, 1500);
            return;
        }

        const selectedItemsJSON = sessionStorage.getItem('checkoutItems');
        const userAddressJSON = sessionStorage.getItem('checkoutUserAddress');

        if (!selectedItemsJSON || !userAddressJSON) {
            showToast('toast-checkout-data-missing', 'error');
            setTimeout(() => { window.location.href = '../html/cart.html'; }, 2000);
            return;
        }

        const selectedItems = JSON.parse(selectedItemsJSON);
        const userAddress = JSON.parse(userAddressJSON);

        if (allProductsData.length === 0) {
            try {
                const response = await fetch(API_URL);
                allProductsData = await response.json();
            } catch (error) {
                console.error("Failed to load products for checkout:", error);
                showToast('error-load-products', 'error');
                return;
            }
        }

        const shippingAddressDisplay = document.getElementById('shipping-address-display');
        if (shippingAddressDisplay) {
            document.getElementById('checkout-fullname').textContent = userAddress.fullname || '';
            document.getElementById('checkout-phone').textContent = userAddress.phone || '';
            document.getElementById('checkout-address').textContent = userAddress.fullAddress || '';
            document.getElementById('checkout-city').textContent = userAddress.city || '';
            document.getElementById('checkout-postalcode').textContent = userAddress.postalCode || '';
        }

        const checkoutItemsSummary = document.getElementById('checkout-items-summary');
        let subtotal = 0;
        let totalShippingCost = 0;
        if (checkoutItemsSummary) {
            clearContainer(checkoutItemsSummary);
            selectedItems.forEach(cartItem => {
                const productDetail = allProductsData.find(p => p.id == cartItem.id);
                if (productDetail) {
                    subtotal += productDetail.price * cartItem.quantity;
                    if (productDetail.address && userAddress && userAddress.fullAddress) {
                        totalShippingCost += calculateShippingCost(productDetail.address, userAddress);
                    } else {
                        totalShippingCost += 15000;
                    }

                    const itemCard = document.createElement('div');
                    itemCard.className = 'checkout-item-card';
                    const itemImage = document.createElement('img');
                    itemImage.src = productDetail.images[0];
                    itemImage.alt = productDetail.titleId;
                    const itemDetails = document.createElement('div');
                    itemDetails.className = 'checkout-item-details';
                    const itemTitle = document.createElement('h4');
                    itemTitle.textContent = `${currentLang === 'id' ? productDetail.titleId : productDetail.titleEn}`;
                    const itemQuantity = document.createElement('p');
                    const quantityText = translations[currentLang]['cart-quantity'] || 'Jumlah:';
                    itemQuantity.textContent = `${quantityText} ${cartItem.quantity}`;

                    itemDetails.append(itemTitle, itemQuantity);
                    const itemPrice = document.createElement('span');
                    itemPrice.className = 'checkout-item-price';
                    itemPrice.textContent = `Rp ${(productDetail.price * cartItem.quantity).toLocaleString('id-ID')}`;

                    itemCard.append(itemImage, itemDetails, itemPrice);
                    checkoutItemsSummary.appendChild(itemCard);
                }
            });
        }

        const checkoutState = {
            selectedItems,
            userAddress,
            subtotal,
            totalShippingCost
        };

        const checkoutTotalSummary = document.getElementById('checkout-total-summary');
        renderCheckoutSummary(checkoutTotalSummary, checkoutState);

        const checkoutForm = document.getElementById('checkout-form');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const paymentMethod = checkoutForm.querySelector('input[name="paymentMethod"]:checked')?.value;
                const courierNote = checkoutForm.querySelector('#courier-note')?.value;

                if (!paymentMethod) {
                    showToast('toast-no-payment-method', 'error');
                    return;
                }

                await processOrder(selectedItems, username);

                showToast('toast-order-success', 'success');
                sessionStorage.removeItem('checkoutItems');
                sessionStorage.removeItem('checkoutUserAddress');

                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 2000);
            });
        }

        translateUI(currentLang);
    }
});