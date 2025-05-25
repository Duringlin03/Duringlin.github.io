// 活动互动墙JS，支持留言、删除、持久化、点赞
document.addEventListener('DOMContentLoaded', function () {
    const wallForm = document.getElementById('wall-form'); // 留言表单
    const wallList = document.getElementById('wall-list'); // 留言列表
    const wallName = document.getElementById('wall-name'); // 昵称输入框
    const wallMsg = document.getElementById('wall-msg');   // 留言内容输入框
    const STORAGE_KEY = 'ecoEventWall'; // 本地存储key

    // 加载留言数据
    function loadWall() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    }
    // 保存留言数据
    function saveWall(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    // 渲染留言列表
    function renderWall() {
        const data = loadWall();
        wallList.innerHTML = '';
        if (data.length === 0) {
            wallList.innerHTML = '<li class="text-gray-400 text-center">暂无留言，快来参与吧！</li>';
            return;
        }
        // 只显示最新10条，倒序
        data.slice(-10).reverse().forEach((item, idx, arr) => {
            const li = document.createElement('li');
            li.className = 'bg-gray-50 rounded-lg px-4 py-3 shadow flex justify-between items-center';
            li.innerHTML = `
                <div>
                    <span class="font-semibold text-green-700">${item.name || '匿名'}</span>：
                    <span class="text-gray-700">${item.msg}</span>
                    <span class="text-xs text-gray-400 ml-2">${item.time}</span>
                </div>
                <div class="flex items-center gap-2">
                    <button class="like-msg text-pink-500 hover:text-pink-600 text-lg" title="点赞">👍</button>
                    <span class="like-count text-pink-600 font-bold">${item.likes || 0}</span>
                    <button class="delete-msg text-red-400 hover:text-red-600 ml-2" title="删除">🗑️</button>
                </div>
            `;
            // 删除按钮事件
            li.querySelector('.delete-msg').onclick = function() {
                showConfirm('确定要删除这条留言吗？', '删除确认', function(ok){
                  if (ok) {
                    // 计算原始索引
                    const allData = loadWall();
                    // arr.length-1-idx 是原始数组的索引
                    allData.splice(allData.length - 1 - idx, 1);
                    saveWall(allData);
                    renderWall();
                  }
                });
            };
            // 点赞按钮事件
            li.querySelector('.like-msg').onclick = function() {
                const allData = loadWall();
                const originIdx = allData.length - 1 - idx;
                allData[originIdx].likes = (allData[originIdx].likes || 0) + 1;
                saveWall(allData);
                renderWall();
            };
            wallList.appendChild(li);
        });
    }
    // 表单提交事件
    if (wallForm) {
        wallForm.onsubmit = function(e) {
            e.preventDefault();
            const name = wallName.value.trim();
            const msg = wallMsg.value.trim();
            if (!msg) return;
            // 生成时间字符串
            const now = new Date();
            const time = now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate() + ' ' +
                now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
            const data = loadWall();
            data.push({ name, msg, time, likes: 0 });
            saveWall(data);
            wallMsg.value = '';
            wallName.value = '';
            renderWall();
        };
    }
    renderWall();
});
