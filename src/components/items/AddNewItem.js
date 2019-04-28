import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as bs4 from "reactstrap"
import * as MdIcon from 'react-icons/md'

class AddNewItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item_id: ""
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
                    <bs4.Input type="text" id="item_id" value={this.state.item_id} />
                  </bs4.Col>
                </bs4.FormGroup>
                <bs4.FormGroup row>
                  <bs4.Label for="barcode" xs={4} >Barcode:</bs4.Label>
                  <bs4.Col xs={8} >
                    <bs4.Input type="text" id="barcode" value={this.state.barcode} />
                  </bs4.Col>
                </bs4.FormGroup>
                <bs4.FormGroup row>
                  <bs4.Label for="item_name" xs={4} >ชื่อสินค้า:</bs4.Label>
                  <bs4.Col xs={8} >
                    <bs4.Input type="text" id="item_name" value={this.state.item_name} />
                  </bs4.Col>
                </bs4.FormGroup>
                <bs4.FormGroup row>
                  <bs4.Label for="old_price" xs={4} >ราคาเดิม:</bs4.Label>
                  <bs4.Col xs={8} >
                    <bs4.Input type="text" id="old_price" value={this.state.old_price} />
                  </bs4.Col>
                </bs4.FormGroup>
                <bs4.FormGroup row>
                  <bs4.Label for="new_price" xs={4} >ราคาใหม่:</bs4.Label>
                  <bs4.Col xs={8} >
                    <bs4.Input type="text" id="new_price" value={this.state.new_price} />
                  </bs4.Col>
                </bs4.FormGroup>
                <bs4.FormGroup row>
                  <bs4.Label for="unit" xs={4} >หน่วยสินค้า:</bs4.Label>
                  <bs4.Col xs={8} >
                    <bs4.Input type="text" id="unit" value={this.state.unit} />
                  </bs4.Col>
                </bs4.FormGroup>
                <bs4.FormGroup row>
                  <bs4.Label for="last_update" xs={4} >แก้ไขล่าสุด:</bs4.Label>
                  <bs4.Col xs={8} >
                    <bs4.Input type="text" id="last_update" value={this.state.last_update} />
                  </bs4.Col>
                </bs4.FormGroup>
                <bs4.FormGroup row>
                  <bs4.Label for="user_update" xs={4} >แก้ไขโดย:</bs4.Label>
                  <bs4.Col xs={8} >
                    <bs4.Input type="text" id="user_update" value={this.state.user_update} />
                  </bs4.Col>
                </bs4.FormGroup>
                <bs4.Col xs={12} >
                  <bs4.Button type="button" color="success" >
                    <MdIcon.MdSave className="iconlg" /> บันทึก
                  </bs4.Button>
                </bs4.Col>
              </bs4.Form>
            </bs4.Row>
          </bs4.Container>
        </bs4.Container>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return state
}
export default connect(mapStateToProps)(AddNewItem);