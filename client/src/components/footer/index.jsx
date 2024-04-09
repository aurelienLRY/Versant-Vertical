import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../modal";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/authSlice";
import Login from "../login"; // Import the Login component
import "./footer.scss";

function Footer() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [modalIsOpened, setModalIsOpened] = useState(false);

  const handleModal = () => {
    setModalIsOpened(!modalIsOpened);
    if (isAuthenticated) {
      dispatch(logout());
      setModalIsOpened(false);
    }
  };

  return (
    <footer className="footer" data-testid="footer">
      <Modal isOpened={modalIsOpened} Closed={handleModal}>
       <Login isConnect={(e) => setModalIsOpened(e.target)}/>
      </Modal>
      <div>1</div>
      <div>2 </div>
      <div>
        <button onClick={handleModal}>
          {isAuthenticated ? "Déconnexion" : "Connection"}{" "}
        </button>
      </div>
    </footer>
  );
}

export default Footer;
