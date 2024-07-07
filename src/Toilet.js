import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

const Toilet = ({ toilet, liffObject }) => {
  const [btn, setBtn] = useState(null);

  useEffect(() => {
    if (toilet.patterns === "收費廁所") setBtn("toiletWithBtn");
    else setBtn("toilet")
  }, [liffObject, toilet]);

  const handleLiff = () => {
    if (liffObject) {
        liffObject.sendMessages([{
            type: "text",
            text: "Send Messages",
        }, ]);
        liffObject.closeWindow();
    } 
  }
  return (
    <div className={ toilet.patterns === "收費廁所" ? "toilet" : "toiletWithBtn" }>
        <Link to={`/toiletPage/${toilet.number}`}>
            <span className="toiletActname">{toilet.actname}</span>
        </Link>
        {toilet.patterns === "收費廁所" &&
            <button 
              className="liffBtn"
              onClick={handleLiff}>點擊付費
            </button>
        }
    </div>
  )
}

export default Toilet