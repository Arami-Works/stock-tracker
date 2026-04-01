import { Component, type ReactNode } from "react";

interface QueryErrorBoundaryProps {
  children: ReactNode;
  fallback: (props: { retry: () => void }) => ReactNode;
}

interface QueryErrorBoundaryState {
  hasError: boolean;
}

export class QueryErrorBoundary extends Component<
  QueryErrorBoundaryProps,
  QueryErrorBoundaryState
> {
  state: QueryErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): QueryErrorBoundaryState {
    return { hasError: true };
  }

  retry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback({ retry: this.retry });
    }
    return this.props.children;
  }
}
