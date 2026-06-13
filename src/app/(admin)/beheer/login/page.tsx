"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { inputClass } from "@/components/admin/ui/FormField";
import { loginAction } from "./actions";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await loginAction(formData);
      if (result.ok) {
        router.push("/beheer");
        router.refresh();
      } else {
        setError(result.error ?? "Inloggen mislukt.");
      }
    });
  }

  return (
    <div className="a-login">
      <div className="a-login__card">
        <Image
          className="a-login__logo"
          src="/logo.png"
          alt="De Hinde"
          width={64}
          height={64}
          priority
        />
        <h1 className="a-login__title">Beheer De Hinde</h1>
        <p className="a-login__sub">welkom terug</p>

        <form className="a-login__form" onSubmit={onSubmit}>
          {error ? <div className="a-login__error">{error}</div> : null}

          <div className="a-field">
            <label className="a-field__label" htmlFor="email">
              E-mailadres
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={inputClass}
              placeholder="jij@dehinde.nl"
            />
          </div>

          <div className="a-field">
            <label className="a-field__label" htmlFor="password">
              Wachtwoord
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={inputClass}
              placeholder="••••••••"
            />
          </div>

          <AdminButton
            type="submit"
            variant="primary"
            disabled={pending}
            className="a-login__submit"
          >
            {pending ? "Bezig met inloggen…" : "Inloggen"}
          </AdminButton>
        </form>
      </div>
    </div>
  );
}
