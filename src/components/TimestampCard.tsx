import { formatTimestamp } from "@/lib/utils";

interface TimestampCardProps {
  timestamp: number;
  title?: string;
}

export default function TimestampCard({
  timestamp,
  title = "Creation Timestamp",
}: TimestampCardProps) {
  const { unix, iso, local } = formatTimestamp(timestamp);

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
      <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
        {title}
      </h4>
      <dl className="space-y-2 text-sm">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
          <dt className="w-24 shrink-0 font-medium text-gray-500 dark:text-gray-400">
            Unix Time
          </dt>
          <dd className="font-mono text-gray-900 dark:text-gray-100">{unix}</dd>
        </div>
        <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
          <dt className="w-24 shrink-0 font-medium text-gray-500 dark:text-gray-400">
            UTC
          </dt>
          <dd className="font-mono text-gray-900 dark:text-gray-100">{iso}</dd>
        </div>
        <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
          <dt className="w-24 shrink-0 font-medium text-gray-500 dark:text-gray-400">
            Local Time
          </dt>
          <dd className="text-gray-900 dark:text-gray-100">{local}</dd>
        </div>
      </dl>
    </div>
  );
}
