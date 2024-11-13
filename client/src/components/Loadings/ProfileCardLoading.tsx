export const ProfileCardLoading = () => {
  return (
    <div className="mt-4 flex w-full animate-pulse flex-col flex-wrap items-center justify-center gap-4 rounded-lg bg-slate-200 p-2">
      <div className="mx-auto h-16 w-16 animate-pulse rounded-full bg-slate-300"></div>
      <div className="h-4 w-28 max-w-full animate-pulse bg-slate-300"></div>
      <div className="h-6 w-20 max-w-full animate-pulse bg-slate-300"></div>
      <div className="h-4 w-28 max-w-full animate-pulse bg-slate-300"></div>
    </div>
  );
};
