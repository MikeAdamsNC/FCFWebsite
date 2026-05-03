import type { ReactNode } from "react";

type BaseProps = {
  label: string;
  name: string;
  help?: string;
  full?: boolean;
};

export function TextField({
  label,
  name,
  defaultValue,
  help,
  full,
  type = "text",
  required,
  placeholder,
}: BaseProps & { defaultValue?: string | number; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div className={"admin-field" + (full ? " full" : "")}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        placeholder={placeholder}
      />
      {help && <span className="help">{help}</span>}
    </div>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  help,
  full,
  rows = 4,
  placeholder,
}: BaseProps & { defaultValue?: string; rows?: number; placeholder?: string }) {
  return (
    <div className={"admin-field" + (full ? " full" : "")}>
      <label htmlFor={name}>{label}</label>
      <textarea id={name} name={name} rows={rows} defaultValue={defaultValue ?? ""} placeholder={placeholder} />
      {help && <span className="help">{help}</span>}
    </div>
  );
}

export function SelectField({
  label,
  name,
  defaultValue,
  options,
  help,
  full,
}: BaseProps & { defaultValue?: string; options: { value: string; label: string }[] }) {
  return (
    <div className={"admin-field" + (full ? " full" : "")}>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} defaultValue={defaultValue}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {help && <span className="help">{help}</span>}
    </div>
  );
}

export function FieldRow({ children }: { children: ReactNode }) {
  return <div className="admin-grid">{children}</div>;
}
