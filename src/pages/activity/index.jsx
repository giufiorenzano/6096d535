import React from "react";
import { useEffect, useState } from "react";

import Call from "../../components/call/index.jsx";
import { useActivitiesHook } from "../../hooks/ActivitiesHook.jsx";

import Archive from "../../assets/archive.svg";

import './style.css'

const ActivityFeed = () => {
  const { activities, getActivities } = useActivitiesHook();
  const [notArchived, setNotArchived] = useState();

  useEffect(() => {
    getActivities();
  }, []);

  useEffect(() => {
    setNotArchived(activities.filter((call) => !call.is_archived));
  }, [activities]);

  console.log(activities, notArchived);

  return (
    <>
      <button className="archive-button flex align-center">
        <Archive />
        <span className="pl-2">Archive all calls</span>
      </button>
      {activities && notArchived && (
        <>
          <ul className="flex flex-column">
            {notArchived.map((act) => (
              <Call key={act.id} call={act} />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default ActivityFeed;
