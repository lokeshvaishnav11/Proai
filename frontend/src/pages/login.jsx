// import React, { useState } from "react";

// const Login = () => {
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = () => {
//     // preserved hook point — wire up to your auth API
//     // e.g. AuthService.login({ phone, password })
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         width: "100%",
//         background: "#000000",
//         display: "flex",
//         justifyContent: "center",
//         padding: "24px 20px 40px",
//         fontFamily: "'Segoe UI', Roboto, sans-serif",
//         boxSizing: "border-box",
//       }}
//     >
//       <div style={{ width: "100%", maxWidth: 420, position: "relative" }}>
//         {/* Back button */}
//         <button
//           type="button"
//           onClick={() => window.history.back()}
//           style={{
//             width: 44,
//             height: 44,
//             borderRadius: "50%",
//             border: "1px solid #3a8f2e",
//             background: "transparent",
//             color: "#ffffff",
//             fontSize: 20,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             cursor: "pointer",
//             marginBottom: 10,
//           }}
//         >
//           ‹
//         </button>

//         {/* Title */}
//         <div style={{ textAlign: "center", marginTop: 4 }}>
//           <span style={{ fontSize: 34, fontWeight: 800, color: "#ffffff" }}>
//             PRO{" "}
//           </span>
//           <span
//             style={{
//               fontSize: 34,
//               fontWeight: 800,
//               color: "#7ed321",
//               textShadow: "0 0 18px rgba(126,211,33,0.6)",
//             }}
//           >
//             Ai
//           </span>
//           <div style={{ color: "#c9c9c9", fontSize: 16, marginTop: 2 }}>
//             bot
//           </div>
//         </div>

//         {/* Glowing robot avatar */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             margin: "10px 0 6px",
//           }}
//         >
//           <div
//             style={{
//               width: 220,
//               height: 220,
//               borderRadius: "50%",
//               position: "relative",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               background:
//                 "radial-gradient(circle, rgba(126,211,33,0.25) 0%, rgba(126,211,33,0.08) 45%, rgba(0,0,0,0) 70%)",
//             }}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 width: "100%",
//                 height: "100%",
//                 borderRadius: "50%",
//                 border: "1px solid rgba(126,211,33,0.35)",
//               }}
//             />
//             <div
//               style={{
//                 position: "absolute",
//                 width: "78%",
//                 height: "78%",
//                 borderRadius: "50%",
//                 border: "1px solid rgba(126,211,33,0.25)",
//               }}
//             />
//             <RobotIcon />
//           </div>
//         </div>

//         {/* Welcome text */}
//         <h1
//           style={{
//             color: "#ffffff",
//             fontSize: 26,
//             fontWeight: 800,
//             textAlign: "center",
//             margin: "6px 0 6px",
//           }}
//         >
//           Welcome Back!
//         </h1>
//         <p
//           style={{
//             color: "#9d9d9d",
//             fontSize: 14,
//             textAlign: "center",
//             margin: "0 0 24px",
//             lineHeight: 1.5,
//           }}
//         >
//           Login to your account and continue
//           <br />
//           using PRO Ai bot.
//         </p>

//         {/* Phone input */}
//         <InputField
//           icon={<PhoneIcon />}
//           placeholder="Phone Number"
//           type="tel"
//           value={phone}
//           onChange={setPhone}
//         />

//         {/* Password input */}
//         <InputField
//           icon={<LockIcon />}
//           placeholder="Password"
//           type={showPassword ? "text" : "password"}
//           value={password}
//           onChange={setPassword}
//           rightIcon={
//             <button
//               type="button"
//               onClick={() => setShowPassword((s) => !s)}
//               style={{
//                 background: "none",
//                 border: "none",
//                 cursor: "pointer",
//                 display: "flex",
//                 padding: 0,
//               }}
//             >
//               <EyeIcon off={!showPassword} />
//             </button>
//           }
//         />

//         {/* Forgot password */}
//         <div style={{ textAlign: "right", margin: "4px 0 20px" }}>
//           <a
//             href="/forgot-password"
//             style={{
//               color: "#7ed321",
//               fontSize: 13,
//               textDecoration: "none",
//             }}
//           >
//             Forgot Password?
//           </a>
//         </div>

//         {/* Login button */}
//         <button
//           type="button"
//           onClick={handleLogin}
//           style={{
//             width: "100%",
//             padding: "16px 0",
//             borderRadius: 12,
//             border: "none",
//             background: "linear-gradient(180deg, #7ed321 0%, #4c8f14 100%)",
//             color: "#ffffff",
//             fontSize: 17,
//             fontWeight: 700,
//             cursor: "pointer",
//             boxShadow: "0 8px 24px rgba(76,143,20,0.35)",
//           }}
//         >
//           Login
//         </button>

//         {/* Divider */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             margin: "22px 0",
//             gap: 12,
//           }}
//         >
//           <div style={{ flex: 1, height: 1, background: "#2a2a2a" }} />
//           <span style={{ color: "#8a8a8a", fontSize: 13 }}>or</span>
//           <div style={{ flex: 1, height: 1, background: "#2a2a2a" }} />
//         </div>

//         {/* Google login */}
//         <button
//           type="button"
//           style={{
//             width: "100%",
//             padding: "14px 0",
//             borderRadius: 12,
//             border: "1px solid #3a8f2e",
//             background: "transparent",
//             color: "#ffffff",
//             fontSize: 15,
//             fontWeight: 600,
//             cursor: "pointer",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 10,
//           }}
//         >
//           <GoogleIcon />
//           Login with Google
//         </button>

//         {/* Register link */}
//         <p
//           style={{
//             textAlign: "center",
//             color: "#c9c9c9",
//             fontSize: 14,
//             marginTop: 24,
//           }}
//         >
//           Don&apos;t have an account?{" "}
//           <a
//             href="/register"
//             style={{ color: "#7ed321", textDecoration: "none", fontWeight: 600 }}
//           >
//             Register
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// /* ---------- shared bits ---------- */

// const InputField = ({ icon, placeholder, type, value, onChange, rightIcon }) => (
//   <div
//     style={{
//       display: "flex",
//       alignItems: "center",
//       background: "#0e0e0e",
//       border: "1px solid #2a2a2a",
//       borderRadius: 12,
//       padding: "14px 16px",
//       marginBottom: 16,
//       gap: 12,
//     }}
//   >
//     {icon}
//     <input
//       type={type}
//       value={value}
//       placeholder={placeholder}
//       onChange={(e) => onChange(e.target.value)}
//       style={{
//         flex: 1,
//         background: "transparent",
//         border: "none",
//         outline: "none",
//         color: "#ffffff",
//         fontSize: 15,
//       }}
//     />
//     {rightIcon}
//   </div>
// );

// const PhoneIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z"
//       stroke="#7ed321"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const LockIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//     <rect x="4" y="10" width="16" height="10" rx="2" stroke="#7ed321" strokeWidth="1.8" />
//     <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="#7ed321" strokeWidth="1.8" strokeLinecap="round" />
//   </svg>
// );

// const EyeIcon = ({ off }) => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"
//       stroke="#8a8a8a"
//       strokeWidth="1.6"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <circle cx="12" cy="12" r="3" stroke="#8a8a8a" strokeWidth="1.6" />
//     {off && (
//       <line x1="2" y1="22" x2="22" y2="2" stroke="#8a8a8a" strokeWidth="1.6" strokeLinecap="round" />
//     )}
//   </svg>
// );

// const GoogleIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 48 48">
//     <path
//       fill="#FFC107"
//       d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
//     />
//     <path
//       fill="#FF3D00"
//       d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4c-7.7 0-14.3 4.4-17.7 10.7z"
//     />
//     <path
//       fill="#4CAF50"
//       d="M24 44c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.4C29.6 35.2 27 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.6 5.1C9.6 39.6 16.3 44 24 44z"
//     />
//     <path
//       fill="#1976D2"
//       d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.5l6.6 5.4C41.5 35.6 44 30.2 44 24c0-1.3-.1-2.7-.4-3.5z"
//     />
//   </svg>
// );

// const RobotIcon = () => (
//   <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
//     <path d="M25 50a30 30 0 0 1 60 0v18a10 10 0 0 1-10 10H35a10 10 0 0 1-10-10V50z" fill="#f5f5f5" />
//     <rect x="10" y="46" width="10" height="20" rx="5" fill="#f5f5f5" />
//     <rect x="90" y="46" width="10" height="20" rx="5" fill="#f5f5f5" />
//     <rect x="24" y="50" width="62" height="34" rx="16" fill="#0a0a0a" />
//     <path
//       d="M32 67h8l4-8 5 16 5-12 4 4h20"
//       stroke="#7ed321"
//       strokeWidth="2.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       fill="none"
//     />
//     <rect x="46" y="90" width="18" height="8" rx="4" fill="#f5f5f5" />
//     <rect x="50" y="97" width="10" height="4" rx="2" fill="#7ed321" />
//   </svg>
// );

// export default Login;



import React, { useState } from "react";
import { login } from "../authService";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!phone || !password) {
      setError("Please enter both phone number and password");
      return;
    }

    setLoading(true);
    try {
      await login(phone, password);
      // redirect to your home/dashboard route after successful login
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Login failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#000000",
        display: "flex",
        justifyContent: "center",
        padding: "24px 20px 40px",
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420, position: "relative" }}>
        {/* Back button */}
        <button
          type="button"
          onClick={() => window.history.back()}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1px solid #3a8f2e",
            background: "transparent",
            color: "#ffffff",
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            marginBottom: 10,
          }}
        >
          ‹
        </button>

        {/* Title */}
        <div style={{ textAlign: "center", marginTop: 4 }}>
          <span style={{ fontSize: 34, fontWeight: 800, color: "#ffffff" }}>
            PRO{" "}
          </span>
          <span
            style={{
              fontSize: 34,
              fontWeight: 800,
              color: "#7ed321",
              textShadow: "0 0 18px rgba(126,211,33,0.6)",
            }}
          >
            Ai
          </span>
          <div style={{ color: "#c9c9c9", fontSize: 16, marginTop: 2 }}>
            bot
          </div>
        </div>

        {/* Glowing robot avatar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px 0 6px",
          }}
        >
          <div
            style={{
              width: 220,
              height: 220,
              borderRadius: "50%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "radial-gradient(circle, rgba(126,211,33,0.25) 0%, rgba(126,211,33,0.08) 45%, rgba(0,0,0,0) 70%)",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                border: "1px solid rgba(126,211,33,0.35)",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "78%",
                height: "78%",
                borderRadius: "50%",
                border: "1px solid rgba(126,211,33,0.25)",
              }}
            />
             <img src="/video/logo.jpeg" style={{ width: "166px"}}></img>

          </div>
        </div>

        {/* Welcome text */}
        <h1
          style={{
            color: "#ffffff",
            fontSize: 26,
            fontWeight: 800,
            textAlign: "center",
            margin: "6px 0 6px",
          }}
        >
          Welcome Back!
        </h1>
        <p
          style={{
            color: "#9d9d9d",
            fontSize: 14,
            textAlign: "center",
            margin: "0 0 24px",
            lineHeight: 1.5,
          }}
        >
          Login to your account and continue
          <br />
          using PRO Ai bot.
        </p>

        {/* Phone input */}
        <InputField
          icon={<PhoneIcon />}
          placeholder="Phone Number"
          type="tel"
          value={phone}
          onChange={setPhone}
        />

        {/* Password input */}
        <InputField
          icon={<LockIcon />}
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={setPassword}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                padding: 0,
              }}
            >
              <EyeIcon off={!showPassword} />
            </button>
          }
        />

        {/* Forgot password */}
        <div style={{ textAlign: "right", margin: "4px 0 20px" }}>
          <a
            href="/forgot-password"
            style={{
              color: "#7ed321",
              fontSize: 13,
              textDecoration: "none",
            }}
          >
            Forgot Password?
          </a>
        </div>

        {/* Error message */}
        {error && (
          <p
            style={{
              color: "#ff5c5c",
              fontSize: 13.5,
              textAlign: "center",
              margin: "0 0 14px",
            }}
          >
            {error}
          </p>
        )}

        {/* Login button */}
        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "16px 0",
            borderRadius: 12,
            border: "none",
            background: "linear-gradient(180deg, #7ed321 0%, #4c8f14 100%)",
            color: "#ffffff",
            fontSize: 17,
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            boxShadow: "0 8px 24px rgba(76,143,20,0.35)",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "22px 0",
            gap: 12,
          }}
        >
          <div style={{ flex: 1, height: 1, background: "#2a2a2a" }} />
          <span style={{ color: "#8a8a8a", fontSize: 13 }}>or</span>
          <div style={{ flex: 1, height: 1, background: "#2a2a2a" }} />
        </div>

        {/* Google login */}
        <button
          type="button"
          style={{
            width: "100%",
            padding: "14px 0",
            borderRadius: 12,
            border: "1px solid #3a8f2e",
            background: "transparent",
            color: "#ffffff",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <GoogleIcon />
          Login with Google
        </button>

        {/* Register link */}
        <p
          style={{
            textAlign: "center",
            color: "#c9c9c9",
            fontSize: 14,
            marginTop: 24,
          }}
        >
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            style={{ color: "#7ed321", textDecoration: "none", fontWeight: 600 }}
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

/* ---------- shared bits ---------- */

const InputField = ({ icon, placeholder, type, value, onChange, rightIcon }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      background: "#0e0e0e",
      border: "1px solid #2a2a2a",
      borderRadius: 12,
      padding: "14px 16px",
      marginBottom: 16,
      gap: 12,
    }}
  >
    {icon}
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={{
        flex: 1,
        background: "transparent",
        border: "none",
        outline: "none",
        color: "#ffffff",
        fontSize: 15,
      }}
    />
    {rightIcon}
  </div>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z"
      stroke="#7ed321"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="10" width="16" height="10" rx="2" stroke="#7ed321" strokeWidth="1.8" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="#7ed321" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const EyeIcon = ({ off }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"
      stroke="#8a8a8a"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" stroke="#8a8a8a" strokeWidth="1.6" />
    {off && (
      <line x1="2" y1="22" x2="22" y2="2" stroke="#8a8a8a" strokeWidth="1.6" strokeLinecap="round" />
    )}
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
    />
    <path
      fill="#FF3D00"
      d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4c-7.7 0-14.3 4.4-17.7 10.7z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.4C29.6 35.2 27 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.6 5.1C9.6 39.6 16.3 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.5l6.6 5.4C41.5 35.6 44 30.2 44 24c0-1.3-.1-2.7-.4-3.5z"
    />
  </svg>
);

const RobotIcon = () => (
  <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
    <path d="M25 50a30 30 0 0 1 60 0v18a10 10 0 0 1-10 10H35a10 10 0 0 1-10-10V50z" fill="#f5f5f5" />
    <rect x="10" y="46" width="10" height="20" rx="5" fill="#f5f5f5" />
    <rect x="90" y="46" width="10" height="20" rx="5" fill="#f5f5f5" />
    <rect x="24" y="50" width="62" height="34" rx="16" fill="#0a0a0a" />
    <path
      d="M32 67h8l4-8 5 16 5-12 4 4h20"
      stroke="#7ed321"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <rect x="46" y="90" width="18" height="8" rx="4" fill="#f5f5f5" />
    <rect x="50" y="97" width="10" height="4" rx="2" fill="#7ed321" />
  </svg>
);

export default Login;