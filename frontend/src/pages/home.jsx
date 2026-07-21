
// import React, { useState, useEffect } from "react";

// /**
//  * پرو اے آئی — pixel-matched recreation
//  * Static display data below is MOCK — wire it up to real state/props/API as needed.
//  * Auth + trial countdown read live from localStorage (see useAuthGuard / useTrialCountdown below).
//  */
// const MOCK = {
//   notifCount: 16,
//   userInitials: "RC",
//   players: "1,256",
//   premiumPrice: "₹199",
//   nextReminder: "09:32",
//   betTime: "--",
//   signalScore: 0,
// };

// const AUTH_TOKEN_KEY = "proai_token";
// const AUTH_TOKEN_EXPIRY_KEY = "proai_token_expiry";
// const AUTH_USER_KEY = "proai_user";
// const LOGIN_PATH = "/login";

// /** Reads + validates the session on mount; redirects to login if missing/expired. */
// function useAuthGuard() {
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem(AUTH_TOKEN_KEY);
//     const expiry = Number(localStorage.getItem(AUTH_TOKEN_EXPIRY_KEY));

//     const isValid = Boolean(token) && Boolean(expiry) && Date.now() < expiry;

//     if (!isValid) {
//       window.location.href = LOGIN_PATH;
//       return;
//     }
//     setReady(true);
//   }, []);

//   return ready;
// }

// /** Ticks every second off `trialEndsAt` in the stored user object. */
// function useTrialCountdown() {
//   const [label, setLabel] = useState("--h --m");
//   const [expired, setExpired] = useState(false);

//   useEffect(() => {
//     let raw;
//     try {
//       raw = JSON.parse(localStorage.getItem(AUTH_USER_KEY) || "null");
//     } catch {
//       raw = null;
//     }
//     const endsAt = raw?.trialEndsAt ? new Date(raw.trialEndsAt).getTime() : null;
//     if (!endsAt) return;

//     const tick = () => {
//       const diff = endsAt - Date.now();
//       if (diff <= 0) {
//         setLabel("Trial ended");
//         setExpired(true);
//         return;
//       }
//       const h = Math.floor(diff / 3_600_000);
//       const m = Math.floor((diff % 3_600_000) / 60_000);
//       const s = Math.floor((diff % 60_000) / 1_000);
//       setLabel(`${h}h ${m}m ${s}s`);
//     };

//     tick();
//     const id = setInterval(tick, 1000);
//     return () => clearInterval(id);
//   }, []);

//   return { label, expired };
// }

// /** Randomly drifts the active-players count up/down every couple seconds. */
// function useLivePlayers(base = 1256, min = 1150, max = 1400) {
//   const [count, setCount] = useState(base);

//   useEffect(() => {
//     const id = setInterval(() => {
//       setCount((prev) => {
//         const delta = Math.floor(Math.random() * 21) - 10; // -10..+10
//         return Math.min(max, Math.max(min, prev + delta));
//       });
//     }, 2200);
//     return () => clearInterval(id);
//   }, [min, max]);

//   return count;
// }

// // Point this at your own local dummy API — e.g. https://api.ai-pro-bot.com/nextcrash2
// // It should return JSON like: { "value": 54.53, "time": "15:50" }
// const NEXT_CRASH_API_URL = "https://api.ai-pro-bot.com/nextcrash2";
// // const NEXT_CRASH_API_URL = "http://localhost:5000";


// /** Converts "HH:mm" (24h) to "h:mm AM/PM". Falls back to the raw string if it can't parse. */
// function formatTo12Hour(timeStr) {
//   if (!timeStr || !timeStr.includes(":")) return timeStr;
//   const [hStr, mStr] = timeStr.split(":");
//   let h = parseInt(hStr, 10);
//   const m = mStr.padStart(2, "0");
//   if (Number.isNaN(h)) return timeStr;
//   const period = h >= 12 ? "PM" : "AM";
//   h = h % 12;
//   if (h === 0) h = 12;
//   return `${h}:${m} ${period}`;
// }

// /** Animates the signal-score number counting up fast to a given (or random) target. */
// function useSignalScoreSpin(initial = 1) {
//   const [score, setScore] = useState(initial);
//   const [spinning, setSpinning] = useState(false);
//   const [attempt, setAttempt] = useState(0);
//   const rafRef = React.useRef(null);

//   const spin = (explicitTarget) => {
//     if (rafRef.current) cancelAnimationFrame(rafRef.current);

//     const target =
//       typeof explicitTarget === "number" && !Number.isNaN(explicitTarget)
//         ? explicitTarget
//         : +(Math.random() * 95 + 1).toFixed(2); // fallback: 1.00x .. 96.00x
//     const startVal = 1;
//     const duration = 900; // ms — fast, no pause mid-way
//     const startTime = performance.now();

//     setSpinning(true);
//     setAttempt((a) => a + 1);

//     const frame = (now) => {
//       const progress = Math.min((now - startTime) / duration, 1);
//       const eased = 1 - Math.pow(1 - progress, 2); // ease-out, keeps climbing, no stall
//       const current = startVal + (target - startVal) * eased;
//       setScore(current);

//       if (progress < 1) {
//         rafRef.current = requestAnimationFrame(frame);
//       } else {
//         setScore(target);
//         setSpinning(false);
//       }
//     };

//     rafRef.current = requestAnimationFrame(frame);
//   };

//   React.useEffect(() => () => rafRef.current && cancelAnimationFrame(rafRef.current), []);

//   return { score, spinning, spin, attempt };
// }

// const ChevronLeftIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//     <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const ChipIcon = () => (
//   <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
//     <rect x="10" y="10" width="20" height="20" rx="3" stroke="#4ADE80" strokeWidth="2" />
//     <rect x="15" y="15" width="10" height="10" rx="1.5" stroke="#4ADE80" strokeWidth="1.6" />
//     {[6, 14, 22, 30].map((y) => (
//       <React.Fragment key={y}>
//         <line x1="2" y1={y} x2="10" y2={y} stroke="#4ADE80" strokeWidth="2" />
//         <line x1="30" y1={y} x2="38" y2={y} stroke="#4ADE80" strokeWidth="2" />
//       </React.Fragment>
//     ))}
//     {[6, 14, 22, 30].map((x) => (
//       <React.Fragment key={x}>
//         <line x1={x} y1="2" x2={x} y2="10" stroke="#4ADE80" strokeWidth="2" />
//         <line x1={x} y1="30" x2={x} y2="38" stroke="#4ADE80" strokeWidth="2" />
//       </React.Fragment>
//     ))}
//   </svg>
// );

// const PeopleIcon = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="#0B3B1E">
//     <circle cx="12" cy="8" r="3.4" fill="#0B3B1E" />
//     <path d="M5 20c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2" fill="#0B3B1E" />
//     <circle cx="5.2" cy="9.5" r="2.4" fill="#0B3B1E" opacity="0.001" />
//   </svg>
// );

// const ClockIcon = ({ color = "#4ADE80", size = 20 }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//     <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
//     <path d="M12 7v5l3.2 2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
//   </svg>
// );

// const CrownIcon = ({ size = 20 }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="#F5B93B">
//     <path d="M3 8l4 3 5-6 5 6 4-3-2 10H5L3 8z" />
//   </svg>
// );

// const BellIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
//     <path d="M12 2a6 6 0 00-6 6v3.2c0 .7-.3 1.4-.8 1.9L4 15h16l-1.2-2C18.3 12.6 18 11.9 18 11.2V8a6 6 0 00-6-6z" />
//     <path d="M9.5 18a2.5 2.5 0 005 0z" />
//   </svg>
// );

// const TrendUpIcon = () => (
//   <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
//     <path d="M3 17l5-5 4 4 8-9" stroke="#4ADE80" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M15 7h5v5" stroke="#4ADE80" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const PlayIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
//     <path d="M6 4l14 8-14 8V4z" />
//   </svg>
// );

// const ArrowRightIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//     <path d="M4 12h16M13 5l7 7-7 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const InfoIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="black">
//     <circle cx="12" cy="12" r="10" fill="none" />
//     <text x="12" y="16" textAnchor="middle" fontSize="14" fontWeight="700" fill="black">i</text>
//   </svg>
// );

