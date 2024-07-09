import { createStore, action, thunk, computed } from "easy-peasy";
import axios from 'axios';
import qs from 'qs';

const URL = process.env.REACT_APP_BACKEND_URL;
// const URL = "http://192.168.100.169:5000"

export default createStore({
    url: null,
    setUrl: action((state, payload) => {
        state.url = payload;
    }),
    toilets: [],
    setToilets: action((state, payload) => {
        state.toilets = payload;
    }),
    type: [],
    setType: action((state, payload) => {
        state.type = payload;
    }),
    clickNumber: null,
    setClickNumber: action((state, payload) => {
        state.clickNumber = payload;
    }),
    initLocation: null, 
    setInitLocation: action((state, payload) => {
        state.initLocation = payload;
    }),
    renderToilets: [],
    setRenderToilets: action((state, payload) => {
        state.renderToilets = payload;
    }),
    place: [],
    setPlace: action((state, payload) => {
        state.place = payload;
    }),
    bounds: null,
    setBounds: action((state, payload) => {
        state.bounds = payload;
    }),
    distance: null,
    setDistance: action((state, payload) => {
        state.distance = payload;
    }),
    cenPoint: null,
    setCenPoint: action((state, payload) =>{
        state.cenPoint = payload;
    }),
    mode: 'detect',
    setMode: action((state, payload) => {
        state.mode = payload;
    }),
    mapCenter: null,
    setMapCenter: action((state, payload) => {
        state.mapCenter = payload;
    }),
    nowCenter: null,
    setNowCenter: action((state, payload) => {
        state.nowCenter = payload;
    }),
    infoWinState: null,
    setInfoWinState: action((state, payload) => {
        state.infoWinState = payload;
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
    })
})