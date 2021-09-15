function User(tk, ten, email, password, anh, loaiNguoiDung, ngonNgu, mota) {
  this.taiKhoan = tk;
  this.hoTen = ten;
  this.email = email;
  this.matKhau = password;
  this.hinhAnh = anh;
  this.loaiND = loaiNguoiDung;
  this.ngonNgu = ngonNgu;
  this.moTa = mota;
}

function Validation() {
  // kiểm tra rỗng
  this.checkEmpty = function (inputValue, spanID, message) {
    if (inputValue.trim() === "") {
      // console.log("run1");
      document.getElementById(spanID).innerHTML = message;

      return true;
    } else {
      document.getElementById(spanID).innerHTML = "";
      return false;
    }
  };
  // kiểm tra trùng tk
  this.checkAcc = function (inputValue, spanID, message, arrayAcc) {
    var isExist = arrayAcc.some(function (nd) {
      return nd.taiKhoan === inputValue.trim();
    });
    if (isExist) {
      document.getElementById(spanID).innerHTML = message;

      return true;
    } else {
      return false;
    }
  };
  // kiểm tra tên
  this.checkName = function (inputValue, spanID, message) {
    var pattern = new RegExp(
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$"
    );
    if (pattern.test(inputValue)) {
      return true;
    } else {
      document.getElementById(spanID).innerHTML = message;
      return false;
    }
  };

  this.checkEmail = function (inputValue, spanID, message) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (inputValue.match(pattern)) {
      document.getElementById(spanID).innerHTML = "";
      return true;
    } else {
      document.getElementById(spanID).innerHTML = message;

      return false;
    }
  };
  // Kiểm tra mật khẩu
  this.checkPass = function (inputValue, spanID, message) {
    var pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,8}$/;
    if (inputValue.match(pattern)) {
      return true;
    } else {
      document.getElementById(spanID).innerHTML = message;

      return false;
    }
  };

  // Kiểm tra loại người dùng và loại ngôn ngữ
  this.checkPosition = function (selectID, spanID, message) {
    var optionIndex = document.getElementById(selectID).selectedIndex;
    if (optionIndex === 0) {
      document.getElementById(spanID).innerHTML = message;
      return true;
    } else {
      document.getElementById(spanID).innerHTML = "";

      return false;
    }
  };
}
