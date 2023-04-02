import React, { useState } from "react";

export default function Hyperlink(props) {
  const outerLink = {
    color: "grey",
  };

  const outerLinkHover = {
    color: "#03bafc",
  };

  const [isHover, setHover] = useState(false);

  return (
    <div>
      <a
        style={isHover ? outerLinkHover : outerLink}
        href={props.link}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {props.content}
      </a>
    </div>
  );
}
