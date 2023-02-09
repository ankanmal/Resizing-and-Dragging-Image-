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
          {itemsArray.map((e) => {
            return (
              <div
                className=" inItemsArea"
                key={e?.id}
                onClick={() => sendDataToChildren(e)}
              >
                <img
                  src={e?.imgUrl}
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
