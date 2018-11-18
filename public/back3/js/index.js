

// 数据可视化处理
;$(function(){

    var echart1 = echarts.init(document.getElementById('echart_left'));

    // 指定图表的配置项和数据
    var option1 = {
        //大标题
        title: {
            text: '2018年注册人数'
        },
        //提示组件
        tooltip: {},

        //图例组件
        // 可以通过点击图例控制哪个系列不显示
        legend: {
            // 数组项通常为一个字符串，每一项代表一个系列的 name
            data:['人数']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            //系列名称,用于tooltip的显示,legend的图例筛选
            name: '人数',
            type: 'bar',
            data: [500, 700, 360, 450, 300, 800]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echart1.setOption(option1);


    var echart2 = echarts.init(document.getElementById('echart_right'));

    // 指定图表的配置项和数据
    var option2 = {
        //标题
        title : {
            //大标题
            text: '热门品牌销售',
            //小标题
            subtext: '2017年6月',
            // 控制标题水平位置
            x:'center'
        },

        //提示框组件
        tooltip : {
            //触发类型(item,axis-坐标轴触发,none-什么都不触发)
            // item: 数据项图形触发,主要用于散点图,饼图等无类目轴的图表中使用(默认)
            trigger: 'item',
            //提示框浮层内容格式器
            /*饼图、仪表盘、漏斗图:
            a:系列名称,
            b:数据项名称
            c:数值
            d:百分比
            * */
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        //图例组件
        legend: {
            // 图例列表的布局朝向。
            orient: 'vertical',//垂直方向
            left: 'left',//图例组件离容器左侧的距离。
            //图例的数据组
            data: ['阿迪','阿迪王','老北京','李宁','耐克']
        },
        //系列列表
        series : [
            {
                //系列名称
                name: '品牌',
                //类型:饼图(pie) ,柱形图(bar)...
                type: 'pie',
                //饼图的半径,百分比以容器宽高中较小一方为基准
                radius : '55%',
                //饼图的中心（圆心）坐标
                center: ['50%', '60%'],
                //系列中数据内容
                data:[
                    {value:335, name:'阿迪'},
                    {value:310, name:'阿迪王'},
                    {value:234, name:'老北京'},
                    {value:135, name:'李宁'},
                    {value:1548, name:'耐克'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    echart2.setOption(option2);

})