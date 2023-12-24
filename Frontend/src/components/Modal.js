import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../feature/modal/modalSlice';

const Modal = () => {
    const {imageUrl} = useSelector((store)=>store.modal)
    const dispatch = useDispatch()

  return (
    <aside className='modal-container' onClick={()=>dispatch(closeModal())}>
        <div className='modal'>
            <span className="close" onClick={()=>dispatch(closeModal())} >&times;</span>
            <img src={imageUrl} alt="" className='modalImg' />
            
        </div>
      
    </aside>
  );
};

export default Modal;
