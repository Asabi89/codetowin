import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import Button from "../../components/common/Button";
import { useToast } from "../../context/ToastContext";
import "../../styles/pages/auth/login.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      showToast("Les mots de passe ne correspondent pas.", "error");
      return;
    }
    showToast("Mot de passe réinitialisé avec succès.", "success");
    navigate("/login");
  };

  return (
    <div className="login-page-wrapper">
      <div className="auth-container">
        <div className="brand-header">
          <Link to="/" className="auth-link text-2xl font-extrabold">CodeToWin</Link>
          <h1 className="auth-title">Nouveau mot de passe</h1>
          <p className="auth-subtitle">
            Choisis un mot de passe solide pour sécuriser ton compte CodeToWin.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nouveau mot de passe</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                className="form-input pl-10"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Confirmation</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                className="form-input pl-10"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
          </div>
          <Button type="submit" className="w-full">Réinitialiser</Button>
        </form>
      </div>
    </div>
  );
}
