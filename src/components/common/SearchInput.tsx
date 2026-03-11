"use client";

import { ReactNode, useEffect, useState } from "react";
import { AutoComplete, Spin } from "antd";
import { Icon } from "@iconify-icon/react";
import { useApiQuery } from "@/hooks/useApi";
import { LibraryBook, Student, Teacher } from "@/types";

export interface SearchInputProps {
  onSelect?: (value: any) => void;
  onClear?: () => void;
  placeholder?: string;
  apiRoute?: string;
  queryKeys: string[];
  suffixIcon?: ReactNode;
  allowClear?: boolean;
  incomingOptions?: any[];
}

const SearchInput = ({
  onSelect,
  onClear,
  placeholder,
  apiRoute,
  queryKeys,
  suffixIcon,
  allowClear = true,
  incomingOptions = [],
}: SearchInputProps) => {
  const [options, setOptions] = useState<Student[] | Teacher[] | LibraryBook[]>(
    []
  );
  const [value, setValue] = useState("");
  const [enabled, setEnabled] = useState(false);

  const queryString = queryKeys
    .map((key) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  const route = apiRoute ?? "";
  const { data, isLoading } = useApiQuery<any[]>(
    [route],
    `${route}/search/?${queryString}`,
    enabled
  );

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setOptions(data);
    } else {
      setOptions([]);
    }
  }, [data]);

  useEffect(() => {
    setOptions(incomingOptions);
  }, []);

  return (
    <AutoComplete
      size="large"
      onSearch={async (value: string) => {
        setValue(value);
        if (!value.trim()) {
          setEnabled(false);
          setOptions([]);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (value.trim()) {
            setEnabled(true);
          } else {
            setEnabled(false);
          }
          setOptions([]);
        }
      }}
      onSelect={(_, option) => {
        onSelect?.(option?.data);
      }}
      onClear={() => onClear?.()}
      placeholder={placeholder}
      options={options.map((item: any) => {
        return {
          value: `${item.first_name} ${item.middle_name}`,
          label: <span>{`${item.first_name} ${item.middle_name}`}</span>,
          data: item,
        };
      })}
      className="w-full"
      allowClear={allowClear}
      value={
        incomingOptions.length > 0
          ? `${incomingOptions[0]?.first_name} ${incomingOptions[0]?.middle_name}`
          : undefined
      }
      prefix={
        <span className="flex items-center justify-center h-full">
          {isLoading ? (
            <Spin size="small" className="mr-4" />
          ) : (
            <Icon
              icon="material-symbols:search"
              className="text-gray-500"
              width={22}
              height={22}
            />
          )}
        </span>
      }
      suffixIcon={suffixIcon}
    />
  );
};

export default SearchInput;
