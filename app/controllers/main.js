var danhSachNguoiDung = new ListUser();
var validation = new Validation();
let usersArr = [];
function layDSND() {
  danhSachNguoiDung
    .layDS()
    .then(function (response) {
      usersArr = response.data;
      hienThiTable(usersArr);
    })
    .catch(function (error) {
      console.log(error);
    });
}
layDSND();

function hienThiTable(mangNguoiDung) {
  var content = "";
  mangNguoiDung.map(function (nd, index) {
    content += `
        <tr>
            <td>${index + 1}</td>
            <td>${nd.taiKhoan}</td>
            <td>${nd.hoTen}</td>
            <td>${nd.email}</td>
            <td>${nd.loaiND}</td>
            <td>${nd.ngonNgu}</td>
            <td>
                <button class="btb btn-danger" onclick="xoa('${
                  nd.id
                }')">Xóa</button>
                <button class="btb btn-info" data-toggle="modal" data-target="#myModal" onclick ="layChiTiet('${
                  nd.id
                }')">Xem</button>
            </td>
        </tr>

      `;
  });

  document.querySelector("#tblDanhSachNguoiDung").innerHTML = content;
}
{
  /* <td>${nd.hinhAnh}</td>; */
}

function themND() {
  var taiKhoanND = document.querySelector("#TaiKhoan").value;
  var hoTenND = document.querySelector("#HoVaTen").value;
  var emailND = document.querySelector("#Email").value;
  var passND = document.querySelector("#PassWord").value;
  var anhND = document.querySelector("#HinhAnh").value;
  var loaiND = document.querySelector("#loaiNguoiDung").value;
  var loaiNgonNu = document.querySelector("#loaiNgonNgu").value;
  var mota = document.querySelector("#MoTa").value;

  ////////////////////////// check validation ////////////////
  // kiểm tra tài khoản
  var isEmpty = validation.checkEmpty(
    taiKhoanND,
    "tbTK",
    "Tài khoản người dùng trống! "
  );
  var isExist = validation.checkAcc(
    taiKhoanND,
    "tbTK",
    "Tài khoản người dùng bị trùng!",
    usersArr
  );
  // kiểm tra tên
  var emptyName = validation.checkEmpty(
    hoTenND,
    "tbTen",
    "Tên người dùng trống!"
  );
  if (!emptyName) {
    var isName = validation.checkName(
      hoTenND,
      "tbTen",
      "Tên người dùng không đúng định dạng!"
    );
  }
  // kiểm tra email
  var emptyEmail = validation.checkEmpty(
    emailND,
    "tbEmail",
    "Email người dùng trống!"
  );
  if (!emptyEmail) {
    var isEmail = validation.checkEmail(
      emailND,
      "tbEmail",
      "Email không đúng định dạng!"
    );
  }
  // kiểm tra mật khẩu
  var emptyPass = validation.checkEmpty(passND, "tbMK", "Mật khẩu trống!");
  if (!emptyPass) {
    var isPass = validation.checkPass(
      passND,
      "tbMK",
      "Mật khẩu không đúng định dạng!"
    );
  }
  // kiểm tra hình ảnh
  var emptyImg = validation.checkEmpty(anhND, "tbHinhAnh", "Hình ảnh trống!");

  // kiểm tra loại người dùng
  var isPosition = validation.checkPosition(
    "loaiNguoiDung",
    "tbLoaiNguoiDung",
    "Chưa chọn loại người dùng!"
  );
  // kiểm tra loại ngôn ngữ
  var isPosition = validation.checkPosition(
    "loaiNgonNgu",
    "tbLoaiNgonNgu",
    "Chưa chọn ngôn ngữ!"
  );
  // kiểm tra Mô tả
  var emptyDes = validation.checkEmpty(mota, "tbMoTa", "Chưa nhập mô tả!");

  if (
    !isEmpty &&
    !isExist &&
    !emptyName &&
    isName &&
    !emptyEmail &&
    isEmail &&
    !emptyPass &&
    isPass &&
    !emptyImg &&
    !isPosition &&
    !emptyDes
  ) {
    var nd = new User(
      taiKhoanND,
      hoTenND,
      emailND,
      passND,
      anhND,
      loaiND,
      loaiNgonNu,
      mota
    );
    // console.table(nd);
    danhSachNguoiDung
      .them(nd)
      .then(function (response) {
        // console.log(response.data);
        layDSND();
        document.querySelector("#myModal .close").click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
document.querySelector("#btnThemND").addEventListener("click", function () {
  document.querySelector(".modal-footer").innerHTML = `
        <button class = "btn btn-success" onclick="themND()">Thêm</button>
        <button class = "btn btn-danger" close" data-dismiss="modal" "> Đóng</button>

     `;
});

function layChiTiet(id) {
  danhSachNguoiDung
    .layND(id)
    .then(function (response) {
      // console.log(response.data);
      document.querySelector("#TaiKhoan").disabled = true;
      document.querySelector("#TaiKhoan").value = response.data.taiKhoan;
      document.querySelector("#HoVaTen").value = response.data.hoTen;
      document.querySelector("#Email").value = response.data.email;
      document.querySelector("#PassWord").value = response.data.matKhau;
      document.querySelector("#HinhAnh").value = response.data.hinhAnh;
      document.querySelector("#loaiNguoiDung").value = response.data.loaiND;
      document.querySelector("#loaiNgonNgu").value = response.data.ngonNgu;
      document.querySelector("#MoTa").value = response.data.moTa;
      document.querySelector(".modal-footer").innerHTML = `
      <button class ="btn btn-success" onclick="capNhat(${response.data.id})">Cập Nhật</button>
        <button class = "btn btn-danger" close" data-dismiss="modal" "> Đóng</button>

      `;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function capNhat(id) {
  var taiKhoanND = document.querySelector("#TaiKhoan").value;
  var hoTenND = document.querySelector("#HoVaTen").value;
  var emailND = document.querySelector("#Email").value;
  var passND = document.querySelector("#PassWord").value;
  var anhND = document.querySelector("#HinhAnh").value;
  var loaiND = document.querySelector("#loaiNguoiDung").value;
  var loaiNgonNu = document.querySelector("#loaiNgonNgu").value;
  var mota = document.querySelector("#MoTa").value;

  ////////////////////////// check validation ////////////////

  // kiểm tra tên
  var emptyName = validation.checkEmpty(
    hoTenND,
    "tbTen",
    "Tên người dùng trống!"
  );
  if (!emptyName) {
    var isName = validation.checkName(
      hoTenND,
      "tbTen",
      "Tên người dùng không đúng định dạng!"
    );
  }
  // kiểm tra email
  var emptyEmail = validation.checkEmpty(
    emailND,
    "tbEmail",
    "Email người dùng trống!"
  );
  if (!emptyEmail) {
    var isEmail = validation.checkEmail(
      emailND,
      "tbEmail",
      "Email không đúng định dạng!"
    );
  }
  // kiểm tra mật khẩu
  var emptyPass = validation.checkEmpty(passND, "tbMK", "Mật khẩu trống!");
  if (!emptyPass) {
    var isPass = validation.checkPass(
      passND,
      "tbMK",
      "Mật khẩu không đúng định dạng!"
    );
  }
  // kiểm tra hình ảnh
  var emptyImg = validation.checkEmpty(anhND, "tbHinhAnh", "Hình ảnh trống!");

  // kiểm tra loại người dùng
  var isPosition = validation.checkPosition(
    "loaiNguoiDung",
    "tbLoaiNguoiDung",
    "Chưa chọn loại người dùng!"
  );
  // kiểm tra loại ngôn ngữ
  var isPosition = validation.checkPosition(
    "loaiNgonNgu",
    "tbLoaiNgonNgu",
    "Chưa chọn ngôn ngữ!"
  );
  // kiểm tra Mô tả
  var emptyDes = validation.checkEmpty(mota, "tbMoTa", "Chưa nhập mô tả!");

  if (
    !emptyName &&
    isName &&
    !emptyEmail &&
    isEmail &&
    !emptyPass &&
    isPass &&
    !emptyImg &&
    !isPosition &&
    !emptyDes
  ) {
    var nd = new User(
      taiKhoanND,
      hoTenND,
      emailND,
      passND,
      anhND,
      loaiND,
      loaiNgonNu,
      mota
    );
    // console.table(sp);

    danhSachNguoiDung
      .capNhatND(nd, id)
      .then(function (response) {
        console.log(response.data);
        layDSND();
        document.querySelector("#myModal .close").click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

function xoa(id) {
  danhSachNguoiDung
    .xoaND(id)
    .then(function (response) {
      console.log(response.data);
      layDSND();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function resetForm() {
  document.querySelector("#TaiKhoan").disabled = false;
  document.querySelector("#mainForm").reset();
  var txtWarn = document.querySelectorAll(".text-danger");
  txtWarn.forEach((element) => {
    element.innerHTML = "";
  });
}
