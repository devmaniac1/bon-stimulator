"use client";

import emailjs from "emailjs-com";
import type React from "react";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  LayoutGrid,
  Layers,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getReadinessInterpretation,getInterpretationColor } from "@/lib/helpers";

const BON_DIMENSIONS = [
  {
    name: "Clarity",
    description:
      "Do people know what we’re doing, why we’re doing it, and how success is measured?",
  },
  {
    name: "Ownership",
    description:
      "Are the right people accountable—and do they feel empowered to act?",
  },
  {
    name: "Alignment Drift",
    description:
      "Is everyone still moving in the same direction—or are we drifting?",
  },
  {
    name: "Focus Fragmentation",
    description:
      "Is our attention diluted across too many goals, projects, or metrics?",
  },
  {
    name: "Friction",
    description: "What bottlenecks, blockers, or slowdowns are we ignoring?",
  },
  {
    name: "Cadence",
    description: "Is there a rhythm of execution—or just bursts of energy?",
  },
  {
    name: "Trust & Safety",
    description:
      "Do people feel safe to speak up, push back, and act decisively?",
  },
  {
    name: "Adaptability",
    description:
      "Can the team adjust in motion—or are we rigid in the face of change?",
  },
  {
    name: "Momentum Data",
    description:
      "Are we tracking what actually signals forward motion—not just activity?",
  },
];

