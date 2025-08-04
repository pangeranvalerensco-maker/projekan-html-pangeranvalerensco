// =================================================================================
// == CONFIGURATION & GLOBAL VARIABLES
// =================================================================================
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

// --- SIMULASI DATA ONGKIR ---
const shippingCostsData = {
    // Tarif dasar per kota/zona.
    // baseCost: Ongkir dalam kota/provinsi yang sama (untuk asal produk)
    // interProvincialCost: Ongkir ke luar provinsi
    // province: Nama provinsi yang sesuai
    'bandung': { baseCost: 9000, interProvincialCost: 30000, province: 'Jawa Barat' },
    'jakarta': { baseCost: 10000, interProvincialCost: 35000, province: 'DKI Jakarta' },
    'bogor': { baseCost: 9500, interProvincialCost: 32000, province: 'Jawa Barat' },
    'depok': { baseCost: 9500, interProvincialCost: 32000, province: 'Jawa Barat' }, // Depok di Jawa Barat
    'surabaya': { baseCost: 11000, interProvincialCost: 40000, province: 'Jawa Timur' },
    'yogyakarta': { baseCost: 12000, interProvincialCost: 42000, province: 'DIY' },
    'sleman': { baseCost: 12000, interProvincialCost: 42000, province: 'DIY' }, // Sleman di DIY
    'medan': { baseCost: 15000, interProvincialCost: 50000, province: 'Sumatera Utara' },
    'tangerang': { baseCost: 10500, interProvincialCost: 36000, province: 'Banten' }, // Untuk Tangerang & Tangsel
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
        'related-products-title': 'Mungkin Anda Suka',
        'recommended-title': 'Rekomendasi',
        'see-more-btn': 'Lihat Lainnya',
        'buy-button': 'Tambah ke Keranjang',
        'loading-text': 'Memuat produk...',
        'page-title': 'Toko Keren',
        'follow-us-title': 'Ikuti Kami di',
        'about-us-title': 'Tentang Kami',
        'about-welcome-title': 'Selamat Datang di MineCart!',
        'about-p1': 'MineCart lahir dari kecintaan kami terhadap dunia MineCraft dan keinginan untuk menyediakan produk-produk berkualitas bagi para gamer dan penggemar budaya pop. Kami percaya bahwa setiap orang berhak mengekspresikan gayanya, dan kami di sini untuk membantu mewujudkannya.',
        'about-mission-title': 'Misi Kami',
        'about-p2': 'Misi kami adalah menjadi "peti harta karun" utama Anda untuk semua kebutuhan gaya hidup modern. Kami memilih setiap item dengan cermat, memastikan Anda mendapatkan produk terbaik yang unik dan berkarakter. Selamat menelusuri dan "Craft Your Style!"',
        'about-hq-title': 'MineCart HQ',
        'dev-praise-1': 'DIVDIK BAIK',
        'dev-praise-2': 'DIVDIK GANTENG & CANTIK',
        'dev-praise-3': 'DIVDIK BAIK HATI',
        'thank-you-note-a': 'Terima kasih kami ucapkan kepada Divisi Pendidikan yang dengan sabar mengajari dan menghadapi kami.',
        'thank-you-note-b': ' Terkhusus juga Kepada Teh Mora Fidela, Instruktur terbaik kami.',
        'contact-title': 'Hubungi Kami',
        'contact-social-title': 'Media Sosial',
        'contact-email-title': 'Email',
        'contact-phone-title': 'Telepon',
        'contact-location-title': 'Lokasi',
        'contact-location-detail': 'Bandung, Jawa Barat',
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
        'loading-product': 'Memuat...',
        'loading-description': 'Deskripsi produk sedang dimuat...',
        'loading-stock': 'Stok: -',
        'error-load-products': 'Gagal memuat produk. Silakan coba lagi nanti.',
        'page-title-search': 'Hasil untuk',
        'search-results-for': 'Hasil Pencarian untuk',
        'no-search-results': 'Tidak ada produk yang cocok dengan pencarian',
        'my-account': 'Akun Saya',
        'logout': 'Keluar',
        'btn-saving': 'Menyimpan...',
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
        'sort-title': 'Urutkan Berdasarkan: ',
        'sort-price-asc': 'Harga: Terendah ke Tertinggi',
        'sort-price-desc': 'Harga: Tertinggi ke Terendah',
        'sort-name-asc': 'Nama: A-Z',
        'sort-name-desc': 'Nama: Z-A',
        'sort-stock-desc': 'Stok: Terbanyak',
        'sort-stock-asc': 'Stok: Paling Sedikit',
        'sort-location-asc': 'Lokasi: Terdekat',
        'sort-location-desc': 'Lokasi: Terjauh',
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
        'help-q-order-flow': 'Bagaimana alur pemesanan di MineCart?',
        'help-a-order-flow-step1': 'Pilih produk yang Anda inginkan dan klik tombol "Tambah ke Keranjang".',
        'help-a-order-flow-step2': 'Setelah selesai, masuk ke halaman Keranjang Belanja melalui ikon di kanan atas.',
        'help-a-order-flow-step3': 'Periksa kembali item Anda, lalu klik tombol "Checkout".',
        'help-a-order-flow-step4': 'Isi informasi pengiriman dan selesaikan pembayaran.',
        'help-q-video': 'Apakah ada video perkenalan MineCart?',
        'help-q-audio': 'Apakah MineCart memiliki jingle?',
        'help-q-features': 'Apa saja fitur utama di website ini?',
        'help-a-features-1': 'Pencarian Produk: Pengguna dapat mencari produk berdasarkan nama, kategori, atau deskripsi.',
        'help-a-features-2': 'Keranjang Belanja Dinamis: Keranjang belanja yang terpisah untuk setiap pengguna, disimpan di Local Storage.',
        'help-a-features-3': 'Checkout & Simulasi Stok: Alur checkout lengkap dengan simulasi pengurangan stok produk.',
        'help-a-features-4': 'Tema Gelap & Terang: Pengguna dapat mengganti tema website untuk kenyamanan visual.',
        'help-a-features-5': 'Multi-Bahasa: Website mendukung dua bahasa (Indonesia & Inggris) yang dapat diganti.',
        'help-q-tags': 'Elemen HTML5 apa saja yang digunakan di proyek ini?',
        'help-a-tags-1': 'Struktur Semantik: Penggunaan <header>, <main>, <footer>, <nav>, <section>, dan <article> untuk membangun layout yang bermakna.',
        'help-a-tags-2': 'Multimedia: Implementasi <video> dan <audio> di halaman Bantuan, serta <figure> dan <figcaption> untuk gambar dengan keterangan.',
        'help-a-tags-3': 'Daftar: Penggunaan <ul> untuk daftar tidak berurutan dan <ol> untuk daftar langkah-langkah yang berurutan.',
        'help-a-tags-4': 'Formulir Interaktif: Penggunaan <form>, <input> dengan berbagai tipe, dan <details> & <summary> untuk FAQ accordion.',
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
        'view-cart-btn': 'Lihat Keranjang',
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
        'cart-quantity': 'Jumlah:',
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
        'toast-sort-location-error': 'Untuk mengurutkan berdasarkan lokasi, Anda harus masuk & melengkapi alamat.',
        'summary-subtotal': 'Subtotal',
        'summary-shipping': 'Ongkir',
        'summary-items': 'barang',
        'summary-total': 'Total',
        'shipping-time-label': 'Estimasi Waktu Sampai:',
        'shipping-time-days': 'hari',
        'product-seller-title': 'Penjual:',
        'seller-name-label': 'Nama Toko:',
        'cs-title': 'Selamat Datang!!',
        'cs-welcome': 'Selamat datang di MineCart Web! Temukan berbagai produk berkualitas tinggi dengan harga terbaik.',
        'footer-title': '© 2025 MineCart. Dibuat oleh Pangeran Valerensco Rivaldi Hutabarat. Semua hak cipta dilindungi.'
    },
    en: {
        'page-title-home': 'MineCart - Homepage',
        'page-title-products': 'MineCart - All Products',
        'hero-title': 'This Season\'s Newest Collection',
        'hero-subtitle': 'Find your best style with high-quality selected products.',
        'hero-cta': 'Shop All Products',
        'featured-title': 'Recommended Products',
        'related-products-title': 'You Might Also Like',
        'recommended-title': 'Recommended',
        'see-more-btn': 'See More',
        'buy-button': 'Add to Cart',
        'loading-text': 'Loading products...',
        'page-title': 'Cool Store',
        'follow-us-title': 'Follow Us On',
        'about-us-title': 'About Us',
        'about-welcome-title': 'Welcome to MineCart!',
        'about-p1': 'MineCart was born from our love for the MineCraft world and a desire to provide quality products for gamers and pop culture fans. We believe everyone has the right to express their style, and we are here to help make that a reality.',
        'about-mission-title': 'Our Mission',
        'about-p2': 'Our mission is to be your ultimate "treasure chest" for all modern lifestyle needs. We carefully select each item, ensuring you get the best products that are unique and full of character. Happy Browse and "Craft Your Style!"',
        'about-hq-title': 'MineCart HQ',
        'dev-praise-1': 'DIVDIK IS GOOD',
        'dev-praise-2': 'DIVDIK IS HANDSOME & BEAUTIFUL',
        'dev-praise-3': 'DIVDIK IS KIND-HEARTED',
        'help-title': 'Help',
        'thank-you-note-a': 'We would like to thank the Education Division for patiently teaching and guiding us.',
        'thank-you-note-b': 'A special thanks to Teh Mora Fidela, our best instructor.',
        'contact-title': 'Contact Us',
        'contact-email-title': 'Email',
        'contact-phone-title': 'Phone',
        'contact-location-title': 'Location',
        'contact-location-detail': 'Bandung, West Java',
        'contact-social-title': 'Social Media',
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
        'loading-product': 'Loading...',
        'loading-description': 'Product description is loading...',
        'loading-stock': 'Stock: -',
        'error-load-products': 'Failed to load products. Please try again later.',
        'page-title-search': 'Results for',
        'search-results-for': 'Search Results for',
        'no-search-results': 'No products found matching the search',
        'my-account': 'My Account',
        'logout': 'Logout',
        'btn-saving': 'Saving...',
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
        'sort-title': 'Sort By: ',
        'sort-price-asc': 'Price: Low to High',
        'sort-price-desc': 'Price: High to Low',
        'sort-name-asc': 'Name: A-Z',
        'sort-name-desc': 'Name: Z-A',
        'sort-stock-desc': 'Stock: Highest',
        'sort-stock-asc': 'Stock: Lowest',
        'sort-location-asc': 'Location: Nearest',
        'sort-location-desc': 'Location: Farthest',
        'summary-title': 'Order Summary',
        'summary-subtotal': 'Subtotal',
        'summary-total': 'Total',
        'remove-item': 'Remove',
        'product-location-title': 'Product Location:',
        'not-available': 'Not available',
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
        'help-q-order-flow': 'What is the order flow on MineCart?',
        'help-a-order-flow-step1': 'Select the product you want and click the "Add to Cart" button.',
        'help-a-order-flow-step2': 'When finished, go to the Shopping Cart page via the icon in the top right.',
        'help-a-order-flow-step3': 'Review your items, then click the "Checkout" button.',
        'help-a-order-flow-step4': 'Fill in the shipping information and complete the payment.',
        'help-q-video': 'Is there a MineCart introduction video?',
        'help-q-audio': 'Does MineCart have a jingle?',
        'help-q-features': 'What are the main features of this website?',
        'help-a-features-1': 'Product Search: Users can search for products by name, category, or description.',
        'help-a-features-2': 'Dynamic Shopping Cart: A separate shopping cart for each user, stored in Local Storage.',
        'help-a-features-3': 'Checkout & Stock Simulation: A complete checkout flow with product stock reduction simulation.',
        'help-a-features-4': 'Dark & Light Theme: Users can switch the website theme for visual comfort.',
        'help-a-features-5': 'Multi-Language: The website supports two languages (Indonesian & English) that can be switched.',
        'help-q-tags': 'What HTML5 elements are used in this project?',
        'help-a-tags-1': 'Semantic Structure: Use of <header>, <main>, <footer>, <nav>, <section>, and <article> to build a meaningful layout.',
        'help-a-tags-2': 'Multimedia: Implementation of <video> and <audio> on the Help page, as well as <figure> and <figcaption> for images with captions.',
        'help-a-tags-3': 'Lists: Use of <ul> for unordered lists and <ol> for ordered step-by-step lists.',
        'help-a-tags-4': 'Interactive Forms: Use of <form>, <input> with various types, and <details> & <summary> for the FAQ accordion.',
        'login-title': 'Login to Your Account',
        'register-title': 'Create a New Account',
        'label-username': 'Username',
        'label-email': 'Email',
        'label-password': 'Password',
        'label-dob': 'Date of Birth',
        'label-gender': 'Gender',
        'gender-male': 'Male',
        'gender-female': 'Female',
        'btn-login': 'Login',
        'btn-register': 'Register',
        'auth-switch-text-login': 'Already have an account? ',
        'auth-switch-link-login': 'Login here',
        'auth-switch-text-register': 'Don\'t have an account? ',
        'auth-switch-link-register': 'Register here',
        'toast-add-success': 'Product added to cart successfully!',
        'toast-register-success': 'Registration successful! Please login.',
        'toast-login-success': 'Welcome, {{username}}!',
        'toast-login-error': 'Incorrect username or password!',
        'toast-fill-all-fields': 'All fields are required!',
        'toast-account-not-found': 'Account not found. Please register.',
        'validation-required': 'This field is required.',
        'validation-password-short': 'Password must be at least 6 characters.',
        'toast-email-exists': 'This email is already registered. Please use another email.',
        'toast-must-login': 'You must be logged in to add items!',
        'select-all': 'Select All',
        'summary-title': 'Order Summary',
        'summary-subtotal': 'Subtotal',
        'summary-shipping': 'Shipping',
        'summary-total': 'Total',
        'summary-checkout-btn': 'Checkout',
        'summary-empty-cart': 'Select items to calculate.',
        'summary-items': 'items',
        'cart-must-login': 'You must be logged in to view the cart.',
        'toast-remove-item': 'Product successfully removed from cart.',
        'empty-cart-message': 'Your cart is empty.',
        'view-cart-btn': 'View Cart',
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
        'cart-quantity': 'Quantity:',
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
        'toast-sort-location-error': 'To sort by location, you must be logged in & have a complete address.',
        'summary-subtotal': 'Subtotal',
        'summary-shipping': 'Shipping',
        'summary-items': 'items',
        'summary-total': 'Total',
        'shipping-time-label': 'Estimated Delivery Time:',
        'shipping-time-days': 'days',
        'product-seller-title': 'Seller:',
        'seller-name-label': 'Store Name:',
        'cs-title': 'Welcome!!',
        'cs-welcome': 'Welcome to MineCart Web! Discover a wide range of high-quality products at the best prices.',
        'footer-title': '© 2025 MineCart. Created by Pangeran Valerensco Rivaldi Hutabarat. All rights reserved.'
    }
};

