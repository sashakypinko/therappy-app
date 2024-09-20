import { useCallback, useMemo } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

export type QueryParams = { [key: string]: string | number | symbol };

const useQuery = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const params = useMemo(() => {
    const params = new URLSearchParams(search);
    return Object.fromEntries(params);
  }, [search]);

  const setParams = useCallback((newParams: QueryParams) => {
    const oldParams: QueryParams = Object.fromEntries(new URLSearchParams(search));
    const paramsObject: QueryParams = { ...oldParams, ...newParams };

    const paramsArray = Object.entries(newParams).map(([name, value]) => {
      paramsObject[name] = value;
      return `${name}=${String(value)}`;
    });
    navigate(`${pathname}?${paramsArray.join('&')}`);
  }, [search, pathname]);

  return {
    params,
    setParams,
  };
};

export default useQuery;
