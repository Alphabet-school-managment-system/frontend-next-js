"use client";

import { Card, Skeleton, Spin } from "antd";

export const BaseSkeleton = () => {
  return (
    <>
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
        {[...Array(10)].map((_, i) => (
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

      <div className="flex justify-start gap-4 mt-6">
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
    </>
  );
};

export function FormSkeleton() {
  return (
    <div className="flex h-screen bg-white p-1 m-4 rounded-md">
      <div className="rounded-sm p-8 w-full">
        <BaseSkeleton />
      </div>
    </div>
  );
}

export function DashboardSkeleton({ loading = true }) {
  return (
    <div className="flex flex-col justify-between">
      {/* Counts Skeleton */}
      <div className="flex flex-wrap gap-4 mb-4">
        {[1, 2, 3, 4].map((_, i) => (
          <Card key={i} className="flex-1 min-w-[150px]">
            <Skeleton active paragraph={{ rows: 1 }} loading={loading} />
          </Card>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
        <Card className="flex-1">
          <Skeleton
            active
            paragraph={{ rows: 6 }}
            title={{ width: "60%" }}
            loading={loading}
          />
        </Card>
        <Card className="flex-1">
          <Skeleton
            active
            paragraph={{ rows: 6 }}
            title={{ width: "60%" }}
            loading={loading}
          />
        </Card>
      </div>
    </div>
  );
}

export function AuthFormSkeleton() {
  return (
    <div className="flex items-center justify-center h-screen p-6">
      <Spin size="large" spinning />
    </div>
  );
}
