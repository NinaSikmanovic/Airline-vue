import FlightsList from "@/components/flights/FlightsList";
import FlightsDetails from "@/components/flights/FlightDetails";
import LoginPage from "@/components/login/LoginPage";

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/flights',
        name: 'flights',
        component: FlightsList,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },
    {
        path: '/flights/:id',
        name: 'flight-details',
        component: FlightsDetails,
        meta: { requiresAuth: true },
    },
];

export default routes;
