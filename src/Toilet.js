import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

const Toilet = ({ searchResult, spare, facilities }) => {
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
      <div className="spareInfo">
        <p>備品資訊</p>
        <div className="spareContainer">
          {typeof(spare) === "string" ? (<span className="spare">{spare}</span>)
            : spare.length >= 1 ?  (spare.map((thing) => 
              (<span className="spare">{thing}</span>)))
                :(<span className="spare">尚未提供資訊</span>)}
        </div>
      </div>
      <div className="spareInfo">
        <p>設施資訊</p>
        <div className="spareContainer">
          {facilities.length >= 1 ?  (facilities.map((thing) => 
              (<span className="spare">{thing}</span>)))
                :(<span className="spare">尚未提供資訊</span>)}
        </div>
      </div>
      {slice && <div className="toiletList">
        <p>樓層資訊</p>
        {slice.map((toilet) => (
            <div
                key={toilet.number} 
                className="toilet">
                <Link to={`/toiletPage/${toilet.number}`}>
                    <span className="toiletActname">{toilet.actname}</span>
                </Link>
            </div>
          ))}
      </div>}
      {searchResult.length > 2 && <button className="toiletLookBtn" onClick={handleClick}>More</button>}
    </div>
  )
}

export default Toilet