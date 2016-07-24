import React from 'react';
import Captcha from '../Captcha'
import {Card, CardHeader, CardText} from 'material-ui/Card';
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
                    <Card>
                        <CardHeader
                            title="What is Trump Anxiety?"
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                            <span style={{fontWeight: 'bold'}}>Trump Anxiety</span>:
                            An increasingly prevalent anxiety disorder characterized
                            by persistent horror at the concept not merely that Donald Trump
                            might be president, but also that we live in a nation which
                            might choose to elect him to that position.
                        </CardText>
                    </Card>
                    <Card style={{marginTop: '20px'}}>
                        <CardHeader
                            title="Do I have Trump Anxiety?"
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                        This serious condition is hoped to impact at least 51% of the American voting
                        population (or whatever the electoral college equivalent
                        of that is). Symptoms include inability to hold a prolonged
                        conversation without eventually circling back to Trump's
                        latest outrage, regular half-baked ideation related to a
                        Canadian exodus, frequent muttering of rhetorical questions
                        like "am I the last sane person left alive?", and a general sense
                        of all-consuming dread about the future of the nation.
                        </CardText>
                    </Card>
                    <Card style={{marginTop: '20px'}}>
                        <CardHeader
                            title="Is Trump Anxiety curable?"
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                        Don't let Trump Anxiety ruin your life!
                        While experts have yet to conclude whether this condition
                        is fatal, the literature agrees that those stricken with
                        Trump Anxiety can manage their condition by remaining
                        politically active, rationally and respectfully discussing
                        substantive issues with others across the political spectrum,
                        and regularly
                        <span style={{fontWeight: 'bold'}}>
                            &nbsp;reaffirming their sanity with others.
                        </span>
                        </CardText>
                    </Card>
                    <p style={{fontWeight: 'bold', marginTop: '20px'}}>
                        Others feel this way too! Don't suffer in silence.
                    </p>
                    <button
                        onClick={() => {this.setState({showCaptcha: true})}}
                        className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
                        style={{width: '100%'}}>
                        Share Your Trump Anxiety Now
                    </button>
                </div>
            </div>
        )
    }

    render() {
        let that = this;
        return (
            <div>
                {this.renderWelcomeMessage()}
                <Captcha
                    handleClose={() => {window.location.href="https://en.wikipedia.org/wiki/Barack_Obama_citizenship_conspiracy_theories"}}
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
