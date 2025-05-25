document.addEventListener('DOMContentLoaded', function () {
    const messageInput = document.getElementById('message');
    const subjectSelect = document.querySelector('select[data-suggest]');
    const tip = document.getElementById('subject-suggest-tip');

    if (!messageInput || !subjectSelect || !tip) return;

    // 关键词与主题映射
    const mapping = [
        { keywords: ['志愿', '报名', '参加', '义工', '服务', '招募', '志工', '报名参加', '志愿活动'], value: 'volunteer', label: '志愿者申请' },
        { keywords: ['合作', '共建', '联合', '赞助', '协作', '合作伙伴', '资源共享', '项目合作', '洽谈'], value: 'partnership', label: '合作意向' },
        { keywords: ['建议', '意见', '反馈', '投诉', '问题', '吐槽', '批评', '建议书', '意见箱', '申诉'], value: 'feedback', label: '意见反馈' },
        { keywords: ['咨询', '问', '了解', '信息', '询问', '详情', '介绍', '说明', '联系', '联系方式'], value: 'general', label: '一般咨询' }
    ];

    messageInput.addEventListener('input', function () {
        const text = messageInput.value.trim();
        let matched = null;
        for (const item of mapping) {
            if (item.keywords.some(k => text.includes(k))) {
                matched = item;
                break;
            }
        }
        if (matched) {
            subjectSelect.value = matched.value;
            tip.textContent = `已为您推荐主题：“${matched.label}”`;
            tip.classList.remove('hidden');
        } else {
            tip.textContent = '';
            tip.classList.add('hidden');
        }
    });
});
