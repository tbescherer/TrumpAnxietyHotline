import React from 'react';
import store from '../../core/store.js';

class Messenger extends React.Component {
    constructor(props) {
        super(props);
        this.post = this.post.bind(this);
        this.changeBlogText = this.changeBlogText.bind(this);
        this.renderPosts = this.renderPosts.bind(this);
        this.state = {
            user_id: "",
            posts: [],
            blogText: "",
            error: "",
            conversationID: ""
        }
    }

    startConversationAndListen = () => {
        let conversationRef = firebase.database().ref('conversations');
        let that = this;
        var newConvoKey = conversationRef.push().key;
        conversationRef.transaction(function(conversation) {
            if (conversation === null) {
                let update = {};
                update['open_conversation'] = newConvoKey;
                update[newConvoKey] = {};
                return update;
            } else if (conversation.open_conversation && conversation[conversation.open_conversation]["participant1"] !== firebase.auth().currentUser.uid) {
                console.log("no second participant");
                newConvoKey = conversation.open_conversation;
                conversation[newConvoKey]["participant2"] = firebase.auth().currentUser.uid;
                conversation['open_conversation'] = false;
                return conversation;
            } else {
                conversation['open_conversation'] = newConvoKey;
                conversation[newConvoKey
                ] = {
                    'participant1': firebase.auth().currentUser.uid
                };
                return conversation;
            }
        }, function(error, committed, snapshot){
            that.setState({conversationID: newConvoKey});
            var recentPostsRef = firebase.database().ref('conversations/' + newConvoKey + '/posts').limitToLast(100);
            recentPostsRef.on('child_added', function(data){
                store.dispatch({type:'ADD_POST', data: {'posts': data.val()}});
            });
            recentPostsRef.on('child_removed', function(data){
                store.dispatch({type:'DELETE_POST', data: {'posts': data.val()}});
            })
        });
    };

    componentWillMount() {
        let that = this;
        that.startConversationAndListen();
        firebase.auth().signInAnonymously().catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
        that.context.store.subscribe(function() {
            let state = that.context.store.getState();
            that.setState({posts: state.posts});
        });
    }

    post() {
        let newPostKey = firebase.database().ref().child('conversations').push().key;
        let update = {}
        let that = this;
        console.log(firebase.auth().currentUser.uid);
        let postData = {
            'text': this.state.blogText,
            'user_id': firebase.auth().currentUser.uid,
        }
        console.log(this.state.conversationID)
        update['/conversations/' + this.state.conversationID + "/posts/" + newPostKey] = postData;
        firebase.database().ref().update(update).then(function() {
            that.setState({blogText: ""});
        }).catch((e) => {
            that.setState({error: true});
        });

    }

    startOrJoinConversation() {
        let newConversationKey = firebase.database().ref.child('conversations')
    }

    deletePost() {
        console.log("should delete here");
    }

    changeBlogText(event) {
        this.setState({blogText: event.target.value})
    }

    renderPosts() {
        let posts = this.state.posts.map(function(post) {
            let isCurrentUser = (firebase.auth().currentUser && post.user_id === firebase.auth().currentUser.uid);
            return (
                <div key={post.text}>
                    {isCurrentUser ? "You" : "Anonymous Ally"}: {post.text}
                </div>
            )
        })
        return (
            <div style={{width: '90%', margin: 'auto', marginTop: '10px', paddingBottom: '10px'}} className="mdl-card mdl-shadow--2dp">
                <div className="mdl-card__title" style={{fontSize: '24px'}}>Your Conversation</div>
                <div className="mdl-card__supporting-text">
                {posts}
                </div>
                {this.renderPostArea()}
            </div>
        )
    }

    renderPostArea() {
        return (
            <div style={{paddingLeft: '20px'}}>
                <div className="mdl-textfield mdl-js-textfield">
                    <input onChange={this.changeBlogText} value={this.state.blogText} className="mdl-textfield__input" type="text" id="sample1"/>
                    <label className="mdl-textfield__label" htmlFor="sample1">Text...</label>
                </div>
                <button onClick={this.post} className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                    <i className="material-icons">add</i>
                </button>
                {(this.state.error ? <div>Must be logged in</div> : null)}
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderPosts()}
            </div>
        )
    }
}

Messenger.contextTypes = {
    store: React.PropTypes.object
};

export default Messenger;