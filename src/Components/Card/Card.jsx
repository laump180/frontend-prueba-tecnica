import './Card.css'
// card to show quiz information
const Card = ({ text, img, title, resolved, correct }) => {
  return (
    <div
      className="card-container"
      style={{
        backgroundImage:
          `url(${img})`,
      }}
    >
      <div className="card-content">
        <div className='card-title'>{title}</div>
        <div class="card-description">{text}</div>
       { resolved && <div class="card-result"> Quiz resuelto!</div>}
       { correct && <div class="card-score"> {`Puntaje ${correct.correct} de ${correct.total}`}</div>}
      </div>
    </div>
  );
};

export default Card;
