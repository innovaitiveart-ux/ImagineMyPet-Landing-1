import React from 'react';

interface FinalCtaSectionProps {
    onCtaClick: () => void;
}

const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onCtaClick }) => {
    return (
        <section className="bg-stone-100">
            <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-stone-900">
                    Ready to See Your Pet's Portrait Come to Life?
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-stone-600">
                    You've seen how simple and rewarding it is. All that's left is to try it for yourself. Imagine the moment you see your own pet's face as a timeless work of art – it's priceless. Don't just imagine it... <strong className="text-teal-600">make it happen now.</strong>
                </p>
                <div className="mt-10">
                    <button
                        onClick={onCtaClick}
                        className="bg-teal-600 text-white font-bold py-5 px-12 rounded-2xl text-xl hover:bg-teal-700 transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        Upload Your Photo & Get Started
                    </button>
                    <p className="mt-3 text-sm text-stone-500">Instant preview, no signup required.</p>
                </div>
            </div>
        </section>
    );
};

export default FinalCtaSection;