// const PaperclipIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M8 12.5l6.5-6.5a3 3 0 114.2 4.2l-8 8a5 5 0 01-7-7l7.5-7.5"
//       stroke="#8A8A8A"
//       strokeWidth="1.7"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const HalfCircleIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24">
//     <circle cx="12" cy="12" r="9" fill="none" stroke="#8A8A8A" strokeWidth="1.6" />
//     <path d="M12 3a9 9 0 010 18z" fill="#8A8A8A" />
//   </svg>
// );

// const MicIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//     <rect x="9" y="3" width="6" height="11" rx="3" stroke="#8A8A8A" strokeWidth="1.6" />
//     <path d="M5 11a7 7 0 0014 0M12 18v3" stroke="#8A8A8A" strokeWidth="1.6" strokeLinecap="round" />
//   </svg>
// );

// const CheckIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
//     <path d="M5 12.5l4.5 4.5L19 7" stroke="#0B3B1E" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const PREMIUM_PERKS = [
//   "Uncapped AI Signal Score, every round",
//   "Instant bet-time alerts, no delay",
//   "Priority access to live player data",
// ];

// /** Full-screen professional paywall shown once the free trial has ended. */
// function UpgradeScreen() {
//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#000",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         fontFamily:
//           "'SF Pro Display','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
//         padding: "24px 18px",
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           maxWidth: 360,
//           textAlign: "center",
//           animation: "upgradeEnter 0.5s ease both",
//         }}
//       >
//         <div
//           style={{
//             fontSize: 13,
//             fontWeight: 700,
//             letterSpacing: 1.5,
//             color: "white",
//             marginBottom: 26,

//           }}
//         >
//           پرو اے آئی
//         </div>

//         <div
//           style={{
//             width: 84,
//             height: 84,
//             margin: "0 auto 22px",
//             borderRadius: "50%",
//             background: "radial-gradient(circle, rgba(34,197,94,0.18), rgba(0,0,0,0))",
//             border: "1px solid rgba(74,222,128,0.4)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             boxShadow: "0 0 40px rgba(34,197,94,0.35)",
//           }}
//         >
//           <div style={{ animation: "crownFloat 2.6s ease-in-out infinite" }}>
//             <CrownIcon size={38} />
//           </div>
//         </div>

//         <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 10px", letterSpacing: -0.3 }}>
//           Your Free Trial Has Ended
//         </h1>
//         <p style={{ fontSize: 14.5, color: "#9CA3AF", lineHeight: 1.5, margin: "0 0 26px" }}>
//           Upgrade to Premium to keep using the AI Signal Engine and everything that comes with it.
//         </p>

//         <div
//           style={{
//             border: "1px solid rgba(74,222,128,0.45)",
//             borderRadius: 20,
//             background: "#050805",
//             boxShadow: "0 0 24px rgba(34,197,94,0.15)",
//             padding: "22px 20px",
//             marginBottom: 20,
//           }}
//         >
//           <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 6, marginBottom: 4 }}>
//             <span style={{ fontSize: 34, fontWeight: 800 }}>PkR599</span>
//             <span style={{ fontSize: 14, color: "#9CA3AF" }}>/ month</span>
//           </div>
//           <div style={{ fontSize: 12.5, color: "#4ADE80", marginBottom: 18 }}>Cancel anytime, no lock-in</div>

//           <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
//             {PREMIUM_PERKS.map((perk) => (
//               <div key={perk} style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                 <div
//                   style={{
//                     width: 20,
//                     height: 20,
//                     borderRadius: "50%",
//                     background: "#4ADE80",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     flexShrink: 0,
//                   }}
//                 >
//                   <CheckIcon />
//                 </div>
//                 <span style={{ fontSize: 13.5, color: "#E5E7EB" }}>{perk}</span>
//               </div>
//             ))}
//           </div>

//           <button
//             style={{
//               width: "100%",
//               border: "none",
//               borderRadius: 14,
//               padding: "14px 0",
//               background: "linear-gradient(180deg, #2E8B4E 0%, #1B5E33 100%)",
//               color: "white",
//               fontWeight: 700,
//               fontSize: 15.5,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: 8,
//               cursor: "pointer",
//               boxShadow: "0 6px 20px rgba(34,197,94,0.35)",
//             }}
//           >
//             <CrownIcon size={17} /> Upgrade to Premium
//           </button>
//         </div>

//         <p style={{ fontSize: 11.5, color: "#6B7280" }}>Secure payment · Billed monthly · Cancel anytime</p>
//       </div>
//     </div>
//   );
// }

// /* ---------- layout building blocks ---------- */

// const Card = ({ children, style }) => (
//   <div
//     style={{
//       border: "1px solid rgba(74,222,128,0.45)",
//       borderRadius: 20,
//       background: "#050805",
//       boxShadow: "0 0 18px rgba(34,197,94,0.12), inset 0 0 30px rgba(34,197,94,0.03)",
//       padding: "14px 16px",
//       ...style,
//     }}
//   >
//     {children}
//   </div>
// );

// export default function ProAiBotUI() {
//   const [message, setMessage] = useState("");
//   const authReady = useAuthGuard();
//   const { label: trialLabel, expired: trialExpired } = useTrialCountdown();
//   const players = useLivePlayers();
//   const { score: signalScore, spinning, spin: spinSignalScore, attempt: spinAttempt } = useSignalScoreSpin();
//   const [betTime, setBetTime] = useState(MOCK.betTime);
//   const [betTimeIsClock, setBetTimeIsClock] = useState(false);
//   const [loadingNext, setLoadingNext] = useState(false);
//   const [fetchError, setFetchError] = useState(null);
//     const [showVideo, setShowVideo] = useState(false);


//   // const handleNext = async () => {
//   //   setFetchError(null);
//   //   setLoadingNext(true);
//   //   try {
//   //     const res = await fetch(NEXT_CRASH_API_URL);
//   //     if (!res.ok) throw new Error(`Request failed: ${res.status}`);
//   //     const data = await res.json(); // expected: { value: 54.53, time: "15:50" }

//   //     if (typeof data.value === "number") spinSignalScore(data.value);
//   //     if (typeof data.time === "string") {
//   //       setBetTime(formatTo12Hour(data.time));
//   //       setBetTimeIsClock(true);
//   //     }
//   //   } catch (err) {
//   //     console.error("nextcrash2 fetch failed:", err);
//   //     setFetchError("Couldn't reach the API — showing a random value instead.");
//   //     spinSignalScore(); // fallback to a random spin so the UI still feels alive
//   //   } finally {
//   //     setLoadingNext(false);
//   //   }
//   // };


//   const handleNext = async () => {
//     setFetchError(null);
//     setLoadingNext(true);

//     try {
//       const res = await fetch(NEXT_CRASH_API_URL);

//       if (!res.ok) throw new Error(`Request failed: ${res.status}`);

//       const data = await res.json(); // { value, time }

//       const now = new Date();

//       const currentMinutes = now.getHours() * 60 + now.getMinutes();

//       const [h, m] = data.time.split(":").map(Number);

//       const apiMinutes = h * 60 + m;

//       const remaining = apiMinutes - currentMinutes;

//       if (remaining > 7) {
//         setBetTime("-");
//         setBetTimeIsClock(false);

//         spinSignalScore(0);

//         return;
//       }

//       // Normal Flow
//       spinSignalScore(Number(data.value));

//       setBetTime(formatTo12Hour(data.time));
//       setBetTimeIsClock(true);

//     } catch (err) {
//       console.error("nextcrash2 fetch failed:", err);

//       setFetchError("Couldn't reach the API — showing a random value instead.");

//       spinSignalScore();

//     } finally {
//       setLoadingNext(false);
//     }
//   };

//   // While the auth check runs (and while it's redirecting), render nothing.
//   if (!authReady) return null;

