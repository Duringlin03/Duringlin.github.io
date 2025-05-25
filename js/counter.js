// 数字递增动画（用于环保成果等动态数字展示）
document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.counter'); // 所有需要动画的数字元素
    const speed = 200; // 动画速度，越大越慢

    counters.forEach(counter => {
        // 递归更新数字
        const updateCount = () => {
            const target = +counter.getAttribute('data-target'); // 目标数字
            const count = +counter.innerText; // 当前数字
            const increment = target / speed; // 每次递增量

            if (count < target) {
                counter.innerText = Math.ceil(count + increment); // 向上取整
                setTimeout(updateCount, 1); // 递归调用
            } else {
                counter.innerText = target; // 最终显示目标值
            }
        };

        updateCount();
    });
});
