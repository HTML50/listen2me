	var opts = {
            lines: 13, // 花瓣数目
            length: 10, // 花瓣长度
            width: 14, // 花瓣宽度
            radius: 4, // 花瓣距中心半径
            corners: 1, // 花瓣圆滑度 (0-1)
            rotate: 0, // 花瓣旋转角度
            direction: 1, // 花瓣旋转方向 1: 顺时针, -1: 逆时针
            color: '#fff', // 花瓣颜色
            speed: 1, // 花瓣旋转速度
            trail: 57, // 花瓣旋转时的拖影(百分比)
            shadow: false, // 花瓣是否显示阴影
            hwaccel: false, //spinner 是否启用硬件加速及高速旋转            
            className: 'spinner', // spinner css 样式名称
            zIndex: 2e9, // spinner的z轴 (默认是2000000000)
            top: '100%', // spinner 相对父容器Top定位 单位 px
            left: '50%', // spinner 相对父容器Left定位 单位 px
            position: 'relative', // element position
            progress: false,      // show progress tracker
            progressTop: 0,       // offset top for progress tracker
            progressLeft: 0       // offset left for progress tracker
};
var spinner = new Spinner(opts);
var target = document.getElementById("waitProcess");
spinner.spin(target);