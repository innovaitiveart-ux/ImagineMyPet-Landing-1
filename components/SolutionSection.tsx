import React from 'react';

interface SolutionSectionProps {
    onCtaClick: () => void;
}

const Benefit: React.FC<{ title: React.ReactNode, children: React.ReactNode, icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="flex flex-col items-center text-center p-4">
        <div className="flex-shrink-0 w-16 h-16 bg-white text-teal-600 rounded-full flex items-center justify-center shadow-md mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-stone-800">{title}</h3>
        <p className="mt-2 text-stone-600">{children}</p>
    </div>
);

const SolutionSection: React.FC<SolutionSectionProps> = ({ onCtaClick }) => {
  return (
    <section className="py-20 bg-teal-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900">ImagineMyPet – The Instant Solution</h2>
          <p className="mt-4 text-lg text-stone-600">
            We turn the pet portrait experience from frustrating to fun, with an instant preview and a perfect keepsake at the end. Here's how we make it easy and delightful for you:
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <Benefit title={<>Upload → <span className="text-teal-600">Preview in Seconds</span></>} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}>
                Simply upload a photo and choose a style. You'll see a preview on screen instantly. <b className="font-semibold">You see it before you buy it.</b>
            </Benefit>
            <Benefit title={<>Looks Like <span className="text-teal-600">Real Art</span>, Not a Filter</>} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>}>
                Each portrait combines thoughtfully engineered design with creative digital artistry to produce imaginative, beautifully detailed artwork that’s unmistakably one-of-a-kind.
            </Benefit>
            <Benefit title={<>Your Art, <span className="text-teal-600">Your Way</span></>} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}>
                Love your portrait? Instantly download a high-resolution digital file, or have it printed on <b className="font-semibold">wall art, mugs, t-shirts, and more.</b>
            </Benefit>
        </div>
        <div className="mt-20 text-center">
            <p className="text-xl text-stone-700 mb-4">Feeling excited?</p>
            <button
                onClick={onCtaClick}
                className="bg-teal-600 text-white font-bold py-4 px-10 rounded-xl text-lg hover:bg-teal-700 transition-transform transform hover:scale-105"
            >
                Create Your Pet's Portrait Now
            </button>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;