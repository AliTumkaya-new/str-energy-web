"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, type ReactNode, useCallback, useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, FileSpreadsheet, Mail, ShieldCheck, Sparkles } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";

const content = {
  tr: {
    title: "STR CBAM Export hesabınızı oluşturun",
    description:
      "Ürün emisyon verinizi analiz etmek, çalışma alanı oluşturmak ve CBAM dosyalarınızı yönetmek için giriş yapın.",
    google: "Google ile devam et",
    email: "E-posta ile devam et",
    placeholder: "ad@firma.com",
    submit: "Hesap oluştur",
    loading: "Hesap hazırlanıyor",
    error: "Giriş başlatılamadı. Lütfen e-posta adresinizi kontrol edin.",
    googleConfigError:
      "Google girişi için OAuth ayarları eksik. .env.local içine GOOGLE_CLIENT_ID ve GOOGLE_CLIENT_SECRET değerlerini ekleyin.",
    googleCancelled: "Google girişi iptal edildi.",
    googleStateError: "Google oturumu doğrulanamadı. Lütfen tekrar deneyin.",
    googleProfileError: "Google hesabınızdan doğrulanmış e-posta bilgisi alınamadı.",
    googleTokenError: "Google ile bağlantı kurulamadı. Lütfen tekrar deneyin.",
    free: "3 ücretsiz analiz hakkı",
    freeDetail: "İlk üç dosya yükleme ve analiz ücretsizdir. Sonraki analizler ücretli plana geçiş ister.",
    secure: "Kurumsal ürün erişimi",
    secureDetail: "Oturum HttpOnly çerez ile korunur; analiz hakkı server tarafında takip edilir.",
    back: "Ürün sayfasına dön",
    bullets: ["Excel, CSV ve metin tabanlı PDF yükleme", "Ürün ve veri kaynaklarını otomatik çıkarma", "CBAM için paylaşılabilir analiz çıktısı"],
  },
  en: {
    title: "Create your STR CBAM Export account",
    description: "Sign in to analyze product emissions data, create a workspace, and manage CBAM dossiers.",
    google: "Continue with Google",
    email: "Continue with email",
    placeholder: "name@company.com",
    submit: "Create account",
    loading: "Preparing account",
    error: "Sign-in could not be started. Please check your email address.",
    googleConfigError: "Google OAuth is not configured. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env.local.",
    googleCancelled: "Google sign-in was cancelled.",
    googleStateError: "Google session could not be verified. Please try again.",
    googleProfileError: "A verified email address could not be read from your Google account.",
    googleTokenError: "Google sign-in could not be completed. Please try again.",
    free: "3 free analyses",
    freeDetail: "The first three file uploads and analyses are free. Further analyses require a paid plan.",
    secure: "Product access",
    secureDetail: "The session is protected with an HttpOnly cookie; analysis credits are tracked server-side.",
    back: "Back to product page",
    bullets: ["Excel, CSV, and text-based PDF upload", "Automatic product and source extraction", "Shareable analysis output for CBAM"],
  },
} as const;

