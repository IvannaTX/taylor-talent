import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-pill font-medium transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-apple disabled:pointer-events-none disabled:opacity-50 active:scale-[0.985] motion-reduce:active:scale-100 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        // Gradient fill — the one loud element per screen.
        primary:
          "bg-ring-gradient text-on-accent shadow-[0_10px_30px_-12px_rgb(var(--a-indigo)/0.7)] hover:shadow-[0_18px_44px_-14px_rgb(var(--a-indigo)/0.85)] hover:brightness-[1.06]",
        // Glass — sits on gradient washes without fighting them.
        secondary:
          "border border-line bg-surface/70 text-ink backdrop-blur-md hover:border-accent-indigo/45 hover:bg-raised/80",
        ghost:
          "text-muted hover:text-ink hover:bg-raised/60",
      },
      size: {
        sm: "h-9 px-4 text-[0.8125rem]",
        md: "h-11 px-5 text-[0.9375rem]",
        lg: "h-[3.25rem] px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type BaseProps = VariantProps<typeof buttonVariants> & { className?: string };

export type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export type ButtonLinkProps = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

/**
 * Renders an <a> when `href` is present, a <button> otherwise. External and
 * mailto targets bypass the client router so they behave natively.
 */
export function Button(props: ButtonProps | ButtonLinkProps) {
  const { className, variant, size } = props;
  const classes = cn(buttonVariants({ variant, size }), className);

  if (typeof props.href === "string") {
    const { href, className: _c, variant: _v, size: _s, ...rest } = props;
    const external = /^(https?:|mailto:|tel:)/.test(href);

    if (external) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...rest}
        />
      );
    }
    return <Link href={href} className={classes} {...rest} />;
  }

  const { className: _c, variant: _v, size: _s, ...rest } = props;
  return <button className={classes} {...rest} />;
}

export { buttonVariants };
