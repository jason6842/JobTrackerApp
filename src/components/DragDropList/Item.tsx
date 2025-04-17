import { forwardRef } from "react";

const Item = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return (
        <div ref={ref} {...props}         style={{
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "0.5rem",
            backgroundColor: "#f9f9f9",
            cursor: "grab",
            color: "black",
            ...props.style, // allow style overrides
          }}>
            {props.children}
        </div>
    )
  }
);

export default Item;