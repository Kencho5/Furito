type AuthFormProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
  title: string;
  titleSub: string;
};

export function AuthForm({
  onSubmit,
  children,
  title,
  titleSub,
}: AuthFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="relative flex w-full max-w-[550px] flex-col gap-6 overflow-hidden rounded-3xl bg-white px-4 py-8 shadow-sm sm:px-10"
    >
      <div className="absolute -right-14 -top-20 -z-0 h-24 w-40 rounded-full bg-yellow-400 opacity-40 blur-3xl"></div>
      <div className="absolute -top-20 left-1/3 -z-0 h-24 w-40 rounded-full bg-orange-400 opacity-40 blur-3xl"></div>
      <div className="absolute -left-14 -top-20 -z-0 h-24 w-60 rounded-full bg-pink-400 opacity-40 blur-3xl"></div>

      <div className="z-10 flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        <p className="font-normal text-neutral-500">{titleSub}</p>
      </div>

      {children}
    </form>
  );
}
