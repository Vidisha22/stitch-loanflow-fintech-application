import { useCallback } from 'react';
import { useApplicationStore } from '../store/useApplicationStore';

type PageKey = 'dashboard' | 'support' | 'notifications' | 'profile';

const PAGE_ROUTES: Record<PageKey, string> = {
  dashboard: '/dashboard',
  support: '/support',
  notifications: '/notifications',
  profile: '/profile',
};

export function useNavigate() {
  const setCurrentStep = useApplicationStore((state) => state.setCurrentStep);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step);
  }, [setCurrentStep]);

  const goToPage = useCallback((page: PageKey) => {
    const route = PAGE_ROUTES[page];
    if (route) {
      window.location.href = route;
    }
  }, []);

  const goBack = useCallback((currentStep: number) => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  }, [goToStep]);

  return { goToStep, goToPage, goBack };
}