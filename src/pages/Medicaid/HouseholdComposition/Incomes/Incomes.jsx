import EarnedIncomes from './EarnedIncome';
import UnearnedIncomes from './UnearnedIncome';
import ResourceIncomes from './Resource';
import { useOutletContext } from 'react-router-dom';
import { Button } from '../../../../components/Form';
import { INCOME_TYPES } from '../../../../constants/incomeTypes';
import { useState } from 'react';

const Incomes = () => {
    const { member, setMember } = useOutletContext();
    const [showIncomeTypeButtons, setShowIncomeTypeButtons] = useState(false);

    const addIncome = (incomeType) => {
        const newIncome = {
            _id: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };

        let incomeArrayKey;
        switch (incomeType) {
            case INCOME_TYPES.EARNED:
                incomeArrayKey = 'earnedIncome';
                break;
            case INCOME_TYPES.UNEARNED:
                incomeArrayKey = 'unearnedIncome';
                break;
            case INCOME_TYPES.RESOURCE:
                incomeArrayKey = 'resource';
                break;
            default:
                return;
        }

        setMember({
            ...member,
            income: {
                ...member.income,
                [incomeArrayKey]: [...(member.income?.[incomeArrayKey] || []), newIncome]
            }
        });
        setShowIncomeTypeButtons(false);
    };

    const handleDeleteIncome = (income) => {
        const incomeType = income.income.category;
        let incomeArrayKey;
        switch (incomeType) {
            case INCOME_TYPES.EARNED:
                incomeArrayKey = 'earnedIncome';
                break;
            case INCOME_TYPES.UNEARNED:
                incomeArrayKey = 'unearnedIncome';
                break;
            case INCOME_TYPES.RESOURCE:
                incomeArrayKey = 'resource';
                break;
            default:
                return;
        }

        setMember({
            ...member,
            income: {
                ...member.income,
                [incomeArrayKey]: member.income[incomeArrayKey].filter(i => i !== income)
            }
        });
    };

    return (
        <div className="p-6">
            <div className="sm:flex sm:items-center sm:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Incomes</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        List of incomes
                    </p>
                </div>
                <div className="flex flex-col space-y-2">
                    {!showIncomeTypeButtons ? (
                        <Button
                            variant="primary"
                            onClick={() => setShowIncomeTypeButtons(true)}
                        >
                            Add Income
                        </Button>
                    ) : (
                        <div className="grid grid-cols-4 gap-2">
                            <div className="col-span-1">
                                <Button
                                    variant="primary"
                                    onClick={() => addIncome(INCOME_TYPES.EARNED)}
                                    className="w-full"
                                >
                                    Earned Income
                                </Button>
                            </div>
                            <div className="col-span-1">
                                <Button
                                    variant="primary"
                                    onClick={() => addIncome(INCOME_TYPES.UNEARNED)}
                                    className="w-full"
                                >
                                    Unearned Income
                                </Button>
                            </div>
                            <div className="col-span-1">
                                <Button
                                    variant="primary"
                                    onClick={() => addIncome(INCOME_TYPES.RESOURCE)}
                                    className="w-full"
                                >
                                    Resource
                                </Button>
                            </div>
                            <div className="col-span-1">
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowIncomeTypeButtons(false)}
                                    className="w-full"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {member.income.earnedIncome.map((income) => (
                <EarnedIncomes key={income._id} income={income} />
            ))}
            {member.income.unearnedIncome.map((income) => (
                <UnearnedIncomes key={income._id} income={income} />
            ))}
            {member.income.resource.map((resource) => (
                <ResourceIncomes key={resource._id} resource={resource} />
            ))}

        </div>
    );
};

export default Incomes; 