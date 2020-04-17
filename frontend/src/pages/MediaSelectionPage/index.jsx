import React from "react";
import MediaSelectionPageContainer from "../../containers/MediaSelectionPageContainer";

import MediaSelectionPage from "./MediaSelectionPage";
import PinPage from "./PinPage";

export default () => {
  return (
    <MediaSelectionPageContainer>
      <MediaSelectionPage />
      <PinPage />
    </MediaSelectionPageContainer>
  );
};
