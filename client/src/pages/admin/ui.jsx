export function AdminFormField({ label, children, required }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-platine block mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

export const inputCls =
  'w-full bg-noir-light border border-ivory/20 px-4 py-3 text-ivory text-sm focus:outline-none focus:border-platine';
