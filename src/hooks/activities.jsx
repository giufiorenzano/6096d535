import { useState } from "react";

import { useLoader } from "../providers/LoaderProvider.jsx";

import request from "../services/request.js";

import { formatDate } from "../utils/format.js";

export const useActivitiesHook = () => {
  const [activities, setActivities] = useState([]);
  const [selectedCall, setSelectedCall] = useState({});
  const { startLoading, endLoading } = useLoader();

  const getActivities = async () => {
    startLoading("getActivities");

    try {
      const activitiesCall = await request.get(
        `${process.env.BASE_URL}/activities`
      );
      setActivities(activitiesCall);
    } catch (err) {
      throw Error(err);
    }

    endLoading("getActivities");
  };

  const updateActivity = async (callId, archive) => {
    startLoading("updateActivity");

    try {
      await request.patch(
        `${process.env.BASE_URL}/activities/${callId}`,
        {
          is_archived: archive,
        },
        false
      );
    } catch (err) {
      throw Error(err);
    }

    endLoading("updateActivity");
  };

  const getCallById = async (callId) => {
    startLoading("getCallById");

    try {
      const call = await request.get(
        `${process.env.BASE_URL}/activities/${callId}`
      );
      setSelectedCall(call);
    } catch (err) {
      throw Error(err);
    }

    endLoading("getCallById");
  };

  const resetActivitiesToInitialState = async () => {
    startLoading("resetActivitiesToInitialState");

    try {
      await request.patch(`${process.env.BASE_URL}/reset`, {}, false);
    } catch (err) {
      throw Error(err);
    }

    endLoading("getCallById");
  };

  const getArchived = (archived = true) => {
    return activities.filter((call) => call.is_archived === archived);
  };

  const groupByDate = (calls) => {
    return calls.reduce((acc, call) => {
      const date = formatDate(call.created_at, true);
      const dateIndex = acc.findIndex((entry) => entry.date === date);

      if (dateIndex > -1) {
        acc[dateIndex].calls.push(call);

        acc[dateIndex].calls = reorderByDate(
          acc[dateIndex].calls,
          "created_at"
        );
      } else {
        const newEntry = { date, calls: [call] };

        acc.push(newEntry);
      }
      return acc;
    }, []);
  };

  const reorderByDate = (calls, key) => {
    return calls.sort((a, b) => new Date(b[key]) - new Date(a[key]));
  };

  return {
    activities,
    selectedCall,
    getActivities,
    getArchived,
    groupByDate,
    reorderByDate,
    updateActivity,
    getCallById,
    resetActivitiesToInitialState,
  };
};
