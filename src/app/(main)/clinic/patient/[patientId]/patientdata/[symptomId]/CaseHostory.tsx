
import CaseHistoryForm from "./CaseHistoryForm";
import axios from "axios";
import { useEffect, useState } from "react";

interface CaseHostoryProps {
  id: string;
}
export default function CaseHostory({ id }: CaseHostoryProps) {
 
  const [caseHistory, setCaseHistory] = useState([]);
  useEffect(() => {
    const handler = async () => {
      const { data } = await axios.post("/api/getdoctordata", {
        id,
      });

      setCaseHistory(data);
    };

    handler();
  });

  return (
    <div className="space-y-8 p-3">
      <div className="rounded-md border">
        <CaseHistoryForm doctorData={caseHistory} id={id} />
      </div>
    </div>
  );
}