// =================================================================================
// == HELPER & UTILITY FUNCTIONS
// =================================================================================
async function ensureProductsLoaded() {
    if (allProductsData.length === 0) {
        const response = await fetch(API_URL);
        allProductsData = await response.json();

        const savedStock = getLocalStorage('productStockData', {});
        if (Object.keys(savedStock).length > 0) {
            allProductsData.forEach(product => {
                // Jika ID produk ada di dalam data stok tersimpan, perbarui stoknya
                if (savedStock[product.id] !== undefined) {
                    product.stock = savedStock[product.id];
                }
            });
        }
    }
}

function getSelectedProductIds() {
    return Array.from(document.querySelectorAll('.cart-item-select input:checked')).map(cb => cb.dataset.productId);
}

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

/**
 * Checks if the user is logged in by checking localStorage.
 * @returns {{isLoggedIn: boolean, username: string}}
*/
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username') || 'Pengguna';
    return { isLoggedIn, username };
}

function clearContainer(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// --- Utility Local Storage Helper ---
function getLocalStorage(key, defaultValue = null) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    } catch {
        return defaultValue;
    }
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.reload();
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required]');

    // Hapus semua status error sebelumnya
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    form.querySelectorAll('.error-message').forEach(el => el.remove());

    inputs.forEach(input => {
        // Lewati validasi input radio di sini, akan ditangani terpisah
        if (input.type === 'radio') return;

        if (!input.value.trim()) {
            isValid = false;
            showValidationError(input, 'validation-required');
        }

        // Validasi khusus untuk password
        if (input.type === 'password' && input.value.length > 0 && input.value.length < 6) {
            isValid = false;
            showValidationError(input, 'validation-password-short');
        }
    });

    // --- BLOK VALIDASI BARU UNTUK RADIO BUTTON ---
    const radioGroups = form.querySelectorAll('input[type="radio"][required]');
    if (radioGroups.length > 0) {
        const groupName = radioGroups[0].name;
        const selectedOption = form.querySelector(`input[name="${groupName}"]:checked`);
        if (!selectedOption) {
            isValid = false;
            // Tampilkan pesan error di dekat grup radio
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

    // Taruh pesan error setelah input
    inputElement.parentNode.appendChild(errorMessage);
}

function createSkeletonCard() {
    const cardLink = document.createElement('div');
    cardLink.className = 'product-card-link'; // Gunakan div agar tidak bisa diklik

    const card = document.createElement('article');
    card.className = 'product-card skeleton-card';

    const image = document.createElement('div');
    image.className = 'skeleton skeleton-img';

    const cardBody = document.createElement('div');
    cardBody.className = 'product-card-body';

    const title = document.createElement('div');
    title.className = 'skeleton skeleton-title';

    const text1 = document.createElement('div');
    text1.className = 'skeleton skeleton-text';
    const text2 = document.createElement('div');
    text2.className = 'skeleton skeleton-text';

    cardBody.appendChild(title);
    cardBody.appendChild(text1);
    cardBody.appendChild(text2);
    card.appendChild(image);
    card.appendChild(cardBody);
    cardLink.appendChild(card);

    return cardLink;
}

// =================================================================================
// == FEATURE: AUTHENTICATION & ACCOUNT
// =================================================================================
/**
     * Updates the account menu based on the user's login status.
     */
function updateAccountMenu() {
    if (!accountMenu) return;

    clearContainer(accountMenu);

    const { isLoggedIn, username } = checkLoginStatus();

    if (isLoggedIn) {
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
        myAccountLink.href = '/html/account.html';
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
            logoutUser();
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

        accountMenu.classList.add('is-logged-out');

        translateUI(currentLang);
    }
}

// Tambahkan fungsi baru ini di script.js Anda
/**
 * Mengelola visibilitas item menu mobile berdasarkan status login dan bahasa.
 */
function updateMobileNavState() {
    const { isLoggedIn } = checkLoginStatus();
    const loggedOutItems = document.querySelectorAll('.mobile-only-logged-out');
    const loggedInItems = document.querySelectorAll('.mobile-only-logged-in');

    // Tampilkan/sembunyikan item menu berdasarkan status login
    if (isLoggedIn) {
        loggedOutItems.forEach(item => item.classList.add('hidden-element'));
        loggedInItems.forEach(item => item.classList.remove('hidden-element'));
    } else {
        loggedOutItems.forEach(item => item.classList.remove('hidden-element'));
        loggedInItems.forEach(item => item.classList.add('hidden-element'));
    }

    // Kelola teks pada pengalih bahasa mobile
    const mobileLangSwitcherLink = document.querySelector('#mobile-lang-switcher a');
    if (mobileLangSwitcherLink) {
        mobileLangSwitcherLink.textContent = (currentLang === 'id') ? 'English' : 'Bahasa Indonesia';
    }
}

// =================================================================================
// == FEATURE: ACCOUNT PAGE MANAGEMENT
// =================================================================================

function displayAccountInfo() {
    const { isLoggedIn, username } = checkLoginStatus();
    if (!isLoggedIn) {
        // Jika tidak login, redirect ke halaman login
        window.location.href = 'login.html';
        return;
    }

    const allUsers = getLocalStorage('userAccounts', [])
    const currentUser = allUsers.find(user => user.username === username);

    if (!currentUser) {
        console.error("User data not found for logged in user!");
        // Opsional: lakukan logout jika data user tidak ditemukan
        logoutUser();
        return;
    }

    // Tampilkan informasi akun dasar
    const displayUsername = document.getElementById('display-username');
    const displayEmail = document.getElementById('display-email');
    if (displayUsername) displayUsername.textContent = currentUser.username;
    if (displayEmail) displayEmail.textContent = currentUser.email;

    // Tampilkan informasi alamat
    const displayFullname = document.getElementById('display-fullname');
    const displayAddress = document.getElementById('display-address');
    const displayCity = document.getElementById('display-city');
    const displayPostalcode = document.getElementById('display-postalcode');
    const displayPhone = document.getElementById('display-phone');

    if (displayFullname) displayFullname.textContent = currentUser.address?.fullname || translations[currentLang]['not-filled'] || 'Belum diisi';
    if (displayAddress) displayAddress.textContent = currentUser.address?.fullAddress || translations[currentLang]['not-filled'] || 'Belum diisi';
    if (displayCity) displayCity.textContent = currentUser.address?.city || translations[currentLang]['not-filled'] || 'Belum diisi';
    if (displayPostalcode) displayPostalcode.textContent = currentUser.address?.postalCode || translations[currentLang]['not-filled'] || 'Belum diisi';
    if (displayPhone) displayPhone.textContent = currentUser.address?.phone || translations[currentLang]['not-filled'] || 'Belum diisi';


    // Isi formulir edit jika ada data alamat sebelumnya
    const addressForm = document.getElementById('address-form');
    if (addressForm) {
        addressForm.querySelector('#edit-fullname').value = currentUser.address?.fullname || '';
        addressForm.querySelector('#edit-address').value = currentUser.address?.fullAddress || '';
        addressForm.querySelector('#edit-city').value = currentUser.address?.city || '';
        addressForm.querySelector('#edit-postalcode').value = currentUser.address?.postalCode || '';
        addressForm.querySelector('#edit-phone').value = currentUser.address?.phone || '';
    }

    // Tambahkan terjemahan untuk "Belum diisi" jika belum ada
    if (!translations.id['not-filled']) {
        translations.id['not-filled'] = 'Belum diisi';
        translations.en['not-filled'] = 'Not filled yet';
    }
    translateUI(currentLang); // Terjemahkan teks "Belum diisi" jika ada.
}

function initAccountPage() {
    const editAddressBtn = document.getElementById('edit-address-btn');
    const addressForm = document.getElementById('address-form');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');

    if (!editAddressBtn || !addressForm || !cancelEditBtn) return;

    if (editAddressBtn && addressForm) {
        editAddressBtn.addEventListener('click', () => {
            addressForm.classList.add('visible-block'); // Tampilkan formulir
            editAddressBtn.classList.add('hidden-element'); // Sembunyikan tombol edit
            document.getElementById('address-info-display').classList.add('hidden-element'); // Sembunyikan info alamat
        });
    }

    if (cancelEditBtn && addressForm && editAddressBtn) {
        cancelEditBtn.addEventListener('click', () => {
            addressForm.classList.remove('visible-block'); // Sembunyikan formulir
            editAddressBtn.classList.remove('hidden-element'); // Tampilkan tombol edit
            document.getElementById('address-info-display').classList.remove('hidden-element'); // Tampilkan info alamat
        });
    }

    if (addressForm) {
        addressForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Dapatkan referensi tombol submit
            const submitButton = addressForm.querySelector('button[type="submit"]');
            const originalButtonKey = submitButton.dataset.translateKey;

            if (!validateForm(addressForm)) {
                return; // Hentikan jika form tidak valid
            }

            // 1. Nonaktifkan tombol dan ubah teksnya
            submitButton.disabled = true;
            submitButton.textContent = translations[currentLang]['btn-saving'];

            // Simulasi proses penyimpanan (beri jeda sedikit)
            setTimeout(() => {
                const { username } = checkLoginStatus();
                let allUsers = getLocalStorage('userAccounts', []);
                const currentUserIndex = allUsers.findIndex(user => user.username === username);

                if (currentUserIndex !== -1) {
                    allUsers[currentUserIndex].address = {
                        fullname: addressForm.querySelector('#edit-fullname').value.trim(),
                        fullAddress: addressForm.querySelector('#edit-address').value.trim(),
                        city: addressForm.querySelector('#edit-city').value.trim(),
                        postalCode: addressForm.querySelector('#edit-postalcode').value.trim(),
                        phone: addressForm.querySelector('#edit-phone').value.trim(),
                    };
                    setLocalStorage('userAccounts', allUsers);
                    showToast('toast-address-saved', 'success');
                    displayAccountInfo();

                    // Sembunyikan form dan tampilkan info lagi
                    addressForm.classList.remove('visible-block');
                    document.getElementById('edit-address-btn').classList.remove('hidden-element');
                    document.getElementById('address-info-display').classList.remove('hidden-element');
                } else {
                    showToast('toast-address-error', 'error');
                }

                // 2. Aktifkan kembali tombol dan kembalikan teks aslinya
                submitButton.disabled = false;
                submitButton.textContent = translations[currentLang][originalButtonKey];
                // ▲▲▲ AKHIR DARI LOGIKA BARU ▲▲▲
            }, 500); // Jeda 500ms untuk simulasi
        });
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

                const categoryElement = document.getElementById('product-category');
                if (categoryElement) {
                    categoryElement.textContent = translations[lang]?.categories?.[product.category] || product.category;
                }
            }
        }
    }

    // Cari elemen pesan "tidak ada hasil"
    const noResultsMessage = document.getElementById('no-results-message');
    if (noResultsMessage) {
        // Ambil kembali query yang tersimpan
        const query = noResultsMessage.dataset.query;
        // Ambil teks terjemahan yang baru
        const noResultText = translations[lang]['no-search-results'] || 'Tidak ada hasil';
        // Gabungkan lagi dan perbarui teksnya
        noResultsMessage.textContent = `${noResultText} "${query}".`;
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

    // PENTING: Panggil renderSummary jika di halaman checkout
    const checkoutPage = document.querySelector('.checkout-layout');
    if (checkoutPage) {
        // Panggil ulang kedua fungsi rendering untuk memperbarui tampilan
        // Pastikan session storage berisi data sebelum memanggil
        if (sessionStorage.getItem('checkoutItems') && sessionStorage.getItem('checkoutUserAddress')) {
            const selectedItems = JSON.parse(sessionStorage.getItem('checkoutItems'));
            renderCheckoutItems(selectedItems); // Perbarui item
        }
        renderCheckoutSummary(); // Perbarui ringkasan
    }
}

