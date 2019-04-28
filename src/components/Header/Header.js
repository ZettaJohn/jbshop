import React, { Component } from 'react';
import './Header.css'
import { NavbarBrand, Navbar } from 'reactstrap'
import { loadState } from '../../localStorage';
import { connect } from 'react-redux'
import Loader from "../Loader/Loader"
var $ = require('jquery')

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            boxMenu: "boxMenu",
            listMenu: "listMenu",
            isToggle: false,
            reportMenu: "reportMenu",
            reportToggle: false,
            isOpen: false,
            isLoading: false,
            isConfirmBox:false,
            isAlertBOx:false
        }
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    onClickReport = () => {
        this.setState(prevState => ({
            reportToggle: !prevState.reportToggle
        }), () => {
            if (this.state.reportToggle) {
                $(".reportMenu").fadeIn("fast");
                $("#rp_arrow_right").hide();
                $("#rp_arrow_down").show();
            } else {
                $(".reportMenu").fadeOut("fast");
                $("#rp_arrow_right").show();
                $("#rp_arrow_down").hide();
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ isLoading: nextProps.isLoader },()=>{
            if(this.state.isLoading){
                $("#loader").fadeIn()
            }else{
                $("#loader").fadeOut()
            }
        })
    }
    componentWillMount() {
        var check_login = loadState("data_user")
        if (typeof check_login == "undefined") {
            alert("กรุณา Login เข้าสู่ระบบก่อน")
            window.location.href = "/"
        }
    }
    render() {
        return (
            <div className="boxHeader">
                <Navbar className="bgHeader" light expand="md">
                    <NavbarBrand href="/" className="logo_header"></NavbarBrand>
                    <div style={{width:"65%"}}>
                        <h5 style={{ color: "#ffffff",float:"left" }} >Butsaracam Shop</h5>
                        <span id="loader" style={{ float: "right",marginTop:"-20px",display:"none" }} >
                        <Loader isLoading={this.state.isLoading} />
                        </span>
                    </div>
                </Navbar>
            </div >
        );
    }
}
function mapStateToProps(state) {
    return state.loader
}
export default connect(mapStateToProps)(Header);