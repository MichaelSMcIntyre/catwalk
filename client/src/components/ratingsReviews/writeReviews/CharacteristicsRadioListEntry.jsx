import React from 'react';

const containerStyle = {
  fontSize: '16px',
  marginBottom: '5px',
  fontWeight: 'bold',
};

const centerFlex = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const descriptionFlex = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
};

const CharacteristicsRadioListEntry = ({ characteristicID, characteristic, characteristicsRadioClick }) => (
  <div>
    <div style={containerStyle}>
      <b style={{ color: '#38062B' }}> * </b>
      {`${characteristic}`}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <div style={centerFlex}>
        <input
          type="radio"
          id={`${characteristic}1`}
          name={characteristicID}
          value="1"
          onClick={characteristicsRadioClick}
        />
        <label htmlFor="size1" style={descriptionFlex}>
          {characteristic === 'Size' && <div> A size too small</div>}
          {characteristic === 'Width' && <div> Too narrow </div>}
          {characteristic === 'Comfort' && <div> Uncomfortable </div>}
          {characteristic === 'Quality' && <div> Poor </div>}
          {characteristic === 'Length' && <div> Runs short </div>}
          {characteristic === 'Fit' && <div> Runs tight </div>}
        </label>
      </div>
      <div style={centerFlex}>
        <input
          type="radio"
          id={`${characteristic}2`}
          name={characteristicID}
          value="2"
          onClick={characteristicsRadioClick}
        />
        <label htmlFor="size2" style={descriptionFlex}>
          {characteristic === 'Size' && <div> ½ a size too small </div>}
          {characteristic === 'Width' && <div> Slightly narrow </div>}
          {characteristic === 'Comfort' && <div> Slightly uncomfortable</div>}
          {characteristic === 'Quality' && <div> Below average </div>}
          {characteristic === 'Length' && <div> Runs slightly short </div>}
          {characteristic === 'Fit' && <div> Runs slightly tight </div>}
        </label>
      </div>
      <div style={centerFlex}>
        <input
          type="radio"
          id={`${characteristic}3`}
          name={characteristicID}
          value="3"
          onClick={characteristicsRadioClick}
        />
        <label htmlFor="size3" style={descriptionFlex}>
          {characteristic === 'Size' && <div> Perfect </div>}
          {characteristic === 'Width' && <div> Perfect </div>}
          {characteristic === 'Comfort' && <div> Ok </div>}
          {characteristic === 'Quality' && <div> What I expected </div>}
          {characteristic === 'Length' && <div> Perfect </div>}
          {characteristic === 'Fit' && <div> Perfect </div>}
        </label>
      </div>
      <div style={centerFlex}>
        <input
          type="radio"
          id={`${characteristic}4`}
          name={characteristicID}
          value="4"
          onClick={characteristicsRadioClick}
        />
        <label htmlFor="size4" style={descriptionFlex}>
          {characteristic === 'Size' && <div> ½ a size too big </div>}
          {characteristic === 'Width' && <div> Slightly wide </div>}
          {characteristic === 'Comfort' && <div> Comfortable </div>}
          {characteristic === 'Quality' && <div> Pretty great </div>}
          {characteristic === 'Length' && <div> Runs slightly long </div>}
          {characteristic === 'Fit' && <div> Runs slightly long </div>}
        </label>
      </div>
      <div style={centerFlex}>
        <input
          type="radio"
          id={`${characteristic}5`}
          name={characteristicID}
          value="5"
          onClick={characteristicsRadioClick}
        />
        <label htmlFor="size5" style={descriptionFlex}>
          {characteristic === 'Size' && <div> A size too wide </div>}
          {characteristic === 'Width' && <div> Too wide </div>}
          {characteristic === 'Comfort' && <div> Perfect </div>}
          {characteristic === 'Quality' && <div> Perfect </div>}
          {characteristic === 'Length' && <div> Runs long </div>}
          {characteristic === 'Fit' && <div> Runs long </div>}
        </label>
      </div>
    </div>
  </div>
);

export default CharacteristicsRadioListEntry;
