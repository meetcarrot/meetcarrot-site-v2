import { cn } from "@/lib/utils";

const CARD_CLASS =
  "flex flex-col items-start gap-5 p-10 bg-white rounded-[32px] shadow-[0_12px_12px_0_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-out hover:shadow-[0_16px_20px_0_rgba(0,0,0,0.08)] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-white focus-visible:ring-offset-2";
const TITLE_CLASS = "font-poly-sans-wide text-[28px] leading-[1.3]!";
const DETAIL_CLASS = "text-[18px] leading-[1.3] font-medium text-black";
const BADGE_CLASS =
  "inline-flex items-center justify-center px-3 py-2 rounded-lg text-[16px] font-medium leading-[1.3] whitespace-nowrap text-gray-400";

function ChatIcon() {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true" focusable="false">
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        fill="var(--color-white)"
        d="M10.9972 0C8.90697 0 6.64224 0.184435 4.59434 0.416517C2.79442 0.620494 1.38396 2.04602 1.18752 3.84237C0.965049 5.87676 0.780077 8.13893 0.780077 10.2171C0.780077 11.89 0.899913 13.683 1.06232 15.3784L0.0195795 20.1751C-0.0430132 20.4629 0.0466714 20.7629 0.257062 20.9691C0.467451 21.1755 0.769053 21.2592 1.05569 21.191L5.53666 20.124C5.73643 20.1442 5.93762 20.1638 6.1399 20.1825C5.99563 18.7718 5.87904 17.2044 5.87904 15.7261C5.87904 14.0823 6.02319 12.3313 6.18926 10.8067C6.45195 8.39494 8.34753 6.47431 10.7728 6.19958C12.3153 6.02482 14.0712 5.87978 15.7254 5.87978C17.3796 5.87978 19.1342 6.02481 20.676 6.19953C20.7982 6.21339 20.9193 6.23143 21.0386 6.25351C20.9733 5.43204 20.8941 4.62079 20.8092 3.84279C20.6136 2.04605 19.2029 0.620482 17.4029 0.416582C15.354 0.184469 13.0875 0 10.9972 0ZM11.014 8.32881C12.5169 8.15854 14.1843 8.02263 15.7254 8.02263C17.2665 8.02263 18.9324 8.15853 20.4346 8.32875C21.8587 8.49014 22.9742 9.61797 23.1295 11.0383C23.2925 12.5298 23.4288 14.1939 23.4288 15.7261C23.4288 16.5609 23.3885 17.4336 23.3256 18.2943L23.9918 23.0235C24.0295 23.2913 23.9386 23.5613 23.7466 23.7518C23.5545 23.9421 23.2839 24.0309 23.0163 23.9909L18.481 23.3139C17.5598 23.3846 16.6222 23.4297 15.7254 23.4297C14.1851 23.4297 12.5184 23.2966 11.015 23.1279C9.59001 22.968 8.47423 21.8395 8.31963 20.4189C8.15709 18.9252 8.0219 17.2584 8.0219 15.7261C8.0219 14.1943 8.15703 12.5304 8.31952 11.0387C8.47426 9.618 9.58992 8.49014 11.014 8.32881Z"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true" focusable="false">
      <path
        fillRule="evenodd"
        fill="var(--color-white)"
        d="M17.2066 0.581589C13.6859 0.376775 10.3147 0.376775 6.79404 0.581589C4.6552 0.706017 2.92209 2.37009 2.79151 4.50022C2.72783 5.53906 2.68367 6.8508 2.65878 8.11231C5.03001 10.1419 7.47804 12.0059 10.1291 13.6567C11.2507 14.355 12.7503 14.355 13.8719 13.6567C16.5228 12.006 18.9708 10.142 21.3418 8.11257C21.317 6.85087 21.2727 5.53949 21.2091 4.50022C21.0785 2.37009 19.3454 0.706017 17.2066 0.581589ZM7.6443 14.5299L7.64964 14.5337C8.09058 14.8267 8.53708 15.1142 8.9897 15.3961C6.12712 13.6136 3.5094 11.6035 0.997958 9.43634C0.925288 9.64419 0.872169 9.8568 0.839576 10.0726C0.617404 11.5872 0.428558 13.1399 0.428558 14.7253C0.428558 16.3106 0.617404 17.8648 0.839576 19.3778C0.98991 20.3733 1.57693 21.3005 2.5049 22.0082C3.4329 22.7159 4.64709 23.1623 5.94952 23.2747C7.91759 23.436 9.93935 23.572 12 23.572C14.0606 23.572 16.0824 23.436 18.0523 23.2747C19.3548 23.1623 20.569 22.7159 21.497 22.0082C22.4249 21.3005 23.0119 20.3733 23.1622 19.3778C23.3808 17.8634 23.5714 16.3106 23.5714 14.7253C23.5714 13.1399 23.3825 11.5857 23.1603 10.0726C23.1278 9.85697 23.0748 9.64454 23.0023 9.43683C20.8856 11.2631 18.6939 12.9779 16.3435 14.5389L16.3481 14.5356C15.9083 14.8278 15.4629 15.1146 15.0114 15.3957C13.195 16.5268 10.8061 16.5271 8.9897 15.3961C8.53526 15.1131 8.08692 14.8241 7.6443 14.5299ZM9.42669 8.20231C8.83495 8.20231 8.35526 8.682 8.35526 9.27374C8.35526 9.86547 8.83495 10.3452 9.42669 10.3452H14.5744C15.1662 10.3452 15.6459 9.86547 15.6459 9.27374C15.6459 8.682 15.1662 8.20231 14.5744 8.20231H9.42669ZM8.35526 5.09181C8.35526 4.50009 8.83495 4.02038 9.42669 4.02038H14.5744C15.1662 4.02038 15.6459 4.50009 15.6459 5.09181C15.6459 5.68354 15.1662 6.16323 14.5744 6.16323H9.42669C8.83495 6.16323 8.35526 5.68354 8.35526 5.09181Z"
      />
    </svg>
  );
}

