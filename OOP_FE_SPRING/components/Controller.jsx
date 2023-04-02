import React, { useContext } from "react";

export default function Controller(props) {
  return (
    <div className="d-flex justify-content-center gap-2">
      <button
        class="btn"
        style={{
          backgroundColor: props.theme.foreground,
          viewBox: "0 0 24 24",
        }}
        onClick={() => props.toggleTheme()}
      >
        <div style={{ color: "red" }}>
          <svg
            src="https://tabler-icons.io/i/moon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></svg>
        </div>
      </button>
    </div>
  );
}
