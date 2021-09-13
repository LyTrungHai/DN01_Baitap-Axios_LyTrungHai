var spServices = new SanPhamServices();
function layDSSP() {
  spServices
    .layDS()
    .then(function (response) {
      console.log(response.data);
      hienThiTable(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

layDSSP();

function hienThiTable(mangSP) {
  var content = "";
  mangSP.map(function (sp, index) {
    content += `
        <tr>
            <td>${index + 1}</td>
            <td>${sp.tenSP}</td>
            <td>${sp.gia}</td>
            <td>${sp.hinhAnh}</td>
            <td>${sp.moTa}</td>
            <td>
                <button class="btb btn-danger" onclick="xoa('${
                  sp.id
                }')">Xóa</button>
                <button class="btb btn-info" data-toggle="modal" data-target="#myModal" onclick ="layChiTiet('${
                  sp.id
                }')">Xem</button>
            </td>
        </tr>

      `;
  });

  document.querySelector("#tblDanhSachSP").innerHTML = content;
}

function themSP() {
  var ten = document.querySelector("#TenSP").value;
  var gia = document.querySelector("#GiaSP").value;
  var hinh = document.querySelector("#HinhSP").value;
  var mota = document.querySelector("#MoTa").value;

  // console.log(ten, gia, hinh, mota);
  var sp = new SanPham(ten, gia, hinh, mota);
  console.table(sp);

  spServices
    .them(sp)
    .then(function (response) {
      console.log(response);
      layDSSP();
      document.querySelector("#myModal .close").click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
document.querySelector("#btnThemSP").addEventListener("click", function () {
  document.querySelector(".modal-footer").innerHTML = `
        <button class = "btn btn-success" onclick="themSP()">Thêm</button>
     `;
});

function layChiTiet(id) {
  spServices
    .laySP(id)
    .then(function (response) {
      console.log(response.data);
      document.querySelector("#TenSP").value = response.data.tenSP;
      document.querySelector("#GiaSP").value = response.data.gia;
      document.querySelector("#HinhSP").value = response.data.hinhAnh;
      document.querySelector("#MoTa").value = response.data.moTa;
      document.querySelector(".modal-footer").innerHTML = `
        <button class = "btn btn-success" onclick="capNhat('${response.data.id}')">Cập nhật</button>
     `;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function capNhat(id) {
  var ten = document.querySelector("#TenSP").value;
  var gia = document.querySelector("#GiaSP").value;
  var hinh = document.querySelector("#HinhSP").value;
  var mota = document.querySelector("#MoTa").value;

  var sp = new SanPham(ten, gia, hinh, mota);
  // console.table(sp);

  spServices
    .capNhatSP(sp, id)
    .then(function (response) {
      console.log(response.data);
      layDSSP();
      document.querySelector("#myModal .close").click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function xoa(id) {
  spServices
    .xoaSP(id)
    .then(function (response) {
      console.log(response.data);
      layDSSP();
    })
    .catch(function (error) {
      console.log(error);
    });
}
