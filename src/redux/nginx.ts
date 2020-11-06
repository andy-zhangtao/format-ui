import { Dispatch } from 'redux';
import { postFormatContent } from '../utils/nginx';


const START = 1
const END = 2

type Action = {
    type: number;
    payload: any;
}

type State = Readonly<{
    content: string;
    loading: boolean;
    error: string,
}>

const initState: State = {
    content: "",
    loading: false,
    error: "",
}

export function formatAction(data: string, callback: () => void) {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: START,
        })

        try {
            const result = await postFormatContent(data)
            // console.log('response =>', result)
            dispatch({
                type: END,
                payload: result,
            })

            callback()
        } catch (e) {
            dispatch({
                type: END,
                payload: e,
            })
        }
    }
}
export default function (state = initState, action: Action) {
    switch (action.type) {
        case START:
            return {
                ...state,
                loading: true,
            }
        case END:
            return {
                ...state,
                loading: false,
                content: action.payload,
            }
        default:
            return state
    }
}