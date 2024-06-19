import React, { useMemo, useRef, useState } from 'react';
import TinderCard from 'react-tinder-card';

import { currentImageMetadata } from '@/_state/images';
import { Button } from '@/ui/Button';
import { Card } from '@/ui/Card';
import { useStore } from '@nanostores/react';

type SwipeDirection = 'left' | 'right' | 'up' | 'down';

type SwipeAPI = {
  swipe(dir?: SwipeDirection): Promise<void>;
  restoreCard(): Promise<void>;
};

export const Swiper = () => {
  const imageResults = useStore(currentImageMetadata);

  const [currentIndex, setCurrentIndex] = useState(imageResults.length - 1);
  const [lastDirection, setLastDirection] = useState<SwipeDirection>();
  // used for outOfFrame closure

  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(imageResults.length)
        .fill(0)
        .map(() => React.createRef<SwipeAPI>()),
    [imageResults]
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  // set last direction and decrease current index
  const swiped = (direction: SwipeDirection, name: string, index: number) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);

    direction === 'left' && console.log(`DISLIKED: ${name}`);
    direction === 'right' && console.log(`LIKED: ${name}`);
  };

  const outOfFrame = (name: string, idx: number) => {
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current?.restoreCard();
    // TODO: when quickly swiping and restoring the same card,
    // multiple outOfFrame events are queued and the card disappears.
    // Only the last outOfFrame event should be considered valid.
  };

  const swipe = async (dir: SwipeDirection) => {
    if (
      canSwipe &&
      childRefs[currentIndex]?.current &&
      currentIndex < imageResults.length
    ) {
      await childRefs[currentIndex].current?.swipe(dir); // Swipe the card!
    }
  };

  const canGoBack = currentIndex < imageResults.length - 1;
  const canSwipe = currentIndex >= 0;

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
        {imageResults.map((result, index) => (
          <TinderCard
            preventSwipe={['up', 'down']}
            ref={childRefs[index]}
            className="absolute w-96 cursor-grab active:cursor-grabbing"
            key={`${result.related_content_id}_${index}`}
            onSwipe={(dir) => swiped(dir, result.title, index)}
            onCardLeftScreen={() => outOfFrame(result.title, index)}
          >
            <Card
              bgImageUrl={result.original}
              className="relative h-96 w-full overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 right-0 ml-auto mr-auto rounded-b-lg bg-white bg-opacity-90 p-4">
                <h3>{result.title}</h3>
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
      {lastDirection ? <>{/* Add some functionality using this?  */}</> : null}
    </>
  );
};
