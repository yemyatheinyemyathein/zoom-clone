import React, { useState, useEffect } from "react";
import {
  EuiGlobalToastList,
  EuiProvider,
  EuiThemeColorMode,
  EuiThemeProvider,
} from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_light.json";
import "@elastic/eui/dist/eui_theme_dark.json";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import ThemeSelector from "./components/themes/ThemeSelector";
import CreatingMeeting from "./pages/CreatingMeeting";
import OneOnOneMeeting from "./pages/OneOnOneMeeting";
import { setToasts } from "./app/slices/MeetingSlice";
import VideoConference from "./pages/VideoConference";
import MyMeetings from "./pages/MyMeetings";
import Meeting from "./pages/Meeting";
import JoinMeeting from "./pages/JoinMeeting";

const App = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector((zoom) => zoom.meetings.toasts);
  const isDarkTheme = useAppSelector((zoom) => zoom.auth.isDarkTheme);
  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  const [IsInitialTheme, setIsInitialTheme] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme");
    if (theme) {
      setTheme(theme as EuiThemeColorMode);
    } else {
      localStorage.setItem("zoom-theme", "light");
    }
  }, []);

  useEffect(() => {
    if (IsInitialTheme) {
      setIsInitialTheme(false);
    } else {
      window.location.reload();
    }
  }, [isDarkTheme]);

  const overrides = {
    colors: {
      LIGHT: { primary: "#0b5cff" },
      DARK: { primary: "#0b5cff" },
    },
  };

  const removeToast = (removeToast: { id: string }) => {
    dispatch(
      setToasts(
        toasts.filter((toasts: { id: string }) => toasts.id !== removeToast.id)
      )
    );
  };
  return (
    <ThemeSelector>
      <EuiProvider colorMode={theme}>
        <EuiThemeProvider modify={overrides}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreatingMeeting />} />
            <Route path="/create1on1" element={<OneOnOneMeeting />} />
            <Route path="/videoconference" element={<VideoConference />} />
            <Route path="/mymeetings" element={<MyMeetings />} />
            <Route path="/meetings" element={<Meeting />} />
            <Route path="/join/:id" element={<JoinMeeting />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
          <EuiGlobalToastList
            dismissToast={removeToast}
            toasts={toasts}
            toastLifeTimeMs={5000}
          />
        </EuiThemeProvider>
      </EuiProvider>
    </ThemeSelector>
  );
};

export default App;
