import{ useStoreState } from 'easy-peasy';
import Toilet from './Toilet';


const InfoWindow = () => {
    const searchResult = useStoreState((state) => state.searchResult);

    return (
        <>
            { searchResult.length !== 0 &&
                <div className="infoWindow">
                    {(searchResult.map((toilet) => (
                        <Toilet key={toilet.number} toilet={toilet}/>
                    )))}
                </div>
            }
        </>


    )
}

export default InfoWindow