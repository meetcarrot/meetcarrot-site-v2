"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { VERTICALS } from "@/data/verticals";

/**
 * Where the intake submission goes. Set `NEXT_PUBLIC_INTAKE_ENDPOINT` to a URL
 * that accepts a JSON POST and the form submits directly to it.
 *
 * With no endpoint configured the form falls back to opening a pre-filled email
 * to support@meetcarrot.xyz — that keeps the page useful before a backend
 * exists, and it never silently swallows a lead.
 */
const INTAKE_ENDPOINT = process.env.NEXT_PUBLIC_INTAKE_ENDPOINT;
const SUPPORT_EMAIL = "support@meetcarrot.xyz";

const FIELD_CLASS =
  "w-full h-12 rounded-2xl border border-black/10 bg-white px-4 text-[16px] leading-[1.33] placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/80 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 transition duration-200 ease-in-out";
const LABEL_CLASS = "block text-[14px] font-medium mb-2";

type Status = "idle" | "submitting" | "sent" | "error";

interface Fields {
  business: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  city: string;
  message: string;
}

const EMPTY: Fields = {
  business: "",
  name: "",
  email: "",
  phone: "",
  category: "hospitality",
  city: "",
  message: "",
};

function mailtoFallback(fields: Fields) {
  const body = [
    `Business: ${fields.business}`,
    `Contact: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone || "—"}`,
    `Category: ${fields.category}`,
    `City: ${fields.city}`,
    "",
    fields.message,
  ].join("\n");

  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    `Carrot enrollment — ${fields.business}`,
  )}&body=${encodeURIComponent(body)}`;
}

export function IntakeForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!INTAKE_ENDPOINT) {
      window.location.href = mailtoFallback(fields);
      setStatus("sent");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(INTAKE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!response.ok) throw new Error(`Intake failed: ${response.status}`);
      setStatus("sent");
      setFields(EMPTY);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-white rounded-4xl p-8 lg:p-10 text-center">
        <p className="font-poly-sans-wide text-[28px] leading-[1.3]! mb-3">
          Thanks — we&rsquo;ll be in touch.
        </p>
        <p className="text-[16px] leading-[1.33] text-gray-600">
          Someone from the Carrot team will reach out shortly to get your offer
          set up.
        </p>
      </div>
    );
  }

  return (
    <form className="bg-white rounded-4xl p-6 lg:p-10" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <div>
          <label className={LABEL_CLASS} htmlFor="business">
            Business name
          </label>
          <input
            className={FIELD_CLASS}
            id="business"
            name="business"
            autoComplete="organization"
            required
            value={fields.business}
            onChange={(event) => update("business", event.target.value)}
          />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="name">
            Your name
          </label>
          <input
            className={FIELD_CLASS}
            id="name"
            name="name"
            autoComplete="name"
            required
            value={fields.name}
            onChange={(event) => update("name", event.target.value)}
          />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="email">
            Email
          </label>
          <input
            className={FIELD_CLASS}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={fields.email}
            onChange={(event) => update("email", event.target.value)}
          />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="phone">
            Phone <span className="text-gray-600 font-normal">(optional)</span>
          </label>
          <input
            className={FIELD_CLASS}
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={(event) => update("phone", event.target.value)}
          />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="category">
            Business type
          </label>
          <select
            className={FIELD_CLASS}
            id="category"
            name="category"
            value={fields.category}
            onChange={(event) => update("category", event.target.value)}
          >
            {Object.values(VERTICALS).map((vertical) => (
              <option key={vertical.slug} value={vertical.slug}>
                {vertical.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="city">
            City
          </label>
          <input
            className={FIELD_CLASS}
            id="city"
            name="city"
            autoComplete="address-level2"
            required
            value={fields.city}
            onChange={(event) => update("city", event.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 lg:mt-6">
        <label className={LABEL_CLASS} htmlFor="message">
          Anything else?{" "}
          <span className="text-gray-600 font-normal">(optional)</span>
        </label>
        <textarea
          className={`${FIELD_CLASS} h-32 py-3 resize-y`}
          id="message"
          name="message"
          value={fields.message}
          onChange={(event) => update("message", event.target.value)}
        />
      </div>

      {status === "error" ? (
        <p className="mt-4 text-[14px] text-red" role="alert">
          Something went wrong sending that. Email us at{" "}
          <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>{" "}
          and we&rsquo;ll pick it up from there.
        </p>
      ) : null}

      <div className="mt-8 w-70 max-w-full">
        <Button type="submit" variant="primary" size="default" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Get started"}
        </Button>
      </div>
    </form>
  );
}
