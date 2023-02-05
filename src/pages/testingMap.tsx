import { ChatMapLocation } from "components/chat/ChatMapLocation";
import { useEffect, useRef, useState } from "react";

export default function TestingMap() {
  const lista = [{ name: "teste" }, { name: "teste1" }, { name: "teste2" }];
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "ArrowDown" && countRef.current < lista.length - 1) {
        countRef.current = countRef.current + 1;
        setCount(countRef.current);
      }
      if (ev.key === "ArrowUp" && countRef.current > 0) {
        countRef.current = countRef.current - 1;
        setCount(countRef.current);
      }
    });
  }, []);

  console.log(count, "countt");

  return (
    <div>
      {lista.map((el, index) => {
        console.log(count);
        return (
          <div
            key={el.name}
            className={`${
              el.name === lista[count]?.name ? "bg-red-500" : "bg-blue-500"
            }`}
          >
            {el.name}
          </div>
        );
      })}
    </div>
  );
}
