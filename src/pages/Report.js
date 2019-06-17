import React, { Component } from 'react'
import AddNewItem from '../components/items/AddNewItem'
import AdjustStock from "../components/items/AdjustStock"
import Report_saleorder from '../components/Report/Report_saleorder'

class Report extends Component {
    render() {
        const { check } = this.props.params
        return (
            <div className="bgBackGround" style={{ padding: "10px 10px 10px 10px" }} >
                {(check == "report_saleorder") ? <Report_saleorder /> : ""}
                {(check == "report_purchaseorder") ? <AdjustStock /> : ""}
                {(check == "report_stock") ? <AddNewItem /> : ""}
                {(check == "report_item") ? <AdjustStock /> : ""}
                {(check == "report_sale_pur_order") ? <AddNewItem /> : ""}
            </div>
        )
    }
}
export default Report