import { useId } from "react";

const Modal = ({ children, onClose, isVisible }) => {
    const id = useId();
    const handleClose = (e) => {
        if(e.target.id === id){
            onClose();
        }
    }
    if(!isVisible) return null;
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex flex-col justify-center items-center z-[10000]" id={id} onClick={(e)=>handleClose(e)}>
      <div className="flex flex-col items-end">
      <button className="rounded bg-gray-50 px-2 py-1 font-bold mb-1" onClick={onClose}>X</button>
      <div className="w-[360px] bg-black py-4 px-4 rounded">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
