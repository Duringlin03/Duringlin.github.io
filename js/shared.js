// 全站共享JS：导航栏、页脚、页面切换动画、弹窗组件等

// 当网页加载完成后执行以下代码
document.addEventListener('DOMContentLoaded', function () {
    // 加载导航栏
    loadNavigation();

    // 加载页脚
    loadFooter();

    // 使导航栏在页面滚动时固定在顶部
    const navbar = document.querySelector('.apple-nav'); // 只选中.apple-nav
    if (navbar) {
        const navbarHeight = navbar.offsetHeight;
        window.addEventListener('scroll', function () {
            if (window.scrollY > navbarHeight) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 自动为内容添加导航栏高度的 padding-top，避免被悬浮导航栏遮挡
    const nav = document.querySelector('.apple-nav');
    if (nav) {
        const navHeight = nav.offsetHeight + 24; // 24px为导航栏上下margin安全距离
        document.body.style.paddingTop = navHeight + 'px';
    }

    // 个性化欢迎顶部提示（仅首页且登录后首次显示）
    if (
        window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '' ||
        window.location.pathname.split('/').pop() === '' // 兼容根路径
    ) {
        const username = localStorage.getItem('eco-campus-username');
        const refreshCount = localStorage.getItem('eco-campus-refresh-count');
        if (username && refreshCount === '0') {
            setTimeout(() => {
                showTopNotice(`欢迎回来，${username}！`, 3200);
                localStorage.setItem('eco-campus-refresh-count', '1');
            }, 350); // 页面动画后弹出
        }
    }
});

// 顶部自动消失欢迎提示
function showTopNotice(content, duration = 3000) {
    // 避免重复
    if (document.getElementById('eco-top-notice')) return;
    const notice = document.createElement('div');
    notice.id = 'eco-top-notice';
    notice.style.cssText = `
        position: fixed;
        top: 0; left: 50%; transform: translateX(-50%);
        z-index: 9999;
        background: linear-gradient(90deg,#22c55e 60%,#3b82f6 100%);
        color: #fff;
        font-size: 1.15rem;
        font-weight: 500;
        padding: 0.9em 2.5em;
        border-radius: 0 0 1.2em 1.2em;
        box-shadow: 0 4px 24px 0 rgba(34,197,94,0.13);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.4s, top 0.4s;
    `;
    notice.textContent = content;
    document.body.appendChild(notice);
    setTimeout(() => {
        notice.style.opacity = '1';
        notice.style.top = '0';
    }, 10);
    setTimeout(() => {
        notice.style.opacity = '0';
        notice.style.top = '-40px';
        setTimeout(() => notice.remove(), 400);
    }, duration);
}

// 定义加载导航栏的函数
function loadNavigation() {
    // Apple 官网风格极简毛玻璃悬浮导航栏
    const navHtml = `
        <nav class="apple-nav glass-bg">
          <div class="nav-inner">
            <div class="nav-logo">
              <img src="images/logo.png" alt="Logo">
              <span>Eco Campus</span>
            </div>
            <div class="nav-links">
              <a href="index.html" class="nav-link">首页</a>
              <a href="about.html" class="nav-link">关于我们</a>
              <a href="action.html" class="nav-link">生态行动</a>
              <a href="events.html" class="nav-link">活动通知</a>
              <a href="contact.html" class="nav-link">联系我们</a>
            </div>
            <div class="nav-actions flex items-center">
              <button id="theme-toggle-btn" class="theme-toggle-btn ml-2 px-3 py-2 rounded-full text-xl" title="夜间模式切换">🌙</button>
              <button id="login-btn" class="btn glass-btn ml-6 px-6 py-2 text-base">登录</button>
            </div>
          </div>
        </nav>
    `;

    // 检查页面中是否已经有导航栏，如果没有则插入导航栏
    const navPlaceholder = document.querySelector('nav');
    if (!navPlaceholder) {
        document.body.insertAdjacentHTML('afterbegin', navHtml);
    }

    // 高亮当前页面导航
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('href').includes(currentPage)) {
        link.classList.add('active');
        }
    });

    // 夜间模式切换逻辑
    setTimeout(() => {
      const themeBtn = document.getElementById('theme-toggle-btn');
      if (themeBtn) {
        // 初始化主题
        function setTheme(dark) {
          if (dark) {
            document.body.classList.add('dark-mode');
            themeBtn.textContent = '☀️';
            themeBtn.title = '切换为日间模式';
          } else {
            document.body.classList.remove('dark-mode');
            themeBtn.textContent = '🌙';
            themeBtn.title = '切换为夜间模式';
          }
        }
        // 检查本地存储/系统偏好
        let dark = localStorage.getItem('eco-campus-theme') === 'dark';
        if (!localStorage.getItem('eco-campus-theme')) {
          dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        setTheme(dark);
        themeBtn.onclick = function () {
          const isDark = document.body.classList.toggle('dark-mode');
          setTheme(isDark);
          localStorage.setItem('eco-campus-theme', isDark ? 'dark' : 'light');
        };
      }
    }, 0);

    // 登录按钮逻辑
    setTimeout(() => {
      const loginBtn = document.getElementById('login-btn');
      if (loginBtn) {
        // 检查本地存储是否有用户名
        const username = localStorage.getItem('eco-campus-username');
        if (username) {
          loginBtn.textContent = username;
        }
        loginBtn.addEventListener('click', function () {
          if (!localStorage.getItem('eco-campus-username')) {
            // 未登录跳转登录页
            window.location.href = 'login.html';
          } else {
            // 已登录弹窗确认退出
            showConfirm('是否退出当前用户？', '退出登录', function(ok){
              if (ok) {
                localStorage.removeItem('eco-campus-username');
                localStorage.removeItem('eco-campus-refresh-count');
                loginBtn.textContent = '登录';
              }
            });
          }
        });
      }
    }, 0);
}

// 定义加载页脚的函数
function loadFooter() {
    // 定义页脚的HTML结构
    const footerHtml = `
        <footer class="relative z-10 bg-gray-800 text-white py-6">
            <div class="container mx-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 class="text-xl font-bold mb-4">🌱 Eco Campus</h3>
                        <p class="text-gray-400">致力于打造绿色、可持续的校园环境，让环保成为一种生活方式。</p>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold mb-4">快速链接</h3>
                        <ul class="flex space-x-4">
                            <li><a href="index.html" class="text-gray-400 hover:text-green-600">首页</a></li>
                            <li><a href="about.html" class="text-gray-400 hover:text-green-600">关于我们</a></li>
                            <li><a href="action.html" class="text-gray-400 hover:text-green-600">生态行动</a></li>
                            <li><a href="events.html" class="text-gray-400 hover:text-green-600">活动通知</a></li>
                            <li><a href="contact.html" class="text-gray-400 hover:text-green-600">联系我们</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold mb-4">联系我们</h3>
                        <p class="text-gray-400">邮箱: 2941679550@qq.com</p>
                        <p class="text-gray-400">电话: 18339759200</p>
                    </div>
                </div>
                <div class="border-t border-gray-700 mt-1 pt-1 text-center text-gray-400">
                    <p>© 2025 Eco Campus. 版权所有。</p>
                </div>
            </div>
        </footer>
    `;

    // 检查页面中是否已经有页脚，如果没有则插入页脚
    const footerPlaceholder = document.querySelector('footer');
    if (!footerPlaceholder) {
        document.body.insertAdjacentHTML('beforeend', footerHtml);
    }
}

// ========== 页面切换/加载动画 ========== //
(function() {
  // 页面进入时添加 fade-in 动画
  document.body.classList.add('fade-in');

  // 捕获所有本地页面跳转链接，添加 fade-out 动画
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href$=".html"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        // 新窗口/外链/锚点不处理
        if (link.target === '_blank' || link.href.indexOf('#') > -1 || link.href.startsWith('http')) return;
        e.preventDefault();
        document.body.classList.remove('fade-in');
        document.body.classList.add('fade-out');
        setTimeout(function() {
          window.location.href = link.href;
        }, 350); // 动画时长与CSS一致
      });
    });
  });
})();

