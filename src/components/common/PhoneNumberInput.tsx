"use client";

import { useState, useMemo, useEffect } from 'react';
import { Input } from 'antd';
import { Icon } from "@iconify-icon/react";
import { FormatPhoneNumber } from '@/lib/format-phone-number';

export type onPhoneNumberInputChangeProps = {
  formatted: string;
  raw: string | undefined;
};

const PhoneNumberInput = ({
  onChange,
  onPressEnter,
  onChecking,
  disabled,
  value = '',
  placeholder
}: {
  onChange: ({ formatted, raw }: onPhoneNumberInputChangeProps) => void;
  onPressEnter: (v: any) => void;
  onChecking: (v: boolean) => void;
  disabled: boolean;
  value: string | undefined;
  placeholder?: string;
}) => {
  const [val, setVal] = useState<string | undefined>(value);
  const raw = useMemo(() => val?.replace(/\D/g, ''), [val]);
  const isValid = raw?.length === 9;

  

  useEffect(() => {
    onChecking(false);
  }, []);

  useEffect(() => {
    const { formatted } = FormatPhoneNumber(value);
    setVal(formatted);
  }, [value]);

  return (
    <>
      <Input
        size="large"
        placeholder={placeholder ?? "XXX XX XX XX"}
        prefix={<span>+251</span>}
        suffix={
          <Icon
            icon="ic:baseline-phone"
            className="text-gray-400"
            width={22}
            height={22}
          />
        }
        value={val}
        onChange={(e) => {
          const { formatted, raw } = FormatPhoneNumber(e.target.value);
          setVal(formatted);
          onChange({ formatted: `+251${raw}`, raw });
        }}
        onPressEnter={async () => {
          // await getUser({
          //   variables: { phoneNumber: `+251${raw}` },
          // });
          // check if the phone number is used or not.
        }}
        onKeyDown={(e: any) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        maxLength={12}
        status={isValid || raw?.length === 0 ? undefined : 'error'}
        disabled={disabled}
        allowClear
      />
    </>
  );
};

export default PhoneNumberInput;
