import React, { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

interface AuthModalManagerProps {
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  onAuthSuccess?: () => void;
}

const AuthModalManager: React.FC<AuthModalManagerProps> = ({
  trigger,
  isOpen,
  onClose,
  onAuthSuccess,
}) => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);

  // Open login modal when isOpen becomes true
  useEffect(() => {
    if (isOpen) {
      setLoginOpen(true);
      setSignupOpen(false);
    }
  }, [isOpen]);

  const openLogin = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  };

  const openSignup = () => {
    setLoginOpen(false);
    setSignupOpen(true);
  };

  const closeModals = () => {
    setLoginOpen(false);
    setSignupOpen(false);
    onClose?.();
  };

  return (
    <>
      {trigger && <div onClick={openLogin}>{trigger}</div>}

      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeModals}
        onSuccess={() => {
          onAuthSuccess?.();
          closeModals();
        }}
        switchToSignup={openSignup}
      />

      <SignupModal
        isOpen={isSignupOpen}
        onClose={closeModals}
        onSuccess={openLogin} // After signup, go to login
        switchToLogin={openLogin}
      />
    </>
  );
};

export default AuthModalManager;
