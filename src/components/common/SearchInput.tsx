"use client";

import { ReactNode, useEffect, useState } from "react";
import { AutoComplete, Spin } from "antd";
import { Icon } from "@iconify-icon/react";
import { useApiQuery } from "@/hooks/useApi";
import { LibraryBook, Student, Teacher } from "@/types";
import { SizeType } from "antd/es/config-provider/SizeContext";

export interface SearchInputProps {
  onSelect?: (value: any) => void;
  onClear?: () => void;
  placeholder?: string;
  apiRoute?: string;
  queryKeys: string[];
  suffixIcon?: ReactNode;
  allowClear?: boolean;
  incomingOptions?: any[];
  size?: SizeType
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
  size = "large"
}: SearchInputProps) => {
  const [options, setOptions] = useState<Student[] | Teacher[] | LibraryBook[]>(
    []
  );
  const [value, setValue] = useState("");

  const queryString = queryKeys
    .map((key) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  const route = apiRoute ?? "";
  const { data, isLoading, refetch } = useApiQuery<any[]>(
    [route, value],
    `${route}/search/?${queryString}`,
    false
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

  const getOptionLabel = (item: any) => {
    const parts = [item?.first_name, item?.middle_name, item?.last_name]
      .filter(Boolean)
      .join(" ");

    if (parts) return parts;
    if (item?.title) return item.title;
    if (item?.name) return item.name;
    return "";
  };

  return (
    <AutoComplete
      size={size}
      onSearch={async (value: string) => {
        setValue(value);
        if (!value.trim()) {
          setOptions([]);
        }
      }}
      onKeyDown={async (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          setOptions([]);
          if (value.trim()) {
            await refetch();
          }
        }
      }}
      onSelect={(_, option) => {
        onSelect?.(option?.data);
      }}
      onClear={() => onClear?.()}
      placeholder={placeholder}
      options={options.map((item: any) => {
        const label = getOptionLabel(item);
        return {
          value: label,
          label: <span>{label}</span>,
          data: item,
        };
      })}
      className="w-full"
      allowClear={allowClear}
      value={
        incomingOptions.length > 0
          ? getOptionLabel(incomingOptions[0])
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
