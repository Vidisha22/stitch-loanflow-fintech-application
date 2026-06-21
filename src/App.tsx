import { useApplicationStore } from './store/useApplicationStore';
import { Step1PersonalInfo } from './pages/Step1PersonalInfo';
import { Step2Address } from './pages/Step2Address';
import { Step3Employment } from './pages/Step3Employment';
import { Step4LoanDetails } from './pages/Step4LoanDetails';
import { Step5Review } from './pages/Step5Review';

function App() {
  const currentStep = useApplicationStore((state) => state.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1PersonalInfo />;
      case 2:
        return <Step2Address />;
      case 3:
        return <Step3Employment />;
      case 4:
        return <Step4LoanDetails />;
      case 5:
        return <Step5Review />;
      default:
        return <Step1PersonalInfo />;
    }
  };

  return renderStep();
}

export default App;