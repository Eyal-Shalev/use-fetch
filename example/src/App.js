import React, {useState} from 'react';
import {useFetch} from 'use-fetch';
import '@fortawesome/fontawesome-free/css/all.min.css'

const urlPrefix = 'http://api.github.com/users';
const urlSuffix = 'repos';

function App() {
  const [userName, setUserName] = useState('eyal-shalev');
  const {useJson, loading, response, exception: fetchException} = useFetch(`${urlPrefix}/${userName}/${urlSuffix}`, {cors: true}, [userName]);
  const {json, exception: parseException} = useJson({});

  return (
    <section className='container'>
      <header>
        <h1>useFetch example</h1>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">{urlPrefix}/</span>
          </div>
          <input id='user-name' type='text' className='form-control' value={userName}
                 onChange={e => setUserName(e.target.value)}/>
          <div className="input-group-append">
            <span className="input-group-text">/{urlSuffix}</span>
            <span className="input-group-text">
              {!loading
                ? (<i className={`fas fa-${(response && response.ok) ? 'check' : 'times'}`}/>)
                : (
                  <div className="spinner-border" role="status" style={{height: '1.5rem', width: '1.5rem'}}>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
            </span>
          </div>
        </div>
      </header>

      <main>
        <details className="card" open={response && response.ok}>
          <summary className="card-header">Data</summary>
          <div className="card-body" style={{'height': 'calc(100vh - 25rem)', display: 'block', overflow: 'auto'}}>
            <pre style={{overflow: "visible"}}><samp className="card-text">{JSON.stringify(json, null, '\t')}</samp></pre>
          </div>
        </details>

        <details className='card' open={response && !response.ok}>
          <summary className='card-header'>Error</summary>
          <div className="card-body">
            <code className='card-text'>
              <pre>{(!response || response.ok) ? '' : response.statusText}</pre>
            </code>
          </div>
        </details>

        <details className='card' open={!!fetchException}>
          <summary className='card-header'>Fetch exception</summary>
          <div className="card-body">
            <code className='card-text'>
              <pre>{(!fetchException) ? '' : fetchException.toString()}</pre>
            </code>
          </div>
        </details>

        <details className='card' open={!!parseException}>
          <summary className='card-header'>Parse exception</summary>
          <div className="card-body">
            <code className='card-text'>
              <pre>{(!parseException) ? '' : parseException.toString()}</pre>
            </code>
          </div>
        </details>
      </main>
    </section>
  );
}

export default App;
