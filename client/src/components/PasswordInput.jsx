import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function PasswordInput({ name, value, onChange, placeholder, label }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      {label && (
        <label className="text-xs uppercase tracking-widest text-platine block mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete="new-password"
          className="input-luxury pr-12"
          placeholder={placeholder}
          required
        />
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-ivory/70 hover:text-platine transition-colors"
          aria-label={show ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          title={show ? 'Masquer' : 'Afficher'}
        >
          {show ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
