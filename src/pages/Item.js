import React, { Component } from 'react'
import AddNewItem from '../components/items/AddNewItem'
import AdjustStock from "../components/items/AdjustStock"

class Item extends Component {
    render() {
        const { check } = this.props.params
        return (
            <div className="bgBackGround" style={{ padding: "10px 10px 10px 10px" }} >
                {(check == "addItem") ? <AddNewItem /> : ""}
                {(check == "adjustStock") ? <AdjustStock /> : ""}
            </div>
        )
    }
}
export default Item