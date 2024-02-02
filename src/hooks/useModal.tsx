import { ReactNode, ReactPortal, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const useModal = () => {
  const [modalPortal, setModalPortal] = useState<ReactPortal | null>(null);

  const divRef = useRef<HTMLDivElement>();

  const closeModal = () => {
    if (divRef.current == null) return;
    document.body.removeChild(divRef.current);
    divRef.current = undefined;
    setModalPortal(null);
  };

  const setModal = (children: ReactNode) => {
    if (modalPortal) return;

    const div = document.createElement("div");
    document.body.appendChild(div);
    divRef.current = div;

    setModalPortal(createPortal(children, div));
  };

  return { setModal, closeModal, modalPortal };
};
