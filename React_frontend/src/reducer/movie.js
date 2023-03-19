// 전체 영화 리스트
export const ALLMOVIE_REQUEST = "ALLMOVIE_REQUEST";
export const ALLMOVIE_SUCCESS = "ALLMOVIE_SUCCESS";
export const ALLMOVIE_FAILURE = "ALLMOVIE_FAILURE";
export const ALLMOVIE_SETTING = "ALLMOVIE_SETTING";

// 현재 상영작 리스트
export const SCREENMOVIE_REQUEST = "SCREENMOVIE_REQUEST";
export const SCREENMOVIE_SUCCESS = "SCREENMOVIE_SUCCESS";
export const SCREENMOVIE_FAILURE = "SCREENMOVIE_FAILURE";

// 상영 예정작 리스트
export const COMINGMOVIE_REQUEST = "COMINGMOVIE_REQUEST";
export const COMINGMOVIE_SUCCESS = "COMINGMOVIE_SUCCESS";
export const COMINGMOVIE_FAILURE = "COMINGMOVIE_FAILURE";

// 영화 좋아요 케이스들
export const USER_MLIKE_REQUEST = "USER_MLIKE_REQUEST"
export const USER_MLIKE_SUCCESS = "USER_MLIKE_SUCCESS"
export const USER_MLIKE_FAILURE = "USER_MLIKE_FAILURE"

// 영화 세부정보 리스트
export const DETAIL_MOVIE_REQUEST = "DETAIL_MOVIE_REQUEST";
export const DETAIL_MOVIE_SUCCESS = "DETAIL_MOVIE_SUCCESS";
export const DETAIL_MOVIE_FAILURE = "DETAIL_MOVIE_FAILURE";

// 영화 관람평 최신순 조회 리스트
export const DETAIL_COMMENT_RECENT_REQUEST = "DETAIL_COMMENT_RECENT_REQUEST";
export const DETAIL_COMMENT_RECENT_SUCCESS = "DETAIL_COMMENT_RECENT_SUCCESS";
export const DETAIL_COMMENT_RECENT_FAILURE = "DETAIL_COMMENT_RECENT_FAILURE";

// 영화 관람평 공감순 조회 리스트
export const DETAIL_COMMENT_LIKE_REQUEST = "DETAIL_COMMENT_LIKE_REQUEST";
export const DETAIL_COMMENT_LIKE_SUCCESS = "DETAIL_COMMENT_LIKE_SUCCESS";
export const DETAIL_COMMENT_LIKE_FAILURE = "DETAIL_COMMENT_LIKE_FAILURE";


export const initalState = {
  allmovie_loading: false,
  allmovie_done: false,
  allmovie_error: null,
  allMovieKey: '',
  allMovieSortRate: true,
  allMovieSortLike: false,
  allMovieLimit: 8,
  allMovieId: 'No_login',
  allMovieSearch: '',

  screenmovie_loading: false,
  screenmovie_done: false,
  screenmovie_error: null,


  comingmovie_loading: false,
  comingmovie_done: false,
  comingmovie_error: null,

  MLIKE_loading: false,
  MLIKE_done: false,
  MLIKE_error: null,


  detail_movie_loading: false,
  detail_movie_done: false,
  detail_movie_error: null,
  detail_comment_recent_loading: false,
  detail_comment_recent_done: false,
  detail_comment_recent_error: null,
  detail_comment_like_loading: false,
  detail_comment_like_done: false,
  detail_comment_like_error: null,
  allMovie: [],
  screenMovie: [],
  comingMovie: [],
  detailMovie: [],
  detailComment: [],
};

