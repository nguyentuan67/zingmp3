import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import styles from './MusicItem.module.scss';
import { useSelector } from 'react-redux';
import Icon from '../Icon';
import HeartIcon from '../Icon/Heart';
import Image from '../Image';
import PlaySongIcon from '../Icon/Play/PlaySongIcon';
import { useDispatch } from 'react-redux';
import { playMusic } from '~/redux/actions';

const cx = classNames.bind(styles);

function MusicItemUser({ className, song, number, ranking }) {
    const formatTime = (time) => {
        if (time < 10) {
            return `0${time}`;
        } else {
            return time;
        }
    };
    const minuteTime = formatTime(Math.floor(song.duration / 60));
    const secondTime = formatTime(song.duration - minuteTime * 60);

    const librarySong = useSelector((state) => state.songReducer.librarySong);
    const dispatch = useDispatch();

    const renderHeart = () => {
        const isInLibrary = librarySong.map((mySong) => {
            if (mySong.encodeId === song.encodeId || !undefined)
                return mySong.encodeId;
        });
        // console.log(isInLibrary);
        if (isInLibrary) {
            return (
                <div className={cx('item')}>
                    <HeartIcon data={song} />
                </div>
            );
        }
    };

    function RankingStatus({ rank }) {
        if (rank < 0) {
            return (
                <div className={cx('rank-status')}>
                    <i
                        className={cx(
                            'status-icon',
                            'icon-down',
                            'fas fa-caret-down'
                        )}
                    ></i>
                    <span className={cx('status-num')}>{Math.abs(rank)}</span>
                </div>
            );
        } else if (rank > 0) {
            return (
                <div className={cx('rank-status')}>
                    <i
                        className={cx(
                            'status-icon',
                            'icon-up',
                            'fas fa-caret-up'
                        )}
                    ></i>
                    <span className={cx('status-num')}>{rank}</span>
                </div>
            );
        } else {
            return (
                <div className={cx('rank-status')}>
                    <span className={cx('line')}></span>
                </div>
            );
        }
    }

    const handlePlayMusic = (song) => {
        dispatch(playMusic(song));
    };

    return (
        <div
            className={cx('wrapper', { [className]: className })}
            onClick={() => handlePlayMusic(song)}
        >
            <div className={cx('media')}>
                <div className={cx('media-left')}>
                    {ranking ? (
                        <div className={cx('prefix', 'mr-[15px]')}>
                            <span
                                className={
                                    number < 4 ? cx(`num-${number}`) : cx('num')
                                }
                            >
                                {number}
                            </span>
                            <RankingStatus rank={song.rakingStatus} />
                        </div>
                    ) : (
                        <div className={cx('prefix', 'mr-[10px]')}>
                            <i className='fal fa-music'></i>
                        </div>
                    )}
                    <div className={cx('thumb-wrap')}>
                        <Image
                            className={cx('thumb-img')}
                            src={song.thumbnail}
                            alt={song.title}
                        />
                        <div className={cx('hover-items')}>
                            <PlaySongIcon
                                data={song}
                                className={cx('thumb-img_playbutton')}
                            />
                        </div>
                    </div>
                    <div className={cx('song-infor')}>
                        <h3 className={cx('song-name', 'text-sm')}>
                            {song.title}
                        </h3>
                        <h5 className={cx('singer-name', 'text-xs')}>
                            {song.artistsNames}
                        </h5>
                    </div>
                </div>
                <div className={cx('media-content')}>
                    <div className={cx('album-infor', 'text-xs')}>
                        <span>{song.album?.title}</span>
                    </div>
                </div>
                <div className={cx('media-right')}>
                    <div className={cx('hover-items')}>
                        <div className='flex items-center content-between'>
                            {song.mvlink ? (
                                <div className={cx('item')}>
                                    <Icon
                                        icon={
                                            <i className='fal fa-tv-music'></i>
                                        }
                                    />
                                </div>
                            ) : (
                                ''
                            )}
                            <div className={cx('item')}>
                                <Icon
                                    icon={<i className='fal fa-microphone'></i>}
                                />
                            </div>
                            <div className={cx('item')}>
                                <HeartIcon data={song} />
                            </div>
                            <div className={cx('item')}>
                                <Icon
                                    icon={<i className='far fa-ellipsis-h'></i>}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('items')}>
                        <div className='flex items-center content-between'>
                            {renderHeart()}
                            <div className={cx('item', 'duration')}>
                                {minuteTime}:{secondTime}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicItemUser;
