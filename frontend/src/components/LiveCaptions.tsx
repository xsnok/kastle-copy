import { motion, AnimatePresence } from "framer-motion";

interface LiveCaptionsProps {
  transcript: string;
  isRecording: boolean;
  isFinal?: boolean;
  error?: string | null;
}

export function LiveCaptions({ transcript, isRecording, isFinal, error }: LiveCaptionsProps) {
  if (!isRecording && !transcript && !error) return null;

  return (
    <AnimatePresence>
      {(isRecording || transcript || error) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-40"
        >
          <div className={`backdrop-blur-md p-4 rounded-xl shadow-2xl border ${error ? 'bg-red-900/80 border-red-500/50' : 'bg-black/80 border-white/10 text-white'}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : error ? 'bg-red-500' : 'bg-slate-500'}`} />
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-50">
                {error ? 'Error' : isRecording ? 'Live Transcription' : 'Final Transcript'}
              </span>
            </div>
            <p className={`text-lg leading-snug ${isFinal ? 'opacity-100' : 'opacity-80'}`}>
              {error || transcript || (isRecording ? "Listening..." : "")}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
