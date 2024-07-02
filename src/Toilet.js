import { Link } from 'react-router-dom';

const Toilet = ({ toilet }) => {
  return (
    <div className="toilet">
        <Link to={`/place/ToiletPage/${toilet.number}`}>
            <h2>{toilet.name}</h2>
        </Link>
    </div>
  )
}

export default Toilet