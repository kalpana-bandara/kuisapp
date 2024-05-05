import "./css/quiztypes.scss";

export default function Quiztypes({ location, heading, children }) {
  return (
    <>
      <div className="quiztype_box">
        <p className="text text--small">{heading}</p>
        <a href="#">View all</a>
      </div>
      {children}
    </>
  );
}
