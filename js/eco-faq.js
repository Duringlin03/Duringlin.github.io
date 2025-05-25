// 智能客服 F&Q 独立脚本
(function () {
  if (window.__ecoFaqInjected) return;
  window.__ecoFaqInjected = true;
  // 插入样式
  if (!document.getElementById('eco-faq-style')) {
    const style = document.createElement('style');
    style.id = 'eco-faq-style';
    style.innerHTML = `
#eco-faq-btn {
  position: fixed;
  right: 2.2rem;
  bottom: 2.2rem;
  z-index: 9999;
  background: linear-gradient(90deg,#22c55e 60%,#3b82f6 100%);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 62px; height: 62px;
  box-shadow: 0 4px 24px 0 rgba(34,197,94,0.18);
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.18s, box-shadow 0.18s, background 0.2s, color 0.2s;
  display: flex; align-items: center; justify-content: center;
}
#eco-faq-btn:hover { transform: scale(1.08); box-shadow: 0 8px 32px 0 rgba(34,197,94,0.28);}
body.dark-mode #eco-faq-btn {
  background: linear-gradient(90deg,#334155 60%,#22c55e 100%) !important;
  color: #e5e7eb !important;
  box-shadow: 0 4px 24px 0 rgba(16,185,129,0.18) !important;
}
#eco-faq-chat {
  position: fixed;
  right: 2.2rem;
  bottom: 5.5rem;
  z-index: 9999;
  width: 340px; max-width: 98vw;
  height: 420px; min-height: 260px; max-height: 80vh;
  /* 毛玻璃背景效果 */
  background: linear-gradient(135deg, rgba(255,255,255,0.7) 70%, rgba(34,197,94,0.12) 100%);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-radius: 1.2rem;
  box-shadow: 0 8px 32px 0 rgba(31,38,135,0.18);
  display: flex; flex-direction: column;
  overflow: hidden;
  animation: ecoModalIn .25s cubic-bezier(.4,2,.6,1);
  resize: none;
  user-select: none;
  left: unset; top: unset;
  /* 允许 left/top 动态设置 */
}
#eco-faq-chat-header {
  background: linear-gradient(90deg,#22c55e 60%,#3b82f6 100%);
  color: #fff;
  padding: 1rem 1.2rem;
  font-size: 1.15rem;
  font-weight: bold;
  display: flex; align-items: center; justify-content: space-between;
  cursor: move;
  user-select: none;
  position: relative;
}
#eco-faq-chat-close {
  background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer;
  margin-left: 0.5rem;
}
#eco-faq-chat-maximize {
  position: absolute;
  right: 2.8rem;
  top: 1rem;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.25rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  z-index: 2;
}
#eco-faq-chat-maximize:hover { opacity: 1; }
body.dark-mode #eco-faq-chat-maximize { color: #e5e7eb !important; }
#eco-faq-chat-body {
  flex: 1 1 auto;
  padding: 1rem 1.2rem 0.5rem 1.2rem;
  overflow-y: auto;
  max-height: 340px;
  font-size: 1rem;
}
.eco-faq-msg { margin-bottom: 0.7rem; display: flex; }
.eco-faq-msg.user { justify-content: flex-end; }
.eco-faq-msg.bot { justify-content: flex-start; }
.eco-faq-bubble {
  max-width: 80%;
  padding: 0.7em 1.1em;
  border-radius: 1.2em;
  font-size: 1rem;
  line-height: 1.6;
  box-shadow: 0 2px 8px 0 rgba(34,197,94,0.08);
  word-break: break-all;
}
.eco-faq-msg.user .eco-faq-bubble {
  background: linear-gradient(90deg,#22c55e 60%,#3b82f6 100%);
  color: #fff;
  border-bottom-right-radius: 0.3em;
}
.eco-faq-msg.bot .eco-faq-bubble {
  background: #f3f4f6;
  color: #374151;
  border-bottom-left-radius: 0.3em;
}
#eco-faq-chat-footer {
  padding: 0.7rem 1.2rem 1rem 1.2rem;
  display: flex; gap: 0.5rem;
  background: none;
}
#eco-faq-input {
  flex: 1 1 auto;
  border: 1px solid #d1d5db;
  border-radius: 999px;
  padding: 0.5em 1em;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
}
#eco-faq-send {
  background: #22c55e;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.5em 1.3em;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
#eco-faq-send:disabled { background: #a7f3d0; color: #fff; cursor: not-allowed;}
#eco-faq-resize {
  position: absolute;
  right: 0; bottom: 0;
  width: 28px; height: 28px;
  cursor: nwse-resize;
  z-index: 10;
  background: none;
  user-select: none;
}
#eco-faq-resize:after {
  content: '';
  display: block;
  width: 18px; height: 18px;
  border-right: 3px solid #a7f3d0;
  border-bottom: 3px solid #a7f3d0;
  position: absolute;
  right: 5px; bottom: 5px;
  border-radius: 0 0 6px 0;
}
@media (max-width: 600px) {
  #eco-faq-btn { right: 1rem; bottom: 1rem; width: 48px; height: 48px; font-size: 1.1rem;}
  #eco-faq-chat { right: 1vw; width: 99vw; min-width: 0; }
}
body.dark-mode #eco-faq-chat {
  background: linear-gradient(135deg,rgba(30,41,59,0.98),rgba(16,185,129,0.13)) !important;
  color: #e5e7eb !important;
}
body.dark-mode #eco-faq-chat-header {
  background: linear-gradient(90deg,#334155 60%,#22c55e 100%) !important;
  color: #fff !important;
}
body.dark-mode #eco-faq-chat-body { background: none !important; color: #e7e7eb !important;}
body.dark-mode .eco-faq-msg.bot .eco-faq-bubble { background: #23272e !important; color: #e7e7eb !important;}
body.dark-mode #eco-faq-input { background: #23272e !important; color: #e7e7eb !important; border-color: #334155 !important;}
body.dark-mode #eco-faq-send { background: #334155 !important; color: #fff !important;}
    `;
    document.head.appendChild(style);
  }

  // 插入按钮
  if (!document.getElementById('eco-faq-btn')) {
    const btn = document.createElement('button');
    btn.id = 'eco-faq-btn';
    btn.title = 'F&Q 问答客服';
    btn.innerHTML = 'F&amp;Q';
    document.body.appendChild(btn);

    btn.onclick = function () {
      if (document.getElementById('eco-faq-chat')) return;
      showFaqChat();
    };
  }

  // 聊天窗口
  function showFaqChat() {
    const chat = document.createElement('div');
    chat.id = 'eco-faq-chat';
    // 初始定位右下角
    chat.style.position = 'fixed';
    chat.style.right = '2.2rem';
    chat.style.bottom = '5.5rem';
    chat.style.left = '';
    chat.style.top = '';
    chat.style.width = '340px';
    chat.style.height = '420px';
    chat.style.minWidth = '240px';
    chat.style.minHeight = '260px';
    chat.style.maxWidth = '100vw';
    chat.style.maxHeight = '80vh';
    chat.innerHTML = `
      <div id="eco-faq-chat-header">
        🤖 Eco Campus 智能客服
        <button id="eco-faq-chat-close" title="关闭">&times;</button>
      </div>
      <div id="eco-faq-chat-body">
        <div class="eco-faq-msg bot"><div class="eco-faq-bubble">您好，我是 Eco Campus 智能客服，有任何校园环保、活动、反馈等问题都可以问我！</div></div>
      </div>
      <div id="eco-faq-chat-footer">
        <input id="eco-faq-input" type="text" placeholder="请输入您的问题..." autocomplete="off" />
        <button id="eco-faq-send">发送</button>
      </div>
      <div id="eco-faq-resize"></div>
    `;
    document.body.appendChild(chat);

    // 关闭按钮
    chat.querySelector('#eco-faq-chat-close').onclick = () => chat.remove();

    // 拖拽调整大小
    const resize = chat.querySelector('#eco-faq-resize');
    let resizing = false, startX = 0, startY = 0, startW = 0, startH = 0;
    resize.addEventListener('mousedown', function (e) {
      e.preventDefault();
      resizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startW = chat.offsetWidth;
      startH = chat.offsetHeight;
      document.body.style.userSelect = 'none';
    });
    window.addEventListener('mousemove', function (e) {
      if (!resizing) return;
      let newW = Math.max(240, Math.min(window.innerWidth, startW + (e.clientX - startX)));
      let newH = Math.max(260, Math.min(window.innerHeight * 0.8, startH + (e.clientY - startY)));
      chat.style.width = newW + 'px';
      chat.style.height = newH + 'px';
    });
    window.addEventListener('mouseup', function () {
      if (resizing) {
        resizing = false;
        document.body.style.userSelect = '';
      }
    });

    // 拖动窗口
    const header = chat.querySelector('#eco-faq-chat-header');
    let dragging = false, dragStartX = 0, dragStartY = 0, dragStartLeft = 0, dragStartTop = 0;
    header.addEventListener('mousedown', function (e) {
      // 只允许鼠标左键
      if (e.button !== 0) return;
      dragging = true;
      document.body.style.userSelect = 'none';
      // 计算初始位置
      const rect = chat.getBoundingClientRect();
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      // 计算当前left/top（相对于视口）
      if (chat.style.left && chat.style.top) {
        dragStartLeft = parseInt(chat.style.left);
        dragStartTop = parseInt(chat.style.top);
      } else {
        // 如果初始是right/bottom，换算为left/top
        dragStartLeft = rect.left;
        dragStartTop = rect.top;
        chat.style.left = rect.left + 'px';
        chat.style.top = rect.top + 'px';
        chat.style.right = '';
        chat.style.bottom = '';
      }
    });
    window.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      let newLeft = dragStartLeft + (e.clientX - dragStartX);
      let newTop = dragStartTop + (e.clientY - dragStartY);
      // 限制在窗口内
      newLeft = Math.max(0, Math.min(window.innerWidth - chat.offsetWidth, newLeft));
      newTop = Math.max(0, Math.min(window.innerHeight - 40, newTop));
      chat.style.left = newLeft + 'px';
      chat.style.top = newTop + 'px';
      chat.style.right = '';
      chat.style.bottom = '';
    });
    window.addEventListener('mouseup', function () {
      if (dragging) {
        dragging = false;
        document.body.style.userSelect = '';
      }
    });

    // 聊天逻辑
    const input = chat.querySelector('#eco-faq-input');
    const sendBtn = chat.querySelector('#eco-faq-send');
    const body = chat.querySelector('#eco-faq-chat-body');
    let history = [
      { role: "system", content: "你是Eco Campus校园环保网站的智能客服，能用简洁中文解答校园环保、活动、反馈、合作等相关问题。注意:输出内容中不要带星号" }
    ];

    function appendMsg(role, text) {
      const msg = document.createElement('div');
      msg.className = 'eco-faq-msg ' + (role === 'user' ? 'user' : 'bot');
      msg.innerHTML = `<div class="eco-faq-bubble">${text.replace(/\n/g, '<br>')}</div>`;
      body.appendChild(msg);
      body.scrollTop = body.scrollHeight;
    }

    // 显示“对方正在输入...”冒泡
    function showThinkingBubble() {
      let thinking = document.createElement('div');
      thinking.className = 'eco-faq-msg bot eco-faq-thinking';
      thinking.innerHTML = `<div class="eco-faq-bubble" style="min-width:48px;min-height:24px;">
        <span class="eco-faq-typing">
          <span class="dot"></span><span class="dot"></span><span class="dot"></span>
        </span>
      </div>`;
      // 冒泡动画样式
      if (!document.getElementById('eco-faq-typing-style')) {
        const style = document.createElement('style');
        style.id = 'eco-faq-typing-style';
        style.innerHTML = `
.eco-faq-typing {
  display: inline-block; vertical-align: middle; height: 18px;
}
.eco-faq-typing .dot {
  display: inline-block;
  width: 8px; height: 8px;
  margin: 0 2px;
  border-radius: 50%;
  background: #a7f3d0;
  opacity: 0.7;
  animation: ecoFaqTyping 1.2s infinite both;
}
.eco-faq-typing .dot:nth-child(2) { animation-delay: 0.2s;}
.eco-faq-typing .dot:nth-child(3) { animation-delay: 0.4s;}
@keyframes ecoFaqTyping {
  0%, 80%, 100% { transform: scale(0.7); opacity: 0.5;}
  40% { transform: scale(1.2); opacity: 1;}
}
body.dark-mode .eco-faq-typing .dot { background: #22c55e; }
        `;
        document.head.appendChild(style);
      }
      body.appendChild(thinking);
      body.scrollTop = body.scrollHeight;
      return thinking;
    }

    async function sendQuestion() {
      const q = input.value.trim();
      if (!q) return;
      appendMsg('user', q);
      input.value = '';
      sendBtn.disabled = true;
      history.push({ role: "user", content: q });

      // 显示思考冒泡
      const thinkingBubble = showThinkingBubble();

      // DeepSeek API调用（前端演示，正式请用后端代理）
      try {
        const resp = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer sk-f40566bfe13846a9a0cb77141d845d07',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: history.slice(-8), // 只保留最近8轮
            temperature: 0.2
          })
        });
        if (!resp.ok) throw new Error('客服服务暂时不可用');
        const data = await resp.json();
        const answer = data.choices?.[0]?.message?.content?.trim() || '很抱歉，暂时无法回答您的问题。';
        thinkingBubble.remove();
        appendMsg('bot', answer);
        history.push({ role: "assistant", content: answer });
      } catch (e) {
        thinkingBubble.remove();
        appendMsg('bot', '客服服务暂时不可用，请稍后再试。');
      }
      sendBtn.disabled = false;
      input.focus();
    }

    sendBtn.onclick = sendQuestion;
    input.onkeydown = function (e) {
      if (e.key === 'Enter') sendQuestion();
    };
    setTimeout(() => input.focus(), 200);
  }
})();
