import { BiSearch } from "react-icons/bi";
import { Input } from "../../Input";
import { Poppins } from "../../Text";
import React, { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { convertQueryParamsToObject } from "../../../helper";

export const Brand = () => {
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
      <div className="flex items-center gap-6">
        <Poppins className="text-xl text-white font-semibold">
          LMS HIMTI UMT
        </Poppins>
        <div className="w-64">
          <Input
            placeholder="Apa yang ingin dipelajari?"
            LeftIcon={<BiSearch className="text-blue-gray-400 text-lg" />}
            inputSize="sm"
            rounded="md"
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};
