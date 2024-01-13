import { Search } from "@/shared/ui/search/Search";
import { useState } from "react";
import { CardGroup } from "../discussions/components/cardGroup/CardGroup";
import { Divider } from "@/shared/ui/divider/Divider";

type DataType = {
  name: string;
  subtitle?: string;
  image?: string;
};

export const DiscussionsGroup = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [fake] = useState<Array<DataType>>([
    {
      name: "Groupe 1",
      subtitle: "Groupe de developpeur",
    },
    {
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
              name={item?.name}
              subtitle={item?.subtitle}
              image={item?.image}
            />
            {fake?.length > 1 && fake?.length - 1 !== key ? <Divider /> : ""}
          </div>
        ))}
      </div>
    </div>
  );
};
