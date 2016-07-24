import { createStore } from 'redux';

const addPost = (state, data) => {
    let posts = state.posts.slice();
    posts.push(data.posts);
    let nextState = {...state, posts}
    return nextState;
}

const deletePost = (state, data) => {
    let posts = state.posts.filter(function(post) { return post !== data.posts});
    let nextState = {...state, posts}
    return nextState;
}

const logIn = (state, data) => {
    let user_id = data.user_id;
    let nextState = {...state, user_id};
    return nextState;
}

const reducer = (state={posts:[], user_id: ""}, action) => {
    switch (action.type) {
      case 'FETCH_POSTS':
        return state;
      case 'ADD_POST':
        return addPost(state, action.data);
      case 'DELETE_POST':
        return deletePost(state, action.data);
      case 'LOG_IN':
        return logIn(state, action.data);
      default:
        return state;
    }
}

const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension());

export default store;
