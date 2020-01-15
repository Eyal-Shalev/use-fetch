import React, {useEffect, useRef} from 'react';
import {useReadme} from "./data";
import ReactMarkdown from "react-markdown";
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import Container from "react-bootstrap/Container";

export const About = () => {
  const {value: readme} = useReadme();
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
