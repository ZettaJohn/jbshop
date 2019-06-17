import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as bs4 from "reactstrap"
import * as MdIcon from 'react-icons/md'
import ModalConfirmBox from "../Modal/Confirm_Box"
import ModalAlertBox from "../Modal/Alert_Box"
import Autocomplete from 'react-autocomplete'

const { defaultItem, proxy, public_function } = require("../../service")

class ReturnOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item_best_seller: [],
            list_best_seller: [],
            list_item_sell: [],
            show_item_sell: [],
            show_total: [],
            alert_open: false,
            alert_body: "",
            is_confirm: false,
            dataSrc: [{ barcode: "", item_name: "" }],
        }
    }
    _onChangeForm = (e) => {
        var name = e.target.name
        var val = e.target.value
        this.setState({ [name]: val })
    }
    _onKeypress_enter = (e) => {
        if (e.key === "Enter") {
            this._getOderSearch(this)
        }
    }
    _onClick_search = () => {
        this._getOderSearch(this)
    }
    async _getOderSearch(self) {
        var url = proxy.main + "web-item/search-order/" + self.state.inSearch
        try {
            var res_api = await public_function.api_get(url, "_getOderSearch")
            if (res_api.status === 200) {
                self.setState({ inSearch: "", value: "" })
                self._addListItemSell(self, res_api.result)
            } else {
                self.setState({
                    alert_open: true,
                    alert_body: "ไม่พบสินค้าในระบบ"
                })
            }
        } catch (error) {
            self.setState({
                alert_open: true,
                alert_body: "ไม่พบสินค้าในระบบ"
            })
        }
    }
    _onChangeAutocom = (e) => {
        var id = e.target.id
        var val = e.target.value
        this.setState({ value: val, [id]: val, inSearch: val }, () => {
            this._getAutocomOrder(this)
        })
    }
    async _getAutocomOrder(self) {
        var url = proxy.main + "web-item/autocom-search-order/" + self.state.value
        try {
            var res_api = await public_function.api_get(url, "_getAutocomOrder")
            if (res_api.status === 200) {
                self.setState({ dataSrc: res_api.result })
            }
        } catch (error) {

        }
    }
    _addListItemSell(self, getItem) {
        var data_list = self.state.list_item_sell
        var itemQty = 0, totalPrice = 0
        getItem.forEach((val) => {
            var getIndex = public_function.getIndexArray(val.item_id, data_list, "item_id")
            if (getIndex < 0) {
                itemQty++
                totalPrice = parseFloat(val.new_price)
                var getType_tran = (itemQty < 0) ? 3 : 2
                var newObj = Object.assign({
                    item_qty: itemQty,
                    type_tran: getType_tran,
                    discount: ((val.new_price * itemQty) - totalPrice),
                    price: totalPrice,
                    total_price: totalPrice,
                    ref_doc: val.doc_no,
                    remark: ""
                }, val)
                data_list.push(newObj)
            } else {
                itemQty = parseInt(data_list[getIndex].item_qty) + 1
                totalPrice = parseFloat(data_list[getIndex].total_price) + parseFloat(val.new_price)
                var getType_tran = (itemQty < 0) ? 3 : 2
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
                    discount: ((val.new_price * itemQty) - totalPrice),
                    price: totalPrice,
                    type_tran: getType_tran,
                    total_price: totalPrice,
                    ref_doc: val.doc_no,
                    remark: ""
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
            var getType_tran = (itemQty < 0) ? 3 : 2
            // if (itemQty < 0) {
            //     data_list.splice(getIndex, 1)
            // } else {
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
                discount: ((val.new_price * itemQty) - totalPrice),
                price: totalPrice,
                type_tran: getType_tran,
                total_price: totalPrice,
                ref_doc: "",
                remark: ""
            }
            data_list.splice(getIndex, 1, newObj)
            // }
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
        var getType_tran = (itemQty < 0) ? 3 : 2
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
            discount: ((data_list[getIndex].new_price * itemQty) - totalPrice),
            price: totalPrice,
            type_tran: getType_tran,
            total_price: totalPrice,
            ref_doc: data_list[getIndex].ref_doc,
            remark: data_list[getIndex].remark
        }
        // if (itemQty < 1) {
        //     data_list.splice(getIndex, 1)
        // } else {
        data_list.splice(getIndex, 1, newObj)
        // }
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
            discount: ((data_list[getIndex].new_price * data_list[getIndex].item_qty) - totalPrice),
            price: totalPrice,
            type_tran: data_list[getIndex].type_tran,
            total_price: totalPrice,
            ref_doc: data_list[getIndex].ref_doc,
            remark: data_list[getIndex].remark
        }
        data_list.splice(getIndex, 1, newObj)
        self.setState({
            list_item_sell: data_list
        }, () => {
            self._setTableShowItemSell(self)
        })
    }
    _changeRemark(self, itemID, valChange) {
        var data_list = self.state.list_item_sell
        var getIndex = public_function.getIndexArray(itemID, data_list, "item_id")
        var getRemark = valChange
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
            discount: data_list[getIndex].discount,
            price: data_list[getIndex].price,
            type_tran: data_list[getIndex].type_tran,
            total_price: data_list[getIndex].total_price,
            ref_doc: data_list[getIndex].ref_doc,
            remark: getRemark
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
                    <th style={{ textAlign: "left" }} > {val.item_name}
                        {/* <bs4.Button style={{ float: "right" }} type="button" className="delList" color="danger" onClick={() => this._onClick_del(data_list)} >X</bs4.Button> */}
                    </th>
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
                    <th>
                        <span style={{ float: "right" }}>
                            <bs4.Input type="text" value={val.remark} onChange={(e) => self._changeRemark(self, val.item_id, e.target.value)} />
                        </span>
                    </th>
                    <th style={{ textAlign: "center" }} >
                        {val.doc_no}
                    </th>
                </tr >
            )
        });
        show_list_total.push(
            <tr>
                <th colSpan="5" style={{ textAlign: "right" }} >สินค้าทั้งหมด: </th>
                <th style={{ textAlign: "right" }} > {public_function.numberFormat(totalQty)} </th>
                <th style={{ textAlign: "left" }} >ชิ้น</th>
            </tr>
        )
        show_list_total.push(
            <tr>
                <th colSpan="5" style={{ textAlign: "right" }} >ส่วนลด: </th>
                <th style={{ textAlign: "right" }} > {public_function.numberFormat(totalDC)} </th>
                <th style={{ textAlign: "left" }} >บาท</th>
            </tr>
        )
        show_list_total.push(
            <tr>
                <th colSpan="5" style={{ textAlign: "right" }} >ราคารวม: </th>
                <th style={{ textAlign: "right" }} > {public_function.numberFormat(totalPrice)} </th>
                <th style={{ textAlign: "left" }} >บาท</th>
            </tr>
        )
        self.setState({
            show_item_sell: show_list,
            show_total: show_list_total
        })
    }
    _onClick_save = () => {
        console.log("object", this.state.list_item_sell)
        this.setState({ is_confirm: true })
    }
    _confirm = (conf) => {
        if (conf) {
            this._callApiSaveOrder(this)
            this.setState({ is_confirm: false })
        } else {
            this.setState({ is_confirm: false }, () => {
                // console.log(this.state.is_confirm)
            })
        }
    }
    _alertbox = (stats) => {
        this.setState({ alert_open: stats })
    }
    async _callApiSaveOrder(self) {
        var url = proxy.main + "web-item/return-item/"
        try {
            var res_api = await public_function.api_post(url, "_callApiSaveOrder", self.state.list_item_sell)
            if (res_api.status === 201) {
                self.setState({
                    list_item_sell: [],
                    show_item_sell: [],
                    show_total: [],
                    alert_open: true,
                    alert_body: "บันทึกข้อมูลเรียบร้อยแล้ว!"
                })
            }
        } catch (error) {
            self.setState({
                alert_open: true,
                alert_body: "ผิดพลาด! ระบบมีปัญหาในการบันทึก"
            })
        }
    }
    render() {
        return (
            <div>
                <bs4.Container className="bgContainer-White" fluid>
                    <div style={{ textAlign: "left", fontSize: "22px", fontWeight: "800" }} >ทำรายการคืนสินค้า</div>
                    <bs4.Row>
                        <bs4.Col xs="2" >
                            <Autocomplete
                                items={
                                    this.state.dataSrc
                                }
                                //   shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                shouldItemRender={(item, value) => item.doc_no}
                                getItemValue={item => item.doc_no}
                                renderItem={(item, highlighted) =>
                                    <div
                                        key={item.doc_no}
                                        style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                                    >
                                        {item.doc_no}
                                    </div>
                                }
                                value={this.state.value}
                                onChange={this._onChangeAutocom}
                                onSelect={(value, item) => this.setState({ value: item.doc_no, inSearch: item.doc_no })}
                            />
                        </bs4.Col>
                        <bs4.Col xs="2" >
                            <bs4.Input type="text" autoFocus name="inSearch" placeholder="สแกนใบขายสินค้า" onChange={this._onChangeForm} onKeyPress={this._onKeypress_enter} />
                        </bs4.Col>
                        <bs4.Col xs="2" >
                            <bs4.Button id="btnSearch" color="info" onClick={this._onClick_search} > <MdIcon.MdSearch className="iconlg" /> ค้นหา</bs4.Button>
                        </bs4.Col>
                    </bs4.Row>
                    <hr className="hrCustom" />
                    <bs4.Row>
                        <bs4.Col xs={{ size: 8 }} >
                            <div style={{ textAlign: "left", fontSize: "22px", fontWeight: "800" }} >รายการคืนสินค้า
                            {/* <bs4.Button type="button" id="btnChangeDel" color="danger" >ยกเลิกรายการ</bs4.Button> */}
                            </div>
                            <bs4.Table>
                                <thead className="bg-primary" >
                                    <th style={{ textAlign: "center" }} >#</th>
                                    <th style={{ textAlign: "left" }} >รายการ</th>
                                    <th style={{ textAlign: "right" }} >จำนวน</th>
                                    <th style={{ textAlign: "right" }} >ราคา/ชิ้น</th>
                                    <th style={{ textAlign: "right" }} >ราคารวม</th>
                                    <th style={{ textAlign: "center" }} >หมายเหตุ</th>
                                    <th style={{ textAlign: "center" }} >เอกสารอ้างอิง</th>
                                </thead>
                                {this.state.show_item_sell}
                            </bs4.Table>
                            <bs4.Col xs={{ size: 4, offset: 8 }}>
                                <bs4.Table  >
                                    {this.state.show_total}
                                </bs4.Table>
                            </bs4.Col>
                            <bs4.Col xs={{ size: 12 }}>
                                <bs4.Button color="success" type="button" onClick={this._onClick_save} >
                                    <MdIcon.MdSave className="iconlg" /> บันทึกรายการ
                                </bs4.Button>
                            </bs4.Col>
                        </bs4.Col>
                    </bs4.Row>
                </bs4.Container>
                <ModalAlertBox alertOpen={this.state.alert_open} checkStat={this._alertbox} modalBody={this.state.alert_body} />
                <ModalConfirmBox confirmOpen={this.state.is_confirm} checkStat={this._confirm} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return state
}
export default connect(mapStateToProps)(ReturnOrder);