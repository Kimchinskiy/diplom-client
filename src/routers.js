import Admin from "./pages/Admin";
import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, RULES_ROUTE, RETURN_ROUTE, PROFILE_ROUTE, SEARCH_ROUTE } from "./utils/consts";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import Rules from './pages/Rules';
import Return from './pages/Return';
import Profile from "./pages/Profile";
import SearchResults from "./pages/SearchResults";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    }
];

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: RULES_ROUTE,
        Component: Rules
    },
    {
        path: RETURN_ROUTE,
        Component: Return
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
    {
        path: SEARCH_ROUTE, 
        Component: SearchResults
    }
];