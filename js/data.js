export function initData() {
    const tbody = document.getElementById("table-body");
    if (!tbody) return; // Chỉ chạy nếu đang ở trang dữ liệu
  
    const state = {
      records: [], query: "", category: "all", status: "all",
      sort: "date-desc", loading: true, error: null
    };
    
    const UI = {
      loading: document.getElementById("state-loading"),
      error: document.getElementById("state-error"),
      empty: document.getElementById("state-empty"),
      data: document.getElementById("state-data"),
      tbody: tbody,
      rowTemplate: document.getElementById("row-template")
    };
    
    const sorters = {
      "date-desc": (a, b) => b.date.localeCompare(a.date),
      "amount-desc": (a, b) => b.amount - a.amount,
    };
    
    // Debounce chống khựng giao diện khi gõ liên tục[cite: 2, 12]
    function debounce(fn, delay = 300) {
      let id;
      return (...args) => { clearTimeout(id); id = setTimeout(() => fn(...args), delay); };
    }
    
    function visibleRecords() {
      const q = state.query.trim().toLowerCase();
      return state.records
        .filter((r) => state.category === "all" || r.category === state.category)
        .filter((r) => state.status === "all" || r.status === state.status)
        .filter((r) => !q || r.trader.toLowerCase().includes(q))
        .sort(sorters[state.sort]);
    }
    
    function render() {
      // Ẩn tất cả trạng thái trước[cite: 7]
      UI.loading.classList.add("hidden");
      UI.error.classList.add("hidden");
      UI.empty.classList.add("hidden");
      UI.data.classList.add("hidden");
    
      if (state.loading) {
        UI.loading.classList.remove("hidden");
        return;
      }
      
      if (state.error) {
        UI.error.textContent = state.error;
        UI.error.classList.remove("hidden");
        return;
      }
    
      const filtered = visibleRecords();
      if (filtered.length === 0) {
        UI.empty.classList.remove("hidden");
        return;
      }
    
      UI.data.classList.remove("hidden");
      
      // Dựng DOM an toàn bằng cloneNode và textContent, tuyệt đối không dùng innerHTML[cite: 2, 7]
      const rows = filtered.map(record => {
        const row = UI.rowTemplate.content.firstElementChild.cloneNode(true);
        row.querySelector("[data-cell='id']").textContent = record.id;
        row.querySelector("[data-cell='trader']").textContent = record.trader;
        row.querySelector("[data-cell='category']").textContent = record.category;
        row.querySelector("[data-cell='status']").textContent = record.status;
        // Format tiền tệ Việt Nam
        row.querySelector("[data-cell='amount']").textContent = new Intl.NumberFormat("vi-VN").format(record.amount) + " đ";
        row.querySelector("[data-cell='date']").textContent = record.date;
        
        row.querySelector(".delete-btn").addEventListener("click", () => {
          state.records = state.records.filter(r => r.id !== record.id);
          saveData();
          render();
        });
        return row;
      });
      
      UI.tbody.replaceChildren(...rows);
    }
    
    function saveData() {
      localStorage.setItem("son_recordsData", JSON.stringify(state.records));
    }
    
    async function loadRecords(forceReset = false) {
      state.loading = true;
      state.error = null;
      render();
    
      try {
        let data = localStorage.getItem("son_recordsData");
        if (!data || forceReset) {
          const res = await fetch("./data/records.json");          
          if (!res.ok) throw new Error(`Máy chủ trả về ${res.status}`);
          data = await res.text();
          localStorage.setItem("son_recordsData", data);
        }
        state.records = JSON.parse(data);
      } catch (err) {
        state.error = `Không tải được dữ liệu: ${err.message}`;
      } finally {
        state.loading = false;
        render();
      }
    }
    
    // Bắt sự kiện người dùng[cite: 7]
    document.getElementById("search-input")?.addEventListener("input", debounce((e) => {
      state.query = e.target.value;
      render();
    }, 300));
    
    document.getElementById("filter-category")?.addEventListener("change", (e) => {
      state.category = e.target.value;
      render();
    });
    
    document.getElementById("filter-status")?.addEventListener("change", (e) => {
      state.status = e.target.value;
      render();
    });
    
    document.getElementById("sort-order")?.addEventListener("change", (e) => {
      state.sort = e.target.value;
      render();
    });
    
    document.getElementById("btn-reset")?.addEventListener("click", () => {
      // 1. Xóa trắng chữ trong ô input tìm kiếm trên giao diện
      const searchInput = document.getElementById("search-input");
      if (searchInput) searchInput.value = "";
    
      // 2. Trả các thẻ select (bộ lọc) về giá trị mặc định trên giao diện
      const filterCategory = document.getElementById("filter-category");
      if (filterCategory) filterCategory.value = "all";
      
      const filterStatus = document.getElementById("filter-status");
      if (filterStatus) filterStatus.value = "all";
      
      const sortOrder = document.getElementById("sort-order");
      if (sortOrder) sortOrder.value = "date-desc";
    
      // 3. Trả state (trạng thái nội bộ) về lại như ban đầu
      state.query = "";
      state.category = "all";
      state.status = "all";
      state.sort = "date-desc";
    
      // 4. Kích hoạt tải lại dữ liệu mới nhất từ file JSON
      loadRecords(true);
    });    
    // Khởi chạy
    loadRecords();
  }