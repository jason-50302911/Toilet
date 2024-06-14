import { Link } from 'react-router-dom';

const Toilet = ({ toilet }) => {
  return (
    <article className="toilet">
        <Link to={`/place/ToiletPage/${toilet.number}`}>
            <h2>{toilet.name}</h2>
            <p className="toiletAddress">{toilet.address}</p>
        </Link>
    </article>
  )
}

export default Toilet