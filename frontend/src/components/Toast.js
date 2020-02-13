import React from 'react';
import {Alert, Collapse} from 'react-bootstrap';

export default class Toast extends React.Component {
  
    componentDidUpdate() {
        const {showing, onDismiss} = this.props;
        if(showing) {
            clearTimeout(this.dismissTimer);  //if timer was running before, lets reset it
            this.dismissTImer =  setTimeout(onDismiss, 5000);      //timeout in 5 seconds
        }
    }

    componentWillUnmount() {
        clearTimeout(this.dismissTimer);
    }

    render(){
        const {showing, bsStyle, onDismiss, children} = this.props;
        return (
            <Collapse in={showing}>
                <div style={{position: "fixed", bottom: 20, left:20}}>
                    <Alert bsStyle={bsStyle} onDismiss={onDismiss}>{children}</Alert>
                </div>
            </Collapse>
        );
    
    }
}
