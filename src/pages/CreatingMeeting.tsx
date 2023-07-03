import React from "react";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import meeting1 from "../assets/meeting1.png";
import meeting2 from "../assets/meeting2.png";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui";
import { useNavigate } from "react-router-dom";

const CreatingMeeting = () => {
  const navigate = useNavigate();
  useAuth();
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        style={{ margin: "5vh 10vw" }}
      >
        <EuiFlexItem>
          <EuiCard
            icon={<EuiImage src={meeting1} alt="icon" size="100%" />}
            title={`Create 1 on 1 Meeting`}
            description="Create a personal single person meeting."
            onClick={() => navigate("/create1on1")}
            paddingSize="xl"
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            icon={<EuiImage src={meeting2} alt="icon" size="100%" />}
            title={`Video Conference`}
            description="Invite multiple Person to the Meeting."
            onClick={() => navigate("/videoconference")}
            paddingSize="xl"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};

export default CreatingMeeting;
