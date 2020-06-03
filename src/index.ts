import { Observable, fromEvent } from "rxjs";
import { map } from "rxjs/operators";

import "./index.less";

const colorBox: HTMLDivElement = document.querySelector(
  "#color-box"
) as HTMLDivElement;
const currentSelectColor: HTMLDivElement = document.querySelector(
  "#current-select-color"
) as HTMLDivElement;
// 初始化

const init = () => {
  console.log("init");
  const colorArray: [number, number, number][] = [
    [0, 0, 0],
    [128, 128, 128],
    [128, 0, 46],
    [255, 0, 0],
    [255, 128, 46],
    [255, 255, 0],
    [0, 128, 46],
    [0, 128, 192],
    [0, 128, 255],
    [128, 0, 255],
    [255, 255, 255],
    [192, 192, 192],
    [128, 64, 64],
    [255, 128, 192],
    [255, 255, 128],
    [128, 255, 0],
    [128, 255, 255],
    [128, 128, 192],
    [128, 128, 255],
    [128, 0, 128]
  ];

  const templateReducerInput = (
    color?: [number, number, number]
  ): Function | string => {
    let str = "";

    const dg = (color?: [number, number, number]) => {
      if (color) {
        str += `<div class="color-box" style="--color: rgb(${color[0]}, ${
          color[1]
        }, ${color[2]})"></div>`;
        return (color1?: [number, number, number]) => dg(color1);
      }

      return str;
    };

    if (color) {
      return dg(color);
    }

    return str;
  };

  const template = colorArray.reduce(
    (func, nextColor) => func(nextColor),
    templateReducerInput as Function
  )();
  // console.log(template);
  colorBox.innerHTML = template;

  // 生产者
  const source = fromEvent(colorBox, "click");

  // operator 对数据进行加工
  const clickInColorBox = source.pipe(
    map(v => (v.target as HTMLDivElement).style.getPropertyValue("--color"))
  );

  // currentSelectColor消费者
  clickInColorBox.subscribe(color => {
    currentSelectColor.style.setProperty("--color", color);
  });
};

init();
