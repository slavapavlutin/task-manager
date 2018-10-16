import * as React from 'react';
import styled from 'styled-components';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  [prop: string]: any;
}

class TextArea extends React.PureComponent<Props, {}> {
  public ref = React.createRef<HTMLTextAreaElement>();

  public componentDidMount() {
    this.adjustHeight();
  }

  public handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.adjustHeight();
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  };

  public handleFocus = () => {
    let length: number;
    if (this.props.value) {
      // double the value because Opera is inconsistent with carriage returns
      length = this.props.value.length * 2;
    } else {
      length = 0;
    }
    // timeout is required for blink
    setTimeout(() => {
      if (this.ref.current) {
        this.ref.current.setSelectionRange(length, length);
      }
    }, 1);
  };

  public adjustHeight() {
    const ref = this.ref.current;
    if (ref) {
      if (ref.scrollHeight === 0) {
        return;
      }
      ref.style.height = '1px';
      ref.style.height = `${ref.scrollHeight}px`;
    }
  }

  public render() {
    return (
      <Container
        {...this.props}
        // @ts-ignore
        ref={this.ref}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
      />
    );
  }
}

const Container = styled.textarea`
  overflow: visible;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  padding: 0;
  border: 0;
  margin: 0;
  background: transparent;
  line-height: 1.4;
  resize: none;
  appearance: none;
  color: inherit;
`;

export default TextArea;
