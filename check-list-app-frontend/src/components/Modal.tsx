
import { ReactNode } from 'react';
import AriaModal, { AriaModalProps } from 'react-aria-modal';
import styled from 'styled-components';



const ModalInnerWrapper = styled.div`
  box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.034),
  0 6.7px 5.3px rgba(0, 0, 0, 0.048),
  0 12.5px 10px rgba(0, 0, 0, 0.06),
  0 22.3px 17.9px rgba(0, 0, 0, 0.072),
  0 41.8px 33.4px rgba(0, 0, 0, 0.086),
  0 100px 80px rgba(0, 0, 0, 0.12)
;

  padding: 32px;
  min-height: 200px;
  min-width: 50vw;
  background: white;
  border-radius: 5px;
`


export default function Modal({ children, ...props}: AriaModalProps & { children: ReactNode}): JSX.Element {
  return (
    <AriaModal
    verticallyCenter={true}
    underlayClickExits={true}
    {...(props as any)}
  >
    <>
      <ModalInnerWrapper>
        {children}
      </ModalInnerWrapper>
    </>
  </AriaModal>
  )
}