import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Teachers' Day | Shuvangi Ma'am" },
      { name: "description", content: "A quiet Teachers' Day tribute for Shuvangi Ma'am." },
      { property: "og:title", content: "Happy Teachers' Day | Shuvangi Ma'am" },
      { property: "og:description", content: "A quiet Teachers' Day tribute for Shuvangi Ma'am." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

interface PetalProps {
  left: string;
  size: number;
  duration: number;
  delay: number;
  swayDuration: number;
  tint: string;
  className?: string;
}

function Petal({ left, size, duration, delay, swayDuration, tint, className }: PetalProps) {
  return (
    <div
      className={`pointer-events-none absolute top-0 will-change-transform ${className ?? ""}`}
      style={{
        left,
        animation: `tribute-petal-fall ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div
        className="will-change-transform"
        style={{
          width: size,
          height: size * 0.72,
          opacity: 0.85,
          borderRadius: "62% 38% 58% 42% / 60% 55% 45% 40%",
          background: `radial-gradient(circle at 30% 25%, ${tint}, color-mix(in oklab, var(--petaldeep) 70%, transparent) 72%, transparent)`,
          animation: `tribute-sway ${swayDuration}s ease-in-out infinite`,
          animationDelay: `${delay / 2}s`,
        }}
      />
    </div>
  );
}

function PetalLayer({
  petals,
  opacity,
  layerRef,
}: {
  petals: PetalProps[];
  opacity: number;
  layerRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={layerRef}
      className="pointer-events-none absolute inset-0 will-change-transform"
      style={{ opacity }}
    >
      {petals.map((petal, index) => (
        <Petal key={index} {...petal} />
      ))}
    </div>
  );
}

const nearPetals: PetalProps[] = [
  {
    left: "8%",
    size: 24,
    duration: 15,
    delay: 0.4,
    swayDuration: 8,
    tint: "var(--petal-highlight)",
  },
  {
    left: "30%",
    size: 20,
    duration: 18,
    delay: 3.2,
    swayDuration: 10,
    tint: "var(--petal)",
    className: "hidden sm:block",
  },
  {
    left: "58%",
    size: 26,
    duration: 13,
    delay: 1.6,
    swayDuration: 7,
    tint: "var(--petal-highlight)",
  },
  {
    left: "80%",
    size: 22,
    duration: 16,
    delay: 5.4,
    swayDuration: 9,
    tint: "var(--petal)",
    className: "hidden sm:block",
  },
  {
    left: "92%",
    size: 18,
    duration: 20,
    delay: 2.4,
    swayDuration: 11,
    tint: "var(--petal)",
  },
];

const midPetals: PetalProps[] = [
  {
    left: "18%",
    size: 14,
    duration: 24,
    delay: 1.1,
    swayDuration: 13,
    tint: "var(--petal)",
  },
  {
    left: "44%",
    size: 12,
    duration: 27,
    delay: 6.5,
    swayDuration: 14,
    tint: "var(--petal-highlight)",
    className: "hidden sm:block",
  },
  {
    left: "68%",
    size: 15,
    duration: 22,
    delay: 4.2,
    swayDuration: 12,
    tint: "var(--petal)",
  },
  {
    left: "86%",
    size: 11,
    duration: 29,
    delay: 8.4,
    swayDuration: 15,
    tint: "var(--petal)",
    className: "hidden sm:block",
  },
];

const farPetals: PetalProps[] = [
  {
    left: "14%",
    size: 9,
    duration: 34,
    delay: 2.8,
    swayDuration: 17,
    tint: "var(--petal)",
  },
  {
    left: "38%",
    size: 8,
    duration: 38,
    delay: 9.1,
    swayDuration: 19,
    tint: "var(--petal)",
    className: "hidden sm:block",
  },
  {
    left: "62%",
    size: 9,
    duration: 32,
    delay: 5.7,
    swayDuration: 18,
    tint: "var(--petal-highlight)",
  },
  {
    left: "82%",
    size: 7,
    duration: 40,
    delay: 12,
    swayDuration: 20,
    tint: "var(--petal)",
    className: "hidden sm:block",
  },
];

function Index() {
  const [mounted, setMounted] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ambientRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    let rafId = 0;
    let targetY = 0;
    let currentY = 0;
    let isTicking = false;

    const updateParallax = () => {
      currentY += (targetY - currentY) * 0.12;

      if (ambientRef.current) {
        ambientRef.current.style.transform = `translate3d(0, ${(currentY * 0.04).toFixed(1)}px, 0)`;
      }
      if (farRef.current) {
        farRef.current.style.transform = `translate3d(0, ${(currentY * 0.05).toFixed(1)}px, 0)`;
      }
      if (midRef.current) {
        midRef.current.style.transform = `translate3d(0, ${(currentY * 0.11).toFixed(1)}px, 0)`;
      }
      if (nearRef.current) {
        nearRef.current.style.transform = `translate3d(0, ${(currentY * 0.2).toFixed(1)}px, 0)`;
      }

      if (Math.abs(targetY - currentY) > 0.15) {
        rafId = requestAnimationFrame(updateParallax);
      } else {
        isTicking = false;
      }
    };

    const onScroll = () => {
      targetY = window.scrollY;
      if (!isTicking) {
        isTicking = true;
        rafId = requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("entry.1738787160", replyText.trim());
      formData.append("fvv", "1");
      formData.append("pageHistory", "0");
      fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSfNEA70v3uCnZ00YbjFRZbhEk3pGpfnSC2L9G5LeHyeyY9zOg/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: formData,
        },
      ).catch(() => {});
    } catch {
      // Ignored
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <>
      <HeadContent />
      <main className="relative min-h-screen w-full overflow-x-hidden bg-ink font-sans text-emberlight">
        {/* Ambient light */}
        <div
          ref={ambientRef}
          className="pointer-events-none fixed inset-0 will-change-transform"
          aria-hidden="true"
        >
          <div
            className="absolute left-1/2 top-[38%] h-[100vmax] w-[100vmax] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklab, var(--ember) 20%, transparent), color-mix(in oklab, var(--ember) 6%, transparent) 45%, transparent 72%)",
            }}
          />
          <div
            className="animate-tribute-glow absolute -right-[12%] -top-[18%] h-[50vmax] w-[50vmax]"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklab, var(--emberlight) 18%, transparent), transparent 68%)",
            }}
          />
          <div
            className="animate-tribute-glow absolute -bottom-[22%] -left-[14%] h-[45vmax] w-[45vmax]"
            style={{
              animationDelay: "3.5s",
              background:
                "radial-gradient(closest-side, color-mix(in oklab, var(--petaldeep) 12%, transparent), transparent 70%)",
            }}
          />
        </div>

        {/* Parallax petals — far to near */}
        {mounted && (
          <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
            <PetalLayer petals={farPetals} layerRef={farRef} opacity={0.35} />
            <PetalLayer petals={midPetals} layerRef={midRef} opacity={0.6} />
            <PetalLayer petals={nearPetals} layerRef={nearRef} opacity={0.85} />
          </div>
        )}

        {/* Texture + vignette */}
        <div
          className="tribute-grain pointer-events-none fixed inset-0 opacity-25 hidden sm:block"
          aria-hidden="true"
        />
        <div className="tribute-vignette pointer-events-none fixed inset-0" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center px-5 pt-16 pb-32 text-center sm:px-6 sm:pt-24 sm:pb-44">
          <p
            className="animate-tribute-fade-up text-[10.5px] sm:text-[11px] font-medium uppercase tracking-[0.6em] text-gold/75"
            style={{ animationDelay: "0.25s" }}
          >
            Teacher&#39;s Day
          </p>

          <div
            className="animate-tribute-line mt-5 sm:mt-6 h-px w-20 bg-gradient-to-r from-transparent via-petal/60 to-transparent"
            style={{ animationDelay: "0.6s" }}
          />

          <h1 className="animate-tribute-title mt-10 sm:mt-14 font-serif leading-[1.08]">
            <span className="block text-4xl sm:text-6xl font-light text-emberlight/95">
              Happy Teachers&#39; Day,
            </span>
            <span className="title-glow mt-3 sm:mt-5 block text-5xl sm:text-7xl font-medium tracking-[0.005em] text-emberlight">
              Shuvangi Ma&#39;am
            </span>
          </h1>

          {/* Letter container — rises from below after the title settles */}
          <div
            className="animate-tribute-letter mt-16 w-full max-w-2xl sm:mt-24"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="relative overflow-hidden rounded-[26px] sm:rounded-[28px] border border-petal/15 bg-ink2/80 p-6 shadow-[0_30px_90px_-30px_#000] backdrop-blur-md sm:backdrop-blur-xl sm:p-12 md:p-14">
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-petal/45 to-transparent" />
              <div className="pointer-events-none absolute -top-28 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-petal/[0.08] blur-3xl" />
              <div className="tribute-grain pointer-events-none absolute inset-0 opacity-20 hidden sm:block" />

              <div className="relative text-left">
                {/* Decorative letter badge & top petal */}
                <div className="mb-8 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-petal/25 bg-petal/10 px-3.5 py-1 text-xs font-medium tracking-wider text-petal">
                    <span className="h-1.5 w-1.5 rounded-full bg-petal animate-pulse" />A Letter For
                    You
                  </span>
                  <span className="text-petal/40 select-none" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C9 6 6 9 6 13c0 3.3 2.7 6 6 6s6-2.7 6-6c0-4-3-7-6-11Z" />
                    </svg>
                  </span>
                </div>

                {/* Letter Body */}
                <div className="space-y-6 font-sans text-[15px] sm:text-[16.5px] font-light leading-[1.85] text-emberlight/90">
                  <p className="font-serif text-2xl sm:text-3xl font-light text-emberlight tracking-wide">
                    hello 👋!!! :)
                  </p>

                  <p>
                    so.... ab bas kuch 4 mahine hi bache hai... uske bad end of our school life....
                    <br />
                    aisa laga rha hai ki 4 sal se time 10x speed pe chal rha hai
                  </p>

                  <p>
                    waise.... 10th ke English lessons toh kuch khaas yaad nahi hai mujhe
                    <br />
                    BUT class ke piche baithke jo hum podcast karte the... aur woh ratio show
                    <br />
                    wo... sab ekdum clearly yaad hai... ~
                    <br />
                    And..... trip pe jaane se phale yk yk.... 😅 I’ll always be grateful to you for
                    that!!!!!!!
                  </p>

                  <p>
                    log kehte hai 10th and 12th sabse memorable classes hote hai mere perspective pe
                    12th ka to pata nahi but! 10th was.... 🌸🍃🌷🌙💐
                  </p>

                  <p>
                    I genuinely hope life me ap jo bhi achieve karna chahte hai jo bhi dreams
                    hain... sab achieve ho jaye.... You truly deserve it!!!
                  </p>

                  <p className="font-serif text-xl sm:text-2xl font-normal text-emberlight pt-2">
                    Happy Teacher&#39;s Day.... Ma&#39;am! 🍃🌸✨
                  </p>
                </div>

                {/* Divider before reply section */}
                <div className="relative my-10 flex items-center justify-center">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-petal/25 to-transparent" />
                  <div className="absolute bg-ink2/90 px-4 text-xs tracking-widest text-petal/60 select-none">
                    🌸 🍃 ✨
                  </div>
                </div>

                {/* Reply section */}
                <div className="pt-1">
                  <div className="mb-4">
                    <h2 className="font-serif text-xl sm:text-2xl font-normal text-emberlight">
                      You can reply to the above letter directly from here -
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-emberlight/60 font-light">
                      Write your thoughts or response below. It will be sent directly 💌
                    </p>
                  </div>

                  {isSubmitted ? (
                    <div className="rounded-2xl border border-petal/30 bg-petal/[0.08] p-6 text-center animate-tribute-fade-up">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-petal/20 text-2xl">
                        🌸
                      </div>
                      <h3 className="font-serif text-xl text-emberlight font-medium">
                        Your reply has been sent!
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-emberlight/80 font-light">
                        Thank you so much for reading and replying. It means everything! 🍃✨
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setReplyText("");
                        }}
                        className="mt-4 inline-flex items-center gap-1.5 text-xs text-petal/80 hover:text-petal underline underline-offset-4 transition-colors cursor-pointer"
                      >
                        Send another reply ✍️
                      </button>
                    </div>
                  ) : (
                    <>
                      <iframe
                        name="hidden_google_form_iframe"
                        id="hidden_google_form_iframe"
                        title="Google Form Frame"
                        className="hidden"
                        style={{ display: "none" }}
                      />
                      <form
                        action="https://docs.google.com/forms/d/e/1FAIpQLSfNEA70v3uCnZ00YbjFRZbhEk3pGpfnSC2L9G5LeHyeyY9zOg/formResponse"
                        method="POST"
                        target="hidden_google_form_iframe"
                        onSubmit={handleReplySubmit}
                        className="space-y-4"
                      >
                        <input type="hidden" name="fvv" value="1" />
                        <input type="hidden" name="pageHistory" value="0" />
                        <div className="relative">
                          <textarea
                            id="reply-box"
                            name="entry.1738787160"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            required
                            rows={4}
                            placeholder="Write your reply here... 🌸"
                            className="w-full rounded-2xl border border-petal/20 bg-ink/70 p-4 text-sm sm:text-base text-emberlight placeholder:text-emberlight/30 focus:border-petal/60 focus:outline-none focus:ring-1 focus:ring-petal/50 transition-all duration-200 resize-none font-sans leading-relaxed"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                          <span className="text-[11px] text-emberlight/40 font-light order-2 sm:order-1">
                            {replyText.length > 0
                              ? `${replyText.length} characters`
                              : "Takes just a moment"}
                          </span>

                          <button
                            type="submit"
                            disabled={isSubmitting || !replyText.trim()}
                            className="w-full sm:w-auto order-1 sm:order-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-petaldeep via-petal to-gold/90 px-7 py-3 text-xs sm:text-sm font-medium text-ink shadow-[0_4px_25px_rgba(244,114,182,0.25)] hover:shadow-[0_4px_30px_rgba(244,114,182,0.45)] hover:opacity-95 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          >
                            {isSubmitting ? (
                              <>
                                <span className="animate-spin inline-block">🌸</span>
                                <span>Sending reply...</span>
                              </>
                            ) : (
                              <>
                                <span>Send Reply</span>
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                >
                                  <line x1="22" y1="2" x2="11" y2="13" />
                                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
