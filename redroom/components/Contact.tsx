"use client";

import { useState, type FormEvent } from "react";

type ProjectType = "Residential" | "Commercial" | "Hospitality" | "Other";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<ProjectType>("Residential");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // In production, post to a server action or API route.
    setSubmitted(true);
  }

  return (
    <section id="contact" className="border-ink-900/10 dark:border-bone-50/10 border-t">
      <div className="mx-auto max-w-360 px-6 py-20 sm:px-12 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left */}
          <div>
            <p className="reveal label">(09) - Contact</p>
            <h2 className="reveal d1 section-title mt-8">
              Tell us about
              <br />
              your <span className="text-burgundy-600 dark:text-burgundy-300 font-light italic">project.</span>
            </h2>
            <p className="reveal d2 text-body-lg text-ink-500 dark:text-bone-50/70 mt-8 max-w-md">
              We respond within two working days. For urgent jobs, call directly.
            </p>
            <ul className="reveal d2 text-caption tracking-label text-ink-700 dark:text-bone-50/80 mt-12 space-y-3">
              <li>
                <a href="mailto:hello@redroom.se" className="hover:text-burgundy-600 dark:hover:text-burgundy-300">
                  HELLO@REDROOM.SE
                </a>
              </li>
              <li>
                <a href="tel:+4680000000" className="hover:text-burgundy-600 dark:hover:text-burgundy-300">
                  +46 8 000 00 00
                </a>
              </li>
              <li>STOCKHOLM</li>
            </ul>
          </div>

          {/* Right - form card */}
          <div className="reveal d1 bg-bone-100 ring-ink-900/10 dark:ring-bone-50/10 rounded-3xl p-8 ring-1 sm:p-10 dark:bg-[#16140F]">
            {submitted ? (
              <div className="flex h-full min-h-[420px] flex-col items-start justify-center">
                <p className="label">- Received</p>
                <p className="text-h4 mt-6 font-medium tracking-tight">Thanks, {name || "we"}&rsquo;ll be in touch.</p>
                <p className="text-body text-ink-500 dark:text-bone-50/60 mt-4 max-w-md">
                  We&rsquo;ll come back to you within two working days. For urgent jobs, call directly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div>
                  <label htmlFor="name" className="field-label">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="field"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="field-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="field"
                  />
                </div>

                <div>
                  <label htmlFor="type" className="field-label">
                    Project type
                  </label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value as ProjectType)}
                    className="field cursor-pointer appearance-none"
                  >
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Hospitality</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="field-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the space, scope, and timing."
                    className="field resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Send enquiry <span className="arrow">→</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
