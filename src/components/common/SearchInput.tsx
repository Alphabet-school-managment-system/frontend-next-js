"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { AutoComplete, Spin } from "antd";
import { Icon } from "@iconify-icon/react";
import { useApiQuery } from "@/hooks/useApi";

export interface SearchInputProps {
  onSelect?: (value: any) => void;
  onClear?: () => void;
  placeholder?: string;
  apiRoute?: string;
  queryKeys: string[];
  suffixIcon?: ReactNode;
  allowClear?: boolean;
}

const SearchInput = ({
  onSelect,
  onClear,
  placeholder,
  apiRoute,
  queryKeys,
  suffixIcon,
  allowClear = true,
}: SearchInputProps) => {
  const [options, setOptions] = useState<{ value: string }[]>([]);
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
      options={options.map((item: any) => ({
        value: `${item.first_name} ${item.last_name}`,
        label: <span>{`${item.first_name} ${item.last_name}`}</span>,
        data: item,
      }))}
      className="w-full"
      allowClear={allowClear}
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
