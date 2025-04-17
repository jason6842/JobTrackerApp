import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Item from "./DragDropList/Item";

function SortableItem({id, children}: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  // transform - represents the displacement and change of scale transformation that a sortable item needs to apply to transition to its new position without needing to update the DOM order

  // transform - behaves similarly to the transform property of the useDraggable hook for the active sortable item, when there is no DragOverlay being used.
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <Item ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </Item>
  );
}

export default SortableItem;
