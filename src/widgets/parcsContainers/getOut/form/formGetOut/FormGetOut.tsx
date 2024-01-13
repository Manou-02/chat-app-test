import Select from "@/shared/ui/select/Select";
import { TextInput } from "@/shared/ui/textInput/TextInput";
import { Divider, Radio } from "antd";
import { Button as ThemeButton } from "@/shared/ui/button/Button";
import { useCustomerTypesRequests } from "@/features/customerTypes/lib";
import { useClientsRequests } from "@/features/clients/lib";
import { useEffect, useState } from "react";
import { fetchAllCustomerTypes } from "@/features/customerTypes/actions";
import { fetchAllClients } from "@/features/clients/actions";
import { AppDispatch, useDispatch } from "@/app/appStore";
import { useTransportersRequests } from "@/features/transporters/lib";
import { TransportersServices } from "@/features/transporters/services/Transporters.services";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { GetOutService } from "@/features/parcsContainers/getOut/services/GetOut.services";
import { HttpStatus } from "@/shared/config/Status";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { ReservationService } from "@/features/parcsContainers/reservations/services/Reservation.services";
import { useReservationRequests } from "@/features/parcsContainers/reservations/lib";
import { Title } from "@/shared/ui/title/Title";

type IFormGetOut = {
  handleSubmit: (e: any) => void;
  handleChange: (e: any) => void;
}

