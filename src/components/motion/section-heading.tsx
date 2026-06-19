import { Reveal } from "./reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "mx-auto text-center"
      : "";

  return (
    <div
      className={`mb-12 max-w-3xl ${alignment}`}
    >
      <Reveal>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="text-balance text-3xl font-bold tracking-tight md:text-5xl">
          {title}
        </h2>
      </Reveal>

      <Reveal delay={0.16}>
        <p className="mt-5 text-pretty text-base leading-8 text-muted-foreground md:text-lg">
          {description}
        </p>
      </Reveal>
    </div>
  );
}