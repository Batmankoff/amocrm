import {useState} from "react";
import {IoCloseCircleOutline} from "react-icons/io5";
import SingleDeals from "./SingleDeals.jsx";

const Deals = ({deals}) => {
    const [expandedCard, setExpandedCard] = useState(null);

    const toggleCard = (id) => {
        if (expandedCard === id) {
            setExpandedCard(null);
        } else {
            setExpandedCard(id);
        }
    };

    const collapseCard = () => {
        setExpandedCard(null);
    };

    return (
        <div className="cards">
            {deals.map((deal) => (
                <div
                    key={deal.id}
                    className={`card ${expandedCard === deal.id ? "is-expanded" : "is-collapsed"} ${
                        expandedCard !== null && expandedCard !== deal.id ? "is-inactive" : ""
                    }`}
                >
                    <div className="card__inner" onClick={() => toggleCard(deal.id)}>
                        <div className="card__wrapper">
                            <p>{deal.name}</p>
                            <p>Бюджет: {deal.price}</p>
                            <p>id: {deal.id}</p>
                        </div>
                    </div>
                    {expandedCard === deal.id && (
                        <div className="card__expander">
                            <IoCloseCircleOutline className='card__close' onClick={collapseCard}/>
                            <SingleDeals id={deal.id}/>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Deals;
