// 3D轮播图鼠标左右拖拽/滑动切换（无按钮，自动播放）
document.addEventListener('DOMContentLoaded', function () {
    const shell = document.getElementById('carousel-shell');
    const content = shell.querySelector('.carousel-3d-content');
    const items = content.querySelectorAll('.carousel-3d-item');
    const itemCount = items.length;
    let current = 0;
    let isDragging = false;
    let startX = 0;
    let deltaX = 0;
    let autoTimer = null;

    function updateCarousel() {
        // 每个item间隔60度
        const angle = -current * (360 / itemCount);
        content.style.transform = `translateZ(-24vw) rotateY(${angle}deg)`;
    }

    function nextAuto() {
        current = (current + 1) % itemCount;
        updateCarousel();
    }

    function startAuto() {
        if (autoTimer) clearInterval(autoTimer);
        autoTimer = setInterval(nextAuto, 4000);
    }

    function stopAuto() {
        if (autoTimer) clearInterval(autoTimer);
        autoTimer = null;
    }

    // 鼠标拖拽切换
    content.addEventListener('mousedown', function (e) {
        isDragging = true;
        startX = e.clientX;
        deltaX = 0;
        content.style.cursor = 'grabbing';
        stopAuto();
    });
    document.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        deltaX = e.clientX - startX;
    });
    document.addEventListener('mouseup', function () {
        if (!isDragging) return;
        isDragging = false;
        content.style.cursor = '';
        if (Math.abs(deltaX) > 40) {
            if (deltaX > 0) {
                current = (current - 1 + itemCount) % itemCount;
            } else {
                current = (current + 1) % itemCount;
            }
            updateCarousel();
        }
        deltaX = 0;
        startAuto();
    });

    // 支持触摸滑动
    content.addEventListener('touchstart', function (e) {
        if (e.touches.length !== 1) return;
        isDragging = true;
        startX = e.touches[0].clientX;
        deltaX = 0;
        stopAuto();
    });
    content.addEventListener('touchmove', function (e) {
        if (!isDragging) return;
        deltaX = e.touches[0].clientX - startX;
    });
    content.addEventListener('touchend', function () {
        if (!isDragging) return;
        isDragging = false;
        if (Math.abs(deltaX) > 40) {
            if (deltaX > 0) {
                current = (current - 1 + itemCount) % itemCount;
            } else {
                current = (current + 1) % itemCount;
            }
            updateCarousel();
        }
        deltaX = 0;
        startAuto();
    });

    updateCarousel();
    startAuto();
});