export const FormGetOut = ({ handleChange, handleSubmit }: IFormGetOut) => {
  const dispatch: AppDispatch = useDispatch();

  // clients
  const clientRequest = useClientsRequests();
  // selected booking
  const [selectedBooking, setSelectedBooking] = useState<any>();
  const getOutContainerRequest = { booking: selectedBooking };

  // selectedContainer
  const [selectedContainer, setSelectedContainer] = useState<any[]>([]);

  // customerTypes
  const customerTypesRequest = useCustomerTypesRequests();
  const [initialState,] = useState<any>({});

  // customerTypes
  const [allTransporters, setallTransporters] = useState<any[]>([])
  // const allTransporters = useTransportersData();
  const tranportersRequest = useTransportersRequests();

  // containers
  const [, setAllContainers] = useState<any[]>([]);

  // bookings
  const [allBookings, setAllBookings] = useState<any[]>([]);
  const bookingsRequest = useReservationRequests();


  const [defaultValueContainer,] = useState<any>({
    containerNumber: { label: "", value: null },
    containerAvailable: []
  });
  const [addedContainer, setAddedContainer] = useState<any[]>([
    defaultValueContainer,
  ]);

  const onInrementContainer = () => {
    setAddedContainer((prev: any) => [...prev, { value: "" }]);
  };

  const onRemoveContainer = (index: number) => {
    setAddedContainer((prev: any[]) => {
      return prev.filter((_: any, key: number) => index !== key)
    }
    );
  };

  const handleChangeBooking = (e: any) => {
    setSelectedBooking(e?.bookingRef?.value);
  }


  useEffect(() => {
    dispatch(fetchAllCustomerTypes(customerTypesRequest));
    dispatch(fetchAllClients(clientRequest));
    ReservationService.getAllService(bookingsRequest)
      .then((result: any) => {
        setAllBookings(result.data.data);
      })
      .catch((error: any) => {
        Toast.error(
          error?.message ||
          "Une erreur s'est produite, veuillez réessayer plus tard."
        );
        throw error;
      })
    TransportersServices.getAllTransporters(tranportersRequest)
      .then((result) => {
        setallTransporters(result.data.data);
      })
      .catch((error: any) => {
        Toast.error(
          error?.message ||
          "Une erreur s'est produite, veuillez réessayer plus tard."
        );
        throw error;
      })
    GetOutService.getAllContainer(getOutContainerRequest)
      .then((allContainer) => {
        setAllContainers(allContainer?.data?.data);
      }).catch((error: any) => {
        Toast.error(
          error?.message ||
          "Une erreur s'est produite, veuillez réessayer plus tard."
        );
        throw error;
      })

  }, [allTransporters])

  const getAllContainers = async (params: any) => {
    try {
      const { status, data } = await ReservationService.getAllContiners(params);
      if (status === HttpStatus.OK) {
        setAllContainers(data?.data);
        setAddedContainer((prev: any) => (prev.map((item: any) => ({ ...item, containerAvailable: data?.data }))))
      } else {
        Toast.error("Une erreur s'est produite, veuillez réessayer");
      }
    } catch (error) {
      console.log(error);
      Toast.error("Une erreur s'est produite, veuillez réessayer");
    } finally {
      // setIsLoading(false);
    }
  };


  useEffect(() => {
    getAllContainers(getOutContainerRequest)
  }, [selectedBooking])

  const handleChangeContainer = (e: any, index: number) => {
    console.log("Containers ", addedContainer)
    setSelectedContainer((prev: any) => [...prev, e.container])
    setAddedContainer((prev: any) => prev.map((item: any, indexItem: number) => {
      if (indexItem === index) {
        return item;
      }
      else {
        return {
          ...item,
          containerAvailable: item?.containerAvailable?.filter((av: any) => av.id !== (e?.container as any).value)
        }
      }
    }))
  }

  return (
    <form
    // onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <div className="flex gap-3">
          <div className="flex-1">
            <Select
              name="carrier"
              label="Transporteur"
              value={initialState["carrier"]}
              options={allTransporters.map((transporter) => {
                return {
                  label: transporter?.name,
                  value: transporter?.id
                }
              })}
              onChange={(e) => handleChange({ ["carrier"]: { id: e?.carrier?.value, name: e?.carrier?.label } })}
            />
          </div>
          <div className="flex-1">
            <TextInput
              label="Numero de camion"
              required
              name="truckNumber"
              // errorMessage="zaza"
              // value={form.getFieldValue("text")}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <TextInput
              label="N. Permis de Conduire Chauffeur"
              required
              name="driverLicenseNumber"
              // errorMessage="zaza"
              // value={form.getFieldValue("text")}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <TextInput
              label="CIN Chauffeur"
              required
              name="nationalIDdriver"
              // errorMessage="zaza"
              // value={form.getFieldValue("text")}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <Select
              name="bookingRef"
              label="N. reservation"
              options={allBookings?.map((booking: any) => {
                return {
                  label: booking?.refBooking,
                  value: booking?.id
                }
              })}
              onChange={handleChangeBooking}
            />
          </div>
          <div className="flex-1">
            <TextInput
              label="Client final"
              name="customerRef"
              // errorMessage="zaza"
              value={allBookings?.find((booking: any) => (booking?.id === selectedBooking))?.client?.refCustomer}
              onChange={(e) => handleChange(e)}
              isDisable
            />
          </div>
        </div>
        <div className="className flex gap-3">
          <div className="flex flex-1 justify-center">
            <Radio.Group name="isBL" onChange={handleChange} >
              <Radio value={true}>Bon de livraison</Radio>
              <Radio value={false}>Facture</Radio>
            </Radio.Group>
          </div>
        </div>
        <Divider />
        <div className=" flex-col gap-[20px] ">
          <div className="mb-[20px]">
            <Title>Containers</Title>
          </div>
          <div className="w-[30%]">
            {addedContainer?.map((item: any, index: number) => {
              if (item?.containerAvailable?.length) {
                return (
                  <div className="flex gap-[20px] justify-center items-center w-full">
                    <div className="w-full mt-[20px]">
                      <Select
                        name="container"
                        label="Container disponible"
                        placeholder="-- Sélectionner un container --"
                        value={item?.containerAvailable?.value}
                        options={item?.containerAvailable?.map((container: any) => {
                          return {
                            label: container?.containerNumber,
                            value: container?.id
                          }
                        })}
                        onChange={(e) => handleChangeContainer(e, index)}
                      />
                    </div>
                    {index !== 0 ? (
                      <MdOutlineDeleteOutline
                        onClick={() => onRemoveContainer(index)}
                        className="cursor-pointer h-[20px] w-[20px] hover:bg-primary rounded-[50%] p-[2px] hover:text-white"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                )
              }
              return;
            })}
          </div>
          <span
            onClick={onInrementContainer}
            className="bg-primary text-white rounded-[50%] w-[25px] h-[25px] flex justify-center items-center cursor-pointer "
          >
            {" "}
            +{" "}
          </span>{" "}
        </div>
      </div>
      <div className="flex justify-end">
        <ThemeButton onClick={(e) => {
          e?.preventDefault()
          handleSubmit({ containers: selectedContainer, ...{ customer: `customers/${allBookings?.find((booking: any) => (booking?.id === selectedBooking))?.client?.id}` } })
        }}>Valider</ThemeButton>
      </div>
    </form>
  );
};