// =================================================================================
// == FEATURE: PRODUCT MANAGEMENT
// =================================================================================

/**
 * Creates and returns a single product card HTML element.
 * @param {object} product - A single product object from the API data.
 * @param {string} lang - The current language ('id' or 'en').
 * @returns {HTMLElement} The product card link element.
 */
function createProductCard(product, lang) {
    const cardLink = document.createElement('a');
    cardLink.className = 'product-card-link';

    const isIndexPage = window.location.pathname.endsWith('/index.html') || window.location.pathname === '/';
    cardLink.href = isIndexPage ? `html/detail.html?id=${product.id}` : `detail.html?id=${product.id}`;

    const card = document.createElement('article');
    card.className = 'product-card';

    const image = document.createElement('img');
    image.src = product.images[0];
    image.alt = product.titleId;

    image.onerror = () => {
        image.src = 'https://placehold.co/220x220?text=Gambar+Tidak+Ditemukan';
        console.warn(`Gambar untuk produk ${product.titleId} gagal dimuat.`);
    };

    const cardBody = document.createElement('div');
    cardBody.className = 'product-card-body';

    const title = document.createElement('h3');
    // 1. Simpan data terjemahan di dataset (untuk fungsi translateUI)
    title.dataset.titleId = product.titleId;
    title.dataset.titleEn = product.titleEn;
    // 2. Langsung isi teks sesuai bahasa saat ini
    title.textContent = lang === 'id' ? product.titleId : product.titleEn;

    const description = document.createElement('p');
    description.className = 'description';
    // 1. Simpan data terjemahan di dataset
    description.dataset.descriptionId = product.descriptionId;
    description.dataset.descriptionEn = product.descriptionEn;
    // 2. Langsung isi teks sesuai bahasa saat ini
    description.textContent = lang === 'id' ? product.descriptionId : product.descriptionEn;

    const cardFooter = document.createElement('div');
    cardFooter.className = 'product-card-footer';

    const price = document.createElement('span');
    price.className = 'price';
    price.textContent = `Rp ${parseInt(product.price).toLocaleString('id-ID')}`;

    const buyButton = document.createElement('button');
    buyButton.className = 'buy-btn';
    buyButton.dataset.productId = product.id;
    buyButton.dataset.translateKey = 'buy-button'; // Tetap gunakan ini untuk translateUI
    buyButton.textContent = translations[lang]['buy-button'];

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

    clearContainer(productGrid);

    const loadingElement = document.createElement('p');
    loadingElement.dataset.translateKey = 'loading-text';
    productGrid.appendChild(loadingElement);
    translateUI(currentLang);

    try {
        await ensureProductsLoaded();

        const recommendedProducts = allProductsData.filter(p => p.isRecommended === true);

        clearContainer(productGrid);

        recommendedProducts.forEach(product => {
            const cardElement = createProductCard(product, currentLang);
            productGrid.appendChild(cardElement);
        });

        const cards = productGrid.querySelectorAll('.product-card-link');
        cards.forEach((card, index) => {
            card.classList.add('animate');
        });

        translateUI(currentLang);

    } catch (error) {
        console.error('Failed to load products:', error);

        clearContainer(productGrid);

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
    const sortDropdown = document.getElementById('sort-products'); // Ambil dropdown baru

    if (!allProductsGrid || !categoryFiltersContainer || !sortDropdown) return;

    // Tampilkan skeleton loading awal
    clearContainer(allProductsGrid);
    for (let i = 0; i < 8; i++) {
        allProductsGrid.appendChild(createSkeletonCard());
    }

    try {
        await ensureProductsLoaded();

        // Buat tombol-tombol kategori
        const categories = ['Semua', ...new Set(allProductsData.map(p => p.category))];
        clearContainer(categoryFiltersContainer);
        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.dataset.category = category;
            if (category === 'Semua') button.classList.add('active');
            categoryFiltersContainer.appendChild(button);
        });

        // --- FUNGSI BARU UNTUK MENG-UPDATE TAMPILAN ---
        const updateProductsDisplay = () => {
            const selectedCategory = categoryFiltersContainer.querySelector('button.active').dataset.category;
            const sortBy = sortDropdown.value;

            // 1. FILTER PRODUK BERDASARKAN KATEGORI
            const filteredProducts = selectedCategory === 'Semua' ?
                allProductsData :
                allProductsData.filter(p => p.category === selectedCategory);

            // 2. BUAT SALINAN BARU UNTUK DISORTIR
            let productsToDisplay = [...filteredProducts];

            // 3. LOGIKA SORTIR BARU YANG LEBIH LENGKAP
            if (sortBy === 'price-asc') {
                productsToDisplay.sort((a, b) => a.price - b.price);
            } else if (sortBy === 'price-desc') {
                productsToDisplay.sort((a, b) => b.price - a.price);
            } else if (sortBy === 'name-asc') {
                productsToDisplay.sort((a, b) => (a.titleId || '').localeCompare(b.titleId || ''));
            } else if (sortBy === 'name-desc') {
                productsToDisplay.sort((a, b) => (b.titleId || '').localeCompare(a.titleId || ''));
            } else if (sortBy === 'stock-desc') {
                productsToDisplay.sort((a, b) => b.stock - a.stock);
            } else if (sortBy === 'stock-asc') {
                productsToDisplay.sort((a, b) => a.stock - b.stock);
            } else if (sortBy === 'location-asc' || sortBy === 'location-desc') {
                const { isLoggedIn, username } = checkLoginStatus();
                const allUsers = getLocalStorage('userAccounts', []);
                const currentUser = allUsers.find(user => user.username === username);
                const userAddress = currentUser ? currentUser.address : null;

                if (isLoggedIn && userAddress && userAddress.fullAddress) {
                    productsToDisplay.sort((a, b) => {
                        const costA = calculateShippingCost(a.address, userAddress);
                        const costB = calculateShippingCost(b.address, userAddress);
                        return sortBy === 'location-asc' ? costA - costB : costB - costA;
                    });
                } else {
                    // Jika user tidak login atau alamat tidak ada, beri peringatan
                    showToast('toast-sort-location-error', 'error');
                }
            }

            // 4. RENDER HASIL AKHIR
            renderProducts(productsToDisplay);
        };

        const renderProducts = (products) => {
            clearContainer(allProductsGrid);
            if (products.length === 0) {
                const noProductEl = document.createElement('p');
                noProductEl.textContent = 'Tidak ada produk dalam kategori ini.';
                allProductsGrid.appendChild(noProductEl);
                return;
            }
            products.forEach(product => {
                const cardElement = createProductCard(product, currentLang);
                allProductsGrid.appendChild(cardElement);
            });

            // Terapkan animasi fade-in
            const cards = allProductsGrid.querySelectorAll('.product-card-link');
            cards.forEach((card, index) => {
                card.classList.add('animate');
            });

            translateUI(currentLang);
        };

        // Tambahkan event listener ke container kategori dan dropdown sortir
        categoryFiltersContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                categoryFiltersContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                updateProductsDisplay(); // Panggil fungsi update
            }
        });

        sortDropdown.addEventListener('change', updateProductsDisplay);

        // Tampilkan produk untuk pertama kali saat halaman dimuat
        updateProductsDisplay();

    } catch (error) {
        console.error('Failed to load products:', error);
        clearContainer(allProductsGrid);
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
    const productFullAddressSpan = document.getElementById('product-full-address');
    const productSellerNameSpan = document.getElementById('product-seller-name');
    if (!productImagesContainer || !productFullAddressSpan || !productSellerNameSpan) return;

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (!productId) throw new Error("Product ID not found in URL");

        await ensureProductsLoaded();

        const product = allProductsData.find(p => p.id == productId);
        if (!product) throw new Error("Product not found");

        document.getElementById('add-to-cart-btn').dataset.productId = product.id;

        // Populate product details
        // document.getElementById('product-category').textContent = product.category;
        const categoryText = translations[currentLang]?.categories?.[product.category] || product.category;
        document.getElementById('product-category').textContent = categoryText;
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

        // START MODIFICATION FOR PRODUCT ADDRESS AND SELLER/STORE NAME IN JS
        // Asumsi: Nama toko adalah bagian pertama dari string address sebelum koma pertama
        const fullAddress = product.address || '';
        const firstCommaIndex = fullAddress.indexOf(',');
        let sellerName = translations[currentLang]['not-available'] || 'Tidak tersedia';
        if (firstCommaIndex !== -1) {
            sellerName = fullAddress.substring(0, firstCommaIndex).trim();
        } else if (fullAddress) {
            // Jika tidak ada koma tapi ada alamat, gunakan seluruh string sebagai nama toko
            sellerName = fullAddress.trim();
        }

        productSellerNameSpan.textContent = sellerName;
        productFullAddressSpan.textContent = product.address || translations[currentLang]['not-available'] || 'Tidak tersedia';

        // Populate image gallery
        clearContainer(productImagesContainer);
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

        const relatedProductsGrid = document.getElementById('related-products-grid');
        const relatedProductsSection = relatedProductsGrid.closest('.featured-products');

        if (relatedProductsGrid && relatedProductsSection) {
            clearContainer(relatedProductsGrid); // Bersihkan kontainer

            const currentCategory = product.category;
            const relatedProducts = allProductsData.filter(p =>
                p.category === currentCategory && p.id != productId // Cari produk di kategori yg sama, KECUALI produk ini sendiri
            ).slice(0, 6); // Ambil maksimal 6 produk

            if (relatedProducts.length > 0) {
                relatedProductsSection.classList.remove('hidden-element'); // Tampilkan section jika ada produk
                relatedProducts.forEach(relatedProduct => {
                    const card = createProductCard(relatedProduct, currentLang);
                    relatedProductsGrid.appendChild(card);
                });

                const cards = relatedProductsGrid.querySelectorAll('.product-card-link');
                cards.forEach((card, index) => {
                    card.style.animationDelay = `${index * 100}ms`;
                    card.classList.add('animate');
                });
            } else {
                relatedProductsSection.classList.add('hidden-element'); // Sembunyikan section jika tidak ada produk
            }
        }

    } catch (error) {
        console.error("Failed to display product detail:", error);
        const layout = document.querySelector('.product-detail-layout');
        if (layout) {
            clearContainer(layout);
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
            const p = document.createElement('p');
            p.textContent = 'Silakan masukkan kata kunci pencarian.';
            searchResultsGrid.appendChild(p);
            queryDisplay.textContent = '...';
            return;
        }

        // Tampilkan query pencarian di judul halaman
        // Mengambil 'Hasil untuk' atau 'Results for' dari kamus
        const titlePrefix = translations[currentLang]['page-title-search'];

        queryDisplay.textContent = query;
        document.title = `${titlePrefix} "${query}" - MineCart`;

        // Tampilkan pesan loading
        const loadingEl = document.createElement('p');
        loadingEl.dataset.translateKey = 'loading-text';
        searchResultsGrid.appendChild(loadingEl);

        translateUI(currentLang);

        // Ambil data produk jika belum ada
        await ensureProductsLoaded();

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
        clearContainer(searchResultsGrid);

        if (results.length > 0) {
            results.forEach(product => {
                const cardElement = createProductCard(product, currentLang);
                searchResultsGrid.appendChild(cardElement);
            });

            const cards = searchResultsGrid.querySelectorAll('.product-card-link');
            cards.forEach((card, index) => {
                card.classList.add('animate');
            });
        } else {
            // Jika tidak ada hasil
            const noResultEl = document.createElement('p');
            noResultEl.id = 'no-results-message'; // <-- Beri ID unik
            noResultEl.dataset.query = query;     // <-- Simpan query pencarian
            const noResultText = translations[currentLang]['no-search-results'] || 'Tidak ada hasil';
            noResultEl.textContent = `${noResultText} "${query}".`;
            searchResultsGrid.appendChild(noResultEl);
        }

        // Terjemahkan kartu produk yang baru dibuat
        translateUI(currentLang);

    } catch (error) {
        console.error('Failed to display search results:', error);
        const p = document.createElement('p');
        p.textContent = 'Terjadi kesalahan saat memuat hasil pencarian.';
        searchResultsGrid.appendChild(p);
    }
}


