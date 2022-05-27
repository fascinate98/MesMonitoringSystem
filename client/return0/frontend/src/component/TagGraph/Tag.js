
import React, { useState, useEffect, useRef } from 'react'
import Highcharts from "highcharts/highstock";
import HighchartsReact from 'highcharts-react-official';
import gear from "../../../assets/img/gear.gif";
import gear_error from "../../../assets/img/gear_mio.jpg";
import Grid from '@material-ui/core/Grid';
import gear_stop from "../../../assets/img/gear_stop.jpg";
import { parseTwoDigitYear } from 'moment';
import { call } from '../../service/ApiService';  //  통신


const Tag = ({ selected, openTime, selectCheck, setSelectCheck, selectoptions, selectClick, setSelectClick }) => {
    const savedCallback = useRef();
    const chartComponent = useRef(null);
    const chartComponent2 = useRef(null);
    const [data, setData] = useState([]);
    const RoutineTime = 10; //  10초 간격
    // const [dataChange, setDataChange] = useState([]);
    const [selectedChange, setSelectedChange] = useState(false);
    const [options] = useState({
        chart: {
            renderTo: 'container',
            type: 'spline',
            height:'600px',
            backgroundColor:'transparent'
        },


        title: {
            text: '',
            //  스타일
            align: "center",
            y: 20,
            x: 0,
            style: {
                fontSize: "0px",
                color: (Highcharts.theme && Highcharts.theme.textColor) || "black"
            }
        },

        xAxis: {
            labels: {
                style: {
                    color: "transparent"
                },
                x: 0
            },
            gridLineWidth: 1,
            gridLineDashStyle: 'Line',
            tickWidth: 0,
            type: 'datetime'
        },
        yAxis: [{
            title: {
                text: null
            },
            labels: {
                style:{
                    color:"#c0c0c0"
                }
            },
            gridLineWidth: 0,
        },
        ],
        colors:['#2effe7', '#c4abff', '#ff7373', '#a1ff54', '#ffd770'],
    });



    const [status_Data, setStatue] = useState([]);
    //  통신
    async function getitem(index) {
        try {
            if (selected.length != 0) {
                selected[0].index = index;
                call(`/api/Tag`, selected, 1).then((response) => {
                    setData(response.data.data);
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    const [tenData, setTenData] = useState([]);
    function time() {
        var now = new Date();
        var sec = parseInt(now - openTime) / 1000;
        var day = parseInt(sec / 60 / 60 / 24);

        sec = (sec - (day * 60 * 60 * 24));
        var hour = parseInt(sec / 60 / 60);

        sec = (sec - (hour * 60 * 60));
        var min = parseInt(sec / 60);

        sec = parseInt(sec - (min * 60));

        //  통신
        if (selectClick === 1) {    //  처음 클릭했을 때,
            setSelectClick(selectClick + 1);
            setSelectedChange(false);
            selectCheck ? setSelectCheck(false) : null;
            getitem(0);
        }
        else {
            if (data.length != 0) { // 1초 지나면
                getitem((hour * 3600 + min * 60 + sec));
            }
        }


        //  highchart 나타내기
        if (data.length != 0) {
            setSelectClick(selectClick + 1);
            var time = (new Date()).getTime(), itemIndex;
            var tenDataFor = tenData;
            for (itemIndex = 0; itemIndex < selected.length; itemIndex++) {
                var changestatus = true;
                for (let j = 0; j < chartComponent.current.chart.series.length; j++) {
                    if (selected[j].label == selected[itemIndex].label) {
                        changestatus = false;
                        break;
                    }
                }
                var index_row = 0;
                for (var row1 = 0; row1 < selectoptions.length; row1++) {   //  그래프 순서 초기화 
                    for (var row2 = 0; row2 < selected.length; row2++) {
                        if (selectoptions[row1].label == selected[row2].label) {
                            selected[row2].row = index_row++;
                            break;
                        }
                    }
                }
                if (changestatus) { //  첫번째 데이터 들어왔을 때 => 10개 뿌려주기,


                    const splitData = [];
                    const stautsData = [];
                    if (selectClick == 2) {
                        for (var i = -1 * RoutineTime; i < 0; i++) {    //  10초 데이터 미리 넣기 
                            splitData.push({
                                x: time + i * 1000,
                                y: data[(i + (selected[itemIndex].row * RoutineTime) + RoutineTime)].pressLogPunch,
                            });
                        }

                        //  status
                        for (var i = -1 * RoutineTime; i < 0; i++) {    //  10초 데이터 미리 넣기 
                            stautsData.push({
                                x: time + i * 1000,
                                y: data[(i + (selected[itemIndex].row * RoutineTime) + RoutineTime)].pressLogStatus

                            });
                        }
                        setTenData(itemIndex);
                        // tenDataFor.push(itemIndex);s
                    }

                    chartComponent.current.chart.addSeries({
                        name: selected[itemIndex].label,
                        data: splitData,
                       // yAxis: chartComponent.current.chart.series.length,
                       
                        
                    });

                    setStatue([...status_Data, { name: selected[itemIndex].label }])
                } else {
                    var index_row = 0;
                    if (chartComponent.current.chart.series[itemIndex].data.length > 9) {  //  데이터 10개만 보여주기 위해서
                        var check = false;

                        if (tenDataFor.length > 0) {
                            tenDataFor.forEach((element) => {
                                if (element === itemIndex) {
                                    check = true;
                                }
                            });
                        }
                        if (!check) {
                            // setTenData([...tenData, itemIndex]);
                            tenDataFor.push(itemIndex);
                        }
                    }
                    if (chartComponent.current) {
                        if (tenDataFor.length > 0) {   //  9개 넘으면 앞에 데이터 없애기
                            tenDataFor.forEach((element) => {
                                if (itemIndex === element) {
                                    if (chartComponent.current.chart.series[element].data.length > 9) {
                                        chartComponent.current.chart.series[element].data[0].remove();
                                    }
                                    return false;
                                }
                            });
                        }

                        chartComponent.current.chart.series[itemIndex].addPoint(
                            [time + 1000, data[selected[itemIndex].row].pressLogPunch],
                            true, false
                        );
                    }

                    var copy_staus = status_Data;
                    copy_staus[itemIndex].status = data[selected[itemIndex].row].pressLogStatus;
                    setStatue(copy_staus)

                }
            }
            setTenData(tenDataFor);
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
    return (
        <div >
            {/* <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                {status_Data.map((value) =>
                (
                    <div>
                        <h3>{value.name}</h3>
                        <img
                            src={value.status === 1 ? gear : value.status === 0 ? gear_stop : value.status === -1 ? gear_error : null}
                            sizes="24px"
                        />
                    </div>
                )
                )}
            </Grid> */}
            <figure className="highcharts-figure">
                <HighchartsReact ref={chartComponent} highcharts={Highcharts} options={options} />
            </figure>

        </div>
    );
}

export default Tag