//   return (
//     <>
//       <style>{`
//         @keyframes timerGlow {
//           0%, 100% { text-shadow: 0 0 6px rgba(255,255,255,0.35), 0 0 14px rgba(34,197,94,0.25); }
//           50%      { text-shadow: 0 0 14px rgba(255,255,255,0.9), 0 0 30px rgba(34,197,94,0.75); }
//         }
//         @keyframes labelFade {
//           0%, 100% { opacity: 0.75; }
//           50%      { opacity: 1; }
//         }
//         @keyframes dotPulse {
//           0%   { box-shadow: 0 0 0 0 rgba(74,222,128,0.65); }
//           70%  { box-shadow: 0 0 0 7px rgba(74,222,128,0); }
//           100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
//         }
//         @keyframes playerBump {
//           0%   { transform: scale(1.18); color: #ffffff; }
//           100% { transform: scale(1); color: inherit; }
//         }
//         @keyframes bellRing3d {
//           0%, 100%      { transform: perspective(300px) rotate3d(0,0,1,0deg); }
//           4%            { transform: perspective(300px) rotate3d(0,0,1,18deg) rotateY(10deg); }
//           8%            { transform: perspective(300px) rotate3d(0,0,1,-15deg) rotateY(-8deg); }
//           12%           { transform: perspective(300px) rotate3d(0,0,1,12deg) rotateY(6deg); }
//           16%           { transform: perspective(300px) rotate3d(0,0,1,-8deg) rotateY(-4deg); }
//           20%           { transform: perspective(300px) rotate3d(0,0,1,4deg); }
//           24%, 100%     { transform: perspective(300px) rotate3d(0,0,1,0deg); }
//         }
//         .timer-number { color: #ffffff; animation: timerGlow 1.8s ease-in-out infinite; }
//         .timer-label  { color: #ffffff; animation: labelFade 1.8s ease-in-out infinite; }
//         .live-dot     { animation: dotPulse 1.6s ease-out infinite; }
//         .bell-wrap    { display: inline-flex; transform-origin: top center; animation: bellRing3d 4s ease-in-out infinite; }
//         .score-spinning { color: #ffffff; text-shadow: 0 0 10px rgba(255,255,255,0.6), 0 0 28px rgba(34,197,94,0.85); }
//         @keyframes spinRipple {
//           0%   { transform: scale(0.55); opacity: 0.9; }
//           100% { transform: scale(1.45); opacity: 0; }
//         }
//         .spin-ripple {
//           position: absolute;
//           inset: -8px;
//           border-radius: 50%;
//           border: 2px solid rgba(74,222,128,0.85);
//           animation: spinRipple 0.9s ease-out forwards;
//           pointer-events: none;
//         }
//         @keyframes upgradeEnter {
//           0%   { opacity: 0; transform: translateY(16px) scale(0.97); }
//           100% { opacity: 1; transform: translateY(0) scale(1); }
//         }
//         @keyframes crownFloat {
//           0%, 100% { transform: translateY(0); }
//           50%      { transform: translateY(-6px); }
//         }
//       `}</style>
//       {false ? (
//         <UpgradeScreen />
//       ) : (
//         <div
//           style={{
//             background: "#000",
//             minHeight: "100vh",
//             display: "flex",
//             justifyContent: "center",
//             fontFamily:
//               "'SF Pro Display','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
//           }}
//         >
//           <div style={{ width: "100%", maxWidth: 390, padding: "14px 16px 18px", boxSizing: "border-box" }}>
//             {/* ---------- Header ---------- */}
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 8,
//                   border: "1.5px solid rgba(74,222,128,0.7)",
//                   borderRadius: 999,
//                   padding: "7px 8px 7px 14px",
//                   boxShadow: "0 0 10px rgba(34,197,94,0.35)",
//                 }}
//               >
//                 <ChevronLeftIcon />
//                 <div
//                   style={{
//                     background: "white",
//                     color: "black",
//                     fontWeight: 700,
//                     fontSize: 14,
//                     borderRadius: 999,
//                     minWidth: 26,
//                     height: 26,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     padding: "0 4px",
//                   }}
//                 >
//                   {MOCK.notifCount}
//                 </div>
//               </div>

//               <div style={{ textAlign: "center" }}>
//                 <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.1 }}>پرو اے آئی</div>
//                 <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 1 }}>بوٹ</div>
//               </div>

//               <div
//                 style={{
//                   width: 44,
//                   height: 44,
//                   borderRadius: 999,
//                   border: "2px solid #22C55E",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   color: "#4ADE80",
//                   fontWeight: 700,
//                   fontSize: 13,
//                   boxShadow: "0 0 12px rgba(34,197,94,0.5)",
//                 }}
//               >
//                 {MOCK.userInitials}
//               </div>
//             </div>

//             {/* ---------- AI Signal Engine / Players ---------- */}
//             <Card style={{ marginBottom: 12, padding: "16px 14px" }}>
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
//                   <div
//                     style={{
//                       width: 46,
//                       height: 46,
//                       borderRadius: 10,
//                       background: "#07130A",
//                       border: "1px solid rgba(74,222,128,0.4)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       flexShrink: 0,
//                     }}
//                   >
//                     <ChipIcon />
//                   </div>
//                   <div>
//                     <div style={{ fontSize: 10.5, fontWeight: 700, color: "#4ADE80", letterSpacing: 0.6 }}>
//                     اے آئی سگنل انجن
//                     </div>
//                     <div style={{ fontSize: 20, fontWeight: 800, margin: "1px 0" }}>Running</div>
//                     <div style={{ fontSize: 12, color: "#4ADE80", display: "flex", alignItems: "center", gap: 5 }}>
//                       <span className="live-dot" style={{ width: 6, height: 6, borderRadius: 999, background: "#4ADE80", display: "inline-block" }} />
//                       خودکار ریفریش
//                     </div>
//                   </div>
//                 </div>

//                 <div style={{ width: 1, alignSelf: "stretch", background: "rgba(74,222,128,0.25)", margin: "0 12px" }} />

//                 <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
//                   <div
//                     style={{
//                       width: 46,
//                       height: 46,
//                       borderRadius: 10,
//                       background: "#1E7A3B",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       flexShrink: 0,
//                     }}
//                   >
//                     <PeopleIcon />
//                   </div>
//                   <div>
//                     <div style={{ fontSize: 10.5, fontWeight: 700, color: "#4ADE80", letterSpacing: 0.6 }}>کھلاڑی</div>
//                     <div key={players} style={{ fontSize: 20, fontWeight: 800, margin: "1px 0", animation: "playerBump 0.5s ease", color: "white" }}>
//                       {players.toLocaleString()}
//                     </div>
//                     <div style={{ fontSize: 12, color: "#4ADE80", display: "flex", alignItems: "center", gap: 5 }}>
//                       <span className="live-dot" style={{ width: 6, height: 6, borderRadius: 999, background: "#4ADE80", display: "inline-block" }} />
//                      فعال
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Card>

//             {/* ---------- Free trial ---------- */}
//             <Card style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
//               <div style={{ display: "flex", gap: 10 }}>
//                 <div style={{ paddingTop: 2 }}>
//                   <ClockIcon />
//                 </div>
//                 <div>
//                   <div style={{ fontSize: 12.5, fontWeight: 700, color: "#4ADE80", letterSpacing: 0.4 }}>
// 24 گھنٹے کا مفت ٹرائل                  </div>
//                   <div style={{ fontSize: 13.5, color: "#D1D5DB", marginTop: 2, lineHeight: 1.35 }}>
// اگلے 24 گھنٹوں تک تمام فیچرز مفت استعمال کریں۔                  </div>
//                 </div>
//               </div>
//               <div
//                 style={{
//                   background: trialExpired ? "#7A1E1E" : "rgb(227 9 9 / 89%)",
//                   borderRadius: 12,
//                   padding: "8px 12px",
//                   textAlign: "center",
//                   flexShrink: 0,
//                 }}
//               >
//                 <div className="timer-number" style={{ fontSize: 15, fontWeight: 800, color: "#daff04" }}>{trialLabel}</div>
//                 <div className="timer-label" style={{ fontSize: 10.5, }}>
//                   {trialExpired ? "upgrade to continue" : "باقی وقت"}
//                 </div>
//               </div>
//             </Card>

//                  <Card
//         style={{
//           marginBottom: 12,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           gap: 10,
//         }}
//       >
//         <div style={{ display: "flex", gap: 10 }}>
//           <div style={{ paddingTop: 2 }}>
//             <ClockIcon />
//           </div>