// =================================================================================
// == FEATURE: CART & CHECKOUT
// =================================================================================
/**
     * Adds a product to the cart or increments its quantity if it already exists.
     * @param {string} productId - The ID of the product to add.
     */
// Ganti fungsi addToCart Anda
function addToCart(productId) {
    const { username } = checkLoginStatus();
    const userCartKey = `cart_${username}`; // Kunci dinamis: 'cart_namauser'

    let cart = getLocalStorage(userCartKey, []);
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    setLocalStorage(userCartKey, cart);
    showToast('toast-add-success', 'success');
    updateCartCounter();
    updateCartPreview();
}

/**
 * Updates the cart preview dropdown in the header.
 */
async function updateCartPreview() {
    // Pastikan data produk dimuat HANYA jika pengguna sudah login
    const { isLoggedIn, username } = checkLoginStatus();
    if (isLoggedIn) {
        await ensureProductsLoaded();
    }

    const previewItemsContainer = document.getElementById('cart-preview-items');
    const previewTitle = document.getElementById('cart-preview-title');
    const viewCartLink = document.getElementById('cart-preview-view-link');
    if (!previewItemsContainer || !previewTitle || !viewCartLink) return;

    clearContainer(previewItemsContainer);

    // Tentukan path yang benar untuk link
    const onIndexPage = window.location.pathname.endsWith('/index.html') || window.location.pathname === '/';
    const cartPagePath = onIndexPage ? 'html/cart.html' : 'cart.html';
    const loginPagePath = onIndexPage ? 'html/login.html' : 'login.html';

    if (isLoggedIn) {
        // --- LOGIKA UNTUK PENGGUNA YANG SUDAH LOGIN ---
        const userCartKey = `cart_${username}`;
        const cart = getLocalStorage(userCartKey, []);

        const titleText = translations[currentLang]['cart-title'];
        previewTitle.textContent = `${titleText} (${cart.length})`;

        viewCartLink.href = cartPagePath;
        viewCartLink.dataset.translateKey = 'view-cart-btn';
        viewCartLink.textContent = translations[currentLang]['view-cart-btn'];

        if (cart.length === 0) {
            const emptyText = document.createElement('p');
            emptyText.className = 'empty-preview';
            emptyText.dataset.translateKey = 'empty-cart-message';
            emptyText.textContent = translations[currentLang]['empty-cart-message'];
            previewItemsContainer.appendChild(emptyText);
        } else {
            const recentItems = [...cart].reverse().slice(0, 3);
            recentItems.forEach(item => {
                const product = allProductsData.find(p => p.id == item.id);
                if (product) {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'cart-preview-item';
                    const img = document.createElement('img');
                    img.src = product.images[0];
                    const infoDiv = document.createElement('div');
                    infoDiv.className = 'cart-preview-item-info';
                    const title = document.createElement('h5');
                    title.textContent = currentLang === 'id' ? product.titleId : product.titleEn;
                    const price = document.createElement('p');
                    price.className = 'price';
                    price.textContent = `Rp ${parseInt(product.price).toLocaleString('id-ID')}`;
                    infoDiv.append(title, price);
                    itemDiv.append(img, infoDiv);
                    previewItemsContainer.appendChild(itemDiv);
                }
            });
        }
    } else {
        // --- LOGIKA BARU UNTUK PENGGUNA YANG BELUM LOGIN ---
        previewTitle.textContent = translations[currentLang]['cart-title']; // Tampilkan judul tanpa jumlah

        const loginMessage = document.createElement('p');
        loginMessage.className = 'empty-preview';
        loginMessage.dataset.translateKey = 'cart-must-login';
        loginMessage.textContent = translations[currentLang]['cart-must-login'];
        previewItemsContainer.appendChild(loginMessage);

        viewCartLink.href = loginPagePath;
        viewCartLink.dataset.translateKey = 'login';
        viewCartLink.textContent = translations[currentLang]['login'];
    }
}

