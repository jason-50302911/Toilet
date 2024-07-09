import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

const Toilet = ({ searchResult }) => {
  const [slice, setSlice] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let sliceToilet = null;
    
    if(searchResult.length > 2 && !open) sliceToilet = searchResult.slice(0,2);
    else sliceToilet = searchResult;

    setSlice(sliceToilet);
  }, [searchResult, open, setSlice]);


  const handleClick = () =>  {
    if (!open) setOpen(true);
    else setOpen(false);
  }

  return (
    <div className="infoForm">
      <div className="toiletList">
        <p>樓層資訊</p>
        {slice && slice.map((toilet) => (
            <div
                key={toilet.number} 
                className="toilet">
                <Link to={`/toiletPage/${toilet.number}`}>
                    <span className="toiletActname">{toilet.actname}</span>
                </Link>
            </div>
          ))}
      </div>
      {searchResult.length > 2 && <button className="toiletLookBtn" onClick={handleClick}>More</button>}
    </div>
  )
}

export default Toilet