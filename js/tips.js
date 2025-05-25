// 首页环境小贴士模块，随机展示一条环保建议
document.addEventListener('DOMContentLoaded', function () {
    // 小贴士数据，每条包含图标、标题和内容
    const tips = [
        { icon: '💡', title: '减少一次性用品使用', content: '随身携带可重复使用的购物袋、水杯和餐具，减少塑料垃圾的产生。' },
        { icon: '🚴', title: '选择绿色出行', content: '尽量步行、骑行或使用公共交通工具，减少碳排放。' },
        { icon: '🌱', title: '种植绿色植物', content: '在家中或校园种植植物，不仅美化环境，还能净化空气。' },
        { icon: '🔌', title: '节约用电', content: '随手关闭不用的电器和灯具，减少能源浪费。' },
        { icon: '♻️', title: '垃圾分类', content: '正确分类垃圾，确保可回收物品得到有效利用。' },
        { icon: '🌊', title: '节约用水', content: '缩短淋浴时间，关闭不使用的水龙头，减少水资源浪费。' },
        { icon: '🛍️', title: '支持环保产品', content: '优先选择环保认证的产品，减少对环境的负面影响。' },
        { icon: '📦', title: '减少包装浪费', content: '购物时选择简约包装或无包装的商品，减少垃圾产生。' },
        { icon: '🚮', title: '清理公共区域', content: '参与社区或校园的清洁活动，维护公共环境卫生。' },
        { icon: '🌞', title: '利用自然光', content: '白天尽量使用自然光，减少对人工照明的依赖。' }
    ];

    let lastIndex = -1;
    function showRandomTip() {
        let idx;
        do {
            idx = Math.floor(Math.random() * tips.length);
        } while (tips.length > 1 && idx === lastIndex);
        lastIndex = idx;
        const randomTip = tips[idx];
        const tipContainer = document.getElementById('tip-container');
        tipContainer.innerHTML = `
        <div class="flex items-center">
          <div class="text-5xl mr-6">${randomTip.icon}</div>
          <div>
            <h3 class="text-2xl font-semibold mb-2 text-green-800">${randomTip.title}</h3>
            <p class="text-gray-700">${randomTip.content}</p>
          </div>
        </div>
      `;
    }

    showRandomTip();

    const changeBtn = document.getElementById('change-tip-btn');
    if (changeBtn) {
        changeBtn.addEventListener('click', showRandomTip);
    }
});
