import React, { useState, useEffect, useRef } from 'react'
import Highcharts from "highcharts/highstock";
import HighchartsReact from 'highcharts-react-official';
import { call } from '../../service/ApiService';  //  통신

const Tag = ({ selected, openTime, selectCheck, setSelectCheck, selectoptions }) => {
    const savedCallback = useRef();
    const chartComponent = useRef(null);
    const [data1, setData1] = useState([]);
    const [dataIndex, setData1Index] = useState(0);
    const RoutineTime = 10; //  10분 간격
    const [dataChange, setDataChange] = useState([]);
    const [selectedChange, setSelectedChange] = useState(false);
    const splitData = [];
    //  통신
    async function getitem(startRow, now) {

        try {
            if (selected.length != 0) {
                for (let i = 0; i < selected.length; i++) {
                    selected[i].startRow = startRow;
                }
                call(`/api/Tag`, selected, 1).then((response) => {
                    setData1(response.data.data);
                });
            }
        } catch (err) {
            console.log(err);
        }
    }


    function time() {
        var now = new Date();
        var sec = parseInt(now - openTime) / 1000;
        var day = parseInt(sec / 60 / 60 / 24);

        sec = (sec - (day * 60 * 60 * 24));
        var hour = parseInt(sec / 60 / 60);

        sec = (sec - (hour * 60 * 60));
        var min = parseInt(sec / 60);

        sec = parseInt(sec - (min * 60));

        if (data1.length != 0) {
            setDataChange(data1);
                var time = (new Date()).getTime(), itemIndex;

                for (itemIndex = 0; itemIndex < selected.length; itemIndex++) {
                    // for (itemIndex = dataChange.length / 600; itemIndex < selected.length; itemIndex++) {
                    var changestatus = true;
                    for (let j = 0; j < chartComponent.current.chart.series.length; j++) {
                        if (selected[j].label == selected[itemIndex].label) {
                            changestatus = false;
                            break;
                        }
                    }
                    if (changestatus) {
                        var index_row = 0;
                        for (var row1 = 0; row1 < selectoptions.length; row1++) {
                            for (var row2 = 0; row2 < selected.length; row2++) {
                                if (selectoptions[row1].label == selected[row2].label) {
                                    selected[row2].row = index_row++;
                                    break;
                                }
                            }
                        }

                        for (var i = -29; i <= 0; i++) {
                            splitData.push({
                                x: time + i * 1000,
                                y: data1[(i + (selected[itemIndex].row ) + 29)].pressLogPunch
                            });
                        }
                      // chartComponent.current.chart.addSeries({
                      //     name: selected[itemIndex].label,
                      //     data: splitData
                      // });
                    } else {  //  삭제했을 때, 

                        var index_row = 0;
                        for (var row1 = 0; row1 < selectoptions.length; row1++) {
                            for (var row2 = 0; row2 < selected.length; row2++) {
                                if (selectoptions[row1].label == selected[row2].label) {
                                    selected[row2].row = index_row++;
                                    break;
                                }
                            }
                        }
                    }
                }
                setSelectedChange(true);    //  바꿨을 때 멈추기
            

        }
        if (((min % RoutineTime) == 0 && sec == 0) || selectCheck) {
            setSelectedChange(false);
            selectCheck ? setSelectCheck(false) : null;
            getitem(parseInt(min / RoutineTime), now);
        }

    }

    useEffect(() => {
        savedCallback.current = time;
    }, [getitem]);
    useEffect(() => {
        function getValue() {
            savedCallback.current();
        }
        let id = setInterval(getValue, 1000);
        return () => clearInterval(id);
    }, []);

    const [options] = useState({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            backgroundColor:'transparent',
            events: {
                load: function () {
    
                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                      //  var x = (new Date()).getTime(), // current time
                      //      y = splitData.y;
                        series.addPoint(splitData, true, true);
                    }, 1000);
                }
            }
        },
    
        time: {
            useUTC: false
        },
    
        title: {
            text: 'Real-time tag trend lookup'
        },
    
        accessibility: {
            announceNewData: {
                enabled: true,
                minAnnounceInterval: 15000,
                announcementFormatter: function (allSeries, newSeries, newPoint) {
                    if (newPoint) {
                        return 'New point added. Value: ' + newPoint.y;
                    }
                    return false;
                }
            }
        },
    
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
    
        yAxis: {
            title: {
                text: 'Value'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
    
        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
        },
    
        legend: {
            enabled: false
        },
    
        exporting: {
            enabled: false
        },
    
        series: [{
            name: 'Tag data',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;
    
                for (i = -29; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: splitData.y
                    });
                }
                return data;
            }())
        }]
    });
                
    return (
        <HighchartsReact ref={chartComponent} highcharts={Highcharts} options={options} />
    )
}

export default Tag