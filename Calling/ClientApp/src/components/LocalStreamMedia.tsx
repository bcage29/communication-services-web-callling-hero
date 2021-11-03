// © Microsoft Corporation. All rights reserved.

import React, { useEffect, useRef, useState } from 'react';
import { Image, ImageFit, Label } from '@fluentui/react';
import { LocalVideoStream, VideoStreamRenderer, VideoStreamRendererView } from '@azure/communication-calling';
import { videoHint, mediaContainer, localVideoContainerStyle } from './styles/StreamMedia.styles';
import { Constants } from '../core/constants';
import staticMediaSVG from '../assets/staticmedia.svg';

export interface LocalStreamMediaProps {
  label: string;
  stream: LocalVideoStream;
  isOnHold: boolean;
}

export default (props: LocalStreamMediaProps): JSX.Element => {
  const rendererViewRef = useRef<VideoStreamRendererView>();

  const [activeStreamBeingRendered, setActiveStreamBeingRendered] = useState(false);

  const imageProps = {
    src: staticMediaSVG.toString(),
    imageFit: ImageFit.contain,
    styles: {
      root: {
        width: '100%',
        height: '100%',
        display: activeStreamBeingRendered ? 'none' : 'block'
      }
    }
  };

  const imagePropsHold = {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACQUlEQVRoge3YPWsUURTG8V+MphANijGFCzYiKIJgo0YFXwobwW9gZymkM42indrYBNKmsfEDWCromhSWImqwESQKiY0YJQY1FtfBuOzM3Nnd2dnA/OE0c+eeeZ6ZuefMHWpqamoGle2YwWesp8QPNHGsIo2ZzEgX3hqfsKsameksizewjsuReefazG0WGI9mtaCByci8afNjx/9jS8aFvkYKShgreH5PyDKwUjDXwBlYLpjrQDdCOiXLwLuCuSawrQstHZFlYKFgrh0q6AdZBl53kO9Up0I6JctAU0b5SmF3F1pK4ZX4PvALxyNy9q0PwOMIQQn38KLA+X3htLi7Py++AvX0CcSwkCN+CY0C+fr6CsGDjLHfuILFiDwJz9scaxYYL8xefNP+rnwU9g2VMRxxznfBxMk2YzsxhCe9FFUGDcFI2q7scHXS4rkpfYHNYaQ6aXGM4K10E7PVSYvnvNBx00xM9VtQzCLeyPu/c86mjF/AmvalsJUTuIqj+Cn0k64aVizDQtXJam6z0tfEVtwVesjGOV/wCNO4hWu4hNEyTIzhTY6JeRxpmdfAs5x5rbEoPKWesx8fci6+hjtCs7vo32tSNJ6WYYBQ//NMJB07a/HnxWpZBmAfXnYhLjZKZY/8hT3QBgjfRFNCSdyUBhLOyd9DDLQBwu5sUvg9uSkNJIzjttCkNqWBhDHc0PmrtdR/yelM4L5Qels/J9JiOi3ZUMli8xjHGaEhHsJBYfc3KvyqXMFDXBc2VDU1NTUDxh/vRr1pAP/DKAAAAABJRU5ErkJggg==",
    imageFit: ImageFit.contain,
    styles: {
      root: {
        width: '100%',
        height: '100%',
        display: activeStreamBeingRendered ? 'none' : 'block'
      }
    }
  };

  const { stream, label, isOnHold } = props;

  useEffect(() => {
    (async (): Promise<void> => {
      if (stream) {
        const renderer: VideoStreamRenderer = new VideoStreamRenderer(stream);
        rendererViewRef.current = await renderer.createView({ scalingMode: 'Crop', isMirrored: true });

        const container = document.getElementById(Constants.LOCAL_VIDEO_PREVIEW_ID);

        if (container && container.childElementCount === 0) {
          container.appendChild(rendererViewRef.current.target);
          setActiveStreamBeingRendered(true);
        }
      } else {
        if (rendererViewRef) {
          rendererViewRef.current?.dispose();
          setActiveStreamBeingRendered(false);
        }
      }
    })();

    return (): void => {
      if (rendererViewRef) {
        rendererViewRef.current?.dispose();
        rendererViewRef.current = undefined;
        setActiveStreamBeingRendered(false);
      }
    };
  }, [stream]);

  return (
    <div className={mediaContainer}>
      <div
        style={{ display: activeStreamBeingRendered ? 'block' : 'none' }}
        className={localVideoContainerStyle}
        id={Constants.LOCAL_VIDEO_PREVIEW_ID}
      />
      {
        !isOnHold ? <Image { ...imageProps } /> : <Image { ...imagePropsHold } />
      }
      <Label className={videoHint}>{label}</Label>
    </div>
  );
};
