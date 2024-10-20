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
      className="flex w-full max-w-[550px] flex-col gap-6 rounded-3xl bg-white px-10 py-8 shadow-sm"
    >
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="font-normal text-neutral-500">{titleSub}</p>
      </div>

      {children}
    </form>
  );
}
