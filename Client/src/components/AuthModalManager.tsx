import React, { useState } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

interface AuthModalManagerProps {
  trigger?: React.ReactNode;
  onAuthSuccess?: () => void;
}

const AuthModalManager: React.FC<AuthModalManagerProps> = ({ trigger, onAuthSuccess }) => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);

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
        onSuccess={openLogin} // after signup, go to login
        switchToLogin={openLogin}
      />
    </>
  );
};

export default AuthModalManager;
