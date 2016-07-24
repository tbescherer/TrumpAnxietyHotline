import React from 'react';
import Captcha from '../Captcha'
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessage: true,
            showCaptcha: false,
        }
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
                <button onClick={() => {this.setState({showCaptcha: true})}}className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
                    Message Another Trump Anxiety Sufferer Now
                </button>
            </div>
        )
    }

    render() {
        let that = this;
        return (
            <div>
                {this.renderWelcomeMessage()}
                <Captcha
                    handleClose={() => {that.setState({showCaptcha: false})}}
                    handleSubmit={() => {window.location.href="/messages"}}
                    open={this.state.showCaptcha}
                    />
            </div>
        );
    }
};

Content.contextTypes = {
    store: React.PropTypes.object
};

export default Content;
