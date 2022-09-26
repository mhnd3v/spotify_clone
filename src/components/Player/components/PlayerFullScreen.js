/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext, useRef } from "react";
import {
  cssIcons,
  cssHeader,
  cssFooter,
  cssBtnWrapper,
  cssPlayPauseIcons,
  cssMain,
  cssIconHeart,
  cssFooterIcons,
} from "../style/cssPlayerFullScreen";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/lazy";
import { FreeMode, Lazy, Navigation } from "swiper";
import WhatsPlayingContext from "../../../Context/WhatsPlayingContext";

import { ReactComponent as PlayCircleSvg } from "../../../icons/PlayCircle.svg";
import { ReactComponent as PauseCircleSvg } from "../../../icons/PauseCircle.svg";
import { ReactComponent as HeartSvg } from "../../../icons/Heart.svg";
import { ReactComponent as MixSvg } from "../../../icons/Mix.svg";
import { ReactComponent as NextSvg } from "../../../icons/Next.svg";
import { ReactComponent as PrevSvg } from "../../../icons/Prev.svg";
import { ReactComponent as RepeatSvg } from "../../../icons/Repeat.svg";
import { ReactComponent as DownArrowSvg } from "../../../icons/DownArrow.svg";
import { ReactComponent as DotsSettingsSvg } from "../../../icons/DotsSettings.svg";
import { ReactComponent as DevicesSvg } from "../../../icons/Devices.svg";
import { ReactComponent as ListSvg } from "../../../icons/List.svg";
import PlayerSlider from "./PlayerSlider";

export default function PlayerFullScreen({
  playPause,
  skipSong,
  repeatSong,
  setplayerFullScreen,
  playerFullScreen,
}) {
  const {
    chosenPlaylist,
    setChosenIndex,
    chosenIndex,
    setChosenTrack,
    setCurrentlyPlayingName,
    currentlyPlayingName,
    playing,
    playerSDK,
    duration,
    setDuration,
  } = useContext(WhatsPlayingContext);
  const swiperRef = useRef();

  // console.log("chosenPlaylist", chosenPlaylist);
  // console.log("chosenIndex", chosenIndex);
  console.log("duration:", duration);

  return (
    <>
      <header css={cssHeader}>
        <DownArrowSvg
          onClick={(e) => {
            console.log("clicked smallscreen");
            setplayerFullScreen(!playerFullScreen);
          }}
          css={css`
            height: 1.5rem;
            width: 1.5rem;
          `}
        />
        <h1
          css={css`
            /* border: 2px solid black; */
            display: flex;
            font-size: 1rem;
          `}
        >
          name
        </h1>
        <DotsSettingsSvg />
      </header>
      <main css={cssMain}>
        <Swiper
          // spaceBetween={13}
          slidesPerView={1}
          initialSlide={chosenIndex ? chosenIndex : 0}
          // freeMode={true}
          // lazy={true}
          // loadOnTransitionStart={true}
          // checkInView={true}
          // loadPrevNext={true}
          // loadPrevNextAmount={3}
          // modules={[Navigation]}
          navigation={true}
          onSlideChange={(e) => {
            console.log("slide change", e);
            setChosenIndex(e.realIndex);
            setChosenTrack(chosenPlaylist[e.realIndex].track.uri);
            setCurrentlyPlayingName(
              chosenPlaylist[e.realIndex].track.name +
                " - " +
                chosenPlaylist[e.realIndex].track.artists[0].name
            );
          }}
          onSwiper={(swiper) => {
            console.log("onSwiper:", swiper);
            swiperRef.current = swiper;
          }}
          onReachEnd={(e) =>
            e.progress > 0 && e.isEnd === true
              ? console.log("carousel end reached")
              : null
          }
          css={css`
            border: 2px solid blue;
            width: 100vw;
          `}
        >
          {chosenPlaylist?.map((item, index) => {
            const imgUrl = item.track.album.images[1].url;
            const { id } = item;
            // console.log(item.track.name);
            // console.log(item.track.album.images[1].url);
            // console.log(chosenPlaylist[index].track.album.images[1].url);

            return (
              <SwiperSlide key={id} data-url={item.track.uri}>
                <div
                  key={id}
                  css={css`
                    border: 2px solid green;
                    display: grid;
                    /* justify-content: center; */
                    height: 100%;
                  `}
                >
                  <img
                    key={id}
                    src={imgUrl}
                    alt=""
                    css={css`
                      border: 2px solid blue;
                      margin-top: 1.3rem;
                      justify-self: center;
                    `}
                  />
                </div>{" "}
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div
          css={css`
            display: flex;
            align-items: center;
            padding: 0 1rem;
            justify-content: space-between;
          `}
        >
          <h2
            css={css`
              /* border: 1px solid pink; */
              font-size: 1.4rem;
              text-align: center;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 80vw;
            `}
          >
            {currentlyPlayingName}
          </h2>
          <HeartSvg css={cssIconHeart} />
        </div>
        <div
          css={css`
            display: grid;
          `}
        >
          <PlayerSlider />
          <div css={cssBtnWrapper}>
            <MixSvg height="1.5rem" width="1.5rem" />
            <PrevSvg
              css={cssIcons}
              onClick={() => {
                skipSong("prev");
                swiperRef.current.slidePrev();
              }}
              // height="1.5rem"
              // width="1.5rem"
            />
            {(() => {
              return playing ? (
                <PauseCircleSvg
                  css={cssPlayPauseIcons}
                  onClick={() => playPause("pause")}
                  // width="3.3rem"
                  // height="3.3rem"
                />
              ) : (
                <PlayCircleSvg
                  css={cssPlayPauseIcons}
                  onClick={() => playPause("play")}
                  // width="3.3rem"
                  // height="3.3rem"
                />
              );
            })()}
            <NextSvg
              css={cssIcons}
              onClick={() => {
                skipSong("next");
                // playerSDK.nextTrack().then(() => {
                //   console.log("Skipped to next track!");
                // });
                swiperRef.current.slideNext();
              }}
              // height="1.5rem"
              // width="1.5rem"
            />
            <RepeatSvg css={cssIcons} onClick={() => repeatSong()} />
          </div>
        </div>
      </main>
      <footer css={cssFooter}>
        <DevicesSvg css={cssFooterIcons} />
        <ListSvg css={cssFooterIcons} />
      </footer>
    </>
  );
}
