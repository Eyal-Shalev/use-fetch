import {useState, useEffect} from 'react';

const useFetch = (url: string, args: object = {}, dependencies = []) => {
  const [response, setResponse] = useState<Response | null>(null);
  const [loading, setLoading] = useState(false);
  const [exception, setException] = useState<any>(null);

  useEffect(() => {
    if (loading) return;
    setLoading(true);

    fetch(url, args)
      .then(setResponse)
      .catch(setException)
      .finally(() => setLoading(false));
  }, [url, JSON.stringify(args)]);

  return {response, loading, exception}
};

function make<T>(k: 'text' | 'blob' | 'json', init0: T) {
  return <K extends T>(url: string, args: object = {}, init: K = init0 as K) => {
    const {response, exception: fetchException, loading} = useFetch(url, args);
    const [value, setValue] = useState<K>(init);
    const [exception, setException] = useState<any>(fetchException);

    useEffect(() => {!!fetchException && setException(fetchException)}, [fetchException]);

    useEffect(() => {
      if (!response) return;

      response[k]().then(x => {
        setValue(x);
        setException(null);
      }).catch(setException);
    }, [response]);

    return {value, loading, exception}
  }
}

export const useText = make<string>('text', '');
export const useJson = make<any>('json', null);
export const useBlob = make<Blob | null>('blob', null);
export default useFetch
