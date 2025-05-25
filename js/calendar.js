document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (!document.getElementById('events-container') || filterButtons.length === 0) return;

    // 初始化活动卡片，绑定报名按钮的点击事件
    function initEvents() {
        const eventCards = document.querySelectorAll('.event-card-preview');
        eventCards.forEach(card => {
            const btn = card.querySelector('.event-signup-btn');
            if (btn) {
                btn.replaceWith(btn.cloneNode(true));
                card.querySelector('.event-signup-btn').addEventListener('click', handleSignup);
                updateSignupBtn(card);
            }
        });
    }

    const SIGNUP_KEY = 'eco-campus-signups';
    function getSignups() {
        return JSON.parse(localStorage.getItem(SIGNUP_KEY) || '{}');
    }
    function setSignups(data) {
        localStorage.setItem(SIGNUP_KEY, JSON.stringify(data));
    }

    function updateSignupBtn(card) {
        const btn = card.querySelector('.event-signup-btn');
        const eventTitle = card.querySelector('.event-title').textContent;
        const signups = getSignups();
        if (signups[eventTitle]) {
            btn.textContent = '已报名';
            btn.classList.add('bg-gray-400', 'cursor-pointer');
            btn.classList.remove('bg-green-600');
        } else {
            btn.textContent = '报名';
            btn.classList.remove('bg-gray-400');
            btn.classList.add('bg-green-600');
        }
    }

    function handleSignup() {
        const card = this.closest('.event-card-preview');
        const eventTitle = card.querySelector('.event-title').textContent;
        const signups = getSignups();
        if (!signups[eventTitle]) {
            // 报名
            signups[eventTitle] = true;
            setSignups(signups);
            updateSignupBtn(card);
            showModal(`已报名参加活动: ${eventTitle}`, '报名成功');
        } else {
            // 已报名，点击为取消报名
            showConfirm(`确定要取消报名“${eventTitle}”吗？`, '取消报名', function(ok){
                if (ok) {
                    delete signups[eventTitle];
                    setSignups(signups);
                    updateSignupBtn(card);
                    showModal(`已取消报名: ${eventTitle}`, '已取消报名');
                }
            });
        }
    }

    function filterEvents(filter) {
        const eventCards = document.querySelectorAll('.event-card-preview');
        eventCards.forEach(card => {
            const eventType = card.dataset.type;
            card.style.display = (filter === 'all' || eventType === filter) ? 'block' : 'none';
        });
        updateFilterButtons(filter);
        initEvents();
    }

    function updateFilterButtons(activeFilter) {
        filterButtons.forEach(btn => {
            btn.classList.toggle('bg-green-600', btn.dataset.filter === activeFilter);
            btn.classList.toggle('text-white', btn.dataset.filter === activeFilter);
            btn.classList.toggle('bg-gray-200', btn.dataset.filter !== activeFilter);
            btn.classList.toggle('text-gray-700', btn.dataset.filter !== activeFilter);
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => filterEvents(btn.dataset.filter));
    });

    initEvents();
});
