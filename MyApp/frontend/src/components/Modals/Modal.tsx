// Modal.tsx
import React, { useEffect, useRef } from "react";
import parse from "html-react-parser";
import "animate.css";

interface ModalProps {
  content: string | null;
  isModalOpen: boolean;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ content, isModalOpen, closeModal }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, closeModal]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-start pt-20 z-50 px-5 ${
        isModalOpen ? "" : "hidden"
      }`}
    >
      <div ref={modalRef} className="bg-white p-2 rounded-lg relative max-w-lg animate__animated animate__bounceIn">
        <div
          onClick={closeModal}
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
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-4 text-red-600 text-center">
            <svg
              className="inline mb-1 mr-1 fill-red-600"
              xmlns="http://www.w3.org/2000/svg"
              height="22"
              width="20"
              viewBox="0 0 448 512"
            >
              <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
            </svg>
            Thông báo
          </h2>
          <hr />
        </div>
        <div className="my-5">{parse(content || "Loading...")}</div>
        {/* footer */}
        <hr />
        <div className="w-full flex items-center justify-center">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 mt-2 mx-auto"
            onClick={closeModal}
          >
            Tắt thông báo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
