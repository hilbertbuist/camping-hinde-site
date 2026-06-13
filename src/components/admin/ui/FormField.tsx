import type { ReactNode } from "react";

/**
 * Shared className for inputs / selects / textareas across the admin.
 * Maps to the `.a-input` rule defined in admin-theme.css.
 */
export const inputClass = "a-input";

type FormFieldProps = {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: ReactNode;
};

export function FormField({ label, htmlFor, hint, children }: FormFieldProps) {
  return (
    <div className="a-field">
      <label className="a-field__label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint ? <span className="a-field__hint">{hint}</span> : null}
    </div>
  );
}

export default FormField;
