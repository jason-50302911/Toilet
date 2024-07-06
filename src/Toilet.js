import { Link } from 'react-router-dom';

const Toilet = ({ toilet }) => {
  return (
    <div className="toilet">
        <Link to={`/toiletPage/${toilet.number}`}>
            <h2>{toilet.actname}</h2>
        </Link>
    </div>
  )
}

export default Toilet