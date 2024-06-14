import{ useStoreState } from 'easy-peasy';
import Toilet from './Toilet';


const InfoWindow = () => {
    const searchResult = useStoreState((state) => state.searchResult);

    return (
        <>
            { searchResult.length !== 0 &&
                <main className="infoWindow">
                    {(searchResult.map((toilet) => (
                        <Toilet key={toilet.number} toilet={toilet}/>
                    )))}
                </main>
            }
        </>


    )
}

export default InfoWindow