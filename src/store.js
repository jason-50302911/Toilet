import { createStore, action, thunk, computed } from "easy-peasy";
import axios from 'axios';
import qs from 'qs';

const URL = "https://toiletproject-e05ca1dabfc6.herokuapp.com/";
// const URL = "http://127.0.0.1:5000";

export default createStore({
    toilets: [],
    setToilets: action((state, payload) => {
        state.toilets = payload;
    }),
    type: [],
    setType: action((state, payload) => {
        state.type = payload;
    }),
    place: [],
    setPlace: action((state, payload) => {
        state.place = payload;
    }),
    nowLocation: [],
    setNowLocation: action((state, payload) => {
        state.nowLocation = payload;
    }),
    renderCenter: '',
    setRenderCenter: action((state, payload) => {
        state.renderCenter = payload;
    }),
    display: true,
    setDisplay: action((state, payload) => {
        state.display = payload;
    }),
    searchResult: [],
    setSearchResult: action((state, payload) => {
        state.searchResult = payload;
    }),
    getToiletByUuId: computed((state) => {
        return (id) => state.searchResult.find(toilet => toilet.number === id);
    }),
    findingSearchId: thunk(async(actions, searchTarget) =>{
        try{
            const response = await axios.get(URL, { 
                params: { 
                    target: "details",
                    idList: searchTarget
                },
                paramsSerializer: params => {
                    return qs.stringify(params, { arrayFormat: 'indices' })
                }
            });
            actions.setSearchResult(response.data);

        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }), 
    findAroundToilets: thunk(async(actions, searchCenter, helpers) => {
        try {
            const response = await axios.get(URL, {
                params: {
                    target: "toilets",
                    lat: searchCenter.lat,
                    lng: searchCenter.lng
                }
            });
            actions.setToilets(response.data);
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    })
})