import React from 'react';
import store from '../../core/store.js';
import {keycodes} from './constants.js';

class Messenger extends React.Component {
    constructor(props) {
        super(props);
        this.post = this.post.bind(this);
        this.changeBlogText = this.changeBlogText.bind(this);
        this.renderPosts = this.renderPosts.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.postAdminMessage = this.postAdminMessage.bind(this);
        this.state = {
            alone: true,
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
            } else if (conversation.open_conversation && conversation[conversation.open_conversation]["participant1"]["id"] !== firebase.auth().currentUser.uid) {
                console.log("no second participant");
                newConvoKey = conversation.open_conversation;
                let now = new Date();
                let participantData = {
                    'id': firebase.auth().currentUser.uid,
                    'connected_datetime': now.toTimeString()
                }
                that.setState({'alone': false});
                conversation[newConvoKey]["participant2"] = participantData;
                conversation = that.postAdminMessage(conversation, newConvoKey, "Both participants connected at " + now.toTimeString())
                conversation = that.postAdminMessage(conversation, newConvoKey, "OK, Let it all out!")
                conversation['open_conversation'] = false;
                return conversation;
            } else {
                conversation['open_conversation'] = newConvoKey;
                let now = new Date();
                let participantData = {
                    'id': firebase.auth().currentUser.uid,
                    'connected_datetime': now.toDateString()
                }
                conversation[newConvoKey] = {
                    'participant1': participantData
                };
                var participantRef = firebase.database().ref('conversations/' + newConvoKey + '/participant2').limitToLast(1);
                participantRef.on('value', function(data){
                    console.log(data.val());
                    if (data.val() !== null) {
                        that.setState({'alone': false})
                    }
                })
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
            });
        });
    };

    postAdminMessage(conversationsRef, conversationID, postBody) {
        let now = new Date();
        let newPostKey = firebase.database().ref().child('conversations').push().key;
        let postData = {};
        let existingConvo = conversationsRef[conversationID];
        let postInfo = {
            'text': postBody,
            'user_id': 'admin',
            'post_datetime': now.toDateString(),
        }
        let existingPosts = existingConvo["posts"] || {};
        existingPosts[newPostKey] = postInfo;
        existingConvo["posts"] = existingPosts;
        conversationsRef[conversationID] = existingConvo;
        return conversationsRef;
    }

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
        let now = new Date();
        console.log(firebase.auth().currentUser.uid);
        let postData = {
            'text': this.state.blogText,
            'user_id': firebase.auth().currentUser.uid,
            'post_datetime': now.toDateString(),
        }
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
                <div key={post.text} style={{marginLeft: '10px'}}>
                    {isCurrentUser ? "You" : (post.user_id == "admin" ? "Admin" : "Anonymous Ally")}: {post.text}
                </div>
            )
        })
        let style;
        if (this.state.alone) {
            style = {}
        } else {
            style = {background: '#4CAF50'}
        }
        return (
            <div style={{width: '90%', display: 'block', position: 'relative', margin: 'auto', marginTop: '10px', paddingBottom: '10px'}} className="mdl-card mdl-shadow--2dp">
                <div className="mdl-card__title" style={{fontSize: '24px', background: '#CFD8DC'}}>
                Your Shared Anxiety
                <div
                    className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored"
                    style={Object.assign({cursor: 'default', marginRight: '0px'}, style)}
                />
                </div>
                <div className="mdl-card__supporting-text" style={{height: '400px', overflowY: 'scroll', width: '100%', padding: '0px'}}>
                {posts}
                </div>
                {this.renderPostArea()}
            </div>
        )
    }

    handleKeyDown (e) {
        var that = this;
        if (e.keyCode == keycodes.ENTER) {
            that.post();
        } else {
            console.log(e)
        }
    }

    renderPostArea() {
        return (
            <div style={{paddingLeft: '20px', paddingRight: '20px'}}>
                <div className="mdl-textfield mdl-js-textfield" style={{width: '100%'}}>
                    <input onChange={this.changeBlogText} placeholder="Enter your message..." onKeyDown={this.handleKeyDown} value={this.state.blogText} className="mdl-textfield__input" type="text" id="sample1"/>
                </div>
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
