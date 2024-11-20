import React, { useState } from "react";
import { useEffect } from "react";

import ArrowDown from "../../assets/arrow-down.svg";
import ArrowUp from "../../assets/arrow-up.svg";

import {
  formatDate,
  formatPhoneNumber,
  formatTime,
} from "../../utils/format.js";

import "./style.css";

const CallDetail = ({ call }) => {
  const [content, setContent] = useState();
  const SvgToRender = call.direction === "inbound" ? ArrowDown : ArrowUp;

  const getTitle = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1) + " call";
  };

  const getDuration = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    return [
      hours > 0 ? `${hours}h` : null,
      minutes > 0 ? `${minutes}m` : null,
      `${seconds}s`,
    ]
      .filter(Boolean)
      .join(" ");
  };

  useEffect(() => {
    if (!Object.values(call).length) return;

    const contentLiteral = {
      inbound: {
        title: getTitle(call.call_type),
        direction: "from",
        phone: formatPhoneNumber(call.from),
        date: formatDate(call.created_at),
        time: formatTime(call.created_at),
        duration: getDuration(call.duration),
      },
      outbound: {
        title: getTitle(call.call_type),
        direction: "to",
        phone: formatPhoneNumber(call.to),
        date: formatDate(call.created_at),
        time: formatTime(call.created_at),
        duration: getDuration(call.duration),
      },
    };

    setContent(contentLiteral[call.direction]);
  }, [call]);

  return (
    <>
      {content && (
        <>
          <div className={`call-detail flex flex-column ${call.call_type}`}>
            <div className="header flex align-center">
              <SvgToRender />
              <span className="title">Call {content.direction}</span>
              <span className="number">{content.phone}</span>
            </div>

            <div className="detail flex flex-column gap py-2 px-4">
              <div className="date mb-1">
                <span>{content.date}</span>
              </div>

              <div className="duration flex flex-column gap">
                <span>
                  {content.time} {""} <b>{content.title}</b>
                </span>
                <span>{content.duration}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CallDetail;
