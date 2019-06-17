import React, { Component } from 'react'
import Order from '../components/saleOrder/Order'
import Purchase from '../components/saleOrder/PurchaseOrder'
import Return from '../components/saleOrder/ReturnOrder'
import Claim from '../components/saleOrder/ClaimOrder'

class SaleOrder extends Component {
    render() {
        const { check } = this.props.params
        return (
            <div className="bgBackGround" style={{ padding: "10px 10px 10px 10px" }} >
                {(check == "saleOrder") ? <Order /> : ""}
                {(check == "purchase") ? <Purchase /> : ""}
                {(check == "return") ? <Return /> : ""}
                {(check == "claim") ? <Claim /> : ""}
            </div>
        )
    }
}
export default SaleOrder