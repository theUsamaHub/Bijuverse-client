import { Component } from 'react';
import ErrorPage from '../pages/ErrorPage';
export default class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? <ErrorPage code="500" onRetry={() => window.location.reload()} /> : this.props.children;
  }
}
