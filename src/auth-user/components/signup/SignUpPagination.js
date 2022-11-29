import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import Button from '../../../globals/components/buttons_v2/Button'
import { BsCircleFill, BsCircle } from "react-icons/bs";

// Sub components ---------------------------------------------------------------------------------------------------
const Circles = ({ step, setStep }) => (
  <div className='flex items-center justify-center gap-1'>
    <Button
      icon={ step === 1 ? <BsCircleFill className='text-xs text-primary-200 dark:text-primary-300' /> : <BsCircle className='text-xs opacity-50' /> }
      onClick={() => setStep(1)}
      className="p-0 m-0"
    />

    <Button
      icon={ step === 2 ? <BsCircleFill className='text-xs text-primary-200 dark:text-primary-300' /> : <BsCircle className='text-xs opacity-50' /> }
      onClick={() => setStep(2)}
      className="p-0 m-0"
    />

    <Button
      icon={ step === 3 ? <BsCircleFill className='text-xs text-primary-200 dark:text-primary-300' /> : <BsCircle className='text-xs opacity-50' /> }
      onClick={() => setStep(3)}
      className="p-0 m-0"
    />
  </div>
) 


// Main component ---------------------------------------------------------------------------------------------------
function SignUpPagination({
  step,
  setStep
}) {

  const handleStep = (direction) => {
    if(direction === "next" && step < 3) {
      setStep(prev => prev + 1)
    }

    if(direction === "prev" && step > 1 ) {
      setStep(prev => prev - 1)
    }
  }

  return (
    <div className='flex items-center justify-center flex-col mt-8'>
      { step >= 1 && step < 3 && (
        <Button
          text="Prosegui"
          className='btn-primary'
          onClick={() => handleStep("next")}
        />
      )}

      { step >= 3 && <Button
        text="Indietro"
        className='btn-primary'
        onClick={() => handleStep("prev")}
      /> }

      <div className='flex items-center justify-center text-lg md:text-xl mt-4'>
        <Button
          icon={<FiArrowLeft className='text-2xl' />}
          onClick={() => handleStep("prev")}
          disabled={step <= 1}
          className="btn-ghost p-2"
        />

        <Circles step={step} setStep={setStep} />

        <Button
          icon={<FiArrowRight className='text-2xl' />}
          onClick={() => handleStep("next")}
          disabled={step >= 3}
          className="btn-ghost p-2"
        />
      </div>
    </div>
  )
}

export default SignUpPagination
