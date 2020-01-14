# use-fetch
Exposes the fetch API as a react hook

## API

### useFetch
An example react component that pools data using the fetch api and returns the response object using react hooks.   
```javascript
import React, {useEffect, useState} from 'react'
import useFetch from '@eyalsh/use-fetch'

export const Example = () => {
  const {response, exception, loading} = useFetch('https://jsonplaceholder.typicode.com/posts');

  useEffect(() => {
    console.log({response, exception, loading})
  }, [response, exception, loading]);


  if (loading) {
    return <span>Loading...</span>
  }

  if (exception) {
    return <details>
      <summary>Exception:</summary>
      <pre>{exception.toString()}</pre>
    </details>
  }

  return <p>Open dev tools to see the response object.</p>
};
```

### useJson / useText / useBlob
This library also provides helper hooks to directly pool json, text and blobs from the fetch response object.
```javascript
import React from 'react'
import {useJson} from '@eyalsh/use-fetch'

export const Posts = () => {
  const {value: posts, exception, loading} = useJson('https://jsonplaceholder.typicode.com/posts', {}, []);

  if (loading) {
    return <span>loading...</span>
  }

  if (exception) {
    return <details>
      <summary>Exception:</summary>
      <pre>{exception.toString()}</pre>
    </details>
  }

  return <ul>
    {posts.map(post => (
      <li key={post.id}>
        <details>
          <summary>{post.title}</summary>
          {post.body}
        </details>
      </li>
    ))}
  </ul>
};
```

```javascript
import React from 'react'
import {useText} from '@eyalsh/use-fetch'

export const LoremIpsum = () => {
  const {value: text, exception, loading} = useText('https://baconipsum.com/api/?type=all-meat&paras=3&start-with-lorem=1&format=html', {}, '');

  if (loading) {
    return <span>loading...</span>
  }

  if (exception) {
    return <details>
      <summary>Exception:</summary>
      <pre>{exception.toString()}</pre>
    </details>
  }

  return <pre>{text}</pre>
};
```

```javascript
import React from 'react'
import {useBlob} from '@eyalsh/use-fetch'

export const LoremPicsum = ({width, height}) => {
  const {value: data, exception, loading} = useBlob(`https://i.picsum.photos/id/9/${width|200}/${height|300}.jpg`, {});

  if (loading) {
    return <span>loading...</span>
  }

  if (exception) {
    return <details>
      <summary>Exception:</summary>
      <pre>{exception.toString()}</pre>
    </details>
  }

  return <img src={data} alt='' />
};
```
