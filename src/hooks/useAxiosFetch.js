import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setTimeout(() => setIsLoading(false), 2000);
      }
    };

    fetchData(dataUrl);
  }, [dataUrl]);

  return { data, fetchError, isLoading };
};

export default useAxiosFetch;
