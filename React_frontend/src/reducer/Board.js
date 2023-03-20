export const initalState = {
    board_read_loading:false,
    board_read_done:false,
    board_read_error:null,

    board_search_loading:false,
    board_search_done:false,
    board_search_error:null,

    content_read_loading:false,
    content_read_done:false,
    content_read_error:null,

    content_delete_loading:false,
    content_delete_done:false,
    content_delete_error:null,

    board_write_loading:false,
    board_write_done:false,
    board_write_error:null,

    board_delete_loading:false,
    board_delete_done:false,
    board_delete_error:null,

    board:[],
    content:[]


  };

  export const BOARD_READ_REQUEST = "BOARD_READ_REQUEST"
  export const BOARD_READ_SUCCESS = "BOARD_READ_SUCCESS"
  export const BOARD_READ_FAILURE = "BOARD_READ_FAILURE"

  export const BOARD_SEARCH_REQUEST = "BOARD_SEARCH_REQUEST"
  export const BOARD_SEARCH_SUCCESS = "BOARD_SEARCH_SUCCESS"
  export const BOARD_SEARCH_FAILURE = "BOARD_SEARCH_FAILURE"
 
  export const CONTENT_READ_REQUEST = "CONTENT_READ_REQUEST"
  export const CONTENT_READ_SUCCESS = "CONTENT_READ_SUCCESS"
  export const CONTENT_READ_FAILURE = "CONTENT_READ_FAILURE"

  export const CONTENT_DELETE_REQUEST = "CONTENT_DELETE_REQUEST"
  export const CONTENT_DELETE_SUCCESS = "CONTENT_DELETE_SUCCESS"
  export const CONTENT_DELETE_FAILURE = "CONTENT_DELETE_FAILURE"

  export const BOARD_WRITE_REQUEST = "BOARD_WRITE_REQUEST"
  export const BOARD_WRITE_SUCCESS = "BOARD_WRITE_SUCCESS"
  export const BOARD_WRITE_FAILURE = "BOARD_WRITE_FAILURE"

  export const BOARD_DELETE_REQUEST = "BOARD_DELETE_REQUEST"
  export const BOARD_DELETE_SUCCESS = "BOARD_DELETE_SUCCESS"
  export const BOARD_DELETE_FAILURE = "BOARD_DELETE_FAILURE"
  
  const Board = (state = initalState, action) => {
    switch (action.type) {
      //전체 영화 검색 movie reduecer 의 값 변경이 안되서 새로 만듬
        case BOARD_READ_REQUEST:
            return{
                ...state,
                board_read_loading:true,
                board_read_done:false,
                board_read_error:null,
         }
            case BOARD_READ_SUCCESS:
                return{
                    ...state,
                    board_read_loading:false,
                    board_read_done:true,
                    board_read_error:null,
                    board:action.data
                }
            case BOARD_READ_FAILURE:
                return{
                ...state,
                board_read_loading:false,
                board_read_done:false,
                board_read_error:action.error,
        } 
        case BOARD_SEARCH_REQUEST:
            return{
                ...state,
                board_search_loading:true,
                board_search_done:false,
                board_search_error:null,
         }
            case BOARD_SEARCH_SUCCESS:
                return{
                    ...state,
                    board_search_loading:false,
                    board_search_done:true,
                    board_search_error:null,
                    board:action.data
                }
            case BOARD_SEARCH_FAILURE:
                return{
                ...state,
                board_search_loading:false,
                board_search_done:false,
                board_search_error:action.error,
        } 

        case CONTENT_READ_REQUEST:
            return{
                ...state,
                content_read_loading:true,
                content_read_done:false,
                content_read_error:null,
         }
            case CONTENT_READ_SUCCESS:
                return{
                    ...state,
                    content_read_loading:false,
                    content_read_done:true,
                    content_read_error:null,
                    content:action.data
                }
            case CONTENT_READ_FAILURE:
                return{
                ...state,
                content_read_loading:false,
                content_read_done:false,
                content_read_error:action.error,
        }  

        case CONTENT_DELETE_REQUEST:
            return{
                ...state,
                content_delete_loading:true,
                content_delete_done:false,
                content_delete_error:null,
         }
            case CONTENT_DELETE_SUCCESS:
                return{
                    ...state,
                    content_delete_loading:false,
                    content_delete_done:true,
                    content_delete_error:null,
                }
            case CONTENT_DELETE_FAILURE:
                return{
                ...state,
                content_delete_loading:false,
                content_delete_done:false,
                content_delete_error:action.error,
        }  

        case BOARD_WRITE_REQUEST:
            return{
                ...state,
                board_write_loading:true,
                board_write_done:false,
                board_write_error:null,
            }
        case BOARD_WRITE_SUCCESS:
            return{
                    ...state,
                    board_write_loading:false,
                    board_write_done:true,
                    board_write_error:null,
                }
        case BOARD_WRITE_FAILURE:
            return{
                ...state,
                board_write_loading:false,
                board_write_done:false,
                board_write_error:action.error,
            }  
         
            
        case BOARD_DELETE_REQUEST:
            return{
                ...state,
                board_delete_loading:true,
                board_delete_done:false,
                board_delete_error:null,
                }
        case BOARD_DELETE_SUCCESS:
            return{
                ...state,
                board_delete_loading:false,
                board_delete_done:true,
                board_delete_error:null,
                    }
        case BOARD_DELETE_FAILURE:
            return{
                ...state,
                board_delete_loading:false,
                board_delete_done:false,
                board_delete_error:action.error,
                }    
      default:
        return state;
    }
  };
  export default Board;
  