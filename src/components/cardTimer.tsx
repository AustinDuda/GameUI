import React from 'react';

type CardTimerTypes = {
    progress: number;
    total: number
  };

export const CardTimer = (props: CardTimerTypes) => {
    return (
        <div>
            Progress: {props.progress} / {props.total}
        </div>
    )
}
