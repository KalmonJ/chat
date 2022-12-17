import { useForm } from "./../../hooks/useForm";

export const LoginForm = () => {
  const { handleChange, handleSubmit } = useForm({ email: "", password: "" });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 justify-center p-8 items-center shadow-login h-[500px] max-w-lg w-full rounded-md bg-header"
    >
      <input
        placeholder="email@example.com"
        onChange={handleChange}
        className="input-login"
        name="email"
      />
      <input
        placeholder="********"
        type="password"
        onChange={handleChange}
        className="input-login"
        name="password"
      />
      <button type="submit" className="button-login">
        Enter
      </button>
    </form>
  );
};
