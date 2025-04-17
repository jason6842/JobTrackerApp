import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "../SortableItem";
import Item from "./Item";

const initialJobs = [
    {
      id: "1",
      position: "Junior Software Engineer",
      company: "Airbnb",
      location: "Los Angeles, CA",
      salary: "$75,000",
      status: "applied",
    },
    {
      id: "2",
      position: "React Developer",
      company: "State Farm",
      location: "Remote",
      salary: "$67,000",
      status: "applied",
    },
  ];

export default function DragDropList() {
  const [activeId, setActiveId] = useState(null);
//   const [items, setItems] = useState(["1", "2", "3"]);
  const [jobs, setJobs] = useState(initialJobs);
  const jobIds = jobs.map((job) => job.id);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        Sortable Context
        <SortableContext items={jobIds} strategy={verticalListSortingStrategy}>
          {/* {items.map((id: any) => (
            <SortableItem key={id} id={id}>
                Item {id}
            </SortableItem>
          ))} */}
          {jobs.map((job: any) => {
            return (<SortableItem key={job.id} id={job.id}>
                {job.position}
            </SortableItem>)
          })}
        </SortableContext>
        <DragOverlay>
        {activeId ? (<Item id={activeId}>{jobs.find((j) => j.id === activeId)?.position}</Item>): null}
      </DragOverlay>
      </DndContext>
    </>
  );

  function handleDragStart(event: any) {
    const { active } = event;
    setActiveId(active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
    //   setItems((items: any) => {
    //     const oldIndex = items.indexOf(active.id);
    //     const newIndex = items.indexOf(over.id);

    //     return arrayMove(items, oldIndex, newIndex);
    //   });
        setJobs((jobs: any) => {
            const oldIndex = jobs.findIndex((job: any) => job.id === active.id);
            const newIndex = jobs.findIndex((job: any) => job.id === over.id);

            return arrayMove(jobs, oldIndex, newIndex);
        });
    }

    setActiveId(null);
  }
}
