
// 点击
;$(function(){
    // 初始化echart实例

    var echart_l = echarts.init(document.getElementById('echart_left'));
    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '2018年注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数']
        },
        xAxis: {
            data: ['1月','2月','3月','4月','5月','6月']
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [500, 600, 1200,800, 1000,999],
            //柱条的宽度,百分比,相对于x轴等分后的长度
            barWidth: '50%'
        }]
    }

    // 使用刚指定的配置项和数据显示图表。
    echart_l.setOption(option1);


    var echart_r = echarts.init(document.getElementById('echart_right'));
    // 指定图表的配置项和数据
    var option2 = {
        title: {
            text: '热门品牌销售',
            subtext: '2017年6月',
            left: 'center',
        },
        tooltip: {
            //触发类型
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"

        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data:['阿迪王','耐克','阿迪','新百伦','李宁']
        },

        series: [{
            name: '品牌',
            type: 'pie',
            center: ['50%','50%'],
            radius: ['0','50%'],
            data: [
                {value:300,name:'阿迪王'},
                {value:600,name:'阿迪'},
                {value:620,name:'耐克'},
                {value:900,name:'李宁'},
                {value:760,name:'新百伦'},

            ]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echart_r.setOption(option2);

})