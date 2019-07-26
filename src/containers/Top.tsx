import * as React from "react";
import styled from "styled-components";
import MyForm from "../components/MyForm";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

class Top extends React.Component<{}> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <Title>
        <Wrapper>Welcome to my app!!</Wrapper>
        <MyForm></MyForm>
      </Title>
    );
  }
}

export default Top;
