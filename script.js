const bangMonAn = document.getElementById("bang-mon-an").getElementsByTagName("tbody")[0];
const nutThem = document.getElementById("nut-them");

const maMon = document.getElementById("ma-mon");
const tenMon = document.getElementById("ten-mon");
const giaMon = document.getElementById("gia-mon");
const anhMon = document.getElementById("anh-mon");

window.onload = function () {
  const duLieuCu = localStorage.getItem("danhSachMonAn");
  if (duLieuCu) {
    bangMonAn.innerHTML += duLieuCu;
    capNhatSuKienXoa(); 
  }
};

nutThem.onclick = function () {
  if (!maMon.value || !tenMon.value || !giaMon.value) {
    alert("Vui lòng nhập đầy đủ thông tin món ăn!");
    return;
  }

  const dongMoi = document.createElement("tr");

  dongMoi.innerHTML = `
    <td>${maMon.value}</td>
    <td>${tenMon.value}</td>
    <td>${giaMon.value}</td>
    <td></td>
    <td><button class="xoa">Xoá</button></td>
  `;

  const cotAnh = dongMoi.children[3];
  const tepAnh = anhMon.files[0];
  if (tepAnh) {
    const docAnh = new FileReader();
    docAnh.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.className = "anh-thumbnail";
      cotAnh.appendChild(img);
      bangMonAn.appendChild(dongMoi);
      luuVaoLocalStorage();
    };
    docAnh.readAsDataURL(tepAnh);
  } else {
    bangMonAn.appendChild(dongMoi);
    luuVaoLocalStorage();
  }

  capNhatSuKienXoa();
  maMon.value = tenMon.value = giaMon.value = "";
  anhMon.value = "";
};

function capNhatSuKienXoa() {
  const nutXoa = document.querySelectorAll(".xoa");
  nutXoa.forEach(nut => {
    nut.onclick = function () {
      this.closest("tr").remove();
      luuVaoLocalStorage();
    };
  });
}

function luuVaoLocalStorage() {
  localStorage.setItem("danhSachMonAn", bangMonAn.innerHTML);
}
