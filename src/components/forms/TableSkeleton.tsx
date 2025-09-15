"use client";

import { Skeleton } from "antd";

export default function TableSkeleton() {
  return (
    <div className="p-6 bg-white rounded-md h-screen space-y-6">
      <div className="flex space-x-4">
        <Skeleton.Input
          active
          size="large"
          className="flex-3 !w-full"
          style={{ flex: 3 }}
        />
        <Skeleton.Button
          active
          size="large"
          className="flex-1 !w-full"
          style={{ flex: 1 }}
        />
      </div>

      <div className="flex space-x-3 mb-3">
        <Skeleton.Input active size="large" className="flex-1 !w-full" />
        <Skeleton.Input active size="large" className="flex-1 !w-full" />
        <Skeleton.Input active size="large" className="flex-1 !w-full" />
        <Skeleton.Input active size="large" className="flex-1 !w-full" />
      </div>

      {/* Table body skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex space-x-3">
            <Skeleton.Input active size="default" className="flex-1 !w-full" />
            <Skeleton.Input active size="default" className="flex-1 !w-full" />
            <Skeleton.Input active size="default" className="flex-1 !w-full" />
            <Skeleton.Input active size="default" className="flex-1 !w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
