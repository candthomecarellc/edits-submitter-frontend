import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/User/Dashboard';
import MedicaidList from '../pages/User/MedicaidList';
import Overview from '../pages/Medicaid/OverView/Overview';
import ApplicantInformation from '../pages/Medicaid/ApplicantInformation/ApplicantInformation';
import HouseholdExpense from '../pages/Medicaid/HouseholdExpense/HouseholdExpense';
import HouseholdComposition from '../pages/Medicaid/HouseholdComposition/HouseholdComposition';
import GeneralInformation from '../pages/Medicaid/HouseholdComposition/GeneralInformation/GeneralInformation';
import Incomes from '../pages/Medicaid/HouseholdComposition/Incomes/Incomes';
import Insurance from '../pages/Medicaid/HouseholdComposition/Insurance/Insurance';
import Documents from '../pages/Medicaid/Documents/Documents';
import Response from '../pages/Medicaid/Response/Response';
import UserLayout from '../components/layouts/UserLayout';
import ApplicationLayout from '../components/layouts/ApplicationLayout';
import HouseholdMemberLayout from '../components/layouts/HouseholdMemberLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import Home from '../home';

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
        path: '/form',
        element: <Home />,
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
                path: 'application',
                element: <ApplicationLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="overview" replace />,
                    },
                    {
                        path: 'overview',
                        element: <Overview />,
                    },
                    {
                        path: 'applicant-information',
                        element: <ApplicantInformation />,
                    },
                    {
                        path: 'household-expense',
                        element: <HouseholdExpense />,
                    },
                    {
                        path: 'household-composition',
                        element: <HouseholdComposition />,
                    },
                    {
                        path: 'documents',
                        element: <Documents />,
                    },
                    {
                        path: 'response',
                        element: <Response />
                    },
                    {
                        path: 'household-composition/member',
                        element: <HouseholdMemberLayout />,
                        children: [
                            {
                                index: true,
                                element: <Navigate to="general-information" replace />,
                            },
                            {
                                path: 'general-information',
                                element: <GeneralInformation />,
                            },
                            {
                                path: 'incomes',
                                element: <Incomes />,
                            },
                            {
                                path: 'insurance-information',
                                element: <Insurance />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);

export default router; 