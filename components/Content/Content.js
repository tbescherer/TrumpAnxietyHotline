import React from 'react';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.post = this.post.bind(this);
        this.changeBlogText = this.changeBlogText.bind(this);
        this.renderPosts = this.renderPosts.bind(this);
        this.state = {
            blogText: "",
            error: false,
            posts: []
        }
    }

    componentDidMount() {
        let that = this;
        that.context.store.subscribe(function() {
            let state = that.context.store.getState();
            that.setState({posts: state.posts});
        })
    }

    post() {
        let newPostKey = firebase.database().ref().child('posts').push().key;
        let update = {}
        let that = this;
        update['/posts/' + newPostKey] = this.state.blogText
        firebase.database().ref().update(update).then(function() {
            that.setState({blogText: ""});
        }).catch((e) => {
            that.setState({error: true});
        });

    }

    deletePost() {
        console.log("should delete here");
    }

    changeBlogText(event) {
        this.setState({blogText: event.target.value})
    }

    renderPosts() {
        let posts = this.state.posts.map(function(post) {
            return (
                <div key={post}>
                    {post}
                </div>
            )
        })
        return (
            <div onClick={this.deletePost}>
                {posts}
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="mdl-textfield mdl-js-textfield">
                    <input onChange={this.changeBlogText} value={this.state.blogText} className="mdl-textfield__input" type="text" id="sample1"/>
                    <label className="mdl-textfield__label" htmlFor="sample1">Text...</label>
                </div>
                <button onClick={this.post} className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                    <i className="material-icons">add</i>
                </button>
                {(this.state.error ? <div>Must be logged in</div> : null)}
                {this.renderPosts()}
            </div>
        );
    }
};

Content.contextTypes = {
    store: React.PropTypes.object
};

export default Content;
