import React, { Component } from 'react';
import * as bs4 from "reactstrap"

class Alert_Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalBody: "",
      modalHeader: "System message.",
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ modal: nextProps.alertOpen,modalBody:nextProps.modalBody })
  }
  onClick_cancel=()=>{
    this.props.checkStat(false)
    this.setState({
        modal: false
    });
}
  render() {
    return (
      <div>
        <bs4.Modal backdrop="static" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <bs4.ModalHeader toggle={this.toggle}>{this.state.modalHeader}</bs4.ModalHeader>
          <bs4.ModalBody>
            <p style={{textAlign:"center"}} >{this.state.modalBody}</p>
          </bs4.ModalBody>
          <bs4.ModalFooter>
            <bs4.Button style={{width:"100px"}} color="info" onClick={this.onClick_cancel}>OK</bs4.Button>
          </bs4.ModalFooter>
        </bs4.Modal>
      </div>
    );
  }
}

export default Alert_Box;