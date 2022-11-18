
// 总分、班级排名、年纪排名、日期、语文、数学、英语、物理、生物、地理（以下记录均为原始分， 另外还有赋分）
const examData = [
  // 进入高三 暑期补课期间
  ['2022/09/01',  512, 3, 133, 96, 102, 94.5, 43, 87, 90]
  ,['2022/10/06',  484, 3, 107, 89, 58, 108, 55, 87, 87]
  // 11 月份第3次月考（原始总分491，总分531；无年级排名，生物赋分，地理赋分, [原始分， 赋分]
  ,['2022/11/16',  [491, 531], 2, "", 105, 96, 122, 55, [56, 77], [57, 76]]
]

//
const items = ['total-score', 'class-sort', 'all-class-sort', 'chinese', 'math', 'english', 'physical', 'biology', 'geography']
let itemsTarget  = [573, 1, 80, 106, 112, 115, 63, 87, 90]

const customCfg = {
  'total-score': {
    cfg: {
      yAxis: {
        name: '总分',
        min: 420,
        max: 750
      }
    }
  },
  'class-sort': {
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
        name: '班级排名',
        min: 1,
      }
    }
  },
  'all-class-sort': {
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
        name: '年纪排名',
        min: 1,
      }
    }
  },
  'chinese': {
    cfg: {
      yAxis: {
        name: '语文',
        min: 70,
        max: 150
      }
    }
  },
  'math': {
    cfg: {
      yAxis: {
        name: '数学',
        min: 50,
        max: 150
      }
    }
  },
  'english': {
    cfg: {
      yAxis: {
        name: '英语',
        min: 70,
        max: 150,
      }
    }
  },
  'physical': {
    cfg: {
      yAxis: {
        name: '物理',
        max: 100
      }
    }
  },
  'biology': {
    cfg: {
      yAxis: {
        name: '生物',
        min: 50,
        max: 100
      }
    }
  },
  'geography': {
    cfg: {
      yAxis: {
        name: '地理',
        min: 50,
        max: 100
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



    // 原始成绩
    // const seriesData = examData.map(v => v[index + 1])
    const seriesData = examData.map(v => {
      let score =  v[index + 1]
      if(Array.isArray(score)) {
        return score[0]
      }
      return score
    })

    // 赋分成绩
    const seriesData1 = examData.map(v => {
      let score =  v[index + 1]
      if(Array.isArray(score)) {
        return score[1]
      }
      return ''
    })


    option = {
      // title: {
      //   left: 'center',
      //   text: customCfg[item].title,
      //   textStyle: {
      //     fontSize: 100,
      //     fontWeight: 'bold',
      //   },
      // },
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
        nameTextStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
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
      legend: {
        data: ['原始成绩', '赋分成绩'],
        top: 30,
      },
      series: [
        {
           // [150, 230, 224, 218, 135, 147, 260],
          name: '原始成绩',
          data:  seriesData,
          type: 'line',
          itemStyle : { normal: {label : {show: true}}},
          markLine: {
            silent: true,
            symbol: 'none',
            lineStyle: {
              normal: {
                color: 'red'
              }
            },
            data: [{
              yAxis: itemsTarget[index],
            }],
            label: {
              position: 'start',
              distance: [20, 20],
              normal: {
                formatter: '目标\n' + itemsTarget[index]
              }
            }
          },
        },
        // 赋分成绩
        {
          name: '赋分成绩',
          data: seriesData1,
          type: 'line',
          itemStyle : { normal: {label : {show: true}}},
       }
      ]
    };
    console.log(item + ' option >>>', option)
    option && myChart.setOption(option);
  })
} 

// 
generateChart()
