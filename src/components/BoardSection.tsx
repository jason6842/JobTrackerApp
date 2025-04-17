import { JobType } from "../types/jobTypes";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

type BoardSectionProps = {
  id: string;
  title: string;
  jobs: JobType[];
};

function BoardSection({ id, title, jobs }: BoardSectionProps) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{
        backgroundColor: "#f1f1f1",
        border: "2px solid red",
        padding: "1rem",
        borderRadius: "8px",
        minHeight: "250px",
        flex: 1,
        margin: "1rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 style={{ marginTop: 0, color: "black" }}>{title}</h2>
      <SortableContext
        id={id}
        items={jobs.map((job) => job.id)}
        strategy={verticalListSortingStrategy}
      >
        {jobs.length === 0 ? (
          <div
          style={{
            flex: 1,
            border: "2px dashed #bbb",
            borderRadius: "6px",
            padding: "1rem",
            color: "#999",
            fontStyle: "italic",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100px",
          }}
        >
          Drop jobs here
        </div>
        ) : (
          jobs.map((job: any) => {
            return (
              <SortableItem key={job.id} id={job.id}>
                {job.position}
              </SortableItem>
            );
          })
        )}
      </SortableContext>
    </div>
  );
}

export default BoardSection;
