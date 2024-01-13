import { Divider } from "antd";
import { useState } from "react";
import { HistoryAssurance } from "./historyAssurance";
import { ConstatsAssurance } from "./constatsAssurance";
import { ExpirationsAssurance } from "./expirationsAssurance";

export const AssuranceDetailVehicle = () => {
    const [active, setActive] = useState<"history" | "constats" | "expirations">("history")

    const DetailActive = () => {
        switch (active) {
            case 'history':
                return <HistoryAssurance />;
            case 'constats':
                return <ConstatsAssurance />;
            case 'expirations':
                return <ExpirationsAssurance />;
        }
    }


    return (
        <>
            <div className="flex justify-between my-[24px] w-full bg-[#F3F3F3]">
                <div className={`font-bold p-[12px] flex-1 ${active === "history" && "bg-[#E2EEFF] rounded text-[#7CB2FF]"}`} onClick={() => { setActive("history") }}>Historique</div>
                <Divider type="vertical" className="h-auto" />
                <div className={`font-bold p-[12px] flex-1 ${active === "constats" && "bg-[#E2EEFF] rounded text-[#7CB2FF]"}`} onClick={() => { setActive("constats") }}>Constats</div>
                <Divider type="vertical" className="h-auto" />
                <div className={`font-bold p-[12px] flex-1 ${active === "expirations" && "bg-[#E2EEFF] rounded text-[#7CB2FF]"}`} onClick={() => { setActive("expirations") }}>Expirations</div>
            </div>
            <div className="flex justify-center m-[50px]">
                {DetailActive()}
            </div>
        </>

    );
}