function IconBadge({ tone, children }: { tone: "pink" | "gray"; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center size-14 rounded-full",
        tone === "pink" ? "bg-pink" : "bg-gray-600",
      )}
    >
      {children}
    </div>
  );
}

/**
 * The support entry points below the FAQs. Chat is a `<button>` rather than a
 * link because it is mounted by a third-party widget (Intercom, pending); email
 * is a real `mailto:`. Text and phone cards are omitted — Carrot has no support
 * line to point them at.
 */
export function StillNeedHelp() {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto px-6 container lg:max-w-324 pb-14 md:pb-20 lg:pb-24">
        <div className="flex flex-col gap-6 md:gap-8">
          <h2 className="text-[40px] font-poly-sans-wide text-center leading-[1.3]!">
            Still need help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {/*
              TODO: this button opens live chat once Intercom is installed —
              it is inert until then, matching the target's own behaviour.
            */}
            <button type="button" className={cn(CARD_CLASS, "cursor-pointer text-left")}>
              <IconBadge tone="pink">
                <ChatIcon />
              </IconBadge>
              <div className="flex flex-col gap-3">
                <h3 className={TITLE_CLASS}>Chat with us</h3>
                <p className="text-[18px] leading-[1.3] font-normal text-gray-600">
                  Start a conversation with our team
                </p>
              </div>
              <span className={cn(BADGE_CLASS, "bg-pink-50")}>Available 24/7</span>
            </button>

            <a className={CARD_CLASS} href="mailto:support@meetcarrot.xyz">
              <IconBadge tone="gray">
                <EmailIcon />
              </IconBadge>
              <div className="flex flex-col gap-3">
                <h3 className={TITLE_CLASS}>Email us</h3>
                <p className={DETAIL_CLASS}>support@meetcarrot.xyz</p>
              </div>
              <span className={cn(BADGE_CLASS, "bg-gray-200")}>Replies in ~1 business day</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
