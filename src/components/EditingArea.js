import { useRef } from "react";
import "./editingarea.css";
const EditingArea = ({ images, updateEditingState }) => {
  const currentHandler = useRef(false);

  // const calledBottomRight = (e, resizer) => {
  //   console.log("BottomRight Fn called");
  //   currentHandler.current = true;
  //   console.log(
  //     "Current handler state from bottom right" + currentHandler.current
  //   );
  //   const updatedBottomRight = useResizeBottomRight(
  //     e,
  //     resizer,
  //     currentHandler.current
  //   );
  //   console.log("Handler after mouseUP event " + updatedBottomRight);
  //   currentHandler.current = updatedBottomRight.updateResizerCheck;
  // };
  // const calledBottomLeft = (e, resizer) => {
  //   currentHandler.current = true;
  //   const updatedBottomLeft = useResizeBottomLeft(
  //     e,
  //     resizer,
  //     currentHandler.current
  //   );
  //   currentHandler.current = updatedBottomLeft.updateResizerCheck;
  // };
  // const calledTopRight = (e, resizer) => {
  //   currentHandler.current = true;
  //   const updatedTopRight = useResizeTopRight(
  //     e,
  //     resizer,
  //     currentHandler.current
  //   );
  //   currentHandler.current = updatedTopRight.updateResizerCheck;
  // };
  // const calledTopLeft = (e, resizer) => {
  //   currentHandler.current = true;
  //   const updatedTopLeft = useResizeTopLeft(e, resizer, currentHandler.current);
  //   currentHandler.current = updatedTopLeft.updateResizerCheck;
  // };

  // const itemDragged = (e, resizer) => {
  //   console.log("Dragged Fn called");
  //   //setCurrentHandler(false);
  //   console.log("dragger fn status " + currentHandler.current);
  //   const draggedElement = useDraggElement(e, resizer, currentHandler.current);
  //   //setCurrentHandler(true);
  // };

  const calledTopLeft = (e, resizer, left, top) => {
    const res = "resizable" + resizer;
    const element = document.getElementById(res);

    const minimum_size = 40;
    e.preventDefault();

    let original_width = parseFloat(
      getComputedStyle(element, null)
        .getPropertyValue("width")
        .replace("px", "")
    );
    let original_height = parseFloat(
      getComputedStyle(element, null)
        .getPropertyValue("height")
        .replace("px", "")
    );
    original_x = left;
    original_y = top;
    original_mouse_x = e.pageX;
    const resize = (e) => {
      const delta = e.pageX - original_mouse_x;
      const width = original_width - delta;
      const height = original_height - delta;
      if (width > minimum_size) {
        element.style.width = width + "px";
        element.style.left = original_x + delta + "px";
      }
      if (height > minimum_size) {
        element.style.height = height + "px";
        element.style.top = original_y + delta + "px";
      }
    };
    const stopResize = () => {
      window.removeEventListener("mousemove", resize);
      currentHandler.current = false;
      const obj = {
        index: resizer,
        height: element.style.height,
        width: element.style.width,
        left: element.style.left,
        top: element.style.top,
      };
      updateEditingState(obj);
    };
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  };

  const itemDragged = (e, resizer, isAnyResizerMouseDown) => {
    let isAnyResizerMouse = isAnyResizerMouseDown;
    const res = "resizable" + resizer;
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    const element = document.getElementById(res);

    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    isDragging = true;
    function setTopLeft(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }

    function drag(e) {
      if (isAnyResizerMouse !== true) {
        if (isDragging) {
          e.preventDefault();
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;

          xOffset = currentX;
          yOffset = currentY;
          //transform: `translate3d${ele?.xOffset}px,${ele?.yOffest}px,0`,
          setTopLeft(currentX, currentY, element);
        }
      }
    }

    function dragEnd() {
      isDragging = false;

      const obj = {
        index: resizer,
        xOffset: xOffset,
        yOffest: yOffset,
        top: element.style.top,
        left: element.style.left,
      };
      updateEditingState(obj);
    }
    window.addEventListener("mouseup", dragEnd);
    window.addEventListener("mousemove", drag);
  };
  const calledTopRight = (e, resizer, top) => {
    const res = "resizable" + resizer;
    const element = document.getElementById(res);

    const minimum_size = 40;
    e.preventDefault();

    let original_width = parseFloat(
      getComputedStyle(element, null)
        .getPropertyValue("width")
        .replace("px", "")
    );
    let original_height = parseFloat(
      getComputedStyle(element, null)
        .getPropertyValue("height")
        .replace("px", "")
    );

    const original_y = top;
    original_mouse_x = e.pageX;
    const resize = (e) => {
      const delta = e.pageX - original_mouse_x;
      const width = original_width + delta;
      const height = original_height + delta;
      if (width > minimum_size) {
        element.style.width = width + "px";
      }
      if (height > minimum_size) {
        element.style.height = height + "px";
        element.style.top = original_y - delta + "px";
      }
    };
    const stopResize = () => {
      window.removeEventListener("mousemove", resize);
      currentHandler.current = false;
      const obj = {
        index: resizer,
        height: element.style.height,
        width: element.style.width,
        top: element.style.top,
      };
      updateEditingState(obj);
    };
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  };
  const calledBottomLeft = (e, resizer, left) => {
    const res = "resizable" + resizer;
    const element = document.getElementById(res);

    const minimum_size = 40;
    e.preventDefault();

    let original_width = parseFloat(
      getComputedStyle(element, null)
        .getPropertyValue("width")
        .replace("px", "")
    );
    let original_height = parseFloat(
      getComputedStyle(element, null)
        .getPropertyValue("height")
        .replace("px", "")
    );
    const original_x = left;
    console.log(original_x);

    const original_mouse_x = e.pageX;
    const resize = (e) => {
      const delta = e.pageX - original_mouse_x;
      const height = original_height - delta;
      const width = original_width - delta;
      if (height > minimum_size) {
        element.style.height = height + "px";
      }
      if (width > minimum_size) {
        element.style.width = width + "px";
        element.style.left = original_x + (e.pageX - original_mouse_x) + "px";
      }
    };
    const stopResize = () => {
      window.removeEventListener("mousemove", resize);
      currentHandler.current = false;
      const obj = {
        index: resizer,
        height: element.style.height,
        width: element.style.width,
        left: element.style.left,
      };
      updateEditingState(obj);
    };
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  };
  const calledBottomRight = (e, resizer) => {
    const res = "resizable" + resizer;
    const element = document.getElementById(res);
    const minimum_size = 40;
    e.preventDefault();

    let original_width = parseFloat(
      getComputedStyle(element, null)
        .getPropertyValue("width")
        .replace("px", "")
    );
    let original_height = parseFloat(
      getComputedStyle(element, null)
        .getPropertyValue("height")
        .replace("px", "")
    );
    original_x = element.getBoundingClientRect().left;
    original_y = element.getBoundingClientRect().top;
    original_mouse_x = e.pageX;
    const resize = (e) => {
      const delta = e.pageX - original_mouse_x;
      const width = original_width + delta;
      const height = original_height + delta;
      if (width > minimum_size) {
        element.style.width = width + "px";
      }
      if (height > minimum_size) {
        element.style.height = height + "px";
      }
    };
    const stopResize = () => {
      window.removeEventListener("mousemove", resize);
      //console.log("Stop Resize fn activated");
      currentHandler.current = false;
      const obj = {
        index: resizer,
        width: element.style.width,
        height: element.style.height,
      };
      updateEditingState(obj);
    };
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
    //console.log(isAnyResizerMouse);

    //return isAnyResizerMouse;
  };
  console.log("rendered");
  return (
    <div className="editing-container">
      <h1>Editing area</h1>
      <div className="area-to-edit">
        {images.map((ele, index) => {
          return (
            <div
              className="resizable inItemsArea "
              id={"resizable" + index}
              key={ele?.id}
              onMouseDown={(e) =>
                itemDragged(
                  e,
                  index,
                  currentHandler.current,
                  ele?.top,
                  ele?.left
                )
              }
              style={{
                top: `${ele?.top}px`,
                left: `${ele?.left}px`,
                width: `${ele?.width}px`,
                height: `${ele?.height}px`,
              }}
            >
              <img
                src={ele?.imgUrl}
                style={{ width: "100%", display: "block", height: "100%" }}
              />
              <div className="resizers">
                <div
                  className="resizer top-left"
                  onMouseDown={(e) =>
                    calledTopLeft(
                      e,
                      index,
                      ele?.left,
                      ele?.top,
                      (currentHandler.current = true)
                    )
                  }
                  ref={currentHandler}
                ></div>
                <div
                  className="resizer top-right"
                  onMouseDown={(e) =>
                    calledTopRight(
                      e,
                      index,
                      ele?.top,
                      (currentHandler.current = true)
                    )
                  }
                  ref={currentHandler}
                ></div>
                <div
                  className="resizer bottom-left"
                  onMouseDown={(e) =>
                    calledBottomLeft(
                      e,
                      index,
                      ele?.left,
                      (currentHandler.current = true)
                    )
                  }
                  ref={currentHandler}
                ></div>
                <div
                  className="resizer bottom-right"
                  onMouseDown={(e) =>
                    calledBottomRight(e, index, (currentHandler.current = true))
                  }
                  ref={currentHandler}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default EditingArea;
