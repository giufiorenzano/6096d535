import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CallDetail from "@/aircall/components/CallDetail/index.jsx";
import { useActivitiesHook } from "@/aircall/hooks/ActivitiesHook.jsx";

const Call = () => {
  const location = useLocation();
  const id = location.pathname.split("/call/")[1];

  const { getCallById, selectedCall } = useActivitiesHook();

  useEffect(() => {
    getCallById(id);
  }, []);

  return <CallDetail call={selectedCall} />;
};

export default Call;
