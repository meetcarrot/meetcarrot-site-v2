import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Port of splitpay.com's button. The `after:` layer is a fixed 5% black gradient
 * overlay that deepens to 9% while pressed — that, plus the scale/translate nudge,
 * is what gives the buttons their tactile feel.
 */
const buttonVariants = cva(
  [
    "relative w-full overflow-hidden cursor-pointer font-medium text-[16px]",
    "border border-black/15 rounded-3xl",
    "disabled:cursor-not-allowed disabled:pointer-events-none",
    "aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none",
    'after:z-0 after:content-[""] after:absolute after:inset-0 after:bg-gradient-to-b',
    "after:from-transparent after:to-black after:opacity-[0.05] after:pointer-events-none",
    "after:transition-opacity after:duration-200 after:ease-out active:after:opacity-[0.09]",
    "active:scale-[0.98] active:translate-y-[1px]",
    "focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-orange-200/80 focus-visible:ring-offset-white focus-visible:ring-offset-2",
    "transition duration-200 ease-in-out",
    "shadow-[0_2px_6px_0_rgba(0,0,0,0.15)] active:shadow-[0_1px_3px_0_rgba(0,0,0,0.12)]",
  ],
  {
    variants: {
      variant: {
        primary: "text-gray-100 bg-orange-100 hover:bg-orange-100 active:bg-orange-300",
        dark: "text-white bg-black hover:bg-black active:bg-gray-400",
        /** Dark pill as it appears over the golden hero — label picks up the golden. */
        darkOnGolden: "text-golden bg-black hover:bg-black active:bg-gray-400",
        /** White pill used by the mobile menu's own header row; softer shadow. */
        light:
          [
            "text-black bg-white hover:bg-white active:bg-gray-200",
            "shadow-[0_2px_6px_0_rgba(0,0,0,0.06)] active:shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]",
          ].join(" "),
      },
      size: {
        default: "px-4 md:px-8 h-12",
        compact: "px-4 md:px-8 h-10 md:h-12",
        icon: "flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </button>
  );
}

export { buttonVariants };
