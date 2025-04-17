import { useState } from "react";
import "./ModalForm.css";

type ModalFormProps = {
  onClose: () => void;
};

export default function ModalForm({ onClose }: ModalFormProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [url, setUrl] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState(0);
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newJob = {
      position: jobTitle,
      company: company,
      location: location,
      salary: salary,
      description: description,
      url: url,
    }
    console.log(newJob);
    onClose();
  }

  return (
    <>
      <form
        className="job-form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <button
          className="job-form__button job-form__button--close"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="job-form__header">Add a New Job Post</h2>
        <div className="job-form__field">
          <h4 className="job-form__label">Job Title</h4>
          <input
            className="job-form__input"
            type="text"
            placeholder="Job Title"
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div className="job-form__field">
          <h4 className="job-form__label">URL from Original Job Posting</h4>
          <input
            className="job-form__input"
            type="url"
            placeholder="URL from Original Job Posting"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="job-form__field">
          <h4 className="job-form__label">Company Name</h4>
          <input
            className="job-form__input"
            type="text"
            placeholder="Company Name"
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="job-form__field">
          <h4 className="job-form__label">Location</h4>
          <input
            className="job-form__input"
            type="text"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="job-form__field">
          <h4 className="job-form__label">Salary</h4>
          <input
            className="job-form__input"
            type="number"
            placeholder="70,000"
            step="1000"
            onChange={(e) => setSalary(e.target.valueAsNumber)}
          />
        </div>
        <div className="job-form__field">
          <h4 className="job-form__label">Job Description</h4>
          <textarea
            className="job-form__textarea"
            placeholder="Job Description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="job-form__actions">
          <button
            className="job-form__button job-form__button--cancel"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="job-form__button job-form__button--save"
            type="submit"
          >
            Save Job
          </button>
        </div>
      </form>
    </>
  );
}
