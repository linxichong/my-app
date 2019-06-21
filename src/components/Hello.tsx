import * as React from "react";

export interface HelloProps {
    name: string
}

const Hello: React.SFC<HelloProps> = (props) => {
    return (<div>Hello {props.name}!!</div>);
}

export default Hello;