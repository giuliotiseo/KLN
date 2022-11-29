import React, { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';

function SubscribePrivacyContainer() {
  const file_name = 'privacy-policy.md';
  const [ post, setPost ] = useState('');

  useEffect(() => {
    import(`../libs/${file_name}`)
      .then(res => {
        fetch(res.default)
          .then(res => res.text())
          .then(res => setPost(res))
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Markdown>
        { post }
      </Markdown>
    </div>
  )
}

export default SubscribePrivacyContainer
