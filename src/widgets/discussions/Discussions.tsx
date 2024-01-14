import { Search } from "@/shared/ui/search/Search";
import { useState } from "react";
import { CardUser } from "./components/cardUser/CardUser";
import { Divider } from "@/shared/ui/divider/Divider";
import { useNavigate } from "react-router-dom";

type DataType = {
  id: string;
  name: string;
  subtitle?: string;
  image?: string;
  isActive?: boolean;
};

export const Discussions = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState<string>("");

  const [fake] = useState<Array<DataType>>([
    {
      id: "12345",
      name: "John Doe",
      subtitle: "Ingenieur",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/002/002/332/small_2x/ablack-man-avatar-character-isolated-icon-free-vector.jpg",
      isActive: false,
    },
    {
      id: "54321",
      name: "Jena Lee",
      subtitle: "Developpeure",
      image:
        "https://media.istockphoto.com/id/1331335633/es/vector/icono-de-avatar-femenino.jpg?s=612x612&w=0&k=20&c=DDuYYm6mJ-yJk793qnO2BKqtqiU3-X53qRchowEN1ZI=",
      isActive: true,
    },
  ]);

  const handleChange = (e: any) => {
    setSearchText((Object.values(e) as any)[0]);
  };

  const handleSubmitSearch = (e: any) => {
    e.preventDefault();

    console.log(searchText);
  };

  const handleClick = (id: string) => {
    navigate(`discussion/${id}`);
  };

  return (
    <div>
      <form>
        <Search name="search" placeholder="Recherche" onChange={handleChange} />
        <button type="submit" onClick={handleSubmitSearch}></button>
      </form>

      <div className="">
        {fake?.map((item: DataType, key: number) => (
          <div key={key}>
            <CardUser
              id={item?.id}
              name={item?.name}
              subtitle={item?.subtitle}
              image={item?.image}
              isActive={item?.isActive}
              onClick={handleClick}
            />
            {fake?.length > 1 && fake?.length - 1 !== key ? <Divider /> : ""}
          </div>
        ))}
      </div>
    </div>
  );
};
