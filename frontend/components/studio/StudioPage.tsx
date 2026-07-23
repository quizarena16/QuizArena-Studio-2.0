"use client";

import StudioLayout from "./StudioLayout";
import QuestionSidebar from "./QuestionSidebar";
import EditorPanel from "./EditorPanel";
import PhonePreview from "./PhonePreview";

export default function StudioPage() {
  return (
    <StudioLayout
      left={<QuestionSidebar />}
      center={<EditorPanel />}
      right={<PhonePreview />}
    />
  );
}