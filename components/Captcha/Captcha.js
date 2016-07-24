import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';

class Captcha extends React.Component {
    constructor(props){
        super(props)
    }

    propTypes: {
        handleClose: React.PropTypes.func.isRequired,
        handleSubmit: React.PropTypes.func.isRequired,
        open: React.PropTypes.bool
    }

    render() {
        let that = this;
        const actions = [
          <FlatButton
            label="Kenya"
            primary={true}
            onTouchTap={this.props.handleClose}
          />,
          <FlatButton
            label="United States"
            primary={true}
            onTouchTap={this.props.handleSubmit}
          />,
        ];
        return (
            <Dialog
              title="Confirm you suffer from Trump Anxiety"
              actions={actions}
              modal={false}
              open={this.props.open}
              onRequestClose={this.props.handleClose}
            >
                <div>
                    In order to create a safe space for Trump Anxiety sufferers,
                    we just need you to answer one quick question:
                </div>
                <br />
                <div style={{fontWeight: 'bold'}}>
                    Where was President Barack Obama born?
                </div>
            </Dialog>
        )
    }
}

export default Captcha;
