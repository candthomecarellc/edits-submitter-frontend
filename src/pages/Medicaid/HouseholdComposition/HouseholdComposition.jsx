import { useOutletContext, useNavigate } from 'react-router-dom';
import { Button, Input, Select } from '../../../components/Form';
import { useState } from 'react';
import { RELATIONSHIP } from '../../../constants/WMS_Codes/relationship';
import { GENDER } from '../../../constants/WMS_Codes/gender';

const HouseholdComposition = () => {
    const { application, setApplication } = useOutletContext();
    const navigate = useNavigate();
    const [isAddingMember, setIsAddingMember] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newMemberData, setNewMemberData] = useState({
        legalName: {
            first: '',
            middle: '',
            last: ''
        },
        lineNumber: '',
        relationshipToApplicant: ''
    });
    const [formErrors, setFormErrors] = useState({});

    // Helper function to get relationship value from code
    const getRelationshipValue = (code) => {
        if (!code) return '-';
        const relationship = RELATIONSHIP.find(r => r.code === code);
        return relationship ? relationship.value : '-';
    };

    // Helper function to get gender value from code
    const getGenderValue = (code) => {
        if (!code) return '-';
        const gender = GENDER.find(g => g.code === code);
        return gender ? gender.value : '-';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setNewMemberData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setNewMemberData(prev => ({
                ...prev,
                [name]: value
            }));
        }
        
        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const errors = {};
        
        if (!newMemberData.legalName.first.trim()) {
            errors['legalName.first'] = 'First name is required';
        }
        
        if (!newMemberData.legalName.last.trim()) {
            errors['legalName.last'] = 'Last name is required';
        }

        if (!newMemberData.lineNumber) {
            errors.lineNumber = 'Line number is required';
        }
        
        if (!newMemberData.relationshipToApplicant) {
            errors.relationshipToApplicant = 'Relationship to applicant is required';
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const addMember = async () => {
        if (!validateForm()) {
            return;
        }

        if (!application?._id) {
            console.error('Application ID not found');
            return;
        }

        setIsAddingMember(true);
        try {
            console.log('Sending member data:', newMemberData);
            
            // Get the access token for authentication
            const accessToken = localStorage.getItem('edits-submitter.accessToken');
            
            // Call the backend API to add the member
            const response = await fetch(`http://localhost:3000/api/v1/application/${application._id}/household-member`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(newMemberData)
            });

            if (!response.ok) {
                throw new Error('Failed to add household member');
            }

            const result = await response.json();
            
            if (result.success) {
                // Update the local state with the new member
                setApplication({
                    ...application,
                    householdMember: [...application.householdMember, result.data]
                });
                
                // Reset form and close modal
                setNewMemberData({
                    legalName: {
                        first: '',
                        middle: '',
                        last: ''
                    },
                    lineNumber: '',
                    relationshipToApplicant: ''
                });
                setShowAddModal(false);
                setFormErrors({});
            } else {
                throw new Error(result.message || 'Failed to add household member');
            }
        } catch (error) {
            console.error('Error adding household member:', error);
            alert('Failed to add household member. Please try again.');
        } finally {
            setIsAddingMember(false);
        }
    };

    const handleOpenAddModal = () => {
        setShowAddModal(true);
        setFormErrors({});
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
        setNewMemberData({
            legalName: {
                first: '',
                middle: '',
                last: ''
            },
            lineNumber: '',
            relationshipToApplicant: ''
        });
        setFormErrors({});
    };

    const handleViewMember = (member) => {
        localStorage.setItem('edits-submitter.currentMemberId', member._id);
        navigate(`/application/household-composition/member`);
    };

    const handleDeleteMember = async (member) => {
        if (!application?._id || !member?._id) {
            console.error('Application ID or Member ID not found');
            return;
        }

        try {
            const accessToken = localStorage.getItem('edits-submitter.accessToken');
            
            const response = await fetch(`http://localhost:3000/api/v1/application/${application._id}/household-member/${member._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete household member');
            }

            const result = await response.json();
            
            if (result.success) {
                // Update the local state by removing the deleted member
                setApplication({
                    ...application,
                    householdMember: application.householdMember.filter(m => m._id !== member._id)
                });
            } else {
                throw new Error(result.message || 'Failed to delete household member');
            }
        } catch (error) {
            console.error('Error deleting household member:', error);
            alert('Failed to delete household member. Please try again.');
        }
    };

    return (
        <div className="p-6">
            <div className="sm:flex sm:items-center sm:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Household Members</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Update the household members
                    </p>
                </div>
                <Button
                    variant="primary"
                    onClick={handleOpenAddModal}
                    disabled={isAddingMember}
                >
                    {isAddingMember ? 'Adding...' : 'Add Member'}
                </Button>
            </div>

            {/* Add Member Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Add New Member</h3>
                                <button
                                    onClick={handleCloseAddModal}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            <form onSubmit={(e) => { e.preventDefault(); addMember(); }}>
                                <div className="space-y-4">
                                    <div>
                                        <Input
                                            type="text"
                                            name="legalName.first"
                                            label="First Name *"
                                            value={newMemberData.legalName.first}
                                            onChange={handleInputChange}
                                            error={formErrors['legalName.first']}
                                        />
                                    </div>
                                    
                                    <div>
                                        <Input
                                            type="text"
                                            name="legalName.middle"
                                            label="Middle Name"
                                            value={newMemberData.legalName.middle}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    
                                    <div>
                                        <Input
                                            type="text"
                                            name="legalName.last"
                                            label="Last Name *"
                                            value={newMemberData.legalName.last}
                                            onChange={handleInputChange}
                                            error={formErrors['legalName.last']}
                                        />
                                    </div>

                                    <div>
                                        <Select
                                            name="lineNumber"
                                            label="Line Number *"
                                            options={Array.from({ length: 10 }, (_, i) => ({
                                                value: i + 1,
                                                label: i + 1
                                            }))}
                                            value={newMemberData.lineNumber}
                                            onChange={handleInputChange}
                                            error={formErrors.lineNumber}
                                        />
                                    </div>
                                    
                                    <div>
                                        <Select
                                            name="relationshipToApplicant"
                                            label="Relationship to Applicant *"
                                            value={newMemberData.relationshipToApplicant}
                                            onChange={handleInputChange}
                                            options={RELATIONSHIP}
                                            error={formErrors.relationshipToApplicant}
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-3 mt-6">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={handleCloseAddModal}
                                        disabled={isAddingMember}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        loading={isAddingMember}
                                    >
                                        Add Member
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white shadow rounded-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Relationship
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date of Birth
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Gender
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {application?.householdMember?.map((member, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {member.legalName?.first || member.legalName?.last ? `${member.legalName?.first || ''} ${member.legalName?.last || ''}`.trim() : '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {getRelationshipValue(member.relationshipToApplicant)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {member.dateOfBirth ? new Date(member.dateOfBirth).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {getGenderValue(member.gender)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {member.generalInformation?.personalInformation ? 'Completed' : 'Pending'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleViewMember(member)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleDeleteMember(member)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {(!application?.householdMember || application.householdMember.length === 0) && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No household members added yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HouseholdComposition; 