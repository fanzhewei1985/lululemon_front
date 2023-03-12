import {actionType} from "../const";
const bagDataFromLocal=JSON.parse(localStorage.getItem('bagData') || '[]')
const tokenFromLocal=JSON.parse(localStorage.getItem('token')||'null')
const reviewsFromLocal=JSON.parse(localStorage.getItem('reviews')||'[]')
const initial={
    filter:{},
    products:[],
    totalProducts:'',
    isWomen:false,
    isMen:false,
    oneProduct:{},
    allReviews:reviewsFromLocal,
    bagData:bagDataFromLocal,
    token:tokenFromLocal,
    orderSuccess:false,
    logInFail:false,
    logInSuccess:false,
    isPaid:false,
    orderId:''
}

const productReducer=(state=initial,action)=>{

    switch (action.type){

        case actionType.FETCH_ALL_FILTERS:
            return{
                ...state,filter:action.payload
            }

        case actionType.FILTER_DATA:
            // console.log(action.payload)
            const keyChecked= Object.keys(state.filter).find(key=>key===action.payload.key)
            const item=state.filter[keyChecked]?.map(arr=>{
               if(arr.name && arr.name===action.payload.name){
                return {...arr,isChecked:!arr.isChecked}}
                else if(arr.alt && arr.alt===action.payload.name){
                    return{...arr,isChecked:!arr.isChecked}
                }
                else {return arr}
            })

// console.log(item)
            // const newObj={[keyChecked]:item}
            // console.log(newObj)
            // const itemCopy={...item,isChecked:!item.isChecked}
            return{
                ...state,filter:{...state.filter,[keyChecked]:item}
            }

        case actionType.FETCH_FILTERED_DATA:

            let newList=action.payload.filter(arr=>{
                if(Object.keys(arr).length!==0){return arr}})
            // console.log(action.payload,newList)
            return{
                ...state,products: newList
            }
        case actionType.FETCH_RATED_DATA:
            let copyState=[...action.payload]
             copyState.sort((a,b)=>a?.price?.match(/(\d+)/)[0]-b?.price?.match(/(\d+)/)[0]).reverse()
            // console.log(copyState[1]?.price?.match(/(\d+)/)[0])
            return{
                ...state,products: copyState
            }
        case actionType.FETCH_LOW_DATA:
            let stateCopy=[...action.payload]
            stateCopy.sort((a,b)=>a?.price?.match(/(\d+)/)[0]-b?.price?.match(/(\d+)/)[0])
            // console.log(stateCopy[1]?.price?.match(/(\d+)/)[0])
            return{
                ...state,products: stateCopy
            }

        case actionType.FETCH_PAGE_DATA:
            return{
                ...state,products: action.payload
            }

        case actionType.FETCH_ITEM_NO:
            return{
                ...state,totalProducts: action.payload
            }
        case actionType.CLOSE_BUTTON_DATA:

        return{
            ...state,filter:action.payload
        }
        case actionType.SET_WOMEN:
            return{...state,isWomen: !state.isWomen}
        case actionType.SET_MEN:
            return{...state,isMen: !state.isMen}
        case actionType.FETCH_PRODUCT:
            // console.log(action.payload)
            return{...state,oneProduct: action.payload}
        case actionType.DATA_COLLECTION:
            let reviews=[...state.allReviews]
            reviews.push(action.payload)
            return{
                ...state,allReviews: reviews
            }
        case actionType.ADD_TO_BAG:
            // console.log(action.payload)
            let copyData=[...state.bagData]
            const Index=copyData.findIndex((arr,index)=>{ if ((arr.productId===action.payload.productId) && (arr.swatchAlt===action.payload.swatchAlt)&&(arr.size===action.payload.size))
            {return arr}})
            // console.log(Index)
            // JSON.stringify(arr)===JSON.stringify(action.payload))
            if (Index>=0){copyData.splice(Index,1)
            action.payload.quantity++}
                copyData.push(action.payload)
                return{...state,bagData: copyData}
        case actionType.CHANGE_QUANTITY:
            let copyQtyBag=[...state.bagData]

            const qtyIndex=copyQtyBag.findIndex(arr=>{ if ((arr.productId===action.payload.productId) && (arr.swatchAlt===action.payload.swatchAlt)&&(arr.size===action.payload.size))
            {return arr}})
          copyQtyBag[qtyIndex].quantity=action.payload.quantity
            if(action.payload.quantity===0){
                copyQtyBag=copyQtyBag.filter(arr=>{ if ((arr.productId!==action.payload.productId) || (arr.swatchAlt!==action.payload.swatchAlt) || (arr.size!==action.payload.size))
                {return arr}})
            }
            return{...state,bagData: copyQtyBag}

        case actionType.SUBMIT_LOGIN:
            // console.log(action.payload)
            return{
                ...state,token:action.payload,logInSuccess: true,logInFail: false
            }
        case actionType.SIGN_OUT:
            return{
                ...state,token:null,logInFail: false,logInSuccess: false,orderSuccess: false
            }
        case actionType.ORDER_SUCCESS:
        return{
            ...state,orderSuccess: true,orderId: action.payload
        }
        case actionType.PAYMENT_SUCCESS:
            return{
                ...state,bagData:[],isPaid:true,orderSuccess: false
            }

        case actionType.LOGIN_FAIL:
            return{
                ...state,logInFail: true,logInSuccess: false,token:null
            }
        case actionType.UPDATE_ITEM:
            const copyBagData = [...state.bagData]
            const index = copyBagData.findIndex((item) => {
                if (item.size === action.payload.preSize &&
                    item.colorId === action.payload.preColorId &&
                    item.productId === action.payload.productId) {
                    return item
                }
            })
            copyBagData[index].size = action.payload.size
            copyBagData[index].swatchAlt = action.payload.swatchAlt
            copyBagData[index].imgUrl = action.payload.imgUrl
            copyBagData[index].colorId=action.payload.colorId
            copyBagData[index].sizeIndex=action.payload.sizeIndex
            return {...state,bagData: copyBagData}
        default:
            return state
    }

}


export default productReducer