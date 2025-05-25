// 高德地图初始化，支持拖拽缩放和校区标记
document.addEventListener('DOMContentLoaded', function () {
    var map = new AMap.Map('amap-container', {
        zoom: 15,
        center: [115.685964, 34.418738], 
        resizeEnable: true
    });
    // 添加校区标记
    var markers = [
        { pos: [115.685964, 34.418738], name: '商丘工学院', addr: '河南省商丘市平原中路' },
        { pos: [115.711456, 34.36249], name: '商丘工学院南校区', addr: '河南省商丘市平原中路南段' },
        { pos: [115.846438, 34.356588], name: '商丘工学院虞城校区', addr: '河南省商丘市虞城县新校区' }
    ];
    markers.forEach(function(m) {
        var marker = new AMap.Marker({
            position: m.pos,
            map: map,
            title: m.name
        });
        marker.on('click', function() {
            AMap.plugin('AMap.InfoWindow', function() {
                var infoWindow = new AMap.InfoWindow({
                    content: `<div style="font-size:1rem;"><b>${m.name}</b><br>${m.addr}</div>`,
                    offset: new AMap.Pixel(0, -30)
                });
                infoWindow.open(map, m.pos);
            });
        });
    });
});
