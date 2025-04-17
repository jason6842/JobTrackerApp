import { useState } from "react";
import "./App.css";
import JobList from "./components/JobList";
import ModalForm from "./components/ModalForm/ModalForm";
import { createPortal } from "react-dom";
import DragDropList from "./components/DragDropList/DragDropList";
import { JobType } from "./types/jobTypes";
import BoardSectionList from "./components/BoardSectionList";



const jobs: JobType[] = [
  {
    id: "1",
    position: "Junior Software Engineer",
    company: "Airbnb",
    location: "Los Angeles, CA",
    salary: "$75,000",
    status: "applied",
  },
  {
    id: "1",
    position: "React Developer",
    company: "State Farm",
    location: "Remote",
    salary: "$67,000",
    status: "applied",
  },
];

function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="App">
        <div className="job-tracker-title">
          <h1>Job Tracker</h1>
          <div className="job-tracker-add-job">
            <button className="job-tracker-add-btn" onClick={() => setShowModal(!showModal)}>Add job</button>
            {showModal && createPortal(<ModalForm onClose={() => setShowModal(false)} />, document.body)}
          </div>
        </div>
        <JobList jobs={jobs} />
        <BoardSectionList />
      </div>
    </>
  );
}

export default App;
