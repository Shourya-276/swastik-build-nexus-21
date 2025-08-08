import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axios from 'axios';

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/content/faqs');
        setFaqs(response.data);
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setError('Failed to load FAQs');
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <section id="faq" className="py-20 bg-gradient-light">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-brand-blue rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto">
            Find answers to common questions about our projects, services, and processes
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-blue"></div>
            </div>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : faqs.length === 0 ? (
            <p className="text-center text-brand-gray">No FAQs available</p>
          ) : (
            <Accordion type="single" collapsible className="space-y-4 animate-slide-up">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="bg-white rounded-xl shadow-card hover:shadow-brand transition-all duration-300 border-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <span className="text-brand-navy font-medium pr-4 leading-relaxed">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-brand-gray leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>

        {/* Consultant Information */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-card animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            <div className="space-y-2">
              <h3 className="font-semibold text-brand-navy">MEP Consultant</h3>
              <p className="text-sm text-brand-gray">Mr. Rupesh Gujarathi</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-brand-navy">PMC</h3>
              <p className="text-sm text-brand-gray">Epsilon Project Management</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-brand-navy">Vastu Consultant</h3>
              <p className="text-sm text-brand-gray">Kamlesh Vastu Engineer</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-brand-navy">Legal Consultant</h3>
              <p className="text-sm text-brand-gray">Lexicon Law Partners</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-brand-navy">Design Architect</h3>
              <p className="text-sm text-brand-gray">Kiran Architect</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;