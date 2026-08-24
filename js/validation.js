export function initValidation() {
    const form = document.getElementById("contact-form"); 
    if (!form) return;
  
    // Tắt bong bóng mặc định của trình duyệt[cite: 2, 11]
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
        const errorBox = document.getElementById(`${field.id}-error`);
        
        if (!field.checkValidity()) {
          // Đánh dấu aria-invalid để áp dụng CSS viền đỏ và báo cho trình đọc màn hình[cite: 2, 11]
          field.setAttribute("aria-invalid", "true");
          if (errorBox) errorBox.textContent = messageFor(field);
          if (!firstInvalidField) firstInvalidField = field;
        } else {
          field.removeAttribute("aria-invalid");
          if (errorBox) errorBox.textContent = "";
        }
      });
  
      if (firstInvalidField) {
        firstInvalidField.focus(); // Đưa tiêu điểm về ô lỗi đầu tiên[cite: 2, 11]
        const summary = document.getElementById("form-summary-error");
        if (summary) summary.textContent = "Vui lòng kiểm tra lại các trường báo đỏ.";
      } else {
        alert("Gửi thành công!");
        form.reset();
      }
    });
  }