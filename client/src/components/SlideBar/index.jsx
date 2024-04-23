import { useState } from "react";
import { Link } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { MdDashboard } from "react-icons/md";
import { Layout, Menu } from "antd";

import "./slideBar.scss";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { LuLayoutDashboard } from "react-icons/lu";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";




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
          theme="dark"
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
    <LuLayoutDashboard />
    </Link>
  ),
  getItem(
    "Mes activités",
    "2",
    <Link to="/dashboard/activities" >
      <DesktopOutlined />
    </Link>
  ),
  getItem(
    "Mes lieux",
    "3",
    <Link to="/dashboard/Spot" >
      <FaMapMarkerAlt />
    </Link>
  ),

  getItem(
    "Programmation",
    "4",
    <Link to="/dashboard/reservation" >
      <TbBrandBooking />
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
