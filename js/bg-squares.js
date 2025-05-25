// 背景动态方块动画效果
document.addEventListener('DOMContentLoaded', function () {
    var bgSquares = document.querySelector('.bg-squares');
    if (!bgSquares) return;
    bgSquares.innerHTML = '';
    var count = 100; // 动画方块数量
    for (var i = 1; i <= count; i++) {
        var li = document.createElement('li');
        // 随机动画延迟，0~10s之间
        var delay = (Math.random() * 10).toFixed(2) + 's';
        li.style.animationDelay = delay;
        // 随机动画时长，7~14s之间
        var duration = (7 + Math.random() * 7).toFixed(2) + 's';
        li.style.animationDuration = duration;
        bgSquares.appendChild(li);
    }
});