/**
* Updates the cart counter icon in the header.
*/
// Ganti fungsi updateCartCounter Anda
function updateCartCounter() {
    const { isLoggedIn, username } = checkLoginStatus();
    const counterElement = document.getElementById('cart-counter');
    if (!counterElement) return;

    if (!isLoggedIn) {
        // Jika tidak login, sembunyikan counter
        counterElement.classList.remove('visible');
        counterElement.textContent = '0';
        return;
    }

    const userCartKey = `cart_${username}`;
    const cart = getLocalStorage(userCartKey, []);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    counterElement.textContent = totalItems;
    counterElement.classList.toggle('visible', totalItems > 0);
}

/**
* FUNGSI BARU: Mengubah kuantitas atau menghapus item dari keranjang
* @param {string} productId - ID produk yang akan diubah
* @param {number} change - Jumlah perubahan (+1, -1, atau 0 untuk hapus)
*/
// GANTI SEMUA FUNGSI LAMA DENGAN BLOK BARU INI

function updateCart(productId, change) {
    const { username } = checkLoginStatus();
    const userCartKey = `cart_${username}`;
    let cart = getLocalStorage(userCartKey, []);
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex > -1) {
        if (change === 0) { // Angka 0 berarti hapus
            showToast('toast-remove-item', 'success');
            cart.splice(productIndex, 1);
        } else { // Ubah kuantitas
            cart[productIndex].quantity += change;
            if (cart[productIndex].quantity <= 0) {
                showToast('toast-remove-item', 'success');
                cart.splice(productIndex, 1);
            }
        }
    }
    setLocalStorage(userCartKey, cart);
    displayCart();
    updateCartCounter();
    saveSelectedCartItems();
}

/**
 * Menyelaraskan status checkbox "Select All" berdasarkan checkbox item.
 */
function syncSelectAllCheckbox() {
    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    const itemsContainer = document.getElementById('cart-items-container');
    if (!selectAllCheckbox || !itemsContainer) return;

    const allItemCheckboxes = itemsContainer.querySelectorAll('.cart-item-select input');

    // Jika tidak ada item di keranjang, pastikan "Select All" tidak terceklis.
    if (allItemCheckboxes.length === 0) {
        selectAllCheckbox.checked = false;
        return;
    }

    // Cek apakah SEMUA checkbox item sedang dalam keadaan terceklis.
    const allChecked = Array.from(allItemCheckboxes).every(cb => cb.checked);

    // Atur status "Select All" sesuai hasilnya.
    selectAllCheckbox.checked = allChecked;
}

function updateCartSummary() {
    const cartSummaryContainer = document.getElementById('cart-summary');
    if (!cartSummaryContainer) return;

    // Bersihkan kontainer
    clearContainer(cartSummaryContainer);

    const { isLoggedIn, username } = checkLoginStatus();
    if (!isLoggedIn) {
        // Ini seharusnya sudah ditangani oleh displayCart, tapi sebagai jaga-jaga
        const emptyText = document.createElement('p');
        emptyText.textContent = translations[currentLang]['cart-must-login'];
        cartSummaryContainer.appendChild(emptyText);
        translateUI(currentLang);
        return;
    }
    const userCartKey = `cart_${username}`;
    const cart = getLocalStorage(userCartKey, []);

    // --- Ambil alamat pengguna yang sedang login dari localStorage ---
    const allUsers = getLocalStorage('userAccounts', [])
    const currentUser = allUsers.find(user => user.username === username);
    const userAddress = currentUser ? currentUser.address : null; // Dapatkan objek alamat pengguna

    // Jika user belum mengisi alamat, kita tidak bisa menghitung ongkir spesifik
    // Anda bisa memilih untuk memberikan pesan error, biaya flat, atau 0
    if (!userAddress || !userAddress.fullAddress || !userAddress.city || !userAddress.postalCode) {
        const warningMessage = document.createElement('p');
        warningMessage.classList.add('warning-message'); // Beri warna peringatan
        warningMessage.dataset.translateKey = 'shipping-address-missing';
        cartSummaryContainer.appendChild(warningMessage);
        // Kita masih bisa menampilkan subtotal, tapi ongkir akan 0 atau flat default
    }

    const selectedProductIds = getSelectedProductIds();
    const selectedItems = cart.filter(item => selectedProductIds.includes(item.id));

    const summaryTitle = document.createElement('h2');
    summaryTitle.dataset.translateKey = 'summary-title';
    cartSummaryContainer.appendChild(summaryTitle);

    if (selectedItems.length === 0) {
        const emptyText = document.createElement('p');
        emptyText.dataset.translateKey = 'summary-empty-cart';
        cartSummaryContainer.appendChild(emptyText);
        translateUI(currentLang);
        return;
    }

    let subtotal = 0;
    let totalShippingCost = 0; // Inisialisasi total ongkir

    selectedItems.forEach(cartItem => {
        const productDetail = allProductsData.find(p => p.id == cartItem.id);
        if (productDetail) {
            subtotal += productDetail.price * cartItem.quantity;

            // --- HITUNG ONGKIR PER PRODUK DAN TAMBAHKAN KE TOTAL ---
            // Pastikan productDetail.address ada dan userAddress sudah tersedia
            if (productDetail.address && userAddress && userAddress.fullAddress) {
                totalShippingCost += calculateShippingCost(productDetail.address, userAddress);
            } else {
                // Jika alamat produk atau alamat pengguna tidak lengkap, gunakan ongkir default/flat
                // Anda bisa menyesuaikan nilai ini
                totalShippingCost += 15000; // Contoh: flat fee jika alamat tidak lengkap
            }
        }
    });

    const total = subtotal + totalShippingCost; // Gunakan totalShippingCost

    // Membuat semua elemen dengan createElement
    const subtotalP = document.createElement('p');
    const subtotalTextSpan = document.createElement('span');
    subtotalTextSpan.textContent = `${translations[currentLang]['summary-subtotal']} (${selectedItems.length} ${translations[currentLang]['summary-items']})`;
    const subtotalValueSpan = document.createElement('span');
    subtotalValueSpan.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    subtotalP.append(subtotalTextSpan, subtotalValueSpan);

    const shippingP = document.createElement('p');
    const shippingTextSpan = document.createElement('span');
    shippingTextSpan.dataset.translateKey = 'summary-shipping';
    const shippingValueSpan = document.createElement('span');
    shippingValueSpan.textContent = `Rp ${totalShippingCost.toLocaleString('id-ID')}`; // Tampilkan total ongkir
    shippingP.append(shippingTextSpan, shippingValueSpan);

    const hr = document.createElement('hr');

    const totalP = document.createElement('p');
    totalP.className = 'total';
    const totalTextSpan = document.createElement('span');
    totalTextSpan.dataset.translateKey = 'summary-total';
    const totalValueSpan = document.createElement('span');
    totalValueSpan.textContent = `Rp ${total.toLocaleString('id-ID')}`;
    totalP.append(totalTextSpan, totalValueSpan);

    const checkoutBtn = document.createElement('button');
    checkoutBtn.className = 'cta-button';
    checkoutBtn.classList.add('checkout-btn-full-width');
    checkoutBtn.dataset.translateKey = 'summary-checkout-btn';

    checkoutBtn.addEventListener('click', () => {
        const { isLoggedIn, username } = checkLoginStatus();
        if (!isLoggedIn) {
            showToast('cart-must-login', 'error');
            setTimeout(() => { window.location.href = '../html/login.html'; }, 1500);
            return;
        }

        const userCartKey = `cart_${username}`;
        const cart = getLocalStorage(userCartKey, []);
        const selectedProductIds = getSelectedProductIds();
        const selectedItemsForCheckout = cart.filter(item => selectedProductIds.includes(item.id));

        if (selectedItemsForCheckout.length === 0) {
            showToast('toast-checkout-no-items', 'error');
            return;
        }

        // --- Cek apakah alamat pengguna sudah lengkap ---
        const allUsers = getLocalStorage('userAccounts', [])
        const currentUser = allUsers.find(user => user.username === username);
        const userAddress = currentUser ? currentUser.address : null;

        if (!userAddress || !userAddress.fullAddress || !userAddress.city || !userAddress.postalCode) {
            showToast('toast-checkout-no-address', 'error');
            // Opsional: Langsung arahkan ke halaman akun untuk melengkapi alamat
            setTimeout(() => { window.location.href = '../html/account.html'; }, 2000);
            return;
        }

        // --- SIMPAN ITEM YANG DIPILIH KE SESSION STORAGE UNTUK HALAMAN CHECKOUT ---
        sessionStorage.setItem('checkoutItems', JSON.stringify(selectedItemsForCheckout));
        sessionStorage.setItem('checkoutUserAddress', JSON.stringify(userAddress));

        // --- REDIRECT KE HALAMAN CHECKOUT ---
        window.location.href = 'checkout.html';
    });

    cartSummaryContainer.append(summaryTitle, subtotalP, shippingP, hr, totalP, checkoutBtn);
    translateUI(currentLang);
}

