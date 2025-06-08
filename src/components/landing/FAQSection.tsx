
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is VerbalPilot free?",
    answer: "We're planning a freemium model with basic features available for free and premium features for paid subscribers. Early access users will get extended free trials."
  },
  {
    question: "How does VerbalPilot work?",
    answer: "VerbalPilot uses advanced AI to conduct realistic mock interviews. You'll answer questions verbally, and our AI provides instant feedback on your responses, tone, and delivery."
  },
  {
    question: "When does VerbalPilot launch?",
    answer: "We're targeting early 2024 for our beta launch. Join our waitlist to be among the first to try VerbalPilot and help shape the product."
  },
  {
    question: "Can I suggest features?",
    answer: "Absolutely! We're building VerbalPilot with our community. Your feedback and feature suggestions are invaluable in creating the best interview preparation tool possible."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Everything you need to know about VerbalPilot
          </p>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
