import { Modal as AntModal, type ModalProps as AntModalProps } from "antd";
import { type ReactNode } from "react";

export type ModalProps = AntModalProps & {
  children?: ReactNode;
  className?: string;
};

export const Modal = ({ children, className, ...props }: ModalProps) => {
  return (
    <AntModal className={className} {...props}>
      {children}
    </AntModal>
  );
};
