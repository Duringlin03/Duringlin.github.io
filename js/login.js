// 登录页面逻辑
const container = document.querySelector('.container'); // 登录表单容器
const btn_login = document.querySelector('.btn-login'); // 登录按钮
const inputUser = document.querySelector('input[type="text"]'); // 用户名输入框
const inputPwd = document.querySelector('input[type="password"]'); // 密码输入框

// 用户名输入框按回车跳到密码框
inputUser.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        inputPwd.focus();
    }
});

// 密码输入框按回车直接登录
inputPwd.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        btn_login.click();
    }
});

// 登录按钮点击事件
btn_login.addEventListener('click', function () {
    // 获取用户名
    const username = inputUser.value.trim() || '用户';
    // 存储用户名到localStorage
    localStorage.setItem('eco-campus-username', username);
    localStorage.setItem('eco-campus-refresh-count', '0'); // 登录后刷新计数归零
    container.classList.add('success'); // 添加动画
    setTimeout(() => {
        window.location.href = 'index.html'; // 跳转首页
    }, 1200);
});

// 页面切换/加载动画（与主站一致）
document.querySelectorAll('a[href$=".html"]').forEach(function(link) {
    link.addEventListener('click', function (e) {
        if (link.target === '_blank' || link.href.indexOf('#') > -1 || link.href.startsWith('http')) return;
        e.preventDefault();
        document.body.classList.remove('fade-in');
        document.body.classList.add('fade-out');
        setTimeout(function () {
            window.location.href = link.href;
        }, 350);
    });
});