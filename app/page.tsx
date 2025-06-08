'use client'

import { HeroSection } from "@/components/hero-section-1";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  // State for user input and prediction result
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Placeholder submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Prediction failed");
      }

      const data = await response.json();
      setResult(
        `Prediction: ${data.label === "real" ? "Real" : "Fake"} (${Math.round(data.confidence * 100)}% confidence)`
      );
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HeroSection />
      <section id="detector" className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-background/80">
        <div className="container max-w-3xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Fake News Detector</h2>
            <p className="text-muted-foreground text-lg">
              Enter any news article or headline below to check its authenticity
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="news-input" className="font-semibold text-lg block text-left">
                News Content
              </label>
              <textarea
                id="news-input"
                className="w-full min-h-[200px] rounded-xl border bg-background/50 backdrop-blur-sm p-4 text-base focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Paste your news article or headline here..."
                value={input}
                onChange={e => setInput(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              size="lg" 
              disabled={loading || !input}
              className="w-full"
            >
              {loading ? "Analyzing..." : "Check Authenticity"}
            </Button>
          </form>

          {error && (
            <div className="mt-8 p-6 rounded-xl border bg-destructive/10 text-destructive text-center">
              <p className="text-lg font-medium">{error}</p>
            </div>
          )}
          
          {result && (
            <div className="mt-8 p-6 rounded-xl border bg-muted/50 backdrop-blur-sm text-center">
              <p className="text-xl font-medium">{result}</p>
            </div>
          )}
        </div>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="max-w-3xl mx-auto px-4 py-16">
        <div className="rounded-2xl bg-muted/40 shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8 text-center">How it works</h2>
          <ol className="space-y-8 relative border-l-2 border-primary/20 pl-6">
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow">
                1
              </span>
              <div>
                <b>Input:</b> Paste a news headline or article into the input box.
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow">
                2
              </span>
              <div>
                <b>AI Analysis:</b> Our backend uses a fine-tuned DistilBERT transformer model, trained on thousands of real and fake news samples, to analyze the text.
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow">
                3
              </span>
              <div>
                <b>Prediction:</b> The model predicts whether the news is “Real” or “Fake” and provides a confidence score.
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow">
                4
              </span>
              <div>
                <b>Result:</b> Instantly see the result and use it to make informed decisions about the information you encounter online.
              </div>
            </li>
          </ol>
          <p className="mt-8 text-center text-muted-foreground italic">
            TrustNet AI does not store your input. All analysis is performed securely and privately.
          </p>
        </div>
      </section>

      {/* About section */}
      <section id="about" className="max-w-3xl mx-auto px-4 py-16">
        <div className="rounded-2xl bg-muted/40 shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8 text-center">About</h2>
          <div className="space-y-6">
            <div>
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold mb-2">Mission</span>
              <p className="text-lg">
                To empower individuals, journalists, and organizations to quickly verify the authenticity of news using state-of-the-art AI.
              </p>
            </div>
            <div>
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold mb-2">Technology</span>
              <p className="text-lg">
                TrustNet AI leverages transformer-based models (DistilBERT) and the FakeNewsNet dataset, combining cutting-edge NLP with a user-friendly web interface.
              </p>
            </div>
            <div>
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold mb-2">Open Source</span>
              <p className="text-lg">
                The project is fully open source and welcomes contributions from the community.{" "}
                <a href="https://github.com/your-repo" className="underline text-primary" target="_blank" rel="noopener noreferrer">
                  GitHub Repository
                </a>
              </p>
            </div>
            <div>
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold mb-2">Disclaimer</span>
              <p className="text-lg">
                No AI model is perfect. TrustNet AI is a tool to assist in news verification, not a substitute for critical thinking or professional fact-checking.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
