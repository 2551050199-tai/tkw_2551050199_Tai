const form = document.getElementById("contact-form"); // ID của form bạn tạo
form.setAttribute("novalidate", "");

function messageFor(field) {
  const v = field.validity;
  if (v.valueMissing) return "Vui lòng điền mục này.";
  if (v.typeMismatch) return "Dữ liệu không đúng định dạng.";
  if (v.patternMismatch) {
    if (field.type === "email") return "Email chưa đúng dạng, ví dụ: chuvua@gmail.com";
    if (field.type === "tel") return "Nhập 10 chữ số, bắt đầu bằng 0. Ví dụ: 0912345678";
  }
  if (v.tooShort) return `Vui lòng nhập ít nhất ${field.getAttribute("minlength")} ký tự.`;
  return "Dữ liệu không hợp lệ.";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  let firstInvalidField = null;
  const fields = form.querySelectorAll("input, textarea, select");

  fields.forEach(field => {
    const errorBox = document.getElementById(`${field.id}-error`); // Cần có <div id="id-error"> dưới mỗi input
    
    if (!field.checkValidity()) {
      field.setAttribute("aria-invalid", "true");
      if (errorBox) errorBox.textContent = messageFor(field);
      if (!firstInvalidField) firstInvalidField = field;
    } else {
      field.removeAttribute("aria-invalid");
      if (errorBox) errorBox.textContent = "";
    }
  });

  if (firstInvalidField) {
    firstInvalidField.focus();
    // Hiện dòng tóm tắt lỗi nếu có
    const summary = document.getElementById("form-summary-error");
    if(summary) summary.textContent = "Vui lòng kiểm tra lại các trường báo đỏ.";
  } else {
    alert("Gửi thành công!");
    form.reset();
  }
});