/**
 * Menyimpan ID produk yang sedang terceklis di keranjang ke localStorage.
 */
function saveSelectedCartItems() {
    const { isLoggedIn, username } = checkLoginStatus();
    if (!isLoggedIn) return;

    const selectedProductIds = getSelectedProductIds(); // Fungsi ini sudah ada
    const selectedItemsKey = `selectedItems_${username}`;
    setLocalStorage(selectedItemsKey, selectedProductIds);
}

async function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSummaryContainer = document.getElementById('cart-summary');
    const cartHeader = document.querySelector('.cart-header'); // Dapatkan elemen cart-header
    if (!cartItemsContainer || !cartSummaryContainer || !cartHeader) return;

    const { isLoggedIn, username } = checkLoginStatus();

    // Jika tidak ada yang login, tampilkan pesan dan berhenti
    if (!isLoggedIn) {
        // Buat elemen paragraf baru
        const loginMessage = document.createElement('p');
        // Beri penanda terjemahan
        loginMessage.dataset.translateKey = 'cart-must-login';

        // Kosongkan kontainer dan tambahkan pesan baru
        clearContainer(cartItemsContainer)
        cartItemsContainer.appendChild(loginMessage);

        // Sembunyikan elemen lain yang tidak perlu
        if (cartSummaryContainer) cartSummaryContainer.classList.add('hidden-element');
        if (cartHeader) cartHeader.classList.add('hidden-element');

        // Panggil fungsi terjemahan untuk mengisi teks
        translateUI(currentLang);
        return;
    }

    const userCartKey = `cart_${username}`;
    const cart = getLocalStorage(userCartKey, []);

    // Pastikan selectAllCheckbox diinisialisasi ulang atau dicek keberadaannya
    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    if (!selectAllCheckbox) {
        // Ini seharusnya tidak terjadi jika HTML sudah ada, tapi sebagai jaga-jaga
        console.warn('Select All checkbox not found in DOM.');
        return;
    }

    clearContainer(cartItemsContainer);

    if (cart.length === 0) {
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = translations[currentLang]['empty-cart-message'] || 'Keranjang Anda kosong.';
        cartItemsContainer.appendChild(emptyCartMessage);
        const cartSummary = document.getElementById('cart-summary');
        const cartHeader = document.querySelector('.cart-header');
        if (cartSummary) cartSummary.classList.add('hidden-element');
        if (cartHeader) cartHeader.classList.add('hidden-element');
        translateUI(currentLang);
        return;
    } else {
        const cartSummary = document.getElementById('cart-summary');
        const cartHeader = document.querySelector('.cart-header');
        if (cartSummary) cartSummary.classList.remove('hidden-element');
        if (cartHeader) cartHeader.classList.remove('hidden-element'); // Tampilkan kembali cart-header
    }

    try {
        await ensureProductsLoaded();

        cart.forEach(cartItem => {
            const productDetail = allProductsData.find(p => p.id == cartItem.id);
            if (productDetail) {
                // Membuat semua elemen dengan createElement
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';

                const selectDiv = document.createElement('div');
                selectDiv.className = 'cart-item-select';
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.dataset.productId = productDetail.id;
                const userCartKey = `cart_${username}`;
                const selectedItemsKey = `selectedItems_${username}`;
                const selectedItems = getLocalStorage(selectedItemsKey, cart.map(item => item.id)); // Default pilih semua jika belum ada data

                checkbox.checked = selectedItems.includes(productDetail.id);
                checkbox.addEventListener('change', updateCartSummary); // Listener untuk checkbox item
                selectDiv.appendChild(checkbox);

                const image = document.createElement('img');
                image.src = productDetail.images[0];
                image.alt = productDetail.titleId;

                const infoDiv = document.createElement('div');
                infoDiv.className = 'cart-item-info';
                const title = document.createElement('h3');
                title.dataset.titleId = productDetail.titleId;
                title.dataset.titleEn = productDetail.titleEn;
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
                minusBtn.className = 'quantity-btn';
                minusBtn.textContent = '-';
                minusBtn.dataset.productId = productDetail.id;
                minusBtn.dataset.change = -1;

                const quantitySpan = document.createElement('span');
                quantitySpan.textContent = cartItem.quantity;

                const plusBtn = document.createElement('button');
                plusBtn.className = 'quantity-btn';
                plusBtn.textContent = '+';
                plusBtn.dataset.productId = productDetail.id;
                plusBtn.dataset.change = 1;

                // pembatasan stok:
                if (cartItem.quantity >= productDetail.stock) {
                    plusBtn.disabled = true;
                } else {
                    plusBtn.disabled = false;
                }

                quantityDiv.appendChild(minusBtn);
                quantityDiv.appendChild(quantitySpan);
                quantityDiv.appendChild(plusBtn);

                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-btn';
                removeBtn.dataset.translateKey = 'remove-item';
                removeBtn.dataset.productId = productDetail.id;
                removeBtn.textContent = translations[currentLang]['remove-item'];

                actionsDiv.appendChild(quantityDiv);
                actionsDiv.appendChild(removeBtn);

                itemElement.appendChild(selectDiv);
                itemElement.appendChild(image);
                itemElement.appendChild(infoDiv);
                itemElement.appendChild(actionsDiv);
                cartItemsContainer.appendChild(itemElement);
            }
        });

        updateCartSummary();
        translateUI(currentLang);
        syncSelectAllCheckbox();

        // Pasang event listener untuk "Pilih Semua"
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', () => {
                const allCheckboxes = cartItemsContainer.querySelectorAll('.cart-item-select input');
                allCheckboxes.forEach(cb => {
                    cb.checked = selectAllCheckbox.checked;
                });
                updateCartSummary();
            });
        }

    } catch (error) {
        console.error("Gagal memuat data keranjang:", error);
    }
}

async function processOrder(orderedItems, username) {
    // Logika pengurangan stok (simulasi, karena API tidak menyediakan endpoint update)
    let hasStockIssues = false;

    orderedItems.forEach(orderedItem => {
        const productIndex = allProductsData.findIndex(p => p.id == orderedItem.id);
        if (productIndex !== -1) {
            if (allProductsData[productIndex].stock >= orderedItem.quantity) {
                allProductsData[productIndex].stock -= orderedItem.quantity;
            } else {
                console.error(`Stok tidak cukup untuk produk ID: ${orderedItem.id}`);
                hasStockIssues = true;
            }
        }
    });

    if (hasStockIssues) {
        showToast('toast-stock-issue', 'error');
        return false; // Hentikan proses jika ada masalah stok
    }

    let savedStock = getLocalStorage('productStockData', {});
    orderedItems.forEach(orderedItem => {
        const updatedProduct = allProductsData.find(p => p.id == orderedItem.id);
        if (updatedProduct) {
            savedStock[orderedItem.id] = updatedProduct.stock;
        }
    });
    setLocalStorage('productStockData', savedStock);

    // Kosongkan keranjang pengguna setelah pesanan berhasil
    const userCartKey = `cart_${username}`;
    let currentCart = getLocalStorage(userCartKey, []);
    const orderedItemIds = orderedItems.map(item => item.id);
    const updatedCart = currentCart.filter(item => !orderedItemIds.includes(item.id));
    setLocalStorage(userCartKey, updatedCart);
    updateCartCounter();

    return true;
}

