"use client";

import { Skeleton } from "antd";

export default function FormSkeleton() {
  return (
    <div className="p-6 bg-white rounded-md !h-screen">
      <div className="mb-4">
        <Skeleton.Input
          active
          size="large"
          style={{ width: 250, height: 24 }}
        />
        <div className="mt-2">
          <Skeleton.Input
            active
            size="large"
            style={{ width: 400, height: 14 }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton.Input
              active
              size="large"
              style={{ width: 120, height: 16 }}
            />
            <Skeleton.Input active style={{ width: "100%", height: 40 }} />
          </div>
        ))}

        <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
          <Skeleton.Input
            active
            size="large"
            style={{ width: 120, height: 16 }}
          />
          <Skeleton.Input active style={{ width: "100%", height: 80 }} />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Skeleton.Button
          active
          style={{ width: 100, height: 40 }}
          size="large"
        />
        <Skeleton.Button
          active
          style={{ width: 120, height: 40 }}
          size="large"
        />
      </div>
    </div>
  );
}
