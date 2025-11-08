import React from "react";
import { ListItem } from "@/features/(trip-website)/landing-pages/components/news/reusables/sub/list-item";

export const QuestionList = ({ questions }: { questions: string[] }) => (
  <div className="space-y-3">
    {questions.map((question, index) => (
      <ListItem key={index}>{question}</ListItem>
    ))}
  </div>
);
