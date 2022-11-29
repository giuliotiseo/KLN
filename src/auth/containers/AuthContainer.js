import { useState, useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
// Modules
import SignUpContainer from './SignUpContainer';
import SignIn from '../components/SignIn';
import AuthCode from '../components/AuthCode';
import ForgotPassword from '../components/ForgotPassword';
import RestorePassword from '../components/RestorePassword';
// Styles
import { ReactComponent as LogoImg } from '../../globals/assets/logo.svg';
import { ReactComponent as CamionImg } from '../../globals/assets/camion-form.svg';
import { useCallback } from 'react';
import SafeArea from '../../globals/components/layout/SafeArea';
import SafeCol from '../../globals/components/layout/SafeCol';

function AuthContainer() {
  const [ formController, setFormController ] = useState({ view: 'signIn'});
  const location = useLocation();
  const navigate = useNavigate();
  const { search } = location;

  const clearAddressBar = useCallback(() => {
    navigate('/');
  }, []);

  useEffect(() => {
    if(search) {
      setFormController({ view: 'signUp' });
    }
  }, [search])

  useLayoutEffect(() => {
    if(!search) {
    }
  }, [search, clearAddressBar])

  return (
    <div className="h-screen relative bg-light-300 dark:bg-dark-300">
      <div className="absolute bg-gradient-to-r from-primary-200 via-red-500 to-secondary-200 dark:from-secondary-200 dark:via-primary-200 dark:to-primary-100 -left-1/3 h-full w-full z-0" style={{ clipPath: 'polygon(0 0,28% 0,100% 100%,0 100%)' }} />
      <div className="absolute hidden md:flex items-center left-4 top-4">
        <LogoImg width={45} height={45} style={{ marginRight: 10 }} />
        <div>
          <h2 className="text-lg font-bold text-dark-300 dark:text-light-100">Logistics Transport Services</h2>
          <p className="text-dark-300 dark:text-light-100">Il nuovo modo di fare logistica</p>
        </div>
      </div>
      <div className="flex h-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-full w-full gap-4 relative z-10">
          <div className="max-h-screen overflow-hidden hidden md:flex justify-center flex-col col-span-2 md:col-span-1 items-center">
            <CamionImg className="hidden md:block max-w-4xl h-auto" />
          </div>

          <SafeArea>
            <SafeCol>
              <div className="px-8" style={{ maxWidth: 720, marginLeft: 'auto'}}>
              {/* === Registrazione === */}
              { formController.view === 'signUp' && <SignUpContainer setFormController={setFormController} /> }
              {/* === Accesso === */}
              { formController.view === 'signIn' && <SignIn setFormController={setFormController} /> }
              {/* === Codice di conferma === */}
              { formController.view === 'authCode' && <AuthCode formController={formController} setFormController={setFormController} /> }
              {/* === Password dimenticata === */}
              { formController.view === 'forgotPassword' && <ForgotPassword setFormController={setFormController} /> }
              {/* === Password dimenticata === */}
              { formController.view === 'restorePassword' && <RestorePassword formController={formController} setFormController={setFormController} /> }
              </div>
            </SafeCol>
          </SafeArea>
        </div>
      </div>
    </div>
  );
}

export default AuthContainer;