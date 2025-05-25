// 绿色生活30天挑战打卡功能
document.addEventListener('DOMContentLoaded', function () {
    // 30天挑战任务示例
    const challenges = [
        '随身携带可重复使用的水杯',
        '步行或骑行上下学',
        '拒绝使用一次性塑料袋',
        '参与校园垃圾分类',
        '节约用电，随手关灯',
        '自带餐具用餐',
        '参加一次环保志愿活动',
        '减少纸张浪费',
        '多吃蔬菜，少吃肉类',
        '利用公共交通出行',
        '回收废旧电池',
        '节约用水',
        '支持环保产品',
        '参与校园植树活动',
        '不点外卖，减少包装',
        '用旧物DIY新物品',
        '参与社区清洁活动',
        '多用电子文档，少打印',
        '自带购物袋购物',
        '鼓励身边同学环保',
        '利用自然光照明',
        '减少空调使用',
        '参加环保讲座',
        '绿色出行一整天',
        '不浪费食物',
        '参与旧衣回收',
        '用环保洗护用品',
        '不乱扔垃圾',
        '多用二手书',
        '分享环保知识到朋友圈'
    ];

    // DOM 元素
    const challengeList = document.getElementById('challenge-list'); // 任务列表容器
    const checkinBtn = document.getElementById('checkin-btn');      // 打卡按钮
    const daysCount = document.getElementById('days-count');        // 已打卡天数
    const progressInner = document.getElementById('progress-inner');// 进度条内部

    // 本地存储键
    const STORAGE_KEY = 'ecoChallengeCheckin';

    // 加载打卡数据
    function loadCheckin() {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
            checkedDays: [],
        };
        return data;
    }

    // 保存打卡数据
    function saveCheckin(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    // 徽章相关
    const badgeList = [
        { day: 7,   icon: '🥉', name: '7天徽章', desc: '连续打卡7天' },
        { day: 15,  icon: '🥈', name: '15天徽章', desc: '连续打卡15天' },
        { day: 30,  icon: '🥇', name: '30天徽章', desc: '连续打卡30天' }
    ];
    const BADGE_KEY = 'ecoChallengeBadges';

    function loadBadges() {
        return JSON.parse(localStorage.getItem(BADGE_KEY)) || [];
    }
    function saveBadges(arr) {
        localStorage.setItem(BADGE_KEY, JSON.stringify(arr));
    }

    // 渲染任务列表（收缩显示/展开全部）
    function renderChallenges(data, expanded = false) {
        challengeList.innerHTML = '';
        const checkedDays = data.checkedDays.length;
        let start = 0, end = 30;
        if (!expanded) {
            // 只显示今日及前后各2天
            start = Math.max(0, checkedDays - 2);
            end = Math.min(30, checkedDays + 3);
        }
        for (let i = start; i < end; i++) {
            const li = document.createElement('li');
            let content = '';
            // 已打卡
            if (i < checkedDays) {
                li.className = 'flex items-center challenge-item';
                content = `<span class="inline-block w-7 h-7 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-base">${i+1}</span>
                    <span class="flex-1 line-through text-gray-400 text-sm">${challenges[i]}</span>
                    <span class="ml-2 text-green-500 text-xs">✔️ 已打卡</span>`;
            } else if (i === checkedDays) {
                // 今日任务高亮
                li.className = 'flex items-center bg-green-50 p-3 rounded-lg mt-1 challenge-item';
                content = `<span class="inline-block w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center mr-3 text-base">${i+1}</span>
                    <span class="flex-1 font-bold text-green-800 text-base">今日挑战：${challenges[i]}</span>`;
            } else {
                // 未打卡
                li.className = 'flex items-center challenge-item';
                content = `<span class="inline-block w-7 h-7 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mr-3 text-base">${i+1}</span>
                    <span class="flex-1 text-gray-700 text-sm">${challenges[i]}</span>`;
            }
            li.innerHTML = content;
            challengeList.appendChild(li);
        }
        // 展开/收起按钮逻辑
        let expandBtn = document.getElementById('expand-challenge-btn');
        let collapseBtn = document.getElementById('collapse-challenge-btn');
        // 创建按钮（只创建一次）
        if (!expandBtn) {
            expandBtn = document.createElement('button');
            expandBtn.id = 'expand-challenge-btn';
            expandBtn.className = 'block mx-auto mt-2 text-green-600 hover:underline text-sm';
            challengeList.parentNode.appendChild(expandBtn);
        }
        if (!collapseBtn) {
            collapseBtn = document.createElement('button');
            collapseBtn.id = 'collapse-challenge-btn';
            collapseBtn.className = 'block mx-auto mt-2 text-green-600 hover:underline text-sm';
            challengeList.parentNode.appendChild(collapseBtn);
        }
        // 控制按钮显示与事件
        if (!expanded && (start > 0 || end < 30)) {
            expandBtn.style.display = 'block';
            collapseBtn.style.display = 'none';
            expandBtn.textContent = '展开全部挑战';
            expandBtn.onclick = () => renderChallenges(data, true);
        } else if (expanded) {
            expandBtn.style.display = 'none';
            collapseBtn.style.display = 'block';
            collapseBtn.textContent = '收起挑战列表';
            collapseBtn.onclick = () => renderChallenges(data, false);
        } else {
            expandBtn.style.display = 'none';
            collapseBtn.style.display = 'none';
        }
    }

    // 更新进度条和天数
    function updateProgress(data) {
        const days = data.checkedDays.length;
        daysCount.textContent = days;
        progressInner.style.width = (days / 30 * 100) + '%';
    }

    // 渲染徽章区域
    function renderBadges(days) {
        let badgeDiv = document.getElementById('badge-area');
        if (!badgeDiv) {
            badgeDiv = document.createElement('div');
            badgeDiv.id = 'badge-area';
            badgeDiv.className = 'flex justify-center gap-6 mt-6 mb-2';
            // 插入到挑战卡片底部
            const card = document.getElementById('challenge-list').parentNode;
            card.appendChild(badgeDiv);
        }
        const owned = loadBadges();
        badgeDiv.innerHTML = badgeList.map(badge => {
            const got = days >= badge.day || owned.includes(badge.day);
            return `<div class="flex flex-col items-center">
                <span class="text-4xl ${got ? 'opacity-100' : 'opacity-30'}">${badge.icon}</span>
                <span class="text-sm mt-1 ${got ? 'text-green-700 font-bold' : 'text-gray-400'}">${badge.name}</span>
                <span class="text-xs ${got ? 'text-green-500' : 'text-gray-300'}">${badge.desc}</span>
            </div>`;
        }).join('');
    }

    // 检查并授予徽章
    function checkBadges(days) {
        let owned = loadBadges();
        let updated = false;
        badgeList.forEach(badge => {
            if (days >= badge.day && !owned.includes(badge.day)) {
                owned.push(badge.day);
                updated = true;
                showModal(`恭喜获得${badge.name} ${badge.icon}！`, '获得徽章');
            }
        });
        if (updated) saveBadges(owned);
    }

    // 打卡逻辑
    checkinBtn.addEventListener('click', function () {
        let data = loadCheckin();
        if (data.checkedDays.length >= 30) {
            showModal('恭喜你完成全部30天挑战！记录已重置，可以重新开始打卡。', '挑战完成');
            data.checkedDays = [];
            saveCheckin(data);
            saveBadges([]); // 重置徽章
            renderChallenges(data);
            updateProgress(data);
            renderBadges(0);
            return;
        }
        data.checkedDays.push(true);
        saveCheckin(data);
        renderChallenges(data);
        updateProgress(data);
        checkBadges(data.checkedDays.length);
        renderBadges(data.checkedDays.length);
        showModal('打卡成功！继续加油！', '打卡成功');
    });

    // 初始化
    function init() {
        let data = loadCheckin();
        data.checkedDays = data.checkedDays.filter(Boolean);
        renderChallenges(data);
        updateProgress(data);
        renderBadges(data.checkedDays.length);

        // 调整进度条、打卡按钮和已连续打卡天数的布局顺序
        const progressBar = document.getElementById('progress-bar');
        const checkinBtn = document.getElementById('checkin-btn');
        const daysCount = document.getElementById('days-count');
        if (progressBar && checkinBtn && daysCount) {
            const parent = progressBar.parentNode;
            parent.classList.remove('flex-col');
            parent.classList.add('flex-row', 'items-center');
            // 进度条靠左
            progressBar.classList.add('flex-1', 'mr-4');
            // "已连续打卡"放在中间
            daysCount.parentNode.classList.remove('order-3', 'ml-2');
            daysCount.parentNode.classList.add('order-2', 'mx-2');
            // 打卡按钮放在最右
            checkinBtn.classList.remove('order-2');
            checkinBtn.classList.add('order-3');
        }
    }

    init();
});