async function initCheckoutPage() {
    const checkoutPage = document.querySelector('.checkout-layout');
    if (!checkoutPage) return; // Hanya jalankan jika di halaman checkout

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
            await ensureProductsLoaded();
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

    let subtotal = 0;
    let totalShippingCost = 0;

    selectedItems.forEach(cartItem => {
        const productDetail = allProductsData.find(p => p.id == cartItem.id);
        if (productDetail) {
            subtotal += productDetail.price * cartItem.quantity;
            if (productDetail.address && userAddress && userAddress.fullAddress) {
                totalShippingCost += calculateShippingCost(productDetail.address, userAddress);
            } else {
                totalShippingCost += 15000;
            }
        }
    });

    // PENTING: Panggil fungsi render item di sini
    renderCheckoutItems(selectedItems);

    // Buat objek state untuk meneruskan data
    const checkoutTotalSummary = document.getElementById('checkout-total-summary');
    const checkoutState = {
        selectedItems,
        userAddress,
        subtotal,
        totalShippingCost
    };

    // Panggil fungsi render summary dengan data yang benar
    renderCheckoutSummary(checkoutTotalSummary, checkoutState);

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Mencegah halaman me-reload

            // 1. Validasi apakah metode pembayaran sudah dipilih
            const selectedPaymentMethod = checkoutForm.querySelector('input[name="paymentMethod"]:checked');
            if (!selectedPaymentMethod) {
                showToast('toast-no-payment-method', 'error');
                return; // Hentikan proses jika belum memilih
            }

            // 2. Ambil data item yang dipesan dari session storage
            const orderedItemsJSON = sessionStorage.getItem('checkoutItems');
            if (!orderedItemsJSON) {
                showToast('toast-checkout-data-missing', 'error');
                return;
            }
            const orderedItems = JSON.parse(orderedItemsJSON);

            // 3. Panggil fungsi processOrder yang sudah ada
            const { username } = checkLoginStatus();
            if (username) {
                const success = await processOrder(orderedItems, username);
                if (!success) return; // Stop jika gagal, jangan lanjut ke toast sukses
            }

            // 4. Tampilkan notifikasi sukses
            showToast('toast-order-success', 'success');

            // 5. Hapus data dari session storage agar tidak bisa di-checkout ulang
            sessionStorage.removeItem('checkoutItems');
            sessionStorage.removeItem('checkoutUserAddress');

            // 6. Arahkan pengguna kembali ke halaman utama setelah 2 detik
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        });
    }
    const changeAddressBtn = document.getElementById('change-address-btn');
    if (changeAddressBtn) {
        changeAddressBtn.addEventListener('click', () => {
            window.location.href = 'account.html'; // <-- PERBAIKAN DI SINI
        });
    }
}

