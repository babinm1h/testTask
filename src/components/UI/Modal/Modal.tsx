import React, { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";

interface IProps {
  onClose: () => void;
  title?: string;
  isOpen: boolean;
}

const Modal = ({ onClose, children, title, isOpen }: PropsWithChildren<IProps>) => {
  if (!isOpen) return null;
  return createPortal(
    <div
      className="position-fixed w-100 h-100 fixed-top d-flex justify-content-center align-items-center overlay"
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-scrollable w-10 bg-light p-2" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            {title && <h5 className="modal-title">{title}</h5>}
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
