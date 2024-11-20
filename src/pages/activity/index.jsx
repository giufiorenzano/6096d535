import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ArchiveSvg from "../../assets/archive.svg";
import UnarchiveSvg from "../../assets/unarchive.svg";

import Call from "../../components/call/index.jsx";

import { useActivitiesHook } from "../../hooks/activities.jsx";

import { useLoader } from "../../providers/loader.jsx";

import "./style.css";

const ActivityFeed = () => {
  const {
    activities,
    getActivities,
    getArchived,
    groupByDate,
    reorderByDate,
    updateActivity,
    resetActivitiesToInitialState,
  } = useActivitiesHook();
  const [callsByDay, setCallsByDay] = useState([]);
  const [callsByType, setCallsByType] = useState([]);
  const { startLoading, endLoading } = useLoader();

  const location = useLocation();
  const archived = location.pathname === "/" ? false : true;

  const toggleStatusChange = async () => {
    startLoading("toggleStatusChange");

    let promises;
    if (archived) {
      promises = [resetActivitiesToInitialState()];
    } else {
      promises = callsByType.map((call) => {
        updateActivity(call.id, !archived);
      });
    }
    await Promise.all(promises);

    setTimeout(() => {
      getActivities();
    }, 3000);

    endLoading("toggleStatusChange");
  };

  const content = () => {
    if (archived) {
      return {
        icon: UnarchiveSvg,
        text: "Unarchive all calls",
      };
    }
    return {
      icon: ArchiveSvg,
      text: "Archive all calls",
    };
  };

  const SvgToRender = content().icon;

  useEffect(() => {
    getActivities();
  }, []);

  useEffect(() => {
    if (!activities) return;

    const callsByType = getArchived(archived);

    setCallsByType(callsByType);

    const grouped = groupByDate(callsByType);
    const reordered = reorderByDate(grouped, "date");

    setCallsByDay(reordered);
  }, [activities, location]);

  return (
    <>
      <button
        className="archive-button flex align-center mb-4 py-2 px-4"
        onClick={toggleStatusChange}
        disabled={!callsByDay.length}
      >
        <SvgToRender />
        <span className="pl-2">{content().text}</span>
      </button>
      {activities && callsByDay.length ? (
        <>
          <ul>
            {callsByDay.map((call) => (
              <li
                className="activity flex flex-column align-center justify-center mt-4 py-2 px-3"
                key={call.date}
              >
                <span className="date mb-2">{call.date}</span>
                <ul className="calls flex flex-column">
                  {call.calls.map((act) => (
                    <Call key={act.id} call={act} />
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <span className="not-found">No calls found.</span>
      )}
    </>
  );
};

export default ActivityFeed;
