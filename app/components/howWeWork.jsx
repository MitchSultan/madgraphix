import { Button } from "@/components/ui/button";

const STEPS = [
  {
    title: "Discovery & Research",
    description:
      "We dive deep into your goals, target audience, and market trends to ensure every decision is grounded in data and purpose.",
  },
  {
    title: "Strategy & Roadmap",
    description:
      "We develop a tailored strategic plan that aligns your business objectives with creative execution, laying out clear milestones.",
  },
  {
    title: "Design & Creation",
    description:
      "Our expert team brings concepts to life through iterative design, ensuring every visual element resonates with your brand identity.",
  },
  {
    title: "Review & Refine",
    description:
      "We partner closely with you during the review process, incorporating feedback to polish and perfect every final detail.",
  },
  {
    title: "Launch & Growth",
    description:
      "We seamlessly launch your project and remain by your side, providing ongoing support and strategies for continuous growth.",
  },
];

const HowWeWork = () => {
  return (
    <section className="bg-[#FCFCFA] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Heading & Paragraph */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Our Process
            </h3>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-serif">
              How we bring your <span className="italic font-normal">vision</span> to life
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe great design is a partnership. From initial concept to final launch, our structured workflow ensures transparency, creativity, and unparalleled attention to detail at every stage.
            </p>
            <Button  className="btn-slide">
              <span className="ta">Learn More</span>
                  <span className="tb">Let's Talk →</span>
            </Button>
          </div>

          {/* Right Column: 5 Steps Timeline */}
          <div className="lg:col-span-7 relative">
            <div className="flex flex-col lg:gap-6">
              {STEPS.map((step, idx) => (
                <div
                  key={idx}
                  className="relative flex gap-4 py-6 first:pt-0 last:pb-0 lg:py-0"
                >
                  {/* Number Circle & Connector Line */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-10 h-10 rounded-full border-2 border-muted/30 bg-background text-foreground font-semibold flex items-center justify-center relative z-10 shadow-sm">
                      {idx + 1}
                    </div>
                    {/* Vertical connecting line (hidden on the last step) */}
                    {idx !== STEPS.length - 1 && (
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[2px] h-[calc(100%+1rem)] bg-muted/30 rounded-full lg:h-[calc(100%+2rem)]"></div>
                    )}
                  </div>

                  {/* Step Text Content */}
                  <div className="flex-1 pb-2 lg:pb-0">
                    <h4 className="text-lg font-semibold mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed pr-4">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;