import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SingleCharacter from '../components/SingleCharacter';

export default function Character() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="character-bg characters__list-item-details u-margin-top u-margin-bottom-medium">
      <SingleCharacter id={id} />
      <div className="characters__list-item-details-btn">
        <button className="btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
}