//           <div>
//             <div
//               style={{
//                 fontSize: 12.5,
//                 fontWeight: 700,
//                 color: "#4ADE80",
//                 letterSpacing: 0.4,
//               }}
//             >
//               اے آئی پرو بوٹ کیسے کام کرتا ہے؟
//             </div>

//             <div
//               style={{
//                 fontSize: 13.5,
//                 color: "#D1D5DB",
//                 marginTop: 2,
//                 lineHeight: 1.35,
//               }}
//             >
//              یہ مختصر ویڈیو دیکھیں اور طریقہ کار سمجھیں۔
//             </div>
//           </div>
//         </div>

//         <div
//           onClick={() => setShowVideo(true)}
//           style={{
//             background: "yellow",
//             borderRadius: 12,
//             padding: "8px 12px",
//             textAlign: "center",
//             flexShrink: 0,
//             cursor: "pointer",
//           }}
//         >
//           <div
//             className="timer-number"
//             style={{
//               fontSize: 15,
//               fontWeight: 800,
//               color: "black",
//             }}
//           >
//             <i className="fa fa-tv"></i> Watch Video
//           </div>
//         </div>
//       </Card>

//             {/* ---------- Premium ---------- */}
//             {/* <Card style={{ marginBottom: 12 }}>
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
//                 <div style={{ display: "flex", gap: 10 }}>
//                   <div style={{ paddingTop: 2 }}>
//                     <CrownIcon />
//                   </div>
//                   <div>
//                     <div style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: 0.4 }}>BUY PREMIUM</div>
//                     <div style={{ fontSize: 13.5, color: "#D1D5DB", marginTop: 2, lineHeight: 1.35, maxWidth: 190 }}>
//                       After your free trial, continue with Premium Plan.
//                     </div>
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     background: "#1E7A3B",
//                     borderRadius: 12,
//                     padding: "8px 12px",
//                     textAlign: "center",
//                     flexShrink: 0,
//                   }}
//                 >
//                   <div style={{ fontSize: 15, fontWeight: 800 }}>{MOCK.premiumPrice}</div>
//                   <div style={{ fontSize: 10.5, color: "#BBF7D0" }}>per month</div>
//                 </div>
//               </div>

//               <button
//                 style={{
//                   width: "100%",
//                   marginTop: 12,
//                   border: "none",
//                   borderRadius: 14,
//                   padding: "13px 0",
//                   background: "linear-gradient(180deg, #2E8B4E 0%, #1B5E33 100%)",
//                   color: "white",
//                   fontWeight: 700,
//                   fontSize: 14.5,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: 8,
//                   cursor: "pointer",
//                 }}
//               >
//                 <CrownIcon size={17} /> Upgrade to Premium
//               </button>
//             </Card> */}

//             {/* ---------- Next reminder ---------- */}
//             {/* <Card style={{ marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             <div
//               style={{
//                 width: 40,
//                 height: 40,
//                 borderRadius: 10,
//                 background: "#1E7A3B",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexShrink: 0,
//               }}
//             >
//               <span className="bell-wrap"><BellIcon /></span>
//             </div>
//             <div>
//               <div style={{ fontSize: 13.5 }}>NEXT SINGLE REMINDER</div>
//               <div style={{ fontSize: 13.5, color: "#4ADE80" }}>Next single in:</div>
//             </div>
//           </div>
//           <div style={{ textAlign: "right" }}>
//             <div className="timer-number" style={{ fontSize: 19, fontWeight: 800 }}>{MOCK.nextReminder}</div>
//             <div className="timer-label" style={{ fontSize: 11.5 }}>minutes</div>
//           </div>
//         </Card> */}

//             {/* ---------- Bet time gauge ---------- */}
//             <div style={{ position: "relative", height: 78, marginTop: 4 }}>
//               <svg width="100%" height="78" viewBox="0 0 358 78" style={{ position: "absolute", top: 0, left: 0 }}>
//                 {/* left arm */}
//                 <path d="M0 39 H100" stroke="#22C55E" strokeWidth="1.4" opacity="0.7" />
//                 <path d="M18 20 V58 M40 26 V52" stroke="#22C55E" strokeWidth="1.4" opacity="0.55" />
//                 {/* right arm */}
//                 <path d="M258 39 H358" stroke="#22C55E" strokeWidth="1.4" opacity="0.7" />
//                 <path d="M340 20 V58 M318 26 V52" stroke="#22C55E" strokeWidth="1.4" opacity="0.55" />
//               </svg>
//               <div
//                 style={{
//                   position: "absolute",
//                   left: "50%",
//                   top: 0,
//                   transform: "translateX(-50%)",
//                   width: 168,
//                   height: 78,
//                   borderRadius: 999,
//                   border: "1.5px solid #22C55E",
//                   background: "#000",
//                   boxShadow: "0 0 22px rgba(34,197,94,0.55)",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <div style={{ fontSize: 11, color: "#4ADE80", display: "flex", alignItems: "center", gap: 4 }}>
//                   <ClockIcon size={12} /> بیٹ کا وقت
//                 </div>
//                 <div className="timer-number" style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.2 }}>{betTime}</div>
//                 <div className="timer-label" style={{ fontSize: 10.5 }}>
//                   {betTimeIsClock ? "اگلا کریش" : "منٹ"}
//                 </div>
//               </div>
//             </div>

//             {/* ---------- Signal score circle ---------- */}
//             <div style={{ display: "flex", justifyContent: "center", padding: "18px 0 22px" }}>
//               <div style={{ position: "relative", width: 260, height: 260 }}>
//                 {spinning && <div key={spinAttempt} className="spin-ripple" />}
//                 {/* dotted outer ring */}
//                 <svg width="260" height="260" style={{ position: "absolute", inset: 0 }}>
//                   <circle
//                     cx="130"
//                     cy="130"
//                     r="126"
//                     fill="none"
//                     stroke="#2E8B4E"
//                     strokeWidth="2"
//                     strokeDasharray="1.5 7"
//                   />
//                 </svg>
//                 {/* glow ring */}
//                 <div
//                   style={{
//                     position: "absolute",
//                     inset: 10,
//                     borderRadius: "50%",
//                     border: "5px solid #22C55E",
//                     boxShadow: spinning
//                       ? "0 0 65px rgba(34,197,94,0.95), inset 0 0 65px rgba(34,197,94,0.55)"
//                       : "0 0 45px rgba(34,197,94,0.65), inset 0 0 45px rgba(34,197,94,0.35)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                 />
//                 {/* inner dark circle */}
//                 <div
//                   style={{
//                     position: "absolute",
//                     inset: 26,
//                     borderRadius: "50%",
//                     background: "#000",
//                     border: "1px solid rgba(74,222,128,0.4)",
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     gap: 4,
//                   }}
//                 >
//                   <TrendUpIcon />
//                   {signalScore.toFixed(2) > 1 && <div className={spinning ? "score-spinning" : ""} style={{ fontSize: 40, fontWeight: 800, color: "yellow" }}>
//                     {signalScore.toFixed(2)}x
//                   </div>}
//                   {signalScore.toFixed(2) == 0 && <div className={spinning ? "score-spinning" : ""} style={{ fontSize: 20, fontWeight: 800, color: "yellow" }}>
//                     براہِ کرم کچھ دیر انتظار کریں
//                   </div>}
//                   {signalScore.toFixed(2) == 1 && <div className={spinning ? "score-spinning" : ""} style={{ fontSize: 20, fontWeight: 800, color: "yellow" }}>
//                     اگلا بٹن دبائیں
//                   </div>}
//                   <div style={{ fontSize: 14, color: "#4ADE80" }}>سگنل اسکور</div>
//                 </div>
//               </div>
//             </div>

//             {/* ---------- Play / Next ---------- */}
//             <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
// <button
//   onClick={() => window.open("https://real-cash365.club", "_blank")}                  style={{

