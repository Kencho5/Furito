import { LoadingDots } from "../ui/LoadingDots";

type SkeletonProps = {
  width: string;
  height: string;
};

export function AuthSkeleton({ width, height }: SkeletonProps) {
  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className="relative flex items-center justify-center overflow-hidden rounded-3xl bg-white shadow-sm"
    >
      <div className="absolute -right-14 -top-20 -z-0 h-24 w-40 rounded-full bg-yellow-400 opacity-40 blur-3xl"></div>
      <div className="absolute -top-20 left-1/3 -z-0 h-24 w-40 rounded-full bg-orange-400 opacity-40 blur-3xl"></div>
      <div className="absolute -left-14 -top-20 -z-0 h-24 w-60 rounded-full bg-pink-400 opacity-40 blur-3xl"></div>

      <LoadingDots />
    </div>
  );
}
