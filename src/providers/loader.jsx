import React, { createContext, useState, useContext, useEffect } from "react";

const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
  const [loadingQueue, setLoadingQueue] = useState([]);
  const [loading, setLoading] = useState(false);

  const startLoading = (item) => {
    const queue = [...loadingQueue];

    if (!queue.includes(item)) queue.push(item);

    setLoadingQueue(queue);
  };

  const endLoading = (item) => {
    const queue = [...loadingQueue];
    const index = queue.indexOf(item);
    queue.splice(index, 1);

    setLoadingQueue(queue);
  };

  useEffect(() => {
    setLoading(loadingQueue.length > 0);
  }, [loadingQueue]);

  return (
    <LoaderContext.Provider value={{ loading, startLoading, endLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};
