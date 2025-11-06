import React from 'react';

const FrustrationPoint: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-semibold text-stone-800">{title}</h3>
      <p className="mt-1 text-stone-600">{children}</p>
    </div>
  </div>
);

const ProblemSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900">Why It’s So Hard to Get a Pet Portrait You Love</h2>
          <p className="mt-4 text-lg text-stone-600">
            You consider your pet family—yet when it comes to turning their photo into art, you don’t know where to start. With so many generic options and filters out there, it’s hard to find something that truly captures your pet’s personality.
          </p>
        </div>
        <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-12">
          <FrustrationPoint
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
            title="It's hard to visualize the outcome."
          >
            You can't truly picture what your pet will look like in the custom art until you see it. The uncertainty makes you hesitate and wonder if it's worth trying.
          </FrustrationPoint>
          <FrustrationPoint
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            title="Generic apps don't do them justice."
          >
            Those one-click filters and gimmicky apps often produce cartoonish images that fail to capture your pet’s unique personality—and many pet portrait companies simply copy and paste your pet’s head onto a generic, cookie-cutter template that looks the same for every customer.
          </FrustrationPoint>
          <FrustrationPoint
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
            title="Custom orders are overwhelming."
          >
            Other websites make you jump through hoops – endless options, complicated forms, and long waits for a proof. It's time-consuming and stressful.
          </FrustrationPoint>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;