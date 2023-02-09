import { useRef } from "react";
import "./editingarea.css";
const EditingArea = ({ images, updateEditingState }) => {
  const currentHandler = useRef(false);

  function makeResizableDiv(div, top, left) {
    const hel = "resizable" + div;
    console.log(hel);
    const element = document.getElementById(hel);
    console.log(element);
    const resizers = document.querySelectorAll(" .resizer");
    const minimum_size = 40;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    for (let i = 0; i < resizers.length; i++) {
      const currentResizer = resizers[i];
      console.log(currentResizer);
      currentResizer.addEventListener("mousedown", function (e) {
        e.preventDefault();
        // isAnyResizerMouseDown = true;
        original_width = parseFloat(
          getComputedStyle(element, null)
            .getPropertyValue("width")
            .replace("px", "")
        );
        original_height = parseFloat(
          getComputedStyle(element, null)
            .getPropertyValue("height")
            .replace("px", "")
        );
        original_x = left;
        original_y = top;
        original_mouse_x = e.pageX;
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResize);
      });

      const resize = (e) => {
        if (currentResizer.classList.contains("bottom-right")) {
          const delta = e.pageX - original_mouse_x;
          const width = original_width + delta;
          const height = original_height + delta;
          if (width > minimum_size) {
            element.style.width = width + "px";
          }
          if (height > minimum_size) {
            element.style.height = height + "px";
          }
        } else if (currentResizer.classList.contains("bottom-left")) {
          const delta = e.pageX - original_mouse_x;
          const height = original_height - delta;
          const width = original_width - delta;
          if (height > minimum_size) {
            element.style.height = height + "px";
          }
          if (width > minimum_size) {
            element.style.width = width + "px";
            element.style.left =
              original_x + (e.pageX - original_mouse_x) + "px";
          }
        } else if (currentResizer.classList.contains("top-right")) {
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
        } else {
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
        }
      };

      const stopResize = () => {
        const original = element.getBoundingClientRect();
        console.log(original);
        window.removeEventListener("mousemove", resize);
        console.log("stop resize called");
        currentHandler.current = false;
        window.removeEventListener("mouseup", stopResize);
        const obj = {
          index: div,
          height: element.style.height,
          width: element.style.width,
          top: element.style.top,
          left: element.style.left,
        };
        updateEditingState(obj);
      };
    }
  }

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
                makeResizableDiv(
                  ele?.index,
                  ele?.top,
                  ele?.left,
                  (currentHandler.current = true)
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
                  // onMouseDown={(e) =>
                  //   makeResizableDiv(
                  //     ele?.index,
                  //     (currentHandler.current = true)
                  //   )
                  // }
                  ref={currentHandler}
                ></div>
                <div
                  className="resizer top-right"
                  // onMouseDown={(e) =>
                  //   makeResizableDiv(
                  //     ele?.index,
                  //     (currentHandler.current = true)
                  //   )
                  // }
                  ref={currentHandler}
                ></div>
                <div
                  className="resizer bottom-left"
                  // onMouseDown={(e) =>
                  //   makeResizableDiv(
                  //     ele?.index,
                  //     (currentHandler.current = true)
                  //   )
                  // }
                  ref={currentHandler}
                ></div>
                <div
                  className="resizer bottom-right"
                  // onMouseDown={(e) =>
                  //   makeResizableDiv(
                  //     ele?.index,
                  //     (currentHandler.current = true)
                  //   )
                  // }
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
