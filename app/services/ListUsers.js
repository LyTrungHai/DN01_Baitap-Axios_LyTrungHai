// info: Thông tin
// data: dữ liệu

function ListUser() {
  this.layDS = function () {
    return axios({
      method: "get",
      url: "https://613ebe6ee9d92a0017e17275.mockapi.io/UsersManagement",
    });
  };

  this.them = function (nd) {
    return axios({
      method: "post",
      url: "https://613ebe6ee9d92a0017e17275.mockapi.io/UsersManagement",
      data: nd,
    });
  };

  this.layND = function (id) {
    return axios({
      method: "get",
      url: `https://613ebe6ee9d92a0017e17275.mockapi.io/UsersManagement/${id}`,
    });
  };

  this.capNhatND = function (nd, id) {
    return axios({
      method: "put",
      url: `https://613ebe6ee9d92a0017e17275.mockapi.io/UsersManagement/${id}`,
      data: nd,
    });
  };

  this.xoaND = function (id) {
    return axios({
      method: "delete",
      url: `https://613ebe6ee9d92a0017e17275.mockapi.io/UsersManagement/${id}`,
    });
  };
}
