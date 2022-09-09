
import styles from '../User.module.scss';
import classNames from "classnames/bind";
import { useEffect } from "react";
import axios from "axios";
import zingStorage from "~/utils/storage";
import MusicItem from "~/components/MusicItem";

const cx = classNames.bind(styles)

function UserSong() {
    //.slice().reverse(): đảo ngược mảng mà không thay đổi mảng ban đầu
    const userPlaylists = zingStorage.getLibraryPlaylist()?.slice().reverse() || []

    const mySongs = zingStorage.getLibrarySong()?.slice().reverse() || []

    return (
        <div>
            <a href="#" className={cx('nav-btn', 'active')}>Yêu thích</a>
            <div className={cx('library-song')}>
                <div className={cx('lib-header', 'media')}>
                    <div className={cx('media-left')}>
                        <h4 className={cx('lib-heading')}>Bài hát</h4>
                    </div>
                    <div className={cx('media-content')}>
                        <h4 className={cx('lib-heading')}>Album</h4>
                    </div>
                    <div className={cx('media-right')}>
                        <h4 className={cx('lib-heading')}>Thời gian</h4>
                    </div>
                </div>
                <div className={cx('song-list')}>
                    {mySongs.map(song => {
                        return (
                            <MusicItem 
                                key={song.end}
                                song={song}
                            />
                        )   
                    })}
                </div>
            </div>
        </div>
    );
}

export default UserSong;