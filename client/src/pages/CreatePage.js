import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useHistory } from 'react-router-dom';

export const CreatePage = () => {
  const history = useHistory();
  const [link, setLink] = useState('');
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, {
          Authorization: `Bearer ${auth.token}`
        });

        history.push(`/detail/${data.link._id}`);

        console.log(data);
      } catch (error) {}
    }
  }

  useEffect(() => {
    window.M.updateTextFields();
  }, [])

  return (
    <div className='row'>
      <div className='col s8 offset-s2' style={{ paddingTop: '2rem' }}>
        <div className="input-field">
            <input
              placeholder="Past your link here"
              id="link"
              type="text"
              onChange={e => setLink(e.target.value)}
              onKeyPress={pressHandler}
              value={link}
            />
            <label htmlFor="link">Link shorter</label>
        </div>
      </div>
    </div>
  )
}
