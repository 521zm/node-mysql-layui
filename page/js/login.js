$(function () {
  // 设置请求根路径
  const baseUrl = "http://127.0.0.1:8000";
  // 监听登录表单，发送登录请求
  $("#login_form").submit((e) => {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: baseUrl + "/api/login",
      data: $("#login_form").serialize(),
      success: (res) => {
        if (res.status !== 0) return alert("信息有误,登陆失败!");
        // layer.msg(res.message);
        layer.msg("登录成功！");
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem("token", res.token);
        // 跳转到主页
        location.href = "/page/index.html";
      },
    });
  });
  var eye = document.getElementById('eye');
  var pwd = document.getElementById('pwd');
  var flag = 0;
  eye.onclick = function () {
    if (flag == 0) {
      pwd.type = 'text';
      flag = 1;
      eye.className = 'iconfont icon-mima_xianshimima';
    } else {
      pwd.type = 'password';
      flag = 0;
      eye.className = 'iconfont icon-guanbi';
    }
  }

})