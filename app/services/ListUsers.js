// info: Thông tin
// data: dữ liệu

function SanPhamServices() {
  this.layDS = function () {
    return axios({
      method: "get",
      url: "https://6131b9c77287b70017e641fd.mockapi.io/Product2",
    });
  };

  this.them = function (sp) {
    return axios({
      method: "post",
      url: "https://6131b9c77287b70017e641fd.mockapi.io/Product2",
      data: sp,
    });
  };

  this.laySP = function (id) {
    return axios({
      method: "get",
      url: `https://6131b9c77287b70017e641fd.mockapi.io/Product2/${id}`,
    });
  };

  this.capNhatSP = function (sp, id) {
    return axios({
      method: "put",
      url: `https://6131b9c77287b70017e641fd.mockapi.io/Product2/${id}`,
      data: sp,
    });
  };

  this.xoaSP = function (id) {
    return axios({
      method: "delete",
      url: `https://6131b9c77287b70017e641fd.mockapi.io/Product2/${id}`,
      data: sp,
    });
  };
}
