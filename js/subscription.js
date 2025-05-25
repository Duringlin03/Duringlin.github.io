// 订阅功能逻辑
const subscribeBtn = document.getElementById('subscribe-btn');
const subscribeResult = document.getElementById('subscribe-result');

subscribeBtn.addEventListener('click', function () {
    const email = document.getElementById('subscribe-email').value;
    if (!email) {
        alert('请输入邮箱地址');
        return;
    }

    // 模拟订阅成功
    setTimeout(() => {
        subscribeResult.classList.remove('hidden');
        document.getElementById('subscribe-email').value = '';
    }, 1000);
});