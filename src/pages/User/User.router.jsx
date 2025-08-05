import { createBrowserRouter } from 'react-router-dom';
import Login from '../Login';
import Register from '../Register';
import Dashboard from './Dashboard';
import MedicaidList from './MedicaidList';
import UserLayout from '../../components/layouts/UserLayout';
import ProtectedRoute from '../../components/ProtectedRoute';

const userRouter = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/',
        element: <ProtectedRoute><UserLayout /></ProtectedRoute>,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'applications',
                element: <MedicaidList />,
            },
        ],
    },
]);

export default userRouter; 