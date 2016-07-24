import React from 'react';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.post = this.post.bind(this);
        this.changeBlogText = this.changeBlogText.bind(this);
        this.renderPosts = this.renderPosts.bind(this);
        this.state = {
            blogText: "",
            showMessage: true,
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

    renderPostArea() {
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
        )
    }

    renderWelcomeMessage() {
        return (
            <div style={{width: '90%', margin: 'auto', marginTop: '10px', paddingBottom: '10px'}} className="mdl-card mdl-shadow--2dp">
                <div className="mdl-card__title" style={{color: 'red', fontSize: '24px'}}>You Are Not Alone.</div>
                <div className="mdl-card__supporting-text">
                    <p>
                        <span style={{fontWeight: 'bold'}}>Trump Anxiety</span>-
                        An increasingly prevalent anxiety disorder characterized
                        by persistent horror at the concept not merely that Donald Trump
                        might be president, but also that we live in a nation which
                        might choose to elect him to that position.
                    </p>
                    <p>
                        This disorder is hoped to impact at least 51% of the American voting
                        population (or whatever the electoral college equivalent
                        of that is). Symptoms include inability to hold prolonged
                        conversation without eventually circling back to Trump's
                        latest outrage, regular half-baked ideation related to a
                        Canadian exodus, frequent muttering of rhetorical questions
                        like "am I the last sane person left alive?", and a general sense
                        of all-consuming dread about the future of the nation.
                    </p>
                    <p style={{fontWeight: 'bold'}}>
                        Other people feel this way too.
                    </p>
                    <p>
                        Don't let Trump Anxiety ruin your life!
                        While experts have yet to conclude whether this condition
                        is fatal, the literature agrees suffers can alleviate
                        their condition by remaining politically active,
                        and sharing their anxiety with others.
                    </p>
                </div>
                <button onClick={() => {this.setState({showMessage: false})}}className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
                    Message Another Trump Anxiety Sufferer Now
                </button>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.state.showMessage ? this.renderWelcomeMessage() : this.renderPostArea()}
            </div>
        );
    }
};

Content.contextTypes = {
    store: React.PropTypes.object
};

export default Content;
