// 实现rem适配
(function () {
  var setFont = function () {
    var html = document.documentElement
    var width = html.clientWidth
    if (width < 1024) width = 1024
    if (width > 1920) width = 1920
    var fontSize = width / 80 + 'px'
    html.style.fontSize = fontSize
  }
  setFont()
  window.onresize = function () {
    setFont()
  }
})();

// 实现监控滚动
(function () {
  // 切换
  $('.monitor').on('click', '.tabs a', function () {
    $(this).addClass('active').siblings().removeClass('active')
    $('.monitor .content').eq(this.dataset.index).show().siblings('.content').hide()
  })
  // 动画
  $('.marquee').each(function () {
    var $cloneList = $(this).children().clone()
    $(this).append($cloneList)
  })
})();

// 实现点位-饼状图
(function () {
  var option = {
    // 控制提示
    tooltip: {
      // 非轴图形，使用item的意思是放到数据对应图形上触发提示
      trigger: 'item',
      // 格式化提示内容：
      // a 代表图表名称 b 代表数据名称 c 代表数据  d代表  当前数据/总数据的比例
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 控制图表
    series: [
      {
        // 图表名称
        name: '点位统计',
        // 图表类型
        type: 'pie',
        // 南丁格尔玫瑰图 有两个圆  内圆半径10%  外圆半径70%
        // 百分比基于  图表DOM容器的半径
        radius: ['10%', '70%'],
        // 图表中心位置 left 50%  top 50% 距离图表DOM容器
        center: ['50%', '50%'],
        // 半径模式，另外一种是 area 面积模式
        roseType: 'radius',
        // 数据集 value 数据的值 name 数据的名称
        data: [
          { value: 20, name: '云南' },
          { value: 26, name: '北京' },
          { value: 24, name: '山东' },
          { value: 25, name: '河北' },
          { value: 20, name: '江苏' },
          { value: 25, name: '浙江' },
          { value: 30, name: '四川' },
          { value: 42, name: '湖北' }
        ],
        // 文字调整
        label: {
          fontSize: 10
        },
        // 引导线调整
        labelLine: {
          // 连接扇形图线长
          length: 8,
          // 连接文字线长
          length2: 10
        }
      }
    ],
    // 每块图标颜色
    color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff']
  };
  var myChart = echarts.init($('.pie')[0])
  myChart.setOption(option)
})();

// 用户统计-柱状图
(function () {
  var item = {
    name: '',
    value: 1200,
    // 柱子颜色
    itemStyle: {
      color: '#254065'
    },
    // 鼠标经过柱子颜色
    emphasis: {
      itemStyle: {
        color: '#254065'
      }
    },
    // 工具提示隐藏
    tooltip: {
      extraCssText: 'opacity:0'
    }
  }
  var option = {
    // 工具提示
    tooltip: {
      // 触发类型  经过轴触发axis  经过轴触发item
      trigger: 'item',
      // 轴触发提示才有效
      axisPointer: {
        // 默认为直线，可选为：'line' 线效果 | 'shadow' 阴影效果       
        type: 'shadow'
      }
    },
    // 图表边界控制
    grid: {
      // 距离 上右下左 的距离
      top: '3%',
      right: '3%',
      bottom: '3%',
      left: '0%',
      // 是否包含文本
      containLabel: true,
      // 显示边框
      show: true,
      // 边框颜色
      borderColor: 'rgba(0, 240, 255, 0.3)'
    },
    // 控制x轴
    xAxis: [
      {
        // 使用类目，必须有data属性
        type: 'category',
        // 使用 data 中的数据设为刻度文字
        data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
        // 刻度设置
        axisTick: {
          // true意思：图形在刻度中间
          // false意思：图形在刻度之间
          alignWithLabel: false,
          show: false
        },
        // 文字
        axisLabel: {
          color: '#4c9bfd'
        }
      }
    ],
    // 控制y轴
    yAxis: [
      {
        // 使用数据的值设为刻度文字
        type: 'value',
        // 刻度设置
        axisTick: {
          show: false
        },
        // 文字
        axisLabel: {
          color: '#4c9bfd'
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(0, 240, 255, 0.3)'
          }
        }
      }
    ],
    // 控制数据
    series: [
      {
        // 图表数据名称
        name: '用户统计',
        // 图表类型
        type: 'bar',
        // 柱子宽度
        barWidth: '60%',
        // 数据
        data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240],
        // 颜色
        itemStyle: {
          // 提供的工具函数生成渐变颜色
          color: new echarts.graphic.LinearGradient(
            // (x1,y2) 点到点 (x2,y2) 之间进行渐变
            0, 0, 0, 1,
            [
              { offset: 0, color: '#00fffb' }, // 0 起始颜色
              { offset: 1, color: '#0061ce' }  // 1 结束颜色
            ]
          )
        }
      }
    ]
  };
  var myChart = echarts.init($('.bar')[0])
  myChart.setOption(option)
})();

