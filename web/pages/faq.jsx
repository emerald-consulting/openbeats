import { FAQCard } from "../components/FAQCard";
import React from "react";
const content = [
  {
    id: 1,
    header: "What benefits can I enjoy as a Premium User?",
    answer: `As a premium user you get access to additional features such as collaborating a live session with up to 10 artists.`,
  },
  {
    id: 2,
    header:
      "Can I receive a discount on the premium user membership if I am a student?",
    answer:
      "Yes definitely! If you are a student, you get a 20% off your subscription when you subsribe with a valid email provided by your academic instituition",
  },
  {
    id: 3,
    header: "What is the difference between feeds and projects?",
    answer:
      "In feeds you will be able to see activity by other people on the website,while the projects tab for your work",
  },
  {
    id: 4,
    header: "How do I upload my song on OpenBeats?",
    answer:
      "Once you go to feed, open the side navigation bar and click on Projects, upon which your will be prompted to upload your work",
  },
];

export default function FAQ() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Frequently Asked Questions
        </h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4 mt-5">
          <ul role="list" className="col-start-1 col-end-7 ">
            {content.map((qns) => FAQCard(qns))}
          </ul>
        </div>
      </div>
    </div>
  );
}
