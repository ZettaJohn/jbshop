import React, { Component } from 'react';
import * as bs4 from "reactstrap"
import { loadState } from "../../localStorage"

class Menu extends Component {
    render() {
        // const { Level_User } = loadState("data_user")[0]
        return (
            <div>
                <bs4.Navbar color="light" light expand="md">
                    <bs4.NavbarToggler />
                    <bs4.Nav className="ml-auto" navbar>

                        <bs4.UncontrolledDropdown nav inNavbar>
                            <bs4.DropdownToggle style={{ fontWeight: "800" }} nav caret>
                                ทำรายการสินค้า
                            </bs4.DropdownToggle>
                            <bs4.DropdownMenu right>
                                <bs4.DropdownItem href="/sale-order/saleOrder" >
                                    ขายสินค้า
                                </bs4.DropdownItem>
                                <bs4.DropdownItem href="/clearbill/claim" >
                                    ซื้อสินค้าเข้า
                                </bs4.DropdownItem>
                            </bs4.DropdownMenu>
                        </bs4.UncontrolledDropdown>

                        <bs4.UncontrolledDropdown nav inNavbar>
                            <bs4.DropdownToggle style={{ fontWeight: "800" }} nav caret>
                                รายงานทั้งหมด
                            </bs4.DropdownToggle>
                            <bs4.DropdownMenu right>
                                <bs4.DropdownItem href="/tmsplan/transport-plan" >
                                    รายงานสินค้าทั้งหมด
                                </bs4.DropdownItem>
                                <bs4.DropdownItem href="/report/tracking-status" >
                                    รายงานสต๊อกสินค้า
                                </bs4.DropdownItem>
                                <bs4.DropdownItem href="/report/tracking-status-claim" >
                                    รายงานการขายสินค้า
                                </bs4.DropdownItem>
                                <bs4.DropdownItem href="/report/clearcashbycleardate" >
                                    รายงานการซื้อสินค้า
                                </bs4.DropdownItem>
                                <bs4.DropdownItem href="/report/formaccounting" >
                                    รายงานรวมการซื้อ-ขายสินค้า
                                </bs4.DropdownItem>
                            </bs4.DropdownMenu>
                        </bs4.UncontrolledDropdown>

                        <bs4.UncontrolledDropdown nav inNavbar>
                            <bs4.DropdownToggle style={{ fontWeight: "800" }} nav caret>
                                เกี่ยวกับสินค้าทั้งหมด
                            </bs4.DropdownToggle>
                            <bs4.DropdownMenu right>
                                <bs4.DropdownItem href="/item/addItem" >
                                    เพิ่มสินค้า / แก้ไขสินค้า
                                </bs4.DropdownItem>
                                <bs4.DropdownItem href="/item/addItem" >
                                    ปรับสต๊อกสินค้า
                                </bs4.DropdownItem>
                            </bs4.DropdownMenu>
                        </bs4.UncontrolledDropdown>

                        {/* {
                            (Level_User === "adminsystem") ?
                                <bs4.UncontrolledDropdown nav inNavbar>
                                    <bs4.DropdownToggle style={{ fontWeight: "800" }} nav caret>
                                        Admin-Only
                            </bs4.DropdownToggle>
                                    <bs4.DropdownMenu right>
                                        <bs4.DropdownItem href="/cost-round/import-ship-cost" >
                                            สรุปค่ารอบรายเดือน Cashvan
                                </bs4.DropdownItem>
                                    </bs4.DropdownMenu>
                                </bs4.UncontrolledDropdown> : ""
                        } */}

                    </bs4.Nav>
                </bs4.Navbar>
            </div>
        );
    }
}

export default Menu;