// 订单功能
(function () {
  // 1. 准备数据
  var data = {
    day365: { orders: '20,301,987', amount: '99834' },
    day90: { orders: '301,987', amount: '9834' },
    day30: { orders: '1,987', amount: '3834' },
    day1: { orders: '987', amount: '834' }
  }
  // 获取显示 订单数量 容器
  var $h4Orders = $('.order h4:eq(0)')
  // 获取显示 金额数量 容器
  var $h4Amount = $('.order h4:eq(1)')
  $('.order').on('click', '.filter a', function () {
    // 2. 点击切换激活样式
    $(this).addClass('active').siblings().removeClass('active')
    // 3. 点击切换数据
    var currdata = data[this.dataset.key]
    $h4Orders.html(currdata.orders)
    $h4Amount.html(currdata.amount)
  })
  // 4. 开启定时器切换数据
  var index = 0
  var $allTab = $('.order .filter a')
  setInterval(function () {
    index++
    if (index >= 4) index = 0
    $allTab.eq(index).click()
  }, 5000)
})();

(function () {
  // 准备数据
  var data = {
    year: [
      [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
      [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
    ],
    quarter: [
      [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
      [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
    ],
    month: [
      [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
      [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
    ],
    week: [
      [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
      [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
    ]
  }
  var option = {
    // 工具提示
    tooltip: {
      trigger: 'axis'
    },
    // 图例组件
    legend: {
      textStyle: {
        color: '#4c9bfd',
      },
      right: '10%'
    },
    // 设置网格
    grid: {
      show: true,
      top: '20%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      borderColor: '#012f4a',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#4c9bfd'
      },
      axisLine: {
        show: false
      },
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#4c9bfd'
      },
      splitLine: {
        lineStyle: {
          color: '#012f4a'
        }
      }
    },
    series: [{
      name: '预期销售额',
      data: data.year[0],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#00f2f1'
      }
    }, {
      name: '实际销售额',
      data: data.year[1],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#ed3f35'
      }
    }]
  };
  var myChart = echarts.init($('.line')[0])
  myChart.setOption(option)
  // 切换
  $('.sales').on('click', '.caption a', function () {
    // 样式
    $(this).addClass('active').siblings().removeClass('active')
    // 数据
    var currData = data[this.dataset.type]
    option.series[0].data = currData[0]
    option.series[1].data = currData[1]
    myChart.setOption(option)
  })
  // tab索引
  var index = 0;
  // 所有tab
  var allTab = $('.sales .caption a')
  setInterval(function () {
    index++
    // 大于等于4索引切换到0索引
    if (index >= 4) index = 0
    // 选中对应tab触发点击
    allTab.eq(index).click()
  }, 1000)
})();

// 销量进度-饼状图
(function () {
  var option = {
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['130%', '150%'],
        center: ['48%', '80%'],
        label: {
          show: false,
        },
        startAngle: 180,
        hoverOffset: 0,
        data: [
          {
            value: 100,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#00c9e0' },
                  { offset: 1, color: '#005fc1' }
                ]
              }
            }
          },  
          { value: 100, itemStyle: { color: '#12274d' } },
          { value: 200, itemStyle: { color: 'transparent' } }
        ]
      }
    ]
  }
  var myChart = echarts.init($('.gauge')[0])
  myChart.setOption(option)
})();

$(function(){
  var data = [
    { name: '可爱多', num: '9,086' },
    { name: '娃哈哈', num: '8,341' },
    { name: '喜之郎', num: '7,407' },
    { name: '八喜', num: '6,080' },
    { name: '小洋人', num: '6,724' },
    { name: '好多鱼', num: '2,170' },
  ]
  $('.province').on('mouseenter','.sup li',function(){
     // 样式
     $(this).addClass('active').siblings().removeClass('active')
     // 打乱数据
     var randomData = data.sort(function(a,b){
       return 0.5 - Math.random()
     })
     // 拼接字符串
     var html = ''
     randomData.forEach(function(item){
       html += `<li><span>${item.name}</span><span>${item.num} <s class="icon-up"></s></span></li>`
     })
     // 渲染
     $('.sub').html(html)
  })
  // 所有的LI
  var $lis = $('.province .sup li')
  // 第一个默认激活
  $lis.eq(0).mouseenter()
  // 开启定时器 切换
  var index = 0
  setInterval(function () {
    index++
    // 大于等于5索引切换到0索引
    if (index >= 5) index = 0
    // 选中对应tab触发点击
    $lis.eq(index).mouseenter()
  }, 1000)
})