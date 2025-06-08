
import { Skeleton } from "@/components/ui/skeleton";

const InterviewCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 h-full">
      <div className="flex justify-between items-start mb-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-4 w-full mb-4" />
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-28" />
      </div>
      <Skeleton className="h-2 w-full mb-2" />
      <div className="flex justify-end">
        <Skeleton className="h-4 w-8" />
      </div>
      <Skeleton className="h-10 w-full mt-4" />
    </div>
  );
};

export default InterviewCardSkeleton;
