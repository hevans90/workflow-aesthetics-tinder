import React, { useMemo, useRef, useState } from 'react';
import TinderCard from 'react-tinder-card';

import { Button } from '@/ui/Button';
import { Card } from '@/ui/Card';

type SwipeDirection = 'left' | 'right' | 'up' | 'down';

type SwipeAPI = {
  swipe(dir?: SwipeDirection): Promise<void>;
  restoreCard(): Promise<void>;
};

const db = [
  {
    name: 'Richard Hendricks',
    url: './img/richard.jpg',
  },
  {
    name: 'Erlich Bachman',
    url: './img/erlich.jpg',
  },
  {
    name: 'Monica Hall',
    url: './img/monica.jpg',
  },
  {
    name: 'Jared Dunn',
    url: './img/jared.jpg',
  },
  {
    name: 'Dinesh Chugtai',
    url: './img/dinesh.jpg',
  },
];

export const Swiper = () => {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState<SwipeDirection>();
  // used for outOfFrame closure

  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map(() => React.createRef<SwipeAPI>()),
    []
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (
    direction: SwipeDirection,
    nameToDelete: string,
    index: number
  ) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current?.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir: SwipeDirection) => {
    if (
      canSwipe &&
      childRefs[currentIndex]?.current &&
      currentIndex < db.length
    ) {
      await childRefs[currentIndex].current?.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current?.restoreCard();
  };

  return (
    <>
      <div className="h-96 w-96">
        {db.map((character, index) => (
          <TinderCard
            preventSwipe={['up', 'down']}
            ref={childRefs[index]}
            className="absolute w-96 cursor-grab active:cursor-grabbing"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <Card
              bgImageUrl={character.url}
              className="relative h-96 w-full overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 right-0 ml-auto mr-auto rounded-b-lg bg-white bg-opacity-90 p-4">
                <h3>{character.name}</h3>
              </div>
            </Card>
          </TinderCard>
        ))}
      </div>
      <div className="flex w-full justify-between gap-2">
        <Button
          onClick={() => swipe('left')}
          disabled={!canSwipe}
          category="secondary"
          className="min-w-28 font-crimson text-xl"
        >
          NO
        </Button>
        <Button
          onClick={() => goBack()}
          disabled={!canGoBack}
          className="min-w-28 font-crimson text-xl"
        >
          UNDO
        </Button>
        <Button
          onClick={() => swipe('right')}
          disabled={!canSwipe}
          className="min-w-28 font-crimson text-xl"
        >
          YES
        </Button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : null}
    </>
  );
};
