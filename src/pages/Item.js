import React, { Component } from 'react'
import AddNewItem from '../components/items/AddNewItem'

class Item extends Component {
    render() {
        const { check } = this.props.params
        return (
            <div className="bgBackGround" style={{ padding: "10px 10px 10px 10px" }} >
                {(check == "addItem") ? <AddNewItem /> : ""}
            </div>
        )
    }
}
export default Item