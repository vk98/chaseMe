import { GET_FRIEND_REQUEST, GET_MAP_PING, GET_MESSAGES, GET_MATCHES } from './types'

export const showFrinedRequest = (data) => ({
	type: "SHOW_FRIEND_REQUEST",
	payload: data
})

export const showMapPing = (data) => ({
	type: "SHOW_MAP_PING",
	payload: data
})

export const getFriendRequst = (data) => ({
	type: "SHOW_FRIEND_REQUEST",
	payload: data
})

export const getFriendRequst = (data) => ({
	type: "SHOW_FRIEND_REQUEST",
	payload: data
})

export const loadInitialDataSocket = (socket) => {
	return (dispatch) => {
		// dispatch(clearAllItems())
		socket.on('initialList',(res)=>{
		   console.dir(res)
		   dispatch(initialItems(res))
	   })
	}	
}


////examples
export const AddItem = (data) => ({
	type: "ADD_ITEM",
	item: data.item,
	itemId:data.id,
	completed:data.completed
})

export const completeItem = (data) => ({
	type: "COMPLETED_ITEM",
	itemId: data.id,
	completed:data.completed
})

/* Used only by actions for sockets */
export const initialItems = (res) => ({
	type: "INITIAL_ITEMS",
	items: res
})

/***************************************************************************************** */
/* Async Action items using - Sockets													   */
/***************************************************************************************** */
export const loadInitialDataSocket = (socket) => {
	return (dispatch) => {
		// dispatch(clearAllItems())
		socket.on('initialList',(res)=>{
		   console.dir(res)
		   dispatch(initialItems(res))
	   })
	}	
}

export const addNewItemSocket = (socket,id,item) => {
	return (dispatch) => {
		let postData = {
				id:id+1,
				item:item,
				completed:false
		     }
	    socket.emit('addItem',postData)		
	}	
}

export const markItemCompleteSocket = (socket,id,completedFlag) => {
	return (dispatch) => {
		let postData = {
				id:id,
				completed:completedFlag
		     }
		socket.emit('markItem',postData)
	}	
}