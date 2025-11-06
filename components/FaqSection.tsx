import React, { useState } from 'react';
import { FAQ_ITEMS } from '../constants';

const FaqItemComponent: React.FC<{ item: typeof FAQ_ITEMS[0]; isOpen: boolean; onClick: () => void }> = ({ item, isOpen, onClick }) => (
    <div className="border-b border-stone-200 py-6">
        <dt>
            <button onClick={onClick} className="w-full text-left flex justify-between items-start text-stone-600">
                <span className="text-lg font-medium text-stone-900">{item.question}</span>
                <span className="ml-6 h-7 flex items-center">
                    <svg className={`h-6 w-6 transform ${isOpen ? '-rotate-180' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
        </dt>
        {isOpen && (
            <dd className="mt-4 pr-12">
                <p className="text-base text-stone-600">{item.answer}</p>
            </dd>
        )}
    </div>
);


const FaqSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900">Frequently Asked Questions</h2>
                    <p className="mt-4 text-lg text-stone-600">
                        We know you might have a few more questions. Here are the most common ones.
                    </p>
                </div>

                <div className="mt-12">
                    <dl className="space-y-4">
                        {FAQ_ITEMS.map((item, index) => (
                            <FaqItemComponent
                                key={index}
                                item={item}
                                isOpen={openIndex === index}
                                onClick={() => handleToggle(index)}
                            />
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
