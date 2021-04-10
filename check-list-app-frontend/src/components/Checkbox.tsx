import styled from 'styled-components'

const HiddenInput = styled.input.attrs({ type: "checkbox"})`
  display: none;
`

const CheckboxIcon = styled.span`
width: 100%;
height: 100%;

  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
`;

const CheckboxWrapper = styled.span`
  width: 1.1em;
  height: 1.1em;

  ${CheckboxIcon} {
    background-image: url('/svg/check_box_outline_blank_black_24dp.svg');
  }

  input:checked + ${CheckboxIcon} {
    background-image: url('/svg/check_box_black_24dp.svg');
    background-color: #e3ccff;
  }
`;

export default styled(function Checkbox({ className, style, ...props }) {
  return (
    <CheckboxWrapper className={className} style={style}>
      <HiddenInput {...props} />
      <CheckboxIcon />
    </CheckboxWrapper>
  )
})``;