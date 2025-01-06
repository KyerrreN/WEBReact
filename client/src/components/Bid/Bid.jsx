import React from "react";
import "./Bid.css";
import GavelIcon from "@mui/icons-material/Gavel";
import BidInfo from "../BidInfo/BidInfo";
import { useTranslation } from "react-i18next";
import BidEditDialog from "../BidEditDialog/BidEditDialog";

export default function Bid({
    name,
    desc,
    needed,
    payment,
    deadline,
    id,
    onDelete,
    onUpdate,
}) {
    const { t } = useTranslation();

    return (
        <>
            <div className="bid-container">
                <div className="bid">
                    <div className="bid-header">
                        <GavelIcon sx={{ width: 120, height: 120 }} />

                        <span>{name}</span>
                    </div>

                    <div className="bid-desc">
                        <BidInfo header={t("bid-desc")} content={desc} />
                        <BidInfo header={t("bid-needed")} content={needed} />
                        <BidInfo header={t("bid-payment")} content={payment} />
                    </div>
                </div>

                <div className="bid-control">
                    <BidEditDialog
                        id={id}
                        name={name}
                        desc={desc}
                        needed={needed}
                        deadline={deadline}
                        payment={payment}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                </div>
            </div>
        </>
    );
}
