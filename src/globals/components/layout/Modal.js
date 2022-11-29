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

export default function Modal({ showModal, title, message, messageStyle = "alert-info", closeModal, children, confirm, confirmText = "Conferma", size = 500, styles = "bg-base-100" }) {
  const [ loading, setLoading ] = useState(false);
  
  const handleConfirmation = async () => {
    setLoading(true);
    await confirm();
    setLoading(false);
  }
  
  return (
    <AnimatePresence>
      <motion.div 
        variants={backdrop}
        initial="hidden"
        animate={showModal ? "visible" : "hidden"}
        style={{ backdropFilter: 'blur(5px)'}} className="fixed inset-0 bg-dark-300 bg-opacity-80 z-50 top-0 right-0 bottom-0 left-0"
      >
        <div id="modal" style={{ width: size, maxWidth: "95vw" }} className={`absolute w-3/4 sm:w-1/2 lg:w-1/3 max-w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md overflow-hidden z-50 ${styles}`}>  
          <SimpleBar style={{ height: '100%', maxHeight: '80vh', position: 'relative'}}>
            {(title) && (
              <hgroup className="text-center rounded-t-md pt-4">
                <h2 className="text-base font-bold">
                  { title }
                </h2>
              </hgroup>
            )}
              
            <div className={`p-4 rounded-b-md ${(!title) && 'rounded-t-md'} ${styles}`}>
              { children }
              <div className="px-4 text-center">
                { message && (
                  <div className={`${messageStyle} inline-block px-2 mt-4`}>
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
            
            <button onClick={() => closeModal()} className="fixed text-2xl text-dark-300 dark:text-light-100 opacity-100 hover:opacity-100 right-4 top-4 hover:bg-light-300 dark:hover:bg-dark-300 h-8 w-8 flex items-center justify-center rounded-full">
              <FiX className="w-8 fill-current" />
            </button>
          </SimpleBar>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}