//                 flex: 1,
//                 border: "none",
//                 borderRadius: 16,
//                 padding: "15px 0",
//                 background: "linear-gradient(180deg, #2E8B4E 0%, #1B5E33 100%)",
//                 color: "white",
//                 fontWeight: 700,
//                 fontSize: 16,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: 8,
//                 cursor: "pointer",
//               }}
//           >
//                 <PlayIcon /> کھیلیں
//               </button>
//               <button
//                 onClick={handleNext}
//                 disabled={loadingNext}
//                 style={{
//                   flex: 1,
//                   border: "none",
//                   borderRadius: 16,
//                   padding: "15px 0",
//                   background: "linear-gradient(180deg, #2E8B4E 0%, #1B5E33 100%)",
//                   color: "white",
//                   fontWeight: 700,
//                   fontSize: 16,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: 8,
//                   cursor: loadingNext ? "wait" : "pointer",
//                   opacity: loadingNext ? 0.7 : 1,
//                 }}
//               >
//                 <ArrowRightIcon /> {loadingNext ? "لوڈ ہو رہا ہے..." : "اگلا"}
//               </button>
//             </div>

//             {fetchError && (
//               <div style={{ color: "#F87171", fontSize: 12.5, textAlign: "center", marginTop: -4, marginBottom: 12 }}>
//                 {fetchError}
//               </div>
//             )}


//              {/* <Card style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
//               <div style={{ display: "flex", gap: 10 }}>
//                 <div style={{ paddingTop: 2 }}>
//                   <ClockIcon />
//                 </div>
//                 <div>
//                   <div style={{ fontSize: 12.5, fontWeight: 700, color: "#4ADE80", letterSpacing: 0.4 }}>
//                     How Ai Pro Bot Works ?
//                   </div>
//                   <div style={{ fontSize: 13.5, color: "#D1D5DB", marginTop: 2, lineHeight: 1.35 }}>
//                    Watch this short video to understand how it works.
//                   </div>
//                 </div>
//               </div>
//               <div
//                 style={{
//                   background: "yellow",
//                   borderRadius: 12,
//                   padding: "8px 12px",
//                   textAlign: "center",
//                   flexShrink: 0,
//                 }}
//               >
//                 <div className="timer-number" style={{ fontSize: 15, fontWeight: 800, color: "black" }}><i className="fa fas-tv"></i> Watch Video</div>
                
//               </div>
//             </Card> */}
       

//       {/* Video Modal */}
//       {showVideo && (
//         <div
//           onClick={() => setShowVideo(false)}
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             background: "rgba(0,0,0,0.8)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 9999,
//           }}
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             style={{
//               width: "90%",
//               maxWidth: 700,
//               background: "#000",
//               borderRadius: 10,
//               overflow: "hidden",
//             }}
//           >
//             <video
//   controls
//   playsInline
//   preload="metadata"
//   style={{ width: "100%" }}
//   autoPlay
// >
//   <source src="/video/newv.mp4" type="video/mp4" />
//   Your browser does not support the video tag.
// </video>

//             <div
//               style={{
//                 padding: 10,
//                 textAlign: "right",
//                 background: "#111",
//               }}
//             >
//               <button
//                 onClick={() => setShowVideo(false)}
//                 style={{
//                   padding: "8px 18px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

           
//             {/* ---------- Footer info ---------- */}
//             <div
//               style={{
//                 border: "1px solid rgba(74,222,128,0.3)",
//                 borderRadius: 16,
//                 padding: "12px 14px",
//                 display: "flex",
//                 alignItems: "flex-start",
//                 gap: 10,
//                 marginBottom: 12,
//               }}
//             >
//               <div
//                 style={{
//                   width: 20,
//                   height: 20,
//                   borderRadius: 999,
//                   background: "#1E7A3B",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   flexShrink: 0,
//                   marginTop: 1,
//                 }}
//               >
//                 <span style={{ fontSize: 12, fontWeight: 800, color: "white" }}>i</span>
//               </div>
//               <div style={{ fontSize: 13.5, color: "#D1D5DB", lineHeight: 1.4 }}>
//                 Use all features while your free trial is active. Upgrade anytime to continue.
//               </div>
//             </div>

//             {/* ---------- Message input ---------- */}
          
//           </div>

          
//         </div>
//       )}
//     </>
//   );
// }





import React, { useState, useEffect } from "react";
import InstallButton from "./component/installButton";

/**
 * PRO Ai — pixel-matched recreation
 * Static display data below is MOCK — wire it up to real state/props/API as needed.
 * Auth + trial countdown read live from localStorage (see useAuthGuard / useTrialCountdown below).
 */
const MOCK = {
  notifCount: 16,
  userInitials: "RC",
  players: "1,256",
  premiumPrice: "₹199",
  nextReminder: "09:32",
  betTime: "--",
  signalScore: 0,
};

const AUTH_TOKEN_KEY = "proai_token";
const AUTH_TOKEN_EXPIRY_KEY = "proai_token_expiry";
const AUTH_USER_KEY = "proai_user";
const LOGIN_PATH = "/login";

/** Reads + validates the session on mount; redirects to login if missing/expired. */
// function useAuthGuard() {
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem(AUTH_TOKEN_KEY);
//     const expiry = Number(localStorage.getItem(AUTH_TOKEN_EXPIRY_KEY));

//     const isValid = Boolean(token) && Boolean(expiry) && Date.now() < expiry;

//     if (!isValid) {
//       window.location.href = LOGIN_PATH;
//       return;
//     }
//     setReady(true);
//   }, []);

//   return ready;
// }

/** Ticks every second off `trialEndsAt` in the stored user object. */
function useTrialCountdown() {
  const [label, setLabel] = useState("--h --m");
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    let raw;
    try {
      raw = JSON.parse(localStorage.getItem(AUTH_USER_KEY) || "null");
    } catch {
      raw = null;
    }
    const endsAt = raw?.trialEndsAt ? new Date(raw.trialEndsAt).getTime() : null;
    if (!endsAt) return;

    const tick = () => {
      const diff = endsAt - Date.now();
      if (diff <= 0) {
        setLabel("Trial ended");
        setExpired(true);
        return;
      }
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1_000);
      setLabel(`${h}h ${m}m ${s}s`);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return { label, expired };
}

/** Randomly drifts the active-players count up/down every couple seconds. */
function useLivePlayers(base = 1256, min = 1150, max = 1400) {
  const [count, setCount] = useState(base);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => {
        const delta = Math.floor(Math.random() * 21) - 10; // -10..+10
        return Math.min(max, Math.max(min, prev + delta));
      });
    }, 2200);
    return () => clearInterval(id);
  }, [min, max]);

  return count;
}

// Point this at your own local dummy API — e.g. https://api.ai-pro-bot.com/nextcrash2
// It should return JSON like: { "value": 54.53, "time": "15:50" }
const NEXT_CRASH_API_URL = "https://api.akamster.com/nextcrash2";
// const NEXT_CRASH_API_URL = "http://localhost:5000";


