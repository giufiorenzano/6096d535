import React from "react";
import { useState } from "react";
import request from "../services/request";

export const useActivitiesHook = () => {
  const [activities, setActivities] = useState([]);

  const getActivities = async () => {
    try {
      const activitiesCall = await request.get(
        `${process.env.BASE_URL}/activities`
      );
      setActivities(activitiesCall);
    } catch (err) {
      throw Error(err);
    }
  };

  return {
    activities,
    getActivities,
  };
};
