import { LoadingDots } from "../ui/LoadingDots";

type SkeletonProps = {
  width: string;
  height: string;
};

export function AuthSkeleton({ width, height }: SkeletonProps) {
  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className="flex items-center justify-center rounded-3xl bg-white shadow-sm"
    >
      <LoadingDots />
    </div>
  );
}
