import { useEffect } from 'react';

const usePreventTabSwitch = (isAssessmentStarted) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (isAssessmentStarted && document.hidden) {
        alert('You cannot switch tabs during the assessment!');
        // You can also implement further actions here, like logging or terminating the assessment.
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isAssessmentStarted]);
};

export default usePreventTabSwitch;
