import { useEffect, useState } from 'react';
// Components
import SimpleBar from "simplebar-react";
import { MediumTitle } from '../typography/titles';
import ActionButton from '../buttons/ActionButton';
// Icons
import { FiArrowDownCircle } from 'react-icons/fi';
// Helpers
import { SmallParagraph } from '../typography/paragraphs';
import { v4 } from 'uuid';
import InlineSpinner from '../spinners/InlineSpinner';
import { formatDate } from '../../libs/helpers';

export default function LogsDispayList({ JSONLogs, className, title }) {
  const [ logs, setLogs ] = useState([]);
  const [ limit, setLimit ] = useState(10);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if(JSONLogs) {
      setLogs(() => [...JSONLogs].sort((a,b) => b.timestamp - a.timestamp));
      setLoading(false);
    }
  }, [JSONLogs])

  
  if(!JSONLogs) return null;

  return (
    <div className={`bg-base-100 rounded-md ${className}`}>
      { title && <header className="sticky top-0 px-4 pt-2 bg-base-100 z-10">
        <MediumTitle>{title}</MediumTitle>
      </header> }
      <SimpleBar style={{ maxHeight: '100%'}}>
        <article className="px-4 py-2 mt-2">
          { loading 
            ? <InlineSpinner color='#DDD' loading={true} />
            : logs.slice(0, limit).map((log) => (
              <div key={v4()} className="text-sm mb-4">
                <span className="font-bold text-zinc-500 dark:text-zinc-400">{formatDate(log.timestamp, "dd/MM/yyyy' 'HH:mm:ss")}</span> 
                <span> - </span> 
                <span>{log.description}</span>
              </div>
            ))}
        </article>
        { logs.length > limit 
        ? (
          <ActionButton
            text="Mostra altri"
            icon={() => <FiArrowDownCircle />}
            styles="btn-ghost ml-4"
            onClick={() => setLimit(prev => prev + 10)}
          />
        )
        : <SmallParagraph styles="p-4 text-sm text-zinc-500 dark:text-zinc-300">Non ci sono altri log da mostrare</SmallParagraph>
      }
      </SimpleBar>
    </div>
  )
}