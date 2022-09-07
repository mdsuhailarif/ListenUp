import { reducerCases } from "./Constants";

export const initialState = {
    token: null,
    playlists: [],
    userInfo: null,
    selectedPlaylistId: "7FzOHhocjK52ykJT15297U",
    selectedPlaylist: null,
    currentPlaying: null,
    playerState: false,
    alerts:false
};

const reducer = (state, action) => {
    switch (action.type) {
        case reducerCases.SET_TOKEN: {
            return {
                ...state, token: action.token
            };
        }
        case reducerCases.SET_PLAYLISTS: {
            return {
                ...state, playlists: action.playlists
            };
        }
        case reducerCases.SET_USERINFO: {
            return {
                ...state, userInfo: action.userInfo
            };
        }
        case reducerCases.SET_PLAYLISTID: {
            return {
                ...state, selectedPlaylistId: action.selectedPlaylistId
            };
        }
        case reducerCases.SET_PLAYLIST: {
            return {
                ...state, selectedPlaylist: action.selectedPlaylist
            };
        }
        case reducerCases.SET_PLAYLING: {
            return {
                ...state, currentPlaying: action.currentPlaying
            };
        }
        case reducerCases.SET_PLAYER_STATE: {
            return {
                ...state, playerState: action.playerState
            };
        }
        case reducerCases.SET_ALERT: {
            return {
                ...state, alerts: action.alerts
            };
        }
        default:
            return state;
    }
};

export default reducer;