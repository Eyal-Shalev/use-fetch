import React, {useEffect, useRef} from 'react';
import ReactMarkdown from "react-markdown";
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import Container from "react-bootstrap/Container";
import {useText} from "@eyalsh/use-fetch";

export const About = () => {
  const {value: readme} = useText('https://raw.githubusercontent.com/Eyal-Shalev/use-fetch/master/README.md');
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    Prism.highlightAllUnder(ref.current)
  }, [readme, ref]);

  return (
    <Container>
      <div ref={ref}>
        <ReactMarkdown source={readme} />
      </div>
    </Container>
  );
};
