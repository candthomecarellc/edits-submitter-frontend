import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import MedicaidList from '../pages/MedicaidList';
import Overview from '../pages/Medicaid/Overview';
import ApplicantInformation from '../pages/Medicaid/ApplicantInformation';
import UserLayout from '../components/layouts/UserLayout';
import ApplicationLayout from '../components/layouts/ApplicationLayout';
import ProtectedRoute from '../components/ProtectedRoute';

const router = createBrowserRouter([
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
            {
                path: 'application/:id',
                element: <ProtectedRoute><ApplicationLayout /></ProtectedRoute>,
                children: [
                    {
                        path: 'overview',
                        element: <Overview />,
                    },
                    {
                        path: 'applicant-information',
                        element: <ApplicantInformation />,
                    },
                ],
            },
        ],
    },
]);

export default router; 