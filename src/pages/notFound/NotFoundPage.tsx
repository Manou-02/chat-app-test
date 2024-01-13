import { Color } from "@/shared/config/Colors";
import "./styles.scss";
import { Card } from "antd";
import { Button } from "@/shared/ui/button/Button";
import { useNavigate } from "react-router-dom";
// import { IMAGES } from "@/shared/config/Images";

export const NotFound = () => {
  const navigate = useNavigate();

  const redirectHandler = () => {
    navigate("/");
  };

  return (
    <div
      className="not-found__container"
      style={{ backgroundColor: Color.ACCENT }}
    >
      <div className="not-found__content">
        <Card className="">
          <div className="not-found__items">
            <p>404 - Not found </p>
            <p className="not-found__text">
              La page que vous essayez de joindre est introuvable.
            </p>
            <Button onClick={redirectHandler}> Accueil </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