/** Converts "HH:mm" (24h) to "h:mm AM/PM". Falls back to the raw string if it can't parse. */
function formatTo12Hour(timeStr) {
  if (!timeStr || !timeStr.includes(":")) return timeStr;
  const [hStr, mStr] = timeStr.split(":");
  let h = parseInt(hStr, 10);
  const m = mStr.padStart(2, "0");
  if (Number.isNaN(h)) return timeStr;
  const period = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${period}`;
}

/** Animates the signal-score number counting up fast to a given (or random) target. */
function useSignalScoreSpin(initial = 1) {
  const [score, setScore] = useState(initial);
  const [spinning, setSpinning] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const rafRef = React.useRef(null);

  const spin = (explicitTarget) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const target =
      typeof explicitTarget === "number" && !Number.isNaN(explicitTarget)
        ? explicitTarget
        : +(Math.random() * 95 + 1).toFixed(2); // fallback: 1.00x .. 96.00x
    const startVal = 1;
    const duration = 900; // ms — fast, no pause mid-way
    const startTime = performance.now();

    setSpinning(true);
    setAttempt((a) => a + 1);

    const frame = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2); // ease-out, keeps climbing, no stall
      const current = startVal + (target - startVal) * eased;
      setScore(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        setScore(target);
        setSpinning(false);
      }
    };

    rafRef.current = requestAnimationFrame(frame);
  };

  React.useEffect(() => () => rafRef.current && cancelAnimationFrame(rafRef.current), []);

  return { score, spinning, spin, attempt };
}

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChipIcon = () => (
  <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
    <rect x="10" y="10" width="20" height="20" rx="3" stroke="#4ADE80" strokeWidth="2" />
    <rect x="15" y="15" width="10" height="10" rx="1.5" stroke="#4ADE80" strokeWidth="1.6" />
    {[6, 14, 22, 30].map((y) => (
      <React.Fragment key={y}>
        <line x1="2" y1={y} x2="10" y2={y} stroke="#4ADE80" strokeWidth="2" />
        <line x1="30" y1={y} x2="38" y2={y} stroke="#4ADE80" strokeWidth="2" />
      </React.Fragment>
    ))}
    {[6, 14, 22, 30].map((x) => (
      <React.Fragment key={x}>
        <line x1={x} y1="2" x2={x} y2="10" stroke="#4ADE80" strokeWidth="2" />
        <line x1={x} y1="30" x2={x} y2="38" stroke="#4ADE80" strokeWidth="2" />
      </React.Fragment>
    ))}
  </svg>
);

const PeopleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#0B3B1E">
    <circle cx="12" cy="8" r="3.4" fill="#0B3B1E" />
    <path d="M5 20c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2" fill="#0B3B1E" />
    <circle cx="5.2" cy="9.5" r="2.4" fill="#0B3B1E" opacity="0.001" />
  </svg>
);

const ClockIcon = ({ color = "#4ADE80", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
    <path d="M12 7v5l3.2 2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const CrownIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#F5B93B">
    <path d="M3 8l4 3 5-6 5 6 4-3-2 10H5L3 8z" />
  </svg>
);

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M12 2a6 6 0 00-6 6v3.2c0 .7-.3 1.4-.8 1.9L4 15h16l-1.2-2C18.3 12.6 18 11.9 18 11.2V8a6 6 0 00-6-6z" />
    <path d="M9.5 18a2.5 2.5 0 005 0z" />
  </svg>
);

const TrendUpIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <path d="M3 17l5-5 4 4 8-9" stroke="#4ADE80" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 7h5v5" stroke="#4ADE80" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
    <path d="M6 4l14 8-14 8V4z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M4 12h16M13 5l7 7-7 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="black">
    <circle cx="12" cy="12" r="10" fill="none" />
    <text x="12" y="16" textAnchor="middle" fontSize="14" fontWeight="700" fill="black">i</text>
  </svg>
);

const PaperclipIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M8 12.5l6.5-6.5a3 3 0 114.2 4.2l-8 8a5 5 0 01-7-7l7.5-7.5"
      stroke="#8A8A8A"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HalfCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" fill="none" stroke="#8A8A8A" strokeWidth="1.6" />
    <path d="M12 3a9 9 0 010 18z" fill="#8A8A8A" />
  </svg>
);

const MicIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="9" y="3" width="6" height="11" rx="3" stroke="#8A8A8A" strokeWidth="1.6" />
    <path d="M5 11a7 7 0 0014 0M12 18v3" stroke="#8A8A8A" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M5 12.5l4.5 4.5L19 7" stroke="#0B3B1E" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PREMIUM_PERKS = [
  "Uncapped AI Signal Score, every round",
  "Instant bet-time alerts, no delay",
  "Priority access to live player data",
];

/** Full-screen professional paywall shown once the free trial has ended. */
function UpgradeScreen() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily:
          "'SF Pro Display','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
        padding: "24px 18px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 360,
          textAlign: "center",
          animation: "upgradeEnter 0.5s ease both",
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 1.5,
            color: "white",
            marginBottom: 26,

          }}
        >
          PRO Ai
        </div>

        <div
          style={{
            width: 84,
            height: 84,
            margin: "0 auto 22px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,197,94,0.18), rgba(0,0,0,0))",
            border: "1px solid rgba(74,222,128,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 40px rgba(34,197,94,0.35)",
          }}
        >
          <div style={{ animation: "crownFloat 2.6s ease-in-out infinite" }}>
            <CrownIcon size={38} />
          </div>
        </div>

        <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 10px", letterSpacing: -0.3 }}>
          Your Free Trial Has Ended
        </h1>
        <p style={{ fontSize: 14.5, color: "#9CA3AF", lineHeight: 1.5, margin: "0 0 26px" }}>
          Upgrade to Premium to keep using the AI Signal Engine and everything that comes with it.
        </p>

        <div
          style={{
            border: "1px solid rgba(74,222,128,0.45)",
            borderRadius: 20,
            background: "#050805",
            boxShadow: "0 0 24px rgba(34,197,94,0.15)",
            padding: "22px 20px",
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 34, fontWeight: 800 }}>₹199</span>
            <span style={{ fontSize: 14, color: "#9CA3AF" }}>/ month</span>
          </div>
          <div style={{ fontSize: 12.5, color: "#4ADE80", marginBottom: 18 }}>Cancel anytime, no lock-in</div>

          <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {PREMIUM_PERKS.map((perk) => (
              <div key={perk} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#4ADE80",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <CheckIcon />
                </div>
                <span style={{ fontSize: 13.5, color: "#E5E7EB" }}>{perk}</span>
              </div>
            ))}
          </div>

          <button
            style={{
              width: "100%",
              border: "none",
              borderRadius: 14,
              padding: "14px 0",
              background: "linear-gradient(180deg, #2E8B4E 0%, #1B5E33 100%)",
              color: "white",
              fontWeight: 700,
              fontSize: 15.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(34,197,94,0.35)",
            }}
          >
            <CrownIcon size={17} /> Upgrade to Premium
          </button>
        </div>

        <p style={{ fontSize: 11.5, color: "#6B7280" }}>Secure payment · Billed monthly · Cancel anytime</p>
      </div>
    </div>
  );
}

/* ---------- layout building blocks ---------- */

const Card = ({ children, style }) => (
  <div
    style={{
      border: "1px solid rgba(74,222,128,0.45)",
      borderRadius: 20,
      background: "#050805",
      boxShadow: "0 0 18px rgba(34,197,94,0.12), inset 0 0 30px rgba(34,197,94,0.03)",
      padding: "14px 16px",
      ...style,
    }}
  >
    {children}
  </div>
);

export default function ProAiBotUI() {
  const [message, setMessage] = useState("");
  // const authReady = useAuthGuard();
  const { label: trialLabel, expired: trialExpired } = useTrialCountdown();
  const players = useLivePlayers();
  const { score: signalScore, spinning, spin: spinSignalScore, attempt: spinAttempt } = useSignalScoreSpin();
  const [betTime, setBetTime] = useState(MOCK.betTime);
  const [betTimeIsClock, setBetTimeIsClock] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);
  const [fetchError, setFetchError] = useState(null);
    const [showVideo, setShowVideo] = useState(false);


  // const handleNext = async () => {
  //   setFetchError(null);
  //   setLoadingNext(true);
  //   try {
  //     const res = await fetch(NEXT_CRASH_API_URL);
  //     if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  //     const data = await res.json(); // expected: { value: 54.53, time: "15:50" }

  //     if (typeof data.value === "number") spinSignalScore(data.value);
  //     if (typeof data.time === "string") {
  //       setBetTime(formatTo12Hour(data.time));
  //       setBetTimeIsClock(true);
  //     }
  //   } catch (err) {
  //     console.error("nextcrash2 fetch failed:", err);
  //     setFetchError("Couldn't reach the API — showing a random value instead.");
  //     spinSignalScore(); // fallback to a random spin so the UI still feels alive
  //   } finally {
  //     setLoadingNext(false);
  //   }
  // };


  const handleNext = async () => {
    setFetchError(null);
    setLoadingNext(true);

    try {
      const res = await fetch(NEXT_CRASH_API_URL);

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const data = await res.json(); // { value, time }

      const now = new Date();

      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const [h, m] = data.time.split(":").map(Number);

      const apiMinutes = h * 60 + m;

      const remaining = apiMinutes - currentMinutes;

      if (remaining > 7) {
        setBetTime("-");
        setBetTimeIsClock(false);

        spinSignalScore(0);

        return;
      }

      // Normal Flow
      spinSignalScore(Number(data.value));

      setBetTime(formatTo12Hour(data.time));
      setBetTimeIsClock(true);

    } catch (err) {
      console.error("nextcrash2 fetch failed:", err);

      setFetchError("Couldn't reach the API — showing a random value instead.");

      spinSignalScore();

    } finally {
      setLoadingNext(false);
    }
  };

  // While the auth check runs (and while it's redirecting), render nothing.
  // if (!authReady) return null;

  return (
    <>
      <style>{`
        @keyframes timerGlow {
          0%, 100% { text-shadow: 0 0 6px rgba(255,255,255,0.35), 0 0 14px rgba(34,197,94,0.25); }
          50%      { text-shadow: 0 0 14px rgba(255,255,255,0.9), 0 0 30px rgba(34,197,94,0.75); }
        }
        @keyframes labelFade {
          0%, 100% { opacity: 0.75; }
          50%      { opacity: 1; }
        }
        @keyframes dotPulse {
          0%   { box-shadow: 0 0 0 0 rgba(74,222,128,0.65); }
          70%  { box-shadow: 0 0 0 7px rgba(74,222,128,0); }
          100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
        }
        @keyframes playerBump {
          0%   { transform: scale(1.18); color: #ffffff; }
          100% { transform: scale(1); color: inherit; }
        }
        @keyframes bellRing3d {
          0%, 100%      { transform: perspective(300px) rotate3d(0,0,1,0deg); }
          4%            { transform: perspective(300px) rotate3d(0,0,1,18deg) rotateY(10deg); }
          8%            { transform: perspective(300px) rotate3d(0,0,1,-15deg) rotateY(-8deg); }
          12%           { transform: perspective(300px) rotate3d(0,0,1,12deg) rotateY(6deg); }
          16%           { transform: perspective(300px) rotate3d(0,0,1,-8deg) rotateY(-4deg); }
          20%           { transform: perspective(300px) rotate3d(0,0,1,4deg); }
          24%, 100%     { transform: perspective(300px) rotate3d(0,0,1,0deg); }
        }
        .timer-number { color: #ffffff; animation: timerGlow 1.8s ease-in-out infinite; }
        .timer-label  { color: #ffffff; animation: labelFade 1.8s ease-in-out infinite; }
        .live-dot     { animation: dotPulse 1.6s ease-out infinite; }
        .bell-wrap    { display: inline-flex; transform-origin: top center; animation: bellRing3d 4s ease-in-out infinite; }
        .score-spinning { color: #ffffff; text-shadow: 0 0 10px rgba(255,255,255,0.6), 0 0 28px rgba(34,197,94,0.85); }
        @keyframes spinRipple {
          0%   { transform: scale(0.55); opacity: 0.9; }
          100% { transform: scale(1.45); opacity: 0; }
        }
        .spin-ripple {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 2px solid rgba(74,222,128,0.85);
          animation: spinRipple 0.9s ease-out forwards;
          pointer-events: none;
        }
        @keyframes upgradeEnter {
          0%   { opacity: 0; transform: translateY(16px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes crownFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
      `}</style>
      {false ? (
        <UpgradeScreen />
      ) : (
        <div
          style={{
            background: "#000",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            fontFamily:
              "'SF Pro Display','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
          }}
        >
          <div style={{ width: "100%", maxWidth: 390, padding: "14px 16px 18px", boxSizing: "border-box" }}>
            {/* ---------- Header ---------- */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  border: "1.5px solid rgba(74,222,128,0.7)",
                  borderRadius: 999,
                  padding: "7px 8px 7px 14px",
                  boxShadow: "0 0 10px rgba(34,197,94,0.35)",
                }}
              >
                <ChevronLeftIcon />
                <div
                  style={{
                    background: "white",
                    color: "black",
                    fontWeight: 700,
                    fontSize: 14,
                    borderRadius: 999,
                    minWidth: 26,
                    height: 26,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 4px",
                  }}
                >
                  {MOCK.notifCount}
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.1 }}>PRO Ai</div>
                <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 1 }}>bot</div>
              </div>

              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 999,
                  border: "2px solid #22C55E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#4ADE80",
                  fontWeight: 700,
                  fontSize: 13,
                  boxShadow: "0 0 12px rgba(34,197,94,0.5)",
                }}
              >
                {MOCK.userInitials}
              </div>
            </div>

            {/* ---------- AI Signal Engine / Players ---------- */}
            <Card style={{ marginBottom: 12, padding: "16px 14px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 10,
                      background: "#07130A",
                      border: "1px solid rgba(74,222,128,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <ChipIcon />
                  </div>
                  <div>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: "#4ADE80", letterSpacing: 0.6 }}>
                      AI SIGNAL ENGINE
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 800, margin: "1px 0" }}>Running</div>
                    <div style={{ fontSize: 12, color: "#4ADE80", display: "flex", alignItems: "center", gap: 5 }}>
                      <span className="live-dot" style={{ width: 6, height: 6, borderRadius: 999, background: "#4ADE80", display: "inline-block" }} />
                      Auto Refresh
                    </div>
                  </div>
                </div>

                <div style={{ width: 1, alignSelf: "stretch", background: "rgba(74,222,128,0.25)", margin: "0 12px" }} />

                <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 10,
                      background: "#1E7A3B",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <PeopleIcon />
                  </div>
                  <div>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: "#4ADE80", letterSpacing: 0.6 }}>PLAYERS</div>
                    <div key={players} style={{ fontSize: 20, fontWeight: 800, margin: "1px 0", animation: "playerBump 0.5s ease", color: "white" }}>
                      {players.toLocaleString()}
                    </div>
                    <div style={{ fontSize: 12, color: "#4ADE80", display: "flex", alignItems: "center", gap: 5 }}>
                      <span className="live-dot" style={{ width: 6, height: 6, borderRadius: 999, background: "#4ADE80", display: "inline-block" }} />
                      Active
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* ---------- Free trial ---------- */}
            <Card style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ paddingTop: 2 }}>
                  <ClockIcon />
                </div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: "#4ADE80", letterSpacing: 0.4 }}>
                    Install Our AI Avitor prediction Bot !
                  </div>
                  <div style={{ fontSize: 13.5, color: "#D1D5DB", marginTop: 2, lineHeight: 1.35 }}>
                    90 % Correct prediction ! Play Big Win Big¸
                  </div>
                </div>
              </div>
              {/* <div
                style={{
                  background: trialExpired ? "#7A1E1E" : "rgb(227 9 9 / 89%)",
                  borderRadius: 12,
                  padding: "8px 12px",
                  textAlign: "center",
                  flexShrink: 0,
                }}
              > */}
                {/* <div className="timer-number" style={{ fontSize: 15, fontWeight: 800, color: "#daff04" }}></div> */}
                {/* <div className="timer-label" style={{ fontSize: 10.5, }}>
                  {trialExpired ? "upgrade to continue" : "remaining"}
                </div> */}
                <InstallButton/>
              {/* </div> */}
            </Card>

                 <Card
        style={{
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ paddingTop: 2 }}>
            <ClockIcon />
          </div>

          <div>
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                color: "#4ADE80",
                letterSpacing: 0.4,
              }}
            >
              How Ai Pro Bot Works ?
            </div>

            <div
              style={{
                fontSize: 13.5,
                color: "#D1D5DB",
                marginTop: 2,
                lineHeight: 1.35,
              }}
            >
              Watch this short video to understand how it works.
            </div>
          </div>
        </div>

        <div
          onClick={() => setShowVideo(true)}
          style={{
            background: "yellow",
            borderRadius: 12,
            padding: "8px 12px",
            textAlign: "center",
            flexShrink: 0,
            cursor: "pointer",
          }}
        >
          <div
            className="timer-number"
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: "black",
            }}
          >
            <i className="fa fa-tv"></i> Watch Video
          </div>
        </div>
      </Card>

            {/* ---------- Premium ---------- */}
            {/* <Card style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ paddingTop: 2 }}>
                    <CrownIcon />
                  </div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: 0.4 }}>BUY PREMIUM</div>
                    <div style={{ fontSize: 13.5, color: "#D1D5DB", marginTop: 2, lineHeight: 1.35, maxWidth: 190 }}>
                      After your free trial, continue with Premium Plan.
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    background: "#1E7A3B",
                    borderRadius: 12,
                    padding: "8px 12px",
                    textAlign: "center",
                    flexShrink: 0,
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: 800 }}>{MOCK.premiumPrice}</div>
                  <div style={{ fontSize: 10.5, color: "#BBF7D0" }}>per month</div>
                </div>
              </div>

              <button
                style={{
                  width: "100%",
                  marginTop: 12,
                  border: "none",
                  borderRadius: 14,
                  padding: "13px 0",
                  background: "linear-gradient(180deg, #2E8B4E 0%, #1B5E33 100%)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 14.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  cursor: "pointer",
                }}
              >
                <CrownIcon size={17} /> Upgrade to Premium
              </button>
            </Card> */}

            {/* ---------- Next reminder ---------- */}
            {/* <Card style={{ marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#1E7A3B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span className="bell-wrap"><BellIcon /></span>
            </div>
            <div>
              <div style={{ fontSize: 13.5 }}>NEXT SINGLE REMINDER</div>
              <div style={{ fontSize: 13.5, color: "#4ADE80" }}>Next single in:</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="timer-number" style={{ fontSize: 19, fontWeight: 800 }}>{MOCK.nextReminder}</div>
            <div className="timer-label" style={{ fontSize: 11.5 }}>minutes</div>
          </div>
        </Card> */}

            {/* ---------- Bet time gauge ---------- */}
            <div style={{ position: "relative", height: 78, marginTop: 4 }}>
              <svg width="100%" height="78" viewBox="0 0 358 78" style={{ position: "absolute", top: 0, left: 0 }}>
                {/* left arm */}
                <path d="M0 39 H100" stroke="#22C55E" strokeWidth="1.4" opacity="0.7" />
                <path d="M18 20 V58 M40 26 V52" stroke="#22C55E" strokeWidth="1.4" opacity="0.55" />
                {/* right arm */}
                <path d="M258 39 H358" stroke="#22C55E" strokeWidth="1.4" opacity="0.7" />
                <path d="M340 20 V58 M318 26 V52" stroke="#22C55E" strokeWidth="1.4" opacity="0.55" />
              </svg>
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  transform: "translateX(-50%)",
                  width: 168,
                  height: 78,
                  borderRadius: 999,
                  border: "1.5px solid #22C55E",
                  background: "#000",
                  boxShadow: "0 0 22px rgba(34,197,94,0.55)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: 11, color: "#4ADE80", display: "flex", alignItems: "center", gap: 4 }}>
                  <ClockIcon size={12} /> Bet Time
                </div>
                <div className="timer-number" style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.2 }}>{betTime}</div>
                <div className="timer-label" style={{ fontSize: 10.5 }}>
                  {betTimeIsClock ? "next crash at" : "minutes"}
                </div>
              </div>
            </div>

            {/* ---------- Signal score circle ---------- */}
            <div style={{ display: "flex", justifyContent: "center", padding: "18px 0 22px" }}>
              <div style={{ position: "relative", width: 260, height: 260 }}>
                {spinning && <div key={spinAttempt} className="spin-ripple" />}
                {/* dotted outer ring */}
                <svg width="260" height="260" style={{ position: "absolute", inset: 0 }}>
                  <circle
                    cx="130"
                    cy="130"
                    r="126"
                    fill="none"
                    stroke="#2E8B4E"
                    strokeWidth="2"
                    strokeDasharray="1.5 7"
                  />
                </svg>
                {/* glow ring */}
                <div
                  style={{
                    position: "absolute",
                    inset: 10,
                    borderRadius: "50%",
                    border: "5px solid #22C55E",
                    boxShadow: spinning
                      ? "0 0 65px rgba(34,197,94,0.95), inset 0 0 65px rgba(34,197,94,0.55)"
                      : "0 0 45px rgba(34,197,94,0.65), inset 0 0 45px rgba(34,197,94,0.35)",
                    transition: "box-shadow 0.3s ease",
                  }}
                />
                {/* inner dark circle */}
                <div
                  style={{
                    position: "absolute",
                    inset: 26,
                    borderRadius: "50%",
                    background: "#000",
                    border: "1px solid rgba(74,222,128,0.4)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                  }}
                >
                  <TrendUpIcon />
                  {signalScore.toFixed(2) > 1 && <div className={spinning ? "score-spinning" : ""} style={{ fontSize: 40, fontWeight: 800, color: "yellow" }}>
                    {signalScore.toFixed(2)}x
                  </div>}
                  {signalScore.toFixed(2) == 0 && <div className={spinning ? "score-spinning" : ""} style={{ fontSize: 20, fontWeight: 800, color: "yellow" }}>
                    Wait For SomeTime !
                  </div>}
                  {signalScore.toFixed(2) == 1 && <div className={spinning ? "score-spinning" : ""} style={{ fontSize: 20, fontWeight: 800, color: "yellow" }}>
                    click on next!
                  </div>}
                  <div style={{ fontSize: 14, color: "#4ADE80" }}>Signal Score</div>
                </div>
              </div>
            </div>

            {/* ---------- Play / Next ---------- */}
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
<button
  onClick={() => window.open("https://real-cash365.club", "_blank")}                  style={{

                flex: 1,
                border: "none",
                borderRadius: 16,
                padding: "15px 0",
                background: "linear-gradient(180deg, #2E8B4E 0%, #1B5E33 100%)",
                color: "white",
                fontWeight: 700,
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: "pointer",
              }}
          >
                <PlayIcon /> Play
              </button>
              <button
                onClick={handleNext}
                disabled={loadingNext}
                style={{
                  flex: 1,
                  border: "none",
                  borderRadius: 16,
                  padding: "15px 0",
                  background: "linear-gradient(180deg, #2E8B4E 0%, #1B5E33 100%)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  cursor: loadingNext ? "wait" : "pointer",
                  opacity: loadingNext ? 0.7 : 1,
                }}
              >
                <ArrowRightIcon /> {loadingNext ? "Loading..." : "Next"}
              </button>
            </div>

            {fetchError && (
              <div style={{ color: "#F87171", fontSize: 12.5, textAlign: "center", marginTop: -4, marginBottom: 12 }}>
                {fetchError}
              </div>
            )}


             {/* <Card style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ paddingTop: 2 }}>
                  <ClockIcon />
                </div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: "#4ADE80", letterSpacing: 0.4 }}>
                    How Ai Pro Bot Works ?
                  </div>
                  <div style={{ fontSize: 13.5, color: "#D1D5DB", marginTop: 2, lineHeight: 1.35 }}>
                   Watch this short video to understand how it works.
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "yellow",
                  borderRadius: 12,
                  padding: "8px 12px",
                  textAlign: "center",
                  flexShrink: 0,
                }}
              >
                <div className="timer-number" style={{ fontSize: 15, fontWeight: 800, color: "black" }}><i className="fa fas-tv"></i> Watch Video</div>
                
              </div>
            </Card> */}
       

      {/* Video Modal */}
      {showVideo && (
        <div
          onClick={() => setShowVideo(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "90%",
              maxWidth: 700,
              background: "#000",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <video
  controls
  playsInline
  preload="metadata"
  style={{ width: "100%" }}
  autoPlay
>
  <source src="/video/newv.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

            <div
              style={{
                padding: 10,
                textAlign: "right",
                background: "#111",
              }}
            >
              <button
                onClick={() => setShowVideo(false)}
                style={{
                  padding: "8px 18px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

           
            {/* ---------- Footer info ---------- */}
            <div
              style={{
                border: "1px solid rgba(74,222,128,0.3)",
                borderRadius: 16,
                padding: "12px 14px",
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 999,
                  background: "#1E7A3B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 800, color: "white" }}>i</span>
              </div>
              <div style={{ fontSize: 13.5, color: "#D1D5DB", lineHeight: 1.4 }}>
                Use all features while your free trial is active. Upgrade anytime to continue.
              </div>
            </div>

            {/* ---------- Message input ---------- */}
          
          </div>

          
        </div>
      )}
    </>
  );
}