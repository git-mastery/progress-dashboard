export interface FaqItemType {
  question: string;
  answer: string | string[];
}

export const FAQ_ITEMS: FaqItemType[] = [
  {
    question: "Why is my progress not updating immediately?",
    answer: [
      "Follow these steps to troubleshoot:",
      "1. Run `gitmastery progress show` to view your local progress. This should update immediately after completing an exercise.",
      "2. There is a slight delay in remote progress syncing. Refresh after 5 minutes.",
      "3. Still not seeing progress? Check your progress repo on Github to verify the latest commit time.",
      "4. Ensure the 'gitmastery verify' command returned success.",
    ],
  },
  {
    question: "Why is my progress not showing?",
    answer:
      "Ensure that you have enabled remote progress tracking using `gitmastery progress sync on` in the Git-Mastery app.",
  },
];
