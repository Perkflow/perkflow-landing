import React from "react";
import Container from "@/components/layouts/container";
import { HighlightBox } from "@/features/(trip-website)/landing-pages/components/news/reusables/highlight-box";
import { QuoteComp } from "@/features/(trip-website)/landing-pages/components/news/reusables/quote";
import { SuccessIndicators } from "@/features/(trip-website)/landing-pages/components/news/reusables/success-indicators";
// import {ListItem} from "@/features/(trip-website)/landing-pages/components/news/reusables/sub/list-item";
import { QuestionList } from "@/features/(trip-website)/landing-pages/components/news/reusables/quote-lists";
import { Subsection } from "@/features/(trip-website)/landing-pages/components/news/reusables/sub-section";
import { SectionComp } from "@/features/(trip-website)/landing-pages/components/news/reusables/section";
import { ProTip } from "@/features/(trip-website)/landing-pages/components/news/reusables/pro-tip";

// Color palette
export const colors = {
  primary: "#7950F2",
  secondary: "#003846",
  accent: "#38D9A9",
  warning: "#E67700",
  warningBg: "#FFF9DB",
  warningText: "#AE761B",
  background: "#F3F0FF",
  surface: "#F5F7FA",
  black: "#000000",
};

// Main App Component
const EmployeeRecognitionGuide = () => {
  const assessmentQuestions = [
    "How frequently do managers provide positive feedback to their teams?",
    "What prevents employees from recognizing each other?",
    "Is recognition consistent across all departments?",
    "Do programs align with your organization's values?",
  ];

  const successIndicators = [
    "Increased employee engagement and satisfaction scores",
    "Higher retention rates, especially among high performers",
    "More frequent peer-to-peer recognition",
    "Improved team collaboration and morale",
  ];

  const recodnitionIndicators = [
    "Immediate acknowledgment of contributions as they happen",
    "Meaningful feedback that connects individual work to organizational goals",
    "Peer-to-peer appreciation that builds community and collaboration",
    "Growth opportunities that recognize potential and invest in development",
  ];

  return (
    <div className="min-h-screen p-6">
      <Container className="px-4 py-10 sm:px-6 lg:px-9">
        <p className="text-[20px] leading-[32px] font-[500]">
          Organizations with strong recognition cultures see 31% lower voluntary
          turnover and 12% greater business outcomes. Yet many companies
          struggle to move beyond superficial recognition programs that fail to
          create lasting cultural change.
        </p>

        {/* Header Quote */}
        <div className="mx-auto w-full rounded-lg py-16 md:max-w-3xl">
          <QuoteComp>
            Recognition is not just about rewards—its about creating an
            environment where people feel valued, understood, and motivated to
            contribute their best work every day.
          </QuoteComp>
        </div>

        {/* What True Recognition Looks Like */}
        <SectionComp className="p-8" title="What True Recognition Looks Like">
          <p className="mb-6 leading-relaxed text-gray-700">
            True recognition culture goes beyond annual awards. It encompasses:
          </p>

          <SuccessIndicators indicators={recodnitionIndicators} />
        </SectionComp>

        {/* Step 1: Assess Your Current State */}
        <SectionComp
          className="mt-16 p-8"
          title="Step 1: Assess Your Current State"
        >
          <p className="mb-6 leading-relaxed text-gray-700">
            Before implementing new strategies, assess your current recognition
            patterns and identify gaps.
          </p>

          <Subsection title="Key Questions to Ask:">
            <QuestionList questions={assessmentQuestions} />
          </Subsection>
        </SectionComp>

        {/* Step 2: Build a Multi-Layered Strategy */}
        <SectionComp
          className="mt-16 p-8"
          title="Step 2: Build a Multi-Layered Strategy"
        >
          <p className="mb-6 leading-relaxed text-gray-700">
            Effective recognition operates on multiple levels. Implement these
            three key layers:
          </p>

          <div className="space-y-8">
            <Subsection title="Daily Recognition Practices">
              <p className="leading-relaxed text-gray-700">
                Build recognition into daily interactions through verbal
                acknowledgment, written notes, and spontaneous celebrations.
                Make it a weekly habit, not an annual event.
              </p>
            </Subsection>

            <Subsection title="Peer-to-Peer Recognition Systems">
              <p className="leading-relaxed text-gray-700">
                Enable employees to recognize each other through peer nomination
                programs, social platforms, or team appreciation rituals.
                Recognition should flow in all directions.
              </p>
            </Subsection>

            <Subsection title="Milestone and Achievement Celebrations">
              <p className="leading-relaxed text-gray-700">
                Celebrate significant achievements, anniversaries, and project
                completions with visible, meaningful recognition tailored to
                individual preferences.
              </p>
            </Subsection>
          </div>
        </SectionComp>

        <div className="mx-auto mt-16 max-w-3xl rounded-lg">
          <ProTip>
            High-performing teams receive five positive interactions for every
            negative one. Make recognition frequent but specific to feel
            genuine.
          </ProTip>
        </div>

        {/* Step 3: Use Technology Wisely */}
        <SectionComp
          className="mt-16 p-8"
          title="Step 3: Use Technology Wisely"
        >
          <p className="leading-relaxed text-gray-700">
            Technology should enhance, not replace, human connection. Use
            platforms that enable social recognition and track patterns, but
            ensure they align with your culture and dont create administrative
            burden.
          </p>
        </SectionComp>

        {/* Step 4: Measure and Improve */}
        <SectionComp className="mt-16 p-8" title="Step 4: Measure and Improve">
          <p className="mb-6 leading-relaxed text-gray-700">
            Track employee engagement scores, retention rates, recognition
            frequency, and qualitative feedback. Use regular pulse surveys to
            understand employee perceptions and identify improvement areas.
          </p>

          <SuccessIndicators indicators={successIndicators} />
        </SectionComp>

        {/* Making It Sustainable */}
        <HighlightBox className="mt-16 p-8" title="Making It Sustainable">
          <p className="mb-4 leading-relaxed text-gray-700">
            Building recognition culture takes time and commitment. Start with
            small, consistent actions and gradually expand as they become
            embedded in daily operations. Treat recognition as a core business
            practice, not just an HR initiative.
          </p>
          <p className="leading-relaxed text-gray-700">
            Done well, recognition creates a positive feedback loop where valued
            employees perform better and recognize others more. This
            self-sustaining cycle creates workplaces where people thrive and
            organizations excel.
          </p>
        </HighlightBox>

        {/* Related Articles */}
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <h2
            className="mb-6 text-2xl font-bold"
            style={{ color: colors.secondary }}
          >
            Related Articles
          </h2>

          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3
                className="mb-2 text-xl font-semibold"
                style={{ color: colors.secondary }}
              >
                The Psychology of Employee Motivation: Beyond Money
              </h3>
              <p className="mb-2 text-gray-600">
                Discover what truly motivates employees beyond compensation.
              </p>
              <span className="text-sm text-gray-500">8 min read →</span>
            </div>

            <div>
              <h3
                className="mb-2 text-xl font-semibold"
                style={{ color: colors.secondary }}
              >
                Building Psychological Safety in Remote Teams
              </h3>
              <p className="mb-2 text-gray-600">
                Create trust and openness in distributed work environments.
              </p>
              <span className="text-sm text-gray-500">10 min read →</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EmployeeRecognitionGuide;
