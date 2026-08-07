import Image from "next/image";

/**
 * Golden title band. `data-header-theme="golden"` is what the site header's
 * scroll listener reads to flip its palette while this section sits behind it,
 * and the section's own `pt-18 md:pt-28` is what clears the fixed header.
 */
export function AboutHero() {
  return (
    <section
      className="bg-golden  mb-11 relative h-71 md:h-110 lg:h-129 pt-18 md:pt-28"
      data-header-theme="golden"
    >
      <div className="mx-auto px-6 container lg:max-w-324 pt-6">
        <div className="px-6 py-10 h-65 md:h-88 lg:h-106 lg:py-15 w-full border border-[rgba(0,0,0,0.14)] bg-golden rounded-4xl shadow-[0_12px_24px_0_rgba(0,0,0,0.05)]">
          <div className="illustration-component flex items-center justify-center h-32 md:h-38 lg:h-52">
            {/* The target's `.illustration-component` rule sizes the art off the
                slot height; we reproduce that with utilities instead. */}
            <Image
              src="/images/about-us/welcome-img.png"
              alt="security"
              width={840}
              height={543}
              priority
              className="h-full w-auto object-contain"
            />
          </div>
          <h1 className="leading-[115%]! font-poly-sans-wide text-center text-[40px] md:text-[56px] lg:text-[64px] mt-2 md:mt-6 lg:mt-10">
            About us
          </h1>
        </div>
      </div>
    </section>
  );
}
