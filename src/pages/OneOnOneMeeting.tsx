import React, { useState } from "react";
import Header from "../components/Header";
import { EuiFlexGroup, EuiForm, EuiSpacer } from "@elastic/eui";
import MeetingNameField from "../components/FormComponents/MeetingNameField";
import MeetingUsersField from "../components/FormComponents/MeetingUsersField";
import useAuth from "../hooks/useAuth";
import useFetchUsers from "../hooks/useFetchUsers";
import moment from "moment";
import MeetingDateField from "../components/FormComponents/MeetingDateField";
import CreateMeetingButtons from "../components/FormComponents/CreateMeetingButtons";
import { FieldErrorType, UserType } from "../utils/Types";
import { addDoc } from "firebase/firestore";
import { meetingRef } from "../utils/FirebaseConfig";
import { generateMeetingId } from "../utils/generateMeetingId";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";

const OneOnOneMeeting = () => {
  useAuth();
  const [users] = useFetchUsers();
  const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid);
  const [meetingName, setMeetingName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([]);
  const [startDate, setStartDate] = useState(moment());
  const [createToasts] = useToast();
  const [Errors, setShowErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUser: FieldErrorType;
  }>({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUser: {
      show: false,
      message: [],
    },
  });
  const navigate = useNavigate();
  const onUserChange = (selectedOptions: any) => {
    setSelectedUsers(selectedOptions);
  };
  const validateForm = () => {
    const showErrorsClone = { ...Errors };
    let errors = false;
    if (!meetingName.length) {
      showErrorsClone.meetingName.show = true;
      showErrorsClone.meetingName.message = ["Please Enter Meeting Name"];
      errors = true;
    } else {
      showErrorsClone.meetingName.show = false;
      showErrorsClone.meetingName.message = [];
    }
    if (!selectedUsers.length) {
      showErrorsClone.meetingUser.show = true;
      showErrorsClone.meetingUser.message = ["Please Select a User"];
      errors = true;
    } else {
      showErrorsClone.meetingUser.show = false;
      showErrorsClone.meetingUser.message = [];
    }
    setShowErrors(showErrorsClone);
    return errors;
  };

  const createMeeting = async () => {
    if (!uid) {
      return;
    }
    if (!validateForm()) {
      const meetingId = generateMeetingId();
      await addDoc(meetingRef, {
        createdBy: uid,
        meetingId,
        meetingName,
        meetingType: "1-on-1",
        inviteUsers: [selectedUsers[0].uid],
        meetingDate: startDate.format("L"),
        maxUsers: 1,
        status: true,
      });
      createToasts({
        title: "One on One Meeting Created Successfully!",
        type: "success",
      });
      navigate("/");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiForm>
          <MeetingNameField
            label="Meeting Name"
            placeholder="Meeting Name"
            value={meetingName}
            setMeetingName={setMeetingName}
            isInvalid={Errors.meetingName.show}
            error={Errors.meetingName.message}
          />
          <MeetingUsersField
            label="Invite User"
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUsers}
            isClearable={false}
            placeholder="Select a user"
            singleSelection={{ asPlainText: true }}
            isInvalid={Errors.meetingUser.show}
            error={Errors.meetingUser.message}
          />
          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiSpacer />
          <CreateMeetingButtons createmeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
};

export default OneOnOneMeeting;
