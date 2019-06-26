import * as React from "react";

export interface TopProps {

}

class Top extends React.Component<TopProps> {
    constructor(props: TopProps) {
        super(props);
    }

    componentDidMount(){
        let data = callApi('/data/index')
        console.log(data)
    }
    
    render() {
        return (<div>Welcome to my app!!</div>);
    }
}

export default Top;