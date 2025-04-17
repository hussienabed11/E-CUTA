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



// البيانات الثابتة للمنتجات
const productData = {
  1: { name: "Astronaut T-Shirt", price: 78, image: "assect/products/f1.jpg" },
  2: { name: "Astronaut T-Shirt", price: 78, image: "assect/products/f2.jpg" },
  3: { name: "Astronaut T-Shirt", price: 78, image: "assect/products/f3.jpg" },
  4: { name: "Astronaut T-Shirt", price: 78, image: "assect/products/f4.jpg" },
  5: { name: "Astronaut T-Shirt", price: 78, image: "assect/products/f5.jpg" },
  6: { name: "Astronaut T-Shirt", price: 78, image: "assect/products/f6.jpg" },
  7: { name: "Astronaut T-Shirt", price: 78, image: "assect/products/f7.jpg" },
  8: { name: "Astronaut T-Shirt", price: 78, image: "assect/products/f8.jpg" },
  9: { name: "Astronaut T-Shirt", price: 78, image: "assect/products/n1.jpg" },
  10: { name: "Astronaut T-Shirt", price: 78, image: "assect/products/n2.jpg" },
  11: { name: "Astronaut T-Shirt", price: 78, image: "assect/products/n3.jpg" },
  12: { name: "Astronaut T-Shirt", price: 78, image: "assect/products/n4.jpg" },
  13: { name: "Astronaut T-Shirt", price: 78, image: "assect/products/n5.jpg" },
  14: { name: "Astronaut T-Shirt", price: 78, image: "assect/products/n6.jpg" },
  15: { name: "Astronaut T-Shirt", price: 78, image: "assect/products/n7.jpg" },
  16: { name: "Astronaut T-Shirt", price: 78, image: "assect/products/n8.jpg" },
};

// دالة لعرض محتويات السلة
function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const totalElement = document.getElementById("total-amount");
  container.innerHTML = "";

  let total = 0;

  cartItems.forEach((item, index) => {
    const product = productData[item.id];
    const itemTotal = product.price * item.quantity;
    total += itemTotal;

 const itemHTML = `
  <div style="display: flex; align-items: center; gap: 20px; padding: 15px; margin-bottom: 15px; background-color: #fff; border-radius: 12px; border: 1px solid #cce7d0; box-shadow: 0 8px 20px rgba(0,0,0,0.05); position: relative;">
    <img src="${product.image}" style="width: 100px; height: auto; border-radius: 10px;">
    <div style="flex-grow: 1;">
      <h4 style="color: #088178; margin-bottom: 10px;">${product.name}</h4>
      <p style="margin: 5px 0;">Price: <strong>$${product.price}</strong></p>
      <div style="display: flex; align-items: center; gap: 10px; margin: 8px 0;">
        <button onclick="decreaseQuantity(${index})" class="cart-btn">−</button>
        <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
        <button onclick="increaseQuantity(${index})" class="cart-btn">+</button>
        <button onclick="removeProduct(${index})" class="remove-btn">🗑️</button>
      </div>
      <p style="margin: 5px 0;">Total: <strong>$${itemTotal}</strong></p>
    </div>
  </div>
`;


    container.innerHTML += itemHTML;
  });

  totalElement.textContent = `$${total}`;
}

// دالة لزيادة الكمية
function increaseQuantity(index) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems[index].quantity++;
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
}

// دالة لتقليل الكمية أو حذف العنصر لو وصلت لـ 0
function decreaseQuantity(index) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity--;
  } else {
    cartItems.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
}

// ✅ دالة الحذف الكامل (برّا renderCart)
function removeProduct(index) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));

  showAlert("The product has been removed from the cart.🗑️"); // ✅ عرض الـ alert
  renderCart(); // إعادة تحميل السلة
}

// دالة لعرض رسالة الـ alert
function showAlert(message) {
  const alertMessage = document.createElement('div');
  alertMessage.textContent = message;
  alertMessage.style.position = "fixed";
  alertMessage.style.top = "20px";
  alertMessage.style.right = "20px";
  alertMessage.style.backgroundColor = "#088178";
  alertMessage.style.color = "#fff";
  alertMessage.style.padding = "10px 20px";
  alertMessage.style.borderRadius = "5px";
  alertMessage.style.fontSize = "16px";
  alertMessage.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
  alertMessage.style.zIndex = "9999"; // عشان تظهر فوق كل حاجة

  document.body.appendChild(alertMessage);

  // إخفاء الـ alert بعد 2 ثانية
  setTimeout(() => {
    alertMessage.remove();
  }, 2000);
}


// أول تحميل للصفحة
renderCart();
