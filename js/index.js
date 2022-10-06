
// 总分、班级排名、年纪排名、日期、语文、数学、英语、物理、地理、生物、
const examData = [
  // 进入高三 暑期补课期间
  ['2022/09/01',  512, 3, 133, 96, 102, 94.5, 43, 87, 90]

  ,['2022/10/06',  484, 3, 107, 89, 58, 108, 55, 87, 87]
  ,['2022/11/01',  512, 3, 133, 96, 102, 94.5, 43, 87, 90]
  ,['2022/12/01',  512, 3, 133, 96, 102, 94.5, 43, 87, 90]
  ,['2023/01/01',  512, 3, 133, 96, 102, 94.5, 43, 87, 90]
  ,['2022/02/01',  512, 3, 133, 96, 102, 94.5, 43, 87, 90]
  ,['2022/03/01',  512, 3, 133, 96, 102, 94.5, 43, 87, 90]
  ,['2022/04/01',  512, 3, 133, 96, 102, 94.5, 43, 87, 90]
  ,['2022/05/01',  512, 3, 133, 96, 102, 94.5, 43, 87, 90]
  ,['2022/05/20(目标)',  573, 1, 80, 106, 112, 115, 63, 87, 90]

]
// 
const items = ['total-score', 'class-sort', 'all-class-sort', 'chinese', 'math', 'english', 'physical', 'biology', 'geography']
const customCfg = {
  'total-score': {
    title: '总分',
    cfg: {
      yAxis: {
        name: '分数',
        min: 420
      }
    }
  },
  'class-sort': {
    title: '班级排名',
    cfg: {
      xAxis: {
        position: 'bottom',
        nameLocation: 'end',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#cccccc'
          }
        }
      },
      yAxis: {
        nameLocation: 'start',
        inverse: true,
        name: '排名',
        min: 1,
      }
    }
  },
  'all-class-sort': {
    title: '年纪排名',
    cfg: {
      xAxis: {
        position: 'bottom',
        nameLocation: 'end',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#cccccc'
          }
        }
      },
      yAxis: {
        nameLocation: 'start',
        inverse: true,
        name: '排名',
        min: 1,
      }
    }
  },
  'chinese': {
    title: '语文',
    cfg: {
      yAxis: {
        name: '分数',
        min: 70
      }
    }
  },
  'math': {
    title: '数学',
    cfg: {
      yAxis: {
        name: '分数',
        min: 50
      }
    }
  },
  'english': {
    title: '英语',
    cfg: {
      yAxis: {
        name: '分数',
        min: 70
      }
    }
  },
  'physical': {
    title: '物理',
    cfg: {
      yAxis: {
        name: '分数',
      }
    }
  },
  'biology': {
    title: '生物',
    cfg: {
      yAxis: {
        name: '分数',
        min: 50
      }
    }
  },
  'geography': {
    title: '地理',
    cfg: {
      yAxis: {
        name: '分数',
        min: 50
      }
    }
  }
}

// x轴数据（都一样，日期）
const xAxisData = examData.map(v => v[0].substr(2))

function generateChart () {

  // const itemTitleMap = ['总分', '班级排名', '年级排名', '语文', '数学', '英语', '物理', '生物', '地理']

  items.forEach(function(item, index) {
    console.log('init ' + item)
    var chartDom = document.getElementById(item);
    var myChart = echarts.init(chartDom);
    var option;
    let curCfg = customCfg[item].cfg

    // 数据
    const seriesData = examData.map(v => v[index + 1])

    option = {
      title: {
        left: 'center',
        text: customCfg[item].title
      },
      xAxis: Object.assign({}, curCfg.xAxis || {}, {
        name: '时间', 
        type: 'category',
        // ['2022/09/01', '2022/09/01', '2022/09/01', '2022/09/01', '2022/09/01', '2022/09/01', 'Sun']
        data: xAxisData,
        // axisLine: item.indexOf('sort') !== -1 ? {
        //   onZero:true   
        //  } : undefined,
        axisLine: { show: true },
        axisLabel: {
          show: true,
          interval:0,
          rotate:40,
          textStyle: {
            color: '#333'
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#55b9b4'
          }
        }
      
      }),

      yAxis: Object.assign({}, curCfg.yAxis || {}, {
        // name:
        // inverse: item.indexOf('sort') !== -1 ? true: undefined,
        axisLine: { show: true },
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#55b9b4'
          }
        }
        

      }),
      series: [
        {
           // [150, 230, 224, 218, 135, 147, 260],
          data: seriesData,
          type: 'line',
          itemStyle : { normal: {label : {show: true}}},
          markPoint: item.indexOf('sort') !== -1 ? {} : {
            data: [{
              name: '目标',
              value: seriesData[seriesData.length-1], // string 
              show: true,
              itemStyle: {
                // color: '#ff0000'
              },
              label: {
                // color: '#ffffff'
              },
              // symbol: 'roundRect',
              coord: [xAxisData[xAxisData.length-1], seriesData[seriesData.length-1] + ''],
              // symbolSize: 50,
              // type: "max",
              // valueIndex: 1 // 'yAxis'
              // x: 40, // seriesData[seriesData.length-1], 
              // y: 40, // xAxisData[xAxisData.length-1],
            }]
          }
        }
      ]
    };
    console.log(item + ' option >>>', option)
    option && myChart.setOption(option);
  })
} 

// 
generateChart()
