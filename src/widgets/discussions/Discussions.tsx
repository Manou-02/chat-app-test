import { Search } from "@/shared/ui/search/Search";
import { useEffect, useState } from "react";
import { CardUser } from "./components/cardUser/CardUser";
import { Divider } from "@/shared/ui/divider/Divider";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/appStore";
import { DiscussionsServices } from "@/features/discussions/services/DiscussionService";
import { Loader } from "@/shared/ui/loader/Loader";

// type DataType = {
//   _id: string;
//   name: string;
//   email?: string;
//   image?: string;
//   isActive?: boolean;
// };

export const Discussions = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [allData, setAllData] = useState<any[]>([]);

  const user = useSelector((state: RootState) => state.profileUser)?.user;

  // const [fake] = useState<Array<DataType>>([
  //   {
  //     id: "12345",
  //     name: "John Doe",
  //     subtitle: "Ingenieur",
  //     image:
  //       "https://static.vecteezy.com/system/resources/thumbnails/002/002/332/small_2x/ablack-man-avatar-character-isolated-icon-free-vector.jpg",
  //     isActive: false,
  //   },
  //   {
  //     id: "54321",
  //     name: "Jena Lee",
  //     subtitle: "Developpeure",
  //     image:
  //       "https://media.istockphoto.com/id/1331335633/es/vector/icono-de-avatar-femenino.jpg?s=612x612&w=0&k=20&c=DDuYYm6mJ-yJk793qnO2BKqtqiU3-X53qRchowEN1ZI=",
  //     isActive: true,
  //   },
  // ]);

  useEffect(() => {
    getChatDiscussions(user._id);
  }, [user]);

  const getChatDiscussions = async (id: string) => {
    try {
      setIsloading(true);
      const res = await DiscussionsServices.getUserDiscussions(id);
      setAllData(res?.data);
    } catch (error) {
    } finally {
      setIsloading(false);
    }
  };

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
      <Loader isLoading={isLoading} />
      <form>
        <Search name="search" placeholder="Recherche" onChange={handleChange} />
        <button type="submit" onClick={handleSubmitSearch}></button>
      </form>

      <div className="">
        {allData?.map((item: any, key: number) => (
          <div key={key}>
            <CardUser
              id={item?._id}
              name={
                item?.members?.find((member: any) => member?._id !== user?._id)
                  ?.name
              }
              subtitle={
                item?.members?.find((member: any) => member?._id !== user?._id)
                  ?.email
              }
              image={item?.image}
              isActive={item?.isActive}
              onClick={handleClick}
            />
            {allData?.length > 1 && allData?.length - 1 !== key ? (
              <Divider />
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
