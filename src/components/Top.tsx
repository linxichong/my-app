import * as React from "react";

export interface TopProps {

}

class Top extends React.Component<TopProps> {
    constructor(props: TopProps) {
        super(props);
    }

    componentDidMount(){
        console.log(this.props)
    }
    
    render() {
        return (<div>Welcome to my app!!</div>);
    }
}

export default Top;