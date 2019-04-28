import App from './pages/App'
import Login from "./pages/Login"
import Item from "./pages/Item"
import SaleOrder from "./pages/SaleOrder"

const routes = [{
    path: '/',
    component: App,
    indexRoute: { component: Login },
    childRoutes: [
        { path: '/item/:check', component: Item },
        { path: '/sale-order/:check', component: SaleOrder },
        // { path: '/report/:checkReport', component: Report },
        // { path: '/clearbill/:checkClearBill', component: Clearbill },
        // { path: '/form_acc', component: Form_accounting },
        // { path: '/edit/:checkEdit', component: Edit },
        // { path: '/rate/:checkRate/:cusCode', component: Rate },
        // { path: '/calendar', component: Calendar },
        // { path: '/timeable/:checkTimeable', component: Timeable },
        // { path: '/monitor/:checkMonitor', component: Monitor },
        // { path: '/cost-round/:checkCost', component: Cost_round },
        // { path: '/tmsplan/:checkTmsplan', component: TMSPlan },
        // { path: '/form_acc', component: Form_accounting },
    ]
}]

export default routes