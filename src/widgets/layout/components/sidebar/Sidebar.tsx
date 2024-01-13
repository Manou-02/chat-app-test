import { FC } from "react";
import { MenuBuilder } from "../menuBuilder/MenuBuilder";
import { CiSettings /*CiUser*/ } from "react-icons/ci";
//import { MdManageAccounts } from "react-icons/md";
import { GiHomeGarage } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { BsBoxFill } from "react-icons/bs";
import { IMAGES } from "@/shared/config/Images";
import styles from "./style.module.scss";
// import { PiUsersThreeBold } from "react-icons/pi";
// import { FaChalkboardUser } from "react-icons/fa6";
// import { RiMapPinLine } from "react-icons/ri";

export const Sidebar: FC = () => {
  const iconSize = { fontSize: 20 };
  const menuList = [
    {
      label: "Tableau de bord",
      key: "/",
      icon: <GoHomeFill style={iconSize} />,
    },
    {
      label: "CRM",
      key: "crm",
      icon: <FaUser style={iconSize} />,
      children: [
        {
          label: "Dossiers",
          key: "crm/dossiers",
          // icon: <CiUser style={iconSize} />,
        },
        {
          label: "Transactions",
          key: "crm/transactions",
          // icon: <RiMapPinLine style={iconSize} />,
        },
      ],
    },
    {
      label: "Flotte",
      key: "flotte",
      icon: <GiHomeGarage style={iconSize} />,
      children: [
        {
          label: "Véhicules",
          key: "flotte/cars",
        },
      ],
    },
    {
      label: "Terminal Container",
      key: "parcs-container",
      icon: <BsBoxFill style={iconSize} />,
      children: [
        {
          label: "Terminal",
          key: "terminal-container/terminal",
        },
        {
          label: "Get In",
          key: "terminal-container/get-in",
        },
        {
          label: "Réservations",
          key: "terminal-container/reservations",
        },
        {
          label: "Get Out",
          key: "terminal-container/get-out",
        },
      ],
    },
    {
      label: "Clients",
      key: "clients",
      icon: <FaUser style={iconSize} />,
    },
    {
      label: "Paramètres",
      key: "setting",
      icon: <CiSettings style={iconSize} />,
      children: [
        {
          label: "Utilisateurs",
          key: "setting/user",
          // icon: <CiUser style={iconSize} />,
        },
         {
           label: "Centres",
           key: "setting/centers",
           // icon: <RiMapPinLine style={iconSize} />,
         },
         {
          label: "Départements",
          key: "setting/department",
          // icon: <FaChalkboardUser style={iconSize} />,
        },
        {
          label: "Compagnie maritime",
          key: "setting/shipping-company",
          // icon: <BsBoxFill style={iconSize} />,
        },
        // {
        //   label: "Autres frais",
        //   key: "setting/other-cost",
        // },
        // {
        //   label: "Coûts MO",
        //   key: "setting/average-cost",
        //   // icon: <FaChalkboardUser style={iconSize} />,
        // },
        {
          label: "Liste des Transporteurs",
          key: "setting/transporter",
          // icon: <FaChalkboardUser style={iconSize} />,
        },
        {
          label: "Gestion des Qualités",
          key: "setting/quality",
          // icon: <FaChalkboardUser style={iconSize} />,
        },
        {
          label: "Gestion des Dévises",
          key: "setting/currency",
          // icon: <FaChalkboardUser style={iconSize} />,
        },
        {
          label: "Gestion des Banques",
          key: "setting/banks",
          // icon: <FaChalkboardUser style={iconSize} />,
        },
        /*{
          label: "Rôles",
          key: "setting/role",
          icon: <MdManageAccounts style={iconSize} />,
        },*/
        {
          label: "Marque de vehicule",
          key: "setting/vehicle-brand",
          // icon: <BsBoxFill style={iconSize} />,
        },
        {
          label: "Modèle de vehicule",
          key: "setting/vehicle-model",
          // icon: <BsBoxFill style={iconSize} />,
        },
        {
          label: "Type de clients",
          key: "setting/customer-type",
          // icon: <PiUsersThreeBold style={iconSize} />,
        },
        {
          label: "Type de fournisseurs",
          key: "setting/provider",
          // icon: <FaChalkboardUser style={iconSize} />,
        },
        {
          label: "Type de services",
          key: "setting/service-type",
          // icon: <FaChalkboardUser style={iconSize} />,
        },
        {
          label: "Type de containers",
          key: "setting/type-container",
          // icon: <BsBoxFill style={iconSize} />,
         },
      ],
    },
  ];
  return (
    <div className={styles.sidebar__container}>
      <div className="bg-white w-full pb-[10px]">
        <img src={IMAGES.LOGO_IMAGE} alt="Logo images" />
      </div>
      <MenuBuilder menuList={menuList} isActive />
    </div>
  );
};
