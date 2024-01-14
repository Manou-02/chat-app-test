// import Spinner from "@/shared/ui/spinner/Spinner";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import { AuthServices } from "@/features/auth/services/Auth.services";
// import { HttpStatus } from "@/shared/config/Status";
import { Loader } from "@/shared/ui/loader/Loader";
import { resetUserProfileData } from "@/features/auth/reducers/Auth.reducers";
import { useDispatch } from "react-redux";

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    //     dispatch(logout()).then(() => {
    //     });
    handleLogout();
  }, []);

  const handleLogout = async () => {
    // const res = await AuthServices.logout();
    navigate("/login", { replace: true });
    dispatch(resetUserProfileData({}));
    navigate(-1);

    // if ((res as any).status === HttpStatus.OK) {
    //   console.log("Response_n", res);
    // } else {
    //   navigate(-1);
    // }
  };

  return <Loader isLoading={true} />;
};
