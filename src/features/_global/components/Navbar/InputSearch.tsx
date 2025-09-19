import React, { useCallback, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import { convertQueryParamsToObject } from "../../helper";
import { Input } from "../Input";

export const InputSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queries = convertQueryParamsToObject(searchParams.toString());
  const querySearch = searchParams.get("qs");

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchParams({
        ...queries,
        qs: e.target.value,
      });
    },
    [queries, setSearchParams]
  );

  useEffect(() => {
    if (!querySearch) {
      const { qs, ...rest } = queries;
      qs?.toString();
      setSearchParams({
        ...rest,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [querySearch]);
  return (
    <>
      <div className="lg:w-64 w-max">
        <Input
          placeholder="Apa yang ingin dipelajari?"
          LeftIcon={<BiSearch className="text-blue-gray-400 text-lg" />}
          inputSize="sm"
          rounded="md"
          onChange={onChange}
        />
      </div>
    </>
  );
};
