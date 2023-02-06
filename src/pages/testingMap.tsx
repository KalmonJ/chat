import AlertDialogDemo from "components/common/Alert";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const TestingMap = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>open Modal</button>
      <AlertDialogDemo open={open} setOpen={setOpen} />
    </div>
  );
};

export default TestingMap;
