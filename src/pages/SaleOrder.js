import React, { Component } from 'react'
import Order from '../components/saleOrder/Order'

class SaleOrder extends Component {
    render() {
        const { check } = this.props.params
        return (
            <div className="bgBackGround" style={{ padding: "10px 10px 10px 10px" }} >
                {(check == "saleOrder") ? <Order /> : ""}
            </div>
        )
    }
}
export default SaleOrder