import { useState } from "react";

const arr = Array(10).fill("hello");

export const HideBoxes = ()=>{
  const [hiddenBoxes, sethiddenBoxes] = useState(arr);
  const handleClick = (index : number) => {
    sethiddenBoxes([...hiddenBoxes, index])
  }

  return(
    <>

    <div className="boxes">
      {arr.map((e,index) => <button key={index} className={`box ${hiddenBoxes.includes(index) ? "hiddenBox" : ""}`} onClick={() => handleClick(index)}>{e} {index}</button>)}
    </div>

    
    </>
  )
}