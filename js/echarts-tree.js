document.addEventListener('DOMContentLoaded', function () {
    var chartDom = document.getElementById('tree-chart');
    if (!chartDom) return;
    var myChart = echarts.init(chartDom);

    // 三组数据
    var chartData = [
        {
            title: '年度植树数量趋势',
            yName: '棵树',
            seriesName: '植树数量',
            years: ['2019', '2020', '2021', '2022', '2023', '2024'],
            data: [320, 480, 650, 900, 1100, 1250],
            color: '#22c55e',
            area: 'rgba(34,197,94,0.12)'
        },
        {
            title: '年度回收利用趋势',
            yName: '公斤',
            seriesName: '回收利用',
            years: ['2019', '2020', '2021', '2022', '2023', '2024'],
            data: [800, 1200, 1800, 2400, 2900, 3200],
            color: '#3b82f6',
            area: 'rgba(59,130,246,0.12)'
        },
        {
            title: '年度节约能源趋势',
            yName: '千瓦时',
            seriesName: '节约能源',
            years: ['2019', '2020', '2021', '2022', '2023', '2024'],
            data: [2000, 3500, 5000, 7000, 8200, 8500],
            color: '#f59e42',
            area: 'rgba(245,158,66,0.12)'
        }
    ];

    var current = 0;
    function renderChart(idx) {
        var d = chartData[idx];
        document.getElementById('chart-title').textContent = d.title;
        var option = {
            tooltip: { trigger: 'axis' },
            xAxis: {
                type: 'category',
                data: d.years,
                axisLine: { lineStyle: { color: d.color } },
                axisLabel: { color: '#374151', fontWeight: 500 }
            },
            yAxis: {
                type: 'value',
                name: d.yName,
                axisLine: { lineStyle: { color: d.color } },
                axisLabel: { color: '#374151' }
            },
            series: [{
                name: d.seriesName,
                data: d.data,
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 10,
                lineStyle: { color: d.color, width: 4 },
                itemStyle: { color: d.color },
                areaStyle: { color: d.area }
            }],
            grid: { left: '6%', right: '6%', bottom: '10%', top: '12%' }
        };
        myChart.setOption(option, true);
    }

    renderChart(current);

    // 切换按钮
    document.getElementById('chart-prev').onclick = function () {
        current = (current + chartData.length - 1) % chartData.length;
        renderChart(current);
    };
    document.getElementById('chart-next').onclick = function () {
        current = (current + 1) % chartData.length;
        renderChart(current);
    };

    window.addEventListener('resize', function () {
        myChart.resize();
    });
});
