import { useState } from "react";
import { Link } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { MdDashboard } from "react-icons/md";
import { Layout, Menu } from "antd";

import "./slideBar.scss";

import { LuLayoutDashboard } from "react-icons/lu";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { MdOutlineLocalActivity } from "react-icons/md";

function SlideBar() {
  const { Sider } = Layout;
  const [isOpen, setIsOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const HandleOpened = () => {
    setIsOpen(!isOpen);
    console.log("on ouvre ", isOpen);
  };

  return (
    <Layout className="slidebar">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
    </Layout>
  );
}

export default SlideBar;

const items = [
  getItem(
    "Dashboard",
    "1",
    <Link to="/dashboard">
      <LuLayoutDashboard className="icon slideBar" />
    </Link>
  ),
  getItem(
    "Sessions Réservées",
    "2",
    <Link to="/dashboard/customer-session">
      <TbBrandBooking className="icon slideBar" />
    </Link>
  ),
  getItem(
    "Sessions",
    "3",
    <Link to="/dashboard/sessions">
      <TbBrandBooking className="icon slideBar" />
    </Link>
  ),
  getItem(
    "Mes activités",
    "4",
    <Link to="/dashboard/activities">
      <MdOutlineLocalActivity className="icon slideBar" />
    </Link>
  ),
  getItem(
    "Mes lieux",
    "5",
    <Link to="/dashboard/Spot">
      <FaMapMarkerAlt className="icon slideBar" />
    </Link>
  ),
];

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
