import { EuiButton, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import React from "react";
import { useNavigate } from "react-router-dom";

const CreateMeetingButtons = ({
  createmeeting,
  isEdit,
  closeFlyout,
}: {
  createmeeting: () => void;
  isEdit?: boolean;
  closeFlyout?: () => {};
}) => {
  const navigate = useNavigate();
  return (
    <EuiFlexGroup>
      <EuiFlexItem grow={false}>
        <EuiButton
          color="danger"
          fill
          onClick={() => (isEdit ? closeFlyout!() : navigate("/"))}
        >
          Cancel
        </EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton fill onClick={createmeeting}>
          {isEdit ? "Edit Meeting" : "Create Meeting"}
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default CreateMeetingButtons;
