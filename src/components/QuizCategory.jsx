import "./css/quizcategory.scss";

export default function QuizCategory({ image, heading, description, children }) {
  return (
    <div className="screen-box quizcategory">
      <div className="quizcategory__icon">{image}</div>
      <div className="quizcategory__content">
        <h3 className="text text__medium">{heading}</h3>
        <p className="text text__small">{description}</p>
      </div>
      {children}
    </div>
  );
}
