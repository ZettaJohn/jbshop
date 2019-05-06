import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as bs4 from "reactstrap"
import * as MdIcon from 'react-icons/md'
import { proxy, public_function } from "../../service"
import { is_loader } from '../../actions'
import ModalConfirmBox from "../Modal/Confirm_Box"
import ModalAlertBox from "../Modal/Alert_Box"
const moment = require("moment")

class AddNewItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item_id: "",
      is_confirm: false,
      is_alert: false,
      item_id: "",
      barcode:"",
      item_name: "",
      old_price: 0,
      new_price: 0,
      unit: "",
      last_update: moment().format("YYYY-MM-DD"),
      user_update: "admin"
    }
  }
  _onChangeForm = (e) => {
    var id = e.target.id
    var value = e.target.value
    this.setState({ [id]: value })
  }
  _saveNewItem = () => {
    this.setState({
      is_confirm: true
    })
  }
  _confirm = (conf) => {
    if (conf) {
      this._callApiSaveNewItem(this)
    }
  }
  async _callApiSaveNewItem(self) {
    self.props.dispatch(is_loader(true))
    var { item_id, barcode, item_name, old_price, new_price, unit, last_update, user_update } = self.state
    var dataSend = [{
      item_id: item_id,
      barcode: barcode,
      item_name: item_name,
      old_price: old_price,
      new_price: new_price,
      unit: unit,
      last_update: last_update,
      user_update: user_update
    }]
    var url = proxy.main + "item/add-item/"
    var res_api = await public_function.api_post(url, "_callApiSaveNewItem", dataSend)
    if (res_api.status == 200) {
      self.setState({ is_confirm: false })
      self.props.dispatch(is_loader(false))
    }
  }
  render() {
    return (
      <div>
        <bs4.Container className="bgContainer-White" fluid>
          <div style={{ textAlign: "left", fontSize: "22px", fontWeight: "800" }} >เพิ่มสินค้า</div>
          <bs4.Row>
            <bs4.Col xs="3" >
              <bs4.Input type="text" placeholder="สแกนบาร์โค๊ดสินค้า" />
            </bs4.Col>
            <bs4.Col xs="2" >
              <bs4.Button id="btnSearch" color="info" onClick={this.onClick_search} > <MdIcon.MdSearch className="iconlg" /> ค้นหา</bs4.Button>
            </bs4.Col>
          </bs4.Row>
          <hr className="hrCustom" />
          <bs4.Container>
            <bs4.Row>
              <bs4.Form>
                <div style={{ textAlign: "left", fontSize: "22px", fontWeight: "800" }} >รายละเอียดสินค้า</div>
                <bs4.FormGroup row>
                  <bs4.Label for="item_id" xs={4} >Item ID:</bs4.Label>
                  <bs4.Col xs={8} >
                    <bs4.Input type="text" id="item_id" value={this.state.item_id} readOnly />
                  </bs4.Col>
                </bs4.FormGroup>
                <bs4.FormGroup row>
                  <bs4.Label for="barcode" xs={4} >Barcode:</bs4.Label>
                  <bs4.Col xs={8} >
                    <bs4.Input type="text" id="barcode" value={this.state.barcode} readOnly />
                  </bs4.Col>
                </bs4.FormGroup>
                <bs4.FormGroup row>
                  <bs4.Label for="item_name" xs={4} >ชื่อสินค้า:</bs4.Label>
                  <bs4.Col xs={8} >
                    <bs4.Input type="text" id="item_name" onChange={this._onChangeForm} value={this.state.item_name} />
                  </bs4.Col>
                </bs4.FormGroup>
                <bs4.FormGroup row>
                  <bs4.Label for="old_price" xs={4} >ราคาเดิม:</bs4.Label>
                  <bs4.Col xs={8} >
                    <bs4.Input type="text" id="old_price" onChange={this._onChangeForm} value={this.state.old_price} />
                  </bs4.Col>
                </bs4.FormGroup>
                <bs4.FormGroup row>
                  <bs4.Label for="new_price" xs={4} >ราคาใหม่:</bs4.Label>
                  <bs4.Col xs={8} >
                    <bs4.Input type="text" id="new_price" onChange={this._onChangeForm} value={this.state.new_price} />
                  </bs4.Col>
                </bs4.FormGroup>
                <bs4.FormGroup row>
                  <bs4.Label for="unit" xs={4} >หน่วยสินค้า:</bs4.Label>
                  <bs4.Col xs={8} >
                    <bs4.Input type="text" id="unit" onChange={this._onChangeForm} value={this.state.unit} />
                  </bs4.Col>
                </bs4.FormGroup>
                <bs4.FormGroup row>
                  <bs4.Label for="last_update" xs={4} >แก้ไขล่าสุด:</bs4.Label>
                  <bs4.Col xs={8} >
                    <bs4.Input type="text" id="last_update" value={this.state.last_update} readOnly />
                  </bs4.Col>
                </bs4.FormGroup>
                <bs4.FormGroup row>
                  <bs4.Label for="user_update" xs={4} >แก้ไขโดย:</bs4.Label>
                  <bs4.Col xs={8} >
                    <bs4.Input type="text" id="user_update" value={this.state.user_update} readOnly />
                  </bs4.Col>
                </bs4.FormGroup>
                <bs4.Col xs={12} >
                  <bs4.Button type="button" color="success" onClick={this._saveNewItem}  >
                    <MdIcon.MdSave className="iconlg" /> บันทึก
                  </bs4.Button>
                </bs4.Col>
              </bs4.Form>
            </bs4.Row>
          </bs4.Container>
        </bs4.Container>
        <ModalAlertBox alertOpen={this.state.is_alert} modalBody={this.state.modal_body} />
        <ModalConfirmBox confirmOpen={this.state.is_confirm} checkStat={this._confirm} />
      </div>
    )
  }
}
function mapStateToProps(state) {
  return state
}
export default connect(mapStateToProps)(AddNewItem);