// 环保承诺书提交逻辑
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('pledge-btn');
    const nameInput = document.getElementById('realname');
    const studentIdInput = document.getElementById('student-id');
    const emailInput = document.getElementById('email');
    const resultDiv = document.getElementById('pledge-result');
    btn.addEventListener('click', function () {
        // 检查至少勾选一项
        const checkedBoxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
        const checked = checkedBoxes.some(cb => cb.checked);
        const realname = nameInput.value.trim();
        const studentId = studentIdInput.value.trim();
        const email = emailInput.value.trim();
        if (!checked) {
            showModal('请至少选择一项承诺内容！', '提交失败');
            return;
        }
        if (!realname) {
            showModal('请输入姓名！', '提交失败');
            return;
        }
        if (!studentId) {
            showModal('请输入学号！', '提交失败');
            return;
        }
        if (!email || !/^[\w.-]+@[\w.-]+\.\w+$/.test(email)) {
            showModal('请输入有效的邮箱地址！', '提交失败');
            return;
        }

        // 模拟提交操作
        setTimeout(() => {
            // 删除提交结果提示字
            if (resultDiv) resultDiv.classList.add('hidden');
            showModal('感谢你的环保承诺！我们已发送确认邮件到你的邮箱。', '提交成功');
            // 新增：生成证书
            generateCertificate(realname, studentId, checkedBoxes.filter(cb => cb.checked).map(cb => cb.nextElementSibling.textContent.trim()));
        }, 1000);
    });

    // 新增：生成证书图片
    function generateCertificate(realname, studentId, promises) {
        // 证书上显示姓名和学号
        const canvas = document.getElementById('certificate-canvas');
        const btn = document.getElementById('download-certificate-btn');
        if (!canvas || !btn) return;
        const ctx = canvas.getContext('2d');
        // 背景
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 渐变背景
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, "#bbf7d0");
        grad.addColorStop(1, "#a7f3d0");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 边框
        ctx.strokeStyle = "#059669";
        ctx.lineWidth = 6;
        ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);

        // 标题
        ctx.font = "bold 32px 'Noto Sans SC', sans-serif";
        ctx.fillStyle = "#059669";
        ctx.textAlign = "center";
        ctx.fillText("Eco Campus 环保承诺证书", canvas.width / 2, 70);

        // 姓名
        ctx.font = "bold 24px 'Noto Sans SC', sans-serif";
        ctx.fillStyle = "#222";
        ctx.fillText(`承诺人：${realname}`, canvas.width / 2, 120);

        // 学号
        ctx.font = "20px 'Noto Sans SC', sans-serif";
        ctx.fillStyle = "#374151";
        ctx.fillText(`学号：${studentId}`, canvas.width / 2, 155);

        // 承诺内容
        ctx.font = "18px 'Noto Sans SC', sans-serif";
        ctx.fillStyle = "#374151";
        ctx.textAlign = "left";
        let y = 190;
        ctx.fillText("承诺内容：", 60, y);
        promises.forEach((p, i) => {
            ctx.fillText(`• ${p}`, 90, y + 32 + i * 32);
        });

        // 日期
        ctx.font = "16px 'Noto Sans SC', sans-serif";
        ctx.fillStyle = "#888";
        ctx.textAlign = "right";
        const dateStr = new Date().toLocaleDateString();
        ctx.fillText(`日期：${dateStr}`, canvas.width - 40, canvas.height - 40);

        // 盖章
        ctx.font = "bold 28px 'Noto Sans SC', sans-serif";
        ctx.fillStyle = "#22c55e";
        ctx.textAlign = "center";
        ctx.globalAlpha = 0.18;
        ctx.fillText("Eco Campus", canvas.width / 2, canvas.height - 60);
        ctx.globalAlpha = 1;

        // 显示canvas和下载按钮
        canvas.classList.remove('hidden');
        btn.classList.remove('hidden');

        // 下载事件
        btn.onclick = function () {
            const url = canvas.toDataURL("image/png");
            const a = document.createElement('a');
            a.href = url;
            a.download = `EcoCampus_环保承诺证书_${realname}_${studentId}.png`;
            a.click();
        };
    }
});