export default function CbamAuthGate({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const text = content[language === "en" ? "en" : "tr"];
  const isDark = theme === "dark";
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<"email" | "google" | "">("");
  const [error, setError] = useState("");

  const oauthErrorMessage = useCallback((code: string | null) => {
    if (code === "google_config") return text.googleConfigError;
    if (code === "google_cancelled") return text.googleCancelled;
    if (code === "google_state") return text.googleStateError;
    if (code === "google_profile") return text.googleProfileError;
    if (code === "google_token") return text.googleTokenError;
    return text.error;
  }, [text]);

  useEffect(() => {
    let active = true;

    async function verifySession() {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 6000);
      const authError =
        typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("authError");
      if (authError) {
        setError(oauthErrorMessage(authError));
        const params = new URLSearchParams(window.location.search);
        params.delete("authError");
        const cleanUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}${window.location.hash}`;
        window.history.replaceState(null, "", cleanUrl);
      }

      const response = await fetch("/api/cbam/session", {
        cache: "no-store",
        credentials: "same-origin",
        signal: controller.signal,
      }).catch(() => null);
      const payload = await response?.json().catch(() => null);
      window.clearTimeout(timeout);

      if (!active) return;
      setAuthenticated(Boolean(payload?.authenticated));
      setChecking(false);
    }

    void verifySession();
    return () => {
      active = false;
    };
  }, [oauthErrorMessage]);

  async function startEmailSession(nextEmail?: string) {
    setLoading("email");
    setError("");

    const response = await fetch("/api/cbam/session", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider: "email",
        email: nextEmail,
        remember: true,
      }),
    }).catch(() => null);

    if (!response?.ok) {
      setError(text.error);
      setLoading("");
      return;
    }

    setAuthenticated(true);
    setLoading("");
  }

  function startGoogleSession() {
    setLoading("google");
    setError("");
    const returnTo =
      typeof window === "undefined"
        ? withLocale("/platform/cbam")
        : `${window.location.pathname}${window.location.search}${window.location.hash}`;
    window.location.assign(`/api/cbam/google/start?returnTo=${encodeURIComponent(returnTo)}`);
  }

  function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void startEmailSession(email);
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f5f6] text-zinc-900 dark:bg-black dark:text-white">
        <div className="flex flex-col items-center">
          <Image src="/str-logo0.png" alt="STR Energy" width={54} height={54} className="h-11 w-auto" priority />
          <div className="mt-5 h-1 w-36 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-orange-500" />
          </div>
          <div className="mt-3 text-xs font-medium text-zinc-500">Oturum doğrulanıyor</div>
        </div>
      </div>
    );
  }

  if (authenticated) return children;

  return (
    <main className={`cbam-platform min-h-screen ${isDark ? "bg-black text-white" : "bg-[#f4f5f6] text-zinc-900"}`}>
      <div className="mx-auto grid min-h-screen max-w-6xl place-items-center px-5 py-10">
        <section className={`grid w-full overflow-hidden rounded-md border shadow-sm lg:grid-cols-[minmax(0,0.95fr)_minmax(390px,0.75fr)] ${isDark ? "border-white/10 bg-zinc-950" : "border-black/10 bg-white"}`}>
          <div className="p-6 sm:p-9 lg:p-12">
            <Link href={withLocale("/products/cbam")} className="inline-flex items-center gap-3">
              <Image src="/str-logo0.png" alt="STR Energy" width={38} height={38} className="h-8 w-auto" priority />
              <span>
                <span className="block text-sm font-semibold">STR CBAM Export</span>
                <span className="mt-0.5 block text-xs text-zinc-500">CBAM veri yönetimi</span>
              </span>
            </Link>

            <div className="mt-12 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-md border border-orange-500/25 bg-orange-500/10 px-3 py-2 text-xs font-semibold text-orange-600 dark:text-orange-400">
                <Sparkles className="h-3.5 w-3.5" />
                {text.free}
              </div>
              <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-5xl">{text.title}</h1>
              <p className={`mt-4 max-w-xl text-base leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                {text.description}
              </p>

              <div className="mt-8 grid gap-3">
                {text.bullets.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span className={isDark ? "text-zinc-300" : "text-zinc-700"}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className={`border-t p-6 sm:p-9 lg:border-l lg:border-t-0 ${isDark ? "border-white/10 bg-white/[0.025]" : "border-black/10 bg-zinc-50"}`}>
            <button
              type="button"
              onClick={startGoogleSession}
              disabled={Boolean(loading)}
              className={`flex h-12 w-full items-center justify-center gap-3 rounded-md border text-sm font-semibold transition-colors ${isDark ? "border-white/10 bg-black hover:bg-white/5" : "border-black/10 bg-white hover:bg-zinc-50"}`}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold text-zinc-900">G</span>
              {loading === "google" ? text.loading : text.google}
            </button>

            <div className="my-5 flex items-center gap-3 text-xs text-zinc-500">
              <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
              {text.email}
              <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
            </div>

            <form onSubmit={submitEmail}>
              <label className="block">
                <span className="sr-only">{text.email}</span>
                <div className={`flex h-12 items-center gap-3 rounded-md border px-3 focus-within:border-orange-500 ${isDark ? "border-white/10 bg-black" : "border-black/10 bg-white"}`}>
                  <Mail className="h-4 w-4 shrink-0 text-zinc-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={text.placeholder}
                    required
                    autoComplete="email"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
                  />
                </div>
              </label>

              {error && <div className="mt-4 border-l-2 border-rose-500 bg-rose-500/10 px-4 py-3 text-sm text-rose-600 dark:text-rose-400">{error}</div>}

              <button
                type="submit"
                disabled={Boolean(loading)}
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-5 text-sm font-semibold text-black hover:bg-orange-400 disabled:cursor-wait disabled:opacity-65"
              >
                {loading === "email" ? text.loading : text.submit}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <div className={`mt-6 rounded-md border p-4 ${isDark ? "border-white/10 bg-black" : "border-black/10 bg-white"}`}>
              <div className="flex items-start gap-3">
                <FileSpreadsheet className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                <div>
                  <div className="text-sm font-semibold">{text.free}</div>
                  <p className={`mt-1 text-sm leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{text.freeDetail}</p>
                </div>
              </div>
            </div>

            <div className={`mt-4 flex items-start gap-3 text-xs ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <div>
                <strong className={isDark ? "text-zinc-300" : "text-zinc-700"}>{text.secure}</strong>
                <span className="ml-1">{text.secureDetail}</span>
              </div>
            </div>

            <Link href={withLocale("/products/cbam")} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-400">
              {text.back}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </section>
      </div>
    </main>
  );
}
