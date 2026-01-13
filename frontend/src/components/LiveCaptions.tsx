import { motion, AnimatePresence } from "framer-motion";

interface LiveCaptionsProps {
  transcript: string;
  isRecording: boolean;
  isFinal?: boolean;
}

export function LiveCaptions({ transcript, isRecording, isFinal }: LiveCaptionsProps) {
  if (!isRecording && !transcript) return null;

  return (
    <AnimatePresence>
      {(isRecording || transcript) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-40"
        >
          <div className="bg-black/80 backdrop-blur-md text-white p-4 rounded-xl shadow-2xl border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-slate-500'}`} />
              <span className="text-[10px] uppercase font-bold tracking-wider text-white/50">
                {isRecording ? 'Live Transcription' : 'Final Transcript'}
              </span>
            </div>
            <p className={`text-lg leading-snug ${isFinal ? 'text-white' : 'text-white/80'}`}>
              {transcript || (isRecording ? "Listening..." : "")}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
