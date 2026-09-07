import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipForward,
  SkipBack,
  Subtitles,
  FileText,
  Layers,
  ChevronRight,
  Info,
} from 'lucide-react';
import { VIDEO_CHAPTERS, VIDEO_TOTAL_DURATION, VideoChapter } from '../../data/videoScriptData';
import { VideoSceneGraphics } from './VideoSceneGraphics';

interface AnimatedVideoPlayerProps {
  onOpenScriptModal: () => void;
  onNavigateToAppTab?: (tab: string) => void;
}

export const AnimatedVideoPlayer: React.FC<AnimatedVideoPlayerProps> = ({
  onOpenScriptModal,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isVoiceoverEnabled, setIsVoiceoverEnabled] = useState<boolean>(true);
  const [isSubtitlesEnabled, setIsSubtitlesEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpokenChapterIdRef = useRef<number | null>(null);
  const isSpeakingRef = useRef<boolean>(false);

  // Find active chapter based on current time
  const currentChapterIndex = VIDEO_CHAPTERS.findIndex((chap, index) => {
    const nextChap = VIDEO_CHAPTERS[index + 1];
    if (!nextChap) return true;
    return currentTime >= chap.startTimeSeconds && currentTime < nextChap.startTimeSeconds;
  });

  const activeChapter: VideoChapter = VIDEO_CHAPTERS[currentChapterIndex !== -1 ? currentChapterIndex : 0];

  // Calculate chapter relative progress 0 to 1
  const chapterElapsed = currentTime - activeChapter.startTimeSeconds;
  const chapterProgress = Math.max(0, Math.min(1, chapterElapsed / activeChapter.durationSeconds));

  // Find active subtitle line
  const activeSubtitle = activeChapter.subtitles.find(
    (sub) => currentTime >= sub.start && currentTime <= sub.end
  );

  // Initialize Speech Synthesis voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        // Prefer natural English voices
        const naturalVoice =
          voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel'))) ||
          voices.find((v) => v.lang.startsWith('en')) ||
          voices[0] ||
          null;
        setSelectedVoice(naturalVoice);
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Voiceover narration triggers when chapter changes or unpauses
  useEffect(() => {
    if (!isVoiceoverEnabled || !isPlaying || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    // Only speak once per chapter enter
    if (lastSpokenChapterIdRef.current !== activeChapter.id) {
      window.speechSynthesis.cancel();
      lastSpokenChapterIdRef.current = activeChapter.id;

      const utterance = new SpeechSynthesisUtterance(activeChapter.narration);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.rate = playbackSpeed;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        isSpeakingRef.current = true;
      };

      utterance.onend = () => {
        isSpeakingRef.current = false;
      };

      utterance.onerror = () => {
        isSpeakingRef.current = false;
      };

      window.speechSynthesis.speak(utterance);
    }
  }, [activeChapter.id, isPlaying, isVoiceoverEnabled, playbackSpeed, selectedVoice]);

  // Playback timer engine
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + 0.2 * playbackSpeed;
        if (next >= VIDEO_TOTAL_DURATION) {
          setIsPlaying(false);
          if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
          }
          return VIDEO_TOTAL_DURATION;
        }
        return next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (currentTime >= VIDEO_TOTAL_DURATION) {
      setCurrentTime(0);
      lastSpokenChapterIdRef.current = null;
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    lastSpokenChapterIdRef.current = null;
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleSeek = (newTime: number) => {
    const boundedTime = Math.max(0, Math.min(VIDEO_TOTAL_DURATION, newTime));
    setCurrentTime(boundedTime);

    // Find new chapter
    const newChap = VIDEO_CHAPTERS.find((c, idx) => {
      const nextC = VIDEO_CHAPTERS[idx + 1];
      if (!nextC) return true;
      return boundedTime >= c.startTimeSeconds && boundedTime < nextC.startTimeSeconds;
    });

    if (newChap && newChap.id !== activeChapter.id) {
      lastSpokenChapterIdRef.current = null;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleSkip = (deltaSeconds: number) => {
    handleSeek(currentTime + deltaSeconds);
  };

  const handleJumpToChapter = (chapter: VideoChapter) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    lastSpokenChapterIdRef.current = null;
    setCurrentTime(chapter.startTimeSeconds);
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Video Box (16:9 Aspect Ratio Container) */}
      <div
        ref={containerRef}
        className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl shadow-slate-950/80 aspect-video max-h-[680px] flex flex-col group select-none"
      >
        {/* Animated Scene Graphic Layer */}
        <div className="relative flex-1 w-full h-full overflow-hidden">
          <VideoSceneGraphics
            currentChapter={activeChapter}
            playbackProgress={chapterProgress}
            globalTimeSeconds={currentTime}
          />

          {/* Subtitles Overlay */}
          {isSubtitlesEnabled && activeSubtitle && (
            <div className="absolute bottom-16 left-4 right-4 text-center pointer-events-none z-30 transition-all">
              <div className="inline-block max-w-2xl px-4 py-2 rounded-xl bg-slate-950/90 text-slate-100 text-xs sm:text-sm font-medium border border-slate-700/80 shadow-2xl backdrop-blur-md">
                <span className="text-emerald-400 font-bold mr-2">
                  [{activeChapter.badge.split('·')[0].trim()}]
                </span>
                {activeSubtitle.text}
              </div>
            </div>
          )}

          {/* Big Play Overlay Button when Paused */}
          {!isPlaying && (
            <div
              onClick={handlePlayPause}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer z-20 group/btn transition-all"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-500/90 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/40 group-hover/btn:scale-110 group-hover/btn:bg-emerald-400 transition-transform">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Video Player Control Bar */}
        <div className="relative z-30 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-4 py-3 flex flex-col gap-2">
          {/* Chapter Scrubber Bar */}
          <div className="relative flex items-center w-full">
            <input
              type="range"
              min={0}
              max={VIDEO_TOTAL_DURATION}
              step={0.5}
              value={currentTime}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all"
            />
          </div>

          {/* Chapter Markers on Scrubber */}
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 px-1">
            {VIDEO_CHAPTERS.map((chap) => (
              <button
                key={chap.id}
                onClick={() => handleJumpToChapter(chap)}
                className={`truncate max-w-[120px] transition-colors ${
                  activeChapter.id === chap.id ? 'text-emerald-400 font-bold' : 'hover:text-slate-300'
                }`}
                title={`${chap.title} (${formatTime(chap.startTimeSeconds)})`}
              >
                {chap.id}. {chap.title.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Main Controls Row */}
          <div className="flex items-center justify-between pt-1">
            {/* Left Controls: Play, Skip, Time */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handlePlayPause}
                title={isPlaying ? 'Pause' : 'Play'}
                className="w-9 h-9 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center transition-colors font-bold shadow-md shadow-emerald-950"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <button
                onClick={handleRestart}
                title="Restart Video"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center justify-center transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleSkip(-10)}
                title="Skip back 10s"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center justify-center transition-colors"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleSkip(10)}
                title="Skip forward 10s"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center justify-center transition-colors"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>

              {/* Time Display */}
              <div className="text-xs font-mono text-slate-300 ml-1">
                <span className="text-emerald-400 font-bold">{formatTime(currentTime)}</span>
                <span className="text-slate-500"> / {formatTime(VIDEO_TOTAL_DURATION)}</span>
              </div>
            </div>

            {/* Middle Badge (Current Chapter Info) */}
            <div className="hidden lg:flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-medium">
                {activeChapter.badge}
              </span>
              <span className="text-slate-400 max-w-xs truncate font-medium">
                {activeChapter.title}
              </span>
            </div>

            {/* Right Controls: Narration, Speed, Subtitles, Script, Fullscreen */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Voiceover Speech Toggle */}
              <button
                onClick={() => {
                  if (isVoiceoverEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                  }
                  setIsVoiceoverEnabled(!isVoiceoverEnabled);
                }}
                title={isVoiceoverEnabled ? 'Mute AI Voiceover Narration' : 'Enable AI Voiceover Narration'}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors border ${
                  isVoiceoverEnabled
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800/60'
                    : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}
              >
                {isVoiceoverEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>

              {/* Subtitles Toggle */}
              <button
                onClick={() => setIsSubtitlesEnabled(!isSubtitlesEnabled)}
                title={isSubtitlesEnabled ? 'Hide Subtitles' : 'Show Subtitles'}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors border ${
                  isSubtitlesEnabled
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-800/60'
                    : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}
              >
                <Subtitles className="w-3.5 h-3.5" />
              </button>

              {/* Speed Selector */}
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                title="Playback Speed"
                aria-label="Playback Speed"
                className="bg-slate-900 text-slate-300 border border-slate-800 rounded-lg text-xs px-2 py-1.5 focus:outline-none focus:border-emerald-500"
              >
                <option value={0.75}>0.75x</option>
                <option value={1.0}>1.0x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={2.0}>2.0x</option>
              </select>

              {/* Full Narrative Script Modal Trigger */}
              <button
                onClick={onOpenScriptModal}
                title="View Full Script & Whitepaper"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-purple-400" />
                <span>Script & Specs</span>
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center justify-center transition-colors"
              >
                {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Selection Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {VIDEO_CHAPTERS.map((chapter) => {
          const isCurrent = chapter.id === activeChapter.id;
          return (
            <button
              key={chapter.id}
              onClick={() => handleJumpToChapter(chapter)}
              className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isCurrent
                  ? 'bg-slate-900 border-emerald-500/80 shadow-lg shadow-emerald-950/40 text-slate-100'
                  : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:bg-slate-900/80 hover:text-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className={isCurrent ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                    0{chapter.id} · {formatTime(chapter.startTimeSeconds)}
                  </span>
                  {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                </div>
                <div className="text-xs font-bold line-clamp-2 leading-snug">{chapter.title}</div>
              </div>
              <div className="mt-2 text-[10px] text-slate-500 truncate">
                {chapter.durationSeconds}s runtime
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
