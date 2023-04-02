import React from "react";

export default function Card(props) {
  const card = {
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",
    backgroundColor: "rgba(252, 63, 5, 0.375)",
    maxWidth: "850px",
    maxHeight: "200px",
  };

  const cardBody = {
    padding: "16px",
  };

  const cardTitle = {
    fontSize: "x-large",
    color: "#fcad03",
  };

  const cardText = {
    fontSize: "large",
    color: "white",
  };

  const imgLeftCard = {
    borderTopLeftRadius: "16px",
    borderBottomLeftRadius: "16px",
  };

  const imgRightCard = {
    borderTopRightRadius: "16px",
    borderBottomRightRadius: "16px",
  };

  return (
    <div
      style={card}
      className="mx-auto my-5 hstack d-flex justify-content-start border"
    >
      {props.isLeftCard && (
        <img
          style={imgLeftCard}
          alt=""
          src={props.imgSrc}
          className="img-fluid"
          width="200"
          height="200"
        />
      )}
      <div className="d-none d-md-flex vstack my-auto" style={cardBody}>
        <h5 style={cardTitle}>{props.title}</h5>
        <hr />
        <p style={cardText}>{props.content}</p>
      </div>

      {!props.isLeftCard && (
        <img
          style={imgRightCard}
          alt=""
          src={props.imgSrc}
          className="img-fluid"
          width="200"
          height="200"
        />
      )}
    </div>
  );
}
