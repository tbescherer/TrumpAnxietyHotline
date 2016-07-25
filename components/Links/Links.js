import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionRecordVoiceOver from 'material-ui/svg-icons/action/record-voice-over';
import AvVideoLabel from 'material-ui/svg-icons/av/video-label';
import ShowChart from 'material-ui/svg-icons/editor/show-chart';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';

class Links extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                <div style={{paddingLeft: '15px', paddingTop: '20px', fontSize: '32px'}}>Useful Links</div>
                <List>
                     <ListItem leftIcon={<ActionRecordVoiceOver />} primaryText="Mike Pesca's original Trump Anxiety Hotline" secondaryText={"The inspiration for this website"} onClick={() => {window.location.href='https://player.megaphone.fm/SM1705251648'}} />
                     <ListItem leftIcon={<AvVideoLabel />} primaryText="John Oliver's Trump episode" secondaryText={"Make Donald Drumpf Again"} onClick={() => {window.location.href='https://www.youtube.com/watch?v=DnpO_RTSNmQ'}} />
                     <ListItem leftIcon={<ShowChart />}primaryText="Five Thirty Eight Election Tracker" secondaryText={"Warning: may not be reassuring"} onClick={() => {window.location.href='http://projects.fivethirtyeight.com/2016-election-forecast/'}}/>
                     <ListItem leftIcon={<ActionAssignment />}primaryText="Register to Vote" secondaryText={"Radical experimental treatment for Trump Anxiety"} onClick={() => {window.location.href='https://www.usa.gov/register-to-vote'}}/>
                     <ListItem leftIcon={<SocialPersonAdd />}primaryText="Volunteer for Hillary" secondaryText={"She has the upside of not being Trump"} onClick={() => {window.location.href='https://www.hillaryclinton.com/forms/volunteer/'}}/>
                </List>
            </div>
        )
    }
}

export default Links;
