import Image from "next/image";

interface TeamMember {
  name: string;
  title: string;
  photo: string;
  href: string;
}

/** Order is the target's own — not alphabetical, not by department. */
const TEAM: readonly TeamMember[] = [
  {
    name: "Andrew Borovsky",
    title: "CEO",
    photo: "/images/about-us/AndrewBorovsky.png",
    href: "https://www.linkedin.com/in/andrewborovsky",
  },
  {
    name: "Gerard Knight",
    title: "Operations",
    photo: "/images/about-us/GerardKnight.png",
    href: "https://www.linkedin.com/in/jerryknight1",
  },
  {
    name: "Alexander Labowitz",
    title: "Legal & Compliance",
    photo: "/images/about-us/AlexanderLabowitz.png",
    href: "https://www.linkedin.com/in/alexander-labowitz-b0513512",
  },
  {
    name: "Andrew Lin",
    title: "Product & Design",
    photo: "/images/about-us/AndrewLin.png",
    href: "https://www.linkedin.com/in/loremipsum",
  },
  {
    name: "Leonid Movsesyan",
    title: "Engineering",
    photo: "/images/about-us/LeonidMovsesyan.png",
    href: "https://www.linkedin.com/in/lmovsesyan",
  },
  {
    name: "Catie Case",
    title: "Special Projects",
    photo: "/images/about-us/CatieCase.png",
    href: "https://www.linkedin.com/in/catiecase",
  },
  {
    name: "Travis Schmeisser",
    title: "Product & Design",
    photo: "/images/about-us/TravisSchmeisser.png",
    href: "https://www.linkedin.com/in/tschmeisser/",
  },
  {
    name: "Leon Li",
    title: "Product & Design",
    photo: "/images/about-us/LeonLi.png",
    href: "https://www.linkedin.com/in/leonbignoggin/",
  },
  {
    name: "Nils Decker",
    title: "Business Development",
    photo: "/images/about-us/NilsDecker.png",
    href: "https://www.linkedin.com/in/nilsdecker",
  },
  {
    name: "Adam Covalt",
    title: "Support",
    photo: "/images/about-us/AdamCovalt.png",
    href: "https://www.linkedin.com/in/adam-c-1242aa53/",
  },
  {
    // The asset ships under a shortened, differently-spelled filename.
    name: "Moustafa Elkholy",
    title: "Accounting",
    photo: "/images/about-us/Mousafa.png",
    href: "https://www.linkedin.com/in/moustafa-m-elkholy-233a5658/",
  },
];

/**
 * Black-stroked chevron. `icons.tsx`'s ChevronRightIcon hard-codes a white
 * stroke, so this row carries its own copy.
 */
function TeamChevron() {
  return (
    <svg
      fill="none"
      height="12"
      viewBox="0 0 7 12"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M1 11L6 6L1 1"
        stroke="var(--color-black)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function WhoWeAre() {
  return (
    <section className="py-14 lg:py-24 bg-gray-100">
      <div className="mx-auto px-6 container lg:max-w-324">
        <div className="flex flex-col gap-6 md:gap-6">
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center">
            Who we are
          </h2>
          <p className="text-[16px] font-normal leading-[1.33] text-center lg:text-[18px]">
            Passionate technologists with decades of experience across finance,
            real estate,
            <br />
            consumer, security, and beyond.
          </p>
        </div>
        <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-x-6 lg:gap-y-4">
          {TEAM.map((member) => (
            <a
              key={member.name}
              className="group flex items-center gap-4 lg:gap-5 bg-white rounded-3xl p-3 lg:p-4 shadow-[0_4px_12px_0_rgba(0,0,0,0.04)] transition-colors duration-200 ease-out"
              href={member.href}
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              <Image
                src={member.photo}
                alt={member.name}
                width={64}
                height={64}
                className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[18px] lg:text-[20px] leading-[1.2]">
                  {member.name}
                </p>
                <p className="font-normal mt-1 text-[14px] lg:text-[16px] text-gray-600">
                  {member.title}
                </p>
              </div>
              <TeamChevron />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
