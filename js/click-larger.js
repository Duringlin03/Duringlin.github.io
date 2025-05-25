// 校园地图点击放大功能
document.addEventListener('DOMContentLoaded', function () {
    const campusMap = document.getElementById('campus-map');
    // 监听地图图片点击事件
    campusMap.addEventListener('click', function () {
        // 创建模态框显示大图
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
        <div class="relative max-w-5xl">
          <img src="${this.src}" alt="校园地图" class="max-h-screen max-w-full">
          <button class="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center text-gray-800 hover:bg-gray-200">
            ✕
          </button>
        </div>
      `;
        document.body.appendChild(modal);

        // 关闭模态框
        modal.querySelector('button').addEventListener('click', function () {
            modal.remove();
        });
    });
});