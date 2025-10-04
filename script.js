// ضع رابط Google Apps Script هنا
const scriptURL = "ضع_رابط_الويب_ابلكيشن_من_جوجل_هنا";

let cart = [];
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));
    cart.push({ name, price });
    updateCart();
  });
});

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price} د.ل`;
    cartItems.appendChild(li);
    total += item.price;
  });
  cartCount.textContent = cart.length;
  cartTotal.textContent = `الإجمالي: ${total} د.ل`;
}

// عند إتمام الطلب
document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("🛒 السلة فارغة!");
    return;
  }

  const name = prompt("أدخل اسمك:");
  const email = prompt("أدخل بريدك الإلكتروني:");

  if (!name || !email) {
    alert("❌ يجب إدخال الاسم والبريد.");
    return;
  }

  let total = cart.reduce((sum, item) => sum + item.price, 0);
  let items = cart.map(item => `${item.name} (${item.price} د.ل)`).join(", ");

  const order = { name, email, cart: items, total };

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(order)
  })
    .then(res => res.text())
    .then(msg => {
      alert("✅ تم إرسال طلبك بنجاح!");
      cart = [];
      updateCart();
    })
    .catch(err => alert("❌ حدث خطأ، حاول لاحقاً."));
});

// نموذج تواصل
const form = document.getElementById("contactForm");
const messageBox = document.getElementById("formMessage");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  messageBox.textContent = "✅ تم إرسال رسالتك بنجاح!";
  form.reset();
});
