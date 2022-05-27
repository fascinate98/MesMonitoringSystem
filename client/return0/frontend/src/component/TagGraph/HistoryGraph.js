import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import Highcharts from "highcharts/highstock";
import HighchartsReact from 'highcharts-react-official';
import loading from "../../../assets/img/loading.gif";
import { call } from '../../service/ApiService';  //  통신


const HistoryGraph = ({ startDate, endDate, setHistoryData, selectOptions }) => {
    const chartComponent = useRef(null);
    const [options] = useState({
        chart: {
            backgroundColor: 'transparent',
            height: 600,
            renderTo: 'container',
            zoomType: 'xy',
            resetZoomButton: {
                position: {
                    align: 'right', // by default
                    //   verticalAlign: 'bottom', // by default
                    x: 8,
                    y: 20
                }
            }
        },
        credits: {
            enabled: false
        },
        // colors: [
        //     '#45446F',
        //     '#BE3D7F',
        //     '#FF6492',
        //     '#FF93A8',
        //     '#FFC3BA',
        //     '#FFEAE4',
        //     '#DFD7FF',
        //     '#B5ACFF',
        //     '#7A77FF',
        //     '#5251C9',
        // ],
        plotOptions: {

            series: {
                label: {
                    connectorAllowed: false,
                },
                connectNulls: true,
                marker: {
                    enabled: false,
                }
            },
        },
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500,
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom',
                        },
                    },
                },
            ],
        },
        title: {
            text: '',
            align: 'center',
            style: {
                fontSize: "0px",
                color: (Highcharts.theme && Highcharts.theme.textColor) || "black"
            }
        },
        subtitle: {
            align: 'center'
        },
        legend: {
            align: 'center',
            width: '90%',
        },
        xAxis: {
            type: 'date'
        },
        colors:['#2effe7', '#c4abff', '#ff7373', '#a1ff54', '#ffd770'],
        yAxis:
            [{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: '#2effe7'
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },
            { // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: '#c4abff'
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },
            { // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: '#ff7373'
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },
            { // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: '#a1ff54'
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },
            { // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: '#ffd770'
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },
            { // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[5]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },
            { // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[6]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[7]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[8]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[9]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[10]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[11]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[12]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[13]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[14]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[15]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[16]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[17]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[18]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[19]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[20]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[21]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[22]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[23]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[24]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[25]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[26]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },
            { // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[27]
                    }
                },
                title: {
                    text: null,
                },
                opposite: true,
                

                // type:'date'

            },],
        tooltip: {
            style: {
                width: '200px'
            },
            valueDecimals: 4,
            shared: true
        },
        navigator: {    //  밑에 확대 되는 거
            enabled: true,
            liveRedraw: true,

        },
        //  버튼
        // rangeSelector: {
        //     allButtonsEnabled: true,
        //     buttons: [{
        //         type: 'month',
        //         count: 3,
        //         text: 'Day',
        //         dataGrouping: {
        //             forced: true,
        //             units: [['day', [1]]]
        //         }
        //     }, {
        //         type: 'year',
        //         count: 1,
        //         text: 'Week',
        //         dataGrouping: {
        //             forced: true,
        //             units: [['week', [1]]]
        //         }
        //     }, {
        //         type: 'all',
        //         text: 'Month',
        //         dataGrouping: {
        //             forced: true,
        //             units: [['month', [1]]]
        //         }
        //     }],
        //     buttonTheme: {
        //         width: 60
        //     },
        //     selected: 2

        // },
        series: []
    });

    const [press] = useState([
        { label: "PR14", value: "1" },
        { label: "PR16", value: "2" },
        { label: "PR19", value: "3" },
        { label: "PR33", value: "4" },
        { label: "PR20", value: "5" },
        { label: "PR23", value: "6" },
        { label: "PR34", value: "7" },
        { label: "PR35", value: "8" },
        { label: "PR36", value: "9" },
        { label: "PR37", value: "10" },
        { label: "PR38", value: "11" },
        { label: "PR39", value: "12" },
        { label: "PR40", value: "13" },
        { label: "PR41", value: "14" },
        { label: "PR43", value: "15" },
        { label: "PR44", value: "16" },
        { label: "PR45", value: "17" },
        { label: "PR47", value: "18" },
        { label: "PR48", value: "19" },
        { label: "PR15", value: "20" },
        { label: "PR22", value: "21" },
        { label: "PR24", value: "22" },
        { label: "PR26", value: "23" },
        { label: "PR27", value: "24" },
        { label: "PR28", value: "25" },
        { label: "PR29", value: "26" },
        { label: "PR30", value: "27" }
    ]);
    async function insertItem() {
        try {
            var list = []
            for(var i=0; i<selectOptions.length; i++){
                list.push(parseInt(selectOptions[i].value));
            }
            list.sort(function(a, b) { // 오름차순
                return a - b;
            });
            console.log(list);
            call("/api/history", {
                startDate: startDate,
                endDate: endDate,
                selectOptions:list

            }, 1).then((response) => {


                let fetchData = response.data.data;
                setHistoryData(fetchData);
                console.log(fetchData);
                var i = 0;

            

                for (var row = 0; i < fetchData.length && row < list.length; row++) {
                    chartComponent.current.chart.addSeries({
                        name: press[list[row]-1].label,
                        data: (function () {
                            var push_data = [];
                            for (; i < fetchData.length && fetchData[i].id == list[row]; i++) {
                                push_data.push([
                                    fetchData[i].punch
                                ]);
                            }
                            return push_data;
                        })(),
                        dashStyle: 'Solid',
                        // lineWidth: 1,
                        showInNavigator: true,
                        yAxis: list[row]-1
                    });

                    console.log(list.length + "=========")
                }

                // for (var a=1; a<=list.length; a++){
                //     chartComponent.current.chart.addSeries({
                //         yAxis: [a]
                //     })
                //     console.log(v)
                // }
                    
            });
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        while (chartComponent.current.chart.series.length) {
            chartComponent.current.chart.series[0].remove();
        }
       // chartComponent.current.chart.setSubtitle({ text: '[' + startDate + '] ~ [' + endDate + ']' });
        chartComponent.current.chart.redraw();
        insertItem();
    }, [startDate, endDate]);
    return (
        <div>
            <HighchartsReact ref={chartComponent} highcharts={Highcharts} options={options} />

        </div>

    )
}

export default HistoryGraph