import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Volume2, Sparkles } from "lucide-react";

export default function TextGenWithSpeech() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [listening, setListening] = useState(false);
  const recognition = typeof window !== 'undefined' && 'webkitSpeechRecognition' in window
    ? new webkitSpeechRecognition()
    : null;

  const handleSpeechToText = () => {
    if (!recognition) return alert("Speech recognition not supported");

    recognition.lang = 'en-US';
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
  };

  const handleGenerateText = () => {
    // Dummy model response, replace with real API call
    setOutputText("Generated response based on: " + inputText);
  };

  const handlePlayOutput = () => {
    const utterance = new SpeechSynthesisUtterance(outputText);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex items-center justify-center">
      <Card className="w-full max-w-3xl shadow-xl p-6 rounded-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Text Generator with Speech</h1>

        <div className="flex gap-2 mb-4">
          <Button onClick={handleSpeechToText} variant="secondary" className="flex items-center gap-2">
            <Mic className="w-4 h-4" /> {listening ? "Listening..." : "Speak"}
          </Button>
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or use mic..."
            className="flex-grow"
          />
          <Button onClick={handleGenerateText} className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700">
            <Sparkles className="w-4 h-4" /> Generate
          </Button>
        </div>

        <CardContent className="bg-white rounded-xl border p-4">
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-semibold text-gray-700">Generated Text</h2>
            <Button onClick={handlePlayOutput} size="sm" variant="ghost" className="text-blue-600 hover:text-blue-800">
              <Volume2 className="w-5 h-5" />
            </Button>
          </div>
          <Textarea
            value={outputText}
            onChange={(e) => setOutputText(e.target.value)}
            placeholder="Generated output will appear here"
            rows={6}
            className="mt-2"
          />
        </CardContent>
      </Card>
    </div>
  );
}
