// import { is_loader } from './actions'
const { is_loader } = require('./actions')
const crypto = require("crypto")
const strKey = crypto.createHash('md5').update("27iydButojt14").digest('hex');

const proxys = {
    main: "http://dplus-system.com:3499/",
    develop: "http://localhost:3499/",
    testPJohn: "http://192.168.20.60:3499/",
    test: "http://dplus-system.com:3599/"
}
const defaultItem = [{
    item_id: 1,
    barcode: "abcd1234",
    item_name: "item1",
    old_price: 10,
    new_price: 10,
    unit: "PCS",
    last_update: "2019-04-19",
    user_update: "admin"
},
{
    item_id: 2,
    barcode: "abcd1234",
    item_name: "item2",
    old_price: 10,
    new_price: 10,
    unit: "PCS",
    last_update: "2019-04-19",
    user_update: "admin"
},
{
    item_id: 3,
    barcode: "abcd1234",
    item_name: "item3",
    old_price: 10,
    new_price: 10,
    unit: "PCS",
    last_update: "2019-04-19",
    user_update: "admin"
}]
const public_functions = {
    numberFormat(val = "", fixed = 0) {
        val = parseInt(val)
        fixed = parseInt(fixed)
        if (val <= 0) {
            return 0
        }
        if (isNaN(val)) {
            return ""
        }
        if (fixed <= 0) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            return val.toFixed(fixed).toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
        }
    },
    getIndexArray(val = "", arr = [], prop = "") {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][prop] === val) {
                return i
            }
        }
        return -1
    },
    getDiff_Date(start, end) {
        start = start.split(":")
        end = end.split(":")
        var startDate = new Date(0, 0, 0, start[0], start[1], 0)
        var endDate = new Date(0, 0, 0, end[0], end[1], 0)
        var diff = endDate.getTime() - startDate.getTime()
        var hours = Math.floor(diff / 1000 / 60 / 60)
        diff -= hours * 1000 * 60 * 60
        var minutes = Math.floor(diff / 1000 / 60)

        if (hours < 0)
            hours = hours + 24

        return (hours <= 9 ? "0" : "") + hours + " ชั่วโมง " + (minutes <= 9 ? "0" : "") + minutes + " นาที"
    },
    split_number_from_string(text = "") {
        var output = ""
        output = text.replace(/\'/g, '').split(/(\d+)/).filter(Boolean)
        return output
    },
    is_loading(props, stat = false) {
        return new Promise((reslove, reject) => {
            var { type } = props.dispatch(is_loader(stat))
            if (type == "IS_LOAD_TRUE") {
                reslove(true)
            } else if (type == "IS_LOAD_FALSE") {
                reslove(false)
            }
        })
    },
    api_get(url = "", apiName = "") {
        return new Promise((reslove, reject) => {
            fetch(url)
                .then(response => response.json())
                .then((responseJson) => {
                    console.log(apiName, responseJson)
                    reslove(responseJson)
                })
        })
    },
    encryption(strData = "") {
        var mykey = crypto.createCipher('aes-128-cbc', strKey);
        var mystr = mykey.update(strData, 'utf8', 'hex')
        mystr += mykey.update.final('hex');
        return mystr
    },
    decryption(strData = "") {
        var mykey = crypto.createDecipher('aes-128-cbc', strKey);
        var mystr = mykey.update(strData, 'hex', 'utf8')
        mystr += mykey.update.final('utf8');
        return mystr
    }
}
module.exports = {
    proxy: proxys,
    public_function: public_functions,
    defaultItem: defaultItem
}