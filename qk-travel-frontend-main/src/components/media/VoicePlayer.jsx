import React, { useState, useEffect, useRef } from "react";
import useDialog from "../../hooks/useDialog";
import AlertDialog from "../common/AlertDialog";

const VoicePlayer = ({ text, textEn, audioUrl = null }) => {
  const [playing, setPlaying] = useState(false);
  // const [showSettings, setShowSettings] = useState(false); // Settings disabled
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const language = "vi"; // Default language fixed to Vietnamese
  const rate = 1.1;
  const pitch = 1;
  const naturalSpeech = true;
  const shouldStopRef = useRef(false);
  const timeoutIdsRef = useRef([]);
  const { alertDialog, showAlert, hideDialog } = useDialog();

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      selectVoiceByLanguage(language, availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    if (voices.length > 0) {
      selectVoiceByLanguage(language, voices);
    }
  }, [language, voices]);

  const selectVoiceByLanguage = (lang, availableVoices) => {
    let selectedVoice = null;

    if (lang === "vi") {
      const femaleViVoices = availableVoices.filter((v) => {
        const isVietnamese = v.lang.includes("vi") || v.lang === "vi-VN";
        const isFemale =
          v.name.toLowerCase().includes("female") ||
          v.name.toLowerCase().includes("woman") ||
          v.name.toLowerCase().includes("nữ") ||
          v.name.toLowerCase().includes("cô");
        return isVietnamese && isFemale;
      });

      if (femaleViVoices.length > 0) {
        selectedVoice = femaleViVoices[0];
      } else {
        const viVoices = availableVoices.filter(
          (v) => v.lang.includes("vi") || v.lang === "vi-VN",
        );
        selectedVoice = viVoices.length > 0 ? viVoices[0] : availableVoices[0];
      }
    } else if (lang === "en") {
      const enVoices = availableVoices.filter(
        (v) =>
          v.lang.includes("en-US") ||
          v.lang.includes("en-GB") ||
          v.lang.includes("en"),
      );
      selectedVoice = enVoices.length > 0 ? enVoices[0] : availableVoices[0];
    }

    setSelectedVoice(selectedVoice);
  };

  const processTextForNaturalSpeech = (inputText) => {
    if (!naturalSpeech) return inputText;

    let processedText = inputText;
    processedText = processedText.replace(/([.!?])\s+/g, "$1 ");

    return processedText;
  };

  const speakWithVariation = (inputText, langCode) => {
    const allSentences = inputText
      .split(/(?<=[.!?])\s+/)
      .filter((s) => s.trim());
    const chunks = [];
    for (let i = 0; i < allSentences.length; i += 2) {
      const chunk = allSentences.slice(i, i + 2).join(" ");
      if (chunk.trim()) chunks.push(chunk);
    }

    let currentIndex = 0;

    const speakNextChunk = () => {
      if (shouldStopRef.current) {
        shouldStopRef.current = false;
        setPlaying(false);
        return;
      }

      if (currentIndex >= chunks.length) {
        setPlaying(false);
        timeoutIdsRef.current.forEach(clearTimeout);
        timeoutIdsRef.current = [];
        return;
      }

      const chunk = chunks[currentIndex].trim();
      if (!chunk) {
        currentIndex++;
        speakNextChunk();
        return;
      }

      const utter = new SpeechSynthesisUtterance(chunk);
      utter.lang = langCode;
      utter.rate = rate;
      utter.pitch = pitch;

      const variation = (Math.random() - 0.5) * 0.1;
      utter.pitch = Math.max(0.5, Math.min(pitch + variation, 2));
      utter.rate = Math.max(0.5, Math.min(rate + variation * 0.3, 2));

      if (selectedVoice) {
        utter.voice = selectedVoice;
      }

      utter.onend = () => {
        if (shouldStopRef.current) {
          shouldStopRef.current = false;
          setPlaying(false);
          return;
        }
        currentIndex++;
        const timeoutId = setTimeout(speakNextChunk, 100);
        timeoutIdsRef.current.push(timeoutId);
      };

      utter.onerror = () => {
        currentIndex++;
        speakNextChunk();
      };

      window.speechSynthesis.speak(utter);
    };

    speakNextChunk();
  };

  const handlePlay = async () => {
    shouldStopRef.current = false;
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];

    const currentText = language === "en" ? textEn || text : text;
    const langCode = language === "en" ? "en-US" : "vi-VN";

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      setPlaying(true);
      audio.play();
      audio.onended = () => setPlaying(false);
    } else if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setPlaying(true);

      if (naturalSpeech) {
        const processedText = processTextForNaturalSpeech(currentText || "");
        speakWithVariation(processedText, langCode);
      } else {
        const utter = new SpeechSynthesisUtterance(currentText || "");
        utter.lang = langCode;
        utter.rate = rate;
        utter.pitch = pitch;
        if (selectedVoice) {
          utter.voice = selectedVoice;
        }
        utter.onend = () => setPlaying(false);
        window.speechSynthesis.speak(utter);
      }
    } else {
      showAlert({
        title: "Không hỗ trợ",
        message: "Trình duyệt của bạn không hỗ trợ SpeechSynthesis.",
        type: "error",
      });
    }
  };

  const handleStop = () => {
    shouldStopRef.current = true;

    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setPlaying(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <button
          onClick={() => (playing ? handleStop() : handlePlay())}
          className={`px-4 py-2 rounded-lg border transition-colors text-sm font-medium ${
            playing
              ? "bg-red-600 text-white border-red-600"
              : "bg-white text-gray-800 border-gray-300 hover:border-primary-500"
          }`}
          title="Nghe chuyện AI"
        >
          <i className={`fas ${playing ? "fa-stop" : "fa-volume-up"} mr-2`}></i>
          {playing ? "Dừng" : "Nghe chuyện"}
        </button>
      </div>

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={alertDialog.show}
        onClose={hideDialog}
        type={alertDialog.type}
        title={alertDialog.title}
        message={alertDialog.message}
        buttonText={alertDialog.buttonText}
      />
    </div>
  );
};

export default VoicePlayer;
