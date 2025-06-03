
import { Skeleton } from "@/components/ui/skeleton";

interface PageSkeletonProps {
  showHeader?: boolean;
  showStats?: boolean;
  showTabs?: boolean;
  cardCount?: number;
}

const PageSkeleton = ({ 
  showHeader = true, 
  showStats = false, 
  showTabs = false, 
  cardCount = 6 
}: PageSkeletonProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {showHeader && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32 mt-4 md:mt-0" />
        </div>
      )}
      
      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6 border">
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
      )}
      
      {showTabs && (
        <div className="mb-8">
          <div className="flex space-x-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-24" />
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(cardCount)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-4 w-full mb-4" />
            <div className="space-y-2 mb-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageSkeleton;
