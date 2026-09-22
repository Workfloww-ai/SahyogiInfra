import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, Sparkles } from "lucide-react";
import QRCode from "react-qr-code";
import React, { useState, useEffect } from "react";

export default function AppPopup({ onJoinUs }: { onJoinUs: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Mobile Overlay only (desktop remains interactable) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate/40 backdrop-blur-sm z-[1000] md:hidden"
            onClick={() => setIsVisible(false)}
          />

          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-24 right-4 md:right-8 w-[calc(100%-2rem)] md:w-[380px] bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate/5 z-[1001] overflow-hidden flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-sage hover:text-slate bg-sand hover:bg-slate/5 rounded-full p-2 transition-colors z-20"
              aria-label="Close popup"
            >
              <X size={20} />
            </button>

            {/* Header Section */}
            <div className="pt-10 px-8 text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-moss/5 rounded-full border border-moss/10 text-[10px] font-bold uppercase tracking-widest text-moss mb-4">
                New Release
              </div>
              <h3 className="text-2xl font-black mb-2 text-slate tracking-tight">
                Get the <span className="italic"><span className="text-moss">Sah</span><span className="text-clay">Yogi</span> App</span>
              </h3>
              <p className="text-sage text-sm font-sans leading-relaxed px-4">
                Find flexible opportunities instantly.
              </p>
            </div>

            {/* Beautiful QR Code Section */}
            <div className="px-8 py-8 flex justify-center relative">
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-moss/5 rounded-full blur-2xl"></div>

              <div className="relative p-6 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate/5 group">
                {/* Scanner Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-moss/30 rounded-tl-3xl transition-colors group-hover:border-clay/50"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-moss/30 rounded-tr-3xl transition-colors group-hover:border-clay/50"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-moss/30 rounded-bl-3xl transition-colors group-hover:border-clay/50"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-moss/30 rounded-br-3xl transition-colors group-hover:border-clay/50"></div>

                {/* QR Code */}
                <div className="relative z-10 p-1.5 bg-white rounded-lg shadow-sm">
                  <QRCode
                    value="https://play.google.com/store/apps/details?id=com.workfloww.sahyogi&hl=en_IN"
                    size={110}
                    fgColor="#0b5b31"
                  />
                </div>

                {/* Animated Scanner Laser */}
                <motion.div
                  animate={{ y: [0, 116, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="absolute top-6 left-6 right-6 h-[2px] bg-clay shadow-[0_0_12px_rgba(237,28,36,0.8)] z-20"
                />
              </div>
            </div>

            {/* Action Section */}
            <div className="px-8 pb-8 pt-2">
              <span className="text-[10px] block text-center uppercase tracking-[0.2em] text-sage font-bold mb-4 font-sans">
                Scan to Download
              </span>
              <button
                onClick={() => {
                  setIsVisible(false);
                  onJoinUs();
                }}
                className="w-full bg-clay text-white py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-bold hover:bg-moss transition-colors shadow-lg hover:shadow-moss/20 flex items-center justify-center gap-3 group"
              >
                Explore App Features <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
