import React, { useEffect, useState, ReactNode } from "react";
//  예상 시간 예측 해보려고
import * as tf from "@tensorflow/tfjs";

//  슬리터 기본 폭, 작업 중량, 원자재, 입력한 폭, 예상시간set
const EstimatedTime = ({ SLWidth, Weight, Material, Width, setEstTime, SLTime, SLPunch }) => {
  const [model14, setModel14] = useState(null);
  const [model15, setModel15] = useState(null);
  const [model16, setModel16] = useState(null);
  const [model19, setModel19] = useState(null);
  const [model20, setModel20] = useState(null);
  const [model22, setModel22] = useState(null);
  const [model23, setModel23] = useState(null);
  const [model24, setModel24] = useState(null);
  const [model26, setModel26] = useState(null);
  const [model27, setModel27] = useState(null);
  const [model28, setModel28] = useState(null);
  const [model30, setModel30] = useState(null);
  const [model39, setModel39] = useState(null);
  const [model41, setModel41] = useState(null);
  const [model43, setModel43] = useState(null);
  const [model44, setModel44] = useState(null);
  const [model45, setModel45] = useState(null);
  const [model47, setModel47] = useState(null);
  const [model48, setModel48] = useState(null); 
  const [TimeList, setTiemList] = useState([]);
  async function loadModel(number) {
    return await tf.loadLayersModel(`https://storage.googleapis.com/return0_models/${number}/model.json`);
  }

  useEffect(() => {
    function Model_set(model, setmodel, name) {

      loadModel(name).then((loadedModel) => {
        setmodel(loadedModel);
        // loadedModel.summary();
        const result = loadedModel.predict(tf.tensor2d([[SLPunch]], [1, 1]));
        // console.log(Math.round(parseInt(result.toString().split(/\[|]/)[2])));
        var list = TimeList;
        // list.push(Math.round(parseInt(result.toString().split(/\[|]/)[2])));
        list.push(parseInt(result.toString().split(/\[|]/)[2]));
        list.sort(function (a, b) { // 오름차순
          return a - b;
        });
        setTiemList(list);
      });
    }

    if (Material !== "") {
      Model_set(model14, setModel14, 'PR14');
      Model_set(model15, setModel15, 'PR15');
      Model_set(model16, setModel16, 'PR16');
      Model_set(model19, setModel19, 'PR19');
      Model_set(model20, setModel20, 'PR20');
      Model_set(model22, setModel22, 'PR22');
      Model_set(model23, setModel23, 'PR23');
      Model_set(model24, setModel24, 'PR24');
      Model_set(model26, setModel26, 'PR26');
      Model_set(model27, setModel27, 'PR27');
      Model_set(model28, setModel28, 'PR28');
      Model_set(model30, setModel30, 'PR30');
      Model_set(model39, setModel39, 'PR39');
      Model_set(model41, setModel41, 'PR41');
      // Model_set(model43, setModel43, 'PR43');
      Model_set(model44, setModel44, 'PR44');
      // Model_set(model34, setModel34, 'PR34');
      Model_set(model45, setModel45, 'PR45');
      Model_set(model47, setModel47, 'PR47');
      Model_set(model48, setModel48, 'PR48');
    }
  }, [SLWidth])
  useEffect(() => {
    console.log("[TimeList]")
    console.log(Math.floor(SLWidth / Width));
    if (SLWidth > 0 && Width > 0 && Math.floor(SLWidth / Width) > 0) {
      var Addtime = 0;
      console.log(TimeList);
      var timeList = [];
      for (var i = 0; i < Math.floor(SLWidth / Width) && i < TimeList.length; i++) { //  slice 안 됨 -> for문 돌려야함 
        console.log(TimeList[i]);
        timeList.push(TimeList[i]);
      }
      console.log(timeList);
      Addtime = Math.max(...timeList);
      console.log(Addtime);
      var min = parseInt(String(Math.ceil(Addtime / 60)).charAt(0));
      var min_1 = parseInt(String(Math.ceil(min/6)).charAt(0));
      var min_2 = parseInt(String(Math.ceil(min%6)).charAt(0));
      //  슬리터공정시간 + 프레스 공정 시간 + 남은거 분
      setEstTime((SLTime + (Math.ceil((Addtime) / 3600)) + min_1) + (0.1 * min_2))
    }else{
      setEstTime("");
    }
  }, [SLWidth, Width]);

}

export default EstimatedTime