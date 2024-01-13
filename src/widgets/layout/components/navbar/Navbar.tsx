import { FaUserCog } from "react-icons/fa";
import { MenuBuilder } from "../menuBuilder/MenuBuilder";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { SearchBar } from "@/shared/components/searchBar/SearchBar";
export const Navbar = () => {
  const menuList = [
    {
      label: "",
      key: "",
    },
    {
      label: "",
      key: "users",
      icon: <FaUserCircle style={{ fontSize: 30 }} />,
      children: [
        {
          label: "Profils",
          key: "Profil",
          icon: <FaUserCog />,
        },
        {
          label: "Se déconnecter",
          key: "logout",
          icon: <MdLogout />,
        },
      ],
    },
  ];
  return (
    <div className="flex mx-[25px] my-[25px]">
      <SearchBar
        className="mr-[12px]"
        style={{ width: '80%' }}
        label=""
        name="search"
        placeholder="Rechercher"
        onChange={() => {}}
      />
      <MenuBuilder
        isActive={false}
        menuList={menuList}
        mode="horizontal"
        width={"20%"}
      />
    </div>
  );
};
