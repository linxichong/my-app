import * as React from "react";
import { state, bind } from "reactive.macro";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const About: React.SFC = () => {
  const a = state(1);
  const b = state(2);

  return (
    <Title>
      <Wrapper>About</Wrapper>
      <div>
        <input type="number" value={bind(a)} />
        <button onClick={b => b += 1}>b+</button>

        <p>
          {a} + {b} = {a + b}
        </p>
      </div>
    </Title>
  );
};

export default About;
