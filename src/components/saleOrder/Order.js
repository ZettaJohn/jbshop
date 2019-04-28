import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as bs4 from "reactstrap"
import * as MdIcon from 'react-icons/md'
import { defaultItem, public_function } from '../../service'

class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list_best_seller: [],
            list_item_sell: [],
            show_item_sell: [],
            show_total: []
        }
    }
    componentDidMount() {
        this._setListBestSeller(this)
    }
    _addListItemSell(self, getItem) {
        var data_list = self.state.list_item_sell
        var itemQty = 0, totalPrice = 0
        getItem.forEach((val) => {
            var getIndex = public_function.getIndexArray(val.item_id, data_list, "item_id")
            if (getIndex < 0) {
                itemQty++
                totalPrice = parseFloat(val.new_price)
                var newObj = Object.assign({ item_qty: itemQty, total_price: totalPrice }, val)
                data_list.push(newObj)
            } else {
                itemQty = parseInt(data_list[getIndex].item_qty) + 1
                totalPrice = parseFloat(data_list[getIndex].total_price) + parseFloat(val.new_price)
                var newObj = {
                    item_id: val.item_id,
                    barcode: val.barcode,
                    item_name: val.item_name,
                    old_price: val.old_price,
                    new_price: val.new_price,
                    unit: val.unit,
                    last_update: val.last_update,
                    user_update: val.user_update,
                    item_qty: itemQty,
                    total_price: totalPrice
                }
                data_list.splice(getIndex, 1, newObj)
            }
        });

        self.setState({
            list_item_sell: data_list
        }, () => {
            self._setTableShowItemSell(self)
        })
    }
    _deleteListItemSell(self, getItem) {
        var data_list = self.state.list_item_sell
        var itemQty = 0, totalPrice = 0
        getItem.forEach((val) => {
            var getIndex = public_function.getIndexArray(val.item_id, data_list, "item_id")
            itemQty = parseInt(data_list[getIndex].item_qty) - 1
            totalPrice = parseFloat(data_list[getIndex].item_price) - parseFloat(val.new_price)
            if (itemQty < 0) {
                data_list.splice(getIndex, 1)
            } else {
                var newObj = {
                    item_id: val.item_id,
                    barcode: val.barcode,
                    item_name: val.item_name,
                    old_price: val.old_price,
                    new_price: val.new_price,
                    unit: val.unit,
                    last_update: val.last_update,
                    user_update: val.user_update,
                    item_qty: itemQty,
                    total_price: totalPrice
                }
                data_list.splice(getIndex, 1, newObj)
            }
        });
        self.setState({
            list_item_sell: data_list
        })
    }
    _changeItemQty(self, itemID, valChange) {
        var data_list = self.state.list_item_sell
        var itemQty = 0, totalPrice = 0
        var getIndex = public_function.getIndexArray(itemID, data_list, "item_id")
        itemQty = parseInt(valChange)
        totalPrice = parseFloat(data_list[getIndex].new_price) * parseInt(valChange)
        var newObj = {
            item_id: data_list[getIndex].item_id,
            barcode: data_list[getIndex].barcode,
            item_name: data_list[getIndex].item_name,
            old_price: data_list[getIndex].old_price,
            new_price: data_list[getIndex].new_price,
            unit: data_list[getIndex].unit,
            last_update: data_list[getIndex].last_update,
            user_update: data_list[getIndex].user_update,
            item_qty: itemQty,
            total_price: totalPrice
        }
        if (itemQty < 1) {
            data_list.splice(getIndex, 1)
        } else {
            data_list.splice(getIndex, 1, newObj)
        }
        self.setState({
            list_item_sell: data_list
        }, () => {
            self._setTableShowItemSell(self)
        })
    }
    _changeItemPrice(self, itemID, valChange) {
        var data_list = self.state.list_item_sell
        var totalPrice = 0
        var getIndex = public_function.getIndexArray(itemID, data_list, "item_id")
        totalPrice = parseFloat(valChange)
        var newObj = {
            item_id: data_list[getIndex].item_id,
            barcode: data_list[getIndex].barcode,
            item_name: data_list[getIndex].item_name,
            old_price: data_list[getIndex].old_price,
            new_price: data_list[getIndex].new_price,
            unit: data_list[getIndex].unit,
            last_update: data_list[getIndex].last_update,
            user_update: data_list[getIndex].user_update,
            item_qty: data_list[getIndex].item_qty,
            total_price: totalPrice
        }
        data_list.splice(getIndex, 1, newObj)
        self.setState({
            list_item_sell: data_list
        }, () => {
            self._setTableShowItemSell(self)
        })
    }
    _setTableShowItemSell(self) {
        var data_list = self.state.list_item_sell
        var show_list = [], show_list_total = []
        var totalQty = 0, totalPrice = 0, totalDC = 0
        data_list.forEach((val, i) => {
            totalQty += parseInt(val.item_qty)
            totalPrice += parseFloat(val.total_price)
            totalDC += (parseInt(val.item_qty) * parseFloat(val.new_price)) - parseFloat(val.total_price)
            show_list.push(
                < tr >
                    <th style={{ textAlign: "center" }} > {(i + 1)} </th>
                    <th style={{ textAlign: "left" }} > {val.item_name} </th>
                    <th  >
                        <span style={{ float: "right" }}>
                            <bs4.Input type="number" className="inputNum" value={val.item_qty} onChange={(e) => self._changeItemQty(self, val.item_id, e.target.value)} />
                        </span>
                    </th>
                    <th style={{ textAlign: "right" }} > {val.new_price} </th>
                    <th>
                        <span style={{ float: "right" }}>
                            <bs4.Input type="number" className="inputNum" value={val.total_price} onChange={(e) => self._changeItemPrice(self, val.item_id, e.target.value)} />
                        </span>
                    </th>
                </tr >
            )
        });
        show_list_total.push(
            <tr>
                <th colSpan="3" style={{ textAlign: "right" }} >สินค้าทั้งหมด: </th>
                <th style={{ textAlign: "right" }} > {public_function.numberFormat(totalQty)} </th>
                <th style={{ textAlign: "left" }} >ชิ้น</th>
            </tr>
        )
        show_list_total.push(
            <tr>
                <th colSpan="3" style={{ textAlign: "right" }} >ส่วนลด: </th>
                <th style={{ textAlign: "right" }} > {public_function.numberFormat(totalDC)} </th>
                <th style={{ textAlign: "left" }} >บาท</th>
            </tr>
        )
        show_list_total.push(
            <tr>
                <th colSpan="3" style={{ textAlign: "right" }} >ราคารวม: </th>
                <th style={{ textAlign: "right" }} > {public_function.numberFormat(totalPrice)} </th>
                <th style={{ textAlign: "left" }} >บาท</th>
            </tr>
        )
        self.setState({
            show_item_sell: show_list,
            show_total: show_list_total
        })
    }
    _setListBestSeller(self) {
        var data_list = []
        data_list.push(
            <bs4.ListGroupItem className="bg-primary" >
                <span style={{ float: "left" }} >{'สินค้า'}</span>
                <span style={{ float: "right" }} >{'ราคา/ชิ้น'} </span>
            </bs4.ListGroupItem>
        )
        defaultItem.forEach((val) => {
            data_list.push(
                <bs4.ListGroupItem tag="a" href="#" onClick={() => self._addListItemSell(self, [val])} action>
                    <span style={{ float: "left" }} >{val.item_name}</span>
                    <span style={{ float: "right" }} >{val.new_price} </span>
                </bs4.ListGroupItem>
            )
        });
        self.setState({
            list_best_seller: data_list
        })
    }
    render() {
        return (
            <div>
                <bs4.Container className="bgContainer-White" fluid>
                    <div style={{ textAlign: "left", fontSize: "22px", fontWeight: "800" }} >ทำรายการขายสินค้า</div>
                    <bs4.Row>
                        <bs4.Col xs="3" >
                            <bs4.Input type="text" placeholder="สแกนบาร์โค๊ดสินค้า" />
                        </bs4.Col>
                        <bs4.Col xs="2" >
                            <bs4.Button id="btnSearch" color="info" onClick={this.onClick_search} > <MdIcon.MdSearch className="iconlg" /> ค้นหา</bs4.Button>
                        </bs4.Col>
                    </bs4.Row>
                    <hr className="hrCustom" />
                    <bs4.Row>
                        <bs4.Col xs={{ size: 4 }}>
                            <div style={{ textAlign: "left", fontSize: "22px", fontWeight: "800" }} >สินค้าขายดี</div>
                            <bs4.ListGroup flush>
                                {this.state.list_best_seller}
                            </bs4.ListGroup>
                        </bs4.Col>
                        <bs4.Col xs={{ size: 8 }} >
                            <div style={{ textAlign: "left", fontSize: "22px", fontWeight: "800" }} >รายการขายสินค้า</div>
                            <bs4.Table>
                                <thead className="bg-primary" >
                                    <th style={{ textAlign: "center" }} >#</th>
                                    <th style={{ textAlign: "left" }} >รายการ</th>
                                    <th style={{ textAlign: "right" }} >จำนวน</th>
                                    <th style={{ textAlign: "right" }} >ราคา/ชิ้น</th>
                                    <th style={{ textAlign: "right" }} >ราคารวม</th>
                                </thead>
                                {this.state.show_item_sell}
                            </bs4.Table>
                            <bs4.Col xs={{ size: 4, offset: 8 }}>
                                <bs4.Table  >
                                    {this.state.show_total}
                                </bs4.Table>
                            </bs4.Col>
                            <bs4.Col xs={{ size: 12 }}>
                                <bs4.Button color="success" type="button" >
                                    <MdIcon.MdSave className="iconlg" /> บันทึกรายการ
                                </bs4.Button>
                            </bs4.Col>
                        </bs4.Col>
                    </bs4.Row>
                </bs4.Container>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return state
}
export default connect(mapStateToProps)(Order);