export function appReducer(state, action){
    switch(action.type){
        case "GET_POSTS":
            return {
                posts: action.payload
            }
        case "ADD_POST":
            return {
                posts: [...state.posts, action.payload]
            }
        case "UPDATE_POST":
            //const update = posts.map(post => ) ;
            const updatedTask = state.posts.map(post => {
                if(post._id === action.payload._id){
                    post.title = action.payload.title;
                    post.description = action.payload.description;
                }
                return post;
            })
            return {
                posts: updatedTask
            }
        case "DELETE_POST":

            return {
                posts: state.posts.filter(post => post._id !== action.payload)
            }
        default: 
            return state;
    }
}