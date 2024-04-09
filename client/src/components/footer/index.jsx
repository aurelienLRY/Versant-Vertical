import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../modal";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/authSlice";
import Login from "../login"; // Import the Login component
import "./footer.scss";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import moduleStyle from "../../assets/sass/main.module.scss";
import { Tooltip } from "antd";

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
        <Login isConnect={(e) => setModalIsOpened(e.target)} />
      </Modal>
      <div>
        <Tooltip
          title="Facebook"
          placement="top"
          color={moduleStyle.toolTipBackground}
        >
          <FaFacebookSquare />
        </Tooltip>
        <Tooltip
          title="Instagram"
          placement="top"
          color={moduleStyle.toolTipBackground}
        >
          <FaInstagram />
        </Tooltip>
      </div>
      <div>occitanie-evasion</div>
      <div>
        <button onClick={handleModal} className="btn-secondary-outline small">
          {isAuthenticated ? "Déconnexion" : "Connection"}{" "}
        </button>
      </div>
    </footer>
  );
}

export default Footer;
