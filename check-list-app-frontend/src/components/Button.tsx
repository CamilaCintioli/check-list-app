import styled from 'styled-components';

export default styled.button`
  padding: 1em;
  margin: 0.25em;
  border: 0;
  border-radius: 4px;
  background: #409;
  color: white;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  > * + * {
      margin-inline-start: 1em;
  }
`