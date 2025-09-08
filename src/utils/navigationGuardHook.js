// startNavGuardFeature
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNavigationGuard = (hasUnsavedChanges, onSavePrompt) => {
  const navigate = useNavigate();
  
  const guardedNavigate = useCallback((to, options) => {
    if (hasUnsavedChanges) {
      onSavePrompt(() => {
        navigate(to, options);
      });
    } else {
      navigate(to, options);
    }
  }, [hasUnsavedChanges, onSavePrompt, navigate]);
  
  return guardedNavigate;
};
// endNavGuardFeature