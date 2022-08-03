import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      hasTrunfo: false,
      cardDeck: [],
    };
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.enableSaveButton);
  }

  enableSaveButton = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
    } = this.state;

    const maxAttrValue = 90;
    const maxAttrSum = 210;

    if (cardName.length === 0
      || cardDescription.length === 0
      || cardImage.length === 0
      || cardAttr1 < 0
      || cardAttr2 < 0
      || cardAttr3 < 0
      || cardAttr1 > maxAttrValue
      || cardAttr2 > maxAttrValue
      || cardAttr3 > maxAttrValue
      || Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) > maxAttrSum) {
      this.setState({ isSaveButtonDisabled: true });
    } else this.setState({ isSaveButtonDisabled: false });
  }

  onSaveButtonClick = (event) => {
    event.preventDefault();

    const {
      hasTrunfo,
      cardTrunfo,
      cardName,
      cardDescription,
      cardImage,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare } = this.state;

    const card = {
      cardName,
      cardDescription,
      cardTrunfo,
      cardImage,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
    };

    this.setState((prevState) => ({ cardDeck:
      [...prevState.cardDeck, card] }));

    this.setState({
      cardName: '',
      cardImage: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardRare: 'normal',
      cardTrunfo: false,
    });

    if (hasTrunfo === true || cardTrunfo === true) {
      this.setState({ hasTrunfo: true });
    }
  }

  haveTrunfo = () => {
    const { cardDeck } = this.state;
    const hasTrunfo = cardDeck.some(({ cardTrunfo }) => cardTrunfo);
    this.setState({ hasTrunfo });
  }

  deleteCardButton = (event) => {
    const { cardDeck } = this.state;
    const removedCards = cardDeck.filter((element) => element.cardName !== event);
    this.setState({
      cardDeck: removedCards,
    }, () => this.haveTrunfo());
  }

  render() {
    const {
      cardName,
      cardImage,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      hasTrunfo,
      cardDeck,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardImage={ cardImage }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
          hasTrunfo={ hasTrunfo }
        />

        <Card
          cardName={ cardName }
          cardImage={ cardImage }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />

        {
          cardDeck.map((element) => (
            <div key={ element.cardName }>
              <Card
                key={ element.cardName }
                cardName={ element.cardName }
                cardImage={ element.cardImage }
                cardDescription={ element.cardDescription }
                cardAttr1={ element.cardAttr1 }
                cardAttr2={ element.cardAttr2 }
                cardAttr3={ element.cardAttr3 }
                cardRare={ element.cardRare }
                cardTrunfo={ element.cardTrunfo }
              />

              <button
                type="button"
                data-testid="delete-button"
                id={ element.cardName }
                onClick={ () => this.deleteCardButton(element.cardName) }
              >
                Excluir
              </button>
            </div>
          ))
        }
      </div>
    );
  }
}

export default App;
