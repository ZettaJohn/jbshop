import React, { Component } from 'react';
import * as bs4 from "reactstrap"
import * as MdIcon from 'react-icons/md'
import DatePicker from "react-datepicker"
import { connect } from 'react-redux'
import classnames from 'classnames';
import "react-datepicker/dist/react-datepicker.css";

const moment = require("moment")
const addMonths = require('addmonths')
// const { proxy, public_function } = require("../../service")
const $ = require("jquery")
// var url, apiName

class Report_saleorder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tblSum: SVGComponentTransferFunctionElement,
            tabActive: "1",
            show_date_bill: "",
            show_sale_code: "",
            show_table: [],
            date_start: moment(),
            date_end: moment(),
            tbl_keep: [],
            tblData1: {
                thead: [],
                tbody: [],
                tfoot: []
            },
            tblData2: {
                thead: [],
                tbody: [],
                tfoot: []
            },
            tblData3: {
                thead: [],
                tbody: [],
                tfoot: []
            },
            fWarehouse: "ALL",
            cExpress: "0"
        }
    }
    _setTblShowData(self) {
        var tblShow = []
        if (self.tb1 != null) {
            self.tb1.destroy()
            $("#reportDataStandard").empty()
        }
        self.$reportDataStandard = $("#reportDataStandard")
        self.tb1 = self.$reportDataStandard.DataTable({
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'excelHtml5',
                    title: 'StatusMain'
                },
                {
                    extend: 'pdfHtml5',
                    title: 'StatusMain'
                },
                'copyHtml5',
                // 'csvHtml5',
            ],
            columns: self.state.tblHeader,
            data: self.state.tblBody,
            paging: false,
            info: false,
            // searching:true,
            // ordering:true,
            columnDefs: [
                { "className": "text-center", "targets": [0, 1,2,3,4,5,10,13,21,22,23] },
                { "className": "text-nowrap", "targets": [1,6] },
                // { "className": "text-right text-nowrap", "targets": [4] },
                { "className": "text-right", "targets": [11,12,15] },
            ],
            "rowCallback":function(row,data,index){
                // console.log("row",row);
                // console.log("object",data);
                if(data.StatusSO=="Release"){
                    $(row).find('td:eq(4)').css("background-color","#28a745")
                    // $('td',row).find("td:eq(4)").css("background-color","#28a745")
                }
                switch(data.Tracking){
                    case "Invoice":$(row).find('td:eq(5)').css("background-color","#007bff");break;
                    case "Finish":$(row).find('td:eq(5)').css("background-color","#20c997");break;
                    case "Delivery":$(row).find('td:eq(5)').css("background-color","#6c757d");break;
                    case "Waiting":$(row).find('td:eq(5)').css("background-color","#fd7e14");break;
                    case "Back order":$(row).find('td:eq(5)').css("background-color","#A569BD");break;
                    case "Assignment":$(row).find('td:eq(5)').css("background-color","#F5B7B1");break;
                    case "Finish Check":$(row).find('td:eq(5)').css("background-color","#28a745");break;
                    case "Start Check":$(row).find('td:eq(5)').css("background-color","#ffc107");break;
                    case "Received":$(row).find('td:eq(5)').css("background-color","#1A5276");break;
                }
            }
        })
    }
    onChangeForm = (id, value) => {
        this.setState({ [id]: value })
    }
    render() {
        return (
            <div>
                <bs4.Container className="bgContainer-White" fluid>
                    <div style={{ textAlign: "left", fontSize: "22px", fontWeight: "800" }} >TMS Status Main</div>
                    <bs4.Row>
                        <bs4.Col xs="4" >
                            <bs4.FormGroup row>
                                <bs4.Label style={{ fontWeight: "500", fontSize: "16px", margin: "10px 20px 0px 20px" }} >วันที่</bs4.Label>
                                <div style={{ marginTop: "10px", }} >
                                    <DatePicker
                                        dateFormat="YYYY-MM-DD"
                                        selected={this.state.date_start}
                                        onChange={(date) => this.onChangeForm("date_start", date)}
                                        // minDate={moment(date.addDays(0))}
                                        maxDate={addMonths(new Date(), 1)}
                                    />
                                </div>
                                <bs4.Label style={{ fontWeight: "500", fontSize: "16px", margin: "10px 20px 0px 20px" }} >ถึง</bs4.Label>
                                <div style={{ marginTop: "10px", }} >
                                    <DatePicker
                                        dateFormat="YYYY-MM-DD"
                                        selected={this.state.date_end}
                                        onChange={(date) => this.onChangeForm("date_end", date)}
                                        // minDate={moment(date.addDays(0))}
                                        maxDate={addMonths(new Date(), 1)}
                                    />
                                </div>
                            </bs4.FormGroup>
                        </bs4.Col>
                        <bs4.Col xs="1" >
                            <bs4.Button color="info" onClick={() => { this._onClickSearch(this) }} > <MdIcon.MdSearch className="iconlg" /> SEARCH</bs4.Button>
                        </bs4.Col>
                    </bs4.Row >
                    <hr className="hrCustom" />
                    <bs4.Row>
                        <bs4.Col xs="12">
                            <table id="reportDataStandard" className="table table-striped table-bordered" width="100%" ref={el => this.el = el} >
                            </table>
                        </bs4.Col>
                    </bs4.Row>
                </bs4.Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state
}
export default connect(mapStateToProps)(Report_saleorder);