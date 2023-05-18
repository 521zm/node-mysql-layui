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
  console.log([
    "%c",
    "                   _ooOoo_",
    "                  o8888888o",
    "                  88\" . \"88",
    "                  (| -_- |)",
    "                  O\\  =  /O",
    "               ____/`---'\\____",
    "             .'  \\\\|     |//  `.",
    "            /  \\\\|||  :  |||//  \\",
    "           /  _||||| -:- |||||-  \\",
    "           |   | \\\\\\  -  /// |   |",
    "           | \\_|  ''\\---/''  |   |",
    "           \\  .-\\__  `-`  ___/-. /",
    "         ___`. .'  /--.--\\  `. . __",
    "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
    "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
    "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
    "======`-.____`-.___\\_____/___.-`____.-'======",
    "                   `=---='",
    "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
    "         佛祖保佑       永无BUG"
  ].join('\n'), 'color:red');

  console.log([
    "%c",
    "      写字楼里写字间，写字间里程序员；",
    "      程序人员写程序，又拿程序换酒钱。",
    "      酒醒只在网上坐，酒醉还来网下眠；",
    "      酒醉酒醒日复日，网上网下年复年。",
    "      但愿老死电脑间，不愿鞠躬老板前；",
    "      奔驰宝马贵者趣，公交自行程序员。",
    "      别人笑我忒疯癫，我笑自己命太贱；",
    "      不见满街漂亮妹，哪个归得程序员？",
  ].join('\n'), 'color:green')
})