const movie = (state = initalState, action) => {
  switch (action.type) {
    // 전체 영화 케이스들
    case ALLMOVIE_REQUEST:
      return {
        ...state, 
        allmovie_loading: true,
        allmovie_done: false,
        allmovie_error: null,
        allMovieKey: action.data.key,
        allMovieId: action.data.uid,
        allMovieSearch: action.data.search
      };
    case ALLMOVIE_SUCCESS:
      return {
        ...state,
        allmovie_loading: false,
        allmovie_done: true,
        allmovie_error: null,
        allMovie: action.data
      };
    case ALLMOVIE_FAILURE:
      return {
        ...state,
        allmovie_loading: false,
        allmovie_done: false,
        allmovie_error: action.error,
        allMovie: []
      };
    case ALLMOVIE_SETTING:
      return {
        ...state,
        allMovieKey: action.data.key,
        allMovieSortRate: action.data.rate,
        allMovieSortLike: action.data.like,
        allMovieLimit: action.data.limit,
        allMovieId: action.data.uid,
        allMovieSearch: action.data.search
      };

    
    
    // 현재 상영작 영화 케이스들
    case SCREENMOVIE_REQUEST:
      return {
        ...state, 
        screenmovie_loading: true,
        screenmovie_done: false,
        screenmovie_error: null
      };
    case SCREENMOVIE_SUCCESS:
      return {
        ...state,
        screenmovie_loading: false,
        screenmovie_done: true,
        screenmovie_error: null,
        screenMovie: action.data
      };
    case SCREENMOVIE_FAILURE:
      return {
        ...state,
        screenmovie_loading: false,
        screenmovie_done: false,
        screenmovie_error: action.error,
        screenMovie: []
      };
    // 상영 예정작 영화 케이스들
    case COMINGMOVIE_REQUEST:
      return {
        ...state, 
        comingmovie_loading: true,
        comingmovie_done: false,
        comingmovie_error: null
      };
    case COMINGMOVIE_SUCCESS:
      return {
        ...state,
        comingmovie_loading: false,
        comingmovie_done: true,
        comingmovie_error: null,
        comingMovie: action.data
      };
    case COMINGMOVIE_FAILURE:
      return {
        ...state,
        comingmovie_loading: false,
        comingmovie_done: false,
        comingmovie_error: action.error,
        comingMovie: []
      };


    // 영화 좋아요 누르는 케이스들
		case USER_MLIKE_REQUEST:
			return {
				...state,
				MLIKE_loading: true,
				MLIKE_done: false,
				MLIKE_error: false
			};
		case USER_MLIKE_SUCCESS:

      if(action.data.type === "all") {
        return {
          ...state,
          allMovie: state.allMovie.map(movie => 
            movie.id === action.data.mid ? {...movie, likes: action.data.mlikes, like: action.data.mlike} : movie
          )
        }
      }

			return {
				...state,
				MLIKE_loading: false,
				MLIKE_done: true,
				MLIKE_error: false
			};
		case USER_MLIKE_FAILURE:
			return {
				...state,
				MLIKE_loading: false,
				MLIKE_done: false,
				MLIKE_error: true,
			};
    

    // 영화 세부정보 케이스들
    case DETAIL_MOVIE_REQUEST:
      return {
        ...state, 
        detail_movie_loading: true,
        detail_movie_done: false,
        detail_movie_error: null
      };
    case DETAIL_MOVIE_SUCCESS:
      return {
        ...state,
        detail_movie_loading: false,
        detail_movie_done: true,
        detail_movie_error: null,
        detailMovie: action.data
      };
    case DETAIL_MOVIE_FAILURE:
      return {
        ...state,
        detail_movie_loading: false,
        detail_movie_done: false,
        detail_movie_error: action.error
      };
    // 영화 관람평 최신순 조회 케이스
    case DETAIL_COMMENT_RECENT_REQUEST:
      return {
        ...state, 
        detail_comment_recent_loading: true,
        detail_comment_recent_done: false,
        detail_comment_recent_error: null,
      };
    case DETAIL_COMMENT_RECENT_SUCCESS:
      return {
        ...state,
        detail_comment_recent_loading: false,
        detail_comment_recent_done: true,
        detail_comment_recent_error: null,
        detailComment: action.data
      };
    case DETAIL_COMMENT_RECENT_FAILURE:
      return {
        ...state,
        detail_comment_recent_loading: false,
        detail_comment_recent_done: false,
        detail_comment_recent_error: action.error,
        detailComment: []
      };
    // 영화 관람평 공감순 조회 케이스
    case DETAIL_COMMENT_LIKE_REQUEST:
      return {
        ...state, 
        detail_comment_like_loading: true,
        detail_comment_like_done: false,
        detail_comment_like_error: null,
      };
    case DETAIL_COMMENT_LIKE_SUCCESS:
      return {
        ...state,
        detail_comment_like_loading: false,
        detail_comment_like_done: true,
        detail_comment_like_error: null,
        detailComment: action.data
      };
    case DETAIL_COMMENT_LIKE_FAILURE:
      return {
        ...state,
        detail_comment_like_loading: false,
        detail_comment_like_done: false,
        detail_comment_like_error: action.error,
        detailComment: []
      };
    default:
      return state;
  }
};
export default movie;
