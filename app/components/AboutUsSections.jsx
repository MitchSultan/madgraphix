import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

/* ─────────────────────────────────────────────
   Data – copy/pasted from your brief (trimmed slightly for cards)
   You can replace icons or add SVGs later.
───────────────────────────────────────────── */

const values = [
  {
    title: "Authentic Connection",
    description:
      "We believe every design should capture the essence of the human experience. We build brands that resonate with authenticity and emotional depth, forging a genuine connection with your target audience.",
  },
  {
    title: "Unbridled Creativity",
    description:
      "This is where Creativity Goes Mad. We mix a profound love for design with bold, out-of-the-box thinking to make sure your brand inevitably pops in a crowded market.",
  },
  {
    title: "True Collaboration",
    description:
      "We don't design in a vacuum. We work closely with you at every step to ensure the final product looks just as awesome as you imagined. Your vision is our blueprint.",
  },
  {
    title: "Heart-Led Execution",
    description:
      "Art Straight from the Heart! We reflect true passion and dedication in every single project we produce, from the smallest business card to the largest brand makeover.",
  },
];

const reasons = [
  {
    title: "A Frictionless Client Experience",
    description:
      "Say goodbye to lost email threads and messy invoice tracking. We utilise a streamlined, custom-built order management system that securely stores your orders, tracks your invoices seamlessly, and keeps your project moving without delays.",
  },
  {
    title: "A Complete 360° Toolkit",
    description:
      "Whether you need a fresh logo, a snazzy new functional website, or eye-catching packaging design, we've got you covered. We handle your entire visual ecosystem so you don't have to juggle multiple agencies.",
  },
  {
    title: "Designs Engineered for Reality",
    description:
      "We understand that a great design must actually work in the real world. Our team turns your ideas into reality by ensuring our digital files are structurally perfect for web deployment and our print files are flawlessly formatted for local Kenyan production houses.",
  },
  {
    title: "Deep Local Market Insight",
    description:
      "We know what it takes to stand out in Kenya's fast-paced commercial hubs. Our visually arresting artwork and user interface designs are strategically crafted to capture local attention and drive actual business growth.",
  },
];

/* ── Reusable Card Item ── */
function ValueCard({
  title,
  description,
}) {
  return (
    <Card className="relative overflow-hidden border border-border/60 bg-background transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
      {/* Accent bar on the left */}
      {/* <div className="absolute left-0 top-0 h-full w-1 bg-primary" /> */}
      <CardHeader className="pb-2 flex flex-col justify-end">
        <CardTitle className="text-xl font-bold tracking-tight">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

/* ── Full Sections ── */
export function ValuesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
             The Heart of M.A.D Graphix
          </h2>
          <p className="mt-4 text-right text-lg text-muted-foreground max-w-2xl mx-auto">
            At Mirror Arts Designs Graphix, we don&apos;t just make things look
            pretty; we build identities with purpose.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((v) => (
            <ValueCard key={v.title} {...v} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
             The M.A.D Advantage
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We bridge the gap between creative brilliance and seamless business
            execution.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r) => (
            <ValueCard key={r.title} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Optional: Export both together for easy import ── */
export default function AboutUsSections() {
  return (
    <>
      <ValuesSection />
      <WhyChooseUsSection />
    </>
  );
}