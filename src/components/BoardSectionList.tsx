import {
  closestCenter,
  defaultDropAnimation,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Item from "./DragDropList/Item";
import { findBoardSectionContainer, initializeBoard } from "./utils/board";
import BoardSection from "./BoardSection";
import { getJobById } from "./utils/tasks";

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
  {
    id: "3",
    position: "Front-End Developer",
    company: "Walgreens",
    location: "Illinois",
    salary: "$85,000",
    status: "rejected",
  },
];

export default function BoardSectionList() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [jobs, setJobs] = useState(initialJobs);
  const initialBoardSections = initializeBoard(initialJobs);

  const [boardSections, setBoardSections] = useState(initialBoardSections);
  console.log(boardSections);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const job = activeId ? getJobById(jobs, activeId) : null;

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
            padding: "1rem",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {Object.entries(boardSections).map(([sectionId, jobs]) => (
            <BoardSection
              key={sectionId}
              id={sectionId}
              title={sectionId.toUpperCase()}
              jobs={jobs}
            />
          ))}
        </div>
        {/* {Object.entries(boardSections).map(([sectionId, jobs]) => (
          <div key={sectionId} className="board-section">
            <h3>{sectionId.toUpperCase()}</h3>
            <SortableContext
              items={jobs.map((job) => job.id)}
              strategy={verticalListSortingStrategy}
            >
              {jobs.map((job) => (
                <SortableItem key={job.id} id={job.id}>
                  <div style={{ border: "1px solid black", padding: "0.5rem" }}>
                    {job.position}
                  </div>
                </SortableItem>
              ))}
            </SortableContext>
          </div>
        ))} */}
        <DragOverlay dropAnimation={dropAnimation}>
          {/* {activeId ? (
            <Item id={activeId}>
              {jobs.find((j) => j.id === activeId)?.position}
            </Item>
          ) : null} */}
          {job ? <Item>Job</Item> : null}
        </DragOverlay>
      </DndContext>
    </>
  );

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(active.id as string);
  }

  function handleDragOver({ active, over }: DragOverEvent) {
    // Find the containers
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    // No point of updating
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter(
            (item) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length
          ),
        ],
      };
    });
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    // no point of dragging/updating
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (job) => job.id === active.id
    );
    const overIndex = boardSections[overContainer].findIndex(
      (job) => job.id === over?.id
    );

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => {
        return {
          ...boardSection,
          [overContainer]: arrayMove(
            boardSection[overContainer],
            activeIndex,
            overIndex
          ),
        };
      });
    }
    setActiveId(null);
  }
}