function renderCheckoutSummary() {
    // Ambil elemen-elemen yang relevan dari DOM
    const checkoutTotalSummary = document.getElementById('checkout-total-summary');
    const summarySubtotalLabelSpan = document.getElementById('summary-subtotal-label'); // Elemen baru untuk label
    const summarySubtotalPriceSpan = document.getElementById('summary-subtotal-price'); // Elemen baru untuk harga
    const summaryShippingPriceSpan = document.getElementById('summary-shipping-price');
    const checkoutShippingTimeSpan = document.getElementById('checkout-shipping-time');
    const summaryTotalPriceSpan = document.getElementById('summary-total-price');

    // Guard clause untuk memastikan semua elemen ada
    if (!checkoutTotalSummary || !summarySubtotalLabelSpan || !summarySubtotalPriceSpan || !summaryShippingPriceSpan || !checkoutShippingTimeSpan || !summaryTotalPriceSpan) return;

    // Ambil data dari session storage
    const selectedItemsJSON = sessionStorage.getItem('checkoutItems');
    const userAddressJSON = sessionStorage.getItem('checkoutUserAddress');
    if (!selectedItemsJSON || !userAddressJSON) return;

    const selectedItems = JSON.parse(selectedItemsJSON);
    const userAddress = JSON.parse(userAddressJSON);

    if (allProductsData.length === 0) return;

    // Lakukan perhitungan ulang subtotal dan ongkir
    let subtotal = 0;
    let totalShippingCost = 0;
    selectedItems.forEach(cartItem => {
        const productDetail = allProductsData.find(p => p.id == cartItem.id);
        if (productDetail) {
            subtotal += productDetail.price * cartItem.quantity;
            if (productDetail.address && userAddress && userAddress.fullAddress) {
                totalShippingCost += calculateShippingCost(productDetail.address, userAddress);
            } else {
                totalShippingCost += 15000; // Ongkir default jika alamat tidak lengkap
            }
        }
    });

    const total = subtotal + totalShippingCost;

    // Hitung estimasi waktu pengiriman
    let shippingTime = translations[currentLang]['not-available'];
    if (selectedItems.length > 0 && userAddress && userAddress.fullAddress) {
        const firstProduct = allProductsData.find(p => p.id == selectedItems[0].id);
        if (firstProduct && firstProduct.address) {
            const timeArray = calculateShippingTime(firstProduct.address, userAddress);
            const daysText = translations[currentLang]['shipping-time-days'] || 'hari';
            shippingTime = `${timeArray[0]} - ${timeArray[1]} ${daysText}`;
        }
    }

    // === PERBARUI TAMPILAN DENGAN LOGIKA BARU ===

    // 1. Buat label subtotal secara dinamis
    const subtotalText = translations[currentLang]['summary-subtotal'] || 'Subtotal';
    const itemsCount = selectedItems.length;
    const itemsText = translations[currentLang]['summary-items'] || (itemsCount > 1 ? 'items' : 'item');
    summarySubtotalLabelSpan.textContent = `${subtotalText} (${itemsCount} ${itemsText})`;

    // 2. Perbarui semua harga dan informasi lainnya
    summarySubtotalPriceSpan.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    summaryShippingPriceSpan.textContent = `Rp ${totalShippingCost.toLocaleString('id-ID')}`;
    checkoutShippingTimeSpan.textContent = shippingTime;
    summaryTotalPriceSpan.textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

// --- FUNGSI UNTUK MERENDER DAFTAR ITEM CHECKOUT ---
function renderCheckoutItems(selectedItems) {
    const checkoutItemsSummary = document.getElementById('checkout-items-summary');
    if (!checkoutItemsSummary) return;

    clearContainer(checkoutItemsSummary);

    const quantityText = translations[currentLang]['cart-quantity'] || 'Jumlah:'; // Ambil teks "Jumlah"

    selectedItems.forEach(cartItem => {
        const productDetail = allProductsData.find(p => p.id == cartItem.id);
        if (productDetail) {
            const itemCard = document.createElement('div');
            itemCard.className = 'checkout-item-card';

            const itemImage = document.createElement('img');
            itemImage.src = productDetail.images[0];
            itemImage.alt = productDetail.titleId;

            const itemDetails = document.createElement('div');
            itemDetails.className = 'checkout-item-details';

            const itemTitle = document.createElement('h4');
            itemTitle.dataset.titleId = productDetail.titleId;
            itemTitle.dataset.titleEn = productDetail.titleEn;
            itemTitle.textContent = `${currentLang === 'id' ? productDetail.titleId : productDetail.titleEn}`;

            const itemQuantity = document.createElement('p');
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

/**
 * Calculates the shipping cost for a given product from product location to user address.
 * @param {string} productAddress - The full address string of the product (e.g., "Harco Mangga Dua, Lantai 3, Blok B No. 5, Jakarta Pusat, DKI Jakarta").
 * @param {object} userAddress - The user's address object {city: "...", postalCode: "...", fullAddress: "..."}.
 * @returns {number} The calculated shipping cost.
 */
function calculateShippingCost(productAddress, userAddress) {
    // Jika alamat user tidak lengkap atau tidak memiliki data yang cukup
    if (!userAddress || (!userAddress.city && !userAddress.fullAddress)) {
        return 0; // Kembalikan 0 ongkir jika tidak ada info tujuan
    }

    const originInfo = extractCityAndProvince(productAddress);
    // Untuk alamat tujuan pengguna, gunakan fullAddress jika ada, jika tidak, gunakan city saja
    const destinationInfo = extractCityAndProvince(userAddress.fullAddress || userAddress.city);

    const originCityKey = originInfo.city; // Contoh: 'jakarta'
    const originProvince = originInfo.province; // Contoh: 'DKI Jakarta'

    const destinationCityKey = destinationInfo.city; // Contoh: 'bandung'
    const destinationProvince = destinationInfo.province; // Contoh: 'Jawa Barat'

    const originData = shippingCostsData[originCityKey];

    // Fallback jika kota asal produk tidak dikenali dalam data ongkir kita
    if (!originData) {
        console.warn(`Origin city "${originCityKey}" not found in shippingCostsData for address: ${productAddress}. Using default shipping.`);
        return 15000; // Default flat rate jika asal produk tidak dikenal
    }

    // --- LOGIKA PERHITUNGAN ONGKIR ---

    // 1. Cek apakah kota asal produk dan kota tujuan pengguna SAMA PERSIS
    // Gunakan kunci kota yang dinormalisasi (lowercase) untuk perbandingan
    if (originCityKey && destinationCityKey && originCityKey === destinationCityKey) {
        return originData.baseCost; // Ongkir dalam kota
    }

    // 2. Cek apakah masih dalam "Provinsi" yang sama
    // Contoh: Produk dari Bandung (Jawa Barat), User dari Bogor (Jawa Barat)
    if (originProvince && destinationProvince && originProvince === destinationProvince) {
        return originData.baseCost * 1.5; // Ongkir antar kota dalam "provinsi" yang sama (1.5x lebih mahal)
    }

    // 3. Jika tidak dalam kota yang sama dan tidak dalam provinsi yang sama, maka Antar Provinsi
    return originData.interProvincialCost; // Ongkir antar provinsi
}

/**
 * Calculates the estimated shipping time based on product and user location.
 * @param {string} productAddress - The full address string of the product.
 * @param {object} userAddress - The user's address object.
 * @returns {string} The estimated shipping time.
 */
function calculateShippingTime(productAddress, userAddress) {
    // Jika alamat user tidak lengkap, kembalikan pesan error
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

    // Fallback jika kota asal produk tidak dikenali
    if (!originData) {
        return 'Waktu tidak dapat dihitung.';
    }

    // --- LOGIKA PERHITUNGAN WAKTU ---
    if (originCityKey && destinationCityKey && originCityKey === destinationCityKey) {
        return shippingTimesData.intraCity;
    }

    if (originProvince && destinationProvince && originProvince === destinationProvince) {
        return shippingTimesData.intraProvince;
    }

    return shippingTimesData.interProvince;
}


// Fungsi pembantu untuk menguraikan string alamat menjadi kota dan provinsi
function extractCityAndProvince(fullAddressString) {
    if (!fullAddressString) return { city: '', province: '' };

    const lowerCaseAddress = fullAddressString.toLowerCase();
    let city = '';
    let province = '';

    // Prioritas 1: Deteksi kota yang ada di shippingCostsData
    for (const key in shippingCostsData) {
        if (lowerCaseAddress.includes(key)) {
            city = key; // Gunakan kunci kota yang dinormalisasi (lowercase)
            province = shippingCostsData[key].province; // Ambil provinsinya langsung dari data ongkir
            break; // Hentikan setelah kota pertama ditemukan
        }
    }

    // Prioritas 2: Jika kota tidak terdeteksi dari shippingCostsData, coba deteksi provinsi dari string
    // Ini sebagai fallback jika nama kota tidak ada di shippingCostsData, tapi provinsinya jelas
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

// =================================================================================
// == FEATURE: UI COMPONENTS
// =================================================================================
/**
     * Initializes the hero carousel functionality.
     */
function initializeCarousel() {
    // Penjaga: pastikan semua elemen ada sebelum menjalankan
    if (!carouselContainer || !prevBtn || !nextBtn || !heroSection) return;

    const slides = document.querySelectorAll('.carousel-slide');
    const slideCount = slides.length;
    let currentIndex = 0;
    let slideInterval;

    function goToSlide(index) {
        // 1. Hapus semua class posisi slide sebelumnya
        carouselContainer.classList.remove('slide-1', 'slide-2', 'slide-3');

        // 2. Tambahkan class posisi yang baru sesuai index
        // (index 0 jadi slide-1, index 1 jadi slide-2, dst.)
        carouselContainer.classList.add(`slide-${index + 1}`);

        // 3. Simpan index saat ini
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

    goToSlide(0);
    startSlideShow();
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

            updateCartPreview();
            // Periksa apakah kita di halaman keranjang, jika ya, perbarui ringkasannya
            if (document.querySelector('.cart-section')) {
                updateCartSummary();
            }

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
            const isActive = mainNav.classList.toggle('is-active');
            // Panggil fungsi update setiap kali menu dibuka
            if (isActive) {
                updateMobileNavState();
            }
        });
    }
}

// Tambahkan fungsi ini di script.js
// function initFaqAccordion() {
//     const faqContainer = document.querySelector('.faq-container');
//     if (!faqContainer) return;

//     faqContainer.addEventListener('click', e => {
//         const question = e.target.closest('.faq-question');
//         if (question) {
//             question.classList.toggle('active');
//         }
//     });
// }

function initializeCSPopup() {
    const popup = document.getElementById('cs-popup');
    if (!popup) return;

    const hasBeenClosed = localStorage.getItem('cs_popup_closed') === 'true';

    // Tampilkan pop-up jika ini kunjungan pertama dan belum ditutup
    if (!hasBeenClosed) {
        // Hapus class 'hidden-element' agar pop-up terlihat
        popup.classList.remove('hidden-element');

        // Tunda penampilan pop-up agar tidak terlalu mengganggu
        setTimeout(() => {
            popup.classList.add('is-active');
        }, 2000); // Muncul setelah 2 detik
    }

    const closeBtn = popup.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('is-active');
            localStorage.setItem('cs_popup_closed', 'true'); // Simpan status ditutup
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // =================================================================================
    // == INITIALIZATION & GLOBAL EVENT LISTENERS
    // =================================================================================
    const { isLoggedIn } = checkLoginStatus();
    if (isLoggedIn) {
        document.body.classList.add('user-is-logged-in');
    } else {
        document.body.classList.add('user-is-logged-out');
    }

    // Apply saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // 2. Set up UI components
    updateAccountMenu();
    updateCartCounter();
    updateCartPreview();
    initializeCarousel();
    initializeLanguageDropdown();
    initializeHamburgerMenu();

    // 3. Display products based on the current page

    if (document.querySelector('.featured-products')) {
        displayFeaturedProducts();
        initializeCSPopup();
    }
    if (document.getElementById('all-products-grid')) {
        displayAllProducts();
    }
    if (document.getElementById('product-images')) {
        displayProductDetail();
    }
    if (document.querySelector('.cart-section')) {
        displayCart();
    }
    if (document.querySelector('.account-details')) {
        displayAccountInfo();
        initAccountPage();
    }
    // if (document.querySelector('.faq-container')) {
    //     initFaqAccordion();
    // }
    if (document.getElementById('search-results-grid')) {
        displaySearchResults();
    }
    if (document.querySelector('.checkout-layout')) {
        initCheckoutPage();
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!validateForm(registerForm)) return;

            // Ambil nilai dari form
            const username = registerForm.querySelector('#username').value;
            const email = registerForm.querySelector('#email').value;
            const password = registerForm.querySelector('#password').value;
            // ... (ambil data lain: dob, gender)

            // 1. Ambil daftar pengguna yang sudah ada dari localStorage
            let users = getLocalStorage('userAccounts', [])

            // 2. Cek apakah email sudah ada
            const emailExists = users.find(user => user.email === email);

            if (emailExists) {
                // Jika email sudah terdaftar, tampilkan notifikasi error
                showToast('toast-email-exists', 'error');
                return;
            }

            // 3. Jika aman, tambahkan pengguna baru ke daftar
            const newUserAccount = { username, email, password, /*... dob, gender ...*/ };
            users.push(newUserAccount);

            // 4. Simpan kembali seluruh daftar pengguna ke localStorage
            setLocalStorage('userAccounts', users);

            showToast('toast-register-success', 'success');
            setTimeout(() => { window.location.href = 'login.html'; }, 1500);
        });
    }

    // Ganti blok logika form login Anda dengan ini

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!validateForm(loginForm)) return;

            const username = loginForm.querySelector('#username').value;
            const password = loginForm.querySelector('#password').value;

            // 1. Ambil DAFTAR (ARRAY) semua pengguna
            const allUsers = getLocalStorage('userAccounts', [])

            // 2. Cari pengguna yang cocok di dalam DAFTAR tersebut
            const foundUser = allUsers.find(user => user.username === username && user.password === password);

            if (foundUser) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', foundUser.username);

                showToast('toast-login-success', 'success', { username: foundUser.username });

                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1500);

            } else {
                // Jika pengguna TIDAK DITEMUKAN di dalam daftar
                showToast('toast-login-error', 'error');
            }
        });
    }

    const cartPage = document.querySelector('.cart-section');
    if (cartPage) {
        const selectAllCheckbox = document.getElementById('select-all-checkbox');
        const itemsContainer = document.getElementById('cart-items-container');

        // --- LOGIKA EVENT LISTENER YANG DIPERBAIKI ---

        // 1. Event listener untuk 'Pilih Semua'
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', () => {
                const allItemCheckboxes = itemsContainer.querySelectorAll('.cart-item-select input');
                allItemCheckboxes.forEach(checkbox => {
                    checkbox.checked = selectAllCheckbox.checked;
                });
                updateCartSummary(); // Panggil update
                saveSelectedCartItems();
            });
        }

        // 2. Event listener untuk semua interaksi di dalam daftar item
        if (itemsContainer) {
            itemsContainer.addEventListener('click', e => {
                const target = e.target;

                // Jika checkbox individual diklik
                if (target.matches('.cart-item-select input')) {
                    syncSelectAllCheckbox(); // Panggil fungsi sinkronisasi
                    updateCartSummary(); // Panggil update ringkasan
                    saveSelectedCartItems();
                }

                // Logika untuk tombol kuantitas
                if (target.matches('.quantity-btn')) {
                    const productId = target.dataset.productId;
                    const change = parseInt(target.dataset.change);
                    updateCart(productId, change);
                }

                // Logika untuk tombol hapus
                if (target.matches('.remove-btn')) {
                    const productId = target.dataset.productId;
                    updateCart(productId, 0);
                }
            });
        }
    }

    // 4. Setup global event listeners
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // --- LOGIKA UNTUK TOGGLE SEARCH BAR ---
    const searchToggleBtn = document.querySelector('.search-toggle-btn');
    const searchBar = document.querySelector('.search-bar');

    if (searchToggleBtn && searchBar) {
        searchToggleBtn.addEventListener('click', () => {
            // Toggle kelas 'is-active' untuk menampilkan/menyembunyikan search bar
            searchBar.classList.toggle('is-active');
        });
    }

    document.body.addEventListener('click', (e) => {
        // --- LOGIKA TOMBOL BELI (HANYA DENGAN ANIMASI GOYANG) ---
        const buyButton = e.target.closest('.buy-btn') || e.target.closest('#add-to-cart-btn');
        if (buyButton) {
            e.preventDefault();
            const { isLoggedIn } = checkLoginStatus();

            if (isLoggedIn) {
                const productId = buyButton.dataset.productId;
                if (productId) {
                    // 1. Langsung panggil fungsi utama untuk menambah item ke keranjang
                    addToCart(productId);

                    // 2. Picu animasi goyang pada ikon keranjang
                    const cartIconEl = document.getElementById('cart-icon-img');
                    if (cartIconEl) {
                        cartIconEl.classList.add('shake');

                        // Hapus class setelah animasi selesai agar bisa dipicu lagi
                        setTimeout(() => {
                            cartIconEl.classList.remove('shake');
                        }, 500); // Durasi harus sama dengan animasi 'cart-shake' di CSS
                    }
                }
            } else {
                showToast('toast-must-login', 'error');
                setTimeout(() => {
                    const loginPagePath = window.location.pathname.includes('/html/') ? 'login.html' : 'html/login.html';
                    window.location.href = loginPagePath;
                }, 3000);
            }
        }

        // --- LOGIKA TOMBOL LOGOUT (DESKTOP & MOBILE) ---
        if (e.target.id === 'logout-btn' || e.target.id === 'logout-btn-mobile') {
            e.preventDefault();
            logoutUser();
        }

        // --- LOGIKA PENGALIH BAHASA MOBILE ---
        if (e.target.closest('#mobile-lang-switcher')) {
            e.preventDefault();
            currentLang = (currentLang === 'id') ? 'en' : 'id';
            localStorage.setItem('userLanguage', currentLang);
            translateUI(currentLang);
            updateMobileNavState();
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