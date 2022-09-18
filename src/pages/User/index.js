import { Outlet } from 'react-router-dom';
import Icon from "~/components/Icon";
import Playlist from "~/components/Playlist";
import Tippy from "@tippyjs/react";
import { Link, NavLink } from 'react-router-dom';
import zingStorage from "~/utils/storage";
import styles from './User.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles)

function User() {
    const userPlaylists = zingStorage.getLibraryPlaylist()?.slice().reverse() || []
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>
                Thư viện
                <Icon
                    btn
                    className={cx('icon-play')}
                    hover activeNoColor
                    icon={<i className="fas fa-play"></i>}
                />
            </h2>
            <div className={cx('playlist-wrapper')}>
                <div className={cx('header', 'flex justify-between')}>
                    <h3 className={cx('title')}>
                        PLAYLIST
                        <Tippy content='Tạo playlist mới'>
                            <div className={cx('icon')}>
                                <Icon hover icon={<i className="fal fa-plus"></i>} />
                            </div>
                        </Tippy>
                    </h3>
                    <Link to={"/playlist"} className={cx('section-link')}>Tất cả</Link>
                </div>
                <div className={cx('list-playlist')}>
                    {userPlaylists.map((playlist, index) => {
                        if(index<5) {
                            return (
                                <Playlist
                                    key={playlist.encodeId}
                                    className='w-[25%] px-3 md:w-[20%] md:px-3.5'
                                    name={playlist.title}
                                    describe={playlist.sortDescription}
                                    link={"#"}
                                    image={playlist.thumbnail || playlist.thumbnailM}
                                    data={playlist}
                                />
                            )
                        }
                    })}
                </div>
            </div>
            <div className={cx('songs-wrapper')}>
                <div className={cx('nav-wrapper')}>
                    <nav className={cx('nav-list')}>
                        <NavLink className={(nav) => cx('nav-item', { active: nav.isActive })} to='/user/music/song'>
                            <h5 className={cx('nav-title')}>Bài hát</h5>
                        </NavLink>
                        <NavLink className={(nav) => cx('nav-item', { active: nav.isActive })} to='/user/music/podcast'>
                            <h5 className={cx('nav-title')}>Podcast</h5>
                        </NavLink>
                        <NavLink className={(nav) => cx('nav-item', { active: nav.isActive })} to='/user/music/album'>
                            <h5 className={cx('nav-title')}>Album</h5>
                        </NavLink>
                        <NavLink className={(nav) => cx('nav-item', { active: nav.isActive })} to='/user/music/mv'>
                            <h5 className={cx('nav-title')}>MV</h5>
                        </NavLink>
                    </nav>
                </div>
            <Outlet/>
            </div>
        </div>
    );
}

export default User;