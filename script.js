// نموذج تواصل بسيط
const form = document.getElementById("contactForm");
const messageBox = document.getElementById("formMessage");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  messageBox.textContent = "✅ تم إرسال رسالتك بنجاح، سنتواصل معك قريباً!";
  form.reset();
});
