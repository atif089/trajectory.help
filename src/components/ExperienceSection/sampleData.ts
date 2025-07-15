import { Experience } from "./index";

export const experiences: Experience[] = [
  {
    company: "Tech Innovators Inc.",
    position: "Senior Software Engineer",
    location: "San Francisco, CA",
    from: "Jan 2020",
    to: "Dec 2024",
    summary:
      "Led a team of engineers to develop scalable web applications for enterprise clients, focusing on performance and maintainability.",
    bullets: [
      "Architected and deployed a new microservices infrastructure, reducing deployment time by 40%.",
      "Mentored 5 junior engineers, helping them grow into independent contributors.",
      "Collaborated with product managers to define project requirements and deliverables.",
    ],
  },
  {
    company: "ABC LLC",
    position: "Software Engineer",
    location: "New York, NY",
    from: "Jan 2018",
    to: "Dec 2019",
    summary: "Developed scalable web applications for enterprise clients, focusing on performance and maintainability.",
    bullets: [
      "Built and maintained a web application for a financial institution, handling 2M+ transactions per day.",
      "Mentored 2 junior engineers, helping them grow into independent contributors.",
    ],
  },
  {
    company: "Tech Devices Inc.",
    position: "Intern",
    location: "New York, NY",
    from: "Mar 2017",
    to: "May 2017",
    summary: "Developed location module for a mobile app.",
    bullets: ["Built location module for a mobile app.", "Tested and deployed the module to production."],
  },
];
