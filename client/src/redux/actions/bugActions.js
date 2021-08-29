import ACTIONS from './index'
import axios from 'axios'

export const fetchBug = async () => {
    const res = await axios.get('/api/bug')
    return res
}

export const dispatchGetAllBugs = (res) => {
    return {
        type: ACTIONS.GET_ALL_BUGS,
        payload: res.data
    }
}
