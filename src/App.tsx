import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

type SortBy = 'alphabet' | 'length' | '';

export const App: React.FC = () => {
  const [sortGoods, setSortGoods] = useState<SortBy>('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = [...goodsFromServer];

  if (sortGoods === 'alphabet') {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortGoods === 'length') {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortGoods !== 'alphabet',
          })}
          onClick={() => setSortGoods('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortGoods !== 'length',
          })}
          onClick={() => setSortGoods('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {(sortGoods !== '' || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortGoods('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
