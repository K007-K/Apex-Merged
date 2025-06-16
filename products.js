// Sample product data with real images
const products = [
    {
        id: 1,
        name: "iPhone 14 Pro",
        category: "electronics",
        price: 999,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 2,
        name: "MacBook Pro M2",
        category: "electronics",
        price: 1299,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        name: "Nike Air Max",
        category: "clothing",
        price: 129,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 4,
        name: "Leather Jacket",
        category: "clothing",
        price: 199,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 5,
        name: "The Great Gatsby",
        category: "books",
        price: 15,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 6,
        name: "Sony Headphones",
        category: "electronics",
        price: 299,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 7,
        name: "Designer Watch",
        category: "clothing",
        price: 249,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 8,
        name: "Harry Potter Series",
        category: "books",
        price: 89,
        image: "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?w=500&auto=format&fit=crop&q=60"
    }
];

// Function to create product cards
function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3>${product.name}</h3>
                <div class="product-price">$${product.price}</div>
            </div>
        </div>
    `;
}

// Function to filter and sort products
function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const sortBy = document.getElementById('sortBy').value;
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    let filteredProducts = products.filter(product => {
        const matchesCategory = !categoryFilter || product.category === categoryFilter;
        const matchesSearch = product.name.toLowerCase().includes(searchInput);
        return matchesCategory && matchesSearch;
    });
    
    // Sort products
    filteredProducts.sort((a, b) => {
        switch(sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            default: // 'name'
                return a.name.localeCompare(b.name);
        }
    });
    
    // Update the products grid
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = filteredProducts.map(createProductCard).join('');
}

// Function to show/hide sections
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.tab-btn[onclick="showSection('${sectionId}')"]`).classList.add('active');
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', () => {
    filterProducts();
}); 