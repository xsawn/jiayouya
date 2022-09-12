
// 总分、班级排名、年纪排名、日期、语文、数学、英语、物理、地理、生物、
const examData = [
  // 进入高三 暑期补课期间
  ['2022/09/01',  512, 3, 133, 96, 102, 94.5, 43, 87, 90]

  ,['2022/10/01',  512, 3, 133, 96, 102, 94.5, 43, 87, 90]
  ,['2022/11/01',  512, 3, 133, 96, 102, 94.5, 43, 87, 90]
  ,['2022/12/01',  512, 3, 133, 96, 102, 94.5, 43, 87, 90]
  ,['2023/01/01',  512, 3, 133, 96, 102, 94.5, 43, 87, 90]
  ,['2022/02/01',  512, 3, 133, 96, 102, 94.5, 43, 87, 90]
  ,['2022/03/01',  512, 3, 133, 96, 102, 94.5, 43, 87, 90]
  ,['2022/04/01',  512, 3, 133, 96, 102, 94.5, 43, 87, 90]
  ,['2022/05/01',  512, 3, 133, 96, 102, 94.5, 43, 87, 90]
  ,['2022/05/20',  573, 1, 80, 106, 112, 115, 63, 87, 90]

]


function generateChart () {
  const items = ['total-score', 'class-sort', 'all-class-sort', 'chinese', 'math', 'english', 'physical', 'biology', 'geography']
  const itemTitleMap = ['总分', '班级排名', '年级排名', '语文', '数学', '英语', '物理', '生物', '地理']

  items.forEach(function(item, index) {
    console.log('init ' + item)
    var chartDom = document.getElementById(item);
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        left: 'center',
        text: itemTitleMap[index]
      },
      xAxis: {
        type: 'category',
        // ['2022/09/01', '2022/09/01', '2022/09/01', '2022/09/01', '2022/09/01', '2022/09/01', 'Sun']
        data: examData.map(v => v[0]),
        axisLine: item.indexOf('sort') !== -1 ? {
          onZero:true   
         } : undefined
     
      },
      axisLabel: {
        show: true,
        interval:0,
        rotate:40,
        textStyle: {
            color: '#333'
        }
      },
      yAxis: {
        inverse: item.indexOf('sort') !== -1 ? true: false,
        type: 'value',

      },
      series: [
        {
           // [150, 230, 224, 218, 135, 147, 260],
          data: examData.map(v => v[index + 1]),
          type: 'line',
          itemStyle : { normal: {label : {show: true}}}
        }
      ]
    };

    option && myChart.setOption(option);
  })
} 

// 
generateChart()