"use client";

import React, { useEffect, useState } from "react";
import { AutoComplete, Spin } from "antd";
import { Icon } from "@iconify-icon/react";
import { useApiQuery } from "@/hooks/useApi";

export interface UserSearchProps {
  onSelect?: (value: string) => void;
  placeholder?: string;
  apiRoute?: string;
}

const UserSearch = (props: UserSearchProps) => {
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [value, setValue] = useState("");
  const [enabled, setEnabled] = useState(false);

  const apiRoute = props?.apiRoute ?? "";
  const { data, isLoading } = useApiQuery<any[]>(
    [apiRoute],
    `${apiRoute}/search/?first_name=${value}&last_name=${value}`,
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
      onSelect={(value) => props.onSelect?.(value)}
      placeholder={props?.placeholder}
      options={options.map((item: any) => ({
        value: `${item.first_name} ${item.last_name}`,
        label: <span>{`${item.first_name} ${item.last_name}`}</span>,
      }))}
      className="w-full"
      allowClear
      prefix={
        <span className="flex items-center justify-center h-full">
          {isLoading ? (
            <Spin size="small" className="mr-4" />
          ) : (
            <Icon
              icon="material-symbols:search"
              className="text-gray-800"
              width={22}
              height={22}
            />
          )}
        </span>
      }
    />
  );
};

export default UserSearch;
