import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import Button from "../../components/common/Button";
import { useToast } from "../../context/ToastContext";
import "../../styles/pages/auth/login.css";

export default function ForgotPassword() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    showToast(`Lien de réinitialisation envoyé à ${email || "votre adresse email"}.`, "success");
  };

  return (
    <div className="login-page-wrapper">
      <div className="auth-container">
        <div className="brand-header">
          <Link to="/" className="auth-link text-2xl font-extrabold">CodeToWin</Link>
          <h1 className="auth-title">Mot de passe oublié</h1>
          <p className="auth-subtitle">
            Entre ton email, nous t’enverrons un lien sécurisé pour réinitialiser ton mot de passe.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                className="form-input pl-10"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="nom@exemple.com"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">Envoyer le lien</Button>
        </form>

        <p className="auth-footer">
          Tu as retrouvé ton accès ? <Link to="/login" className="auth-link">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
