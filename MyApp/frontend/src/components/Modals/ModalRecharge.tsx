// Modal.tsx
import React, { useEffect, useRef } from "react";
import parse from "html-react-parser";
import "animate.css";

interface ModalProps {
  content: string | null;
  isModalRechargeOpen: boolean;
  closeModalRecharge: () => void;
}

const Modal: React.FC<ModalProps> = ({ content, isModalRechargeOpen, closeModalRecharge }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModalRecharge();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, closeModalRecharge]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-start pt-20 z-50 px-5 ${
        isModalRechargeOpen ? "" : "hidden"
      }`}
    >
      <div
        ref={modalRef}
        className="bg-white p-2 rounded-lg relative max-w-lg animate__animated animate__bounceIn  w-screen h-1/2 "
      >
        <div
          onClick={closeModalRecharge}
          className="absolute px-3 h-8 w-8 top-[-15px] -right-3 z-10 flex items-center justify-center border-4 border-white dark:border-zinc-800 rounded-full text-sm font-bold cursor-pointer py-1 text-white bg-zinc-800 dark:bg-zinc-200"
        >
          <div className="text-xl dark:text-zinc-800">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 20 20"
              aria-hidden="true"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
            </svg>
          </div>
        </div>
        <div className="my-5 ">{parse(content || "Loading...")}</div>
      </div>
    </div>
  );
};

export default Modal;
