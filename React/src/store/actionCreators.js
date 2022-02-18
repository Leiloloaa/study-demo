import { CHANGE_INPUT , ADD_LIST_ITEM , DEL_LIST_ITEM , GET_LIST} from './actionType'
import axios from 'axios'
import store from './index'

export const changeInputAction = (value) =>({
  type: CHANGE_INPUT,
  value
})

export const addListItemAction = () =>({
  type: ADD_LIST_ITEM
})

export const delListItemAction = (index) =>({
  type: DEL_LIST_ITEM,
  index
})

export const getListAction  = (data)=>({
  type:GET_LIST,
  data
})

export const getListItem = ()=>{
  return ()=>{
    axios
      .get(
        'https://www.fastmock.site/mock/db08798339cea16d6af5706cac68bc0a/test/api/getList'
      )
      .then((res) => {
        const action = getListAction(res.data)
        store.dispatch(action)
      });
  }
}