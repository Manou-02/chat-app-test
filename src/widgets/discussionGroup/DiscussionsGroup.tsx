import { Search } from "@/shared/ui/search/Search";
import { useState } from "react";
import { CardGroup } from "../discussions/components/cardGroup/CardGroup";
import { Divider } from "@/shared/ui/divider/Divider";

type DataType = {
  id: string;
  name: string;
  subtitle?: string;
  image?: string;
};

export const DiscussionsGroup = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [fake] = useState<Array<DataType>>([
    {
      id: "gp_1",
      name: "Groupe 1",
      subtitle: "Groupe de developpeur",
    },
    {
      id: "gp_2",
      name: "Groupe 2",
      subtitle: "Groupe integrqteur",
    },
  ]);

  const handleChange = (e: any) => {
    setSearchText((Object.values(e) as any)[0]);
  };

  const handleSubmitSearch = (e: any) => {
    e.preventDefault();

    console.log(searchText);
  };

  const handleClickGroup = (id: string) => {
    console.log(id);
  };
  return (
    <div>
      <form>
        <Search
          name="search"
          placeholder="Recherche groupe"
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmitSearch}></button>
      </form>

      <div className="">
        {fake?.map((item: DataType, key: number) => (
          <div key={key}>
            <CardGroup
              id={item?.id}
              name={item?.name}
              subtitle={item?.subtitle}
              image={item?.image}
              onClick={handleClickGroup}
            />
            {fake?.length > 1 && fake?.length - 1 !== key ? <Divider /> : ""}
          </div>
        ))}
      </div>
    </div>
  );
};
