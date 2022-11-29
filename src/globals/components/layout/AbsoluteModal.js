import { useState } from 'react';
// Assets
import { motion, AnimatePresence } from 'framer-motion';
import ActionButton from '../buttons/ActionButton';
import SimpleBar from 'simplebar-react';
import { FiX } from 'react-icons/fi';

const backdrop = {
  visible: { opacity: 1, pointerEvents: 'all' },
  hidden: { opacity: 0, pointerEvents: 'none' }
}

export default function AbsoluteModal({ showModal, title, message, messageStyle = "alert-info", closeModal, children, confirm, confirmText = "Conferma", size = 500, styles = "bg-base-100" }) {
  const [ loading, setLoading ] = useState(false);
  
  const handleConfirmation = async () => {
    setLoading(true);
    await confirm();
    setLoading(false);
  }
  
  return (
    <AnimatePresence>
      <motion.div
        id="modal"
        variants={backdrop}
        initial="hidden"
        animate={showModal ? "visible" : "hidden"}
        style={{ backdropFilter: 'blur(5px)'}} className={`absolute inset-0 bg-light-100 dark:bg-dark-300 bg-opacity-80 top-0 right-0 bottom-0 left-0 z-50 max-h-full ${styles}`}
      >
        <SimpleBar className='relative h-full'>
          <div className={`p-4 rounded-b-md max-w-[720px] mx-auto`}>
            {(title) && (
              <hgroup className="text-center rounded-t-md px-4">
                <h2 className="text-base font-bold">
                  { title }
                </h2>
              </hgroup>
            )}

            { children }
            <div className="px-4 text-center">
              { message && (
                <div className={`${messageStyle} inline-block px-2 mt-2`}>
                  <h3 className="text-sm text-center">
                    { message }
                  </h3>
                </div>
              )}
            </div>

            { confirm && (
              <div className="mt-6">
                <ActionButton
                  styles="btn--center btn-wide btn-primary mt-4"
                  text={confirmText}
                  onClick={handleConfirmation}
                  loading={loading}
                />
              </div>
            )}
          </div>
          
          <button onClick={() => closeModal()} className="absolute text-2xl text-dark-300 dark:text-light-100 opacity-100 hover:opacity-100 right-4 top-4 hover:bg-light-300 dark:hover:bg-dark-300 h-8 w-8 flex items-center justify-center rounded-full">
            <FiX className="w-8 fill-current" />
          </button>
        </SimpleBar>
      </motion.div>
    </AnimatePresence>
  )
}