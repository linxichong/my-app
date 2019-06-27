import * as React from 'react'

export interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
    constructor(props: {}) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    componentDidCatch(error: any, info: any) {
        if (error) {
            console.error(error)
        }
        if (info) {
            console.log(info)
        }
    }

    render() {
        if (this.state.hasError) {
            return <h1>出错了</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;