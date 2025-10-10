"use client";

import { Index as Branch } from "./branch";
import { Index as Setting } from "./setting";
import { Index as AY } from "./academicYear";
import { Index as School } from "./school";
import { useState } from "react";
import { Spin } from "antd";

export default function Home() {
  const [isLoading, setIsloading] = useState(false);

  return (
    <Spin spinning={isLoading}>
      <div className="bg-white rounded-md p-8 w-11/12 shadow-2xl">
        <School onLoading={setIsloading} />
        <AY onLoading={setIsloading} />
        <Setting onLoading={setIsloading} />
        <Branch onLoading={setIsloading} />
      </div>
    </Spin>
  );
}
