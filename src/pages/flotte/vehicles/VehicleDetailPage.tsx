import { Button, Image } from "antd";
import Title from "antd/es/typography/Title";
import {
  useNavigate, /*useParams*/
  useParams
} from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { IMAGES } from "@/shared/config/Images";
import { CardDetailVehicle } from "@/widgets/flotte/vehicle/detail/cardDetailVehicle/CardDetailVehicle";
import { useEffect } from "react";
// import { ServiceDetailVehicle } from "@/widgets/components/vehicle/detail/serviceDetailVehicle";
// import { AssuranceDetailVehicle } from "@/widgets/components/vehicle/detail/assuranceDetailVehicle";
import { useDispatch } from "react-redux";
import { fetchOneVehicle } from "@/features/flotte/vehicles/actions";
import { useVehicleData } from "@/features/flotte/vehicles/lib";
import { resetData } from "@/features/flotte/vehicles/reducers/vehicle.reducer";

export type Intervention = {
  id: string;
  type: "curative";
  kilometrage: number;
  piece: string;
  dateEnd: string;
  amount: number;
};

export const VehicleDetailPage = () => {
  let { id } = useParams();
  const dispatch: any = useDispatch();
  const currentVehicle = useVehicleData();
  useEffect(() => {
    dispatch(fetchOneVehicle(+(id as string)));
    return () => { dispatch(resetData()) }
  }, [id]);

  // const [active, setActive] = useState<
  //   "service" | "consommation" | "technic" | "agreement" | "assurances"
  // >("agreement");
  const navigate = useNavigate();
  //   const { id } = useParams();

  const handleClickPrevious = () => {
    navigate("/flotte/cars");
  };

  // const DetailActive = () => {
  //   switch (active) {
  //     case "service":
  //       return <ServiceDetailVehicle />;
  //     case "consommation":
  //       return <>Consommation</>;
  //     case "technic":
  //       return <>Technic</>;
  //     case "agreement":
  //       return <>Agreement</>;
  //     case "assurances":
  //       return <AssuranceDetailVehicle />;
  //   }
  // };

  return (
    <>
      <div className="flex w-full justify-start">
        <div className="flex justify-center items-center mr-4">
          <Button onClick={handleClickPrevious}>
            <FaChevronLeft />
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <Title
            className="text-[28px] mb-0 flex justify-center items-center"
            level={1}
          >
            Vehicules
          </Title>
        </div>
      </div>
      <div className="flex ">
        <Image width={200} src={IMAGES.DEFAULT_DETAIL_IMAGE} />
        <CardDetailVehicle vehicle={currentVehicle} />
      </div>
      {/* <div className="flex justify-between my-[24px]">
        <div
          className={`font-bold p-[12px] ${active === "service" && "bg-[#D8E3EF] rounded"
            }`}
          onClick={() => {
            setActive("service");
          }}
        >
          Carnet d'entretiens
        </div>
        <div
          className={`font-bold p-[12px] ${active === "consommation" && "bg-[#D8E3EF] rounded"
            }`}
          onClick={() => {
            setActive("consommation");
          }}
        >
          Carnet des consommations
        </div>
        <div
          className={`font-bold p-[12px] ${active === "technic" && "bg-[#D8E3EF] rounded"
            }`}
          onClick={() => {
            setActive("technic");
          }}
        >
          Controle techniques
        </div>
        <div
          className={`font-bold p-[12px] ${active === "agreement" && "bg-[#D8E3EF] rounded"
            }`}
          onClick={() => {
            setActive("agreement");
          }}
        >
          Agrementation
        </div>
        <div
          className={`font-bold p-[12px] ${active === "assurances" && "bg-[#D8E3EF] rounded"
            }`}
          onClick={() => {
            setActive("assurances");
          }}
        >
          Assurances
        </div>
      </div>
      <div>{DetailActive()}</div> */}
    </>
  );
};
