import "./items.css";
import { useEffect, useRef, useState } from "react";
import IMAGE_DATA from "../config/imageData";
import EditingArea from "./EditingArea";
const Items = () => {
  const [itemsArray, setItemsArray] = useState([]);
  useEffect(() => {
    setItemsArray(IMAGE_DATA);
  }, []);
  const countRef = useRef(-1);

  // console.log(itemsArray);
  const [editing, setEditing] = useState([]);

  //console.log(editing);
  const DraggElement = (e, elem, resizer) => {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    let rect = 0;
    let thresholdCrossed = false;
    const element = document.getElementById(resizer);
    console.log(element);

    rect = element.getBoundingClientRect();

    initialX = e.clientX - xOffset;
    //initialX = original.left;
    initialY = e.clientY - yOffset;
    //initialY = original.top;

    isDragging = true;
    function setTopLeft(xPos, yPos, el) {
      el.style.top = yPos + "px";
      el.style.left = xPos + "px";
    }

    function drag(e) {
      if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;
        const top = rect.top + currentY;

        const left = rect.left + currentX;

        setTopLeft(left, top, element);
        if (left > 410 && !thresholdCrossed) {
          console.log("true");
          sendDataToChildren(elem);
          thresholdCrossed = true;
        }
      }
    }

    function dragEnd() {
      isDragging = false;
      if (thresholdCrossed) {
        setTopLeft(rect.left, rect.top, element);
      }
      thresholdCrossed = false;
      window.removeEventListener("mousemove", drag);
      window.removeEventListener("mouseup", dragEnd);
    }
    window.addEventListener("mouseup", dragEnd);
    window.addEventListener("mousemove", drag);
  };
  const sendDataToChildren = (e) => {
    console.log(countRef.current);
    setEditing((prevEditing) => [
      ...prevEditing,
      { index: countRef.current, ...e },
    ]);
    countRef.current += 1;
  };
  const updateEditingState = (obj) => {
    console.log(obj);
    setEditing((prevEditing) => {
      return prevEditing.map((e) => {
        if (obj.index === e.index) {
          return { ...e, ...obj };
        }
        return e;
      });
    });
  };
  console.log(editing);

  return (
    <>
      <div className="items-container">
        <div className="list-items">
          <h1>collection of images and svg</h1>
          {itemsArray.map((ele, index) => {
            return (
              <div
                className=" inItemsArea"
                id={ele?.id}
                key={ele?.id}
                onMouseDown={(e) => {
                  //sendDataToChildren(e)
                  DraggElement(e, ele, ele?.id);
                }}
                //style={{ top: `10+${index}px` }}
              >
                <img
                  src={ele?.imgUrl}
                  style={{ width: "100%", display: "block", height: "100%" }}
                />
              </div>
            );
          })}
        </div>

        <EditingArea images={editing} updateEditingState={updateEditingState} />
      </div>
    </>
  );
};

export default Items;
