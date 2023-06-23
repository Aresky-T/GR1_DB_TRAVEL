import {useRoutes} from "react-router-dom";
import {routes} from "./routes";
import {useSelector} from "react-redux";
import {authSelector} from "../redux/selector";

const AppRouter = () => {

    const account = useSelector(authSelector);

    const filterRoutes = routes.filter((route) => {
        if(route.is404) {
            return true;
        }

        if(route.role){
            return !!(account.role && route.role.includes(account.role));
        }

        return !route.isPrivate
    })
  return useRoutes(filterRoutes);
}

export default AppRouter