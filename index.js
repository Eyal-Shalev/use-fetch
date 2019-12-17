import {useState, useEffect} from 'react';

/**
 *
 * @param input
 * @param init
 * @param inputs If present, fetch will only activate if the values in the list change.
 * @returns {{controller: AbortController, response: Response, error: *}}
 */
export const useFetch = (input, init, inputs) => {
  const controller = new AbortController();
  const [response, setResponse] = useState();
  const [loading, setLoading]  = useState(false);
  const [exception, setException] = useState();
  const [useJson, useText, useBlob] = ['json', 'text', 'blob'].map(k => (
    (initial) => {
      const [result, setResult] = useState(initial);
      const [exception, setException] = useState();
      useEffect(() => {
        if (!response) return;
        response[k]().then(setResult).catch(e => {console.log(e); setException(e)})
      }, [response]);
      return {[k]: result, exception};
    }
  ));

  useEffect(() => {
    init = init || {};

    if (init.hasOwnProperty('signal')) {
      init.signal.addEventListener('abort', () => {
        controller.abort()
      })
    }
    init.signal = controller.signal;

    setLoading(true);
    fetch(input, init)
      .then(resp => {
        setResponse(resp);
      })
      .catch(setException)
      .finally(() => setLoading(false));
  }, inputs);

  return {response, loading, exception, controller, useJson, useText, useBlob}
};
