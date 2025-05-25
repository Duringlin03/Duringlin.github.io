// 简易活动日历视图（每月活动分布）
document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar-view');
    if (!calendarEl) return;
    // 活动数据（可自动从页面读取或手动维护）
    const events = [
        { title: '气候变化与可持续发展讲座', date: '2025-05-10', type: 'lecture' },
        { title: '校园植树志愿活动', date: '2025-05-15', type: 'volunteer' },
        { title: '废旧物品改造工作坊', date: '2025-05-20', type: 'workshop' },
        { title: '垃圾分类知识讲座', date: '2025-05-25', type: 'lecture' },
        { title: '校园清洁志愿活动', date: '2025-05-30', type: 'volunteer' },
        { title: '自制环保袋工作坊', date: '2025-06-05', type: 'workshop' }
    ];
    // 当前月份
    let current = new Date(events[0]?.date || Date.now());
    function renderCalendar(year, month) {
        // 获取该月第一天和最后一天
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        // 该月活动
        const monthEvents = events.filter(e => {
            const d = new Date(e.date);
            return d.getFullYear() === year && d.getMonth() === month;
        });
        // 日历头
        let html = `<div class="flex justify-between items-center mb-4">
            <button id="cal-prev" class="glass-bg px-3 py-1 rounded hover:bg-green-100 text-green-700">&lt;</button>
            <span class="font-bold text-lg">${year}年${month+1}月</span>
            <button id="cal-next" class="glass-bg px-3 py-1 rounded hover:bg-green-100 text-green-700">&gt;</button>
        </div>`;
        html += `<table class="w-full text-center select-none">
            <thead>
                <tr class="text-green-700">
                    <th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th>
                </tr>
            </thead>
            <tbody>`;
        let day = 1 - firstDay.getDay();
        for (let w = 0; w < 6; w++) {
            html += '<tr>';
            for (let d = 0; d < 7; d++, day++) {
                if (day < 1 || day > lastDay.getDate()) {
                    html += '<td class="py-2"></td>';
                } else {
                    // 查找当天活动
                    const dateStr = `${year}-${(month+1).toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`;
                    const todayEvents = monthEvents.filter(e => e.date === dateStr);
                    html += `<td class="py-2 align-top">
                        <div class="w-8 h-8 mx-auto rounded-full ${todayEvents.length ? 'bg-green-100 text-green-700 font-bold' : ''}">${day}</div>
                        ${todayEvents.map(ev => `<div class="mt-1 text-xs rounded px-1 py-0.5 ${ev.type==='lecture'?'bg-green-200':ev.type==='volunteer'?'bg-blue-200':'bg-yellow-100'} text-gray-700" style="max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${ev.title}">${ev.title}</div>`).join('')}
                    </td>`;
                }
            }
            html += '</tr>';
        }
        html += '</tbody></table>';
        calendarEl.innerHTML = html;
        // 切换月份
        document.getElementById('cal-prev').onclick = function() {
            let m = month - 1, y = year;
            if (m < 0) { m = 11; y--; }
            renderCalendar(y, m);
        };
        document.getElementById('cal-next').onclick = function() {
            let m = month + 1, y = year;
            if (m > 11) { m = 0; y++; }
            renderCalendar(y, m);
        };
    }
    renderCalendar(current.getFullYear(), current.getMonth());
});
