import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowDown from "../../assets/arrow-down.svg";
import ArrowUp from "../../assets/arrow-up.svg";

import { formatPhoneNumber, formatTime } from "../../utils/format.js";

import "./style.css";

const Call = ({ call }) => {
  const navigate = useNavigate()

  const content = {
    inbound: {
      icon: ArrowDown,
      phone: formatPhoneNumber(call.from),
      time: formatTime(call.created_at),
    },
    outbound: {
      icon: ArrowUp,
      phone: formatPhoneNumber(call.to),
      time: formatTime(call.created_at),
    },
  };

  const SvgToRender = content[call.direction].icon;

  return (
    <>
      <li
        className={`call py-2 px-4 ${call.call_type}`}
      >
        <button className="flex align-center justify-space-between" onClick={() => navigate(`/call/${call.id}`)}>
          <SvgToRender />
          <span>{content[call.direction].phone}</span>
          <span>{content[call.direction].time}</span>
        </button>
      </li>
    </>
  );
};

export default Call;
