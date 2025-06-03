
import { Skeleton } from "@/components/ui/skeleton";

interface FormSkeletonProps {
  fields?: number;
  showTitle?: boolean;
  showDescription?: boolean;
}

const FormSkeleton = ({ 
  fields = 3, 
  showTitle = true, 
  showDescription = true 
}: FormSkeletonProps) => {
  return (
    <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-sm">
      <div className="text-center">
        <Skeleton className="h-12 w-12 rounded-full mx-auto mb-4" />
        {showTitle && <Skeleton className="h-8 w-48 mx-auto mb-2" />}
        {showDescription && <Skeleton className="h-4 w-64 mx-auto" />}
      </div>
      
      <div className="space-y-6">
        {[...Array(fields)].map((_, i) => (
          <div key={i}>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </div>
    </div>
  );
};

export default FormSkeleton;
