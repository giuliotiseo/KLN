import React from 'react'
import { FiArrowLeft, FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import {
  // Link,
  NavLink 
} from 'react-router-dom'
import Button from '../../globals/components/buttons_v2/Button'
import LinkButton from '../../globals/components/buttons_v2/LinkButton'
import { useStepIndex } from '../hooks'

const SubscribeNav = ({ subscribe, loading }) => {
  const { index: stepIndex, steps } = useStepIndex();
  const stepsKeys = steps.map(step => step.id);

  return (
    <div className='fixed bottom-0 lg:relative bg-base-100 w-full pr-4'>
      <div className='flex items-center container mx-auto'>
        <nav className="grid items-center container mx-auto">
          <ul className='grid grid-cols-3 text-center font-bold text-shadow-md text-white uppercase tracking-wide gap-2'>
            { steps.map(step => (
              <li key={step.id} className="col-span-1 min-w-[35px] mr-1">
                <NavLink
                  to={step.id}
                  end={step.id === "intro"}
                  className={({ isActive }) => `flex items-center justify-center w-full p-2 rounded-md text-sm text-center font-bold uppercase tracking-wide mx-auto
                    ${ isActive 
                        ? 'bg-secondary-100'
                        : 'bg-secondary-200 hover:text-primary-100'
                    }
                  `}>
                  <div className='text-xl'>{ step.icon }</div>
                  <span className="hidden lg:inline-flex p-1">{step.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav className='flex flex-1 justify-end gap-2 mx-0 my-4 md:mx-4 min-w-[250px]'>
          <LinkButton to={stepsKeys[stepIndex - 1]} icon={<FiArrowLeft />} className="btn-primary-outline" text="Indietro" disabled={stepIndex <= 0} />
          { stepIndex < stepsKeys.length - 1 && <LinkButton to={stepsKeys[stepIndex + 1]} icon={<FiArrowRight />} text="Avanti" className="btn-primary-outline" /> }
          { stepIndex === stepsKeys.length - 1 && <Button disabled={loading} onClick={() => subscribe()} icon={<FiCheckCircle className="text-xl" />} className="btn-primary" textClassName="whitespace-nowrap hidden sm:inline-flex" text="Registra dati" /> }
        </nav>
      </div>

      <div className='text-center text-sm'>
        {/* <Link
          to="/subscribe/privacy"
          className='text-cyan-700 hover:text-cyan-500'
        >
          Informativa sulla privacy
        </Link>
         */}
      </div>
    </div>
  )
}

export default SubscribeNav