export default function Home() {
  const [sliders, setSliders] = useState(Array(BON_DIMENSIONS.length).fill(1));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formType, setFormType] = useState("single-page");

  const handleSliderChange = (index: number, value: number[]): void => {
    const newSliders = [...sliders];
    newSliders[index] = value[0];
    setSliders(newSliders);
  };

  const nextStep = () => {
    if (currentStep < BON_DIMENSIONS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  interface FormPayload {
    name: string;
    email: string;
    averageScore: number;
    interpretation: string;
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    const score: number = parseFloat(
      (sliders.reduce((a, b) => a + b, 0) / sliders.length).toFixed(2)
    );
    const interpretation: string = getReadinessInterpretation(score);

    const sliderRatings: Record<string, number> = {};
    BON_DIMENSIONS.forEach((label, index) => {
      sliderRatings[label.name] = sliders[index];
    });
    const payload: FormPayload = {
      name,
      email,
      ...sliderRatings,
      averageScore: score,
      interpretation,
    };
    const interpretationColor = getInterpretationColor(score);

    try {
      emailjs.send(
        `${process.env.NEXT_PUBLIC_SERVICE_ID}`,
        `${process.env.NEXT_PUBLIC_TEMPLATE_ID}`,
        {
          name,
          email,
          interpretationColor,
          score,
          interpretation,
          clarity: sliders[0],
          ownership: sliders[1],
          alignmentDrift: sliders[2],
          focusFragmentation: sliders[3],
          friction: sliders[4],
          cadence: sliders[5],
          trustAndSafety: sliders[6],
          adaptability: sliders[7],
          momentumData: sliders[8],
        },
        `${process.env.NEXT_PUBLIC_EMAILJS_ID}`
      );
      await fetch(
        `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSliders(Array(BON_DIMENSIONS.length).fill(3));
    setName("");
    setEmail("");
    setCurrentStep(0);
  };

  const averageScore = sliders.reduce((a, b) => a + b, 0) / sliders.length;
  const scorePercentage = (averageScore / 5) * 100;

  // Render the success screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 flex items-center justify-center">
        <Card className="border-none shadow-lg w-full max-w-3xl">
          <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold text-center">
              BON Leadership AI Execution Simulator
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <div className="py-12 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Assessment Submitted
              </h2>
              <p className="text-slate-600 mb-6">
                Thank you for completing the BON Leadership AI Execution
                Simulator.
              </p>
              {/* <div className="bg-slate-50 p-4 rounded-lg inline-block">
                <div className="text-sm text-slate-500">Your Average Score</div>
                <div className="text-3xl font-bold text-slate-800">
                  {averageScore.toFixed(1)}/5.0
                </div>
                <Progress value={scorePercentage} className="w-full h-2 mt-2" />
              </div> */}

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {BON_DIMENSIONS.map((dimension, index) => (
                  <div
                    key={dimension.name}
                    className="bg-white p-3 rounded-lg shadow-sm border border-slate-100"
                  >
                    <h3 className="font-medium text-slate-800">
                      {dimension.name}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <Progress
                        value={(sliders[index] / 5) * 100}
                        className="w-full h-2 mr-2"
                      />
                      <span className="font-bold text-slate-700">
                        {sliders[index]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => {
                  setSubmitted(false);
                  setSliders(Array(BON_DIMENSIONS.length).fill(3));
                  setName("");
                  setEmail("");
                  setCurrentStep(0);
                }}
                className="mt-8 bg-slate-800 hover:bg-slate-700"
              >
                Start New Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-6 sm:py-12 px-3 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Card className="border-none shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-t-lg p-4 sm:p-6">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center">
              BON Leadership AI Execution Simulator
            </CardTitle>
            <CardDescription className="text-slate-200 text-center mt-2">
              Evaluate your organization's execution capabilities across key
              dimensions
            </CardDescription>

            <div className="mt-4 flex justify-center">
              <Tabs
                defaultValue="single-page"
                value={formType}
                onValueChange={setFormType}
                className="w-full max-w-xs"
              >
                <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
                  <TabsTrigger
                    value="single-page"
                    className="flex items-center gap-2"
                  >
                    <LayoutGrid className="h-4 w-4" />
                    <span className="hidden sm:inline">All Questions</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="step-by-step"
                    className="flex items-center gap-2"
                  >
                    <Layers className="h-4 w-4" />
                    <span className="hidden sm:inline">Step by Step</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {formType === "single-page" ? (
                // Single page form
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-slate-800">
                      Execution Dimensions
                    </h2>
                    {/* <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-600">
                        Average Score:
                      </span>
                      <span className="text-lg font-bold text-slate-800">
                        {averageScore.toFixed(1)}
                      </span>
                      <Progress value={scorePercentage} className="w-24 h-2" />
                    </div> */}
                  </div>

                  <div className="space-y-6">
                    {BON_DIMENSIONS.map((dimension, index) => (
                      <div
                        key={dimension.name}
                        className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-slate-100"
                      >
                        <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                          <Label className="text-base font-semibold text-slate-800">
                            {dimension.name}
                          </Label>
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold">
                            {sliders[index]}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">
                          {dimension.description}
                        </p>
                        <div className="px-1 touch-manipulation">
                          <Slider
                            defaultValue={[sliders[index]]}
                            value={[sliders[index]]}
                            max={5}
                            min={1}
                            step={1}
                            onValueChange={(value) =>
                              handleSliderChange(index, value)
                            }
                            className="my-4"
                            aria-label={`Adjust ${dimension.name} value`}
                          />
                          <div>
                            <ul className="flex justify-between text-xs text-slate-400 px-1 mb-1">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <li key={num}>{num}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex justify-between text-xs text-slate-400 px-1">
                            <span>Low</span>
                            <span>Mid</span>
                            <span>High</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // Step by step form
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-slate-800">
                      {currentStep < BON_DIMENSIONS.length
                        ? `Step ${currentStep + 1}: ${
                            BON_DIMENSIONS[currentStep].name
                          }`
                        : "Your Information"}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-600">
                        Progress:
                      </span>
                      <Progress
                        value={
                          (currentStep / (BON_DIMENSIONS.length + 1)) * 100
                        }
                        className="w-24 h-2"
                      />
                    </div>
                  </div>

                  {currentStep < BON_DIMENSIONS.length ? (
                    <div className="bg-white p-5 sm:p-8 rounded-xl shadow-sm border border-slate-100 transition-all duration-300 ease-in-out">
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">
                          {BON_DIMENSIONS[currentStep].name}
                        </h3>
                        <p className="text-slate-600">
                          {BON_DIMENSIONS[currentStep].description}
                        </p>
                      </div>

                      <div className="mt-8 mb-4 px-4 touch-manipulation">
                        
                        <Slider
                          defaultValue={[sliders[currentStep]]}
                          value={[sliders[currentStep]]}
                          max={5}
                          min={1}
                          step={1}
                          onValueChange={(value) =>
                            handleSliderChange(currentStep, value)
                          }
                          className="my-6"
                          aria-label={`Adjust ${BON_DIMENSIONS[currentStep].name} value`}
                        />
                        <div>
                          <ul className="flex justify-between text-xs text-slate-400 px-2 mb-1">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <li key={num}>{num}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex justify-between mb-2 px-1">
                          <span className="text-xs text-slate-500">Low</span>
                          <span className="text-xs text-slate-500">Mid</span>
                          <span className="text-xs text-slate-500">High</span>
                        </div>
                        <div className="flex justify-center mt-4">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-800 text-3xl font-bold">
                            {sliders[currentStep]}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between mt-10">
                        <Button
                          type="button"
                          onClick={prevStep}
                          disabled={currentStep === 0}
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <ArrowLeft className="h-4 w-4" /> Back
                        </Button>
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="bg-slate-800 hover:bg-slate-700 flex items-center gap-2"
                        >
                          Next <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-5 sm:p-8 rounded-xl shadow-sm border border-slate-100">
                      <h3 className="text-xl font-semibold text-slate-800 mb-6">
                        Complete Your Assessment
                      </h3>

                      <div className="grid gap-6 sm:grid-cols-2 mb-6">
                        <div className="space-y-2">
                          <Label htmlFor="step-name" className="text-slate-700">
                            Full Name
                          </Label>
                          <Input
                            id="step-name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-slate-200"
                            placeholder="Enter your name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="step-email"
                            className="text-slate-700"
                          >
                            Email Address
                          </Label>
                          <Input
                            id="step-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-slate-200"
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg mb-6">
                        <h4 className="font-medium text-slate-700 mb-3">
                          Your Assessment Summary
                        </h4>
                        {/* <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-600">
                            Average Score:
                          </span>
                          <div className="flex items-center">
                            <span className="font-bold text-slate-800 mr-2">
                              {averageScore.toFixed(1)}
                            </span>
                            <Progress
                              value={scorePercentage}
                              className="w-24 h-2"
                            />
                          </div>
                        </div> */}
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          {BON_DIMENSIONS.map((dimension, index) => (
                            <div
                              key={dimension.name}
                              className="text-center p-2 bg-white rounded border border-slate-100"
                            >
                              <div className="text-xs text-slate-500">
                                {dimension.name}
                              </div>
                              <div className="font-bold text-slate-800">
                                {sliders[index]}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          onClick={prevStep}
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <ArrowLeft className="h-4 w-4" /> Back
                        </Button>
                        <Button
                          type="submit"
                          className="bg-slate-800 hover:bg-slate-700"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit Assessment"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {formType === "single-page" && (
                <>
                  <div className="bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-100">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">
                      Your Information
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-700">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="border-slate-200"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-700">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="border-slate-200"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-5 sm:py-6 text-lg bg-slate-800 hover:bg-slate-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Assessment"}
                  </Button>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
