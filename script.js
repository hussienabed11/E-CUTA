const bar= document.getElementById("bar");
const close= document.getElementById("close");
const nav= document.getElementById("navbar");

if (bar){
    bar.addEventListener("click", ()=>{
        nav.classList.add("active");
    })
}
if (close){
    close.addEventListener("click", ()=>{
        nav.classList.remove("active");
    })
}


// نحاول نقرأ السلة من localStorage أول ما الصفحة تفتح
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// دالة لإضافة المنتج إلى السلة
function addToCart(productId) {
    let existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }

    // نخزن السلة في localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    showAlert();
}

// دالة لتحديث عدد العناصر في السلة
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// دالة لعرض الـ alert
function showAlert() {
    const alertMessage = document.getElementById("alert-message");
    alertMessage.classList.add("show");

    setTimeout(() => {
        alertMessage.classList.remove("show");
    }, 2000);
}

// إضافة مستمع للأزرار
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        const productId = e.target.closest(".pro").getAttribute("data-id");
        addToCart(parseInt(productId));
    });
});

// أول ما الصفحة تفتح، نحدث عدد السلة بناءً على localStorage
updateCartCount();