// ========== 全局弹窗组件 ========== //
(function () {
  // 插入弹窗样式
  if (!document.getElementById('eco-modal-style')) {
    const style = document.createElement('style');
    style.id = 'eco-modal-style';
    style.innerHTML = `
.eco-modal-mask {
  position: fixed; inset: 0;
  background: rgba(255,255,255,0.25);
  backdrop-filter: blur(14px) saturate(160%);
  -webkit-backdrop-filter: blur(14px) saturate(160%);
  z-index: 9999; display: flex; align-items: center; justify-content: center;
}
.eco-modal {
  background: linear-gradient(135deg, rgba(255,255,255,0.82) 70%, rgba(34,197,94,0.13) 100%);
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  border-radius: 1.2rem;
  box-shadow: 0 8px 32px 0 rgba(31,38,135,0.18);
  min-width: 300px; max-width: 90vw; padding: 2.2rem 2rem 1.5rem 2rem; text-align: center; position: relative;
  animation: ecoModalIn .25s cubic-bezier(.4,2,.6,1);
}
@keyframes ecoModalIn { from { opacity:0; transform: translateY(40px);} to { opacity:1; transform: none; } }
.eco-modal-title { font-size: 1.25rem; font-weight: bold; margin-bottom: 0.7rem; color: #059669;}
.eco-modal-content { font-size: 1.08rem; color: #374151; margin-bottom: 1.2rem;}
.eco-modal-btns { display: flex; gap: 1.2rem; justify-content: center;}
.eco-modal-btn {
  min-width: 80px; padding: 0.5em 1.2em; border-radius: 999px; border: none; font-size: 1rem; font-weight: 500;
  cursor: pointer; transition: background 0.2s, color 0.2s;
}
.eco-modal-btn.ok { background: #10b981; color: #fff;}
.eco-modal-btn.ok:hover { background: #059669;}
.eco-modal-btn.cancel { background: #e5e7eb; color: #374151;}
.eco-modal-btn.cancel:hover { background: #d1d5db;}
.eco-modal-close { position: absolute; top: 0.7rem; right: 1.2rem; background: none; border: none; font-size: 1.5rem; color: #888; cursor: pointer;}
.eco-modal-close:hover { color: #059669;}
    `;
    document.head.appendChild(style);
  }

  // 简单弹窗
  window.showModal = function (content, title = '提示', cb) {
    const mask = document.createElement('div');
    mask.className = 'eco-modal-mask';
    mask.innerHTML = `
      <div class="eco-modal">
        <button class="eco-modal-close" title="关闭">&times;</button>
        <div class="eco-modal-title">${title}</div>
        <div class="eco-modal-content">${content}</div>
        <div class="eco-modal-btns">
          <button class="eco-modal-btn ok">确定</button>
        </div>
      </div>
    `;
    document.body.appendChild(mask);
    const close = () => { mask.remove(); if (cb) cb(); };
    mask.querySelector('.eco-modal-close').onclick = close;
    mask.querySelector('.eco-modal-btn.ok').onclick = close;
    mask.onclick = e => { if (e.target === mask) close(); };
  };

  // 确认弹窗
  window.showConfirm = function (content, title = '确认操作', cb) {
    const mask = document.createElement('div');
    mask.className = 'eco-modal-mask';
    mask.innerHTML = `
      <div class="eco-modal">
        <button class="eco-modal-close" title="关闭">&times;</button>
        <div class="eco-modal-title">${title}</div>
        <div class="eco-modal-content">${content}</div>
        <div class="eco-modal-btns">
          <button class="eco-modal-btn ok">确定</button>
          <button class="eco-modal-btn cancel">取消</button>
        </div>
      </div>
    `;
    document.body.appendChild(mask);
    mask.querySelector('.eco-modal-close').onclick = () => { mask.remove(); cb && cb(false); };
    mask.querySelector('.eco-modal-btn.cancel').onclick = () => { mask.remove(); cb && cb(false); };
    mask.querySelector('.eco-modal-btn.ok').onclick = () => { mask.remove(); cb && cb(true); };
    mask.onclick = e => { if (e.target === mask) { mask.remove(); cb && cb(false); } };
  };
})();

// ========== F&Q 悬浮客服机器人 ========== //
if (!window.__ecoFaqLoaded) {
  window.__ecoFaqLoaded = true;
  const script = document.createElement('script');
  script.src = 'js/eco-faq.js';
  script.defer = true;
  document.body.appendChild(script);
}
