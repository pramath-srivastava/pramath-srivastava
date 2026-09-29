import { Component, PropsWithChildren } from "react";

type State = { failed: boolean };

/** A missing 3D preview should not prevent the text portfolio from rendering. */
class PreviewBoundary extends Component<PropsWithChildren, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    console.error("3D preview failed to render:", error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default PreviewBoundary;
